# NAS100 EDGE LAB · REPORTE SEMANAL #14 (16–20 nov 2026) · trades #030 (SELL, dom 15 nov 11 p. m.), #031 (SELL, lun 16 10 a. m.), #032 (SELL, lun 16 11 p. m.) y #033 (SELL, mar 17 10 a. m.)
# Datos de los guiones aprobados de cada trade (comprobantes del bróker). Sin dinero ni lotes: solo puntos ejecutados. (id, voz, subtítulo con | por línea)
# Voz (Kokoro em_alex 0,92 · Explorador): escor = score, treid = trade, teik prófit = take profit, te pe = TP. Números en palabras para la voz y en cifras en pantalla.
# 101,65 + 99,95 + 103,70 + 99,70 = 405,00 puntos ejecutados.
TK = [
 ("g1", "Cuatro ventas en una semana, y las cuatro llegaron al teik prófit", "Cuatro ventas en una semana,|y las cuatro llegaron al Take Profit."),
 ("g2", "Pero dos tardaron horas, y dos, menos de seis minutos", "Pero dos tardaron horas,|y dos, menos de seis minutos."),
 ("a1", "Domingo, once de la noche: escor seis, justo en el mínimo, con el radar empatado", "Domingo, 11 de la noche: score 6,|justo en el mínimo,|con el radar empatado."),
 ("a2", "Ciento uno coma sesenta y cinco puntos en una hora y diez minutos", "101,65 puntos|en 1 hora y 10 minutos."),
 ("b1", "Lunes, diez de la mañana: escor nueve, la lectura más fuerte de la semana", "Lunes, 10 de la mañana: score 9,|la lectura más fuerte de la semana."),
 ("b2", "Noventa y nueve coma noventa y cinco puntos en cuatro minutos y cincuenta y cuatro segundos", "99,95 puntos|en 4 minutos y 54 segundos."),
 ("c1", "Lunes, once de la noche: escor siete, con las medias mixtas", "Lunes, 11 de la noche: score 7,|con las medias mixtas."),
 ("c2", "Ciento tres coma setenta puntos en dos horas y diecisiete minutos", "103,70 puntos|en 2 horas y 17 minutos."),
 ("d1", "Martes, diez de la mañana: otra vez escor siete", "Martes, 10 de la mañana:|otra vez score 7."),
 ("d2", "Noventa y nueve coma setenta puntos en cinco minutos y cuarenta y tres segundos", "99,70 puntos|en 5 minutos y 43 segundos."),
 ("t1", "Balance: cuatro treids, cuatro teik prófits y cuatrocientos cinco puntos ejecutados", "Balance: cuatro trades,|cuatro Take Profits|y 405 puntos ejecutados."),
 ("l1", "Uno: escores de seis a nueve llegaron al objetivo. Con cuatro casos, no sabemos cuál funciona mejor", "Uno: scores de 6 a 9 llegaron al objetivo.|Con cuatro casos,|no sabemos cuál funciona mejor."),
 ("l2", "Dos: las ventas de las diez de la mañana tardaron minutos; las nocturnas, horas. Todavía no es una regla", "Dos: las ventas de las 10 de la mañana|tardaron minutos; las nocturnas, horas.|Todavía no es una regla."),
 ("l3", "Tres: el objetivo era de cien puntos, y se ejecutó entre noventa y nueve coma setenta y ciento tres coma setenta. Cuenta el dato ejecutado", "Tres: el objetivo era de 100 puntos,|y se ejecutó|entre 99,70 y 103,70.|Cuenta el dato ejecutado."),
 ("x1", "Cuatro de cuatro en una muestra pequeña. No buscamos operaciones perfectas. Buscamos ventaja estadística", "Cuatro de cuatro en una muestra pequeña.|No buscamos operaciones perfectas.|Buscamos ventaja estadística."),
]
SH = [
 ("s1", "Cuatro ventas esta semana, y cuatro teik prófits", "Cuatro ventas esta semana,|y cuatro Take Profits."),
 ("s2", "Domingo en la noche, escor seis: ciento uno coma sesenta y cinco puntos en una hora y diez", "Domingo en la noche, score 6:|101,65 puntos en 1 hora y 10."),
 ("s3", "Lunes a las diez, escor nueve: noventa y nueve coma noventa y cinco en menos de cinco minutos", "Lunes a las 10, score 9:|99,95 en menos de 5 minutos."),
 ("s4", "Lunes en la noche, escor siete: ciento tres coma setenta en dos horas y diecisiete", "Lunes en la noche, score 7:|103,70 en 2 horas y 17."),
 ("s5", "Martes a las diez, escor siete: noventa y nueve coma setenta en cinco minutos y cuarenta y tres segundos", "Martes a las 10, score 7:|99,70 en 5 minutos y 43 segundos."),
 ("s6", "Balance: cuatro treids, cuatro te pe y cuatrocientos cinco puntos ejecutados", "Balance: cuatro trades, cuatro TP|y 405 puntos ejecutados."),
 ("s7", "Tres apuntes: el escor respaldó cada entrada, pero no garantiza el resultado", "Tres apuntes: el score respaldó cada entrada,|pero no garantiza el resultado."),
 ("s8", "Las ventas de la mañana fueron mucho más rápidas, aunque todavía no es una regla", "Las ventas de la mañana fueron mucho más rápidas,|aunque todavía no es una regla."),
 ("s9", "Y en la bitácora cuenta el dato ejecutado, no el objetivo redondo", "Y en la bitácora cuenta el dato ejecutado,|no el objetivo redondo."),
 ("s10", "Buscamos ventaja estadística", "Buscamos ventaja estadística."),
]
GAP = {"g1": 0.2, "a1": 0.35, "b1": 0.35, "c1": 0.35, "d1": 0.35, "t1": 0.35, "l1": 0.35, "l2": 0.35, "l3": 0.35, "x1": 0.35,
       "s1": 0.2, "s2": 0.3, "s3": 0.3, "s4": 0.3, "s5": 0.3, "s6": 0.35, "s7": 0.35, "s10": 0.3}
ON_SCREEN = {}
