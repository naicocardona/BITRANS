# TITÁN · «El Nasdaq tocó mercado bajista… y se recuperó el mismo día» · línea A · noticia (miércoles 25 nov 2026; se publica el jueves 26) · voz Juan
# Yahoo Finance (datos/): Nasdaq 100 máx. 6 oct 2026 31.361,37 · 25 nov: mín. 24.970,66 (−4,74 % vs. cierre previo 26.214,17; −20,38 % vs. máx.) · cierre 26.046,90 (−0,64 %).
#   Mínimo en la mañana (barra de 5 min de las 9:40 a. m. ET). S&P 500: mín. −3,21 %, cierre −0,25 % (7.182,78). NVDA cierre USD 149,30 (−38,65 % vs. máx. 6 oct USD 243,37).
# Motivos según reportes (Motley Fool, Stock Titan, 25 nov 2026): inflación PCE más alta de lo esperado, dudas sobre el gasto en IA, propuestas de aranceles.
# Horario (NYSE, Nasdaq): jueves 26 nov cerrado por Acción de Gracias; viernes 27 cierre a la 1:00 p. m. ET (= 1:00 p. m. Colombia).
SH = [
 ("gancho", "Ayer, el Nasdaq cien llegó a estar veinte por ciento por debajo de su máximo. Y terminó el día casi como si nada."),
 ("dato", "En la mañana cayó casi cinco por ciento y tocó lo que se llama un mercado bajista. Pero en la tarde se recuperó, y cerró bajando apenas cero coma seis."),
 ("festivo", "Y ojo: hoy la bolsa de Estados Unidos está cerrada por Acción de Gracias, y mañana cierra a la una de la tarde, hora de Colombia."),
 ("cierre", "Lo peor y lo mejor pueden llegar el mismo día. Importa más tu plan que el titular. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "Ayer, el Nasdaq cien llegó a estar veinte por ciento por debajo de su máximo. Y terminó el día casi como si nada."),
 ("dato", "Apenas abrió la bolsa el miércoles, el índice de las grandes tecnológicas se desplomaba casi cinco por ciento. Llegó a estar veinte coma cuatro por ciento abajo de su máximo del seis de octubre."),
 ("bajista", "A eso se le llama mercado bajista: cuando un índice cae veinte por ciento o más desde su punto más alto."),
 ("rebote", "Pero en la tarde se recuperó, y cerró con una caída de apenas cero coma seis por ciento."),
 ("porque", "¿Qué lo movió? Según los reportes, una inflación en Estados Unidos más alta de lo esperado, dudas sobre cuánto se está gastando en inteligencia artificial, y nuevas propuestas de aranceles. Envidia, por ejemplo, ya va casi treinta y nueve por ciento abajo desde su máximo de octubre."),
 ("festivo", "Y ojo: hoy la bolsa de Estados Unidos está cerrada por Acción de Gracias, y mañana viernes cierra a la una de la tarde, hora de Colombia."),
 ("leccion", "Lo de ayer es lo que te contamos hace unos días: los peores momentos y los mejores llegan pegados. Esta vez, en un mismo día."),
 ("cierre", "Nadie sabe si esto sigue o se devuelve. Por eso importa más tu plan que el titular del día. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("Nasdaq cien", "Nasdaq 100"), ("Envidia", "Nvidia"), ("veinte coma cuatro por ciento", "20,4 %"), ("veinte por ciento", "20 %"), ("casi cinco por ciento", "casi 5 %"),
       ("cero coma seis por ciento", "0,6 %"), ("cero coma seis", "0,6 %"), ("casi treinta y nueve por ciento", "casi 39 %"), ("seis de octubre", "6 de octubre"), ("a la una de la tarde", "a la 1:00 p. m.")]
