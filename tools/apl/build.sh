#!/bin/bash
# Arma el film Apple vs Colombia: inyecta el contorno real de Colombia (GEO) y llama a hd_build.sh.
# Uso: build.sh <words.json> <carpeta_salida>   (el film combinado queda en <carpeta_salida>.src.js)
set -e; R=$(cd "$(dirname "$0")/../.." && pwd); SRC="$2.src.js"
python3 -c "import json,sys; print('const GEO = '+json.dumps({'col':json.load(open(sys.argv[1]))})+';')" "$R/tools/geo/col_ring50.json" > "$SRC"
cat "$R/tools/apl/film.js" >> "$SRC"; bash "$R/tools/hd_build.sh" "$SRC" "$1" "$2"
