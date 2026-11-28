# TITÁN · «El 4x1000: el cobro que casi nadie revisa» · línea B · plata del día a día · voz Juan (ElevenLabs)
# GMF: 4 por cada 1.000 en retiros y transferencias (Estatuto Tributario, art. 871 y ss.; Gerencie, actualizado 3 oct 2026).
# Exención: hasta 350 UVT al mes en cuentas de ahorro, depósitos electrónicos y tarjetas prepago de una sola persona (ET art. 879 num. 1 y art. 881-1; DIAN, Concepto 005976 de 2024).
#   No aplica a cuentas corrientes ni a cuentas con dos titulares (Gerencie). Lo que pase del tope paga.
# UVT 2026: $52.374 (Resolución DIAN 000238 de 2025) → 350 UVT = $18.330.900. No se menciona el «marcar la cuenta» porque las fuentes no coinciden sobre si sigue vigente.
# EJEMPLO HIPOTÉTICO: $3.000.000 al mes por una cuenta sin exención → $12.000 al mes, $144.000 al año.
SH = [
 ("gancho", "Cada vez que sacas plata del banco, te pueden estar cobrando un impuesto que casi nadie revisa: el cuatro por mil."),
 ("ejemplo", "Ejemplo hipotético: si mueves tres millones de pesos al mes por una cuenta sin exención, pagas doce mil pesos al mes. Ciento cuarenta y cuatro mil al año."),
 ("exencion", "Pero las cuentas de ahorro de una sola persona tienen una exención de hasta trescientas cincuenta u ve te al mes: unos dieciocho millones trescientos treinta mil pesos en dos mil veintiséis. Ojo: no aplica a cuentas corrientes ni a cuentas con dos titulares."),
 ("cierre", "Revisa tu extracto, y si te cobran sin pasar el tope, pregúntale a tu banco. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "Cada vez que sacas plata del banco, te pueden estar cobrando un impuesto que casi nadie revisa: el cuatro por mil."),
 ("que", "Son cuatro pesos por cada mil que retiras o transfieres. Parece poquito, pero se va sumando sin que lo notes."),
 ("ejemplo", "Ejemplo hipotético: si mueves tres millones de pesos al mes por una cuenta que no tiene la exención, pagas doce mil pesos al mes. Al año, ciento cuarenta y cuatro mil pesos, solo por mover tu propia plata."),
 ("exencion", "La buena noticia: las cuentas de ahorro de una sola persona tienen una exención de hasta trescientas cincuenta u ve te al mes. En dos mil veintiséis, eso son unos dieciocho millones trescientos treinta mil pesos."),
 ("ojo", "Ojo: la exención no aplica a cuentas corrientes ni a cuentas con dos titulares. Y lo que pase del tope en el mes, sí paga."),
 ("cierre", "Revisa tu extracto. Si ves el cobro del cuatro por mil y no pasas el tope, pregúntale a tu banco por qué. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("cuatro por mil", "4x1000"), ("cuatro pesos por cada mil", "$4 por cada $1.000"), ("tres millones de pesos", "$3.000.000"), ("doce mil pesos", "$12.000"),
       ("ciento cuarenta y cuatro mil pesos", "$144.000"), ("Ciento cuarenta y cuatro mil", "$144.000"), ("trescientas cincuenta u ve te", "350 UVT"),
       ("dieciocho millones trescientos treinta mil pesos", "$18,3 millones"), ("dos mil veintiséis", "2026")]
