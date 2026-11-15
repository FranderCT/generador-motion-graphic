import React from "react";
import { AbsoluteFill } from "remotion";
import { appear, C, easeIO, easeOut, FONT, lerp, pop, prog, useT, win } from "./theme";

/* ───────── Iconos (trazos de lucide) ───────── */
const PATHS: Record<string, React.ReactNode> = {
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  user: (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  copy: (
    <>
      <rect width="14" height="14" x="8" y="8" rx="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>
  ),
  updown: (
    <>
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </>
  ),
  arrowUp: (
    <>
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  plus: <path d="M5 12h14M12 5v14" />,
  eye: (
    <>
      <path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  lock: (
    <>
      <rect width="18" height="11" x="3" y="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  home: (
    <>
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </>
  ),
  calendar: (
    <>
      <path d="M8 2v4M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </>
  ),
  receipt: (
    <>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 17.5v-11" />
    </>
  ),
  wallet: (
    <>
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </>
  ),
  trend: (
    <>
      <path d="M16 7h6v6" />
      <path d="m22 7-8.5 8.5-5-5L2 17" />
    </>
  ),
  repeat: (
    <>
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </>
  ),
  hand: (
    <>
      <path d="M12 2v10M8 6v8M16 6v8M4 11v3a8 8 0 0 0 16 0v-3" />
    </>
  ),
};

Object.assign(PATHS, {
  percent: (
    <>
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </>
  ),
  calc: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
    </>
  ),
  sparkles: (
    <>
      <path d="M9.5 3.5 11 8l4.5 1.5L11 11l-1.5 4.5L8 11 3.5 9.5 8 8z" />
      <path d="M18 14l.8 2.2 2.2.8-2.2.8L18 20l-.8-2.2-2.2-.8 2.2-.8z" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 16v-5M12 16V8M17 16v-8" />
    </>
  ),
  flag: (
    <>
      <path d="M4 22V4" />
      <path d="M4 4h13l-2.5 4 2.5 4H4" />
    </>
  ),
  up: <path d="M7 17 17 7M8 7h9v9" />,
  down: <path d="M7 7l10 10M17 8v9H8" />,
  flat: <path d="M5 12h14M13 6l6 6-6 6" />,
});

export const Icon: React.FC<{ name: keyof typeof PATHS | string; size?: number; color?: string; stroke?: number; style?: React.CSSProperties }> = ({
  name,
  size = 16,
  color = "currentColor",
  stroke = 2,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, ...style }}
  >
    {PATHS[name]}
  </svg>
);

export const ClaudeStar: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = C.claude }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    {Array.from({ length: 10 }).map((_, i) => (
      <rect key={i} x="11" y="1.5" width="2" height="8.5" rx="1" fill={color} transform={`rotate(${i * 36} 12 12)`} />
    ))}
  </svg>
);

/* ───────── Marca ───────── */
export const Logo: React.FC<{ size?: number; radius?: number }> = ({ size = 40, radius }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius ?? size * 0.26,
      background: "#0b0b0b",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: FONT.head,
      fontWeight: 800,
      fontSize: size * 0.46,
      letterSpacing: "-0.04em",
      flexShrink: 0,
    }}
  >
    FC
  </div>
);

const AVATAR_COLORS: Record<string, string> = { A: "#6d6af0", L: "#e08a3c", M: "#2f9e77", D: "#c25a8c" };
export const Avatar: React.FC<{ letter: string; size?: number; ring?: boolean; style?: React.CSSProperties }> = ({ letter, size = 28, ring, style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: AVATAR_COLORS[letter] ?? C.green,
      color: "#fff",
      fontFamily: FONT.ui,
      fontWeight: 700,
      fontSize: size * 0.44,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: ring ? "0 0 0 2px #fff" : undefined,
      flexShrink: 0,
      ...style,
    }}
  >
    {letter}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; tone?: "dark" | "soft" | "green" | "amber"; size?: number }> = ({ children, tone = "soft", size = 9.5 }) => {
  const tones = {
    dark: { bg: C.black, fg: "#fff" },
    soft: { bg: "#eef1ef", fg: "#33443c" },
    green: { bg: C.mint, fg: C.greenDark },
    amber: { bg: "#fbefd5", fg: C.amber },
  }[tone];
  return (
    <span
      style={{
        background: tones.bg,
        color: tones.fg,
        fontFamily: FONT.ui,
        fontWeight: 600,
        fontSize: size,
        padding: "3px 8px",
        borderRadius: 99,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
};

/* ───────── Fondo ───────── */
export const Background: React.FC = () => {
  const t = useT();
  const d = Math.sin(t * 0.4) * 30;
  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        backgroundImage: [
          `radial-gradient(900px 760px at ${-60 + d}px ${380 + d}px, rgba(176,228,205,0.95), rgba(176,228,205,0) 70%)`,
          `radial-gradient(900px 800px at ${1160 - d}px ${1740 - d}px, rgba(178,226,226,0.95), rgba(178,226,226,0) 70%)`,
          `radial-gradient(500px 400px at 760px 120px, rgba(255,255,255,0.7), rgba(255,255,255,0) 70%)`,
        ].join(","),
      }}
    />
  );
};

