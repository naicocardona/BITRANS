#!/bin/bash
# Arma «Nasdaq tocó mercado bajista»: inyecta NQ (Nasdaq 100 real, Yahoo Finance: cierres diarios desde el 1 oct 2026 e intradía de 5 min del 25 nov) y llama a hd_build.sh.
set -e; R=$(cd "$(dirname "$0")/../.." && pwd); SRC="$2.src.js"; E="$R/entregas/titan/nasdaq_bajista/datos"
python3 -W ignore - "$E" > "$SRC" <<'PY'
import json, sys, datetime as dt
E = sys.argv[1]
d = json.load(open(f"{E}/NDX_3m.json"))["chart"]["result"][0]; q = d["indicators"]["quote"][0]
daily = [[dt.datetime.utcfromtimestamp(t).strftime("%d %b"), round(c, 2)] for t, c in zip(d["timestamp"], q["close"]) if c and dt.datetime.utcfromtimestamp(t) >= dt.datetime(2026, 10, 1)]
i = json.load(open(f"{E}/NDX_25nov_5m.json"))["chart"]["result"][0]; iq = i["indicators"]["quote"][0]
intra = [[dt.datetime.utcfromtimestamp(t).strftime("%H:%M"), round(c, 2)] for t, c in zip(i["timestamp"], iq["close"]) if c]
print("const NQ = " + json.dumps({"daily": daily, "intra": intra, "max": 31361.37, "low": 24970.66, "prev": 26214.17, "close": 26046.90}) + ";")
PY
cat "$R/tools/nqb/film.js" >> "$SRC"; bash "$R/tools/hd_build.sh" "$SRC" "$1" "$2"
