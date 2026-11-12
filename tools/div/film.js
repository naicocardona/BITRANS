// TITÁN · «Te pagan 100 dólares de dividendos… y te llegan 70» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js)
// Datos: retención 30 % (IRS Pub. 515); Colombia sin tratado de renta con EE. UU. (IRS, tabla 3); ETF domiciliado en Irlanda: 15 % dentro del fondo; acumulativo reinvierte.
// Ejemplo HIPOTÉTICO: USD 100 → 70 (ETF de EE. UU.) vs 85 reinvertidos (ETF irlandés acumulativo). Sin nombres de ETF. Contornos reales: GEO (tools/div/build.sh).
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];

// ---------- piezas ----------
function proj(ring, cx, cy, s, lat0) { const k = Math.cos(lat0 * Math.PI / 180); let mx = 0, my = 0; ring.forEach(p => { mx += p[0]; my += p[1]; }); mx /= ring.length; my /= ring.length; return ring.map(p => [cx + (p[0] - mx) * k * s, cy - (p[1] - my) * s]); }
function country(c, ring, cx, cy, s, lat0, fill, o = {}) { const P = proj(ring, cx, cy, s, lat0); c.save(); if (o.al !== undefined) c.globalAlpha = o.al;
  c.save(); c.translate(8, 10); c.fillStyle = 'rgba(13,16,32,.15)'; c.fill(polyPath(P, true)); c.restore(); shp(c, P, fill, { sharp: true, w: o.w ?? 5, lc: C.ink, seed: o.seed ?? 2101 }); c.restore(); }
function taxOffice(c, x, y, s) { if (s <= 0) return; c.save(); c.translate(x, y); c.scale(s, s);
  shp(c, [[-190, -270], [0, -350], [190, -270]], C.red, { sharp: true, w: 5, lc: C.ink, seed: 2111 }); shp(c, R4(-180, -270, 360, 34), C.paper, { sharp: true, w: 4, lc: C.ink, seed: 2112 });
  for (let k = 0; k < 5; k++) shp(c, R4(-160 + k * 70, -230, 38, 195), C.paper, { sharp: true, w: 4, lc: C.ink, seed: 2113 + k });
  shp(c, R4(-200, -36, 400, 36), C.navy, { sharp: true, w: 4, lc: C.ink, seed: 2119 }); tx(c, 'IRS', 0, -300, { size: 34, f: 'ui', col: C.paper }); c.restore(); }
// billete de USD 100 que se puede partir: cut = fracción que se queda (0,7) y off = cuánto se separa la tajada
function bill100(c, x, y, s, rot, o = {}) { if (s <= 0) return; c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s); const Wb = 520, Hb = 240, cut = o.cut ?? 1, off = o.off ?? 0;
  const draw = (x0, x1, dx, dy, r, val) => { c.save(); c.translate(dx, dy); c.rotate(r); const P = R4(-Wb / 2 + x0 * Wb, -Hb / 2, (x1 - x0) * Wb, Hb);
    shp(c, P, '#9CC79A', { sharp: true, w: 5, lc: C.ink, seed: 2121 + val }); c.save(); c.clip(polyPath(P, true)); ln(c, R4(-Wb / 2 + 20, -Hb / 2 + 18, Wb - 40, Hb - 36).concat([[-Wb / 2 + 20, -Hb / 2 + 18]]), { w: 3, col: '#4E7F55', straight: true, seed: 2124 });
      shp(c, blob(0, 0, 70, 80, 2125, { n: 26 }), '#B8DDB4', { w: 3, lc: '#4E7F55', seed: 2126 }); tx(c, '100', -Wb / 2 + 70, -Hb / 2 + 50, { size: 44, col: '#2F5E3A', sh: null }); tx(c, '100', Wb / 2 - 70, Hb / 2 - 45, { size: 44, col: '#2F5E3A', sh: null }); tx(c, '$', 0, 4, { size: 80, col: '#2F5E3A', sh: null }); c.restore(); c.restore(); };
  if (cut >= 1) draw(0, 1, 0, 0, 0, 0); else { draw(0, cut, 0, 0, 0, 1); draw(cut, 1, off * 260, -off * 120, off * .5, 2); ln(c, [[-Wb / 2 + cut * Wb, -Hb / 2 - 10], [-Wb / 2 + cut * Wb + 8, 0], [-Wb / 2 + cut * Wb - 4, Hb / 2 + 10]], { w: 5, col: C.red, seed: 2127 }); }
  c.restore(); }
