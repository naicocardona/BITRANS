// TITÁN · «La prima de diciembre» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js) · línea B (plata del día a día)
// CST art. 306 (mod. Ley 1788 de 2016): segunda mitad a más tardar en los primeros 20 días de diciembre; 20 dic 2026 = domingo.
// SMMLV 2026 $1.750.905 (Decreto 0159 de 2026, transitorio) + auxilio de transporte $249.095 (Decreto 1470 de 2025) = $2.000.000 → prima del semestre $1.000.000.
// EJEMPLO HIPOTÉTICO de reparto: $400.000 colchón · $400.000 deuda más cara · $200.000 un gusto. Proporcional: base × días ÷ 360.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const cop = v => '$' + Math.round(v).toLocaleString('es-CO').replace(/,/g, '.');
function src(c, s, y = 1312) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }
function hipo(c, y = 320) { tag(c, 'EJEMPLO HIPOTÉTICO', 540, y, { size: 28, bg: C.paper }); }

// ---------- piezas ----------
function envelope(c, x, y, s, lab, col, seed, open = 0) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, R4(-140, -90, 280, 180), col, { sharp: true, w: 5, lc: C.ink, seed });
  ln(c, [[-140, -90], [0, 10 - open * 120], [140, -90]], { w: 4, straight: true, seed: seed + 1 }); tx(c, lab, 0, 56, { size: 34, f: 'ui' }); c.restore(); }
function coinD(c, x, y, r, seed) { shp(c, blob(x, y, r, r, seed, { n: 16, amp: .02 }), C.gold, { w: 3, lc: C.ink, seed }); tx(c, '$', x, y + 2, { size: r * 1.1, col: C.goldD, sh: null }); }
function jar(c, x, y, lab, fill, col, seed, amt, sc = 1) { c.save(); c.translate(x, y); c.scale(sc, sc);
  shp(c, R4(-110, -200, 220, 280), 'rgba(255,255,255,.55)', { w: 5, lc: C.ink, seed }); shp(c, R4(-80, -230, 160, 36), C.navy, { sharp: true, w: 4, lc: C.ink, seed: seed + 1 });
  if (fill > 0) shp(c, R4(-100, 70 - 260 * fill, 200, 260 * fill), col, { sharp: true, w: 3, lc: C.ink, seed: seed + 2, hatch: shade(col, .6), hal: .3 });
  tx(c, lab, 0, 130, { size: 30, f: 'ui' }); if (amt) pill(c, amt, 0, -290, { size: 32, f: 'ui', sc: Math.min(1, fill * 3) }); c.restore(); }
function decCal(c, T, t0, tC, x0 = 150, y0 = 520) { ['L', 'M', 'M', 'J', 'V', 'S', 'D'].forEach((d, k) => tx(c, d, x0 + k * 112 + 50, y0 - 30, { size: 26, f: 'ui', al: .7 }));
  for (let d = 1; d <= 31; d++) { const i = d + 1, col = i % 7, row = Math.floor(i / 7), g = pr(T, t0 + d * .015, .25); if (g <= 0) continue; const x = x0 + col * 112, y = y0 + row * 92;   // 1 dic 2026 = martes
    c.save(); c.globalAlpha = g; shp(c, R4(x, y, 100, 80), d === 20 ? C.goldL : C.paper, { sharp: true, w: 3, lc: C.ink, seed: 9500 + d }); tx(c, '' + d, x + 50, y + 42, { size: 30, f: 'ui', col: d === 20 ? C.red : C.ink }); c.restore();
    if (d === 20 && T > tC) ring(c, x + 50, y + 40, 70, 56, pr(T, tC, .6), { col: C.red, seed: 9540 }); } }

