# TITÁN · «¿Tus acciones de EE. UU. las heredan tus hijos… o el IRS?» · voz Juan (ElevenLabs). Números en palabras; «IRS» → «i erre ese», «LLC» → «ele ele ce».
# Datos (IRS): no residente no ciudadano con más de USD 60.000 en activos situados en EE. UU. (incluye acciones de corporaciones de EE. UU.) → Form 706-NA, 9 meses; el tope no cambia cada año.
# Tarifa IRC 2001(c) con crédito de USD 13.000 = impuesto(60.000): sobre el excedente de USD 60.000 las tarifas marginales van del 26 % al 40 %. Ejemplo hipotético USD 200.000 → 54.800 − 13.000 = USD 41.800 (20,9 %).
# Colombia no tiene tratado de herencia con EE. UU. Transfer certificate del IRS para mover los activos del fallecido. Form 5472: multa USD 25.000 (LLC de dueño extranjero).
SH = [
 ("gancho", "¿Tus acciones de Estados Unidos las heredan tus hijos… o el i erre ese?"),
 ("regla", "Si no vives en Estados Unidos y mueres con más de sesenta mil dólares en acciones de allá, tu familia puede tener que pagar impuesto de herencia, con tarifas del veintiséis al cuarenta por ciento sobre lo que pase ese tope."),
 ("ejemplo", "Ejemplo hipotético: un portafolio de doscientos mil dólares. El impuesto sería de unos cuarenta y un mil ochocientos dólares. Más de la quinta parte."),
 ("mito", "¿Y si abres una ele ele ce? Ojo: por sí sola no garantiza nada. Lo que puede funcionar es un fideicomiso irrevocable, una sociedad fuera de Estados Unidos o fondos domiciliados fuera de Estados Unidos. Todas tienen costos."),
 ("cierre", "Revisa cuánto tienes allá y asesórate con un experto en los dos países, antes de que le toque a tu familia."),
]
TK = [
 ("gancho", "¿Tus acciones de Estados Unidos las heredan tus hijos… o el i erre ese?"),
 ("regla", "Si no vives en Estados Unidos y mueres con más de sesenta mil dólares en acciones de allá, tu familia puede tener que pagar impuesto de herencia, con tarifas del veintiséis al cuarenta por ciento sobre lo que pase ese tope."),
 ("ejemplo", "Ejemplo hipotético: un portafolio de doscientos mil dólares. El impuesto sería de unos cuarenta y un mil ochocientos dólares. Más de la quinta parte de lo que ahorraste."),
 ("tramite", "Tu familia tiene nueve meses para declarar, y la cuenta puede quedar congelada hasta que el i erre ese dé un certificado. Y Colombia no tiene tratado de herencias con Estados Unidos."),
 ("mito", "Te dirán: abre una ele ele ce y un fideicomiso. Ojo. La ele ele ce, por sí sola, no garantiza nada, y con dueño extranjero exige un formulario anual con multas desde veinticinco mil dólares. Y un fideicomiso revocable no sirve: para el i erre ese, las acciones siguen siendo tuyas."),
 ("opciones", "Lo que puede funcionar: un fideicomiso irrevocable, una sociedad fuera de Estados Unidos o fondos domiciliados fuera de Estados Unidos. Todas tienen costos, y en Colombia igual declaras."),
 ("cierre", "Todos ven el portafolio crecer. Casi nadie mira quién lo hereda. Revisa cuánto tienes allá y asesórate con un experto en los dos países."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("i erre ese", "IRS"), ("ele ele ce", "LLC"), ("sesenta mil dólares", "USD 60.000"), ("doscientos mil dólares", "USD 200.000"), ("cuarenta y un mil ochocientos dólares", "USD 41.800"),
       ("veinticinco mil dólares", "USD 25.000"), ("veintiséis", "26 %"), ("cuarenta por ciento", "40 %"), ("nueve meses", "9 meses")]
