# Arma el audio de voz de cada video del paquete Nasdaq (une secciones, añade pausas de lectura) y sus palabras con tiempo.
# Uso: python3 tools/nq_voice.py   → /home/user/bitrans_work/nq/<modo>.wav y <modo>.words.json (con "display" en cifras)
import os, sys, re, json, subprocess, numpy as np, soundfile as sf
R = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, R); sys.path.insert(0, f"{R}/../entregas/titan/nasdaq_paquete")
from guiones_voz import LARGO, SH1, TK1, SH2, TK2
W = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work") + "/nq"; V = f"{R}/../entregas/titan/nasdaq_paquete/voz"
SR = 44100
def load(name):
    p = f"{W}/voz/{name}_raw.wav"
    if not os.path.exists(p): subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", f"{V}/{name}.mp3", "-ar", str(SR), "-ac", "1", p], check=True)
    x, _ = sf.read(p, dtype="float32"); nz = np.where(np.abs(x) > 0.003)[0]
    return x[max(0, nz[0] - 2000):nz[-1] + 3000]
def align(x, text, tag):
    import align_asr; return align_asr.align(x, SR, text)   # alineación precisa por ASR (desde el 7 nov 2026)
def align_old(x, text, tag):
    sf.write(f"{W}/{tag}_tmp.wav", x, SR); open(f"{W}/{tag}_tmp.txt", "w").write(text)
    subprocess.run(["python3", "-I", f"{R}/align_words.py", f"{W}/{tag}_tmp.wav", f"{W}/{tag}_tmp.txt", f"{W}/{tag}_tmp.json"], check=True, capture_output=True)
    return json.load(open(f"{W}/{tag}_tmp.json"))["words"]
def norm(w): return re.sub(r"[^\wáéíóúñü]", "", w.lower())
def add_pauses(x, words, pauses):
    """pauses: [(frase que termina, segundos)] → inserta silencio a mitad del hueco tras la frase"""
    cuts = []
    for ph, d in pauses:
        ks = [norm(k) for k in ph.split()]; N = [norm(w[0]) for w in words]
        for i in range(len(N) - len(ks) + 1):
            if N[i:i + len(ks)] == ks:
                j = i + len(ks) - 1; nxt = words[j + 1][1] if j + 1 < len(words) else words[j][2] + 0.2
                cuts.append(((words[j][2] + nxt) / 2, d)); break
        else: raise SystemExit(f"pausa: frase no encontrada «{ph}»")
    cuts.sort(); out, last = [], 0
    for t, d in cuts:
        i = int(t * SR); out += [x[last:i], np.zeros(int(d * SR), np.float32)]; last = i
    # cada palabra se corre la suma de las pausas insertadas ANTES de su tiempo original (sin doble conteo)
    sh = lambda t0: sum(d for t, d in cuts if t <= t0)
    W2 = [[w[0], w[1] + sh(w[1]), w[2] + sh(w[1])] for w in words]
    out.append(x[last:]); return np.concatenate(out), W2
# ---- texto en pantalla: voz → cifras y nombres ----
MAP = [("mil ciento cuarenta y cuatro dólares con noventa centavos", "1.144,90 dólares"), ("mil ciento cuarenta y cuatro con noventa", "1.144,90"),
       ("tres mil ochocientos setenta", "3.870"), ("ese ene pe quinientos", "S&P 500"), ("dos mil dieciséis", "2016"), ("dos mil veinticinco", "2025"),
       ("dos mil veintidós", "2022"), ("dos mil veintitrés", "2023"), ("noventa y seis", "96"), ("Bróker Chek", "BrokerCheck"),
       ("Nasdaq cien", "Nasdaq-100"), ("mil setenta", "1.070"), ("mil dólares", "1.000 dólares"), ("por ciento", "%"), ("Brókers", "Brokers"),
       ("diecinueve", "19"), ("veinticuatro", "24"), ("veinticinco", "25"), ("catorce", "14"), ("trece", "13"), ("veinte", "20"), ("siete", "7"),
       ("seis", "6"), ("cinco", "5"), ("diez", "10"), ("ochenta", "80"), ("cien", "100"), ("Finra", "FINRA"), ("Sipc", "SIPC"), ("un dólar", "1 dólar")]
def display(words):
    out, i = [], 0
    while i < len(words):
        hit = None
        for k, v in MAP:
            ks = k.split()
            if [norm(w[0]) for w in words[i:i + len(ks)]] == [norm(z) for z in ks]:
                last = words[i + len(ks) - 1][0]; tail = re.sub(r"^.*?([.,:;?!»]*)$", r"\1", last)
                lead = re.sub(r"[\wáéíóúñü].*$", "", words[i][0], flags=re.I)
                txt = v if k != "por ciento" else "%"
                if k == "por ciento" and out: out[-1] = [out[-1][0] + " %" + tail, out[-1][1], words[i + 1][2]]; i += 2; hit = 1; break
                hit = [lead + txt + tail, words[i][1], words[i + len(ks) - 1][2]]; i += len(ks); break
        if hit is None: out.append(list(words[i])); i += 1
        elif hit != 1: out.append(hit)
    return out
def build(tag, parts, tail=1.2):
    xs, ws, t = [], [], 0.0
    for name, text, gap, pauses in parts:
        x = load(name); w = align(x, text, tag); x, w = add_pauses(x, w, pauses)
        xs += [x, np.zeros(int(gap * SR), np.float32)]; ws += [[a, b + t, c + t] for a, b, c in w]; t += len(x) / SR + gap
    xs.append(np.zeros(int(tail * SR), np.float32)); y = np.concatenate(xs); sf.write(f"{W}/{tag}.wav", y, SR)
    json.dump({"dur": round(len(y) / SR, 3), "words": ws, "display": display(ws)}, open(f"{W}/{tag}.words.json", "w"), ensure_ascii=False)
    print(tag, round(len(y) / SR, 2), "s", len(ws), "palabras")
if __name__ == "__main__":
    os.makedirs(f"{W}/voz", exist_ok=True); L = dict(LARGO)
    build("lg", [("L_gancho", L["gancho"], 1.0, []),
                 ("L_nasdaq", L["nasdaq"], 1.2, [("casi catorce por ciento abajo.", 1.0)]),
                 ("L_historia", L["historia"], 1.2, [("llegas a noventa y seis.", 1.0)]),
                 ("L_compuesto", L["compuesto"], 1.2, [("tres mil ochocientos setenta dólares.", 1.5)]),
                 ("L_colombia", L["colombia"], 0, [("antes de que se mueva el precio.", 1.5), ("Abro la ficha,", 2.0), ("el nombre y el símbolo,", 2.0),
                   ("confirmo el tipo de producto", 2.0), ("cuánto quiero comprar.", 2.0), ("reviso el costo estimado", 2.0), ("dinero propio o prestado.", 2.0), ("Ahí paro.", 2.0)])], tail=3.0)
    build("sh1", [("sh1", SH1, 0, [])])
    build("tk1", [("tk1", TK1, 0, [("cinco por ciento de la orden.", 1.0), ("comparar el costo completo.", 0.6), ("si aparece dinero prestado.", 1.0)])])
    build("sh2", [("sh2", SH2, 0, [])])
    build("tk2", [("tk2", TK2, 0, [("te lleva a noventa y seis.", 0.6)])])
