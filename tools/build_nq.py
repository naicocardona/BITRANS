# TITÁN · paquete «Nasdaq y cómo empezar» · armador de los 5 videos
# Uso: python3 tools/build_nq.py lg|sh1|tk1|sh2|tk2   (antes: python3 tools/nq_voice.py)
import os, sys, json, re, shutil, importlib.util as U
MODE = sys.argv[1]; LG = MODE == "lg"
H = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, H)
SCR = os.environ.get("BITRANS_WORK", "/home/user/bitrans_work"); W = f"{SCR}/nq"
sp = U.spec_from_file_location("ta", f"{H}/tq_anchors.py"); ta = U.module_from_spec(sp); sp.loader.exec_module(ta)
import nq_scenes as NS
d = json.load(open(f"{W}/{MODE}.words.json")); Wd = d["display"]; DUR = round(d["dur"], 2)
NW = [ta.norm(w[0]) for w in Wd]
def A(ph, n=0, after=0.0):
    ks = [ta.norm(x) for x in ph.split()]; hits = [i for i in range(len(NW) - len(ks) + 1) if NW[i:i + len(ks)] == ks and Wd[i][1] >= after]
    if len(hits) <= n: raise SystemExit(f"[{MODE}] ancla no encontrada: «{ph}»")
    return round(Wd[hits[n]][1], 3)
