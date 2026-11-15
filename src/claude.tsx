import React from "react";
import { appear, C, FONT, useT } from "./theme";
import { ClaudeStar, Icon, Logo } from "./ui";

export const ClaudeHeader: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 44, display: "flex", alignItems: "center", padding: "0 14px", gap: 7 }}>
    <ClaudeStar size={16} />
    <span style={{ fontFamily: FONT.serif, fontWeight: 500, fontSize: 18, color: "#1f1d1a" }}>Claude</span>
    <div style={{ flex: 1 }} />
    <div style={{ display: "flex", alignItems: "center", gap: 5, border: "1px solid #e7e2d8", borderRadius: 99, padding: "4px 10px", fontFamily: FONT.ui, fontWeight: 600, fontSize: 9.5, background: "#fff" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#21a35a" }} /> Ordenáte conectado
    </div>
  </div>
);

export const ToolCard: React.FC<{ tool: string; detail?: string; at: number; doneAt: number; doneLabel: string; top: number }> = ({ tool, detail, at, doneAt, doneLabel, top }) => {
  const t = useT();
  const a = appear(t, at, 0.3);
  const done = t >= doneAt;
  if (a < 0.01) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 14,
        right: 14,
        top,
        height: 38,
        borderRadius: 11,
        background: "#fff",
        border: "1px solid #e7e2d8",
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "0 10px",
        opacity: a,
        transform: `translateY(${(1 - a) * 12}px)`,
      }}
    >
      <Logo size={20} radius={6} />
      <div style={{ flex: 1, lineHeight: 1.15 }}>
        <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 10.5 }}>{tool}</div>
        {detail && <div style={{ fontFamily: FONT.ui, fontSize: 8.5, color: C.muted }}>{detail}</div>}
      </div>
      <div style={{ fontFamily: FONT.ui, fontWeight: 600, fontSize: 9.5, color: done ? "#1f8a4c" : C.muted, display: "flex", alignItems: "center", gap: 4 }}>
        {done ? <Icon name="check" size={11} color="#1f8a4c" stroke={2.6} /> : <Spinner t={t} />}
        {done ? doneLabel : "Ejecutando…"}
      </div>
    </div>
  );
};

export const Spinner: React.FC<{ t: number }> = ({ t }) => (
  <span style={{ width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #cfcfc8", borderTopColor: C.claude, display: "inline-block", transform: `rotate(${t * 520}deg)` }} />
);

export const UserBubble: React.FC<{ text: string; at: number; top: number }> = ({ text, at, top }) => {
  const t = useT();
  const a = appear(t, at, 0.3);
  return (
    <div
      style={{
        position: "absolute",
        right: 14,
        top,
        maxWidth: 270,
        background: "#f0ece3",
        borderRadius: 14,
        padding: "9px 12px",
        fontFamily: FONT.ui,
        fontSize: 11,
        lineHeight: 1.35,
        color: "#2a2723",
        opacity: a,
        transform: `translateY(${(1 - a) * 14}px)`,
      }}
    >
      {text}
    </div>
  );
};

export const Composer: React.FC<{ top: number; text: string; send?: boolean; placeholder?: string }> = ({ top, text, send, placeholder = "Responder a Claude…" }) => (
  <div
    style={{
      position: "absolute",
      left: 14,
      right: 14,
      top,
      height: 74,
      borderRadius: 16,
      background: "#fff",
      border: "1px solid #ece7dc",
      boxShadow: "0 3px 12px rgba(80,60,30,0.07)",
      padding: "11px 13px",
      fontFamily: FONT.ui,
      fontSize: 11.5,
      color: text ? "#2a2723" : "#a8a398",
      lineHeight: 1.35,
    }}
  >
    <div style={{ paddingRight: 34 }}>{text || placeholder}</div>
    <div style={{ position: "absolute", right: 10, bottom: 10, width: 26, height: 26, borderRadius: "50%", background: send ? C.claude : "#efd8cd", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon name="arrowUp" size={14} color="#fff" stroke={2.6} />
    </div>
  </div>
);

