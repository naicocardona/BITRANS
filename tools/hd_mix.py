# Mezcla genérica del estilo híbrido TITÁN: voz + música original + efectos de los golpes del film → −14,0 LUFS exactos (2 pasadas), MP4 final y SRT de 3 palabras.
# Uso: hd_mix.py <voz.wav> <words.json> <video.mp4 (con su .events.json al lado)> <variante_música> <salida.mp4> [salida.srt]
import json, subprocess, os, sys
voz, wj, vid, var, out = sys.argv[1:6]; srt = sys.argv[6] if len(sys.argv) > 6 else out.rsplit(".", 1)[0] + ".srt"
T = os.path.dirname(os.path.abspath(__file__)); W = os.path.dirname(os.path.abspath(out)); base = os.path.splitext(os.path.basename(out))[0]
d = json.load(open(wj)); DUR = d["dur"]; ev = json.load(open(vid.rsplit(".", 1)[0] + ".events.json"))["ev"]
E, last = [], -9
for t, k in sorted(ev):
    if t - last >= .18 and 0 <= t < DUR: E.append([t, k]); last = t
tmp = lambda n: os.path.join(W, f"{base}_{n}.wav")
subprocess.run(["python3", f"{T}/bed_music.py", tmp("bed"), str(DUR), var], check=True, capture_output=True)
subprocess.run(["python3", f"{T}/sfx_mix.py", tmp("bed"), tmp("bedfx"), str(DUR), json.dumps(E)], check=True, capture_output=True)
fc = (f"[0]aresample=48000,volume=0.11,afade=t=out:st={DUR-1.5}:d=1.5[m];[1]aresample=48000,highpass=f=60,acompressor=threshold=-22dB:ratio=2.2:attack=8:release=150:makeup=1.5,aformat=channel_layouts=stereo,apad=whole_dur={DUR},asplit[v][sc];"
      f"[m][sc]sidechaincompress=threshold=0.02:ratio=8:attack=15:release=400[md];[md][v]amix=inputs=2:normalize=0:duration=longest,atrim=0:{DUR},loudnorm=I=-14:TP=-1.5:LRA=11")
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", tmp("bedfx"), "-i", voz, "-filter_complex", fc, "-ar", "48000", tmp("mix1")], check=True)
lufs = lambda f: float([l for l in subprocess.run(["ffmpeg", "-hide_banner", "-i", f, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr.split("Summary")[1].splitlines() if "I:" in l][0].split()[1])
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", tmp("mix1"), "-af", f"volume={-14 - lufs(tmp('mix1')):.2f}dB,alimiter=limit=0.84:attack=2:release=60:level=disabled", "-ar", "48000", tmp("mix")], check=True)
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", vid, "-i", tmp("mix"), "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", out], check=True)
G, g = [], []
for w in d["display"]:
    g.append(w)
    if len(g) == 3 or w[0][-1:] in ".?!:;": G.append(g); g = []
if g: G.append(g)
f = lambda t: f"{int(t//3600):02d}:{int(t%3600//60):02d}:{int(t%60):02d},{int(round(t%1*1000)) % 1000:03d}"
with open(srt, "w") as o:
    for k, g in enumerate(G):
        a = g[0][1]; b = min(G[k + 1][0][1], g[-1][2] + .6) if k + 1 < len(G) else g[-1][2] + .6
        o.write(f"{k+1}\n{f(a)} --> {f(b)}\n{' '.join(w[0] for w in g)}\n\n")
print(base, DUR, "s ·", len(E), "efectos ·", f"{lufs(tmp('mix')):.1f} LUFS ·", len(G), "subtítulos")
