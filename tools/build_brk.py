# TITÁN · Berkshire recompras (Short y TikTok) · basado en el armador del paquete «Nasdaq y cómo empezar» · armador de los 5 videos
# Uso: python3 tools/build_nq.py lg|sh1|tk1|sh2|tk2   (antes: python3 tools/nq_voice.py)
import os, sys, json, re, shutil, importlib.util as U
MODE = sys.argv[1]; LG = False
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
SCR = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work"); W = f"{SCR}/brk"
sp = U.spec_from_file_location("ta", f"{H}/tq_anchors.py"); ta = U.module_from_spec(sp); sp.loader.exec_module(ta)
import brk_scenes as NS
d = json.load(open(f"{W}/{ {'sh': 'shorts', 'tk': 'tiktok'}[MODE] }.words.json")); Wd = d["display"]; DUR = round(d["dur"], 2)
NW = [ta.norm(w[0]) for w in Wd]
AMB = set()
def A(ph, n=0, after=0.0):
    ks = [ta.norm(x) for x in ph.split()]; hits = [i for i in range(len(NW) - len(ks) + 1) if NW[i:i + len(ks)] == ks and Wd[i][1] >= after]
    if len(hits) <= n: raise SystemExit(f"[{MODE}] ancla no encontrada: «{ph}»")
    if len(hits) > 1 and n == 0 and after == 0: AMB.add(f"«{ph}» aparece {len(hits)} veces: {[round(Wd[h][1], 1) for h in hits]}")
    return round(Wd[hits[n]][1], 3)
def B(t, fs, c=""): return f'<div class="B {c}" style="display:inline-block;font-size:{fs}px;line-height:1.1;padding:10px 22px 14px;border-radius:16px;background:rgba(13,16,32,.88)">{t}</div>'
def TAG(t): return f'<div class="tag" style="position:relative;display:inline-block;font-size:24px;margin-bottom:10px">{t}</div>'
FS = 54 if LG else 56
# ================= plan Berkshire (sh = Short, tk = TikTok) =================
import re as _re
def prefixed(fn, p):   # copia una escena con todos sus ids prefijados (para volver a una mesa «nueva»)
    def g():
        s = fn(); s = _re.sub(r'id="([^"]+)"', lambda m: f'id="{p}{m.group(1)}"', s)
        return s.replace('url(#', f'url(#{p}')
    return g
SCF = dict(NS.SCENES); SCF["table2"] = prefixed(NS.s_table, "b")
TK = MODE == "tk"
def hookbeats(px, t):   # dos fichas salen hacia la caja, el dinero sale y los vendedores se van; la ficha dorada no se mueve
    b = []
    for k, (ci, dx) in enumerate([(8, -304), (9, -392)]):
        b += [[t + k * 0.25, "move", f"#{px}ch{ci}", dx, -160, 0.55], [t + 0.5 + k * 0.25, "dim", f"#{px}ch{ci}", 0.0]]
    b += [[t + 0.2, "move", f"#{px}bl0", -70, 330, 0.6], [t + 0.3, "move", f"#{px}bl1", -60, 340, 0.6], [t + 0.4, "move", f"#{px}bl2", 80, 330, 0.6], [t + 0.5, "move", f"#{px}bl3", 90, 340, 0.6]]
    b += [[t + 0.15, "on", f"#{px}bl0, #{px}bl1, #{px}bl2, #{px}bl3"], [t + 1.0, "dim", f"#{px}bl0, #{px}bl1, #{px}bl2, #{px}bl3", 0.0]]
    b += [[t + 0.2, "move", f"#{px}boxL", 0, 60, 0.9], [t + 0.25, "shake", f"#{px}box"], [t + 0.6, "pop", f"#{px}c8"], [t + 0.6, "dim", f"#{px}c10", 0.0]]
    b += [[t + 1.1, "walk", f"{px}sa", -260, 1.4], [t + 1.2, "walk", f"{px}sb", -260, 1.4], [t + 0.9, "pulse", f"#{px}ch0"]]
    return b
