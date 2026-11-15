import React from "react";
import { ClaudeHeader, Composer, ToolCard, UserBubble } from "./claude";
import { appear, C, FONT, prog, typed, useT } from "./theme";
import { Badge, ClaudeStar, Cursor, Icon, Screen } from "./ui";

const RED = "#b4362f";
const OK = "#1f8a4c";
const ui = (extra: React.CSSProperties = {}): React.CSSProperties => ({ fontFamily: FONT.ui, ...extra });

/** Texto de Claude (con su estrella) que entra en `at`. */
const Say: React.FC<{ at: number; top: number; children: React.ReactNode }> = ({ at, top, children }) => {
  const t = useT();
  const a = appear(t, at, 0.35);
  return (
    <div style={{ position: "absolute", left: 14, right: 14, top, display: "flex", gap: 7, opacity: a, transform: `translateY(${(1 - a) * 10}px)` }}>
      <ClaudeStar size={13} />
      <div style={{ fontFamily: FONT.serif, fontSize: 13, color: "#2a2723", lineHeight: 1.45 }}>{children}</div>
    </div>
  );
};

/** Tarjeta blanca dentro del chat. */
const Panel: React.FC<{ at: number; top: number; height: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ at, top, height, style, children }) => {
  const t = useT();
  const a = appear(t, at, 0.4);
  return (
    <div
      style={{
        position: "absolute",
        left: 34,
        right: 14,
        top,
        height,
        borderRadius: 12,
        background: "#fff",
        border: "1px solid #e7e2d8",
        padding: "9px 11px",
        opacity: a,
        transform: `translateY(${(1 - a) * 12}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* ════════════ 1 · Presupuesto: Claude propone, tú confirmas (1.75 → 7.3) ════════════ */
const PROPOSALS = [
  { cat: "Alimentación", now: "Gastas ₡85.000", limit: "₡120.000", at: 4.15 },
  { cat: "Ocio", now: "Gastas ₡30.000", limit: "₡40.000", at: 4.5 },
  { cat: "Transporte", now: "Gastas ₡24.000", limit: "₡60.000", at: 4.85 },
];

export const ClaudeBudget: React.FC<{ t0: number; t1: number }> = ({ t0, t1 }) => {
  const t = useT();
  const prompt = "Ayúdame a armar mi presupuesto";
  const sent = t >= 3.0;
  const picked = t >= 6.1;
  const hero = appear(t, 1.8, 0.5) * (1 - appear(t, 2.95, 0.25));
  const chips = appear(t, 5.75, 0.3);
  return (
    <Screen t0={t0} t1={t1} bg={C.cream}>
      <ClaudeHeader />
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, textAlign: "center", fontFamily: FONT.serif, fontSize: 24, color: "#34312b", opacity: hero, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
        <ClaudeStar size={22} /> ¿Qué hacemos hoy?
      </div>
      {sent && <UserBubble text={prompt} at={3.0} top={54} />}
      <ToolCard tool="get_budget_guide" detail="Guía de categorías y 50/30/20" at={3.4} doneAt={3.7} doneLabel="Listo" top={96} />
      <ToolCard tool="get_budget" detail="Gastos de noviembre" at={3.65} doneAt={3.95} doneLabel="Listo" top={140} />
      <Say at={4.0} top={190}>
        Con lo que gastas, te propongo estos límites mensuales:
      </Say>
      <Panel at={4.1} top={232} height={96}>
        {PROPOSALS.map((p) => {
          const a = appear(t, p.at, 0.3);
          return (
            <div key={p.cat} style={{ display: "flex", alignItems: "center", height: 26, opacity: a, transform: `translateX(${(1 - a) * 12}px)` }}>
              <div style={{ flex: 1 }}>
                <span style={ui({ fontWeight: 700, fontSize: 11.5 })}>{p.cat}</span>
                <span style={ui({ fontSize: 9, color: C.muted, marginLeft: 7 })}>{p.now}</span>
              </div>
              <div style={ui({ fontWeight: 800, fontSize: 12 })}>{p.limit}</div>
            </div>
          );
        })}
      </Panel>
      <Say at={5.6} top={336}>
        ¿Los guardo?
      </Say>
      <div style={{ position: "absolute", left: 34, top: 360, display: "flex", gap: 8, opacity: chips, transform: `translateY(${(1 - chips) * 10}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, height: 30, padding: "0 12px", borderRadius: 99, border: `1.5px solid ${picked ? C.green : "#e3ddd0"}`, background: picked ? C.green : "#fff", color: picked ? "#fff" : "#2a2723", ...ui({ fontWeight: 600, fontSize: 11 }) }}>
          <Icon name="check" size={12} stroke={2.6} /> Sí, guárdalos
        </div>
        <div style={{ display: "flex", alignItems: "center", height: 30, padding: "0 12px", borderRadius: 99, border: "1.5px solid #e3ddd0", background: "#fff", ...ui({ fontWeight: 600, fontSize: 11 }) }}>Cambiar uno</div>
      </div>
      <ToolCard tool="set_budget_limit" detail="3 límites · colones" at={6.2} doneAt={6.5} doneLabel="Guardados" top={400} />
      <Say at={6.6} top={446}>
        Listo. Ya ves el avance en la app.
      </Say>
      <Composer top={486} text={sent ? "" : typed(prompt, t, 1.95, 2.9)} send={!sent && t > 2.9} />
      <Cursor
        pts={[
          { t: 5.75, x: 300, y: 300 },
          { t: 6.05, x: 80, y: 376 },
        ]}
        clicks={[6.1]}
      />
    </Screen>
  );
};

/* ════════════ 2 · Proyecciones (7.3 → 11.2) ════════════ */
export const ClaudeReports: React.FC<{ t0: number; t1: number }> = ({ t0, t1 }) => {
  const t = useT();
  const fill = appear(t, 8.6, 0.9);
  return (
    <Screen t0={t0} t1={t1} bg={C.cream}>
      <ClaudeHeader />
      <UserBubble text="¿Cómo cierro el mes y cuándo salgo de deudas?" at={7.4} top={54} />
      <ToolCard tool="get_reports_and_projections" detail="Cierre del mes, tendencias y deudas" at={7.9} doneAt={8.3} doneLabel="Listo" top={108} />
      <Say at={8.35} top={156}>
        Al ritmo actual, así va tu mes:
      </Say>
      <Panel at={8.5} top={184} height={104}>
        <div style={ui({ fontSize: 9.5, color: C.muted })}>Cierre del mes proyectado</div>
        <div style={ui({ fontWeight: 800, fontSize: 26, color: C.ink, letterSpacing: "-0.02em" })}>₡512.000</div>
        <div style={ui({ fontSize: 9, color: C.muted })}>Llevas ₡235.000 en 13 días</div>
        <div style={{ marginTop: 8, height: 8, borderRadius: 8, background: C.mint, overflow: "hidden" }}>
          <div style={{ width: `${46 * fill}%`, height: "100%", background: C.green, borderRadius: 8 }} />
        </div>
      </Panel>
      <Panel at={9.35} top={298} height={64} style={{ background: C.mint, border: `1px solid ${C.mintStrong}`, display: "flex", alignItems: "center", gap: 11 }}>
        <div style={{ width: 36, height: 36, borderRadius: 11, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon name="flag" size={18} color="#fff" />
        </div>
        <div>
          <div style={ui({ fontSize: 9.5, color: "#35604c" })}>Libre de deudas</div>
          <div style={ui({ fontWeight: 800, fontSize: 19, color: C.ink, letterSpacing: "-0.02em" })}>Agosto 2027</div>
        </div>
      </Panel>
      <Panel at={10.1} top={372} height={34} style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 11px" }}>
        <Icon name="up" size={12} color={RED} stroke={2.6} />
        <span style={ui({ fontSize: 10.5, fontWeight: 600 })}>
          Alimentación <span style={{ color: RED }}>sube +14 %</span> frente a su promedio
        </span>
      </Panel>
      <Say at={10.45} top={418}>
        <span style={{ fontSize: 11.5, color: "#6b665c" }}>Son estimaciones con lo que registras.</span>
      </Say>
      <Composer top={486} text="" />
    </Screen>
  );
};

/* ════════════ 3 · Préstamo, como guía (11.2 → 16.0) ════════════ */
const ROWS = [
  ["Dic 26", "₡94.560", "₡20.000", "₡74.560", "₡925.440"],
  ["Ene 27", "₡94.560", "₡18.509", "₡76.051", "₡849.389"],
  ["Feb 27", "₡94.560", "₡16.988", "₡77.572", "₡771.817"],
  ["Mar 27", "₡94.560", "₡15.436", "₡79.124", "₡692.693"],
];
const COLS = "44px repeat(4, 1fr)";

export const ClaudeLoan: React.FC<{ t0: number; t1: number }> = ({ t0, t1 }) => {
  const t = useT();
  const sum = appear(t, 13.45, 0.3);
  const pills = appear(t, 14.3, 0.35);
  const guide = appear(t, 12.9, 0.4);
  const pulse = 1 + 0.025 * Math.sin(Math.PI * prog(t, 12.9, 0.5));
  return (
    <Screen t0={t0} t1={t1} bg={C.cream}>
      <ClaudeHeader />
      <UserBubble text="Arma la tabla de un préstamo de ₡1 000 000 a 12 meses, con 2 % mensual" at={11.3} top={54} />
      <ToolCard tool="calculate_loan_schedule" detail="₡1.000.000 · 2 % mensual · 12 meses" at={11.85} doneAt={12.25} doneLabel="Tabla lista" top={108} />
      <Say at={12.3} top={156}>
        Tu cuota sería de <b>₡94.560</b> al mes:
      </Say>
      <Panel at={12.45} top={182} height={112} style={{ padding: "6px 0 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: COLS, gap: 4, padding: "2px 10px 4px", ...ui({ fontSize: 8.5, fontWeight: 700, color: C.muted }) }}>
          <span>Mes</span>
          <span style={{ textAlign: "right" }}>Cuota</span>
          <span style={{ textAlign: "right" }}>Interés</span>
          <span style={{ textAlign: "right" }}>Capital</span>
          <span style={{ textAlign: "right" }}>Saldo</span>
        </div>
        {ROWS.map((r, i) => {
          const a = appear(t, 12.6 + i * 0.22, 0.3);
          return (
            <div key={r[0]} style={{ display: "grid", gridTemplateColumns: COLS, gap: 4, padding: "0 10px", height: 22, alignItems: "center", borderTop: `1px solid ${C.line}`, opacity: a, ...ui({ fontSize: 9.5 }) }}>
              <span>{r[0]}</span>
              <span style={{ textAlign: "right", fontWeight: 600 }}>{r[1]}</span>
              <span style={{ textAlign: "right", color: C.muted }}>{r[2]}</span>
              <span style={{ textAlign: "right" }}>{r[3]}</span>
              <span style={{ textAlign: "right", fontWeight: 700 }}>{r[4]}</span>
            </div>
          );
        })}
      </Panel>
      <div style={{ position: "absolute", left: 34, right: 14, top: 302, opacity: sum, ...ui({ fontSize: 10.5, color: "#4a463f" }) }}>
        Total ₡1.134.715 · interés ₡134.715 (13,5 %)
      </div>
      <div style={{ position: "absolute", left: 34, top: 328, display: "flex", alignItems: "center", gap: 8, opacity: pills, transform: `translateY(${(1 - pills) * 10}px)` }}>
        <div style={{ height: 28, padding: "0 12px", borderRadius: 99, background: C.green, color: "#fff", display: "flex", alignItems: "center", ...ui({ fontWeight: 700, fontSize: 11 }) }}>2 % mensual</div>
        <span style={ui({ fontWeight: 800, fontSize: 13, color: C.ink })}>=</span>
        <div style={{ height: 28, padding: "0 12px", borderRadius: 99, background: "#fff", border: "1.5px solid #e3ddd0", display: "flex", alignItems: "center", ...ui({ fontWeight: 700, fontSize: 11 }) }}>24 % anual</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 14,
          right: 14,
          top: 376,
          borderRadius: 12,
          background: "#fbefd5",
          border: "1px solid #ecd6a1",
          padding: "9px 11px",
          opacity: guide,
          transform: `translateY(${(1 - guide) * 12}px) scale(${pulse})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <Badge tone="amber">SOLO UNA GUÍA</Badge>
        </div>
        <div style={ui({ fontSize: 10.5, lineHeight: 1.4, color: "#5b4410" })}>
          Es un cálculo de referencia. La cuota real puede cambiar según tu banco: comisiones, seguros y su tabla oficial.
        </div>
      </div>
      <Composer top={486} text="" />
    </Screen>
  );
};

export { OK };
