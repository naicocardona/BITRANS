# TITÁN · «Interés compuesto: la bola de nieve» (listo para publicar)

| Archivo | Formato | Duración |
|---|---|---|
| `TITAN_IC_TikTok.mp4` | 1080×1920 · 30 fps · −14,0 LUFS · 28,2 MB (máxima calidad) | 89,8 s |
| `TITAN_IC_Shorts.mp4` | 1080×1920 · 30 fps · −14,1 LUFS · 17,9 MB (máxima calidad) | 54,3 s |
| `TITAN_IC_Portada.jpg` | portada para las dos plataformas | — |
| `TITAN_IC_TikTok.srt` y `TITAN_IC_Shorts.srt` | subtítulos de 3 palabras sincronizados | — |

- **Voz:** Juan (ElevenLabs, eleven_v4), una toma por guion, 2.146 créditos.
  - Los mp3 originales están en `voz/`. El flujo en ElevenLabs se llama «TITÁN · Interés compuesto · Narraciones».
  - Pausas recortadas con `tighten.py` (0,32), sin acelerar la voz.
- **Verificación de voz:** la transcripción con Whisper coincide con el guion. La sincronía de subtítulos dio 0,93 (TikTok) y 0,94 (Short), sin ventanas desfasadas.
- **Estilo:** combina el trazo dibujado a mano (skill `hand-drawn-canvas-animation`) con rasgos del estilo plano anterior:
  - tarjetas navy con cifras doradas y rellenos planos;
  - personas genéricas más grandes;
  - fondo con puntos y manchas en paralaje;
  - escenas navy para la tabla y el cierre.
- **Ritmo:** transiciones variadas que nunca se repiten seguidas, sacudidas en cada golpe y efectos de sonido sincronizados (50 en el TikTok, 29 en el Short). Cada versión tiene su propia música original.
- **El Short es una edición propia:** gancho, bola de nieve que rueda («solo si reinviertes»), tabla por edad, quién pone el millón, el tiempo y cierre.

## Cifras (ejemplo hipotético, calculadas y verificadas)
- **Supuestos:** 8 % anual fijo; tabla con capitalización mensual (8 %/12) y aporte al final de cada mes hasta los 65 años. Sin impuestos, comisiones ni inflación. Va rotulado «EJEMPLO HIPOTÉTICO · VALORES APROXIMADOS».
- **Aporte mensual para US$1.000.000 a los 65:**
  - 20 años: US$189,59
  - 25 años: US$286,45
  - 30 años: US$435,94
  - 40 años: US$1.051,50
  - 50 años: US$2.889,85
- **Quién pone el millón:**
  - Si empiezas a los 20, pones US$102.379 y el interés pone US$897.621 (≈ 90 %).
  - Si empiezas a los 50, pones US$520.174 (más de la mitad) y el interés pone US$479.826 (≈ 48 %).
- **US$10.000 al 8 % anual compuesto:** +800 el año 1 y +864 el año 2 (8 % × 10.800); 100.627 a los 30 años.
- **Sin reinvertir:** 10.000 + 24.000 gastados = 34.000. La voz dice «contando lo gastado».
- **Portada:** «15 veces menos». 2.889,85 / 189,59 = 15,2.

## Títulos
- **YouTube Shorts:** ¿Por qué uno paga 15 veces menos para llegar al millón?
- **TikTok:** La bola de nieve del interés compuesto: ¿desde qué edad empiezas?

## Descripción (las dos plataformas)
Dos personas, la misma meta de un millón de dólares, cuotas muy distintas. La diferencia está en el tiempo y en reinvertir lo que ganas. Ejemplo hipotético con un 8 % anual fijo; los mercados no rinden un porcentaje fijo y no se incluyen impuestos, comisiones ni inflación. Contenido educativo; no es una recomendación de inversión.

#interescompuesto #inversiones #finanzaspersonales #educacionfinanciera

## Armado reproducible
1. Descargar los mp3 → `tighten.py` 0,32 → `$BITRANS_WORK/icf/{tiktok,shorts}_t.wav`
2. `python3 tools/ic/voice_final.py`
3. `bash tools/ic/build_final.sh tk|sh`
4. `node tools/hd_render.cjs $BITRANS_WORK/icf/film_<modo>/film.html $BITRANS_WORK/icf/video_<modo>.mp4`
5. `python3 tools/ic/mix_final.py`

Los archivos no se publicaron.
