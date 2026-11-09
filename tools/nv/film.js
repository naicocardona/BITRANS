// TITÁN · «Wall Street subió. Nvidia cayó.» (9 nov 2026) · Short (sh) y TikTok (tk) · estilo híbrido (tools/hd_lib.js), paleta del brief: navy, marfil y dorado.
// Cuidado editorial: sin imágenes de la relación, sin terceros, sin estética de espionaje; Huang no se dibuja (silla con placa «CEO»). Nvidia no es posición de TITÁN.
'use strict';
const TK = MODE === 'tk';
Object.assign(C, { paper: '#F6F4EF', chalk: '#F6F4EF', gold: '#C8A45D', navy: '#0D1020', red: '#D9604F', blobA: '#ECE3CB', blobB: '#E4DDD0', blobN: '#232845' });
const sec = id => SEC[id];

// ---------- piezas propias ----------
function bigArrow(c, x, y0, y1, p, col, w = 34) { if (p <= 0) return; const y = lerp(y0, y1, p), d = Math.sign(y1 - y0);
  ln(c, [[x, y0], [x, y]], { w, col, seed: 501, taper: 0, straight: true }); ln(c, [[x - 58, y - d * 56], [x, y + d * 10], [x + 58, y - d * 56]], { w: w * .8, col, seed: 502, taper: 0, straight: true }); }
function chair(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s);
  shp(c, [[-90, -330], [90, -330], [80, -110], [-80, -110]], '#4A5274', { w: 6, lc: C.chalk, seed: 511 }); shp(c, [[-110, -120], [110, -120], [100, -60], [-100, -60]], '#3B4466', { w: 6, lc: C.chalk, seed: 512 });
  for (const dx of [-80, 80]) ln(c, [[dx, -60], [dx * 1.1, 0]], { w: 9, col: C.chalk, seed: 513 + dx }); c.restore(); }
function nameplate(c, x, y, s, txt) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, [[-150, 0], [150, 0], [130, -70], [-130, -70]], C.gold, { w: 5, lc: C.ink, seed: 521 });
  tx(c, txt, 0, -34, { size: 46, col: C.ink, sh: null }); c.restore(); }
function spot(c, x0, y0, x1, y1, w, al) { c.save(); c.globalAlpha = al; c.fillStyle = C.goldL; c.beginPath(); c.moveTo(x0 - 18, y0); c.lineTo(x0 + 18, y0); c.lineTo(x1 + w, y1); c.lineTo(x1 - w, y1); c.closePath(); c.fill();
  c.beginPath(); c.ellipse(x1, y1, w, w * .22, 0, 0, TAU); c.fill(); c.restore(); }
function building(c, x, y, s, o = {}) { c.save(); c.translate(x, y); c.rotate(o.rot ?? 0); c.scale(s, s);
  shp(c, R4(-130, -360, 260, 360), C.navy, { sharp: true, w: 5, lc: C.ink, seed: 531 });
  for (let r = 0; r < 5; r++) for (let q = 0; q < 3; q++) { c.save(); c.fillStyle = (r + q) % 3 ? C.goldL : C.gold; c.globalAlpha = .9; c.fillRect(-100 + q * 72, -330 + r * 62, 52, 38); c.restore(); }
  if (o.lab) tag(c, o.lab, 0, -400, { size: 30, bg: C.paper }); c.restore(); }
function safe(c, x, y, s, T) { c.save(); c.translate(x, y); c.scale(s, s);
  shp(c, R4(-200, -200, 400, 400), C.navy2, { sharp: true, w: 7, lc: C.chalk, seed: 541 }); shp(c, R4(-170, -170, 340, 340), null, { sharp: true, w: 3, lc: C.chalk, seed: 542, fa: 0 });
  c.save(); c.rotate(T * .6); shp(c, blob(0, 0, 80, 80, 5, { n: 30, amp: .01 }), C.gold, { w: 5, lc: C.chalk, seed: 543 }); for (let k = 0; k < 12; k++) { const a = k / 12 * TAU; ln(c, [[Math.cos(a) * 60, Math.sin(a) * 60], [Math.cos(a) * 76, Math.sin(a) * 76]], { w: 3, col: C.ink, seed: 544 + k }); } c.restore();
  ln(c, [[120, -40], [150, -40], [150, 40], [120, 40]], { w: 10, col: C.chalk, seed: 556 }); c.restore(); }
