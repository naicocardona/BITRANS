// TITÁN · «¿Qué vale más: Apple o toda la economía de Colombia?» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js)
// Datos: Apple ≈ USD 5,2 billones en bolsa (11 nov 2026); PIB Colombia 2026 USD 572.735 millones (FMI); Bolsa de Colombia ≈ USD 169–172 mil millones (WFE); Microsoft → Apple USD 150 M (1997).
// Manzana genérica (sin logo real). Contornos reales: GEO (tools/apl/build.sh). Cada escena se arma solo si existe su sección.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];

// ---------- piezas ----------
function proj(ring, cx, cy, s, lat0) { const k = Math.cos(lat0 * Math.PI / 180); let mx = 0, my = 0; ring.forEach(p => { mx += p[0]; my += p[1]; }); mx /= ring.length; my /= ring.length; return ring.map(p => [cx + (p[0] - mx) * k * s, cy - (p[1] - my) * s]); }
function colMap(c, cx, cy, s, o = {}) { if (s <= 0) return; const P = proj(GEO.col, cx, cy, s, 4); c.save(); if (o.al !== undefined) c.globalAlpha = o.al; c.save(); c.translate(6, 8); c.fillStyle = 'rgba(13,16,32,.15)'; c.fill(polyPath(P, true)); c.restore();
  shp(c, P, o.col || C.gold, { sharp: true, w: o.w ?? 4, lc: C.ink, seed: o.seed ?? 2301 }); c.restore(); }
function apple(c, x, y, r, rot = 0, seed = 2311) { if (r <= 0) return; c.save(); c.translate(x, y); c.rotate(rot);
  const P = []; for (let i = 0; i <= 48; i++) { const a = i / 48 * TAU, k = 1 - .16 * Math.pow(Math.max(0, -Math.sin(a)), 6) - .1 * Math.pow(Math.max(0, Math.sin(a)), 8); P.push([Math.cos(a) * r * 1.05 * k, Math.sin(a) * r * k + (Math.sin(a) < 0 ? -Math.abs(Math.cos(a)) * r * .1 : 0)]); }
  shp(c, P, '#D9604F', { w: 5, lc: C.ink, seed, hatch: '#A8443A', hal: .25 }); c.save(); c.globalAlpha = .5; c.fillStyle = '#fff'; c.beginPath(); c.ellipse(-r * .4, -r * .35, r * .14, r * .26, -.5, 0, TAU); c.fill(); c.restore();
  ln(c, [[0, -r * .78], [r * .06, -r * 1.12]], { w: Math.max(3, r * .07), seed: seed + 1 }); shp(c, [[r * .08, -r * 1.0], [r * .5, -r * 1.25], [r * .62, -r * 1.05], [r * .25, -r * .92]], '#3FAF7A', { w: 4, lc: C.ink, seed: seed + 2 }); c.restore(); }
function tower(c, x, y, w, h, col, seed, lab) { shp(c, R4(x - w / 2, y - h, w, h), col, { sharp: true, w: 4, lc: C.ink, seed }); const nw = Math.max(1, Math.floor(w / 26)), nh = Math.max(1, Math.floor(h / 34));
  for (let i = 0; i < nh; i++) for (let j = 0; j < nw; j++) { c.save(); c.fillStyle = (i * 7 + j * 3) % 5 ? C.goldL : '#2A3150'; c.fillRect(x - w / 2 + 6 + j * (w - 12) / nw, y - h + 8 + i * 34, (w - 12) / nw - 6, 20); c.restore(); }
  if (lab) tag(c, lab, x, y + 34, { size: 24, bg: C.paper }); }
function person2(c, x, y, s, T, o = {}) { person(c, x, y, s, { seed: o.seed ?? 41, shirt: o.shirt || C.lav, ...idle(T), ...o }); }
function egg(c, x, y, r, rot, cracked, seed) { c.save(); c.translate(x, y); c.rotate(rot); shp(c, blob(0, 0, r * .78, r, seed, { n: 26, amp: .01 }), '#FFF7E6', { w: 4, lc: C.ink, seed });
  if (cracked) ln(c, [[-r * .6, -r * .1], [-r * .25, r * .1], [0, -r * .15], [r * .25, r * .08], [r * .6, -r * .12]], { w: 4, col: C.ink, seed: seed + 1 }); c.restore(); }
