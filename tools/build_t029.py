# NAS100 EDGE LAB · TRADE #029 · BUY · lun 9 nov 2026, 10 AM Colombia · TikTok y Shorts 1080×1920 (plantilla del TRADE #028)
# Capturas originales sin alterar: solo encuadre, acercamiento y resaltados encima. Lote, dinero y Δ/% del comprobante tapados desde el primer cuadro.
import os, sys, json, shutil
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
from nas_common import KIT, POSES, OVER, GLOW, envelope, lab_svg, align_parts
SCR = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work"); W = f"{SCR}/t029"; TTS = f"{W}/tts"
CAP = f"{H}/../entregas/nas100edgelab/trade029/capturas"
sys.path.insert(0, f"{H}/t029"); from script import TK, SH
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
JS = JSH + open(f"{H}/t029.js").read()

def chart_ov():   # resaltados sobre la captura de TradingView (613×1127); no se mueven velas ni niveles
    L = lambda c, x, y, w, t, col, fs=19: (f'<g class="{c}" opacity="0"><rect x="{x}" y="{y}" width="{w}" height="36" rx="9" fill="#090B10"/>'
                                           f'<text x="{x + w / 2:.0f}" y="{y + 25}" font-family="Inter" font-weight="900" font-size="{fs}" text-anchor="middle" fill="{col}">{t}</text></g>')
    return ('<svg width="613" height="1127" viewBox="0 0 613 1127">'
            '<rect class="hiE" x="92" y="598" width="440" height="14" rx="7" fill="none" stroke="#A779F2" stroke-width="5" opacity="0"/>'
            '<rect class="hiT" x="92" y="486" width="440" height="16" rx="8" fill="none" stroke="#64E087" stroke-width="5" opacity="0"/>'
            '<rect class="hiI" x="84" y="352" width="78" height="264" rx="12" fill="none" stroke="#3FD0C9" stroke-width="5" opacity="0"/>'
            '<rect class="hiP" x="174" y="200" width="434" height="340" rx="16" fill="none" stroke="#A779F2" stroke-width="5" opacity="0"/>'
            + L("lbE", 300, 622, 140, "ENTRADA", "#A779F2") + L("lbT", 300, 540, 140, "OBJETIVO", "#64E087") + L("lbI", 8, 250, 140, "IMPULSO", "#3FD0C9")
            + L("lbP", 240, 140, 300, "PAUSAS Y NUEVOS AVANCES", "#A779F2", 17) + '</svg>')
def receipt29():   # comprobante 828×440 mostrado a 900 de ancho: lote, dinero y Δ/% tapados SIEMPRE desde el primer cuadro
    k = 900 / 828; Hh = round(440 * k); R = lambda x, y, w, h: f'x="{x*k:.0f}" y="{y*k:.0f}" width="{w*k:.0f}" height="{h*k:.0f}"'
    T = lambda x, y, s, c, t, ls=0: f'<text x="{x*k:.0f}" y="{y*k:.0f}" font-family="Inter" font-weight="900" font-size="{s}" text-anchor="middle" fill="{c}" letter-spacing="{ls}">{t}</text>'
    return (f'<svg width="900" height="{Hh}" viewBox="0 0 900 {Hh}">'
            f'<rect class="rhE" {R(24, 140, 360, 52)} rx="10" fill="none" stroke="#A779F2" stroke-width="5" opacity="0"/>'
            f'<rect class="rhD" {R(24, 258, 600, 44)} rx="10" fill="none" stroke="#3FD0C9" stroke-width="5" opacity="0"/>'
            f'<rect class="rhT" {R(24, 368, 320, 40)} rx="10" fill="none" stroke="#64E087" stroke-width="5" opacity="0"/>'
            f'<g class="cvL"><rect {R(112, 26, 300, 52)} rx="12" fill="#13161F" stroke="#3FD0C9" stroke-width="3"/>{T(262, 60, 22, "#F4F5F9", "BUY · TAKE PROFIT")}</g>'
            f'<g class="cvM"><rect {R(600, 138, 215, 64)} rx="12" fill="#13161F" stroke="#64E087" stroke-width="3"/>{T(707, 162, 16, "#F4F5F9", "RESULTADO EN PUNTOS", 1)}{T(707, 192, 28, "#64E087", "+100,82 pts")}</g>'
            f'<g class="cvP"><rect {R(24, 198, 330, 42)} rx="10" fill="#13161F" stroke="#3FD0C9" stroke-width="3"/>{T(189, 226, 19, "#F4F5F9", "DURACIÓN · 30 MIN 13 S")}</g>'
            '</svg>')
