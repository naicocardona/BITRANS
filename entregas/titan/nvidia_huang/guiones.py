# TITÁN · «Wall Street subió. Nvidia cayó.» (9 nov 2026) · guiones del brief, textuales.
# Para la voz (Juan, ElevenLabs): «Envidia» = Nvidia, «Yensen Huang» = Jensen Huang, «ese ene pe quinientos» = S&P 500 (en pantalla van bien escritos).
G = "Wall Street subió. Envidia cayó. Y mientras pasaba eso, la empresa estaba bajo los reflectores por su director."
ADM = "Yensen Huang admitió una infidelidad."
CON = "Pero para un accionista, la noticia va más allá: el consejo abrió una investigación independiente tras reportes de que Huang pudo haber sido blanco de una operación de inteligencia extranjera."
SEC = "¿Se filtraron secretos? Eso no está confirmado. El consejo dijo que no tenía motivos para creer que hubieran sido comprometidos."
PRE = "La pregunta para un inversor es: ¿cuánto depende esta empresa de una sola persona?"
SH = [("gancho", G), ("admite", ADM), ("consejo", CON), ("secretos", SEC),
      ("cierre9", "El nueve de noviembre, Envidia cerró cuatro coma tres por ciento abajo, mientras el ese ene pe quinientos subió. La caída no nos dice por sí sola qué cambió en el negocio."),
      ("pregunta", PRE)]
TK = [("gancho", G), ("admite", ADM), ("consejo", CON), ("secretos", SEC),
      ("cierre9", "El nueve de noviembre, Envidia cerró cuatro coma tres por ciento abajo y el ese ene pe quinientos subió. Es un contraste llamativo, pero no prueba que una sola noticia explique la caída."),
      ("ejemplo", "Para entender por qué importa, imagina dos empresas. En una, los clientes, las decisiones y la estrategia dependen mucho del fundador. En la otra, hay un equipo que puede seguir tomando decisiones si esa persona falta. El mismo titular puede significar riesgos muy distintos para las dos."),
      ("seguir", "En Envidia, lo que conviene seguir es qué comunica el consejo y si hay algún cambio confirmado en el liderazgo o en el negocio."),
      ("pregunta", PRE)]
text = lambda L: " ".join(t for _, t in L)
