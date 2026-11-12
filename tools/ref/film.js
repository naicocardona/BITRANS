// TITÁN · Reflexión «Si hoy estás en el piso, es tu punto de partida» · Short (sh) y TikTok (tk) · kit híbrido (tools/hd_lib.js)
// Un solo mundo: noche (navy) → amanecer (dorado). Una persona genérica sube una escalera, cae, se queda en el piso, levanta la cabeza, se levanta y sigue.
// La luz, la posición en la escalera y la pose salen de anclas en la voz (funciona igual con las secciones del Short o del TikTok).
'use strict';
const TK = MODE === 'tk';
const has = id => !!SEC[id];
const sec = id => SEC[id];
const AS = (id, ph) => has(id) ? As(id, ph) : null;

// ---------- línea de tiempo del mundo ----------
const ST = { x0: 110, y0: 1460, dx: 92, dy: 58, n: 8 };                  // escalera: 8 escalones de izquierda a derecha
const stepPos = s => [ST.x0 + s * ST.dx + ST.dx / 2, ST.y0 - s * ST.dy];
const K = [];                                                            // [t, escalón, pose, luz]; pose: up (de pie) · fall (cayendo) · floor (en el piso) · sit (sentada, cabeza abajo) · lift (levanta la cabeza)
const push = (t, s, pose, light) => { if (t !== null && t !== undefined) K.push([t, s, pose, light]); };
push(0, 0, 'up', 0);
push(AS('resultado', 'Casi nadie'), 0, 'up', .02);
push(AS('levantarte', 'Querer algo'), 1, 'up', .04);
push(AS('levantarte', 'Lo difícil'), 3, 'up', .05);
const tFall1 = AS('levantarte', 'de equivocarte.'); push(tFall1, 3, 'fall', .05); push(tFall1 !== null ? tFall1 + .5 : null, 0, 'floor', .05);
push(AS('nosotros', 'Nosotros'), 0, 'sit', .05);
push(AS('consecuencias', 'Al final'), 0, 'sit', .06);
const tLift = AS('consecuencias', 'levantamos la cabeza.'); push(tLift, 0, 'lift', .2);
push(AS('aprendimos', 'el error no te saca'), 0, 'lift', .28);
const tStand = AS('aprendimos', 'quedarte en el piso.'); push(tStand, 0, 'up', .34);
push(AS('disciplina', 'La disciplina'), 1, 'up', .4); push(AS('disciplina', 'cuando nadie te aplaude,'), 2, 'up', .45); push(AS('disciplina', 'cuando el mercado cae,'), 3, 'up', .5); push(AS('disciplina', 'cuando parece'), 3.4, 'up', .52);
push(AS('palabra', 'Cada vez'), 4, 'up', .58); push(AS('palabra', 'te conviertes'), 5, 'up', .64);
const tFall2 = AS('caerse', 'No se trata de no caerse.'); push(tFall2, TK ? 5 : 2, 'up', TK ? .7 : .45); push(tFall2 !== null ? tFall2 + .9 : null, TK ? 5 : 2, 'fall', TK ? .7 : .45);
push(tFall2 !== null ? tFall2 + 1.4 : null, TK ? 4 : 1, 'floor', TK ? .7 : .45);
const tUp2 = AS('caerse', 'cuántas veces'); push(tUp2, TK ? 4 : 1, 'up', TK ? .78 : .6); push(AS('caerse', 'dispuesto a levantarte.'), TK ? 6 : 4, 'up', TK ? .84 : .72);
push(AS('partida', 'Si hoy estás'), TK ? 6 : 4, 'up', .88); push(AS('partida', 'Es tu punto'), 8, 'up', 1);
K.sort((a, b) => a[0] - b[0]);
function world(T) { let i = 0; while (i + 1 < K.length && K[i + 1][0] <= T) i++; const a = K[i], b = K[i + 1] || a;
  const u = b === a ? 1 : cl01((T - a[0]) / Math.min(1.4, Math.max(.3, b[0] - a[0]))); const e = easeIO(u);
  return { step: lerp(a[1], b[1], a[2] === 'fall' || b[2] === 'fall' ? e : e), pose: u > .55 ? b[2] : a[2], light: lerp(a[3], b[3], e), u, a, b }; }