function node(c, x, y, r, lab, o = {}) { const k = o.sc ?? 1; if (k <= 0) return; c.save(); c.translate(x, y); c.scale(k, k); c.globalAlpha = o.al ?? 1;
  shp(c, blob(0, 0, r, r, o.seed ?? 3, { n: 28, amp: .03 }), o.fill || C.paper, { w: 5, lc: o.lc || C.ink, seed: o.seed ?? 3 }); if (lab) tx(c, lab, 0, r + 28, { size: o.ls || 26, f: 'ui', col: o.tc || C.ink }); if (o.icon) o.icon(c); c.restore(); }
function personIcon(c, s, col) { c.save(); c.scale(s, s); c.fillStyle = col; c.beginPath(); c.arc(0, -14, 13, 0, TAU); c.fill(); c.beginPath(); c.ellipse(0, 16, 20, 14, 0, Math.PI, 0); c.fill(); c.restore(); }
function heads(c, y, T, n = 9) { for (let k = 0; k < n; k++) { const x = 70 + k * 118, b = Math.sin(T * 2 + k) * 4; c.save(); c.fillStyle = C.navy; c.beginPath(); c.arc(x, y - 40 + b, 34, 0, TAU); c.fill(); c.beginPath(); c.ellipse(x, y + 30 + b, 56, 46, 0, Math.PI, 0); c.fill(); c.restore(); } }
function flash(c, x, y, T, t0) { if (T < t0 || T > t0 + .35) return; const u = (T - t0) / .35; c.save(); c.globalAlpha = 1 - u; c.fillStyle = '#FFFFFF'; c.beginPath(); for (let k = 0; k < 8; k++) { const a = k / 8 * TAU, r = k % 2 ? 18 : 60 * (1 + u); c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } c.closePath(); c.fill(); c.restore(); }

// ================= escenas =================
// 1 · Gancho: pantalla partida S&P 500 +2,3 % / NVIDIA −4,3 % desde el primer cuadro; luego los reflectores sobre la silla del director
{ const s = 'gancho', t_sp = As(s, 'Wall Street subió.'), t_nv = As(s, 'Envidia cayó.'), t_m = As(s, 'Y mientras pasaba eso,'), t_r = As(s, 'bajo los reflectores'), t_d = As(s, 'por su director.');
  hit(t_sp + .15, 8, 'stamp'); hit(t_nv + .15, 14); sfx(t_m, 'whoosh'); hit(t_r + .1, 6, 'ping'); hit(t_d + .2, 8, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); const st = pr(T, t_m, .7, easeOutQuint); camS(c, T, 540, lerp(960, 1010, st), 1 + .012 * Math.sin(L * 1.4));
    resetT(c); c.save(); c.fillStyle = C.navy; c.beginPath(); c.moveTo(0, 0); c.lineTo(540, 0); for (let y = 0; y <= 1920; y += 60) c.lineTo(540 + Math.sin(y * .05) * 6, y); c.lineTo(0, 1920); c.closePath(); c.fill(); c.restore();
    camS(c, T, 540, lerp(960, 1010, st), 1 + .012 * Math.sin(L * 1.4));
    ln(c, dens([[540, 0], [540, 1920]], 60).map(([x, y]) => [x + Math.sin(y * .05) * 6, y]), { w: 10, col: C.gold, seed: 560 });
    tag(c, 'CIERRE · 9 NOV. 2026', 540, 170, { size: 34, bg: C.gold });
    tx(c, 'S&P 500', 270, 320, { size: 74, col: C.chalk, sh: C.goldD }); tx(c, 'NVIDIA', 810, 320, { size: 74, col: C.ink });
    tx(c, '+2,3 %', 270, 500, { size: 128, col: C.gold, sh: null, sc: 1 + settle(T, t_sp + .15, { amp: .2, freq: 3, decay: 5 }) });
    tx(c, '−4,3 %', 810, 500, { size: 128, col: C.red, sh: C.ink, so: 4, sc: 1 + settle(T, t_nv + .15, { amp: .2, freq: 3, decay: 5 }) });
    tx(c, 'SUBIÓ', 270, 620, { size: 46, f: 'ui', col: C.chalk }); tx(c, 'CAYÓ', 810, 620, { size: 46, f: 'ui', col: C.red });
    bigArrow(c, 270, 1010, 700, .35 + .65 * pr(T, t_sp, .6, easeOutBack), C.gold); bigArrow(c, 810, 700, 1010, .35 + .65 * pr(T, t_nv, .6, easeOutBack), C.red);
    burst(c, 270, 500, T, t_sp + .15, { R: 200 }); burst(c, 810, 500, T, t_nv + .15, { R: 200, col: C.red }); lines(c, 810, 1010, T, t_nv + .4, { col: C.red, r: 60 });
    // escenario: la empresa bajo los reflectores (sin dibujar a ninguna persona real)
    if (st > 0) { c.save(); c.translate(0, (1 - st) * 700);
      shp(c, R4(-20, 1080, 1120, 700), C.navy2, { sharp: true, w: 6, lc: C.gold, seed: 570 });
      const sw = Math.sin((T - t_r) * 1.8) * 60, on = pr(T, t_r, .4);
      spot(c, 60, 1080, 540 + sw, 1380, 170, .45 * on); spot(c, 1020, 1080, 540 - sw, 1380, 170, .45 * on);
      chair(c, 540, 1400, .82); nameplate(c, 540, 1460, .9 * pb(T, t_d), 'CEO');
      heads(c, 1540, T); for (const [x, k] of [[180, 0], [760, 1], [470, 2], [930, 3]]) flash(c, x, 1450, T, t_r + .3 + k * .45);
      c.restore(); }
  }); }
