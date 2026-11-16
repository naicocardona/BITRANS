# NAS100 EDGE LAB · REPORTE SEMANAL #13 (9–13 nov 2026) · trades #028 (SELL, dom 8 nov 11 p. m.) y #029 (BUY, lun 9 nov 10 a. m.) · TikTok y Shorts 1080×1920
# Capturas originales sin alterar (solo encuadre, acercamiento y resaltados encima). Lote, dinero y Δ/% de los comprobantes tapados SIEMPRE desde el primer cuadro.
# Resaltados de gráfico y tapas de comprobante: los mismos de build_t028.py / build_t029.py (se leen de ahí para no duplicarlos).
import os, sys, json, shutil, re
import numpy as np, soundfile as sf
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
from nas_common import KIT, POSES, OVER, GLOW, envelope, lab_svg, align_parts
SCR = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work"); W = f"{SCR}/s13"; TTS = f"{W}/tts"
CAP28 = f"{H}/../entregas/nas100edgelab/trade028/capturas"; CAP29 = f"{H}/../entregas/nas100edgelab/trade029/capturas"
sys.path.insert(0, f"{H}/s13"); from script import TK, SH, ON_SCREEN
def grab(path, names):   # trae las funciones de resaltado/tapas de los armadores de cada trade
    src = open(path).read(); ns = {}
    for nm in names:
        m = re.search(rf"^def {nm}\(.*?(?=^def |^GSEG|^CH |^RED|\Z)", src, re.S | re.M); exec(m.group(0), ns)
    return ns
n28 = grab(f"{H}/build_t028.py", ["chart_ov", "receipt28"]); n29 = grab(f"{H}/build_t029.py", ["chart_ov", "receipt29"])
ov28, rc28, ov29, rc29 = n28["chart_ov"], n28["receipt28"], n29["chart_ov"], n29["receipt29"]
CSS = open(f"{KIT}/nas.css").read() + '''
.viewer .cam img { width:100%; height:100%; display:block; }
.tag3 { position:absolute; padding:8px 18px; border-radius:12px; font-size:30px; font-weight:900; letter-spacing:.08em; background:rgba(9,11,16,.92); white-space:nowrap; }
.kpi { position:absolute; left:0; width:900px; text-align:center; font-weight:900; letter-spacing:-.02em; }
.tbar { position:absolute; left:0; height:64px; border-radius:16px; transform-origin:0 50%; }
.clipH { position:absolute; left:0; top:0; width:900px; font-size:58px; font-weight:900; line-height:1.02; letter-spacing:-.02em; text-transform:uppercase; }
.flash { position:absolute; left:0; top:0; width:1080px; height:1920px; background:#fff; opacity:0; pointer-events:none; }
.chip2 { position:absolute; padding:10px 18px; border-radius:14px; background:rgba(9,11,16,.94); font-size:28px; font-weight:900; letter-spacing:.04em; white-space:nowrap; border:3px solid; }
.ons { position:absolute; left:0; width:900px; padding:16px 22px; border-radius:16px; background:rgba(9,11,16,.92); border:2px solid rgba(167,121,242,.6); font-size:30px; font-weight:900; line-height:1.18; color:#F4F5F9; text-align:center; }
.box2 { position:absolute; left:0; width:900px; border-radius:22px; padding:22px 26px; background:rgba(9,11,16,.94); }
.clk { position:absolute; width:120px; height:120px; }
'''
JSH = open(f"{H}/t027.js").read().split("// ===== guion por versión")[0]   # motor NAS: Explorador, laboratorio vivo, transiciones, subtítulos
JS = JSH + open(f"{H}/s13.js").read()
RED, TQ, VI, GR = "#FF6474", "#3FD0C9", "#A779F2", "#64E087"

def VW(id, top, h, which, left=0, width=900, note="Gráfico: TradingView"):
    w, ih, img, ov = (684, 1121, "chart28.jpg", ov28()) if which == 28 else (613, 1127, "chart29.jpg", ov29())
    return (f'<div class="viewer" id="{id}" style="left:{left}px;top:{top}px;width:{width}px;height:{h}px"><div class="cam" style="width:{w}px;height:{ih}px"><img src="assets/img/{img}" alt="" />{ov}</div>'
            + (f'<div class="vnote">{note}</div>' if note else '') + '</div>')
