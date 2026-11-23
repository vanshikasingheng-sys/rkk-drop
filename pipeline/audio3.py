import numpy as np, wave, json, sys, subprocess, os
v=sys.argv[1]; os.chdir(v)
SR=44100
TL=json.load(open('timeline.json')); END=TL['dur']; N=int(END*SR)
META=json.load(open('meta.json')); SFXL=json.load(open('sfx.json'))
rng=np.random.default_rng(5)
mus=np.zeros(N); sfx=np.zeros(N)
def add(buf,t,sig,g=1.):
    i=int(t*SR)
    if i<0 or i>=N: return
    j=min(N,i+len(sig)); buf[i:j]+=sig[:j-i]*g
def S(*a):
    n=max(len(x) for x in a);o=np.zeros(n)
    for x in a:o[:len(x)]+=x
    return o
def lp(x,k):
    y=np.empty_like(x);a=0.
    for i in range(len(x)): a+=k*(x[i]-a); y[i]=a
    return y
mid=lambda m:440*2**((m-69)/12)
def tone(f,d,g=1,att=.005,dec=None,harm=((1,1),)):
    n=int(d*SR);x=np.arange(n)/SR;s=sum(a*np.sin(2*np.pi*f*h*x) for h,a in harm)
    return s*np.minimum(1,x/att)*np.exp(-x/(dec or d/3))*np.minimum(1,(d-x)/.02)*g
def noise(d,k=.2): n=int(d*SR); return lp(rng.standard_normal(n),k)
def whoosh(d=.45,up=True):
    n=int(d*SR);x=np.arange(n)/SR;z=rng.standard_normal(n);y=np.empty(n);a=0.
    for i in range(n):
        k=.03+.3*((x[i]/d) if up else (1-x[i]/d)); a+=k*(z[i]-a); y[i]=a
    return y*np.sin(np.pi*x/d)**1.5*.9
def pop(f0=900,f1=300,d=.12):
    n=int(d*SR);x=np.arange(n)/SR;return np.sin(2*np.pi*np.cumsum(f0+(f1-f0)*x/d)/SR)*np.exp(-x*32)*.6
def kick():
    n=int(.32*SR);x=np.arange(n)/SR;return np.sin(2*np.pi*np.cumsum(48+90*np.exp(-x*28))/SR)*np.exp(-x*8)
def clap():
    n=int(.2*SR);x=np.arange(n)/SR;return np.diff(np.r_[0,rng.standard_normal(n)])*np.exp(-x*22)*.3
def hat():
    n=int(.04*SR);return np.diff(np.r_[0,rng.standard_normal(n)])*np.exp(-np.arange(n)/SR*90)*.1
def thud():
    n=int(.5*SR);x=np.arange(n)/SR;return np.sin(2*np.pi*np.cumsum(70*np.exp(-x*6)+30)/SR)*np.exp(-x*7)+noise(.5,.1)*np.exp(-x*20)*.5

def pad(notes,t,d,g,att=.4,hm=((1,1),(2,.3),(3,.12))):
    for m in notes: add(mus,t,tone(mid(m),d,g,att=att,dec=d*2,harm=hm))
def pluck(m,t,d=.4,g=.1): add(mus,t,tone(mid(m),d,g,att=.003,dec=.22,harm=((1,1),(2,.35),(3,.15))),1)
def bars(t0,t1,bpm,fn,beats=4):
    b=60/bpm;t=t0;k=0
    while t<t1-.05:
        fn(t,k,b);t+=beats*b;k+=1
def snare():
    n=int(.18*SR);x=np.arange(n)/SR;return np.diff(np.r_[0,rng.standard_normal(n)])*np.exp(-x*25)*.28
def shaker():
    n=int(.06*SR);return np.diff(np.r_[0,rng.standard_normal(n)])*np.exp(-np.arange(n)/SR*55)*.08
def dhol_lo():
    n=int(.35*SR);x=np.arange(n)/SR;return np.sin(2*np.pi*np.cumsum(70+60*np.exp(-x*20))/SR)*np.exp(-x*9)
def dhol_hi():
    n=int(.12*SR);x=np.arange(n)/SR;return (np.sin(2*np.pi*320*x)*.4+np.diff(np.r_[0,rng.standard_normal(n)])*.3)*np.exp(-x*30)
