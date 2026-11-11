// TITÁN · «¿Arrendar o comprar casa? La cuenta que nadie hace» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js)
// EJEMPLO HIPOTÉTICO visible toda la escena: apto $300 M; arriendo 0,5 % mensual = $1,5 M; cuota inicial 30 % = $90 M; crédito $210 M a 20 años al 15,46 % E.A.
// (promedio No VIS, Superfinanciera, fin oct. 2026) → cuota $2.682.126 sin seguros; año 1: intereses $30,2 M, abono $1,9 M. CDT 12 % E.A. → $10,8 M antes de impuestos.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];

// ---------- piezas ----------
function building(c, x, y, s, T, o = {}) { c.save(); c.translate(x, y); c.scale(s, s);
  shp(c, R4(-150, -460, 300, 460), o.col || C.navy, { sharp: true, w: 5, lc: C.ink, seed: 1101 });
  shp(c, [[-170, -460], [0, -560], [170, -460]], C.gold, { sharp: true, w: 5, lc: C.ink, seed: 1102 });
  for (let r = 0; r < 5; r++) for (let k = 0; k < 3; k++) { const on = o.lit === undefined ? (Math.sin(r * 3.1 + k * 1.7 + Math.floor(T * 1.5)) > -.2) : (r === o.lit[0] && k === o.lit[1]);
    c.save(); c.fillStyle = on ? C.goldL : '#2A3150'; c.fillRect(-120 + k * 90, -430 + r * 80, 60, 50); c.restore(); }
  shp(c, R4(-35, -80, 70, 80), C.goldD, { sharp: true, w: 4, lc: C.ink, seed: 1103 }); c.restore(); }
function keyIcon(c, x, y, s, rot) { if (s <= 0) return; c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  shp(c, blob(-50, 0, 34, 34, 1111, { n: 22 }), C.gold, { w: 5, lc: C.ink, seed: 1111 }); c.save(); c.fillStyle = C.paper; c.beginPath(); c.arc(-50, 0, 12, 0, TAU); c.fill(); c.restore();
  shp(c, [[-18, -9], [70, -9], [70, 9], [-18, 9]], C.gold, { sharp: true, w: 4, lc: C.ink, seed: 1112 }); shp(c, [[40, 9], [52, 9], [52, 30], [40, 30]], C.gold, { sharp: true, w: 3, lc: C.ink, seed: 1113 }); c.restore(); }
function bank(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s);
  shp(c, [[-170, -250], [0, -330], [170, -250]], C.gold, { sharp: true, w: 5, lc: C.ink, seed: 1121 }); shp(c, R4(-160, -250, 320, 30), C.paper, { sharp: true, w: 4, lc: C.ink, seed: 1122 });
  for (let k = 0; k < 4; k++) shp(c, R4(-140 + k * 80, -215, 40, 180), C.paper, { sharp: true, w: 4, lc: C.ink, seed: 1123 + k });
  shp(c, R4(-180, -35, 360, 35), C.navy, { sharp: true, w: 4, lc: C.ink, seed: 1128 }); tx(c, 'BANCO', 0, -235, { size: 22, f: 'ui' }); c.restore(); }
function coin(c, x, y, r, seed) { shp(c, blob(x, y, r, r, seed, { n: 22, amp: .02 }), C.gold, { w: 4, lc: C.ink, seed }); tx(c, '$', x, y + 2, { size: r * 1.1, col: C.goldD, sh: null }); }
function hipo(c, y = 175) { tag(c, 'EJEMPLO HIPOTÉTICO', 540, y, { size: 30, bg: C.gold }); }
function bars2(c, T, x0, Z, items, K) { // barras con contornos punteados desde el inicio
  items.forEach(([v, t, col, lab, val], k) => { const x = x0 + k * 340, h = K * v; c.save(); c.setLineDash([14, 10]); c.strokeStyle = C.ink; c.globalAlpha = .3; c.lineWidth = 4; c.strokeRect(x, Z - h, 220, h); c.restore();
    const g = pr(T, t, .7, easeOutBack); if (g > .01) shp(c, R4(x, Z - h * g, 220, h * g), col, { sharp: true, w: 5, lc: C.ink, seed: 1130 + k, hatch: shade(col, .6), hal: .35 });
    tx(c, lab, x + 110, Z + 46, { size: 32, f: 'ui', al: .9 }); pill(c, val, x + 110, Z - h - 64, { size: 54, sc: pb(T, t + .3) }); }); ln(c, [[x0 - 60, Z], [x0 + 620, Z]], { w: 7, straight: true, seed: 1139 }); }

