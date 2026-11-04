# Escenas ilustradas adicionales para el TikTok completo de NU (17 s → final)
INK, IVORY, GOLD, LAV, VIO, NAVY = "#0B1B33", "#F4EEDC", "#E2B755", "#C4B5FD", "#7C3AED", "#13284A"
SKINS = ["#C68B59", "#8D5A3B", "#E8B48A", "#A86F48"]

def fig(id, skin, hair, shirt, pants, hs=0, shoe=INK):
    """Personaje de pie (pies en y=0, ~360 px de alto). Partes animables: -lL -lR -aL -aR -h -e -sm -fl -oh -br -sw"""
    hair_svg = {
        0: f'<path d="M-46 -318 Q-50 -372 0 -372 Q50 -372 46 -318 Q40 -344 6 -346 Q-26 -348 -46 -318Z" fill="{hair}"/>',
        1: f'<circle cx="0" cy="-372" r="20" fill="{hair}"/><path d="M-46 -316 Q-50 -368 0 -368 Q50 -368 46 -316 Q36 -342 0 -344 Q-36 -342 -46 -316Z" fill="{hair}"/>',
        2: f'<path d="M-50 -320 Q-54 -376 0 -376 Q54 -376 50 -320 L54 -236 Q40 -226 30 -240 L34 -320 Q20 -344 -20 -344 Q-36 -330 -34 -320 L-30 -240 Q-40 -226 -54 -236Z" fill="{hair}"/>',
        3: ''.join(f'<circle cx="{x}" cy="{y}" r="16" fill="{hair}"/>' for x, y in [(-36, -340), (-18, -358), (2, -364), (22, -358), (38, -340), (-44, -318), (44, -318)]),
    }[hs]
    return f'''<g id="{id}"><ellipse cx="0" cy="4" rx="50" ry="10" fill="#000" opacity=".18"/><g id="{id}-bob">
<g id="{id}-lL"><rect x="-28" y="-152" width="25" height="146" rx="12" fill="{pants}"/><path d="M-34 -14 h32 q8 0 8 10 v6 h-44 q-2 -16 4 -16z" fill="{shoe}"/></g>
<g id="{id}-lR"><rect x="3" y="-152" width="25" height="146" rx="12" fill="{pants}"/><path d="M2 -14 h32 q8 0 8 10 v6 h-44 q-2 -16 4 -16z" fill="{shoe}"/></g>
<g id="{id}-aL"><rect x="-60" y="-266" width="24" height="122" rx="12" fill="{shirt}"/><circle cx="-48" cy="-142" r="13" fill="{skin}"/></g>
<rect x="-44" y="-276" width="88" height="140" rx="32" fill="{shirt}"/><path d="M-14 -274 L0 -252 L14 -274" fill="none" stroke="#000" stroke-opacity=".15" stroke-width="5" stroke-linecap="round"/>
<g id="{id}-aR"><rect x="36" y="-266" width="24" height="122" rx="12" fill="{shirt}"/><circle cx="48" cy="-142" r="13" fill="{skin}"/></g>
<g id="{id}-h"><rect x="-12" y="-292" width="24" height="24" rx="8" fill="{skin}"/>{hair_svg if hs == 2 else ''}<circle cx="-44" cy="-316" r="10" fill="{skin}"/><circle cx="44" cy="-316" r="10" fill="{skin}"/>
<circle cx="0" cy="-318" r="46" fill="{skin}"/>{hair_svg if hs != 2 else hair_svg.replace('L54 -236 Q40 -226 30 -240 L34 -320', 'L50 -320').replace('L-30 -240 Q-40 -226 -54 -236', 'L-50 -320')}
<ellipse cx="-26" cy="-300" rx="8" ry="5" fill="#E07A6A" opacity=".4"/><ellipse cx="26" cy="-300" rx="8" ry="5" fill="#E07A6A" opacity=".4"/>
<g id="{id}-br"><path d="M-26 -340 q8 -5 16 0" stroke="{hair}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M10 -340 q8 -5 16 0" stroke="{hair}" stroke-width="4" fill="none" stroke-linecap="round"/></g>
<g id="{id}-e"><ellipse class="eyeb" cx="-17" cy="-322" rx="5" ry="7" fill="{INK}"/><ellipse class="eyeb" cx="17" cy="-322" rx="5" ry="7" fill="{INK}"/><circle cx="-15" cy="-325" r="1.8" fill="#fff"/><circle cx="19" cy="-325" r="1.8" fill="#fff"/></g>
<path id="{id}-sm" d="M-14 -300 Q0 -288 14 -300" fill="none" stroke="{INK}" stroke-width="4" stroke-linecap="round"/>
<path id="{id}-fl" d="M-10 -296 L10 -297" fill="none" stroke="{INK}" stroke-width="4" stroke-linecap="round" opacity="0"/>
<ellipse id="{id}-oh" cx="0" cy="-296" rx="8" ry="10" fill="{INK}" opacity="0"/>
<path id="{id}-sw" d="M50 -350 q8 13 0 18 q-8 -5 0 -18z" fill="#9FD3FF" opacity="0"/></g></g></g>'''

