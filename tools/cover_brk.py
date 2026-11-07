# Portada Berkshire (misma para Shorts y TikTok): «COMPRÓ SUS PROPIAS ACCIONES» + etiqueta «BERKSHIRE»
import os, sys, subprocess
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
import brk_scenes as N
W = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work") + "/brk/cover"; os.makedirs(W, exist_ok=True)
FONT = f"{H}/kit/tq-3d/assets/fonts"
svg = N.s_table().replace('id="ret" opacity="0"', 'id="ret" opacity="1"')
svg = svg.replace('<g id="cnt">', '<g id="cnt" opacity="0">').replace('<g id="pctW"', '<g id="pctW" opacity="0"')
for k in (8, 9): svg = svg.replace(f'<g id="ch{k}" opacity="1">', f'<g id="ch{k}" opacity="0.25">')
css = f'''@font-face{{font-family:Bricolage;src:url("{FONT}/bricolage-800.woff2");font-weight:800}}@font-face{{font-family:Jakarta;src:url("{FONT}/jakarta-800.woff2");font-weight:800}}
*{{margin:0}}body{{width:1080px;height:1920px;background:#0D1020;overflow:hidden}}'''
html = f'''<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body>
<div style="position:absolute;left:0;top:560px;width:1080px;height:1080px">{svg}</div>
<div style="position:absolute;left:70px;top:150px;font-family:Jakarta;font-weight:800;font-size:34px;letter-spacing:.32em;color:#C8A45D">TITÁN HOLDING</div>
<div style="position:absolute;left:70px;top:230px;display:inline-block;padding:10px 26px;border-radius:14px;background:#F6F4EF;font-family:Jakarta;font-weight:800;font-size:40px;letter-spacing:.14em;color:#0D1020">BERKSHIRE</div>
<div style="position:absolute;left:70px;top:330px;width:960px;font-family:Bricolage;font-weight:800;font-size:116px;line-height:1.0;color:#F6F4EF">COMPRÓ SUS<br><span style="color:#C8A45D">PROPIAS ACCIONES</span></div>
</body></html>'''
open(f"{W}/cover.html", "w").write(html)
js = f"const {{chromium}}=require('playwright');(async()=>{{const b=await chromium.launch();const p=await b.newPage({{viewport:{{width:1080,height:1920}}}});await p.goto('file://{W}/cover.html');await p.waitForTimeout(700);await p.screenshot({{path:'{W}/cover.png'}});await b.close();}})();"
open(f"{W}/shot.cjs", "w").write(js); subprocess.run(["node", f"{W}/shot.cjs"], check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{W}/cover.png", "-q:v", "2", f"{W}/cover.jpg"], check=True); print("ok")
