// ===== TRADE #032 · SELL nocturno · score 7/10 · referencias TradingView vs. ejecución del bróker · recorrido MFE 300 / MAE 30 =====
const ph = id => [S(id), F(id)];
const mid = (id, f) => S(id) + (F(id) - S(id)) * f;
function flash(t, o) { tl.fromTo("#flash", { opacity: o || 0.55 }, { opacity: 0, duration: 0.35, ease: "power2.out", immediateRender: false }, t); }
function punch(sel, t, k) { tl.fromTo(sel, { scale: 1 }, { scale: k || 1.06, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out", transformOrigin: "50% 50%", immediateRender: false }, t); }
function blinkHi(sel, t) { tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 3, immediateRender: false }, t); tl.set(sel, { opacity: 1 }, t + 0.65); }
function show(sel, t) { tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, t); }
function neon(c, t) { tl.to(["#tubeL", "#tubeR"], { fill: c, duration: 0.15 }, t); tl.to("#tubeL", { fill: "#A779F2", duration: 0.6 }, t + 1.2); tl.to("#tubeR", { fill: "#3FD0C9", duration: 0.6 }, t + 1.2); }
function segs(sel, t) { $$(sel + " .seg i").forEach((s, k) => tl.fromTo(s, { scaleY: 0.2, opacity: 0.3 }, { scaleY: 1, opacity: 1, duration: 0.18, ease: "back.out(2)", immediateRender: false }, t + k * 0.06));
  tl.fromTo(sel + " .mk", { scaleY: 0 }, { scaleY: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, t + 0.7); }
const N = TK ? { g1: "g1", g2: "g2", e1: "e1", e2: "e2", d: "d1", r: "d2", rt: "d3", m: "m1", x: "x1" } : { g1: "s1", g2: "s1", e1: "s2", e2: "s2", d: "s3", r: "s4", rt: "s4", m: "s5", x: "s10" };

// 1 · GANCHO: SELL NOCTURNO +103,70 PUNTOS · score 7/10 · gráfico real · «la sesión siguió moviéndose después»
tl.set("#sG", { opacity: 1 }, 0); CUR = "#sG";
tl.set("#g_1", { opacity: 1 }, 0); tl.fromTo("#g_1", { scale: 1.12, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.3, ease: "power4.out", immediateRender: true }, 0.0); shake("#g_1", 0.32, 9);
camSet("#gv", 154, 300, 2.9, 250, 0); tl.set("#gv", { opacity: 1 }, 0);
tl.fromTo("#gv", { x: -60, rotation: -2 }, { x: 0, rotation: 0, duration: 0.5, ease: "back.out(1.4)", immediateRender: true }, 0.0);
tl.set("#gS", { opacity: 1 }, 0); tl.fromTo("#gS", { scale: 0.6, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: true }, 0.05);
segs("#gS", 0.2); punch("#g_1 span", mid(N.g1, 0.75), 1.08); shake("#gS", mid(N.g1, 0.78), 6); neon("#64E087", mid(N.g1, 0.75));
cam("#gv", 154, 330, 2.9, 250, 0.6, 3.0); blinkHi("#gv .hiE", 0.9); pose("senala", 0.3);
inn("#g_r", mid(N.g1, 0.35), { x: -60, y: 0 }); punch("#g_r", mid(N.g1, 0.55), 1.06);
inn("#g_q", TK ? S("g2") + 0.05 : F("s1") - 0.4, { x: -40, y: 0 }); punch("#g_q", TK ? mid("g2", 0.8) : F("s1"), 1.06); pose("explica", TK ? S("g2") : F("s1") - 0.3);
if (TK) { show("#gv .hiA", S("g2") + 0.2); tl.to("#gv .cam", { x: 450 - 250 * 2.9, y: 125 - 380 * 2.9, scale: 2.9, duration: 1.2, ease: IO }, S("g2") + 0.1); }

// 2 · DECISIÓN: 16 NOV · 11 PM COLOMBIA · score 7/10 vs mínimo 6 · Bear +6 / Bull −5 · EMA mixta
const E1 = ph(N.e1); chapter(1, E1[0] - 0.2); swap("#sE", E1[0], "zoom"); pose("explica", E1[0] + 0.2);
stamp("#e_d", E1[0] + 0.05); stamp("#e_p", E1[0] + 0.4); neon("#FF6474", E1[0] + 0.4);
inn("#eS", E1[0] + 0.3, { y: 10 }); segs("#eS", E1[0] + 0.4); punch("#eS", TK ? mid("e1", 0.6) : mid("s2", 0.25), 1.08);
const eR = TK ? S("e2") : mid("s2", 0.45), eM = TK ? mid("e2", 0.65) : mid("s2", 0.8);
inn("#e_c", TK ? F("e1") - 0.3 : mid("s2", 0.35), { x: -60, y: 0 });
inn("#e_r", eR + 0.1, { x: 60, y: 0 }); punch("#e_r", eR + 0.5, 1.08);
inn("#e_m", eM, { x: -60, y: 0 }); punch("#e_m", eM + 0.35, 1.08); shake("#sE", eM + 0.38, 6);
inn("#e_a", eM + 0.5, { x: 60, y: 0 }); inn("#e_q", eM + 0.8, { x: -60, y: 0 }); inn("#e_s", eM + 0.95, { x: 60, y: 0 }); inn("#e_x", eM + 1.1, { y: 8 });

// 3 · REFERENCIAS DE TRADINGVIEW: entrada, objetivo y stop rotulados como referencias; descenso y rebote
const D1 = ph(N.d); chapter(2, D1[0] - 0.2); swap("#sD", D1[0], "slide"); pose("senala", D1[0] + 0.15);
camSet("#cvD", 154, 290, 2.6, 576, D1[0] - 0.3); inn("#d_src", D1[0], { x: -40, y: 0 }); inn("#d_n", D1[0] + 0.2, { y: 6 });
blinkHi("#cvD .hiE", D1[0] + 0.3); pop("#cvD .lbE", D1[0] + 0.4);
blinkHi("#cvD .hiT", mid(N.d, 0.55)); pop("#cvD .lbT", mid(N.d, 0.6)); neon("#64E087", mid(N.d, 0.6));
blinkHi("#cvD .hiS", mid(N.d, 0.75)); pop("#cvD .lbS", mid(N.d, 0.8));
show("#cvD .hiD", F(N.d) - 0.2); pop("#cvD .lbD", F(N.d)); show("#cvD .hiP", F(N.d) + 0.3); pop("#cvD .lbP", F(N.d) + 0.4); shake("#sD", F(N.d) + 0.1, 5);
cam("#cvD", 154, 300, 2.4, 576, D1[0] + 1.2, 2.0);

// 4 · EJECUCIÓN (BRÓKER): comprobante con lote, dinero, Δ y filas cortadas tapados · +103,70 PUNTOS
const R0 = S(N.r); chapter(3, R0 - 0.2); swap("#sR", R0, "flip"); pose("senala", R0 + 0.1); inn("#r_src", R0 + 0.1, { y: -10 });
punch(["#rc30 .cvM", "#rc30 .cvL", "#rc30 .cvP"], R0 + 0.3, 1.08);
show("#rc30 .rhE", R0 + 0.5); punch("#rc30 .rhE", R0 + 0.9, 1.04);
const RT = TK ? S("d3") : mid("s4", 0.65);
tl.fromTo("#rtp", { opacity: 0, scale: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.28, ease: "power4.in", immediateRender: false }, RT);
punch("#nR", RT + 0.35, 1.15); shake("#sR", RT + 0.3, 7); flash(RT + 0.28, 0.2); neon("#64E087", RT + 0.3); pose("satisfecho", RT + 0.2);
show("#rc30 .rhT", RT + 1.1); show("#rc30 .rhD", RT + 1.6); inn("#rn", RT + 1.0, { y: 8 });

// 5 · RECORRIDO DE SESIÓN: MFE 300 / MAE 30, incluye lo posterior al cierre
const M0 = ph(N.m); chapter(4, M0[0] - 0.2); swap("#sM", M0[0], "scan"); pose("pensativo", M0[0] + 0.2);
camSet("#cvM", 180, 340, 1.75, 420, M0[0] - 0.3); tl.set(["#cvM .hiE", "#cvM .hiT"], { opacity: 1 }, M0[0] - 0.3);
show("#cvM .hiA", M0[0] + 0.4); pop("#cvM .lbA", M0[0] + 0.6); cam("#cvM", 200, 360, 1.6, 420, M0[0] + 0.5, 2.5);
inn("#m_t", mid(N.m, 0.2), { x: -60, y: 0 }); inn("#m_s", mid(N.m, 0.45), { x: 60, y: 0 }); punch("#m_s", mid(N.m, 0.7), 1.06); shake("#sM", mid(N.m, 0.72), 6);

// 6 · CONCLUSIONES (TikTok: una pantalla cada una) / APUNTES (Shorts)
if (TK) {
  const L1 = ph("l1"); chapter(5, L1[0] - 0.3); swap("#sC1", L1[0] - 0.1, "zoom"); pose("pensativo", L1[0] + 0.1);
  inn("#c1g", L1[0] + 0.1, { x: -80, y: 0 }); segs("#c1g", L1[0] + 0.2); inn("#c1c", mid("l1", 0.3), { x: 60, y: 0 });
  inn("#c1e", mid("l1", 0.5), { x: 60, y: 0 }); punch("#c1e", mid("l1", 0.65), 1.1); stamp("#c1s", mid("l1", 0.8)); shake("#sC1", mid("l1", 0.85), 6);
  const L2 = ph("l2"); chapter(6, L2[0] - 0.3); swap("#sC2", L2[0] - 0.1, "slide"); pose("explica", L2[0] + 0.1);
  inn("#c2b", L2[0] + 0.15, { x: 80, y: 0 }); punch("#c2b", mid("l2", 0.35), 1.06); neon("#64E087", mid("l2", 0.35));
  inn("#c2a", mid("l2", 0.55), { x: -80, y: 0 }); pop("#c2n", mid("l2", 0.7), 0.3); stamp("#c2s", F("l2") - 0.2); shake("#sC2", F("l2") - 0.15, 6);
  const L3 = ph("l3"); chapter(7, L3[0] - 0.3); swap("#sC3", L3[0] - 0.1, "scan"); pose("pensativo", L3[0] + 0.1);
  inn("#c3m", L3[0] + 0.15, { x: 80, y: 0 }); inn("#c3t", mid("l3", 0.35), { x: -80, y: 0 }); neon("#64E087", mid("l3", 0.35));
  inn("#c3n", mid("l3", 0.55), { y: 8 }); stamp("#c3s", mid("l3", 0.78)); shake("#sC3", mid("l3", 0.82), 7);
} else {
  const C0 = ph("s6"); chapter(5, C0[0] - 0.2); swap("#sC", C0[0], "zoom"); pose("pensativo", C0[0] + 0.1);
  const at = [S("s7"), S("s8"), S("s9")];
  [0, 1, 2].forEach(k => { inn("#cl" + k, C0[0] + 0.15 + k * 0.12, { x: -80, y: 0 }); tl.to("#cl" + k, { opacity: 0.3, duration: 0.3 }, C0[1] + 0.1);
    tl.to("#cl" + k, { opacity: 1, duration: 0.25 }, at[k]); punch("#cl" + k, at[k] + 0.05, 1.06); if (k) tl.to("#cl" + (k - 1), { opacity: 0.45, duration: 0.25 }, at[k]); });
  shake("#sC", S("s9") + 0.1, 6);
}

// 7 · CIERRE
const X0 = S(N.x) - (TK ? 0 : 0.6); chapter(TK ? 8 : 6, X0 - 0.2); out(CUR, X0 - 0.3); tl.set("#sEnd", { opacity: 1 }, X0 - 0.15);
stamp("#eK", X0 - 0.1); tl.fromTo("#eN", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, X0 + 0.2);
punch("#nT", X0 + 0.6, 1.12); shake("#sEnd", X0 + 0.65, 7); flash(X0 + 0.6, 0.25); neon("#64E087", X0 + 0.6); inn("#eU", X0 + 0.4, { y: 10 });
const XS = S(N.x);
tl.fromTo("#sEnd .H span", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, stagger: TK ? Math.max(0.4, S("x2") - S("x1")) : 0.6, ease: EZ, immediateRender: false }, XS - 0.1);
inn("#eS", XS + 0.9, { y: 8 }); inn("#disc", X0 + 0.4, { y: 0 }); pose("explica", X0); pose("satisfecho", X0 + 0.7);
const XF = DUR - 1.0;
pose0("gira_1", XF - 0.3, 0.06); pose0("gira_2", XF - 0.15, 0.06); pose0("gira_3", XF, 0.06);
tl.to(["#tubeL", "#tubeR", ".cl2"], { opacity: 0.12, duration: 0.6 }, DUR - 0.7);
lifeLayers(); eyeGlow();
tl.to({}, { duration: 0.01 }, DUR - 0.01);
window.__timelines = window.__timelines || {}; window.__timelines["main"] = tl;
