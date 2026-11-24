# TITÁN · «¿No tener tarjeta te sale más caro?» · línea B (plata del día a día) · tema de una referencia de Lady, con cifras, nombres, escenas y frases propias · voz Juan (ElevenLabs)
# Datos: usura nov 2026 = 28,34 % E.A. (Superfinanciera) → 2,101 % mensual (mismas fuentes del video «tarjeta a cuotas»).
# EJEMPLO HIPOTÉTICO: arreglo de $1.000.000. Con historial: préstamo a 12 cuotas fijas a la tasa máxima legal → cuota $95.147 · intereses $141.768 en el año.
#   Sin historial → gota a gota: $40.000 diarios × 30 días = $1.200.000 → $200.000 de intereses en un mes (mismo ejemplo del video «gota a gota»).
#   La tarjeta pagada completa en la fecha no genera intereses de compras a una cuota; el pago mínimo sí genera intereses.
SH = [
 ("gancho", "No tener tarjeta de crédito te puede salir más caro que tenerla."),
 ("ejemplo", "Ejemplo hipotético: Sara paga su tarjeta completa cada mes y arma historial. Mateo nunca ha tenido crédito. A los dos se les daña la moto: un millón de pesos."),
 ("giro", "A Sara, el banco le presta: unos ciento cuarenta y un mil pesos de intereses en todo un año. A Mateo lo rechazan, y en un gota a gota paga doscientos mil en un solo mes."),
 ("cierre", "Ojo: solo funciona si la pagas completa. El problema no es el crédito: es cómo lo usas. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "No tener tarjeta de crédito te puede salir más caro que tenerla."),
 ("creencia", "Mucha gente cree que sin tarjeta se salva de las deudas. Pero mira esta cuenta."),
 ("ejemplo", "Ejemplo hipotético: Sara y Mateo ganan lo mismo. Sara usa la tarjeta solo para el mercado, y cada mes la paga completa. Mateo no quiere saber nada de tarjetas."),
 ("historial", "Como Sara paga el total, no le cobran intereses. Y cada pago a tiempo le arma historial en las centrales de riesgo. Mateo, para el banco, no existe."),
 ("imprevisto", "Un día, a los dos se les daña la moto con la que trabajan. El arreglo cuesta un millón de pesos, y ninguno lo tiene ahorrado."),
 ("sara", "A Sara, el banco le presta. Aun con la tasa máxima legal de noviembre, a doce cuotas paga unos ciento cuarenta y un mil pesos de intereses en todo el año."),
 ("mateo", "A Mateo, el banco lo rechaza por no tener historial. Termina en un gota a gota: cuarenta mil pesos diarios durante treinta días. Doscientos mil pesos de intereses en un solo mes."),
 ("letra", "Ojo: la tarjeta solo ayuda si la pagas completa. Si pagas el mínimo, el que termina pagando intereses eres tú."),
 ("cierre", "El problema no es el crédito: es cómo lo usas. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("un millón de pesos", "$1.000.000"), ("ciento cuarenta y un mil pesos", "$141.768"), ("doscientos mil pesos", "$200.000"), ("doscientos mil", "$200.000"),
       ("cuarenta mil pesos", "$40.000"), ("treinta días", "30 días"), ("doce cuotas", "12 cuotas")]
