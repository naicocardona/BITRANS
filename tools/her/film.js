// TITÁN · «¿Tus acciones de EE. UU. las heredan tus hijos… o el IRS?» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js)
// Datos IRS: no residente no ciudadano, > USD 60.000 en activos de EE. UU. → Form 706-NA en 9 meses; tarifas marginales 26 %–40 % sobre el excedente.
// Ejemplo HIPOTÉTICO: USD 200.000 → USD 41.800. Contornos reales (Natural Earth, world-atlas, ISC): tools/geo/usa_ring.json y col_ring50.json, inyectados por tools/her/build.sh como GEO.
// Cada escena se arma solo si su sección existe en la voz: el piloto usa las primeras secciones del TikTok con el mismo archivo.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];

// ---------- piezas ----------
// proyección equirectangular con corrección de latitud; devuelve puntos en el lienzo
function proj(ring, cx, cy, s, lat0) { const k = Math.cos(lat0 * Math.PI / 180); let mx = 0, my = 0; ring.forEach(p => { mx += p[0]; my += p[1]; }); mx /= ring.length; my /= ring.length;
  return ring.map(p => [cx + (p[0] - mx) * k * s, cy - (p[1] - my) * s]); }
function country(c, ring, cx, cy, s, lat0, fill, o = {}) { const P = proj(ring, cx, cy, s, lat0); c.save(); if (o.al !== undefined) c.globalAlpha = o.al;
  c.save(); c.translate(8, 10); c.fillStyle = 'rgba(13,16,32,.15)'; c.fill(polyPath(P, true)); c.restore();
  shp(c, P, fill, { sharp: true, w: o.w ?? 5, lc: C.ink, seed: o.seed ?? 1301 }); c.restore(); }
function pin(c, x, y, k, col, label) { if (k <= 0) return; c.save(); c.translate(x, y); c.scale(k, k);
  shp(c, [[0, 0], [-26, -44], [-30, -70], [-18, -92], [0, -98], [18, -92], [30, -70], [26, -44]], col, { w: 4, lc: C.ink, seed: 1311 });
  c.save(); c.fillStyle = C.paper; c.beginPath(); c.arc(0, -66, 12, 0, TAU); c.fill(); c.restore();
  if (label) tag(c, label, 0, -136, { size: 26, bg: C.paper }); c.restore(); }
function taxOffice(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s);   // edificio genérico de gobierno (sin logos reales)
  shp(c, [[-190, -270], [0, -350], [190, -270]], C.red, { sharp: true, w: 5, lc: C.ink, seed: 1321 }); shp(c, R4(-180, -270, 360, 34), C.paper, { sharp: true, w: 4, lc: C.ink, seed: 1322 });
  for (let k = 0; k < 5; k++) shp(c, R4(-160 + k * 70, -230, 38, 195), C.paper, { sharp: true, w: 4, lc: C.ink, seed: 1323 + k });
  shp(c, R4(-200, -36, 400, 36), C.navy, { sharp: true, w: 4, lc: C.ink, seed: 1329 }); tx(c, 'IRS', 0, -300, { size: 34, f: 'ui', col: C.paper }); c.restore(); }
function portfolio(c, x, y, k, T, o = {}) { if (k <= 0) return; card(c, x, y, o.w ?? 520, o.h ?? 330, { sc: k, band: C.navy, seed: 1331, rot: o.rot ?? -.02, draw: (cc, w, h) => {
  tx(cc, o.title || 'MIS ACCIONES DE EE. UU.', 0, -h / 2 + 35, { size: 28, f: 'ui', col: C.gold });
  const P = []; for (let i = 0; i <= 24; i++) { const u = i / 24; P.push([-w / 2 + 40 + u * (w - 80), h / 2 - 50 - u * (h - 150) * (.55 + .45 * u) + Math.sin(i * 1.7 + T * 2) * 9]); }
  ln(cc, P, { w: 7, col: C.green, p: o.p ?? 1, seed: 1332 }); ln(cc, [[-w / 2 + 40, h / 2 - 40], [w / 2 - 40, h / 2 - 40]], { w: 3, straight: true, seed: 1333 }); } }); }
function heir(c, x, y, s, T, o = {}) { // familia genérica: adulto + dos niños
  person(c, x, y, s, { seed: 11, shirt: C.lav, ...idle(T), look: o.look ?? 1, mouth: o.mouth || 'smile', brow: o.brow || 0, armR: o.armR, armL: o.armL });
  person(c, x + 120 * s, y, s * .66, { seed: 12, shirt: C.gold, ...idle(T, 1), look: o.look ?? 1, mouth: o.mouth || 'smile', brow: o.brow || 0, jump: o.jump ? Math.abs(Math.sin(T * 6)) * 8 : 0 });
  person(c, x - 110 * s, y, s * .58, { seed: 13, shirt: C.vio, ...idle(T, 2), look: o.look ?? 1, mouth: o.mouth || 'smile', brow: o.brow || 0, jump: o.jump ? Math.abs(Math.sin(T * 6 + 1)) * 8 : 0 }); }
