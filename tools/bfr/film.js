// TITÁN · «Black Friday: ¿descuento real o precio inflado?» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js) · línea B (plata del día a día)
// SIC: multó a 10 empresas por más de $3.068 millones por irregularidades en el Black Friday de 2024 (Asuntos Legales, Portafolio, 25 nov 2025).
// Retracto en compras por internet: 5 días hábiles desde la entrega (Ley 1480 de 2011, art. 47). EJEMPLO HIPOTÉTICO: $1.000.000 → $1.600.000 → −40 % = $960.000 (ahorro real 4 %).
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const cop = v => '$' + Math.round(v).toLocaleString('es-CO').replace(/,/g, '.');
function src(c, s, y = 1312) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }
function hipo(c, y = 320) { tag(c, 'EJEMPLO HIPOTÉTICO', 540, y, { size: 28, bg: C.paper }); }

// ---------- piezas ----------
function pricetag(c, x, y, s, txt, col, rot, seed) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  shp(c, [[-170, -70], [130, -70], [200, 0], [130, 70], [-170, 70]], col, { sharp: true, w: 5, lc: C.ink, seed }); c.fillStyle = C.ink; c.beginPath(); c.arc(140, 0, 12, 0, TAU); c.fill();
  tx(c, txt, -15, 4, { size: 54, f: 'ui', max: 300 }); c.restore(); }
function tv(c, x, y, s, T, seed = 8300) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, R4(-220, -140, 440, 280), C.navy, { w: 6, lc: C.ink, seed });
  shp(c, R4(-196, -118, 392, 236), '#BFE3F5', { sharp: true, w: 3, lc: C.ink, seed: seed + 1 }); ln(c, [[-60, 140], [-90, 200]], { w: 6, straight: true, seed: seed + 2 }); ln(c, [[60, 140], [90, 200]], { w: 6, straight: true, seed: seed + 3 });
  for (let k = 0; k < 3; k++) { const u = (T * .5 + k / 3) % 1; c.save(); c.globalAlpha = .35; shp(c, blob(-120 + u * 240, -40 + k * 40, 40, 14, seed + 5 + k, { n: 12, amp: .05 }), C.paper, { w: 0, seed: seed + 5 + k }); c.restore(); }
  c.restore(); }
function bags(c, x, y, s, T) { [[-90, C.lav], [0, C.gold], [90, '#FFB4A6']].forEach(([dx, col], k) => { c.save(); c.translate(x + dx * s, y + Math.sin(T * 3 + k) * 6); c.scale(s, s);
  shp(c, R4(-55, -70, 110, 140), col, { sharp: true, w: 5, lc: C.ink, seed: 8350 + k }); ln(c, [[-25, -70], [-25, -105], [25, -105], [25, -70]], { w: 5, straight: true, seed: 8360 + k }); c.restore(); }); }
function box(c, x, y, s, seed = 8400) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, R4(-130, -90, 260, 180), '#C9A36B', { sharp: true, w: 5, lc: C.ink, seed });
  ln(c, [[-130, -40], [130, -40]], { w: 4, straight: true, seed: seed + 1 }); ln(c, [[0, -90], [0, 90]], { w: 4, straight: true, seed: seed + 2, al: .5 }); c.restore(); }
function gavel(c, x, y, s, ang, seed = 8450) { c.save(); c.translate(x, y); c.rotate(ang); c.scale(s, s); shp(c, R4(-20, -10, 40, 220), '#6B4F3A', { sharp: true, w: 5, lc: C.ink, seed });
  shp(c, R4(-90, -70, 180, 70), '#8B6A50', { w: 5, lc: C.ink, seed: seed + 1 }); c.restore(); }

