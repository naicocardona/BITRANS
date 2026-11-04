# Escenas nuevas para el video largo de NU (escenario 1060×1080, horizontal)
import json, math
from flat_scenes import fig, place, coin, windows, INK, IVORY, GOLD, LAV, VIO, NAVY, SKINS
SCR = None
def dots(w=1060, h=1080, op=".06"):
    return ''.join(f'<circle cx="{30+(k%14)*78}" cy="{30+(k//14)*80}" r="3" fill="{IVORY}" opacity="{op}"/>' for k in range(14 * 14))

def scene_nuvs():   # Nubank (app) ≠ Nu Holdings (acción en bolsa)
    phone = f'''<g transform="translate(250 540)"><g id="nvPh"><rect x="-130" y="-230" width="260" height="460" rx="36" fill="{INK}"/><rect x="-116" y="-212" width="232" height="424" rx="24" fill="{IVORY}"/>
<rect x="-116" y="-212" width="232" height="80" rx="24" fill="{VIO}"/><text y="-160" font-family="Bricolage" font-weight="800" font-size="40" text-anchor="middle" fill="#fff">Nubank</text>
<g transform="translate(0 -40)"><rect x="-90" y="-50" width="180" height="112" rx="14" fill="#6D28D9"/><rect x="-70" y="-20" width="40" height="30" rx="6" fill="{GOLD}"/><text x="40" y="44" font-family="Jakarta" font-weight="800" font-size="16" text-anchor="middle" fill="#fff">•••• 2026</text></g>
{''.join(f'<rect x="-90" y="{70+k*34}" width="{180-(k%2)*50}" height="16" rx="8" fill="{INK}" opacity=".25"/>' for k in range(4))}</g>
<text y="290" font-family="Bricolage" font-weight="800" font-size="40" text-anchor="middle" fill="{IVORY}">EL BANCO QUE USAS</text></g>'''
    cert = f'''<g transform="translate(800 540)"><g id="nvCt"><rect x="-150" y="-200" width="300" height="400" rx="14" fill="{IVORY}"/><rect x="-136" y="-186" width="272" height="372" rx="8" fill="none" stroke="{GOLD}" stroke-width="6"/>
<text y="-120" font-family="Jakarta" font-weight="800" font-size="22" text-anchor="middle" fill="#7E5A0E" letter-spacing="3">ACCIÓN · NYSE</text>
<text y="-20" font-family="Bricolage" font-weight="800" font-size="110" text-anchor="middle" fill="{VIO}">NU</text>
<text y="30" font-family="Jakarta" font-weight="800" font-size="30" text-anchor="middle" fill="{INK}">Nu Holdings</text>
<circle cy="110" r="40" fill="{GOLD}"/><text y="122" font-family="Bricolage" font-weight="800" font-size="34" text-anchor="middle" fill="{INK}">★</text>
<g id="nvUD" opacity="0"><path d="M120 -150 l26 -36 l26 36z" fill="#2E7D4F"/><path d="M120 -120 l26 36 l26 -36z" fill="#D93A2F"/></g></g>
<text y="290" font-family="Bricolage" font-weight="800" font-size="40" text-anchor="middle" fill="{IVORY}">LA ACCIÓN EN BOLSA</text></g>'''
    neq = f'<g transform="translate(530 540)"><g id="nvNe" opacity="0"><circle r="64" fill="{INK}" stroke="{GOLD}" stroke-width="8"/><text y="30" font-family="Bricolage" font-weight="800" font-size="90" text-anchor="middle" fill="{GOLD}">≠</text></g></g>'
    return f'<svg viewBox="0 0 1060 1080" width="1060" height="1080" xmlns="http://www.w3.org/2000/svg"><rect width="1060" height="1080" fill="#13284A"/>{dots()}{phone}{cert}{neq}</svg>'