function basket(c, x, y, s, T, crackT) { c.save(); c.translate(x, y); c.scale(s, s);
  for (let k = 0; k < 7; k++) { const ex = -150 + (k % 4) * 100 + (k > 3 ? 50 : 0), ey = -70 - (k > 3 ? 60 : 0); egg(c, ex, ey + Math.sin(T * 2 + k) * 3, 52, (k - 3) * .08, crackT !== null && T > crackT && k === 2, 2330 + k); }
  shp(c, [[-240, -60], [240, -60], [190, 110], [-190, 110]], '#B07A3E', { w: 6, lc: C.ink, seed: 2340, hatch: '#7A5228', hal: .5 });
  for (let k = 0; k < 4; k++) ln(c, [[-225 + k * 10, -30 + k * 36], [225 - k * 10, -30 + k * 36]], { w: 4, col: '#7A5228', straight: true, seed: 2341 + k }); c.restore(); }

// ================= escenas =================
// 1 · Gancho: balanza con una manzana gigante vs. el mapa de Colombia; con «más de nueve veces» aparecen 9 Colombias y se equilibra
if (has('gancho')) { const s = 'gancho', t_ec = As(s, 'economía de Colombia.'), t_9 = As(s, 'más de nueve veces.');
  hit(.05, 8, 'stamp'); hit(t_ec + .1, 8, 'ping'); hit(t_9 + .2, 16, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_9, 960], [t_9 + .6, 930]]), key(T, [[0, 1.0], [t_9, 1.0], [t_9 + .6, 1.04]]) + .012 * Math.sin(L * 1.3));
    tx(c, '¿QUÉ VALE MÁS?', 540, 200, { size: 92, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, 'APPLE vs. COLOMBIA', 540, 310, { size: 76, col: C.gold, sh: C.ink });
    const n = T < t_9 ? 1 : Math.min(9, 1 + Math.floor((T - t_9) / .14)), tilt = lerp(.42, .04, (n - 1) / 8) + Math.sin(T * 2) * .01;
    const px = 540, py = 820, arm = 360;   // balanza
    shp(c, [[px - 40, 1440], [px + 40, 1440], [px + 14, py], [px - 14, py]], C.navy, { sharp: true, w: 5, lc: C.ink, seed: 2350 }); shp(c, R4(px - 160, 1430, 320, 30), C.navy, { sharp: true, w: 5, lc: C.ink, seed: 2351 });
    const lx = px - Math.cos(tilt) * arm, ly = py + Math.sin(tilt) * arm, rx = px + Math.cos(tilt) * arm, ry = py - Math.sin(tilt) * arm;
    ln(c, [[lx, ly], [rx, ry]], { w: 12, seed: 2352, straight: true }); shp(c, blob(px, py, 26, 26, 2353, { n: 16 }), C.gold, { w: 4, lc: C.ink, seed: 2353 });
    for (const [x, y, sd] of [[lx, ly, 2354], [rx, ry, 2356]]) { ln(c, [[x, y], [x - 130, y + 170]], { w: 3, seed: sd }); ln(c, [[x, y], [x + 130, y + 170]], { w: 3, seed: sd + 1 }); shp(c, [[x - 150, y + 170], [x + 150, y + 170], [x + 110, y + 200], [x - 110, y + 200]], C.goldD, { w: 4, lc: C.ink, seed: sd }); }
    apple(c, lx, ly + 70, 105 * pb(T, -.2), 0);
    for (let k = 0; k < n; k++) { const ox = ((k % 3) - 1) * 88, oy = -Math.floor(k / 3) * 70; colMap(c, rx + ox, ry + 135 + oy, 11 * pb(T, (k ? t_9 + (k - 1) * .14 : -.2)), { seed: 2360 + k, w: 3 }); }
    tag(c, 'APPLE (EN BOLSA)', lx, ly + 250, { size: 26, bg: C.paper }); tag(c, 'PIB DE COLOMBIA', rx, ry + 250, { size: 26, bg: C.paper });
    if (T > t_9) { pill(c, '× 9', rx + 170, ry - 40, { size: 70, sc: pb(T, t_9 + 1.1), col: C.goldL }); stamp(c, '¡MÁS DE 9 VECES!', 540, 470, T, t_9 + .1, { size: 64, col: C.red, rot: -.04 }); }
  }); }

