// TITÁN · Piloto «Interés compuesto: la bola de nieve» · estilo dibujado a mano (skill hand-drawn-canvas-animation, core.js)
// Vertical 1080×1920. Los tiempos salen de la voz (DATA.words, alineada por ASR). 24 fps lógicos estirados ×1,25 → 30 fps reales.
'use strict';
const TS = 1.25, TRD = .5;
const DD = DATA, DUR = DD.dur;
const C = { paper: '#F6F1E6', ink: '#161A36', navy: '#0D1020', gold: '#C8A45D', goldD: '#9C7B3A', lav: '#B9A2E8', vio: '#6B4FA0', red: '#C2553F',
  green: '#5E9E78', chalk: '#F3EEE2', skin: ['#F1C7A5', '#C99674', '#8D5B3E', '#E8B48F'], hair: ['#2B1B12', '#5A3A22', '#1E1A2E', '#8A5A2B'] };
const PALT = { ...PALETTES.pencilMinimal, paper: C.paper, paperBand: null, ink: C.ink, night: C.navy, accents: [C.gold, C.vio, C.lav, C.red], chalk: C.chalk };
const FF = { hand: '"Caveat"', big: '"Bricolage"', ui: '"Jakarta"' };
let BOIL = 0, INKC = C.ink;

// ---------- tiempo ----------
const nrm = w => w.toLowerCase().replace(/[^0-9a-záéíóúñü]/g, '');
const AMB = []; window.__AMB = AMB;
function A(ph, after = 0) {
  const ks = ph.split(/\s+/).map(nrm).filter(Boolean), Wd = DD.words;
  if (after === 0) { let n = 0; for (let i = 0; i + ks.length <= Wd.length; i++) { let ok = true; for (let j = 0; j < ks.length; j++) if (nrm(Wd[i + j][0]) !== ks[j]) { ok = false; break; } if (ok) n++; } if (n > 1) AMB.push(ph); }
  for (let i = 0; i + ks.length <= Wd.length; i++) { if (Wd[i][1] < after - 1e-6) continue; let ok = true;
    for (let j = 0; j < ks.length; j++) if (nrm(Wd[i + j][0]) !== ks[j]) { ok = false; break; } if (ok) return Wd[i][1]; }
  throw new Error('ancla no encontrada: ' + ph);
}
const cl01 = x => clamp(x, 0, 1);
const pr = (T, t0, d = .45, e = easeOutQuint) => T <= t0 ? 0 : T >= t0 + d ? 1 : e((T - t0) / d);
const pb = (T, t0, d = .45) => T <= t0 ? 0 : T >= t0 + d ? 1 : easeOutBack((T - t0) / d);
const HITS = [], EV = [];
function hit(t, amp = 10, kind = 'impact') { HITS.push([t, amp]); if (kind) EV.push([+t.toFixed(3), kind]); return t; }
function sfx(t, kind) { EV.push([+t.toFixed(3), kind]); return t; }
function shk(T) { let x = 0, y = 0; for (const [t, a] of HITS) { if (T < t || T > t + .9) continue; x += settle(T, t, { amp: a, freq: 10, decay: 7 }); y += settle(T, t, { amp: a * .8, freq: 13, decay: 7, phase: 1.3 }); } return [x, y]; }
let COVER = false;
function camS(c, T, x, y, z = 1, rot = 0) { if (COVER) { cam(c, 540, 930, 1); return; } const [sx, sy] = shk(T); cam(c, x - sx / z, y - sy / z, z, rot + sx * .0004); }

// ---------- trazos ----------
function dens(pts, step = 18) { const out = [pts[0]]; for (let i = 1; i < pts.length; i++) { const [a, b] = [pts[i - 1], pts[i]], n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / step)); for (let k = 1; k <= n; k++) out.push([lerp(a[0], b[0], k / n), lerp(a[1], b[1], k / n)]); } return out; }
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
function tw(c, s, x, y, o = {}) { c.save(); c.font = `${o.f === 'hand' ? 700 : 800} ${o.size || 60}px ${FF[o.f || 'big']}`; const m = c.measureText(s).width; c.restore(); return m * (o.sc ?? 1); }
const ul = (c, x1, x2, y, p, o = {}) => ln(c, [[x1, y + 3], [(x1 + x2) / 2, y + 7], [x2, y - 2]], { w: o.w ?? 9, col: o.col ?? C.gold, p, seed: o.seed ?? 4 });
function ring(c, x, y, rx, ry, p, o = {}) { const pts = blob(x, y, rx, ry, o.seed ?? 5, { amp: .05, n: 40 }); ln(c, pts.concat(pts.slice(0, 7)), { w: o.w ?? 7, col: o.col ?? C.gold, p, seed: o.seed ?? 5 }); }
function arrow(c, a, b, p, o = {}) { const m = [(a[0] + b[0]) / 2 + (o.bend ?? 40), (a[1] + b[1]) / 2 - (o.bend ?? 40)]; ln(c, [a, m, b], { w: o.w ?? 6, col: o.col, p, seed: o.seed ?? 8 });
  if (p > .95) { const ang = Math.atan2(b[1] - m[1], b[0] - m[0]), L = 26; ln(c, [[b[0] - L * Math.cos(ang - .5), b[1] - L * Math.sin(ang - .5)], b, [b[0] - L * Math.cos(ang + .5), b[1] - L * Math.sin(ang + .5)]], { w: o.w ?? 6, col: o.col, seed: 9 }); } }
function stamp(c, s, x, y, T, t0, o = {}) {
  if (T < t0) return; const u = T - t0, k = u < .16 ? lerp(2.3, 1, easeIn(u / .16)) : 1 + settle(T, t0 + .16, { amp: .07, freq: 4, decay: 7 });
  c.save(); c.translate(x, y); c.rotate(o.rot ?? -.06); c.scale(k, k); c.globalAlpha = Math.min(1, u / .08);
  const size = o.size || 84, w = tw(c, s, 0, 0, { size }) + 70, h = size * 1.35, col = o.col || C.gold;
  shp(c, R4(-w / 2, -h / 2, w, h), o.bg ?? C.paper, { sharp: true, w: 7, lc: col, seed: 21 });
  ln(c, R4(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24).concat([[-w / 2 + 12, -h / 2 + 12]]), { w: 3, col, seed: 22, straight: true, taper: .2 });
  tx(c, s, 0, 4, { size, col, sh: null }); c.restore();
}
function burst(c, x, y, T, t0, o = {}) { if (T < t0 || T > t0 + .7) return; const u = (T - t0) / .7; c.save(); c.globalAlpha = 1 - u; dotBurst(c, x, y, (o.R ?? 120) * easeOutQuint(u), o.n ?? 14, o.col ?? C.gold, o.seed ?? 3, 1); c.restore(); }
function lines(c, x, y, T, t0, o = {}) { if (T < t0 || T > t0 + .5) return; const u = (T - t0) / .5; c.save(); c.globalAlpha = 1 - u; c.strokeStyle = o.col ?? INKC; c.lineWidth = 5; c.lineCap = 'round';
  for (let k = 0; k < (o.n ?? 8); k++) { const a = k / (o.n ?? 8) * TAU + .3, r0 = (o.r ?? 70) + 40 * u, r1 = r0 + 40; c.beginPath(); c.moveTo(x + Math.cos(a) * r0, y + Math.sin(a) * r0); c.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1); c.stroke(); } c.restore(); }

