// TITÁN · «Los que venden las palas» · Short (sh) y TikTok (tk) · kit híbrido · línea A · adaptado del TEMA de un video de referencia (guion, look y frases propios)
// Fiebre del oro de California (1848, ~300.000 personas) y Samuel Brannan (bateas a USD 0,20 → USD 15; primer millonario de California): Wikipedia.
// NV: NVDA mensual, cierre ajustado (Yahoo Finance), normalizado a oct. 2022 = 1 · ×15,2 a oct. 2026 · −62,8 % nov. 2021 → sep. 2022.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];

// ---------- piezas ----------
function mountain(c, T, k = 1) { shp(c, [[-60, 1250], [260, 760], [420, 930], [620, 640], [900, 1000], [1140, 1250]], '#C9B58C', { w: 6, lc: C.ink, seed: 6001, hatch: shade('#C9B58C', .6), hal: .2 });
  ln(c, [[-40, 1180], [300, 1120], [600, 1170], [900, 1110], [1120, 1160]], { w: 26, col: '#7FB5E8', seed: 6002 });
  for (let k2 = 0; k2 < 6; k2++) { const x = (k2 * 173 + T * 40) % 1100 - 20; c.save(); c.globalAlpha = .7; c.fillStyle = C.paper; c.fillRect(x, 1160 + Math.sin(T * 3 + k2) * 4, 30, 4); c.restore(); } }
function shovel(c, x, y, s, rot, seed) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); ln(c, [[0, -90], [0, 40]], { w: 7, col: '#8C5E31', seed, straight: true });
  shp(c, [[-22, 40], [22, 40], [16, 90], [0, 100], [-16, 90]], '#9AA3B5', { w: 4, lc: C.ink, seed: seed + 1 }); c.restore(); }
function pan(c, x, y, s, seed) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, blob(0, 0, 60, 22, seed, { n: 22, amp: .02 }), '#9AA3B5', { w: 4, lc: C.ink, seed }); c.restore(); }
function digger(c, x, y, s, T, ph, seed) { person(c, x, y, s, { seed, shirt: [C.lav, C.vio, '#3B4466', C.paper][seed % 4], ...idle(T, ph), look: 1, mouth: 'flat', armR: [1.0 + .9 * Math.abs(Math.sin(T * 3 + ph)), .8], armL: [1.2 + .8 * Math.abs(Math.sin(T * 3 + ph)), .6] }); }
function chip(c, x, y, s, T, seed = 6050) { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(Math.sin(T * 1.5) * .04);
  for (let k = -3; k <= 3; k++) { ln(c, [[k * 22, -100], [k * 22, -130]], { w: 5, seed: seed + k + 10, straight: true }); ln(c, [[k * 22, 100], [k * 22, 130]], { w: 5, seed: seed + k + 20, straight: true }); ln(c, [[-100, k * 22], [-130, k * 22]], { w: 5, seed: seed + k + 30, straight: true }); ln(c, [[100, k * 22], [130, k * 22]], { w: 5, seed: seed + k + 40, straight: true }); }
  shp(c, R4(-100, -100, 200, 200), C.navy, { sharp: true, w: 6, lc: C.ink, seed }); shp(c, R4(-60, -60, 120, 120), C.gold, { sharp: true, w: 4, lc: C.ink, seed: seed + 1 }); tx(c, 'IA', 0, 4, { size: 54, f: 'ui', col: C.navy }); c.restore(); }
// gráfico NVDA: x por meses, y lineal hasta 16
function nvChart(c, T, t0, dur, o = {}) { const n = NV.length, x0 = 120, x1 = 980, Z = o.Z ?? 1180, Hh = o.H ?? 640, vmax = o.vmax ?? 16, X = i => x0 + (x1 - x0) * i / (n - 1), Y = v => Z - Hh * v / vmax;
  ln(c, [[x0 - 10, Z], [x1 + 10, Z]], { w: 5, straight: true, seed: 6070 }); [['2021', 0], ['2022', 12], ['2024', 36], ['2026', 60]].forEach(([s, i]) => tx(c, s, X(i), Z + 34, { size: 26, f: 'ui' }));
  const p = pr(T, t0, dur, easeIO), m = Math.max(2, Math.floor((o.from ?? 0) + (n - (o.from ?? 0)) * p));
  if (p > 0) ln(c, NV.slice(0, m).map(([, v], i) => [X(i), Y(v)]), { w: 8, col: o.col || C.goldD, straight: true, seed: 6071 });
  return { X, Y }; }
function src(c, s, y = 1520) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }

