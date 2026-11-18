// TITÁN · «Tu plata quieta en la cuenta de ahorros» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js) · línea B (plata del día a día)
// Inflación anual oct. 2026: 6,30 % (DANE). Tasas E.A. de cuentas de ahorro, corte 25 sep. 2026 (Superfinanciera vía La República): 0,07 %–0,54 % en bancos grandes; hasta 11 % en otras entidades.
// EJEMPLO HIPOTÉTICO: $10.000.000 un año al 0,43 % → $10.043.000 · lo mismo cuesta $10.630.000 → faltan $587.000. 4×1000: Estatuto Tributario.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const cop = v => '$' + Math.round(v).toLocaleString('es-CO').replace(/,/g, '.');

// ---------- piezas ----------
function bill(c, x, y, s, rot, seed) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); shp(c, R4(-80, -40, 160, 80), '#9FCFA8', { sharp: true, w: 4, lc: C.ink, seed });
  shp(c, blob(0, 0, 22, 22, seed + 1, { n: 16, amp: .03 }), '#CFE8D2', { w: 3, lc: C.ink, seed: seed + 1 }); tx(c, '$', 0, 2, { size: 26, col: '#2E6B3F', sh: null }); c.restore(); }
function piggy(c, x, y, s, T, seed = 5101) { c.save(); c.translate(x, y); c.scale(s, s);   // alcancía / bóveda: «cuenta de ahorros»
  shp(c, blob(0, 0, 170, 120, seed, { n: 34, amp: .03 }), C.lav, { w: 6, lc: C.ink, seed, hatch: shade(C.lav, .6), hal: .25 });
  shp(c, blob(150, -10, 40, 34, seed + 1, { n: 18, amp: .03 }), C.lav, { w: 5, lc: C.ink, seed: seed + 1 });
  for (const xx of [-90, 90]) shp(c, R4(xx - 20, 90, 40, 60), C.lav, { sharp: true, w: 5, lc: C.ink, seed: seed + 2 });
  shp(c, R4(-40, -122, 80, 14), C.ink, { sharp: true, w: 3, lc: C.ink, seed: seed + 3 }); c.fillStyle = C.ink; c.beginPath(); c.arc(90, -40, 7, 0, TAU); c.fill();
  tx(c, 'AHORROS', -10, 10, { size: 40, f: 'ui', col: C.ink }); c.restore(); }
function cart(c, x, y, s, items, seed = 5120) { c.save(); c.translate(x, y); c.scale(s, s);
  ln(c, [[-160, -120], [-120, -120], [-90, 60], [130, 60], [160, -60], [-100, -60]], { w: 7, seed }); for (const xx of [-60, 100]) { c.fillStyle = C.ink; c.beginPath(); c.arc(xx, 95, 20, 0, TAU); c.fill(); }
  items.forEach(([dx, col], k) => shp(c, R4(dx, -130 - (k % 2) * 30, 60, 70 + (k % 2) * 30), col, { sharp: true, w: 4, lc: C.ink, seed: seed + 5 + k })); c.restore(); }
function hipo(c, y = 200) { tag(c, 'EJEMPLO HIPOTÉTICO', 540, y, { size: 28, bg: C.paper }); }
function src(c, s, y = 1560) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }

