# Portada Reporte semanal #14 NAS100: «4 VENTAS» / «4 DE 4 ESTA SEMANA» / «+405,00 PUNTOS» / «REPORTE #14» con los cuatro gráficos reales y el Explorador
# Sin lote ni dinero; «4 de 4» va pegado a «esta semana» para que nadie lo lea como estadística acumulada.
import os, sys, subprocess
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
from nas_common import KIT, lab_svg
D = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work") + "/s14-tiktok"
css = open(f"{KIT}/nas.css").read()
G = {30: (511, 748, 180, 380, 1.35), 31: (367, 721, 180, 430, 1.6), 32: (309, 543, 135, 300, 2.0), 33: (213, 644, 95, 185, 2.4)}
BW, BH = 455, 300; boxes = ""
for i, (n, (w, h, px, py, s)) in enumerate(G.items()):
    k = max(BW / w, s * 0.62); x, y = 70 + (i % 2) * 485, 690 + (i // 2) * 330
    boxes += (f'<div class="box" style="left:{x}px;top:{y}px;width:{BW}px;height:{BH}px;border:4px solid #FF6474"><img src="assets/img/chart{n}.jpg" '
              f'style="width:{w * k:.0f}px;left:{min(0, max(BW - w * k, BW / 2 - px * k)):.0f}px;top:{min(0, max(BH - h * k, BH / 2 - py * k)):.0f}px"></div>'
              f'<div class="tg" style="left:{x + 14}px;top:{y + 14}px;color:#FF6474;border:3px solid #FF6474">SELL · #0{n} · TP</div>')
html = f'''<!doctype html><html><head><meta charset="utf-8"><style>{css}
body{{margin:0;width:1080px;height:1920px;overflow:hidden;background:#090B10}} .box{{position:absolute;overflow:hidden;border-radius:22px;background:#fff}}
.box img{{position:absolute;display:block}} .tg{{position:absolute;padding:6px 14px;border-radius:10px;font-size:26px;font-weight:900;letter-spacing:.06em;background:rgba(9,11,16,.92)}}</style></head><body>
<div id="root" style="position:absolute;left:0;top:0;width:1080px;height:1920px">
<div style="position:absolute;inset:0">{lab_svg()}</div>
<div style="position:absolute;left:70px;top:140px;display:flex;align-items:center;gap:16px"><div class="lg" style="width:70px;height:70px"><img src="assets/img/logo.png"></div>
<div style="font-size:34px;font-weight:900;letter-spacing:.08em;color:#F4F5F9">NAS100 EDGE LAB</div></div>
<div style="position:absolute;left:70px;top:250px;width:940px;font-size:128px;font-weight:900;line-height:.98;letter-spacing:-.03em"><span style="color:#FF6474">4 VENTAS</span></div>
<div style="position:absolute;left:70px;top:400px;font-size:58px;font-weight:900;color:#A779F2;letter-spacing:.02em">4 DE 4 ESTA SEMANA</div>
<div style="position:absolute;left:70px;top:478px;font-size:132px;font-weight:900;color:#64E087;letter-spacing:-.03em;text-shadow:0 0 50px rgba(100,224,135,.45)">+405,00 <span style="font-size:70px">PUNTOS</span></div>
{boxes}
<img src="assets/avatar/satisfecho.webp" style="position:absolute;left:340px;top:1340px;width:400px;height:400px">
<div style="position:absolute;left:0;top:1760px;width:1080px;text-align:center"><span style="display:inline-block;padding:14px 34px;border-radius:16px;border:4px solid #A779F2;color:#A779F2;font-size:54px;font-weight:900;letter-spacing:.1em;background:rgba(9,11,16,.9)">REPORTE #14</span></div>
</div></body></html>'''
open(f"{D}/cover.html", "w").write(html)
js = f"const {{chromium}}=require('playwright');(async()=>{{const b=await chromium.launch();const p=await b.newPage({{viewport:{{width:1080,height:1920}}}});await p.goto('file://{D}/cover.html');await p.waitForTimeout(900);await p.screenshot({{path:'{D}/cover.png'}});await b.close();}})();"
open(f"{D}/cover.cjs", "w").write(js); subprocess.run(["node", f"{D}/cover.cjs"], check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{D}/cover.png", "-q:v", "2", f"{D}/cover.jpg"], check=True); print("ok")
