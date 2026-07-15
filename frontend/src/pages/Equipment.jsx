import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Crosshair, Zap, Target, Radio, Eye, Compass, Shield, HeartPulse, Wrench, Rocket } from "lucide-react";

const CATEGORIES = [
  { key: "ALL", label: "Wszystko" },
  { key: "WEAPON", label: "Broń" },
  { key: "OPTICS", label: "Optyka" },
  { key: "COMMS", label: "Łączność" },
  { key: "PROTECTION", label: "Ochrona" },
  { key: "MEDICAL", label: "Medycyna" },
  { key: "NAVIGATION", label: "Nawigacja" },
];

const items = [
  { id: "m27", cat: "WEAPON", name: "M27 IAR", manufacturer: "Heckler & Koch", caliber: "5.56×45 mm NATO", weight: "3.6 kg", role: "Automatyczny karabinek piechoty · SAW", icon: Crosshair },
  { id: "m4a1", cat: "WEAPON", name: "M4A1 Block II", manufacturer: "Colt / FN", caliber: "5.56×45 mm NATO", weight: "3.4 kg", role: "Karabinek · podstawowa broń osobista", icon: Crosshair },
  { id: "m320", cat: "WEAPON", name: "M320 GLM", manufacturer: "Heckler & Koch", caliber: "40×46 mm LV", weight: "1.5 kg", role: "Granatnik podwieszany lub samodzielny", icon: Zap },
  { id: "m240b", cat: "WEAPON", name: "M240B", manufacturer: "FN Herstal", caliber: "7.62×51 mm NATO", weight: "12.5 kg", role: "Karabin maszynowy · ogień długotrwały", icon: Crosshair },
  { id: "m72", cat: "WEAPON", name: "M72 LAW", manufacturer: "Nammo", caliber: "66 mm HEAT", weight: "3.5 kg", role: "Lekka broń przeciwpancerna · jednorazowa", icon: Rocket },
  { id: "at4", cat: "WEAPON", name: "AT4", manufacturer: "Saab Bofors Dynamics", caliber: "84 mm HEAT", weight: "6.7 kg", role: "Broń bezodrzutowa · jednorazowa", icon: Rocket },
  { id: "maaws", cat: "WEAPON", name: "Carl Gustaf M4 (MAAWS)", manufacturer: "Saab Bofors Dynamics", caliber: "84 mm", weight: "7.0 kg", role: "Wielozadaniowy granatnik bezodrzutowy", icon: Rocket },
  { id: "prc152", cat: "COMMS", name: "AN/PRC-152A", manufacturer: "L3Harris", caliber: "30–512 MHz", weight: "1.2 kg", role: "Ręczna radiostacja wielopasmowa (SR)", icon: Radio },
  { id: "pvs31", cat: "OPTICS", name: "AN/PVS-31A", manufacturer: "L3Harris", caliber: "Gen III filmless", weight: "0.53 kg", role: "Noktowizor dwutubusowy — Gen III", icon: Eye },
  { id: "peq15", cat: "OPTICS", name: "AN/PEQ-15", manufacturer: "L3Harris", caliber: "IR / VIS laser + illum", weight: "0.2 kg", role: "Wskaźnik laserowy IR + oświetlacz", icon: Target },
  { id: "opscore", cat: "PROTECTION", name: "Ops-Core FAST SF", manufacturer: "Gentex", caliber: "IIIA ballistic", weight: "1.15 kg", role: "Hełm balistyczny · modułowe szyny", icon: Shield },
  { id: "avs", cat: "PROTECTION", name: "Crye AVS · Spiritus LV119", manufacturer: "Crye / Spiritus", caliber: "IV plates", weight: "3.2 kg", role: "Modułowy nosidło pancerne / chest rig", icon: Shield },
  { id: "ifak", cat: "MEDICAL", name: "IFAK", manufacturer: "USMC standard", caliber: "Zgodny z TCCC", weight: "0.9 kg", role: "Indywidualny zestaw pierwszej pomocy", icon: HeartPulse },
  { id: "foretrex", cat: "NAVIGATION", name: "Garmin Foretrex 701", manufacturer: "Garmin", caliber: "GPS · GLONASS · Galileo", weight: "0.088 kg", role: "Nawigator nadgarstkowy · wsparcie MGRS", icon: Compass },
  { id: "mut", cat: "PROTECTION", name: "Leatherman MUT", manufacturer: "Leatherman", caliber: "Multi-tool", weight: "0.32 kg", role: "Multitool wojskowy · konserwacja broni", icon: Wrench },
];

