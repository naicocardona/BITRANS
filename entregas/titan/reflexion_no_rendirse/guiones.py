# TITÁN · Reflexión «No soltar en el peor momento» · tema tomado de una referencia de Lady («el elegido»), con texto, estructura y escenas propias (nada de sus frases) · voz Juan
# Dato real citado: Nasdaq 100, 25 nov 2026, llegó a −20,38 % desde su máximo del 6 oct y cerró −0,64 % en el día (Yahoo Finance; ver entregas/titan/nasdaq_bajista/).
# La persona que invierte es una situación hipotética. Sin promesas de resultados.
SH = [
 ("gancho", "Nadie empieza sabiendo invertir. Y casi nadie empieza en buen momento."),
 ("rojo", "El primer mes, todo en rojo. Los amigos dicen: te lo dije. Ahí es cuando la mayoría se sale."),
 ("semana", "Esta semana lo vimos: el Nasdaq llegó a estar veinte por ciento abajo de su máximo, y cerró casi igual el mismo día. Quien se asustó en la mañana, se perdió la tarde."),
 ("cierre", "Invertir no es tenerlo fácil: es tener un plan y no soltarlo en el peor momento. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "Nadie empieza sabiendo invertir. Y casi nadie empieza en buen momento."),
 ("empieza", "Imagina a alguien que pone su primer ahorro en la bolsa. Con miedo, con dudas, sin saber si lo está haciendo bien."),
 ("rojo", "Y el primer mes, todo en rojo. Los amigos le dicen: te lo dije."),
 ("salen", "Ahí es cuando la mayoría se sale. Vende barato, y jura no volver."),
 ("sigue", "Pero esta persona se queda. Sigue aportando poquito cada mes, aunque nadie aplauda y nadie lo vea."),
 ("semana", "Esta semana lo vimos: el Nasdaq llegó a estar veinte por ciento abajo de su máximo, y cerró casi igual el mismo día. Quien se asustó en la mañana, se perdió la tarde."),
 ("camino", "El camino nunca es recto. Hay meses que bajan, años que aburren, y días que asustan."),
 ("respuesta", "Y cuando alguien le pregunte cómo lo hizo, la respuesta no va a ser suerte. Va a ser que tenía un plan, y no lo soltó."),
 ("cierre", "Invertir no es tenerlo fácil: es tener un plan y no soltarlo en el peor momento. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("veinte por ciento", "20 %")]
# Pausas de lectura en el Short (reflexión: silencios que pesan; llega a 35 s sin acelerar la voz).
PAUSAS = {"sh": [("buen momento.", 0.8), ("la mayoría se sale.", 0.8), ("se perdió la tarde.", 0.8)]}
