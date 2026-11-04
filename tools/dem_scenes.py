# TITÁN · «Ganaron los demócratas. Wall Street subió. ¿Por qué?» · escenas ilustradas CON personas (1080×1920)
# Zona de acción: y 560–1330 (arriba van titulares, abajo subtítulos). Caras nunca bajo textos.
from flat_scenes import fig, place, windows, SKINS
INK, IVORY, GOLD, LAV, VIO, NAVY, GREEN, RED = "#0B1B33", "#F4EEDC", "#E2B755", "#C4B5FD", "#7C3AED", "#13284A", "#2E7D4F", "#D93A2F"
HAIRS = ["#1E1A2E", "#5A3A22", "#2B1B12", "#8A5A2B"]

def bg(c1="#13284A", c2="#0B1B33"):
    return (f'<defs><linearGradient id="g{c1[1:]}{c2[1:]}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></linearGradient></defs>'
            f'<rect width="1080" height="1920" fill="url(#g{c1[1:]}{c2[1:]})"/>' + ''.join(f'<circle cx="{40+(k%14)*78}" cy="{60+(k//14)*80}" r="3" fill="{IVORY}" opacity=".05"/>' for k in range(14 * 24)))
SVG = lambda inner, c1="#13284A", c2="#0B1B33": f'<svg viewBox="0 0 1080 1920" width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">{bg(c1, c2)}{inner}</svg>'
def P(id, k, x, y, s, flip=False, shirt=None, pants=None):   # persona genérica
    sh = shirt or [GOLD, LAV, "#FF8A80", IVORY, "#7FD1B9", VIO][k % 6]
    return place(fig(id, SKINS[k % 4], HAIRS[k % 4], sh, pants or ["#2A3F66", "#3B4F7A", INK, "#4A3A6A"][k % 4], k % 4), x, y, s, flip)
def stars(n=24, y0=380, y1=760, cls="st"):
    return ''.join(f'<circle class="{cls}" cx="{(k*137)%1080}" cy="{y0+(k*71)%(y1-y0)}" r="{2+(k%3)}" fill="{IVORY}" opacity=".6"/>' for k in range(n))
def clouds(cls, pts, op=".85", col="#fff"):
    return ''.join(f'<g transform="translate({x} {y})"><g class="{cls}"><ellipse rx="90" ry="32" fill="{col}" opacity="{op}"/><ellipse cx="-50" cy="8" rx="60" ry="24" fill="{col}" opacity="{op}"/><ellipse cx="55" cy="10" rx="62" ry="26" fill="{col}" opacity="{op}"/></g></g>' for x, y in pts)
def capitol(x, y, s=1.0, id="cap"):
    cols = ''.join(f'<rect x="{-150+k*42}" y="-120" width="18" height="120" rx="6" fill="#E9E1CC"/>' for k in range(8))
    return f'''<g transform="translate({x} {y}) scale({s})"><g id="{id}">
<rect x="-230" y="-10" width="460" height="30" fill="#D8CFB8"/><rect x="-200" y="-130" width="400" height="130" fill="{IVORY}"/>{cols}
<path d="M-210 -128 L0 -190 L210 -128Z" fill="#E9E1CC"/><rect x="-90" y="-250" width="180" height="70" fill="{IVORY}"/>
<path d="M-110 -248 Q0 -420 110 -248Z" fill="{IVORY}"/><path d="M-110 -248 Q0 -420 110 -248" fill="none" stroke="#D8CFB8" stroke-width="6"/>
<rect x="-12" y="-440" width="24" height="70" rx="8" fill="{IVORY}"/><circle cy="-452" r="16" fill="{GOLD}"/></g></g>'''
def whitehouse(x, y, s=1.0, id="wh"):
    cols = ''.join(f'<rect x="{-60+k*30}" y="-150" width="14" height="110" rx="5" fill="#E9E1CC"/>' for k in range(5))
    return f'''<g transform="translate({x} {y}) scale({s})"><g id="{id}">
<rect x="-210" y="-140" width="420" height="140" fill="{IVORY}"/>{''.join(f'<rect x="{-190+k*48}" y="-110" width="26" height="36" rx="4" fill="#9FB4DE"/>' for k in range(8))}
<path d="M-90 -150 L0 -200 L90 -150Z" fill="#E9E1CC"/>{cols}<rect x="-100" y="-40" width="200" height="40" fill="#E9E1CC"/><rect x="-24" y="-60" width="48" height="60" rx="6" fill="#2A3F66"/></g></g>'''
def arrow(id, x, y, s, col, up=True, op="0"):
    d = "M0 -110 L70 -10 H28 V110 H-28 V-10 H-70Z" if up else "M0 110 L70 10 H28 V-110 H-28 V10 H-70Z"
    return f'<g transform="translate({x} {y}) scale({s})"><g id="{id}" opacity="{op}"><path d="{d}" fill="{col}"/></g></g>'