// 2 · El dato: barras con escala real (Apple 5,2 billones vs. PIB de Colombia 573.000 millones)
if (has('dato')) { const s = 'dato', t_a = As(s, 'Apple vale en bolsa'), t_52 = As(s, 'cinco coma dos'), t_co = As(s, 'todo lo que produce'), t_f = As(s, 'efe eme i,'), t_573 = As(s, 'quinientos setenta y tres');
  hit(t_a + .1, 6, 'ping'); hit(t_52 + .2, 12, 'stamp'); hit(t_co + .1, 6, 'ping'); hit(t_573 + .2, 10, 'stamp');
  const Z = 1380, K = 760 / 5.2;
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, 1.0 + .012 * Math.sin(L));
    tx(c, 'EN DÓLARES', 540, 200, { size: 64, col: C.ink, clipP: pr(T, sec(s).t0 - .3, .5, easeIO) });
    ln(c, [[120, Z], [960, Z]], { w: 7, straight: true, seed: 2370 });
    c.save(); c.setLineDash([14, 10]); c.strokeStyle = C.ink; c.globalAlpha = .3; c.lineWidth = 4; c.strokeRect(220, Z - 5.2 * K, 240, 5.2 * K); c.strokeRect(620, Z - .5727 * K, 240, .5727 * K); c.restore();
    const ga = pr(T, t_52 - .3, 1.0, easeOutBack), gc = pr(T, t_573 - .3, .8, easeOutBack);
    if (ga > .01) shp(c, R4(220, Z - 5.2 * K * ga, 240, 5.2 * K * ga), '#D9604F', { sharp: true, w: 5, lc: C.ink, seed: 2371, hatch: '#A8443A', hal: .35 });
    if (gc > .01) shp(c, R4(620, Z - .5727 * K * gc, 240, .5727 * K * gc), C.gold, { sharp: true, w: 5, lc: C.ink, seed: 2372, hatch: C.goldD, hal: .4 });
    apple(c, 340, Z - 5.2 * K * ga - 70, 50 * pb(T, t_a)); colMap(c, 740, Z - .5727 * K * gc - 80, 9 * pb(T, t_co));
    pill(c, 'USD 5,2 BILLONES', 340, 330, { size: 46, sc: pb(T, t_52), top: 'APPLE · VALOR EN BOLSA' });
    pill(c, 'USD 573.000 MILLONES', 740, Z - .5727 * K - 220, { size: 38, sc: pb(T, t_573), top: 'PIB COLOMBIA 2026 · FMI' });
    tx(c, 'APPLE', 340, Z + 40, { size: 34, f: 'ui' }); tx(c, 'COLOMBIA', 740, Z + 40, { size: 34, f: 'ui' });
    tx(c, 'Fuentes: FMI (WEO oct. 2026) · valor en bolsa al 11 nov. 2026', 540, 1540, { size: 24, f: 'ui', al: .8 });
    person2(c, 930, 1500, .5, T, { flip: true, look: -1, mouth: T > t_573 ? 'o' : 'smile', brow: T > t_573 ? 1 : 0 });
  }); }

// 3 · TikTok · Ojo: valor en bolsa ≠ producción de un año (pero sirve para dimensionar)
if (has('ojo')) { const s = 'ojo', t_o = As(s, 'Ojo:'), t_b = As(s, 'una empresa en bolsa;'), t_p = As(s, 'lo que produce un país'), t_d = As(s, 'para dimensionar.');
  hit(t_o + .05, 12, 'stamp'); hit(t_b + .1, 6, 'ping'); hit(t_p + .1, 6, 'ping'); hit(t_d + .1, 10, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, 1.0 + .012 * Math.sin(L * 1.1));
    stamp(c, '¡OJO!', 540, 230, T, Math.min(t_o, sec(s).t0 + .1), { size: 90, col: C.red });
    card(c, 290, 700, 400, 420, { sc: pb(T, Math.min(t_b - .2, sec(s).t0 + .2)), band: '#D9604F', seed: 2380, draw: cc => { tx(cc, 'VALOR EN BOLSA', 0, -175, { size: 28, f: 'ui', col: C.paper });
      const P = []; for (let i = 0; i <= 14; i++) P.push([-150 + i * 21, 60 - i * 9 + Math.sin(i * 1.7 + T * 2) * 14]); ln(cc, P, { w: 7, col: C.green, seed: 2381 }); tx(cc, 'lo que vale la empresa hoy', 0, 160, { size: 30, f: 'hand', col: C.goldD, sh: null, max: 360 }); } });
    card(c, 790, 700, 400, 420, { sc: pb(T, Math.min(t_p - .2, sec(s).t0 + .4)), band: C.goldD, seed: 2382, draw: cc => { tx(cc, 'PIB', 0, -175, { size: 30, f: 'ui', col: C.paper });
      shp(cc, [[-130, 60], [-130, -40], [-60, -90], [-60, -40], [10, -90], [10, -40], [130, -40], [130, 60]], C.navy, { sharp: true, w: 4, lc: C.ink, seed: 2383 }); tx(cc, 'lo que produce un país en 1 año', 0, 160, { size: 30, f: 'hand', col: C.goldD, sh: null, max: 360 }); } });
    tx(c, '≠', 540, 700, { size: 150, col: C.red, sh: C.ink, sc: pb(T, t_p + .3) });
    stamp(c, 'SIRVE PARA DIMENSIONAR', 540, 1060, T, t_d, { size: 54, rot: -.03 });
    person2(c, 540, 1480, .7, T, { look: 0, mouth: T > t_d ? 'grin' : 'smile', armR: [1.2, 1.1] });
  }); }

