# TITÁN · largo «100 dólares al mes desde Colombia»: cálculo reproducible (ejemplo HIPOTÉTICO con datos reales).
# Compra de USD 100 al cierre de cada mes en SPY (fondo que replica el S&P 500), dividendos reinvertidos con retención del 30 %
# (EE. UU. retiene 30 % a no residentes; Colombia no tiene tratado con EE. UU.), sin comisiones ni impuestos en Colombia.
# Datos: Yahoo Finance (SPY mensual, cierres y dividendos) y TRM oficial (Superfinanciera, datos.gov.co 32sa-8pi3). Corte: oct. 2026.
# Uso: python3 tools/dca/calc.py entregas/titan/largo_100_dolares/datos
import json, sys, glob, datetime as dt
d = sys.argv[1]; Y = json.load(open(glob.glob(f"{d}/spy_*.json")[0]))["chart"]["result"][0]; T = json.load(open(glob.glob(f"{d}/trm_*.json")[0]))
mon = lambda t: dt.datetime.fromtimestamp(t, dt.UTC).strftime("%Y-%m")
rows, seen = [], set()
for t, c in zip(Y["timestamp"], Y["indicators"]["quote"][0]["close"]):
    if c and mon(t) not in seen and mon(t) <= "2026-10": seen.add(mon(t)); rows.append((mon(t), c))
idx = {m: i for i, (m, c) in enumerate(rows)}; dv = {}
for k, v in Y["events"]["dividends"].items(): dv[mon(int(k))] = dv.get(mon(int(k)), 0) + v["amount"]
tm = {}
for r in T: tm[r["vigenciadesde"][:7]] = float(r["valor"])
def dca(start, wh=.30, end="2026-10", wait=None):
    sh = usd = cop = cash = 0; worst = (None, 9)
    for i in range(idx[start], idx[end] + 1):
        m, c = rows[i]
        if dv.get(m) and sh: sh += sh * dv[m] * (1 - wh) / c
        usd += 100; cop += 100 * tm[m]
        if wait: cash += 100; (sh := sh + cash / c, cash := 0) if cash >= wait else None
        else: sh += 100 / c
        v = sh * c + cash
        if v / usd < worst[1]: worst = (m, v / usd, v, usd)
    v = sh * rows[idx[end]][1] + cash; return dict(usd=usd, valor=round(v), x=round(v / usd, 2), cop_inv=round(cop), cop_hoy=round(v * tm[end]), peor=worst)
out = {}
for y, st in [(10, "2016-11"), (20, "2006-11"), (30, "1996-11")]:
    out[y] = dict(con_ret30=dca(st), sin_ret=dca(st, 0), sin_div=dca(st, 1), esperar5000=dca(st, wait=5000))
out["trm"] = {m: tm[m] for m in ("1996-11", "2006-11", "2016-11", "2026-10")}
print(json.dumps(out, indent=1, default=str)); json.dump(out, open(f"{d}/resultados.json", "w"), indent=1, default=str)
# Series mes a mes para las gráficas del video (invertido, valor con retención 30 %, valor «esperar 5.000») y TRM mensual
def serie(start, wh=.30, end="2026-10", wait=None):
    sh = cash = usd = 0; S = []
    for i in range(idx[start], idx[end] + 1):
        m, c = rows[i]
        if dv.get(m) and sh: sh += sh * dv[m] * (1 - wh) / c
        usd += 100
        if wait: cash += 100; (sh := sh + cash / c, cash := 0) if cash >= wait else None
        else: sh += 100 / c
        S.append([m, usd, round(sh * c + cash, 1)])
    return S
SER = {str(y): serie(st) for y, st in [(10, "2016-11"), (20, "2006-11"), (30, "1996-11")]}
SER["esperar20"] = serie("2006-11", wait=5000); SER["sinret20"] = serie("2006-11", wh=0); SER["sindiv20"] = serie("2006-11", wh=1)
SER["trm"] = [[m, tm[m]] for m, _ in rows if m >= "1996-11" and m in tm]
json.dump(SER, open(f"{d}/series.json", "w"))
