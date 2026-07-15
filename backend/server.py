from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import base64
import logging
from pathlib import Path
from pydantic import BaseModel
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

UPLOADS_DIR = ROOT_DIR / "uploads"
UPLOADS_DIR.mkdir(exist_ok=True)

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Task Force Northern Falcon - OPERATION HEAVEN")
api_router = APIRouter(prefix="/api")

# ---------- MISSION STATIC DATA (Operation Heaven - Task Force Northern Falcon) ----------
MISSION_META = {
    "codename": "OPERATION HEAVEN",
    "task_force": "TASK FORCE NORTHERN FALCON",
    "command": "Marine Special Operations Command",
    "classification": "SECRET//NOFORN",
    "defcon": "II",
    "status": "ACTIVE",
    "ao": "MAHBOOT",
    "date": "27 MAY 2022",
    "time_zulu": "2400Z",
    "location": "Northern Afghanistan | Mahboot Province",
    "weather": {
        "sky": "CLEAR",
        "temperature": "28°C / -2°C",
        "visibility": "GOOD",
        "moon_illumination": "74%",
        "wind": "8 KT",
    },
}

DASHBOARD_WIDGETS = [
    {"id": "op-status", "title": "OPERATION STATUS", "value": "ACTIVE", "state": "success", "detail": "All phases nominal"},
    {"id": "mission-progress", "title": "MISSION PROGRESS", "value": "42%", "state": "info", "detail": "PHASE II — Gambler ×3"},
    {"id": "mission-clock", "title": "MISSION CLOCK", "value": "T-00:34:12", "state": "warning", "detail": "Time to H-Hour"},
    {"id": "weather", "title": "WEATHER / AO MAHBOOT", "value": "CLEAR", "state": "success", "detail": "Vis GOOD · Moon 74% · Wind 8 KT"},
    {"id": "enemy-activity", "title": "ENEMY ACTIVITY", "value": "HIGH", "state": "danger", "detail": "AA emplacements + technicals"},
    {"id": "current-phase", "title": "CURRENT PHASE", "value": "II · GAMBLER ×3", "state": "info", "detail": "Badger insertion LZ ICE"},
    {"id": "assets-ready", "title": "ASSETS READY", "value": "12/13", "state": "success", "detail": "Hawk 1-1/1-2 · Pedro 1-1/1-2 · Yankee 1-1"},
    {"id": "jtac-status", "title": "JTAC STATUS", "value": "ON STATION", "state": "success", "detail": "Raptor Actual · LP/OP FOX"},
    {"id": "extraction", "title": "EXTRACTION STATUS", "value": "STANDBY", "state": "info", "detail": "LZ JULIET · Yankee 1-1"},
    {"id": "airspace", "title": "AIRSPACE STATUS", "value": "AMBER", "state": "warning", "detail": "MANPADS threat until OB-B4 BDA"},
    {"id": "logistics", "title": "LOGISTICS", "value": "GREEN", "state": "success", "detail": "Pedro 1-2 · 100 kg cap"},
    {"id": "medical", "title": "MEDICAL READINESS", "value": "READY", "state": "success", "detail": "CASEVAC Pedro 1-1 · CCP FOB GLITTER"},
    {"id": "comms", "title": "COMMUNICATIONS", "value": "SECURE", "state": "success", "detail": "LR 70 MHz · SR 50/55/60 MHz"},
    {"id": "alerts", "title": "MISSION ALERTS", "value": "2 NEW", "state": "warning", "detail": "COMSEC advisory · WX update"},
    {"id": "intel", "title": "RECENT INTELLIGENCE", "value": "UPDATED", "state": "info", "detail": "HVT Mahada All Maliq — confidence MEDIUM"},
    {"id": "airspace-map", "title": "CURRENT AO", "value": "MAHBOOT", "state": "info", "detail": "FOB GLITTER · MSR QUACK"},
]

