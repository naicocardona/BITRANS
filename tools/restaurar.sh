#!/usr/bin/env bash
# Restaura el taller de videos (TITÁN, NAS100, LUKAS, NUVA) en una sesión nueva. Idempotente.
# Uso (desde la raíz del repo):  bash tools/restaurar.sh
set -e
REPO="$(cd "$(dirname "$0")/.." && pwd)"; W="${BITRANS_WORK:-/home/user/bitrans_work}"
pip install -q "sherpa-onnx<2" soundfile numpy pillow 2>/dev/null || pip install -q "sherpa-onnx<2" soundfile numpy pillow
if [ ! -d /opt/asr/sherpa-onnx-whisper-small ]; then
  mkdir -p /opt/asr && cd /opt/asr
  curl -sSL -o w.tar.bz2 https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-small.tar.bz2
  tar xjf w.tar.bz2 && rm -f w.tar.bz2
fi
if [ ! -d /opt/tts/kokoro-multi-lang-v1_0 ]; then
  mkdir -p /opt/tts && cd /opt/tts
  curl -sSL -o k.tar.bz2 https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/kokoro-multi-lang-v1_0.tar.bz2
  tar xjf k.tar.bz2 && rm -f k.tar.bz2
fi
mkdir -p "$W"
ln -sfn "$REPO/tools" "$W/tools"
ln -sfn "$REPO/tools/kit/tq-3d" "$W/tq-3d"
ln -sfn "$REPO/tools/geo" "$W/geo"
ln -sfn /opt/asr "$W/asr-models"
# Skills de animación (código revisado, MIT): se instalan en Claude desde el repo
mkdir -p "$HOME/.claude/skills"
for s in "$REPO"/tools/skills/*/; do ln -sfn "$s" "$HOME/.claude/skills/$(basename "$s")"; done
# Renderizador de hand-drawn-canvas-animation (puppeteer-core, sin descargar navegador)
mkdir -p "$W/hdca" && cp "$REPO/tools/skills/hand-drawn-canvas-animation/scripts/"package*.json "$W/hdca/"
( cd "$W/hdca" && PUPPETEER_SKIP_DOWNLOAD=1 npm ci --no-audit --no-fund --silent )
echo "Taller listo en $W (herramientas: $REPO/tools)"
