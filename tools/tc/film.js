// TITÁN · «¿A cuántas cuotas?» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js) · línea B (plata del día a día)
// EJEMPLO HIPOTÉTICO visible toda la escena: compra de $1.000.000 a la tasa máxima legal de nov 2026 (28,34 % E.A.).
// Intereses: 12 cuotas $136.568–141.768 · 36 cuotas $388.693–435.403 (abono fijo a capital / cuota fija). Prepago sin penalidad: Ley 1555 de 2012.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const fmt = v => '$' + Math.round(v).toLocaleString('es-CO').replace(/,/g, '.');

// ---------- piezas ----------
function tv(c, x, y, s, T, glow = 1) { c.save(); c.translate(x, y); c.scale(s, s);
  shp(c, R4(-230, -160, 460, 280), C.navy, { sharp: true, w: 6, lc: C.ink, seed: 2501 });
  c.save(); c.globalAlpha = .85; c.fillStyle = mix('#3B4C8A', '#7FB5E8', .5 + .5 * Math.sin(T * 2) * glow); c.fillRect(-205, -137, 410, 232); c.restore();
  for (let k = 0; k < 3; k++) { c.save(); c.globalAlpha = .35; c.fillStyle = '#fff'; c.beginPath(); c.ellipse(-120 + k * 120, -40 + Math.sin(T * 2 + k) * 20, 30, 18, 0, 0, TAU); c.fill(); c.restore(); }
  shp(c, [[-40, 120], [40, 120], [70, 170], [-70, 170]], '#3B4466', { sharp: true, w: 5, lc: C.ink, seed: 2502 }); c.restore(); }
function card(c2, x, y, s, rot, seed = 2511) { const c = c2; c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  shp(c, R4(-120, -76, 240, 152), C.vio, { w: 5, lc: C.ink, seed }); shp(c, R4(-92, -30, 50, 36), C.gold, { sharp: true, w: 3, lc: C.ink, seed: seed + 1 });
  tx(c, '•••• 2026', 20, 40, { size: 26, f: 'ui', col: C.paper, sh: null }); c.restore(); }
function pos(c, x, y, s, T, opts, sel, seed = 2521) { c.save(); c.translate(x, y); c.scale(s, s);   // datáfono genérico
  shp(c, R4(-110, -170, 220, 340), '#2A3150', { w: 5, lc: C.ink, seed }); shp(c, R4(-90, -150, 180, 120), '#BFE3F5', { sharp: true, w: 3, lc: C.ink, seed: seed + 1 });
  tx(c, '¿CUOTAS?', 0, -125, { size: 26, f: 'ui', col: C.ink }); opts.forEach((o, k) => { const on = sel === k; c.save(); c.fillStyle = on ? C.red : C.paper; c.fillRect(-82 + k * 58, -95, 50, 44); c.restore(); tx(c, o, -57 + k * 58, -72, { size: 26, f: 'ui', col: on ? C.paper : C.ink }); });
  for (let k = 0; k < 9; k++) shp(c, R4(-80 + (k % 3) * 56, 0 + Math.floor(k / 3) * 50, 44, 38), C.paper, { sharp: true, w: 2, lc: C.ink, seed: seed + 2 + k }); c.restore(); }
function bag(c, x, y, s, col, seed) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, [[-70, -80], [70, -80], [85, 90], [-85, 90]], col, { w: 5, lc: C.ink, seed }); ln(c, [[-35, -80], [-30, -130], [30, -130], [35, -80]], { w: 6, seed: seed + 1 }); c.restore(); }
function hipo(c, y = 175) { tag(c, 'EJEMPLO HIPOTÉTICO', 540, y, { size: 30, bg: C.gold }); }

