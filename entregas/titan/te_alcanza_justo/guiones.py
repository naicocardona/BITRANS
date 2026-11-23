# TITÁN · «Si te alcanza justo, no te alcanza» · línea B (plata del día a día) · tema de una referencia de Lady, con guion, escenas y frases propias · voz Juan (ElevenLabs)
# Salario mínimo 2026: $1.750.905 (Decreto 1469 de 2025). Recomendación: BBVA, fondo de emergencia de 3 a 6 meses de gastos básicos (La República, 7 may 2026).
# EJEMPLO HIPOTÉTICO: Ana gana el mínimo y le sobran $100.000 al mes; Bruno gana $6.000.000 y no le sobra nada. Imprevisto de $400.000: Ana lo cubre con 4 meses de ahorro; Bruno se endeuda.
SH = [
 ("gancho", "Si la plata te alcanza justo, en realidad no te alcanza."),
 ("ejemplo", "Ejemplo hipotético: Ana gana el mínimo y le sobran cien mil pesos al mes. Bruno gana seis millones y no le sobra nada. Llega un imprevisto de cuatrocientos mil."),
 ("giro", "Ana lo paga con cuatro meses de ahorro. Bruno, que gana más del triple, termina endeudado."),
 ("cierre", "No es cuánto entra: es cuánto aguantas si algo sale mal. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "Si la plata te alcanza justo, en realidad no te alcanza."),
 ("diferencia", "Porque ganar poco y vivir al día no son lo mismo. Vivir al día es que un solo gasto inesperado te desordene todo el mes."),
 ("imprevistos", "Se daña el celular, una cita médica, el arreglo de la moto. La plata sí entró, pero ya estaba comprometida desde antes."),
 ("ejemplo", "Ejemplo hipotético: Ana gana el salario mínimo, un millón setecientos cincuenta mil novecientos cinco pesos, y le sobran cien mil al mes. Bruno gana seis millones, pero entre arriendo, carro y tarjetas, no le sobra nada."),
 ("giro", "Llega un imprevisto de cuatrocientos mil pesos. Ana lo paga con cuatro meses de ahorro. Bruno, que gana más del triple, lo pasa a la tarjeta y termina pagando intereses."),
 ("leccion", "El sueldo dice cuánto entra. Lo que te queda cada mes dice cuánto aguantas."),
 ("colchon", "Por eso, antes de invertir, primero va un colchón. BBVA, por ejemplo, recomienda guardar entre tres y seis meses de gastos básicos, en algo que puedas sacar rápido."),
 ("cierre", "Si mañana pasa algo, ¿cuántos meses aguantarías? Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("un millón setecientos cincuenta mil novecientos cinco pesos", "$1.750.905"), ("cien mil pesos", "$100.000"), ("cien mil", "$100.000"), ("seis millones", "$6.000.000"),
       ("cuatrocientos mil pesos", "$400.000"), ("cuatrocientos mil", "$400.000"), ("cuatro meses", "4 meses"), ("tres y seis meses", "3 y 6 meses")]
# Pausas de lectura en el Short (llega a 35 s sin acelerar la voz): después del giro y de la frase clave.
PAUSAS = {"sh": [("imprevisto de cuatrocientos mil.", 0.7), ("termina endeudado.", 1.2)]}
# Tramos medidos en sh.wav (con la pausa): Whisper corría ~1,5 s «termina endeudado» y el cierre (tools/retime_words.py).
RETIME = {"tk": [("Haz tu cuenta.", 69.22, 69.9), ("Contenido educativo.", 70.22, 71.38), ("No es una recomendación de inversión.", 71.7, 73.72)],
          "sh": [("termina endeudado.", 22.08, 23.16), ("No es cuánto entra:", 23.46, 24.84, "cierre"), ("es cuánto aguantas si algo sale mal.", 25.16, 27.6)]}
