# NAS100 EDGE LAB · REPORTE SEMANAL #14 (16–20 nov 2026) · trades #030, #031, #032 y #033 (las cuatro SELL) · TikTok y Shorts 1080×1920
# Capturas originales sin alterar (solo encuadre, acercamiento y resaltados encima). Lote, dinero y Δ/% de los comprobantes tapados SIEMPRE desde el primer cuadro
# (se reutilizan las tapas receiptNN() de cada build_tNNN.py ya aprobado).
import os, sys, json, shutil, re
import numpy as np, soundfile as sf
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
from nas_common import KIT, POSES, OVER, GLOW, envelope, lab_svg, align_parts
SCR = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work"); W = f"{SCR}/s14"; TTS = f"{W}/tts"
sys.path.insert(0, f"{H}/s14"); from script import TK, SH
def grab(path, names, pre=None):
    src = open(path).read(); ns = dict(pre or {})
    for nm in names:
        m = re.search(rf"^def {nm}\(.*?(?=^def |^GSEG|^CH |^RED|^CW|\Z)", src, re.S | re.M); exec(m.group(0), ns)
    return ns
RED, TQ, VI, GR, AM = "#FF6474", "#3FD0C9", "#A779F2", "#64E087", "#FFB020"
# datos de cada trade (guiones aprobados y comprobantes)
TR = {
 30: dict(w=511, h=748, rh=428, cam=(180, 380, 1.35), date="DOM. 15, 11 PM", pts="101,65", px="27.822,50 → 27.720,85", dur="1 H 10 MIN 08 S", score="SCORE 6/10 · EN EL MÍNIMO",
          chips=[(RED, "RADAR EMPATADO · BULL +1 / BEAR +1"), (RED, "FAVORABLE SELL"), ("#C9CBD6", "BAJO EMA 21 Y EMA 200"), (AM, "ATR 84 · ALTO / RIESGO")]),
 31: dict(w=367, h=721, rh=411, cam=(180, 430, 1.6), date="LUN. 16, 10 AM", pts="99,95", px="27.476,30 → 27.376,35", dur="4 MIN 54 S", score="SCORE 9/10 · EL MÁS ALTO",
          chips=[(RED, "RADAR BEAR +9 / BULL −6"), (RED, "FAVORABLE SELL"), ("#C9CBD6", "BAJO EMA 21 Y EMA 200"), (AM, "ATR 84 · ALTO / RIESGO")]),
 32: dict(w=309, h=543, rh=414, cam=(135, 300, 2.0), date="LUN. 16, 11 PM", pts="103,70", px="27.330,30 → 27.226,60", dur="2 H 17 MIN 27 S", score="SCORE 7/10",
          chips=[(RED, "RADAR BEAR +6 / BULL −5"), (RED, "FAVORABLE SELL"), ("#C9CBD6", "ESTRUCTURA EMA MIXTA"), (AM, "ATR 67")]),
 33: dict(w=213, h=644, rh=407, cam=(95, 170, 2.4), date="MAR. 17, 10 AM", pts="99,70", px="27.261,55 → 27.161,85", dur="5 MIN 43 S", score="SCORE 7/10",
          chips=[(RED, "MARKET ALIGNMENT +2"), (RED, "FAVORABLE SELL"), ("#C9CBD6", "ALPHA RADAR BULL −3"), (AM, "ATR 14 H: 74")]),
}
for n, d in TR.items():
    ns = grab(f"{H}/build_t0{n}.py", ["chart_ov", f"receipt{n}"], {"CW": d["w"], "CHH": d["h"]})
    d["ov"], d["rc"] = ns["chart_ov"](), ns[f"receipt{n}"]()
