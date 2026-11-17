// TITÁN · «La portada de The Economist 2027… ¿qué tiene que ver con tu plata?» · Short (sh) y TikTok (tk) · kit híbrido
// No se muestra la portada real (derechos) ni personas reales: una «portada» propia ilustrada que se arma y la cámara entra a cada símbolo.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const YOU = C.gold;

// ---------- piezas ----------
function tank(c, x, y, s, seed, col = '#4B5A3A') { c.save(); c.translate(x, y); c.scale(s, s);
  shp(c, R4(-110, -20, 220, 50), col, { w: 4, lc: C.ink, seed }); shp(c, R4(-60, -60, 110, 44), col, { w: 4, lc: C.ink, seed: seed + 1 }); ln(c, [[40, -40], [150, -52]], { w: 10, seed: seed + 2 });
  for (let k = 0; k < 5; k++) { c.fillStyle = C.ink; c.beginPath(); c.arc(-80 + k * 40, 34, 13, 0, TAU); c.fill(); } c.restore(); }
function missile(c, x, y, s, rot, seed) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  shp(c, [[-80, -14], [60, -14], [100, 0], [60, 14], [-80, 14]], C.paper, { w: 4, lc: C.ink, seed }); shp(c, [[-80, -14], [-100, -34], [-60, -14]], C.red, { w: 3, lc: C.ink, seed: seed + 1 }); shp(c, [[-80, 14], [-100, 34], [-60, 14]], C.red, { w: 3, lc: C.ink, seed: seed + 2 });
  c.restore(); }
function fallChart(c, x, y, w, h, p, seed) { const N = 14, P = []; for (let i = 0; i <= N; i++) P.push([x + w * i / N, y + h * (i / N) * .8 + Math.sin(i * 2.3 + seed) * h * .12]);
  const m = Math.max(2, Math.ceil(P.length * cl01(p))); ln(c, P.slice(0, m), { w: 8, col: C.red, seed, straight: true }); if (p >= .99) arrow(c, P[N - 1], [P[N][0] + 10, P[N][1] + 20], 1, { col: C.red, bend: 0, w: 8 }); }
function columns(c, x, y, s, seed) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, [[-220, -260], [220, -260], [0, -360]], C.paper, { w: 5, lc: C.ink, seed });
  shp(c, R4(-230, -262, 460, 30), C.paper, { sharp: true, w: 5, lc: C.ink, seed: seed + 1 }); for (let k = 0; k < 5; k++) shp(c, R4(-190 + k * 85, -230, 40, 230), C.paper, { sharp: true, w: 4, lc: C.ink, seed: seed + 2 + k });
  shp(c, R4(-240, 0, 480, 30), C.paper, { sharp: true, w: 5, lc: C.ink, seed: seed + 9 }); c.restore(); }
function brain(c, x, y, s, T, seed) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, blob(0, 0, 170, 130, seed, { n: 40, amp: .08 }), '#D86A7A', { w: 6, lc: C.ink, seed });
  for (let k = 0; k < 7; k++) { const a = k * .9, r = 40 + (k % 3) * 35; ln(c, [[Math.cos(a) * 20, Math.sin(a) * 15], [Math.cos(a) * r, Math.sin(a) * r * .7], [Math.cos(a + .3) * (r + 30), Math.sin(a + .3) * (r + 30) * .7]], { w: 4, col: C.ink, seed: seed + k, straight: true });
    c.save(); c.globalAlpha = .5 + .5 * Math.sin(T * 6 + k); c.fillStyle = C.goldL; c.beginPath(); c.arc(Math.cos(a + .3) * (r + 30), Math.sin(a + .3) * (r + 30) * .7, 9, 0, TAU); c.fill(); c.restore(); } c.restore(); }
