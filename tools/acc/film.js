// TITÁN · «¿Una sola acción o diversificado?» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js) · línea A (acciones, dato curioso)
// Top 10 del S&P 500 al 1 ene. 2000 (24/7 Wall St.). EJEMPLO HIPOTÉTICO con precios reales: USD 1.000 en dic. 1999 → oct. 2026, dividendos reinvertidos (tools/acc/calc.py, Yahoo Finance).
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const usd = v => 'USD ' + Math.round(v).toLocaleString('es-CO').replace(/,/g, '.');
// [nombre corto, valor hoy de USD 1.000, ganó al índice]
const TOP = [['MICROSOFT', 14729], ['GENERAL ELECTRIC', 2266], ['CISCO', 3055], ['WALMART', 8454], ['EXXON MOBIL', 10760], ['INTEL', 2813], ['CITIGROUP', 570], ['IBM', 4927], ['ORACLE', 5896], ['HOME DEPOT', 8411]];
const SPY = 8232;

// ---------- piezas ----------
function coCard(c, s, x, y, k, o = {}) { if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(o.rot ?? 0); c.scale(k, k); c.globalAlpha = o.al ?? 1;
  const w = 380, h = 120; shp(c, R4(-w / 2, -h / 2, w, h), o.bg || C.paper, { sharp: true, w: 5, lc: C.ink, seed: o.seed ?? 4100 });
  shp(c, R4(-w / 2 + 14, -h / 2 + 14, 40, 92), o.ac || C.gold, { sharp: true, w: 3, lc: C.ink, seed: (o.seed ?? 4100) + 1 });
  tx(c, s, 22, 4, { size: o.size || 34, f: 'ui', col: o.col || C.ink, max: w - 90 }); if (o.n) tx(c, o.n, -w / 2 + 34, 2, { size: 30, f: 'ui', col: C.ink }); c.restore(); }
function coin(c, x, y, r, seed) { shp(c, blob(x, y, r, r, seed, { n: 22, amp: .02 }), C.gold, { w: 4, lc: C.ink, seed }); tx(c, '$', x, y + 2, { size: r * 1.1, col: C.goldD, sh: null }); }
function hipo(c, y = 400) { tag(c, 'EJEMPLO HIPOTÉTICO · PRECIOS REALES', 540, y, { size: 26, bg: C.paper }); }
function src(c, s, y = 1530) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }
// barras de las 10 + línea del índice (ordenadas de mayor a menor)
function tenBars(c, T, t0, tLine, tWin, o = {}) { const S = TOP.map((r, i) => [...r, i]).sort((a, b) => b[1] - a[1]), Z = o.Z ?? 1250, Hm = o.H ?? 640, K = Hm / 15000, x0 = 95, bw = 76, gap = 14;
  ln(c, [[70, Z], [1010, Z]], { w: 6, straight: true, seed: 4150 });
  S.forEach(([n, v], k) => { const x = x0 + k * (bw + gap), g = pr(T, t0 + k * .08, .7, easeOutBack), win = v > SPY, col = T > tWin ? (win ? C.gold : C.red) : C.lav;
    if (g > .01) shp(c, R4(x, Z - v * K * g, bw, v * K * g), col, { sharp: true, w: 4, lc: C.ink, seed: 4160 + k, hatch: shade(col, .6), hal: .3 });
    c.save(); c.translate(x + bw / 2, Z + 16); c.rotate(-Math.PI / 3.2); tx(c, n, 0, 0, { size: 22, f: 'ui', align: 'right', al: pr(T, t0 + k * .08, .4) }); c.restore();
    if (g > .9 && (n === 'MICROSOFT' || n === 'CITIGROUP')) tx(c, usd(v).replace('USD ', ''), x + bw / 2, Z - v * K - 26, { size: 26, f: 'ui', col: n === 'CITIGROUP' ? C.red : C.goldD }); });
  const gl = pr(T, tLine, .6, easeIO); if (gl > 0) { const y = Z - SPY * K; c.save(); c.setLineDash([16, 10]); c.strokeStyle = C.navy; c.lineWidth = 6; c.beginPath(); c.moveTo(70, y); c.lineTo(70 + 940 * gl, y); c.stroke(); c.restore();
    pill(c, 'S&P 500: ' + usd(SPY), 760, y - 52, { size: 30, f: 'ui', sc: pb(T, tLine + .3) }); } }

