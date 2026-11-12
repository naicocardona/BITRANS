// TITÁN · Reflexión «Punto de partida» · opción A «escenas de cerca» (aprobada por Lady: A1 pelo corto, camiseta básica negra) · Short (sh) y TikTok (tk)
// tools/ref2/build.sh une paint.js + este archivo. Mismo audio aprobado (voz Juan con pausas de respiración).
'use strict';
const TK = MODE === 'tk';
const has = id => !!SEC[id];
const AS = (id, ph) => has(id) ? As(id, ph) : null;
const FACE = { mood: 'tired', shirt: TEE };
const bgGrad = (c, a, b) => { resetT(c); c.fillStyle = lin(c, 0, 0, 0, H, [[0, a], [1, b]]); c.fillRect(0, 0, W, H); };
const stars = (c, T, k) => { for (let i = 0; i < 40; i++) { const x = (i * 197) % 1060 + 10, y = (i * 131) % 900 + 60, a = k * (.3 + .5 * Math.abs(Math.sin(T * 1.5 + i))); c.save(); c.globalAlpha = a; c.fillStyle = C.goldL; c.beginPath(); c.arc(x, y, 2.4, 0, TAU); c.fill(); c.restore(); } };

// 1 · Inicio: de noche, rostro cansado iluminado por la pantalla con el mercado en rojo
if (has('resultado')) { const t_c = AS('resultado', 'Casi nadie'); hit(.05, 4, 'ping'); if (t_c !== null) hit(t_c + .2, 6, 'stamp');
  scene('resultado', null, (c, T, L) => {
    bgGrad(c, '#0B0D1C', '#161A33');
    for (let k = 0; k < 9; k++) { const x = 90 + k * 115, h = 60 + (k * 53) % 140, y = 760 + (k % 3) * 40 + Math.sin(T + k) * 6; c.save(); c.globalAlpha = .22; c.fillStyle = k % 3 ? '#D9604F' : '#3FAF7A'; c.fillRect(x, y, 34, h); c.fillRect(x + 15, y - 30, 4, h + 60); c.restore(); }
    camS(c, T, 540, 1000, 1.02 + .02 * (T / 5));
    closeFace(c, { ...FACE, cx: 540, cy: 1200, R: 360, up: .3, open: .55 + .05 * Math.sin(T * 1.3), light: { x: 540, y: 2100, col: '#FF6A5A', k: .95 } });
    resetT(c); c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = lin(c, 0, 700, 0, 1900, [[0, 'rgba(20,22,48,.55)'], [.5, 'rgba(20,22,48,.15)'], [1, 'rgba(120,30,30,.1)']]); c.fillRect(0, 0, W, H); c.restore();
    resetT(c); glow(c, 540, 1950, 700, '#FF5A4A', .35 + .08 * Math.sin(T * 7));
    shp(c, [[180, 1700], [900, 1700], [960, 1990], [120, 1990]], '#10121F', { w: 6, lc: '#000', seed: 1701 }); ln(c, [[200, 1702], [880, 1702]], { w: 6, col: '#FF7A6A', seed: 1702 });
    vignette(c, .6); bigTitle(c, 'TODOS QUIEREN', 'EL RESULTADO', 230, { pa: pr(T, .0, .6, easeIO), pb: pr(T, .3, .6, easeIO) });
    if (t_c !== null && T > t_c) bigTitle(c, null, 'CASI NADIE QUIERE EL PROCESO', 460, { sb: 50, cb: C.chalk, pb: pr(T, t_c, .6, easeIO) });
    filmGrain(c, T);
  }, true); }

