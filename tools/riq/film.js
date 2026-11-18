// TITÁN · «Hacer plata no es lo mismo que construir riqueza» · Short (sh) y TikTok (tk) · kit híbrido · línea A · adaptado del TEMA de un video de referencia (guion propio)
// SPY: dividendos por acción, suma anual (Yahoo Finance): 2006 USD 2,45 → 2025 USD 7,28; 2008 2,72 → 2009 2,18. Retención del 30 % a no residentes (Colombia sin tratado).
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const DIV = [[2006, 2.45], [2007, 2.70], [2008, 2.72], [2009, 2.18], [2010, 2.27], [2011, 2.58], [2012, 3.10], [2013, 3.35], [2014, 3.84], [2015, 4.21], [2016, 4.54], [2017, 4.80], [2018, 5.10], [2019, 5.62], [2020, 5.69], [2021, 5.71], [2022, 6.32], [2023, 6.63], [2024, 7.07], [2025, 7.28]];

// ---------- piezas ----------
function coin(c, x, y, r, seed) { shp(c, blob(x, y, r, r, seed, { n: 22, amp: .02 }), C.gold, { w: 4, lc: C.ink, seed }); tx(c, '$', x, y + 2, { size: r * 1.1, col: C.goldD, sh: null }); }
function tree(c, x, y, s, T, grow, seed = 7001) { c.save(); c.translate(x, y); c.scale(s, s);   // árbol que da monedas: «algo que te sigue pagando»
  ln(c, [[0, 0], [0, -220 * grow]], { w: 22, col: '#8C5E31', seed, straight: true });
  if (grow > .3) shp(c, blob(0, -300 * grow, 190 * grow, 150 * grow, seed + 1, { n: 30, amp: .05 }), '#7FBF8F', { w: 6, lc: C.ink, seed: seed + 1, hatch: shade('#7FBF8F', .6), hal: .2 });
  for (let k = 0; k < 6 && grow > .8; k++) coin(c, -120 + k * 48, -300 + Math.sin(k * 2.1) * 60 + Math.sin(T * 2 + k) * 5, 20, seed + 10 + k); c.restore(); }
function clock(c, x, y, r, T) { shp(c, blob(x, y, r, r, 7020, { n: 30, amp: .01 }), C.paper, { w: 5, lc: C.ink, seed: 7020 }); const a = T * 2;
  ln(c, [[x, y], [x + Math.cos(a) * r * .7, y + Math.sin(a) * r * .7]], { w: 6, seed: 7021, straight: true }); ln(c, [[x, y], [x + Math.cos(a / 12) * r * .45, y + Math.sin(a / 12) * r * .45]], { w: 8, seed: 7022, straight: true }); }
function src(c, s, y = 1520) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }
function divBars(c, T, t0, o = {}) { const Z = o.Z ?? 1180, K = (o.H ?? 600) / 8, x0 = 110, bw = 38, gap = 5;
  ln(c, [[x0 - 10, Z], [x0 + DIV.length * (bw + gap) + 5, Z]], { w: 5, straight: true, seed: 7030 });
  DIV.forEach(([y, v], k) => { const g = pr(T, t0 + k * .06, .5, easeOutBack); if (g <= 0) return; const col = y === 2009 ? C.red : (k === 0 || k === DIV.length - 1 ? C.gold : C.lav);
    shp(c, R4(x0 + k * (bw + gap), Z - v * K * g, bw, v * K * g), col, { sharp: true, w: 3, lc: C.ink, seed: 7031 + k });
    if ((k === 0 && !o.mark09) || k === DIV.length - 1 || (o.mark09 && y === 2009)) { tx(c, String(y), x0 + k * (bw + gap) + bw / 2, Z + 30, { size: 24, f: 'ui', col: y === 2009 ? C.red : C.ink });
      pill(c, 'USD ' + v.toFixed(2).replace('.', ','), x0 + k * (bw + gap) + bw / 2 + (k === 0 ? 50 : k === DIV.length - 1 ? -50 : 0), Z - v * K - 50, { size: 30, f: 'ui', sc: pb(T, t0 + k * .06 + .3), col: y === 2009 ? '#FFB4A6' : C.gold }); } }); }