OPORD = {
    "meta": {
        "date": "27.05.2022",
        "time": "2400",
        "location": "Północny Afganistan | Prowincja Mahboot",
        "weather": "Bezchmurne niebo, temperatura 28°C / -2°C, dobra widoczność.",
        "classification": "SECRET//NOFORN",
    },
    "paragraphs": [
        {
            "id": "situation",
            "code": "1",
            "title": "SYTUACJA",
            "en_title": "SITUATION",
            "body": (
                "W ostatnich tygodniach Grupa Bojowa \"Northern Falcon\", składająca się z elementów USMC, "
                "zabezpieczyła przyczółek w okupowanej przez Talibów prowincji Mahboot. Prowincja jest silnie "
                "ufortyfikowana przez siły Talibów, które od wielu miesięcy przygotowywały się na nadejście "
                "wojsk koalicji. Zabezpieczony został ograniczony obszar wokół FOB \"Glitter\", jednak pozostała "
                "część strefy nadal znajduje się pod kontrolą Talibów. Przeciwnik, wykorzystując stacjonarne "
                "stanowiska przeciwlotnicze oraz zestawy MANPADS, skutecznie uniemożliwia bezpieczne kontynuowanie "
                "natarcia w głąb prowincji. Dowództwo zadecydowało o konieczności zneutralizowania ufortyfikowanych "
                "pozycji przeciwlotniczych oraz pozostałych kluczowych umocnień bojowników."
            ),
        },
        {
            "id": "enemy",
            "code": "1.a",
            "title": "WRÓG",
            "en_title": "ENEMY FORCES",
            "body": (
                "Naszym przeciwnikiem są siły Talibów pod dowództwem Mahada All Maliqa. Ich liczebność szacuje się "
                "na 100–250 bojowników. Uzbrojenie stanowią głównie karabinki rodziny AK, RPK, PKM oraz granatniki "
                "RPG-7. Szacuje się, że przeciwnik dysponuje pojazdami typu technical, a także możliwymi pojazdami "
                "BRDM-2 oraz BWP-1."
            ),
            "list": {
                "title": "Potwierdzone uzbrojenie stacjonarne",
                "items": ["ZU-23-2", "DShK", "PKM", "SPG-9"],
            },
        },
        {
            "id": "friendly",
            "code": "1.b",
            "title": "SIŁY WŁASNE",
            "en_title": "FRIENDLY FORCES",
            "roster": [
                {"cs": "Godfather", "role": "Sekcja dowódcza stacjonująca w FOB \"Glitter\""},
                {"cs": "Badger Actual", "role": "Grupa MARSOC. Główny element szturmowy."},
                {"cs": "Badger 1-2", "role": "Grupa MARSOC. Sekcja wsparcia podporządkowana Actual."},
                {"cs": "Assassin Actual", "role": "Grupa MARSOC. QRF operujący w rejonie działań."},
                {"cs": "Assassin 1-2", "role": "Grupa MARSOC. Sekcja wsparcia podporządkowana Actual."},
                {"cs": "Raptor Actual", "role": "Grupa MARSOC. Sekcja zwiadowcza, FO/JTAC."},
                {"cs": "Hawk 1-1", "role": "A-10C operujący w AO, Bull's 1-2-1, kanał 1-1-3 | D-CAS"},
                {"cs": "Hawk 1-2", "role": "A-10C operujący w AO, Bull's 1-2-1, kanał 1-1-3 | D-CAS"},
                {"cs": "Pedro 1-1", "role": "UH-60M stacjonujący w FOB \"Glitter\" | CASEVAC"},
                {"cs": "Pedro 1-2", "role": "UH-60M stacjonujący w FOB \"Glitter\" | Logistyka"},
                {"cs": "Yankee 1-1", "role": "CH-53E stacjonujący w FOB \"Glitter\" | Infil / Exfil"},
            ],
        },
        {
            "id": "mission",
            "code": "2",
            "title": "ZADANIE",
            "en_title": "MISSION",
            "body": (
                "Zadaniem ugrupowania Badger jest zajęcie celów od OB-A1 do OB-A3. Są to silnie ufortyfikowane "
                "pozycje obronne Talibów. Dodatkowym zadaniem jest neutralizacja wszelkich innych zagrożeń "
                "napotkanych w rejonie działań. Zadaniem ugrupowania Raptor jest zniszczenie celów od OB-B1 do "
                "OB-B4. Są to ufortyfikowane stanowiska przeciwlotnicze oraz inne umocnienia przeciwnika."
            ),
        },
        {
            "id": "execution",
            "code": "3",
            "title": "WYKONANIE",
            "en_title": "EXECUTION",
            "body": (
                "Grupa Raptor zostanie przetransportowana na LZ \"Drake\" na dobę przed rozpoczęciem operacji. "
                "Następnie przemieści się do LP/OP \"Fox\", gdzie zajmie i umocni dogodną pozycję obserwacyjno-ogniową "
                "z widokiem na cele OB-B1 do OB-B4. W dniu operacji, o godzinie 0130, Raptor przy wsparciu swojego "
                "JTAC naprowadzi lotnictwo Hawk 1-1 oraz Hawk 1-2 na stanowiska przeciwlotnicze, doprowadzając do "
                "ich zniszczenia i eliminacji zagrożenia dla statków powietrznych. W momencie neutralizacji stanowisk "
                "przeciwlotniczych grupa Badger zostanie przetransportowana z FOB \"Glitter\" przez Yankee 1-1 na LZ "
                "\"Ice\", skąd przemieści się do RV \"Blass\", gdzie połączy się z sekcją Raptor. Po połączeniu obu "
                "ugrupowań rozpocznie się natarcie na OB-A1, z zadaniem zneutralizowania wszystkich celów, które nie "
                "zostały wcześniej zniszczone przez A-10. Po zabezpieczeniu OB-A1 grupa Raptor przemieści się na cele "
                "OB-B1 do OB-B4 w celu przeprowadzenia BDA oraz potwierdzenia całkowitego zniszczenia wszystkich "
                "stanowisk przeciwlotniczych. W tym samym czasie Badger przemieści się w kierunku OB-A2, zajmie "
                "TRP-N1 i będzie oczekiwał na zakończenie działań Raptora. Po zakończeniu BDA grupa Raptor przemieści "
                "się na TRP-N2, skąd będzie prowadzić ubezpieczenie działań oraz ruchu ugrupowania Badger. Po "
                "zabezpieczeniu OB-A2 Badger przygotuje się do dalszego natarcia na OB-A3. W tym czasie Raptor zajmie "
                "TRP-N3, umocni swoją pozycję oraz przygotuje się do odparcia ewentualnych sił QRF przeciwnika. Po "
                "osiągnięciu gotowości przez Raptora, Badger rozpocznie natarcie na OB-A3 i zabezpieczy wyznaczony "
                "obiekt. Po wykonaniu wszystkich zadań oba ugrupowania przemieścią się na LZ \"Juliet\", ufortyfikują "
                "swoje pozycje oraz przygotują się do ewakuacji z rejonu działań."
            ),
        },
        {
            "id": "objectives",
            "code": "3.a",
            "title": "CELE",
            "en_title": "OBJECTIVES",
            "objectives": [
                {"code": "OB-A1", "desc": "Ufortyfikowana stacja benzynowa w pobliżu MSR \"Quack\", kluczowa dla utrzymania kontroli nad regionem."},
                {"code": "OB-A2", "desc": "Wioska położona na obrzeżach miasta, w której ma przebywać lokalny warlord Maliqq Abdul Bukaqe, dowodzący siłami bojowników w rejonie. Zadanie: Kill or Capture."},
                {"code": "OB-A3", "desc": "Targowisko kontrolowane przez bojowników. Obiekt należy zabezpieczyć. Kontrola nad targowiskiem będzie kluczowa dla dalszego utrzymania terenu."},
                {"code": "OB-B1", "desc": "Stanowisko przeciwlotnicze znajdujące się na terenie stacji benzynowej."},
                {"code": "OB-B2", "desc": "Stanowisko przeciwlotnicze znajdujące się w lesie na południowy wschód od stacji benzynowej."},
                {"code": "OB-B3", "desc": "Stanowisko przeciwlotnicze znajdujące się w lesie na południowy zachód od stacji benzynowej."},
                {"code": "OB-B4", "desc": "Nieznany punkt umocnień oraz stanowisko przeciwlotnicze w obrębie strefy działań. Dokładna lokalizacja pozostaje nieznana."},
            ],
        },
        {
            "id": "logistics",
            "code": "4",
            "title": "ZABEZPIECZENIE LOGISTYCZNE",
            "en_title": "LOGISTICS",
            "body": (
                "Elementy logistyczne z FOB \"Glitter\": Pedro 1-1 jest zdolny do ewakuacji medycznej rannego "
                "personelu. Pedro 1-2 jest zdolny do przetransportowania niezbędnego wyposażenia do rejonu działań. "
                "Ograniczenie transportowe: do 100 kg wyposażenia. Dostępne zaopatrzenie: amunicja, granaty, środki "
                "medyczne. Elementy logistyczne w terenie: możliwość pozyskania wyposażenia z jeńców oraz poległych "
                "bojowników."
            ),
        },
        {
            "id": "command",
            "code": "5",
            "title": "DOWODZENIE I ŁĄCZNOŚĆ",
            "en_title": "COMMAND & SIGNAL",
            "comms": [
                {"cs": "Godfather", "lr": "70 MHz", "sr": "70 MHz"},
                {"cs": "Badger Actual", "lr": "70 MHz", "sr": "50 MHz"},
                {"cs": "Badger 1-2", "lr": "—", "sr": "55/50 MHz"},
                {"cs": "Raptor Actual", "lr": "70 MHz", "sr": "60 MHz"},
                {"cs": "Hawk 1-1", "lr": "70 MHz", "sr": "51.121 MHz"},
                {"cs": "Hawk 1-2", "lr": "70 MHz", "sr": "51.121 MHz"},
                {"cs": "Pedro 1-1", "lr": "70 MHz", "sr": "51.121 MHz"},
                {"cs": "Pedro 1-2", "lr": "70 MHz", "sr": "51.121 MHz"},
                {"cs": "Yankee 1-1", "lr": "70 MHz", "sr": "51.121 MHz"},
            ],
            "warning": "UWAGA! Wróg może mieć podsłuchy na nasze radia — stosować PERSEC / COMSEC / OPSEC.",
            "codewords": [
                {"code": "Jeronimo ×3", "meaning": "Faza pierwsza operacji."},
                {"code": "Gambler ×3", "meaning": "Faza druga operacji."},
                {"code": "Prowler ×3", "meaning": "Faza trzecia operacji."},
                {"code": "Jackpot ×3", "meaning": "Maliqq Abdul Bukaqe zabezpieczony żywy lub martwy."},
            ],
            "iff": ["Stroboskop IR", "Świetlik (niebieski)", "Brak"],
        },
        {
            "id": "mettc",
            "code": "6",
            "title": "METT-TC",
            "en_title": "TERRAIN",
            "terrain": [
                {"zone": "Północna część AO", "desc": "teren górzysty, niewielkie kompleksy leśne."},
                {"zone": "Centralna część AO", "desc": "teren płaski, liczne drzewa, rzeki oraz zabudowania."},
                {"zone": "Południowa część AO", "desc": "teren płaski z rozproszonym zalesieniem."},
            ],
        },
        {
            "id": "appendix",
            "code": "A-1",
            "title": "DODATEK A-1 — FAZY WYKONANIA",
            "en_title": "APPENDIX A-1",
            "phases": [
                {"phase": "Faza I", "code": "Jeronimo ×3", "desc": "Neutralizacja stanowisk przeciwlotniczych przez Raptor. Przygotowanie Badgera do wylotu."},
                {"phase": "Faza II", "code": "Gambler ×3", "desc": "Przerzut Badgera na LZ \"Ice\". Raptor przemieszcza się na RV."},
                {"phase": "Faza III", "code": "Prowler ×3", "desc": "Rozpoczęcie natarcia na wyznaczone cele operacyjne."},
            ],
        },
    ],
}

