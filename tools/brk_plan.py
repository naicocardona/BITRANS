# ================= plan Berkshire (sh = Short, tk = TikTok) =================
import re as _re
def prefixed(fn, p):   # copia una escena con todos sus ids prefijados (para volver a una mesa «nueva»)
    def g():
        s = fn(); s = _re.sub(r'id="([^"]+)"', lambda m: f'id="{p}{m.group(1)}"', s)
        return s.replace('url(#', f'url(#{p}')
    return g
SCF = dict(NS.SCENES); SCF["table2"] = prefixed(NS.s_table, "b")
TK = MODE == "tk"
def hookbeats(px, t):   # dos fichas salen hacia la caja, el dinero sale y los vendedores se van; la ficha dorada no se mueve
    b = []
    for k, (ci, dx) in enumerate([(8, -304), (9, -392)]):
        b += [[t + k * 0.25, "move", f"#{px}ch{ci}", dx, -160, 0.55], [t + 0.5 + k * 0.25, "dim", f"#{px}ch{ci}", 0.0]]
    b += [[t + 0.2, "move", f"#{px}bl0", -70, 330, 0.6], [t + 0.3, "move", f"#{px}bl1", -60, 340, 0.6], [t + 0.4, "move", f"#{px}bl2", 80, 330, 0.6], [t + 0.5, "move", f"#{px}bl3", 90, 340, 0.6]]
    b += [[t + 0.15, "on", f"#{px}bl0, #{px}bl1, #{px}bl2, #{px}bl3"], [t + 1.0, "dim", f"#{px}bl0, #{px}bl1, #{px}bl2, #{px}bl3", 0.0]]
    b += [[t + 0.2, "move", f"#{px}boxL", 0, 60, 0.9], [t + 0.25, "shake", f"#{px}box"], [t + 0.6, "pop", f"#{px}c8"], [t + 0.6, "dim", f"#{px}c10", 0.0]]
    b += [[t + 1.1, "walk", f"{px}sa", -260, 1.4], [t + 1.2, "walk", f"{px}sb", -260, 1.4], [t + 0.9, "pulse", f"#{px}ch0"]]
    return b
t_n = A("Berkshire") - 0.3; t_t = A("Imagina") - 0.35; t_c = A("Mira") - 0.3; t_e = A("Antes de celebrar") - 0.35
if TK:
    t_x = A("Imagina dos empresas") - 0.35
    SCN = [("table", 0, None, (540, 540, 1.0), (540, 560, 1.04)), ("news", t_n, "whip", (540, 540, 1.0), (540, 560, 1.05)),
           ("table2", t_t, "wipe", (540, 600, 1.0), (540, 580, 1.04)), ("compare", t_x, "whip", (540, 540, 1.0), (540, 560, 1.04)), ("end", t_e, "wipe", (540, 520, 1.0), (540, 540, 1.05))]
else:
    SCN = [("table", 0, None, (540, 540, 1.0), (540, 560, 1.04)), ("news", t_n, "whip", (540, 540, 1.0), (540, 560, 1.05)),
           ("table2", t_t, "wipe", (540, 600, 1.0), (540, 580, 1.04)), ("end", t_e, "wipe", (540, 520, 1.0), (540, 540, 1.05))]
BEATS = hookbeats("", 0.6) + [[0.2, "pulse", "#ch0"], [0.3, "face", "yo", "sm"], [1.6, "face", "yo", "oh"], [2.4, "shrug", "yo"]]
# noticia
BEATS += [[t_n + 0.05, "pop", "#bh"], [A("gastó unos"), "pop", "#amt"], [A("gastó unos") + 0.1, "shake", "#amt"], [A("en un trimestre."), "show", "#mo0"], [A("en un trimestre.") + 0.25, "show", "#mo1"],
          [A("en un trimestre.") + 0.5, "show", "#mo2"], [A("en un trimestre.") + 0.7, "show", "#qtag"], [A("recomprando"), "show", "#rep"], [A("¿Qué cambia"), "face", "rd", "oh"],
          [A("¿Qué cambia") + 0.3, "shrug", "rd2"], [t_n + 0.6, "walk", "rd", 180, 1.6]]
# fichas: 10 → 8 (mesa nueva)
tr = A("las retira,")
BEATS += [[t_t + 0.2, "pulse", "#bch0"], [A("tuya."), "pulse", "#bch0"], [A("tuya."), "jump", "byo"], [A("tuya.") + 0.2, "face", "byo", "sm"],
          [A("Si la empresa") + 0.4, "pulse", "#bch8, #bch9"], [A("Si la empresa") + 0.7, "point", "bsa"]]
