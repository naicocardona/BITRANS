# PROMPT MAESTRO · NAS100 EDGE LAB
_Versión actualizada · 17 oct 2026 · duración máxima 1:30 · versión dinámica con avatar presentador_

Copia todo lo que está debajo de la línea y pégalo al abrir una conversación nueva (adjunta también la Guía de Marca en PDF, el logo, las fotos del trade y la lámina del avatar o las 6 poses recortadas de `entregas/nas100edgelab/avatar/`).

---

Hola Claude. Vamos a producir videos para **NAS100 EDGE LAB** (@nas100edgelab), un proyecto de TITÁN Holding donde documento mis operaciones reales en NAS100 / US100. Trabaja con el mismo método que ya usamos en los trades #023 y #024, y con la **versión dinámica con avatar** del Resumen Semana #9: la referencia de estilo es ese video.

## 1. Método de producción
- Composición en HTML + GSAP con **HyperFrames 0.8.134**: `check`, `snapshot` de los momentos clave y `render` a 30 fps.
- **ffmpeg** para audio, cortes y portada.
- Música original generada por ti, con energía pero sin tapar nada, y **distinta en cada video**. Efectos de sonido sintetizados sutiles. Voz del avatar aprobada: «A · Mentor» (ver sección 4); con voz, la música baja cuando habla.
- Flujo de aprobación: **1)** guion por escenas con tiempos → **2)** capturas clave → **3)** render final verificado (duración, resolución, audio).

## 2. Duración: máximo 1:30, idealmente menos
La gente no siempre se queda todo el video. Reglas:
- **Duración máxima: 1:30.** Objetivo: **60–80 s** cuando el contenido lo permita. Si cabe en menos, mejor.
- **Primer cuadro con contenido:** el gráfico real y el gancho aparecen desde el segundo 0. Nada de entradas lentas, pantallas vacías ni logos largos al inicio.
- **El resultado (WIN / LOSS / BE / NO TRADE) se dice en el gancho**, dentro de los primeros 3 segundos.
- **Ritmo parejo:** cada bloque dura su tiempo mínimo de lectura (**1 s + palabras ÷ 3**), sin relleno. Ni tan rápido que no se lea ni tan lento que aburra.
- En escenas donde los textos se acumulan (las conclusiones), los bloques intermedios pueden avanzar más ágil porque siguen en pantalla; el último bloque de cada escena conserva su tiempo completo.
- Algo se mueve en pantalla cada 2–3 s (acercamiento, resaltado o texto nuevo).
- **Presupuesto orientativo (1:30):**
  | Parte | Tiempo |
  |---|---|
  | Apertura (gancho + identificación) | 6–9 s |
  | Entrada y contexto | 10–13 s |
  | Desarrollo y resultado | 20–27 s |
  | Tres conclusiones | 27–32 s (≈ 9–10 s cada una) |
  | Cierre (frase + CTA + disclaimer) | 7–8 s |
- **Presupuesto de texto:** máximo **≈ 180–200 palabras en pantalla** en total. Si el encargo trae más, resume el texto en pantalla conservando los datos y el significado; la explicación larga va en el texto del post.
- **Nunca** eliminar una de las tres conclusiones ni el contexto del resultado para ganar tiempo: se resume, no se quita.

## 3. Versión dinámica (estándar desde la Semana #9)
El objetivo es **enganchar sin perder la seriedad del trading**. Un video de tarjetas con texto no retiene a la gente. Cada pieza usa este lenguaje:
- **Gancho de impacto (0–7 s):** el resultado cae con un golpe de cámara breve sobre las fotos reales; es el **único** sacudón del video. Las escenas con cifras y comprobantes se mantienen estables.
- **Contadores en vivo:** los resultados, porcentajes y duraciones se cuentan hasta su valor real (por ejemplo, 0 → −100,55 pts; cronómetro hasta 4 h 35 min 47 s). Nunca muestres un contador antes de su momento.
- **Visualizaciones que explican:**
  - medidor o aguja de balance para el neto;
  - dona para el win rate;
  - velocímetro para el Score;
  - carrera de barras para comparar tiempos;
  - barras rayadas (ventana) frente a sólidas (ejecutado) para MFE/MAE.
  Todas a escala real.
