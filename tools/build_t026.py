# NAS100 EDGE LAB · TRADE #026 (SELL · TP) · TikTok y YouTube Shorts con la voz A del Explorador y laboratorio ilustrado
import os, sys, json, re, shutil, numpy as np, soundfile as sf
SCR = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work")
AV = "/home/user/BITRANS/entregas/nas100edgelab/avatar/explorador/V3"
W26 = f"{SCR}/t026"; TTS = f"{W26}/tts"
sys.path.insert(0, W26); from script import TK, SH
POSES = {"neutral": "bases/avatar_neutral", "explica": "bases/avatar_explica", "senala": "bases/avatar_senala",
         "pensativo": "bases/avatar_pensativo", "satisfecho": "bases/avatar_satisfecho",
         "habla_2": "habla_2", "habla_3": "habla_3", "senala_t1": "senala_t1", "senala_t2": "senala_t2",
         "tp_t1": "tp_t1", "tp_t2": "tp_t2", "piensa_t1": "piensa_t1", "piensa_t2": "piensa_t2",
         "gira_1": "gira_1", "gira_2": "gira_2", "gira_3": "gira_3"}
OVER = {"explica_c": "explica_ojos_cerrados", "senala_c": "senala_ojos_cerrados", "pensativo_c": "pensativo_ojos_cerrados", "satisfecho_c": "satisfecho_ojos_cerrados"}
GLOW = ["neutral", "explica", "senala", "pensativo", "satisfecho", "senala_t1", "senala_t2", "tp_t1", "tp_t2", "piensa_t1", "piensa_t2", "gira_1"]
CSS = open(f"{SCR}/tools/s11.css").read() + open(f"{SCR}/tools/t026.css").read()
JS = open(f"{SCR}/tools/t026.js").read()

def envelope(wav, dur):
    x, sr = sf.read(wav, always_2d=True); x = x.mean(1); hop = sr // 30; n = int(dur * 30) + 1
    r = np.array([np.sqrt(np.mean(x[i * hop:(i + 1) * hop] ** 2)) if i * hop < len(x) else 0 for i in range(n)])
    r = np.clip(r / (np.percentile(r[r > 1e-4], 90) + 1e-9), 0, 1.3)
    e = np.zeros(n); a = 0
    for i, v in enumerate(r): a = v if v > a else a * 0.72; e[i] = a
    e = np.clip((e - 0.06) / 0.8, 0, 1) ** 0.8
    return [round(float(v), 3) for v in e]

