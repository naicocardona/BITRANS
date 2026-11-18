# TITÁN · «Tiempo o plata» · línea B · adaptado del tema de un video de referencia (guion propio)
# Whillans, Dunn, Smeets, Bekkers y Norton, «Buying time promotes happiness», PNAS 2017: encuestas en EE. UU., Canadá, Dinamarca y Países Bajos; gastar en servicios que ahorran tiempo se asoció con mayor satisfacción con la vida.
# Ejemplo HIPOTÉTICO con datos reales (tools/dca/calc.py): USD 100/mes en SPY, dividendos con retención 30 %: 10 años (nov. 2016–oct. 2026) USD 12.000 → 25.792; 20 años (nov. 2006–oct. 2026) USD 24.000 → 103.802.
SH = [
 ("gancho", "Cuando no tienes plata, pagas con tiempo. Cuando tienes plata, compras tiempo. Y al invertir, el tiempo es lo que más pesa."),
 ("dato", "Ejemplo hipotético con datos reales: cien dólares al mes en el ese ene pe quinientos. En diez años pusiste doce mil y hoy valen veinticinco mil ochocientos. En veinte años pusiste el doble, veinticuatro mil, y hoy valen ciento tres mil ochocientos. Cuatro veces más."),
 ("cierre", "El tiempo que no recuperas es el que no invertiste. Empieza con lo que puedas y haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "Cuando no tienes plata, pagas con tiempo. Cuando tienes plata, compras tiempo. Y casi nadie hace la cuenta de cuánto vale el suyo."),
 ("ejemplos", "Cruzas la ciudad porque allá el mercado sale un poco más barato. Haces la fila de dos horas para ahorrarte el trámite pagado. Cada hora que pagas así es una hora que no usaste para aprender, descansar o ganar más."),
 ("estudio", "Un estudio publicado en dos mil diecisiete por investigadores de Harvard y otras universidades, con encuestas en cuatro países, encontró que gastar en ahorrarte tiempo se asocia con más satisfacción con la vida."),
 ("invertir", "Y al invertir, el tiempo pesa todavía más. Ejemplo hipotético con datos reales: cien dólares al mes en el ese ene pe quinientos. En diez años pusiste doce mil, y hoy valen veinticinco mil ochocientos. En veinte años pusiste el doble, veinticuatro mil, y hoy valen ciento tres mil ochocientos. Cuatro veces más."),
 ("ojo", "Ojo: eso es lo que pasó, no una promesa. Los próximos años pueden ser distintos."),
 ("cierre", "Tu tiempo también es plata. Y el tiempo que no recuperas es el que no invertiste. Empieza con lo que puedas y haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("dos mil diecisiete", "2017"), ("cien dólares", "USD 100"), ("ese ene pe quinientos", "S&P 500"), ("doce mil", "USD 12.000"), ("veinticinco mil ochocientos", "USD 25.800"),
       ("veinticuatro mil", "USD 24.000"), ("ciento tres mil ochocientos", "USD 103.800"), ("diez años", "10 años"), ("veinte años", "20 años"), ("cuatro países", "4 países"), ("dos horas", "2 horas")]