t_n = A("Berkshire") - 0.3; t_t = A("Imagina") - 0.35; t_c = A("Mira") - 0.3; t_e = A("Antes de celebrar") - 0.35
if TK:
    t_x = A("Imagina dos empresas") - 0.35
    SCN = [("table", 0, None, (540, 540, 1.0), (540, 560, 1.04)), ("news", t_n, "whip", (540, 540, 1.0), (540, 560, 1.05)),
           ("table2", t_t, "wipe", (540, 600, 1.0), (540, 580, 1.04)), ("compare", t_x, "whip", (540, 540, 1.0), (540, 560, 1.04)), ("end", t_e, "wipe", (540, 520, 1.0), (540, 540, 1.05))]
else:
    SCN = [("table", 0, None, (540, 540, 1.0), (540, 560, 1.04)), ("news", t_n, "whip", (540, 540, 1.0), (540, 560, 1.05)),
           ("table2", t_t, "wipe", (540, 600, 1.0), (540, 580, 1.04)), ("end", t_e, "wipe", (540, 520, 1.0), (540, 540, 1.05))]
BEATS = hookbeats("", 0.6) + [[0.2, "pulse", "#ch0"], [0.3, "face", "yo", "sm"], [1.6, "face", "yo", "oh"], [2.4, "shrug", "yo"]]
# noticia
BEATS += [[t_n + 0.05, "pop", "#bh"], [A("gastó unos"), "pop", "#amt"], [A("gastó unos") + 0.1, "shake", "#amt"], [A("en un trimestre."), "show", "#mo0"], [A("en un trimestre.") + 0.25, "show", "#mo1"],
          [A("en un trimestre.") + 0.5, "show", "#mo2"], [A("en un trimestre.") + 0.7, "show", "#qtag"], [A("recomprando"), "show", "#rep"], [A("¿Qué cambia"), "face", "rd", "oh"],
          [A("¿Qué cambia") + 0.3, "shrug", "rd2"], [t_n + 0.6, "walk", "rd", 180, 1.6]]
# fichas: 10 → 8 (mesa nueva)
tr = A("las retira,")
BEATS += [[t_t + 0.2, "pulse", "#bch0"], [A("tuya."), "pulse", "#bch0"], [A("tuya."), "jump", "byo"], [A("tuya.") + 0.2, "face", "byo", "sm"],
          [A("Si la empresa") + 0.4, "pulse", "#bch8, #bch9"], [A("Si la empresa") + 0.7, "point", "bsa"]]
BEATS += [[tr - 0.1, "pop", "#bret"]] + [x for x in hookbeats("b", tr) if x[2] not in ("#bboxL",)]
BEATS += [[A("tú sigues"), "pop", "#bkeep"], [A("tú sigues") + 0.2, "pulse", "#bch0"]]
t_p = A("Pero ahora tienes") if TK else A("pero ahora es")
BEATS += [[t_p, "dim", "#bp10", 0.0], [t_p + 0.05, "pop", "#bp125"], [t_p + 0.4, "pulse", "#bp125"], [t_p + 0.3, "cheer", "byo"], [t_p, "cam", 2, 540, 640, 1.05, 0.8]]
# la caja: retroceso breve y el dinero que salió
BEATS += [[t_c + 0.05, "cam", 2, 540, 540, 1.0, 0.6]]
for ci in (8, 9): BEATS += [[t_c + 0.1, "move", f"#bch{ci}", 0, 0, 0.6], [t_c + 0.1, "lit", f"#bch{ci}"]]
BEATS += [[t_c + 0.1, "lit", "#bc10"], [t_c + 0.1, "dim", "#bc8", 0.0], [t_c + 0.1, "move", "#bboxL", 0, 0, 0.5], [t_c + 0.1, "dim", "#bret, #bkeep", 0.0]]
td = A("salió dinero") if not TK else A("salió dinero de")
BEATS += [[td - 0.6, "cam", 2, 800, 380, 1.45, 0.9]] + [x for x in hookbeats("b", td) if x[1] not in ("walk",)] + [[td + 0.3, "move", "#bboxL", 0, 70, 1.2], [td + 0.2, "shake", "#bbox"], [td + 1.6, "cam", 2, 540, 560, 1.0, 0.9]]
if not TK:
    BEATS += [[A("pagó demasiado"), "shake", "#bbox"], [A("pagó demasiado"), "face", "byo", "fl"], [A("valga más."), "shrug", "byo"]]
