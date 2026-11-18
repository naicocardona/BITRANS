// TITÁN · «Tiempo o plata» · Short (sh) y TikTok (tk) · kit híbrido · línea B · adaptado del TEMA de un video de referencia (guion propio)
// Whillans, Dunn, Smeets, Bekkers y Norton, «Buying time promotes happiness», PNAS 2017 (encuestas en EE. UU., Canadá, Dinamarca y Países Bajos).
// EJEMPLO HIPOTÉTICO con datos reales (tools/dca/calc.py): USD 100/mes en SPY con dividendos (retención 30 %): 10 años USD 12.000 → 25.792 · 20 años USD 24.000 → 103.802.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];

// ---------- piezas ----------
function hourglass(c, x, y, s, T, seed = 9501) { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(Math.sin(T) * .05);
  shp(c, R4(-110, -170, 220, 24), '#8C5E31', { sharp: true, w: 5, lc: C.ink, seed }); shp(c, R4(-110, 146, 220, 24), '#8C5E31', { sharp: true, w: 5, lc: C.ink, seed: seed + 1 });
  shp(c, [[-90, -146], [90, -146], [12, 0], [90, 146], [-90, 146], [-12, 0]], '#DDEFF8', { w: 5, lc: C.ink, seed: seed + 2 });
  const f = (T * .15) % 1; c.save(); c.fillStyle = C.gold; c.beginPath(); c.moveTo(-70 * (1 - f), -120 + 110 * f); c.lineTo(70 * (1 - f), -120 + 110 * f); c.lineTo(0, -6); c.fill();
  c.beginPath(); c.moveTo(-80, 140); c.lineTo(80, 140); c.lineTo(0, 140 - 120 * f); c.fill(); c.fillRect(-3, 0, 6, 140); c.restore(); c.restore(); }
function coin(c, x, y, r, seed) { shp(c, blob(x, y, r, r, seed, { n: 22, amp: .02 }), C.gold, { w: 4, lc: C.ink, seed }); tx(c, '$', x, y + 2, { size: r * 1.1, col: C.goldD, sh: null }); }
function src(c, s, y = 1520) { tx(c, s, 540, y, { size: 22, f: 'ui', al: .75, max: 1000 }); }
// ================= escenas =================
// 1 · Gancho: dos personas: una paga con tiempo (fila larga, reloj), otra compra tiempo (llega rápido) · reloj de arena
if (has('gancho')) { const s = 'gancho', t_p = As(s, 'pagas con tiempo.'), t_c = As(s, 'compras tiempo.'), t_x = TK ? As(s, 'cuánto vale el suyo.') : As(s, 'lo que más pesa.');
  hit(.05, 8, 'stamp'); hit(t_p + .1, 10, 'ping'); hit(t_c + .1, 10, 'ping'); hit(t_x + .1, 16, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_x, 960], [t_x + .6, 920]]), key(T, [[0, 1.0], [t_x, 1.0], [t_x + .6, 1.05]]) + .01 * Math.sin(L * 1.3));
    tx(c, '¿TIEMPO O PLATA?', 540, 200, { size: 96, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }), max: 1000 });
    hourglass(c, 540, 600, .9, T);
    // izquierda: fila de personas (paga con tiempo)
    for (let k = 0; k < 4; k++) person(c, 120 + k * 70, 1180, .42, { seed: 70 + k, shirt: ['#3B4466', C.lav, C.vio, C.paper][k], ...idle(T, k), look: 1, mouth: 'flat' });
    tag(c, 'PAGAS CON TIEMPO', 250, 880, { size: 30, bg: C.paper, sc: pb(T, t_p - .2) });
    // derecha: persona que llega rápido (compra tiempo)
    const u = (T * .5) % 1; person(c, lerp(700, 980, u), 1180, .5, { seed: 12, shirt: C.gold, ...idle(T, 2), look: 1, mouth: 'grin' }); tag(c, 'COMPRAS TIEMPO', 820, 880, { size: 30, bg: C.goldL, sc: pb(T, t_c - .2) });
    stamp(c, TK ? '¿CUÁNTO VALE TU TIEMPO?' : 'AL INVERTIR, EL TIEMPO PESA', 540, 1380, T, t_x, { size: 46, col: C.red, rot: -.03 });
  }); }

