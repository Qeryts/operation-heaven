import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Strona główna", exact: true, testId: "nav-home" },
  { to: "/opord", label: "OPORD", testId: "nav-opord" },
  { to: "/roe", label: "ROE", testId: "nav-roe" },
  { to: "/dodatki", label: "Dodatki", testId: "nav-dodatki" },
];

const TopNav = () => {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/85 backdrop-blur border-b border-[#1f1f1f]">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" data-testid="brand-logo">
          <div className="relative w-9 h-9 flex items-center justify-center border border-[#262626]">
            <span className="mil-heading text-mil-green text-sm">TF</span>
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-mil-green rounded-full shadow-[0_0_6px_#7fb069]" />
          </div>
          <div className="leading-tight">
            <div className="mil-heading text-mil-text text-[13px]">Northern Falcon</div>
            <div className="mono text-[9px] text-mil-sub tracking-[0.24em] uppercase">Operation Heaven</div>
          </div>
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.exact}
              data-testid={l.testId}
              className={({ isActive }) => `top-nav-link ${isActive ? "active" : ""}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Right classification tag + menu btn */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 chip chip-red" data-testid="header-classification">
            <span className="dot" style={{ background: "#b84a4a", color: "#b84a4a" }} />
            SECRET // NOFORN
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-mil-text"
            data-testid="mobile-menu-toggle"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#1f1f1f] bg-[#0a0a0a]" data-testid="mobile-menu">
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.exact}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `top-nav-link ${isActive ? "active" : ""}`}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNav;