// ================= escenas =================
// 1 · Gancho: el sobre «PRIMA» llega… pero los recibos ya salieron volando
if (has('gancho')) { const s = 'gancho', t_t = As(s, 'todavía no te llega…'), t_g = As(s, 'ya se la gastaron.');
  hit(.05, 8, 'stamp'); hit(t_t + .1, 8, 'ping'); hit(t_g + .2, 18, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_g, 960], [t_g + .6, 930]]), key(T, [[0, 1.0], [t_g, 1.0], [t_g + .6, 1.06]]) + .01 * Math.sin(L * 1.3));
    tx(c, 'LA PRIMA', 540, 190, { size: 120, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, 'DE DICIEMBRE', 540, 300, { size: 72, col: C.goldD, sh: C.ink });
    envelope(c, 540, 700 + 14 * Math.sin(T * 2), 1.3, 'PRIMA', C.goldL, 9600, pr(T, t_g, .4));
    ['BLACK FRIDAY', 'PASEO', 'REGALOS', 'CUOTAS'].forEach((w, k) => { const u = pr(T, t_g - .3 + k * .15, .9, easeOutQuint); if (u <= 0) return;
      tag(c, w, 540 + Math.cos(k * 1.7 + 1) * 380 * u, 640 - 260 * u + k * 30, { size: 30, bg: '#FFD3CB', rot: (k - 1.5) * .12 }); });
    stamp(c, 'YA GASTADA', 540, 1080, T, t_g + .3, { size: 84, col: C.red, rot: -.05 });
    person(c, 160, 1560, .6, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_g ? 'o' : 'smile', brow: T > t_g ? 1 : 0, sweat: T > t_g + .3 ? T : 0 });
  }); }

// 2 · TikTok · El dato: a más tardar el 20 de diciembre (art. 306) · este año el 20 cae domingo
if (has('dato')) { const s = 'dato', t_l = As(s, 'Por ley,'), t_20 = As(s, 'veinte de diciembre.'), t_d = As(s, 'cae domingo:'), t_r = As(s, 'revisa con tu empresa');
  hit(t_l + .1, 8, 'ping'); hit(t_20 + .2, 14, 'stamp'); hit(t_d + .1, 12, 'impact'); hit(t_r + .1, 8, 'ping');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_20, 1.0], [t_20 + .6, 1.04]]) + .012 * Math.sin(L));
    tx(c, 'DICIEMBRE 2026', 540, 210, { size: 86, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    tag(c, 'A MÁS TARDAR EL 20', 540, 330, { size: 34, bg: C.goldL, sc: pb(T, t_20) });
    decCal(c, T, sec(s).t0 + .1, t_20 + .1);
    stamp(c, 'EL 20 CAE DOMINGO', 540, 1110, T, t_d + .1, { size: 58, col: C.red, rot: -.03 });
    tag(c, 'REVISA CON TU EMPRESA QUÉ DÍA TE PAGAN', 540, 1220, { size: 28, bg: C.paper, sc: pb(T, t_r) });
    src(c, 'Código Sustantivo del Trabajo, art. 306 (modificado por la Ley 1788 de 2016)', 1300);
  }); }

// 3 · ¿Cuánto es? $1.750.905 + $249.095 = $2.000.000 → la mitad: $1.000.000
if (has('cuanto')) { const s = 'cuanto', t_m = As(s, TK ? 'Si ganas el mínimo,' : 'Con el salario mínimo'), t_a = As(s, 'auxilio de transporte'), t_1 = As(s, 'un millón de pesos.');
  const t_2 = TK ? As(s, 'dos millones.') : null, t_20 = TK ? null : As(s, 'veinte de diciembre.');
  hit(t_m + .1, 8, 'ping'); hit(t_a + .2, 8, 'ping'); if (t_2) hit(t_2 + .2, 12, 'impact'); if (t_20) hit(t_20 + .2, 12, 'stamp'); hit(t_1 + .2, 18, 'stamp');
  scene(s, TK ? 'iris' : 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_1, 1.0], [t_1 + .6, 1.05]]) + .012 * Math.sin(L));
    tx(c, '¿CUÁNTO ES?', 540, 210, { size: 100, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    if (t_20) tag(c, 'SE PAGA A MÁS TARDAR EL 20 DE DICIEMBRE', 540, 320, { size: 28, bg: C.goldL, sc: pb(T, t_20 - .3) });
    pill(c, 'SALARIO MÍNIMO 2026: ' + cop(1750905), 540, 470, { size: 40, f: 'ui', sc: pb(T, Math.min(t_m + .2, sec(s).t0 + .3)) });
    tx(c, '+', 540, 560, { size: 70, col: C.goldD, sc: pb(T, t_a) });
    pill(c, 'AUXILIO DE TRANSPORTE: ' + cop(249095), 540, 650, { size: 40, f: 'ui', sc: pb(T, t_a + .2) });
    const tb = t_2 ?? (t_a + 1.2); ln(c, [[200, 730], [880, 730]], { w: 6, straight: true, seed: 9620, p: pr(T, tb - .2, .4) });
    pill(c, 'BASE: ' + cop(2000000), 540, 810, { size: 46, f: 'ui', sc: pb(T, tb), col: C.lav });
    tx(c, '÷ 2 (UN SEMESTRE)', 540, 910, { size: 40, f: 'ui', col: C.vio, al: pr(T, tb + .4, .3) });
    pill(c, 'PRIMA: ' + cop(1000000), 540, 1050, { size: 72, f: 'ui', sc: pb(T, t_1), col: C.gold }); burst(c, 540, 1050, T, t_1 + .2, { R: 260, n: 18 });
    src(c, 'Decreto 0159 de 2026 (salario mínimo, transitorio) · Decreto 1470 de 2025 (auxilio) · Ley 1 de 1963, art. 7', 1200);
    person(c, 140, 1560, .55, { seed: 3, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_1 ? 'grin' : 'flat', armR: T > t_1 ? [2.7, .3] : [.3, .2] });
  }); }

