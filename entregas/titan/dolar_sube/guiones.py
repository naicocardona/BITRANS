# TITÁN · «El dólar subió casi 10 % en ocho días» · línea A · noticia + serie «¿solo pesos o también dólares?» · voz Juan (ElevenLabs)
# TRM oficial (Banco de la República vía datos.gov.co, datos/TRM_datosgov.json): 18 nov 2026 $3.309,55 → vigente 26–27 nov $3.630,89 (+9,71 %).
# Motivos según analistas: Ley de Rescate económico (proyecto 477 de 2026, Cámara; impuestos y recortes; primer debate a más tardar el 2 dic) y petróleo (Infobae 22 y 25 nov 2026; INCP; El Heraldo).
# EJEMPLO HIPOTÉTICO: USD 1.000 → $3.309.550 (18 nov) vs. $3.630.890 (27 nov) = +$321.340.
SH = [
 ("gancho", "En ocho días, el dólar en Colombia subió casi diez por ciento."),
 ("dato", "La tasa oficial pasó de tres mil trescientos nueve pesos a tres mil seiscientos treinta. Ejemplo hipotético: mil dólares pasaron de valer tres millones trescientos nueve mil pesos a tres millones seiscientos treinta mil."),
 ("ojo", "Pero también funciona al revés: si el dólar baja, esos dólares valen menos en pesos. Y si tienes deudas en dólares, hoy te cuestan más."),
 ("cierre", "Nadie sabe dónde va a estar el dólar. Por eso hay quien no pone todo en una sola moneda. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "En ocho días, el dólar en Colombia subió casi diez por ciento. Y si tenías dólares, valen más sin que hicieras nada."),
 ("dato", "La tasa oficial pasó de tres mil trescientos nueve pesos el dieciocho de noviembre, a tres mil seiscientos treinta, la que rige para hoy. Eso sí: en enero estaba en tres mil setecientos noventa. Subió fuerte, pero todavía está por debajo de donde empezó el año."),
 ("porque", "¿Por qué? Según analistas, por el nerviosismo con la Ley de Rescate, el proyecto del Gobierno con impuestos y recortes que se discute en el Congreso, y por el precio del petróleo."),
 ("ejemplo", "Ejemplo hipotético: si tenías mil dólares, el dieciocho de noviembre valían tres millones trescientos nueve mil pesos. Hoy valen tres millones seiscientos treinta mil. Son trescientos veintiún mil pesos más, solo por el cambio."),
 ("ojo", "Ojo: también funciona al revés. Si el dólar baja, esos mismos dólares valen menos en pesos. Y si tienes deudas en dólares, hoy te cuestan más."),
 ("leccion", "Por eso hay gente que no tiene todo en una sola moneda: una parte en pesos y otra en dólares. No para adivinar el dólar, sino para no depender de uno solo."),
 ("cierre", "Nadie sabe dónde va a estar el dólar en diciembre. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("casi diez por ciento", "casi 10 %"), ("tres mil trescientos nueve pesos", "$3.309,55"), ("tres mil seiscientos treinta", "$3.630,89"), ("dieciocho de noviembre", "18 de noviembre"),
       ("mil dólares", "USD 1.000"), ("tres millones trescientos nueve mil pesos", "$3.309.550"), ("tres millones seiscientos treinta mil", "$3.630.890"), ("trescientos veintiún mil pesos", "$321.340"), ("ocho días", "8 días"), ("tres mil setecientos noventa", "$3.790,77")]