// ---------- cielo, sol y escalera ----------
const mixc = (c1, c2, t) => mix(c1, c2, cl01(t));
function sky(c, T, Lt) {
  const top = Lt < .5 ? mixc('#0D1020', '#3A2E66', Lt * 2) : mixc('#3A2E66', '#E9B872', (Lt - .5) * 2), bot = Lt < .5 ? mixc('#171B33', '#6B4FA0', Lt * 2) : mixc('#6B4FA0', '#F6E3B8', (Lt - .5) * 2);
  const g = c.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, top); g.addColorStop(.75, bot); g.addColorStop(1, bot); c.fillStyle = g; c.fillRect(-200, -200, 1480, 2320);
  for (let k = 0; k < 40; k++) { const x = (k * 197) % 1060 + 10, y = (k * 131) % 900 + 60, a = (1 - Lt * 1.4) * (.35 + .55 * Math.abs(Math.sin(T * 1.5 + k))); if (a <= 0) continue; c.save(); c.globalAlpha = a; c.fillStyle = C.goldL; c.beginPath(); c.arc(x, y, 2.6, 0, TAU); c.fill(); c.restore(); }
  // sol: asoma con «levantamos la cabeza» y sube hasta el final
  const sy = lerp(1560, 560, cl01((Lt - .12) / .88)), sr = 120 + 60 * Lt; if (Lt > .1) { c.save(); const rg = c.createRadialGradient(860, sy, 10, 860, sy, sr * 3.2); rg.addColorStop(0, 'rgba(255,214,140,' + (.55 * Lt + .1) + ')'); rg.addColorStop(1, 'rgba(255,214,140,0)'); c.fillStyle = rg; c.fillRect(-200, -200, 1480, 2320);
    shp(c, blob(860, sy, sr, sr, 1501, { n: 40, amp: .02 }), mixc('#E8A65A', C.gold, Lt), { w: 4, lc: C.goldD, seed: 1501 }); c.restore(); }
  // colinas al fondo
  c.save(); c.globalAlpha = .9; shp(c, [[-60, 1250], [200, 1150], [430, 1210], [700, 1120], [1140, 1230], [1140, 1700], [-60, 1700]], mixc('#1E2338', '#B9A2E8', Lt * .8), { line: false }); c.restore(); }
function stairs(c, T, Lt, checks) {
  const fill = mixc(C.navy2, C.navy, Lt), edge = mixc(C.goldD, C.gold, Lt);
  shp(c, R4(-60, ST.y0, 1200, 300), mixc('#0D1020', '#2A3150', Lt), { sharp: true, w: 5, lc: C.ink, seed: 1510 });
  for (let s = 0; s < ST.n; s++) { const x = ST.x0 + s * ST.dx, y = ST.y0 - (s + 1) * ST.dy;
    shp(c, R4(x, y, ST.dx * (ST.n - s) + 120, ST.dy), fill, { sharp: true, w: 4, lc: C.ink, seed: 1511 + s });
    ln(c, [[x, y], [x + ST.dx, y]], { w: 6, col: edge, straight: true, seed: 1520 + s });
    if (checks && s < checks.n) { const p = cl01((T - checks.t0 - s * checks.dt) / .3); if (p > 0) ln(c, [[x + 30, y - 22], [x + 46, y - 8], [x + 74, y - 40]], { w: 8, col: C.green, p, seed: 1530 + s }); } }
  // meta en lo alto: bandera dorada
  const [fx, fy] = stepPos(ST.n - 1); ln(c, [[fx + 40, fy - ST.dy], [fx + 40, fy - ST.dy - 170]], { w: 6, col: C.ink, seed: 1540 });
  shp(c, [[fx + 40, fy - ST.dy - 170], [fx + 150, fy - ST.dy - 140 + Math.sin(T * 4) * 8], [fx + 40, fy - ST.dy - 110]], C.gold, { w: 4, lc: C.ink, seed: 1541 }); }
