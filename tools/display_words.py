# Convierte palabras habladas alineadas en texto de pantalla (cifras): une la secuencia y conserva el tiempo.
import sys, json, re
MAP = [("diecisiete por ciento", "17 %"), ("ciento cuarenta millones", "140 millones"), ("tres punto cero", "3.0"), ("setenta y uno por ciento", "71 %"), ("veintinueve por ciento", "29 %"), ("dos mil veintiséis", "2026"), ("dos mil veintisiete", "2027"),
       ("ciento cuarenta", "140"), ("diez por ciento", "10 %"), ("uno por ciento", "1 %"), ("diecinueve", "19"), ("veintiséis", "26"), ("cincuenta", "50"),
       ("cuarenta", "40"), ("cien", "100"), ("diez", "10"), ("cero", "0")]
def norm(w): return re.sub(r"[^\wáéíóúñü]", "", w.lower())
for path in sys.argv[1:]:
    d = json.load(open(path)); W = d["words"]; out = []; i = 0
    while i < len(W):
        hit = None
        for k, v in MAP:
            ks = k.split()
            if [norm(w[0]) for w in W[i:i + len(ks)]] == ks:
                last = W[i + len(ks) - 1][0]; tail = re.sub(r"^[\wáéíóúñü]+", "", last, flags=re.I)
                lead = re.sub(r"[\wáéíóúñü].*$", "", W[i][0], flags=re.I)
                hit = ([lead + v + tail, W[i][1], W[i + len(ks) - 1][2]], len(ks)); break
        if hit: out.append(hit[0]); i += hit[1]
        else: out.append(W[i]); i += 1
    d["display"] = out; json.dump(d, open(path, "w"), ensure_ascii=False); print(path.split("/")[-1], len(W), "→", len(out))
