(function () {
  const tl = gsap.timeline({ paused: true });
  const $ = s => document.querySelector(s), $$ = s => Array.from(document.querySelectorAll(s));
  const CX = 530, CY = 540;
  const camTo = (sel, t, dur, px, py, s, ease = "power2.inOut") => tl.to(sel, { x: CX - px * s, y: CY - py * s, scale: s, duration: dur, ease }, t);
  const camSet = (sel, t, px, py, s) => tl.set(sel, { x: CX - px * s, y: CY - py * s, scale: s }, t);
  const pop = (sel, t, from = 0.6, d = 0.45) => tl.fromTo(sel, { opacity: 0, scale: from, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d, ease: "back.out(2)", immediateRender: false }, t);
  const loop = (fn, t0, t1, step) => { for (let t = t0, k = 0; t < t1; t += step, k++) fn(t, k); };
  // cambio de escena: la que sale y la que entra se cruzan (nunca quedan cuadros vacíos)
  let CUR = null;
  const go = (next, t, kind = "fade") => {
    const prev = CUR; CUR = next;
    if (prev) tl.to(prev, { opacity: 0, scale: kind === "zoom" ? 1.25 : 1.06, filter: "blur(6px)", duration: 0.45, ease: "power2.in" }, t - 0.4);
    if (kind === "whip") tl.fromTo(next, { opacity: 0, x: 500, filter: "blur(10px)" }, { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.45, ease: "power3.out", immediateRender: false }, t - 0.4);
    else tl.fromTo(next, { opacity: 0, scale: kind === "zoom" ? 0.8 : 0.94, filter: "blur(6px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out", immediateRender: false }, t - 0.4);
  };
  const wipe = (t, fx, fy, tx, ty, next) => { const prev = CUR; CUR = next;
    tl.set("#wipe", { x: fx - 60, y: fy - 60, scale: 0.01, opacity: 1 }, t); tl.to("#wipe", { scale: 22, duration: 0.32, ease: "power2.in" }, t);
    if (prev) tl.set(prev, { opacity: 0 }, t + 0.32); tl.set(next, { opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }, t + 0.32);
    tl.set("#wipe", { x: tx - 60, y: ty - 60 }, t + 0.33); tl.to("#wipe", { scale: 0.01, duration: 0.36, ease: "power2.out" }, t + 0.33); tl.set("#wipe", { opacity: 0 }, t + 0.7); };
  const POS = {};
  const walk = (id, t0, dur, dx, step = 0.24) => { const x0 = POS[id] || 0, x1 = x0 + dx; POS[id] = x1;
    tl.fromTo("#" + id, { x: x0 }, { x: x1, duration: dur, ease: "none", immediateRender: false }, t0); const n = Math.max(2, Math.round(dur / step));
    const sw = (sel, a, b, org) => tl.fromTo(sel, { rotation: a }, { rotation: b, transformOrigin: org, duration: dur / n, ease: "sine.inOut", repeat: n - 1, yoyo: true, immediateRender: false }, t0);
    sw(`#${id}-lL`, -20, 20, "50% 0%"); sw(`#${id}-lR`, 20, -20, "50% 0%"); sw(`#${id}-aL`, 16, -16, "50% 4%"); sw(`#${id}-aR`, -16, 16, "50% 4%");
    tl.fromTo(`#${id}-bob`, { y: 0 }, { y: -7, duration: dur / n / 2, ease: "sine.inOut", repeat: n * 2 - 1, yoyo: true, immediateRender: false }, t0);
    tl.to([`#${id}-lL`, `#${id}-lR`, `#${id}-aL`, `#${id}-aR`], { rotation: 0, duration: 0.15 }, t0 + dur); };
  const face = (id, t, k) => ["sm", "fl", "oh"].forEach(m => tl.set(`#${id}-${m}`, { opacity: m === k ? 1 : 0 }, t));
  const jump = (id, t) => tl.to(`#${id}-bob`, { y: -34, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, t);
  const fly = (sel, t, x0, y0, x1, y1, d = 0.6, arc = 120) => { tl.set(sel, { opacity: 1 }, t);
    tl.fromTo(sel, { x: x0, scale: 0.3 }, { x: x1, scale: 1, duration: d, ease: "none", immediateRender: false }, t);
    tl.fromTo(sel, { y: y0 }, { y: Math.min(y0, y1) - arc, duration: d / 2, ease: "power2.out", immediateRender: false }, t);
    tl.to(sel, { y: y1, duration: d / 2, ease: "power2.in" }, t + d / 2); tl.to(sel, { opacity: 0, duration: 0.12 }, t + d); };
  const shake = (sel, t) => [16, -18, 12, -8, 5, 0].forEach((v, k) => tl.to(sel, { x: v, duration: 0.07, ease: "none" }, t + k * 0.07));

  // ---------- estado inicial ----------
  tl.set(".scn", { opacity: 0 }, 0);
  tl.set(["#papers", "#pin", "#urna2", ".bal", "[id^=lc]", "[id^=sc]", "[id^=pc]"], { opacity: 0 }, 0);
  tl.set(".fold", { scaleX: 0.001, transformOrigin: "0% 50%" }, 0);
  tl.set("#page", { scaleY: 0.001, transformOrigin: "50% 0%" }, 0);
  tl.set("#bfront", { transformOrigin: "50% 0%" }, 0);
  // vida constante
  loop(t => tl.to(".eye,.eyeb", { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.07, yoyo: true, repeat: 1 }, t), 1.6, DUR, 2.8);
  tl.to("#body", { scaleY: 1.015, transformOrigin: "50% 100%", duration: 1.4, yoyo: true, repeat: 40, ease: "sine.inOut" }, 0);
  tl.to("#leaves", { rotation: 3, transformOrigin: "50% 100%", duration: 1.6, yoyo: true, repeat: 34, ease: "sine.inOut" }, 0);
  tl.to("#lampglow", { opacity: 0.75, duration: 0.9, yoyo: true, repeat: 60, ease: "sine.inOut" }, 0);
  $$(".st").forEach((s, i) => tl.to(s, { opacity: 0.2, duration: 0.6 + (i % 4) * 0.2, yoyo: true, repeat: 40, ease: "sine.inOut" }, (i % 5) * 0.2));
  [0, 1, 2, 3].forEach(i => { const g = "#w" + i; tl.fromTo(g, { x: -40 }, { x: 70 - i * 10, duration: 24, ease: "none" }, 0);
    tl.to(g + " .lg1", { rotation: 28, transformOrigin: "50% 0%", duration: 0.24, yoyo: true, repeat: 99, ease: "sine.inOut" }, 0.05 * i);
    tl.to(g + " .lg2", { rotation: -28, transformOrigin: "50% 0%", duration: 0.24, yoyo: true, repeat: 99, ease: "sine.inOut" }, 0.05 * i); });
  tl.fromTo("#car", { x: 0 }, { x: 520, duration: 3.2, ease: "none" }, 16.5);

  // ================= 1 · GANCHO (0–25) · sala =================
  go("#s1", 0.4); camSet("#cam_s1", 0, 520, 980, 1.25); camTo("#cam_s1", 0.2, 4, 500, 1000, 1.4, "sine.inOut");
  tl.to("#foreR", { rotation: -10, transformOrigin: "100% 50%", duration: 0.18, yoyo: true, repeat: 5, ease: "power1.inOut" }, 1.0);
  tl.to("#buy", { scale: 0.85, transformOrigin: "50% 50%", duration: 0.1, yoyo: true, repeat: 1 }, T.decides + 1.6);
  tl.to(["#buy", "#buyT"], { opacity: 0, duration: 0.15 }, T.decides + 1.8); pop("#chk", T.decides + 1.85, 0.2);
  tl.to("#p", { rotation: -2, transformOrigin: "50% 100%", duration: 0.5 }, T.decides + 2.2); tl.to("#head", { rotation: -6, transformOrigin: "50% 100%", duration: 0.5 }, T.decides + 2.2);
  // cae con fuerza
  camTo("#cam_s1", T.depronto, 1.2, 470, 1040, 1.6);
  tl.set("#chk", { opacity: 0 }, T.depronto + 1.0); tl.set("#ph17", { opacity: 1 }, T.depronto + 1.0);
  shake("#cam_s1", T.fuerza - 0.3); tl.to("#frame", { rotation: 7, transformOrigin: "50% 0%", duration: 0.5, ease: "elastic.out(1,0.4)" }, T.fuerza - 0.2);
  tl.to("#head", { rotation: 0, duration: 0.3 }, T.fuerza - 0.3); tl.set("#smile", { opacity: 0 }, T.fuerza - 0.2); tl.set("#oh", { opacity: 1 }, T.fuerza - 0.2);
  tl.to(".eye", { scale: 1.35, transformOrigin: "50% 50%", duration: 0.2 }, T.fuerza - 0.1); tl.to("#brows", { y: -14, duration: 0.2 }, T.fuerza - 0.1);
  tl.fromTo("#sweat", { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, T.fuerza + 0.2); tl.to("#sweat", { y: 30, opacity: 0, duration: 0.9 }, T.fuerza + 1.2);
  // ¿la razón? periódicos
  camTo("#cam_s1", T.razon - 0.3, 0.8, 540, 900, 1.08);
  tl.set("#papers", { opacity: 1 }, T.razon);
  [["#np0", -700, -200, -60], ["#np1", 0, -900, 40], ["#np2", 700, -150, 70]].forEach(([s, dx, dy, r], i) =>
    tl.fromTo(s + " .npi", { x: dx, y: dy, rotation: r, opacity: 0 }, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.6, ease: "back.out(1.4)", immediateRender: false }, T.razon + 0.05 + i * 0.3));
  // unas elecciones: los periódicos se van y miramos por la ventana
  ["#np0", "#np1", "#np2"].forEach((s, i) => tl.to(s + " .npi", { x: [-900, 0, 900][i], y: i === 1 ? -1100 : 0, rotation: [-40, 20, 40][i], duration: 0.45, ease: "power2.in" }, T.elecc - 0.3 + i * 0.05));
  camTo("#cam_s1", T.elecc, 0.8, 790, 650, 2.4);
  tl.fromTo("#ballot", { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, immediateRender: false }, T.elecc + 0.4);
  tl.to("#ballot", { y: 46, duration: 0.35, ease: "power2.in" }, T.elecc + 0.8); tl.set("#ballot", { opacity: 0 }, T.elecc + 1.15);
  tl.fromTo("#urna1", { scale: 1 }, { scale: 1.15, transformOrigin: "50% 100%", duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, T.elecc + 1.1);
  // sin fórmulas y sin política: de vuelta a la sala y entramos al celular
  camTo("#cam_s1", T.video, 1.0, 520, 960, 1.2);
  tl.set("#oh", { opacity: 0 }, T.video); tl.set("#smile", { opacity: 1 }, T.video); tl.to(".eye", { scale: 1, duration: 0.2 }, T.video); tl.to("#brows", { y: 0, duration: 0.2 }, T.video);
  camTo("#cam_s1", T.hechos - 0.7, 0.65, 470, 1073, 9, "power3.in");
  go("#s3", T.hechos, "zoom");
  // ================= 2 · EL EPISODIO (25–62.9) =================
  camSet("#cam_s3", T.hechos - 0.4, 540, 900, 1.0);
  tl.fromTo("#ucard", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.6)", immediateRender: false }, T.hechos + 0.2);
  pop("#cal", T.d26 - 0.2, 0.7); tl.to("#page", { scaleY: 1, duration: 0.5, ease: "back.out(2)" }, T.d26 + 0.1);
  tl.fromTo("#ring", { opacity: 0 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 3, immediateRender: false }, T.d26 + 3.0);
  pop("#elev", T.d26 + 4.0, 0.7);
  tl.to("#tag", { y: 340, duration: 0.8, ease: "power2.in" }, T.cayo); tl.to("#tag", { y: 320, duration: 0.25, ease: "power2.out" }, T.cayo + 0.8);
  tl.fromTo("#mlines", { opacity: 0, y: 0 }, { opacity: 1, y: 360, duration: 0.8, ease: "power2.in", immediateRender: false }, T.cayo); tl.to("#mlines", { opacity: 0, duration: 0.2 }, T.cayo + 0.8);
  tl.fromTo("#arr", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(2)", immediateRender: false }, T.cayo + 0.2);
  tl.fromTo("#pct", { opacity: 0, scale: 1.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "power4.in", immediateRender: false }, T.p17 - 0.12);
  shake("#cam_s3", T.p17 + 0.2); pop("#ses", T.p17 + 1.0, 0.6);
  tl.to("#arr", { y: 18, duration: 0.4, yoyo: true, repeat: 9, ease: "sine.inOut" }, T.p17 + 1.0);
  camTo("#cam_s3", T.anuncio, 4.5, 540, 1000, 1.08, "sine.inOut");
  // cobertura financiera: periódicos en la sala
  go("#s1", T.cobert, "zoom"); camSet("#cam_s1", T.cobert - 0.4, 540, 900, 1.05);
  [["#np0", -700, -200, -60], ["#np1", 0, -900, 40], ["#np2", 700, -150, 70]].forEach(([s, dx, dy, r], i) =>
    tl.fromTo(s + " .npi", { x: dx, y: dy, rotation: r, opacity: 0 }, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.6, ease: "back.out(1.4)", immediateRender: false }, T.cobert + 0.2 + i * 0.3));
  tl.to("#head", { rotation: 8, duration: 0.6, ease: "sine.inOut" }, T.cobert + 2); tl.to("#eyes", { x: 7, duration: 0.4 }, T.cobert + 2);
  tl.to(".npi", { rotation: 3, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut", stagger: 0.1 }, T.cobert + 3.2);
  ["#np0", "#np1", "#np2"].forEach((s, i) => tl.to(s + " .npi", { x: [-900, 0, 900][i], y: i === 1 ? -1100 : 0, rotation: [-40, 20, 40][i], duration: 0.45, ease: "power2.in" }, T.brasil - 1.6 + i * 0.05));
  camTo("#cam_s1", T.brasil - 1.2, 0.7, 790, 645, 3.4, "power3.in");
  go("#s4", T.brasil - 0.3, "zoom");
  camSet("#cam_s4", T.brasil - 0.6, 540, 860, 0.95); camTo("#cam_s4", T.brasil - 0.6, 6.0, 560, 850, 1.05, "sine.inOut");
  ["#fold0", "#fold1", "#fold2"].forEach((s, k) => tl.to(s, { scaleX: 1, duration: 0.35, ease: "power2.out" }, T.brasil - 0.4 + k * 0.14));
  const bl = $("#brline"), L = bl.getTotalLength(); tl.set(bl, { attr: { "stroke-dasharray": L, "stroke-dashoffset": L } }, 0);
  tl.to(bl, { attr: { "stroke-dashoffset": 0 }, duration: 0.9, ease: "power2.inOut" }, T.brasil - 0.2);
  tl.fromTo("#pin", { opacity: 0, y: -420 }, { opacity: 1, y: 0, duration: 0.45, ease: "bounce.out", immediateRender: false }, T.brasil + 0.4);
  ["#rip1", "#rip2"].forEach((s, i) => tl.fromTo(s, { opacity: 0.9, attr: { r: 20 } }, { opacity: 0, attr: { r: 130 }, duration: 0.9, ease: "power2.out", immediateRender: false }, T.brasil + 0.8 + i * 0.3));
  pop("#urna2", T.nosolo, 0.4);
  $$(".bal").forEach((b, i) => { tl.fromTo(b, { y: -90, opacity: 0 }, { y: 30, opacity: 1, duration: 0.45, ease: "power2.in", immediateRender: false }, T.nosolo + 0.4 + i * 0.5); tl.set(b, { opacity: 0 }, T.nosolo + 0.85 + i * 0.5); });
  [10, 11, 12, 13].forEach((n, i) => { const g = "#w" + n, dx = i < 2 ? 60 : -60; tl.fromTo(g, { x: -dx * 2 }, { x: 0, duration: 2.2, ease: "sine.out", immediateRender: false }, T.brasil);
    tl.to(g + " .lg1", { rotation: 26, transformOrigin: "50% 0%", duration: 0.2, yoyo: true, repeat: 11, ease: "sine.inOut" }, T.brasil);
    tl.to(g + " .lg2", { rotation: -26, transformOrigin: "50% 0%", duration: 0.2, yoyo: true, repeat: 11, ease: "sine.inOut" }, T.brasil); });
  tl.to("#pinb", { y: -12, duration: 0.5, yoyo: true, repeat: 11, ease: "sine.inOut" }, T.otros);
  // ================= 3 · ¿QUÉ ES NU? (62.9–100.3) =================
  go("#sN", T.aclar, "whip"); camSet("#cam_sN", 0, 530, 540, 1);
  pop("#nvPh", T.nubank - 0.2, 0.5); tl.to("#nvPh", { y: -14, duration: 1.2, yoyo: true, repeat: 7, ease: "sine.inOut" }, T.nubank + 0.4);
  pop("#nvCt", T.holdings, 0.5); tl.to("#nvCt", { rotation: 3, transformOrigin: "50% 50%", duration: 1.1, yoyo: true, repeat: 7, ease: "sine.inOut" }, T.holdings + 0.5);
  pop("#nvNe", T.cuenta, 0.3); tl.to("#nvNe", { scale: 1.12, duration: 0.4, yoyo: true, repeat: 3 }, T.cuenta + 0.5);
  tl.set("#nvUD", { opacity: 1 }, T.subebaja - 0.2); tl.to("#nvUD", { y: -16, duration: 0.3, yoyo: true, repeat: 7, ease: "sine.inOut" }, T.subebaja - 0.2);
  tl.to("#nvCt", { y: -30, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, T.subebaja);
  go("#sM", T.e140, "fade"); camSet("#cam_sM", T.e140 - 0.4, 530, 540, 1); camTo("#cam_sM", T.e140, 8, 560, 560, 1.06, "sine.inOut");
  ["#mMX", "#mCO", "#mBR"].forEach((s, i) => tl.fromTo(s, { opacity: 0 }, { opacity: 1, duration: 0.4, immediateRender: false }, T.e140 - 0.45 + i * 0.12));
  ["#pMX", "#pCO", "#pBR"].forEach((s, i) => tl.fromTo(s, { opacity: 0, y: -200 }, { opacity: 1, y: 0, duration: 0.45, ease: "bounce.out", immediateRender: false }, T.e140 + 1.6 + i * 0.5));
  $$(".cr").forEach((c, i) => tl.fromTo(c, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, T.e140 + 3.2 + i * 0.08));
  tl.to(".cr", { y: -8, duration: 0.3, yoyo: true, repeat: 9, stagger: 0.05, ease: "sine.inOut" }, T.e140 + 4.6);
  tl.to("#mBR", { fill: "#7C3AED", duration: 0.6 }, T.fool1); tl.to("#pBR", { scale: 1.25, transformOrigin: "50% 100%", duration: 0.4, yoyo: true, repeat: 3 }, T.fool1);
  tl.to(["#mMX", "#mCO"], { opacity: 0.45, duration: 0.6 }, T.fool1);
  // ================= 4 · EJEMPLO HIPOTÉTICO (100.3–169.7) =================
  go("#s5", T.ejemplo, "fade"); camSet("#cam_s5", T.ejemplo - 0.4, 520, 900, 1.25);
  POS.fA = 0; POS.fB = 0; POS.fC = 0;
  walk("fC", T.ejemplo, 12, 1500, 0.3); walk("fB", T.ejemplo + 1, 10, -900, 0.3);
  tl.fromTo("#car2", { x: -200 }, { x: 2300, duration: 5, ease: "none", immediateRender: false }, T.ejemplo + 0.5);
  $$(".cl").forEach((c, i) => tl.fromTo(c, { x: 0 }, { x: 160 + i * 30, duration: 20, ease: "none", immediateRender: false }, T.ejemplo));
  walk("fA", T.bancopeq - 0.2, 1.8, 340); camTo("#cam_s5", T.bancopeq - 0.2, 2.0, 560, 900, 1.3);
  $$("[id^=lc]").forEach((c, i) => fly(c, T.bancopeq + 1.8 + i * 0.12, 0, 0, -30 - i * 6, -100, 0.55, 90));
  jump("fA", T.bancopeq + 2.4); tl.fromTo("#lbl1", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, immediateRender: false }, T.bancopeq + 1.9); tl.to("#lbl1", { opacity: 0, duration: 0.25 }, T.gana + 1.0);
  walk("fA", T.gana + 0.2, 2.0, 850); camTo("#cam_s5", T.gana + 0.2, 2.2, 1360, 900, 1.3);
  $$("[id^=sc]").forEach((c, i) => fly(c, T.gana + 2.4 + i * 0.12, 0, 0, -10 - i * 6, -60, 0.55, 70));
  tl.fromTo("#lbl2", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, immediateRender: false }, T.gana + 2.5); tl.to("#lbl2", { opacity: 0, duration: 0.25 }, T.gana + 4.4); jump("fA", T.gana + 2.9);
  walk("fA", T.gana + 3.4, 1.4, -780); camTo("#cam_s5", T.gana + 3.3, 1.5, 680, 900, 1.3);
  $$("[id^=pc]").forEach((c, i) => fly(c, T.gana + 4.8 + i * 0.1, -509, -80, -560, 20, 0.5, 80));
  pop("#bchk", T.gana + 5.3, 0.3); tl.fromTo("#lbl3", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, immediateRender: false }, T.gana + 5.3); tl.to("#lbl3", { opacity: 0, duration: 0.25 }, T.complica + 0.2);
  tl.to("#storm", { opacity: 1, duration: 0.8 }, T.complica); tl.to("#sun", { opacity: 0, duration: 0.5 }, T.complica);
  tl.fromTo("#dclouds", { opacity: 0, x: 300 }, { opacity: 1, x: 0, duration: 1.0, ease: "power2.out", immediateRender: false }, T.complica);
  tl.to("#rain", { opacity: 1, duration: 0.4 }, T.complica + 0.5); tl.fromTo(".rd", { y: -60 }, { y: 60, duration: 0.35, ease: "none", repeat: 12, immediateRender: false }, T.complica + 0.5);
  camTo("#cam_s5", T.complica, 1.4, 1050, 900, 1.15); pop("#closed", T.complica + 1.4, 0.4); face("fA", T.complica + 1.0, "fl");
  tl.to("#fA-aL", { rotation: 8, transformOrigin: "50% 4%", duration: 0.4 }, T.complica + 1.0); tl.to("#fA-aR", { rotation: -8, transformOrigin: "50% 4%", duration: 0.4 }, T.complica + 1.0);
  wipe(T.monedal - 0.35, 530, 540, 860, 330, "#s6"); camSet("#cam_s6", T.monedal - 0.1, 540, 870, 1.0);
  tl.fromTo("#rcoin", { scale: 1 }, { scale: 0.62, transformOrigin: "50% 50%", duration: 0.5, ease: "back.in(2)", immediateRender: false }, T.monedal + 2.2);
  tl.to("#beam2", { rotation: 9, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(2)" }, T.monedal + 2.5);
  tl.to("#ucoin", { y: -10, duration: 0.6, yoyo: true, repeat: 11, ease: "sine.inOut" }, T.monedal + 3);
  tl.fromTo("#rcoin", { scale: 0.62 }, { scale: 1, duration: 0.3, immediateRender: false }, T.gana100 + 1.0); tl.to("#beam2", { rotation: 0, duration: 0.3 }, T.gana100 + 1.0);
  tl.to("#rcoin", { scale: 0.62, duration: 0.6, ease: "back.in(2)" }, T.gana100 + 5.0); tl.to("#beam2", { rotation: 9, duration: 0.5, ease: "back.out(2)" }, T.gana100 + 5.3);
  go("#sV", T.vias, "whip"); camSet("#cam_sV", 0, 530, 540, 1);
  ["#via0", "#via1", "#via2"].forEach((s, i) => pop(s, T.vias + 0.4 + i * 0.6, 0.3));
  ["#via0", "#via1", "#via2"].forEach((s, i) => tl.to(s, { scale: 1.15, transformOrigin: "50% 50%", duration: 0.25, yoyo: true, repeat: 1 }, T.moneda3 + [0, 1.2, 2.8][i]));
  tl.to("#via0", { y: 30, duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, T.fool2 + 0.5);
  tl.set("#viaLupa", { opacity: 1 }, T.mecan); [200, 530, 860].forEach((x, i) => tl.to("#viaLupa", { attr: { transform: `translate(${x} 520)` }, duration: 0.6, ease: "power2.inOut" }, T.mecan + i * 0.9));
  tl.to("#viaLupa", { opacity: 0, duration: 0.3 }, T.nosignif + 1.0);
  tl.to(["#via0", "#via1", "#via2"], { scale: 0.85, opacity: 0.6, transformOrigin: "50% 50%", duration: 0.4 }, T.nosignif + 1.0);
  // ================= 5 · EXPECTATIVAS Y RESULTADOS (169.7–201) =================
  go("#s7", T.clave, "fade"); camSet("#cam_s7", T.clave - 0.4, 540, 820, 1.0);
  POS.i1 = 0; POS.i2 = 0; POS.i3 = 0;
  tl.fromTo("#tvon", { opacity: 0 }, { opacity: 1, duration: 0.06, repeat: 3, yoyo: true, immediateRender: false }, T.precioesp); tl.set("#tvon", { opacity: 1 }, T.precioesp + 0.3);
  ["#tb0", "#tb1", "#tb2"].forEach((s, k) => { pop(s, T.precioesp + 1.5 + k * 0.3, 0.3); tl.to(s, { y: -12, duration: 0.6, yoyo: true, repeat: 5, ease: "sine.inOut" }, T.precioesp + 2 + k * 0.3); });
  ["i1", "i2", "i3"].forEach((id, k) => { face(id, T.noticiac + 0.3 + k * 0.1, "oh"); tl.to(`#${id}-br`, { y: -8, duration: 0.2 }, T.noticiac + 0.3); });
  camTo("#cam_s7", T.noticiac, 1.0, 760, 820, 1.0); pop("#boardi", T.noticiac + 0.5, 0.5); tl.to("#barr", { y: 60, duration: 0.5, ease: "power2.in" }, T.noticiac + 1.4);
  ["#tb0", "#tb1", "#tb2"].forEach(s => tl.to(s, { opacity: 0, duration: 0.2 }, T.noticiac + 1.4));
  ["i1", "i2", "i3"].forEach((id, k) => walk(id, T.noticiac + 2.0 + k * 0.08, 1.8, 900, 0.14));
  camTo("#cam_s7", T.efector - 0.3, 1.4, 1620, 960, 1.15);
  tl.fromTo("#truck", { x: 0 }, { x: 600, duration: T.mirar - T.efector, ease: "none", immediateRender: false }, T.efector);
  tl.to("#truck", { y: -3, duration: 0.12, yoyo: true, repeat: 70, ease: "sine.inOut" }, T.efector);
  camTo("#cam_s7", T.dos, 1.6, 1300, 900, 0.8);
  // ================= 6 · ¿CAÍDA = OPORTUNIDAD? (201–249.6) =================
  go("#sAB", T.barata, "fade"); camSet("#cam_sAB", 0, 530, 540, 1);
  tl.fromTo("#abQ", { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)", immediateRender: false }, T.barata + 0.5);
  tl.to("#abQ", { rotation: 8, transformOrigin: "50% 80%", duration: 0.5, yoyo: true, repeat: 7, ease: "sine.inOut" }, T.barata + 1);
  tl.to("#abQ", { opacity: 0, duration: 0.3 }, T.doscasos);
  [["#cA", 0], ["#cB", 0.2]].forEach(([s, o]) => { tl.fromTo(s + " .dn", { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(2)", immediateRender: false }, T.caen + o); tl.to(s, { y: 40, duration: 0.5, ease: "power2.in" }, T.caen + 0.4 + o); tl.to(s, { y: 20, duration: 0.6, ease: "power2.out" }, T.caen + 1.0 + o); });
  pop("#abCal", T.primera + 1.0, 0.5);
  tl.fromTo("#cA .rep", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, T.primera + 3.0); tl.set("#cA .ok", { opacity: 1 }, T.primera + 3.6);
  tl.to("#cA", { y: 0, duration: 0.6, ease: "back.out(2)" }, T.primera + 3.8);
  tl.fromTo("#cB .rep", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, T.segunda + 2.0); tl.set("#cB .bad", { opacity: 1 }, T.segunda + 2.8);
  tl.to("#cB", { y: 40, duration: 0.6 }, T.segunda + 3.0);
  tl.to("#cB", { rotation: 1.5, transformOrigin: "50% 100%", duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut" }, T.contrario);
  tl.to("#abCal", { opacity: 0, duration: 0.3 }, T.pregunta - 0.2);
  tl.fromTo("#abQ", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1.2, duration: 0.5, ease: "back.out(2)", immediateRender: false }, T.pregunta);
  // ================= 7 · CÓMO INVESTIGAR (249.6–294.8) =================
  go("#s8", T.quehacer, "whip"); camSet("#cam_s8", T.quehacer - 0.4, 540, 860, 1.0);
  const qs = [[T.uno, "#q1i", 800, 560, "#qk0"], [T.dos2, "#q2i", 800, 790, "#qk1"], [T.tres, "#q3i", 800, 960, "#qk2"]];
  qs.forEach(([t, s, x, y, k], i) => { pop(s, t - 0.15, 0.5); tl.set("#lupa", { opacity: 1 }, t - 0.1);
    tl.to("#lupa", { attr: { transform: `translate(${x} ${y}) scale(.75)` }, duration: 0.4, ease: "power2.inOut" }, t - 0.1);
    tl.to("#lupai", { x: 20, y: -10, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, t + 0.4); pop(k, t + 2.0, 0.3);
    tl.to("#fD-h", { rotation: [-8, 0, 8][i], transformOrigin: "50% 90%", duration: 0.3 }, t - 0.1);
    tl.to("#fD-aR", { rotation: -35, transformOrigin: "50% 4%", duration: 0.25, yoyo: true, repeat: 1 }, t + 0.2); });
  tl.to("#gear", { rotation: 720, transformOrigin: "50% 50%", duration: 10, ease: "none" }, T.dos2);
  tl.to("#lupa", { attr: { transform: "translate(660 760) scale(.75)" }, duration: 0.5, ease: "power2.inOut" }, T.cuatro);
  tl.to("#lupai", { rotation: 20, duration: 0.4, yoyo: true, repeat: 7, ease: "sine.inOut" }, T.cuatro + 0.5);
  tl.to("#fD-h", { rotation: 0, duration: 0.3 }, T.nodice); face("fD", T.entiende, "sm"); jump("fD", T.entiende + 0.2);
  // ================= 8 · CIERRE (294.8–324.8) =================
  wipe(T.titan - 0.4, 530, 540, 540, 560 - 330, "#s10"); camSet("#cam_s10", T.titan - 0.1, 540, 870, 1.0);
  pop("#binder", T.titan, 0.6); tl.to("#bfront", { scaleY: 0.12, duration: 0.45, ease: "power2.inOut" }, T.titan + 0.6); tl.to("#bt", { opacity: 0, duration: 0.2 }, T.titan + 0.55);
  $$(".pcard").forEach((c, i) => tl.fromTo(c, { opacity: 0, y: 220 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)", immediateRender: false }, T.titan + 0.8 + i * 0.14));
  tl.fromTo("#logo", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)", immediateRender: false }, T.titan + 1.6);
  tl.to("#glow", { scale: 1.15, transformOrigin: "50% 50%", duration: 1.1, yoyo: true, repeat: 11, ease: "sine.inOut" }, T.titan + 1.6);
  pop("#cloud2", T.incom + 1.0, 0.6);
  $$(".npr").forEach((n, i) => tl.fromTo(n, { opacity: 0, y: 0, rotation: 0 }, { opacity: 1, y: 230, rotation: 30 - i * 25, duration: 1.1, ease: "power1.in", repeat: 3, immediateRender: false }, T.incom + 1.4 + i * 0.25));
  tl.fromTo("#umb", { opacity: 0, scale: 0.1, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, T.incom + 1.8);
  tl.to("#fT-aR", { rotation: -40, transformOrigin: "50% 4%", duration: 0.3 }, T.incom + 1.75);
  tl.to(["#binder", "#logo"], { y: -60, opacity: 0.35, duration: 0.6 }, T.incom + 1.0);
  tl.to(["#umb", "#cloud2", ".npr"], { opacity: 0, duration: 0.4 }, T.entorno + 1.5); tl.set(".npr", { opacity: 0 }, T.entorno + 2.0);
  tl.to(["#binder", "#logo"], { y: 0, opacity: 1, duration: 0.6 }, T.entorno + 1.5);
  tl.to("#fT-aR", { rotation: -150, duration: 0.35, ease: "back.out(2)" }, T.cta);
  tl.to("#fT-aR", { rotation: -125, duration: 0.25, yoyo: true, repeat: 11, ease: "sine.inOut" }, T.cta + 0.35);
  tl.fromTo("#disc", { opacity: 0 }, { opacity: 1, duration: 0.4, immediateRender: false }, T.disc - 0.3);

  // ---------- panel izquierdo: titulares, capítulos y ficha ----------
  OV.forEach(([id, a, b]) => { tl.fromTo("#" + id, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", immediateRender: false }, a + 0.05); if (b !== null) tl.to("#" + id, { opacity: 0, duration: 0.25 }, b); });
  CH.forEach((t, k) => { const el = document.getElementById("cp" + k); tl.set(el, { attr: { class: "chp on" } }, t); tl.fromTo(el, { scale: 1.25 }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: false }, t);
    if (k + 1 < CH.length) tl.set(el, { attr: { class: "chp done" } }, CH[k + 1]); });
  tl.fromTo("#dock", { opacity: 0 }, { opacity: 1, duration: 0.4, immediateRender: false }, T.p17 + 2.0); tl.to("#dock", { opacity: 0, duration: 0.3 }, T.titan - 0.4);
  CG.forEach(([a, b, ws], i) => { tl.set("#cg" + i, { opacity: 1 }, a); tl.set("#cg" + i, { opacity: 0 }, b);
    ws.forEach(([s, e], j) => { const el = document.getElementById("cw" + i + "_" + j), c = el.getAttribute("class"); tl.set(el, { attr: { class: c + " on" } }, s); tl.set(el, { attr: { class: c } }, e); }); });
  tl.to({}, { duration: 0.01 }, DUR - 0.01);
  window.__timelines = window.__timelines || {}; window.__timelines["main"] = tl;
})();
