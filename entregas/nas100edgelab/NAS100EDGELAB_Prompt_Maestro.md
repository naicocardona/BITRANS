# PROMPT MAESTRO · NAS100 EDGE LAB
_Versión actualizada · 12 oct 2026 · duración máxima 1:30_

Copia todo lo que está debajo de la línea y pégalo al abrir una conversación nueva (adjunta también la Guía de Marca en PDF, el logo y las fotos del trade).

---

Hola Claude. Vamos a producir videos para **NAS100 EDGE LAB** (@nas100edgelab), un proyecto de TITÁN Holding donde documento mis operaciones reales en NAS100 / US100. Trabaja con el mismo método que ya usamos en los trades #023 y #024.

## 1. Método de producción
- Composición en HTML + GSAP con **HyperFrames 0.8.134**: `check`, `snapshot` de los momentos clave y `render` a 30 fps.
- **ffmpeg** para audio, cortes y portada.
- Música original generada por ti, discreta y **distinta en cada video**. Sin narración salvo que yo apruebe una voz.
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

## 3. Estructura obligatoria de cada trade
1. **Apertura:** gancho con el resultado + «TRADE #0XX · fecha · sesión (9 AM / 11 PM Colombia)».
2. **Entrada:** dirección (BUY / SELL) y lotes, datos del journal (Score, Quality, Alignment) y contexto registrado. Nunca presentar Score o Quality como probabilidad de ganar.
3. **Desarrollo y resultado:** texto narrativo repartido en varios momentos, el comprobante MT5 para entrada / salida / duración, y el gráfico para el recorrido.
4. **Tres conclusiones**, cada una con su propia escena, su dato de respaldo y su significado. No reemplazarlas por frases genéricas («disciplina», «respetar el stop», «seguir aprendiendo»).
5. **Cierre:** «NO BUSCAMOS OPERACIONES PERFECTAS. / BUSCAMOS VENTAJA ESTADÍSTICA.» + logo + CTA + disclaimer.

## 4. Formato e identidad
- Vertical **1080 × 1920, 30 fps**. Zona segura: **x 90–900, y 180–1500** (resultados, CTA y disclaimer siempre dentro).
- Paleta: base #090B10 · superficie #13161F · texto #F4F5F9 · acento violeta #A779F2 · favorable #64E087 · adverso #FF6474. El color siempre va con su etiqueta (WIN, LOSS, BE, NO TRADE).
- Dirección del trade (BUY / SELL) en violeta; verde y rojo solo para resultados.
- Tipografía Inter (Arial de respaldo), titulares fuertes y breves, cifras tabulares.
- Logo: usar el archivo original, recortado en círculo. **Nunca redibujarlo ni cambiar sus colores.**
- Cabecera fija: logo + «NAS100 EDGE LAB» + número del trade.

## 5. Reglas de contenido (no negociables)
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

## 6. Entregables
- `NAS100EDGELAB_Trade0XX_AAAA-MM-DD.mp4`
- `NAS100EDGELAB_Trade0XX_AAAA-MM-DD_Portada.jpg` (gráfico real como protagonista, título corto, identidad negra / morada + verde o rojo según resultado)
- `NAS100EDGELAB_Trade0XX_AAAA-MM-DD_Texto_Post.txt`
- MP4 y portada siempre juntos.

## 7. Lo que te mando en cada encargo
- Comprobante MT5 y captura de TradingView del trade.
- Datos del journal (Score, Quality, Alignment, VWAP, EMAs, MFE, MAE, Dirección Real, resultado).
- Contexto confirmado por mí y correcciones.
- Textos propuestos para gancho, desarrollo, tres conclusiones, portada y post.

**Primero preséntame el guion por escenas con tiempos y la duración total (máximo 1:30). Cuando lo apruebe, lo produces.**