function rack(c, x, y, s, T, seed) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, R4(-60, -200, 120, 400), C.ink, { sharp: true, w: 4, lc: C.ink, seed });
  for (let k = 0; k < 9; k++) { c.fillStyle = Math.sin(T * 8 + k * 1.7 + seed) > 0 ? C.green : '#2A3150'; c.fillRect(-40, -180 + k * 42, 14, 10); c.fillStyle = '#3B4466'; c.fillRect(-18, -182 + k * 42, 60, 14); } c.restore(); }
function ship(c, x, y, s, T, seed) { c.save(); c.translate(x, y + Math.sin(T * 1.6) * 6); c.rotate(Math.sin(T * 1.3) * .02); c.scale(s, s);
  shp(c, [[-260, 0], [240, 0], [200, 80], [-230, 80]], C.red, { w: 5, lc: C.ink, seed }); shp(c, R4(-200, -60, 330, 60), '#3B4466', { sharp: true, w: 4, lc: C.ink, seed: seed + 1 });
  shp(c, R4(150, -120, 70, 120), C.paper, { sharp: true, w: 4, lc: C.ink, seed: seed + 2 }); for (let k = 0; k < 4; k++) shp(c, blob(-150 + k * 80, -60, 30, 22, seed + 3 + k, { n: 16 }), '#2A3150', { w: 3, lc: C.ink, seed: seed + 3 + k }); c.restore(); }
function sea(c, y, T) { c.save(); c.fillStyle = '#7FB5E8'; c.globalAlpha = .55; c.fillRect(-100, y, 1300, 400); c.restore(); for (let k = 0; k < 6; k++) { const yy = y + 30 + k * 50, o = (T * 40 + k * 70) % 160; ln(c, [[-100 + o, yy], [1200 + o, yy + 4]], { w: 3, col: '#FFFFFF', al: .5, seed: 6200 + k, straight: true }); } }
function barrel(c, x, y, s, seed) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, R4(-50, -70, 100, 140), C.ink, { w: 4, lc: C.ink, seed }); ln(c, [[-50, -25], [50, -25]], { w: 4, col: C.goldD, seed: seed + 1 }); ln(c, [[-50, 25], [50, 25]], { w: 4, col: C.goldD, seed: seed + 2 }); tx(c, 'OIL', 0, 2, { size: 26, f: 'ui', col: C.goldL }); c.restore(); }
function pillBottle(c, x, y, s, seed) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, R4(-80, -120, 160, 220), '#E8913A', { w: 5, lc: C.ink, seed }); shp(c, R4(-90, -160, 180, 50), C.paper, { sharp: true, w: 5, lc: C.ink, seed: seed + 1 });
  shp(c, R4(-70, -60, 140, 90), C.paper, { sharp: true, w: 3, lc: C.ink, seed: seed + 2 }); tx(c, 'GLP-1', 0, -16, { size: 34, f: 'ui' }); c.restore(); }
function bag(c, x, y, s, col, lab, seed) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, [[-70, -80], [70, -80], [85, 90], [-85, 90]], col, { w: 5, lc: C.ink, seed }); ln(c, [[-35, -80], [-30, -130], [30, -130], [35, -80]], { w: 6, seed: seed + 1 }); tx(c, lab, 0, 10, { size: 22, f: 'ui', col: C.paper, max: 150 }); c.restore(); }
function rocket(c, x, y, s, T, seed) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, [[0, -170], [40, -90], [40, 80], [-40, 80], [-40, -90]], C.paper, { w: 5, lc: C.ink, seed });
  shp(c, [[-40, 40], [-80, 100], [-40, 80]], C.red, { w: 4, lc: C.ink, seed: seed + 1 }); shp(c, [[40, 40], [80, 100], [40, 80]], C.red, { w: 4, lc: C.ink, seed: seed + 2 });
  const f = 60 + 25 * Math.sin(T * 20); shp(c, [[-28, 82], [28, 82], [0, 82 + f]], C.gold, { w: 3, lc: C.goldD, seed: seed + 3 }); c.restore(); }
