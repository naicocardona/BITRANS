// TITÁN · «El dólar subió casi 10 % en 8 días» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js) · línea A · noticia del 27 nov 2026
// DOL (inyectada por build.sh): TRM oficial, Banco de la República vía datos.gov.co. 18 nov $3.309,55 → vigente 26–27 nov $3.630,89 (+9,71 %). 3 ene: $3.790,77.
// EJEMPLO HIPOTÉTICO: USD 1.000 → $3.309.550 vs. $3.630.890 = +$321.340.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const fmt = v => Math.round(v).toLocaleString('es-CO').replace(/,/g, '.');
const fmt2 = v => v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
function src(c, s, y = 1312) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }
const GRN = '#7FBF8E', GRND = '#3E7A52';
const MES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV'];

// ---------- piezas ----------
// billete genérico de dólar (sin diseño real): verde con «USD»
function bill(c, x, y, s, rot, seed) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  shp(c, R4(-110, -52, 220, 104), GRN, { sharp: true, w: 4, lc: C.ink, seed });
  shp(c, blob(0, 0, 34, 34, seed + 1, { n: 16, amp: .03 }), '#A9D6B3', { w: 3, lc: GRND, seed: seed + 1 });
  tx(c, 'USD', 0, 2, { size: 26, f: 'ui', col: GRND, sh: null }); tx(c, '$', -78, -26, { size: 22, f: 'ui', col: GRND, sh: null }); tx(c, '$', 78, 26, { size: 22, f: 'ui', col: GRND, sh: null }); c.restore(); }
function wad(c, x, y, s, n, T, seed = 9000) { for (let k = 0; k < n; k++) bill(c, x + Math.sin(k * 1.7) * 8, y - k * 14 + Math.sin(T * 3 + k) * 1.5, s, (k % 3 - 1) * .05, seed + k * 3); }
// gráfico de 8 días (18 → 26 nov)
const EX0 = 170, EX1 = 910, EZ = 1150, EH = 560, EMIN = 3250, EMAX = 3680;
const exx = i => EX0 + (EX1 - EX0) * i / (DOL.d8.length - 1), eyy = v => EZ - EH * (v - EMIN) / (EMAX - EMIN);
function chart8(c, T, t0, tEnd, o = {}) {
  ln(c, [[EX0 - 40, EZ + 20], [EX1 + 40, EZ + 20]], { w: 5, straight: true, seed: 9100 });
  [3300, 3400, 3500, 3600].forEach(v => tx(c, fmt(v), EX0 - 50, eyy(v), { size: 20, f: 'ui', align: 'right', al: .5 }));
  const n = DOL.d8.length, g = pr(T, t0, Math.max(.4, tEnd - t0), easeIO), k = g * (n - 1), m = Math.floor(k);
  const pts = DOL.d8.slice(0, m + 1).map((r, i) => [exx(i), eyy(r[1])]); if (m < n - 1 && g > 0) { const a = DOL.d8[m][1], b = DOL.d8[m + 1][1]; pts.push([exx(k), eyy(a + (b - a) * (k - m))]); }
  if (pts.length > 1) ln(c, pts, { w: 9, col: C.green, straight: true, seed: 9110 });
  for (let i = 0; i <= m; i++) { c.fillStyle = C.ink; c.beginPath(); c.arc(exx(i), eyy(DOL.d8[i][1]), 8, 0, TAU); c.fill(); }
  tx(c, '18 NOV', exx(0), EZ + 58, { size: 24, f: 'ui', al: .8 }); tx(c, 'HOY', exx(n - 1), EZ + 58, { size: 24, f: 'ui', al: .8 });
  pill(c, '$' + fmt2(DOL.d8[0][1]), exx(0) + 90, eyy(DOL.d8[0][1]) + 70, { size: 34, f: 'ui', sc: pb(T, o.tA ?? t0) });
  if (g >= 1) { pill(c, '$' + fmt2(DOL.d8[n - 1][1]), exx(n - 1) - 120, eyy(DOL.d8[n - 1][1]) - 66, { size: 40, f: 'ui', col: C.gold, sc: pb(T, tEnd) }); burst(c, exx(n - 1), eyy(DOL.d8[n - 1][1]), T, tEnd, { R: 140 }); } }
