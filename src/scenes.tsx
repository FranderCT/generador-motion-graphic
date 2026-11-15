import React from "react";
import { ClaudeHeader, Composer, ToolCard, UserBubble } from "./claude";
import { appear, C, FONT, prog, easeOut, useT } from "./theme";
import { AppHeader, Badge, Card, ClaudeStar, Cursor, Icon, Screen } from "./ui";

const RED = "#b4362f";
const OK = "#1f8a4c";
const ui = (extra: React.CSSProperties = {}): React.CSSProperties => ({ fontFamily: FONT.ui, ...extra });

/* ───────── Piezas comunes ───────── */
const Title: React.FC<{ title: string; sub?: string; top?: number; at: number }> = ({ title, sub, top = 54, at }) => {
  const t = useT();
  const a = appear(t, at, 0.35);
  return (
    <div style={{ position: "absolute", left: 14, top, opacity: a, transform: `translateY(${(1 - a) * 8}px)` }}>
      <div style={ui({ fontWeight: 800, fontSize: 19, color: C.ink, letterSpacing: "-0.02em" })}>{title}</div>
      {sub && <div style={ui({ fontSize: 9.5, color: C.muted, marginTop: 2 })}>{sub}</div>}
    </div>
  );
};

const Bar: React.FC<{ pct: number; color: string; h?: number; track?: string }> = ({ pct, color, h = 7, track = "#e6ede9" }) => (
  <div style={{ height: h, borderRadius: h, background: track, overflow: "hidden" }}>
    <div style={{ width: `${Math.min(100, Math.max(0, pct))}%`, height: "100%", borderRadius: h, background: color }} />
  </div>
);

