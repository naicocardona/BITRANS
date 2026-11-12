// TITÁN · Reflexión «Punto de partida» · opción A «escenas de cerca» · Short (sh) y TikTok (tk)
// tools/ref2/build.sh une paint.js + este archivo. Primero, 3 imágenes fijas para aprobación (inicio, «levantamos la cabeza», final).
'use strict';
const TK = MODE === 'tk';
const has = id => !!SEC[id];
const AS = (id, ph) => has(id) ? As(id, ph) : null;
const LONG = /long=1/.test(location.search) || window.__LONG === true;   // variante con pelo largo (pendiente de elección de Lady)

// 1 · Inicio: de noche, rostro cansado iluminado por la pantalla con el mercado en rojo
if (has('resultado')) { const t_c = AS('resultado', 'Casi nadie');
  scene('resultado', null, (c, T, L) => {
    resetT(c); c.fillStyle = lin(c, 0, 0, 0, H, [[0, '#0B0D1C'], [1, '#161A33']]); c.fillRect(0, 0, W, H);
    for (let k = 0; k < 9; k++) { const x = 90 + k * 115, h = 60 + (k * 53) % 140, y = 760 + (k % 3) * 40 + Math.sin(T + k) * 6; c.save(); c.globalAlpha = .22; c.fillStyle = k % 3 ? '#D9604F' : '#3FAF7A'; c.fillRect(x, y, 34, h); c.fillRect(x + 15, y - 30, 4, h + 60); c.restore(); }
    camS(c, T, 540, 1000, 1.02 + .02 * (T / 5));
    closeFace(c, { cx: 540, cy: 1200, R: 360, up: .3, open: .55, mood: 'tired', long: LONG, light: { x: 540, y: 2100, col: '#FF6A5A', k: .95 }, shirt: '#2E2A4E' });
    resetT(c); c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = lin(c, 0, 700, 0, 1900, [[0, 'rgba(20,22,48,.55)'], [.5, 'rgba(20,22,48,.15)'], [1, 'rgba(120,30,30,.1)']]); c.fillRect(0, 0, W, H); c.restore();
    resetT(c); glow(c, 540, 1950, 700, '#FF5A4A', .35);
    // pantalla en primer plano, desde atrás
    shp(c, [[180, 1700], [900, 1700], [960, 1990], [120, 1990]], '#10121F', { w: 6, lc: '#000', seed: 1701 }); ln(c, [[200, 1702], [880, 1702]], { w: 6, col: '#FF7A6A', seed: 1702 });
    vignette(c, .6); bigTitle(c, 'TODOS QUIEREN', 'EL RESULTADO', 230, { pa: pr(T, .0, .6, easeIO), pb: pr(T, .3, .6, easeIO) });
    if (t_c !== null && T > t_c) bigTitle(c, null, 'CASI NADIE QUIERE EL PROCESO', 460, { sb: 50, cb: C.chalk, pb: pr(T, t_c, .6, easeIO) });
    filmGrain(c, T);
  }, true); }

// 2 · «Y aun así… levantamos la cabeza»: lluvia, el rostro sube y lo toca la luz dorada
if (has('consecuencias')) { const t_l = AS('consecuencias', 'levantamos la cabeza.'), t_y = AS('consecuencias', 'Y aun así,');
  scene('consecuencias', 'blot', (c, T, L) => {
    const u = pr(T, t_l - .2, 1.6, easeIO);
    resetT(c); c.fillStyle = lin(c, 0, 0, 0, H, [[0, mix('#0D1020', '#2A2350', u)], [1, '#12152A']]); c.fillRect(0, 0, W, H);
    resetT(c); c.save(); c.globalCompositeOperation = 'screen'; c.globalAlpha = .15 + .55 * u; c.fillStyle = lin(c, 1080, 0, 300, 1300, [[0, '#FFD08A'], [1, 'rgba(255,208,138,0)']]); c.beginPath(); c.moveTo(1080, -50); c.lineTo(1250, -50); c.lineTo(650, 1500); c.lineTo(250, 1500); c.closePath(); c.fill(); c.restore();
    rain(c, T, 1 - u * .7, 1711);
    camS(c, T, 540, 1000, 1.03 + .03 * u);
    closeFace(c, { cx: 540, cy: 1150, R: 380, up: lerp(.12, .92, u), open: lerp(.35, 1, u), mood: u > .6 ? 'hope' : 'sad', tear: 1, long: LONG, light: { x: 1000, y: 200, col: '#FFC870', k: .25 + .7 * u }, shirt: '#3B3560' });
    resetT(c); glow(c, 860, 520, 620, '#FFC870', .2 + .5 * u); vignette(c, .55);
    bigTitle(c, t_y !== null ? 'Y AUN ASÍ…' : null, 'LEVANTAMOS LA CABEZA', 240, { sa: 70, sb: 78, pa: t_y !== null ? pr(T, t_y - .2, .5, easeIO) : 1, pb: t_l !== null ? pr(T, t_l - .2, .6, easeIO) : 1 });
    filmGrain(c, T);
  }, true); }

// 3 · Final: de espaldas frente al amanecer — «ES TU PUNTO DE PARTIDA»
if (has('partida')) { const t_p = AS('partida', 'Es tu punto');
  scene('partida', 'iris', (c, T, L) => {
    resetT(c); c.fillStyle = lin(c, 0, 0, 0, H, [[0, '#3A2E66'], [.35, '#B98AC9'], [.6, '#F2B872'], [.75, '#FFE3A8'], [1, '#F6E3B8']]); c.fillRect(0, 0, W, H);
    const sy = 1180 - pr(T, (t_p ?? 0) - 2, 4, easeIO) * 80; glow(c, 540, sy, 900, '#FFD27A', .9);
    shp(c, blob(540, sy, 190, 190, 1721, { n: 50, amp: .01 }), '#FFD98C', { line: false });
    for (const [y, col, sd] of [[1260, '#7E5A9E', 1722], [1340, '#4A3F6A', 1723], [1430, '#2A2448', 1724]]) shp(c, [[-80, y], [180, y - 60], [420, y - 10], [700, y - 80], [1160, y - 20], [1160, H + 50], [-80, H + 50]], col, { line: false, seed: sd });
    // ciudad lejana
    for (let k = 0; k < 14; k++) { const x = 40 + k * 75, h = 60 + (k * 37) % 120; c.save(); c.fillStyle = '#5B4A7E'; c.globalAlpha = .7; c.fillRect(x, 1300 - h, 54, h); c.restore(); }
    camS(c, T, 540, 980, 1.0 + .015 * Math.sin(L * .6));
    backView(c, { cx: 540, cy: 1450, R: 300 });
    resetT(c); vignette(c, .3);
    bigTitle(c, 'ES TU', 'PUNTO DE PARTIDA', 260, { sa: 78, sb: 100, ca: '#1A1638', sha: '#FFE3A8', cb: '#1A1638', shb: '#F2B872', pa: t_p !== null ? pr(T, t_p - .2, .5, easeIO) : 1, pb: t_p !== null ? pr(T, t_p + .2, .6, easeIO) : 1 });
    filmGrain(c, T, .05);
  }, true); }

function cover(c) { drawScene(c, SC[0], 2.6); }
startFilm('reflexion-cerca', cover);
