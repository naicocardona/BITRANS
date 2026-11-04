# TITÁN · NU · video largo de YouTube (5:25) en estilo ilustrado · 1920×1080
# Izquierda: capítulos, titulares y subtítulos · Derecha: escenario ilustrado (1060×1080)
import os, sys, json, math, shutil, subprocess, importlib.util as U
H = os.path.dirname(os.path.abspath(__file__)); SCR = os.path.join(H, "..")
sp = U.spec_from_file_location("ta", f"{H}/tq_anchors.py"); ta = U.module_from_spec(sp); sp.loader.exec_module(ta)
d = json.load(open(f"{SCR}/nu/voz/t/largo.words.json")); Wd = d["display"]
DUR = 324.84
# ---- tiempos exactos de la voz (inicio de cada frase) ----
T = dict(conoces=0.2, decides=4.3, depronto=9.9, fuerza=14.53, razon=15.4, elecc=18.4, video=19.7, hechos=25.0, d26=26.5, cayo=33.67, p17=34.54,
         anuncio=36.9, cobert=41.9, brasil=50.52, nosolo=51.3, otros=53.0, ojo=57.0, fecha=58.2, aclar=62.9, nubank=65.6, holdings=68.9, cuenta=75.5,
         comprar=79.1, subebaja=83.4, e140=86.2, fool1=94.4, ejemplo=100.3, bancopeq=104.0, gana=107.7, complica=114.6, monedal=119.1, invent=125.6,
         gana100=127.9, nocambio=137.2, vias=140.6, moneda3=146.7, fool2=152.3, mecan=160.8, nosignif=163.4, clave=169.7, precioesp=171.5,
         noticiac=176.5, efector=181.0, reaccant=188.2, dos=194.8, mirar=198.8, barata=201.0, nonec=207.2, exag=208.8, solomir=214.7, doscasos=218.6,
         caen=220.9, primera=223.5, segunda=230.3, mismo=236.5, contrario=239.8, destru=241.7, pregunta=245.7, quehacer=249.6, lista=253.7,
         uno=255.6, dos2=259.7, nuej=264.0, tres=271.0, cuatro=279.6, riesgos=282.5, cuales=285.3, nodice=289.0, entiende=292.2, titan=294.8,
         incom=297.8, entorno=303.4, cta=308.2, comenta=313.8, disc=316.4)
G = ta.groups(Wd, 4)
P = f"{SCR}/flat-nu-lg"; os.makedirs(f"{P}/assets/audio", exist_ok=True)
for sub in ["vendor", "fonts", "brand"]: shutil.copytree(f"{SCR}/tq-3d/assets/{sub}", f"{P}/assets/{sub}", dirs_exist_ok=True)
shutil.copy(f"{SCR}/tq-3d/hyperframes.json", P)
json.dump({"name": "flat-nu-lg", "private": True, "type": "module"}, open(P + "/package.json", "w")); json.dump({"id": "flat-nu-lg", "name": "flat-nu-lg"}, open(P + "/meta.json", "w"))
shutil.copy(f"{SCR}/nu-largo/assets/audio/mix.wav", f"{P}/assets/audio/mix.wav")
# ---- reutiliza los generadores de escenas del TikTok (sala, celular, mapa de Brasil) ----
src = open(f"{H}/build_flat_nu.py").read()
seg = src[src.index('SKIN, HAIR, SHIRT, PANTS, INK'):src.index('sys.path.insert(0, H); import flat_scenes as FS')]
NS = {"SCR": SCR, "json": json, "math": math}; exec(seg, NS)
sys.path.insert(0, H); import flat_scenes as FS, flat_scenes_lg as FL
GEO = f"{SCR}/geo"
SCN = [("s1", 1080, NS["room"]), ("s3", 1080, NS["phoneui"]), ("s4", 1080, NS["mapsvg"]), ("sN", 1060, FL.scene_nuvs()), ("sM", 1060, FL.scene_latam(GEO)),
       ("s5", 2100, FS.scene_street()), ("s6", 1080, FS.scene_fx()), ("sV", 1060, FL.scene_vias()), ("s7", 2200, FS.scene_news()),
       ("sAB", 1060, FL.scene_ab()), ("s8", 1080, FS.scene_desk()), ("s10", 1080, FS.scene_titan())]
