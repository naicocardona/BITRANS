# TITÁN · «¿A cuántas cuotas? La pregunta que te puede costar 435.000 pesos» · línea B (plata del día a día) · voz Juan (ElevenLabs)
# Datos (16 nov 2026): usura nov 2026 28,34 % E.A. (Superfinanciera, Res. 1707/2026) → 2,101 % mensual. Ejemplo HIPOTÉTICO: compra de $1.000.000 a la tasa máxima legal.
# Intereses totales según el método del banco: abono fijo a capital (intereses sobre saldo) / cuota fija (francés):
#   12 cuotas: $136.568 / $141.768 · 24 cuotas: $262.630 / $283.477 · 36 cuotas: $388.693 / $435.403 (cuota mes 1: $48.788 / $39.872). 1 cuota: casi siempre sin intereses (Rankia).
# Tasas reales de tarjetas: ~12 % a ~28 % E.A. según el banco (El País, corte oct 2026). Prepago sin penalidad: Ley 1555 de 2012. Black Friday Colombia: 27 nov 2026.
SH = [
 ("gancho", "Compraste un televisor de un millón de pesos con tarjeta… y terminaste pagando casi un millón cuatrocientos mil."),
 ("cuenta", "Ejemplo hipotético, con la tasa máxima legal de noviembre: a una cuota, normalmente no pagas intereses. A treinta y seis cuotas, pagas entre trescientos ochenta y nueve mil y cuatrocientos treinta y cinco mil pesos de más."),
 ("porque", "¿Por qué? Porque cada mes te cobran intereses sobre lo que todavía debes. Más cuotas, más meses pagando intereses."),
 ("cierre", "Se viene el Black Friday. Antes de decir treinta y seis cuotas, haz la cuenta."),
]
TK = [
 ("gancho", "Compraste un televisor de un millón de pesos con tarjeta… y terminaste pagando casi un millón cuatrocientos mil."),
 ("pregunta", "Todo depende de una pregunta que te hacen en la caja: ¿a cuántas cuotas? Y casi nadie hace la cuenta."),
 ("cuenta", "Ejemplo hipotético, con la tasa máxima legal de noviembre: veintiocho coma treinta y cuatro por ciento efectivo anual. A una cuota, normalmente no pagas intereses. A doce cuotas, pagas unos ciento cuarenta mil pesos de más. Y a treinta y seis cuotas, entre trescientos ochenta y nueve mil y cuatrocientos treinta y cinco mil, según cómo calcule tu banco."),
 ("porque", "¿Por qué? Porque cada mes te cobran intereses sobre lo que todavía debes. Más cuotas, más meses pagando intereses. La cuota se ve pequeña, pero el total crece."),
 ("salida", "¿Qué hacer? Si puedes, paga a una cuota. Y si ya diferiste, puedes abonar a capital: la ley te permite pagar antes sin penalidad, y así pagas menos intereses."),
 ("cierre", "Se viene el Black Friday. Antes de decir treinta y seis cuotas, revisa la tasa de tu tarjeta y haz la cuenta."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("un millón cuatrocientos mil", "$1.400.000"), ("un millón de pesos", "$1.000.000"), ("veintiocho coma treinta y cuatro por ciento", "28,34 %"),
       ("ciento cuarenta mil pesos", "$140.000"), ("trescientos ochenta y nueve mil", "$389.000"), ("cuatrocientos treinta y cinco mil pesos", "$435.000"), ("cuatrocientos treinta y cinco mil", "$435.000"),
       ("treinta y seis cuotas", "36 cuotas"), ("doce cuotas", "12 cuotas"), ("una cuota", "1 cuota")]
