# Mete «empleado» + «jefe» (seguidos, 0,25 s entre ambos) centrados en el hueco tras «se reporta enfermo.» para tk y sh.
# Uso: python3 tools/gta/personajes.py <entrega> <taller>   (guarda <modo>_solo_juan.wav la primera vez)
import os, sys, re, shutil, subprocess, json, numpy as np, soundfile as sf
E, W = os.path.abspath(sys.argv[1]), sys.argv[2]; nrm = lambda w: re.sub(r"[^\wáéíóúñü]", "", w.lower())
rms = lambda a: float(np.sqrt(np.mean(a[np.abs(a) > .01] ** 2)))
def clip(n, sr):
    t = f"{W}/_{n}.wav"; subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{E}/voz/personaje_{n}.mp3", "-af", "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse", "-ac", "1", "-ar", str(sr), t], check=True)
    return sf.read(t, dtype="float32")[0]
for m in ("tk", "sh"):
    if not os.path.exists(f"{W}/{m}_solo_juan.wav"): shutil.copy(f"{W}/{m}.wav", f"{W}/{m}_solo_juan.wav")
    x, sr = sf.read(f"{W}/{m}_solo_juan.wav", dtype="float32"); ws = json.load(open(f"{W}/{m}.words.json"))["words"]
    j = next(i for i in range(len(ws) - 1) if nrm(ws[i][0]) == "enfermo" and nrm(ws[i - 1][0]) == "reporta"); t0, t1 = ws[j][2], ws[j + 1][1]
    a, b = clip("empleado", sr), clip("jefe", sr); ref = rms(x); v = np.concatenate([a * ref / rms(a), np.zeros(int(.25 * sr), np.float32), b * ref / rms(b)]) * .95
    s0 = int((t0 + (t1 - t0 - len(v) / sr) / 2) * sr); x[s0:s0 + len(v)] += v
    print(m, f"hueco {t0:.2f}–{t1:.2f} ({t1 - t0:.2f} s) · voces {len(v) / sr:.2f} s", "OK" if len(v) / sr <= t1 - t0 else "¡NO CABE!")
    sf.write(f"{W}/{m}.wav", np.clip(x, -1, 1), sr)