// 4 · TikTok · La Bolsa de Colombia completa (≈ 30 veces menos) y el 1 % de Apple en un día (≈ 1/3 de nuestra bolsa)
if (has('bolsa')) { const s = 'bolsa', t_b = As(s, 'Bolsa de Colombia juntas:'), t_30 = As(s, 'treinta veces más.'), t_1 = As(s, 'sube uno por ciento'), t_52 = As(s, 'cincuenta y dos mil millones'), t_3 = As(s, 'Casi un tercio');
  hit(t_b + .1, 6, 'ping'); hit(t_30 + .2, 14, 'stamp'); hit(t_1 + .1, 8, 'ping'); hit(t_52 + .2, 10, 'stamp'); hit(t_3 + .1, 12, 'stamp');
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, key(T, [[0, 1.0], [t_3, 1.0], [t_3 + .5, 1.04]]) + .012 * Math.sin(L));
    tx(c, 'TODA LA BOLSA DE COLOMBIA', 540, 200, { size: 60, col: C.ink, clipP: pr(T, sec(s).t0 - .3, .5, easeIO), max: 1000 });
    const f = 1 - pr(T, t_1 - .3, .5);
    if (f > 0) { c.save(); c.globalAlpha = f;
      for (let k = 0; k < 30; k++) { const kk = pb(T, sec(s).t0 + k * .05); if (kk <= 0) continue; const x = 120 + (k % 6) * 62, y = 1380 - Math.floor(k / 6) * 0; c.save(); c.translate(x, 1380 - Math.floor(k / 6) * 92); c.scale(kk, kk); tower(c, 0, 0, 46, 80, C.navy, 2390 + k); c.restore(); }
      const gt = pr(T, t_b, 1.4, easeOutBack); tower(c, 760, 1380, 230, 900 * gt, '#D9604F', 2420); apple(c, 760, 1380 - 900 * gt - 70, 55);
      tag(c, 'BOLSA DE COLOMBIA ≈ USD 170.000 MILLONES', 300, 860, { size: 22, bg: C.paper, sc: pb(T, t_b) });
      pill(c, '× 30', 520, 640, { size: 80, sc: pb(T, t_30), col: C.goldL }); c.restore(); }
    // +1 % de Apple en un día ≈ 52.000 millones ≈ un tercio de nuestra bolsa
    const g = pr(T, t_1 - .3, .5); if (g > 0) { c.save(); c.globalAlpha = g;
      pill(c, '+1 % EN UN DÍA', 540, 360, { size: 60, sc: pb(T, t_1), bg: C.green, col: C.paper, lc: C.ink });
      pill(c, '≈ USD 52.000 MILLONES', 540, 500, { size: 54, sc: pb(T, t_52) });
      const cx = 540, cy = 1000, R = 260, fr = 52 / 170, p = pr(T, t_3 - .2, .8, easeIO);
      shp(c, blob(cx, cy, R, R, 2430, { n: 60, amp: .01 }), C.navy, { w: 6, lc: C.ink, seed: 2430 }); tx(c, 'TODA NUESTRA BOLSA', cx, cy + R + 50, { size: 30, f: 'ui' });
      if (p > 0) { const P = [[cx, cy]]; for (let i = 0; i <= 30; i++) { const a = -Math.PI / 2 + i / 30 * fr * TAU * p; P.push([cx + Math.cos(a) * R, cy + Math.sin(a) * R]); } shp(c, P, '#D9604F', { sharp: true, w: 5, lc: C.ink, seed: 2431 }); }
      stamp(c, 'CASI 1/3', 820, 800, T, t_3 + .2, { size: 64, col: C.red, rot: .06 }); c.restore(); }
    tx(c, 'Bolsa de Colombia: WFE (jul. 2026) · cálculo TITÁN', 540, 1540, { size: 24, f: 'ui', al: .8 });
  }); }