def VW(id, top, h, ov, note=""):
    return (f'<div class="viewer" id="{id}" style="left:0;top:{top}px;width:900px;height:{h}px"><div class="cam" style="width:613px;height:1127px"><img src="assets/img/chart29.jpg" alt="" />{ov}</div>'
            + (f'<div class="vnote">{note}</div>' if note else '') + '</div>')
GSEG = "".join(f'<i class="{"on" if k < 8 else ""}"></i>' for k in range(10)) + '<div class="mk" style="left:calc(60% - 5px)"></div>'
GAUGEH = f'<div><div class="a">SCORE</div><div class="b">8/10</div></div><div class="bx"><div class="seg">{GSEG}</div><div class="ml">MÍNIMO 6 · SEÑAL DE COMPRA</div></div>'
CH = lambda i, top, left, col, t: f'<div class="chip2 fx" id="{i}" style="left:{left}px;top:{top}px;color:{col};border-color:{col}">{t}</div>'
RED, TQ = "#FF6474", "#3FD0C9"

def learn_tk(C):
    s1 = C("sC1", f'''<div class="ttl"><div class="n">APRENDIZAJE 1</div><div class="h" style="font-size:50px">DIRECCIÓN Y VOLATILIDAD<br/>SE LEEN POR SEPARADO</div></div>
<div class="cardx fx" id="c1a" style="top:180px;width:420px;border:3px solid var(--t)"><div class="a t">DIRECCIÓN</div><div class="b" style="font-size:42px">BUY · SCORE 8/10</div><div class="c">Sobre EMA 21 y EMA 200 · favorable buy</div></div>
<div class="cardx fx" id="c1b" style="top:180px;left:480px;width:420px;border:3px solid #FF6474"><div class="a r">VOLATILIDAD</div><div class="b r" style="font-size:42px">ATR 94 PTS</div><div class="c">Panel: ALTO / RIESGO</div></div>
<div class="neq fx" id="c1n" style="top:236px;font-size:52px">+</div>
<div class="stampV fx" id="c1s" style="left:150px;top:470px">COMPARAR CON MÁS CASOS</div>''')
    s2 = C("sC2", f'''<div class="ttl"><div class="n">APRENDIZAJE 2</div><div class="h" style="font-size:50px">OBJETIVO PLANEADO,<br/>SALIDA EJECUTADA</div></div>
<div class="cardx fx" id="c2a" style="top:180px;width:420px;border:3px solid var(--v)"><div class="a v">LO QUE PLANEAMOS</div><div class="b" style="font-size:46px">TP · 100 PTS</div><div class="c">Nivel configurado: 27.773,50</div></div>
<div class="cardx fx" id="c2b" style="top:180px;left:480px;width:420px;border:3px solid var(--g)"><div class="a g">LO QUE EJECUTÓ EL BRÓKER</div><div class="b g" style="font-size:46px">+100,82 PTS</div><div class="c">Salida registrada: 27.774,32</div></div>
<div class="neq fx" id="c2n" style="top:236px">≠</div>
<div class="stampV fx" id="c2s" style="left:210px;top:470px">ANOTAMOS AMBAS CIFRAS</div>''')
    s3 = C("sC3", f'''<div class="ttl"><div class="n">APRENDIZAJE 3</div><div class="h" style="font-size:50px">LO QUE PASÓ DESPUÉS<br/>TAMBIÉN SE REGISTRA</div></div>
<div class="mini fx" id="c3m" style="top:160px;text-align:center"><div class="a">RECORRIDO DE SESIÓN · TRADINGVIEW</div><div style="font-size:52px;font-weight:900;margin-top:8px"><span class="t">351 A FAVOR</span> <span class="mu">·</span> <span class="r">94 EN CONTRA</span></div></div>
<div class="wlb fx" id="c3l1" style="left:0;top:360px;color:var(--g)">TRADE · 10:00 → 10:30 AM · +100,82 PTS</div><div class="wbar" id="c3b1" style="left:0;top:398px;width:{900 * 30 / 359:.0f}px;background:var(--g)"></div>
<div class="wlb fx" id="c3l2" style="left:0;top:476px;color:var(--t)">VENTANA DE MEDICIÓN · HASTA 3:59 PM</div><div class="wbar" id="c3b2" style="left:0;top:514px;width:900px;background:linear-gradient(90deg,rgba(63,208,201,.9),rgba(167,121,242,.6))"></div>
<div class="note fx" id="c3n" style="left:0;top:590px;width:900px;font-size:24px;color:var(--mu)">Incluye periodo posterior al TP · no cambia el resultado del trade</div>
<div class="stampV fx" id="c3s" style="left:260px;top:402px">NO CAMBIA EL RESULTADO</div>''')
    return s1 + "\n" + s2 + "\n" + s3

