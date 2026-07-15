import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Brain,
  Clock3,
  Crosshair,
  Shield,
  Skull,
  Boxes,
  Map,
  Satellite,
  Plane,
  Truck,
  Radio,
  Cross,
  PackageOpen,
  Scale,
  Files,
  Download,
  Settings,
  Layers,
} from "lucide-react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, active: true, phase: 1, testId: "nav-dashboard" },
  { to: "/opord", label: "Operation Order", icon: FileText, active: true, phase: 1, testId: "nav-opord" },
  { to: "/intel", label: "Intelligence", icon: Brain, testId: "nav-intel" },
  { to: "/timeline", label: "Mission Timeline", icon: Clock3, testId: "nav-timeline" },
  { to: "/objectives", label: "Objectives", icon: Crosshair, testId: "nav-objectives" },
  { to: "/friendly", label: "Friendly Forces", icon: Shield, testId: "nav-friendly" },
  { to: "/enemy", label: "Enemy Forces", icon: Skull, testId: "nav-enemy" },
  { to: "/assets", label: "Support Assets", icon: Boxes, testId: "nav-assets" },
  { to: "/maps", label: "Maps", icon: Map, testId: "nav-maps" },
  { to: "/satellite", label: "Satellite", icon: Satellite, testId: "nav-satellite" },
  { to: "/aircraft", label: "Aircraft", icon: Plane, testId: "nav-aircraft" },
  { to: "/vehicles", label: "Vehicles", icon: Truck, testId: "nav-vehicles" },
  { to: "/comms", label: "Communications", icon: Radio, testId: "nav-comms" },
  { to: "/medical", label: "Medical", icon: Cross, testId: "nav-medical" },
  { to: "/logistics", label: "Logistics", icon: PackageOpen, testId: "nav-logistics" },
  { to: "/roe", label: "Rules of Engagement", icon: Scale, testId: "nav-roe" },
  { to: "/files", label: "Mission Files", icon: Files, testId: "nav-files" },
  { to: "/downloads", label: "Downloads", icon: Download, testId: "nav-downloads" },
  { to: "/layers", label: "Overlays", icon: Layers, testId: "nav-layers" },
  { to: "/settings", label: "Settings", icon: Settings, testId: "nav-settings" },
];

const dotColor = (i) => ["#6FCF97", "#D2AF3A", "#5EA9FF", "#AAB9AA"][i % 4];

export const LeftNav = () => {
  return (
    <aside
      data-testid="left-nav"
      className="w-[240px] shrink-0 border-r border-mil-border bg-panel h-full overflow-y-auto"
    >
      <div className="px-3 py-3 border-b border-mil-border">
        <div className="mil-heading text-mil-green text-sm">TF NORTHERN FALCON</div>
        <div className="mono text-[10px] text-mil-sub mt-0.5">C2 PORTAL · v2.4.7</div>
      </div>
      <nav className="py-2">
        {items.map((it, idx) => {
          const Icon = it.icon;
          const disabled = !it.active;
          const content = (
            <>
              <Icon size={14} strokeWidth={1.8} />
              <span className="flex-1 truncate">{it.label}</span>
              <span
                className="led animate-led-blink"
                style={{
                  backgroundColor: dotColor(idx),
                  color: dotColor(idx),
                  opacity: disabled ? 0.4 : 1,
                }}
              />
            </>
          );
          if (disabled) {
            return (
              <div
                key={it.to}
                data-testid={`${it.testId}-disabled`}
                className="nav-item opacity-55 cursor-not-allowed"
                title="Phase 2"
              >
                {content}
              </div>
            );
          }
          return (
            <NavLink
              key={it.to}
              to={it.to}
              data-testid={it.testId}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            >
              {content}
            </NavLink>
          );
        })}
      </nav>
      <div className="mx-3 my-3 p-2 border border-mil-border rounded-md bg-panel-light">
        <div className="mil-heading text-[10px] text-mil-sub">SYSTEM LINK</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="led animate-led-blink" style={{ backgroundColor: "#6FCF97", color: "#6FCF97" }} />
          <span className="mono text-[11px] text-mil-text">SIPR · UP</span>
        </div>
        <div className="mono text-[10px] text-mil-sub mt-1">LATENCY 42ms</div>
      </div>
    </aside>
  );
};

export default LeftNav;