// 2 · Huang reconoció la infidelidad: mensaje a empleados publicado por Nvidia (sin imágenes de la relación)
{ const s = 'admite', t0 = sec(s).t0, t_a = As(s, 'admitió'), t_i = As(s, 'infidelidad.');
  hit(t_a, 8, 'stamp'); hit(t_i + .1, 10);
  scene(s, 'blot', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 900, 1.04 - .04 * pr(T, t0, 1.5, easeOutQuint));
    const fly = pr(T, t0 - .35, .6, easeOutBack); c.save(); c.translate(lerp(1400, 540, fly), 780); c.rotate(lerp(.5, -.03, fly));
    shp(c, R4(-330, -220, 660, 440), C.paper, { sharp: true, w: 6, lc: C.ink, seed: 580 }); shp(c, R4(-330, -220, 660, 80), C.navy, { sharp: true, w: 6, lc: C.ink, seed: 581 });
    tx(c, 'MENSAJE A EMPLEADOS', 0, -180, { size: 34, f: 'ui', col: C.gold });
    squiggleText(c, -290, -100, 580, 6, { color: C.ink, seed: 582, lineH: 44, amp: 3, width: 2.4 }); c.restore();
    card(c, 540, 1180, 820, 290, { sc: pb(T, t_a - .1), bg: C.navy, lc: C.gold, rot: -.02, draw: cc => { tx(cc, 'HUANG RECONOCIÓ', 0, -50, { size: 66, col: C.gold, sh: null, max: 740 }); tx(cc, 'LA INFIDELIDAD', 0, 50, { size: 66, max: 740, col: C.chalk, sh: null, clipP: pr(T, t_i - .1, .5, easeIO) }); } });
    tag(c, 'Mensaje publicado por Nvidia', 540, 1400, { size: 30, bg: C.paper, sc: pb(T, t_i + .3) });
  }); }
