# TITÁN · «De la peor semana a la mejor en 19 meses» · línea A · noticia del 27 nov 2026 · voz Juan (ElevenLabs)
# Datos (Yahoo Finance, datos/): S&P 500 cierres: 13 nov 7.561,67 · 20 nov 6.910,39 (−8,61 %: peor semana desde la del 31 mar 2025, −9,08 %) · 27 nov 7.297,49 (+5,60 %: mejor semana desde la del 7 abr 2025, +5,70 %).
# Nasdaq 100: 13 nov 27.943,74 · 20 nov 25.028,98 (−10,43 %) · 27 nov 26.726,39 (+6,78 %). Noviembre (30 oct 7.580,07 → 27 nov): S&P −3,73 %.
# Motivo según reportes (Motley Fool, Spectrum/AP, 27 nov 2026): rebote de acciones de IA y chips. EJEMPLO HIPOTÉTICO: USD 1.000 el 20 nov → USD 1.056 el 27 nov.
SH = [
 ("gancho", "En dos semanas, la bolsa de Estados Unidos pasó de su peor semana en diecinueve meses a su mejor semana en diecinueve meses."),
 ("dato", "El ese ene pe quinientos cayó ocho coma seis por ciento hasta el viernes veinte. Y esta semana subió cinco coma seis por ciento."),
 ("ejemplo", "Ejemplo hipotético: dos personas con mil dólares el viernes veinte. Una vendió por miedo. La otra no hizo nada. Hoy, la que se quedó tiene mil cincuenta y seis."),
 ("cierre", "Nadie sabe qué viene la otra semana. Pero los peores días y los mejores suelen llegar juntos. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "En dos semanas, la bolsa de Estados Unidos pasó de su peor semana en diecinueve meses a su mejor semana en diecinueve meses."),
 ("dato", "El ese ene pe quinientos cayó ocho coma seis por ciento entre el dieciséis y el veinte de noviembre. Y esta semana subió cinco coma seis por ciento. El Nasdaq cien fue más extremo: menos diez coma cuatro, y luego más seis coma ocho."),
 ("porque", "Según los reportes, el rebote lo lideraron las acciones de inteligencia artificial y de chips, justo las que más habían caído."),
 ("abril", "Y no es la primera vez. En abril de dos mil veinticinco pasó algo parecido: una semana de menos nueve por ciento, y la siguiente, más cinco coma siete."),
 ("ejemplo", "Ejemplo hipotético: dos personas con mil dólares en el índice el viernes veinte. Una vendió por miedo. La otra no hizo nada. Hoy, la que se quedó tiene mil cincuenta y seis dólares."),
 ("ojo", "Ojo: esto no quiere decir que ya pasó lo peor. En noviembre, el ese ene pe todavía va abajo tres coma siete por ciento. Nadie sabe qué viene la otra semana."),
 ("cierre", "Lo que sí se ve una y otra vez es que los peores días y los mejores suelen llegar juntos. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("diecinueve meses", "19 meses"), ("ese ene pe quinientos", "S&P 500"), ("ocho coma seis por ciento", "−8,6 %"), ("cinco coma seis por ciento", "+5,6 %"),
       ("viernes veinte", "viernes 20"), ("dieciséis y el veinte de noviembre", "16 y el 20 de noviembre"), ("Nasdaq cien", "Nasdaq 100"), ("menos diez coma cuatro", "−10,4 %"),
       ("más seis coma ocho", "+6,8 %"), ("abril de dos mil veinticinco", "abril de 2025"), ("menos nueve por ciento", "−9 %"), ("más cinco coma siete", "+5,7 %"),
       ("mil dólares", "USD 1.000"), ("mil cincuenta y seis dólares", "USD 1.056"), ("mil cincuenta y seis", "USD 1.056"), ("tres coma siete por ciento", "3,7 %")]
