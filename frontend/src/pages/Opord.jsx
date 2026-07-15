import React, { useEffect, useState } from "react";
import axios from "axios";
import TacticalPanel from "@/components/military/TacticalPanel";
import StatusLED from "@/components/military/StatusLED";
import { FileText, ShieldAlert, Users, Target, Radio, Package, MapPin, Zap } from "lucide-react";

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

const stateFor = (id) =>
  ({
    situation: "info",
    enemy: "danger",
    friendly: "success",
    mission: "warning",
    execution: "warning",
    objectives: "danger",
    logistics: "info",
    command: "success",
    mettc: "info",
    appendix: "warning",
  }[id] || "info");

const Paragraph = ({ p }) => {
  const Icon = iconFor(p.id);
  return (
    <TacticalPanel
      title={
        <span className="flex items-center gap-2">
          <Icon size={13} />
          <span className="mono text-mil-warning">§{p.code}</span>
          <span>{p.title}</span>
          <span className="text-mil-sub text-[10px]">/ {p.en_title}</span>
        </span>
      }
      tag="S//NF"
      state={stateFor(p.id)}
      testId={`opord-${p.id}`}
    >
      {p.body && <p className="text-[13px] leading-relaxed text-mil-text whitespace-pre-line">{p.body}</p>}

      {p.list && (
        <div className="mt-3">
          <div className="mono text-[10px] text-mil-sub tracking-widest">{p.list.title}</div>
          <ul className="mt-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {p.list.items.map((i) => (
              <li key={i} className="border border-mil-border bg-panel-light px-2 py-1.5 mono text-[11px] text-mil-danger">
                {i}
              </li>
            ))}
          </ul>
        </div>
      )}

      {p.roster && (
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-1.5">
          {p.roster.map((r) => (
            <div key={r.cs} className="flex items-start gap-2 border border-mil-border bg-panel-light px-2 py-1.5">
              <StatusLED state="success" />
              <div className="min-w-0">
                <div className="mono text-[11px] text-mil-green">{r.cs}</div>
                <div className="text-[11px] text-mil-sub leading-snug">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {p.objectives && (
        <div className="mt-2 space-y-1.5">
          {p.objectives.map((o) => (
            <div key={o.code} className="flex items-start gap-2 border border-mil-border bg-panel-light px-2 py-1.5">
              <span className="mono text-[11px] text-mil-warning w-14 shrink-0">{o.code}</span>
              <span className="text-[12px] text-mil-text leading-snug">{o.desc}</span>
            </div>
          ))}
        </div>
      )}

      {p.comms && (
        <div className="mt-2 overflow-x-auto">
          <table className="w-full mono text-[11px] border border-mil-border">
            <thead className="bg-panel-light text-mil-sub tracking-widest">
              <tr>
                <th className="text-left px-2 py-1 border-b border-mil-border">CALLSIGN</th>
                <th className="text-left px-2 py-1 border-b border-mil-border">LR</th>
                <th className="text-left px-2 py-1 border-b border-mil-border">SR</th>
              </tr>
            </thead>
            <tbody>
              {p.comms.map((c) => (
                <tr key={c.cs} className="border-b border-mil-border/60 last:border-b-0">
                  <td className="px-2 py-1 text-mil-green">{c.cs}</td>
                  <td className="px-2 py-1 text-mil-text">{c.lr}</td>
                  <td className="px-2 py-1 text-mil-text">{c.sr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {p.warning && (
        <div className="mt-2 border border-mil-danger bg-mil-danger/10 px-2 py-1.5 mono text-[11px] text-mil-danger">
          {p.warning}
        </div>
      )}

      {p.codewords && (
        <div className="mt-2">
          <div className="mono text-[10px] text-mil-sub tracking-widest mb-1">HASŁA OPERACYJNE / CODEWORDS</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {p.codewords.map((c) => (
              <div key={c.code} className="flex items-center gap-2 border border-mil-border bg-panel-light px-2 py-1.5">
                <span className="mono text-[11px] text-mil-warning w-28 shrink-0">{c.code}</span>
                <span className="text-[11px] text-mil-text">{c.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {p.iff && (
        <div className="mt-2">
          <div className="mono text-[10px] text-mil-sub tracking-widest mb-1">SZYBKA IDENTYFIKACJA / IFF</div>
          <div className="flex gap-2 flex-wrap">
            {p.iff.map((i) => (
              <span key={i} className="mono text-[11px] border border-mil-border bg-panel-light px-2 py-1 text-mil-info">
                {i}
              </span>
            ))}
          </div>
        </div>
      )}

      {p.terrain && (
        <div className="mt-2 space-y-1.5">
          {p.terrain.map((t) => (
            <div key={t.zone} className="flex items-start gap-2 border border-mil-border bg-panel-light px-2 py-1.5">
              <MapPin size={13} className="text-mil-sub mt-0.5" />
              <div>
                <div className="mono text-[11px] text-mil-green">{t.zone}</div>
                <div className="text-[11px] text-mil-text">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {p.phases && (
        <div className="mt-2 space-y-2">
          {p.phases.map((ph) => (
            <div key={ph.phase} className="border border-mil-border bg-panel-light p-2">
              <div className="flex items-center gap-3">
                <div className="mono text-mil-warning tracking-widest">{ph.phase}</div>
                <div className="mono text-[11px] text-mil-green">{ph.code}</div>
              </div>
              <div className="text-[12px] text-mil-text mt-1">{ph.desc}</div>
            </div>
          ))}
        </div>
      )}
    </TacticalPanel>
  );
};

const Opord = () => {
  const [opord, setOpord] = useState(null);

  useEffect(() => {
    axios.get(`${API}/mission/opord`).then((r) => setOpord(r.data)).catch(() => {});
  }, []);

  if (!opord) {
    return (
      <div className="p-6 mono text-mil-sub" data-testid="opord-loading">
        LOADING OPORD<span className="term-cursor" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4" data-testid="opord-page">
      {/* Header */}
      <div className="mil-panel p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="mono text-[10px] text-mil-sub tracking-[0.3em]">
              OPERATION ORDER · TASK FORCE NORTHERN FALCON
            </div>
            <h1
              className="mil-heading text-mil-green"
              style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1, letterSpacing: "0.06em" }}
              data-testid="opord-title"
            >
              OPORD · OPERATION HEAVEN
            </h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mono text-[11px]">
            <div className="border border-mil-border bg-panel-light px-2 py-1.5">
              <div className="text-[10px] text-mil-sub">DATA</div>
              <div className="text-mil-text">{opord.meta.date}</div>
            </div>
            <div className="border border-mil-border bg-panel-light px-2 py-1.5">
              <div className="text-[10px] text-mil-sub">H-HOUR</div>
              <div className="text-mil-warning">{opord.meta.time}</div>
            </div>
            <div className="border border-mil-border bg-panel-light px-2 py-1.5">
              <div className="text-[10px] text-mil-sub">LOCATION</div>
              <div className="text-mil-text truncate">{opord.meta.location}</div>
            </div>
            <div className="border border-mil-border bg-panel-light px-2 py-1.5">
              <div className="text-[10px] text-mil-sub">CLASSIFICATION</div>
              <div className="text-mil-danger">{opord.meta.classification}</div>
            </div>
          </div>
        </div>
        <div className="mono text-[11px] text-mil-sub mt-2">
          POGODA · {opord.meta.weather}
        </div>
      </div>

      {/* Paragraphs */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {opord.paragraphs.map((p) => (
          <Paragraph key={p.id} p={p} />
        ))}
      </div>

      {/* Footer */}
      <div className="mil-panel p-3 flex items-center justify-between mono text-[10px] text-mil-sub">
        <span>END OF ORDER · ACKNOWLEDGE ON SR 70 MHz</span>
        <span className="text-mil-warning">DISTRIBUTION · TF NORTHERN FALCON ONLY</span>
      </div>
    </div>
  );
};

export default Opord;
