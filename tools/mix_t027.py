# TRADE #027 · música original distinta por versión + efectos moderados + voz A con ducking
import json, subprocess
S = __import__("os").environ.get("BITRANS_WORK", "/home/user/bitrans_work")
for v, var, lufs in [("tiktok", "t027t", -16), ("shorts", "t027s", -14)]:
    d = json.load(open(f"{S}/t027-{v}/tiempos.json")); T = {n: [s, s + du] for n, s, du in d["frases"]}; DUR = d["duracion"]
    TK = v == "tiktok"; Sx = lambda n: T[n][0]
    keys = ["e1", "r1", "r2", "c1a", "c2a", "c3a", "x1"] if TK else ["s3", "s5", "s6", "s8", "s10", "s12", "s14"]
    tp = Sx("r3") if TK else Sx("s6") + (T["s6"][1] - T["s6"][0]) * 0.42
    ev = [[0.12, "impact"], [(Sx("g1") if TK else Sx("s1")) + 1.0, "whoosh"], [(Sx("g2") if TK else Sx("s2")) + 0.5, "stamp"]] + [[Sx(k) - 0.3, "whoosh"] for k in keys] + [[tp - 0.05, "impact"], [tp + 0.3, "ping"]]
    ev.append([(Sx("c1b") + 1.2) if TK else Sx("s9") - 0.1, "stamp"])
    o = f"{S}/t027-{v}/assets/audio"
    subprocess.run(["python3", f"{S}/tools/bed_music.py", f"{o}/bed.wav", str(DUR), var], check=True, capture_output=True)
    subprocess.run(["python3", f"{S}/tools/sfx_mix.py", f"{o}/bed.wav", f"{o}/bedfx.wav", str(DUR), json.dumps(ev)], check=True, capture_output=True)
    fc = (f"[0]aresample=48000,volume=0.26,afade=t=out:st={DUR-2.0}:d=2.0[m];[1]aresample=48000,aformat=channel_layouts=stereo,apad=whole_dur={DUR},asplit[v][sc];"
          f"[m][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[md];[md][v]amix=inputs=2:normalize=0:duration=longest,atrim=0:{DUR},loudnorm=I={lufs}:TP=-1.5:LRA=11")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{o}/bedfx.wav", "-i", f"{S}/t027/tts/{v}_narr.wav", "-filter_complex", fc, "-ar", "48000", f"{o}/mix.wav"], check=True)
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"{o}/mix.wav", "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    print(v, DUR, [l.strip() for l in r.split("Summary")[1].splitlines() if "I:" in l][0])