/* ───────── Texto que entra palabra por palabra ───────── */
export const Word: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties; rise?: number }> = ({ at, children, style, rise = 28 }) => {
  const t = useT();
  const a = appear(t, at, 0.4);
  return (
    <span style={{ display: "inline-block", opacity: a, transform: `translateY(${(1 - a) * rise}px)`, ...style }}>{children}</span>
  );
};

/* ───────── Cabecera de paso ───────── */
export const StepHeader: React.FC<{ n: number; title: string; sub: string; t0: number; t1: number }> = ({ n, title, sub, t0, t1 }) => {
  const t = useT();
  const a = appear(t, t0, 0.4);
  const out = easeOut(prog(t, t1 - 0.25, 0.25));
  if (t < t0 - 0.05 || t > t1) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 112,
        top: 170,
        display: "flex",
        alignItems: "center",
        gap: 24,
        opacity: a * (1 - out),
        transform: `translateY(${(1 - a) * 22 - out * 14}px)`,
      }}
    >
      <div
        style={{
          width: 76,
          height: 76,
          borderRadius: 22,
          background: C.green,
          color: "#fff",
          fontFamily: FONT.head,
          fontWeight: 800,
          fontSize: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {n}
      </div>
      <div>
        <div style={{ fontFamily: FONT.head, fontWeight: 800, fontSize: 50, color: C.ink, letterSpacing: "-0.03em", lineHeight: 1.05 }}>{title}</div>
        <div style={{ fontFamily: FONT.ui, fontWeight: 500, fontSize: 27, color: "#5d7a6d", marginTop: 6 }}>{sub}</div>
      </div>
    </div>
  );
};

/* ───────── Teléfono ───────── */
export const SCREEN_W = 398;
export const SCREEN_H = 576;
const K = 2.1;