def lab_svg():   # laboratorio ilustrado de fondo (decorativo: nunca muestra datos de precio)
    parts = ['<svg viewBox="0 0 1080 1920" width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">',
             '<defs><linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#13161F"/><stop offset="1" stop-color="#090B10"/></linearGradient>',
             '<radialGradient id="spot" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#A779F2" stop-opacity=".28"/><stop offset="1" stop-color="#A779F2" stop-opacity="0"/></radialGradient></defs>',
             # techo con rieles de luz
             '<g id="ceil">' + ''.join(f'<rect class="cl2" x="{x}" y="96" width="240" height="8" rx="4" fill="#A779F2" opacity=".55"/>' for x in [60, 420, 780]) + '</g>',
             # tubos de neón laterales
             '<rect id="tubeL" class="neon" x="34" y="290" width="6" height="760" rx="3" fill="#A779F2" opacity=".7"/>',
             '<rect id="tubeR" class="neonT" x="1040" y="290" width="6" height="760" rx="3" fill="#3FD0C9" opacity=".7"/>',
             # piso con perspectiva
             '<rect x="0" y="1290" width="1080" height="630" fill="url(#fl)"/>',
             ''.join(f'<line x1="540" y1="1290" x2="{540 + (k - 6) * 220}" y2="1920" stroke="#A779F2" stroke-opacity=".10" stroke-width="2"/>' for k in range(13)),
             ''.join(f'<line x1="0" y1="{1290 + (k * k) * 9}" x2="1080" y2="{1290 + (k * k) * 9}" stroke="#A779F2" stroke-opacity=".08" stroke-width="2"/>' for k in range(1, 9)),
             '<rect id="scanF" x="0" y="1290" width="1080" height="6" fill="#3FD0C9" opacity="0"/>',
             '<ellipse cx="236" cy="1500" rx="260" ry="40" fill="url(#spot)"/>',
             # consola abajo a la derecha (pantallas decorativas: barras de estado, sin velas ni precios)
             '<g id="console" transform="translate(560 1090)"><rect x="0" y="150" width="440" height="160" rx="18" fill="#13161F" stroke="#A779F2" stroke-opacity=".35" stroke-width="2"/>',
             '<rect x="20" y="0" width="190" height="130" rx="12" fill="#0D1018" stroke="#3FD0C9" stroke-opacity=".5" stroke-width="2"/><rect x="230" y="0" width="190" height="130" rx="12" fill="#0D1018" stroke="#A779F2" stroke-opacity=".5" stroke-width="2"/>',
             ''.join(f'<rect class="sl{k % 3}" x="38" y="{20 + k * 18}" width="{150 - (k * 37) % 90}" height="8" rx="4" fill="#3FD0C9" opacity=".55"/>' for k in range(6)),
             '<circle id="radar" cx="325" cy="65" r="44" fill="none" stroke="#A779F2" stroke-opacity=".6" stroke-width="3"/><circle cx="325" cy="65" r="24" fill="none" stroke="#A779F2" stroke-opacity=".35" stroke-width="2"/>',
             '<g id="sweep" transform="translate(325 65)"><path d="M0 0 L44 0 A44 44 0 0 0 31 -31 Z" fill="#A779F2" opacity=".45"/></g>',
             ''.join(f'<circle class="led" cx="{40 + k * 46}" cy="{196}" r="8" fill="{["#3FD0C9", "#A779F2", "#64E087"][k % 3]}" opacity=".85"/>' for k in range(9)),
             ''.join(f'<rect x="{30 + k * 64}" y="232" width="48" height="16" rx="5" fill="#1C2130"/>' for k in range(6)), '</g>',
             # partículas
             ''.join(f'<circle class="pt" cx="{(k * 137) % 1080}" cy="{300 + (k * 211) % 1000}" r="{1.5 + (k % 3)}" fill="{["#A779F2", "#3FD0C9", "#F4F5F9"][k % 3]}" opacity=".35"/>' for k in range(36)),
             '</svg>']
    return "".join(parts)

def chart_overlay():   # resaltados sobre elementos que ya existen en la captura (coordenadas de la imagen 560×949)
    return ('<svg width="560" height="949" viewBox="0 0 560 949">'
            '<rect class="hiE" x="210" y="531" width="350" height="14" rx="7" fill="none" stroke="#A779F2" stroke-width="5" opacity="0"/>'
            '<path class="hiD" d="M217 541 L370 692" fill="none" stroke="#3FD0C9" stroke-width="6" stroke-linecap="round" opacity="0"/>'
            '<rect class="hiT" x="210" y="690" width="350" height="18" rx="8" fill="none" stroke="#64E087" stroke-width="5" opacity="0"/>'
            '<g class="lbE" opacity="0"><rect x="400" y="486" width="150" height="38" rx="9" fill="#090B10"/><text x="475" y="512" font-family="Inter" font-weight="900" font-size="20" text-anchor="middle" fill="#A779F2">ENTRADA</text></g>'
            '<g class="lbT" opacity="0"><rect x="400" y="716" width="150" height="38" rx="9" fill="#090B10"/><text x="475" y="742" font-family="Inter" font-weight="900" font-size="20" text-anchor="middle" fill="#64E087">OBJETIVO</text></g>'
            '</svg>')

def receipt_overlay():   # comprobante 828×398 mostrado a 900×433 (×1.087)
    k = 900 / 828; R = lambda x, y, w, h: f'x="{x*k:.0f}" y="{y*k:.0f}" width="{w*k:.0f}" height="{h*k:.0f}"'
    return (f'<svg width="900" height="433" viewBox="0 0 900 433">'
            f'<rect class="rhE" {R(24, 112, 352, 56)} rx="10" fill="none" stroke="#A779F2" stroke-width="5" opacity="0"/>'
            f'<rect class="rhD" {R(24, 226, 592, 46)} rx="10" fill="none" stroke="#3FD0C9" stroke-width="5" opacity="0"/>'
            f'<rect class="rhT" {R(220, 336, 116, 46)} rx="10" fill="none" stroke="#64E087" stroke-width="5" opacity="0"/>'
            f'<g class="cvM"><rect {R(560, 104, 256, 70)} rx="12" fill="#13161F" stroke="#64E087" stroke-width="3"/>'
            f'<text x="{688*k:.0f}" y="{128*k:.0f}" font-family="Inter" font-weight="900" font-size="15" text-anchor="middle" fill="#F4F5F9" letter-spacing="1.5">RESULTADO EN PUNTOS</text>'
            f'<text x="{688*k:.0f}" y="{160*k:.0f}" font-family="Inter" font-weight="900" font-size="30" text-anchor="middle" fill="#64E087">+100,70 pts</text></g>'
            f'<g class="cvL"><rect {R(188, 16, 250, 52)} rx="12" fill="#13161F" stroke="#A779F2" stroke-width="3"/>'
            f'<text x="{313*k:.0f}" y="{50*k:.0f}" font-family="Inter" font-weight="900" font-size="22" text-anchor="middle" fill="#F4F5F9">TAKE PROFIT · 100 pts</text></g>'
            '</svg>')