// gráfico del año (3 ene → 26 nov)
const YX0 = 150, YX1 = 930, YZ = 1150, YH = 560, YMIN = 2950, YMAX = 3900, NY = DOL.y.length;
const yxx = i => YX0 + (YX1 - YX0) * i / (NY - 1), yyy = v => YZ - YH * (v - YMIN) / (YMAX - YMIN);
function chartY(c, T, t0, o = {}) {
  ln(c, [[YX0 - 30, YZ + 20], [YX1 + 30, YZ + 20]], { w: 5, straight: true, seed: 9200 });
  [3000, 3250, 3500, 3750].forEach(v => tx(c, fmt(v), YX0 - 40, yyy(v), { size: 20, f: 'ui', align: 'right', al: .5 }));
  let lm = ''; DOL.y.forEach((r, i) => { const mo = +r[0].slice(5, 7); if (MES[mo - 1] !== lm && mo % 2 === 1) { lm = MES[mo - 1]; tx(c, lm, yxx(i), YZ + 56, { size: 20, f: 'ui', al: .6 }); } else if (mo % 2 === 0) lm = MES[mo - 1]; });
  const g = pr(T, t0, 1.2, easeIO), m = Math.max(1, Math.round(g * (NY - 1)));
  ln(c, DOL.y.slice(0, m + 1).map((r, i) => [yxx(i), yyy(r[1])]), { w: 6, col: C.vio, straight: true, seed: 9210 });
  const y0 = yyy(DOL.y[0][1]); c.save(); c.setLineDash([14, 10]); c.strokeStyle = C.goldD; c.globalAlpha = .8 * pr(T, o.tJ ?? t0, .5); c.lineWidth = 4; c.beginPath(); c.moveTo(YX0, y0); c.lineTo(YX1, y0); c.stroke(); c.restore();
  pill(c, 'ENERO: $3.790,77', 330, y0 - 60, { size: 32, f: 'ui', sc: pb(T, o.tJ ?? t0) });
  if (g >= 1) { const i8 = DOL.y.findIndex(r => r[0] === '2026-11-18'); ln(c, DOL.y.slice(i8).map((r, i) => [yxx(i8 + i), yyy(r[1])]), { w: 11, col: C.green, straight: true, seed: 9220 });
    pill(c, 'HOY: $3.630,89', yxx(NY - 1) - 150, yyy(DOL.y[NY - 1][1]) + 80, { size: 32, f: 'ui', col: C.gold, sc: pb(T, t0 + 1.2) }); } }
// edificio genérico de congreso (columnas), sin edificio real
function capitol(c, x, y, s, T) { c.save(); c.translate(x, y); c.scale(s, s);
  shp(c, [[-260, -160], [0, -290], [260, -160]], C.paper, { w: 5, lc: C.ink, seed: 9300 });
  shp(c, R4(-270, -160, 540, 40), C.goldL, { sharp: true, w: 5, lc: C.ink, seed: 9301 });
  for (let k = 0; k < 6; k++) shp(c, R4(-235 + k * 88, -120, 40, 200), C.paper, { sharp: true, w: 4, lc: C.ink, seed: 9310 + k });
  shp(c, R4(-290, 80, 580, 40), C.goldL, { sharp: true, w: 5, lc: C.ink, seed: 9320 }); c.restore(); }
function barrel(c, x, y, s, T, seed = 9400) { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(.04 * Math.sin(T * 2));
  shp(c, R4(-80, -110, 160, 220), '#2B2F45', { w: 5, lc: C.ink, seed, hatch: shade('#2B2F45', .5), hal: .3 });
  for (const yy of [-60, 0, 60]) ln(c, [[-80, yy], [80, yy]], { w: 4, col: C.gold, straight: true, seed: seed + yy + 100 });
  tx(c, 'PETRÓLEO', 0, 0, { size: 24, f: 'ui', col: C.chalk, sh: null, max: 150 }); c.restore(); }
