// TITÁN · «La regla del cerrajero» · Short (sh) y TikTok (tk) · kit híbrido · línea A · adaptado del TEMA de un video de referencia (guion propio)
// Visa, año fiscal 2025: ingresos netos USD 40.000 millones; 257.500 millones de transacciones procesadas (informe anual 2025) → ≈ USD 0,155 por transacción (cálculo TITÁN).
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];

// ---------- piezas ----------
function door(c, x, y, s, open, seed = 8001) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, R4(-150, -330, 300, 560), '#3B4466', { sharp: true, w: 6, lc: C.ink, seed });
  c.save(); c.translate(-140, 0); c.scale(1 - .7 * open, 1); shp(c, R4(0, -320, 280, 540), '#B07A3E', { sharp: true, w: 5, lc: C.ink, seed: seed + 1 }); c.fillStyle = C.gold; c.beginPath(); c.arc(240, -40, 14, 0, TAU); c.fill(); c.restore(); c.restore(); }
function key2(c, x, y, s, rot, seed = 8010) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); shp(c, blob(0, 0, 30, 30, seed, { n: 18, amp: .02 }), C.gold, { w: 4, lc: C.ink, seed }); ln(c, [[30, 0], [110, 0], [110, 18], [90, 18]], { w: 8, col: C.goldD, seed: seed + 1, straight: true }); c.restore(); }
function moon(c, x, y, r) { c.save(); c.fillStyle = C.goldL; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); c.fillStyle = C.navy; c.beginPath(); c.arc(x + r * .4, y - r * .2, r * .9, 0, TAU); c.fill(); c.restore(); }
function cardV(c, x, y, s, rot, seed = 8020) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); shp(c, R4(-110, -70, 220, 140), C.vio, { w: 5, lc: C.ink, seed }); shp(c, R4(-85, -28, 46, 34), C.gold, { sharp: true, w: 3, lc: C.ink, seed: seed + 1 }); c.restore(); }
function src(c, s, y = 1520) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }

// ================= escenas =================
// 1 · Gancho (noche): la puerta cerrada a las 2 a. m.; llega el cerrajero; en 5 minutos se abre; «PAGAS SALIR DEL PROBLEMA»
if (has('gancho')) { const s = 'gancho', t_l = As(s, 'la llave adentro'), t_c = As(s, 'al cerrajero'), t_5 = As(s, 'cinco minutos.'), t_p = As(s, 'salir del problema.');
  hit(.05, 8, 'stamp'); hit(t_l + .1, 8, 'ping'); hit(t_c + .1, 10, 'stamp'); hit(t_5 + .2, 10, 'ping'); hit(t_p + .1, 16, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, key(T, [[0, 960], [t_p, 960], [t_p + .6, 920]]), key(T, [[0, 1.0], [t_p, 1.0], [t_p + .6, 1.06]]) + .01 * Math.sin(L * 1.3));
    moon(c, 900, 220, 60); tx(c, '2:00 A. M.', 300, 220, { size: 80, col: C.gold, sh: null, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, '¿CUÁNTO PAGAS?', 540, 360, { size: 66, col: C.chalk, sh: C.goldD, max: 1000 });
    const op = pr(T, t_5 - .2, .8, easeIO); door(c, 540, 900, 1.0, op);
    person(c, 220, 1330, .75, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_5 ? 'grin' : 'o', brow: T > t_5 ? 0 : 1, sweat: T < t_5 ? T : 0 });
    if (T > t_c - .2) { const u = pr(T, t_c - .2, .8, easeIO); person(c, lerp(1200, 820, u), 1330, .75, { seed: 14, shirt: C.navy, flip: true, ...idle(T, 1), look: -1, mouth: 'smile', armR: [1.4, .9], prop: (cc, hL, hR) => key2(cc, hR[0], hR[1], .7, Math.sin(T * 6) * .3) }); }
    if (T > t_5 - .3) pill(c, '5 MINUTOS', 540, 520, { size: 50, f: 'ui', sc: pb(T, t_5 - .3) });
    stamp(c, 'PAGAS SALIR DEL PROBLEMA', 540, 1460, T, t_p, { size: 46, col: C.gold, rot: -.03, bg: C.navy });
  }, true); }

