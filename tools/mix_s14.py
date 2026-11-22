# NAS100 · REPORTE SEMANAL #14 · música original por versión + efectos en cada golpe visual + voz A con ducking (TikTok −16 LUFS, Shorts −14 LUFS)
import json, subprocess, os
S = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work"); T = os.path.dirname(os.path.abspath(__file__))
for v, var, lufs in [("tiktok", "s14t", -16), ("shorts", "s14s", -14)]:
    d = json.load(open(f"{S}/s14-{v}/tiempos.json")); P = {n: [s, s + du] for n, s, du in d["frases"]}; DUR = d["duracion"]; TK = v == "tiktok"
    s_ = lambda n: P[n][0]; f_ = lambda n: P[n][1]
    ev = [[0.05, "impact"], [0.3, "whoosh"], [0.5, "whoosh"]]
    g1 = s_("g1" if TK else "s1"); g1f = f_("g1" if TK else "s1")
    for i in range(4): ev.append([g1 + (g1f - g1) * 0.55 + i * 0.32, "stamp"])
    for k in (["a1", "b1", "c1", "d1", "t1", "l1", "l2", "l3", "x1"] if TK else ["s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"]): ev.append([s_(k) - 0.3, "whoosh"])
    for a, b in ([("a1", "a2"), ("b1", "b2"), ("c1", "c2"), ("d1", "d2")] if TK else [("s2", None), ("s3", None), ("s4", None), ("s5", None)]):
        r0 = s_(b) - 0.1 if b else s_(a) + (f_(a) - s_(a)) * 0.5
        ev += [[r0 - 0.3, "whoosh"], [r0 + 0.55, "impact"], [r0 + 0.8, "ping"]]
    bal = s_("t1" if TK else "s6"); ev += [[bal + 0.05, "stamp"], [bal + 1.05, "impact"], [bal + 1.1, "ping"]]
    l3f = f_("l3" if TK else "s9"); ev += [[l3f - 1.0, "stamp"]]
    x0 = s_("x1" if TK else "s10"); ev += [[x0 - 0.1, "stamp"], [x0 + 1.9, "ping"]]
    o = f"{S}/s14-{v}/assets/audio"
    subprocess.run(["python3", f"{T}/bed_music.py", f"{o}/bed.wav", str(DUR), var], check=True, capture_output=True)
    subprocess.run(["python3", f"{T}/sfx_mix.py", f"{o}/bed.wav", f"{o}/bedfx.wav", str(DUR), json.dumps(ev)], check=True, capture_output=True)
    fc = (f"[0]aresample=48000,volume=0.26,afade=t=out:st={DUR-2.0}:d=2.0[m];[1]aresample=48000,aformat=channel_layouts=stereo,apad=whole_dur={DUR},asplit[vv][sc];"
          f"[m][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[md];[md][vv]amix=inputs=2:normalize=0:duration=longest,atrim=0:{DUR},loudnorm=I={lufs}:TP=-1.5:LRA=11")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{o}/bedfx.wav", "-i", f"{S}/s14/tts/{v}_narr.wav", "-filter_complex", fc, "-ar", "48000", f"{o}/mix.wav"], check=True)
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"{o}/mix.wav", "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    print(v, DUR, [l.strip() for l in r.split("Summary")[1].splitlines() if "I:" in l][0])