def B(t, fs=58, c=""): return f'<div class="B {c}" style="font-size:{fs}px;line-height:1.08">{t}</div>'
def TAG(t): return f'<div class="tag" style="position:relative;display:inline-block;font-size:22px;margin-bottom:12px">{t}</div>'
def PL(t, bg="var(--ivory)", fg="var(--navy)", fs=30): return f'<div class="pill" style="position:relative;display:inline-block;padding:12px 22px;font-size:{fs}px;background:{bg};color:{fg};margin-top:14px">{t}</div>'
OV = [
 ("o1", B("Conoces Nubank<br/><span class='gold'>por su app</span>", 64), T["conoces"], T["depronto"] - 0.2),
 ("o2", B("La acción<br/>cae con fuerza", 66) + PL("Sin anuncio nuevo de la empresa", "rgba(179,38,30,.9)", "var(--ivory)"), T["depronto"], T["razon"] - 0.2),
 ("o3", B("¿La razón?", 70) + "<br/>" + B("Unas elecciones", 66, "gold"), T["razon"], T["video"] - 0.2),
 ("o4", B("Sin fórmulas<br/>y sin política", 64), T["video"], T["hechos"] - 0.2),
 ("o5", TAG("26 OCT 2026 · UNA SESIÓN") + B("NU<br/><span style='color:#FF8A80'>≈ −17 %</span>", 92), T["d26"], T["anuncio"] - 0.2),
 ("o6", B("Sin anuncio<br/>de la empresa", 62) + PL("Fuentes: Estadão · The Motley Fool · Zacks", "var(--ivory)", "var(--navy)", 24), T["anuncio"], T["cobert"] - 0.2),
 ("o7", B("Reacción del mercado<br/>a las elecciones<br/><span class='gold'>de Brasil</span>", 54), T["cobert"], T["nosolo"] - 0.2),
 ("o8", B("No fue solo NU", 62) + PL("Otros activos ligados a Brasil también cayeron"), T["nosolo"], T["ojo"] - 0.2),
 ("o9", TAG("OJO CON LA FECHA") + B("Episodio del<br/><span class='gold'>26 OCT 2026</span>", 62) + PL("No es el precio actual", "var(--gold)"), T["ojo"], T["aclar"] - 0.2),
 ("o10", B("Nubank", 70) + "<div style='font-weight:700;font-size:30px;color:rgba(244,238,220,.8);margin-top:6px'>el banco digital que la gente usa</div>", T["nubank"], T["holdings"] - 0.1),
 ("o11", B("Nu Holdings", 70) + "<div style='font-weight:700;font-size:30px;color:rgba(244,238,220,.8);margin-top:6px'>la empresa · su acción cotiza en bolsa</div>", T["holdings"], T["cuenta"] - 0.1),
 ("o12", B("Tener una cuenta<br/><span class='gold'>≠ ser accionista</span>", 58), T["cuenta"], T["comprar"] - 0.1),
 ("o13", B("Una acción<br/>sube y baja", 64) + PL("No es guardar dinero en una cuenta"), T["comprar"], T["e140"] - 0.2),
 ("o14", B("+140 millones", 80, "gold") + "<div style='font-weight:800;font-size:30px;margin-top:10px'>de personas en Brasil, México y Colombia</div><div style='font-weight:700;font-size:22px;margin-top:8px;color:rgba(244,238,220,.7)'>Fuente: Nu · nu.com/en/investors</div>", T["e140"], T["fool1"] - 0.1),
 ("o15", B("La mayor parte<br/>de sus ingresos:<br/><span class='gold'>Brasil</span>", 58) + "<div style='font-weight:700;font-size:22px;margin-top:10px;color:rgba(244,238,220,.7)'>Fuente: The Motley Fool</div>", T["fool1"], T["ejemplo"] - 0.2),
 ("o16", TAG("EJEMPLO HIPOTÉTICO") + B("Un banco pequeño<br/>que presta dinero", 58), T["ejemplo"], T["gana"] - 0.1),
 ("o17", B("Gana si sus clientes<br/><span class='gold'>trabajan y pagan</span>", 56), T["gana"], T["complica"] - 0.1),
 ("o18", B("Si la economía<br/>se complica…", 58) + PL("Algunos clientes podrían atrasarse", "rgba(179,38,30,.9)", "var(--ivory)"), T["complica"], T["monedal"] - 0.2),
 ("o19", B("Si la moneda local<br/>pierde valor…", 58), T["monedal"], T["invent"] - 0.1),
 ("o20", TAG("NÚMEROS INVENTADOS") + B("100 en moneda local<br/><span class='gold'>→ menos dólares</span>", 56), T["invent"], T["nocambio"] - 0.1),
 ("o21", B("El negocio no cambió.<br/><span class='gold'>Su valor en dólares, sí.</span>", 52), T["nocambio"], T["vias"] - 0.2),
 ("o22", B("Tres vías<br/>para observar", 64), T["vias"], T["fool2"] - 0.1),
 ("o23", B("Real más débil<br/>frente al dólar", 60) + "<div style='font-weight:700;font-size:22px;margin-top:10px;color:rgba(244,238,220,.7)'>Tras las elecciones · The Motley Fool</div>", T["fool2"], T["mecan"] - 0.1),
 ("o24", B("Mecanismos,<br/><span class='gold'>no conclusiones</span>", 60) + PL("No explican por sí solos toda la caída"), T["mecan"], T["clave"] - 0.2),
 ("o25", TAG("LA IDEA CLAVE") + B("El precio se mueve<br/>con lo que se <span class='gold'>espera</span>", 54), T["clave"], T["noticiac"] - 0.1),
 ("o26", B("Una noticia cambia<br/>expectativas <span class='gold'>en horas</span>", 54), T["noticiac"], T["efector"] - 0.1),
 ("o27", B("El efecto real llega<br/><span class='gold'>trimestres después</span>", 54), T["efector"], T["dos"] - 0.1),
 ("o28", B("Expectativas<br/>y resultados:<br/><span class='gold'>mira las dos</span>", 58), T["dos"], T["barata"] - 0.2),
 ("o29", B("¿Cayó ≈ 17 %…<br/><span class='gold'>entonces está barata?</span>", 54), T["barata"], T["nonec"] - 0.1),
 ("o30", B("No necesariamente", 62) + PL("¿El mercado exageró o el riesgo aumentó?"), T["nonec"], T["doscasos"] - 0.2),
 ("o31", TAG("CASOS HIPOTÉTICOS") + B("El mismo porcentaje,<br/><span class='gold'>dos historias</span>", 54), T["doscasos"], T["contrario"] - 0.2),
 ("o32", B("Tampoco prueba<br/>que esté destruida", 58), T["contrario"], T["pregunta"] - 0.1),
 ("o33", B("La caída es<br/><span class='gold'>una pregunta,</span><br/>no una respuesta", 62), T["pregunta"], T["quehacer"] - 0.2),
 ("o34", TAG("ANTES DE DECIDIR") + B("Una lista sencilla", 60), T["quehacer"], T["uno"] - 0.1),
 ("o35", B("1 · Lee la noticia<br/>original", 58) + PL("No solo el titular"), T["uno"], T["dos2"] - 0.1),
 ("o36", B("2 · ¿Cuánto depende<br/>de ese país?", 56) + PL("Brasil · México · Colombia", "var(--gold)"), T["dos2"], T["tres"] - 0.1),
 ("o37", B("3 · Resultados<br/>oficiales", 58) + PL("Página para inversionistas · y espera los próximos"), T["tres"], T["cuatro"] - 0.1),
 ("o38", B("4 · Identifica<br/>los riesgos", 58) + "<div style='margin-top:14px'>" + "".join(PL(x, "var(--gold)" if k % 2 == 0 else "var(--ivory)", "var(--navy)", 26) + " " for k, x in enumerate(["Moneda", "Economía", "Morosidad", "Reglas del sector"])) + "</div>", T["cuatro"], T["nodice"] - 0.1),
 ("o39", B("No te dice<br/>si comprar o vender", 56) + PL("Te ayuda a entender lo que tienes", "var(--gold)"), T["nodice"], T["titan"] - 0.2),
 ("o40", '<div style="display:inline-block;padding:12px 28px;border-radius:999px;background:#7C3AED;color:#fff;font-weight:800;font-size:32px;letter-spacing:.12em">TITÁN 3.0</div>' + B("Entender también<br/>las noticias incómodas", 54).replace('style="', 'style="margin-top:18px;', 1), T["titan"], T["entorno"] - 0.1),
 ("o41", B("Invertir en una empresa<br/>es también invertir<br/><span class='gold'>en su entorno</span>", 52), T["entorno"], T["cta"] - 0.2),
 ("o42", B("¿Qué empresa conoces por su producto…", 50) + B("…y te gustaría entender como inversión?", 50, "gold").replace('style="', 'style="margin-top:8px;', 1) + "<div style='margin-top:22px'><div class='btn' style='position:relative;display:inline-block;padding:16px 40px;font-size:30px'>Cuéntanos en los comentarios</div></div>", T["cta"], None),
]
CH = [("EL EPISODIO", T["hechos"]), ("¿QUÉ ES NU?", T["aclar"]), ("EJEMPLO HIPOTÉTICO", T["ejemplo"]), ("EXPECTATIVAS Y RESULTADOS", T["clave"]),
      ("¿CAÍDA = OPORTUNIDAD?", T["barata"]), ("CÓMO INVESTIGAR", T["quehacer"]), ("CIERRE", T["titan"])]
