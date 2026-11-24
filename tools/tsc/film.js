// TITÁN · «¿No tener tarjeta te sale más caro?» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js) · línea B (plata del día a día)
// Tema de una referencia de Lady; nombres, cifras (Colombia), escenas y frases propias de TITÁN.
// Usura nov 2026 28,34 % E.A. (Superfinanciera) → préstamo de $1.000.000 a 12 cuotas: intereses $141.768. Gota a gota: $40.000 × 30 días = $1.200.000 → $200.000 en un mes.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const cop = v => '$' + Math.round(v).toLocaleString('es-CO').replace(/,/g, '.');
function src(c, s, y = 1312) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }
function hipo(c, y = 320) { tag(c, 'EJEMPLO HIPOTÉTICO', 540, y, { size: 28, bg: C.paper }); }
const SARA = { seed: 6, shirt: C.lav }, MATEO = { seed: 10, shirt: '#3B4466' };

// ---------- piezas ----------
function ccard(c, x, y, s, rot, o = {}) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); shp(c, R4(-130, -80, 260, 160), o.col || C.vio, { w: 5, lc: C.ink, seed: o.seed ?? 9001 });
  shp(c, R4(-130, -44, 260, 32), C.ink, { sharp: true, w: 2, lc: C.ink, seed: 9002 }); shp(c, R4(-100, 14, 54, 38), C.gold, { sharp: true, w: 3, lc: C.ink, seed: 9003 }); tx(c, 'TARJETA', 40, 40, { size: 26, f: 'ui', col: C.paper }); c.restore(); }
function xmark(c, x, y, r, p, seed = 9010) { ln(c, [[x - r, y - r], [x + r, y + r]], { w: 12, col: C.red, p, straight: true, seed }); ln(c, [[x + r, y - r], [x - r, y + r]], { w: 12, col: C.red, p: Math.max(0, p * 2 - 1), straight: true, seed: seed + 1 }); }
function check(c, x, y, r, p, col = '#2E8B57', seed = 9020) { ln(c, [[x - r, y], [x - r * .3, y + r * .7], [x + r, y - r * .8]], { w: 10, col, p, straight: true, seed }); }
function bank(c, x, y, s, seed = 9030) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, [[-170, -120], [0, -210], [170, -120]], C.paper, { sharp: true, w: 5, lc: C.ink, seed });
  for (let k = 0; k < 4; k++) shp(c, R4(-140 + k * 80, -110, 40, 180), C.paper, { sharp: true, w: 4, lc: C.ink, seed: seed + 1 + k }); shp(c, R4(-180, 70, 360, 30), C.navy, { sharp: true, w: 4, lc: C.ink, seed: seed + 6 });
  tx(c, 'BANCO', 0, -150, { size: 30, f: 'ui' }); c.restore(); }
function moto(c, x, y, s, T, seed = 9040, smoke = 0) { c.save(); c.translate(x, y); c.scale(s, s);
  for (const xx of [-90, 90]) { shp(c, blob(xx, 44, 52, 52, seed + xx, { n: 20, amp: .02 }), '#3B4466', { w: 5, lc: C.ink, seed: seed + xx }); shp(c, blob(xx, 44, 20, 20, seed + xx + 1, { n: 12, amp: .02 }), C.paper, { w: 3, lc: C.ink, seed: seed + xx + 1 }); }
  shp(c, [[-100, 20], [-30, -46], [70, -46], [110, 20]], C.red, { sharp: true, w: 5, lc: C.ink, seed: seed + 3 }); ln(c, [[70, -46], [90, -92], [124, -92]], { w: 7, straight: true, seed: seed + 4 });
  for (let k = 0; k < 4 * smoke; k++) { const u = (T * .7 + k / 4) % 1; c.save(); c.globalAlpha = (1 - u) * .7; shp(c, blob(-120 - u * 60, -30 - u * 160, 30 + u * 40, 30 + u * 40, seed + 10 + k, { n: 16, amp: .06 }), '#BFC3CC', { w: 3, lc: C.ink, seed: seed + 10 + k }); c.restore(); }
  c.restore(); }
