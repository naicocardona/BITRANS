// TITÁN · «El gota a gota» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js)
// Ejemplo HIPOTÉTICO visible toda la escena: $1.000.000, 30 cuotas diarias de $40.000. Usura nov 2026 28,34 % E.A. (Superfinanciera) → ≈ $21.000 en un mes.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const fmt = v => '$' + Math.round(v).toLocaleString('es-CO').replace(/,/g, '.');

// ---------- piezas ----------
function bill(c, x, y, s, rot, seed) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  shp(c, R4(-70, -36, 140, 72), '#9CC79A', { sharp: true, w: 4, lc: C.ink, seed });
  ln(c, R4(-58, -25, 116, 50).concat([[-58, -25]]), { w: 2, col: '#4E7F55', straight: true, seed: seed + 1 });
  tx(c, '$', 0, 2, { size: 40, col: '#2F5E3A', sh: null }); c.restore(); }
function drop(c, x, y, r, col, seed) { const P = []; for (let i = 0; i <= 24; i++) { const a = i / 24 * TAU, k = Math.sin(a / 2); P.push([Math.sin(a) * r * k * 1.05, -Math.cos(a) * r * 1.35 + r * .35]); }
  c.save(); c.translate(x, y); shp(c, P, col, { w: 4, lc: C.ink, seed }); c.save(); c.globalAlpha = .55; c.fillStyle = '#fff'; c.beginPath(); c.ellipse(-r * .35, r * .1, r * .14, r * .28, -.4, 0, TAU); c.fill(); c.restore(); c.restore(); }
function cedula(c, x, y, s, rot) { if (s <= 0) return; card(c, x, y, 360, 220, { sc: s, rot, band: C.navy, seed: 905, draw: cc => {
  tx(cc, 'CÉDULA', 0, -75, { size: 30, f: 'ui', col: C.gold });
  shp(cc, blob(-105, 30, 48, 56, 906, { n: 24 }), C.skin[1], { w: 3, lc: C.ink, seed: 906 });
  for (let k = 0; k < 3; k++) ln(cc, [[-30, -5 + k * 34], [140 - k * 30, -5 + k * 34]], { w: 6, col: '#8A8D9C', straight: true, seed: 907 + k }); } }); }
function moto(c, x, y, s, T, seed) { c.save(); c.translate(x, y); c.scale(s, s);
  for (const wx of [-95, 95]) { c.save(); c.translate(wx, 0); c.rotate(T * 9); shp(c, blob(0, 0, 44, 44, seed, { n: 22, amp: .02 }), C.ink, { w: 4, lc: C.ink, seed }); shp(c, blob(0, 0, 18, 18, seed + 1, { n: 14 }), '#8A8D9C', { w: 3, lc: C.ink, seed: seed + 1 }); ln(c, [[-30, 0], [30, 0]], { w: 3, col: '#8A8D9C', seed: seed + 2 }); c.restore(); }
  shp(c, [[-120, -30], [-40, -70], [60, -70], [110, -40], [95, 0], [-95, 0]], C.red, { w: 5, lc: C.ink, seed: seed + 3 });
  shp(c, [[-60, -78], [30, -78], [30, -62], [-60, -62]], C.ink, { sharp: true, w: 3, lc: C.ink, seed: seed + 4 });
  ln(c, [[95, -40], [120, -110], [150, -115]], { w: 7, col: C.ink, seed: seed + 5 });
  for (let k = 0; k < 3; k++) { const u = (T * 2.2 + k / 3) % 1; c.save(); c.globalAlpha = (1 - u) * .6; shp(c, blob(-150 - u * 120, -20 - k * 10, 16 + u * 22, 12 + u * 16, seed + 9 + k, { n: 14 }), '#C9C4B8', { line: false }); c.restore(); }
  c.restore(); }
