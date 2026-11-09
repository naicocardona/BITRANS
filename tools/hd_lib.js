// TITÁN · librería compartida del estilo híbrido (trazo dibujado + rasgos del estilo plano). Se carga después de core.js (skill hand-drawn-canvas-animation) y data.js.
// El film define sus escenas con scene(id, transición, dibujo, noche) y llama startFilm(nombre). Paleta ajustable con Object.assign(C, {...}) antes de dibujar.
// Transiciones: blot (mancha de tinta), iris (círculo dorado), whip (barrido rápido), wipe (cortina dorada), news (periódicos volando), drop (caída).
'use strict';
const TS = 1.25, TRD = .5;
const DD = DATA, DUR = DD.dur, MODE = DD.mode;
const C = { paper: '#F6F4EF', ink: '#161A36', navy: '#0D1020', navy2: '#171B33', gold: '#C8A45D', goldD: '#9C7B3A', goldL: '#E9D9AE', red: '#D9604F', green: '#3FAF7A',
  chalk: '#F6F4EF', blobA: '#E9D9AE', blobB: '#DCD6C6', blobN: '#2A3150', lav: '#B9A2E8', vio: '#6B4FA0',
  skin: ['#F1C7A5', '#C99674', '#8D5B3E', '#E8B48F'], hair: ['#2B1B12', '#5A3A22', '#1E1A2E', '#8A5A2B'], pants: ['#2A3150', '#3B4466', '#1E2338', '#4A3F6A'] };
const FF = { hand: '"Caveat"', big: '"Bricolage"', ui: '"Jakarta"' };
let BOIL = 0, INKC = C.ink, COVER = false;

// ---------- tiempo y anclas ----------
const nrm = w => w.toLowerCase().replace(/[^0-9a-záéíóúñü]/g, '');
const AMB = []; window.__AMB = AMB;
function A(ph, after = 0) {
  const ks = ph.split(/\s+/).map(nrm).filter(Boolean), Wd = DD.words, hits = [];
  for (let i = 0; i + ks.length <= Wd.length; i++) { let ok = true; for (let j = 0; j < ks.length; j++) if (nrm(Wd[i + j][0]) !== ks[j]) { ok = false; break; } if (ok) hits.push(Wd[i][1]); }
  if (!hits.length) throw new Error('ancla no encontrada: ' + ph);
  const h = hits.filter(t => t >= after - 1e-6); if (!h.length) throw new Error('ancla antes de su sección: ' + ph);
  if (h.length > 1 && after === 0) AMB.push(ph); return h[0];
}
const SEC = {}; DD.secs.forEach(s => SEC[s.id] = s);
const As = (sid, ph) => { if (!SEC[sid]) throw new Error('sección inexistente: ' + sid); const t = A(ph, SEC[sid].t0 - .3); if (t > SEC[sid].t1 + .5) throw new Error(`ancla fuera de su sección (${sid}): ${ph}`); return t; };
const cl01 = x => clamp(x, 0, 1);
const pr = (T, t0, d = .45, e = easeOutQuint) => T <= t0 ? 0 : T >= t0 + d ? 1 : e((T - t0) / d);
const pb = (T, t0, d = .45) => T <= t0 ? 0 : T >= t0 + d ? 1 : easeOutBack((T - t0) / d);
const HITS = [], EV = [];
function hit(t, amp = 10, kind = 'impact') { HITS.push([t, amp]); if (kind) EV.push([+t.toFixed(3), kind]); return t; }
function sfx(t, kind) { EV.push([+t.toFixed(3), kind]); return t; }
function shk(T) { let x = 0, y = 0; for (const [t, a] of HITS) { if (T < t || T > t + .9) continue; x += settle(T, t, { amp: a, freq: 10, decay: 7 }); y += settle(T, t, { amp: a * .8, freq: 13, decay: 7, phase: 1.3 }); } return [x, y]; }
function camS(c, T, x, y, z = 1, rot = 0) { if (COVER) { cam(c, 540, 960, 1); return; } const [sx, sy] = shk(T); cam(c, x - sx / z, y - sy / z, z, rot + sx * .0004); }

