# Nvidia/Huang · voz Juan (ElevenLabs): añade cola, alinea por ASR, marca secciones y genera el texto en pantalla (cifras y nombres bien escritos).
# Uso: python3 tools/nv/voice.py   (requiere $BITRANS_WORK/nv/{tiktok,shorts}_t.wav, hechos con tighten.py 0,32)
import os, sys, re, json, numpy as np, soundfile as sf
R = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, f"{R}/.."); sys.path.insert(0, f"{R}/../../entregas/titan/nvidia_huang")
import align_asr, guiones
W = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work") + "/nv"
MAP = [("cuatro coma tres por ciento", "4,3 %"), ("ese ene pe quinientos", "S&P 500"), ("Yensen Huang", "Jensen Huang"), ("Envidia", "Nvidia"), ("nueve de noviembre", "9 de noviembre")]
def norm(w): return re.sub(r"[^\wáéíóúñü]", "", w.lower())
def display(words):
    out, i = [], 0
    while i < len(words):
        for k, v in MAP:
            ks = k.split()
            if [norm(w[0]) for w in words[i:i + len(ks)]] == [norm(z) for z in ks]:
                tail = re.sub(r"^.*?([.,:;?!»]*)$", r"\1", words[i + len(ks) - 1][0]); out.append([v + tail, words[i][1], words[i + len(ks) - 1][2]]); i += len(ks); break
        else: out.append(list(words[i])); i += 1
    return out
for mode, name, L in [("tk", "tiktok", guiones.TK), ("sh", "shorts", guiones.SH)]:
    x, sr = sf.read(f"{W}/{name}_t.wav", dtype="float32"); ws = align_asr.align(x, sr, guiones.text(L)); n = 0; secs = []
    for sid, t in L: secs.append({"id": sid, "t0": ws[n][1]}); n += len(t.split())
    assert n == len(ws), (n, len(ws))
    for k in range(len(secs)): secs[k]["t1"] = secs[k + 1]["t0"] if k + 1 < len(secs) else ws[-1][2]
    y = np.concatenate([x, np.zeros(int(2.4 * sr), np.float32)]); sf.write(f"{W}/{mode}.wav", y, sr)
    json.dump({"mode": mode, "dur": round(len(y) / sr, 3), "secs": secs, "words": ws, "display": display(ws)}, open(f"{W}/{mode}.words.json", "w"), ensure_ascii=False)
    print(mode, round(len(y) / sr, 2), "s ·", len(ws), "palabras ·", [(s["id"], round(s["t0"], 1)) for s in secs])
