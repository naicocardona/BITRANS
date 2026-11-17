// TITÁN · Largo YouTube 16:9 «100 dólares al mes desde Colombia» · kit híbrido (hd_lib en modo 'yt' = 1920×1080)
// EJEMPLO HIPOTÉTICO con datos reales: SER (series mes a mes de tools/dca/calc.py) y GEO (contorno de Colombia) se inyectan en build.sh.
// Voces de personajes: HUECOS en la narración (PAUSAS de guiones.py); las burbujas aparecen en esos huecos.
'use strict';
const sec = id => SEC[id];
const YOU = C.gold;
const M2Y = m => +m.slice(0, 4) + (+m.slice(5, 7) - 1) / 12;
const usd = v => 'USD ' + Math.round(v).toLocaleString('es-CO').replace(/,/g, '.');
const cop = v => '$' + Math.round(v).toLocaleString('es-CO').replace(/,/g, '.');

// ---------- piezas ----------
function bubble(c, s, x, y, k, o = {}) { if (k <= 0) return; const size = o.size || 40, w = tw(c, s, { size, f: 'hand' }) + 70, h = size * 1.9;
  c.save(); c.translate(x, y); c.rotate(o.rot ?? 0); c.scale(k, k);
  shp(c, [[(o.tail ?? 0) - 18, h / 2 - 6], [(o.tail ?? 0) + 18, h / 2 - 6], [(o.tail ?? 0) * 1.4, h / 2 + 46]], o.bg || C.paper, { w: 4, lc: C.ink, seed: 4101 });
  shp(c, blob(0, 0, w / 2, h / 2, o.seed ?? 4102, { n: 30, amp: .03 }), o.bg || C.paper, { w: 4, lc: C.ink, seed: o.seed ?? 4102 });
  tx(c, s, 0, 3, { size, f: 'hand', col: o.col || C.ink, sh: null }); c.restore(); }
function coin(c, x, y, r, seed) { shp(c, blob(x, y, r, r, seed, { n: 22, amp: .02 }), C.gold, { w: 4, lc: C.ink, seed }); tx(c, '$', x, y + 2, { size: r * 1.1, col: C.goldD, sh: null }); }
function jar(c, x, y, s, fill, seed = 4110) { c.save(); c.translate(x, y); c.scale(s, s);
  const f = clamp(fill, 0, 1); if (f > 0) shp(c, R4(-70, 100 - 180 * f, 140, 180 * f), '#7DBE8E', { sharp: true, w: 3, lc: C.ink, seed: seed + 1 });
  shp(c, [[-80, -100], [80, -100], [85, 100], [-85, 100]], 'rgba(200,230,240,.35)', { w: 5, lc: C.ink, seed }); shp(c, R4(-90, -125, 180, 30), C.goldD, { sharp: true, w: 4, lc: C.ink, seed: seed + 2 }); c.restore(); }
function plant(c, x, y, g, seed = 4120) { if (g <= 0) return; ln(c, [[x, y], [x, y - 220 * g]], { w: 9, col: C.green, seed }); for (let k = 0; k < 6; k++) if (g > k / 6) shp(c, blob(x + (k % 2 ? 36 : -36), y - 30 - k * 34 * g, 30, 14, seed + 1 + k, { n: 14 }), C.green, { w: 3, lc: C.ink, seed: seed + 1 + k });
  shp(c, [[x - 50, y], [x + 50, y], [x + 38, y + 70], [x - 38, y + 70]], C.goldD, { w: 4, lc: C.ink, seed: seed + 9 }); }
function tvbox(c, x, y, s, T, txt) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, R4(-200, -130, 400, 260), C.ink, { sharp: true, w: 5, lc: C.ink, seed: 4130 });
  c.fillStyle = '#8B1E2E'; c.fillRect(-180, -110, 360, 190); c.fillStyle = '#fff'; c.fillRect(-180, 40, 360, 40); tx(c, txt, 0, 60, { size: 28, f: 'ui', col: C.red, max: 340 });
  for (let k = 0; k < 3; k++) { const yy = -70 + k * 34; ln(c, [[-150, yy], [-150 + 260 * (.6 + .4 * Math.sin(T * 3 + k)), yy]], { w: 8, col: '#fff', al: .7, seed: 4131 + k }); }
  ln(c, [[-60, 130], [-90, 175]], { w: 6, seed: 4135 }); ln(c, [[60, 130], [90, 175]], { w: 6, seed: 4136 }); c.restore(); }
// gráfica: escalera dorada = lo que pusiste; línea navy = lo que vale. Se dibuja hasta el progreso p (0–1). Devuelve el mapeo.
function chart(c, S, x0, y0, w, h, p, o = {}) { const n = S.length, vmax = o.vmax || Math.max(...S.map(r => Math.max(r[1], r[2]))) * 1.08, X = i => x0 + w * i / (n - 1), Y = v => y0 + h - h * v / vmax;
  shp(c, R4(x0 - 30, y0 - 30, w + 60, h + 60), C.paper, { sharp: true, w: 4, lc: C.ink, seed: 4140 });
  for (let k = 1; k <= 4; k++) { c.save(); c.globalAlpha = .12; c.strokeStyle = C.ink; c.lineWidth = 2; c.beginPath(); c.moveTo(x0, y0 + h * k / 5); c.lineTo(x0 + w, y0 + h * k / 5); c.stroke(); c.restore(); }
  const yrs = o.ticks || []; for (const yr of yrs) { const i = S.findIndex(r => r[0] === yr + '-01'); if (i >= 0) tx(c, String(yr), X(i), y0 + h + 34, { size: 24, f: 'ui', col: '#6B6F85' }); }
  const m = Math.max(1, Math.floor((n - 1) * clamp(p, 0, 1)) + 1);
  if (o.fill !== false) { c.save(); c.globalAlpha = .18; c.fillStyle = C.green; c.beginPath(); c.moveTo(X(0), Y(S[0][1])); for (let i = 0; i < m; i++) c.lineTo(X(i), Y(S[i][2])); for (let i = m - 1; i >= 0; i--) c.lineTo(X(i), Y(S[i][1])); c.closePath(); c.fill(); c.restore(); }
  const inv = [], val = []; for (let i = 0; i < m; i++) { inv.push([X(i), Y(S[i][1])]); val.push([X(i), Y(S[i][2])]); }
  if (inv.length > 1) { c.save(); c.setLineDash([14, 10]); c.strokeStyle = C.goldD; c.lineWidth = 5; c.beginPath(); inv.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke(); c.restore();
    c.save(); c.strokeStyle = o.col || C.navy; c.lineWidth = 7; c.lineJoin = 'round'; c.beginPath(); val.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke(); c.restore();
    const [hx, hy] = val[val.length - 1]; c.save(); c.fillStyle = o.col || C.navy; c.beginPath(); c.arc(hx, hy, 11, 0, TAU); c.fill(); c.restore(); }
  if (o.legend !== false) { tag(c, '— LO QUE VALE', x0 + 120, y0 + 10, { size: 22, bg: C.paper, col: o.col || C.navy }); tag(c, '- - LO QUE PUSISTE', x0 + 130, y0 + 58, { size: 22, bg: C.paper, col: C.goldD }); }
  return { X, Y, idx: mm => S.findIndex(r => r[0] === mm), m }; }