// 3 · El consejo abre una investigación independiente tras reportes (no prueba nada por sí sola)
{ const s = 'consejo', t_ac = As(s, 'Pero para un accionista,'), t_va = As(s, 'va más allá:'), t_co = As(s, 'el consejo abrió'), t_in = As(s, 'investigación independiente'),
    t_re = As(s, 'tras reportes'), t_bl = As(s, 'blanco de una operación'), t_ie = As(s, 'inteligencia extranjera.');
  hit(t_ac + .1, 5, 'ping'); hit(t_co + .1, 6); hit(t_in + .1, 12, 'stamp'); sfx(t_re, 'whoosh'); hit(t_bl + .1, 6, 'ping'); hit(t_ie + .3, 8, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, key(T, [[0, 540], [t_co - .2, 470], [t_co + .5, 600], [t_re - .2, 600], [t_re + .4, 540]]), key(T, [[0, 1020], [t_re - .2, 1020], [t_re + .4, 900]]), 1.03 + .015 * Math.sin(L));
    // accionista (persona genérica)
    const kA = pb(T, sec(s).t0 - .3); if (kA > 0) { person(c, 210, 1420, 1.05, { seed: 4, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_va ? 'o' : 'smile', armR: [1.0, 1.4], prop: (cc, hL, hR) => { shp(cc, R4(hR[0] - 18, hR[1] - 50, 36, 62), C.navy, { sharp: true, w: 3, lc: C.ink, seed: 590 }); } });
      tag(c, 'ACCIONISTA', 210, 930, { size: 30, bg: C.paper, sc: pb(T, t_ac) }); }
    if (T > t_va) arrow(c, [340, 1000], [560, 940], pr(T, t_va, .4), { bend: -40, w: 7, col: C.goldD });
    // el consejo: mesa con personas genéricas
    const kB = pb(T, t_co); if (kB > 0) { c.save(); c.translate(780, 1260); c.scale(kB, kB);
      for (let k = 0; k < 4; k++) person(c, -210 + k * 140, -40, .5, { seed: 20 + k, shirt: [C.navy2, C.gold, '#3B4466', C.goldL][k], ...idle(T, k), look: k < 2 ? 1 : -1 });
      shp(c, R4(-300, -120, 600, 150), C.navy, { sharp: true, w: 6, lc: C.gold, seed: 595 }); tx(c, 'CONSEJO', 0, -45, { size: 44, col: C.gold, sh: null });
      c.restore(); }
    pill(c, 'INVESTIGACIÓN INDEPENDIENTE', 540, 250, { size: 50, sc: pb(T, t_in), f: 'ui' }); burst(c, 540, 250, T, t_in + .1, { R: 260 });
    // reportes: periódicos genéricos y tarjeta con lo que dicen (sin estética de espionaje)
    for (let k = 0; k < 2; k++) { const u = pr(T, t_re + k * .2, .5, easeOutBack); if (u > 0) newspaper(c, lerp(1500, 330 + k * 420, u), 480 + k * 30, 360, 250, (k ? .07 : -.06) * u, { title: 'REPORTES', seed: 600 + k }); }
    card(c, 540, 760, 920, 240, { sc: pb(T, t_bl - .2), rot: .01, draw: cc => { tx(cc, 'Según reportes, Huang pudo haber sido', 0, -60, { size: 40, f: 'ui', max: 860 }); tx(cc, 'blanco de una operación de', 0, -5, { size: 40, f: 'ui' });
      tx(cc, 'inteligencia extranjera', 0, 55, { size: 52, col: C.ink, sh: C.gold, clipP: pr(T, t_ie - .1, .5, easeIO) }); } });
    tag(c, 'ABRIR UNA INVESTIGACIÓN NO PRUEBA NADA', 540, 1510, { size: 28, bg: C.gold, sc: pb(T, t_ie + .3) });
  }); }
// 4 · ¿Se filtraron secretos? Sin filtración confirmada (escena navy)
{ const s = 'secretos', t_q = As(s, '¿Se filtraron secretos?'), t_no = As(s, 'Eso no está confirmado.'), t_cd = As(s, 'El consejo dijo'), t_mo = As(s, 'no tenía motivos'), t_cm = As(s, 'comprometidos.');
  hit(t_q + .2, 6, 'ping'); hit(t_no + .1, 14, 'stamp'); hit(t_cd + .1, 6, 'ping'); sfx(t_cm + .2, 'ping');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, key(T, [[0, 1.08], [t_no, 1.0], [t_no + .3, 1.05], [99, 1.03]]) + .01 * Math.sin(L * 1.3));
    tx(c, '¿Se filtraron secretos?', 540, 270, { size: 84, f: 'hand', col: C.chalk, sh: C.goldD, clipP: pr(T, t_q - .1, .7, easeIO) });
    safe(c, 540, 860, 1.0 + .02 * Math.sin(T * 3), T);
    if (T > t_cm) { ln(c, [[470, 860], [520, 910], [620, 800]], { w: 16, col: C.gold, p: pr(T, t_cm + .1, .4), seed: 610 }); }
    stamp(c, 'SIN FILTRACIÓN CONFIRMADA', 540, 480, T, t_no, { size: 58, bg: C.navy, col: C.gold });
    card(c, 540, 1290, 900, 250, { sc: pb(T, t_cd - .1), rot: -.015, draw: cc => { INKC = C.ink; tx(cc, 'EL CONSEJO:', 0, -70, { size: 38, f: 'ui', col: C.goldD });
      tx(cc, '«sin motivos para creer»', 0, -8, { size: 56, col: C.ink, sh: C.gold, clipP: pr(T, t_mo, .5, easeIO) }); tx(cc, 'que se comprometieran secretos', 0, 62, { size: 36, f: 'ui', al: pr(T, t_mo + .5, .4) }); INKC = C.chalk; } });
  }, true); }