- **Cámara sobre la evidencia:** acercamientos suaves a la entrada en la captura real, las líneas de entrada / SL / TP se dibujan sobre los niveles reales y el comprobante sube deslizándose con el importe oculto si aplica.
- **Sellos STOP LOSS / TAKE PROFIT:** caen con un destello y una onda breve de **intensidad equivalente** para ganancia y pérdida. Nada de explosiones que tapen datos ni conviertan el resultado en espectáculo.
- **Neto o balance:** cuando un contador llega a su valor final, se usa un pulso discreto y pocas partículas; el mensaje manda (p. ej., «balance prácticamente neutro»).
- **Navegación:** barra de progreso fina bajo la cabecera con el capítulo actual (Resultado → Contexto → Sesiones → Conclusiones) para que la gente sepa cuánto falta.
- **Transiciones** con deslizamiento entre escenas, sin pantallas vacías ni parpadeos; cada bloque aparece una sola vez.
- **Sonido:** música original con energía y efectos sintetizados sutiles (golpes en el gancho y en los sellos, barridos en las transiciones). Volumen final ≈ −16 LUFS.
- **Portada** con el avatar en pose de explicar, sin tapar las fotos ni el título.

## 4. Avatar presentador
- **Un solo personaje por video:** el «Explorador», encapuchado de visor violeta. Biblioteca oficial completa (88 piezas, 8 bloques) en `avatar/explorador/`. Catálogo y usos en `avatar/explorador/CATALOGO.md`; coordenadas en `catalogo.json`. Las 6 poses originales (`avatar/*.png`) siguen siendo válidas. No redibujes ni cambies su ropa, colores ni proporciones.
- **Posición fija:** abajo a la izquierda (≈ x 50–440, y 1137–1500 en TikTok; en Shorts, base del avatar ≤ y 1500 y datos en y 290–1000). **Nunca** tapa velas relevantes, precios, resultados ni subtítulos.
- Con la voz A, el avatar narra y los subtítulos reemplazan a las burbujas. Sin voz, habla con burbujas breves (máximo ≈ 8 palabras) que **complementan** el contenido sin repetirlo.
- **Poses según el momento** (elige la más precisa; no uses más de una pose por idea):
  | Momento | Pose principal | Alternativas |
  |---|---|---|
  | Apertura / saludo | `seq_saludo` 1→2→3→2 | `avatar_bienvenida`, `avatar_capucha` (inicio misterioso) |
  | Gancho con pregunta | `avatar_pregunta` | `avatar_idea`, `avatar_silencio` (atención) |
  | Presentar el trade / contexto | `avatar_presenta_derecha` | `avatar_presenta_arriba`, `avatar_tablet_muestra` |
  | Destacar un dato o captura | `avatar_senala_arriba` / `_abajo` / `_izquierda` según dónde esté el dato | `avatar_circula`, `avatar_dos_manos_senalan` (énfasis fuerte) |
  | Revisar comprobante o gráfico | `avatar_lupa` | `avatar_tablet`, `avatar_portapapeles` |
  | Duración del trade | `avatar_reloj` | `avatar_cronometro` |
  | Medir recorrido / MFE / MAE | `avatar_regla` | `avatar_sorprendido` (si el MAE es grande) |
  | STOP LOSS | Secuencia `sl_t1` → `sl_t2` → **preocupado** (decisión del 19 oct 2026) | `avatar_suspiro` (pérdida aceptada, en otra escena) |
  | TAKE PROFIT | Secuencia `tp_t1` → `tp_t2` → **satisfecho** (decisión del 19 oct 2026) | `seq_asiente` 1→2→3 |
  | BE / resultado mínimo | `avatar_pequeno` | `avatar_hombros` |
  | Comparar dos trades / balance | `avatar_balanza` | `avatar_balanza_objeto` |
  | Cifra en pantalla sobre el avatar | `avatar_tarjeta` o `avatar_cartel` (texto encima en el video) | — |
  | Conclusiones 1, 2 y 3 | `avatar_uno`, `avatar_dos`, `avatar_tres` | `avatar_pensativo` |
  | Desmentir un mito («Score alto = ganar») | `avatar_niega` | `seq_niega` 1→2→3→2 |
  | Riesgo / disclaimer | `avatar_alto` | `avatar_brazos_cruzados` |
  | Registrar en la bitácora | `seq_escribe` 1→2→1 | `seq_teclea` 1→2→1, `avatar_laptop`, `avatar_libreta` |
  | Cierre / agradecimiento | `avatar_mano_corazon` | `avatar_reverencia`, `avatar_aplauso_suave` (reconocer el proceso, nunca la ganancia) |
  | Salida | `avatar_espalda` | `avatar_perfil_der` |
  | Escena de apertura de serie o reporte | `avatar_escritorio` | `avatar_escritorio_espalda`, `avatar_cuerpo_entero_camina` (entrada caminando) |
