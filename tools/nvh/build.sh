#!/bin/bash
# Arma «Nvidia: una sola persona»: inyecta NVS (cierres diarios reales de NVDA, Yahoo Finance, 4–23 nov 2026; el último es el cierre oficial de hoy) y llama a hd_build.sh.
set -e; R=$(cd "$(dirname "$0")/../.." && pwd); SRC="$2.src.js"; E="$R/entregas/titan/nvidia_huang_regresa/datos"
python3 - "$E" > "$SRC" <<'PY'
import json, sys, datetime as dt
E = sys.argv[1]; r = json.load(open(f"{E}/NVDA_1mes.json"))["chart"]["result"][0]; cl = json.load(open(f"{E}/cierre.json"))["cierre"]
S = [[dt.datetime.utcfromtimestamp(t).strftime("%d %b"), round(c, 2)] for t, c in zip(r["timestamp"], r["indicators"]["quote"][0]["close"]) if dt.datetime.utcfromtimestamp(t) >= dt.datetime(2026, 11, 4)]
S[-1][1] = cl; print("const NVS = " + json.dumps(S) + ";")
PY
cat "$R/tools/nvh/film.js" >> "$SRC"; bash "$R/tools/hd_build.sh" "$SRC" "$1" "$2"