function hipo(c, y = 330) { tag(c, 'SEGÚN THE ECONOMIST · THE WORLD AHEAD 2027', 540, y, { size: 24, bg: C.paper }); }

// ================= escenas =================
// 1 · Gancho: una «portada» propia que se arma con tanques, misiles y gráficas; luego «¿y tu plata?»
if (has('gancho')) { const s = 'gancho', t_t = As(s, 'Tanques,'), t_m = As(s, 'misiles'), t_g = As(s, 'gráficas cayendo.'), t_p = As(s, 'Pero la pregunta'), t_pl = As(s, 'con tu plata?');
  hit(.05, 10, 'stamp'); hit(t_t + .1, 10, 'impact'); hit(t_m + .1, 10, 'impact'); hit(t_g + .1, 12, 'impact'); hit(t_pl + .1, 16, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); const zo = pr(T, t_p, 1.0, easeIO); camS(c, T, 540, 900 + zo * 80, 1.0 - .08 * zo + .012 * Math.sin(L * 1.3));
    tx(c, 'LA PORTADA DE 2027', 540, 190, { size: 82, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tag(c, 'THE ECONOMIST · ACABA DE SALIR', 540, 285, { size: 30, bg: C.red, col: C.paper });
    // marco de «revista» propio
    shp(c, R4(140, 360, 800, 1000), C.paper, { sharp: true, w: 7, lc: C.ink, seed: 6001 }); shp(c, R4(140, 360, 800, 90), C.red, { sharp: true, w: 7, lc: C.ink, seed: 6002 }); tx(c, 'EL MUNDO EN 2027', 540, 405, { size: 50, col: C.paper, sh: null });
    c.save(); c.beginPath(); c.rect(146, 456, 788, 898); c.clip();
    const kt = pb(T, Math.min(t_t - .1, .2)); if (kt > 0) { tank(c, 330, 1180, .95 * kt, 6010); tank(c, 700, 1240, .8 * kt, 6020, '#3B4A2E'); }
    if (T > Math.min(t_m - .1, .7)) { const u = pr(T, Math.min(t_m - .1, .7), 1.2, t => t); missile(c, lerp(120, 760, u), lerp(900, 560, u), .9, -.5, 6030); missile(c, lerp(980, 380, u), lerp(980, 640, u), .7, Math.PI + .45, 6040); }
    if (T > Math.min(t_g - .1, 1.2)) fallChart(c, 220, 520, 620, 300, pr(T, Math.min(t_g - .1, 1.2), .8, t => t), 6050);
    c.restore();
    if (T > t_p) { person(c, 540, 1520, .7 * pb(T, t_p), { seed: 5, shirt: YOU, ...idle(T), look: 0, mouth: 'o', brow: 1 }); }
    stamp(c, '¿Y TU PLATA?', 540, 870, T, t_pl, { size: 92, col: C.goldD, rot: -.05 });
  }); }