// 2 · TikTok · Ejemplos: cruzar la ciudad / fila de 2 horas · cada hora pagada = hora que no usaste
if (has('ejemplos')) { const s = 'ejemplos', t_c = As(s, 'Cruzas la ciudad'), t_f = As(s, 'la fila de dos horas'), t_h = As(s, 'Cada hora que pagas');
  hit(t_c + .1, 8, 'ping'); hit(t_f + .2, 10, 'stamp'); hit(t_h + .1, 12, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    tx(c, 'CUANDO PAGAS CON TIEMPO', 540, 220, { size: 66, col: C.ink, sc: pb(T, sec(s).t0 - .3), max: 1000 });
    if (T < t_f - .1) { for (let k = 0; k < 5; k++) shp(c, R4(80 + k * 190, 520 - (k % 2) * 80, 150, 300 + (k % 2) * 80), ['#3B4466', '#4A3F6A', '#2A3150'][k % 3], { sharp: true, w: 4, lc: C.ink, seed: 9520 + k });
      const u = pr(T, t_c, 2.2, easeIO); person(c, lerp(100, 980, u), 1100, .55, { seed: 5, shirt: C.lav, ...idle(T), look: 1, mouth: 'flat', sweat: T }); tag(c, 'EL MERCADO «MÁS BARATO»', 540, 1250, { size: 32, bg: C.goldL, sc: pb(T, t_c + .3) }); }
    else { for (let k = 0; k < 7; k++) person(c, 120 + k * 130, 1100, .5, { seed: 80 + k, shirt: ['#3B4466', C.lav, C.vio][k % 3], ...idle(T, k), look: 1, mouth: 'flat' }); pill(c, 'FILA: 2 HORAS', 540, 650, { size: 56, f: 'ui', sc: pb(T, t_f) }); }
    stamp(c, 'HORAS QUE NO USASTE PARA CRECER', 540, 1380, T, t_h + .2, { size: 40, col: C.red, rot: -.03 });
  }); }

// 3 · TikTok · El estudio: 4 países, gastar en ahorrar tiempo ↔ más satisfacción
if (has('estudio')) { const s = 'estudio', t_h = As(s, 'Harvard'), t_4 = As(s, 'cuatro países,'), t_s = As(s, 'más satisfacción');
  hit(t_h + .1, 10, 'stamp'); hit(t_4 + .2, 10, 'ping'); hit(t_s + .1, 14, 'stamp');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    tx(c, 'UN ESTUDIO (2017)', 540, 220, { size: 86, col: C.ink, sc: pb(T, sec(s).t0 - .3) });
    newspaper(c, 540, 600, 700, 420, -.04 + Math.sin(T) * .01, { title: 'PNAS · 2017', seed: 9530 });
    ['EE. UU.', 'CANADÁ', 'DINAMARCA', 'PAÍSES BAJOS'].forEach((w, k) => tag(c, w, 200 + k * 230, 920, { size: 28, bg: C.paper, sc: pb(T, t_4 + k * .15), rot: (k % 2 ? .04 : -.04) }));
    stamp(c, 'COMPRAR TIEMPO → MÁS SATISFACCIÓN', 540, 1100, T, t_s, { size: 40, col: C.goldD, rot: -.03 });
    person(c, 920, 1530, .55, { seed: 12, shirt: C.gold, flip: true, ...idle(T), look: -1, mouth: 'grin' });
    src(c, 'Whillans y otros, «Buying time promotes happiness», PNAS, 2017');
  }); }

