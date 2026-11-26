// TITÁN · «El Nasdaq tocó mercado bajista… y se recuperó el mismo día» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js) · línea A · noticia del 25 nov 2026
// NQ (inyectada por build.sh): Nasdaq 100, Yahoo Finance. Máx. 6 oct 31.361,37 · 25 nov: mín. 24.970,66 (−20,38 % vs. máx.; −4,74 % vs. 26.214,17) · cierre 26.046,90 (−0,64 %).
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const fmt = v => Math.round(v).toLocaleString('es-CO').replace(/,/g, '.');
function src(c, s, y = 1312) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }
const BEAR = NQ.max * .8;

// ---------- piezas ----------
// gráfico diario desde octubre con la línea del −20 % (mercado bajista)
const DX0 = 140, DX1 = 940, DZ = 1180, DH = 600, DMIN = 23500, DMAX = 32000;
const dxx = i => DX0 + (DX1 - DX0) * i / (NQ.daily.length - 1), dyy = v => DZ - DH * (v - DMIN) / (DMAX - DMIN);
function dailyChart(c, T, p, tBear, tLow, o = {}) {
  ln(c, [[DX0 - 20, DZ + 20], [DX1 + 20, DZ + 20]], { w: 5, straight: true, seed: 7700 });
  [24000, 26000, 28000, 30000, 32000].forEach(v => tx(c, fmt(v), DX0 - 30, dyy(v), { size: 20, f: 'ui', align: 'right', al: .55 }));
  const pts = NQ.daily.map((r, i) => [dxx(i), dyy(r[1])]); if (p > 0) ln(c, pts, { w: 7, col: C.vio, p, straight: true, seed: 7710 });
  const im = NQ.daily.reduce((b, r, i) => r[1] > NQ.daily[b][1] ? i : b, 0); if (p > .15) pill(c, 'MÁX. 6 OCT: ' + fmt(NQ.max), dxx(im) + 120, dyy(NQ.max) - 50, { size: 28, f: 'ui', sc: pb(T, tBear - .8) });
  if (T > tBear) { const g = pr(T, tBear, .6, easeIO), y = dyy(BEAR); c.save(); c.setLineDash([16, 10]); c.strokeStyle = C.red; c.lineWidth = 5; c.beginPath(); c.moveTo(DX0 - 20, y); c.lineTo(DX0 - 20 + (DX1 - DX0 + 40) * g, y); c.stroke(); c.restore();
    tag(c, '−20 %: MERCADO BAJISTA', 330, y + 44, { size: 26, bg: '#FFD3CB', sc: pb(T, tBear + .4) }); }
  if (tLow != null && T > tLow) { const x = dxx(NQ.daily.length - 1), g = pr(T, tLow, .5, easeIO);   // vela del 25 nov: mínimo intradía y cierre
    ln(c, [[x, dyy(NQ.prev)], [x, dyy(NQ.prev) + (dyy(NQ.low) - dyy(NQ.prev)) * g]], { w: 9, col: C.red, straight: true, seed: 7720 });
    if (g >= 1) { pill(c, '25 NOV: −20,4 %', x - 150, dyy(NQ.low) + 60, { size: 30, f: 'ui', col: '#FFB4A6' }); c.fillStyle = C.gold; c.beginPath(); c.arc(x, dyy(NQ.close), 12, 0, TAU); c.fill(); } } }