function hero(c, T, W) { const s = Math.min(ST.n - .2, Math.max(0, W.step)), si = Math.floor(s), fr = s - si, [x0, y0] = stepPos(si), [x1, y1] = stepPos(Math.min(ST.n - 1, si + 1));
  const x = lerp(x0, x1, fr), y = Math.min(y0, lerp(y0, y1, cl01(fr * 2))) - ST.dy + 2, walking = Math.abs(W.b[1] - W.a[1]) > .2 && W.u < 1 && W.pose === 'up';
  const base = { seed: 21, shirt: C.lav, pants: '#2A3150', ...idle(T), look: 1 };
  if (W.pose === 'fall') person(c, x - 30, y + 20, .95, { ...base, lean: .9, mouth: 'o', brow: 1, armR: [2.6, .3], armL: [2.4, .4] });
  else if (W.pose === 'floor') person(c, x - 60, y + 60, .95, { ...base, lean: 1.45, mouth: 'o', brow: 1, armR: [2.2, .3], armL: [2.0, .3] });
  else if (W.pose === 'sit' || W.pose === 'lift') { const up = W.pose === 'lift', gy = y; c.save(); c.beginPath(); c.rect(x - 200, gy - 600, 400, 600 - 8); c.clip();
    person(c, x, gy + 140, .95, { ...base, nod: up ? -4 : 24, look: up ? 1 : 0, mouth: up ? 'smile' : 'flat', brow: up ? 0 : 1, armR: up ? [.45, .5] : [.12, .2], armL: up ? [.45, .5] : [.12, .2] }); c.restore();
    for (const [dy, sd] of [[-34, 1571], [-14, 1572]]) shp(c, R4(x - 20, gy + dy, 150, 26), '#2A3150', { sharp: true, w: 4, lc: C.ink, seed: sd });
    shp(c, R4(x + 120, gy - 40, 34, 40), C.ink, { sharp: true, w: 3, lc: C.ink, seed: 1573 }); }
  else person(c, x, y, .95, { ...base, walk: walking ? T * 9 : undefined, mouth: 'smile', armR: s > ST.n - 1.3 ? [2.7, .2] : undefined, armL: s > ST.n - 1.3 ? [2.6, .2] : undefined, jump: s > ST.n - 1.3 ? Math.abs(Math.sin(T * 5)) * 10 : 0 }); }
// textos grandes arriba: blanco de noche, navy al amanecer
function line(c, s, y, T, t0, Lt, o = {}) { if (t0 === null || T < t0 - .2) return; let col = o.col || (Lt > .6 ? C.ink : C.chalk); if (col === C.gold && Lt > .6) col = '#7A4E12'; const sh = Lt > .6 ? C.goldL : C.goldD;
  tx(c, s, 540, y, { size: o.size || 68, col, sh, clipP: pr(T, t0 - .2, .5, easeIO), max: 1000 }); }
function frameWorld(c, T, L, draw) { const W = world(T); resetT(c); sky(c, T, W.light); INKC = C.ink;
  camS(c, T, 540, 960 - W.step * 10, 1.0 + .012 * Math.sin(L * .9)); stairs(c, T, W.light, draw.checks); hero(c, T, W); if (draw.fx) draw.fx(c, T, W.light); }

