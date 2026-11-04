(function () {
  // TITÁN · Demócratas y Wall Street · línea de tiempo única (MODE "tk" | "sh")
  const tl = gsap.timeline({ paused: true });
  const $$ = s => Array.from(document.querySelectorAll(s));
  const CX = 540, CY = 960, M = window.MODE, TK = M === "tk";
  const ix = nm => SC.indexOf(nm), S = nm => "#s" + ix(nm), K = nm => "#cam" + ix(nm), has = nm => ix(nm) >= 0;
  const camTo = (nm, t, dur, px, py, s, ease = "sine.inOut") => tl.to(K(nm), { x: CX - px * s, y: CY - py * s, scale: s, duration: dur, ease }, t);
  const camSet = (nm, t, px, py, s) => tl.set(K(nm), { x: CX - px * s, y: CY - py * s, scale: s }, t);
  const pop = (sel, t, from = 0.5, d = 0.45) => tl.fromTo(sel, { opacity: 0, scale: from, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d, ease: "back.out(2)", immediateRender: false }, t);
  const out = (sel, t, d = 0.25) => tl.to(sel, { opacity: 0, duration: d }, t);
  const show = (sel, t0, t1) => { tl.fromTo(sel, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out", immediateRender: false }, t0); if (t1) tl.to(sel, { opacity: 0, duration: 0.22 }, t1); };
  const loop = (fn, t0, t1, step) => { for (let t = t0, k = 0; t < t1; t += step, k++) fn(t, k); };
  const POS = {};
  const walk = (id, t0, dur, dx, step = 0.26) => {
    const x0 = POS[id] || 0, x1 = x0 + dx; POS[id] = x1;
    tl.fromTo("#" + id, { x: x0 }, { x: x1, duration: dur, ease: "none", immediateRender: false }, t0);
    const n = Math.max(2, Math.round(dur / step));
    const sw = (sel, a, b) => tl.fromTo(sel, { rotation: a }, { rotation: b, transformOrigin: "50% 3%", duration: dur / n, ease: "sine.inOut", repeat: n - 1, yoyo: true, immediateRender: false }, t0);
    sw(`#${id}-lL`, -20, 20); sw(`#${id}-lR`, 20, -20); sw(`#${id}-aL`, 16, -16); sw(`#${id}-aR`, -16, 16);
    tl.fromTo(`#${id}-bob`, { y: 0 }, { y: -7, duration: dur / n / 2, ease: "sine.inOut", repeat: n * 2 - 1, yoyo: true, immediateRender: false }, t0);
    tl.to([`#${id}-lL`, `#${id}-lR`, `#${id}-aL`, `#${id}-aR`], { rotation: 0, duration: 0.15 }, t0 + dur);
  };
  const face = (id, t, k) => ["sm", "fl", "oh"].forEach(m => tl.set(`#${id}-${m}`, { opacity: m === k ? 1 : 0 }, t));
  const jump = (id, t, h = 34) => tl.to(`#${id}-bob`, { y: -h, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, t);
  const arm = (id, side, t, rot, d = 0.3) => tl.to(`#${id}-a${side}`, { rotation: rot, transformOrigin: "50% 3%", duration: d, ease: "back.out(1.6)" }, t);
  const cheer = (id, t) => { arm(id, "L", t, 150); arm(id, "R", t, -150); jump(id, t + 0.05, 40); jump(id, t + 0.5, 30);
    tl.to(`#${id}-aR`, { rotation: -125, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, t + 0.35); arm(id, "L", t + 1.4, 0); arm(id, "R", t + 1.4, 0); };
  const shrug = (id, t) => { arm(id, "L", t, 55); arm(id, "R", t, -55); tl.to(`#${id}-h`, { rotation: 8, transformOrigin: "50% 90%", duration: 0.25, yoyo: true, repeat: 1 }, t); arm(id, "L", t + 1.1, 0); arm(id, "R", t + 1.1, 0); };
  const wave = (id, t, n = 3) => { arm(id, "R", t, -150); tl.to(`#${id}-aR`, { rotation: -120, duration: 0.18, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut" }, t + 0.3); arm(id, "R", t + 0.3 + n * 0.36, 0); };
  const talk = (id, t0, t1) => loop((t, k) => tl.to(`#${id}-a${k % 2 ? "L" : "R"}`, { rotation: k % 2 ? 40 : -40, transformOrigin: "50% 3%", duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, t), t0, t1, 0.62);
  const idle = (id, t0, t1, k = 0) => tl.fromTo(`#${id}-h`, { rotation: -3 }, { rotation: 3, transformOrigin: "50% 90%", duration: 1.3 + (k % 3) * 0.2, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 1.4)), ease: "sine.inOut", immediateRender: false }, t0);
  const sweat = (id, t) => { tl.fromTo(`#${id}-sw`, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, t); tl.to(`#${id}-sw`, { opacity: 0, y: 30, duration: 0.8, ease: "power1.in" }, t + 0.9); };
  const draw = (sel, t, d) => { const el = document.querySelector(sel), Ln = el.getTotalLength(); tl.set(el, { attr: { "stroke-dasharray": Ln, "stroke-dashoffset": Ln } }, 0); tl.to(el, { attr: { "stroke-dashoffset": 0 }, duration: d, ease: "power2.inOut" }, t); };
  const bob = (sel, t0, t1, dy = 10, d = 0.6) => tl.fromTo(sel, { y: 0 }, { y: dy, duration: d, yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / d)), ease: "sine.inOut", immediateRender: false }, t0);
  // ---- transiciones (sin cuadros vacíos: la escena nueva entra antes de que la vieja se vaya) ----
  const enter = (nm, t) => { tl.set(S(nm), { opacity: 1, x: 0 }, t); };
  const wipe = (t, a, b, fx = 540, fy = 960, tx = 540, ty = 960) => {
    tl.set("#wipe", { x: fx - 60, y: fy - 60, scale: 0.01, opacity: 1 }, t);
    tl.to("#wipe", { scale: 36, duration: 0.3, ease: "power2.in" }, t);
    tl.set(S(a), { opacity: 0 }, t + 0.3); enter(b, t + 0.3);
    tl.set("#wipe", { x: tx - 60, y: ty - 60 }, t + 0.31); tl.to("#wipe", { scale: 0.01, duration: 0.34, ease: "power2.out" }, t + 0.31); tl.set("#wipe", { opacity: 0 }, t + 0.66); };
  const whip = (t, a, b, dir = 1) => {
    enter(b, t); tl.fromTo(S(b), { x: 1080 * dir }, { x: 0, duration: 0.36, ease: "power3.inOut", immediateRender: false }, t);
    tl.to(S(a), { x: -1080 * dir, duration: 0.36, ease: "power3.inOut" }, t); tl.set(S(a), { opacity: 0, x: 0 }, t + 0.37);
    [10, -7, 4, 0].forEach((v, k) => tl.to(S(b), { rotation: v * 0.08, duration: 0.05, ease: "none" }, t + 0.36 + k * 0.05)); };
  const zoomIn = (t, a, b, px, py, s0) => { // entra por un punto de la escena a (pantalla, ventana, plato)
    camTo(a, t, 0.5, px, py, s0, "power3.in");
    tl.fromTo(S(b), { opacity: 0 }, { opacity: 1, duration: 0.2, immediateRender: false }, t + 0.36); tl.set(S(b), { x: 0 }, t + 0.36);
    tl.fromTo(K(b), { scale: 1.7, x: CX - 540 * 1.7, y: CY - 960 * 1.7 }, { scale: 1, x: 0, y: 0, duration: 0.55, ease: "power3.out", immediateRender: false }, t + 0.36);
    tl.set(S(a), { opacity: 0 }, t + 0.6); };

  // ---- estado inicial y vida constante ----
  SC.forEach((nm, k) => { if (k) tl.set(S(nm), { opacity: 0 }, 0); });
  tl.set("#wipe", { opacity: 0 }, 0);
  loop(t => tl.to(".eyeb", { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.07, yoyo: true, repeat: 1 }, t), 1.2, DUR, 2.7);
  $$(".st,.st2").forEach((s, i) => tl.to(s, { opacity: 0.15, duration: 0.6 + (i % 4) * 0.2, yoyo: true, repeat: Math.floor(DUR / 0.9), ease: "sine.inOut" }, (i % 5) * 0.2));
  $$(".wcl,.pcl,.bcl").forEach((c, i) => tl.fromTo(c, { x: 0 }, { x: 120 + (i % 3) * 40, duration: DUR, ease: "none" }, 0));
  $$(".flg").forEach((f, i) => tl.to(f, { skewY: 8, scaleX: 0.92, transformOrigin: "0% 50%", duration: 0.5, yoyo: true, repeat: Math.floor(DUR / 0.5), ease: "sine.inOut" }, i * 0.15));
  $$(".bw2").forEach((w, i) => { if (i % 4 === 1) tl.to(w, { opacity: 0.25, duration: 0.08, yoyo: true, repeat: 1 }, 1 + i * 1.7 % DUR); });
  tl.fromTo("#tkm", { x: 120 }, { x: -1500, duration: TK ? 16 : 10, ease: "none" }, 0);

  // ================= escenas =================
  function hook(t0, t1) { // votantes en fila frente al Capitolio
    camSet("hook", 0, 540, 960, 1.12); camTo("hook", 0, t1 - t0, 560, 930, 1.02);
    walk("v1", 0, 3.4, 110); walk("v2", 0.2, 3.2, 110); idle("v3", 0, t1);
    arm("v3", "R", 0.15, -70, 0.25);
    tl.to("#hkBal", { x: 133, y: 40, rotation: 20, duration: 0.55, ease: "power1.inOut" }, 0.45);
    tl.to("#hkBal", { y: 70, scale: 0.6, opacity: 0, duration: 0.25, ease: "power2.in" }, 1.0);
    tl.to("#urna", { scaleY: 0.92, scaleX: 1.05, transformOrigin: "50% 100%", duration: 0.1, yoyo: true, repeat: 1 }, 1.2);
    arm("v3", "R", 1.1, 0); jump("v3", 1.3);
    tl.fromTo("#hkArr", { opacity: 0, y: 120, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(2)", immediateRender: false }, 0.9);
    bob("#hkArr", 1.4, t1, -14, 0.5);
    tl.to("#hkGlow", { scale: 1.12, transformOrigin: "50% 50%", duration: 0.8, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0);
    cheer("v1", 2.2); face("v2", 2.0, "sm");
  }
  function wall(t0, t1) { // BOLSA: gente que pasa; ¿vota la bolsa?
    camSet("wall", t0, 540, 980, 1.0);
    POS.wP1 = 0; POS.wP2 = 0; walk("wP1", t0, Math.min(6, t1 - t0), 700, 0.3); walk("wP2", t0 + 0.4, Math.min(6, t1 - t0 - 0.4), 760, 0.3);
    idle("wT", t0, t1, 1);
    if (TK) {
      tl.set("#wBal", { opacity: 1 }, t0); arm("wT", "R", t0 + 0.05, -60, 0.2);
      pop("#wQ", T.t2 + 0.5); bob("#wQ", T.t2 + 1, T.t3, -8, 0.4); face("wT", T.t2 + 0.4, "fl");
      camTo("wall", T.t2 + 0.2, 1.5, 560, 1040, 1.2);
      out("#wQ", T.t3); tl.to("#wBal", { y: 160, rotation: 90, opacity: 0, duration: 0.5, ease: "power2.in" }, T.t3 + 0.1); arm("wT", "R", T.t3 + 0.1, 0);
      camTo("wall", T.t3, 1.2, 540, 960, 0.98);
      tl.fromTo("#wsArr", { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(2)", immediateRender: false }, T.repunte - 0.2);
      bob("#wsArr", T.repunte + 0.4, t1, -12, 0.45);
      face("wT", T.repunte, "sm"); cheer("wT", T.repunte + 0.1); cheer("wP1", T.repunte + 0.5);
      camTo("wall", T.repunte + 1.2, t1 - T.repunte - 1.2, 540, 1010, 1.07);
    } else {
      tl.set("#wsArr", { opacity: 1 }, 0); bob("#wsArr", 0, T.cuidado, -12, 0.45);
      cheer("wT", 0.5); cheer("wP2", 1.2); camSet("wall", 0, 520, 880, 1.1); camTo("wall", 0, 3.6, 560, 880, 1.1);
      face("wT", T.cuidado, "fl"); arm("wT", "R", T.cuidado, -95, 0.25); pop("#wWarn", T.cuidado + 0.1); bob("#wWarn", T.cuidado + 0.6, t1, -8, 0.4);
      camTo("wall", T.cuidado - 0.1, 0.7, 520, 1040, 1.3, "power3.out");
    }
  }
  function split(t0, t1) { // futuros de noche vs sesión de día
    camSet("split", t0, 540, 920, 1.0);
    idle("fN", t0, t1, 2); idle("fS", t0, t1, 3);
    draw("#spRp", t0 + 0.4, 1.3); jump("fS", t0 + 1.2); face("fS", t0 + 1.2, "sm");
    camTo("split", T.sorpresa, 1.0, 330, 900, 1.22);
    draw("#spLp", T.sorpresa + 0.9, 1.6); face("fN", T.caido - 0.4, "oh"); sweat("fN", T.caido - 0.2);
    tl.to("#fNph", { rotation: -10, transformOrigin: "50% 100%", duration: 0.12, yoyo: true, repeat: 5 }, T.caido - 0.3);
    camTo("split", T.t5 - 0.2, 0.7, 540, 930, 1.02);
    pop("#spQ1", T.t5); pop("#spQ2", T.t5 + 0.2); face("fS", T.t5, "fl"); face("fN", T.t5 + 0.3, "fl");
    tl.to(["#fN-h", "#fS-h"], { rotation: 10, transformOrigin: "50% 90%", duration: 0.3 }, T.t5 + 0.1);
  }
  function power(t0, t1, tNeg, tTalk) { // presidencia ≠ congreso, mensajero, mesa
    camSet("power", t0, 540, 920, 1.0); camTo("power", t0, tNeg - t0, 540, 900, 1.05);
    idle("nA", t0, t1, 0); idle("nB", t0, t1, 1); idle("mM", t0, tNeg, 2);
    pop("#lbP", t0 + 0.3); pop("#lbC", t0 + 0.8);
    pop("#neq", TK ? T.reparto : T.repar); tl.to("#neq", { scale: 1.15, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, (TK ? T.reparto : T.repar) + 0.5);
    if (TK) { tl.to("#lbP", { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1 }, T.rep); tl.to("#lbC", { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1 }, T.dem); }
    else { tl.to("#lbP", { scale: 1.12, duration: 0.2, yoyo: true, repeat: 1 }, t0 + 1.4); }
    // el mensajero lleva la propuesta a la mesa
    tl.set("#doc", { opacity: 1 }, t0); bob("#doc", t0, tNeg, -4, 0.3);
    out(["#lbP", "#lbC", "#neq"], tNeg - 0.3);
    arm("mM", "R", tNeg + 0.6, -130, 0.3); jump("mM", tNeg + 0.6, 16);
    tl.to("#doc", { x: 290, duration: 1.0, ease: "power1.inOut" }, tNeg + 0.75);
    tl.to("#doc", { y: -160, duration: 0.5, ease: "power2.out" }, tNeg + 0.75); tl.to("#doc", { y: 70, rotation: -6, duration: 0.5, ease: "power2.in" }, tNeg + 1.25);
    arm("mM", "R", tNeg + 1.3, 0);
    camTo("power", tNeg, 1.6, 540, 1110, 1.35);
    pop("#gr1", tNeg + 1.9); pop("#gr2", tNeg + 2.0);
    tl.to("#gr1", { rotation: 360 * 3, transformOrigin: "50% 50%", duration: t1 - tNeg - 2, ease: "none" }, tNeg + 2);
    tl.to("#gr2", { rotation: -360 * 4, transformOrigin: "50% 50%", duration: t1 - tNeg - 2, ease: "none" }, tNeg + 2);
    talk("nA", tNeg + 1.9, t1 - 0.4); talk("nB", tNeg + 2.2, t1 - 0.4); face("nA", tNeg + 2, "fl"); face("nB", tNeg + 2.4, "fl");
    walk("mM", tNeg + 2.3, 1.6, -420); face("mM", tNeg + 2.3, "sm");
    if (tTalk) { face("nA", tTalk, "sm"); face("nB", tTalk + 0.2, "sm"); jump("nA", tTalk + 0.6, 20); camTo("power", tTalk, t1 - tTalk, 540, 1070, 1.2); }
  }
  function interp(t0, t1) {
    camSet("interp", t0, 540, 960, 1.0); camTo("interp", t0, t1 - t0, 520, 990, 1.07);
    tl.set("#beam", { rotation: -8, transformOrigin: "430px 12px" }, 0);
    tl.set(["#wL", "#wR"], { rotation: 8, transformOrigin: "130px -80px" }, 0);
    tl.to("#beam", { rotation: 9, duration: 1.4, ease: "elastic.out(1,0.5)" }, T.sorpr - 0.4);
    tl.to(["#wL", "#wR"], { rotation: -9, duration: 1.4, ease: "elastic.out(1,0.5)" }, T.sorpr - 0.4);
    idle("iV", t0, t1, 4); tl.to("#iV-h", { rotation: 6, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, T.sorpr + 0.8); face("iV", T.sorpr + 0.8, "sm");
    pop("#iQ", T.t9); out("#iQ", T.t9 + 1.2); pop("#cv1", T.conflic - 0.1); pop("#cv2", T.garant); face("iV", T.garant, "fl"); shrug("iV", T.garant + 0.3);
    tl.to("#beam", { rotation: 3, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: 1 }, T.garant + 0.2);
  }
  function biz(t0, t1, tR, labT) { // tres negocios; tR: reacciones distintas; labT: [imp, reg, cli]
    camSet("biz", t0, 540, 960, 1.0);
    ["o0", "o1", "o2"].forEach((o, k) => idle(o, t0, t1, k));
    tl.fromTo("#bcar", { x: -200 }, { x: 1300, duration: 6, ease: "none", immediateRender: false }, t0 + 0.2);
    wave("o1", t0 + 0.3, 2);
    labT.forEach((t, k) => { pop("#bl" + k, t); pop(`#bz${k} ~ g .ic`, t + 0.15); tl.to("#bz" + k, { scaleY: 1.06, scaleX: 0.97, transformOrigin: "50% 100%", duration: 0.15, yoyo: true, repeat: 1 }, t); jump("o" + k, t + 0.2, 18); });
    $$(".ic").forEach((c, k) => tl.to(c, { y: -10, duration: 0.5, yoyo: true, repeat: Math.floor((t1 - labT[k]) / 0.5), ease: "sine.inOut" }, labT[k] + 0.6));
    camTo("biz", t0, t1 - t0, 540, 940, 1.05);
    pop("#rx0", tR); face("o0", tR, "sm"); cheer("o0", tR + 0.1);
    pop("#rx1", tR + 0.6); face("o1", tR + 0.6, "fl"); shrug("o1", tR + 0.7);
    pop("#rx2", tR + 1.2); face("o2", tR + 1.2, "oh"); sweat("o2", tR + 1.3);
    tl.to("#rx2", { y: 12, duration: 0.3, yoyo: true, repeat: 3 }, tR + 1.6); tl.to("#rx0", { y: -12, duration: 0.3, yoyo: true, repeat: 3 }, tR + 0.4);
  }
  function chart(t0, t1, tQ, tL) { // línea verde → «?»
    camSet("chart", t0, 540, 920, 1.0); camTo("chart", t0, t1 - t0, 540, 900, 1.06);
    draw("#chL", t0 + 0.15, TK ? 2.2 : 1.0); idle("cV", t0, t1, 5); face("cV", t0 + 0.6, "sm");
    POS.cW = 0; walk("cW", t0 + 0.1, 2.2, 340);
    if (tL) { tl.fromTo("#lupa2", { opacity: 0, x: 0, y: 0 }, { opacity: 1, x: -420, y: -560, duration: 0.8, ease: "power2.out", immediateRender: false }, tL);
      tl.to("#lupa2", { x: -60, y: -620, duration: 2.6, ease: "sine.inOut" }, tL + 0.8); tl.to("#lupa2", { opacity: 0, duration: 0.3 }, tQ); arm("cV", "R", tL, -140); arm("cV", "R", tL + 2.2, 0); }
    tl.to("#chL", { opacity: 0.12, duration: 0.4 }, tQ);
    tl.fromTo("#chQ", { opacity: 0, scale: 0.3, transformOrigin: "50% 70%" }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)", immediateRender: false }, tQ + 0.1);
    tl.to("#chQ", { rotation: 6, transformOrigin: "50% 70%", duration: 0.4, yoyo: true, repeat: Math.floor((t1 - tQ - 0.6) / 0.4), ease: "sine.inOut" }, tQ + 0.6);
    face("cV", tQ, "oh"); jump("cV", tQ + 0.1, 16); shrug("cW", tQ + 0.5); face("cW", tQ + 0.5, "fl");
  }
  function end(t0, t1, tC) {
    camSet("end", t0, 540, 980, 1.08); camTo("end", t0, t1 - t0, 540, 1000, 1.0);
    POS.eR = 0; walk("eR", t0 + 0.1, 1.4, 220); idle("eR", t0 + 1.6, t1, 2);
    tl.fromTo("#enLupa", { x: -240, y: -80 }, { x: 40, y: 0, duration: 1.4, yoyo: true, repeat: Math.floor((tC - t0) / 1.4), ease: "sine.inOut", immediateRender: false }, t0 + 0.3);
    tl.to("#enGlow", { scale: 1.1, transformOrigin: "50% 50%", duration: 1, yoyo: true, repeat: Math.floor((t1 - t0) / 1), ease: "sine.inOut" }, t0);
    tl.to("#brand", { scale: 1.08, transformOrigin: "0% 50%", duration: 0.3, yoyo: true, repeat: 1 }, t0 + 0.4);
    face("eR", tC, "sm"); wave("eR", tC + 0.2, 3); tl.to("#enLupa", { x: 60, y: -40, duration: 0.5 }, tC);
    tl.to("#ctaBtn", { scale: 1.06, transformOrigin: "50% 50%", duration: 0.45, yoyo: true, repeat: Math.floor((t1 - tC - 1) / 0.45), ease: "sine.inOut" }, tC + 0.8);
  }

  // ================= guion por formato =================
  if (TK) {
    hook(0, T.t2);
    whip(T.t2 - 0.3, "hook", "wall"); wall(T.t2 - 0.3, T.t4);
    zoomIn(T.t4 - 0.4, "wall", "split", 540, 1095, 6); split(T.t4 - 0.05, T.t6);
    wipe(T.t6 - 0.35, "split", "power", 540, 860); power(T.t6 - 0.05, T.t8, T.negoc - 2.4, null);
    whip(T.t8 - 0.3, "power", "interp"); interp(T.t8 - 0.3, T.t10);
    zoomIn(T.t10 - 0.4, "interp", "biz", 716, 1140, 5); biz(T.t10 - 0.05, T.t12, T.t11 + 0.2, [T.imp - 0.1, T.reg - 0.1, T.cli - 0.1]);
    tl.to(".bw2", { opacity: 0.4, duration: 0.15, yoyo: true, repeat: 3, stagger: 0.05 }, T.persp);
    whip(T.t12 - 0.3, "biz", "chart", -1); chart(T.t12 - 0.3, T.t15, T.t14 + 0.2, T.t13);
    wipe(T.t15 - 0.35, "chart", "end", 540, 820); end(T.t15 - 0.05, DUR, T.t16);
  } else {
    wall(0, T.s3);
    wipe(T.s3 - 0.35, "wall", "power", 540, 1000); power(T.s3 - 0.05, T.s6, T.s4 + 0.4, T.valorar - 0.2);
    whip(T.s6 - 0.3, "power", "chart"); chart(T.s6 - 0.3, T.s7, T.demuestra, null);
    zoomIn(T.s7 - 0.4, "chart", "biz", 540, 880, 5); biz(T.s7 - 0.05, T.s10, T.s7 + 1.0, [T.imp - 0.1, T.reg - 0.1, T.cli - 0.1]);
    ["o0", "o1", "o2"].forEach((o, k) => wave(o, T.s8 + 0.2 + k * 0.25, 2));
    wipe(T.s10 - 0.35, "biz", "end", 540, 900); end(T.s10 - 0.05, DUR, T.s11);
  }

  // ================= capa de texto =================
  OV.forEach(([id, a, b], k) => { if (a > 0) show("#" + id, a, b); else out("#" + id, b, 0.22); });
  TAGS.forEach(([id, a, b]) => show("#" + id, a, b));
  out("#src", SRC[1]);
  const tC = TK ? T.t16 : T.s11; show("#cta", tC);
  const HT = TK ? [0, T.t2, T.t6, T.t8, T.t10, T.t12] : [0, T.s3, T.s6, T.s7, T.s10];
  HT.forEach((t, k) => { const el = document.getElementById("hs" + k);
    if (k) tl.set(document.getElementById("hs" + (k - 1)), { attr: { class: "hs done" } }, t);
    tl.set(el, { attr: { class: "hs on" } }, t); if (t > 0) tl.fromTo(el, { scale: 1.3 }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: false }, t); });
  CG.forEach(([a, b, ws], i) => { tl.set("#cg" + i, { opacity: 1 }, a); tl.set("#cg" + i, { opacity: 0 }, b);
    ws.forEach(([s, e], j) => { const el = document.getElementById("cw" + i + "_" + j), c = el.getAttribute("class"); tl.set(el, { attr: { class: c + " on" } }, s); tl.set(el, { attr: { class: c } }, e); }); });
  tl.to({}, { duration: 0.01 }, DUR - 0.01);
  window.__timelines = window.__timelines || {}; window.__timelines["main"] = tl;
})();
