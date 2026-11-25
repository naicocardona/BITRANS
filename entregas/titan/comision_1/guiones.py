# TITÁN · «El 1 % que te come una cuarta parte» · línea A · serie «La cuenta que nadie hace» · voz Juan (ElevenLabs)
# EJEMPLO HIPOTÉTICO (cálculo TITÁN): USD 10.000 a 7 % anual compuesto 30 años → 76.123; con 1 % de comisión anual (≈ 6 % neto) → 57.435; diferencia 18.688 (−24,5 %).
# Sin nombrar entidades: no se recomienda ni se critica ningún fondo o plataforma.
SH = [
 ("gancho", "Una comisión de solo uno por ciento al año te puede quitar casi una cuarta parte de tu plata."),
 ("cuenta", "Ejemplo hipotético: diez mil dólares al siete por ciento durante treinta años serían unos setenta y seis mil cien. Con una comisión de uno por ciento, ganas seis: unos cincuenta y siete mil cuatrocientos."),
 ("porque", "Casi dieciocho mil setecientos dólares menos, porque la comisión se cobra cada año sobre todo lo que ya creció."),
 ("cierre", "Pregunta la comisión anual y haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "Una comisión de solo uno por ciento al año te puede quitar casi una cuarta parte de tu plata."),
 ("cuenta", "Ejemplo hipotético: inviertes diez mil dólares y crecen siete por ciento al año. En treinta años, serían unos setenta y seis mil cien."),
 ("comision", "Pero si te cobran uno por ciento al año, en la práctica ganas seis. Y en treinta años terminas con unos cincuenta y siete mil cuatrocientos."),
 ("diferencia", "Son casi dieciocho mil setecientos dólares menos. Casi una cuarta parte, por algo que parecía pequeño."),
 ("porque", "¿Por qué? Porque la comisión no se cobra una sola vez. Se cobra cada año, sobre todo lo que ya creció. El primer año te cobran unos cien dólares; el año treinta, más de quinientos. Y además pierdes todo lo que esa plata habría crecido. Es el interés compuesto, pero en tu contra."),
 ("ojo", "Ojo: cobrar no es malo. Administrar tu plata cuesta. El problema es no saber cuánto te cobran."),
 ("cierre", "Antes de invertir, pregunta la comisión anual y haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("uno por ciento", "1 %"), ("siete por ciento", "7 %"), ("diez mil dólares", "USD 10.000"), ("setenta y seis mil cien", "USD 76.123"), ("cincuenta y siete mil cuatrocientos", "USD 57.435"),
       ("dieciocho mil setecientos dólares", "USD 18.688"), ("treinta años", "30 años"), ("ganas seis", "ganas 6 %"), ("unos cien dólares", "unos USD 100"), ("más de quinientos", "más de USD 500")]
# Pausas de lectura en el Short (llega a 35 s sin acelerar la voz).
PAUSAS = {"sh": [("cuarta parte de tu plata.", 0.6), ("cincuenta y siete mil cuatrocientos.", 0.8), ("lo que ya creció.", 0.6)]}