function calendar(c, x, y, w, nOn, T, tStart, o = {}) { // 30 días, se tachan uno a uno
  const cols = 6, rows = 5, cw = w / cols, ch = cw * .78, h = rows * ch + 70;
  card(c, x, y, w + 30, h + 20, { band: C.red, seed: 911, draw: cc => {
    tx(cc, o.title || '30 CUOTAS DIARIAS', 0, -h / 2 + 12, { size: 30, f: 'ui', col: C.paper });
    for (let k = 0; k < 30; k++) { const cx = -w / 2 + (k % cols + .5) * cw, cy = -h / 2 + 70 + (Math.floor(k / cols) + .5) * ch;
      tx(cc, String(k + 1), cx, cy, { size: 30, f: 'ui', col: '#5C6075' });
      if (k < nOn) { const p = cl01((T - (tStart + k * (o.step ?? .1))) / .15); ln(cc, [[cx - cw * .3, cy - ch * .3], [cx + cw * .3, cy + ch * .3]], { w: 6, col: C.red, p, seed: 920 + k }); ln(cc, [[cx + cw * .3, cy - ch * .3], [cx - cw * .3, cy + ch * .3]], { w: 6, col: C.red, p, seed: 960 + k }); } } } }); }
function hipo(c, y = 175) { tag(c, 'EJEMPLO HIPOTÉTICO', 540, y, { size: 30, bg: C.gold }); }

// ================= escenas =================
// 1 · Gancho: titular desde el primer cuadro, dinero que llega "sin papeles" y gotas que empiezan a caer
{ const s = 'gancho', t_sp = As(s, 'sin papeles'), t_pq = As(s, 'sin preguntas.'), t_m = As(s, 'Ahora mira'), t_c = As(s, 'cuánto te cuesta.');
  hit(t_sp, 6, 'ping'); hit(t_pq, 6, 'ping'); hit(t_m + .1, 8, 'stamp'); hit(t_c + .3, 12, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 940], [t_c, 940], [t_c + .6, 900]]), key(T, [[0, 1.0], [t_c, 1.0], [t_c + .6, 1.06]]) + .012 * Math.sin(L * 1.4));
    tx(c, '$1 MILLÓN', 540, 225, { size: 120, col: C.gold, sh: C.ink, sc: 1 + settle(T, .05, { amp: .12, freq: 3, decay: 5 }) });
    tx(c, 'SIN PAPELES NI PREGUNTAS', 540, 345, { size: 60, col: C.ink, max: 980 });
    // gotas rojas que caen (el nombre del préstamo): una cada medio segundo
    for (let k = 0; k < 6; k++) { const u = ((T * .9 + k / 6) % 1); drop(c, 160 + (k * 173) % 760, 420 + u * 520, 22, k % 2 ? C.red : C.gold, 930 + k); }
    // billetes que vuelan del prestamista a la persona
    for (let k = 0; k < 5; k++) { const u = pr(T, .2 + k * .18, .7, easeOutQuint); if (u > 0) bill(c, lerp(760, 330, u), 1080 - Math.sin(u * Math.PI) * 160 + k * 12, .9, (k - 2) * .15 + u * .4, 940 + k * 3); }
    person(c, 820, 1440, 1.0, { seed: 7, shirt: C.navy, flip: true, ...idle(T, 1), mouth: 'grin', armR: [1.3, .2], look: -1 });
    tag(c, 'PRESTAMISTA', 820, 1490, { size: 26, bg: C.paper });
    person(c, 260, 1440, 1.0, { seed: 2, shirt: C.gold, ...idle(T), mouth: T > t_c ? 'o' : 'grin', brow: T > t_c ? 1 : 0, sweat: T > t_c ? T : 0, armR: [1.35, .1], look: 1, jump: T < t_m ? Math.abs(Math.sin(T * 5)) * 14 : 0 });
    stamp(c, '¿CUÁNTO CUESTA?', 540, 760, T, t_m + .1, { size: 70, col: C.red });
  }); }