// ================= escenas =================
const scn = (id, tr, fx, checks) => { if (has(id)) scene(id, tr, (c, T, L) => frameWorld(c, T, L, { fx, checks }), true); };
// 1 · Resultado vs. proceso: titular desde el primer cuadro; la meta brilla arriba, la escalera es el proceso
{ const t_c = AS('resultado', 'Casi nadie'); hit(.05, 6, 'ping'); if (t_c !== null) hit(t_c + .2, 10, 'stamp');
  scn('resultado', null, (c, T, Lt) => { tx(c, 'TODOS QUIEREN', 540, 230, { size: 80, col: C.chalk, sh: C.goldD, sc: 1 + settle(T, .05, { amp: .1, freq: 3, decay: 5 }) });
    tx(c, 'EL RESULTADO', 540, 340, { size: 96, col: C.gold, sh: null });
    const [fx, fy] = stepPos(ST.n - 1); ring(c, fx + 95, fy - ST.dy - 140, 120, 90, pr(T, .3, .8), { col: C.gold });
    if (T > t_c) { tx(c, 'CASI NADIE QUIERE EL PROCESO', 540, 470, { size: 50, col: C.chalk, sh: C.goldD, clipP: pr(T, t_c, .6, easeIO), max: 980 }); arrow(c, [260, 1290], [620, 1060], pr(T, t_c + .4, .6), { bend: -60, w: 8, col: C.gold }); tag(c, 'EL PROCESO', 330, 1180, { size: 30, bg: C.paper, sc: pb(T, t_c + .5) }); } }); }
// 2 · Levantarte al día siguiente de equivocarte: sube y cae
{ const t_q = AS('levantarte', 'Querer algo'), t_d = AS('levantarte', 'Lo difícil');
  if (t_q !== null) { hit(t_q + .1, 6, 'ping'); hit(tFall1 + .3, 18, 'stamp'); }
  scn('levantarte', 'wipe', (c, T, Lt) => { line(c, 'QUERER ES FÁCIL', 250, T, t_q, Lt); line(c, 'LO DIFÍCIL ES LEVANTARTE', 370, T, t_d, Lt, { size: 60, col: C.gold });
    stamp(c, '¡ERROR!', 700, 820, T, tFall1 + .2, { size: 70, col: C.red, bg: C.navy, rot: .06 }); lines(c, 360, 1200, T, tFall1 + .4, { col: C.goldL, r: 90 }); }); }
// 3 · TikTok · Nosotros nos equivocamos: plata, tiempo y confianza que se van
{ const t_n = AS('nosotros', 'Nosotros'), t_p = AS('nosotros', 'Perdimos plata,'), t_t = AS('nosotros', 'tiempo…'), t_cf = AS('nosotros', 'la confianza');
  if (t_n !== null) { hit(t_n + .1, 6, 'ping'); hit(t_p + .1, 8, 'stamp'); hit(t_t + .1, 8, 'stamp'); hit(t_cf + .1, 12, 'stamp'); }
  scn('nosotros', 'blot', (c, T, Lt) => { line(c, 'NOSOTROS NOS EQUIVOCAMOS', 250, T, t_n, Lt, { size: 60 }); line(c, 'MUCHAS VECES', 360, T, t_n + .6, Lt, { size: 72, col: C.gold });
    [['PLATA', t_p, 300], ['TIEMPO', t_t, 560], ['CONFIANZA', t_cf, 820]].forEach(([l, t, x], k) => { if (t === null || T < t) return; const u = cl01((T - t) / 2.2);
      c.save(); c.globalAlpha = 1 - u * .6; c.translate(x, 640 + u * 260); c.rotate(u * (k - 1) * .5); pill(c, l, 0, 0, { size: 44, f: 'ui', sc: pb(T, t), bg: C.red, col: C.paper, lc: C.ink }); c.restore(); }); }); }
