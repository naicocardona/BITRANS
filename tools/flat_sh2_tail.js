  // =================== SHORTS · 15 s → final ===================
  // 15.0 · la conexión importa: del pin a la calle del banco
  camTo("#cam4", T.por - 0.05, 0.55, PIN[0], PIN[1] - 40, 5, "power3.in");
  tl.set("#lbBR", { opacity: 0 }, T.por);
  tl.set("#s5", { opacity: 1 }, T.por + 0.42); tl.set("#s4", { opacity: 0 }, T.por + 0.5);
  camSet("#cam5", T.por + 0.42, 540, 900, 1.9); camTo("#cam5", T.por + 0.42, 0.7, 520, 930, 1.3, "power3.out");
  POS.fA = 0; POS.fB = 0; POS.fC = 0;
  walk("fC", T.por, 6.0, 1000, 0.3); walk("fB", T.por + 0.4, 4.5, -600, 0.3);
  tl.fromTo("#car2", { x: -200 }, { x: 2300, duration: 4.0, ease: "none", immediateRender: false }, T.por + 0.2);
  $$(".cl").forEach((c, i) => tl.fromTo(c, { x: 0 }, { x: 140 + i * 30, duration: 8, ease: "none", immediateRender: false }, T.por));
  walk("fA", T.por + 0.6, 1.5, 340);
  camTo("#cam5", T.empresa - 0.2, 1.4, 600, 930, 1.35);
  $$("[id^=lc]").forEach((c, i) => fly(c, T.empresa + i * 0.12, 0, 0, -30 - i * 6, -100, 0.55, 90));
  jump("fA", T.empresa + 0.5); show("#lbl1", T.empresa, T.ocurre + 0.2);
  // lo que ocurre en el país: se nubla y cierra la tienda
  tl.to("#storm", { opacity: 1, duration: 0.8 }, T.ocurre); tl.to("#sun", { opacity: 0, duration: 0.5 }, T.ocurre);
  tl.fromTo("#dclouds", { opacity: 0, x: 300 }, { opacity: 1, x: 0, duration: 1.0, ease: "power2.out", immediateRender: false }, T.ocurre);
  tl.to("#rain", { opacity: 1, duration: 0.4 }, T.ocurre + 0.4);
  tl.fromTo(".rd", { y: -60 }, { y: 60, duration: 0.35, ease: "none", repeat: 6, immediateRender: false }, T.ocurre + 0.4);
  camTo("#cam5", T.ocurre, 1.2, 1050, 930, 1.2);
  pop("#closed", T.negocios - 0.2, 0.4); face("fA", T.ocurre + 0.3, "fl");
  tl.to("#fA-aL", { rotation: 8, transformOrigin: "50% 4%", duration: 0.4 }, T.ocurre + 0.3); tl.to("#fA-aR", { rotation: -8, transformOrigin: "50% 4%", duration: 0.4 }, T.ocurre + 0.3);
  // 21.3 · tres cosas: círculo dorado → escritorio
  wipe(T.entender - 0.35, 540, 900, 540, 900, "#s5", "#s8");
  camSet("#cam8", T.entender, 540, 900, 1.15); camTo("#cam8", T.entender, 1.2, 540, 900, 1.0, "power2.out");
  const qs = [[T.q1, "#q1i", 800, 560, "#qk0"], [T.q2, "#q2i", 800, 790, "#qk1"], [T.q3, "#q3i", 800, 960, "#qk2"]];
  qs.forEach(([t, s, x, y, k], i) => {
    pop(s, t - 0.15, 0.5); tl.set("#lupa", { opacity: 1 }, t - 0.1);
    tl.to("#lupa", { attr: { transform: `translate(${x} ${y}) scale(.75)` }, duration: 0.35, ease: "power2.inOut" }, t - 0.1);
    tl.to("#lupai", { x: 20, y: -10, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, t + 0.25);
    pop(k, t + 0.5, 0.3);
    tl.to("#fD-h", { rotation: [-8, 0, 8][i], transformOrigin: "50% 90%", duration: 0.3 }, t - 0.1);
    tl.to("#fD-aR", { rotation: -35, transformOrigin: "50% 4%", duration: 0.25, yoyo: true, repeat: 1 }, t + 0.1);
  });
  tl.to("#gear", { rotation: 360, transformOrigin: "50% 50%", duration: 3, ease: "none" }, T.q2);
  // 29.2 · y recuerda: encrucijada «caída ≠ barata»
  const wc = T.recuerda - 0.2;
  tl.to("#s8", { y: -600, opacity: 0, filter: "blur(8px)", duration: 0.32, ease: "power2.in" }, wc);
  tl.set("#s9", { opacity: 1 }, wc + 0.05);
  tl.fromTo("#s9", { y: 700, filter: "blur(8px)" }, { y: 0, filter: "blur(0px)", duration: 0.38, ease: "power2.out", immediateRender: false }, wc + 0.05);
  camSet("#cam9", wc, 540, 900, 1.0); camTo("#cam9", wc, 4.2, 520, 880, 1.08, "sine.inOut");
  tl.to("#fQ-h", { rotation: 10, transformOrigin: "50% 90%", duration: 0.4 }, T.recuerda + 0.3);
  tl.fromTo("#sg2 .xs", { opacity: 0, scale: 1.8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.25, ease: "power4.in", immediateRender: false }, T.caiga + 0.4);
  [10, -8, 5, 0].forEach((v, k) => tl.to("#cam9", { rotation: v * 0.1, duration: 0.05 }, T.caiga + 0.65 + k * 0.05));
  tl.to("#fQ-aL", { rotation: 55, transformOrigin: "50% 4%", duration: 0.3, ease: "back.out(2)" }, T.caiga + 0.7);
  tl.to("#fQ-aR", { rotation: -55, transformOrigin: "50% 4%", duration: 0.3, ease: "back.out(2)" }, T.caiga + 0.7);
  face("fQ", T.caiga + 0.7, "fl");
  $$(".qm").forEach((q, i) => { tl.fromTo(q, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, T.caiga + 0.8 + i * 0.15); });
  tl.fromTo("#stampB", { opacity: 0, scale: 1.7 }, { opacity: 1, scale: 1, duration: 0.25, ease: "power4.in", immediateRender: false }, T.barata - 0.1);
  tl.to("#stampB", { opacity: 0, duration: 0.25 }, T.cta - 0.4);
  // 33.4 · cierre: el «?» se vuelve la moneda TITÁN y la pregunta
  wipe(T.cta - 0.4, 300, 790, 540, 560, "#s9", "#s10");
  pop("#binder", T.cta - 0.05, 0.6); tl.set("#bfront", { transformOrigin: "50% 0%" }, 0);
  tl.to("#bfront", { scaleY: 0.12, duration: 0.4, ease: "power2.inOut" }, T.cta + 0.3); tl.to("#bt", { opacity: 0, duration: 0.2 }, T.cta + 0.25);
  $$(".pcard").forEach((c, i) => tl.fromTo(c, { opacity: 0, y: 220 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)", immediateRender: false }, T.cta + 0.45 + i * 0.1));
  tl.fromTo("#logo", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)", immediateRender: false }, T.cta + 0.2);
  tl.to(["#binder", "#logo"], { y: 160, opacity: 0.3, duration: 0.5 }, T.cta + 1.4);
  tl.to("#fT-aR", { rotation: -150, transformOrigin: "50% 4%", duration: 0.35, ease: "back.out(2)" }, T.cta + 1.6);
  tl.to("#fT-aR", { rotation: -125, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, T.cta + 1.95);
  // titulares, franja y ficha
  OV2.forEach(([id, a, b]) => show("#" + id, a, b));
  [[1, 2, T.por], [2, 3, T.entender]].forEach(([d0, o, t]) => { tl.set(hs(d0), { attr: { class: "hs done" } }, t); tl.set(hs(o), { attr: { class: "hs on" } }, t); tl.fromTo(hs(o), { scale: 1.3 }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: false }, t); });
  tl.set(hs(3), { attr: { class: "hs done" } }, T.recuerda);
  tl.fromTo("#dock", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, T.cob + 0.6); tl.to("#dock", { opacity: 0, duration: 0.3 }, T.cta - 0.3);
  tl.fromTo("#cta", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", immediateRender: false }, T.cta + 1.2);
