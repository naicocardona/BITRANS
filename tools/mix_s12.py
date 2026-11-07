# NAS100 · SEMANA #12 · música original por versión + efectos en cada golpe visual + voz A con ducking (TikTok −16 LUFS, Shorts −14 LUFS)
import json, subprocess, os
S = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work"); T = os.path.dirname(os.path.abspath(__file__))
for v, var, lufs in [("tiktok", "s12t", -16), ("shorts", "s12s", -14)]:
    d = json.load(open(f"{S}/s12-{v}/tiempos.json")); P = {n: [s, s + du] for n, s, du in d["frases"]}; DUR = d["duracion"]; TK = v == "tiktok"
    s_ = lambda n: P[n][0]; f_ = lambda n: P[n][1]
    ev = [[0.05, "impact"], [0.3, "whoosh"], [0.5, "whoosh"]]
    g2 = s_("g2" if TK else "s2"); ev += [[g2 + 0.3, "stamp"], [g2 + 0.9, "stamp"]]
    for k in (["a1", "b1", "c1a", "c2a", "c3a", "x1"] if TK else ["s3", "s5", "s7", "s9"]): ev.append([s_(k) - 0.3, "whoosh"])
    r26 = s_("a3" if TK else "s4"); ev += [[r26 - 0.3, "whoosh"], [r26 + 0.7, "impact"], [r26 + 1.0, "ping"]]
    r27 = (s_("b3") + (f_("b3") - s_("b3")) * 0.42) if TK else (s_("s6") + (f_("s6") - s_("s6")) * 0.45 + (f_("s6") - s_("s6") - (f_("s6") - s_("s6")) * 0.45) * 0.35)
    ev += [[r27 - 0.3, "whoosh"], [r27 + 0.6, "impact"], [r27 + 0.9, "ping"]]
    if TK: ev += [[s_("c1b") + 2.6, "stamp"], [s_("c2b") + 0.8, "stamp"], [s_("c3b") + 0.4, "stamp"]]
    x0 = s_("x1" if TK else "s9"); ev += [[x0 - 0.1, "stamp"], [x0 + 1.7, "impact"], [x0 + 1.75, "ping"]]
    o = f"{S}/s12-{v}/assets/audio"
    subprocess.run(["python3", f"{T}/bed_music.py", f"{o}/bed.wav", str(DUR), var], check=True, capture_output=True)
    subprocess.run(["python3", f"{T}/sfx_mix.py", f"{o}/bed.wav", f"{o}/bedfx.wav", str(DUR), json.dumps(ev)], check=True, capture_output=True)
    fc = (f"[0]aresample=48000,volume=0.26,afade=t=out:st={DUR-2.0}:d=2.0[m];[1]aresample=48000,aformat=channel_layouts=stereo,apad=whole_dur={DUR},asplit[vv][sc];"
          f"[m][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[md];[md][vv]amix=inputs=2:normalize=0:duration=longest,atrim=0:{DUR},loudnorm=I={lufs}:TP=-1.5:LRA=11")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{o}/bedfx.wav", "-i", f"{S}/s12/tts/{v}_narr.wav", "-filter_complex", fc, "-ar", "48000", f"{o}/mix.wav"], check=True)
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"{o}/mix.wav", "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    print(v, DUR, [l.strip() for l in r.split("Summary")[1].splitlines() if "I:" in l][0])
