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


// 3 · El ejemplo (hipotético): USD 200.000 → USD 41.800 al IRS; la tajada sale del pastel y vuela al edificio
if (has('ejemplo')) { const s = 'ejemplo', t_e = As(s, 'Ejemplo hipotético:'), t_200 = As(s, 'doscientos mil dólares.'), t_im = As(s, 'El impuesto sería'), t_41 = As(s, 'cuarenta y un mil'), t_q = As(s, 'Más de la quinta parte');
  hit(t_e + .1, 6, 'ping'); hit(t_200 + .1, 10, 'stamp'); hit(t_im + .1, 6, 'ping'); hit(t_41 + .1, 16, 'stamp'); hit(t_q + .2, 12, 'stamp');
  const PX = 420, PY = 860, PR = 250, frac = 41800 / 200000;
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, key(T, [[0, 1.0], [t_41, 1.0], [t_41 + .5, 1.05]]) + .012 * Math.sin(L));
    tag(c, 'EJEMPLO HIPOTÉTICO', 540, 175, { size: 30, bg: C.gold });
    pill(c, 'USD 200.000', 540, 300, { size: 70, sc: pb(T, sec(s).t0 - .2), top: 'ACCIONES DE EE. UU. AL MORIR' });
    // pastel del portafolio con la tajada del IRS (20,9 %)
    const kp = pb(T, sec(s).t0 - .1); if (kp > 0) { c.save(); c.translate(PX, PY); c.scale(kp, kp);
      const a0 = -Math.PI / 2, a1 = a0 + frac * TAU, out = pr(T, t_im, .5) * 40, fly = pr(T, t_q, .9, easeIO);
      const wedge = (from, to, r, n = 40) => { const P = [[0, 0]]; for (let i = 0; i <= n; i++) { const a = from + (to - from) * i / n; P.push([Math.cos(a) * r, Math.sin(a) * r]); } return P; };
      shp(c, wedge(a1, a0 + TAU, PR, 60), C.gold, { sharp: true, w: 6, lc: C.ink, seed: 1401, hatch: C.goldD, hal: .3 });
      tx(c, 'PARA TU FAMILIA', -10, 120, { size: 30, f: 'ui', al: pr(T, t_41, .4) });
      const am = (a0 + a1) / 2, dx = Math.cos(am) * out + fly * 330, dy = Math.sin(am) * out + fly * 430;
      c.save(); c.translate(dx, dy); c.rotate(fly * .6); shp(c, wedge(a0, a1, PR, 20), C.red, { sharp: true, w: 6, lc: C.ink, seed: 1402, hatch: shade(C.red, .6), hal: .35 }); c.restore(); c.restore(); }
    pill(c, 'USD 41.800', 790, 640, { size: 64, sc: pb(T, t_41), col: '#FFB4A6', top: 'IMPUESTO AL IRS' });
    tx(c, '≈ 20,9 %', 790, 730, { size: 44, f: 'hand', col: C.red, sh: null, al: pr(T, t_41 + .3, .3) });
    stamp(c, '¡MÁS DE 1/5!', 760, 860, T, t_q + .1, { size: 60, col: C.red, rot: .05 });
    taxOffice(c, 820, 1420, .62 * pb(T, t_im - .2));
    heir(c, 200, 1440, .7, T, { look: 1, mouth: T > t_41 ? 'o' : 'smile', brow: T > t_41 ? 1 : 0 });
    tx(c, 'Sobre USD 140.000 (lo que pasa el tope), tarifas del 26 % al 32 % · cálculo TITÁN con la tabla del IRS', 540, 1540, { size: 22, f: 'ui', al: .85, max: 1000 });
  }); }

