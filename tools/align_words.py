# Alinea las palabras de un guion con la voz: tramos de habla entre silencios + reparto por caracteres.
# Uso: align_words.py voz.wav guion.txt salida.json
import sys, json, re, subprocess, numpy as np
wav, txt, out = sys.argv[1], open(sys.argv[2]).read().strip(), sys.argv[3]
r = subprocess.run(["ffmpeg", "-hide_banner", "-i", wav, "-af", "silencedetect=n=-35dB:d=0.16", "-f", "null", "-"], capture_output=True, text=True).stderr
ss = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", r)]; se = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", r)]
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", wav], capture_output=True, text=True).stdout)
sil = [(a, b) for a, b in zip(ss, se + [dur])]
chunks = []; t = 0.0
for a, b in sil:
    if a - t > 0.05: chunks.append([t, a])
    t = b
if dur - t > 0.05: chunks.append([t, dur])
if chunks and chunks[0][0] < 0.02 and len(sil) and sil[0][0] < 0.02: pass
W = txt.split(); L = [len(re.sub(r"[^\wáéíóúñü]", "", w, flags=re.I)) + 1 for w in W]
cum = np.cumsum(L); total = cum[-1]; speech = sum(b - a for a, b in chunks)
# fronteras: para cada pausa interna elige el corte de palabra más cercano a lo esperado (prefiere puntuación)
bounds = [0]; el = 0.0
for k in range(len(chunks) - 1):
    el += chunks[k][1] - chunks[k][0]; exp = el / speech * total
    best, bs = None, 1e9
    for i in range(bounds[-1] + 1, len(W)):
        d = abs(cum[i - 1] - exp) / total
        pen = 0 if re.search(r"[.,:;?!]$", W[i - 1]) else 0.012
        if d + pen < bs: bs, best = d + pen, i
    bounds.append(best if best else bounds[-1])
bounds.append(len(W))
words = []
for k, (a, b) in enumerate(chunks):
    i0, i1 = bounds[k], bounds[k + 1]
    if i1 <= i0: continue
    ll = L[i0:i1]; tt = a
    for w, l in zip(W[i0:i1], ll):
        d = (b - a) * l / sum(ll); words.append([w, round(tt, 3), round(tt + d, 3)]); tt += d
json.dump({"dur": dur, "chunks": chunks, "words": words}, open(out, "w"), ensure_ascii=False)
print(out.split("/")[-1], len(chunks), "tramos", len(words), "palabras de", len(W))
