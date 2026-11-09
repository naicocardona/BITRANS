# NAS100 EDGE LAB · piezas comunes (laboratorio, reloj, Explorador, capturas de #026 y #027 con dinero/lotes tapados)
import numpy as np, soundfile as sf
KIT = "/home/user/BITRANS/tools/kit/nas"
POSES = ["neutral", "explica", "senala", "pensativo", "satisfecho", "habla_2", "habla_3", "senala_t1", "senala_t2", "tp_t1", "tp_t2", "piensa_t1", "piensa_t2", "gira_1", "gira_2", "gira_3"]
OVER = ["explica_c", "senala_c", "pensativo_c", "satisfecho_c"]
GLOW = ["neutral", "explica", "senala", "pensativo", "satisfecho", "senala_t1", "senala_t2", "tp_t1", "tp_t2", "piensa_t1", "piensa_t2", "gira_1"]

def envelope(wav, dur):
    x, sr = sf.read(wav, always_2d=True); x = x.mean(1); hop = sr // 30; n = int(dur * 30) + 1
    r = np.array([np.sqrt(np.mean(x[i * hop:(i + 1) * hop] ** 2)) if i * hop < len(x) else 0 for i in range(n)])
    r = np.clip(r / (np.percentile(r[r > 1e-4], 90) + 1e-9), 0, 1.3)
    e = np.zeros(n); a = 0
    for i, v in enumerate(r): a = v if v > a else a * 0.72; e[i] = a
    e = np.clip((e - 0.06) / 0.8, 0, 1) ** 0.8
    return [round(float(v), 3) for v in e]

def lab_svg():   # laboratorio ilustrado de fondo (decorativo: nunca muestra datos de precio)
    parts = ['<svg viewBox="0 0 1080 1920" width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">',
             '<defs><linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#13161F"/><stop offset="1" stop-color="#090B10"/></linearGradient>',
             '<radialGradient id="spot" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#A779F2" stop-opacity=".28"/><stop offset="1" stop-color="#A779F2" stop-opacity="0"/></radialGradient></defs>',
             '<g id="ceil">' + ''.join(f'<rect class="cl2" x="{x}" y="96" width="240" height="8" rx="4" fill="#A779F2" opacity=".55"/>' for x in [60, 420, 780]) + '</g>',
             '<rect id="tubeL" class="neon" x="34" y="290" width="6" height="760" rx="3" fill="#A779F2" opacity=".7"/>',
             '<rect id="tubeR" class="neonT" x="1040" y="290" width="6" height="760" rx="3" fill="#3FD0C9" opacity=".7"/>',
             '<rect x="0" y="1290" width="1080" height="630" fill="url(#fl)"/>',
             ''.join(f'<line x1="540" y1="1290" x2="{540 + (k - 6) * 220}" y2="1920" stroke="#A779F2" stroke-opacity=".10" stroke-width="2"/>' for k in range(13)),
             ''.join(f'<line x1="0" y1="{1290 + (k * k) * 9}" x2="1080" y2="{1290 + (k * k) * 9}" stroke="#A779F2" stroke-opacity=".08" stroke-width="2"/>' for k in range(1, 9)),
             '<rect id="scanF" x="0" y="1290" width="1080" height="6" fill="#3FD0C9" opacity="0"/>',
             '<ellipse cx="236" cy="1500" rx="260" ry="40" fill="url(#spot)"/>',
             '<g id="console" transform="translate(560 1090)"><rect x="0" y="150" width="440" height="160" rx="18" fill="#13161F" stroke="#A779F2" stroke-opacity=".35" stroke-width="2"/>',
             '<rect x="20" y="0" width="190" height="130" rx="12" fill="#0D1018" stroke="#3FD0C9" stroke-opacity=".5" stroke-width="2"/><rect x="230" y="0" width="190" height="130" rx="12" fill="#0D1018" stroke="#A779F2" stroke-opacity=".5" stroke-width="2"/>',
             ''.join(f'<rect class="sl{k % 3}" x="38" y="{20 + k * 18}" width="{150 - (k * 37) % 90}" height="8" rx="4" fill="#3FD0C9" opacity=".55"/>' for k in range(6)),
             '<circle id="radar" cx="325" cy="65" r="44" fill="none" stroke="#A779F2" stroke-opacity=".6" stroke-width="3"/><circle cx="325" cy="65" r="24" fill="none" stroke="#A779F2" stroke-opacity=".35" stroke-width="2"/>',
             '<g id="sweep" transform="translate(325 65)"><path d="M0 0 L44 0 A44 44 0 0 0 31 -31 Z" fill="#A779F2" opacity=".45"/></g>',
             ''.join(f'<circle class="led" cx="{40 + k * 46}" cy="{196}" r="8" fill="{["#3FD0C9", "#A779F2", "#64E087"][k % 3]}" opacity=".85"/>' for k in range(9)),
             ''.join(f'<rect x="{30 + k * 64}" y="232" width="48" height="16" rx="5" fill="#1C2130"/>' for k in range(6)), '</g>',
             ''.join(f'<circle class="pt" cx="{(k * 137) % 1080}" cy="{300 + (k * 211) % 1000}" r="{1.5 + (k % 3)}" fill="{["#A779F2", "#3FD0C9", "#F4F5F9"][k % 3]}" opacity=".35"/>' for k in range(36)),
             '</svg>']
    return "".join(parts)

