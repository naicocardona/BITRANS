# NAS100 EDGE LAB · TRADE #027 (BUY · TP) · TikTok y YouTube Shorts con la voz A del Explorador y laboratorio ilustrado
import os, sys, json, re, shutil, numpy as np, soundfile as sf
SCR = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work")
AV = "/home/user/BITRANS/entregas/nas100edgelab/avatar/explorador/V3"
W26 = f"{SCR}/t027"; TTS = f"{W26}/tts"
sys.path.insert(0, W26); from script import TK, SH
POSES = {"neutral": "bases/avatar_neutral", "explica": "bases/avatar_explica", "senala": "bases/avatar_senala",
         "pensativo": "bases/avatar_pensativo", "satisfecho": "bases/avatar_satisfecho",
         "habla_2": "habla_2", "habla_3": "habla_3", "senala_t1": "senala_t1", "senala_t2": "senala_t2",
         "tp_t1": "tp_t1", "tp_t2": "tp_t2", "piensa_t1": "piensa_t1", "piensa_t2": "piensa_t2",
         "gira_1": "gira_1", "gira_2": "gira_2", "gira_3": "gira_3"}
OVER = {"explica_c": "explica_ojos_cerrados", "senala_c": "senala_ojos_cerrados", "pensativo_c": "pensativo_ojos_cerrados", "satisfecho_c": "satisfecho_ojos_cerrados"}
GLOW = ["neutral", "explica", "senala", "pensativo", "satisfecho", "senala_t1", "senala_t2", "tp_t1", "tp_t2", "piensa_t1", "piensa_t2", "gira_1"]
CSS = open(f"{SCR}/tools/s11.css").read() + open(f"{SCR}/tools/t026.css").read() + open(f"{SCR}/tools/t027.css").read()
JS = open(f"{SCR}/tools/t027.js").read()

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

def chart_overlay():   # captura 462×1031: resaltados sobre elementos existentes
    return ('<svg width="462" height="1031" viewBox="0 0 462 1031">'
            '<rect class="hiE" x="56" y="616" width="390" height="14" rx="7" fill="none" stroke="#A779F2" stroke-width="5" opacity="0"/>'
            '<path class="hiD" d="M62 620 L103 463" fill="none" stroke="#3FD0C9" stroke-width="6" stroke-linecap="round" opacity="0"/>'
            '<rect class="hiT" x="56" y="452" width="390" height="18" rx="8" fill="none" stroke="#64E087" stroke-width="5" opacity="0"/>'
            '<rect class="hiO" x="150" y="372" width="296" height="270" rx="16" fill="none" stroke="#F4F5F9" stroke-width="4" stroke-dasharray="14 10" opacity="0"/>'
            '<g class="lbE" opacity="0"><rect x="290" y="640" width="150" height="38" rx="9" fill="#090B10"/><text x="365" y="666" font-family="Inter" font-weight="900" font-size="20" text-anchor="middle" fill="#A779F2">ENTRADA</text></g>'
            '<g class="lbT" opacity="0"><rect x="290" y="404" width="150" height="38" rx="9" fill="#090B10"/><text x="365" y="430" font-family="Inter" font-weight="900" font-size="20" text-anchor="middle" fill="#64E087">OBJETIVO</text></g>'
            '<g class="lbI" opacity="0"><rect x="6" y="500" width="120" height="38" rx="9" fill="#090B10"/><text x="66" y="526" font-family="Inter" font-weight="900" font-size="20" text-anchor="middle" fill="#3FD0C9">IMPULSO</text></g>'
            '<g class="lbO" opacity="0"><rect x="160" y="380" width="280" height="36" rx="9" fill="#090B10"/><text x="300" y="405" font-family="Inter" font-weight="900" font-size="18" text-anchor="middle" fill="#F4F5F9">OSCILACIONES POSTERIORES</text></g>'
            '</svg>')

