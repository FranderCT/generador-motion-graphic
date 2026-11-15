# Generador de motion graphics (Remotion + ElevenLabs)

Instrucciones para un agente de IA. Este repo genera videos verticales 9:16 (1080×1920, 30 fps) con **Remotion** (React), narrados con voz de **ElevenLabs**, siguiendo el estilo de Ordenáte: teléfono con pantallas, encabezado de paso numerado, cursor con clics y cierre con pastilla de URL.

Idioma de trabajo: **español**, con todas las tildes.

## Mapa del repo
```
src/index.ts            registerRoot
src/Root.tsx            <Composition id=… durationInFrames=… /> (una por video)
src/theme.ts            FPS, paleta C, tipografías FONT, helpers de animación (useT, appear, win, pop, typed, prog)
src/ui.tsx              piezas visuales: Phone, StepHeader, Word, Logo, Cursor, Card, Row, Badge, Button, Background…
src/claude.tsx          piezas del chat de Claude: ToolCard, UserBubble, Composer, ClaudeHeader
src/Main.tsx            composición "Novedades" (pantallas de la app)        + src/scenes.tsx
src/MainClaude.tsx      composición "NovedadesClaude" (todo dentro del chat)  + src/scenesClaude.tsx
public/narracion*.mp3   audio de cada composición
skills/chrome-js/       skill para controlar el Chrome real del usuario con JS (osascript)
skills/elevenlabs-voz/  skill para generar la voz en ElevenLabs con chrome-js
scripts/audio.sh        acelerar mp3, medir duración, detectar silencios (ffmpeg)
```

## Comandos
```bash
pnpm install                      # una vez
pnpm studio                       # vista previa interactiva
pnpm render                       # → out/ordenate-novedades.mp4
pnpm render:claude                # → out/ordenate-novedades-claude.mp4
npx remotion still src/index.ts NovedadesClaude --frame=200 --output=out/f200.png   # un cuadro para revisar
```
- El primer `still`/`render` descarga Chrome headless y puede vencer por tiempo: reintenta con `--timeout=90000`.
- `out/` y `node_modules/` no se versionan.

## Crear un video nuevo (receta)
1. **Guion**: una frase por escena, ~2,5 palabras/segundo. Gancho (≈2 s) → pasos numerados → cierre con CTA/URL. Pregunta al usuario el tema y el público si no está claro.
2. **Voz**: sigue `skills/elevenlabs-voz/SKILL.md` (usa `skills/chrome-js`) para producir `public/narracion-<nombre>.mp3`. Mide con `scripts/audio.sh dur` y saca los cortes con `scripts/audio.sh cuts`.
3. **Escenas**: copia `MainClaude.tsx` + `scenesClaude.tsx` (o `Main.tsx` + `scenes.tsx`) con otro nombre. Cada escena recibe `t0`/`t1` en **segundos absolutos** de la composición y se anima con `useT()` y los helpers de `theme.ts`; los tiempos salen de los silencios del audio.
4. **Registrar** la composición en `src/Root.tsx` con `durationInFrames = duración_audio × 30 + ~20` (cola).
5. **Revisar** con `remotion still` en varios frames (inicio, mitad de cada paso, cierre) y mira las imágenes antes de renderizar. Después `remotion render`.
6. Entrega la ruta del `.mp4` (copia a `~/Downloads` si el usuario lo pide).

## Reglas de estilo (heredadas del usuario)
- Si el video es de Claude/MCP: todo se muestra **dentro del chat de Claude** (tool cards + confirmación «Claude propone, tú confirmas»); **no presentes a Claude** (se asume que ya lo conocen).
- Gancho con titular corto y grande, p. ej. «Lo nuevo en Ordenáte».
- Los cálculos de préstamos se presentan siempre como **guía**, no como la tabla del banco.
- Paleta y fuentes salen de `theme.ts` (verde `#2b6a50`, tinta `#0f2a20`, Bricolage Grotesque + Figtree). No introduzcas colores nuevos sin motivo.
- Voz femenina (Diana) salvo que el usuario pida otra. Audio acelerado 1,1× es el estándar.
- Cierre: pastilla negra con la URL y, si aplica, «Pídeselo a Claude».

## Cómo controlar el Chrome del usuario (ElevenLabs y otros paneles)
Usa **solo** la skill `skills/chrome-js/SKILL.md` (JavaScript por AppleScript sobre el Chrome ya logueado). No uses la extensión Claude in Chrome ni Playwright salvo que el usuario lo pida.
- Para que funcione en tu entorno, instala la skill: `mkdir -p ~/.claude/skills && cp -R skills/chrome-js ~/.claude/skills/` (y `skills/elevenlabs-voz` igual). Si no usas Claude Code, ejecuta los scripts directamente desde `skills/chrome-js/scripts/`.
- Requiere macOS + Google Chrome con *Ver → Opciones para desarrolladores → Permitir JavaScript desde eventos de Apple*.
- Confirma con el usuario antes de acciones que gasten créditos (regenerar voz) o sean irreversibles. Nunca imprimas tokens/cookies.

## Límites
- No subas claves, `.env` ni audios que el usuario no haya aprobado.
- No hagas `git push`/cambies visibilidad del repo sin que el usuario lo pida.
