// TITÁN · piezas de «escenas de cerca» (reflexión, opción A): rostro grande pintado a mano, luz dirigida, lluvia, amanecer y grano.
// Personas genéricas; paleta TITÁN (navy, dorado, lavanda, violeta). Se carga después de hd_lib.js.
'use strict';
const SKIN = { base: '#C99674', light: '#F1C7A5', shade: '#7A4E3A' }, HAIR = '#1E1A2E';
function lin(c, x0, y0, x1, y1, stops) { const g = c.createLinearGradient(x0, y0, x1, y1); stops.forEach(([o, col]) => g.addColorStop(o, col)); return g; }
function rad(c, x, y, r0, r1, stops) { const g = c.createRadialGradient(x, y, r0, x, y, r1); stops.forEach(([o, col]) => g.addColorStop(o, col)); return g; }
function filmGrain(c, T, al = .06) { resetT(c); grain(c, rectPath(0, 0, W, H), [0, 0, W, H], 5200, '#ffffff', al, 900 + Math.floor(T * 12) % 6, 1.6); grain(c, rectPath(0, 0, W, H), [0, 0, W, H], 3000, '#000000', al * 1.2, 950 + Math.floor(T * 12) % 6, 1.6); }
function vignette(c, k = .55) { resetT(c); c.save(); c.fillStyle = rad(c, W / 2, H * .48, H * .25, H * .78, [[0, 'rgba(0,0,0,0)'], [1, `rgba(5,6,16,${k})`]]); c.fillRect(0, 0, W, H); c.restore(); }
function rain(c, T, k = 1, seed = 1) { if (k <= 0) return; const r = rng(seed); c.save(); c.strokeStyle = '#B9C4E8'; c.lineCap = 'round';
  for (let i = 0; i < 140; i++) { const x0 = r() * 1300 - 100, sp = 1500 + r() * 900, y = ((r() * 2200 + T * sp) % 2300) - 200, L = 40 + r() * 70; c.globalAlpha = k * (.12 + r() * .25); c.lineWidth = 1.2 + r() * 1.8; c.beginPath(); c.moveTo(x0 + y * .12, y); c.lineTo(x0 + (y + L) * .12, y + L); c.stroke(); } c.restore(); }
