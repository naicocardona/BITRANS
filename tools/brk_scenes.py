# TITÁN · Berkshire recompras (nov 2026) · escenas 1080×1080 con formas y texto + personas genéricas
from flat_scenes import fig, place, SKINS
BG, BG2, IV, GD, INK = "#0D1020", "#171B33", "#F6F4EF", "#C8A45D", "#0D1020"
UP, DN, MUT, TEAL = "#3FAF7A", "#E0675C", "#8C90A8", "#5FB3C9"
HAIRS = ["#1E1A2E", "#5A3A22", "#2B1B12", "#8A5A2B"]
F1, F2 = "Bricolage", "Jakarta"
def SVG(inner, bg=BG):
    dots = ''.join(f'<circle cx="{30+(k%14)*78}" cy="{30+(k//14)*78}" r="2.6" fill="{IV}" opacity=".05"/>' for k in range(196))
    return f'<svg viewBox="0 0 1080 1080" width="1080" height="1080" xmlns="http://www.w3.org/2000/svg"><rect width="1080" height="1080" fill="{bg}"/>{dots}{inner}</svg>'
def T(x, y, s, fs, col=IV, fam=F1, w=800, anchor="middle", extra=""):
    return f'<text x="{x}" y="{y}" font-family="{fam}" font-weight="{w}" font-size="{fs}" text-anchor="{anchor}" fill="{col}" {extra}>{s}</text>'
def P(id, k, x, y, s, flip=False, shirt=None):
    return place(fig(id, SKINS[k % 4], HAIRS[k % 4], shirt or ["#9BB0E8", "#E8A87C", "#7FC8B0", "#B9A2E8"][k % 4], ["#2A3150", "#3B4466", "#1E2338", "#4A3F6A"][k % 4], k % 4), x, y, s, flip)
def chip(id, x, y, gold=False, lab="", op="1"):
    c, e = (GD, "#9C7B3A") if gold else (IV, "#BDB8AA")
    return (f'<g transform="translate({x} {y})"><g id="{id}" opacity="{op}"><ellipse cy="16" rx="44" ry="16" fill="{e}"/><rect x="-44" y="0" width="88" height="16" fill="{e}"/>'
            f'<ellipse rx="44" ry="16" fill="{c}"/><ellipse rx="30" ry="10" fill="none" stroke="{e}" stroke-width="4"/>'
            + (T(0, -32, lab, 30, GD, F2, 800) if lab else '') + '</g></g>')
def cashbox(id, x, y, s=1.0, lab="CAJA DE LA EMPRESA"):
    bills = ''.join(f'<rect class="bill" x="{-110 + (k % 2) * 6}" y="{60 - k*18}" width="220" height="14" rx="4" fill="{UP}" opacity=".9"/>' for k in range(9))
    return (f'<g transform="translate({x} {y}) scale({s})"><g id="{id}"><rect x="-150" y="-90" width="300" height="190" rx="22" fill="{BG2}" stroke="{GD}" stroke-width="4"/>'
            f'<clipPath id="{id}c"><rect x="-130" y="-70" width="260" height="150" rx="12"/></clipPath><g clip-path="url(#{id}c)"><g id="{id}L">{bills}</g></g>'
            f'{T(0, -108, lab, 24, GD, F2, 800)}</g></g>')

# 1 · Mesa con 10 fichas (la tuya dorada), dos accionistas venden a la empresa
def s_table():
    xs = [140 + k * 88 for k in range(10)]
    chips = ''.join(chip(f"ch{k}", x, 760, gold=(k == 0), lab=("TÚ" if k == 0 else "")) for k, x in enumerate(xs))
    return SVG(f'''<g id="tblGlow"><ellipse cx="540" cy="780" rx="520" ry="60" fill="{GD}" opacity=".06"/></g>
{cashbox("box", 840, 270, 1.0)}
<g transform="translate(250 230)"><g id="cnt"><rect x="-190" y="-70" width="380" height="140" rx="24" fill="{BG2}" stroke="{IV}" stroke-opacity=".2" stroke-width="3"/>
<text id="cntA" x="0" y="-10" font-family="{F2}" font-weight="800" font-size="30" text-anchor="middle" fill="{MUT}">FICHAS EN CIRCULACIÓN</text>
<g id="c10">{T(0, 50, "10", 64, IV)}</g><g id="c8" opacity="0">{T(0, 50, "8", 64, IV)}</g></g></g>
{P("yo", 0, 150, 905, 0.8, shirt="#C8A45D")}{P("sa", 1, 770, 905, 0.8, flip=True)}{P("sb", 2, 920, 905, 0.8, flip=True)}
<rect x="40" y="775" width="1000" height="40" rx="12" fill="#3A2F22"/><rect x="40" y="810" width="1000" height="140" fill="#2A2219"/>
<rect x="40" y="775" width="1000" height="10" rx="5" fill="#5A4A35"/>{chips}
<g id="pctW" transform="translate(540 1010)"><g id="p10">{T(0, 0, "TU PARTE: 1 DE 10 = 10 %", 46, IV)}</g><g id="p125" opacity="0">{T(0, 0, "TU PARTE: 1 DE 8 = 12,5 %", 46, GD)}</g></g>
<g id="ret" opacity="0" transform="translate(540 600)"><rect x="-150" y="-36" width="300" height="72" rx="36" fill="{DN}"/>{T(0, 13, "RETIRADAS", 36, "#fff")}</g>
<g transform="translate(190 545)"><g id="keep" opacity="0"><rect x="-130" y="-34" width="260" height="60" rx="30" fill="{INK}" stroke="{GD}" stroke-width="3"/>{T(0, 6, "SIGUE SIENDO 1", 28, GD, F2)}</g></g>
{''.join(f'<g transform="translate({800 + k*26} {250 + (k%2)*30})"><g class="bl" id="bl{k}" opacity="0"><rect x="-40" y="-14" width="80" height="28" rx="6" fill="{UP}"/>{T(0, 10, "$", 26, "#fff")}</g></g>' for k in range(4))}''')

