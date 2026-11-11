# TITÁN · «¿Arrendar o comprar casa? La cuenta que nadie hace»

| Archivo | Formato | Duración |
|---|---|---|
| `TITAN_ARRENDAR_O_COMPRAR_Shorts.mp4` | 1080×1920 · 30 fps · −14,0 LUFS · __SH_MB__ MB | __SH_DUR__ s |
| `TITAN_ARRENDAR_O_COMPRAR_TikTok.mp4` | 1080×1920 · 30 fps · −14,0 LUFS · __TK_MB__ MB | __TK_DUR__ s |
| `TITAN_ARRENDAR_O_COMPRAR_Portada.jpg` | primer fotograma: «¿ARRENDAR ES BOTAR LA PLATA?», billetes a la caneca y el edificio | — |
| `TITAN_ARRENDAR_O_COMPRAR_Shorts.srt` y `..._TikTok.srt` | subtítulos de 3 palabras sincronizados con la voz final | — |

- **Voz:** Juan (ElevenLabs, eleven_v4), una toma por guion, 1.764 créditos. Mp3 originales en `voz/`. «CDT» se escribió «ce de te» para la voz y en pantalla sale «CDT».
- **Verificación:** Whisper confirma las cifras; sincronía de subtítulos 0,89 (TikTok y Short) sin ventanas desfasadas; QA cuadro por cuadro __QA__.
- **Short ≠ recorte:** el Short llega al «truco» del primer año (intereses vs. abono) y cierra con «depende»; el TikTok suma el costo de oportunidad de la cuota inicial (CDT), la comparación del primer año ($41 M vs. $18 M) y el otro lado (el arriendo sube, la vivienda se valoriza y al final es tuya).

## Supuestos del ejemplo hipotético y cálculos
| Concepto | Valor | Fuente / cálculo |
|---|---|---|
| Apartamento | $300.000.000 | hipotético |
| Arriendo | $1.500.000/mes = 0,5 % del valor | mercado ~0,5–0,7 % mensual ([Colombia House](https://www.colombiahouse.com.co/blog/tope-canon-arriendo-valor-comercial/), fuente comercial); tope legal 1 % mensual del valor comercial (Ley 820 de 2003, art. 18) |
| Cuota inicial | 30 % = $90.000.000 | exigencia típica No VIS |
| Crédito | $210.000.000 a 20 años | hipotético |
| Tasa | 15,46 % E.A. (dicho «cercana al 15,5 %») | promedio No VIS, Superfinanciera, fin de octubre 2026 ([LQN](https://lqnhipotecas.com/tasas-credito-hipotecario-hoy-colombia/), [El País](https://www.elpais.com.co/economia/donde-sacar-un-credito-de-vivienda-en-2026-estos-bancos-ofrecen-las-tasas-mas-bajas-2734.html)) |
| Cuota mensual (sin seguros) | $2.682.126 → «unos $2.680.000» | sistema francés, tasa mensual 1,2052 % |
| Año 1: intereses / abono a capital | $30.244.562 / $1.940.954 | tabla de amortización |
| CDT 12 % E.A. sobre $90 M | $10.800.000 al año, antes de impuestos | CDT 360 días nov. 2026 entre 10,8 % y 13,4 % E.A. según entidad ([La República](https://www.larepublica.co/finanzas/banco-pichincha-lidera-en-tasas-de-cdt-a-360-dias-con-un-rendimiento-de-mas-de-13-4517851), [Infobae](https://www.infobae.com/colombia/2026/11/01/asi-quedo-la-rentabilidad-de-los-cdt-en-colombia-para-noviembre-de-2026-tras-la-ultima-decision-del-banco-de-la-republica/)) |
| Año 1 sin recuperar | comprar ≈ $41 M (30,24 + 10,8) · arrendar $18 M | sin seguros, predial ni administración (lo dice la pantalla) |
| Incremento del arriendo 2026 | hasta 5,10 % (IPC 2025) | [Ciencuadras](https://www.ciencuadras.com/blog/guia-para-arrendar-inmuebles/incremento-del-arriendo-en-colombia-2026-puede-subir-hasta-510) |

No se usa ninguna cifra de valorización: no hay un dato oficial reciente y el video la deja como la variable que decide.

## Título
**TikTok:** ¿Arrendar es botar la plata? Hicimos la cuenta que nadie hace 🏠
**Shorts:** Arrendar vs. comprar: el primer año de una hipoteca

## Descripción (ambas plataformas)
Ejemplo hipotético: apartamento de $300 millones, arriendo de $1,5 millones vs. crédito de $210 millones a 20 años con la tasa promedio No VIS (15,46 % E.A., Superfinanciera, octubre 2026). El primer año, más de $30 millones se van en intereses. La respuesta depende del tiempo, la tasa y la valorización: haz tu cuenta antes de firmar. Contenido educativo; no es una recomendación de inversión.

#finanzaspersonales #vivienda #arriendo #Colombia #educacionfinanciera

## Armado reproducible
1. mp3 → `tighten.py` 0,32 → `$BITRANS_WORK/arr/{tiktok,shorts}_t.wav`
2. `python3 tools/hd_voice.py entregas/titan/arrendar_vs_comprar arr`
3. `bash tools/hd_build.sh tools/arr/film.js $BITRANS_WORK/arr/<modo>.words.json $BITRANS_WORK/arr/film_<modo>`
4. `node tools/hd_render.cjs .../film_<modo>/film.html .../v_<modo>.mp4`
5. `python3 tools/hd_mix.py <modo>.wav <modo>.words.json v_<modo>.mp4 arr<modo> final.mp4`

Los archivos no se publicaron.
