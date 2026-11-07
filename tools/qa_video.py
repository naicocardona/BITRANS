# QC automático cuadro por cuadro de un video final: cuadros negros, congelados (>2 s sin cambio), saltos, volumen y silencios.
# Uso: python3 tools/qa_video.py video.mp4 [planos.json]
import sys, json, subprocess, numpy as np
vid = sys.argv[1]
pr = json.loads(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=codec_type,width,height,r_frame_rate:format=duration,size", "-of", "json", vid], capture_output=True, text=True).stdout)
v = [s for s in pr["streams"] if s["codec_type"] == "video"][0]; W, H = 96, int(96 * v["height"] / v["width"])
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", vid, "-vf", f"fps=10,scale={W}:{H}", "-f", "rawvideo", "-pix_fmt", "gray", "-"], capture_output=True).stdout
F = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.float32); n = len(F)
lum = F.mean((1, 2)); diff = np.r_[0, np.abs(np.diff(F, axis=0)).mean((1, 2))]
black = [round(i / 10, 1) for i in range(n) if lum[i] < 8]
still, run = [], 0
for i in range(1, n):
    run = run + 1 if diff[i] < 0.08 else 0
    if run == 20: still.append(round((i - 20) / 10, 1))
e = subprocess.run(["ffmpeg", "-hide_banner", "-i", vid, "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
I = [l.strip() for l in e[e.rfind("Summary:"):].splitlines() if l.strip().startswith(("I:", "Peak:"))]
s = subprocess.run(["ffmpeg", "-hide_banner", "-i", vid, "-af", "silencedetect=n=-45dB:d=1.0", "-f", "null", "-"], capture_output=True, text=True).stderr
sil = [l.split("] ")[-1] for l in s.splitlines() if "silence_start" in l]
mb = int(pr["format"]["size"]) / 1e6
print(f"{vid.split('/')[-1]}: {v['width']}x{v['height']} {float(pr['format']['duration']):.2f}s {mb:.1f}MB | negros:{black[:5] or 'ninguno'} | quietos>2s:{still or 'ninguno'} | {' '.join(I)} | silencios>1s:{sil or 'ninguno'}")
