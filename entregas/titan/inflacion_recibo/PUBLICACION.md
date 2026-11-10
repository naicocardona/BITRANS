# TITÁN · «Menos inflación no significa precios más bajos» (dato BLS del 10 nov 2026)

| Archivo | Formato | Duración |
|---|---|---|
| `TITAN_INFLACION_Shorts.mp4` | 1080×1920 · 30 fps · −14,1 LUFS · 13,9 MB | 43,1 s |
| `TITAN_INFLACION_TikTok.mp4` | 1080×1920 · 30 fps · −14,0 LUFS · 22,7 MB | 65,5 s |
| `TITAN_INFLACION_Portada.jpg` | portada compartida = primer fotograma: «¿BAJÓ LA INFLACIÓN? MIRA EL RECIBO», recibos $100 → $106 → $110 y «EJEMPLO ILUSTRATIVO» | — |
| `TITAN_INFLACION_Shorts.srt` y `TITAN_INFLACION_TikTok.srt` | subtítulos de 3 palabras sincronizados con la voz final | — |

- **Voz:** Juan (ElevenLabs, eleven_v4), una toma por guion, 1.573 créditos.
  - Los mp3 originales están en `voz/`. El flujo en ElevenLabs se llama «TITÁN · Inflación y el recibo · Narraciones».
  - Pausas recortadas con `tighten.py` (0,32), sin acelerar la voz.
  - Para que el TikTok llegue al mínimo de 65 s, se añadieron dos pausas de lectura en las cifras: después de «ciento diez» (0,5 s) y después de «septiembre» (0,45 s).
- **Verificación:**
  - Whisper confirma 100, 106, 110, 0,4 %, 0,6, «la Fed» y el 10 de noviembre.
  - La sincronía de subtítulos dio 0,93 (TikTok) y 0,91 (Short), sin ventanas desfasadas.
  - Sin cuadros negros, nada quieto más de 2 s y sin silencios. Las transiciones se revisaron en el video final.
- **Guiones:** son los del brief, textuales (`guiones.py`).
- **Imagen:** estilo híbrido TITÁN (kit `tools/hd_lib.js`) con la paleta del brief: azul oscuro, marfil y dorado; el rojo solo resalta. Firma en texto «TITÁN HOLDING».
- **Cuidado editorial:**
  - Los recibos van rotulados «EJEMPLO ILUSTRATIVO · NO ES EL DATO OFICIAL».
  - La fábrica y la cotización de préstamo son ficticias y no muestran ninguna tasa («depende de las tasas»).
  - Las barras de 0,6 % y 0,4 % son positivas y están rotuladas «subió» y «subió (menos)».
  - Aparece la nota «Fuente: BLS · cifras de EE. UU., no de Colombia».
  - No se afirma ninguna decisión de la Fed ni se atribuye un movimiento bursátil al dato. El TikTok muestra «1 INFORME ≠ DECISIÓN DE LA FED / ≠ MOVIMIENTO DE UNA ACCIÓN».

## Dato verificado con la fuente primaria
- **Informe:** BLS, «CONSUMER PRICE INDEX - OCTOBER 2026» (USDL-26-1685), embargo hasta las 8:30 a. m. ET del martes 10 de noviembre de 2026.
- **Cita:** «The Consumer Price Index for All Urban Consumers (CPI-U) increased 0.4 percent on a seasonally adjusted basis in October, after rising 0.6 percent in September». Las tablas A y 1 coinciden.
- **Variación de 12 meses:** el BLS no la publica para octubre de 2026, porque no recolectó datos en octubre de 2025 por la falta de presupuesto. Por eso no se usa.

## Título (ambas plataformas)
La inflación se frenó. ¿Por qué todo sigue más caro?

## Descripción (ambas plataformas)
Con tres recibos explicamos la diferencia entre una inflación más lenta y una caída de precios, y por qué esa diferencia le importa a un inversor. Contenido educativo; no es una recomendación de inversión.

Fuente: informe oficial del BLS: https://www.bls.gov/news.release/archives/cpi_11102026.htm

## Armado reproducible
1. mp3 → `tighten.py` 0,32 → `$BITRANS_WORK/inf/{tiktok,shorts}_t.wav`
2. `python3 tools/inf/voice.py`. Incluye las pausas de lectura del TikTok.
3. `bash tools/hd_build.sh tools/inf/film.js $BITRANS_WORK/inf/<modo>.words.json $BITRANS_WORK/inf/film_<modo>`
4. `node tools/hd_render.cjs .../film_<modo>/film.html .../video_<modo>.mp4`. Para la portada, `--cover portada.png`.
5. `python3 tools/hd_mix.py <modo>.wav <modo>.words.json video_<modo>.mp4 inf<modo> final_<modo>.mp4`

Los archivos no se publicaron.
