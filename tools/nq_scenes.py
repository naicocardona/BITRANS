# TITÁN · paquete «Nasdaq y cómo empezar» (nov 2026) · escenas reutilizables 1080×1080 (escenario cuadrado)
# Paleta del brief: azul oscuro #0D1020, marfil #F6F4EF, dorado #C8A45D (+ verde/rojo solo para datos).
# Las mismas escenas sirven al largo (escenario a la derecha) y a los verticales (escenario al centro).
import json, os
from flat_scenes import fig, place, SKINS
H = os.path.dirname(os.path.abspath(__file__))
BG, BG2, IV, GD, INK = "#0D1020", "#171B33", "#F6F4EF", "#C8A45D", "#0D1020"
UP, DN, MUT = "#3FAF7A", "#E0675C", "#8C90A8"
HAIRS = ["#1E1A2E", "#5A3A22", "#2B1B12", "#8A5A2B"]
F1, F2 = "Bricolage", "Jakarta"

def SVG(inner, bg=BG):
    dots = ''.join(f'<circle cx="{30+(k%14)*78}" cy="{30+(k//14)*78}" r="2.6" fill="{IV}" opacity=".05"/>' for k in range(14 * 14))
    return f'<svg viewBox="0 0 1080 1080" width="1080" height="1080" xmlns="http://www.w3.org/2000/svg"><rect width="1080" height="1080" fill="{bg}"/>{dots}{inner}</svg>'
def T(x, y, s, fs, col=IV, fam=F1, w=800, anchor="middle", extra=""):
    return f'<text x="{x}" y="{y}" font-family="{fam}" font-weight="{w}" font-size="{fs}" text-anchor="{anchor}" fill="{col}" {extra}>{s}</text>'
def P(id, k, x, y, s, flip=False, shirt=None, pants=None):
    sh = shirt or [GD, "#9BB0E8", "#E8A87C", IV, "#7FC8B0", "#B9A2E8"][k % 6]
    return place(fig(id, SKINS[k % 4], HAIRS[k % 4], sh, pants or ["#2A3150", "#3B4466", "#1E2338", "#4A3F6A"][k % 4], k % 4), x, y, s, flip)
def floor(y, c="#121630"):
    return f'<rect y="{y}" width="1080" height="{1080-y}" fill="{c}"/>' + ''.join(f'<rect x="{k*150}" y="{y+40}" width="80" height="6" rx="3" fill="{IV}" opacity=".12"/>' for k in range(8))
def chip(id, x, y, t, fill=GD, col=INK, fs=30, op="0", w=None):
    w = w or int(len(t) * fs * 0.56 + 48)
    return f'<g transform="translate({x} {y})"><g id="{id}" opacity="{op}"><rect x="{-w/2}" y="-{fs*0.95:.0f}" width="{w}" height="{fs*1.75:.0f}" rx="{fs*0.87:.0f}" fill="{fill}"/>{T(0, fs*0.25, t, fs, col, F2)}</g></g>'

# ---------- 1 · Miércoles rebote / jueves caída ----------
def s_cards():
    card = lambda id, x, d, t, v, c, arr: f'''<g transform="translate({x} 430)"><g id="{id}" opacity="0"><rect x="-230" y="-250" width="460" height="500" rx="34" fill="{IV}"/>
<rect x="-230" y="-250" width="460" height="110" rx="34" fill="{c}"/><rect x="-230" y="-170" width="460" height="30" fill="{c}"/>
{T(0, -180, d, 46, "#fff")}{T(0, -40, t, 54, INK)}<path d="{arr}" fill="{c}"/>{T(0, 200, v, 76, c)}</g></g>'''
    up = "M0 -10 L60 60 H25 V130 H-25 V60 H-60Z"; dn = "M0 130 L60 60 H25 V-10 H-25 V60 H-60Z"
    return SVG(f'''{card("cdW", 280, "MIÉRCOLES", "REBOTE", "+0,91 %", UP, up)}{card("cdJ", 800, "JUEVES", "CAÍDA", "−6,36 %", DN, dn)}
{floor(860)}{P("cp", 3, 540, 1000, 0.62, shirt="#9BB0E8")}<g transform="translate(540 1000) scale(.62)"><g id="cpPh"><rect x="22" y="-200" width="40" height="66" rx="8" fill="{INK}"/><rect x="26" y="-194" width="32" height="54" rx="5" fill="{GD}" opacity=".85"/></g></g>
{T(540, 1060, "Nasdaq-100 · cierres del 4 y 5 nov 2026", 22, MUT, F2, 700)}''')

