# NAS100 EDGE LAB · RESUMEN SEMANAL #12 (2–6 nov 2026) · trades #026 y #027 · TikTok y Shorts 1080×1920
import os, sys, json, shutil
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
from nas_common import KIT, POSES, OVER, GLOW, envelope, lab_svg, CLOCK, chart26, chart27, receipt
SCR = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work"); W = f"{SCR}/s12"; TTS = f"{W}/tts"
sys.path.insert(0, f"{H}/s12"); from script import TK, SH
CSS = open(f"{KIT}/nas.css").read() + '''
.viewer .cam img { width:100%; height:100%; display:block; }
.tag3 { position:absolute; padding:8px 18px; border-radius:12px; font-size:30px; font-weight:900; letter-spacing:.08em; background:rgba(9,11,16,.92); }
.kpi { position:absolute; left:0; width:900px; text-align:center; font-weight:900; letter-spacing:-.02em; }
.tbar { position:absolute; left:0; height:64px; border-radius:16px; transform-origin:0 50%; }
.clipH { position:absolute; left:0; top:0; width:900px; font-size:60px; font-weight:900; line-height:1.02; letter-spacing:-.02em; text-transform:uppercase; }
.flash { position:absolute; left:0; top:0; width:1080px; height:1920px; background:#fff; opacity:0; pointer-events:none; }
'''
JSH = open(f"{H}/t027.js").read().split("// ===== guion por versión")[0]   # utilidades del motor NAS (Explorador, laboratorio vivo, transiciones)
JS = JSH + open(f"{H}/s12.js").read()

def VW(id, top, h, img, w, ih, ov, left=0, width=900, note="Gráfico: TradingView"):
    return (f'<div class="viewer" id="{id}" style="left:{left}px;top:{top}px;width:{width}px;height:{h}px"><div class="cam" style="width:{w}px;height:{ih}px"><img src="assets/img/{img}" alt="" />{ov}</div>'
            + (f'<div class="vnote">{note}</div>' if note else '') + '</div>')

