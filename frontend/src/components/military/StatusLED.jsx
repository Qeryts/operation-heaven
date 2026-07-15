import React from "react";

const stateColors = {
  success: "#6FCF97",
  danger: "#C73E3E",
  warning: "#D2AF3A",
  info: "#5EA9FF",
  neutral: "#AAB9AA",
};

export const StatusLED = ({ state = "success", label, testId, pulse = false }) => (
  <span className="inline-flex items-center gap-2" data-testid={testId}>
    <span
      className={`led ${pulse ? "led-pulse" : ""}`}
      style={{ backgroundColor: stateColors[state], color: stateColors[state] }}
    />
    {label && (
      <span className="mono text-[10px] tracking-widest uppercase text-mil-sub">
        {label}
      </span>
    )}
  </span>
);

export default StatusLED;
