// TITÁN · «El 4x1000: el cobro que casi nadie revisa» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js) · línea B · plata del día a día
// GMF 4 por mil en retiros y transferencias. Exención: hasta 350 UVT al mes en cuentas de ahorro (y depósitos electrónicos / tarjetas prepago) de una sola persona
// (ET art. 879 num. 1 y art. 881-1; DIAN Concepto 005976 de 2024). UVT 2026 $52.374 (Res. DIAN 000238 de 2025) → $18.330.900. No aplica a corrientes ni a cuentas con dos titulares (Gerencie).
// EJEMPLO HIPOTÉTICO: $3.000.000 al mes sin exención → $12.000 al mes, $144.000 al año.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
function src(c, s, y = 1312) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }
const GRN = '#7FBF8E', GRND = '#3E7A52';

// ---------- piezas ----------
function atm(c, x, y, s, T) { c.save(); c.translate(x, y); c.scale(s, s);
  shp(c, R4(-170, -330, 340, 560), '#3B4466', { w: 5, lc: C.ink, seed: 7000, hatch: shade('#3B4466', .6), hal: .2 });
  shp(c, R4(-120, -280, 240, 150), '#DCEFF5', { sharp: true, w: 4, lc: C.ink, seed: 7001 }); tx(c, 'CAJERO', 0, -205, { size: 34, f: 'ui', col: C.navy, sh: null });
  for (let i = 0; i < 9; i++) shp(c, R4(-75 + (i % 3) * 55, -90 + Math.floor(i / 3) * 45, 40, 32), C.paper, { sharp: true, w: 3, lc: C.ink, seed: 7010 + i });
  shp(c, R4(-110, 70, 220, 26), C.ink, { sharp: true, line: false }); c.restore(); }
function bill(c, x, y, s, rot, seed, o = {}) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  shp(c, R4(-120, -55, 240, 110), o.col || '#E7C9A6', { sharp: true, w: 4, lc: C.ink, seed });
  shp(c, blob(0, 0, 36, 36, seed + 1, { n: 16, amp: .03 }), C.paper, { w: 3, lc: C.ink, seed: seed + 1 });
  tx(c, o.t || '$', 0, 2, { size: 30, f: 'ui', col: C.ink, sh: null }); if (o.bite) { c.fillStyle = C.paper; c.beginPath(); c.arc(120, -55, 34 * o.bite, 0, TAU); c.fill(); }
  c.restore(); }
function coin(c, x, y, r = 22, lbl) { c.fillStyle = C.gold; c.beginPath(); c.ellipse(x, y, r, r * .9, 0, 0, TAU); c.fill(); c.strokeStyle = C.ink; c.lineWidth = 3; c.stroke(); if (lbl) tx(c, lbl, x, y + 1, { size: r * .9, f: 'ui', col: C.ink, sh: null }); }
function scissors(c, x, y, s, T, open) { c.save(); c.translate(x, y); c.scale(s, s); const a = .35 * open;
  for (const sd of [-1, 1]) { c.save(); c.rotate(sd * a); shp(c, [[0, -8], [140, -4 * sd], [140, 4 * sd], [0, 8]], '#C9CCD4', { w: 4, lc: C.ink, seed: 7100 + sd }); shp(c, blob(-40, sd * 24, 26, 18, 7110 + sd, { n: 14 }), C.red, { w: 4, lc: C.ink, seed: 7110 + sd }); c.restore(); }
  c.restore(); }
function receipt(c, x, y, s, rot, rows, k = 1, o = {}) { if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(rot); c.scale(s * k, s * k);
  const h = 120 + rows.length * 56; shp(c, R4(-270, -h / 2, 540, h), C.paper, { sharp: true, w: 5, lc: C.ink, seed: o.seed ?? 7200 });
  tx(c, o.title || 'EXTRACTO', 0, -h / 2 + 42, { size: 34, f: 'ui', col: C.ink, sh: null });
  rows.forEach(([a, b, hi], i) => { const yy = -h / 2 + 100 + i * 56; if (hi) { c.save(); c.globalAlpha = .55; c.fillStyle = '#FFE58A'; c.fillRect(-255, yy - 22, 510 * hi, 44); c.restore(); }
    tx(c, a, -245, yy, { size: 22, f: 'ui', align: 'left', col: C.ink, sh: null }); tx(c, b, 245, yy, { size: 24, f: 'ui', align: 'right', col: hi ? C.red : C.ink, sh: null }); });
  c.restore(); }