// 2 · TikTok · La regla: la gente paga por lo que le resuelves (balanza: esfuerzo vs. resultado)
if (has('regla')) { const s = 'regla', t_d = As(s, 'lo difícil'), t_r = As(s, 'lo que le resuelve.'), t_c = As(s, 'Comodidad,');
  hit(t_d + .1, 8, 'ping'); hit(t_r + .1, 14, 'stamp'); hit(t_c + .1, 8, 'ping');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    tx(c, 'LA REGLA', 540, 220, { size: 104, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    const tilt = .25 * pr(T, t_r, .8, easeOutBack); c.save(); c.translate(540, 700); ln(c, [[0, 0], [0, 400]], { w: 10, seed: 8030, straight: true }); c.rotate(-tilt); ln(c, [[-330, 0], [330, 0]], { w: 10, seed: 8031, straight: true });
    shp(c, [[-420, 40], [-240, 40], [-270, 110], [-390, 110]], C.paper, { w: 5, lc: C.ink, seed: 8032 }); tx(c, 'ESFUERZO', -330, 150, { size: 32, f: 'ui', al: pr(T, t_d, .3) });
    shp(c, [[240, 40], [420, 40], [390, 110], [270, 110]], C.goldL, { w: 5, lc: C.ink, seed: 8033 }); tx(c, 'LO QUE RESUELVE', 330, 150, { size: 32, f: 'ui', col: C.goldD, al: pr(T, t_r - .3, .3) }); c.restore();
    ['COMODIDAD', 'TIEMPO', 'TRANQUILIDAD'].forEach((w, k) => tag(c, w, 220 + k * 320, 1250, { size: 34, bg: C.goldL, sc: pb(T, t_c + k * .4), rot: (k - 1) * .04 }));
    person(c, 160, 1520, .55, { seed: 12, shirt: C.vio, ...idle(T), look: 1, mouth: 'smile', armR: [2.0, .5] });
  }); }

// 3 · Visa: cada pago con tarjeta deja una fracción; contador de transacciones; 257.000 millones → USD 40.000 millones → ~USD 0,15 por pago
if (has('dato')) { const s = 'dato', t_v = As(s, 'Visa'), t_t = As(s, 'doscientos cincuenta y siete mil millones'), t_f = As(s, 'cuarenta mil millones de dólares.'), t_q = As(s, 'quince centavos');
  hit(t_v + .1, 10, 'stamp'); hit(t_t + .3, 12, 'impact'); hit(t_f + .3, 14, 'impact'); hit(t_q + .2, 16, 'stamp');
  scene(s, TK ? 'iris' : 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 950], [t_q, 950], [t_q + .6, 900]]), key(T, [[0, 1.0], [t_q, 1.0], [t_q + .6, 1.05]]) + .012 * Math.sin(L));
    tx(c, 'VISA NO PRESTA PLATA', 540, 220, { size: 70, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 }); tag(c, 'COBRA UNA FRACCIÓN DE CADA PAGO', 540, 320, { size: 30, bg: C.goldL, sc: pb(T, t_v) });
    // tarjetas que pasan por un datáfono, cada una suelta una moneda pequeña
    shp(c, R4(430, 450, 220, 320), '#2A3150', { w: 5, lc: C.ink, seed: 8040 }); shp(c, R4(450, 470, 180, 110), '#BFE3F5', { sharp: true, w: 3, lc: C.ink, seed: 8041 }); tx(c, 'PAGO ✓', 540, 528, { size: 30, f: 'ui', col: C.green });
    for (let k = 0; k < 5; k++) { const u = ((T - sec(s).t0) * .9 + k / 5) % 1; cardV(c, lerp(-100, 1180, u), 650 + Math.sin(u * 6 + k) * 20, .6, u - .5, 8050 + k * 2);
      if (u > .45) { c.save(); c.globalAlpha = 1 - (u - .45) * 1.8; shp(c, blob(540, 800 + (u - .45) * 300, 14, 14, 8060 + k, { n: 12, amp: .02 }), C.gold, { w: 3, lc: C.ink, seed: 8060 + k }); c.restore(); } }
    const n = 257e9 * pr(T, t_t - .2, 1.2, easeIO); pill(c, (n / 1e9).toFixed(0) + '.000 MILLONES DE PAGOS', 540, 1010, { size: 42, f: 'ui', sc: pb(T, t_t - .2), col: C.paper });
    pill(c, 'INGRESOS: USD 40.000 MILLONES', 540, 1130, { size: 42, f: 'ui', sc: pb(T, t_f) });
    stamp(c, '≈ USD 0,15 POR PAGO', 540, 1270, T, t_q, { size: 54, col: C.goldD, rot: -.03 });
    src(c, 'Visa, informe anual del año fiscal 2025 · cálculo TITÁN (40.000 ÷ 257.500 millones)');
  }); }

