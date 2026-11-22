# NAS100 EDGE LAB · REPORTE SEMANAL #14 · semana del 16 al 20 de noviembre de 2026

Trades aprobados por Lady y publicados esta semana: **#030, #031, #032 y #033**, los cuatro SELL. No se añadió ninguna otra operación. El guion lo escribió Claude a partir de los guiones aprobados de cada trade, porque esta vez no hubo brief.

| Archivo | Formato | Duración | Peso |
|---|---|---|---|
| `NAS100_EDGE_LAB_SEMANA14_TIKTOK.mp4` | 1080×1920 · 30 fps · −16,2 LUFS | 82,5 s | 25,8 MB |
| `NAS100_EDGE_LAB_SEMANA14_SHORTS.mp4` | 1080×1920 · 30 fps · −14,2 LUFS | 51,0 s | 20,0 MB |
| `NAS100_EDGE_LAB_SEMANA14_PORTADA.jpg` | «4 VENTAS» · «4 DE 4 ESTA SEMANA» · «+405,00 PUNTOS» · «REPORTE #14» | — | — |

## Datos usados (comprobantes del bróker)
| | #030 | #031 | #032 | #033 |
|---|---|---|---|---|
| Decisión (Colombia) | dom 15 nov · 11 p. m. | lun 16 nov · 10 a. m. | lun 16 nov · 11 p. m. | mar 17 nov · 10 a. m. |
| Bróker | 27.822,50 → 27.720,85 | 27.476,30 → 27.376,35 | 27.330,30 → 27.226,60 | 27.261,55 → 27.161,85 |
| Resultado ejecutado | +101,65 pts | +99,95 pts | +103,70 pts | +99,70 pts |
| Duración | 1 h 10 min 08 s | 4 min 54 s | 2 h 17 min 27 s | 5 min 43 s |
| Score | 6/10 (mínimo) | 9/10 | 7/10 | 7/10 |
| Lectura | radar empatado Bull +1 / Bear +1 · bajo EMA 21 y 200 · FAVORABLE SELL | Bear +9 / Bull −6 · bajo EMA 21 y 200 · FAVORABLE SELL | Bear +6 / Bull −5 · EMA mixta · FAVORABLE SELL | Market Alignment +2 · Alpha Radar Bull −3 · FAVORABLE SELL |

**Balance de esta muestra:** 4 trades · 4 TP · 0 SL · acierto 4/4 · **+405,00 puntos ejecutados** (101,65 + 99,95 + 103,70 + 99,70). No se suman resultados monetarios. Los recorridos de sesión (392, 300 y 654 a favor) no se suman: incluyen lo que pasó después de cada TP. En los cuatro comprobantes, el lote, el dinero y el Δ/% van tapados desde el primer cuadro con las mismas tapas aprobadas de cada trade; en la portada no aparecen.

## Guion TikTok (voz A del Explorador)
- Cuatro ventas en una semana, y las cuatro llegaron al Take Profit.
- Pero dos tardaron horas, y dos, menos de seis minutos.
- Domingo, 11 de la noche: score 6, justo en el mínimo, con el radar empatado.
- 101,65 puntos en 1 hora y 10 minutos.
- Lunes, 10 de la mañana: score 9, la lectura más fuerte de la semana.
- 99,95 puntos en 4 minutos y 54 segundos.
- Lunes, 11 de la noche: score 7, con las medias mixtas.
- 103,70 puntos en 2 horas y 17 minutos.
- Martes, 10 de la mañana: otra vez score 7.
- 99,70 puntos en 5 minutos y 43 segundos.
- Balance: cuatro trades, cuatro Take Profits y 405 puntos ejecutados.
- Uno: scores de 6 a 9 llegaron al objetivo. Con cuatro casos, no sabemos cuál funciona mejor.
- Dos: las ventas de las 10 de la mañana tardaron minutos; las nocturnas, horas. Todavía no es una regla.
- Tres: el objetivo era de 100 puntos, y se ejecutó entre 99,70 y 103,70. Cuenta el dato ejecutado.
- Cuatro de cuatro en una muestra pequeña. No buscamos operaciones perfectas. Buscamos ventaja estadística.

## Guion Shorts
- Cuatro ventas esta semana, y cuatro Take Profits.
- Domingo en la noche, score 6: 101,65 puntos en 1 hora y 10.
- Lunes a las 10, score 9: 99,95 en menos de 5 minutos.
- Lunes en la noche, score 7: 103,70 en 2 horas y 17.
- Martes a las 10, score 7: 99,70 en 5 minutos y 43 segundos.
- Balance: cuatro trades, cuatro TP y 405 puntos ejecutados.
- Tres apuntes: el score respaldó cada entrada, pero no garantiza el resultado.
- Las ventas de la mañana fueron mucho más rápidas, aunque todavía no es una regla.
- Y en la bitácora cuenta el dato ejecutado, no el objetivo redondo.
- Buscamos ventaja estadística.

## Texto para publicar
**Título:** Reporte semanal #14: 4 ventas, 4 de 4 · +405,00 puntos

**Descripción:** Esta semana documentamos cuatro ventas en el NAS100: dos nocturnas (1 h 10 min y 2 h 17 min) y dos a las 10 de la mañana (4 min 54 s y 5 min 43 s). Scores de 6 a 9, las cuatro en Take Profit. Balance de esta muestra: +405,00 puntos ejecutados según los comprobantes del bróker. Es una muestra pequeña: la ventaja se evalúa con muchos trades. Contenido educativo · No es asesoría financiera · Operar implica riesgo de pérdida.
#NAS100 #trading #nasdaq #backtesting #disciplina

## Armado reproducible
1. Voz: `tools/tts_local_any.py 29 0.92 tts/<id>.wav "<texto>"` por frase de `tools/s14/script.py`, y luego `tools/s14/assemble.py` en `$BITRANS_WORK/s14`.
2. `python3 tools/build_s14.py` (reutiliza los resaltados y las tapas de `build_t030.py` a `build_t033.py`), `python3 tools/mix_s14.py` y `python3 tools/cover_s14.py`.
3. Desde `s14-tiktok/` y `s14-shorts/`: `npx -y hyperframes@0.8.134 check` y `npx -y hyperframes@0.9.64 render --fps 30 --output ...`.

## Revisión antes de entregar
- `hyperframes check` sin errores en las dos versiones; se corrigieron dos notas que chocaban con los subtítulos.
- `qa_video`: sin cuadros negros, nada quieto más de 2 s y sin silencios. TikTok −16,2 LUFS y Shorts −14,2 LUFS.
- Los cuatro comprobantes se revisaron cuadro a cuadro: el lote, el dinero y el Δ/% siguen tapados.
- Whisper confirma 101,65, 99,95, 103,70 y 99,70 en la voz.
- Las velas, los precios y los niveles de las capturas no se alteraron.

Los archivos no se publicaron.