function shield(c, x, y, s, T, k = 1) { if (k <= 0) return; c.save(); c.translate(x, y); c.scale(s * k, s * k);
  shp(c, [[0, -150], [130, -100], [115, 60], [0, 150], [-115, 60], [-130, -100]], GRN, { w: 6, lc: C.ink, seed: 7300, hatch: shade(GRN, .6), hal: .2 });
  ln(c, [[-50, 0], [-10, 45], [60, -50]], { w: 14, col: C.paper, seed: 7301 }); c.restore(); }
function acct(c, x, y, s, rot, t1, t2, col, k = 1, cross = 0) { if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(rot); c.scale(s * k, s * k);
  shp(c, R4(-200, -110, 400, 220), col, { w: 5, lc: C.ink, seed: 7400 + t1.length }); shp(c, R4(-200, -110, 400, 60), C.navy, { sharp: true, w: 4, lc: C.ink, seed: 7410 + t1.length });
  tx(c, t1, 0, -80, { size: 30, f: 'ui', col: C.paper, sh: null, max: 370 }); tx(c, t2, 0, 30, { size: 30, f: 'ui', col: C.ink, sh: null, max: 370 });
  if (cross > 0) { ln(c, [[-170, -80], [-170 + 340 * cross, 80]], { w: 14, col: C.red, straight: true, seed: 7420 }); ln(c, [[-170, 80], [-170 + 340 * cross, -80]], { w: 14, col: C.red, straight: true, seed: 7421 }); }
  c.restore(); }
function hipo(c, y = 330, k = 1) { tag(c, 'EJEMPLO HIPOTÉTICO', 540, y, { size: 26, bg: C.paper, sc: k }); }

// ================= escenas =================
// 1 · Gancho: sacas plata del cajero y unas tijeras le cortan un pedacito al billete
if (has('gancho')) { const s = 'gancho', t_s = As(s, 'sacas plata'), t_i = As(s, 'un impuesto'), t_4 = As(s, 'cuatro por mil.');
  hit(.05, 8, 'stamp'); hit(t_i + .2, 12, 'impact'); hit(t_4 + .1, 16, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_4, 960], [t_4 + .6, 930]]), key(T, [[0, 1.0], [t_4, 1.0], [t_4 + .6, 1.06]]) + .01 * Math.sin(L * 1.3));
    tx(c, 'EL COBRO QUE', 540, 190, { size: 90, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, 'CASI NADIE REVISA', 540, 295, { size: 86, col: C.goldD, sh: C.ink, sc: pb(T, .2), max: 1000 });
    atm(c, 300, 900, 1.0, T);
    const u = pr(T, Math.min(t_s, .6), .9, easeOutBack); const bite = pr(T, t_i + .2, .4);
    bill(c, lerp(300, 640, u), lerp(980, 760, u), 1.1, -.08 * u, 7500, { bite });
    if (T > t_i - .2 && T < t_i + 1.6) scissors(c, 840, 620, 1.0, T, .5 + .5 * Math.sin(T * 14));
    stamp(c, '4x1000', 760, 520, T, t_4 + .1, { size: 96, col: C.red, rot: -.06 });
    person(c, 820, 1420, .85, { seed: 4, shirt: C.gold, flip: true, ...idle(T), look: -1, mouth: T > t_i ? 'o' : 'smile', brow: T > t_i ? 1 : 0 });
  }); }

