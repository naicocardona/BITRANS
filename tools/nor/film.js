// TITÁN · Reflexión «No soltar en el peor momento» · Short (sh) y TikTok (tk) · kit híbrido con varios personajes genéricos (tools/env como patrón)
// Tema tomado de una referencia de Lady («el elegido»); escenas, frases y visuales propios. La persona que invierte es una situación HIPOTÉTICA.
// NQ (inyectada por build.sh): Nasdaq 100, 25 nov 2026, cada 5 min (Yahoo Finance). Mín. 24.970,66 = −20,38 % vs. máx. 6 oct 31.361,37; cierre 26.046,90 (−0,64 % en el día).
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const YOU = C.gold;
const FR = [[150, 9, C.vio], [930, 3, C.navy], [790, 7, C.lav]];   // amigos: [x, seed, camisa]
function src(c, s, y = 1312) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }

// ---------- piezas ----------
function bubble(c, s, x, y, k, o = {}) { if (k <= 0) return; const w = tw(c, s, { size: o.size || 44, f: 'hand' }) + 70, h = (o.size || 44) * 1.9;
  c.save(); c.translate(x, y); c.rotate(o.rot ?? 0); c.scale(k, k);
  shp(c, [[(o.tail ?? 0) - 18, h / 2 - 6], [(o.tail ?? 0) + 18, h / 2 - 6], [(o.tail ?? 0) * 1.4, h / 2 + 46]], o.bg || C.paper, { w: 4, lc: C.ink, seed: 4101 });
  shp(c, blob(0, 0, w / 2, h / 2, o.seed ?? 4102, { n: 30, amp: .03 }), o.bg || C.paper, { w: 4, lc: C.ink, seed: o.seed ?? 4102 });
  tx(c, s, 0, 3, { size: o.size || 44, f: 'hand', col: o.col || C.ink, sh: null }); c.restore(); }
function hipo(c, y = 330, k = 1) { tag(c, 'SITUACIÓN HIPOTÉTICA', 540, y, { size: 26, bg: C.paper, sc: k }); }
// nube de tormenta con lluvia (el «mal momento»)
function storm(c, x, y, s, T, k = 1) { if (k <= 0) return; c.save(); c.translate(x, y); c.scale(s * k, s * k);
  for (let i = 0; i < 14; i++) { const u = ((T * 1.6 + i * .37) % 1), rx = -170 + (i * 53) % 340; ln(c, [[rx, 70 + u * 260], [rx - 12, 110 + u * 260]], { w: 4, col: '#7C8FB8', straight: true, seed: 4200 + i, al: 1 - u }); }
  shp(c, blob(0, 0, 230, 95, 4210, { n: 30, amp: .12 }), '#8D93A8', { w: 5, lc: C.ink, seed: 4210, hatch: shade('#8D93A8', .6), hal: .25 }); c.restore(); }
function bolt(c, x, y, s, T, t0) { if (T < t0 || T > t0 + .5) return; c.save(); c.globalAlpha = 1 - (T - t0) / .5; shp(c, [[x, y], [x - 40 * s, y + 120 * s], [x, y + 110 * s], [x - 30 * s, y + 240 * s], [x + 50 * s, y + 80 * s], [x + 10 * s, y + 90 * s], [x + 40 * s, y]], C.gold, { w: 4, lc: C.ink, seed: 4220 }); c.restore(); }
// celular grande con la cuenta: la línea baja en rojo
function bigPhone(c, x, y, s, T, p, o = {}) { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(o.rot ?? 0);
  shp(c, R4(-150, -260, 300, 520), C.ink, { w: 5, lc: C.ink, seed: 4300 }); c.fillStyle = o.red ? '#FDECEA' : '#EEF5F0'; c.fillRect(-130, -225, 260, 450);
  tx(c, 'MI CUENTA', 0, -185, { size: 26, f: 'ui', col: C.ink, sh: null });
  const pts = [[-110, -60], [-70, -40], [-40, -10], [-10, 20], [20, 0], [50, 50], [80, 80], [110, 120]]; ln(c, pts, { w: 7, col: o.red ? C.red : C.green, p, seed: 4301 });
  if (o.label) tx(c, o.label, 0, 175, { size: 46, f: 'ui', col: o.red ? C.red : C.green, sh: null }); c.restore(); }