def body(V, DUR, caps):
    tk = V == "tiktok"
    ch = ["GANCHO", "TRADE #026", "TRADE #027", "APRENDIZAJE 1", "APRENDIZAJE 2", "APRENDIZAJE 3", "CIERRE"] if tk else ["GANCHO", "TRADE #026", "TRADE #027", "APRENDIZAJES", "CIERRE"]
    n = [10]
    def TI(): n[0] += 1; return n[0]
    C = lambda i, inner: f'<div id="{i}" class="clip scene fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">{inner}</div>'
    imgs = "".join(f'<img id="av_{k}" class="pose" src="assets/avatar/{k}.webp" alt="" />' for k in POSES)
    imgs += "".join(f'<img id="av_{k}" class="ov" src="assets/avatar/{k}.webp" alt="" />' for k in OVER)
    imgs += "".join(f'<img id="gl_{k}" class="gl" src="assets/avatar/gl_{k}.webp" alt="" />' for k in GLOW)
    learn = ""
    if tk:
        learn = f'''{C("sC1", f"""<div class="ttl"><div class="n">APRENDIZAJE 1</div><div class="h" style="font-size:52px">LA LECTURA CAMBIÓ<br/>ENTRE SESIONES</div></div>
<div class="cardx fx" id="c1a" style="top:170px;width:420px;border:3px solid var(--r)"><div class="a" style="color:var(--r)">#026 · SELL · 11 PM</div><div class="b" style="font-size:40px">SCORE 8/10</div><div class="c">Precio bajo EMA 21 y EMA 200</div></div>
<div class="cardx fx" id="c1b" style="top:170px;left:480px;width:420px;border:3px solid var(--t)"><div class="a t">#027 · BUY · 10 AM</div><div class="b" style="font-size:40px">SCORE 7/10</div><div class="c">Radar Bull +4 / Bear −1</div></div>
<div class="neq fx" id="c1n" style="top:236px">≠</div>
<div class="stampV fx" id="c1s" style="left:150px;top:470px">CADA LECTURA, POR SEPARADO</div>""")}
{C("sC2", f"""<div class="ttl"><div class="n">APRENDIZAJE 2</div><div class="h" style="font-size:52px">MISMO OBJETIVO,<br/>DISTINTO TIEMPO</div></div>
<div class="abs fx" id="c2l1" style="left:0;top:180px;font-size:28px;font-weight:900;color:var(--r)">#026 · SELL</div><div class="tbar" id="c2b1" style="top:226px;width:900px;background:linear-gradient(90deg,#FF6474,#A779F2)"></div>
<div class="abs fx" id="c2v1" style="left:24px;top:238px;font-size:36px;font-weight:900;color:#fff">2 H 00 MIN 27 S</div>
<div class="abs fx" id="c2l2" style="left:0;top:330px;font-size:28px;font-weight:900;color:var(--t)">#027 · BUY</div><div class="tbar" id="c2b2" style="top:376px;width:{900*2205/7227:.0f}px;background:linear-gradient(90deg,#3FD0C9,#64E087)"></div>
<div class="abs fx" id="c2v2" style="left:{900*2205/7227+20:.0f}px;top:388px;font-size:36px;font-weight:900;color:var(--t)">36 MIN 45 S</div>
<div class="tpst fx" id="c2tp" style="left:560px;top:500px">LOS DOS: TP</div>""")}
{C("sC3", f"""<div class="ttl"><div class="n">APRENDIZAJE 3</div><div class="h" style="font-size:52px">EL AJUSTE HORARIO<br/>SIGUE EN PRUEBA</div></div>
<div class="mini fx" id="c3m" style="top:170px;text-align:center"><div class="a">HORA DE ENTRADA</div><div style="font-size:84px;font-weight:900;margin-top:6px"><span class="mu">9 AM</span> <span class="v">→</span> <span class="t">10 AM</span></div></div>
<div class="tl2 fx" id="c3t" style="top:420px"><div class="ln2"></div>{"".join(f'<div class="nd" style="left:{60 + k*184}px;background:{"var(--g)" if k == 0 else "#2A2F3D"}"></div>' for k in range(5))}
<div class="lb" style="left:-60px;color:var(--g)">1 TP A LAS 10</div><div class="lb" style="left:300px;color:var(--mu)">MÁS OPERACIONES COMPARABLES</div></div>
<div class="stampV fx" id="c3s" style="left:260px;top:330px">EN PRUEBA</div>""")}'''
    else:
        learn = C("sC", f"""<div class="ttl"><div class="n">¿QUÉ ANOTAMOS?</div><div class="h" style="font-size:52px">TRES APRENDIZAJES</div></div>
{"".join(f'<div class="cardx fx" id="cl{k}" style="top:{150 + k*150}px;border:3px solid {c}"><div class="b" style="font-size:38px">{t}</div></div>' for k, (t, c) in enumerate([("1 · LA LECTURA CAMBIÓ ENTRE SESIONES", "var(--v)"), ("2 · MISMO OBJETIVO, DISTINTO TIEMPO", "var(--t)"), ("3 · EL AJUSTE HORARIO SIGUE EN PRUEBA", "var(--g)")]))}""")
    return f'''<div id="lab" class="clip" data-start="0" data-duration="{DUR}" data-track-index="1">{lab_svg()}</div>
<div id="grid"></div>
<div id="hdr" class="clip" data-start="0" data-duration="{DUR}" data-track-index="2">
  <div class="lg" data-layout-allow-overflow><img src="assets/img/logo.png" alt="" /></div>
  <div class="hl"><span class="nm">NAS100 EDGE LAB</span><span class="tr">SEMANA #12 · 2–6 NOV 2026</span></div>
  <div id="chs">{"".join(f'<span class="ch" id="ch{i}">{x}</span>' for i, x in enumerate(ch))}</div>
</div>
<div id="pbw" class="clip" data-start="0" data-duration="{DUR}" data-track-index="3"><div id="pb"></div></div>
{C("sG", f"""<div class="clipH fx" id="g_1"><span style="color:#FF6474">UNA VENTA.</span> <span style="color:#3FD0C9">UNA COMPRA.</span><br/><span style="color:#64E087">DOS TP.</span></div>
{VW("gvA", 170, 400, "chart26.jpg", 560, 949, chart26(), 0, 440, "")}{VW("gvB", 170, 400, "chart27.jpg", 462, 1031, chart27(), 460, 440, "")}
<div class="tag3 fx" id="gtA" style="left:14px;top:184px;color:var(--r);border:3px solid var(--r)">SELL · #026</div><div class="tag3 fx" id="gtB" style="left:474px;top:184px;color:var(--t);border:3px solid var(--t)">BUY · #027</div>
<div class="tpst fx" id="gpA" style="left:250px;top:470px">TP</div><div class="tpst fx" id="gpB" style="left:720px;top:470px">TP</div>
<div class="note fx" id="g_n" style="left:0;top:600px;width:900px;text-align:center;font-size:26px;color:var(--mu);font-weight:800">Gráficos reales · TradingView</div>""")}
{C("s26", f"""<div class="dpill fx" id="a_d" style="border-color:rgba(255,100,116,.7)">SELL · 11 PM · +100,70 PTS</div>
{VW("cv26", 140, 550, "chart26.jpg", 560, 949, chart26())}
<div class="tag3 fx" id="a_s" style="left:0;top:72px;color:var(--v);border:3px solid var(--v)">SCORE 8/10</div>
<div class="tag3 fx" id="a_m" style="left:250px;top:72px;color:var(--r);border:3px solid var(--r)">BAJO EMA 21 Y EMA 200</div>
<div class="tag3 fx" id="a_x" style="left:0;top:72px;color:var(--r);border:3px solid var(--r)">DESCENSO HACIA EL OBJETIVO</div>""")}
{C("r26", f"""<div class="rcard" id="rc26" style="height:{round(398*900/828)}px"><img src="assets/img/receipt26.jpg" alt="" style="width:900px" />{receipt(398, "100,70", "SELL")}</div>
<div class="tpbig fx" id="r26tp" style="top:476px">TAKE PROFIT · +<span id="n26">100,70</span> PTS<small>DURACIÓN: 2 H 00 MIN 27 S</small></div>
<div class="note fx" id="r26n" style="left:0;top:650px;font-size:22px">Ejecución: comprobante del bróker</div>""")}
{C("s27", f"""<div class="dpill fx" id="b_d">BUY · 10 AM · +100 PTS</div>
<div id="clkW" class="fx" style="position:absolute;left:320px;top:110px;width:260px;height:260px">{CLOCK}</div>
<div id="clkL" class="fx" style="position:absolute;left:0;top:400px;width:900px;text-align:center;font-size:64px;font-weight:900"><span class="mu" id="h9">9 AM</span> <span class="v">→</span> <span class="t">10 AM</span></div>
<div class="note fx" id="b_c" style="left:0;top:500px;width:900px;text-align:center;font-size:26px;color:var(--t);font-weight:800">Ajuste por el fin del horario de verano en EE. UU.</div>
{VW("cv27", 140, 550, "chart27.jpg", 462, 1031, chart27())}
<div class="tag3 fx" id="b_s" style="left:0;top:72px;color:var(--v);border:3px solid var(--v)">SCORE 7/10</div>
<div class="tag3 fx" id="b_r" style="left:250px;top:72px;color:var(--t);border:3px solid var(--t)">RADAR BULL +4 / BEAR −1</div>""")}
{C("r27", f"""<div class="rcard" id="rc27" style="height:{round(405*900/828)}px"><img src="assets/img/receipt27.jpg" alt="" style="width:900px" />{receipt(405, "100", "BUY")}</div>
<div class="tpbig fx" id="r27tp" style="top:482px">TAKE PROFIT · +<span id="n27">100</span> PTS<small>DURACIÓN: 36 MIN 45 S</small></div>
<div class="note fx" id="r27n" style="left:0;top:656px;font-size:22px">Ejecución: comprobante del bróker</div>""")}
{learn}
<div id="sEnd" class="clip fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}" style="position:absolute;left:90px;top:300px;width:900px;height:690px">
  <div class="kpi fx" id="eK" style="top:0;font-size:58px">2 TRADES · 2 TP</div>
  <div class="kpi fx" id="eN" style="top:80px;font-size:120px;color:var(--g);text-shadow:0 0 50px rgba(100,224,135,.45)">+<span id="nT">200,70</span></div>
  <div class="kpi fx" id="eU" style="top:220px;font-size:44px">PUNTOS EJECUTADOS</div>
  <div class="endpill fx" id="e22" style="left:330px;top:290px">2 DE 2 TP</div>
  <div class="H" style="position:absolute;top:380px;font-size:50px"><span>No buscamos operaciones perfectas.</span><br/><span class="v">Buscamos ventaja estadística.</span></div>
  <div class="note fx" id="eS" style="left:0;top:600px;width:900px;font-size:22px;color:var(--mu)">Dos operaciones documentadas: no es una tasa de acierto de la estrategia.</div>
</div>
<div id="caps" class="clip" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">{"".join(f'<div class="cp" id="cp{i}">{x[2]}</div>' for i, x in enumerate(caps))}</div>
<div id="av" class="clip" data-layout-allow-overflow data-start="0" data-duration="{DUR}" data-track-index="{TI()}"><div id="avGlow"></div><div id="avIn">{imgs}</div></div>
<div id="disc" class="clip fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">Contenido educativo · No es asesoría financiera · Operar implica riesgo de pérdida</div>
<div id="flash" class="clip flash" data-start="0" data-duration="{DUR}" data-track-index="{TI()}"></div>'''

