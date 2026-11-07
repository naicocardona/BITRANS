# Acorta las pausas largas de una narración (sin tocar las palabras). Uso: tighten.py in.wav out.wav max_pausa
import sys, re, subprocess, numpy as np, soundfile as sf
src, dst, MX = sys.argv[1], sys.argv[2], float(sys.argv[3])
x, sr = sf.read(src, dtype="float32")
r = subprocess.run(["ffmpeg", "-hide_banner", "-i", src, "-af", "silencedetect=n=-38dB:d=0.2", "-f", "null", "-"], capture_output=True, text=True).stderr
ss = [float(v) for v in re.findall(r"silence_start: ([\d.]+)", r)]; se = [float(v) for v in re.findall(r"silence_end: ([\d.]+)", r)]
keep = []; t = 0
for a, b in zip(ss, se):
    lead = 0.08 if a < 0.05 else None
    if a < 0.05: keep.append((t, t)); t = max(0, b - 0.08); continue      # silencio inicial → 0,08 s
    if b - a > MX:
        cut_a = a + MX / 2; cut_b = b - MX / 2; keep.append((t, cut_a)); t = cut_b
keep.append((t, len(x) / sr))
f = int(0.006 * sr); parts = []
for a, b in keep:
    seg = x[int(a * sr):int(b * sr)].copy()
    if len(seg) > 2 * f: seg[:f] *= np.linspace(0, 1, f); seg[-f:] *= np.linspace(1, 0, f)
    parts.append(seg)
y = np.concatenate(parts); sf.write(dst, y, sr); print(dst.split("/")[-1], round(len(x) / sr, 2), "→", round(len(y) / sr, 2))