function fundBox(c, x, y, s, label, sub, T, o = {}) { if (s <= 0) return; card(c, x, y, o.w ?? 380, o.h ?? 250, { sc: s, band: o.band || C.vio, seed: o.seed ?? 2131, rot: o.rot ?? 0, draw: cc => {
  tx(cc, label, 0, -88, { size: 30, f: 'ui', col: C.paper }); tx(cc, sub, 0, 10, { size: 52, col: C.ink, sh: C.gold });
  for (let k = 0; k < 6; k++) { const a = T * 1.5 + k; cc.save(); cc.globalAlpha = .9; cc.fillStyle = [C.gold, C.green, C.red, C.lav][k % 4]; cc.fillRect(-140 + k * 52, 70 + Math.sin(a) * 6, 34, 26); cc.restore(); } } }); }
function glass(c, x, y, lvl, col, label, val, T) { const Wg = 210, Hg = 420; c.save(); c.translate(x, y);
  const P = [[-Wg / 2, -Hg], [Wg / 2, -Hg], [Wg / 2 - 20, 0], [-Wg / 2 + 20, 0]]; shp(c, P, 'rgba(255,255,255,.55)', { sharp: true, w: 6, lc: C.ink, seed: 2141 + val });
  if (lvl > 0) { const h = Hg * lvl, wob = Math.sin(T * 4) * 5; c.save(); c.clip(polyPath(P, true)); shp(c, [[-Wg, -h + wob], [0, -h - wob], [Wg, -h + wob], [Wg, 10], [-Wg, 10]], col, { w: 4, lc: C.ink, seed: 2142 + val, hatch: shade(col, .6), hal: .3 }); c.restore(); }
  tx(c, label, 0, 50, { size: 30, f: 'ui', max: 300 }); c.restore(); }
function person2(c, x, y, s, T, o = {}) { person(c, x, y, s, { seed: o.seed ?? 31, shirt: o.shirt || C.lav, ...idle(T), ...o }); }

// ================= escenas =================
// 1 · Gancho: titular desde el primer cuadro; el billete de USD 100 se parte y una tajada vuela al IRS
{ const s = 'gancho', t_l = As(s, 'te llegan setenta.'), t_r = TK ? As(s, '¿Dónde quedó') : null;
  hit(.05, 8, 'stamp'); hit(t_l + .1, 16, 'stamp'); if (t_r) hit(t_r + .1, 8, 'ping');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 940], [t_l, 940], [t_l + .6, 900]]), key(T, [[0, 1.0], [t_l, 1.0], [t_l + .6, 1.05]]) + .012 * Math.sin(L * 1.3));
    tx(c, 'TE PAGAN USD 100', 540, 210, { size: 84, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }), max: 1000 });
    tx(c, '…Y TE LLEGAN 70', 540, 320, { size: 84, col: C.red, sh: C.ink, sc: T > t_l ? 1 + settle(T, t_l, { amp: .18, freq: 3, decay: 5 }) : 1, max: 1000 });
    const cut = T > t_l ? .7 : 1, off = pr(T, t_l, .9, easeOutQuint);
    bill100(c, 540, 640 + Math.sin(T * 2) * 8, pb(T, -.3), -.04, { cut, off });
    if (T > t_l) { pill(c, '−30 %', 880, 470, { size: 56, sc: pb(T, t_l + .2), bg: C.red, col: C.paper, lc: C.ink }); arrow(c, [820, 580], [880, 1080], pr(T, t_l + .3, .5), { bend: -60, w: 8, col: C.red }); }
    taxOffice(c, lerp(1250, 880, pr(T, t_l - .3, .5, easeOutBack)), 1430, .8);
    person2(c, 260, 1440, .95, T, { look: 1, mouth: T > t_l ? 'o' : 'grin', brow: T > t_l ? 1 : 0, armR: T < t_l ? [2.4, .4] : [1.2, 1.1], sweat: T > t_l + .4 ? T : 0, prop: (cc, hL, hR) => { if (T > t_l) { shp(cc, R4(hR[0] - 40, hR[1] - 80, 80, 130), C.navy, { sharp: true, w: 3, lc: C.ink, seed: 2150 }); tx(cc, '70', hR[0], hR[1] - 16, { size: 30, f: 'ui', col: C.gold }); } } });
    if (t_r) stamp(c, '¿Y EL RESTO?', 540, 930, T, t_r + .05, { size: 64, col: C.red, rot: -.04 });
  }); }

