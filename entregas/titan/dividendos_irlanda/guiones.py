# TITÁN · «Te pagan 100 dólares de dividendos… y te llegan 70» · serie «Lo que nadie te dice si inviertes en EE. UU. desde Colombia» · voz Juan (ElevenLabs)
# Datos: retención del 30 % a extranjeros sobre dividendos de EE. UU. (IRS Pub. 515); Colombia no tiene tratado de renta con EE. UU. (IRS, tabla 3; solo TIEA de 2001).
# ETF domiciliado en Irlanda: 15 % dentro del fondo (tratado Irlanda–EE. UU.); Irlanda no retiene a no residentes; clase acumulativa reinvierte (no hay pago al inversionista).
# Ejemplo HIPOTÉTICO: USD 100 de dividendos → ETF de EE. UU.: te quedan 70 · ETF irlandés acumulativo: se reinvierten 85. Sin nombres de ETF (no es recomendación).
SH = [
 ("gancho", "Te pagan cien dólares de dividendos de una acción de Estados Unidos… y te llegan setenta."),
 ("regla", "Si no vives allá, el i erre ese te retiene el treinta por ciento. Y Colombia no tiene tratado de impuestos con Estados Unidos que lo rebaje."),
 ("irlanda", "¿Se puede pagar menos? Sí: con e te efe domiciliados en Irlanda. Por su tratado, el fondo paga quince por ciento, no treinta. Y si es acumulativo, reinvierte los dividendos por ti."),
 ("ojo", "Pero ojo: no es pagar cero. Ese quince por ciento se descuenta dentro del fondo, y en Colombia igual declaras."),
 ("cierre", "Antes de comprar, revisa dónde está domiciliado tu e te efe. Y asesórate con un experto en los dos países."),
]
TK = [
 ("gancho", "Te pagan cien dólares de dividendos de una acción de Estados Unidos… y te llegan setenta. ¿Dónde quedó el resto?"),
 ("regla", "Si no vives en Estados Unidos, el i erre ese retiene el treinta por ciento de tus dividendos antes de que lleguen a tu cuenta. Y como Colombia no tiene tratado de impuestos con Estados Unidos, no hay rebaja."),
 ("irlanda", "¿Hay forma de pagar menos? Sí: los e te efe domiciliados en Irlanda. Por el tratado entre Irlanda y Estados Unidos, el fondo paga quince por ciento, no treinta. Y si eliges la versión acumulativa, el fondo reinvierte los dividendos por ti."),
 ("ejemplo", "Ejemplo hipotético: cien dólares de dividendos. En un e te efe de Estados Unidos te quedan setenta. En uno irlandés acumulativo se reinvierten ochenta y cinco."),
 ("ojo", "Pero ojo: no es pagar cero. Ese quince por ciento se descuenta dentro del fondo. Y en Colombia igual declaras tu inversión, y la ganancia cuando vendes."),
 ("bono", "Y hay un bono: como no son activos de Estados Unidos, los e te efe irlandeses tampoco cuentan para el impuesto de herencia del que te hablamos."),
 ("cierre", "Antes de comprar, revisa dónde está domiciliado tu e te efe. Ese detalle cambia cuánto te queda. Asesórate con un experto en los dos países."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("i erre ese", "IRS"), ("e te efe", "ETF"), ("cien dólares", "USD 100"), ("setenta", "70"), ("treinta por ciento", "30 %"), ("quince por ciento", "15 %"), ("ochenta y cinco", "85"), ("treinta", "30")]
