# TITÁN · «La portada de The Economist 2027… ¿qué tiene que ver con tu plata?» · línea A · voz Juan · BORRADOR 17 nov 2026
# Video de referencia de Lady: solo para el tema. No se muestra la portada (derechos) ni personas reales: todo ilustrado en estilo TITÁN.
# Fuentes (The World Ahead 2027, publicado el 17 nov 2026, según N+, Azernews y Cultura Colectiva): presión sobre la deuda de los gobiernos ricos y su costo
# de endeudamiento; riesgo de corrección por la deuda de las tecnológicas en IA; la guerra con Irán puede afectar energía y fertilizantes (Azernews);
# fármacos para bajar de peso cambian el gasto (ropa, cosméticos, gimnasio); posible súper El Niño; China/Taiwán; elección en Francia; lanzamientos espaciales más baratos.
SH = [
 ("gancho", "Acaba de salir la portada de The Economist para dos mil veintisiete. Tanques, misiles y gráficas cayendo. Pero la pregunta que importa es otra: ¿qué tiene que ver con tu plata?"),
 ("riesgos", "La revista advierte dos cosas para quien invierte. Los gobiernos ricos van a pagar más caro por endeudarse. Y las empresas de inteligencia artificial se están endeudando tanto que podría venir una corrección fuerte en la bolsa."),
 ("ozempic", "Y un dato curioso: según la revista, quienes usan medicamentos para bajar de peso terminan gastando más en ropa, cosméticos y gimnasio."),
 ("leccion", "Nadie sabe cuál de estas cosas va a pasar. Ni siquiera The Economist. Por eso quien invierte no apuesta todo a una sola predicción: diversifica."),
 ("cierre", "¿Cuál de estos temas te preocupa más?"),
]
TK = [
 SH[0],
 ("deuda", "Primero, la deuda. Según la revista, los gobiernos de los países ricos van a pagar más caro por endeudarse. Y cuando eso pasa, se mueven las tasas de interés, los créditos y hasta el precio de las acciones."),
 ("ia", "Segundo, la inteligencia artificial. Las empresas de tecnología se están endeudando muchísimo para construirla. Y la revista advierte que eso aumenta el riesgo de una corrección fuerte en la bolsa."),
 ("iran", "Tercero, la guerra con Irán. Si sigue, puede afectar la energía y los fertilizantes. Y cuando sube la energía, sube casi todo."),
 ("ozempic", "Cuarto, un dato curioso: según la revista, quienes usan medicamentos para bajar de peso terminan gastando más en ropa, cosméticos y gimnasio. Un remedio que mueve industrias enteras."),
 ("mas", "Y hay más: un posible súper El Niño con calor extremo, la tensión entre China y Taiwán, elecciones en Francia y viajes al espacio cada vez más baratos."),
 ("leccion", "¿Qué hacer con todo esto? Nadie sabe cuál de estas cosas va a pasar, ni cuándo. Ni siquiera The Economist. Por eso quien invierte no apuesta todo a una sola predicción: diversifica."),
 SH[4],
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("dos mil veintisiete", "2027")]