// 2 · TikTok · Cómo funciona: cédula, sin historial, cobrador en moto todos los días
if (TK) { const s = 'como', t_ga = As(s, 'el gota a gota:'), t_ce = As(s, 'tu cédula,'), t_hi = As(s, 'no revisan tu historial,'), t_mo = As(s, 'un cobrador pasa'), t_td = As(s, 'todos los días.');
  hit(t_ga + .1, 6, 'stamp'); hit(t_ce + .1, 8, 'ping'); hit(t_hi + .4, 10, 'stamp'); hit(t_mo + .2, 8); hit(t_td + .1, 12, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, key(T, [[0, 540], [t_mo, 540], [t_mo + .6, 560]]), key(T, [[0, 900], [t_mo, 900], [t_mo + .6, 980]]), key(T, [[0, 1.0], [t_mo, 1.0], [t_mo + .6, 1.05]]) + .01 * Math.sin(L));
    tx(c, 'ASÍ FUNCIONA', 540, 210, { size: 80, col: C.ink, clipP: pr(T, sec(s).t0 - .2, .6, easeIO) });
    pill(c, 'GOTA A GOTA', 540, 320, { size: 56, sc: pb(T, t_ga) });
    cedula(c, 290, 560, pb(T, Math.min(t_ce - .1, sec(s).t0 + .3)), -.05);
    tag(c, 'SOLO PIDEN ESTO', 290, 700, { size: 26, bg: C.paper, sc: pb(T, t_ce + .2) });
    const kh = pb(T, Math.min(t_hi - .1, sec(s).t0 + .6)); if (kh > 0) { card(c, 790, 560, 330, 220, { sc: kh, rot: .04, seed: 913, draw: cc => { tx(cc, 'HISTORIAL', 0, -70, { size: 32, f: 'ui' }); for (let k = 0; k < 3; k++) ln(cc, [[-120, -15 + k * 40], [120, -15 + k * 40]], { w: 6, col: '#8A8D9C', straight: true, seed: 914 + k }); } });
      const p = pr(T, t_hi + .3, .35); ln(c, [[640, 440], [940, 680]], { w: 14, col: C.red, p, seed: 917 }); ln(c, [[940, 440], [640, 680]], { w: 14, col: C.red, p: pr(T, t_hi + .45, .35), seed: 918 }); }
    const mx = lerp(-300, 560, pr(T, t_mo - .2, 1.4, easeOutQuint)) + (T > t_mo + 1.2 ? Math.sin(T * 6) * 6 : 0);
    person(c, mx - 15, 1455, .8, { seed: 9, shirt: C.navy, ...idle(T, 2), armR: [1.75, .5], armL: [1.6, .4], look: 1, mouth: 'flat' }); moto(c, mx, 1420, 1.1, T, 950);
    stamp(c, 'TODOS LOS DÍAS', 540, 860, T, t_td, { size: 66, col: C.red, rot: .04 });
  }); }

// 3 · El cobro: 30 cuotas de $40.000 que se tachan; el contador sube hasta $1.200.000
{ const s = 'cobro', t_e = As(s, 'Ejemplo hipotético:'), t_40 = As(s, 'cuarenta mil pesos'), t_30 = As(s, 'treinta días.'), t_fm = As(s, 'Al final del mes'), t_12 = As(s, 'un millón doscientos mil.');
  hit(t_e + .1, 6, 'ping'); hit(t_40 + .1, 8, 'stamp'); hit(t_30 + .1, 6, 'ping'); hit(t_12 + .1, 14, 'stamp');
  const tS = t_30 - .2, step = Math.max(.04, (t_12 - tS) / 30);
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 900], [t_12, 900], [t_12 + .5, 820]]), key(T, [[0, 1.0], [t_12, 1.0], [t_12 + .5, 1.06]]) + .012 * Math.sin(L));
    hipo(c);
    pill(c, '$40.000', 540, 310, { size: 80, sc: pb(T, t_40), top: 'CADA DÍA' });
    const nOn = T < tS ? 0 : Math.min(30, Math.floor((T - tS) / step) + 1);
    calendar(c, 540, 700, 640, nOn, T, tS, { step });
    for (let k = 0; k < Math.min(nOn, 8); k++) { const u = ((T - tS - k * step) * 1.3) % 1; if (T > tS + k * step) drop(c, 200 + k * 90, 470 + u * 520, 14, C.red, 970 + k); }
    const v = nOn * 40000; card(c, 540, 1220, 700, 200, { band: C.navy, seed: 980, sc: pb(T, t_30 - .3), draw: cc => {
      tx(cc, 'TOTAL QUE PAGAS', 0, -66, { size: 30, f: 'ui', col: C.gold });
      tx(cc, fmt(v), 0, 30, { size: 92, col: T > t_12 ? C.red : C.ink, sh: C.gold, sc: T > t_12 ? 1 + settle(T, t_12, { amp: .14, freq: 3, decay: 5 }) : 1 }); } });
    person(c, 990, 1420, .62, { seed: 2, shirt: C.gold, flip: true, ...idle(T), mouth: T > t_12 ? 'o' : 'flat', sweat: T > t_fm ? T : 0, brow: 1, look: -1 });
    burst(c, 540, 1220, T, t_12 + .1, { R: 300, col: C.red });
    tx(c, 'Te prestaron $1.000.000', 470, 1410, { size: 50, f: 'hand', col: C.goldD, al: pr(T, t_fm, .4) });
  }); }

