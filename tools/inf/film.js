// TITÁN · «Menos inflación no significa precios más bajos» (BLS, 10 nov 2026) · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js)
// Paleta del brief: azul oscuro, marfil y dorado (rojo solo para resaltar). Recibos y fábrica: EJEMPLO ILUSTRATIVO / FICTICIO; sin tasas inventadas. Cifras BLS de EE. UU.
'use strict';
const TK = MODE === 'tk';
Object.assign(C, { paper: '#F6F4EF', chalk: '#F6F4EF', gold: '#C8A45D', navy: '#0D1020', red: '#D9604F', blobA: '#ECE3CB', blobB: '#E4DDD0', blobN: '#232845' });
const sec = id => SEC[id];

// ---------- piezas ----------
function receipt(c, x, y, w, h, total, o = {}) { const k = o.sc ?? 1; if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(o.rot ?? 0); c.scale(k, k);
  const pts = [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2 - 16]]; const n = 9; for (let i = 0; i <= n; i++) pts.push([w / 2 - i * w / n, h / 2 - (i % 2 ? 0 : 16)]); pts.push([-w / 2, -h / 2]);
  c.save(); c.fillStyle = 'rgba(13,16,32,.15)'; c.translate(8, 10); c.fill(polyPath(pts, true)); c.restore();
  shp(c, pts.slice(0, -1), '#FFFFFF', { sharp: true, w: 4, lc: C.ink, seed: o.seed ?? 801 });
  tx(c, 'SÚPER', 0, -h / 2 + 34, { size: 26, f: 'ui', col: C.ink });
  squiggleText(c, -w / 2 + 22, -h / 2 + 64, w - 44, 4, { color: '#8A8D9C', seed: (o.seed ?? 801) + 1, lineH: 24, amp: 2, width: 2 });
  ln(c, [[-w / 2 + 18, h / 2 - 104], [w / 2 - 18, h / 2 - 104]], { w: 2.5, straight: true, col: C.ink, seed: 803 });
  tx(c, 'TOTAL', -w / 2 + 24, h / 2 - 76, { size: 22, f: 'ui', align: 'left', col: C.ink });
  tx(c, '$' + total, 0, h / 2 - 42, { size: o.ts ?? 58, col: o.hot ? C.red : C.ink, sh: C.gold });
  if (o.n) tag(c, o.n, 0, -h / 2 - 26, { size: 22, bg: C.paper }); c.restore(); }
function badge(c, s, x, y, k, col) { if (k <= 0) return; c.save(); c.translate(x, y); c.scale(k, k); shp(c, blob(0, 0, 50, 40, 12, { n: 26, amp: .04 }), col, { w: 4, lc: C.ink, seed: 811 }); tx(c, s, 0, 2, { size: 40, col: C.paper, sh: null }); c.restore(); }
function cart(c, x, y, s, T) { c.save(); c.translate(x, y); c.scale(s, s);
  ln(c, [[-150, -150], [-120, -150], [-90, -20], [90, -20], [120, -110], [-110, -110]], { w: 7, col: C.ink, seed: 821, straight: true });
  for (const wx of [-70, 70]) { c.save(); c.translate(wx, 6); c.rotate(T * 4); shp(c, blob(0, 0, 18, 18, 822, { n: 16, amp: .02 }), C.navy, { w: 3, lc: C.ink, seed: 822 }); c.restore(); }
  for (let k = 0; k < 4; k++) shp(c, R4(-80 + k * 38, -150 - (k % 2) * 22, 32, 40 + (k % 2) * 22), [C.gold, C.red, C.goldL, '#7FA88E'][k], { sharp: true, w: 3, lc: C.ink, seed: 823 + k });
  c.restore(); }
