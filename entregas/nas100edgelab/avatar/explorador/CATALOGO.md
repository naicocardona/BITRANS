# Explorador · Catálogo de la biblioteca NAS100 EDGE LAB

88 piezas del mismo personaje en 8 bloques. Recibidas el 19 oct 2026 (PARTE_01 a PARTE_06).

## Formato en este repositorio
- **WebP con transparencia, 640 × 640** (reducido desde los PNG originales de 1024 × 1024). Mismo lienzo para todas, así que las secuencias y los ojos quedan alineados fotograma a fotograma.
- Los PNG originales de 1024 × 1024 están en los ZIP; úsalos si un video necesita el avatar a más de 640 px.
- `catalogo.json` guarda, por pieza y en píxeles del WebP de 640, la caja del personaje (`bbox`) y el centro de la capucha (`capucha_cx`), para alinear los cambios de pose sin saltos.
- `lamina_A.jpg` … `lamina_H.jpg` son las láminas de contacto, solo para revisar.

## Revisión técnica
- Las 88 piezas tienen fondo 100 % transparente (esquinas con alfa 0), sin halo blanco apreciable.
- Bloques G y H: la caja del personaje coincide en todos los fotogramas (±2 px), así que se pueden animar.
- `avatar_secreto`, `avatar_primerisimo` y `avatar_sentado_pensativo` llegan al borde inferior del lienzo. Al usarlos, ubica ese borde fuera de cuadro o bajo otro elemento.
- Son ilustraciones generadas, no un modelo 3D: entre fotogramas de una secuencia puede variar levemente la textura. Revisa la animación al tamaño final.

## A · Presentación y transiciones

| Pieza | Descripción |
|---|---|
| `A/avatar_bienvenida.webp` | abre los brazos a media altura, gesto de «bienvenidos». |
| `A/avatar_brazos_cruzados.webp` | brazos cruzados, postura firme. |
| `A/avatar_capucha.webp` | se ajusta la capucha con ambas manos. |
| `A/avatar_espalda.webp` | de espaldas, mirando hacia atrás por encima del hombro (salida o misterio). |
| `A/avatar_perfil_der.webp` | de perfil mirando a la derecha. |
| `A/avatar_perfil_izq.webp` | de perfil mirando a la izquierda. |
| `A/avatar_reverencia.webp` | inclina levemente la cabeza con una mano en el pecho (agradecimiento al cierre). |
| `A/avatar_saludo.webp` | saluda con una mano a la altura del hombro. |
| `A/avatar_tres_cuartos.webp` | girado tres cuartos hacia la derecha, mirando al frente. |

## B · Señalar y dirigir la atención

| Pieza | Descripción |
|---|---|
| `B/avatar_circula.webp` | dibuja un círculo en el aire con el índice, como resaltando algo. |
| `B/avatar_dos_manos_senalan.webp` | ambas manos señalan hacia el mismo lado (énfasis fuerte). |
| `B/avatar_presenta_arriba.webp` | palma abierta hacia arriba y al lado, como mostrando un titular. |
| `B/avatar_presenta_derecha.webp` | palma abierta hacia la derecha, presentando algo. |
| `B/avatar_senala_abajo.webp` | índice hacia abajo y al frente. |
| `B/avatar_senala_arriba.webp` | índice hacia arriba en diagonal. |
| `B/avatar_senala_camara.webp` | señala directo a la cámara (al espectador). |
| `B/avatar_senala_izquierda.webp` | índice hacia la izquierda. |

## C · Analizar datos y trabajar

| Pieza | Descripción |
|---|---|
| `C/avatar_balanza_objeto.webp` | sostiene una balanza de platillos pequeña y equilibrada. |
| `C/avatar_calculadora.webp` | usa una calculadora de bolsillo (sin números visibles). |
| `C/avatar_cartel.webp` | sostiene un cartel rectangular en blanco con ambas manos (para poner texto encima en el video). |
| `C/avatar_cronometro.webp` | sostiene un cronómetro de mano. |
| `C/avatar_laptop.webp` | teclea en una laptop vista de lado (pantalla sin contenido legible). |
| `C/avatar_libreta.webp` | escribe en una libreta o bitácora. |
| `C/avatar_lupa.webp` | sostiene una lupa frente al visor. |
| `C/avatar_portapapeles.webp` | revisa un portapapeles con una hoja de checklist genérica. |
| `C/avatar_regla.webp` | sostiene una regla o cinta métrica, como midiendo (para «medir bien el recorrido»). |
| `C/avatar_reloj.webp` | mira un reloj de pulsera. |
| `C/avatar_tablet.webp` | sostiene una tablet con un gráfico de velas genérico y la mira. |
| `C/avatar_tablet_muestra.webp` | gira la tablet hacia la cámara para mostrarla (pantalla en blanco o con velas genéricas). |
| `C/avatar_tarjeta.webp` | sostiene una tarjeta pequeña en blanco a la altura del pecho (para mostrar una cifra encima). |

