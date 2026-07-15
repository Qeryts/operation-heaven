import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShieldAlert, Users, Target, Radio, Package, MapPin, Zap, FileText } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const iconFor = (id) =>
  ({
    situation: MapPin,
    enemy: ShieldAlert,
    friendly: Users,
    mission: Target,
    execution: Zap,
    objectives: Target,
    logistics: Package,
    command: Radio,
    mettc: MapPin,
    appendix: FileText,
  }[id] || FileText);

const accentFor = (id) =>
  ({
    enemy: "text-mil-red",
    objectives: "text-mil-red",
    friendly: "text-mil-green",
    command: "text-mil-green",
    mission: "text-mil-yellow",
    execution: "text-mil-yellow",
    appendix: "text-mil-yellow",
    situation: "text-mil-text",
    logistics: "text-mil-text",
    mettc: "text-mil-text",
  }[id] || "text-mil-text");

const Paragraph = ({ p }) => {
  const Icon = iconFor(p.id);
  return (
    <section className="mil-card p-6 md:p-7" data-testid={`opord-${p.id}`}>
      <header className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-3 min-w-0">
          <Icon size={16} className={accentFor(p.id)} />
          <span className="mono text-[10px] text-mil-sub tracking-[0.28em]">§{p.code}</span>
          <h2 className="mil-heading text-white text-base md:text-lg truncate">{p.title}</h2>
          <span className="mono text-[10px] text-mil-dim tracking-widest hidden md:inline">/ {p.en_title}</span>
        </div>
        <span className="chip">S//NF</span>
      </header>

      {p.body && (
        <p className="text-[13.5px] leading-relaxed text-mil-text/90 whitespace-pre-line">{p.body}</p>
      )}

      {p.list && (
        <div className="mt-4">
          <div className="section-eyebrow">{p.list.title}</div>
          <ul className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {p.list.items.map((i) => (
              <li key={i} className="border border-[#1f1f1f] px-3 py-2 mono text-[11px] text-mil-red">
                {i}
              </li>
            ))}
          </ul>
        </div>
      )}

      {p.roster && (
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          {p.roster.map((r) => (
            <div key={r.cs} className="border-l-2 border-[#2a2a2a] pl-3 hover:border-mil-green transition-colors">
              <div className="mono text-[12px] text-mil-green">{r.cs}</div>
              <div className="text-[12px] text-mil-sub leading-snug">{r.role}</div>
            </div>
          ))}
        </div>
      )}

      {p.objectives && (
        <div className="mt-2 space-y-2">
          {p.objectives.map((o) => (
            <div key={o.code} className="flex items-start gap-3 border-l-2 border-[#2a2a2a] pl-3 hover:border-mil-red transition-colors">
              <span className="mono text-[12px] text-mil-yellow w-14 shrink-0">{o.code}</span>
              <span className="text-[13px] text-mil-text/90 leading-snug">{o.desc}</span>
            </div>
          ))}
        </div>
      )}

      {p.comms && (
        <div className="mt-2 overflow-x-auto">
          <table className="w-full mono text-[12px]">
            <thead>
              <tr className="border-b border-[#1f1f1f]">
                <th className="text-left mono text-[10px] text-mil-sub tracking-widest uppercase px-3 py-2">Kryptonim</th>
                <th className="text-left mono text-[10px] text-mil-sub tracking-widest uppercase px-3 py-2">LR</th>
                <th className="text-left mono text-[10px] text-mil-sub tracking-widest uppercase px-3 py-2">SR</th>
              </tr>
            </thead>
            <tbody>
              {p.comms.map((c) => (
                <tr key={c.cs} className="border-b border-[#161616] last:border-b-0">
                  <td className="px-3 py-2 text-mil-green">{c.cs}</td>
                  <td className="px-3 py-2 text-mil-text">{c.lr}</td>
                  <td className="px-3 py-2 text-mil-text">{c.sr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {p.warning && (
        <div className="mt-4 border-l-2 border-mil-red pl-3 py-1 text-[12px] text-mil-red">
          {p.warning}
        </div>
      )}

      {p.codewords && (
        <div className="mt-5">
          <div className="section-eyebrow mb-2">Hasła operacyjne / Codewords</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {p.codewords.map((c) => (
              <div key={c.code} className="flex items-center gap-3 border-l-2 border-[#2a2a2a] pl-3">
                <span className="mono text-[12px] text-mil-yellow w-28 shrink-0">{c.code}</span>
                <span className="text-[12px] text-mil-text">{c.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {p.iff && (
        <div className="mt-4">
          <div className="section-eyebrow mb-2">Szybka identyfikacja / IFF</div>
          <div className="flex gap-2 flex-wrap">
            {p.iff.map((i) => (
              <span key={i} className="chip">{i}</span>
            ))}
          </div>
        </div>
      )}

      {p.terrain && (
        <div className="mt-2 space-y-3">
          {p.terrain.map((t) => (
            <div key={t.zone} className="border-l-2 border-[#2a2a2a] pl-3">
              <div className="mono text-[12px] text-mil-green">{t.zone}</div>
              <div className="text-[13px] text-mil-text/90">{t.desc}</div>
            </div>
          ))}
        </div>
      )}

      {p.phases && (
        <div className="mt-2 space-y-3">
          {p.phases.map((ph) => (
            <div key={ph.phase} className="border-l-2 border-mil-yellow pl-3">
              <div className="flex items-center gap-3">
                <div className="mono text-[12px] text-mil-yellow tracking-widest">{ph.phase}</div>
                <div className="mono text-[11px] text-mil-green">{ph.code}</div>
              </div>
              <div className="text-[13px] text-mil-text/90 mt-1">{ph.desc}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const Opord = () => {
  const [opord, setOpord] = useState(null);

  useEffect(() => {
    axios.get(`${API}/mission/opord`).then((r) => setOpord(r.data)).catch(() => {});
  }, []);

  if (!opord) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-20 mono text-mil-sub" data-testid="opord-loading">
        Wczytywanie OPORD...
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-16" data-testid="opord-page">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <div className="section-eyebrow">▬ Rozkaz bojowy · Task Force Northern Falcon</div>
          <h1
            className="mil-heading text-white mt-2"
            style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.05 }}
            data-testid="opord-title"
          >
            OPORD · OPERATION HEAVEN
          </h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="chip chip-red">{opord.meta.classification}</span>
          <span className="chip">{opord.meta.date}</span>
          <span className="chip chip-yellow">H-HOUR · {opord.meta.time}</span>
        </div>
      </div>

      {/* Meta strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 pb-6 border-b border-[#1f1f1f]">
        <div>
          <div className="mono text-[10px] text-mil-sub tracking-widest uppercase">Data</div>
          <div className="mil-heading text-white text-sm mt-1">{opord.meta.date}</div>
        </div>
        <div>
          <div className="mono text-[10px] text-mil-sub tracking-widest uppercase">Godzina</div>
          <div className="mil-heading text-mil-yellow text-sm mt-1">{opord.meta.time}</div>
        </div>
        <div className="md:col-span-2">
          <div className="mono text-[10px] text-mil-sub tracking-widest uppercase">Lokalizacja</div>
          <div className="mil-heading text-white text-sm mt-1 truncate">{opord.meta.location}</div>
        </div>
        <div className="md:col-span-4">
          <div className="mono text-[10px] text-mil-sub tracking-widest uppercase">Pogoda</div>
          <div className="text-[13px] text-mil-text mt-1">{opord.meta.weather}</div>
        </div>
      </div>

      {/* Paragraphs */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {opord.paragraphs.map((p) => (
          <Paragraph key={p.id} p={p} />
        ))}
      </div>

      {/* Footer strip */}
      <div className="mt-8 pt-4 border-t border-[#1f1f1f] flex items-center justify-between mono text-[10px] text-mil-sub tracking-widest uppercase">
        <span>Koniec rozkazu — potwierdź na SR 70 MHz</span>
        <span className="text-mil-yellow">Dystrybucja · TF Northern Falcon</span>
      </div>
    </div>
  );
};

export default Opord;