def B(t, fs, c=""): return f'<div class="B {c}" style="display:inline-block;font-size:{fs}px;line-height:1.1;padding:10px 22px 14px;border-radius:16px;background:rgba(13,16,32,.88)">{t}</div>'
def TAG(t): return f'<div class="tag" style="position:relative;display:inline-block;font-size:24px;margin-bottom:10px">{t}</div>'
FS = 54 if LG else 56
# ================= planes por formato =================
# SCN: (escena, inicio, transición, cam_inicio, cam_fin, punto_zoom)   BEATS: [t, efecto, ...]   OV: (html, t0, t1)
if MODE == "lg":
    t_n, t_dc, t_h, t_m, t_c, t_g, t_b, t_co, t_p, t_d, t_e = (A("El jueves 5 de noviembre") - 0.35, A("¿Qué preocupaba") - 0.3, A("Para ampliar la foto") - 0.35, A("Mira por qué.") - 0.3,
        A("Esa misma idea") - 0.35, A("Ahora la parte práctica.") - 0.35, A("El bróker es el intermediario") - 0.3, A("Mira cuánto cuesta depositar") - 0.3,
        A("Tercera:") - 0.3, A("Veamos una orden ficticia.") - 0.3, A("La próxima vez") - 0.35)
    SCN = [("cards", 0, None, (540, 520, 1.12), (540, 540, 1.0)), ("chart", t_n, "whip", (540, 540, 1.0), (560, 540, 1.04)),
           ("dc", t_dc, "wipe", (540, 600, 1.08), (540, 560, 1.0)), ("sp", t_h, "whip", (540, 540, 1.0), (540, 560, 1.05)),
           ("math", t_m, "zoom", (540, 560, 1.0), (540, 580, 1.05), (700, 750)), ("comp", t_c, "wipe", (330, 680, 1.6), (540, 560, 1.0)),
           ("goal", t_g, "whip", (540, 540, 1.0), (540, 560, 1.05)), ("brok", t_b, "wipe", (540, 520, 1.0), (540, 540, 1.04)),
           ("cost", t_co, "zoom", (540, 420, 1.15), (540, 560, 1.0), (540, 400)), ("prod", t_p, "whip", (540, 540, 1.0), (540, 540, 1.05)),
           ("demo", t_d, "zoom", (540, 540, 1.0), (540, 600, 1.08), (540, 500)), ("end", t_e, "wipe", (540, 560, 1.0), (540, 540, 1.06))]
    BEATS = [[0, "on", "#cdW"], [0.6, "point", "cp"], [A("El jueves,"), "pop", "#cdJ"], [A("El jueves,") + 0.3, "face", "cp", "oh"], [A("El jueves,") + 0.5, "sweat", "cp"],
             [A("¿cómo empiezo"), "shrug", "cp"], [A("¿cómo empiezo"), "face", "cp", "fl"], [A("Vamos a mirar"), "face", "cp", "sm"], [A("Vamos a mirar"), "jump", "cp"],
             [t_n + 0.25, "draw", "#chLine", 1.6], [A("El jueves 5 de noviembre") + 0.8, "pop", "#dJ"], [A("golpe más fuerte"), "show", "#brJ"], [A("golpe más fuerte"), "cam", 1, 820, 620, 1.35],
             [A("Pero si comparas"), "out", "#brJ"], [A("Pero si comparas"), "cam", 1, 640, 560, 1.05], [A("Pero si comparas") + 0.3, "pop", "#o30"], [A("viernes 6"), "pop", "#d6"], [A("terminó cerca"), "show", "#brS"],
             [A("Y frente a su máximo"), "out", "#brS"], [A("Y frente a su máximo"), "pop", "#mx"], [A("Y frente a su máximo") + 0.4, "show", "#brM"], [A("Las tres cifras"), "show", "#brTag"], [A("La diferencia es"), "pulse", "#brTag"],
             [t_dc + 0.3, "move", "#truck", 190, 0, 1.6], [A("parte de la presión"), "walk", "tec", 200, 1.8], [A("Había dudas"), "face", "ana", "fl"], [A("centros de datos"), "pulse", "#truck"],
             [A("Imagina una empresa"), "pop", "#ord"], [A("menos pedidos,"), "pop", "#ordDn"], [A("menos pedidos,"), "face", "tec", "oh"], [A("puede cambiar lo que"), "pop", "#px"], [A("antes de que se cancele"), "shake", "#px"],
             [t_h + 0.1, "on", "#spBan"], [A("Entre 2016"), "show", "#spAvg"], [A("Pero nadie vivió"), "cam", 3, 540, 700, 1.12], [A("En 2022"), "bardn", "#b22"], [A("y en 2023"), "barup", "#b23"],
             [A("Aun así,"), "show", "#spRes"], [A("Aun así,"), "cam", 3, 540, 760, 1.0],
             [A("te quedan 80."), "show", "#a1"], [A("te quedan 80."), "barup", "#m80"], [A("Si luego ganas"), "show", "#a2"], [A("llegas a 96."), "barup", "#m96"], [A("Para volver a 100"), "pop", "#m25"],
             [A("Un promedio histórico"), "pulse", "#m25"],
             [t_c - 0.02, "on", "#cb0"], [t_c + 0.4, "show", "#cLeg"], [A("Supón que"), "show", "#c0"], [A("Al cabo de un año"), "barup", "#cb1"], [A("Al cabo de un año") + 0.3, "show", "#c1"],
             [A("Si vuelves a ganar"), "barup", "#cb2"], [A("y llegas a"), "show", "#c2"], [A("Si esa tasa"), "cam", 5, 540, 560, 1.0, 1.4], [A("Si esa tasa") + 0.3, "stagger", ".cbx", 3.2],
             [A("el saldo llegaría"), "show", "#c20"], [A("Ese «si»"), "pulse", "#c20"], [A("separa los aportes"), "pop", "#cWarn"],
             [t_g - 0.02, "on", "#g1, #g2"], [t_g + 0.9, "dim", "#g1, #g2", 0.3], [A("retirar el próximo mes"), "lit", "#g1"], [A("retirar el próximo mes"), "face", "gA", "oh"], [A("ahorrando para una meta"), "lit", "#g2"], [A("ahorrando para una meta"), "cheer", "gB"],
             [A("Desde Colombia puedes"), "show", "#nmH"], [A("intermediario local."), "show", "#nmSFC"], [t_b - 0.02, "on", "#q1, #q2, #q3"], [t_b + 0.8, "dim", "#q1, #q2, #q3", 0.3], [A("yo empezaría con tres"), "lit", "#q1"], [A("yo empezaría con tres") + 0.3, "lit", "#q2"], [A("yo empezaría con tres") + 0.6, "lit", "#q3"],
             [A("Primera:", 0, t_b), "pulse", "#q1"], [A("Primera:", 0, t_b), "point", "bk"], [A("Para una firma estadounidense"), "show", "#bc"], [A("no cubre pérdidas"), "pulse", "#bc"], [A("Segunda:"), "pulse", "#q2"],
             [A("Mira cuánto cuesta depositar") + 0.1, "pop", "#cn0"], [A("convertir pesos"), "pop", "#cn1"], [A("comprar, vender"), "pop", "#cn2"], [A("vender y retirar.") , "pop", "#cn3"], [A("retirar.", 0, t_co) , "pop", "#cn4"],
             [A("convertir pesos"), "on", "#coin"], [A("convertir pesos"), "move", "#coin", 840, 0, 2.6],
             [A("Imagina una orden"), "show", "#ex"], [A("Imagina una orden"), "cam", 8, 540, 740, 1.08], [A("El cargo representa"), "pop", "#ex5"],
             [t_p - 0.02, "on", "#pA, #pE, #pI, #pC"], [t_p + 1.0, "dim", "#pA, #pE, #pI, #pC", 0.3], [A("Una acción representa"), "lit", "#pA"], [A("Un ETF"), "lit", "#pE"], [A("El Nasdaq-100 es un índice:"), "lit", "#pI"], [A("no algo que puedas"), "pop", "#pIx"], [A("Si la pantalla dice"), "lit", "#pC"],
             [A("Abro la ficha,"), "show", "#dFicha"], [A("Abro la ficha,"), "move", "#cur", -330, -60, 0.8], [A("Abro la ficha,") + 0.9, "tap", "#cur"],
             [A("el nombre y el símbolo,"), "pulse", "#dFicha"], [A("confirmo el tipo"), "show", "#dTipo"], [A("confirmo el tipo"), "move", "#cur", 60, 110, 0.7], [A("compruebo cuánto"), "show", "#dCant"],
             [A("compruebo cuánto"), "move", "#cur", 60, 200, 0.7], [A("En la vista previa"), "show", "#dPrev"], [A("En la vista previa"), "move", "#cur", 60, 450, 0.8], [A("dinero propio o prestado."), "show", "#dFin"],
             [A("dinero propio o prestado."), "move", "#cur", 60, 290, 0.7], [A("Ahí paro."), "dim", "#dBtn", 0.3], [A("Ahí paro."), "pop", "#dStop"], [A("Ahí paro.") + 0.3, "move", "#cur", 300, 700, 0.8],
             [t_e + 0.4, "pulse", "#eQ"], [DUR - 2.6, "wave", "eA"], [DUR - 2.2, "pulse", "#eQ"], [DUR - 1.6, "jump", "eB"], [A("llegas a 1.144,90") if False else A("y llegas a") + 1.2, "pulse", "#c2"], [A("y llegas a") + 1.0, "cam", 5, 380, 640, 1.42, 1.6], [A("qué cambió para el negocio"), "point", "eA"], [A("si entiendes lo que"), "face", "eB", "sm"], [A("esas dos preguntas"), "jump", "eB"]]
    OV = [(B("MIÉRCOLES: REBOTE · JUEVES: CAÍDA", 50), 0, A("Si estás pensando")), (B("¿Cómo empiezo sin adivinar el mañana?", 52, "gold"), A("Si estás pensando"), A("Vamos a mirar")),
          (B("Qué cayó · qué enseña la historia · cómo revisar un bróker", 46), A("Vamos a mirar"), t_n),
          (B("Jueves 5 nov: −6,36 %", FS), t_n + 0.3, A("Pero si comparas")), (B("Semana (30 oct → 6 nov): −4,91 %", 50), A("Pero si comparas"), A("Y frente a su máximo")),
          (B("Desde el máximo de cierre (6 oct): −13,56 %", 48), A("Y frente a su máximo"), A("Las tres cifras")), (B("Mismo índice · distinto punto de partida", 50, "gold"), A("Las tres cifras"), t_dc),
          (TAG("EXPLICACIONES REPORTADAS · AP") + "<br>" + B("¿Qué preocupaba al mercado?", FS), t_dc + 0.3, A("Imagina una empresa")), (B("Expectativa ≠ pedido cancelado", FS, "gold"), A("Imagina una empresa"), t_h),
          (B("Cambio de índice: S&amp;P 500", FS), t_h + 0.3, A("Pero nadie vivió")), (B("2022: −19,44 % · 2023: +24,23 %", FS), A("Pero nadie vivió"), A("Aun así,")),
          (B("Dos años después: casi el mismo punto", 50, "gold"), A("Aun así,"), t_m), (TAG("EJEMPLO") + "<br>" + B("100 → 80 → 96", 60), t_m + 0.3, A("Para volver a 100")),
          (B("De 80 a 100 hace falta +25 %", FS, "gold"), A("Para volver a 100"), A("Un promedio histórico")), (B("Un promedio describe el pasado, no promete el futuro", 46), A("Un promedio histórico"), t_c),
          (TAG("7 % HIPOTÉTICO · SIN APORTES, COSTOS NI INFLACIÓN").replace("font-size:24px", "font-size:20px") + "<br>" + B("Capitalización: cada rendimiento sobre un saldo nuevo", 46), t_c + 0.3, A("Si esa tasa")), (TAG("7 % HIPOTÉTICO · SIN APORTES, COSTOS NI INFLACIÓN").replace("font-size:24px", "font-size:20px") + "<br>" + B("Si se repitiera 20 años: ≈ USD 3.870", 50, "gold"), A("Si esa tasa"), A("Ese «si»")),
          (TAG("7 % HIPOTÉTICO · SIN APORTES, COSTOS NI INFLACIÓN").replace("font-size:24px", "font-size:20px") + "<br>" + B("Es matemática, no una proyección", FS), A("Ese «si»"), A("Y si añades")), (TAG("7 % HIPOTÉTICO · SIN APORTES, COSTOS NI INFLACIÓN").replace("font-size:24px", "font-size:20px") + "<br>" + B("Lo que pusiste no es ganancia", FS, "gold"), A("Y si añades"), t_g),
          (B("¿Para qué es ese dinero y cuándo lo necesitas?", 48), t_g + 0.3, t_b), (B("El bróker tramita tus órdenes", FS), t_b + 0.3, A("Desde Colombia puedes")),
          (TAG("EJEMPLOS PARA INVESTIGAR") + "<br>" + B("Hapi · Interactive Brokers · intermediario local", 44), A("Desde Colombia puedes"), A("Primera:", 0, t_b)),
          (B("1 · ¿Quién responde por mi cuenta?", FS), A("Primera:", 0, t_b), A("Y si ves una referencia")), (B("SIPC no cubre caídas del mercado", FS, "gold"), A("Y si ves una referencia"), A("Segunda:")),
          (B("2 · ¿Cuánto cuesta el recorrido completo?", 50), A("Segunda:"), A("Imagina una orden")), (TAG("EJEMPLO HIPOTÉTICO") + "<br>" + B("USD 20 + USD 1 de cargo = 5 %", FS), A("Imagina una orden"), t_p),
          (B("3 · ¿Qué estoy comprando?", FS), t_p + 0.3, t_d), (TAG("DEMOSTRACIÓN · INTERFAZ FICTICIA") + "<br>" + B("Leer una orden sin ejecutarla", FS), t_d + 0.3, A("Ahí paro.")),
          (B("Vista previa: paramos aquí", FS, "gold"), A("Ahí paro."), t_e), (B("¿Qué cambió para el negocio?", FS), t_e + 0.3, A("y si entiendes")),
          (B("¿Entiendo lo que compré?", FS, "gold"), A("y si entiendes"), A("Contenido educativo."))]
    HUDL, HUDT = ["Qué pasó", "Historia", "Compuesto", "Desde Colombia"], [0, t_h, t_c, t_g]
    CTA_T, CTA = A("Contenido educativo."), ("Contenido educativo.", "No es una recomendación de inversión.")