/* ════════════ 1 · Presupuesto del mes ════════════ */
export const ScreenBudget: React.FC<{ t0: number; t1: number }> = ({ t0, t1 }) => {
  const t = useT();
  const card = appear(t, t0 + 0.2, 0.4);
  const fillMain = appear(t, t0 + 0.35, 0.8);
  const cats = [
    { name: "Vivienda", spent: "₡120.000", limit: "₡150.000", pct: 80, color: C.amber },
    { name: "Alimentación", spent: "₡85.000", limit: "₡120.000", pct: 71, color: C.green },
    { name: "Ocio", spent: "₡30.000", limit: "₡40.000", pct: 75, color: C.green },
    { name: "Transporte", spent: "₡24.000", limit: "₡60.000", pct: 40, color: C.green },
  ];
  return (
    <Screen t0={t0} t1={t1}>
      <AppHeader scope="Personal" />
      <Title title="Presupuesto" sub="Noviembre 2026 · en colones" at={t0 + 0.1} />
      <Card style={{ top: 108, height: 104, padding: "11px 13px", opacity: card, transform: `translateY(${(1 - card) * 12}px)` }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div style={ui({ fontSize: 9.5, color: C.muted })}>Monto mensual estimado</div>
          <Badge tone="green">39 % usado</Badge>
        </div>
        <div style={ui({ fontWeight: 800, fontSize: 26, color: C.ink, letterSpacing: "-0.02em", marginTop: 3 })}>₡600.000</div>
        <div style={{ marginTop: 7 }}>
          <Bar pct={39 * fillMain} color={C.green} h={9} />
        </div>
        <div style={ui({ display: "flex", justifyContent: "space-between", fontSize: 9, color: C.muted, marginTop: 6 })}>
          <span>Gastado ₡235.000</span>
          <span>Pagos fijos ₡150.000</span>
        </div>
      </Card>
      {cats.map((c, i) => {
        const a = appear(t, t0 + 0.5 + i * 0.13, 0.35);
        const f = appear(t, t0 + 0.6 + i * 0.13, 0.8);
        return (
          <div key={c.name} style={{ position: "absolute", left: 14, right: 14, top: 228 + i * 62, opacity: a, transform: `translateY(${(1 - a) * 12}px)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: 8, background: C.mint, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="receipt" size={13} color={C.greenDark} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={ui({ fontWeight: 700, fontSize: 12 })}>{c.name}</div>
                <div style={ui({ fontSize: 9, color: C.muted })}>
                  {c.spent} de {c.limit}
                </div>
              </div>
              <div style={ui({ fontWeight: 700, fontSize: 11, color: c.pct >= 80 ? C.amber : C.greenDark })}>{c.pct} %</div>
            </div>
            <div style={{ marginTop: 7 }}>
              <Bar pct={c.pct * f} color={c.color} />
            </div>
          </div>
        );
      })}
    </Screen>
  );
};

/* ════════════ 2 · Asesor de IA ════════════ */
const PROPOSALS = [
  { cat: "Alimentación", sub: "Gastas ₡85.000 al mes", amount: "₡120.000", at: 5.9, apply: 8.05 },
  { cat: "Ocio", sub: "Gastas ₡30.000 al mes", amount: "₡40.000", at: 6.35, apply: 8.55 },
  { cat: "Transporte", sub: "Gastas ₡24.000 al mes", amount: "₡60.000", at: 6.8, apply: 99 },
];

export const ScreenAdvisor: React.FC<{ t0: number; t1: number }> = ({ t0, t1 }) => {
  const t = useT();
  const bubble = appear(t, 4.55, 0.3);
  const typing = t >= 5.0 && t < 5.55;
  const reply = appear(t, 5.55, 0.35);
  const note = appear(t, 7.4, 0.4);
  return (
    <Screen t0={t0} t1={t1}>
      <AppHeader scope="Personal" />
      <div style={{ position: "absolute", left: 14, right: 14, top: 54, display: "flex", alignItems: "center", gap: 7, opacity: appear(t, t0 + 0.1, 0.3) }}>
        <div style={{ width: 24, height: 24, borderRadius: 8, background: C.black, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="sparkles" size={13} color="#fff" />
        </div>
        <div style={ui({ fontWeight: 800, fontSize: 15, color: C.ink })}>Asesor del presupuesto</div>
        <Badge tone="dark">IA</Badge>
      </div>

      <div
        style={{
          position: "absolute",
          right: 14,
          top: 92,
          maxWidth: 250,
          background: "#eef1ef",
          borderRadius: 14,
          padding: "9px 12px",
          ...ui({ fontSize: 11, lineHeight: 1.35, color: "#1d2823" }),
          opacity: bubble,
          transform: `translateY(${(1 - bubble) * 12}px)`,
        }}
      >
        Ayúdame a armar mi presupuesto
      </div>

      {typing && (
        <div style={{ position: "absolute", left: 14, top: 144, display: "flex", gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, opacity: 0.35 + 0.65 * Math.abs(Math.sin(t * 9 - i * 0.9)) }} />
          ))}
        </div>
      )}
      <div style={{ position: "absolute", left: 14, right: 14, top: 140, opacity: reply, transform: `translateY(${(1 - reply) * 8}px)`, ...ui({ fontSize: 11.5, color: "#1d2823", lineHeight: 1.4 }) }}>
        Con lo que gastas, te propongo estos límites mensuales:
      </div>

      {PROPOSALS.map((p, i) => {
        const a = appear(t, p.at, 0.35);
        const applied = t >= p.apply;
        return (
          <div
            key={p.cat}
            style={{
              position: "absolute",
              left: 14,
              right: 14,
              top: 176 + i * 62,
              height: 52,
              borderRadius: 12,
              border: `1.5px solid ${applied ? C.green : C.line}`,
              background: applied ? "#f0f8f4" : "#fff",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 9px",
              opacity: a,
              transform: `translateY(${(1 - a) * 14}px)`,
            }}
          >
            <div style={{ width: 28, height: 28, borderRadius: 9, background: C.mint, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="wallet" size={14} color={C.greenDark} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={ui({ fontWeight: 700, fontSize: 11.5 })}>Poner límite · {p.cat}</div>
              <div style={ui({ fontSize: 9, color: C.muted })}>{p.sub}</div>
            </div>
            <div style={ui({ fontWeight: 800, fontSize: 12 })}>{p.amount}</div>
            <div
              style={{
                width: 58,
                height: 26,
                borderRadius: 8,
                background: applied ? C.green : C.black,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                ...ui({ fontWeight: 700, fontSize: 10 }),
              }}
            >
              {applied ? (
                <>
                  <Icon name="check" size={10} color="#fff" stroke={3} /> Listo
                </>
              ) : (
                "Aplicar"
              )}
            </div>
          </div>
        );
      })}

      <div style={{ position: "absolute", left: 14, right: 14, top: 372, display: "flex", gap: 6, alignItems: "center", opacity: note, ...ui({ fontSize: 10, color: "#35604c" }) }}>
        <Icon name="lock" size={12} color={C.green} /> El asesor solo propone. Nada cambia hasta que pulses Aplicar.
      </div>

      <Composer top={486} text="" placeholder="Escribe tu mensaje…" />
      <Cursor
        pts={[
          { t: 7.45, x: 250, y: 440 },
          { t: 8.0, x: 351, y: 202 },
          { t: 8.2, x: 351, y: 202 },
          { t: 8.5, x: 351, y: 264 },
        ]}
        clicks={[8.05, 8.55]}
      />
    </Screen>
  );
};

/* ════════════ 3 · Reportes y proyecciones ════════════ */
const TREND = [
  { cat: "Alimentación", value: "₡132.000", label: "Sube +14 %", color: RED, icon: "up", at: 10.85 },
  { cat: "Ocio", value: "₡38.000", label: "Baja −9 %", color: OK, icon: "down", at: 11.3 },
  { cat: "Vivienda", value: "₡150.000", label: "Estable", color: C.muted, icon: "flat", at: 11.75 },
];

export const ScreenReports: React.FC<{ t0: number; t1: number }> = ({ t0, t1 }) => {
  const t = useT();
  const c1 = appear(t, 9.2, 0.4);
  const fill = appear(t, 9.4, 1.0);
  const c2 = appear(t, 10.7, 0.35);
  const c3 = appear(t, 12.3, 0.4);
  const pop3 = 1 + 0.03 * Math.sin(Math.PI * prog(t, 12.3, 0.5));
  return (
    <Screen t0={t0} t1={t1}>
      <AppHeader scope="Personal" />
      <Title title="Reportes y proyecciones" at={t0 + 0.1} />
      <div style={{ position: "absolute", left: 14, right: 14, top: 84, display: "flex", gap: 18, borderBottom: `1px solid ${C.line}`, ...ui({ fontSize: 11, fontWeight: 600 }) }}>
        <div style={{ color: C.muted, paddingBottom: 7 }}>Reportes</div>
        <div style={{ color: C.ink, paddingBottom: 7, borderBottom: `2px solid ${C.green}`, marginBottom: -1 }}>Proyecciones</div>
      </div>

      <Card style={{ top: 118, height: 128, padding: "11px 13px", opacity: c1, transform: `translateY(${(1 - c1) * 12}px)` }}>
        <div style={ui({ fontSize: 9.5, color: C.muted })}>Cierre del mes proyectado</div>
        <div style={ui({ fontWeight: 800, fontSize: 27, color: C.ink, letterSpacing: "-0.02em", marginTop: 2 })}>₡512.000</div>
        <div style={ui({ fontSize: 9, color: C.muted, marginTop: 1 })}>Llevas ₡235.000 en 13 días · ₡18.077 por día</div>
        <div style={{ position: "relative", marginTop: 11, height: 9, borderRadius: 9, background: C.mint, overflow: "hidden" }}>
          <div style={{ width: `${46 * fill}%`, height: "100%", background: C.green, borderRadius: 9 }} />
        </div>
        <div style={ui({ display: "flex", justifyContent: "space-between", fontSize: 8.5, color: C.muted, marginTop: 4 })}>
          <span>Hoy</span>
          <span>Fin de mes</span>
        </div>
      </Card>

      <Card style={{ top: 258, height: 166, padding: "10px 12px 4px", opacity: c2, transform: `translateY(${(1 - c2) * 12}px)` }}>
        <div style={ui({ fontSize: 9.5, color: C.muted, marginBottom: 2 })}>Gasto esperado el próximo mes</div>
        {TREND.map((r) => {
          const a = appear(t, r.at, 0.3);
          return (
            <div key={r.cat} style={{ display: "flex", alignItems: "center", gap: 8, height: 41, borderTop: `1px solid ${C.line}`, opacity: a, transform: `translateX(${(1 - a) * 14}px)` }}>
              <div style={{ flex: 1 }}>
                <div style={ui({ fontWeight: 700, fontSize: 12 })}>{r.cat}</div>
                <div style={ui({ fontWeight: 600, fontSize: 9.5, color: r.color, display: "flex", alignItems: "center", gap: 3 })}>
                  <Icon name={r.icon} size={10} color={r.color} stroke={2.6} /> {r.label}
                </div>
              </div>
              <div style={ui({ fontWeight: 800, fontSize: 12.5 })}>{r.value}</div>
            </div>
          );
        })}
      </Card>

      <Card style={{ top: 436, height: 84, padding: "12px 13px", background: C.mint, border: `1px solid ${C.mintStrong}`, opacity: c3, transform: `translateY(${(1 - c3) * 14}px) scale(${pop3})` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="flag" size={20} color="#fff" />
          </div>
          <div>
            <div style={ui({ fontSize: 9.5, color: "#35604c" })}>Libre de deudas</div>
            <div style={ui({ fontWeight: 800, fontSize: 21, color: C.ink, letterSpacing: "-0.02em" })}>Agosto 2027</div>
            <div style={ui({ fontSize: 9, color: "#35604c" })}>Con tus cuotas actuales · 2 deudas</div>
          </div>
        </div>
      </Card>
    </Screen>
  );
};

/* ════════════ 4 · Calculadora de préstamos ════════════ */
const ROWS = [
  ["1", "Dic 26", "₡94.560", "₡20.000", "₡74.560", "₡925.440"],
  ["2", "Ene 27", "₡94.560", "₡18.509", "₡76.051", "₡849.389"],
  ["3", "Feb 27", "₡94.560", "₡16.988", "₡77.572", "₡771.817"],
  ["4", "Mar 27", "₡94.560", "₡15.436", "₡79.124", "₡692.693"],
  ["5", "Abr 27", "₡94.560", "₡13.854", "₡80.706", "₡611.987"],
];
const COLS = "20px 40px repeat(4, 1fr)";

const OptionCard: React.FC<{ title: string; hint: string; on: boolean; left: number }> = ({ title, hint, on, left }) => (
  <div
    style={{
      position: "absolute",
      left,
      top: 118,
      width: 181,
      height: 40,
      borderRadius: 12,
      background: "#eef3f0",
      boxShadow: on ? `inset 0 0 0 2px ${C.green}` : "none",
      padding: "6px 11px",
      ...ui({}),
    }}
  >
    <div style={{ fontWeight: 700, fontSize: 11.5 }}>{title}</div>
    <div style={{ fontSize: 9, color: C.muted }}>{hint}</div>
  </div>
);

const Field: React.FC<{ label: string; value: string; left: number; width: number }> = ({ label, value, left, width }) => (
  <div style={{ position: "absolute", left, top: 170, width }}>
    <div style={ui({ fontSize: 8.5, fontWeight: 600, color: "#35604c", marginBottom: 3 })}>{label}</div>
    <div style={{ height: 30, borderRadius: 9, background: "#eef3f0", display: "flex", alignItems: "center", padding: "0 9px", ...ui({ fontWeight: 600, fontSize: 11.5 }) }}>{value}</div>
  </div>
);

export const ScreenLoan: React.FC<{ t0: number; t1: number }> = ({ t0, t1 }) => {
  const t = useT();
  const monthly = t >= 16.55;
  const form = appear(t, t0 + 0.1, 0.35);
  const pressed = t >= 15.05;
  const sum = appear(t, 15.15, 0.35);
  const chip = appear(t, 16.6, 0.3);
  return (
    <Screen t0={t0} t1={t1}>
      <AppHeader scope="Personal" />
      <Title title="Simulador" sub="Calcula tu tabla de pagos. No usa tus deudas registradas." at={t0 + 0.05} />
      <div style={{ opacity: form }}>
        <div style={ui({ position: "absolute", left: 14, top: 100, fontSize: 10, fontWeight: 700 })}>¿Cómo te dan la tasa de interés?</div>
        <OptionCard left={14} title="Anual" hint="Te la dan por año" on={!monthly} />
        <OptionCard left={203} title="Mensual" hint="Te la dan por mes" on={monthly} />
        <Field left={14} width={112} label="Monto" value="₡1.000.000" />
        <Field left={134} width={112} label={monthly ? "Tasa mensual (%)" : "Tasa anual (%)"} value={monthly ? "2" : "24"} />
        <Field left={254} width={130} label="Plazo en meses" value="12" />
        <div
          style={{
            position: "absolute",
            left: 14,
            right: 14,
            top: 220,
            height: 32,
            borderRadius: 10,
            background: pressed ? C.green : C.black,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            ...ui({ fontWeight: 700, fontSize: 12 }),
          }}
        >
          <Icon name="calc" size={13} color="#fff" /> Calcular tabla
        </div>
      </div>

      {t >= 15.1 && (
        <>
          <div style={{ position: "absolute", left: 14, right: 14, top: 266, display: "flex", gap: 7, opacity: sum, transform: `translateY(${(1 - sum) * 12}px)` }}>
            {[
              ["Cuota mensual", "₡94.560"],
              ["Plazo", "12 meses"],
              ["Interés total", "₡134.715"],
            ].map(([l, v]) => (
              <div key={l} style={{ flex: 1, borderRadius: 10, background: "#eef3f0", padding: "6px 8px" }}>
                <div style={ui({ fontSize: 8, color: C.muted })}>{l}</div>
                <div style={ui({ fontWeight: 800, fontSize: 12.5, color: C.ink })}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", left: 14, right: 14, top: 326, borderRadius: 10, border: `1px solid ${C.line}`, overflow: "hidden", opacity: appear(t, 15.3, 0.3) }}>
            <div style={{ display: "grid", gridTemplateColumns: COLS, gap: 4, padding: "6px 8px", background: "#f6f8f7", ...ui({ fontSize: 8.5, fontWeight: 700, color: C.muted }) }}>
              <span>#</span>
              <span>Mes</span>
              <span style={{ textAlign: "right" }}>Cuota</span>
              <span style={{ textAlign: "right" }}>Interés</span>
              <span style={{ textAlign: "right" }}>Capital</span>
              <span style={{ textAlign: "right" }}>Saldo</span>
            </div>
            {ROWS.map((r, i) => {
              const a = appear(t, 15.4 + i * 0.2, 0.3);
              return (
                <div key={r[0]} style={{ display: "grid", gridTemplateColumns: COLS, gap: 4, padding: "0 8px", height: 27, alignItems: "center", borderTop: `1px solid ${C.line}`, opacity: a, transform: `translateY(${(1 - a) * 8}px)`, ...ui({ fontSize: 9.5 }) }}>
                  <span style={{ color: C.muted }}>{r[0]}</span>
                  <span>{r[1]}</span>
                  <span style={{ textAlign: "right", fontWeight: 600 }}>{r[2]}</span>
                  <span style={{ textAlign: "right", color: C.muted }}>{r[3]}</span>
                  <span style={{ textAlign: "right" }}>{r[4]}</span>
                  <span style={{ textAlign: "right", fontWeight: 700 }}>{r[5]}</span>
                </div>
              );
            })}
          </div>
          <div style={{ position: "absolute", left: 14, top: 506, display: "flex", alignItems: "center", gap: 6, opacity: chip, ...ui({ fontSize: 10, color: "#35604c" }) }}>
            <Icon name="percent" size={12} color={C.green} /> 2 % mensual equivale a 24 % anual (nominal)
          </div>
        </>
      )}
      <Cursor
        pts={[
          { t: 14.4, x: 300, y: 300 },
          { t: 14.95, x: 200, y: 236 },
          { t: 16.0, x: 200, y: 236 },
          { t: 16.5, x: 300, y: 138 },
        ]}
        clicks={[15.05, 16.55]}
      />
    </Screen>
  );
};

/* ════════════ 5 · Todo desde Claude (MCP) ════════════ */
export const ScreenClaudeMcp: React.FC<{ t0: number; t1: number }> = ({ t0, t1 }) => {
  const t = useT();
  const reply = appear(t, 19.0, 0.35);
  return (
    <Screen t0={t0} t1={t1} bg={C.cream}>
      <ClaudeHeader />
      <UserBubble text="¿Cómo voy este mes? Y calcula un préstamo de ₡1 000 000" at={17.45} top={54} />
      <ToolCard tool="get_budget" detail="Presupuesto de noviembre" at={17.9} doneAt={18.2} doneLabel="Listo" top={116} />
      <ToolCard tool="get_reports_and_projections" detail="Cierre del mes y tendencias" at={18.15} doneAt={18.5} doneLabel="Listo" top={162} />
      <ToolCard tool="calculate_loan_schedule" detail="₡1.000.000 · 2 % mensual · 12 meses" at={18.4} doneAt={18.8} doneLabel="Tabla lista" top={208} />
      <div style={{ position: "absolute", left: 14, right: 14, top: 262, opacity: reply, transform: `translateY(${(1 - reply) * 10}px)`, display: "flex", gap: 7 }}>
        <ClaudeStar size={13} />
        <div style={{ fontFamily: FONT.serif, fontSize: 13, color: "#2a2723", lineHeight: 1.45 }}>
          Llevas <b>₡235.000</b> de <b>₡600.000</b> y cerrarías cerca de <b>₡512.000</b>. El préstamo queda en <b>₡94.560</b> al mes durante 12 meses.
        </div>
      </div>
      <Composer top={486} text="" />
    </Screen>
  );
};

export { easeOut };
