# TITÁN HOLDING · Bases de contenido

Contexto permanente del proyecto. Leer antes de producir cualquier pieza de TITÁN HOLDING.
Guardado el 19 oct 2026. Las instrucciones más recientes de quien dirige el proyecto tienen prioridad sobre este documento y sobre versiones anteriores del manual de marca. Esta es una **guía**, que complementa las bases ya acordadas en las piezas anteriores.

## Identidad
- TITÁN HOLDING es un proyecto de contenido sobre **inversiones, empresas y economía mundial**. También documenta portafolios personales.
- Es **independiente de LUKAS, NUVA y NAS100 EDGE LAB**. No se mezclan nombres, símbolos, colores, mensajes ni avatares. NAS100 EDGE LAB es «un laboratorio de TITÁN HOLDING», pero conserva su propia identidad.
- Se usan el manual de marca y el logo oficial (`marca/TITAN_logo_referencia.jpg`).

## Dirección editorial
- Contenido **cercano, curioso y visual**: cómo las inversiones se relacionan con la vida cotidiana y con lo que pasa en el mundo.
- Alternar tres tipos de pieza:
  1. Historias sobre empresas e infraestructura (por ejemplo, «La nube también tiene enchufe» o «El mundo se mueve en una caja»).
  2. Conceptos de inversión explicados con ejemplos.
  3. Actualizaciones personales respaldadas por comprobantes.
- No centrar todo en los portafolios ni usar lenguaje técnico innecesario.
- Buscar aperturas interesantes, revelaciones visuales y preguntas que inviten a conversar. **No prometer viralidad.**

## Dos versiones por contenido
| | YouTube Shorts | TikTok |
|---|---|---|
| Duración | 35–60 s | 60–90 s |

- Cada versión funciona por sí sola. Se adaptan la profundidad, el guion y el montaje; **no** basta con acelerar o recortar el mismo archivo.
- La duración se sostiene con contenido útil: sin frases repetidas, sin animaciones estiradas y sin pantallas vacías.

## Producción y voz (videos de gráficos)
- **Sin personas ni avatar**, salvo que se pida. El avatar humano de TITÁN está en `avatar_titan/` y solo se usa cuando se solicite.
- **Voz oficial desde el 2 nov 2026:** ElevenLabs, voz «Juan - Clear & Expressive» (`FA1FBP9TKxnBiw45fHmS`), autorizada por Lady. Una sola toma por guion. Antes de generar, se estima el costo en créditos y se cierran los guiones. Después se verifica cada narración con transcripción local y se regenera solo la frase que falle.
- La voz no se copia ni se clona fuera de ElevenLabs. Si no hay créditos o acceso, se exporta **sin audio** y se entrega el guion para grabarlo.
- Si el equipo de TITÁN sube una grabación propia, esa manda sobre la voz sintética.
- Plan pago de ElevenLabs activo desde el 3 nov 2026 (uso comercial, sin atribución obligatoria). Consumo: aproximadamente 1 crédito por carácter en cada toma, tanto con v4 como con Flash.
- Entregar siempre el **guion exacto de narración** para cada versión.
- El primer montaje usa tiempos orientativos. Con la grabación, los tiempos definitivos siguen la lectura natural: **ajustar las escenas antes de acelerar la voz**.
- Conservar el proyecto editable y los recursos para la sincronización posterior.

## Identidad visual
**Marca general.** Estos son los valores usados en las piezas aprobadas («La nube…» y «El mundo se mueve en una caja»). Si el manual indica otros, manda el manual.

| Rol | Color | Valor usado |
|---|---|---|
| Fondo | Tinta / azul muy oscuro | `#050E1E`, `#0D1020`, superficies `#12244A` |
| Texto | Marfil | `#F6F4EF` |
| Acento principal | Dorado institucional | `#E2B34E` |
| Apoyo | Lavanda | `#C4B5FD` |

**Portafolios:**
- **TITÁN 2.0:** acentos turquesa (tono exacto según el manual).
- **TITÁN 3.0:** acentos violeta y lavanda.
- **TITÁN PRO:** conserva su identidad específica, según el manual.

Se usa el identificador que corresponda al contenido. Una pieza general sobre inversiones puede llevar solo «TITÁN HOLDING».

## Logo
- Se reutiliza la imagen oficial (`marca/TITAN_logo_referencia.jpg`) conservando el círculo, el símbolo, el dorado y las proporciones.
- El JPG tiene fondo azul oscuro: se integra sobre una superficie compatible (recorte circular sobre fondo azul oscuro).
- **No redibujar, estirar ni recolorear.** Tampoco aceptar logos inventados por generadores de imágenes, como los de la oficina del bloque J del avatar.
- Su presencia no debe retrasar el mensaje inicial.

## Estilo de animación
- **Estilo 3D (aprobado el 3 nov 2026 con la muestra de «¿Quién manda?»):** desde ahora, el TikTok, el Shorts y el YouTube de TITÁN se hacen con escenas 3D reales (Three.js dentro de HyperFrames):
  - objetos con volumen, como fichas, monedas de voto, cubos y documentos;
  - cámara en movimiento continuo y viajes en profundidad entre escenas, en lugar de cortes;
  - partículas doradas suaves y textos HTML encima, sincronizados con la voz.
  - Se mantienen la paleta, la firma, los subtítulos palabra por palabra y el anillo dorado.
  - Las cifras aparecen exactas cuando la voz las dice, sin contadores con valores intermedios.