CSS = open(f"{KIT}/nas.css").read() + '''
.viewer .cam img { width:100%; height:100%; display:block; }
.tag3 { position:absolute; padding:8px 18px; border-radius:12px; font-size:30px; font-weight:900; letter-spacing:.08em; background:rgba(9,11,16,.92); white-space:nowrap; }
.tag4 { position:absolute; padding:5px 12px; border-radius:10px; font-size:22px; font-weight:900; letter-spacing:.06em; background:rgba(9,11,16,.92); white-space:nowrap; border:3px solid; }
.kpi { position:absolute; left:0; width:900px; text-align:center; font-weight:900; letter-spacing:-.02em; }
.tbar { position:absolute; left:0; height:44px; border-radius:12px; transform-origin:0 50%; }
.clipH { position:absolute; left:0; top:0; width:900px; font-size:60px; font-weight:900; line-height:1.02; letter-spacing:-.02em; text-transform:uppercase; }
.flash { position:absolute; left:0; top:0; width:1080px; height:1920px; background:#fff; opacity:0; pointer-events:none; }
.chip2 { position:absolute; padding:10px 18px; border-radius:14px; background:rgba(9,11,16,.94); font-size:26px; font-weight:900; letter-spacing:.04em; white-space:nowrap; border:3px solid; }
.box2 { position:absolute; left:0; width:900px; border-radius:22px; padding:22px 26px; background:rgba(9,11,16,.94); }
.sc4 { position:absolute; width:430px; height:150px; border-radius:20px; background:rgba(9,11,16,.94); padding:16px 22px; box-sizing:border-box; }
.sc4 .a { font-size:24px; font-weight:900; letter-spacing:.08em; } .sc4 .b { font-size:54px; font-weight:900; color:#F4F5F9; line-height:1.1; } .sc4 .c { font-size:22px; font-weight:800; color:#C9CBD6; }
.ex4 { position:absolute; width:205px; padding:12px 0; border-radius:16px; text-align:center; background:rgba(9,11,16,.94); border:3px solid #64E087; }
.ex4 .a { font-size:20px; font-weight:900; color:#C9CBD6; letter-spacing:.06em; } .ex4 .b { font-size:40px; font-weight:900; color:#64E087; }
'''
JSH = open(f"{H}/t027.js").read().split("// ===== guion por versión")[0]
JS = JSH + open(f"{H}/s14.js").read()

def VW(id, top, h, n, left=0, width=900, note="Gráfico: TradingView"):
    d = TR[n]
    return (f'<div class="viewer" id="{id}" style="left:{left}px;top:{top}px;width:{width}px;height:{h}px"><div class="cam" style="width:{d["w"]}px;height:{d["h"]}px"><img src="assets/img/chart{n}.jpg" alt="" />{d["ov"]}</div>'
            + (f'<div class="vnote">{note}</div>' if note else '') + '</div>')
CH = lambda i, top, left, col, t: f'<div class="chip2 fx" id="{i}" style="left:{left}px;top:{top}px;color:{col};border-color:{col}">{t}</div>'