function coinD(c, x, y, r, seed) { shp(c, blob(x, y, r, r, seed, { n: 16, amp: .02 }), C.gold, { w: 3, lc: C.ink, seed }); tx(c, '$', x, y + 2, { size: r * 1.1, col: C.goldD, sh: null }); }
// comparación final: barra de Sara (12 meses) vs barra de Mateo (1 mes)
function compare(c, T, tA, tB, y0 = 1220) { const K = 560 / 200000;
  [[300, 141768, tA, C.lav, 'SARA · 12 MESES'], [780, 200000, tB, C.red, 'MATEO · 1 MES']].forEach(([x, v, t, col, lab], k) => { const g = pr(T, t, .7, easeOutBack); if (g <= 0) return;
    shp(c, R4(x - 110, y0 - v * K * g, 220, v * K * g), col, { sharp: true, w: 5, lc: C.ink, seed: 9100 + k, hatch: shade(col, .6), hal: .3 });
    tx(c, lab, x, y0 + 40, { size: 30, f: 'ui' }); pill(c, cop(v), x, y0 - v * K - 60, { size: 40, f: 'ui', sc: pb(T, t + .3), col: k ? '#FFB4A6' : C.gold }); });
  ln(c, [[120, y0], [960, y0]], { w: 6, straight: true, seed: 9105 }); }

// ================= escenas =================
// 1 · Gancho: la tarjeta tachada… y el sello «MÁS CARO»
if (has('gancho')) { const s = 'gancho', t_c = As(s, 'más caro'), t_t = As(s, 'tenerla.');
  hit(.05, 8, 'stamp'); hit(.6, 10, 'impact'); hit(t_c + .2, 18, 'stamp'); hit(t_t + .1, 8, 'ping');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_c, 960], [t_c + .6, 930]]), key(T, [[0, 1.0], [t_c, 1.0], [t_c + .6, 1.06]]) + .01 * Math.sin(L * 1.3));
    tx(c, '¿SIN TARJETA?', 540, 200, { size: 110, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    ccard(c, 540, 640, 1.6, -.08 + .03 * Math.sin(T * 2)); xmark(c, 540, 640, 170, pr(T, .45, .5));
    stamp(c, 'TE PUEDE SALIR MÁS CARO', 540, 1000, T, t_c + .1, { size: 60, col: C.red, rot: -.04 });
    for (let k = 0; k < 6; k++) { const u = pr(T, t_c + .2 + k * .08, .8, easeOutQuint); if (u > 0 && u < 1) coinD(c, 540 + Math.cos(k) * 380 * u, 1000 + Math.sin(k * 2) * 200 * u - 300 * u, 30, 9200 + k); }
    person(c, 880, 1560, .6, { ...MATEO, flip: true, ...idle(T), look: -1, mouth: T > t_c ? 'o' : 'smile', brow: T > t_c ? 1 : 0, sweat: T > t_c + .2 ? T : 0 });
  }); }

// 2 · TikTok · La creencia: «sin tarjeta = sin deudas» con escudo… y un signo de pregunta
if (has('creencia')) { const s = 'creencia', t_s = As(s, 'se salva de las deudas.'), t_m = As(s, 'mira esta cuenta.');
  hit(sec(s).t0 + .1, 8, 'ping'); hit(t_s + .1, 10, 'stamp'); hit(t_m + .1, 14, 'impact');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'LO QUE MUCHOS CREEN', 540, 210, { size: 76, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    shp(c, [[380, 420], [700, 420], [700, 640], [540, 800], [380, 640]], C.lav, { sharp: true, w: 6, lc: C.ink, seed: 9300, hatch: shade(C.lav, .6), hal: .25 });
    tx(c, 'SIN', 540, 540, { size: 60, f: 'ui', col: C.ink }); tx(c, 'DEUDAS', 540, 620, { size: 52, f: 'ui', col: C.ink });
    pill(c, 'SIN TARJETA = SIN DEUDAS', 540, 900, { size: 46, f: 'ui', sc: pb(T, t_s) });
    tx(c, '¿SEGURO?', 540, 1080, { size: 110 * pb(T, t_m), col: C.red });
    person(c, 200, 1560, .65, { ...MATEO, ...idle(T), look: 1, mouth: T > t_m ? 'o' : 'smile', armR: [2.2, .5] });
  }); }

