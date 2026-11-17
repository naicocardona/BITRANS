// TITÁN · «El 19 de noviembre, millones no van a trabajar» (lanzamiento de GTA VI) · Short (sh) y TikTok (tk) · kit híbrido
// SIN arte, logos, personajes ni música del juego: oficina, calendario, consola genérica y gráficas propias.
// Cifras: BambooHR (oct. 2026) 18 % / 50 % · costo estimado USD 1.000–1.500 M (analistas, sin cifra oficial) · Burj Khalifa ≈ USD 1.500 M (ICE/MEED)
// Take-Two: guía año fiscal 2027 USD 8.000–8.200 M (toda la empresa) · analistas: 35–45 M de copias el primer año.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const YOU = C.gold;

// ---------- piezas ----------
function bubble(c, s, x, y, k, o = {}) { if (k <= 0) return; const size = o.size || 40, w = tw(c, s, { size, f: 'hand' }) + 70, h = size * 1.9;
  c.save(); c.translate(x, y); c.rotate(o.rot ?? 0); c.scale(k, k);
  shp(c, [[(o.tail ?? 0) - 18, h / 2 - 6], [(o.tail ?? 0) + 18, h / 2 - 6], [(o.tail ?? 0) * 1.4, h / 2 + 46]], o.bg || C.paper, { w: 4, lc: C.ink, seed: 5101 });
  shp(c, blob(0, 0, w / 2, h / 2, o.seed ?? 5102, { n: 30, amp: .03 }), o.bg || C.paper, { w: 4, lc: C.ink, seed: o.seed ?? 5102 });
  tx(c, s, 0, 3, { size, f: 'hand', col: o.col || C.ink, sh: null }); c.restore(); }
function calendar(c, x, y, s, T, t0, seed = 5110) { c.save(); c.translate(x, y); c.scale(s, s);
  shp(c, R4(-170, -190, 340, 380), C.paper, { sharp: true, w: 6, lc: C.ink, seed }); shp(c, R4(-170, -190, 340, 90), C.red, { sharp: true, w: 6, lc: C.ink, seed: seed + 1 });
  tx(c, 'NOVIEMBRE', 0, -144, { size: 40, f: 'ui', col: C.paper }); tx(c, '19', 0, 40, { size: 190, col: C.ink, sh: null });
  if (T > t0) ring(c, 0, 40, 140, 115, pr(T, t0, .5), { col: C.red, w: 12, seed: seed + 2 }); c.restore(); }
function desk(c, x, y, s, seed, empty, T) { c.save(); c.translate(x, y); c.scale(s, s);
  shp(c, R4(-120, -10, 240, 24), '#A8743F', { sharp: true, w: 4, lc: C.ink, seed }); ln(c, [[-100, 14], [-100, 110]], { w: 6, seed: seed + 1 }); ln(c, [[100, 14], [100, 110]], { w: 6, seed: seed + 2 });
  shp(c, R4(-60, -110, 120, 80), C.ink, { sharp: true, w: 4, lc: C.ink, seed: seed + 3 }); c.fillStyle = empty ? '#3B4466' : '#9FD3F0'; c.fillRect(-50, -102, 100, 64);
  if (empty) { c.save(); c.globalAlpha = .5 + .5 * Math.sin(T * 4 + seed); tx(c, 'zZ', 40, -150, { size: 34, f: 'hand', col: '#8A8D9C', sh: null }); c.restore(); }
  shp(c, [[-40, 40], [40, 40], [34, 110], [-34, 110]], '#3B4466', { w: 4, lc: C.ink, seed: seed + 4 }); c.restore(); }