// ================= escenas =================
// 1 · Gancho: etiqueta «−40 %» que cae sobre las bolsas… y el sello «¿DE VERDAD?»
if (has('gancho')) { const s = 'gancho', t_b = As(s, 'Black Friday'), t_n = As(s, 'no siempre es un descuento.');
  hit(.05, 8, 'stamp'); hit(t_b + .2, 12, 'impact'); hit(t_n + .2, 18, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_n, 960], [t_n + .6, 930]]), key(T, [[0, 1.0], [t_n, 1.0], [t_n + .6, 1.06]]) + .01 * Math.sin(L * 1.3));
    tx(c, 'BLACK FRIDAY', 540, 190, { size: 110, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, 'VIERNES 27 DE NOVIEMBRE', 540, 300, { size: 56, col: C.goldD, sh: C.ink, max: 1000 });
    bags(c, 540, 860, 1.4, T);
    const u = pr(T, t_b, .5, easeOutBack); if (u > 0) pricetag(c, 540, lerp(300, 580, u), 1.2, '−40 %', '#FFB4A6', -.12 + .04 * Math.sin(T * 3), 8300);
    stamp(c, '¿DE VERDAD?', 540, 1130, T, t_n + .2, { size: 84, col: C.red, rot: -.05 });
    person(c, 150, 1560, .6, { seed: 5, shirt: C.gold, ...idle(T), look: 1, mouth: T > t_n ? 'o' : 'grin', brow: T > t_n ? 1 : 0 });
  }); }

// 2 · Ejemplo: el televisor de $1.000.000 «sube» a $1.600.000 días antes… y lo anuncian con −40 % (en el Short también la cuenta)
if (has('ejemplo')) { const s = 'ejemplo', t_1 = As(s, TK ? 'un millón de pesos.' : 'un millón.'), t_s = As(s, 'Días antes'), t_6 = As(s, TK ? 'un millón seiscientos mil,' : 'un millón seiscientos,'), t_40 = As(s, 'cuarenta por ciento');
  const t_96 = TK ? null : As(s, 'novecientos sesenta mil:'), t_4 = TK ? null : As(s, 'cuatro por ciento');
  hit(t_1 + .2, 8, 'ping'); hit(t_6 + .2, 14, 'impact'); hit(t_40 + .2, 12, 'stamp'); if (t_96) { hit(t_96 + .2, 12, 'impact'); hit(t_4 + .2, 16, 'stamp'); }
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_40, 1.0], [t_40 + .6, 1.04]]) + .012 * Math.sin(L)); hipo(c, 320);
    tx(c, 'EL TRUCO', 540, 210, { size: 100, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    tv(c, 540, 620, 1.0, T);
    const pA = pb(T, t_1); if (pA > 0) { pricetag(c, 300, 900, .9 * pA, cop(1e6), C.paper, -.06, 8310); if (T > t_6) ln(c, [[150, 900], [450, 900]], { w: 10, col: C.red, p: pr(T, t_6, .3), straight: true, seed: 8311 }); }
    if (T > t_s) tag(c, 'DÍAS ANTES', 760, 820, { size: 30, bg: C.paper, sc: pb(T, t_s) });
    const pB = pb(T, t_6); if (pB > 0) pricetag(c, 780, 900, .9 * pB, cop(1.6e6), '#FFD3CB', .06, 8320);
    const pC = pb(T, t_40); if (pC > 0) pricetag(c, 540, 1100, 1.1 * pC, '−40 %', C.gold, -.08 + .03 * Math.sin(T * 3), 8330);
    if (t_96) { pill(c, 'PAGAS ' + cop(960000), 540, 1250, { size: 46, f: 'ui', sc: pb(T, t_96) }); stamp(c, 'AHORRO REAL: 4 %', 540, 1360, T, t_4 + .2, { size: 54, col: C.red, rot: -.03 }); }
  }); }