def paper(id, x, y, s=1.0, op="0"):   # papeleta de voto
    return f'<g transform="translate({x} {y}) scale({s})"><g id="{id}" opacity="{op}"><rect x="-22" y="-29" width="44" height="58" rx="5" fill="{IVORY}" stroke="#D8CFB8" stroke-width="2"/><path d="M-10 0 l7 7 l14 -16" fill="none" stroke="{VIO}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g></g>'
def bubble(id, x, y, t, col=GOLD, fs=70, op="0"):
    return f'<g transform="translate({x} {y})"><g id="{id}" opacity="{op}"><circle r="52" fill="{INK}" stroke="{col}" stroke-width="5"/><path d="M-18 44 L-34 76 L6 50Z" fill="{INK}"/><text y="{fs*0.36:.0f}" font-family="Bricolage" font-weight="800" font-size="{fs}" text-anchor="middle" fill="{col}">{t}</text></g></g>'
def floor(y, c="#0F1F3D"):
    return f'<rect y="{y}" width="1080" height="{1920-y}" fill="{c}"/>' + ''.join(f'<rect class="fl" x="{k*160}" y="{y+70}" width="90" height="8" rx="4" fill="{IVORY}" opacity=".18"/>' for k in range(8))
def car(id, y, col=VIO, s=1.0):
    return f'''<g transform="translate(0 {y}) scale({s})"><g id="{id}"><rect x="-80" y="-36" width="160" height="44" rx="16" fill="{col}"/><rect x="-48" y="-64" width="92" height="36" rx="14" fill="{col}"/><rect x="-36" y="-56" width="68" height="22" rx="8" fill="{LAV}"/>
<circle cx="-44" cy="12" r="16" fill="{INK}"/><circle cx="48" cy="12" r="16" fill="{INK}"/><circle cx="76" cy="-16" r="8" fill="#F7DD9C"/></g></g>'''

# 1 · TikTok gancho: fila de votantes frente al Capitolio, de noche
def scene_hook():
    box = f'''<g transform="translate(800 1250)"><g id="urna"><rect x="-100" y="-160" width="200" height="160" rx="16" fill="#DCE7FF" opacity=".95"/><rect x="-108" y="-176" width="216" height="26" rx="8" fill="{INK}"/>
<rect x="-50" y="-172" width="100" height="10" fill="#050E1E"/><rect x="-76" y="-98" width="152" height="44" rx="10" fill="{GOLD}"/><text y="-66" font-family="Jakarta" font-weight="800" font-size="28" text-anchor="middle" fill="{INK}">VOTO</text></g></g>'''
    return SVG(f'''{stars()}<g id="hkGlow"><circle cx="540" cy="860" r="380" fill="{GOLD}" opacity=".08"/></g>
<circle cx="170" cy="660" r="44" fill="{IVORY}" opacity=".9"/>{capitol(470, 1150, 1.15)}
{arrow("hkArr", 900, 760, 1.25, "#64E087")}{floor(1250)}{box}
{P("v1", 0, 160, 1252, 0.92)}{P("v2", 1, 340, 1252, 0.92, shirt=LAV)}{P("v3", 2, 560, 1252, 0.98, shirt="#FF8A80")}
{paper("hkBal", 640, 1000, 1.2, "1")}''', "#0E2350", "#2A4A8C")

