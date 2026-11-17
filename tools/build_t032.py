# NAS100 EDGE LAB · TRADE #032 · SELL nocturno · lun 16 nov 2026, 11:00 p. m. Colombia · TikTok y Shorts 1080×1920 (plantilla del TRADE #031)
# Capturas originales sin alterar: solo encuadre, acercamiento y resaltados encima. Lote, dinero y Δ/% del comprobante tapados desde el primer cuadro.
import os, sys, json, shutil
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
from nas_common import KIT, POSES, OVER, GLOW, envelope, lab_svg, align_parts
SCR = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work"); W = f"{SCR}/t032"; TTS = f"{W}/tts"
CAP = f"{H}/../entregas/nas100edgelab/trade032/capturas"
sys.path.insert(0, f"{H}/t032"); from script import TK, SH
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
JS = JSH + open(f"{H}/t032.js").read()




def chart_ov():   # resaltados sobre la captura de TradingView (309×543); niveles de TradingView rotulados como REFERENCIAS; no se mueven velas
    L = lambda c, x, y, w, t, col, fs=13: (f'<g class="{c}" opacity="0"><rect x="{x}" y="{y}" width="{w}" height="24" rx="6" fill="#090B10"/>'
                                           f'<text x="{x + w / 2:.0f}" y="{y + 16}" font-family="Inter" font-weight="900" font-size="{fs}" text-anchor="middle" fill="{col}">{t}</text></g>')
    return ('<svg width="309" height="543" viewBox="0 0 309 543">'
            '<rect class="hiS" x="54" y="186" width="157" height="10" rx="5" fill="none" stroke="#FF6474" stroke-width="3" opacity="0"/>'
            '<rect class="hiE" x="54" y="266" width="157" height="11" rx="5" fill="none" stroke="#A779F2" stroke-width="3.5" opacity="0"/>'
            '<rect class="hiT" x="54" y="346" width="157" height="11" rx="5" fill="none" stroke="#64E087" stroke-width="3.5" opacity="0"/>'
            '<rect class="hiD" x="58" y="254" width="76" height="112" rx="9" fill="none" stroke="#FF6474" stroke-width="3.5" opacity="0"/>'
            '<rect class="hiP" x="134" y="276" width="80" height="90" rx="9" fill="none" stroke="#3FD0C9" stroke-width="3.5" opacity="0"/>'
            '<rect class="hiA" x="212" y="196" width="95" height="316" rx="10" fill="none" stroke="#A779F2" stroke-width="3.5" stroke-dasharray="8 6" opacity="0"/>'
            + L("lbS", 58, 200, 150, "STOP TV · 27.431,3", "#FF6474", 12) + L("lbE", 2, 238, 150, "ENTRADA TV · 27.331,3", "#A779F2", 11) + L("lbT", 2, 362, 160, "OBJETIVO TV · 27.231,3", "#64E087", 11)
            + L("lbD", 58, 380, 90, "DESCENSO", "#FF6474", 12) + L("lbP", 140, 380, 80, "REBOTE", "#3FD0C9", 12) + L("lbA", 196, 516, 112, "TRAS EL CIERRE", "#A779F2", 11) + '</svg>')
def receipt32():   # comprobante 828×414 mostrado a 900: lote, dinero, Δ/%, línea superior cortada y fila inferior tapados SIEMPRE desde el primer cuadro
    k = 900 / 828; Hh = round(414 * k); R = lambda x, y, w, h: f'x="{x*k:.0f}" y="{y*k:.0f}" width="{w*k:.0f}" height="{h*k:.0f}"'
    T = lambda x, y, s, c, t, ls=0: f'<text x="{x*k:.0f}" y="{y*k:.0f}" font-family="Inter" font-weight="900" font-size="{s}" text-anchor="middle" fill="{c}" letter-spacing="{ls}">{t}</text>'
    return (f'<svg width="900" height="{Hh}" viewBox="0 0 900 {Hh}">'
            f'<rect class="rhE" {R(24, 132, 360, 44)} rx="10" fill="none" stroke="#A779F2" stroke-width="5" opacity="0"/>'
            f'<rect class="rhD" {R(24, 244, 600, 42)} rx="10" fill="none" stroke="#3FD0C9" stroke-width="5" opacity="0"/>'
            f'<rect class="rhT" {R(24, 354, 320, 40)} rx="10" fill="none" stroke="#64E087" stroke-width="5" opacity="0"/>'
            f'<g class="cvB"><rect {R(0, 0, 828, 12)} fill="#13161F"/><rect {R(0, 393, 828, 21)} fill="#13161F"/></g>'
            f'<g class="cvL"><rect {R(22, 22, 220, 50)} rx="12" fill="#13161F" stroke="#FF6474" stroke-width="3"/>{T(132, 55, 20, "#F4F5F9", "NAS100 · SELL · TP")}</g>'
            f'<g class="cvM"><rect {R(596, 122, 220, 64)} rx="12" fill="#13161F" stroke="#64E087" stroke-width="3"/>{T(706, 146, 16, "#F4F5F9", "RESULTADO EN PUNTOS", 1)}{T(706, 176, 28, "#64E087", "+103,70 pts")}</g>'
            f'<g class="cvP"><rect {R(22, 180, 340, 42)} rx="10" fill="#13161F" stroke="#3FD0C9" stroke-width="3"/>{T(192, 208, 19, "#F4F5F9", "DURACIÓN · 2 H 17 MIN 27 S")}</g>'
            '</svg>')
