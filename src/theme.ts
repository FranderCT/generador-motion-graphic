import { loadFont as loadBricolage } from "@remotion/google-fonts/BricolageGrotesque";
import { loadFont as loadFigtree } from "@remotion/google-fonts/Figtree";
import { loadFont as loadNewsreader } from "@remotion/google-fonts/Newsreader";
import { Easing, interpolate, spring, useCurrentFrame } from "remotion";

export const FPS = 30;
/** Audio 22,52 s + ~0,7 s de cola. */
export const DURATION_FRAMES = 696;

const bric = loadBricolage("normal", { weights: ["700", "800"], subsets: ["latin"] });
const fig = loadFigtree("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] });
const news = loadNewsreader("normal", { weights: ["400", "500"], subsets: ["latin"] });

export const FONT = {
  head: bric.fontFamily,
  ui: fig.fontFamily,
  serif: news.fontFamily,
  mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
};

export const C = {
  ink: "#0f2a20",
  green: "#2b6a50",
  greenDark: "#1f4d3a",
  mint: "#dff3ea",
  mintStrong: "#bfe8d3",
  bg: "#eef3f0",
  muted: "#6b7c74",
  line: "#e4eae7",
  cream: "#faf8f4",
  claude: "#d97757",
  black: "#141414",
  amber: "#b7791f",
};

/** Tiempo absoluto de la composición, en segundos. */
export const useT = () => useCurrentFrame() / FPS;

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const prog = (t: number, a: number, d: number) => clamp01((t - a) / d);
export const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
export const easeIO = Easing.inOut(Easing.cubic);

/** 0 → 1 con salida suave, empezando en `a`. */
export const appear = (t: number, a: number, d = 0.35) => easeOut(prog(t, a, d));
/** Entra en `a`, sale en `b` (fundido de `f` segundos). */
export const win = (t: number, a: number, b: number, f = 0.25) =>
  appear(t, a, f) * (1 - easeOut(prog(t, b - f, f)));

/** Rebote con sobreimpulso, empezando en `a` segundos. */
export const pop = (t: number, a: number, damping = 13) =>
  spring({ frame: Math.max(0, Math.round((t - a) * FPS)), fps: FPS, config: { damping, stiffness: 190, mass: 0.7 } });

export const typed = (text: string, t: number, a: number, b: number) =>
  text.slice(0, Math.round(text.length * prog(t, a, b - a)));

export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
export { interpolate };