else:
    BEATS += [[A("Suena bien"), "face", "byo", "sm"], [A("¿cierto?"), "face", "byo", "fl"]]
    tq = A("retiran exactamente")
    BEATS += [[tq, "move", "#cAc3", 0, -260, 0.6], [tq, "move", "#cAc4", 0, -260, 0.6], [tq + 0.15, "move", "#cBc3", 0, -260, 0.6], [tq + 0.15, "move", "#cBc4", 0, -260, 0.6],
              [tq + 0.6, "dim", "#cAc3, #cAc4, #cBc3, #cBc4", 0.0], [A("mismo número"), "pop", "#same"], [A("razonable."), "pop", "#cAd"], [A("razonable."), "move", "#cAboxL", 0, 40, 0.9],
              [A("paga de más."), "pop", "#cBd"], [A("paga de más."), "move", "#cBboxL", 0, 110, 1.2], [A("paga de más.") + 0.2, "shake", "#cBbox"],
              [A("En ambas"), "pulse", "#cAc0, #cBc0"], [A("pero la segunda"), "pulse", "#cBd"], [A("pero la segunda") + 0.2, "shake", "#cBbox"],
              [A("Ese dinero también"), "on", "#alts"], [A("mejorar"), "pop", "#al0"], [A("pagar deuda"), "pop", "#al1"], [A("otra oportunidad."), "pop", "#al2"]]
# cierre
BEATS += [[t_e - 0.02, "on", "#q1, #q2"], [t_e + 0.8, "dim", "#q1, #q2", 0.3], [A("cuánto pagó"), "lit", "#q1"], [A("cuánto pagó") + 0.1, "shake", "#q1"], [A("qué otra cosa"), "lit", "#q2"], [A("qué otra cosa") + 0.1, "shake", "#q2"],
          [t_e + 0.4, "pulse", "#eChip"], [A("qué otra cosa") + 1.0, "wave", "eA"], [DUR - 1.4, "jump", "eB"]]
OV = [(B("TU PORCIÓN CRECE.", 74) + "<br>" + B("¿Y TU DINERO?", 74, "gold").replace('style="', 'style="margin-top:10px;', 1), 0, t_n),
      (TAG("RECOMPRAS · 3.ER TRIMESTRE DE 2026") + "<br>" + B("Berkshire recompró sus propias acciones", 50), t_n + 0.3, A("¿Qué cambia")),
      (B("¿Qué cambia para quien se queda?", 56, "gold"), A("¿Qué cambia"), t_t),
      (B("10 fichas · 1 es tuya", 64), t_t + 0.3, A("Si la empresa")),
      (B("La empresa recompra 2 y las retira", 54), A("Si la empresa"), t_p),
      (B("Tu parte: 10 % → 12,5 %", 64, "gold"), t_p, t_c),
      (B("Pero salió dinero de la caja", 60), t_c + 0.1, (A("pagó demasiado") if not TK else t_x))]
if not TK:
    OV += [(B("Porción más grande ≠ inversión que vale más", 48, "gold"), A("pagó demasiado"), t_e)]
else:
    OV += [(TAG("EJEMPLO HIPOTÉTICO") + "<br>" + B("Mismas acciones retiradas", 58), t_x + 0.3, A("pero la segunda")),
           (TAG("EJEMPLO HIPOTÉTICO") + "<br>" + B("B entregó más dinero por lo mismo", 52, "gold"), A("pero la segunda"), A("Ese dinero también")),
           (B("Ese dinero tenía otros usos", 60), A("Ese dinero también"), A("Por eso el tamaño")),
           (B("El tamaño del anuncio no lo dice todo", 52, "gold"), A("Por eso el tamaño"), t_e)]
OV += [(B("Antes de celebrar una recompra…", 56), t_e + 0.3, DUR)]
HUDL = ["Tu parte", "Berkshire", "Fichas", "Caja"] + (["Comparación"] if TK else []) + ["Preguntas"]
HUDT = [0, t_n, t_t, t_c] + ([t_x] if TK else []) + [t_e]
CTA_T, CTA = A("qué otra cosa") + 1.2, ("Contenido educativo.", "No es una recomendación de inversión.")

