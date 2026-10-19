# Avatar TITÁN HOLDING · Biblioteca (uso exclusivo de TITÁN)

> **Solo para videos explicativos de TITÁN HOLDING.** Nunca en NAS100 EDGE LAB, LUKAS, NUVA ni otro proyecto. El avatar de NAS100 es el «Explorador», en `entregas/nas100edgelab/avatar/`. No se mezclan.
>
> Es un rostro real: **nunca se tapa, se deforma ni se recorta la cara**, y no se le pone texto ni gráficos encima.

87 piezas en bloques A–J, recibidas el 19 oct 2026, generadas con Codex a partir del ancla aprobada.

## Formato en este repositorio
- WebP de 768 × 768 (reducidos desde los PNG de 1024). A–I tienen transparencia; J tiene fondo de oficina.
- El cuerpo toca el borde inferior del lienzo (y = 1023): se ubica pegado al borde inferior del cuadro o de un panel.
- `lamina_A.jpg` … `lamina_J.jpg` sirven para revisar. `LEEME_codex.md` e `inventario_A_J.csv` son el informe de Codex.

## Revisión (19 oct 2026)
| Bloque | Estado | Uso |
|---|---|---|
| A · Presentación (8) | Buen parecido y escala coherente | Poses principales |
| B · Señalar (8) | Bien | Destacar datos |
| C · Pensar / explicar (9) | Bien | Explicaciones |
| D · Reacciones (10) | Bien | Reacciones sobrias |
| E · Contar (5) | Bien. `uno` = `idea`, `cinco` = `saludo` | Listas de puntos |
| F · Objetos (10) | Bien. `titan_cartel` tiene restos claros en el borde del papel | Revisar sobre el fondo final |
| G · Escritorio / cuerpo / primer plano (8) | Bien, con otro encuadre | Escenas propias, no en la esquina |
| H · Secuencias (14) | **Cambia todo el cuerpo entre fotogramas** (7–11 %), no solo lo que se mueve | Usar con fundidos de 0,15–0,25 s, no como corte seco cuadro a cuadro |
| I · Microexpresiones (10) | **Excelente:** solo cambia el rostro (3–4 % respecto a la neutral) | Reacciones con fundido sobre la neutral. `mira_izq` / `mira_der` giran algo la cabeza |
| J · Oficina (5) | **El emblema y el texto «TITÁN HOLDING» de la pared los inventó el generador; no son el logo oficial** | **No usar** mientras tengan ese logo (regla: nunca redibujar el logo) |

## Cómo se anima una persona real
- **Sí:** cambio de pose con fundido corto (0,2 s) y leve escala; respiración en código (escala ≈ 0,8 %); reacciones del bloque I con fundido sobre la neutral; entrada y salida con desplazamiento.
- **Con cuidado:** las secuencias H, siempre con fundido entre fotogramas.
- **No:** mover la boca con imágenes sueltas para simular que habla; giros o caminata cuadro a cuadro.
