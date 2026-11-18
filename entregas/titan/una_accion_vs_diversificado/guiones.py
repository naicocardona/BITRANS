# TITÁN · «¿Una sola acción o diversificado?» · línea A (acciones, dato curioso) · serie «La cuenta que nadie hace» · voz Juan (ElevenLabs)
# Top 10 del S&P 500 por valor de mercado al 1 ene. 2000: Microsoft, General Electric, Cisco, Walmart, Exxon Mobil, Intel, Citigroup, IBM, Oracle, Home Depot (24/7 Wall St., 5 jun. 2024).
# Hoy solo Microsoft sigue entre las 10 más grandes de EE. UU. (CompaniesMarketCap, nov. 2026; Benzinga ya lo señalaba en feb. 2023).
# Ejemplo HIPOTÉTICO con precios reales (tools/acc/calc.py, Yahoo Finance, cierre ajustado dic. 1999 → oct. 2026, dividendos reinvertidos, sin comisiones ni impuestos):
#   USD 1.000 → Microsoft 14.729 · Exxon 10.760 · Walmart 8.454 · Home Depot 8.411 · S&P 500 (SPY) 8.232 · Oracle 5.896 · IBM 4.927 · Cisco 3.055 · Intel 2.813 · GE 2.266 · Citigroup 570.
#   4 de 10 le ganaron al índice. Citigroup llegó a valer USD 51 (feb. 2009, −94,9 %).
SH = [
 ("gancho", "En el año dos mil, estas eran las diez empresas más grandes de Estados Unidos. Hoy, solo una sigue entre las diez primeras."),
 ("cuenta", "Ejemplo hipotético, con precios reales: mil dólares en enero del dos mil. En Microsoft, hoy tendrías unos catorce mil setecientos. En Citigroup, unos quinientos setenta: perdiste casi la mitad."),
 ("indice", "¿Y en el ese ene pe quinientos completo? Unos ocho mil doscientos treinta. Solo cuatro de las diez le ganaron."),
 ("cierre", "Si no sabes cuál va a ganar, diversificar te evita tener que adivinar. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "En el año dos mil, estas eran las diez empresas más grandes de Estados Unidos. Hoy, solo una sigue entre las diez primeras."),
 ("pregunta", "Entonces, ¿qué es mejor: apostarle a una sola acción, o tenerlas todas? Hicimos la cuenta con precios reales."),
 ("reglas", "Ejemplo hipotético: mil dólares en enero del año dos mil, con dividendos reinvertidos, hasta octubre de dos mil veintiséis."),
 ("ganadora", "Si escogiste Microsoft, hoy tendrías unos catorce mil setecientos dólares. Le atinaste."),
 ("perdedora", "Pero si escogiste Citigroup, el gran banco de la época, hoy tendrías unos quinientos setenta. Veintiséis años después, perdiste casi la mitad. Y en la crisis de dos mil nueve, llegó a perder casi el noventa y cinco por ciento."),
 ("medio", "Intel y General Electric ni siquiera triplicaron. De las diez, solo cuatro le ganaron al índice."),
 ("indice", "¿Y si en vez de escoger, te quedabas con todo el ese ene pe quinientos? Hoy tendrías unos ocho mil doscientos treinta dólares. Sin adivinar cuál iba a ganar."),
 ("cierre", "¿Una sola acción o diversificado? Depende de cuánto riesgo aguantas. Pero si no sabes cuál va a ganar, diversificar te evita tener que adivinar. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("catorce mil setecientos dólares", "USD 14.700"), ("catorce mil setecientos", "USD 14.700"), ("quinientos setenta", "USD 570"), ("ocho mil doscientos treinta dólares", "USD 8.230"),
       ("ocho mil doscientos treinta", "USD 8.230"), ("mil dólares", "USD 1.000"), ("ese ene pe quinientos", "S&P 500"), ("noventa y cinco por ciento", "95 %"),
       ("dos mil veintiséis", "2026"), ("dos mil nueve", "2009"), ("año dos mil", "año 2000"), ("del dos mil", "del 2000"), ("Veintiséis años", "26 años"), ("diez empresas", "10 empresas"),
       ("diez primeras", "10 primeras"), ("las diez", "las 10")]
