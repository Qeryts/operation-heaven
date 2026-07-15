import React, { useState } from "react";
import TacticalPanel from "@/components/military/TacticalPanel";
import {
  Crosshair, Zap, Target, Radio, Eye, Compass, Shield, HeartPulse, Wrench, Rocket,
} from "lucide-react";

const CATEGORIES = ["ALL", "WEAPON", "OPTICS", "COMMS", "PROTECTION", "MEDICAL", "NAVIGATION"];

const items = [
  { id: "m27", cat: "WEAPON", name: "M27 IAR", manufacturer: "Heckler & Koch", caliber: "5.56×45 mm NATO", weight: "3.6 kg", role: "Infantry Automatic Rifle · squad automatic weapon", icon: Crosshair },
  { id: "m4a1", cat: "WEAPON", name: "M4A1 Block II", manufacturer: "Colt / FN", caliber: "5.56×45 mm NATO", weight: "3.4 kg", role: "Carbine · primary individual weapon", icon: Crosshair },
  { id: "m320", cat: "WEAPON", name: "M320 GLM", manufacturer: "Heckler & Koch", caliber: "40×46 mm LV", weight: "1.5 kg", role: "Grenade Launcher Module · under-barrel or standalone", icon: Zap },
  { id: "m240b", cat: "WEAPON", name: "M240B", manufacturer: "FN Herstal", caliber: "7.62×51 mm NATO", weight: "12.5 kg", role: "Medium machine gun · sustained suppressive fire", icon: Crosshair },
  { id: "m72", cat: "WEAPON", name: "M72 LAW", manufacturer: "Nammo", caliber: "66 mm HEAT", weight: "3.5 kg", role: "Light Anti-tank Weapon · single-use rocket", icon: Rocket },
  { id: "at4", cat: "WEAPON", name: "AT4", manufacturer: "Saab Bofors Dynamics", caliber: "84 mm HEAT", weight: "6.7 kg", role: "Recoilless anti-armor weapon · single-use", icon: Rocket },
  { id: "maaws", cat: "WEAPON", name: "Carl Gustaf M4 (MAAWS)", manufacturer: "Saab Bofors Dynamics", caliber: "84 mm", weight: "7.0 kg", role: "Multi-role recoilless rifle · HEAT / HE / illum", icon: Rocket },
  { id: "prc152", cat: "COMMS", name: "AN/PRC-152A", manufacturer: "L3Harris", caliber: "30–512 MHz", weight: "1.2 kg", role: "Handheld multi-band multi-mission radio (SR)", icon: Radio },
  { id: "pvs31", cat: "OPTICS", name: "AN/PVS-31A", manufacturer: "L3Harris", caliber: "Gen III filmless", weight: "0.53 kg", role: "Binocular night vision device — dual tube", icon: Eye },
  { id: "peq15", cat: "OPTICS", name: "AN/PEQ-15", manufacturer: "L3Harris", caliber: "IR / VIS laser + illum", weight: "0.2 kg", role: "Advanced Target Pointer / Illuminator / Aiming Light", icon: Target },
  { id: "opscore", cat: "PROTECTION", name: "Ops-Core FAST SF", manufacturer: "Gentex", caliber: "IIIA ballistic", weight: "1.15 kg", role: "Ballistic helmet — modular rail system", icon: Shield },
  { id: "avs", cat: "PROTECTION", name: "Crye AVS · Spiritus LV119", manufacturer: "Crye Precision / Spiritus", caliber: "IV plates", weight: "3.2 kg (w/o plates)", role: "Modular armor / chest rig platform", icon: Shield },
  { id: "ifak", cat: "MEDICAL", name: "IFAK", manufacturer: "USMC standard", caliber: "TCCC compliant", weight: "0.9 kg", role: "Individual First Aid Kit — CAT, chest seal, NPA, gauze", icon: HeartPulse },
  { id: "foretrex", cat: "NAVIGATION", name: "Garmin Foretrex 701", manufacturer: "Garmin", caliber: "GPS · GLONASS · Galileo", weight: "0.088 kg", role: "Wrist-worn navigator · MGRS support", icon: Compass },
  { id: "mut", cat: "PROTECTION", name: "Leatherman MUT", manufacturer: "Leatherman", caliber: "Multi-tool", weight: "0.32 kg", role: "Military Utility Tool · weapon maintenance", icon: Wrench },
];

