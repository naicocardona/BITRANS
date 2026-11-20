# Video rojo/verde v2 (cuenta personal de Lady): zoom con golpe y empuje continuo, temblor en pérdidas,
# viñeta, destello + separación RGB en cada cambio de color y capa de números de overlay.py.
# Uso: python3 tools/rv/edit2.py clip.mov salida.mp4
import subprocess, sys, os, tempfile
sys.path.insert(0, os.path.dirname(__file__)); from timeline import CUTS, col
SRC, OUT = sys.argv[1], sys.argv[2]
RED = [float(x) for x in os.environ.get('RV_RED', '13.8,12.6,15.0,21.0,14.4,16.2,26.0,3.0,20.4,15.8,12.0,17.2,26.8,22.4,13.2,16.8').split(',')]
GRN = [float(x) for x in os.environ.get('RV_GRN', '7.0,19.0,9.5,23.8,5.6,18.6,8.2,24.6,10.4').split(',')]
SRC_W, SRC_H, CX, CYS = 360, 480, 145, 235         # clip ya rotado; centro de interés (pantallas)
TINT = {'R': 'colorchannelmixer=rr=.95:rg=.35:rb=.1:gr=.06:gg=.1:gb=.04:br=.06:bg=.1:bb=.08',
        'G': 'colorchannelmixer=rr=.05:rg=.12:rb=.03:gr=.25:gg=.9:gb=.15:br=.06:bg=.25:bb=.08'}
work = os.environ.get('BITRANS_WORK', '/home/user/bitrans_work') + '/rv'; os.makedirs(work, exist_ok=True)
tmp = tempfile.mkdtemp(dir=work); parts = []; ri = gi = 0
for k in range(len(CUTS) - 1):
    a, b = CUTS[k], CUTS[k + 1]; c = col(a); nf = round(b * 30) - round(a * 30)
    if c == 'R': s = RED[ri % len(RED)]; ri += 1
    else: s = GRN[gi % len(GRN)]; gi += 1
    last = k == len(CUTS) - 2
    z0 = 1.18 if k % 2 else 1.10                                         # golpe de entrada alterno
    zexp = f"1.0+{z0 - 1:.2f}*exp(-on/3.5)+{0.0012 if last else 0.003}*on"
    sh = "18*sin(on*2.7)*exp(-on/5)" if c == 'R' else "0"
    # recorte 9:16 a 2× para que el zoom tenga margen; zoompan centra en las pantallas
    vf = (f"crop=270:480:{CX - 135}:0,scale=1080:1920:flags=lanczos,fps=30,"
          f"zoompan=z='{zexp}':x='iw/2-iw/zoom/2+{sh}':y='ih*{CYS / SRC_H:.3f}-ih/zoom*{CYS / SRC_H:.3f}+{sh}*0.6':d=1:s=1080x1920:fps=30,"
          f"eq=gamma=1.55:contrast=1.3:brightness=.03:saturation=1.1,{TINT[c]},unsharp=5:5:.7,vignette=PI/4.2")
    p = f"{tmp}/p{k:02d}.mp4"; parts.append(p)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(s), '-i', SRC, '-an', '-vf', vf, '-frames:v', str(nf), '-c:v', 'libx264', '-crf', '14', '-pix_fmt', 'yuv420p', p], check=True)
open(f"{tmp}/l.txt", 'w').write(''.join(f"file '{p}'\n" for p in parts))
ov = f"{tmp}/ov"; subprocess.run(['python3', os.path.join(os.path.dirname(__file__), 'overlay.py'), ov], check=True)
fx = []
for k in range(1, len(CUTS) - 1):
    fa = round(CUTS[k] * 30)
    if col(CUTS[k - 1]) != col(CUTS[k]):
        fx.append(f"drawbox=x=0:y=0:w=iw:h=ih:color=white@0.6:t=fill:enable='between(n,{fa},{fa + 1})'")
        fx.append(f"rgbashift=rh=-18:bh=18:enable='between(n,{fa},{fa + 3})'")
    else: fx.append(f"rgbashift=rh=-8:bh=8:enable='between(n,{fa},{fa + 1})'")
fc = f"[0:v]{','.join(fx)}[b];[1:v]format=rgba[o];[b][o]overlay=0:0:format=auto,format=yuv420p[v]"
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', f"{tmp}/l.txt", '-framerate', '30', '-i', f"{ov}/o%04d.png",
                '-filter_complex', fc, '-map', '[v]', '-c:v', 'libx264', '-crf', '18', '-preset', 'slow', '-movflags', '+faststart', OUT], check=True)
subprocess.run(['rm', '-rf', tmp]); print('listo', OUT)