// 3 · El ejemplo: Sara (tarjeta solo para el mercado, paga el total) y Mateo (nada de tarjetas); mismo sueldo
if (has('ejemplo')) { const s = 'ejemplo', t_s = As(s, TK ? 'Sara usa la tarjeta' : 'Sara paga su tarjeta'), t_c = As(s, TK ? 'la paga completa.' : 'arma historial.'), t_m = As(s, TK ? 'Mateo no quiere' : 'Mateo nunca ha tenido');
  const t_l = TK ? As(s, 'ganan lo mismo.') : null, t_d = TK ? null : As(s, 'se les daña la moto:'), t_1 = TK ? null : As(s, 'un millón de pesos.');
  if (t_l) hit(t_l + .1, 8, 'ping'); hit(t_s + .1, 8, 'ping'); hit(t_c + .2, 12, 'impact'); hit(t_m + .1, 12, 'stamp'); if (t_d) { hit(t_d + .1, 14, 'impact'); hit(t_1 + .2, 12, 'stamp'); }
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L)); tx(c, 'SARA Y MATEO', 540, 210, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) }); hipo(c, 320);
    if (t_d && T > t_d - .2) { moto(c, 540, 760, 1.2, T, 9040, 1); pill(c, cop(1e6), 540, 1000, { size: 64, f: 'ui', sc: pb(T, t_1), col: '#FFB4A6' });
      person(c, 220, 1560, .6, { ...SARA, ...idle(T), look: 1, mouth: 'o', brow: 1 }); person(c, 860, 1560, .6, { ...MATEO, flip: true, ...idle(T, 1), look: -1, mouth: 'o', brow: 1, sweat: T }); return; }
    if (t_l) pill(c, 'GANAN LO MISMO', 540, 430, { size: 38, f: 'ui', sc: pb(T, t_l) });
    person(c, 270, 1080, .95, { ...SARA, ...idle(T), look: 1, mouth: T > t_c ? 'smile' : 'flat', armR: T > t_s ? [1.6, .6] : [.3, .2] }); tx(c, 'SARA', 270, 1150, { size: 44, f: 'ui', col: C.vio });
    if (T > t_s) ccard(c, 430, 640, .55 * pb(T, t_s), -.2); pill(c, TK ? 'SOLO PARA EL MERCADO' : 'PAGA COMPLETO', 270, 1240, { size: 30, f: 'ui', sc: pb(T, t_s + .3), col: '#9FE3B6' });
    if (T > t_c) { check(c, 270, 520, 50, pr(T, t_c, .4)); tag(c, 'PAGA EL TOTAL', 270, 430 + (TK ? 90 : 0), { size: 28, bg: C.goldL, sc: pb(T, t_c) }); }
    person(c, 810, 1080, .95, { ...MATEO, flip: true, ...idle(T, 1), look: -1, mouth: T > t_m ? 'flat' : 'smile', armR: T > t_m ? [.9, 1.6] : [.3, .2], armL: T > t_m ? [.9, 1.6] : [.3, .2] }); tx(c, 'MATEO', 810, 1150, { size: 44, f: 'ui', col: C.navy });
    if (T > t_m) { ccard(c, 810, 620, .55, .15, { col: '#8A8FA0' }); xmark(c, 810, 620, 80, pr(T, t_m + .1, .4)); }
    pill(c, TK ? 'NADA DE TARJETAS' : 'SIN CRÉDITO', 810, 1240, { size: 30, f: 'ui', sc: pb(T, t_m + .3), col: '#FFB4A6' });
  }); }