// 5 · Cierre del 9 de noviembre: barras opuestas (cifras de cierre, AP)
{ const s = 'cierre9', t_9 = As(s, 'El nueve de noviembre,'), t_nv = As(s, 'cerró cuatro coma tres por ciento abajo'), t_sp = As(s, 'ese ene pe quinientos subió.');
  const t_x1 = TK ? As(s, 'Es un contraste llamativo,') : As(s, 'La caída no nos dice'), t_x2 = TK ? As(s, 'pero no prueba') : As(s, 'qué cambió en el negocio.');
  hit(t_9 + .1, 5, 'ping'); hit(t_nv + .4, 14); hit(t_sp + .4, 10, 'stamp'); hit(t_x1 + .1, 6, 'ping'); hit(t_x2 + .2, 10, 'stamp');
  const Z = 900, K = 85;
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 960, key(T, [[0, 1.0], [t_x1, 1.0], [t_x1 + .5, 1.04], [99, 1.04]]) + .01 * Math.sin(L));
    tag(c, 'CIERRE · 9 NOV. 2026', 540, 210, { size: 36, sc: pb(T, sec(s).t0 - .35) }); tx(c, 'Mismo día, direcciones opuestas', 540, 320, { size: 58, f: 'hand', clipP: pr(T, t_9, .7, easeIO) });
    ln(c, [[90, Z], [990, Z]], { w: 7, seed: 620, straight: true });
    const gs = pr(T, t_sp, .7, easeOutBack), gn = pr(T, t_nv, .7, easeOutBack);
    if (gs > .01) shp(c, R4(200, Z - 2.3 * K * gs, 200, 2.3 * K * gs), C.gold, { sharp: true, w: 5, lc: C.ink, seed: 621, hatch: C.goldD, hal: .4 });
    if (gn > .01) shp(c, R4(680, Z, 200, 4.3 * K * gn), C.red, { sharp: true, w: 5, lc: C.ink, seed: 622, hatch: '#8E3428', hal: .4 });
    pill(c, 'S&P 500 +2,3 %', 300, Z - 2.3 * K - 90, { size: 50, sc: pb(T, t_sp + .3) }); pill(c, 'NVIDIA −4,3 %', 780, Z + 4.3 * K + 90, { size: 50, sc: pb(T, t_nv + .3), col: C.red, lc: C.red });
    burst(c, 780, Z + 4.3 * K, T, t_nv + .4, { R: 220, col: C.red }); burst(c, 300, Z - 2.3 * K, T, t_sp + .4, { R: 200 });
    if (TK) { ring(c, 540, Z, 470, 330, pr(T, t_x1, .6), { col: C.goldD, w: 6 });
      const kn = pb(T, t_x2 - .1); if (kn > 0) { c.save(); c.translate(300, 1180); c.scale(kn, kn); newspaper(c, 0, 0, 300, 210, -.05, { title: '1 NOTICIA', seed: 630 }); c.restore();
        arrow(c, [420, 1170], [660, 1150], pr(T, t_x2, .4), { bend: 40, w: 6 }); if (T > t_x2 + .4) { ln(c, [[520, 1110], [580, 1190]], { w: 12, col: C.red, seed: 631 }); ln(c, [[580, 1110], [520, 1190]], { w: 12, col: C.red, seed: 632 }); } }
      tag(c, 'NO PRUEBA LA CAUSA', 300, 1350, { size: 32, sc: pb(T, t_x2 + .5) }); }
    else { const kb = pb(T, t_x1); if (kb > 0) { c.save(); c.translate(300, 1360); c.scale(kb * .8, kb * .8); building(c, 0, 0, 1, { lab: 'EL NEGOCIO' }); c.restore(); }
      tx(c, '?', 470, 1080, { size: 150, f: 'hand', col: C.gold, sh: C.ink, sc: pb(T, t_x2) * (1 + .06 * Math.sin(T * 6)) });
      tag(c, 'LA CAÍDA SOLA NO LO EXPLICA', 300, 1440, { size: 28, sc: pb(T, t_x2 + .3) }); }
    tx(c, 'Fuente: AP · cifras de cierre', 540, 1530, { size: 24, f: 'ui', al: .65 });
  }); }
