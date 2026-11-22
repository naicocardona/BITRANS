#!/bin/bash
# Arma «¿Esperar el momento perfecto?»: inyecta SER (serie mensual real del SPY: invertido vs. sin los 10 mejores días, Yahoo Finance) y llama a hd_build.sh.
set -e; R=$(cd "$(dirname "$0")/../.." && pwd); SRC="$2.src.js"
python3 -c "import sys; print('const SER = '+open(sys.argv[1]).read()+';')" "$R/tools/mom/series.json" > "$SRC"
cat "$R/tools/mom/film.js" >> "$SRC"; bash "$R/tools/hd_build.sh" "$SRC" "$1" "$2"