// 4 · TikTok · El trámite: 9 meses, cuenta congelada hasta el certificado del IRS, sin tratado de herencias con Colombia
if (has('tramite')) { const s = 'tramite', t_9 = As(s, 'nueve meses'), t_cu = As(s, 'la cuenta puede'), t_co = As(s, 'congelada'), t_ce = As(s, 'dé un certificado.'), t_col = As(s, 'Colombia no tiene'), t_tr = As(s, 'tratado de herencias');
  hit(t_9 + .1, 8, 'stamp'); hit(t_co + .1, 12, 'stamp'); hit(t_ce + .1, 8, 'ping'); hit(t_col + .1, 6, 'ping'); hit(t_tr + .1, 14, 'stamp');
  scene(s, 'news', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, 1.0 + .012 * Math.sin(L));
    const f1 = 1 - pr(T, t_col - .5, .4);
    if (f1 > 0) { c.save(); c.globalAlpha = f1;
      // calendario: los meses corren hasta 9
      const m = Math.min(9, Math.max(1, Math.floor((T - t_9 + .3) * 6) + 1));
      card(c, 290, 520, 360, 360, { sc: pb(T, sec(s).t0 - .3), band: C.red, seed: 1411, rot: -.03, draw: cc => { tx(cc, 'PLAZO PARA DECLARAR', 0, -145, { size: 26, f: 'ui', col: C.paper }); tx(cc, String(T > t_9 - .3 ? m : 1), 0, 10, { size: 170, col: C.ink, sh: C.gold }); tx(cc, 'MESES', 0, 130, { size: 40, f: 'ui' }); } });
      // cuenta del bróker congelada
      const kc = pb(T, Math.min(t_cu - .2, sec(s).t0 + .3)); if (kc > 0) { card(c, 780, 560, 400, 300, { sc: kc, band: C.navy, seed: 1412, rot: .03, draw: (cc, w, h) => {
        tx(cc, 'CUENTA EN EL BRÓKER', 0, -115, { size: 26, f: 'ui', col: C.gold });
        const P = []; for (let i = 0; i <= 16; i++) P.push([-150 + i * 19, 60 - i * 6 + Math.sin(i * 1.3) * 10]); ln(cc, P, { w: 6, col: C.green, seed: 1413 });
        if (T > t_co) { cc.save(); cc.globalAlpha = .55 * pr(T, t_co, .4); cc.fillStyle = '#BFE3F5'; cc.fillRect(-w / 2 + 6, -h / 2 + 72, w - 12, h - 78); cc.restore(); } } });
        if (T > t_co) { const k = pb(T, t_co); c.save(); c.translate(780, 600); c.scale(k, k); shp(c, R4(-55, -20, 110, 90), C.gold, { w: 5, lc: C.ink, seed: 1414 }); ln(c, [[-34, -20], [-34, -60], [0, -84], [34, -60], [34, -20]], { w: 10, seed: 1415 }); c.restore();
          stamp(c, 'CONGELADA', 780, 760, T, t_co + .1, { size: 54, col: C.red, rot: -.05 }); } }
      // certificado del IRS
      const kd = pb(T, t_ce - .2); if (kd > 0) { card(c, 540, 1020, 520, 260, { sc: kd, rot: -.02, seed: 1416, draw: cc => { tx(cc, 'CERTIFICADO DE TRANSFERENCIA', 0, -80, { size: 28, f: 'ui' }); squiggleText(cc, -200, -40, 400, 3, { color: '#8A8D9C', seed: 1417, lineH: 30, amp: 2, width: 2 }); } });
        stamp(c, 'IRS', 700, 1100, T, t_ce + .3, { size: 50, col: C.red, rot: .1 }); }
      heir(c, 190, 1450, .62, T, { look: 1, mouth: T > t_co ? 'o' : 'flat', brow: 1 });
      c.restore(); }
    // sin tratado de herencias entre Colombia y EE. UU.
    const g = pr(T, t_col - .4, .5); if (g > 0) { c.save(); c.globalAlpha = g;
      country(c, GEO.col, 290, 860, 30, 4, C.gold, { seed: 1421 }); country(c, GEO.usa, 760, 760, 11, 38, C.navy, { seed: 1422 });
      tx(c, 'COLOMBIA', 290, 1180, { size: 36, f: 'ui' }); tx(c, 'EE. UU.', 760, 1000, { size: 36, f: 'ui' });
      const px = pr(T, t_tr, .35); ln(c, [[470, 760], [580, 880]], { w: 16, col: C.red, p: px, seed: 1423 }); ln(c, [[580, 760], [470, 880]], { w: 16, col: C.red, p: pr(T, t_tr + .15, .35), seed: 1424 });
      stamp(c, 'SIN TRATADO DE HERENCIAS', 540, 400, T, t_tr + .2, { size: 50, col: C.red, rot: -.03 });
      tx(c, 'Fuente: IRS · lista de tratados de herencias y certificado de transferencia', 540, 1540, { size: 22, f: 'ui', al: .85 }); c.restore(); }
  }); }

