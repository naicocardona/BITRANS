import sys, os, subprocess
S = __import__("os").environ.get("BITRANS_WORK", "/home/user/bitrans_work"); sys.path.insert(0, f"{S}/tools")
import dem_scenes as D
css = open(f"{S}/tools/tq.css").read()
for m, svg in [("tk", D.scene_wall().replace('id="wsArr" opacity="0"', 'id="wsArr" opacity="1"')), ("sh", D.scene_hook().replace('id="hkArr" opacity="0"', 'id="hkArr" opacity="1"'))]:
    svg = svg.replace('<g id="wT-aL">', '<g id="wT-aL" transform="rotate(150 -48 -258)">').replace('<g id="wT-aR">', '<g id="wT-aR" transform="rotate(-150 48 -258)">')
    svg = svg.replace('<g id="v1-aL">', '<g id="v1-aL" transform="rotate(150 -48 -258)">').replace('<g id="v1-aR">', '<g id="v1-aR" transform="rotate(-150 48 -258)">')
    html = f'''<!doctype html><html><head><meta charset="utf-8"><style>{css} html,body{{margin:0;width:1080px;height:1920px;overflow:hidden;background:#0B1B33}}
.w{{position:absolute;left:0;top:0;width:1080px;height:1920px}} .t{{position:absolute;left:60px;top:250px;width:960px}}</style></head><body><div id="root" style="position:absolute;left:0;top:0;width:1080px;height:1920px;background:{"#9DB4EE" if m == "tk" else "#0E2350"}">
<div class="w" style="transform:translate(0px,160px)">{svg}</div><div class="w" style="background:linear-gradient(180deg,rgba(11,27,51,.92) 0,rgba(11,27,51,.55) 34%,rgba(11,27,51,0) 48%,rgba(11,27,51,0) 72%,rgba(11,27,51,.9) 88%)"></div>
<div class="t"><div class="B" style="display:inline-block;font-size:104px;line-height:1.02;padding:14px 28px 20px;border-radius:22px;background:rgba(11,27,51,.9)">GANARON LOS<br>DEMÓCRATAS</div>
<div style="margin-top:20px"><div class="B gold" style="display:inline-block;font-size:70px;line-height:1.05;padding:12px 26px 16px;border-radius:20px;background:rgba(11,27,51,.9)">¿POR QUÉ SUBIÓ<br>LA BOLSA?</div></div></div>
<div style="position:absolute;left:60px;top:1560px"><div class="pill" style="position:relative;display:inline-block;padding:14px 32px;font-size:40px;background:var(--gold);color:var(--navy)">EE. UU. · NOV 2026</div></div>
<div id="brand" style="position:absolute;left:60px;top:1680px"><div class="lg"><img src="assets/brand/logo.jpg"></div><span>TITÁN HOLDING</span></div></div></body></html>'''
    open(f"{S}/dem-{m}/cover.html", "w").write(html)
    js = f"const {{chromium}}=require('playwright');(async()=>{{const b=await chromium.launch();const p=await b.newPage({{viewport:{{width:1080,height:1920}}}});await p.goto('file://{S}/dem-{m}/cover.html');await p.waitForTimeout(800);await p.screenshot({{path:'{S}/dem-{m}/cover.png'}});await b.close();}})();"
    open(f"{S}/dem-{m}/cover.cjs", "w").write(js)
    subprocess.run(["node", f"{S}/dem-{m}/cover.cjs"], check=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{S}/dem-{m}/cover.png", "-q:v", "2", f"{S}/dem-{m}/cover.jpg"], check=True); print(m, "ok")
