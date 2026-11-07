# TITÁN · NU · muestra en estilo ilustrado (personajes + escenas), primeros ~17 s del TikTok
import os, sys, json, shutil, subprocess, importlib.util as U
SH = "shorts" in sys.argv
FULL = "full" in sys.argv or SH
H = os.path.dirname(os.path.abspath(__file__)); SCR = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work")
sp = U.spec_from_file_location("ta", f"{H}/tq_anchors.py"); ta = U.module_from_spec(sp); sp.loader.exec_module(ta)
d = json.load(open(f"{SCR}/nu/voz/t/" + ("shorts" if SH else "tiktok") + ".words.json")); Wd = d["display"]
a = ta.Anchors(Wd); A = lambda ph: a(ph, False)
DUR = 38.78 if SH else (68.64 if FULL else 17.6)
if SH:
    T = dict(nubank=1.2, elec=A("unas elecciones"), sacudir=A("con el precio"), inv=2.95, eso=A("El 26"), nu=A("de NU"), d26=A("26"), cayo=A("cayó cerca"),
             ses=round(A("cayó cerca") + 1.6, 3), cob=A("La cobertura"), rel=A("vinculó"), reac=A("reacción del mercado"), elec2=A("a las elecciones"), bra=A("de Brasil."),
             por=A("La conexión importa:"), empresa=A("una empresa puede"), ocurre=A("lo que ocurre"), negocios=A("hace negocios."), entender=A("Para entender"),
             q1=A("la noticia,"), q2=A("su posible efecto"), q3=A("y los resultados"), recuerda=A("Y recuerda:"), caiga=A("caiga no"), barata=A("esté barata."), cta=A("¿Conocías este"))
else:
  T = dict(nubank=A("Nubank…"), elec=A("unas elecciones"), sacudir=A("sacudir"), inv=A("inversión."), eso=A("Eso ayuda"), nu=A("con NU"), d26=A("26"),
         cayo=A("cayó cerca"), ses=A("en una sesión."), cob=A("La cobertura"), rel=A("relacionó"), reac=A("con la reacción"),
         elec2=A("a las elecciones"), bra=A("de Brasil."))
if FULL and not SH:
    for k, ph in dict(por="¿Por qué importa", piensa="Piensa en un", dinero="dinero.", interesa="Le interesa", ingresos="ingresos y puedan", pagar="pagar.",
                      tamb="También le afectan", condic="las condiciones económicas", moneda="y la moneda.", noticia="Una noticia política", invers="que los inversores",
                      esas="Y esas expectativas", mover="pueden mover el", antes="precio antes de", conoz="que conozcamos su", negocio="el negocio.", poreso="Por eso conviene",
                      q1="¿qué pasó?,", q2="¿cómo podría afectar", q3="¿qué muestran", noconc="No podemos concluir", causa="sola causa.", recup="a recuperarse.",
                      nuforma="NU forma parte", titan="de TITÁN 3.0.", aqui="Aquí queremos entender", incom="noticias incómodas.", cta="¿Qué empresa te").items(): T[k] = A(ph)
T["nu"] += 0.25; T["p17"] = round(next(w[1] for w in Wd if w[0].startswith("17")), 3)
G = [g for g in ta.groups(Wd, 3) if g[0] < DUR - 0.2]
P = f"{SCR}/flat-nu" + ("-sh" if SH else ("-tk" if FULL else "")); os.makedirs(f"{P}/assets/audio", exist_ok=True)
for sub in ["vendor", "fonts", "brand"]: shutil.copytree(f"{SCR}/tq-3d/assets/{sub}", f"{P}/assets/{sub}", dirs_exist_ok=True)
shutil.copy(f"{SCR}/tq-3d/hyperframes.json", P)
json.dump({"name": "flat-nu", "private": True, "type": "module"}, open(P + "/package.json", "w")); json.dump({"id": "flat-nu", "name": "flat-nu"}, open(P + "/meta.json", "w"))
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{SCR}/nu-" + ("shorts" if SH else "tiktok") + "/assets/audio/mix.wav", "-t", str(DUR), "-af", f"afade=t=out:st={DUR-0.5}:d=0.5", f"{P}/assets/audio/mix.wav"], check=True)
json.dump({"name": os.path.basename(P), "private": True, "type": "module"}, open(P + "/package.json", "w")); json.dump({"id": os.path.basename(P), "name": os.path.basename(P)}, open(P + "/meta.json", "w"))