# 2 · La noticia: Berkshire, cifra y trimestre (julio-agosto-septiembre)
def s_news():
    months = ''.join(f'''<g transform="translate({270 + k*270} 640)"><g id="mo{k}" opacity="0"><rect x="-115" y="-60" width="230" height="120" rx="20" fill="{BG2}" stroke="{GD}" stroke-opacity=".6" stroke-width="3"/>
{T(0, -12, m, 34, IV)}<rect class="mof" x="-90" y="20" width="180" height="16" rx="8" fill="{GD}"/></g></g>''' for k, m in enumerate(["JULIO", "AGOSTO", "SEPTIEMBRE"]))
    return SVG(f'''<g transform="translate(540 190)"><g id="bh"><rect x="-300" y="-90" width="600" height="150" rx="26" fill="{IV}"/>{T(0, -18, "BERKSHIRE", 64, INK)}{T(0, 38, "HATHAWAY", 40, "#55596E", F2, 800)}</g></g>
<g id="amt" opacity="0">{T(540, 400, "≈ US$9.600 MILLONES", 86, GD)}{T(540, 460, "en recompras de sus propias acciones", 32, IV, F2, 700)}</g>
{months}<g id="qtag" opacity="0">{T(540, 760, "Recompras · 3.er trimestre de 2026", 34, GD, F2, 800)}</g>
<g transform="translate(540 830)"><g id="rep" opacity="0"><rect x="-230" y="-34" width="460" height="64" rx="32" fill="{BG2}" stroke="{IV}" stroke-opacity=".3" stroke-width="2"/>{T(0, 10, "Informe del 7 de noviembre", 30, IV, F2, 700)}</g></g>
<rect x="0" y="900" width="1080" height="180" fill="#121630"/>{P("rd", 3, 200, 1065, 0.5, shirt="#9BB0E8")}{P("rd2", 1, 880, 1065, 0.5, flip=True, shirt="#E8A87C")}
<g id="q" opacity="0">{T(540, 1010, "¿Qué cambia para quien se queda?", 40, IV)}</g>''')

# 3 · TikTok: dos empresas, mismas acciones retiradas, distinto precio (ejemplo hipotético)
def s_compare():
    def side(px, id, lab, sub, drop):
        chips = ''.join(chip(f"{id}c{k}", px - 170 + k * 85, 640, gold=(k == 0)) for k in range(5))
        return f'''<g id="{id}">{T(px, 140, lab, 44, IV)}{T(px, 184, sub, 28, GD if id == "cA" else DN, F2, 800)}
{cashbox(id + "box", px, 330, 0.85, "CAJA")}
<rect x="{px-230}" y="655" width="460" height="24" rx="8" fill="#3A2F22"/>{chips}
<g transform="translate({px} 500)"><g id="{id}d" opacity="0"><rect x="-150" y="-30" width="300" height="60" rx="30" fill="{DN}"/>{T(0, 11, drop, 30, "#fff")}</g></g></g>'''
    return SVG(f'''<g transform="translate(540 60)"><rect x="-200" y="-30" width="400" height="56" rx="28" fill="{GD}"/>{T(0, 8, "EJEMPLO HIPOTÉTICO", 28, INK, F2, 800)}</g>
<line x1="540" y1="110" x2="540" y2="760" stroke="{IV}" stroke-opacity=".2" stroke-width="3"/>
{side(270, "cA", "EMPRESA A", "precio razonable", "SALE DINERO")}{side(810, "cB", "EMPRESA B", "paga de más", "SALE MÁS DINERO")}
<g transform="translate(540 760)"><g id="same" opacity="0"><rect x="-330" y="-36" width="660" height="72" rx="36" fill="{INK}" stroke="{IV}" stroke-width="3"/>{T(0, 13, "MISMAS ACCIONES RETIRADAS", 36, IV)}</g></g>
<g id="alts" opacity="0">{''.join(f'<g transform="translate({190 + k*350} 920)"><g id="al{k}" opacity="0"><rect x="-160" y="-55" width="320" height="110" rx="22" fill="{BG2}" stroke="{UP}" stroke-width="3"/>{T(0, -5, t1, 30, IV)}{T(0, 32, t2, 30, IV)}</g></g>' for k, (t1, t2) in enumerate([("Mejorar", "el negocio"), ("Pagar", "deuda"), ("Otra", "oportunidad")]))}</g>''')

# 4 · Cierre: dos preguntas
def s_end():
    return SVG(f'''<g id="eGlow"><circle cx="540" cy="460" r="380" fill="{GD}" opacity=".06"/></g>
<g transform="translate(540 300)"><g id="q1" opacity="0"><rect x="-430" y="-90" width="860" height="180" rx="30" fill="{IV}"/>{T(0, 30, "¿CUÁNTO PAGÓ?", 92, INK)}</g></g>
<g transform="translate(540 560)"><g id="q2" opacity="0"><rect x="-430" y="-90" width="860" height="180" rx="30" fill="{GD}"/>{T(0, 26, "¿QUÉ ALTERNATIVA TENÍA?", 56, INK)}</g></g>
{chip("eChip", 540, 780, True, "TÚ")}<rect x="0" y="880" width="1080" height="200" fill="#121630"/>{P("eA", 0, 300, 1065, 0.5, shirt="#C8A45D")}{P("eB", 2, 780, 1065, 0.5, flip=True)}''')

SCENES = {"table": s_table, "news": s_news, "compare": s_compare, "end": s_end}
