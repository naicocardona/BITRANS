# Biblioteca del avatar humano TITÁN HOLDING

Se generaron las 87 piezas con los nombres de la especificación, organizadas en A–J. La referencia principal fue siempre el ancla aprobada del hombre sentado con camiseta negra. El usuario aprobó el parecido del piloto de seis poses antes de ampliar la biblioteca.

## Contenido

| Bloque | Contenido | PNG |
|---|---|---:|
| A | Presentación y poses base | 8 |
| B | Señalar y dirigir atención | 8 |
| C | Pensar, analizar y explicar | 9 |
| D | Reacciones sobrias | 10 |
| E | Contar puntos | 5 |
| F | Trabajo y objetos | 10 |
| G | Escritorio, cuerpo completo y primer plano | 8 |
| H | Fotogramas para animar | 14 |
| I | Microexpresiones y miradas | 10 |
| J | Variantes con oficina | 5 |

Los archivos individuales son PNG de 1024 × 1024. A–I usan alfa real; J tiene fondo de oficina. Las diez láminas `lamina_A.png` a `lamina_J.png` muestran cada bloque sobre gris oscuro. La oscuridad de las láminas es un fondo de revisión, no forma parte de los recortes individuales.

`inventario_A_J.csv` contiene la comprobación de existencia, dimensiones y rango de alfa. `prompts_biblioteca.json` registra las instrucciones y las fuentes de generación; `prompts_piloto.json` conserva las instrucciones del piloto. `titan_ancla.png` y `especificacion.md` conservan los insumos.

## Método y reutilizaciones

Se utilizó el generador integrado image_gen, con una llamada por imagen o corrección. Se conservaron los archivos originales del generador. La preparación local solo redujo los originales a 1024 × 1024, conservó el alfa y compuso las láminas; no reconstruyó ni sustituyó el rostro.

Para evitar cambios innecesarios en poses equivalentes, `titan_uno.png` reutiliza `titan_idea.png`, `titan_cinco.png` reutiliza el saludo corregido, `titan_rostro_neutro.png` reutiliza la neutral aprobada y `seq_titan_senala_1.png` reutiliza la pose de señalar con brazo recogido. El tercer fotograma de asentir repite exactamente el primero, conforme a la secuencia arriba–abajo–arriba. Estas reutilizaciones son intencionales y no representan generaciones distintas.

Se repitieron las poses de presentar a la izquierda y señalar con ambas manos porque las primeras salidas no cumplían la dirección o el gesto. Se corrigió la pose de observar una gráfica para retirar la laptop y dirigir la mirada fuera de cuadro. También se hicieron pasadas de limpieza en cartel y tarjeta.

## Límites de la entrega

Esta es una biblioteca generada con revisión visual, no una garantía de identidad geométrica exacta. Conserva el parecido general aprobado, la camiseta negra y el estilo humano, pero hay variaciones pequeñas de textura de piel, cabello, luz, escala y orientación entre algunas imágenes.

En H, los fotogramas se generaron tomando una misma imagen base por movimiento. Aun así, hay cambios residuales en el rostro y los pliegues de la camiseta; no se logró mantener todos los píxeles inmóviles fuera del movimiento. Se entregan fotogramas para montaje, no una animación ya estabilizada ni un rig de personaje.

En I, las manos y el torso se mantienen muy próximos a la neutral, pero `titan_mira_izq.png` y `titan_mira_der.png` incluyen algo de giro de cabeza además del movimiento de ojos. Por tanto, la condición estricta de cambiar solo la mirada no se cumple por completo en esas dos piezas.

Los perfiles y el cuerpo completo reconstruyen partes que no están totalmente visibles en el ancla. En `titan_camina.png`, el cuerpo camina hacia la derecha y la cabeza conserva una ligera vuelta hacia cámara.

El alfa real está comprobado por separado del acabado de los bordes. Pueden quedar contornos cálidos finos, especialmente alrededor del cabello y las manos, y márgenes laterales estrechos en algunas poses. En cartel y tarjeta todavía se ven restos claros muy pequeños junto al papel tras la segunda pasada de limpieza. La limpieza solicitada no quedó perfecta en todos los recortes. Conviene revisar la pieza elegida sobre el fondo final antes de publicarla.

Las variantes J mantienen la misma decoración general, pero el fondo y el encuadre tienen diferencias menores entre generaciones. El emblema y los textos se generaron dentro de la imagen; no sustituyen el archivo vectorial oficial de la marca.

No se afirma que las condiciones de consistencia absoluta de la especificación se hayan alcanzado al 100 %. Las 87 piezas están entregadas con estas limitaciones identificadas.

