// TITÁN · «¿Esperar el momento perfecto para invertir?» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js) · línea A · serie «La cuenta que nadie hace»
// SPY (S&P 500) con dividendos, Yahoo Finance, 20 nov 2006 → 20 nov 2026 (5.031 días de bolsa). USD 10.000 → 70.768; sin los 10 mejores días → 30.708; sin 20 → 18.470; sin 30 → 12.267.
// SER (inyectada por build.sh): S = [mes, invertido, sin los 10 mejores] y BEST = los 10 mejores días. Cálculo TITÁN: entregas/titan/momento_perfecto/datos/.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const usd = v => 'USD ' + Math.round(v).toLocaleString('es-CO').replace(/,/g, '.');
const S = SER.S.slice(0, -1), FIN = SER.S[SER.S.length - 1];
function src(c, s, y = 1520) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }
function hist(c, y = 400) { tag(c, 'DATOS REALES · PASADO, NO PROMESA', 540, y, { size: 26, bg: C.paper }); }

// ---------- piezas ----------
// calendario de «días de bolsa»: 20 × 13 casillas (cada una ≈ 20 días); 10 casillas doradas = los mejores días
const GOLD = [7, 31, 52, 77, 101, 133, 158, 190, 214, 243];
function calendar(c, T, t0, tCross, x0, y0, o = {}) { const cw = o.cw ?? 40, n = 260;
  for (let k = 0; k < n; k++) { const col = k % 20, row = Math.floor(k / 20), x = x0 + col * (cw + 6), y = y0 + row * (cw + 6), g = pr(T, t0 + k * .004, .25);
    if (g <= 0) continue; const gold = GOLD.includes(k), cr = gold && T > tCross;
    c.save(); c.globalAlpha = g; shp(c, R4(x, y, cw, cw), gold ? (cr ? '#FFB4A6' : C.gold) : C.paper, { sharp: true, w: 3, lc: C.ink, seed: 6000 + k % 50 }); c.restore();
    if (cr) { const p = pr(T, tCross + GOLD.indexOf(k) * .06, .25); ln(c, [[x + 4, y + 4], [x + cw - 4, y + cw - 4]], { w: 5, col: C.red, p, straight: true, seed: 6100 + k }); ln(c, [[x + cw - 4, y + 4], [x + 4, y + cw - 4]], { w: 5, col: C.red, p, straight: true, seed: 6200 + k }); } } }
// gráfico de la serie: invertido (dorado) y sin los 10 mejores (rojo)
const CX0 = 130, CX1 = 960, CZ = 1240, CH = 640, VMAX = 75000;
const cx = i => CX0 + (CX1 - CX0) * i / (S.length - 1), cy = v => CZ - CH * v / VMAX;
function chart(c, T, tA, dA, tB, dB, o = {}) {
  ln(c, [[CX0 - 20, CZ], [CX1 + 20, CZ]], { w: 5, straight: true, seed: 6300 }); ln(c, [[CX0 - 20, CZ], [CX0 - 20, CZ - CH - 20]], { w: 4, straight: true, seed: 6301 });
  [10000, 30000, 50000, 70000].forEach(v => { tx(c, (v / 1000) + ' mil', CX0 - 32, cy(v), { size: 22, f: 'ui', align: 'right', al: .7 }); c.save(); c.globalAlpha = .18; c.strokeStyle = C.ink; c.lineWidth = 2; c.beginPath(); c.moveTo(CX0 - 20, cy(v)); c.lineTo(CX1 + 20, cy(v)); c.stroke(); c.restore(); });
  ['2006', '2011', '2016', '2021', '2026'].forEach((y, k) => tx(c, y, CX0 + (CX1 - CX0) * k / 4, CZ + 34, { size: 24, f: 'ui', al: .75 }));
  const pa = pr(T, tA, dA, easeIO), pbb = tB != null ? pr(T, tB, dB, easeIO) : 0;
  if (pa > 0) { const pts = S.map((r, i) => [cx(i), cy(r[1])]); ln(c, pts, { w: 7, col: C.goldD, p: pa, seed: 6310 });
    const i = Math.min(S.length - 1, Math.floor(pa * (S.length - 1))); pill(c, usd(pa >= 1 ? FIN[1] : S[i][1]), Math.min(820, cx(i) + 10), cy(S[i][1]) - 64, { size: 34, f: 'ui', col: C.gold }); }
  if (pbb > 0) { const pts = S.map((r, i) => [cx(i), cy(r[2])]); ln(c, pts, { w: 7, col: C.red, p: pbb, seed: 6320 });
    const i = Math.min(S.length - 1, Math.floor(pbb * (S.length - 1))); pill(c, usd(pbb >= 1 ? FIN[2] : S[i][2]), Math.min(840, cx(i) + 10), cy(S[i][2]) + 64, { size: 34, f: 'ui', col: '#FFB4A6' }); }
  if (o.legend) { tag(c, '— INVERTIDO TODO EL TIEMPO', 300, 560, { size: 24, bg: C.goldL, sc: pb(T, tA) }); if (tB != null) tag(c, '— SIN LOS 10 MEJORES DÍAS', 760, 560, { size: 24, bg: '#FFD3CB', sc: pb(T, tB) }); } }