// 4 · TikTok · Historial: Sara suma meses con ✓ en las centrales de riesgo; Mateo se desvanece: «NO EXISTE»
if (has('historial')) { const s = 'historial', t_t = As(s, 'paga el total,'), t_h = As(s, 'historial en las centrales'), t_n = As(s, 'no existe.');
  hit(t_t + .1, 8, 'ping'); hit(t_h + .2, 12, 'impact'); hit(t_n + .1, 16, 'stamp');
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'EL HISTORIAL', 540, 210, { size: 100, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    pill(c, '0 INTERESES', 270, 360, { size: 40, f: 'ui', sc: pb(T, t_t + .3), col: '#9FE3B6' });
    ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN'].forEach((m, k) => { const g = pr(T, t_h - .2 + k * .2, .4, easeOutBack); if (g <= 0) return; const y = 980 - k * 90;
      c.save(); c.translate(270, y); c.scale(g, g); shp(c, R4(-140, -38, 280, 76), C.lav, { sharp: true, w: 4, lc: C.ink, seed: 9400 + k }); tx(c, m, -60, 2, { size: 30, f: 'ui' }); check(c, 70, 0, 22, 1, '#2E8B57', 9410 + k); c.restore(); });
    tag(c, 'CENTRALES DE RIESGO', 270, 1080, { size: 28, bg: C.goldL, sc: pb(T, t_h + .4) });
    person(c, 270, 1500, .55, { ...SARA, ...idle(T), look: 1, mouth: 'grin', armR: [2.4, .4] });
    c.save(); c.globalAlpha = 1 - .75 * pr(T, t_n - .6, 1.0); person(c, 810, 1100, .95, { ...MATEO, flip: true, ...idle(T, 1), look: -1, mouth: 'flat' }); c.restore();
    stamp(c, 'PARA EL BANCO: NO EXISTE', 810, 640, T, t_n + .1, { size: 40, col: C.red, rot: .05 });
  }); }

// 5 · TikTok · Imprevisto: se daña la moto con la que trabajan → $1.000.000 y nadie lo tiene ahorrado
if (has('imprevisto')) { const s = 'imprevisto', t_d = As(s, 'se les daña la moto'), t_1 = As(s, 'un millón de pesos,'), t_n = As(s, 'ninguno lo tiene ahorrado.');
  hit(t_d + .2, 16, 'impact'); hit(t_1 + .2, 12, 'stamp'); hit(t_n + .1, 10, 'stamp');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 950], [t_d, 950], [t_d + .5, 920]]), key(T, [[0, 1.0], [t_d, 1.0], [t_d + .5, 1.06]]) + .012 * Math.sin(L));
    tx(c, 'UN DÍA…', 540, 210, { size: 110, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    const shake = T > t_d && T < t_d + .8 ? Math.sin(T * 60) * 8 : 0; moto(c, 540 + shake, 700, 1.3, T, 9040, T > t_d ? 1 : 0);
    if (T > t_d + .3) { c.save(); c.translate(720, 560); c.rotate(-.6 + Math.sin(T * 8) * .2); shp(c, R4(-12, -80, 24, 160), '#8A8FA0', { sharp: true, w: 4, lc: C.ink, seed: 9500 }); c.restore(); }
    pill(c, 'ARREGLO: ' + cop(1e6), 540, 980, { size: 58, f: 'ui', sc: pb(T, t_1), col: '#FFB4A6' });
    stamp(c, 'NINGUNO LO TIENE AHORRADO', 540, 1120, T, t_n + .1, { size: 48, col: C.red, rot: -.03 });
    person(c, 160, 1560, .55, { ...SARA, ...idle(T), look: 1, mouth: T > t_d ? 'o' : 'smile', brow: T > t_d ? 1 : 0 });
    person(c, 920, 1560, .55, { ...MATEO, flip: true, ...idle(T, 1), look: -1, mouth: T > t_d ? 'o' : 'smile', brow: T > t_d ? 1 : 0, sweat: T > t_n ? T : 0 });
  }); }

// 6 · TikTok · Sara: el banco presta (✓ APROBADO) · 12 cuotas a la tasa máxima legal → $141.768 de intereses en el año
if (has('sara')) { const s = 'sara', t_p = As(s, 'el banco le presta.'), t_t = As(s, 'tasa máxima legal'), t_12 = As(s, 'doce cuotas'), t_a = As(s, 'en todo el año.');
  hit(t_p + .2, 12, 'stamp'); hit(t_t + .1, 8, 'ping'); hit(t_12 + .1, 10, 'impact'); hit(t_a + .1, 14, 'stamp');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L)); hipo(c, 320);
    tx(c, 'SARA', 540, 210, { size: 100, col: C.vio, sc: pb(T, sec(s).t0 - .3) });
    bank(c, 300, 640, 1.0); stamp(c, 'APROBADO', 300, 520, T, t_p + .2, { size: 50, col: '#2E8B57', rot: -.06 });
    tag(c, 'USURA NOV. 2026: 28,34 % E.A.', 760, 430, { size: 28, bg: C.goldL, sc: pb(T, t_t) });
    for (let k = 0; k < 12; k++) { const g = pr(T, t_12 + k * .08, .3, easeOutBack); if (g <= 0) continue; const x = 600 + (k % 4) * 85, y = 560 + Math.floor(k / 4) * 85;
      c.save(); c.translate(x, y); c.scale(g, g); shp(c, R4(-34, -34, 68, 68), C.lav, { sharp: true, w: 3, lc: C.ink, seed: 9600 + k }); tx(c, '' + (k + 1), 0, 2, { size: 28, f: 'ui' }); c.restore(); }
    pill(c, '12 CUOTAS DE ' + cop(95147), 730, 860, { size: 32, f: 'ui', sc: pb(T, t_12 + 1.0) });
    pill(c, 'INTERESES: ' + cop(141768) + ' EN UN AÑO', 540, 1040, { size: 44, f: 'ui', sc: pb(T, t_a), col: C.gold });
    person(c, 540, 1560, .6, { ...SARA, ...idle(T), look: 0, mouth: T > t_p ? 'grin' : 'flat', armR: T > t_p ? [2.6, .3] : [.3, .2] });
    src(c, 'Tasa de usura: Superintendencia Financiera · cuota fija a 12 meses · cálculo TITÁN', 1180);
  }); }

