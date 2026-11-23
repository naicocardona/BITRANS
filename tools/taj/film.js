// TITÁN · «Si te alcanza justo, no te alcanza» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js) · línea B (plata del día a día)
// Tema de una referencia de Lady; escenas, objetos y frases propias de TITÁN (balanza, sobres, colchón), nada copiado.
// Salario mínimo 2026 $1.750.905 (Decreto 1469 de 2025). BBVA: fondo de 3 a 6 meses de gastos básicos (La República, 7 may. 2026).
// EJEMPLO HIPOTÉTICO: Ana (mínimo, le sobran $100.000/mes) vs. Bruno ($6.000.000, no le sobra nada); imprevisto de $400.000.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const cop = v => '$' + Math.round(v).toLocaleString('es-CO').replace(/,/g, '.');
function src(c, s, y = 1520) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }
function hipo(c, y = 330) { tag(c, 'EJEMPLO HIPOTÉTICO', 540, y, { size: 28, bg: C.paper }); }

// ---------- piezas ----------
function coinD(c, x, y, r, seed, s = '$') { shp(c, blob(x, y, r, r, seed, { n: 18, amp: .02 }), C.gold, { w: 4, lc: C.ink, seed }); tx(c, s, x, y + 2, { size: r * (s.length > 1 ? .55 : 1.1), col: C.goldD, sh: null }); }
// balanza: ang > 0 inclina hacia la derecha (gastos)
function scale(c, x, y, ang, T, o = {}) { c.save(); c.translate(x, y);
  shp(c, R4(-18, 0, 36, 380), '#3B4466', { sharp: true, w: 5, lc: C.ink, seed: 7001 }); shp(c, R4(-120, 360, 240, 34), '#3B4466', { sharp: true, w: 5, lc: C.ink, seed: 7002 });
  c.save(); c.rotate(ang); shp(c, R4(-330, -14, 660, 28), C.navy, { sharp: true, w: 5, lc: C.ink, seed: 7003 });
  for (const [sx, lab, col] of [[-1, o.l || 'INGRESOS', C.lav], [1, o.r || 'GASTOS', '#FFB4A6']]) { c.save(); c.translate(sx * 300, 0); c.rotate(-ang);
    ln(c, [[0, 0], [-90, 150]], { w: 4, straight: true, seed: 7010 + sx }); ln(c, [[0, 0], [90, 150]], { w: 4, straight: true, seed: 7012 + sx });
    shp(c, [[-120, 150], [120, 150], [90, 200], [-90, 200]], col, { sharp: true, w: 5, lc: C.ink, seed: 7014 + sx }); tx(c, lab, 0, 240, { size: 34, f: 'ui' }); c.restore(); }
  c.restore(); c.fillStyle = C.gold; c.beginPath(); c.arc(0, 0, 22, 0, TAU); c.fill(); c.restore(); }
function envelope(c, x, y, s, lab, col, seed) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, R4(-110, -70, 220, 140), col, { sharp: true, w: 5, lc: C.ink, seed });
  ln(c, [[-110, -70], [0, 10], [110, -70]], { w: 4, straight: true, seed: seed + 1 }); tx(c, lab, 0, 44, { size: 28, f: 'ui' }); c.restore(); }
function phone(c, x, y, T, seed) { c.save(); c.translate(x, y); c.rotate(.15); shp(c, R4(-55, -95, 110, 190), '#3B4466', { w: 5, lc: C.ink, seed }); shp(c, R4(-42, -78, 84, 150), '#BFE3F5', { sharp: true, w: 3, lc: C.ink, seed: seed + 1 });
  ln(c, [[-30, -60], [5, -10], [-10, 20], [30, 60]], { w: 4, straight: true, seed: seed + 2 }); c.restore(); }
