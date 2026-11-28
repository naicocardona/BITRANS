// TITÁN · «De la peor semana a la mejor en 19 meses» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js) · línea A · noticia del 27 nov 2026
// MS (inyectada por build.sh): S&P 500 y Nasdaq 100 diarios desde el 30 oct 2026 + S&P semanal mar–may 2025 (Yahoo Finance).
// S&P: semana 16–20 nov −8,61 % (peor desde la del 31 mar 2025) · semana 23–27 nov +5,60 % (mejor desde la del 7 abr 2025). NDX −10,43 % y +6,78 %. EJEMPLO HIPOTÉTICO: USD 1.000 → USD 1.056.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const fmt = v => Math.round(v).toLocaleString('es-CO').replace(/,/g, '.');
function src(c, s, y = 1312) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }
const GRN = C.green;

// ---------- piezas ----------
// dos barras semanales (peor y mejor) que crecen desde la línea del cero
function weekBars(c, T, tA, tB, a, b, o = {}) { const y0 = o.y0 ?? 820, k = o.k ?? 34, x1 = o.x1 ?? 330, x2 = o.x2 ?? 750, w = o.w ?? 220;
  ln(c, [[120, y0], [960, y0]], { w: 5, straight: true, seed: 6000 }); tx(c, '0 %', 90, y0, { size: 22, f: 'ui', al: .6 });
  const ga = pr(T, tA, .6, easeIO), gb = pr(T, tB, .6, easeIO);
  if (ga > 0) { const h = a * k * ga; shp(c, R4(x1 - w / 2, y0, w, h), C.red, { sharp: true, w: 5, lc: C.ink, seed: 6001, hatch: shade(C.red, .6), hal: .25 }); }
  if (gb > 0) { const h = b * k * gb; shp(c, R4(x2 - w / 2, y0 - h, w, h), GRN, { sharp: true, w: 5, lc: C.ink, seed: 6002, hatch: shade(GRN, .6), hal: .25 }); }
  if (ga >= 1) { pill(c, '−' + String(a).replace('.', ',') + ' %', x1, y0 + a * k + 60, { size: 46, f: 'ui', col: '#FFB4A6', sc: pb(T, tA + .5) }); tx(c, o.la || 'SEMANA 16–20 NOV', x1, y0 - 40, { size: 24, f: 'ui', al: .8 }); }
  if (gb >= 1) { pill(c, '+' + String(b).replace('.', ',') + ' %', x2, y0 - b * k - 60, { size: 46, f: 'ui', col: C.gold, sc: pb(T, tB + .5) }); tx(c, o.lb || 'SEMANA 23–27 NOV', x2, y0 + 40, { size: 24, f: 'ui', al: .8 }); burst(c, x2, y0 - b * k, T, tB + .5, { R: 140 }); } }
// línea diaria del S&P desde el 30 oct, con la semana roja y la verde sombreadas
const DX0 = 150, DX1 = 930, DZ = 1130, DH = 520, DMIN = 6800, DMAX = 7800, ND = MS.spx.length;
const dxx = i => DX0 + (DX1 - DX0) * i / (ND - 1), dyy = v => DZ - DH * (v - DMIN) / (DMAX - DMIN);
const iOf = s => MS.spx.findIndex(r => r[0] === s);
function spxChart(c, T, t0, tR, tG) {
  const i13 = iOf('13 Nov'), i20 = iOf('20 Nov');
  if (T > tR) { c.save(); c.globalAlpha = .22 * pr(T, tR, .4); c.fillStyle = C.red; c.fillRect(dxx(i13), DZ - DH - 20, dxx(i20) - dxx(i13), DH + 40); c.restore(); }
  if (T > tG) { c.save(); c.globalAlpha = .22 * pr(T, tG, .4); c.fillStyle = GRN; c.fillRect(dxx(i20), DZ - DH - 20, dxx(ND - 1) - dxx(i20), DH + 40); c.restore(); }
  ln(c, [[DX0 - 20, DZ + 20], [DX1 + 20, DZ + 20]], { w: 5, straight: true, seed: 6100 });
  [7000, 7250, 7500, 7750].forEach(v => tx(c, fmt(v), DX0 - 30, dyy(v), { size: 20, f: 'ui', align: 'right', al: .5 }));
  [['30 OCT', 0], ['13 NOV', i13], ['20 NOV', i20], ['27 NOV', ND - 1]].forEach(([s, i]) => tx(c, s, dxx(i), DZ + 56, { size: 20, f: 'ui', al: .75 }));
  const g = pr(T, t0, Math.max(.6, tG + .4 - t0), easeIO), m = Math.max(1, Math.round(g * (ND - 1)));
  ln(c, MS.spx.slice(0, m + 1).map((r, i) => [dxx(i), dyy(r[1])]), { w: 7, col: C.vio, straight: true, seed: 6110 });
  if (T > tR + .3) pill(c, '−8,6 %', (dxx(i13) + dxx(i20)) / 2, DZ - DH + 30, { size: 38, f: 'ui', col: '#FFB4A6', sc: pb(T, tR + .3) });
  if (T > tG + .3) pill(c, '+5,6 %', (dxx(i20) + dxx(ND - 1)) / 2 + 20, DZ - DH + 110, { size: 38, f: 'ui', col: C.gold, sc: pb(T, tG + .3) }); }
