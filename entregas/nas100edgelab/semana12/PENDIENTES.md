# NAS100 · Semana #12 · estado (7 nov 2026, antes del cierre de sesión)

**Hecho:**
- Datos verificados contra los comprobantes:
  - #026: SELL, 28066,65 → 27965,95, +100,70 pts, 2 h 00 min 27 s.
  - #027: BUY, 28160,40 → 28260,40, +100 pts, 36 min 45 s.
  - Balance: 2 TP, +200,70 pts.
- Voz A del Explorador (Kokoro em_alex, 0,92) generada y revisada con ASR, sin errores. Narraciones en `voz/`.
- Para que el TikTok entre en 75 s sin acelerar la voz, la frase «El gráfico muestra el descenso hacia el objetivo» va solo como texto en pantalla.
- Armador: `tools/build_s12.py`, `tools/s12.js`, `tools/nas_common.py`, `tools/mix_s12.py`, `tools/s12/` (guion y ensamblado). El kit del Explorador está en `tools/kit/nas/`.
- Duraciones: TikTok 74,7 s (−16 LUFS) y Shorts 41,1 s (−14 LUFS).
- Revisión del TikTok:
  - Quitado el destello blanco del primer cuadro.
  - Contadores reemplazados por la cifra final, para no mostrar cifras intermedias.
  - Etiquetas de score movidas fuera del gráfico.
  - Dinero y lotes tapados en los comprobantes desde el primer cuadro.

**Siguiente (al retomar):**
1. `bash tools/restaurar.sh`. Si el taller se borró, regenerar con:
   - `cd /home/user/bitrans_work/s12 && python3 assemble.py` (con las voces de `tools/s12/script.py` y `tools/tts_local_any.py`);
   - extraer las capturas de los zip del #026 y del #027 a `s12/img/t026` y `s12/img/t027`.
2. `python3 tools/build_s12.py && python3 tools/mix_s12.py`, revisar el Shorts con snapshots y renderizar los dos.
3. QC: `qa_video.py` y revisión de transiciones con ffmpeg.
4. Portada «UNA VENTA. UNA COMPRA.» / «+200,70 PUNTOS» / «SEMANA #12», con los dos gráficos reales y el Explorador.
5. Guion final, proyecto editable (zip en partes de menos de 30 MB), commit y entrega.