for V, L in [("tiktok", TK), ("shorts", SH)]:
    st = json.load(open(f"{TTS}/{V}_times.json")); T = {nm: [s, round(s + d, 3)] for nm, s, d in st}
    DUR = round(st[-1][1] + st[-1][2] + (0.9 if V == "tiktok" else 1.6), 1)
    d = f"{SCR}/s12-{V}"
    for sub in ["img", "avatar", "audio"]: os.makedirs(f"{d}/assets/{sub}", exist_ok=True)
    for sub in ["fonts", "vendor", "avatar"]: shutil.copytree(f"{KIT}/assets/{sub}", f"{d}/assets/{sub}", dirs_exist_ok=True)
    shutil.copy(f"{KIT}/assets/img/logo.png", f"{d}/assets/img/"); shutil.copy(f"{KIT}/hyperframes.json", d)
    for t in ["26", "27"]:
        shutil.copy(f"{W}/img/t0{t}/chart.jpg", f"{d}/assets/img/chart{t}.jpg"); shutil.copy(f"{W}/img/t0{t}/receipt.jpg", f"{d}/assets/img/receipt{t}.jpg")
    json.dump({"name": f"s12-{V}", "private": True, "type": "module"}, open(d + "/package.json", "w")); json.dump({"id": f"s12-{V}", "name": f"s12-{V}"}, open(d + "/meta.json", "w"))
    capm = {i: c for i, _, c in L}; caps = []
    for n_, s, du in st:   # una línea por tramo del |, repartida por letras dentro de la frase (frase = tiempo exacto de la voz)
        parts = capm[n_].split("|"); Ls = [len(p) for p in parts]; t = s
        for p, l in zip(parts, Ls):
            dd = du * l / sum(Ls); caps.append([round(t, 2), round(t + dd, 2), p]); t += dd
    for k in range(len(caps) - 1): caps[k][1] = round(min(caps[k + 1][0], caps[k][1] + 0.5), 2)
    caps[-1][1] = round(caps[-1][1] + 0.6, 2)
    mix = f"{d}/assets/audio/mix.wav"
    ENV = envelope(f"{TTS}/{V}_narr.wav", DUR)
    html = f'''<!doctype html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=1080, height=1920" />
<title>NAS100 EDGE LAB · Semana #12 · {V}</title><script src="assets/vendor/gsap.min.js"></script>
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
