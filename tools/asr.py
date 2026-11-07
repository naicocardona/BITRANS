# Uso: asr.py <dir_whisper> <wav>...  — transcribe en español para verificar pronunciación
import sys, sherpa_onnx, soundfile as sf, numpy as np
d = sys.argv[1]
rec = sherpa_onnx.OfflineRecognizer.from_whisper(encoder=f"{d}/small-encoder.int8.onnx", decoder=f"{d}/small-decoder.int8.onnx",
                                                 tokens=f"{d}/small-tokens.txt", language="es", task="transcribe", num_threads=4)
for w in sys.argv[2:]:
    x, sr = sf.read(w, always_2d=True); x = x.mean(1).astype(np.float32)
    st = rec.create_stream(); st.accept_waveform(sr, x); rec.decode_stream(st)
    print(w.split("/")[-1], "→", st.result.text.strip())
