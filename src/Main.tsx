import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { ScreenAdvisor, ScreenBudget, ScreenClaudeMcp, ScreenLoan, ScreenReports } from "./scenes";
import { appear, C, easeOut, FONT, pop, prog, useT } from "./theme";
import { Background, ClaudeStar, Icon, Logo, Phone, StepHeader, Word } from "./ui";

const head: React.CSSProperties = { fontFamily: FONT.head, fontWeight: 800, color: C.ink, letterSpacing: "-0.035em", lineHeight: 1.02 };

/* ───────── Gancho (0 → 2.5 s) ───────── */
const Intro: React.FC = () => {
  const t = useT();
  if (t > 2.7) return null;
  const out = easeOut(prog(t, 2.15, 0.3));
  return (
    <AbsoluteFill style={{ opacity: 1 - out, transform: `translateY(${-out * 40}px)` }}>
      <div style={{ position: "absolute", top: 420, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <div style={{ transform: `scale(${pop(t, 0.02, 14)})` }}>
          <Logo size={170} radius={42} />
        </div>
        <div style={{ fontFamily: FONT.ui, fontWeight: 700, fontSize: 28, letterSpacing: "0.22em", color: "#3d6b57", opacity: appear(t, 0.2) }}>ORDENÁTE · NOVEDADES</div>
      </div>
      <div style={{ position: "absolute", top: 800, left: 60, right: 60, textAlign: "center", fontSize: 112, ...head }}>
        <Word at={0.0}>Ordenáte</Word> <Word at={0.55}>ahora</Word>
        <br />
        <Word at={0.95}>te</Word> <Word at={1.1}>ayuda</Word> <Word at={1.4}>a</Word>
        <br />
        <Word at={1.5} style={{ color: C.green, fontSize: 200, letterSpacing: "-0.05em" }}>
          planear.
        </Word>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── Cierre (19.9 → fin) ───────── */
const Outro: React.FC = () => {
  const t = useT();
  if (t < 19.85) return null;
  const a = appear(t, 19.9, 0.4);
  const cta = pop(t, 21.85, 14);
  return (
    <AbsoluteFill style={{ opacity: a }}>
      <div style={{ position: "absolute", top: 420, left: 0, right: 0, display: "flex", justifyContent: "center", transform: `scale(${pop(t, 19.9, 14)})` }}>
        <Logo size={170} radius={42} />
      </div>
      <div style={{ position: "absolute", top: 700, left: 40, right: 40, textAlign: "center", fontSize: 124, ...head }}>
        <Word at={20.0}>Ordenáte.</Word>
        <br />
        <Word at={20.95}>Tus</Word> <Word at={21.15}>finanzas,</Word>
        <br />
        <Word at={21.75}>en</Word>{" "}
        <Word at={21.95} style={{ color: C.green }}>
          orden.
        </Word>
      </div>
      <div style={{ position: "absolute", top: 1250, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: Math.min(1, cta), transform: `scale(${0.85 + 0.15 * cta})` }}>
        <div style={{ background: "#0b0b0b", color: "#fff", fontFamily: FONT.ui, fontWeight: 700, fontSize: 50, borderRadius: 99, padding: "26px 60px", boxShadow: "0 18px 40px rgba(11,11,11,0.25)" }}>
          app.frandercarrillo.com
        </div>
      </div>
      <div style={{ position: "absolute", top: 1400, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: appear(t, 22.1), fontFamily: FONT.ui, fontWeight: 500, fontSize: 32, color: "#35604c" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Icon name="sparkles" size={34} color={C.green} /> También con <ClaudeStar size={34} /> Claude
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Main: React.FC = () => {
  const t = useT();
  const url = t >= 17.2 ? "claude.ai" : "app.frandercarrillo.com";
  return (
    <AbsoluteFill>
      <Audio src={staticFile("narracion.mp3")} />
      <Background />
      <Intro />

      <StepHeader n={1} title="Tu presupuesto del mes" sub="Límites y avance en vivo" t0={2.4} t1={4.25} />
      <StepHeader n={2} title="Un asesor de IA" sub="Propone los límites, tú decides" t0={4.3} t1={9.1} />
      <StepHeader n={3} title="Reportes y proyecciones" sub="Hacia dónde va tu dinero" t0={9.15} t1={14.0} />
      <StepHeader n={4} title="Calculadora de préstamos" sub="Tu tabla de pagos al instante" t0={14.05} t1={17.25} />
      <StepHeader n={5} title="También desde Claude" sub="Todo disponible por MCP" t0={17.3} t1={19.9} />

      <Phone t0={2.25} t1={19.95} url={url}>
        <ScreenBudget t0={2.25} t1={4.3} />
        <ScreenAdvisor t0={4.2} t1={9.2} />
        <ScreenReports t0={9.1} t1={14.1} />
        <ScreenLoan t0={14.0} t1={17.3} />
        <ScreenClaudeMcp t0={17.2} t1={19.95} />
      </Phone>

      <Outro />
    </AbsoluteFill>
  );
};