function chip(c, x, y, s, T, k = 1) { if (k <= 0) return; c.save(); c.translate(x, y); c.scale(s * k, s * k); c.rotate(.05 * Math.sin(T * 2));
  for (let i = 0; i < 5; i++) for (const sd of [-1, 1]) { ln(c, [[-80 + i * 40, sd * 95], [-80 + i * 40, sd * 125]], { w: 6, col: C.ink, straight: true, seed: 6200 + i + sd }); ln(c, [[sd * 95, -80 + i * 40], [sd * 125, -80 + i * 40]], { w: 6, col: C.ink, straight: true, seed: 6210 + i + sd }); }
  shp(c, R4(-100, -100, 200, 200), '#2B2F45', { sharp: true, w: 5, lc: C.ink, seed: 6220 }); shp(c, R4(-60, -60, 120, 120), C.gold, { sharp: true, w: 4, lc: C.ink, seed: 6221 });
  tx(c, 'IA', 0, 4, { size: 54, f: 'ui', col: C.navy, sh: null }); c.restore(); }
function cal(c, x, y, s, top, big, col, seed, k = 1, rot = 0) { if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(rot); c.scale(s * k, s * k);
  shp(c, R4(-120, -120, 240, 240), C.paper, { sharp: true, w: 5, lc: C.ink, seed }); shp(c, R4(-120, -120, 240, 64), col, { sharp: true, w: 4, lc: C.ink, seed: seed + 1 });
  tx(c, top, 0, -88, { size: 28, f: 'ui', col: C.paper, sh: null, max: 220 }); tx(c, big, 0, 30, { size: 60, f: 'ui', col: C.ink, sh: null, max: 220 }); c.restore(); }
function money(c, x, y, s, label, col, k = 1) { if (k <= 0) return; c.save(); c.translate(x, y); c.scale(s * k, s * k); shp(c, R4(-150, -70, 300, 140), col, { w: 5, lc: C.ink, seed: 6300 + (label.length % 7) });
  tx(c, label, 0, 4, { size: 54, f: 'ui', col: C.ink, sh: null, max: 280 }); c.restore(); }
function hipo(c, y = 330, k = 1) { tag(c, 'EJEMPLO HIPOTÉTICO', 540, y, { size: 26, bg: C.paper, sc: k }); }

// ================= escenas =================
// 1 · Gancho: peor semana en 19 meses → mejor semana en 19 meses (dos barras)
if (has('gancho')) { const s = 'gancho', t_p = As(s, 'peor semana'), t_m = As(s, 'mejor semana');
  hit(.05, 8, 'stamp'); hit(t_p + .2, 16, 'impact'); hit(t_m + .2, 16, 'impact');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_m, 960], [t_m + .6, 930]]), key(T, [[0, 1.0], [t_m, 1.0], [t_m + .6, 1.05]]) + .01 * Math.sin(L * 1.3));
    tx(c, 'BOLSA DE EE. UU.', 540, 190, { size: 90, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, 'EN 2 SEMANAS', 540, 295, { size: 80, col: C.goldD, sh: C.ink, sc: pb(T, .2) });
    weekBars(c, T, Math.min(t_p, 1.0), t_m, 8.6, 5.6, { y0: 780, k: 32 });
    stamp(c, 'PEOR EN 19 MESES', 330, 1215, T, t_p + .2, { size: 44, col: C.red, rot: -.05 });
    stamp(c, 'MEJOR EN 19 MESES', 750, 460, T, t_m + .2, { size: 44, col: GRN, rot: .04 });
    person(c, 800, 1460, .75, { seed: 4, shirt: C.gold, ...idle(T), look: T > t_m ? 1 : -1, mouth: T > t_m ? 'grin' : 'o', brow: T > t_p ? 1 : 0, sweat: T > t_p && T < t_m ? T : 0, jump: T > t_m + .2 && T < t_m + .9 ? 30 * Math.sin((T - t_m - .2) / .7 * Math.PI) : 0 });
    src(c, 'S&P 500 · cierres semanales · Yahoo Finance', 1520);
  }); }