function smallPhone(c, x, y, s, T) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, R4(-55, -95, 110, 190), C.ink, { w: 4, lc: C.ink, seed: 4310 });
  c.fillStyle = '#E9F4EE'; c.fillRect(-45, -80, 90, 150); const g = .5 + .5 * Math.sin(T * 2); ln(c, [[-35, 40], [-12, 15], [8, 25], [35, -30 - g * 8]], { w: 5, col: C.green, seed: 4311 }); c.restore(); }
function coin(c, x, y, r = 26) { c.fillStyle = C.gold; c.beginPath(); c.ellipse(x, y, r, r * .42, 0, 0, TAU); c.fill(); c.strokeStyle = C.ink; c.lineWidth = 3; c.stroke(); }
function jar(c, x, y, s, fill, seed) { c.save(); c.translate(x, y); c.scale(s, s); const h = 220 * fill;
  if (h > 0) shp(c, R4(-100, 130 - h, 200, h), '#F2E3B3', { sharp: true, line: false }); for (let k = 0; k < Math.floor(fill * 9); k++) coin(c, -60 + (k % 3) * 60, 110 - Math.floor(k / 3) * 40, 24);
  c.save(); c.globalAlpha = .35; shp(c, R4(-110, -110, 220, 250), '#DCEFF5', { w: 6, lc: C.ink, seed }); c.restore(); ln(c, R4(-110, -110, 220, 250), { w: 6, col: C.ink, close: true, seed });
  shp(c, R4(-80, -140, 160, 36), C.goldD, { sharp: true, w: 4, lc: C.ink, seed: seed + 1 }); c.restore(); }
function door(c, x, y, s, open) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, R4(-110, -330, 220, 330), C.navy, { sharp: true, w: 5, lc: C.ink, seed: 4400 });
  shp(c, [[-110, -330], [-110 + 200 * (1 - open * .6), -310], [-110 + 200 * (1 - open * .6), 20], [-110, 0]], '#A8743F', { w: 5, lc: C.ink, seed: 4401 });
  tag(c, 'SALIDA', 0, -380, { size: 30, bg: '#FFD3CB', rot: 0 }); c.restore(); }
function notebook(c, x, y, s, rot, k = 1, o = {}) { if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(rot); c.scale(s * k, s * k);
  shp(c, R4(-170, -120, 340, 240), C.navy, { sharp: true, w: 5, lc: C.ink, seed: 4500 }); shp(c, R4(-155, -105, 310, 210), C.paper, { sharp: true, w: 3, lc: C.ink, seed: 4501 });
  tx(c, 'MI PLAN', 0, -55, { size: 48, f: 'ui', col: C.ink, sh: null }); ['UN POCO CADA MES', 'A LARGO PLAZO', 'NO VENDER POR SUSTO'].forEach((w, i) => { tx(c, '✓ ' + w, 0, 5 + i * 34, { size: 22, f: 'ui', col: C.goldD, sh: null, al: o.lines === false ? 0 : 1, max: 290 }); }); c.restore(); }