def body(V, DUR, caps):
    tk = V == "tiktok"
    ch = ["GANCHO", "TRADE #030", "TRADE #031", "TRADE #032", "TRADE #033", "BALANCE", "APRENDIZAJE 1", "APRENDIZAJE 2", "APRENDIZAJE 3", "CIERRE"]
    k = [10]
    def TI(): k[0] += 1; return k[0]
    C = lambda i, inner: f'<div id="{i}" class="clip scene fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">{inner}</div>'
    imgs = "".join(f'<img id="av_{p}" class="pose" src="assets/avatar/{p}.webp" alt="" />' for p in POSES)
    imgs += "".join(f'<img id="av_{p}" class="ov" src="assets/avatar/{p}.webp" alt="" />' for p in OVER)
    imgs += "".join(f'<img id="gl_{p}" class="gl" src="assets/avatar/gl_{p}.webp" alt="" />' for p in GLOW)
    # gancho: los 4 gráficos reales en mosaico 2×2
    pos = {30: (0, 150), 31: (460, 150), 32: (0, 420), 33: (460, 420)}
    gv = "".join(VW(f"gv{n}", y, 250, n, x, 440, "") + f'<div class="tag4 fx" id="gt{n}" style="left:{x + 10}px;top:{y + 10}px;color:{RED};border-color:{RED}">SELL · #0{n}</div>'
                 f'<div class="tpst fx" id="gp{n}" style="left:{x + 300}px;top:{y + 170}px;font-size:30px">TP</div>' for n, (x, y) in pos.items())
    sG = C("sG", f'''<div class="clipH fx" id="g_1"><span style="color:{RED}">4 VENTAS.</span> <span style="color:{GR}">4 TAKE PROFITS.</span></div>{gv}
<div class="note fx" id="g_n" style="left:0;top:92px;width:900px;text-align:center;font-size:24px;color:var(--mu);font-weight:800">Gráficos reales · TradingView</div>''')
    sc = ""
    for n, d in TR.items():
        c = d["chips"]; rh = round(d["rh"] * 900 / 828)
        sc += C(f"s{n}", f'''<div class="dpill fx" id="d{n}" style="border-color:rgba(255,100,116,.7)">#0{n} · SELL · {d["date"]}</div>
{VW(f"cv{n}", 140, 400, n)}
<div class="tag3 fx" id="sc{n}" style="left:0;top:72px;color:{VI};border:3px solid {VI}">{d["score"]}</div>
{CH(f"c{n}a", 552, 0, c[0][0], c[0][1])}{CH(f"c{n}c", 612, 0, c[2][0], c[2][1])}{CH(f"c{n}b", 612, 640, c[1][0], c[1][1])}''')
        sc += C(f"r{n}", f'''<div class="rcard" id="rc{n}" style="height:{rh}px"><img src="assets/img/receipt{n}.jpg" alt="" style="width:900px;height:{rh}px" />{d["rc"]}</div>
<div class="tpbig fx" id="tp{n}" style="top:{20 + rh + 12}px">TAKE PROFIT · +<span id="n{n}">{d["pts"]}</span> PTS<small>{d["px"]} · {d["dur"]}</small></div>
<div class="note fx" id="rn{n}" style="left:0;top:652px;font-size:20px">Ejecución: comprobante del bróker · lote y dinero tapados</div>''')
    sT = C("sT", f'''<div class="kpi fx" id="tK" style="top:30px;font-size:72px">4 TRADES · 4 TP</div>
<div class="kpi fx" id="tN" style="top:130px;font-size:150px;color:var(--g);text-shadow:0 0 60px rgba(100,224,135,.5)">+<span id="nT">405,00</span></div>
<div class="kpi fx" id="tU" style="top:310px;font-size:48px">PUNTOS EJECUTADOS</div>
<div class="kpi fx" id="tS" style="top:400px;font-size:32px;color:var(--mu)">101,65 + 99,95 + 103,70 + 99,70 · comprobantes del bróker</div>
<div class="kpi fx" id="tA" style="top:470px;font-size:36px;color:{VI}">Acierto: 4/4 en esta muestra</div>
<div class="kpi fx" id="tR" style="top:540px;font-size:24px;color:var(--mu)">El recorrido posterior de la sesión no se suma</div>''')
    cards = [(30, 0, 150, "SCORE 6/10", "Justo en el mínimo"), (31, 470, 150, "SCORE 9/10", "El más alto"), (32, 0, 320, "SCORE 7/10", "Medias mixtas"), (33, 470, 320, "SCORE 7/10", "Alineación +2")]
    sc4 = "".join(f'<div class="sc4 fx" id="l1{n}" style="left:{x}px;top:{y}px;border:3px solid {VI}"><div class="a" style="color:{VI}">#0{n} · SELL · TP</div><div class="b">{b}</div><div class="c">{cc}</div></div>' for n, x, y, b, cc in cards)
    sC1 = C("sC1", f'''<div class="ttl"><div class="n">APRENDIZAJE 1</div><div class="h" style="font-size:46px">SCORES DE 6 A 9,<br/>LOS CUATRO EN TP</div></div>{sc4}
<div class="box2 fx" id="l1n" style="top:500px;border:2px solid rgba(167,121,242,.6);text-align:center;font-size:30px;font-weight:900;color:#F4F5F9">4 casos: aún no permite afirmar<br/>qué nivel de score funciona mejor</div>''')
    durs = [(30, "DOM. 11 PM", 4208, "1 H 10 MIN", VI), (31, "LUN. 10 AM", 294, "4 MIN 54 S", TQ), (32, "LUN. 11 PM", 8247, "2 H 17 MIN", VI), (33, "MAR. 10 AM", 343, "5 MIN 43 S", TQ)]
    bars = ""
    for i, (n, lab, s, txt, col) in enumerate(durs):
        y = 150 + i * 112; wpx = max(14, 560 * s / 8247)
        bars += (f'<div class="abs fx" id="l2t{n}" style="left:0;top:{y}px;font-size:24px;font-weight:900;color:{col}">#0{n} · {lab}</div>'
                 f'<div class="tbar" id="l2b{n}" style="left:0;top:{y + 36}px;width:{wpx:.0f}px;background:linear-gradient(90deg,{col},{"#64E087" if col == TQ else "#FF6474"})"></div>'
                 f'<div class="abs fx" id="l2v{n}" style="left:{wpx + 18:.0f}px;top:{y + 38}px;font-size:32px;font-weight:900;color:#fff">{txt}</div>')
    sC2 = C("sC2", f'''<div class="ttl"><div class="n">APRENDIZAJE 2</div><div class="h" style="font-size:46px">MAÑANA: MINUTOS<br/>NOCHE: HORAS</div></div>{bars}
<div class="note fx" id="l2n" style="left:0;top:610px;width:900px;font-size:24px;color:var(--mu)">Dos casos de cada uno: es un patrón para seguir registrando, no una regla.</div>''')
    ex = "".join(f'<div class="ex4 fx" id="l3{n}" style="left:{i * 231}px;top:330px"><div class="a">#0{n}</div><div class="b">{TR[n]["pts"]}</div></div>' for i, n in enumerate(TR))
    sC3 = C("sC3", f'''<div class="ttl"><div class="n">APRENDIZAJE 3</div><div class="h" style="font-size:46px">EL OBJETIVO ERA 100.<br/>CUENTA LO EJECUTADO</div></div>
<div class="box2 fx" id="l3o" style="top:150px;border:3px dashed rgba(167,121,242,.8);text-align:center"><div style="font-size:28px;font-weight:900;letter-spacing:.1em;color:{VI}">OBJETIVO DE REFERENCIA</div><div style="font-size:72px;font-weight:900;color:#F4F5F9">100 PTS</div></div>
{ex}<div class="note fx" id="l3n" style="left:0;top:470px;width:900px;font-size:24px;color:var(--mu);text-align:center">Puntos ejecutados · comprobantes del bróker</div>
<div class="stampV fx" id="l3s" style="left:230px;top:540px">EL DATO ES EL EJECUTADO</div>''')
    sEnd = f'''<div id="sEnd" class="clip fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}" style="position:absolute;left:90px;top:300px;width:900px;height:720px">
  <div class="kpi fx" id="eK" style="top:0;font-size:84px;color:var(--g);text-shadow:0 0 50px rgba(100,224,135,.45)">4/4 ESTA SEMANA</div>
  <div class="H" style="position:absolute;top:140px;font-size:52px"><span>No buscamos operaciones perfectas.</span><br/><span class="v">Buscamos ventaja estadística.</span></div>
  <div class="endpill fx" id="eL" style="left:150px;top:420px">NAS100 EDGE LAB · SEMANA #14</div>
  <div class="note fx" id="eM" style="left:0;top:540px;width:900px;font-size:22px;color:var(--mu)">Cuatro operaciones publicadas: no es una tasa de acierto de la estrategia.</div>
</div>'''
    chs = "".join(f'<span class="ch" id="ch{i}">{x}</span>' for i, x in enumerate(ch))
    cps = "".join(f'<div class="cp" id="cp{i}">{x[2]}</div>' for i, x in enumerate(caps))
    return f'''<div id="lab" class="clip" data-start="0" data-duration="{DUR}" data-track-index="1">{lab_svg()}</div>
<div id="grid"></div>
<div id="hdr" class="clip" data-start="0" data-duration="{DUR}" data-track-index="2">
  <div class="lg" data-layout-allow-overflow><img src="assets/img/logo.png" alt="" /></div>
  <div class="hl"><span class="nm">NAS100 EDGE LAB</span><span class="tr">REPORTE SEMANAL #14 · 16–20 NOV 2026</span></div>
  <div id="chs">{chs}</div>
</div>
<div id="pbw" class="clip" data-start="0" data-duration="{DUR}" data-track-index="3"><div id="pb"></div></div>
{sG}{sc}{sT}{sC1}{sC2}{sC3}
{sEnd}
<div id="caps" class="clip" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">{cps}</div>
<div id="av" class="clip" data-layout-allow-overflow data-start="0" data-duration="{DUR}" data-track-index="{TI()}"><div id="avGlow"></div><div id="avIn">{imgs}</div></div>
<div id="disc" class="clip fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">Contenido educativo · No es asesoría financiera · Operar implica riesgo de pérdida</div>
<div id="flash" class="clip flash" data-start="0" data-duration="{DUR}" data-track-index="{TI()}"></div>'''

