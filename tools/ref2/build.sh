#!/bin/bash
# Arma la reflexión «escenas de cerca»: build.sh <words.json> <carpeta_salida>
set -e; R=$(cd "$(dirname "$0")/../.." && pwd); T=$(mktemp -d)
cat "$R/tools/ref2/paint.js" "$R/tools/ref2/film.js" > $T/film.js; bash "$R/tools/hd_build.sh" $T/film.js "$1" "$2"; rm -rf $T
