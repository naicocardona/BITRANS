#!/bin/bash
# Arma la reflexión «No soltar en el peor momento»: inyecta NQ (Nasdaq 100 intradía de 5 min del 25 nov 2026, Yahoo Finance; datos en entregas/titan/nasdaq_bajista/datos) y llama a hd_build.sh.
set -e; R=$(cd "$(dirname "$0")/../.." && pwd); SRC="$2.src.js"; E="$R/entregas/titan/nasdaq_bajista/datos"
python3 -W ignore - "$E" > "$SRC" <<'PY'
import json, sys
i = json.load(open(sys.argv[1] + "/NDX_25nov_5m.json"))["chart"]["result"][0]
intra = [round(c, 2) for c in i["indicators"]["quote"][0]["close"] if c]
print("const NQ = " + json.dumps({"intra": intra, "max": 31361.37, "low": 24970.66, "prev": 26214.17, "close": 26046.90}) + ";")
PY
cat "$R/tools/nor/film.js" >> "$SRC"; bash "$R/tools/hd_build.sh" "$SRC" "$1" "$2"
