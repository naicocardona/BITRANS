# NAS100 · TRADE #029 · música original por versión + efectos en cada golpe visual + voz A con ducking (TikTok −16 LUFS, Shorts −14 LUFS, 2 pasadas)
import json, subprocess, os
S = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work"); T = os.path.dirname(os.path.abspath(__file__))
for v, var, lufs in [("tiktok", "t029t", -16), ("shorts", "t029s", -14)]:
    d = json.load(open(f"{S}/t029-{v}/tiempos.json")); P = {n: [s, s + du] for n, s, du in d["frases"]}; DUR = d["duracion"]; TK = v == "tiktok"
    s_ = lambda n: P[n][0]; f_ = lambda n: P[n][1]; m_ = lambda n, k: s_(n) + (f_(n) - s_(n)) * k
    ev = [[0.05, "impact"], [0.3, "whoosh"]]
    if TK: ev += [[0.15, "stamp"], [0.45, "stamp"], [m_("e1", 0.8), "ping"], [m_("e2", 0.1), "ping"], [m_("e2", 0.7), "ping"], [m_("e3", 0.75), "impact"]]
    else: ev += [[m_("s1", 0.3), "ping"], [s_("s3") + 0.05, "stamp"], [s_("s3") + 0.45, "stamp"], [m_("s4", 0.25), "ping"], [f_("s4") - 0.2, "ping"]]
    for k in (["d1", "d2", "l1a", "l2a", "l3a", "x1"] if TK else ["s3", "s5", "s6", "s7", "s11"]): ev.append([s_(k) - 0.35, "whoosh"])
    d1 = "d1" if TK else "s5"; ev += [[s_(d1) + 1.1, "impact"]]
    if TK: ev += [[m_("d1", 0.62), "whoosh"]]
    rt = s_("d3") if TK else m_("s6", 0.35); ev += [[rt + 0.28, "impact"], [rt + 0.35, "ping"]]
    if TK: ev += [[m_("l1a", 0.9), "ping"], [m_("l1b", 0.45), "stamp"], [m_("l2a", 0.85), "ping"], [m_("l2b", 0.35), "stamp"], [s_("l3a") + 0.3, "ping"], [m_("l3b", 0.75), "stamp"]]
    else: ev += [[s_("s8"), "ping"], [s_("s9"), "ping"], [s_("s10"), "ping"]]
    x0 = s_("x1") if TK else s_("s11") - 0.6; ev += [[x0 - 0.1, "stamp"], [x0 + 0.6, "impact"], [x0 + 0.65, "ping"]]
    o = f"{S}/t029-{v}/assets/audio"
    subprocess.run(["python3", f"{T}/bed_music.py", f"{o}/bed.wav", str(DUR), var], check=True, capture_output=True)
    subprocess.run(["python3", f"{T}/sfx_mix.py", f"{o}/bed.wav", f"{o}/bedfx.wav", str(DUR), json.dumps(sorted(ev))], check=True, capture_output=True)
    fc = (f"[0]aresample=48000,volume=0.26,afade=t=out:st={DUR-1.5}:d=1.5[m];[1]aresample=48000,aformat=channel_layouts=stereo,apad=whole_dur={DUR},asplit[vv][sc];"
          f"[m][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[md];[md][vv]amix=inputs=2:normalize=0:duration=longest,atrim=0:{DUR},loudnorm=I={lufs}:TP=-1.5:LRA=11")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{o}/bedfx.wav", "-i", f"{S}/t029/tts/{v}_narr.wav", "-filter_complex", fc, "-ar", "48000", f"{o}/mix1.wav"], check=True)
    lu = lambda f: float([l for l in subprocess.run(["ffmpeg", "-hide_banner", "-i", f, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr.split("Summary")[1].splitlines() if "I:" in l][0].split()[1])
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{o}/mix1.wav", "-af", f"volume={lufs - lu(f'{o}/mix1.wav'):.2f}dB,alimiter=limit=0.84:attack=2:release=60:level=disabled", "-ar", "48000", f"{o}/mix.wav"], check=True)
    os.remove(f"{o}/mix1.wav"); print(v, DUR, f"{lu(f'{o}/mix.wav'):.1f} LUFS")
