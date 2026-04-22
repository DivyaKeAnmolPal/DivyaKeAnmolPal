from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


def slugify(name: str) -> str:
    s = name.lower().strip()
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"-+", "-", s)
    return s.strip("-")


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
    bride_name: str = "Ananya"
    groom_name: str = "Arjun"
    wedding_date: str = "2026-12-14T17:00:00"
    ceremony_venue: str = "The Rosewood Garden, Udaipur"
    reception_venue: str = "Lake Pichola Pavilion, Udaipur"
    hashtag: str = "#AnanyaForArjun"


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


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
