// TITÁN · «El 1 % que te come una cuarta parte» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js) · línea A · serie «La cuenta que nadie hace»
// EJEMPLO HIPOTÉTICO (cálculo TITÁN): USD 10.000 · 7 % anual 30 años → 76.123 · con 1 % de comisión (≈ 6 %) → 57.435 · diferencia 18.688 (−24,5 %).
// Comisión del año 1 ≈ USD 100; del año 30 ≈ USD 542 (1 % sobre el saldo de cada año).
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const usd = v => 'USD ' + Math.round(v).toLocaleString('es-CO').replace(/,/g, '.');
function hipo(c, y = 320) { tag(c, 'EJEMPLO HIPOTÉTICO', 540, y, { size: 28, bg: C.paper }); }
const V7 = y => 10000 * Math.pow(1.07, y), V6 = y => 10000 * Math.pow(1.06, y), FEE = y => 10000 * Math.pow(1.06, y - 1) * .01;

// ---------- piezas ----------
const QX0 = 150, QX1 = 930, QZ = 1200, QH = 640, QMAX = 80000;
const qx = y => QX0 + (QX1 - QX0) * y / 30, qy = v => QZ - QH * v / QMAX;
function growth(c, T, t7, d7, t6, d6, o = {}) {
  ln(c, [[QX0 - 20, QZ], [QX1 + 20, QZ]], { w: 5, straight: true, seed: 9800 }); ln(c, [[QX0 - 20, QZ], [QX0 - 20, QZ - QH - 20]], { w: 4, straight: true, seed: 9801 });
  [0, 10, 20, 30].forEach(y => tx(c, 'AÑO ' + y, qx(y), QZ + 34, { size: 22, f: 'ui', al: .75 }));
  [20000, 40000, 60000, 80000].forEach(v => tx(c, (v / 1000) + ' mil', QX0 - 32, qy(v), { size: 20, f: 'ui', align: 'right', al: .6 }));
  const curve = (f, p, col, seed) => { if (p <= 0) return; const pts = []; for (let y = 0; y <= 30; y += .5) pts.push([qx(y), qy(f(y))]); ln(c, pts, { w: 8, col, p, seed }); };
  const p7 = pr(T, t7, d7, easeIO), p6 = t6 != null ? pr(T, t6, d6, easeIO) : 0;
  curve(V7, p7, C.goldD, 9810); curve(V6, p6, C.red, 9820);
  if (p7 > 0) { const y = 30 * p7; pill(c, usd(p7 >= 1 ? 76123 : V7(y)), Math.min(840, qx(y)), qy(V7(y)) - 60, { size: 32, f: 'ui', col: C.gold }); }
  if (p6 > 0) { const y = 30 * p6; pill(c, usd(p6 >= 1 ? 57435 : V6(y)), Math.min(840, qx(y)), qy(V6(y)) + 62, { size: 32, f: 'ui', col: '#FFB4A6' }); }
  tag(c, '— 7 % AL AÑO', 300, 540, { size: 26, bg: C.goldL, sc: pb(T, t7) }); if (t6 != null) tag(c, '— CON 1 % DE COMISIÓN', 700, 540, { size: 26, bg: '#FFD3CB', sc: pb(T, t6) });
  if (o.gap && T > o.gap) { const g = pr(T, o.gap, .5, easeIO), x = qx(30) + 30; ln(c, [[x, qy(76123)], [x, qy(76123) + (qy(57435) - qy(76123)) * g]], { w: 7, col: C.red, straight: true, seed: 9830 });
    stamp(c, '−' + usd(18688), 640, 760, T, o.gap + .3, { size: 52, col: C.red, rot: -.04 }); } }
function feeBars(c, T, t0, tL, y0 = 1180) { const K = 520 / 560;
  for (let y = 1; y <= 30; y++) { const g = pr(T, t0 + y * .04, .35, easeOutBack); if (g <= 0) continue; const x = 150 + (y - 1) * 26, h = FEE(y) * K * g;
    shp(c, R4(x, y0 - h, 20, h), y === 1 || y === 30 ? C.red : '#F3B0A2', { sharp: true, w: 2, lc: C.ink, seed: 9900 + y }); }
  ln(c, [[130, y0], [940, y0]], { w: 5, straight: true, seed: 9940 });
  pill(c, 'AÑO 1: ' + usd(100), 260, y0 - 140, { size: 32, f: 'ui', sc: pb(T, t0 + .3), col: '#FFB4A6' });
  pill(c, 'AÑO 30: ' + usd(542), 800, y0 - 590, { size: 32, f: 'ui', sc: pb(T, tL), col: '#FFB4A6' }); tx(c, 'COMISIÓN DE CADA AÑO', 540, y0 + 40, { size: 26, f: 'ui', al: .8 }); }

