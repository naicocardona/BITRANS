# TITÁN · «Black Friday: ¿descuento real o precio inflado?» · línea B (plata del día a día) · voz Juan
# Black Friday Colombia: viernes 27 nov 2026. SIC: multó a 10 empresas por más de $3.068 millones por irregularidades en el Black Friday de 2024
#   (fallas de información sobre condiciones de promociones, retracto, garantías, PQR…; Asuntos Legales y Portafolio, 25 nov 2025).
# Retracto en compras a distancia/por internet: 5 días hábiles desde la entrega (Ley 1480 de 2011, art. 47; asuntoslegales, El País). No se cita plazo de reembolso (Ley 2439 de 2024 en revisión).
# EJEMPLO HIPOTÉTICO: televisor de $1.000.000; días antes sube a $1.600.000 y lo anuncian con 40 % → $960.000 (ahorro real: 4 %).
SH = [
 ("gancho", "Este viernes es Black Friday. Pero un descuento no siempre es un descuento."),
 ("ejemplo", "Ejemplo hipotético: un televisor cuesta un millón. Días antes lo suben a un millón seiscientos, y lo anuncian con cuarenta por ciento menos. Pagas novecientos sesenta mil: apenas cuatro por ciento de ahorro real."),
 ("sic", "La Superintendencia de Industria y Comercio multó a diez empresas por más de tres mil millones de pesos por irregularidades en el Black Friday de dos mil veinticuatro."),
 ("cierre", "Revisa el precio desde antes y compra solo lo que ya ibas a comprar. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "Este viernes es Black Friday en Colombia. Pero un descuento no siempre es un descuento."),
 ("ejemplo", "Ejemplo hipotético: un televisor cuesta un millón de pesos. Días antes, lo suben a un millón seiscientos mil, y lo anuncian con cuarenta por ciento de descuento."),
 ("cuenta", "Pagas novecientos sesenta mil. El cartel dice cuarenta por ciento, pero tu ahorro real es de apenas cuatro por ciento."),
 ("sic", "Y no es solo teoría: la Superintendencia de Industria y Comercio multó a diez empresas por más de tres mil millones de pesos por irregularidades en el Black Friday de dos mil veinticuatro, como no informar bien las condiciones de sus promociones."),
 ("como", "¿Cómo te cuidas? Uno: mira el precio desde antes y guarda pantallazos. Dos: lee las condiciones: fechas, unidades y a qué productos aplica. Tres: compra solo lo que ya ibas a comprar."),
 ("retracto", "Y si compras por internet, tienes derecho de retracto: en general, cinco días hábiles después de recibir el producto para arrepentirte."),
 ("cierre", "Un descuento solo es ahorro si ibas a comprar eso de todas formas. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("un millón seiscientos mil", "$1.600.000"), ("un millón seiscientos", "$1.600.000"), ("un millón de pesos", "$1.000.000"), ("un millón", "$1.000.000"),
       ("cuarenta por ciento", "40 %"), ("novecientos sesenta mil", "$960.000"), ("cuatro por ciento", "4 %"), ("tres mil millones de pesos", "$3.068 millones"),
       ("diez empresas", "10 empresas"), ("dos mil veinticuatro", "2024"), ("cinco días hábiles", "5 días hábiles")]