def body(V, DUR, caps):
    tk = V == "tiktok"
    ch = ["ENTRADA", "DESARROLLO", "RESULTADO", "APRENDIZAJE 1", "APRENDIZAJE 2", "APRENDIZAJE 3", "CIERRE"] if tk else ["GANCHO", "ENTRADA", "DESARROLLO", "RESULTADO", "APUNTES", "CIERRE"]
    n = [10]
    def TI(): n[0] += 1; return n[0]
    C = lambda i, inner: f'<div id="{i}" class="clip scene fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">{inner}</div>'
    imgs = "".join(f'<img id="av_{k}" class="pose" src="assets/avatar/{k}.webp" alt="" />' for k in POSES)
    imgs += "".join(f'<img id="av_{k}" class="ov" src="assets/avatar/{k}.webp" alt="" />' for k in OVER)
    imgs += "".join(f'<img id="gl_{k}" class="gl" src="assets/avatar/gl_{k}.webp" alt="" />' for k in GLOW)
    if tk:
        first = C("sG", f'''<div class="clipH fx" id="g_1" style="font-size:54px">BUY CON <span style="color:#A779F2">SCORE 8/10</span> · <span style="color:#FF6474">ATR ALTO</span></div>
<div class="dpill fx" id="e_d" style="top:72px">9 NOV · 10 AM COLOMBIA</div><div class="dpill fx" id="e_p" style="top:72px;left:480px;border-color:rgba(63,208,201,.8);color:#3FD0C9">BUY · 27.673,50</div>
<div class="gauge gaugeH fx" id="gS" style="left:0;top:142px">{GAUGEH}</div>
{VW("gv", 290, 272, chart_ov())}<div class="note fx" id="g_n" style="left:640px;top:648px;width:260px;font-size:19px;text-align:right">Gráfico: TradingView</div>
{CH("e_m", 574, 0, TQ, "SOBRE EMA 21 Y EMA 200")}{CH("e_c", 574, 560, TQ, "FAVORABLE BUY")}{CH("e_a", 636, 0, RED, "ATR 94 PTS · ALTO / RIESGO")}''')
        entry, learn = "", learn_tk(C)
    else:
        first = C("sG", f'''<div class="clipH fx" id="g_1" style="font-size:58px">SCORE 8 PARA COMPRAR<br/><span style="color:#FF6474">CON VOLATILIDAD ALTA</span></div>
<div class="gauge gaugeH fx" id="gS" style="left:0;top:138px">{GAUGEH}</div>
{VW("gv", 286, 340, chart_ov())}
<div class="tag3 fx" id="g_q" style="left:0;top:636px;color:var(--t);border:3px solid var(--t)">TRADE #029 · BUY</div>''')
        entry = C("sE", f'''<div class="dpill fx" id="e_d">9 NOV · 10 AM COLOMBIA</div><div class="dpill fx" id="e_p" style="left:480px;border-color:rgba(63,208,201,.8);color:#3FD0C9">BUY · 27.673,50</div>
{VW("cvE", 70, 420, chart_ov())}<div class="note fx" id="e_n" style="left:640px;top:590px;width:260px;font-size:19px;text-align:right">Gráfico: TradingView</div>
{CH("e_m", 505, 0, TQ, "SOBRE EMA 21 Y EMA 200")}{CH("e_a", 575, 0, RED, "ATR 94 PTS · ALTO / RIESGO")}''')
        L3 = [("1 · SEÑAL Y VOLATILIDAD, POR SEPARADO", "Buy score 8/10 · ATR 94 pts marcado alto", "var(--t)"),
              ("2 · OBJETIVO 100 ≠ EJECUCIÓN 100,82", "TP 27.773,50 · salida registrada 27.774,32", "var(--g)"),
              ("3 · 351 A FAVOR · 94 EN CONTRA", "Seguimiento de sesión · TradingView · hasta las 3:59 p. m. · incluye periodo posterior al TP · no es lo capturado", "var(--v)")]
        cards = "".join(f'<div class="cardx fx" id="cl{k}" style="top:{140 + k * 175}px;border:3px solid {c}"><div class="b" style="font-size:36px">{t}</div><div class="c">{s}</div></div>' for k, (t, s, c) in enumerate(L3))
        learn = C("sC", f'<div class="ttl"><div class="n">¿QUÉ ANOTAMOS?</div><div class="h" style="font-size:52px">TRES APUNTES</div></div>\n{cards}')
    rh = round(440 * 900 / 828)
    sD = C("sD", f'''{VW("cvD", 74, 566, chart_ov())}<div class="note fx" id="d_n" style="left:0;top:650px;width:900px;font-size:22px;font-weight:800"><span style="color:#A779F2">▬ ENTRADA</span> &nbsp;<span style="color:#64E087">▬ TP</span> &nbsp;<span style="color:#3FD0C9">▢ IMPULSO</span> &nbsp;<span style="color:#A779F2">▢ DESPUÉS DEL TP</span> &nbsp;· TradingView</div>
<div class="tag3 fx" id="d_a" style="left:0;top:0;color:var(--t);border:3px solid var(--t)">IMPULSO QUE ATRAVESÓ EL OBJETIVO</div>
<div class="tag3 fx" id="d_b" style="left:0;top:0;color:var(--v);border:3px solid var(--v)">PAUSAS Y NUEVOS AVANCES · DESPUÉS DEL TP</div>''')
    sR = C("sR", f'''<div class="rcard" id="rc29" style="height:{rh}px"><img src="assets/img/receipt29.jpg" alt="" style="width:900px;height:{rh}px" />{receipt29()}</div>
<div class="tpbig fx" id="rtp" style="top:{20 + rh + 12}px">TAKE PROFIT · +<span id="nR">100,82</span> PTS<small>27.673,50 → 27.774,32 · 30 MIN 13 S</small></div>
<div class="note fx" id="rn" style="left:0;top:668px;font-size:21px">Ejecución: comprobante del bróker (reloj del bróker) · TP configurado: 27.773,50</div>''')
    end_h = ('<span>No buscamos operaciones perfectas.</span>' if tk else '') + '<span class="v">Buscamos ventaja estadística.</span>'
    chs = "".join(f'<span class="ch" id="ch{i}">{x}</span>' for i, x in enumerate(ch))
    cps = "".join(f'<div class="cp" id="cp{i}">{x[2]}</div>' for i, x in enumerate(caps))
    return f'''<div id="lab" class="clip" data-start="0" data-duration="{DUR}" data-track-index="1">{lab_svg()}</div>
<div id="grid"></div>
<div id="hdr" class="clip" data-start="0" data-duration="{DUR}" data-track-index="2">
  <div class="lg" data-layout-allow-overflow><img src="assets/img/logo.png" alt="" /></div>
  <div class="hl"><span class="nm">NAS100 EDGE LAB</span><span class="tr">TRADE #029 · BUY · 9 NOV 2026</span></div>
  <div id="chs">{chs}</div>
</div>
<div id="pbw" class="clip" data-start="0" data-duration="{DUR}" data-track-index="3"><div id="pb"></div></div>
{first}
{entry}
{sD}
{sR}
{learn}
<div id="sEnd" class="clip fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}" style="position:absolute;left:90px;top:300px;width:900px;height:690px">
  <div class="kpi fx" id="eK" style="top:0;font-size:54px">TRADE #029 · BUY · TP</div>
  <div class="kpi fx" id="eN" style="top:80px;font-size:124px;color:var(--g);text-shadow:0 0 50px rgba(100,224,135,.45)">+<span id="nT">100,82</span></div>
  <div class="kpi fx" id="eU" style="top:226px;font-size:44px">PUNTOS</div>
  <div class="H" style="position:absolute;top:340px;font-size:50px">{end_h}</div>
  <div class="note fx" id="eS" style="left:0;top:560px;width:900px;font-size:22px;color:var(--mu)">Resultado en puntos del comprobante del bróker · una operación documentada.</div>
</div>
<div id="caps" class="clip" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">{cps}</div>
<div id="av" class="clip" data-layout-allow-overflow data-start="0" data-duration="{DUR}" data-track-index="{TI()}"><div id="avGlow"></div><div id="avIn">{imgs}</div></div>
<div id="disc" class="clip fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">Contenido educativo · No es asesoría financiera · Operar implica riesgo de pérdida</div>
<div id="flash" class="clip flash" data-start="0" data-duration="{DUR}" data-track-index="{TI()}"></div>'''

