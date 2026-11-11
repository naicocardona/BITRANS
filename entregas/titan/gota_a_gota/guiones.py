# TITÁN · «El gota a gota: el préstamo que te cobra casi 10 veces la tasa legal» · voz Juan (ElevenLabs). Números en palabras para la voz.
# Datos: usura nov 2026 = 28,34 % E.A. (Superfinanciera) → 2,10 % mensual → $21.010 por $1.000.000 en un mes.
# Ejemplo hipotético: $1.000.000, 30 cuotas diarias de $40.000 = $1.200.000 (20 % en un mes; 0,20/0,0210 = 9,5 veces).
# 1,2^12 = 8,916 → $8.916.100 si la deuda sube 20 % cada mes durante 12 meses (hipotético).
SH = [
 ("gancho", "Te prestan un millón sin papeles y sin preguntas. Ahora mira cuánto te cuesta."),
 ("cobro", "Ejemplo hipotético: pagas cuarenta mil pesos diarios durante treinta días. Al final del mes entregaste un millón doscientos mil."),
 ("usura", "Son doscientos mil pesos de intereses en un mes. Con la tasa de usura de noviembre, lo máximo legal serían unos veintiún mil. Casi diez veces menos."),
 ("bola", "Y si la deuda sube veinte por ciento cada mes, a los doce meses ese millón se vuelve casi nueve millones."),
 ("cierre", "Cobrar por encima de la usura es delito en Colombia. Si te amenazan, denuncia al GAULA en la línea ciento sesenta y cinco."),
]
TK = [
 ("gancho", "Te prestan un millón sin papeles y sin preguntas. Ahora mira cuánto te cuesta."),
 ("como", "Así funciona el gota a gota: solo piden tu cédula, no revisan tu historial, y un cobrador pasa en moto todos los días."),
 ("cobro", "Ejemplo hipotético: te prestan un millón y pagas cuarenta mil pesos diarios durante treinta días. Al final del mes entregaste un millón doscientos mil."),
 ("usura", "Son doscientos mil pesos de intereses en un mes. En noviembre, la tasa de usura es veintiocho coma treinta y cuatro por ciento efectivo anual. Para ese millón, lo máximo legal en un mes serían unos veintiún mil pesos. El gota a gota te cobra casi diez veces más."),
 ("bola", "Y si un día no pagas y renuevas, el problema crece. Si la deuda sube veinte por ciento cada mes, a los doce meses ese millón se vuelve casi nueve millones."),
 ("salida", "¿Qué hacer? Antes de pedir, compara: bancos, cooperativas y microcréditos tienen tope legal. Cobrar por encima de la usura es delito, y las amenazas se denuncian al GAULA, en la línea ciento sesenta y cinco."),
 ("cierre", "La plata fácil casi nunca sale barata. Comparte este video con quien lo necesite."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("un millón doscientos mil", "$1.200.000"), ("cuarenta mil pesos", "$40.000"), ("doscientos mil pesos", "$200.000"), ("veintiún mil pesos", "$21.000"), ("veintiún mil", "$21.000"),
       ("veintiocho coma treinta y cuatro por ciento", "28,34 %"), ("veinte por ciento", "20 %"), ("ciento sesenta y cinco", "165"), ("casi nueve millones", "casi $9 millones"),
       ("treinta días", "30 días"), ("doce meses", "12 meses"), ("diez veces", "10 veces"), ("un millón", "$1 millón")]