const prog = (T, a, b) => pr(T, a, Math.max(.1, b - a), t => t);
function hipo(c, x = CX, y = 150) { tag(c, 'EJEMPLO HIPOTÉTICO · DATOS REALES', x, y, { size: 24, bg: C.paper }); }
function src(c, s) { tx(c, s, CX, 905, { size: 20, f: 'ui', al: .75, max: 1700 }); }

// ================= escenas =================
// 0 · Gancho: la alcancía mensual, el contador de 240 meses y la cifra que estalla
{ const s = 'gancho', t_c = As(s, 'cien dólares al mes,'), t_v = As(s, 'durante veinte años,'), t_24 = As(s, 'habría puesto veinticuatro'), t_hoy = As(s, 'Hoy tendría'), t_103 = As(s, 'ciento tres mil ochocientos dos.'),
    t_nad = As(s, 'Pero casi nadie'), t_tres = As(s, 'Es por tres momentos'), t_cta = As(s, 'Hoy hicimos la cuenta'), t_dp = As(s, 'en dólares y en pesos.'), t_err = As(s, 'Y al final');
  hit(.05, 8, 'stamp'); hit(t_c + .1, 6, 'ping'); hit(t_24 + .2, 10, 'stamp'); hit(t_103 + .3, 18, 'stamp'); hit(t_nad + .1, 10, 'impact'); hit(t_tres + .3, 12, 'stamp'); hit(t_cta + .2, 8, 'ping'); hit(t_err + .2, 10, 'stamp');
  const S = SER['20'];
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, CX, CY, key(T, [[0, 1.0], [t_103, 1.0], [t_103 + .5, 1.05], [t_nad + .4, 1.0]]) + .01 * Math.sin(L * 1.2));
    tx(c, '100 DÓLARES AL MES', 560, 170, { size: 84, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, '¿CUÁNTO SERÍAN HOY?', 560, 265, { size: 60, col: C.goldD, sh: C.ink });
    hipo(c, 560, 340);
    // la persona deja caer una moneda cada mes
    const months = Math.min(240, Math.floor(prog(T, t_c, t_24) * 240)); const ph = (T * 2.2) % 1;
    person(c, 300, 900, 1.0, { seed: 5, shirt: YOU, ...idle(T), armR: [1.6 + Math.sin(ph * TAU) * .2, .6], mouth: T > t_nad ? 'flat' : 'smile', look: 1 });
    jar(c, 560, 760, 1.1, Math.min(1, months / 240 + .05));
    if (T < t_24 + .5) { c.save(); c.globalAlpha = 1 - ph; coin(c, 430 + ph * 120, 560 + ph * 180, 22, 4150); c.restore(); }
    pill(c, `MES ${months} / 240`, 560, 470, { size: 40, f: 'ui', sc: pb(T, t_c), col: C.goldL });
    pill(c, 'PUSISTE ' + usd(24000), 560, 1000 - 70, { size: 38, f: 'ui', sc: pb(T, t_24) });
    // gráfica real de 20 años a la derecha
    const ch = chart(c, S, 1060, 250, 760, 450, prog(T, t_v, t_103), { ticks: [2008, 2012, 2016, 2020, 2024] });
    if (T > t_103) { pill(c, 'HOY: ' + usd(103802), 1500, 320, { size: 54, sc: pb(T, t_103 + .2) }); burst(c, 1820, ch.Y(103802), T, t_103 + .3, { R: 160, n: 18 }); }
    if (T > t_tres) { [['?', 1290], ['?', 1480], ['?', 1670]].forEach(([q, x], k) => { const kk = pb(T, t_tres + .3 + k * .35); if (kk > 0) { c.save(); c.translate(x, 805); c.scale(kk, kk); shp(c, blob(0, 0, 42, 42, 4160 + k, { n: 20 }), C.red, { w: 4, lc: C.ink, seed: 4160 + k }); tx(c, q, 0, 4, { size: 60, col: C.paper, sh: null }); c.restore(); } }); tx(c, '3 MOMENTOS EN LOS QUE CASI TODOS SE RINDEN', 1480, 880, { size: 30, f: 'ui', col: C.red, al: pr(T, t_tres + .2, .4), max: 820 }); }
    if (T > t_cta) [['10 AÑOS', 0], ['20 AÑOS', 1], ['30 AÑOS', 2]].forEach(([s2, k]) => tag(c, s2, 1180 + k * 230, 175, { size: 28, sc: pb(T, t_cta + .3 + k * .25), bg: k === 1 ? C.gold : C.paper }));
    if (T > t_dp) { tag(c, 'USD', 1870, 150, { size: 28, sc: pb(T, t_dp), bg: C.goldL }); tag(c, '$ PESOS', 1850, 205, { size: 28, sc: pb(T, t_dp + .3), bg: C.goldL }); }
    stamp(c, 'Y LOS ERRORES QUE MÁS PLATA CUESTAN', 1360, 520, T, t_err + .1, { size: 38, col: C.red, rot: -.03 });
  }); }

