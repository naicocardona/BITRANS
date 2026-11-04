# TITÁN · «Ganaron los demócratas. Wall Street subió. ¿Por qué?» · TikTok (tk) y Short (sh), estilo ilustrado con personas
import os, sys, json, shutil, importlib.util as U
MODE = "sh" if "sh" in sys.argv[1:] else "tk"
H = os.path.dirname(os.path.abspath(__file__)); SCR = os.path.join(H, ".."); sys.path.insert(0, H); sys.path.insert(0, f"{SCR}/dem")
sp = U.spec_from_file_location("ta", f"{H}/tq_anchors.py"); ta = U.module_from_spec(sp); sp.loader.exec_module(ta)
import dem_scenes as D
from script import TK, SH
NAME = "tiktok" if MODE == "tk" else "shorts"
d = json.load(open(f"{SCR}/dem/voz/{NAME}.words.json")); Wd = d["display"]
DUR = round(d["dur"] + 1.0, 2)
# inicio de cada frase (por conteo de palabras del guion)
L, i = {}, 0
for k, _, c in (TK if MODE == "tk" else SH):
    L[k] = round(Wd[i][1], 3); i += len(c.replace("…", ",").split())
a = ta.Anchors(Wd); A = lambda ph: a(ph, True)
if MODE == "tk":
    T = dict(repunte=A("repunte"), sorpresa=A("sorpresa:"), caido=A("caído."), reparto=A("reparto"), rep=A("republicano"), dem=A("Congreso demócrata,"),
             negoc=A("más negociación."), sorpr=A("ciertas sorpresas"), conflic=A("los conflictos"), garant=A("ni garantiza"),
             imp=A("impuestos,"), reg=A("reglas"), cli=A("clientes,"), persp=A("perspectivas."), verde=A("gráfica verde,"))
else:
    T = dict(cuidado=A("cuidado"), repar=A("el reparto"), dividido=A("dividido"), valorar=A("valorar"), demuestra=A("no demuestra"),
             imp=A("impuestos,"), reg=A("reglas"), cli=A("clientes?"), result=A("Los resultados"))
T.update(L); T["DUR"] = DUR
G = [g for g in ta.groups(Wd, 3) if g[0] < DUR - 0.2]
P = f"{SCR}/dem-{MODE}"; os.makedirs(f"{P}/assets/audio", exist_ok=True)
for sub in ["vendor", "fonts", "brand"]: shutil.copytree(f"{SCR}/tq-3d/assets/{sub}", f"{P}/assets/{sub}", dirs_exist_ok=True)
shutil.copy(f"{SCR}/tq-3d/hyperframes.json", P)
json.dump({"name": os.path.basename(P), "private": True, "type": "module"}, open(P + "/package.json", "w")); json.dump({"id": os.path.basename(P), "name": os.path.basename(P)}, open(P + "/meta.json", "w"))
mix = f"{SCR}/dem/voz/{NAME}_mix.wav"
if os.path.exists(mix): shutil.copy(mix, f"{P}/assets/audio/mix.wav")