// ---------- trazos ----------
function dens(pts, step = 18) { const out = [pts[0]]; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / step)); for (let k = 1; k <= n; k++) out.push([lerp(a[0], b[0], k / n), lerp(a[1], b[1], k / n)]); } return out; }
function ln(c, pts, o = {}) { if (o.straight) pts = dens(pts); brush(c, pts, { smooth: !o.straight, w: o.w ?? 5, color: o.col ?? INKC, seed: (o.seed ?? 1) + (o.still ? 0 : BOIL), amp: o.amp ?? 1.3, p: o.p ?? 1, close: !!o.close, taper: o.taper ?? 1, al: o.al ?? 1 }); }
const R4 = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
function shp(c, pts, fill, o = {}) {
  const q = o.sharp ? pts : smoothPts(pts, true, 4, 9), P = polyPath(q, true);
  if (fill) { c.save(); c.globalAlpha = o.fa ?? 1; c.fillStyle = fill; c.fill(P); c.restore(); }
  if (o.wash) wash(c, P, o.wash, { al: o.wal ?? .4, seed: o.seed ?? 3 });
  if (o.hatch) { const xs = q.map(p => p[0]), ys = q.map(p => p[1]), bx = [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)];
    hatch(c, P, bx, { angle: o.ha ?? .8, gap: o.hg ?? 10, len: 16, color: o.hatch, alpha: o.hal ?? .35, width: o.hw ?? 1.6, seed: o.seed ?? 3 }); }
  if (o.line !== false) ln(c, pts.concat(o.sharp ? [pts[0]] : []), { w: o.w ?? 5, col: o.lc ?? INKC, seed: o.seed ?? 3, close: !o.sharp, amp: o.amp ?? 1.2, straight: !!o.sharp, taper: o.sharp ? .25 : 1 });
  return P;
}
function tx(c, s, x, y, o = {}) {
  c.save(); c.translate(x, y); if (o.rot) c.rotate(o.rot); if (o.sc !== undefined) c.scale(o.sc, o.sc);
  const f = o.f || 'big', wt = f === 'hand' ? 700 : 800; c.font = `${wt} ${o.size || 60}px ${FF[f]}`; c.textAlign = o.align || 'center'; c.textBaseline = 'middle';
  if (o.max) { const m = c.measureText(s).width; if (m > o.max) { const k = o.max / m; c.scale(k, k); } }
  if (o.clipP !== undefined) { const m = c.measureText(s).width, x0 = o.align === 'left' ? 0 : o.align === 'right' ? -m : -m / 2; c.beginPath(); c.rect(x0 - 20, -(o.size || 60), (m + 40) * cl01(o.clipP), (o.size || 60) * 2); c.clip(); }
  const al = o.al ?? 1;
  if (o.sh !== null && f !== 'ui') { c.fillStyle = o.sh || (o.col === C.gold ? INKC : C.gold); c.globalAlpha = al * .85; c.fillText(s, o.so ?? 4, o.so ?? 4); }
  c.globalAlpha = al; c.fillStyle = o.col || INKC; c.fillText(s, 0, 0); c.restore();
}
function tw(c, s, o = {}) { c.save(); c.font = `${o.f === 'hand' ? 700 : 800} ${o.size || 60}px ${FF[o.f || 'big']}`; const m = c.measureText(s).width; c.restore(); return m; }
const ul = (c, x1, x2, y, p, o = {}) => ln(c, [[x1, y + 3], [(x1 + x2) / 2, y + 7], [x2, y - 2]], { w: o.w ?? 9, col: o.col ?? C.gold, p, seed: o.seed ?? 4 });
function ring(c, x, y, rx, ry, p, o = {}) { const pts = blob(x, y, rx, ry, o.seed ?? 5, { amp: .05, n: 40 }); ln(c, pts.concat(pts.slice(0, 7)), { w: o.w ?? 7, col: o.col ?? C.gold, p, seed: o.seed ?? 5 }); }
function arrow(c, a, b, p, o = {}) { const m = [(a[0] + b[0]) / 2 + (o.bend ?? 40), (a[1] + b[1]) / 2 - (o.bend ?? 40)]; ln(c, [a, m, b], { w: o.w ?? 6, col: o.col, p, seed: o.seed ?? 8 });
  if (p > .95) { const ang = Math.atan2(b[1] - m[1], b[0] - m[0]), L = 26; ln(c, [[b[0] - L * Math.cos(ang - .5), b[1] - L * Math.sin(ang - .5)], b, [b[0] - L * Math.cos(ang + .5), b[1] - L * Math.sin(ang + .5)]], { w: o.w ?? 6, col: o.col, seed: 9 }); } }
