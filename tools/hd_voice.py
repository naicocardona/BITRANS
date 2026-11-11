# Voz genérica del kit híbrido TITÁN: cola de 2,4 s, alineación por ASR (align_asr), secciones, pausas de lectura opcionales y texto en pantalla (MAP).
# Uso: python3 tools/hd_voice.py <carpeta_entrega con guiones.py> <subcarpeta en $BITRANS_WORK>
#   requiere $BITRANS_WORK/<sub>/{tiktok,shorts}_t.wav (tighten.py 0,32). guiones.py define SH, TK, text() y, opcionales, MAP [(voz, pantalla)] y PAUSAS {"tk": [(frase, s)], "sh": [...]}.
import os, sys, re, json, numpy as np, soundfile as sf
R = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, R); sys.path.insert(0, os.path.abspath(sys.argv[1]))
import align_asr, guiones
W = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work") + "/" + sys.argv[2]
MAP = sorted(getattr(guiones, "MAP", []), key=lambda kv: -len(kv[0].split())); PAUSAS = getattr(guiones, "PAUSAS", {})
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
    cuts = []
    for ph, dd in PAUSAS.get(mode, []):   # cada palabra se corre solo con las pausas previas a su tiempo original
        ks = [norm(k) for k in ph.split()]; N = [norm(w[0]) for w in ws]
        j = next(i + len(ks) - 1 for i in range(len(N)) if N[i:i + len(ks)] == ks); cuts.append(((ws[j][2] + ws[j + 1][1]) / 2, dd))
    if cuts:
        cuts.sort(); out, last = [], 0
        for t, dd in cuts: i = int(t * sr); out += [x[last:i], np.zeros(int(dd * sr), np.float32)]; last = i
        out.append(x[last:]); x = np.concatenate(out); sh = lambda t0: sum(dd for t, dd in cuts if t <= t0)
        ws = [[w[0], round(w[1] + sh(w[1]), 3), round(w[2] + sh(w[1]), 3)] for w in ws]
    for sid, t in L: secs.append({"id": sid, "t0": ws[n][1]}); n += len(t.split())
    assert n == len(ws), (n, len(ws))
    for k in range(len(secs)): secs[k]["t1"] = secs[k + 1]["t0"] if k + 1 < len(secs) else ws[-1][2]
    y = np.concatenate([x, np.zeros(int(2.4 * sr), np.float32)]); sf.write(f"{W}/{mode}.wav", y, sr)
    json.dump({"mode": mode, "dur": round(len(y) / sr, 3), "secs": secs, "words": ws, "display": display(ws)}, open(f"{W}/{mode}.words.json", "w"), ensure_ascii=False)
    print(mode, round(len(y) / sr, 2), "s ·", len(ws), "palabras ·", [(s["id"], round(s["t0"], 1)) for s in secs])