for V, L in [("tiktok", TK), ("shorts", SH)]:
    st = json.load(open(f"{TTS}/{V}_times.json")); T = {nm: [s, round(s + d, 3)] for nm, s, d in st}
    DUR = round(st[-1][1] + st[-1][2] + (4.2 if V == "tiktok" else 3.4), 1)
    d = f"{SCR}/s14-{V}"
    for sub in ["img", "avatar", "audio"]: os.makedirs(f"{d}/assets/{sub}", exist_ok=True)
    for sub in ["fonts", "vendor", "avatar"]: shutil.copytree(f"{KIT}/assets/{sub}", f"{d}/assets/{sub}", dirs_exist_ok=True)
    shutil.copy(f"{KIT}/assets/img/logo.png", f"{d}/assets/img/"); shutil.copy(f"{KIT}/hyperframes.json", d)
    for n in TR:
        cap = f"{H}/../entregas/nas100edgelab/trade0{n}/capturas"
        shutil.copy(f"{cap}/grafico_0{n}.jpg", f"{d}/assets/img/chart{n}.jpg"); shutil.copy(f"{cap}/comprobante_0{n}.jpg", f"{d}/assets/img/receipt{n}.jpg")
    json.dump({"name": f"s14-{V}", "private": True, "type": "module"}, open(d + "/package.json", "w")); json.dump({"id": f"s14-{V}", "name": f"s14-{V}"}, open(d + "/meta.json", "w"))
    capm = {i: c for i, _, c in L}; vozm = {i: v for i, v, _ in L}; caps = []
    for n_, s, du in st:
        parts = capm[n_].split("|"); x, sr = sf.read(f"{TTS}/{n_}.wav"); nz = np.where(np.abs(x) > 0.004)[0]; x = x[max(0, nz[0] - 240):nz[-1] + 480]
        sf.write(f"{TTS}/_frase.wav", x, sr)
        for p, (a0, b0) in zip(parts, align_parts(f"{TTS}/_frase.wav", vozm[n_], parts) if len(parts) > 1 else [(0, du)]): caps.append([round(s + a0, 2), round(s + b0, 2), p])
    for q in range(len(caps) - 1): caps[q][1] = round(min(caps[q + 1][0], caps[q][1] + 0.5), 2)
    caps[-1][1] = round(caps[-1][1] + 0.6, 2)
    ENV = envelope(f"{TTS}/{V}_narr.wav", DUR)
    html = f'''<!doctype html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=1080, height=1920" />
<title>NAS100 EDGE LAB · Reporte semanal #14 · {V}</title><script src="assets/vendor/gsap.min.js"></script>
<style>{CSS}</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{DUR}" data-width="1080" data-height="1920">
{body(V, DUR, caps)}
<audio id="vo" src="assets/audio/mix.wav" data-start="0" data-duration="{DUR}" data-track-index="40" data-volume="1"></audio>
</div>
<script>
const V = "{V}", T = {json.dumps(T)}, CAPS = {json.dumps([x[:2] for x in caps])}, DUR = {DUR};
const ENV = {json.dumps(ENV)};
const TRC = {json.dumps({n: d["cam"] + (d["h"],) for n, d in TR.items()})};
{JS}
</script></body></html>'''
    open(d + "/index.html", "w").write(html)
    json.dump({"version": V, "duracion": DUR, "frases": st, "subtitulos": caps}, open(d + "/tiempos.json", "w"), ensure_ascii=False, indent=1)
    print(V, DUR, len(caps), "subtítulos")