for V, L in [("tiktok", TK), ("shorts", SH)]:
    st = json.load(open(f"{TTS}/{V}_times.json")); T = {nm: [s, round(s + d, 3)] for nm, s, d in st}
    DUR = round(st[-1][1] + st[-1][2] + (0.6 if V == "tiktok" else 1.6), 1)
    d = f"{SCR}/t029-{V}"
    for sub in ["img", "avatar", "audio"]: os.makedirs(f"{d}/assets/{sub}", exist_ok=True)
    for sub in ["fonts", "vendor", "avatar"]: shutil.copytree(f"{KIT}/assets/{sub}", f"{d}/assets/{sub}", dirs_exist_ok=True)
    shutil.copy(f"{KIT}/assets/img/logo.png", f"{d}/assets/img/"); shutil.copy(f"{KIT}/hyperframes.json", d)
    shutil.copy(f"{CAP}/grafico_029.jpg", f"{d}/assets/img/chart29.jpg"); shutil.copy(f"{CAP}/comprobante_029.jpg", f"{d}/assets/img/receipt29.jpg")
    json.dump({"name": f"t029-{V}", "private": True, "type": "module"}, open(d + "/package.json", "w")); json.dump({"id": f"t029-{V}", "name": f"t029-{V}"}, open(d + "/meta.json", "w"))
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
<title>NAS100 EDGE LAB · Trade #029 · {V}</title><script src="assets/vendor/gsap.min.js"></script>
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
