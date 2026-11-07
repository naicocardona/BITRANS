# Voz local (sherpa-onnx Kokoro multi-lang v1.0), sin servicios externos.
# Uso: tts_local_any.py <sid> <velocidad> <salida.wav> "texto"
#   sid 28 = ef_dora (es, mujer) · 29 = em_alex (es, hombre; voz A del Explorador NAS100, velocidad 0.92) · 30 = em_santa
# Modelo en /opt/tts/kokoro-multi-lang-v1_0 (lo instala tools/restaurar.sh). Reconstruido el 7 nov 2026.
import sys, sherpa_onnx, soundfile as sf, numpy as np
M = "/opt/tts/kokoro-multi-lang-v1_0"
sid, speed, out, text = int(sys.argv[1]), float(sys.argv[2]), sys.argv[3], sys.argv[4]
cfg = sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(kokoro=sherpa_onnx.OfflineTtsKokoroModelConfig(
    model=f"{M}/model.onnx", voices=f"{M}/voices.bin", tokens=f"{M}/tokens.txt", data_dir=f"{M}/espeak-ng-data",
    lang="es"), num_threads=4))
tts = sherpa_onnx.OfflineTts(cfg); a = tts.generate(text, sid=sid, speed=speed)
sf.write(out, np.array(a.samples, dtype=np.float32), a.sample_rate); print(out.split("/")[-1], round(len(a.samples) / a.sample_rate, 2), "s")