// ================= escenas =================
// 1 · Gancho: «¿ARRENDAR ES BOTAR LA PLATA?» desde el primer cuadro; billetes que vuelan a una caneca
{ const s = 'gancho', t_b = As(s, 'botar la plata?'), t_h = As(s, 'Hagamos la cuenta'), t_n = As(s, 'casi nadie hace.');
  hit(t_b, 8, 'stamp'); hit(t_h + .1, 6, 'ping'); hit(t_n + .1, 12, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 940], [t_n, 940], [t_n + .6, 900]]), key(T, [[0, 1.0], [t_n, 1.0], [t_n + .6, 1.05]]) + .012 * Math.sin(L * 1.3));
    tx(c, '¿ARRENDAR ES', 540, 215, { size: 100, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, 'BOTAR LA PLATA?', 540, 335, { size: 100, col: C.gold, sh: C.ink, max: 1000 });
    building(c, 800, 1180, .95, T);
    // caneca y billetes que caen dentro
    shp(c, [[160, 1050], [400, 1050], [370, 1300], [190, 1300]], '#8A8D9C', { sharp: true, w: 5, lc: C.ink, seed: 1141 }); ln(c, [[150, 1050], [410, 1050]], { w: 10, straight: true, seed: 1142 });
    for (let k = 0; k < 5; k++) { const u = ((T * .8 + k / 5) % 1); c.save(); c.translate(280 + Math.sin(k * 2 + T * 3) * 80, 500 + u * 520); c.rotate(T * 2 + k); c.globalAlpha = u > .92 ? (1 - u) * 12 : 1;
      shp(c, R4(-60, -30, 120, 60), '#9CC79A', { sharp: true, w: 4, lc: C.ink, seed: 1150 + k }); tx(c, '$', 0, 2, { size: 36, col: '#2F5E3A', sh: null }); c.restore(); }
    person(c, 520, 1440, .95, { seed: 5, shirt: C.lav, ...idle(T), look: -1, mouth: T > t_h ? 'smile' : 'o', brow: T < t_h ? 1 : 0, armL: [1.5, .4], armR: T > t_h ? [2.4, .6] : [.3, .2] });
    stamp(c, 'LA CUENTA QUE NADIE HACE', 540, 610, T, t_n + .1, { size: 52, col: C.red, rot: -.04 });
  }); }

