#!/bin/bash
# Arma «Anthropic salió a bolsa»: inyecta CLOSE (cierre oficial del 19 nov 2026, entregas/titan/anthropic_ipo/datos/cierre.json) y llama a hd_build.sh.
set -e; R=$(cd "$(dirname "$0")/../.." && pwd); SRC="$2.src.js"
python3 -c "import json,sys; print('const CLOSE = %s;' % json.load(open(sys.argv[1]))['cierre'])" "$R/entregas/titan/anthropic_ipo/datos/cierre.json" > "$SRC"
cat "$R/tools/ant/film.js" >> "$SRC"; bash "$R/tools/hd_build.sh" "$SRC" "$1" "$2"