SKIN, HAIR, SHIRT, PANTS, INK = "#C68B59", "#1E1A2E", "#C4B5FD", "#3B4F7A", "#0B1B33"
def person(i, x, y, s, shirt):  # figura pequeña que camina (calle)
    return f'''<g transform="translate({x} {y}) scale({s})"><g id="w{i}"><g class="wb">
<line class="lg1" x1="0" y1="20" x2="-4" y2="40" stroke="{INK}" stroke-width="5" stroke-linecap="round"/>
<line class="lg2" x1="0" y1="20" x2="4" y2="40" stroke="{INK}" stroke-width="5" stroke-linecap="round"/>
<rect x="-8" y="-6" width="16" height="28" rx="7" fill="{shirt}"/><circle cx="0" cy="-14" r="8" fill="{SKIN}"/>
<path d="M-8 -16 Q-8 -25 0 -25 Q8 -25 8 -16 Q4 -21 0 -21 Q-4 -21 -8 -16Z" fill="{HAIR}"/></g></g></g>'''

street = f'''
<rect x="600" y="430" width="380" height="430" fill="url(#sky)"/>
<g id="stars">{''.join(f'<circle class="st" cx="{620+(k*53)%350}" cy="{450+(k*37)%150}" r="{1.5+(k%3)*0.7}" fill="#F4EEDC"/>' for k in range(14))}</g>
<circle cx="920" cy="480" r="22" fill="#F4EEDC" opacity=".9"/>
<g fill="#0B1730">
<rect x="600" y="600" width="70" height="200"/><rect x="680" y="560" width="60" height="240"/><rect x="750" y="620" width="80" height="180"/><rect x="840" y="580" width="60" height="220"/><rect x="910" y="640" width="70" height="160"/></g>
<g fill="#E2B755" opacity=".75">{''.join(f'<rect class="lw" x="{612+(k*29)%360}" y="{580+(k*41)%180}" width="9" height="12"/>' for k in range(22))}</g>
<rect x="600" y="790" width="380" height="70" fill="#1B2E55"/>
<rect x="600" y="800" width="380" height="6" fill="#2A3F66"/>
<g id="urna1" transform="translate(895 760)"><rect x="-34" y="-30" width="68" height="58" rx="6" fill="#DCE7FF" opacity=".9"/><rect x="-36" y="-36" width="72" height="9" rx="3" fill="{INK}"/>
<rect x="-16" y="-34" width="32" height="4" fill="#050E1E"/><rect x="-26" y="-8" width="52" height="16" rx="4" fill="#E2B755"/><text x="0" y="5" font-family="Jakarta" font-weight="800" font-size="11" text-anchor="middle" fill="{INK}">VOTO</text></g>
<rect id="ballot" x="887" y="690" width="16" height="22" rx="2" fill="#F4EEDC"/>
{person(0, 640, 772, 1.0, "#E2B755")}{person(1, 690, 772, 1.0, "#7C3AED")}{person(2, 740, 772, 1.0, "#F4EEDC")}{person(3, 800, 772, 1.0, "#FF8A80")}
<g transform="translate(560 830)"><g id="car"><rect x="-40" y="-18" width="80" height="22" rx="8" fill="#7C3AED"/><rect x="-24" y="-32" width="46" height="18" rx="7" fill="#7C3AED"/><rect x="-18" y="-28" width="34" height="11" rx="4" fill="#C4B5FD"/><circle cx="-22" cy="6" r="8" fill="{INK}"/><circle cx="24" cy="6" r="8" fill="{INK}"/><circle cx="38" cy="-8" r="4" fill="#F7DD9C"/></g></g>
'''

