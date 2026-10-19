# Prompt para Codex · Explorador: 20 fotogramas de animación (v3)

Copia todo lo que está debajo de la línea y pégalo en Codex, **en la misma conversación o proyecto donde creó la biblioteca `NAS100_EXPLORADOR`**. No hace falta adjuntar nada: Codex ya tiene la lámina original y todas las imágenes que generó. Si abres una conversación nueva y no las encuentra, adjúntale la lámina original y los archivos de la sección «Material de referencia».

Si no puede hacerlo todo de una vez, pídeselo por bloques (A, B, C…).

---

Crea **20 fotogramas de animación** del **mismo personaje**: el «Explorador» de NAS100 EDGE LAB, cuya biblioteca de 88 poses tú mismo generaste en la carpeta `NAS100_EXPLORADOR/`. Estos fotogramas no son poses nuevas: son **movimientos intermedios y variantes de ojos** de poses que ya existen, para animarlas en video vertical (el avatar aparece abajo a la izquierda y narra con voz).

## Material de referencia (ya lo tienes, no lo vuelvas a generar)
- **Lámina original de las 6 poses** que usaste como referencia para la biblioteca: neutral (manos juntas), pensativo, explicando, señalando, satisfecho y preocupado. Estas son las «poses base» de este encargo.
- `NAS100_EXPLORADOR/D/avatar_pulgar.png`
- `NAS100_EXPLORADOR/D/avatar_nuca.png`
- `NAS100_EXPLORADOR/A/avatar_espalda.png`
- `NAS100_EXPLORADOR/A/avatar_tres_cuartos.png`
- `NAS100_EXPLORADOR/H/ojos_cerrados.png`
- Usa también como guía las secuencias que ya hiciste en `NAS100_EXPLORADOR/G/`: misma técnica de edición sobre la referencia para que los fotogramas calcen.

## Reglas de consistencia (obligatorias en TODAS las imágenes)
- **Personaje idéntico:**
  - Capucha gris oscuro con interior violeta brillante.
  - Visor violeta liso con dos ojos blancos luminosos; los ojos son su única expresión, sin boca.
  - Chaqueta gris oscuro con detalles verde turquesa en hombros y cuello.
  - Guantes oscuros y camiseta negra.
  - Mismo estilo 3D, texturas y luz de borde violeta y turquesa.
- **Fondo 100 % transparente** (PNG con alfa real), sin halo blanco, sin sombra pegada al borde ni piso dibujado.
- **Formato:** 1024 × 1024 px, busto desde la cintura hacia arriba, el corte inferior recto y sin tocar el borde del lienzo.
- **REGLA CLAVE PARA ANIMAR:** cada fotograma parte de su **pose base** y debe coincidir con ella **en todo lo que no se mueve**:
  - misma posición del cuerpo en el lienzo, misma escala y mismo tamaño de cabeza;
  - misma altura del corte inferior, misma luz y mismas texturas.
  - Solo cambia lo que se indica (ojos, un brazo, la cabeza). Si superponemos el fotograma sobre su pose base, lo que no se mueve debe calzar exactamente, sin saltos.
- **Tono:** serio, educativo y cercano. **Prohibido:** euforia, festejos, billetes, monedas, cohetes, gestos de dinero, burla o dramatismo exagerado.
- Nombra cada archivo exactamente como se indica.

## A · Ojos cerrados sobre las poses más usadas (6), para que parpadee en cualquier momento
Copia exacta de la pose base. Cambia **solo los ojos**: dos líneas finas y luminosas, iguales a las de `ojos_cerrados.png`.
1. `explica_ojos_cerrados.png`: base «explicando», manos abiertas.
2. `senala_ojos_cerrados.png`: base «señalando».
3. `pensativo_ojos_cerrados.png`: base «pensativo», mano en el mentón.
4. `satisfecho_ojos_cerrados.png`: base «satisfecho».
5. `preocupado_ojos_cerrados.png`: base «preocupado».
6. `pulgar_ojos_cerrados.png`: base `avatar_pulgar.png`.