function factory(c, x, y, s, T) { c.save(); c.translate(x, y); c.scale(s, s);
  shp(c, [[-200, 0], [-200, -160], [-120, -220], [-120, -160], [-40, -220], [-40, -160], [40, -220], [40, -160], [200, -160], [200, 0]], C.navy, { sharp: true, w: 5, lc: C.ink, seed: 831 });
  shp(c, R4(120, -330, 50, 170), '#3B4466', { sharp: true, w: 5, lc: C.ink, seed: 832 });
  for (let k = 0; k < 4; k++) { c.save(); c.fillStyle = C.goldL; c.fillRect(-170 + k * 90, -120, 50, 40); c.restore(); }
  for (let k = 0; k < 4; k++) { const u = ((T * .5 + k * .25) % 1); c.save(); c.globalAlpha = (1 - u) * .7; shp(c, blob(145 + u * 40, -350 - u * 140, 22 + u * 30, 18 + u * 24, 833 + k, { n: 18 }), '#DCD6C6', { line: false }); c.restore(); }
  tag(c, 'FÁBRICA FICTICIA', 0, 40, { size: 24, bg: C.paper }); c.restore(); }
function node3(c, labels, x0, y0, dy, T, ts, o = {}) { labels.forEach((l, k) => { const kk = pb(T, ts[k]); if (kk <= 0) return;
    pill(c, l, x0, y0 + k * dy, { size: o.size || 40, f: 'ui', sc: kk });
    if (k) { const p = pr(T, ts[k] - .1, .35); arrow(c, [x0 - 120, y0 + (k - 1) * dy + 38], [x0 - 120, y0 + k * dy - 38], p, { bend: -40, w: 6, col: C.goldD }); } }); }

// ================= escenas =================
const RX = [200, 540, 880], RT = ['100', '106', '110'];
// 1 · Gancho: «¿BAJÓ LA INFLACIÓN? MIRA EL RECIBO» y tres recibos desde el primer cuadro
{ const s = 'gancho', t_q = As(s, '¿por qué el súper'), t_c = As(s, 'sigue más caro?');
  hit(t_q, 6, 'ping'); hit(t_c + .2, 10, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .015 * Math.sin(L * 1.3));
    tx(c, '¿BAJÓ LA INFLACIÓN?', 540, 215, { size: 92, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }), max: 980 });
    tx(c, 'MIRA EL RECIBO', 540, 330, { size: 92, col: C.gold, sh: C.ink, max: 980 });
    RX.forEach((x, k) => { receipt(c, x, 680 + Math.sin(T * 2 + k) * 6, 270, 400, RT[k], { sc: pb(T, -.35 + k * .08), rot: (k - 1) * .05, seed: 801 + k * 7, hot: k === 2 && T > t_c, n: String(k + 1) }); });
    for (const [x, s2] of [[370, '+6'], [710, '+4']]) badge(c, s2, x, 520, pb(T, .3 + (x > 500 ? .15 : 0)), x > 500 ? C.gold : C.red);
    tag(c, 'EJEMPLO ILUSTRATIVO · NO ES EL DATO OFICIAL', 540, 950, { size: 28, bg: C.paper });
    const cx = lerp(-200, 380, pr(T, .1, 1.6, easeOutQuint)); cart(c, cx + 230, 1395, 1.0, T);
    person(c, cx, 1420, 1.0, { seed: 3, shirt: C.gold, ...idle(T), walk: T < 1.7 ? T * 8 : undefined, mouth: T > t_c ? 'o' : 'smile', brow: T > t_c ? 1 : 0, sweat: T > t_c ? T : 0, armR: [1.45, .1], look: 1 });
    stamp(c, '¿MÁS CARO?', 820, 1180, T, t_c + .1, { size: 64, col: C.red });
  }); }