// 2 · La regla: dividendos de EE. UU. a Colombia; el IRS retiene 30 %; sin tratado de impuestos
{ const s = 'regla', t0 = sec(s).t0, t_nv = As(s, TK ? 'Si no vives' : 'Si no vives'), t_30 = As(s, 'treinta por ciento'), t_co = As(s, 'Colombia no tiene'), t_tr = As(s, 'tratado de impuestos');
  const t_reb = TK ? As(s, 'no hay rebaja.') : As(s, 'que lo rebaje.');
  hit(t_nv + .1, 6, 'ping'); hit(t_30 + .2, 14, 'stamp'); hit(t_co + .1, 6, 'ping'); hit(t_tr + .2, 8, 'stamp'); hit(t_reb + .1, 12, 'stamp');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, 1.0 + .012 * Math.sin(L));
    country(c, GEO.usa, 720, 470, 9.5, 38, C.navy, { seed: 2161 }); tx(c, 'EE. UU.', 720, 640, { size: 34, f: 'ui', al: pb(T, t0) });
    country(c, GEO.col, 300, 1130, 20, 4, C.gold, { seed: 2162 }); tx(c, 'COLOMBIA · TÚ', 300, 1340, { size: 32, f: 'ui', al: pb(T, t0) });
    // monedas de dividendos que viajan de EE. UU. a Colombia; en el peaje del IRS se queda una parte
    for (let k = 0; k < 6; k++) { const u = ((T - t0) * .45 + k / 6) % 1; if (T < t0) break; const x = lerp(680, 340, u), y = lerp(560, 1020, u) - Math.sin(u * Math.PI) * 120, gone = T > t_30 && u > .5 && k % 3 === 0;
      if (gone) continue; c.save(); c.translate(x, y); shp(c, blob(0, 0, 26, 26, 2170 + k, { n: 18, amp: .02 }), C.gold, { w: 3, lc: C.ink, seed: 2170 + k }); tx(c, '$', 0, 2, { size: 26, col: C.goldD, sh: null }); c.restore(); }
    const kg = pb(T, t_30 - .3); if (kg > 0) { c.save(); c.translate(560, 800); c.scale(kg, kg); shp(c, R4(-110, -70, 220, 140), C.red, { w: 5, lc: C.ink, seed: 2180 }); tx(c, 'IRS', 0, -28, { size: 30, f: 'ui', col: C.paper }); tx(c, '−30 %', 0, 26, { size: 46, col: C.paper, sh: null }); c.restore(); }
    stamp(c, 'RETENCIÓN DEL 30 %', 540, 240, T, t_30 + .2, { size: 60, col: C.red, rot: -.03 });
    const kt = pb(T, t_tr - .2); if (kt > 0) { card(c, 790, 1120, 320, 230, { sc: kt, rot: .04, seed: 2185, draw: cc => { tx(cc, 'TRATADO', 0, -70, { size: 32, f: 'ui' }); tx(cc, 'COLOMBIA · EE. UU.', 0, -20, { size: 22, f: 'ui', col: '#5C6075' }); squiggleText(cc, -120, 20, 240, 2, { color: '#8A8D9C', seed: 2186, lineH: 26, amp: 2, width: 2 }); } });
      const p = pr(T, t_tr + .3, .35); ln(c, [[650, 1020], [930, 1220]], { w: 14, col: C.red, p, seed: 2187 }); ln(c, [[930, 1020], [650, 1220]], { w: 14, col: C.red, p: pr(T, t_tr + .45, .35), seed: 2188 }); }
    stamp(c, 'SIN REBAJA', 790, 1330, T, t_reb + .05, { size: 50, col: C.red, rot: .05 });
    tx(c, 'Fuente: IRS · Publicación 515 y lista de tratados de renta', 540, 1530, { size: 24, f: 'ui', al: .8 });
  }); }

