// TITÁN · «Tu sueldo tiene techo» · Short (sh) y TikTok (tk) · kit híbrido · línea B · adaptado del TEMA de un video de referencia (guion propio)
// Paradoja del agua y el diamante: Adam Smith, «La riqueza de las naciones» (1776). Salario mínimo 2026: $1.750.905 (Decreto 1469 de 2025).
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];

// ---------- piezas ----------
function glass(c, x, y, s, T, seed = 9001) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, [[-60, -90], [60, -90], [45, 90], [-45, 90]], '#DDEFF8', { w: 5, lc: C.ink, seed });
  c.save(); c.globalAlpha = .8; c.fillStyle = '#7FB5E8'; c.fillRect(-48, -20 + Math.sin(T * 3) * 4, 96, 104); c.restore(); c.restore(); }
function diamond(c, x, y, s, T, seed = 9010) { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(Math.sin(T * 2) * .08); shp(c, [[-80, -30], [-40, -80], [40, -80], [80, -30], [0, 90]], '#BFE3F5', { sharp: true, w: 5, lc: C.ink, seed });
  ln(c, [[-80, -30], [80, -30]], { w: 3, seed: seed + 1, straight: true }); ln(c, [[-40, -80], [0, 90], [40, -80]], { w: 3, seed: seed + 2, straight: true });
  for (let k = 0; k < 3; k++) { const a = T * 3 + k * 2; c.save(); c.globalAlpha = .5 + .5 * Math.sin(a); tx(c, '✦', -100 + k * 100, -110 + k * 20, { size: 30, col: C.gold, sh: null }); c.restore(); } c.restore(); }
function tag2(c, s, x, y, k, col, seed) { if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(.05); c.scale(k, k); shp(c, [[-120, -40], [100, -40], [140, 0], [100, 40], [-120, 40]], col, { sharp: true, w: 4, lc: C.ink, seed }); tx(c, s, -5, 4, { size: 34, f: 'ui', col: C.ink }); c.restore(); }
function sun(c, x, y, r, T) { c.save(); c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); for (let k = 0; k < 10; k++) { const a = k / 10 * TAU + T * .3; ln(c, [[x + Math.cos(a) * r * 1.2, y + Math.sin(a) * r * 1.2], [x + Math.cos(a) * r * 1.5, y + Math.sin(a) * r * 1.5]], { w: 5, col: C.goldD, seed: 9020 + k, straight: true }); } c.restore(); }
function src(c, s, y = 1520) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }

// ================= escenas =================
// 1 · Gancho: agua (casi gratis) vs. diamante (fortuna) · «con tu sueldo pasa lo mismo»
if (has('gancho')) { const s = 'gancho', t_a = As(s, 'El agua'), t_d = As(s, 'Un diamante'), t_f = As(s, 'una fortuna.'), t_s = As(s, 'Con tu sueldo');
  hit(.05, 8, 'stamp'); hit(t_a + .2, 6, 'ping'); hit(t_d + .2, 8, 'ping'); hit(t_f + .1, 14, 'impact'); hit(t_s + .1, 16, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_s, 960], [t_s + .6, 920]]), key(T, [[0, 1.0], [t_s, 1.0], [t_s + .6, 1.06]]) + .01 * Math.sin(L * 1.3));
    tx(c, '¿POR QUÉ VALE MÁS', 540, 200, { size: 80, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }), max: 1000 }); tx(c, 'LO QUE NO SIRVE?', 540, 300, { size: 70, col: C.goldD, sh: C.ink, max: 1000 });
    glass(c, 300, 650, 1.2 * pb(T, t_a - .2), T); diamond(c, 780, 650, 1.3 * pb(T, t_d - .2), T);
    tag2(c, '≈ $0', 300, 880, pb(T, t_a + .8), C.paper, 9030); tag2(c, '$$$$$', 780, 880, pb(T, t_f), C.gold, 9031);
    stamp(c, 'CON TU SUELDO PASA LO MISMO', 540, 1110, T, t_s + .1, { size: 44, col: C.red, rot: -.03 });
    person(c, 540, 1540, .6, { seed: 5, shirt: C.lav, ...idle(T), look: 1, mouth: T > t_s ? 'o' : 'smile', brow: T > t_s ? 1 : 0 });
  }); }

