// Renderizador de films dibujados a mano (core.js de hand-drawn-canvas-animation) con el Playwright del equipo, en paralelo, a 30 fps.
// Uso: node hd_render.cjs film.html salida.mp4 [--workers 4] [--cover portada.png] [--grid 24 salida.jpg] [--only 0,90,300 carpeta] [--fps 30]
// Exporta además <salida>.events.json con window.__EV (efectos) y window.__SC (escenas) si existen.
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path'), { spawn, execFileSync } = require('child_process');
const a = process.argv.slice(2), html = path.resolve(a[0]), out = path.resolve(a[1] || 'out.mp4');
const opt = (k, d) => { const i = a.indexOf('--' + k); return i < 0 ? d : a[i + 1]; };
const FPS = +opt('fps', 30), NW = +opt('workers', 4);
async function open(br) { const p = await br.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto('file://' + html + '?bare=1'); await p.waitForFunction(() => window.__ready || window.__error, null, { timeout: 120000 });
  const err = await p.evaluate(() => window.__error); if (err || errs.length) throw new Error('página con error: ' + (err || errs.join(' | '))); return p; }
(async () => {
  const br = await chromium.launch(); const p0 = await open(br); const N = await p0.evaluate(() => window.__NDRAW);
  const meta = await p0.evaluate(() => ({ ev: window.__EV || [], sc: window.__SC || [], size: window.__size }));
  const amb = await p0.evaluate(() => window.__AMB || []); if (amb.length) { console.error('ANCLAS AMBIGUAS (usar after): ' + amb.join(' | ')); if (!a.includes('--allow-amb')) process.exit(2); }
  fs.writeFileSync(out.replace(/\.\w+$/, '') + '.events.json', JSON.stringify(meta));
  if (a.includes('--grid')) { const n = +opt('grid', 24); const d = await p0.evaluate(n => window.__grid(n, 270), n); fs.writeFileSync(out, Buffer.from(d.split(',')[1], 'base64')); console.log('grid', out); await br.close(); return; }
  if (a.includes('--cover')) { const d = await p0.evaluate(() => window.__cover()); fs.writeFileSync(out, Buffer.from(d.split(',')[1], 'base64')); console.log('portada', out); await br.close(); return; }
  if (a.includes('--only')) { const ids = opt('only', '0').split(',').map(Number); fs.mkdirSync(out, { recursive: true });
    for (const i of ids) { const d = await p0.evaluate(i => window.__frame(i), Math.min(i, N - 1)); fs.writeFileSync(path.join(out, String(i).padStart(5, '0') + '.png'), Buffer.from(d.split(',')[1], 'base64')); } console.log('cuadros', ids.join(','), '→', out); await br.close(); return; }
  const per = Math.ceil(N / NW), parts = [], t0 = Date.now(); let done = 0;
  await Promise.all(Array.from({ length: NW }, async (_, w) => {
    const a0 = w * per, a1 = Math.min(N, a0 + per); if (a0 >= a1) return; const p = w ? await open(br) : p0, seg = out + `.part${w}.mp4`; parts[w] = seg;
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(FPS), seg], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let i = a0; i < a1; i++) { const d = await p.evaluate(i => window.__frame(i), i); if (!ff.stdin.write(Buffer.from(d.split(',')[1], 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
      if (++done % 300 === 0) console.log(`${done}/${N} cuadros · ${((Date.now() - t0) / 1000).toFixed(0)} s`); }
    ff.stdin.end(); await new Promise((r, j) => ff.on('close', c => c ? j(new Error('ffmpeg ' + c)) : r())); }));
  await br.close(); const lst = out + '.txt'; fs.writeFileSync(lst, parts.filter(Boolean).map(s => `file '${s}'`).join('\n'));
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', out]); parts.forEach(s => s && fs.unlinkSync(s)); fs.unlinkSync(lst);
  console.log('listo', out, N, 'cuadros', ((Date.now() - t0) / 1000).toFixed(0), 's');
})().catch(e => { console.error(e.message || e); process.exit(1); });