// 3 · TikTok · La cuenta: $960.000 vs. $1.000.000 → el cartel dice 40 %, el ahorro real es 4 %
if (has('cuenta')) { const s = 'cuenta', t_96 = As(s, 'novecientos sesenta mil.'), t_c = As(s, 'El cartel dice'), t_4 = As(s, 'cuatro por ciento.');
  hit(t_96 + .2, 12, 'impact'); hit(t_c + .1, 8, 'ping'); hit(t_4 + .2, 18, 'stamp');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_4, 1.0], [t_4 + .6, 1.05]]) + .012 * Math.sin(L)); hipo(c, 320);
    tx(c, 'LA CUENTA', 540, 210, { size: 100, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    const Z = 1150, K = 560 / 1.6e6; ln(c, [[100, Z], [980, Z]], { w: 6, straight: true, seed: 8500 });
    [['PRECIO NORMAL', 1e6, sec(s).t0 + .2, C.lav], ['«ANTES»', 1.6e6, sec(s).t0 + .5, '#FFD3CB'], ['PAGAS', 960000, t_96 - .2, C.gold]].forEach(([n, v, t, col], k) => { const g = pr(T, t, .7, easeOutBack); if (g <= 0) return; const x = 230 + k * 310;
      shp(c, R4(x - 100, Z - v * K * g, 200, v * K * g), col, { sharp: true, w: 5, lc: C.ink, seed: 8510 + k, hatch: shade(col, .6), hal: .3 }); tx(c, n, x, Z + 40, { size: 28, f: 'ui' }); pill(c, cop(v), x, Z - v * K - 56, { size: 32, f: 'ui', sc: pb(T, t + .3) }); });
    pill(c, 'EL CARTEL: −40 %', 260, 420, { size: 40, f: 'ui', sc: pb(T, t_c), col: C.goldL });
    stamp(c, 'AHORRO REAL: 4 %', 700, 560, T, t_4 + .2, { size: 56, col: C.red, rot: .04 });
  }); }

// 4 · La SIC multó a 10 empresas por más de $3.068 millones (Black Friday 2024)
if (has('sic')) { const s = 'sic', t_s = As(s, 'Superintendencia de Industria y Comercio'), t_10 = As(s, 'diez empresas'), t_3 = As(s, 'tres mil millones de pesos');
  hit(t_s + .2, 8, 'ping'); hit(t_10 + .2, 12, 'impact'); hit(t_3 + .3, 18, 'stamp');
  scene(s, TK ? 'drop' : 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_3, 1.0], [t_3 + .6, 1.05]]) + .012 * Math.sin(L));
    tx(c, TK ? 'NO ES SOLO TEORÍA' : 'Y LA SIC MULTÓ', 540, 210, { size: 86, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    const hitA = T > t_3 + .1 && T < t_3 + .4 ? .9 : -.3 + .1 * Math.sin(T * 2); gavel(c, 680, 560, 1.4, hitA);
    shp(c, R4(300, 680, 480, 60), '#6B4F3A', { w: 5, lc: C.ink, seed: 8460 });
    for (let k = 0; k < 10; k++) { const g = pr(T, t_10 + k * .08, .3, easeOutBack); if (g <= 0) continue; c.save(); c.translate(190 + (k % 5) * 175, 860 + Math.floor(k / 5) * 120); c.scale(g, g);
      shp(c, R4(-60, -45, 120, 90), C.paper, { sharp: true, w: 4, lc: C.ink, seed: 8470 + k }); tx(c, 'EMPRESA', 0, 3, { size: 20, f: 'ui', al: .7 }); c.restore(); }
    pill(c, 'MÁS DE $3.068 MILLONES EN MULTAS', 540, 1140, { size: 40, f: 'ui', sc: pb(T, t_3 + .2), col: '#FFB4A6' });
    tag(c, 'BLACK FRIDAY 2024 · FALLAS AL INFORMAR LAS PROMOCIONES', 540, 1240, { size: 24, bg: C.paper, sc: pb(T, t_3 + .8) });
    src(c, 'Superintendencia de Industria y Comercio (Asuntos Legales y Portafolio, 25 nov. 2025)', 1320);
  }); }