// 4 · Asumir las consecuencias… y aun así, levantar la cabeza (aquí empieza a salir el sol)
{ const t_a = AS('consecuencias', 'Al final'), t_c = AS('consecuencias', 'las consecuencias'), t_y = AS('consecuencias', 'Y aun así,');
  if (t_a !== null) { hit(t_c + .1, 10, 'stamp'); hit(tLift + .1, 14, 'stamp'); sfx(tLift + .2, 'ping'); }
  scn('consecuencias', TK ? 'iris' : 'blot', (c, T, Lt) => { line(c, 'ASUMIMOS LAS CONSECUENCIAS', 250, T, t_a, Lt, { size: 58 });
    // la mochila de piedras de las malas decisiones
    if (t_c !== null && T > t_c) { const k = pb(T, t_c); c.save(); c.translate(360, ST.y0 - 3 * ST.dy - 30); c.scale(k, k); for (let i = 0; i < 4; i++) shp(c, blob(-40 + (i % 2) * 60, -i * 40, 44, 34, 1550 + i, { n: 18 }), '#6E6A80', { w: 4, lc: C.ink, seed: 1550 + i }); c.restore();
      tag(c, 'MALAS DECISIONES', 360, ST.y0 - 3 * ST.dy - 200, { size: 26, bg: C.paper, sc: pb(T, t_c + .3) }); }
    line(c, 'Y AUN ASÍ…', 380, T, t_y, Lt, { size: 66, col: C.gold });
    if (T > tLift) { line(c, 'LEVANTAMOS LA CABEZA', 490, T, tLift, Lt, { size: 66 }); burst(c, 860, 1100, T, tLift + .2, { R: 260, col: C.goldL }); } }); }
// 5 · El error no te saca del camino; lo que te saca es quedarte en el piso → se pone de pie
{ const t_ap = AS('aprendimos', 'aprendimos algo:'), t_e = AS('aprendimos', 'el error no te saca'), t_q = AS('aprendimos', 'Lo que te saca');
  if (t_ap !== null) { hit(t_e + .1, 8, 'stamp'); hit(t_q + .1, 8, 'ping'); hit(tStand + .3, 14, 'stamp'); }
  scn('aprendimos', TK ? 'drop' : 'iris', (c, T, Lt) => { line(c, 'EL ERROR NO TE SACA', 250, T, t_e, Lt, { size: 66 }); line(c, 'DEL CAMINO', 350, T, t_e + .6, Lt, { size: 72, col: C.gold });
    if (t_q !== null && T > t_q) { tx(c, 'LO QUE TE SACA ES', 540, 470, { size: 46, col: Lt > .6 ? C.ink : C.chalk, sh: null, al: pr(T, t_q, .3) }); stamp(c, 'QUEDARTE EN EL PISO', 540, 570, T, tStand, { size: 54, col: C.red, bg: C.navy }); } }); }
// 6 · TikTok · La disciplina no se siente bien: sube escalón por escalón aunque nadie aplauda, el mercado caiga o no parezca avanzar
{ const t_d = AS('disciplina', 'La disciplina'), t_lc = AS('disciplina', 'hacer lo correcto'), t_na = AS('disciplina', 'cuando nadie te aplaude,'), t_mc = AS('disciplina', 'cuando el mercado cae,'), t_av = AS('disciplina', 'cuando parece');
  if (t_d !== null) { hit(t_d + .1, 8, 'stamp'); hit(t_na + .1, 6, 'ping'); hit(t_mc + .1, 10, 'stamp'); hit(t_av + .1, 6, 'ping'); }
  scn('disciplina', 'whip', (c, T, Lt) => { line(c, 'LA DISCIPLINA', 240, T, t_d, Lt, { size: 84, col: C.gold }); line(c, 'NO SE SIENTE BIEN', 350, T, t_d + .5, Lt, { size: 62 });
    tag(c, 'HACER LO CORRECTO', 540, 460, { size: 34, bg: C.paper, sc: pb(T, t_lc) });
    if (t_na !== null && T > t_na) tag(c, 'NADIE TE APLAUDE', 250, 600, { size: 30, bg: C.paper, sc: pb(T, t_na), rot: -.05 });
    if (t_mc !== null && T > t_mc) { card(c, 560, 700, 260, 180, { sc: pb(T, t_mc), band: C.navy, seed: 1560, draw: cc => { const P = []; for (let i = 0; i <= 10; i++) P.push([-100 + i * 20, -20 + i * 7 + Math.sin(i * 2) * 10]); ln(cc, P, { w: 6, col: C.red, seed: 1561 }); tx(cc, 'MERCADO', 0, -55, { size: 22, f: 'ui', col: C.gold }); } }); }
    if (t_av !== null && T > t_av) tag(c, 'PARECE QUE NO AVANZAS', 820, 880, { size: 28, bg: C.paper, sc: pb(T, t_av), rot: .04 }); }); }
