# Mezcla del piloto interés compuesto: voz (Explorador) + música original «nieve» + efectos en los golpes del film; −14 LUFS. Genera también el SRT.
import json, subprocess, os
W = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work") + "/ic"; T = os.path.dirname(os.path.abspath(__file__)) + "/.."
d = json.load(open(f"{W}/words.json")); DUR = d["dur"]; ev = json.load(open(f"{W}/video.events.json"))["ev"]
# no más de un efecto cada 0,18 s (evita amontonar)
E, last = [], -9
for t, k in sorted(ev):
    if t - last >= .18 and 0 <= t < DUR: E.append([t, k]); last = t
subprocess.run(["python3", f"{T}/bed_music.py", f"{W}/bed.wav", str(DUR), "nieve"], check=True, capture_output=True)
subprocess.run(["python3", f"{T}/sfx_mix.py", f"{W}/bed.wav", f"{W}/bedfx.wav", str(DUR), json.dumps(E)], check=True, capture_output=True)
fc = (f"[0]aresample=48000,volume=0.11,afade=t=out:st={DUR-3}:d=3[m];[1]aresample=48000,highpass=f=60,aformat=channel_layouts=stereo,apad=whole_dur={DUR},asplit[v][sc];"
      f"[m][sc]sidechaincompress=threshold=0.02:ratio=8:attack=15:release=400[md];[md][v]amix=inputs=2:normalize=0:duration=longest,atrim=0:{DUR},loudnorm=I=-14:TP=-1.5:LRA=11")
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{W}/bedfx.wav", "-i", f"{W}/voz.wav", "-filter_complex", fc, "-ar", "48000", f"{W}/mix.wav"], check=True)
r = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"{W}/mix.wav", "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
print("mezcla", DUR, "s ·", len(E), "efectos ·", [l.strip() for l in r.split("Summary")[1].splitlines() if "I:" in l][0])
# SRT de 3 palabras (mismo agrupado que en pantalla)
G, g = [], []
for w in d["display"]:
    g.append(w)
    if len(g) == 3 or w[0][-1:] in ".?!:": G.append(g); g = []
if g: G.append(g)
f = lambda t: f"{int(t//3600):02d}:{int(t%3600//60):02d}:{int(t%60):02d},{int(round(t%1*1000)) % 1000:03d}"
with open(f"{W}/subs.srt", "w") as o:
    for k, g in enumerate(G):
        a = g[0][1]; b = min(G[k + 1][0][1], g[-1][2] + .6) if k + 1 < len(G) else g[-1][2] + .6
        o.write(f"{k+1}\n{f(a)} --> {f(b)}\n{' '.join(w[0] for w in g)}\n\n")
print("srt", len(G), "bloques")