// intradía del 25 nov
const IX0 = 150, IX1 = 930, IZ = 1140, IH = 520, IMIN = 24500, IMAX = 26400, NI = NQ.intra.length;
const ixx = i => IX0 + (IX1 - IX0) * i / (NI - 1), iyy = v => IZ - IH * (v - IMIN) / (IMAX - IMIN);
const ILOW = NQ.intra.reduce((b, v, i) => v < NQ.intra[b] ? i : b, 0);
function intraChart(c, T, t0, tLow, tEnd) {
  ln(c, [[IX0 - 20, IZ + 20], [IX1 + 20, IZ + 20]], { w: 5, straight: true, seed: 4600 });
  [['MAÑANA', .2], ['TARDE', .8]].forEach(([w, f]) => tx(c, w, IX0 + (IX1 - IX0) * f, IZ + 56, { size: 24, f: 'ui', al: .75 }));
  const yP = iyy(NQ.prev); c.save(); c.setLineDash([10, 8]); c.strokeStyle = C.ink; c.globalAlpha = .45; c.lineWidth = 3; c.beginPath(); c.moveTo(IX0 - 20, yP); c.lineTo(IX1 + 20, yP); c.stroke(); c.restore();
  tx(c, 'CIERRE DEL DÍA ANTERIOR', IX1 - 150, yP - 24, { size: 20, f: 'ui', al: .6 });
  const a = pr(T, t0, Math.max(.3, tLow - t0), easeIO), b = pr(T, tLow, Math.max(.3, tEnd - tLow), easeIO), k = Math.round(a * ILOW + b * (NI - 1 - ILOW));
  if (k > 0) ln(c, NQ.intra.slice(0, k + 1).map((v, i) => [ixx(i), iyy(v)]), { w: 7, col: k <= ILOW ? C.red : C.vio, straight: true, seed: 4610 });
  if (a >= 1) { pill(c, '−20 % DESDE SU MÁXIMO', ixx(ILOW) + 230, iyy(NQ.intra[ILOW]) + 40, { size: 32, f: 'ui', col: '#FFB4A6', sc: pb(T, tLow) }); burst(c, ixx(ILOW), iyy(NQ.intra[ILOW]), T, tLow, { R: 130, col: C.red }); }
  if (b >= 1) pill(c, 'CIERRE: −0,6 % EN EL DÍA', ixx(NI - 1) - 220, iyy(NQ.intra[NI - 1]) - 70, { size: 32, f: 'ui', col: C.gold, sc: pb(T, tEnd) }); }

// ================= escenas =================
// 1 · Gancho: alguien en la línea de partida, con la nube encima
if (has('gancho')) { const s = 'gancho', t_s = As(s, 'sabiendo invertir.'), t_b = As(s, 'buen momento.');
  hit(.05, 8, 'stamp'); hit(t_s + .1, 10, 'impact'); hit(t_b + .1, 16, 'impact');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_b, 960], [t_b + .6, 930]]), key(T, [[0, 1.0], [t_b, 1.0], [t_b + .6, 1.06]]) + .01 * Math.sin(L * 1.3));
    tx(c, 'NADIE EMPIEZA', 540, 190, { size: 100, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, 'SABIENDO', 540, 300, { size: 100, col: C.goldD, sh: C.ink, sc: pb(T, .2) });
    stamp(c, 'NI EN BUEN MOMENTO', 540, 420, T, t_b + .1, { size: 62, col: C.vio, rot: -.03 });
    storm(c, 540, 600, .7 + .4 * pr(T, t_b - .3, .6), T, pb(T, .4)); bolt(c, 600, 640, 1.2, T, t_b + .15);
    // línea de partida
    ln(c, [[160, 1290], [920, 1290]], { w: 10, col: C.ink, straight: true, seed: 4700 }); for (let k = 0; k < 8; k++) shp(c, R4(160 + k * 95, 1290, 48, 24), k % 2 ? C.paper : C.ink, { sharp: true, line: false });
    person(c, 540, 1280, 1.0, { seed: 5, shirt: YOU, ...idle(T), look: 0, mouth: T > t_b ? 'o' : 'flat', brow: T > t_b ? 1 : 0, sweat: T > t_b ? T : 0, armL: [.5, .4], armR: [.5, .4] });
    tag(c, 'APRENDIZ', 800, 980, { size: 28, bg: C.goldL, sc: pb(T, t_s), rot: .05 });
  }); }