// 2 · El dato: S&P día a día (roja y verde); TikTok: el Nasdaq 100 más extremo
if (has('dato')) { const s = 'dato', t_c = As(s, 'cayó ocho coma seis'), t_s = As(s, 'subió cinco coma seis'), t_n = TK ? As(s, 'Nasdaq cien') : null, t_d = TK ? As(s, 'menos diez coma cuatro,') : null, t_e = TK ? As(s, 'más seis coma ocho.') : null;
  hit(t_c + .2, 14, 'impact'); hit(t_s + .2, 14, 'impact'); if (TK) { hit(t_n, 10, 'stamp'); hit(t_d + .2, 14, 'impact'); hit(t_e + .2, 14, 'impact'); }
  const tSw = TK ? t_n - .3 : 999;
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, (T < tSw ? key(T, [[sec(s).t0, 1.0], [t_s, 1.0], [t_s + .6, 1.05]]) : key(T, [[tSw, 1.08], [tSw + .6, 1.0]])) + .012 * Math.sin(L));
    if (T < tSw) {
      tx(c, 'S&P 500', 540, 200, { size: 100, col: C.ink, sc: pb(T, sec(s).t0 - .3) }); tag(c, 'CIERRE DE CADA DÍA', 540, 310, { size: 28, bg: C.paper, sc: pb(T, sec(s).t0) });
      spxChart(c, T, sec(s).t0 + .1, t_c, t_s);
      person(c, 990, 1470, .5, { seed: 8, shirt: C.vio, flip: true, ...idle(T), look: -1, mouth: T > t_s ? 'grin' : 'o', brow: T > t_c ? 1 : 0 });
      src(c, 'Yahoo Finance · S&P 500 · 30 oct.–27 nov. 2026', 1250);
    } else {
      tx(c, 'NASDAQ 100', 540, 200, { size: 100, col: C.ink, sc: pb(T, tSw) }); tag(c, 'MÁS EXTREMO', 540, 310, { size: 30, bg: '#FFD3CB', sc: pb(T, tSw + .2) });
      weekBars(c, T, t_d - .1, t_e - .1, 10.4, 6.8, { y0: 760, k: 30 });
      person(c, 880, 1460, .65, { seed: 8, shirt: C.vio, flip: true, ...idle(T), look: T > t_e ? -1 : 1, mouth: T > t_e ? 'grin' : 'o', brow: 1 });
      src(c, 'Yahoo Finance · Nasdaq 100 · 13→20 nov. y 20→27 nov. 2026', 1200);
    }
  }); }

