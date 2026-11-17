// TITÁN · Reflexión «Las dos envidias» · Short (sh) y TikTok (tk) · kit híbrido con VARIOS personajes (pedido de Lady, 17 nov 2026)
// Situación HIPOTÉTICA (la mesa familiar). Estudio: Van de Ven, Zeelenberg y Pieters (Tilburg University), Emotion 2009; Motivation and Emotion 2012.
'use strict';
const TK = MODE === 'tk';
const sec = id => SEC[id];
const has = id => !!SEC[id];
const FAM = [[150, 9, C.vio], [300, 3, C.navy], [780, 7, C.lav], [930, 2, C.vio], [70, 11, '#3B4466'], [1010, 13, '#3B4466']];   // [x, seed, camisa]
const YOU = C.gold;

// ---------- piezas ----------
function bubble(c, s, x, y, k, o = {}) { if (k <= 0) return; const w = tw(c, s, { size: o.size || 40, f: 'hand' }) + 70, h = (o.size || 40) * 1.9;
  c.save(); c.translate(x, y); c.rotate(o.rot ?? 0); c.scale(k, k);
  shp(c, [[(o.tail ?? 0) - 18, h / 2 - 6], [(o.tail ?? 0) + 18, h / 2 - 6], [(o.tail ?? 0) * 1.4, h / 2 + 46]], o.bg || C.paper, { w: 4, lc: C.ink, seed: 3101 });
  shp(c, blob(0, 0, w / 2, h / 2, o.seed ?? 3102, { n: 30, amp: .03 }), o.bg || C.paper, { w: 4, lc: C.ink, seed: o.seed ?? 3102 });
  tx(c, s, 0, 3, { size: o.size || 40, f: 'hand', col: o.col || C.ink, sh: null }); c.restore(); }
function table(c, y) { shp(c, R4(-40, y, 1160, 60), '#A8743F', { sharp: true, w: 5, lc: C.ink, seed: 3110 }); shp(c, R4(-40, y + 60, 1160, 260), '#8C5E31', { sharp: true, w: 5, lc: C.ink, seed: 3111 });
  for (const [x, sd] of [[260, 3112], [540, 3113], [820, 3114]]) { shp(c, blob(x, y + 10, 46, 14, sd, { n: 18 }), C.paper, { w: 3, lc: C.ink, seed: sd }); } }
function phone(c, x, y, s, T) { c.save(); c.translate(x, y); c.scale(s, s); shp(c, R4(-55, -95, 110, 190), C.ink, { w: 4, lc: C.ink, seed: 3120 });
  c.fillStyle = '#E9F4EE'; c.fillRect(-45, -80, 90, 150); const g = .5 + .5 * Math.sin(T * 2); ln(c, [[-35, 40], [-12, 15], [8, 25], [35, -30 - g * 8]], { w: 5, col: C.green, seed: 3121 }); c.restore(); }