// rostro de cerca. o: cx, cy, R, up (0 cabeza abajo… 1 mirando arriba), open (párpados), mood ('sad' | 'tired' | 'hope'), light {x, y, col, k}, tear (0..1), shirt
function closeFace(c, o) {
  const { cx, cy, R } = o, up = o.up ?? .5, open = o.open ?? 1, Lx = o.light?.x ?? cx + R, Ly = o.light?.y ?? cy - R, Lc = o.light?.col ?? '#FFD08A', Lk = o.light?.k ?? .6;
  const dy = (up - .5) * -.34 * R, vs = 1 - Math.abs(up - .5) * .3, eyeY = cy - .02 * R + dy, look = (up - .5) * -.09 * R;
  if (o.long) { const bh = [[cx - .95 * R, cy - .35 * R], [cx - .7 * R, cy - 1.05 * R], [cx, cy - 1.18 * R], [cx + .7 * R, cy - 1.05 * R], [cx + .95 * R, cy - .35 * R], [cx + 1.02 * R, cy + .6 * R], [cx + 1.12 * R, cy + 1.35 * R], [cx + .55 * R, cy + 1.45 * R], [cx - .55 * R, cy + 1.45 * R], [cx - 1.12 * R, cy + 1.35 * R], [cx - 1.02 * R, cy + .6 * R]];
    shp(c, bh, HAIR, { w: 6, lc: C.ink, seed: 1599 }); hatch(c, polyPath(smoothPts(bh, true, 4, 9), true), [cx - 1.2 * R, cy - 1.2 * R, 2.4 * R, 2.8 * R], { angle: 1.45, gap: 8, len: 60, color: '#4A4560', alpha: .5, seed: 1598 }); }
  // hombros y cuello
  const sh = [[cx - 1.45 * R, H + 200], [cx - 1.3 * R, cy + 1.25 * R], [cx - .45 * R, cy + .98 * R], [cx + .45 * R, cy + .98 * R], [cx + 1.3 * R, cy + 1.25 * R], [cx + 1.45 * R, H + 200]];
  shp(c, sh, o.shirt || '#4A3F6A', { w: 6, lc: C.ink, seed: 1601 }); hatch(c, polyPath(sh, true), [cx - 1.5 * R, cy + .9 * R, 3 * R, H], { angle: 1.1, gap: 9, len: 26, color: C.ink, alpha: .25, seed: 1602 });
  const nk = [[cx - .2 * R, cy + .6 * R], [cx + .2 * R, cy + .6 * R], [cx + .26 * R, cy + 1.02 * R], [cx - .26 * R, cy + 1.02 * R]];
  shp(c, nk, SKIN.base, { sharp: true, w: 5, lc: C.ink, seed: 1603 }); c.save(); c.fillStyle = lin(c, 0, cy + .6 * R, 0, cy + 1.02 * R, [[0, 'rgba(40,20,18,.75)'], [1, 'rgba(40,20,18,.2)']]); c.fill(polyPath(nk, true)); c.restore();
  // orejas
  for (const s of [-1, 1]) shp(c, blob(cx + s * .8 * R, eyeY + .12 * R, .12 * R, .2 * R, 1604 + s, { amp: .04, n: 20 }), SKIN.base, { w: 4, lc: C.ink, seed: 1606 + s });
  // cabeza: piel con luz y sombra pintadas
  const hp = blob(cx, cy, .76 * R, R, 1610, { amp: .02, n: 60 }).map(([x, y]) => { const v = (y - cy) / R; return [cx + (x - cx) * (v > 0 ? 1 - .32 * v * v : 1 + .04 * v), y]; }), HP = polyPath(hp, true); c.save(); c.fillStyle = SKIN.base; c.fill(HP); c.clip(HP);
  const ang = Math.atan2(Ly - cy, Lx - cx), lx = cx + Math.cos(ang) * R, ly = cy + Math.sin(ang) * R;
  c.fillStyle = lin(c, lx, ly, cx - Math.cos(ang) * R, cy - Math.sin(ang) * R, [[0, SKIN.light], [.4, SKIN.base], [.85, SKIN.shade], [1, '#3A2220']]); c.fill(HP);
  c.globalCompositeOperation = 'overlay'; c.fillStyle = rad(c, lx, ly, 0, 1.5 * R, [[0, Lc], [1, 'rgba(0,0,0,0)']]); c.globalAlpha = Lk; c.fillRect(cx - R, cy - R * 1.2, 2 * R, 2.4 * R); c.restore();
  hatch(c, HP, [cx - R, cy - R, 2 * R, 2 * R], { angle: ang + 1.7, gap: 8, len: 18, color: '#3A1F1A', alpha: .16, seed: 1611 }); ln(c, hp, { w: 6, close: true, seed: 1612, col: C.ink });
  // cachetes
  c.save(); c.globalAlpha = .28; c.fillStyle = '#D8705F'; for (const s of [-1, 1]) { c.beginPath(); c.ellipse(cx + s * .42 * R, eyeY + .25 * R * vs, .13 * R, .07 * R, 0, 0, TAU); c.fill(); } c.restore();
  // ojos
  for (const s of [-1, 1]) { const ex = cx + s * .32 * R, ew = .17 * R, eh = .085 * R * Math.max(.12, open);
    c.save(); c.beginPath(); c.ellipse(ex, eyeY, ew, eh, 0, 0, TAU); c.fillStyle = '#F4EDE4'; c.fill(); c.clip();
    c.fillStyle = '#3B2418'; c.beginPath(); c.arc(ex + s * .01 * R, eyeY + look, .075 * R, 0, TAU); c.fill(); c.fillStyle = '#0E0A10'; c.beginPath(); c.arc(ex + s * .01 * R, eyeY + look, .035 * R, 0, TAU); c.fill();
    c.fillStyle = '#fff'; c.beginPath(); c.arc(ex + .025 * R, eyeY + look - .025 * R, .016 * R, 0, TAU); c.fill(); c.fillStyle = 'rgba(60,30,30,.35)'; c.fillRect(ex - ew, eyeY - eh, 2 * ew, eh * .45); c.restore();
    const lid = []; for (let i = 0; i <= 12; i++) { const a = Math.PI + i / 12 * Math.PI; lid.push([ex + Math.cos(a) * ew * 1.04, eyeY + Math.sin(a) * eh * 1.05]); } ln(c, lid, { w: 7, seed: 1620 + s, col: C.ink, taper: .4 });
    const crease = lid.map(([x, y]) => [x, y - .045 * R]); ln(c, crease, { w: 2.5, seed: 1622 + s, col: '#5A3326', al: .7 });
    const low = []; for (let i = 0; i <= 10; i++) { const a = i / 10 * Math.PI; low.push([ex + Math.cos(a) * ew * .95, eyeY + Math.sin(a) * eh * 1.05 + (o.mood === 'tired' ? .02 * R : 0)]); } ln(c, low, { w: 2.2, seed: 1624 + s, col: '#5A3326', al: .8 });
    if (o.mood !== 'hope') { const bag = low.map(([x, y]) => [x, y + .05 * R]); ln(c, bag, { w: 2, seed: 1626 + s, col: '#5A3326', al: .45 }); }
    // cejas: tristes (punta interior arriba) o firmes
    const inn = s === -1 ? 1 : -1, by = eyeY - .17 * R, lift = o.mood === 'hope' ? -.01 * R : o.mood === 'sad' ? .06 * R : .03 * R;
    ln(c, [[ex - inn * .17 * R, by + .02 * R], [ex, by - .015 * R], [ex + inn * .15 * R, by - lift]], { w: 11, col: HAIR, seed: 1628 + s, taper: .6 }); }
  // nariz y boca
  ln(c, [[cx + .02 * R, eyeY + .06 * R], [cx + .07 * R, eyeY + .3 * R * vs], [cx + .02 * R, eyeY + .36 * R * vs]], { w: 4, seed: 1630, col: '#5A3326' });
  ln(c, [[cx - .08 * R, eyeY + .37 * R * vs], [cx - .02 * R, eyeY + .39 * R * vs]], { w: 3, seed: 1631, col: '#5A3326' });
  const my = eyeY + .55 * R * vs, curve = o.mood === 'hope' ? .035 * R : o.mood === 'sad' ? -.035 * R : -.01 * R;
  ln(c, [[cx - .16 * R, my - curve], [cx, my + curve * .4], [cx + .16 * R, my - curve]], { w: 6, seed: 1632, col: '#4A2020' }); ln(c, [[cx - .08 * R, my + .06 * R], [cx + .08 * R, my + .06 * R]], { w: 2, seed: 1633, col: '#5A3326', al: .5 });
  // lágrima
  if (o.tear > 0) { const tx0 = cx - .32 * R, ty0 = eyeY + .09 * R, L = .35 * R * o.tear; c.save(); c.globalAlpha = .75; ln(c, [[tx0, ty0], [tx0 - .01 * R, ty0 + L * .5], [tx0 + .01 * R, ty0 + L]], { w: 5, col: '#BFE3F5', seed: 1634 }); c.restore(); }
  // pelo
  const hy = cy - .38 * R + dy * .4, hr = [[cx - .84 * R, cy + .05 * R], [cx - .88 * R, cy - .55 * R], [cx - .55 * R, cy - 1.02 * R], [cx, cy - 1.12 * R], [cx + .6 * R, cy - 1.0 * R], [cx + .88 * R, cy - .5 * R], [cx + .84 * R, cy + .02 * R], [cx + .72 * R, hy - .02 * R],
    [cx + .45 * R, hy - .12 * R], [cx + .2 * R, hy + .02 * R], [cx - .1 * R, hy - .14 * R], [cx - .38 * R, hy - .02 * R], [cx - .62 * R, hy - .1 * R], [cx - .76 * R, hy + .1 * R]];
  if (o.long) for (const s of [-1, 1]) { const lk = [[cx + s * .84 * R, cy - .6 * R], [cx + s * .72 * R, cy - .2 * R], [cx + s * .74 * R, cy + .4 * R], [cx + s * .88 * R, cy + 1.0 * R], [cx + s * 1.04 * R, cy + .6 * R], [cx + s * .98 * R, cy - .2 * R]]; shp(c, lk, HAIR, { w: 5, lc: C.ink, seed: 1645 + s }); }
  shp(c, hr, HAIR, { w: 6, lc: C.ink, seed: 1640 }); hatch(c, polyPath(smoothPts(hr, true, 4, 9), true), [cx - R, cy - 1.2 * R, 2 * R, R], { angle: .4, gap: 7, len: 40, color: '#4A4560', alpha: .5, seed: 1641 });
  c.save(); c.globalCompositeOperation = 'screen'; c.globalAlpha = Lk * .6; ln(c, hr.slice(2, 6), { w: 10, col: Lc, seed: 1642 }); c.restore(); }
