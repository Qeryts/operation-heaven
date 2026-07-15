import React from "react";
import { Compass, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const tiles = [
  { key: "afghanistan-overview", title: "Przegląd Afganistan", grid: "42S WC 12000 68000", coord: "34.532° N · 68.901° E", sensor: "EO/IR · 60 cm GSD", ts: "27 MAY 2022 · 2312Z", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
  { key: "lz-ice", title: "LZ ICE · insercja", grid: "42S WC 12456 68120", coord: "34.541° N · 68.912° E", sensor: "EO · 30 cm GSD", ts: "27 MAY 2022 · 2318Z", img: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
  { key: "lz-drake", title: "LZ DRAKE", grid: "42S WC 11890 67940", coord: "34.528° N · 68.883° E", sensor: "EO · 30 cm GSD", ts: "26 MAY 2022 · 1902Z", img: "https://images.unsplash.com/photo-1502085671122-2d218cd434e6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
  { key: "lz-juliet", title: "LZ JULIET · ewakuacja", grid: "42S WC 12980 68260", coord: "34.550° N · 68.925° E", sensor: "EO · 30 cm GSD", ts: "27 MAY 2022 · 0121Z", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
  { key: "lp-op-fox", title: "LP/OP FOX · overwatch", grid: "42S WC 12130 68010", coord: "34.535° N · 68.895° E", sensor: "IR · 45 cm GSD", ts: "26 MAY 2022 · 2340Z", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
  { key: "msr-quack", title: "MSR QUACK", grid: "42S WC 12210 68100", coord: "34.536° N · 68.902° E", sensor: "SAR · 1 m GSD", ts: "27 MAY 2022 · 0004Z", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
  { key: "fuel-station", title: "OB-A1 · stacja benzynowa", grid: "42S WC 12240 68115", coord: "34.537° N · 68.904° E", sensor: "EO · 30 cm GSD", ts: "26 MAY 2022 · 1240Z", img: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
  { key: "village", title: "OB-A2 · wioska", grid: "42S WC 12340 68155", coord: "34.539° N · 68.908° E", sensor: "EO · 30 cm GSD", ts: "26 MAY 2022 · 1245Z", img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
  { key: "enemy-aa", title: "OB-B1 · stanowisko AA", grid: "42S WC 12250 68110", coord: "34.536° N · 68.905° E", sensor: "IR · 45 cm GSD", ts: "27 MAY 2022 · 0022Z", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" },
];

const Overlay = ({ t }) => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)" }} />
    <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-mil-green/60" />
    <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-mil-green/60" />
    <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-mil-green/60" />
    <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-mil-green/60" />
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-mil-green/40" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-mil-green/40" />
      <div className="absolute inset-2 border border-mil-green/30" />
    </div>
    <div className="absolute top-2 left-2 mono text-[10px] text-mil-green/85 tracking-widest">MGRS · {t.grid}</div>
    <div className="absolute top-2 right-2 flex items-center gap-1 mono text-[10px] text-mil-green/85"><Compass size={11} /> N</div>
    <div className="absolute bottom-2 left-2 mono text-[10px] text-mil-green/80">{t.coord}</div>
    <div className="absolute bottom-2 right-2 flex flex-col items-end gap-1 mono text-[10px] text-mil-green/80">
      <span>{t.sensor}</span>
      <span className="flex items-center gap-1"><Ruler size={11} /> 0 ─── 200 m</span>
    </div>
  </div>
);

const Satellite = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-16" data-testid="satellite-page">
      <Link to="/dodatki" className="mono text-[10px] text-mil-sub tracking-widest uppercase inline-flex items-center gap-2 hover:text-mil-text mb-6" data-testid="back-to-dodatki">
        <ArrowLeft size={12} /> Powrót do dodatków
      </Link>

      <div className="flex items-end justify-between flex-wrap gap-4 mb-10 pb-6 border-b border-[#1f1f1f]">
        <div>
          <div className="section-eyebrow">▬ Produkty rozpoznania · AO Mahboot</div>
          <h1 className="mil-heading text-white mt-2" style={{ fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.05 }} data-testid="satellite-title">
            Zdjęcia satelitarne
          </h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="chip">Sensory · EO · IR · SAR</span>
          <span className="chip">Orbita · LEO Sun-sync</span>
          <span className="chip chip-red">TF-NF ONLY</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {tiles.map((t) => (
          <div key={t.key} className="mil-card overflow-hidden" data-testid={`sat-${t.key}`}>
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#1f1f1f]">
              <div className="mil-heading text-white text-[13px]">{t.title}</div>
              <span className="chip">S//NF</span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-black">
              <img
                src={t.img}
                alt={t.title}
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(0.7) contrast(1.15) brightness(0.8) sepia(0.35) hue-rotate(60deg)" }}
              />
              <Overlay t={t} />
            </div>
            <div className="px-4 py-2 flex items-center justify-between mono text-[10px] text-mil-sub tracking-widest">
              <span>{t.ts}</span>
              <span>{t.sensor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Satellite;
