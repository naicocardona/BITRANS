# NU · Pendientes (4 nov 2026, antes del reinicio de la sesión)

## Hecho
- TikTok y Shorts en estilo ilustrado entregados (`TITAN_NU_TikTok.mp4`, `TITAN_NU_Shorts.mp4`).
- Video largo: el código está listo pero falta exportarlo:
  - `tools/build_flat_lg.py` arma la composición;
  - `tools/flat_lg.js` tiene la línea de tiempo;
  - `tools/flat_scenes_lg.py` tiene las escenas nuevas (Nubank frente a Nu Holdings, mapa de LatAm, tres vías, empresas A y B).

## Corregido en el código, falta volver a exportar
Lady pidió (4 nov):
- **El banco y el trabajo se veían muy lejos.** Ahora la cámara se acerca a 1,3–1,35 y la protagonista es más grande (1,15).
- **Textos y objetos encima de las caras.** Cambios:
  - las etiquetas «+ Préstamo», «+ Sueldo» y «✓ Pagó» suben por encima de las cabezas;
  - en el escritorio, la persona queda a la izquierda y las preguntas en columna a la derecha;
  - en la encrucijada, los letreros van a la derecha y la persona a la izquierda;
  - en el cierre TITÁN, la carpeta sube, el logo va a la derecha y el paraguas queda sobre la cabeza;
  - en la sala, los periódicos suben.
- Los cambios ya están en `tools/flat_scenes.py`, `flat_nu2.js`, `flat_sh2_tail.js`, `flat_lg.js` y `build_flat_nu.py`.

## Siguiente
1. Exportar de nuevo el TikTok y el Shorts: `python3 tools/build_flat_nu.py full`, después `python3 tools/build_flat_nu.py shorts`, y luego exportar con hyperframes. Revisar cuadro por cuadro que ninguna etiqueta tape una cara.
2. Armar el largo con `python3 tools/build_flat_lg.py`, revisarlo, exportarlo (unos 60 min), normalizarlo a −14 LUFS y entregarlo con miniatura, SRT y descripción.
