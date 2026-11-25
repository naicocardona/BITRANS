# TITÁN · «La prima de diciembre» · línea B (plata del día a día) · voz Juan (ElevenLabs)
# Ley: prima de servicios = 30 días de salario por año; la segunda mitad, a más tardar en los primeros 20 días de diciembre (CST art. 306, mod. Ley 1788 de 2016).
#   20 dic 2026 = domingo. Base con auxilio de transporte para quien gana hasta 2 SMMLV (Ley 1 de 1963, art. 7).
# Cifras 2026: SMMLV $1.750.905 (Decreto 0159 de 2026, transitorio, tras la suspensión del 1469 de 2025 por el Consejo de Estado) + auxilio $249.095 (Decreto 1470 de 2025)
#   = $2.000.000 → prima del semestre completo = $1.000.000. Proporcional a los días trabajados: base × días / 360.
# EJEMPLO HIPOTÉTICO de reparto (no es una regla): $400.000 colchón · $400.000 deuda más cara · $200.000 un gusto.
SH = [
 ("gancho", "La prima de diciembre todavía no te llega… y muchos ya se la gastaron."),
 ("cuanto", "Por ley se paga a más tardar el veinte de diciembre. Con el salario mínimo y el auxilio de transporte, la prima del semestre completo es de un millón de pesos."),
 ("plan", "Ejemplo hipotético: cuatrocientos mil al colchón, cuatrocientos mil a la deuda más cara y doscientos mil para darte un gusto."),
 ("cierre", "Si la gastas antes de recibirla, ya no es prima: es deuda. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "La prima de diciembre todavía no te llega… y muchos ya se la gastaron."),
 ("dato", "Por ley, la prima del segundo semestre se paga a más tardar el veinte de diciembre. Este año, el veinte cae domingo: revisa con tu empresa qué día te pagan."),
 ("cuanto", "¿Cuánto es? Medio mes de salario por el semestre trabajado. Si ganas el mínimo, con el auxilio de transporte la base es de dos millones. Así que la prima completa es de un millón de pesos."),
 ("error", "El error es comprometerla antes de recibirla: las cuotas del Black Friday, el paseo, los regalos. Cuando por fin llega, ya está gastada."),
 ("plan", "Ejemplo hipotético: divídela en tres. Una parte al colchón para imprevistos, otra a la deuda más cara que tengas, y otra para darte un gusto, sin culpa."),
 ("cuenta", "Con un millón: cuatrocientos mil al colchón, cuatrocientos mil a la deuda y doscientos mil para ti."),
 ("ojo", "Ojo: si no trabajaste el semestre completo, te pagan en proporción a los días trabajados."),
 ("cierre", "La prima no es plata extra: es parte de tu sueldo que llega junta. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("veinte de diciembre", "20 de diciembre"), ("un millón de pesos", "$1.000.000"), ("dos millones", "$2.000.000"), ("un millón", "$1.000.000"),
       ("cuatrocientos mil", "$400.000"), ("doscientos mil", "$200.000"), ("el veinte cae", "el 20 cae")]
# Pausas de lectura en el Short (llega a 35 s sin acelerar la voz).
PAUSAS = {"sh": [("ya se la gastaron.", 0.6), ("es de un millón de pesos.", 0.8), ("para darte un gusto.", 0.7), ("es deuda.", 0.4)]}