# 2 · Fachada de la BOLSA con gente; un señor lleva una papeleta (¿vota la bolsa?)
def scene_wall():
    cols = ''.join(f'<rect x="{220+k*96}" y="820" width="40" height="330" rx="12" fill="#E9E1CC"/>' for k in range(7))
    tick = ''.join(f'<g class="tk" transform="translate({k*170} 0)"><path d="M20 26 L40 4 L60 26Z" fill="#64E087"/><rect x="72" y="8" width="70" height="14" rx="7" fill="#64E087" opacity=".7"/></g>' for k in range(14))
    flags = ''.join(f'<g transform="translate({300+k*240} 640)"><rect x="-3" y="0" width="6" height="90" fill="#D8CFB8"/><g class="flg"><path d="M3 4 h70 l-12 18 l12 18 h-70z" fill="{[VIO, GOLD, LAV][k]}"/></g></g>' for k in range(3))
    return SVG(f'''{clouds("wcl", [(180, 470), (760, 430), (1040, 500)])}
<g id="wsB"><rect x="150" y="770" width="780" height="420" fill="{IVORY}"/>{cols}<path d="M130 774 L540 630 L950 774Z" fill="#E9E1CC"/>
<text x="540" y="752" font-family="Bricolage" font-weight="800" font-size="52" text-anchor="middle" fill="{INK}">BOLSA</text>
<rect x="110" y="1186" width="860" height="40" fill="#D8CFB8"/></g>{flags}
<g id="tkr"><rect x="110" y="1060" width="860" height="70" rx="12" fill="{INK}" stroke="{GOLD}" stroke-width="4"/>
<clipPath id="tkc"><rect x="120" y="1066" width="840" height="58"/></clipPath><g clip-path="url(#tkc)"><g id="tkm" transform="translate(120 1083)">{tick}</g></g></g>
{arrow("wsArr", 930, 640, 0.8, "#2E7D4F")}{floor(1226, "#2A3F66")}
{P("wP1", 3, -120, 1300, 0.8)}{P("wP2", 4, 1200, 1310, 0.8, flip=True)}
{P("wT", 5, 540, 1300, 1.0, shirt="#2A4A8C", pants=INK)}{paper("wBal", 610, 1150, 1.3)}{bubble("wQ", 660, 880, "?")}
{bubble("wWarn", 400, 880, "!", "#FF8A80")}''', "#9DB4EE", "#F4EEDC")

# 3 · Futuros de noche (reacción inicial) vs sesión de día
def scene_split():
    L = f'''<g id="spL"><rect x="40" y="560" width="490" height="700" rx="30" fill="#0E1A33" stroke="{LAV}" stroke-opacity=".5" stroke-width="4"/>
<circle cx="440" cy="640" r="34" fill="{IVORY}"/><circle cx="456" cy="630" r="30" fill="#0E1A33"/>{''.join(f'<circle class="st2" cx="{80+(k*97)%330}" cy="{600+(k*37)%90}" r="3" fill="{IVORY}"/>' for k in range(8))}
<text x="80" y="640" font-family="Jakarta" font-weight="800" font-size="30" fill="{IVORY}">FUTUROS</text><text x="80" y="676" font-family="Jakarta" font-weight="700" font-size="22" fill="{LAV}">reacción inicial · noche</text>
<rect x="80" y="710" width="410" height="200" rx="16" fill="#13284A"/><path id="spLp" d="M100 760 C170 750 230 780 280 820 C330 860 400 880 470 890" fill="none" stroke="#FF8A80" stroke-width="12" stroke-linecap="round"/>
<g transform="translate(110 1256)"><rect x="0" y="-180" width="160" height="120" rx="14" fill="#2A3F66"/><rect x="40" y="-60" width="80" height="60" fill="#2A3F66"/></g></g>'''
    R = f'''<g id="spR"><rect x="550" y="560" width="490" height="700" rx="30" fill="#2A4A8C" stroke="{GOLD}" stroke-opacity=".6" stroke-width="4"/>
<circle id="sun" cx="980" cy="640" r="40" fill="{GOLD}"/>
<text x="590" y="640" font-family="Jakarta" font-weight="800" font-size="30" fill="{IVORY}">SESIÓN</text><text x="590" y="676" font-family="Jakarta" font-weight="700" font-size="22" fill="{GOLD}">4 de noviembre · día</text>
<rect x="590" y="710" width="410" height="200" rx="16" fill="#1B3566"/><path id="spRp" d="M610 890 C680 880 730 850 790 810 C850 770 920 750 980 740" fill="none" stroke="#64E087" stroke-width="12" stroke-linecap="round"/></g>'''
    return SVG(L + R + f'''{P("fN", 1, 330, 1240, 0.78, shirt=LAV)}<g transform="translate(330 1240) scale(.78)"><g id="fNph"><rect x="22" y="-200" width="40" height="66" rx="8" fill="{INK}"/><rect x="26" y="-194" width="32" height="54" rx="5" fill="#FF8A80" opacity=".8"/></g></g>
{P("fS", 2, 800, 1240, 0.78, shirt=GOLD)}{bubble("spQ1", 420, 860, "?", LAV, 64)}{bubble("spQ2", 900, 860, "?", GOLD, 64)}
<text x="540" y="1300" font-family="Jakarta" font-weight="700" font-size="24" text-anchor="middle" fill="{IVORY}" opacity=".75">Ilustrativo · sin precios</text>''')