function stamp(c, s, x, y, T, t0, o = {}) {
  if (T < t0) return; const u = T - t0, k = u < .16 ? lerp(2.3, 1, easeIn(u / .16)) : 1 + settle(T, t0 + .16, { amp: .07, freq: 4, decay: 7 });
  c.save(); c.translate(x, y); c.rotate(o.rot ?? -.06); c.scale(k, k); c.globalAlpha = Math.min(1, u / .08);
  const size = o.size || 84, w = tw(c, s, { size }) + 70, h = size * 1.35, col = o.col || C.gold;
  shp(c, R4(-w / 2, -h / 2, w, h), o.bg ?? C.paper, { sharp: true, w: 7, lc: col, seed: 21 });
  ln(c, R4(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24).concat([[-w / 2 + 12, -h / 2 + 12]]), { w: 3, col, seed: 22, straight: true, taper: .2 });
  tx(c, s, 0, 4, { size, col, sh: null }); c.restore();
}
// tarjeta navy con texto dorado (rasgo del estilo plano), borde dibujado a mano
function pill(c, s, x, y, o = {}) { const k = o.sc ?? 1; if (k <= 0) return; const size = o.size || 60, w = tw(c, s, { size, f: o.f }) + size * .9, h = size * 1.5;
  c.save(); c.translate(x, y); c.rotate(o.rot ?? 0); c.scale(k, k); c.save(); c.fillStyle = 'rgba(13,16,32,.18)'; c.beginPath(); c.roundRect(-w / 2 + 8, -h / 2 + 10, w, h, h / 2); c.fill(); c.restore();
  const P = new Path2D(); P.roundRect(-w / 2, -h / 2, w, h, h / 2); c.fillStyle = o.bg || C.navy; c.fill(P);
  const pts = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * TAU, r = h / 2, cx = Math.cos(a) >= 0 ? w / 2 - r : -w / 2 + r; pts.push([cx + Math.cos(a) * r, Math.sin(a) * r]); }
  ln(c, pts, { w: 4, col: o.lc || C.gold, seed: 41 }); if (o.top) tx(c, o.top, 0, -h / 2 - size * .38, { size: size * .42, f: 'ui', col: o.topc || INKC });
  tx(c, s, 0, 3, { size, f: o.f, col: o.col || C.gold, sh: null }); c.restore(); }
// tarjeta rectangular con título y renglones (textos cortos)
function card(c, x, y, w, h, o = {}) { const k = o.sc ?? 1; if (k <= 0) return; c.save(); c.translate(x, y); c.rotate(o.rot ?? 0); c.scale(k, k);
  c.save(); c.fillStyle = 'rgba(13,16,32,.16)'; c.fillRect(-w / 2 + 10, -h / 2 + 12, w, h); c.restore();
  shp(c, R4(-w / 2, -h / 2, w, h), o.bg || C.paper, { sharp: true, w: 5, lc: o.lc || C.ink, seed: o.seed ?? 51 });
  if (o.band) shp(c, R4(-w / 2, -h / 2, w, 70), o.band, { sharp: true, w: 5, lc: o.lc || C.ink, seed: (o.seed ?? 51) + 1 });
  if (o.draw) o.draw(c, w, h); c.restore(); }
function burst(c, x, y, T, t0, o = {}) { if (T < t0 || T > t0 + .7) return; const u = (T - t0) / .7; c.save(); c.globalAlpha = 1 - u; dotBurst(c, x, y, (o.R ?? 120) * easeOutQuint(u), o.n ?? 14, o.col ?? C.gold, o.seed ?? 3, 1); c.restore(); }
function lines(c, x, y, T, t0, o = {}) { if (T < t0 || T > t0 + .5) return; const u = (T - t0) / .5; c.save(); c.globalAlpha = 1 - u; c.strokeStyle = o.col ?? INKC; c.lineWidth = 5; c.lineCap = 'round';
  for (let k = 0; k < (o.n ?? 8); k++) { const a = k / (o.n ?? 8) * TAU + .3, r0 = (o.r ?? 70) + 40 * u, r1 = r0 + 40; c.beginPath(); c.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); c.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1); c.stroke(); } c.restore(); }