// ================= escenas =================
// 1 · Gancho: las 10 más grandes del año 2000 caen en tarjetas; «hoy solo una sigue» → 9 se apagan y Microsoft brilla
if (has('gancho')) { const s = 'gancho', t_10 = As(s, 'diez empresas más grandes'), t_h = As(s, 'Hoy, solo una'), t_d = As(s, 'diez primeras.');
  hit(.05, 8, 'stamp'); hit(t_10 + .2, 8, 'ping'); hit(t_h + .1, 12, 'stamp'); hit(t_d + .2, 16, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_h, 960], [t_h + .7, 900]]), key(T, [[0, 1.0], [t_h, 1.0], [t_h + .7, 1.05]]) + .01 * Math.sin(L * 1.3));
    tx(c, 'LAS 10 MÁS GRANDES', 540, 200, { size: 92, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }), max: 1000 });
    tx(c, 'DE EE. UU. EN EL AÑO 2000', 540, 300, { size: 56, col: C.goldD, sh: C.ink, max: 1000 });
    const out = pr(T, t_h + .1, .6);
    TOP.forEach(([n], k) => { const col = k % 2, row = Math.floor(k / 2), x = 300 + col * 480, y0 = 440 + row * 130, ms = k === 0;
      const drop = pr(T, .15 + k * .12, .5, easeOutBack), y = lerp(-200, y0, drop) + (ms ? 0 : out * 30 * Math.sin(k)), rot = ms ? 0 : out * (k % 2 ? .12 : -.1);
      coCard(c, n, x - 30, y, drop > 0 ? (ms ? 1 + .06 * out : 1 - .22 * out) : 0, { n: String(k + 1), rot, al: ms ? 1 : 1 - out * .7, bg: ms && T > t_h ? C.goldL : C.paper, seed: 4100 + k * 3 });
      if (!ms && out > .5) { c.save(); c.globalAlpha = (out - .5) * 1.6; ln(c, [[x - 180, y], [x + 120, y]], { w: 8, col: C.red, straight: true, seed: 4130 + k }); c.restore(); } });
    if (T > t_h + .2) { const g = .5 + .5 * Math.sin(T * 5); c.save(); c.globalAlpha = .25 + .2 * g; c.strokeStyle = C.gold; c.lineWidth = 14; c.strokeRect(70, 370, 400, 140); c.restore(); }
    stamp(c, 'SOLO 1 SIGUE EN EL TOP 10', 540, 1130, T, t_d + .1, { size: 46, col: C.red, rot: -.04 });
    person(c, 900, 1520, .7, { seed: 8, shirt: C.lav, flip: true, ...idle(T), look: -1, mouth: T > t_h ? 'o' : 'smile', brow: T > t_h ? 1 : 0, armR: T > t_d ? [2.5, .5] : [.3, .2] });
    src(c, 'Top 10 del S&P 500 al 1 ene. 2000: 24/7 Wall St. · hoy: CompaniesMarketCap', 1560);
  }); }

// 2 · TikTok · ¿Una sola o todas? Dos personas: una abraza una tarjeta, otra carga una canasta llena
if (has('pregunta')) { const s = 'pregunta', t_1 = As(s, 'una sola acción,'), t_t = As(s, 'tenerlas todas?'), t_c = As(s, 'Hicimos la cuenta');
  hit(t_1 + .1, 8, 'ping'); hit(t_t + .1, 8, 'ping'); hit(t_c + .1, 14, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, '¿UNA SOLA ACCIÓN', 540, 220, { size: 84, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    tx(c, 'O TENERLAS TODAS?', 540, 320, { size: 84, col: C.goldD, sh: C.ink, sc: pb(T, t_t - .2), max: 1000 });
    coCard(c, '1 ACCIÓN', 290, 640, pb(T, t_1 - .1), { rot: -.06 + Math.sin(T * 3) * .03, size: 40, seed: 4201 });
    for (let k = 0; k < 10; k++) { const kk = pb(T, t_t - .1 + k * .05); if (kk <= 0) continue; c.save(); c.translate(720 + (k % 4) * 60, 560 + Math.floor(k / 4) * 50 + Math.sin(T * 3 + k) * 6); c.rotate((k % 3 - 1) * .15); c.scale(kk * .9, kk * .9);
      shp(c, R4(-40, -26, 80, 52), [C.gold, C.lav, C.paper, C.vio][k % 4], { sharp: true, w: 3, lc: C.ink, seed: 4210 + k }); c.restore(); }
    if (T > t_t - .1) { shp(c, [[690, 700], [990, 700], [950, 820], [730, 820]], '#B07A3E', { w: 5, lc: C.ink, seed: 4230 }); tx(c, 'TODAS', 840, 765, { size: 36, f: 'ui', col: C.paper }); }
    tx(c, 'VS', 540, 680, { size: 90, col: C.red, sh: C.ink, sc: pb(T, t_t + .2) });
    person(c, 270, 1430, .95, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: 'grin', armR: [1.4, .8] });
    person(c, 820, 1430, .95, { seed: 12, shirt: C.vio, flip: true, ...idle(T, 1), look: -1, mouth: 'smile', armR: [1.3, .9] });
    stamp(c, 'HICIMOS LA CUENTA', 540, 1050, T, t_c + .05, { size: 60, col: C.goldD, rot: .03 });
  }); }

