import React from "react";
import { ShieldCheck, Users2, TrendingUp, Ban, Target, Plane, AlertOctagon } from "lucide-react";

const cards = [
  {
    id: "pid",
    icon: ShieldCheck,
    title: "Positive Identification (PID)",
    accent: "text-mil-green",
    body:
      "Każde zaangażowanie wymaga pozytywnej identyfikacji siły wrogiej przed użyciem środków bojowych. PID może zostać ustalone poprzez zaobserwowany akt lub intencję wrogą, lub potwierdzenie przez wyższe dowództwo.",
    bullets: [
      "Wymagany zaobserwowany akt lub intencja wroga",
      "Broń w ręku i skierowana w stronę sił własnych",
      "Skoordynowany manewr wskazujący na atak",
    ],
  },
  {
    id: "civilians",
    icon: Users2,
    title: "Obecność cywilów",
    accent: "text-mil-yellow",
    body:
      "Zakładaj obecność cywilów w wioskach, na targowiskach i wzdłuż MSR do czasu potwierdzenia inaczej. Rozróżniaj kombatantów od niekombatantów w każdej sytuacji. W razie wątpliwości — wstrzymaj ogień i zażądaj weryfikacji przez Godfather.",
    bullets: [
      "Zakładaj obecność w rejonach zabudowanych (OB-A2, OB-A3)",
      "Wstrzymaj ogień w pobliżu kobiet, dzieci i osób starszych",
      "Raportuj podejrzanych niekombatantów na SR 50 MHz",
    ],
  },
  {
    id: "eof",
    icon: TrendingUp,
    title: "Eskalacja użycia siły",
    accent: "text-mil-text",
    body:
      "Stosuj stopniowaną odpowiedź przed użyciem środków śmiercionośnych, jeśli sytuacja taktyczna na to pozwala. Zasada 5 S: Shout, Show, Shove, Shoot warning, Shoot to kill.",
    bullets: [
      "1. SHOUT — ostrzeżenie werbalne w j. lokalnym / angielskim",
      "2. SHOW — pokazanie broni, sygnały ręczne, stroboskop IR",
      "3. SHOVE — kontakt fizyczny w zasięgu bezpośrednim",
      "4. SHOOT warning — kontrolowany ogień unieszkodliwiający",
      "5. SHOOT to eliminate — tylko przy spełnionym PID",
    ],
  },
  {
    id: "friendly-fire",
    icon: Ban,
    title: "Bratobójczy ogień / Fratricide",
    accent: "text-mil-red",
    body:
      "Znaczniki IFF są obowiązkowe dla wszystkich elementów. Raportuj namiary przed engagement dowolnego celu w promieniu 500 m od sąsiednich kryptonimów. Deconflict wszystkich fires przez JTAC (Raptor Actual) przed użyciem CAS.",
    bullets: [
      "Stroboskop IR · Świetlik niebieski · Brak (patrz IFF card)",
      "Deconflict wszystkich fires w promieniu 500 m przez JTAC",
      "Sprawdzenie BFT przed każdym runem CAS",
    ],
  },
  {
    id: "capture-hvt",
    icon: Target,
    title: "Kill or Capture HVT (JACKPOT ×3)",
    accent: "text-mil-yellow",
    body:
      "Maliqq Abdul Bukaqe — Kill or Capture. Preferowane jest ZATRZYMANIE do eksploatacji wywiadowczej, jednak środki śmiercionośne są autoryzowane jeśli HVT stanowi bezpośrednie zagrożenie lub próbuje uciec z AO. Ogłoś JACKPOT ×3 na LR 70 MHz po zabezpieczeniu.",
    bullets: [
      "Preferencja: ZATRZYMANIE do tactical questioning",
      "Środki śmiercionośne autoryzowane przy PID + bezpośrednim zagrożeniu",
      "Ogłoś JACKPOT ×3 na LR 70 MHz po zabezpieczeniu",
      "Przekazanie pieczy do Godfather w FOB GLITTER",
    ],
  },
  {
    id: "cas-approval",
    icon: Plane,
    title: "Zatwierdzanie CAS",
    accent: "text-mil-text",
    body:
      "Całość CAS naprowadzana przez Raptor Actual (JTAC). Kontrola typu 1, 2, 3 wg JP 3-09.3. Bull's 1-2-1 · kanał 1-1-3. Hawk 1-1 / 1-2 (A-10C) na stanowisku. Brak fires w promieniu 100 m od obiektów cywilnych bez zatwierdzenia CDE przez Godfather.",
    bullets: [
      "JTAC: Raptor Actual — wymagane finalne zezwolenie",
      "Częstotliwość: SR 51.121 MHz (Bull's 1-2-1)",
      "Odprawa 9-line obowiązkowa przed każdym strike'em",
      "Warunek TIC dopuszcza kontrolę typu 3",
    ],
  },
  {
    id: "cde",
    icon: AlertOctagon,
    title: "Ocena szkód pobocznych (CDE)",
    accent: "text-mil-red",
    body:
      "Dobór środków musi minimalizować ryzyko dla ludności cywilnej i infrastruktury. CDE Level 1-5 wg CJCSI 3160.01. Level 4+ wymaga zatwierdzenia przez Godfather. Preferuj amunicję precyzyjną nad niekierowaną w rejonach zabudowanych (OB-A2, OB-A3).",
    bullets: [
      "CDE 1-3: zatwierdzane na poziomie JTAC",
      "CDE 4-5: wymaga zatwierdzenia Godfather (O-6+)",
      "Preferuj GBU-38 / GBU-54 nad Mk 82 w terenie miejskim",
      "Amunicja BLU-97 niedopuszczona w AO",
    ],
  },
];