// 4 · La usura: $200.000 vs ≈ $21.000 (máximo legal en un mes, usura nov 2026)
{ const s = 'usura', t_2 = As(s, 'doscientos mil pesos'), t_u = TK ? As(s, 'la tasa de usura') : As(s, 'la tasa de usura'), t_pct = TK ? As(s, 'veintiocho coma treinta') : null, t_ml = As(s, 'lo máximo legal'), t_21 = As(s, 'veintiún mil'),
    t_10 = TK ? As(s, 'casi diez veces más.') : As(s, 'Casi diez veces menos.');
  hit(t_2 + .1, 10, 'stamp'); hit(t_u + .1, 6, 'ping'); if (t_pct) hit(t_pct + .2, 8, 'stamp'); hit(t_21 + .1, 8, 'ping'); hit(t_10 + .2, 16, 'stamp');
  const Z = 1300, K = 700, hG = K, hL = K * 21010 / 200000;
  scene(s, 'news', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 900, key(T, [[0, 1.0], [t_10, 1.0], [t_10 + .4, 1.05]]) + .012 * Math.sin(L * 1.2));
    hipo(c, 165);
    tx(c, 'INTERESES DE UN MES', 540, 260, { size: 58, col: C.ink, clipP: pr(T, sec(s).t0 - .2, .6, easeIO) });
    if (t_pct) pill(c, 'USURA NOV. 2026: 28,34 % E.A.', 540, 370, { size: 40, f: 'ui', sc: pb(T, t_pct) });
    else tag(c, 'TOPE LEGAL: TASA DE USURA DE NOVIEMBRE', 540, 370, { size: 30, bg: C.paper, sc: pb(T, t_u) });
    ln(c, [[120, Z], [960, Z]], { w: 7, straight: true, seed: 985 });
    const gG = pr(T, t_2, .8, easeOutBack), gL = pr(T, t_21 - .1, .7, easeOutBack);
    c.save(); c.setLineDash([14, 10]); c.strokeStyle = C.ink; c.globalAlpha = .3; c.lineWidth = 4; c.strokeRect(220, Z - hG, 240, hG); c.strokeRect(620, Z - hL, 240, hL); c.restore();
    if (gG > .01) shp(c, R4(220, Z - hG * gG, 240, hG * gG), C.red, { sharp: true, w: 5, lc: C.ink, seed: 986, hatch: shade(C.red, .6), hal: .35 });
    if (gL > .01) shp(c, R4(620, Z - hL * gL, 240, hL * gL), C.gold, { sharp: true, w: 5, lc: C.ink, seed: 987, hatch: C.goldD, hal: .4 });
    pill(c, '$200.000', 340, Z - hG - 70, { size: 60, sc: pb(T, t_2 + .3), col: '#FFB4A6' });
    pill(c, '≈ $21.000', 740, Z - hL - 70, { size: 60, sc: pb(T, t_21 + .2) });
    tx(c, 'GOTA A GOTA', 340, Z + 50, { size: 34, f: 'ui', al: pr(T, t_2, .3) }); tx(c, 'MÁXIMO LEGAL', 740, Z + 50, { size: 34, f: 'ui', al: pr(T, t_ml, .3) });
    stamp(c, TK ? 'CASI 10 VECES MÁS' : 'CASI 10 VECES MENOS', 680, 760, T, t_10, { size: 60, col: C.red, rot: .05 });
    tx(c, 'Usura: Superfinanciera · nov. 2026 · ejemplo con $1.000.000', 540, 1440, { size: 26, f: 'ui', al: .85 });
    burst(c, 340, Z - hG, T, t_2 + .4, { R: 220, col: C.red });
  }); }

