# Efectos originales sintetizados (numpy): impact, stamp, whoosh, ping. Mezcla con la música de fondo.
# Uso: sfx_mix.py bed.wav out.wav DUR '[[t, "whoosh"], ...]'   (reconstruido el 7 nov 2026; misma interfaz que el original)
import sys, json, numpy as np, soundfile as sf
bed, out, DUR, EV = sys.argv[1], sys.argv[2], float(sys.argv[3]), json.loads(sys.argv[4])
x, SR = sf.read(bed, dtype="float32", always_2d=True)
n = int(DUR * SR); x = np.pad(x, ((0, max(0, n - len(x))), (0, 0)))[:n]
if x.shape[1] == 1: x = np.repeat(x, 2, 1)
rng = np.random.default_rng(7)
def T(d): return np.arange(int(d * SR)) / SR
def lp(s, a):  # filtro paso bajo de un polo
    y = np.empty_like(s); acc = 0.0
    for i, v in enumerate(s): acc += a * (v - acc); y[i] = acc
    return y
def impact():
    t = T(0.45); body = np.sin(2 * np.pi * np.cumsum(90 * np.exp(-t * 9) + 40) / SR) * np.exp(-t * 8)
    return body + lp(rng.uniform(-1, 1, len(t)), 0.08) * np.exp(-t * 30) * 0.6
def stamp():
    t = T(0.3); thud = np.sin(2 * np.pi * np.cumsum(140 * np.exp(-t * 25) + 60) / SR) * np.exp(-t * 18)
    return thud + lp(rng.uniform(-1, 1, len(t)), 0.25) * np.exp(-t * 45) * 0.7
def whoosh():
    t = T(0.5); env = np.sin(np.pi * t / t[-1]) ** 2; s = rng.uniform(-1, 1, len(t))
    a = 0.02 + 0.25 * env; y = np.empty_like(s); acc = 0.0
    for i, v in enumerate(s): acc += a[i] * (v - acc); y[i] = acc
    return y * env * 2.2
def ping():
    t = T(0.9); return (np.sin(2 * np.pi * 1318.5 * t) + 0.45 * np.sin(2 * np.pi * 1975.5 * t)) * np.exp(-t * 6) * 0.6
F = {"impact": impact, "stamp": stamp, "whoosh": whoosh, "ping": ping}
G = {"impact": 0.55, "stamp": 0.5, "whoosh": 0.22, "ping": 0.3}
for t0, k in EV:
    s = F[k]() * G[k]; i0 = int(max(0, t0) * SR); i1 = min(n, i0 + len(s))
    if i1 > i0: x[i0:i1] += s[:i1 - i0, None]
pk = np.abs(x).max()
if pk > 0.98: x *= 0.98 / pk
sf.write(out, x, SR); print("ok", len(EV), "efectos")
