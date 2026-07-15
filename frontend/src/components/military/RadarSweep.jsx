import React from "react";

export const RadarSweep = ({ size = 96 }) => (
  <div
    className="relative"
    style={{ width: size, height: size }}
    data-testid="radar-sweep"
  >
    <div className="radar animate-radar-sweep absolute inset-0" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-1 h-1 rounded-full bg-mil-green shadow-[0_0_6px_#73C76B]" />
    </div>
    {/* crosshair */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-mil-green/20" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-mil-green/20" />
    </div>
  </div>
);

export default RadarSweep;