function doc(c, x, y, s, rot, title, seed, k = 1) { if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(rot); c.scale(s * k, s * k);
  shp(c, R4(-150, -190, 300, 380), C.paper, { sharp: true, w: 5, lc: C.ink, seed }); tx(c, title, 0, -130, { size: 34, f: 'ui', max: 260 });
  for (let i = 0; i < 6; i++) ln(c, [[-110, -60 + i * 40], [110 - (i % 2) * 40, -60 + i * 40]], { w: 3, col: C.ink, al: .45, straight: true, seed: seed + i + 1 }); c.restore(); }
// frasco con monedas (pesos o dólares)
function jar(c, x, y, s, label, col, fill, T, seed) { c.save(); c.translate(x, y); c.scale(s, s);
  const h = 220 * fill; if (h > 0) shp(c, R4(-100, 130 - h, 200, h), col, { sharp: true, line: false });
  for (let k = 0; k < Math.floor(fill * 8); k++) { const cx0 = -60 + (k % 3) * 60, cy0 = 110 - Math.floor(k / 3) * 40; c.fillStyle = C.gold; c.beginPath(); c.ellipse(cx0, cy0, 24, 10, 0, 0, TAU); c.fill(); c.strokeStyle = C.ink; c.lineWidth = 3; c.stroke(); }
  c.save(); c.globalAlpha = .35; shp(c, R4(-110, -110, 220, 250), '#DCEFF5', { w: 6, lc: C.ink, seed }); c.restore(); ln(c, R4(-110, -110, 220, 250), { w: 6, col: C.ink, close: true, seed });
  shp(c, R4(-80, -140, 160, 36), C.goldD, { sharp: true, w: 4, lc: C.ink, seed: seed + 1 });
  tag(c, label, 0, 190, { size: 30, bg: C.paper, rot: 0 }); c.restore(); }
function hipo(c, y = 330, k = 1) { tag(c, 'EJEMPLO HIPOTÉTICO', 540, y, { size: 26, bg: C.paper, sc: k }); }
// tarjetas del ejemplo: 18 nov vs. hoy
function cards(c, T, tA, tB, tD) {
  [['18 NOV', '$3.309.550', tA, C.paper], ['HOY', '$3.630.890', tB, C.goldL]].forEach(([d, v, t, col], k) => { const g = pb(T, t - .1); if (g <= 0) return;
    c.save(); c.translate(290 + k * 500, 860); c.rotate((k ? 1 : -1) * .025); c.scale(g, g); shp(c, R4(-220, -150, 440, 300), col, { w: 5, lc: C.ink, seed: 9500 + k });
    shp(c, R4(-220, -150, 440, 80), C.navy, { sharp: true, w: 4, lc: C.ink, seed: 9510 + k }); tx(c, d, 0, -110, { size: 40, f: 'ui', col: C.paper });
    tx(c, v, 0, 20, { size: 58, f: 'ui', col: k ? C.goldD : C.ink, max: 400 }); tx(c, 'EN PESOS', 0, 92, { size: 24, f: 'ui', al: .7 }); c.restore(); });
  if (tD != null) { pill(c, '+$321.340', 540, 1110, { size: 64, f: 'ui', col: C.gold, sc: pb(T, tD) }); burst(c, 540, 1110, T, tD, { R: 180 }); } }