// 2 · La deuda de los gobiernos ricos (TikTok) / «riesgos» deuda + IA (Short)
function deudaScene(s, tr) { const t_g = TK ? As(s, 'los gobiernos de los países ricos') : As(s, 'Los gobiernos ricos'), t_c = TK ? As(s, 'más caro') : As(s, 'más caro'),
    t_t = TK ? As(s, 'las tasas de interés,') : null, t_cr = TK ? As(s, 'los créditos') : null, t_a = TK ? As(s, 'precio de las acciones.') : null, t_ia = TK ? null : As(s, 'las empresas de inteligencia artificial'), t_co = TK ? null : As(s, 'corrección fuerte');
  hit(t_g + .1, 8, 'ping'); hit(t_c + .1, 14, 'stamp'); [t_t, t_cr, t_a, t_ia].forEach(t => { if (t) hit(t + .1, 8, 'ping'); }); if (t_co) hit(t_co + .1, 16, 'impact');
  scene(s, tr, (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, TK ? '1 · LA DEUDA' : 'DOS RIESGOS PARA QUIEN INVIERTE', 540, 200, { size: TK ? 92 : 60, col: C.ink, sc: pb(T, sec(s).t0 - .2), max: 1000 }); hipo(c, 290);
    const half = !TK && T > t_ia - .2;
    c.save(); if (half) { c.translate(-220 * pr(T, t_ia - .2, .6, easeIO), 0); }
    columns(c, 540, 900, 1.05, 6100); tx(c, 'GOBIERNOS RICOS', 540, 960, { size: 34, f: 'ui', al: pr(T, t_g, .4) });
    // la deuda sube: billetes que se apilan sobre el edificio
    const n = Math.floor(pr(T, t_g, 3.5, t => t) * 18); for (let k = 0; k < n; k++) shp(c, R4(380 + (k % 3) * 110, 520 - Math.floor(k / 3) * 26, 100, 22), '#7DBE8E', { sharp: true, w: 3, lc: C.ink, seed: 6110 + k });
    if (T > t_c) pill(c, 'ENDEUDARSE CUESTA MÁS ↑', 540, 1090, { size: half ? 30 : 40, f: 'ui', sc: pb(T, t_c + .1), col: '#FFB4A6' }); c.restore();
    if (TK) { [[t_t, 'TASAS DE INTERÉS', 220], [t_cr, 'CRÉDITOS', 540], [t_a, 'ACCIONES', 860]].forEach(([t, lab, x], k) => { if (T < t) return; const kk = pb(T, t); tag(c, lab, x, 1250, { size: 30, bg: C.goldL, sc: kk }); arrow(c, [x, 1180], [x, 1120], pr(T, t, .4), { bend: 0, col: C.red, seed: 6130 + k }); }); }
    if (half) { const k = pb(T, t_ia); brain(c, 820, 700, .75 * k, T, 6140); tag(c, 'IA ENDEUDADA', 820, 880, { size: 30, bg: C.goldL, sc: k }); if (t_co && T > t_co) { fallChart(c, 680, 980, 280, 200, pr(T, t_co, .6, t => t), 6150); stamp(c, 'CORRECCIÓN', 820, 1290, T, t_co + .2, { size: 50, col: C.red, rot: -.04 }); } }
  }); }
if (has('deuda')) deudaScene('deuda', 'whip');
if (has('riesgos')) deudaScene('riesgos', 'whip');

// 3 · TikTok · La IA: cerebro de circuitos, servidores y deuda → riesgo de corrección
if (has('ia')) { const s = 'ia', t_e = As(s, 'se están endeudando'), t_r = As(s, 'la revista advierte'), t_co = As(s, 'corrección fuerte');
  hit(sec(s).t0 + .3, 8, 'ping'); hit(t_e + .1, 12, 'stamp'); hit(t_r + .1, 8, 'ping'); hit(t_co + .1, 16, 'impact');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_co, 1.0], [t_co + .5, 1.06]]) + .012 * Math.sin(L));
    tx(c, '2 · LA INTELIGENCIA ARTIFICIAL', 540, 200, { size: 60, col: C.chalk, sh: C.goldD, sc: pb(T, sec(s).t0 - .2), max: 1000 });
    for (let k = 0; k < 4; k++) rack(c, 150 + k * 260, 1150, .9, T, 6200 + k * 10);
    brain(c, 540, 620, 1.1 * pb(T, sec(s).t0), T, 6250);
    if (T > t_e) { const n = Math.floor(pr(T, t_e, 2.5, t => t) * 10); for (let k = 0; k < n; k++) tag(c, 'DEUDA', 150 + (k % 5) * 195, 860 + Math.floor(k / 5) * 60, { size: 24, bg: '#FFD9D1', rot: (k % 2 ? .06 : -.06) }); }
    if (T > t_co) { fallChart(c, 260, 360, 560, 260, pr(T, t_co, .7, t => t), 6260); stamp(c, 'RIESGO DE CORRECCIÓN EN LA BOLSA', 540, 1440, T, t_co + .3, { size: 42, col: C.red, rot: -.03 }); }
  }, true); }