// 2 · El recibo: 100 → 106 → 110; la segunda subida fue menor, pero el total nunca bajó
{ const s = 'recibo', t_m = As(s, 'Mira este recibo'), t_100 = As(s, 'de cien'), t_106 = As(s, 'ciento seis,'), t_110 = As(s, 'ciento diez.'), t_men = As(s, 'La segunda subida'), t_nb = As(s, 'pero el total nunca bajó.');
  hit(t_100 + .1, 6, 'ping'); hit(t_106 + .1, 8, 'stamp'); hit(t_110 + .1, 8, 'stamp'); hit(t_men + .3, 12, 'stamp'); hit(t_nb + .3, 10);
  const SY = v => 1330 - (v - 96) * 30;
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 900, key(T, [[0, 1.0], [t_nb, 1.0], [t_nb + .5, 1.03]]) + .012 * Math.sin(L));
    tag(c, 'EJEMPLO ILUSTRATIVO', 540, 175, { size: 30, bg: C.gold });
    const on = [t_100, t_106, t_110];
    RX.forEach((x, k) => { const act = T > on[k]; receipt(c, x, 480, 250, 360, RT[k], { sc: Math.max(.86, pb(T, on[k] - .15)) * (act ? 1 + settle(T, on[k], { amp: .1, freq: 3, decay: 5 }) : .9), rot: (k - 1) * .04, seed: 801 + k * 7, n: String(k + 1), ts: 54 });
      if (!act) { c.save(); c.globalAlpha = .45; c.fillStyle = C.paper; c.fillRect(x - 135, 290, 270, 380); c.restore(); } });
    badge(c, '+6', 370, 300, pb(T, t_106 + .2), C.red); badge(c, '+4', 710, 300, pb(T, t_110 + .2), C.gold);
    stamp(c, 'SUBIÓ MENOS', 710, 760, T, t_men + .3, { size: 56, rot: -.05 });
    if (T > t_men) { ring(c, 710, 300, 70, 56, pr(T, t_men, .4), { col: C.gold }); }
    // escalera del total: 100 → 106 → 110 (siempre hacia arriba)
    const g = pr(T, t_nb - .2, 1.2, easeIO); if (g > 0) { ln(c, [[150, 1330], [940, 1330]], { w: 4, straight: true, seed: 840 });
      const P = [[160, SY(100)], [400, SY(100)], [400, SY(106)], [660, SY(106)], [660, SY(110)], [900, SY(110)]]; ln(c, P, { w: 12, col: C.gold, straight: true, p: g, seed: 841 });
      [[280, 100], [530, 106], [780, 110]].forEach(([x, v], k) => { if (g > .2 + k * .3) tx(c, '$' + v, x, SY(v) - 40, { size: 40, col: C.ink, sh: C.gold }); });
      if (g > .95) { arrow(c, [960, 1200], [960, 1010], 1, { bend: 0, w: 9, col: C.red }); tx(c, 'EL TOTAL SIGUE SUBIENDO', 540, 1420, { size: 44, col: C.red, sh: C.ink, so: 2 }); } }
  }); }