// 3 · TikTok · Reglas: USD 1.000 en enero de 2000 → oct. 2026, dividendos reinvertidos
if (has('reglas')) { const s = 'reglas', t_m = As(s, 'mil dólares'), t_d = As(s, 'dividendos reinvertidos,'), t_o = As(s, 'octubre de dos mil veintiséis.');
  hit(t_m + .1, 10, 'stamp'); hit(t_d + .1, 8, 'ping'); hit(t_o + .2, 10, 'stamp');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_o, 1.0], [t_o + .6, 1.05]]) + .012 * Math.sin(L));
    tx(c, 'LAS REGLAS', 540, 220, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) }); hipo(c, 330);
    const kc = pb(T, t_m - .2); if (kc > 0) { c.save(); c.translate(540, 560); c.scale(kc, kc); for (let k = 0; k < 5; k++) coin(c, -120 + k * 60, Math.sin(T * 3 + k) * 8, 52, 4300 + k); c.restore(); }
    pill(c, 'USD 1.000 EN CADA UNA', 540, 700, { size: 50, f: 'ui', sc: pb(T, t_m + .1) });
    // línea de tiempo 2000 → 2026
    const g = pr(T, t_m + .4, Math.max(.8, t_o - t_m), easeIO); ln(c, [[140, 900], [140 + 800 * g, 900]], { w: 10, straight: true, col: C.goldD, seed: 4310 });
    tx(c, 'ENE. 2000', 170, 960, { size: 34, f: 'ui', al: pr(T, t_m, .3) }); tx(c, 'OCT. 2026', 910, 960, { size: 34, f: 'ui', al: pr(T, t_o - .2, .3) });
    tag(c, 'DIVIDENDOS REINVERTIDOS', 540, 1060, { size: 34, bg: C.goldL, sc: pb(T, t_d) });
    tx(c, 'Sin comisiones ni impuestos · cierre ajustado de Yahoo Finance', 540, 1160, { size: 26, f: 'ui', al: pr(T, t_d + .4, .4) });
    person(c, 900, 1500, .75, { seed: 5, shirt: C.gold, flip: true, ...idle(T), look: -1, mouth: 'smile', armR: [2.2, .5] });
  }); }

// 4 · Microsoft: barra que sube a USD 14.729 · «Le atinaste» (TikTok) / SH «cuenta»: Microsoft vs. Citigroup
function mvsc(c, T, tM, tC, both) { const Z = 1250, K = 620 / 15000;
  [[TOP[0], tM, 330, C.gold], [TOP[6], tC, 750, C.red]].slice(0, both ? 2 : 1).forEach(([[n, v], t, x, col], k) => { if (!both && k) return; const xx = both ? x : 540, g = pr(T, t, 1.0, easeIO);
    shp(c, R4(xx - 110, Z - 1000 * K, 220, 1000 * K), C.paper, { sharp: true, w: 3, lc: C.ink, seed: 4400 + k }); tx(c, 'USD 1.000', xx, Z - 1000 * K - 30, { size: 26, f: 'ui', al: .7 });
    if (g > 0) shp(c, R4(xx - 90, Z - v * K * g, 180, v * K * g), col, { sharp: true, w: 5, lc: C.ink, seed: 4402 + k, hatch: shade(col, .6), hal: .3 });
    tx(c, n, xx, Z + 46, { size: 34, f: 'ui' }); pill(c, usd(v * (g > .98 ? 1 : g)), xx, Math.min(Z - v * K * g, Z - 1000 * K) - 80, { size: 40, f: 'ui', sc: pb(T, t + .2), col: k ? '#FFB4A6' : C.gold }); });
  ln(c, [[100, Z], [980, Z]], { w: 7, straight: true, seed: 4410 }); }