// ================= escenas =================
// 1 · Gancho: dos caminos: la persona con monedas que se gastan vs. la que planta un árbol
if (has('gancho')) { const s = 'gancho', t_r = As(s, 'construir riqueza'), t_c = As(s, 'casi todo el mundo');
  hit(.05, 8, 'stamp'); hit(t_r + .2, 10, 'ping'); hit(t_c + .2, 14, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_c, 960], [t_c + .6, 920]]), key(T, [[0, 1.0], [t_c, 1.0], [t_c + .6, 1.05]]) + .01 * Math.sin(L * 1.3));
    tx(c, 'HACER PLATA', 540, 200, { size: 92, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, '≠ CONSTRUIR RIQUEZA', 540, 300, { size: 70, col: C.goldD, sh: C.ink, sc: pb(T, t_r - .2), max: 1000 });
    ln(c, [[540, 420], [540, 1300]], { w: 5, straight: true, seed: 7040, al: .5 });
    // izquierda: monedas que entran y salen
    for (let k = 0; k < 5; k++) { const u = (T * .7 + k / 5) % 1; c.save(); c.globalAlpha = 1 - u; coin(c, 280 + Math.sin(k) * 40, lerp(600, 1050, u), 30, 7050 + k); c.restore(); }
    person(c, 280, 1330, .7, { seed: 5, shirt: C.lav, ...idle(T), look: 1, mouth: 'flat', armR: [1.5, .9] }); tx(c, 'COBRA Y GASTA', 280, 520, { size: 34, f: 'ui', col: C.red });
    tree(c, 800, 1200, .9, T, pr(T, .3, 2.5, easeIO)); person(c, 800, 1330, .7, { seed: 12, shirt: C.gold, flip: true, ...idle(T, 1), look: -1, mouth: 'smile' }); tx(c, 'CONSTRUYE', 800, 520, { size: 34, f: 'ui', col: C.goldD });
    stamp(c, 'CASI TODOS: SOLO LA PRIMERA', 540, 1440, T, t_c + .1, { size: 44, col: C.red, rot: -.03 });
  }); }

// 2 · TikTok · La diferencia: un turno (paga una vez) vs. algo que sigue pagando
if (has('diferencia')) { const s = 'diferencia', t_h = As(s, 'Hacer plata es'), t_u = As(s, 'Te pagan una vez.'), t_c = As(s, 'Construir riqueza es'), t_t = As(s, 'cuando ya terminaste.');
  hit(t_h + .1, 6, 'ping'); hit(t_u + .1, 12, 'stamp'); hit(t_c + .1, 8, 'ping'); hit(t_t + .1, 14, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    card(c, 540, 470, 860, 300, { sc: pb(T, t_h - .2) }); if (T > t_h - .2) { tx(c, 'HACER PLATA', 540, 380, { size: 52, col: C.ink }); ['UN TURNO', 'UN TRABAJO', 'UNA VENTA'].forEach((w, k) => tag(c, w, 240 + k * 300, 470, { size: 30, bg: C.paper, sc: pb(T, t_h + .4 + k * .3) })); }
    stamp(c, 'PAGA UNA VEZ', 540, 580, T, t_u, { size: 50, col: C.red, rot: -.03 });
    card(c, 540, 950, 860, 340, { sc: pb(T, t_c - .2), bg: C.goldL }); if (T > t_c - .2) { tx(c, 'CONSTRUIR RIQUEZA', 540, 840, { size: 52, col: C.ink }); tree(c, 300, 1100, .5, T, pr(T, t_c, 1.5, easeIO), 7060); }
    stamp(c, 'SIGUE PAGANDO', 680, 1000, T, t_t, { size: 54, col: C.goldD, rot: .03 });
    clock(c, 900, 1260, 70, T);
  }); }

// 3 · TikTok · La trampa: lo que construye riqueza no paga rápido (barra «hoy» vs. curva lenta)
if (has('trampa')) { const s = 'trampa', t_n = As(s, 'casi nunca paga rápido.'), t_y = As(s, 'necesitas la plata ya,'), t_e = As(s, 'puede esperar.');
  hit(t_n + .1, 10, 'stamp'); hit(t_y + .1, 8, 'ping'); hit(t_e + .1, 12, 'stamp');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    tx(c, 'LA TRAMPA', 540, 220, { size: 100, col: C.red, sh: C.ink, sc: pb(T, sec(s).t0 - .3) });
    const p = pr(T, sec(s).t0 + .2, 2.5, easeIO), Z = 1150; ln(c, [[120, Z], [960, Z]], { w: 5, straight: true, seed: 7070 });
    const pts = []; for (let i = 0; i <= 40 * p; i++) { const u = i / 40; pts.push([140 + u * 800, Z - 520 * Math.pow(u, 3)]); } if (pts.length > 1) ln(c, pts, { w: 9, col: C.goldD, seed: 7071 });
    tx(c, 'AÑOS →', 900, Z + 40, { size: 28, f: 'ui' }); tag(c, 'AL PRINCIPIO, CASI NADA', 360, 1020, { size: 30, bg: C.paper, sc: pb(T, t_n - .3) });
    for (let k = 0; k < 4; k++) { const u = (T * .8 + k / 4) % 1; c.save(); c.globalAlpha = (1 - u) * pr(T, t_y, .3); coin(c, 300 + k * 30, 500 + u * 300, 26, 7080 + k); c.restore(); }
    stamp(c, '«PUEDE ESPERAR»', 640, 560, T, t_e, { size: 60, col: C.red, rot: .04 });
    person(c, 180, 1500, .6, { seed: 5, shirt: C.lav, ...idle(T), look: 1, mouth: 'flat', sweat: T > t_y ? T : 0 });
  }); }