CH = lambda i, top, left, col, t: f'<div class="chip2 fx" id="{i}" style="left:{left}px;top:{top}px;color:{col};border-color:{col}">{t}</div>'
CLK = lambda i, x, y, col, ang: (f'<svg class="clk fx" id="{i}" style="left:{x}px;top:{y}px" viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="#11141C" stroke="{col}" stroke-width="6"/>'
                                 f'<line x1="60" y1="60" x2="60" y2="22" stroke="#F4F5F9" stroke-width="6" stroke-linecap="round"/>'
                                 f'<line class="hand" x1="60" y1="60" x2="{60 + 34 * np.sin(np.radians(ang)):.0f}" y2="{60 - 34 * np.cos(np.radians(ang)):.0f}" stroke="{col}" stroke-width="7" stroke-linecap="round"/></svg>')

def body(V, DUR, caps):
    tk = V == "tiktok"
    ch = ["GANCHO", "TRADE #028", "TRADE #029", "BALANCE", "APRENDIZAJE 1", "APRENDIZAJE 2", "APRENDIZAJE 3", "CIERRE"]
    n = [10]
    def TI(): n[0] += 1; return n[0]
    C = lambda i, inner: f'<div id="{i}" class="clip scene fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">{inner}</div>'
    imgs = "".join(f'<img id="av_{k}" class="pose" src="assets/avatar/{k}.webp" alt="" />' for k in POSES)
    imgs += "".join(f'<img id="av_{k}" class="ov" src="assets/avatar/{k}.webp" alt="" />' for k in OVER)
    imgs += "".join(f'<img id="gl_{k}" class="gl" src="assets/avatar/gl_{k}.webp" alt="" />' for k in GLOW)
    rh28, rh29 = round(441 * 900 / 828), round(440 * 900 / 828)
    sG = C("sG", f'''<div class="clipH fx" id="g_1"><span style="color:{RED}">DOS TRADES.</span> <span style="color:{TQ}">DIRECCIONES OPUESTAS.</span> <span style="color:{GR}">MISMO OBJETIVO.</span></div>
{VW("gvA", 200, 440, 28, 0, 440, "")}{VW("gvB", 200, 440, 29, 460, 440, "")}
<div class="tag3 fx" id="gtA" style="left:14px;top:214px;color:{RED};border:3px solid {RED}">SELL · #028</div><div class="tag3 fx" id="gtB" style="left:474px;top:214px;color:{TQ};border:3px solid {TQ}">BUY · #029</div>
<div class="tpst fx" id="gpA" style="left:250px;top:540px">TP</div><div class="tpst fx" id="gpB" style="left:720px;top:540px">TP</div>
<div class="note fx" id="g_n" style="left:0;top:654px;width:900px;text-align:center;font-size:24px;color:var(--mu);font-weight:800">Gráficos reales · TradingView</div>''')
    s28 = C("s28", f'''<div class="dpill fx" id="a_d" style="border-color:rgba(255,100,116,.7)">SELL · DOM. 8, 11 PM · +101,45 PTS</div>
{VW("cv28", 140, 400, 28)}
<div class="tag3 fx" id="a_s" style="left:0;top:72px;color:{VI};border:3px solid {VI}">SCORE 6/10 · EN EL MÍNIMO</div>
{CH("a_r", 552, 0, RED, "RADAR BEAR +8 / BULL −7")}{CH("a_c", 552, 470, RED, "FAVORABLE SELL")}
{CH("a_m", 612, 0, "#C9CBD6", "ESTRUCTURA EMA MIXTA")}{CH("a_v", 612, 400, "#FFB020", "ATR 89 · ALTO / RIESGO")}''')
    r28 = C("r28", f'''<div class="rcard" id="rc28" style="height:{rh28}px"><img src="assets/img/receipt28.jpg" alt="" style="width:900px;height:{rh28}px" />{rc28()}</div>
<div class="tpbig fx" id="r28tp" style="top:{20 + rh28 + 12}px">TAKE PROFIT · +<span id="n28">101,45</span> PTS<small>27.106,45 → 27.005,00 · 1 H 52 MIN 06 S</small></div>
<div class="note fx" id="r28n" style="left:0;top:668px;font-size:21px">Ejecución: comprobante del bróker</div>''')
    s29 = C("s29", f'''<div class="dpill fx" id="b_d" style="border-color:rgba(63,208,201,.8);color:{TQ}">BUY · LUN. 9, 10 AM · +100,82 PTS</div>
{VW("cv29", 140, 400, 29)}
<div class="tag3 fx" id="b_s" style="left:0;top:72px;color:{VI};border:3px solid {VI}">SCORE 8/10</div>
{CH("b_m", 552, 0, TQ, "SOBRE EMA 21 Y EMA 200")}{CH("b_c", 552, 480, TQ, "FAVORABLE BUY")}
{CH("b_v", 612, 0, "#FFB020", "LA VOLATILIDAD TAMBIÉN ESTABA ALTA · ATR 94" if tk else "ATR 94 · ALTO / RIESGO")}''')
    r29 = C("r29", f'''<div class="rcard" id="rc29" style="height:{rh29}px"><img src="assets/img/receipt29.jpg" alt="" style="width:900px;height:{rh29}px" />{rc29()}</div>
<div class="tpbig fx" id="r29tp" style="top:{20 + rh29 + 12}px">TAKE PROFIT · +<span id="n29">100,82</span> PTS<small>27.673,50 → 27.774,32 · 30 MIN 13 S</small></div>
<div class="note fx" id="r29n" style="left:0;top:668px;font-size:21px">Ejecución: comprobante del bróker</div>''')
    sT = C("sT", f'''<div class="kpi fx" id="tK" style="top:40px;font-size:72px">2 TRADES · 2 TP</div>
<div class="kpi fx" id="tN" style="top:150px;font-size:150px;color:var(--g);text-shadow:0 0 60px rgba(100,224,135,.5)">+<span id="nT">202,27</span></div>
<div class="kpi fx" id="tU" style="top:330px;font-size:48px">PUNTOS EJECUTADOS</div>
<div class="kpi fx" id="tS" style="top:420px;font-size:34px;color:var(--mu)">101,45 + 100,82 · comprobantes del bróker</div>
<div class="kpi fx" id="tA" style="top:500px;font-size:36px;color:{VI}">Acierto: 2/2 en esta muestra</div>''')
    c1x = f'<div class="ons fx" id="c1x" style="top:640px">{ON_SCREEN["c1b"].replace(" · ", "<br/>")}</div>' if tk else ''
    c2x = f'<div class="ons fx" id="c2x" style="top:640px">{ON_SCREEN["c2b"]}</div>' if tk else ''
    sC1 = C("sC1", f'''<div class="ttl"><div class="n">APRENDIZAJE 1</div><div class="h" style="font-size:46px">DOS LECTURAS DISTINTAS,<br/>DOS RESULTADOS POSITIVOS</div></div>
{VW("c1A", 160, 300, 28, 0, 430, "")}{VW("c1B", 160, 300, 29, 470, 430, "")}
<div class="cardx fx" id="c1a" style="top:480px;width:430px;border:3px solid {RED}"><div class="a" style="color:{RED}">#028 · SELL</div><div class="b" style="font-size:46px">SCORE 6/10</div><div class="c">Justo en el mínimo · TP</div></div>
<div class="cardx fx" id="c1b" style="top:480px;left:470px;width:430px;border:3px solid {TQ}"><div class="a t">#029 · BUY</div><div class="b" style="font-size:46px">SCORE 8/10</div><div class="c">Sobre EMA 21 y EMA 200 · TP</div></div>
{c1x}''')
    W1 = 900 * 1813 / 6726   # 30 min 13 s frente a 1 h 52 min 06 s
    sC2 = C("sC2", f'''<div class="ttl"><div class="n">APRENDIZAJE 2</div><div class="h" style="font-size:46px">EL TIEMPO CAMBIÓ<br/>MÁS QUE EL OBJETIVO</div></div>
{CLK("k1", 0, 170, RED, 300)}{CLK("k2", 0, 380, TQ, 180)}
<div class="abs fx" id="c2l1" style="left:140px;top:178px;font-size:28px;font-weight:900;color:{RED}">#028 · SELL · ≈100 PTS</div><div class="tbar" id="c2b1" style="left:140px;top:222px;width:760px;background:linear-gradient(90deg,#FF6474,#A779F2)"></div>
<div class="abs fx" id="c2v1" style="left:160px;top:234px;font-size:36px;font-weight:900;color:#fff">1 H 52 MIN 06 S</div>
<div class="abs fx" id="c2l2" style="left:140px;top:388px;font-size:28px;font-weight:900;color:{TQ}">#029 · BUY · ≈100 PTS</div><div class="tbar" id="c2b2" style="left:140px;top:432px;width:{760 * 1813 / 6726:.0f}px;background:linear-gradient(90deg,#3FD0C9,#64E087)"></div>
<div class="abs fx" id="c2v2" style="left:{140 + 760 * 1813 / 6726 + 20:.0f}px;top:444px;font-size:36px;font-weight:900;color:{TQ}">30 MIN 13 S</div>
<div class="note fx" id="c2n" style="left:0;top:540px;width:900px;font-size:22px;color:var(--mu)">Dos operaciones: no indica que una sesión sea siempre más rápida.</div>
{c2x}''')
    sC3 = C("sC3", f'''<div class="ttl"><div class="n">APRENDIZAJE 3</div><div class="h" style="font-size:46px">EL RECORRIDO DE LA SESIÓN<br/>NO ES EL RESULTADO DEL TRADE</div></div>
<div class="box2 fx" id="c3a" style="top:130px;border:4px solid {GR}"><div style="font-size:30px;font-weight:900;letter-spacing:.1em;color:{GR}">EJECUCIÓN REAL</div><div style="font-size:96px;font-weight:900;color:{GR};line-height:1.05">+202,27 PTS</div><div style="font-size:26px;font-weight:800;color:#C9CBD6">101,45 + 100,82 · comprobantes del bróker</div></div>
<div class="box2 fx" id="c3b" style="top:455px;border:3px dashed rgba(167,121,242,.8)"><div style="font-size:30px;font-weight:900;letter-spacing:.1em;color:{VI}">SEGUIMIENTO POSTERIOR · TRADINGVIEW</div><div style="font-size:40px;font-weight:900;color:#F4F5F9;margin-top:6px">Análisis, no beneficio capturado</div><div style="font-size:24px;font-weight:800;color:var(--mu);margin-top:6px">Incluye movimiento posterior al TP</div></div>
<div class="stampV fx" id="c3s" style="left:300px;top:362px">NO SE SUMA</div>''')
    end_x = f'<div class="note fx" id="eS" style="left:0;top:640px;width:900px;font-size:23px;color:#C9CBD6">{ON_SCREEN["x2"].capitalize().replace(" · la ventaja", ". La ventaja").replace("trades", "trades.")}</div>' if tk else ''
    sEnd = f'''<div id="sEnd" class="clip fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}" style="position:absolute;left:90px;top:300px;width:900px;height:720px">
  <div class="kpi fx" id="eK" style="top:0;font-size:84px;color:var(--g);text-shadow:0 0 50px rgba(100,224,135,.45)">2/2 ESTA SEMANA</div>
  <div class="H" style="position:absolute;top:140px;font-size:52px"><span>No buscamos operaciones perfectas.</span><br/><span class="v">Buscamos ventaja estadística.</span></div>
  <div class="endpill fx" id="eL" style="left:150px;top:420px">NAS100 EDGE LAB · SEMANA #13</div>
  <div class="note fx" id="eM" style="left:0;top:540px;width:900px;font-size:22px;color:var(--mu)">Dos operaciones publicadas: no es una tasa de acierto de la estrategia.</div>
  {end_x}
</div>'''
    chs = "".join(f'<span class="ch" id="ch{i}">{x}</span>' for i, x in enumerate(ch))
    cps = "".join(f'<div class="cp" id="cp{i}">{x[2]}</div>' for i, x in enumerate(caps))
    return f'''<div id="lab" class="clip" data-start="0" data-duration="{DUR}" data-track-index="1">{lab_svg()}</div>
<div id="grid"></div>
<div id="hdr" class="clip" data-start="0" data-duration="{DUR}" data-track-index="2">
  <div class="lg" data-layout-allow-overflow><img src="assets/img/logo.png" alt="" /></div>
  <div class="hl"><span class="nm">NAS100 EDGE LAB</span><span class="tr">REPORTE SEMANAL #13 · 9–13 NOV 2026</span></div>
  <div id="chs">{chs}</div>
</div>
<div id="pbw" class="clip" data-start="0" data-duration="{DUR}" data-track-index="3"><div id="pb"></div></div>
{sG}{s28}{r28}{s29}{r29}{sT}{sC1}{sC2}{sC3}
{sEnd}
<div id="caps" class="clip" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">{cps}</div>
<div id="av" class="clip" data-layout-allow-overflow data-start="0" data-duration="{DUR}" data-track-index="{TI()}"><div id="avGlow"></div><div id="avIn">{imgs}</div></div>
<div id="disc" class="clip fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">Contenido educativo · No es asesoría financiera · Operar implica riesgo de pérdida</div>
<div id="flash" class="clip flash" data-start="0" data-duration="{DUR}" data-track-index="{TI()}"></div>'''