// 2 · La casa: apartamento de $300 millones; arriendo $1.500.000 al mes
{ const s = 'casa', t_ap = As(s, 'un apartamento'), t_300 = As(s, 'trescientos millones.'), t_ar = As(s, 'Arrendarlo cuesta'), t_15 = As(s, 'un millón quinientos mil');
  hit(t_ap + .1, 6, 'ping'); hit(t_300 + .1, 10, 'stamp'); hit(t_ar + .1, 6, 'ping'); hit(t_15 + .2, 10, 'stamp');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, key(T, [[0, 540], [t_ar - .2, 540], [t_ar + .4, 560]]), 940, key(T, [[0, 1.0], [t_ar - .2, 1.0], [t_ar + .4, 1.03]]) + .012 * Math.sin(L));
    hipo(c, 190);
    building(c, 300, 1250, 1.05 * pb(T, sec(s).t0 - .3), T, { lit: [2, 1] });
    pill(c, '$300 MILLONES', 330, 520, { size: 50, sc: pb(T, t_300), top: 'VALOR DEL APARTAMENTO' });
    const kr = pb(T, t_ar - .1); if (kr > 0) card(c, 780, 800, 440, 300, { sc: kr, rot: .03, band: C.navy, seed: 1160, draw: cc => {
      tx(cc, 'ARRIENDO', 0, -115, { size: 34, f: 'ui', col: C.gold });
      tx(cc, '$1.500.000', 0, 0, { size: 70, col: C.ink, sh: C.gold, sc: T > t_15 ? 1 + settle(T, t_15, { amp: .12, freq: 3, decay: 5 }) : 1, al: pr(T, t_15 - .1, .3) });
      tx(cc, 'al mes · 0,5 % del valor', 0, 90, { size: 32, f: 'hand', col: C.goldD, sh: null }); } });
    person(c, 780, 1440, .9, { seed: 5, shirt: C.lav, flip: true, ...idle(T), look: -1, mouth: 'smile', armR: T > t_ar ? [1.3, .9] : [.3, .2], prop: (cc, hL, hR) => { if (T > t_ar) keyIcon(cc, hR[0] - 30, hR[1] - 20, .7, -.6); } });
    tx(c, 'Tope legal del canon: 1 % mensual del valor (Ley 820 de 2003)', 540, 1530, { size: 24, f: 'ui', al: .8 });
  }); }

// 3 · La compra: $90 M de cuota inicial + $210 M del banco a 20 años → cuota ≈ $2.680.000
{ const s = 'compra', t_90 = As(s, 'noventa millones'), t_210 = As(s, 'doscientos diez'), t_20 = As(s, 'veinte años'), t_tasa = TK ? As(s, 'quince coma cinco') : null, t_cu = As(s, 'La cuota es'), t_268 = As(s, 'dos millones seiscientos');
  hit(t_90 + .1, 8, 'stamp'); hit(t_210 + .1, 8, 'stamp'); hit(t_20 + .1, 6, 'ping'); if (t_tasa) hit(t_tasa + .2, 8, 'stamp'); hit(t_268 + .1, 14, 'stamp');
  const X0 = 140, Wd = 800;
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 920], [t_cu, 920], [t_cu + .5, 960]]), key(T, [[0, 1.0], [t_cu, 1.0], [t_cu + .5, 1.04]]) + .012 * Math.sin(L * 1.1));
    hipo(c);
    tx(c, 'PARA COMPRARLO', 540, 270, { size: 72, col: C.ink, clipP: pr(T, sec(s).t0 - .2, .6, easeIO) });
    // barra del precio: 30 % propio + 70 % banco
    c.save(); c.setLineDash([14, 10]); c.strokeStyle = C.ink; c.globalAlpha = .3; c.lineWidth = 4; c.strokeRect(X0, 360, Wd, 120); c.restore();
    const g1 = pr(T, t_90 - .1, .6, easeOutQuint), g2 = pr(T, t_210 - .1, .6, easeOutQuint);
    if (g1 > .01) shp(c, R4(X0, 360, Wd * .3 * g1, 120), C.gold, { sharp: true, w: 5, lc: C.ink, seed: 1170 });
    if (g2 > .01) shp(c, R4(X0 + Wd * .3, 360, Wd * .7 * g2, 120), C.navy, { sharp: true, w: 5, lc: C.ink, seed: 1171 });
    tx(c, '$90 M', X0 + Wd * .15, 420, { size: 44, col: C.ink, sh: null, al: pr(T, t_90, .3) }); tx(c, '$210 M DEL BANCO', X0 + Wd * .65, 420, { size: 44, col: C.gold, sh: null, al: pr(T, t_210, .3) });
    tx(c, 'cuota inicial (30 %)', X0 + Wd * .15, 520, { size: 32, f: 'hand', col: C.goldD, al: pr(T, t_90 + .2, .3) }); tx(c, 'crédito (70 %)', X0 + Wd * .65, 520, { size: 32, f: 'hand', col: C.goldD, al: pr(T, t_210 + .2, .3) });
    bank(c, 800, 1020, pb(T, sec(s).t0 - .2) * .95); person(c, 560, 1060, .6, { seed: 5, shirt: C.lav, ...idle(T), look: 1, mouth: T > t_268 ? 'o' : 'smile', brow: T > t_268 ? 1 : 0 });
    // reloj de 20 años
    const kc = pb(T, t_20 - .1); if (kc > 0) { c.save(); c.translate(300, 760); c.scale(kc, kc); shp(c, blob(0, 0, 110, 110, 1175, { n: 30, amp: .02 }), C.paper, { w: 6, lc: C.ink, seed: 1175 });
      const a = (T - t_20) * 4; ln(c, [[0, 0], [Math.sin(a) * 80, -Math.cos(a) * 80]], { w: 6, seed: 1176 }); ln(c, [[0, 0], [Math.sin(a / 12) * 50, -Math.cos(a / 12) * 50]], { w: 8, seed: 1177 }); c.restore();
      tx(c, '20 AÑOS', 300, 915, { size: 48, col: C.ink, al: kc }); }
    if (t_tasa) tag(c, 'TASA PROMEDIO NO VIS: 15,46 % E.A. (SUPERFINANCIERA, FIN OCT. 2026)', 540, 1100, { size: 24, bg: C.paper, sc: pb(T, t_tasa) });
    const kq = pb(T, t_cu - .1); if (kq > 0) card(c, 540, 1300, 780, 230, { sc: kq, band: C.navy, seed: 1180, draw: cc => {
      tx(cc, 'CUOTA MENSUAL', 0, -82, { size: 32, f: 'ui', col: C.gold });
      tx(cc, '≈ $2.680.000', 0, 20, { size: 84, col: C.red, sh: C.ink, sc: T > t_268 ? 1 + settle(T, t_268, { amp: .14, freq: 3, decay: 5 }) : 1, al: pr(T, t_268 - .1, .3) });
      tx(cc, 'sin seguros', 0, 88, { size: 28, f: 'hand', col: C.goldD, sh: null }); } });
    burst(c, 540, 1300, T, t_268 + .2, { R: 320, col: C.red });
  }); }