def _proj(ring, lon0, lat0, sc, bx, by, k=math.cos(math.radians(8))):
    return "M" + " L".join(f"{bx + (lo - lon0) * k * sc:.1f} {by + (lat0 - la) * sc:.1f}" for lo, la in ring) + "Z"
def scene_latam(geo):   # México, Colombia y Brasil con pines + «+140 millones»
    lon0, lat0, sc, bx, by = -118.5, 33.0, 10.2, 40, 60
    P = lambda c: _proj(json.load(open(f"{geo}/{c}_ring.json")), lon0, lat0, sc, bx, by)
    pt = lambda lo, la: (bx + (lo - lon0) * math.cos(math.radians(8)) * sc, by + (lat0 - la) * sc)
    pins = [("pBR", "BRASIL", pt(-47.9, -12), 1.4), ("pMX", "MÉXICO", pt(-101, 22), 1.0), ("pCO", "COLOMBIA", pt(-74, 4.5), 1.0)]
    pin = lambda id, lab, xy, s: f'''<g transform="translate({xy[0]:.0f} {xy[1]:.0f}) scale({s})"><g id="{id}" opacity="0"><path d="M0 0 C-22 -30 -26 -45 -26 -57 A26 26 0 1 1 26 -57 C26 -45 22 -30 0 0Z" fill="{VIO}"/><circle cy="-57" r="10" fill="{IVORY}"/>
<rect x="-70" y="-122" width="140" height="40" rx="20" fill="{GOLD}"/><text y="-94" font-family="Jakarta" font-weight="800" font-size="22" text-anchor="middle" fill="{INK}">{lab}</text></g></g>'''
    crowd = ''.join(f'<g transform="translate({120+k*62} 1000) scale(1.6)"><g class="cr" opacity="0"><circle cy="-30" r="9" fill="{SKINS[k%4]}"/><rect x="-10" y="-20" width="20" height="28" rx="9" fill="{[GOLD, LAV, "#FF8A80", IVORY][k%4]}"/></g></g>' for k in range(14))
    return f'''<svg viewBox="0 0 1060 1080" width="1060" height="1080" xmlns="http://www.w3.org/2000/svg"><rect width="1060" height="1080" fill="#0F1F3D"/>{dots()}
<g fill="#24407A" stroke="{GOLD}" stroke-width="3" stroke-linejoin="round"><path id="mMX" d="{P('mex')}" opacity="0"/><path id="mCO" d="{P('col')}" opacity="0"/><path id="mBR" d="{P('bra')}" opacity="0"/></g>
{''.join(pin(*p) for p in pins)}{crowd}</svg>'''

def scene_vias():   # tres vías: moneda, economía, clientes que pagan
    ic = [(200, "R$", "MONEDA"), (530, "▤", "ECONOMÍA"), (860, "✓", "CLIENTES QUE PAGAN")]
    items = ''.join(f'''<g transform="translate({x} 520)"><g id="via{k}" opacity="0"><circle r="120" fill="{[VIO, '#2A4A8C', '#2E7D4F'][k]}"/><circle r="100" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="6"/>
<text y="{34 if k != 1 else 36}" font-family="Bricolage" font-weight="800" font-size="{96 if k != 1 else 110}" text-anchor="middle" fill="#fff">{s}</text>
<text y="190" font-family="Jakarta" font-weight="800" font-size="{30 if k < 2 else 24}" text-anchor="middle" fill="{IVORY}">{t}</text></g></g>''' for k, (x, s, t) in enumerate(ic))
    return f'''<svg viewBox="0 0 1060 1080" width="1060" height="1080" xmlns="http://www.w3.org/2000/svg"><rect width="1060" height="1080" fill="#13284A"/>{dots()}{items}
<g id="viaLupa" opacity="0" transform="translate(200 520)"><circle r="150" fill="#9FD3FF" fill-opacity=".12" stroke="{GOLD}" stroke-width="16"/><rect x="100" y="100" width="34" height="130" rx="16" fill="{GOLD}" transform="rotate(-45 117 117)"/></g></svg>'''