// 4 · TikTok · Irán: barco de petróleo, energía y fertilizantes → «sube casi todo»
if (has('iran')) { const s = 'iran', t_e = As(s, 'la energía'), t_f = As(s, 'los fertilizantes.'), t_s = As(s, 'sube casi todo.');
  hit(sec(s).t0 + .3, 8, 'ping'); hit(t_e + .1, 10, 'stamp'); hit(t_f + .1, 10, 'stamp'); hit(t_s + .1, 16, 'impact');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, '3 · LA GUERRA CON IRÁN', 540, 200, { size: 76, col: C.ink, sc: pb(T, sec(s).t0 - .2), max: 1000 }); hipo(c, 290);
    sea(c, 760, T); ship(c, 560, 740, .95, T, 6300);
    if (T > t_e) { barrel(c, 220, 520, pb(T, t_e), 6310); pill(c, 'ENERGÍA ↑', 220, 380, { size: 40, f: 'ui', sc: pb(T, t_e + .2), col: '#FFB4A6' }); }
    if (T > t_f) { c.save(); c.translate(860, 520); c.scale(pb(T, t_f), pb(T, t_f)); shp(c, R4(-80, -70, 160, 140), C.paper, { w: 5, lc: C.ink, seed: 6320 }); tx(c, 'FERTILIZANTE', 0, 0, { size: 22, f: 'ui', max: 150 }); c.restore(); pill(c, 'FERTILIZANTES ↑', 860, 380, { size: 36, f: 'ui', sc: pb(T, t_f + .2), col: '#FFB4A6' }); }
    if (T > t_s) { const items = ['COMIDA', 'TRANSPORTE', 'SERVICIOS', 'PRECIOS']; items.forEach((lab, k) => { const u = pr(T, t_s + k * .15, 1.0); tag(c, lab + ' ↑', 180 + k * 240, lerp(1300, 1150, u), { size: 26, bg: C.goldL, sc: pb(T, t_s + k * .15) }); });
      stamp(c, 'SUBE CASI TODO', 540, 1440, T, t_s + .2, { size: 64, col: C.red, rot: -.04 }); }
  }); }

// 5 · Dato curioso: la pastilla que se convierte en bolsas de compras
if (has('ozempic')) { const s = 'ozempic', t_d = As(s, 'dato curioso:'), t_m = As(s, 'medicamentos para bajar de peso'), t_r = As(s, 'ropa,'), t_c = As(s, 'cosméticos'), t_g = As(s, 'gimnasio.'), t_i = TK ? As(s, 'industrias enteras.') : null;
  hit(t_d + .1, 10, 'stamp'); hit(t_m + .1, 8, 'ping'); hit(t_r + .1, 8, 'ping'); hit(t_c + .1, 8, 'ping'); hit(t_g + .1, 8, 'ping'); if (t_i) hit(t_i + .1, 12, 'stamp');
  scene(s, TK ? 'drop' : 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, TK ? '4 · EL DATO CURIOSO' : 'EL DATO CURIOSO', 540, 200, { size: 80, col: C.ink, sc: pb(T, sec(s).t0 - .2), max: 1000 }); hipo(c, 290);
    const tr = pr(T, t_r - .3, .6, easeIO); if (tr < 1) { c.save(); c.globalAlpha = 1 - tr; pillBottle(c, 540, 650, 1.2 * pb(T, sec(s).t0 + .1), 6400); c.restore(); }
    [[t_r, '#B9A2E8', 'ROPA', 260], [t_c, '#E8913A', 'COSMÉTICOS', 540], [t_g, C.green, 'GIMNASIO', 820]].forEach(([t, col, lab, x], k) => { const kk = pb(T, t); if (kk > 0) bag(c, x, 640 + Math.sin(T * 2 + k) * 8, 1.1 * kk, col, lab, 6410 + k * 3); });
    person(c, 540 + Math.sin(L * .8) * 60, 1380, .9, { seed: 9, shirt: C.lav, ...idle(T), look: 1, mouth: T > t_r ? 'grin' : 'smile', walk: L * 6, armR: [.6, .4], armL: [.6, .4] });
    if (t_i) stamp(c, 'UN REMEDIO QUE MUEVE INDUSTRIAS', 540, 1000, T, t_i + .1, { size: 44, col: C.goldD, rot: -.03 });
  }); }