// ================= escenas =================
// 1 · Gancho: $10.000.000 quietos; el banco paga +$43.000 pero el sello dice −$587.000 de poder de compra
if (has('gancho')) { const s = 'gancho', t_q = As(s, 'quietos'), t_b = As(s, 'el banco te paga'), t_43 = As(s, 'cuarenta y tres mil pesos.'), t_p = As(s, 'Pero perdiste');
  hit(.05, 8, 'stamp'); hit(t_q + .1, 6, 'ping'); hit(t_43 + .2, 10, 'impact'); hit(t_p + .2, 18, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_p, 960], [t_p + .6, 900]]), key(T, [[0, 1.0], [t_p, 1.0], [t_p + .6, 1.07]]) + .01 * Math.sin(L * 1.3));
    tx(c, 'TU PLATA QUIETA', 540, 200, { size: 96, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }), max: 1000 });
    tx(c, 'EN LA CUENTA DE AHORROS', 540, 300, { size: 58, col: C.goldD, sh: C.ink, max: 1000 });
    piggy(c, 540, 700, 1.15 + .02 * Math.sin(T * 2), T);
    for (let k = 0; k < 8; k++) { const u = pr(T, .1 + k * .1, .5, easeOutBack); if (u > 0) bill(c, lerp(540, 300 + (k % 4) * 160, u), lerp(400, 950 + Math.floor(k / 4) * 70, u), .9, (k - 4) * .08 + Math.sin(T * 2 + k) * .03, 5140 + k * 2); }
    pill(c, cop(1e7), 540, 1120, { size: 60, f: 'ui', sc: pb(T, .3) });
    pill(c, '+ ' + cop(43000) + ' AL AÑO', 300, 1250, { size: 40, f: 'ui', sc: pb(T, t_43), col: '#9FE3B6' });
    stamp(c, '−' + cop(587000), 770, 1250, T, t_p + .1, { size: 58, col: C.red, rot: -.05 });
    tag(c, 'EJEMPLO HIPOTÉTICO', 540, 400, { size: 28, bg: C.paper });
    person(c, 160, 1470, .8, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_p ? 'o' : 'smile', brow: T > t_p ? 1 : 0, sweat: T > t_p + .3 ? T : 0, armR: T > t_b ? [1.8, .5] : [.3, .2] });
  }); }

// 2 · TikTok · ¿Cómo así? La alcancía quieta mientras las etiquetas de precios suben
if (has('pregunta')) { const s = 'pregunta', t_c = As(s, '¿Cómo así?'), t_q = As(s, 'está quieta,'), t_s = As(s, 'sube de precio.');
  hit(t_c + .1, 8, 'ping'); hit(t_q + .1, 6, 'ping'); hit(t_s + .1, 14, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, '¿CÓMO ASÍ?', 540, 220, { size: 110, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    piggy(c, 280, 720, .8, T); tx(c, 'QUIETA', 280, 900, { size: 44, f: 'ui', col: C.vio, al: pr(T, t_q, .3) });
    cart(c, 790, 760, 1.0, [[-90, C.gold], [-20, C.red], [50, C.vio]]);
    for (let k = 0; k < 3; k++) { const g = pr(T, t_q + .2 + k * .3, .9, easeIO), y = 560 - k * 10 - g * 140; c.save(); c.translate(690 + k * 110, y); c.rotate(.1 * (k - 1)); shp(c, [[-60, -28], [50, -28], [75, 0], [50, 28], [-60, 28]], C.goldL, { sharp: true, w: 4, lc: C.ink, seed: 5160 + k });
      tx(c, '↑ ' + (Math.round(100 + g * 6.3 * (k + 1) / 2) / 100).toFixed(2).replace('.', ','), -5, 3, { size: 24, f: 'ui', col: C.red }); c.restore(); }
    stamp(c, 'TODO LO DEMÁS SUBE', 540, 1120, T, t_s, { size: 64, col: C.red, rot: -.03 });
    person(c, 870, 1470, .8, { seed: 11, shirt: C.vio, flip: true, ...idle(T), look: -1, mouth: 'o', brow: 1 });
  }); }