def char():
    return f'''<g id="p" transform="translate(470 800) scale(1.55)">
<ellipse cx="0" cy="250" rx="140" ry="16" fill="#000" opacity=".18"/>
<g id="legs"><rect x="-52" y="225" width="46" height="70" rx="20" fill="{PANTS}"/><rect x="6" y="225" width="46" height="70" rx="20" fill="{PANTS}"/>
<g id="shinL"><rect x="-50" y="270" width="40" height="110" rx="18" fill="{PANTS}"/><path d="M-56 372 h52 q6 0 6 10 v6 h-62 q-4 -16 4 -16z" fill="{INK}"/></g>
<g id="shinR"><rect x="10" y="270" width="40" height="110" rx="18" fill="{PANTS}"/><path d="M4 372 h52 q6 0 6 10 v6 h-62 q-4 -16 4 -16z" fill="{INK}"/></g></g>
<g id="body"><rect x="-66" y="60" width="132" height="190" rx="46" fill="{SHIRT}"/><path d="M-20 62 L0 92 L20 62" fill="none" stroke="#9F8AE8" stroke-width="6" stroke-linecap="round"/></g>
<g id="armL"><path d="M-58 90 Q-92 140 -80 186" fill="none" stroke="{SHIRT}" stroke-width="32" stroke-linecap="round"/>
<g id="foreL"><path d="M-80 186 Q-60 205 -26 196" fill="none" stroke="{SKIN}" stroke-width="24" stroke-linecap="round"/></g></g>
<g id="phone" transform="translate(0 176) rotate(-6)"><rect x="-38" y="-62" width="76" height="124" rx="12" fill="{INK}"/><rect x="-32" y="-54" width="64" height="108" rx="7" fill="#F4EEDC"/>
<rect x="-32" y="-54" width="64" height="22" rx="7" fill="#7C3AED"/><text x="0" y="-38" font-family="Bricolage" font-weight="800" font-size="13" text-anchor="middle" fill="#fff">NU</text>
<rect id="buy" x="-24" y="18" width="48" height="18" rx="9" fill="#E2B755"/><text id="buyT" x="0" y="31" font-family="Jakarta" font-weight="800" font-size="10" text-anchor="middle" fill="{INK}">Comprar</text>
<g id="chk" opacity="0"><circle cx="0" cy="-6" r="16" fill="#2E7D4F"/><path d="M-8 -6 l6 6 l11 -12" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>
<g id="ph17" opacity="0"><text x="0" y="0" font-family="Bricolage" font-weight="800" font-size="15" text-anchor="middle" fill="#D93A2F">−17 %</text></g></g>
<g id="armR"><path d="M58 90 Q92 140 80 186" fill="none" stroke="{SHIRT}" stroke-width="32" stroke-linecap="round"/>
<g id="foreR"><path d="M80 186 Q62 200 26 186" fill="none" stroke="{SKIN}" stroke-width="24" stroke-linecap="round"/><circle id="thumb" cx="22" cy="180" r="9" fill="{SKIN}"/></g></g>
<g id="head"><rect x="-16" y="36" width="32" height="34" rx="10" fill="{SKIN}"/><circle cx="-60" cy="2" r="13" fill="{SKIN}"/><circle cx="60" cy="2" r="13" fill="{SKIN}"/>
<circle cx="0" cy="0" r="62" fill="{SKIN}"/>
<path d="M-64 -2 Q-70 -78 0 -78 Q70 -78 64 -2 Q56 -44 8 -46 Q-30 -50 -64 -2Z" fill="{HAIR}"/>
<ellipse cx="-34" cy="22" rx="10" ry="6" fill="#E07A6A" opacity=".45"/><ellipse cx="34" cy="22" rx="10" ry="6" fill="#E07A6A" opacity=".45"/>
<g id="brows"><path d="M-32 -24 q10 -6 20 0" stroke="{HAIR}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M12 -24 q10 -6 20 0" stroke="{HAIR}" stroke-width="5" fill="none" stroke-linecap="round"/></g>
<g id="eyes"><ellipse class="eye" cx="-22" cy="-4" rx="6.5" ry="9" fill="{INK}"/><ellipse class="eye" cx="22" cy="-4" rx="6.5" ry="9" fill="{INK}"/>
<circle cx="-20" cy="-8" r="2.2" fill="#fff"/><circle cx="24" cy="-8" r="2.2" fill="#fff"/></g>
<path id="smile" d="M-18 24 Q0 40 18 24" fill="none" stroke="{INK}" stroke-width="5" stroke-linecap="round"/>
<path id="flat" d="M-12 30 L12 28" fill="none" stroke="{INK}" stroke-width="5" stroke-linecap="round" opacity="0"/>
<ellipse id="oh" cx="0" cy="30" rx="10" ry="13" fill="{INK}" opacity="0"/>
<path id="sweat" d="M66 -40 q10 16 0 22 q-10 -6 0 -22z" fill="#9FD3FF" opacity="0"/></g>
</g>'''

def paper(i, x, y, rot, src):
    return f'''<g id="np{i}" transform="translate({x} {y}) rotate({rot})"><g class="npi">
<rect x="-150" y="-190" width="300" height="380" rx="8" fill="#F4EEDC"/><rect x="-150" y="-190" width="300" height="380" rx="8" fill="none" stroke="#D8CFB8" stroke-width="3"/>
<text x="0" y="-140" font-family="Bricolage" font-weight="800" font-size="34" text-anchor="middle" fill="{INK}">{src}</text>
<rect x="-128" y="-122" width="256" height="4" fill="{INK}"/>
<text x="-128" y="-92" font-family="Jakarta" font-weight="800" font-size="16" fill="#7E5A0E">26 OCT 2026 · MERCADOS</text>
<rect x="-128" y="-74" width="256" height="18" rx="4" fill="#0B1B33" opacity=".85"/><rect x="-128" y="-48" width="190" height="18" rx="4" fill="#0B1B33" opacity=".85"/>
<rect x="-128" y="-14" width="120" height="90" rx="6" fill="#C4B5FD"/><path d="M-118 66 l30 -40 l22 26 l16 -18 l28 32z" fill="#7C3AED" opacity=".7"/>
{''.join(f'<rect x="4" y="{-12+k*16}" width="{124-(k%3)*18}" height="7" rx="3" fill="#0B1B33" opacity=".35"/>' for k in range(6))}
{''.join(f'<rect x="-128" y="{92+k*16}" width="{256-(k%2)*40}" height="7" rx="3" fill="#0B1B33" opacity=".35"/>' for k in range(5))}</g></g>'''