# 4 · Presidencia y Congreso; un mensajero lleva la PROPUESTA; mesa de negociación
def scene_power():
    table = f'''<g transform="translate(540 1200)"><g id="tbl"><rect x="-190" y="-24" width="380" height="38" rx="12" fill="#B88A2E"/><rect x="-160" y="14" width="22" height="86" fill="#8A6620"/><rect x="138" y="14" width="22" height="86" fill="#8A6620"/></g></g>'''
    doc = f'''<g transform="translate(250 1080)"><g id="doc" opacity="0"><rect x="-44" y="-56" width="88" height="112" rx="8" fill="#fff"/><rect x="-32" y="-40" width="64" height="10" rx="5" fill="{INK}"/>
{''.join(f'<rect x="-32" y="{-20+k*15}" width="{64-(k%2)*20}" height="7" rx="3" fill="{INK}" opacity=".35"/>' for k in range(4))}<text y="48" font-family="Jakarta" font-weight="800" font-size="13" text-anchor="middle" fill="{VIO}">PROPUESTA</text></g></g>'''
    gear = lambda id, x, y, r: f'<g transform="translate({x} {y})"><g id="{id}" opacity="0"><circle r="{r}" fill="{GOLD}"/><circle r="{r*0.4}" fill="#13284A"/>' + ''.join(f'<rect x="-{r*0.22}" y="-{r*1.38}" width="{r*0.44}" height="{r*0.5}" rx="4" fill="{GOLD}" transform="rotate({k*45})"/>' for k in range(8)) + '</g></g>'
    lab = lambda id, x, t1, t2: f'<g transform="translate({x} 640)"><g id="{id}" opacity="0"><rect x="-170" y="-50" width="340" height="100" rx="20" fill="{INK}" stroke="{GOLD}" stroke-width="3"/><text y="-6" font-family="Bricolage" font-weight="800" font-size="34" text-anchor="middle" fill="{IVORY}">{t1}</text><text y="32" font-family="Jakarta" font-weight="700" font-size="24" text-anchor="middle" fill="{LAV}">{t2}</text></g></g>'
    return SVG(f'''{stars(14, 580, 760)}{whitehouse(250, 960, 0.95)}{capitol(830, 960, 0.72, "cap2")}{lab("lbP", 250, "PRESIDENCIA", "republicana")}{lab("lbC", 830, "CONGRESO", "demócrata")}
<g transform="translate(540 820)"><g id="neq" opacity="0"><circle r="58" fill="{INK}" stroke="{GOLD}" stroke-width="6"/><text y="30" font-family="Bricolage" font-weight="800" font-size="80" text-anchor="middle" fill="{GOLD}">≠</text></g></g>
{floor(960, "#1B3566")}<rect y="958" width="1080" height="6" fill="{GOLD}" opacity=".4"/>
{P("nA", 0, 400, 1240, 0.78, shirt="#FF8A80")}{P("nB", 3, 680, 1240, 0.78, flip=True, shirt="#7FD1B9")}
{table}{gear("gr1", 500, 1130, 30)}{gear("gr2", 584, 1112, 22)}
{P("mM", 4, 250, 1290, 0.82, shirt=LAV)}{doc}''')