const catColor = {
  WEAPON: "text-mil-danger border-mil-danger/50",
  OPTICS: "text-mil-info border-mil-info/50",
  COMMS: "text-mil-success border-mil-success/50",
  PROTECTION: "text-mil-warning border-mil-warning/50",
  MEDICAL: "text-mil-success border-mil-success/50",
  NAVIGATION: "text-mil-sub border-mil-sub/50",
};

// Blueprint/technical-drawing style placeholder
const BlueprintCard = ({ Icon, id }) => {
  // deterministic pattern based on id
  const seed = id.charCodeAt(0) + id.length;
  const angle = (seed * 37) % 90 - 45;
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-panel-light">
      {/* grid backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(115,199,107,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(115,199,107,0.08) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      {/* faint scans */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(115,199,107,0.04) 4px, transparent 5px)",
        }}
      />
      {/* subtle vignette */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)" }}
      />
      {/* central icon */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${angle * 0.15}deg)` }}>
        <Icon size={80} strokeWidth={1} className="text-mil-green/70" />
      </div>
      {/* corner ticks */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-mil-green/60" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-mil-green/60" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-mil-green/60" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-mil-green/60" />
      {/* faux dimension lines */}
      <div className="absolute top-1/2 left-4 right-4 h-px bg-mil-green/25" />
      <div className="absolute top-1/2 left-4 w-1 h-2 -mt-1 border-l border-mil-green/40" />
      <div className="absolute top-1/2 right-4 w-1 h-2 -mt-1 border-r border-mil-green/40" />
      {/* blueprint label */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 mono text-[9px] tracking-widest text-mil-green/70">
        TECH DRAWING · ID-{id.toUpperCase()}
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 mono text-[9px] tracking-widest text-mil-sub">
        SCALE 1:2 · UNCLASSIFIED SILHOUETTE
      </div>
    </div>
  );
};

const Equipment = () => {
  const [cat, setCat] = useState("ALL");
  const filtered = cat === "ALL" ? items : items.filter((i) => i.cat === cat);

  return (
    <div className="p-4 space-y-4" data-testid="equipment-page">
      <div className="mil-panel p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="mono text-[10px] text-mil-sub tracking-[0.3em]">
            INDIVIDUAL & CREW-SERVED EQUIPMENT · TF NORTHERN FALCON
          </div>
          <h1
            className="mil-heading text-mil-green"
            style={{ fontSize: "clamp(26px, 3vw, 40px)", lineHeight: 1 }}
            data-testid="equipment-title"
          >
            EQUIPMENT LOAD-OUT
          </h1>
        </div>
        <div className="mono text-[11px] text-mil-sub">
          {filtered.length} of {items.length} items shown
        </div>
      </div>

      <div className="mil-panel px-3 py-2 flex flex-wrap items-center gap-2" data-testid="equipment-filters">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            data-testid={`equipment-filter-${c.toLowerCase()}`}
            className={`mono text-[11px] tracking-widest px-3 py-1 border ${
              cat === c
                ? "border-mil-green text-mil-green bg-mil-green/10"
                : "border-mil-border text-mil-sub hover:border-mil-green hover:text-mil-green"
            } transition-colors`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((it) => {
          const Icon = it.icon;
          return (
            <TacticalPanel
              key={it.id}
              title={
                <span className="flex items-center gap-2">
                  <span className={`mono text-[9px] tracking-widest border px-1.5 py-[1px] rounded-sm ${catColor[it.cat]}`}>
                    {it.cat}
                  </span>
                  <span>{it.name}</span>
                </span>
              }
              tag="S//NF"
              state="info"
              testId={`equip-${it.id}`}
              bodyClassName="p-0"
            >
              <BlueprintCard Icon={Icon} id={it.id} />
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 px-3 py-2 mono text-[11px] border-t border-mil-border">
                <div>
                  <div className="text-[9px] text-mil-sub tracking-widest">MANUFACTURER</div>
                  <div className="text-mil-text truncate">{it.manufacturer}</div>
                </div>
                <div>
                  <div className="text-[9px] text-mil-sub tracking-widest">WEIGHT</div>
                  <div className="text-mil-text">{it.weight}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[9px] text-mil-sub tracking-widest">CALIBER / SPEC</div>
                  <div className="text-mil-text">{it.caliber}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[9px] text-mil-sub tracking-widest">ROLE</div>
                  <div className="text-mil-text leading-snug text-[11px]">{it.role}</div>
                </div>
              </div>
            </TacticalPanel>
          );
        })}
      </div>
    </div>
  );
};

export default Equipment;