def place(inner, x, y, s=1.0, flip=False):
    return f'<g transform="translate({x} {y}) scale({-s if flip else s} {s})">{inner}</g>'

def coin(id, x, y, r, label, fill=GOLD, txt=INK, extra=""):
    return f'<g transform="translate({x} {y})"><g id="{id}" {extra}><circle r="{r}" fill="{fill}"/><circle r="{r*0.82}" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="{max(2, r*0.08):.0f}"/><text y="{r*0.36:.0f}" font-family="Bricolage" font-weight="800" font-size="{r*0.95:.0f}" text-anchor="middle" fill="{txt}">{label}</text></g></g>'

def windows(x0, y0, cols, rows, w=26, h=34, gx=18, gy=20, col=GOLD, op=".8", cls="bw"):
    return ''.join(f'<rect class="{cls}" x="{x0+c*(w+gx)}" y="{y0+r*(h+gy)}" width="{w}" height="{h}" rx="4" fill="{col}" opacity="{op}"/>' for r in range(rows) for c in range(cols))

def scene_street():  # S5/S6 — calle con banco (ancho 2100)
    bg = f'''<defs><linearGradient id="dsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9DB4EE"/><stop offset="1" stop-color="#F4EEDC"/></linearGradient>
<linearGradient id="nsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2B3557"/><stop offset="1" stop-color="#5C6788"/></linearGradient></defs>
<rect width="2100" height="1920" fill="url(#dsky)"/><rect id="storm" width="2100" height="1920" fill="url(#nsky)" opacity="0"/>
<circle id="sun" cx="1650" cy="520" r="70" fill="{GOLD}" opacity=".9"/>
<g id="clouds">{''.join(f'<g class="cl" transform="translate({x} {y})"><ellipse rx="90" ry="34" fill="#fff" opacity=".85"/><ellipse cx="-50" cy="8" rx="60" ry="26" fill="#fff" opacity=".85"/><ellipse cx="55" cy="10" rx="64" ry="28" fill="#fff" opacity=".85"/></g>' for x, y in [(250, 470), (900, 430), (1500, 470), (1950, 440)])}</g>
<g id="dclouds" opacity="0">{''.join(f'<g transform="translate({x} {y})"><ellipse rx="160" ry="56" fill="#3A4466"/><ellipse cx="-90" cy="14" rx="110" ry="44" fill="#3A4466"/><ellipse cx="100" cy="16" rx="120" ry="46" fill="#444F74"/></g>' for x, y in [(200, 430), (700, 400), (1200, 440), (1700, 410), (2100, 430)])}</g>
<g id="rain" opacity="0">{''.join(f'<line class="rd" x1="{(k*97)%2100}" y1="{420+(k*53)%600}" x2="{(k*97)%2100-10}" y2="{450+(k*53)%600}" stroke="#C4D3F5" stroke-width="4" stroke-linecap="round" opacity=".7"/>' for k in range(70))}</g>
<g fill="#B9A9F0" opacity=".55"><rect x="0" y="640" width="160" height="460"/><rect x="170" y="700" width="120" height="400"/><rect x="820" y="660" width="150" height="440"/><rect x="1180" y="620" width="130" height="480"/><rect x="1560" y="690" width="180" height="410"/><rect x="1900" y="650" width="200" height="450"/></g>
'''
    bank = f'''<g id="bank"><rect x="300" y="700" width="480" height="380" fill="{IVORY}"/><rect x="280" y="1060" width="520" height="24" fill="#D8CFB8"/>
<path d="M270 704 L540 560 L810 704Z" fill="{VIO}"/><rect x="270" y="700" width="540" height="22" fill="#5B21B6"/>
<rect x="430" y="610" width="220" height="56" rx="10" fill="{GOLD}"/><text x="540" y="652" font-family="Bricolage" font-weight="800" font-size="44" text-anchor="middle" fill="{INK}">BANCO</text>
{''.join(f'<rect x="{330+k*86}" y="740" width="34" height="300" rx="10" fill="#E9E1CC"/>' for k in range(6))}
<rect id="door" x="490" y="930" width="100" height="150" rx="8" fill="#2A3F66"/><circle cx="575" cy="1010" r="5" fill="{GOLD}"/>
<g id="bchk" opacity="0" transform="translate(540 600)"><circle r="40" fill="#2E7D4F"/><path d="M-18 0 l12 12 l24 -26" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></g></g>'''
    shop = f'''<g id="office"><rect x="1300" y="760" width="380" height="320" fill="#E2B755"/><rect x="1280" y="740" width="420" height="34" rx="8" fill="#B88A2E"/>
<rect x="1360" y="790" width="260" height="50" rx="10" fill="{INK}"/><text x="1490" y="826" font-family="Bricolage" font-weight="800" font-size="34" text-anchor="middle" fill="{GOLD}">TRABAJO</text>
{windows(1330, 870, 3, 2, 60, 60, 30, 20, IVORY, ".9", "ow")}<rect x="1450" y="960" width="80" height="120" rx="6" fill="{INK}"/>
<g id="closed" opacity="0"><rect x="1420" y="900" width="140" height="44" rx="8" fill="#D93A2F"/><text x="1490" y="932" font-family="Jakarta" font-weight="800" font-size="24" text-anchor="middle" fill="#fff">CERRADO</text></g></g>
<g><rect x="1850" y="760" width="250" height="320" fill="#2A4A8C"/>{windows(1870, 790, 3, 4, 40, 40, 30, 28, GOLD, ".8")}</g>
<g><rect x="40" y="760" width="230" height="320" fill="#2A4A8C"/>{windows(60, 790, 3, 4, 40, 40, 26, 28, GOLD, ".8")}</g>
<g><rect x="860" y="820" width="300" height="260" fill="#C4B5FD"/>{windows(885, 850, 4, 3, 44, 44, 24, 26, IVORY, ".9")}</g>'''
    ground = f'''<rect x="0" y="1080" width="2100" height="70" fill="#D8CFB8"/><rect x="0" y="1150" width="2100" height="770" fill="#2A3F66"/>
{''.join(f'<rect x="{k*160}" y="1226" width="90" height="12" rx="6" fill="{IVORY}" opacity=".7"/>' for k in range(14))}
{''.join(f'<g transform="translate({x} 1080)"><rect x="-5" y="-170" width="10" height="170" fill="{INK}"/><circle cy="-176" r="16" fill="{GOLD}"/></g>' for x in [200, 860, 1240, 1780])}
<g transform="translate(0 1210)"><g id="car2"><rect x="-70" y="-30" width="140" height="40" rx="14" fill="{VIO}"/><rect x="-44" y="-58" width="84" height="34" rx="12" fill="{VIO}"/><rect x="-34" y="-52" width="64" height="22" rx="7" fill="{LAV}"/><circle cx="-40" cy="12" r="14" fill="{INK}"/><circle cx="42" cy="12" r="14" fill="{INK}"/></g></g>'''
    people = (place(fig("fA", SKINS[0], "#1E1A2E", GOLD, "#3B4F7A", 2), 120, 1120, 0.95)
              + place(fig("fB", SKINS[1], "#2B1B12", "#FF8A80", "#0B1B33", 3), 1900, 1125, 0.75)
              + place(fig("fC", SKINS[2], "#5A3A22", LAV, "#2A3F66", 0), -100, 1128, 0.7))
    flows = ''.join(coin(f"lc{k}", 540, 990, 22, "$") for k in range(4)) + ''.join(coin(f"sc{k}", 1490, 960, 22, "$") for k in range(4)) + ''.join(coin(f"pc{k}", 1100, 980, 22, "$") for k in range(4))
    lbl = lambda id, x, y, t, bg, fg: f'<g transform="translate({x} {y})"><g id="{id}" opacity="0"><rect x="-150" y="-40" width="300" height="80" rx="40" fill="{bg}"/><text y="14" font-family="Jakarta" font-weight="800" font-size="38" text-anchor="middle" fill="{fg}">{t}</text></g></g>'
    labels = lbl("lbl1", 460, 760, "+ Préstamo", GOLD, INK) + lbl("lbl2", 1420, 690, "+ Sueldo", IVORY, INK) + lbl("lbl3", 760, 600, "✓ Pagó", "#2E7D4F", "#fff")
    return f'<svg viewBox="0 0 2100 1920" width="2100" height="1920" xmlns="http://www.w3.org/2000/svg">{bg}{shop}{bank}{ground}{people}{flows}{labels}</svg>'

