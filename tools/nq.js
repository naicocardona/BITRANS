(function () {
  // TITÁN · paquete Nasdaq · motor de línea de tiempo dirigido por datos (SCN, BEATS, OV, CG, HUD vienen del armador)
  const tl = gsap.timeline({ paused: true });
  const $$ = s => Array.from(document.querySelectorAll(s));
  const SCX = 540, SCY = 540;
  const K = k => "#cam" + k, S = k => "#s" + k;
  // cámara vectorial: se anima el viewBox del SVG (suave a cualquier velocidad) y nunca sale del recuadro de la escena
  const SV = k => "#cam" + k + " > svg";
  const VB = (px, py, s) => { s = Math.max(1, s); const h = 540 / s; px = Math.min(Math.max(px, h), 1080 - h); py = Math.min(Math.max(py, h), 1080 - h);
    return `${(px - h).toFixed(2)} ${(py - h).toFixed(2)} ${(2 * h).toFixed(2)} ${(2 * h).toFixed(2)}`; };
  const camTo = (k, t, d, px, py, s, ease = "sine.inOut") => tl.to(SV(k), { attr: { viewBox: VB(px, py, s) }, duration: d, ease }, t);
  const camSet = (k, t, px, py, s) => tl.set(SV(k), { attr: { viewBox: VB(px, py, s) } }, t);
  const pop = (sel, t, from = 0.5, d = 0.45) => tl.fromTo(sel, { opacity: 0, scale: from, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d, ease: "back.out(2)", immediateRender: false }, t);
  const show = (sel, t, d = 0.4) => tl.fromTo(sel, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: d, ease: "power3.out", immediateRender: false }, t);
  const out = (sel, t, d = 0.25) => tl.to(sel, { opacity: 0, duration: d }, t);
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
  const jump = (id, t, h = 30) => tl.to(`#${id}-bob`, { y: -h, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, t);
  const arm = (id, side, t, rot, d = 0.3) => tl.to(`#${id}-a${side}`, { rotation: rot, transformOrigin: "50% 3%", duration: d, ease: "back.out(1.6)" }, t);
  const FX = {
    on: (t, s) => tl.set(s, { opacity: 1 }, t), show: (t, s) => show(s, t), pop: (t, s) => pop(s, t), out: (t, s) => out(s, t),
    draw: (t, s, d = 1.2) => { const el = document.querySelector(s), L = el.getTotalLength(); tl.set(el, { attr: { "stroke-dasharray": L, "stroke-dashoffset": L } }, 0); tl.to(el, { attr: { "stroke-dashoffset": 0 }, duration: d, ease: "power2.inOut" }, t); },
    barup: (t, s) => tl.fromTo(s, { scaleY: 0, opacity: 1, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.6, ease: "back.out(1.4)", immediateRender: false }, t),
    bardn: (t, s) => tl.fromTo(s, { scaleY: 0, opacity: 1, transformOrigin: "50% 0%" }, { scaleY: 1, duration: 0.6, ease: "back.out(1.4)", immediateRender: false }, t),
    pulse: (t, s) => tl.to(s, { scale: 1.08, transformOrigin: "50% 50%", duration: 0.22, yoyo: true, repeat: 3, ease: "sine.inOut" }, t),
    dim: (t, s, v = 0.25) => tl.to(s, { opacity: v, duration: 0.3 }, t),
    lit: (t, s) => { tl.to(s, { opacity: 1, duration: 0.25 }, t); tl.to(s, { scale: 1.06, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1 }, t); },
    stagger: (t, s, d = 2.0) => { const els = $$(s); els.forEach((e, i) => tl.fromTo(e, { opacity: 0, scaleY: 0, transformOrigin: "50% 100%" }, { opacity: 1, scaleY: 1, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, t + d * i / els.length)); },
    walk: (t, id, dx, dur = 1.6) => walk(id, t, dur, dx), face: (t, id, k) => face(id, t, k), jump: (t, id) => jump(id, t),
    cheer: (t, id) => { arm(id, "L", t, 150); arm(id, "R", t, -150); jump(id, t + 0.05, 36); jump(id, t + 0.5, 26); arm(id, "L", t + 1.3, 0); arm(id, "R", t + 1.3, 0); },
    shrug: (t, id) => { arm(id, "L", t, 55); arm(id, "R", t, -55); tl.to(`#${id}-h`, { rotation: 8, transformOrigin: "50% 90%", duration: 0.25, yoyo: true, repeat: 1 }, t); arm(id, "L", t + 1.1, 0); arm(id, "R", t + 1.1, 0); },
    point: (t, id, d = 1.6) => { arm(id, "R", t, -120); arm(id, "R", t + d, 0); },
    wave: (t, id) => { arm(id, "R", t, -150); tl.to(`#${id}-aR`, { rotation: -120, duration: 0.18, yoyo: true, repeat: 5, ease: "sine.inOut" }, t + 0.3); arm(id, "R", t + 1.5, 0); },
    talk: (t, id, t1) => loop((tt, k) => tl.to(`#${id}-a${k % 2 ? "L" : "R"}`, { rotation: k % 2 ? 40 : -40, transformOrigin: "50% 3%", duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, tt), t, t1, 0.62),
    sweat: (t, id) => { tl.fromTo(`#${id}-sw`, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, t); tl.to(`#${id}-sw`, { opacity: 0, y: 30, duration: 0.8 }, t + 0.9); },
    move: (t, s, x, y, d = 0.6) => tl.to(s, { x, y, duration: d, ease: "power2.inOut" }, t),
    tap: (t, s) => tl.to(s, { scale: 0.85, transformOrigin: "0% 0%", duration: 0.1, yoyo: true, repeat: 1 }, t),
    shake: (t, s) => [14, -12, 8, -5, 0].forEach((v, k) => tl.to(s, { x: v, duration: 0.05, ease: "none" }, t + k * 0.05)),
    cam: () => 0,
  };
  // ---- escenas, cámara viva y transiciones (sin cuadros vacíos) ----
  SCN.forEach((c, k) => {
    tl.set(S(k), { opacity: k === 0 ? 1 : 0 }, 0);
    // cámara por tramos: cada llave se alcanza con suavidad y entre llaves siempre hay un leve acercamiento (nunca quieta)
    const keys = [[c.t0, c.c0[0], c.c0[1], c.c0[2], 0]].concat(BEATS.filter(x => x[1] === "cam" && x[2] === k).map(x => [x[0], x[3], x[4], x[5], x[6] || 0.9])).sort((p, q) => p[0] - q[0]);
    camSet(k, c.t0, c.c0[0], c.c0[1], c.c0[2]);
    keys.forEach((kk, i) => { const [t, px, py, s, dd] = kk; if (i) camTo(k, t, dd, px, py, s, "power2.inOut");
      const t2 = i + 1 < keys.length ? keys[i + 1][0] : c.t1, ts = t + dd, last = i + 1 === keys.length && keys.length === 1;
      if (t2 - ts > 0.1) { const tx = last ? c.c1 : [px, py, s * 1.03]; camTo(k, ts, t2 - ts, tx[0], tx[1], tx[2], "none"); } });
    if (k === 0) return;
    const t = c.t0, a = S(k - 1), b = S(k), tr = c.tr || "whip";
    if (tr === "whip") { tl.set(b, { opacity: 1 }, t); tl.fromTo(b, { x: 1100 }, { x: 0, duration: 0.36, ease: "power3.inOut", immediateRender: false }, t);
      tl.to(a, { x: -1100, duration: 0.36, ease: "power3.inOut" }, t); tl.set(a, { opacity: 0, x: 0 }, t + 0.37); }
    else if (tr === "wipe") { const w = "#wipe" + k; tl.set(w, { opacity: 1, scale: 0.01 }, t); tl.to(w, { scale: 22, duration: 0.3, ease: "power2.in" }, t);
      tl.set(a, { opacity: 0 }, t + 0.3); tl.set(b, { opacity: 1 }, t + 0.3); tl.to(w, { scale: 0.01, duration: 0.34, ease: "power2.out" }, t + 0.31); tl.set(w, { opacity: 0 }, t + 0.66); }
    else { const p = c.zp || [540, 540]; camTo(k - 1, t - 0.05, 0.5, p[0], p[1], 5, "power3.in");
      tl.fromTo(b, { opacity: 0 }, { opacity: 1, duration: 0.2, immediateRender: false }, t + 0.3);
      tl.fromTo(SV(k), { attr: { viewBox: VB(540, 540, 1.7) } }, { attr: { viewBox: VB(c.c0[0], c.c0[1], c.c0[2]) }, duration: 0.55, ease: "power3.out", immediateRender: false }, t + 0.3);
      tl.set(a, { opacity: 0 }, t + 0.55); }
  });
  // vida constante
  loop(t => tl.to(".eyeb", { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.07, yoyo: true, repeat: 1 }, t), 1.1, DUR, 2.7);
  $$(".led").forEach((l, i) => tl.to(l, { opacity: 0.2, duration: 0.3 + (i % 5) * 0.12, yoyo: true, repeat: Math.floor(DUR / 0.5), ease: "none" }, (i % 7) * 0.13));
  FIGS.forEach((id, i) => tl.fromTo(`#${id}-h`, { rotation: -3 }, { rotation: 3, transformOrigin: "50% 90%", duration: 1.3 + (i % 3) * 0.2, yoyo: true, repeat: Math.floor(DUR / 1.4), ease: "sine.inOut", immediateRender: false }, (i % 4) * 0.3));
  BEATS.forEach(([t, fx, ...a]) => FX[fx](t, ...a));
  // capa de texto
  OV.forEach(([id, a, b]) => { if (a > 0.05) show("#" + id, a); if (b < DUR - 0.05) out("#" + id, b, 0.2); });
  HUD.forEach((t, k) => { const el = document.getElementById("hs" + k); if (k) tl.set(document.getElementById("hs" + (k - 1)), { attr: { class: "hs done" } }, t);
    tl.set(el, { attr: { class: "hs on" } }, t); if (t > 0) tl.fromTo(el, { scale: 1.3 }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: false }, t); });
  CG.forEach(([a, b, ws], i) => { tl.set("#cg" + i, { opacity: 1 }, a); tl.set("#cg" + i, { opacity: 0 }, b);
    ws.forEach(([s, e], j) => { const el = document.getElementById("cw" + i + "_" + j), c = el.getAttribute("class"); tl.set(el, { attr: { class: c + " on" } }, s); tl.set(el, { attr: { class: c } }, e); }); });
  tl.to({}, { duration: 0.01 }, DUR - 0.01);
  window.__timelines = window.__timelines || {}; window.__timelines["main"] = tl;
})();