RIGHT_SIDEBAR = {
    "mission_clock": "T-00:34:12",
    "phase": "II · GAMBLER ×3",
    "defcon": "II",
    "roe": "AMBER",
    "assets_on_station": [
        {"cs": "Hawk 1-1", "role": "A-10C · D-CAS", "status": "AIRBORNE"},
        {"cs": "Hawk 1-2", "role": "A-10C · D-CAS", "status": "AIRBORNE"},
        {"cs": "Yankee 1-1", "role": "CH-53E · INFIL", "status": "IN TRANSIT"},
        {"cs": "Pedro 1-1", "role": "UH-60M · CASEVAC", "status": "STANDBY"},
        {"cs": "Raptor Actual", "role": "MARSOC · JTAC", "status": "LP/OP FOX"},
    ],
    "coordinates": "42S WC 12345 67890",
    "wind": "8 KT / 210°",
    "moon": "74%",
}


# ---------- Models ----------
class ImageGenRequest(BaseModel):
    prompt: str
    key: str  # slug used as filename


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"service": "Task Force Northern Falcon C2", "status": "OPERATIONAL"}


@api_router.get("/mission")
async def get_mission():
    return {
        **MISSION_META,
        "server_time": datetime.now(timezone.utc).isoformat(),
    }


@api_router.get("/mission/dashboard")
async def get_dashboard():
    return {"widgets": DASHBOARD_WIDGETS, "server_time": datetime.now(timezone.utc).isoformat()}