// 4 · El truco: primer año → intereses > $30 M; abono a la deuda ≈ $2 M
{ const s = 'truco', t_py = As(s, 'el primer año,'), t_30 = As(s, 'treinta millones'), t_int = As(s, 'son intereses.'), t_ab = As(s, 'solo abonas'), t_2 = As(s, 'dos millones.');
  const t_cn = TK ? As(s, 'la cuenta que nadie hace.') : null;
  if (t_cn) hit(t_cn + .1, 8, 'stamp'); hit(t_py + .1, 6, 'ping'); hit(t_30 + .1, 10, 'stamp'); hit(t_int + .1, 12, 'stamp'); hit(t_ab + .1, 6, 'ping'); hit(t_2 + .1, 14, 'stamp');
  const Z = 1260, K = 640;
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, key(T, [[0, 1.0], [t_2, 1.0], [t_2 + .5, 1.04]]) + .012 * Math.sin(L));
    hipo(c);
    tx(c, 'TU PRIMER AÑO PAGANDO', 540, 280, { size: 64, col: C.ink, clipP: pr(T, sec(s).t0 - .2, .6, easeIO), max: 980 });
    tx(c, '12 cuotas ≈ $32,2 millones', 540, 370, { size: 44, f: 'hand', col: C.goldD, al: pr(T, t_py, .4) });
    if (t_cn) stamp(c, 'LA CUENTA QUE NADIE HACE', 540, 470, T, t_cn, { size: 44, col: C.ink, rot: -.03 });
    bars2(c, T, 220, Z, [[30.24 / 30.24, t_30 - .1, C.red, 'INTERESES', '$30,2 M'], [1.94 / 30.24, t_2 - .1, C.gold, 'A TU DEUDA', '$1,9 M']], K);
    stamp(c, '¡SOLO $2 MILLONES!', 620, 860, T, t_2 + .3, { size: 48, col: C.red, rot: .05 });
    person(c, 960, 1470, .62, { seed: 5, shirt: C.lav, flip: true, ...idle(T), look: -1, mouth: T > t_int ? 'o' : 'flat', brow: T > t_int ? 1 : 0, sweat: T > t_2 ? T : 0 });
    tx(c, 'Crédito $210 M · 15,46 % E.A. · 20 años · cálculo TITÁN', 540, 1530, { size: 24, f: 'ui', al: .85 });
  }); }

