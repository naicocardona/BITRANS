#!/bin/bash
# Arma el film del piloto interés compuesto en $BITRANS_WORK/ic/film (core.js de la skill + fuentes + datos de voz)
set -e
R=$(cd "$(dirname "$0")/../.." && pwd); W=${BITRANS_WORK:-/home/user/bitrans_work}/ic; F=$W/film
mkdir -p "$F"
cp "$R/tools/skills/hand-drawn-canvas-animation/assets/core.js" "$F/"
cp "$R/tools/kit/tq-3d/assets/fonts/"{caveat-700,bricolage-800,jakarta-800}.woff2 "$F/"
cp "$R/tools/ic/film.js" "$F/"
python3 -c "import json,sys; d=json.load(open('$W/words.json')); open('$F/data.js','w').write('const DATA = '+json.dumps(d,ensure_ascii=False)+';\n')"
cat > "$F/film.html" <<'H'
<!doctype html><html><head><meta charset="utf-8"><title>TITÁN · interés compuesto</title><style>body{margin:0;background:#111}</style></head>
<body><canvas id="c"></canvas><script src="core.js"></script><script src="data.js"></script><script src="film.js"></script></body></html>
H
echo "film listo en $F"