def receipt_overlay():   # comprobante 828×405 mostrado a 900×440; dinero y lotes tapados SIEMPRE (desde el primer cuadro)
    k = 900 / 828; R = lambda x, y, w, h: f'x="{x*k:.0f}" y="{y*k:.0f}" width="{w*k:.0f}" height="{h*k:.0f}"'
    return (f'<svg width="900" height="440" viewBox="0 0 900 440">'
            f'<rect class="rhE" {R(24, 112, 352, 56)} rx="10" fill="none" stroke="#A779F2" stroke-width="5" opacity="0"/>'
            f'<rect class="rhD" {R(24, 226, 592, 46)} rx="10" fill="none" stroke="#3FD0C9" stroke-width="5" opacity="0"/>'
            f'<rect class="rhT" {R(194, 338, 138, 44)} rx="10" fill="none" stroke="#64E087" stroke-width="5" opacity="0"/>'
            f'<g class="cvM"><rect {R(560, 104, 256, 70)} rx="12" fill="#13161F" stroke="#64E087" stroke-width="3"/>'
            f'<text x="{688*k:.0f}" y="{128*k:.0f}" font-family="Inter" font-weight="900" font-size="15" text-anchor="middle" fill="#F4F5F9" letter-spacing="1.5">RESULTADO EN PUNTOS</text>'
            f'<text x="{688*k:.0f}" y="{160*k:.0f}" font-family="Inter" font-weight="900" font-size="30" text-anchor="middle" fill="#64E087">+100 pts</text></g>'
            f'<g class="cvL"><rect {R(186, 16, 250, 52)} rx="12" fill="#13161F" stroke="#A779F2" stroke-width="3"/>'
            f'<text x="{311*k:.0f}" y="{50*k:.0f}" font-family="Inter" font-weight="900" font-size="22" text-anchor="middle" fill="#F4F5F9">TAKE PROFIT · 100 pts</text></g>'
            '</svg>')

CLOCK = '''<svg width="300" height="300" viewBox="0 0 300 300"><circle cx="150" cy="150" r="128" fill="#13161F" stroke="#A779F2" stroke-width="12"/>
{ticks}<g id="hrH"><line x1="150" y1="150" x2="150" y2="78" stroke="#A779F2" stroke-width="14" stroke-linecap="round"/></g>
<g id="mnH"><line x1="150" y1="150" x2="150" y2="44" stroke="#F4F5F9" stroke-width="9" stroke-linecap="round"/></g><circle cx="150" cy="150" r="12" fill="#F4F5F9"/></svg>'''
CLOCK = CLOCK.replace("{ticks}", "".join(f'<rect x="146" y="30" width="8" height="{22 if k % 3 == 0 else 12}" rx="4" fill="#F4F5F9" opacity=".7" transform="rotate({k*30} 150 150)"/>' for k in range(12)))

