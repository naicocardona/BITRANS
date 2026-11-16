# NAS100 · REPORTE SEMANAL #13 · música original por versión + efectos en cada golpe visual + voz A con ducking (TikTok −16 LUFS, Shorts −14 LUFS)
import json, subprocess, os
S = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work"); T = os.path.dirname(os.path.abspath(__file__))
for v, var, lufs in [("tiktok", "s13t", -16), ("shorts", "s13s", -14)]:
    d = json.load(open(f"{S}/s13-{v}/tiempos.json")); P = {n: [s, s + du] for n, s, du in d["frases"]}; DUR = d["duracion"]; TK = v == "tiktok"
    s_ = lambda n: P[n][0]; f_ = lambda n: P[n][1]
    ev = [[0.05, "impact"], [0.3, "whoosh"], [0.5, "whoosh"]]
    g1 = s_("g1" if TK else "s1"); g2 = s_("g2") if TK else g1 + (f_("s1") - g1) * 0.5; ev += [[g2 + 0.3, "stamp"], [g2 + 0.9, "stamp"]]
    for k in (["a1", "b1", "t1", "c1a", "c2a", "c3a", "x1"] if TK else ["s2", "s4", "s6", "s8", "s9", "s10", "s11"]): ev.append([s_(k) - 0.3, "whoosh"])
    r28 = s_("a3") if TK else s_("s3") + (f_("s3") - s_("s3")) * 0.35; ev += [[r28 - 0.3, "whoosh"], [r28 + 0.7, "impact"], [r28 + 1.0, "ping"]]
    b3 = P["b3"] if TK else P["s5"]; r29 = b3[0] + (b3[1] - b3[0]) * (0.4 if TK else 0.3); ev += [[r29 - 0.3, "whoosh"], [r29 + 0.6, "impact"], [r29 + 0.9, "ping"]]
    bal = s_("t1" if TK else "s10"); ev += [[bal + 0.05, "stamp"], [bal + 1.05, "impact"], [bal + 1.1, "ping"]]
    c3 = f_("c3b" if TK else "s9"); ev += [[c3 - 1.2, "stamp"]]
    x0 = s_("x1" if TK else "s11"); ev += [[x0 - 0.1, "stamp"], [x0 + 1.9, "ping"]]
    o = f"{S}/s13-{v}/assets/audio"
    subprocess.run(["python3", f"{T}/bed_music.py", f"{o}/bed.wav", str(DUR), var], check=True, capture_output=True)
    subprocess.run(["python3", f"{T}/sfx_mix.py", f"{o}/bed.wav", f"{o}/bedfx.wav", str(DUR), json.dumps(ev)], check=True, capture_output=True)
    fc = (f"[0]aresample=48000,volume=0.26,afade=t=out:st={DUR-2.0}:d=2.0[m];[1]aresample=48000,aformat=channel_layouts=stereo,apad=whole_dur={DUR},asplit[vv][sc];"
          f"[m][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[md];[md][vv]amix=inputs=2:normalize=0:duration=longest,atrim=0:{DUR},loudnorm=I={lufs}:TP=-1.5:LRA=11")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{o}/bedfx.wav", "-i", f"{S}/s13/tts/{v}_narr.wav", "-filter_complex", fc, "-ar", "48000", f"{o}/mix.wav"], check=True)
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"{o}/mix.wav", "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    print(v, DUR, [l.strip() for l in r.split("Summary")[1].splitlines() if "I:" in l][0])