// 2 · TikTok · El primer ahorro: con miedo, con dudas
if (has('empieza')) { const s = 'empieza', t_p = As(s, 'primer ahorro'), t_m = As(s, 'Con miedo,'), t_d = As(s, 'con dudas,'), t_b = As(s, 'haciendo bien.');
  hit(t_p + .1, 10, 'ping'); hit(t_m + .1, 10, 'impact'); hit(t_d + .1, 10, 'impact'); hit(t_b + .1, 8, 'ping');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_b, 1.0], [t_b + .5, 1.05]]) + .012 * Math.sin(L));
    tx(c, 'EL PRIMER AHORRO', 540, 210, { size: 92, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 }); hipo(c, 320);
    // la moneda entra al celular
    const u = pr(T, t_p, .7, easeIn); if (u > 0 && u < 1) coin(c, lerp(300, 640, u), lerp(700, 880, u) - Math.sin(u * Math.PI) * 140, 30);
    person(c, 450, 1300, 1.05, { seed: 5, shirt: YOU, ...idle(T), look: 1, mouth: 'flat', brow: T > t_m ? 1 : 0, sweat: T > t_d ? T : 0, armR: [1.6, .9], prop: (cc, hL, hR) => smallPhone(cc, hR[0] + 10, hR[1] - 70, .8, T) });
    bubble(c, '¿y si pierdo?', 790, 560, pb(T, t_m), { tail: -40, rot: .04, seed: 4801, bg: '#FFD9D1' });
    bubble(c, '¿así se hace?', 800, 760, pb(T, t_d), { tail: -60, rot: -.03, seed: 4802 });
    if (T > t_b) tx(c, '?', 800 + 10 * Math.sin(T * 5), 950, { size: 140, col: C.vio, sh: C.ink, sc: pb(T, t_b) });
  }); }

// 3 · Primer mes en rojo y los amigos: «te lo dije» (Short: y la mayoría se sale)
if (has('rojo')) { const s = 'rojo', t_r = As(s, 'todo en rojo.'), t_t = As(s, 'te lo dije.'), t_x = TK ? null : As(s, 'la mayoría se sale.');
  hit(t_r + .1, 16, 'impact'); hit(t_t, 12, 'stamp'); if (t_x) hit(t_x + .1, 12, 'stamp');
  scene(s, TK ? 'drop' : 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_r, 1.0], [t_r + .5, 1.06]]) + .012 * Math.sin(L));
    tx(c, 'EL PRIMER MES', 540, 200, { size: 92, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    tx(c, 'TODO EN ROJO', 540, 305, { size: 92, col: C.red, sh: C.ink, sc: pb(T, t_r) });
    bigPhone(c, 540, 730, .95, T, pr(T, sec(s).t0 + .1, Math.max(.6, t_r - sec(s).t0), easeIO), { red: true, label: T > t_r ? '−' : '', rot: -.03 });
    FR.forEach(([x, sd, sh], i) => person(c, x, 1340, .75, { seed: sd, shirt: sh, flip: x > 540, ...idle(T, i), look: x > 540 ? -1 : 1, mouth: T > t_t ? 'grin' : 'flat', armR: T > t_t && i === 0 ? [2.6, .3] : undefined }));
    [[220, 980, -.05, 4811], [840, 900, .05, 4812], [700, 1060, -.03, 4813]].forEach(([x, y, r, sd], k) => bubble(c, 'te lo dije', x, y, pb(T, t_t + k * .18), { tail: k ? 30 : -30, rot: r, seed: sd, size: 46, bg: k === 1 ? '#FFD9D1' : C.paper }));
    if (t_x && T > t_x - .2) { door(c, 540, 1330, .6 * pb(T, t_x - .2), pr(T, t_x, .5)); tag(c, 'LA MAYORÍA SE SALE', 540, 1150, { size: 34, bg: '#FFD3CB', sc: pb(T, t_x + .1) }); }
  }); }

