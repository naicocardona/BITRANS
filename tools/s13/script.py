# NAS100 EDGE LAB · REPORTE SEMANAL #13 (9–13 nov 2026) · trades #028 (SELL, dom 8 nov 11 p. m.) y #029 (BUY, lun 9 nov 10 a. m.) · guion del brief, textual · (id, voz, subtítulo con | por línea)
# Para el máximo de ~75 s sin acelerar la voz, b2, c1b, c2b y x2 del brief pasan a texto en pantalla (ver ON_SCREEN).
# Voz (Kokoro em_alex 0,92 · Explorador): escor = score, treid = trade, teik prófit = take profit, te pe = TP, Treiding viu = TradingView. Números en palabras para la voz y en cifras en pantalla.
TK = [
 ("g1", "Esta semana documentamos una venta nocturna y una compra de mañana", "Esta semana documentamos una venta nocturna|y una compra de mañana."),
 ("g2", "Las dos alcanzaron el objetivo, pero llegaron allí en condiciones y tiempos muy distintos", "Las dos alcanzaron el objetivo,|pero llegaron allí en condiciones|y tiempos muy distintos."),
 ("a1", "La venta nocturna entró con escor seis, justo en el mínimo permitido", "La venta nocturna entró con score 6,|justo en el mínimo permitido."),
 ("a2", "El radar favorecía claramente la venta, aunque la estructura de medias era mixta y la volatilidad estaba marcada como alta", "El radar favorecía claramente la venta,|aunque la estructura de medias era mixta|y la volatilidad estaba marcada como alta."),
 ("a3", "El bróker registró ciento uno coma cuarenta y cinco puntos en una hora y cincuenta y dos minutos", "El bróker registró 101,45 puntos|en 1 hora y 52 minutos."),
 ("b1", "En la mañana del lunes, la lectura cambió a compra: escor ocho y precio sobre las dos medias", "En la mañana del lunes, la lectura cambió a compra:|score 8 y precio sobre las dos medias."),
 ("b3", "El objetivo se alcanzó mucho más rápido: cien coma ochenta y dos puntos ejecutados en treinta minutos y trece segundos", "El objetivo se alcanzó mucho más rápido:|100,82 puntos ejecutados|en 30 minutos y 13 segundos."),
 ("t1", "El balance de las dos operaciones publicadas es de dos teik prófits y doscientos dos coma veintisiete puntos ejecutados", "El balance de las dos operaciones publicadas|es de dos Take Profits|y 202,27 puntos ejecutados."),
 ("c1a", "La venta apenas alcanzó el escor mínimo, mientras la compra marcó ocho. Ambas llegaron al te pe", "La venta apenas alcanzó el score mínimo,|mientras la compra marcó 8.|Ambas llegaron al TP."),
 ("c2a", "Las dos buscaron alrededor de cien puntos. La venta necesitó casi dos horas; la compra, cerca de media hora", "Las dos buscaron alrededor de 100 puntos.|La venta necesitó casi dos horas;|la compra, cerca de media hora."),
 ("c3a", "Treiding viu siguió midiendo el precio después de nuestras salidas", "TradingView siguió midiendo el precio|después de nuestras salidas."),
 ("c3b", "Esos recorridos más amplios sirven para estudiar el mercado, pero nuestro resultado acreditado sigue siendo ciento uno coma cuarenta y cinco y cien coma ochenta y dos puntos", "Esos recorridos más amplios sirven para estudiar el mercado,|pero nuestro resultado acreditado sigue siendo|101,45 y 100,82 puntos."),
 ("x1", "Dos de dos en una muestra pequeña", "Dos de dos en una muestra pequeña."),
]
SH = [
 ("s1", "Dos direcciones opuestas y dos teik prófits en los treids publicados esta semana", "Dos direcciones opuestas y dos Take Profits|en los trades publicados esta semana."),
 ("s2", "La venta nocturna del domingo entró con escor seis, justo en el mínimo", "La venta nocturna del domingo|entró con score 6, justo en el mínimo."),
 ("s3", "El radar favorecía la caída y el bróker registró ciento uno coma cuarenta y cinco puntos en casi dos horas", "El radar favorecía la caída|y el bróker registró 101,45 puntos|en casi dos horas."),
 ("s4", "El lunes a las diez de la mañana, compramos con escor ocho y el precio sobre las dos medias", "El lunes a las 10 de la mañana,|compramos con score 8|y el precio sobre las dos medias."),
 ("s5", "Resultado: cien coma ochenta y dos puntos en treinta minutos", "Resultado: 100,82 puntos|en 30 minutos."),
 ("s6", "¿Qué nos deja?", "¿Qué nos deja?"),
 ("s7", "Primero, dos escores distintos llegaron al objetivo: aún no sabemos cuál se comporta mejor", "Primero, dos scores distintos llegaron al objetivo:|aún no sabemos cuál se comporta mejor."),
 ("s8", "Segundo, el tiempo para alcanzar unos cien puntos fue muy diferente", "Segundo, el tiempo para alcanzar|unos 100 puntos fue muy diferente."),
 ("s9", "Tercero, el recorrido posterior de Treiding viu no es beneficio capturado", "Tercero, el recorrido posterior de TradingView|no es beneficio capturado."),
 ("s10", "Balance de esta muestra: dos treids, dos te pe y doscientos dos coma veintisiete puntos", "Balance de esta muestra: dos trades, dos TP|y 202,27 puntos."),
 ("s11", "Seguimos documentando para buscar ventaja estadística", "Seguimos documentando|para buscar ventaja estadística."),
]
GAP = {"g1": 0.2, "a1": 0.35, "b1": 0.35, "t1": 0.35, "c1a": 0.35, "c2a": 0.35, "c3a": 0.35, "x1": 0.35, "x2": 0.2,
       "s1": 0.2, "s2": 0.3, "s4": 0.3, "s6": 0.35, "s7": 0.2, "s8": 0.2, "s9": 0.2, "s10": 0.35, "s11": 0.25}
ON_SCREEN = {"b2": "LA VOLATILIDAD TAMBIÉN ESTABA ALTA · ATR 94",
             "c1b": "DOS CASOS PARA COMPARAR · AÚN NO PERMITE AFIRMAR QUÉ NIVEL DE SCORE FUNCIONA MEJOR",
             "c2b": "REGISTRAR CUÁNTO TARDA CADA SESIÓN DA MÁS CONTEXTO QUE MIRAR SOLO SI HUBO TP",
             "x2": "SEGUIMOS REGISTRANDO LAS DIFERENCIAS ENTRE CADA DECISIÓN · LA VENTAJA SE EVALÚA CON MUCHOS TRADES"}
