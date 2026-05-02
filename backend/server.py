from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form, Response, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import uuid
import logging
import requests
import cloudinary
import cloudinary.uploader
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Cloudinary config
CLOUDINARY_CLOUD_NAME = os.environ.get("CLOUDINARY_CLOUD_NAME")
CLOUDINARY_API_KEY = os.environ.get("CLOUDINARY_API_KEY")
CLOUDINARY_API_SECRET = os.environ.get("CLOUDINARY_API_SECRET")

if CLOUDINARY_CLOUD_NAME:
    cloudinary.config(
        cloud_name=CLOUDINARY_CLOUD_NAME,
        api_key=CLOUDINARY_API_KEY,
        api_secret=CLOUDINARY_API_SECRET,
        secure=True,
    )


app = FastAPI()
api_router = APIRouter(prefix="/api")


def slugify(name: str) -> str:
    s = name.lower().strip()
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"-+", "-", s)
    return s.strip("-")


# --------- Models ---------

class Guest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    slug: str
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class GuestCreate(BaseModel):
    name: str
    message: Optional[str] = None


class WeddingInfo(BaseModel):
    model_config = ConfigDict(extra="ignore")
    bride_name: str = "Divya"
    groom_name: str = "Anmol"
    wedding_date: str = "2026-06-28T08:00:00"
    ceremony_venue: str = "BAPS Swaminarayan Mandir, Milpitas, California"
    reception_venue: str = "Shubham Hall, Sunnyvale, California"
    hashtag: str = "#DivyakeAnmolpal"
    location_city: str = "San Jose Bay Area, California"


class GuestbookEntry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    message: str
    photo_path: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# --------- Routes ---------

@api_router.get("/")
async def root():
    return {"message": "Wedding Invite API"}


@api_router.get("/wedding", response_model=WeddingInfo)
async def get_wedding_info():
    doc = await db.wedding_info.find_one({}, {"_id": 0})
    if doc:
        return WeddingInfo(**doc)
    info = WeddingInfo()
    await db.wedding_info.insert_one(info.model_dump())
    return info


@api_router.post("/guests", response_model=Guest)
async def create_guest(payload: GuestCreate):
    base_slug = slugify(payload.name)
    if not base_slug:
        raise HTTPException(status_code=400, detail="Invalid name")
    slug = base_slug
    n = 1
    while await db.guests.find_one({"slug": slug}):
        n += 1
        slug = f"{base_slug}-{n}"
    guest = Guest(name=payload.name.strip(), slug=slug, message=payload.message)
    doc = guest.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.guests.insert_one(doc)
    return guest


@api_router.get("/guests", response_model=List[Guest])
async def list_guests():
    items = await db.guests.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for g in items:
        if isinstance(g.get('created_at'), str):
            g['created_at'] = datetime.fromisoformat(g['created_at'])
    return items


@api_router.get("/guests/{slug}", response_model=Guest)
async def get_guest(slug: str):
    g = await db.guests.find_one({"slug": slug}, {"_id": 0})
    if not g:
        raise HTTPException(status_code=404, detail="Guest not found")
    if isinstance(g.get('created_at'), str):
        g['created_at'] = datetime.fromisoformat(g['created_at'])
    return g


@api_router.delete("/guests/{slug}")
async def delete_guest(slug: str):
    result = await db.guests.delete_one({"slug": slug})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Guest not found")
    return {"ok": True}


# --------- Guestbook ---------

@api_router.post("/guestbook", response_model=GuestbookEntry)
async def create_guestbook_entry(
    name: str = Form(...),
    message: str = Form(...),
    photo: Optional[UploadFile] = File(None),
):
    if not name.strip() or not message.strip():
        raise HTTPException(status_code=400, detail="Name and message required")

    photo_path: Optional[str] = None
    if photo and photo.filename:
        if not CLOUDINARY_CLOUD_NAME:
            raise HTTPException(status_code=503, detail="Photo uploads not configured")
        ext = photo.filename.rsplit(".", 1)[-1].lower() if "." in photo.filename else "bin"
        if ext not in {"jpg", "jpeg", "png", "webp", "gif"}:
            raise HTTPException(status_code=400, detail="Unsupported image type")
        data = await photo.read()
        if len(data) > 8 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Image too large (8MB max)")
        result = cloudinary.uploader.upload(
            data,
            folder="divya-anmol-wedding/guestbook",
            public_id=str(uuid.uuid4()),
            resource_type="image",
        )
        photo_path = result["secure_url"]

    entry = GuestbookEntry(name=name.strip(), message=message.strip(), photo_path=photo_path)
    doc = entry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.guestbook.insert_one(doc)
    return entry


@api_router.get("/guestbook", response_model=List[GuestbookEntry])
async def list_guestbook():
    items = await db.guestbook.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


@api_router.get("/files/{path:path}")
async def serve_file(path: str):
    # Photos are now stored as direct Cloudinary URLs in photo_path field
    # This endpoint is kept for backward compatibility
    raise HTTPException(status_code=404, detail="File not found")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup():
    if CLOUDINARY_CLOUD_NAME:
        logger.info("Cloudinary storage configured")
    else:
        logger.warning("Cloudinary NOT configured — photo uploads disabled")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
