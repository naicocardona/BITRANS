# Portada TRADE #029 NAS100: «BUY CON ATR ALTO» / «¿CÓMO SALIÓ?» / «TRADE #029 · 10 AM» + sello «TP · +100,82 PTS», gráfico real y el Explorador señalando
import os, sys, subprocess
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
from nas_common import KIT, lab_svg
D = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work") + "/t029-tiktok"
css = open(f"{KIT}/nas.css").read()
seg = "".join(f'<i style="flex:1;height:26px;border-radius:6px;background:{"#A779F2" if k < 8 else "#2A2F3D"}"></i>' for k in range(10))
html = f'''<!doctype html><html><head><meta charset="utf-8"><style>{css}
body{{margin:0;width:1080px;height:1920px;overflow:hidden;background:#090B10}} .box{{position:absolute;overflow:hidden;border-radius:26px;background:#fff}}
.box img{{position:absolute;display:block}}</style></head><body>
<div id="root" style="position:absolute;left:0;top:0;width:1080px;height:1920px">
<div style="position:absolute;inset:0">{lab_svg()}</div>
<div style="position:absolute;left:70px;top:130px;display:flex;align-items:center;gap:16px"><div class="lg" style="width:70px;height:70px"><img src="assets/img/logo.png"></div>
<div style="font-size:34px;font-weight:900;letter-spacing:.08em;color:#F4F5F9">NAS100 EDGE LAB</div></div>
<div style="position:absolute;left:70px;top:235px;font-size:118px;font-weight:900;line-height:.95;letter-spacing:-.03em;color:#F4F5F9">BUY CON<br/><span style="color:#FF6474;text-shadow:0 0 50px rgba(255,100,116,.45)">ATR ALTO</span></div>
<div style="position:absolute;left:70px;top:478px;font-size:76px;font-weight:900;line-height:1;letter-spacing:-.02em;color:#3FD0C9">¿CÓMO SALIÓ?</div>
<div class="box" style="left:70px;top:580px;width:940px;height:760px;border:4px solid #A779F2"><img src="assets/img/chart29.jpg" style="width:736px;left:102px;top:-156px"></div>
<div style="position:absolute;left:96px;top:606px;padding:10px 22px 12px;border-radius:14px;border:4px solid #3FD0C9;color:#3FD0C9;background:rgba(9,11,16,.92);font-size:40px;font-weight:900;letter-spacing:.06em">BUY</div>
<div style="position:absolute;left:560px;top:1390px;padding:10px 24px 14px;border-radius:16px;border:5px solid #64E087;color:#64E087;background:rgba(9,11,16,.94);font-size:48px;font-weight:900;transform:rotate(-5deg);white-space:nowrap">TP · +100,82 PTS</div>
<img src="assets/avatar/senala.webp" style="position:absolute;left:10px;top:1330px;width:540px;height:540px">
<div style="position:absolute;left:520px;top:1560px;width:500px;text-align:center"><span style="display:inline-block;padding:14px 30px;border-radius:16px;border:4px solid #3FD0C9;color:#3FD0C9;font-size:58px;line-height:1.05;font-weight:900;letter-spacing:.06em;background:rgba(9,11,16,.9)">TRADE #029<br/>10 AM</span></div>
</div></body></html>'''
open(f"{D}/cover.html", "w").write(html)
js = f"const {{chromium}}=require('playwright');(async()=>{{const b=await chromium.launch();const p=await b.newPage({{viewport:{{width:1080,height:1920}}}});await p.goto('file://{D}/cover.html');await p.waitForTimeout(900);await p.screenshot({{path:'{D}/cover.png'}});await b.close();}})();"
open(f"{D}/cover.cjs", "w").write(js); subprocess.run(["node", f"{D}/cover.cjs"], check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{D}/cover.png", "-q:v", "2", f"{D}/cover.jpg"], check=True); print("ok")