elif MODE in ("sh1", "tk1"):
    TK = MODE == "tk1"
    t_c = A("Dos:") - 0.3; t_p, t_d = A("Tres:", 0, t_c + 1) - 0.3, (A("Antes de confirmar,") if TK else A("Abre la vista previa")) - 0.3
    SCN = [("brok" if TK else "brok0", 0, None, (540, 470, 1.0), (540, 540, 1.04)), ("cost", t_c, "zoom", (540, 500, 1.0), (540, 540, 1.04), (190, 400)),
           ("prod", t_p, "whip", (540, 540, 1.0), (540, 540, 1.05)), ("demo", t_d, "zoom", (540, 540, 1.0), (540, 560, 1.04), (540, 520))]
    BEATS = [[0, "on", "#q1"], [0, "on", "#q2"], [0, "on", "#q3"], [A("tres cosas."), "pulse", "#q2"], [A("Uno:"), "pulse", "#q1"], [A("Uno:"), "dim", "#q2", 0.35], [A("Uno:"), "dim", "#q3", 0.35],
             [A("Uno:") + 0.2, "point", "bk"], [A("nombre legal"), "face", "bk2", "sm"], [A("nombre legal"), "jump", "bk2"],
             [t_c + 0.4, "pop", "#cn0"], [t_c + 0.4, "on", "#coin"], [A("cambio de moneda,"), "pop", "#cn1"], [A("compra, venta"), "pop", "#cn2"], [A("venta y retiro."), "pop", "#cn3"], [A("venta y retiro.") + 0.4, "pop", "#cn4"],
             [A("cambio de moneda,"), "move", "#coin", 840, 0, 2.4],
             [t_p - 0.02, "on", "#pA, #pE, #pC"], [t_p + 1.0, "dim", "#pA, #pE, #pC", 0.3], [A("Una acción"), "lit", "#pA"], [A("ETF"), "lit", "#pE"], [A("CFD"), "lit", "#pC"],
             [t_c + 0.5, "walk", "cw1", 1300, 9.0], [t_c + 0.5, "move", "#cw1bag", 1300, 0, 9.0],
             [t_d + 0.4, "show", "#dFicha"], [t_d + 0.5, "move", "#cur", -330, -60, 0.8], [A("el nombre,", 0, t_d), "pulse", "#dFicha"], [A("tipo de producto", 0, t_d), "show", "#dTipo"], [A("tipo de producto", 0, t_d), "move", "#cur", 60, 110, 0.7],
             [A("cargos", 0, t_d), "show", "#dPrev"], [A("cargos", 0, t_d), "move", "#cur", 60, 450, 0.8]]
    if TK:
        BEATS += [[A("Hapi,"), "show", "#nmH"], [A("intermediario local."), "show", "#nmSFC"], [A("Si es una firma"), "show", "#bc"],
                  [A("Por ejemplo:") - 0.3, "out", "#cwk"], [A("Por ejemplo:"), "show", "#ex"], [A("Por ejemplo:"), "cam", 1, 540, 740, 1.08], [A("ese cargo equivale"), "pop", "#ex5"], [A("Son números inventados"), "pulse", "#ex5"],
                  [A("Una acción,"), "lit", "#pA"], [A("un ETF"), "lit", "#pE"], [A("un CFD"), "lit", "#pC"],
                  [A("el importe"), "show", "#dCant"], [A("el importe"), "move", "#cur", 60, 200, 0.7], [A("dinero prestado."), "show", "#dFin"], [A("dinero prestado."), "move", "#cur", 60, 290, 0.7],
                  [A("Aquí llegamos"), "dim", "#dBtn", 0.3], [A("y paramos."), "pop", "#dStop"]]
        BEATS += [[A("vista previa"), "pulse", "#dPrev"]]
    else:
        BEATS += [[A("Cero comisión"), "pop", "#zero"], [A("Cero comisión"), "cam", 1, 540, 700, 1.08], [A("antes de confirmar."), "dim", "#dBtn", 0.3], [A("antes de confirmar."), "pop", "#dStop"]]
    OV = [(B("ANTES DE DEPOSITAR", 72), 0, A("Uno:")), (B("1 · ENTIDAD: ¿quién está detrás?", FS), A("Uno:"), t_c),
          (B("2 · COSTOS: todo el recorrido", FS), t_c + 0.3, t_p), (B("3 · PRODUCTO: ¿qué compras?", FS), t_p + 0.3, t_d),
          (TAG("DEMOSTRACIÓN · INTERFAZ FICTICIA") + "<br>" + B("Vista previa antes de confirmar", FS), t_d + 0.3, DUR)]
    if TK: OV[1] = (TAG("EJEMPLOS PARA INVESTIGAR") + "<br>" + B("1 · ENTIDAD: ¿quién está detrás?", FS), A("Uno:"), t_c); OV.insert(3, (TAG("EJEMPLO HIPOTÉTICO") + "<br>" + B("USD 20 + USD 1 = 5 %", 60), A("Por ejemplo:"), t_p)); OV[2] = (OV[2][0], OV[2][1], A("Por ejemplo:"))
    HUDL, HUDT = ["Entidad", "Costos", "Producto", "Vista previa"], [0, t_c, t_p, t_d]
    CTA_T, CTA = A("Puedes aprender"), ("Contenido educativo.", "No es una recomendación de inversión.")