// intradía del 25 nov (cada 5 minutos)
const IX0 = 140, IX1 = 940, IZ = 1150, IH = 560, IMIN = 24800, IMAX = 26400;
const ixx = i => IX0 + (IX1 - IX0) * i / (NQ.intra.length - 1), iyy = v => IZ - IH * (v - IMIN) / (IMAX - IMIN);
const ILOW = NQ.intra.reduce((b, r, i) => r[1] < NQ.intra[b][1] ? i : b, 0);
function intraChart(c, T, t0, tLow, tEnd, o = {}) {
  ln(c, [[IX0 - 20, IZ + 20], [IX1 + 20, IZ + 20]], { w: 5, straight: true, seed: 7800 });
  ['9:30 A. M.', '12:00', '4:00 P. M.'].forEach((s, k) => tx(c, s, IX0 + (IX1 - IX0) * k / 2, IZ + 56, { size: 22, f: 'ui', al: .75 }));
  const yP = iyy(NQ.prev); c.save(); c.setLineDash([10, 8]); c.strokeStyle = C.ink; c.globalAlpha = .45; c.lineWidth = 3; c.beginPath(); c.moveTo(IX0 - 20, yP); c.lineTo(IX1 + 20, yP); c.stroke(); c.restore();
  tx(c, 'CIERRE DEL MARTES', IX1 - 90, yP - 24, { size: 20, f: 'ui', al: .6 });
  const n = NQ.intra.length, a = pr(T, t0, Math.max(.3, tLow - t0), easeIO), b = pr(T, tLow, Math.max(.3, tEnd - tLow), easeIO);
  const k = Math.round(a * ILOW + b * (n - 1 - ILOW)); if (k > 0) ln(c, NQ.intra.slice(0, k + 1).map((r, i) => [ixx(i), iyy(r[1])]), { w: 7, col: k <= ILOW ? C.red : C.vio, straight: true, seed: 7810 });
  if (a >= 1) { pill(c, '−4,7 %', ixx(ILOW) + 120, iyy(NQ.intra[ILOW][1]) + 30, { size: 40, f: 'ui', col: '#FFB4A6', sc: pb(T, tLow) }); if (o.worst) tag(c, 'PEOR MOMENTO', ixx(ILOW) + 130, iyy(NQ.intra[ILOW][1]) + 100, { size: 26, bg: '#FFD3CB', sc: pb(T, o.worst) }); }
  if (b >= 1) { pill(c, 'CIERRE: −0,6 %', ixx(n - 1) - 130, iyy(NQ.intra[n - 1][1]) - 60, { size: 36, f: 'ui', col: C.gold, sc: pb(T, tEnd) }); if (o.best) tag(c, 'SE RECUPERÓ', ixx(n - 1) - 140, iyy(NQ.intra[n - 1][1]) - 130, { size: 26, bg: C.goldL, sc: pb(T, o.best) }); } }
function bear(c, x, y, s, T) { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(.04 * Math.sin(T * 3));
  for (const ex of [-80, 80]) shp(c, blob(ex, -95, 40, 40, 7900 + ex, { n: 16, amp: .04 }), '#7A5A44', { w: 5, lc: C.ink, seed: 7900 + ex });
  shp(c, blob(0, 0, 130, 115, 7905, { n: 30, amp: .04 }), '#8B6A50', { w: 6, lc: C.ink, seed: 7905, hatch: shade('#8B6A50', .6), hal: .25 });
  shp(c, blob(0, 40, 55, 40, 7906, { n: 18, amp: .03 }), '#C9A98A', { w: 4, lc: C.ink, seed: 7906 }); c.fillStyle = C.ink; c.beginPath(); c.arc(0, 22, 12, 0, TAU); c.fill();
  for (const ex of [-45, 45]) { c.beginPath(); c.arc(ex, -20, 9, 0, TAU); c.fill(); } c.restore(); }

