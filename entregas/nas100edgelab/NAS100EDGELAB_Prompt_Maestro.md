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
- **Un solo personaje por video:** el encapuchado de visor violeta. Usa las 6 poses recortadas (fondo transparente). No redibujes ni cambies su ropa, colores ni proporciones.
- **Posición fija:** abajo a la izquierda (≈ x 50–440, y 1137–1500), con una burbuja de diálogo a su derecha. **Nunca** tapa velas relevantes, precios, resultados ni subtítulos: los datos viven en y 300–1110.
- **Sin voz aprobada, habla con burbujas breves** (máximo ≈ 8 palabras) que **complementan** el contenido sin repetirlo. Ejemplos: «Mira dónde termina la aguja.», «Bien. Pero es un solo caso.», «¿Score alto = mejor resultado?».
- **Poses según el momento:**
  | Momento | Pose |
  |---|---|
  | Presentar / transición | neutral (manos juntas) |
  | Destacar un dato | señalando |
  | STOP LOSS | preocupado, sobrio |
  | TAKE PROFIT | satisfacción moderada, sin euforia |
  | Contexto / sesiones / cierre | explicando (manos abiertas) |
  | Las tres conclusiones | pensativo |
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

## 5. Estructura obligatoria de cada trade
1. **Apertura:** gancho con el resultado + «TRADE #0XX · fecha · sesión (9 AM / 11 PM Colombia)».
2. **Entrada:** dirección (BUY / SELL) y lotes, datos del journal (Score, Quality, Alignment) y contexto registrado. Nunca presentar Score o Quality como probabilidad de ganar.
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
- **Separar ejecución y ventana:** el resultado ejecutado (MT5) no es el MFE / MAE de la ventana. Rotular MFE / MAE como «Recorrido de la ventana · journal» y, si la ventana no ha terminado, «ventana en curso».
- No deducir movimientos del stop, BE ni salidas manuales que yo no haya confirmado.
- Mostrar pérdidas y BE con el mismo cuidado que las ganancias.
- Dinero del comprobante: **visible o tapado según indique en cada encargo** (por defecto, comunicar en puntos). La portada nunca muestra dinero.
- No prometer ganancias ni rentabilidad. No vender nada.
- **CTA único:** «Sigue la bitácora para ver el siguiente trade.» **Nunca** pedir comentarios ni mensajes al DM.
- Disclaimer en cada video: «Contenido educativo · No es asesoría financiera · Operar implica riesgo de pérdida».

## 8. Entregables
- `NAS100EDGELAB_Trade0XX_AAAA-MM-DD.mp4`
- `NAS100EDGELAB_Trade0XX_AAAA-MM-DD_Portada.jpg` (gráfico real como protagonista, título corto, identidad negra / morada + verde o rojo según resultado)
- `NAS100EDGELAB_Trade0XX_AAAA-MM-DD_Texto_Post.txt`
- MP4 y portada siempre juntos.

## 9. Lo que te mando en cada encargo
- Comprobante MT5 y captura de TradingView del trade.
- Datos del journal (Score, Quality, Alignment, VWAP, EMAs, MFE, MAE, Dirección Real, resultado).
- Contexto confirmado por mí y correcciones.
- Textos propuestos para gancho, desarrollo, tres conclusiones, portada y post.
- Las poses del avatar (si no las tienes ya en la conversación).

**Primero preséntame el guion por escenas con tiempos, la duración total (máximo 1:30), las visualizaciones animadas de cada escena y la pose + burbuja del avatar en cada momento. Cuando lo apruebe, lo produces.**