# ---------- 2 · Gráfica del Nasdaq-100 con cierres oficiales ----------
def s_chart():
    D = json.load(open(f"{H}/nq_closes.json")); n = len(D)
    x0, x1, y0, y1, lo, hi = 110, 930, 250, 740, 26000, 31600
    X = lambda i: x0 + (x1 - x0) * i / (n - 1); Y = lambda v: y1 - (y1 - y0) * (v - lo) / (hi - lo)
    pts = " L".join(f"{X(i):.1f} {Y(v):.1f}" for i, (_, v) in enumerate(D)); ix = {d: i for i, (d, _) in enumerate(D)}
    pt = lambda d: (X(ix[d]), Y(D[ix[d]][1]))
    grid = ''.join(f'<line x1="{x0}" x2="{x1}" y1="{Y(v):.0f}" y2="{Y(v):.0f}" stroke="{IV}" stroke-opacity=".08" stroke-width="2"/>{T(x0-14, Y(v)+8, f"{v//1000}.{v%1000:03d}", 20, MUT, F2, 700, "end")}' for v in range(27000, 31001, 1000))
    mons = ''.join(T(X(i), y1 + 40, lab, 22, MUT, F2, 700) for i, lab in [(0, "SEP"), (ix["2026-10-01"], "OCT"), (ix["2026-11-02"], "NOV")])
    def dot(id, d, lab, dy, col=IV, anchor="middle", dx=0):
        x, y = pt(d); return f'<g id="{id}" opacity="0"><circle cx="{x:.1f}" cy="{y:.1f}" r="11" fill="{col}" stroke="{BG}" stroke-width="4"/>{T(x+dx, y+dy, lab, 24, col, F2, 800, anchor)}</g>'
    def bracket(id, a, b, lab, col, ylab):
        (xa, ya), (xb, yb) = pt(a), pt(b)
        return f'''<g id="{id}" opacity="0"><line x1="{xa:.0f}" y1="{ya:.0f}" x2="{xa:.0f}" y2="{ylab+14}" stroke="{col}" stroke-width="3" stroke-dasharray="6 6"/><line x1="{xb:.0f}" y1="{yb:.0f}" x2="{xb:.0f}" y2="{ylab+14}" stroke="{col}" stroke-width="3" stroke-dasharray="6 6"/>
<line x1="{xa:.0f}" y1="{ylab+14}" x2="{xb:.0f}" y2="{ylab+14}" stroke="{col}" stroke-width="4"/><rect x="{min((xa+xb)/2, 950)-110:.0f}" y="{ylab-36}" width="220" height="60" rx="30" fill="{col}"/>{T(min((xa+xb)/2, 950), ylab+6, lab, 34, "#fff", F1)}</g>'''
    xm, ym = pt("2026-10-06")
    return SVG(f'''{T(110, 150, "NASDAQ-100", 50, IV, F1, 800, "start")}{T(110, 196, "Cierres oficiales · sep–nov 2026", 26, GD, F2, 700, "start")}
{grid}{mons}<path id="chLine" d="M{pts}" fill="none" stroke="{GD}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
{dot("mx", "2026-10-06", "Máximo · 6 oct · 31.224,69", -26, IV, "start", -30)}
{dot("o30", "2026-10-30", "30 oct", 46, MUT)}{dot("dJ", "2026-11-05", "Jue 5 nov", 48, DN, "end", 10)}{dot("d6", "2026-11-06", "6 nov", 50, IV, "start", 14)}
{bracket("brJ", "2026-11-04", "2026-11-05", "−6,36 %", DN, 830)}{bracket("brS", "2026-10-30", "2026-11-06", "−4,91 %", "#C9752E", 830)}{bracket("brM", "2026-10-06", "2026-11-06", "−13,56 %", "#9C3D52", 830)}
<g id="brTag" opacity="0">{T(560, 1000, "Mismo índice · distinto punto de partida", 30, GD, F2, 800)}</g>
{T(110, 1050, "Fuente: Nasdaq vía FRED (NASDAQ100)", 20, MUT, F2, 700, "start")}''')