BEATS += [[tr - 0.1, "pop", "#bret"]] + [x for x in hookbeats("b", tr) if x[2] not in ("#bboxL",)]
BEATS += [[A("tú sigues"), "pop", "#bkeep"], [A("tú sigues") + 0.2, "pulse", "#bch0"]]
t_p = A("Pero ahora tienes") if TK else A("pero ahora es")
BEATS += [[t_p, "dim", "#bp10", 0.0], [t_p + 0.05, "pop", "#bp125"], [t_p + 0.4, "pulse", "#bp125"], [t_p + 0.3, "cheer", "byo"], [t_p, "cam", 2, 540, 640, 1.05, 0.8]]
# la caja: retroceso breve y el dinero que salió
BEATS += [[t_c + 0.05, "cam", 2, 540, 540, 1.0, 0.6]]
for ci in (8, 9): BEATS += [[t_c + 0.1, "move", f"#bch{ci}", 0, 0, 0.6], [t_c + 0.1, "lit", f"#bch{ci}"]]
BEATS += [[t_c + 0.1, "lit", "#bc10"], [t_c + 0.1, "dim", "#bc8", 0.0], [t_c + 0.1, "move", "#bboxL", 0, 0, 0.5], [t_c + 0.1, "dim", "#bret, #bkeep", 0.0]]
td = A("salió dinero") if not TK else A("salió dinero de")
BEATS += [[td - 0.6, "cam", 2, 800, 380, 1.45, 0.9]] + [x for x in hookbeats("b", td) if x[1] not in ("walk",)] + [[td + 0.3, "move", "#bboxL", 0, 70, 1.2], [td + 0.2, "shake", "#bbox"], [td + 1.6, "cam", 2, 540, 560, 1.0, 0.9]]
if not TK:
    BEATS += [[A("pagó demasiado"), "shake", "#bbox"], [A("pagó demasiado"), "face", "byo", "fl"], [A("valga más."), "shrug", "byo"]]
else:
    BEATS += [[A("Suena bien"), "face", "byo", "sm"], [A("¿cierto?"), "face", "byo", "fl"]]
    tq = A("retiran exactamente")
    BEATS += [[tq, "move", "#cAc3", 0, -260, 0.6], [tq, "move", "#cAc4", 0, -260, 0.6], [tq + 0.15, "move", "#cBc3", 0, -260, 0.6], [tq + 0.15, "move", "#cBc4", 0, -260, 0.6],
              [tq + 0.6, "dim", "#cAc3, #cAc4, #cBc3, #cBc4", 0.0], [A("mismo número"), "pop", "#same"], [A("razonable."), "pop", "#cAd"], [A("razonable."), "move", "#cAboxL", 0, 40, 0.9],
              [A("paga de más."), "pop", "#cBd"], [A("paga de más."), "move", "#cBboxL", 0, 110, 1.2], [A("paga de más.") + 0.2, "shake", "#cBbox"],
              [A("En ambas"), "pulse", "#cAc0, #cBc0"], [A("pero la segunda"), "pulse", "#cBd"], [A("pero la segunda") + 0.2, "shake", "#cBbox"],
              [A("Ese dinero también"), "on", "#alts"], [A("mejorar"), "pop", "#al0"], [A("pagar deuda"), "pop", "#al1"], [A("otra oportunidad."), "pop", "#al2"]]
# cierre
BEATS += [[t_e - 0.02, "on", "#q1, #q2"], [t_e + 0.8, "dim", "#q1, #q2", 0.3], [A("cuánto pagó"), "lit", "#q1"], [A("cuánto pagó") + 0.1, "shake", "#q1"], [A("qué otra cosa"), "lit", "#q2"], [A("qué otra cosa") + 0.1, "shake", "#q2"],
          [t_e + 0.4, "pulse", "#eChip"], [A("qué otra cosa") + 1.0, "wave", "eA"], [DUR - 1.4, "jump", "eB"]]
OV = [(B("TU PORCIÓN CRECE.", 74) + "<br>" + B("¿Y TU DINERO?", 74, "gold").replace('style="', 'style="margin-top:10px;', 1), 0, t_n),
      (TAG("RECOMPRAS · 3.ER TRIMESTRE DE 2026") + "<br>" + B("Berkshire recompró sus propias acciones", 50), t_n + 0.3, A("¿Qué cambia")),
      (B("¿Qué cambia para quien se queda?", 56, "gold"), A("¿Qué cambia"), t_t),
      (B("10 fichas · 1 es tuya", 64), t_t + 0.3, A("Si la empresa")),
      (B("La empresa recompra 2 y las retira", 54), A("Si la empresa"), t_p),
      (B("Tu parte: 10 % → 12,5 %", 64, "gold"), t_p, t_c),
      (B("Pero salió dinero de la caja", 60), t_c + 0.1, (A("pagó demasiado") if not TK else t_x))]
if not TK:
    OV += [(B("Porción más grande ≠ inversión que vale más", 48, "gold"), A("pagó demasiado"), t_e)]
else:
    OV += [(TAG("EJEMPLO HIPOTÉTICO") + "<br>" + B("Mismas acciones retiradas", 58), t_x + 0.3, A("pero la segunda")),
           (TAG("EJEMPLO HIPOTÉTICO") + "<br>" + B("B entregó más dinero por lo mismo", 52, "gold"), A("pero la segunda"), A("Ese dinero también")),
           (B("Ese dinero tenía otros usos", 60), A("Ese dinero también"), A("Por eso el tamaño")),
           (B("El tamaño del anuncio no lo dice todo", 52, "gold"), A("Por eso el tamaño"), t_e)]
OV += [(B("Antes de celebrar una recompra…", 56), t_e + 0.3, DUR)]
HUDL = ["Tu parte", "Berkshire", "Fichas", "Caja"] + (["Comparación"] if TK else []) + ["Preguntas"]
HUDT = [0, t_n, t_t, t_c] + ([t_x] if TK else []) + [t_e]
CTA_T, CTA = A("qué otra cosa") + 1.2, ("Contenido educativo.", "No es una recomendación de inversión.")