// 2 · Levantarte al día siguiente de equivocarte: de lado en la almohada, ojos abiertos; la alarma suena
if (has('levantarte')) { const t_q = AS('levantarte', 'Querer algo'), t_d = AS('levantarte', 'Lo difícil'), t_e = AS('levantarte', 'de equivocarte.');
  hit(t_q + .1, 4, 'ping'); hit(t_d + .3, 8, 'stamp'); hit(t_e + .1, 6, 'ping');
  scene('levantarte', 'wipe', (c, T, L) => {
    bgGrad(c, '#10132A', '#1C2040');
    resetT(c); c.save(); c.globalAlpha = .9; c.fillStyle = '#2A2F55'; c.fillRect(0, 1250, W, 700); c.restore();   // cama
    camS(c, T, 540, 1000, 1.03 + .03 * pr(T, t_d, 2, easeIO));
    shp(c, blob(560, 1210, 520, 200, 1901, { amp: .05, n: 40 }), '#D8D4E6', { w: 6, lc: C.ink, seed: 1902 }); hatch(c, polyPath(blob(560, 1210, 520, 200, 1901, { amp: .05, n: 40 }), true), [40, 1000, 1040, 420], { angle: .2, gap: 12, len: 40, color: '#7A7894', alpha: .3, seed: 1903 });
    c.save(); c.translate(560, 1080); c.rotate(-1.45); closeFace(c, { ...FACE, cx: 0, cy: 0, R: 300, up: .5, open: T > t_d ? .9 : .4, light: { x: 300, y: -600, col: '#9FB4FF', k: .5 } }); c.restore();
    shp(c, [[-80, 1380], [1160, 1330], [1160, 2000], [-80, 2000]], '#3B3560', { w: 6, lc: C.ink, seed: 1904 }); hatch(c, polyPath([[-80, 1380], [1160, 1330], [1160, 2000], [-80, 2000]], true), [-80, 1330, 1240, 700], { angle: .5, gap: 10, len: 50, color: '#1A1638', alpha: .35, seed: 1905 });
    // despertador: 6:00 en rojo, vibra
    const vib = T > t_d ? Math.sin(T * 60) * 4 : 0; c.save(); c.translate(860 + vib, 760); shp(c, R4(-120, -80, 240, 160), '#15172A', { w: 5, lc: '#000', seed: 1906 }); tx(c, '6:00', 0, 4, { size: 86, f: 'ui', col: '#FF5A4A', sh: null }); c.restore();
    resetT(c); glow(c, 860, 760, 260, '#FF5A4A', .45); if (T > t_d) lines(c, 860, 760, T, t_d + ((T - t_d) % .6 < .3 ? 0 : .3), { col: '#FF8A7A', r: 150 });
    vignette(c, .6); bigTitle(c, 'QUERER ES FÁCIL', null, 240, { sa: 76, pa: pr(T, t_q - .2, .5, easeIO) });
    if (T > t_d - .2) bigTitle(c, null, 'LO DIFÍCIL ES LEVANTARTE', 330, { sb: 64, pb: pr(T, t_d - .2, .6, easeIO) });
    if (T > t_e - .2) bigTitle(c, null, 'DESPUÉS DE EQUIVOCARTE', 420, { sb: 46, cb: C.chalk, pb: pr(T, t_e - .3, .5, easeIO) });
    filmGrain(c, T);
  }, true); }