// de espaldas (cabeza y hombros) frente a la luz, con borde dorado
function backView(c, o) { const { cx, cy, R } = o;
  const sh = [[cx - 1.6 * R, H + 200], [cx - 1.45 * R, cy + 1.3 * R], [cx - .5 * R, cy + 1.0 * R], [cx + .5 * R, cy + 1.0 * R], [cx + 1.45 * R, cy + 1.3 * R], [cx + 1.6 * R, H + 200]];
  shp(c, sh, o.shirt || '#2A2448', { w: 6, lc: C.ink, seed: 1650 }); shp(c, [[cx - .3 * R, cy + .5 * R], [cx + .3 * R, cy + .5 * R], [cx + .33 * R, cy + 1.05 * R], [cx - .33 * R, cy + 1.05 * R]], '#4A2E26', { sharp: true, w: 5, lc: C.ink, seed: 1651 });
  for (const s of [-1, 1]) shp(c, blob(cx + s * .8 * R, cy + .05 * R, .12 * R, .2 * R, 1652 + s, { n: 20 }), '#6A3E30', { w: 4, lc: C.ink, seed: 1654 + s });
  const hp = blob(cx, cy - .05 * R, .82 * R, 1.0 * R, 1656, { amp: .03, n: 60 }); shp(c, hp, HAIR, { w: 6, lc: C.ink, seed: 1657 });
  hatch(c, polyPath(hp, true), [cx - R, cy - 1.1 * R, 2 * R, 2.2 * R], { angle: 1.4, gap: 7, len: 44, color: '#4A4560', alpha: .5, seed: 1658 });
  c.save(); c.globalCompositeOperation = 'screen'; c.globalAlpha = .9; ln(c, hp.slice(5, 28), { w: 9, col: '#FFC870', seed: 1659 }); ln(c, sh.slice(1, 3), { w: 9, col: '#FFC870', seed: 1660 }); ln(c, sh.slice(3, 5), { w: 9, col: '#FFC870', seed: 1661 }); c.restore(); }
function bigTitle(c, a, b, y, o = {}) { resetT(c); if (a) tx(c, a, 540, y, { size: o.sa || 74, col: o.ca || C.chalk, sh: o.sha ?? '#0D1020', so: 5, max: 1000, clipP: o.pa }); if (b) tx(c, b, 540, y + (o.gap || 105), { size: o.sb || 92, col: o.cb || C.gold, sh: o.shb ?? '#0D1020', so: 6, max: 1000, clipP: o.pb }); }
