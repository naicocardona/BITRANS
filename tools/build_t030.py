# NAS100 EDGE LAB · TRADE #030 · SELL · dom 15 nov 2026, 11 PM Colombia · TikTok y Shorts 1080×1920 (plantilla del TRADE #029)
# Capturas originales sin alterar: solo encuadre, acercamiento y resaltados encima. Lote, dinero y Δ/% del comprobante tapados desde el primer cuadro.
import os, sys, json, shutil
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
from nas_common import KIT, POSES, OVER, GLOW, envelope, lab_svg, align_parts
SCR = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work"); W = f"{SCR}/t030"; TTS = f"{W}/tts"
CAP = f"{H}/../entregas/nas100edgelab/trade030/capturas"
sys.path.insert(0, f"{H}/t030"); from script import TK, SH
CSS = open(f"{KIT}/nas.css").read() + '''
.viewer .cam img { width:100%; height:100%; display:block; }
.tag3 { position:absolute; padding:8px 18px; border-radius:12px; font-size:30px; font-weight:900; letter-spacing:.08em; background:rgba(9,11,16,.92); white-space:nowrap; }
.kpi { position:absolute; left:0; width:900px; text-align:center; font-weight:900; letter-spacing:-.02em; }
.clipH { position:absolute; left:0; top:0; width:900px; font-size:60px; font-weight:900; line-height:1.02; letter-spacing:-.02em; text-transform:uppercase; }
.flash { position:absolute; left:0; top:0; width:1080px; height:1920px; background:#fff; opacity:0; pointer-events:none; }
.gauge { position:absolute; padding:18px 22px 16px; border-radius:22px; background:rgba(9,11,16,.95); border:3px solid var(--v); box-shadow:0 0 40px rgba(167,121,242,.35); }
.gauge .a { font-size:24px; font-weight:900; letter-spacing:.16em; color:var(--mu); }
.gauge .b { font-size:86px; font-weight:900; color:var(--v); line-height:1; margin-top:4px; }
.gauge .seg { position:relative; display:flex; gap:6px; margin-top:14px; }
.gauge .seg i { flex:1; height:22px; border-radius:5px; background:#2A2F3D; }
.gauge .seg i.on { background:var(--v); }
.gauge .mk { position:absolute; top:-9px; width:5px; height:40px; border-radius:3px; background:var(--g); box-shadow:0 0 12px rgba(100,224,135,.8); }
.gauge .ml { font-size:24px; font-weight:900; letter-spacing:.12em; color:var(--g); margin-top:8px; }
.chip2 { position:absolute; padding:10px 18px; border-radius:14px; background:rgba(9,11,16,.94); font-size:30px; font-weight:900; letter-spacing:.04em; white-space:nowrap; border:3px solid; }
.wbar { position:absolute; height:56px; border-radius:14px; transform-origin:0 50%; }
.gaugeH { display:flex; align-items:center; gap:26px; width:900px; padding:14px 24px; }
.gaugeH .bx { flex:1; }
.gaugeH .seg { margin-top:0; }
.wlb { position:absolute; font-size:24px; font-weight:900; letter-spacing:.08em; white-space:nowrap; }
'''
JSH = open(f"{H}/t027.js").read().split("// ===== guion por versión")[0]   # motor NAS: Explorador, laboratorio vivo, transiciones
JS = JSH + open(f"{H}/t030.js").read()


