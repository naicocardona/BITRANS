// ===== TRADE #028 · SELL · score 6/10 justo en el mínimo · golpes, sellos, cámara sobre la captura real, comprobante con tapas =====
const ph = id => [S(id), F(id)];
const mid = (id, f) => S(id) + (F(id) - S(id)) * f;
function flash(t, o) { tl.fromTo("#flash", { opacity: o || 0.55 }, { opacity: 0, duration: 0.35, ease: "power2.out", immediateRender: false }, t); }
function punch(sel, t, k) { tl.fromTo(sel, { scale: 1 }, { scale: k || 1.06, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out", transformOrigin: "50% 50%", immediateRender: false }, t); }
function blinkHi(sel, t) { tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 3, immediateRender: false }, t); tl.set(sel, { opacity: 1 }, t + 0.65); }
function neon(c, t) { tl.to(["#tubeL", "#tubeR"], { fill: c, duration: 0.15 }, t); tl.to("#tubeL", { fill: "#A779F2", duration: 0.6 }, t + 1.2); tl.to("#tubeR", { fill: "#3FD0C9", duration: 0.6 }, t + 1.2); }
function segs(sel, t) { $$(sel + " .seg i").forEach((s, k) => tl.fromTo(s, { scaleY: 0.2, opacity: 0.3 }, { scaleY: 1, opacity: 1, duration: 0.18, ease: "back.out(2)", immediateRender: false }, t + k * 0.06));
  tl.fromTo(sel + " .mk", { scaleY: 0 }, { scaleY: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, t + 0.7); }

// 1 · GANCHO: «SCORE 6/10: JUSTO EN EL MÍNIMO» desde el primer cuadro, gráfico real en primer plano
const G1 = ph(TK ? "g1" : "s1"), G2 = ph(TK ? "g2" : "s2");
tl.set("#sG", { opacity: 1 }, 0); CUR = "#sG";
tl.set("#g_1", { opacity: 1 }, 0); tl.fromTo("#g_1", { scale: 1.12, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.3, ease: "power4.out", immediateRender: true }, 0.0); shake("#g_1", 0.32, 9);
camSet("#gv", 400, 600, 1.2, 390, 0); tl.set("#gv", { opacity: 1 }, 0);
tl.fromTo("#gv", { x: -60, rotation: -2 }, { x: 0, rotation: 0, duration: 0.5, ease: "back.out(1.4)", immediateRender: true }, 0.0);
tl.set("#gS", { opacity: 1 }, 0); tl.fromTo("#gS", { scale: 0.6, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: true }, 0.05);
segs("#gS", 0.2); punch("#gS", mid(TK ? "g1" : "s1", 0.75), 1.12); shake("#gS", mid(TK ? "g1" : "s1", 0.78), 8); neon("#64E087", mid(TK ? "g1" : "s1", 0.75));
cam("#gv", 395, 595, 1.4, 390, 0.6, G1[1] - 0.6);
blinkHi("#gv .hiE", G1[0] + 0.8); pop("#gv .lbE", G1[0] + 0.9);
if (TK) { inn("#g_q", G2[0] + 0.1, { x: -40, y: 0 }); punch("#g_q", G2[0] + 0.9, 1.06); }
else { punch("#g_1", G2[0] + 0.1, 1.05); inn("#g_q", G2[0] + 0.2, { x: -40, y: 0 }); punch("#g_q", G2[0] + 0.8, 1.06); }
pose("senala", 0.3); pose("explica", G2[0] + 0.1);

// 2 · ENTRADA: 8 NOV · 11 PM COLOMBIA · SELL 27.106,45 + lectura (radar, confluencia, EMA, ATR)
const E1 = ph(TK ? "e1" : "s3"), E2 = TK ? ph("e2") : ph("s4");
chapter(1, E1[0] - 0.2); swap("#sE", E1[0], "zoom"); pose("senala", E1[0] + 0.2);
stamp("#e_d", E1[0] + 0.05); inn("#e_n", E1[0] + 0.3, { y: 6 }); stamp("#e_p", E1[0] + 0.45); neon("#FF6474", E1[0] + 0.4);
camSet("#cvE", 430, 570, 1.6, 420, E1[0] - 0.3); cam("#cvE", 450, 580, 1.85, 420, E1[0] + 0.3, 2.4);
blinkHi("#cvE .hiE", E1[0] + 0.7); pop("#cvE .lbE", E1[0] + 0.8);
const eR = TK ? mid("e1", 0.45) : mid("s4", 0.15), eC = TK ? mid("e1", 0.62) : mid("s4", 0.3);
inn("#e_r", eR, { x: -60, y: 0 }); punch("#e_r", eR + 0.4, 1.08); inn("#e_c", eC, { x: -60, y: 0 }); punch("#e_c", eC + 0.4, 1.08);
const eM = TK ? mid("e2", 0.1) : mid("s4", 0.7); inn("#e_m", eM, { x: -60, y: 0 }); punch("#e_m", eM + 0.4, 1.06);
if (TK) { const eA = mid("e2", 0.55); inn("#e_a", eA, { x: -60, y: 0 }); punch("#e_a", eA + 0.4, 1.08); shake("#sE", eA + 0.45, 6); inn("#e_x", E2[1] + 0.05, { y: 10 }); punch("#e_x", E2[1] + 0.6, 1.05); }
else tl.set("#e_a", { opacity: 0 }, 0);
pose("explica", E2[0] + 0.1);

// 3 · DESARROLLO: descenso hacia el objetivo, siguió bajando y rebotó (solo lo que muestra la captura)
const D1 = ph(TK ? "d1" : "s5"); chapter(2, D1[0] - 0.2); swap("#sD", D1[0], "slide"); pose("senala", D1[0] + 0.15);
camSet("#cvD", 400, 620, 1.55, 566, D1[0] - 0.3); inn("#d_n", D1[0], { y: 6 }); tl.set("#cvD .hiE", { opacity: 1 }, D1[0] - 0.3);
inn("#d_a", D1[0] + 0.1, { x: -40, y: 0 }); draw("#cvD .hiD", D1[0] + 0.2, 1.0);
blinkHi("#cvD .hiT", D1[0] + 0.9); neon("#64E087", D1[0] + 1.0);
cam("#cvD", 440, 720, 1.05, 566, D1[0] + 1.2, 1.2); 
out("#d_a", mid(TK ? "d1" : "s5", 0.7)); inn("#d_b", mid(TK ? "d1" : "s5", 0.72), { x: -40, y: 0 });
draw("#cvD .hiR", mid(TK ? "d1" : "s5", 0.78), 0.8);  cam("#cvD", 470, 700, 1.05, 566, mid(TK ? "d1" : "s5", 0.78), 1.0);
shake("#sD", mid(TK ? "d1" : "s5", 0.9), 6);

// 4 · RESULTADO: comprobante (entrada y salida resaltadas, lote/dinero/Δ tapados) y +101,45 puntos
const R0 = TK ? S("d2") : S("s6"); chapter(3, R0 - 0.2); swap("#sR", R0, "flip"); pose("satisfecho", R0 + 0.1);
punch(["#rc28 .cvM", "#rc28 .cvL", "#rc28 .cvP"], R0 + 0.3, 1.08);
tl.fromTo("#rc28 .rhE", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R0 + 0.5); punch("#rc28 .rhE", R0 + 0.9, 1.04);
const RT = TK ? S("d3") : R0 + 0.9;
tl.fromTo("#rtp", { opacity: 0, scale: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.28, ease: "power4.in", immediateRender: false }, RT);
punch("#nR", RT + 0.35, 1.25); shake("#sR", RT + 0.3, 10); flash(RT + 0.28, 0.3); neon("#64E087", RT + 0.3);
tl.fromTo("#rc28 .rhD", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, RT + 0.8);
tl.fromTo("#rc28 .rhT", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, TK ? mid("d3", 0.62) : RT + 1.4); if (TK) punch("#rc28 .rhT", mid("d3", 0.7), 1.06);
inn("#rn", RT + 1.0, { y: 8 });

// 5 · APRENDIZAJES (una pantalla y una pausa breve para cada uno)
if (TK) {
  const L1 = ph("l1a"); chapter(4, L1[0] - 0.3); swap("#sC1", L1[0] - 0.1, "zoom"); pose("pensativo", L1[0] + 0.1);
  inn("#c1r", mid("l1a", 0.1), { x: 60, y: 0 }); punch("#c1r", mid("l1a", 0.25), 1.06);
  pop("#c1g", mid("l1a", 0.38), 0.6); segs("#c1g", mid("l1a", 0.4)); punch("#c1g", mid("l1a", 0.6), 1.08);
  inn("#c1e", mid("l1a", 0.78), { x: 60, y: 0 }); punch("#c1e", mid("l1a", 0.9), 1.06);
  inn("#c1a", S("l1b") + 0.2, { x: -80, y: 0 }); inn("#c1b", mid("l1b", 0.55), { x: 80, y: 0 }); pop("#c1n", mid("l1b", 0.62), 0.3); shake("#c1n", mid("l1b", 0.7), 6);
  stamp("#c1s", mid("l1b", 0.25)); tl.to("#c1s", { opacity: 0, duration: 0.25 }, mid("l1b", 0.5)); stamp("#c1s", F("l1b") - 0.6); shake("#sC1", F("l1b") - 0.35, 7);
  const L2 = ph("l2a"); chapter(5, L2[0] - 0.3); swap("#sC2", L2[0] - 0.1, "slide"); pose("explica", L2[0] + 0.1);
  inn("#c2a", L2[0] + 0.15, { x: -80, y: 0 }); punch("#c2a", mid("l2a", 0.3), 1.05);
  inn("#c2b", mid("l2a", 0.5), { x: 80, y: 0 }); punch("#c2b", mid("l2a", 0.85), 1.08); neon("#64E087", mid("l2a", 0.85));
  pop("#c2n", mid("l2a", 0.95), 0.3); shake("#c2n", F("l2a"), 6); stamp("#c2s", mid("l2b", 0.35)); shake("#sC2", mid("l2b", 0.4), 7);
  const L3 = ph("l3a"); chapter(6, L3[0] - 0.3); swap("#sC3", L3[0] - 0.1, "scan"); pose("pensativo", L3[0] + 0.1);
  inn("#c3m", L3[0] + 0.15); punch("#c3m", mid("l3a", 0.75), 1.05);
  inn("#c3l1", S("l3b"), { x: -40, y: 0 }); tl.fromTo("#c3b1", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.out", immediateRender: false }, S("l3b") + 0.1);
  inn("#c3l2", mid("l3b", 0.45), { x: -40, y: 0 }); tl.fromTo("#c3b2", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power1.inOut", immediateRender: false }, mid("l3b", 0.5));
  inn("#c3n", S("l3c") + 0.1, { y: 8 }); stamp("#c3s", mid("l3c", 0.55)); shake("#sC3", mid("l3c", 0.6), 7);
} else {
  const C0 = ph("s7"); chapter(4, C0[0] - 0.2); swap("#sC", C0[0], "zoom"); pose("pensativo", C0[0] + 0.1);
  const at = [S("s8"), S("s9"), S("s10")];
  [0, 1, 2].forEach(k => { inn("#cl" + k, C0[0] + 0.15 + k * 0.12, { x: -80, y: 0 }); tl.to("#cl" + k, { opacity: 0.3, duration: 0.3 }, C0[1] + 0.1);
    tl.to("#cl" + k, { opacity: 1, duration: 0.25 }, at[k]); punch("#cl" + k, at[k] + 0.05, 1.06); if (k) tl.to("#cl" + (k - 1), { opacity: 0.45, duration: 0.25 }, at[k]); });
  shake("#sC", S("s10") + 0.1, 6);
}

// 6 · CIERRE: TRADE #028 · SELL · TP · +101,45 PUNTOS
const X0 = S(TK ? "x1" : "s11") - (TK ? 0 : 0.6); chapter(TK ? 7 : 5, X0 - 0.2); out(CUR, X0 - 0.3); tl.set("#sEnd", { opacity: 1 }, X0 - 0.15);
stamp("#eK", X0 - 0.1); tl.fromTo("#eN", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, X0 + 0.2);
punch("#nT", X0 + 0.6, 1.2); shake("#sEnd", X0 + 0.65, 10); flash(X0 + 0.6, 0.35); neon("#64E087", X0 + 0.6); inn("#eU", X0 + 0.4, { y: 10 });
const XS = TK ? S("x1") : S("s11");
tl.fromTo("#sEnd .H span", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, stagger: TK ? Math.max(0.4, S("x2") - S("x1")) : 0.6, ease: EZ, immediateRender: false }, XS - 0.1);
inn("#eS", XS + 0.9, { y: 8 }); inn("#disc", X0 + 0.4, { y: 0 }); pose("explica", X0); pose("satisfecho", X0 + 0.7);
const XF = DUR - 1.0;
pose0("gira_1", XF - 0.3, 0.06); pose0("gira_2", XF - 0.15, 0.06); pose0("gira_3", XF, 0.06);
tl.to(["#tubeL", "#tubeR", ".cl2"], { opacity: 0.12, duration: 0.6 }, DUR - 0.7);
lifeLayers(); eyeGlow();
tl.to({}, { duration: 0.01 }, DUR - 0.01);
window.__timelines = window.__timelines || {}; window.__timelines["main"] = tl;
