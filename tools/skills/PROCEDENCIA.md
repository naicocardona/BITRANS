# Skills de animación instaladas (7 nov 2026)

| Skill | Origen | Commit | Licencia |
|---|---|---|---|
| hand-drawn-canvas-animation | github.com/alesha-pro/tools (Alexey Fateev) | 90e9662 | MIT (`LICENSE_alesha-pro_tools`) |
| motion-reel | github.com/alesha-pro/tools | 90e9662 | MIT |
| painted-animation | github.com/tuzhechen2005/opus-video-skills | 59744a6 | MIT (`LICENSE_opus-video-skills`) |

- **Revisión de seguridad:** solo usan Chrome y ffmpeg locales y `rembg` opcional; no envían datos a internet ni tienen scripts de instalación.
- **Instalación:** `tools/restaurar.sh` las enlaza en `~/.claude/skills/` y prepara el renderizador en `bitrans_work/hdca`. Hay que ejecutarlo con `CHROME=/usr/bin/google-chrome`.
- **Prueba:** sketchbook-bird renderizó 144 cuadros a 1920×1080 sin errores.
- **Descartadas:**
  - lyric-music-video: es para canciones y clona otro repositorio al usarse.
  - kinetic-reel: impone su propia estética (negro, crema y lima).
  - gen-ai-explainer de Picsart: gasta créditos de pago.
  - educational-video-creator y animated-video: no tienen licencia clara.