BR = [(48,2),(58,6),(66,12),(76,16),(88,22),(98,30),(96,38),(88,46),(84,56),(80,64),(72,72),(64,76),(58,84),(52,92),(46,98),(42,92),(46,84),(40,78),(34,72),(30,64),(24,60),(18,56),(10,52),(4,46),(2,38),(8,32),(14,28),(18,22),(26,20),(30,14),(36,10),(42,8)]
def brpath(ox, oy, s):
    pts = [(ox + x * s, oy + y * s) for x, y in BR]; n = len(pts); dd = f"M{(pts[0][0]+pts[1][0])/2:.1f} {(pts[0][1]+pts[1][1])/2:.1f}"
    for k in range(1, n + 1):
        p, q = pts[k % n], pts[(k + 1) % n]; dd += f" Q{p[0]:.1f} {p[1]:.1f} {(p[0]+q[0])/2:.1f} {(p[1]+q[1])/2:.1f}"
    return dd + "Z"
import math
ring = json.load(open(f"{SCR}/geo/ring.json")); K = math.cos(math.radians(15)); SC = 16.2
lon0, lat0 = min(p[0] for p in ring), max(p[1] for p in ring)
BX, BY = 225, 390
proj = lambda lo, la: (BX + (lo - lon0) * K * SC, BY + (lat0 - la) * SC)
bp = "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in (proj(*p) for p in ring)) + "Z"
PINX, PINY = proj(-47.9, -15.8)
mapg = f'''<defs><clipPath id="br"><path d="{bp}"/></clipPath>
<clipPath id="f0"><rect x="200" y="360" width="226" height="740"/></clipPath><clipPath id="f1"><rect x="426" y="360" width="226" height="740"/></clipPath><clipPath id="f2"><rect x="652" y="360" width="240" height="740"/></clipPath></defs>
{''.join(f'<g class="fold" id="fold{k}" clip-path="url(#f{k})"><path d="{bp}" fill="#2A4A8C"/><g clip-path="url(#br)">' + ''.join(f'<line x1="{200+j*60}" y1="360" x2="{200+j*60}" y2="1100" stroke="#F4EEDC" stroke-opacity=".08" stroke-width="2"/>' for j in range(12)) + ''.join(f'<line x1="200" y1="{360+j*60}" x2="900" y2="{360+j*60}" stroke="#F4EEDC" stroke-opacity=".08" stroke-width="2"/>' for j in range(13)) + '</g></g>' for k in range(3))}
<path id="brline" d="{bp}" fill="none" stroke="#E2B755" stroke-width="6" stroke-linejoin="round"/>
<g transform="translate({PINX:.0f} {PINY:.0f}) scale(1.5)"><g id="pin"><ellipse id="pinsh" cx="0" cy="8" rx="22" ry="7" fill="#000" opacity=".3"/><g id="pinb"><path d="M0 0 C-30 -40 -34 -60 -34 -76 A34 34 0 1 1 34 -76 C34 -60 30 -40 0 0Z" fill="#7C3AED"/><circle cx="0" cy="-76" r="13" fill="#F4EEDC"/></g></g></g>
<circle id="rip1" cx="{PINX:.0f}" cy="{PINY+8:.0f}" r="20" fill="none" stroke="#E2B755" stroke-width="4" opacity="0"/><circle id="rip2" cx="{PINX:.0f}" cy="{PINY+8:.0f}" r="20" fill="none" stroke="#E2B755" stroke-width="4" opacity="0"/>
<g id="urna2" transform="translate(540 1200) scale(1.25)"><rect x="-70" y="-60" width="140" height="118" rx="12" fill="#DCE7FF" opacity=".92"/><rect x="-76" y="-72" width="152" height="18" rx="6" fill="{INK}"/><rect x="-34" y="-68" width="68" height="7" fill="#050E1E"/>
<rect x="-56" y="-14" width="112" height="32" rx="8" fill="#E2B755"/><text x="0" y="9" font-family="Jakarta" font-weight="800" font-size="22" text-anchor="middle" fill="{INK}">ELECCIONES</text></g>
{''.join(f'<rect class="bal" x="{522}" y="1040" width="36" height="46" rx="4" fill="#F4EEDC"/>' for k in range(3))}
{person(10, 190, 1112, 4.2, "#E2B755")}{person(11, 330, 1112, 4.2, "#F4EEDC")}{person(12, 750, 1112, 4.2, "#FF8A80")}{person(13, 890, 1112, 4.2, "#C4B5FD")}'''