// línea de tiempo 2006–2026 con los 10 mejores días (dorado) y su peor día cercano (rojo)
const yr = s => +s.slice(0, 4) + (+s.slice(5, 7) - 1) / 12 + (+s.slice(8, 10)) / 365;
function timeline(c, T, t0, tCl, y = 900) { const X = v => 110 + (v - 2006.9) / 20 * 860;
  ln(c, [[100, y], [980, y]], { w: 7, straight: true, seed: 6400, p: pr(T, t0, .6, easeIO) });
  [2006, 2010, 2014, 2018, 2022, 2026].forEach(v => tx(c, '' + v, X(v + .9), y + 44, { size: 24, f: 'ui', al: pr(T, t0 + .3, .3) * .8 }));
  SER.BEST.forEach(([d, p], k) => { const x = X(yr(d)), g = pb(T, t0 + .4 + k * .1); if (g <= 0) return; const h = 40 + p * 14;
    shp(c, R4(x - 9, y - h * g, 18, h * g), C.gold, { sharp: true, w: 3, lc: C.ink, seed: 6410 + k });
    if (T > tCl) { const gr = pr(T, tCl + k * .05, .3); shp(c, R4(x - 9 + 14, y, 18, 70 * gr), C.red, { sharp: true, w: 3, lc: C.ink, seed: 6430 + k }); } });
  [['CRISIS 2008', 2008.8, -260], ['PANDEMIA 2020', 2020.2, -220], ['ABRIL 2025', 2025.3, -260]].forEach(([s, v, dy], k) => tag(c, s, Math.min(900, Math.max(180, X(v))), y + dy, { size: 28, bg: C.paper, sc: pb(T, tCl + .2 + k * .35), rot: (k - 1) * .04 })); }

// ================= escenas =================
// 1 · Gancho: «20 años ≈ 5.000 días»: el calendario se llena, 10 casillas doradas se tachan → «MENOS DE LA MITAD»
if (has('gancho')) { const s = 'gancho', t_10 = As(s, 'solo diez días'), t_m = As(s, 'menos de la mitad.');
  hit(.05, 8, 'stamp'); hit(t_10 + .2, 10, 'ping'); hit(t_m + .2, 18, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_m, 960], [t_m + .6, 920]]), key(T, [[0, 1.0], [t_m, 1.0], [t_m + .6, 1.06]]) + .01 * Math.sin(L * 1.3));
    tx(c, '¿TE PERDISTE', 540, 190, { size: 96, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, 'SOLO 10 DÍAS?', 540, 300, { size: 96, col: C.goldD, sh: C.ink });
    tag(c, '20 AÑOS DE BOLSA ≈ 5.000 DÍAS', 540, 410, { size: 30, bg: C.paper, sc: pb(T, .2) });
    calendar(c, T, .1, t_10 + .3, 80, 480, { cw: 40 });
    stamp(c, 'MENOS DE LA MITAD', 540, 1170, T, t_m + .1, { size: 74, col: C.red, rot: -.04 });
    person(c, 900, 1560, .6, { seed: 5, shirt: C.gold, flip: true, ...idle(T), look: -1, mouth: T > t_m ? 'o' : 'smile', brow: T > t_m ? 1 : 0, sweat: T > t_m + .2 ? T : 0, armR: T > t_10 ? [1.9, .5] : [.3, .2] });
    burst(c, 540, 1170, T, t_m + .2, { R: 260, n: 18, col: C.red });
  }); }