# ---------- 3 · Centro de datos y expectativa de pedidos ----------
def s_dc():
    rack = lambda x: f'<g transform="translate({x} 380)"><rect width="110" height="300" rx="10" fill="#1E2440" stroke="{GD}" stroke-opacity=".5" stroke-width="3"/>' + ''.join(f'<rect x="14" y="{18+k*40}" width="82" height="26" rx="5" fill="#2A3156"/><circle class="led" cx="{80}" cy="{31+k*40}" r="5" fill="{["#5CE1A1", GD, "#7FB2FF"][k%3]}"/>' for k in range(7)) + '</g>'
    order = f'''<g transform="translate(830 340)"><g id="ord" opacity="0"><rect x="-150" y="-170" width="300" height="340" rx="16" fill="{IV}"/>{T(0, -112, "PEDIDO DE EQUIPOS", 26, INK, F2)}
<rect x="-120" y="-90" width="240" height="6" fill="{INK}" opacity=".2"/>{''.join(f'<rect x="-120" y="{-60+k*34}" width="{240-(k%2)*60}" height="12" rx="6" fill="{INK}" opacity=".25"/>' for k in range(4))}
<g transform="translate(0 115)"><rect x="-120" y="-30" width="240" height="60" rx="30" fill="{GD}"/>{T(0, 10, "EXPECTATIVA", 28, INK, F2)}</g></g></g>
<g transform="translate(990 300)"><g id="ordDn" opacity="0"><path d="M0 120 L46 60 H18 V-40 H-18 V60 H-46Z" fill="{DN}"/></g></g>'''
    tag = f'''<g transform="translate(830 660)"><g id="px" opacity="0"><rect x="-150" y="-50" width="300" height="100" rx="20" fill="#1E2440" stroke="{DN}" stroke-width="3"/>{T(0, -8, "Precio de la acción", 24, IV, F2, 700)}{T(0, 32, "▼ antes de cancelar nada", 22, DN, F2, 800)}</g></g>'''
    truck = f'''<g transform="translate(0 800)"><g id="truck"><rect x="-150" y="-110" width="190" height="110" rx="10" fill="{IV}"/>{T(-55, -45, "EQUIPOS", 26, INK, F2)}
<rect x="40" y="-80" width="90" height="80" rx="12" fill="{GD}"/><rect x="60" y="-68" width="50" height="30" rx="6" fill="#9FC0FF"/><circle cx="-100" cy="6" r="22" fill="#111"/><circle cx="80" cy="6" r="22" fill="#111"/></g></g>'''
    return SVG(f'''{T(80, 170, "CENTRO DE DATOS", 44, IV, F1, 800, "start")}{T(80, 214, "Ejemplo ilustrativo", 24, GD, F2, 700, "start")}
<rect x="60" y="340" width="560" height="380" rx="22" fill="#151A33" stroke="{IV}" stroke-opacity=".15" stroke-width="3"/>{''.join(rack(90 + k*130) for k in range(4))}
{order}{tag}{floor(800)}{truck}{P("tec", 4, 400, 950, 0.55, shirt="#7FC8B0")}{P("ana", 5, 800, 950, 0.55, flip=True, shirt="#B9A2E8")}''')

# ---------- 4 · S&P 500: diez años y dos años ----------
def s_sp():
    bar = lambda id, x, h, col, lab, yr, up: f'''<g transform="translate({x} 700)"><g id="{id}"><rect x="-80" y="{-h if up else 0}" width="160" height="{h}" rx="12" fill="{col}"/>
{T(0, (-h-20) if up else (h+50), lab, 40, col, F1)}</g>{T(0, 80 if up else -24, yr, 30, IV, F2, 800)}</g>'''
    return SVG(f'''<g id="spBan"><rect x="60" y="110" width="960" height="84" rx="42" fill="{GD}"/>{T(540, 166, "CAMBIO DE ÍNDICE → S&amp;P 500", 40, INK, F1)}</g>
<g id="spAvg" opacity="0">{T(540, 300, "2016–2025: ≈ 12,9 % anual", 64, IV)}{T(540, 350, "En precio · en dólares · sin dividendos ni inflación · describe el pasado", 24, MUT, F2, 700)}</g>
<line x1="140" x2="940" y1="700" y2="700" stroke="{IV}" stroke-opacity=".35" stroke-width="3"/>
{bar("b22", 380, 194, DN, "−19,44 %", "2022", False)}{bar("b23", 700, 242, UP, "+24,23 %", "2023", True)}
<g id="spRes" opacity="0"><rect x="250" y="980" width="580" height="70" rx="35" fill="{IV}"/>{T(540, 1027, "2 años: casi el mismo punto (+0,08 %)", 30, INK, F2)}</g>
{T(980, 1066, "Fuente: S&amp;P Dow Jones Indices", 18, MUT, F2, 700, "end")}''')