// ================= escenas =================
// 1 · Gancho: el dólar sube como cohete; la persona ve crecer su fajo de billetes
if (has('gancho')) { const s = 'gancho', t_s = As(s, 'subió casi diez'), t_v = TK ? As(s, 'valen más sin') : null;
  hit(.05, 8, 'stamp'); hit(t_s + .3, 16, 'impact'); if (t_v) hit(t_v + .1, 10, 'ping');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_s, 960], [t_s + .6, 930]]), key(T, [[0, 1.0], [t_s, 1.0], [t_s + .6, 1.06]]) + .01 * Math.sin(L * 1.3));
    tx(c, 'EL DÓLAR EN COLOMBIA', 540, 190, { size: 76, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }), max: 1000 });
    tx(c, 'CASI +10 % EN 8 DÍAS', 540, 300, { size: 80, col: C.green, sh: C.ink, sc: pb(T, .15), max: 1000 });
    // flecha gruesa que sube desde abajo a la izquierda
    const g = pr(T, .2, Math.max(.6, t_s + .3), easeIO); ln(c, [[180, 1150], [380, 1020], [520, 1060], [760, 760], [900, 560]], { w: 26, col: C.green, p: g, seed: 9600 });
    if (g >= 1) { shp(c, [[930, 520], [860, 560], [920, 610]], C.green, { w: 5, lc: C.ink, seed: 9601 }); stamp(c, '+9,7 %', 780, 470, T, t_s + .3, { size: 84, col: C.green, rot: -.05 }); }
    const nb = 2 + Math.floor(5 * pr(T, t_v ?? t_s + .6, 1.2));
    person(c, 300, 1420, .85, { seed: 4, shirt: C.gold, ...idle(T), look: 1, mouth: T > (t_v ?? t_s + .6) ? 'grin' : 'o', brow: T > t_s ? 1 : 0, armR: [1.4, .9], armL: [1.4, .9] });
    wad(c, 420, 1290, .6, nb, T);
    src(c, 'TRM oficial · Banco de la República (datos.gov.co): 18 nov. $3.309,55 → 26–27 nov. $3.630,89', 1470);
  }); }

// 2 · El dato: TRM de 8 días; TikTok: luego se aleja al año completo (enero estaba más alto). Short: pasa al ejemplo.
if (has('dato')) { const s = 'dato', t_a = As(s, 'tres mil trescientos nueve pesos'), t_b = As(s, 'tres mil seiscientos treinta');
  const t_j = TK ? As(s, 'en enero') : null, t_d = TK ? As(s, 'por debajo') : null, t_e = TK ? null : As(s, 'Ejemplo hipotético:');
  const t_e1 = TK ? null : As(s, 'tres millones trescientos'), t_e2 = TK ? null : As(s, 'a tres millones seiscientos');
  hit(t_a + .1, 8, 'ping'); hit(t_b + .3, 16, 'impact'); if (t_j) { hit(t_j, 12, 'stamp'); hit(t_d + .1, 10, 'impact'); } if (t_e) { hit(t_e + .1, 12, 'stamp'); hit(t_e2 + .3, 14, 'stamp'); }
  const tSw = TK ? t_j - .3 : t_e - .3;   // cambio de vista dentro de la escena
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); const zoom = T < tSw ? key(T, [[sec(s).t0, 1.0], [t_b, 1.0], [t_b + .6, 1.05]]) : key(T, [[tSw, 1.08], [tSw + .7, 1.0]]);
    camS(c, T, 540, 930, zoom + .012 * Math.sin(L));
    if (T < tSw) {
      tx(c, 'TRM: LA TASA OFICIAL', 540, 210, { size: 80, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
      tag(c, 'PESOS POR CADA DÓLAR', 540, 320, { size: 28, bg: C.paper, sc: pb(T, sec(s).t0) });
      chart8(c, T, t_a - .1, t_b + .2, { tA: t_a });
      src(c, 'Banco de la República · datos.gov.co · TRM vigente cada día');
    } else if (TK) {
      tx(c, 'EN ENERO ESTABA MÁS ALTO', 540, 210, { size: 70, col: C.ink, sc: pb(T, tSw), max: 1000 });
      tag(c, 'TRM 2026, DÍA A DÍA', 540, 320, { size: 28, bg: C.paper, sc: pb(T, tSw + .1) });
      chartY(c, T, tSw, { tJ: t_j + .2 });
      stamp(c, 'AÚN DEBAJO DE ENERO', 540, 1330, T, t_d + .1, { size: 54, col: C.vio, rot: -.03 });
      src(c, 'Banco de la República · datos.gov.co · 3 ene.–26 nov. 2026', 1420);
    } else {
      tx(c, 'MIL DÓLARES', 540, 210, { size: 90, col: C.ink, sc: pb(T, tSw) }); hipo(c, 320, pb(T, tSw + .1));
      wad(c, 540, 560, .9, 5, T);
      cards(c, T, t_e1, t_e2, t_e2 + 1.3);
      src(c, 'Cálculo con la TRM oficial del 18 y del 26–27 nov. 2026', 1250);
    }
  }); }