// 6 · TikTok · Y hay más: cuatro tarjetas rápidas
if (has('mas')) { const s = 'mas', t_n = As(s, 'súper El Niño'), t_ch = As(s, 'China y Taiwán,'), t_fr = As(s, 'elecciones en Francia'), t_es = As(s, 'viajes al espacio');
  [t_n, t_ch, t_fr, t_es].forEach(t => hit(t + .1, 10, 'stamp'));
  scene(s, 'blot', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'Y HAY MÁS…', 540, 200, { size: 96, col: C.ink, sc: pb(T, sec(s).t0 - .2) });
    const Cd = [[t_n, 'SÚPER EL NIÑO', 'calor extremo', 290, 560], [t_ch, 'CHINA Y TAIWÁN', 'tensión', 790, 560], [t_fr, 'FRANCIA', 'elecciones', 290, 1040], [t_es, 'ESPACIO', 'lanzamientos más baratos', 790, 1040]];
    Cd.forEach(([t, h, sub, x, y], k) => { const kk = pb(T, t - .1); if (kk <= 0) { c.save(); c.globalAlpha = .3 * pb(T, sec(s).t0 + .1 + k * .15); card(c, x, y, 440, 400, { seed: 6500 + k, draw: (cc) => tx(cc, '?', 0, 0, { size: 120, col: C.ink, sh: null }) }); c.restore(); return; } card(c, x, y, 440, 400, { sc: kk, band: k % 2 ? C.navy : C.red, seed: 6500 + k, rot: (k % 2 ? .02 : -.02), draw: (cc, w, hh) => { tx(cc, h, 0, -hh / 2 + 36, { size: 32, f: 'ui', col: C.paper, max: 400 }); tx(cc, sub, 0, hh / 2 - 46, { size: 32, f: 'hand', col: C.ink, sh: null, max: 400 }); } });
      if (k === 0) { c.save(); c.translate(x, y + 10); c.scale(kk, kk); shp(c, R4(-18, -110, 36, 170), C.paper, { w: 4, lc: C.ink, seed: 6510 }); shp(c, R4(-10, -110 + 170 * (1 - .4 - .4 * pr(T, t, 1)), 20, 170 * (.4 + .4 * pr(T, t, 1))), C.red, { sharp: true, w: 2, lc: C.red, seed: 6511 }); c.fillStyle = C.red; c.beginPath(); c.arc(0, 70, 32, 0, TAU); c.fill(); c.restore(); }
      if (k === 1) { c.save(); c.translate(x, y + 20); c.scale(kk * .5, kk * .5); ship(c, 0, 0, 1, T, 6520); c.restore(); }
      if (k === 2) { c.save(); c.translate(x, y + 20); c.scale(kk, kk); shp(c, R4(-80, -40, 160, 110), C.paper, { sharp: true, w: 4, lc: C.ink, seed: 6530 }); const u = (T * .8) % 1; shp(c, R4(-30, -90 + u * 50, 60, 70), C.goldL, { sharp: true, w: 3, lc: C.ink, seed: 6531 }); c.restore(); }
      if (k === 3) rocket(c, x, y + 10 - pr(T, t, 3, t => t) * 60, .6 * kk, T, 6540); });
  }); }