# ---------- 5 · 100 → 80 → 96 · 80 → 100 = +25 % ----------
def s_math():
    col = lambda id, x, v, c, op="0": f'<g transform="translate({x} 860)"><g id="{id}" opacity="{op}"><rect x="-90" y="{-v*5.5:.0f}" width="180" height="{v*5.5:.0f}" rx="14" fill="{c}"/>{T(0, -v*5.5-24, str(v), 64, c)}</g></g>'
    arr = lambda id, x, lab, c: f'<g transform="translate({x} 330)"><g id="{id}" opacity="0"><path d="M-70 0 H50 M30 -20 L60 0 L30 20" fill="none" stroke="{c}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>{T(-5, -24, lab, 34, c)}</g></g>'
    return SVG(f'''{T(540, 120, "EJEMPLO APARTE", 30, GD, F2)}{T(540, 170, "No son datos del Nasdaq-100", 24, MUT, F2, 700)}
<line x1="80" x2="1000" y1="{860-100*5.5:.0f}" y2="{860-100*5.5:.0f}" stroke="{IV}" stroke-opacity=".35" stroke-width="3" stroke-dasharray="10 10"/>
{floor(860, "#11152B")}{col("m100", 200, 100, IV, "1")}{col("m80", 540, 80, DN)}{col("m96", 880, 96, GD)}{arr("a1", 370, "−20 %", DN)}{arr("a2", 710, "+20 %", GD)}
<g id="m25" opacity="0"><rect x="300" y="930" width="480" height="90" rx="45" fill="{UP}"/>{T(540, 990, "80 → 100 = +25 %", 46, "#fff")}</g>''')

# ---------- 6 · Capitalización hipotética ----------
def s_comp():
    V = [1000 * 1.07 ** k for k in range(21)]; x0, w, base, sc = 90, 38, 900, 0.17
    bars = ''
    for k, v in enumerate(V):
        x = x0 + k * (w + 6); hc, hg = 1000 * sc, (v - 1000) * sc
        bars += f'<g class="cb{" cbx" if k >= 3 else ""}" id="cb{k}" opacity="0"><rect x="{x}" y="{base-hc:.0f}" width="{w}" height="{hc:.0f}" rx="6" fill="{IV}"/><rect x="{x}" y="{base-hc-hg:.0f}" width="{w}" height="{hg:.0f}" rx="6" fill="{GD}"/></g>'
    lab = lambda id, k, t: f'<g id="{id}" opacity="0">{T(x0 + k*(w+6) + w/2, base - V[k]*sc - 22, t, 30, GD, F1)}</g>'
    return SVG(f'''{T(540, 112, "CAPITALIZACIÓN · EJEMPLO HIPOTÉTICO", 34, IV)}
<g transform="translate(540 172)"><rect x="-470" y="-34" width="940" height="60" rx="30" fill="{BG2}" stroke="{GD}" stroke-width="2"/>{T(0, 6, "7 % hipotético constante · sin aportes, comisiones, impuestos ni inflación", 22, GD, F2, 800)}</g>
<line x1="70" x2="1010" y1="{base}" y2="{base}" stroke="{IV}" stroke-opacity=".35" stroke-width="3"/>{bars}
{T(110, 420, "", 1)}<g id="c0" opacity="0">{T(110, 440, "Año 0 · USD 1.000", 34, IV, F2, 800, "start")}</g><g id="c1" opacity="0">{T(110, 494, "Año 1 · USD 1.070", 34, GD, F2, 800, "start")}</g><g id="c2" opacity="0">{T(110, 548, "Año 2 · USD 1.144,90", 34, GD, F2, 800, "start")}</g>{lab("c20", 20, "≈ 3.870")}
{T(90, 950, "Año 0", 22, MUT, F2, 700, "start")}{T(990, 950, "Año 20", 22, MUT, F2, 700, "end")}
<g id="cLeg" opacity="0"><rect x="300" y="990" width="26" height="26" rx="5" fill="{IV}"/>{T(336, 1012, "Capital inicial", 24, IV, F2, 700, "start")}<rect x="560" y="990" width="26" height="26" rx="5" fill="{GD}"/>{T(596, 1012, "Crecimiento hipotético", 24, GD, F2, 700, "start")}</g>
<g id="cWarn" opacity="0"><rect x="90" y="300" width="440" height="76" rx="38" fill="{DN}"/>{T(310, 352, "Aportes ≠ ganancia", 38, "#fff")}</g>''')