function coinPop(c, x, y, T, t0, n, seed) { for (let k = 0; k < n; k++) { const u = (T - t0 - k * .18); if (u < 0 || u > 1) continue; const a = -Math.PI / 2 + (k - n / 2) * .35;
  c.save(); c.globalAlpha = 1 - u; c.translate(x + Math.cos(a) * u * 220, y + Math.sin(a) * u * 220 + u * u * 160); c.rotate(u * 6); shp(c, blob(0, 0, 22, 22, seed + k, { n: 18, amp: .02 }), C.gold, { w: 3, lc: C.ink, seed: seed + k }); c.restore(); } }

// ================= escenas =================
// 1 · Gancho: titular desde el primer cuadro; el portafolio crece y la herencia se parte entre la familia y el IRS
if (has('gancho')) { const s = 'gancho', t_h = As(s, 'las heredan'), t_i = As(s, 'o el i erre ese?');
  hit(.05, 8, 'stamp'); hit(t_h + .1, 6, 'ping'); hit(t_i + .1, 14, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 940], [t_i, 940], [t_i + .6, 900]]), key(T, [[0, 1.0], [t_i, 1.0], [t_i + .6, 1.05]]) + .012 * Math.sin(L * 1.3));
    tx(c, 'TUS ACCIONES DE EE. UU.', 540, 200, { size: 74, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }), max: 1000 });
    tx(c, '¿LAS HEREDAN TUS HIJOS…', 540, 300, { size: 66, col: C.gold, sh: C.ink, max: 1000 });
    tx(c, '…O EL IRS?', 540, 400, { size: 92, col: C.red, sh: C.ink, sc: T > t_i ? 1 + settle(T, t_i, { amp: .18, freq: 3, decay: 5 }) : 1 });
    portfolio(c, 540, 690, pb(T, -.2), T, { p: pr(T, 0, 1.6, easeIO) }); coinPop(c, 720, 760, T, .6, 5, 1340);
    // la herencia sale del portafolio: primero toda hacia la familia; con «o el IRS» se parte y una tajada va al edificio
    const pa = pr(T, t_h - .2, .6); if (pa > 0) arrow(c, [440, 870], [260, 1060], pa, { bend: 40, w: 10, col: C.goldD });
    const pi = pr(T, t_i, .5); if (pi > 0) arrow(c, [640, 870], [830, 1050], pi, { bend: -40, w: 10, col: C.red });
    heir(c, 250, 1440, .95, T, { look: 1, mouth: T > t_i ? 'o' : 'grin', brow: T > t_i ? 1 : 0, jump: T > t_h && T < t_i, armR: T < t_i ? [2.4, .4] : [.3, .2] });
    const kx = pr(T, t_i - .25, .45, easeOutBack); taxOffice(c, lerp(1110, 830, kx) + (kx < 1 ? Math.sin(T * 5) * 8 : 0), 1440, .95); if (kx < .5) tx(c, '?', 905, 1080, { size: 110, col: C.red, sc: 1 + .08 * Math.sin(T * 6) });
    if (T > t_i) tag(c, 'SE LLEVA UNA TAJADA', 830, 1500, { size: 28, bg: C.paper, sc: pb(T, t_i + .3) });
  }); }

