# TITÁN · «NU cayó: ¿qué tienen que ver las elecciones de Brasil con tu inversión?» · Shorts, TikTok y YouTube (3D)
import os, sys, json, shutil, importlib.util as U
H = os.path.dirname(os.path.abspath(__file__)); SCR = os.path.join(H, "..")
sp = U.spec_from_file_location("ta", f"{H}/tq_anchors.py"); ta = U.module_from_spec(sp); sp.loader.exec_module(ta)
VZ = f"{SCR}/nu/voz/t"
DISC = "Contenido educativo. No es una recomendación de inversión."
SRC = "Fuentes: Estadão · The Motley Fool · Zacks"
def pill(txt, fs, bg="var(--ivory)", fg="var(--navy)", extra=""): return f'<div class="pill" style="position:relative;display:inline-block;padding:16px 30px;font-size:{fs}px;background:{bg};color:{fg};{extra}">{txt}</div>'
def drop_html(fs):
    return (f'<div class="B" style="font-size:{fs}px;line-height:1;color:#FF8A80;letter-spacing:-.03em">≈ −17 %</div>'
            f'<div style="margin-top:14px">{pill("26 OCT 2026 · en una sesión", int(fs*0.22), "var(--navy)", "var(--gold)", "border:2px solid var(--gold)")}</div>'
            f'<div style="margin-top:12px;font-weight:700;font-size:{int(fs*0.14)}px;color:rgba(244,238,220,.7)">{SRC}</div>')
def cta_html(q, fs, w):
    return (f'<div class="B" style="font-size:{fs}px;line-height:1.08;text-transform:uppercase;width:{w}px">{q}</div>'
            f'<div style="margin-top:28px"><div class="btn" style="position:relative;display:inline-block;padding:20px 50px;font-size:{int(fs*0.45)}px">Comenta tu respuesta</div></div>'
            f'<div style="margin-top:22px;font-weight:700;font-size:{int(fs*0.36)}px;color:rgba(244,238,220,.88)">{DISC}</div>')
