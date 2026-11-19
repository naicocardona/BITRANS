// TITÁN · «Anthropic salió a bolsa» · Short (sh) y TikTok (tk) · kit híbrido · línea A (noticia del día, 19 nov 2026)
// Salida a bolsa en Nasdaq (ANT), 19 nov 2026: 980 millones de acciones a USD 83 → USD 81.300 millones (récord; SpaceX USD 75.000 millones, jun. 2026). Apertura USD 111,50 (+34 %). CNN, CNBC, Fox Business, NBC.
// Cierre del día: CLOSE (Yahoo Finance, cierre oficial). Facebook 2012 (Yahoo Finance, diario): salida USD 38 (18 may.), apertura USD 42,05, mínimo USD 17,55 (4 sep.).
// Nota: video sobre la empresa que desarrolla Claude; neutral, sin promover brókers ni CFD.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const fmtU = v => 'USD ' + v.toFixed(2).replace('.', ',');

// ---------- piezas ----------
function bell(c, x, y, s, T, ring) { c.save(); c.translate(x, y); c.rotate(Math.sin(T * 18) * .25 * ring); c.scale(s, s);
  shp(c, [[-70, 40], [-55, -40], [0, -80], [55, -40], [70, 40]], C.gold, { w: 5, lc: C.ink, seed: 9701 }); c.fillStyle = C.goldD; c.beginPath(); c.arc(0, 52, 14, 0, TAU); c.fill(); c.restore(); }
function board(c, x, y, w, h, T, rows, seed = 9710) { shp(c, R4(x - w / 2, y - h / 2, w, h), C.navy, { sharp: true, w: 6, lc: C.ink, seed });
  rows.forEach(([a, b, col], k) => { const yy = y - h / 2 + 60 + k * 70; tx(c, a, x - w / 2 + 40, yy, { size: 40, f: 'ui', col: C.chalk, align: 'left' }); tx(c, b, x + w / 2 - 40, yy, { size: 40, f: 'ui', col: col || C.gold, align: 'right' }); }); }
function confetti(c, T, t0) { if (T < t0) return; for (let k = 0; k < 24; k++) { const u = ((T - t0) * .5 + k / 24) % 1; c.save(); c.globalAlpha = .8; c.fillStyle = [C.gold, C.lav, C.vio, C.goldL][k % 4]; c.translate((k * 137) % 1080, -20 + u * 1500); c.rotate(T * 3 + k); c.fillRect(-8, -4, 16, 8); c.restore(); } }
function src(c, s, y = 1520) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }
function priceBars(c, T, items, Z = 1180, K = 6) { ln(c, [[100, Z], [980, Z]], { w: 6, straight: true, seed: 9720 });
  items.forEach(([lab, v, t, col, x], k) => { const g = pr(T, t, .7, easeOutBack); if (g <= 0) return; shp(c, R4(x - 90, Z - v * K * g, 180, v * K * g), col, { sharp: true, w: 5, lc: C.ink, seed: 9721 + k, hatch: shade(col, .6), hal: .3 });
    tx(c, lab, x, Z + 40, { size: 30, f: 'ui' }); pill(c, fmtU(v), x, Z - v * K - 60, { size: 36, f: 'ui', sc: pb(T, t + .3) }); }); }