// ================= escenas =================
// 1 · Gancho: cuatro pilas de monedas; una mano «1 %» se lleva una → «CASI 1/4 DE TU PLATA»
if (has('gancho')) { const s = 'gancho', t_1 = As(s, 'uno por ciento'), t_q = As(s, 'casi una cuarta parte');
  hit(.05, 8, 'stamp'); hit(t_1 + .2, 10, 'impact'); hit(t_q + .3, 18, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_q, 960], [t_q + .6, 930]]), key(T, [[0, 1.0], [t_q, 1.0], [t_q + .6, 1.06]]) + .01 * Math.sin(L * 1.3));
    tx(c, 'SOLO 1 %', 540, 190, { size: 120, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, 'AL AÑO', 540, 300, { size: 70, col: C.goldD, sh: C.ink });
    const take = pr(T, t_q, .9, easeIO);
    for (let p = 0; p < 4; p++) { const dx = p === 3 ? take * 420 : 0, dy = p === 3 ? -take * 260 : 0;
      for (let k = 0; k < 7; k++) { const g = pr(T, .1 + p * .1 + k * .03, .3, easeOutBack); if (g <= 0) continue; c.save(); c.translate(230 + p * 200 + dx, 900 - k * 34 + dy); c.scale(g, g);
        shp(c, R4(-70, -18, 140, 36), C.gold, { w: 4, lc: C.ink, seed: 9700 + p * 10 + k }); c.restore(); } }
    if (T > t_1) { const u = pr(T, t_1, .5, easeOutBack); c.save(); c.translate(lerp(1150, 830, u) + take * 420, 640 - take * 260); shp(c, blob(0, 0, 90, 70, 9750, { n: 22, amp: .05 }), C.red, { w: 5, lc: C.ink, seed: 9750 }); tx(c, '1 %', 0, 4, { size: 54, f: 'ui', col: C.paper }); c.restore(); }
    stamp(c, 'CASI 1/4 DE TU PLATA', 540, 1170, T, t_q + .5, { size: 66, col: C.red, rot: -.04 });
    person(c, 140, 1560, .6, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_q ? 'o' : 'smile', brow: T > t_q ? 1 : 0, sweat: T > t_q + .4 ? T : 0 });
  }); }

// 2 · La cuenta: la curva al 7 % (y en el Short, también la del 6 %)
if (has('cuenta')) { const s = 'cuenta', t_10 = As(s, 'diez mil dólares'), t_76 = As(s, 'setenta y seis mil cien.');
  const t_c = TK ? null : As(s, 'Con una comisión'), t_57 = TK ? null : As(s, 'cincuenta y siete mil cuatrocientos.');
  hit(t_10 + .1, 8, 'ping'); hit(t_76 + .2, 14, 'impact'); if (t_c) { hit(t_c + .1, 10, 'stamp'); hit(t_57 + .2, 16, 'impact'); }
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_76, 1.0], [t_76 + .6, 1.03]]) + .012 * Math.sin(L)); hipo(c, 320);
    tx(c, usd(10000) + ' · 30 AÑOS', 540, 210, { size: 76, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    growth(c, T, sec(s).t0 + .3, t_76 - sec(s).t0, t_c, t_c ? t_57 - t_c + .2 : 0);
    person(c, 960, 1560, .55, { seed: 9, shirt: C.navy, flip: true, ...idle(T), look: -1, mouth: t_57 && T > t_57 ? 'o' : 'grin' });
  }); }

// 3 · TikTok · Con 1 % de comisión: la curva roja se queda abajo → USD 57.435
if (has('comision')) { const s = 'comision', t_c = As(s, 'si te cobran'), t_6 = As(s, 'ganas seis.'), t_57 = As(s, 'cincuenta y siete mil cuatrocientos.');
  hit(t_c + .1, 10, 'stamp'); hit(t_6 + .1, 8, 'ping'); hit(t_57 + .2, 16, 'impact');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_57, 1.0], [t_57 + .6, 1.04]]) + .012 * Math.sin(L)); hipo(c, 320);
    tx(c, 'CON 1 % DE COMISIÓN', 540, 210, { size: 74, col: C.red, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    growth(c, T, sec(s).t0 - 5, .01, t_c + .2, t_57 - t_c);
    pill(c, '7 % − 1 % = 6 %', 760, 700, { size: 40, f: 'ui', sc: pb(T, t_6), col: '#FFB4A6' });
    person(c, 960, 1560, .55, { seed: 9, shirt: C.navy, flip: true, ...idle(T), look: -1, mouth: T > t_57 ? 'o' : 'flat', brow: T > t_57 ? 1 : 0 });
  }); }

