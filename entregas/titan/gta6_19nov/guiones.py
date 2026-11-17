# TITÁN · «El 19 de noviembre, millones no van a trabajar» (GTA VI) · línea A · voz Juan + 2 personajes (voces TITÁN joven/adulto)
# BORRADOR 17 nov 2026 para publicar el 18 (sale el 19 nov 2026). SIN arte, logos ni personajes del juego: todo genérico TITÁN.
# Fuentes: BambooHR (22 oct 2026; encuesta n=1.530 empleados de tiempo completo en EE. UU., 9–20 oct 2026): 18 % planea el día libre; Gen Z 32 %;
#   50 % de quienes faltan por un lanzamiento se reportaría enfermo; solicitudes de PTO para el 19 nov ~13 % más que días comparables (BambooHR no afirma causalidad).
# Costo: sin cifra oficial; analistas (citados por Business Insider) estiman USD 1.000–1.500 millones de desarrollo. Take-Two: guía año fiscal 2027 USD 8.000–8.200 millones (Game Developer, ago. 2026).
# Analistas: 35–45 millones de copias el primer año (DFC 40 M; BofA 45 M). GTA V: más de 230 millones de unidades (sold-in, Take-Two ago. 2026).
SH = [
 ("gancho", "El diecinueve de noviembre, millones de personas no van a ir a trabajar. No es un paro. Es un videojuego."),
 ("dato", "Sale ge te a seis. Y según una encuesta en Estados Unidos, casi uno de cada cinco empleados planea tomarse el día. Y la mitad de los que faltan por un juego… se reporta enfermo."),
 ("plata", "Hacerlo habría costado entre mil y mil quinientos millones de dólares, según analistas. Y su dueña, Teik Tu, espera ventas por unos ocho mil millones en su año fiscal."),
 ("leccion", "El dato para quien invierte: una empresa gigante que depende de un solo producto. Si funciona, gana. Si decepciona, la acción lo siente. Por eso no conviene apostar todo a una sola empresa."),
 ("cierre", "¿Tú vas a pedir el día?"),
]
TK = [
 SH[0],
 ("dato", "Sale ge te a seis. Según una encuesta en Estados Unidos, casi uno de cada cinco empleados planea tomarse el día. Entre los más jóvenes, uno de cada tres. Y la mitad de los que faltan por un juego… se reporta enfermo."),
 ("costo", "¿Cuánto costó hacerlo? Rockstar nunca lo ha dicho. Los analistas estiman entre mil y mil quinientos millones de dólares. Uno de los juegos más caros de la historia."),
 ("gana", "¿Y cuánto puede ganar? Teik Tu, su dueña, espera ventas por unos ocho mil millones de dólares en su año fiscal. Los analistas calculan entre treinta y cinco y cuarenta y cinco millones de copias el primer año. Para dimensionar: ge te a cinco ya pasa los doscientos treinta millones."),
 ("mundo", "La economía no se frena por un día. Pero sí mueve otra: la de los clips, las transmisiones y los creadores que van a vivir de este juego por meses."),
 ("leccion", "Y el dato para quien invierte: una empresa gigante que depende muchísimo de un solo producto. Si funciona, gana. Si decepciona, la acción lo siente. Por eso no conviene apostar todo a una sola empresa."),
 SH[4],
]
# Personajes (hueco después de «se reporta enfermo.»): empleado (voz joven) y jefe (voz adulta)
PERSONAJES = [("empleado", "CWv9T94yZmVI3AWqIzqd", "[coughs] Jefe… amanecí como enfermito."), ("jefe", "8eZN0csGjiGkv5to85bH", "[sighs] ¿Usted también?")]
text = lambda L: " ".join(t for _, t in L)
MAP = [("diecinueve de noviembre", "19 de noviembre"), ("ge te a seis", "GTA VI"), ("ge te a cinco", "GTA V"), ("Teik Tu", "Take-Two"),
       ("mil y mil quinientos millones de dólares", "USD 1.000–1.500 millones"), ("ocho mil millones de dólares", "USD 8.000 millones"), ("ocho mil millones", "USD 8.000 millones"),
       ("treinta y cinco y cuarenta y cinco millones", "35 y 45 millones"), ("doscientos treinta millones", "230 millones")]