# ---------- 7 · ¿Para qué es ese dinero? ----------
def s_goal():
    return SVG(f'''{T(540, 150, "¿PARA QUÉ ES ESE DINERO?", 52, IV)}
<g transform="translate(290 420)"><g id="g1" opacity="0"><rect x="-200" y="-140" width="400" height="230" rx="26" fill="{IV}"/><rect x="-200" y="-140" width="400" height="66" rx="26" fill="{DN}"/><rect x="-200" y="-100" width="400" height="26" fill="{DN}"/>{T(0, -92, "RETIRO", 34, "#fff")}{T(0, 30, "el próximo mes", 42, INK)}</g></g>
<g transform="translate(790 420)"><g id="g2" opacity="0"><rect x="-200" y="-140" width="400" height="230" rx="26" fill="{IV}"/><rect x="-200" y="-140" width="400" height="66" rx="26" fill="{UP}"/><rect x="-200" y="-100" width="400" height="26" fill="{UP}"/>{T(0, -92, "META", 34, "#fff")}{T(0, 30, "a varios años", 42, INK)}</g></g>
{floor(840)}{P("gA", 2, 290, 980, 0.62, shirt="#E8A87C")}{P("gB", 1, 790, 980, 0.62, flip=True, shirt="#9BB0E8")}''')

# ---------- 8 · Tres preguntas / comparar brókeres ----------
def s_brok(names=True):
    card = lambda id, x, n, t1, t2, ic: f'''<g transform="translate({x} 400)"><g id="{id}" opacity="0"><rect x="-155" y="-190" width="310" height="380" rx="28" fill="{IV}"/><circle cy="-110" r="52" fill="{BG}"/>{ic}
{T(0, -20, n, 30, GD, F2)}{T(0, 40, t1, 34, INK)}{T(0, 84, t2, 34, INK)}</g></g>'''
    ic1 = f'<path d="M-26 -96 V-130 H26 V-96 M-34 -96 H34 V-80 H-34Z" fill="{GD}"/><rect x="-22" y="-128" width="44" height="6" fill="{GD}"/>'
    ic2 = T(0, -92, "$", 56, GD)
    ic3 = f'<rect x="-28" y="-138" width="56" height="56" rx="10" fill="none" stroke="{GD}" stroke-width="7"/><path d="M-12 -110 h24 M0 -122 v24" stroke="{GD}" stroke-width="7"/>'
    nm = (f'''<g id="nmH" opacity="0">{chip("nm1", 200, 700, "Hapi", BG2, IV, 30, "1")}{chip("nm2", 520, 700, "Interactive Brokers", BG2, IV, 30, "1")}{chip("nm3", 860, 700, "Intermediario local", BG2, IV, 30, "1")}</g>
<g id="nmSFC" opacity="0">{T(860, 760, "Registro SFC: consulta", 22, GD, F2, 700)}</g>''' if names else '')
    return SVG(f'''{card("q1", 190, "1 · ENTIDAD", "¿Quién está", "detrás?", ic1)}{card("q2", 540, "2 · COSTOS", "¿Cuánto cuesta", "todo?", ic2)}{card("q3", 890, "3 · PRODUCTO", "¿Qué estoy", "comprando?", ic3)}
{nm}<g id="bc" opacity="0"><rect x="120" y="800" width="840" height="64" rx="32" fill="{BG2}" stroke="{GD}" stroke-width="2"/>{T(540, 842, "Firma de EE. UU.: BrokerCheck (FINRA) · SIPC no cubre caídas", 24, IV, F2, 700)}</g>
{floor(900)}{P("bk", 0, 150, 1075, 0.6, shirt="#9BB0E8")}{P("bk2", 5, 940, 1075, 0.6, flip=True, shirt="#E8A87C")}''')

