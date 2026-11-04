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
// ===== guion por versión (TRADE #027) =====
const ph = id => [S(id), F(id)];
// 1 · gancho: reloj de 9 a 10 AM y paso al gráfico real
swap("#sG", 0.1, "fade");
tl.fromTo("#g_1", { opacity: 0, scale: 1.2, transformOrigin: "0% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "power4.out", immediateRender: false }, 0.15);
shake("#g_1", 0.5, 7);
pop("#clkW", 0.4, 0.5); inn("#clkL", 0.7, { y: 14 });
tl.set("#hrH", { rotation: -90, svgOrigin: "150 150" }, 0); tl.set("#mnH", { rotation: 0, svgOrigin: "150 150" }, 0);
const G1 = ph(TK ? "g1" : "s1");
tl.to("#mnH", { rotation: 360, svgOrigin: "150 150", duration: 1.4, ease: "power2.inOut" }, G1[0] + 1.0);
tl.to("#hrH", { rotation: -60, svgOrigin: "150 150", duration: 1.4, ease: "power2.inOut" }, G1[0] + 1.0);
tl.to("#h9", { opacity: 0.35, duration: 0.3 }, G1[0] + 2.4);
tl.to("#clkW", { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1 }, G1[0] + 2.4);
const G2 = S(TK ? "g2" : "s2");
inn("#g_2", G2 - 0.1); inn("#g_3", G2 + 0.8, { y: 10 });
out(["#clkW", "#clkL"], G2 - 0.3, 0.3);
tl.fromTo("#cvA", { opacity: 0, scale: 0.85, filter: "blur(8px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.45, ease: EZ, immediateRender: true }, G2 - 0.2);
camSet("#cvA", 200, 600, 1.95, 420, 0); cam("#cvA", 200, 540, 1.95, 420, G2, TK ? 2.5 : 1.2);
draw("#cvA .hiD", G2 + 0.3, 0.9);
stamp("#g_tp", G2 + (TK ? 0.6 : 0.4)); tl.to("#g_tp", { opacity: 0.6, scale: 0.85, duration: 0.4 }, G2 + 2.0);
pose("senala", 0.5);
// 2 · entrada
const E0 = S(TK ? "e1" : "s3"); chapter(1, E0 - 0.2); swap("#sE", E0, "scan"); pose("explica", E0 + 0.1);
inn("#e_d", E0, { x: -40, y: 0 }); inn("#e_b", E0 + 0.5); inn("#e_a", E0 + 1.0, { y: 8 });
const E2 = ph(TK ? "e2" : "s4"), E3 = TK ? ph("e3") : [E2[0] + (E2[1] - E2[0]) * 0.55, E2[1]];
const rowT = [E2[0] + 0.3, E3[0], E3[1] - 0.2];
rowT.forEach((t, k) => { inn("#er" + k, t, { x: -60, y: 0 }); tl.fromTo(`#er${k} .sw`, { x: -220 }, { x: 900, duration: 0.7, ease: "power1.inOut", immediateRender: false }, t + 0.1); pop(`#er${k} i`, t + 0.35, 0.3); });
pose("senala", rowT[0] - 0.1); inn("#e_q", rowT[2] + 0.5, { y: 8 });
// 3 · desarrollo en el gráfico
const D0 = S(TK ? "r1" : "s5"), D1 = F(TK ? "r1" : "s5"); chapter(2, D0 - 0.2); swap("#sD", D0, "zoom"); pose("explica", D0);
camSet("#cvB", 200, 640, 1.95, 690, D0 - 0.3); cam("#cvB", 220, 520, 1.95, 690, D0 + 0.3, Math.max(1.6, D1 - D0));
inn("#d_t", D0 + 0.1, { y: -10 });
tl.fromTo("#cvB .hiE", { opacity: 0 }, { opacity: 1, duration: 0.2, yoyo: true, repeat: 3, immediateRender: false }, D0 + 0.1); tl.set("#cvB .hiE", { opacity: 1 }, D0 + 0.9); pop("#cvB .lbE", D0 + 0.2);
draw("#cvB .hiD", D0 + 0.5, 0.8); pop("#cvB .lbI", D0 + 0.7);
tl.fromTo("#cvB .hiT", { opacity: 0 }, { opacity: 1, duration: 0.2, yoyo: true, repeat: 3, immediateRender: false }, D0 + 1.2); tl.set("#cvB .hiT", { opacity: 1 }, D0 + 2.0); pop("#cvB .lbT", D0 + 1.3);
if (TK) { tl.fromTo("#cvB .hiO", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, D0 + (D1 - D0) * 0.62); pop("#cvB .lbO", D0 + (D1 - D0) * 0.65); }
// 4 · resultado: comprobante real (dinero y lotes tapados desde el primer cuadro)
const R0 = S(TK ? "r2" : "s6"), R0f = F(TK ? "r2" : "s6"), R3 = TK ? S("r3") : R0 + (R0f - R0) * 0.42;
chapter(3, R0 - 0.2); swap("#sR", R0, "flip"); pose("senala", R0 + 0.2);
tl.fromTo(["#rcd .cvM", "#rcd .cvL"], { scale: 1 }, { scale: 1.08, transformOrigin: "50% 50%", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, R0 + 0.5);
tl.fromTo("#rcd .rhE", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R0 + 0.6);
inn("#r_e", R0 + 0.7, { x: -40, y: 0 }); inn("#r_s", TK ? R0 + (R0f - R0) * 0.6 : R0 + 1.0, { x: -40, y: 0 });
out(["#r_e", "#r_s"], R3 - 0.2);
tl.fromTo("#r_tp", { opacity: 0, scale: 1.25, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "power4.in", immediateRender: false }, R3 - 0.05);
shake("#sR", R3 + 0.25, 10);
tl.fromTo("#r_tp", { boxShadow: "0 0 30px rgba(100,224,135,.2)" }, { boxShadow: "0 0 110px rgba(100,224,135,.6)", duration: 0.45, yoyo: true, repeat: 1, immediateRender: false }, R3 + 0.25);
tl.fromTo("#rcd .rhT", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R3 + 0.2);
tl.fromTo("#rcd .rhD", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R3 + 0.9);
tl.to(["#tubeL", "#tubeR"], { fill: "#64E087", duration: 0.2 }, R3 + 0.2); tl.to("#tubeL", { fill: "#A779F2", duration: 0.6 }, R3 + 1.6); tl.to("#tubeR", { fill: "#3FD0C9", duration: 0.6 }, R3 + 1.6);
inn("#r_n", R3 + 0.9, { y: 8 }); pose("satisfecho", R3 + 0.15);
// 5 · conclusión 1: el horario en observación
const C1 = S(TK ? "c1a" : "s8"); chapter(4, C1 - 0.2); swap("#sC1", C1, "slide"); pose("pensativo", C1 + 0.1);
stamp("#c1s", TK ? S("c1b") + 1.2 : S("s9") - 0.1);
const c1t = TK ? S("c1c") : S("s9") + 0.5; inn("#c1t", c1t); tl.fromTo("#c1t .ln2", { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: IO, immediateRender: false }, c1t + 0.2);
$$("#c1t .nd").forEach((nd, k) => { if (k) pop(nd, c1t + 0.3 + k * 0.15, 0.3); });
// 6 · conclusión 2: objetivo alcanzado y oscilaciones
const C2 = S(TK ? "c2a" : "s10"); chapter(5, C2 - 0.2); swap("#sC2", C2, "slide"); pose("senala", C2 + 0.2);
camSet("#cvC", 230, 520, 1.95, 470, C2 - 0.3); cam("#cvC", 260, 510, 1.85, 470, C2 + 0.5, 2.5);
draw("#cvC .hiD", C2 + 0.5, 0.8); pop("#cvC .lbI", C2 + 0.7);
tl.fromTo("#cvC .hiT", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, C2 + 1.2); pop("#cvC .lbT", C2 + 1.3);
const c2o = TK ? S("c2b") + 1.2 : S("s10") + 1.6;
tl.fromTo("#cvC .hiO", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, c2o); pop("#cvC .lbO", c2o + 0.1);
inn("#c2x", TK ? S("c2c") : S("s11"), { y: 10 });
// 7 · conclusión 3: ejecución vs seguimiento
const C3 = S(TK ? "c3a" : "s12"); chapter(6, C3 - 0.2); swap("#sC3", C3, "slide"); pose("pensativo", C3 + 0.1);
inn("#c3a", C3 + 0.3, { x: -50, y: 0 }); pop("#c3n", C3 + 0.9, 0.4);
inn("#c3b", TK ? S("c3b") : S("s13"), { x: 50, y: 0 }); inn("#c3c", TK ? S("c3c") : F("s13") - 1.6, { y: 10 });
// 8 · cierre
const X0 = S(TK ? "x1" : "s14"); chapter(7, X0 - 0.2); out(CUR, X0 - 0.3); tl.set("#sEnd", { opacity: 1 }, X0 - 0.15);
pop("#eP", X0 - 0.15, 0.6);
tl.fromTo("#sEnd .H span", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.18, ease: EZ, immediateRender: false }, X0);
inn("#disc", X0 + 0.4, { y: 0 }); pose("explica", X0);
const XF = TK ? F("x2") : S("s14") + 1.2;
pose0("neutral", XF - 0.6, 0.1); pose0("gira_1", XF - 0.3, 0.06); pose0("gira_2", XF - 0.15, 0.06); pose0("gira_3", XF, 0.06);
tl.to("#av", { y: 460, duration: 0.55, ease: "power2.in" }, XF + 0.2);
inn("#eL", XF + 0.25); inn("#eC", XF + 0.6);
tl.to(["#tubeL", "#tubeR", ".cl2"], { opacity: 0.12, duration: 0.6 }, DUR - 0.7);
lifeLayers(); eyeGlow();
tl.to({}, { duration: 0.01 }, DUR - 0.01);
window.__timelines = window.__timelines || {}; window.__timelines["main"] = tl;