# ================= comprobaciones automáticas (QC) =================
for x in sorted(AMB): print(f"[{MODE}] AVISO ancla ambigua (se usa la primera): {x}")
for h, a_, b_ in OV:
    if not (0 <= a_ < b_ <= DUR + 0.01): raise SystemExit(f"[{MODE}] titular con tiempos inválidos ({a_}→{b_}): {re.sub('<[^>]+>', ' ', h)[:60]}")
ts = [s[1] for s in SCN]
if ts != sorted(ts) or len(set(ts)) != len(ts): raise SystemExit(f"[{MODE}] escenas fuera de orden: {ts}")
for b in BEATS:
    if not (0 <= b[0] <= DUR): raise SystemExit(f"[{MODE}] efecto fuera de rango: {b}")
# guardia: ningún id de escena puede chocar con los contenedores del motor (s0…, cam0…, wipe0…, h0…)
_SF = SCF if "SCF" in globals() else NS.SCENES
for _k, _f in _SF.items():
    _bad = [i for i in re.findall(r'id="([^"]+)"', _f()) if re.fullmatch(r"(s|cam|wipe|h|hs|cg)\d+|cw\d+_\d+", i)]
    if _bad: raise SystemExit(f"[{MODE}] escena «{_k}» usa ids reservados del motor: {_bad}")
# ================= HTML =================
SC = [s[0] for s in SCN]
scn = [dict(k=s[0], t0=round(s[1], 3), t1=round(SCN[i + 1][1] + 0.7, 3) if i + 1 < len(SCN) else DUR, tr=s[2], c0=s[3], c1=s[4], zp=(s[5] if len(s) > 5 else None)) for i, s in enumerate(SCN)]
G = [g for g in ta.groups(Wd, 3) if g[0] < DUR - 0.2]
P = f"{W}/brk-{MODE}"; os.makedirs(f"{P}/assets/audio", exist_ok=True)
for sub in ["vendor", "fonts"]: shutil.copytree(f"{H}/kit/tq-3d/assets/{sub}", f"{P}/assets/{sub}", dirs_exist_ok=True)
shutil.copy(f"{H}/kit/tq-3d/hyperframes.json", P)
json.dump({"name": f"brk-{MODE}", "private": True, "type": "module"}, open(f"{P}/package.json", "w")); json.dump({"id": f"nq-{MODE}", "name": f"brk-{MODE}"}, open(f"{P}/meta.json", "w"))
if os.path.exists(f"{W}/{MODE}_mix.wav"): shutil.copy(f"{W}/{MODE}_mix.wav", f"{P}/assets/audio/mix.wav")
VW, VH = (1920, 1080) if LG else (1080, 1920)
STG = "left:840px;top:0px" if LG else "left:0px;top:420px"
n = [0]
def C(i, inner, style):
    n[0] += 1; return f'<div id="{i}" class="clip" data-start="0" data-duration="{DUR}" data-track-index="{n[0]}" style="position:absolute;{style}">{inner}</div>'
FIGS = sorted(set(re.findall(r'id="([A-Za-z0-9]+)-h"', "".join(SCF[k]() for k in SC))))
body = [C(f"s{k}", f'<div style="position:absolute;{STG};width:1080px;height:1080px;overflow:hidden"><div id="cam{k}" style="position:absolute;left:0;top:0;width:1080px;height:1080px;transform-origin:0 0">{SCF[nm]()}</div>'
          f'<div id="wipe{k}" style="position:absolute;left:480px;top:480px;width:120px;height:120px;border-radius:50%;background:#C8A45D;opacity:0"></div></div>', f"left:0;top:0;width:{VW}px;height:{VH}px")
        for k, nm in enumerate(SC)]
if LG:
    body += [C("panel", "", "left:0;top:0;width:840px;height:1080px;background:linear-gradient(90deg,#0D1020 86%,rgba(13,16,32,0))"),
             C("brand", '<div style="font-family:Jakarta;font-weight:800;font-size:30px;letter-spacing:.32em;color:#C8A45D">TITÁN HOLDING</div>', "left:70px;top:60px")]
    hudpos, ovpos, cappos, ctapos = "left:70px;top:120px;width:760px;white-space:nowrap", "left:70px;top:190px;width:730px", "left:40px;top:820px;width:780px;height:220px", "left:70px;top:520px;width:720px"
