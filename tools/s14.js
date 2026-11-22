// ===== REPORTE SEMANAL #14 · trades #030, #031, #032 y #033 (4 SELL) · golpes, sellos, contadores, sacudidas y transiciones variadas =====
const ph = id => [S(id), F(id)];
const P = (tk, sh) => TK ? tk : sh;
function flash(t, o) { tl.fromTo("#flash", { opacity: o || 0.55 }, { opacity: 0, duration: 0.35, ease: "power2.out", immediateRender: false }, t); }
function punch(sel, t, k) { tl.fromTo(sel, { scale: 1 }, { scale: k || 1.06, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out", transformOrigin: "50% 50%", immediateRender: false }, t); }
function blinkHi(sel, t) { tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 3, immediateRender: false }, t); tl.set(sel, { opacity: 1 }, t + 0.65); }
function neon(c, t) { tl.to(["#tubeL", "#tubeR"], { fill: c, duration: 0.15 }, t); tl.to("#tubeL", { fill: "#A779F2", duration: 0.6 }, t + 1.2); tl.to("#tubeR", { fill: "#3FD0C9", duration: 0.6 }, t + 1.2); }
const camW = (px, py, s, h, w) => ({ x: w / 2 - px * s, y: h / 2 - py * s, scale: s });
function camA(sel, px, py, s, h, w, t, d) { if (d) tl.to(sel + " .cam", Object.assign({ duration: d, ease: IO }, camW(px, py, s, h, w)), t); else tl.set(sel + " .cam", camW(px, py, s, h, w), t); }

// 1 · GANCHO: «4 VENTAS. 4 TAKE PROFITS.» con los cuatro gráficos reales
const G1 = ph(P("g1", "s1")), G2 = TK ? ph("g2") : [G1[0] + (G1[1] - G1[0]) * 0.5, G1[1]];
tl.set("#sG", { opacity: 1 }, 0); CUR = "#sG";
tl.set("#g_1", { opacity: 1 }, 0); tl.fromTo("#g_1", { scale: 1.12, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.3, ease: "power4.out", immediateRender: true }, 0.0);
shake("#g_1", 0.32, 9);
const GN = [30, 31, 32, 33];
GN.forEach((n, i) => { const c = TRC[n]; camA("#gv" + n, c[0], c[1], c[2] * 0.55, 250, 440, 0);
  tl.fromTo("#gv" + n, { opacity: 1, scale: 0.6, rotation: i % 2 ? 4 : -4 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.45, ease: "back.out(1.6)", immediateRender: true }, 0.05 + i * 0.12);
  pop("#gt" + n, 0.5 + i * 0.12, 0.5);
  camA("#gv" + n, c[0], c[1], c[2] * 0.75, 250, 440, 0.8, 2.4);
  const ts = G1[0] + (G1[1] - G1[0]) * 0.55 + i * 0.32; stamp("#gp" + n, ts); shake("#sG", ts + 0.15, 6); });
neon("#64E087", G1[0] + (G1[1] - G1[0]) * 0.55); flash(G1[1] - 0.2, 0.25);
inn("#g_n", G2[0] + 0.4, { y: 10 });
pose("senala", 0.5); pose("explica", G2[0] + 0.2);

// 2 · CADA TRADE: gráfico real → comprobante con TP
const KS = ["zoom", "slide", "flip", "scan"];
function trade(n, i, A, R0) {   // A: tramo del gráfico; R0: inicio del comprobante
  const c = TRC[n]; chapter(1 + i, A[0] - 0.2); swap("#s" + n, A[0], KS[i % 4]); pose(i % 2 ? "explica" : "senala", A[0] + 0.15);
  stamp("#d" + n, A[0] + 0.05); neon("#FF6474", A[0]);
  camA("#cv" + n, c[0], c[1] - 40, c[2], 400, 900, A[0] - 0.3); camA("#cv" + n, c[0], c[1] + 30, c[2] * 1.12, 400, 900, A[0] + 0.3, Math.max(1.2, R0 - A[0] - 0.4));
  blinkHi("#cv" + n + " .hiE", A[0] + 0.4); pop("#cv" + n + " .lbE", A[0] + 0.5);
  const m = A[0] + (R0 - A[0]) * 0.3; inn("#sc" + n, m, { x: -60, y: 0 }); punch("#sc" + n, m + 0.4, 1.1);
  inn("#c" + n + "a", m + 0.5, { x: -60, y: 0 }); inn("#c" + n + "c", m + 0.8, { x: -60, y: 0 }); inn("#c" + n + "b", m + 1.0, { x: 60, y: 0 });
  draw("#cv" + n + " path.hiD", m + 0.6, 0.9); blinkHi("#cv" + n + " rect.hiD", m + 0.6); pop("#cv" + n + " .lbD", m + 0.9);
  blinkHi("#cv" + n + " .hiT", R0 - 0.9); pop("#cv" + n + " .lbT", R0 - 0.8);
  swap("#r" + n, R0, i % 2 ? "zoom" : "flip"); pose("satisfecho", R0 + 0.1);
  punch(["#rc" + n + " .cvM", "#rc" + n + " .cvL"], R0 + 0.3, 1.08);
  ["rhE", "rhD", "rhT"].forEach((h, k) => tl.fromTo("#rc" + n + " ." + h, { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R0 + 0.45 + k * 0.35));
  tl.fromTo("#tp" + n, { opacity: 0, scale: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.28, ease: "power4.in", immediateRender: false }, R0 + 0.55);
  punch("#n" + n, R0 + 0.75, 1.25); shake("#r" + n, R0 + 0.85, 10); flash(R0 + 0.8, 0.3); neon("#64E087", R0 + 0.75);
  inn("#rn" + n, R0 + 1.3, { y: 8 });
}
if (TK) { [["a1", "a2"], ["b1", "b2"], ["c1", "c2"], ["d1", "d2"]].forEach(([x, y], i) => trade(GN[i], i, ph(x), S(y) - 0.1)); }
else { ["s2", "s3", "s4", "s5"].forEach((x, i) => { const A = ph(x); trade(GN[i], i, A, A[0] + (A[1] - A[0]) * 0.5); }); }

// 3 · BALANCE: 4 TRADES · 4 TP · +405,00
const B0 = S(P("t1", "s6")); chapter(5, B0 - 0.2); swap("#sT", B0, "zoom"); pose("explica", B0 + 0.1);
stamp("#tK", B0 + 0.05); tl.fromTo("#tN", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, B0 + 0.6);
punch("#nT", B0 + 1.0, 1.25); shake("#sT", B0 + 1.1, 10); flash(B0 + 1.05, 0.35); neon("#64E087", B0 + 1.0); pose("satisfecho", B0 + 1.1);
inn("#tU", B0 + 1.3, { y: 10 }); inn("#tS", B0 + 1.8, { y: 10 }); inn("#tA", B0 + 2.4, { y: 10 }); punch("#tA", B0 + 2.9, 1.06); inn("#tR", B0 + 3.2, { y: 8 });

// 4 · APRENDIZAJES
const L1 = S(P("l1", "s7")); chapter(6, L1 - 0.2); swap("#sC1", L1, "slide"); pose("pensativo", L1 + 0.1);
GN.forEach((n, i) => { inn("#l1" + n, L1 + 0.3 + i * 0.3, { x: i % 2 ? 70 : -70, y: 0 }); });
punch("#l131", L1 + 1.6, 1.08); inn("#l1n", L1 + (F(P("l1", "s7")) - L1) * 0.55, { y: 12 });
const L2 = S(P("l2", "s8")), L2f = F(P("l2", "s8")); chapter(7, L2 - 0.2); swap("#sC2", L2, "scan"); pose("explica", L2 + 0.1);
GN.forEach((n, i) => { const t = L2 + 0.2 + i * 0.45; inn("#l2t" + n, t, { x: -40, y: 0 });
  tl.fromTo("#l2b" + n, { scaleX: 0 }, { scaleX: 1, duration: n % 2 ? 0.3 : 0.9, ease: "power2.out", immediateRender: false }, t + 0.1);
  inn("#l2v" + n, t + (n % 2 ? 0.35 : 0.9), { y: 8 }); if (n % 2) punch("#l2v" + n, t + 0.6, 1.12); });
inn("#l2n", L2f - 1.4, { y: 8 });
const L3 = S(P("l3", "s9")), L3f = F(P("l3", "s9")); chapter(8, L3 - 0.2); swap("#sC3", L3, "zoom"); pose("pensativo", L3 + 0.1);
inn("#l3o", L3 + 0.15, { y: -20 }); GN.forEach((n, i) => pop("#l3" + n, L3 + (L3f - L3) * 0.35 + i * 0.22, 0.6));
inn("#l3n", L3 + (L3f - L3) * 0.35 + 1.0, { y: 8 }); stamp("#l3s", L3f - 1.0); shake("#sC3", L3f - 0.8, 8); neon("#64E087", L3f - 0.9);

// 5 · CIERRE
const X0 = S(P("x1", "s10")); chapter(9, X0 - 0.2); out(CUR, X0 - 0.3); tl.set("#sEnd", { opacity: 1 }, X0 - 0.15);
stamp("#eK", X0 - 0.1); shake("#sEnd", X0 + 0.15, 8); neon("#64E087", X0);
tl.fromTo("#sEnd .H span", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.7, ease: EZ, immediateRender: false }, X0 + 0.5);
pop("#eL", X0 + 1.4, 0.5); inn("#eM", X0 + 2.4, { y: 8 });
inn("#disc", X0 + 0.4, { y: 0 }); pose("explica", X0); pose("satisfecho", X0 + 1.6);
const XF = DUR - 1.0;
pose0("gira_1", XF - 0.3, 0.06); pose0("gira_2", XF - 0.15, 0.06); pose0("gira_3", XF, 0.06);
tl.to(["#tubeL", "#tubeR", ".cl2"], { opacity: 0.12, duration: 0.6 }, DUR - 0.7);
lifeLayers(); eyeGlow();
tl.to({}, { duration: 0.01 }, DUR - 0.01);
window.__timelines = window.__timelines || {}; window.__timelines["main"] = tl;