def chart_ov():   # resaltados sobre la captura de TradingView (511×748); no se mueven velas ni niveles
    L = lambda c, x, y, w, t, col, fs=17: (f'<g class="{c}" opacity="0"><rect x="{x}" y="{y}" width="{w}" height="32" rx="8" fill="#090B10"/>'
                                           f'<text x="{x + w / 2:.0f}" y="{y + 22}" font-family="Inter" font-weight="900" font-size="{fs}" text-anchor="middle" fill="{col}">{t}</text></g>')
    return ('<svg width="511" height="748" viewBox="0 0 511 748">'
            '<rect class="hiE" x="64" y="300" width="224" height="13" rx="6" fill="none" stroke="#A779F2" stroke-width="4" opacity="0"/>'
            '<rect class="hiT" x="64" y="380" width="224" height="13" rx="6" fill="none" stroke="#64E087" stroke-width="4" opacity="0"/>'
            '<path class="hiD" d="M76 300 L92 352 L106 392 L133 476" fill="none" stroke="#FF6474" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>'
            '<rect class="hiP" x="118" y="326" width="170" height="160" rx="12" fill="none" stroke="#3FD0C9" stroke-width="4" opacity="0"/>'
            '<rect class="hiA" x="292" y="340" width="216" height="388" rx="14" fill="none" stroke="#A779F2" stroke-width="4" stroke-dasharray="10 8" opacity="0"/>'
            + L("lbE", 150, 258, 170, "ENTRADA · TV", "#A779F2") + L("lbT", 150, 398, 130, "OBJETIVO", "#64E087") + L("lbD", 4, 486, 130, "DESCENSO", "#FF6474")
            + L("lbP", 140, 492, 190, "PAUSAS Y REBOTES", "#3FD0C9", 15) + L("lbA", 300, 300, 200, "DESPUÉS DEL TP", "#A779F2", 16) + '</svg>')
def receipt30():   # comprobante 828×428 mostrado a 900 de ancho: lote, dinero y Δ/% tapados SIEMPRE desde el primer cuadro
    k = 900 / 828; Hh = round(428 * k); R = lambda x, y, w, h: f'x="{x*k:.0f}" y="{y*k:.0f}" width="{w*k:.0f}" height="{h*k:.0f}"'
    T = lambda x, y, s, c, t, ls=0: f'<text x="{x*k:.0f}" y="{y*k:.0f}" font-family="Inter" font-weight="900" font-size="{s}" text-anchor="middle" fill="{c}" letter-spacing="{ls}">{t}</text>'
    return (f'<svg width="900" height="{Hh}" viewBox="0 0 900 {Hh}">'
            f'<rect class="rhE" {R(24, 132, 360, 46)} rx="10" fill="none" stroke="#A779F2" stroke-width="5" opacity="0"/>'
            f'<rect class="rhD" {R(24, 246, 600, 42)} rx="10" fill="none" stroke="#3FD0C9" stroke-width="5" opacity="0"/>'
            f'<rect class="rhT" {R(24, 356, 320, 40)} rx="10" fill="none" stroke="#64E087" stroke-width="5" opacity="0"/>'
            f'<g class="cvL"><rect {R(22, 22, 210, 50)} rx="12" fill="#13161F" stroke="#FF6474" stroke-width="3"/>{T(127, 55, 20, "#F4F5F9", "NAS100 · SELL · TP")}</g>'
            f'<g class="cvM"><rect {R(596, 124, 220, 64)} rx="12" fill="#13161F" stroke="#64E087" stroke-width="3"/>{T(706, 148, 16, "#F4F5F9", "RESULTADO EN PUNTOS", 1)}{T(706, 178, 28, "#64E087", "+101,65 pts")}</g>'
            f'<g class="cvP"><rect {R(22, 182, 330, 42)} rx="10" fill="#13161F" stroke="#3FD0C9" stroke-width="3"/>{T(187, 210, 19, "#F4F5F9", "DURACIÓN · 1 H 10 MIN 08 S")}</g>'
            '</svg>')
def VW(id, top, h, ov, note=""):
    return (f'<div class="viewer" id="{id}" style="left:0;top:{top}px;width:900px;height:{h}px"><div class="cam" style="width:511px;height:748px"><img src="assets/img/chart30.jpg" alt="" />{ov}</div>'
            + (f'<div class="vnote">{note}</div>' if note else '') + '</div>')