def scene_fx():  # S6b — cambio de moneda (balanza)
    return f'''<svg viewBox="0 0 1080 1920" width="1080" height="1920" xmlns="http://www.w3.org/2000/svg"><rect width="1080" height="1920" fill="#13284A"/>
{''.join(f'<circle cx="{40+(k%14)*78}" cy="{60+(k//14)*80}" r="3" fill="{IVORY}" opacity=".06"/>' for k in range(14*24))}
<g transform="translate(540 1080)"><path d="M-60 0 L60 0 L0 -150Z" fill="{GOLD}"/><g id="beam2" transform="translate(0 -150)"><rect x="-380" y="-10" width="760" height="20" rx="10" fill="{GOLD}"/>
<g transform="translate(-330 0)"><line x1="0" y1="0" x2="0" y2="-40" stroke="{GOLD}" stroke-width="6"/><g id="rcoin" transform="translate(0 -150)"><circle r="110" fill="{VIO}"/><circle r="90" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="8"/><text y="38" font-family="Bricolage" font-weight="800" font-size="100" text-anchor="middle" fill="{IVORY}">R$</text></g></g>
<g transform="translate(330 0)"><line x1="0" y1="0" x2="0" y2="-40" stroke="{GOLD}" stroke-width="6"/><g id="ucoin" transform="translate(0 -150)"><circle r="110" fill="{GOLD}"/><circle r="90" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="8"/><text y="38" font-family="Bricolage" font-weight="800" font-size="86" text-anchor="middle" fill="{INK}">US$</text></g></g></g></g>
</svg>'''