function console_(c, x, y, s, T, seed = 5130) { c.save(); c.translate(x, y); c.scale(s, s);   // consola y control genéricos
  shp(c, R4(-160, -60, 320, 110), C.ink, { w: 5, lc: C.ink, seed }); c.save(); c.globalAlpha = .6 + .4 * Math.sin(T * 5); c.fillStyle = C.lav; c.fillRect(-120, -8, 60, 8); c.restore();
  shp(c, blob(40, 140, 120, 60, seed + 1, { n: 24, amp: .04 }), '#2A3150', { w: 5, lc: C.ink, seed: seed + 1 });
  for (const [dx, dy, col] of [[85, 125, C.green], [110, 145, C.red], [60, 150, C.gold]]) { c.fillStyle = col; c.beginPath(); c.arc(dx, dy, 10, 0, TAU); c.fill(); }
  shp(c, R4(-30, 132, 40, 14), '#8A8D9C', { sharp: true, w: 2, lc: C.ink, seed: seed + 2 }); shp(c, R4(-17, 119, 14, 40), '#8A8D9C', { sharp: true, w: 2, lc: C.ink, seed: seed + 3 }); c.restore(); }
function tower(c, x, y, w, h, seed) {   // rascacielos genérico escalonado (silueta, sin marca)
  if (h <= 0) return; const L = [[1, 1], [.8, .7], [.6, .45], [.4, .25], [.2, .1]]; L.forEach(([fw, fh], k) => { const ww = w * fw, top = y - h * (1 - fh * 0) * (k === 0 ? 1 : 1);
    const hh = h * [1, .82, .64, .46, .3][k]; shp(c, R4(x - ww / 2, y - hh - (h - hh) * 0, ww, hh), k % 2 ? '#C9CCD4' : '#B5BAC8', { sharp: true, w: 4, lc: C.ink, seed: seed + k }); });
  ln(c, [[x, y - h], [x, y - h - h * .18]], { w: 6, seed: seed + 9 }); }
function moneyStack(c, x, y, w, h, seed) { if (h <= 0) return; const n = Math.max(1, Math.round(h / 22)); for (let k = 0; k < n; k++) shp(c, R4(x - w / 2 + (k % 2) * 6, y - (k + 1) * (h / n), w, h / n - 2), '#7DBE8E', { sharp: true, w: 3, lc: C.ink, seed: seed + k % 7 });
  tx(c, '$', x, y - h / 2, { size: 60, col: C.paper, sh: null }); }
function phoneClip(c, x, y, s, T, seed) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, R4(-60, -110, 120, 220), C.ink, { w: 4, lc: C.ink, seed });
  c.fillStyle = mix('#3B4C8A', '#B9A2E8', .5 + .5 * Math.sin(T * 3 + seed)); c.fillRect(-50, -96, 100, 180); shp(c, [[-14, -26], [22, -6], [-14, 14]], C.paper, { w: 2, lc: C.ink, seed: seed + 1 });
  const hk = (T * 2 + seed) % 1; c.save(); c.globalAlpha = 1 - hk; tx(c, '♥', 30 + hk * 20, 60 - hk * 120, { size: 40, col: C.red, sh: null }); c.restore(); c.restore(); }
function src(c, s) { tx(c, s, 540, 1530, { size: 22, f: 'ui', al: .8, max: 1000 }); }

// ================= escenas =================
// 1 · Gancho: calendario 19 de noviembre + oficina con puestos vacíos
if (has('gancho')) { const s = 'gancho', t_m = As(s, 'millones de personas'), t_p = As(s, 'No es un paro.'), t_v = As(s, 'Es un videojuego.');
  hit(.05, 10, 'stamp'); hit(t_m + .1, 8, 'ping'); hit(t_p + .1, 8, 'stamp'); hit(t_v + .1, 16, 'impact');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, key(T, [[0, 1.0], [t_v, 1.0], [t_v + .5, 1.06]]) + .012 * Math.sin(L * 1.3));
    tx(c, 'EL 19 DE NOVIEMBRE', 540, 200, { size: 84, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, 'MILLONES NO VAN A TRABAJAR', 540, 300, { size: 58, col: C.red, sh: C.ink, max: 1000 });
    calendar(c, 540, 620, .95, T, .3);
    const nE = Math.min(6, Math.floor(pr(T, t_m, 1.2, t => t) * 6));
    for (let k = 0; k < 6; k++) desk(c, 190 + (k % 3) * 350, 980 + Math.floor(k / 3) * 250, .8, 5140 + k * 10, k < nE, T);
    stamp(c, 'NO ES UN PARO', 540, 1470, T, t_p, { size: 56, col: C.goldD, rot: -.04 });
    if (T > t_v) { c.save(); c.translate(540, 870); c.scale(pb(T, t_v), pb(T, t_v)); console_(c, 0, 0, 1.1, T); c.restore(); burst(c, 540, 900, T, t_v + .05, { R: 220, n: 20 }); tag(c, 'ES UN VIDEOJUEGO', 540, 760, { size: 40, bg: C.gold, sc: pb(T, t_v + .2) }); }
  }); }