// ================= escenas =================
// 1 · Gancho: «¿A CUÁNTAS CUOTAS?» desde el primer cuadro; la etiqueta de $1.000.000 se infla a casi $1.400.000
if (has('gancho')) { const s = 'gancho', t_t = TK ? As(s, 'con tarjeta…') : As(s, 'con tarjeta…'), t_p = As(s, 'terminaste pagando'), t_14 = As(s, 'un millón cuatrocientos mil.');
  hit(.05, 8, 'stamp'); hit(t_t + .1, 6, 'ping'); hit(t_14 + .2, 16, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 950], [t_14, 950], [t_14 + .6, 910]]), key(T, [[0, 1.0], [t_14, 1.0], [t_14 + .6, 1.05]]) + .012 * Math.sin(L * 1.3));
    tx(c, '¿A CUÁNTAS CUOTAS?', 540, 210, { size: 92, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }), max: 1000 });
    tx(c, 'LA PREGUNTA QUE SALE CARA', 540, 320, { size: 52, col: C.red, sh: C.ink, max: 1000 });
    tv(c, 560, 700, 1.0, T);
    // etiqueta de precio que se infla
    const g = pr(T, t_p, Math.max(.6, t_14 - t_p + .4), easeIO), v = lerp(1e6, 1.4e6, g), k = 1 + .35 * g;
    c.save(); c.translate(830, 520); c.rotate(.08 + Math.sin(T * 3) * .02); c.scale(k, k); shp(c, [[-120, -50], [110, -50], [150, 0], [110, 50], [-120, 50]], g > .98 ? C.red : C.gold, { sharp: true, w: 5, lc: C.ink, seed: 2531 });
    tx(c, (g > .98 ? 'CASI ' : '') + fmt(v), 0, 4, { size: g > .98 ? 32 : 38, f: 'ui', col: g > .98 ? C.paper : C.ink, max: 220 }); c.restore();
    person(c, 220, 1450, 1.0, { seed: 5, shirt: C.lav, ...idle(T), look: 1, mouth: T > t_14 ? 'o' : 'grin', brow: T > t_14 ? 1 : 0, sweat: T > t_14 + .3 ? T : 0, armR: [1.3, .4],
      prop: (cc, hL, hR) => card(cc, hR[0] + 20, hR[1] - 30, .55, -.4 + Math.sin(T * 4) * .05) });
    stamp(c, '+$400.000', 820, 1000, T, t_14 + .2, { size: 70, col: C.red, rot: -.05 });
    tag(c, 'EJEMPLO HIPOTÉTICO', 540, 400, { size: 28, bg: C.paper });
  }); }

// 2 · TikTok · La pregunta de la caja: datáfono con 1 · 12 · 36
if (has('pregunta')) { const s = 'pregunta', t_c = As(s, 'en la caja:'), t_q = As(s, '¿a cuántas cuotas?'), t_n = As(s, 'casi nadie hace');
  hit(t_c + .1, 6, 'ping'); hit(t_q + .1, 10, 'stamp'); hit(t_n + .2, 12, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, key(T, [[0, 1.0], [t_q, 1.0], [t_q + .5, 1.06]]) + .012 * Math.sin(L));
    shp(c, R4(-60, 1080, 1200, 70), '#B07A3E', { sharp: true, w: 5, lc: C.ink, seed: 2541 });   // mostrador
    const sel = T < t_q ? -1 : Math.floor((T - t_q) * 3) % 3; pos(c, 540, 860, 1.25 * pb(T, sec(s).t0 - .2), T, ['1', '12', '36'], sel);
    person(c, 880, 1080, .85, { seed: 14, shirt: C.navy, flip: true, ...idle(T, 1), look: -1, mouth: 'smile', armR: [1.2, 1.0] });
    person(c, 190, 1450, .95, { seed: 5, shirt: C.lav, ...idle(T), look: 1, mouth: T > t_n ? 'o' : 'smile', brow: T > t_q ? 1 : 0 });
    const kb = pb(T, t_q - .2); if (kb > 0) { c.save(); c.translate(760, 470); c.scale(kb, kb); shp(c, blob(0, 0, 230, 90, 2542, { n: 30 }), C.paper, { w: 5, lc: C.ink, seed: 2542 }); tx(c, '¿A cuántas cuotas?', 0, 4, { size: 44, f: 'hand', col: C.ink, sh: null }); c.restore(); }
    stamp(c, 'CASI NADIE HACE LA CUENTA', 540, 260, T, t_n + .1, { size: 50, col: C.red, rot: -.03 });
  }); }