// 5 · TikTok · Costo de oportunidad: $90 M en un CDT al 12 % ≈ $10,8 M al año antes de impuestos
if (TK) { const s = 'oportunidad', t_90 = As(s, 'noventa millones'), t_r = As(s, 'podrían rendir.'), t_cdt = As(s, 'ce de te'), t_10 = As(s, 'diez millones'), t_ai = As(s, 'antes de impuestos.');
  hit(t_90 + .1, 6, 'ping'); hit(t_r + .1, 8, 'stamp'); hit(t_cdt + .1, 8, 'ping'); hit(t_10 + .1, 14, 'stamp'); hit(t_ai + .1, 6, 'ping');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, key(T, [[0, 1.0], [t_10, 1.0], [t_10 + .5, 1.05]]) + .012 * Math.sin(L));
    hipo(c);
    tx(c, '¿Y SI ESOS $90 M RINDIERAN?', 540, 290, { size: 64, col: C.ink, clipP: pr(T, sec(s).t0 - .2, .6, easeIO), max: 1000 });
    pill(c, '$90 M', 260, 560, { size: 76, sc: pb(T, sec(s).t0 - .2), top: 'CUOTA INICIAL' });
    arrow(c, [400, 560], [640, 600], pr(T, t_r, .5), { bend: -40, w: 8, col: C.goldD });
    const kc = pb(T, Math.min(t_cdt - .2, t_r)); if (kc > 0) card(c, 800, 640, 360, 330, { sc: kc, band: C.navy, rot: .03, seed: 1190, draw: cc => {
      tx(cc, 'CDT', 0, -130, { size: 36, f: 'ui', col: C.gold }); tx(cc, '12 %', 0, -20, { size: 96, col: C.ink, sh: C.gold }); tx(cc, 'E.A. · ejemplo', 0, 70, { size: 30, f: 'hand', col: C.goldD, sh: null }); } });
    // monedas que caen y se apilan hasta +$10,8 M
    const n = Math.min(8, Math.max(0, Math.floor((T - t_cdt) * 4))); for (let k = 0; k < n; k++) { const u = pr(T, t_cdt + k * .25, .35, easeOutQuint); coin(c, 560 + (k % 2 ? 18 : -18), lerp(820, 1330 - k * 34, u), 46, 1200 + k); }
    pill(c, '+$10,8 M AL AÑO', 560, 880, { size: 62, sc: pb(T, t_10), col: C.goldL });
    tag(c, 'ANTES DE IMPUESTOS', 560, 985, { size: 30, bg: C.paper, sc: pb(T, t_ai) });
    tx(c, 'CDT a 360 días en nov. 2026: entre 10,8 % y 13,4 % E.A. según la entidad', 540, 1530, { size: 24, f: 'ui', al: .85 });
    person(c, 180, 1420, .78, { seed: 8, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_10 ? 'grin' : 'smile', armR: T > t_r ? [1.2, 1.1] : [.2, .1] });
  }); }

