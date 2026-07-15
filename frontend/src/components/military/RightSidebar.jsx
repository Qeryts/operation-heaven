import React, { useEffect, useState } from "react";
import TacticalPanel from "@/components/military/TacticalPanel";
import StatusLED from "@/components/military/StatusLED";
import RadarSweep from "@/components/military/RadarSweep";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const formatZulu = (d) => {
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  const ss = String(d.getUTCSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}Z`;
};

export const RightSidebar = () => {
  const [sidebar, setSidebar] = useState(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    axios.get(`${API}/mission/sidebar`).then((r) => setSidebar(r.data)).catch(() => {});
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <aside
      data-testid="right-sidebar"
      className="w-[320px] shrink-0 border-l border-mil-border bg-bg h-full overflow-y-auto p-3 space-y-3"
    >
      <TacticalPanel title="MISSION CLOCK · ZULU" tag="S//NF" state="warning" testId="sidebar-clock">
        <div className="flex items-center justify-between">
          <div>
            <div className="mono text-[10px] text-mil-sub">SYSTEM TIME</div>
            <div className="mono text-2xl text-mil-green tracking-widest">
              {formatZulu(now)}
            </div>
            <div className="mono text-[10px] text-mil-sub mt-2">H-HOUR</div>
            <div className="mono text-lg text-mil-warning">{sidebar?.mission_clock || "T-00:34:12"}</div>
          </div>
          <RadarSweep size={92} />
        </div>
      </TacticalPanel>

      <TacticalPanel title="OPERATIONAL STATE" tag="S//NF" state="info" testId="sidebar-state">
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <div className="mono text-[10px] text-mil-sub">PHASE</div>
            <div className="mil-heading text-mil-green">{sidebar?.phase || "II · GAMBLER ×3"}</div>
          </div>
          <div>
            <div className="mono text-[10px] text-mil-sub">DEFCON</div>
            <div className="mil-heading text-mil-warning">{sidebar?.defcon || "II"}</div>
          </div>
          <div>
            <div className="mono text-[10px] text-mil-sub">ROE</div>
            <div className="mil-heading text-mil-warning">{sidebar?.roe || "AMBER"}</div>
          </div>
          <div>
            <div className="mono text-[10px] text-mil-sub">CLASS</div>
            <div className="mil-heading text-mil-danger">SECRET</div>
          </div>
        </div>
      </TacticalPanel>

      <TacticalPanel title="ASSETS ON STATION" tag="S//NF" state="success" testId="sidebar-assets">
        <ul className="space-y-1.5">
          {(sidebar?.assets_on_station || []).map((a) => (
            <li key={a.cs} className="flex items-center gap-2 text-[11px]">
              <StatusLED state={a.status === "AIRBORNE" ? "success" : a.status === "IN TRANSIT" ? "info" : "warning"} />
              <div className="flex-1 min-w-0">
                <div className="mono text-mil-text truncate">{a.cs}</div>
                <div className="mono text-[10px] text-mil-sub truncate">{a.role}</div>
              </div>
              <div className="mono text-[10px] text-mil-sub">{a.status}</div>
            </li>
          ))}
        </ul>
      </TacticalPanel>

      <TacticalPanel title="GEOSPATIAL · MGRS" tag="S//NF" state="info" testId="sidebar-geo">
        <div className="mono text-[11px] text-mil-text">{sidebar?.coordinates || "42S WC 12345 67890"}</div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] mono text-mil-sub">
          <div>WIND · {sidebar?.wind || "8 KT / 210°"}</div>
          <div>MOON · {sidebar?.moon || "74%"}</div>
        </div>
        <div className="mt-2 tactical-grid h-16 rounded-sm border border-mil-border/60" />
      </TacticalPanel>
    </aside>
  );
};

export default RightSidebar;