// 3 · La cuenta: barras 1 · 12 · 36 cuotas con el rango según el método del banco
if (has('cuenta')) { const s = 'cuenta', t_t = As(s, 'tasa máxima legal'), t_1 = As(s, 'A una cuota,'), t_36 = As(s, 'A treinta y seis cuotas,'), t_12 = TK ? As(s, 'A doce cuotas,') : null;
  const t_r = TK ? As(s, 'según cómo calcule') : As(s, 'cuatrocientos treinta y cinco mil pesos');
  hit(t_t + .1, 6, 'ping'); hit(t_1 + .2, 8, 'stamp'); if (t_12) hit(t_12 + .3, 10, 'stamp'); hit(t_36 + .3, 16, 'stamp'); hit(t_r + .2, 8, 'ping');
  const Z = 1300, K = 680 / 435403;
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, key(T, [[0, 1.0], [t_36, 1.0], [t_36 + .5, 1.04]]) + .012 * Math.sin(L));
    hipo(c);
    tx(c, 'INTERESES DE UNA COMPRA DE $1.000.000', 540, 260, { size: 44, col: C.ink, clipP: pr(T, sec(s).t0 - .3, .5, easeIO), max: 1000 });
    pill(c, 'TASA MÁX. LEGAL NOV.: 28,34 % E.A.', 540, 350, { size: 34, f: 'ui', sc: pb(T, t_t) });
    ln(c, [[100, Z], [980, Z]], { w: 7, straight: true, seed: 2551 });
    const bars = TK ? [[1, 0, 0, t_1, '1 CUOTA', '$0'], [12, 136568, 141768, t_12, '12 CUOTAS', '≈ $140.000'], [36, 388693, 435403, t_36, '36 CUOTAS', '$389.000–435.000']] : [[1, 0, 0, t_1, '1 CUOTA', '$0'], [36, 388693, 435403, t_36, '36 CUOTAS', '$389.000–435.000']];
    bars.forEach(([n, lo, hi, t, lab, val], k) => { const x = TK ? 170 + k * 280 : 260 + k * 360, w = 200, g = pr(T, t - .1, .8, easeOutBack);
      if (hi > 0) { c.save(); c.setLineDash([12, 9]); c.strokeStyle = C.ink; c.globalAlpha = .3; c.lineWidth = 4; c.strokeRect(x, Z - hi * K, w, hi * K); c.restore(); }
      if (g > .01 && lo > 0) { shp(c, R4(x, Z - lo * K * g, w, lo * K * g), n === 36 ? C.red : C.gold, { sharp: true, w: 5, lc: C.ink, seed: 2552 + k, hatch: shade(n === 36 ? C.red : C.gold, .6), hal: .35 });
        if (hi > lo) { const gr = pr(T, t_r - .1, .5); if (gr > 0) shp(c, R4(x, Z - lo * K - (hi - lo) * K * gr, w, (hi - lo) * K * gr), '#B5402F', { sharp: true, w: 4, lc: C.ink, seed: 2556 + k }); } }
      if (lo === 0 && T > t) { tx(c, '✓', x + w / 2, Z - 60, { size: 90, col: C.green, sh: null, sc: pb(T, t) }); }
      tx(c, lab, x + w / 2, Z + 44, { size: 32, f: 'ui', al: pr(T, t - .2, .3) });
      pill(c, val, x + w / 2, (lo ? Z - hi * K - 60 : Z - 160), { size: n === 36 ? 34 : 38, f: 'ui', sc: pb(T, t + .3), col: n === 36 ? '#FFB4A6' : C.gold }); });
    tx(c, TK ? 'Rango: abono fijo a capital o cuota fija · cada banco calcula distinto' : 'Rango según cómo calcule tu banco', 540, 1400, { size: 26, f: 'ui', al: pr(T, t_r, .4) });
    tx(c, 'Tasa de usura: Superfinanciera, nov. 2026 · cálculo TITÁN', 540, 1530, { size: 24, f: 'ui', al: .8 });
  }); }

