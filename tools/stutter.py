# Detecta trabas: cuadros repetidos seguidos de un salto (render que se congela) a 30 fps. Uso: stutter.py video.mp4 [desde] [hasta]
import sys, subprocess, numpy as np, json
v = sys.argv[1]; a = float(sys.argv[2]) if len(sys.argv) > 2 else 0; b = float(sys.argv[3]) if len(sys.argv) > 3 else 1e9
pr = json.loads(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=width,height", "-of", "json", v], capture_output=True, text=True).stdout)["streams"][0]
W, H = 160, int(160 * pr["height"] / pr["width"])
raw = subprocess.run(["ffmpeg", "-v", "error", "-ss", str(a), "-to", str(b), "-i", v, "-vf", f"scale={W}:{H}", "-f", "rawvideo", "-pix_fmt", "gray", "-"], capture_output=True).stdout
F = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.float32); d = np.abs(np.diff(F, axis=0)).mean((1, 2))
ev = []; i = 0
while i < len(d):
    if d[i] < 0.004:
        j = i
        while j < len(d) and d[j] < 0.004: j += 1
        if j - i >= 2 and j < len(d) and d[j] > 3 * max(np.median(d[max(0, i-15):i] if i > 0 else d[:1]), 0.05) and np.median(d[max(0, i-15):i] if i > 0 else d[:1]) > 0.05:
            ev.append((round(a + i / 30, 2), j - i, round(float(d[j]), 2)))
        i = j
    else: i += 1
print(f"{len(ev)} trabas (inicio s, cuadros congelados, salto):", ev[:60])