// 4 · TikTok · El error: comprometerla antes de recibirla → el sobre llega vacío
if (has('error')) { const s = 'error', t_c = As(s, 'comprometerla antes de recibirla:'), t_b = As(s, 'Black Friday,'), t_p = As(s, 'el paseo,'), t_r = As(s, 'los regalos.'), t_g = As(s, 'ya está gastada.');
  hit(t_c + .1, 12, 'stamp'); [t_b, t_p, t_r].forEach(t => hit(t + .1, 8, 'ping')); hit(t_g + .1, 16, 'stamp');
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'EL ERROR', 540, 210, { size: 110, col: C.red, sc: pb(T, sec(s).t0 - .3) });
    [['CUOTAS BLACK FRIDAY', t_b], ['EL PASEO', t_p], ['LOS REGALOS', t_r]].forEach(([w, t], k) => pill(c, w, 540, 420 + k * 120, { size: 42, f: 'ui', sc: pb(T, t), col: '#FFB4A6' }));
    for (let k = 0; k < 3; k++) { const u = (T * .8 + k / 3) % 1; if (T > t_b) coinD(c, 540 + (k - 1) * 200, 420 + k * 120 - u * 200, 26 * (1 - u), 9650 + k); }
    envelope(c, 540, 960 + 10 * Math.sin(T * 2), 1.0 * pb(T, sec(s).t0 + .2), 'PRIMA', C.goldL, 9660, pr(T, t_g - .4, .4)); stamp(c, 'VACÍO', 540, 960, T, t_g + .1, { size: 70, col: C.red, rot: -.08 });
    person(c, 900, 1560, .6, { seed: 7, shirt: C.navy, flip: true, ...idle(T), look: -1, mouth: T > t_g ? 'o' : 'smile', brow: T > t_g ? 1 : 0, sweat: T > t_g ? T : 0 });
  }); }

// 5 · El plan: tres frascos (colchón, deuda más cara, un gusto); en el Short ya con las cifras
if (has('plan')) { const s = 'plan', t_c = As(s, TK ? 'al colchón para imprevistos,' : 'al colchón,'), t_d = As(s, 'deuda más cara'), t_g = As(s, TK ? 'darte un gusto,' : 'darte un gusto.');
  hit(t_c + .1, 10, 'impact'); hit(t_d + .1, 10, 'impact'); hit(t_g + .1, 12, 'stamp');
  scene(s, TK ? 'wipe' : 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L)); hipo(c, 320);
    tx(c, TK ? 'DIVÍDELA EN TRES' : 'CON ' + cop(1e6) + ':', 540, 210, { size: 90, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    const f = (t, v) => pr(T, t, .7, easeIO) * v;
    jar(c, 200, 960, 'COLCHÓN', f(t_c, .8), C.lav, 9700, TK ? null : cop(400000));
    jar(c, 540, 960, 'DEUDA MÁS CARA', f(t_d, .8), '#FFB4A6', 9710, TK ? null : cop(400000));
    jar(c, 880, 960, 'UN GUSTO', f(t_g, .4), C.gold, 9720, TK ? null : cop(200000));
    for (let k = 0; k < 6; k++) { const u = (T * 1.1 + k / 6) % 1; coinD(c, [200, 540, 880][k % 3], 520 + u * 300, 22, 9730 + k); }
    tag(c, 'UNA IDEA, NO UNA REGLA', 540, 1220, { size: 28, bg: C.paper, sc: pb(T, sec(s).t0 + .3) });
  }); }