// 2 · La regla: no residente + más de USD 60.000 en acciones de EE. UU. → impuesto de herencia del 26 % al 40 % sobre el excedente
if (has('regla')) { const s = 'regla', t0 = sec(s).t0, t_nv = As(s, 'Si no vives'), t_m = As(s, 'y mueres'), t_60 = As(s, 'sesenta mil dólares'), t_al = As(s, 'de allá,'),
    t_ih = As(s, 'impuesto de herencia,'), t_26 = As(s, 'veintiséis'), t_40 = As(s, 'cuarenta por ciento'), t_tp = As(s, 'sobre lo que pase');
  hit(t_nv + .2, 6, 'ping'); hit(t_m + .1, 6, 'ping'); hit(t_60 + .2, 12, 'stamp'); hit(t_ih + .1, 12, 'stamp'); hit(t_26 + .1, 8, 'ping'); hit(t_40 + .1, 10, 'stamp'); hit(t_tp + .3, 12, 'stamp');
  const tShrink = t_m - .2, Z = 1330, TOP = 60000, VMAX = 200000, K = 640 / VMAX, yTop = Z - TOP * K;
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_tp, 1.0], [t_tp + .5, 1.04]]) + .012 * Math.sin(L));
    // A · mapas reales: Colombia (tú) y EE. UU. (tus acciones), con un arco punteado entre los dos
    const g = pr(T, tShrink, .7, easeIO), U = { x: lerp(640, 760, g), y: lerp(560, 300, g), s: lerp(15, 5.2, g) }, Cc = { x: lerp(330, 220, g), y: lerp(1120, 330, g), s: lerp(34, 10, g) };
    country(c, GEO.usa, U.x, U.y, U.s, 38, C.navy, { seed: 1351, w: lerp(5, 3, g) }); country(c, GEO.col, Cc.x, Cc.y, Cc.s, 4, C.gold, { seed: 1352, w: lerp(5, 3, g) });
    const pa = pr(T, t_nv + .3, .6); if (pa > 0) { c.save(); c.setLineDash([16, 12]); ln(c, [[Cc.x + 30, Cc.y - 40], [(Cc.x + U.x) / 2 + 60, Math.min(Cc.y, U.y) - 40 - 120 * (1 - g)], [U.x - 40, U.y + 20]], { w: lerp(6, 4, g), col: C.goldD, p: pa, seed: 1353 }); c.restore(); }
    pin(c, Cc.x, Cc.y - 10, pb(T, t0 - .2) * lerp(1, .55, g), C.red, g < .5 ? 'TÚ VIVES AQUÍ' : 'TÚ');
    pin(c, U.x, U.y - 10, pb(T, t_nv + .4) * lerp(1, .55, g), C.green, g < .5 ? 'TUS ACCIONES' : 'ACCIONES');
    if (g < 1) stamp(c, 'NO RESIDENTE EN EE. UU.', 540, 1430, T, t_nv + .5, { size: 46, col: C.red, rot: -.03 });
    // B · la barra del portafolio sube y cruza el tope de USD 60.000
    if (g > .01) { c.save(); c.globalAlpha = g;
      ln(c, [[150, Z], [930, Z]], { w: 7, straight: true, seed: 1360 });
      const v = lerp(0, VMAX, pr(T, t_60 - .4, 1.6, easeIO)), h = v * K;
      if (h > 1) { const hb = Math.min(h, TOP * K); shp(c, R4(300, Z - hb, 240, hb), C.gold, { sharp: true, w: 5, lc: C.ink, seed: 1361, hatch: C.goldD, hal: .35 });
        if (h > TOP * K) { const ex = h - TOP * K, hot = T > t_tp; shp(c, R4(300, yTop - ex, 240, ex), hot ? C.red : C.goldL, { sharp: true, w: 5, lc: C.ink, seed: 1362, hatch: hot ? shade(C.red, .6) : C.goldD, hal: .35 }); } }
      c.save(); c.setLineDash([18, 12]); c.strokeStyle = C.red; c.lineWidth = 6; c.beginPath(); c.moveTo(150, yTop); c.lineTo(930, yTop); c.stroke(); c.restore();
      pill(c, 'TOPE: USD 60.000', 735, yTop + 52, { size: 40, f: 'ui', sc: pb(T, t_60), bg: C.red, col: C.paper, lc: C.ink });
      tx(c, 'acciones de EE. UU. del fallecido', 420, Z + 40, { size: 30, f: 'hand', col: C.goldD, al: pr(T, t_al, .4) });
      tx(c, 'USD ' + Math.round(v).toLocaleString('es-CO').replace(/,/g, '.'), 420, Math.max(560, Z - h - 46), { size: 50, col: C.ink, sh: C.gold, al: pr(T, t_60 - .3, .3) });
      stamp(c, 'IMPUESTO DE HERENCIA', 540, 520, T, t_ih, { size: 56, col: C.red, rot: -.03 });
      pill(c, '26 %', 780, 650, { size: 64, sc: pb(T, t_26) }); arrow(c, [780, 715], [780, 800], pr(T, t_40 - .2, .3), { bend: 0, w: 7, col: C.red }); pill(c, '40 %', 780, 870, { size: 78, sc: pb(T, t_40), col: '#FFB4A6' });
      tx(c, 'tarifas', 780, 960, { size: 34, f: 'hand', col: C.goldD, al: pr(T, t_26, .3) });
      if (T > t_tp) { tag(c, 'AQUÍ COBRA EL IRS', 420, yTop - 260, { size: 30, bg: C.paper, sc: pb(T, t_tp + .2) }); burst(c, 420, yTop - 140, T, t_tp + .3, { R: 220, col: C.red }); }
      tag(c, 'EJEMPLO HIPOTÉTICO', 420, 1440, { size: 26, bg: C.gold, sc: pb(T, t_60 - .4) });
      heir(c, 880, 1500, .45, T, { look: -1, mouth: T > t_ih ? 'o' : 'smile', brow: T > t_ih ? 1 : 0 });
      c.restore(); }
    tx(c, 'Fuente: IRS · no residentes que no son ciudadanos · formulario 706-NA', 540, 1540, { size: 24, f: 'ui', al: .8 });
  }); }

// ================= portada =================
function cover(c) { drawScene(c, SC[0], 4.6); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('herencia-eeuu', cover);