function tag(c, s, x, y, o = {}) { const size = o.size || 32, w = tw(c, s, { size, f: 'ui' }) + 44, h = size * 1.6; c.save(); c.translate(x, y); c.rotate(o.rot ?? -.02); if (o.sc !== undefined) c.scale(o.sc, o.sc);
  shp(c, R4(-w / 2, -h / 2, w, h), o.bg || C.gold, { sharp: true, w: 4, lc: C.ink, seed: o.seed ?? 95 }); tx(c, s, 0, 2, { size, f: 'ui', col: o.col || C.ink }); c.restore(); }
// fondo con profundidad: papel o noche + rejilla de puntos + manchas suaves en paralaje
function bg(c, T, o = {}) {
  if (o.night) night(c, C.navy, 7); else paper(c, C.paper, null);
  resetT(c); c.save(); c.fillStyle = o.night ? C.chalk : C.ink; c.globalAlpha = o.night ? .06 : .05; const off = (T * 6) % 78;
  for (let k = 0; k < 14 * 26; k++) { const x = 30 + (k % 14) * 78, y = 30 + Math.floor(k / 14) * 78 - off; c.beginPath(); c.arc(x, y, 2.6, 0, TAU); c.fill(); } c.restore();
  for (const [x, y, r, col, sp, sd] of [[180, 520, 260, o.night ? C.blobN : C.blobA, 9, 1], [930, 1250, 300, o.night ? C.blobN : C.blobB, -7, 2]]) { c.save(); c.globalAlpha = o.night ? .35 : .45;
    shp(c, blob(x + Math.sin(T * .3 + sd) * sp * 3, y + Math.cos(T * .25 + sd) * sp * 2, r, r * .8, sd, { amp: .1 }), col, { line: false }); c.restore(); }
}
// periódico genérico (sin textos reales): cabecera y renglones garabateados
function newspaper(c, x, y, w, h, rot, o = {}) { c.save(); c.translate(x, y); c.rotate(rot);
  shp(c, R4(-w / 2, -h / 2, w, h), C.paper, { sharp: true, w: 4, lc: C.ink, seed: o.seed ?? 61 });
  tx(c, o.title || 'NOTICIAS', 0, -h / 2 + h * .12, { size: h * .1, f: 'big', col: C.ink, sh: null, max: w * .85 });
  ln(c, [[-w / 2 + 16, -h / 2 + h * .22], [w / 2 - 16, -h / 2 + h * .22]], { w: 3, straight: true, col: C.ink, seed: 62 });
  squiggleText(c, -w / 2 + 18, -h / 2 + h * .3, w - 36, Math.max(3, Math.floor(h / 40)), { color: C.ink, seed: o.seed ?? 63, lineH: h * .085, amp: 3, width: 2 });
  c.restore(); }