// 5 · TikTok · Cómo te cuidas: pantallazos del precio · leer condiciones · comprar solo lo que ibas a comprar
if (has('como')) { const s = 'como', t_1 = As(s, 'Uno:'), t_2 = As(s, 'Dos:'), t_3 = As(s, 'Tres:');
  hit(t_1 + .1, 10, 'ping'); hit(t_2 + .1, 10, 'ping'); hit(t_3 + .1, 12, 'stamp');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, '¿CÓMO TE CUIDAS?', 540, 210, { size: 90, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    [['1', 'MIRA EL PRECIO DESDE ANTES Y GUARDA PANTALLAZOS', t_1], ['2', 'LEE FECHAS, UNIDADES Y A QUÉ APLICA', t_2], ['3', 'COMPRA SOLO LO QUE YA IBAS A COMPRAR', t_3]].forEach(([n, w, t], k) => {
      const g = pb(T, t); if (g <= 0) return; c.save(); c.translate(540, 470 + k * 200); c.rotate((k - 1) * .015); c.scale(g, g); shp(c, R4(-430, -70, 860, 140), [C.lav, C.goldL, '#9FE3B6'][k], { w: 5, lc: C.ink, seed: 8600 + k });
      shp(c, blob(-360, 0, 46, 46, 8610 + k, { n: 16, amp: .03 }), C.navy, { w: 4, lc: C.ink, seed: 8610 + k }); tx(c, n, -360, 4, { size: 50, f: 'ui', col: C.paper }); tx(c, w, 50, 4, { size: 30, f: 'ui', max: 640 }); c.restore(); });
    person(c, 540, 1560, .6, { seed: 3, shirt: C.gold, ...idle(T), look: 0, mouth: 'smile', armR: [2.4, .4] });
  }); }

// 6 · TikTok · Retracto en compras por internet: 5 días hábiles después de recibir
if (has('retracto')) { const s = 'retracto', t_r = As(s, 'derecho de retracto:'), t_5 = As(s, 'cinco días hábiles');
  hit(t_r + .2, 14, 'stamp'); hit(t_5 + .2, 12, 'impact');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'SI COMPRAS POR INTERNET', 540, 210, { size: 74, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    const u = pr(T, sec(s).t0 + .2, .6, easeOutBack); box(c, lerp(-200, 260, u), 600, 1.0);
    for (let k = 0; k < 5; k++) { const g = pr(T, t_5 + k * .15, .3, easeOutBack); if (g <= 0) continue; c.save(); c.translate(500 + k * 100, 600); c.scale(g, g); shp(c, R4(-40, -40, 80, 80), C.goldL, { sharp: true, w: 4, lc: C.ink, seed: 8700 + k }); tx(c, '' + (k + 1), 0, 3, { size: 36, f: 'ui' }); c.restore(); }
    pill(c, 'DERECHO DE RETRACTO', 540, 820, { size: 50, f: 'ui', sc: pb(T, t_r), col: C.lav });
    tag(c, 'EN GENERAL: 5 DÍAS HÁBILES DESDE QUE TE LLEGA', 540, 940, { size: 30, bg: C.paper, sc: pb(T, t_5 + .5) });
    src(c, 'Ley 1480 de 2011 (Estatuto del Consumidor), art. 47', 1060);
    person(c, 880, 1560, .6, { seed: 7, shirt: C.navy, flip: true, ...idle(T), look: -1, mouth: 'smile' });
  }); }

// 7 · Cierre (noche)
if (has('cierre')) { const s = 'cierre', t_a = TK ? As(s, 'Un descuento solo es ahorro') : As(s, 'Revisa el precio'), t_b = TK ? As(s, 'de todas formas.') : As(s, 'solo lo que ya ibas a comprar.'), t_h = As(s, 'Haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_a + .1, 8, 'ping'); hit(t_b + .1, 12, 'stamp'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, TK ? 'UN DESCUENTO SOLO ES AHORRO' : 'REVISA EL PRECIO DESDE ANTES', 540, 300, { size: 56, col: C.chalk, sh: C.goldD, clipP: pr(T, t_a, .6, easeIO), max: 1000 });
    tx(c, TK ? 'SI IBAS A COMPRARLO DE TODAS FORMAS' : 'Y COMPRA SOLO LO QUE IBAS A COMPRAR', 540, 400, { size: 46, col: C.lav, sh: null, clipP: pr(T, t_b - .4, .6, easeIO), max: 1000 });
    pricetag(c, 540, 680, .9 * pb(T, sec(s).t0 + .2), '−40 %', C.goldL, -.08 + .04 * Math.sin(T * 2), 8800);
    tx(c, 'HAZ TU CUENTA', 540, 1000, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada =================
function cover(c) { const t = As('gancho', 'no siempre es un descuento.'); drawScene(c, SC[0], Math.min(t + 1.4, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('black-friday-real', cover);