// 5 · El mito: «abre una LLC y un fideicomiso» (TikTok) / «¿y si abres una LLC?» (Short)
if (has('mito')) { const s = 'mito', t0 = sec(s).t0, t_oj = TK ? As(s, 'Ojo.') : As(s, 'Ojo:'), t_ng = As(s, 'no garantiza nada');
  const t_ab = TK ? As(s, 'abre una ele ele ce') : As(s, '¿Y si abres'), t_fi = TK ? As(s, 'y un fideicomiso.') : null, t_fo = TK ? As(s, 'un formulario anual') : null, t_25 = TK ? As(s, 'veinticinco mil dólares.') : null,
    t_rv = TK ? As(s, 'fideicomiso revocable') : null, t_tu = TK ? As(s, 'siguen siendo tuyas.') : null,
    t_o1 = TK ? null : As(s, 'fideicomiso irrevocable,'), t_o2 = TK ? null : As(s, 'una sociedad fuera'), t_o3 = TK ? null : As(s, 'fondos domiciliados'), t_ct = TK ? null : As(s, 'Todas tienen costos.');
  hit(t_ab + .1, 6, 'ping'); hit(t_oj, 14, 'stamp'); hit(t_ng + .2, 10, 'stamp');
  if (TK) { hit(t_fi + .1, 6, 'ping'); hit(t_fo + .1, 6, 'ping'); hit(t_25 + .1, 12, 'stamp'); hit(t_rv + .2, 10, 'stamp'); hit(t_tu + .1, 10, 'stamp'); } else { hit(t_o1, 6, 'ping'); hit(t_o2, 6, 'ping'); hit(t_o3, 6, 'ping'); hit(t_ct + .1, 12, 'stamp'); }
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, 1.0 + .012 * Math.sin(L * 1.1));
    tx(c, TK ? 'TE DIRÁN…' : '¿Y SI ABRES UNA LLC?', 540, 210, { size: 76, col: C.ink, clipP: pr(T, t0 - .45, .4, easeIO), max: 1000 });
    // asesor genérico con globo de diálogo
    person(c, 170, 1450, .78, { seed: 14, shirt: C.navy, ...idle(T), look: 1, mouth: T < t_oj ? 'grin' : 'flat', armR: [1.2, 1.0] });
    const kl = pb(T, Math.min(t_ab - .1, t0 - .3)), yL = TK ? 470 : 520;
    if (kl > 0) card(c, TK ? 330 : 540, yL, 360, 230, { sc: kl, band: C.navy, seed: 1431, rot: -.03, draw: cc => { tx(cc, 'LLC', 0, -80, { size: 30, f: 'ui', col: C.gold }); tx(cc, 'EN EE. UU.', 0, 20, { size: 48, col: C.ink, sh: C.gold }); } });
    if (TK) { const kf = pb(T, Math.min(t_fi - .1, t0 - .1)); if (kf > 0) card(c, 760, yL, 360, 230, { sc: kf, band: C.vio, seed: 1432, rot: .03, draw: cc => { tx(cc, 'FIDEICOMISO', 0, -80, { size: 30, f: 'ui', col: C.paper }); tx(cc, T > t_rv ? 'REVOCABLE' : '…', 0, 20, { size: 46, col: C.ink, sh: C.gold }); } }); }
    stamp(c, '¡OJO!', TK ? 780 : 830, TK ? 760 : 330, T, t_oj, { size: TK ? 80 : 64, col: C.red, rot: -.06 });
    stamp(c, 'NO GARANTIZA NADA', TK ? 330 : 540, yL + 165, T, t_ng + .1, { size: 40, col: C.red, rot: .04 });
    if (TK) {
      const kd = pb(T, t_fo - .1); if (kd > 0) { card(c, 420, 1000, 380, 250, { sc: kd, rot: -.04, seed: 1433, draw: cc => { tx(cc, 'FORMULARIO 5472', 0, -80, { size: 30, f: 'ui' }); tx(cc, 'CADA AÑO', 0, -30, { size: 28, f: 'hand', col: C.goldD, sh: null }); squiggleText(cc, -150, 10, 300, 3, { color: '#8A8D9C', seed: 1434, lineH: 28, amp: 2, width: 2 }); } }); }
      pill(c, 'MULTAS DESDE USD 25.000', 620, 1220, { size: 44, f: 'ui', sc: pb(T, t_25), bg: C.red, col: C.paper, lc: C.ink });
      if (T > t_rv) { const p = pr(T, t_rv + .2, .35); ln(c, [[600, yL - 100], [920, yL + 100]], { w: 14, col: C.red, p, seed: 1435 }); ln(c, [[920, yL - 100], [600, yL + 100]], { w: 14, col: C.red, p: pr(T, t_rv + .35, .35), seed: 1436 }); }
      if (T > t_tu) { tag(c, 'PARA EL IRS, SIGUEN SIENDO TUYAS', 640, 1330, { size: 30, bg: C.paper, sc: pb(T, t_tu) }); arrow(c, [760, yL + 130], [260, 1150], pr(T, t_tu, .5), { bend: 80, w: 8, col: C.red }); }
    } else {
      [['FIDEICOMISO IRREVOCABLE', t_o1, 920], ['SOCIEDAD FUERA DE EE. UU.', t_o2, 1050], ['FONDOS DOMICILIADOS FUERA', t_o3, 1180]].forEach(([l, t, y]) => { pill(c, l, 600, y, { size: 38, f: 'ui', sc: pb(T, t) }); });
      tag(c, 'PUEDE FUNCIONAR · ASESÓRATE', 600, 810, { size: 28, bg: C.paper, sc: pb(T, t_o1 - .2) });
      stamp(c, 'TODAS TIENEN COSTOS', 600, 1330, T, t_ct + .05, { size: 46, col: C.red, rot: -.03 });
    }
  }); }