// ---------- personas genéricas dibujadas ----------
const vD = (t, side) => [side * Math.sin(t), Math.cos(t)];
function person(c, x, y, s, o = {}) {
  const sd = o.seed ?? 1, sk = o.skin || C.skin[sd % 4], hr = o.old ? '#C9CCD4' : (o.hair || C.hair[sd % 4]), sh = o.shirt || C.lav, bob = (o.bob ?? 0) - (o.jump ?? 0);
  c.save(); c.translate(x, y); c.scale((o.flip ? -1 : 1) * s, s); c.rotate(o.lean ?? 0);
  const hip = [0, -150 + bob], wp = o.walk, la = wp === undefined ? .08 : Math.sin(wp) * .5;
  for (const [dx, a, k] of [[-15, la, 1], [15, -la, 2]]) { const kn = [dx + Math.sin(a) * 38, hip[1] + 72], ft = [dx + Math.sin(a) * 66 - (o.jump ? 0 : 0), -4 - (o.jump ?? 0)];
    ln(c, [[dx, hip[1]], kn, ft], { w: 7, seed: sd * 7 + k, taper: .4 }); ln(c, [[ft[0] - 4, ft[1]], [ft[0] + 24, ft[1] + 2]], { w: 10, seed: sd * 7 + k + 3, taper: 0 }); }
  const torso = [[-46, -268 + bob], [-10, -276 + bob], [10, -276 + bob], [46, -268 + bob], [38, -150 + bob], [-38, -150 + bob]];
  shp(c, torso, sh, { w: 5, seed: sd * 11, hatch: shade(sh, .55), hal: .22, hg: 11 });
  const arm = (side, a1, a2, k) => { const s0 = [side * 40, -258 + bob], v1 = vD(a1, side), e = [s0[0] + v1[0] * 64, s0[1] + v1[1] * 64], v2 = vD(a1 + a2, side), hd = [e[0] + v2[0] * 58, e[1] + v2[1] * 58];
    ln(c, [s0, e, hd], { w: 7, seed: sd * 13 + k, taper: .4 }); shp(c, blob(hd[0], hd[1], 12, 12, sd + k, { amp: .08, n: 16 }), sk, { w: 3.5, seed: sd + k }); return hd; };
  const [l1, l2] = o.armL || [.25, .15], [r1, r2] = o.armR || [.25, .15]; const hL = arm(-1, l1, l2, 1), hR = arm(1, r1, r2, 2);
  const hy = -332 + bob + (o.nod ?? 0); shp(c, [[-9, -284 + bob], [9, -284 + bob], [9, -268 + bob], [-9, -268 + bob]], sk, { w: 3, sharp: true, seed: sd });
  shp(c, blob(0, hy, 46, 50, sd * 3, { amp: .035, n: 40 }), sk, { w: 5, seed: sd * 3 });
  const hp = []; for (let k = 0; k <= 16; k++) { const a = Math.PI * (1.02 + k / 16 * .96); hp.push([Math.cos(a) * 52, hy - 6 + Math.sin(a) * 56]); }
  hp.push([44, hy - 14], [20, hy - 30], [-12, hy - 26], [-44, hy - 12]);
  if (o.old) { shp(c, [[-50, hy - 4], [-46, hy - 30], [-34, hy - 8]], hr, { w: 3, seed: sd }); shp(c, [[50, hy - 4], [46, hy - 30], [34, hy - 8]], hr, { w: 3, seed: sd + 1 }); }
  else shp(c, hp, hr, { w: 4, seed: sd * 5 });
  const lk = o.look ?? 0, bl = o.blink ? .15 : 1;
  for (const ex of [-16, 16]) { c.save(); c.fillStyle = INKC === C.chalk ? C.ink : C.ink; c.beginPath(); c.ellipse(ex + lk * 5, hy - 2, 5.5, 7.5 * bl, 0, 0, TAU); c.fill(); c.restore();
    ln(c, [[ex - 10, hy - 18 - (o.brow ?? 0) * (ex < 0 ? -1 : 1) * 4], [ex + 10, hy - 18 + (o.brow ?? 0) * (ex < 0 ? -1 : 1) * 4]], { w: 3.5, seed: sd + ex, col: C.ink }); }
  if (o.old) { ln(c, blob(-16, hy - 2, 14, 12, 2, { n: 18 }).concat([blob(-16, hy - 2, 14, 12, 2, { n: 18 })[0]]), { w: 3, col: C.ink, seed: 31 }); ln(c, blob(16, hy - 2, 14, 12, 3, { n: 18 }).concat([blob(16, hy - 2, 14, 12, 3, { n: 18 })[0]]), { w: 3, col: C.ink, seed: 32 }); ln(c, [[-2, hy - 3], [2, hy - 3]], { w: 3, col: C.ink, seed: 33 }); }
  const m = o.mouth || 'smile', my = hy + 22;
  if (m === 'smile') ln(c, [[-14, my - 2], [0, my + 7], [14, my - 2]], { w: 4, col: C.ink, seed: sd + 40 });
  else if (m === 'grin') shp(c, [[-18, my - 5], [18, my - 5], [10, my + 12], [-10, my + 12]], '#7A2E2E', { w: 3.5, lc: C.ink, seed: sd + 41 });
  else if (m === 'o') shp(c, blob(0, my + 2, 8, 10, sd + 42, { n: 14 }), '#7A2E2E', { w: 3, lc: C.ink, seed: sd + 42 });
  else if (m === 'frown') ln(c, [[-13, my + 6], [0, my - 2], [13, my + 6]], { w: 4, col: C.ink, seed: sd + 43 });
  else ln(c, [[-12, my + 2], [12, my + 2]], { w: 4, col: C.ink, seed: sd + 44 });
  if (o.sweat) for (const [dx, dy, k] of [[54, hy - 30, 0], [62, hy + 4, 1]]) { const yy = dy + ((o.sweat * 60 + k * 20) % 30); shp(c, [[dx, yy - 12], [dx + 7, yy + 2], [dx, yy + 8], [dx - 7, yy + 2]], '#9FD3F0', { w: 2.5, seed: 50 + k, lc: C.ink }); }
  if (o.prop) o.prop(c, hL, hR);
  c.restore();
}
const idle = (T, ph = 0) => ({ bob: Math.sin(T * 2.4 + ph) * 3, blink: ((T + ph) % 3.1) < .12 });

// ---------- objetos ----------
function snowball(c, x, y, r, rot, o = {}) {
  c.save(); c.translate(x, y); const P = circPath(0, 0, r);
  c.save(); c.clip(P); c.fillStyle = C.lav; c.fillRect(-r, -r, 2 * r, 2 * r); c.fillStyle = '#FFFFFF'; c.beginPath(); c.arc(-r * .16, -r * .18, r * .9, 0, TAU); c.fill();
  hatch(c, P, [-r, -r, 2 * r, 2 * r], { angle: -.6, gap: Math.max(6, r / 9), len: Math.max(8, r / 5), color: C.vio, alpha: .22, width: 1.4, seed: 4 }); c.restore();
  c.save(); c.globalAlpha = .55; for (let k = 0; k < 4; k++) { const a0 = rot + k * 1.7, rr = r * (.3 + .16 * k); const pts = []; for (let j = 0; j <= 8; j++) { const a = a0 + j / 8 * 1.1; pts.push([Math.cos(a) * rr, Math.sin(a) * rr]); } ln(c, pts, { w: Math.max(2, r / 26), col: C.vio, seed: 60 + k, still: true }); } c.restore();
  for (let k = 0; k < 6; k++) { const a = rot * 1 + k * 1.05, rr = r * (.5 + .3 * ((k * 37) % 10) / 10); c.save(); c.fillStyle = C.lav; c.globalAlpha = .7; c.beginPath(); c.arc(Math.cos(a) * rr, Math.sin(a) * rr, Math.max(2, r * .05), 0, TAU); c.fill(); c.restore(); }
  ln(c, blob(0, 0, r, r, 9, { amp: .025, n: 44 }), { w: Math.max(4, r / 16), close: true, seed: 70 });
  if (o.label) tx(c, o.label, 0, 2, { size: o.ls ?? Math.max(24, r * .32), col: C.ink, f: 'big', sh: C.gold, so: 2 });
  c.restore();
}
function coin(c, x, y, r, o = {}) { c.save(); c.translate(x, y); if (o.rot) c.rotate(o.rot); c.scale(o.spin === undefined ? 1 : Math.max(.15, Math.abs(Math.cos(o.spin))), 1);
  shp(c, blob(0, 0, r, r, o.seed ?? 7, { amp: .02, n: 30 }), C.gold, { w: Math.max(3, r / 9), seed: o.seed ?? 7, hatch: C.goldD, hal: .3, hg: 7 });
  ln(c, blob(0, 0, r * .7, r * .7, 8, { amp: .03, n: 24 }), { w: Math.max(2, r / 16), close: true, seed: 8, col: C.goldD });
  tx(c, o.lab ?? '$', 0, 2, { size: o.ls ?? r * 1.0, col: C.ink, sh: null }); c.restore(); }
function bills(c, x, y, n, o = {}) { for (let k = 0; k < n; k++) { const yy = y - k * 22, dx = ((k * 53) % 9) - 4; shp(c, R4(x - 120 + dx, yy - 22, 240, 34), C.green, { sharp: true, w: 4, seed: 80 + k });
  c.save(); c.globalAlpha = .6; c.strokeStyle = C.ink; c.lineWidth = 2; c.beginPath(); c.ellipse(x + dx, yy - 5, 26, 11, 0, 0, TAU); c.stroke(); c.restore(); } }
function calendar(c, x, y, lab, T, tflip, o = {}) { const w = 230, h = 220;
  shp(c, R4(x - w / 2, y - h / 2, w, h), C.paper, { sharp: true, w: 6, seed: 91 }); shp(c, R4(x - w / 2, y - h / 2, w, 56), C.red, { sharp: true, w: 6, seed: 92 });
  for (const dx of [-60, 60]) ln(c, [[x + dx, y - h / 2 - 22], [x + dx, y - h / 2 + 14]], { w: 8, seed: 93 + dx });
  const u = tflip === undefined ? 1 : pr(T, tflip, .5, easeOutBack); const old = o.old;
  if (old && u < 1) { c.save(); c.translate(x, y - h / 2 + 56); c.scale(1, Math.max(.02, 1 - u * 2)); tx(c, old, 0, 82, { size: 62, f: 'hand' }); c.restore(); }
  if (!old || u >= .5) { c.save(); c.translate(x, y - h / 2 + 56); c.scale(1, old ? (u - .5) * 2 : 1); tx(c, lab, 0, 82, { size: 62, f: 'hand' }); c.restore(); }
}
function tag(c, s, x, y, o = {}) { const size = o.size || 32, w = tw(c, s, 0, 0, { size, f: 'ui' }) + 44, h = size * 1.6; c.save(); c.translate(x, y); c.rotate(o.rot ?? -.02); if (o.sc !== undefined) c.scale(o.sc, o.sc);
  shp(c, R4(-w / 2, -h / 2, w, h), o.bg || C.gold, { sharp: true, w: 4, seed: o.seed ?? 95 }); tx(c, s, 0, 2, { size, f: 'ui', col: o.col || C.ink }); c.restore(); }