// 1 · Las reglas del experimento
{ const s = 'reglas', t_h = As(s, 'Es un ejemplo hipotético,'), t_f = As(s, 'Cada mes compramos'), t_sp = As(s, 'el índice de las quinientas'), t_c = As(s, 'Ese fondo ya descuenta'), t_d = As(s, 'Los dividendos se reinvierten,'),
    t_30 = As(s, 'te retiene el treinta'), t_tr = As(s, 'Colombia no tiene tratado'), t_no = As(s, 'Lo que no incluimos:'), t_dt = As(s, 'Los datos llegan');
  [t_h, t_f, t_c, t_d, t_tr, t_no, t_dt].forEach((t, k) => hit(t + .1, 6 + (k % 3) * 2, k % 2 ? 'ping' : 'stamp')); hit(t_30 + .2, 14, 'stamp');
  const R = [[Math.min(t_h, SEC[s].t0 + .3), 'EJEMPLO HIPOTÉTICO · PRECIOS REALES', C.paper], [t_f, 'USD 100 CADA MES → FONDO QUE COPIA EL S&P 500', C.goldL], [t_c, 'EL FONDO YA DESCUENTA SU COSTO', C.paper],
    [t_d, 'DIVIDENDOS REINVERTIDOS… MENOS 30 % DE RETENCIÓN EN EE. UU.', '#FFD9D1'], [t_no, 'SIN COMISIONES DEL BRÓKER NI IMPUESTOS EN COLOMBIA', C.paper], [t_dt, 'DATOS HASTA OCTUBRE DE 2026', C.goldL]];
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, CX + Math.sin(L * .3) * 20, CY, 1.0 + .01 * Math.sin(L));
    tx(c, 'LAS REGLAS DEL EXPERIMENTO', 1150, 140, { size: 76, col: C.ink, sc: pb(T, sec(s).t0 - .2) });
    R.forEach(([t, txt, bgc], k) => { const kk = pb(T, t - .1); if (kk <= 0) return; const y = 260 + k * 105; card(c, 1150, y, 1240, 84, { sc: kk, bg: bgc, seed: 4200 + k, rot: (k % 2 ? .006 : -.006) });
      tx(c, txt, 1150, y + 2, { size: 34, f: 'ui', col: C.ink, max: 1150 }); if (T > t + .5) tx(c, '✓', 560, y, { size: 56, col: C.green, sh: null, sc: pb(T, t + .5) }); });
    if (T > t_sp) pill(c, '500 EMPRESAS', 1700, 330, { size: 30, f: 'ui', sc: pb(T, t_sp), rot: .05 });
    if (T > t_tr) stamp(c, 'COLOMBIA NO TIENE TRATADO CON EE. UU.', 1150, 980 - 100, T, t_tr + .1, { size: 36, col: C.red, rot: -.02 });
    person(c, 300, 960, 1.05, { seed: 5, shirt: YOU, ...idle(T), look: 1, mouth: 'smile', armR: [1.9, .9], prop: (cc, hL, hR) => { cc.save(); cc.translate(hR[0] + 20, hR[1] - 40); cc.rotate(-.2); shp(cc, R4(-50, -70, 100, 140), C.paper, { sharp: true, w: 4, lc: C.ink, seed: 4220 }); for (let k = 0; k < 4; k++) ln(cc, [[-34, -40 + k * 30], [34, -40 + k * 30]], { w: 3, seed: 4221 + k }); cc.restore(); } });
  }); }

// 2 · 10 años: la gráfica real y el susto de marzo de 2020 (personaje p2020)
{ const s = 'diez', t_n = As(s, 'Noviembre de dos mil dieciséis.'), t_12 = As(s, 'pusiste doce mil'), t_hv = As(s, 'Hoy valen veinticinco'), t_dob = As(s, 'Un poco más del doble.'), t_pas = As(s, 'Pero en el camino'),
    t_m20 = As(s, 'Marzo de dos mil veinte.'), t_41 = As(s, 'cuatro mil cien dólares.'), t_40 = As(s, 'Cuatro mil cuarenta y ocho.'), t_cero = As(s, 'y cero ganancia.'), t_sale = As(s, 'Y se sale.'), t_dup = As(s, 'Justo antes');
  const w_cero = DD.words.find(w => w[1] >= t_cero - .01 && /ganancia/.test(w[0]))[2];
  hit(t_n + .1, 6, 'ping'); hit(t_12 + .2, 8, 'stamp'); hit(t_hv + .2, 12, 'stamp'); hit(t_m20 + .1, 18, 'impact'); hit(t_40 + .2, 12, 'stamp'); hit(w_cero + .2, 8, 'ping'); hit(t_sale + .1, 8, 'impact'); hit(t_dup + .2, 10, 'stamp');
  const S = SER['10'];
  scene(s, 'iris', (c, T, L) => {
    bg(c, T);
    const zIn = pr(T, t_m20, .8, easeIO) * (1 - pr(T, t_dup, .8, easeIO));
    camS(c, T, lerp(CX, 900, zIn), lerp(CY, 600, zIn), 1 + .22 * zIn + .01 * Math.sin(L));
    tx(c, '10 AÑOS · 2016 → 2026', 960, 120, { size: 72, col: C.ink, sc: pb(T, sec(s).t0 - .2) }); hipo(c, 960, 190);
    const p = T < t_m20 ? prog(T, t_n, t_m20) * (40 / 119) : T < t_dup ? 40 / 119 : 40 / 119 + prog(T, t_dup, sec(s).t1 - .5) * (79 / 119);
    const p2 = T < t_12 ? p : Math.max(p, T < t_m20 ? 1 : p); const pp = T > t_12 && T < t_m20 ? 1 : p;
    const ch = chart(c, S, 360, 260, 1200, 560, pp, { ticks: [2018, 2020, 2022, 2024, 2026] });
    if (T > t_12 && T < t_m20) { pill(c, 'PUSISTE ' + usd(12000), 760, 300, { size: 40, f: 'ui', sc: pb(T, t_12) }); }
    if (T > t_hv && T < t_m20) { pill(c, 'HOY: ' + usd(25792), 1300, 300, { size: 52, sc: pb(T, t_hv + .2) }); stamp(c, '×2,15', 1460, 420, T, t_dob, { size: 60, col: C.goldD, rot: .05 }); }
    const i20 = ch.idx('2020-03'); const x20 = ch.X(i20), y20 = ch.Y(S[i20][2]);
    if (T > t_m20 - .2 && T < t_dup + .5) { ring(c, x20, y20, 60, 60, pr(T, t_m20, .5), { col: C.red, w: 8, seed: 4301 }); tag(c, 'MARZO 2020 · PANDEMIA', x20, y20 - 120, { size: 26, bg: '#FFD9D1', sc: pb(T, t_m20 + .1) });
      pill(c, 'PUSISTE ' + usd(4100), x20 - 260, y20 + 120, { size: 30, f: 'ui', sc: pb(T, t_41) }); pill(c, 'VALÍA ' + usd(4048), x20 + 240, y20 + 120, { size: 30, f: 'ui', sc: pb(T, t_40), col: '#FFB4A6' });
      stamp(c, '0 GANANCIA', x20, y20 - 210, T, w_cero - .3, { size: 44, col: C.red, rot: -.04 }); }
    // personaje p2020: joven con el celular (su voz va en el hueco después de «cero ganancia»)
    const kb = pb(T, w_cero + .15) * (1 - pr(T, t_sale + .6, .3));
    const walk = pr(T, t_sale, 1.6, easeIn);
    person(c, lerp(1300, 2150, walk), 860, .85, { seed: 13, shirt: C.lav, ...idle(T, 1), look: -1, mouth: T > w_cero ? 'o' : 'flat', brow: T > t_m20 ? 1 : 0, sweat: T > t_m20 ? T : 0, walk: walk > 0 && walk < 1 ? L * 8 : undefined, flip: walk > 0,
      armR: [1.3, 1.2], prop: (cc, hL, hR) => { cc.save(); cc.translate(hR[0], hR[1] - 40); shp(cc, R4(-24, -42, 48, 84), C.ink, { w: 3, lc: C.ink, seed: 4310 }); cc.fillStyle = '#FFD9D1'; cc.fillRect(-18, -34, 36, 60); cc.restore(); } });
    bubble(c, '¿Tres años invirtiendo… para esto?', 1180, 420, kb, { tail: 120, seed: 4311, size: 36, bg: '#FFD9D1' });
    if (T > t_dup) { pill(c, 'HOY: ' + usd(25792), 1300, 300, { size: 52, sc: pb(T, t_dup + .6) }); tag(c, 'LA CUENTA SE DUPLICÓ DESPUÉS', 860, 300, { size: 26, sc: pb(T, t_dup + .3) }); }
    src(c, 'Precios mensuales de SPY con dividendos (Yahoo Finance) · retención 30 % · cálculo TITÁN');
  }); }

