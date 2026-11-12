# TITÁN · Reflexión «Si hoy estás en el piso, es tu punto de partida»

| Archivo | Formato | Duración |
|---|---|---|
| `TITAN_REFLEXION_Shorts.mp4` | 1080×1920 · 30 fps · −14 LUFS · 20,1 MB | 36,6 s |
| `TITAN_REFLEXION_TikTok.mp4` | 1080×1920 · 30 fps · −14 LUFS · 31,4 MB | 61,4 s |
| `TITAN_REFLEXION_Portada.jpg` | primer fotograma: rostro cansado frente a la pantalla en rojo, «TODOS QUIEREN EL RESULTADO» | — |
| `TITAN_REFLEXION_Shorts.srt` y `TITAN_REFLEXION_TikTok.srt` | subtítulos de 3 palabras sincronizados | — |

- **Guion:** aprobado por Lady (12 nov 2026), en «nosotros», con su frase: «Al final tuvimos que asumir las consecuencias de nuestras malas decisiones. Y aun así, levantamos la cabeza.»
- **Voz:** Juan (ElevenLabs, eleven_v4), una toma por guion, 1.314 créditos. Mp3 en `voz/`. Pausas de respiración en las frases fuertes (el TikTok llega a 61 s sin acelerar la voz).
- **Imagen:** estilo A «escenas de cerca», aprobado por Lady con el personaje A1 (pelo corto, camiseta básica negra). Persona genérica dibujada a mano; de la noche al amanecer:
  1. rostro cansado frente al mercado en rojo;
  2. de lado en la almohada con la alarma de las 6:00;
  3. (TikTok) manos que sueltan monedas, reloj que se derrite y vidrio roto: plata, tiempo, confianza;
  4. lluvia, cabeza abajo y una lágrima → «levantamos la cabeza» con el rayo de luz dorada;
  5. el camino al horizonte: se pone de pie;
  6. (TikTok) pies que suben escalones: nadie aplaude, el mercado cae, parece que no avanzas;
  7. (TikTok) libreta con la lista del día y sus ✓;
  8. cae y se levanta, contador de veces hasta ∞;
  9. de espaldas frente al amanecer: «ES TU PUNTO DE PARTIDA».
- **Verificación:** sincronía de subtítulos sobre el audio final 0,87 (TikTok) y 0,89 (Short), sin ventanas desfasadas; sin cuadros negros, nada quieto más de 2 s, sin silencios, −14,0 / −14,1 LUFS; transiciones revisadas en el video final.
- No es contenido de inversión con cifras; cierra con la firma TITÁN HOLDING y «Guárdalo para el día que lo necesites».

## Título
**TikTok:** Si hoy estás en el piso, no es el final.
**Shorts:** Todos quieren el resultado. Casi nadie quiere el proceso.

## Descripción (ambas plataformas)
Nos equivocamos muchas veces. Perdimos plata, tiempo y hasta la confianza. Asumimos las consecuencias y aun así levantamos la cabeza. Si hoy estás en el piso, es tu punto de partida. 🖤

#disciplina #mentalidad #motivacion #inversiones #TITANHolding

## Armado reproducible
1. mp3 → `tighten.py` 0,32 → `$BITRANS_WORK/ref/{tiktok,shorts}_t.wav`
2. `python3 tools/hd_voice.py entregas/titan/reflexion_levantarse ref` (PAUSAS en `guiones.py`)
3. `bash tools/ref2/build.sh $BITRANS_WORK/ref/<modo>.words.json $BITRANS_WORK/ref/film2_<modo>` (une `paint.js` + `film.js`)
4. `node tools/hd_render.cjs .../film2_<modo>/film.html .../v_<modo>.mp4`
5. `python3 tools/hd_mix.py <modo>.wav <modo>.words.json v_<modo>.mp4 ref<modo> final.mp4`

El primer piloto (escalera, `tools/ref/`) quedó descartado por Lady; se conserva como referencia. Los archivos no se publicaron.