// 3 · El dato: EE. UU. · 10 nov 2026 · IPC mensual con ajuste estacional: septiembre +0,6 %, octubre +0,4 % (BLS)
{ const s = 'dato', t_d = As(s, 'el diez de noviembre'), t_oc = TK ? As(s, 'cero coma cuatro por ciento') : As(s, 'subieron en octubre,'), t_se = TK ? As(s, 'cero coma seis') : As(s, 'más despacio que en septiembre.'),
    t_sd = TK ? As(s, 'Subieron más despacio.') : As(s, 'solo que más despacio'), t_nb = TK ? As(s, 'No se hicieron más baratos.') : null;
  hit(t_d + .1, 6, 'ping'); hit(t_oc + .2, 8, 'stamp'); hit(t_se + .2, 8, 'stamp'); hit(t_sd + .2, 12, 'stamp'); if (t_nb) hit(t_nb + .2, 12);
  const Z = 1150, K = 480, tSep = t_se - .1;
  scene(s, 'news', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, 1.0 + .012 * Math.sin(L * 1.1));
    pill(c, 'EE. UU. · DATO DEL 10 NOV. 2026', 540, 220, { size: 46, f: 'ui', sc: pb(T, sec(s).t0 - .3) });
    tx(c, 'Índice de precios al consumidor · variación mensual', 540, 330, { size: 32, f: 'ui', al: pr(T, t_d, .4) });
    tx(c, 'con ajuste estacional', 540, 375, { size: 28, f: 'ui', col: '#5C6075', al: pr(T, t_d + .3, .4) });
    ln(c, [[120, Z], [960, Z]], { w: 7, straight: true, seed: 850 }); tx(c, '0 %', 90, Z, { size: 26, f: 'ui', align: 'right' });
    // contornos de las dos barras desde el inicio + hoja de calendario del dato (nada vacío mientras arranca la voz)
    c.save(); c.setLineDash([14, 10]); c.strokeStyle = C.ink; c.globalAlpha = .35; c.lineWidth = 4; c.strokeRect(230, Z - .6 * K, 200, .6 * K); c.strokeRect(650, Z - .4 * K, 200, .4 * K); c.restore();
    const kc = pb(T, sec(s).t0 - .2) * (1 - pr(T, Math.min(t_oc, t_se) - .4, .4)); if (kc > 0) card(c, 540, 700, 300, 280, { sc: kc, band: C.red, rot: -.03, seed: 855, draw: cc => {
      tx(cc, 'NOV 2026', 0, -105, { size: 34, f: 'ui', col: C.paper }); tx(cc, '10', 0, 10, { size: 120, col: C.ink, sh: C.gold }); tx(cc, 'BLS · EE. UU.', 0, 100, { size: 28, f: 'ui' }); } });
    const gS = pr(T, tSep, .7, easeOutBack), gO = pr(T, t_oc, .7, easeOutBack);
    if (gS > .01) shp(c, R4(230, Z - .6 * K * gS, 200, .6 * K * gS), C.gold, { sharp: true, w: 5, lc: C.ink, seed: 851, hatch: C.goldD, hal: .4 });
    if (gO > .01) shp(c, R4(650, Z - .4 * K * gO, 200, .4 * K * gO), C.goldL, { sharp: true, w: 5, lc: C.ink, seed: 852, hatch: C.goldD, hal: .35 });
    pill(c, '+0,6 %', 330, Z - .6 * K - 70, { size: 56, sc: pb(T, tSep + .3) }); pill(c, '+0,4 %', 750, Z - .4 * K - 70, { size: 56, sc: pb(T, t_oc + .3) });
    tx(c, 'SEPTIEMBRE', 330, Z + 50, { size: 34, f: 'ui', al: pr(T, tSep, .3) }); tx(c, 'OCTUBRE', 750, Z + 50, { size: 34, f: 'ui', al: pr(T, t_oc, .3) });
    tx(c, 'subió', 330, Z + 95, { size: 34, f: 'hand', col: C.goldD, al: pr(T, tSep + .3, .3) }); tx(c, 'subió (menos)', 750, Z + 95, { size: 34, f: 'hand', col: C.goldD, al: pr(T, t_oc + .3, .3) });
    stamp(c, 'SUBIERON MÁS DESPACIO', 540, 560, T, t_sd + .1, { size: 54 });
    if (t_nb) stamp(c, 'NO SE HICIERON MÁS BARATOS', 540, 680, T, t_nb + .1, { size: 44, col: C.red, rot: .04 });
    tx(c, 'Fuente: BLS · cifras de EE. UU., no de Colombia', 540, 1320, { size: 26, f: 'ui', al: .8 });
  }); }