// 3 · TikTok · ¿Por qué? Según analistas: Ley de Rescate (Congreso) y petróleo
if (has('porque')) { const s = 'porque', t_a = As(s, 'Según analistas,'), t_l = As(s, 'Ley de Rescate,'), t_i = As(s, 'impuestos y recortes'), t_c = As(s, 'en el Congreso,'), t_p = As(s, 'del petróleo.');
  hit(t_a + .1, 8, 'ping'); hit(t_l + .1, 14, 'stamp'); hit(t_i + .1, 10, 'impact'); hit(t_c + .1, 8, 'ping'); hit(t_p + .1, 14, 'impact');
  scene(s, 'news', (c, T, L) => {
    bg(c, T); camS(c, T, key(T, [[0, 540], [t_p - .2, 540], [t_p + .5, 600]]), key(T, [[0, 940], [t_p - .2, 940], [t_p + .5, 980]]), key(T, [[0, 1.0], [t_p - .2, 1.0], [t_p + .5, 1.06]]) + .012 * Math.sin(L));
    tx(c, '¿POR QUÉ SUBIÓ?', 540, 210, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) }); tag(c, 'SEGÚN ANALISTAS', 540, 320, { size: 28, bg: C.paper, sc: pb(T, t_a) });
    capitol(c, 330, 880, .82 * pb(T, sec(s).t0 + .1), T); if (T > t_c && T < t_c + 1.2) ring(c, 330, 800, 300, 200, pr(T, t_c, .5), { seed: 9705 });
    doc(c, 330, 600, .8, -.06, 'LEY DE RESCATE', 9700, pb(T, t_l));
    if (T > t_i) [['IMPUESTOS', 0], ['RECORTES', 1]].forEach(([w, k]) => tag(c, w, 210 + k * 250, 1060, { size: 30, bg: k ? C.lav : '#FFD3CB', sc: pb(T, t_i + k * .3), rot: k ? .04 : -.04 }));
    barrel(c, 820, 860, 1.0 * pb(T, t_p - .3), T);
    if (T > t_p) { const g = pr(T, t_p, .6); ln(c, [[820, 690], [820, 690 - 120 * g]], { w: 12, col: C.red, straight: true, seed: 9710 }); tag(c, 'PRECIO', 820, 560, { size: 30, bg: C.goldL, sc: pb(T, t_p + .3) }); }
    person(c, 880, 1460, .7, { seed: 10, shirt: C.gold, flip: true, ...idle(T), look: -1, mouth: T > t_p ? 'o' : 'flat', brow: T > t_l ? 1 : 0, armR: [1.3, .9], prop: (cc, hL, hR) => newspaper(cc, hR[0] - 40, hR[1] - 30, 160, 110, -.1, { seed: 9720 }) });
    src(c, 'Infobae (22 y 25 nov. 2026), INCP, El Heraldo · proyecto 477 de 2026, Cámara', 1140);
  }); }

// 4 · TikTok · Ejemplo hipotético: mil dólares, 18 nov vs. hoy
if (has('ejemplo')) { const s = 'ejemplo', t_e = As(s, 'Ejemplo hipotético:'), t_1 = As(s, 'tres millones trescientos'), t_2 = As(s, 'Hoy valen'), t_d = As(s, 'trescientos veintiún mil');
  hit(t_e + .1, 12, 'stamp'); hit(t_1 + .2, 10, 'impact'); hit(t_2 + .3, 12, 'impact'); hit(t_d + .2, 18, 'stamp');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 940], [t_d, 940], [t_d + .6, 990]]), key(T, [[0, 1.0], [t_d, 1.0], [t_d + .6, 1.06]]) + .012 * Math.sin(L));
    tx(c, 'SI TENÍAS USD 1.000', 540, 210, { size: 84, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 }); hipo(c, 320);
    wad(c, 540, 580, .9, 5, T);
    cards(c, T, t_1, t_2 + .4, t_d + .1);
    tag(c, 'SOLO POR EL CAMBIO', 540, 1220, { size: 30, bg: C.paper, sc: pb(T, t_d + .8) });
    person(c, 940, 1460, .65, { seed: 8, shirt: C.vio, flip: true, ...idle(T), look: -1, mouth: T > t_d ? 'grin' : 'flat', brow: T > t_d ? 1 : 0 });
    src(c, 'Cálculo con la TRM oficial del 18 y del 26–27 nov. 2026', 1312);
  }); }