// 5 · La bola: si la deuda sube 20 % cada mes, 12 meses → $8.916.100 (hipotético)
{ const s = 'bola', t_20 = As(s, 'veinte por ciento'), t_12 = As(s, 'a los doce meses'), t_9 = As(s, 'casi nueve millones.'), t_ren = TK ? As(s, 'y renuevas,') : null, t_cr = TK ? As(s, 'el problema crece.') : null;
  if (t_ren) { hit(t_ren + .1, 6, 'ping'); hit(t_cr + .1, 8, 'stamp'); } hit(t_20 + .1, 8, 'stamp'); hit(t_12 + .1, 6, 'ping'); hit(t_9 + .1, 18, 'stamp');
  const tG = t_20 + .4, tE = t_9, Z = 1250;
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 900], [t_9, 900], [t_9 + .5, 860]]), key(T, [[0, 1.0], [t_9, 1.0], [t_9 + .5, 1.07]]) + .012 * Math.sin(L));
    tag(c, 'HIPOTÉTICO: LA DEUDA SUBE 20 % CADA MES', 540, 175, { size: 30, bg: C.gold });
    if (TK) { stamp(c, 'NO PAGASTE UN DÍA', 540, 300, T, sec(s).t0 + .2, { size: 50, col: C.ink, rot: -.03 }); }
    const m = T < tG ? 0 : Math.min(12, Math.floor((T - tG) / ((tE - tG) / 12)) + 1);
    ln(c, [[100, Z], [980, Z]], { w: 6, straight: true, seed: 990 });
    for (let k = 0; k < 12; k++) { const v = Math.pow(1.2, k + 1), h = 600 * v / 8.916, x = 300 + k * 56; if (k >= m) { c.save(); c.globalAlpha = .18; c.fillStyle = C.ink; c.fillRect(x, Z - 6, 44, 6); c.restore(); continue; }
      const g = pr(T, tG + k * (tE - tG) / 12, .35, easeOutBack); shp(c, R4(x, Z - h * g, 44, h * g), k === 11 ? C.red : C.gold, { sharp: true, w: 4, lc: C.ink, seed: 991 + k });
      tx(c, String(k + 1), x + 22, Z + 30, { size: 24, f: 'ui' }); }
    const v = 1e6 * Math.pow(1.2, m); pill(c, fmt(v), 540, 470, { size: 74, sc: pb(T, sec(s).t0 - .2), top: m ? `MES ${m}` : 'HOY', col: m === 12 ? '#FFB4A6' : C.gold });
    // bola de deuda que rueda y crece
    const R = 34 + 40 * (m / 12), mi = Math.max(0, m - 1), bx = 300 + mi * 56 + 22, by = Z - (m ? 600 * Math.pow(1.2, m) / 8.916 : 0) - R - 6; c.save(); c.translate(bx, by); c.rotate(T * 3); shp(c, blob(0, 0, R, R, 999, { n: 30, amp: .06 }), C.navy, { w: 5, lc: C.ink, seed: 999 }); tx(c, '$', 0, 4, { size: R, col: C.gold, sh: null }); c.restore();
    tx(c, 'meses', 630, Z + 70, { size: 30, f: 'hand', col: C.goldD });
    stamp(c, '¡CASI $9 MILLONES!', 540, 600, T, t_9 + .1, { size: 64, col: C.red, rot: .04 });
    person(c, 160, Z, .8, { seed: 2, shirt: C.gold, ...idle(T), mouth: m > 6 ? 'o' : 'flat', sweat: m > 6 ? T : 0, brow: 1, look: 1, armR: m > 9 ? [2.6, .3] : [.3, .2], armL: m > 9 ? [2.6, .3] : [.22, .12], jump: m === 12 ? Math.abs(Math.sin(T * 6)) * 10 : 0 });
  }); }

