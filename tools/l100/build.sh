#!/bin/bash
# Arma el largo «100 dólares al mes»: inyecta SER (series reales, tools/dca/calc.py) y GEO (contorno de Colombia) y llama a hd_build.sh.
# Uso: build.sh <words.json> <carpeta_salida>   (el film combinado queda en <carpeta_salida>.src.js)
set -e; R=$(cd "$(dirname "$0")/../.." && pwd); SRC="$2.src.js"
python3 -c "import json,sys; print('const SER = '+open(sys.argv[1]).read()+';'); print('const GEO = '+json.dumps({'col':json.load(open(sys.argv[2]))})+';')" "$R/entregas/titan/largo_100_dolares/datos/series.json" "$R/tools/geo/col_ring50.json" > "$SRC"
cat "$R/tools/l100/film.js" >> "$SRC"; bash "$R/tools/hd_build.sh" "$SRC" "$1" "$2"