GSEG = "".join(f'<i class="{"on" if k < 6 else ""}"></i>' for k in range(10)) + '<div class="mk" style="left:calc(60% - 5px)"></div>'
GAUGEH = f'<div><div class="a">SCORE</div><div class="b">6/10</div></div><div class="bx"><div class="seg">{GSEG}</div><div class="ml">MÍNIMO 6 · JUSTO EN EL LÍMITE</div></div>'
CH = lambda i, top, left, col, t: f'<div class="chip2 fx" id="{i}" style="left:{left}px;top:{top}px;color:{col};border-color:{col}">{t}</div>'
RED, TQ, VI, MU = "#FF6474", "#3FD0C9", "#A779F2", "rgba(244,245,249,.6)"

def learn_tk(C):
    s1 = C("sC1", f"""<div class="ttl"><div class="n">CONCLUSIÓN 1</div><div class="h" style="font-size:48px">EL MÍNIMO NO ES UNA<br/>CONFIRMACIÓN PERFECTA</div></div>
<div class="gauge fx" id="c1g" style="left:0;top:170px;width:400px"><div class="a">SCORE</div><div class="b">6/10</div><div class="seg">{GSEG}</div><div class="ml">MÍNIMO REQUERIDO: 6</div></div>
<div class="chip2 fx" id="c1r" style="left:440px;top:180px;color:var(--mu);border-color:{MU}">RADAR: BULL +1 / BEAR +1</div>
<div class="chip2 fx" id="c1e" style="left:440px;top:256px;color:var(--t);border-color:var(--t)">BAJO EMA 21 Y EMA 200</div>
<div class="chip2 fx" id="c1c" style="left:440px;top:332px;color:#FF6474;border-color:#FF6474">FAVORABLE SELL</div>
<div class="stampV fx" id="c1s" style="left:90px;top:470px;font-size:40px">CONSERVAR EL MATIZ PARA COMPARAR</div>""")
    s2 = C("sC2", f"""<div class="ttl"><div class="n">CONCLUSIÓN 2</div><div class="h" style="font-size:48px">EL PLAN Y LA EJECUCIÓN<br/>TIENEN PRECIOS DISTINTOS</div></div>
<div class="cardx fx" id="c2a" style="top:180px;width:420px;border:3px solid var(--v)"><div class="a v">TRADINGVIEW · PLAN</div><div class="b" style="font-size:40px">27.813,8 → 27.713,8</div><div class="c">Objetivo de referencia: 100 puntos</div></div>
<div class="cardx fx" id="c2b" style="top:180px;left:480px;width:420px;border:3px solid var(--g)"><div class="a g">BRÓKER · EJECUCIÓN</div><div class="b g" style="font-size:40px">27.822,50 → 27.720,85</div><div class="c">Desplazamiento: +101,65 puntos</div></div>
<div class="neq fx" id="c2n" style="top:236px">≠</div>
<div class="stampV fx" id="c2s" style="left:150px;top:470px">DOCUMENTAMOS AMBAS FUENTES</div>""")
    s3 = C("sC3", f"""<div class="ttl"><div class="n">CONCLUSIÓN 3</div><div class="h" style="font-size:46px">LO QUE RECORRE LA SESIÓN<br/>NO ES LO QUE CAPTURAMOS</div></div>
<div class="cardx fx" id="c3t" style="top:170px;width:420px;border:3px solid var(--g)"><div class="a g">RESULTADO DEL TRADE · BRÓKER</div><div class="b g" style="font-size:52px">+101,65 PTS</div><div class="c">Ejecutado · 1 h 10 min 08 s</div></div>
<div class="cardx fx" id="c3m" style="top:170px;left:480px;width:420px;border:3px dashed var(--t)"><div class="a t">RECORRIDO DE SESIÓN · TRADINGVIEW</div><div class="b" style="font-size:40px"><span class="t">392</span> A FAVOR · <span class="r">38</span> EN CONTRA</div><div class="c">Incluye movimiento posterior a la salida</div></div>
<div class="note fx" id="c3n" style="left:0;top:420px;width:900px;font-size:24px;color:var(--mu)">Seguimiento hasta el lunes 16 nov, 8:59 a. m. (Colombia) · no se suma al trade</div>
<div class="stampV fx" id="c3s" style="left:250px;top:480px">NO SE SUMAN</div>""")
    return s1 + "\n" + s2 + "\n" + s3