## D · Reacciones sobrias al resultado

| Pieza | Descripción |
|---|---|
| `D/avatar_alto.webp` | mano levantada con la palma al frente (alto / precaución / riesgo). |
| `D/avatar_aplauso_suave.webp` | aplaude suave con las manos juntas a la altura del pecho (reconocer el proceso, no la ganancia). |
| `D/avatar_asiente.webp` | asiente levemente, ojos entrecerrados de aprobación. |
| `D/avatar_cara_mano.webp` | cubre parcialmente el visor con una mano (error de lectura, sin exagerar). |
| `D/avatar_hombros.webp` | se encoge de hombros con las palmas arriba. |
| `D/avatar_mano_corazon.webp` | mano en el pecho, ojos tranquilos (gratitud con la comunidad). |
| `D/avatar_niega.webp` | mueve el índice de lado a lado, gesto de «no, no» (para desmentir un mito). |
| `D/avatar_nuca.webp` | mano en la nuca, ojos inclinados (STOP LOSS sobrio). |
| `D/avatar_pulgar.webp` | pulgar arriba discreto, ojos levemente sonrientes (TAKE PROFIT moderado). |
| `D/avatar_sorprendido.webp` | ojos más grandes, manos ligeramente levantadas (dato grande, como un MAE alto). |
| `D/avatar_suspiro.webp` | hombros caídos, ojos medio cerrados, gesto de «bueno, sigue» (pérdida aceptada). |

## E · Explicar conceptos

| Pieza | Descripción |
|---|---|
| `E/avatar_balanza.webp` | palmas arriba a distinta altura, como una balanza (comparar). |
| `E/avatar_cinco.webp` | mano abierta con cinco dedos. |
| `E/avatar_cuatro.webp` | cuatro dedos levantados. |
| `E/avatar_dos.webp` | dos dedos levantados (conclusión 2). |
| `E/avatar_grande.webp` | manos separadas mostrando algo grande. |
| `E/avatar_idea.webp` | índice levantado junto al visor, ojos más brillantes (idea o dato clave). |
| `E/avatar_pequeno.webp` | índice y pulgar casi juntos, gesto de «muy poquito» (para «casi en cero»). |
| `E/avatar_pregunta.webp` | una mano abierta hacia arriba y la cabeza ladeada (pregunta al espectador). |
| `E/avatar_secreto.webp` | mano al costado del visor, como contando algo en confianza. |
| `E/avatar_silencio.webp` | índice frente al visor, gesto de «silencio / atención». |
| `E/avatar_tres.webp` | tres dedos levantados (conclusión 3). |
| `E/avatar_uno.webp` | un dedo levantado (conclusión 1). |

## F · Escenas completas (otro encuadre)

| Pieza | Descripción |
|---|---|
| `F/avatar_cuerpo_entero.webp` | cuerpo completo de pie, postura neutral (para entradas caminando). |
| `F/avatar_cuerpo_entero_camina.webp` | cuerpo completo en pleno paso, de perfil hacia la derecha. |
| `F/avatar_escritorio.webp` | plano medio sentado ante un escritorio con dos monitores. Las pantallas muestran velas genéricas sin números, vistas de tres cuartos. |
| `F/avatar_escritorio_espalda.webp` | el mismo escritorio visto desde atrás del avatar, monitores encendidos. |
| `F/avatar_primerisimo.webp` | primerísimo plano del visor y la capucha (para cortes de impacto). |
| `F/avatar_sentado_pensativo.webp` | sentado en un banco, codo en la rodilla y mano en el mentón. |

## G · Secuencias para animar