def scene_news():  # S7 — pantalla gigante, inversionistas, camión de resultados (alto 1920, ancho 2200)
    tv = f'''<g id="tv"><rect x="200" y="420" width="680" height="440" rx="26" fill="{INK}"/><rect x="226" y="446" width="628" height="388" rx="14" fill="#24407A"/>
<g id="tvon" opacity="0"><rect x="226" y="446" width="628" height="388" rx="14" fill="{IVORY}"/><rect x="226" y="446" width="628" height="70" rx="14" fill="#D93A2F"/>
<text x="540" y="494" font-family="Jakarta" font-weight="800" font-size="34" text-anchor="middle" fill="#fff" letter-spacing="3">ÚLTIMA HORA</text>
<g transform="translate(540 650)"><rect x="-70" y="10" width="140" height="110" rx="10" fill="{VIO}"/><rect x="-14" y="-90" width="28" height="100" rx="12" fill="{INK}"/><circle cy="-100" r="30" fill="{INK}"/>
<rect x="-160" y="120" width="320" height="16" rx="8" fill="{INK}" opacity=".5"/></g>
<text x="540" y="810" font-family="Bricolage" font-weight="800" font-size="40" text-anchor="middle" fill="{INK}">NOTICIA POLÍTICA</text></g>
<rect x="520" y="860" width="40" height="90" fill="{INK}"/><rect x="430" y="940" width="220" height="20" rx="10" fill="{INK}"/></g>'''
    bubbles = ''.join(f'''<g transform="translate({x} 760)"><g id="tb{k}" opacity="0"><circle cx="0" cy="0" r="58" fill="{IVORY}"/><circle cx="-30" cy="70" r="12" fill="{IVORY}"/><circle cx="-40" cy="96" r="7" fill="{IVORY}"/>
<path d="{d}" fill="{c}"/></g></g>''' for k, (x, d, c) in enumerate([(300, "M0 -30 L26 10 H10 V30 H-10 V10 H-26Z", "#2E7D4F"), (560, "M0 30 L26 -10 H10 V-30 H-10 V-10 H-26Z", "#D93A2F"), (820, "M-6 -30 h12 v40 h-12z M-6 18 h12 v12 h-12z", INK)]))
    inv = (place(fig("i1", SKINS[3], "#1E1A2E", "#2A4A8C", INK, 0), 300, 1230, 0.8) + place(fig("i2", SKINS[2], "#5A3A22", "#FF8A80", "#3B4F7A", 1), 560, 1235, 0.8)
           + place(fig("i3", SKINS[1], "#1E1A2E", GOLD, "#2A3F66", 3), 820, 1230, 0.8))
    board = f'''<g id="board" transform="translate(1000 640)"><g id="boardi" opacity="0"><rect x="-10" y="-160" width="20" height="560" fill="{INK}"/><rect x="-150" y="-200" width="300" height="200" rx="20" fill="{VIO}"/>
<text x="0" y="-80" font-family="Bricolage" font-weight="800" font-size="96" text-anchor="middle" fill="#fff">NU</text><g id="barr" transform="translate(110 -100)"><path d="M-20 -40 h40 v40 h26 l-46 52 l-46 -52 h26z" fill="#FF8A80"/></g></g></g>'''
    road = f'''<rect x="0" y="1240" width="2200" height="680" fill="#2A3F66"/><rect x="0" y="1240" width="2200" height="16" fill="#3B4F7A"/>
{''.join(f'<rect x="{1200+k*150}" y="1118" width="90" height="10" rx="5" fill="{IVORY}" opacity=".6"/>' for k in range(7))}
<rect x="1150" y="1060" width="1050" height="130" fill="#34507F"/>
{''.join(f'<g transform="translate({x} 1060)"><rect x="-4" y="-140" width="8" height="140" fill="{INK}"/><rect x="-80" y="-190" width="160" height="56" rx="10" fill="{GOLD}"/><text y="-152" font-family="Jakarta" font-weight="800" font-size="26" text-anchor="middle" fill="{INK}">{t}</text></g>' for x, t in [(1450, "TRIMESTRE 1"), (1800, "TRIMESTRE 2")])}
<g transform="translate(2100 1060)"><rect x="-90" y="-260" width="180" height="260" fill="{IVORY}"/><path d="M-110 -256 L0 -330 L110 -256Z" fill="{VIO}"/><text y="-200" font-family="Jakarta" font-weight="800" font-size="26" text-anchor="middle" fill="{INK}">NEGOCIO</text><rect x="-30" y="-100" width="60" height="100" fill="#2A3F66"/></g>
<g transform="translate(1250 1125)"><g id="truck"><rect x="-90" y="-80" width="130" height="80" rx="8" fill="{IVORY}"/><text x="-25" y="-32" font-family="Jakarta" font-weight="800" font-size="19" text-anchor="middle" fill="{INK}">RESULTADOS</text>
<path d="M40 -60 h40 l24 30 v30 h-64z" fill="{GOLD}"/><rect x="56" y="-54" width="26" height="20" rx="3" fill="#9FD3FF"/><circle cx="-56" cy="4" r="16" fill="{INK}"/><circle cx="70" cy="4" r="16" fill="{INK}"/></g></g>'''
    stars = "".join(f'<circle cx="{(k*131)%2200}" cy="{380+(k*57)%300}" r="2.5" fill="{IVORY}" opacity=".4"/>' for k in range(40))
    blds = "".join(f'<rect x="{x}" y="{y}" width="{w}" height="{1240-y}"/>' for x, y, w in [(0, 700, 180), (900, 760, 160), (1080, 680, 120), (1600, 720, 200), (1900, 690, 160)])
    sky = f'<rect width="2200" height="1240" fill="#1B3566"/>{stars}<g fill="#24407A">{blds}</g>'
    return f'<svg viewBox="0 0 2200 1920" width="2200" height="1920" xmlns="http://www.w3.org/2000/svg">{sky}{road}{tv}{board}{inv}{bubbles}</svg>'