function medic(c, x, y, seed) { shp(c, blob(x, y, 80, 80, seed, { n: 24, amp: .03 }), C.paper, { w: 5, lc: C.ink, seed }); shp(c, R4(x - 18, y - 52, 36, 104), C.red, { sharp: true, w: 3, lc: C.ink, seed: seed + 1 }); shp(c, R4(x - 52, y - 18, 104, 36), C.red, { sharp: true, w: 3, lc: C.ink, seed: seed + 2 }); }
function moto(c, x, y, seed) { c.save(); c.translate(x, y); for (const xx of [-80, 80]) { shp(c, blob(xx, 40, 46, 46, seed + xx, { n: 20, amp: .02 }), '#3B4466', { w: 5, lc: C.ink, seed: seed + xx }); shp(c, blob(xx, 40, 18, 18, seed + xx + 1, { n: 12, amp: .02 }), C.paper, { w: 3, lc: C.ink, seed: seed + xx + 1 }); }
  shp(c, [[-90, 20], [-30, -40], [60, -40], [100, 20]], C.lav, { sharp: true, w: 5, lc: C.ink, seed: seed + 3 }); ln(c, [[60, -40], [80, -80], [110, -80]], { w: 6, straight: true, seed: seed + 4 }); c.restore(); }
function card(c, x, y, s, seed) { c.save(); c.translate(x, y); c.rotate(-.12); c.scale(s, s); shp(c, R4(-120, -75, 240, 150), C.vio, { w: 5, lc: C.ink, seed }); shp(c, R4(-120, -40, 240, 30), C.ink, { sharp: true, w: 2, lc: C.ink, seed: seed + 1 }); shp(c, R4(-90, 15, 50, 36), C.gold, { sharp: true, w: 3, lc: C.ink, seed: seed + 2 }); c.restore(); }
function cushion(c, x, y, w, fill, T, seed) { c.save(); c.translate(x, y); shp(c, blob(0, 0, w / 2, 90, seed, { n: 30, amp: .05 }), C.lav, { w: 6, lc: C.ink, seed, hatch: shade(C.lav, .6), hal: .25 });
  for (let k = 0; k < 6; k++) { const g = pr(T, fill + k * .25, .35, easeOutBack); if (g <= 0) continue; const xx = -w / 2 + 60 + k * (w - 120) / 5; c.save(); c.translate(xx, -10); c.scale(g, g); shp(c, R4(-34, -34, 68, 68), C.gold, { sharp: true, w: 4, lc: C.ink, seed: seed + 10 + k }); tx(c, '' + (k + 1), 0, 2, { size: 34, f: 'ui', col: C.ink }); c.restore(); }
  c.restore(); }

// ================= escenas =================
// 1 · Gancho: «¿TE ALCANZA JUSTO?» balanza nivelada → cae una moneda «IMPREVISTO» y se va al lado de los gastos → «NO TE ALCANZA»
if (has('gancho')) { const s = 'gancho', t_j = As(s, 'alcanza justo,'), t_n = As(s, 'no te alcanza.');
  hit(.05, 8, 'stamp'); hit(t_j + .2, 8, 'ping'); hit(t_n + .2, 18, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_n, 960], [t_n + .6, 930]]), key(T, [[0, 1.0], [t_n, 1.0], [t_n + .6, 1.06]]) + .01 * Math.sin(L * 1.3));
    tx(c, '¿TE ALCANZA', 540, 190, { size: 104, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, 'JUSTO?', 540, 310, { size: 112, col: C.goldD, sh: C.ink });
    const drop = pr(T, t_n - .5, .5, easeIO), ang = .2 * pr(T, t_n - .05, .5, easeOutBack);
    scale(c, 540, 560, ang, T);
    if (T > t_n - .5 && T < t_n + .2) coinD(c, 840, lerp(380, 680, drop), 44, 7050, '!');
    pill(c, 'IMPREVISTO', 840, 420, { size: 34, f: 'ui', sc: pb(T, t_n - .6), col: '#FFB4A6' });
    stamp(c, 'NO TE ALCANZA', 540, 1170, T, t_n + .15, { size: 66, col: C.red, rot: -.04 });
    person(c, 160, 1560, .6, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_n ? 'o' : 'smile', brow: T > t_n ? 1 : 0, sweat: T > t_n + .2 ? T : 0 });
  }); }