// 3 · TikTok · Nosotros nos equivocamos: se van la plata (monedas), el tiempo (reloj que se derrite) y la confianza (vidrio roto)
if (has('nosotros')) { const t_n = AS('nosotros', 'Nosotros'), t_p = AS('nosotros', 'Perdimos plata,'), t_t = AS('nosotros', 'tiempo…'), t_cf = AS('nosotros', 'la confianza');
  hit(t_n + .1, 4, 'ping'); hit(t_p + .3, 8, 'stamp'); hit(t_t + .1, 6, 'stamp'); hit(t_cf + .2, 10, 'stamp');
  scene('nosotros', 'drop', (c, T, L) => {
    bgGrad(c, '#0C0E1E', '#1B1E3A'); stars(c, T, .4);
    camS(c, T, 540, 1000, 1.02 + .02 * Math.sin(L * .7));
    // manos que se abren y sueltan monedas
    const op = pr(T, t_p - .1, .6, easeIO); hand(c, 330, 1450, 1.0, -.25 - op * .35, { curl: 1 - op }); hand(c, 750, 1450, 1.0, .25 + op * .35, { curl: 1 - op });
    for (let k = 0; k < 10; k++) { const t0 = t_p + k * .12; if (T < t0) { coinC(c, 450 + (k % 5) * 40, 1180 - (k % 3) * 20, 34, k, 1910 + k); continue; } const u = T - t0; coinC(c, 450 + (k % 5) * 40 + (k - 5) * u * 60, 1180 + u * u * 700, 34, k + u * 8, 1910 + k); }
    if (T > t_p) tx(c, 'PLATA', 540, 1080, { size: 54, f: 'ui', col: '#FF8A7A', sc: pb(T, t_p) });
    if (T > t_t - .3) { clockC(c, 800, 780, 115, T, pr(T, t_t, 2), 1930); tx(c, 'TIEMPO', 800, 600, { size: 54, f: 'ui', col: '#FF8A7A', sc: pb(T, t_t) }); }
    if (T > t_cf - .2) { const k = pb(T, t_cf); c.save(); c.translate(290, 760); c.scale(k, k); shp(c, blob(0, 0, 120, 150, 1940, { n: 30, amp: .02 }), '#B9C4E8', { w: 5, lc: C.ink, seed: 1941 });
      for (const [a, b] of [[[-20, -150], [10, -20]], [[10, -20], [-60, 60]], [[10, -20], [90, 40]], [[-60, 60], [-90, 140]], [[90, 40], [70, 150]]]) ln(c, [a, b], { w: 4, p: pr(T, t_cf + .1, .4), seed: 1942 }); c.restore();
      tx(c, 'CONFIANZA', 290, 580, { size: 54, f: 'ui', col: '#FF8A7A', sc: pb(T, t_cf + .1) }); }
    vignette(c, .55); bigTitle(c, 'NOSOTROS NOS EQUIVOCAMOS', 'MUCHAS VECES', 230, { sa: 62, sb: 84, pa: pr(T, t_n - .2, .5, easeIO), pb: pr(T, t_n + .5, .5, easeIO) });
    filmGrain(c, T);
  }, true); }

// 4 · Consecuencias bajo la lluvia… «y aun así, levantamos la cabeza» (el rayo de luz dorada)
if (has('consecuencias')) { const t_a = AS('consecuencias', 'Al final'), t_l = AS('consecuencias', 'levantamos la cabeza.'), t_y = AS('consecuencias', 'Y aun así,');
  hit(t_a + .2, 4, 'ping'); hit(t_y + .1, 6, 'ping'); hit(t_l + .2, 12, 'stamp');
  scene('consecuencias', 'blot', (c, T, L) => {
    const u = pr(T, t_l - .2, 1.6, easeIO);
    bgGrad(c, mix('#0D1020', '#2A2350', u), '#12152A');
    resetT(c); c.save(); c.globalCompositeOperation = 'screen'; c.globalAlpha = .1 + .6 * u; c.fillStyle = lin(c, 1080, 0, 300, 1300, [[0, '#FFD08A'], [1, 'rgba(255,208,138,0)']]); c.beginPath(); c.moveTo(1080, -50); c.lineTo(1250, -50); c.lineTo(650, 1500); c.lineTo(250, 1500); c.closePath(); c.fill(); c.restore();
    rain(c, T, 1 - u * .7, 1711);
    camS(c, T, 540, 1000, 1.03 + .03 * u + .015 * pr(T, t_a, 3));
    closeFace(c, { ...FACE, cx: 540, cy: 1150, R: 380, up: lerp(.12, .92, u), open: lerp(.35, 1, u), mood: u > .6 ? 'hope' : 'sad', tear: pr(T, t_a + .8, 1.2), light: { x: 1000, y: 200, col: '#FFC870', k: .2 + .7 * u } });
    resetT(c); glow(c, 860, 520, 620, '#FFC870', .15 + .5 * u); vignette(c, .55);
    const pre = 1 - pr(T, t_y - .4, .4); if (pre > 0) { c.save(); c.globalAlpha = pre; bigTitle(c, 'ASUMIMOS', 'LAS CONSECUENCIAS', 240, { sa: 70, sb: 78, cb: C.chalk, pa: pr(T, t_a - .2, .5, easeIO), pb: pr(T, t_a + .8, .6, easeIO) }); c.restore(); }
    if (T > t_y - .4) bigTitle(c, 'Y AUN ASÍ…', 'LEVANTAMOS LA CABEZA', 240, { sa: 70, sb: 76, pa: pr(T, t_y - .2, .5, easeIO), pb: pr(T, t_l - .2, .6, easeIO) });
    filmGrain(c, T);
  }, true); }