if (has('ganadora')) { const s = 'ganadora', t_m = As(s, 'Microsoft,'), t_v = As(s, 'catorce mil setecientos'), t_a = As(s, 'Le atinaste.');
  hit(t_m + .1, 8, 'ping'); hit(t_v + .3, 16, 'impact'); hit(t_a + .05, 12, 'stamp');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_v, 960], [t_v + 1, 880]]), key(T, [[0, 1.0], [t_v, 1.0], [t_v + 1, 1.06]]) + .012 * Math.sin(L)); hipo(c, 200);
    tx(c, 'SI ESCOGISTE MICROSOFT', 540, 300, { size: 64, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    mvsc(c, T, t_m + .2, 0, false); burst(c, 540, 600, T, t_v + .8, { R: 220, n: 18 });
    stamp(c, 'LE ATINASTE', 540, 1120, T, t_a, { size: 70, col: C.goldD, rot: -.04 });
    person(c, 200, 1470, .85, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_v ? 'grin' : 'smile', armR: T > t_v ? [2.8, .3] : [.3, .2], armL: T > t_a ? [2.6, .3] : undefined });
  }); }
if (has('cuenta')) { const s = 'cuenta', t_m = As(s, 'En Microsoft,'), t_v = As(s, 'catorce mil setecientos.'), t_c = As(s, 'En Citigroup,'), t_p = As(s, 'perdiste casi la mitad.');
  hit(t_m + .1, 8, 'ping'); hit(t_v + .3, 14, 'impact'); hit(t_c + .1, 8, 'ping'); hit(t_p + .1, 16, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L)); hipo(c, 200);
    tx(c, 'USD 1.000 EN ENE. 2000 → HOY', 540, 300, { size: 56, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    const k0 = pb(T, sec(s).t0); if (T < t_m + .2) { c.save(); c.translate(540, 700); c.scale(k0, k0); for (let k = 0; k < 5; k++) coin(c, -120 + k * 60, Math.sin(T * 3 + k) * 8, 52, 4300 + k); c.restore(); pill(c, 'USD 1.000 EN CADA UNA', 540, 850, { size: 46, f: 'ui', sc: pb(T, sec(s).t0 + .3) }); }
    mvsc(c, T, t_m + .1, t_c + .1, true);
    stamp(c, 'CASI −50 %', 750, 1120, T, t_p, { size: 60, col: C.red, rot: .04 });
    person(c, 150, 1480, .75, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_p ? 'o' : 'grin', brow: T > t_p ? 1 : 0, sweat: T > t_p ? T : 0 });
    src(c, 'Dividendos reinvertidos · dic. 1999 → oct. 2026 · Yahoo Finance · cálculo TITÁN', 1560);
  }); }