// 2 · TikTok · $4 por cada $1.000: parece poquito, pero suma
if (has('que')) { const s = 'que', t_4 = As(s, 'cuatro pesos'), t_r = As(s, 'retiras o transfieres.'), t_p = As(s, 'Parece poquito,'), t_s = As(s, 'se va sumando');
  hit(t_4 + .1, 12, 'impact'); hit(t_r + .1, 8, 'ping'); hit(t_p + .1, 8, 'ping'); hit(t_s + .1, 12, 'impact');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_s, 1.0], [t_s + .5, 1.05]]) + .012 * Math.sin(L));
    tx(c, '¿CUÁNTO ES?', 540, 200, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    pill(c, '$4 POR CADA $1.000', 540, 330, { size: 52, f: 'ui', col: C.gold, sc: pb(T, t_4) });
    bill(c, 300, 620, 1.3, -.05, 7600, { t: '$1.000' });
    for (let k = 0; k < 4; k++) { const u = pr(T, t_4 + .3 + k * .25, .5, easeOutBack); if (u <= 0) continue; coin(c, lerp(300, 660 + k * 60, u), lerp(620, 600, u) - Math.sin(u * Math.PI) * 120, 30, '$1'); }
    tag(c, 'AL RETIRAR O TRANSFERIR', 540, 820, { size: 30, bg: C.paper, sc: pb(T, t_r) });
    // la pila de monedas que crece
    const n = Math.floor(14 * pr(T, t_s, 2.2)); for (let k = 0; k < n; k++) coin(c, 760 + (k % 2) * 8, 1150 - k * 16, 30);
    if (n > 0) tag(c, 'SE VA SUMANDO', 760, 1200, { size: 28, bg: '#FFD3CB', sc: pb(T, t_s) });
    person(c, 280, 1430, .8, { seed: 9, shirt: C.vio, ...idle(T), look: 1, mouth: T > t_s ? 'o' : 'flat', brow: T > t_s ? 1 : 0 });
  }); }

// 3 · Ejemplo hipotético: $3.000.000 al mes → $12.000 al mes → $144.000 al año
if (has('ejemplo')) { const s = 'ejemplo', t_e = As(s, 'Ejemplo hipotético:'), t_3 = As(s, 'tres millones'), t_12 = As(s, 'doce mil pesos'), t_a = As(s, 'ciento cuarenta y cuatro mil');
  hit(t_e + .1, 12, 'stamp'); hit(t_3 + .1, 8, 'ping'); hit(t_12 + .2, 14, 'impact'); hit(t_a + .3, 18, 'stamp');
  scene(s, TK ? 'iris' : 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 940], [t_a, 940], [t_a + .6, 980]]), key(T, [[0, 1.0], [t_a, 1.0], [t_a + .6, 1.06]]) + .012 * Math.sin(L));
    tx(c, 'CUENTA SIN EXENCIÓN', 540, 200, { size: 80, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 }); hipo(c, 310);
    receipt(c, 290, 600, .9, -.03, [['MOVIDO EN EL MES', '$3.000.000', 0], ['GMF 4x1000', '−$12.000', pr(T, t_12, .5)]], pb(T, sec(s).t0 + .2), { seed: 7700 });
    // 12 meses que caen como hojas de calendario
    const MS = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    for (let k = 0; k < 12; k++) { const u = pr(T, t_12 + .5 + k * .12, .4, easeOutBack); if (u <= 0) continue; const x = 640 + (k % 4) * 100, y = 520 + Math.floor(k / 4) * 120;
      c.save(); c.translate(x, y); c.scale(u, u); shp(c, R4(-42, -46, 84, 92), C.paper, { sharp: true, w: 3, lc: C.ink, seed: 7710 + k }); shp(c, R4(-42, -46, 84, 26), C.red, { sharp: true, w: 3, lc: C.ink, seed: 7730 + k });
      tx(c, MS[k], 0, -33, { size: 16, f: 'ui', col: C.paper, sh: null }); tx(c, '12 MIL', 0, 12, { size: 20, f: 'ui', col: C.ink, sh: null }); c.restore(); }
    if (T > t_a) { pill(c, '$144.000 AL AÑO', 540, 1000, { size: 66, f: 'ui', col: '#FFB4A6', sc: pb(T, t_a + .2) }); burst(c, 540, 1000, T, t_a + .3, { R: 200, col: C.red }); }
    tag(c, 'SOLO POR MOVER TU PROPIA PLATA', 540, 1130, { size: 28, bg: C.paper, sc: pb(T, t_a + 1.2) });
    person(c, 950, 1440, .6, { seed: 8, shirt: C.lav, flip: true, ...idle(T), look: -1, mouth: T > t_a ? 'o' : 'flat', brow: T > t_12 ? 1 : 0, sweat: T > t_a ? T : 0 });
  }); }

