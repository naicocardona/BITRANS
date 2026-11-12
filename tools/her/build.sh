#!/bin/bash
# Arma el film de herencia: inyecta los contornos reales (GEO) delante de las escenas y llama a hd_build.sh.
# Uso: build.sh <words.json> <carpeta_salida>
set -e; R=$(cd "$(dirname "$0")/../.." && pwd); T=$(mktemp -d)
python3 -c "import json,sys; print('const GEO = '+json.dumps({'usa':json.load(open(sys.argv[1])),'col':json.load(open(sys.argv[2]))})+';')" "$R/tools/geo/usa_ring.json" "$R/tools/geo/col_ring50.json" > $T/film.js
cat "$R/tools/her/film.js" >> $T/film.js; bash "$R/tools/hd_build.sh" $T/film.js "$1" "$2"; rm -rf $T
