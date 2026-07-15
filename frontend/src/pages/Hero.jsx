import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TacticalPanel from "@/components/military/TacticalPanel";
import StatusLED from "@/components/military/StatusLED";
import { Crosshair, Wind, Moon, Eye, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HERO_BG =
  "https://images.unsplash.com/photo-1637594439811-f2564dd35b13?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";

const Hero = () => {
  const [mission, setMission] = useState(null);

  useEffect(() => {
    axios.get(`${API}/mission`).then((r) => setMission(r.data)).catch(() => {});
  }, []);

  const w = mission?.weather || {};

  const cards = [
    { icon: Crosshair, label: "MISSION", value: "ACTIVE", state: "success" },
    { icon: MapPin, label: "AO", value: mission?.ao || "MAHBOOT", state: "info" },
    { icon: Calendar, label: "DATE", value: mission?.date || "27 MAY 2022", state: "neutral" },
    { icon: Clock, label: "TIME · ZULU", value: mission?.time_zulu || "2400Z", state: "warning" },
    { icon: Eye, label: "WEATHER", value: w.sky || "CLEAR", state: "success" },
    { icon: Eye, label: "VISIBILITY", value: w.visibility || "GOOD", state: "success" },
    { icon: Moon, label: "MOON", value: w.moon_illumination || "74%", state: "info" },
    { icon: Wind, label: "WIND", value: w.wind || "8 KT", state: "neutral" },
  ];

  return (
    <div className="p-4 space-y-4" data-testid="hero-page">
      {/* Hero banner */}
      <section className="relative mil-panel hud-glow overflow-hidden" data-testid="hero-banner">
        <div
          className="absolute inset-0 bg-cover bg-center ambient-shift"
          style={{
            backgroundImage: `linear-gradient(rgba(6,20,10,0.55), rgba(6,20,10,0.85)), url(${HERO_BG})`,
            filter: "hue-rotate(80deg) saturate(0.5) contrast(1.15) brightness(0.85)",
          }}
        />
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="grain-overlay" />
        {/* NVG green tint */}
        <div className="absolute inset-0 bg-mil-green/25 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 90%)" }} />

        {/* Top strip */}
        <div className="relative flex items-center justify-between px-4 py-2 border-b border-mil-border/70 bg-black/40">
          <div className="flex items-center gap-3 mono text-[10px] text-mil-sub">
            <span>FEED · UAV/MQ-9 · IR</span>
            <span className="text-mil-warning">FRAME 04412</span>
            <span>LAT 34.5321° · LON 68.9014°</span>
          </div>
          <div className="flex items-center gap-2 mono text-[10px] text-mil-sub">
            NVG · IR · GAIN 4
          </div>
        </div>

        {/* Main content */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 p-6 lg:p-10 min-h-[420px]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="mono text-[10px] px-2 py-0.5 border border-mil-danger text-mil-danger tracking-widest">
                SECRET
              </span>
              <span className="mono text-[10px] px-2 py-0.5 border border-mil-warning text-mil-warning tracking-widest">
                DEFCON II
              </span>
              <span className="mono text-[10px] px-2 py-0.5 border border-mil-border text-mil-sub tracking-widest">
                NOFORN
              </span>
            </div>

            <div>
              <div className="mono text-[11px] text-mil-sub tracking-[0.4em]">
                U.S. MARINE CORPS · SPECIAL OPERATIONS COMMAND
              </div>
              <h1
                className="mil-heading text-mil-green"
                style={{ fontSize: "clamp(44px, 6vw, 82px)", lineHeight: 0.95, letterSpacing: "0.06em" }}
                data-testid="hero-op-title"
              >
                OPERATION <span className="text-mil-text">HEAVEN</span>
              </h1>
              <div className="mil-heading text-mil-sub text-lg tracking-[0.28em] mt-1">
                TASK FORCE NORTHERN FALCON
              </div>
            </div>

            <div className="grid grid-cols-3 max-w-[560px] gap-3 pt-2">
              <div className="border border-mil-border p-2 bg-panel/70">
                <div className="mono text-[10px] text-mil-sub">MISSION STATUS</div>
                <div className="flex items-center gap-2 mt-1">
                  <StatusLED state="success" />
                  <span className="mil-heading text-mil-success">ACTIVE</span>
                </div>
              </div>
              <div className="border border-mil-border p-2 bg-panel/70">
                <div className="mono text-[10px] text-mil-sub">DEFCON</div>
                <div className="mil-heading text-mil-warning mt-1">II</div>
              </div>
              <div className="border border-mil-border p-2 bg-panel/70">
                <div className="mono text-[10px] text-mil-sub">CLASSIFICATION</div>
                <div className="mil-heading text-mil-danger mt-1">SECRET</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Link
                to="/opord"
                data-testid="hero-open-opord"
                className="mil-heading text-[12px] tracking-widest border border-mil-green text-mil-green px-4 py-2 hover:bg-mil-green hover:text-black transition-colors flex items-center gap-2"
              >
                READ OPORD <ArrowRight size={14} />
              </Link>
              <Link
                to="/satellite"
                data-testid="hero-open-satellite"
                className="mil-heading text-[12px] tracking-widest border border-mil-border text-mil-text px-4 py-2 hover:border-mil-green hover:text-mil-green transition-colors flex items-center gap-2"
              >
                SATELLITE <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mono text-[10px] text-mil-sub pt-2">
              LOC · {mission?.location || "Northern Afghanistan | Mahboot Province"}
            </div>
          </div>

          {/* Right tactical cards */}
          <div className="grid grid-cols-2 gap-2" data-testid="hero-status-cards">
            {cards.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  className="border border-mil-border bg-panel/80 backdrop-blur-sm p-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="mono text-[10px] text-mil-sub tracking-widest">{c.label}</div>
                    <Icon size={13} className="text-mil-sub" />
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <StatusLED state={c.state} />
                    <span className="mil-heading text-mil-text text-base">{c.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom info strip (static) */}
        <div className="relative border-t border-mil-border/70 bg-black/50 px-4 py-1.5 flex items-center gap-6 mono text-[10px] text-mil-sub overflow-hidden">
          <span className="text-mil-green">TELEMETRY</span>
          <span>BFT · UP</span>
          <span>JTAC · RAPTOR ACTUAL</span>
          <span>CAS · HAWK 1-1 / 1-2 · A-10C</span>
          <span>INFIL · YANKEE 1-1 · CH-53E</span>
          <span>CASEVAC · PEDRO 1-1</span>
        </div>
      </section>

      {/* Below hero: quick nav tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TacticalPanel title="OPERATION ORDER" tag="S//NF" state="warning" testId="tile-opord">
          <p className="text-[12px] text-mil-sub">
            Full 5-paragraph OPORD — Sytuacja, Wróg, Siły Własne, Zadanie, Wykonanie, Cele, Logistyka, Dowodzenie.
          </p>
          <Link
            to="/opord"
            className="inline-flex items-center gap-1.5 mono text-[11px] text-mil-green mt-3"
            data-testid="tile-opord-link"
          >
            READ <ArrowRight size={12} />
          </Link>
        </TacticalPanel>

        <TacticalPanel title="SATELLITE IMAGERY" tag="S//NF" state="info" testId="tile-satellite">
          <p className="text-[12px] text-mil-sub">
            Reconnaissance products — AO overview, LZs, RVs, MSR Quack, enemy AA sites, UAV feeds.
          </p>
          <Link
            to="/satellite"
            className="inline-flex items-center gap-1.5 mono text-[11px] text-mil-green mt-3"
            data-testid="tile-satellite-link"
          >
            VIEW <ArrowRight size={12} />
          </Link>
        </TacticalPanel>

        <TacticalPanel title="RULES OF ENGAGEMENT" tag="S//NF" state="warning" testId="tile-roe">
          <p className="text-[12px] text-mil-sub">
            PID, civilian presence, escalation of force, CAS approval and collateral damage guidance.
          </p>
          <Link
            to="/roe"
            className="inline-flex items-center gap-1.5 mono text-[11px] text-mil-green mt-3"
            data-testid="tile-roe-link"
          >
            REVIEW <ArrowRight size={12} />
          </Link>
        </TacticalPanel>
      </div>
    </div>
  );
};

export default Hero;
