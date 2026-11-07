# TITÁN · Piloto «Interés compuesto: la bola de nieve» (prueba de estilo, 7 nov 2026)

Es una prueba del nuevo estilo dibujado a mano (skill `hand-drawn-canvas-animation`) aplicado a TITÁN. No es para publicar todavía: falta la aprobación de Lady.

| Archivo | Formato |
|---|---|
| `TITAN_IC_Piloto_TikTok.mp4` | 1080×1920 · 30 fps · 2:40 (160,3 s) · −14 LUFS · 46,5 MB (máxima calidad, crf 18) |
| `TITAN_IC_Piloto_Portada.jpg` | portada vertical |
| `TITAN_IC_Piloto.srt` | 136 bloques de 3 palabras, sincronizados con la voz |
| `voz/` | 13 secciones Kokoro y `words.json` alineado |

## Producción
- **Voz de prueba:** el Explorador (Kokoro em_alex, 0,92, con la cadena de voz A), sin ElevenLabs. Para la versión final se cambia por Juan de ElevenLabs.
- **Sincronía:** `sync_check` da 0,94 sobre la mezcla final, sin ventanas desfasadas.
- **Imagen:** 13 escenas dibujadas a mano en Canvas con `core.js` de la skill.
  - Paleta TITÁN: marfil, navy, dorado, lavanda y violeta. Personas genéricas con trazo vivo.
  - Transiciones variadas, sin repetirse seguidas: mancha de tinta, barrido rápido, círculo dorado, cortina dorada y caída.
  - Sacudidas en cada golpe, 76 efectos de sonido sincronizados y música original «nieve».
- **QA:**
  - Sin cuadros negros, nada quieto más de 2 s y sin silencios.
  - Las transiciones se revisaron en el video final.
  - El detector marca 6 micro-pausas de 2 cuadros en momentos de cámara casi fija; corresponden al redibujo del trazo, que es intencional.
- **Armado reproducible:**
  1. `python3 tools/ic/voice.py`
  2. `bash tools/ic/build.sh`
  3. `node tools/hd_render.cjs $BITRANS_WORK/ic/film/film.html $BITRANS_WORK/ic/video.mp4`
  4. `python3 tools/ic/mix.py`

## Cifras (ejemplo hipotético, calculadas y verificadas)
- **Supuestos:** 8 % anual fijo; tabla con capitalización mensual (8 %/12) y aporte al final de cada mes hasta los 65 años. Sin impuestos, comisiones ni inflación. Todo se rotula «EJEMPLO HIPOTÉTICO».
- **Aporte mensual para US$1.000.000 a los 65:**
  - 20 años: US$189,59 (pone US$102.379; el interés aporta US$897.621, ≈ 90 %)
  - 25 años: US$286,45
  - 30 años: US$435,94
  - 40 años: US$1.051,50
  - 50 años: US$2.889,85 (pone US$520.174, más de la mitad)
- **US$10.000 al 8 % anual compuesto:** 10.800 (año 1), 11.664 (año 2), 21.589 (10 años), 46.610 (20 años) y 100.627 (30 años). Los últimos 10 años suman +54.017, más de la mitad del crecimiento.
- **Sin reinvertir:** 10.000 + 24.000 de ganancias gastadas = 34.000.
- **Portada:** «15 veces menos». 2.889,85 / 189,59 = 15,2.

## Texto sugerido
**Título:** ¿Por qué uno paga 15 veces menos para llegar al millón?

**Descripción:** La bola de nieve del interés compuesto, explicada con dibujos: reinvertir y empezar temprano cambian todo. Ejemplo hipotético con 8 % anual fijo; los mercados no rinden un porcentaje fijo. Contenido educativo; no es una recomendación de inversión.
