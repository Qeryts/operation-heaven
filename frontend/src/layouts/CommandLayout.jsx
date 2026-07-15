import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "@/components/military/TopNav";

const CommandLayout = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-mil-text flex flex-col relative" data-testid="command-layout">
      <div className="page-top-glow" />
      <div className="page-top-fade" />
      <TopNav />

      <main className="flex-1 relative z-10" data-testid="main-workspace">
        <Outlet />
      </main>

      <footer className="border-t border-[#1f1f1f] mt-24" data-testid="footer">
        <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="mil-heading text-mil-text text-sm">Task Force Northern Falcon</div>
            <div className="mono text-[10px] text-mil-sub mt-1 tracking-widest">
              U.S. MARINE CORPS · MARSOC · OPERATION HEAVEN
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="chip chip-red">SECRET</span>
            <span className="chip">NOFORN</span>
            <span className="chip chip-yellow">DEFCON II</span>
            <span className="chip">v2.4.7</span>
          </div>
        </div>
        <div className="border-t border-[#1f1f1f] py-3">
          <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between mono text-[10px] text-mil-dim tracking-widest uppercase">
            <span>Wyłącznie do celów symulacji wojskowej · scenariusz fikcyjny</span>
            <span>Nie jest to oficjalny system DoD</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CommandLayout;