function bubble(c, x, y, w, h, T, t0, fn) { const k = pb(T, t0, .4); if (k <= 0) return; c.save(); c.translate(x, y); c.scale(k, k);
  shp(c, blob(0, 0, w / 2, h / 2, 33, { amp: .06, n: 36 }), '#FFFFFF', { w: 5, seed: 33 }); shp(c, [[-20, h / 2 - 8], [8, h / 2 - 6], [-34, h / 2 + 38]], '#FFFFFF', { w: 4, seed: 34 }); fn(c); c.restore(); }
function pine(c, x, y, s, sway = 0) { c.save(); c.translate(x, y); c.rotate(sway); shp(c, [[0, -170 * s], [70 * s, 0], [-70 * s, 0]], '#7FA88E', { w: 5, seed: 101 + x % 7, hatch: '#3E6B52', hal: .3 }); ln(c, [[0, 0], [0, 40 * s]], { w: 9, seed: 103 }); c.restore(); }

// ================= escenas =================
const SE = DD.secs, SC = [];
const st = k => k === 0 ? 0 : SE[k].t0 - .35;
function scene(k, tr, draw, night = false) { SC.push({ id: SE[k].id, t0: st(k), t1: k + 1 < SE.length ? st(k + 1) : DUR, tr, draw, night }); if (k > 0) sfx(st(k) + .02, 'whoosh'); }