for V, L in [("tiktok", TK), ("shorts", SH)]:
    st = json.load(open(f"{TTS}/{V}_times.json")); T = {nm: [s, round(s + d, 3)] for nm, s, d in st}
    DUR = round(st[-1][1] + st[-1][2] + (4.2 if V == "tiktok" else 3.4), 1)   # cola para leer el cierre completo
    d = f"{SCR}/s13-{V}"
    for sub in ["img", "avatar", "audio"]: os.makedirs(f"{d}/assets/{sub}", exist_ok=True)
    for sub in ["fonts", "vendor", "avatar"]: shutil.copytree(f"{KIT}/assets/{sub}", f"{d}/assets/{sub}", dirs_exist_ok=True)
    shutil.copy(f"{KIT}/assets/img/logo.png", f"{d}/assets/img/"); shutil.copy(f"{KIT}/hyperframes.json", d)
    shutil.copy(f"{CAP28}/grafico_028.jpg", f"{d}/assets/img/chart28.jpg"); shutil.copy(f"{CAP28}/comprobante_028.jpg", f"{d}/assets/img/receipt28.jpg")
    shutil.copy(f"{CAP29}/grafico_029.jpg", f"{d}/assets/img/chart29.jpg"); shutil.copy(f"{CAP29}/comprobante_029.jpg", f"{d}/assets/img/receipt29.jpg")
    json.dump({"name": f"s13-{V}", "private": True, "type": "module"}, open(d + "/package.json", "w")); json.dump({"id": f"s13-{V}", "name": f"s13-{V}"}, open(d + "/meta.json", "w"))
    capm = {i: c for i, _, c in L}; vozm = {i: v for i, v, _ in L}; caps = []
    for n_, s, du in st:   # una línea por tramo del |; cortes ubicados con la alineación Whisper de la voz (align_parts)
        parts = capm[n_].split("|"); x, sr = sf.read(f"{TTS}/{n_}.wav"); nz = np.where(np.abs(x) > 0.004)[0]; x = x[max(0, nz[0] - 240):nz[-1] + 480]
        sf.write(f"{TTS}/_frase.wav", x, sr)
        for p, (a0, b0) in zip(parts, align_parts(f"{TTS}/_frase.wav", vozm[n_], parts) if len(parts) > 1 else [(0, du)]): caps.append([round(s + a0, 2), round(s + b0, 2), p])
    for k in range(len(caps) - 1): caps[k][1] = round(min(caps[k + 1][0], caps[k][1] + 0.5), 2)
    caps[-1][1] = round(caps[-1][1] + 0.6, 2)
    ENV = envelope(f"{TTS}/{V}_narr.wav", DUR)
    html = f'''<!doctype html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=1080, height=1920" />
<title>NAS100 EDGE LAB · Reporte semanal #13 · {V}</title><script src="assets/vendor/gsap.min.js"></script>
<style>{CSS}</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{DUR}" data-width="1080" data-height="1920">
{body(V, DUR, caps)}
<audio id="vo" src="assets/audio/mix.wav" data-start="0" data-duration="{DUR}" data-track-index="40" data-volume="1"></audio>
</div>
<script>
const V = "{V}", T = {json.dumps(T)}, CAPS = {json.dumps([x[:2] for x in caps])}, DUR = {DUR};
const ENV = {json.dumps(ENV)};
{JS}
</script></body></html>'''
    open(d + "/index.html", "w").write(html)
    json.dump({"version": V, "duracion": DUR, "frases": st, "subtitulos": caps}, open(d + "/tiempos.json", "w"), ensure_ascii=False, indent=1)
    print(V, DUR, len(caps), "subtítulos")