// 2 · TikTok · La cuenta: USD 10.000 desde nov. 2006, dividendos reinvertidos → USD 70.768 (línea dorada que se dibuja)
if (has('dato')) { const s = 'dato', t_10 = As(s, 'Diez mil dólares'), t_r = As(s, 'dividendos reinvertidos'), t_70 = As(s, 'setenta mil setecientos.');
  hit(t_10 + .2, 8, 'ping'); hit(t_r + .1, 6, 'ping'); hit(t_70 + .3, 16, 'impact');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_70, 1.0], [t_70 + .6, 1.04]]) + .012 * Math.sin(L));
    tx(c, 'MIRA LA CUENTA', 540, 200, { size: 90, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    pill(c, usd(10000) + ' · S&P 500 · NOV. 2006', 540, 320, { size: 40, f: 'ui', sc: pb(T, sec(s).t0 + .1) }); hist(c, 420);
    chart(c, T, t_10 + .2, t_70 - t_10 + .2, null, 0, { legend: true });
    if (T > t_r) tag(c, 'DIVIDENDOS REINVERTIDOS · SIN TOCARLO', 540, 1330, { size: 28, bg: C.goldL, sc: pb(T, t_r) });
    stamp(c, '×7', 880, 680, T, t_70 + .3, { size: 90, col: C.goldD, rot: .06 });
    person(c, 140, 1560, .55, { seed: 9, shirt: C.navy, ...idle(T), look: 1, mouth: T > t_70 ? 'grin' : 'smile', armR: [2.1, .4] });
    src(c, 'SPY (ETF del S&P 500) · Yahoo Finance · 20 nov. 2006 → 20 nov. 2026 · cálculo TITÁN');
  }); }

// 3 · Sin los 10 mejores días: la línea roja se queda abajo → USD 30.708 · MENOS DE LA MITAD (TikTok «diez», Short «cuenta»)
function tenScene(s, tr, tA, dA, tB, dB, tHalf) {
  scene(s, tr, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 940], [tB + dB, 940], [tB + dB + .6, 980]]), key(T, [[0, 1.0], [tB + dB, 1.0], [tB + dB + .6, 1.05]]) + .012 * Math.sin(L));
    tx(c, TK ? '…SIN 10 DÍAS' : 'USD 10.000 · 20 AÑOS', 540, 200, { size: TK ? 100 : 80, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    tag(c, TK ? 'DE ~5.000 DÍAS DE BOLSA, SOLO LOS 10 MEJORES' : 'S&P 500 · DIVIDENDOS REINVERTIDOS', 540, 310, { size: 28, bg: C.paper, sc: pb(T, sec(s).t0) }); hist(c, 410);
    chart(c, T, tA, dA, tB, dB, { legend: true });
    stamp(c, 'MENOS DE LA MITAD', 560, 820, T, tHalf, { size: 64, col: C.red, rot: -.04 });
    person(c, 960, 1560, .55, { seed: 11, shirt: C.vio, flip: true, ...idle(T), look: -1, mouth: T > tB + dB ? 'o' : 'flat', brow: T > tB + dB ? 1 : 0, sweat: T > tHalf ? T : 0 });
    src(c, 'SPY · Yahoo Finance · 20 nov. 2006 → 20 nov. 2026 · sin comisiones ni impuestos · cálculo TITÁN');
  }); }