// 5 · TikTok · Citigroup: la línea cae hasta USD 51 en 2009 y hoy vale USD 570
if (has('perdedora')) { const s = 'perdedora', t_c = As(s, 'Citigroup,'), t_v = As(s, 'quinientos setenta.'), t_p = As(s, 'perdiste casi la mitad.'), t_9 = As(s, 'crisis de dos mil nueve,'), t_95 = As(s, 'noventa y cinco por ciento.');
  hit(t_c + .1, 8, 'ping'); hit(t_v + .2, 10, 'impact'); hit(t_p + .1, 12, 'stamp'); hit(t_9 + .2, 10, 'ping'); hit(t_95 + .2, 18, 'stamp');
  // trayectoria aproximada por hitos reales del cálculo (USD): 2000: 1.000 · pico 2000: ~1.400 · 2007: ~1.300 · feb. 2009: 51 · 2026: 570
  const P = [[2000, 1000], [2000.6, 1400], [2002.7, 800], [2007, 1300], [2009.1, 51], [2012, 250], [2020, 450], [2026.8, 570]];
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, key(T, [[0, 540], [t_9, 540], [t_9 + .8, 470]]), key(T, [[0, 950], [t_9, 950], [t_9 + .8, 1000]]), key(T, [[0, 1.0], [t_9, 1.0], [t_9 + .8, 1.12]]) + .012 * Math.sin(L)); hipo(c, 200);
    tx(c, 'SI ESCOGISTE CITIGROUP', 540, 300, { size: 64, col: C.red, sh: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    const X = y => 120 + (y - 2000) / 26.8 * 840, Y = v => 1180 - v / 1500 * 640, g = pr(T, t_c, Math.max(1.5, t_95 - t_c), easeIO);
    ln(c, [[110, 1180], [980, 1180]], { w: 5, straight: true, seed: 4501 }); c.save(); c.setLineDash([12, 9]); c.strokeStyle = C.ink; c.globalAlpha = .4; c.lineWidth = 4; c.beginPath(); c.moveTo(110, Y(1000)); c.lineTo(980, Y(1000)); c.stroke(); c.restore();
    tx(c, 'USD 1.000', 200, Y(1000) - 26, { size: 24, f: 'ui', al: .7 }); tx(c, '2000', 130, 1220, { size: 26, f: 'ui' }); tx(c, '2009', X(2009.1), 1220, { size: 26, f: 'ui', col: C.red }); tx(c, '2026', 950, 1220, { size: 26, f: 'ui' });
    const gl = pr(T, t_c + .1, Math.max(1, t_v - t_c - .1), easeIO); if (gl > 0) ln(c, P.map(([y, v]) => [X(y), Y(v)]), { w: 9, col: C.red, straight: true, seed: 4502, p: gl });
    if (T > t_9) { const g = .5 + .5 * Math.sin(T * 6); c.save(); c.globalAlpha = .5 + .4 * g; c.strokeStyle = C.red; c.lineWidth = 8; c.beginPath(); c.arc(X(2009.1), Y(51), 34, 0, TAU); c.stroke(); c.restore(); }
    if (T > t_9 + .1) { pill(c, 'FEB. 2009: USD 51', X(2009.1) + 40, Y(51) - 70, { size: 32, f: 'ui', col: '#FFB4A6', sc: pb(T, t_9 + .2) }); }
    stamp(c, '−95 %', X(2009.1), 860, T, t_95, { size: 90, col: C.red, rot: -.05 });
    pill(c, 'HOY: USD 570', 820, Y(570) - 80, { size: 38, f: 'ui', col: '#FFB4A6', sc: pb(T, t_v) });
    tx(c, 'CASI LA MITAD MENOS, 26 AÑOS DESPUÉS', 540, 1300, { size: 40, f: 'ui', col: C.red, clipP: pr(T, t_p - .1, .5, easeIO) });
    person(c, 900, 1500, .7, { seed: 9, shirt: C.navy, flip: true, ...idle(T), look: -1, mouth: 'o', brow: 1, sweat: T > t_9 ? T : 0 });
    src(c, 'Mínimo de cierre mensual: feb. 2009 · Yahoo Finance · cálculo TITÁN', 1560);
  }); }

// 6 · TikTok · Las 10 en barras con la línea del S&P 500: solo 4 por encima
if (has('medio')) { const s = 'medio', t_i = As(s, 'Intel'), t_d = As(s, 'De las diez,'), t_4 = As(s, 'solo cuatro');
  hit(t_i + .1, 8, 'ping'); hit(t_d + .1, 8, 'ping'); hit(t_4 + .2, 16, 'stamp');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L)); hipo(c, 200);
    tx(c, 'USD 1.000 EN CADA UNA → HOY', 540, 300, { size: 56, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    tenBars(c, T, sec(s).t0, t_d, t_4, { Z: 1180, H: 680 });
    stamp(c, 'SOLO 4 DE 10 LE GANARON AL ÍNDICE', 540, 1370, T, t_4 + .1, { size: 44, col: C.red, rot: -.03 });
    src(c, 'Dividendos reinvertidos · dic. 1999 → oct. 2026 · Yahoo Finance · cálculo TITÁN', 1560);
  }); }