def scene_ab():   # dos empresas hipotéticas A y B
    bld = lambda id, x, lab, col: f'''<g transform="translate({x} 860)"><g id="{id}"><rect x="-150" y="-420" width="300" height="420" fill="{IVORY}"/><path d="M-170 -416 L0 -500 L170 -416Z" fill="{col}"/>
<text y="-440" font-family="Bricolage" font-weight="800" font-size="56" text-anchor="middle" fill="#fff">{lab}</text>{windows(-118, -380, 3, 5, 54, 46, 28, 22, GOLD, ".85")}<rect x="-40" y="-110" width="80" height="110" fill="{INK}"/>
<g class="dn" opacity="0"><rect x="-90" y="-640" width="180" height="70" rx="16" fill="{INK}"/><text y="-592" font-family="Bricolage" font-weight="800" font-size="44" text-anchor="middle" fill="#FF8A80">≈ −17 %</text></g>
<path class="crack" d="M-60 -400 L-20 -330 L-50 -270 L10 -200 L-10 -140" fill="none" stroke="#0B1B33" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>
<g transform="translate(-175 -470)"><g class="up" opacity="0"><path d="M0 -60 L40 0 H15 V60 H-15 V0 H-40Z" fill="#2E7D4F"/></g></g>
<g class="rep" opacity="0" transform="translate(0 -260)"><rect x="-110" y="-70" width="220" height="150" rx="14" fill="#fff" stroke="{INK}" stroke-width="4"/><text y="-30" font-family="Jakarta" font-weight="800" font-size="22" text-anchor="middle" fill="{INK}">RESULTADOS</text>
<text class="ok" y="48" font-family="Bricolage" font-weight="800" font-size="56" text-anchor="middle" fill="#2E7D4F" opacity="0">✓</text><text class="bad" y="48" font-family="Bricolage" font-weight="800" font-size="56" text-anchor="middle" fill="#D93A2F" opacity="0">✕</text></g></g></g>'''
    return f'''<svg viewBox="0 0 1060 1080" width="1060" height="1080" xmlns="http://www.w3.org/2000/svg"><rect width="1060" height="1080" fill="#1B3566"/>{dots(op=".05")}
<g id="abClouds">{''.join(f'<g class="abc" transform="translate({x} {y})"><ellipse rx="110" ry="34" fill="#F4EEDC" opacity=".18"/><ellipse cx="-60" cy="10" rx="70" ry="26" fill="#F4EEDC" opacity=".18"/></g>' for x, y in [(160, 120), (620, 90), (980, 150)])}</g>
<rect y="860" width="1060" height="220" fill="#2A3F66"/>{''.join(f'<rect x="{k*150}" y="960" width="90" height="10" rx="5" fill="#F4EEDC" opacity=".5"/>' for k in range(8))}
{bld("cA", 270, "A", "#2E7D4F")}{bld("cB", 790, "B", "#B3261E")}
{place(fig("fP1", SKINS[1], "#2B1B12", "#FF8A80", "#0B1B33", 3), -80, 1040, 0.5)}{place(fig("fP2", SKINS[2], "#5A3A22", "#C4B5FD", "#2A3F66", 1), 1140, 1050, 0.5)}
<text id="abQ" x="530" y="200" font-family="Bricolage" font-weight="800" font-size="180" text-anchor="middle" fill="{GOLD}" opacity="0">?</text>
<g id="abCal" opacity="0" transform="translate(530 300)"><rect x="-100" y="-60" width="200" height="120" rx="16" fill="{IVORY}"/><rect x="-100" y="-60" width="200" height="38" rx="16" fill="#D93A2F"/><text y="38" font-family="Bricolage" font-weight="800" font-size="40" text-anchor="middle" fill="{INK}">+ meses</text></g></svg>'''