# ---------- 9 · Recorrido de costos + ejemplo USD 20 / USD 1 ----------
def s_cost():
    st = ["Depósito", "COP → USD", "Compra", "Venta", "Retiro"]
    nodes = ''.join(f'<g transform="translate({120+k*210} 330)"><g class="cn" id="cn{k}" opacity="0"><circle r="62" fill="{IV}"/>{T(0, 10, str(k+1), 40, INK)}{T(0, 112, s, 26, IV, F2)}</g></g>' for k, s in enumerate(st))
    return SVG(f'''{T(540, 150, "EL RECORRIDO COMPLETO", 50, IV)}<line id="cLine" x1="120" x2="960" y1="330" y2="330" stroke="{GD}" stroke-width="6" stroke-dasharray="14 12"/>{nodes}
<g transform="translate(120 330)"><g id="coin" opacity="0"><circle r="28" fill="{GD}"/>{T(0, 10, "$", 30, INK)}</g></g>
<g id="cwk">{P("cw1", 2, 60, 700, 0.62, shirt="#7FC8B0")}<g transform="translate(60 700) scale(.62)"><g id="cw1bag"><rect x="34" y="-190" width="56" height="60" rx="10" fill="{GD}"/>{T(62, -148, "$", 34, INK)}</g></g></g>
<g id="ex" opacity="0"><rect x="160" y="560" width="760" height="330" rx="30" fill="{IV}"/>{T(540, 620, "EJEMPLO HIPOTÉTICO", 26, "#8A6A2A", F2)}
{T(330, 720, "Orden", 30, INK, F2, 700)}{T(330, 790, "USD 20", 62, INK)}{T(540, 770, "+", 60, INK)}{T(750, 720, "Cargo fijo", 30, INK, F2, 700)}{T(750, 790, "USD 1", 62, DN)}
<g id="ex5" opacity="0"><rect x="330" y="820" width="420" height="56" rx="28" fill="{DN}"/>{T(540, 858, "= 5 % de la orden", 32, "#fff")}</g></g>
<g id="zero" opacity="0"><rect x="190" y="930" width="700" height="70" rx="35" fill="{BG2}" stroke="{GD}" stroke-width="2"/>{T(540, 975, "Cero comisión ≠ cero costos", 32, GD)}</g>
{T(540, 1050, "No es una tarifa de Hapi ni de Interactive Brokers", 20, MUT, F2, 700)}''')

# ---------- 10 · Qué producto ----------
def s_prod():
    it = [("pA", "ACCIÓN", "parte de una empresa", f'<rect x="-50" y="-50" width="100" height="100" rx="10" fill="{GD}"/><path d="M-50 -50 L0 0 L50 -50" fill="{BG}"/>'),
          ("pE", "ETF", "fondo que cotiza en bolsa", ''.join(f'<circle cx="{-30+(k%3)*30}" cy="{-20+(k//3)*36}" r="15" fill="{GD}"/>' for k in range(6)) + f'<path d="M-60 -40 L60 -40 L45 50 L-45 50Z" fill="none" stroke="{IV}" stroke-width="6"/>'),
          ("pI", "ÍNDICE", "referencia · no se compra directo", f'<path d="M-55 40 L-20 0 L5 20 L55 -40" fill="none" stroke="{GD}" stroke-width="10" stroke-linecap="round"/>'),
          ("pC", "CFD", "contrato sobre el precio", f'<rect x="-40" y="-55" width="80" height="110" rx="8" fill="{IV}"/>' + ''.join(f'<rect x="-26" y="{-38+k*18}" width="52" height="7" rx="3" fill="{INK}" opacity=".4"/>' for k in range(5)))]
    out = ''
    for k, (id, t, s, ic) in enumerate(it):
        x, y = (290 if k % 2 == 0 else 790), (330 if k < 2 else 720)
        out += f'<g transform="translate({x} {y})"><g id="{id}" opacity="0"><rect x="-230" y="-170" width="460" height="330" rx="28" fill="{BG2}" stroke="{GD}" stroke-opacity=".6" stroke-width="3"/><g transform="translate(0 -60)">{ic}</g>{T(0, 70, t, 44, IV)}{T(0, 118, s, 24, GD, F2, 700)}</g></g>'
    return SVG(out + f'<g id="pIx" opacity="0"><g transform="translate(290 720) rotate(-8)"><rect x="-180" y="-34" width="360" height="68" rx="12" fill="none" stroke="{DN}" stroke-width="5"/>{T(0, 12, "NO SE COMPRA DIRECTO", 28, DN)}</g></g>')