def VW(id, top, h, ov, note=""):
    return (f'<div class="viewer" id="{id}" style="left:0;top:{top}px;width:900px;height:{h}px"><div class="cam" style="width:309px;height:543px"><img src="assets/img/chart32.jpg" alt="" />{ov}</div>'
            + (f'<div class="vnote">{note}</div>' if note else '') + '</div>')
GSEG = "".join(f'<i class="{"on" if k < 7 else ""}"></i>' for k in range(10)) + '<div class="mk" style="left:calc(60% - 5px)"></div>'
GAUGEH = f'<div><div class="a">SCORE</div><div class="b">7/10</div></div><div class="bx"><div class="seg">{GSEG}</div><div class="ml">MÍNIMO REQUERIDO: 6</div></div>'
CH = lambda i, top, left, col, t: f'<div class="chip2 fx" id="{i}" style="left:{left}px;top:{top}px;color:{col};border-color:{col}">{t}</div>'
RED, TQ, VI, MU = "#FF6474", "#3FD0C9", "#A779F2", "rgba(244,245,249,.6)"

def learn_tk(C):
    s1 = C("sC1", f"""<div class="ttl"><div class="n">CONCLUSIÓN 1</div><div class="h" style="font-size:48px">RESPALDO DEL INDICADOR,<br/>NO CERTEZA</div></div>
<div class="gauge fx" id="c1g" style="left:0;top:170px;width:400px"><div class="a">SCORE</div><div class="b">7/10</div><div class="seg">{GSEG}</div><div class="ml">MÍNIMO REQUERIDO: 6</div></div>
<div class="chip2 fx" id="c1c" style="left:440px;top:180px;color:#FF6474;border-color:#FF6474">FAVORABLE SELL</div>
<div class="chip2 fx" id="c1e" style="left:440px;top:256px;color:var(--mu);border-color:{MU}">ESTRUCTURA EMA: MIXTA</div>
<div class="stampV fx" id="c1s" style="left:200px;top:470px">HABÍA RESPALDO, NO CERTEZA</div>""")
    s2 = C("sC2", f"""<div class="ttl"><div class="n">CONCLUSIÓN 2</div><div class="h" style="font-size:46px">LA EJECUCIÓN SE MIDE<br/>CON EL COMPROBANTE</div></div>
<div class="cardx fx" id="c2a" style="top:180px;width:420px;border:3px dashed var(--v)"><div class="a v">TRADINGVIEW · REFERENCIA</div><div class="b" style="font-size:38px">27.331,3 → 27.231,3</div><div class="c">Niveles de análisis</div></div>
<div class="cardx fx" id="c2b" style="top:180px;left:480px;width:420px;border:3px solid var(--g)"><div class="a g">BRÓKER · EJECUCIÓN</div><div class="b g" style="font-size:38px">27.330,30 → 27.226,60</div><div class="c">Resultado: +103,70 puntos</div></div>
<div class="neq fx" id="c2n" style="top:236px">≠</div>
<div class="stampV fx" id="c2s" style="left:170px;top:470px">EL RESULTADO ES EL EJECUTADO</div>""")
    s3 = C("sC3", f"""<div class="ttl"><div class="n">CONCLUSIÓN 3</div><div class="h" style="font-size:46px">EL MFE DESCRIBE LA SESIÓN,<br/>NO EL RENDIMIENTO</div></div>
<div class="cardx fx" id="c3t" style="top:170px;width:420px;border:3px solid var(--g)"><div class="a g">RESULTADO DEL TRADE · BRÓKER</div><div class="b g" style="font-size:52px">+103,70 PTS</div><div class="c">Ejecutado · 2 h 17 min 27 s</div></div>
<div class="cardx fx" id="c3m" style="top:170px;left:480px;width:420px;border:3px dashed var(--t)"><div class="a t">RECORRIDO DE SESIÓN</div><div class="b" style="font-size:40px"><span class="t">MFE 300</span> · <span class="r">MAE 30</span></div><div class="c">Incluye lo ocurrido tras el cierre</div></div>
<div class="note fx" id="c3n" style="left:0;top:420px;width:900px;font-size:24px;color:var(--mu)">Sirve para estudiar la salida · no se suma al trade</div>
<div class="stampV fx" id="c3s" style="left:180px;top:480px">NO ES RENDIMIENTO OBTENIDO</div>""")
    return s1 + "\n" + s2 + "\n" + s3