// 3 · Irlanda: el fondo domiciliado en Irlanda paga 15 %, no 30; el acumulativo reinvierte
{ const s = 'irlanda', t0 = sec(s).t0, t_pm = As(s, TK ? '¿Hay forma' : '¿Se puede pagar'), t_ir = As(s, 'domiciliados en Irlanda.'), t_15 = As(s, 'quince por ciento,'), t_no = As(s, 'no treinta.'), t_ac = As(s, 'acumulativ'), t_re = As(s, 'reinvierte los dividendos');
  hit(t_pm + .1, 6, 'ping'); hit(t_ir + .2, 10, 'stamp'); hit(t_15 + .2, 12, 'stamp'); hit(t_no + .1, 8, 'stamp'); hit(t_ac + .2, 8, 'ping'); hit(t_re + .2, 10, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, key(T, [[0, 1.0], [t_15, 1.0], [t_15 + .5, 1.04]]) + .012 * Math.sin(L));
    tx(c, '¿SE PUEDE PAGAR MENOS?', 540, 210, { size: 72, col: C.ink, clipP: pr(T, t0 - .3, .5, easeIO), max: 1000 });
    country(c, GEO.usa, 250, 520, 5.5, 38, C.navy, { seed: 2191, w: 3 }); tx(c, 'EMPRESAS DE EE. UU.', 250, 640, { size: 24, f: 'ui' });
    const ki = pr(T, t_ir - .5, .6); if (ki > 0) { country(c, GEO.irl, 820, 520, 52 * pb(T, t_ir - .5), 53, '#7FA88E', { seed: 2192 }); tx(c, 'IRLANDA', 820, 700, { size: 34, f: 'ui', al: ki }); }
    arrow(c, [380, 520], [690, 520], pr(T, t_ir, .6), { bend: -50, w: 9, col: C.goldD });
    fundBox(c, 820, 900, pb(T, t_ir + .2), 'ETF DOMICILIADO EN IRLANDA', 'FONDO', T, { band: '#4F7A63' });
    // comparación de retención: 30 % tachado → 15 %
    const k3 = pb(T, t_15 - .3); if (k3 > 0) { pill(c, '30 %', 260, 900, { size: 70, sc: k3, bg: C.red, col: C.paper, lc: C.ink, top: 'ETF DE EE. UU.' }); if (T > t_no) { ln(c, [[160, 860], [360, 940]], { w: 12, col: C.ink, p: pr(T, t_no, .3), seed: 2195 }); } }
    pill(c, '15 %', 820, 1130, { size: 90, sc: pb(T, t_15), col: C.goldL, top: 'LO PAGA EL FONDO' });
    // acumulativo: flecha que regresa al fondo
    if (T > t_ac - .2) { const p = pr(T, t_re, .8); tag(c, 'VERSIÓN ACUMULATIVA (ACC)', 540, 1320, { size: 32, bg: C.gold, sc: pb(T, t_ac - .1) });
      const P = []; for (let i = 0; i <= 30; i++) { const a = -Math.PI * .1 + i / 30 * Math.PI * 1.6; P.push([820 + Math.cos(a) * 260, 900 + Math.sin(a) * 200]); } ln(c, P, { w: 8, col: C.green, p, seed: 2196 });
      if (p > .95) tx(c, 'SE REINVIERTE', 540, 1420, { size: 44, f: 'hand', col: C.green, sh: null, sc: pb(T, t_re + .8) }); }
    person2(c, 170, 1460, .7, T, { look: 1, mouth: T > t_15 ? 'grin' : 'smile', armR: T > t_15 ? [2.4, .4] : [.3, .2] });
  }); }

