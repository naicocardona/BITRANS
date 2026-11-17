#!/bin/bash
# Entrega completa del kit híbrido TITÁN, de las voces de Juan al MP4 final (TikTok + Short), en un solo paso.
# Uso: hd_entrega.sh <carpeta_entrega> <sub_taller> <film.js | build.sh> <prefijo_música> <NOMBRE>
#   requiere <carpeta_entrega>/voz/{tiktok,shorts}_juan.mp3 y guiones.py; música: variantes <prefijo>tk y <prefijo>sh de bed_music.py.
#   Deja en <carpeta_entrega>: TITAN_<NOMBRE>_TikTok.mp4/.srt, TITAN_<NOMBRE>_Shorts.mp4/.srt y TITAN_<NOMBRE>_Portada.jpg (portada del TikTok).
set -e; export PYTHONDONTWRITEBYTECODE=1
R=$(cd "$(dirname "$0")/.." && pwd); E=$(cd "$1" && pwd); WK=${BITRANS_WORK:-/home/user/bitrans_work}; W=$WK/$2; FILM=$R/$3; MV=$4; N=$5; mkdir -p $W
for n in tiktok shorts; do ffmpeg -v error -y -i $E/voz/${n}_juan.mp3 -ac 1 -ar 44100 $W/$n.wav; python3 $R/tools/tighten.py $W/$n.wav $W/${n}_t.wav 0.32; done
BITRANS_WORK=$WK python3 $R/tools/hd_voice.py $E $2
python3 -c "import json,sys
for m in ('tk','sh'):
  w=json.load(open('$W/'+m+'.words.json'))['words']; assert w[0][1] < .3, f'{m}: la primera palabra arranca en {w[0][1]} s (alineación corrida)'" 
for m in tk sh; do
  echo "== sync $m"; python3 $R/tools/sync_check.py $W/$m.wav $W/$m.words.json 2>/dev/null | tail -3
  if [[ $FILM == *.sh ]]; then bash $FILM $W/$m.words.json $W/film_$m; else bash $R/tools/hd_build.sh $FILM $W/$m.words.json $W/film_$m; fi
  node $R/tools/hd_render.cjs $W/film_$m/film.html $W/vid_$m.mp4 | tail -1
  NM=$([ $m = tk ] && echo TikTok || echo Shorts)
  (cd $W && python3 $R/tools/hd_mix.py $W/$m.wav $W/$m.words.json $W/vid_$m.mp4 $MV$m $W/TITAN_${N}_$NM.mp4 | tail -2)
  cp $W/TITAN_${N}_$NM.mp4 $W/TITAN_${N}_$NM.srt $E/
  echo "== QA $m"; python3 $R/tools/qa_video.py $E/TITAN_${N}_$NM.mp4 | tail -6
done
node $R/tools/hd_render.cjs $W/film_tk/film.html $W/cover.png --cover | tail -1
ffmpeg -v error -y -i $W/cover.png -q:v 2 $E/TITAN_${N}_Portada.jpg; ls -la $E/TITAN_${N}_*