// 6 · TikTok · La suma: lo que no recuperas el primer año → comprar ≈ $41 M · arrendar $18 M
if (TK) { const s = 'suma', t_s = As(s, 'Suma:'), t_c = As(s, 'comprar te cuesta'), t_41 = As(s, 'cuarenta y un millones'), t_nr = As(s, 'que no recuperas.'), t_a = As(s, 'Arrendar,'), t_18 = As(s, 'dieciocho millones.');
  hit(t_s + .1, 6, 'ping'); hit(t_41 + .1, 12, 'stamp'); hit(t_nr + .1, 6, 'ping'); hit(t_18 + .1, 12, 'stamp');
  const Z = 1250, K = 620;
  scene(s, 'news', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 920, 1.0 + .012 * Math.sin(L * 1.2));
    hipo(c);
    tx(c, 'LO QUE NO RECUPERAS', 540, 280, { size: 70, col: C.ink, clipP: pr(T, sec(s).t0 - .2, .6, easeIO), max: 1000 });
    tx(c, 'en el primer año', 540, 365, { size: 48, f: 'hand', col: C.goldD, al: pr(T, t_s, .4) });
    bars2(c, T, 220, Z, [[1, t_41 - .1, C.red, 'COMPRAR', '≈ $41 M'], [18 / 41, t_18 - .1, C.gold, 'ARRENDAR', '$18 M']], K);
    tx(c, 'intereses $30,2 M + CDT que dejas de ganar $10,8 M', 330, 1330, { size: 26, f: 'ui', al: pr(T, t_nr, .4), max: 560 });
    tx(c, '12 × $1.500.000', 780, 1330, { size: 26, f: 'ui', al: pr(T, t_18, .4) });
    burst(c, 330, Z - K, T, t_41 + .3, { R: 220, col: C.red });
    tx(c, 'Sin contar seguros, predial ni administración', 540, 1530, { size: 26, f: 'ui', al: .85 });
  }); }

// 7 · TikTok · El otro lado: el arriendo sube (hasta 5,1 % en 2026), la vivienda se puede valorizar y al final es tuya
if (TK) { const s = 'otro', t_q = As(s, '¿siempre gana arrendar?'), t_no = As(s, 'No.'), t_su = As(s, 'El arriendo sube'), t_51 = As(s, 'cinco coma uno'), t_v = As(s, 'se puede valorizar,'), t_tu = As(s, 'es tuya.');
  hit(t_q + .1, 6, 'ping'); hit(t_no + .05, 14, 'stamp'); hit(t_su + .1, 6, 'ping'); hit(t_51 + .2, 10, 'stamp'); hit(t_v + .1, 8, 'ping'); hit(t_tu + .1, 14, 'stamp');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, key(T, [[0, 1.0], [t_tu, 1.0], [t_tu + .5, 1.05]]) + .012 * Math.sin(L));
    tx(c, '¿SIEMPRE GANA ARRENDAR?', 540, 230, { size: 68, col: C.ink, clipP: pr(T, sec(s).t0 - .2, .6, easeIO), max: 1000 });
    stamp(c, 'NO', 540, 380, T, t_no, { size: 110, col: C.red });
    // izquierda: el arriendo sube
    const ka = pb(T, t_su - .1); if (ka > 0) { card(c, 280, 720, 400, 320, { sc: ka, band: C.navy, seed: 1210, draw: cc => {
      tx(cc, 'EL ARRIENDO SUBE', 0, -125, { size: 30, f: 'ui', col: C.gold });
      for (let k = 0; k < 4; k++) { const h = 50 + k * 30; shp(cc, R4(-150 + k * 80, 120 - h, 50, h), k === 3 ? C.red : C.goldL, { sharp: true, w: 3, lc: C.ink, seed: 1211 + k }); }
      tx(cc, 'cada año', 0, -70, { size: 32, f: 'hand', col: C.goldD, sh: null }); } });
      pill(c, 'HASTA 5,1 % EN 2026', 280, 930, { size: 40, f: 'ui', sc: pb(T, t_51) }); tx(c, 'tope: IPC de 2025', 280, 1000, { size: 28, f: 'ui', al: pr(T, t_51 + .2, .3) }); }
    // derecha: la vivienda se valoriza y al final es tuya
    building(c, 800, 1150, .8 * pb(T, sec(s).t0 - .3), T);
    if (T > t_v) { arrow(c, [960, 1100], [980, 660], pr(T, t_v, .6), { bend: 20, w: 9, col: C.green }); tag(c, 'SE PUEDE VALORIZAR', 800, 600, { size: 30, bg: C.paper, sc: pb(T, t_v + .2) }); }
    keyIcon(c, 620, 1250, pb(T, t_tu) * 1.3, -.3 + Math.sin(T * 3) * .1);
    stamp(c, 'ES TUYA', 800, 1300, T, t_tu + .1, { size: 64, col: C.goldD, rot: .04 });
    person(c, 190, 1470, .7, { seed: 5, shirt: C.lav, ...idle(T), look: 1, mouth: T > t_tu ? 'grin' : 'smile', jump: T > t_tu ? Math.abs(Math.sin(T * 6)) * 12 : 0 });
  }); }

