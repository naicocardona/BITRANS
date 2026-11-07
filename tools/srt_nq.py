# Subtítulos .srt sincronizados con la locución definitiva (palabras en cifras), frases de hasta ~8 palabras
import json, re, os, sys
W = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work") + "/nq"; OUT = sys.argv[1]
NAMES = {"lg": "TITAN_NQ_YouTube", "sh1": "TITAN_NQ_Shorts_1_Broker", "tk1": "TITAN_NQ_TikTok_1_Broker", "sh2": "TITAN_NQ_Shorts_2_Nasdaq", "tk2": "TITAN_NQ_TikTok_2_Nasdaq"}
ts = lambda t: f"{int(t//3600):02d}:{int(t%3600//60):02d}:{int(t%60):02d},{int(round((t-int(t))*1000))%1000:03d}"
for m, name in NAMES.items():
    Wd = json.load(open(f"{W}/{m}.words.json"))["display"]; G, cur = [], []
    for k, w in enumerate(Wd):
        cur.append(w); nxt = Wd[k + 1] if k + 1 < len(Wd) else None
        if len(cur) >= 8 or re.search(r"[.?!:;]$", w[0]) or (re.search(r",$", w[0]) and len(cur) >= 4) or not nxt or nxt[1] - w[2] > 0.6: G.append(cur); cur = []
    s = ""
    for i, g in enumerate(G):
        end = min(g[-1][2] + 0.25, G[i + 1][0][1] - 0.02) if i + 1 < len(G) else g[-1][2] + 0.6
        s += f"{i+1}\n{ts(g[0][1])} --> {ts(end)}\n{' '.join(x[0] for x in g)}\n\n"
    open(f"{OUT}/{name}.srt", "w").write(s); print(name, len(G), "bloques")