room = f'''<svg viewBox="0 0 1080 1920" width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#18305A"/><stop offset="1" stop-color="#10213F"/></linearGradient>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E2350"/><stop offset="1" stop-color="#2A4A8C"/></linearGradient>
<radialGradient id="lampg" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#F7DD9C" stop-opacity=".45"/><stop offset="1" stop-color="#F7DD9C" stop-opacity="0"/></radialGradient>
<clipPath id="win"><rect x="600" y="430" width="380" height="430" rx="6"/></clipPath></defs>
<rect width="1080" height="1340" fill="url(#wall)"/>
{''.join(f'<circle cx="{40+(k%14)*78}" cy="{60+(k//14)*80}" r="3" fill="#F4EEDC" opacity=".05"/>' for k in range(14*16))}
<rect y="1330" width="1080" height="590" fill="#0B1830"/>{''.join(f'<rect x="0" y="{1360+k*70}" width="1080" height="3" fill="#13284A"/>' for k in range(8))}
<ellipse cx="540" cy="1380" rx="420" ry="40" fill="#7C3AED" opacity=".22"/>
<g clip-path="url(#win)">{street}</g>
<rect x="600" y="430" width="380" height="430" rx="6" fill="none" stroke="#E2B755" stroke-width="14"/><rect x="783" y="430" width="14" height="430" fill="#E2B755"/><rect x="600" y="638" width="380" height="12" fill="#E2B755"/>
<rect x="585" y="860" width="410" height="22" rx="6" fill="#E2B755"/>
<g id="frame"><rect x="110" y="470" width="230" height="200" rx="8" fill="#F4EEDC"/><rect x="128" y="488" width="194" height="164" fill="#24407A"/>
<path d="M128 652 l60 -80 l40 50 l30 -36 l64 66z" fill="#C4B5FD"/><circle cx="290" cy="520" r="16" fill="#E2B755"/></g>
<g id="plant"><rect x="150" y="1180" width="90" height="110" rx="14" fill="#E2B755"/><g id="leaves"><path d="M195 1180 q-60 -90 -20 -170 q30 70 20 170z" fill="#2E7D4F"/><path d="M195 1180 q50 -100 20 -190 q-40 80 -20 190z" fill="#3E9C63"/><path d="M195 1180 q-90 -40 -110 -110 q70 20 110 110z" fill="#3E9C63"/></g></g>
<g id="lamp"><circle cx="905" cy="990" r="190" fill="url(#lampg)" id="lampglow"/><rect x="898" y="1000" width="12" height="330" fill="#E2B755"/><rect x="860" y="1320" width="90" height="14" rx="6" fill="#E2B755"/>
<g id="shade"><path d="M845 1000 L965 1000 L935 920 L875 920Z" fill="#F4EEDC"/></g></g>
<g id="couch"><rect x="210" y="1010" width="620" height="200" rx="40" fill="#2A3F66"/><rect x="180" y="1150" width="680" height="120" rx="34" fill="#34507F"/>
<rect x="160" y="1090" width="90" height="190" rx="40" fill="#2A3F66"/><rect x="790" y="1090" width="90" height="190" rx="40" fill="#2A3F66"/>
<rect x="210" y="1270" width="18" height="50" rx="6" fill="{INK}"/><rect x="812" y="1270" width="18" height="50" rx="6" fill="{INK}"/>
<rect x="640" y="1080" width="120" height="96" rx="26" fill="#E2B755" transform="rotate(-8 700 1128)"/></g>
{char()}
<g id="papers">{paper(0, 220, 520, -10, "Estadão")}{paper(1, 540, 470, 4, "The Motley Fool")}{paper(2, 860, 530, 12, "Zacks")}</g>
</svg>'''