// ================= escenas =================
// 1 · Gancho: campana de Nasdaq, confeti, «ANTHROPIC SALIÓ A BOLSA» + sello «LA MÁS GRANDE DE LA HISTORIA»
if (has('gancho')) { const s = 'gancho', t_b = As(s, 'salió hoy a la bolsa.'), t_h = As(s, 'más grande de la historia.');
  hit(.05, 10, 'stamp'); hit(t_b + .1, 12, 'impact'); hit(t_h + .1, 18, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_h, 960], [t_h + .6, 920]]), key(T, [[0, 1.0], [t_h, 1.0], [t_h + .6, 1.06]]) + .01 * Math.sin(L * 1.3));
    confetti(c, T, t_b);
    tx(c, 'ANTHROPIC', 540, 200, { size: 110, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, 'SALIÓ A BOLSA', 540, 310, { size: 76, col: C.goldD, sh: C.ink });
    tag(c, 'LA EMPRESA QUE CREÓ A CLAUDE · 19 NOV. 2026', 540, 410, { size: 28, bg: C.paper });
    bell(c, 540, 650, 1.6, T, T < t_b + 1.5 && T > t_b - .2 ? 1 : .15);
    board(c, 540, 960, 760, 200, T, [['NASDAQ', 'ANT'], ['SALIDA', 'USD 83']]);
    stamp(c, 'LA MÁS GRANDE DE LA HISTORIA', 540, 1170, T, t_h, { size: 46, col: C.red, rot: -.03 });
    person(c, 160, 1530, .55, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_h ? 'o' : 'grin', armR: [2.6, .4] });
    person(c, 920, 1530, .55, { seed: 12, shirt: C.vio, flip: true, ...idle(T, 1), look: -1, mouth: 'o', brow: 1 });
  }); }