const catAccent = {
  WEAPON: "text-mil-red",
  OPTICS: "text-mil-text",
  COMMS: "text-mil-green",
  PROTECTION: "text-mil-yellow",
  MEDICAL: "text-mil-green",
  NAVIGATION: "text-mil-sub",
};

const Blueprint = ({ Icon, id }) => {
  const seed = id.charCodeAt(0) + id.length;
  const angle = (seed * 37) % 90 - 45;
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-[#0d0d0d]">
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(127,176,105,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(127,176,105,0.06) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${angle * 0.15}deg)` }}>
        <Icon size={72} strokeWidth={1} className="text-mil-green/60" />
      </div>
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-mil-green/60" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-mil-green/60" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-mil-green/60" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-mil-green/60" />
      <div className="absolute top-1/2 left-4 right-4 h-px bg-mil-green/20" />
      <div className="absolute top-2 left-1/2 -translate-x-1/2 mono text-[9px] tracking-widest text-mil-green/70">RYS. TECH · ID-{id.toUpperCase()}</div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 mono text-[9px] tracking-widest text-mil-sub">Skala 1:2 · sylwetka niesklasyfikowana</div>
    </div>
  );
};

const Equipment = () => {
  const [cat, setCat] = useState("ALL");
  const filtered = cat === "ALL" ? items : items.filter((i) => i.cat === cat);

  return (
    <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-16" data-testid="equipment-page">
      <Link to="/dodatki" className="mono text-[10px] text-mil-sub tracking-widest uppercase inline-flex items-center gap-2 hover:text-mil-text mb-6" data-testid="back-to-dodatki">
        <ArrowLeft size={12} /> Powrót do dodatków
      </Link>

      <div className="flex items-end justify-between flex-wrap gap-4 mb-8 pb-6 border-b border-[#1f1f1f]">
        <div>
          <div className="section-eyebrow">▬ Wyposażenie indywidualne · TF Northern Falcon</div>
          <h1 className="mil-heading text-white mt-2" style={{ fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.05 }} data-testid="equipment-title">
            Ekwipunek load-out
          </h1>
        </div>
        <div className="mono text-[11px] text-mil-sub tracking-widest">
          {filtered.length} z {items.length} pozycji
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-8" data-testid="equipment-filters">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            data-testid={`equipment-filter-${c.key.toLowerCase()}`}
            className={`mono text-[11px] tracking-widest px-3 py-1.5 border ${
              cat === c.key
                ? "border-mil-green text-mil-green"
                : "border-[#262626] text-mil-sub hover:border-[#3a3a3a] hover:text-mil-text"
            } transition-colors uppercase`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((it) => {
          const Icon = it.icon;
          return (
            <div key={it.id} className="mil-card overflow-hidden" data-testid={`equip-${it.id}`}>
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#1f1f1f]">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`mono text-[9px] tracking-widest ${catAccent[it.cat]}`}>{CATEGORIES.find((c) => c.key === it.cat)?.label}</span>
                  <span className="text-mil-dim">·</span>
                  <span className="mil-heading text-white text-[13px] truncate">{it.name}</span>
                </div>
                <span className="chip">S//NF</span>
              </div>
              <Blueprint Icon={Icon} id={it.id} />
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-4 py-3 mono text-[11px] border-t border-[#1f1f1f]">
                <div>
                  <div className="text-[9px] text-mil-sub tracking-widest uppercase">Producent</div>
                  <div className="text-mil-text truncate">{it.manufacturer}</div>
                </div>
                <div>
                  <div className="text-[9px] text-mil-sub tracking-widest uppercase">Masa</div>
                  <div className="text-mil-text">{it.weight}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[9px] text-mil-sub tracking-widest uppercase">Kaliber / specyfikacja</div>
                  <div className="text-mil-text">{it.caliber}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[9px] text-mil-sub tracking-widest uppercase">Rola</div>
                  <div className="text-mil-text leading-snug text-[11.5px]">{it.role}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Equipment;