// 7 · TikTok · Mateo: el banco lo rechaza (✗) → gota a gota: $40.000 diarios × 30 días → $200.000 de intereses en un mes; comparación final
if (has('mateo')) { const s = 'mateo', t_r = As(s, 'lo rechaza'), t_g = As(s, 'gota a gota:'), t_3 = As(s, 'treinta días.'), t_m = As(s, 'en un solo mes.');
  hit(t_r + .2, 14, 'stamp'); hit(t_g + .1, 12, 'impact'); hit(t_3 + .1, 8, 'ping'); hit(t_m + .1, 18, 'impact');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 950], [t_m, 950], [t_m + .6, 980]]), key(T, [[0, 1.0], [t_m, 1.0], [t_m + .6, 1.05]]) + .012 * Math.sin(L)); hipo(c, 320);
    tx(c, 'MATEO', 540, 210, { size: 100, col: C.navy, sc: pb(T, sec(s).t0 - .3) });
    if (T < t_m - .3) {
      bank(c, 280, 640, .9); stamp(c, 'RECHAZADO', 280, 520, T, t_r + .2, { size: 48, col: C.red, rot: .06 });
      if (T > t_g - .2) { tag(c, 'GOTA A GOTA', 760, 440, { size: 34, bg: '#FFD3CB', sc: pb(T, t_g) });
        for (let k = 0; k < 30; k++) { const g = pr(T, t_g + .3 + k * .05, .25); if (g <= 0) continue; const x = 600 + (k % 6) * 62, y = 520 + Math.floor(k / 6) * 62;
          c.save(); c.globalAlpha = g; shp(c, R4(x - 26, y - 26, 52, 52), '#FFD3CB', { sharp: true, w: 3, lc: C.ink, seed: 9700 + k }); tx(c, '' + (k + 1), x, y + 2, { size: 20, f: 'ui' }); c.restore(); }
        pill(c, cop(40000) + ' × 30 DÍAS = ' + cop(1200000), 540, 940, { size: 38, f: 'ui', sc: pb(T, t_3), col: '#FFB4A6' }); }
      person(c, 540, 1560, .6, { ...MATEO, ...idle(T), look: 0, mouth: 'o', brow: 1, sweat: T > t_r ? T : 0 });
      return; }
    stamp(c, cop(200000) + ' DE INTERESES EN UN MES', 540, 470, T, t_m - .2, { size: 44, col: C.red, rot: -.03 });
    compare(c, T, t_m - .3, t_m, 1200);
    src(c, 'Ejemplo hipotético · cobrar por encima de la usura es delito en Colombia', 1320);
  }); }

