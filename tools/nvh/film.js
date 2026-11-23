// TITÁN · «Nvidia: una sola persona movió la acción» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js) · línea A · noticia del 23 nov 2026
// NVS (inyectada por build.sh): cierres diarios reales de NVDA (Yahoo Finance) del 4 al 23 nov 2026; el último es el cierre oficial de hoy.
// No se dibujan personas reales: una silla de «CEO» vacía y personajes genéricos. Lo personal va como «escándalo personal · según reportes».
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const usd = v => 'USD ' + v.toFixed(2).replace('.', ',');
const CLOSE = NVS[NVS.length - 1][1], I11 = NVS.findIndex(r => r[0] === '11 Nov'), I20 = NVS.findIndex(r => r[0] === '20 Nov');
const DOWN = (NVS[I20][1] / NVS[I11][1] - 1) * 100, UP = (CLOSE / NVS[I20][1] - 1) * 100;
function src(c, s, y = 1312) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }

// ---------- piezas ----------
// gráfico diario: tramo normal (lavanda), caída (rojo) y rebote de hoy (dorado); p0..p2 = progreso de cada tramo
const GX0 = 140, GX1 = 940, GZ = 1180, GH = 560, VMIN = 110, VMAX = 210;
const gxx = i => GX0 + (GX1 - GX0) * i / (NVS.length - 1), gyy = v => GZ - GH * (v - VMIN) / (VMAX - VMIN);
function nchart(c, T, p0, p1, p2, o = {}) {
  ln(c, [[GX0 - 20, GZ + 20], [GX1 + 30, GZ + 20]], { w: 5, straight: true, seed: 8000 });
  [125, 150, 175, 200].forEach(v => { tx(c, '' + v, GX0 - 34, gyy(v), { size: 22, f: 'ui', align: 'right', al: .6 }); c.save(); c.globalAlpha = .15; c.strokeStyle = C.ink; c.lineWidth = 2; c.beginPath(); c.moveTo(GX0 - 20, gyy(v)); c.lineTo(GX1 + 30, gyy(v)); c.stroke(); c.restore(); });
  ['4 NOV', '11 NOV', '20 NOV', 'HOY'].forEach((d, k) => { const i = [0, I11, I20, NVS.length - 1][k]; tx(c, d, gxx(i) + (k === 2 ? -34 : k === 3 ? 30 : 0), GZ + 56, { size: 24, f: 'ui', col: k === 3 ? C.goldD : C.ink, al: .85 }); });
  const seg = (a, b, col, p, seed) => { if (p <= 0) return; ln(c, NVS.slice(a, b + 1).map((r, j) => [gxx(a + j), gyy(r[1])]), { w: 8, col, p, straight: true, seed }); };
  seg(0, I11, C.vio, p0, 8010); seg(I11, I20, C.red, p1, 8020); seg(I20, NVS.length - 1, C.goldD, p2, 8030);
  if (p0 >= 1 && o.dot11 !== false) { c.fillStyle = C.ink; c.beginPath(); c.arc(gxx(I11), gyy(NVS[I11][1]), 10, 0, TAU); c.fill(); }
  if (p1 >= 1) pill(c, usd(NVS[I20][1]), gxx(I20) - 40, gyy(NVS[I20][1]) + 70, { size: 30, f: 'ui', col: '#FFB4A6', sc: o.s20 ?? 1 });
  if (p2 >= 1) pill(c, usd(CLOSE), gxx(NVS.length - 1) - 60, gyy(CLOSE) - 64, { size: 32, f: 'ui', col: C.gold, sc: o.sC ?? 1 }); }
// silla de «CEO» (vacía o con un personaje genérico)
function chair(c, x, y, s, rot, o = {}) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  shp(c, R4(-90, -230, 180, 200), C.navy, { w: 6, lc: C.ink, seed: 8100 }); shp(c, R4(-110, -40, 220, 50), C.navy, { w: 6, lc: C.ink, seed: 8101 });
  ln(c, [[0, 10], [0, 110]], { w: 10, straight: true, seed: 8102 }); ln(c, [[-80, 130], [80, 130]], { w: 8, straight: true, seed: 8103 });
  tag(c, 'CEO', 0, -140, { size: 34, bg: C.gold, rot: 0 }); c.restore(); }