// 5 · El error no te saca del camino: una mano sobre el pavimento mojado, el camino al fondo; con «quedarte en el piso» empuja y se levanta
if (has('aprendimos')) { const t_e = AS('aprendimos', 'el error no te saca'), t_q = AS('aprendimos', 'Lo que te saca'), t_p = AS('aprendimos', 'quedarte en el piso.');
  hit(t_e + .1, 6, 'stamp'); hit(t_q + .1, 4, 'ping'); hit(t_p + .4, 10, 'stamp');
  scene('aprendimos', 'iris', (c, T, L) => {
    bgGrad(c, '#2A2350', '#6B4FA0'); resetT(c); glow(c, 540, 1060, 700, '#F2B872', .45);
    // camino que se pierde en el horizonte
    shp(c, [[-100, 1990], [470, 1080], [610, 1080], [1180, 1990]], '#2A2D45', { line: false }); for (let k = 0; k < 7; k++) { const v = ((k / 7 + T * .08) % 1), y = lerp(1100, 1990, v * v), w2 = lerp(4, 30, v * v); c.save(); c.fillStyle = C.goldL; c.globalAlpha = .7; c.fillRect(540 - w2 / 2, y, w2, lerp(10, 70, v * v)); c.restore(); }
    shp(c, [[-100, 1100], [300, 1050], [700, 1090], [1180, 1040], [1180, 1110], [-100, 1110]], '#4A3F6A', { line: false });
    camS(c, T, 540, 1050, 1.02 + .03 * pr(T, t_e, 3));
    const up = pr(T, t_p + .1, 1.2, easeIO); closeFace(c, { ...FACE, cx: 540, cy: lerp(1420, 1180, up), R: 340, up: lerp(.2, .58, up), open: lerp(.6, 1, up), mood: up > .5 ? 'hope' : 'tired', light: { x: 540, y: 900, col: '#F2B872', k: .4 + .4 * up } });
    for (let k = 0; k < 6; k++) { const a = k / 6 * TAU, rr = 160 + ((T * 90 + k * 40) % 120); c.save(); c.globalAlpha = .2 * (1 - up); c.strokeStyle = '#B9C4E8'; c.lineWidth = 3; c.beginPath(); c.ellipse(540, 1900, rr, rr * .25, 0, 0, TAU); c.stroke(); c.restore(); }
    resetT(c); vignette(c, .45);
    bigTitle(c, 'EL ERROR NO TE SACA', 'DEL CAMINO', 230, { sa: 66, sb: 90, pa: pr(T, t_e - .2, .5, easeIO), pb: pr(T, t_e + .5, .5, easeIO) });
    if (T > t_q - .2) bigTitle(c, 'LO QUE TE SACA ES', 'QUEDARTE EN EL PISO', 470, { sa: 48, sb: 66, cb: '#FF9A8A', pa: pr(T, t_q - .2, .5, easeIO), pb: pr(T, t_p - .2, .5, easeIO) });
    filmGrain(c, T, .05);
  }, true); }