phoneui = f'''<svg viewBox="0 0 1080 1920" width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
<rect width="1080" height="1920" fill="#F4EEDC"/>{''.join(f'<circle cx="{40+(k%14)*78}" cy="{60+(k//14)*80}" r="3" fill="#0B1B33" opacity=".06"/>' for k in range(14*24))}
<rect x="0" y="0" width="1080" height="350" fill="#7C3AED"/>
<g transform="translate(540 600)"><g id="ucard"><rect x="-470" y="-150" width="940" height="300" rx="34" fill="#fff"/><rect x="-470" y="-150" width="940" height="300" rx="34" fill="none" stroke="#E7E0CC" stroke-width="4"/>
<rect x="-430" y="-110" width="180" height="180" rx="36" fill="#7C3AED"/><text x="-340" y="22" font-family="Bricolage" font-weight="800" font-size="92" text-anchor="middle" fill="#fff">NU</text>
<text x="-210" y="-48" font-family="Jakarta" font-weight="800" font-size="30" fill="#7E5A0E" letter-spacing="3">ACCIÓN</text>
<text x="-210" y="12" font-family="Bricolage" font-weight="800" font-size="62" fill="{INK}">Nu Holdings</text>
<text x="-210" y="62" font-family="Jakarta" font-weight="700" font-size="34" fill="#5A6680">NYSE · NU</text>
<rect id="ring" x="-476" y="-156" width="952" height="312" rx="38" fill="none" stroke="#E2B755" stroke-width="10" opacity="0"/></g></g>
<g id="cal" transform="translate(290 1030)"><rect x="-200" y="-220" width="400" height="430" rx="30" fill="#fff" stroke="#E7E0CC" stroke-width="4"/>
<rect x="-200" y="-220" width="400" height="110" rx="30" fill="#D93A2F"/><rect x="-200" y="-140" width="400" height="30" fill="#D93A2F"/>
<text x="0" y="-145" font-family="Jakarta" font-weight="800" font-size="46" text-anchor="middle" fill="#fff" letter-spacing="4">OCT 2026</text>
<g id="page"><text id="day" x="0" y="120" font-family="Bricolage" font-weight="800" font-size="230" text-anchor="middle" fill="{INK}">26</text></g>
<circle cx="-120" cy="-226" r="14" fill="{INK}"/><circle cx="120" cy="-226" r="14" fill="{INK}"/></g>
<g id="elev" transform="translate(800 1020)"><rect x="-150" y="-250" width="300" height="500" rx="30" fill="#E9E1CC"/>
{''.join(f'<rect x="-150" y="{-250+k*100}" width="300" height="4" fill="#CFC5AA"/>' for k in range(1,5))}
<rect x="-6" y="-250" width="12" height="500" fill="#CFC5AA"/>
<g id="tag"><rect x="-110" y="-230" width="220" height="120" rx="22" fill="#7C3AED"/><text x="0" y="-150" font-family="Bricolage" font-weight="800" font-size="70" text-anchor="middle" fill="#fff">NU</text></g>
<g id="mlines" opacity="0">{''.join(f'<rect x="{-90+k*45}" y="-300" width="8" height="70" rx="4" fill="#7C3AED" opacity=".5"/>' for k in range(5))}</g>
<g id="arr" opacity="0"><path d="M-40 -330 h80 v90 h50 l-90 100 l-90 -100 h50z" fill="#D93A2F" transform="translate(0 0)"/></g></g>
<g id="pct" opacity="0" transform="translate(540 1130)"><rect x="-420" y="-100" width="840" height="190" rx="34" fill="{INK}"/>
<text x="0" y="40" font-family="Bricolage" font-weight="800" font-size="150" text-anchor="middle" fill="#FF8A80">≈ −17 %</text></g>
<rect x="0" y="1300" width="1080" height="620" fill="#0B1B33"/>
<g id="ses" opacity="0" transform="translate(540 1262)"><rect x="-200" y="-38" width="400" height="66" rx="33" fill="#E2B755"/><text x="0" y="8" font-family="Jakarta" font-weight="800" font-size="34" text-anchor="middle" fill="{INK}">en una sesión</text></g>
</svg>'''

mapsvg = f'''<svg viewBox="0 0 1080 1920" width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
<rect width="1080" height="1920" fill="#0F1F3D"/>{''.join(f'<circle cx="{40+(k%14)*78}" cy="{60+(k//14)*80}" r="3" fill="#F4EEDC" opacity=".06"/>' for k in range(14*24))}
<g id="mapc"><ellipse cx="540" cy="1250" rx="440" ry="40" fill="#000" opacity=".2"/>{mapg}</g></svg>'''

sys.path.insert(0, H); import flat_scenes as FS
def B(t, fs=58, c=""): return f'<div class="B {c}" style="display:inline-block;font-size:{fs}px;line-height:1.08;padding:10px 22px 14px;border-radius:18px;background:rgba(11,27,51,.86)">{t}</div>'
def TAG(t): return f'<div class="tag" style="position:relative;display:inline-block;font-size:24px">{t}</div>'
OV2SH = [("h1", B("La conexión importa", 62), T.get("por", 0), T.get("ocurre", 0) - 0.15),
         ("h2", B("Lo que pasa en el país afecta a la empresa", 54), T.get("ocurre", 0), T.get("entender", 0) - 0.3),
         ("h3", B("Para entender una caída, revisa tres cosas", 52), T.get("entender", 0), T.get("q1", 0) - 0.1),
         ("h4", B("1 · La noticia", 62), T.get("q1", 0), T.get("q2", 0) - 0.1),
         ("h5", B("2 · Su efecto en el negocio", 60), T.get("q2", 0), T.get("q3", 0) - 0.1),
         ("h6", B("3 · Los resultados de la empresa", 56), T.get("q3", 0), T.get("recuerda", 0) - 0.25),
         ("h7", B("Y recuerda…", 62), T.get("recuerda", 0), T.get("barata", 0) - 0.25)]
