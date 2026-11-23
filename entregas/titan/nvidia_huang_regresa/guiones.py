# TITÁN · «Nvidia: una sola persona movió la acción» · línea A · noticia del día (23 nov 2026) · voz Juan (ElevenLabs)
# Hechos (CNBC, Fortune, Axios, Tom's Hardware, NPR, Washington Post; 8-K de Nvidia a la SEC del 11 y 23 nov 2026):
#   11 nov 2026: Nvidia anuncia que Jensen Huang deja de ser CEO (Colette Kress, CFO, interina) tras reportes de relaciones extramatrimoniales,
#   una con una mujer que EE. UU. señala como posible espía de China (China lo niega). 23 nov 2026: la junta lo restituye por unanimidad; dice que,
#   con información de altos niveles del gobierno de EE. UU., su regreso no es un riesgo para la seguridad nacional. La investigación interna sigue.
# Precios NVDA (Yahoo Finance, cierres): 11 nov USD 173,73 · 20 nov USD 125,53 (−27,7 %) · 23 nov: datos/cierre.json.
# Personas reales: no se dibujan; se usa una silla de «CEO» y personajes genéricos. Lo personal va como «escándalo personal» y «según reportes».
import json, os
D = os.path.dirname(os.path.abspath(__file__)); CL = json.load(open(f"{D}/datos/cierre.json"))
U = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve",
     "veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"]
DEC = {3: "treinta", 4: "cuarenta", 5: "cincuenta", 6: "sesenta", 7: "setenta", 8: "ochenta", 9: "noventa"}
def w99(n): return U[n] if n < 30 else DEC[n // 10] + ("" if n % 10 == 0 else " y " + U[n % 10])
def w999(n): return w99(n) if n < 100 else ("cien" if n == 100 else ("ciento " + w99(n - 100)) if n < 200 else "")
def precio(v): e, c = int(v), round((v - int(v)) * 100); return w999(e) + (" dólares" if c == 0 else " con " + ("cero " if c < 10 else "") + w99(c))
C = CL["cierre"]; CW = precio(C); CN = ("USD %.2f" % C).replace(".", ",")
UP = C / 125.53 - 1; UPn = round(UP * 100); UPw = w99(UPn) + " por ciento"
TK = [
 ("gancho", f"En nueve días, la acción de Envidia cayó casi veintiocho por ciento. Y hoy subió {UPw} en un solo día. ¿La razón? Una sola persona."),
 ("salida", "El once de noviembre, Yensen Huang, su fundador, dejó de ser el jefe de la empresa, tras un escándalo personal. Según reportes, una de esas relaciones era con una mujer que Estados Unidos señala como posible espía de China. China lo niega."),
 ("caida", "Sin su fundador al mando, la acción pasó de ciento setenta y tres dólares a ciento veinticinco. Casi veintiocho por ciento menos."),
 ("regreso", f"Pero hoy, la junta votó por unanimidad devolverle el puesto. Dijo que, con información del gobierno de Estados Unidos, su regreso no es un riesgo para la seguridad nacional. Y la acción cerró en {CW}: {UPw} más en un solo día."),
 ("ojo", "Ojo: la investigación interna sigue abierta. Y una subida así no garantiza lo que viene."),
 ("leccion", "Esto tiene nombre: riesgo de persona clave. Cuando una empresa depende tanto de una sola persona, cualquier noticia sobre ella puede mover la acción para cualquier lado."),
 ("cierre", "Por eso muchos inversionistas no ponen todo en una sola acción, por grande que sea. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
SH = [
 ("gancho", f"En nueve días, la acción de Envidia cayó casi veintiocho por ciento. Y hoy subió {UPw} en un solo día. ¿La razón? Una sola persona."),
 ("historia", f"Su fundador, Yensen Huang, salió el once de noviembre tras un escándalo personal, y la acción se hundió. Hoy la junta lo devolvió al puesto, y la acción cerró en {CW}."),
 ("cierre", "Eso se llama riesgo de persona clave. Por eso muchos no ponen todo en una sola acción, por grande que sea. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("Envidia", "Nvidia"), ("Yensen Huang", "Jensen Huang"), ("casi veintiocho por ciento", "casi 28 %"), (UPw, "%d %%" % UPn), (CW, CN),
       ("ciento setenta y tres dólares", "USD 173"), ("ciento veinticinco", "USD 125"), ("nueve días", "9 días"), ("once de noviembre", "11 de noviembre")]
