# TITÁN · «¿Una sola acción o diversificado?» · cálculo reproducible (ejemplo HIPOTÉTICO con precios reales).
# USD 1.000 al cierre de dic. 1999 (= 1 ene. 2000) en cada una de las 10 más grandes del S&P 500 al 1 ene. 2000 (24/7 Wall St., jun. 2024)
# y en SPY (fondo que replica el S&P 500). Rendimiento total con dividendos reinvertidos (cierre ajustado de Yahoo Finance), sin comisiones,
# retenciones ni impuestos. Escisiones de GE (GE HealthCare 2023, GE Vernova 2024) las ajusta Yahoo como factor de división. Corte: oct. 2026.
# Uso: python3 tools/acc/calc.py entregas/titan/una_accion_vs_diversificado/datos
import json, sys, datetime as dt
d = sys.argv[1]; m = lambda t: dt.datetime.fromtimestamp(t, dt.UTC).strftime("%Y-%m"); out = {}
TOP = [("MSFT", "Microsoft"), ("GE", "General Electric"), ("CSCO", "Cisco"), ("WMT", "Walmart"), ("XOM", "Exxon Mobil"), ("INTC", "Intel"), ("C", "Citigroup"), ("IBM", "IBM"), ("ORCL", "Oracle"), ("HD", "Home Depot"), ("SPY", "S&P 500 (SPY)")]
for s, n in TOP:
    r = json.load(open(f"{d}/{s}_yahoo_mensual.json"))["chart"]["result"][0]
    a = {m(t): v for t, v in zip(r["timestamp"], r["indicators"]["adjclose"][0]["adjclose"]) if v}
    k = sorted(x for x in a if "1999-12" <= x <= "2026-10"); b = a["1999-12"]; mn = min((a[x] / b, x) for x in k)
    out[s] = dict(nombre=n, valor=round(1000 * a["2026-10"] / b), x=round(a["2026-10"] / b, 2), peor=round(1000 * mn[0]), peor_mes=mn[1], caida_max_pct=round(100 * (1 - mn[0]), 1))
eq = sum(out[s]["valor"] for s, _ in TOP[:10]); out["canasta_10"] = dict(puesto=10000, valor=eq)
out["le_ganan_al_indice"] = [s for s, _ in TOP[:10] if out[s]["valor"] > out["SPY"]["valor"]]
json.dump(out, open(f"{d}/resultados.json", "w"), ensure_ascii=False, indent=1); print(json.dumps(out, ensure_ascii=False, indent=1))