// 2 · El dato: encuesta + el empleado «enfermito» y el jefe (voces de personajes en el hueco)
if (has('dato')) { const s = 'dato', t_g = As(s, 'Sale ge te a seis.'), t_e = As(s, 'Estados Unidos,'), t_5 = As(s, 'uno de cada cinco'), t_m = As(s, 'la mitad'), t_en = As(s, 'se reporta enfermo.');
  const w_en = DD.words.find(w => w[1] >= t_en && /enfermo/.test(w[0]))[2], nx = DD.words.find(w => w[1] > w_en + .5)[1], t_jefe = w_en + (nx - w_en - 5.7) / 2 + 3.92;   // empleado 3,67 s + 0,25 s, centrados en el hueco (tools/gta/personajes.py)
  hit(t_g + .1, 10, 'stamp'); hit(t_e + .1, 6, 'ping'); hit(t_5 + .2, 14, 'stamp'); hit(t_m + .2, 12, 'stamp'); hit(w_en + .2, 8, 'ping'); hit(t_jefe, 8, 'ping');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'SALE GTA VI', 540, 200, { size: 90, col: C.ink, sc: pb(T, sec(s).t0 - .2) });
    tag(c, 'ENCUESTA EN EE. UU. · OCT. 2026', 540, 300, { size: 28, bg: C.paper, sc: pb(T, t_e - .3) });
    // 5 personas: 1 se va (dorado)
    for (let k = 0; k < 5; k++) { const out = k === 2 && T > t_5 + .2, x = 140 + k * 200 + (out ? pr(T, t_5 + .2, 1.2, easeIn) * 700 : 0);
      person(c, x, 820, .6, { seed: 3 + k * 2, shirt: k === 2 ? YOU : C.lav, ...idle(T, k), look: out ? 1 : 0, mouth: out ? 'grin' : 'smile', walk: out ? L * 8 : undefined }); }
    pill(c, '1 DE CADA 5 · 18 %', 540, 420, { size: 52, sc: pb(T, t_5 + .1) });
    if (T > t_m) { pill(c, 'LA MITAD SE REPORTA «ENFERMA»', 540, 960, { size: 40, f: 'ui', sc: pb(T, t_m + .1), col: '#FFB4A6' });
      person(c, 300, 1440, .85, { seed: 13, shirt: C.lav, ...idle(T, 1), look: 1, mouth: 'o', armR: [1.2, 1.3], prop: (cc, hL, hR) => { cc.save(); cc.translate(hR[0], hR[1] - 30); shp(cc, R4(-22, -40, 44, 80), C.ink, { w: 3, lc: C.ink, seed: 5160 }); cc.restore(); ln(cc, [[-10, -300], [40, -330]], { w: 5, col: C.red, seed: 5161 }); } });
      person(c, 800, 1440, .85, { seed: 7, shirt: C.navy, ...idle(T, 2), look: -1, flip: true, mouth: T > t_jefe ? 'flat' : 'smile', brow: T > t_jefe ? -1 : 0, armL: [1.0, 1.2] });
      bubble(c, 'Jefe… amanecí como enfermito', 330, 1100, pb(T, w_en + (nx - w_en - 5.7) / 2), { tail: 20, seed: 5162, size: 34 });
      bubble(c, '¿Usted también?', 780, 1180, pb(T, t_jefe), { tail: 20, seed: 5163, size: 38, bg: C.goldL }); }
    src(c, 'BambooHR, oct. 2026 · 1.530 empleados de tiempo completo en EE. UU.');
  }); }

