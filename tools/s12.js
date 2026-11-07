// ===== RESUMEN SEMANAL #12 · más movimiento: golpes, sellos, contadores, sacudidas y transiciones variadas =====
const ph = id => [S(id), F(id)];
function flash(t, o) { tl.fromTo("#flash", { opacity: o || 0.55 }, { opacity: 0, duration: 0.35, ease: "power2.out", immediateRender: false }, t); }
function punch(sel, t, k) { tl.fromTo(sel, { scale: 1 }, { scale: k || 1.06, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out", transformOrigin: "50% 50%", immediateRender: false }, t); }
function count(sel, t, d, a, b, dec) { punch(sel, t + 0.1, 1.25); return; const el = document.querySelector(sel), o = { v: a }; const f = v => v.toFixed(dec).replace(".", ",");
  tl.set(o, { v: a }, 0); tl.call(() => { el.textContent = f(a); }, null, 0);
  tl.to(o, { v: b, duration: d, ease: "power2.out", onUpdate: () => { el.textContent = f(o.v); } }, t); }
function blinkHi(sel, t) { tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 3, immediateRender: false }, t); tl.set(sel, { opacity: 1 }, t + 0.65); }
function neon(c, t) { tl.to(["#tubeL", "#tubeR"], { fill: c, duration: 0.15 }, t); tl.to("#tubeL", { fill: "#A779F2", duration: 0.6 }, t + 1.2); tl.to("#tubeR", { fill: "#3FD0C9", duration: 0.6 }, t + 1.2); }

// 1 · GANCHO: «UNA VENTA. UNA COMPRA. DOS TP.» con los dos gráficos reales
const G1 = ph(TK ? "g1" : "s1"), G2 = ph(TK ? "g2" : "s2");
tl.set("#sG", { opacity: 1 }, 0); CUR = "#sG";   // gancho visible desde el primer cuadro
tl.set("#g_1", { opacity: 1 }, 0); tl.fromTo("#g_1", { scale: 1.12, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.3, ease: "power4.out", immediateRender: true }, 0.0);
shake("#g_1", 0.32, 9);
camSet("#gvA", 300, 600, 1.0, 400, 0); camSet("#gvB", 231, 560, 1.0, 400, 0);
tl.fromTo("#gvA", { opacity: 1, x: -60, rotation: -3 }, { opacity: 1, x: 0, rotation: 0, duration: 0.5, ease: "back.out(1.4)", immediateRender: true }, 0.0);
tl.fromTo("#gvB", { opacity: 1, x: 60, rotation: 3 }, { opacity: 1, x: 0, rotation: 0, duration: 0.5, ease: "back.out(1.4)", immediateRender: true }, 0.0);
pop("#gtA", 0.75, 0.4); pop("#gtB", 0.95, 0.4);
cam("#gvA", 330, 640, 1.25, 400, 1.0, 2.6); cam("#gvB", 231, 540, 1.25, 400, 1.2, 2.6);
draw("#gvA .hiD", G1[0] + (G1[1] - G1[0]) * 0.35, 0.8); draw("#gvB .hiD", G1[0] + (G1[1] - G1[0]) * 0.7, 0.6);
stamp("#gpA", G2[0] + 0.3); shake("#sG", G2[0] + 0.5, 8); neon("#64E087", G2[0] + 0.3);
stamp("#gpB", G2[0] + 0.9); shake("#sG", G2[0] + 1.1, 8); flash(G2[0] + 0.9, 0.25);
inn("#g_n", G2[0] + 1.4, { y: 10 });
pose("senala", 0.5); pose("explica", G2[0] + 0.2);

// 2 · TRADE #026 · SELL · gráfico real y comprobante
const A1 = ph(TK ? "a1" : "s3"); chapter(1, A1[0] - 0.2); swap("#s26", A1[0], "zoom"); pose("senala", A1[0] + 0.2);
stamp("#a_d", A1[0] + 0.05); neon("#FF6474", A1[0]);
camSet("#cv26", 260, 520, 1.62, 550, A1[0] - 0.3); cam("#cv26", 300, 600, 1.75, 550, A1[0] + 0.4, 2.2);
blinkHi("#cv26 .hiE", A1[0] + 0.6); pop("#cv26 .lbE", A1[0] + 0.7);
const aSc = A1[0] + (A1[1] - A1[0]) * 0.72, aMe = A1[0] + (A1[1] - A1[0]) * 0.4;
inn("#a_m", aMe, { x: -60, y: 0 }); punch("#a_m", aMe + 0.4, 1.08);
inn("#a_s", aSc, { x: -60, y: 0 }); punch("#a_s", aSc + 0.4, 1.1);
const aD = TK ? A1[1] + 0.05 : A1[1] - 0.6;
out(["#a_s", "#a_m"], aD - 0.1);
cam("#cv26", 300, 640, 1.75, 550, aD, 1.6); draw("#cv26 .hiD", aD + 0.1, 1.0); pop("#cv26 .lbI", aD + 0.4); inn("#a_x", aD + 0.2, { x: -40, y: 0 });
blinkHi("#cv26 .hiT", aD + 1.0); pop("#cv26 .lbT", aD + 1.1);
const R26 = ph(TK ? "a3" : "s4"); swap("#r26", R26[0], "flip"); pose("satisfecho", R26[0] + 0.1);
punch(["#rc26 .cvM", "#rc26 .cvL"], R26[0] + 0.3, 1.08);
tl.fromTo("#rc26 .rhE", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R26[0] + 0.5);
tl.fromTo("#rc26 .rhD", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R26[0] + 1.1);
tl.fromTo("#r26tp", { opacity: 0, scale: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.28, ease: "power4.in", immediateRender: false }, R26[0] + 0.7);
count("#n26", R26[0] + 0.75, 1.1, 0, 100.70, 2); shake("#r26", R26[0] + 1.0, 10); flash(R26[0] + 0.95, 0.3); neon("#64E087", R26[0] + 0.9);
inn("#r26n", R26[0] + 1.6, { y: 8 });

// 3 · TRADE #027 · BUY · de 9 a 10 AM, gráfico real y comprobante
const B1 = ph(TK ? "b1" : "s5"); chapter(2, B1[0] - 0.2); swap("#s27", B1[0], "slide"); pose("explica", B1[0] + 0.1);
stamp("#b_d", B1[0] + 0.05); neon("#3FD0C9", B1[0]);
pop("#clkW", B1[0] + 0.2, 0.5); inn("#clkL", B1[0] + 0.45, { y: 14 }); inn("#b_c", B1[0] + 1.0, { y: 10 });
tl.set("#hrH", { rotation: -90, svgOrigin: "150 150" }, 0); tl.set("#mnH", { rotation: 0, svgOrigin: "150 150" }, 0);
tl.to("#mnH", { rotation: 360, svgOrigin: "150 150", duration: 1.2, ease: "power2.inOut" }, B1[0] + 0.7);
tl.to("#hrH", { rotation: -60, svgOrigin: "150 150", duration: 1.2, ease: "power2.inOut" }, B1[0] + 0.7);
tl.to("#h9", { opacity: 0.3, duration: 0.3 }, B1[0] + 1.9); punch("#clkW", B1[0] + 1.9, 1.1);
const B2 = TK ? ph("b2") : [S("s6"), S("s6") + (F("s6") - S("s6")) * 0.45];
tl.set("#cv27", { opacity: 0 }, 0); tl.set(["#b_s", "#b_r"], { opacity: 0 }, 0);
out(["#clkW", "#clkL", "#b_c"], B2[0] - 0.3, 0.25);
camSet("#cv27", 231, 640, 1.95, 550, B2[0] - 0.3);
tl.fromTo("#cv27", { opacity: 0, scale: 0.85, filter: "blur(8px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.45, ease: EZ, immediateRender: false }, B2[0] - 0.25);
cam("#cv27", 231, 560, 1.95, 550, B2[0] + 0.2, 2.0); blinkHi("#cv27 .hiE", B2[0] + 0.3); pop("#cv27 .lbE", B2[0] + 0.4);
inn("#b_s", B2[0] + 0.3, { x: -60, y: 0 }); punch("#b_s", B2[0] + 0.7, 1.1);
inn("#b_r", B2[0] + (B2[1] - B2[0]) * 0.5, { x: -60, y: 0 }); punch("#b_r", B2[0] + (B2[1] - B2[0]) * 0.5 + 0.4, 1.08);
const B3 = TK ? ph("b3") : [B2[1], F("s6")];
out(["#b_s", "#b_r"], B3[0] - 0.1);
draw("#cv27 .hiD", B3[0] + 0.1, 0.7); pop("#cv27 .lbI", B3[0] + 0.3); blinkHi("#cv27 .hiT", B3[0] + 0.8); pop("#cv27 .lbT", B3[0] + 0.9);
const R27 = TK ? S("b3") + (F("b3") - S("b3")) * 0.42 : B3[0] + (B3[1] - B3[0]) * 0.35;
swap("#r27", R27, "flip"); pose("satisfecho", R27 + 0.1);
punch(["#rc27 .cvM", "#rc27 .cvL"], R27 + 0.3, 1.08);
tl.fromTo("#rc27 .rhE", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R27 + 0.4);
tl.fromTo("#rc27 .rhD", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R27 + 1.0);
tl.fromTo("#r27tp", { opacity: 0, scale: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.28, ease: "power4.in", immediateRender: false }, R27 + 0.6);
count("#n27", R27 + 0.65, 1.0, 0, 100, 0); shake("#r27", R27 + 0.9, 10); flash(R27 + 0.85, 0.3); neon("#64E087", R27 + 0.8);
inn("#r27n", R27 + 1.5, { y: 8 });

// 4 · APRENDIZAJES
if (TK) {
  const C1 = ph("c1a"); chapter(3, C1[0] - 0.2); swap("#sC1", C1[0], "zoom"); pose("pensativo", C1[0] + 0.1);
  inn("#c1a", C1[0] + 0.3, { x: -80, y: 0 }); inn("#c1b", C1[0] + 0.7, { x: 80, y: 0 }); pop("#c1n", C1[0] + 1.2, 0.3); shake("#c1n", C1[0] + 1.5, 6);
  punch("#c1a", S("c1b") + 0.6, 1.04); punch("#c1b", S("c1b") + 1.6, 1.04); stamp("#c1s", S("c1b") + 2.6); shake("#sC1", S("c1b") + 2.85, 7);
  const C2 = ph("c2a"); chapter(4, C2[0] - 0.2); swap("#sC2", C2[0], "slide"); pose("explica", C2[0] + 0.1);
  inn("#c2l1", C2[0] + 0.2, { x: -40, y: 0 }); tl.fromTo("#c2b1", { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "power1.inOut", immediateRender: false }, C2[0] + 0.3);
  inn("#c2v1", C2[0] + 1.6, { y: 8 }); punch("#c2v1", C2[0] + 1.9, 1.08);
  inn("#c2l2", C2[0] + 2.0, { x: -40, y: 0 }); tl.fromTo("#c2b2", { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.out", immediateRender: false }, C2[0] + 2.2);
  inn("#c2v2", C2[0] + 2.7, { y: 8 }); punch("#c2v2", C2[0] + 3.0, 1.1);
  stamp("#c2tp", S("c2b") + 0.8); shake("#sC2", S("c2b") + 1.05, 7); neon("#64E087", S("c2b") + 0.8);
  const C3 = ph("c3a"); chapter(5, C3[0] - 0.2); swap("#sC3", C3[0], "scan"); pose("pensativo", C3[0] + 0.1);
  inn("#c3m", C3[0] + 0.2); punch("#c3m", C3[0] + 1.2, 1.04);
  inn("#c3t", C3[0] + 1.6); tl.fromTo("#c3t .ln2", { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: IO, immediateRender: false }, C3[0] + 1.8);
  $$("#c3t .nd").forEach((nd, k) => pop(nd, C3[0] + 1.9 + k * 0.15, 0.3));
  stamp("#c3s", S("c3b") + 0.4); shake("#sC3", S("c3b") + 0.65, 8);
} else {
  const C = ph("s7"); chapter(3, C[0] - 0.2); swap("#sC", C[0], "zoom"); pose("pensativo", C[0] + 0.1);
  const L = ph("s8"), d = (L[1] - L[0]) / 3;
  [0, 1, 2].forEach(k => { inn("#cl" + k, C[0] + 0.15 + k * 0.12, { x: -80, y: 0 }); tl.to("#cl" + k, { opacity: 0.3, duration: 0.3 }, C[0] + 0.9);
    tl.to("#cl" + k, { opacity: 1, duration: 0.25 }, L[0] + k * d); punch("#cl" + k, L[0] + k * d + 0.05, 1.06); });
}

// 5 · CIERRE: 2 TRADES · 2 TP · +200,70 PUNTOS
const X0 = S(TK ? "x1" : "s9"); chapter(TK ? 6 : 4, X0 - 0.2); out(CUR, X0 - 0.3); tl.set("#sEnd", { opacity: 1 }, X0 - 0.15);
stamp("#eK", X0 - 0.1); tl.fromTo("#eN", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, X0 + 0.3);
count("#nT", X0 + 0.35, 1.4, 0, 200.70, 2); shake("#sEnd", X0 + 1.7, 10); flash(X0 + 1.7, 0.35); neon("#64E087", X0 + 1.6);
inn("#eU", X0 + 0.6, { y: 10 }); pop("#e22", X0 + 1.1, 0.4);
const XS = TK ? S("x2") : X0 + (F("s9") - X0) * 0.5;
tl.fromTo("#sEnd .H span", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, stagger: TK ? Math.max(0.4, S("x3") - S("x2")) : 0.6, ease: EZ, immediateRender: false }, XS - 0.1);
inn("#eS", XS + 0.8, { y: 8 }); inn("#disc", X0 + 0.4, { y: 0 }); pose("explica", X0); pose("satisfecho", X0 + 1.7);
const XF = DUR - 1.0;
pose0("gira_1", XF - 0.3, 0.06); pose0("gira_2", XF - 0.15, 0.06); pose0("gira_3", XF, 0.06);
tl.to(["#tubeL", "#tubeR", ".cl2"], { opacity: 0.12, duration: 0.6 }, DUR - 0.7);
lifeLayers(); eyeGlow();
tl.to({}, { duration: 0.01 }, DUR - 0.01);
window.__timelines = window.__timelines || {}; window.__timelines["main"] = tl;