// 4 · Short: por qué le importa a un inversor (inflación → expectativa de tasas → costo de pedir prestado)
if (!TK) { const s = 'inversor', t_q = As(s, '¿Y por qué le importa'), t_i = As(s, 'Porque la inflación influye'), t_t = As(s, 'las tasas de interés.'), t_p = As(s, 'lo que cuesta pedir prestado.');
  hit(t_q + .2, 6, 'ping'); hit(t_i + .2, 6, 'stamp'); hit(t_t + .2, 8, 'stamp'); hit(t_p + .2, 10, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, 1.0 + .015 * Math.sin(L));
    tx(c, '¿Por qué le importa a un inversor?', 540, 230, { size: 64, f: 'hand', clipP: pr(T, t_q, .7, easeIO), max: 980 });
    person(c, 220, 1420, 1.0, { seed: 4, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_p ? 'o' : 'smile', armR: T > t_q ? [1.0, 1.4] : [.22, .12], prop: (cc, hL, hR) => { if (T > t_q) shp(cc, R4(hR[0] - 18, hR[1] - 50, 36, 62), C.navy, { sharp: true, w: 3, lc: C.ink, seed: 860 }); } });
    node3(c, ['INFLACIÓN', 'LO QUE SE ESPERA DE LAS TASAS', 'COSTO DE PEDIR PRESTADO'], 600, 470, 250, T, [t_i, t_t - .3, t_p - .2], { size: 34 });
    burst(c, 600, 990, T, t_p + .2, { R: 240 });
  }); }
// 4 · TikTok: la empresa que quiere financiar una fábrica (cotización de préstamo ficticia, sin tasas inventadas)
if (TK) { const s = 'empresa', t_e = As(s, 'Ahora piensa en una empresa'), t_f = As(s, 'financiar una fábrica.'), t_c = As(s, 'Si pedir prestado'), t_m = As(s, 'puede costarle más'), t_w = As(s, 'tener que esperar.'),
    t_cd = As(s, 'Si espera mejores condiciones,'), t_pl = As(s, 'sus planes pueden cambiar.'), t_inv = As(s, 'Por eso los inversores'), t_ng = As(s, 'para los negocios');
  hit(t_e + .2, 6, 'ping'); hit(t_f + .2, 8, 'stamp'); hit(t_c + .2, 8); hit(t_m + .1, 8, 'stamp'); hit(t_w + .1, 8, 'stamp'); hit(t_pl + .1, 8, 'ping'); hit(t_inv + .2, 6, 'ping'); hit(t_ng + .2, 10, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, key(T, [[0, 540], [t_inv - .2, 540], [t_inv + .4, 560]]), key(T, [[0, 900], [t_inv - .2, 900], [t_inv + .4, 980]]), 1.0 + .012 * Math.sin(L));
    // el recibo se convierte en cotización de préstamo
    const fl = pr(T, sec(s).t0, .6, easeIO); if (fl < .5) receipt(c, 540, 470, 300, 380, '110', { sc: 1 - fl * 2, seed: 815 });
    const kq = fl >= .5 ? (fl - .5) * 2 : 0; if (kq > 0) card(c, 540, 470, 820, 400, { sc: kq, band: C.navy, rot: -.01, seed: 870, draw: cc => {
      tx(cc, 'COTIZACIÓN DE PRÉSTAMO', 0, -165, { size: 38, f: 'ui', col: C.gold });
      tx(cc, 'Proyecto: fábrica (empresa ficticia)', -370, -80, { size: 32, f: 'ui', align: 'left', al: pr(T, t_f, .4) });
      tx(cc, 'Costo de pedir prestado:', -370, -10, { size: 32, f: 'ui', align: 'left', al: pr(T, t_c, .4) });
      tx(cc, 'depende de las tasas', 140, -10, { size: 32, f: 'hand', align: 'left', col: C.goldD, sh: null, al: pr(T, t_c + .3, .4) });
      tx(cc, 'Ejemplo ilustrativo · sin tasas reales', 0, 150, { size: 26, f: 'ui', col: '#5C6075' }); } });
    factory(c, 270, 1180, 1.0 * pb(T, t_e + .1), T);
    tag(c, 'SI SIGUE CARO…', 790, 790, { size: 34, bg: C.paper, sc: pb(T, t_c + .2) });
    stamp(c, 'CUESTA MÁS', 790, 900, T, t_m, { size: 50, col: C.red });
    stamp(c, 'ESPERA', 740, 1030, T, t_w, { size: 50, rot: .05 });
    if (T > t_w) { c.save(); c.translate(960, 1030); const a = T * 3; shp(c, blob(0, 0, 40, 40, 875, { n: 24 }), C.paper, { w: 4, lc: C.ink, seed: 875 }); ln(c, [[0, 0], [Math.cos(a) * 28, Math.sin(a) * 28]], { w: 5, seed: 876 }); ln(c, [[0, 0], [0, -20]], { w: 6, seed: 877 }); c.restore(); }
    if (T > t_cd) { const p = pr(T, t_pl - .3, .6); ln(c, [[520, 1200], [640, 1160], [760, 1220]], { w: 7, col: C.goldD, p, seed: 878 }); tx(c, 'PLAN A', 520, 1250, { size: 28, f: 'ui', al: pr(T, t_cd, .3) }); tx(c, 'PLAN B', 780, 1265, { size: 28, f: 'ui', col: C.goldD, al: p }); }
    if (T > t_inv) { const k = pb(T, t_inv); c.save(); c.globalAlpha = Math.min(1, k); c.translate(0, 0);
      [['INFLACIÓN', 230], ['TASAS', 540], ['NEGOCIOS', 850]].forEach(([l, x], i) => { pill(c, l, x, 1420, { size: 34, f: 'ui', sc: pb(T, t_inv + i * .35) }); if (i) arrow(c, [x - 230, 1420], [x - 100, 1420], pr(T, t_inv + i * .35, .3), { bend: 0, w: 6, col: C.goldD }); }); c.restore();
      burst(c, 850, 1420, T, t_ng + .1, { R: 200 }); }
  }); }