// 1 · Gancho: dos personas, misma meta, cuotas muy distintas
{ const t_un = A('un millón de dólares', .01), t_una = A('Una empieza'), t_190 = A('ciento noventa dólares', .01), t_otra = A('La otra empieza'), t_2900 = A('dos mil novecientos.'), t_pq = A('¿Por qué la diferencia');
  hit(t_190 + .1, 6, 'ping'); hit(t_2900 + .05, 16); hit(t_pq, 12, 'stamp'); sfx(t_una, 'ping'); sfx(t_otra, 'ping');
  scene(0, null, (c, T, L) => {
    paper(c); const zf = key(T, [[0, 1.0], [t_2900 - .2, 1.04], [t_2900 + .2, 1.12], [t_pq - .1, 1.12], [t_pq + .3, 1.0], [99, 1.03]]);
    const cx = key(T, [[0, 540], [t_2900 - .2, 540], [t_2900 + .2, 690], [t_pq - .1, 690], [t_pq + .3, 540]]);
    camS(c, T, cx, 900 + Math.sin(T * .6) * 6, zf);
    tx(c, 'MISMA META', 540, 175, { size: 66, f: 'hand', rot: -.03 });
    tx(c, 'US$1.000.000', 540, 290, { size: 124, col: C.gold, sc: 1 + settle(T, t_un, { amp: .12, freq: 3, decay: 5 }) });
    ul(c, 170, 910, 365, pr(T, 0, .7)); ring(c, 540, 290, 420, 92, pr(T, t_un, .6));
    tx(c, 'a los 65 años', 540, 430, { size: 58, f: 'hand' });
    ln(c, [[40, 1304], [400, 1298], [720, 1308], [1040, 1300]], { w: 6, seed: 120 });
    // pequeña bola que ya rueda junto al joven
    const bx = 90 + L * 18, br = 26 + L * .9; snowball(c, bx, 1304 - br, br, L * 18 / br);
    const i1 = idle(T, 0), i2 = idle(T, 1.3), wave = T > t_una && T < t_una + 1.6 ? Math.sin((T - t_una) * 12) * .35 : 0, shrug = pr(T, t_pq, .3);
    person(c, 300, 1300, 1.42, { seed: 2, shirt: C.lav, ...i1, mouth: T > t_190 ? 'grin' : 'smile', armR: [lerp(T > t_una ? 2.6 : .25, 2.2, shrug), T > t_una ? .3 + wave : .15], armL: [lerp(.25, 2.2, shrug), lerp(.15, .6, shrug)], look: T > t_otra ? 1 : 0 });
    const sw = T > t_2900 ? (T - t_2900) : 0;
    person(c, 780, 1300, 1.42, { seed: 3, old: true, shirt: '#E8C98A', ...i2, mouth: T > t_2900 ? 'o' : 'smile', brow: T > t_2900 ? 1 : 0, sweat: T > t_2900 ? sw : 0, lean: T > t_2900 ? -.06 * Math.min(1, sw * 3) : 0,
      armR: T > t_otra && T < t_2900 ? [1.6, .2] : [lerp(.25, 2.2, shrug), lerp(.15, .6, shrug)], armL: [lerp(.25, 2.2, shrug), lerp(.15, .6, shrug)], look: T > t_una && T < t_otra ? -1 : 0 });
    // edades
    for (const [x, t, s] of [[120, t_una, '20'], [960, t_otra, '50']]) { const k = pb(T, t); if (k > 0) { c.save(); c.translate(x, 860); c.scale(k, k); shp(c, blob(0, 0, 62, 62, 4, { n: 30 }), C.paper, { w: 6, lc: C.gold, seed: 4 }); tx(c, s, 0, -4, { size: 62 }); tx(c, 'AÑOS', 0, 40, { size: 22, f: 'ui' }); c.restore(); } }
    // cuotas
    bubble(c, 300, 560, 330, 150, T, t_190, cc => { tx(cc, 'US$190', 0, -14, { size: 66 }); tx(cc, 'al mes', 0, 40, { size: 40, f: 'hand' }); });
    bubble(c, 780, 545, 380, 170, T, t_2900, cc => { tx(cc, 'US$2.890', 0, -16, { size: 70, col: C.red, sh: C.ink, so: 3 }); tx(cc, 'al mes', 0, 44, { size: 40, f: 'hand' }); });
    for (let k = 0; k < 3; k++) { const t = t_190 + .15 + k * .15; if (T > t) coin(c, 450 + k * 8, 1278 - k * 16 - 260 * (1 - pr(T, t, .35, easeIn)), 24, { seed: k }); }
    for (let k = 0; k < 16; k++) { const t = t_2900 + .05 + k * .07, tgt = 1278 - (k % 8) * 16; if (T > t) coin(c, 920 + (k < 8 ? 0 : 56) + ((k * 7) % 5), tgt - 520 * (1 - pr(T, t, .3, easeIn)), 24, { seed: k + 3, spin: T < t + .3 ? T * 20 : undefined }); }
    stamp(c, '¿POR QUÉ?', 540, 1440, T, t_pq, { size: 96 });
    if (T > t_pq) for (let k = 0; k < 5; k++) { const a = T * 1.6 + k * TAU / 5; tx(c, '?', 540 + Math.cos(a) * 360, 1440 + Math.sin(a) * 80, { size: 64, f: 'hand', al: pr(T, t_pq + .1, .3), rot: Math.sin(a) * .3 }); }
    burst(c, 780, 545, T, t_2900, { R: 220, col: C.red }); burst(c, 300, 560, T, t_190, { R: 160 });
  });
}
// 2 · Interés compuesto = bola de nieve
{ const t_res = A('La respuesta'), t_ic = A('interés compuesto.', SE[1].t0 - .5), t_fun = A('funciona como'), t_bola = A('bola de nieve.', SE[1].t0 - .5);
  hit(t_ic + .5, 8, 'stamp'); hit(t_bola + .1, 6, 'ping');
  scene(1, 'blot', (c, T, L) => {
    paper(c); const bu = pr(T, t_bola, 2.4, easeIn), bxw = lerp(170, 900, bu), byw = lerp(930, 1300, bu) , br = lerp(40, 110, bu);
    camS(c, T, lerp(540, 600, bu), lerp(900, 980, bu), 1 + .05 * Math.sin(L * .8) + bu * .06);
    tx(c, 'INTERÉS', 540, 300, { size: 150, f: 'hand', clipP: pr(T, t_ic - .1, .5, easeIO) });
    tx(c, 'COMPUESTO', 540, 450, { size: 150, f: 'hand', col: C.gold, sh: C.ink, clipP: pr(T, t_ic + .3, .6, easeIO) }); ul(c, 160, 920, 530, pr(T, t_ic + .8, .4));
    tx(c, 'funciona como una…', 540, 640, { size: 56, f: 'hand', al: pr(T, t_fun, .3) });
    const hp = [[40, 880], [300, 980], [600, 1120], [900, 1290], [1100, 1380]];
    shp(c, hp.concat([[1100, 1960], [40, 1960]]), '#FFFFFF', { line: false, sharp: true }); ln(c, hp, { w: 7, p: pr(T, t_res, .8), seed: 130 });
    for (const [x, y, s] of [[120, 900, .7], [980, 1340, .8]]) pine(c, x, y, s, Math.sin(T * 2 + x) * .03 + (bu > .9 ? settle(T, t_bola + 2.2, { amp: .2, freq: 3 }) : 0));
    const k = pb(T, t_fun); if (k > 0) { c.save(); c.translate(bxw, byw - br * k); c.scale(k, k); snowball(c, 0, 0, br, bu * 12); c.restore(); }
    if (bu > 0 && bu < 1) speedLines(c, bxw - br - 30, byw - br, Math.PI + .4, 7 + (BOIL % 5), 6, .6);
    person(c, 150, 905, .8, { seed: 5, shirt: C.lav, ...idle(T), lean: T > t_bola && T < t_bola + .8 ? .2 : 0, armR: T > t_bola - .3 && T < t_bola + .8 ? [1.5, .1] : [.25, .15], mouth: T > t_bola ? 'grin' : 'smile' });
    tag(c, 'BOLA DE NIEVE', 700, 760, { sc: pb(T, t_bola), size: 40 }); burst(c, 700, 760, T, t_bola);
  });
}
// 3 · US$10.000 al 8 %: primer año
{ const t_10 = A('diez mil dólares', SE[2].t0 - .5), t_8 = A('ocho por ciento al año.'), t_1y = A('El primer año'), t_800 = A('ochocientos dólares.'), t_ah = A('Ahora tienes');
  hit(t_10 + .1, 8, 'stamp'); hit(t_8 + .1, 8, 'stamp'); hit(t_800 + .45, 12); hit(t_ah + .5, 6, 'ping'); sfx(t_1y, 'ping');
  scene(2, 'whip', (c, T, L) => {
    paper(c); camS(c, T, 540, 940 + Math.sin(L) * 8, key(T, [[SE[2].t0, 1.08], [t_800, 1.0], [t_ah + .4, 1.06], [99, 1.08]]));
    const k = pb(T, SE[2].t0 - .1); if (k > 0) { c.save(); c.translate(540, 1150); c.scale(k, k); bills(c, 0, 0, 9); c.restore(); }
    tx(c, 'US$10.000', 540, 720, { size: 120, sc: pb(T, t_10) });
    if (T > t_ah + .1) ln(c, [[250, 735], [830, 705]], { w: 12, col: C.red, p: pr(T, t_ah + .1, .3), seed: 140 });
    tx(c, 'US$10.800', 540, 860, { size: 130, col: C.gold, sh: C.ink, clipP: pr(T, t_ah + .45, .5, easeIO) }); ring(c, 540, 860, 380, 90, pr(T, t_ah + .9, .5), { col: C.ink });
    tag(c, '+8 % AL AÑO', 830, 520, { sc: pb(T, t_8), size: 38, rot: .05 });
    if (T > t_1y) calendar(c, 210, 450, 'AÑO 1', T, t_1y);
    if (T > t_800) { const u = pr(T, t_800, .5, easeIn), x = lerp(980, 640, u), y = lerp(200, 980, u) - Math.sin(u * Math.PI) * 120; coin(c, x, y, 70, { lab: '+800', ls: 40, spin: u < 1 ? u * 9 : undefined }); }
    burst(c, 640, 980, T, t_800 + .5, { R: 200 }); lines(c, 640, 980, T, t_800 + .5, { r: 90 });
    person(c, 160, 1420, .95, { seed: 2, shirt: C.lav, ...idle(T), mouth: T > t_800 + .5 ? 'grin' : 'smile', armR: T > t_800 + .5 ? [2.7, .2] : [.3, .2], jump: T > t_800 + .5 ? Math.max(0, Math.sin((T - t_800 - .5) * 8)) * 30 * Math.max(0, 1 - (T - t_800 - .5)) : 0, look: 1 });
  });
}
// 4 · Segundo año: ganancia sobre ganancia
{ const t_s = A('El segundo año'), t_ya = A('ya no se calcula'), t_so = A('sino sobre'), t_864 = A('ochocientos sesenta y cuatro.'), t_tus = A('Tus ganancias'), t_pro = A('producir sus propias');
  hit(t_s + .2, 6, 'ping'); hit(t_so + .4, 6); hit(t_864 + .4, 13); hit(t_tus + .2, 6, 'stamp'); sfx(t_pro, 'ping');
  scene(3, 'iris', (c, T, L) => {
    paper(c); camS(c, T, 540, 930, key(T, [[0, 1.0], [t_864, 1.0], [t_864 + .4, 1.08], [t_tus, 1.08], [t_tus + .5, 1.0]]) + .015 * Math.sin(L * 1.2));
    calendar(c, 210, 420, 'AÑO 2', T, t_s, { old: 'AÑO 1' });
    tx(c, '8 % ×', 470, 640, { size: 84, al: pr(T, t_ya, .3), align: 'right' });
    tx(c, '10.000', 510, 640, { size: 84, align: 'left', al: pr(T, t_ya, .3) * (T > t_so ? .45 : 1) });
    if (T > t_so) { ln(c, [[500, 650], [800, 630]], { w: 10, col: C.red, p: pr(T, t_so, .25), seed: 150 }); tx(c, '10.800', 650, 740, { size: 96, col: C.gold, sh: C.ink, clipP: pr(T, t_so + .3, .4, easeIO) }); }
    tx(c, 'año 1', 330, 870, { size: 46, f: 'hand', al: pr(T, t_864 - .3, .3) }); { const k = pb(T, t_864 - .3); if (k > 0) { c.save(); c.translate(330, 990); c.scale(k, k); coin(c, 0, 0, 78, { lab: '+800', ls: 42 }); c.restore(); } }
    tx(c, 'año 2', 760, 870, { size: 46, f: 'hand', al: pr(T, t_864, .3) });
    if (T > t_864) { const u = pr(T, t_864, .45, easeIn); coin(c, 760, lerp(300, 990, u), 92, { lab: '+864', ls: 48, spin: u < 1 ? u * 10 : undefined }); }
    burst(c, 760, 990, T, t_864 + .45, { R: 230 });
    if (T > t_tus) { arrow(c, [560, 1200], [730, 1080], pr(T, t_tus, .4), { col: C.red, bend: -30 }); tx(c, '+64 extra', 520, 1250, { size: 66, col: C.red, sh: C.ink, so: 3, f: 'hand', sc: pb(T, t_tus + .1) }); }
    tx(c, 'ganancia sobre ganancia', 540, 1370, { size: 62, f: 'hand', clipP: pr(T, t_tus + .5, .8, easeIO) });
    // monedas que nacen de monedas
    for (let k = 0; k < 5; k++) { const t = t_pro + k * .22, kk = pb(T, t, .35); if (kk > 0) { const a = -1.2 + k * .6; coin(c, 760 + Math.cos(a) * 150 * kk, 990 + Math.sin(a) * 150 * kk - 30, 26 * kk + .01, { seed: k + 20 }); } }
    person(c, 930, 1470, .8, { seed: 6, shirt: '#E8A87C', ...idle(T, .7), flip: true, mouth: T > t_tus ? 'grin' : 'smile', armL: T > t_tus ? [2.6, .3] : [.25, .2], look: -1 });
  });
}
// 5 · La bola rueda: cada vuelta recoge más
{ const t_e = A('Eso es la bola'), t_m = A('mientras más rueda'), t_r = A('más nieve recoge.'), t_c = A('Y cada vuelta'), t_end = SE[5].t0 - .35;
  const X0 = 150, X1 = 2500, yH = x => 760 + .26 * (x - X0) + 34 * Math.sin(x / 260);
  const u = T => pr(T, t_e + .1, t_end - t_e - .1, x => x * x * (1.6 - .6 * x)), rOf = v => 34 * Math.exp(1.55 * v);
  const posts = [[.33, 'VUELTA 1'], [.62, 'VUELTA 2'], [.88, 'VUELTA 3']];
  const tPass = posts.map(([v]) => { for (let T = t_e; T < t_end + 3; T += .01) if (u(T) >= v) return T; return t_end; });
  tPass.forEach((t, k) => hit(t, 6 + k * 4, 'impact')); sfx(t_m, 'ping');
  scene(4, 'wipe', (c, T, L) => {
    paper(c); const v = u(T), bx = lerp(X0, X1, v), r = rOf(v), by = yH(bx) - r;
    camS(c, T, clamp(bx + 120, 540, X1 - 300), clamp(by + 120, 700, 1500), 1.0 - v * .12);
    const hp = []; for (let x = X0 - 200; x <= X1 + 400; x += 60) hp.push([x, yH(x)]);
    shp(c, hp.concat([[X1 + 400, 2600], [X0 - 200, 2600]]), '#FFFFFF', { line: false, sharp: true }); ln(c, hp, { w: 7, seed: 160 });
    // rastro aplastado
    if (v > 0) { const tr = []; for (let x = X0; x <= bx; x += 40) tr.push([x, yH(x) - 4]); if (tr.length > 1) ln(c, tr, { w: 10, col: C.lav, al: .6, seed: 161 }); }
    for (const [x, s] of [[520, .8], [980, 1], [1500, .9], [2050, 1.1], [2400, .8]]) pine(c, x + 140, yH(x + 140) - 6, s, bx > x ? settle(T, t_e + (x - X0) / (X1 - X0) * (t_end - t_e), { amp: .18, freq: 2.5, decay: 3 }) : Math.sin(T * 2 + x) * .02);
    posts.forEach(([pv, lab], k) => { const px = lerp(X0, X1, pv) + 60, py = yH(px); ln(c, [[px, py], [px, py - 190]], { w: 8, seed: 170 + k }); shp(c, R4(px - 110, py - 260, 220, 80), C.paper, { sharp: true, w: 5, seed: 171 + k });
      tx(c, lab, px, py - 220, { size: 34, f: 'ui' }); burst(c, px, py - 120, T, tPass[k], { R: 120 + k * 60, col: C.lav }); });
    snowball(c, bx, by, r, (bx - X0) / Math.max(30, r));
    if (v > .02 && v < .99) { speedLines(c, bx - r - 20, by, Math.PI, 11 + (BOIL % 7), 7, .6); for (let k = 0; k < 6; k++) { const a = k * 1.3 + T * 9; c.save(); c.fillStyle = '#FFFFFF'; c.strokeStyle = C.lav; c.beginPath(); c.arc(bx - r * .8 - (k * 23 % 60), by + r * .7 - Math.abs(Math.sin(a)) * 40, 6, 0, TAU); c.fill(); c.stroke(); c.restore(); } }
    person(c, clamp(bx - r - 260, X0 - 100, X1), yH(clamp(bx - r - 260, X0 - 100, X1)), .8, { seed: 5, shirt: C.lav, walk: T * 9, lean: .12, mouth: 'grin', armR: [1.3, .4], armL: [1.0, .3] });
    resetT(c); tx(c, 'Cada vuelta recoge más', 540, 280, { size: 76, f: 'hand', clipP: pr(T, t_c, .7, easeIO) }); ul(c, 200, 880, 335, pr(T, t_c + .6, .4));
  });
}
// 6 · La condición: reinvertir (A gasta, B reinvierte)
{ const t_p = A('Pero hay una condición'), t_re = A('reinvertir. Mira'), t_mi = A('Mira a estas'), t_las = A('Las dos ponen'), t_pr = A('La primera se gasta'), t_sg = A('La segunda las deja');
  hit(t_re + .05, 12, 'stamp'); sfx(t_mi, 'whoosh'); hit(t_las + .3, 6, 'ping'); hit(t_pr + .2, 5, 'ping'); hit(t_sg + .2, 5, 'ping');
  scene(5, 'blot', (c, T, L) => {
    paper(c); camS(c, T, 540, 960, key(T, [[0, 1.08], [t_mi, 1.0], [t_pr, 1.0], [t_pr + .4, 1.05], [t_sg, 1.05], [t_sg + .4, 1.0]]) + .012 * Math.sin(L));
    tx(c, 'LA CONDICIÓN:', 540, 210, { size: 70, f: 'hand', clipP: pr(T, t_p, .6, easeIO) }); stamp(c, 'REINVERTIR', 540, 340, T, t_re, { size: 96 });
    const sl = pr(T, SE[5].t0 - .1, .8, easeOutBack), xa = lerp(-300, 280, sl), xb = lerp(1380, 800, sl);
    ln(c, [[40, 1340], [1040, 1336]], { w: 6, seed: 180 });
    // A: se gasta las ganancias
    const bag = (cc, hL) => { shp(cc, [[hL[0] - 34, hL[1] + 8], [hL[0] + 34, hL[1] + 8], [hL[0] + 42, hL[1] + 92], [hL[0] - 42, hL[1] + 92]], C.red, { w: 4, seed: 181 }); tx(cc, '$', hL[0], hL[1] + 52, { size: 42, col: C.paper, sh: null }); };
    person(c, xa, 1336, .95, { seed: 7, shirt: '#E8A87C', ...idle(T), armL: T > t_pr ? [.5, .1] : [.25, .15], mouth: 'smile', walk: sl < 1 ? T * 10 : undefined, prop: T > t_pr ? (cc, hL) => bag(cc, hL) : null });
    person(c, xb, 1336, .95, { seed: 8, shirt: C.lav, flip: true, ...idle(T, .9), mouth: T > t_sg ? 'grin' : 'smile', walk: sl < 1 ? T * 10 : undefined, armR: T > t_sg + .4 ? [2.6, .2] : [.25, .15] });
    for (const [x, s] of [[xa, 'A'], [xb, 'B']]) { shp(c, blob(x, 860, 46, 46, 6, { n: 28 }), C.paper, { w: 5, lc: C.gold, seed: 6 }); tx(c, s, x, 862, { size: 58 }); }
    const ka = pb(T, t_las), rB = 70 + 60 * pr(T, t_sg + .2, 4.5, easeIO);
    if (ka > 0) { c.save(); c.translate(xa + 170, 1336 - 70 * ka); c.scale(ka, ka); snowball(c, 0, 0, 70, L * .2, { label: '10.000', ls: 26 }); c.restore();
      c.save(); c.translate(xb - 170 - (rB - 70) * .3, 1336 - rB * ka); c.scale(ka, ka); snowball(c, 0, 0, rB, -L * .2, { label: rB > 100 ? 'crece…' : '10.000', ls: 26 }); c.restore(); tag(c, '8 % anual', 540, 1060, { sc: ka, size: 34 }); }
    // monedas: A salen de la bola hacia la bolsa; B entran a la bola
    for (let k = 0; k < 6; k++) { const t = t_pr + .3 + k * .75; if (T > t && T < t + .7) { const u = (T - t) / .7; coin(c, lerp(xa + 170, xa + 60, u), lerp(1250, 1240, u) - Math.sin(u * Math.PI) * 160, 24, { seed: k, spin: u * 8 }); }
      const t2 = t_sg + .3 + k * .75; if (T > t2 && T < t2 + .7) { const u = (T - t2) / .7; coin(c, lerp(xb - 60, xb - 170, u), lerp(1060, 1300 - rB, u) - Math.sin(u * Math.PI) * 140, 24, { seed: k + 9, spin: u * 8 }); } }
    tx(c, 'se gasta las ganancias', 280, 1470, { size: 50, f: 'hand', col: C.red, sh: C.ink, so: 2, clipP: pr(T, t_pr, .7, easeIO) });
    tx(c, 'las reinvierte', 800, 1470, { size: 56, f: 'hand', col: C.gold, sh: C.ink, so: 2, clipP: pr(T, t_sg, .6, easeIO) });
  });
}
// 7 · 30 años después: US$34.000 contra US$100.627
{ const t_30 = A('Treinta años después'), t_34 = A('treinta y cuatro mil dólares,'), t_sg = A('La segunda tiene'), t_100 = A('más de cien mil.', t_sg), t_mi = A('Mismo dinero'), t_df = A('La diferencia fue');
  sfx(t_30, 'whoosh'); hit(t_30 + .6, 8); hit(t_34 + .2, 7, 'ping'); hit(t_100 + .1, 16); hit(t_mi + .1, 5, 'ping'); hit(t_df + .4, 12, 'stamp');
  const k$ = 660 / 100627, base = 1330;
  scene(6, 'drop', (c, T, L) => {
    paper(c); camS(c, T, 540, 950, key(T, [[0, 1.0], [t_100, 1.0], [t_100 + .3, 1.06], [t_df, 1.06], [t_df + .4, 1.0]]) + .012 * Math.sin(L * .9));
    // hojas de calendario volando
    for (let k = 0; k < 8; k++) { const t = t_30 + k * .08; if (T > t && T < t + 1.2) { const u = (T - t) / 1.2; c.save(); c.translate(540 + (k - 4) * 60 + u * (k % 2 ? 500 : -500), 520 - u * 600 + u * u * 300); c.rotate(u * (k % 2 ? 4 : -4)); shp(c, R4(-60, -55, 120, 110), C.paper, { sharp: true, w: 4, seed: 190 + k }); c.restore(); } }
    tx(c, '+30 AÑOS', 540, 260, { size: 120, col: C.gold, sh: C.ink, sc: pb(T, t_30 + .2) });
    ln(c, [[80, base], [1000, base]], { w: 7, seed: 200 });
    const ga = pr(T, t_34 - .4, .9, easeOutBack), gb = pr(T, t_sg, 1.4, easeOutBack);
    const hA1 = 10000 * k$ * ga, hA2 = 24000 * k$ * ga, hB1 = 10000 * k$ * gb, hB2 = 90627 * k$ * gb;
    if (ga > 0) { shp(c, R4(220, base - hA1, 200, hA1), C.ink, { sharp: true, w: 5, seed: 201 }); shp(c, R4(220, base - hA1 - hA2, 200, hA2), '#F2C9BC', { sharp: true, w: 5, seed: 202, hatch: C.red, hal: .5 });
      tx(c, 'gastado', 320, base - hA1 - hA2 / 2, { size: 38, f: 'hand', col: C.red, sh: null, al: ga }); }
    if (gb > 0) { shp(c, R4(660, base - hB1, 200, hB1), C.ink, { sharp: true, w: 5, seed: 203 }); shp(c, R4(660, base - hB1 - hB2, 200, hB2), '#F1DDAA', { sharp: true, w: 5, seed: 204, hatch: C.goldD, hal: .5 });
      tx(c, 'reinvertido', 760, base - hB1 - hB2 / 2, { size: 40, f: 'hand', col: C.goldD, sh: null, al: gb }); }
    tx(c, 'US$34.000', 320, base - 234 - 60, { size: 62, sc: pb(T, t_34) }); tx(c, '10.000 + 24.000', 320, base - 234 - 115, { size: 34, f: 'ui', al: pr(T, t_34 + .5, .3) });
    tx(c, 'US$100.627', 760, base - 660 - 60, { size: 74, col: C.gold, sh: C.ink, sc: pb(T, t_100) }); burst(c, 760, base - 700, T, t_100, { R: 260 });
    for (const [x, s] of [[320, 'A'], [760, 'B']]) { shp(c, blob(x, base + 70, 40, 40, 7, { n: 26 }), C.paper, { w: 5, lc: C.gold, seed: 7 }); tx(c, s, x, base + 72, { size: 50 }); }
    tag(c, 'MISMO DINERO · MISMA TASA', 540, 1500, { sc: pb(T, t_mi), size: 36, bg: C.lav });
    stamp(c, 'REINVERTIR', 760, 830, T, t_df + .3, { size: 76, rot: .08 });
  });
}
// 8 · La curva: casi no se nota al principio
{ const t_o = A('Y ojo'), t_no = A('casi no se nota.'), t_10 = A('A los diez años'), t_21 = A('veintiún mil seiscientos.'), t_20 = A('A los veinte, unos', SE[7].t0 - .5), t_46 = A('cuarenta y seis mil seiscientos.'), t_30 = A('Y a los treinta'), t_cm = A('más de cien mil.', t_30), t_mt = A('Más de la mitad del crecimiento');
  hit(t_21 + .1, 6, 'ping'); hit(t_46 + .1, 8, 'ping'); hit(t_cm + .1, 14); hit(t_mt + .3, 12, 'stamp');
  const X = y => 170 + y / 30 * 800, Y = v => 1330 - v * 640 / 100627, V = y => 10000 * Math.pow(1.08, y);
  const yr = T => key(T, [[t_o, 0], [t_10 - .2, 4], [t_21, 10], [t_20, 10], [t_46, 20], [t_30, 20], [t_cm + .3, 30]], easeInOutSine);
  scene(7, 'whip', (c, T, L) => {
    paper(c); const y = yr(T), z = key(T, [[0, 1.45], [t_10, 1.45], [t_21 + .5, 1.2], [t_46 + .5, 1.05], [t_cm + .5, 1.0]]);
    camS(c, T, key(T, [[0, 400], [t_10, 400], [t_21 + .5, 470], [t_cm + .5, 560]]), key(T, [[0, 1180], [t_10, 1180], [t_21 + .5, 1080], [t_cm + .5, 960]]), z);
    ln(c, [[170, 600], [170, 1330], [1000, 1330]], { w: 6, seed: 210, p: pr(T, SE[7].t0 - .3, .6), straight: true });
    for (const yy of [0, 10, 20, 30]) tx(c, String(yy), X(yy), 1380, { size: 40, f: 'ui' }); tx(c, 'AÑOS', 900, 1440, { size: 30, f: 'ui', al: .7 });
    if (T > t_mt) { const pts = []; for (let q = 20; q <= 30; q += .5) pts.push([X(q), Y(V(q))]); shp(c, pts.concat([[X(30), 1330], [X(20), 1330]]), null, { line: false, sharp: true, wash: C.gold, wal: .7 * pr(T, t_mt, .5) }); }
    const pts = []; for (let q = 0; q <= y + 1e-6; q += .25) pts.push([X(q), Y(V(Math.min(q, y)))]); if (pts.length > 1) ln(c, pts, { w: 9, col: C.vio, seed: 211 });
    const r = 16 + 46 * (V(y) - 10000) / 90627; snowball(c, X(y), Y(V(y)) - r, r, y * 1.4);
    for (const [yy, lab, t, col] of [[10, 'US$21.589', t_21, C.ink], [20, 'US$46.610', t_46, C.ink], [30, 'US$100.627', t_cm, C.gold]]) { const k = pb(T, t); if (k > 0) { c.save(); c.translate(X(yy) - (yy === 30 ? 120 : 0), Y(V(yy)) - 110 - (yy === 30 ? 40 : 0)); c.scale(k, k); tx(c, lab, 0, 0, { size: yy === 30 ? 64 : 52, col, sh: col === C.gold ? C.ink : C.gold }); c.restore(); burst(c, X(yy), Y(V(yy)), T, t, { R: 140 }); } }
    if (T > t_no && T < t_10 + 4) { const k = pb(T, t_no); c.save(); c.translate(330, 1240); c.scale(k, k); ln(c, blob(0, 0, 90, 90, 4, { n: 30 }), { w: 8, close: true, seed: 212 }); ln(c, [[64, 64], [140, 140]], { w: 16, seed: 213 }); c.restore(); tx(c, 'casi no se nota', 360, 1080, { size: 50, f: 'hand', al: k }); }
    if (T > t_mt) { const xb = X(30) + 40; ln(c, [[xb, Y(V(20))], [xb + 24, Y(V(20))], [xb + 24, Y(V(30))], [xb, Y(V(30))]], { w: 6, col: C.red, p: pr(T, t_mt, .5), seed: 214 });
      tx(c, '+US$54.017', X(25), 760, { size: 56, col: C.red, sh: C.ink, so: 2, sc: pb(T, t_mt + .2) }); tx(c, 'en los últimos 10 años', X(25), 815, { size: 40, f: 'hand', al: pr(T, t_mt + .4, .3) }); }
    stamp(c, 'MÁS DE LA MITAD', 430, 760, T, t_mt + .3, { size: 60 });
    resetT(c); tag(c, 'EJEMPLO HIPOTÉTICO · US$10.000 AL 8 % ANUAL', 540, 210, { size: 28 });
  });
}
// 9 · La meta: US$1.000.000 a los 65
{ const t_a = A('Ahora sí, la meta'), t_mm = A('un millón de dólares', t_a), t_65 = A('sesenta y cinco años,', t_a), t_hi = A('anual hipotético.'), t_cu = A('¿Cuánto tendrías');
  hit(t_mm + .1, 12, 'stamp'); hit(t_65 + .1, 6, 'ping'); hit(t_cu + .1, 8, 'ping');
  scene(8, 'iris', (c, T, L) => {
    paper(c); const cy = key(T, [[0, 1220], [t_mm - .3, 1220], [t_mm + .3, 780], [t_cu - .2, 780], [t_cu + .4, 960]], easeInOutQuint), z = key(T, [[0, 1.25], [t_mm - .3, 1.25], [t_mm + .3, 1.15], [t_cu - .2, 1.15], [t_cu + .4, 1.0]]);
    camS(c, T, 540, cy, z);
    shp(c, [[540, 640], [700, 820], [800, 900], [1080, 1380], [0, 1380], [260, 900], [380, 820]], '#DCD6EA', { w: 7, seed: 220, hatch: C.vio, hal: .25 });
    shp(c, [[540, 640], [620, 730], [580, 720], [540, 760], [490, 720], [460, 730]], '#FFFFFF', { w: 5, seed: 221 });
    ln(c, [[540, 645], [540, 470]], { w: 7, seed: 222 }); const fl = pb(T, t_mm); if (fl > 0) { c.save(); c.translate(540, 470); c.scale(fl, fl); const wv = Math.sin(T * 5) * 8; shp(c, [[0, 0], [330, wv], [320, 110 + wv], [0, 100]], C.gold, { w: 6, seed: 223 }); tx(c, 'US$1.000.000', 160, 52, { size: 54, sh: null }); c.restore(); }
    burst(c, 700, 520, T, t_mm, { R: 260 });
    tag(c, '65 AÑOS', 540, 860, { sc: pb(T, t_65), size: 44, bg: C.paper });
    for (let k = 0; k < 5; k++) person(c, 170 + k * 185, 1460, .62, { seed: 10 + k, old: k >= 3, shirt: [C.lav, '#E8A87C', '#7FC8B0', '#E8C98A', '#9BB0E8'][k], ...idle(T, k), mouth: T > t_cu ? 'o' : 'smile', armR: k === 2 && T > t_cu ? [2.8, 1.2] : [.25, .15], look: 0 });
    ln(c, [[0, 1462], [1080, 1462]], { w: 6, seed: 224 });
    resetT(c); tag(c, 'EJEMPLO HIPOTÉTICO · 8 % ANUAL', 540, 200, { size: 30, sc: pb(T, t_hi) });
    tx(c, '¿CUÁNTO CADA MES?', 540, 330, { size: 96, f: 'hand', clipP: pr(T, t_cu, .7, easeIO) });
  });
}
// 10 · La tabla: aporte mensual según la edad
{ const R = [['20', '189,59', 189.59, 'Si empiezas a los veinte', 'ciento noventa dólares.'], ['25', '286,45', 286.45, 'A los veinticinco', 'doscientos ochenta y seis.'], ['30', '435,94', 435.94, 'A los treinta:', 'cuatrocientos treinta y seis.'],
    ['40', '1.051,50', 1051.5, 'A los cuarenta:', 'mil cincuenta.'], ['50', '2.889,85', 2889.85, 'Y a los cincuenta:', 'dos mil ochocientos noventa.']].map(r => ({ age: r[0], lab: 'US$' + r[1], v: r[2], ta: A(r[3], SE[9].t0), tv: A(r[4], A(r[3], SE[9].t0)) }));
  R.forEach((r, k) => { sfx(r.ta, 'ping'); hit(r.tv + .1, 4 + k * 3, k === 4 ? 'impact' : 'stamp'); });
  scene(9, 'wipe', (c, T, L) => {
    paper(c); const act = R.filter(r => T > r.ta).length; camS(c, T, 540, 900 + act * 22 + Math.sin(L * .7) * 6, 1.0 + .01 * act);
    tx(c, 'Para US$1.000.000 a los 65', 540, 270, { size: 64, f: 'hand' }); tx(c, 'aporte mensual · 8 % anual hipotético', 540, 345, { size: 32, f: 'ui', al: .8 });
    R.forEach((r, k) => { const y = 520 + k * 190, kb = pb(T, r.ta); if (kb <= 0) return;
      c.save(); c.translate(110, y); c.scale(kb, kb); shp(c, blob(0, 0, 62, 62, 9 + k, { n: 30 }), C.paper, { w: 6, lc: C.gold, seed: 9 + k }); tx(c, r.age, 0, -6, { size: 54 }); tx(c, 'AÑOS', 0, 32, { size: 18, f: 'ui' }); c.restore();
      const g = pr(T, r.tv, .7, easeOutBack), len = Math.max(46, 640 * r.v / 2889.85) * g; if (len > 1) shp(c, R4(200, y - 44, len, 88), '#F1DDAA', { sharp: true, w: 5, seed: 230 + k, hatch: C.goldD, hal: .45 });
      const inside = k === 4, w = tw(c, r.lab, 0, 0, { size: 54 }); if (g > 0) tx(c, r.lab, inside ? 200 + len - 24 : 200 + len + 22, y + 2, { size: 54, align: inside ? 'right' : 'left', col: inside ? C.ink : C.ink, sc: pb(T, r.tv + .2), sh: inside ? C.paper : C.gold });
      burst(c, 200 + len, y, T, r.tv + .2, { R: 90 + k * 20 }); });
    if (T > R[4].tv + .3) { person(c, 975, 1440, .5, { seed: 14, old: true, shirt: '#9BB0E8', mouth: 'o', sweat: T, brow: 1, ...idle(T) }); }
    resetT(c); tag(c, 'EJEMPLO HIPOTÉTICO', 540, 1450, { size: 28 });
  });
}
// 11 · ¿Quién pone el millón?
{ const t_f = A('Fíjate en esto.'), t_q2 = A('Quien empieza a los veinte'), t_b1 = A('ciento dos mil dólares.'), t_ot = A('Los otros'), t_ic = A('los pone el interés compuesto.'), t_q5 = A('Quien empieza a los cincuenta'), t_b5 = A('quinientos veinte mil.'), t_mi = A('Más de la mitad del millón.');
  hit(t_b1 + .1, 6, 'stamp'); hit(t_ot + .2, 12); sfx(t_ic, 'ping'); hit(t_b5 + .1, 12); hit(t_mi + .3, 10, 'stamp');
  const base = 1340, H1 = 800 / 1e6;
  scene(10, 'blot', (c, T, L) => {
    paper(c); camS(c, T, key(T, [[0, 540], [t_q5 - .2, 470], [t_q5 + .4, 610], [t_mi + .6, 540]]), 940, 1.02 + .015 * Math.sin(L));
    tx(c, '¿Quién pone el millón?', 540, 230, { size: 80, f: 'hand', clipP: pr(T, t_f, .7, easeIO) });
    const col = (x, own, inte, tOwn, tInt, head) => { const go = pr(T, tOwn, .7, easeOutBack), gi = pr(T, tInt, 1.0, easeOutBack), h1 = own * H1 * go, h2 = inte * H1 * gi;
      tx(c, head, x, 440, { size: 38, f: 'ui', al: pr(T, tOwn - .6, .3) });
      if (h1 > 1) { shp(c, R4(x - 140, base - h1, 280, h1), C.ink, { sharp: true, w: 5, seed: 240 + x % 9 }); if (go > .8) { tx(c, 'tu bolsillo', x, base - h1 / 2 - 20, { size: 34, f: 'hand', col: C.paper, sh: null }); tx(c, 'US$' + own.toLocaleString('es-CO'), x, base - h1 / 2 + 22, { size: 34, f: 'ui', col: C.paper }); } }
      if (h2 > 1) { shp(c, R4(x - 140, base - h1 - h2, 280, h2), '#F1DDAA', { sharp: true, w: 5, seed: 250 + x % 9, hatch: C.goldD, hal: .45 }); if (gi > .8) { tx(c, 'interés compuesto', x, base - h1 - h2 / 2 - 22, { size: 38, f: 'hand', col: C.ink, sh: null }); tx(c, 'US$' + inte.toLocaleString('es-CO'), x, base - h1 - h2 / 2 + 22, { size: 36, f: 'ui' }); } } };
    col(300, 102379, 897621, t_b1 - .2, t_ot, 'EMPIEZA A LOS 20'); col(780, 520174, 479826, t_b5 - .3, t_b5 + .9, 'EMPIEZA A LOS 50');
    ln(c, [[80, base], [1000, base]], { w: 7, seed: 260 });
    tx(c, '≈ 90 %', 300, 600, { size: 60, col: C.gold, sh: C.ink, sc: pb(T, t_ic) }); burst(c, 300, 700, T, t_ot + .3, { R: 260 });
    stamp(c, 'MÁS DE LA MITAD', 780, base - 70, T, t_mi + .2, { size: 44, rot: .05, col: C.red });
    tx(c, 'Cifras redondeadas · supuestos hipotéticos', 540, 1430, { size: 26, f: 'ui', al: .7 });
  });
}
// 12 · El ingrediente: el tiempo
{ const t_i = A('El ingrediente'), t_cp = A('cuánto pones.'), t_ct = A('cuánto tiempo'), t_rb = A('dejas rodar la bola.');
  hit(t_cp + .3, 6); hit(t_ct + .3, 12); hit(t_rb + .4, 12); sfx(t_rb, 'whoosh');
  scene(11, 'whip', (c, T, L) => {
    paper(c); camS(c, T, 540, 920, 1.0 + .02 * Math.sin(L * 1.3));
    tx(c, 'El ingrediente más poderoso', 540, 260, { size: 70, f: 'hand', clipP: pr(T, t_i, .8, easeIO) });
    const tilt = key(T, [[0, 0], [t_cp, 0], [t_cp + .4, .1], [t_ct, .1], [t_ct + .5, -.24]]) + settle(T, t_ct + .5, { amp: .05, freq: 2, decay: 3 });
    ln(c, [[540, 1360], [540, 820]], { w: 9, seed: 270 }); shp(c, [[440, 1370], [640, 1370], [600, 1330], [480, 1330]], C.ink, { w: 5, seed: 271 });
    c.save(); c.translate(540, 820); c.rotate(tilt); ln(c, [[-360, 0], [360, 0]], { w: 10, seed: 272 });
    for (const [sx, lab, fn] of [[-330, 'CUÁNTO PONES', cc => { for (let k = 0; k < 5; k++) coin(cc, -40 + (k % 3) * 40, 120 - Math.floor(k / 3) * 34, 30, { seed: k }); }],
                                 [330, 'CUÁNTO TIEMPO', cc => { shp(cc, [[-50, 30], [50, 30], [8, 100], [50, 170], [-50, 170], [-8, 100]], '#FFFFFF', { w: 5, seed: 273 });
                                   const sa = cl01((T - t_ct) / 6); shp(cc, [[-40 + 30 * sa, 40 + 50 * sa], [40 - 30 * sa, 40 + 50 * sa], [6, 96], [-6, 96]], C.gold, { w: 2, seed: 274 }); shp(cc, [[-48 + 0, 168], [48, 168], [30 - 30 * (1 - sa), 168 - 50 * sa], [-30 + 30 * (1 - sa), 168 - 50 * sa]], C.gold, { w: 2, seed: 275 }); }]]) {
      c.save(); c.translate(sx, 0); c.rotate(-tilt); ln(c, [[-80, 150], [0, 0], [80, 150]], { w: 4, seed: 276 + sx }); ln(c, [[-110, 160], [-60, 190], [60, 190], [110, 160]], { w: 7, seed: 277 + sx }); fn(c); tx(c, lab, 0, 250, { size: 34, f: 'ui' }); c.restore(); }
    c.restore();
    
    if (T > t_rb) { const u = pr(T, t_rb, 1.6, easeIn), x = lerp(-250, 1400, u); snowball(c, x, 1440, 170, x / 170); speedLines(c, x - 200, 1440, Math.PI, 5 + (BOIL % 5), 8, .6); }
  });
}
// 13 · Cierre en noche: preguntas, supuestos y aviso
{ const t_pg = A('Entonces pregúntate'), t_cu = A('¿cuándo empieza'), t_re = A('¿Y estás reinvirtiendo'), t_rc = A('Recuerda que'), t_mc = A('los mercados no rinden'), t_im = A('y aquí no contamos'), t_end = DD.words[DD.words.length - 1][2];
  hit(t_cu + .2, 8, 'stamp'); hit(t_re + .2, 8, 'stamp'); sfx(t_rc, 'whoosh'); sfx(t_mc + .3, 'ping'); sfx(t_im + .3, 'ping'); hit(t_end + .25, 6, 'ping');
  scene(12, 'iris', (c, T, L) => {
    night(c, C.navy, 7); camS(c, T, 540, 960, 1.0 + .015 * Math.sin(L * .8));
    for (let k = 0; k < 18; k++) { const x = (k * 197) % 1040 + 20, y = (k * 113) % 600 + 60, tw2 = .4 + .6 * Math.abs(Math.sin(T * 2 + k)); c.save(); c.globalAlpha = tw2; c.fillStyle = C.gold; c.beginPath(); c.arc(x, y, 3, 0, TAU); c.fill(); c.restore(); }
    const hp = [[0, 1000], [300, 930], [620, 960], [1080, 1120]]; shp(c, hp.concat([[1080, 1960], [0, 1960]]), '#1B2140', { line: false }); ln(c, hp, { w: 6, seed: 280 });
    const push = cl01((T - SE[12].t0) / 12), bx = 240 + push * 340, by = 930 + push * 30;
    snowball(c, bx + 90, by - 80, 70 + push * 20, push * 5); person(c, bx - 30, by + 6, .7, { seed: 2, shirt: C.lav, walk: T * 5, lean: .28, armR: [1.45, .05], armL: [1.35, .1], mouth: 'smile' });
    tx(c, '¿Cuándo empieza a rodar', 540, 250, { size: 72, f: 'hand', clipP: pr(T, t_cu, .6, easeIO) }); tx(c, 'la tuya?', 540, 335, { size: 72, f: 'hand', col: C.gold, sh: null, clipP: pr(T, t_cu + .5, .4, easeIO) });
    tx(c, '¿Estás reinvirtiendo?', 540, 470, { size: 72, f: 'hand', clipP: pr(T, t_re, .6, easeIO) }); ul(c, 220, 860, 520, pr(T, t_re + .6, .4));
    const kc = pr(T, t_rc, .6, easeOutBack); if (kc > 0) { c.save(); c.translate(540, lerp(1700, 1160, kc)); c.rotate(-.015); INKC = C.ink;
      shp(c, R4(-440, -150, 880, 300), C.paper, { sharp: true, w: 6, seed: 281 }); tx(c, 'EJEMPLO HIPOTÉTICO', 0, -100, { size: 40, col: C.red, sh: null });
      tx(c, '8 % anual fijo · aporte al final de cada mes · hasta los 65', 0, -30, { size: 28, f: 'ui', max: 820 });
      tx(c, 'Sin impuestos, comisiones ni inflación.', 0, 25, { size: 30, f: 'ui', al: pr(T, t_im, .4) }); tx(c, 'Los mercados no rinden un 8 % fijo.', 0, 80, { size: 30, f: 'ui', al: pr(T, t_mc, .4) });
      c.restore(); INKC = C.chalk; }
    const ke = pr(T, t_end + .2, .6); if (ke > 0) { tx(c, 'Contenido educativo. No es una recomendación de inversión.', 540, 1400, { size: 30, f: 'ui', col: C.chalk, al: ke, max: 980 }); tx(c, 'TITÁN HOLDING', 540, 1470, { size: 50, col: C.gold, sh: null, al: ke, sc: .9 + .1 * ke }); }
  }, true);
}