# ---------- 11 · Demostración de una orden (interfaz ficticia) ----------
def s_demo():
    row = lambda id, y, k, v, vc=INK: f'<g id="{id}" opacity="0"><rect x="250" y="{y-40}" width="580" height="74" rx="14" fill="#fff" stroke="#E2DED3" stroke-width="2"/>{T(280, y+6, k, 26, "#55596E", F2, 700, "start")}{T(800, y+6, v, 28, vc, F2, 800, "end")}</g>'
    return SVG(f'''<rect x="210" y="60" width="660" height="980" rx="56" fill="#05070F"/><rect x="226" y="76" width="628" height="948" rx="44" fill="{IV}"/>
<rect x="226" y="76" width="628" height="120" rx="44" fill="{BG}"/><rect x="226" y="150" width="628" height="46" fill="{BG}"/>
<g transform="translate(540 136)"><rect x="-170" y="-30" width="340" height="56" rx="28" fill="{GD}"/>{T(0, 8, "DEMOSTRACIÓN", 30, INK, F2)}</g>
<g id="dFicha" opacity="0">{T(270, 270, "EMPRESA EJEMPLO", 40, INK, F1, 800, "start")}{T(270, 312, "Símbolo: EJM · ficticio", 26, "#55596E", F2, 700, "start")}</g>
{row("dTipo", 400, "Tipo de producto", "Acción")}{row("dCant", 490, "Importe", "USD 20 (ejemplo)")}{row("dFin", 580, "Dinero", "Propio ✓ · prestado ✗", "#2E7D4F")}
<g id="dPrev" opacity="0"><rect x="250" y="650" width="580" height="200" rx="18" fill="#FFF6E2" stroke="{GD}" stroke-width="3"/>{T(280, 700, "VISTA PREVIA", 30, "#8A6A2A", F2, 800, "start")}
{T(280, 750, "Costo estimado", 26, "#55596E", F2, 700, "start")}{T(800, 750, "USD 21 (ejemplo)", 28, INK, F2, 800, "end")}{T(280, 800, "Cargos", 26, "#55596E", F2, 700, "start")}{T(800, 800, "USD 1 (ejemplo)", 28, DN, F2, 800, "end")}</g>
<g id="dBtn"><rect x="250" y="890" width="580" height="90" rx="45" fill="#C9CCD8"/>{T(540, 948, "Comprar", 34, "#80859A", F2)}</g>
<g id="dStop" opacity="0"><g transform="translate(540 935) rotate(-6)"><rect x="-260" y="-48" width="520" height="96" rx="16" fill="none" stroke="{DN}" stroke-width="7"/>{T(0, 14, "PARAMOS AQUÍ · SIN EJECUTAR", 34, DN)}</g></g>
<g transform="translate(700 300)"><g id="cur"><path d="M0 0 L0 54 L14 40 L26 66 L36 61 L24 36 L44 36Z" fill="{INK}" stroke="#fff" stroke-width="3"/></g></g>''', bg="#0A0D1A")

# ---------- 12 · Cierre ----------
def s_end():
    return SVG(f'''<g id="eGlow"><circle cx="540" cy="560" r="360" fill="{GD}" opacity=".08"/></g>
<g transform="translate(540 470)"><g id="eQ"><circle r="150" fill="none" stroke="{GD}" stroke-width="12"/>{T(0, 70, "?", 220, GD)}</g></g>
{floor(820)}{P("eA", 3, 330, 1000, 0.6, shirt="#9BB0E8")}{P("eB", 4, 760, 1000, 0.6, flip=True, shirt="#7FC8B0")}''')

SCENES = {"cards": s_cards, "chart": s_chart, "dc": s_dc, "sp": s_sp, "math": s_math, "comp": s_comp, "goal": s_goal,
          "brok": s_brok, "brok0": lambda: s_brok(False), "cost": s_cost, "prod": s_prod, "demo": s_demo, "end": s_end}
