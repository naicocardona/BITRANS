# TITÁN · «¿Esperar el momento perfecto para invertir?» · línea A · serie «La cuenta que nadie hace» · voz Juan (ElevenLabs)
# Datos: SPY (ETF del S&P 500), cierres ajustados por dividendos, Yahoo Finance, 20 nov 2006 → 20 nov 2026 (5.031 días de bolsa). Cálculo TITÁN en datos/resultados.json.
#   USD 10.000 sin tocar → USD 70.768 · sin los 10 mejores días → 30.708 · sin los 20 → 18.470 · sin los 30 → 12.267.
#   8 de los 10 mejores días llegaron a 6 días o menos de uno de los 20 peores (2008, 2020, 9 abr 2025: +10,50 % cinco días después del −5,85 % del 4 abr 2025).
#   Sin comisiones ni impuestos; pasado, no promesa.
SH = [
 ("gancho", "Si en los últimos veinte años te perdías solo diez días de bolsa, te quedabas con menos de la mitad."),
 ("cuenta", "Diez mil dólares en el ese ene pe quinientos desde noviembre de dos mil seis, sin tocarlos, hoy serían unos setenta mil setecientos. Sin los diez mejores días, unos treinta mil setecientos."),
 ("cuando", "Y ocho de esos diez días llegaron a menos de una semana de uno de los peores. Quien se sale por miedo suele perderse el rebote."),
 ("cierre", "Nadie sabe cuál será el próximo mejor día. Esperar el momento perfecto también cuesta. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "Si en los últimos veinte años te perdías solo diez días de bolsa, te quedabas con menos de la mitad."),
 ("dato", "Mira la cuenta. Diez mil dólares en el ese ene pe quinientos desde noviembre de dos mil seis, con los dividendos reinvertidos y sin tocarlos, hoy serían unos setenta mil setecientos."),
 ("diez", "Pero en esos veinte años hubo unos cinco mil días de bolsa. Si te perdías solo los diez mejores, te quedaban unos treinta mil setecientos. Menos de la mitad."),
 ("mas", "Sin los veinte mejores días, unos dieciocho mil quinientos. Sin los treinta mejores, apenas unos doce mil trescientos."),
 ("cuando", "¿Y cuándo fueron esos días? Ocho de los diez mejores llegaron a menos de una semana de uno de los peores: en la crisis de dos mil ocho, en la pandemia y en abril del año pasado."),
 ("miedo", "El nueve de abril de dos mil veinticinco, la bolsa subió diez coma cinco por ciento en un día. Cinco días antes había caído casi seis. Quien se salió por miedo se perdió el rebote."),
 ("ojo", "Ojo: es un cálculo con el pasado, sin comisiones ni impuestos. No dice qué va a pasar."),
 ("cierre", "Nadie sabe cuál será el próximo mejor día. Por eso esperar el momento perfecto también tiene un costo. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("diez mil dólares", "USD 10.000"), ("setenta mil setecientos", "USD 70.700"), ("treinta mil setecientos", "USD 30.700"), ("dieciocho mil quinientos", "USD 18.500"),
       ("doce mil trescientos", "USD 12.300"), ("cinco mil días", "5.000 días"), ("ese ene pe quinientos", "S&P 500"), ("dos mil seis", "2006"), ("dos mil ocho", "2008"),
       ("dos mil veinticinco", "2025"), ("diez coma cinco por ciento", "10,5 %"), ("nueve de abril", "9 de abril"), ("veinte años", "20 años"), ("diez mejores", "10 mejores"),
       ("veinte mejores", "20 mejores"), ("treinta mejores", "30 mejores"), ("diez días", "10 días"), ("ocho de", "8 de")]