else:
    TK = MODE == "tk2"
    t_m, t_c = A("Ahora") - 0.3, (A("Con el interés compuesto") if TK else A("¿Qué tiene que ver")) - 0.35
    t_dc = A("La prensa señaló") - 0.3 if TK else None
    SCN = [("chart", 0, None, (540, 540, 1.0), (580, 540, 1.06))] + ([("dc", t_dc, "wipe", (540, 600, 1.08), (540, 560, 1.0))] if TK else []) + \
          [("math", t_m, "whip", (540, 560, 1.0), (540, 580, 1.05)), ("comp", t_c, "wipe", (540, 560, 1.0), (520, 580, 1.05))]
    BEATS = [[0, "on", "#chLine"], [0, "on", "#o30"], [0, "on", "#d6"], [A("cerró la semana"), "show", "#brS"], [A("cerró la semana"), "pulse", "#d6"],
             [t_m + 0.1, "on", "#m100"], [A("baja a 80,"), "show", "#a1"], [A("baja a 80,"), "barup", "#m80"], [A("20%", 0, t_m), "show", "#a2"], [A("96.", 0, t_m), "barup", "#m96"],
             [A("Para volver a 100,"), "pop", "#m25"],
             [t_c + 0.4, "show", "#cLeg"], [t_c + 0.4, "on", "#cb0"], [t_c + 0.4, "show", "#c0"]]
    if TK:
        BEATS += [[A("El jueves fue"), "out", "#brS"], [A("El jueves fue"), "pop", "#dJ"], [A("El jueves fue") + 0.3, "show", "#brJ"], [A("El jueves fue"), "cam", 0, 820, 620, 1.35],
                  [t_dc + 0.3, "move", "#truck", 190, 0, 1.6], [A("inteligencia artificial"), "walk", "tec", 200, 1.8], [A("centros de datos"), "pop", "#ord"], [A("más despacio."), "pop", "#ordDn"],
                  [A("Eso ayuda"), "face", "ana", "fl"], [A("no explica por sí solo"), "shrug", "ana"],
                  [A("llegan a 1.070."), "barup", "#cb1"], [A("llegan a 1.070.") + 0.2, "show", "#c1"], [A("llegarían a"), "barup", "#cb2"], [A("llegarían a") + 0.3, "show", "#c2"],
                  [A("es hipotético."), "cam", 2 + 1, 540, 560, 1.0, 1.4], [A("es hipotético.") + 0.3, "stagger", ".cbx", 2.6], [A("No garantiza"), "show", "#c20"]]
    else:
        BEATS += [[A("Si tus ganancias"), "barup", "#cb1"], [A("Si tus ganancias") + 0.2, "show", "#c1"], [A("también pueden generar"), "barup", "#cb2"], [A("también pueden generar") + 0.3, "show", "#c2"],
                  [A("Pero el mercado"), "cam", 2, 540, 560, 1.0, 1.4], [A("Pero el mercado") + 0.3, "stagger", ".cbx", 2.6]]
    OV = [(B("EL NASDAQ CAYÓ", 76) + "<br>" + B("¿Cómo se recupera una pérdida?", 48, "gold").replace('style="', 'style="margin-top:10px;', 1), 0, A("cerró la semana")),
          (B("Semana al 6 nov: −4,91 %", 60), A("cerró la semana"), (A("El jueves fue") if TK else t_m))]
    if TK: OV += [(B("Jueves 5 nov: −6,36 % en una sesión", 52), A("El jueves fue"), t_dc), (TAG("CONTEXTO REPORTADO · AP") + "<br>" + B("IA y centros de datos", FS), t_dc + 0.3, A("Eso ayuda")),
                  (B("Contexto, no explicación completa", FS, "gold"), A("Eso ayuda"), t_m)]
    OV += [(TAG("EJEMPLO APARTE") + "<br>" + B("100 → 80 → 96", 64), t_m + 0.3, A("Para volver a 100,")), (B("Para volver a 100: +25 %", 60, "gold"), A("Para volver a 100,"), t_c),
           (TAG("7 % HIPOTÉTICO · SIN APORTES, COSTOS NI INFLACIÓN").replace("font-size:24px", "font-size:20px") + "<br>" + B("Interés compuesto: el saldo cambia", FS), t_c + 0.3, (A("es hipotético.") if TK else A("Pero el mercado"))),
           (TAG("7 % HIPOTÉTICO · SIN APORTES, COSTOS NI INFLACIÓN").replace("font-size:24px", "font-size:20px") + "<br>" + B("Sin tasa fija · sin garantía", FS, "gold"), (A("es hipotético.") if TK else A("Pero el mercado")), DUR)]
    HUDL, HUDT = (["Caída", "Contexto", "Recuperar", "Compuesto"], [0, t_dc, t_m, t_c]) if TK else (["Caída", "Recuperar", "Compuesto"], [0, t_m, t_c])
    CTA_T, CTA = A("La capitalización puede"), ("Contenido educativo.", "No es una recomendación de inversión.")
