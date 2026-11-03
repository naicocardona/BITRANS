import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/RoomEnvironment.js";
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = p => 1 - Math.pow(1 - clamp(p), 3);
const easeIO = p => { p = clamp(p); return p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; };
const back = p => { p = clamp(p); const c = 1.7; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); };
const span = (t, a, d) => clamp((t - a) / d);
let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const GOLD = 0xE2B755, IVORY = 0xF4EEDC, VIO = 0x7C3AED, NAVY = 0x13284A, RED = 0xB3261E, GREEN = 0x2E7D4F;
const TT = (k, d = 1e9) => (T[k] === undefined ? d : T[k]);
const QSP = W > H ? 6 : 9; const TR = 0.38;
async function build() {
  await Promise.all(["800 80px Bricolage", "700 40px Jakarta", "800 40px Jakarta"].map(f => document.fonts.load(f)));
  const canvas = document.getElementById("gl");
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.setSize(W, H, false); renderer.setPixelRatio(1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05; renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
  scene.fog = new THREE.Fog(0x0B1B33, 16, 36);
  const camera = new THREE.PerspectiveCamera(W > H ? 35 : 52, W / H, 0.1, 140);
  scene.add(new THREE.HemisphereLight(0xF4EEDC, 0x0B1B33, 0.9));
  const key = new THREE.DirectionalLight(0xFFF1D6, 2.2); scene.add(key); scene.add(key.target);
  const rim = new THREE.DirectionalLight(0x9F7AEA, 1.2); scene.add(rim); scene.add(rim.target);
  const glow = new THREE.PointLight(0xE2B755, 6, 8); scene.add(glow);
  const gold = (e = 0) => new THREE.MeshStandardMaterial({ color: GOLD, metalness: 0.85, roughness: 0.28, emissive: 0x7A5512, emissiveIntensity: e });
  const ivory = () => new THREE.MeshStandardMaterial({ color: IVORY, roughness: 0.55 });
  const solid = (c, m = 0.2, r = 0.45) => new THREE.MeshStandardMaterial({ color: c, metalness: m, roughness: r });
  function tex(w, h, draw) { const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d"); draw(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; }
  function rr(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
  function wrap(x, text, X, Y, maxW, lh) { let line = "", y = Y; for (const w of text.split(" ")) { const tt = line ? line + " " + w : w; if (x.measureText(tt).width > maxW && line) { x.fillText(line, X, y); line = w; y += lh; } else line = tt; } x.fillText(line, X, y); }
  const face = (w, h, t, z) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: t, toneMapped: false, transparent: true })); m.position.z = z; return m; };
  const card = (w, h, t, mat) => { const g = new THREE.Group(); g.add(new THREE.Mesh(new RoundedBoxGeometry(w, h, 0.1, 4, 0.06), mat || ivory())); g.add(face(w * 0.96, h * 0.94, t, 0.052)); return g; };
  const logoTex = await new THREE.TextureLoader().loadAsync("assets/brand/logo.jpg"); logoTex.colorSpace = THREE.SRGBColorSpace;
  // partículas
  const NP = 260, pg = new THREE.BufferGeometry(), pp = new Float32Array(NP * 3), pb = [];
  for (let i = 0; i < NP; i++) pb.push([rnd() * 24 - 12, rnd() * 14 - 5, rnd() * -18 + 4, rnd() * 6.28, 0.2 + rnd() * 0.4]);
  pg.setAttribute("position", new THREE.BufferAttribute(pp, 3));
  scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ color: GOLD, size: 0.05, transparent: true, opacity: 0.5, depthWrite: false })));
  const SETS = {}, SETN = {}; let sz = 0, si = 0; const SP = 20;
  const mk = (n, key, depth) => { const g = new THREE.Group(); g.position.set((si % 2 ? 1 : -1) * 1.5 * (si ? 1 : 0), 0, sz); sz -= depth + SP; si++; scene.add(g); SETS[key] = g; if (!SETN[n]) SETN[n] = g; return g; };
  const anim = [];   // funciones (t) → actualizan cada set
  // ---- piezas ----
  const cardTex = tex(1024, 646, (x, w, h) => { const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, "#8B5CF6"); g.addColorStop(1, "#5B21B6"); x.fillStyle = g; rr(x, 0, 0, w, h, 60); x.fill();
    x.fillStyle = "#E2B755"; rr(x, 90, 230, 150, 115, 18); x.fill(); x.strokeStyle = "rgba(255,255,255,.5)"; x.lineWidth = 8; for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(330, 288, 26 + i * 22, -0.9, 0.9); x.stroke(); }
    x.fillStyle = "rgba(255,255,255,.85)"; x.font = "800 50px Jakarta"; x.fillText("•••• •••• •••• 2026", 90, 470); x.font = "800 30px Jakarta"; x.fillStyle = "rgba(255,255,255,.6)"; x.fillText("ILUSTRACIÓN", 90, 560); });
  const purpleCard = () => { const g = new THREE.Group(); const b = new THREE.Mesh(new RoundedBoxGeometry(3.2, 2.02, 0.05, 4, 0.12), solid(0x6D28D9, 0.3, 0.35)); g.add(b); g.add(face(3.14, 1.98, cardTex, 0.027)); return g; };
  const tickTex = (big, sub, tag) => tex(800, 1060, (x, w, h) => { x.fillStyle = "#F4EEDC"; x.fillRect(0, 0, w, h);
    x.fillStyle = "rgba(11,27,51,.55)"; x.font = "800 40px Jakarta"; x.fillText(tag, 60, 100);
    x.fillStyle = "#7C3AED"; x.font = "800 300px Bricolage"; x.fillText(big, 60, 420); x.fillStyle = "#0B1B33"; x.font = "800 52px Jakarta"; wrap(x, sub, 60, 540, 680, 64);
    x.fillStyle = "rgba(11,27,51,.12)"; for (let i = 0; i < 4; i++) { rr(x, 60, 700 + i * 70, 560 - i * 60, 24, 12); x.fill(); } });
  const ticket = (big = "NU", sub = "Nu Holdings · NYSE", tag = "ACCIÓN") => card(2.4, 3.2, tickTex(big, sub, tag));
  const urna = () => { const g = new THREE.Group();
    const box = new THREE.Mesh(new RoundedBoxGeometry(2.0, 1.8, 1.4, 4, 0.08), new THREE.MeshPhysicalMaterial({ color: 0xDCE7FF, transparent: true, opacity: 0.32, roughness: 0.1, metalness: 0, clearcoat: 1 })); g.add(box);
    const lid = new THREE.Mesh(new RoundedBoxGeometry(2.1, 0.14, 1.5, 3, 0.05), solid(NAVY, 0.4, 0.4)); lid.position.y = 0.97; g.add(lid);
    const slot = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.16, 0.12), new THREE.MeshBasicMaterial({ color: 0x050E1E })); slot.position.y = 1.0; g.add(slot);
    const lab = face(1.6, 0.42, tex(800, 210, (x, w, h) => { x.fillStyle = "#E2B755"; rr(x, 0, 0, w, h, 30); x.fill(); x.fillStyle = "#0B1B33"; x.font = "800 96px Bricolage"; x.textAlign = "center"; x.fillText("ELECCIONES", w / 2, 140); }), 0.72); lab.position.y = 0.05; g.add(lab);
    const ballots = []; for (let i = 0; i < 6; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 0.02), ivory()); g.add(b); ballots.push(b); }
    g.userData.ballots = ballots; return g; };
  const animUrna = (g, t, t0) => g.userData.ballots.forEach((b, i) => { const ph = ((t - t0) / 1.4 + i / 6) % 1, on = t > t0; const p = clamp(ph);
    b.visible = on; b.position.set(0, 2.6 - 1.9 * ease(p), 0); b.rotation.set(0, 0, (1 - p) * 0.6); b.scale.setScalar(p > 0.92 ? Math.max(0.001, (1 - p) / 0.08) : 1); });
  const platform = (r = 2.4) => { const g = new THREE.Group(); const d = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.04, 0.24, 64), solid(0x1B3560, 0.2, 0.5)); g.add(d);
    const rim2 = new THREE.Mesh(new THREE.TorusGeometry(r, 0.03, 8, 96), gold(0.2)); rim2.rotation.x = Math.PI / 2; rim2.position.y = 0.12; g.add(rim2); return g; };
  const pin = (c = VIO, s = 1) => { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.SphereGeometry(0.28 * s, 32, 16), solid(c, 0.3, 0.3)); b.position.y = 0.95 * s; g.add(b);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.2 * s, 0.7 * s, 32), solid(c, 0.3, 0.3)); cone.rotation.x = Math.PI; cone.position.y = 0.45 * s; g.add(cone); return g; };
  const bank = () => { const g = new THREE.Group(); const base = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.2, 1.3), ivory()); base.position.y = 0.1; g.add(base);
    for (let i = 0; i < 5; i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.1, 20), ivory()); c.position.set(-0.8 + i * 0.4, 0.75, 0.45); g.add(c); }
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.1, 0.8), solid(0xE9E1CC, 0, 0.6)); body.position.set(0, 0.75, -0.1); g.add(body);
    const top = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.18, 1.35), ivory()); top.position.y = 1.39; g.add(top);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(1.25, 0.6, 4), solid(VIO, 0.3, 0.4)); roof.rotation.y = Math.PI / 4; roof.scale.z = 0.62; roof.position.y = 1.78; g.add(roof); return g; };
  const pawn = () => { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.75, 32), ivory()); b.position.y = 0.38; g.add(b); const h2 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 16), ivory()); h2.position.y = 0.9; g.add(h2); return g; };
  const coinFace = (txt, bg, fg) => tex(512, 512, (x, w, h) => { x.fillStyle = bg; x.beginPath(); x.arc(256, 256, 256, 0, 7); x.fill(); x.strokeStyle = "rgba(255,255,255,.4)"; x.lineWidth = 14; x.beginPath(); x.arc(256, 256, 220, 0, 7); x.stroke(); x.fillStyle = fg; x.font = "800 170px Bricolage"; x.textAlign = "center"; x.fillText(txt, 256, 316); });
  const bigCoin = (txt, bg, fg, mat) => { const g = new THREE.Group(); const c = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.16, 64), mat); c.rotation.x = Math.PI / 2; g.add(c);
    const f = new THREE.Mesh(new THREE.CircleGeometry(0.86, 64), new THREE.MeshBasicMaterial({ map: coinFace(txt, bg, fg), toneMapped: false })); f.position.z = 0.081; g.add(f); return g; };
  const qTex = (n, q, lab) => tex(1280, 760, (x, w, h) => { x.fillStyle = "#F4EEDC"; x.fillRect(0, 0, w, h); x.fillStyle = "#0B1B33"; x.beginPath(); x.arc(150, 170, 90, 0, 7); x.fill();
    x.fillStyle = "#E2B755"; x.font = "800 110px Bricolage"; x.textAlign = "center"; x.fillText(String(n), 150, 208); x.textAlign = "left";
    x.fillStyle = "rgba(11,27,51,.55)"; x.font = "800 34px Jakarta"; x.fillText(lab, 290, 150); x.fillStyle = "#0B1B33"; x.font = "800 88px Bricolage"; wrap(x, q, 90, 400, 1100, 106); });
  // ---- sets ----
  for (let si2 = 0; si2 < SHOTS.length; si2++) { const S0 = SHOTS[si2]; S0.key = S0.set + "#" + si2;
    const n = S0.set, g = mk(n, S0.key, n === "cards" ? (QLIST.length - 1) * QSP : 0); const anim0 = anim.length;
    if (n === "hook") { const c = purpleCard(); g.add(c); const u = urna(); g.add(u); const VERT = H > W; u.position.set(VERT ? 0.7 : 0, VERT ? -1.9 : -1.6, -0.3);
      anim.push(t => { const p = back(span(t, 0.05, 0.8)); c.position.set(H > W ? -0.5 : 0, (H > W ? 0.7 : 1.5) + 0.1 * Math.sin(t), -6 * (1 - p)); if (H > W) c.scale.setScalar(0.8); c.rotation.set(0.25 - 0.1 * Math.sin(t * 0.6), (1 - p) * 2 + 0.35 * Math.sin(t * 0.5), -0.12);
        const s = span(t, TT("hkShake", 1e9), 0.6), shake = Math.sin(s * 30) * 0.08 * (1 - s); c.position.x += shake;
        const pu = back(span(t, TT("hkUrna"), 0.8)); u.scale.setScalar(Math.max(0.001, pu)); u.rotation.y = -0.4 + 0.2 * Math.sin(t * 0.4); animUrna(u, t, TT("hkUrna") + 0.4); }); }
    if (n === "ticket") { const k = ticket(); g.add(k); const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.9, 32), solid(RED, 0.2, 0.4)); arrow.rotation.z = Math.PI; g.add(arrow);
      const tiles = []; if (TT("others", 0) < 1e8) for (let i = 0; i < 6; i++) { const tl2 = new THREE.Mesh(new RoundedBoxGeometry(0.9, 1.2, 0.08, 3, 0.05), solid(0x2A3F66, 0.2, 0.5)); g.add(tl2); tiles.push(tl2); }
      const chev = []; for (let i = 0; i < 7; i++) { const c = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.3, 4), new THREE.MeshStandardMaterial({ color: RED, emissive: 0x5A1010, emissiveIntensity: 0.6, transparent: true })); c.rotation.z = Math.PI; g.add(c); chev.push(c); }
      anim.push(t => { chev.forEach((c, i) => { const ph = ((t - TT("drop")) / 2.2 + i / 7) % 1, on = t > TT("drop"); c.visible = on; const xx = (i % 2 ? 1 : -1) * (1.6 + (i * 0.37) % 1.2) * (H > W ? 0.9 : 1.4); c.position.set(xx, 3.0 - 6 * ph, -2.2 - (i % 3)); c.material.opacity = Math.sin(Math.PI * ph); c.rotation.y = t * 2; }); });
      anim.push(t => { const p = back(span(t, TT("tkIn"), 0.7)), d = easeIO(span(t, TT("drop"), 0.9)); k.position.set(0, 0.6 - 1.4 * d + 0.06 * Math.sin(t), -5 * (1 - p)); k.rotation.set(-0.08 + 0.35 * d, -0.3 + 0.3 * Math.sin(t * 0.5), -0.18 * d + 0.04 * Math.sin(t * 0.9));
        arrow.position.set(H > W ? 1.25 : 1.75, 1.2 - 1.6 * d + 0.15 * Math.sin(t * 2.4), 0.6); arrow.rotation.y = t * 1.5; arrow.scale.setScalar(Math.max(0.001, span(t, TT("drop") + 0.3, 0.3)));
        tiles.forEach((m, i) => { const o = TT("others") + i * 0.12, q = back(span(t, o, 0.6)), dd = easeIO(span(t, o + 0.4, 0.8)); const a = (i / 6) * Math.PI * 2;
          m.position.set(Math.cos(a) * 3.0, 0.4 + Math.sin(a) * 1.7 - 0.8 * dd, -1.2); m.rotation.set(0.3 * dd, 0, 0.2 * dd); m.scale.setScalar(Math.max(0.001, q)); }); }); }
    if (n === "brasil") { const pl = platform(2.6); pl.position.y = -1.6; g.add(pl); const p = pin(VIO, 1.3); p.position.set(0.6, -1.48, 0.3); g.add(p); g.userData.lab = p; const u = urna(); u.position.set(-1.0, -0.55, -0.4); u.scale.setScalar(0.75); g.add(u);
      const b = bank(); b.position.set(0.9, -1.48, -0.6); b.scale.setScalar(0.8); g.add(b);
      anim.push(t => { const a = back(span(t, TT("brIn"), 0.8)); pl.scale.setScalar(Math.max(0.001, a)); p.position.y = -1.48 + 2.5 * (1 - ease(span(t, TT("brPin"), 0.6))); p.scale.setScalar(Math.max(0.001, span(t, TT("brPin"), 0.2)));
        animUrna(u, t, TT("brIn")); u.visible = t < TT("brBank", 1e9) + 0.3; b.scale.setScalar(0.8 * Math.max(0.001, back(span(t, TT("brBank"), 0.8)))); }); }
    if (n === "bankc") { const pl = platform(2.8); pl.position.y = -1.5; g.add(pl); const b = bank(); b.position.y = -1.38; g.add(b);
      const pw = [], cn = []; for (let i = 0; i < 6; i++) { const m = pawn(); const a = Math.PI * (0.15 + i * 0.14); m.position.set(Math.cos(a) * 2.2, -1.38, Math.sin(a) * 1.3 + 0.6); g.add(m); pw.push(m);
        const c = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.05, 32), gold(0.3)); c.rotation.x = Math.PI / 2; g.add(c); cn.push(c); }
      anim.push(t => { pw.forEach((m, i) => { m.scale.setScalar(Math.max(0.001, back(span(t, TT("bkIn") + 0.3 + i * 0.1, 0.5)))); m.position.y = -1.38 + Math.abs(Math.sin(t * 2.2 + i)) * 0.12; });
        cn.forEach((c, i) => { const loan = span(t, TT("loan") + i * 0.12, 1.0), pay = span(t, TT("pay") + i * 0.12, 1.0); const from = new THREE.Vector3(0, -0.4, 0.6), to = pw[i].position.clone().add(new THREE.Vector3(0, 1.0, 0));
          let p = ease(loan) - ease(pay); c.visible = loan > 0 && (loan < 1 || pay > 0) && pay < 1;
          const L0 = TT("pay") + 1.9; if (t > L0) { const cy = ((t - L0) / 2.6 + i / 6) % 1; p = cy < 0.5 ? ease(cy * 2) : 1 - ease((cy - 0.5) * 2); c.visible = true; }
          else if (loan >= 1 && pay <= 0) c.visible = true;
          c.position.lerpVectors(from, to, clamp(p)); c.position.y += Math.sin(Math.PI * clamp(p)) * 0.9; c.rotation.y = t * 3; }); }); }
    if (n === "cur") { const post = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1.0, 4), gold(0.1)); post.position.y = -1.4; g.add(post);
      const beam = new THREE.Mesh(new RoundedBoxGeometry(4.6, 0.12, 0.3, 2, 0.05), gold(0.1)); beam.position.y = -0.85; g.add(beam);
      const r = bigCoin("R$", "#6D28D9", "#F4EEDC", solid(0x6D28D9, 0.5, 0.3)), u = bigCoin("US$", "#E2B755", "#0B1B33", gold(0.15)); g.add(r); g.add(u);
      const drops = []; for (let i = 0; i < 5; i++) { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.03, 24), solid(0x8B5CF6, 0.5, 0.3)); g.add(m); drops.push(m); }
      anim.push(t => { const tilt = -0.18 * easeIO(span(t, TT("curDrop"), 1.2)); beam.rotation.z = tilt + 0.03 * Math.sin(t * 1.3);
        const ex = 1.75, sr = 1 - 0.22 * easeIO(span(t, TT("curDrop"), 1.2));
        r.position.set(-ex * Math.cos(tilt), -0.85 - ex * Math.sin(tilt) + 0.95 * sr, 0); r.scale.setScalar(Math.max(0.001, back(span(t, TT("curIn"), 0.7)) * sr));
        u.position.set(ex * Math.cos(tilt), -0.85 + ex * Math.sin(tilt) + 0.95, 0); u.scale.setScalar(Math.max(0.001, back(span(t, TT("curIn") + 0.2, 0.7))));
        r.rotation.y = 0.5 * Math.sin(t * 0.9); u.rotation.y = -0.5 * Math.sin(t * 0.9); r.position.y += 0.06 * Math.sin(t * 1.7); u.position.y += 0.06 * Math.sin(t * 1.7 + 1);
        drops.forEach((m, i) => { const ph = ((t - TT("curIn")) / 1.8 + i / 5) % 1; m.visible = t > TT("curIn") + 0.6; m.position.set(-ex + (i - 2) * 0.12, 2.6 - 2.2 * ease(ph), 0.3 - i * 0.1); m.scale.setScalar(Math.max(0.001, 1 - Math.max(0, ph - 0.8) * 5)); m.rotation.set(Math.PI / 2, 0, t * 3 + i); }); }); }
    if (n === "lanes") { const mkLane = (y, c) => { const l = new THREE.Mesh(new RoundedBoxGeometry(H > W ? 4.6 : 6, 0.08, 0.8, 2, 0.03), solid(c, 0.2, 0.5)); l.position.set(0, y, 0); g.add(l); return l; };
      mkLane(0.8, 0x2A3F66); mkLane(-1.0, 0x2A3F66);
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 16), new THREE.MeshStandardMaterial({ color: 0xC4B5FD, emissive: 0x7C3AED, emissiveIntensity: 1.2 })); g.add(orb);
      const blocks = []; for (let i = 0; i < 4; i++) { const b = new THREE.Mesh(new RoundedBoxGeometry(0.9, 0.7, 0.7, 3, 0.06), ivory()); b.position.set((H > W ? -1.65 : -2.3) + i * (H > W ? 1.1 : 1.5), -0.6, 0); if (H > W) b.scale.setScalar(0.8); g.add(b); blocks.push(b); }
      const trail = []; for (let i = 0; i < 6; i++) { const m = new THREE.Mesh(new THREE.SphereGeometry(0.22 - i * 0.03, 24, 12), new THREE.MeshBasicMaterial({ color: 0xC4B5FD, transparent: true, opacity: 0.5 - i * 0.07 })); g.add(m); trail.push(m); }
      const bar = new THREE.Mesh(new RoundedBoxGeometry(1, 0.16, 0.5, 2, 0.05), gold(0.25)); g.add(bar); const LW = H > W ? 4.0 : 5.6, LX = H > W ? -2.0 : -2.8;
      anim.push(t => { const ox = ph => LX + LW * easeIO(((ph % 1) + 1) % 1); const P = (t - TT("exp")) / 1.6; orb.position.set(ox(P), 1.2 + 0.12 * Math.sin(t * 6), 0); orb.scale.setScalar(Math.max(0.001, span(t, TT("exp") - 0.3, 0.3)) * (1 + 0.12 * Math.sin(t * 8)));
        trail.forEach((m, i) => { const q = P - (i + 1) * 0.035; m.visible = t > TT("exp") && (q % 1 + 1) % 1 < ((P % 1) + 1) % 1; m.position.set(ox(q), 1.2, 0); });
        const bp = span(t, TT("exp"), Math.max(2, TT("res") - TT("exp") + 3.6)); bar.scale.set(Math.max(0.001, LW * bp), 1, 1); bar.position.set(LX + LW * bp / 2, -0.88, 0.25); bar.visible = bp > 0;
        blocks.forEach((b, i) => { b.scale.setScalar(Math.max(0.001, back(span(t, TT("res") + i * 0.9, 0.6))) * (H > W ? 0.8 : 1)); b.position.y = -0.4 + 0.06 * Math.sin(t * 1.5 + i); b.rotation.y = 0.25 * Math.sin(t * 0.8 + i); }); }); }
    if (n === "cards") { const L = QLIST; const cs = L.map((q, k) => { const c = card(3.4, 2.0, qTex(k + 1, q, QLAB)); c.position.set((k % 2 ? 1 : -1) * (H > W ? 0.3 : 1.0), 0.3, -k * QSP); if (H > W) c.scale.setScalar(0.82); g.add(c); return c; });
      anim.push(t => cs.forEach((c, k) => { const a = back(span(t, (k ? T.qT[k] - 0.9 : TT("qIn") + 0.2), 0.8)); c.rotation.set(0.04 * Math.sin(t * 0.9 + k), (k % 2 ? -0.22 : 0.22) + (1 - a) * 1.6 + 0.07 * Math.sin(t * 0.6 + k), 0); const fn = H > W ? easeIO(span(t, TT("qAll") + 0.7 + k * 0.12, 1.0)) : 0; const n0 = L.length, ox = (k % 2 ? 1 : -1) * 0.3;
        c.scale.setScalar(Math.max(0.001, a) * (H > W ? 0.82 : 1) * (1 - 0.48 * fn)); c.position.set(ox * (1 - fn), 0.3 + 0.05 * Math.sin(t * 0.7 + k) + fn * (1.02 * ((n0 - 1) / 2 - k)), -k * QSP + fn * (k * QSP - (n0 - 1) * QSP / 2));
        if (fn > 0) c.rotation.y *= (1 - fn); })); }
    if (n === "split") { const a = ticket("A", "Empresa hipotética", "EJEMPLO"), b = ticket("B", "Empresa hipotética", "EJEMPLO"); g.add(a); g.add(b);
      const ok = new THREE.Mesh(new RoundedBoxGeometry(1.6, 0.24, 1.0, 3, 0.06), solid(GREEN, 0.2, 0.4)), bad = new THREE.Mesh(new RoundedBoxGeometry(1.6, 0.24, 1.0, 3, 0.06), solid(RED, 0.2, 0.4)); g.add(ok); g.add(bad);
      anim.push(t => { const d = easeIO(span(t, TT("spDrop"), 0.8)); [a, b].forEach((m, i) => { m.position.set(i ? 1.5 : -1.5, 0.5 - 0.9 * d, 0); m.rotation.set(0.2 * d, (i ? -0.25 : 0.25) + 0.15 * Math.sin(t * 0.7 + i * 2), 0.03 * Math.sin(t * 1.1 + i)); m.scale.setScalar(0.8 * Math.max(0.001, back(span(t, TT("spIn") + i * 0.2, 0.7)))); });
        ok.position.set(-1.5, -1.95, 0); ok.scale.setScalar(Math.max(0.001, back(span(t, TT("sp1"), 0.6)))); bad.position.set(1.5, -1.95, 0); bad.scale.setScalar(Math.max(0.001, back(span(t, TT("sp2"), 0.6)))); }); }
    if (n === "nuvs") { const c = purpleCard(); c.scale.setScalar(0.75); g.add(c); const k = ticket(); k.scale.setScalar(0.62); g.add(k);
      const pl = platform(2.4); pl.position.y = -2.0; g.add(pl); const pins = [pin(VIO, 1.25), pin(GOLD, 0.85), pin(GOLD, 0.85)]; const pp2 = [[-0.6, 0.3], [1.0, -0.5], [0.4, 0.9]]; pins.forEach((p, i) => { p.position.set(pp2[i][0], -1.88, pp2[i][1]); g.add(p); });
      g.userData.pins = pins;
      anim.push(t => { const s = easeIO(span(t, TT("pins"), 1.0)); const pa = back(span(t, TT("nvIn"), 0.7)), pb2 = back(span(t, TT("nvTick"), 0.7));
        c.position.set(-1.5, 0.9 + 2.5 * s, 0); c.rotation.set(0.15, 0.35, -0.08); c.scale.setScalar(0.75 * Math.max(0.001, pa) * (1 - s * 0.999));
        k.position.set(1.5, 0.9 + 2.5 * s, 0); k.rotation.set(0, -0.3, 0); k.scale.setScalar(0.62 * Math.max(0.001, pb2) * (1 - s * 0.999));
        pl.scale.setScalar(Math.max(0.001, s)); pins.forEach((p, i) => { const q = ease(span(t, TT("pins") + 0.6 + i * 0.35, 0.6)); p.position.y = -1.88 + 2.5 * (1 - q); p.scale.setScalar(Math.max(0.001, span(t, TT("pins") + 0.6 + i * 0.35, 0.2))); }); }); }
    if (n === "titan") { const coin = new THREE.Group(); const c = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 0.2, 96), gold(0.1)); c.rotation.x = Math.PI / 2; coin.add(c);
      const f = new THREE.Mesh(new THREE.CircleGeometry(1.22, 96), new THREE.MeshBasicMaterial({ map: logoTex, toneMapped: false })); f.position.z = 0.101; coin.add(f); g.add(coin);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.04, 12, 128), new THREE.MeshStandardMaterial({ color: 0xC4B5FD, emissive: 0x7C3AED, emissiveIntensity: 1 })); g.add(ring);
      const minis = []; for (let i = 0; i < 8; i++) { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.04, 32), i % 2 ? gold(0.3) : solid(VIO, 0.4, 0.3)); g.add(m); minis.push(m); }
      anim.push(t => { const a = back(span(t, TT("ttIn"), 0.9)), cs2 = H > W ? 0.75 : 1; coin.scale.setScalar(Math.max(0.001, a) * cs2); coin.rotation.y = 0.5 * Math.sin(t * 0.6) + (1 - a) * 3; coin.position.y = 0.6 + 0.08 * Math.sin(t);
        ring.position.copy(coin.position); ring.rotation.set(1.2 + 0.1 * Math.sin(t * 0.5), 0.2 * t, 0); ring.scale.setScalar(Math.max(0.001, a) * cs2);
        minis.forEach((m, i) => { const an = t * 0.55 + i * Math.PI / 4, q = back(span(t, TT("ttIn") + 0.4 + i * 0.08, 0.6)); m.position.set(Math.cos(an) * 2.5 * cs2, coin.position.y + Math.sin(an) * 0.9 * cs2 + 0.1 * Math.sin(t * 2 + i), Math.sin(an) * 1.2 - 0.3); m.rotation.set(Math.PI / 2, 0, t * 2 + i); m.scale.setScalar(Math.max(0.001, q) * cs2); }); }); }
    { const S1 = SHOTS[si2 + 1], a0 = S0.t0 - TR - 0.9, a1 = S1 ? S1.t0 + TR + 0.4 : 1e9, sway = ["brasil", "bankc", "nuvs"].includes(n);
      anim.splice(anim0, 0, t => { const vis = t >= a0 && t <= a1; g.visible = vis; if (!vis) return false; const xo = S1 ? span(t, S1.t0 - TR * 1.1, TR * 1.5) : 0; g.scale.setScalar(Math.max(0.001, ease(span(t, a0, 0.7)) * (1 - xo * xo))); if (sway) g.rotation.y = 0.22 * Math.sin(t * 0.35 + si2); return true; });
      const fns = anim.splice(anim0); anim.push(t => { if (!fns[0](t)) return; for (let j = 1; j < fns.length; j++) fns[j](t); }); }
  }
  // ---- mundo: piso con retícula y objetos flotantes (paralaje) ----
  const grid = new THREE.GridHelper(700, 350, GOLD, GOLD); grid.material.transparent = true; grid.material.opacity = 0.09; grid.material.depthWrite = false; grid.position.set(0, -3.3, sz / 2); scene.add(grid);
  const FL = [], NF = SHOTS.length * 9;
  for (let i = 0; i < NF; i++) { const ty2 = i % 3, sz2 = 0.12 + rnd() * 0.16; const geo = ty2 === 0 ? new THREE.CylinderGeometry(sz2, sz2, sz2 * 0.25, 24) : ty2 === 1 ? new THREE.OctahedronGeometry(sz2) : new RoundedBoxGeometry(sz2 * 1.4, sz2 * 1.4, sz2 * 1.4, 2, sz2 * 0.2);
    const m = new THREE.Mesh(geo, ty2 === 0 ? gold(0.25) : ty2 === 1 ? new THREE.MeshStandardMaterial({ color: 0xC4B5FD, emissive: 0x7C3AED, emissiveIntensity: 0.5, roughness: 0.3 }) : solid(0x2A3F66, 0.3, 0.4));
    const side = rnd() < 0.5 ? -1 : 1; m.userData.b = [side * ((H > W ? 2.2 : 4.0) + rnd() * (H > W ? 4 : 7)), -2.6 + rnd() * 6.2, 12 + rnd() * (sz - 24), rnd() * 6.28, 0.4 + rnd() * 0.8]; scene.add(m); FL.push(m); }
  // ---- cámara por tomas ----
  const V = new THREE.Vector3();
  const shotCam = (s, t) => { const g = SETS[s.key], u = clamp((t - s.t0) / Math.max(1, s.t1 - s.t0)); let az = s.az0 + (s.az1 - s.az0) * u; const rad = s.r0 + (s.r1 - s.r0) * easeIO(u);
    const tx = g.position.x + (s.tx || 0), ty = s.ty || 0, tz = g.position.z;
    let target = new THREE.Vector3(tx, ty, tz);
    if (s.set === "cards") { let k = 0; T.qT.forEach((q, i) => { if (i > 0 && t >= q - 0.6) k = i; }); const at = i => new THREE.Vector3(g.position.x + (i < 0 ? 0 : (i % 2 ? 1 : -1) * (H > W ? 0.3 : 1.0)), 0.3, g.position.z + (i < 0 ? -(QLIST.length - 1) * QSP / 2 : -i * QSP));
      const pr = at(Math.max(0, k - 1)), nx = at(k), p = k > 0 ? easeIO(span(t, T.qT[k] - 0.6, 1.1)) : 1; target = pr.lerp(nx, p);
      const r = k < 0 ? (H > W ? 21 : 22) : rad, a2 = k < 0 ? 0.6 : (k % 2 ? -0.18 : 0.18); const fin = easeIO(span(t, TT("qAll"), H > W ? 1.0 : 1.6)); const all = new THREE.Vector3(g.position.x, 0.3, g.position.z - (QLIST.length - 1) * QSP / 2);
      target.lerp(all, fin); if (H > W) all.y = -0.26; const rr2 = r + (H > W ? 8 : 16) * fin - r * fin, aa = a2 + ((H > W ? 0.12 * Math.sin(t * 0.5) : 0.7) - a2) * fin;
      return { p: new THREE.Vector3(target.x + rr2 * Math.sin(aa), target.y + rr2 * Math.sin(s.el), target.z + rr2 * Math.cos(aa)), t: target, off: s.off || 0 }; }
    az += 0.07 * Math.sin(t * 0.45);
    return { p: new THREE.Vector3(tx + rad * Math.sin(az) * Math.cos(s.el), ty + rad * Math.sin(s.el), tz + rad * Math.cos(az) * Math.cos(s.el)), t: target, off: s.off || 0 }; };
    function camAt(t) {
    let i = SHOTS.findIndex((s, k) => t >= s.t0 && (k === SHOTS.length - 1 || t < SHOTS[k + 1].t0)); if (i < 0) i = 0;
    let o = shotCam(SHOTS[i], t);
    const nx = SHOTS[i + 1], pv = SHOTS[i - 1];
    const blend = (a, b, b0) => { const A = shotCam(a, b0 - TR), B = shotCam(b, b0 + TR), p = easeIO((t - (b0 - TR)) / (2 * TR)); const r = { p: A.p.clone().lerp(B.p, p), t: A.t.clone().lerp(B.t, p), off: A.off + (B.off - A.off) * p }; r.roll = 0; if (a.key !== b.key) { r.p.y += Math.sin(Math.PI * p) * 2.2; r.roll = Math.sin(Math.PI * p) * 0.1 * (b.t0 % 2 > 1 ? 1 : -1); } return r; };
    if (nx && t > nx.t0 - TR) o = blend(SHOTS[i], nx, nx.t0); else if (pv && t < SHOTS[i].t0 + TR) o = blend(pv, SHOTS[i], SHOTS[i].t0);
    o.p.x += 0.22 * Math.sin(t * 0.7); o.p.y += 0.14 * Math.sin(t * 0.53 + 1);
    camera.position.copy(o.p); camera.lookAt(o.t); if (o.roll) camera.rotateZ(o.roll); camera.clearViewOffset(); camera.setViewOffset(W, H, o.off, 0, W, H);
    key.position.set(o.t.x + 4, 7, o.t.z + 6); key.target.position.copy(o.t); rim.position.set(o.t.x - 6, 3, o.t.z - 4); rim.target.position.copy(o.t); glow.position.set(o.t.x, o.t.y + 2.5, o.t.z + 2);
    return o;
  }
  const projTo = (obj, ly, id, dx, dy) => { const el = document.getElementById(id); if (!el) return; V.set(0, ly, 0); obj.localToWorld(V); V.project(camera); el.style.transform = `translate(${(V.x * 0.5 + 0.5) * W - dx}px, ${(-V.y * 0.5 + 0.5) * H - dy}px)`; };
  function renderAt(t) {
    const o = camAt(t);
    for (let i = 0; i < NP; i++) { const b = pb[i]; pp[i * 3] = o.t.x + b[0] + Math.sin(t * 0.15 + b[3]) * 0.6; pp[i * 3 + 1] = b[1] + ((t * b[4] * 0.25 + b[3]) % 3); pp[i * 3 + 2] = b[2] + o.t.z; }
    pg.attributes.position.needsUpdate = true;
    anim.forEach(f => f(t));
    FL.forEach(m => { const b = m.userData.b; m.position.set(b[0] + 0.3 * Math.sin(t * 0.3 + b[3]), b[1] + 0.35 * Math.sin(t * b[4] + b[3]), b[2]); m.rotation.set(t * b[4] + b[3], t * 0.7 * b[4], 0);
      const dd = m.position.distanceTo(camera.position); m.visible = dd > 1.2; m.scale.setScalar(clamp((dd - 1.2) / 2.5)); });
    renderer.render(scene, camera);
    if (SETN.brasil) projTo(SETN.brasil.userData.lab, 1.65, "lbBR", 110, 30);
    if (SETN.nuvs) ["lbP0", "lbP1", "lbP2"].forEach((id, i) => projTo(SETN.nuvs.userData.pins[i], i ? 1.3 : 1.7, id, 110, 30));
  }
  window.addEventListener("hf-seek", e => renderAt(e.detail.time));
  return renderAt;
}
window.__hf = window.__hf || {}; window.__hf.buildReady = window.__hf.buildReady || {};
window.__hf.buildReady["titan-nu"] = build().then(renderAt => {
  const tl = gsap.timeline({ paused: true }); OVERLAYS(tl);
  tl.to({ p: 0 }, { p: 1, duration: DUR, ease: "none", onUpdate: () => renderAt(tl.time()) }, 0);
  tl.to({}, { duration: 0.01 }, DUR - 0.01); renderAt(0);
  window.__timelines = window.__timelines || {}; window.__timelines["main"] = tl;
});
