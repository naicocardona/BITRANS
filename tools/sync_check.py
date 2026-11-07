# Verifica la sincronía subtítulos ↔ voz en todo el video: ventanas de 4 s, ASR vs palabras con tiempo. Uso: sync_check.py voz.wav words.json
import sys, json, re, numpy as np, soundfile as sf
sys.path.insert(0, __import__("os").path.dirname(__file__)); import align_asr as A
x, sr = sf.read(sys.argv[1], dtype="float32"); W = json.load(open(sys.argv[2]))["words"]; dur = len(x) / sr; bad = []; sc = []
for a in np.arange(0, dur - 2, 4.0):
    seg = np.concatenate([np.zeros(int(.3 * sr), np.float32), x[int(a * sr):int((a + 4) * sr)]])
    st = A.rec().create_stream(); st.accept_waveform(sr, seg); A.rec().decode_stream(st); heard = set(A.toks(st.result.text))
    if len(heard) < 3: continue
    near = set(t for w in W if a - 0.35 <= w[1] < a + 4.0 for t in A.toks(w[0]))
    far = set(t for w in W if a - 2.5 <= w[1] < a + 6.5 for t in A.toks(w[0]))
    s = len(heard & near) / len(heard); s2 = len(heard & far) / len(heard); sc.append(s)
    if s < 0.6 and s2 >= 0.6: bad.append((round(float(a), 1), round(s, 2)))
print(f"ventanas: {len(sc)} · coincidencia media {np.mean(sc):.2f} · desfasadas: {bad or 'ninguna'}")
