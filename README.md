# generador-motion-graphic

Genera **motion graphics verticales (9:16, 1080×1920)** con [Remotion](https://www.remotion.dev/) y voz en off de **ElevenLabs**. Nació para los videos de novedades de [Ordenáte](https://app.frandercarrillo.com): teléfono con pantallas, pasos numerados, cursor con clics y cierre con URL.

Incluye dos composiciones de ejemplo:

| Composición | Qué muestra | Render |
|---|---|---|
| `Novedades` | Pantallas de la app (presupuesto, asesor de IA, reportes, calculadora, Claude por MCP) | `pnpm render` |
| `NovedadesClaude` | Lo mismo, todo dentro de un chat de Claude (tool cards + confirmación) | `pnpm render:claude` |

## Uso rápido
```bash
pnpm install
pnpm studio          # vista previa
pnpm render:claude   # → out/ordenate-novedades-claude.mp4
```
Requiere Node 20+, pnpm y (para audio) ffmpeg.

## Hacer tu propio video
1. Escribe el guion (≈2,5 palabras por segundo).
2. Genera la voz en ElevenLabs → `public/narracion.mp3` (ver abajo).
3. Copia `src/MainClaude.tsx` + `src/scenesClaude.tsx`, cambia textos y tiempos (los silencios del audio marcan cada escena: `scripts/audio.sh cuts`).
4. Registra la composición en `src/Root.tsx` y renderiza.

Guía completa paso a paso en **[AGENTS.md](./AGENTS.md)**, pensada para que un agente de IA (Claude Code u otro) lo opere de punta a punta.

## Voz con ElevenLabs sin API
`skills/elevenlabs-voz` + `skills/chrome-js` automatizan la web de ElevenLabs usando **tu Chrome ya logueado** (JavaScript vía AppleScript, solo macOS). No se necesitan claves de API; consume los créditos de tu cuenta.
```bash
mkdir -p ~/.claude/skills && cp -R skills/chrome-js skills/elevenlabs-voz ~/.claude/skills/
```
Activa en Chrome: *Ver → Opciones para desarrolladores → Permitir JavaScript desde eventos de Apple*.

## Estructura
`src/` composiciones y piezas visuales · `public/` audios · `skills/` skills para agentes · `scripts/audio.sh` utilidades ffmpeg.
