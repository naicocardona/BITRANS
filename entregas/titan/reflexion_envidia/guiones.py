# TITÁN · Reflexión «Las dos envidias» · BORRADOR para aprobación de Lady (17 nov 2026). Voz: Juan (ElevenLabs). Estilo «escenas de cerca» (tools/ref2/), personaje A1.
# Idea tomada de un video de referencia SOLO por el tema; texto, estructura y look propios (nada de sus frases).
# Fuentes: Van de Ven, Zeelenberg y Pieters (Tilburg University), «Leveling up and down: the experiences of benign and malicious envy», Emotion 9(3), 419–429, 2009.
#          Van de Ven, Zeelenberg y Pieters, «Appraisal patterns of envy and related emotions», Motivation and Emotion 36(2), 195–204, 2012 (merecimiento y control).
# La mesa familiar es una situación hipotética (segunda persona), no un caso real.
TK = [
 ("gancho", "Cuéntale a tu familia que empezaste a invertir cien mil pesos al mes. Vas a escuchar: «eso es para ricos», «te van a tumbar», «mejor gástatelos»."),
 ("despues", "Ahora imagina esa misma mesa unos años después, cuando ya se nota el resultado. Las mismas voces te preguntan: «¿y tú cómo hiciste?»."),
 ("igual", "Tú sigues con la misma disciplina de siempre. Lo único nuevo es que ahora hay algo que se puede ver."),
 ("estudio", "Esto tiene explicación. Investigadores de la Universidad de Tilburg, en Países Bajos, publicaron en dos mil nueve que hay dos tipos de envidia. Una te mueve a mejorar tu propia posición. La otra busca bajar al que va adelante."),
 ("merecer", "Y en dos mil doce encontraron qué inclina la balanza: si la otra persona siente que tu avance es merecido, o no."),
 ("empezar", "Por eso al principio pesa tanto. Cuando apenas arrancas, todavía no hay nada que muestre tu esfuerzo. Solo hay una decisión que otros no se atrevieron a tomar."),
 ("cuidado", "Ojo: no todo consejo es envidia. Hay quien te pregunta porque ha visto estafas, y hace bien. Escucha, revisa, compara. Pero no dejes que una burla decida tu futuro."),
 ("cierre", "La constancia no hace ruido al principio. Con los años, se nota."),
]
SH = [
 TK[0], TK[1],
 ("estudio", "Investigadores de la Universidad de Tilburg encontraron que hay dos tipos de envidia. Una te mueve a mejorar. La otra busca bajar al que va adelante."),
 ("merecer", "Y lo que inclina la balanza es si la otra persona siente que tu avance es merecido, o no. Al principio, todavía no hay nada que lo muestre."),
 TK[7],
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("cien mil pesos", "$100.000"), ("dos mil nueve", "2009"), ("dos mil doce", "2012")]
PAUSAS = {"tk": [("gástatelos».", 0.5), ("hiciste?».", 0.6), ("va adelante.", 0.5), ("decida tu futuro.", 0.6)],
          "sh": [("hiciste?».", 0.5), ("lo muestre.", 0.5)]}