CLOCK = '''<svg width="260" height="260" viewBox="0 0 300 300"><circle cx="150" cy="150" r="128" fill="#13161F" stroke="#A779F2" stroke-width="12"/>
{ticks}<g id="hrH"><line x1="150" y1="150" x2="150" y2="78" stroke="#A779F2" stroke-width="14" stroke-linecap="round"/></g>
<g id="mnH"><line x1="150" y1="150" x2="150" y2="44" stroke="#F4F5F9" stroke-width="9" stroke-linecap="round"/></g><circle cx="150" cy="150" r="12" fill="#F4F5F9"/></svg>'''.replace(
    "{ticks}", "".join(f'<rect x="146" y="30" width="8" height="{22 if k % 3 == 0 else 12}" rx="4" fill="#F4F5F9" opacity=".7" transform="rotate({k*30} 150 150)"/>' for k in range(12)))

# ---- capturas reales (no se alteran precios ni velas; solo resaltados encima) ----
def chart26():   # 560×949
    return ('<svg width="560" height="949" viewBox="0 0 560 949">'
            '<rect class="hiE" x="210" y="531" width="350" height="14" rx="7" fill="none" stroke="#A779F2" stroke-width="5" opacity="0"/>'
            '<path class="hiD" d="M217 541 L370 692" fill="none" stroke="#FF6474" stroke-width="7" stroke-linecap="round" opacity="0"/>'
            '<rect class="hiT" x="210" y="690" width="350" height="18" rx="8" fill="none" stroke="#64E087" stroke-width="5" opacity="0"/>'
            '<g class="lbE" opacity="0"><rect x="400" y="486" width="150" height="38" rx="9" fill="#090B10"/><text x="475" y="512" font-family="Inter" font-weight="900" font-size="20" text-anchor="middle" fill="#A779F2">ENTRADA</text></g>'
            '<g class="lbT" opacity="0"><rect x="400" y="716" width="150" height="38" rx="9" fill="#090B10"/><text x="475" y="742" font-family="Inter" font-weight="900" font-size="20" text-anchor="middle" fill="#64E087">OBJETIVO</text></g>'
            '<g class="lbI" opacity="0"><rect x="18" y="610" width="190" height="38" rx="9" fill="#090B10"/><text x="113" y="636" font-family="Inter" font-weight="900" font-size="19" text-anchor="middle" fill="#FF6474">DESCENSO</text></g>'
            '</svg>')
def chart27():   # 462×1031
    return ('<svg width="462" height="1031" viewBox="0 0 462 1031">'
            '<rect class="hiE" x="56" y="616" width="390" height="14" rx="7" fill="none" stroke="#A779F2" stroke-width="5" opacity="0"/>'
            '<path class="hiD" d="M62 620 L103 463" fill="none" stroke="#3FD0C9" stroke-width="7" stroke-linecap="round" opacity="0"/>'
            '<rect class="hiT" x="56" y="452" width="390" height="18" rx="8" fill="none" stroke="#64E087" stroke-width="5" opacity="0"/>'
            '<g class="lbE" opacity="0"><rect x="290" y="640" width="150" height="38" rx="9" fill="#090B10"/><text x="365" y="666" font-family="Inter" font-weight="900" font-size="20" text-anchor="middle" fill="#A779F2">ENTRADA</text></g>'
            '<g class="lbT" opacity="0"><rect x="290" y="404" width="150" height="38" rx="9" fill="#090B10"/><text x="365" y="430" font-family="Inter" font-weight="900" font-size="20" text-anchor="middle" fill="#64E087">OBJETIVO</text></g>'
            '<g class="lbI" opacity="0"><rect x="6" y="500" width="120" height="38" rx="9" fill="#090B10"/><text x="66" y="526" font-family="Inter" font-weight="900" font-size="20" text-anchor="middle" fill="#3FD0C9">IMPULSO</text></g>'
            '</svg>')
