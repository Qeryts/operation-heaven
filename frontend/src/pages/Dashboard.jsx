import React, { useEffect, useState } from "react";
import axios from "axios";
import TacticalPanel from "@/components/military/TacticalPanel";
import StatusLED from "@/components/military/StatusLED";
import RadarSweep from "@/components/military/RadarSweep";
import {
  Activity,
  Gauge,
  Timer,
  CloudSun,
  Flame,
  Layers,
  Boxes,
  Crosshair,
  PlaneTakeoff,
  Radar,
  Truck,
  HeartPulse,
  Radio,
  AlertTriangle,
  Brain,
  Map,
  RefreshCw,
} from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const iconMap = {
  "op-status": Activity,
  "mission-progress": Gauge,
  "mission-clock": Timer,
  weather: CloudSun,
  "enemy-activity": Flame,
  "current-phase": Layers,
  "assets-ready": Boxes,
  "jtac-status": Crosshair,
  extraction: PlaneTakeoff,
  airspace: Radar,
  logistics: Truck,
  medical: HeartPulse,
  comms: Radio,
  alerts: AlertTriangle,
  intel: Brain,
  "airspace-map": Map,
};

const stateText = {
  success: "text-mil-success",
  danger: "text-mil-danger",
  warning: "text-mil-warning",
  info: "text-mil-info",
};

const Dashboard = () => {
  const [data, setData] = useState({ widgets: [] });
  const [tick, setTick] = useState(0);

  const load = () =>
    axios.get(`${API}/mission/dashboard`).then((r) => setData(r.data)).catch(() => {});

  useEffect(() => {
    load();
    const t = setInterval(() => setTick((v) => v + 1), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="p-4 space-y-4" data-testid="dashboard-page">
      {/* Header strip */}
      <div className="flex items-center justify-between mil-panel px-4 py-2">
        <div className="flex items-center gap-3">
          <StatusLED state="success" />
          <h1 className="mil-heading text-mil-green tracking-[0.24em]" data-testid="dashboard-title">
            COMMAND DASHBOARD · OPERATION HEAVEN
          </h1>
        </div>
        <div className="flex items-center gap-4 mono text-[10px] text-mil-sub">
          <span>REFRESH · 5s</span>
          <span className="text-mil-warning">TICK {tick.toString().padStart(4, "0")}</span>
          <button
            onClick={load}
            className="flex items-center gap-1 border border-mil-border px-2 py-1 hover:border-mil-green hover:text-mil-green"
            data-testid="dashboard-refresh"
          >
            <RefreshCw size={12} /> SYNC
          </button>
        </div>
      </div>

      {/* Widget grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3" data-testid="widget-grid">
        {data.widgets.map((w) => {
          const Icon = iconMap[w.id] || Activity;
          return (
            <TacticalPanel
              key={w.id}
              title={w.title}
              tag="S//NF"
              state={w.state}
              testId={`widget-${w.id}`}
              right={<Icon size={13} className="text-mil-sub" />}
            >
              <div className="flex items-baseline justify-between">
                <div className={`mil-heading text-2xl ${stateText[w.state] || "text-mil-text"}`}>
                  {w.value}
                </div>
                <div className="mono text-[10px] text-mil-sub">LIVE</div>
              </div>
              <div className="mono text-[11px] text-mil-sub mt-2 min-h-[16px]">{w.detail}</div>
              {/* mini bar */}
              <div className="mt-3 h-1 bg-panel-light overflow-hidden rounded-sm">
                <div
                  className="h-full"
                  style={{
                    width: `${((w.title.length * 7) % 80) + 15}%`,
                    background:
                      w.state === "danger"
                        ? "#C73E3E"
                        : w.state === "warning"
                        ? "#D2AF3A"
                        : w.state === "info"
                        ? "#5EA9FF"
                        : "#6FCF97",
                    opacity: 0.7,
                  }}
                />
              </div>
            </TacticalPanel>
          );
        })}
      </div>

      {/* Bottom row: radar + mission alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-3">
        <TacticalPanel title="TACTICAL SITUATION · AO MAHBOOT" tag="S//NF" state="info" testId="widget-radar" glow>
          <div className="flex items-center gap-4">
            <RadarSweep size={160} />
            <div className="space-y-1.5 mono text-[11px] flex-1">
              <div className="flex justify-between"><span className="text-mil-sub">CONTACTS</span><span className="text-mil-warning">7</span></div>
              <div className="flex justify-between"><span className="text-mil-sub">HOSTILE</span><span className="text-mil-danger">4</span></div>
              <div className="flex justify-between"><span className="text-mil-sub">FRIENDLY</span><span className="text-mil-success">12</span></div>
              <div className="flex justify-between"><span className="text-mil-sub">UNKNOWN</span><span className="text-mil-info">3</span></div>
              <div className="flex justify-between"><span className="text-mil-sub">RANGE</span><span className="text-mil-text">14.3 km</span></div>
              <div className="flex justify-between"><span className="text-mil-sub">SWEEP</span><span className="text-mil-text">4.0 s</span></div>
            </div>
          </div>
        </TacticalPanel>

        <TacticalPanel title="MISSION ALERTS · LAST 60 MIN" tag="S//NF" state="warning" testId="widget-alertfeed">
          <ul className="space-y-1.5 mono text-[11px]">
            {[
              { t: "23:58Z", s: "warning", m: "COMSEC advisory — possible SIGINT intercepts on SR 55 MHz." },
              { t: "23:47Z", s: "info", m: "WX update — visibility HOLDING GOOD through H+04." },
              { t: "23:41Z", s: "danger", m: "OB-B4 · unknown AA emplacement — location UNCONFIRMED." },
              { t: "23:22Z", s: "success", m: "Raptor Actual established LP/OP FOX. Overwatch OB-B1..B4." },
              { t: "23:05Z", s: "info", m: "Hawk 1-1 / 1-2 airborne — Bull's 1-2-1 · channel 1-1-3." },
              { t: "22:50Z", s: "success", m: "Yankee 1-1 preflight complete — CH-53E green across the board." },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-2 border-b border-mil-border/50 pb-1.5 last:border-b-0">
                <StatusLED state={a.s} />
                <span className="text-mil-sub w-14 shrink-0">{a.t}</span>
                <span className="flex-1 text-mil-text">{a.m}</span>
              </li>
            ))}
          </ul>
        </TacticalPanel>
      </div>
    </div>
  );
};

export default Dashboard;