// 3 · 20 años: febrero de 2009, la noticia de pánico y los dos personajes
{ const s = 'veinte', t_n = As(s, 'Noviembre de dos mil seis.'), t_24 = As(s, 'Pusiste veinticuatro mil'), t_hv = As(s, 'Hoy valen ciento tres'), t_4v = As(s, 'Más de cuatro veces'), t_duro = As(s, 'el momento más duro'),
    t_f9 = As(s, 'Febrero de dos mil nueve.'), t_cr = As(s, 'La crisis financiera.'), t_bq = As(s, 'Bancos quebrando,'), t_28 = As(s, 'dos mil ochocientos dólares.'), t_16 = As(s, 'mil seiscientos sesenta y ocho.'),
    t_40 = As(s, 'Un cuarenta por ciento menos.'), t_im = As(s, 'Imagina ver eso.'), t_ven = As(s, 'La reacción natural'), t_conv = As(s, 'convirtió una caída temporal'), t_sig = As(s, 'Y quien siguió'), t_bar = As(s, 'compró barato');
  const w_im = DD.words.find(w => w[1] >= t_im && /eso/.test(w[0]))[2], w_mi = DD.words.find(w => w[1] >= t_bar && /miedo/.test(w[0]))[2];
  hit(t_n + .1, 6, 'ping'); hit(t_24 + .2, 8, 'stamp'); hit(t_hv + .2, 14, 'stamp'); hit(t_f9 + .1, 18, 'impact'); hit(t_cr + .1, 10, 'stamp'); hit(t_16 + .2, 12, 'stamp'); hit(t_40 + .1, 14, 'stamp');
  hit(w_im + .2, 10, 'impact'); hit(t_conv + .2, 8, 'ping'); hit(t_sig + .1, 8, 'ping'); hit(w_mi + .3, 8, 'ping');
  const S = SER['20'];
  scene(s, 'news', (c, T, L) => {
    bg(c, T);
    const zIn = pr(T, t_f9, .8, easeIO) * (1 - pr(T, sec(s).t1 - 3, 1, easeIO));
    camS(c, T, CX, lerp(CY, 570, zIn), 1 + .1 * zIn + .01 * Math.sin(L));
    tx(c, '20 AÑOS · 2006 → 2026', 960, 120, { size: 72, col: C.ink, sc: pb(T, sec(s).t0 - .2) }); hipo(c, 960, 190);
    const i9 = 27; const pp = T < t_24 ? prog(T, t_n, t_24) : T < t_duro ? 1 : T < t_f9 ? 1 : 1;
    const ch = chart(c, S, 300, 260, 1100, 560, pp, { ticks: [2008, 2012, 2016, 2020, 2024] });
    if (T > t_24 && T < t_f9) pill(c, 'PUSISTE ' + usd(24000), 700, 300, { size: 40, f: 'ui', sc: pb(T, t_24) });
    if (T > t_hv && T < t_f9) { pill(c, 'HOY: ' + usd(103802), 1130, 300, { size: 52, sc: pb(T, t_hv + .2) }); stamp(c, '×4,33', 1300, 420, T, t_4v, { size: 60, col: C.goldD, rot: .05 }); }
    const ix = ch.idx('2009-02'), x9 = ch.X(ix), y9 = ch.Y(S[ix][2]);
    if (T > t_f9 - .2) { ring(c, x9, y9, 50, 50, pr(T, t_f9, .5), { col: C.red, w: 8, seed: 4401 }); tag(c, 'FEBRERO 2009', x9 + 40, y9 - 110, { size: 26, bg: '#FFD9D1', sc: pb(T, t_f9 + .1) });
      pill(c, 'PUSISTE ' + usd(2800), x9 + 260, y9 - 40, { size: 30, f: 'ui', sc: pb(T, t_28) }); pill(c, 'VALÍA ' + usd(1668), x9 + 260, y9 + 40, { size: 30, f: 'ui', sc: pb(T, t_16), col: '#FFB4A6' });
      stamp(c, '−40 %', x9 + 260, y9 + 140, T, t_40, { size: 70, col: C.red, rot: -.05 }); }
    if (T > t_cr) tvbox(c, 1620, 340, .78 * pb(T, t_cr), T, T > t_bq ? 'BANCOS QUEBRANDO' : 'CRISIS FINANCIERA');
    // p2009: alarmado frente al televisor; p2009b: tranquilo con café
    person(c, 1540, 960, .82, { seed: 7, shirt: '#3B4466', ...idle(T, 2), look: 1, mouth: T > t_cr ? 'o' : 'flat', brow: T > t_cr ? 1 : 0, sweat: T > t_bq ? T : 0, armL: T > w_im ? [2.7, .3] : undefined, armR: T > w_im ? [2.7, .3] : undefined, bob: T > w_im && T < w_im + 2.5 ? Math.abs(Math.sin(T * 12)) * -10 : undefined });
    bubble(c, '¡Vendo todo antes de que se caiga más!', 1420, 560, pb(T, w_im + .15) * (1 - pr(T, t_ven + 2, .3)), { tail: 90, seed: 4410, size: 34, bg: '#FFD9D1' });
    if (T > t_sig - .3) { person(c, 1740, 960, .82, { seed: 3, shirt: C.vio, ...idle(T, 4), look: -1, mouth: 'smile', armR: [1.4, 1.3], prop: (cc, hL, hR) => { cc.save(); cc.translate(hR[0] + 6, hR[1] - 26); shp(cc, R4(-22, -26, 44, 52), C.paper, { sharp: true, w: 3, lc: C.ink, seed: 4420 }); ln(cc, [[-12, -40], [-6, -56]], { w: 3, col: '#9AA', seed: 4421 }); cc.restore(); } });
      bubble(c, 'Yo sigo con mis cien dólares. Este mes salen más baratos.', 1360, 600, pb(T, w_mi + .15), { tail: 300, seed: 4411, size: 30 }); }
    if (T > t_conv) tag(c, 'VENDER = CONVERTIR LA CAÍDA EN PÉRDIDA REAL', 900, 330, { size: 26, bg: '#FFD9D1', sc: pb(T, t_conv) });
    if (T > t_bar) tag(c, 'SEGUIR = COMPRAR MÁS BARATO', 900, 385, { size: 26, bg: C.goldL, sc: pb(T, t_bar) });
    src(c, 'Precios mensuales de SPY con dividendos (Yahoo Finance) · retención 30 % · cálculo TITÁN');
  }); }