// 6 · TikTok · La cuenta: $400.000 · $400.000 · $200.000
if (has('cuenta')) { const s = 'cuenta', t_1 = As(s, 'cuatrocientos mil al colchón,'), t_2 = As(s, 'cuatrocientos mil a la deuda'), t_3 = As(s, 'doscientos mil para ti.');
  hit(t_1 + .2, 12, 'impact'); hit(t_2 + .2, 12, 'impact'); hit(t_3 + .2, 14, 'stamp');
  scene(s, 'news', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L)); hipo(c, 320);
    tx(c, 'CON ' + cop(1e6) + ':', 540, 210, { size: 90, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    jar(c, 200, 960, 'COLCHÓN', .8 * pb(T, t_1), C.lav, 9700, cop(400000));
    jar(c, 540, 960, 'DEUDA MÁS CARA', .8 * pb(T, t_2), '#FFB4A6', 9710, cop(400000));
    jar(c, 880, 960, 'PARA TI', .4 * pb(T, t_3), C.gold, 9720, cop(200000));
    stamp(c, '40 % · 40 % · 20 %', 540, 1230, T, t_3 + .3, { size: 52, col: C.goldD, rot: -.03 });
  }); }

// 7 · TikTok · Ojo: proporcional a los días trabajados (base × días ÷ 360)
if (has('ojo')) { const s = 'ojo', t_n = As(s, 'si no trabajaste'), t_p = As(s, 'en proporción');
  hit(t_n + .1, 10, 'ping'); hit(t_p + .1, 14, 'stamp');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'OJO', 540, 220, { size: 140, col: C.red, sc: pb(T, sec(s).t0 - .2) });
    for (let k = 0; k < 6; k++) { const x = 200 + k * 136, on = k < 4; shp(c, R4(x - 56, 480, 112, 150), on ? C.lav : C.paper, { sharp: true, w: 4, lc: C.ink, seed: 9800 + k });
      tx(c, ['JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'][k], x, 560, { size: 30, f: 'ui', al: on ? 1 : .4 }); }
    pill(c, 'PROPORCIONAL A LOS DÍAS TRABAJADOS', 540, 760, { size: 36, f: 'ui', sc: pb(T, t_p) });
    tx(c, 'BASE × DÍAS ÷ 360', 540, 900, { size: 60, f: 'ui', col: C.vio, al: pr(T, t_p + .5, .4) });
    person(c, 540, 1560, .6, { seed: 12, shirt: C.vio, ...idle(T), look: 0, mouth: 'flat', armR: [2.2, .5] });
  }); }

// 8 · Cierre (noche)
if (has('cierre')) { const s = 'cierre', t_a = TK ? As(s, 'La prima no es plata extra:') : As(s, 'Si la gastas antes de recibirla,'), t_b = TK ? As(s, 'es parte de tu sueldo') : As(s, 'es deuda.'), t_h = As(s, 'Haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_a + .1, 8, 'ping'); hit(t_b + .1, 12, 'stamp'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, TK ? 'NO ES PLATA EXTRA:' : 'SI LA GASTAS ANTES,', 540, 300, { size: 62, col: C.chalk, sh: C.goldD, clipP: pr(T, t_a, .6, easeIO), max: 1000 });
    tx(c, TK ? 'ES TU SUELDO, QUE LLEGA JUNTO' : 'YA NO ES PRIMA: ES DEUDA', 540, 400, { size: 54, col: C.lav, sh: null, clipP: pr(T, t_b, .6, easeIO), max: 1000 });
    envelope(c, 540, 680, .9 * pb(T, sec(s).t0 + .2), 'PRIMA', C.goldL, 9900);
    tx(c, 'HAZ TU CUENTA', 540, 1000, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada: el sobre de la prima con «YA GASTADA» =================
function cover(c) { const t = As('gancho', 'ya se la gastaron.'); drawScene(c, SC[0], Math.min(t + 1.4, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('prima-diciembre', cover);