// 4 · El dato: dividendos anuales por acción de SPY 2006 → 2025 (barras); 2009 en rojo
if (has('dato')) { const s = 'dato', t_6 = As(s, 'dos mil seis'), t_25 = As(s, 'dos mil veinticinco,'), t_x = As(s, 'Casi el triple,');
  hit(t_6 + .2, 8, 'ping'); hit(t_25 + .3, 12, 'impact'); hit(t_x + .1, 16, 'stamp');
  scene(s, TK ? 'drop' : 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, key(T, [[0, 1.0], [t_x, 1.0], [t_x + .6, 1.04]]) + .012 * Math.sin(L));
    tx(c, 'DIVIDENDOS DE 1 ACCIÓN', 540, 220, { size: 72, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    tag(c, 'FONDO QUE COPIA AL S&P 500 (SPY) · USD POR AÑO', 540, 320, { size: 26, bg: C.goldL, sc: pb(T, sec(s).t0) });
    divBars(c, T, sec(s).t0 + .3, { Z: 1130, H: 560 });
    stamp(c, '×3 SIN TRABAJAR MÁS', 540, 1300, T, t_x, { size: 52, col: C.goldD, rot: -.03 });
    src(c, 'Yahoo Finance · dividendos de SPY por año · antes de la retención');
  }); }

// 5 · Ojo: retención del 30 % y 2009 (los dividendos bajaron) · en SH es la sección «ojo» también
if (has('ojo')) { const s = 'ojo', t_30 = As(s, 'treinta por ciento'), t_b = TK ? As(s, 'dos mil nueve,') : As(s, 'pueden bajar.');
  hit(t_30 + .2, 12, 'stamp'); hit(t_b + .2, 12, 'impact');
  scene(s, TK ? 'wipe' : 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    tx(c, 'OJO', 540, 220, { size: 120, col: C.red, sh: C.ink, sc: pb(T, sec(s).t0 - .3) });
    // retención: 10 monedas, 3 se van con la bandera de EE. UU. (rectángulo con franjas)
    for (let k = 0; k < 10; k++) { const out = k < 3 ? pr(T, t_30, .8, easeIO) : 0; c.save(); c.globalAlpha = 1 - out * .85; coin(c, 220 + (k % 5) * 160 + out * 420, 470 + Math.floor(k / 5) * 110 + out * 40, 40, 7100 + k); c.restore(); }
    pill(c, 'RETENCIÓN EN EE. UU.: 30 %', 540, 760, { size: 46, f: 'ui', sc: pb(T, t_30), col: '#FFB4A6' });
    divBars(c, T, sec(s).t0 + .2, { Z: 1260, H: 360, mark09: true });
    stamp(c, '2009: BAJARON', 760, 960, T, t_b + .1, { size: 46, col: C.red, rot: .04 });
  }); }

// 6 · Cierre (noche)
if (has('cierre')) { const s = 'cierre', t_a = TK ? As(s, 'cuentas que pagar') : As(s, 'se gasta una vez.'), t_b = TK ? As(s, 'te puede pagar por años.') : As(s, 'puede seguir pagando.'), t_h = As(s, 'Haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_a + .1, 8, 'ping'); hit(t_b + .1, 10, 'stamp'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, TK ? 'LA PLATA DE ESTE MES' : 'LA PLATA DE HOY SE GASTA UNA VEZ', 540, 280, { size: TK ? 64 : 52, col: C.chalk, sh: C.goldD, clipP: pr(T, Math.min(t_a - .3, sec(s).t0 + .2), .6, easeIO), max: 1000 });
    if (TK) tx(c, 'NO PUEDE IMPEDIRTE CONSTRUIR', 540, 380, { size: 56, col: C.chalk, sh: C.goldD, clipP: pr(T, t_a + .8, .6, easeIO), max: 1000 });
    tx(c, TK ? 'LO QUE TE PUEDE PAGAR POR AÑOS' : 'LO QUE CONSTRUYES SIGUE PAGANDO', 540, 520, { size: 52, col: C.lav, sh: null, clipP: pr(T, t_b - .4, .6, easeIO), max: 1000 });
    tree(c, 540, 960, .9, T, pr(T, sec(s).t0 + .3, 2, easeIO), 7120);
    tx(c, 'HAZ TU CUENTA', 540, 1120, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

function cover(c) { const t = As('gancho', 'casi todo el mundo'); drawScene(c, SC[0], Math.min(t + 1.6, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('riqueza', cover);
