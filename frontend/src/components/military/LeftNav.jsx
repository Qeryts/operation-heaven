import React from "react";
import { NavLink } from "react-router-dom";
import { FileText, Satellite, Scale, Package } from "lucide-react";

const items = [
  { to: "/opord", label: "Operation Order", icon: FileText, testId: "nav-opord" },
  { to: "/satellite", label: "Satellite", icon: Satellite, testId: "nav-satellite" },
  { to: "/roe", label: "Rules of Engagement", icon: Scale, testId: "nav-roe" },
  { to: "/equipment", label: "Equipment", icon: Package, testId: "nav-equipment" },
];

export const LeftNav = () => {
  return (
    <aside
      data-testid="left-nav"
      className="w-[220px] shrink-0 border-r border-mil-border bg-panel h-full overflow-y-auto"
    >
      <div className="px-3 py-3 border-b border-mil-border">
        <div className="mil-heading text-mil-green text-sm">TF NORTHERN FALCON</div>
        <div className="mono text-[10px] text-mil-sub mt-0.5">C2 PORTAL · v2.4.7</div>
      </div>
      <nav className="py-2">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <NavLink
              key={it.to}
              to={it.to}
              data-testid={it.testId}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={14} strokeWidth={1.8} />
              <span className="flex-1 truncate">{it.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="mx-3 my-3 p-2 border border-mil-border rounded-md bg-panel-light">
        <div className="mil-heading text-[10px] text-mil-sub">SYSTEM LINK</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="led" style={{ backgroundColor: "#6FCF97", color: "#6FCF97" }} />
          <span className="mono text-[11px] text-mil-text">SIPR · UP</span>
        </div>
        <div className="mono text-[10px] text-mil-sub mt-1">LATENCY 42ms</div>
      </div>
    </aside>
  );
};

export default LeftNav;
