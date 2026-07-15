# Task Force Northern Falcon — OPERATION HEAVEN C2 Portal

## Problem Statement
Fictional USMC/MARSOC command-center portal styled like MarineNet / SIPRNet / SOCOM Mission Planning. Muted military palette (#0A0A0A / #111814 / #73C76B green), Rajdhani + IBM Plex + JetBrains Mono typography, tactical panels, CRT scanlines, radar sweep, LED indicators, sticky SECRET//NOFORN classification bars, left 240px nav, right 320px tactical sidebar.

## Architecture
- **Backend**: FastAPI (`/api/*`), Motor/MongoDB, static `/uploads` mount, Gemini Nano Banana image gen via `emergentintegrations`.
- **Frontend**: React 19 + CRA/CRACO + Tailwind (custom military tokens), react-router.
- **Layout**: `CommandLayout` shell (classification bars + sub-header + LeftNav + workspace + RightSidebar).

## Phase 1 — Delivered (2026-02)
- Hero page (`/`) — OPERATION HEAVEN banner with NVG green backdrop, tactical status cards, DEFCON/SECRET tags, telemetry ticker, 3 tile navigators.
- Dashboard (`/dashboard`) — 16 live widgets (op status, mission clock, phase, JTAC, extraction, logistics, medical, alerts, intel, etc.) + radar tactical situation panel + mission alerts feed.
- OPORD (`/opord`) — Full 10-paragraph Operation Heaven order in Polish (Sytuacja, Wróg, Siły Własne, Zadanie, Wykonanie, Cele OB-A1..OB-B4, Logistyka, Dowodzenie z tabelą częstotliwości + hasła + IFF, METT-TC, Dodatek A-1 fazy).
- Backend endpoints: `GET /api/mission`, `GET /api/mission/dashboard`, `GET /api/mission/opord`, `GET /api/mission/sidebar`, `POST /api/images/generate`, `GET /api/images`.
- Sticky classification bars (top red SECRET//NOFORN, bottom yellow SIMULATION disclaimer).
- Live UTC mission clock, animated radar sweep, blinking LEDs, CRT scanlines, tactical grid animation, terminal cursor.

## Phase 2 — Backlog
P0 (visual depth):
- Intelligence full HVT dossier + confidence gauges
- Objectives page (OB-A1..OB-B4 cards with photos, progress, coordinates, assigned unit)
- Animated Mission Timeline (2400→0500)
- Satellite Imagery gallery with MGRS/timestamp overlay (Gemini generated)
- Maps page (AO overlay, insertion/extraction routes, APP-6 symbols)

P1:
- Support Assets (A-10, UH-60, CH-53, MQ-9, JTAC, CASEVAC, Combat Logistics)
- Infantry Equipment (M27, M4A1, M320, M240B, M72 LAW, AT4, MAAWS, PRC-152, PVS-31, PEQ-15, IFAK etc.)
- Aircraft + Vehicles galleries (MRAP, MATV, HMMWV, JLTV, Stryker)
- Communications matrix expansion
- Logistics + Medical + ROE detail pages
- Downloads page (PDF/JTAC card/9-line/ACE card)
- Friendly Forces roster with detail cards

P2:
- Real-time Gemini Nano Banana generation flow with library UI
- Mission Files upload/download
- Settings + theme tuner

## Test Credentials
Not applicable (no auth in Phase 1)