function board(c, T, x, y, tVote, n = 5) {   // mesa de la junta: todos levantan la mano en el voto
  shp(c, R4(x - 380, y - 30, 760, 70), '#6B4F3A', { w: 6, lc: C.ink, seed: 8200 });
  for (let k = 0; k < n; k++) { const px = x - 320 + k * 160, up = T > tVote + k * .12; person(c, px, y - 20, .55, { seed: 40 + k, shirt: [C.lav, C.vio, '#3B4466', C.paper, C.navy][k % 5], ...idle(T, k), look: 0, mouth: up ? 'smile' : 'flat', armR: up ? [2.9, .2] : [.3, .2] }); } }

// ================= escenas =================
// 1 · Gancho: la línea cae en rojo y rebota en dorado → «UNA SOLA PERSONA» con la silla de CEO
if (has('gancho')) { const s = 'gancho', t_c = As(s, 'cayó casi veintiocho'), t_s = As(s, 'Y hoy subió'), t_r = As(s, '¿La razón?'), t_u = As(s, 'Una sola persona.');
  hit(.05, 8, 'stamp'); hit(t_c + .3, 14, 'impact'); hit(t_s + .3, 16, 'impact'); hit(t_u + .1, 18, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_u, 960], [t_u + .6, 930]]), key(T, [[0, 1.0], [t_u, 1.0], [t_u + .6, 1.05]]) + .01 * Math.sin(L * 1.3));
    tx(c, 'NVIDIA', 540, 180, { size: 110, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, '−28 % Y LUEGO +' + Math.round(UP) + ' %', 540, 290, { size: 64, col: C.goldD, sh: C.ink, max: 1000 });
    nchart(c, T, pr(T, .1, .6, easeIO), pr(T, t_c - .3, .7, easeIO), pr(T, t_s, .4, easeIO), { s20: pb(T, t_c + .2), sC: pb(T, t_s + .3) });
    pill(c, '−' + Math.abs(DOWN).toFixed(1).replace('.', ',') + ' %', 560, 1000, { size: 46, f: 'ui', col: '#FFB4A6', sc: pb(T, t_c + .3) });
    pill(c, '+' + UP.toFixed(1).replace('.', ',') + ' % HOY', 760, 520, { size: 46, f: 'ui', col: C.gold, sc: pb(T, t_s + .4) });
    stamp(c, 'UNA SOLA PERSONA', 540, 1350, T, t_u + .1, { size: 66, col: C.red, rot: -.04 });
    if (T > t_r) chair(c, 170, 1560, .55 * pb(T, t_r), .08 * Math.sin(T * 3));
    person(c, 920, 1560, .55, { seed: 5, shirt: C.gold, flip: true, ...idle(T), look: -1, mouth: T > t_s ? 'o' : 'flat', brow: T > t_c ? 1 : 0, sweat: T > t_c && T < t_s ? T : 0 });
  }); }