// 2 · TikTok · Ganar poco ≠ vivir al día: el mes completo y un rayo que lo desordena
if (has('diferencia')) { const s = 'diferencia', t_g = As(s, 'ganar poco'), t_v = As(s, 'Vivir al día es'), t_u = As(s, 'un solo gasto inesperado'), t_d = As(s, 'todo el mes.');
  hit(t_g + .1, 6, 'ping'); hit(t_v + .1, 8, 'ping'); hit(t_u + .2, 14, 'impact'); hit(t_d + .1, 12, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    pill(c, 'GANAR POCO', 290, 250, { size: 44, f: 'ui', sc: pb(T, t_g), col: C.lav }); tx(c, '≠', 540, 255, { size: 110, col: C.red, sc: pb(T, t_g + .5) }); pill(c, 'VIVIR AL DÍA', 790, 250, { size: 44, f: 'ui', sc: pb(T, t_g + .8), col: '#FFB4A6' });
    tag(c, 'UN MES', 540, 420, { size: 30, bg: C.paper, sc: pb(T, sec(s).t0 + .1) });
    const hitd = 11; for (let k = 0; k < 30; k++) { const x = 130 + (k % 6) * 140, y = 500 + Math.floor(k / 6) * 120, g = pr(T, sec(s).t0 + .1 + k * .02, .3);
      if (g <= 0) continue; const shake = T > t_u ? Math.sin(T * 30 + k) * 6 * Math.max(0, 1 - (T - t_u) / 1.2) : 0, red = T > t_d && k >= hitd;
      c.save(); c.globalAlpha = g; shp(c, R4(x - 55 + shake, y - 45, 110, 90), red ? '#FFD3CB' : C.paper, { sharp: true, w: 3, lc: C.ink, seed: 7100 + k }); tx(c, '' + (k + 1), x + shake, y + 2, { size: 30, f: 'ui', col: red ? C.red : C.ink }); c.restore(); }
    if (T > t_u) { const p = pr(T, t_u, .3); ln(c, [[700, 380], [610, 620], [680, 620], [570, 880]], { w: 12, col: C.gold, p, straight: true, seed: 7140 }); }
    stamp(c, 'TODO EL MES, DESORDENADO', 540, 1170, T, t_d + .1, { size: 44, col: C.red, rot: -.03 });
    person(c, 960, 1560, .55, { seed: 7, shirt: '#3B4466', flip: true, ...idle(T), look: -1, mouth: T > t_u ? 'o' : 'flat', brow: T > t_u ? 1 : 0, sweat: T > t_u ? T : 0 });
  }); }

// 3 · TikTok · Imprevistos: celular dañado, cita médica, arreglo de la moto → el sueldo llega, pero ya está repartido en sobres
if (has('imprevistos')) { const s = 'imprevistos', t_c = As(s, 'Se daña el celular,'), t_m = As(s, 'una cita médica,'), t_a = As(s, 'el arreglo de la moto.'), t_e = As(s, 'La plata sí entró,'), t_y = As(s, 'ya estaba comprometida');
  hit(t_c + .1, 10, 'impact'); hit(t_m + .1, 10, 'impact'); hit(t_a + .1, 10, 'impact'); hit(t_e + .1, 8, 'ping'); hit(t_y + .2, 16, 'stamp');
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_y, 1.0], [t_y + .6, 1.04]]) + .012 * Math.sin(L));
    tx(c, 'IMPREVISTOS', 540, 200, { size: 104, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    const fall = (t, x, f) => { const u = pr(T, t - .2, .45, easeOutBack); if (u <= 0) return; c.save(); c.translate(x, lerp(-200, 470, u)); f(); c.restore(); };
    fall(t_c, 230, () => phone(c, 0, 0, T, 7200)); fall(t_m, 540, () => medic(c, 0, 0, 7210)); fall(t_a, 850, () => moto(c, 0, 20, 7220));
    if (T > t_e - .2) { const u = pr(T, t_e - .2, .5, easeOutBack); envelope(c, 540, lerp(1400, 800, u), 1.15, 'SUELDO', C.goldL, 7230);
      ['ARRIENDO', 'CUOTAS', 'MERCADO', 'SERVICIOS'].forEach((w, k) => { const g = pr(T, t_e + .4 + k * .2, .45, easeOutBack); if (g <= 0) return; const tx0 = 160 + k * 253;
        arrow(c, [540, 880], [tx0, 1010], g, { col: C.goldD, bend: 20, seed: 7240 + k }); tag(c, w, tx0, 1050, { size: 28, bg: C.paper, sc: g, rot: (k - 1.5) * .04 }); }); }
    stamp(c, 'YA ESTABA COMPROMETIDA', 540, 1220, T, t_y + .2, { size: 48, col: C.red, rot: -.03 });
    person(c, 130, 1560, .55, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_c ? 'o' : 'flat', brow: T > t_c ? 1 : 0, sweat: T > t_m ? T : 0, armR: [2.2, .4] });
  }); }

