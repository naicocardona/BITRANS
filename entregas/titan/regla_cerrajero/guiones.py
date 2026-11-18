# TITÁN · «La regla del cerrajero» · línea A · adaptado del tema de un video de referencia (guion propio)
# Visa, año fiscal 2025 (a 30 sep. 2025): ingresos netos USD 40.000 millones; 257.500 millones de transacciones procesadas (Visa, informe anual 2025) → ≈ USD 0,155 por transacción (cálculo TITÁN).
SH = [
 ("gancho", "Si se te queda la llave adentro a las dos de la mañana, le pagas al cerrajero sin pensarlo. No pagas sus cinco minutos. Pagas salir del problema."),
 ("dato", "Las empresas que más ganan hacen lo mismo. Visa cobra una fracción por cada pago: en su último año fiscal procesó doscientos cincuenta y siete mil millones de transacciones y facturó cuarenta mil millones de dólares. Unos quince centavos por pago."),
 ("cierre", "Cuando compras una acción, compras un pedazo de ese negocio. Pregúntate qué problema resuelve. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "Si se te queda la llave adentro a las dos de la mañana, le pagas al cerrajero sin pensarlo. Abrir te toma cinco minutos. No pagas su esfuerzo: pagas salir del problema."),
 ("regla", "Esa es la regla: la gente no paga por lo difícil que fue hacer algo, sino por lo que le resuelve. Comodidad, tiempo, tranquilidad."),
 ("dato", "Y las empresas que más ganan viven de eso. Visa no presta plata: cobra una fracción cada vez que alguien paga con tarjeta. En su año fiscal dos mil veinticinco procesó doscientos cincuenta y siete mil millones de transacciones y facturó cuarenta mil millones de dólares. Unos quince centavos por pago, miles de millones de veces."),
 ("accion", "Cuando compras una acción, no compras un papelito que sube y baja. Compras un pedazo de un negocio. Y a largo plazo, ese pedazo vale lo que el negocio logre cobrar."),
 ("ojo", "Ojo: un buen negocio no siempre es una buena compra. Si pagas demasiado por la acción, igual puedes perder."),
 ("cierre", "Antes de invertir, pregúntate: ¿qué problema resuelve esta empresa, y cuánta gente pagaría por eso? Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("dos de la mañana", "2 a. m."), ("cinco minutos", "5 minutos"), ("doscientos cincuenta y siete mil millones", "257.000 millones"), ("cuarenta mil millones de dólares", "USD 40.000 millones"),
       ("quince centavos", "USD 0,15"), ("dos mil veinticinco", "2025")]