// 6 · TikTok: ejemplo hipotético con dos organigramas
if (TK) { const s = 'ejemplo', t0 = sec(s).t0, t_d = As(s, 'imagina dos empresas.'), t_cl = As(s, 'En una, los clientes,'), t_de = As(s, 'las decisiones'), t_es = As(s, 'y la estrategia'), t_fu = As(s, 'dependen mucho del fundador.'),
    t_ot = As(s, 'En la otra, hay un equipo'), t_fa = As(s, 'si esa persona falta.'), t_ti = As(s, 'El mismo titular'), t_ri = As(s, 'riesgos muy distintos');
  hit(t_d + .1, 6, 'ping'); [t_cl, t_de, t_es].forEach(t => sfx(t + .05, 'ping')); hit(t_fu + .2, 8, 'stamp'); hit(t_ot + .2, 8); hit(t_fa + .2, 14); sfx(t_ti, 'whoosh'); hit(t_ri + .1, 10, 'stamp');
  const AX = 270, BX = 810, CY0 = 760;
  const aN = [[-170, -150, 'CLIENTES', 0], [170, -150, 'DECISIONES', 1], [-185, 150, 'ESTRATEGIA', 2], [185, 150, '', 3], [0, 250, '', 4]];
  const bN = [[-160, -170], [160, -170], [-190, 70], [190, 70], [-90, 240], [90, 240]], bE = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [0, 3], [1, 2], [2, 5], [3, 4]];
  scene(s, 'news', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 960, 1.0 + .012 * Math.sin(L * 1.2));
    tag(c, 'EJEMPLO HIPOTÉTICO', 540, 170, { size: 36, bg: C.gold });
    const kp = pb(T, Math.min(t_d, t0)); for (const [x, lab] of [[AX, 'EMPRESA A'], [BX, 'EMPRESA B']]) { c.save(); c.translate(x, CY0); c.scale(kp, kp); shp(c, R4(-250, -400, 500, 800), C.paper, { sharp: true, w: 5, lc: C.ink, seed: 640 + x % 7 }); tx(c, lab, 0, -350, { size: 40, f: 'ui' }); c.restore(); }
    const gone = pr(T, t_fa, .5), fe = 1 - .75 * gone;
    // A: todo pasa por el fundador
    const aOn = [t_cl, t_de, t_es, t_fu - .3, t_fu - .1];
    aN.forEach(([dx, dy, lab, k]) => { const kk = pb(T, aOn[k]); if (kk <= 0) return; const lp = pr(T, Math.max(t_fu, aOn[k]), .5);
      if (lp > 0) ln(c, [[AX + dx * lp, CY0 + dy * lp], [AX, CY0]].reverse(), { w: 6, col: gone > .5 ? C.red : C.goldD, p: lp, seed: 650 + k, al: gone > .5 ? .5 : 1 });
      node(c, AX + dx, CY0 + dy + (gone > 0 ? Math.sin(T * 9 + k) * 6 * gone : 0), 34, lab, { sc: kk, seed: 660 + k, ls: 22, icon: cc => personIcon(cc, .9, C.navy) }); });
    node(c, AX, CY0, 64, 'FUNDADOR', { sc: pb(T, t_cl - .2), fill: C.gold, seed: 670, ls: 26, al: fe, icon: cc => personIcon(cc, 1.8, C.ink) });
    if (gone > 0) tag(c, 'TODO SE DETIENE', AX, CY0 + 330, { size: 26, bg: C.red, col: C.chalk, sc: pb(T, t_fa + .2) });
    // B: decisiones repartidas en un equipo
    const kb = pr(T, t_ot, 1.2); bE.forEach(([i, j], e) => { const p = cl01(kb * 1.6 - e * .06); if (p > 0) ln(c, [[BX + bN[i][0], CY0 + bN[i][1]], [BX + bN[j][0], CY0 + bN[j][1]]], { w: 5, col: C.goldD, p, seed: 680 + e }); });
    bN.forEach(([dx, dy], k) => node(c, BX + dx, CY0 + dy, 34, k === 0 ? 'EQUIPO' : '', { sc: pb(T, t_ot + k * .1), seed: 690 + k, ls: 22, icon: cc => personIcon(cc, .9, C.navy) }));
    node(c, BX, CY0 + 30, 50, 'FUNDADOR', { sc: pb(T, t_ot), fill: C.goldL, seed: 699, ls: 22, al: fe });
    if (gone > 0) tag(c, 'EL EQUIPO SIGUE', BX, CY0 + 330, { size: 26, bg: C.gold, sc: pb(T, t_fa + .4) });
    // el mismo titular y dependencias distintas
    for (const [x, k] of [[AX, 0], [BX, 1]]) { const u = pr(T, t_ti + k * .15, .5, easeOutBack); if (u > 0) newspaper(c, x, lerp(-200, 1270, u), 300, 190, (k ? .05 : -.05), { title: 'MISMO TITULAR', seed: 700 }); }
    tx(c, 'Depende de 1 persona', AX, 1430, { size: 40, f: 'hand', clipP: pr(T, t_ri, .5, easeIO) }); tx(c, 'Depende de un equipo', BX, 1430, { size: 40, f: 'hand', clipP: pr(T, t_ri + .3, .5, easeIO) });
  }); }
