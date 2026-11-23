# Corrige tramos donde la alineación de Whisper se corre (p. ej. «termina endeudado» del Short de «te alcanza justo», 23 nov 2026).
# Uso: python3 retime_words.py <entrega> <taller_sub>  · lee RETIME = {"tk"|"sh": [(frase exacta, inicio_s, fin_s[, sección_que_abre]), ...]} de <entrega>/guiones.py
#   Tiempos tomados de los tramos de voz reales (energía + Whisper por tramo) del <modo>.wav ya con pausas.
#   Reparte cada frase en su tramo según el largo de cada palabra (en "words" y "display"); si se indica, la sección arranca en ese tramo.
import json, sys, os, importlib.util
E, sub = sys.argv[1], sys.argv[2]; W = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work") + "/" + sub
spec = importlib.util.spec_from_file_location("g", os.path.join(E, "guiones.py")); g = importlib.util.module_from_spec(spec); spec.loader.exec_module(g)
def place(lst, toks, a, b, start):
    n = len(toks)
    for i in range(start, len(lst) - n + 1):
        if [w[0] for w in lst[i:i + n]] == toks:
            L = [len(t) + 2 for t in toks]; tot = sum(L); t = a
            for k in range(n): d = (b - a) * L[k] / tot; lst[i + k][1], lst[i + k][2] = round(t, 3), round(t + d, 3); t += d
            return i + n
    raise SystemExit(f"RETIME: no encontré «{' '.join(toks)}»")
for m, items in getattr(g, "RETIME", {}).items():
    p = f"{W}/{m}.words.json"; d = json.load(open(p)); iw = idp = 0
    for it in items:
        ph, a, b = it[:3]; toks = ph.split(); iw = place(d["words"], toks, a, b, iw); idp = place(d["display"], toks, a, b, idp)
        if len(it) > 3:
            k = [s["id"] for s in d["secs"]].index(it[3]); d["secs"][k]["t0"] = round(a, 3)
            if k: d["secs"][k - 1]["t1"] = round(a, 3)
    json.dump(d, open(p, "w"), ensure_ascii=False); print("retime", m, len(items), "tramos")
