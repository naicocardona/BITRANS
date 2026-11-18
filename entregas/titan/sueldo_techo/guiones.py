# TITÁN · «Tu sueldo tiene techo» · línea B · adaptado del tema de un video de referencia (guion propio)
# Paradoja del agua y el diamante: Adam Smith, «La riqueza de las naciones», 1776. Salario mínimo 2026: $1.750.905 (Decreto 1469 de 2025).
SH = [
 ("gancho", "El agua te mantiene vivo y casi no cuesta nada. Un diamante no te sirve para nada y cuesta una fortuna. Con tu sueldo pasa lo mismo."),
 ("regla", "Adam Smith lo explicó en mil setecientos setenta y seis: el precio no lo pone lo útil, sino lo escaso. No te pagan por lo duro que trabajas. Te pagan por lo difícil que es reemplazarte. Y además, tu sueldo tiene un techo: las horas del día."),
 ("cierre", "Lo que inviertes no tiene horario. Que tu sueldo no sea lo único que trabaja por ti. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "El agua te mantiene vivo y casi no cuesta nada. Un diamante no te sirve para nada y cuesta una fortuna. Con tu sueldo pasa exactamente lo mismo."),
 ("smith", "Esa pregunta se la hizo Adam Smith en mil setecientos setenta y seis. La respuesta: el precio no lo pone lo útil que es algo, sino lo escaso."),
 ("sueldo", "Por eso, muchos de los trabajos más duros pagan poco. No porque valgan menos, sino porque es fácil conseguir a otra persona que los haga. En Colombia, el salario mínimo de dos mil veintiséis es de un millón setecientos cincuenta mil novecientos cinco pesos, y lo gana gente que trabaja muy duro."),
 ("techo", "Y hay un segundo problema: tu sueldo tiene techo. Por mucho que te esfuerces, el día tiene veinticuatro horas. Si dejas de trabajar, deja de llegar."),
 ("salida", "Hay dos salidas: volverte más difícil de reemplazar, aprendiendo algo escaso, y poner a trabajar una parte de lo que ganas. Lo que inviertes no tiene horario."),
 ("cierre", "Que tu sueldo no sea lo único que trabaja por ti. Empieza por lo que puedas y haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("mil setecientos setenta y seis", "1776"), ("un millón setecientos cincuenta mil novecientos cinco pesos", "$1.750.905"), ("dos mil veintiséis", "2026"), ("veinticuatro horas", "24 horas")]