# ================= comprobaciones automáticas (QC) =================
for h, a_, b_ in OV:
    if not (0 <= a_ < b_ <= DUR + 0.01): raise SystemExit(f"[{MODE}] titular con tiempos inválidos ({a_}→{b_}): {re.sub('<[^>]+>', ' ', h)[:60]}")
ts = [s[1] for s in SCN]
if ts != sorted(ts) or len(set(ts)) != len(ts): raise SystemExit(f"[{MODE}] escenas fuera de orden: {ts}")
for b in BEATS:
    if not (0 <= b[0] <= DUR): raise SystemExit(f"[{MODE}] efecto fuera de rango: {b}")
# ================= HTML =================
SC = [s[0] for s in SCN]
scn = [dict(k=s[0], t0=round(s[1], 3), t1=round(SCN[i + 1][1] + 0.7, 3) if i + 1 < len(SCN) else DUR, tr=s[2], c0=s[3], c1=s[4], zp=(s[5] if len(s) > 5 else None)) for i, s in enumerate(SCN)]
G = [g for g in ta.groups(Wd, 3) if g[0] < DUR - 0.2]
P = f"{W}/nq-{MODE}"; os.makedirs(f"{P}/assets/audio", exist_ok=True)
for sub in ["vendor", "fonts"]: shutil.copytree(f"{H}/kit/tq-3d/assets/{sub}", f"{P}/assets/{sub}", dirs_exist_ok=True)
shutil.copy(f"{H}/kit/tq-3d/hyperframes.json", P)
json.dump({"name": f"nq-{MODE}", "private": True, "type": "module"}, open(f"{P}/package.json", "w")); json.dump({"id": f"nq-{MODE}", "name": f"nq-{MODE}"}, open(f"{P}/meta.json", "w"))
if os.path.exists(f"{W}/{MODE}_mix.wav"): shutil.copy(f"{W}/{MODE}_mix.wav", f"{P}/assets/audio/mix.wav")
VW, VH = (1920, 1080) if LG else (1080, 1920)
STG = "left:840px;top:0px" if LG else "left:0px;top:420px"
n = [0]
def C(i, inner, style):
    n[0] += 1; return f'<div id="{i}" class="clip" data-start="0" data-duration="{DUR}" data-track-index="{n[0]}" style="position:absolute;{style}">{inner}</div>'