// 3 · TikTok · Cuánto costó + Burj Khalifa · (Short: «plata» combina costo y ventas)
function costScene(s, tr) { const t_r = TK ? As(s, 'Rockstar nunca') : null, t_15 = As(s, 'entre mil y mil quinientos millones'), t_b = TK ? As(s, 'construir el Burch Jalifa,') : As(s, 'construir el Burch Jalifa,'),
    t_rs = TK ? As(s, 'casi lo mismo que un rascacielos.') : null, t_8 = !TK ? As(s, 'unos ocho mil millones,') : null;
  if (t_r) hit(t_r + .1, 8, 'stamp'); hit(t_15 + .2, 14, 'stamp'); hit(t_b + .2, 12, 'impact'); if (t_rs) hit(t_rs + .1, 10, 'stamp'); if (t_8) hit(t_8 + .2, 14, 'stamp');
  scene(s, tr, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 940], [t_b, 940], [t_b + .8, 900]]), 1.0 + .012 * Math.sin(L));
    tx(c, '¿CUÁNTO COSTÓ HACERLO?', 540, 200, { size: 72, col: C.ink, sc: pb(T, sec(s).t0 - .2) });
    if (t_r) stamp(c, 'SIN CIFRA OFICIAL', 540, 310, T, t_r + .1, { size: 46, col: C.red, rot: -.03 });
    const Z = 1350, Hm = 700;
    const gm = T < t_15 - .1 ? .3 * pr(T, sec(s).t0, .8, easeOutBack) : .3 + .7 * pr(T, t_15 - .1, 1.0, easeOutBack); moneyStack(c, 320, Z, 200, Hm * gm, 5170); if (T < t_15) tx(c, '?', 320, Z - Hm * gm - 70, { size: 90, col: C.red, sh: null, sc: 1 + .1 * Math.sin(T * 6) });
    if (T > t_15) { pill(c, 'USD 1.000–1.500 M', 320, Z - Hm * gm - 60, { size: 40, f: 'ui', sc: pb(T, t_15 + .3) }); tag(c, 'ESTIMADO DE ANALISTAS', 320, Z + 50, { size: 24, bg: C.paper }); }
    const gb = pr(T, t_b - .1, 1.4, easeOutBack); tower(c, 780, Z, 200, Hm * gb, 5180);
    if (T > t_b) { pill(c, 'BURJ KHALIFA ≈ USD 1.500 M', 780, Z - Hm * gb - 170, { size: 32, f: 'ui', sc: pb(T, t_b + .5) }); tag(c, 'EL EDIFICIO MÁS ALTO DEL MUNDO', 780, Z + 50, { size: 22, bg: C.paper }); }
    ln(c, [[100, Z], [980, Z]], { w: 7, straight: true, seed: 5190 });
    if (t_rs) stamp(c, 'UN JUEGO ≈ UN RASCACIELOS', 540, 1470, T, t_rs + .05, { size: 50, col: C.goldD, rot: .03 });
    if (t_8) { pill(c, 'TAKE-TWO ESPERA ≈ USD 8.000 M EN SU AÑO FISCAL', 540, 420, { size: 30, f: 'ui', sc: pb(T, t_8 + .2) }); tag(c, '(TODA LA EMPRESA)', 540, 500, { size: 24, bg: C.goldL, sc: pb(T, t_8 + .5) }); }
    src(c, TK ? 'Costo: estimado de analistas, sin cifra oficial · Burj Khalifa: ICE / MEED' : 'Costo: estimado de analistas · Burj Khalifa: ICE / MEED · Take-Two: guía año fiscal 2027');
  }); }
