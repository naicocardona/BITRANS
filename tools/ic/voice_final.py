# Interés compuesto · versiones finales (voz Juan): une cola, alinea por ASR, marca inicio de cada sección y genera palabras con cifras.
# Uso: python3 tools/ic/voice_final.py   (requiere $BITRANS_WORK/icf/{tiktok,shorts}_t.wav, hechos con tighten.py 0,32)
import os, sys, json, numpy as np, soundfile as sf
R = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, f"{R}/.."); sys.path.insert(0, R); sys.path.insert(0, f"{R}/../../entregas/titan/interes_compuesto")
import align_asr, guiones
from voice import display, norm
W = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work") + "/icf"


for mode, name, L, tail in [("tk", "tiktok", guiones.TK, 2.0), ("sh", "shorts", guiones.SH, 2.2)]:
    x, sr = sf.read(f"{W}/{name}_t.wav", dtype="float32"); text = guiones.text(L)
    ws = align_asr.align(x, sr, text); n = 0; secs = []
    for sid, t in L: secs.append({"id": sid, "t0": ws[n][1]}); n += len(t.split())
    assert n == len(ws), (n, len(ws))
    for k in range(len(secs)): secs[k]["t1"] = secs[k + 1]["t0"] if k + 1 < len(secs) else ws[-1][2]
    y = np.concatenate([x, np.zeros(int(tail * sr), np.float32)]); sf.write(f"{W}/{mode}.wav", y, sr)
    disp = display(ws)
    for i, w in enumerate(disp):      # «ganas ochocientos.» → 800
        if norm(w[0]) == "ochocientos" and i and norm(disp[i - 1][0]) == "ganas": w[0] = w[0].replace("ochocientos", "800")
    json.dump({"mode": mode, "dur": round(len(y) / sr, 3), "secs": secs, "words": ws, "display": disp}, open(f"{W}/{mode}.words.json", "w"), ensure_ascii=False)
    print(mode, round(len(y) / sr, 2), "s ·", len(ws), "palabras ·", [(s["id"], round(s["t0"], 1)) for s in secs])
