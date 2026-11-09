# NAS100 EDGE LAB · TRADE #028 · SELL · dom 8 nov 2026, 11 PM Colombia · TikTok y Shorts 1080×1920 (plantilla de la semana #12)
# Capturas originales sin alterar: solo encuadre, acercamiento y resaltados encima. Lote, dinero y Δ/% del comprobante tapados desde el primer cuadro.
import os, sys, json, shutil
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
from nas_common import KIT, POSES, OVER, GLOW, envelope, lab_svg, align_parts
SCR = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work"); W = f"{SCR}/t028"; TTS = f"{W}/tts"
CAP = f"{H}/../entregas/nas100edgelab/trade028/capturas"
sys.path.insert(0, f"{H}/t028"); from script import TK, SH
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
JS = JSH + open(f"{H}/t028.js").read()

def chart_ov():   # resaltados sobre la captura de TradingView (684×1121); no se mueven velas ni niveles
    return ('<svg width="684" height="1121" viewBox="0 0 684 1121">'
            '<rect class="hiE" x="280" y="545" width="225" height="15" rx="7" fill="none" stroke="#A779F2" stroke-width="5" opacity="0"/>'
            '<rect class="hiT" x="280" y="634" width="225" height="17" rx="8" fill="none" stroke="#64E087" stroke-width="5" opacity="0"/>'
            '<path class="hiD" d="M255 560 L337 645 L405 765 L437 935" fill="none" stroke="#FF6474" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>'
            '<path class="hiR" d="M515 905 L530 770 L590 665 L672 575" fill="none" stroke="#3FD0C9" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>'
            '<g class="lbE" opacity="0"><rect x="352" y="502" width="142" height="38" rx="9" fill="#090B10"/><text x="423" y="528" font-family="Inter" font-weight="900" font-size="20" text-anchor="middle" fill="#A779F2">ENTRADA</text></g>'
            '<g class="lbT" opacity="0"><rect x="432" y="596" width="122" height="34" rx="8" fill="#090B10"/><text x="493" y="619" font-family="Inter" font-weight="900" font-size="17" text-anchor="middle" fill="#64E087">OBJETIVO</text></g>'
            '<g class="lbD" opacity="0"><rect x="185" y="760" width="170" height="38" rx="9" fill="#090B10"/><text x="270" y="786" font-family="Inter" font-weight="900" font-size="19" text-anchor="middle" fill="#FF6474">DESCENSO</text></g>'
            '<g class="lbR" opacity="0"><rect x="560" y="760" width="120" height="38" rx="9" fill="#090B10"/><text x="620" y="786" font-family="Inter" font-weight="900" font-size="19" text-anchor="middle" fill="#3FD0C9">REBOTE</text></g>'
            '</svg>')
def receipt28():   # comprobante 828×441 mostrado a 900 de ancho: lote, dinero y Δ/% tapados SIEMPRE desde el primer cuadro
    k = 900 / 828; Hh = round(441 * k); R = lambda x, y, w, h: f'x="{x*k:.0f}" y="{y*k:.0f}" width="{w*k:.0f}" height="{h*k:.0f}"'
    T = lambda x, y, s, c, t, ls=0: f'<text x="{x*k:.0f}" y="{y*k:.0f}" font-family="Inter" font-weight="900" font-size="{s}" text-anchor="middle" fill="{c}" letter-spacing="{ls}">{t}</text>'
    return (f'<svg width="900" height="{Hh}" viewBox="0 0 900 {Hh}">'
            f'<rect class="rhE" {R(24, 130, 360, 52)} rx="10" fill="none" stroke="#A779F2" stroke-width="5" opacity="0"/>'
            f'<rect class="rhD" {R(24, 248, 600, 44)} rx="10" fill="none" stroke="#3FD0C9" stroke-width="5" opacity="0"/>'
            f'<rect class="rhT" {R(24, 358, 320, 40)} rx="10" fill="none" stroke="#64E087" stroke-width="5" opacity="0"/>'
            f'<g class="cvL"><rect {R(112, 20, 300, 52)} rx="12" fill="#13161F" stroke="#A779F2" stroke-width="3"/>{T(262, 54, 22, "#F4F5F9", "SELL · TAKE PROFIT")}</g>'
            f'<g class="cvM"><rect {R(600, 126, 215, 64)} rx="12" fill="#13161F" stroke="#64E087" stroke-width="3"/>{T(707, 150, 16, "#F4F5F9", "RESULTADO EN PUNTOS", 1)}{T(707, 180, 28, "#64E087", "+101,45 pts")}</g>'
            f'<g class="cvP"><rect {R(24, 188, 330, 42)} rx="10" fill="#13161F" stroke="#3FD0C9" stroke-width="3"/>{T(189, 216, 19, "#F4F5F9", "DURACIÓN · 1 H 52 MIN 06 S")}</g>'
            '</svg>')