if (has('diez')) { const s = 'diez', t_5 = As(s, 'cinco mil días'), t_m = As(s, 'los diez mejores,'), t_30 = As(s, 'treinta mil setecientos.'), t_h = As(s, 'Menos de la mitad.');
  hit(t_5 + .1, 6, 'ping'); hit(t_m + .2, 10, 'impact'); hit(t_30 + .3, 14, 'impact'); hit(t_h + .1, 18, 'stamp');
  tenScene(s, 'iris', sec(s).t0 - .4, .01, t_m + .1, t_30 - t_m + .1, t_h + .1); }
if (has('cuenta')) { const s = 'cuenta', t_10 = As(s, 'Diez mil dólares'), t_70 = As(s, 'setenta mil setecientos.'), t_s = As(s, 'Sin los diez mejores'), t_30 = As(s, 'treinta mil setecientos.');
  hit(t_10 + .2, 8, 'ping'); hit(t_70 + .3, 14, 'impact'); hit(t_s + .1, 10, 'impact'); hit(t_30 + .3, 18, 'stamp');
  tenScene(s, 'whip', t_10 + .1, t_70 - t_10 + .2, t_s, t_30 - t_s + .2, t_30 + .4); }

// 4 · TikTok · Sin 20 y sin 30 mejores días: barras que se encogen
if (has('mas')) { const s = 'mas', t_20 = As(s, 'Sin los veinte mejores'), t_18 = As(s, 'dieciocho mil quinientos.'), t_30 = As(s, 'Sin los treinta mejores,'), t_12 = As(s, 'doce mil trescientos.');
  hit(t_20 + .1, 8, 'ping'); hit(t_18 + .2, 12, 'impact'); hit(t_30 + .1, 8, 'ping'); hit(t_12 + .2, 18, 'impact');
  const B = [['TODO EL TIEMPO', 70768, sec(s).t0 + .05, C.gold], ['SIN 10 MEJORES', 30708, sec(s).t0 + .35, '#F3B0A2'], ['SIN 20 MEJORES', 18470, t_18 - .4, '#EA7F6E'], ['SIN 30 MEJORES', 12267, t_12 - .4, C.red]];
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, key(T, [[0, 1.0], [t_12, 1.0], [t_12 + .6, 1.05]]) + .012 * Math.sin(L));
    tx(c, 'Y SI TE PERDÍAS MÁS…', 540, 210, { size: 80, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 }); hist(c, 320);
    const Z = 1240, K = 700 / 72000; ln(c, [[80, Z], [1000, Z]], { w: 6, straight: true, seed: 6500 });
    B.forEach(([n, v, t, col], k) => { const x = 175 + k * 243, g = pr(T, t, .7, easeOutBack); if (g <= 0) return;
      shp(c, R4(x - 90, Z - v * K * g, 180, v * K * g), col, { sharp: true, w: 5, lc: C.ink, seed: 6510 + k, hatch: shade(col, .6), hal: .3 });
      tx(c, n, x, Z + 40, { size: 24, f: 'ui', max: 230 }); pill(c, usd(v).replace('USD ', ''), x, Z - v * K - 56, { size: 34, f: 'ui', sc: pb(T, t + .3), col: k ? '#FFB4A6' : C.gold }); });
    stamp(c, '−83 %', 830, 820, T, t_12 + .2, { size: 76, col: C.red, rot: .05 });
    src(c, 'Valores en USD de 10.000 iniciales · SPY, Yahoo Finance, nov. 2006 → nov. 2026 · cálculo TITÁN');
  }); }