// 6 · TikTok · Lo que puede funcionar, con costos; en Colombia igual se declara
if (has('opciones')) { const s = 'opciones', t_p = As(s, 'Lo que puede funcionar:'), t_o1 = As(s, 'fideicomiso irrevocable,'), t_o2 = As(s, 'una sociedad fuera'), t_o3 = As(s, 'fondos domiciliados'), t_ct = As(s, 'Todas tienen costos,'), t_cd = As(s, 'en Colombia igual declaras.');
  hit(t_p + .1, 6, 'ping'); hit(t_o1 + .1, 8, 'stamp'); hit(t_o2 + .1, 8, 'stamp'); hit(t_o3 + .1, 8, 'stamp'); hit(t_ct + .1, 12, 'stamp'); hit(t_cd + .1, 10, 'ping');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, 1.0 + .012 * Math.sin(L));
    tx(c, 'LO QUE PUEDE FUNCIONAR', 540, 210, { size: 70, col: C.ink, clipP: pr(T, sec(s).t0 - .2, .6, easeIO), max: 1000 });
    tag(c, 'SOLO CON ASESORÍA EN LOS DOS PAÍSES', 540, 300, { size: 28, bg: C.paper, sc: pb(T, sec(s).t0 - .1) });
    const opts = [['FIDEICOMISO IRREVOCABLE', 'entregas el control de verdad', t_o1, C.vio], ['SOCIEDAD FUERA DE EE. UU.', 'la sociedad tiene las acciones', t_o2, C.navy], ['FONDOS FUERA DE EE. UU.', 'p. ej., domiciliados en Irlanda', t_o3, C.goldD]];
    opts.forEach(([a, b, t, col], k) => { const y = 470 + k * 230, kk = pb(T, Math.min(t - .1, sec(s).t0 + .2 + k * .25)); if (kk <= 0) return;
      card(c, 600, y, 760, 190, { sc: kk, band: col, seed: 1441 + k, rot: (k - 1) * .015, draw: cc => { tx(cc, a, 0, -60, { size: 32, f: 'ui', col: C.paper }); tx(cc, b, 0, 25, { size: 38, f: 'hand', col: C.goldD, sh: null }); } });
      if (T > t) { const p = pr(T, t + .1, .3); ln(c, [[150, y], [185, y + 35], [240, y - 35]], { w: 14, col: C.green, p, seed: 1445 + k }); } });
    stamp(c, 'TODAS TIENEN COSTOS', 540, 1180, T, t_ct + .05, { size: 56, col: C.red, rot: -.04 });
    const kc = pr(T, t_cd - .2, .4); if (kc > 0) { country(c, GEO.col, 200, 1380, 12, 4, C.gold, { seed: 1448, al: kc }); pill(c, 'EN COLOMBIA IGUAL DECLARAS', 620, 1380, { size: 40, f: 'ui', sc: pb(T, t_cd) }); }
  }); }