// 4 · TikTok · Ejemplo hipotético: USD 100 → 70 (EE. UU.) vs 85 reinvertidos (Irlanda acumulativo)
if (has('ejemplo')) { const s = 'ejemplo', t_100 = As(s, 'cien dólares'), t_70 = As(s, 'te quedan setenta.'), t_85 = As(s, 'ochenta y cinco.');
  hit(t_100 + .1, 8, 'stamp'); hit(t_70 + .2, 10, 'stamp'); hit(t_85 + .2, 14, 'stamp');
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, key(T, [[0, 1.0], [t_85, 1.0], [t_85 + .5, 1.04]]) + .012 * Math.sin(L));
    tag(c, 'EJEMPLO HIPOTÉTICO', 540, 175, { size: 30, bg: C.gold });
    bill100(c, 540, 400, pb(T, sec(s).t0 - .2) * .6, 0);
    pill(c, 'USD 100 DE DIVIDENDOS', 540, 560, { size: 40, f: 'ui', sc: pb(T, t_100) });
    const l1 = pr(T, t_70 - .5, 1.0, easeIO) * .7, l2 = pr(T, t_85 - .5, 1.0, easeIO) * .85;
    glass(c, 300, 1250, l1, C.goldL, 'ETF DE EE. UU.', 1, T); glass(c, 780, 1250, l2, '#7FA88E', 'IRLANDA · ACC', 2, T);
    pill(c, '70', 300, 740, { size: 80, sc: pb(T, t_70), top: 'TE LLEGAN' }); pill(c, '85', 780, 740, { size: 90, sc: pb(T, t_85), col: C.goldL, top: 'SE REINVIERTEN' });
    if (T > t_85) { const P = []; for (let i = 0; i <= 20; i++) { const a = Math.PI * (1.1 + i / 20 * .8); P.push([780 + Math.cos(a) * 170, 860 + Math.sin(a) * 120]); } ln(c, P, { w: 7, col: C.green, p: pr(T, t_85 + .2, .6), seed: 2201 }); }
    tx(c, 'Retención: 30 % (ETF de EE. UU.) · 15 % dentro del fondo (Irlanda)', 540, 1530, { size: 24, f: 'ui', al: .85 });
  }); }

// 5 · Ojo: no es pagar cero (15 % adentro del fondo) y en Colombia igual se declara
{ const s = 'ojo', t_c = As(s, 'no es pagar cero.'), t_d = As(s, 'dentro del fondo'), t_co = As(s, 'en Colombia igual declaras'), t_v = TK ? As(s, 'cuando vendes.') : null;
  hit(t_c + .1, 16, 'stamp'); hit(t_d + .1, 8, 'ping'); hit(t_co + .1, 8, 'stamp'); if (t_v) hit(t_v + .1, 8, 'ping');
  scene(s, TK ? 'wipe' : 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, 1.0 + .012 * Math.sin(L * 1.1));
    tx(c, 'PERO OJO…', 540, 210, { size: 80, col: C.ink, clipP: pr(T, sec(s).t0 - .4, .4, easeIO) });
    stamp(c, 'NO ES PAGAR CERO', 540, 360, T, t_c, { size: 72, col: C.red, rot: -.04 });
    fundBox(c, 320, 680, pb(T, sec(s).t0 - .2), 'ETF IRLANDÉS ACC', 'FONDO', T, { band: '#4F7A63' });
    pill(c, '−15 % ADENTRO', 320, 880, { size: 46, f: 'ui', sc: pb(T, t_d), bg: C.red, col: C.paper, lc: C.ink });
    const kc = pr(T, t_co - .4, .5); if (kc > 0) { country(c, GEO.col, 790, 800, 15 * kc, 4, C.gold, { seed: 2211 });
      card(c, 790, 1130, 360, 230, { sc: pb(T, t_co), rot: .03, band: C.navy, seed: 2212, draw: cc => { tx(cc, 'DECLARACIÓN', 0, -80, { size: 28, f: 'ui', col: C.gold }); tx(cc, '✓ tu inversión', -140, -10, { size: 32, f: 'hand', align: 'left', sh: null }); if (TK) tx(cc, '✓ la ganancia al vender', -140, 50, { size: 32, f: 'hand', align: 'left', sh: null, al: t_v ? pr(T, t_v, .3) : 1 }); } }); }
    person2(c, 250, 1460, .78, T, { look: 1, mouth: T > t_c ? 'o' : 'smile', brow: T > t_c ? 1 : 0 });
  }); }