// 4 · La exención: cuentas de ahorro de una sola persona, hasta 350 UVT al mes (≈ $18,3 millones en 2026). Short: + el «ojo».
if (has('exencion')) { const s = 'exencion', t_b = TK ? As(s, 'buena noticia:') : As(s, 'Pero las'), t_c = As(s, 'cuentas de ahorro'), t_u = As(s, 'trescientas cincuenta'), t_m = As(s, 'dieciocho millones');
  const t_o = TK ? null : As(s, 'Ojo:'), t_co = TK ? null : As(s, 'cuentas corrientes'), t_d = TK ? null : As(s, 'dos titulares.');
  hit(t_b + .1, 10, 'ping'); hit(t_c + .1, 10, 'impact'); hit(t_u + .2, 12, 'stamp'); hit(t_m + .2, 16, 'impact'); if (t_o) { hit(t_o + .1, 12, 'stamp'); hit(t_co + .2, 10, 'impact'); hit(t_d + .2, 10, 'impact'); }
  const tSw = t_o ? t_o - .2 : 999;
  scene(s, TK ? 'drop' : 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, (T < tSw ? key(T, [[sec(s).t0, 1.0], [t_m, 1.0], [t_m + .6, 1.05]]) : key(T, [[tSw, 1.06], [tSw + .5, 1.0]])) + .012 * Math.sin(L));
    if (T < tSw) {
      tx(c, 'LA EXENCIÓN', 540, 200, { size: 100, col: GRND, sh: C.ink, sc: pb(T, sec(s).t0 - .3) });
      shield(c, 800, 600, 1.0, T, pb(T, t_b));
      acct(c, 330, 600, 1.0, -.03, 'CUENTA DE AHORROS', 'UNA SOLA PERSONA', C.goldL, pb(T, t_c - .1));
      pill(c, 'HASTA 350 UVT AL MES', 540, 880, { size: 52, f: 'ui', col: C.gold, sc: pb(T, t_u) });
      pill(c, '≈ $18,3 MILLONES EN 2026', 540, 1000, { size: 46, f: 'ui', col: GRN, sc: pb(T, t_m) }); burst(c, 540, 1000, T, t_m + .2, { R: 180 });
      src(c, 'Estatuto Tributario art. 879 y 881-1 · UVT 2026: $52.374 (Res. DIAN 000238 de 2025) → 350 UVT = $18.330.900', 1100);
      person(c, 540, 1460, .75, { seed: 5, shirt: C.gold, ...idle(T), mouth: T > t_m ? 'grin' : 'smile', armL: T > t_m ? [2.6, .3] : undefined, armR: T > t_m ? [2.6, .3] : undefined });
    } else {
      tx(c, 'OJO: NO APLICA A', 540, 200, { size: 90, col: C.red, sh: C.ink, sc: pb(T, tSw), max: 1000 });
      acct(c, 540, 520, 1.0, -.03, 'CUENTA CORRIENTE', 'PAGA EN CUALQUIER RETIRO', C.paper, pb(T, t_co - .1), pr(T, t_co + .4, .4));
      acct(c, 540, 820, 1.0, .03, 'CUENTA CONJUNTA', 'DOS TITULARES', C.paper, pb(T, t_d - .1), pr(T, t_d + .4, .4));
      person(c, 540, 1440, .75, { seed: 6, shirt: C.navy, ...idle(T), look: 1, mouth: 'o', brow: 1 });
      src(c, 'Gerencie (actualizado 3 oct. 2026) · DIAN, Concepto 005976 de 2024', 1060);
    }
  }); }

