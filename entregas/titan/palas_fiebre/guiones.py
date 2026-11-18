# TITÁN · «Los que venden las palas» · línea A · adaptado de un video de referencia de Lady (solo el tema; guion, look y frases propios)
# Fiebre del oro de California: desde el 24 ene. 1848; ~300.000 personas llegaron (Wikipedia, California gold rush).
# Samuel Brannan compró bateas, picas y palas; bateas a 20 centavos, revendidas a 15 dólares; primer millonario de California (Wikipedia, Samuel Brannan).
# NVDA (Yahoo Finance, cierre ajustado mensual): oct. 2022 → oct. 2026 ×15,2; nov. 2021 → sep. 2022 −62,8 %.
SH = [
 ("gancho", "En la fiebre del oro de California, el que más ganó no excavó ni un día. Vendió las palas."),
 ("historia", "Sam Brannan compró todas las bateas que encontró, a veinte centavos, y las vendió a quince dólares. Fue el primer millonario de California."),
 ("hoy", "Hoy la fiebre es la inteligencia artificial, y Envidia vende los chips: desde octubre de dos mil veintidós, su acción se multiplicó por quince. Pero antes había caído casi un sesenta y tres por ciento."),
 ("cierre", "Las palas también se caen. Antes de seguir una fiebre, haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
TK = [
 ("gancho", "En la fiebre del oro de California, el que más ganó no excavó ni un día. Vendió las palas."),
 ("fiebre", "En mil ochocientos cuarenta y ocho apareció oro en un río de California. En pocos años llegaron unas trescientas mil personas a buscarlo."),
 ("historia", "Pero un comerciante, Sam Brannan, hizo otra cosa: compró todas las bateas, picas y palas que encontró. Pagaba veinte centavos por cada batea y la vendía a quince dólares. Encontraran oro o no, él cobraba. Se convirtió en el primer millonario de California."),
 ("hoy", "En la bolsa pasa algo parecido. En la fiebre de la inteligencia artificial, miles de empresas necesitan chips, y Envidia es de las que los vende. Desde octubre de dos mil veintidós, su acción se multiplicó por quince."),
 ("cae", "Pero ojo: las palas también se caen. Entre noviembre de dos mil veintiuno y septiembre de dos mil veintidós, esa misma acción perdió casi el sesenta y tres por ciento."),
 ("cierre", "Vender las palas no te salva de la volatilidad. Antes de seguir una fiebre, pregúntate quién gana pase lo que pase, y cuánto riesgo aguantas. Haz tu cuenta. Contenido educativo. No es una recomendación de inversión."),
]
text = lambda L: " ".join(t for _, t in L)
MAP = [("mil ochocientos cuarenta y ocho", "1848"), ("trescientas mil personas", "300.000 personas"), ("veinte centavos", "USD 0,20"), ("quince dólares", "USD 15"),
       ("Envidia", "Nvidia"), ("octubre de dos mil veintidós", "oct. 2022"), ("noviembre de dos mil veintiuno", "nov. 2021"), ("septiembre de dos mil veintidós", "sep. 2022"),
       ("sesenta y tres por ciento", "63 %"), ("por quince", "por 15")]
