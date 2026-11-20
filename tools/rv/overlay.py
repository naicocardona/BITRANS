# Capa de números «con sabor» para el video rojo/verde (cuenta personal de Lady).
# Genera PNG con transparencia (1080×1920, 30 fps): degradado, contorno, brillo, sombra, rebote, conteo,
# glitch RGB en las pérdidas y destellos en las ganancias. Uso: python3 overlay.py <carpeta_salida>
import sys, os, math, random
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops
sys.path.insert(0, os.path.dirname(__file__)); from timeline import CUTS, col, LOSS, GAIN
OUT = sys.argv[1]; os.makedirs(OUT, exist_ok=True)
W, H, FPS, CY = 1080, 1920, 30, 400
F_NUM = ImageFont.truetype('/usr/share/fonts/opentype/inter/InterDisplay-Black.otf', 210)
F_LAB = ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf', 40)
PAL = {'G': ((222, 255, 160), (18, 214, 86), (60, 255, 120)), 'R': ((255, 190, 190), (226, 18, 42), (255, 40, 60))}
fmt = lambda v, c: ('+' if c == 'G' else '−') + '$' + f"{abs(int(v)):,}"
_cache = {}
def num_img(v, c):
    key = (fmt(v, c), c)
    if key in _cache: return _cache[key]
    t = fmt(v, c); top, bot, glow = PAL[c]; pad = 90
    x0, y0, x1, y1 = F_NUM.getbbox(t, stroke_width=16); w, h = x1 - x0 + 2 * pad, y1 - y0 + 2 * pad
    m = Image.new('L', (w, h)); ImageDraw.Draw(m).text((pad - x0, pad - y0), t, font=F_NUM, fill=255)
    ms = Image.new('L', (w, h)); ImageDraw.Draw(ms).text((pad - x0, pad - y0), t, font=F_NUM, fill=255, stroke_width=16, stroke_fill=255)
    img = Image.new('RGBA', (w, h))
    g = Image.new('RGBA', (w, h), glow + (0,)); g.putalpha(ms.filter(ImageFilter.GaussianBlur(34)).point(lambda a: min(255, int(a * 1.5))))
    img = Image.alpha_composite(img, g)                                              # brillo exterior
    sh = Image.new('RGBA', (w, h), (0, 0, 0, 0)); sh.putalpha(ms.filter(ImageFilter.GaussianBlur(8)).point(lambda a: int(a * .7)))
    img = Image.alpha_composite(img, ImageChops.offset(sh, 0, 16))                   # sombra
    st = Image.new('RGBA', (w, h), (12, 10, 14, 0)); st.putalpha(ms); img = Image.alpha_composite(img, st)  # contorno
    grad = Image.new('RGBA', (1, h)); [grad.putpixel((0, y), tuple(int(top[i] + (bot[i] - top[i]) * min(1, max(0, (y - pad) / (h - 2 * pad)))) for i in range(3)) + (255,)) for y in range(h)]
    grad = grad.resize((w, h)); grad.putalpha(m); img = Image.alpha_composite(img, grad)  # relleno en degradado
    hl = Image.new('L', (w, h)); ImageDraw.Draw(hl).rectangle((0, 0, w, pad + (y1 - y0) * .38), fill=70)
    shine = Image.new('RGBA', (w, h), (255, 255, 255, 0)); shine.putalpha(ImageChops.multiply(hl, m)); img = Image.alpha_composite(img, shine)  # brillo superior
    _cache[key] = img; return img
def label():
    t = 'MI P&L DE HOY'; x0, y0, x1, y1 = F_LAB.getbbox(t); w, h = x1 - x0 + 60, y1 - y0 + 30
    im = Image.new('RGBA', (w, h)); d = ImageDraw.Draw(im); d.rounded_rectangle((0, 0, w - 1, h - 1), h // 2, fill=(10, 10, 14, 190), outline=(255, 255, 255, 90), width=3)
    d.text((30 - x0, 15 - y0), t, font=F_LAB, fill=(255, 255, 255, 235)); return im
LAB = label()
def star(d, x, y, r, a, colr):
    pts = [(x + math.cos(k * math.pi / 4) * (r if k % 2 == 0 else r * .28), y + math.sin(k * math.pi / 4) * (r if k % 2 == 0 else r * .28)) for k in range(8)]
    d.polygon(pts, fill=colr + (int(255 * a),))
# valores con signo por tramo
vals, li, gi = [], 0, 0
for k in range(len(CUTS) - 1):
    if col(CUTS[k]) == 'G': vals.append(GAIN[min(gi, len(GAIN) - 1)]); gi += 1
    else: vals.append(-LOSS[min(li, len(LOSS) - 1)]); li += 1
NF = round(CUTS[-1] * FPS); rnd = random.Random(7)
for n in range(NF):
    k = max(i for i in range(len(CUTS) - 1) if round(CUTS[i] * FPS) <= n); f = n - round(CUTS[k] * FPS); c = col(CUTS[k]); v = vals[k]
    last = k == len(CUTS) - 2; prev = vals[k - 1] if k and (vals[k - 1] > 0) == (v > 0) else v * .4
    e = 1 - (1 - min(1, f / 7)) ** 3; cur = round((prev + (v - prev) * e) / 10) * 10 if f < 7 else v   # conteo
    im = num_img(cur, c)
    s = 1 + .38 * math.exp(-f / 2.4) * math.cos(f * 1.25)                            # rebote
    if last: s *= 1 + .035 * math.sin(f / 3.5)                                       # latido final
    s = min(s, 1000 / im.width)
    rot = (4 if k % 2 else -4) * math.exp(-f / 3) + (2.2 * math.sin(f / 9) if last else 0)
    dx = dy = 0
    if c == 'R': dx, dy = 16 * math.sin(f * 2.9) * math.exp(-f / 4), 10 * math.cos(f * 3.7) * math.exp(-f / 4)   # temblor
    t = im.resize((max(1, int(im.width * s)), max(1, int(im.height * s))), Image.BICUBIC).rotate(rot, Image.BICUBIC, expand=True)
    fr = Image.new('RGBA', (W, H)); px, py = int(W / 2 - t.width / 2 + dx), int(CY - t.height / 2 + dy)
    if c == 'R' and f < 4:                                                           # glitch RGB
        r, g, b, a = t.split(); z = Image.new('L', t.size)
        fr.alpha_composite(Image.merge('RGBA', (r, z, z, a.point(lambda q: q // 2))), (max(0, px - 22), py))
        fr.alpha_composite(Image.merge('RGBA', (z, g, b, a.point(lambda q: q // 2))), (min(W - t.width, px + 22), py))
    fr.alpha_composite(t, (max(0, min(W - t.width, px)), max(0, py)))
    if f >= 2 or last: fr.alpha_composite(LAB, ((W - LAB.width) // 2, 175))
    if c == 'G' and (f < 10 or last):                                                # destellos
        d = ImageDraw.Draw(fr); rr = random.Random(k * 100 + (f // 3 if last else 0))
        for _ in range(9 if not last else 7):
            ang, dist = rr.uniform(0, 2 * math.pi), rr.uniform(260, 520) * (0.6 + 0.4 * min(1, f / 6) if not last else 1)
            x, y = W / 2 + math.cos(ang) * dist, CY + math.sin(ang) * dist * .45
            a = (1 - f / 10) if not last else .5 + .5 * math.sin(f / 2 + ang * 3)
            star(d, x, y, rr.uniform(14, 30), max(0, a), (255, 255, 210))
    fr.save(f"{OUT}/o{n:04d}.png", compress_level=1)
print('capa lista', NF, 'cuadros')