// ================= subtítulos (3 palabras, cifras en pantalla) =================
const SUB = (() => { const d = DD.display, G = []; let g = [];
  for (const w of d) { g.push(w); if (g.length === 3 || /[.?!:]$/.test(w[0])) { G.push(g); g = []; } } if (g.length) G.push(g);
  return G.map((g, k) => ({ g, a: g[0][1], b: k + 1 < G.length ? Math.min(G[k + 1][0][1], g[g.length - 1][2] + .6) : g[g.length - 1][2] + .6 })); })();
function subs(c, T) { const s = SUB.find(s => T >= s.a && T < s.b); if (!s) return; resetT(c);
  const size = 56, txt = s.g.map(w => w[0]).join(' '); c.save(); c.font = `800 ${size}px ${FF.ui}`; let wd = c.measureText(txt).width; const k = Math.min(1, 940 / (wd + 70)); c.restore();
  const y = 1665, sc = (.92 + .08 * pb(T, s.a, .18)) * k, rot = (SUB.indexOf(s) % 2 ? .012 : -.012);
  c.save(); c.translate(540, y); c.rotate(rot); c.scale(sc, sc); const w = wd + 70, h = 92; INKC = C.ink;
  shp(c, R4(-w / 2, -h / 2, w, h), C.paper, { sharp: true, w: 5, seed: 300 + SUB.indexOf(s) % 3 });
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
  else if (tr === 'drop') { blit(c, LA); const y = -H * (1 - easeOutBack(u, 1.2)); c.drawImage(LB, 0, y, W, H); ln(c, [[0, y + H], [W, y + H]], { w: 14, col: C.ink, seed: 3 }); }
  else blit(c, LB); }