// 2 · TikTok · Adam Smith 1776: el precio lo pone lo escaso (libro + balanza de escasez)
if (has('smith')) { const s = 'smith', t_y = As(s, 'mil setecientos setenta y seis.'), t_e = As(s, 'sino lo escaso.');
  hit(t_y + .2, 12, 'stamp'); hit(t_e + .1, 16, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    pill(c, '1776', 540, 230, { size: 110, f: 'ui', sc: pb(T, t_y - .2) }); tx(c, 'ADAM SMITH', 540, 380, { size: 56, col: C.goldD, sh: C.ink, sc: pb(T, sec(s).t0 + .2) });
    c.save(); c.translate(540, 700); c.rotate(-.05); shp(c, R4(-240, -150, 480, 300), '#6B4FA0', { w: 6, lc: C.ink, seed: 9040 }); ln(c, [[0, -150], [0, 150]], { w: 5, col: C.ink, seed: 9041, straight: true });
    tx(c, 'LA RIQUEZA', -120, -20, { size: 34, f: 'ui', col: C.paper }); tx(c, 'DE LAS NACIONES', -120, 30, { size: 26, f: 'ui', col: C.paper }); c.restore();
    pill(c, 'EL PRECIO NO LO PONE LO ÚTIL', 540, 960, { size: 40, f: 'ui', sc: pb(T, t_e - 1.2), col: C.paper });
    stamp(c, 'LO PONE LO ESCASO', 540, 1110, T, t_e, { size: 64, col: C.goldD, rot: -.03 });
    person(c, 900, 1530, .55, { seed: 12, shirt: C.vio, flip: true, ...idle(T), look: -1, mouth: 'smile', armR: [2.0, .5] });
    src(c, 'Adam Smith, «La riqueza de las naciones», 1776');
  }); }

// 3 · SH «regla» / TikTok «sueldo»: trabajo duro bajo el sol pagado poco porque es fácil de reemplazar; fila de personas iguales; salario mínimo 2026
function line(c, T, n, y, s) { for (let k = 0; k < n; k++) person(c, 140 + k * (800 / (n - 1)), y, s, { seed: 40 + k, shirt: '#3B4466', ...idle(T, k), look: 1, mouth: 'flat' }); }
if (has('regla')) { const s = 'regla', t_a = As(s, 'Adam Smith'), t_e = As(s, 'sino lo escaso.'), t_d = As(s, 'lo duro que trabajas.'), t_r = As(s, 'reemplazarte.'), t_t = As(s, 'tiene un techo:');
  hit(t_a + .2, 10, 'stamp'); hit(t_e + .1, 12, 'stamp'); hit(t_d + .1, 8, 'ping'); hit(t_r + .1, 16, 'stamp'); hit(t_t + .2, 14, 'impact');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    if (T < t_d - .2) { pill(c, 'ADAM SMITH · 1776', 540, 260, { size: 60, f: 'ui', sc: pb(T, sec(s).t0) }); pill(c, 'EL PRECIO NO LO PONE LO ÚTIL', 540, 520, { size: 40, f: 'ui', sc: pb(T, t_a + 1), col: C.paper });
      stamp(c, 'LO PONE LO ESCASO', 540, 700, T, t_e, { size: 64, col: C.goldD, rot: -.03 }); glass(c, 300, 1000, .8, T); diamond(c, 780, 1000, .9, T); return; }
    tx(c, 'TE PAGAN POR LO DIFÍCIL', 540, 220, { size: 66, col: C.ink, max: 1000 }); tx(c, 'QUE ES REEMPLAZARTE', 540, 310, { size: 66, col: C.red, sh: C.ink, sc: pb(T, t_r - .3), max: 1000 });
    line(c, T, 6, 900, .5);
    if (T > t_t - .3) { const g = pr(T, t_t - .3, .5, easeOutBack); ln(c, [[80, 520 + (1 - g) * -300], [1000, 520 + (1 - g) * -300]], { w: 18, col: C.red, straight: true, seed: 9050 }); tx(c, 'TECHO: LAS HORAS DEL DÍA', 540, 470 + (1 - g) * -300, { size: 40, f: 'ui', col: C.red }); }
  }); }