@api_router.get("/mission/opord")
async def get_opord():
    return OPORD


@api_router.get("/mission/sidebar")
async def get_sidebar():
    return RIGHT_SIDEBAR


@api_router.post("/images/generate")
async def generate_image(req: ImageGenRequest):
    """Generate a military-style image via Gemini Nano Banana and save to /uploads."""
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
    except ImportError as e:
        raise HTTPException(status_code=500, detail=f"emergentintegrations not available: {e}")

    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="EMERGENT_LLM_KEY not configured")

    chat = LlmChat(
        api_key=api_key,
        session_id=f"opheaven-{req.key}",
        system_message="You produce realistic tactical/military reconnaissance-style imagery for a fictional simulation.",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    msg = UserMessage(text=req.prompt)
    try:
        _text, images = await chat.send_message_multimodal_response(msg)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Image generation failed: {e}")

    if not images:
        raise HTTPException(status_code=502, detail="No image returned")

    img = images[0]
    image_bytes = base64.b64decode(img["data"])
    filename = f"{req.key}.png"
    out_path = UPLOADS_DIR / filename
    with open(out_path, "wb") as f:
        f.write(image_bytes)

    return {"key": req.key, "url": f"/uploads/{filename}", "mime": img.get("mime_type", "image/png")}


@api_router.get("/images")
async def list_images():
    files = sorted([p.name for p in UPLOADS_DIR.iterdir() if p.is_file()])
    return {"images": [{"key": Path(f).stem, "url": f"/uploads/{f}"} for f in files]}


app.include_router(api_router)

app.mount("/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
