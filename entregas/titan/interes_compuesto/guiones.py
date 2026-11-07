# TITÁN · «Interés compuesto: la bola de nieve» · guiones finales (voz Juan, ElevenLabs). Números en palabras para la voz.
# Cifras (ejemplo hipotético; ver PUBLICACION.md): 8 % anual; tabla con capitalización mensual y aporte a fin de mes hasta los 65.
TK = [
 ("gancho", "Dos personas quieren un millón de dólares a los sesenta y cinco. Una empieza a los veinte, y le bastan unos ciento noventa dólares al mes. La otra empieza a los cincuenta, y necesita casi dos mil novecientos. ¿Por qué?"),
 ("bola", "Por el interés compuesto, que funciona como una bola de nieve."),
 ("anios", "Si inviertes diez mil dólares al ocho por ciento, el primer año ganas ochocientos. El segundo, ganas ochocientos sesenta y cuatro, porque el ocho por ciento ya se calcula sobre diez mil ochocientos. Las ganancias producen ganancias."),
 ("reinv", "Pero solo si reinviertes. Si te gastas las ganancias, en treinta años sumas treinta y cuatro mil dólares, contando lo gastado. Si las reinviertes, más de cien mil."),
 ("tabla", "Con un ocho por ciento anual hipotético: si empiezas a los veinte, necesitas unos ciento noventa dólares al mes. A los veinticinco, doscientos ochenta y seis. A los treinta, cuatrocientos treinta y seis. A los cuarenta, mil cincuenta. Y a los cincuenta, dos mil ochocientos noventa."),
 ("quien", "Quien empieza a los veinte pone unos ciento dos mil dólares; el interés compuesto pone el resto. Quien empieza a los cincuenta pone más de la mitad."),
 ("tiempo", "El ingrediente más poderoso no es cuánto pones, sino cuánto tiempo dejas rodar la bola."),
 ("cierre", "¿Cuándo empieza a rodar la tuya? Ejemplo hipotético: los mercados no rinden un porcentaje fijo, y no incluye impuestos, comisiones ni inflación."),
]
SH = [
 ("gancho", "Para llegar a un millón de dólares a los sesenta y cinco, si empiezas a los veinte te bastan unos ciento noventa dólares al mes. Si empiezas a los cincuenta, necesitas casi dos mil novecientos. ¿Por qué?"),
 ("bola", "Por el interés compuesto: tus ganancias producen más ganancias, como una bola de nieve que recoge más nieve en cada vuelta. Pero solo si reinviertes."),
 ("tabla", "Con un ocho por ciento anual hipotético, a los veinticinco necesitas unos doscientos ochenta y seis al mes. A los treinta, unos cuatrocientos treinta y seis. A los cuarenta, unos mil cincuenta."),
 ("quien", "Quien empieza a los veinte pone de su bolsillo unos ciento dos mil dólares. El interés compuesto pone el resto."),
 ("tiempo", "El ingrediente más poderoso es el tiempo. ¿Cuándo empieza a rodar tu bola?"),
 ("cierre", "Es un ejemplo hipotético: los mercados no rinden un porcentaje fijo."),
]
text = lambda L: " ".join(t for _, t in L)