// 6 · TikTok · Qué hacer: opciones con tope legal, delito y GAULA 165
if (TK) { const s = 'salida', t_q = As(s, '¿Qué hacer?'), t_co = As(s, 'compara:'), t_b = As(s, 'bancos,'), t_c = As(s, 'cooperativas'), t_mi = As(s, 'y microcréditos'), t_tl = As(s, 'tope legal.'), t_d = As(s, 'es delito,'), t_g = As(s, 'al GAULA,'), t_165 = As(s, 'ciento sesenta y cinco.');
  hit(t_q + .1, 6, 'ping'); hit(t_b, 6, 'ping'); hit(t_c, 6, 'ping'); hit(t_mi + .1, 6, 'ping'); hit(t_tl + .1, 10, 'stamp'); hit(t_d + .1, 12, 'stamp'); hit(t_g + .1, 8, 'ping'); hit(t_165 + .1, 14, 'stamp');
  const fade = T => 1 - pr(T, t_d - .4, .4);
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, 1.0 + .012 * Math.sin(L));
    tx(c, '¿QUÉ HACER?', 540, 220, { size: 96, col: C.ink, sc: pb(T, t_q - .1) });
    const f = fade(T); if (f > 0) { c.save(); c.globalAlpha = f;
      tx(c, 'Antes de pedir, compara', 540, 330, { size: 52, f: 'hand', col: C.goldD, clipP: pr(T, t_co - .3, .5) });
      [['BANCOS', t_b, 420], ['COOPERATIVAS', t_c, 600], ['MICROCRÉDITOS', t_mi, 780]].forEach(([l, t, y], k) => { pill(c, l, 470, y, { size: 52, f: 'ui', sc: pb(T, t) });
        if (T > t_tl) { const p = pr(T, t_tl + k * .12, .3); ln(c, [[800, y], [830, y + 30], [880, y - 30]], { w: 12, col: C.green, p, seed: 1001 + k }); } });
      tag(c, 'TIENEN TOPE LEGAL (TASA DE USURA)', 540, 920, { size: 32, bg: C.gold, sc: pb(T, t_tl) }); c.restore(); }
    const kd = pr(T, t_d - .3, .4); if (kd > 0) { card(c, 540, 600, 820, 330, { sc: kd, band: C.red, seed: 1010, draw: cc => {
      tx(cc, 'COBRAR POR ENCIMA DE LA USURA', 0, -130, { size: 34, f: 'ui', col: C.paper });
      tx(cc, 'ES DELITO', 0, -10, { size: 100, col: C.red, sh: C.ink });
      tx(cc, 'Código Penal, artículo 305', 0, 100, { size: 34, f: 'ui', col: '#5C6075' }); } }); }
    const kg = pb(T, t_g - .1); if (kg > 0) { c.save(); c.translate(540, 1110); c.scale(kg, kg); shp(c, R4(-130, -150, 260, 300), C.navy, { w: 5, lc: C.ink, seed: 1020 }); shp(c, R4(-105, -115, 210, 200), '#2A3150', { sharp: true, w: 3, lc: C.gold, seed: 1021 });
      tx(c, 'GAULA', 0, -60, { size: 40, f: 'ui', col: C.gold }); tx(c, '165', 0, 20, { size: 90, col: C.paper, sh: C.goldD, sc: T > t_165 ? 1 + settle(T, t_165, { amp: .15, freq: 3, decay: 5 }) : 1 }); c.restore();
      lines(c, 540, 1110, T, t_165 + .1, { r: 170, col: C.gold }); }
    tx(c, 'Amenazas y extorsión: denuncia gratis', 540, 1330, { size: 36, f: 'hand', col: C.goldD, al: pr(T, t_g, .4) });
    person(c, 190, 1500, .78, { seed: 4, shirt: C.gold, ...idle(T), look: 1, mouth: 'smile', armR: T > t_g ? [1.1, 1.3] : [.2, .1] });
  }); }

