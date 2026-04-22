# Wedding Invite App — PRD

## Original problem statement
"Wedding invite application with envelope opening on the landing page then goes to the wedding invites"

## User choices
- Personalized invites (unique link per guest)
- No RSVP handling
- Designer chose theme (Organic & Earthy: bone/ivory, burgundy, olive; Cormorant Garamond + Outfit)

## Architecture
- Backend: FastAPI + MongoDB (Motor). Routes under /api.
- Frontend: React 19, React Router 7, Tailwind + shadcn/ui, sonner toasts, lucide-react icons.
- Envelope animation: pure CSS (flap rotateX, letter translateY, wax seal fade) triggered by React state.

## Core requirements (static)
- Landing envelope with wax seal
- Personalized URL /invite/:guestSlug showing guest name on envelope and letter
- After envelope opens: full invite page (hero, countdown, our story, schedule, venue, gallery, signoff)
- Admin page /guests to add/list/delete guests and copy personalized links

## User personas
- Couple (admin): creates & shares per-guest links from /guests
- Guest: receives personalized link, opens envelope, views invitation

## What's been implemented (2026-02-22)
- Backend: GET /api/wedding, POST/GET/DELETE /api/guests, GET /api/guests/:slug, slug auto-generation with duplicate handling
- Frontend: HomePage (/), InvitePage (/invite/:slug) with Envelope + Invite, GuestsPage (/guests)
- Envelope component with flap + letter + wax seal animation (~2.1s)
- Countdown, scroll Reveal helper, paper texture, Cormorant Garamond + Outfit fonts
- data-testid coverage on all interactive elements
- Testing agent: 12/12 backend tests pass, frontend E2E pass, 100% success rate

## Backlog
- P1: Allow admin to edit wedding info (names, date, venues) from UI
- P1: Per-guest custom notes shown inside the letter
- P2: RSVP form (user chose NO — defer unless re-requested)
- P2: WhatsApp-ready share snippet with pre-filled message per guest
- P2: Background music toggle (soft instrumental on envelope open)
- P2: Password-gated admin page