// 4 · El ejemplo: Ana (mínimo $1.750.905, le sobran $100.000/mes) vs. Bruno ($6.000.000, no le sobra nada)
if (has('ejemplo')) { const s = 'ejemplo', t_a = As(s, 'Ana gana'), t_s = As(s, 'le sobran'), t_b = As(s, 'Bruno gana seis millones'), t_n = As(s, 'no le sobra nada');
  const t_r = TK ? As(s, 'entre arriendo, carro y tarjetas,') : null, t_i = TK ? null : As(s, 'imprevisto de cuatrocientos mil.');
  hit(t_a + .1, 8, 'ping'); hit(t_s + .2, 10, 'impact'); hit(t_b + .2, 10, 'impact'); hit(t_n + .2, 16, 'stamp'); if (t_i) hit(t_i + .2, 14, 'impact');
  scene(s, TK ? 'iris' : 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L)); tx(c, 'ANA Y BRUNO', 540, 210, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) }); hipo(c, 320);
    // Ana
    person(c, 270, 1080, .95, { seed: 3, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_s ? 'smile' : 'flat', armR: T > t_s ? [2.0, .5] : [.3, .2] });
    pill(c, TK ? cop(1750905) : 'SALARIO MÍNIMO', 270, 450, { size: 38, f: 'ui', sc: pb(T, t_a + .2) }); tx(c, 'ANA', 270, 1150, { size: 44, f: 'ui', col: C.goldD });
    pill(c, 'LE SOBRAN ' + cop(100000) + '/MES', 270, 1240, { size: 30, f: 'ui', sc: pb(T, t_s + .3), col: '#9FE3B6' });
    // Bruno
    person(c, 810, 1080, .95, { seed: 8, shirt: C.navy, flip: true, ...idle(T, 1), look: -1, mouth: T > t_n ? 'flat' : 'smile', brow: T > t_n ? -1 : 0 });
    pill(c, cop(6000000), 810, 450, { size: 44, f: 'ui', sc: pb(T, t_b + .2) }); tx(c, 'BRUNO', 810, 1150, { size: 44, f: 'ui', col: C.navy });
    if (t_r) ['ARRIENDO', 'CARRO', 'TARJETAS'].forEach((w, k) => tag(c, w, 810 + (k - 1) * 70, 560 + k * 62, { size: 26, bg: '#FFD3CB', sc: pb(T, t_r + k * .35), rot: (k - 1) * .05 }));
    stamp(c, 'LE SOBRAN $0', 810, 1240, T, t_n + .2, { size: 40, col: C.red, rot: .04 });
    if (t_i) { const u = pr(T, t_i - .1, .5, easeOutBack); if (u > 0) { c.save(); c.translate(540, lerp(-100, 820, u)); c.rotate(Math.sin(T * 6) * .05); shp(c, R4(-140, -50, 280, 100), C.red, { w: 5, lc: C.ink, seed: 7300 }); tx(c, cop(400000), 0, 3, { size: 46, f: 'ui', col: C.paper }); c.restore(); } }
  }); }

