#!/bin/bash
# Arma «Los que venden las palas»: inyecta NV (serie mensual real de NVDA normalizada a oct. 2022 = 1, Yahoo Finance) y llama a hd_build.sh.
set -e; R=$(cd "$(dirname "$0")/../.." && pwd); SRC="$2.src.js"
python3 -c "import sys; print('const NV = '+open(sys.argv[1]).read()+';')" "$R/tools/pal/series.json" > "$SRC"
cat "$R/tools/pal/film.js" >> "$SRC"; bash "$R/tools/hd_build.sh" "$SRC" "$1" "$2"
