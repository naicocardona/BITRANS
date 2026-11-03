(function () {
  const tl = gsap.timeline({ paused: true });
  const $ = s => document.querySelector(s), $$ = s => Array.from(document.querySelectorAll(s));
  const W = 1080, H = 1920, CX = 540, CY = 960;
  // cámara: lleva el punto (px,py) del escenario al centro con escala s
  const camTo = (sel, t, dur, px, py, s, ease = "power2.inOut") => tl.to(sel, { x: CX - px * s, y: CY - py * s, scale: s, duration: dur, ease }, t);
  const camSet = (sel, t, px, py, s) => tl.set(sel, { x: CX - px * s, y: CY - py * s, scale: s }, t);
  const pop = (sel, t, from = 0.6, d = 0.45) => tl.fromTo(sel, { opacity: 0, scale: from, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d, ease: "back.out(2)", immediateRender: false }, t);
  const loop = (fn, t0, t1, step) => { for (let t = t0, k = 0; t < t1; t += step, k++) fn(t, k); };

  // ---------- estado inicial ----------
  camSet("#cam1", 0, 520, 960, 1.18);
  tl.set(["#s3", "#s4"], { opacity: 0 }, 0);
  tl.set("#papers", { opacity: 0 }, 0);
  tl.set(".fold", { scaleX: 0.001, transformOrigin: "0% 50%" }, 0);
  tl.set("#pin", { opacity: 0 }, 0);
  tl.set("#urna2", { opacity: 0 }, 0);
  tl.set(".bal", { opacity: 0 }, 0);

  // ---------- vida constante (escena 1) ----------
  loop((t, k) => { tl.to(".eye", { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.07, yoyo: true, repeat: 1 }, t); }, 1.6, 17, 2.7);
  tl.to("#body", { scaleY: 1.015, transformOrigin: "50% 100%", duration: 1.4, yoyo: true, repeat: 11, ease: "sine.inOut" }, 0);
  tl.to("#leaves", { rotation: 3, transformOrigin: "50% 100%", duration: 1.6, yoyo: true, repeat: 10, ease: "sine.inOut" }, 0);
  tl.to("#lampglow", { opacity: 0.75, duration: 0.9, yoyo: true, repeat: 17, ease: "sine.inOut" }, 0);
  $$(".st").forEach((s, i) => tl.to(s, { opacity: 0.2, duration: 0.6 + (i % 4) * 0.2, yoyo: true, repeat: 12, ease: "sine.inOut" }, (i % 5) * 0.2));
  $$(".lw").forEach((s, i) => { if (i % 3 === 0) tl.to(s, { opacity: 0.15, duration: 0.05, yoyo: true, repeat: 1 }, 0.8 + i * 0.37); });
  // gente caminando hacia la urna (calle por la ventana)
  [0, 1, 2, 3].forEach(i => {
    const g = "#w" + i; tl.fromTo(g, { x: -40 }, { x: 70 - i * 10, duration: 5, ease: "none" }, 0);
    tl.to(g + " .lg1", { rotation: 28, transformOrigin: "50% 0%", duration: 0.22, yoyo: true, repeat: 21, ease: "sine.inOut" }, 0.05 * i);
    tl.to(g + " .lg2", { rotation: -28, transformOrigin: "50% 0%", duration: 0.22, yoyo: true, repeat: 21, ease: "sine.inOut" }, 0.05 * i);
    tl.to(g + " .wb", { y: -2, duration: 0.22, yoyo: true, repeat: 21, ease: "sine.inOut" }, 0.05 * i);
  });
  tl.fromTo("#car", { x: 0 }, { x: 520, duration: 3.2, ease: "none" }, 0.3);

  // ---------- 0–2.2 compra ----------
  camTo("#cam1", 0, 2.2, 500, 980, 1.3, "sine.inOut");
  tl.to("#foreR", { rotation: -10, transformOrigin: "100% 50%", duration: 0.18, yoyo: true, repeat: 3, ease: "power1.inOut" }, 0.5);
  tl.to("#buy", { scale: 0.85, transformOrigin: "50% 50%", duration: 0.1, yoyo: true, repeat: 1 }, T.nubank - 0.15);
  tl.to(["#buy", "#buyT"], { opacity: 0, duration: 0.15 }, T.nubank + 0.05);
  pop("#chk", T.nubank + 0.1, 0.2);
  tl.to("#p", { rotation: -2, transformOrigin: "50% 100%", duration: 0.5, ease: "sine.out" }, T.nubank + 0.3);
  tl.to("#head", { rotation: -6, transformOrigin: "50% 100%", duration: 0.5, ease: "sine.out" }, T.nubank + 0.3);

  // ---------- 2.27 elecciones: la cámara mira por la ventana ----------
  camTo("#cam1", T.elec - 0.1, 1.0, 650, 820, 1.25);
  tl.to("#head", { rotation: 10, duration: 0.5, ease: "sine.inOut" }, T.elec);
  tl.to("#eyes", { x: 8, y: -4, duration: 0.3 }, T.elec);
  tl.fromTo("#ballot", { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out", immediateRender: false }, T.elec + 0.35);
  tl.to("#ballot", { y: 46, duration: 0.35, ease: "power2.in" }, T.elec + 0.75);
  tl.set("#ballot", { opacity: 0 }, T.elec + 1.1);
  tl.fromTo("#urna1", { scale: 1 }, { scale: 1.15, transformOrigin: "50% 100%", duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, T.elec + 1.05);

  // ---------- 3.3 sacudida ----------
  const sh = T.sacudir - 0.45;
  const xs = [0, 18, -22, 16, -12, 8, -4, 0], rs = [0, 0.8, -1.0, 0.7, -0.5, 0.3, -0.1, 0];
  xs.forEach((v, k) => tl.to("#s1", { x: v, rotation: rs[k], duration: 0.08, ease: "none" }, sh + k * 0.08));
  tl.to("#frame", { rotation: 7, transformOrigin: "50% 0%", duration: 0.5, ease: "elastic.out(1,0.4)" }, sh + 0.1);
  tl.to("#shade", { rotation: -8, transformOrigin: "50% 100%", duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, sh + 0.05);
  tl.to("#phone", { rotation: -16, duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, sh);
  tl.to("#head", { rotation: 0, duration: 0.3 }, sh + 0.2);
  tl.to("#eyes", { x: 0, y: 4, duration: 0.25 }, sh + 0.25);
  tl.to("#brows", { y: -9, duration: 0.2 }, sh + 0.2);
  tl.to("#smile", { opacity: 0, duration: 0.1 }, sh + 0.3); tl.to("#flat", { opacity: 1, duration: 0.1 }, sh + 0.3);
  camTo("#cam1", sh + 0.3, 1.2, 470, 1010, 1.55);

  // ---------- 4.9 zoom dentro del celular ----------
  const z0 = T.inv + 0.15, PX = 470, PY = 1073;
  camTo("#cam1", z0, 0.6, PX, PY, 9, "power3.in");
  tl.fromTo("#s3", { opacity: 0 }, { opacity: 1, duration: 0.22, immediateRender: false }, z0 + 0.42);
  tl.fromTo("#cam3", { scale: 0.4, x: CX * 0.6, y: CY * 0.6 }, { scale: 1, x: 0, y: 0, duration: 0.5, ease: "power3.out", immediateRender: false }, z0 + 0.42);
  tl.set("#s1", { opacity: 0 }, z0 + 0.7);

  // ---------- 5.5–11.8 dentro del celular ----------
  tl.fromTo("#ucard", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.6)", immediateRender: false }, z0 + 0.6);
  tl.fromTo("#ring", { opacity: 0 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 3, immediateRender: false }, T.nu - 0.1);
  tl.to("#ucard", { scale: 1.05, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1 }, T.nu - 0.1);
  pop("#cal", T.nu + 0.15, 0.7);
  tl.set("#page", { scaleY: 0.001, transformOrigin: "50% 0%" }, 0);
  tl.to("#page", { scaleY: 1, duration: 0.5, ease: "back.out(2)" }, T.d26 - 0.05);
  pop("#elev", T.d26 + 0.4, 0.7);
  tl.to("#tag", { y: 340, duration: 0.8, ease: "power2.in" }, T.cayo);
  tl.to("#tag", { y: 320, duration: 0.25, ease: "power2.out" }, T.cayo + 0.8);
  tl.fromTo("#mlines", { opacity: 0, y: 0 }, { opacity: 1, y: 360, duration: 0.8, ease: "power2.in", immediateRender: false }, T.cayo);
  tl.to("#mlines", { opacity: 0, duration: 0.2 }, T.cayo + 0.8);
  tl.fromTo("#arr", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(2)", immediateRender: false }, T.cayo + 0.2);
  tl.to("#arr", { y: 18, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, T.cayo + 0.6);
  tl.fromTo("#pct", { opacity: 0, scale: 1.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "power4.in", immediateRender: false }, T.p17 - 0.12);
  [14, -12, 8, -5, 0].forEach((v, k) => tl.to("#cam3", { x: v, duration: 0.06, ease: "none" }, T.p17 + 0.18 + k * 0.06));
  pop("#ses", T.ses - 0.05, 0.6);
  tl.fromTo("#hyp", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, T.p17 + 0.3);
  tl.to("#hyp", { opacity: 0, duration: 0.2 }, T.cob + 0.2);

  // ---------- 11.85 de vuelta al sofá: cara de susto ----------
  const zb = T.cob - 0.4;
  tl.to("#cam3", { scale: 0.35, x: CX * 0.65, y: CY * 0.65, duration: 0.4, ease: "power3.in" }, zb);
  tl.to("#s3", { opacity: 0, duration: 0.2 }, zb + 0.22);
  tl.set("#s1", { opacity: 1, x: 0, rotation: 0 }, zb + 0.2);
  tl.set(["#buy", "#buyT", "#chk"], { opacity: 0 }, zb + 0.2); tl.set("#ph17", { opacity: 1 }, zb + 0.2);
  camSet("#cam1", zb + 0.2, PX, PY, 7);
  camTo("#cam1", zb + 0.2, 0.55, 520, 1000, 1.25, "power3.out");
  tl.set("#flat", { opacity: 0 }, zb + 0.2); tl.set("#oh", { opacity: 1 }, zb + 0.2);
  tl.to(".eye", { scale: 1.35, transformOrigin: "50% 50%", duration: 0.2, ease: "back.out(3)" }, zb + 0.35);
  tl.to("#brows", { y: -14, duration: 0.2 }, zb + 0.35);
  tl.fromTo("#sweat", { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, zb + 0.5);
  tl.to("#sweat", { y: 30, opacity: 0, duration: 0.9, ease: "power1.in" }, zb + 1.3);
  tl.to("#p", { rotation: 2, duration: 0.3, ease: "back.out(3)" }, zb + 0.3);

  // ---------- 12.2 llegan los periódicos ----------
  tl.set("#papers", { opacity: 1 }, T.cob);
  [["#np0", -700, -200, -60], ["#np1", 0, -900, 40], ["#np2", 700, -150, 70]].forEach(([s, dx, dy, r], i) =>
    tl.fromTo(s + " .npi", { x: dx, y: dy, rotation: r, opacity: 0 }, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.6, ease: "back.out(1.4)", immediateRender: false }, T.cob + 0.05 + i * 0.32));
  camTo("#cam1", T.cob + 0.2, 2.4, 540, 900, 1.08, "sine.inOut");
  tl.to("#head", { rotation: -8, duration: 0.4, ease: "sine.inOut" }, T.cob + 0.3);
  tl.to("#eyes", { x: -7, y: -6, duration: 0.3 }, T.cob + 0.3);
  tl.to("#head", { rotation: 8, duration: 0.6, ease: "sine.inOut" }, T.rel);
  tl.to("#eyes", { x: 7, duration: 0.4 }, T.rel);
  tl.to(".npi", { rotation: 3, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut", stagger: 0.1 }, T.rel);
  // ---------- 14.9 los periódicos se van y entramos por la ventana ----------
  tl.to("#np0 .npi", { x: -900, rotation: -40, duration: 0.45, ease: "power2.in" }, T.reac - 0.2);
  tl.to("#np1 .npi", { y: -1100, rotation: 20, duration: 0.45, ease: "power2.in" }, T.reac - 0.15);
  tl.to("#np2 .npi", { x: 900, rotation: 40, duration: 0.45, ease: "power2.in" }, T.reac - 0.1);
  camTo("#cam1", T.reac + 0.15, 0.7, 790, 645, 3.4, "power3.in");
  tl.fromTo("#s4", { opacity: 0 }, { opacity: 1, duration: 0.25, immediateRender: false }, T.reac + 0.65);
  tl.set("#s1", { opacity: 0 }, T.reac + 0.95);

  // ---------- 15.6 mapa de Brasil ----------
  const m0 = T.reac + 0.6;
  camSet("#cam4", m0, 540, 880, 0.92); camTo("#cam4", m0, DUR - m0, 560, 860, 1.06, "sine.inOut");
  ["#fold0", "#fold1", "#fold2"].forEach((s, k) => tl.to(s, { scaleX: 1, duration: 0.35, ease: "power2.out" }, m0 + 0.05 + k * 0.14));
  const bl = $("#brline"), L = bl.getTotalLength(); tl.set(bl, { attr: { "stroke-dasharray": L, "stroke-dashoffset": L } }, 0);
  tl.to(bl, { attr: { "stroke-dashoffset": 0 }, duration: 0.9, ease: "power2.inOut" }, m0 + 0.2);
  pop("#urna2", T.elec2, 0.4);
  $$(".bal").forEach((b, i) => { tl.fromTo(b, { y: -90, opacity: 0 }, { y: 30, opacity: 1, duration: 0.45, ease: "power2.in", immediateRender: false }, T.elec2 + 0.3 + i * 0.45); tl.set(b, { opacity: 0 }, T.elec2 + 0.75 + i * 0.45); });
  [10, 11, 12, 13].forEach((n, i) => {
    const g = "#w" + n, dx = i < 2 ? 60 : -60; tl.fromTo(g, { x: -dx * 2 }, { x: 0, duration: 1.8, ease: "sine.out", immediateRender: false }, m0);
    tl.to(g + " .lg1", { rotation: 26, transformOrigin: "50% 0%", duration: 0.2, yoyo: true, repeat: 9, ease: "sine.inOut" }, m0);
    tl.to(g + " .lg2", { rotation: -26, transformOrigin: "50% 0%", duration: 0.2, yoyo: true, repeat: 9, ease: "sine.inOut" }, m0);
  });
  tl.fromTo("#pin", { opacity: 0, y: -420 }, { opacity: 1, y: 0, duration: 0.45, ease: "bounce.out", immediateRender: false }, T.bra - 0.2);
  ["#rip1", "#rip2"].forEach((s, i) => tl.fromTo(s, { opacity: 0.9, attr: { r: 20 } }, { opacity: 0, attr: { r: 130 }, duration: 0.9, ease: "power2.out", immediateRender: false }, T.bra + 0.2 + i * 0.3));
  tl.fromTo("#lbBR", { opacity: 0, y: 20, scale: 0.7 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, T.bra + 0.15);
  tl.to("#pinb", { y: -10, duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }, T.bra + 0.5);

  // ---------- franja de avance y subtítulos ----------
  const hs = k => document.getElementById("hs" + k);
  tl.set(hs(0), { attr: { class: "hs on" } }, z0 + 0.4); tl.fromTo(hs(0), { scale: 1.3 }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: false }, z0 + 0.4);
  tl.set(hs(0), { attr: { class: "hs done" } }, T.cob); tl.set(hs(1), { attr: { class: "hs on" } }, T.cob); tl.fromTo(hs(1), { scale: 1.3 }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: false }, T.cob);
  CG.forEach(([a, b, ws], i) => { tl.set("#cg" + i, { opacity: 1 }, a); tl.set("#cg" + i, { opacity: 0 }, b);
    ws.forEach(([s, e], j) => { const el = document.getElementById("cw" + i + "_" + j), c = el.getAttribute("class"); tl.set(el, { attr: { class: c + " on" } }, s); tl.set(el, { attr: { class: c } }, e); }); });
  tl.to({}, { duration: 0.01 }, DUR - 0.01);
  window.__timelines = window.__timelines || {}; window.__timelines["main"] = tl;
})();