def body(V, DUR, caps):
    tk = V == "tiktok"
    ch = ["GANCHO", "DECISIÓN", "REFERENCIAS TV", "EJECUCIÓN", "RECORRIDO", "CONCLUSIÓN 1", "CONCLUSIÓN 2", "CONCLUSIÓN 3", "CIERRE"] if tk else ["GANCHO", "DECISIÓN", "REFERENCIAS TV", "EJECUCIÓN", "RECORRIDO", "APUNTES", "CIERRE"]
    n = [10]
    def TI(): n[0] += 1; return n[0]
    C = lambda i, inner: f'<div id="{i}" class="clip scene fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">{inner}</div>'
    imgs = "".join(f'<img id="av_{k}" class="pose" src="assets/avatar/{k}.webp" alt="" />' for k in POSES)
    imgs += "".join(f'<img id="av_{k}" class="ov" src="assets/avatar/{k}.webp" alt="" />' for k in OVER)
    imgs += "".join(f'<img id="gl_{k}" class="gl" src="assets/avatar/gl_{k}.webp" alt="" />' for k in GLOW)
    first = C("sG", f"""<div class="clipH fx" id="g_1" style="font-size:60px">SELL NOCTURNO:<br/><span style="color:#64E087">+103,70 PUNTOS</span></div>
<div class="gauge gaugeH fx" id="gS" style="left:0;top:142px">{GAUGEH}</div>
{VW("gv", 290, 250, chart_ov())}
{CH("g_r", 552, 0, VI, "TRADE #032 · SELL NOCTURNO")}
<div class="tag3 fx" id="g_q" style="left:0;top:616px;color:var(--t);border:3px solid var(--t)">LA SESIÓN SIGUIÓ MOVIÉNDOSE DESPUÉS</div>""")
    entry = C("sE", f"""<div class="dpill fx" id="e_d">16 NOV · 11 PM COLOMBIA</div><div class="dpill fx" id="e_p" style="left:470px;border-color:rgba(255,100,116,.8);color:#FF6474">SELL</div>
<div class="gauge gaugeH fx" id="eS" style="left:0;top:90px">{GAUGEH}</div>
{CH("e_c", 270, 0, RED, "FAVORABLE SELL")}{CH("e_r", 270, 330, RED, "RADAR: BEAR +6 / BULL −5")}
{CH("e_m", 350, 0, MU, "ESTRUCTURA EMA: MIXTA")}{CH("e_a", 350, 450, TQ, "ATR 14: 67 PTS")}
{CH("e_q", 430, 0, MU, "QUALITY 77/100 (PUNTUACIÓN)")}{CH("e_s", 430, 520, MU, "RSI 7: 47,6")}
<div class="tag3 fx" id="e_x" style="left:0;top:520px;color:var(--mu);border:3px solid {MU};font-size:24px">QUALITY ES UNA PUNTUACIÓN, NO UNA PROBABILIDAD</div>""")
    sD = C("sD", f"""<div class="tag3 fx" id="d_src" style="left:0;top:0;color:var(--v);border:3px solid var(--v);font-size:26px">TRADINGVIEW · NIVELES DE REFERENCIA</div>
{VW("cvD", 64, 576, chart_ov())}<div class="note fx" id="d_n" style="left:0;top:650px;width:900px;font-size:21px;font-weight:800">Referencias del análisis, no precios ejecutados · <span style="color:#FF6474">▢ DESCENSO</span> &nbsp;<span style="color:#3FD0C9">▢ REBOTE</span> · TradingView</div>""")
    rh = round(414 * 900 / 828)
    sR = C("sR", f"""<div class="tag3 fx" id="r_src" style="left:0;top:-58px;color:#64E087;border:3px solid #64E087;font-size:24px">BRÓKER · COMPROBANTE DE EJECUCIÓN</div>
<div class="rcard" id="rc30" style="height:{rh}px"><img src="assets/img/receipt32.jpg" alt="" style="width:900px;height:{rh}px" />{receipt32()}</div>
<div class="tpbig fx" id="rtp" style="top:{20 + rh + 12}px">+<span id="nR">103,70</span> PUNTOS EJECUTADOS<small>27.330,30 → 27.226,60 · 2 H 17 MIN 27 S</small></div>
<div class="note fx" id="rn" style="left:0;top:668px;font-size:21px">T/P mostrado 27.230,30 · salida 3,70 pts por debajo · reloj del bróker 17/11 06:00:00 → 08:17:27</div>""")
    sM = C("sM", f"""<div class="ttl"><div class="n">RECORRIDO DE SESIÓN · HASTA 8:59 AM DEL 17 NOV</div><div class="h" style="font-size:50px"><span class="t">MFE 300</span> · <span class="r">MAE 30</span></div></div>
{VW("cvM", 150, 420, chart_ov())}
<div class="cardx fx" id="m_t" style="top:590px;width:430px;border:3px solid var(--g)"><div class="a g">TRADE EJECUTADO</div><div class="b g" style="font-size:40px">+103,70 PTS</div></div>
<div class="cardx fx" id="m_s" style="top:590px;left:470px;width:430px;border:3px dashed var(--t)"><div class="a t">INCLUYE LO POSTERIOR AL CIERRE</div><div class="b" style="font-size:34px">NO ES GANANCIA</div></div>""")
    if tk: learn = learn_tk(C)
    else:
        L3 = [("1 · RESPALDO, NO CERTEZA", "Score 7/10 sobre el mínimo 6 · FAVORABLE SELL · estructura EMA mixta", "var(--v)"),
              ("2 · SE MIDE CON EL COMPROBANTE", "Bróker 27.330,30 → 27.226,60 = +103,70 · TradingView = referencia", "var(--g)"),
              ("3 · MFE 300 ≠ RENDIMIENTO", "Recorrido de sesión con lo ocurrido tras el cierre · no son puntos obtenidos", "var(--t)")]
        cards = "".join(f'<div class="cardx fx" id="cl{k}" style="top:{140 + k * 175}px;border:3px solid {c}"><div class="b" style="font-size:34px">{t}</div><div class="c">{s}</div></div>' for k, (t, s, c) in enumerate(L3))
        learn = C("sC", f'<div class="ttl"><div class="n">¿QUÉ ANOTAMOS?</div><div class="h" style="font-size:52px">TRES APUNTES</div></div>\n{cards}')
    end_h = ('<span>No buscamos operaciones perfectas.</span>' if tk else '') + '<span class="v">Buscamos ventaja estadística.</span>'
    chs = "".join(f'<span class="ch" id="ch{i}">{x}</span>' for i, x in enumerate(ch))
    cps = "".join(f'<div class="cp" id="cp{i}">{x[2]}</div>' for i, x in enumerate(caps))
    return f"""<div id="lab" class="clip" data-start="0" data-duration="{DUR}" data-track-index="1">{lab_svg()}</div>
<div id="grid"></div>
<div id="hdr" class="clip" data-start="0" data-duration="{DUR}" data-track-index="2">
  <div class="lg" data-layout-allow-overflow><img src="assets/img/logo.png" alt="" /></div>
  <div class="hl"><span class="nm">NAS100 EDGE LAB</span><span class="tr">TRADE #032 · SELL · 16 NOV 2026</span></div>
  <div id="chs">{chs}</div>
</div>
<div id="pbw" class="clip" data-start="0" data-duration="{DUR}" data-track-index="3"><div id="pb"></div></div>
{first}
{entry}
{sD}
{sR}
{sM}
{learn}
<div id="sEnd" class="clip fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}" style="position:absolute;left:90px;top:300px;width:900px;height:690px">
  <div class="kpi fx" id="eK" style="top:0;font-size:54px">TRADE #032 · SELL NOCTURNO</div>
  <div class="kpi fx" id="eN" style="top:80px;font-size:124px;color:var(--g);text-shadow:0 0 50px rgba(100,224,135,.45)">+<span id="nT">103,70</span></div>
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
    d = f"{SCR}/t032-{V}"
    for sub in ["img", "avatar", "audio"]: os.makedirs(f"{d}/assets/{sub}", exist_ok=True)
    for sub in ["fonts", "vendor", "avatar"]: shutil.copytree(f"{KIT}/assets/{sub}", f"{d}/assets/{sub}", dirs_exist_ok=True)
    shutil.copy(f"{KIT}/assets/img/logo.png", f"{d}/assets/img/"); shutil.copy(f"{KIT}/hyperframes.json", d)
    shutil.copy(f"{CAP}/grafico_032.jpg", f"{d}/assets/img/chart32.jpg"); shutil.copy(f"{CAP}/comprobante_032.jpg", f"{d}/assets/img/receipt32.jpg")
    json.dump({"name": f"t032-{V}", "private": True, "type": "module"}, open(d + "/package.json", "w")); json.dump({"id": f"t032-{V}", "name": f"t032-{V}"}, open(d + "/meta.json", "w"))
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
<title>NAS100 EDGE LAB · Trade #032 · {V}</title><script src="assets/vendor/gsap.min.js"></script>
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