// 3 · Tasas de cuentas de ahorro (Superfinanciera, corte 25 sep. 2026): barras diminutas en bancos grandes
const RATES = [['BANCOLOMBIA', .07], ['BBVA', .38], ['AV VILLAS', .38], ['DAVIVIENDA', .43], ['BCO. DE BOGOTÁ', .54]];
function rateBars(c, T, t0, o = {}) { const x0 = 140, Z = o.Z ?? 1150, K = o.K ?? 900;   // K px por 1 %
  ln(c, [[x0 - 20, Z - 30], [x0 - 20, Z - 30 - RATES.length * 110]], { w: 4, straight: true, seed: 5170 });
  RATES.forEach(([n, r], k) => { const y = Z - 80 - k * 110, g = pr(T, t0 + k * .15, .6, easeOutBack); tx(c, n, x0, y - 30, { size: 30, f: 'ui', align: 'left', al: pr(T, t0 + k * .15, .3) });
    if (g > 0) shp(c, R4(x0, y - 10, Math.max(8, r * K * g), 40), C.lav, { sharp: true, w: 4, lc: C.ink, seed: 5171 + k });
    tx(c, r.toFixed(2).replace('.', ',') + ' %', x0 + Math.max(8, r * K) + 80, y + 10, { size: 32, f: 'ui', col: C.vio, al: g }); });
  // línea del 1 % para dar escala
  const y1 = Z - 30 - RATES.length * 110 - 20; c.save(); c.setLineDash([12, 9]); c.strokeStyle = C.ink; c.globalAlpha = .45; c.lineWidth = 4; c.beginPath(); c.moveTo(x0 + K, Z - 20); c.lineTo(x0 + K, y1); c.stroke(); c.restore();
  tx(c, '1 %', x0 + K, y1 - 24, { size: 30, f: 'ui', al: .7 }); }
if (has('tasas')) { const s = 'tasas', t_s = As(s, 'Superfinanciera,'), t_m = As(s, 'menos del uno por ciento'), t_d = As(s, 'desde cero coma cero siete'), t_h = As(s, 'cincuenta y cuatro por ciento.');
  hit(t_s + .1, 8, 'ping'); hit(t_m + .2, 14, 'stamp'); hit(t_d + .1, 6, 'ping'); hit(t_h + .2, 10, 'impact');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_m, 1.0], [t_m + .6, 1.04]]) + .012 * Math.sin(L));
    tx(c, '¿CUÁNTO PAGA TU CUENTA?', 540, 220, { size: 70, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    tag(c, 'TASA EFECTIVA ANUAL · CORTE 25 SEP. 2026', 540, 320, { size: 28, bg: C.goldL, sc: pb(T, t_s) });
    rateBars(c, T, t_s + .2, { Z: 1080 });
    stamp(c, 'MENOS DEL 1 % AL AÑO', 540, 1200, T, t_m + .1, { size: 60, col: C.red, rot: -.03 });
    person(c, 900, 1480, .75, { seed: 7, shirt: C.navy, flip: true, ...idle(T), look: -1, mouth: T > t_m ? 'flat' : 'smile', brow: T > t_m ? -1 : 0 });
    src(c, 'Fuente: Superintendencia Financiera (vía La República, 29 sep. 2026)');
  }); }

// 4 · TikTok · Inflación 6,30 %: un globo de precios que sube sobre las barras
if (has('inflacion')) { const s = 'inflacion', t_d = As(s, 'según el DANE,'), t_6 = As(s, 'seis coma treinta por ciento'), t_12 = As(s, 'doce meses.');
  hit(t_d + .1, 6, 'ping'); hit(t_6 + .2, 18, 'impact'); hit(t_12 + .1, 8, 'stamp');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 940], [t_6, 940], [t_6 + .6, 880]]), key(T, [[0, 1.0], [t_6, 1.0], [t_6 + .6, 1.08]]) + .012 * Math.sin(L));
    tx(c, 'Y LOS PRECIOS…', 540, 220, { size: 90, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    const g = pr(T, t_6 - .2, .9, easeOutBack); c.save(); c.translate(540, 760 - g * 60 + Math.sin(T * 2) * 10); c.scale(.4 + .7 * g, .4 + .7 * g);
    shp(c, blob(0, 0, 230, 260, 5201, { n: 40, amp: .03 }), C.red, { w: 6, lc: C.ink, seed: 5201, hatch: shade(C.red, .6), hal: .25 }); ln(c, [[0, 260], [-20, 380], [10, 470]], { w: 4, seed: 5202 });
    tx(c, '6,30 %', 0, -20, { size: 120, col: C.paper, sh: C.ink }); tx(c, 'INFLACIÓN', 0, 80, { size: 44, f: 'ui', col: C.paper }); c.restore();
    pill(c, 'ÚLTIMOS 12 MESES · OCT. 2026', 540, 1200, { size: 40, f: 'ui', sc: pb(T, t_12) });
    pill(c, 'TU CUENTA: 0,43 %', 280, 1330, { size: 36, f: 'ui', sc: pb(T, t_12 + .3), col: C.lav });
    stamp(c, '¡15 VECES MÁS!', 770, 1330, T, t_12 + .5, { size: 42, col: C.red, rot: .05 });
    person(c, 150, 1500, .7, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: 'o', brow: 1, sweat: T > t_6 ? T : 0 });
    src(c, 'Fuente: DANE, IPC octubre 2026 (publicado el 9 nov. 2026)');
  }); }

