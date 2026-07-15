import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import ClassificationBar from "@/components/military/ClassificationBar";
import ScanlineOverlay from "@/components/military/ScanlineOverlay";
import LeftNav from "@/components/military/LeftNav";
import RightSidebar from "@/components/military/RightSidebar";
import StatusLED from "@/components/military/StatusLED";

const CommandLayout = () => {
  const loc = useLocation();
  return (
    <div className="h-screen w-screen flex flex-col bg-bg text-mil-text overflow-hidden" data-testid="command-layout">
      <ScanlineOverlay />
      <ClassificationBar position="top" text="SECRET // NOFORN // TF NORTHERN FALCON — OPERATION HEAVEN" testId="class-top" />

      {/* Sub-header — system bar */}
      <div className="flex items-center justify-between px-4 h-9 border-b border-mil-border bg-panel-light" data-testid="sub-header">
        <div className="flex items-center gap-4">
          <Link to="/" className="mil-heading text-mil-green text-sm tracking-[0.28em]" data-testid="brand-link">
            USMC · MARSOC C2
          </Link>
          <span className="mono text-[10px] text-mil-sub">TERMINAL 07 · CPT. HALSTEAD, R.</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] mono text-mil-sub">
          <span className="flex items-center gap-1.5">
            <StatusLED state="success" /> SIPR
          </span>
          <span className="flex items-center gap-1.5">
            <StatusLED state="success" /> BFT
          </span>
          <span className="flex items-center gap-1.5">
            <StatusLED state="warning" /> JSTARS
          </span>
          <span>PATH · {loc.pathname}</span>
        </div>
      </div>

      {/* Main body */}
      <div className="flex flex-1 min-h-0">
        <LeftNav />
        <main className="flex-1 min-w-0 overflow-y-auto bg-bg tactical-grid" data-testid="main-workspace">
          <Outlet />
        </main>
        <RightSidebar />
      </div>

      {/* Footer classification */}
      <ClassificationBar
        position="bottom"
        text="FOR MILITARY SIMULATION PURPOSES ONLY — FICTIONAL SCENARIO — NOT AN OFFICIAL DOD SYSTEM"
        testId="class-bottom"
      />
    </div>
  );
};

export default CommandLayout;