// 4 · Por qué: cada mes, intereses sobre lo que todavía debes (36 meses → muchas monedas al banco)
if (has('porque')) { const s = 'porque', t_m = As(s, 'cada mes'), t_d = As(s, 'todavía debes.'), t_mc = As(s, 'Más cuotas,'), t_pq = TK ? As(s, 'La cuota se ve pequeña,') : null, t_tc = TK ? As(s, 'el total crece.') : null;
  hit(t_m + .1, 6, 'ping'); hit(t_d + .1, 8, 'stamp'); hit(t_mc + .2, 12, 'stamp'); if (t_pq) { hit(t_pq + .1, 6, 'ping'); hit(t_tc + .1, 14, 'stamp'); }
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, 1.0 + .012 * Math.sin(L * 1.1));
    tx(c, '¿POR QUÉ?', 540, 210, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    // calendario de 36 meses que se van marcando, cada uno suelta una moneda de intereses
    const n = Math.min(36, Math.max(0, Math.floor((T - t_m) * 12)));
    for (let k = 0; k < 36; k++) { const x = 150 + (k % 9) * 87, y = 360 + Math.floor(k / 9) * 78, on = k < n; shp(c, R4(x - 34, y - 28, 68, 56), on ? '#FFB4A6' : C.paper, { sharp: true, w: 3, lc: C.ink, seed: 2560 + k }); tx(c, String(k + 1), x, y + 2, { size: 24, f: 'ui', col: on ? C.red : '#8A8D9C' }); }
    for (let k = 0; k < Math.min(n, 12); k++) { const u = ((T - t_m) * 1.2 + k / 12) % 1; c.save(); c.globalAlpha = 1 - u; c.translate(lerp(540, 860, u), lerp(700, 1080, u) - Math.sin(u * Math.PI) * 120); shp(c, blob(0, 0, 22, 22, 2600 + k, { n: 16, amp: .02 }), C.gold, { w: 3, lc: C.ink, seed: 2600 + k }); c.restore(); }
    tx(c, 'INTERESES', 870, 1140, { size: 32, f: 'ui', col: C.red, al: pr(T, t_d, .3) });
    shp(c, [[750, 1260], [990, 1260], [970, 1110], [770, 1110]], C.navy, { w: 5, lc: C.ink, seed: 2640 }); tx(c, 'BANCO', 870, 1200, { size: 28, f: 'ui', col: C.paper });
    stamp(c, 'MÁS CUOTAS = MÁS MESES DE INTERESES', 470, 740, T, t_mc + .1, { size: 38, col: C.red, rot: -.03 });
    if (t_pq) { pill(c, 'CUOTA DEL MES 1: ≈ $40.000–49.000', 420, 900, { size: 34, f: 'ui', sc: pb(T, t_pq) }); pill(c, 'TOTAL: $1.389.000–1.435.000', 420, 1010, { size: 40, f: 'ui', sc: pb(T, t_tc), col: '#FFB4A6' }); }
    person(c, 190, 1480, .85, { seed: 5, shirt: C.lav, ...idle(T), look: 1, mouth: 'o', brow: 1, sweat: T > t_mc ? T : 0 });
  }); }

