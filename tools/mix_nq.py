# Mezcla del paquete Nasdaq: voz Juan + música original + efectos en transiciones; −14 LUFS
import json, subprocess, sys, os
S = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work"); T = os.path.dirname(os.path.abspath(__file__))
VAR = {"lg": "nqlg", "sh1": "nqs1", "tk1": "nqt1", "sh2": "nqs2", "tk2": "nqt2"}
for m in (sys.argv[1:] or list(VAR)):
    d = json.load(open(f"{S}/nq/{m}_times.json")); DUR = d["DUR"]
    ev = [[s["t0"] - 0.05, "whoosh"] for s in d["SCN"][1:]] + [[d["CTA"] + 0.1, "ping"]]
    o = f"{S}/nq"
    subprocess.run(["python3", f"{T}/bed_music.py", f"{o}/{m}_bed.wav", str(DUR), VAR[m]], check=True, capture_output=True)
    subprocess.run(["python3", f"{T}/sfx_mix.py", f"{o}/{m}_bed.wav", f"{o}/{m}_bedfx.wav", str(DUR), json.dumps(ev)], check=True, capture_output=True)
    fc = (f"[0]aresample=48000,volume=0.10,afade=t=out:st={DUR-2.5}:d=2.5[m];[1]aresample=48000,highpass=f=60,acompressor=threshold=-22dB:ratio=2.2:attack=8:release=150:makeup=1.5,aformat=channel_layouts=stereo,apad=whole_dur={DUR},asplit[v][sc];"
          f"[m][sc]sidechaincompress=threshold=0.02:ratio=8:attack=15:release=400[md];[md][v]amix=inputs=2:normalize=0:duration=longest,atrim=0:{DUR},loudnorm=I=-14:TP=-1.5:LRA=11")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{o}/{m}_bedfx.wav", "-i", f"{o}/{m}.wav", "-filter_complex", fc, "-ar", "48000", f"{o}/{m}_mix.wav"], check=True)
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"{o}/{m}_mix.wav", "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    print(m, DUR, [l.strip() for l in r.split("Summary")[1].splitlines() if "I:" in l][0])