// 6 · TikTok · La disciplina: pies que suben escalones aunque nadie aplauda, el mercado caiga o no parezca avanzar
if (has('disciplina')) { const t_d = AS('disciplina', 'La disciplina'), t_lc = AS('disciplina', 'hacer lo correcto'), t_na = AS('disciplina', 'cuando nadie te aplaude,'), t_mc = AS('disciplina', 'cuando el mercado cae,'), t_av = AS('disciplina', 'cuando parece');
  hit(t_d + .1, 6, 'stamp'); hit(t_lc + .1, 4, 'ping'); hit(t_na + .1, 4, 'ping'); hit(t_mc + .1, 8, 'stamp'); hit(t_av + .1, 4, 'ping');
  scene('disciplina', 'whip', (c, T, L) => {
    bgGrad(c, '#3A2E66', '#8A6AB8'); resetT(c); glow(c, 900, 600, 600, '#F2B872', .35);
    const sc = (T * 140) % 220;   // la escalera baja: los pies suben
    camS(c, T, 540, 1000, 1.02);
    for (let k = -1; k < 8; k++) { const y = 1900 - k * 220 + sc - 220, x = 140 + k * 0; shp(c, R4(-60, y, 1200, 230), k % 2 ? '#2A2D45' : '#30344F', { sharp: true, w: 5, lc: C.ink, seed: 1950 + (k + 2) }); ln(c, [[-60, y], [1140, y]], { w: 6, col: C.goldD, straight: true, seed: 1960 + (k + 2) }); }
    const ph = (T * 140 / 220) % 2, l = ph < 1, yA = 1680 - (l ? easeIO(ph % 1) * 220 : 0) + sc - 220 * 0, yB = 1680 - (!l ? easeIO(ph % 1) * 220 : 0);
    shoe(c, 400, 1480 - (l ? easeIO(ph % 1) * 200 : 0), 2.0, false, 1970); shoe(c, 640, 1480 - (!l ? easeIO(ph % 1) * 200 : 0), 2.0, false, 1975);
    if (T > t_na) tag(c, 'NADIE TE APLAUDE', 280, 760, { size: 32, bg: C.paper, sc: pb(T, t_na), rot: -.05 });
    if (T > t_mc) { card(c, 780, 900, 300, 220, { sc: pb(T, t_mc), band: '#141418', seed: 1980, draw: cc => { const P = []; for (let i = 0; i <= 12; i++) P.push([-120 + i * 20, -40 + i * 9 + Math.sin(i * 2.2) * 12]); ln(cc, P, { w: 7, col: C.red, seed: 1981 }); tx(cc, 'EL MERCADO CAE', 0, -78, { size: 22, f: 'ui', col: C.gold }); } }); }
    if (T > t_av) tag(c, 'PARECE QUE NO AVANZAS', 360, 1100, { size: 32, bg: C.paper, sc: pb(T, t_av), rot: .04 });
    resetT(c); vignette(c, .45);
    bigTitle(c, 'LA DISCIPLINA', 'NO SE SIENTE BIEN', 230, { sa: 86, sb: 66, ca: C.gold, cb: C.chalk, pa: pr(T, t_d - .2, .5, easeIO), pb: pr(T, t_d + .5, .5, easeIO) });
    if (T > t_lc - .2) bigTitle(c, null, 'ES HACER LO CORRECTO', 460, { sb: 50, cb: C.chalk, pb: pr(T, t_lc - .2, .5, easeIO) });
    filmGrain(c, T, .05);
  }, true); }