// 5 · El giro: llega el imprevisto de $400.000 → Ana lo paga con 4 meses de ahorro; Bruno lo pasa a la tarjeta e intereses
if (has('giro')) { const s = 'giro', t_i = TK ? As(s, 'Llega un imprevisto') : sec(s).t0 - .4, t_a = As(s, 'Ana lo paga'), t_4 = As(s, 'cuatro meses de ahorro.'), t_b = As(s, 'Bruno, que gana más del triple,'), t_f = TK ? As(s, 'termina pagando intereses.') : As(s, 'termina endeudado.');
  hit(t_i + .2, 14, 'impact'); hit(t_a + .1, 8, 'ping'); hit(t_4 + .2, 12, 'impact'); hit(t_b + .2, 8, 'ping'); hit(t_f + .2, 18, 'stamp');
  scene(s, TK ? 'wipe' : 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 950], [t_f, 950], [t_f + .6, 990]]), key(T, [[0, 1.0], [t_f, 1.0], [t_f + .6, 1.05]]) + .012 * Math.sin(L)); hipo(c, 320);
    tx(c, 'LLEGA EL IMPREVISTO', 540, 210, { size: 76, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    const u = pr(T, t_i, .5, easeOutBack); if (u > 0) { c.save(); c.translate(540, lerp(-100, 470, u)); c.rotate(Math.sin(T * 6) * .04); shp(c, R4(-150, -55, 300, 110), C.red, { w: 5, lc: C.ink, seed: 7300 }); tx(c, cop(400000), 0, 3, { size: 50, f: 'ui', col: C.paper }); c.restore(); }
    // Ana: 4 monedas de $100.000 que vuelan a pagar
    for (let k = 0; k < 4; k++) { const g = pr(T, t_a + .2 + k * .25, .5, easeOutBack); if (g <= 0) continue; const fl = pr(T, t_4 + .4, .5, easeIO); coinD(c, lerp(150 + k * 70, 480, fl), lerp(780, 520, fl), 40 * g, 7310 + k); }
    tag(c, '4 MESES × ' + cop(100000), 280, 900, { size: 30, bg: C.goldL, sc: pb(T, t_4) });
    stamp(c, 'PAGADO ✓', 280, 1000, T, t_4 + .8, { size: 56, col: '#2E8B57', rot: -.05 });
    person(c, 280, 1500, .7, { seed: 3, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_4 ? 'grin' : 'flat', armR: T > t_4 + .8 ? [2.6, .3] : [.4, .2] });
    // Bruno: tarjeta → intereses
    const g2 = pr(T, t_b + .3, .5, easeOutBack); if (g2 > 0) card(c, 800, 760, g2, 7330);
    tag(c, 'GANA MÁS DEL TRIPLE', 800, 900, { size: 30, bg: C.paper, sc: pb(T, t_b + .2) });
    stamp(c, TK ? '+ INTERESES' : 'ENDEUDADO', 800, 1000, T, t_f + .2, { size: 56, col: C.red, rot: .05 });
    person(c, 800, 1500, .7, { seed: 8, shirt: C.navy, flip: true, ...idle(T, 1), look: -1, mouth: T > t_f ? 'o' : 'flat', brow: T > t_f ? 1 : 0, sweat: T > t_f ? T : 0 });
  }); }

// 6 · TikTok · Lección: el sueldo dice cuánto entra; lo que te queda dice cuánto aguantas
if (has('leccion')) { const s = 'leccion', t_s = As(s, 'El sueldo dice'), t_q = As(s, 'Lo que te queda'), t_a = As(s, 'cuánto aguantas.');
  hit(t_s + .1, 8, 'ping'); hit(t_q + .1, 10, 'impact'); hit(t_a + .1, 16, 'stamp');
  scene(s, 'news', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    envelope(c, 300, 560, 1.1 * pb(T, t_s), 'SUELDO', C.goldL, 7400); tx(c, '= CUÁNTO ENTRA', 300, 760, { size: 40, f: 'ui', al: pr(T, t_s + .4, .3) });
    // tanque de aguante que se llena
    const lv = pr(T, t_q + .3, 1.4, easeIO); shp(c, R4(660, 380, 240, 360), C.paper, { sharp: true, w: 6, lc: C.ink, seed: 7410 }); if (lv > 0) shp(c, R4(672, 728 - 330 * lv * .7, 216, 330 * lv * .7), C.lav, { sharp: true, w: 3, lc: C.ink, seed: 7411, hatch: shade(C.lav, .6), hal: .3 });
    tx(c, 'LO QUE TE QUEDA', 780, 340, { size: 32, f: 'ui', al: pr(T, t_q, .3) }); tx(c, '= CUÁNTO AGUANTAS', 780, 800, { size: 40, f: 'ui', col: C.vio, al: pr(T, t_a, .3) });
    stamp(c, 'NO ES CUÁNTO GANAS', 540, 1080, T, t_a + .3, { size: 60, col: C.goldD, rot: -.03 });
    person(c, 540, 1560, .6, { seed: 12, shirt: C.vio, ...idle(T), look: 1, mouth: 'smile', armR: [2.0, .5] });
  }); }

