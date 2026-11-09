#!/bin/bash
# Arma un film del estilo híbrido TITÁN: hd_build.sh <film.js> <words.json> <carpeta_salida>
# Copia core.js (skill), hd_lib.js (librería compartida), fuentes, el film y los datos de voz; escribe film.html.
set -e
FILM=$(realpath "$1"); WJ=$(realpath "$2"); F=$3; R=$(cd "$(dirname "$0")/.." && pwd)
mkdir -p "$F"
cp "$R/tools/skills/hand-drawn-canvas-animation/assets/core.js" "$R/tools/hd_lib.js" "$F/"
cp "$R/tools/kit/tq-3d/assets/fonts/"{caveat-700,bricolage-800,jakarta-800}.woff2 "$F/"
cp "$FILM" "$F/film.js"
python3 -c "import json,sys; d=json.load(open(sys.argv[1])); open(sys.argv[2],'w').write('const DATA = '+json.dumps(d,ensure_ascii=False)+';\n')" "$WJ" "$F/data.js"
printf '%s\n' '<!doctype html><html><head><meta charset="utf-8"><title>TITÁN</title><style>body{margin:0;background:#111}</style></head>' \
  '<body><canvas id="c"></canvas><script src="core.js"></script><script src="data.js"></script><script src="hd_lib.js"></script><script src="film.js"></script></body></html>' > "$F/film.html"
echo "film listo en $F"
