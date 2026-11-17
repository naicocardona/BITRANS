// ===== TRADE #031 · SELL · score 9/10 · casi 100 puntos en menos de 5 minutos · cámara sobre la captura real, comprobante con tapas =====
const ph = id => [S(id), F(id)];
const mid = (id, f) => S(id) + (F(id) - S(id)) * f;
function flash(t, o) { tl.fromTo("#flash", { opacity: o || 0.55 }, { opacity: 0, duration: 0.35, ease: "power2.out", immediateRender: false }, t); }
function punch(sel, t, k) { tl.fromTo(sel, { scale: 1 }, { scale: k || 1.06, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out", transformOrigin: "50% 50%", immediateRender: false }, t); }
function blinkHi(sel, t) { tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 3, immediateRender: false }, t); tl.set(sel, { opacity: 1 }, t + 0.65); }
function neon(c, t) { tl.to(["#tubeL", "#tubeR"], { fill: c, duration: 0.15 }, t); tl.to("#tubeL", { fill: "#A779F2", duration: 0.6 }, t + 1.2); tl.to("#tubeR", { fill: "#3FD0C9", duration: 0.6 }, t + 1.2); }
function segs(sel, t) { $$(sel + " .seg i").forEach((s, k) => tl.fromTo(s, { scaleY: 0.2, opacity: 0.3 }, { scaleY: 1, opacity: 1, duration: 0.18, ease: "back.out(2)", immediateRender: false }, t + k * 0.06));
  tl.fromTo(sel + " .mk", { scaleY: 0 }, { scaleY: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, t + 0.7); }
const N = TK ? { g1: "g1", g2: "g2", e1: "e1", e2: "e2", e3: "e3", d: "d1", r: "d2", rt: "d3", x: "x1" } : { g1: "s1", g2: "s1", e1: "s3", e2: "s3", e3: "s4", d: "s5", r: "s5", rt: "s6", x: "s11" };

// 1 · GANCHO: SCORE 6/10 · JUSTO EN EL MÍNIMO · gráfico real desde el primer cuadro · radar empatado (sin revelar el resultado)
tl.set("#sG", { opacity: 1 }, 0); CUR = "#sG";
tl.set("#g_1", { opacity: 1 }, 0); tl.fromTo("#g_1", { scale: 1.12, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.3, ease: "power4.out", immediateRender: true }, 0.0); shake("#g_1", 0.32, 9);
camSet("#gv", 180, 400, 2.45, 250, 0); tl.set("#gv", { opacity: 1 }, 0);
tl.fromTo("#gv", { x: -60, rotation: -2 }, { x: 0, rotation: 0, duration: 0.5, ease: "back.out(1.4)", immediateRender: true }, 0.0);
tl.set("#gS", { opacity: 1 }, 0); tl.fromTo("#gS", { scale: 0.6, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: true }, 0.05);
segs("#gS", 0.2); punch("#gS", mid(N.g1, 0.7), 1.1); shake("#gS", mid(N.g1, 0.72), 7); neon("#A779F2", mid(N.g1, 0.7));
cam("#gv", 184, 420, 2.7, 250, 0.6, 3.0); blinkHi("#gv .hiE", 1.0); pop("#gv .lbE", 1.1); pose("senala", 0.3);
inn("#g_r", TK ? mid("g1", 0.6) : mid("s1", 0.5), { x: -60, y: 0 }); punch("#g_r", TK ? mid("g1", 0.9) : mid("s1", 0.8), 1.08);
inn("#g_q", TK ? mid("g2", 0.5) : F("s1") + 0.05, { x: -40, y: 0 }); punch("#g_q", TK ? F("g2") : F("s1") + 0.4, 1.06); pose("explica", TK ? S("g2") + 0.1 : F("s1"));

// 2 · ENTRADA: 15 NOV · 11 PM · SELL · ENTRADA TRADINGVIEW 27.813,8 · tarjetas progresivas
const E1 = ph(N.e1); chapter(1, E1[0] - 0.2); swap("#sE", E1[0], "zoom"); pose("senala", E1[0] + 0.2);
stamp("#e_d", E1[0] + 0.05); stamp("#e_p", E1[0] + 0.4); inn("#e_n", E1[0] + 0.3, { y: 6 }); neon("#FF6474", E1[0] + 0.4);
camSet("#cvE", 184, 410, 2.45, 300, E1[0] - 0.3); cam("#cvE", 184, 420, 2.7, 300, E1[0] + 0.3, 2.6);
inn("#e_tv", E1[0] + 0.3, { x: -60, y: 0 }); blinkHi("#cvE .hiE", E1[0] + 0.6); pop("#cvE .lbE", E1[0] + 0.7);
if (TK) {
  inn("#e_s", mid("e1", 0.75), { x: -60, y: 0 }); punch("#e_s", F("e1"), 1.08);
  inn("#e_r", mid("e2", 0.1), { x: 60, y: 0 }); punch("#e_r", mid("e2", 0.3), 1.08);
  inn("#e_m", mid("e2", 0.45), { x: 60, y: 0 }); punch("#e_m", mid("e2", 0.6), 1.06);
  inn("#e_c", mid("e2", 0.8), { x: -60, y: 0 }); punch("#e_c", mid("e2", 0.95), 1.08); neon("#FF6474", mid("e2", 0.95));
  inn("#e_a", S("e3") + 0.1, { x: -60, y: 0 }); punch("#e_a", mid("e3", 0.7), 1.1); shake("#sE", mid("e3", 0.72), 7); inn("#e_q", F("e3") + 0.1, { x: 60, y: 0 }); inn("#e_x", F("e3") + 0.4, { y: 8 });
} else {
  inn("#e_s", mid("s3", 0.3), { x: -60, y: 0 }); punch("#e_s", mid("s3", 0.4), 1.06);
  inn("#e_r", mid("s3", 0.55), { x: 60, y: 0 }); punch("#e_r", mid("s3", 0.7), 1.08);
  inn("#e_m", mid("s3", 0.85), { x: 60, y: 0 }); inn("#e_c", F("s3"), { x: -60, y: 0 });
  inn("#e_a", S("s4") + 0.1, { x: -60, y: 0 }); punch("#e_a", mid("s4", 0.7), 1.1); inn("#e_q", F("s4") + 0.05, { x: 60, y: 0 }); inn("#e_x", F("s4") + 0.2, { y: 8 });
}

// 3 · DESARROLLO (TradingView): descenso hacia el objetivo, con pausas y rebotes
const D1 = ph(N.d); chapter(2, D1[0] - 0.2); swap("#sD", D1[0], "slide"); pose("senala", D1[0] + 0.15);
camSet("#cvD", 184, 430, 2.45, 566, D1[0] - 0.3); inn("#d_n", D1[0], { y: 6 }); tl.set("#cvD .hiE", { opacity: 1 }, D1[0] - 0.3); tl.set("#cvD .lbE", { opacity: 1 }, D1[0] - 0.3);
inn("#d_a", D1[0] + 0.1, { x: -40, y: 0 }); tl.fromTo("#cvD .hiD", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, D1[0] + 0.2); pop("#cvD .lbD", D1[0] + 0.7);
blinkHi("#cvD .hiT", D1[0] + 1.0); pop("#cvD .lbT", D1[0] + 1.1); neon("#64E087", D1[0] + 1.1); shake("#sD", D1[0] + 1.15, 6);
const dp = TK ? mid("d1", 0.75) : D1[0] + 1.6; out("#d_a", dp - 0.1); inn("#d_b", dp, { x: -40, y: 0 }); tl.fromTo("#cvD .hiP", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, dp + 0.1); pop("#cvD .lbP", dp + 0.4);
cam("#cvD", 184, 470, 2.45, 566, D1[0] + 1.6, 1.6);

// 4 · EJECUCIÓN (BRÓKER): comprobante con lote, dinero, Δ y saldo tapados · +99,95 PTS
const R0 = TK ? S(N.r) : mid("s5", 0.4); chapter(3, R0 - 0.2); swap("#sR", R0, "flip"); pose("senala", R0 + 0.1); inn("#r_src", R0 + 0.1, { y: -10 });
punch(["#rc30 .cvM", "#rc30 .cvL", "#rc30 .cvP", "#rc30 .cvB"], R0 + 0.3, 1.08);
tl.fromTo("#rc30 .rhE", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R0 + 0.5); punch("#rc30 .rhE", R0 + 0.9, 1.04);
const RT = TK ? S("d3") : S("s6");
tl.fromTo("#rtp", { opacity: 0, scale: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.28, ease: "power4.in", immediateRender: false }, RT);
punch("#nR", RT + 0.35, 1.2); shake("#sR", RT + 0.3, 8); flash(RT + 0.28, 0.25); neon("#64E087", RT + 0.3); pose("satisfecho", RT + 0.2);
tl.fromTo("#rc30 .rhT", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, RT + 1.6);
tl.fromTo("#rc30 .rhD", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, TK ? mid("d3", 0.6) : RT + 0.9);
inn("#rn", RT + 1.0, { y: 8 });

// 5 · CONCLUSIONES (TikTok: una pantalla cada una) / APRENDIZAJES (Shorts: tres tarjetas)
if (TK) {
  const L1 = ph("l1a"); chapter(4, L1[0] - 0.3); swap("#sC1", L1[0] - 0.1, "zoom"); pose("pensativo", L1[0] + 0.1);
  inn("#c1g", L1[0] + 0.1, { x: -80, y: 0 }); segs("#c1g", L1[0] + 0.2);
  inn("#c1e", mid("l1a", 0.35), { x: 60, y: 0 }); inn("#c1c", mid("l1a", 0.45), { x: 60, y: 0 });
  inn("#c1r", mid("l1a", 0.7), { x: 60, y: 0 }); punch("#c1r", mid("l1a", 0.85), 1.1); shake("#c1r", mid("l1a", 0.88), 6);
  stamp("#c1s", F("l1a") + 0.1); shake("#sC1", F("l1a") + 0.15, 6);
  const L2 = ph("l2a"); chapter(5, L2[0] - 0.3); swap("#sC2", L2[0] - 0.1, "slide"); pose("explica", L2[0] + 0.1);
  inn("#c2a", L2[0] + 0.15, { x: -80, y: 0 }); punch("#c2a", mid("l2a", 0.6), 1.05);
  inn("#c2b", S("l2b") + 0.1, { x: 80, y: 0 }); punch("#c2b", mid("l2b", 0.8), 1.08); neon("#64E087", mid("l2b", 0.8));
  pop("#c2n", mid("l2b", 0.4), 0.3); shake("#c2n", mid("l2b", 0.5), 6); stamp("#c2s", F("l2b") + 0.05); shake("#sC2", F("l2b") + 0.1, 6);
  const L3 = ph("l3a"); chapter(6, L3[0] - 0.3); swap("#sC3", L3[0] - 0.1, "scan"); pose("pensativo", L3[0] + 0.1);
  inn("#c3t", L3[0] + 0.1, { x: -80, y: 0 }); neon("#64E087", L3[0] + 0.2);
  inn("#c3m", mid("l3a", 0.35), { x: 80, y: 0 }); punch("#c3m", mid("l3a", 0.8), 1.05);
  inn("#c3n", S("l3b") + 0.1, { y: 8 }); stamp("#c3s", mid("l3b", 0.7)); shake("#sC3", mid("l3b", 0.75), 7);
} else {
  const C0 = ph("s7"); chapter(4, C0[0] - 0.2); swap("#sC", C0[0], "zoom"); pose("pensativo", C0[0] + 0.1);
  const at = [S("s8"), S("s9"), S("s10")];
  [0, 1, 2].forEach(k => { inn("#cl" + k, C0[0] + 0.15 + k * 0.12, { x: -80, y: 0 }); tl.to("#cl" + k, { opacity: 0.3, duration: 0.3 }, C0[1] + 0.1);
    tl.to("#cl" + k, { opacity: 1, duration: 0.25 }, at[k]); punch("#cl" + k, at[k] + 0.05, 1.06); if (k) tl.to("#cl" + (k - 1), { opacity: 0.45, duration: 0.25 }, at[k]); });
  shake("#sC", S("s10") + 0.1, 6);
}

// 6 · CIERRE: TRADE #031 · SELL · +99,95 PUNTOS · 4 MIN 54 S
const X0 = S(N.x) - (TK ? 0 : 0.6); chapter(TK ? 7 : 5, X0 - 0.2); out(CUR, X0 - 0.3); tl.set("#sEnd", { opacity: 1 }, X0 - 0.15);
stamp("#eK", X0 - 0.1); tl.fromTo("#eN", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, X0 + 0.2);
punch("#nT", X0 + 0.6, 1.15); shake("#sEnd", X0 + 0.65, 8); flash(X0 + 0.6, 0.3); neon("#64E087", X0 + 0.6); inn("#eU", X0 + 0.4, { y: 10 });
const XS = S(N.x);
tl.fromTo("#sEnd .H span", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, stagger: TK ? Math.max(0.4, S("x2") - S("x1")) : 0.6, ease: EZ, immediateRender: false }, XS - 0.1);
inn("#eS", XS + 0.9, { y: 8 }); inn("#disc", X0 + 0.4, { y: 0 }); pose("explica", X0); pose("satisfecho", X0 + 0.7);
const XF = DUR - 1.0;
pose0("gira_1", XF - 0.3, 0.06); pose0("gira_2", XF - 0.15, 0.06); pose0("gira_3", XF, 0.06);
tl.to(["#tubeL", "#tubeR", ".cl2"], { opacity: 0.12, duration: 0.6 }, DUR - 0.7);
lifeLayers(); eyeGlow();
tl.to({}, { duration: 0.01 }, DUR - 0.01);
window.__timelines = window.__timelines || {}; window.__timelines["main"] = tl;