// ================= escenas =================
// 1 · Gancho: la montaña llena de gente excavando; una persona con un puesto de palas sonríe; sello «VENDIÓ LAS PALAS»
if (has('gancho')) { const s = 'gancho', t_e = As(s, 'no excavó ni un día.'), t_v = As(s, 'Vendió las palas.');
  hit(.05, 8, 'stamp'); hit(t_e + .1, 8, 'ping'); hit(t_v + .1, 16, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, key(T, [[0, 540], [t_v, 540], [t_v + .7, 700]]), key(T, [[0, 960], [t_v, 960], [t_v + .7, 1080]]), key(T, [[0, 1.0], [t_v, 1.0], [t_v + .7, 1.25]]) + .01 * Math.sin(L * 1.3));
    tx(c, 'LA FIEBRE DEL ORO', 540, 200, { size: 92, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }), max: 1000 });
    tx(c, '¿QUIÉN GANÓ DE VERDAD?', 540, 300, { size: 58, col: C.goldD, sh: C.ink, max: 1000 });
    mountain(c, T);
    for (let k = 0; k < 7; k++) digger(c, 120 + k * 95, 1050 - (k % 2) * 60 - Math.max(0, 300 - Math.abs(k * 95 - 380)) * .5, .38, T, k, 20 + k);
    // puesto de palas abajo a la derecha
    shp(c, R4(640, 1300, 360, 40), '#A8743F', { sharp: true, w: 5, lc: C.ink, seed: 6010 }); for (let k = 0; k < 6; k++) shovel(c, 670 + k * 55, 1260, .7, .12 * Math.sin(T * 2 + k), 6020 + k * 2);
    person(c, 820, 1520, .62, { seed: 5, shirt: C.gold, ...idle(T), look: -1, mouth: 'grin', armR: [2.3, .4] });
    stamp(c, 'VENDIÓ LAS PALAS', 600, 1150, T, t_v + .05, { size: 56, col: C.goldD, rot: -.04 });
  }); }

// 2 · TikTok · 1848: llegan 300.000 personas (contador) caminando hacia la montaña
if (has('fiebre')) { const s = 'fiebre', t_y = As(s, 'mil ochocientos cuarenta y ocho'), t_p = As(s, 'trescientas mil personas');
  hit(t_y + .2, 12, 'stamp'); hit(t_p + .2, 14, 'impact');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L));
    pill(c, '1848', 540, 230, { size: 110, f: 'ui', sc: pb(T, t_y) }); tx(c, 'CALIFORNIA', 540, 380, { size: 56, col: C.goldD, sh: C.ink, sc: pb(T, t_y + .3) });
    mountain(c, T);
    const n = Math.round(300000 * pr(T, t_p - .3, 1.2, easeIO)); pill(c, n.toLocaleString('es-CO').replace(/,/g, '.') + ' PERSONAS', 540, 560, { size: 54, f: 'ui', sc: pb(T, t_p - .3), col: C.paper });
    for (let k = 0; k < 9; k++) { const u = ((T - sec(s).t0) * .12 + k / 9) % 1; person(c, lerp(1150, 200, u), 1420 - (k % 3) * 40, .45, { seed: 30 + k, shirt: [C.lav, C.vio, '#3B4466'][k % 3], flip: true, ...idle(T, k), look: -1, mouth: 'smile', walk: T * 6 + k }); }
    src(c, 'Fiebre del oro de California, 1848–1855 · Wikipedia');
  }); }

