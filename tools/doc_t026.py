import json, sys
S = "/tmp/claude-0/-home-user-BITRANS/e6df0451-e894-56da-93e1-0311b18c22a2/scratchpad"
sys.path.insert(0, f"{S}/t026"); from script import TK, SH
D = {v: json.load(open(f"{S}/t026-{v}/tiempos.json")) for v in ["tiktok", "shorts"]}
fmt = lambda x: f"{x:.1f}".replace(".", ",")
def tabla(v, L):
    c = {i: cap.replace("|", " ") for i, _, cap in L}
    return "| Tiempo | Narración |\n|---|---|\n" + "".join(f"| {fmt(s)} – {fmt(s+d)} s | {c[n]} |\n" for n, s, d in D[v]["frases"])
doc = f"""# NAS100 EDGE LAB · TRADE #026 · Publicación

Tipo: **RESULTADO** · SELL · lunes 2 nov 2026 · 11 PM Colombia · Take Profit.

| Versión | Video | Portada |
|---|---|---|
| TikTok ({fmt(D['tiktok']['duracion'])} s) | `NAS100_EDGE_LAB_RESULTADO_TRADE026_TIKTOK.mp4` | `NAS100_EDGE_LAB_RESULTADO_TRADE026_TIKTOK_PORTADA.jpg` |
| YouTube Shorts ({fmt(D['shorts']['duracion'])} s) | `NAS100_EDGE_LAB_RESULTADO_TRADE026_SHORTS.mp4` | `NAS100_EDGE_LAB_RESULTADO_TRADE026_SHORTS_PORTADA.jpg` |

## Datos verificados

| Dato | Valor | Fuente |
|---|---|---|
| Trade · dirección | #026 · SELL | Encargo |
| Sesión | 2 NOV 2026 · 11 PM COLOMBIA | Encargo (el comprobante usa el reloj del bróker: 03/11/2026 06:00:00 → 08:00:27) |
| Entrada → salida | **28.066,65 → 27.965,95** | Comprobante del bróker |
| Recorrido ejecutado | **+100,70 puntos** (Take Profit) | Comprobante del bróker |
| Take Profit configurado | 27.966,65 (100 puntos desde la entrada) | Comprobante del bróker |
| S/L | «–» en el comprobante: no se afirma ni se dibuja un stop | Comprobante del bróker |
| Duración | **2 h 00 min 27 s** | Comprobante del bróker |
| Ticket | 226756934 | Comprobante del bróker |
| Lectura al entrar | Score 8/10 (mínimo 6) · Bear +5 / Bull −2 · precio bajo EMA 21 y EMA 200 · FAVORABLE SELL · Quality 78/100 (puntuación, no probabilidad) | Registro de entrada |
| Recorrido de la sesión | 139 pts a favor · 19 en contra · **incluye movimiento posterior a la salida** | TradingView (seguimiento) |

- **Dinero y lotes tapados** según nuestras reglas: sobre el resultado en dinero va «RESULTADO EN PUNTOS · +100,70 pts» y sobre los lotes, «TAKE PROFIT · 100 pts» (no hay S/L en el comprobante). No se menciona la moneda.
- El gráfico de TradingView se muestra intacto. Solo se animan el encuadre y resaltados sobre la línea de entrada, la línea punteada y la zona objetivo que ya están en la captura. Nota en pantalla: «Gráfico: TradingView · Ejecución: bróker».
- Los +100 pts / +1R del registro no se usan: manda la ejecución real (+100,70).

## Guion final (voz A · Mentor)

### TikTok
{tabla('tiktok', TK)}
En pantalla al final: «TRADE #026 · TP» · «No buscamos operaciones perfectas. Buscamos ventaja estadística.» · logo · «Sigue la bitácora para ver el siguiente trade.» · disclaimer.

### YouTube Shorts
{tabla('shorts', SH)}
En pantalla al final: «Esto es NAS100 EDGE LAB, un laboratorio de TITÁN HOLDING.» · disclaimer.

## Texto de publicación

### TikTok

> Una venta, un Take Profit. Pero lo importante es qué sabíamos antes de entrar.
>
> Trade #026 · SELL · lunes 2 nov, 11 PM Colombia. Score 8/10 (mínimo 6), radar más bajista que alcista, precio bajo la EMA 21 y la EMA 200. Ejecución real en el bróker: 28.066,65 → 27.965,95 = +100,70 puntos en 2 h 00 min 27 s.
>
> El recorrido de la sesión (139 a favor, 19 en contra) incluye movimiento posterior a la salida: es información para investigar, no beneficio capturado.
>
> Sigue la bitácora para ver el siguiente trade.
>
> Contenido educativo · No es asesoría financiera · Operar implica riesgo de pérdida.

Hashtags: #NAS100 #Trading #BitacoraDeTrading

### YouTube Shorts

**Título:** Vendimos NAS100: ¿qué veíamos antes de entrar? | Trade #026

> Trade #026 · SELL en NAS100 · Take Profit: +100,70 puntos. Tres aprendizajes: documentar al entrar, separar operación y sesión, y verificar la ejecución con el comprobante.
>
> Sigue la bitácora de NAS100 EDGE LAB, un laboratorio de TITÁN HOLDING.
>
> Contenido educativo · No es asesoría financiera · Operar implica riesgo de pérdida.

Hashtags: #NAS100 #Trading #Shorts

Lista de reproducción: «NAS100 EDGE LAB · Trades». Video relacionado: Trade #025.

## Novedad visual

Laboratorio ilustrado de fondo (tubos de neón, consola con radar y luces, piso con escaneo) y transiciones con intención: barrido de escaneo, zoom al monitor, giro del comprobante y deslizamientos en las conclusiones. El Explorador original de la biblioteca V3, con los ojos que brillan con la voz.

## QC

- [x] #026 · 2 NOV 2026 · 11 PM Colombia · SELL.
- [x] Entrada 28.066,65 · salida 27.965,95 · +100,70 puntos · 2 h 00 min 27 s (comprobante).
- [x] Contexto del desarrollo (descenso hacia la zona del objetivo) y tres conclusiones con su escena.
- [x] Recorrido de la sesión rotulado «RECORRIDO DE LA SESIÓN · TRADINGVIEW» + «Incluye movimiento posterior a la salida»; nunca sumado al resultado.
- [x] Capturas originales sin alterar; sin stop dibujado; sin velas inventadas.
- [x] Dinero y lotes tapados con etiquetas de diseño; sin moneda; sin dinero en la portada.
- [x] Voz verificada frase por frase con transcripción local (Whisper).
- [x] Música original distinta en cada versión; TikTok −16 LUFS, Shorts −14 LUFS.
- [x] Disclaimer presente. Explorador abajo a la izquierda sin tapar datos ni subtítulos.
"""
open("/home/user/BITRANS/entregas/nas100edgelab/NAS100_EDGE_LAB_RESULTADO_TRADE026_PUBLICACION.md", "w").write(doc); print("ok")
