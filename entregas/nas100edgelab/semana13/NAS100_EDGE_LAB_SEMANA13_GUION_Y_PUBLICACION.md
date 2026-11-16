# NAS100 EDGE LAB · REPORTE SEMANAL #13 · semana del 9 al 13 de noviembre de 2026

Solo los dos trades del brief: **#028** (SELL, domingo 8 nov, 11 p. m. Colombia, continuó en la sesión nocturna del lunes 9) y **#029** (BUY, lunes 9 nov, 10 a. m. Colombia). No se añadió ninguna otra operación del dashboard.

| Archivo | Formato | Duración | Peso |
|---|---|---|---|
| `NAS100_EDGE_LAB_SEMANA13_TIKTOK.mp4` | 1080×1920 · 30 fps · −16 LUFS | 81,5 s | 22,8 MB |
| `NAS100_EDGE_LAB_SEMANA13_SHORTS.mp4` | 1080×1920 · 30 fps · −14 LUFS | 53,2 s | 18,0 MB |
| `NAS100_EDGE_LAB_SEMANA13_PORTADA.jpg` | «SELL + BUY» · «2 DE 2 ESTA SEMANA» · «+202,27 PUNTOS» · «REPORTE #13» | — | — |

## Datos usados (verificados con los comprobantes)
| | #028 SELL | #029 BUY |
|---|---|---|
| Entrada | dom 8 nov · 11 p. m. Colombia | lun 9 nov · 10 a. m. Colombia |
| Entrada / salida del bróker | 27.106,45 → 27.005,00 | 27.673,50 → 27.774,32 |
| Resultado ejecutado | +101,45 pts | +100,82 pts |
| Duración | 1 h 52 min 06 s | 30 min 13 s |
| Lectura | score 6/10 (mínimo 6) · radar Bear +8 / Bull −7 · FAVORABLE SELL · EMA mixta · ATR 89 alto/riesgo | score 8/10 · sobre EMA 21 y EMA 200 · FAVORABLE BUY · ATR 94 alto/riesgo |
| Seguimiento TradingView (no capturado) | 446 a favor · 65 en contra | 351 a favor · 94 en contra |

**Balance de esta muestra:** 2 trades · 2 TP · 0 SL · acierto 2/2 (100 %) · **+202,27 puntos ejecutados** (101,45 + 100,82). No se sumaron resultados monetarios: los comprobantes tienen volúmenes distintos. No se usaron los +100 redondeados del dashboard. En el comprobante, el dinero y el lote van tapados desde el primer cuadro.

## Guion TikTok (locución del Explorador)
El brief completo dura unos 96 s con la voz del Explorador (Kokoro em_alex 0,92). Para quedar cerca de 75 s **sin acelerar la voz**, cuatro frases del brief pasan a **texto en pantalla**:
- «La volatilidad también estaba alta» → chip «LA VOLATILIDAD TAMBIÉN ESTABA ALTA · ATR 94».
- Segunda frase del aprendizaje 1 → «Dos casos para comparar · aún no permite afirmar qué nivel de score funciona mejor».
- Segunda frase del aprendizaje 2 → «Registrar cuánto tarda cada sesión da más contexto que mirar solo si hubo TP».
- Última frase del cierre → «Seguimos registrando las diferencias entre cada decisión. La ventaja se evalúa con muchos trades».

Texto locutado: ver `tools/s13/script.py` (TK). Escenas: gancho con los dos gráficos reales → #028 (gráfico real + comprobante) → #029 (gráfico real + comprobante) → balance «2 TRADES · 2 TP · +202,27» con «Acierto: 2/2 en esta muestra» → 3 aprendizajes, cada uno en su pantalla → cierre «2/2 ESTA SEMANA · No buscamos operaciones perfectas. Buscamos ventaja estadística. · NAS100 EDGE LAB · SEMANA #13».

## Guion Shorts
El texto del brief, textual (`tools/s13/script.py`, SH). Es una edición propia: cada aprendizaje tiene su pantalla y el balance va antes del cierre.

## Texto para publicar
**Título:** Reporte semanal #13: una venta y una compra, 2 de 2 · +202,27 puntos
**Descripción:** Esta semana documentamos dos trades en direcciones opuestas: una venta nocturna con score 6 (+101,45 pts en 1 h 52 min) y una compra de mañana con score 8 (+100,82 pts en 30 min 13 s). Balance de esta muestra: 2 trades, 2 TP, +202,27 puntos ejecutados según los comprobantes del bróker. Es una muestra pequeña: la ventaja se evalúa con muchos trades. Contenido educativo · No es asesoría financiera · Operar implica riesgo de pérdida.
#NAS100 #trading #nasdaq #backtesting #disciplina

## Armado reproducible
1. Voz: `tools/tts_local_any.py 29 0.92 tts/<id>.wav "<texto>"` por frase de `tools/s13/script.py`, y luego `tools/s13/assemble.py` (cadena de voz del Explorador).
2. `python3 tools/build_s13.py` (subtítulos ubicados con `nas_common.align_parts`), y luego `python3 tools/mix_s13.py` y `python3 tools/cover_s13.py`.
3. Desde `s13-tiktok/` y `s13-shorts/`: `npx hyperframes check` (sin errores) y `npx hyperframes render --fps 30 --output ...`.

Los archivos no se publicaron.

## Revisión antes de entregar
- `npx hyperframes check` sin errores en las dos versiones (se corrigieron superposiciones de chips y subtítulos).
- Sin cuadros negros, nada quieto más de 2 s, sin silencios. TikTok −16,2 LUFS · Shorts −14,2 LUFS.
- Whisper sobre el audio final confirma 101,45 y 100,82 y 202,27. «Ciento coma ochenta y dos» del brief se locuta «cien coma ochenta y dos», que es lo correcto en español; en pantalla: 100,82.
- Velas, precios y niveles de las capturas sin alterar; solo encuadre, acercamiento y resaltados encima.