FIGS = sorted(set(re.findall(r'id="([A-Za-z0-9]+)-h"', "".join(NS.SCENES[k]() for k in SC))))
body = [C(f"s{k}", f'<div style="position:absolute;{STG};width:1080px;height:1080px;overflow:hidden"><div id="cam{k}" style="position:absolute;left:0;top:0;width:1080px;height:1080px;transform-origin:0 0">{NS.SCENES[nm]()}</div>'
          f'<div id="wipe{k}" style="position:absolute;left:480px;top:480px;width:120px;height:120px;border-radius:50%;background:#C8A45D;opacity:0"></div></div>', f"left:0;top:0;width:{VW}px;height:{VH}px")
        for k, nm in enumerate(SC)]
if LG:
    body += [C("panel", "", "left:0;top:0;width:840px;height:1080px;background:linear-gradient(90deg,#0D1020 86%,rgba(13,16,32,0))"),
             C("brand", '<div style="font-family:Jakarta;font-weight:800;font-size:30px;letter-spacing:.32em;color:#C8A45D">TITÁN HOLDING</div>', "left:70px;top:60px")]
    hudpos, ovpos, cappos, ctapos = "left:70px;top:120px;width:760px;white-space:nowrap", "left:70px;top:190px;width:730px", "left:40px;top:820px;width:780px;height:220px", "left:70px;top:520px;width:720px"