// 5 · El giro: 1997, Apple en crisis; Microsoft le invierte USD 150 millones
if (has('giro')) { const s = 'giro', t_97 = As(s, 'mil novecientos noventa'), t_cr = As(s, 'en crisis.'), t_mi = As(s, 'Microsoft,'), t_150 = As(s, 'ciento cincuenta millones');
  const t_in = TK ? As(s, 'Pero aquí viene') : null; if (t_in) hit(t_in + .1, 8, 'ping'); hit(t_97 + .1, 10, 'stamp'); hit(t_cr + .1, 12, 'stamp'); hit(t_mi + .1, 6, 'ping'); hit(t_150 + .2, 12, 'stamp');
  scene(s, 'news', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, 1.0 + .015 * Math.sin(L));
    if (t_in) tx(c, 'PERO AQUÍ VIENE LO INTERESANTE…', 540, 200, { size: 50, col: C.ink, clipP: pr(T, t_in - .1, .6, easeIO), max: 1000 });
    const kn = pb(T, Math.min(t_97 - .3, sec(s).t0 + .3)); if (kn > 0) { c.save(); c.translate(540, 560); c.scale(kn, kn); c.rotate(-.05 + Math.sin(T * 1.5) * .02); newspaper(c, 0, 0, 640, 420, 0, { title: '1997', seed: 2440 });
      if (T > t_cr) { shp(c, R4(-260, -40, 520, 90), C.paper, { sharp: true, w: 3, lc: C.ink, seed: 2441 }); tx(c, 'APPLE, EN CRISIS', 0, 6, { size: 48, col: C.red, sh: null }); } c.restore(); }
    apple(c, 300, 1150, 95 * pb(T, t_cr - .1), Math.sin(T * 3) * .1 * (T < t_150 ? 1 : 0), 2445);
    if (T > t_cr && T < t_150 + .3) for (let k = 0; k < 3; k++) { const u = ((T - t_cr) * .8 + k / 3) % 1; c.save(); c.globalAlpha = 1 - u; tx(c, '↓', 300 + (k - 1) * 70, 1000 + u * 120, { size: 60, col: C.red, sh: null }); c.restore(); }
    const km = pb(T, t_mi - .2); if (km > 0) { c.save(); c.translate(800, 1240); c.scale(km, km); tower(c, 0, 0, 200, 300, C.navy, 2446); c.restore(); tag(c, 'MICROSOFT (SU RIVAL)', 800, 1300, { size: 26, bg: C.paper, sc: km }); }
    if (T > t_150 - .3) { const u = pr(T, t_150 - .2, .9, easeIO); c.save(); c.translate(lerp(760, 380, u), lerp(1000, 1060, u) - Math.sin(u * Math.PI) * 160); c.rotate(-.1); shp(c, R4(-120, -55, 240, 110), '#9CC79A', { sharp: true, w: 4, lc: C.ink, seed: 2447 }); tx(c, '$', 0, 4, { size: 60, col: '#2F5E3A', sh: null }); c.restore();
      pill(c, 'USD 150 MILLONES', 540, 860, { size: 52, sc: pb(T, t_150 + .3) }); }
  }); }