def body(V, DUR, caps):
    tk = V == "tiktok"
    ch = ["GANCHO", "ENTRADA", "DESARROLLO", "RESULTADO", "CONCLUSIÓN 1", "CONCLUSIÓN 2", "CONCLUSIÓN 3", "CIERRE"]
    C = lambda i, inner, extra="": f'<div id="{i}" class="clip scene fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}" {extra}>{inner}</div>'
    n = [10]
    def TI(): n[0] += 1; return n[0]
    imgs = "".join(f'<img id="av_{k}" class="pose" src="assets/avatar/{k}.webp" alt="" />' for k in POSES)
    imgs += "".join(f'<img id="av_{k}" class="ov" src="assets/avatar/{k}.webp" alt="" />' for k in OVER)
    imgs += "".join(f'<img id="gl_{k}" class="gl" src="assets/avatar/gl_{k}.webp" alt="" />' for k in GLOW)
    rows = [("SCORE 8/10 · MÍNIMO 6", ""), ("BEAR +5 / BULL −2", "Alpha Radar"), ("BAJO EMA 21 Y EMA 200", "Estructura"), ("FAVORABLE SELL", "Confluencia")]
    rows_html = "".join(f'<div class="row4 fx" id="er{k}" style="top:{200 + k * 104}px"><div class="sw"></div><i>✓</i><span>{a}</span><span class="mu2">{b}</span></div>' for k, (a, b) in enumerate(rows))
    mini = "".join(f'<div class="r">✓ {a}</div>' for a, _ in rows)
    end_sub = ('<div class="abs fx" id="eC" style="left:0;top:560px;width:900px;font-size:34px;font-weight:850;color:var(--t)">Sigue la bitácora para ver el siguiente trade.</div>' if tk else
               '<div class="abs fx" id="eC" style="left:0;top:560px;width:900px;font-size:30px;font-weight:850;line-height:1.3">Esto es <span class="v">NAS100 EDGE LAB</span>,<br/>un laboratorio de <span class="t">TITÁN HOLDING</span>.</div>')
    html = f'''<div id="lab" class="clip" data-start="0" data-duration="{DUR}" data-track-index="1">{lab_svg()}</div>
<div id="grid"></div>
<div id="hdr" class="clip" data-start="0" data-duration="{DUR}" data-track-index="2">
  <div class="lg" data-layout-allow-overflow><img src="assets/img/logo.png" alt="" /></div>
  <div class="hl"><span class="nm">NAS100 EDGE LAB</span><span class="tr">TRADE #026 · SELL · TP</span></div>
  <div id="chs">{"".join(f'<span class="ch" id="ch{i}">{x}</span>' for i, x in enumerate(ch))}</div>
</div>
<div id="pbw" class="clip" data-start="0" data-duration="{DUR}" data-track-index="3"><div id="pb"></div></div>
{C("sG", f"""<div class="hk1 fx" id="g_1">UNA VENTA. UN TP.</div><div class="hk2 fx" id="g_2">¿QUÉ SABÍAMOS ANTES DE ENTRAR?</div><div class="hk3 fx" id="g_3">NAS100 EDGE LAB · #026</div>
<div class="viewer" id="cvA" style="top:250px;height:440px"><div class="cam"><img src="assets/img/chart.jpg" alt="" />{chart_overlay()}</div><div class="vnote">Gráfico: TradingView</div></div>
<div class="tpst fx" id="g_tp" style="left:610px;top:270px">TAKE PROFIT</div>""")}
{C("sE", f"""<div class="dpill fx" id="e_d">2 NOV 2026 · 11 PM COLOMBIA</div>
<div class="ebig fx" id="e_b"><span class="v">SELL</span> · ENTRADA REAL:<br/>28.066,65</div>{rows_html}
<div class="note fx" id="e_q" style="left:0;top:628px;width:900px;font-size:22px">Quality 78/100 · puntuación del indicador, no probabilidad de acierto</div>""")}
{C("sD", f"""<div class="viewer" id="cvB" style="top:0;height:690px"><div class="cam"><img src="assets/img/chart.jpg" alt="" />{chart_overlay()}</div><div class="vnote">Gráfico: TradingView · Ejecución: bróker</div></div>""")}
{C("sR", f"""<div class="rcard" id="rcd"><img src="assets/img/receipt.jpg" alt="" />{receipt_overlay()}</div>
<div class="res fx" id="r_e" style="top:480px"><div class="ln"><span>ENTRADA</span>28.066,65</div></div>
<div class="res fx" id="r_s" style="top:546px"><div class="ln"><span>SALIDA</span>27.965,95</div></div>
<div class="tpbig fx" id="r_tp" style="top:470px">TAKE PROFIT · +100,70 PUNTOS<small>DURACIÓN: 2 H 00 MIN 27 S</small></div>
<div class="note fx" id="r_n" style="left:0;top:650px;font-size:22px">Precios de ejecución: bróker</div>""")}
{C("sC1", f"""<div class="ttl"><div class="n">CONCLUSIÓN 1</div><div class="h">Documentar antes de saber</div></div>
<div class="mini" style="top:150px"><div class="a">LECTURA AL ENTRAR · 2 NOV · 11 PM</div>{mini}</div>
<div class="stampV fx" id="c1s" style="left:470px;top:236px">REGISTRADO AL DECIDIR</div>
<div class="tl2 fx" id="c1t" style="top:540px"><div class="ln2"></div><div class="nd" style="left:60px;background:var(--v)"></div><div class="nd" style="left:798px;background:#2A2F3D"></div>
<div class="lb" style="left:-70px;color:var(--v)">DECISIÓN</div><div class="lb" style="left:670px;color:var(--mu)">RESULTADO</div></div>""")}
{C("sC2", f"""<div class="ttl"><div class="n">CONCLUSIÓN 2</div><div class="h">Operación y sesión<br/>son distintas</div></div>
<div class="cardx fx" id="c2a" style="top:150px;border:3px solid var(--g)"><div class="a g">OPERACIÓN EJECUTADA · BRÓKER</div><div class="b g">+100,70 PTS</div><div class="c">2 h 00 min 27 s dentro del trade</div></div>
<div class="neq fx" id="c2n" style="top:306px">≠</div>
<div class="cardx fx" id="c2b" style="top:412px;border:3px solid var(--t)"><div class="a t">RECORRIDO DE LA SESIÓN · TRADINGVIEW</div><div class="b" style="font-size:44px">A FAVOR: 139 PTS · EN CONTRA: 19 PTS</div><div class="c">Incluye movimiento posterior a la salida</div></div>
<div class="note fx" id="c2c" style="left:0;top:640px;font-size:26px;color:var(--tx);font-weight:800">Información para investigar, no beneficio capturado.</div>""")}
{C("sC3", f"""<div class="ttl"><div class="n">CONCLUSIÓN 3</div><div class="h">Verificar la ejecución</div></div>
<div class="thumb fx" id="c3g" style="left:0;border-color:var(--v)"><img src="assets/img/chart.jpg" alt="" style="left:-40px;top:-470px;width:560px;height:949px;transform:scale(.95);transform-origin:0 0" /><div class="tag2 v">CONTEXTO · TradingView</div></div>
<div class="thumb fx" id="c3r" style="left:470px;border-color:var(--g);background:#1c1c1e"><img src="assets/img/receipt.jpg" alt="" style="left:-6px;top:60px;width:440px;height:212px" /><div style="position:absolute;left:290px;top:113px;width:138px;height:40px;border-radius:8px;background:#13161F;border:2px solid #64E087;color:#64E087;font-size:19px;font-weight:900;display:flex;align-items:center;justify-content:center">+100,70 pts</div><div style="position:absolute;left:96px;top:66px;width:160px;height:30px;border-radius:7px;background:#13161F;border:2px solid #A779F2;color:#F4F5F9;font-size:12px;white-space:nowrap;font-weight:900;display:flex;align-items:center;justify-content:center">TAKE PROFIT · 100 pts</div><div class="tag2 g">EJECUCIÓN · bróker</div></div>
<div class="note fx" id="c3t" style="left:0;top:510px;width:900px;font-size:34px;color:var(--tx);font-weight:850;line-height:1.25">Un TP documenta este trade.<br/><span class="v">No demuestra, por sí solo, ventaja estadística.</span></div>""")}
<div id="sEnd" class="clip fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}" style="position:absolute;left:90px;top:300px;width:900px;height:690px">
  <div class="endpill fx" id="eP">TRADE #026 · TP</div>
  <div class="H" style="position:absolute;top:96px;font-size:58px"><span>No buscamos</span><span>operaciones perfectas.</span><span class="v">Buscamos ventaja</span><span class="v">estadística.</span></div>
  <div class="abs fx" id="eL" style="left:0;top:400px;display:flex;align-items:center;gap:20px"><div class="lg" style="width:90px;height:90px" data-layout-allow-overflow><img src="assets/img/logo.png" alt="" /></div><div style="font-size:42px;font-weight:900;letter-spacing:.06em">NAS100 EDGE LAB</div></div>
  {end_sub}
</div>
<div id="caps" class="clip" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">{"".join(f'<div class="cp" id="cp{i}">{x[2]}</div>' for i, x in enumerate(caps))}</div>
<div id="av" class="clip" data-layout-allow-overflow data-start="0" data-duration="{DUR}" data-track-index="{TI()}"><div id="avGlow"></div><div id="avIn">{imgs}</div></div>
<div id="disc" class="clip fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">Contenido educativo · No es asesoría financiera · Operar implica riesgo de pérdida</div>'''
    return html