// 5 · Ojo: funciona al revés · si baja, valen menos · deudas en dólares cuestan más
if (has('ojo')) { const s = 'ojo', t_r = As(s, 'al revés'), t_m = As(s, 'valen menos'), t_d = As(s, 'deudas en dólares,'), t_c = As(s, 'te cuestan más.');
  hit(t_r + .1, 14, 'stamp'); hit(t_m + .1, 12, 'impact'); hit(t_d + .1, 10, 'ping'); hit(t_c + .1, 16, 'impact');
  scene(s, TK ? 'wipe' : 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_c, 1.0], [t_c + .5, 1.05]]) + .012 * Math.sin(L));
    tx(c, 'OJO: TAMBIÉN AL REVÉS', 540, 210, { size: 80, col: C.red, sh: C.ink, sc: pb(T, t_r - .2), max: 1000 });
    // izquierda: flecha que baja → tus dólares valen menos en pesos
    const g1 = pr(T, sec(s).t0 + .1, Math.max(.9, t_m - sec(s).t0), easeIO); ln(c, [[120, 480], [260, 560], [330, 520], [450, 760]], { w: 18, col: C.red, p: g1, seed: 9800 });
    if (g1 >= 1) shp(c, [[470, 800], [410, 760], [480, 730]], C.red, { w: 4, lc: C.ink, seed: 9801 });
    { const g = pb(T, t_m); if (g > 0) { c.save(); c.translate(290, 920); c.rotate(-.03); c.scale(g, g); shp(c, R4(-210, -85, 420, 170), C.navy, { sharp: true, w: 5, lc: C.ink, seed: 9802 }); tx(c, 'SI EL DÓLAR BAJA', 0, -38, { size: 30, f: 'ui', col: C.chalk, sh: null, max: 380 }); tx(c, 'VALEN MENOS', 0, 28, { size: 50, f: 'ui', col: '#FFB4A6', sh: null, max: 380 }); c.restore(); } }
    // derecha: recibo de deuda en dólares que se estira
    const g2 = pb(T, t_d); if (g2 > 0) { c.save(); c.translate(790, 650); c.rotate(.04); c.scale(g2, g2); const ex = 120 * pr(T, t_c, .6, easeIO);
      shp(c, R4(-160, -200, 320, 400 + ex), C.paper, { sharp: true, w: 5, lc: C.ink, seed: 9810 }); tx(c, 'DEUDA', 0, -150, { size: 40, f: 'ui' }); tx(c, 'EN DÓLARES', 0, -100, { size: 30, f: 'ui', al: .8 });
      for (let i = 0; i < 4; i++) ln(c, [[-110, -30 + i * 50], [110, -30 + i * 50]], { w: 3, col: C.ink, al: .4, straight: true, seed: 9811 + i });
      if (T > t_c) tx(c, 'CUESTA MÁS', 0, 230 + ex * .8, { size: 44, f: 'ui', col: C.red }); c.restore(); }
    person(c, 540, 1450, .8, { seed: 6, shirt: C.lav, ...idle(T), look: T > t_d ? 1 : -1, mouth: 'o', brow: 1, sweat: T > t_c ? T : 0 });
  }); }