// 5 · La cuenta: $10.000.000 → $10.043.000 vs. lo mismo cuesta $10.630.000 → faltan $587.000
function cuenta(c, T, t_a, t_b, t_f, short) { const Z = 1180, K = 640 / 10.7e6, xa = 330, xb = 750;
  ln(c, [[100, Z], [980, Z]], { w: 7, straight: true, seed: 5210 });
  [[xa, 10043000, t_a, C.lav, 'TU CUENTA'], [xb, 10630000, t_b, C.red, 'LO MISMO CUESTA']].forEach(([x, v, t, col, lab], k) => { const g = pr(T, t, .9, easeIO); if (g <= 0) return;
    const h = (9.4e6 + (v - 9.4e6) * g) * K; shp(c, R4(x - 110, Z - h, 220, h), col, { sharp: true, w: 5, lc: C.ink, seed: 5211 + k, hatch: shade(col, .6), hal: .3 });
    tx(c, lab, x, Z + 46, { size: 32, f: 'ui' }); pill(c, cop(v), x, Z - h - 70, { size: 40, f: 'ui', sc: pb(T, t + .3), col: k ? '#FFB4A6' : C.gold }); });
  if (T > t_f - .2) { const ya = Z - 10043000 * K, yb = Z - 10630000 * K; c.save(); c.setLineDash([10, 8]); c.strokeStyle = C.red; c.lineWidth = 5; c.beginPath(); c.moveTo(xa + 110, ya); c.lineTo(xb - 110, ya); c.stroke(); c.restore();
    ln(c, [[540, ya], [540, yb]], { w: 7, col: C.red, straight: true, seed: 5215 }); }
  stamp(c, 'TE FALTAN ' + cop(587000), 540, Z - 10630000 * K - 190, T, t_f, { size: short ? 52 : 56, col: C.red, rot: -.04 }); }