// 6 · TikTok · Bono: los ETF irlandeses no son activos de EE. UU. → no cuentan para el impuesto de herencia (guiño al video anterior)
if (has('bono')) { const s = 'bono', t_b = As(s, 'hay un bono:'), t_na = As(s, 'no son activos'), t_h = As(s, 'impuesto de herencia');
  hit(t_b + .1, 8, 'ping'); hit(t_na + .2, 8, 'stamp'); hit(t_h + .1, 14, 'stamp');
  scene(s, 'news', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 930, 1.0 + .012 * Math.sin(L));
    tx(c, 'Y HAY UN BONO', 540, 210, { size: 84, col: C.gold, sh: C.ink, sc: pb(T, t_b - .2) });
    fundBox(c, 320, 620, pb(T, sec(s).t0 - .1), 'ETF IRLANDÉS', 'FONDO', T, { band: '#4F7A63' });
    tag(c, 'NO ES UN ACTIVO DE EE. UU.', 320, 820, { size: 30, bg: C.paper, sc: pb(T, t_na) });
    taxOffice(c, 780, 1050, .75 * pb(T, t_na - .2)); if (T > t_h) { const p = pr(T, t_h, .35); ln(c, [[620, 760], [940, 1080]], { w: 16, col: C.red, p, seed: 2221 }); ln(c, [[940, 760], [620, 1080]], { w: 16, col: C.red, p: pr(T, t_h + .15, .35), seed: 2222 }); }
    stamp(c, 'NO CUENTA PARA EL IMPUESTO DE HERENCIA', 540, 1250, T, t_h + .2, { size: 38, col: C.red, rot: -.03 });
    tag(c, 'VE NUESTRO VIDEO DE HERENCIA', 540, 1380, { size: 28, bg: C.gold, sc: pb(T, t_h + .7) });
    person2(c, 170, 1470, .66, T, { look: 1, mouth: 'grin', jump: T > t_h + .3 && T < t_h + 1.5 ? Math.abs(Math.sin(T * 6)) * 10 : 0 });
  }); }

// 7 · Cierre (noche): revisa dónde está domiciliado tu ETF + asesoría + aviso
{ const s = 'cierre', t_r = As(s, 'revisa dónde'), t_as = As(s, 'Asesórate'), t_dp = As(s, 'los dos países'), t_end = DD.words[DD.words.length - 1][2], t_cq = TK ? As(s, 'cuánto te queda.') : null;
  hit(t_r + .1, 8, 'stamp'); if (t_cq) hit(t_cq + .1, 8, 'ping'); hit(t_as + .1, 6, 'ping'); hit(t_dp + .1, 10, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, 'ANTES DE COMPRAR, REVISA', 540, 260, { size: 60, col: C.chalk, sh: C.goldD, clipP: pr(T, sec(s).t0 - .3, .5, easeIO), max: 1000 });
    tx(c, 'DÓNDE ESTÁ DOMICILIADO', 540, 360, { size: 66, col: C.gold, sh: null, clipP: pr(T, t_r, .6, easeIO), max: 1000 });
    tx(c, 'TU ETF', 540, 460, { size: 80, col: C.gold, sh: null, clipP: pr(T, t_r + .5, .5, easeIO) });
    // ficha del fondo con la lupa sobre «domicilio»
    const kf = pb(T, sec(s).t0); if (kf > 0) { card(c, 540, 760, 620, 300, { sc: kf, band: C.navy2, seed: 2231, draw: cc => { tx(cc, 'FICHA DEL ETF', 0, -115, { size: 28, f: 'ui', col: C.gold }); tx(cc, 'Domicilio:', -240, -20, { size: 40, f: 'ui', align: 'left' });
        const opts = ['IRLANDA', 'EE. UU.'], i = Math.floor((T * 1.2) % 2); tx(cc, opts[i], 60, -20, { size: 44, f: 'ui', align: 'left', col: i ? C.red : C.green }); tx(cc, 'Clase: ACC o DIST', -240, 60, { size: 34, f: 'ui', align: 'left', col: '#5C6075' }); } });
      const mx = 640 + Math.sin(T * 1.5) * 40; c.save(); c.translate(mx, 760); shp(c, blob(0, 0, 70, 70, 2232, { n: 30, amp: .01 }), 'rgba(255,255,255,.25)', { w: 8, lc: C.gold, seed: 2232 }); ln(c, [[50, 50], [120, 130]], { w: 16, col: C.gold, seed: 2233 }); c.restore(); }
    tx(c, 'Y ASESÓRATE CON UN EXPERTO', 540, 1060, { size: 52, col: C.chalk, sh: C.goldD, clipP: pr(T, t_as, .6, easeIO), max: 1000 });
    tx(c, 'EN LOS DOS PAÍSES', 540, 1140, { size: 52, col: C.gold, sh: null, clipP: pr(T, t_dp - .3, .4, easeIO) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión', 540, 1395, { size: 28, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'ni asesoría tributaria o legal.', 540, 1435, { size: 28, f: 'ui', col: C.chalk, al: ke }); tx(c, 'TITÁN HOLDING', 540, 1500, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada: el gancho ya partido (titular completo) =================
function cover(c) { const tl = As('gancho', 'te llegan setenta.'); drawScene(c, SC[0], Math.min(tl + 1.2, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('dividendos-irlanda', cover);