// 4 · TikTok · La diferencia: USD 18.688 menos, casi una cuarta parte
if (has('diferencia')) { const s = 'diferencia', t_d = As(s, 'dieciocho mil setecientos'), t_c = As(s, 'Casi una cuarta parte,'), t_p = As(s, 'parecía pequeño.');
  hit(t_d + .3, 18, 'stamp'); hit(t_c + .1, 12, 'impact'); hit(t_p + .1, 8, 'ping');
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 940], [t_d, 940], [t_d + .6, 900]]), key(T, [[0, 1.0], [t_d, 1.0], [t_d + .6, 1.06]]) + .012 * Math.sin(L)); hipo(c, 320);
    tx(c, 'LA DIFERENCIA', 540, 210, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    growth(c, T, sec(s).t0 - 5, .01, sec(s).t0 - 5, .01, { gap: t_d - .2 });
    pill(c, '−24,5 % · CASI 1/4', 560, 880, { size: 44, f: 'ui', sc: pb(T, t_c), col: '#FFB4A6' });
    person(c, 140, 1560, .6, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: 'o', brow: 1, sweat: T });
  }); }

// 5 · Por qué: la comisión de cada año crece (USD 100 → USD 542) · interés compuesto en tu contra
if (has('porque')) { const s = 'porque', t_c = As(s, TK ? 'Se cobra cada año,' : 'se cobra cada año'), t_y = TK ? As(s, 'el año treinta,') : null, t_i = TK ? As(s, 'interés compuesto,') : null;
  const t_d = TK ? null : As(s, 'dieciocho mil setecientos dólares menos,');
  hit(t_c + .1, 10, 'impact'); if (t_y) hit(t_y + .2, 14, 'stamp'); if (t_i) hit(t_i + .2, 14, 'stamp'); if (t_d) hit(t_d + .2, 16, 'stamp');
  scene(s, TK ? 'wipe' : 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L)); hipo(c, 320);
    tx(c, TK ? '¿POR QUÉ?' : '−' + usd(18688), 540, 210, { size: 100, col: TK ? C.ink : C.red, sc: pb(T, sec(s).t0 - .3) });
    feeBars(c, T, t_c - .2, t_y ?? (t_c + 1.6), 1180);
    if (t_i) stamp(c, 'INTERÉS COMPUESTO EN TU CONTRA', 540, 1300, T, t_i + .2, { size: 44, col: C.red, rot: -.03 });
    else tag(c, 'SE COBRA CADA AÑO SOBRE TODO LO QUE CRECIÓ', 540, 1300, { size: 28, bg: '#FFD3CB', sc: pb(T, t_c + .4) });
  }); }

// 6 · TikTok · Ojo: cobrar no es malo · el problema es no saber cuánto te cobran
if (has('ojo')) { const s = 'ojo', t_m = As(s, 'cobrar no es malo.'), t_a = As(s, 'Administrar tu plata cuesta.'), t_n = As(s, 'no saber cuánto te cobran.');
  hit(t_m + .1, 8, 'ping'); hit(t_a + .1, 8, 'ping'); hit(t_n + .1, 16, 'stamp');
  scene(s, 'news', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'OJO', 540, 220, { size: 140, col: C.red, sc: pb(T, sec(s).t0 - .2) });
    shp(c, R4(300, 400, 480, 520), C.paper, { sharp: true, w: 5, lc: C.ink, seed: 9960 }); tx(c, 'CONTRATO', 540, 460, { size: 34, f: 'ui' });
    for (let k = 0; k < 5; k++) ln(c, [[340, 520 + k * 50], [740, 520 + k * 50]], { w: 3, straight: true, seed: 9961 + k, al: .45 });
    pill(c, 'COMISIÓN ANUAL: ¿?', 540, 830, { size: 38, f: 'ui', sc: pb(T, t_a + .3), col: '#FFB4A6' });
    stamp(c, '¿CUÁNTO ME COBRAN?', 540, 1080, T, t_n + .1, { size: 60, col: C.goldD, rot: -.03 });
    person(c, 900, 1560, .6, { seed: 12, shirt: C.vio, flip: true, ...idle(T), look: -1, mouth: 'flat', armR: [2.3, .3] });
  }); }

// 7 · Cierre (noche): pregunta la comisión anual · haz tu cuenta
if (has('cierre')) { const s = 'cierre', t_p = As(s, TK ? 'pregunta la comisión anual' : 'Pregunta la comisión anual'), t_h = As(s, TK ? 'haz tu cuenta.' : 'haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_p + .1, 12, 'stamp'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, 'ANTES DE INVERTIR,', 540, 300, { size: 60, col: C.chalk, sh: C.goldD, clipP: pr(T, sec(s).t0, .6, easeIO), max: 1000 });
    tx(c, 'PREGUNTA LA COMISIÓN ANUAL', 540, 400, { size: 58, col: C.lav, sh: null, clipP: pr(T, t_p, .6, easeIO), max: 1000 });
    tx(c, '1 %', 540, 640, { size: 180 * (1 + .04 * Math.sin(T * 4)), col: '#FFB4A6', sh: null, sc: pb(T, sec(s).t0 + .3) });
    tx(c, 'HAZ TU CUENTA', 540, 1000, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada: el gancho con «CASI 1/4 DE TU PLATA» =================
function cover(c) { const t = As('gancho', 'casi una cuarta parte'); drawScene(c, SC[0], Math.min(t + 1.5, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('comision-1', cover);
