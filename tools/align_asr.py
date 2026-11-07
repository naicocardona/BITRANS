# Alineación precisa guion ↔ voz: tramos de habla (silencios) + transcripción Whisper local de cada tramo.
# Cada palabra del guion se asigna al tramo donde el ASR la escuchó; dentro del tramo se reparte por letras.
# Uso como módulo: align(x, sr, text) -> [[palabra, inicio, fin], ...]
import re, difflib, subprocess, tempfile, os, numpy as np, soundfile as sf
_rec = None
def rec():
    global _rec
    if _rec is None:
        import sherpa_onnx; d = "/opt/asr/sherpa-onnx-whisper-small"
        _rec = sherpa_onnx.OfflineRecognizer.from_whisper(encoder=f"{d}/small-encoder.int8.onnx", decoder=f"{d}/small-decoder.int8.onnx",
                                                          tokens=f"{d}/small-tokens.txt", language="es", task="transcribe", num_threads=4)
    return _rec
NUM = {"0": "cero", "1": "uno", "5": "cinco", "6": "seis", "7": "siete", "10": "diez", "13": "trece", "14": "catorce", "19": "diecinueve", "20": "veinte",
       "24": "veinticuatro", "25": "veinticinco", "80": "ochenta", "96": "noventa y seis", "100": "cien", "1000": "mil", "1070": "mil setenta"}
def norm(w): return re.sub(r"[^\wáéíóúñü]", "", w.lower())
def toks(text):
    out = []
    for w in text.replace("%", " por ciento").split():
        n = norm(w); out += (NUM[n].split() if n in NUM else [n]) if n else []
    return out
def chunks_of(x, sr, db=-35, mind=0.16):
    f = tempfile.NamedTemporaryFile(suffix=".wav", delete=False).name; sf.write(f, x, sr)
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", f, "-af", f"silencedetect=n={db}dB:d={mind}", "-f", "null", "-"], capture_output=True, text=True).stderr; os.unlink(f)
    ss = [float(v) for v in re.findall(r"silence_start: ([\d.]+)", r)]; se = [float(v) for v in re.findall(r"silence_end: ([\d.]+)", r)]
    dur = len(x) / sr; sil = list(zip(ss, se + [dur])); ch, t = [], 0.0
    for a, b in sil:
        if a - t > 0.05: ch.append([t, a])
        t = b
    if dur - t > 0.05: ch.append([t, dur])
    return ch
def align(x, sr, text):
    ch = chunks_of(x, sr); A, AC = [], []
    for k, (a, b) in enumerate(ch):
        seg = np.concatenate([np.zeros(int(0.25 * sr), np.float32), x[int(a * sr):int(b * sr)], np.zeros(int(0.25 * sr), np.float32)]).astype(np.float32)
        st = rec().create_stream(); st.accept_waveform(sr, seg); rec().decode_stream(st)
        tw = toks(st.result.text); A += tw; AC += [k] * len(tw)
    W = text.split(); S, SI = [], []           # tokens del guion → índice de palabra
    for i, w in enumerate(W):
        for t in toks(w) or [norm(w)]: S.append(t); SI.append(i)
    sm = difflib.SequenceMatcher(None, S, A, autojunk=False); wc = [None] * len(W)
    for blk in sm.get_matching_blocks():
        for j in range(blk.size):
            i = SI[blk.a + j]
            if wc[i] is None: wc[i] = AC[blk.b + j]
    # palabras sin pareja: se interpolan de forma monótona entre vecinas
    known = [i for i, c in enumerate(wc) if c is not None]
    for i in range(len(W)):
        if wc[i] is None:
            prev = max([k for k in known if k < i], default=None); nxt = min([k for k in known if k > i], default=None)
            wc[i] = wc[prev] if prev is not None else (wc[nxt] if nxt is not None else 0)
    for i in range(1, len(W)): wc[i] = max(wc[i], wc[i - 1])        # monótono
    out = []
    for k, (a, b) in enumerate(ch):
        idx = [i for i in range(len(W)) if wc[i] == k]
        if not idx: continue
        L = [len(norm(W[i])) + 1 for i in idx]; t = a
        for i, l in zip(idx, L):
            d = (b - a) * l / sum(L); out.append([W[i], round(t, 3), round(t + d, 3)]); t += d
    return out
