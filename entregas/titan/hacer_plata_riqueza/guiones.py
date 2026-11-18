# TITÁN · «Hacer plata no es lo mismo que construir riqueza» · línea A · adaptado del tema de un video de referencia (guion propio)
# SPY: dividendos por acción, suma anual (Yahoo Finance): 2006 USD 2,45 · 2025 USD 7,28 (×2,97). Antes de la retención del 30 % para quien invierte desde Colombia.
SH = [
 ("gancho", "Hacer plata y construir riqueza no son lo mismo. Y casi todo el mundo se enfoca en la primera."),
 ("dato", "Una acción del fondo que copia al ese ene pe quinientos pagaba en dos mil seis unos dos dólares con cuarenta y cinco de dividendos al año. En dos mil veinticinco, esa misma acción pagó siete con veintiocho. Casi el triple, sin trabajar una hora más."),
 ("ojo", "Ojo: desde Colombia te retienen el treinta por ciento de esos dividendos, y en años malos pueden bajar."),
 ("cierre", "La plata de hoy se gasta una vez. Lo que construyes puede seguir pagando. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "Hacer plata y construir riqueza no son lo mismo. Y casi todo el mundo se enfoca en la primera."),
 ("diferencia", "Hacer plata es cobrar por lo que hiciste hoy: un turno, un trabajo, una venta. Te pagan una vez. Construir riqueza es tener algo que te sigue pagando cuando ya terminaste."),
 ("trampa", "El problema es que lo que construye riqueza casi nunca paga rápido. Por eso, cuando necesitas la plata ya, siempre parece que puede esperar."),
 ("dato", "Mira esto. Una acción del fondo que copia al ese ene pe quinientos pagaba en dos mil seis unos dos dólares con cuarenta y cinco de dividendos en el año. En dos mil veinticinco, esa misma acción pagó siete con veintiocho. Casi el triple, sin que su dueño trabajara una hora más."),
 ("ojo", "Ojo: si inviertes desde Colombia, Estados Unidos te retiene el treinta por ciento de esos dividendos. Y los dividendos pueden bajar: en dos mil nueve, cayeron."),
 ("cierre", "Claro, todos tenemos cuentas que pagar este mes. Pero que la plata de este mes no te impida construir lo que te puede pagar por años. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("ese ene pe quinientos", "S&P 500"), ("dos dólares con cuarenta y cinco", "USD 2,45"), ("siete con veintiocho", "USD 7,28"), ("dos mil veinticinco", "2025"),
       ("dos mil seis", "2006"), ("dos mil nueve", "2009"), ("treinta por ciento", "30 %")]
