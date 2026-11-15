import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { ClaudeBudget, ClaudeLoan, ClaudeReports } from "./scenesClaude";
import { appear, C, easeOut, FONT, pop, prog, useT } from "./theme";
import { Background, ClaudeStar, Logo, Phone, StepHeader, Word } from "./ui";

const head: React.CSSProperties = { fontFamily: FONT.head, fontWeight: 800, color: C.ink, letterSpacing: "-0.035em", lineHeight: 1.02 };

/* ───────── Gancho (0 → 1.8 s) ───────── */
const Intro: React.FC = () => {
  const t = useT();
  if (t > 2.0) return null;
  const out = easeOut(prog(t, 1.5, 0.3));
  return (
    <AbsoluteFill style={{ opacity: 1 - out, transform: `translateY(${-out * 40}px)` }}>
      <div style={{ position: "absolute", top: 520, left: 0, right: 0, display: "flex", justifyContent: "center", transform: `scale(${pop(t, 0.0, 14)})` }}>
        <Logo size={190} radius={46} />
      </div>
      <div style={{ position: "absolute", top: 820, left: 40, right: 40, textAlign: "center", ...head }}>
        <Word at={0.0} style={{ fontSize: 120 }}>
          Lo
        </Word>{" "}
        <Word at={0.2} style={{ fontSize: 220, color: C.green, letterSpacing: "-0.05em" }}>
          nuevo
        </Word>
        <br />
        <Word at={0.75} style={{ fontSize: 120 }}>
          en
        </Word>{" "}
        <Word at={0.95} style={{ fontSize: 120 }}>
          Ordenáte
        </Word>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── Cierre (15.95 → fin) ───────── */
const Outro: React.FC = () => {
  const t = useT();
  if (t < 15.9) return null;
  const a = appear(t, 16.0, 0.4);
  const cta = pop(t, 17.9, 14);
  return (
    <AbsoluteFill style={{ opacity: a }}>
      <div style={{ position: "absolute", top: 420, left: 0, right: 0, display: "flex", justifyContent: "center", transform: `scale(${pop(t, 16.0, 14)})` }}>
        <Logo size={170} radius={42} />
      </div>
      <div style={{ position: "absolute", top: 700, left: 40, right: 40, textAlign: "center", fontSize: 124, ...head }}>
        <Word at={16.15}>Ordenáte.</Word>
        <br />
        <Word at={17.05} style={{ color: C.green }}>
          Lo nuevo,
        </Word>
        <br />
        <Word at={17.7}>en</Word> <Word at={17.85}>tu</Word>
        <br />
        <Word at={18.05}>conversación.</Word>
      </div>
      <div style={{ position: "absolute", top: 1330, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: Math.min(1, cta), transform: `scale(${0.85 + 0.15 * cta})` }}>
        <div style={{ background: "#0b0b0b", color: "#fff", fontFamily: FONT.ui, fontWeight: 700, fontSize: 50, borderRadius: 99, padding: "26px 60px", boxShadow: "0 18px 40px rgba(11,11,11,0.25)" }}>
          app.frandercarrillo.com
        </div>
      </div>
      <div style={{ position: "absolute", top: 1470, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: appear(t, 18.3), fontFamily: FONT.ui, fontWeight: 500, fontSize: 32, color: "#35604c" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          Pídeselo a <ClaudeStar size={34} /> Claude
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const MainClaude: React.FC = () => (
  <AbsoluteFill>
    <Audio src={staticFile("narracion-claude.mp3")} />
    <Background />
    <Intro />

    <StepHeader n={1} title="Arma tu presupuesto" sub="Claude propone, tú confirmas" t0={1.8} t1={7.25} />
    <StepHeader n={2} title="Anticípate al mes" sub="Proyecciones con lo que registras" t0={7.3} t1={11.15} />
    <StepHeader n={3} title="Calcula un préstamo" sub="Una guía, no la tabla del banco" t0={11.2} t1={15.9} />

    <Phone t0={1.75} t1={15.95} url="claude.ai">
      <ClaudeBudget t0={1.75} t1={7.35} />
      <ClaudeReports t0={7.25} t1={11.3} />
      <ClaudeLoan t0={11.2} t1={15.95} />
    </Phone>

    <Outro />
  </AbsoluteFill>
);