// 4 · TikTok · La mayoría se sale: vende barato y jura no volver
if (has('salen')) { const s = 'salen', t_x = As(s, 'la mayoría se sale.'), t_v = As(s, 'Vende barato,'), t_j = As(s, 'jura no volver.');
  hit(t_x + .1, 12, 'stamp'); hit(t_v + .1, 12, 'impact'); hit(t_j + .1, 10, 'stamp');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'LA MAYORÍA SE SALE', 540, 210, { size: 82, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    door(c, 880, 1300, .95, 1);
    // fila de personas que caminan hacia la salida y desaparecen
    for (let k = 0; k < 5; k++) { const u = pr(T, sec(s).t0 + k * .55, 2.4, x => x); if (u >= 1) continue; const x = lerp(-80 + k * 30, 880, u);
      c.save(); c.globalAlpha = u > .85 ? (1 - u) / .15 : 1; person(c, x, 1300, .8, { seed: 20 + k, shirt: ['#3B4466', C.lav, C.vio, C.navy, '#3B4466'][k], walk: T * 9 + k, look: 1, mouth: 'flat' }); c.restore(); }
    stamp(c, 'VENDE BARATO', 400, 600, T, t_v + .1, { size: 64, col: C.red, rot: -.04 });
    tag(c, '«NUNCA MÁS»', 420, 760, { size: 36, bg: '#FFD3CB', sc: pb(T, t_j), rot: .03 });
    src(c, 'Situación hipotética', 1340);
  }); }

// 5 · TikTok · Esta persona se queda: un poquito cada mes, sin aplausos
if (has('sigue')) { const s = 'sigue', t_q = As(s, 'se queda.'), t_p = As(s, 'poquito cada mes,'), t_n = As(s, 'nadie aplauda');
  hit(t_q + .1, 14, 'stamp'); hit(t_p + .1, 8, 'ping'); hit(t_n + .1, 10, 'impact');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.05], [t_q, 1.0]]) + .012 * Math.sin(L));
    tx(c, 'PERO SE QUEDA', 540, 210, { size: 96, col: C.goldD, sh: C.ink, sc: pb(T, t_q - .2) });
    // hojas de calendario que pasan
    const MS = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO']; const nm = Math.min(MS.length - 1, Math.floor(Math.max(0, T - t_p) / .55));
    c.save(); c.translate(820, 520); shp(c, R4(-110, -110, 220, 220), C.paper, { sharp: true, w: 5, lc: C.ink, seed: 4900 }); shp(c, R4(-110, -110, 220, 60), C.red, { sharp: true, w: 4, lc: C.ink, seed: 4901 });
    tx(c, 'CADA MES', 0, -80, { size: 26, f: 'ui', col: C.paper, sh: null }); tx(c, MS[nm], 0, 30, { size: 70, f: 'ui', col: C.ink, sh: null, sc: 1 + settle(T, t_p + nm * .55, { amp: .15, freq: 4, decay: 6 }) }); c.restore();
    jar(c, 300, 760, 1.0, .1 + .07 * nm, 4910);
    const u = ((Math.max(0, T - t_p)) % .55) / .55; if (T > t_p) coin(c, 300, lerp(520, 700, easeIn(u)), 26);
    person(c, 540, 1320, 1.0, { seed: 5, shirt: YOU, ...idle(T), look: -1, mouth: 'smile', armL: [1.2, .6] });
    // sillas vacías: nadie aplaude
    if (T > t_n) { for (let k = 0; k < 4; k++) { const x = 140 + k * 260; if (Math.abs(x - 540) < 120) continue; shp(c, R4(x - 50, 1240, 100, 60), '#A8743F', { sharp: true, w: 4, lc: C.ink, seed: 4920 + k }); shp(c, R4(x - 50, 1150, 18, 90), '#A8743F', { sharp: true, w: 4, lc: C.ink, seed: 4930 + k }); }
      tag(c, 'SIN APLAUSOS', 820, 1060, { size: 32, bg: C.paper, sc: pb(T, t_n), rot: .03 }); }
  }); }

