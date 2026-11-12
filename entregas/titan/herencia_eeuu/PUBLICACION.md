# TITÁN · «¿Tus acciones de EE. UU. las heredan tus hijos… o el IRS?»

| Archivo | Formato | Duración |
|---|---|---|
| `TITAN_HERENCIA_Shorts.mp4` | 1080×1920 · 30 fps · −14,0 LUFS · 21,2 MB | 53,5 s |
| `TITAN_HERENCIA_TikTok.mp4` | 1080×1920 · 30 fps · −14,0 LUFS · 33,0 MB | 84,8 s |
| `TITAN_HERENCIA_Portada.jpg` | primer fotograma: «TUS ACCIONES DE EE. UU. ¿LAS HEREDAN TUS HIJOS… O EL IRS?», portafolio, familia y edificio del IRS | — |
| `TITAN_HERENCIA_Shorts.srt` y `TITAN_HERENCIA_TikTok.srt` | subtítulos de 3 palabras sincronizados con la voz final | — |
| `piloto/TITAN_HERENCIA_Piloto.mp4` | piloto aprobado por Lady (gancho + regla) | 20,7 s |

- **Voz:** Juan (ElevenLabs, eleven_v4), una toma por guion, 2.030 créditos. Los mp3 originales están en `voz/`; el flujo se llama «TITÁN · Herencia de acciones de EE. UU. · Narraciones». Para la voz, «IRS» y «LLC» se deletrearon («i erre ese», «ele ele ce»).
- **Verificación:** Whisper confirma las cifras; sincronía de subtítulos sobre el audio final 0,88 (TikTok) y 0,95 (Short), sin ventanas desfasadas; sin cuadros negros, nada quieto más de 2 s, sin silencios, −14,1 LUFS; transiciones revisadas en el video final con ffmpeg.
- **Short ≠ recorte:** el Short une el mito y las opciones en una sola escena y cierra con «antes de que le toque a tu familia». El TikTok agrega el trámite (9 meses, cuenta congelada hasta el certificado del IRS, sin tratado de herencias), el formulario 5472 de la LLC, el fideicomiso revocable y el remate «Todos ven el portafolio crecer. Casi nadie mira quién lo hereda».
- **Imagen:** estilo híbrido TITÁN con contornos reales de Colombia y EE. UU. ([Natural Earth](https://www.naturalearthdata.com/) vía world-atlas, licencia ISC; ver `tools/geo/`). Personas genéricas; el edificio del IRS es genérico, sin logos reales.
- **Aviso en pantalla:** «Contenido educativo. No es una recomendación de inversión ni asesoría tributaria o legal.»

## Datos verificados (fuentes oficiales)
Ver `GUION.md`. Resumen:
- Más de USD 60.000 en activos situados en EE. UU. (acciones de empresas de EE. UU.) → formulario 706-NA dentro de 9 meses ([IRS](https://www.irs.gov/individuals/international-taxpayers/some-nonresidents-with-us-assets-must-file-estate-tax-returns)).
- Tarifas: sobre lo que pasa de USD 60.000, del 26 % al 40 % (IRC §2101 y §2001(c), crédito de USD 13.000). Ejemplo hipotético: USD 200.000 → USD 41.800 (20,9 %).
- Certificado de transferencia para mover los activos ([IRS](https://www.irs.gov/businesses/small-businesses-self-employed/transfer-certificate-filing-requirements-for-the-estates-of-nonresidents-not-citizens-of-the-united-states)).
- Colombia no figura en la lista de tratados de herencias de EE. UU. ([IRS](https://www.irs.gov/businesses/small-businesses-self-employed/estate-gift-tax-treaties-international)).
- LLC de dueño extranjero: formulario 5472 anual; multa de USD 25.000 ([IRS](https://www.irs.gov/instructions/i5472)).

## Título
**TikTok:** ¿Tus acciones de EE. UU. las heredan tus hijos… o el IRS? 🇺🇸⚠️
**Shorts:** El impuesto que casi nadie conoce si inviertes en EE. UU. desde Colombia

## Descripción (ambas plataformas)
Si no vives en EE. UU. y tienes más de USD 60.000 en acciones de allá, tus herederos podrían pagar impuesto de herencia en EE. UU. Te explicamos la regla con fuentes del IRS, un ejemplo hipotético y por qué una LLC, por sí sola, no garantiza nada. Asesórate con un experto en los dos países. Contenido educativo; no es una recomendación de inversión ni asesoría tributaria o legal.

#inversiones #accionesEEUU #herencia #IRS #Colombia #educacionfinanciera

## Armado reproducible
1. mp3 → `tighten.py` 0,32 → `$BITRANS_WORK/her/{tiktok,shorts}_t.wav`
2. `python3 tools/hd_voice.py entregas/titan/herencia_eeuu her`
3. `bash tools/her/build.sh $BITRANS_WORK/her/<modo>.words.json $BITRANS_WORK/her/film_<modo>` (inyecta los mapas)
4. `node tools/hd_render.cjs .../film_<modo>/film.html .../v_<modo>.mp4` (portada: llamada aparte con `--cover`)
5. `python3 tools/hd_mix.py <modo>.wav <modo>.words.json v_<modo>.mp4 her<modo> final.mp4`

Los archivos no se publicaron.