// 4 · TikTok · Una acción = un pedazo del negocio: el papelito se transforma en una tajada de la empresa
if (has('accion')) { const s = 'accion', t_p = As(s, 'papelito'), t_n = As(s, 'un pedazo de un negocio.'), t_c = As(s, 'logre cobrar.');
  hit(t_p + .1, 8, 'ping'); hit(t_n + .1, 14, 'stamp'); hit(t_c + .1, 10, 'impact');
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    tx(c, '¿QUÉ COMPRAS?', 540, 220, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    const m = pr(T, t_n - .3, .8, easeIO);
    c.save(); c.globalAlpha = 1 - m; c.translate(540, 700 + Math.sin(T * 3) * 30); c.rotate(Math.sin(T * 2) * .1); shp(c, R4(-160, -100, 320, 200), C.paper, { sharp: true, w: 5, lc: C.ink, seed: 8070 }); tx(c, '↑↓', 0, 0, { size: 90, col: C.red }); c.restore();
    if (m > 0) { c.save(); c.globalAlpha = m; shp(c, R4(240, 520, 600, 380), '#3B4466', { w: 6, lc: C.ink, seed: 8071 }); for (let k = 0; k < 6; k++) shp(c, R4(280 + (k % 3) * 180, 560 + Math.floor(k / 3) * 150, 120, 100), '#BFE3F5', { sharp: true, w: 3, lc: C.ink, seed: 8072 + k });
      tx(c, 'EMPRESA', 540, 940, { size: 40, f: 'ui' }); shp(c, [[540, 520], [840, 520], [840, 900]], C.gold, { w: 5, lc: C.ink, seed: 8080, al: .8 }); tx(c, 'TU PEDAZO', 760, 640, { size: 34, f: 'ui', col: C.ink }); c.restore(); }
    tag(c, 'A LARGO PLAZO: VALE LO QUE EL NEGOCIO LOGRE COBRAR', 540, 1120, { size: 28, bg: C.goldL, sc: pb(T, t_c - .4) });
    person(c, 160, 1520, .55, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: 'smile', armR: [2.2, .5] });
  }); }

// 5 · TikTok · Ojo: buen negocio ≠ buena compra (precio demasiado alto)
if (has('ojo')) { const s = 'ojo', t_b = As(s, 'un buen negocio'), t_d = As(s, 'pagas demasiado'), t_p = As(s, 'igual puedes perder.');
  hit(t_b + .1, 8, 'ping'); hit(t_d + .1, 10, 'stamp'); hit(t_p + .1, 14, 'stamp');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    tx(c, 'OJO', 540, 220, { size: 120, col: C.red, sh: C.ink, sc: pb(T, sec(s).t0 - .3) });
    pill(c, 'BUEN NEGOCIO', 300, 520, { size: 44, f: 'ui', sc: pb(T, t_b) }); tx(c, '≠', 540, 530, { size: 110, col: C.red, sh: C.ink, sc: pb(T, t_b + .4) }); pill(c, 'BUENA COMPRA', 790, 520, { size: 44, f: 'ui', sc: pb(T, t_b + .6) });
    const g = pr(T, t_d - .2, 1.0, easeOutBack); c.save(); c.translate(540, 860); c.scale(1 + .8 * g, 1 + .8 * g); c.rotate(-.05); shp(c, [[-130, -50], [110, -50], [150, 0], [110, 50], [-130, 50]], g > .6 ? C.red : C.gold, { sharp: true, w: 5, lc: C.ink, seed: 8090 });
    tx(c, 'PRECIO', -5, 4, { size: 40, f: 'ui', col: g > .6 ? C.paper : C.ink }); c.restore();
    stamp(c, 'IGUAL PUEDES PERDER', 540, 1180, T, t_p, { size: 52, col: C.red, rot: -.03 });
    person(c, 920, 1530, .55, { seed: 9, shirt: C.navy, flip: true, ...idle(T), look: -1, mouth: 'o', brow: 1 });
  }); }

// 6 · Cierre (noche)
if (has('cierre')) { const s = 'cierre', t_q = TK ? As(s, '¿qué problema resuelve') : As(s, 'qué problema resuelve.'), t_h = As(s, 'Haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  const t_a = TK ? As(s, 'cuánta gente') : As(s, 'un pedazo de ese negocio.');
  hit(t_a + .1, 8, 'ping'); hit(t_q + .1, 10, 'stamp'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, TK ? 'blot' : 'iris', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, 'ANTES DE INVERTIR, PREGÚNTATE:', 540, 280, { size: 52, col: C.chalk, sh: C.goldD, clipP: pr(T, sec(s).t0 + .1, .6, easeIO), max: 1000 });
    tx(c, '¿QUÉ PROBLEMA RESUELVE?', 540, 400, { size: 64, col: C.lav, sh: null, clipP: pr(T, t_q - .2, .6, easeIO), max: 1000 });
    if (TK) tx(c, '¿CUÁNTA GENTE PAGARÍA POR ESO?', 540, 500, { size: 54, col: C.lav, sh: null, clipP: pr(T, t_a - .1, .6, easeIO), max: 1000 });
    key2(c, 470, 760, 1.6, Math.sin(T * 2) * .2);
    tx(c, 'HAZ TU CUENTA', 540, 1060, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

function cover(c) { const t = As('gancho', 'salir del problema.'); drawScene(c, SC[0], Math.min(t + 1.0, SC[0].t1 - .05)); resetT(c); INKC = C.chalk; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .6 }); }
startFilm('cerrajero', cover);