for V, L in [("tiktok", TK), ("shorts", SH)]:
    st = json.load(open(f"{TTS}/{V}_times.json")); T = {n: [s, round(s + d, 3)] for n, s, d in st}
    DUR = round(st[-1][1] + st[-1][2] + (2.3 if V == "tiktok" else 1.3), 1)
    d = f"{SCR}/t026-{V}"
    for sub in ["img", "avatar", "audio"]: os.makedirs(f"{d}/assets/{sub}", exist_ok=True)
    for sub in ["fonts", "vendor"]: shutil.copytree(f"{SCR}/nas030-tiktok/assets/{sub}", f"{d}/assets/{sub}", dirs_exist_ok=True)
    shutil.copy(f"{SCR}/nas030-tiktok/assets/img/logo.png", f"{d}/assets/img/")
    for f in ["chart.jpg", "receipt.jpg"]: shutil.copy(f"{W26}/img/{f}", f"{d}/assets/img/")
    for k, f in list(POSES.items()) + list(OVER.items()): shutil.copy(f"{AV}/{f}.webp", f"{d}/assets/avatar/{k}.webp")
    for k in GLOW: shutil.copy(f"{SCR}/s10/glow/{k}.webp", f"{d}/assets/avatar/gl_{k}.webp")
    shutil.copy(f"{SCR}/nas030-tiktok/hyperframes.json", d)
    json.dump({"name": f"t026-{V}", "private": True, "type": "module"}, open(d + "/package.json", "w")); json.dump({"id": f"t026-{V}", "name": f"t026-{V}"}, open(d + "/meta.json", "w"))
    capm = {i: c for i, _, c in L}; caps = []
    for n_, s, du in st:   # máximo dos líneas: cada tramo del | es una línea en pantalla
        parts = capm[n_].split("|"); Ls = [len(p) for p in parts]; t = s
        for p, l in zip(parts, Ls):
            dd = du * l / sum(Ls); caps.append([round(t, 2), round(t + dd, 2), p]); t += dd
    for k in range(len(caps) - 1): caps[k][1] = round(min(caps[k + 1][0], caps[k][1] + 0.5), 2)
    caps[-1][1] = round(caps[-1][1] + 0.6, 2)
    ENV = envelope(f"{TTS}/{V}_narr.wav", DUR)
    html = f'''<!doctype html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=1080, height=1920" />
<title>NAS100 EDGE LAB · Trade #026 · {V}</title><script src="assets/vendor/gsap.min.js"></script>
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