def B(t, fs=58, c=""): return f'<div class="B {c}" style="display:inline-block;font-size:{fs}px;line-height:1.08;padding:10px 22px 14px;border-radius:18px;background:rgba(11,27,51,.86)">{t}</div>'
def SUB(t): return f'<div style="margin-top:12px"><div class="pill" style="position:relative;display:inline-block;padding:10px 24px;font-size:30px;background:var(--gold);color:var(--navy)">{t}</div></div>'
STAMP = lambda t: f'<div class="B" style="display:inline-block;font-size:70px;padding:8px 30px 14px;border:6px solid #FF8A80;color:#FF8A80;border-radius:20px;transform:rotate(-4deg);background:rgba(11,27,51,.92)">{t}</div>'
if MODE == "tk":
    SC = ["hook", "wall", "split", "power", "interp", "biz", "chart", "end"]
    OV = [("h1", B("GANARON LOS DEMÓCRATAS…", 72) + "<br>" + B("…y Wall Street subió", 54, "gold").replace('style="', 'style="margin-top:10px;', 1), 0, L["t2"] - 0.1),
          ("h2", B("¿Y WALL STREET?", 78) + SUB("04 NOV 2026"), L["t2"], L["t3"] - 0.1),
          ("h3", B("Repunte tras las elecciones legislativas", 56) + SUB("04 NOV 2026"), L["t3"], L["t4"] - 0.1),
          ("h4", B("Reacción inicial ≠ sesión del día", 58), L["t4"], L["t5"] - 0.1),
          ("h5", B("¿Qué mira el dinero?", 66, "gold"), L["t5"], L["t6"] - 0.1),
          ("h6", B("El reparto de poder", 62), L["t6"], L["t7"] - 0.1),
          ("h7", B("Gobierno dividido → más negociación", 56), L["t7"], L["t8"] - 0.1),
          ("h8", B("Menos sorpresas, para algunos", 58), L["t8"], L["t9"] - 0.1),
          ("h9", B("No es una garantía", 62), L["t9"], L["t10"] - 0.1),
          ("h10", B("Impuestos · Reglas · Clientes", 58), L["t10"], L["t11"] - 0.1),
          ("h11", B("Cada negocio reacciona distinto", 58), L["t11"], L["t12"] - 0.1),
          ("h12", B("Noticia política + gráfica verde…", 56), L["t12"], L["t13"] - 0.1),
          ("h13", B("¿Qué cambió para la empresa?", 60, "gold"), L["t13"], L["t14"] - 0.1),
          ("h14", STAMP("UN DÍA ≠ UNA GARANTÍA"), L["t14"], L["t15"] - 0.1),
          ("h15", B("Seguir la noticia… y sus consecuencias", 54), L["t15"], L["t16"] - 0.15)]
    TAGS = [("tagI", "INTERPRETACIÓN", L["t6"], L["t10"] - 0.1)]
    HUD = ["Resultado", "Mercado", "Poder", "Interpretación", "Empresas", "Tu pregunta"]
    CTA = ("¿Qué mirarías primero?", "¿Quién ganó o qué cambia para las empresas?", "Comenta tu respuesta")
    SRC = (0, L["t4"] - 0.1)
else:
    SC = ["wall", "power", "chart", "biz", "end"]
    OV = [("h1", B("GANARON LOS DEMÓCRATAS", 72) + "<br>" + B("…y Wall Street subió", 54, "gold").replace('style="', 'style="margin-top:10px;', 1) + SUB("EE. UU. · 4 NOV 2026"), 0, L["s2"] - 0.1),
          ("h2", B("Cuidado con la conclusión", 64, "gold"), L["s2"], L["s3"] - 0.1),
          ("h3", B("CONGRESO ≠ PRESIDENCIA", 72), L["s3"], L["s4"] - 0.1),
          ("h4", B("Gobierno dividido → negociar más", 56), L["s4"], L["s5"] - 0.1),
          ("h5", B("Algunos inversores lo valoran", 58), L["s5"], L["s6"] - 0.1),
          ("h6", STAMP("REACCIÓN ≠ GARANTÍA"), L["s6"], L["s7"] - 0.1),
          ("h7", B("No todas las empresas ganan", 60), L["s7"], L["s8"] - 0.1),
          ("h8", B("Conecta la noticia con el negocio", 56), L["s8"], L["s9"] - 0.1),
          ("h9", B("3 preguntas para la empresa", 60, "gold"), L["s9"], L["s10"] - 0.1),
          ("h10", B("La política mueve expectativas", 58), L["s10"], T["result"] - 0.1),
          ("h11", B("Los resultados las comprueban", 58, "gold"), T["result"], L["s11"] - 0.15)]
    TAGS = [("tagI", "POSIBLE EXPLICACIÓN", L["s4"], L["s6"] - 0.1)]
    HUD = ["Resultado", "Poder", "Lectura", "Empresas", "Conclusión"]
    CTA = ("¿Qué empresa revisamos después?", "", "Déjala en comentarios")
    SRC = (0, L["s3"] - 0.1)
hud = "".join(f'<span id="hs{k}" class="hs">{h}</span>' for k, h in enumerate(HUD))
n = [0]
def C(i, inner, style, extra=""):
    n[0] += 1; return f'<div id="{i}" class="clip" data-start="0" data-duration="{DUR}" data-track-index="{n[0]}" style="position:absolute;{style}" {extra}>{inner}</div>'
logo = '<div class="lg" data-layout-allow-overflow><img src="assets/brand/logo.jpg" alt="TITÁN Holding" /></div>'
FN = {"hook": D.scene_hook, "wall": D.scene_wall, "split": D.scene_split, "power": D.scene_power, "interp": D.scene_interp,
      "biz": (lambda: D.scene_biz(MODE == "sh")), "chart": D.scene_chart, "end": D.scene_end}
