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

## V2 · Piezas de animación (16), recibidas el 20 oct 2026
Carpeta `V2/`. Codex reporta 0 píxeles cambiados fuera de la máscara, y mi comparación propia contra cada base lo confirma: solo cambian los ojos, la cabeza o las manos, según la pieza.

| Pieza | Uso |
|---|---|
| `titan_neutral_ojos_entrecerrados` / `_ojos_cerrados` | Parpadeo de la neutral: entrecerrados → cerrados → entrecerrados (≈ 0,25 s) cada 3–4 s |
| `titan_explicando_ojos_cerrados`, `titan_pensativo_ojos_cerrados` | Parpadeo en explicando y pensativo |
| `titan_explica_v2_1…3` | Manos en bucle mientras explica: 1 → 2 → 1 → 3, unos 0,6 s por imagen con fundido de 0,15 s |
| `titan_asiente_v2_1…3` | Asentir: 1 → 2 → 3 → 2 → 1. La cabeza queda algo más derecha que en la neutral, así que se entra y se sale con fundido corto |
| `titan_t_senala`, `titan_t_pensativo`, `titan_t_pulgar` | Transición desde la neutral hacia señalar, pensativo o pulgar (0,15–0,2 s por paso) |
| `titan_oficina_vacia` (vertical) | Fondo de oficina **sin logo**, para componer las poses transparentes. El logo oficial se pone encima en el video |
| `titan_oficina_neutral_sin_logo`, `titan_oficina_explicando_sin_logo` | Fotos completas en la oficina, sin logo inventado. **Reemplazan al bloque J** |

**Usado por primera vez en:** «El mundo en una caja» (20 oct 2026): parpadeo, manos al explicar, asentir, transición antes de señalar y de pensar, y la oficina como fondo del recuadro del avatar.