# 5 · Interpretación: balanza «cambios grandes» vs «negociar» + una inversionista que la observa
def scene_interp():
    return SVG(f'''<g transform="translate(470 1230) scale(.82)"><path d="M-70 0 L70 0 L0 -240Z" fill="{GOLD}"/><g transform="translate(0 -240)"><g id="beam"><rect x="-360" y="-12" width="720" height="24" rx="12" fill="{GOLD}"/>
<g transform="translate(-300 0)"><line y2="80" stroke="{GOLD}" stroke-width="6"/><g id="wL" transform="translate(0 130)"><rect x="-130" y="-50" width="260" height="100" rx="20" fill="{IVORY}"/><text y="-6" font-family="Bricolage" font-weight="800" font-size="30" text-anchor="middle" fill="{INK}">CAMBIOS</text><text y="30" font-family="Bricolage" font-weight="800" font-size="30" text-anchor="middle" fill="{INK}">GRANDES</text></g></g>
<g transform="translate(300 0)"><line y2="80" stroke="{GOLD}" stroke-width="6"/><g id="wR" transform="translate(0 130)"><rect x="-130" y="-50" width="260" height="100" rx="20" fill="#2A4A8C"/><text y="14" font-family="Bricolage" font-weight="800" font-size="32" text-anchor="middle" fill="{IVORY}">NEGOCIAR</text></g></g></g></g></g>
{floor(1230, "#0F1F3D")}{P("iV", 5, 930, 1300, 0.8, flip=True, shirt=GOLD)}{bubble("iQ", 860, 900, "?", LAV, 64)}
<g transform="translate(540 640)"><g id="cv1" opacity="0"><rect x="-330" y="-40" width="660" height="80" rx="40" fill="{INK}" stroke="#FF8A80" stroke-width="3"/><text y="12" font-family="Jakarta" font-weight="800" font-size="30" text-anchor="middle" fill="#FF8A80">✕ No elimina los conflictos</text></g></g>
<g transform="translate(540 740)"><g id="cv2" opacity="0"><rect x="-360" y="-40" width="720" height="80" rx="40" fill="{INK}" stroke="#FF8A80" stroke-width="3"/><text y="12" font-family="Jakarta" font-weight="800" font-size="30" text-anchor="middle" fill="#FF8A80">✕ No garantiza la economía</text></g></g>''')

# 6 · Tres negocios con sus dueños: impuestos, reglas, clientes
def scene_biz(qmark=False):
    def b(id, x, label, col, icon):
        return f'''<g transform="translate({x} 1150)"><g id="{id}"><rect x="-120" y="-260" width="240" height="260" fill="{IVORY}"/><path d="M-138 -256 L0 -330 L138 -256Z" fill="{col}"/>
<text y="-276" font-family="Jakarta" font-weight="800" font-size="22" text-anchor="middle" fill="#fff">{label}</text>{''.join(f'<rect class="bw2" x="{-96+(k%3)*68}" y="{-226+(k//3)*62}" width="40" height="40" rx="5" fill="{GOLD}" opacity=".85"/>' for k in range(6))}
<rect x="-30" y="-80" width="60" height="80" fill="{INK}"/></g>
<g transform="translate(0 -420)"><g class="ic" opacity="0"><circle r="62" fill="{INK}" stroke="{GOLD}" stroke-width="5"/>{icon}</g></g></g>'''
    pct = f'<text y="24" font-family="Bricolage" font-weight="800" font-size="66" text-anchor="middle" fill="{GOLD}">%</text>'
    rules = f'<rect x="-26" y="-34" width="52" height="68" rx="6" fill="{IVORY}"/>' + ''.join(f'<rect x="-16" y="{-20+k*14}" width="32" height="6" rx="3" fill="{INK}" opacity=".5"/>' for k in range(4))
    cart = f'<path d="M-34 -18 h12 l12 34 h34 l10 -26 h-50" fill="none" stroke="{GOLD}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="-4" cy="28" r="7" fill="{GOLD}"/><circle cx="24" cy="28" r="7" fill="{GOLD}"/>'
    labs = ''.join(f'<g transform="translate({x} 640)"><g id="bl{k}" opacity="0"><rect x="-150" y="-34" width="300" height="68" rx="34" fill="{GOLD}"/><text y="12" font-family="Jakarta" font-weight="800" font-size="30" text-anchor="middle" fill="{INK}">{t}</text></g></g>'
                   for k, (x, t) in enumerate([(190, "¿Impuestos?" if qmark else "Impuestos"), (540, "¿Reglas?" if qmark else "Reglas"), (890, "¿Clientes?" if qmark else "Clientes")]))
    reac = ''.join(f'<g transform="translate({x} 900)"><g id="rx{k}" opacity="0"><circle r="44" fill="{INK}"/><path d="{d}" fill="{c}"/></g></g>' for k, (x, d, c) in enumerate([
        (300, "M0 -30 L24 0 H10 V30 H-10 V0 H-24Z", "#64E087"), (650, "M-30 0 L0 -24 V-10 H30 V10 H0 V24Z", GOLD), (1000, "M0 30 L24 0 H10 V-30 H-10 V0 H-24Z", "#FF8A80")]))
    return SVG(f'''{stars(14, 700, 820)}{b("bz0", 190, "FÁBRICA", "#2A4A8C", pct)}{b("bz1", 540, "TIENDA", VIO, rules)}{b("bz2", 890, "OFICINA", GREEN, cart)}{labs}
{floor(1150)}{P("o0", 0, 110, 1300, 0.66, shirt="#FF8A80")}{P("o1", 1, 460, 1300, 0.66, shirt=GOLD)}{P("o2", 2, 810, 1300, 0.66, shirt=LAV)}{reac}
{car("bcar", 1236, "#7FD1B9", 0.7)}<text x="540" y="1330" font-family="Jakarta" font-weight="700" font-size="22" text-anchor="middle" fill="{IVORY}" opacity=".7">Negocios ilustrativos</text>''')

