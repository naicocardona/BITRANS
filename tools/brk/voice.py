# Berkshire recompras · voz final (Juan, ElevenLabs) → palabras con tiempo (alineación ASR) y texto en pantalla con cifras
import sys, os, json, re, numpy as np, soundfile as sf
T = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); sys.path.insert(0, T)
import align_asr
W = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work") + "/brk"
SH = "Tu parte de una empresa puede crecer sin que compres otra acción. Y aun así, podrías salir perdiendo. Berkshire gastó unos nueve mil seiscientos millones de dólares recomprando sus propias acciones en un trimestre. ¿Qué cambia para quien se queda? Imagina diez fichas y una es tuya. Si la empresa compra dos a otros accionistas y las retira, tú sigues con una, pero ahora es una de ocho. Tu porcentaje creció. Mira también la caja: para comprar esas fichas, salió dinero. Si la empresa pagó demasiado, una porción más grande no significa que tu inversión valga más. Antes de celebrar una recompra, pregunta cuánto pagó la empresa y qué otra cosa podía hacer con ese dinero."
TK = "Tu parte de una empresa puede crecer sin que compres otra acción. Y aun así, podrías salir perdiendo. Berkshire gastó unos nueve mil seiscientos millones de dólares recomprando sus propias acciones en un trimestre. ¿Qué cambia para quien se queda? Imagina diez fichas y una es tuya. Si la empresa compra dos a otros accionistas y las retira, tú sigues con una ficha. Pero ahora tienes una de ocho: pasas del diez al doce coma cinco por ciento. Suena bien, ¿cierto? Mira lo que pasó al mismo tiempo: salió dinero de la caja. Imagina dos empresas que retiran exactamente el mismo número de acciones. Una paga un precio razonable. La otra paga de más. En ambas crece el porcentaje de quienes se quedaron, pero la segunda entregó más dinero para conseguir lo mismo. Ese dinero también podía servir para mejorar el negocio, pagar deuda o aprovechar otra oportunidad. Por eso el tamaño del anuncio no te dice si fue una buena decisión. Antes de celebrar una recompra, pregunta cuánto pagó la empresa y qué otra cosa podía hacer con ese dinero."
MAP = [("nueve mil seiscientos millones", "9.600 millones"), ("doce coma cinco por ciento", "12,5 %"), ("diez fichas", "10 fichas"), ("una de ocho", "1 de 8"),
       ("del diez", "del 10 %"), ("compra dos", "compra 2")]
def norm(w): return re.sub(r"[^\wáéíóúñü]", "", w.lower())
def display(words):
    out, i = [], 0
    while i < len(words):
        for k, v in MAP:
            ks = k.split()
            if [norm(w[0]) for w in words[i:i + len(ks)]] == ks:
                tail = re.sub(r"^.*?([.,:;?!]*)$", r"\1", words[i + len(ks) - 1][0]); out.append([v + tail, words[i][1], words[i + len(ks) - 1][2]]); i += len(ks); break
        else: out.append(list(words[i])); i += 1
    return out
for name, text in [("shorts", SH), ("tiktok", TK)]:
    x, sr = sf.read(f"{W}/voz/{name}.wav", dtype="float32"); tail = 1.2
    y = np.concatenate([x, np.zeros(int(tail * sr), np.float32)]); sf.write(f"{W}/{name}.wav", y, sr)
    ws = align_asr.align(x, sr, text)
    json.dump({"dur": round(len(y) / sr, 3), "words": ws, "display": display(ws)}, open(f"{W}/{name}.words.json", "w"), ensure_ascii=False)
    print(name, round(len(y) / sr, 2), len(ws), "palabras")
