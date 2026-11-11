# TITÁN · «El gota a gota: el préstamo que te cobra casi 10 veces la tasa legal»

| Archivo | Formato | Duración |
|---|---|---|
| `TITAN_GOTA_A_GOTA_Shorts.mp4` | 1080×1920 · 30 fps · −14,0 LUFS · __SH_MB__ MB | __SH_DUR__ s |
| `TITAN_GOTA_A_GOTA_TikTok.mp4` | 1080×1920 · 30 fps · −14,0 LUFS · __TK_MB__ MB | __TK_DUR__ s |
| `TITAN_GOTA_A_GOTA_Portada.jpg` | primer fotograma: «$1 MILLÓN · SIN PAPELES NI PREGUNTAS», billetes que vuelan y gotas que caen | — |
| `TITAN_GOTA_A_GOTA_Shorts.srt` y `TITAN_GOTA_A_GOTA_TikTok.srt` | subtítulos de 3 palabras sincronizados con la voz final | — |

- **Voz:** Juan (ElevenLabs, eleven_v4), una toma por guion, 1.643 créditos. Mp3 originales en `voz/`; flujo «TITÁN · Gota a gota y Arrendar vs comprar · Narraciones». Pausas recortadas con `tighten.py` (0,32), sin acelerar.
- **Verificación:** Whisper confirma las cifras habladas; sincronía de subtítulos 0,92 (TikTok y Short) sin ventanas desfasadas; QA cuadro por cuadro __QA__.
- **Short ≠ recorte:** el Short va directo al cobro, la usura y la bola; el TikTok agrega cómo funciona (cédula, sin historial, cobrador en moto), qué hacer (bancos, cooperativas, microcréditos) y el cierre «La plata fácil casi nunca sale barata».

## Datos y cálculos (todo verificable)
| Dato | Valor | Fuente / cálculo |
|---|---|---|
| Tasa de usura, crédito de consumo y ordinario, noviembre 2026 | 28,34 % E.A. | Superintendencia Financiera ([Portafolio](https://www.portafolio.co/economia/finanzas/creditos-de-consumo-tendran-nuevo-tope-de-usura-en-noviembre-superfinanciera-lo-certifico-en-28-34-efectivo-anual-505461)) |
| Equivalente mensual de la usura | 2,10 % → ≈ $21.010 por $1.000.000 en un mes | (1,2834)^(1/12) − 1 |
| Ejemplo hipotético del gota a gota | $1.000.000, 30 cuotas diarias de $40.000 = $1.200.000 → $200.000 de intereses (20 % mensual) | Rango típico 20–40 % mensual según [Bancolombia](https://blog.bancolombia.com/educacion-financiera/necesito-dinero-prestamos-gota-gota/) y [Noticias RCN](https://www.noticiasrcn.com/economia/como-funcionan-los-gota-a-gota-el-panorama-de-los-prestamos-impagables-377973) |
| «Casi 10 veces» | 200.000 / 21.010 = 9,5 veces | cálculo TITÁN; [Nubank](https://international.nubank.com.br/es/clientes/colombia-el-gota-a-gota-le-cobra-mas-de-10-veces-la-tasa-de-usura-a-las-personas-y-casi-22-veces-mas-a-las-empresas/) reporta «más de 10 veces» |
| Bola de nieve (hipotético) | 1,2^12 = 8,916 → $8.916.100 en 12 meses | si la deuda sube 20 % cada mes |
| Usura | delito, artículo 305 del Código Penal (Ley 599 de 2000) | — |
| Amenazas / extorsión | GAULA, línea 165 | Policía Nacional |

En pantalla: «EJEMPLO HIPOTÉTICO» visible en cada escena con cifras del ejemplo; «HIPOTÉTICO: LA DEUDA SUBE 20 % CADA MES» en la bola; personas genéricas; nada de marcas ni personas reales.

## Título
**TikTok:** Te prestan $1 millón sin papeles… y terminas pagando casi 10 veces lo legal
**Shorts:** El gota a gota: casi 10 veces la tasa legal 💸

## Descripción (ambas plataformas)
Hicimos la cuenta de un préstamo gota a gota con un ejemplo hipotético: $40.000 diarios por 30 días por un préstamo de $1.000.000. Lo comparamos con la tasa de usura de noviembre de 2026 (28,34 % E.A., Superfinanciera). Cobrar por encima de la usura es delito; si te amenazan, denuncia al GAULA en la línea 165. Contenido educativo; no es una recomendación de inversión.

#finanzaspersonales #gotaagota #Colombia #educacionfinanciera #deudas

## Armado reproducible
1. mp3 → `tighten.py` 0,32 → `$BITRANS_WORK/gota/{tiktok,shorts}_t.wav`
2. `python3 tools/hd_voice.py entregas/titan/gota_a_gota gota` (MAP de cifras en `guiones.py`)
3. `bash tools/hd_build.sh tools/gota/film.js $BITRANS_WORK/gota/<modo>.words.json $BITRANS_WORK/gota/film_<modo>`
4. `node tools/hd_render.cjs .../film_<modo>/film.html .../v_<modo>.mp4` (portada: `--cover`, grilla: `--grid 24`)
5. `python3 tools/hd_mix.py <modo>.wav <modo>.words.json v_<modo>.mp4 got<modo> final.mp4`

Los archivos no se publicaron.