| Pieza | Descripción |
|---|---|
| `G/seq_asiente_1.webp` | Asentir (cabeza arriba, abajo, arriba) · fotograma 1 |
| `G/seq_asiente_2.webp` | Asentir (cabeza arriba, abajo, arriba) · fotograma 2 |
| `G/seq_asiente_3.webp` | Asentir (cabeza arriba, abajo, arriba) · fotograma 3 |
| `G/seq_escribe_1.webp` | Escribir (bolígrafo en dos posiciones) · fotograma 1 |
| `G/seq_escribe_2.webp` | Escribir (bolígrafo en dos posiciones) · fotograma 2 |
| `G/seq_mira_centro.webp` | Mirar alrededor (solo giran la cabeza y el visor) · fotograma centro |
| `G/seq_mira_der.webp` | Mirar alrededor (solo giran la cabeza y el visor) · fotograma der |
| `G/seq_mira_izq.webp` | Mirar alrededor (solo giran la cabeza y el visor) · fotograma izq |
| `G/seq_niega_1.webp` | Negar (cabeza izquierda, centro, derecha) · fotograma 1 |
| `G/seq_niega_2.webp` | Negar (cabeza izquierda, centro, derecha) · fotograma 2 |
| `G/seq_niega_3.webp` | Negar (cabeza izquierda, centro, derecha) · fotograma 3 |
| `G/seq_saludo_1.webp` | Saludo (mano izquierda, centro, derecha) · fotograma 1 |
| `G/seq_saludo_2.webp` | Saludo (mano izquierda, centro, derecha) · fotograma 2 |
| `G/seq_saludo_3.webp` | Saludo (mano izquierda, centro, derecha) · fotograma 3 |
| `G/seq_senala_1.webp` | Señalar con énfasis (brazo recogido → extendido) · fotograma 1 |
| `G/seq_senala_2.webp` | Señalar con énfasis (brazo recogido → extendido) · fotograma 2 |
| `G/seq_teclea_1.webp` | Teclear (dedos alternando) · fotograma 1 |
| `G/seq_teclea_2.webp` | Teclear (dedos alternando) · fotograma 2 |

## H · Estados de ojos (sobre la pose neutral)

| Pieza | Descripción |
|---|---|
| `H/ojos_abiertos.webp` | ojos normales. |
| `H/ojos_aburrido.webp` | ojos como líneas horizontales a media altura. |
| `H/ojos_brillo.webp` | brillo más intenso con un halo violeta suave. |
| `H/ojos_cerrados.webp` | ojos como líneas finas. |
| `H/ojos_entrecerrados.webp` | ojos a la mitad. |
| `H/ojos_mira_der.webp` | ojos desplazados hacia un lado. |
| `H/ojos_mira_izq.webp` |  |
| `H/ojos_sonrisa.webp` | ojos en arco, sonrisa suave. |
| `H/ojos_sorpresa.webp` | ojos redondos y más grandes. |
| `H/ojos_sospecha.webp` | un ojo entrecerrado y el otro normal. |
| `H/ojos_triste.webp` | ojos inclinados hacia abajo. |

## Reglas de uso
Consulta la tabla «Poses según el momento» en la sección 4 del prompt maestro. En resumen:
- Siempre abajo a la izquierda, sin tapar datos ni subtítulos. El bloque F va solo en escenas propias.
- No uses gestos de euforia para las ganancias ni dramatices las pérdidas. El aplauso reconoce el proceso, nunca la ganancia.
- Las pantallas, tablets y carteles son decorativos o sirven para poner texto encima. Nunca reemplazan las capturas reales.
- La voz del avatar es la **A · Mentor**, aprobada el 17 oct 2026. El LEEME del ZIP dice «no se ha aprobado una voz»; eso quedó desactualizado.

## V3 · Fotogramas de animación (20 + bases), recibidos el 19 oct 2026
Carpeta `V3/`, WebP de 640 × 640 en el mismo lienzo que su pose base. **Bases** en `V3/bases/`: las 6 poses originales en lienzo 1024 y `fin_nuca` / `fin_pulgar`, ajustadas por Codex.

**Verificación propia:**
- Fuera de la zona que se mueve, los parpadeos, «habla», «señala» y «piensa» son idénticos píxel por píxel a su base. Cambian entre 0,9 % y 14 % del lienzo, solo donde corresponde.
- Los fotogramas del giro venían más pequeños que el resto (unos 25 %). Los reescalé (× 1,266, con la base anclada) para que calcen con la pose neutral.
- `prueba_animacion_V3.mp4` muestra todas las secuencias animadas.

| Secuencia | Orden | Nota |
|---|---|---|
| Parpadeo | base → `*_ojos_cerrados` (≈ 4 fotogramas a 30 fps) → base, cada 3–5 s | Para explica, senala, pensativo, satisfecho y preocupado. `pulgar_ojos_cerrados` calza con `D/avatar_pulgar` de la biblioteca |
| Hablando | `habla_1` → `habla_2` → `habla_1` → `habla_3`, en bucle a ≈ 7 fps | Mientras narra con la pose «explica» |
| Señalar | neutral → `senala_t1` → `senala_t2` → senala | Con un pequeño rebote al final |
| STOP LOSS | neutral → `sl_t1` → `sl_t2` (sostener) → **preocupado** | Recomendado: misma familia, sin salto. Terminar en `fin_nuca` produce un salto de escala y estilo |
| TAKE PROFIT | neutral → `tp_t1` → `tp_t2` → **satisfecho** | Recomendado. `fin_pulgar` también funciona con un fundido de 0,2 s, pero con salto |
| Pensar | neutral → `piensa_t1` → pensativo ↔ `piensa_t2` | |
| Girar y salir | neutral → `gira_1` → `gira_2` → `gira_3` → sale por abajo | Ya reescalado |