// ---------- personas genéricas (trazo + relleno plano) ----------
const vD = (t, side) => [side * Math.sin(t), Math.cos(t)];
function person(c, x, y, s, o = {}) {
  const sd = o.seed ?? 1, sk = o.skin || C.skin[sd % 4], hr = o.old ? '#C9CCD4' : (o.hair || C.hair[sd % 4]), sh = o.shirt || C.gold, pn = o.pants || C.pants[sd % 4], bob = (o.bob ?? 0) - (o.jump ?? 0);
  const OL = C.ink;
  c.save(); c.translate(x, y); c.scale((o.flip ? -1 : 1) * s, s); c.rotate(o.lean ?? 0);
  const hipY = -150 + bob, wp = o.walk, la = wp === undefined ? .06 : Math.sin(wp) * .5;
  for (const [dx, a, k] of [[-17, la, 1], [17, -la, 2]]) { const kn = [dx + Math.sin(a) * 36, hipY + 74], ft = [dx + Math.sin(a) * 64, -8 - (o.jump ?? 0)];
    const lp = [[dx - 15, hipY], [dx + 15, hipY], [kn[0] + 13, kn[1]], [ft[0] + 11, ft[1]], [ft[0] - 11, ft[1]], [kn[0] - 13, kn[1]]];
    shp(c, lp, pn, { sharp: true, w: 4, lc: OL, seed: sd * 7 + k }); shp(c, [[ft[0] - 16, ft[1] - 4], [ft[0] + 30, ft[1] - 4], [ft[0] + 30, ft[1] + 8], [ft[0] - 16, ft[1] + 8]], C.ink, { w: 3, lc: OL, seed: sd * 7 + k + 3 }); }
  const torso = [[-48, -270 + bob], [-12, -278 + bob], [12, -278 + bob], [48, -270 + bob], [42, -146 + bob], [-42, -146 + bob]];
  shp(c, torso, sh, { w: 5, lc: OL, seed: sd * 11, hatch: shade(sh, .6), hal: .14, hg: 13 });
  const arm = (side, a1, a2, k) => { const s0 = [side * 42, -258 + bob], v1 = vD(a1, side), e = [s0[0] + v1[0] * 64, s0[1] + v1[1] * 64], v2 = vD(a1 + a2, side), hd = [e[0] + v2[0] * 58, e[1] + v2[1] * 58];
    ln(c, [s0, e], { w: 17, col: sh, seed: sd * 13 + k, taper: 0, amp: .6 }); ln(c, [e, hd], { w: 12, col: sk, seed: sd * 13 + k + 1, taper: 0, amp: .6 }); ln(c, [s0, e, hd], { w: 3.5, col: OL, seed: sd * 13 + k + 2, taper: .5 });
    shp(c, blob(hd[0], hd[1], 13, 13, sd + k, { amp: .08, n: 16 }), sk, { w: 3.5, lc: OL, seed: sd + k }); return hd; };
  const [l1, l2] = o.armL || [.22, .12], [r1, r2] = o.armR || [.22, .12]; const hL = arm(-1, l1, l2, 1), hR = arm(1, r1, r2, 2);
  const hy = -334 + bob + (o.nod ?? 0); shp(c, [[-10, -286 + bob], [10, -286 + bob], [10, -270 + bob], [-10, -270 + bob]], sk, { w: 3, lc: OL, sharp: true, seed: sd });
  shp(c, blob(0, hy, 48, 52, sd * 3, { amp: .03, n: 40 }), sk, { w: 5, lc: OL, seed: sd * 3 });
  c.save(); c.globalAlpha = .35; c.fillStyle = '#E58A7A'; c.beginPath(); c.ellipse(-28, hy + 14, 9, 6, 0, 0, TAU); c.ellipse(28, hy + 14, 9, 6, 0, 0, TAU); c.fill(); c.restore();
  const hp = []; for (let k = 0; k <= 16; k++) { const a = Math.PI * (1.02 + k / 16 * .96); hp.push([Math.cos(a) * 54, hy - 6 + Math.sin(a) * 58]); }
  hp.push([46, hy - 14], [20, hy - 32], [-12, hy - 26], [-46, hy - 12]);
  if (o.old) { shp(c, [[-52, hy - 4], [-48, hy - 30], [-34, hy - 8]], hr, { w: 3, lc: OL, seed: sd }); shp(c, [[52, hy - 4], [48, hy - 30], [34, hy - 8]], hr, { w: 3, lc: OL, seed: sd + 1 }); }
  else shp(c, hp, hr, { w: 4, lc: OL, seed: sd * 5 });
  const lk = o.look ?? 0, bl = o.blink ? .15 : 1;
  for (const ex of [-17, 17]) { c.save(); c.fillStyle = C.ink; c.beginPath(); c.ellipse(ex + lk * 5, hy - 2, 6, 8 * bl, 0, 0, TAU); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(ex + lk * 5 + 2, hy - 5, 1.8 * bl, 0, TAU); c.fill(); c.restore();
    ln(c, [[ex - 10, hy - 19 - (o.brow ?? 0) * (ex < 0 ? -1 : 1) * 4], [ex + 10, hy - 19 + (o.brow ?? 0) * (ex < 0 ? -1 : 1) * 4]], { w: 3.5, seed: sd + ex, col: OL }); }
  if (o.old) for (const gx of [-17, 17]) { const g = blob(gx, hy - 2, 15, 13, 2 + gx, { n: 18 }); ln(c, g.concat([g[0]]), { w: 3, col: OL, seed: 31 + gx }); }
  const m = o.mouth || 'smile', my = hy + 24;
  if (m === 'smile') ln(c, [[-14, my - 2], [0, my + 7], [14, my - 2]], { w: 4, col: OL, seed: sd + 40 });
  else if (m === 'grin') shp(c, [[-19, my - 5], [19, my - 5], [10, my + 13], [-10, my + 13]], '#7A2E2E', { w: 3.5, lc: OL, seed: sd + 41 });
  else if (m === 'o') shp(c, blob(0, my + 2, 8, 10, sd + 42, { n: 14 }), '#7A2E2E', { w: 3, lc: OL, seed: sd + 42 });
  else ln(c, [[-12, my + 2], [12, my + 2]], { w: 4, col: OL, seed: sd + 44 });
  if (o.sweat) for (const [dx, dy, k] of [[56, hy - 30, 0], [64, hy + 4, 1]]) { const yy = dy + ((o.sweat * 60 + k * 20) % 30); shp(c, [[dx, yy - 12], [dx + 7, yy + 2], [dx, yy + 8], [dx - 7, yy + 2]], '#9FD3F0', { w: 2.5, seed: 50 + k, lc: OL }); }
  if (o.prop) o.prop(c, hL, hR);
  c.restore();
}
const idle = (T, ph = 0) => ({ bob: Math.sin(T * 2.4 + ph) * 3, blink: ((T + ph) % 3.1) < .12 });

