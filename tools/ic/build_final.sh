#!/bin/bash
# Arma el film final de interés compuesto para una versión: build_final.sh tk|sh  → $BITRANS_WORK/icf/film_<modo>/film.html
set -e
M=${1:?modo tk|sh}; R=$(cd "$(dirname "$0")/../.." && pwd); W=${BITRANS_WORK:-/home/user/bitrans_work}/icf; F=$W/film_$M
mkdir -p "$F"
cp "$R/tools/skills/hand-drawn-canvas-animation/assets/core.js" "$F/"
cp "$R/tools/kit/tq-3d/assets/fonts/"{caveat-700,bricolage-800,jakarta-800}.woff2 "$F/"
cp "$R/tools/ic/film_final.js" "$F/film.js"
python3 -c "import json; d=json.load(open('$W/$M.words.json')); open('$F/data.js','w').write('const DATA = '+json.dumps(d,ensure_ascii=False)+';\n')"
printf '%s\n' '<!doctype html><html><head><meta charset="utf-8"><title>TITÁN · interés compuesto</title><style>body{margin:0;background:#111}</style></head>' \
  '<body><canvas id="c"></canvas><script src="core.js"></script><script src="data.js"></script><script src="film.js"></script></body></html>' > "$F/film.html"
echo "film $M listo en $F"