// 2 · TikTok · Datos de la oferta: 980 millones de acciones × USD 83 = USD 81.300 millones · más que SpaceX
if (has('datos')) { const s = 'datos', t_a = As(s, 'novecientos ochenta millones'), t_r = As(s, 'ochenta y un mil trescientos millones'), t_x = As(s, 'Más que SpaceX');
  hit(t_a + .2, 8, 'ping'); hit(t_r + .3, 14, 'impact'); hit(t_x + .1, 12, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    tx(c, 'LA OFERTA', 540, 220, { size: 100, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    pill(c, '980 MILLONES DE ACCIONES', 540, 400, { size: 46, f: 'ui', sc: pb(T, t_a) }); tx(c, '×', 540, 500, { size: 80, col: C.goldD, sc: pb(T, t_a + .5) }); pill(c, 'USD 83 C/U', 540, 600, { size: 46, f: 'ui', sc: pb(T, t_a + .8) });
    const g = pr(T, t_r - .2, 1.0, easeIO); pill(c, 'USD ' + Math.round(81300 * g).toLocaleString('es-CO').replace(/,/g, '.') + ' MILLONES', 540, 780, { size: 60, f: 'ui', sc: pb(T, t_r - .2), col: C.paper });
    priceBars(c, T, [['SPACEX (JUN. 2026)', 75, sec(s).t0 + .6, C.lav, 330], ['ANTHROPIC', 81.3, t_r + .2, C.gold, 750]], 1250, 3.6);
    stamp(c, 'RÉCORD', 750, 1090, T, t_x + .1, { size: 54, col: C.red, rot: -.05 });
    src(c, 'CNN, CNBC, Fox Business · 19 nov. 2026 (cifras en miles de millones de USD)');
  }); }

// 3 · Apertura: USD 83 → USD 111,50 (+34 %) → cierre del día
function openClose(c, T, t83, t111, tC, Z, tQ) { priceBars(c, T, [['SALIDA', 83, t83, C.lav, 220], ['APERTURA', 111.5, t111, C.gold, 540], ['CIERRE HOY', CLOSE, tC, CLOSE >= 83 ? C.goldL : '#FFB4A6', 860]], Z, 5.2);
  if (T > t111 + .4) tx(c, '+34 %', 380, Z - 111.5 * 5.2 - 150, { size: 64, col: C.green, sh: C.ink, sc: pb(T, t111 + .4) });
  if (tQ != null && T > tQ) { const q = Math.round((CLOSE / 111.5 - 1) * 100); stamp(c, (q < 0 ? 'QUIEN COMPRÓ AL ABRIR: −' : 'QUIEN COMPRÓ AL ABRIR: +') + Math.abs(q) + ' %', 540, Z + 150, T, tQ, { size: 50, col: q < 0 ? C.red : C.green, rot: .04 }); } }
if (has('apertura')) { const s = 'apertura', t_n = As(s, 'casi nadie compró'), t_1 = As(s, 'ciento once dólares'), t_c = As(s, 'Y cerró el día'), t_q = As(s, 'Quien compró al abrir');
  hit(t_n + .1, 10, 'stamp'); hit(t_1 + .3, 14, 'impact'); hit(t_c + .4, 12, 'impact'); hit(t_q + .3, 12, 'stamp');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    tx(c, '¿QUIÉN COMPRÓ A USD 83?', 540, 220, { size: 74, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    stamp(c, 'CASI NADIE', 540, 360, T, t_n + .1, { size: 60, col: C.red, rot: -.04 });
    openClose(c, T, sec(s).t0 + .3, t_1, t_c + .2, 1220, t_q + .3);
    src(c, 'Apertura: CNN, CNBC · cierre oficial: Yahoo Finance');
  }); }
if (has('cuenta')) { const s = 'cuenta', t_8 = As(s, 'ochenta y tres dólares,'), t_1 = As(s, 'ciento once'), t_c = As(s, 'cerró en'), t_q = As(s, 'Quien compró al abrir');
  hit(t_8 + .2, 8, 'ping'); hit(t_1 + .3, 14, 'impact'); hit(t_c + .4, 12, 'impact'); hit(t_q + .3, 12, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    tx(c, 'SU PRIMER DÍA EN BOLSA', 540, 220, { size: 72, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    openClose(c, T, t_8, t_1, t_c + .2, 1220, t_q + .3);
    src(c, 'Salida y apertura: CNN, CNBC · cierre oficial: Yahoo Finance');
  }); }

// 4 · TikTok · La lección: el precio de salida va sobre todo a inversionistas institucionales; el resto paga lo que pida el mercado
if (has('leccion')) { const s = 'leccion', t_i = As(s, 'institucionales.'), t_p = As(s, 'Quien compra el primer día');
  hit(t_i + .1, 12, 'stamp'); hit(t_p + .1, 10, 'ping');
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    tx(c, 'LA LETRA PEQUEÑA', 540, 220, { size: 86, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    // puerta VIP con traje vs. fila
    shp(c, R4(120, 420, 360, 520), C.navy, { sharp: true, w: 6, lc: C.ink, seed: 9730 }); tx(c, 'USD 83', 300, 560, { size: 60, col: C.gold, sh: null }); tag(c, 'INSTITUCIONALES', 300, 680, { size: 28, bg: C.goldL, sc: pb(T, t_i - .5) });
    person(c, 300, 1000, .5, { seed: 30, shirt: C.navy, ...idle(T), look: 1, mouth: 'smile' });
    for (let k = 0; k < 4; k++) person(c, 620 + k * 110, 1000, .45, { seed: 40 + k, shirt: [C.lav, C.vio, '#3B4466', C.paper][k], ...idle(T, k), look: -1, mouth: 'flat' });
    pill(c, 'TÚ, EL PRIMER DÍA: LO QUE PIDA EL MERCADO', 540, 1180, { size: 34, f: 'ui', sc: pb(T, t_p), col: '#FFB4A6' });
  }); }

// 5 · Facebook 2012: salida USD 38 → apertura USD 42,05 → 4 sep. 2012: USD 17,55
if (has('facebook')) { const s = 'facebook', t_m = As(s, 'Facebook salió'), t_42 = As(s, 'cuarenta y dos.'), t_17 = As(s, 'diecisiete con cincuenta y cinco');
  hit(t_m + .1, 10, 'stamp'); hit(t_42 + .2, 8, 'ping'); hit(t_17 + .3, 18, 'impact');
  scene(s, TK ? 'wipe' : 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, key(T, [[0, 1.0], [t_17, 1.0], [t_17 + .6, 1.05]]) + .012 * Math.sin(L));
    tx(c, 'YA PASÓ ANTES', 540, 220, { size: 92, col: C.ink, sc: pb(T, sec(s).t0 - .3) }); tag(c, 'FACEBOOK · MAYO 2012', 540, 330, { size: 32, bg: C.goldL, sc: pb(T, Math.min(t_m, sec(s).t0 + .2)) });
    const Z = 1200, K = 14, X = [250, 540, 830], V = [38, 42.05, 17.55], L3 = ['SALIDA', 'APERTURA', '4 SEP. 2012'], ts = [Math.min(t_m + .3, sec(s).t0 + .6), t_42, t_17];
    ln(c, [[100, Z], [980, Z]], { w: 6, straight: true, seed: 9740 });
    V.forEach((v, k) => { const g = pr(T, ts[k], .7, easeOutBack); if (g <= 0) return; const col = k === 2 ? C.red : C.lav; shp(c, R4(X[k] - 90, Z - v * K * g, 180, v * K * g), col, { sharp: true, w: 5, lc: C.ink, seed: 9741 + k, hatch: shade(col, .6), hal: .3 });
      tx(c, L3[k], X[k], Z + 40, { size: 30, f: 'ui' }); pill(c, fmtU(v), X[k], Z - v * K - 60, { size: 36, f: 'ui', sc: pb(T, ts[k] + .3), col: k === 2 ? '#FFB4A6' : C.gold }); });
    stamp(c, 'MENOS DE LA MITAD', 540, 440, T, t_17 + .5, { size: 46, col: C.red, rot: .03 });
    src(c, 'Yahoo Finance · META diario, 2012');
  }); }