// 3 · Brannan: el mostrador con bateas; etiqueta USD 0,20 → USD 15; sello «PRIMER MILLONARIO DE CALIFORNIA»
if (has('historia')) { const s = 'historia', t_n = As(s, 'Sam Brannan'), t_20 = As(s, 'veinte centavos'), t_15 = As(s, 'quince dólares'), t_m = As(s, 'primer millonario');
  const t_c = TK ? As(s, 'él cobraba.') : null;
  hit(t_n + .1, 8, 'ping'); hit(t_20 + .2, 8, 'stamp'); hit(t_15 + .2, 16, 'impact'); if (t_c) hit(t_c + .1, 10, 'stamp'); hit(t_m + .2, 18, 'stamp');
  scene(s, TK ? 'iris' : 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_15, 960], [t_15 + .6, 900]]), key(T, [[0, 1.0], [t_15, 1.0], [t_15 + .6, 1.06]]) + .012 * Math.sin(L));
    tx(c, 'SAM BRANNAN', 540, 220, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) }); tx(c, 'COMERCIANTE', 540, 320, { size: 46, col: C.goldD, sh: null, al: pr(T, t_n, .4) });
    shp(c, R4(80, 900, 920, 60), '#A8743F', { sharp: true, w: 5, lc: C.ink, seed: 6101 }); shp(c, R4(80, 960, 920, 200), '#8C5E31', { sharp: true, w: 5, lc: C.ink, seed: 6102 });
    for (let k = 0; k < 7; k++) pan(c, 160 + k * 120, 880 - (k % 2) * 30, .9, 6110 + k); for (let k = 0; k < 4; k++) shovel(c, 760 + k * 60, 760, .9, -.2 + k * .1, 6120 + k * 2);
    const g = pr(T, t_15 - .1, .7, easeIO); c.save(); c.translate(380, 620); c.rotate(-.06 + Math.sin(T * 3) * .02); c.scale(1 + .4 * g, 1 + .4 * g);
    shp(c, [[-130, -55], [120, -55], [160, 0], [120, 55], [-130, 55]], g > .5 ? C.red : C.gold, { sharp: true, w: 5, lc: C.ink, seed: 6130 }); tx(c, g > .5 ? 'USD 15' : 'USD 0,20', -5, 4, { size: 48, f: 'ui', col: g > .5 ? C.paper : C.ink, sc: pb(T, t_20) }); c.restore();
    tx(c, '×75', 760, 600, { size: 100, col: C.red, sh: C.ink, sc: pb(T, t_15 + .4) });
    if (t_c) tag(c, 'ENCONTRARAN ORO O NO, ÉL COBRABA', 540, 1230, { size: 34, bg: C.goldL, sc: pb(T, t_c - .4) });
    stamp(c, 'PRIMER MILLONARIO DE CALIFORNIA', 540, 1350, T, t_m + .1, { size: 46, col: C.goldD, rot: -.03 });
    person(c, 920, 1520, .55, { seed: 5, shirt: C.gold, flip: true, ...idle(T), look: -1, mouth: 'grin', armR: [2.4, .4] });
    src(c, 'Samuel Brannan · Wikipedia');
  }); }