// 6 · Esta semana: el Nasdaq 100 tocó −20 % desde su máximo y cerró casi igual el mismo día
if (has('semana')) { const s = 'semana', t_v = As(s, 'veinte por ciento'), t_c = As(s, 'cerró casi igual'), t_m = As(s, 'en la mañana,'), t_t = As(s, 'la tarde.');
  hit(t_v + .2, 16, 'impact'); hit(t_c + .3, 14, 'stamp'); hit(t_m + .1, 8, 'ping'); hit(t_t + .1, 14, 'stamp');
  scene(s, 'news', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_v, 1.0], [t_v + .6, 1.05], [t_c + .5, 1.0]]) + .012 * Math.sin(L));
    tx(c, 'ESTA SEMANA', 540, 200, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    tag(c, 'NASDAQ 100 · MIÉRCOLES 25 DE NOV.', 540, 310, { size: 28, bg: C.paper, sc: pb(T, sec(s).t0) });
    intraChart(c, T, sec(s).t0 + .3, t_v + .2, t_c + .5);
    { const asus = T < t_c + .5; person(c, 900, 580, .45, { seed: 5, shirt: YOU, flip: true, ...idle(T), look: -1, mouth: asus ? 'o' : 'smile', brow: asus ? 1 : 0, sweat: asus && T > t_v ? T : 0 }); }
    stamp(c, '−20 %', 330, 520, T, t_v + .2, { size: 90, col: C.red, rot: -.05 });
    stamp(c, 'QUIEN SE ASUSTÓ, SE PERDIÓ LA TARDE', 540, 1270, T, t_t + .1, { size: 38, col: C.goldD, rot: -.02 });
    src(c, 'Yahoo Finance · Nasdaq 100 cada 5 min · máx. 6 oct. 31.361,37 · mín. 25 nov. 24.970,66', 1350);
  }); }

// 7 · TikTok · El camino nunca es recto
if (has('camino')) { const s = 'camino', t_r = As(s, 'nunca es recto.'), t_1 = As(s, 'meses que bajan,'), t_2 = As(s, 'años que aburren,'), t_3 = As(s, 'días que asustan.');
  hit(t_r + .1, 12, 'stamp'); hit(t_1 + .1, 10, 'impact'); hit(t_2 + .1, 10, 'impact'); hit(t_3 + .1, 14, 'impact');
  const RD = [[540, 1380], [300, 1200], [760, 1000], [280, 800], [700, 620], [540, 470]];
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); const g = pr(T, sec(s).t0, Math.max(1, t_3 - sec(s).t0), easeIO); camS(c, T, 540, lerp(980, 900, g), 1.0 + .012 * Math.sin(L));
    tx(c, 'NUNCA ES RECTO', 540, 210, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .2) });
    ln(c, RD, { w: 60, col: C.goldL, seed: 5000 }); ln(c, RD, { w: 6, col: C.goldD, seed: 5001, p: g });
    [['MESES QUE BAJAN', 300, 1200, t_1, '#FFD3CB'], ['AÑOS QUE ABURREN', 760, 1000, t_2, C.lav], ['DÍAS QUE ASUSTAN', 280, 800, t_3, '#FFD3CB']].forEach(([w, x, y, t, col], k) => {
      const kk = pb(T, t); if (kk <= 0) return; ln(c, [[x, y], [x, y - 90]], { w: 6, straight: true, seed: 5010 + k }); tag(c, w, x + (k === 1 ? -40 : 60), y - 120, { size: 30, bg: col, sc: kk, rot: k % 2 ? .04 : -.04 }); });
    // la persona camina por el camino
    const seg = g * (RD.length - 1), i = Math.min(RD.length - 2, Math.floor(seg)), f = seg - i, px = lerp(RD[i][0], RD[i + 1][0], f), py = lerp(RD[i][1], RD[i + 1][1], f);
    person(c, px, py, .5 + .2 * (1 - g), { seed: 5, shirt: YOU, walk: T * 8, flip: RD[i + 1][0] < RD[i][0], mouth: 'flat', ...idle(T) });
  }); }