// 6 · TikTok · Lección: una parte en pesos y otra en dólares (no adivinar, no depender de una sola)
if (has('leccion')) { const s = 'leccion', t_s = As(s, 'una sola moneda:'), t_p = As(s, 'una parte en pesos'), t_u = As(s, 'otra en dólares.'), t_a = As(s, 'No para adivinar'), t_n = As(s, 'no depender');
  hit(t_s + .1, 10, 'impact'); hit(t_p + .1, 8, 'ping'); hit(t_u + .1, 8, 'ping'); hit(t_a + .1, 10, 'stamp'); hit(t_n + .1, 14, 'stamp');
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_n, 1.0], [t_n + .6, 1.05]]) + .012 * Math.sin(L));
    tx(c, 'NO TODO EN UNA SOLA', 540, 210, { size: 82, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 }); tx(c, 'MONEDA', 540, 310, { size: 82, col: C.goldD, sh: C.ink, sc: pb(T, t_s) });
    jar(c, 290, 720, 1.1 * pb(T, sec(s).t0 + .1), 'PESOS', '#F2E3B3', .3 + .4 * pr(T, t_p, 1.5), T, 9900);
    jar(c, 790, 720, 1.1 * pb(T, sec(s).t0 + .4), 'DÓLARES', '#CFE8D5', .25 + .35 * pr(T, t_u, 1.5), T, 9910);
    // monedas que caen en ambos frascos
    for (let k = 0; k < 6; k++) { const t = t_p + k * .45, u = pr(T, t, .5, easeIn); if (u <= 0 || u >= 1) continue; const x = k % 2 ? 790 : 290; c.fillStyle = C.gold; c.beginPath(); c.ellipse(x, lerp(420, 620, u), 26, 11, 0, 0, TAU); c.fill(); c.strokeStyle = C.ink; c.lineWidth = 3; c.stroke(); }
    stamp(c, 'NO ES ADIVINAR', 540, 1080, T, t_a + .1, { size: 54, col: C.vio, rot: -.03 });
    tag(c, 'ES NO DEPENDER DE UNA SOLA', 540, 1200, { size: 30, bg: C.goldL, sc: pb(T, t_n) });
    person(c, 130, 1470, .7, { seed: 3, shirt: C.gold, ...idle(T), look: 1, mouth: 'smile', armL: [2.3, .4], armR: [2.3, .4] });
  }); }

// 7 · Cierre (noche): ¿dónde estará el dólar? nadie sabe · Short: los dos frascos
if (has('cierre')) { const s = 'cierre', t_n = As(s, 'Nadie sabe'), t_h = As(s, 'Haz tu cuenta.'), t_u = TK ? null : As(s, 'una sola moneda.'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_n + .1, 10, 'ping'); if (t_u) hit(t_u + .1, 10, 'impact'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, TK ? '¿EL DÓLAR EN DICIEMBRE?' : '¿DÓNDE VA A ESTAR?', 540, 300, { size: 64, col: C.chalk, sh: C.goldD, clipP: pr(T, t_n - .2, .6, easeIO), max: 1000 });
    tx(c, 'NADIE SABE', 540, 410, { size: 60, col: C.lav, sh: null, clipP: pr(T, t_n + .3, .6, easeIO), max: 1000 });
    if (TK) { const g = pb(T, sec(s).t0 + .3); if (g > 0) { c.save(); c.translate(540, 700); c.scale(g, g); const q = 1 + .05 * Math.sin(T * 4);
        c.scale(q, q); tx(c, '?', 0, 0, { size: 300, col: C.gold, sh: null }); c.restore(); }
      bill(c, 300, 760 + 14 * Math.sin(T * 2), .9, -.2 + .1 * Math.sin(T * 1.5), 9950); bill(c, 780, 690 + 14 * Math.cos(T * 2), .9, .2 - .1 * Math.sin(T * 1.3), 9960); }
    else { jar(c, 300, 760, .9 * pb(T, sec(s).t0 + .3), 'PESOS', '#F2E3B3', .6, T, 9970); jar(c, 780, 760, .9 * pb(T, sec(s).t0 + .6), 'DÓLARES', '#CFE8D5', .5, T, 9980); }
    tx(c, 'HAZ TU CUENTA', 540, 1080, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada =================
function cover(c) { const t = As('gancho', 'subió casi diez'); drawScene(c, SC[0], Math.min(t + 2.0, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('dolar-sube', cover);