// ================= escenas =================
// 1 · Gancho: el Nasdaq 100 baja desde el máximo de octubre, toca la línea del −20 %… y el cierre queda arriba
if (has('gancho')) { const s = 'gancho', t_20 = As(s, 'veinte por ciento'), t_c = As(s, 'casi como si nada.');
  hit(.05, 8, 'stamp'); hit(t_20 + .2, 16, 'impact'); hit(t_c + .1, 14, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_c, 960], [t_c + .6, 930]]), key(T, [[0, 1.0], [t_c, 1.0], [t_c + .6, 1.05]]) + .01 * Math.sin(L * 1.3));
    tx(c, 'NASDAQ 100', 540, 190, { size: 110, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, '¿MERCADO BAJISTA?', 540, 300, { size: 70, col: C.red, sh: C.ink });
    dailyChart(c, T, pr(T, .1, Math.max(.6, t_20 - .2), easeIO), t_20 - .1, t_20 + .2);
    stamp(c, 'Y CERRÓ CASI IGUAL', 540, 1320, T, t_c + .1, { size: 60, col: C.goldD, rot: -.03 });
    person(c, 930, 1560, .55, { seed: 5, shirt: C.gold, flip: true, ...idle(T), look: -1, mouth: T > t_c ? 'o' : 'flat', brow: T > t_20 ? 1 : 0, sweat: T > t_20 && T < t_c ? T : 0 });
    src(c, 'Nasdaq 100 · cierres diarios desde el 1 oct. 2026 · Yahoo Finance', 1430);
  }); }

// 2 · El dato: el intradía del miércoles 25: −4,7 % apenas abrió (y en el Short, también la recuperación)
if (has('dato')) { const s = 'dato', t_5 = As(s, 'casi cinco por ciento'), t_b = TK ? As(s, 'veinte coma cuatro por ciento') : As(s, 'mercado bajista.');
  const t_r = TK ? null : As(s, 'se recuperó,'), t_06 = TK ? null : As(s, 'cero coma seis.');
  hit(t_5 + .2, 16, 'impact'); hit(t_b + .2, 12, 'stamp'); if (t_r) { hit(t_r + .1, 10, 'ping'); hit(t_06 + .2, 14, 'stamp'); }
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_5, 1.0], [t_5 + .6, 1.04]]) + .012 * Math.sin(L));
    tx(c, 'MIÉRCOLES 25 DE NOV.', 540, 210, { size: 76, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    tag(c, 'NASDAQ 100 · CADA 5 MINUTOS', 540, 320, { size: 28, bg: C.paper, sc: pb(T, sec(s).t0) });
    intraChart(c, T, sec(s).t0 + .2, t_5 + .3, t_r ? t_06 : 999);
    if (TK) stamp(c, '−20,4 % DESDE EL MÁXIMO', 540, 1310, T, t_b + .2, { size: 50, col: C.red, rot: -.03 });
    else tag(c, '−20 % DESDE EL MÁXIMO = MERCADO BAJISTA', 540, 1310, { size: 28, bg: '#FFD3CB', sc: pb(T, t_b) });
    src(c, 'Yahoo Finance · horario de Nueva York (igual al de Colombia)', 1400);
  }); }

// 3 · TikTok · ¿Qué es un mercado bajista? −20 % desde el punto más alto (el oso)
if (has('bajista')) { const s = 'bajista', t_m = As(s, 'mercado bajista:'), t_20 = As(s, 'veinte por ciento o más');
  hit(t_m + .1, 14, 'stamp'); hit(t_20 + .2, 12, 'impact');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'MERCADO BAJISTA', 540, 220, { size: 90, col: C.red, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    bear(c, 540, 600, 1.4 * pb(T, sec(s).t0 + .2), T);
    shp(c, R4(220, 860, 640, 8), C.ink, { sharp: true, w: 2, lc: C.ink, seed: 7950 }); const g = pr(T, t_20 - .2, .8, easeIO);
    ln(c, [[280, 820], [280 + 240 * g, 820 + 200 * g]], { w: 10, col: C.red, straight: true, seed: 7951 });
    pill(c, 'PUNTO MÁS ALTO', 280, 780, { size: 28, f: 'ui', sc: pb(T, t_m + .3) });
    pill(c, '−20 % O MÁS', 700, 1040, { size: 50, f: 'ui', col: '#FFB4A6', sc: pb(T, t_20 + .3) });
    person(c, 150, 1560, .55, { seed: 9, shirt: C.navy, ...idle(T), look: 1, mouth: 'flat', armR: [2.0, .5] });
  }); }

