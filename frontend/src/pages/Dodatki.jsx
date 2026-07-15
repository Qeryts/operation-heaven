import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Satellite, Package, Clock, Radio, Compass, ArrowRight } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const formatZulu = (d) => {
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  const ss = String(d.getUTCSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}Z`;
};

const Card = ({ eyebrow, title, children, to, testId }) => {
  const Wrap = to ? Link : "div";
  return (
    <Wrap
      {...(to ? { to, "data-testid": testId } : { "data-testid": testId })}
      className="mil-card p-6 block hover:border-[#3a3a3a] transition-colors"
    >
      {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}
      {title && <div className="mil-heading text-white text-xl mt-2">{title}</div>}
      <div className="mt-4 text-[13px] text-mil-sub leading-relaxed">{children}</div>
      {to && (
        <div className="mt-5 flex items-center gap-2 mono text-[10px] text-mil-green tracking-[0.24em] uppercase">
          Otwórz <ArrowRight size={12} />
        </div>
      )}
    </Wrap>
  );
};

const Dodatki = () => {
  const [sidebar, setSidebar] = useState(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    axios.get(`${API}/mission/sidebar`).then((r) => setSidebar(r.data)).catch(() => {});
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-16" data-testid="dodatki-page">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <div className="section-eyebrow">▬ Materiały uzupełniające</div>
          <h1 className="mil-heading text-white text-3xl md:text-4xl mt-2" data-testid="dodatki-title">
            Dodatki operacyjne
          </h1>
          <p className="mt-3 text-[13px] text-mil-sub max-w-2xl">
            Rozpoznanie, ekwipunek, oraz aktualny stan sił i środków misji OPERATION HEAVEN.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="chip chip-red">SECRET // NOFORN</span>
          <span className="chip">TF NORTHERN FALCON</span>
        </div>
      </div>

      {/* Section 1: sub-pages */}
      <section className="mb-14">
        <div className="section-eyebrow mb-4">Sekcje</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            eyebrow={<span className="flex items-center gap-2"><Satellite size={12} /> Rozpoznanie satelitarne</span>}
            title="Zdjęcia satelitarne"
            to="/dodatki/satelita"
            testId="dodatki-tile-satelita"
          >
            Produkty rozpoznania orbitalnego — przegląd AO Mahboot, LZ Ice / Drake / Juliet, LP/OP Fox, MSR Quack oraz cele OB-A1..OB-B1.
            Każdy kadr zawiera siatkę MGRS, znacznik czasu i typ sensora.
          </Card>
          <Card
            eyebrow={<span className="flex items-center gap-2"><Package size={12} /> Wyposażenie indywidualne</span>}
            title="Ekwipunek load-out"
            to="/dodatki/ekwipunek"
            testId="dodatki-tile-ekwipunek"
          >
            Uzbrojenie, optyka, łączność, ochrona i medycyna — pełen load-out operatora MARSOC (M27, M4A1 Block II, M320, M240B,
            AN/PRC-152A, AN/PVS-31A, Ops-Core, AVS, IFAK i inne).
          </Card>
        </div>
      </section>

      {/* Section 2: live widgets */}
      <section className="mb-14">
        <div className="section-eyebrow mb-4">Stan operacyjny · na żywo</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mission clock */}
          <div className="mil-card p-6" data-testid="dodatki-clock">
            <div className="section-eyebrow flex items-center gap-2"><Clock size={12} /> Zegar misji</div>
            <div className="mono text-3xl text-mil-green mt-3 tracking-widest">{formatZulu(now)}</div>
            <div className="mono text-[10px] text-mil-sub mt-2 tracking-widest uppercase">Czas systemowy (Zulu)</div>
            <div className="mt-4 pt-4 border-t border-[#1f1f1f]">
              <div className="mono text-[10px] text-mil-sub tracking-widest uppercase">Do H-Hour</div>
              <div className="mil-heading text-mil-yellow text-xl mt-1">{sidebar?.mission_clock || "T-00:34:12"}</div>
            </div>
          </div>

          {/* Operational state */}
          <div className="mil-card p-6" data-testid="dodatki-state">
            <div className="section-eyebrow">Stan operacyjny</div>
            <div className="grid grid-cols-2 gap-y-4 mt-4">
              <div>
                <div className="mono text-[10px] text-mil-sub tracking-widest uppercase">Faza</div>
                <div className="mil-heading text-mil-green text-base mt-1">{sidebar?.phase || "II · GAMBLER ×3"}</div>
              </div>
              <div>
                <div className="mono text-[10px] text-mil-sub tracking-widest uppercase">DEFCON</div>
                <div className="mil-heading text-mil-yellow text-base mt-1">{sidebar?.defcon || "II"}</div>
              </div>
              <div>
                <div className="mono text-[10px] text-mil-sub tracking-widest uppercase">ROE</div>
                <div className="mil-heading text-mil-yellow text-base mt-1">{sidebar?.roe || "AMBER"}</div>
              </div>
              <div>
                <div className="mono text-[10px] text-mil-sub tracking-widest uppercase">Klauzula</div>
                <div className="mil-heading text-mil-red text-base mt-1">SECRET</div>
              </div>
            </div>
          </div>

          {/* Geospatial */}
          <div className="mil-card p-6" data-testid="dodatki-geo">
            <div className="section-eyebrow flex items-center gap-2"><Compass size={12} /> Geolokalizacja · MGRS</div>
            <div className="mono text-lg text-mil-text mt-3 tracking-wider">{sidebar?.coordinates || "42S WC 12345 67890"}</div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <div className="mono text-[10px] text-mil-sub tracking-widest uppercase">Wiatr</div>
                <div className="mono text-sm text-mil-text mt-1">{sidebar?.wind || "8 KT / 210°"}</div>
              </div>
              <div>
                <div className="mono text-[10px] text-mil-sub tracking-widest uppercase">Księżyc</div>
                <div className="mono text-sm text-mil-text mt-1">{sidebar?.moon || "74%"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: assets on station */}
      <section>
        <div className="section-eyebrow mb-4 flex items-center gap-2"><Radio size={12} /> Zasoby na stanowisku</div>
        <div className="mil-card overflow-hidden" data-testid="dodatki-assets">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#1f1f1f] text-left">
                <th className="mono text-[10px] tracking-widest text-mil-sub uppercase px-4 py-3">Kryptonim</th>
                <th className="mono text-[10px] tracking-widest text-mil-sub uppercase px-4 py-3">Rola</th>
                <th className="mono text-[10px] tracking-widest text-mil-sub uppercase px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {(sidebar?.assets_on_station || []).map((a) => (
                <tr key={a.cs} className="border-b border-[#161616] last:border-b-0 hover:bg-[#0d0d0d]">
                  <td className="px-4 py-3 mono text-mil-green">{a.cs}</td>
                  <td className="px-4 py-3 mono text-mil-text text-[12px]">{a.role}</td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`chip ${
                        a.status === "AIRBORNE" ? "chip-green" : a.status === "IN TRANSIT" ? "chip-yellow" : ""
                      }`}
                    >
                      <span
                        className="dot"
                        style={{
                          background:
                            a.status === "AIRBORNE" ? "#7fb069" : a.status === "IN TRANSIT" ? "#d4b34a" : "#8a8a8a",
                          color: "currentcolor",
                        }}
                      />
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dodatki;