// 7 · Cierre (noche): Short = delito + GAULA 165; TikTok = la plata fácil casi nunca sale barata. Aviso y firma.
{ const s = 'cierre', t_end = DD.words[DD.words.length - 1][2];
  const t_d = TK ? null : As(s, 'es delito'), t_g = TK ? null : As(s, 'al GAULA'), t_165 = TK ? null : As(s, 'ciento sesenta y cinco.'), t_f = TK ? As(s, 'La plata fácil') : null, t_b = TK ? As(s, 'sale barata.') : null, t_cp = TK ? As(s, 'Comparte este video') : null;
  if (TK) { hit(t_f + .1, 8, 'ping'); hit(t_b + .1, 14, 'stamp'); hit(t_cp + .1, 6, 'ping'); } else { hit(t_d + .1, 12, 'stamp'); hit(t_g + .1, 8, 'ping'); hit(t_165 + .1, 14, 'stamp'); } sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 7; k++) { const u = ((T * .5 + k / 7) % 1); c.save(); c.globalAlpha = .5; drop(c, 110 + (k * 151) % 860, 120 + u * 1300, 14, k % 2 ? C.red : C.gold, 1030 + k); c.restore(); }
    if (TK) {
      tx(c, 'LA PLATA FÁCIL', 540, 420, { size: 96, col: C.chalk, sh: C.goldD, clipP: pr(T, t_f, .6, easeIO), max: 1000 });
      tx(c, 'CASI NUNCA', 540, 545, { size: 96, col: C.chalk, sh: C.goldD, clipP: pr(T, t_f + .5, .6, easeIO) });
      tx(c, 'SALE BARATA', 540, 670, { size: 110, col: C.gold, sh: null, sc: pb(T, t_b) });
      pill(c, 'GAULA · LÍNEA 165', 540, 900, { size: 50, f: 'ui', sc: pb(T, t_f + .3), bg: '#232845' });
      stamp(c, 'COMPÁRTELO', 540, 1080, T, t_cp, { size: 60, bg: C.navy, rot: -.04 });
      const kp = 1 - pr(T, t_end, .4); if (kp > 0) { c.save(); c.globalAlpha = kp; person(c, 180, 1330, .62, { seed: 4, shirt: C.gold, ...idle(T), look: 1, mouth: 'smile', armR: T > t_cp ? [1.2, 1.2] : [.2, .1] }); person(c, 900, 1330, .62, { seed: 6, shirt: C.lav, flip: true, ...idle(T, 1), look: -1, mouth: T > t_cp ? 'grin' : 'smile' }); c.restore(); }
    } else {
      card(c, 540, 470, 820, 300, { sc: pb(T, SEC[s].t0 - .3), band: C.red, seed: 1040, draw: cc => { tx(cc, 'COBRAR POR ENCIMA DE LA USURA', 0, -115, { size: 34, f: 'ui', col: C.paper }); tx(cc, 'ES DELITO', 0, 0, { size: 100, col: C.red, sh: C.ink }); tx(cc, 'Código Penal, artículo 305', 0, 95, { size: 32, f: 'ui', col: '#5C6075' }); } });
      tx(c, 'SI TE AMENAZAN, DENUNCIA', 540, 760, { size: 54, col: C.chalk, sh: C.goldD, clipP: pr(T, t_g - .9, .6, easeIO), max: 980 });
      pill(c, 'GAULA · LÍNEA 165', 540, 900, { size: 64, f: 'ui', sc: pb(T, t_g) * (T > t_165 ? 1 + settle(T, t_165, { amp: .12, freq: 3, decay: 5 }) : 1) });
      lines(c, 540, 900, T, t_165 + .1, { r: 260, col: C.gold });
    }
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1420, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1490, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada =================
function cover(c) { drawScene(c, SC[0], 1.4); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('gota-a-gota', cover);