// 7 · TikTok · Cumplir tu palabra contigo: libreta con la lista del día; cada ✓ es una promesa cumplida
if (has('palabra')) { const t_c = AS('palabra', 'Cada vez'), t_p = AS('palabra', 'cumples tu palabra'), t_s = AS('palabra', 'sostener lo que sueña.');
  hit(t_c + .1, 4, 'ping'); hit(t_p + .1, 6, 'ping'); hit(t_s + .1, 10, 'stamp');
  scene('palabra', 'wipe', (c, T, L) => {
    bgGrad(c, '#6B4FA0', '#C99AC0'); resetT(c); glow(c, 900, 500, 700, '#FFD08A', .45);
    camS(c, T, 540, 1050, 1.0 + .04 * pr(T, t_c, 4, easeIO));
    shp(c, R4(-100, 1500, 1300, 600), '#5A3E2E', { sharp: true, line: false }); hatch(c, rectPath(-100, 1500, 1300, 600), [-100, 1500, 1300, 600], { angle: .05, gap: 14, len: 80, color: '#2A1A12', alpha: .4, seed: 1990 });
    notebook(c, 540, 1180, -.05, T, t_p, 5, 1991);
    hand(c, 900, 1560, .9, -.6, { curl: .6 }); c.save(); c.translate(820, 1370); c.rotate(-.9); shp(c, R4(-12, -180, 24, 220), '#1A1A22', { sharp: true, w: 3, lc: '#000', seed: 1999 }); c.restore();
    resetT(c); vignette(c, .35);
    bigTitle(c, 'CUMPLE TU PALABRA', 'CONTIGO', 230, { sa: 70, sb: 92, ca: '#1A1638', sha: '#FFE3A8', cb: '#1A1638', shb: '#F2B872', pa: pr(T, t_c - .2, .5, easeIO), pb: pr(T, t_p + .2, .5, easeIO) });
    if (T > t_s - 1.2) bigTitle(c, null, 'Y SOSTENDRÁS LO QUE SUEÑAS', 450, { sb: 52, cb: '#1A1638', shb: '#FFE3A8', pb: pr(T, t_s - 1.2, .6, easeIO) });
    filmGrain(c, T, .045);
  }, true); }

// 8 · No se trata de no caerse: golpe al piso (mano), y el rostro decidido con el contador de veces que te levantas
if (has('caerse')) { const t_n = AS('caerse', 'No se trata'), t_cv = AS('caerse', 'cuántas veces'), t_l = AS('caerse', 'dispuesto a levantarte.');
  hit(t_n + .9, 14, 'stamp'); hit(t_cv + .1, 6, 'ping'); hit(t_l + .2, 10, 'stamp');
  scene('caerse', 'drop', (c, T, L) => {
    const f = pr(T, t_cv - .3, .6, easeIO);
    bgGrad(c, mix('#3A2E66', '#E9B872', f * .8), mix('#6B4FA0', '#F6E3B8', f * .8)); resetT(c); glow(c, 540, 400, 900, '#FFD08A', .2 + .5 * f);
    camS(c, T, 540, 1000, 1.02 + .02 * Math.sin(L));
    const fall = pr(T, t_n + .5, .4, easeIn); closeFace(c, { ...FACE, cx: 540, cy: lerp(1250 + fall * 260, 1250, f), R: 380, up: lerp(lerp(.5, .12, fall), .62, f), open: lerp(lerp(.9, .3, fall), 1, f), mood: f > .5 ? 'hope' : 'sad', light: { x: 540, y: 300, col: '#FFD08A', k: .3 + .5 * f } });
    if (T > t_n + .9 && f < 1) for (let k = 0; k < 12; k++) { const a = -Math.PI + k / 11 * Math.PI, u = cl01((T - t_n - .9) / .7); c.save(); c.globalAlpha = (1 - u) * .7; c.fillStyle = '#B9C4E8'; c.beginPath(); c.arc(540 + Math.cos(a) * 420 * u, 1700 + Math.sin(a) * 200 * u, 9, 0, TAU); c.fill(); c.restore(); }
    if (f > 0) {
      const n = Math.max(1, Math.floor((T - t_cv) * 3) + 1); pill(c, n > 7 ? '∞' : '× ' + n, 840, 760, { size: 70, sc: pb(T, t_cv + .2), top: 'VECES QUE TE LEVANTAS', topc: '#1A1638' }); }
    resetT(c); vignette(c, .4);
    bigTitle(c, 'NO SE TRATA', 'DE NO CAERSE', 230, { sa: 72, sb: 86, ca: f > .5 ? '#1A1638' : C.chalk, cb: f > .5 ? '#7A4E12' : C.gold, sha: f > .5 ? '#FFE3A8' : '#0D1020', shb: f > .5 ? '#FFE3A8' : '#0D1020', pa: pr(T, t_n - .2, .5, easeIO), pb: pr(T, t_n + .3, .5, easeIO) });
    if (T > t_cv - .2) bigTitle(c, null, 'SINO DE CUÁNTAS VECES TE LEVANTAS', 470, { sb: 46, cb: '#1A1638', shb: '#FFE3A8', pb: pr(T, t_cv - .2, .8, easeIO) });
    filmGrain(c, T, .05);
  }, true); }