def body(V, DUR, caps):
    tk = V == "tiktok"
    ch = ["GANCHO", "ENTRADA", "DESARROLLO", "RESULTADO", "CONCLUSIÓN 1", "CONCLUSIÓN 2", "CONCLUSIÓN 3", "CIERRE"]
    n = [10]
    def TI(): n[0] += 1; return n[0]
    C = lambda i, inner: f'<div id="{i}" class="clip scene fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">{inner}</div>'
    imgs = "".join(f'<img id="av_{k}" class="pose" src="assets/avatar/{k}.webp" alt="" />' for k in POSES)
    imgs += "".join(f'<img id="av_{k}" class="ov" src="assets/avatar/{k}.webp" alt="" />' for k in OVER)
    imgs += "".join(f'<img id="gl_{k}" class="gl" src="assets/avatar/gl_{k}.webp" alt="" />' for k in GLOW)
    rows = [("SCORE 7/10 · MÍNIMO 6", ""), ("BULL +4 / BEAR −1", "Alpha Radar"), ("QUALITY 63/100", "Puntuación")]
    rows_html = "".join(f'<div class="row4 fx" id="er{k}" style="top:{250 + k * 104}px"><div class="sw"></div><i>✓</i><span>{a}</span><span class="mu2">{b}</span></div>' for k, (a, b) in enumerate(rows))
    end_sub = ('<div class="abs fx" id="eC" style="left:0;top:560px;width:900px;font-size:34px;font-weight:850;color:var(--t)">Sigue la bitácora para ver el siguiente trade.</div>' if tk else
               '<div class="abs fx" id="eC" style="left:0;top:560px;width:900px;font-size:30px;font-weight:850;line-height:1.3">Esto es <span class="v">NAS100 EDGE LAB</span>,<br/>un laboratorio de <span class="t">TITÁN HOLDING</span>.</div>')
    VW = lambda id, top, h, note: f'<div class="viewer" id="{id}" style="top:{top}px;height:{h}px"><div class="cam"><img src="assets/img/chart.jpg" alt="" />{chart_overlay()}</div><div class="vnote">{note}</div></div>'
    return f'''<div id="lab" class="clip" data-start="0" data-duration="{DUR}" data-track-index="1">{lab_svg()}</div>
<div id="grid"></div>
<div id="hdr" class="clip" data-start="0" data-duration="{DUR}" data-track-index="2">
  <div class="lg" data-layout-allow-overflow><img src="assets/img/logo.png" alt="" /></div>
  <div class="hl"><span class="nm">NAS100 EDGE LAB</span><span class="tr">TRADE #027 · BUY · TP</span></div>
  <div id="chs">{"".join(f'<span class="ch" id="ch{i}">{x}</span>' for i, x in enumerate(ch))}</div>
</div>
<div id="pbw" class="clip" data-start="0" data-duration="{DUR}" data-track-index="3"><div id="pb"></div></div>
{C("sG", f"""<div class="hk1 fx" id="g_1" style="font-size:66px">CAMBIAMOS LA HORA<br/>DE ENTRADA</div><div class="hk2 fx" id="g_2" style="top:150px">¿CÓMO SALIÓ ESTA COMPRA?</div><div class="hk3 fx" id="g_3" style="top:214px">NAS100 EDGE LAB · #027</div>
<div id="clkW" class="fx" style="position:absolute;left:300px;top:280px;width:300px;height:300px">{CLOCK}</div>
<div id="clkL" class="fx" style="position:absolute;left:0;top:600px;width:900px;text-align:center;font-size:52px;font-weight:900"><span class="mu" id="h9">9 AM</span> <span class="v">→</span> <span class="t">10 AM</span></div>
{VW("cvA", 270, 420, "Gráfico: TradingView")}
<div class="tpst fx" id="g_tp" style="left:600px;top:290px">TAKE PROFIT</div>""")}
{C("sE", f"""<div class="dpill fx" id="e_d">3 NOV 2026 · 10 AM COLOMBIA</div>
<div class="ebig fx" id="e_b" style="top:80px"><span class="v">BUY</span> · ENTRADA REAL:<br/>28.160,40</div>
<div class="note fx" id="e_a" style="left:0;top:200px;font-size:24px;color:var(--t);font-weight:800">Ajuste: entrada de 9 a 10 AM tras el cambio horario de EE. UU.</div>{rows_html}
<div class="note fx" id="e_q" style="left:0;top:580px;width:900px;font-size:22px">Quality es una puntuación del indicador, no una probabilidad de ganar.</div>""")}
{C("sD", f"""{VW("cvB", 0, 690, "Gráfico: TradingView · Ejecución: bróker")}<div class="dpill fx" id="d_t" style="left:14px;top:14px;font-size:24px">EL IMPULSO ALCISTA ALCANZÓ EL OBJETIVO</div>""")}
{C("sR", f"""<div class="rcard" id="rcd" style="height:440px"><img src="assets/img/receipt.jpg" alt="" style="height:440px" />{receipt_overlay()}</div>
<div class="res fx" id="r_e" style="top:486px"><div class="ln"><span>ENTRADA</span>28.160,40</div></div>
<div class="res fx" id="r_s" style="top:552px"><div class="ln"><span>SALIDA</span>28.260,40</div></div>
<div class="tpbig fx" id="r_tp" style="top:476px">TAKE PROFIT · +100 PUNTOS<small>DURACIÓN: 36 MIN 45 S</small></div>
<div class="note fx" id="r_n" style="left:0;top:656px;font-size:22px">Precios de ejecución: bróker</div>""")}
{C("sC1", f"""<div class="ttl"><div class="n">CONCLUSIÓN 1</div><div class="h" style="font-size:48px">Cambiar la hora<br/>también se documenta</div></div>
<div class="mini" style="top:170px;text-align:center"><div class="a">HORA DE ENTRADA</div><div style="font-size:84px;font-weight:900;margin-top:6px"><span class="mu">9 AM</span> <span class="v">→</span> <span class="t">10 AM</span></div></div>
<div class="stampV fx" id="c1s" style="left:190px;top:350px">AJUSTE EN OBSERVACIÓN</div>
<div class="tl2 fx" id="c1t" style="top:480px"><div class="ln2"></div>{"".join(f'<div class="nd" style="left:{60 + k*184}px;background:{"var(--g)" if k == 0 else "#2A2F3D"}"></div>' for k in range(5))}
<div class="lb" style="left:-70px;color:var(--g)">#027 · TP</div><div class="lb" style="left:300px;color:var(--mu)">PRÓXIMAS OPERACIONES</div></div>""")}
{C("sC2", f"""<div class="ttl"><div class="n">CONCLUSIÓN 2</div><div class="h" style="font-size:42px">Alcanzar el objetivo no exige<br/>una subida continua</div></div>
{VW("cvC", 130, 470, "Gráfico: TradingView")}
<div class="dpill fx" id="c2x" style="left:0;top:614px;font-size:22px;border-color:rgba(100,224,135,.6)">Acreditado: salida en TP · lo posterior es contexto</div>""")}
{C("sC3", f"""<div class="ttl"><div class="n">CONCLUSIÓN 3</div><div class="h" style="font-size:44px">100 puntos capturados;<br/>el resto es seguimiento</div></div>
<div class="cardx fx" id="c3a" style="top:150px;border:3px solid var(--g)"><div class="a g">EJECUCIÓN REAL · BRÓKER</div><div class="b g">+100 PTS</div><div class="c">36 min 45 s dentro del trade</div></div>
<div class="neq fx" id="c3n" style="top:306px">≠</div>
<div class="cardx fx" id="c3b" style="top:412px;border:3px solid var(--t)"><div class="a t">SEGUIMIENTO PARCIAL · TRADINGVIEW</div><div class="b" style="font-size:44px">156 A FAVOR / 39 EN CONTRA</div><div class="c">Incluye seguimiento posterior a la salida</div></div>
<div class="note fx" id="c3c" style="left:0;top:640px;font-size:26px;color:var(--tx);font-weight:800">No son ganancias adicionales ni la medición definitiva.</div>""")}
<div id="sEnd" class="clip fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}" style="position:absolute;left:90px;top:300px;width:900px;height:690px">
  <div class="endpill fx" id="eP">TRADE #027 · BUY · TP · +100 PUNTOS</div>
  <div class="H" style="position:absolute;top:96px;font-size:58px"><span>No buscamos</span><span>operaciones perfectas.</span><span class="v">Buscamos ventaja</span><span class="v">estadística.</span></div>
  <div class="abs fx" id="eL" style="left:0;top:400px;display:flex;align-items:center;gap:20px"><div class="lg" style="width:90px;height:90px" data-layout-allow-overflow><img src="assets/img/logo.png" alt="" /></div><div style="font-size:42px;font-weight:900;letter-spacing:.06em">NAS100 EDGE LAB</div></div>
  {end_sub}
</div>
<div id="caps" class="clip" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">{"".join(f'<div class="cp" id="cp{i}">{x[2]}</div>' for i, x in enumerate(caps))}</div>
<div id="av" class="clip" data-layout-allow-overflow data-start="0" data-duration="{DUR}" data-track-index="{TI()}"><div id="avGlow"></div><div id="avIn">{imgs}</div></div>
<div id="disc" class="clip fx" data-start="0" data-duration="{DUR}" data-track-index="{TI()}">Contenido educativo · No es asesoría financiera · Operar implica riesgo de pérdida</div>'''