// 4 · Hoy: la fiebre de la IA; el chip en el centro con empresas haciendo fila; el gráfico ×15 desde oct. 2022
if (has('hoy')) { const s = 'hoy', t_i = As(s, 'inteligencia artificial,'), t_e = As(s, 'Envidia'), t_o = As(s, 'octubre de dos mil veintidós,'), t_15 = As(s, 'por quince.'), t_c = TK ? null : As(s, 'había caído');
  hit(t_i + .1, 8, 'ping'); hit(t_e + .1, 10, 'stamp'); hit(t_15 + .1, 18, 'impact'); if (t_c) hit(t_c + .3, 14, 'stamp');
  scene(s, TK ? 'drop' : 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    tx(c, 'LA FIEBRE DE HOY: LA IA', 540, 220, { size: 72, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    if (T < t_o - .2) { chip(c, 540, 760, 1.4 * pb(T, sec(s).t0 + .1), T);
      for (let k = 0; k < 6; k++) { const a = k / 6 * TAU + T * .4, r = 380; c.save(); c.translate(540 + Math.cos(a) * r, 760 + Math.sin(a) * r * .7); shp(c, R4(-70, -34, 140, 68), [C.lav, C.paper, C.goldL][k % 3], { sharp: true, w: 4, lc: C.ink, seed: 6140 + k }); tx(c, 'EMPRESA', 0, 3, { size: 24, f: 'ui' }); c.restore(); }
      pill(c, 'NVIDIA VENDE LOS CHIPS', 540, 1260, { size: 46, f: 'ui', sc: pb(T, t_e) }); return; }
    tag(c, 'NVIDIA · ACCIÓN (CIERRE MENSUAL AJUSTADO)', 540, 320, { size: 28, bg: C.goldL });
    const { X, Y } = nvChart(c, T, t_o - .2, Math.max(1.2, t_15 - t_o), { from: 21 });
    if (T > t_o - .2) { c.save(); c.fillStyle = C.red; c.beginPath(); c.arc(X(21), Y(1), 12, 0, TAU); c.fill(); c.restore(); tx(c, 'OCT. 2022', X(21) + 20, Y(1) + 50, { size: 26, f: 'ui', col: C.red }); }
    pill(c, '×15', 820, Y(15.2) + 40, { size: 80, f: 'ui', sc: pb(T, t_15) }); burst(c, 820, Y(15.2) + 40, T, t_15 + .1, { R: 200, n: 18 });
    if (t_c) stamp(c, 'ANTES CAYÓ −63 %', 400, 640, T, t_c + .2, { size: 50, col: C.red, rot: -.04 });
    src(c, 'Yahoo Finance · NVDA mensual con dividendos · oct. 2022 → oct. 2026');
  }); }

// 5 · TikTok · Las palas también se caen: zoom al tramo nov. 2021 → sep. 2022 (−63 %)
if (has('cae')) { const s = 'cae', t_o = As(s, 'Pero ojo:'), t_n = As(s, 'noviembre de dos mil veintiuno'), t_p = As(s, 'sesenta y tres por ciento.');
  hit(t_o + .1, 10, 'stamp'); hit(t_n + .2, 8, 'ping'); hit(t_p + .2, 18, 'stamp');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    tx(c, 'LAS PALAS TAMBIÉN SE CAEN', 540, 220, { size: 66, col: C.red, sh: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    // tramo 2021-01 → 2023-06 con escala hasta 3
    const seg = NV.slice(0, 30), x0 = 140, x1 = 960, Z = 1150, Hh = 620, X = i => x0 + (x1 - x0) * i / 29, Y = v => Z - Hh * v / 3;
    ln(c, [[x0 - 10, Z], [x1 + 10, Z]], { w: 5, straight: true, seed: 6150 }); [['2021', 0], ['2022', 12], ['2023', 24]].forEach(([s2, i]) => tx(c, s2, X(i), Z + 34, { size: 26, f: 'ui' }));
    const p = pr(T, sec(s).t0, Math.max(1.5, t_p - sec(s).t0 - .3), easeIO); ln(c, seg.slice(0, Math.max(2, Math.floor(30 * p))).map(([, v], i) => [X(i), Y(v)]), { w: 8, col: C.red, straight: true, seed: 6151 });
    if (T > t_n) { pill(c, 'NOV. 2021', X(10), Y(2.419) - 60, { size: 30, f: 'ui', sc: pb(T, t_n) }); }
    if (T > t_p - .4) { c.save(); c.setLineDash([12, 8]); c.strokeStyle = C.red; c.lineWidth = 5; c.beginPath(); c.moveTo(X(10), Y(2.419)); c.lineTo(X(20), Y(2.419)); c.lineTo(X(20), Y(.9)); c.stroke(); c.restore(); pill(c, 'SEP. 2022', X(20) + 40, Y(.9) + 60, { size: 30, f: 'ui', sc: pb(T, t_p - .3) }); }
    stamp(c, '−63 %', 740, 560, T, t_p + .1, { size: 110, col: C.red, rot: -.05 });
    person(c, 960, 1560, .5, { seed: 9, shirt: C.navy, flip: true, ...idle(T), look: -1, mouth: 'o', brow: 1, sweat: T > t_p ? T : 0 });
    src(c, 'Yahoo Finance · NVDA cierre mensual ajustado · nov. 2021 → sep. 2022: −62,8 %');
  }); }

// 6 · Cierre (noche)
if (has('cierre')) { const s = 'cierre', t_v = TK ? As(s, 'no te salva') : As(s, 'también se caen.'), t_q = TK ? As(s, 'quién gana') : As(s, 'seguir una fiebre,'), t_h = As(s, 'Haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  const t_r = TK ? As(s, 'cuánto riesgo') : null;
  hit(t_v + .1, 10, 'stamp'); hit(t_q + .1, 8, 'ping'); if (t_r) hit(t_r + .1, 8, 'ping'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, TK ? 'VENDER LAS PALAS NO TE SALVA' : 'LAS PALAS TAMBIÉN SE CAEN', 540, 280, { size: 58, col: C.chalk, sh: C.goldD, clipP: pr(T, Math.min(t_v - .2, sec(s).t0 + .1), .6, easeIO), max: 1000 });
    if (TK) tx(c, 'DE LA VOLATILIDAD', 540, 370, { size: 58, col: C.chalk, sh: C.goldD, clipP: pr(T, t_v + .3, .6, easeIO), max: 1000 });
    tx(c, TK ? '¿QUIÉN GANA PASE LO QUE PASE?' : 'ANTES DE SEGUIR UNA FIEBRE', 540, 560, { size: 56, col: C.lav, sh: null, clipP: pr(T, t_q - .1, .6, easeIO), max: 1000 });
    if (t_r) tx(c, '¿CUÁNTO RIESGO AGUANTAS?', 540, 660, { size: 56, col: C.lav, sh: null, clipP: pr(T, t_r - .1, .6, easeIO), max: 1000 });
    for (let k = 0; k < 3; k++) shovel(c, 400 + k * 140, 860 + Math.sin(T * 2 + k) * 8, .9, (k - 1) * .25, 6200 + k * 2);
    tx(c, 'HAZ TU CUENTA', 540, 1080, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

function cover(c) { const t = As('gancho', 'Vendió las palas.'); drawScene(c, SC[0], Math.min(t + 1.0, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('palas', cover);