// 2 · TikTok · La salida (11 nov): la silla de CEO queda vacía y gira; un personaje genérico sale con su caja; titulares
if (has('salida')) { const s = 'salida', t_11 = As(s, 'El once de noviembre,'), t_e = As(s, 'escándalo personal.'), t_r = As(s, 'Según reportes,'), t_s = As(s, 'posible espía de China.'), t_n = As(s, 'China lo niega.');
  hit(t_11 + .1, 8, 'ping'); hit(t_e + .1, 14, 'stamp'); hit(t_r + .1, 6, 'ping'); hit(t_s + .2, 14, 'impact'); hit(t_n + .1, 10, 'stamp');
  scene(s, 'news', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, '11 DE NOVIEMBRE', 540, 200, { size: 86, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    tag(c, 'EL FUNDADOR DEJA DE SER CEO', 540, 310, { size: 34, bg: C.goldL, sc: pb(T, t_11 + .3) });
    chair(c, 540, 820, 1.0, .25 * Math.sin((T - sec(s).t0) * 2.2));
    const u = pr(T, sec(s).t0 + .3, 2.6, easeIO); person(c, lerp(640, 1180, u), 1040, .7, { seed: 21, shirt: '#3B4466', ...idle(T), look: 1, mouth: 'flat', walk: u > 0 && u < 1 ? T * 8 : undefined, armR: [1.2, 1.4], armL: [1.2, 1.4] });
    if (u > 0 && u < 1) shp(c, R4(lerp(640, 1180, u) + 20, 900, 110, 80), '#C9A36B', { sharp: true, w: 4, lc: C.ink, seed: 8300 });
    pill(c, 'ESCÁNDALO PERSONAL', 290, 1150, { size: 34, f: 'ui', sc: pb(T, t_e), col: '#FFB4A6' });
    pill(c, 'SEGÚN REPORTES', 790, 1150, { size: 34, f: 'ui', sc: pb(T, t_r) });
    tag(c, 'EE. UU.: ¿POSIBLE ESPÍA DE CHINA?', 540, 1250, { size: 32, bg: C.paper, sc: pb(T, t_s), rot: -.03 });
    stamp(c, 'CHINA LO NIEGA', 540, 1350, T, t_n + .1, { size: 50, col: C.navy, rot: .03 });
    src(c, 'Comunicado de Nvidia a la SEC (8-K) · NPR, Washington Post', 1440);
  }); }

// 3 · TikTok · La caída: de USD 173,73 a USD 125,53 en nueve días
if (has('caida')) { const s = 'caida', t_p = As(s, 'la acción pasó'), t_125 = As(s, 'a ciento veinticinco.'), t_m = As(s, 'Casi veintiocho por ciento menos.');
  hit(t_p + .1, 8, 'ping'); hit(t_125 + .2, 16, 'impact'); hit(t_m + .1, 14, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 950], [t_125, 950], [t_125 + .6, 990]]), key(T, [[0, 1.0], [t_125, 1.0], [t_125 + .6, 1.06]]) + .012 * Math.sin(L));
    tx(c, 'SIN SU FUNDADOR', 540, 200, { size: 90, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    nchart(c, T, 1, pr(T, t_p, t_125 - t_p + .3, easeIO), 0, { s20: pb(T, t_125 + .2) });
    pill(c, usd(NVS[I11][1]), gxx(I11) - 30, gyy(NVS[I11][1]) - 64, { size: 32, f: 'ui', sc: pb(T, sec(s).t0 + .2) });
    stamp(c, '−' + Math.abs(DOWN).toFixed(1).replace('.', ',') + ' %', 700, 540, T, t_m + .1, { size: 70, col: C.red, rot: .05 });
    person(c, 150, 1560, .6, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: 'o', brow: 1, sweat: T > t_125 ? T : 0 });
    src(c, 'NVDA · cierres diarios · Yahoo Finance');
  }); }

// 4 · El regreso: la junta vota por unanimidad (manos arriba) → la línea dorada se dispara; cierre oficial de hoy
function regreso(s, tr, t_v, t_c, tMas) {
  scene(s, tr, (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, key(T, [[0, 1.0], [t_c, 1.0], [t_c + .6, 1.05]]) + .012 * Math.sin(L));
    tx(c, 'HOY: VUELVE', 540, 200, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    if (T < t_c - .6) { board(c, T, 540, 900, t_v); stamp(c, 'VOTO UNÁNIME', 540, 560, T, t_v + .5, { size: 70, col: C.goldD, rot: -.04 });
      tag(c, 'SIN RIESGO PARA LA SEGURIDAD NACIONAL, SEGÚN LA JUNTA', 540, 1440, { size: 24, bg: C.paper, sc: pb(T, t_v + 1.6) }); }
    else { nchart(c, T, 1, 1, pr(T, t_c - .5, .7, easeIO), { sC: pb(T, t_c + .2) });
      stamp(c, '+' + UP.toFixed(1).replace('.', ',') + ' % EN UN DÍA', 540, 470, T, tMas, { size: 70, col: C.goldD, rot: -.03 });
      burst(c, gxx(NVS.length - 1), gyy(CLOSE), T, t_c + .2, { R: 220, n: 18 });
      person(c, 150, 1560, .6, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: 'grin', armR: [2.8, .2], armL: [2.8, .2] }); }
    src(c, 'Comunicado de Nvidia a la SEC (8-K, 23 nov. 2026) · cierre: Yahoo Finance');
  }); }