// 6 · TikTok · Ojo con la publicidad de CFD
if (has('ojo')) { const s = 'ojo', t_c = As(s, 'CFD,'), t_d = As(s, 'no eres dueño'), t_a = As(s, 'apalancamiento');
  hit(t_c + .1, 10, 'stamp'); hit(t_d + .1, 10, 'ping'); hit(t_a + .2, 14, 'impact');
  scene(s, 'news', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    tx(c, 'OJO CON LA PUBLICIDAD', 540, 220, { size: 76, col: C.red, sh: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    c.save(); c.translate(540, 620); c.rotate(-.04 + Math.sin(T * 2) * .02); shp(c, R4(-330, -170, 660, 340), C.paper, { sharp: true, w: 5, lc: C.ink, seed: 9750 }); tx(c, '¡OPERA YA!', 0, -60, { size: 70, col: C.red }); tx(c, 'CFD', 0, 50, { size: 90, col: C.ink }); c.restore();
    pill(c, 'CON UN CFD NO ERES DUEÑO DE LA ACCIÓN', 540, 920, { size: 36, f: 'ui', sc: pb(T, t_d) });
    stamp(c, 'EL APALANCAMIENTO MULTIPLICA LAS PÉRDIDAS', 540, 1080, T, t_a + .2, { size: 36, col: C.red, rot: -.03 });
    person(c, 160, 1530, .55, { seed: 9, shirt: C.navy, ...idle(T), look: 1, mouth: 'o', brow: 1 });
  }); }

// 7 · Cierre (noche)
if (has('cierre')) { const s = 'cierre', t_g = As(s, 'no es una garantía.'), t_h = As(s, 'Haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  const t_d = TK ? As(s, 'Depende de cuánto') : null;
  if (t_d) hit(t_d + .1, 8, 'ping'); hit(t_g + .1, 14, 'stamp'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, '¿COMPRAR EL DÍA UNO O ESPERAR?', 540, 280, { size: 52, col: C.chalk, sh: C.goldD, clipP: pr(T, sec(s).t0 + .1, .6, easeIO), max: 1000 });
    if (t_d) tx(c, 'DEPENDE DE CUÁNTO RIESGO AGUANTAS', 540, 380, { size: 44, col: C.lav, sh: null, clipP: pr(T, t_d - .1, .6, easeIO), max: 1000 });
    tx(c, 'UNA SALIDA A BOLSA', 540, 560, { size: 60, col: C.chalk, sh: C.goldD, clipP: pr(T, t_g - 1.2, .6, easeIO), max: 1000 }); tx(c, 'NO ES UNA GARANTÍA', 540, 650, { size: 60, col: C.gold, sh: null, clipP: pr(T, t_g - .3, .6, easeIO), max: 1000 });
    bell(c, 540, 860, 1.0, T, .1);
    tx(c, 'HAZ TU CUENTA', 540, 1100, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

function cover(c) { const t = As('gancho', 'más grande de la historia.'); drawScene(c, SC[0], Math.min(t + 1.2, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('anthropic', cover);