// 4 · 30 años: la línea completa con las crisis marcadas
{ const s = 'treinta', t_n = As(s, 'Noviembre de mil novecientos noventa y seis.'), t_36 = As(s, 'Treinta y seis mil dólares'), t_hv = As(s, 'Hoy valen doscientos'), t_6 = As(s, 'Casi seis veces.'),
    t_bur = As(s, 'la burbuja de las empresas'), t_08 = As(s, 'la crisis de dos mil ocho,'), t_pan = As(s, 'la pandemia y'), t_no = As(s, 'No porque alguien'), t_nun = As(s, 'nunca dejó de poner.');
  [t_n, t_36, t_bur, t_08, t_pan].forEach((t, k) => hit(t + .1, 6 + k, k % 2 ? 'ping' : 'stamp')); hit(t_hv + .2, 16, 'stamp'); hit(t_nun + .1, 12, 'stamp');
  const S = SER['30'];
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, CX, CY, 1.0 + .015 * Math.sin(L * .8));
    tx(c, '30 AÑOS · 1996 → 2026', 960, 120, { size: 72, col: C.ink, sc: pb(T, sec(s).t0 - .2) }); hipo(c, 960, 190);
    const ch = chart(c, S, 300, 260, 1320, 560, prog(T, t_n, t_hv), { ticks: [2000, 2005, 2010, 2015, 2020, 2025] });
    pill(c, 'PUSISTE ' + usd(36000), 700, 300, { size: 40, f: 'ui', sc: pb(T, t_36) });
    if (T > t_hv) { pill(c, 'HOY: ' + usd(215495), 1260, 300, { size: 56, sc: pb(T, t_hv + .2) }); stamp(c, '×5,99', 1440, 430, T, t_6, { size: 60, col: C.goldD, rot: .05 }); }
    [[t_bur, '2001-09', 'BURBUJA PUNTO COM'], [t_08, '2009-02', 'CRISIS 2008'], [t_pan, '2020-03', 'PANDEMIA']].forEach(([t, m, lab], k) => { if (T < t) return; const i = ch.idx(m), x = ch.X(i), y = ch.Y(S[i][2]);
      ring(c, x, y, 36, 36, pr(T, t, .4), { col: C.red, w: 6, seed: 4501 + k }); tag(c, lab, x, y - 80 - (k % 2) * 45, { size: 22, bg: '#FFD9D1', sc: pb(T, t + .1) }); });
    if (T > t_no) stamp(c, 'NUNCA DEJÓ DE PONER', 960, 560, T, t_nun - .2, { size: 46, col: C.goldD, rot: -.03 });
    person(c, 1760, 960, .78, { seed: 5, shirt: YOU, ...idle(T), look: -1, mouth: T > t_hv ? 'grin' : 'smile', walk: L * 5 });
    src(c, 'Precios mensuales de SPY con dividendos (Yahoo Finance) · retención 30 % · cálculo TITÁN');
  }); }