// 5 · TikTok · Qué hacer: pagar a 1 cuota; si ya diferiste, abonar a capital (prepago sin penalidad)
if (has('salida')) { const s = 'salida', t_q = As(s, '¿Qué hacer?'), t_1 = As(s, 'paga a una cuota.'), t_a = As(s, 'abonar a capital:'), t_l = As(s, 'la ley te permite'), t_m = As(s, 'pagas menos intereses.');
  hit(t_q + .1, 6, 'ping'); hit(t_1 + .2, 10, 'stamp'); hit(t_a + .2, 10, 'stamp'); hit(t_l + .1, 6, 'ping'); hit(t_m + .1, 12, 'stamp');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, 1.0 + .012 * Math.sin(L));
    tx(c, '¿QUÉ HACER?', 540, 210, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    const k1 = pb(T, Math.min(t_1 - .3, sec(s).t0 + .3)); if (k1 > 0) { card(c, 300, 470, k1 * 1.1, -.05); }
    pill(c, '1 · PAGA A 1 CUOTA SI PUEDES', 540, 650, { size: 40, f: 'ui', sc: pb(T, t_1 - .1) }); if (T > t_1 + .2) tx(c, '✓', 900, 470, { size: 120, col: C.green, sh: null, sc: pb(T, t_1 + .2) });
    pill(c, '2 · SI YA DIFERISTE: ABONA A CAPITAL', 540, 790, { size: 38, f: 'ui', sc: pb(T, t_a - .1) });
    // barra de deuda que se corta con el abono
    const Wd = 760, cut = pr(T, t_a + .4, .6, easeIO); if (T > t_a - .1) { shp(c, R4(160, 900, Wd * (1 - .4 * cut), 70), C.red, { sharp: true, w: 5, lc: C.ink, seed: 2650 }); if (cut > 0) { c.save(); c.globalAlpha = 1 - cut; shp(c, R4(160 + Wd * .6, 900, Wd * .4, 70), C.gold, { sharp: true, w: 5, lc: C.ink, seed: 2651 }); c.restore(); } tx(c, 'DEUDA', 220, 935, { size: 30, f: 'ui', col: C.paper, align: 'left' }); }
    tag(c, 'LEY 1555 DE 2012: PREPAGO SIN PENALIDAD', 540, 1060, { size: 30, bg: C.paper, sc: pb(T, t_l) });
    stamp(c, 'MENOS INTERESES', 540, 1200, T, t_m + .05, { size: 58, col: C.goldD, rot: .03 });
    person(c, 190, 1480, .85, { seed: 5, shirt: C.lav, ...idle(T), look: 1, mouth: 'grin', armR: T > t_1 ? [2.4, .4] : [.3, .2] });
  }); }

// 6 · Cierre (noche): se viene el Black Friday; antes de decir 36 cuotas, haz la cuenta
if (has('cierre')) { const s = 'cierre', t_b = As(s, 'Black Friday.'), t_36 = As(s, 'treinta y seis cuotas,'), t_h = As(s, 'haz la cuenta.'), t_end = DD.words[DD.words.length - 1][2], t_r = TK ? As(s, 'revisa la tasa') : null;
  hit(t_b + .1, 10, 'stamp'); hit(t_36 + .1, 8, 'ping'); if (t_r) hit(t_r + .1, 6, 'ping'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, 'SE VIENE EL BLACK FRIDAY', 540, 280, { size: 66, col: C.chalk, sh: C.goldD, sc: pb(T, Math.min(t_b - .2, sec(s).t0)), max: 1000 });
    [[300, C.vio, 2661], [540, C.gold, 2663], [780, C.lav, 2665]].forEach(([x, col, sd], k) => bag(c, x, 640 + Math.sin(T * 2 + k) * 10, .9 * pb(T, sec(s).t0 + k * .15), col, sd));
    tx(c, 'ANTES DE DECIR «36 CUOTAS»', 540, 900, { size: 56, col: C.chalk, sh: C.goldD, clipP: pr(T, t_36 - .3, .6, easeIO), max: 1000 });
    if (t_r) tx(c, 'REVISA LA TASA DE TU TARJETA', 540, 1000, { size: 46, col: C.lav, sh: null, clipP: pr(T, t_r - .1, .6, easeIO), max: 1000 });
    tx(c, 'HAZ LA CUENTA', 540, 1120, { size: 96, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1420, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1490, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada: el gancho con la etiqueta ya inflada (titular completo) =================
function cover(c) { const t = As('gancho', 'un millón cuatrocientos mil.'); drawScene(c, SC[0], Math.min(t + 1.4, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('tarjeta-cuotas', cover);
