"""Backend tests for Wedding Invite API (iteration 2)."""
import os
import io
import pytest
import requests
import uuid

BASE_URL = os.environ['REACT_APP_BACKEND_URL'].rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    return s


# Wedding info endpoint
class TestWedding:
    def test_get_wedding(self, session):
        r = session.get(f"{API}/wedding", timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("bride_name") == "Divya"
        assert data.get("groom_name") == "Anmol"
        assert data.get("wedding_date") == "2026-06-28T08:00:00"
        assert data.get("hashtag") == "#DivyakeAnmolpal"
        assert data.get("location_city") == "San Jose, California"
        assert "_id" not in data


# Guests CRUD + slug logic (regression)
class TestGuests:
    created_slugs = []

    def test_create_guest_basic(self, session):
        unique = f"TEST_Priya_{uuid.uuid4().hex[:6]}"
        r = session.post(f"{API}/guests", json={"name": unique})
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["name"] == unique
        assert "id" in d
        assert "_id" not in d
        TestGuests.created_slugs.append(d["slug"])

    def test_duplicate_name_suffix(self, session):
        name = f"TEST Dup {uuid.uuid4().hex[:4]}"
        r1 = session.post(f"{API}/guests", json={"name": name})
        r2 = session.post(f"{API}/guests", json={"name": name})
        assert r1.status_code == 200 and r2.status_code == 200
        s1, s2 = r1.json()["slug"], r2.json()["slug"]
        assert s1 != s2 and s2.endswith("-2")
        TestGuests.created_slugs.extend([s1, s2])

    def test_empty_name_400(self, session):
        r = session.post(f"{API}/guests", json={"name": "   "})
        assert r.status_code == 400

    def test_list_guests(self, session):
        r = session.get(f"{API}/guests")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        if data:
            assert "_id" not in data[0]

    def test_get_guest_by_slug(self, session):
        if not TestGuests.created_slugs:
            pytest.skip("no guest")
        slug = TestGuests.created_slugs[0]
        r = session.get(f"{API}/guests/{slug}")
        assert r.status_code == 200
        assert r.json()["slug"] == slug

    def test_get_guest_404(self, session):
        r = session.get(f"{API}/guests/does-not-exist-{uuid.uuid4().hex[:6]}")
        assert r.status_code == 404

    def test_delete_guest_and_404_after(self, session):
        name = f"TEST Delete {uuid.uuid4().hex[:6]}"
        r = session.post(f"{API}/guests", json={"name": name})
        slug = r.json()["slug"]
        d = session.delete(f"{API}/guests/{slug}")
        assert d.status_code == 200
        g = session.get(f"{API}/guests/{slug}")
        assert g.status_code == 404


# Tiny PNG (1x1 transparent) for guestbook upload
PNG_1x1 = (
    b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01"
    b"\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\rIDATx\x9cc\x00\x01"
    b"\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82"
)


# Guestbook endpoints
class TestGuestbook:
    created_ids = []
    photo_path = None

    def test_create_text_only(self, session):
        name = f"TEST_GB_{uuid.uuid4().hex[:6]}"
        r = session.post(
            f"{API}/guestbook",
            data={"name": name, "message": "Best wishes!"},
            timeout=30,
        )
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["name"] == name
        assert d["message"] == "Best wishes!"
        assert d["photo_path"] is None
        assert "id" in d and "created_at" in d
        assert "_id" not in d
        TestGuestbook.created_ids.append(d["id"])

    def test_create_with_photo(self, session):
        name = f"TEST_GB_{uuid.uuid4().hex[:6]}"
        files = {"photo": ("test.png", io.BytesIO(PNG_1x1), "image/png")}
        r = session.post(
            f"{API}/guestbook",
            data={"name": name, "message": "With pic"},
            files=files,
            timeout=60,
        )
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["photo_path"]
        assert d["photo_path"].startswith("divya-anmol-wedding/guestbook/")
        TestGuestbook.created_ids.append(d["id"])
        TestGuestbook.photo_path = d["photo_path"]

    def test_create_empty_name_400(self, session):
        r = session.post(f"{API}/guestbook", data={"name": "  ", "message": "hi"})
        assert r.status_code == 400

    def test_create_empty_message_400(self, session):
        r = session.post(f"{API}/guestbook", data={"name": "A", "message": "  "})
        assert r.status_code == 400

    def test_invalid_image_type_400(self, session):
        files = {"photo": ("bad.txt", io.BytesIO(b"hello"), "text/plain")}
        r = session.post(
            f"{API}/guestbook",
            data={"name": "TEST_X", "message": "msg"},
            files=files,
        )
        assert r.status_code == 400

    def test_list_guestbook_sorted_desc(self, session):
        r = session.get(f"{API}/guestbook", timeout=20)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        if items:
            assert "_id" not in items[0]
            # Newest entry should be one we just created
            ids = [it["id"] for it in items]
            assert TestGuestbook.created_ids[-1] in ids[:5]

    def test_serve_uploaded_file(self, session):
        if not TestGuestbook.photo_path:
            pytest.skip("no photo uploaded")
        r = session.get(f"{API}/files/{TestGuestbook.photo_path}", timeout=30)
        assert r.status_code == 200
        ct = r.headers.get("Content-Type", "")
        assert ct.startswith("image/"), ct
        assert len(r.content) > 0

    def test_serve_bad_file_404(self, session):
        r = session.get(f"{API}/files/divya-anmol-wedding/guestbook/does-not-exist.png", timeout=30)
        assert r.status_code == 404


def teardown_module(module):
    s = requests.Session()
    try:
        for g in s.get(f"{API}/guests", timeout=15).json():
            if g.get("name", "").startswith("TEST"):
                s.delete(f"{API}/guests/{g['slug']}", timeout=10)
    except Exception as e:
        print(f"cleanup error: {e}")