// 8 · Cierre (noche): depende del tiempo, la tasa y la valorización; «HAZ TU CUENTA ANTES DE FIRMAR»; aviso y firma
{ const s = 'cierre', t_end = DD.words[DD.words.length - 1][2], t_d = As(s, 'depende de'), t_tm = As(s, 'cuánto tiempo'), t_v = TK ? As(s, 'y de cuánto se valorice.') : As(s, 'y de cuánto se valorice.'), t_h = As(s, 'Haz tu cuenta');
  const t_ta = TK ? As(s, 'la tasa que consigas') : null, t_nb = TK ? null : As(s, 'no siempre es botar'), t_ng = TK ? null : As(s, 'no siempre es ganar.');
  if (!TK) { hit(t_nb + .1, 8, 'stamp'); hit(t_ng + .1, 8, 'stamp'); } hit(t_tm + .1, 6, 'ping'); if (t_ta) hit(t_ta + .1, 6, 'ping'); hit(t_v + .1, 6, 'ping'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  const items = TK ? [['TIEMPO', t_tm], ['TASA', t_ta], ['VALORIZACIÓN', t_v]] : [['TIEMPO', t_tm], ['VALORIZACIÓN', t_v]];
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    if (!TK) { tag(c, 'ARRENDAR ≠ BOTAR LA PLATA', 540, 260, { size: 40, bg: C.paper, sc: pb(T, sec(s).t0 - .2) }); tag(c, 'COMPRAR ≠ GANAR SIEMPRE', 540, 360, { size: 40, bg: C.gold, sc: pb(T, t_ng) }); }
    tx(c, 'DEPENDE DE', 540, TK ? 300 : 500, { size: 80, col: C.chalk, sh: C.goldD, clipP: pr(T, TK ? Math.min(t_d - .1, sec(s).t0 - .2) : t_d - .1, .5, easeIO) });
    items.forEach(([l, t], k) => { const y = (TK ? 440 : 630) + k * 120; pill(c, l, 540, y, { size: 56, f: 'ui', sc: pb(T, t), bg: '#232845' }); });
    tx(c, 'HAZ TU CUENTA', 540, TK ? 880 : 940, { size: 96, col: C.gold, sh: null, sc: pb(T, t_h) });
    tx(c, 'ANTES DE FIRMAR', 540, TK ? 990 : 1050, { size: 70, col: C.chalk, sh: C.goldD, clipP: pr(T, t_h + .4, .5, easeIO) });
    keyIcon(c, 540, 1200, pb(T, t_h + .6), Math.sin(T * 2) * .15);
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1420, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1490, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada =================
function cover(c) { drawScene(c, SC[0], 3.2); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('arrendar-o-comprar', cover);