// 3 · TikTok · ¿Qué lo movió? Según los reportes: IA y chips, las que más habían caído
if (has('porque')) { const s = 'porque', t_r = As(s, 'Según los reportes,'), t_i = As(s, 'inteligencia artificial'), t_c = As(s, 'de chips,'), t_m = As(s, 'más habían caído.');
  hit(t_r + .1, 8, 'ping'); hit(t_i + .1, 12, 'impact'); hit(t_c + .1, 10, 'impact'); hit(t_m + .1, 14, 'stamp');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_m, 1.0], [t_m + .5, 1.05]]) + .012 * Math.sin(L));
    tx(c, '¿QUÉ LO MOVIÓ?', 540, 200, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) }); tag(c, 'SEGÚN LOS REPORTES', 540, 310, { size: 28, bg: C.paper, sc: pb(T, t_r) });
    // el chip cae y rebota hacia arriba
    const u = pr(T, sec(s).t0 + .1, Math.max(1, t_c - sec(s).t0), easeIO), cy0 = 720 + 260 * Math.sin(Math.min(1, u * 1.6) * Math.PI) * (1 - u * .6);
    chip(c, 540, cy0 - 120 * pr(T, t_m, .6, easeOutBack), 1.15, T, pb(T, sec(s).t0 + .1));
    if (T > t_m) { const g = pr(T, t_m, .5); ln(c, [[760, 900], [760, 900 - 220 * g]], { w: 16, col: GRN, straight: true, seed: 6400 }); if (g >= 1) shp(c, [[730, 690], [790, 690], [760, 640]], GRN, { w: 4, lc: C.ink, seed: 6401 }); }
    tag(c, 'INTELIGENCIA ARTIFICIAL', 300, 1000, { size: 30, bg: C.lav, sc: pb(T, t_i), rot: -.04 });
    tag(c, 'CHIPS', 780, 1060, { size: 34, bg: C.goldL, sc: pb(T, t_c), rot: .04 });
    stamp(c, 'LAS QUE MÁS HABÍAN CAÍDO', 540, 1180, T, t_m + .1, { size: 48, col: C.goldD, rot: -.03 });
    src(c, 'Motley Fool y AP (27 nov. 2026)', 1290);
    person(c, 130, 1470, .6, { seed: 12, shirt: C.navy, ...idle(T), look: 1, mouth: T > t_m ? 'grin' : 'flat' });
  }); }

// 4 · TikTok · Abril 2025: −9 % y luego +5,7 %
if (has('abril')) { const s = 'abril', t_n = As(s, 'no es la primera'), t_a = As(s, 'abril de dos mil veinticinco'), t_9 = As(s, 'menos nueve por ciento,'), t_5 = As(s, 'más cinco coma siete.');
  hit(t_n + .1, 8, 'ping'); hit(t_a + .1, 12, 'stamp'); hit(t_9 + .2, 14, 'impact'); hit(t_5 + .2, 14, 'impact');
  scene(s, 'news', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'YA PASÓ ANTES', 540, 200, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    cal(c, 540, 450, .9, 'S&P 500', 'ABRIL 2025', C.vio, 6500, pb(T, t_a - .2), -.03);
    weekBars(c, T, Math.min(t_9 - .1, sec(s).t0 + .6), t_5 - .1, 9.1, 5.7, { y0: 880, k: 26, la: 'SEMANA 31 MAR', lb: 'SEMANA 7 ABR' });
    src(c, 'Yahoo Finance · S&P 500 semanal: 28 mar. 5.580,94 → 4 abr. 5.074,08 → 11 abr. 5.363,36', 1300);
    person(c, 150, 760, .55, { seed: 3, shirt: C.gold, ...idle(T), look: 1, mouth: 'o', brow: 1 });
  }); }

// 5 · Ejemplo hipotético: dos personas con USD 1.000 el viernes 20
if (has('ejemplo')) { const s = 'ejemplo', t_e = As(s, 'Ejemplo hipotético:'), t_v = As(s, 'vendió por miedo.'), t_o = As(s, 'La otra no'), t_h = As(s, 'la que se quedó');
  hit(t_e + .1, 12, 'stamp'); hit(t_v + .1, 12, 'impact'); hit(t_o + .1, 8, 'ping'); hit(t_h + .4, 18, 'stamp');
  scene(s, TK ? 'drop' : 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 940], [t_h, 940], [t_h + .6, 980]]), key(T, [[0, 1.0], [t_h, 1.0], [t_h + .6, 1.05]]) + .012 * Math.sin(L));
    tx(c, 'EL VIERNES 20…', 540, 200, { size: 92, col: C.ink, sc: pb(T, sec(s).t0 - .3) }); hipo(c, 310);
    money(c, 270, 520, .8, 'USD 1.000', '#CFE8D5', pb(T, t_e + .2)); money(c, 810, 520, .8, 'USD 1.000', '#CFE8D5', pb(T, t_e + .5));
    // A vende y se va con la plata; B se queda sentada
    const g = pr(T, t_v, 1.4, x => x), xa = lerp(270, 150, g);
    person(c, xa, 1150, .95, { seed: 9, shirt: C.lav, ...idle(T), walk: T > t_v && g < 1 ? T * 8 : undefined, flip: true, look: -1, mouth: 'flat', brow: 1, sweat: T > t_v ? T : 0 });
    tag(c, 'VENDIÓ POR MIEDO', 270, 690, { size: 30, bg: '#FFD3CB', sc: pb(T, t_v), rot: -.04 });
    person(c, 810, 1150, .95, { seed: 5, shirt: C.gold, ...idle(T), look: -1, mouth: T > t_h ? 'grin' : 'smile', armL: [.4, .3] });
    tag(c, 'NO HIZO NADA', 810, 690, { size: 30, bg: C.goldL, sc: pb(T, t_o), rot: .04 });
    if (T > t_h + .3) { money(c, 810, 1280, .75, 'USD 1.056', C.goldL, pb(T, t_h + .3)); burst(c, 810, 1280, T, t_h + .4, { R: 160 }); money(c, 270, 1280, .75, 'USD 1.000', C.paper, pb(T, t_h + .5)); }
  }); }