if (has('sueldo')) { const s = 'sueldo', t_d = As(s, 'trabajos más duros'), t_f = As(s, 'es fácil conseguir'), t_m = As(s, 'salario mínimo'), t_v = As(s, 'novecientos cinco pesos,');
  hit(t_d + .1, 8, 'ping'); hit(t_f + .1, 12, 'stamp'); hit(t_m + .1, 8, 'ping'); hit(t_v + .2, 14, 'impact');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    sun(c, 880, 260, 60, T); tx(c, 'LOS TRABAJOS MÁS DUROS', 440, 230, { size: 52, col: C.ink, sc: pb(T, t_d - .2), max: 760 }); tx(c, 'SUELEN PAGAR POCO', 440, 310, { size: 52, col: C.red, sh: C.ink, sc: pb(T, t_d + .5), max: 760 });
    for (let k = 0; k < 4; k++) person(c, 180 + k * 240, 1000, .6, { seed: 50 + k, shirt: C.navy, ...idle(T, k), look: 1, mouth: 'flat', sweat: T, armR: [1.0 + .6 * Math.abs(Math.sin(T * 3 + k)), .8] });
    if (T > t_f - .2) for (let k = 0; k < 4; k++) { const u = pr(T, t_f - .2 + k * .1, .6, easeOutBack); person(c, 180 + k * 240, 1250 + (1 - u) * 300, .45, { seed: 60 + k, shirt: '#3B4466', ...idle(T, k + 3), look: 1, mouth: 'smile' }); }
    stamp(c, 'FÁCIL DE REEMPLAZAR', 540, 560, T, t_f + .3, { size: 52, col: C.red, rot: -.03 });
    pill(c, 'SALARIO MÍNIMO 2026: $1.750.905', 540, 700, { size: 42, f: 'ui', sc: pb(T, t_m) });
    src(c, 'Decreto 1469 de 2025 · salario mínimo mensual 2026');
  }); }

// 4 · TikTok · El techo: reloj de 24 horas; la barra del ingreso se detiene si dejas de trabajar
if (has('techo')) { const s = 'techo', t_t = As(s, 'tu sueldo tiene techo.'), t_h = As(s, 'veinticuatro horas.'), t_d = As(s, 'deja de llegar.');
  hit(t_t + .1, 14, 'stamp'); hit(t_h + .2, 10, 'ping'); hit(t_d + .1, 14, 'impact');
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    tx(c, 'EL TECHO', 540, 220, { size: 110, col: C.red, sh: C.ink, sc: pb(T, sec(s).t0 - .3) });
    ln(c, [[80, 420], [1000, 420]], { w: 20, col: C.red, straight: true, seed: 9060 });
    shp(c, blob(540, 760, 220, 220, 9061, { n: 40, amp: .01 }), C.paper, { w: 6, lc: C.ink, seed: 9061 }); for (let k = 0; k < 24; k++) { const a = k / 24 * TAU - Math.PI / 2; ln(c, [[540 + Math.cos(a) * 190, 760 + Math.sin(a) * 190], [540 + Math.cos(a) * 210, 760 + Math.sin(a) * 210]], { w: 4, seed: 9070 + k, straight: true }); }
    const a = T * 1.5; ln(c, [[540, 760], [540 + Math.cos(a) * 170, 760 + Math.sin(a) * 170]], { w: 8, seed: 9099, straight: true }); pill(c, '24 HORAS', 540, 1040, { size: 50, f: 'ui', sc: pb(T, t_h) });
    stamp(c, 'SI PARAS, DEJA DE LLEGAR', 540, 1200, T, t_d, { size: 50, col: C.red, rot: -.03 });
    person(c, 160, 1530, .55, { seed: 5, shirt: C.lav, ...idle(T), look: 1, mouth: 'flat', sweat: T });
  }); }