// 7 · TikTok: qué conviene seguir en Nvidia (dos tarjetas)
if (TK) { const s = 'seguir', t_e = As(s, 'En Envidia, lo que conviene seguir'), t_c = As(s, 'qué comunica el consejo'), t_ca = As(s, 'algún cambio confirmado'), t_li = As(s, 'en el liderazgo'), t_ne = As(s, 'o en el negocio.');
  hit(t_c + .1, 8, 'stamp'); hit(t_ca + .1, 8, 'stamp'); sfx(t_li, 'ping'); sfx(t_ne, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 900], [t_ca, 900], [t_ca + .5, 980]]), 1.02 + .01 * Math.sin(L));
    tx(c, 'En Nvidia, conviene seguir:', 540, 260, { size: 72, f: 'hand', clipP: pr(T, t_e - .2, .7, easeIO) });
    const chk = (cc, on) => { shp(cc, R4(-380, -40, 64, 64), C.paper, { sharp: true, w: 4, lc: C.ink, seed: 710 }); if (on > 0) ln(cc, [[-372, -6], [-352, 16], [-320, -32]], { w: 10, col: C.gold, p: on, seed: 711 }); };
    card(c, 540, 600, 900, 260, { sc: pb(T, t_c - .1), band: C.navy, rot: -.015, seed: 720, draw: cc => { tx(cc, '1', -400, -95, { size: 40, col: C.gold, sh: null }); tx(cc, 'QUÉ COMUNICA EL CONSEJO', 20, -95, { size: 38, f: 'ui', col: C.gold });
      chk(cc, pr(T, t_c + .6, .4)); tx(cc, 'Actualizaciones de la investigación', -290, 0, { size: 34, f: 'ui', align: 'left', max: 640 }); } });
    card(c, 540, 1000, 900, 300, { sc: pb(T, t_ca - .1), band: C.navy, rot: .015, seed: 730, draw: cc => { tx(cc, '2', -400, -115, { size: 40, col: C.gold, sh: null }); tx(cc, 'QUÉ CAMBIA EN EL NEGOCIO', 20, -115, { size: 38, f: 'ui', col: C.gold });
      c.save(); cc.translate(0, -20); chk(cc, pr(T, t_li + .2, .4)); tx(cc, 'Cambios confirmados en el liderazgo', -290, 0, { size: 34, f: 'ui', align: 'left', max: 640 }); cc.translate(0, 90); chk(cc, pr(T, t_ne + .2, .4)); tx(cc, 'Cambios confirmados en el negocio', -290, 0, { size: 34, f: 'ui', align: 'left', max: 640 }); c.restore(); } });
    person(c, 900, 1470, .62, { seed: 9, shirt: C.gold, ...idle(T), look: -1, armL: [1.1, 1.3], prop: (cc, hL) => { shp(cc, R4(hL[0] - 40, hL[1] - 60, 80, 100), C.paper, { sharp: true, w: 3, lc: C.ink, seed: 740 }); } });
  }); }