n = [0]
def C(i, inner, style):
    n[0] += 1; return f'<div id="{i}" class="clip" data-start="0" data-duration="{DUR}" data-track-index="{n[0]}" style="position:absolute;{style}">{inner}</div>'
logo = '<div class="lg" data-layout-allow-overflow><img src="assets/brand/logo.jpg" alt="TITÁN Holding" /></div>'
stage = "".join(f'<div id="{i}" class="scn" style="position:absolute;left:0;top:0;width:1060px;height:1080px;overflow:hidden;opacity:0"><div id="cam_{i}" style="position:absolute;left:0;top:0;width:{w}px;height:1920px;transform-origin:0 0">{svg}</div></div>' for i, w, svg in SCN)
stage += '<div id="wipe" style="position:absolute;left:0;top:0;width:120px;height:120px;border-radius:50%;background:#E2B755;opacity:0"></div>'
chips = "".join(f'<span id="cp{k}" class="chp">{t}</span>' for k, (t, _) in enumerate(CH))
body = [C("stage", stage, "left:860px;top:0;width:1060px;height:1080px;overflow:hidden"),
        C("panel", "", "left:0;top:0;width:860px;height:1080px;background:linear-gradient(90deg,#0B1B33 0%,#0B1B33 92%,rgba(11,27,51,0) 100%)"),
        C("brand", logo + "<span>TITÁN HOLDING</span>", "left:48px;top:40px"),
        C("chips", chips, "left:50px;top:130px;width:780px"),
        C("dock", '<div class="pill" style="position:relative;display:inline-block;padding:8px 18px;font-size:22px;background:rgba(11,27,51,.88);color:#FF8A80;border:2px solid rgba(255,138,128,.7)">NU ≈ −17 % · 26 OCT 2026</div>', "left:880px;top:24px;opacity:0")]