// 7 · Lección: nadie sabe cuál pasa → diversifica (huevos en varias canastas)
if (has('leccion')) { const s = 'leccion', t_n = As(s, 'Nadie sabe'), t_ni = As(s, 'Ni siquiera'), t_no = As(s, 'no apuesta todo'), t_d = As(s, 'diversifica.');
  hit(t_n + .1, 12, 'stamp'); hit(t_ni + .1, 10, 'stamp'); hit(t_no + .1, 8, 'ping'); hit(t_d + .1, 16, 'stamp');
  scene(s, TK ? 'iris' : 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, '¿QUÉ HACER CON TODO ESTO?', 540, 200, { size: 64, col: C.ink, sc: pb(T, sec(s).t0 - .2), max: 1000 });
    // bola de cristal que se agrieta
    const kb = pb(T, sec(s).t0 + .1); c.save(); c.translate(540, 560); c.scale(kb, kb); shp(c, blob(0, 0, 150, 150, 6600, { n: 40, amp: .01 }), '#BFE3F5', { w: 6, lc: C.ink, seed: 6600 });
    tx(c, '¿2027?', 0, 0, { size: 60, col: C.navy, sh: null }); if (T > t_n) ln(c, [[-60, -120], [-10, -30], [-50, 40], [20, 130]], { w: 6, col: C.ink, seed: 6601, p: pr(T, t_n, .4) }); shp(c, R4(-110, 140, 220, 40), C.goldD, { sharp: true, w: 4, lc: C.ink, seed: 6602 }); c.restore();
    stamp(c, 'NADIE SABE', 540, 840, T, t_n + .1, { size: 70, col: C.red, rot: -.04 });
    if (T > t_ni) tag(c, 'NI SIQUIERA THE ECONOMIST', 540, 940, { size: 30, bg: C.paper, sc: pb(T, t_ni) });
    // canastas
    [[200, C.vio], [420, C.gold], [640, C.lav], [860, C.green]].forEach(([x, col], k) => { const kk = pb(T, t_no + k * .2); if (kk <= 0) return; c.save(); c.translate(x, 1220); c.scale(kk, kk);
      shp(c, [[-90, -20], [90, -20], [70, 70], [-70, 70]], '#A8743F', { w: 5, lc: C.ink, seed: 6610 + k }); for (let e = 0; e < 3; e++) shp(c, blob(-40 + e * 40, -40, 22, 28, 6620 + k * 3 + e, { n: 16 }), C.paper, { w: 3, lc: C.ink, seed: 6620 + k * 3 + e }); c.restore(); });
    if (T > t_d) pill(c, 'DIVERSIFICA', 540, 1420, { size: 70, sc: pb(T, t_d) });
  }); }

// 8 · Cierre (noche): ¿cuál te preocupa más?
if (has('cierre')) { const s = 'cierre', t_q = As(s, '¿Cuál de estos'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_q + .1, 10, 'stamp'); sfx(t_end + .3, 'ping');
  scene(s, TK ? 'whip' : 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, '¿CUÁL TE PREOCUPA MÁS?', 540, 360, { size: 74, col: C.gold, sh: null, sc: pb(T, Math.min(t_q, sec(s).t0 + .1)), max: 1000 });
    ['DEUDA', 'IA', 'ENERGÍA', 'EL NIÑO'].forEach((lab, k) => tag(c, lab, 200 + k * 230, 560, { size: 34, bg: [C.goldL, '#FFD9D1', C.lav, C.paper][k], sc: pb(T, sec(s).t0 + .3 + k * .15), rot: (k % 2 ? .04 : -.04) }));
    tx(c, 'Cuéntanos en los comentarios', 540, 700, { size: 44, f: 'hand', col: C.chalk, sh: null, al: pr(T, t_q + .5, .4) });
    const ke = pr(T, t_end + .2, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1420, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1490, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada: la «portada» propia armada con el sello «¿Y TU PLATA?» =================
function cover(c) { drawScene(c, SC[0], As('gancho', 'con tu plata?') + 1.0); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('economist-2027', cover);
