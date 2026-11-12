# TITÁN · Reflexión «Si hoy estás en el piso, es tu punto de partida» · guion aprobado por Lady (12 nov 2026), en primera persona plural («nosotros» = TITÁN). Voz: Juan (ElevenLabs).
# Visual: noche (navy) → amanecer (dorado); persona genérica que sube una escalera, cae, se queda en el piso, se levanta y sigue. Pendiente: voz y piloto, después de terminar herencia.
TK = [
 ("resultado", "Todo el mundo quiere el resultado. Casi nadie quiere el proceso."),
 ("levantarte", "Querer algo es fácil. Lo difícil es levantarte al día siguiente de equivocarte."),
 ("nosotros", "Nosotros nos equivocamos muchas veces. Perdimos plata, tiempo… y hasta la confianza en nosotros mismos."),
 ("consecuencias", "Al final tuvimos que asumir las consecuencias de nuestras malas decisiones. Y aun así, levantamos la cabeza."),
 ("aprendimos", "Y aprendimos algo: el error no te saca del camino. Lo que te saca es quedarte en el piso."),
 ("disciplina", "La disciplina no se siente bien. Es hacer lo correcto cuando nadie te aplaude, cuando el mercado cae, cuando parece que no avanzas."),
 ("palabra", "Cada vez que cumples tu palabra contigo, te conviertes en alguien capaz de sostener lo que sueña."),
 ("caerse", "No se trata de no caerse. Se trata de cuántas veces estás dispuesto a levantarte."),
 ("partida", "Si hoy estás en el piso, no es el final. Es tu punto de partida."),
]
SH = [s for s in TK if s[0] in ("resultado", "levantarte", "consecuencias", "aprendimos", "caerse", "partida")]
text = lambda L: " ".join(t for _, t in L)
