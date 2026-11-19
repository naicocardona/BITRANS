# TITÁN · «Anthropic salió a bolsa» · línea A · noticia del día (19 nov 2026) · voz Juan (ElevenLabs)
# Salida a bolsa en Nasdaq (ANT): 980 millones de acciones a USD 83 → USD 81.300 millones, la mayor de la historia (SpaceX USD 75.000 millones, jun. 2026). Apertura USD 111,50 (+34 %).
#   Fuentes: CNN, CNBC, Fox Business, NBC (19 nov 2026). Cierre oficial del día: datos/cierre.json (Yahoo Finance).
# Facebook 2012 (Yahoo Finance, diario): salida USD 38 (18 may. 2012), apertura USD 42,05, mínimo USD 17,55 el 4 sep. 2012.
# Conflicto de interés declarado a Lady: el guion lo escribe Claude (de Anthropic); se queda en datos verificables y muestra los riesgos.
import json, os
D = os.path.dirname(os.path.abspath(__file__)); CL = json.load(open(f"{D}/datos/cierre.json"))
U = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve",
     "veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"]
DEC = {3: "treinta", 4: "cuarenta", 5: "cincuenta", 6: "sesenta", 7: "setenta", 8: "ochenta", 9: "noventa"}
def w99(n): return U[n] if n < 30 else DEC[n // 10] + ("" if n % 10 == 0 else " y " + U[n % 10])
def w999(n): return w99(n) if n < 100 else ("cien" if n == 100 else ("ciento " + w99(n - 100)) if n < 200 else {2: "doscientos", 3: "trescientos", 4: "cuatrocientos", 5: "quinientos"}.get(n // 100, "") + (" " + w99(n % 100) if n % 100 else ""))
def precio(v): e, c = int(v), round((v - int(v)) * 100); return w999(e) + (" dólares" if c == 0 else " con " + w99(c))
CW = precio(CL["cierre"]); CN = ("USD %.2f" % CL["cierre"]).replace(".", ",")
VAR = CL["cierre"] / 83 - 1; VW = ("subió " if VAR >= 0 else "bajó ") + w99(round(abs(VAR) * 100)) + " por ciento frente al precio de salida"
TK = [
 ("gancho", "La empresa que creó a Claude salió hoy a la bolsa. Y fue la salida a bolsa más grande de la historia."),
 ("datos", "Anthropic vendió novecientos ochenta millones de acciones a ochenta y tres dólares cada una, y recaudó ochenta y un mil trescientos millones de dólares. Más que SpaceX en junio."),
 ("apertura", f"Pero casi nadie compró a ochenta y tres. La acción abrió en ciento once dólares con cincuenta, un treinta y cuatro por ciento más cara. Y cerró el día en {CW}: {VW}."),
 ("leccion", "Esa es la letra pequeña: el precio de salida se asigna sobre todo a inversionistas institucionales. Quien compra el primer día paga lo que pida el mercado en ese momento."),
 ("facebook", "Y el primer día no dice mucho. En mayo de dos mil doce, Facebook salió a treinta y ocho dólares y abrió en cuarenta y dos. Cuatro meses después llegó a diecisiete con cincuenta y cinco: menos de la mitad."),
 ("ojo", "Ojo con la publicidad: algunos brókers ya ofrecen operarla con CFD, y con un CFD no eres dueño de la acción. Además, el apalancamiento puede multiplicar las pérdidas."),
 ("cierre", "¿Comprar el día uno o esperar? Depende de cuánto riesgo aguantas. Una salida a bolsa no es una garantía. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
SH = [
 ("gancho", "La empresa que creó a Claude salió hoy a la bolsa. Y fue la salida a bolsa más grande de la historia."),
 ("cuenta", f"Vendió sus acciones a ochenta y tres dólares, la acción abrió en ciento once con cincuenta y cerró en {CW}. Pero casi nadie compró al precio de salida."),
 ("facebook", "Y ojo: en dos mil doce, Facebook salió a treinta y ocho dólares y abrió en cuarenta y dos. Cuatro meses después llegó a diecisiete con cincuenta y cinco: menos de la mitad."),
 ("cierre", "Una salida a bolsa no es una garantía. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("novecientos ochenta millones", "980 millones"), ("ochenta y un mil trescientos millones de dólares", "USD 81.300 millones"), ("ochenta y tres dólares", "USD 83"), ("ochenta y tres.", "USD 83."),
       ("ciento once dólares con cincuenta", "USD 111,50"), ("ciento once con cincuenta", "USD 111,50"), ("treinta y cuatro por ciento", "34 %"), (CW, CN),
       ("treinta y ocho dólares", "USD 38"), ("cuarenta y dos.", "USD 42."), ("diecisiete con cincuenta y cinco", "USD 17,55"), ("dos mil doce", "2012")]