def build(V):
    src = {"shorts": "shorts", "tiktok": "tiktok", "largo": "largo"}[V]
    d = json.load(open(f"{VZ}/{src}.words.json")); Wd = d["display"]; Hz = V == "largo"; W_, H_ = (1920, 1080) if Hz else (1080, 1920)
    a = ta.Anchors(Wd); A = lambda ph, sq=True: a(ph, sq)
    T = {}; O = []; SH = []
    # textos: (id, html, estilo, entra, sale, tipo)
    if not Hz:
        TOP = "left:70px;top:300px;width:940px"; CEN = "left:70px;top:560px;width:940px"
        hook = ('<div class="l l1" style="font-size:118px">NU cayó</div><br/><div class="l l2" style="font-size:72px;margin-left:30px">¿Por las elecciones?</div>')
        O.append(("hook", hook, "left:70px;top:300px", 0, None, "hook"))
    if V == "shorts":
        T.update(hkUrna=A("elecciones"), tkIn=A("El 26 de octubre,"), drop=A("cayó cerca"), brIn=A("La cobertura financiera"), brPin=A("elecciones de Brasil."), brBank=A("La conexión importa:"),
                 qIn=A("Para entender una caída,"), qT=[A("la noticia,"), A("su posible efecto"), A("los resultados de la empresa.")], qAll=A("Y recuerda:"), ttIn=A("¿Conocías este riesgo")); T["cta"] = T["ttIn"]
        SETS = ["hook", "ticket", "brasil", "cards", "titan"]; QL = ["La noticia", "Su posible efecto en el negocio", "Los resultados de la empresa"]; QLAB = "PARA ENTENDER UNA CAÍDA"
        SH = [dict(t0=0, set="hook", r0=10.5, r1=9.5, az0=-0.3, az1=0.2, el=0.12, ty=0.2), dict(t0=T["tkIn"] - 0.2, set="ticket", r0=9.6, r1=9.0, az0=0.3, az1=-0.2, el=0.08, ty=0.35),
              dict(t0=T["brIn"] - 0.2, set="brasil", r0=14.0, r1=12.5, az0=-0.4, az1=0.3, el=0.42, ty=-0.6), dict(t0=T["qIn"] - 0.2, set="cards", r0=7.6, r1=7.6, az0=0, az1=0, el=0.06),
              dict(t0=T["cta"] - 0.4, set="titan", r0=9.5, r1=8.8, az0=-0.2, az1=0.2, el=0.08, ty=1.5)]
        B = lambda txt, fs=58, c="": f'<div class="B {c}" style="font-size:{fs}px;line-height:1.08">{txt}</div>'
        GP = lambda txt, fs=38: pill(txt, fs, "var(--gold)")
        IP = lambda txt, fs=38: pill(txt, fs)
        cx = A("La conexión importa:", False)
        O += [("dt", pill("26 OCT 2026", 44, "var(--navy)", "var(--gold)", "border:3px solid var(--gold)"), TOP, A("El 26 de", False) + 0.1, T["drop"] - 0.05, "pop"),
              ("drop", drop_html(170), TOP, T["drop"] + 0.3, T["brIn"] - 0.3, "pop"),
              ("br1", pill("Reacción del mercado a las elecciones de Brasil", 38), TOP, T["brIn"] + 0.6, cx - 0.35, "inn"),
              ("br2", GP("Elecciones de Brasil", 40), "left:70px;top:390px;width:940px", A("a las elecciones", False) + 0.1, cx - 0.35, "pop"),
              ("cx0", B("La conexión importa", 66), TOP, cx + 0.05, T["qIn"] - 0.3, "inn"),
              ("cx1", IP("✓ Lo que ocurre en el país", 38), "left:70px;top:400px;width:940px", A("lo que ocurre", False) + 0.05, T["qIn"] - 0.3, "pop"),
              ("cx2", GP("✓ Donde hace negocios", 38), "left:70px;top:480px;width:940px", A("donde hace negocios.", False) + 0.05, T["qIn"] - 0.3, "pop"),
              ("qh", B("Para entender una caída", 66), TOP, T["qIn"], T["qAll"] - 0.3, "inn")]
        for k in range(3):
            O.append((f"qc{k}", pill(f"{k+1} DE 3", 32, "var(--navy)", "var(--gold)", "border:2px solid var(--gold)"), "left:70px;top:400px;width:940px", T["qT"][k], (T["qT"][k + 1] - 0.32 if k < 2 else T["qAll"] - 0.3), "pop"))
        O += [("rc", B("Y recuerda…", 66), TOP, T["qAll"] + 0.05, T["cta"] - 0.3, "inn"),
              ("stamp", '<div class="B" style="display:inline-block;font-size:84px;padding:10px 34px 18px;border:7px solid #FF8A80;color:#FF8A80;border-radius:20px;transform:rotate(-5deg);background:rgba(11,27,51,.88)">Caída ≠ barata</div>', "left:110px;top:420px;width:900px", A("caiga no demuestra", False) + 0.2, T["cta"] - 0.3, "pop"),
              ("dock", pill("NU&nbsp;&nbsp;≈ −17 %&nbsp;&nbsp;·&nbsp;&nbsp;26 OCT 2026", 30, "rgba(11,27,51,.88)", "#FF8A80", "border:2px solid rgba(255,138,128,.7)"), "left:70px;top:1272px;width:940px", T["brIn"] - 0.25, T["cta"] - 0.3, "pop"),
              ("cta", cta_html("¿Conocías este riesgo al invertir?", 84, 940), "left:70px;top:300px;width:940px", T["cta"] + 0.2, None, "inn")]
        HUD = ["Caída", "Brasil", "Conexión", "3 cosas"]; HUDT = [SH[1]["t0"], SH[2]["t0"], cx, SH[3]["t0"], SH[4]["t0"]]
    if V == "tiktok":
        T.update(hkUrna=A("unas elecciones"), hkShake=A("pueden sacudir"), tkIn=A("Eso ayuda"), drop=A("cayó cerca"), brIn=A("La cobertura financiera"), brPin=A("elecciones de Brasil."),
                 bkIn=A("¿Por qué importa"), loan=A("Piensa en un banco"), pay=A("y puedan pagar."), curIn=A("También le afectan"), curDrop=A("y la moneda."),
                 exp=A("Una noticia política"), res=A("antes de que conozcamos"), qIn=A("Por eso conviene"), qT=[A("¿qué pasó?,"), A("¿cómo podría afectar"), A("¿qué muestran")],
                 qAll=A("No podemos concluir"), ttIn=A("NU forma parte"), cta=A("¿Qué empresa"))
        SETS = ["hook", "ticket", "brasil", "bankc", "cur", "lanes", "cards", "titan"]; QL = ["¿Qué pasó?", "¿Cómo podría afectar a la empresa?", "¿Qué muestran sus próximos resultados?"]; QLAB = "TRES PREGUNTAS"
        SH = [dict(t0=0, set="hook", r0=10.5, r1=9.5, az0=-0.3, az1=0.2, el=0.12, ty=0.2), dict(t0=T["tkIn"] - 0.2, set="ticket", r0=9.6, r1=9.0, az0=0.3, az1=-0.2, el=0.08, ty=0.35),
              dict(t0=T["brIn"] - 0.2, set="brasil", r0=14.0, r1=12.5, az0=-0.4, az1=0.2, el=0.42, ty=-0.6), dict(t0=T["bkIn"] - 0.2, set="bankc", r0=14.0, r1=12.5, az0=0.4, az1=-0.2, el=0.42, ty=-0.6),
              dict(t0=T["curIn"] - 0.2, set="cur", r0=10.5, r1=9.8, az0=-0.2, az1=0.2, el=0.08, ty=0.2), dict(t0=T["exp"] - 0.2, set="lanes", r0=11.5, r1=10.8, az0=0.25, az1=-0.15, el=0.12, ty=0.1),
              dict(t0=T["qIn"] - 0.2, set="cards", r0=7.6, r1=7.6, az0=0, az1=0, el=0.06), dict(t0=T["ttIn"] - 0.2, set="titan", r0=9.5, r1=8.8, az0=-0.2, az1=0.2, el=0.08, ty=1.5)]
        B = lambda txt, fs=58, c="": f'<div class="B {c}" style="font-size:{fs}px;line-height:1.08">{txt}</div>'
        RP = lambda txt, fs=38: pill(txt, fs, "rgba(179,38,30,.88)", "var(--ivory)")
        GP = lambda txt, fs=38: pill(txt, fs, "var(--gold)")
        IP = lambda txt, fs=38: pill(txt, fs)
        e = T["bkIn"] - 0.3
        O += [("dt", pill("26 OCT 2026", 44, "var(--navy)", "var(--gold)", "border:3px solid var(--gold)"), TOP, A("el 26 de", False) + 0.1, T["drop"] - 0.05, "pop"),
              ("drop", drop_html(170), TOP, T["drop"] + 0.3, T["brIn"] - 0.3, "pop"),
              ("br1", pill("Reacción del mercado a las elecciones de Brasil", 38), TOP, T["brIn"] + 0.6, e, "inn"),
              ("br2", GP("Elecciones de Brasil", 40), "left:70px;top:390px;width:940px", A("a las elecciones", False) + 0.1, e, "pop"),
              ("bk0", B("¿Por qué importa el país?", 62), TOP, T["bkIn"] + 0.3, T["loan"] - 0.4, "inn"),
              ("bk1", '<div class="tag" style="position:relative;display:inline-block;font-size:24px">EJEMPLO HIPOTÉTICO</div>' + B("Un banco que presta", 62).replace('class="B "', 'class="B" ').replace('style="', 'style="margin-top:12px;', 1), TOP, T["loan"], T["curIn"] - 0.3, "inn"),
              ("bk2", GP("✓ Presta dinero", 36), "left:70px;top:470px;width:940px", A("dinero.", False) + 0.05, T["curIn"] - 0.3, "pop"),
              ("bk3", IP("✓ Clientes con ingresos", 36), "left:70px;top:550px;width:940px", A("ingresos y puedan", False) + 0.05, T["curIn"] - 0.3, "pop"),
              ("bk4", IP("✓ Que puedan pagar", 36), "left:70px;top:630px;width:940px", A("pagar.", False) + 0.05, T["curIn"] - 0.3, "pop"),
              ("cu1", B("También le afectan…", 62) + '<div style="margin-top:8px;font-weight:700;font-size:26px;color:rgba(244,238,220,.7)">Ilustrativo</div>', TOP, T["curIn"] + 0.2, T["exp"] - 0.3, "inn"),
              ("cu2", GP("Condiciones económicas", 38), "left:70px;top:440px;width:940px", A("las condiciones económicas", False) + 0.1, T["exp"] - 0.3, "pop"),
              ("cu3", IP("La moneda", 38), "left:70px;top:520px;width:940px", A("y la moneda.", False) + 0.1, T["exp"] - 0.3, "pop"),
              ("ln0", IP("Noticia política", 38), TOP, A("Una noticia política", False) + 0.05, T["qIn"] - 0.3, "pop"),
              ("ln1", B("→ cambian las expectativas", 50), "left:70px;top:380px;width:940px", A("que los inversores", False) + 0.05, T["qIn"] - 0.3, "inn"),
              ("ln2", B("→ se mueve el precio", 50), "left:70px;top:450px;width:940px", A("pueden mover el", False) + 0.05, T["qIn"] - 0.3, "inn"),
              ("ln3", B("antes del efecto real", 50, "gold"), "left:70px;top:520px;width:940px", A("que conozcamos su", False) + 0.05, T["qIn"] - 0.3, "pop"),
              ("ln4", '<div class="tag" style="position:relative;display:inline-block;font-size:30px;background:var(--ivory);color:var(--navy)">RESULTADOS · próximos trimestres</div>', "left:70px;top:1180px;width:940px", T["res"] + 0.3, T["qIn"] - 0.3, "inn"),
              ("qh", B("Tres preguntas", 72), TOP, T["qIn"], T["qAll"] - 0.3, "inn")]
        for k in range(3):
            O.append((f"qc{k}", pill(f"PREGUNTA {k+1} DE 3", 32, "var(--navy)", "var(--gold)", "border:2px solid var(--gold)"), "left:70px;top:400px;width:940px", T["qT"][k], (T["qT"][k + 1] - 0.32 if k < 2 else T["qAll"] - 0.3), "pop"))
        O += [("nc0", B("No podemos concluir…", 62), TOP, T["qAll"] + 0.1, T["ttIn"] - 0.3, "inn"),
              ("nc1", RP("✕ Una sola causa", 40), "left:70px;top:400px;width:940px", A("sola causa.", False) - 0.3, T["ttIn"] - 0.3, "pop"),
              ("nc2", RP("✕ Recuperación asegurada", 40), "left:70px;top:480px;width:940px", A("a recuperarse.", False) - 0.1, T["ttIn"] - 0.3, "pop"),
              ("tt0", '<div style="display:inline-block;padding:12px 28px;border-radius:999px;background:#7C3AED;color:#fff;font-weight:800;font-size:34px;letter-spacing:.12em">TITÁN 3.0</div>', TOP, A("de TITÁN 3.0.", False) + 0.1, T["cta"] - 0.3, "pop"),
              ("tt1", B("Entender nuestras inversiones", 58), "left:70px;top:390px;width:940px", A("nuestras inversiones,", False) - 0.2, T["cta"] - 0.3, "inn"),
              ("tt2", B("también con noticias incómodas", 58, "gold"), "left:70px;top:520px;width:940px", A("noticias incómodas.", False) - 0.2, T["cta"] - 0.3, "inn"),
              ("dock", pill("NU&nbsp;&nbsp;≈ −17 %&nbsp;&nbsp;·&nbsp;&nbsp;26 OCT 2026", 30, "rgba(11,27,51,.88)", "#FF8A80", "border:2px solid rgba(255,138,128,.7)"), "left:70px;top:1272px;width:940px", T["brIn"] - 0.25, T["cta"] - 0.3, "pop"),
              ("cta", cta_html("¿Qué empresa te gustaría entender mejor?", 84, 940), "left:70px;top:300px;width:940px", T["cta"] + 0.2, None, "inn")]
        HUD = ["Caída", "Brasil", "Banco", "Moneda", "Expectativas", "3 preguntas"]
    if V == "largo":
        X = {k: v[0] for k, v in d["secs"].items()}
        T.update(hkShake=A("la acción cae con fuerza."), hkUrna=A("Unas elecciones."), tkIn=A("Vamos a los hechos."), drop=A("cayó cerca del 17%"), others=A("Y no fue solo NU:"), fecha=A("Ojo con la fecha:"),
                 nvIn=A("Nubank es el banco digital"), nvTick=A("Nu Holdings es la empresa"), notAcc=A("Tener una cuenta"), pins=A("Según la propia empresa,"), fool1=A("Y, según The Motley Fool,"),
                 bkIn=A("Para ver la conexión,"), loan=A("Ese banco gana"), pay=A("pagar sus préstamos"), late=A("algunos clientes podrían atrasarse."), curIn=A("Si la moneda local"), curDrop=A("esos mismos 100"),
                 vias=A("Por eso, cuando un país"), fool2=A("En este caso,"), mech=A("Pero son mecanismos"),
                 exp=A("Una noticia puede cambiar"), res=A("en los resultados de los próximos trimestres."), two=A("Expectativas y resultados"),
                 spIn=A("Entonces, ¿una caída"), spDrop=A("Dos empresas caen"), sp1=A("En la primera,"), sp2=A("En la segunda,"), notDes=A("Y tampoco prueba"), quest=A("La caída es una pregunta,"),
                 qIn=A("¿Qué hacer cuando"), qT=[A("Uno:"), A("Dos:"), A("Tres:"), A("Y cuatro:")], qAll=A("Esta lista no te dice"), ttIn=A("NU forma parte"), cta=A("Y tú, ¿qué empresa"))
        SETS = ["hook", "ticket", "nuvs", "bankc", "cur", "lanes", "split", "cards", "titan"]; QL = ["Lee la noticia original", "¿Cuánto depende la empresa de ese país?", "Revisa sus resultados oficiales", "Identifica los riesgos"]; QLAB = "ANTES DE DECIDIR"
        off = -430
        SH = [dict(t0=0, set="hook", r0=11.5, r1=10.2, az0=-0.3, az1=0.2, el=0.1, ty=0.0, off=off), dict(t0=X["n"] - 0.2, set="ticket", r0=9.5, r1=8.5, az0=0.3, az1=-0.2, el=0.08, ty=-0.2, off=off),
              dict(t0=X["q"] - 0.2, set="nuvs", r0=10.5, r1=10.0, az0=-0.25, az1=0.2, el=0.12, ty=-0.2, off=off), dict(t0=X["h"] - 0.2, set="bankc", r0=11.0, r1=9.5, az0=0.4, az1=-0.2, el=0.36, ty=-0.8, off=off),
              dict(t0=T["curIn"] - 0.2, set="cur", r0=10.5, r1=9.8, az0=-0.2, az1=0.2, el=0.08, ty=-0.2, off=-300), dict(t0=T["vias"] - 0.2, set="bankc", r0=12.0, r1=11.0, az0=-0.3, az1=0.3, el=0.42, ty=-0.8, off=off),
              dict(t0=X["e"] - 0.2, set="lanes", r0=11.5, r1=10.8, az0=0.2, az1=-0.1, el=0.12, ty=0.1, off=-280), dict(t0=X["d"] - 0.2, set="split", r0=10.0, r1=9.0, az0=-0.2, az1=0.2, el=0.1, ty=-0.3, off=off),
              dict(t0=X["l"] - 0.2, set="cards", r0=5.85, r1=5.85, az0=0, az1=0, el=0.06, off=-360), dict(t0=X["z"] - 0.2, set="titan", r0=10.0, r1=9.0, az0=-0.2, az1=0.2, el=0.08, ty=0.4, off=off)]
        L = "left:100px;top:230px;width:860px"
        chips = ["EL EPISODIO", "¿QUÉ ES NU?", "EJEMPLO HIPOTÉTICO", "EXPECTATIVAS Y RESULTADOS", "¿CAÍDA = OPORTUNIDAD?", "CÓMO INVESTIGAR", "CIERRE"]
        for k, (c, s) in enumerate(zip(chips, "nqhedlz")):
            nxt = X["nqhedlz"[k + 1]] if k < 6 else None
            O.append((f"sec{k}", f'<div class="chip" style="position:relative;display:inline-block;font-size:20px">{c}</div>', "left:430px;top:56px", X[s], nxt, "chip"))
        O += [("hook", '<div class="l l1" style="font-size:96px">NU cayó</div><br/><div class="l l2" style="font-size:78px;margin-left:40px">¿Por las elecciones?</div>', "left:100px;top:250px", 0, X["n"] - 0.6, "hook"),
              ("drop", drop_html(190), L, T["drop"] + 0.3, T["fecha"] - 0.1, "pop"),
              ("oth", pill("Otros activos vinculados a Brasil también cayeron", 34), "left:100px;top:700px;width:900px", T["others"] + 0.3, X["q"] - 0.4, "inn"),
              ("fch", '<div class="B" style="font-size:66px;line-height:1.08">Episodio del<br/><span class="gold">26 de octubre de 2026</span></div><div style="margin-top:16px;font-weight:700;font-size:30px;color:rgba(244,238,220,.8)">No es la cotización actual</div>', L, T["fecha"] + 0.2, X["q"] - 0.4, "inn"),
              ("nv", '<div class="B" style="font-size:60px;line-height:1.1">Nubank<br/><span style="font-size:34px;font-family:Jakarta;color:rgba(244,238,220,.75)">el banco digital que usas</span></div><div class="B gold" style="font-size:70px;margin:18px 0">≠</div><div class="B" style="font-size:60px;line-height:1.1">Nu Holdings<br/><span style="font-size:34px;font-family:Jakarta;color:rgba(244,238,220,.75)">la acción que cotiza en bolsa</span></div>', L, T["nvTick"], T["pins"] - 0.3, "inn"),
              ("nv2", pill("Tener una cuenta ≠ ser accionista", 34, "var(--gold)"), "left:100px;top:760px;width:900px", T["notAcc"] + 0.2, T["pins"] - 0.3, "pop"),
              ("pn", '<div class="B" style="font-size:96px;line-height:1">+140 millones</div><div style="font-weight:800;font-size:34px;margin-top:12px">de personas en Brasil, México y Colombia</div><div style="font-weight:700;font-size:22px;margin-top:10px;color:rgba(244,238,220,.7)">Fuente: Nu · nu.com/en/investors</div>', L, T["pins"] + 0.4, X["h"] - 0.4, "inn"),
              ("pn2", pill("La mayor parte de sus ingresos viene de Brasil · The Motley Fool", 28), "left:100px;top:620px;width:900px", T["fool1"] + 0.3, X["h"] - 0.4, "inn"),
              ("hy", '<div class="tag" style="position:relative;display:inline-block;font-size:24px">EJEMPLO HIPOTÉTICO</div><div class="B" style="font-size:66px;margin-top:16px">Un banco que presta en su ciudad</div>', L, T["bkIn"] + 0.3, T["curIn"] - 0.3, "inn"),
              ("hy2", pill("Préstamos", 34, "var(--gold)") + " " + pill("Pagos a tiempo", 34) + "<br/><br/>" + pill("Si la economía se complica: atrasos", 32, "rgba(179,38,30,.85)", "var(--ivory)"), "left:100px;top:560px;width:900px", T["loan"] + 0.5, T["curIn"] - 0.3, "inn"),
              ("cu", '<div class="tag" style="position:relative;display:inline-block;font-size:24px">NÚMEROS INVENTADOS</div><div class="B" style="font-size:64px;line-height:1.1;margin-top:16px">100 en moneda local<br/><span class="gold">→ menos dólares</span></div><div style="font-weight:800;font-size:32px;margin-top:14px">El negocio no cambió; su valor en dólares, sí</div>', L, T["curDrop"] - 0.2, T["vias"] - 0.3, "inn"),
              ("vi", '<div class="B" style="font-size:60px">Tres vías para observar</div><div style="margin-top:22px">' + pill("Moneda", 36, "var(--gold)") + " " + pill("Economía", 36) + " " + pill("Clientes que pagan", 36) + "</div>", L, T["vias"] + 0.3, X["e"] - 0.4, "inn"),
              ("vi2", pill("Real más débil frente al dólar tras las elecciones · The Motley Fool", 26), "left:100px;top:620px;width:900px", T["fool2"] + 0.3, X["e"] - 0.4, "inn"),
              ("vi3", pill("Mecanismos, no conclusiones", 34, "var(--navy)", "var(--gold)", "border:3px solid var(--gold)"), "left:100px;top:740px;width:900px", T["mech"] + 0.3, X["e"] - 0.4, "pop"),
              ("ex1", '<div class="tag" style="position:relative;display:inline-block;font-size:26px">EXPECTATIVAS · se mueven en horas</div>', "left:100px;top:300px;width:860px", T["exp"] + 0.3, X["d"] - 0.4, "inn"),
              ("ex2", '<div class="tag" style="position:relative;display:inline-block;font-size:26px;background:var(--ivory);color:var(--navy)">RESULTADOS · próximos trimestres</div>', "left:100px;top:420px;width:860px", T["res"] + 0.3, X["d"] - 0.4, "inn"),
              ("ex3", '<div class="B" style="font-size:60px;line-height:1.1">Dos cosas distintas.<br/><span class="gold">Mira las dos.</span></div>', "left:100px;top:560px;width:860px", T["two"] + 0.2, X["d"] - 0.4, "pop"),
              ("sp0", '<div class="B" style="font-size:62px;line-height:1.1">¿Cayó ≈ 17 %…<br/><span class="gold">entonces está barata?</span></div><div class="B" style="font-size:52px;margin-top:16px">No necesariamente.</div>', L, X["d"] + 0.2, T["spDrop"] - 0.3, "inn"),
              ("sp1", '<div class="tag" style="position:relative;display:inline-block;font-size:24px">CASOS HIPOTÉTICOS</div><div class="B" style="font-size:58px;margin-top:16px">El mismo porcentaje,<br/><span class="gold">dos historias</span></div>', L, T["spDrop"] + 0.2, T["quest"] - 0.3, "inn"),
              ("sp2", pill("A · Susto del mercado, resultados firmes", 30, "rgba(46,125,79,.9)", "var(--ivory)") + "<br/><br/>" + pill("B · La noticia afectó a sus clientes", 30, "rgba(179,38,30,.88)", "var(--ivory)"), "left:100px;top:560px;width:900px", T["sp1"] + 0.3, T["quest"] - 0.3, "inn"),
              ("sp3", '<div class="B" style="font-size:72px;line-height:1.08">La caída es<br/><span class="gold">una pregunta,</span><br/>no una respuesta.</div>', L, T["quest"] + 0.1, X["l"] - 0.4, "pop"),
              ("ls", '<div class="B" style="font-size:64px">Antes de decidir</div>', L, T["qIn"], T["qAll"] - 0.3, "inn"),
              ("ls2", pill("Te ayuda a entender lo que tienes", 36, "var(--ivory)"), "left:100px;top:740px;width:900px", T["qAll"] + 0.3, X["z"] - 0.4, "pop"),
              ("tt", '<div style="display:inline-block;padding:12px 28px;border-radius:999px;background:#7C3AED;color:#fff;font-weight:800;font-size:30px;letter-spacing:.12em">TITÁN 3.0</div><div class="B" style="font-size:58px;line-height:1.1;margin-top:20px">Invertir en una empresa es también invertir en su entorno</div>', L, T["ttIn"] + 0.3, T["cta"] - 0.3, "inn"),
              ("cta", cta_html("¿Qué empresa conoces por su producto y te gustaría entender como inversión?", 62, 900), "left:100px;top:220px;width:900px", T["cta"] + 0.2, None, "inn")]
    if False:  # rótulo de avance (reemplazado por la franja de pasos) «// 03 · la conexión», cambia en cada toma
        KL = {"shorts": ["el gancho", "el dato", "el contexto", "para entender", "cierre"],
              "tiktok": ["el gancho", "el dato", "el contexto", "la conexión", "la moneda", "expectativas vs. resultados", "tres preguntas", "cierre"]}[V]
        for k, s in enumerate(SH):
            nx = SH[k + 1]["t0"] - 0.05 if k + 1 < len(SH) else None
            O.append((f"kk{k}", f'<div style="font-family:Jakarta;font-weight:800;font-size:30px;letter-spacing:.06em;color:var(--gold)">// {k+1:02d} · {KL[k]}</div>', "left:72px;top:246px;width:900px", max(0, s["t0"]), nx, "kick"))
    DUR = round(d["dur"] + (4.2 if Hz else 3.4), 2)
    for k, s in enumerate(SH): s["t1"] = SH[k + 1]["t0"] if k + 1 < len(SH) else DUR
    G = ta.groups(Wd, 4 if Hz else 3)
    P = f"{SCR}/nu-{V}"
    for sub in ["fonts", "brand", "vendor", "audio"]: os.makedirs(f"{P}/assets/{sub}", exist_ok=True)
    for sub in ["vendor", "fonts", "brand"]: shutil.copytree(f"{SCR}/tq-3d/assets/{sub}", f"{P}/assets/{sub}", dirs_exist_ok=True)
    shutil.copy(f"{SCR}/tq-3d/hyperframes.json", P)
    json.dump({"name": f"nu-{V}", "private": True, "type": "module"}, open(P + "/package.json", "w")); json.dump({"id": f"nu-{V}", "name": f"nu-{V}"}, open(P + "/meta.json", "w"))
    n = [0]
    def C(i, inner, style, cls=""):
        n[0] += 1; return f'<div id="{i}" class="clip {cls}" data-start="0" data-duration="{DUR}" data-track-index="{n[0]}" style="position:absolute;{style}">{inner}</div>'
    logo = '<div class="lg" data-layout-allow-overflow><img src="assets/brand/logo.jpg" alt="TITÁN Holding" /></div>'
    body = ['<div id="dots"></div>', C("glw", f'<canvas id="gl" width="{W_}" height="{H_}"></canvas>', f"left:0;top:0;width:{W_}px;height:{H_}px"),
            C("brand", logo + "<span>TITÁN HOLDING</span>", "left:48px;top:40px" if Hz else "left:50px;top:180px")]
    if not Hz:  # deja aire bajo el sello TITÁN HOLDING y la franja de pasos
        import re as _re
        O = [(i, h, _re.sub(r"top:(\d+)px", lambda m: f"top:{int(m.group(1)) + 46}px" if 290 <= int(m.group(1)) <= 700 else m.group(0), st), a_, b_, k) for (i, h, st, a_, b_, k) in O]
    for (i, html, st, tin, tout, kind) in O:
        body.append(C(i, html, st, "fx" if kind != "hook" else "hk"))
    if "brasil" in SETS: body.append(C("lbBR", "BRASIL", "left:0;top:0;width:220px;text-align:center;font-family:Bricolage;font-weight:800;font-size:40px;color:var(--ivory);text-shadow:0 2px 10px rgba(0,0,0,.6);transform:translate(-3000px,0)", "fx"))
    if "nuvs" in SETS:
        for k, nm in enumerate(["BRASIL", "MÉXICO", "COLOMBIA"]): body.append(C(f"lbP{k}", nm, "left:0;top:0;width:220px;text-align:center;font-family:Bricolage;font-weight:800;font-size:34px;color:var(--ivory);text-shadow:0 2px 10px rgba(0,0,0,.6);transform:translate(-3000px,0)", "fx"))
    if not Hz:
        body.append(C("hud", "".join(f'<span id="hs{k}" class="hs">{h}</span>' for k, h in enumerate(HUD)), "left:70px;top:290px;width:960px;white-space:nowrap"))
    body.append(C("flash", "", f"left:0;top:0;width:{W_}px;height:{H_}px;background:radial-gradient(circle at 50% 50%, rgba(124,58,237,.30), #0B1B33 72%);opacity:0"))
    body.append(C("caps", ta.caps_html(G, 54 if Hz else 66), "left:160px;top:910px;width:1600px;height:140px" if Hz else "left:70px;top:1360px;width:940px;height:220px"))
    OV = [[i, tin, tout, kind] for (i, h, s, tin, tout, kind) in O]
    if "brasil" in SETS: OV.append(["lbBR", T["brPin"] + 0.4, next(s["t0"] for s in SH if SH.index(s) > [x["set"] for x in SH].index("brasil")) - 0.3, "fade"])
    if "nuvs" in SETS: OV += [[f"lbP{k}", T["pins"] + 1.0 + k * 0.35, X["h"] - 0.4, "fade"] for k in range(3)]
    if V == "tiktok": HUDT = [s["t0"] for s in SH[1:]] + [DUR]
    HS = [[HUDT[k], HUDT[k + 1]] for k in range(len(HUD))] if not Hz else []
    cuts = []  # sin destello: la cámara viaja en profundidad y el siguiente set ya está a la vista
    EK = {"ticket": "tkIn", "brasil": "brIn", "bankc": "bkIn", "cur": "curIn", "lanes": "exp", "cards": "qIn", "split": "spIn", "nuvs": "nvIn", "titan": "ttIn"}
    OVER = r'''window.OVERLAYS = function (tl) {
  const inn = (s, t) => tl.fromTo(s, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", immediateRender: false }, t);
  const pop = (s, t) => tl.fromTo(s, { opacity: 0, scale: 0.84 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)", immediateRender: false }, t);
  const fade = (s, t) => tl.fromTo(s, { opacity: 0 }, { opacity: 1, duration: 0.35, immediateRender: false }, t);
  OV.forEach(([id, a, b, k]) => { const s = "#" + id;
    if (k === "hook") { tl.fromTo(s + " .l1", { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out", immediateRender: true }, a); tl.fromTo(s + " .l2", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out", immediateRender: true }, a + 0.12); }
    else if (k === "kick") tl.fromTo(s, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.25, ease: "power3.out", immediateRender: false }, a);
    else if (k === "pop") pop(s, a); else if (k === "fade") fade(s, a); else inn(s, a);
    if (b !== null && b !== undefined) tl.to(s, { opacity: 0, duration: k === "kick" ? 0.12 : 0.3, ease: "power2.in" }, b); });
  CUTS.forEach(b => { tl.fromTo("#flash", { opacity: 0 }, { opacity: 0.9, duration: 0.3, ease: "power2.in", immediateRender: false }, b - 0.3); tl.to("#flash", { opacity: 0, duration: 0.5, ease: "power2.out" }, b + 0.05); });
  HS.forEach(([a, b], k) => { const el = document.getElementById("hs" + k); tl.set(el, { attr: { class: "hs on" } }, a); tl.fromTo(el, { scale: 1.3 }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: false }, a); tl.set(el, { attr: { class: "hs done" } }, b); });
  CG.forEach(([a, b, ws], i) => { tl.set("#cg" + i, { opacity: 1 }, a); tl.set("#cg" + i, { opacity: 0 }, b);
    ws.forEach(([s, e], j) => { const el = document.getElementById("cw" + i + "_" + j), c = el.getAttribute("class"); tl.set(el, { attr: { class: c + " on" } }, s); tl.set(el, { attr: { class: c } }, e); }); });
};'''
    if not Hz:
        # el gancho vertical sale cuando entra la acción
        OV = [[i, a_, (T["tkIn"] - 0.5 if i == "hook" else b), k] for i, a_, b, k in OV]
    seen = set()
    for s in SH[1:]:  # los objetos del set entran mientras la cámara viaja hacia él
        k = EK.get(s["set"])
        if k and k in T and s["set"] not in seen: T[k] = round(min(T[k], s["t0"] - 0.5), 3)
        seen.add(s["set"])
    CSS = open(f"{H}/tq.css").read() + open(f"{H}/tq3d_extra.css").read() + ".hs{display:inline-block;padding:7px 14px;margin-right:8px;border-radius:999px;font-family:Jakarta;font-weight:800;font-size:22px;color:rgba(244,238,220,.6);border:2px solid rgba(244,238,220,.28);background:rgba(11,27,51,.6)}.hs.on{background:var(--gold);color:#0B1B33;border-color:var(--gold)}.hs.done{color:var(--gold);border-color:rgba(226,183,85,.55)}.hs.done::before{content:'✓ '}" + f"\n#gl {{ position:absolute; left:0; top:0; width:{W_}px; height:{H_}px; }}\n"
    html = f'''<!doctype html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width={W_}, height={H_}" />
<title>TITÁN · NU y las elecciones · {V}</title><script src="assets/vendor/gsap.min.js"></script>
<script type="importmap">{{"imports": {{"three": "./assets/vendor/three.module.js", "three/addons/": "./assets/vendor/jsm/"}}}}</script>
<style>{CSS}
html, body, #root {{ width:{W_}px; height:{H_}px; }}</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{DUR}" data-width="{W_}" data-height="{H_}">
{chr(10).join(body)}
<audio id="vo" src="assets/audio/mix.wav" data-start="0" data-duration="{DUR}" data-track-index="90" data-volume="1"></audio>
</div>
<script>
window.W = {W_}; window.H = {H_}; window.DUR = {DUR}; window.T = {json.dumps(T)}; window.SHOTS = {json.dumps(SH)}; window.SETLIST = {json.dumps(SETS)};
window.QLIST = {json.dumps(QL, ensure_ascii=False)}; window.QLAB = {json.dumps(QLAB, ensure_ascii=False)}; window.OV = {json.dumps(OV)}; window.CUTS = {json.dumps(cuts)};
window.HS = {json.dumps(HS)};
window.CG = {json.dumps([[a_, b, [[w[1], w[2]] for w in g]] for a_, b, g in G])};
{OVER}
</script>
<script type="module">
{open(f"{H}/nu3d.js").read()}
</script></body></html>'''
    open(P + "/index.html", "w").write(html)
    json.dump({"version": V, "duracion": DUR, "anclas": T, "tomas": SH, "subtitulos": [[a_, b, " ".join(w[0] for w in g)] for a_, b, g in G]}, open(P + "/tiempos.json", "w"), ensure_ascii=False, indent=1)
    print(V, DUR, "s", len(G), "grupos")
for V in sys.argv[1:] or ["shorts", "tiktok", "largo"]: build(V)
