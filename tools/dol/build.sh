#!/bin/bash
# Arma «El dólar subió casi 10 % en 8 días»: inyecta DOL (TRM oficial del Banco de la República vía datos.gov.co, 3 ene–26 nov 2026) y llama a hd_build.sh.
set -e; R=$(cd "$(dirname "$0")/../.." && pwd); SRC="$2.src.js"; E="$R/entregas/titan/dolar_sube/datos"
python3 -W ignore - "$E" > "$SRC" <<'PY'
import json, sys
d = json.load(open(sys.argv[1] + "/TRM_datosgov.json"))
y = sorted((r["vigenciadesde"][:10], round(float(r["valor"]), 2)) for r in d if r["vigenciadesde"] >= "2026-01-01")
print("const DOL = " + json.dumps({"y": y, "d8": [r for r in y if r[0] >= "2026-11-18"]}) + ";")
PY
cat "$R/tools/dol/film.js" >> "$SRC"; bash "$R/tools/hd_build.sh" "$SRC" "$1" "$2"