// 8 · TikTok · La respuesta no es suerte: tenía un plan y no lo soltó
if (has('respuesta')) { const s = 'respuesta', t_q = As(s, 'cómo lo hizo,'), t_s = As(s, 'ser suerte.'), t_p = As(s, 'tenía un plan,'), t_n = As(s, 'no lo soltó.');
  hit(t_q + .1, 8, 'ping'); hit(t_s + .1, 14, 'stamp'); hit(t_p + .1, 12, 'impact'); hit(t_n + .1, 16, 'stamp');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_n, 1.0], [t_n + .5, 1.06]]) + .012 * Math.sin(L));
    tx(c, '¿CÓMO LO HIZO?', 540, 210, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) }); hipo(c, 320);
    person(c, 220, 1330, .9, { seed: 9, shirt: C.vio, ...idle(T), look: 1, mouth: T > t_q && T < t_s ? 'o' : 'smile' });
    person(c, 760, 1330, 1.0, { seed: 5, shirt: YOU, flip: true, ...idle(T), look: -1, mouth: 'smile', armR: T > t_p ? [1.6, .9] : undefined });
    bubble(c, '¿cómo lo hiciste?', 300, 560, pb(T, t_q), { tail: -40, rot: -.03, seed: 5101 });
    const ks = pb(T, t_s - .2); if (ks > 0) { c.save(); c.translate(760, 560); c.scale(ks, ks); tx(c, '¿SUERTE?', 0, 0, { size: 70, col: C.ink, sh: null }); c.restore();
      if (T > t_s) { const g = pr(T, t_s, .35); ln(c, [[600, 520], [600 + 320 * g, 600]], { w: 12, col: C.red, straight: true, seed: 5102 }); ln(c, [[600, 600], [600 + 320 * g, 520]], { w: 12, col: C.red, straight: true, seed: 5103 }); } }
    notebook(c, 560, 820, 1.0, -.04, pb(T, t_p));
    stamp(c, 'Y NO LO SOLTÓ', 540, 1080, T, t_n + .1, { size: 60, col: C.goldD, rot: -.03 });
  }); }

// 9 · Cierre (noche): el viento sopla y la persona no suelta su plan
if (has('cierre')) { const s = 'cierre', t_f = As(s, 'tenerlo fácil:'), t_p = As(s, 'tener un plan'), t_n = As(s, 'no soltarlo'), t_w = As(s, 'peor momento.'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_f + .1, 8, 'ping'); hit(t_p + .1, 10, 'impact'); hit(t_n + .1, 12, 'stamp'); hit(t_w + .1, 16, 'impact'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 420 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, 'NO ES TENERLO FÁCIL', 540, 260, { size: 70, col: C.chalk, sh: C.goldD, clipP: pr(T, t_f - .3, .6, easeIO), max: 1000 });
    tx(c, 'ES NO SOLTAR EL PLAN', 540, 360, { size: 64, col: C.gold, sh: null, clipP: pr(T, t_n - .2, .6, easeIO), max: 1000 });
    tx(c, 'EN EL PEOR MOMENTO', 540, 450, { size: 64, col: C.lav, sh: null, clipP: pr(T, t_w - .2, .6, easeIO), max: 1000 });
    // viento: velas rojas y papeles que vuelan de derecha a izquierda
    const wind = .5 + .5 * pr(T, t_w, .4); for (let k = 0; k < 10; k++) { const u = ((T * .55 * wind + k * .13) % 1), x = lerp(1180, -120, u), y = 600 + (k * 83) % 520 + Math.sin(T * 3 + k) * 30;
      c.save(); c.translate(x, y); c.rotate(u * 6 + k); if (k % 2) shp(c, R4(-14, -40, 28, 80), C.red, { sharp: true, w: 3, lc: C.chalk, seed: 5200 + k }); else shp(c, R4(-34, -24, 68, 48), C.paper, { sharp: true, w: 3, lc: C.chalk, seed: 5210 + k }); c.restore(); }
    person(c, 540, 1300, 1.0, { seed: 5, shirt: YOU, ...idle(T), lean: -.06 - .04 * Math.sin(T * 2), look: 1, mouth: 'flat', brow: -1, armL: [.9, .9], armR: [.9, .9], prop: (cc, hL, hR) => notebook(cc, (hL[0] + hR[0]) / 2, hR[1] + 70, .55, .03 * Math.sin(T * 4), 1, { lines: false }) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada =================
function cover(c) { const k = SC.findIndex(x => x.id === 'semana'), t = As('semana', 'la tarde.'); drawScene(c, SC[k], Math.min(t + 1.0, SC[k].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('reflexion-no-rendirse', cover);