OV2 = OV2SH if SH else [] if not FULL else [
    ("h1", B("¿Por qué importa el país?", 62), T["por"], T["piensa"] - 0.1),
    ("h2", TAG("EJEMPLO HIPOTÉTICO") + B("Un banco que presta", 60).replace('style="', 'style="margin-top:10px;', 1), T["piensa"], T["tamb"] - 0.1),
    ("h3", B("También le afectan la economía y la moneda", 56), T["tamb"], T["noticia"] - 0.25),
    ("h4", B("Noticia política", 62), T["noticia"], T["invers"] - 0.1),
    ("h5", B("→ cambian las expectativas", 60), T["invers"], T["mover"] - 0.1),
    ("h6", B("→ se mueve el precio…", 60), T["mover"], T["conoz"] - 0.1),
    ("h7", B("…antes del efecto real", 60, "gold"), T["conoz"], T["poreso"] - 0.3),
    ("h8", B("Tres preguntas", 66), T["poreso"], T["q1"] - 0.1),
    ("h9", B("1 · ¿Qué pasó?", 62), T["q1"], T["q2"] - 0.1),
    ("h10", B("2 · ¿Cómo afecta a la empresa?", 58), T["q2"], T["q3"] - 0.1),
    ("h11", B("3 · ¿Qué muestran sus resultados?", 56), T["q3"], T["noconc"] - 0.25),
    ("h12", B("No podemos concluir…", 62), T["noconc"], T["nuforma"] - 0.4),
    ("h13", '<div style="display:inline-block;padding:12px 28px;border-radius:999px;background:#7C3AED;color:#fff;font-weight:800;font-size:34px;letter-spacing:.12em">TITÁN 3.0</div>', T["titan"] - 0.4, T["aqui"] - 0.1),
    ("h14", B("Entender nuestras inversiones", 58), T["aqui"], T["incom"] - 0.6),
    ("h15", B("…también con noticias incómodas", 58, "gold"), T["incom"] - 0.5, T["cta"] - 0.2)]
HUD = ["Caída", "Brasil", "Conexión", "3 cosas"] if SH else ["Caída", "Brasil", "Banco", "Moneda", "Expectativas", "3 preguntas"]
hud = "".join(f'<span id="hs{k}" class="hs">{h}</span>' for k, h in enumerate(HUD))
n = [0]
def C(i, inner, style, extra=""):
    n[0] += 1; return f'<div id="{i}" class="clip" data-start="0" data-duration="{DUR}" data-track-index="{n[0]}" style="position:absolute;{style}" {extra}>{inner}</div>'