- **Ritmo y movimiento (aprobado el 3 nov 2026 con el TikTok de «NU cayó» v2). Se aplica a todos los videos: TikTok, Shorts y YouTube largo.**
  - **Cero cuadros vacíos.** Las escenas 3D van en fila hacia el fondo. La cámara viaja menos de 1 s entre una y otra, y la siguiente ya se ve llegar. Sin destellos ni fundidos a pantalla vacía.
  - **Algo nuevo cada 1–2 s, amarrado a la frase que dice la voz:** un check, un sello, una ficha, una pregunta «1 de 3», una línea que se va armando. Nada de bloques de texto que aparecen completos de una vez.
  - **Movimiento constante en cada set:** objetos con animación en ciclo (monedas que van y vuelven, órbitas, flechas que caen), cámara con balanceo suave, objetos flotantes de fondo y partículas. Nunca un objeto solo y quieto mientras habla la voz.
  - **Estructura fija que da sensación de avance:**
    - en verticales, una franja de pasos arriba: el paso actual en dorado y los anteriores con ✓;
    - una ficha de dato acoplada que se queda en pantalla (por ejemplo, «NU ≈ −17 % · 26 OCT 2026»);
    - en el largo, chips de sección.
  - **Verificación cuadro por cuadro antes de entregar:**
    - cuadros a 10 fps alrededor de cada transición;
    - una hoja de muestras de todo el video;
    - nada vacío, cortado ni tapando los subtítulos.
  - **Mejora continua:** cada video nuevo debe superar al anterior en ritmo, transiciones o claridad. Se toman como referencia de ritmo los videos que comparta Lady, sin copiar personajes, marcas ni diseños de otros.
- Contar historias con objetos, recorridos, comparaciones y cambios de escala. Evitar que todos los videos sean presentaciones de tarjetas iguales.
- Una idea dominante por momento. Movimiento para explicar; texto estable para leer.
- Ilustraciones amplias, textos cortos y buen contraste.
- Revisar la legibilidad en el teléfono y dejar espacio a las interfaces: zona segura x 90–900 y y 180–1500. En Shorts, los datos van en y 290–1000.

## Precisión
- **No inventar** cifras, cotizaciones, compras, rendimientos ni pasos de investigación.
- Marcar los ejemplos conceptuales como tales.
- Para datos actuales, consultar **fuentes primarias** y registrar fecha y enlace.
- Una tendencia o un producto popular no garantizan una buena inversión. Sin promesas, sin urgencia artificial y sin recomendaciones de compra disfrazadas de educación.
- Los datos personales y comprobantes se usan **solo cuando se aportan para esa pieza**.

## Entregas habituales
- MP4 vertical 1080 × 1920, 30 fps, con la voz oficial (o **sin audio** si no hay voz disponible).
- Una versión para TikTok y otra para Shorts.
- Portada de cada versión (puede compartir diseño).
- Guion exacto de cada narración y subtítulos SRT cuando haya voz.
- Tiempos orientativos de escenas.
- Proyecto editable y recursos utilizados, cuando el entorno permita entregarlos.
- **Duración del video largo de YouTube (desde el 3 nov 2026): de 8 a 10 minutos**, para habilitar anuncios a mitad del video y sumar horas de visualización. Objetivo: monetizar el canal.
  - Se llega a esa duración con contenido real, nunca con relleno ni repeticiones:
    - un segundo ejemplo o un caso comparable con fuente;
    - una sección de «errores comunes del principiante»;
    - un recordatorio del gancho a mitad del video;
    - repasos visuales breves entre secciones;
    - un cierre con lo aprendido y la invitación al siguiente video.
  - Retención antes que duración: cada sección debe aportar algo nuevo.
  - Presupuesto: unos 9.000–10.500 créditos de ElevenLabs por paquete completo, con 121.000 al mes en el plan Creator. Render 3D de unas 3–4 h por video largo.
  - Las piezas anteriores («¿Quién manda?», 5:45; «NU cayó», 5:25) se quedan como están.
  - Peso del archivo: el video largo de YouTube se exporta en buena calidad aunque pase de 30 MB. El límite de 30 MB aplica solo a TikTok y Shorts.
- **Video largo de YouTube, siempre:** entregar la descripción lista para pegar, breve y con las dos primeras líneas como gancho, con:
  - título;
  - un gancho en las dos primeras líneas;
  - CTA (suscribirse, comentar con la pregunta del video y compartir);
  - capítulos con tiempos reales;
  - fuentes con enlaces;
  - disclaimer;
  - tres hashtags;
  - etiquetas con palabras clave;
  - notas de subida (miniatura, SRT, pantalla final y lista de reproducción).
  - Sin promesas de rentabilidad ni de viralidad.
- Comprobar los archivos antes de entregar. Explicar cualquier limitación concreta y distinguir lo producido de lo pendiente.

## Archivos del proyecto
- `marca/TITAN_logo_referencia.jpg`: logo oficial.
- `avatar_titan/`: avatar humano (solo cuando se pida) y su catálogo.
- Piezas anteriores: `TITAN_La_Nube_Tambien_Tiene_Enchufe*` y `TITAN_El_Mundo_Se_Mueve_En_Una_Caja*`, con su guion y tiempos en los `_Tiempos_Voz.md`.
- El manual de marca aún no está en el repositorio. Cuando se adjunte, se guarda en `marca/`.