# 7 · Gráfica verde que se vuelve «?» con una persona mirando su celular
def scene_chart():
    return SVG(f'''<g transform="translate(90 560)"><rect width="900" height="520" rx="30" fill="{INK}" stroke="{GOLD}" stroke-opacity=".5" stroke-width="4"/>
{''.join(f'<line x1="40" y1="{70+k*100}" x2="860" y2="{70+k*100}" stroke="{IVORY}" stroke-opacity=".08" stroke-width="2"/>' for k in range(5))}
<path id="chL" d="M60 420 C160 400 220 360 300 340 C380 320 430 240 520 210 C600 180 700 130 840 100" fill="none" stroke="#64E087" stroke-width="14" stroke-linecap="round"/>
<text id="chQ" x="450" y="400" font-family="Bricolage" font-weight="800" font-size="360" text-anchor="middle" fill="{GOLD}" opacity="0">?</text>
<text x="450" y="500" font-family="Jakarta" font-weight="700" font-size="22" text-anchor="middle" fill="{IVORY}" opacity=".7">Ilustrativo · sin precios</text></g>
{floor(1180, "#0F1F3D")}{P("cV", 3, 300, 1320, 0.62, shirt="#7FD1B9")}{P("cW", 1, -100, 1320, 0.62, shirt=VIO)}
<g transform="translate(780 1240)"><g id="lupa2" opacity="0"><circle r="70" fill="#9FD3FF" fill-opacity=".18" stroke="{GOLD}" stroke-width="14"/><rect x="46" y="46" width="26" height="90" rx="12" fill="{GOLD}" transform="rotate(-45 59 59)"/></g></g>''')

# 8 · Cierre: alguien lee la noticia con lupa; marca discreta
def scene_end():
    return SVG(f'''<g id="enGlow"><circle cx="540" cy="1000" r="320" fill="{GOLD}" opacity=".10"/></g>{stars(16, 560, 800)}
<g transform="translate(600 1030)"><g id="enNews"><rect x="-230" y="-170" width="460" height="340" rx="14" fill="{IVORY}"/><rect x="-200" y="-140" width="400" height="34" rx="6" fill="{INK}"/>
<text x="0" y="-115" font-family="Jakarta" font-weight="800" font-size="20" text-anchor="middle" fill="{GOLD}">EE. UU. · NOV 2026</text>
{''.join(f'<rect x="-200" y="{-80+k*30}" width="{400-(k%3)*80}" height="12" rx="6" fill="{INK}" opacity=".3"/>' for k in range(8))}</g></g>
<g transform="translate(700 1080)"><g id="enLupa"><circle r="110" fill="#9FD3FF" fill-opacity=".18" stroke="{GOLD}" stroke-width="20"/><rect x="74" y="74" width="36" height="140" rx="16" fill="{GOLD}" transform="rotate(-45 92 92)"/></g></g>
{floor(1240, "#0B1830")}{P("eR", 4, 200, 1320, 0.8, shirt=LAV)}''')