// 5 · La cuenta en pesos (mapa real de Colombia, TRM y advertencias)
{ const s = 'pesos', t_g = As(s, 'Ganas en pesos.'), t_96 = As(s, 'el dólar estaba a mil dos'), t_26 = As(s, 'tres mil ciento ochenta y tres.'), t_95 = As(s, 'noventa y cinco coma cuatro'), t_685 = As(s, 'seiscientos ochenta y cinco'),
    t_adv = As(s, 'dos advertencias'), t_1 = As(s, 'Primera: son pesos'), t_inf = As(s, 'la inflación se come'), t_2 = As(s, 'Segunda: aquí ayudó'), t_baja = As(s, 'el dólar también baja.'), t_16 = As(s, 'En noviembre de dos mil dieciséis'), t_emp = As(s, 'todo vino de las empresas.');
  [t_g, t_96, t_26, t_95, t_adv, t_1, t_inf, t_2, t_baja, t_16].forEach((t, k) => hit(t + .1, 6 + (k % 3) * 2, k % 2 ? 'ping' : 'stamp')); hit(t_685 + .3, 18, 'stamp'); hit(t_emp + .1, 10, 'stamp');
  const TR = SER.trm, col = GEO.col;
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, CX, CY, 1.0 + .012 * Math.sin(L));
    tx(c, 'LA CUENTA EN PESOS', 960, 120, { size: 76, col: C.ink, sc: pb(T, sec(s).t0 - .2) }); hipo(c, 960, 190);
    // mapa de Colombia (contorno real)
    const km = pb(T, sec(s).t0 + .1); if (km > 0) { let xs = col.map(p => p[0]), ys = col.map(p => p[1]); const mnx = Math.min(...xs), mxx = Math.max(...xs), mny = Math.min(...ys), mxy = Math.max(...ys), sc = 420 / (mxy - mny);
      c.save(); c.translate(260, 560); c.scale(km, km); shp(c, col.map(([x, y]) => [(x - (mnx + mxx) / 2) * sc, -(y - (mny + mxy) / 2) * sc]), C.goldL, { w: 5, lc: C.ink, seed: 4601 }); c.restore(); tx(c, 'COLOMBIA', 260, 820, { size: 30, f: 'ui', al: km }); }
    // gráfica de la TRM real
    const n = TR.length, vmax = 5200, x0 = 520, y0 = 290, w = 760, h = 380, X = i => x0 + w * i / (n - 1), Y = v => y0 + h - h * v / vmax, m = Math.max(2, Math.floor(n * prog(T, t_96, t_26)));
    shp(c, R4(x0 - 24, y0 - 24, w + 48, h + 48), C.paper, { sharp: true, w: 4, lc: C.ink, seed: 4602 }); tx(c, 'DÓLAR (TRM) 1996 → 2026', x0 + w / 2, y0 - 50, { size: 28, f: 'ui' });
    c.save(); c.strokeStyle = C.green; c.lineWidth = 6; c.beginPath(); for (let i = 0; i < m; i++) i ? c.lineTo(X(i), Y(TR[i][1])) : c.moveTo(X(i), Y(TR[i][1])); c.stroke(); c.restore();
    if (T > t_96) pill(c, '1996: $1.002', X(0) + 120, Y(1002) - 40, { size: 30, f: 'ui', sc: pb(T, t_96 + .2) });
    if (T > t_26) pill(c, 'OCT. 2026: $3.183', X(n - 1) - 120, Y(3183) - 80, { size: 30, f: 'ui', sc: pb(T, t_26 + .2) });
    if (T > t_16) { const i16 = TR.findIndex(r => r[0] === '2016-11'); ring(c, X(i16), Y(TR[i16][1]), 30, 30, pr(T, t_16, .4), { col: C.red, w: 6, seed: 4603 }); pill(c, '2016: $3.165', X(i16) - 40, Y(TR[i16][1]) + 80, { size: 26, f: 'ui', sc: pb(T, t_16 + .3), col: '#FFB4A6' }); }
    // pesos puestos vs hoy
    if (T > t_95) { const g = pr(T, t_95, .8, easeOutBack); shp(c, R4(1420, 820 - 60 * g, 150, 60 * g), C.goldD, { sharp: true, w: 4, lc: C.ink, seed: 4610 }); pill(c, 'PUSISTE $95,4 M', 1495, 760 - 60 * g, { size: 26, f: 'ui', sc: pb(T, t_95 + .2) }); }
    if (T > t_685) { const g = pr(T, t_685, 1.0, easeOutBack); shp(c, R4(1640, 820 - 430 * g, 150, 430 * g), C.green, { sharp: true, w: 4, lc: C.ink, seed: 4611 }); pill(c, 'HOY $685,9 M', 1715, 760 - 430 * g, { size: 34, sc: pb(T, t_685 + .4) }); }
    ln(c, [[1380, 822], [1830, 822]], { w: 5, straight: true, seed: 4612 });
    if (T > t_adv) { tag(c, 'OJO 1: PESOS DE CADA ÉPOCA (SIN INFLACIÓN)', 900, 800, { size: 24, bg: '#FFD9D1', sc: pb(T, t_1) }); }
    if (T > t_2) tag(c, 'OJO 2: EL DÓLAR TAMBIÉN BAJA', 900, 852, { size: 24, bg: '#FFD9D1', sc: pb(T, t_baja - .3) });
    stamp(c, '10 AÑOS: TODO VINO DE LAS EMPRESAS', 900, 720, T, t_emp, { size: 40, col: C.goldD, rot: -.03 });
    src(c, 'TRM oficial (Superfinanciera, datos.gov.co) · USD 100 al mes en SPY, retención 30 % · pesos nominales · cálculo TITÁN');
  }); }