def scene_desk():  # S8 — escritorio con lupa y 3 preguntas
    return f'''<svg viewBox="0 0 1080 1920" width="1080" height="1920" xmlns="http://www.w3.org/2000/svg"><rect width="1080" height="1920" fill="#18305A"/>
{''.join(f'<circle cx="{40+(k%14)*78}" cy="{60+(k//14)*80}" r="3" fill="{IVORY}" opacity=".05"/>' for k in range(14*24))}
<rect x="640" y="430" width="340" height="260" rx="10" fill="#24407A" stroke="{GOLD}" stroke-width="10"/>{windows(670, 460, 4, 3, 50, 50, 26, 28, GOLD, ".5")}
<g id="dD">{place(fig("fD", SKINS[0], "#1E1A2E", GOLD, "#3B4F7A", 2), 360, 1290, 1.3)}</g>
<rect x="120" y="1020" width="840" height="40" rx="12" fill="#B88A2E"/><rect x="160" y="1060" width="24" height="230" fill="#8A6620"/><rect x="896" y="1060" width="24" height="230" fill="#8A6620"/>
<g transform="translate(760 1020) scale(.8)"><rect x="-150" y="-150" width="300" height="150" rx="12" fill="{INK}"/><rect x="-136" y="-138" width="272" height="124" rx="6" fill="{LAV}"/><rect x="-190" y="-6" width="380" height="16" rx="8" fill="#3B4F7A"/>
<text y="-68" font-family="Bricolage" font-weight="800" font-size="30" text-anchor="middle" fill="{INK}">INVESTIGAR</text></g>
<g id="q1i" opacity="0" transform="translate(250 760)"><rect x="-110" y="-130" width="220" height="260" rx="10" fill="{IVORY}"/><rect x="-90" y="-104" width="180" height="22" rx="4" fill="{INK}"/>{''.join(f'<rect x="-90" y="{-66+k*24}" width="{180-(k%2)*50}" height="10" rx="4" fill="{INK}" opacity=".4"/>' for k in range(7))}</g>
<g id="q2i" opacity="0" transform="translate(540 700)"><rect x="-90" y="-140" width="180" height="260" fill="{IVORY}"/><path d="M-110 -136 L0 -200 L110 -136Z" fill="{VIO}"/>{windows(-66, -110, 3, 4, 30, 34, 18, 22, GOLD, ".9")}<g id="gear" transform="translate(90 -170)"><circle r="40" fill="{GOLD}"/><circle r="16" fill="#18305A"/>{''.join(f'<rect x="-9" y="-56" width="18" height="22" rx="4" fill="{GOLD}" transform="rotate({k*45})"/>' for k in range(8))}</g></g>
<g id="q3i" opacity="0" transform="translate(830 760)"><rect x="-110" y="-130" width="220" height="260" rx="10" fill="{IVORY}"/><text y="-84" font-family="Jakarta" font-weight="800" font-size="24" text-anchor="middle" fill="{INK}">RESULTADOS</text>
{''.join(f'<rect x="{-80+k*42}" y="{60-h}" width="28" height="{h}" rx="4" fill="{VIO}"/>' for k, h in enumerate([50, 80, 60, 100]))}<text y="110" font-family="Jakarta" font-weight="700" font-size="18" text-anchor="middle" fill="#5A6680">ilustrativo</text></g>
<g id="lupa" opacity="0" transform="translate(250 760)"><g id="lupai"><circle r="70" fill="#9FD3FF" fill-opacity=".25" stroke="{INK}" stroke-width="16"/><rect x="44" y="44" width="26" height="100" rx="12" fill="{INK}" transform="rotate(-45 57 57)"/></g></g>
{''.join(f'<g id="qk{k}" opacity="0" transform="translate({x} 590)"><circle r="34" fill="#2E7D4F"/><path d="M-15 0 l10 10 l20 -22" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>' for k, x in enumerate([340, 630, 920]))}
</svg>'''

