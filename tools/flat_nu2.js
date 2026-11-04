  // =================== PARTE 2 · TikTok completo (17 s → final) ===================
  const POS = {};
  const walk = (id, t0, dur, dx, step = 0.24) => {
    const x0 = POS[id] || 0, x1 = x0 + dx; POS[id] = x1;
    tl.fromTo("#" + id, { x: x0 }, { x: x1, duration: dur, ease: "none", immediateRender: false }, t0);
    const n = Math.max(2, Math.round(dur / step));
    const sw = (sel, a, b, org) => tl.fromTo(sel, { rotation: a }, { rotation: b, transformOrigin: org, duration: dur / n, ease: "sine.inOut", repeat: n - 1, yoyo: true, immediateRender: false }, t0);
    sw(`#${id}-lL`, -20, 20, "50% 0%"); sw(`#${id}-lR`, 20, -20, "50% 0%"); sw(`#${id}-aL`, 16, -16, "50% 4%"); sw(`#${id}-aR`, -16, 16, "50% 4%");
    tl.fromTo(`#${id}-bob`, { y: 0 }, { y: -7, duration: dur / n / 2, ease: "sine.inOut", repeat: n * 2 - 1, yoyo: true, immediateRender: false }, t0);
    tl.to([`#${id}-lL`, `#${id}-lR`, `#${id}-aL`, `#${id}-aR`], { rotation: 0, duration: 0.15 }, t0 + dur);
  };
  const face = (id, t, k) => { // k: "sm" | "fl" | "oh"
    ["sm", "fl", "oh"].forEach(m => tl.set(`#${id}-${m}`, { opacity: m === k ? 1 : 0 }, t)); };
  const jump = (id, t) => tl.to(`#${id}-bob`, { y: -34, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, t);
  const fly = (sel, t, x0, y0, x1, y1, d = 0.6, arc = 120) => { // moneda en arco
    tl.set(sel, { opacity: 1 }, t);
    tl.fromTo(sel, { x: x0, y: y0, scale: 0.3 }, { x: x1, scale: 1, duration: d, ease: "none", immediateRender: false }, t);
    tl.fromTo(sel, { y: y0 }, { y: Math.min(y0, y1) - arc, duration: d / 2, ease: "power2.out", immediateRender: false }, t);
    tl.to(sel, { y: y1, duration: d / 2, ease: "power2.in" }, t + d / 2);
    tl.to(sel, { opacity: 0, duration: 0.12 }, t + d); };
  const show = (sel, t0, t1) => { tl.fromTo(sel, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out", immediateRender: false }, t0); if (t1) tl.to(sel, { opacity: 0, duration: 0.25 }, t1); };
  const wipe = (t, fx, fy, tx, ty, swapOut, swapIn) => { // círculo dorado que se transforma
    tl.set("#wipe", { x: fx - 60, y: fy - 60, scale: 0.01, opacity: 1 }, t);
    tl.to("#wipe", { scale: 36, duration: 0.32, ease: "power2.in" }, t);
    tl.set(swapOut, { opacity: 0 }, t + 0.32); tl.set(swapIn, { opacity: 1 }, t + 0.32);
    tl.set("#wipe", { x: tx - 60, y: ty - 60 }, t + 0.33);
    tl.to("#wipe", { scale: 0.01, duration: 0.36, ease: "power2.out" }, t + 0.33); tl.set("#wipe", { opacity: 0 }, t + 0.7); };
  tl.set(["#s5", "#s6", "#s7", "#s8", "#s9", "#s10", "#wipe"], { opacity: 0 }, 0);
  tl.set("[id^=lc],[id^=sc],[id^=pc]", { opacity: 0 }, 0);
  $$(".npr,.cl").forEach(() => 0);
  // parpadeo de todos los personajes
  loop((t, k) => { tl.to(".eyeb", { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.07, yoyo: true, repeat: 1 }, t); }, 18.1, DUR, 2.9);

  // ---------- 17.2 del pin de Brasil a la calle del banco ----------
  camTo("#cam4", T.por - 0.05, 0.55, PIN[0], PIN[1] - 40, 5, "power3.in");
  tl.set("#lbBR", { opacity: 0 }, T.por);
  tl.set("#s5", { opacity: 1 }, T.por + 0.42); tl.set("#s4", { opacity: 0 }, T.por + 0.5);
  camSet("#cam5", T.por + 0.42, 540, 900, 1.9); camTo("#cam5", T.por + 0.42, 0.7, 520, 930, 1.3, "power3.out");
  POS.fA = 0; POS.fB = 0; POS.fC = 0;
  walk("fC", T.por, 7.5, 1200, 0.3); walk("fB", T.por + 0.5, 5.5, -700, 0.3);
  tl.fromTo("#car2", { x: -200 }, { x: 2300, duration: 4.5, ease: "none", immediateRender: false }, T.por + 0.2);
  tl.fromTo("#car2", { x: 2300 }, { x: -200, duration: 4.0, ease: "none", immediateRender: false }, T.ingresos + 1.0);
  $$(".cl").forEach((c, i) => tl.fromTo(c, { x: 0 }, { x: 140 + i * 30, duration: 12, ease: "none", immediateRender: false }, T.por));
  // A camina al banco
  walk("fA", T.piensa + 0.05, 1.6, 340);
  camTo("#cam5", T.piensa, 1.8, 560, 930, 1.35);
  $$("[id^=lc]").forEach((c, i) => fly(c, T.dinero - 0.2 + i * 0.12, 0, 0, -30 - i * 6, -100, 0.55, 90));
  jump("fA", T.dinero + 0.35); show("#lbl1", T.dinero - 0.1, T.interesa + 0.3);
  // A va a trabajar y cobra
  walk("fA", T.interesa, 2.0, 850);
  camTo("#cam5", T.interesa, 2.2, 1360, 930, 1.35);
  $$("[id^=sc]").forEach((c, i) => fly(c, T.ingresos - 0.1 + i * 0.12, 0, 0, -10 - i * 6, -60, 0.55, 70));
  show("#lbl2", T.ingresos, T.pagar + 0.2); jump("fA", T.ingresos + 0.5);
  // vuelve y paga
  walk("fA", T.ingresos + 0.75, 1.3, -780);
  camTo("#cam5", T.ingresos + 0.7, 1.4, 680, 930, 1.35);
  $$("[id^=pc]").forEach((c, i) => fly(c, T.pagar - 0.05 + i * 0.1, -509, -80, -560, 20, 0.5, 80));
  pop("#bchk", T.pagar + 0.35, 0.3); show("#lbl3", T.pagar + 0.3, T.tamb + 0.3);
  // ---------- 25.9 la economía se complica ----------
  tl.to("#storm", { opacity: 1, duration: 0.8 }, T.tamb); tl.to("#sun", { opacity: 0, duration: 0.5 }, T.tamb);
  tl.fromTo("#dclouds", { opacity: 0, x: 300 }, { opacity: 1, x: 0, duration: 1.0, ease: "power2.out", immediateRender: false }, T.tamb);
  tl.to("#rain", { opacity: 1, duration: 0.4 }, T.tamb + 0.5);
  tl.fromTo(".rd", { y: -60 }, { y: 60, duration: 0.35, ease: "none", repeat: 9, immediateRender: false }, T.tamb + 0.5);
  camTo("#cam5", T.tamb, 1.2, 1050, 930, 1.2);
  pop("#closed", T.condic + 0.1, 0.4); face("fA", T.condic, "fl");
  tl.to(["#fA-aL"], { rotation: 8, transformOrigin: "50% 4%", duration: 0.4 }, T.condic); tl.to(["#fA-aR"], { rotation: -8, transformOrigin: "50% 4%", duration: 0.4 }, T.condic);
  tl.to("#fA-h", { y: 10, duration: 0.4 }, T.condic);
  // ---------- 28.4 la moneda: círculo dorado → balanza ----------
  wipe(T.moneda - 0.35, 540, 900, 870, 780, "#s5", "#s6");
  tl.fromTo("#rcoin", { scale: 1 }, { scale: 0.62, transformOrigin: "50% 50%", duration: 0.5, ease: "back.in(2)", immediateRender: false }, T.moneda + 0.15);
  tl.to("#beam2", { rotation: 9, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(2)" }, T.moneda + 0.4);
  // ---------- 29.4 noticia política (barrido) ----------
  const wp = T.noticia - 0.2;
  tl.to("#s6", { x: -1080, filter: "blur(10px)", duration: 0.3, ease: "power2.in" }, wp);
  tl.set("#s7", { opacity: 1 }, wp + 0.05); camSet("#cam7", wp, 540, 880, 1.0);
  tl.fromTo("#s7", { x: 1080, filter: "blur(10px)" }, { x: 0, filter: "blur(0px)", duration: 0.35, ease: "power2.out", immediateRender: false }, wp + 0.05);
  tl.set("#s6", { opacity: 0 }, wp + 0.35);
  tl.fromTo("#tvon", { opacity: 0 }, { opacity: 1, duration: 0.06, repeat: 3, yoyo: true, immediateRender: false }, T.noticia + 0.05); tl.set("#tvon", { opacity: 1 }, T.noticia + 0.35);
  ["i1", "i2", "i3"].forEach((id, k) => { face(id, T.noticia + 0.5 + k * 0.1, "oh"); tl.to(`#${id}-br`, { y: -8, duration: 0.2 }, T.noticia + 0.5 + k * 0.1); });
  ["#tb0", "#tb1", "#tb2"].forEach((s, k) => { pop(s, T.invers + k * 0.25, 0.3); tl.to(s, { y: -12, duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, T.invers + 0.5 + k * 0.25); });
  camTo("#cam7", T.esas - 0.1, 1.0, 760, 880, 1.0);
  pop("#boardi", T.esas, 0.5);
  tl.to("#barr", { y: 60, duration: 0.5, ease: "power2.in" }, T.mover); tl.to("#boardi", { rotation: 4, transformOrigin: "50% 0%", duration: 0.12, yoyo: true, repeat: 3 }, T.mover + 0.4);
  ["#tb0", "#tb1", "#tb2"].forEach(s => tl.to(s, { opacity: 0, duration: 0.2 }, T.mover));
  POS.i1 = 0; POS.i2 = 0; POS.i3 = 0;
  ["i1", "i2", "i3"].forEach((id, k) => walk(id, T.mover + 0.2 + k * 0.08, 1.6, 900, 0.14));
  camTo("#cam7", T.antes - 0.2, 1.4, 1620, 1000, 1.25);
  tl.fromTo("#truck", { x: 0 }, { x: 420, duration: T.negocio + 0.8 - (T.antes - 0.4), ease: "none", immediateRender: false }, T.antes - 0.4);
  tl.to("#truck", { y: -3, duration: 0.12, yoyo: true, repeat: 30, ease: "sine.inOut" }, T.antes - 0.4);
  // ---------- 40 tres preguntas: entramos al edificio NEGOCIO ----------
  const zq = T.poreso - 0.45;
  camTo("#cam7", zq, 0.5, 2100, 1000, 4.5, "power3.in");
  tl.set("#s8", { opacity: 1 }, zq + 0.42); tl.set("#s7", { opacity: 0 }, zq + 0.5);
  camSet("#cam8", zq + 0.42, 540, 880, 1.6); camTo("#cam8", zq + 0.42, 0.6, 540, 900, 1.0, "power3.out");
  const qs = [[T.q1, "#q1i", 800, 560, "#qk0"], [T.q2, "#q2i", 800, 790, "#qk1"], [T.q3, "#q3i", 800, 960, "#qk2"]];
  qs.forEach(([t, s, x, y, k], i) => {
    pop(s, t - 0.15, 0.5); tl.set("#lupa", { opacity: 1 }, t - 0.1);
    tl.to("#lupa", { attr: { transform: `translate(${x} ${y}) scale(.75)` }, duration: 0.35, ease: "power2.inOut" }, t - 0.1);
    tl.to("#lupai", { x: 20, y: -10, duration: 0.25, yoyo: true, repeat: 2, ease: "sine.inOut" }, t + 0.25);
    pop(k, t + 0.6, 0.3);
    tl.to("#fD-aR", { rotation: -35, transformOrigin: "50% 4%", duration: 0.25, yoyo: true, repeat: 1 }, t + 0.1);
    tl.to("#fD-h", { rotation: [-8, 0, 8][i], transformOrigin: "50% 90%", duration: 0.3 }, t - 0.1);
  });
  tl.to("#gear", { rotation: 360, transformOrigin: "50% 50%", duration: 3, ease: "none" }, T.q2);
  // ---------- 48 no podemos concluir (barrido vertical) ----------
  const wc = T.noconc - 0.2;
  tl.to("#s8", { y: -600, opacity: 0, filter: "blur(8px)", duration: 0.32, ease: "power2.in" }, wc);
  tl.set("#s9", { opacity: 1 }, wc + 0.05);
  tl.fromTo("#s9", { y: 700, filter: "blur(8px)" }, { y: 0, filter: "blur(0px)", duration: 0.38, ease: "power2.out", immediateRender: false }, wc + 0.05);
  camSet("#cam9", wc, 540, 900, 1.0); camTo("#cam9", wc, 6, 520, 880, 1.08, "sine.inOut");
  tl.to("#fQ-h", { rotation: 10, transformOrigin: "50% 90%", duration: 0.4 }, T.noconc + 0.2);
  tl.fromTo("#sg1 .xs", { opacity: 0, scale: 1.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.25, ease: "power4.in", immediateRender: false }, T.causa - 0.35);
  tl.fromTo("#sg2 .xs", { opacity: 0, scale: 1.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.25, ease: "power4.in", immediateRender: false }, T.recup - 0.2);
  [T.causa - 0.1, T.recup + 0.05].forEach(t => [10, -8, 5, 0].forEach((v, k) => tl.to("#cam9", { rotation: v * 0.1, duration: 0.05 }, t + k * 0.05)));
  tl.to("#fQ-aL", { rotation: 55, transformOrigin: "50% 4%", duration: 0.3, ease: "back.out(2)" }, T.recup + 0.2);
  tl.to("#fQ-aR", { rotation: -55, transformOrigin: "50% 4%", duration: 0.3, ease: "back.out(2)" }, T.recup + 0.2);
  face("fQ", T.recup + 0.2, "fl");
  $$(".qm").forEach((q, i) => { tl.fromTo(q, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, T.recup + 0.3 + i * 0.15); tl.to(q, { y: -20, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, T.recup + 0.6 + i * 0.15); });
  // ---------- 54 TITÁN 3.0: el «?» se vuelve la moneda TITÁN ----------
  wipe(T.nuforma - 0.4, 330, 860, 540, 560, "#s9", "#s10");
  pop("#binder", T.nuforma - 0.05, 0.6);
  tl.set("#bfront", { transformOrigin: "50% 0%" }, 0);
  tl.to("#bfront", { scaleY: 0.12, duration: 0.45, ease: "power2.inOut" }, T.nuforma + 0.5); tl.to("#bt", { opacity: 0, duration: 0.2 }, T.nuforma + 0.45);
  $$(".pcard").forEach((c, i) => tl.fromTo(c, { opacity: 0, y: 220 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)", immediateRender: false }, T.nuforma + 0.7 + i * 0.14));
  tl.to(".pcard:first-of-type", { y: -30, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, T.titan - 0.2);
  tl.fromTo("#logo", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)", immediateRender: false }, T.titan);
  tl.to("#glow", { scale: 1.15, transformOrigin: "50% 50%", duration: 1.1, yoyo: true, repeat: 7, ease: "sine.inOut" }, T.titan);
  tl.to("#fT-h", { rotation: -6, transformOrigin: "50% 90%", duration: 0.4, yoyo: true, repeat: 3 }, T.aqui);
  pop("#cloud2", T.incom - 0.9, 0.6);
  $$(".npr").forEach((n, i) => { tl.fromTo(n, { opacity: 0, y: 0, rotation: 0 }, { opacity: 1, y: 230, rotation: 30 - i * 25, duration: 1.1, ease: "power1.in", repeat: 1, immediateRender: false }, T.incom - 0.6 + i * 0.25); });
  tl.set(".npr", { opacity: 0 }, T.cta + 0.05);
  tl.fromTo("#umb", { opacity: 0, scale: 0.1, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, T.incom - 0.2);
  tl.to("#fT-aR", { rotation: -40, transformOrigin: "50% 4%", duration: 0.3 }, T.incom - 0.25);
  tl.to(["#binder", "#logo"], { y: -60, opacity: 0.35, duration: 0.6 }, T.incom - 0.9);
  // CTA: saluda
  tl.to("#umb", { opacity: 0, y: -80, duration: 0.4 }, T.cta - 0.2); tl.to(["#cloud2", ".npr"], { opacity: 0, duration: 0.3 }, T.cta - 0.2);
  tl.to("#fT-aR", { rotation: -150, duration: 0.35, ease: "back.out(2)" }, T.cta);
  tl.to("#fT-aR", { rotation: -125, duration: 0.25, yoyo: true, repeat: 7, ease: "sine.inOut" }, T.cta + 0.35);
  tl.to(["#binder", "#logo"], { opacity: 0, duration: 0.3 }, T.cta - 0.2);
  // titulares por escena y franja de avance
  OV2.forEach(([id, a, b]) => show("#" + id, a, b));
  [[1, 2, T.por], [2, 3, T.tamb], [3, 4, T.noticia], [4, 5, T.poreso]].forEach(([d0, o, t]) => { tl.set(hs(d0), { attr: { class: "hs done" } }, t); tl.set(hs(o), { attr: { class: "hs on" } }, t); tl.fromTo(hs(o), { scale: 1.3 }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: false }, t); });
  tl.set(hs(5), { attr: { class: "hs done" } }, T.nuforma);
  tl.fromTo("#dock", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, T.cob + 0.6); tl.to("#dock", { opacity: 0, duration: 0.3 }, T.cta - 0.3);
  tl.fromTo("#cta", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", immediateRender: false }, T.cta + 0.2);
