# Wedding Invite App — PRD

## Original problem statement
"Wedding invite application with envelope opening on the landing page then goes to the wedding invites"

## User choices (cumulative)
- Personalized invites (unique link per guest)
- No RSVP — guestbook (messages + photos) instead
- Two events: Sangeet + Wedding
- Botanical / illustrated style with envelope opener kept
- Logo (अD monogram) used in wax seal, hero centerpiece, signoff
- Palette: maroon (#8B1C2D) + sage (#5C6B3C) + blush (#F2D5C8) + cream/bone (#FBF7F0)
- Typography: Cormorant Garamond + Outfit
- Live‑stream YouTube link "coming soon" placeholders for both events

## Couple & event details
- Bride: **Divya** · Groom: **Anmol**
- Hashtag: **#DivyakeAnmolpal**
- Sangeet: **Saturday, 27 June 2026 · 5:00 PM PST / 5:30 AM IST (28 June)**, San Jose · Venue coming soon · Live stream coming soon
- Wedding: **Sunday, 28 June 2026 · 8:00 AM PST / 8:30 PM IST**, San Jose · Venue coming soon · Live stream coming soon

## Architecture
- Backend: FastAPI + MongoDB (Motor) + Emergent Object Storage. Routes under `/api`.
- Frontend: React 19 + Tailwind + shadcn/ui + sonner toasts + lucide-react.
- Envelope animation: pure CSS (flap rotateX, letter translateY, wax seal fade).

## What's implemented (2026-05-01)
- Backend endpoints: `/api/wedding`, `/api/guests` (CRUD), `/api/guests/:slug`, `/api/guestbook` (POST multipart with optional photo, GET list), `/api/files/:path` (serve uploaded photo).
- Object storage initialized at startup with EMERGENT_LLM_KEY; soft 8 MB limit and image-type validation; 404 on missing files.
- Logo `/brand/logo.jpeg` integrated as wax seal (mix-blend-multiply over cream), hero centerpiece, signoff, and favicon.
- Botanical SVGs: butterflies, leaf badge, flourish, heart doodle, leaf stems on page sides.
- Sections: Envelope landing → Hero with logo → Countdown → Two days of joy (Sangeet + Wedding cards with PST + IST + venue/stream coming soon) → Itinerary (timeline both events) → Photo gallery → Live‑stream coming soon → Guestbook (with photo upload) → Signoff.
- Admin `/guests` page (add/list/copy/preview/delete).
- Testing: 16/16 backend pytest after fix, frontend E2E 100% — all critical issues resolved.

## Backlog
- P1: Admin form to edit wedding info (date, venue names, hashtag) without code
- P1: Replace wedding date/venue placeholders once confirmed
- P1: Add real YouTube live‑stream URLs when ready
- P2: Per‑guest custom note inside the letter (currently only `name` is personalized)
- P2: WhatsApp share snippet on `/guests` admin row
- P2: Guestbook delete/moderation for admin
- P2: Image lightbox for gallery + guestbook photos