// ================= escenas =================
const SC = [];
function scene(sid, tr, draw, night = false) { const k = DD.secs.findIndex(s => s.id === sid); if (k < 0) throw new Error('sección inexistente: ' + sid);
  const t0 = k === 0 ? 0 : DD.secs[k].t0 - .35, t1 = k + 1 < DD.secs.length ? DD.secs[k + 1].t0 - .35 : DUR; SC.push({ id: sid, t0, t1, tr, draw, night }); if (k > 0) sfx(t0 + .02, 'whoosh'); }

// ================= subtítulos (3 palabras, cifras en pantalla) =================
let SUB = [];
function buildSubs() { const d = DD.display, G = []; let g = [];
  for (const w of d) { g.push(w); if (g.length === 3 || /[.?!:;]$/.test(w[0])) { G.push(g); g = []; } } if (g.length) G.push(g);
  SUB = G.map((g, k) => ({ g, a: g[0][1], b: k + 1 < G.length ? Math.min(G[k + 1][0][1], g[g.length - 1][2] + .6) : g[g.length - 1][2] + .6 }));
  window.__SUB = SUB.map(s => [s.g.map(w => w[0]).join(' '), +s.a.toFixed(3), +s.b.toFixed(3)]); }
function subs(c, T) { const s = SUB.find(s => T >= s.a && T < s.b); if (!s) return; resetT(c);
  const size = 56, txt = s.g.map(w => w[0]).join(' '); c.save(); c.font = `800 ${size}px ${FF.ui}`; const wd = c.measureText(txt).width; c.restore(); const k = Math.min(1, 940 / (wd + 70));
  const idx = SUB.indexOf(s), sc = (.92 + .08 * pb(T, s.a, .18)) * k; c.save(); c.translate(540, 1665); c.rotate(idx % 2 ? .012 : -.012); c.scale(sc, sc); const w = wd + 70, h = 92; INKC = C.ink;
  shp(c, R4(-w / 2, -h / 2, w, h), C.paper, { sharp: true, w: 5, seed: 300 + idx % 3 });
  c.font = `800 ${size}px ${FF.ui}`; c.textBaseline = 'middle'; c.textAlign = 'left'; let x = -wd / 2;
  for (const wv of s.g) { const ww = c.measureText(wv[0] + ' ').width, on = T >= wv[1] && T < wv[2] + .05; c.fillStyle = on ? C.goldD : C.ink; c.fillText(wv[0], x, 3); if (on) ul(c, x, x + c.measureText(wv[0]).width, 34, 1, { w: 6, seed: 7 }); x += ww; }
  c.restore(); }