def body(V, DUR, caps):
    tk = V == "tiktok"
    ch = ["GANCHO", "ENTRADA", "DESARROLLO", "EJECUCIÓN", "CONCLUSIÓN 1", "CONCLUSIÓN 2", "CONCLUSIÓN 3", "CIERRE"] if tk else ["GANCHO", "ENTRADA", "DESARROLLO", "EJECUCIÓN", "APRENDIZAJES", "CIERRE"]
    n = [10]
    def TI(): n[0] += 1; return n[0]
    C = lambda i, inner: f'<div id="{i}" class="clip scene fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">{inner}</div>'
    imgs = "".join(f'<img id="av_{k}" class="pose" src="assets/avatar/{k}.webp" alt="" />' for k in POSES)
    imgs += "".join(f'<img id="av_{k}" class="ov" src="assets/avatar/{k}.webp" alt="" />' for k in OVER)
    imgs += "".join(f'<img id="gl_{k}" class="gl" src="assets/avatar/gl_{k}.webp" alt="" />' for k in GLOW)
    first = C("sG", f"""<div class="clipH fx" id="g_1" style="font-size:60px"><span style="color:#A779F2">SCORE 6/10</span><br/>JUSTO EN EL MÍNIMO</div>
<div class="gauge gaugeH fx" id="gS" style="left:0;top:142px">{GAUGEH}</div>
{VW("gv", 290, 250, chart_ov())}
{CH("g_r", 552, 0, MU, "RADAR: BULL +1 / BEAR +1 · EMPATADO")}
<div class="tag3 fx" id="g_q" style="left:0;top:616px;color:var(--t);border:3px solid var(--t)">¿QUÉ PASÓ CON ESTA VENTA?</div>""")
    entry = C("sE", f"""<div class="dpill fx" id="e_d">15 NOV · 11 PM COLOMBIA</div><div class="dpill fx" id="e_p" style="left:470px;border-color:rgba(255,100,116,.8);color:#FF6474">SELL</div>
{VW("cvE", 70, 300, chart_ov())}<div class="note fx" id="e_n" style="left:640px;top:376px;width:260px;font-size:19px;text-align:right">Gráfico: TradingView</div>
<div class="tag3 fx" id="e_tv" style="left:0;top:384px;color:var(--v);border:3px solid var(--v);font-size:28px">ENTRADA TRADINGVIEW: 27.813,8</div>
{CH("e_s", 448, 0, VI, "SCORE 6/10 · MÍNIMO 6")}{CH("e_m", 448, 420, TQ, "BAJO EMA 21 Y EMA 200")}
{CH("e_c", 518, 0, RED, "CONFLUENCIA: FAVORABLE SELL")}{CH("e_q", 518, 600, MU, "QUALITY 60/100")}
{CH("e_r", 588, 0, MU, "RADAR: BULL +1 / BEAR +1")}{CH("e_a", 588, 490, RED, "ATR 84 · ALTO / RIESGO")}
<div class="tag3 fx" id="e_x" style="left:0;top:660px;color:var(--mu);border:3px solid {MU};font-size:24px">{'INFORMACIÓN ANTES DE CONOCER EL RESULTADO · VENTANA 11 PM ASIA' if tk else 'QUALITY = PUNTUACIÓN DEL INDICADOR, NO PROBABILIDAD'}</div>""")
    if tk: learn = learn_tk(C)
    else:
        L3 = [("1 · CUMPLIR EL MÍNIMO ≠ TODO ALINEADO", "Score 6/10 justo en el mínimo · radar empatado: Bull +1 / Bear +1", "var(--v)"),
              ("2 · TRADINGVIEW Y BRÓKER, POR SEPARADO", "TV 27.813,8 → 27.713,8 · bróker 27.822,50 → 27.720,85", "var(--g)"),
              ("3 · 392 A FAVOR · 38 EN CONTRA", "Recorrido de sesión · TradingView · incluye movimiento posterior a la salida · no son puntos capturados", "var(--t)")]
        cards = "".join(f'<div class="cardx fx" id="cl{k}" style="top:{140 + k * 175}px;border:3px solid {c}"><div class="b" style="font-size:34px">{t}</div><div class="c">{s}</div></div>' for k, (t, s, c) in enumerate(L3))
        learn = C("sC", f'<div class="ttl"><div class="n">¿QUÉ ANOTAMOS?</div><div class="h" style="font-size:52px">TRES APRENDIZAJES</div></div>\n{cards}')
    rh = round(428 * 900 / 828)
    sD = C("sD", f"""{VW("cvD", 74, 566, chart_ov())}<div class="note fx" id="d_n" style="left:0;top:650px;width:900px;font-size:22px;font-weight:800"><span style="color:#A779F2">▬ ENTRADA TV</span> &nbsp;<span style="color:#64E087">▬ OBJETIVO</span> &nbsp;<span style="color:#FF6474">▬ DESCENSO</span> &nbsp;<span style="color:#3FD0C9">▢ PAUSAS Y REBOTES</span> &nbsp;· TradingView</div>
<div class="tag3 fx" id="d_a" style="left:0;top:0;color:#FF6474;border:3px solid #FF6474">DESCENSO HACIA EL OBJETIVO</div>
<div class="tag3 fx" id="d_b" style="left:0;top:0;color:var(--t);border:3px solid var(--t)">PAUSAS Y REBOTES EN EL RECORRIDO</div>""")
    sR = C("sR", f"""<div class="tag3 fx" id="r_src" style="left:0;top:-58px;color:#64E087;border:3px solid #64E087;font-size:24px">BRÓKER · COMPROBANTE DE EJECUCIÓN</div>
<div class="rcard" id="rc30" style="height:{rh}px"><img src="assets/img/receipt30.jpg" alt="" style="width:900px;height:{rh}px" />{receipt30()}</div>
<div class="tpbig fx" id="rtp" style="top:{20 + rh + 12}px">TP · +<span id="nR">101,65</span> PUNTOS<small>BRÓKER: 27.822,50 → 27.720,85 · 1 H 10 MIN 08 S</small></div>
<div class="note fx" id="rn" style="left:0;top:668px;font-size:21px">Reloj del bróker: 16/11/2026 06:04:42 → 07:14:50 · fecha editorial: dom 15 nov, 11 PM Colombia</div>""")
    end_h = ('<span>No buscamos operaciones perfectas.</span>' if tk else '') + '<span class="v">Buscamos ventaja estadística.</span>'
    chs = "".join(f'<span class="ch" id="ch{i}">{x}</span>' for i, x in enumerate(ch))
    cps = "".join(f'<div class="cp" id="cp{i}">{x[2]}</div>' for i, x in enumerate(caps))
    return f"""<div id="lab" class="clip" data-start="0" data-duration="{DUR}" data-track-index="1">{lab_svg()}</div>
<div id="grid"></div>
<div id="hdr" class="clip" data-start="0" data-duration="{DUR}" data-track-index="2">
  <div class="lg" data-layout-allow-overflow><img src="assets/img/logo.png" alt="" /></div>
  <div class="hl"><span class="nm">NAS100 EDGE LAB</span><span class="tr">TRADE #030 · SELL · 15 NOV 2026</span></div>
  <div id="chs">{chs}</div>
</div>
<div id="pbw" class="clip" data-start="0" data-duration="{DUR}" data-track-index="3"><div id="pb"></div></div>
{first}
{entry}
{sD}
{sR}
{learn}
<div id="sEnd" class="clip fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}" style="position:absolute;left:90px;top:300px;width:900px;height:690px">
  <div class="kpi fx" id="eK" style="top:0;font-size:54px">TRADE #030 · SELL · TP</div>
  <div class="kpi fx" id="eN" style="top:80px;font-size:124px;color:var(--g);text-shadow:0 0 50px rgba(100,224,135,.45)">+<span id="nT">101,65</span></div>
  <div class="kpi fx" id="eU" style="top:226px;font-size:44px">PUNTOS EJECUTADOS</div>
  <div class="H" style="position:absolute;top:340px;font-size:50px">{end_h}</div>
  <div class="note fx" id="eS" style="left:0;top:560px;width:900px;font-size:22px;color:var(--mu)">Resultado en puntos del comprobante del bróker · una operación documentada.</div>
</div>
<div id="caps" class="clip" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">{cps}</div>
<div id="av" class="clip" data-layout-allow-overflow data-start="0" data-duration="{DUR}" data-track-index="{TI()}"><div id="avGlow"></div><div id="avIn">{imgs}</div></div>
<div id="disc" class="clip fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">Contenido educativo · No es asesoría financiera · Operar implica riesgo de pérdida</div>
<div id="flash" class="clip flash" data-start="0" data-duration="{DUR}" data-track-index="{TI()}"></div>"""

