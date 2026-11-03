const tl = gsap.timeline({ paused: true });
const EZ = "power3.out", IO = "power2.inOut", S = n => T[n][0], F = n => T[n][1], TK = V === "tiktok";
const $$ = s => Array.from(document.querySelectorAll(s));
function inn(sel, t, o) { o = o || {}; tl.fromTo(sel, { opacity: 0, y: o.y === undefined ? 22 : o.y, x: o.x || 0 }, { opacity: 1, y: 0, x: 0, duration: o.d || 0.4, ease: EZ, stagger: o.st || 0, immediateRender: false }, t); }
function out(sel, t, d) { tl.to(sel, { opacity: 0, duration: d || 0.25, ease: "power2.in" }, t); }
function pop(sel, t, f) { tl.fromTo(sel, { opacity: 0, scale: f || 0.7 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, t); }
function stamp(sel, t) { tl.fromTo(sel, { opacity: 0, scale: 1.7 }, { opacity: 1, scale: 1, duration: 0.22, ease: "power4.in", immediateRender: false }, t); }
function chapter(i, t) { $$(".ch").forEach((c, k) => tl.to(c, { opacity: k === i ? 1 : 0, duration: 0.25 }, t)); }
function shake(sel, t, a) { [a, -a * 0.8, a * 0.5, -a * 0.3, 0].forEach((v, k) => tl.to(sel, { x: v, duration: 0.05, ease: "none" }, t + k * 0.05)); }
const camV = (px, py, s, h) => ({ x: 450 - px * s, y: h / 2 - py * s, scale: s });
function cam(sel, px, py, s, h, t, d) { tl.to(sel + " .cam", Object.assign({ duration: d, ease: IO }, camV(px, py, s, h)), t); }
function camSet(sel, px, py, s, h, t) { tl.set(sel + " .cam", camV(px, py, s, h), t); }
function draw(sel, t, d) { $$(sel).forEach(p => { const L = p.getTotalLength(); tl.set(p, { attr: { "stroke-dasharray": L, "stroke-dashoffset": L }, opacity: 1 }, t); tl.to(p, { attr: { "stroke-dashoffset": 0 }, duration: d, ease: IO }, t); }); }
// transiciones entre escenas
let CUR = null;
function swap(next, t, kind) {
  const prev = CUR; CUR = next;
  if (prev) { if (kind === "zoom") tl.to(prev, { opacity: 0, scale: 1.08, filter: "blur(6px)", duration: 0.3, ease: "power2.in" }, t - 0.3);
              else if (kind === "slide") tl.to(prev, { opacity: 0, x: -140, duration: 0.3, ease: "power2.in" }, t - 0.3);
              else tl.to(prev, { opacity: 0, duration: 0.3 }, t - 0.3); }
  if (kind === "zoom") tl.fromTo(next, { opacity: 0, scale: 0.86, filter: "blur(8px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.45, ease: EZ, immediateRender: false }, t - 0.32);
  else if (kind === "slide") tl.fromTo(next, { opacity: 0, x: 160 }, { opacity: 1, x: 0, duration: 0.4, ease: EZ, immediateRender: false }, t - 0.32);
  else if (kind === "flip") tl.fromTo(next, { opacity: 0, rotationX: -70, transformPerspective: 1400, transformOrigin: "50% 0%" }, { opacity: 1, rotationX: 0, duration: 0.55, ease: "back.out(1.4)", immediateRender: false }, t - 0.32);
  else { tl.set(next, { opacity: 1 }, t - 0.32); tl.fromTo(next, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.45, ease: IO, immediateRender: false }, t - 0.32); }
  tl.fromTo("#scanF", { opacity: 0.9, y: 0 }, { opacity: 0, y: 600, duration: 0.7, ease: "power2.out", immediateRender: false }, t - 0.32);
}
// ===== Explorador (biblioteca V3) =====
const POSES = $$(".pose").map(e => e.id.slice(3)); const SCHED = [], BL = []; let ZP = 1;
function pose0(n, t, d) { tl.set("#av_" + n, { zIndex: ++ZP }, t); tl.fromTo("#av_" + n, { opacity: 0 }, { opacity: 1, duration: d, ease: "power1.out", immediateRender: false }, t);
  POSES.forEach(p => { if (p !== n) tl.set("#av_" + p, { opacity: 0 }, t + d); }); SCHED.push([t, n]); }
function pose(n, t) { const via = { senala: ["senala_t1", "senala_t2"], pensativo: ["piensa_t1", "piensa_t2"], satisfecho: ["tp_t1", "tp_t2"] }[n];
  if (via) { via.forEach((m, i) => pose0(m, t + i * 0.2, 0.08)); t += via.length * 0.2; }
  pose0(n, t, 0.1); tl.fromTo("#avIn", { y: 0 }, { y: -10, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.out", immediateRender: false }, t); }
tl.set("#av_neutral", { opacity: 1 }, 0); SCHED.push([0, "neutral"]);
tl.fromTo("#av", { y: 420 }, { y: 0, duration: 0.55, ease: "back.out(1.3)", immediateRender: true }, 0.1);
tl.to("#avIn", { scaleY: 1.01, duration: 1.5, yoyo: true, repeat: Math.floor(DUR / 1.5) - 1, ease: "sine.inOut" }, 0);
function lifeLayers() { const s = SCHED.slice().sort((a, b) => a[0] - b[0]);
  const on = (id, a, b, f) => { tl.set("#av_" + id, { zIndex: 9000 }, a); tl.to("#av_" + id, { opacity: 1, duration: f || 0.04 }, a); tl.to("#av_" + id, { opacity: 0, duration: f || 0.04 }, b); if (id.endsWith("_c")) BL.push([a, b + 0.04]); };
  s.forEach(([t0, n], i) => { const t1 = i + 1 < s.length ? s[i + 1][0] : DUR;
    if (["senala", "pensativo", "satisfecho"].includes(n)) for (let t = t0 + 1.0; t < t1 - 0.4; t += 3.3) on(n + "_c", t, t + 0.13);
    if (n === "explica") { let c = 0; for (let t = t0 + 0.4; t < t1 - 0.6; t += 1.6, c++) { if (c % 2 === 0) on("explica_c", t + 0.05, t + 0.18); if (t + 0.8 < t1 - 0.2) on(c % 2 ? "habla_3" : "habla_2", t + 0.4, t + 0.8, 0.06); } } }); }
function eyeGlow() { const s = SCHED.slice().sort((a, b) => a[0] - b[0]); const G = {}; $$(".gl").forEach(e => { G[e.id.slice(3)] = e; }); const o = { p: 0 };
  tl.to(o, { p: 1, duration: DUR, ease: "none", onUpdate: () => { const t = tl.time(); let n = "neutral"; for (const [t0, m] of s) { if (t0 <= t) n = m; else break; }
    let v = ENV[Math.min(ENV.length - 1, Math.max(0, Math.round(t * 30)))] || 0; for (const [a, b] of BL) if (t >= a && t <= b) { v *= 0.2; break; }
    for (const k in G) G[k].style.opacity = k === n ? v.toFixed(3) : "0"; } }, 0); }
// ===== laboratorio vivo =====
gsap.set("#ch0", { opacity: 1 });
tl.fromTo("#pb", { scaleX: 0 }, { scaleX: 1, duration: DUR, ease: "none", immediateRender: false }, 0);
[0.0, 0.08, 0.14, 0.3].forEach((t, k) => tl.set(["#tubeL", "#tubeR", ".cl2"], { opacity: k % 2 ? 0.15 : 0.75 }, t));
tl.to(".cl2", { opacity: 0.3, duration: 1.2, yoyo: true, repeat: Math.floor(DUR / 1.2) - 1, ease: "sine.inOut", stagger: 0.4 }, 0.4);
tl.to("#sweep", { rotation: 360, svgOrigin: "0 0", duration: 2.4, ease: "none", repeat: Math.floor(DUR / 2.4) - 1 }, 0);
$$(".led").forEach((l, i) => tl.to(l, { opacity: 0.2, duration: 0.3 + (i % 4) * 0.15, yoyo: true, repeat: Math.floor(DUR / 0.6), ease: "steps(1)" }, (i % 5) * 0.17));
[".sl0", ".sl1", ".sl2"].forEach((s, i) => tl.to(s, { scaleX: 0.55, transformOrigin: "0% 50%", duration: 0.7 + i * 0.3, yoyo: true, repeat: Math.floor(DUR / (0.7 + i * 0.3)) - 1, ease: "sine.inOut" }, i * 0.2));
$$(".pt").forEach((p, i) => tl.fromTo(p, { y: 0 }, { y: -120 - (i % 5) * 30, duration: DUR, ease: "none", immediateRender: false }, 0));
CAPS.forEach(([a, b], i) => { tl.fromTo("#cp" + i, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.14, ease: EZ, immediateRender: false }, a); tl.to("#cp" + i, { opacity: 0, duration: 0.1 }, b - 0.1); });
// ===== guion por versión =====
const K = TK ? { G: "g1", G2: "g2", E: "e1", E2: "e2", E3: "e3", E4: "e4", D: "r1", R: "r2", R3: "r3", C1: "c1a", C1b: "c1b", C1c: "c1c", C2: "c2a", C2b: "c2b", C2c: "c2c", C3: "c3a", C3b: "c3b", C3c: "c3c", C3d: "c3d", X: "x1", X2: "x2" }
             : { G: "s1", G2: "s2", E: "s3", E2: "s4", E3: "s5", E4: "s5", D: "s6", R: "s7", R3: "s8", C1: "s10", C2: "s11", C2c: "s12", C3: "s13", X: "s15", X2: "s16" };
const P = (k, f) => K[k] ? S(K[k]) : f;
// 1 · gancho
swap("#sG", 0.1, "fade");
tl.fromTo("#g_1", { opacity: 0, scale: 1.25, transformOrigin: "0% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "power4.out", immediateRender: false }, 0.15);
shake("#g_1", 0.5, 8);
inn("#g_2", S(K.G2) - 0.1); inn("#g_3", S(K.G2) + 0.9, { y: 10 });
camSet("#cvA", 300, 560, 1.75, 440, 0); cam("#cvA", 380, 640, 1.75, 440, 0.3, F(K.G2));
draw("#cvA .hiD", 0.9, 1.4);
stamp("#g_tp", F(K.G) - 0.35); tl.to("#g_tp", { opacity: 0.55, scale: 0.85, duration: 0.4 }, F(K.G) + 1.0);
pose("senala", 0.5);
// 2 · entrada
const E0 = S(K.E); chapter(1, E0 - 0.2); swap("#sE", E0, "scan"); pose("explica", E0 + 0.1);
inn("#e_d", E0, { x: -40, y: 0 }); inn("#e_b", E0 + 0.6);
const rowT = TK ? [S(K.E2), S(K.E3), S(K.E4), S(K.E4) + (F(K.E4) - S(K.E4)) * 0.55] : [S(K.E2), S(K.E3), S(K.E3) + (F(K.E3) - S(K.E3)) * 0.55, F(K.E3) - 0.2];
rowT.forEach((t, k) => { inn("#er" + k, t, { x: -60, y: 0 }); tl.fromTo(`#er${k} .sw`, { x: -220 }, { x: 900, duration: 0.7, ease: "power1.inOut", immediateRender: false }, t + 0.1); pop(`#er${k} i`, t + 0.35, 0.3); });
pose("senala", rowT[0] - 0.1);
inn("#e_q", rowT[3] + 0.6, { y: 8 });
// 3 · desarrollo sobre el gráfico
const D0 = S(K.D); chapter(2, D0 - 0.2); swap("#sD", D0, "zoom"); pose("explica", D0);
camSet("#cvB", 300, 520, 1.55, 690, D0 - 0.3); cam("#cvB", 380, 640, 1.72, 690, D0 + 0.2, F(K.D) - D0 + 0.2);
tl.fromTo("#cvB .hiE", { opacity: 0 }, { opacity: 1, duration: 0.2, yoyo: true, repeat: 3, immediateRender: false }, D0 + 0.2); tl.set("#cvB .hiE", { opacity: 1 }, D0 + 1.0);
pop("#cvB .lbE", D0 + 0.3); draw("#cvB .hiD", D0 + 0.6, 1.2);
tl.fromTo("#cvB .hiT", { opacity: 0 }, { opacity: 1, duration: 0.2, yoyo: true, repeat: 3, immediateRender: false }, D0 + 1.6); tl.set("#cvB .hiT", { opacity: 1 }, D0 + 2.4); pop("#cvB .lbT", D0 + 1.7);
// 4 · resultado: comprobante real
const R0 = S(K.R), R3 = S(K.R3); chapter(3, R0 - 0.2); swap("#sR", R0, "flip"); pose("senala", R0 + 0.2);
pop("#rcd .cvM", R0 + 0.5, 0.6); pop("#rcd .cvL", R0 + 0.7, 0.6);
tl.fromTo("#rcd .rhE", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R0 + 0.9);
inn("#r_e", R0 + 1.0, { x: -40, y: 0 }); inn("#r_s", R0 + (F(K.R) - R0) * 0.55, { x: -40, y: 0 });
out(["#r_e", "#r_s"], R3 - 0.2);
tl.fromTo("#r_tp", { opacity: 0, scale: 1.25, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "power4.in", immediateRender: false }, R3 - 0.05);
shake("#sR", R3 + 0.25, 10);
tl.fromTo("#r_tp", { boxShadow: "0 0 30px rgba(100,224,135,.2)" }, { boxShadow: "0 0 110px rgba(100,224,135,.6)", duration: 0.45, yoyo: true, repeat: 1, immediateRender: false }, R3 + 0.25);
tl.fromTo("#rcd .rhT", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R3 + 0.2);
tl.fromTo("#rcd .rhD", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R3 + (TK ? 1.6 : 0.6));
tl.to(["#tubeL", "#tubeR"], { fill: "#64E087", duration: 0.2 }, R3 + 0.2); tl.to("#tubeL", { fill: "#A779F2", duration: 0.6 }, R3 + 1.6); tl.to("#tubeR", { fill: "#3FD0C9", duration: 0.6 }, R3 + 1.6);
inn("#r_n", R3 + 0.9, { y: 8 });
pose("satisfecho", R3 + 0.15);
// 5 · conclusión 1
const C1 = S(K.C1); chapter(4, C1 - 0.2); swap("#sC1", C1, "slide"); pose("explica", C1 + 0.1);
stamp("#c1s", TK ? S(K.C1b) + 0.2 : C1 + 1.8);
const c1t = TK ? S(K.C1c) : C1 + 3.4; inn("#c1t", c1t); tl.fromTo("#c1t .ln2", { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: IO, immediateRender: false }, c1t + 0.2);
// 6 · conclusión 2
const C2 = S(K.C2); chapter(5, C2 - 0.2); swap("#sC2", C2, "slide"); pose("senala", C2 + 0.2);
inn("#c2a", C2 + 0.5, { x: -50, y: 0 }); pop("#c2n", C2 + 1.2, 0.4);
inn("#c2b", TK ? S(K.C2b) : C2 + 1.8, { x: 50, y: 0 }); inn("#c2c", S(K.C2c), { y: 10 });
// 7 · conclusión 3
const C3 = S(K.C3); chapter(6, C3 - 0.2); swap("#sC3", C3, "slide"); pose("pensativo", C3 + 0.1);
inn("#c3g", TK ? S(K.C3b) : C3 + 0.4, { y: 30 }); inn("#c3r", TK ? S(K.C3c) : C3 + 1.6, { y: 30 }); inn("#c3t", TK ? S(K.C3d) : C3 + 3.2, { y: 14 });
// 8 · cierre
const X0 = S(K.X); chapter(7, X0 - 0.2); out(CUR, X0 - 0.3); tl.set("#sEnd", { opacity: 1 }, X0 - 0.15);
pop("#eP", X0 - 0.15, 0.6);
tl.fromTo("#sEnd .H span", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.18, ease: EZ, immediateRender: false }, X0);
inn("#disc", X0 + 0.4, { y: 0 }); pose("explica", X0);
const XF = TK ? F(K.X2) : S(K.X) + 0.9;
pose0("neutral", XF - 0.6, 0.1); pose0("gira_1", XF - 0.3, 0.06); pose0("gira_2", XF - 0.15, 0.06); pose0("gira_3", XF, 0.06);
tl.to("#av", { y: 460, duration: 0.55, ease: "power2.in" }, XF + 0.2);
inn("#eL", XF + 0.25); inn("#eC", XF + 0.7);
tl.to(["#tubeL", "#tubeR", ".cl2"], { opacity: 0.12, duration: 0.6 }, DUR - 0.7);
lifeLayers(); eyeGlow();
tl.to({}, { duration: 0.01 }, DUR - 0.01);
window.__timelines = window.__timelines || {}; window.__timelines["main"] = tl;