// 5 · TikTok · Ojo: corrientes y cuentas con dos titulares no tienen la exención; lo que pase del tope, paga
if (has('ojo')) { const s = 'ojo', t_c = As(s, 'cuentas corrientes'), t_d = As(s, 'dos titulares.'), t_t = As(s, 'del tope'), t_p = As(s, 'sí paga.');
  hit(t_c + .2, 12, 'impact'); hit(t_d + .2, 12, 'impact'); hit(t_t + .1, 8, 'ping'); hit(t_p + .1, 16, 'stamp');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_p, 1.0], [t_p + .5, 1.05]]) + .012 * Math.sin(L));
    tx(c, 'OJO: NO APLICA A', 540, 200, { size: 90, col: C.red, sh: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    acct(c, 290, 520, .85, -.04, 'CUENTA CORRIENTE', 'PAGA EN CUALQUIER RETIRO', C.paper, pb(T, sec(s).t0 + .1), pr(T, t_c + .4, .4));
    acct(c, 790, 520, .85, .04, 'CUENTA CONJUNTA', 'DOS TITULARES', C.paper, pb(T, t_d - .2), pr(T, t_d + .4, .4));
    // barra del tope mensual que se llena y se pasa
    const y = 880, g = pr(T, sec(s).t0 + .3, Math.max(1.4, t_t + .3 - sec(s).t0), easeIO); shp(c, R4(140, y - 40, 800, 80), C.paper, { sharp: true, w: 5, lc: C.ink, seed: 7800 });
    shp(c, R4(140, y - 40, 680 * Math.min(1, g / .85), 80), GRN, { sharp: true, line: false }); if (g > .85) shp(c, R4(820, y - 40, 120 * (g - .85) / .15, 80), C.red, { sharp: true, line: false });
    ln(c, [[820, y - 70], [820, y + 70]], { w: 6, col: C.ink, straight: true, seed: 7801 }); tx(c, 'TOPE 350 UVT', 820, y - 100, { size: 24, f: 'ui' });
    stamp(c, 'LO QUE PASE DEL TOPE, PAGA', 540, 1050, T, t_p + .1, { size: 50, col: C.red, rot: -.03 });
    person(c, 540, 1480, .7, { seed: 6, shirt: C.navy, ...idle(T), look: 1, mouth: 'o', brow: 1 });
    src(c, 'Gerencie (actualizado 3 oct. 2026) · DIAN, Concepto 005976 de 2024', 1150);
  }); }

// 6 · Cierre (noche): revisa tu extracto y pregúntale a tu banco
if (has('cierre')) { const s = 'cierre', t_r = As(s, TK ? 'Revisa tu extracto.' : 'Revisa tu extracto,'), t_b = As(s, 'pregúntale a tu banco'), t_h = As(s, 'Haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_r + .1, 10, 'ping'); hit(t_b + .1, 12, 'stamp'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 420 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, 'REVISA TU EXTRACTO', 540, 280, { size: 72, col: C.chalk, sh: C.goldD, clipP: pr(T, t_r - .2, .6, easeIO), max: 1000 });
    tx(c, '¿TE COBRAN SIN PASAR EL TOPE?', 540, 380, { size: 50, col: C.lav, sh: null, clipP: pr(T, t_r + .6, .6, easeIO), max: 1000 });
    receipt(c, 540, 700, 1.0, -.03, [['TRANSFERENCIA', '−$500.000', 0], ['GMF 4x1000', '−$2.000', pr(T, t_r + .4, .6)], ['RETIRO CAJERO', '−$300.000', 0]], pb(T, sec(s).t0 + .2), { seed: 7900, title: 'TU EXTRACTO (EJEMPLO)' });
    // lupa sobre la línea del GMF
    if (T > t_r) { const lx = 560 + 20 * Math.sin(T * 2), ly = 700; c.save(); c.strokeStyle = C.gold; c.lineWidth = 12; c.beginPath(); c.arc(lx, ly, 90, 0, TAU); c.stroke(); ln(c, [[lx + 64, ly + 64], [lx + 150, ly + 150]], { w: 20, col: C.gold, straight: true, seed: 7910 }); c.restore(); }
    tag(c, 'PREGÚNTALE A TU BANCO', 540, 960, { size: 40, bg: C.goldL, sc: pb(T, t_b) });
    tx(c, 'HAZ TU CUENTA', 540, 1100, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada =================
function cover(c) { const t = As('gancho', 'cuatro por mil.'); drawScene(c, SC[0], Math.min(t + 1.0, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('cuatro-por-mil', cover);