export const Phone: React.FC<{ t0: number; t1: number; url: string; children: React.ReactNode }> = ({ t0, t1, url, children }) => {
  const t = useT();
  if (t < t0 - 0.05 || t > t1 + 0.1) return null;
  const enter = pop(t, t0, 16);
  const out = easeOut(prog(t, t1 - 0.35, 0.35));
  return (
    <div
      style={{
        position: "absolute",
        left: 112,
        top: 330,
        width: 856,
        height: 1340,
        borderRadius: 86,
        border: "11px solid #0d1a14",
        background: "#fff",
        overflow: "hidden",
        boxShadow: "0 40px 80px rgba(20,60,45,0.22), 0 8px 20px rgba(20,60,45,0.12)",
        opacity: Math.min(1, enter * 1.4) * (1 - out),
        transform: `translateY(${(1 - enter) * 180 + out * 140}px)`,
      }}
    >
      {/* barra de estado */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 108, background: "#f6f8f7", zIndex: 5 }}>
        <div style={{ position: "absolute", left: 44, top: 14, fontFamily: FONT.ui, fontWeight: 700, fontSize: 27, color: "#111" }}>9:41</div>
        <div style={{ position: "absolute", right: 44, top: 18, display: "flex", gap: 12, alignItems: "center" }}>
          <svg width="30" height="22" viewBox="0 0 30 22" fill="#222">
            <rect x="0" y="14" width="5" height="8" rx="1" />
            <rect x="8" y="10" width="5" height="12" rx="1" />
            <rect x="16" y="5" width="5" height="17" rx="1" />
            <rect x="24" y="0" width="5" height="22" rx="1" opacity="0.3" />
          </svg>
          <svg width="30" height="22" viewBox="0 0 24 18" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round">
            <path d="M2 6.5a14 14 0 0 1 20 0M5.5 10a9 9 0 0 1 13 0M9 13.5a4 4 0 0 1 6 0" />
          </svg>
          <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
            <rect x="1" y="2" width="32" height="18" rx="5" stroke="#222" strokeWidth="2" />
            <rect x="4" y="5" width="22" height="12" rx="3" fill="#222" />
            <rect x="35" y="8" width="3" height="6" rx="1.5" fill="#222" />
          </svg>
        </div>
        <div
          style={{
            position: "absolute",
            left: 190,
            right: 190,
            top: 56,
            height: 40,
            borderRadius: 20,
            background: "#fff",
            border: "1.5px solid #e3e8e5",
            fontFamily: FONT.ui,
            fontSize: 20,
            color: "#66756d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {url}
        </div>
      </div>
      {/* contenido lógico 398×468, escalado */}
      <div style={{ position: "absolute", left: 0, top: 108, width: SCREEN_W * K, height: SCREEN_H * K, overflow: "hidden" }}>
        <div style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${K})`, transformOrigin: "0 0", position: "relative" }}>{children}</div>
      </div>
    </div>
  );
};

/** Pantalla dentro del teléfono: aparece con fundido y se va igual. */
export const Screen: React.FC<{ t0: number; t1: number; bg?: string; children: React.ReactNode }> = ({ t0, t1, bg = "#fff", children }) => {
  const t = useT();
  if (t < t0 - 0.02 || t > t1 + 0.02) return null;
  const a = appear(t, t0, 0.3);
  const out = easeOut(prog(t, t1 - 0.2, 0.2));
  return (
    <div style={{ position: "absolute", inset: 0, background: bg, opacity: a * (1 - out), transform: `translateX(${(1 - a) * 18}px)` }}>{children}</div>
  );
};

/* ───────── Cursor ───────── */
export type Pt = { t: number; x: number; y: number };
export const Cursor: React.FC<{ pts: Pt[]; clicks?: number[] }> = ({ pts, clicks = [] }) => {
  const t = useT();
  const first = pts[0];
  const last = pts[pts.length - 1];
  if (t < first.t - 0.3 || t > last.t + 0.6) return null;
  let x = first.x;
  let y = first.y;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    if (t >= b.t) {
      x = b.x;
      y = b.y;
    } else if (t >= a.t) {
      const p = easeIO(prog(t, a.t, b.t - a.t));
      x = lerp(a.x, b.x, p);
      y = lerp(a.y, b.y, p);
      break;
    }
  }
  const vis = appear(t, first.t - 0.3, 0.3) * (1 - easeOut(prog(t, last.t + 0.2, 0.4)));
  let press = 0;
  let ripple: { k: number } | null = null;
  for (const c of clicks) {
    const k = prog(t, c, 0.4);
    if (k > 0 && k < 1) {
      press = Math.sin(Math.min(1, k * 2.2) * Math.PI) * 0.28;
      ripple = { k };
    }
  }
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 50, opacity: vis, pointerEvents: "none" }}>
      {ripple && (
        <div
          style={{
            position: "absolute",
            left: -14,
            top: -14,
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: `1.5px solid ${C.green}`,
            opacity: 0.6 * (1 - ripple.k),
            transform: `scale(${0.6 + ripple.k * 1.8})`,
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          left: -8,
          top: -8,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "rgba(140,145,142,0.6)",
          border: "1.5px solid rgba(90,95,92,0.7)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
          transform: `scale(${1 - press})`,
        }}
      />
    </div>
  );
};

/* ───────── Piezas de la app (coordenadas lógicas) ───────── */
export const AppHeader: React.FC<{ scope: string; scoped?: boolean; open?: number }> = ({ scope, scoped, open = 0 }) => (
  <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 44, display: "flex", alignItems: "center", padding: "0 14px", gap: 8, background: "#fff", zIndex: 3 }}>
    <Icon name="menu" size={16} />
    <Logo size={22} radius={6} />
    <div style={{ lineHeight: 1.1 }}>
      <div style={{ fontFamily: FONT.ui, fontWeight: 700, fontSize: 12 }}>Ordenáte</div>
      <div style={{ fontFamily: FONT.ui, fontSize: 7.5, color: C.muted }}>Tu organizador personal</div>
    </div>
    <div style={{ flex: 1 }} />
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        height: 26,
        padding: "0 9px",
        border: `1px solid ${open ? C.green : "#dfe5e2"}`,
        borderRadius: 9,
        fontFamily: FONT.ui,
        fontWeight: 600,
        fontSize: 10.5,
        background: "#fff",
      }}
    >
      <Icon name={scoped ? "users" : "user"} size={12} color={scoped ? C.green : "#222"} />
      {scope}
      <Icon name="updown" size={10} color={C.muted} />
    </div>
  </div>
);

export const BottomNav: React.FC<{ active?: number }> = ({ active = 2 }) => {
  const items = [
    ["home", "Inicio"],
    ["calendar", "Calendario"],
    ["receipt", "Gastos"],
    ["wallet", "Ingresos"],
  ];
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 46, borderTop: `1px solid ${C.line}`, background: "#fff", display: "flex", justifyContent: "space-around", alignItems: "center", zIndex: 3 }}>
      {items.map(([ic, label], i) => (
        <div
          key={label}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            padding: "4px 14px",
            borderRadius: 10,
            background: i === active ? C.mint : "transparent",
            color: i === active ? C.greenDark : "#6a7770",
            fontFamily: FONT.ui,
            fontSize: 8,
            fontWeight: i === active ? 700 : 500,
          }}
        >
          <Icon name={ic} size={13} />
          {label}
        </div>
      ))}
    </div>
  );
};

export const Banner: React.FC<{ name: string; role: string; style?: React.CSSProperties }> = ({ name, role, style }) => (
  <div
    style={{
      position: "absolute",
      left: 14,
      right: 14,
      height: 28,
      borderRadius: 10,
      background: "rgba(43,106,80,0.10)",
      display: "flex",
      alignItems: "center",
      gap: 7,
      padding: "0 10px",
      fontFamily: FONT.ui,
      fontSize: 10.5,
      ...style,
    }}
  >
    <Icon name="users" size={12} color={C.green} />
    <span style={{ flex: 1 }}>
      Datos compartidos de <b>{name}</b>
    </span>
    <Badge>{role}</Badge>
  </div>
);

export const Row: React.FC<{ title: string; sub: string; amount?: string; right?: React.ReactNode; style?: React.CSSProperties; icon?: string }> = ({ title, sub, amount, right, style, icon }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 9, height: 46, padding: "0 12px", borderBottom: `1px solid ${C.line}`, ...style }}>
    {icon && (
      <div style={{ width: 26, height: 26, borderRadius: 8, background: C.mint, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={icon} size={13} color={C.greenDark} />
      </div>
    )}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: FONT.ui, fontWeight: 600, fontSize: 11.5 }}>{title}</div>
      <div style={{ fontFamily: FONT.ui, fontSize: 9, color: C.muted, marginTop: 1 }}>{sub}</div>
    </div>
    {amount && <div style={{ fontFamily: FONT.ui, fontWeight: 700, fontSize: 12 }}>{amount}</div>}
    {right}
  </div>
);

export const Card: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => (
  <div style={{ position: "absolute", left: 14, right: 14, borderRadius: 12, border: `1px solid ${C.line}`, background: "#fff", boxShadow: "0 1px 3px rgba(20,60,45,0.06)", overflow: "hidden", ...style }}>{children}</div>
);

export const Button: React.FC<{ children: React.ReactNode; tone?: "black" | "green" | "outline"; style?: React.CSSProperties }> = ({ children, tone = "black", style }) => (
  <div
    style={{
      height: 34,
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      fontFamily: FONT.ui,
      fontWeight: 600,
      fontSize: 12,
      background: tone === "black" ? C.black : tone === "green" ? C.green : "#fff",
      color: tone === "outline" ? C.ink : "#fff",
      border: tone === "outline" ? `1px solid #d8dfdb` : "none",
      ...style,
    }}
  >
    {children}
  </div>
);

export { win, pop };