// 7 · El S&P 500 completo: la canasta con 500 empresas → USD 8.232 «sin adivinar»
if (has('indice')) { const s = 'indice', t_e = As(s, 'ese ene pe quinientos'), t_v = TK ? As(s, 'ocho mil doscientos treinta dólares.') : As(s, 'ocho mil doscientos treinta.'), t_x = TK ? As(s, 'Sin adivinar') : As(s, 'Solo cuatro');
  hit(t_e + .1, 10, 'ping'); hit(t_v + .2, 16, 'impact'); hit(t_x + .1, 14, 'stamp');
  scene(s, TK ? 'wipe' : 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, key(T, [[0, 1.0], [t_v, 1.0], [t_v + .6, 1.05]]) + .012 * Math.sin(L)); hipo(c, 200);
    tx(c, '¿Y EL S&P 500 COMPLETO?', 540, 300, { size: 70, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    if (!TK && T > t_x - .3) { tenBars(c, T, t_x - .3, t_x, t_x + .4, { Z: 1180, H: 600 }); stamp(c, 'SOLO 4 DE 10 LE GANARON', 540, 1370, T, t_x + .3, { size: 48, col: C.red, rot: -.03 }); return; }
    // canasta con 500 cuadritos
    const kb = pb(T, t_e - .2); c.save(); c.translate(540, 780); c.scale(kb, kb);
    for (let k = 0; k < 120; k++) { const x = -330 + (k % 15) * 46, y = -230 + Math.floor(k / 15) * 40 + Math.sin(T * 2 + k * .7) * 3; c.save(); c.globalAlpha = .9; c.fillStyle = [C.gold, C.lav, C.paper, C.vio, C.goldL][k % 5]; c.fillRect(x, y, 38, 30); c.restore(); }
    shp(c, [[-380, 100], [380, 100], [320, 260], [-320, 260]], '#B07A3E', { w: 6, lc: C.ink, seed: 4601 }); tx(c, '500 EMPRESAS', 0, 185, { size: 48, f: 'ui', col: C.paper }); c.restore();
    pill(c, 'HOY: ' + usd(SPY), 540, 1150, { size: 62, f: 'ui', sc: pb(T, t_v) }); burst(c, 540, 1150, T, t_v + .2, { R: 260, n: 20 });
    if (TK) stamp(c, 'SIN ADIVINAR CUÁL GANABA', 540, 1310, T, t_x, { size: 52, col: C.goldD, rot: .03 });
    person(c, 160, 1480, .75, { seed: 12, shirt: C.vio, ...idle(T), look: 1, mouth: T > t_v ? 'grin' : 'smile', armR: [1.8, .6] });
    src(c, 'SPY (fondo que replica el S&P 500) · dividendos reinvertidos · Yahoo Finance', 1560);
  }); }

// 8 · Cierre (noche): ¿una sola o diversificado? Depende · diversificar evita adivinar · haz tu cuenta
if (has('cierre')) { const s = 'cierre', t_d = TK ? As(s, 'Depende de cuánto') : null, t_s = As(s, 'si no sabes'), t_v = As(s, 'diversificar te evita'), t_h = As(s, 'Haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  if (t_d) hit(t_d + .1, 8, 'ping'); hit(t_s + .1, 6, 'ping'); hit(t_v + .1, 10, 'stamp'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, '¿UNA SOLA O DIVERSIFICADO?', 540, 300, { size: 64, col: C.chalk, sh: C.goldD, sc: pb(T, sec(s).t0 - .2), max: 1000 });
    if (t_d) tx(c, 'DEPENDE DE CUÁNTO RIESGO AGUANTAS', 540, 420, { size: 46, col: C.lav, sh: null, clipP: pr(T, t_d - .1, .6, easeIO), max: 1000 });
    tx(c, 'SI NO SABES CUÁL VA A GANAR,', 540, 620, { size: 52, col: C.chalk, sh: C.goldD, clipP: pr(T, t_s - .1, .6, easeIO), max: 1000 });
    tx(c, 'DIVERSIFICAR TE EVITA ADIVINAR', 540, 720, { size: 56, col: C.gold, sh: null, clipP: pr(T, t_v - .1, .6, easeIO), max: 1000 });
    tx(c, 'HAZ TU CUENTA', 540, 960, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada: el gancho con «SOLO 1 SIGUE EN EL TOP 10» =================
function cover(c) { const t = As('gancho', 'diez primeras.'); drawScene(c, SC[0], Math.min(t + 1.3, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('una-accion', cover);
