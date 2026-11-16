// ===== REPORTE SEMANAL #13 · trades #028 (SELL) y #029 (BUY) · golpes, sellos, contadores, sacudidas y transiciones variadas =====
const ph = id => [S(id), F(id)];
const P = (tk, sh) => TK ? tk : sh;
function flash(t, o) { tl.fromTo("#flash", { opacity: o || 0.55 }, { opacity: 0, duration: 0.35, ease: "power2.out", immediateRender: false }, t); }
function punch(sel, t, k) { tl.fromTo(sel, { scale: 1 }, { scale: k || 1.06, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out", transformOrigin: "50% 50%", immediateRender: false }, t); }
function blinkHi(sel, t) { tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 3, immediateRender: false }, t); tl.set(sel, { opacity: 1 }, t + 0.65); }
function neon(c, t) { tl.to(["#tubeL", "#tubeR"], { fill: c, duration: 0.15 }, t); tl.to("#tubeL", { fill: "#A779F2", duration: 0.6 }, t + 1.2); tl.to("#tubeR", { fill: "#3FD0C9", duration: 0.6 }, t + 1.2); }
const camW = (px, py, s, h, w) => ({ x: w / 2 - px * s, y: h / 2 - py * s, scale: s });   // cámara para visores de cualquier ancho
function camA(sel, px, py, s, h, w, t, d) { if (d) tl.to(sel + " .cam", Object.assign({ duration: d, ease: IO }, camW(px, py, s, h, w)), t); else tl.set(sel + " .cam", camW(px, py, s, h, w), t); }
function pts(sel, t, val) { punch(sel, t, 1.25); }

// 1 · GANCHO: «DOS TRADES. DIRECCIONES OPUESTAS. MISMO OBJETIVO.» con los dos gráficos reales
const G1 = ph(P("g1", "s1")), G2 = TK ? ph("g2") : [G1[0] + (G1[1] - G1[0]) * 0.5, G1[1]];
tl.set("#sG", { opacity: 1 }, 0); CUR = "#sG";   // titular visible desde el primer cuadro
tl.set("#g_1", { opacity: 1 }, 0); tl.fromTo("#g_1", { scale: 1.12, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.3, ease: "power4.out", immediateRender: true }, 0.0);
shake("#g_1", 0.32, 9);
camA("#gvA", 390, 640, 0.62, 440, 440, 0); camA("#gvB", 330, 560, 0.62, 440, 440, 0);
tl.fromTo("#gvA", { opacity: 1, x: -60, rotation: -3 }, { opacity: 1, x: 0, rotation: 0, duration: 0.5, ease: "back.out(1.4)", immediateRender: true }, 0.0);
tl.fromTo("#gvB", { opacity: 1, x: 60, rotation: 3 }, { opacity: 1, x: 0, rotation: 0, duration: 0.5, ease: "back.out(1.4)", immediateRender: true }, 0.0);
pop("#gtA", 0.6, 0.4); pop("#gtB", 0.8, 0.4);
camA("#gvA", 390, 690, 0.95, 440, 440, 1.0, 2.4); camA("#gvB", 330, 520, 0.95, 440, 440, 1.2, 2.4);
draw("#gvA .hiD", G1[0] + (G1[1] - G1[0]) * 0.35, 0.8); draw("#gvB .hiI", G1[0] + (G1[1] - G1[0]) * 0.7, 0.6);
stamp("#gpA", G2[0] + 0.3); shake("#sG", G2[0] + 0.5, 8); neon("#64E087", G2[0] + 0.3);
stamp("#gpB", G2[0] + 0.9); shake("#sG", G2[0] + 1.1, 8); flash(G2[0] + 0.9, 0.25);
inn("#g_n", G2[0] + 1.4, { y: 10 });
pose("senala", 0.5); pose("explica", G2[0] + 0.2);

// 2 · TRADE #028 · SELL · dom 8, 11 PM · gráfico real y comprobante
const A1 = ph(P("a1", "s2")); chapter(1, A1[0] - 0.2); swap("#s28", A1[0], "zoom"); pose("senala", A1[0] + 0.2);
stamp("#a_d", A1[0] + 0.05); neon("#FF6474", A1[0]);
camA("#cv28", 390, 560, 1.45, 400, 900, A1[0] - 0.3); camA("#cv28", 390, 600, 1.6, 400, 900, A1[0] + 0.4, 2.2);
blinkHi("#cv28 .hiE", A1[0] + 0.5); pop("#cv28 .lbE", A1[0] + 0.6);
inn("#a_s", A1[0] + (A1[1] - A1[0]) * 0.45, { x: -60, y: 0 }); punch("#a_s", A1[1] - 0.4, 1.1);
const A2 = TK ? ph("a2") : [S("s3"), S("s3") + (F("s3") - S("s3")) * 0.35];
inn("#a_r", A2[0] + 0.1, { x: -60, y: 0 }); inn("#a_c", A2[0] + 0.5, { x: 60, y: 0 }); punch("#a_r", A2[0] + 0.8, 1.08);
if (TK) { inn("#a_m", A2[0] + (A2[1] - A2[0]) * 0.5, { y: 14 }); inn("#a_v", A2[0] + (A2[1] - A2[0]) * 0.75, { y: 14 }); punch("#a_v", A2[1] - 0.3, 1.1); }
else { inn("#a_m", A2[0] + 0.7, { y: 14 }); inn("#a_v", A2[0] + 0.9, { y: 14 }); }
camA("#cv28", 360, 700, 1.5, 400, 900, A2[0] + 0.6, 1.8); draw("#cv28 .hiD", A2[0] + 0.8, 1.0); pop("#cv28 .lbD", A2[0] + 1.2);
blinkHi("#cv28 .hiT", A2[1] - 0.6); pop("#cv28 .lbT", A2[1] - 0.5);
const R28 = TK ? S("a3") : A2[1]; swap("#r28", R28, "flip"); pose("satisfecho", R28 + 0.1);
punch(["#rc28 .cvM", "#rc28 .cvL"], R28 + 0.3, 1.08);
tl.fromTo("#rc28 .rhE", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R28 + 0.5);
tl.fromTo("#rc28 .rhD", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R28 + 1.0);
tl.fromTo("#rc28 .rhT", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R28 + 1.5);
tl.fromTo("#r28tp", { opacity: 0, scale: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.28, ease: "power4.in", immediateRender: false }, R28 + 0.7);
pts("#n28", R28 + 0.85); shake("#r28", R28 + 1.0, 10); flash(R28 + 0.95, 0.3); neon("#64E087", R28 + 0.9);
inn("#r28n", R28 + 1.6, { y: 8 });

// 3 · TRADE #029 · BUY · lun 9, 10 AM · gráfico real y comprobante
const B1 = ph(P("b1", "s4")); chapter(2, B1[0] - 0.2); swap("#s29", B1[0], "slide"); pose("explica", B1[0] + 0.1);
stamp("#b_d", B1[0] + 0.05); neon("#3FD0C9", B1[0]);
camA("#cv29", 300, 520, 1.15, 400, 900, B1[0] - 0.3); camA("#cv29", 300, 500, 1.25, 400, 900, B1[0] + 0.4, 2.0);
blinkHi("#cv29 .hiE", B1[0] + 0.4); pop("#cv29 .lbE", B1[0] + 0.5);
inn("#b_s", B1[0] + (B1[1] - B1[0]) * 0.45, { x: -60, y: 0 }); punch("#b_s", B1[0] + (B1[1] - B1[0]) * 0.45 + 0.4, 1.1);
inn("#b_m", B1[0] + (B1[1] - B1[0]) * 0.7, { x: -60, y: 0 }); inn("#b_c", B1[0] + (B1[1] - B1[0]) * 0.8, { x: 60, y: 0 });
inn("#b_v", B1[1] + 0.05, { y: 14 }); punch("#b_v", B1[1] + 0.4, 1.1);
const B3 = TK ? ph("b3") : ph("s5");
camA("#cv29", 200, 470, 1.5, 400, 900, B3[0] - 0.2, 1.4); draw("#cv29 .hiI", B3[0], 0.7); pop("#cv29 .lbI", B3[0] + 0.3); blinkHi("#cv29 .hiT", B3[0] + 0.7); pop("#cv29 .lbT", B3[0] + 0.8);
const R29 = B3[0] + (B3[1] - B3[0]) * (TK ? 0.4 : 0.3);
swap("#r29", R29, "flip"); pose("satisfecho", R29 + 0.1);
punch(["#rc29 .cvM", "#rc29 .cvL"], R29 + 0.3, 1.08);
tl.fromTo("#rc29 .rhE", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R29 + 0.4);
tl.fromTo("#rc29 .rhD", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R29 + 0.9);
tl.fromTo("#rc29 .rhT", { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, R29 + 1.4);
tl.fromTo("#r29tp", { opacity: 0, scale: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.28, ease: "power4.in", immediateRender: false }, R29 + 0.6);
pts("#n29", R29 + 0.75); shake("#r29", R29 + 0.9, 10); flash(R29 + 0.85, 0.3); neon("#64E087", R29 + 0.8);
inn("#r29n", R29 + 1.5, { y: 8 });

// 4 · BALANCE (TikTok después de los trades; Shorts después de los aprendizajes)
function balance(t0) { chapter(3, t0 - 0.2); swap("#sT", t0, "zoom"); pose("explica", t0 + 0.1);
  stamp("#tK", t0 + 0.05); tl.fromTo("#tN", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, t0 + 0.6);
  pts("#nT", t0 + 1.0); shake("#sT", t0 + 1.1, 10); flash(t0 + 1.05, 0.35); neon("#64E087", t0 + 1.0); pose("satisfecho", t0 + 1.1);
  inn("#tU", t0 + 1.3, { y: 10 }); inn("#tS", t0 + 1.8, { y: 10 }); inn("#tA", t0 + 2.3, { y: 10 }); punch("#tA", t0 + 2.8, 1.06); }
if (TK) balance(S("t1"));

// 5 · APRENDIZAJES (una pantalla legible por cada uno)
const L1 = TK ? S("c1a") : S("s6"); chapter(4, L1 - 0.2); swap("#sC1", L1, "slide"); pose("pensativo", L1 + 0.1);
camA("#c1A", 390, 620, 0.75, 300, 430, L1 - 0.3); camA("#c1B", 320, 540, 0.75, 300, 430, L1 - 0.3);
inn("#c1A", L1 + 0.05, { x: -60, y: 0 }); inn("#c1B", L1 + 0.2, { x: 60, y: 0 });
const L1b = TK ? L1 : S("s7");
inn("#c1a", L1b + 0.3, { x: -80, y: 0 }); punch("#c1a", L1b + 0.7, 1.06); inn("#c1b", L1b + (TK ? 1.8 : 1.4), { x: 80, y: 0 }); punch("#c1b", L1b + (TK ? 2.2 : 1.8), 1.06);
if (TK) { inn("#c1x", F("c1a") - 0.2, { y: 12 }); punch("#c1x", F("c1a") + 1.2, 1.03); }
const L2 = S(P("c2a", "s8")); chapter(5, L2 - 0.2); swap("#sC2", L2, "scan"); pose("explica", L2 + 0.1);
pop("#k1", L2 + 0.1, 0.5); inn("#c2l1", L2 + 0.2, { x: -40, y: 0 }); tl.fromTo("#c2b1", { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "power1.inOut", immediateRender: false }, L2 + 0.3);
tl.fromTo("#k1 .hand", { rotation: 0 }, { rotation: 300, svgOrigin: "60 60", duration: 1.6, ease: "power1.inOut", immediateRender: false }, L2 + 0.3);
inn("#c2v1", L2 + 1.7, { y: 8 }); punch("#c2v1", L2 + 2.0, 1.08);
pop("#k2", L2 + 2.0, 0.5); inn("#c2l2", L2 + 2.1, { x: -40, y: 0 }); tl.fromTo("#c2b2", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.out", immediateRender: false }, L2 + 2.3);
tl.fromTo("#k2 .hand", { rotation: 0 }, { rotation: 180, svgOrigin: "60 60", duration: 0.5, ease: "power2.out", immediateRender: false }, L2 + 2.3);
inn("#c2v2", L2 + 2.8, { y: 8 }); punch("#c2v2", L2 + 3.1, 1.1); inn("#c2n", L2 + 3.6, { y: 8 });
if (TK) { inn("#c2x", F("c2a") - 0.1, { y: 12 }); punch("#c2x", F("c2a") + 1.4, 1.03); }
const L3 = S(P("c3a", "s9")); chapter(6, L3 - 0.2); swap("#sC3", L3, "zoom"); pose("pensativo", L3 + 0.1);
inn("#c3b", L3 + 0.2, { y: 20 }); const L3b = TK ? S("c3b") : L3 + (F("s9") - L3) * 0.4;
inn("#c3a", L3b + 0.2, { y: -20 }); punch("#c3a", L3b + 0.7, 1.05); neon("#64E087", L3b + 0.6);
stamp("#c3s", (TK ? F("c3b") : F("s9")) - 1.2); shake("#sC3", (TK ? F("c3b") : F("s9")) - 0.95, 8);
if (!TK) balance(S("s10"));

// 6 · CIERRE: 2/2 ESTA SEMANA · ventaja estadística
const X0 = S(P("x1", "s11")); chapter(7, X0 - 0.2); out(CUR, X0 - 0.3); tl.set("#sEnd", { opacity: 1 }, X0 - 0.15);
stamp("#eK", X0 - 0.1); shake("#sEnd", X0 + 0.15, 8); neon("#64E087", X0);
tl.fromTo("#sEnd .H span", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.7, ease: EZ, immediateRender: false }, X0 + 0.5);
pop("#eL", X0 + 1.4, 0.5); inn("#eM", X0 + 2.6, { y: 8 }); if (TK) inn("#eS", X0 + 1.9, { y: 8 });
inn("#disc", X0 + 0.4, { y: 0 }); pose("explica", X0); pose("satisfecho", X0 + 1.6);
const XF = DUR - 1.0;
pose0("gira_1", XF - 0.3, 0.06); pose0("gira_2", XF - 0.15, 0.06); pose0("gira_3", XF, 0.06);
tl.to(["#tubeL", "#tubeR", ".cl2"], { opacity: 0.12, duration: 0.6 }, DUR - 0.7);
lifeLayers(); eyeGlow();
tl.to({}, { duration: 0.01 }, DUR - 0.01);
window.__timelines = window.__timelines || {}; window.__timelines["main"] = tl;