if (has('cuenta')) { const s = 'cuenta';
  const t_a = TK ? As(s, 'diez millones cuarenta y tres mil.') : As(s, 'diez millones cuarenta y tres mil.'), t_b = TK ? As(s, 'diez millones seiscientos treinta mil.') : As(s, 'diez millones seiscientos treinta mil.');
  const t_f = TK ? As(s, 'Te faltan') : null, t_m = TK ? null : As(s, 'menos del uno por ciento'), t_i = TK ? null : As(s, 'seis coma treinta por ciento:');
  hit(t_a + .2, 10, 'impact'); hit(t_b + .3, 12, 'impact'); if (t_f) hit(t_f + .2, 18, 'stamp'); if (t_m) hit(t_m + .2, 10, 'stamp'); if (t_i) hit(t_i + .2, 14, 'impact');
  scene(s, TK ? 'drop' : 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, key(T, [[0, 1.0], [t_b, 1.0], [t_b + .7, 1.04]]) + .012 * Math.sin(L)); hipo(c);
    if (!TK && T < t_a - .5) { tx(c, 'TASAS DE AHORRO VS. INFLACIÓN', 540, 300, { size: 54, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 }); rateBars(c, T, sec(s).t0, { Z: 1100 });
      stamp(c, 'MENOS DEL 1 % AL AÑO', 540, 1230, T, t_m + .1, { size: 52, col: C.red, rot: -.03 }); src(c, 'Superfinanciera, corte 25 sep. 2026 · DANE, oct. 2026'); return; }
    tx(c, cop(1e7) + ' DURANTE UN AÑO', 540, 300, { size: 56, col: C.ink, max: 1000 });
    if (!TK) pill(c, 'INFLACIÓN 6,30 %', 820, 400, { size: 34, f: 'ui', sc: pb(T, t_i), col: '#FFB4A6' });
    cuenta(c, T, t_a - .6, t_b - .6, t_f ?? 99, !TK);
    tx(c, 'Tasa 0,43 % E.A. · inflación 6,30 % (DANE) · cálculo TITÁN', 540, 1300, { size: 26, f: 'ui', al: .8 });
    person(c, 900, 1500, .7, { seed: 9, shirt: C.navy, flip: true, ...idle(T), look: -1, mouth: T > t_b ? 'o' : 'flat', brow: T > t_b ? 1 : 0 });
  }); }

// 6 · TikTok · 4×1000: cada retiro deja 4 pesos de cada 1.000; la cuenta exenta tiene tope
if (has('cuatro')) { const s = 'cuatro', t_s = As(s, 'sacas o transfieres'), t_4 = As(s, 'el cuatro por mil'), t_e = As(s, 'salvo en la cuenta'), t_t = As(s, 'hasta un tope.');
  hit(t_s + .1, 6, 'ping'); hit(t_4 + .2, 14, 'stamp'); hit(t_e + .1, 8, 'ping'); hit(t_t + .1, 8, 'ping');
  scene(s, 'news', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'Y EL 4×1000', 540, 220, { size: 100, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    // cajero que entrega billetes; una moneda se queda en el camino
    shp(c, R4(380, 420, 320, 460), '#3B4466', { w: 6, lc: C.ink, seed: 5301 }); shp(c, R4(420, 460, 240, 150), '#BFE3F5', { sharp: true, w: 4, lc: C.ink, seed: 5302 }); tx(c, 'RETIRO', 540, 535, { size: 40, f: 'ui', col: C.ink });
    for (let k = 0; k < 4; k++) { const u = ((T - t_s) * .8 + k / 4) % 1; if (T < t_s) break; bill(c, lerp(540, 820, u), 700 + Math.sin(u * Math.PI) * -120, .7, u * .6, 5310 + k * 2); }
    if (T > t_4) { const u = pr(T, t_4, .8, easeIO); c.save(); c.translate(lerp(560, 220, u), lerp(720, 1000, u)); shp(c, blob(0, 0, 34, 34, 5320, { n: 18, amp: .03 }), C.gold, { w: 4, lc: C.ink, seed: 5320 }); tx(c, '$4', 0, 2, { size: 26, f: 'ui', col: C.goldD }); c.restore(); }
    pill(c, '$4 DE CADA $1.000', 540, 1060, { size: 48, f: 'ui', sc: pb(T, t_4 + .2), col: '#FFB4A6' });
    tag(c, 'UNA CUENTA EXENTA · HASTA UN TOPE MENSUAL', 540, 1180, { size: 30, bg: C.goldL, sc: pb(T, t_e) });
    person(c, 160, 1480, .78, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_4 ? 'flat' : 'smile', brow: T > t_4 ? -1 : 0 });
    src(c, 'Gravamen a los Movimientos Financieros · Estatuto Tributario');
  }); }