// 5 · ¿Cuándo? Línea de tiempo: los 10 mejores días (dorado) pegados a días rojos (los peores) en 2008, 2020 y abril 2025
if (has('cuando')) { const s = 'cuando', t_q = TK ? As(s, '¿Y cuándo fueron') : sec(s).t0, t_8 = As(s, TK ? 'Ocho de los diez mejores' : 'ocho de esos diez días'), t_p = As(s, 'uno de los peores');
  const t_c = TK ? As(s, 'crisis de dos mil ocho,') : null, t_r = TK ? null : As(s, 'el rebote.');
  hit(t_q + .1, 8, 'ping'); hit(t_8 + .2, 10, 'impact'); hit(t_p + .2, 16, 'stamp'); if (t_c) hit(t_c + .1, 8, 'ping'); if (t_r) hit(t_r + .1, 12, 'stamp');
  scene(s, TK ? 'news' : 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_p, 1.0], [t_p + .7, 1.05]]) + .012 * Math.sin(L));
    tx(c, '¿CUÁNDO FUERON?', 540, 210, { size: 92, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    tag(c, 'DORADO: LOS 10 MEJORES DÍAS · ROJO: SU PEOR DÍA CERCANO', 540, 320, { size: 26, bg: C.paper, sc: pb(T, sec(s).t0 + .2) });
    timeline(c, T, sec(s).t0 + .1, t_p + .1, 880);
    stamp(c, '8 DE 10: A MENOS DE UNA SEMANA', 540, 1130, T, t_p + .3, { size: 52, col: C.red, rot: -.03 });
    tx(c, 'DE UNO DE LOS PEORES DÍAS', 540, 1215, { size: 40, f: 'ui', col: C.red, al: pr(T, t_p + .6, .3) });
    if (!TK && t_r) { const u = pr(T, t_r - 1.6, 1.2, easeIO); person(c, lerp(640, 1180, u), 1560, .55, { seed: 7, shirt: '#3B4466', flip: u < .02 ? false : false, ...idle(T), look: 1, mouth: 'o', brow: 1, walk: u > 0 && u < 1 ? T * 9 : undefined, sweat: T }); }
    else person(c, 150, 1560, .55, { seed: 7, shirt: '#3B4466', ...idle(T), look: 1, mouth: T > t_p ? 'o' : 'flat', brow: T > t_p ? 1 : 0, armR: [1.8, .5] });
    src(c, 'SPY · Yahoo Finance · 10 mejores días vs. 20 peores de 2006–2026 · cálculo TITÁN');
  }); }

// 6 · TikTok · Abril 2025: −5,85 % el 4 de abril → +10,50 % el 9 de abril; alguien sale corriendo y se pierde el rebote
if (has('miedo')) { const s = 'miedo', t_9 = As(s, 'El nueve de abril'), t_10 = As(s, 'diez coma cinco por ciento'), t_c = As(s, 'había caído casi seis.'), t_m = As(s, 'Quien se salió por miedo'), t_r = As(s, 'el rebote.');
  hit(t_9 + .1, 8, 'ping'); hit(t_10 + .2, 18, 'impact'); hit(t_c + .2, 12, 'impact'); hit(t_m + .1, 8, 'ping'); hit(t_r + .1, 16, 'stamp');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_10, 1.0], [t_10 + .6, 1.05]]) + .012 * Math.sin(L));
    tx(c, 'ABRIL DE 2025', 540, 210, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) }); hist(c, 320);
    const Z = 900; ln(c, [[120, Z], [960, Z]], { w: 6, straight: true, seed: 6600 });
    const gd = pr(T, t_c - .3, .6, easeOutBack); if (gd > 0) { shp(c, R4(260, Z, 200, 5.85 * 45 * gd), C.red, { sharp: true, w: 5, lc: C.ink, seed: 6601, hatch: shade(C.red, .6), hal: .3 });
      tx(c, '4 DE ABRIL', 360, Z - 40, { size: 30, f: 'ui' }); pill(c, '−5,85 %', 360, Z + 5.85 * 45 + 60, { size: 40, f: 'ui', sc: pb(T, t_c), col: '#FFB4A6' }); }
    const gu = pr(T, t_10 - .2, .7, easeOutBack); if (gu > 0) { shp(c, R4(620, Z - 10.5 * 45 * gu, 200, 10.5 * 45 * gu), C.gold, { sharp: true, w: 5, lc: C.ink, seed: 6602, hatch: shade(C.gold, .6), hal: .3 });
      tx(c, '9 DE ABRIL', 720, Z + 40, { size: 30, f: 'ui' }); pill(c, '+10,50 %', 720, Z - 10.5 * 45 - 60, { size: 44, f: 'ui', sc: pb(T, t_10 + .2), col: C.gold }); }
    burst(c, 720, Z - 10.5 * 45, T, t_10 + .3, { R: 200, n: 16 });
    const u = pr(T, t_m, 1.4, easeIO); person(c, lerp(380, -120, u), 1560, .6, { seed: 3, shirt: C.lav, flip: u > 0, ...idle(T), look: u > 0 ? -1 : 1, mouth: 'o', brow: 1, sweat: T > t_c ? T : 0, walk: u > 0 && u < 1 ? T * 10 : undefined });
    stamp(c, 'SE PERDIÓ EL REBOTE', 600, 1330, T, t_r + .1, { size: 60, col: C.red, rot: -.04 });
    src(c, 'SPY · Yahoo Finance · cierres del 4 y el 9 de abril de 2025');
  }); }

