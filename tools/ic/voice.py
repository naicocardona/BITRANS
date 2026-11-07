# Piloto interés compuesto: une las secciones de voz Kokoro (Explorador), aplica la cadena de voz A, alinea por ASR y genera palabras con cifras.
# Uso: python3 tools/ic/voice.py  → $BITRANS_WORK/ic/voz.wav y words.json
import os, sys, re, json, subprocess, numpy as np, soundfile as sf
R = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, f"{R}/.."); sys.path.insert(0, f"{R}/../../entregas/titan/interes_compuesto_piloto")
import align_asr; from guion import SECS
W = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work") + "/ic"
GAP = {"s02": .55, "s03": .7, "s05": .5, "s06": .8, "s08": .8, "s09": .9, "s10": .5, "s11": .8, "s12": .8, "s13": .9}
CHAIN = "asetrate=24000*0.917,aresample=48000,atempo=1.0905,highpass=f=70,equalizer=f=220:t=q:w=1:g=2,equalizer=f=3000:t=q:w=1.2:g=2.5,deesser=i=0.3,acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=2,aecho=0.85:0.6:35|60:0.18|0.10"
MAP = [("un millón de dólares", "US$1.000.000"), ("ochocientos noventa y ocho mil", "898.000"), ("ciento dos mil dólares", "US$102.000"), ("quinientos veinte mil", "520.000"),
       ("treinta y cuatro mil dólares", "US$34.000"), ("cuarenta y seis mil seiscientos", "46.600"), ("veintiún mil seiscientos", "21.600"), ("dos mil ochocientos noventa", "2.890"),
       ("dos mil novecientos", "2.900"), ("ochocientos sesenta y cuatro", "864"), ("diez mil ochocientos", "10.800"), ("diez mil dólares", "US$10.000"), ("diez mil", "10.000"),
       ("ochocientos dólares", "US$800"), ("ciento noventa dólares", "US$190"), ("ciento noventa", "190"), ("doscientos ochenta y seis", "286"), ("cuatrocientos treinta y seis", "436"),
       ("mil cincuenta", "1.050"), ("cien mil", "100.000"), ("sesenta y cinco", "65"), ("ocho por ciento", "8 %"), ("veinticinco", "25"), ("cincuenta", "50"),
       ("cuarenta", "40"), ("treinta", "30"), ("veinte", "20"), ("diez", "10")]
def norm(w): return re.sub(r"[^\wáéíóúñü]", "", w.lower())
def display(words):
    out, i = [], 0
    while i < len(words):
        for k, v in MAP:
            ks = k.split()
            if [norm(w[0]) for w in words[i:i + len(ks)]] == [norm(z) for z in ks]:
                last = words[i + len(ks) - 1][0]; tail = re.sub(r"^.*?([.,:;?!»]*)$", r"\1", last); lead = re.sub(r"[\wáéíóúñü].*$", "", words[i][0], flags=re.I)
                out.append([lead + v + tail, words[i][1], words[i + len(ks) - 1][2]]); i += len(ks); break
        else: out.append(list(words[i])); i += 1
    return out
xs, ws, secs, t, SR = [np.zeros(int(.25 * 24000), np.float32)], [], [], .25, 24000
for sid, text in SECS:
    x, sr = sf.read(f"{W}/tts/{sid}.wav", dtype="float32"); assert sr == SR
    nz = np.where(np.abs(x) > 0.004)[0]; x = x[max(0, nz[0] - 240):nz[-1] + 480]
    g = GAP.get(sid, .45) if secs else 0; xs.append(np.zeros(int(g * SR), np.float32)); t += g
    w = align_asr.align(x, SR, text); ws += [[a, round(b + t, 3), round(c + t, 3)] for a, b, c in w]
    secs.append({"id": sid, "t0": round(t, 3), "t1": round(t + len(x) / SR, 3)}); xs.append(x); t += len(x) / SR
xs.append(np.zeros(int(3.2 * SR), np.float32)); y = np.concatenate(xs); sf.write(f"{W}/voz_raw.wav", y, SR)
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{W}/voz_raw.wav", "-af", CHAIN, f"{W}/voz.wav"], check=True)
dur = round(len(y) / SR, 3)
json.dump({"dur": dur, "secs": secs, "words": ws, "display": display(ws)}, open(f"{W}/words.json", "w"), ensure_ascii=False)
print("voz", dur, "s ·", len(ws), "palabras ·", len(secs), "secciones")