for V, L in [("tiktok", TK), ("shorts", SH)]:
    st = json.load(open(f"{TTS}/{V}_times.json")); T = {nm: [s, round(s + d, 3)] for nm, s, d in st}
    DUR = round(st[-1][1] + st[-1][2] + (0.7 if V == "tiktok" else 1.0), 1)
    d = f"{SCR}/t030-{V}"
    for sub in ["img", "avatar", "audio"]: os.makedirs(f"{d}/assets/{sub}", exist_ok=True)
    for sub in ["fonts", "vendor", "avatar"]: shutil.copytree(f"{KIT}/assets/{sub}", f"{d}/assets/{sub}", dirs_exist_ok=True)
    shutil.copy(f"{KIT}/assets/img/logo.png", f"{d}/assets/img/"); shutil.copy(f"{KIT}/hyperframes.json", d)
    shutil.copy(f"{CAP}/grafico_030.jpg", f"{d}/assets/img/chart30.jpg"); shutil.copy(f"{CAP}/comprobante_030.jpg", f"{d}/assets/img/receipt30.jpg")
    json.dump({"name": f"t030-{V}", "private": True, "type": "module"}, open(d + "/package.json", "w")); json.dump({"id": f"t030-{V}", "name": f"t030-{V}"}, open(d + "/meta.json", "w"))
    capm = {i: c for i, _, c in L}; vozm = {i: v for i, v, _ in L}; caps = []
    import numpy as np, soundfile as sf
    for n_, s, du in st:   # una línea por tramo del |; cortes ubicados con la alineación Whisper de la voz (align_parts)
        parts = capm[n_].split("|"); x, sr = sf.read(f"{TTS}/{n_}.wav"); nz = np.where(np.abs(x) > 0.004)[0]; x = x[max(0, nz[0] - 240):nz[-1] + 480]
        sf.write(f"{TTS}/_frase.wav", x, sr)
        for p, (a0, b0) in zip(parts, align_parts(f"{TTS}/_frase.wav", vozm[n_], parts) if len(parts) > 1 else [(0, du)]): caps.append([round(s + a0, 2), round(s + b0, 2), p])
    for k in range(len(caps) - 1): caps[k][1] = round(min(caps[k + 1][0], caps[k][1] + 0.5), 2)
    caps[-1][1] = round(caps[-1][1] + 0.6, 2)
    ENV = envelope(f"{TTS}/{V}_narr.wav", DUR)
    html = f'''<!doctype html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=1080, height=1920" />
<title>NAS100 EDGE LAB · Trade #030 · {V}</title><script src="assets/vendor/gsap.min.js"></script>
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
