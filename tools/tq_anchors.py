import re
def norm(w): return re.sub(r"[^\wáéíóúñü%]", "", w.lower())
class Anchors:
    def __init__(s, W): s.W = W; s.N = [norm(w[0]) for w in W]; s.i = 0
    def __call__(s, phrase, seq=True):
        ks = [norm(x) for x in phrase.split()]
        for i in range(s.i if seq else 0, len(s.N) - len(ks) + 1):
            if s.N[i:i + len(ks)] == ks:
                if seq: s.i = i + 1
                return round(s.W[i][1], 3)
        raise SystemExit(f"ancla no encontrada: «{phrase}»")
def groups(W, mx):
    G, cur = [], []
    for k, w in enumerate(W):
        cur.append(w); nxt = W[k + 1] if k + 1 < len(W) else None
        if len(cur) >= mx or re.search(r"[.,:;?!]$", w[0]) or not nxt or nxt[1] - w[2] > 0.28:
            G.append(cur); cur = []
    out = []
    for k, g in enumerate(G):
        end = G[k + 1][0][1] if k + 1 < len(G) else g[-1][2] + 1.0
        out.append([round(g[0][1], 3), round(min(end, g[-1][2] + 0.6), 3), g])
    return out
KEYS = {"voto", "votos", "meta", "sin"}
def caps_html(G, fs):
    h = ""
    for i, (a, b, g) in enumerate(G):
        sp = ""
        for j, w in enumerate(g):
            t = w[0].strip("«»"); k = " k" if (re.search(r"\d", t) or norm(t) in KEYS) else ""
            sp += f'<span class="cw{k}" id="cw{i}_{j}" style="margin:0 6px">{t}</span>'
        h += f'<div class="cg" id="cg{i}" style="font-size:{fs}px">{sp}</div>'
    return h