// 6 · TikTok · Ojo: no quiere decir que pasó lo peor · noviembre −3,7 %
if (has('ojo')) { const s = 'ojo', t_o = As(s, 'Ojo:'), t_n = As(s, 'En noviembre,'), t_3 = As(s, 'tres coma siete'), t_x = As(s, 'Nadie sabe');
  hit(t_o + .1, 12, 'stamp'); hit(t_n + .1, 8, 'ping'); hit(t_3 + .2, 14, 'impact'); hit(t_x + .1, 10, 'impact');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_x, 1.0], [t_x + .5, 1.05]]) + .012 * Math.sin(L));
    tx(c, 'OJO', 540, 200, { size: 120, col: C.red, sh: C.ink, sc: pb(T, t_o - .2) });
    tag(c, 'NO QUIERE DECIR QUE PASÓ LO PEOR', 540, 320, { size: 30, bg: '#FFD3CB', sc: pb(T, t_o + .3) });
    cal(c, 300, 640, 1.0, 'NOVIEMBRE', '−3,7 %', C.red, 6600, pb(T, t_n - .1), -.04);
    tx(c, 'S&P 500, 30 OCT.–27 NOV.', 300, 800, { size: 22, f: 'ui', al: .7 });
    cal(c, 780, 640, 1.0, 'PRÓXIMA SEMANA', '?', C.navy, 6610, pb(T, t_x - .1), .04);
    person(c, 540, 1380, .85, { seed: 6, shirt: C.lav, ...idle(T), look: T > t_x ? 1 : -1, mouth: 'flat', brow: 1 });
    src(c, 'Yahoo Finance · S&P 500 · cierres del 30 oct. y del 27 nov. 2026', 1420);
  }); }

// 7 · Cierre (noche): el peor y el mejor día, pegados
if (has('cierre')) { const s = 'cierre', t_a = As(s, TK ? 'una y otra' : 'Nadie sabe'), t_j = As(s, 'llegar juntos.'), t_h = As(s, 'Haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_a + .1, 8, 'ping'); hit(t_j + .1, 14, 'stamp'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 420 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, 'LOS PEORES DÍAS Y LOS MEJORES', 540, 300, { size: 56, col: C.chalk, sh: C.goldD, clipP: pr(T, t_a - .2, .6, easeIO), max: 1000 });
    tx(c, 'SUELEN LLEGAR JUNTOS', 540, 400, { size: 64, col: C.lav, sh: null, clipP: pr(T, t_j - .3, .6, easeIO), max: 1000 });
    const g = pr(T, t_j - .2, .6, easeOutBack); cal(c, lerp(200, 420, g), 720, .9, '16–20 NOV', '−8,6 %', C.red, 6700, pb(T, sec(s).t0 + .2), -.08 + .05 * g);
    cal(c, lerp(880, 660, g), 720, .9, '23–27 NOV', '+5,6 %', GRN, 6710, pb(T, sec(s).t0 + .5), .08 - .05 * g);
    if (g >= 1) shp(c, R4(500, 600, 80, 40), '#E9D9AE', { sharp: true, w: 3, lc: C.ink, seed: 6720 });
    tx(c, 'HAZ TU CUENTA', 540, 1050, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada =================
function cover(c) { const t = As('gancho', 'mejor semana'); drawScene(c, SC[0], Math.min(t + 1.6, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('mejor-semana', cover);
