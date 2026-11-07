# Música original distinta por versión + efectos moderados + voz A con ducking
import json, subprocess
S = __import__("os").environ.get("BITRANS_WORK", "/home/user/bitrans_work")
for v, var, lufs in [("tiktok", "t026t", -16), ("shorts", "t026s", -14)]:
    d = json.load(open(f"{S}/t026-{v}/tiempos.json")); T = {n: [s, s + du] for n, s, du in d["frases"]}; DUR = d["duracion"]
    TK = v == "tiktok"; Sx = lambda n: T[n][0]
    keys = ["e1", "r1", "r2", "c1a", "c2a", "c3a", "x1"] if TK else ["s3", "s6", "s7", "s10", "s11", "s13", "s15"]
    ev = [[0.12, "impact"], [T["g1" if TK else "s1"][1] - 0.35, "stamp"]] + [[Sx(k) - 0.3, "whoosh"] for k in keys] + [[Sx("r3" if TK else "s8") - 0.05, "impact"], [Sx("r3" if TK else "s8") + 0.3, "ping"]]
    if TK: ev.append([Sx("c1b") + 0.2, "stamp"])
    o = f"{S}/t026-{v}/assets/audio"
    subprocess.run(["python3", f"{S}/tools/bed_music.py", f"{o}/bed.wav", str(DUR), var], check=True, capture_output=True)
    subprocess.run(["python3", f"{S}/tools/sfx_mix.py", f"{o}/bed.wav", f"{o}/bedfx.wav", str(DUR), json.dumps(ev)], check=True, capture_output=True)
    fc = (f"[0]aresample=48000,volume=0.26,afade=t=out:st={DUR-2.0}:d=2.0[m];[1]aresample=48000,aformat=channel_layouts=stereo,apad=whole_dur={DUR},asplit[v][sc];"
          f"[m][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[md];[md][v]amix=inputs=2:normalize=0:duration=longest,atrim=0:{DUR},loudnorm=I={lufs}:TP=-1.5:LRA=11")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{o}/bedfx.wav", "-i", f"{S}/t026/tts/{v}_narr.wav", "-filter_complex", fc, "-ar", "48000", f"{o}/mix.wav"], check=True)
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"{o}/mix.wav", "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    print(v, DUR, [l.strip() for l in r.split("Summary")[1].splitlines() if "I:" in l][0])