body += [C(i, h, "left:60px;top:300px;width:760px;opacity:0") for i, h, _, _ in OV]
body += [C("caps", ta.caps_html(G, 50), "left:40px;top:850px;width:780px;height:180px"),
         C("disc", '<div style="font-weight:700;font-size:24px;color:rgba(244,238,220,.88)">Contenido educativo. No es una recomendación de inversión.</div>', "left:60px;top:780px;opacity:0")]
CSS = open(f"{H}/tq.css").read() + '''
.chp{display:inline-block;margin:0 8px 10px 0;padding:6px 14px;border-radius:999px;font-family:Jakarta;font-weight:800;font-size:18px;letter-spacing:.06em;color:rgba(244,238,220,.55);border:2px solid rgba(244,238,220,.25)}
.chp.on{background:var(--gold);color:#0B1B33;border-color:var(--gold)} .chp.done{color:var(--gold);border-color:rgba(226,183,85,.55)}
#caps .cg{justify-content:flex-start}'''
CG = [[a_, b, [[w[1], w[2]] for w in g]] for a_, b, g in G]
JS = open(f"{H}/flat_lg.js").read()
html = f'''<!doctype html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=1920, height=1080" />
<title>TITÁN · NU · video largo ilustrado</title><script src="assets/vendor/gsap.min.js"></script>
<style>{CSS}
html, body, #root {{ width:1920px; height:1080px; background:#0B1B33; }}</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{DUR}" data-width="1920" data-height="1080">
{chr(10).join(body)}
<audio id="vo" src="assets/audio/mix.wav" data-start="0" data-duration="{DUR}" data-track-index="90" data-volume="1"></audio>
</div>
<script>
window.DUR = {DUR}; window.T = {json.dumps(T)}; window.CG = {json.dumps(CG)}; window.PIN = [{NS["PINX"]:.1f}, {NS["PINY"]:.1f}];
window.OV = {json.dumps([[i, a_, b] for i, _, a_, b in OV])}; window.CH = {json.dumps([t for _, t in CH])};
{JS}
</script></body></html>'''
open(P + "/index.html", "w").write(html)
print("ok", DUR, len(G), "grupos")