function glow(c, x, y, r, a = .35) { c.save(); const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(233,217,174,${a})`); g.addColorStop(1, 'rgba(233,217,174,0)'); c.fillStyle = g; c.fillRect(x - r, y - r, 2 * r, 2 * r); c.restore(); }
function steps(c, x, y, n, w, h, col, seed, p = 1) { for (let k = 0; k < n; k++) if (k < n * p + .01) shp(c, R4(x + k * w, y - (k + 1) * h, w, (k + 1) * h), col, { sharp: true, w: 4, lc: C.ink, seed: seed + k }); }
function hipo(c, y = 400) { tag(c, 'SITUACIÓN HIPOTÉTICA', 540, y, { size: 26, bg: C.paper }); }
// familia detrás de la mesa; m(i) devuelve opciones por persona
function family(c, T, Y, m) { FAM.forEach(([x, sd, sh], i) => { const back = i >= 4; person(c, x, Y - (back ? 40 : 0), back ? .82 : .95, { seed: sd, shirt: sh, ...idle(T, i), ...m(i) }); }); }

// ================= escenas =================
// 1 · Gancho: la mesa familiar; TÚ en el centro con el celular; tres burlas que estallan
if (has('gancho')) { const s = 'gancho', t_i = As(s, 'empezaste a invertir'), t_e = As(s, 'eso es para ricos,'), t_t = As(s, 'te van a tumbar,'), t_m = As(s, 'mejor gástatelos.');
  hit(.05, 8, 'stamp'); hit(t_i + .2, 6, 'ping'); hit(t_e, 12, 'stamp'); hit(t_t, 12, 'stamp'); hit(t_m, 14, 'stamp');
  scene(s, null, (c, T, L) => {
    bg(c, T); camS(c, T, 540, key(T, [[0, 960], [t_e, 960], [t_m + .5, 930]]), key(T, [[0, 1.0], [t_e, 1.0], [t_m + .5, 1.06]]) + .01 * Math.sin(L * 1.3));
    tx(c, 'LES CONTASTE QUE', 540, 210, { size: 64, col: C.ink, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, 'EMPEZASTE A INVERTIR', 540, 300, { size: 76, col: C.goldD, sh: C.ink, max: 1000 });
    hipo(c);
    const mood = T > t_e;
    family(c, T, 1250, i => ({ look: i % 2 ? -1 : 1, mouth: mood ? (i === 1 || i === 2 ? 'o' : 'flat') : 'smile', brow: mood ? -1 : 0, armL: mood && i === 0 ? [2.6, .3] : undefined }));
    glow(c, 540, 1000, 300, .5 + .15 * Math.sin(T * 3));
    person(c, 540, 1250, 1.08, { seed: 5, shirt: YOU, ...idle(T), mouth: mood ? 'flat' : 'grin', brow: mood ? 1 : 0, sweat: T > t_m ? T : 0, armR: [1.5, .9], prop: (cc, hL, hR) => phone(cc, hR[0] + 10, hR[1] - 70, .7, T) });
    table(c, 1250);
    pill(c, '$100.000 AL MES', 540, 1420, { size: 44, f: 'ui', sc: pb(T, t_i + .2) });
    bubble(c, 'eso es para ricos', 270, 500, pb(T, t_e), { tail: 30, rot: -.04, seed: 3131, size: 52 });
    bubble(c, 'te van a tumbar', 810, 600, pb(T, t_t), { tail: -30, rot: .04, seed: 3132, bg: '#FFD9D1', size: 52 });
    bubble(c, 'mejor gástatelos', 290, 700, pb(T, t_m), { tail: 50, rot: .03, seed: 3133, size: 52 });
    lines(c, 540, 870, T, t_m);
  }); }

// 2 · Años después: la misma mesa; las caras cambian; todos se inclinan hacia TÚ
if (has('despues')) { const s = 'despues', t_a = As(s, 'unos años después,'), t_r = As(s, 'se nota el resultado.'), t_p = As(s, '¿y tú cómo hiciste?.');
  hit(t_a + .1, 8, 'ping'); hit(t_r + .1, 10, 'stamp'); hit(t_p, 14, 'stamp');
  scene(s, 'news', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 960, key(T, [[0, 1.04], [t_p, 1.0], [t_p + .4, 1.06]]) + .01 * Math.sin(L));
    // hojas de calendario que vuelan (pasan los años)
    for (let k = 0; k < 6; k++) { const u = pr(T, sec(s).t0 + k * .25, 1.1, easeIO); if (u <= 0 || u >= 1) continue; c.save(); c.translate(lerp(540, 1000 - k * 120, u), lerp(300, -100, u)); c.rotate(u * 3 * (k % 2 ? 1 : -1)); shp(c, R4(-60, -70, 120, 140), C.paper, { sharp: true, w: 4, lc: C.ink, seed: 3140 + k }); shp(c, R4(-60, -70, 120, 34), C.red, { sharp: true, w: 3, lc: C.ink, seed: 3150 + k }); c.restore(); }
    tx(c, 'AÑOS DESPUÉS…', 540, 230, { size: 92, col: C.ink, sc: pb(T, t_a - .2) });
    hipo(c, 330);
    family(c, T, 1250, i => ({ look: i < 2 || i === 4 ? 1 : -1, mouth: T > t_p ? 'o' : 'smile', lean: T > t_r ? (i < 2 || i === 4 ? .12 : -.12) : 0 }));
    glow(c, 540, 1000, 340, .6 + .2 * Math.sin(T * 3));
    person(c, 540, 1250, 1.08, { seed: 5, shirt: YOU, ...idle(T), mouth: 'smile', armL: [.4, .3], armR: [.4, .3] });
    table(c, 1250);
    // la planta que creció en la mesa (sin cifras: solo el resultado que «se ve»)
    const g = pr(T, t_r - .3, 1.0, easeIO); if (g > 0) { ln(c, [[700, 1255], [700, 1255 - 160 * g]], { w: 8, col: C.green, seed: 3160 }); for (let k = 0; k < 4; k++) if (g > k / 4) shp(c, blob(700 + (k % 2 ? 30 : -30), 1240 - k * 38 * g, 26, 13, 3161 + k, { n: 14 }), C.green, { w: 3, lc: C.ink, seed: 3161 + k }); shp(c, R4(670, 1235, 60, 30), C.goldD, { sharp: true, w: 3, lc: C.ink, seed: 3166 }); }
    bubble(c, '¿y tú cómo hiciste?', 330, 520, pb(T, t_p), { tail: 60, rot: -.03, seed: 3171, size: 56 });
    bubble(c, '¿me explicas?', 800, 640, pb(T, t_p + .5), { tail: -40, rot: .04, seed: 3172, size: 50 });
  }); }

// 3 · TikTok · Igual que siempre: la rutina mensual que nadie veía
if (has('igual')) { const s = 'igual', t_d = As(s, 'misma disciplina'), t_v = As(s, 'se puede ver.');
  hit(t_d + .1, 8, 'stamp'); hit(t_v + .1, 12, 'stamp');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 960, 1.0 + .012 * Math.sin(L));
    tx(c, 'LA MISMA DISCIPLINA', 540, 230, { size: 76, col: C.ink, sc: pb(T, sec(s).t0 - .2) });
    const n = Math.min(24, Math.max(0, Math.floor((T - sec(s).t0) * 9)));
    for (let k = 0; k < 24; k++) { const x = 175 + (k % 6) * 146, y = 400 + Math.floor(k / 6) * 110, on = k < n; shp(c, R4(x - 55, y - 40, 110, 80), on ? C.goldL : C.paper, { sharp: true, w: 3, lc: C.ink, seed: 3180 + k }); if (on) tx(c, '✓', x, y + 4, { size: 48, col: C.green, sh: null }); }
    tx(c, 'MES A MES', 540, 880, { size: 40, f: 'ui', col: C.goldD });
    stamp(c, 'AHORA SE VE', 540, 1010, T, t_v, { size: 74, col: C.goldD, rot: -.03 });
    person(c, 540, 1520, .9, { seed: 5, shirt: YOU, ...idle(T), mouth: 'smile', walk: L * 5 });
    FAM.slice(0, 2).forEach(([x, sd, sh], i) => person(c, 140 + i * 120, 1500, .55, { seed: sd, shirt: sh, ...idle(T, i), look: 1, mouth: T > t_v ? 'o' : 'flat' }));
  }); }

// 4 · El estudio (noche): dos envidias, dos caminos
if (has('estudio')) { const s = 'estudio', t_u = As(s, 'Universidad de Tilburg'), t_2 = TK ? As(s, 'dos tipos de envidia.') : As(s, 'dos tipos de envidia.'), t_1 = As(s, 'Una te mueve'), t_o = As(s, 'La otra busca');
  hit(t_u + .1, 8, 'ping'); hit(t_2 + .1, 14, 'stamp'); hit(t_1 + .1, 10, 'stamp'); hit(t_o + .1, 12, 'stamp');
  scene(s, 'blot', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .012 * Math.sin(L * .9));
    const kc = pb(T, sec(s).t0 + .1); if (kc > 0) { c.save(); c.translate(540, 330); c.scale(kc, kc); c.rotate(-.02); newspaper(c, 0, 0, 640, 240, 0, { title: 'ESTUDIO SOBRE LA ENVIDIA', seed: 3201 }); c.restore(); }
    tag(c, TK ? 'UNIVERSIDAD DE TILBURG · 2009' : 'UNIVERSIDAD DE TILBURG', 540, 500, { size: 30, bg: C.gold, sc: pb(T, t_u) });
    tx(c, '2 TIPOS DE ENVIDIA', 540, 620, { size: 70, col: C.gold, sh: null, sc: pb(T, t_2) });
    ln(c, [[540, 700], [540, 1500]], { w: 4, col: C.chalk, al: pr(T, t_2, .4) * .5, straight: true, seed: 3202 });
    // izquierda: subir (mejorar la propia posición)
    const a = pr(T, t_1, 2.0, easeIO); if (T > t_1 - .2) { steps(c, 70, 1460, 4, 100, 110, C.vio, 3210, pr(T, t_1 - .2, .5));
      person(c, lerp(110, 400, a), 1460 - Math.floor(a * 3.2) * 110, .62, { seed: 5, shirt: YOU, ...idle(T), walk: a < 1 ? L * 8 : undefined, mouth: 'grin', look: 1 });
      pill(c, '↑ MEJORAR', 270, 760, { size: 40, f: 'ui', sc: pb(T, t_1 + .1) }); }
    // derecha: bajar al que va adelante
    if (T > t_o - .2) { const d = pr(T, t_o + .3, 1.2); shp(c, R4(800, 1460 - 380, 160, 380), C.vio, { sharp: true, w: 4, lc: C.ink, seed: 3220 });
      person(c, 880, 1080 + d * 30, .62, { seed: 13, shirt: C.lav, ...idle(T, 2), mouth: 'o', brow: 1, lean: d * .25 });
      ln(c, [[880, 1080 - 30], [640, 1400]], { w: 4, col: C.goldL, seed: 3221, p: pr(T, t_o, .4) });
      person(c, 640, 1460, .62, { seed: 7, shirt: '#3B4466', ...idle(T, 1), mouth: 'flat', brow: -1, armR: [2.6, .4], armL: [2.4, .5], lean: -.2 - .05 * Math.sin(T * 6) });
      pill(c, '↓ BAJAR AL OTRO', 810, 760, { size: 40, f: 'ui', sc: pb(T, t_o + .1), col: '#FFB4A6' }); }
  }, true); }

// 5 · Qué inclina la balanza: ¿merecido?
if (has('merecer')) { const s = 'merecer', t_b = As(s, 'inclina la balanza'), t_m = As(s, 'merecido, o no.'), t_a = TK ? null : As(s, 'cuando apenas arrancas,');
  hit(t_b + .1, 8, 'ping'); hit(t_m + .1, 14, 'stamp'); if (t_a) hit(t_a + .1, 8, 'stamp');
  scene(s, 'whip', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 960, 1.0 + .012 * Math.sin(L));
    if (TK) tag(c, 'MISMOS INVESTIGADORES · 2012', 540, 200, { size: 28, bg: C.gold, sc: pb(T, sec(s).t0) });
    tx(c, '¿ES MERECIDO?', 540, 330, { size: 96, col: C.ink, sc: pb(T, t_b - .1) });
    const tilt = Math.sin(T * 1.6) * .18 * (1 - pr(T, t_m, .6)) + pr(T, t_m, .6) * .12;
    c.save(); c.translate(540, 760); shp(c, R4(-12, 0, 24, 520), C.goldD, { sharp: true, w: 4, lc: C.ink, seed: 3230 }); shp(c, R4(-120, 500, 240, 40), C.goldD, { sharp: true, w: 4, lc: C.ink, seed: 3231 });
    c.rotate(tilt); shp(c, R4(-380, -10, 760, 22), C.gold, { sharp: true, w: 4, lc: C.ink, seed: 3232 });
    for (const [x, lab, col, sd] of [[-340, 'SÍ', C.green, 3233], [340, 'NO', C.red, 3236]]) { c.save(); c.translate(x, 0); c.rotate(-tilt); ln(c, [[0, 10], [-70, 170]], { w: 3, seed: sd }); ln(c, [[0, 10], [70, 170]], { w: 3, seed: sd + 1 });
      shp(c, [[-110, 170], [110, 170], [80, 220], [-80, 220]], col, { w: 4, lc: C.ink, seed: sd + 2 }); tx(c, lab, 0, 200, { size: 40, f: 'ui', col: C.paper, sh: null }); c.restore(); }
    c.restore();
    pill(c, 'SÍ → TE IMPULSA', 270, 1150, { size: 34, f: 'ui', sc: pb(T, t_m) }); pill(c, 'NO → TE CRITICA', 810, 1150, { size: 34, f: 'ui', sc: pb(T, t_m + .25), col: '#FFB4A6' });
    FAM.slice(0, 4).forEach(([x, sd, sh], i) => person(c, [110, 290, 790, 970][i], 1580, .78, { seed: sd, shirt: sh, ...idle(T, i), look: i < 2 ? 1 : -1, mouth: T > t_m ? (i < 2 ? 'smile' : 'flat') : 'o', brow: T > t_m && i >= 2 ? -1 : 0 }));
    person(c, 540, 1580, .86, { seed: 5, shirt: YOU, ...idle(T), mouth: 'smile' });
    if (t_a) stamp(c, 'AÚN NO HAY NADA QUE MOSTRAR', 540, 1270, T, t_a, { size: 34, col: C.red, rot: -.02 });
  }); }

// 6 · TikTok · Al principio pesa: vitrina vacía y una decisión
if (has('empezar')) { const s = 'empezar', t_p = As(s, 'pesa tanto.'), t_n = As(s, 'no hay nada'), t_d = As(s, 'una decisión');
  hit(t_p + .1, 8, 'ping'); hit(t_n + .1, 10, 'stamp'); hit(t_d + .1, 14, 'stamp');
  scene(s, 'wipe', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 960, 1.0 + .012 * Math.sin(L));
    tx(c, 'AL PRINCIPIO…', 540, 220, { size: 92, col: C.ink, sc: pb(T, sec(s).t0 - .2) });
    // marco vacío: «todavía no hay nada que mostrar»
    c.save(); c.setLineDash([18, 12]); c.strokeStyle = C.ink; c.lineWidth = 5; c.globalAlpha = .55; c.strokeRect(260, 380, 560, 340); c.restore();
    tx(c, '¿RESULTADOS?', 540, 550, { size: 54, col: '#8A8D9C', sh: null, al: pr(T, t_n - .2, .4) }); tx(c, 'TODAVÍA NO', 540, 640, { size: 46, f: 'ui', col: C.red, al: pr(T, t_n + .3, .4) });
    stamp(c, 'SOLO UNA DECISIÓN', 540, 860, T, t_d, { size: 64, col: C.goldD, rot: -.03 });
    // TÚ en la línea de salida; los demás atrás, cruzados de brazos
    ln(c, [[60, 1420], [1020, 1420]], { w: 5, straight: true, seed: 3240 }); ln(c, [[440, 1300], [440, 1430]], { w: 6, col: C.gold, straight: true, seed: 3241 });
    person(c, 520 + pr(T, t_d, 1.4) * 260, 1420, .75, { seed: 5, shirt: YOU, ...idle(T), walk: T > t_d ? L * 7 : undefined, mouth: 'smile', look: 1 });
    FAM.slice(0, 3).forEach(([x, sd, sh], i) => person(c, 100 + i * 110, 1420, .55, { seed: sd, shirt: sh, ...idle(T, i), look: 1, mouth: 'flat', armL: [2.2, 1.6], armR: [2.2, 1.6] }));
  }); }

// 7 · TikTok · Ojo: no todo consejo es envidia
if (has('cuidado')) { const s = 'cuidado', t_o = As(s, 'Ojo:'), t_e = As(s, 'ha visto estafas,'), t_r = As(s, 'Escucha, revisa, compara.'), t_b = As(s, 'una burla');
  hit(t_o + .1, 10, 'stamp'); hit(t_e + .1, 8, 'ping'); hit(t_r + .1, 12, 'stamp'); hit(t_b + .1, 10, 'stamp');
  scene(s, 'drop', (c, T, L) => {
    bg(c, T); camS(c, T, 540, 960, 1.0 + .012 * Math.sin(L));
    tx(c, 'OJO', 540, 200, { size: 110, col: C.red, sh: C.ink, sc: pb(T, t_o) });
    tx(c, 'NO TODO CONSEJO ES ENVIDIA', 540, 310, { size: 56, col: C.ink, clipP: pr(T, t_o + .2, .6, easeIO), max: 1000 });
    // izquierda: quien te cuida (lupa sobre un papel)
    card(c, 270, 620, 380, 300, { sc: pb(T, t_e - .2) }); if (T > t_e - .2) { tx(c, 'TE CUIDA', 270, 520, { size: 40, f: 'ui', col: C.green }); squiggleText(c, 130, 570, 280, 3, { color: C.ink, seed: 3250, lineH: 40, amp: 3, width: 2 });
      const lx = 270 + Math.sin(T * 2) * 60; ring(c, lx, 640, 50, 50, 1, { col: C.ink, w: 6, seed: 3251 }); ln(c, [[lx + 36, 676], [lx + 80, 720]], { w: 10, seed: 3252 }); }
    // derecha: la burla
    card(c, 810, 620, 380, 300, { sc: pb(T, t_b - .3) }); if (T > t_b - .3) { tx(c, 'SE BURLA', 810, 520, { size: 40, f: 'ui', col: C.red }); tx(c, 'JA JA JA', 810, 640 + Math.sin(T * 12) * 6, { size: 60, f: 'hand', col: C.red, sh: null }); }
    stamp(c, 'ESCUCHA · REVISA · COMPARA', 540, 900, T, t_r, { size: 52, col: C.goldD, rot: -.02 });
    person(c, 260, 1460, .72, { seed: 3, shirt: C.navy, ...idle(T, 1), look: 1, mouth: 'smile', armR: [1.6, .8] });
    person(c, 540, 1460, .78, { seed: 5, shirt: YOU, ...idle(T), mouth: T > t_r ? 'smile' : 'flat', look: Math.sin(T) > 0 ? 1 : -1 });
    person(c, 820, 1460, .72, { seed: 7, shirt: '#3B4466', ...idle(T, 2), look: -1, mouth: T > t_b ? 'grin' : 'flat', bob: T > t_b ? Math.abs(Math.sin(T * 10)) * -8 : 0 });
  }); }

// 8 · Cierre (noche): la constancia no hace ruido; con los años se nota
if (has('cierre')) { const s = 'cierre', t_r = As(s, 'no hace ruido'), t_a = As(s, 'Con los años,'), t_n = As(s, 'se nota.'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_r + .1, 8, 'ping'); hit(t_n + .1, 14, 'stamp'); sfx(t_end + .2, 'ping');
  scene(s, 'iris', (c, T, L) => {
    bg(c, T, { night: true }); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .9));
    for (let k = 0; k < 18; k++) { const x = (k * 197) % 1040 + 20, y = (k * 131) % 560 + 80, a = .3 + .6 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = a; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    tx(c, 'LA CONSTANCIA', 540, 260, { size: 84, col: C.chalk, sh: C.goldD, sc: pb(T, sec(s).t0) });
    tx(c, 'NO HACE RUIDO AL PRINCIPIO', 540, 360, { size: 50, col: C.lav, sh: null, clipP: pr(T, t_r - .2, .6, easeIO), max: 1000 });
    // camino que sube; TÚ avanza, los demás quedan abajo
    const p = pr(T, sec(s).t0, (t_end - sec(s).t0) + .8, easeIO); ln(c, [[60, 1500], [480, 1300], [760, 1050], [1020, 760]], { w: 6, col: C.goldL, seed: 3260 });
    const px = lerp(260, 820, p), py = px < 480 ? lerp(1405, 1300, (px - 260) / 220) : px < 760 ? lerp(1300, 1050, (px - 480) / 280) : lerp(1050, 950, (px - 760) / 60);
    glow(c, px, py - 150, 220, .45 * pr(T, t_n, .6));
    person(c, px, py, .6, { seed: 5, shirt: YOU, ...idle(T), walk: L * 6, mouth: 'smile', look: 1 });
    FAM.slice(0, 3).forEach(([x, sd, sh], i) => person(c, 80 + i * 90, 1560, .45, { seed: sd, shirt: sh, ...idle(T, i), look: 1, mouth: T > t_n ? 'o' : 'flat' }));
    tx(c, 'CON LOS AÑOS, SE NOTA.', 540, 600, { size: 70, col: C.gold, sh: null, sc: pb(T, t_a) });
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1660, { size: 28, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1720, { size: 46, col: C.gold, sh: null, al: ke }); }
  }, true); }

// ================= portada: la mesa con las tres burlas completas =================
function cover(c) { const t = As('gancho', 'mejor gástatelos.'); drawScene(c, SC[0], Math.min(t + 1.2, SC[0].t1 - .05)); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .7 }); }
startFilm('dos-envidias', cover);
