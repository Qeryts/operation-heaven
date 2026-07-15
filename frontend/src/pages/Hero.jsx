import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowRight } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Marine Raider / night operator silhouette from verified Unsplash design guideline
const HERO_IMG =
  "https://images.unsplash.com/photo-1637594439811-f2564dd35b13?crop=entropy&cs=srgb&fm=jpg&q=90&w=1400";

const Hero = () => {
  const [mission, setMission] = useState(null);

  useEffect(() => {
    axios.get(`${API}/mission`).then((r) => setMission(r.data)).catch(() => {});
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto px-6 pt-10 md:pt-14 pb-16 relative" data-testid="hero-page">
      {/* Top meta row */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="chip chip-red">SECRET // NOFORN</span>
          <span className="chip chip-yellow">DEFCON II</span>
          <span className="chip">TASK FORCE · NORTHERN FALCON</span>
        </div>
        <div className="mono text-[10px] text-mil-sub tracking-[0.24em]">
          {mission?.date || "27 MAY 2022"} · {mission?.time_zulu || "2400Z"}
        </div>
      </div>

      {/* Main content: three columns */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr_1fr] gap-8 items-center min-h-[560px]">
        {/* Left column */}
        <div className="space-y-5 lg:pr-2" data-testid="hero-left-col">
          <div className="section-eyebrow">▬ Rozkaz operacyjny</div>
          <h2 className="mil-heading text-white text-2xl md:text-3xl leading-tight">
            Witaj w <span className="text-mil-green">OPERATION HEAVEN</span>
          </h2>
          <p className="text-[14px] leading-relaxed text-mil-sub">
            <span className="text-mil-text font-semibold">Task Force Northern Falcon</span> to elitarna grupa bojowa złożona z elementów
            <span className="text-mil-text"> USMC · MARSOC</span>, operująca w prowincji Mahboot w północnym Afganistanie. Zabezpieczyliśmy
            przyczółek wokół <span className="text-mil-text">FOB &laquo;Glitter&raquo;</span>, jednak strefa działań pozostaje pod kontrolą
            sił Talibów wykorzystujących ufortyfikowane stanowiska przeciwlotnicze oraz zestawy MANPADS.
          </p>
          <p className="text-[14px] leading-relaxed text-mil-sub">
            Rozkaz operacyjny <span className="text-mil-yellow">OPORD · OPERATION HEAVEN</span> zawiera pełen plan przerzutu, zajęcia
            celów OB-A1 do OB-A3 oraz neutralizacji stanowisk OB-B1 do OB-B4.
          </p>
        </div>

        {/* Center: character */}
        <div className="relative flex items-center justify-center min-h-[420px]" data-testid="hero-visual">
          {/* Backdrop halo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[85%] h-[85%] rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(127,176,105,0.10) 0%, rgba(212,179,74,0.05) 30%, transparent 65%)",
              }}
            />
          </div>
          {/* Center callsign ring */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 mono text-[10px] text-mil-sub tracking-[0.3em]">
            RAPTOR · ACTUAL
          </div>
          <img
            src={HERO_IMG}
            alt="Marine Raider — Task Force Northern Falcon"
            className="relative z-10 max-h-[520px] w-auto object-contain drift"
            style={{
              filter: "grayscale(0.5) contrast(1.1) brightness(0.92)",
              maskImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,1) 55%, rgba(0,0,0,0.4) 80%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,1) 55%, rgba(0,0,0,0.4) 80%, transparent 100%)",
            }}
          />
          {/* Bottom callsign strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 mono text-[10px] text-mil-sub tracking-[0.3em]">
            <span className="dot" style={{ background: "#7fb069", color: "#7fb069" }} />
            LP/OP FOX · OVERWATCH
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5 lg:pl-2 lg:text-right" data-testid="hero-right-col">
          <div className="section-eyebrow">Nowy wymiar taktyki ▬</div>
          <h2 className="mil-heading text-white text-2xl md:text-3xl leading-tight">
            Precyzja i <span className="text-mil-yellow">dowodzenie</span>
          </h2>
          <p className="text-[14px] leading-relaxed text-mil-sub">
            Portal C2 <span className="text-mil-text">Task Force Northern Falcon</span> integruje pełen łańcuch dowodzenia — od rozkazu
            bojowego, przez zasady użycia siły, po dane rozpoznawcze i kontrolę zasobów. Cały plan operacji jest dostępny w jednym miejscu,
            gotowy do odprawy misji.
          </p>
          <p className="text-[14px] leading-relaxed text-mil-sub">
            Grupa <span className="text-mil-text">Raptor</span> zajmuje LP/OP Fox i naprowadza CAS —{" "}
            <span className="text-mil-text">Hawk 1-1 / 1-2 (A-10C)</span>. Grupa <span className="text-mil-text">Badger</span> zostanie przerzucona
            przez <span className="text-mil-text">Yankee 1-1 (CH-53E)</span> na LZ &laquo;Ice&raquo;.
          </p>
          <div className="flex flex-wrap gap-3 lg:justify-end pt-1">
            <Link to="/opord" className="btn-solid" data-testid="hero-open-opord">
              Czytaj OPORD <ArrowRight size={13} />
            </Link>
            <Link to="/roe" className="btn-ghost" data-testid="hero-open-roe">
              ROE <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Status strip */}
      <div className="mt-14 pt-6 border-t border-[#1f1f1f] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6" data-testid="hero-status-strip">
        {[
          { l: "Misja", v: "AKTYWNA", c: "text-mil-green" },
          { l: "AO", v: mission?.ao || "MAHBOOT", c: "text-mil-text" },
          { l: "Data", v: mission?.date || "27 MAY 2022", c: "text-mil-text" },
          { l: "Czas · Zulu", v: mission?.time_zulu || "2400Z", c: "text-mil-yellow" },
          { l: "Pogoda", v: mission?.weather?.sky || "CLEAR", c: "text-mil-text" },
          { l: "Widoczność", v: mission?.weather?.visibility || "GOOD", c: "text-mil-text" },
          { l: "Księżyc", v: mission?.weather?.moon_illumination || "74%", c: "text-mil-text" },
          { l: "Wiatr", v: mission?.weather?.wind || "8 KT", c: "text-mil-text" },
        ].map((it) => (
          <div key={it.l}>
            <div className="mono text-[9px] text-mil-dim tracking-[0.28em] uppercase">{it.l}</div>
            <div className={`mil-heading text-sm mt-1 ${it.c}`}>{it.v}</div>
          </div>
        ))}
      </div>

      {/* Quick section tiles */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            to: "/opord",
            eyebrow: "01 · Rozkaz",
            title: "OPORD",
            desc: "Pełny 5-paragrafowy rozkaz operacyjny — Sytuacja, Wróg, Siły własne, Zadanie, Wykonanie, Cele, Logistyka, Dowodzenie.",
            testId: "tile-opord",
          },
          {
            to: "/roe",
            eyebrow: "02 · Zasady",
            title: "ROE",
            desc: "Rules of Engagement — PID, obecność cywilów, escalation of force, capture HVT, zatwierdzanie CAS oraz CDE.",
            testId: "tile-roe",
          },
          {
            to: "/dodatki",
            eyebrow: "03 · Materiały",
            title: "Dodatki",
            desc: "Zdjęcia satelitarne, ekwipunek indywidualny, zegar misji, zasoby na stanowisku i dane MGRS.",
            testId: "tile-dodatki",
          },
        ].map((t) => (
          <Link
            key={t.to}
            to={t.to}
            data-testid={t.testId}
            className="group mil-card p-6 hover:border-[#3a3a3a] transition-colors relative overflow-hidden"
          >
            <div className="section-eyebrow">{t.eyebrow}</div>
            <div className="mil-heading text-white text-xl mt-2">{t.title}</div>
            <p className="text-[13px] text-mil-sub mt-3 leading-relaxed">{t.desc}</p>
            <div className="mt-4 flex items-center gap-2 mono text-[10px] text-mil-green tracking-[0.24em] uppercase opacity-80 group-hover:opacity-100">
              Otwórz <ArrowRight size={12} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hero;