for V, L in [("tiktok", TK), ("shorts", SH)]:
    st = json.load(open(f"{TTS}/{V}_times.json")); T = {n: [s, round(s + d, 3)] for n, s, d in st}
    DUR = round(st[-1][1] + st[-1][2] + (1.8 if V == "tiktok" else 1.6), 1)
    d = f"{SCR}/t027-{V}"
    for sub in ["img", "avatar", "audio"]: os.makedirs(f"{d}/assets/{sub}", exist_ok=True)
    for sub in ["fonts", "vendor"]: shutil.copytree(f"{SCR}/nas030-tiktok/assets/{sub}", f"{d}/assets/{sub}", dirs_exist_ok=True)
    shutil.copy(f"{SCR}/nas030-tiktok/assets/img/logo.png", f"{d}/assets/img/")
    for f in ["chart.jpg", "receipt.jpg"]: shutil.copy(f"{W26}/img/{f}", f"{d}/assets/img/")
    for k, f in list(POSES.items()) + list(OVER.items()): shutil.copy(f"{AV}/{f}.webp", f"{d}/assets/avatar/{k}.webp")
    for k in GLOW: shutil.copy(f"{SCR}/s10/glow/{k}.webp", f"{d}/assets/avatar/gl_{k}.webp")
    shutil.copy(f"{SCR}/nas030-tiktok/hyperframes.json", d)
    json.dump({"name": f"t027-{V}", "private": True, "type": "module"}, open(d + "/package.json", "w")); json.dump({"id": f"t027-{V}", "name": f"t027-{V}"}, open(d + "/meta.json", "w"))
    capm = {i: c for i, _, c in L}; caps = []
    for n_, s, du in st:   # máximo dos líneas: cada tramo del | es una línea en pantalla
        parts = capm[n_].split("|"); Ls = [len(p) for p in parts]; t = s
        for p, l in zip(parts, Ls):
            dd = du * l / sum(Ls); caps.append([round(t, 2), round(t + dd, 2), p]); t += dd
    for k in range(len(caps) - 1): caps[k][1] = round(min(caps[k + 1][0], caps[k][1] + 0.5), 2)
    caps[-1][1] = round(caps[-1][1] + 0.6, 2)
    ENV = envelope(f"{TTS}/{V}_narr.wav", DUR)
    html = f'''<!doctype html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=1080, height=1920" />
<title>NAS100 EDGE LAB · Trade #027 · {V}</title><script src="assets/vendor/gsap.min.js"></script>
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
