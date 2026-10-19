# Prompt para Codex · Avatar TITÁN HOLDING: 16 piezas de animación (v2)

Copia todo lo que está debajo de la línea y pégalo en Codex, **en la misma conversación o proyecto donde creó la biblioteca `TITAN_HOLDING`**. No hace falta adjuntar nada: Codex ya tiene el ancla y las 87 imágenes. Si abres una conversación nueva y no las encuentra, adjúntale `titan_ancla.png` y los archivos de la sección «Material de referencia».

Uso exclusivo de TITÁN HOLDING.

---

Crea **16 piezas nuevas** del **mismo avatar humano de TITÁN HOLDING** que generaste en la carpeta `TITAN_HOLDING/`. Servirán para animarlo en videos explicativos verticales: parpadeo, gestos en varios tiempos y fondos de oficina. **No son poses nuevas**: son fotogramas intermedios y variantes de imágenes que ya existen.

## Material de referencia (ya lo tienes, no lo regeneres)
- `TITAN_HOLDING/titan_ancla.png`: identidad principal.
- `TITAN_HOLDING/A/titan_neutral.png`: base de casi todo este encargo.
- `TITAN_HOLDING/C/titan_explicando.png`
- `TITAN_HOLDING/C/titan_pensativo.png`
- `TITAN_HOLDING/D/titan_pulgar.png`
- `TITAN_HOLDING/B/titan_senala_derecha.png`
- `TITAN_HOLDING/J/titan_oficina_neutral.png`: decoración de la oficina.
- Tus microexpresiones del bloque I, que conservaron el cuerpo idéntico: usa esa misma técnica.

## Reglas obligatorias
- **Identidad:** el mismo rostro, cabello, piel, edad y camiseta negra lisa del ancla. Nada de embellecer, ni cambiar rasgos, ni volverlo genérico.
- **Estilo:** realista, cinematográfico, luz cálida con acentos ámbar, igual que la biblioteca.
- **Formato de las piezas 1–13:** PNG de 1024 × 1024 con alfa real, sin halo claro alrededor del cabello ni de las manos, sin piso y sin sombra pegada.
- **REGLA CLAVE PARA ANIMAR (piezas 1–13):** cada pieza parte de su **imagen base** y debe coincidir con ella en todo lo que no se mueve:
  - misma posición en el lienzo, escala, rostro, luz y pliegues de la camiseta;
  - el cuerpo apoyado en el borde inferior igual que la base.
  - Edita sobre la base y **recompón con máscaras solo la zona que se mueve**, como hiciste en el bloque I. Fuera de la máscara, los píxeles deben ser idénticos a la base.
  - Entrega en `verificacion.json`, por pieza, cuántos píxeles cambiaron fuera de la máscara (la meta es 0).
- **Tono:** seguro, cercano y profesional. Nada de euforia, gestos de dinero, billetes ni burla.
- **Logo:** **ninguna imagen debe contener el emblema, el nombre «TITÁN HOLDING» ni ningún otro texto o logo.** El logo oficial lo agregamos nosotros en el video. Nunca lo dibujes ni lo inventes.
- Nombra cada archivo exactamente como se indica y guarda todo en una carpeta nueva, `TITAN_HOLDING/V2/`, sin modificar ni sobrescribir ninguna imagen existente.

## A · Parpadeo (4)
Copia exacta de la base. Cambia **solo los párpados**: misma mirada, cejas y boca.
1. `titan_neutral_ojos_entrecerrados.png`: base `A/titan_neutral.png`, párpados a la mitad.
2. `titan_neutral_ojos_cerrados.png`: base `A/titan_neutral.png`, ojos cerrados de forma natural y relajada.
3. `titan_explicando_ojos_cerrados.png`: base `C/titan_explicando.png`.
4. `titan_pensativo_ojos_cerrados.png`: base `C/titan_pensativo.png`.

Uso: abiertos → entrecerrados → cerrados → entrecerrados → abiertos, en unos 0,25 s, cada 3–5 s.

## B · Asentir estable (3), base `A/titan_neutral.png`
Solo se mueven la cabeza y el cuello. Los hombros, brazos, manos y camiseta quedan idénticos.
5. `titan_asiente_v2_1.png`: cabeza levemente arriba (unos 3°).
6. `titan_asiente_v2_2.png`: cabeza levemente abajo (unos 6°), mirada a cámara.
7. `titan_asiente_v2_3.png`: cabeza de nuevo arriba, idéntica al fotograma 1 salvo un mínimo cambio de la mirada.

Uso: 1 → 2 → 3 → 2 → 1, a 8 fps.

## C · Explicar en bucle estable (3), base `C/titan_explicando.png`
Solo se mueven las manos y los antebrazos, con poco recorrido. Rostro, cabeza, hombros y torso quedan idénticos.
8. `titan_explica_v2_1.png`: copia exacta de la base.
9. `titan_explica_v2_2.png`: la mano derecha sube unos centímetros y gira la palma levemente hacia arriba; la izquierda queda igual.
10. `titan_explica_v2_3.png`: la mano izquierda se abre un poco más y baja unos centímetros; la derecha vuelve a la base.

Uso: 1 → 2 → 1 → 3 en bucle mientras la voz explica.

## D · Transiciones desde la neutral (3), base `A/titan_neutral.png`
Solo se mueve el brazo indicado. El rostro, el otro brazo y el torso quedan idénticos a la neutral.
11. `titan_t_senala.png`: el brazo derecho a medio camino hacia la pose de `B/titan_senala_derecha.png` (codo despegado y mano empezando a extender el índice).
12. `titan_t_pensativo.png`: una mano sube desde las manos juntas hacia el mentón, a la altura del pecho, en dirección a `C/titan_pensativo.png`.
13. `titan_t_pulgar.png`: la mano derecha se separa de la otra y empieza a cerrar el puño, en dirección a `D/titan_pulgar.png`.

Uso: neutral → transición → pose final, con un fundido de 0,15 s entre cada imagen.

## E · Oficina sin logo (3)
Misma decoración de tu bloque J: estanterías, globo dorado, toro, luz ámbar y mármol oscuro. La pared donde estaba el emblema queda como un **panel de mármol oscuro liso, sin emblema, sin letras y sin marcas**.
14. `titan_oficina_vacia.png`: la oficina **sin persona y sin silla en primer plano**, para componer encima las poses transparentes.
    - Formato vertical de **1080 × 1920 px**.
    - Profundidad de campo suave, como fondo de video.
    - Zona central inferior despejada, donde irá el avatar.
    - Panel liso visible en la parte superior derecha, donde pondremos el logo oficial.
15. `titan_oficina_neutral_sin_logo.png`: igual a `J/titan_oficina_neutral.png`, misma persona, pose y encuadre, pero con el panel liso.
16. `titan_oficina_explicando_sin_logo.png`: igual a `J/titan_oficina_explicando.png`, con el panel liso.

## Entrega
- Las 16 piezas en `TITAN_HOLDING/V2/` con los nombres indicados.
- `verificacion.json` con los píxeles cambiados fuera de la máscara en las piezas 1–13.
- Una lámina por bloque (`lamina_v2_A.png` … `lamina_v2_E.png`) con cada pieza junto a su base, sobre gris oscuro.
- Un GIF de prueba por secuencia: `prueba_parpadeo.gif`, `prueba_asiente.gif`, `prueba_explica.gif` y `prueba_transiciones.gif`.
- Si una pieza no calza con su base, cambia la identidad o contiene cualquier logo o texto, repítela antes de entregar.
- Empaqueta todo en un ZIP: `TITAN_HOLDING_V2.zip`.
