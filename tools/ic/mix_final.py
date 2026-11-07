# Mezcla final interés compuesto (tk/sh): voz Juan + música original + efectos en los golpes del film; −14 LUFS. Genera SRT y el MP4 final.
# Uso: python3 tools/ic/mix_final.py [tk] [sh]
import json, subprocess, os, sys
W = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work") + "/icf"; T = os.path.dirname(os.path.abspath(__file__)) + "/.."
VAR = {"tk": "nieve", "sh": "nieve2"}
for m in (sys.argv[1:] or ["tk", "sh"]):
    d = json.load(open(f"{W}/{m}.words.json")); DUR = d["dur"]; ev = json.load(open(f"{W}/video_{m}.events.json"))["ev"]
    E, last = [], -9
    for t, k in sorted(ev):
        if t - last >= .18 and 0 <= t < DUR: E.append([t, k]); last = t
    subprocess.run(["python3", f"{T}/bed_music.py", f"{W}/bed_{m}.wav", str(DUR), VAR[m]], check=True, capture_output=True)
    subprocess.run(["python3", f"{T}/sfx_mix.py", f"{W}/bed_{m}.wav", f"{W}/bedfx_{m}.wav", str(DUR), json.dumps(E)], check=True, capture_output=True)
    fc = (f"[0]aresample=48000,volume=0.11,afade=t=out:st={DUR-2.5}:d=2.5[m];[1]aresample=48000,highpass=f=60,acompressor=threshold=-22dB:ratio=2.2:attack=8:release=150:makeup=1.5,aformat=channel_layouts=stereo,apad=whole_dur={DUR},asplit[v][sc];"
          f"[m][sc]sidechaincompress=threshold=0.02:ratio=8:attack=15:release=400[md];[md][v]amix=inputs=2:normalize=0:duration=longest,atrim=0:{DUR},loudnorm=I=-14:TP=-1.5:LRA=11")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{W}/bedfx_{m}.wav", "-i", f"{W}/{m}.wav", "-filter_complex", fc, "-ar", "48000", f"{W}/mix_{m}.wav"], check=True)
    # segunda pasada: ajuste fino a −14,0 LUFS exactos con limitador de picos
    r0 = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"{W}/mix_{m}.wav", "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    I0 = float([l for l in r0.split("Summary")[1].splitlines() if "I:" in l][0].split()[1])
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{W}/mix_{m}.wav", "-af", f"volume={-14 - I0:.2f}dB,alimiter=limit=0.84:attack=2:release=60:level=disabled", "-ar", "48000", f"{W}/mix2_{m}.wav"], check=True)
    os.replace(f"{W}/mix2_{m}.wav", f"{W}/mix_{m}.wav")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{W}/video_{m}.mp4", "-i", f"{W}/mix_{m}.wav", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", f"{W}/final_{m}.mp4"], check=True)
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"{W}/mix_{m}.wav", "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    G, g = [], []
    for w in d["display"]:
        g.append(w)
        if len(g) == 3 or w[0][-1:] in ".?!:;": G.append(g); g = []
    if g: G.append(g)
    f = lambda t: f"{int(t//3600):02d}:{int(t%3600//60):02d}:{int(t%60):02d},{int(round(t%1*1000)) % 1000:03d}"
    with open(f"{W}/{m}.srt", "w") as o:
        for k, g in enumerate(G):
            a = g[0][1]; b = min(G[k + 1][0][1], g[-1][2] + .6) if k + 1 < len(G) else g[-1][2] + .6
            o.write(f"{k+1}\n{f(a)} --> {f(b)}\n{' '.join(w[0] for w in g)}\n\n")
    print(m, DUR, "s ·", len(E), "efectos ·", [l.strip() for l in r.split("Summary")[1].splitlines() if "I:" in l][0], "·", len(G), "subtítulos")