if (has('regreso')) { const s = 'regreso', t_v = As(s, 'votó por unanimidad'), t_c = As(s, 'Y la acción cerró'), t_m = As(s, 'más en un solo día.');
  hit(t_v + .3, 12, 'stamp'); hit(t_c + .4, 18, 'impact'); hit(t_m + .1, 14, 'stamp'); regreso(s, 'iris', t_v, t_c, t_m + .1); }

// 5 · TikTok · Ojo: la investigación sigue; una subida no garantiza lo que viene
if (has('ojo')) { const s = 'ojo', t_i = As(s, 'la investigación interna'), t_g = As(s, 'no garantiza');
  hit(sec(s).t0 + .1, 8, 'ping'); hit(t_i + .2, 10, 'stamp'); hit(t_g + .1, 14, 'stamp');
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'OJO', 540, 230, { size: 140, col: C.red, sc: pb(T, sec(s).t0 - .2) });
    // lupa sobre un expediente
    shp(c, R4(300, 420, 480, 380), C.paper, { sharp: true, w: 5, lc: C.ink, seed: 8400 }); for (let k = 0; k < 6; k++) ln(c, [[340, 480 + k * 50], [740, 480 + k * 50]], { w: 3, straight: true, seed: 8410 + k, al: .5 });
    const a = T * 1.4; c.save(); c.translate(540 + 90 * Math.cos(a), 610 + 50 * Math.sin(a)); shp(c, blob(0, 0, 90, 90, 8420, { n: 24, amp: .02 }), '#DDEFF8', { w: 8, lc: C.ink, seed: 8420 }); ln(c, [[64, 64], [140, 140]], { w: 16, straight: true, seed: 8421 }); c.restore();
    pill(c, 'LA INVESTIGACIÓN INTERNA SIGUE', 540, 900, { size: 40, f: 'ui', sc: pb(T, t_i) });
    stamp(c, 'UNA SUBIDA NO ES GARANTÍA', 540, 1060, T, t_g + .1, { size: 56, col: C.red, rot: -.03 });
    person(c, 900, 1560, .6, { seed: 12, shirt: C.vio, flip: true, ...idle(T), look: -1, mouth: 'flat', armR: [2.3, .3] });
  }); }

// 6 · Lección: riesgo de persona clave: toda una torre (la empresa) apoyada sobre una sola persona que se tambalea
function keyPerson(c, T, t0, tW, x = 540, y = 1250) { const wob = T > tW ? .06 * Math.sin((T - tW) * 5) * Math.max(0, 1 - (T - tW) / 3) : .01 * Math.sin(T * 2);
  c.save(); c.translate(x, y); c.rotate(wob);
  for (let k = 0; k < 4; k++) { const g = pr(T, t0 + k * .2, .4, easeOutBack); if (g <= 0) continue; const w = 420 - k * 60, yy = -250 - k * 110;
    shp(c, R4(-w / 2, yy, w, 100 * g), [C.navy, '#3B4466', C.vio, C.lav][k], { sharp: true, w: 5, lc: C.ink, seed: 8500 + k }); if (k === 0) tx(c, 'LA EMPRESA', 0, yy + 52, { size: 40, f: 'ui', col: C.paper }); }
  c.restore(); person(c, x, y + 160, .75, { seed: 3, shirt: C.gold, ...idle(T), look: 0, mouth: T > tW ? 'o' : 'flat', brow: T > tW ? 1 : 0, armR: [2.9, .2], armL: [2.9, .2], sweat: T > tW ? T : 0 }); }
if (has('leccion')) { const s = 'leccion', t_n = As(s, 'riesgo de persona clave.'), t_d = As(s, 'una sola persona,'), t_m = As(s, 'para cualquier lado.');
  hit(t_n + .1, 16, 'stamp'); hit(t_d + .1, 10, 'impact'); hit(t_m + .1, 12, 'impact');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'TIENE NOMBRE', 540, 200, { size: 90, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    stamp(c, 'RIESGO DE PERSONA CLAVE', 540, 330, T, t_n + .1, { size: 56, col: C.red, rot: -.03 });
    keyPerson(c, T, sec(s).t0 + .2, t_m - .2, 540, 1180);
  }); }