logo = '<div class="lg" data-layout-allow-overflow><img src="assets/brand/logo.jpg" alt="TITÁN Holding" /></div>'
body = [C("s1", f'<div id="cam1" style="position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:0 0">{room}</div>', "left:0;top:0;width:1080px;height:1920px;overflow:hidden"),
        C("s3", f'<div id="cam3" style="position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:0 0">{phoneui}</div>', "left:0;top:0;width:1080px;height:1920px;overflow:hidden;opacity:0"),
        C("s4", f'<div id="cam4" style="position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:0 0">{mapsvg}</div>', "left:0;top:0;width:1080px;height:1920px;overflow:hidden;opacity:0"),
        *([] if not FULL else [C(f"s{k}", f'<div id="cam{k}" style="position:absolute;left:0;top:0;width:{w}px;height:1920px;transform-origin:0 0">{svg}</div>', f"left:0;top:0;width:1080px;height:1920px;overflow:hidden;opacity:0")
              for k, w, svg in [(5, 2100, FS.scene_street()), (6, 1080, FS.scene_fx()), (7, 2200, FS.scene_news()), (8, 1080, FS.scene_desk()), (9, 1080, FS.scene_cross("CAYÓ ≈ 17 %", "¿ENTONCES ESTÁ BARATA?") if SH else FS.scene_cross()), (10, 1080, FS.scene_titan())]]
            + [C("wipe", "", "left:0;top:0;width:120px;height:120px;border-radius:50%;background:#E2B755;opacity:0;transform-origin:50% 50%")]),
        C("shade", "", "left:0;top:1290px;width:1080px;height:630px;background:linear-gradient(180deg,rgba(11,27,51,0),rgba(11,27,51,.82) 30%)"),
        C("topshade", "", "left:0;top:0;width:1080px;height:380px;background:linear-gradient(180deg,rgba(11,27,51,.75),rgba(11,27,51,0))"),
        C("brand", logo + "<span>TITÁN HOLDING</span>", "left:50px;top:180px"),
        C("hud", hud, "left:70px;top:290px;width:960px;white-space:nowrap"),
        C("lbBR", '<div class="pill" style="position:relative;display:inline-block;padding:14px 30px;font-size:46px;background:var(--gold);color:var(--navy)">BRASIL</div>', f"left:{PINX-110:.0f}px;top:{PINY-210:.0f}px;opacity:0"),
        C("hyp", '<div style="font-family:Jakarta;font-weight:800;font-size:26px;letter-spacing:.08em;color:rgba(244,238,220,.75)">Fuentes: Estadão · The Motley Fool · Zacks</div>', "left:70px;top:1316px;opacity:0"),
        *([] if not FULL else [C(i, h, "left:70px;top:346px;width:940px;opacity:0") for i, h, _, _ in OV2]
            + [C("dock", '<div class="pill" style="position:relative;display:inline-block;padding:12px 26px;font-size:30px;background:rgba(11,27,51,.88);color:#FF8A80;border:2px solid rgba(255,138,128,.7)">NU&nbsp;&nbsp;≈ −17 %&nbsp;&nbsp;·&nbsp;&nbsp;26 OCT 2026</div>', "left:70px;top:1296px;opacity:0"),
               *([C("stampB", '<div class="B" style="display:inline-block;font-size:76px;padding:8px 30px 14px;border:6px solid #FF8A80;color:#FF8A80;border-radius:20px;transform:rotate(-5deg);background:rgba(11,27,51,.9)">Caída ≠ barata</div>', "left:120px;top:440px;opacity:0")] if SH else []),
               C("cta", '<div class="B" style="font-size:84px;line-height:1.08;text-transform:uppercase;width:940px">' + ("¿Conocías este riesgo al invertir?" if SH else "¿Qué empresa te gustaría entender mejor?") + '</div><div style="margin-top:28px"><div class="btn" style="position:relative;display:inline-block;padding:20px 50px;font-size:38px">Comenta tu respuesta</div></div><div style="margin-top:22px;font-weight:700;font-size:30px;color:rgba(244,238,220,.88)">Contenido educativo. No es una recomendación de inversión.</div>', "left:70px;top:346px;width:940px;opacity:0")]),
        C("caps", ta.caps_html(G, 66), "left:70px;top:1380px;width:940px;height:220px")]
CSS = open(f"{H}/tq.css").read() + ".hs{display:inline-block;padding:7px 14px;margin-right:8px;border-radius:999px;font-family:Jakarta;font-weight:800;font-size:22px;color:rgba(244,238,220,.6);border:2px solid rgba(244,238,220,.28);background:rgba(11,27,51,.6)}.hs.on{background:var(--gold);color:#0B1B33;border-color:var(--gold)}.hs.done{color:var(--gold);border-color:rgba(226,183,85,.55)}.hs.done::before{content:'✓ '}"
CG = [[a_, b, [[w[1], w[2]] for w in g]] for a_, b, g in G]
JS = open(f"{H}/flat_nu.js").read()
if FULL:
    mk = "  tl.to({}, { duration: 0.01 }, DUR - 0.01);"; assert mk in JS
    p2 = open(f"{H}/flat_nu2.js").read()
    if SH: p2 = p2[:p2.index("  // ---------- 17.2")] + open(f"{H}/flat_sh2_tail.js").read()
    JS = JS.replace(mk, p2 + mk)
html = f'''<!doctype html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=1080, height=1920" />
<title>TITÁN · NU · muestra ilustrada</title><script src="assets/vendor/gsap.min.js"></script>
<style>{CSS}
html, body, #root {{ width:1080px; height:1920px; background:#0B1B33; }}</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{DUR}" data-width="1080" data-height="1920">
{chr(10).join(body)}
<audio id="vo" src="assets/audio/mix.wav" data-start="0" data-duration="{DUR}" data-track-index="90" data-volume="1"></audio>
</div>
<script>
window.DUR = {DUR}; window.T = {json.dumps(T)}; window.CG = {json.dumps(CG)}; window.PIN = [{PINX:.1f}, {PINY:.1f}]; window.OV2 = {json.dumps([[i, a_, b] for i, _, a_, b in OV2] if FULL else [])};
{JS}
</script></body></html>'''
open(P + "/index.html", "w").write(html)
print("ok", DUR, T)