def chug():
    n=int(.09*SR);return lp(rng.standard_normal(n),.35)*np.exp(-np.arange(n)/SR*45)*.22
def heart():
    n=int(.18*SR);x=np.arange(n)/SR;hb=np.sin(2*np.pi*55*x)*np.exp(-x*22);o=np.zeros(int(.4*SR));o[:n]+=hb;o[int(.19*SR):int(.19*SR)+n]+=hb*.6;return o*1.1
def style(name,t0,t1):
    if t1-t0<.2: return
    if name=='groove':
        prog=[[60,64,67],[55,59,62],[57,60,64],[53,57,60]];rt=[36,31,33,29]
        def f(t,k,b):
            ch=prog[k%4];pad(ch,t,4*b,.05);add(mus,t,tone(mid(rt[k%4]+12),4*b,.12,att=.02,dec=1.2),1)
            for s in range(8):
                tt=t+s*b/2
                if tt>=t1:break
                if s%4==0 or s==3: add(mus,tt,kick(),.5)
                if s in(2,6): add(mus,tt,clap(),1)
                add(mus,tt+(.02 if s%2 else 0),hat(),1)
                add(mus,tt,tone(mid(ch[s%3]+12),b*.5,.07,att=.005,dec=.2,harm=((1,1),(2,.4))),1)
        bars(t0,t1,104,f)
    elif name=='dark':
        b=60/88;t=t0;i=0
        while t<t1-.05:
            bar=int((t-t0)/(4*b));pad([33,45,52] if bar%2==0 else [31,43,50],t,4*b,.05);t+=4*b
        tt=t0
        while tt<t1-.05:
            f_=mid(33 if (i//8)%2==0 else 31);add(mus,tt,tone(f_,b*.45,.2,att=.01,dec=.15,harm=((1,1),(2,.5))),1);tt+=b/2;i+=1
        rd=min(2.0,t1-t0-.2)
        if rd>0:add(mus,t1-rd,whoosh(rd,True),.7)
    elif name=='tense':
        prog=[[45,52,57],[43,50,55],[41,48,53],[40,47,52]]
        def f(t,k,b):
            pad(prog[k%4],t,4*b,.05,att=.2)
            for s in range(8):
                tt=t+s*b/2
                if tt>=t1:break
                add(mus,tt,tone(mid(prog[k%4][0]-12),b*.45,.22,att=.005,dec=.12,harm=((1,1),(2,.6),(3,.3))),1)
                if s%2==1: add(mus,tt,hat(),1.4)
                if s in (0,4): add(mus,tt,kick(),.55)
            if k%2==1: add(mus,t+2*b,whoosh(2*b,True),.35)
        bars(t0,t1,122,f)
    elif name=='techno':
        prog=[[57,60,64],[53,57,60],[60,64,67],[55,59,62]]
        def f(t,k,b):
            ch=prog[k%4];pad(ch,t,4*b,.035,att=.1,hm=((1,1),(3,.4),(5,.2)))
            for s in range(16):
                tt=t+s*b/4
                if tt>=t1:break
                pluck(ch[(s*3)%3]+12*(1+(s%4==3)),tt,b*.22,.07)
                if s%4==0: add(mus,tt,kick(),.55)
                if s%4==2: add(mus,tt,hat(),1.6)
                if s in (4,12): add(mus,tt,snare(),1)
            add(mus,t,tone(mid(ch[0]-24),4*b,.12,att=.02,dec=1.5),1)
        bars(t0,t1,118,f)
    elif name=='dhol':
        prog=[[62,66,69],[62,66,69],[59,62,66],[64,67,71]]
        def f(t,k,b):
            ch=prog[k%4];pad(ch,t,4*b,.035,att=.1,hm=((1,1),(2,.6),(3,.5),(4,.3)))
            pat=[1,0,1,1,0,1,1,0]
            for s in range(8):
                tt=t+s*b/2
                if tt>=t1:break
                if pat[s]: add(mus,tt,dhol_lo(),.55)
                if s%2==1: add(mus,tt,dhol_hi(),.7)
                add(mus,tt,shaker(),1)
                pluck(ch[s%3]+12,tt,b*.4,.06)
        bars(t0,t1,128,f)
    elif name=='warm':
        prog=[[53,57,60],[48,52,55],[50,53,57],[46,50,53]]
        def f(t,k,b):
            ch=prog[k%4];pad(ch,t,4*b,.06,att=.6)
            for s in range(8):
                tt=t+s*b/2
                if tt>=t1:break
                pluck(ch[[0,1,2,1,2,1,0,1][s]]+12,tt,b*.7,.09)
                if s%2==1: add(mus,tt,shaker(),.7)
            add(mus,t,tone(mid(ch[0]-12),4*b,.1,att=.05,dec=2),1)
        bars(t0,t1,78,f)
    elif name=='lofi':
        prog=[[50,53,57,60],[43,47,50,53],[48,52,55,59],[45,48,52,55]]
        def f(t,k,b):
            ch=prog[k%4];pad(ch,t,4*b,.04,att=.15,hm=((1,1),(2,.2)))
            for s in range(8):
                tt=t+s*b/2+(.04 if s%2 else 0)
                if tt>=t1:break
                if s in (0,3,4): add(mus,tt,kick(),.42)
                if s in (2,6): add(mus,tt,snare(),.8)
                add(mus,tt,hat(),.9)
                if s in (0,3,5,7): pluck(ch[[0,2,1,3][(s)%4]]+12,tt,b*.5,.08)
            add(mus,t,tone(mid(ch[0]-12),4*b,.12,att=.02,dec=1.8),1)
        bars(t0,t1,84,f)
    elif name=='rail':
        prog=[[55,59,62],[48,52,55],[50,54,57],[48,52,55]]
        def f(t,k,b):
            ch=prog[k%4];pad(ch,t,4*b,.035,att=.1)
            for s in range(12):
                tt=t+s*b/3
                if tt>=t1:break
                if s%3!=1: add(mus,tt,chug(),1)
                if s%3==0: add(mus,tt,tone(mid(ch[(s//3)%3]-12),b*.4,.16,att=.004,dec=.15,harm=((1,1),(2,.5))),1)
                if s==0: add(mus,tt,kick(),.5)
                if s==6: add(mus,tt,kick(),.4)
            for s in (2,6): add(mus,t+s*b/2,pop(900,700,.1),.35)
        bars(t0,t1,112,f)
    elif name=='noir':
        def f(t,k,b):
            pad([28,35,40] if k%2==0 else [26,33,38],t,4*b,.06,att=.8)
            for s,m in ((1,64),(2.5,67),(3.5,60)) if k%2==0 else ((1.5,62),(3,65)):
                tt=t+s*b
                if tt<t1-.2: add(mus,tt,tone(mid(m),1.2,.12,att=.004,dec=.5,harm=((1,1),(2,.3),(3,.1))),1)
            if t<t1-.5: add(mus,t,heart(),.5);add(mus,t+b*1.5,heart(),.4)
        bars(t0,t1,66,f)
segs=META['music'];TLINES=TL['lines']
def at(x): return TLINES[int(x[1:])]['start'] if isinstance(x,str) else x
for i,(nm,st) in enumerate(segs):
    a_=at(st);b_=at(segs[i+1][1]) if i+1<len(segs) else END
    style(nm,a_,min(b_,END))
# ---------- sfx library
def ring():
    o=np.zeros(int(1.0*SR))
    for k in range(2):
        n=int(.18*SR);x=np.arange(n)/SR;o[int(k*.24*SR):int(k*.24*SR)+n]+=(np.sin(2*np.pi*1100*x)+np.sin(2*np.pi*1400*x))*.25*np.minimum(1,x/.005)*np.minimum(1,(.18-x)/.01)
    return np.tile(o,2)
def knock():
    n=int(.18*SR);x=np.arange(n)/SR;return (np.sin(2*np.pi*180*x)*np.exp(-x*30)+noise(.18,.15)*np.exp(-x*40)*.6)
def creak():
    n=int(1.0*SR);x=np.arange(n)/SR;f=300+120*np.sin(2*np.pi*3*x)+200*x;return np.sin(2*np.pi*np.cumsum(f)/SR)*.25*np.sin(np.pi*x)+noise(1.0,.05)*.12*np.sin(np.pi*x)
def sting():
    return S(tone(220,.9,.5,dec=.4,harm=((1,1),(2,.5),(3,.4))),tone(233,.9,.5,dec=.4,harm=((1,1),(2,.5))),whoosh(.3,True)*.5)
def owl():
    return S(tone(420,.35,.3,att=.05,dec=.2),tone(360,.45,.3,att=.05,dec=.3))
def heart():
    n=int(.18*SR);x=np.arange(n)/SR;hb=np.sin(2*np.pi*55*x)*np.exp(-x*22);o=np.zeros(int(.4*SR));o[:n]+=hb;o[int(.19*SR):int(.19*SR)+n]+=hb*.6;return o*1.1
def sad():
    return np.concatenate([tone(f,.28,.35,att=.01,dec=.2,harm=((1,1),(2,.5))) for f in (392,370,349,311)])
def ding(): return S(tone(1976,1.0,.5,dec=.4),tone(2637,1.0,.35,dec=.5),tone(3136,1.0,.2,dec=.5))
def success(): return np.concatenate([tone(mid(m),.16,.35,att=.003,dec=.1,harm=((1,1),(2,.4))) for m in (72,76,79,84)])
def boing():
    n=int(.4*SR);x=np.arange(n)/SR;return np.sin(2*np.pi*np.cumsum(200+500*np.exp(-x*8)*np.abs(np.sin(x*40)))/SR)*np.exp(-x*7)*.5
def laugh():
    o=np.zeros(int(1.0*SR))
    for i in range(5):
        n=int(.12*SR);x=np.arange(n)/SR;s=(np.sin(2*np.pi*(380-i*20)*x)*.4+noise(.12,.3)*.5)*np.exp(-x*18);o[int(i*.17*SR):int(i*.17*SR)+n]+=s
    return o
def buzz():
    n=int(.45*SR);x=np.arange(n)/SR;return np.sign(np.sin(2*np.pi*120*x))*.25*np.minimum(1,(.45-x)/.05)
def dice():
    o=np.zeros(int(.8*SR))
    for i in range(9):
        n=int(.04*SR);x=np.arange(n)/SR;o[int((i*.08+rng.random()*.02)*SR):][:n]+=np.sin(2*np.pi*(600+rng.random()*400)*x)*np.exp(-x*60)*.4
    return o
def cash():
    return S(tone(1568,.5,.4,dec=.15),np.concatenate([np.zeros(int(.09*SR)),tone(2093,.6,.4,dec=.2)]))
def tick(): return tone(1800,.04,.3,att=.001,dec=.02)
def ping(): return S(tone(1568,.5,.5,dec=.15),tone(2093,.6,.4,dec=.2))
LIB={'tick':tick,'owl':owl,'knock':knock,'creak':creak,'sting':sting,'thud':thud,'heart':heart,'whoosh':lambda:whoosh(.4,True),'pop':pop,'pop2':lambda:pop(1400,900,.1)*.6,'sad':sad,'ding':ding,'success':success,'boing':boing,'laugh':laugh,'buzz':buzz,'dice':dice,'ring':ring,'ping':ping,'cash':cash}
for t,ty,g in SFXL:
    f=LIB.get(ty)
    if f: add(sfx,t,f(),.8*g)
fade=np.ones(N);fl=int(1.0*SR);fade[-fl:]=np.linspace(1,0,fl)
def save(n,x):
    x=x/max(1e-9,np.max(np.abs(x)))*.89
    with wave.open(n,'wb') as f: f.setnchannels(1);f.setsampwidth(2);f.setframerate(SR);f.writeframes((x*32767).astype(np.int16).tobytes())
save('music.wav',mus*fade);save('sfx.wav',sfx*fade)
subprocess.run(['ffmpeg','-y','-loglevel','error','-i','voice.mp3','-ar','44100','-ac','1','-af',f'apad=whole_dur={END},atrim=0:{END},highpass=f=70,acompressor=threshold=-20dB:ratio=3,volume=1.4','vo.wav'],check=True)
flt='[2:a]asplit=2[vo][sc];[0:a]volume=0.30[m];[m][sc]sidechaincompress=threshold=0.03:ratio=6:attack=15:release=300[md];[1:a]volume=0.55[s];[md][s][vo]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[out]'
subprocess.run(['ffmpeg','-y','-loglevel','error','-i','music.wav','-i','sfx.wav','-i','vo.wav','-filter_complex',flt,'-map','[out]','-ar','44100','-ac','2','mix.wav'],check=True)
print('audio ok',v,END)
