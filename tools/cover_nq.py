# Portadas del paquete Nasdaq: miniatura YouTube 1920×1080 y portadas verticales 1080×1920 (Short y TikTok de cada par)
import os, sys, subprocess
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
import nq_scenes as N
W = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work") + "/nq/covers"; os.makedirs(W, exist_ok=True)
FONT = f"{H}/kit/tq-3d/assets/fonts"
CSS = f'''@font-face{{font-family:Bricolage;src:url("{FONT}/bricolage-800.woff2");font-weight:800}}@font-face{{font-family:Jakarta;src:url("{FONT}/jakarta-800.woff2");font-weight:800}}
@font-face{{font-family:Jakarta;src:url("{FONT}/jakarta-700.woff2");font-weight:700}}*{{margin:0;padding:0}}body{{background:#0D1020;overflow:hidden;font-family:Jakarta}}
.t{{font-family:Bricolage;font-weight:800;color:#F6F4EF;line-height:1.02}}.g{{color:#C8A45D}}.br{{font-family:Jakarta;font-weight:800;letter-spacing:.32em;color:#C8A45D}}'''
def on(svg, ids):
    for i in ids: svg = svg.replace(f'id="{i}" opacity="0"', f'id="{i}" opacity="1"')
    return svg
JOBS = {
 "TITAN_NQ_YouTube_Miniatura": (1920, 1080, on(N.s_chart(), ["mx", "dJ", "d6", "brM"]), "left:820px;top:0;width:1100px;height:1100px;transform:scale(1)",
     '<div style="position:absolute;left:70px;top:150px;width:760px"><div class="t" style="font-size:130px">CAYÓ EL<br>NASDAQ</div><div class="t g" style="font-size:96px;margin-top:30px">¿CÓMO<br>EMPIEZO?</div></div>'
     '<div class="br" style="position:absolute;left:74px;top:930px;font-size:34px">TITÁN HOLDING</div>'),
 "TITAN_NQ_Bróker_Portada": (1080, 1920, on(N.s_demo(), ["dFicha", "dTipo", "dCant", "dFin", "dPrev", "dStop"]), "left:0;top:640px;width:1080px;height:1080px",
     '<div style="position:absolute;left:70px;top:230px;width:940px"><div class="t" style="font-size:140px">ANTES DE<br><span class="g">DEPOSITAR</span></div></div>'
     '<div class="br" style="position:absolute;left:74px;top:1760px;font-size:34px">TITÁN HOLDING</div>'),
 "TITAN_NQ_Recuperar_Portada": (1080, 1920, on(N.s_math(), ["m80", "m96", "a1", "a2", "m25"]), "left:0;top:660px;width:1080px;height:1080px",
     '<div style="position:absolute;left:70px;top:230px;width:940px"><div class="t" style="font-size:132px">EL NASDAQ<br>CAYÓ</div><div class="t g" style="font-size:78px;margin-top:24px">¿CÓMO SE RECUPERA?</div></div>'
     '<div class="br" style="position:absolute;left:74px;top:1760px;font-size:34px">TITÁN HOLDING</div>'),
}
for name, (w, h, svg, pos, txt) in JOBS.items():
    html = f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body style="width:{w}px;height:{h}px"><div style="position:absolute;{pos}">{svg}</div>{txt}</body></html>'
    open(f"{W}/{name}.html", "w").write(html)
    js = f"const {{chromium}}=require('playwright');(async()=>{{const b=await chromium.launch();const p=await b.newPage({{viewport:{{width:{w},height:{h}}}}});await p.goto('file://{W}/{name}.html');await p.waitForTimeout(700);await p.screenshot({{path:'{W}/{name}.png'}});await b.close();}})();"
    open(f"{W}/shot.cjs", "w").write(js); subprocess.run(["node", f"{W}/shot.cjs"], check=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{W}/{name}.png", "-q:v", "2", f"{W}/{name}.jpg"], check=True); print(name, "ok")