// 7 · TikTok · El colchón antes de invertir: 3 a 6 meses de gastos básicos (BBVA), en algo que puedas sacar rápido
if (has('colchon')) { const s = 'colchon', t_i = As(s, 'antes de invertir,'), t_c = As(s, 'un colchón.'), t_b = As(s, 'BBVA,'), t_3 = As(s, 'entre tres y seis meses'), t_r = As(s, 'sacar rápido.');
  hit(t_i + .1, 8, 'ping'); hit(t_c + .2, 14, 'impact'); hit(t_b + .1, 6, 'ping'); hit(t_3 + .2, 12, 'stamp'); hit(t_r + .1, 8, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_c, 1.0], [t_c + .6, 1.05]]) + .012 * Math.sin(L));
    tx(c, 'PRIMERO, UN COLCHÓN', 540, 210, { size: 80, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    tag(c, 'ANTES DE INVERTIR', 540, 320, { size: 32, bg: C.goldL, sc: pb(T, t_i) });
    cushion(c, 540, 720, 860, t_3 + .2, T, 7500);
    pill(c, '3 A 6 MESES DE GASTOS BÁSICOS', 540, 920, { size: 42, f: 'ui', sc: pb(T, t_3 + .1) });
    tag(c, 'EN ALGO QUE PUEDAS SACAR RÁPIDO', 540, 1060, { size: 30, bg: C.paper, sc: pb(T, t_r) });
    person(c, 540, 600, .5 * pb(T, t_c), { seed: 3, shirt: C.gold, ...idle(T), look: 1, mouth: 'grin', armR: [2.4, .4], armL: [2.4, .4] });
    src(c, 'Recomendación de BBVA (La República, 7 may. 2026) · referencia, no regla');
  }); }

// 8 · Cierre (noche): si mañana pasa algo, ¿cuántos meses aguantarías? · haz tu cuenta
if (has('cierre')) { const s = 'cierre', t_q = TK ? As(s, '¿cuántos meses aguantarías?') : As(s, 'es cuánto aguantas'), t_h = As(s, 'Haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  const t_e = TK ? As(s, 'Si mañana pasa algo,') : As(s, 'No es cuánto entra:');
  hit(t_e + .1, 8, 'ping'); hit(t_q + .1, 12, 'stamp'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, TK ? 'iris' : 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, TK ? 'SI MAÑANA PASA ALGO,' : 'NO ES CUÁNTO ENTRA:', 540, 300, { size: 64, col: C.chalk, sh: C.goldD, clipP: pr(T, t_e, .6, easeIO), max: 1000 });
    tx(c, TK ? '¿CUÁNTOS MESES AGUANTARÍAS?' : 'ES CUÁNTO AGUANTAS', 540, 410, { size: 60, col: C.lav, sh: null, clipP: pr(T, t_q, .6, easeIO), max: 1000 });
    for (let k = 0; k < 6; k++) { const g = pr(T, t_q + .3 + k * .12, .35, easeOutBack); if (g <= 0) continue; c.save(); c.translate(240 + k * 120, 640); c.scale(g, g); shp(c, R4(-46, -46, 92, 92), k < 3 ? C.gold : '#2B3352', { sharp: true, w: 3, lc: C.chalk, seed: 7600 + k }); tx(c, '' + (k + 1), 0, 2, { size: 40, f: 'ui', col: k < 3 ? C.ink : C.chalk }); c.restore(); }
    tx(c, 'HAZ TU CUENTA', 540, 960, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada: la balanza que se cae con «NO TE ALCANZA» =================
function cover(c) { const t = As('gancho', 'no te alcanza.'); drawScene(c, SC[0], Math.min(t + 1.3, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('te-alcanza-justo', cover);