else:
    body += [C("topshade", "", "left:0;top:0;width:1080px;height:430px;background:#0D1020"), C("botshade", "", "left:0;top:1500px;width:1080px;height:420px;background:linear-gradient(180deg,rgba(13,16,32,0),#0D1020 18%)"),
             C("brand", '<div style="font-family:Jakarta;font-weight:800;font-size:30px;letter-spacing:.32em;color:#C8A45D">TITÁN HOLDING</div>', "left:70px;top:140px")]
    hudpos, ovpos, cappos, ctapos = "left:70px;top:196px;width:960px;white-space:nowrap", "left:70px;top:252px;width:940px", "left:60px;top:1530px;width:960px;height:220px", "left:70px;top:252px;width:940px"; CTAFS = 40
    OV = [(h, a_, min(b_, CTA_T)) for h, a_, b_ in OV if a_ < CTA_T - 0.3]
hud = "".join(f'<span id="hs{k}" class="hs">{h}</span>' for k, h in enumerate(HUDL))
body += [C("hud", hud, hudpos)]
body += [C(f"h{i}", h, f"{ovpos};opacity:{1 if a_ < 0.05 else 0}") for i, (h, a_, _) in enumerate(OV)]
body += [C("caps", ta.caps_html(G, 52 if LG else 62), cappos)]
body += [C("cta", f'<div class="B" style="font-size:{44 if LG else 40}px;color:#F6F4EF;background:rgba(13,16,32,.92);padding:16px 24px;border-radius:16px;border:3px solid #C8A45D">{CTA[0]}<br>{CTA[1]}</div>', f"{ctapos};opacity:0")]
CSS = open(f"{H}/tq.css").read() + ":root{--navy:#0D1020;--gold:#C8A45D;--ivory:#F6F4EF}" + \
      ".hs{display:inline-block;padding:7px 14px;margin-right:8px;border-radius:999px;font-family:Jakarta;font-weight:800;font-size:22px;color:rgba(246,244,239,.6);border:2px solid rgba(246,244,239,.28);background:rgba(13,16,32,.7)}.hs.on{background:#C8A45D;color:#0D1020;border-color:#C8A45D}.hs.done{color:#C8A45D;border-color:rgba(200,164,93,.55)}.hs.done::before{content:'✓ '}" + \
      ".B.gold{color:#C8A45D}.tag{background:#C8A45D;color:#0D1020}.cw{-webkit-text-stroke:10px #0D1020}.cw.on{background:#C8A45D;color:#0D1020}.cw.k{color:#E9CF8F}"
OVJ = [[f"h{i}", a_, b_] for i, (_, a_, b_) in enumerate(OV)] + [["cta", CTA_T, DUR]]
CG = [[a_, b, [[w[1], w[2]] for w in g]] for a_, b, g in G]
html = f'''<!doctype html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width={VW}, height={VH}" />
<title>TITÁN · Nasdaq · {MODE}</title><script src="assets/vendor/gsap.min.js"></script>
<style>{CSS}
html, body, #root {{ width:{VW}px; height:{VH}px; background:#0D1020; }}</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{DUR}" data-width="{VW}" data-height="{VH}">
{chr(10).join(body)}
<audio id="vo" src="assets/audio/mix.wav" data-start="0" data-duration="{DUR}" data-track-index="90" data-volume="1"></audio>
</div>
<script>
window.DUR = {DUR}; window.SCN = {json.dumps(scn)}; window.BEATS = {json.dumps(BEATS)}; window.OV = {json.dumps(OVJ)}; window.HUD = {json.dumps([round(x, 3) for x in HUDT])};
window.CG = {json.dumps(CG)}; window.FIGS = {json.dumps(FIGS)};
{open(f"{H}/nq.js").read()}
</script></body></html>'''
open(f"{P}/index.html", "w").write(html)
json.dump({"DUR": DUR, "SCN": scn, "CTA": CTA_T}, open(f"{W}/{MODE}_times.json", "w"))
print("ok", MODE, DUR, [(s["k"], s["t0"]) for s in scn])
