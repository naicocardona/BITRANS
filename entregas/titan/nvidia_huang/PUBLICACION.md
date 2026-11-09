# TITÁN · «Wall Street subió. Nvidia cayó. ¿Qué puede cambiar para la empresa?» (9 nov 2026)

| Archivo | Formato | Duración |
|---|---|---|
| `TITAN_NVDA_Shorts.mp4` | 1080×1920 · 30 fps · −14,0 LUFS · 16,8 MB | 49,7 s |
| `TITAN_NVDA_TikTok.mp4` | 1080×1920 · 30 fps · −14,0 LUFS · 28,3 MB | 78,8 s |
| `TITAN_NVDA_Portada.jpg` | portada compartida: «WALL STREET SUBIÓ» / «NVIDIA CAYÓ» | — |
| `TITAN_NVDA_Shorts.srt` y `TITAN_NVDA_TikTok.srt` | subtítulos de 3 palabras sincronizados con la voz final | — |

- **Voz:** Juan (ElevenLabs, eleven_v4), una toma por guion, 1.884 créditos. Lady pidió usar la voz de TITÁN en lugar de una voz genérica.
  - Los mp3 originales están en `voz/`. El flujo en ElevenLabs se llama «TITÁN · Nvidia y Huang · Narraciones».
  - Pausas recortadas con `tighten.py` (0,32), sin acelerar la voz.
- **Pronunciación:** para la voz se escribió «Envidia», «Yensen Huang» y «ese ene pe quinientos». En pantalla y en los subtítulos van como Nvidia, Jensen Huang y S&P 500. Whisper confirmó que se escuchan bien.
- **Verificación:** la sincronía de subtítulos dio 0,88 (Short) y 0,92 (TikTok), sin ventanas desfasadas. Sin cuadros negros, nada quieto más de 2 s, sin silencios. Las transiciones se revisaron en el video final.
- **Guiones:** son los del brief, textuales (`guiones.py`).
- **Imagen:** estilo híbrido TITÁN (trazo dibujado más tarjetas planas) con la paleta del brief: navy #0D1020, marfil #F6F4EF y dorado #C8A45D. El rojo solo marca la caída.
  - Firma en texto «TITÁN HOLDING», sin logotipo.
  - Nvidia no se presenta como posición de TITÁN.
- **Cuidado editorial:**
  - Huang no se dibuja: se usa una silla con placa «CEO» bajo los reflectores.
  - No hay imágenes de la relación ni nombres de terceros.
  - No hay estética de espionaje: los «reportes» son periódicos genéricos con la etiqueta «ABRIR UNA INVESTIGACIÓN NO PRUEBA NADA».
  - No se afirma que la noticia causó la caída: «NO PRUEBA LA CAUSA» y «LA CAÍDA SOLA NO LO EXPLICA».
  - Los organigramas del TikTok van rotulados «EJEMPLO HIPOTÉTICO» durante toda la escena.

## Datos verificados con la fuente primaria
- **Mensaje de Huang a empleados, publicado por Nvidia:** «I was unfaithful to my wife.» El mismo mensaje dice que el consejo inició una investigación independiente por las preocupaciones de seguridad nacional de los reportes.
- **Comunicado del consejo:**
  - «The NVIDIA Board is initiating an independent investigation in light of recent reporting that founder and CEO Jensen Huang has been the target of a foreign intelligence effort.»
  - «…the Board has no reason to believe that either national security or NVIDIA secrets were compromised…»
- **Cierre del lunes 9 nov 2026:** Nvidia −4,3 % y S&P 500 +2,3 %, según AP. La página de AP bloquea la descarga automática, así que se contrastó con:
  - Reuters, vía Kitco: S&P 500 +2,34 % al cierre;
  - StockTitan: Nvidia −4,27 % al cierre de la sesión regular.
  - No se usaron cifras intradía (algunos medios citan −6,2 % o −6,4 %).

## Títulos
- **YouTube Shorts:** Nvidia cayó mientras Wall Street subía: qué pasó
- **TikTok:** ¿Cuánto depende Nvidia de su CEO?

## Descripción (las dos plataformas)
Nvidia cayó en una jornada de ganancias para el S&P 500. Separamos lo que reconoció Jensen Huang, lo que investiga el consejo y lo que aún no está confirmado. Contenido educativo; no es una recomendación de inversión.

Fuentes:
• Mensaje oficial de Huang: https://nvidianews.nvidia.com/_gallery/download_pdf/6af0e34b3d63329de545324b/
• Comunicado oficial del consejo: https://nvidianews.nvidia.com/_gallery/download_pdf/6af0d5123d63325ccc415751/
• Balance de mercado de AP: https://apnews.com/article/stocks-markets-ai-trump-oil-d938f8e6ff42b3706e1d36e6245ec56b

## Armado reproducible
1. mp3 → `tighten.py` 0,32 → `$BITRANS_WORK/nv/{tiktok,shorts}_t.wav`
2. `python3 tools/nv/voice.py`
3. `bash tools/hd_build.sh tools/nv/film.js $BITRANS_WORK/nv/<modo>.words.json $BITRANS_WORK/nv/film_<modo>`
4. `node tools/hd_render.cjs .../film_<modo>/film.html .../video_<modo>.mp4`. Para la portada, `--cover portada.png`.
5. `python3 tools/hd_mix.py <modo>.wav <modo>.words.json video_<modo>.mp4 nv<modo> final_<modo>.mp4`

Los archivos no se publicaron.