def receipt(h_img, pts, side):   # comprobante 828×h mostrado a 900 de ancho; dinero (cvM) y lote (cvL) tapados SIEMPRE desde el primer cuadro
    k = 900 / 828; H = round(h_img * k); R = lambda x, y, w, h: f'x="{x*k:.0f}" y="{y*k:.0f}" width="{w*k:.0f}" height="{h*k:.0f}"'
    return (f'<svg width="900" height="{H}" viewBox="0 0 900 {H}">'
            f'<rect class="rhE" {R(24, 112, 352, 56)} rx="10" fill="none" stroke="#A779F2" stroke-width="5" opacity="0"/>'
            f'<rect class="rhD" {R(24, 226, 592, 46)} rx="10" fill="none" stroke="#3FD0C9" stroke-width="5" opacity="0"/>'
            f'<g class="cvM"><rect {R(556, 100, 262, 78)} rx="12" fill="#13161F" stroke="#64E087" stroke-width="3"/>'
            f'<text x="{687*k:.0f}" y="{126*k:.0f}" font-family="Inter" font-weight="900" font-size="15" text-anchor="middle" fill="#F4F5F9" letter-spacing="1.5">RESULTADO EN PUNTOS</text>'
            f'<text x="{687*k:.0f}" y="{160*k:.0f}" font-family="Inter" font-weight="900" font-size="30" text-anchor="middle" fill="#64E087">+{pts} pts</text></g>'
            f'<g class="cvL"><rect {R(186, 14, 254, 56)} rx="12" fill="#13161F" stroke="#A779F2" stroke-width="3"/>'
            f'<text x="{313*k:.0f}" y="{50*k:.0f}" font-family="Inter" font-weight="900" font-size="22" text-anchor="middle" fill="#F4F5F9">{side} · TAKE PROFIT</text></g>'
            '</svg>')

def snap_parts(wav, parts, dur, win=0.8):
    """Reparte un subtítulo de varias líneas (|) dentro de su frase y ajusta cada corte a la pausa real más cercana de la voz (silencedetect).
    wav: audio de la frase recortado igual que en assemble (inicio = inicio de la frase). Devuelve [(ini, fin)] relativos. Mejora del 9 nov 2026."""
    import re, subprocess
    Ls = [len(p) for p in parts]; tot = sum(Ls); cuts = []; acc = 0
    for l in Ls[:-1]: acc += l; cuts.append(dur * acc / tot)
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", wav, "-af", "silencedetect=n=-35dB:d=0.09", "-f", "null", "-"], capture_output=True, text=True).stderr
    ss = [float(v) for v in re.findall(r"silence_start: ([\d.]+)", r)]; se = [float(v) for v in re.findall(r"silence_end: ([\d.]+)", r)]
    gaps = [(a + b) / 2 for a, b in zip(ss, se) if 0.15 < (a + b) / 2 < dur - 0.15]
    out = []
    for c in cuts:
        g = min(gaps, key=lambda x: abs(x - c)) if gaps else None
        out.append(g if g is not None and abs(g - c) <= win and (not out or g > out[-1] + 0.3) else c)
    b = [0.0] + out + [dur]
    return [(b[i], b[i + 1]) for i in range(len(parts))]

def align_parts(wav, voice_text, parts):
    """Ubica cada línea del subtítulo (|) con la alineación Whisper de la voz (align_asr), contando las cifras como se pronuncian (446 = 4 palabras).
    Corrige el adelanto de subtítulos en frases con números. Devuelve [(ini, fin)] relativos a la frase. Mejora del 9 nov 2026."""
    import os, sys, soundfile as sf
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); import align_asr as A
    x, sr = sf.read(wav, dtype="float32"); x = x.mean(1) if x.ndim > 1 else x; dur = len(x) / sr
    W = A.align(x, sr, voice_text); T = []
    for w, t0, t1 in W:
        n = max(1, len(A.toks(w))); T += [t0 + (t1 - t0) * k / n for k in range(n)]
    need = [max(1, len(A.toks(p))) for p in parts]; tot = sum(need); b = [0.0]; c = 0
    for k in range(len(parts) - 1):
        c += need[k]; i = round(c * len(T) / tot)          # proporción en palabras pronunciadas (tolera pequeñas diferencias de escritura)
        b.append(max(b[-1] + 0.25, T[min(i, len(T) - 1)]))
    b.append(dur); return [(b[i], b[i + 1]) for i in range(len(parts))]