- **Bloque F** (escritorio, cuerpo entero, sentado, primerísimo plano) tiene otro encuadre: úsalo solo en escenas propias (apertura, transición o corte de impacto), nunca en la esquina junto a los datos. Las pantallas de esos monitores son decorativas y no reemplazan las capturas reales.
- **Ojos (bloque H):** parpadeo cada 3–5 s en reposo (abiertos → entrecerrados → cerrados → entrecerrados → abiertos, ≈ 2 fotogramas cada uno). `ojos_brillo` para el pico de la voz y `ojos_sonrisa` para un TAKE PROFIT moderado. Usa los estados de ojos solo con la pose neutral, porque están dibujados sobre ella.
- **Secuencias (bloque G):** se reproducen a 6–8 fotogramas por segundo y solo dentro de la misma secuencia. Nunca alternes poses de bloques distintos como si fueran fotogramas.
- **Fotogramas V3 (`avatar/explorador/V3/`), para que el Explorador nunca esté estático:**
  - **Parpadeo** cada 3–5 s en cualquier pose principal.
  - **«Hablando»** en bucle mientras narra.
  - **Señalar en 3 tiempos** al destacar un dato.
  - **STOP LOSS:** `sl_t1` → `sl_t2` → preocupado.
  - **TAKE PROFIT:** `tp_t1` → `tp_t2` → satisfecho.
  - No usar `fin_nuca` ni `fin_pulgar` como final de estas secuencias: provocan un salto de escala.
  - **Pensar en 2 tiempos.**
  - **Salida:** girar (`gira_1` → `gira_3`) y salir por abajo.
  - Órdenes y tiempos en `CATALOGO.md`.
- **Movimiento en código, siempre:** respiración (escala vertical ≈ 1 %), rebote al cambiar de pose y entrada desde abajo. Sacudida solo en el gancho.
- Cambios de pose con fundido rápido y un pequeño rebote; respiración sutil en reposo. El avatar sale antes del logo y el CTA final.
- Las burbujas nunca dan consejos de inversión ni celebran ganancias; mantienen el tono educativo.

### Voz del avatar · «A · Mentor» (aprobada el 17 oct 2026)
- **Úsala en los videos de NAS100 EDGE LAB.** El avatar puede narrar; las burbujas pasan a ser subtítulos breves sincronizados con la voz.
- **Receta exacta**, para que suene siempre igual:
  - Kokoro multi-lang v1.0 (sherpa-onnx, local, licencia Apache 2.0), voz `em_alex` (sid 29), idioma `es-419`, velocidad 0.92.
  - Procesamiento con ffmpeg: `asetrate=24000*0.917,aresample=48000,atempo=1.0905,highpass=f=70,equalizer=f=220:t=q:w=1:g=2,equalizer=f=3000:t=q:w=1.2:g=2.5,deesser=i=0.3,acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=2,aecho=0.85:0.6:35|60:0.18|0.10`.
  - Mezcla final con la música, a −16 LUFS.
- **Pronunciación:**
  - Genera **cada frase por separado y sin punto final**: con punto, Kokoro agrega un soplido que suena como una «s» («pérdidas»).
  - Une las frases con pausas controladas.
  - Escribe las cifras como se dicen («más dos coma quince puntos») y muestra la cifra en pantalla («+2,15 puntos»).
- **Verificación obligatoria:** transcribe la narración final con Whisper (sherpa-onnx, local) y compárala con el guion antes de entregar. Si una palabra no coincide, regenera esa frase.
- **Ojos del visor:** pulsan al ritmo de la voz (envolvente del audio a 30 fps); cambios de pose en los cambios de idea.
- **El guion de la voz** se presenta junto al guion por escenas para aprobación; la voz complementa los textos en pantalla, no los lee todos.
- Pronunciación de marcas: escribir «TITÁN HOLDING» para la voz como «Titán Jóldin» (la h de holding suena como j); «NAS100 EDGE LAB» como «Nas cien Edch Lab»; «trade» como «treid».

