# Mezcla voz (ElevenLabs Juan) + música original + efectos para los videos de demócratas
import json, subprocess, sys
S = __import__("os").environ.get("BITRANS_WORK", "/home/user/bitrans_work")
for m in (sys.argv[1:] or ["tk", "sh"]):
    d = json.load(open(f"{S}/dem/{m}_times.json")); DUR, T = d["DUR"], d["T"]
    tr = ["t2", "t4", "t6", "t8", "t10", "t12", "t15"] if m == "tk" else ["s3", "s6", "s7", "s10"]
    ev = [[T[k] - 0.32, "whoosh"] for k in tr] + ([[T["t14"] + 0.2, "stamp"], [T["t16"] + 0.2, "ping"]] if m == "tk" else [[T["s6"] + 0.1, "stamp"], [T["s11"] + 0.2, "ping"]])
    name = "tiktok" if m == "tk" else "shorts"; o = f"{S}/dem/voz"
    subprocess.run(["python3", f"{S}/tools/bed_music.py", f"{o}/{m}_bed.wav", str(DUR), "dem" + m], check=True, capture_output=True)
    subprocess.run(["python3", f"{S}/tools/sfx_mix.py", f"{o}/{m}_bed.wav", f"{o}/{m}_bedfx.wav", str(DUR), json.dumps(ev)], check=True, capture_output=True)
    fc = (f"[0]aresample=48000,volume=0.11,afade=t=out:st={DUR-2.5}:d=2.5[m];[1]aresample=48000,highpass=f=60,acompressor=threshold=-22dB:ratio=2.2:attack=8:release=150:makeup=1.5,aformat=channel_layouts=stereo,apad=whole_dur={DUR},asplit[v][sc];"
          f"[m][sc]sidechaincompress=threshold=0.02:ratio=8:attack=15:release=400[md];[md][v]amix=inputs=2:normalize=0:duration=longest,atrim=0:{DUR},loudnorm=I=-14:TP=-1.5:LRA=11")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{o}/{m}_bedfx.wav", "-i", f"{o}/{name}.wav", "-filter_complex", fc, "-ar", "48000", f"{o}/{name}_mix.wav"], check=True)
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"{o}/{name}_mix.wav", "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    print(m, DUR, [l.strip() for l in r.split("Summary")[1].splitlines() if "I:" in l][0])