// 7 · Cierre (noche): no todo en una sola acción, por grande que sea · haz tu cuenta
if (has('cierre')) { const s = 'cierre', t_p = TK ? As(s, 'no ponen todo') : As(s, 'no ponen todo'), t_h = As(s, 'Haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  const t_k = TK ? null : As(s, 'riesgo de persona clave.');
  hit(t_p + .1, 12, 'stamp'); hit(t_h + .1, 14, 'stamp'); if (t_k) hit(t_k + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    if (t_k) tx(c, 'RIESGO DE PERSONA CLAVE', 540, 230, { size: 60, col: '#FFB4A6', sh: null, clipP: pr(T, sec(s).t0, .6, easeIO), max: 1000 });
    tx(c, 'NO TODO EN UNA SOLA ACCIÓN,', 540, 340, { size: 54, col: C.chalk, sh: C.goldD, clipP: pr(T, t_p, .6, easeIO), max: 1000 });
    tx(c, 'POR GRANDE QUE SEA', 540, 430, { size: 60, col: C.lav, sh: null, clipP: pr(T, t_p + .8, .6, easeIO), max: 1000 });
    // canasta con varias monedas
    const g = pb(T, TK ? t_p + .3 : sec(s).t0 + .3); if (g > 0) { c.save(); c.translate(540, 700); c.scale(g, g); shp(c, [[-200, -40], [200, -40], [160, 120], [-160, 120]], '#C9A36B', { sharp: true, w: 6, lc: C.chalk, seed: 8600 });
      for (let k = 0; k < 7; k++) { const xx = -150 + k * 50, yy = -70 - (k % 2) * 30; shp(c, blob(xx, yy, 30, 30, 8610 + k, { n: 16, amp: .02 }), [C.gold, C.lav, C.vio][k % 3], { w: 3, lc: C.chalk, seed: 8610 + k }); } c.restore(); }
    tx(c, 'HAZ TU CUENTA', 540, 1000, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// Short · Historia: salida → caída → voto → cierre de hoy, todo sobre el gráfico
if (has('historia')) { const s = 'historia', t_s = As(s, 'salió el once de noviembre'), t_h = As(s, 'la acción se hundió.'), t_j = As(s, 'Hoy la junta'), t_c = As(s, 'y la acción cerró');
  hit(t_s + .1, 8, 'ping'); hit(t_h + .2, 14, 'impact'); hit(t_j + .2, 12, 'stamp'); hit(t_c + .3, 18, 'impact');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, key(T, [[0, 1.0], [t_c, 1.0], [t_c + .6, 1.05]]) + .012 * Math.sin(L));
    tx(c, T < t_j ? 'SALE EL FUNDADOR' : 'HOY: VUELVE', 540, 200, { size: 90, col: C.ink, sc: pb(T, T < t_j ? sec(s).t0 - .3 : t_j - .1) });
    tag(c, T < t_j ? '11 NOV. · ESCÁNDALO PERSONAL' : 'VOTO UNÁNIME DE LA JUNTA', 540, 310, { size: 32, bg: T < t_j ? '#FFD3CB' : C.goldL, sc: pb(T, T < t_j ? t_s : t_j) });
    nchart(c, T, 1, pr(T, t_s + .2, t_h - t_s + .3, easeIO), pr(T, t_c - .3, .7, easeIO), { s20: pb(T, t_h + .2), sC: pb(T, t_c + .3) });
    stamp(c, '+' + UP.toFixed(1).replace('.', ',') + ' % HOY', 760, 520, T, t_c + .5, { size: 60, col: C.goldD, rot: .04 });
    chair(c, 170, 1560, .5, T < t_j ? .25 * Math.sin(T * 2.2) : 0);
    src(c, 'NVDA · Yahoo Finance · comunicados de Nvidia a la SEC (8-K)');
  }); }

// ================= portada: el gancho con «UNA SOLA PERSONA» =================
function cover(c) { const t = As('gancho', 'Una sola persona.'); drawScene(c, SC[0], Math.min(t + 1.4, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('nvidia-huang', cover);