// 4 · TikTok · El rebote: en la tarde se recuperó → cierre −0,6 %
if (has('rebote')) { const s = 'rebote', t_r = As(s, 'se recuperó,'), t_06 = As(s, 'cero coma seis por ciento.');
  hit(t_r + .1, 12, 'ping'); hit(t_06 + .2, 16, 'stamp');
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_06, 1.0], [t_06 + .6, 1.04]]) + .012 * Math.sin(L));
    tx(c, 'PERO EN LA TARDE…', 540, 210, { size: 84, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    intraChart(c, T, sec(s).t0 - 9, sec(s).t0 - 8.5, t_06 - .2);
    person(c, 150, 1560, .6, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_06 ? 'grin' : 'o', armR: T > t_06 ? [2.8, .2] : [.4, .2] });
    src(c, 'Nasdaq 100 · Yahoo Finance', 1400);
  }); }

// 5 · TikTok · ¿Qué lo movió? (según reportes) + Nvidia casi −39 % desde octubre
if (has('porque')) { const s = 'porque', t_i = As(s, 'una inflación'), t_a = As(s, 'inteligencia artificial,'), t_r = As(s, 'propuestas de aranceles.'), t_n = As(s, 'Envidia, por ejemplo,');
  hit(t_i + .1, 10, 'impact'); hit(t_a + .1, 10, 'impact'); hit(t_r + .1, 10, 'impact'); hit(t_n + .3, 16, 'stamp');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, '¿QUÉ LO MOVIÓ?', 540, 210, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) }); tag(c, 'SEGÚN LOS REPORTES', 540, 320, { size: 28, bg: C.paper, sc: pb(T, sec(s).t0 + .2) });
    [['INFLACIÓN MÁS ALTA DE LO ESPERADO', t_i, '#FFB4A6'], ['DUDAS SOBRE EL GASTO EN IA', t_a, C.lav], ['NUEVAS PROPUESTAS DE ARANCELES', t_r, C.goldL]].forEach(([w, t, col], k) => {
      const g = pb(T, t); if (g <= 0) return; c.save(); c.translate(540, 460 + k * 140); c.rotate((k - 1) * .02); c.scale(g, g); shp(c, R4(-400, -50, 800, 100), col, { w: 5, lc: C.ink, seed: 8000 + k }); tx(c, w, 0, 3, { size: 36, f: 'ui', max: 760 }); c.restore(); });
    stamp(c, 'NVIDIA: CASI −39 % DESDE OCT.', 540, 960, T, t_n + .3, { size: 50, col: C.red, rot: -.03 });
    src(c, 'Motley Fool y Stock Titan (25 nov. 2026) · NVDA: Yahoo Finance, máx. 6 oct. USD 243,37 → USD 149,30', 1100);
    person(c, 900, 1560, .6, { seed: 12, shirt: C.vio, flip: true, ...idle(T), look: -1, mouth: 'flat', brow: T > t_n ? 1 : 0 });
  }); }