// 4 · Invertir: 10 años vs. 20 años (USD 100/mes en el S&P 500) → ×4
if (has('invertir') || has('dato')) { const s = has('invertir') ? 'invertir' : 'dato', t_c = As(s, 'cien dólares'), t_10 = As(s, 'En diez años'), t_20 = As(s, 'En veinte años'), t_4 = As(s, 'Cuatro veces más.');
  hit(t_c + .1, 8, 'ping'); hit(t_10 + .3, 10, 'impact'); hit(t_20 + .3, 12, 'impact'); hit(t_4 + .1, 18, 'stamp');
  scene(s, TK ? 'drop' : 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, key(T, [[0, 1.0], [t_4, 1.0], [t_4 + .6, 1.04]]) + .012 * Math.sin(L));
    tag(c, 'EJEMPLO HIPOTÉTICO · DATOS REALES', 540, 200, { size: 28, bg: C.paper });
    tx(c, 'USD 100 AL MES EN EL S&P 500', 540, 290, { size: 58, col: C.ink, sc: pb(T, t_c - .2), max: 1000 });
    if (T < t_10 - .2) { for (let k = 0; k < 5; k++) coin(c, 380 + k * 70, 700 + Math.sin(T * 3 + k) * 10, 40, 9540 + k); hourglass(c, 540, 1000, .6, T); }
    else { const Z = 1220, K = 680 / 110000; ln(c, [[100, Z], [980, Z]], { w: 7, straight: true, seed: 9510 });
      [[300, 12000, 25792, t_10, '10 AÑOS', 'USD 25.800'], [760, 24000, 103802, t_20, '20 AÑOS', 'USD 103.800']].forEach(([x, put, val, t, lab, vs], k) => { if (T < t - .2) return; const g = pr(T, t, 1.0, easeIO);
        shp(c, R4(x - 120, Z - put * K, 240, put * K), C.paper, { sharp: true, w: 3, lc: C.ink, seed: 9511 + k }); tx(c, 'PUSISTE USD ' + (put / 1000) + '.000', x, Z - put * K - 26, { size: 24, f: 'ui', al: .8 });
        if (g > 0) shp(c, R4(x - 100, Z - val * K * g, 200, val * K * g), k ? C.gold : C.lav, { sharp: true, w: 5, lc: C.ink, seed: 9513 + k, hatch: shade(k ? C.gold : C.lav, .6), hal: .3 });
        tx(c, lab, x, Z + 44, { size: 34, f: 'ui' }); pill(c, 'HOY: ' + vs, x, Math.min(Z - val * K * g, Z - put * K) - 90, { size: 36, f: 'ui', sc: pb(T, t + .6) }); });
      stamp(c, '×4', 330, 560, T, t_4, { size: 130, col: C.goldD, rot: -.05 }); }
    src(c, 'SPY con dividendos (retención 30 %) · Yahoo Finance · cálculo TITÁN · hasta oct. 2026');
  }); }

// 5 · TikTok · Ojo: lo que pasó, no una promesa
if (has('ojo')) { const s = 'ojo', t_p = As(s, 'no una promesa.'), t_d = As(s, 'pueden ser distintos.');
  hit(t_p + .1, 14, 'stamp'); hit(t_d + .1, 8, 'ping');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 950, 1.0 + .012 * Math.sin(L));
    tx(c, 'OJO', 540, 260, { size: 130, col: C.red, sh: C.ink, sc: pb(T, sec(s).t0 - .3) });
    pill(c, 'ESTO ES LO QUE PASÓ', 540, 560, { size: 56, f: 'ui', sc: pb(T, sec(s).t0 + .2) });
    stamp(c, 'NO ES UNA PROMESA', 540, 760, T, t_p, { size: 64, col: C.red, rot: -.03 });
    tx(c, '?', 540, 1040, { size: 200, col: C.lav, sh: C.ink, sc: pb(T, t_d - .2) + .03 * Math.sin(T * 4) });
  }); }

// 6 · Cierre (noche)
if (has('cierre')) { const s = 'cierre', t_t = As(s, 'El tiempo que no recuperas') , t_e = As(s, 'Empieza con lo que puedas'), t_h = As(s, 'haz tu cuenta.'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_t + .1, 12, 'stamp'); hit(t_e + .1, 8, 'ping'); hit(t_h + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, TK ? 'blot' : 'iris', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    if (TK) tx(c, 'TU TIEMPO TAMBIÉN ES PLATA', 540, 280, { size: 58, col: C.chalk, sh: C.goldD, clipP: pr(T, sec(s).t0 + .1, .6, easeIO), max: 1000 });
    tx(c, 'EL TIEMPO QUE NO RECUPERAS', 540, 420, { size: 56, col: C.lav, sh: null, clipP: pr(T, t_t - .1, .6, easeIO), max: 1000 }); tx(c, 'ES EL QUE NO INVERTISTE', 540, 510, { size: 56, col: C.lav, sh: null, clipP: pr(T, t_t + .7, .6, easeIO), max: 1000 });
    hourglass(c, 540, 800, .7, T, 9550);
    tx(c, 'HAZ TU CUENTA', 540, 1100, { size: 104, col: C.gold, sh: null, sc: pb(T, t_h) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1380, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1450, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

function cover(c) { const s = has('invertir') ? 'invertir' : 'dato', k = SC.findIndex(x => x.id === s), t = As(s, 'Cuatro veces más.'); drawScene(c, SC[k], Math.min(t + 1.0, SC[k].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('tiempo', cover);