## 5. Estructura obligatoria de cada trade
1. **Apertura:** gancho con el resultado + «TRADE #0XX · fecha · sesión (9 AM / 11 PM Colombia)».
2. **Entrada:** dirección (BUY / SELL), datos del journal (Score, Quality, Alignment) y contexto registrado. Los lotes no se muestran (ver sección 7). Nunca presentar Score o Quality como probabilidad de ganar.
3. **Desarrollo y resultado:** texto narrativo repartido en varios momentos, el comprobante MT5 para entrada / salida / duración, y el gráfico para el recorrido.
4. **Tres conclusiones**, cada una con su propia escena, su dato de respaldo y su significado. No reemplazarlas por frases genéricas («disciplina», «respetar el stop», «seguir aprendiendo»).
5. **Cierre:** «NO BUSCAMOS OPERACIONES PERFECTAS. / BUSCAMOS VENTAJA ESTADÍSTICA.» + logo + CTA + disclaimer.

## 6. Formato e identidad
- Vertical **1080 × 1920, 30 fps**. Zona segura: **x 90–900, y 180–1500** (resultados, CTA y disclaimer siempre dentro).
- Paleta: base #090B10 · superficie #13161F · texto #F4F5F9 · acento violeta #A779F2 · favorable #64E087 · adverso #FF6474. El color siempre va con su etiqueta (WIN, LOSS, BE, NO TRADE).
- Dirección del trade (BUY / SELL) en violeta; verde y rojo solo para resultados.
- Tipografía Inter (Arial de respaldo), titulares fuertes y breves, cifras tabulares.
- Logo: usar el archivo original, recortado en círculo. **Nunca redibujarlo ni cambiar sus colores.**
- Cabecera fija: logo + «NAS100 EDGE LAB» + número del trade o semana + capítulo actual, con la barra de progreso debajo.

## 7. Reglas de contenido (no negociables)
- **Nunca inventar datos**, resultados, horas, emociones, noticias ni confluencias. Si falta un dato, se dice o se omite.
- Solo capturas reales: animar encuadres, acercamientos y resaltados. **No fabricar velas** ni presentar recortes de una foto como momentos distintos.
- Verificar las cifras contra el comprobante: entrada, salida, puntos, duración (MT5 está en hora del servidor, UTC+3; Colombia = servidor − 8 h).
- **Separar ejecución y ventana:** el resultado ejecutado (MT5) no es el MFE / MAE de la ventana. Rotular MFE / MAE como «Recorrido medido» o «Recorrido de la ventana» y, si la ventana no ha terminado, «ventana en curso».
- No deducir movimientos del stop, BE ni salidas manuales que yo no haya confirmado.
- Mostrar pérdidas y BE con el mismo cuidado que las ganancias.
- **Dinero y lotes tapados (desde el 21 oct 2026):** en el comprobante se tapan siempre el resultado en dinero (USD o divisa de la cuenta) y el tamaño de la posición (lotes).
  - No basta con un bloque negro: sobre cada zona va una **etiqueta de diseño** con información útil. Por ejemplo, sobre el dinero «RESULTADO EN PUNTOS · +100 pts» (verde, o rojo si es pérdida), y sobre los lotes «TAMAÑO · PRIVADO».
  - La etiqueta va en la identidad del laboratorio (fondo oscuro, borde violeta o del color del resultado) y aparece con una animación corta, para que se lea como información y no como censura.
  - El resto del comprobante queda visible: símbolo, dirección, precios de entrada y salida, fecha, hora, SL y TP.
  - La narración y los textos nunca mencionan el dinero ni los lotes; el resultado se comunica en puntos.
  - Solo se muestra el dinero si el encargo lo pide de forma explícita. La portada nunca muestra dinero.
- No prometer ganancias ni rentabilidad. No vender nada.
- **CTA único:** «Sigue la bitácora para ver el siguiente trade.» **Nunca** pedir comentarios ni mensajes al DM.
- **Fuente de los datos:** no se menciona Notion ni la herramienta donde se anotan los datos (ni en la voz ni en pantalla). Se dice «registro», «bitácora» o «recorrido medido».
- Disclaimer en cada video: «Contenido educativo · No es asesoría financiera · Operar implica riesgo de pérdida».

## 8. Entregables
Desde la Semana #9 cada video sale en **dos versiones independientes** (ver sección 8 B). Nombres:
- `NAS100_EDGE_LAB_<TIPO><NÚMERO>_<PLATAFORMA>[_V<n>].mp4`
  - TIPO: `ENTRADA`, `RESULTADO`, `APRENDIZAJE` o `SEMANA`.
  - NÚMERO: trade con tres cifras (`TRADE023`) o semana con dos (`SEMANA09`).
  - PLATAFORMA: `TIKTOK` o `SHORTS`. V2, V3… solo si hay una corrección posterior.
  - Ejemplos: `NAS100_EDGE_LAB_RESULTADO_TRADE025_TIKTOK.mp4`, `NAS100_EDGE_LAB_SEMANA10_SHORTS.mp4`.
