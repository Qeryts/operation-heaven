import React from "react";
import TacticalPanel from "@/components/military/TacticalPanel";
import { ShieldCheck, Users2, TrendingUp, Ban, Target, Plane, AlertOctagon } from "lucide-react";

const cards = [
  {
    id: "pid",
    icon: ShieldCheck,
    title: "POSITIVE IDENTIFICATION (PID)",
    state: "success",
    body:
      "All engagements require positive identification of a hostile force before the application of lethal force. PID may be established through observed hostile act, hostile intent, or verified declaration by higher authority.",
    bullets: [
      "Observed hostile act or hostile intent required",
      "Weapon in hand and directed toward friendly forces",
      "Coordinated maneuver consistent with attack",
    ],
  },
  {
    id: "civilians",
    icon: Users2,
    title: "CIVILIAN PRESENCE",
    state: "warning",
    body:
      "Assume civilian presence in villages, markets and MSRs until confirmed otherwise. Distinguish combatants from non-combatants at all times. When in doubt, hold fire and request verification through Godfather.",
    bullets: [
      "Assume presence in built-up areas (OB-A2, OB-A3)",
      "Withhold fire in vicinity of women, children, elderly",
      "Report suspected non-combatants on SR 50 MHz",
    ],
  },
  {
    id: "eof",
    icon: TrendingUp,
    title: "ESCALATION OF FORCE",
    state: "info",
    body:
      "Employ graduated response before lethal force whenever tactical situation permits. The 5 S's: Shout, Show, Shove, Shoot warning, Shoot to kill.",
    bullets: [
      "1. SHOUT — verbal warning in local language / English",
      "2. SHOW — display weapon, hand signals, IR strobe",
      "3. SHOVE — physical control if within contact range",
      "4. SHOOT warning — controlled disabling fire",
      "5. SHOOT to eliminate threat — only if PID satisfied",
    ],
  },
  {
    id: "friendly-fire",
    icon: Ban,
    title: "FRIENDLY FIRE / FRATRICIDE",
    state: "danger",
    body:
      "IFF markings are mandatory for all elements. Report grid before engagement of any target within 500 m of adjacent callsigns. Deconflict fires through JTAC (Raptor Actual) prior to CAS employment.",
    bullets: [
      "IR strobe · Blue chemlight · None (see IFF card)",
      "Deconflict all fires within 500 m through JTAC",
      "Blue-force BFT check required before CAS run",
    ],
  },
  {
    id: "capture-hvt",
    icon: Target,
    title: "CAPTURE OF HVT (JACKPOT ×3)",
    state: "warning",
    body:
      "Maliqq Abdul Bukaqe — Kill or Capture. Preference is CAPTURE for intelligence exploitation, however lethal force is authorized if the HVT poses direct threat or attempts to flee AO. Announce JACKPOT ×3 on LR 70 MHz upon secure.",
    bullets: [
      "Preference: CAPTURE for tactical questioning",
      "Lethal force authorized if PID + direct threat",
      "Announce JACKPOT ×3 on LR 70 MHz on secure",
      "Transfer custody to Godfather at FOB GLITTER",
    ],
  },
  {
    id: "cas-approval",
    icon: Plane,
    title: "CAS APPROVAL AUTHORITY",
    state: "info",
    body:
      "All CAS employment routed through Raptor Actual (JTAC). Type 1, 2, 3 controls per JP 3-09.3. Bull's 1-2-1 · channel 1-1-3. Hawk 1-1 / 1-2 (A-10C) on station. No fires within 100 m of civilian structures without CDE approval by Godfather.",
    bullets: [
      "JTAC: Raptor Actual — final clearance required",
      "Frequency: SR 51.121 MHz (Bull's 1-2-1)",
      "9-line brief mandatory before every strike",
      "TIC condition permits Type 3 control",
    ],
  },
  {
    id: "cde",
    icon: AlertOctagon,
    title: "COLLATERAL DAMAGE ESTIMATE (CDE)",
    state: "danger",
    body:
      "Weapon selection must minimize risk to non-combatants and infrastructure. CDE Level 1-5 per CJCSI 3160.01. Level 4+ requires Godfather approval. Prefer precision-guided munitions over unguided ordnance in populated areas (OB-A2, OB-A3).",
    bullets: [
      "CDE 1-3: cleared at JTAC level",
      "CDE 4-5: requires Godfather (O-6+) approval",
      "Prefer GBU-38 / GBU-54 over Mk 82 in urban",
      "No BLU-97 munitions authorized in AO",
    ],
  },
];

const stateAccent = {
  success: "text-mil-success border-mil-success/40",
  danger: "text-mil-danger border-mil-danger/40",
  warning: "text-mil-warning border-mil-warning/40",
  info: "text-mil-info border-mil-info/40",
};

const ROE = () => {
  return (
    <div className="p-4 space-y-4" data-testid="roe-page">
      <div className="mil-panel p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="mono text-[10px] text-mil-sub tracking-[0.3em]">
            RULES OF ENGAGEMENT · CJCSI 3121.01B · OPERATION HEAVEN
          </div>
          <h1
            className="mil-heading text-mil-green"
            style={{ fontSize: "clamp(26px, 3vw, 40px)", lineHeight: 1 }}
            data-testid="roe-title"
          >
            RULES OF ENGAGEMENT
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-2 mono text-[11px]">
          <div className="border border-mil-border bg-panel-light px-2 py-1.5">
            <div className="text-[10px] text-mil-sub">STATUS</div>
            <div className="text-mil-warning">AMBER</div>
          </div>
          <div className="border border-mil-border bg-panel-light px-2 py-1.5">
            <div className="text-[10px] text-mil-sub">EFFECTIVE</div>
            <div className="text-mil-text">27 MAY 2022 · 2000Z</div>
          </div>
          <div className="border border-mil-border bg-panel-light px-2 py-1.5">
            <div className="text-[10px] text-mil-sub">AUTHORITY</div>
            <div className="text-mil-text">CJTF-OIR</div>
          </div>
        </div>
      </div>

      <div className="mil-panel px-4 py-3 border-l-4 border-l-mil-warning">
        <div className="mono text-[10px] text-mil-warning tracking-widest">NOTICE</div>
        <div className="text-[13px] text-mil-text mt-0.5">
          These ROE are a fictional simulation product. Read and acknowledge on SR 70 MHz. Deviations require
          Godfather approval. When in doubt — HOLD FIRE and request clarification.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <TacticalPanel
              key={c.id}
              title={
                <span className="flex items-center gap-2">
                  <Icon size={13} />
                  <span>{c.title}</span>
                </span>
              }
              tag="S//NF"
              state={c.state}
              testId={`roe-${c.id}`}
            >
              <p className="text-[13px] leading-relaxed text-mil-text">{c.body}</p>
              <ul className={`mt-3 border-l-2 pl-3 space-y-1 ${stateAccent[c.state]}`}>
                {c.bullets.map((b, i) => (
                  <li key={i} className="text-[12px] text-mil-sub">
                    <span className="mono text-mil-text">▸ </span>
                    {b}
                  </li>
                ))}
              </ul>
            </TacticalPanel>
          );
        })}
      </div>

      <div className="mil-panel p-3 flex items-center justify-between mono text-[10px] text-mil-sub">
        <span>ACKNOWLEDGE ON SR 70 MHz — GODFATHER</span>
        <span className="text-mil-warning">END OF ROE</span>
      </div>
    </div>
  );
};

export default ROE;