// 7 · TikTok · Ojo: cálculo con el pasado, sin comisiones ni impuestos; no predice
if (has('ojo')) { const s = 'ojo', t_p = As(s, 'con el pasado,'), t_c = As(s, 'sin comisiones'), t_n = As(s, 'No dice qué va a pasar.');
  hit(sec(s).t0 + .1, 8, 'ping'); hit(t_c + .1, 8, 'ping'); hit(t_n + .1, 14, 'stamp');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'OJO', 540, 230, { size: 140, col: C.red, sc: pb(T, sec(s).t0 - .2) });
    ['CÁLCULO CON EL PASADO', 'SIN COMISIONES', 'SIN IMPUESTOS'].forEach((w, k) => pill(c, w, 540, 520 + k * 150, { size: 46, f: 'ui', sc: pb(T, [t_p, t_c, t_c + .5][k]), col: k ? C.lav : C.gold }));
    stamp(c, 'NO PREDICE EL FUTURO', 540, 1050, T, t_n + .1, { size: 64, col: C.red, rot: -.03 });
    person(c, 200, 1560, .65, { seed: 12, shirt: C.vio, ...idle(T), look: 1, mouth: 'flat', armR: [2.3, .3] });
  }); }

// 8 · Cierre (noche): nadie sabe cuál será el próximo mejor día · esperar también cuesta · haz tu cuenta
if (has('cierre')) { const s = 'cierre', t_n = As(s, 'Nadie sabe'), t_e = As(s, TK ? 'esperar el momento perfecto' : 'Esperar el momento perfecto'), t_h = As(s, 'Haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_n + .1, 8, 'ping'); hit(t_e + .1, 12, 'stamp'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, 'NADIE SABE CUÁL SERÁ', 540, 300, { size: 58, col: C.chalk, sh: C.goldD, clipP: pr(T, t_n, .6, easeIO), max: 1000 });
    tx(c, 'EL PRÓXIMO MEJOR DÍA', 540, 390, { size: 66, col: C.lav, sh: null, clipP: pr(T, t_n + .5, .6, easeIO), max: 1000 });
    // calendario pequeño con un «?» dorado que late
    for (let k = 0; k < 21; k++) { const x = 330 + (k % 7) * 64, y = 520 + Math.floor(k / 7) * 64; shp(c, R4(x, y, 52, 52), k === 11 ? C.gold : '#2B3352', { sharp: true, w: 3, lc: C.chalk, seed: 6700 + k }); }
    tx(c, '?', 330 + 4 * 64 + 26, 520 + 64 + 30, { size: 44 * (1 + .08 * Math.sin(T * 5)), col: C.ink, sh: null });
    pill(c, 'ESPERAR EL MOMENTO PERFECTO TAMBIÉN CUESTA', 540, 820, { size: 34, f: 'ui', sc: pb(T, t_e) });
    tx(c, 'HAZ TU CUENTA', 540, 1000, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada: el gancho con «MENOS DE LA MITAD» =================
function cover(c) { const t = As('gancho', 'menos de la mitad.'); drawScene(c, SC[0], Math.min(t + 1.4, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('momento-perfecto', cover);
