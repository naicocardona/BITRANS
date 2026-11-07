import numpy as np, soundfile as sf, json, subprocess, sys
sys.path.insert(0, '.'); from script import TK, SH, GAP
for v, L in [("tiktok", TK), ("shorts", SH)]:
    out=[]; st=[]; t=0.0; sr=None
    for i,_,_ in L:
        x,sr=sf.read(f"tts/{i}.wav"); nz=np.where(np.abs(x)>0.004)[0]; x=x[max(0,nz[0]-240):nz[-1]+480]
        g=GAP.get(i,0.1 if v=='tiktok' else 0.18); out.append(np.zeros(int(g*sr))); t+=g; st.append([i,round(t,3),round(len(x)/sr,3)]); out.append(x); t+=len(x)/sr
    out.append(np.zeros(int(0.3*sr))); sf.write(f"tts/{v}_raw.wav",np.concatenate(out),sr)
    subprocess.run(["ffmpeg","-loglevel","error","-y","-i",f"tts/{v}_raw.wav","-af","asetrate=24000*0.917,aresample=48000,atempo=1.0905,highpass=f=70,equalizer=f=220:t=q:w=1:g=2,equalizer=f=3000:t=q:w=1.2:g=2.5,deesser=i=0.3,acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=2,aecho=0.85:0.6:35|60:0.18|0.10",f"tts/{v}_narr.wav"],check=True)
    json.dump(st,open(f"tts/{v}_times.json","w")); print(v,round(t+0.3,2))