// 6 · Festivo: hoy jueves cerrado por Acción de Gracias · viernes hasta la 1:00 p. m.
if (has('festivo')) { const s = 'festivo', t_c = As(s, 'cerrada por Acción de Gracias,'), t_1 = As(s, 'a la una de la tarde,');
  hit(t_c + .2, 14, 'stamp'); hit(t_1 + .2, 12, 'impact');
  scene(s, TK ? 'news' : 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'ESTA SEMANA', 540, 210, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    [['JUE. 26', 'CERRADA', 'ACCIÓN DE GRACIAS', t_c, '#FFD3CB'], ['VIE. 27', 'HASTA LA 1:00 P. M.', 'HORA DE COLOMBIA', Math.min(t_1, t_c + 1.2), C.goldL]].forEach(([d, a, b, t, col], k) => {
      const g = pb(T, t - .2); if (g <= 0) return; c.save(); c.translate(290 + k * 500, 640); c.scale(g, g); shp(c, R4(-210, -200, 420, 400), col, { w: 5, lc: C.ink, seed: 8100 + k });
      shp(c, R4(-210, -200, 420, 90), C.navy, { sharp: true, w: 4, lc: C.ink, seed: 8110 + k }); tx(c, d, 0, -152, { size: 46, f: 'ui', col: C.paper }); tx(c, a, 0, 10, { size: k ? 36 : 54, f: 'ui', col: k ? C.ink : C.red, max: 380 }); tx(c, b, 0, 110, { size: 26, f: 'ui', al: .8, max: 380 }); c.restore(); });
    stamp(c, 'BOLSA DE EE. UU.', 540, 950, T, t_c + .5, { size: 50, col: C.navy, rot: .03 });
    src(c, 'Horarios oficiales de NYSE y Nasdaq para el 26 y 27 de nov. de 2026', 1080);
    person(c, 540, 1560, .6, { seed: 3, shirt: C.gold, ...idle(T), look: 0, mouth: 'smile', armR: [2.2, .5] });
  }); }

// 7 · TikTok · Lección: el peor y el mejor momento, en el mismo día
if (has('leccion')) { const s = 'leccion', t_p = As(s, 'los peores momentos'), t_m = As(s, 'en un mismo día.');
  hit(t_p + .1, 12, 'impact'); hit(t_m + .1, 16, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'EN UN SOLO DÍA', 540, 210, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    intraChart(c, T, sec(s).t0 - 9, sec(s).t0 - 8.5, sec(s).t0 - 8, { worst: t_p + .2, best: t_p + 1.0 });
    stamp(c, 'LO PEOR Y LO MEJOR, PEGADOS', 540, 1310, T, t_m + .1, { size: 50, col: C.goldD, rot: -.03 });
  }); }

// 8 · Cierre (noche)
if (has('cierre')) { const s = 'cierre', t_a = TK ? As(s, 'Nadie sabe') : As(s, 'Lo peor y lo mejor'), t_p = As(s, TK ? 'importa más tu plan' : 'Importa más tu plan'), t_h = As(s, 'Haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_a + .1, 8, 'ping'); hit(t_p + .1, 12, 'stamp'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, TK ? 'NADIE SABE SI SIGUE O SE DEVUELVE' : 'LO PEOR Y LO MEJOR, EL MISMO DÍA', 540, 300, { size: 50, col: C.chalk, sh: C.goldD, clipP: pr(T, t_a, .6, easeIO), max: 1000 });
    tx(c, 'IMPORTA MÁS TU PLAN QUE EL TITULAR', 540, 400, { size: 50, col: C.lav, sh: null, clipP: pr(T, t_p, .6, easeIO), max: 1000 });
    // titular de periódico que se desvanece frente a una libreta con «MI PLAN»
    const g = pb(T, sec(s).t0 + .3); if (g > 0) { c.save(); c.translate(540, 680); c.scale(g, g); shp(c, R4(-240, -120, 480, 240), C.paper, { sharp: true, w: 5, lc: C.chalk, seed: 8200 }); tx(c, 'MI PLAN', 0, -60, { size: 52, f: 'ui', col: C.ink });
      for (let k = 0; k < 3; k++) { ln(c, [[-170, -5 + k * 45], [170, -5 + k * 45]], { w: 3, col: C.ink, straight: true, seed: 8201 + k, al: .5 }); } c.restore(); }
    tx(c, 'HAZ TU CUENTA', 540, 1000, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada =================
function cover(c) { const t = As('gancho', 'casi como si nada.'); drawScene(c, SC[0], Math.min(t + 1.3, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('nasdaq-bajista', cover);