// 8 · TikTok · La letra pequeña: pago total ✓ vs. pago mínimo → intereses
if (has('letra')) { const s = 'letra', t_c = As(s, 'pagas completa.'), t_m = As(s, 'el mínimo,'), t_t = As(s, 'eres tú.');
  hit(t_c + .1, 10, 'ping'); hit(t_m + .1, 12, 'impact'); hit(t_t + .1, 16, 'stamp');
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'OJO', 540, 220, { size: 140, col: C.red, sc: pb(T, sec(s).t0 - .2) });
    ccard(c, 290, 620, .9 * pb(T, sec(s).t0 + .2), -.08); pill(c, 'PAGO TOTAL', 290, 820, { size: 40, f: 'ui', sc: pb(T, t_c - .3), col: '#9FE3B6' }); check(c, 290, 940, 60, pr(T, t_c, .4));
    ccard(c, 790, 620, .9 * pb(T, t_m - .4), .08, { col: '#8A8FA0' }); pill(c, 'PAGO MÍNIMO', 790, 820, { size: 40, f: 'ui', sc: pb(T, t_m), col: '#FFB4A6' });
    stamp(c, '+ INTERESES', 790, 950, T, t_t, { size: 52, col: C.red, rot: .05 });
    person(c, 540, 1560, .6, { ...SARA, ...idle(T), look: 0, mouth: 'flat', armR: [2.2, .5] });
  }); }

// Short · El giro: Sara (banco ✓, $141.768 en un año) vs. Mateo (rechazado → gota a gota $200.000 en un mes)
if (has('giro')) { const s = 'giro', t_p = As(s, 'el banco le presta:'), t_a = As(s, 'en todo un año.'), t_r = As(s, 'A Mateo lo rechazan,'), t_m = As(s, 'en un solo mes.');
  hit(t_p + .2, 12, 'stamp'); hit(t_a + .1, 12, 'impact'); hit(t_r + .1, 14, 'stamp'); hit(t_m + .1, 18, 'impact');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 950], [t_m, 950], [t_m + .6, 980]]), key(T, [[0, 1.0], [t_m, 1.0], [t_m + .6, 1.05]]) + .012 * Math.sin(L)); hipo(c, 320);
    tx(c, 'EL MISMO ARREGLO', 540, 210, { size: 84, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    bank(c, 300, 620, .8); stamp(c, 'APROBADO', 300, 520, T, t_p + .2, { size: 42, col: '#2E8B57', rot: -.06 });
    bank(c, 780, 620, .8, 9050); stamp(c, 'RECHAZADO', 780, 520, T, t_r + .2, { size: 42, col: C.red, rot: .06 });
    if (T > t_r + .5) tag(c, '→ GOTA A GOTA', 780, 800, { size: 32, bg: '#FFD3CB', sc: pb(T, t_r + .5) });
    compare(c, T, t_a - .4, t_m - .3, 1240);
    src(c, 'Ejemplo hipotético · usura nov. 2026: 28,34 % E.A. (Superfinanciera)', 1330);
  }); }

// 9 · Cierre (noche): el problema no es el crédito: es cómo lo usas · haz tu cuenta
if (has('cierre')) { const s = 'cierre', t_p = As(s, 'El problema no es el crédito:'), t_u = As(s, 'es cómo lo usas.'), t_h = As(s, 'Haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  const t_o = TK ? null : As(s, 'solo funciona si la pagas completa.');
  if (t_o) hit(t_o + .1, 10, 'stamp'); hit(t_p + .1, 8, 'ping'); hit(t_u + .1, 12, 'stamp'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    if (t_o) tx(c, 'SOLO SI LA PAGAS COMPLETA', 540, 230, { size: 56, col: '#FFB4A6', sh: null, clipP: pr(T, sec(s).t0, .6, easeIO), max: 1000 });
    tx(c, 'EL PROBLEMA NO ES EL CRÉDITO:', 540, 340, { size: 54, col: C.chalk, sh: C.goldD, clipP: pr(T, t_p, .6, easeIO), max: 1000 });
    tx(c, 'ES CÓMO LO USAS', 540, 440, { size: 72, col: C.lav, sh: null, clipP: pr(T, t_u, .6, easeIO), max: 1000 });
    ccard(c, 540, 680, .9 * pb(T, TK ? sec(s).t0 + .2 : sec(s).t0 + .4), -.05 + .04 * Math.sin(T * 2), { col: C.vio }); if (T > t_u) check(c, 540, 690, 70, pr(T, t_u + .2, .4), C.gold);
    tx(c, 'HAZ TU CUENTA', 540, 1000, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada: tarjeta tachada con «TE PUEDE SALIR MÁS CARO» =================
function cover(c) { const t = As('gancho', 'más caro'); drawScene(c, SC[0], Math.min(t + 1.3, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('sin-tarjeta', cover);
