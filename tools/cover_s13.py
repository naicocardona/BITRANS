# Portada Reporte semanal #13 NAS100: «SELL + BUY» / «2 DE 2 ESTA SEMANA» / «+202,27 PUNTOS» / «REPORTE #13» con los dos gráficos reales y el Explorador
# «2 de 2» va pegado al número para que nadie lo lea como estadística acumulada.
import os, sys, subprocess
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
from nas_common import KIT, lab_svg
D = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work") + "/s13-tiktok"
css = open(f"{KIT}/nas.css").read()
html = f'''<!doctype html><html><head><meta charset="utf-8"><style>{css}
body{{margin:0;width:1080px;height:1920px;overflow:hidden;background:#090B10}} .box{{position:absolute;overflow:hidden;border-radius:26px;background:#fff}}
.box img{{position:absolute;display:block}} .tg{{position:absolute;padding:8px 18px;border-radius:12px;font-size:34px;font-weight:900;letter-spacing:.08em;background:rgba(9,11,16,.92)}}</style></head><body>
<div id="root" style="position:absolute;left:0;top:0;width:1080px;height:1920px">
<div style="position:absolute;inset:0">{lab_svg()}</div>
<div style="position:absolute;left:70px;top:140px;display:flex;align-items:center;gap:16px"><div class="lg" style="width:70px;height:70px"><img src="assets/img/logo.png"></div>
<div style="font-size:34px;font-weight:900;letter-spacing:.08em;color:#F4F5F9">NAS100 EDGE LAB</div></div>
<div style="position:absolute;left:70px;top:250px;width:940px;font-size:128px;font-weight:900;line-height:.98;letter-spacing:-.03em">
<span style="color:#FF6474">SELL</span> <span style="color:#F4F5F9">+</span> <span style="color:#3FD0C9">BUY</span></div>
<div style="position:absolute;left:70px;top:400px;font-size:58px;font-weight:900;color:#A779F2;letter-spacing:.02em">2 DE 2 ESTA SEMANA</div>
<div style="position:absolute;left:70px;top:478px;font-size:132px;font-weight:900;color:#64E087;letter-spacing:-.03em;text-shadow:0 0 50px rgba(100,224,135,.45)">+202,27 <span style="font-size:70px">PUNTOS</span></div>
<div class="box" style="left:70px;top:680px;width:455px;height:560px;border:4px solid #FF6474"><img src="assets/img/chart28.jpg" style="width:820px;left:-271px;top:-560px"></div>
<div class="box" style="left:555px;top:680px;width:455px;height:560px;border:4px solid #3FD0C9"><img src="assets/img/chart29.jpg" style="width:820px;left:-50px;top:-330px"></div>
<div class="tg" style="left:90px;top:700px;color:#FF6474;border:3px solid #FF6474">SELL · #028 · TP</div><div class="tg" style="left:575px;top:700px;color:#3FD0C9;border:3px solid #3FD0C9">BUY · #029 · TP</div>
<img src="assets/avatar/satisfecho.webp" style="position:absolute;left:300px;top:1230px;width:480px;height:480px">
<div style="position:absolute;left:0;top:1740px;width:1080px;text-align:center"><span style="display:inline-block;padding:14px 34px;border-radius:16px;border:4px solid #A779F2;color:#A779F2;font-size:54px;font-weight:900;letter-spacing:.1em;background:rgba(9,11,16,.9)">REPORTE #13</span></div>
</div></body></html>'''
open(f"{D}/cover.html", "w").write(html)
js = f"const {{chromium}}=require('playwright');(async()=>{{const b=await chromium.launch();const p=await b.newPage({{viewport:{{width:1080,height:1920}}}});await p.goto('file://{D}/cover.html');await p.waitForTimeout(900);await p.screenshot({{path:'{D}/cover.png'}});await b.close();}})();"
open(f"{D}/cover.cjs", "w").write(js); subprocess.run(["node", f"{D}/cover.cjs"], check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{D}/cover.png", "-q:v", "2", f"{D}/cover.jpg"], check=True); print("ok")
