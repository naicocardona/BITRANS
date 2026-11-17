# Mete las voces de los personajes en los huecos de la narración (PAUSAS «yt» de guiones.py, en el mismo orden que HUECOS).
# Uso: python3 tools/dca/personajes.py <entrega> <taller>   → reemplaza <taller>/yt.wav por la narración con personajes (guarda yt_solo_juan.wav)
#   requiere <entrega>/voz/personaje_<id>.mp3 para cada id de HUECOS. Cada voz se centra en su hueco y se normaliza al nivel de Juan.
import os, sys, re, shutil, subprocess, json, numpy as np, soundfile as sf
E, W = os.path.abspath(sys.argv[1]), sys.argv[2]; sys.path.insert(0, E); import guiones as g
nrm = lambda w: re.sub(r"[^\wáéíóúñü]", "", w.lower())
if not os.path.exists(f"{W}/yt_solo_juan.wav"): shutil.copy(f"{W}/yt.wav", f"{W}/yt_solo_juan.wav")
x, sr = sf.read(f"{W}/yt_solo_juan.wav", dtype="float32"); ws = json.load(open(f"{W}/yt.words.json"))["words"]; N = [nrm(w[0]) for w in ws]
rms = lambda a: float(np.sqrt(np.mean(a[np.abs(a) > .01] ** 2))) if np.any(np.abs(a) > .01) else 1e-3
ref = rms(x)
for (ph, gap), pid in zip(g.PAUSAS["yt"], g.HUECOS):
    ks = [nrm(k) for k in ph.split()]; j = next(i + len(ks) - 1 for i in range(len(N)) if N[i:i + len(ks)] == ks)
    t0, t1 = ws[j][2], ws[j + 1][1]   # el hueco está entre la última palabra de la frase y la siguiente
    tmp = f"{W}/_p_{pid}.wav"; subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{E}/voz/personaje_{pid}.mp3", "-af", "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse", "-ac", "1", "-ar", str(sr), tmp], check=True)
    v, _ = sf.read(tmp, dtype="float32"); v = v * (ref / rms(v)) * .95
    a = int(((t0 + t1) / 2 - len(v) / sr / 2) * sr); a = max(int(t0 * sr), a); x[a:a + len(v)] += v[:max(0, len(x) - a)]
    print(pid, f"hueco {t0:.2f}–{t1:.2f} s ({t1 - t0:.2f}) · voz {len(v) / sr:.2f} s", "OK" if len(v) / sr <= t1 - t0 + .1 else "¡NO CABE!")
sf.write(f"{W}/yt.wav", np.clip(x, -1, 1), sr)