// 7 · TikTok · Comparar: en la misma lista había entidades por encima del 9 %; depende de montos, condiciones y requisitos
if (has('comparar')) { const s = 'comparar', t_9 = As(s, 'más del nueve por ciento.'), t_n = As(s, 'No es que una sea mejor'), t_c = As(s, 'cambian los montos,');
  hit(t_9 + .2, 14, 'impact'); hit(t_n + .1, 8, 'ping'); hit(t_c + .1, 10, 'stamp');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'EN LA MISMA LISTA…', 540, 220, { size: 80, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    const x0 = 140, K = 70; [['BANCOS GRANDES', .54, C.lav], ['OTRAS ENTIDADES', 9.93, C.gold]].forEach(([n, r, col], k) => { const y = 520 + k * 200, g = pr(T, sec(s).t0 + .2 + k * .6, .8, easeOutBack);
      tx(c, n, x0, y - 40, { size: 34, f: 'ui', align: 'left' }); if (g > 0) shp(c, R4(x0, y, Math.max(10, r * K * g), 70), col, { sharp: true, w: 5, lc: C.ink, seed: 5401 + k, hatch: shade(col, .6), hal: .3 });
      pill(c, (k ? 'MÁS DEL 9 %' : 'HASTA 0,54 %'), Math.min(860, x0 + r * K + 150), y + 35, { size: 34, f: 'ui', sc: pb(T, sec(s).t0 + .5 + k * .6) }); });
    ['MONTOS', 'CONDICIONES', 'REQUISITOS'].forEach((w, k) => tag(c, w, 220 + k * 320, 1000, { size: 36, bg: C.paper, sc: pb(T, t_c + k * .35), rot: (k - 1) * .04 }));
    stamp(c, 'NO HAY UNA MEJOR PARA TODOS', 540, 1170, T, t_n + .2, { size: 50, col: C.goldD, rot: -.03 });
    person(c, 900, 1480, .75, { seed: 12, shirt: C.vio, flip: true, ...idle(T), look: -1, mouth: 'smile', armR: [1.6, .7] });
    src(c, 'Superfinanciera, corte 25 sep. 2026: Ban100 9,93 %, Contactar 10 %, Pichincha 11 % E.A.');
  }); }

// 8 · Cierre (noche): la cuenta sirve para la plata a la mano · la que no vas a usar, ¿quieta? · compara la tasa E.A. · haz tu cuenta
if (has('cierre')) { const s = 'cierre', t_q = TK ? As(s, '¿la estás dejando quieta?') : As(s, 'no vas a usar pronto,'), t_c = As(s, 'compara la tasa'), t_h = As(s, 'haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  const t_m = TK ? As(s, 'plata a la mano.') : null;
  if (t_m) hit(t_m + .1, 6, 'ping'); hit(t_q + .1, 10, 'stamp'); hit(t_c + .1, 8, 'ping'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    if (!TK) tx(c, 'TE FALTAN ' + cop(587000), 540, 280, { size: 66, col: '#FFB4A6', sh: null, sc: pb(T, sec(s).t0 - .2), max: 1000 });
    else tx(c, 'LA CUENTA DE AHORROS: PLATA A LA MANO', 540, 280, { size: 50, col: C.chalk, sh: C.goldD, clipP: pr(T, sec(s).t0, .6, easeIO), max: 1000 });
    tx(c, 'LA QUE NO VAS A USAR PRONTO,', 540, 470, { size: 52, col: C.chalk, sh: C.goldD, clipP: pr(T, t_q - (TK ? 1.6 : .3), .6, easeIO), max: 1000 });
    tx(c, '¿LA ESTÁS DEJANDO QUIETA?', 540, 570, { size: 60, col: C.lav, sh: null, clipP: pr(T, t_q, .6, easeIO), max: 1000 });
    pill(c, 'COMPARA LA TASA EFECTIVA ANUAL', 540, 760, { size: 42, f: 'ui', sc: pb(T, t_c) });
    tx(c, 'HAZ TU CUENTA', 540, 980, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada: el gancho con el sello −$587.000 =================
function cover(c) { const t = As('gancho', 'Pero perdiste'); drawScene(c, SC[0], Math.min(t + 1.6, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('cuenta-ahorros', cover);