if (has('costo')) costScene('costo', 'iris');
if (has('plata')) costScene('plata', 'iris');

// 4 · TikTok · Cuánto puede ganar
if (has('gana')) { const s = 'gana', t_tt = As(s, 'Teik Tu,'), t_8 = As(s, 'ocho mil millones de dólares,'), t_bp = As(s, 'en buena parte'), t_c = As(s, 'treinta y cinco y cuarenta y cinco millones');
  hit(t_tt + .1, 8, 'ping'); hit(t_8 + .2, 16, 'stamp'); hit(t_bp + .1, 6, 'ping'); hit(t_c + .2, 14, 'stamp');
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, '¿Y CUÁNTO PUEDE GANAR?', 540, 200, { size: 72, col: C.ink, sc: pb(T, sec(s).t0 - .2) });
    card(c, 540, 480, 860, 300, { band: C.navy, seed: 5200, sc: pb(T, t_tt - .1), draw: (cc, w, h) => { tx(cc, 'TAKE-TWO (DUEÑA DE ROCKSTAR)', 0, -h / 2 + 36, { size: 30, f: 'ui', col: C.paper }); if (T > t_8) tx(cc, 'USD 8.000–8.200 M', 0, 20, { size: 74, col: C.goldD, sh: null, sc: pb(T, t_8 + .1) }); if (T > t_bp) tx(cc, 'ventas esperadas en todo su año fiscal', 0, 95, { size: 34, f: 'hand', col: C.ink, sh: null }); } });
    // cajas de copias que se apilan
    const n = Math.floor(pr(T, t_c - .2, 2.2, t => t) * 40);
    for (let k = 0; k < n; k++) { const x = 170 + (k % 10) * 82, y = 1300 - Math.floor(k / 10) * 92; shp(c, R4(x - 34, y - 42, 68, 84), k % 3 ? C.navy : '#3B4466', { sharp: true, w: 3, lc: C.ink, seed: 5210 + k }); c.fillStyle = C.gold; c.fillRect(x - 24, y - 30, 48, 10); }
    if (T > t_c) pill(c, '35–45 MILLONES DE COPIAS', 540, 790, { size: 46, sc: pb(T, t_c + .3) }); if (T > t_c) tag(c, 'ESTIMADO DE ANALISTAS · PRIMER AÑO', 540, 875, { size: 24, bg: C.paper, sc: pb(T, t_c + .5) });
    src(c, 'Take-Two: guía año fiscal 2027 (Game Developer, ago. 2026) · copias: DFC, BofA y otros analistas');
  }); }

// 5 · TikTok · La otra economía: clips, transmisiones y creadores
if (has('mundo')) { const s = 'mundo', t_n = As(s, 'no se frena'), t_o = As(s, 'Pero sí mueve otra:'), t_cl = As(s, 'los clips,'), t_tr = As(s, 'las transmisiones'), t_cr = As(s, 'los creadores');
  hit(t_n + .1, 8, 'stamp'); hit(t_o + .1, 10, 'stamp'); hit(t_cl + .1, 6, 'ping'); hit(t_tr + .1, 6, 'ping'); hit(t_cr + .1, 8, 'ping');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'LA ECONOMÍA NO SE FRENA…', 540, 200, { size: 64, col: C.ink, sc: pb(T, sec(s).t0 - .2), max: 1000 });
    stamp(c, '…PERO MUEVE OTRA', 540, 320, T, t_o, { size: 60, col: C.goldD, rot: -.03 });
    [[t_cl, 'CLIPS', 200], [t_tr, 'TRANSMISIONES', 540], [t_cr, 'CREADORES', 880]].forEach(([t, lab, x], k) => { const kk = pb(T, t); if (kk <= 0) return; c.save(); c.translate(x, 700); c.scale(kk, kk); phoneClip(c, 0, 0, 1.1, T, 5230 + k * 7); c.restore(); tag(c, lab, x, 860, { size: 30, bg: C.goldL, sc: kk }); });
    person(c, 300, 1380, .8, { seed: 9, shirt: C.lav, ...idle(T), look: 1, mouth: 'grin', armR: [1.4, 1.0] }); person(c, 780, 1380, .8, { seed: 11, shirt: C.vio, ...idle(T, 2), look: -1, mouth: 'smile', armL: [1.4, 1.0] });
    console_(c, 540, 1240, .7, T);
  }); }

