#!/bin/bash
# Arma el film de la reflexión: build.sh <words.json> <carpeta_salida>
R=$(cd "$(dirname "$0")/../.." && pwd); bash "$R/tools/hd_build.sh" "$R/tools/ref/film.js" "$1" "$2"
