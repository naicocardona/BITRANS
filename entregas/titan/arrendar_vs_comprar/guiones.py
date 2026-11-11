# TITÁN · «¿Arrendar o comprar casa? La cuenta que nadie hace» · voz Juan (ElevenLabs). Números en palabras para la voz.
# Ejemplo hipotético: apartamento $300 M; arriendo 0,5 % mensual = $1,5 M (mercado ~0,5–0,7 %; tope legal 1 %, Ley 820/2003 art. 18).
# Compra: cuota inicial 30 % = $90 M; crédito $210 M a 20 años, 15,46 % E.A. (promedio No VIS, Superfinanciera, fin de oct 2026)
#   → cuota $2.682.126 (sin seguros); año 1: intereses $30.244.562, abono a capital $1.940.954; total intereses 20 años $433,7 M.
# CDT ~12 % E.A. (rango 360 días nov 2026: 10,8–13,4 %) sobre $90 M = $10,8 M/año antes de impuestos.
# Año 1 sin recuperar: compra 30,24 + 10,8 = $41,0 M; arriendo $18 M. Incremento arriendo 2026 ≤ 5,10 % (IPC 2025).
SH = [
 ("gancho", "¿Arrendar es botar la plata? Hagamos la cuenta que casi nadie hace."),
 ("casa", "Ejemplo hipotético: un apartamento de trescientos millones. Arrendarlo cuesta un millón quinientos mil al mes."),
 ("compra", "Para comprarlo das noventa millones de cuota inicial y pides doscientos diez al banco, a veinte años. La cuota es de unos dos millones seiscientos ochenta mil."),
 ("truco", "Pero el primer año, más de treinta millones de lo que pagas son intereses. A tu deuda solo abonas unos dos millones."),
 ("cierre", "Arrendar no siempre es botar la plata, y comprar no siempre es ganar. Depende de cuánto tiempo te quedes y de cuánto se valorice. Haz tu cuenta antes de firmar."),
]
TK = [
 ("gancho", "¿Arrendar es botar la plata? Hagamos la cuenta que casi nadie hace."),
 ("casa", "Ejemplo hipotético: un apartamento de trescientos millones. Arrendarlo cuesta un millón quinientos mil al mes."),
 ("compra", "Para comprarlo das noventa millones de cuota inicial y pides doscientos diez al banco, a veinte años, con una tasa promedio cercana al quince coma cinco por ciento. La cuota es de unos dos millones seiscientos ochenta mil."),
 ("truco", "Ahora, la cuenta que nadie hace. El primer año, más de treinta millones de lo que pagas son intereses. A tu deuda solo abonas unos dos millones."),
 ("oportunidad", "Y esos noventa millones de la cuota inicial podrían rendir. En un ce de te al doce por ciento, serían unos diez millones al año, antes de impuestos."),
 ("suma", "Suma: el primer año, comprar te cuesta unos cuarenta y un millones que no recuperas. Arrendar, dieciocho millones."),
 ("otro", "Entonces, ¿siempre gana arrendar? No. El arriendo sube cada año, y en dos mil veintiséis puede subir hasta cinco coma uno por ciento. La vivienda se puede valorizar, y cuando terminas de pagar, es tuya."),
 ("cierre", "La respuesta depende de cuánto tiempo te vas a quedar, de la tasa que consigas y de cuánto se valorice. Haz tu cuenta antes de firmar."),
]
text = lambda L: " ".join(t for _, t in L)