- Una portada por versión, con el mismo nombre más `_PORTADA.jpg`. La portada lleva el gráfico real como protagonista, un título corto e identidad negra / morada con verde o rojo según el resultado. Nunca muestra dinero.
- `NAS100_EDGE_LAB_<TIPO><NÚMERO>_PUBLICACION.md` con:
  - Título, descripción, 3 hashtags, duración y miniatura recomendada de cada versión.
  - Para Shorts, además: lista de reproducción y video relacionado.
  - Datos verificados, diferencias entre versiones y checklist de QC.
- MP4 y portada siempre juntos.

## 8 B. Sistema multiplataforma: TikTok + YouTube Shorts (permanente)
Son **dos ediciones distintas**, no un recorte de la otra. Mismos datos verificados, mismo avatar «Explorador» con la voz A, misma identidad.

| | TikTok | YouTube Shorts |
|---|---|---|
| Duración | 60–90 s (máx. 1:30) | 35–60 s |
| Gancho | Resultado + contexto del trade | Pregunta o contraste propio en el primer segundo, con el gráfico ya en pantalla |
| Contenido | Historia completa: entrada, desarrollo, resultado y 3 conclusiones | **Una sola lección principal**, menos texto secundario, sin conclusiones 2 y 3 |
| Narración | Voz A + subtítulos | Voz A + subtítulos palabra-frase sincronizados (obligatorio) |
| Zona de datos | x 90–900, y 180–1500 | x 90–900, **y 290–1000** (datos), subtítulos en y ≈ 1015. Nada importante bajo y 1500 ni a la derecha de x 900, que son los botones y la descripción de Shorts |
| Audio | −16 LUFS | −14 LUFS |
| Música | Pista original propia | **Otra** pista original (nunca la misma del TikTok) |
| Cierre | CTA «Sigue la bitácora…» + disclaimer | «Esto es NAS100 EDGE LAB, un laboratorio de TITÁN HOLDING» + disclaimer. El CTA va en la descripción |
| Marcas | Sin marca de agua de TikTok | Sin marca de agua de TikTok ni de ninguna app |

TITÁN HOLDING aparece solo como identificación (logo pequeño + nombre). No es protagonista ni se vende nada.

**Qué cuenta cada tipo de video:**
- **ENTRADA:** el setup registrado (dirección, Score, Quality, Alignment y contexto) sin resultado. En Shorts: «¿Qué vio el journal antes de entrar?».
- **RESULTADO:** ejecución real (MT5), resultado en puntos y recorrido. En Shorts: gancho con el desenlace y una lección.
- **APRENDIZAJE:** un hallazgo transversal (por ejemplo, Score vs. resultado) con los trades que lo respaldan. En Shorts: una idea, una prueba.
- **REPORTE SEMANAL:** balance de la semana y hallazgo principal. En Shorts: contraste inicial + balance + lección + identificación.

**Archivos maestros reutilizables (por video):**
- Narración por frases y la narración montada (`narr_A.wav`) con sus tiempos (`narr_times.json`).
- La composición de cada versión (`index.html` + `assets/`) y su script generador.
- Portadas en HTML editable.
- Las capturas reales recortadas.

**QC antes de entregar cada versión:**
- Cifras contra el comprobante.
- Transcripción ASR de la voz final, palabra por palabra.
- Duración dentro del rango de la plataforma.
- Sonoridad (LUFS) dentro de lo indicado.
- Subtítulos sin solaparse con datos.
- Nada fuera de la zona segura.
- Avatar sin tapar datos.
- Disclaimer presente.
- Portada sin dinero.
- Música distinta entre versiones.

## 9. Lo que te mando en cada encargo
- Comprobante MT5 y captura de TradingView del trade.
- Datos del journal (Score, Quality, Alignment, VWAP, EMAs, MFE, MAE, Dirección Real, resultado).
- Contexto confirmado por mí y correcciones.
- Textos propuestos para gancho, desarrollo, tres conclusiones, portada y post.
- Las poses del avatar (si no las tienes ya en la conversación).

**Primero preséntame el guion por escenas con tiempos, la duración total (máximo 1:30), las visualizaciones animadas de cada escena y la pose + burbuja del avatar en cada momento. Cuando lo apruebe, lo produces.**
