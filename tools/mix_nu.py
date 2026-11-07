import json, subprocess, sys, os
S = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work")
for v, var in [x for x in [("shorts", "nush"), ("tiktok", "nutk"), ("largo", "nulg")] if x[0] in (sys.argv[1:] or ["shorts", "tiktok", "largo"])]:
    d = json.load(open(f"{S}/nu-{v}/tiempos.json")); DUR = d["duracion"]
    ev = [[s["t0"] - 0.25, "whoosh"] for s in d["tomas"][1:]] + [[d["anclas"]["drop"] + 0.3, "stamp"], [d["anclas"]["cta"] + 0.3, "ping"]]
    o = f"{S}/nu-{v}/assets/audio"
    subprocess.run(["python3", f"{S}/tools/bed_music.py", f"{o}/bed.wav", str(DUR), var], check=True, capture_output=True)
    subprocess.run(["python3", f"{S}/tools/sfx_mix.py", f"{o}/bed.wav", f"{o}/bedfx.wav", str(DUR), json.dumps(ev)], check=True, capture_output=True)
    fc = (f"[0]aresample=48000,volume=0.11,afade=t=out:st={DUR-2.5}:d=2.5[m];[1]aresample=48000,highpass=f=60,acompressor=threshold=-22dB:ratio=2.2:attack=8:release=150:makeup=1.5,aformat=channel_layouts=stereo,apad=whole_dur={DUR},asplit[v][sc];"
          f"[m][sc]sidechaincompress=threshold=0.02:ratio=8:attack=15:release=400[md];[md][v]amix=inputs=2:normalize=0:duration=longest,atrim=0:{DUR},loudnorm=I=-14:TP=-1.5:LRA=11")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{o}/bedfx.wav", "-i", f"{S}/nu/voz/t/{v}.wav", "-filter_complex", fc, "-ar", "48000", f"{o}/mix.wav"], check=True)
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"{o}/mix.wav", "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    print(v, DUR, [l.strip() for l in r.split("Summary")[1].splitlines() if "I:" in l][0])