const ROE = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-16" data-testid="roe-page">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <div className="section-eyebrow">▬ Rules of Engagement · CJCSI 3121.01B</div>
          <h1
            className="mil-heading text-white mt-2"
            style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.05 }}
            data-testid="roe-title"
          >
            ROE · Operation Heaven
          </h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="chip chip-yellow">Status · AMBER</span>
          <span className="chip">Ważne od · 27 MAY 2022 · 2000Z</span>
          <span className="chip">CJTF-OIR</span>
        </div>
      </div>

      {/* Notice */}
      <div className="mil-card p-5 border-l-2 border-l-mil-yellow mb-10">
        <div className="mono text-[10px] text-mil-yellow tracking-widest uppercase">Uwaga</div>
        <p className="text-[13px] text-mil-text mt-1 leading-relaxed">
          Poniższe zasady walki są produktem fikcyjnej symulacji. Potwierdź odczyt na SR 70 MHz. Odstępstwa wymagają zatwierdzenia
          przez Godfather. W razie wątpliwości — <span className="text-mil-yellow">WSTRZYMAJ OGIEŃ</span> i zażądaj wyjaśnienia.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <section key={c.id} className="mil-card p-6 md:p-7" data-testid={`roe-${c.id}`}>
              <header className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-[#1f1f1f]">
                <div className="flex items-center gap-3 min-w-0">
                  <Icon size={16} className={c.accent} />
                  <h2 className="mil-heading text-white text-base md:text-lg">{c.title}</h2>
                </div>
                <span className="chip">S//NF</span>
              </header>
              <p className="text-[13.5px] leading-relaxed text-mil-text/90">{c.body}</p>
              <ul className="mt-4 border-l-2 border-[#2a2a2a] pl-3 space-y-1.5">
                {c.bullets.map((b, i) => (
                  <li key={i} className="text-[12.5px] text-mil-sub leading-snug">
                    <span className={`${c.accent}`}>▸ </span>
                    {b}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-10 pt-4 border-t border-[#1f1f1f] flex items-center justify-between mono text-[10px] text-mil-sub tracking-widest uppercase">
        <span>Potwierdź odczyt na SR 70 MHz — Godfather</span>
        <span className="text-mil-yellow">Koniec ROE</span>
      </div>
    </div>
  );
};

export default ROE;