// 5 · TikTok · Dos salidas: aprender algo escaso + poner a trabajar una parte (monedas que siguen girando de noche)
if (has('salida')) { const s = 'salida', t_1 = As(s, 'más difícil de reemplazar,'), t_2 = As(s, 'poner a trabajar'), t_h = As(s, 'no tiene horario.');
  hit(t_1 + .1, 10, 'stamp'); hit(t_2 + .1, 10, 'stamp'); hit(t_h + .1, 14, 'impact');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    tx(c, 'DOS SALIDAS', 540, 220, { size: 100, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    card(c, 540, 480, 880, 200, { sc: pb(T, t_1 - .4) }); if (T > t_1 - .4) { tx(c, '1 · APRENDER ALGO ESCASO', 540, 450, { size: 46, col: C.ink }); tx(c, 'Más difícil de reemplazar', 540, 520, { size: 32, f: 'ui', col: C.goldD }); }
    card(c, 540, 760, 880, 200, { sc: pb(T, t_2 - .3), bg: C.goldL }); if (T > t_2 - .3) { tx(c, '2 · INVERTIR UNA PARTE', 540, 730, { size: 46, col: C.ink }); tx(c, 'Lo que inviertes no tiene horario', 540, 800, { size: 32, f: 'ui', col: C.goldD }); }
    if (T > t_h - .3) { const u = T * 2; for (let k = 0; k < 6; k++) { const a = u + k / 6 * TAU; c.save(); c.translate(540 + Math.cos(a) * 200, 1090 + Math.sin(a) * 70); shp(c, blob(0, 0, 26, 26, 9100 + k, { n: 16, amp: .02 }), C.gold, { w: 3, lc: C.ink, seed: 9100 + k }); c.restore(); } tx(c, '24/7', 540, 1100, { size: 60, col: C.goldD, sh: null }); }
    person(c, 920, 1530, .55, { seed: 12, shirt: C.gold, flip: true, ...idle(T), look: -1, mouth: 'grin', armR: [2.3, .4] });
  }); }

// 6 · Cierre (noche)
if (has('cierre')) { const s = 'cierre', t_n = TK ? sec('cierre').t0 + 1 : As(s, 'no tiene horario.'), t_u = As(s, 'Que tu sueldo'), t_h = As(s, 'haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_u + .1, 10, 'stamp'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, TK ? 'blot' : 'iris', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, 'LO QUE INVIERTES NO TIENE HORARIO', 540, 280, { size: 50, col: C.chalk, sh: C.goldD, clipP: pr(T, Math.min(t_n - 1, sec(s).t0 + .1), .6, easeIO), max: 1000 });
    tx(c, 'QUE TU SUELDO NO SEA', 540, 460, { size: 58, col: C.lav, sh: null, clipP: pr(T, t_u - .1, .6, easeIO), max: 1000 }); tx(c, 'LO ÚNICO QUE TRABAJA POR TI', 540, 550, { size: 58, col: C.lav, sh: null, clipP: pr(T, t_u + .5, .6, easeIO), max: 1000 });
    for (let k = 0; k < 6; k++) { const a = T * 1.6 + k / 6 * TAU; c.save(); c.translate(540 + Math.cos(a) * 160, 800 + Math.sin(a) * 50); shp(c, blob(0, 0, 22, 22, 9110 + k, { n: 16, amp: .02 }), C.gold, { w: 3, lc: C.ink, seed: 9110 + k }); c.restore(); }
    tx(c, 'HAZ TU CUENTA', 540, 1060, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

function cover(c) { const t = As('gancho', 'Con tu sueldo'); drawScene(c, SC[0], Math.min(t + 1.8, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('sueldo', cover);