// 7 · TikTok · Cumplir tu palabra: cada escalón queda marcado con un ✓
{ const t_c = AS('palabra', 'Cada vez'), t_p = AS('palabra', 'cumples tu palabra'), t_s = AS('palabra', 'sostener lo que sueña.');
  if (t_c !== null) { hit(t_p + .1, 8, 'ping'); hit(t_s + .1, 12, 'stamp'); }
  scn('palabra', 'wipe', (c, T, Lt) => { line(c, 'CUMPLE TU PALABRA', 250, T, t_c, Lt, { size: 76, col: C.gold }); line(c, 'CONTIGO', 360, T, t_p + .4, Lt, { size: 70 });
    if (t_s !== null) line(c, 'Y SOSTENDRÁS LO QUE SUEÑAS', 470, T, t_s - .6, Lt, { size: 52 }); }, t_p !== null ? { n: 6, t0: t_p, dt: .45 } : null); }
// 8 · No se trata de no caerse: cae otra vez y se levanta; contador de veces
{ const t_n = AS('caerse', 'No se trata'), t_cv = AS('caerse', 'cuántas veces'), t_l = AS('caerse', 'dispuesto a levantarte.');
  if (t_n !== null) { hit(tFall2 + 1.1, 16, 'stamp'); hit(t_cv + .1, 8, 'ping'); hit(t_l + .2, 12, 'stamp'); }
  scn('caerse', TK ? 'iris' : 'wipe', (c, T, Lt) => { line(c, 'NO SE TRATA DE NO CAERSE', 250, T, t_n, Lt, { size: 60 });
    line(c, 'SE TRATA DE CUÁNTAS VECES', 360, T, t_cv, Lt, { size: 56, col: C.gold }); line(c, 'TE LEVANTAS', 460, T, t_l, Lt, { size: 76 });
    if (t_cv !== null && T > t_cv) { const n = 1 + Math.floor((T - t_cv) * 4); pill(c, n > 9 ? '∞' : '× ' + n, 860, 640, { size: 66, sc: pb(T, t_cv), top: 'VECES QUE TE LEVANTAS', topc: Lt > .6 ? C.ink : C.chalk }); } }); }
// 9 · Cierre al amanecer: «Si hoy estás en el piso, no es el final. Es tu punto de partida.»
{ const t_s = AS('partida', 'Si hoy estás'), t_nf = AS('partida', 'no es el final.'), t_pp = AS('partida', 'Es tu punto'), t_end = DD.words[DD.words.length - 1][2];
  if (t_s !== null) { hit(t_nf + .1, 10, 'stamp'); hit(t_pp + .2, 16, 'stamp'); sfx(t_end + .2, 'ping'); }
  scn('partida', TK ? 'blot' : 'drop', (c, T, Lt) => { line(c, 'SI HOY ESTÁS EN EL PISO', 250, T, t_s, Lt, { size: 62 }); line(c, 'NO ES EL FINAL', 360, T, t_nf, Lt, { size: 76, col: C.red });
    if (T > t_pp) { tx(c, 'ES TU PUNTO DE PARTIDA', 540, 490, { size: 66, col: C.navy, sh: C.gold, sc: pb(T, t_pp), max: 1000 }); burst(c, 540, 490, T, t_pp + .2, { R: 380, col: C.gold }); }
    const ke = pr(T, t_end + .15, .5); if (ke > 0) { tag(c, 'GUÁRDALO PARA EL DÍA QUE LO NECESITES', 540, 640, { size: 30, bg: C.paper, sc: ke }); tx(c, 'TITÁN HOLDING', 540, 1560, { size: 54, col: C.gold, sh: C.ink, al: ke }); } }); }

// ================= portada =================
function cover(c) { drawScene(c, SC[0], 1.4); resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', col: C.chalk, al: .7 }); }
startFilm('reflexion-punto-de-partida', cover);
