"""Backend tests for Wedding Invite API."""
import os
import pytest
import requests
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://sealed-wishes.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Wedding info endpoint
class TestWedding:
    def test_get_wedding(self, session):
        r = session.get(f"{API}/wedding", timeout=20)
        assert r.status_code == 200
        data = r.json()
        for k in ["bride_name", "groom_name", "wedding_date", "ceremony_venue", "reception_venue", "hashtag"]:
            assert k in data, f"missing key {k}"
        assert "_id" not in data


# Guests CRUD + slug logic
class TestGuests:
    created_slugs = []

    def test_create_guest_basic(self, session):
        unique = f"TEST_Priya_{uuid.uuid4().hex[:6]}"
        r = session.post(f"{API}/guests", json={"name": unique})
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["name"] == unique
        assert d["slug"].startswith(unique.lower().replace("_", ""))  # slugify strips underscores
        assert "id" in d
        assert "_id" not in d
        TestGuests.created_slugs.append(d["slug"])

    def test_create_guest_named_slug(self, session):
        # Verify exact slug format for "Priya Iyer" case (use unique to avoid collisions)
        name = f"TEST Priya Iyer {uuid.uuid4().hex[:4]}"
        r = session.post(f"{API}/guests", json={"name": name})
        assert r.status_code == 200
        d = r.json()
        # All lowercase, spaces -> hyphens
        assert d["slug"] == name.lower().replace(" ", "-")
        TestGuests.created_slugs.append(d["slug"])

    def test_duplicate_name_suffix(self, session):
        name = f"TEST Dup {uuid.uuid4().hex[:4]}"
        r1 = session.post(f"{API}/guests", json={"name": name})
        r2 = session.post(f"{API}/guests", json={"name": name})
        assert r1.status_code == 200 and r2.status_code == 200
        s1, s2 = r1.json()["slug"], r2.json()["slug"]
        assert s1 != s2
        assert s2.endswith("-2")
        TestGuests.created_slugs.extend([s1, s2])

    def test_empty_name_400(self, session):
        r = session.post(f"{API}/guests", json={"name": "   "})
        assert r.status_code == 400

    def test_special_chars_only_400(self, session):
        r = session.post(f"{API}/guests", json={"name": "!!!@@@"})
        assert r.status_code == 400

    def test_list_guests(self, session):
        r = session.get(f"{API}/guests")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        if data:
            assert "_id" not in data[0]
            assert "slug" in data[0]
            assert "name" in data[0]

    def test_list_sorted_desc(self, session):
        # Create new guest, ensure it's at the top
        name = f"TEST Latest {uuid.uuid4().hex[:6]}"
        r = session.post(f"{API}/guests", json={"name": name})
        assert r.status_code == 200
        slug = r.json()["slug"]
        TestGuests.created_slugs.append(slug)
        r2 = session.get(f"{API}/guests")
        assert r2.status_code == 200
        items = r2.json()
        assert items[0]["slug"] == slug

    def test_get_guest_by_slug(self, session):
        if not TestGuests.created_slugs:
            pytest.skip("no guest created")
        slug = TestGuests.created_slugs[0]
        r = session.get(f"{API}/guests/{slug}")
        assert r.status_code == 200
        assert r.json()["slug"] == slug

    def test_get_guest_404(self, session):
        r = session.get(f"{API}/guests/does-not-exist-xyz-{uuid.uuid4().hex[:6]}")
        assert r.status_code == 404

    def test_delete_guest_and_404_after(self, session):
        name = f"TEST Delete {uuid.uuid4().hex[:6]}"
        r = session.post(f"{API}/guests", json={"name": name})
        assert r.status_code == 200
        slug = r.json()["slug"]
        d = session.delete(f"{API}/guests/{slug}")
        assert d.status_code == 200
        g = session.get(f"{API}/guests/{slug}")
        assert g.status_code == 404

    def test_delete_nonexistent_404(self, session):
        r = session.delete(f"{API}/guests/nope-{uuid.uuid4().hex[:6]}")
        assert r.status_code == 404


def teardown_module(module):
    """Cleanup TEST_ guests."""
    s = requests.Session()
    try:
        items = s.get(f"{API}/guests", timeout=15).json()
        for g in items:
            n = g.get("name", "")
            if n.startswith("TEST"):
                s.delete(f"{API}/guests/{g['slug']}", timeout=10)
    except Exception as e:
        print(f"cleanup error: {e}")
