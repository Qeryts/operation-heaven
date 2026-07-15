import React from "react";
import StatusLED from "@/components/military/StatusLED";

export const TacticalPanel = ({
  title,
  tag = "S//NF",
  state = "success",
  right,
  children,
  className = "",
  bodyClassName = "",
  glow = false,
  testId,
}) => {
  return (
    <section
      data-testid={testId}
      className={`mil-panel corner-brackets ${glow ? "hud-glow" : ""} ${className}`}
    >
      <header className="mil-panel-header">
        <div className="flex items-center gap-2 min-w-0">
          <StatusLED state={state} />
          <span className="truncate">{title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {right}
          <span className="mono text-[9px] tracking-widest text-mil-warning border border-mil-border px-1.5 py-[1px] rounded-sm">
            {tag}
          </span>
        </div>
      </header>
      <div className={`relative p-3 ${bodyClassName}`}>
        <div className="grain-overlay" />
        {children}
      </div>
    </section>
  );
};

export default TacticalPanel;
