#!/bin/bash
# Arma «De la peor semana a la mejor en 19 meses»: inyecta MS (S&P 500 y Nasdaq 100, cierres diarios desde el 1 oct 2026, Yahoo Finance; datos en entregas/titan/mejor_semana/datos) y llama a hd_build.sh.
set -e; R=$(cd "$(dirname "$0")/../.." && pwd); SRC="$2.src.js"; E="$R/entregas/titan/mejor_semana/datos"
python3 -W ignore - "$E" > "$SRC" <<'PY'
import json, sys, datetime as dt
E = sys.argv[1]
def daily(f):
    d = json.load(open(f"{E}/{f}"))["chart"]["result"][0]; q = d["indicators"]["quote"][0]["close"]
    return [[dt.datetime.fromtimestamp(t, dt.UTC).strftime("%d %b"), round(c, 2)] for t, c in zip(d["timestamp"], q) if c and dt.datetime.fromtimestamp(t, dt.UTC) >= dt.datetime(2026, 10, 30, tzinfo=dt.UTC)]
w = json.load(open(f"{E}/GSPC_2y_1wk.json"))["chart"]["result"][0]; wq = w["indicators"]["quote"][0]["close"]
wk = [[dt.datetime.fromtimestamp(t, dt.UTC).strftime("%Y-%m-%d"), round(c, 2)] for t, c in zip(w["timestamp"], wq) if c]
wk = [r for r in wk if "2025-03-01" <= r[0] <= "2025-05-10"]
print("const MS = " + json.dumps({"spx": daily("GSPC_3m.json"), "ndx": daily("NDX_3m.json"), "apr": wk}) + ";")
PY
cat "$R/tools/mjs/film.js" >> "$SRC"; bash "$R/tools/hd_build.sh" "$SRC" "$1" "$2"