else:
    body += [C("topshade", "", "left:0;top:0;width:1080px;height:430px;background:#0D1020"), C("botshade", "", "left:0;top:1500px;width:1080px;height:420px;background:linear-gradient(180deg,rgba(13,16,32,0),#0D1020 18%)"),
             C("brand", '<div style="font-family:Jakarta;font-weight:800;font-size:30px;letter-spacing:.32em;color:#C8A45D">TITÁN HOLDING</div>', "left:70px;top:140px")]
    hudpos, ovpos, cappos, ctapos = "left:70px;top:196px;width:960px;white-space:nowrap", "left:70px;top:252px;width:940px", "left:60px;top:1530px;width:960px;height:220px", "left:70px;top:252px;width:940px"; CTAFS = 40
    OV = [(h, a_, min(b_, CTA_T)) for h, a_, b_ in OV if a_ < CTA_T - 0.3]
hud = "".join(f'<span id="hs{k}" class="hs">{h}</span>' for k, h in enumerate(HUDL))
body += [C("hud", hud, hudpos)]
body += [C(f"h{i}", h, f"{ovpos};opacity:{1 if a_ < 0.05 else 0}") for i, (h, a_, _) in enumerate(OV)]
body += [C("caps", ta.caps_html(G, 52 if LG else 62), cappos)]
body += [C("cta", f'<div class="B" style="font-size:{44 if LG else 40}px;color:#F6F4EF;background:rgba(13,16,32,.92);padding:16px 24px;border-radius:16px;border:3px solid #C8A45D">{CTA[0]}<br>{CTA[1]}</div>', f"{ctapos};opacity:0")]
CSS = open(f"{H}/tq.css").read() + ":root{--navy:#0D1020;--gold:#C8A45D;--ivory:#F6F4EF}" + \
      ".hs{display:inline-block;padding:7px 14px;margin-right:8px;border-radius:999px;font-family:Jakarta;font-weight:800;font-size:22px;color:rgba(246,244,239,.6);border:2px solid rgba(246,244,239,.28);background:rgba(13,16,32,.7)}.hs.on{background:#C8A45D;color:#0D1020;border-color:#C8A45D}.hs.done{color:#C8A45D;border-color:rgba(200,164,93,.55)}.hs.done::before{content:'✓ '}" + \
      ".B.gold{color:#C8A45D}.tag{background:#C8A45D;color:#0D1020}.cw{-webkit-text-stroke:10px #0D1020}.cw.on{background:#C8A45D;color:#0D1020}.cw.k{color:#E9CF8F}"