function frame(c, tau) {
  const T = Math.min(DUR - 1e-3, tau / TS); let k = SC.findIndex(s => T >= s.t0 && T < s.t1); if (k < 0) k = SC.length - 1; const s = SC[k], tl = T - s.t0;
  if (k > 0 && tl < TRD && s.tr) { if (!LA) { LA = layer(); LB = layer(); } drawScene(LA.getContext('2d'), SC[k - 1], T); drawScene(LB.getContext('2d'), s, T); compose(c, s.tr, tl / TRD); }
  else drawScene(c, s, T);
  resetT(c); INKC = C.ink; tx(c, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', col: SC[k].night ? C.chalk : C.ink, al: .55 }); subs(c, T);
}
window.__EV = EV.sort((a, b) => a[0] - b[0]); window.__SC = SC.map(s => ({ id: s.id, t0: +s.t0.toFixed(3), t1: +s.t1.toFixed(3), tr: s.tr }));
const fonts = [['Caveat', 'caveat-700.woff2', 700], ['Bricolage', 'bricolage-800.woff2', 800], ['Jakarta', 'jakarta-800.woff2', 800]];
Promise.all(fonts.map(([n, f, w]) => new FontFace(n, `url(${f})`, { weight: String(w) }).load().then(ff => document.fonts.add(ff)))).then(() =>
  defineFilm({ palette: PALT, format: { ar: '9:16', width: 1080 }, fps: 24, timeline: [{ name: 'interes-compuesto', dur: DUR * TS, fn: frame }] }));
// portada: escena 1 justo después de «dos mil novecientos», sin subtítulos, con franja de título
window.__cover = () => { const T = Math.min(A('¿Por qué la diferencia') - .1, A('dos mil novecientos.') + 1.5); COVER = true; drawScene(ctx, SC[0], T); COVER = false; resetT(ctx); INKC = C.ink;
  shp(ctx, R4(30, 1470, 1020, 330), C.navy, { sharp: true, w: 7, lc: C.gold, seed: 400 });
  tx(ctx, 'INTERÉS COMPUESTO', 540, 1575, { size: 96, col: C.gold, sh: null, max: 960 }); tx(ctx, '¿Por qué uno paga 15 veces menos al mes?', 540, 1700, { size: 58, f: 'hand', col: C.chalk, sh: null, max: 960 });
  tx(ctx, 'TITÁN HOLDING', 540, 70, { size: 24, f: 'ui', al: .55 }); return cv.toDataURL('image/png'); };