// 6 · ¿Y si espero a tener 5.000? (personaje pesperar con el frasco)
{ const s = 'esperar', t_q = As(s, 'la pregunta que más'), t_5 = As(s, 'digamos cinco mil dólares,'), t_hc = As(s, 'Hicimos la cuenta.'), t_gu = As(s, 'guardados en efectivo'), t_cmp = As(s, 'y ahí compra.'),
    t_83 = As(s, 'ochenta y tres mil seiscientos quince'), t_103 = As(s, 'tiene ciento tres mil'), t_cost = As(s, 'Esperar le costó'), t_pq = As(s, '¿Por qué?'), t_tr = As(s, 'no trabaja.'), t_cr = As(s, 'no crece.');
  const w_cmp = DD.words.find(w => w[1] >= t_cmp && /compra/.test(w[0]))[2];
  hit(t_q + .1, 8, 'stamp'); hit(t_5 + .1, 8, 'ping'); hit(w_cmp + .2, 8, 'ping'); hit(t_83 + .2, 10, 'stamp'); hit(t_103 + .2, 10, 'stamp'); hit(t_cost + .2, 18, 'stamp'); hit(t_tr + .1, 8, 'ping'); hit(t_cr + .1, 8, 'ping');
  const A = SER['20'], B = SER.esperar20;
  scene(s, 'blot', (c, T, L) => {
    bg(c, T); camS(c, T, CX, CY, 1.0 + .012 * Math.sin(L));
    tx(c, '¿Y SI ESPERO A TENER USD 5.000?', 960, 120, { size: 70, col: C.ink, sc: pb(T, sec(s).t0 - .2) }); hipo(c, 960, 190);
    // izquierda: persona con el frasco; derecha: la que invierte cada mes (planta)
    const jf = ((T - sec(s).t0) * .25) % 1; jar(c, 250, 760, .9, jf);
    person(c, 120, 960, .8, { seed: 9, shirt: C.lav, ...idle(T, 1), look: 1, mouth: 'flat', armR: [1.5, .8] });
    plant(c, 1800, 900, .3 + .7 * prog(T, t_q, t_103)); person(c, 1650, 960, .8, { seed: 5, shirt: YOU, ...idle(T), look: 1, mouth: 'smile' });
    // gráfica de las dos estrategias
    const ch = chart(c, A, 520, 280, 960, 470, prog(T, t_hc, t_83), { legend: false, ticks: [2008, 2012, 2016, 2020, 2024] });
    const m = ch.m; c.save(); c.strokeStyle = C.red; c.lineWidth = 6; c.setLineDash([4, 10]); c.lineCap = 'round'; c.beginPath(); for (let i = 0; i < m; i++) i ? c.lineTo(ch.X(i), ch.Y(B[i][2])) : c.moveTo(ch.X(i), ch.Y(B[i][2])); c.stroke(); c.restore();
    tag(c, '— INVIERTE CADA MES', 680, 290, { size: 22, bg: C.paper, col: C.navy }); tag(c, '··· ESPERA A JUNTAR 5.000', 700, 335, { size: 22, bg: C.paper, col: C.red });
    bubble(c, 'Mejor espero a juntar más…', 290, 560, pb(T, w_cmp + .15) * (1 - pr(T, t_83 + 1.5, .3)), { tail: -60, seed: 4701, size: 28 });
    if (T > t_83) pill(c, 'ESPERÓ: ' + usd(83615), 1200, 720, { size: 32, f: 'ui', sc: pb(T, t_83 + .2), col: '#FFB4A6' });
    if (T > t_103) pill(c, 'CADA MES: ' + usd(103802), 1200, 300, { size: 34, sc: pb(T, t_103 + .2) });
    stamp(c, 'ESPERAR LE COSTÓ ≈ USD 20.000', 1000, 540, T, t_cost + .1, { size: 44, col: C.red, rot: -.03 });
    if (T > t_tr) tag(c, 'LA PLATA QUIETA NO TRABAJA', 1000, 860, { size: 28, bg: C.goldL, sc: pb(T, t_tr) });
    src(c, 'Precios mensuales de SPY con dividendos (Yahoo Finance) · retención 30 % · 20 años · cálculo TITÁN');
  }); }

// 7 · La retención del 30 %: tres barras reales
{ const s = 'retencion', t_r = As(s, 'la retención.'), t_30 = As(s, 'el treinta por ciento'), t_ll = As(s, 'antes de que lleguen'), t_si = As(s, 'Sin retención,'), t_con = As(s, 'Con la retención,'), t_7 = As(s, 'Más de siete mil'), t_nr = As(s, 'Y si no reinviertes'), t_ent = As(s, 'Por eso conviene');
  hit(t_r + .1, 10, 'stamp'); hit(t_30 + .2, 14, 'stamp'); hit(t_si + .2, 8, 'ping'); hit(t_con + .2, 8, 'ping'); hit(t_7 + .2, 16, 'stamp'); hit(t_nr + .2, 8, 'ping'); hit(t_ent + .1, 6, 'ping');
  const B = [[t_si, 111140, 'SIN RETENCIÓN', C.green], [t_con, 103802, 'CON RETENCIÓN 30 %', C.navy], [t_nr, 88770, 'SIN REINVERTIR DIVIDENDOS', '#8A8D9C']];
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, CX, CY, 1.0 + .012 * Math.sin(L));
    tx(c, 'LO QUE CASI NADIE TE CUENTA', 960, 120, { size: 72, col: C.ink, sc: pb(T, sec(s).t0 - .2) });
    // dividendos que caen: 30 % se desvía a EE. UU.
    for (let k = 0; k < 10; k++) { const u = ((T - sec(s).t0) * .7 + k / 10) % 1, x = 300 + (k % 5) * 40, toUS = k % 10 < 3 && T > t_30; c.save(); c.globalAlpha = 1 - u * .7; coin(c, toUS ? lerp(x, 560, u) : x, 260 + u * 420, 20, 4801 + k); c.restore(); }
    card(c, 640, 560, 220, 150, { band: '#FFD9D1', seed: 4810, sc: pb(T, t_30), draw: (cc) => { tx(cc, 'EE. UU.', 0, -40, { size: 26, f: 'ui' }); tx(cc, '−30 %', 0, 30, { size: 56, col: C.red, sh: null }); } });
    jar(c, 300, 800, .8, .3 + .4 * prog(T, sec(s).t0, sec(s).t1)); tx(c, 'TU CUENTA', 300, 940, { size: 26, f: 'ui' });
    const Z = 820, K = 470 / 120000; ln(c, [[920, Z], [1820, Z]], { w: 6, straight: true, seed: 4820 });
    B.forEach(([t, v, lab, col], k) => { const x = 1000 + k * 280, g = pr(T, t, .8, easeOutBack); if (g <= 0) return; shp(c, R4(x, Z - v * K * g, 190, v * K * g), col, { sharp: true, w: 5, lc: C.ink, seed: 4821 + k });
      pill(c, usd(v), x + 95, Z - v * K * g - 50, { size: 30, f: 'ui', sc: pb(T, t + .3) }); tx(c, lab, x + 95, Z + 34, { size: 20, f: 'ui', max: 260 }); });
    tag(c, '20 AÑOS · USD 100 AL MES', 1370, 190, { size: 26, bg: C.paper });
    stamp(c, '≈ USD 7.300 SE QUEDARON EN EL CAMINO', 1370, 265, T, t_7 + .1, { size: 38, col: C.red, rot: -.03 });
    src(c, 'Retención del 30 % a no residentes (IRS); Colombia no tiene tratado con EE. UU. · SPY (Yahoo Finance) · cálculo TITÁN');
  }); }