OVJ = [[f"h{i}", a_, b_] for i, (_, a_, b_) in enumerate(OV)] + [["cta", CTA_T, DUR]]
CG = [[a_, b, [[w[1], w[2]] for w in g]] for a_, b, g in G]
html = f'''<!doctype html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width={VW}, height={VH}" />
<title>TITÁN · Nasdaq · {MODE}</title><script src="assets/vendor/gsap.min.js"></script>
<style>{CSS}
html, body, #root {{ width:{VW}px; height:{VH}px; background:#0D1020; }}</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{DUR}" data-width="{VW}" data-height="{VH}">
{chr(10).join(body)}
<audio id="vo" src="assets/audio/mix.wav" data-start="0" data-duration="{DUR}" data-track-index="90" data-volume="1"></audio>
</div>
<script>
window.DUR = {DUR}; window.SCN = {json.dumps(scn)}; window.BEATS = {json.dumps(BEATS)}; window.OV = {json.dumps(OVJ)}; window.HUD = {json.dumps([round(x, 3) for x in HUDT])};
window.CG = {json.dumps(CG)}; window.FIGS = {json.dumps(FIGS)};
{open(f"{H}/nq.js").read()}
</script></body></html>'''
open(f"{P}/index.html", "w").write(html)
json.dump({"DUR": DUR, "SCN": scn, "CTA": CTA_T}, open(f"{W}/{MODE}_times.json", "w"))
print("ok", MODE, DUR, [(s["k"], s["t0"]) for s in scn])