def VW(id, top, h, ov, note="Gráfico: TradingView"):
    return (f'<div class="viewer" id="{id}" style="left:0;top:{top}px;width:900px;height:{h}px"><div class="cam" style="width:684px;height:1121px"><img src="assets/img/chart28.jpg" alt="" />{ov}</div>'
            + (f'<div class="vnote">{note}</div>' if note else '') + '</div>')
GAUGE = ('<div class="a">SCORE</div><div class="b">6/10</div><div class="seg">' + "".join(f'<i class="{"on" if k < 6 else ""}"></i>' for k in range(10))
         + '<div class="mk" style="left:calc(60% - 5px)"></div></div><div class="ml">MÍNIMO REQUERIDO: 6</div>')

def body(V, DUR, caps):
    tk = V == "tiktok"
    ch = ["GANCHO", "ENTRADA", "DESARROLLO", "RESULTADO", "APRENDIZAJE 1", "APRENDIZAJE 2", "APRENDIZAJE 3", "CIERRE"] if tk else ["GANCHO", "ENTRADA", "DESARROLLO", "RESULTADO", "APRENDIZAJES", "CIERRE"]
    n = [10]
    def TI(): n[0] += 1; return n[0]
    C = lambda i, inner: f'<div id="{i}" class="clip scene fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">{inner}</div>'
    imgs = "".join(f'<img id="av_{k}" class="pose" src="assets/avatar/{k}.webp" alt="" />' for k in POSES)
    imgs += "".join(f'<img id="av_{k}" class="ov" src="assets/avatar/{k}.webp" alt="" />' for k in OVER)
    imgs += "".join(f'<img id="gl_{k}" class="gl" src="assets/avatar/gl_{k}.webp" alt="" />' for k in GLOW)
    if tk:
        learn = f'''{C("sC1", f"""<div class="ttl"><div class="n">APRENDIZAJE 1</div><div class="h" style="font-size:50px">REGISTRAR LAS ENTRADAS<br/>JUSTO EN EL MÍNIMO</div></div>
<div class="gauge fx" id="c1g" style="left:0;top:170px;width:400px">{GAUGE}</div>
<div class="chip2 fx" id="c1r" style="left:440px;top:180px;color:var(--t);border-color:var(--t)">RADAR: BEAR +8 / BULL −7</div>
<div class="chip2 fx" id="c1e" style="left:440px;top:260px;color:var(--mu);border-color:rgba(244,245,249,.5)">MEDIAS: EMA MIXTA</div>
<div class="cardx fx" id="c1a" style="top:430px;width:420px;border:3px solid var(--v)"><div class="a v">ENTRADAS CON SCORE 6</div><div class="b" style="font-size:40px">ESTE TRADE</div><div class="c">1 caso registrado</div></div>
<div class="cardx fx" id="c1b" style="top:430px;left:480px;width:420px;border:3px dashed rgba(244,245,249,.4)"><div class="a mu">LECTURAS MÁS ALTAS</div><div class="b" style="font-size:40px">SCORE 7+</div><div class="c">Comparar con más casos</div></div>
<div class="neq fx" id="c1n" style="top:470px">vs</div>
<div class="stampV fx" id="c1s" style="left:190px;top:600px">CONSERVAR LA COMBINACIÓN</div>""")}
{C("sC2", f"""<div class="ttl"><div class="n">APRENDIZAJE 2</div><div class="h" style="font-size:50px">OBJETIVO Y EJECUCIÓN<br/>SON DATOS DISTINTOS</div></div>
<div class="cardx fx" id="c2a" style="top:180px;width:420px;border:3px solid var(--v)"><div class="a v">LO QUE PLANEAMOS</div><div class="b" style="font-size:46px">TP · 100 PTS</div><div class="c">Nivel configurado: 27.006,45</div></div>
<div class="cardx fx" id="c2b" style="top:180px;left:480px;width:420px;border:3px solid var(--g)"><div class="a g">LO QUE EJECUTÓ EL BRÓKER</div><div class="b g" style="font-size:46px">+101,45 PTS</div><div class="c">Salida registrada: 27.005,00</div></div>
<div class="neq fx" id="c2n" style="top:236px">≠</div>
<div class="stampV fx" id="c2s" style="left:200px;top:470px">GUARDAMOS LOS DOS DATOS</div>""")}
{C("sC3", f"""<div class="ttl"><div class="n">APRENDIZAJE 3</div><div class="h" style="font-size:50px">SEPARAR EL TRADE<br/>DE LA SESIÓN</div></div>
<div class="mini fx" id="c3m" style="top:160px;text-align:center"><div class="a">RECORRIDO DE SESIÓN · TRADINGVIEW</div><div style="font-size:52px;font-weight:900;margin-top:8px"><span class="t">446 A FAVOR</span> <span class="mu">·</span> <span class="r">65 EN CONTRA</span></div></div>
<div class="wlb fx" id="c3l1" style="left:0;top:360px;color:var(--g)">TRADE · 11:00 PM → 12:52 AM</div><div class="wbar" id="c3b1" style="left:0;top:398px;width:{900*112/1079:.0f}px;background:var(--g)"></div>
<div class="wlb fx" id="c3l2" style="left:0;top:476px;color:var(--t)">VENTANA DE MEDICIÓN · HASTA 8:59 AM</div><div class="wbar" id="c3b2" style="left:0;top:514px;width:900px;background:linear-gradient(90deg,rgba(63,208,201,.9),rgba(167,121,242,.6))"></div>
<div class="note fx" id="c3n" style="left:0;top:590px;width:900px;font-size:24px;color:var(--mu)">Medición hasta las 8:59 a. m. · incluye periodo posterior al TP</div>
<div class="stampV fx" id="c3s" style="left:300px;top:340px">NO SE SUMA AL TRADE</div>""")}'''
    else:
        L3 = [("1 · GUARDAR LA LECTURA COMPLETA", "Score 6 justo en el mínimo · comparar con más casos", "var(--v)"),
              ("2 · OBJETIVO ≠ EJECUCIÓN", "TP 100 pts (27.006,45) · ejecutado +101,45 (27.005,00)", "var(--g)"),
              ("3 · 446 A FAVOR · 65 EN CONTRA", "Recorrido de sesión · TradingView · hasta las 8:59 a. m., incluye periodo posterior al TP", "var(--t)")]
        learn = C("sC", f"""<div class="ttl"><div class="n">¿QUÉ ANOTAMOS?</div><div class="h" style="font-size:52px">TRES APRENDIZAJES</div></div>
{"".join(f'<div class="cardx fx" id="cl{k}" style="top:{140 + k*175}px;border:3px solid {c}"><div class="b" style="font-size:36px">{t}</div><div class="c">{s}</div></div>' for k, (t, s, c) in enumerate(L3))}""")
    return f'''<div id="lab" class="clip" data-start="0" data-duration="{DUR}" data-track-index="1">{lab_svg()}</div>
<div id="grid"></div>
<div id="hdr" class="clip" data-start="0" data-duration="{DUR}" data-track-index="2">
  <div class="lg" data-layout-allow-overflow><img src="assets/img/logo.png" alt="" /></div>
  <div class="hl"><span class="nm">NAS100 EDGE LAB</span><span class="tr">TRADE #028 · SELL · 8 NOV 2026</span></div>
  <div id="chs">{"".join(f'<span class="ch" id="ch{i}">{x}</span>' for i, x in enumerate(ch))}</div>
</div>
<div id="pbw" class="clip" data-start="0" data-duration="{DUR}" data-track-index="3"><div id="pb"></div></div>
{C("sG", f"""<div class="clipH fx" id="g_1"><span style="color:#A779F2">SCORE 6/10:</span><br/>JUSTO EN EL MÍNIMO</div>
<div class="gauge gaugeH fx" id="gS" style="left:0;top:138px"><div><div class="a">SCORE</div><div class="b">6/10</div></div><div class="bx"><div class="seg">{"".join(f'<i class="{"on" if k < 6 else ""}"></i>' for k in range(10))}<div class="mk" style="left:calc(60% - 5px)"></div></div><div class="ml">MÍNIMO REQUERIDO: 6 · JUSTO EN EL LÍMITE</div></div></div>
{VW("gv", 300, 390, chart_ov(), "")}
<div class="tag3 fx" id="g_q" style="left:0;top:628px;color:var(--t);border:3px solid var(--t)">{'¿QUÉ MÁS MOSTRABA LA LECTURA?' if tk else 'TRADE #028 · SELL'}</div>""")}
{C("sE", f"""<div class="dpill fx" id="e_d">8 NOV · 11 PM COLOMBIA</div><div class="dpill fx" id="e_p" style="left:430px;border-color:rgba(255,100,116,.75);color:#FF6474">SELL · 27.106,45</div>
{VW("cvE", 70, 420, chart_ov(), "")}<div class="note fx" id="e_n" style="left:760px;top:6px;width:140px;font-size:19px;line-height:1.2">Gráfico:<br/>TradingView</div>
<div class="chip2 fx" id="e_r" style="left:0;top:505px;color:var(--t);border-color:var(--t)">BEAR +8 / BULL −7</div>
<div class="chip2 fx" id="e_c" style="left:470px;top:505px;color:#FF6474;border-color:#FF6474">FAVORABLE SELL</div>
<div class="chip2 fx" id="e_m" style="left:0;top:575px;color:var(--mu);border-color:rgba(244,245,249,.55)">EMA MIXTA</div>
<div class="chip2 fx" id="e_a" style="left:300px;top:575px;color:#FF6474;border-color:#FF6474">ATR 14: 89 · ALTO / RIESGO</div>
<div class="tag3 fx" id="e_x" style="left:0;top:642px;color:var(--v);border:3px solid var(--v)">CONTEXTO ANTES DE CONOCER EL RESULTADO</div>""")}
{C("sD", f"""{VW("cvD", 74, 566, chart_ov(), "")}<div class="note fx" id="d_n" style="left:0;top:650px;width:900px;font-size:22px;font-weight:800"><span style="color:#A779F2">▬ ENTRADA</span> &nbsp; <span style="color:#64E087">▬ OBJETIVO (TP)</span> &nbsp; <span style="color:#FF6474">▬ DESCENSO</span> &nbsp; <span style="color:#3FD0C9">▬ REBOTE</span> &nbsp; · Gráfico: TradingView</div>
<div class="tag3 fx" id="d_a" style="left:0;top:0;color:#FF6474;border:3px solid #FF6474">DESCENSO HACIA EL OBJETIVO</div>
<div class="tag3 fx" id="d_b" style="left:0;top:0;color:var(--t);border:3px solid var(--t)">SIGUIÓ BAJANDO · LUEGO REBOTÓ</div>""")}
{C("sR", f"""<div class="rcard" id="rc28" style="height:{round(441*900/828)}px"><img src="assets/img/receipt28.jpg" alt="" style="width:900px;height:{round(441*900/828)}px" />{receipt28()}</div>
<div class="tpbig fx" id="rtp" style="top:{20 + round(441*900/828) + 12}px">TAKE PROFIT · +<span id="nR">101,45</span> PTS<small>27.106,45 → 27.005,00 · 1 H 52 MIN 06 S</small></div>
<div class="note fx" id="rn" style="left:0;top:668px;font-size:21px">Ejecución: comprobante del bróker (reloj del bróker) · TP configurado: 27.006,45</div>""")}
{learn}
<div id="sEnd" class="clip fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}" style="position:absolute;left:90px;top:300px;width:900px;height:690px">
  <div class="kpi fx" id="eK" style="top:0;font-size:54px">TRADE #028 · SELL · TP</div>
  <div class="kpi fx" id="eN" style="top:80px;font-size:124px;color:var(--g);text-shadow:0 0 50px rgba(100,224,135,.45)">+<span id="nT">101,45</span></div>
  <div class="kpi fx" id="eU" style="top:226px;font-size:44px">PUNTOS</div>
  <div class="H" style="position:absolute;top:340px;font-size:50px">{'<span>No buscamos operaciones perfectas.</span>' if tk else ''}<span class="v">Buscamos ventaja estadística.</span></div>
  <div class="note fx" id="eS" style="left:0;top:560px;width:900px;font-size:22px;color:var(--mu)">Resultado en puntos del comprobante del bróker · una operación documentada.</div>
</div>
<div id="caps" class="clip" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">{"".join(f'<div class="cp" id="cp{i}">{x[2]}</div>' for i, x in enumerate(caps))}</div>
<div id="av" class="clip" data-layout-allow-overflow data-start="0" data-duration="{DUR}" data-track-index="{TI()}"><div id="avGlow"></div><div id="avIn">{imgs}</div></div>
<div id="disc" class="clip fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">Contenido educativo · No es asesoría financiera · Operar implica riesgo de pérdida</div>
<div id="flash" class="clip flash" data-start="0" data-duration="{DUR}" data-track-index="{TI()}"></div>'''

