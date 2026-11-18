# TITÁN · «Tu plata quieta en la cuenta de ahorros» · línea B (plata del día a día) · voz Juan (ElevenLabs)
# Inflación anual oct. 2026: 6,30 % (DANE; El País, 9 nov. 2026). Tasas E.A. de cuentas de ahorro, corte 25 sep. 2026 (Superfinanciera; La República, 29 sep. 2026):
#   Bancolombia 0,07 % · BBVA y AV Villas 0,38 % · Davivienda 0,43 % · Banco de Bogotá 0,54 % · Pichincha 11 % · Contactar 10 % · Ban100 9,93 %.
# Ejemplo HIPOTÉTICO: $10.000.000 un año al 0,43 % E.A. → $10.043.000; lo que costaba $10.000.000 con 6,30 % de inflación → $10.630.000; faltan $587.000.
# 4×1000 (GMF): 4 pesos por cada 1.000 retirados o transferidos; una cuenta marcada como exenta, hasta un tope mensual (Estatuto Tributario, art. 879).
SH = [
 ("gancho", "Tienes diez millones de pesos quietos en la cuenta de ahorros. En un año, el banco te paga cuarenta y tres mil pesos. Pero perdiste más de medio millón."),
 ("cuenta", "Según la Superfinanciera, varias cuentas de bancos grandes pagaban menos del uno por ciento al año. Con el cero coma cuarenta y tres por ciento, tus diez millones se vuelven diez millones cuarenta y tres mil. Pero la inflación fue de seis coma treinta por ciento: lo mismo ahora cuesta diez millones seiscientos treinta mil."),
 ("cierre", "Te faltan unos quinientos ochenta y siete mil pesos. Si es plata que no vas a usar pronto, compara la tasa y haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "Tienes diez millones de pesos quietos en la cuenta de ahorros. En un año, el banco te paga cuarenta y tres mil pesos. Pero perdiste más de medio millón."),
 ("pregunta", "¿Cómo así? Porque mientras tu plata está quieta, todo lo demás sube de precio."),
 ("tasas", "Según la Superfinanciera, en septiembre varias cuentas de bancos grandes pagaban menos del uno por ciento al año: desde cero coma cero siete hasta cero coma cincuenta y cuatro por ciento."),
 ("inflacion", "Y la inflación en Colombia, según el DANE, fue de seis coma treinta por ciento en los últimos doce meses."),
 ("cuenta", "Ejemplo hipotético: al cero coma cuarenta y tres por ciento, tus diez millones se vuelven diez millones cuarenta y tres mil. Pero lo que hace un año costaba diez millones, hoy cuesta diez millones seiscientos treinta mil. Te faltan unos quinientos ochenta y siete mil pesos para comprar lo mismo."),
 ("cuatro", "Y cada vez que sacas o transfieres plata, el cuatro por mil se lleva cuatro pesos de cada mil, salvo en la cuenta que marques como exenta, hasta un tope."),
 ("comparar", "En esa misma lista había entidades que pagaban más del nueve por ciento. No es que una sea mejor para todos: cambian los montos, las condiciones y los requisitos."),
 ("cierre", "La cuenta de ahorros sirve para tener plata a la mano. Pero la plata que no vas a usar pronto, ¿la estás dejando quieta? Compara la tasa efectiva anual y haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("diez millones seiscientos treinta mil", "$10.630.000"), ("diez millones cuarenta y tres mil", "$10.043.000"), ("diez millones de pesos", "$10.000.000"), ("diez millones", "$10.000.000"),
       ("cuarenta y tres mil pesos", "$43.000"), ("quinientos ochenta y siete mil pesos", "$587.000"), ("cero coma cuarenta y tres por ciento", "0,43 %"), ("cero coma cero siete", "0,07 %"),
       ("cero coma cincuenta y cuatro por ciento", "0,54 %"), ("seis coma treinta por ciento", "6,30 %"), ("uno por ciento", "1 %"), ("nueve por ciento", "9 %"), ("cuatro por mil", "4×1000"),
       ("cuatro pesos de cada mil", "$4 de cada $1.000"), ("doce meses", "12 meses")]