// 9 · Final: de espaldas frente al amanecer — «ES TU PUNTO DE PARTIDA» + firma
if (has('partida')) { const t_s = AS('partida', 'Si hoy estás'), t_nf = AS('partida', 'no es el final.'), t_p = AS('partida', 'Es tu punto'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_s + .1, 4, 'ping'); hit(t_nf + .1, 8, 'stamp'); hit(t_p + .2, 12, 'stamp'); sfx(t_end + .2, 'ping');
  scene('partida', 'iris', (c, T, L) => {
    resetT(c); c.fillStyle = lin(c, 0, 0, 0, H, [[0, '#3A2E66'], [.35, '#B98AC9'], [.6, '#F2B872'], [.75, '#FFE3A8'], [1, '#F6E3B8']]); c.fillRect(0, 0, W, H);
    const sy = 1220 - pr(T, t_s, (t_end - t_s) + .5, easeIO) * 140; glow(c, 540, sy, 900, '#FFD27A', .9);
    shp(c, blob(540, sy, 190, 190, 1721, { n: 50, amp: .01 }), '#FFD98C', { line: false });
    for (const [y, col, sd] of [[1260, '#7E5A9E', 1722], [1340, '#4A3F6A', 1723], [1430, '#2A2448', 1724]]) shp(c, [[-80, y], [180, y - 60], [420, y - 10], [700, y - 80], [1160, y - 20], [1160, H + 50], [-80, H + 50]], col, { line: false, seed: sd });
    for (let k = 0; k < 14; k++) { const x = 40 + k * 75, h = 60 + (k * 37) % 120; c.save(); c.fillStyle = '#5B4A7E'; c.globalAlpha = .7; c.fillRect(x, 1300 - h, 54, h); c.restore(); }
    for (let k = 0; k < 5; k++) { const x = ((T * 40 + k * 260) % 1400) - 160, y = 520 + k * 60; ln(c, [[x, y], [x + 22, y - 12], [x + 44, y]], { w: 4, col: '#3A2E66', seed: 2000 + k }); }   // aves
    camS(c, T, 540, 980, 1.0 + .03 * pr(T, t_s, 4, easeIO));
    backView(c, { cx: 540, cy: 1450, R: 300 });
    resetT(c); vignette(c, .3);
    const dark = { ca: '#1A1638', sha: '#FFE3A8', cb: '#1A1638', shb: '#F2B872' };
    if (T < t_p - .3) bigTitle(c, 'SI HOY ESTÁS EN EL PISO', 'NO ES EL FINAL', 240, { sa: 60, sb: 92, ...dark, cb: '#B5402F', pa: pr(T, t_s - .2, .5, easeIO), pb: pr(T, t_nf - .2, .5, easeIO) });
    else bigTitle(c, 'ES TU', 'PUNTO DE PARTIDA', 240, { sa: 78, sb: 100, ...dark, pa: pr(T, t_p - .3, .4, easeIO), pb: pr(T, t_p + .1, .6, easeIO) });
    const ke = pr(T, t_end + .2, .6); if (ke > 0) { tag(c, 'GUÁRDALO PARA EL DÍA QUE LO NECESITES', 540, 520, { size: 30, bg: C.paper, sc: ke }); tx(c, 'TITÁN HOLDING', 540, 600, { size: 50, col: '#1A1638', sh: '#FFE3A8', al: ke }); }
    filmGrain(c, T, .05);
  }, true); }

// portada (elegida por Lady): el inicio con «TODOS QUIEREN EL RESULTADO / CASI NADIE QUIERE EL PROCESO» completo
function cover(c) { const tc = has('resultado') ? As('resultado', 'Casi nadie') : 2; drawScene(c, SC[0], Math.min(tc + 1.0, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 26, f: 'ui', col: C.chalk, al: .8 }); }
startFilm('reflexion-punto-de-partida', cover);