def scene_cross(t1="UNA SOLA CAUSA", t2="RECUPERACIÓN ASEGURADA"):  # S9 — encrucijada
    sign = lambda id, y, txt, rot, dx: f'''<g transform="translate(540 {y}) rotate({rot})"><g id="{id}"><path d="M{-300+dx} -50 H{250+dx} L{310+dx} 0 L{250+dx} 50 H{-300+dx}Z" fill="{IVORY}" transform="scale({1 if dx >= 0 else -1} 1)"/>
<text x="{0}" y="13" font-family="Bricolage" font-weight="800" font-size="{40 if len(txt) < 16 else 31}" text-anchor="middle" fill="{INK}">{txt}</text>
<g class="xs" opacity="0"><path d="M-200 -40 L200 40 M-200 40 L200 -40" stroke="#D93A2F" stroke-width="18" stroke-linecap="round"/></g></g></g>'''
    return f'''<svg viewBox="0 0 1080 1920" width="1080" height="1920" xmlns="http://www.w3.org/2000/svg"><rect width="1080" height="1920" fill="#1B3566"/>
<path d="M0 1200 Q540 1060 1080 1200 V1920 H0Z" fill="#2E7D4F" opacity=".55"/><path d="M380 1920 L500 1180 L580 1180 L700 1920Z" fill="#D8CFB8" opacity=".7"/>
<rect x="528" y="560" width="24" height="640" fill="#8A6620"/>
{sign("sg1", 640, t1, -4, 0)}{sign("sg2", 800, t2, 3, 0)}
<g id="dQ">{place(fig("fQ", SKINS[0], "#1E1A2E", GOLD, "#3B4F7A", 2), 250, 1290, 1.2)}</g>
{''.join(f'<text class="qm" x="{x}" y="{y}" font-family="Bricolage" font-weight="800" font-size="80" fill="{GOLD}" opacity="0">?</text>' for x, y in [(150, 780), (260, 740), (340, 790)])}
</svg>'''