body = [C(f"s{k}", f'<div id="cam{k}" style="position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:0 0">{FN[nm]()}</div>',
          f"left:0;top:0;width:1080px;height:1920px;overflow:hidden;opacity:{1 if k == 0 else 0}") for k, nm in enumerate(SC)]
body += [C("wipe", "", "left:0;top:0;width:120px;height:120px;border-radius:50%;background:#E2B755;opacity:0;transform-origin:50% 50%"),
         C("shade", "", "left:0;top:1340px;width:1080px;height:580px;background:linear-gradient(180deg,rgba(11,27,51,0),rgba(11,27,51,.85) 26%)"),
         C("topshade", "", "left:0;top:0;width:1080px;height:420px;background:linear-gradient(180deg,rgba(11,27,51,.8),rgba(11,27,51,0))"),
         C("brand", logo + "<span>TITÁN HOLDING</span>", "left:50px;top:180px"),
         C("hud", hud, "left:70px;top:290px;width:960px;white-space:nowrap"),
         C("src", '<div style="font-family:Jakarta;font-weight:800;font-size:26px;letter-spacing:.06em;color:rgba(244,238,220,.82);background:rgba(11,27,51,.6);padding:6px 14px;border-radius:10px">Fuentes: ABC News · AP · Reuters</div>', "left:70px;top:1316px")]
body += [C(i, f'<div class="tag" style="position:relative;display:inline-block;font-size:26px">{t}</div>', "left:70px;top:346px;opacity:0") for i, t, _, _ in TAGS]
body += [C(i, h, f"left:70px;top:{404 if any(t0 <= a_ < t1 for _, _, t0, t1 in TAGS) else 346}px;width:940px;opacity:{1 if a_ == 0 else 0}") for i, h, a_, _ in OV]
body += [C("cta", f'<div class="B" style="font-size:84px;line-height:1.08;text-transform:uppercase;width:940px">{CTA[0]}</div>' + (f'<div style="margin-top:18px;font-family:Jakarta;font-weight:800;font-size:40px;color:#E2B755">{CTA[1]}</div>' if CTA[1] else "") +
           f'<div style="margin-top:26px"><div class="btn" id="ctaBtn" style="position:relative;display:inline-block;padding:20px 50px;font-size:38px">{CTA[2]}</div></div><div style="margin-top:22px;font-weight:700;font-size:30px;color:rgba(244,238,220,.9)">Contenido educativo. No es una recomendación de inversión.</div>', "left:70px;top:346px;width:940px;opacity:0"),
         C("caps", ta.caps_html(G, 66), "left:70px;top:1390px;width:940px;height:220px")]
CSS = open(f"{H}/tq.css").read() + ".hs{display:inline-block;padding:7px 14px;margin-right:8px;border-radius:999px;font-family:Jakarta;font-weight:800;font-size:22px;color:rgba(244,238,220,.6);border:2px solid rgba(244,238,220,.28);background:rgba(11,27,51,.6)}.hs.on{background:var(--gold);color:#0B1B33;border-color:var(--gold)}.hs.done{color:var(--gold);border-color:rgba(226,183,85,.55)}.hs.done::before{content:'✓ '}"
CG = [[a_, b, [[w[1], w[2]] for w in g]] for a_, b, g in G]
JS = open(f"{H}/dem.js").read()
html = f'''<!doctype html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=1080, height=1920" />
<title>TITÁN · Demócratas y Wall Street</title><script src="assets/vendor/gsap.min.js"></script>
<style>{CSS}
html, body, #root {{ width:1080px; height:1920px; background:#0B1B33; }}</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{DUR}" data-width="1080" data-height="1920">
{chr(10).join(body)}
<audio id="vo" src="assets/audio/mix.wav" data-start="0" data-duration="{DUR}" data-track-index="90" data-volume="1"></audio>
</div>
<script>
window.MODE = "{MODE}"; window.DUR = {DUR}; window.T = {json.dumps(T)}; window.CG = {json.dumps(CG)}; window.SC = {json.dumps(SC)};
window.OV = {json.dumps([[i, a_, b] for i, _, a_, b in OV])}; window.TAGS = {json.dumps([[i, a_, b] for i, _, a_, b in TAGS])}; window.SRC = {json.dumps(SRC)};
{JS}
</script></body></html>'''
open(P + "/index.html", "w").write(html)
json.dump({"DUR": DUR, "T": T}, open(f"{SCR}/dem/{MODE}_times.json", "w"))
print("ok", MODE, DUR, {k: v for k, v in T.items()})