for V, L in [("tiktok", TK), ("shorts", SH)]:
    st = json.load(open(f"{TTS}/{V}_times.json")); T = {nm: [s, round(s + d, 3)] for nm, s, d in st}
    DUR = round(st[-1][1] + st[-1][2] + (0.9 if V == "tiktok" else 1.6), 1)
    d = f"{SCR}/t028-{V}"
    for sub in ["img", "avatar", "audio"]: os.makedirs(f"{d}/assets/{sub}", exist_ok=True)
    for sub in ["fonts", "vendor", "avatar"]: shutil.copytree(f"{KIT}/assets/{sub}", f"{d}/assets/{sub}", dirs_exist_ok=True)
    shutil.copy(f"{KIT}/assets/img/logo.png", f"{d}/assets/img/"); shutil.copy(f"{KIT}/hyperframes.json", d)
    shutil.copy(f"{CAP}/grafico_028.jpg", f"{d}/assets/img/chart28.jpg"); shutil.copy(f"{CAP}/comprobante_028.jpg", f"{d}/assets/img/receipt28.jpg")
    json.dump({"name": f"t028-{V}", "private": True, "type": "module"}, open(d + "/package.json", "w")); json.dump({"id": f"t028-{V}", "name": f"t028-{V}"}, open(d + "/meta.json", "w"))
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
<title>NAS100 EDGE LAB · Trade #028 · {V}</title><script src="assets/vendor/gsap.min.js"></script>
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