// 5 · Cierre (noche): un informe no decide; «¿BAJÓ EL PRECIO O BAJÓ EL RITMO?», aviso y firma
{ const s = 'cierre', t0 = sec(s).t0, t_pr = As(s, 'La próxima vez'), t_bp = As(s, '¿bajaron los precios'), t_rt = As(s, 'o solo subieron más despacio?'), t_end = DD.words[DD.words.length - 1][2];
  const t_fed = TK ? As(s, 'qué hará la Fed') : null, t_ac = TK ? As(s, 'cómo se moverá una acción.') : null;
  if (TK) { hit(t_fed + .1, 8, 'stamp'); hit(t_ac + .1, 8, 'stamp'); } hit(t_bp + .1, 8, 'ping'); hit(t_rt + .2, 12, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    if (TK) { const fade = 1 - pr(T, t_pr - .3, .4), k = pb(T, t0 - .2) * fade; if (k > 0) { c.save(); c.translate(540, 420); c.scale(k, k); newspaper(c, 0, 0, 380, 250, -.04, { title: '1 INFORME', seed: 880 }); c.restore(); }
      if (fade > 0) { c.save(); c.globalAlpha = fade; tag(c, '≠ DECISIÓN DE LA FED', 330, 640, { size: 32, bg: C.paper, sc: pb(T, t_fed) }); tag(c, '≠ MOVIMIENTO DE UNA ACCIÓN', 760, 720, { size: 32, bg: C.paper, sc: pb(T, t_ac) }); c.restore(); } }
    const kq = pr(T, t_pr - .2, .5); if (kq > 0) { RX.forEach((x, k) => receipt(c, x, 1090, 200, 290, RT[k], { sc: kq * .9, rot: (k - 1) * .05, seed: 801 + k * 7, ts: 44 })); arrow(c, [120, 1300], [960, 1250], pr(T, t_pr + .3, .6), { bend: -30, w: 8, col: C.gold }); }
    tx(c, '¿BAJÓ EL PRECIO', 540, TK ? 300 : 360, { size: 88, col: C.chalk, sh: C.goldD, clipP: pr(T, t_bp, .6, easeIO), max: 1000 });
    tx(c, 'O BAJÓ EL RITMO?', 540, TK ? 410 : 470, { size: 88, col: C.gold, sh: null, clipP: pr(T, t_rt, .6, easeIO), max: 1000 });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1420, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1490, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada: el primer fotograma, sin subtítulos =================
function cover(c) { drawScene(c, SC[0], 1.6); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('inflacion-recibo', cover);