// 6 · TikTok · La lección: nadie sabía; muchas que parecían imparables se quedaron en el camino → diversifican
if (has('leccion')) { const s = 'leccion', t_n = As(s, 'Nadie sabía'), t_im = As(s, 'parecían imparables,'), t_ca = As(s, 'se quedaron en el camino.'), t_g = As(s, 'los grandes inversionistas'), t_d = As(s, 'diversifican.');
  hit(t_n + .1, 6, 'ping'); hit(t_im + .1, 6, 'ping'); hit(t_ca + .2, 12, 'stamp'); hit(t_g + .1, 6, 'ping'); hit(t_d + .1, 16, 'stamp');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, 1.0 + .012 * Math.sin(L));
    tx(c, 'NADIE SABÍA', 540, 210, { size: 90, col: C.ink, clipP: pr(T, Math.min(t_n - .2, sec(s).t0), .5, easeIO) });
    // cinco empresas genéricas: algunas suben, otras caen
    const H = [520, 180, 420, 120, 300], fall = [false, true, false, true, true];
    H.forEach((h, k) => { const x = 160 + k * 190, f = fall[k] && T > t_ca ? pr(T, t_ca + k * .08, .6, easeIn) : 0; c.save(); c.translate(x, 1240); c.rotate(f * (k % 2 ? .9 : -.9)); c.globalAlpha = 1 - f * .5;
      tower(c, 0, 0, 120, h * pb(T, sec(s).t0 + k * .1), [C.navy, C.lav, C.vio, C.goldD, '#3B4466'][k], 2450 + k); c.restore(); tx(c, `EMPRESA ${'ABCDE'[k]}`, x, 1290, { size: 22, f: 'ui', al: 1 - f * .6 });
      if (!fall[k] || T < t_n) tx(c, '?', x, 1240 - h - 60, { size: 70, col: C.goldD, sh: null, al: pr(T, t_n + k * .1, .3) * (T > t_d ? 0 : 1) }); });
    stamp(c, 'SE QUEDARON EN EL CAMINO', 540, 420, T, t_ca + .3, { size: 46, col: C.red, rot: -.03 });
    if (T > t_d) { basket(c, 540, 640, .7 * pb(T, t_d), T, null); stamp(c, 'DIVERSIFICAN', 540, 300, T, t_d + .05, { size: 76, col: C.goldD, rot: .03 }); }
  }); }

// 7 · Cierre (noche): no todos los huevos en la misma canasta; ser dueño de un pedacito; aviso y firma
if (has('cierre')) { const s = 'cierre', t_end = DD.words[DD.words.length - 1][2], t_n = TK ? null : As(s, 'Nadie sabía'), t_d = TK ? null : As(s, 'diversifican.'), t_p = TK ? As(s, 'un pedacito') : null, t_h = TK ? As(s, 'todos los huevos') : null;
  if (t_n) hit(t_n + .1, 6, 'ping'); if (t_d) hit(t_d + .1, 16, 'stamp'); if (t_p) hit(t_p + .1, 8, 'ping'); if (t_h) hit(t_h + .3, 14, 'stamp'); sfx(t_end + .2, 'ping');
  const crack = TK ? t_h + .6 : t_d + .4;
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    if (TK) { tx(c, 'SÉ DUEÑO DE UN PEDACITO', 540, 250, { size: 62, col: C.chalk, sh: C.goldD, clipP: pr(T, sec(s).t0 - .2, .6, easeIO), max: 1000 });
      tx(c, 'DE LAS MÁS GRANDES DEL MUNDO', 540, 340, { size: 50, col: C.gold, sh: null, clipP: pr(T, t_p - .2, .6, easeIO), max: 1000 });
      tx(c, 'NO PONGAS TODOS LOS HUEVOS', 540, 470, { size: 58, col: C.chalk, sh: C.goldD, clipP: pr(T, t_h - .3, .5, easeIO), max: 1000 }); tx(c, 'EN LA MISMA CANASTA', 540, 550, { size: 58, col: C.gold, sh: null, clipP: pr(T, t_h + .3, .5, easeIO) }); }
    else { tx(c, 'NADIE SABÍA', 540, 250, { size: 80, col: C.chalk, sh: C.goldD, clipP: pr(T, Math.min(t_n - .2, sec(s).t0), .5, easeIO) }); tx(c, 'CUÁL SERÍA LA MÁS VALIOSA', 540, 350, { size: 54, col: C.gold, sh: null, clipP: pr(T, t_n + .5, .6, easeIO), max: 1000 });
      stamp(c, 'POR ESO: DIVERSIFICAN', 540, 520, T, t_d, { size: 54, col: C.gold, bg: C.navy, rot: -.03 }); }
    basket(c, 540, 1000, 1.1, T, crack); apple(c, 860, 760, 60, Math.sin(T * 2) * .1);
    if (T > crack) tag(c, 'SI UNO FALLA, LOS DEMÁS SIGUEN', 540, 1200, { size: 32, bg: C.paper, sc: pb(T, crack + .2) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1420, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1490, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada: el gancho ya equilibrado con las 9 Colombias y el titular completo =================
function cover(c) { const t9 = As('gancho', 'más de nueve veces.'); drawScene(c, SC[0], Math.min(t9 + 1.6, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('apple-vs-colombia', cover);
