# Cuenta personal · «make / kachi» (rojo = pierdo, verde = gano). Corta el clip de Lady en los tiempos del sonido de referencia.
# Uso: python3 tools/rv/edit.py clip.mov salida.mp4 [audio_ref_para_preview]
import subprocess, sys, os, tempfile
SRC, OUT = sys.argv[1], sys.argv[2]; REF = sys.argv[3] if len(sys.argv) > 3 else None
# cortes del sonido (detectados en el video de referencia) y color de cada tramo
CUTS = [0, 1.6, 2.267, 2.867, 4.467, 5.067, 5.5, 6, 6.5, 7.667, 8.167, 8.7, 9.133, 9.667, 10.567, 11.633, 12.167, 12.667, 13.1, 13.567, 14.7, 15.133, 15.567, 15.967, 17.033, 17.5, 18, 18.4, 18.9, 19.533, 24]
GREEN = [(6.5, 7.667), (10.567, 11.633), (13.1, 13.567), (15.133, 15.567), (15.967, 24)]
col = lambda t: 'G' if any(a <= t + .01 < b for a, b in GREEN) else 'R'
# momentos del clip de Lady (s): rojo = frustración, verde = tranquila / mirando la gráfica
RED = [float(x) for x in os.environ.get('RV_RED', '13.8,12.6,15.0,21.0,14.4,16.2,26.0,3.0,20.4,15.8,12.0,17.2,26.8,22.4,13.2,16.8').split(',')]
GRN = [float(x) for x in os.environ.get('RV_GRN', '7.0,19.0,9.5,23.8,5.6,18.6,8.2,24.6,10.4').split(',')]
W, H = 1080, 1920
TINT = {'R': 'colorchannelmixer=rr=.95:rg=.35:rb=.1:gr=.06:gg=.1:gb=.04:br=.06:bg=.1:bb=.08',
        'G': 'colorchannelmixer=rr=.05:rg=.12:rb=.03:gr=.25:gg=.9:gb=.15:br=.06:bg=.25:bb=.08'}
tmp = tempfile.mkdtemp(); parts = []; ri = gi = 0
for k in range(len(CUTS) - 1):
    a, b = CUTS[k], CUTS[k + 1]; c = col(a)
    if c == 'R': s = RED[ri % len(RED)]; ri += 1
    else: s = GRN[gi % len(GRN)]; gi += 1
    z = 1.0 if k % 2 == 0 else 1.14            # golpe de zoom alterno
    cw, ch = int(270 / z) // 2 * 2, int(480 / z) // 2 * 2; cx = max(0, min(360 - cw, 145 - cw // 2)); cy = max(0, min(480 - ch, 235 - ch // 2))
    vf = (f"crop={cw}:{ch}:{cx}:{cy},scale={W}:{H}:flags=lanczos,eq=gamma=1.5:contrast=1.25:brightness=.03,{TINT[c]},"
          f"unsharp=5:5:.6,fps=30")
    p = f"{tmp}/p{k:02d}.mp4"; parts.append(p)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(s), '-i', SRC, '-an', '-vf', vf, '-frames:v', str(round(b * 30) - round(a * 30)), '-c:v', 'libx264', '-crf', '14', '-pix_fmt', 'yuv420p', p], check=True)
open(f"{tmp}/l.txt", 'w').write(''.join(f"file '{p}'\n" for p in parts))
# textos: 負け PIERDO / 勝ち GANO, con destello en cada cambio de color
JP, LAT = '/usr/share/fonts/opentype/ipafont-gothic/ipag.ttf', '/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf'
dt = []
for k in range(len(CUTS) - 1):
    a, b = CUTS[k], CUTS[k + 1]; c = col(a)
    jp, es, fc = ('勝ち', 'GANO', '0x39FF6A') if c == 'G' else ('負け', 'PIERDO', '0xFF3B3B')
    fa, fb = round(a * 30), round(b * 30); en = f"between(n,{fa},{fb - 1})"; pop = f"if(lt(n-{fa},3),1.25,1)"
    dt.append(f"drawtext=fontfile={JP}:text='{jp}':fontsize='210*{pop}':fontcolor={fc}:borderw=10:bordercolor=black:x=(w-tw)/2:y=250:enable='{en}'")
    dt.append(f"drawtext=fontfile={LAT}:text='{es}':fontsize=96:fontcolor=white:borderw=8:bordercolor=black:x=(w-tw)/2:y=500:enable='{en}'")
    if k and col(CUTS[k - 1]) != c: dt.append(f"drawbox=x=0:y=0:w=iw:h=ih:color=white@0.55:t=fill:enable='between(n,{fa},{fa + 1})'")
vf = ','.join(dt)
cmd = ['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', f"{tmp}/l.txt"]
if REF: cmd += ['-i', REF, '-map', '0:v', '-map', '1:a', '-af', 'afade=t=out:st=23.3:d=0.7', '-c:a', 'aac', '-b:a', '192k', '-shortest']
cmd += ['-vf', vf, '-c:v', 'libx264', '-crf', '18', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', OUT]
subprocess.run(cmd, check=True); print('listo', OUT)
