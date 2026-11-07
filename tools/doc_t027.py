import json, sys
S = __import__("os").environ.get("BITRANS_WORK", "/home/user/bitrans_work")
sys.path.insert(0, f"{S}/t027"); from script import TK, SH
D = {v: json.load(open(f"{S}/t027-{v}/tiempos.json")) for v in ["tiktok", "shorts"]}
fmt = lambda x: f"{x:.1f}".replace(".", ",")
def tabla(v, L):
    c = {i: cap.replace("|", " ") for i, _, cap in L}
    return "| Tiempo | Narración |\n|---|---|\n" + "".join(f"| {fmt(s)} – {fmt(s+d)} s | {c[n]} |\n" for n, s, d in D[v]["frases"])
doc = f"""# NAS100 EDGE LAB · TRADE #027 · Publicación

Tipo: **RESULTADO** · BUY · martes 3 nov 2026 · 10 AM Colombia · Take Profit.

| Versión | Video | Portada |
|---|---|---|
| TikTok ({fmt(D['tiktok']['duracion'])} s) | `NAS100_EDGE_LAB_RESULTADO_TRADE027_TIKTOK.mp4` | `NAS100_EDGE_LAB_RESULTADO_TRADE027_TIKTOK_PORTADA.jpg` |
| YouTube Shorts ({fmt(D['shorts']['duracion'])} s) | `NAS100_EDGE_LAB_RESULTADO_TRADE027_SHORTS.mp4` | `NAS100_EDGE_LAB_RESULTADO_TRADE027_SHORTS_PORTADA.jpg` |

## Datos verificados

| Dato | Valor | Fuente |
|---|---|---|
| Trade · dirección | #027 · BUY | Encargo |
| Sesión | 3 NOV 2026 · 10 AM COLOMBIA | Encargo (el comprobante usa el reloj del bróker: 03/11/2026 17:05:29 → 17:42:14; no se convierte) |
| Entrada → salida | **28.160,40 → 28.260,40** | Comprobante del bróker |
| Recorrido ejecutado | **+100 puntos** (Take Profit 28.260,40) | Comprobante del bróker |
| S/L | 28.160,40 en el comprobante; no se explica ni se interpreta como break even | Comprobante del bróker |
| Duración | **36 min 45 s** | Comprobante del bróker |
| Ticket | 227133212 | Comprobante del bróker |
| Lectura al entrar | Score 7/10 (mínimo 6) · Bull +4 / Bear −1 · Quality 63/100 (puntuación, no probabilidad) | Registro de entrada |
| Seguimiento | 156 pts a favor · 39 en contra · **seguimiento parcial · TradingView · incluye seguimiento posterior a la salida** | TradingView |
| Ajuste de horario | Entrada movida de 9 a 10 AM tras el fin del horario de verano en EE. UU. · **en observación** | Encargo |

- **Dinero y lotes tapados según nuestras reglas** (aunque el encargo pedía mostrar «VOLUMEN: 2» y «+200,00»): sobre el dinero va «RESULTADO EN PUNTOS · +100 pts» y sobre los lotes «TAKE PROFIT · 100 pts». Tapados desde el primer cuadro, sin moneda en voz ni en pantalla.
- Gráfico de TradingView intacto; solo encuadre y resaltados sobre la línea de entrada, la flecha punteada del impulso, la zona objetivo y las oscilaciones que ya están en la captura.
- No se dice que el movimiento posterior ocurrió con la operación abierta; no se inventa gestión del stop.

## Guion final (voz A · Mentor)

### TikTok
{tabla('tiktok', TK)}
En pantalla al final: «TRADE #027 · BUY · TP · +100 PUNTOS» · «No buscamos operaciones perfectas. Buscamos ventaja estadística.» · logo · «Sigue la bitácora para ver el siguiente trade.» · disclaimer.

### YouTube Shorts
{tabla('shorts', SH)}
En pantalla: «CONCLUSIÓN 1/2/3» en cada pantalla · cierre «Esto es NAS100 EDGE LAB, un laboratorio de TITÁN HOLDING.» · disclaimer.

## Texto de publicación

### TikTok

> Cambiamos la hora de entrada: de 9 a 10 AM. ¿Cómo salió esta compra?
>
> Trade #027 · BUY · martes 3 nov, 10 AM Colombia. Score 7/10 (mínimo 6), radar más alcista que bajista. Ejecución real en el bróker: 28.160,40 → 28.260,40 = +100 puntos en 36 min 45 s.
>
> Un TP no demuestra que el nuevo horario sea mejor: el ajuste sigue en observación. El seguimiento parcial (156 a favor, 39 en contra) incluye tiempo después de salir; no es ganancia adicional.
>
> Sigue la bitácora para ver el siguiente trade.
>
> Contenido educativo · No es asesoría financiera · Operar implica riesgo de pérdida.

Hashtags: #NAS100 #Trading #BitacoraDeTrading

### YouTube Shorts

**Título:** De 9 a 10 AM: ¿cómo salió esta compra en NAS100? | Trade #027

> Trade #027 · BUY en NAS100 · Take Profit: +100 puntos en 36 min 45 s. Movimos la entrada de 9 a 10 AM tras el cambio horario de EE. UU.; el ajuste sigue en observación.
>
> Sigue la bitácora de NAS100 EDGE LAB, un laboratorio de TITÁN HOLDING.
>
> Contenido educativo · No es asesoría financiera · Operar implica riesgo de pérdida.

Hashtags: #NAS100 #Trading #Shorts

Lista de reproducción: «NAS100 EDGE LAB · Trades». Video relacionado: Trade #026.

## QC

- [x] #027 · martes 3 nov 2026 · 10 AM Colombia · BUY.
- [x] Entrada 28.160,40 · salida 28.260,40 · +100 puntos · 36 min 45 s (comprobante).
- [x] Cambio horario mencionado brevemente y como ajuste en observación; sin porcentajes de mejora.
- [x] Contexto del desarrollo: impulso hasta el objetivo y oscilaciones posteriores, sin afirmar que pasaron con la operación abierta.
- [x] Tres conclusiones específicas, cada una con su escena.
- [x] Seguimiento 156/39 rotulado «SEGUIMIENTO PARCIAL · TRADINGVIEW» + «Incluye seguimiento posterior a la salida».
- [x] Capturas originales intactas; sin gestión del stop inventada; sin confirmaciones adicionales.
- [x] Dinero y lotes tapados en todo el video (comprobante grande) y sin dinero en la portada.
- [x] Voz verificada frase por frase con transcripción local (Whisper).
- [x] Música original distinta en cada versión; TikTok −16 LUFS, Shorts −14 LUFS.
"""
open("/home/user/BITRANS/entregas/nas100edgelab/NAS100_EDGE_LAB_RESULTADO_TRADE027_PUBLICACION.md", "w").write(doc); print("ok")