// 7 · Cierre (noche → luz): «Todos ven el portafolio crecer. Casi nadie mira quién lo hereda.» + llamado a asesorarse + aviso
if (has('cierre')) { const s = 'cierre', t_end = DD.words[DD.words.length - 1][2], t_rv = As(s, 'Revisa cuánto'), t_as = As(s, 'asesórate con'), t_dp = As(s, 'los dos países');
  const t_tv = TK ? As(s, 'Todos ven') : null, t_cn = TK ? As(s, 'Casi nadie mira') : null, t_ht = TK ? null : As(s, 'antes de que le toque');
  if (TK) { hit(t_tv + .1, 8, 'ping'); hit(t_cn + .1, 12, 'stamp'); } else hit(t_ht + .1, 12, 'stamp'); hit(t_rv + .1, 8, 'ping'); hit(t_dp + .1, 10, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    if (TK) { const f = 1 - pr(T, t_rv - .3, .4); if (f > 0) { c.save(); c.globalAlpha = f;
        tx(c, 'TODOS VEN EL PORTAFOLIO CRECER.', 540, 300, { size: 58, col: C.chalk, sh: C.goldD, clipP: pr(T, t_tv, .6, easeIO), max: 1000 });
        portfolio(c, 540, 620, pb(T, t_tv), T, { title: 'TUS ACCIONES DE EE. UU.' });
        tx(c, 'CASI NADIE MIRA QUIÉN LO HEREDA.', 540, 900, { size: 58, col: C.gold, sh: null, clipP: pr(T, t_cn, .6, easeIO), max: 1000 });
        if (T > t_cn) { heir(c, 400, 1300, .6, T, { look: 1, mouth: 'flat', brow: 1 }); tx(c, '?', 720, 1150, { size: 140, col: C.gold, sh: null, sc: pb(T, t_cn + .3) }); }
        c.restore(); } }
    const kr = pr(T, TK ? t_rv - .2 : sec(s).t0 - .2, .5); if (kr > 0) { c.save(); c.globalAlpha = kr;
      tx(c, 'REVISA CUÁNTO TIENES ALLÁ', 540, TK ? 330 : 300, { size: 68, col: C.chalk, sh: C.goldD, sc: pb(T, t_rv), max: 1000 });
      tx(c, 'Y ASESÓRATE CON UN EXPERTO', 540, TK ? 440 : 410, { size: 60, col: C.gold, sh: null, clipP: pr(T, t_as, .6, easeIO), max: 1000 });
      tx(c, 'EN LOS DOS PAÍSES', 540, TK ? 540 : 510, { size: 60, col: C.gold, sh: null, clipP: pr(T, t_dp - .3, .4, easeIO) });
      const km = pb(T, t_dp); if (km > 0) { country(c, GEO.col, 330, 860, 22 * km, 4, C.gold, { seed: 1451 }); country(c, GEO.usa, 760, 800, 8 * km, 38, C.lav, { seed: 1452 }); arrow(c, [420, 820], [660, 780], pr(T, t_dp + .2, .5), { bend: 40, w: 7, col: C.gold }); }
      if (TK) heir(c, 540, 1300, .55, T, { look: 0, mouth: 'smile', jump: T > t_dp + .3 && T < t_dp + 1.5 });
      if (!TK) { stamp(c, 'ANTES DE QUE LE TOQUE A TU FAMILIA', 540, 1130, T, t_ht, { size: 40, col: C.red, bg: C.navy, rot: -.03 }); heir(c, 540, 1360, .5, T, { look: 0, mouth: 'smile' }); }
      c.restore(); }
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión', 540, 1395, { size: 28, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'ni asesoría tributaria o legal.', 540, 1435, { size: 28, f: 'ui', col: C.chalk, al: ke }); tx(c, 'TITÁN HOLDING', 540, 1500, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada =================
function cover(c) { drawScene(c, SC[0], 4.6); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('herencia-eeuu', cover);