LINES3 = ''.join(f'<rect x="-34" y="{4+j*16}" width="68" height="8" rx="4" fill="{INK}" opacity=".3"/>' for j in range(3))
def scene_titan():  # S10 — carpeta TITÁN 3.0, lluvia de noticias y paraguas
    return f'''<svg viewBox="0 0 1080 1920" width="1080" height="1920" xmlns="http://www.w3.org/2000/svg"><rect width="1080" height="1920" fill="#13284A"/>
{''.join(f'<circle cx="{40+(k%14)*78}" cy="{60+(k//14)*80}" r="3" fill="{IVORY}" opacity=".06"/>' for k in range(14*24))}
<g id="glow"><circle cx="540" cy="760" r="300" fill="{GOLD}" opacity=".12"/></g>
<g id="binder" transform="translate(540 820)"><rect x="-260" y="-200" width="520" height="380" rx="26" fill="#5B21B6"/><rect id="bfront" x="-260" y="-200" width="520" height="380" rx="26" fill="{VIO}"/>
<text id="bt" y="-110" font-family="Jakarta" font-weight="800" font-size="56" text-anchor="middle" fill="#fff" letter-spacing="6">TITÁN 3.0</text>
{''.join(f'<g class="pcard" transform="translate({-170+k*120} 20)"><rect x="-50" y="-70" width="100" height="140" rx="12" fill="{IVORY}"/><rect x="-34" y="-50" width="68" height="40" rx="8" fill="{c}"/><text y="-22" font-family="Bricolage" font-weight="800" font-size="24" text-anchor="middle" fill="#fff">{t}</text>{LINES3}</g>' for k, (t, c) in enumerate([("NU", VIO), ("", "#2A4A8C"), ("", GOLD), ("", "#2E7D4F")]))}</g>
<g id="logo" transform="translate(540 560)" opacity="0"><circle r="96" fill="{GOLD}"/><clipPath id="lgc"><circle r="86"/></clipPath><image href="assets/brand/logo.jpg" x="-100" y="-100" width="200" height="200" clip-path="url(#lgc)"/></g>
<g id="cloud2" opacity="0" transform="translate(540 640)"><ellipse rx="230" ry="70" fill="#3A4466"/><ellipse cx="-130" cy="20" rx="140" ry="56" fill="#444F74"/><ellipse cx="140" cy="20" rx="150" ry="60" fill="#3A4466"/></g>
{''.join(f'<g class="npr" transform="translate({x} 690)" opacity="0"><rect x="-40" y="-30" width="80" height="60" rx="4" fill="{IVORY}"/><rect x="-30" y="-20" width="60" height="10" fill="{INK}"/><rect x="-30" y="0" width="44" height="6" fill="{INK}" opacity=".4"/></g>' for x in [340, 540, 740])}
<g id="dT">{place(fig("fT", SKINS[0], "#1E1A2E", GOLD, "#3B4F7A", 2), 540, 1280, 1.15)}</g>
<g id="umb" opacity="0" transform="translate(600 900)"><path d="M-170 0 Q0 -170 170 0 Q128 -26 85 0 Q42 -26 0 0 Q-42 -26 -85 0 Q-128 -26 -170 0Z" fill="{GOLD}"/><rect x="-5" y="0" width="10" height="200" fill="{INK}"/></g>
</svg>'''
