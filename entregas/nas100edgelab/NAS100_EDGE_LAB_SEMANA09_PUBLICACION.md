# NAS100 EDGE LAB · Reporte semanal #9 · Publicación multiplataforma

Trades #023 y #024 · semana del 11 al 16 de octubre de 2026.

## Archivos

| Versión | Video | Portada | Duración |
|---|---|---|---|
| TikTok | `NAS100_EDGE_LAB_SEMANA09_TIKTOK.mp4` | `NAS100_EDGE_LAB_SEMANA09_TIKTOK_PORTADA.jpg` | 1:28 (88,4 s) |
| YouTube Shorts | `NAS100_EDGE_LAB_SEMANA09_SHORTS.mp4` | `NAS100_EDGE_LAB_SEMANA09_SHORTS_PORTADA.jpg` | 0:46 (46,0 s) |

El TikTok es la versión dinámica ya aprobada, sin cambios: es una copia idéntica byte a byte de `NAS100EDGELAB_Semana09_Trades023-024_2026-10-11_a_2026-10-16.mp4`.

---

## TikTok

**Título:** Una pérdida, una ganancia y +2,15 puntos netos | Semana #9

**Descripción:**
> Una pérdida, una ganancia y un balance prácticamente neutro.
>
> Los trades #023 y #024 cerraron con −100,55 y +102,70 puntos: +2,15 puntos netos entre ambas ejecuciones. Un BUY con Score 8 terminó en stop y un SELL con Score 6 alcanzó el objetivo.
>
> Seguimos documentando sin convertir dos resultados en una regla. Sigue la bitácora para ver el siguiente trade.
>
> Contenido educativo. No es asesoría financiera. Operar implica riesgo de pérdida.

**Hashtags:** #NAS100 #Trading #BitacoraDeTrading

**Miniatura recomendada:** `NAS100_EDGE_LAB_SEMANA09_TIKTOK_PORTADA.jpg`. Muestra «Una pérdida. Una ganancia. ¿Qué nos dejaron?» con los dos gráficos reales (#023 LOSS / #024 WIN) y el avatar.

---

## YouTube Shorts

**Título:** La operación con mejor Score perdió. ¿Qué pasó? | NAS100 EDGE LAB

**Descripción:**
> Score 8 terminó en pérdida (−100,55 puntos). Score 6 terminó en ganancia (+102,70 puntos). Balance semanal: +2,15 puntos netos.
>
> La calidad de una señal y el resultado de una operación no son lo mismo, y con solo dos trades todavía no hay una regla.
>
> NAS100 EDGE LAB es un laboratorio de TITÁN HOLDING. Sigue la bitácora para ver el siguiente trade.
>
> Contenido educativo. No es asesoría financiera. Operar implica riesgo de pérdida.

**Hashtags:** #NAS100 #Trading #Shorts

**Miniatura recomendada:** `NAS100_EDGE_LAB_SEMANA09_SHORTS_PORTADA.jpg`. Muestra «Score 8 perdió. Score 6 ganó. ¿Qué pasó?» con los gráficos reales y el avatar pensativo. Shorts toma la miniatura de un cuadro del video; si la app permite escoger, usar el cuadro de 0:05, que es el gancho con los dos gráficos.

**Lista de reproducción:** «NAS100 EDGE LAB · Reportes semanales». Si se prefiere una sola lista, usar «NAS100 EDGE LAB · Bitácora».

**Video relacionado:** vincular el Short del trade #024 cuando se publique; mientras tanto, el del #023. Así quien vea el contraste puede ir al detalle de cada operación.

---

## Datos verificados (contra MT5 y el journal)

| Dato | Valor | Fuente |
|---|---|---|
| #023 | BUY · 31043,60 → 30943,05 = **−100,55 puntos** · STOP LOSS | Comprobante MT5 |
| #024 | SELL · 30786,80 → 30684,10 = **+102,70 puntos** · TAKE PROFIT | Comprobante MT5 |
| Balance | −100,55 + 102,70 = **+2,15 puntos netos** | Cálculo |
| Score | #023 = 8 → LOSS · #024 = 6 → WIN | Journal |

- Los gráficos son las capturas reales de TradingView; no hay velas fabricadas.
- Todo se comunica en puntos. El Short aclara «no son dólares ni rentabilidad de cuenta» y no muestra dinero.
- El resultado no se presenta como recuperación: se dice «sumamos».
- La voz final se transcribió con Whisper y coincide frase por frase con el guion.

## Diferencias entre versiones

| | TikTok | Shorts |
|---|---|---|
| Edición | Historia completa de la semana | Edición nueva e independiente |
| Duración | 88,4 s | 46,0 s |
| Gancho | «Una pérdida. Una ganancia.» | «La operación con mejor Score perdió. La de menor Score ganó. ¿Qué pasó?» con los gráficos desde el segundo 0 |
| Contenido | Ambos trades, duraciones y tres conclusiones | Resultados, hallazgo (Score 8 vs. 6) y **una** lección |
| Voz | Sin narración: textos en pantalla, versión previa a la aprobación de la voz | Voz A del «Explorador» con subtítulos sincronizados |
| Avatar | Poses y burbujas | Seis poses según el momento y visor que pulsa con la voz |
| Música | Pista original «sem09b» | Pista original «short09», distinta, con ducking bajo la voz |
| Sonoridad | −16,9 LUFS | −14,5 LUFS (estándar YouTube) |
| Cierre | CTA «Sigue la bitácora…» | «Esto es NAS100 EDGE LAB, un laboratorio de TITÁN HOLDING» (el CTA va en la descripción) |
| Zona de datos | y 180–1500 | y 290–1000; libres la parte baja y el lado derecho para la interfaz de Shorts |

Si quieres, hago una versión narrada del TikTok con la voz A. Sería la V2, y la V1 se queda como está.

## Archivos maestros reutilizables

Guardados en el área de trabajo de la sesión; se regeneran con el script.

- `shorts09/tts/`: narración por frases (f1…f13, g1…g8), `narr_A.wav` (40,75 s) y `narr_times.json`.
- `tools/build_shorts09.py`: genera la composición del Short (escenas, subtítulos, poses y glow del visor).
- `tools/bed_music.py` con la variante `short09`, y `tools/sfx_mix.py` para los efectos.
- `shorts09-cover/index.html`: portada editable.
- Las poses del avatar están en `entregas/nas100edgelab/avatar/`.

## Checklist de QC

Shorts:
- [x] Duración 46,0 s (rango 35–60 s).
- [x] 1080 × 1920, 30 fps, H.264 + AAC.
- [x] Sonoridad −14,5 LUFS.
- [x] Voz A transcrita con ASR; coincide con el guion.
- [x] Subtítulos sincronizados por frase y sin pisar datos (revisión de layout de HyperFrames: 0 errores).
- [x] Datos en la zona segura de Shorts; avatar abajo a la izquierda, sin tapar datos.
- [x] Cifras verificadas; puntos ≠ dólares.
- [x] Disclaimer en pantalla al cierre.
- [x] TITÁN HOLDING solo como identificación.
- [x] Sin marca de agua de TikTok.
- [x] Música original, distinta a la del TikTok.
- [x] Portada sin dinero.

TikTok:
- [x] Sin modificar; idéntico al aprobado.
- [x] 88,4 s (≤ 1:30), −16,9 LUFS.
- [x] Portada sin dinero.