// ================= transiciones y cuadro =================
let LA, LB;
function drawScene(c, s, T) { c.save(); resetT(c); c.globalAlpha = 1; BOIL = Math.floor(T * 8) * 17; INKC = s.night ? C.chalk : C.ink; s.draw(c, T, T - s.t0); c.restore(); }
function compose(c, tr, u) { resetT(c);
  if (tr === 'blot') { blit(c, LA); blot(c, LB, CX, CY * .9, easeIn(u) * 1300, 7, C.ink); }
  else if (tr === 'iris') { blit(c, LA); const r = easeInOutSine(u) * 1150; iris(c, CX, CY, r, cc => blit(cc, LB)); c.save(); c.strokeStyle = C.gold; c.lineWidth = 16; c.beginPath(); c.arc(CX, CY, r, 0, TAU); c.stroke(); c.restore(); }
  else if (tr === 'whip') { const o = easeInOutQuint(u); c.drawImage(LA, -o * W, 0, W, H); c.drawImage(LB, W * (1 - o), 0, W, H); c.save(); c.globalAlpha = Math.sin(u * Math.PI) * .7; speedLines(c, CX, CY, Math.PI, 3, 12, .8, C.ink); c.restore(); }
  else if (tr === 'wipe') { blit(c, LA); const e = easeInOutSine(u) * 2200 - 300; c.save(); c.beginPath(); c.moveTo(-100, -100); c.lineTo(e + 500, -100); c.lineTo(e - 300, H + 100); c.lineTo(-100, H + 100); c.closePath(); c.clip(); c.drawImage(LB, 0, 0, W, H); c.restore();
    ln(c, [[e + 500, -100], [e + 100, H / 2], [e - 300, H + 100]], { w: 36, col: C.gold, seed: 5 }); }
  else if (tr === 'news') { blit(c, u < .5 ? LA : LB);
    for (let k = 0; k < 7; k++) { const d = (k % 3) * .06, v = cl01((u - d) / .8), x = lerp(W + 500, -500, easeInOutSine(v)), y = 150 + k * 270 + Math.sin(k * 2.1) * 60; newspaper(c, x, y, 560, 380, (k % 2 ? .18 : -.14) + v * (k % 2 ? -.3 : .3), { seed: 70 + k }); } }
  else if (tr === 'drop') { blit(c, LA); const y = -H * (1 - easeOutBack(u, 1.2)); c.drawImage(LB, 0, y, W, H); ln(c, [[0, y + H], [W, y + H]], { w: 14, col: C.ink, seed: 3 }); }
  else blit(c, LB); }
function frame(c, tau) {
  const T = Math.min(DUR - 1e-3, tau / TS); let k = SC.findIndex(s => T >= s.t0 && T < s.t1); if (k < 0) k = SC.length - 1; const s = SC[k], tl = T - s.t0;
  if (k > 0 && tl < TRD && s.tr) { if (!LA) { LA = layer(); LB = layer(); } drawScene(LA.getContext('2d'), SC[k - 1], T); drawScene(LB.getContext('2d'), s, T); compose(c, s.tr, tl / TRD); }
  else drawScene(c, s, T);
  resetT(c); INKC = C.ink; if (!SC[k].night) { c.save(); c.globalAlpha = .85; c.fillStyle = C.paper; c.beginPath(); c.roundRect(430, 50, 220, 40, 20); c.fill(); c.restore(); }
  tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', col: SC[k].night ? C.chalk : C.ink, al: SC[k].night ? .55 : .7 }); subs(c, T);
}
// arranque: verifica orden de transiciones, exporta eventos y escenas, carga fuentes y define el film
function startFilm(name, coverFn) {
  for (let k = 2; k < SC.length; k++) if (SC[k].tr === SC[k - 1].tr) throw new Error('transición repetida seguida: ' + SC[k].id);
  buildSubs(); window.__EV = EV.sort((a, b) => a[0] - b[0]); window.__SC = SC.map(s => ({ id: s.id, t0: +s.t0.toFixed(3), t1: +s.t1.toFixed(3), tr: s.tr }));
  if (coverFn) window.__cover = () => { COVER = true; try { coverFn(ctx); } finally { COVER = false; } return cv.toDataURL('image/png'); };
  const fonts = [['Caveat', 'caveat-700.woff2', 700], ['Bricolage', 'bricolage-800.woff2', 800], ['Jakarta', 'jakarta-800.woff2', 800]];
  Promise.all(fonts.map(([n, f, w]) => new FontFace(n, `url(${f})`, { weight: String(w) }).load().then(ff => document.fonts.add(ff)))).then(() =>
    defineFilm({ palette: { ...PALETTES.pencilMinimal, paper: C.paper, paperBand: null, ink: C.ink, night: C.navy, accents: [C.gold, C.goldD, C.goldL, C.red], chalk: C.chalk }, format: { ar: '9:16', width: 1080 }, fps: 24, timeline: [{ name: name + '-' + MODE, dur: DUR * TS, fn: frame }] }));
}