// 8 · Los 4 errores que más plata cuestan
{ const s = 'errores', t_q = As(s, '¿qué separa'), t_4 = As(s, 'Estos son los cuatro'), t_1 = As(s, 'Uno: vender'), t_2 = As(s, 'Dos: esperar'), t_3 = As(s, 'Tres: apostar'), t_500 = As(s, 'El índice tiene'), t_00 = As(s, 'De las diez más grandes'), t_div = As(s, 'Diversificar es'), t_c4 = As(s, 'Y cuatro:'), t_mil = As(s, 'son miles de dólares.');
  [t_q, t_4, t_500, t_00, t_div].forEach((t, k) => hit(t + .1, 6, 'ping')); [t_1, t_2, t_3, t_c4].forEach(t => hit(t + .1, 14, 'stamp')); hit(t_mil + .1, 10, 'stamp');
  const E = [[t_1, 'VENDER EN PÁNICO', '2009 y 2020: los peores momentos para salirse'], [t_2, 'ESPERAR EL MOMENTO PERFECTO', 'Nadie sabe cuándo es el fondo'], [t_3, 'APOSTAR A UNA SOLA EMPRESA', 'El índice tiene 500 · diversificar te protege'], [t_c4, 'NO HACER LA CUENTA DE LOS COSTOS', 'Comisiones + retención + impuestos = miles de dólares']];
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, CX, CY, 1.0 + .012 * Math.sin(L));
    tx(c, '4 ERRORES QUE MÁS PLATA CUESTAN', 960, 120, { size: 70, col: C.ink, sc: pb(T, t_q - .2) });
    E.forEach(([t, h, sub], k) => { const kk = pb(T, t - .1); if (kk <= 0) { const x = 500 + (k % 2) * 920, y = 340 + Math.floor(k / 2) * 300; c.save(); c.globalAlpha = .3 * pb(T, SEC[s].t0 + .2 + k * .2); card(c, x, y, 820, 240, { seed: 4900 + k, draw: (cc) => tx(cc, '?', 0, 0, { size: 110, col: C.ink, sh: null }) }); c.restore(); return; } const x = 500 + (k % 2) * 920, y = 340 + Math.floor(k / 2) * 300, on = T >= t && (k === 3 || T < E[k + 1][0]);
      card(c, x, y, 820, 240, { sc: kk * (on ? 1.04 : 1), band: on ? C.red : '#DCD6C6', seed: 4900 + k, rot: (k % 2 ? .01 : -.01), draw: (cc, w, hh) => { tx(cc, `${k + 1} · ${h}`, 0, -hh / 2 + 36, { size: 34, f: 'ui', col: on ? C.paper : C.ink, max: 760 }); tx(cc, sub, 0, 40, { size: 32, f: 'hand', col: C.ink, sh: null, max: 760 }); } });
      if (T > t + .3) tx(c, '✗', x + 360, y - 70, { size: 70, col: C.red, sh: null, sc: pb(T, t + .3) }); });
    if (T > t_00 && T < t_c4) tag(c, 'TOP 10 DEL 2000 ≠ TOP 10 DE HOY', 1420, 560, { size: 26, bg: C.goldL, sc: pb(T, t_00) });
    person(c, 960, 990, .62, { seed: 5, shirt: YOU, ...idle(T), look: Math.sin(T) > 0 ? 1 : -1, mouth: 'flat', brow: 1 });
  }); }

// 9 · Cierre (noche): lo que pasó ≠ lo que viene · depende, haz tu cuenta
{ const s = 'cierre', t_lp = As(s, 'Todo esto es lo que pasó.'), t_lv = As(s, 'Lo que viene puede'), t_np = As(s, 'no te prometemos'), t_tc = As(s, 'el tiempo y la constancia'), t_q = As(s, '¿Cien dólares al mes'), t_dep = As(s, 'Depende.'), t_hz = As(s, 'Haz tu cuenta,'),
    t_cmp = As(s, 'compártelo'), t_end = DD.words[DD.words.length - 1][2];
  [t_lp, t_lv, t_np, t_q, t_cmp].forEach((t, k) => hit(t + .1, 6, 'ping')); hit(t_tc + .2, 10, 'stamp'); hit(t_dep + .1, 12, 'stamp'); hit(t_hz + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'drop', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, CX, CY, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 26; k++) { const x = (k * 197) % 1880 + 20, y = (k * 131) % 420 + 60, a = .3 + .6 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, 'LO QUE PASÓ ≠ LO QUE VIENE', 960, 170, { size: 70, col: C.chalk, sh: C.goldD, sc: pb(T, SEC[s].t0 - .1) });
    if (T > t_np) tag(c, 'NO PROMETEMOS NINGÚN RESULTADO', 960, 260, { size: 28, bg: C.paper, sc: pb(T, t_np) });
    tx(c, 'TIEMPO + CONSTANCIA > ADIVINAR EL MOMENTO', 960, 380, { size: 52, col: C.gold, sh: null, clipP: pr(T, t_tc - .2, .8, easeIO), max: 1700 });
    tx(c, '¿USD 100 AL MES?', 960, 500, { size: 64, col: C.chalk, sh: null, sc: pb(T, t_q) });
    tx(c, 'DEPENDE · HAZ TU CUENTA', 960, 600, { size: 84, col: C.gold, sh: null, sc: pb(T, t_dep) });
    const p = pr(T, sec(s).t0, t_end - sec(s).t0 + .5, easeIO); ln(c, [[200, 900], [700, 820], [1200, 760], [1720, 690]], { w: 6, col: C.goldL, seed: 4950 });
    const px = lerp(260, 1600, p), py = lerp(890, 705, p); person(c, px, py, .55, { seed: 5, shirt: YOU, ...idle(T), walk: L * 6, mouth: 'smile', look: 1 });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 960, 700, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 1500 }); tx(c, 'TITÁN HOLDING', 960, 760, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada (miniatura de YouTube): 20 años, la cifra grande y la caída de 2009 =================
function cover(c) { drawScene(c, SC[0], As('gancho', 'Pero casi nadie') - .1); resetT(c); }
startFilm('largo-100-dolares', cover);