## B · «Hablando» en bucle (3), base «explicando»
Movimientos pequeños de las manos, como quien explica con calma. Cuerpo, cabeza y capucha quietos.
7. `habla_1.png`: igual a la pose base (manos abiertas a media altura).
8. `habla_2.png`: la mano derecha sube unos centímetros y gira levemente la palma hacia arriba; la izquierda no se mueve.
9. `habla_3.png`: la mano izquierda sube unos centímetros y se abre un poco más; la derecha vuelve a la posición base.

Uso: 1 → 2 → 1 → 3 en bucle mientras narra.

## C · Señalar en 3 tiempos (2), base «señalando»
El fotograma final ya existe (la pose «señalando»).
10. `senala_t1.png`: brazo recogido junto al pecho y el índice empezando a levantarse; la mirada ya va hacia el lado al que señalará.
11. `senala_t2.png`: brazo a medio camino, a unos 45° de extensión.

Uso: t1 → t2 → pose «señalando», con un pequeño rebote al final.

## D · STOP LOSS en 3 tiempos (2), para terminar en `avatar_nuca.png`
12. `sl_t1.png`: pose neutral (manos juntas), cabeza levemente girada y ojos mirando hacia arriba a la derecha, como leyendo un dato.
13. `sl_t2.png`: una mano empieza a subir hacia la nuca (a la altura del hombro) y los ojos se inclinan un poco hacia abajo.

Uso: t1 → t2 → `avatar_nuca.png`. Reacción sobria: «pasa, sigue», sin drama.

## E · TAKE PROFIT en 3 tiempos (2), para terminar en `avatar_pulgar.png`
14. `tp_t1.png`: pose neutral, ojos mirando hacia arriba a la derecha, como leyendo un dato.
15. `tp_t2.png`: asiente apenas (cabeza un poco más abajo); la mano derecha empieza a cerrarse en puño a la altura de la cintura.

Uso: t1 → t2 → `avatar_pulgar.png`. Satisfacción moderada, nunca celebración.

## F · Pensar en 2 tiempos (2), para terminar en la pose «pensativo»
16. `piensa_t1.png`: pose neutral con una mano subiendo hacia el mentón, a la altura del pecho.
17. `piensa_t2.png`: igual a la pose «pensativo», pero con la cabeza ladeada levemente a la izquierda y un ojo un poco entrecerrado.

Uso: t1 → pose «pensativo» → t2 (y volver).

## G · Girar para irse (3), de frente a espaldas
Mismo encuadre, misma escala y misma altura en los tres. El cuerpo gira sobre su eje sin desplazarse.
18. `gira_1.png`: de frente con los brazos relajados a los lados (no juntos), mirando a cámara.
19. `gira_2.png`: girado tres cuartos hacia la derecha; el visor todavía se ve de lado.
20. `gira_3.png`: de espaldas por completo (capucha y espalda de la chaqueta), sin mirar atrás.

Uso: 1 → 2 → 3 y salida de cuadro.

## Entrega
- Guarda los 20 PNG en una carpeta nueva, `NAS100_EXPLORADOR/V3/`, sin modificar ni sobrescribir ninguna imagen existente de la biblioteca.
- 20 PNG transparentes de 1024 × 1024, con los nombres indicados.
- Una lámina de contacto por bloque (`lamina_v3_A.png` … `lamina_v3_G.png`) sobre fondo oscuro #090B10. Cada fotograma va junto a su pose base para comparar la alineación.
- Un GIF de prueba por secuencia, a 8 fotogramas por segundo: `prueba_habla.gif`, `prueba_senala.gif`, `prueba_sl.gif`, `prueba_tp.gif`, `prueba_piensa.gif`, `prueba_gira.gif` y `prueba_parpadeo.gif`, este último con los 6 ojos cerrados alternando con su pose. Así verificas que no haya saltos.
- Si un fotograma no calza con su pose base (posición, escala o luz) o cambia el personaje, repítelo antes de entregar.
- Empaqueta todo en un ZIP: `NAS100_EXPLORADOR_V3.zip`.