// 6 · El dato para quien invierte: una empresa, un producto
if (has('leccion')) { const s = 'leccion', t_d = As(s, 'para quien invierte:'), t_u = As(s, 'un solo producto.'), t_f = As(s, 'Si funciona,'), t_dc = As(s, 'Si decepciona,'), t_a = As(s, 'no conviene apostar');
  hit(t_d + .1, 8, 'ping'); hit(t_u + .2, 12, 'stamp'); hit(t_f + .1, 8, 'ping'); hit(t_dc + .1, 14, 'impact'); hit(t_a + .1, 12, 'stamp');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 940, 1.0 + .012 * Math.sin(L));
    tx(c, 'EL DATO PARA QUIEN INVIERTE', 540, 200, { size: 64, col: C.ink, sc: pb(T, sec(s).t0 - .2), max: 1000 });
    // edificio de la empresa sobre UNA columna
    const wob = T > t_dc ? Math.sin(T * 9) * .05 * (1 - pr(T, t_dc + 1.5, .8)) : 0; c.save(); c.translate(540, 1150); c.rotate(wob);
    shp(c, R4(-40, -40, 80, 260), C.goldD, { sharp: true, w: 5, lc: C.ink, seed: 5250 }); shp(c, R4(-260, -380, 520, 340), C.navy, { sharp: true, w: 6, lc: C.ink, seed: 5251 });
    for (let k = 0; k < 12; k++) { c.fillStyle = Math.sin(T * 2 + k) > -.3 ? C.goldL : '#3B4466'; c.fillRect(-220 + (k % 4) * 115, -340 + Math.floor(k / 4) * 100, 70, 60); } c.restore();
    tag(c, '1 PRODUCTO', 540, 1290, { size: 34, bg: C.goldL, sc: pb(T, t_u) });
    if (T > t_f) pill(c, 'SI FUNCIONA → GANA', 280, 500, { size: 36, f: 'ui', sc: pb(T, t_f), bg: C.green, col: C.paper });
    if (T > t_dc) pill(c, 'SI DECEPCIONA → LA ACCIÓN LO SIENTE', 620, 600, { size: 34, f: 'ui', sc: pb(T, t_dc), col: '#FFB4A6' });
    stamp(c, 'NO APUESTES TODO A UNA SOLA', 540, 1440, T, t_a, { size: 46, col: C.red, rot: -.02 });
  }); }

// 7 · Cierre (noche): ¿tú vas a pedir el día?
if (has('cierre')) { const s = 'cierre', t_q = As(s, '¿Tú vas a pedir el día?'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_q + .1, 10, 'stamp'); sfx(t_end + .3, 'ping');
  scene(s, TK ? 'iris' : 'whip', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 16; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 520 + 80, a = .35 + .55 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    calendar(c, 540, 560, .8, T, sec(s).t0 + .2);
    tx(c, '¿TÚ VAS A PEDIR EL DÍA?', 540, 920, { size: 70, col: C.gold, sh: null, sc: pb(T, t_q), max: 1000 });
    tx(c, 'Cuéntanos en los comentarios', 540, 1020, { size: 40, f: 'hand', col: C.chalk, sh: null, al: pr(T, t_q + .6, .4) });
    const ke = pr(T, t_end + .2, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1420, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1490, { size: 50, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada: el calendario del 19 y la consola, con el titular completo =================
function cover(c) { drawScene(c, SC[0], As('gancho', 'Es un videojuego.') + 1.2); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('gta-19-nov', cover);