// 8 · La pregunta: ¿cuánto depende la empresa de una sola persona? (noche) + aviso y firma
{ const s = 'pregunta', t_p = As(s, 'La pregunta para un inversor'), t_cu = As(s, '¿cuánto depende'), t_un = As(s, 'de una sola persona?'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_cu + .1, 6, 'ping'); hit(t_un + .2, 12, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, TK ? 'iris' : 'news', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, key(T, [[0, 1000], [t_un, 1000], [t_un + .6, 1060]]), key(T, [[0, 1.0], [t_un, 1.0], [t_un + .6, 1.08]]));
    tx(c, 'La pregunta para un inversor:', 540, 230, { size: 56, f: 'hand', col: C.chalk, sh: C.goldD, clipP: pr(T, t_p - .2, .6, easeIO) });
    tx(c, '¿Cuánto depende esta empresa', 540, 350, { size: 64, col: C.chalk, sh: C.goldD, clipP: pr(T, t_cu, .6, easeIO), max: 980 });
    tx(c, 'de una sola persona?', 540, 440, { size: 76, col: C.gold, sh: null, clipP: pr(T, t_un, .5, easeIO) });
    const wob = Math.sin(T * 2.2) * .05 * (1 + pr(T, t_un, .5)); c.save(); c.translate(540, 1300); c.rotate(wob);
    person(c, 0, 0, .9, { seed: 11, shirt: C.gold, armL: [2.75, .1], armR: [2.75, .1], mouth: T > t_un ? 'o' : 'flat', brow: T > t_un ? 1 : 0, sweat: T > t_un ? T : 0 });
    building(c, 0, -330, .85, { lab: 'EMPRESA' }); c.restore();
    tag(c, '1 PERSONA', 760, 1180, { size: 34, sc: pb(T, t_un + .2), bg: C.gold });
    const ke = pr(T, t_un + .5, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1430, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1500, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada compartida =================
function cover(c) { BOIL = 0; INKC = C.ink; bg(c, 0); resetT(c);
  c.save(); c.fillStyle = C.navy; c.fillRect(0, 0, 540, 1920); c.restore(); ln(c, [[540, 0], [540, 1920]], { w: 12, col: C.gold, seed: 560, straight: true });
  tx(c, 'WALL STREET', 270, 420, { size: 84, col: C.chalk, sh: C.goldD, max: 480 }); tx(c, 'SUBIÓ', 270, 560, { size: 130, col: C.gold, sh: null });
  tx(c, 'NVIDIA', 810, 420, { size: 96, col: C.ink }); tx(c, 'CAYÓ', 810, 560, { size: 130, col: C.red, sh: C.ink, so: 5 });
  bigArrow(c, 270, 1150, 760, 1, C.gold, 40); bigArrow(c, 810, 760, 1150, 1, C.red, 40);
  pill(c, 'S&P 500 +2,3 %', 270, 1290, { size: 44 }); pill(c, '−4,3 %', 810, 1290, { size: 52, col: C.red, lc: C.red });
  shp(c, R4(30, 1480, 1020, 260), C.navy, { sharp: true, w: 7, lc: C.gold, seed: 400 });
  tx(c, '¿Qué puede cambiar para la empresa?', 540, 1570, { size: 54, col: C.chalk, sh: null, max: 960 }); tx(c, 'Cierre · 9 nov. 2026', 540, 1665, { size: 34, f: 'ui', col: C.gold });
  tag(c, 'TITÁN HOLDING', 540, 180, { size: 30, bg: C.gold }); }

startFilm('nvidia-huang', cover);
