// ===================== core + glow renderer =====================
const W=1080,H=1920,GY=1400;
const COMIC=true;
const COL=COMIC?{gold:'#ff8a00',gold2:'#ffffff',cyan:'#0096d6',red:'#e63946',green:'#1fb85a',white:'#ffffff',violet:'#7b4dff'}:{gold:'#ffc94d',gold2:'#ffe9a8',cyan:'#4de1ff',red:'#ff4d6d',green:'#6dff9b',white:'#fff4d6',violet:'#b48cff'};
const tint=(c,a=.82)=>{let h=String(c).replace('#','');if(h.length===3)h=h.split('').map(x=>x+x).join('');const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);return `rgb(${Math.round(r+(255-r)*a)},${Math.round(g+(255-g)*a)},${Math.round(b+(255-b)*a)})`};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),lerp=(a,b,s)=>a+(b-a)*s,sm=s=>s*s*(3-2*s),frac=x=>x-Math.floor(x);
const hash=n=>frac(Math.sin(n*127.1+311.7)*43758.5453);
const back=u=>{u=clamp(u,0,1);const c=1.70158;return 1+(c+1)*(u-1)**3+c*(u-1)**2};
const outq=u=>{u=clamp(u,0,1);return 1-(1-u)**3};
const P=(x,y)=>({x,y});
const mk=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
const rc=document.getElementById('reel');rc.width=W;rc.height=H;const X=rc.getContext('2d');
const Gc=mk(W,H),G=Gc.getContext('2d');
const c540=mk(540,960),c270=mk(270,480),c135=mk(135,240);
const g540=c540.getContext('2d'),g270=c270.getContext('2d'),g135=c135.getContext('2d');

function dotted(col,lw=8,gap=14,a=1){G.strokeStyle=col;G.lineWidth=COMIC?Math.max(8,lw*1.15):lw;G.lineCap='round';G.lineJoin='round';G.setLineDash(COMIC?[]:[.01,gap]);G.globalAlpha=a}
function solid(col,lw=4,a=1){G.strokeStyle=col;G.lineWidth=COMIC?Math.max(5,lw*1.1):lw;G.lineCap='round';G.lineJoin='round';G.setLineDash([]);G.globalAlpha=a}
function fillc(col,a=.1){G.fillStyle=col;G.globalAlpha=a}
function poly(pts,close,fill){G.beginPath();pts.forEach((p,i)=>i?G.lineTo(p.x,p.y):G.moveTo(p.x,p.y));if(close)G.closePath();if(fill){const ga=G.globalAlpha;G.fillStyle=COMIC?tint(fill.c):fill.c;G.globalAlpha=COMIC?ga:fill.a;G.fill();G.globalAlpha=ga}G.stroke()}
function rrect(x,y,w,h,r,fill){G.beginPath();G.roundRect(x,y,w,h,r);if(fill){const ga=G.globalAlpha;G.fillStyle=COMIC?tint(fill.c):fill.c;G.globalAlpha=COMIC?ga:fill.a;G.fill();G.globalAlpha=ga}G.stroke()}
function circ(x,y,r,fill,a0=0,a1=Math.PI*2){G.beginPath();G.arc(x,y,Math.max(.1,r),a0,a1);if(fill){const ga=G.globalAlpha;G.fillStyle=COMIC?tint(fill.c):fill.c;G.globalAlpha=COMIC?ga:fill.a;G.fill();G.globalAlpha=ga}G.stroke()}
function line(a,b,c,d){G.beginPath();if(typeof a==='object'){G.moveTo(a.x,a.y);G.lineTo(b.x,b.y)}else{G.moveTo(a,b);G.lineTo(c,d)}G.stroke()}
function gtext(s,x,y,size,col,o={}){const{align='center',font='Baloo 2',weight=800,a=1,rot=0,sc=1,glow=0}=o;G.save();G.setLineDash([]);G.globalAlpha=a;G.translate(x,y);G.rotate(rot);G.scale(sc,sc);
  G.font=`${weight} ${size}px "${font}",Arial`;G.textAlign=align;G.textBaseline='middle';G.fillStyle=col;G.fillText(s,0,0);G.restore()}
const bez=(p0,p1,p2,t)=>P((1-t)**2*p0.x+2*(1-t)*t*p1.x+t*t*p2.x,(1-t)**2*p0.y+2*(1-t)*t*p1.y+t*t*p2.y);
function ik(h,f,a,b,s){const dx=f.x-h.x,dy=f.y-h.y,d0=Math.hypot(dx,dy),d=clamp(d0,1,a+b-.5),th=Math.atan2(dy,dx),al=Math.acos(clamp((a*a+d*d-b*b)/(2*a*d),-1,1));
  return{k:P(h.x+a*Math.cos(th-s*al),h.y+a*Math.sin(th-s*al)),e:P(h.x+d*Math.cos(th),h.y+d*Math.sin(th))}}

let OUTC='#111';const Tc=mk(W,H),Tg=Tc.getContext('2d');
function composeComic(){Tg.globalCompositeOperation='source-over';Tg.clearRect(0,0,W,H);Tg.drawImage(Gc,0,0);Tg.globalCompositeOperation='source-in';Tg.fillStyle=OUTC;Tg.fillRect(0,0,W,H);
  X.save();X.globalCompositeOperation='source-over';for(let i=0;i<16;i++){const a=i/16*6.2832;X.drawImage(Tc,Math.cos(a)*7,Math.sin(a)*7)}for(let i=0;i<8;i++){const a=i/8*6.2832+.4;X.drawImage(Tc,Math.cos(a)*3.5,Math.sin(a)*3.5)}
  X.drawImage(Gc,0,0);X.restore()}
function compose(){if(COMIC)return composeComic(); // G (neon layer) -> X with bloom
  g540.clearRect(0,0,540,960);g540.drawImage(Gc,0,0,540,960);
  g270.clearRect(0,0,270,480);g270.drawImage(c540,0,0,270,480);
  g135.clearRect(0,0,135,240);g135.filter='blur(1.2px)';g135.drawImage(c270,0,0,135,240);g135.filter='none';
  X.save();X.globalCompositeOperation='lighter';
  X.globalAlpha=.95;X.drawImage(c135,0,0,W,H);
  X.globalAlpha=.7;X.drawImage(c270,0,0,W,H);
  X.globalAlpha=1;X.drawImage(Gc,0,0);X.restore()}

// ===================== tracks =====================
function interp(tr,T,def=0){if(!tr||!tr.length)return def;if(T<=tr[0][0])return tr[0][1];
  for(let i=0;i<tr.length-1;i++){const a=tr[i],b=tr[i+1];if(T<b[0]){const u=(T-a[0])/(b[0]-a[0]);const e=b[2]==='lin'?u:b[2]==='back'?back(u):b[2]==='out'?outq(u):sm(u);return lerp(a[1],b[1],e)}}
  return tr[tr.length-1][1]}
function stepv(tr,T,def){let v=def;if(tr)for(const k of tr){if(k[0]<=T)v=k[1];else break}return v}
function inAny(iv,T){return !!iv&&iv.some(([a,b])=>T>=a&&T<=b)}

// ===================== characters =====================
const A1=92,A2=88,T1=98,T2=96,TORSO=150,HR=50,DC=300,SC=1.2;
const base={lean:.03,tilt:0,hA:[26,148],hB:[-14,148],ph:null,sw:0,osc:null};
const POSES={idle:{sw:1},
 walkPhone:{lean:.08,hA:[78,56],hB:[-14,148],ph:'A',sw:0.5},
 ear:{lean:-.02,hA:[26,-30],hB:[-10,150],ph:'A'},
 earBeck:{lean:.1,hA:[26,-30],hB:[118,-28],ph:'A',osc:{B:[18,14,7]}},
 earRub:{lean:.04,hA:[26,-30],hB:[34,-40],ph:'A',osc:{B:[6,5,5]}},
 phoneLook:{lean:.13,tilt:.22,hA:[80,60],hB:[48,74],ph:'A'},
 shock:{lean:-.14,tilt:-.12,hA:[40,-92],hB:[-30,-90]},
 point:{lean:.06,hA:[176,-30],hB:[-14,148]},
 pointUp:{lean:-.04,hA:[96,-190],hB:[-14,148]},
 idea:{lean:-.05,tilt:-.08,hA:[52,-188],hB:[26,-30],ph:'B'},
 wave:{lean:-.02,hA:[94,-152],hB:[-14,148],osc:{A:[22,16,8]}},
 fist:{lean:.1,tilt:.05,hA:[132,-62],hB:[96,-40],osc:{A:[6,6,22],B:[6,6,19]}},
 cheer:{lean:-.1,hA:[86,-176],hB:[-58,-172]},
 explain:{lean:.04,hA:[128,6],hB:[96,30],osc:{A:[10,14,5],B:[8,10,6]}},
 slump:{lean:.2,tilt:.28,hA:[14,150],hB:[-8,152],sw:1},
 hips:{lean:.0,hA:[50,48],hB:[-40,52]},
 shrug:{hA:[112,36],hB:[-70,36]}};
for(const k in POSES)POSES[k]={...base,...POSES[k]};
function lerpPose(a,b,u){const o={};for(const k of ['lean','tilt'])o[k]=lerp(a[k],b[k],u);o.hA=[lerp(a.hA[0],b.hA[0],u),lerp(a.hA[1],b.hA[1],u)];o.hB=[lerp(a.hB[0],b.hB[0],u),lerp(a.hB[1],b.hB[1],u)];
  o.sw=lerp(a.sw,b.sw,u);o.ph=u>.5?b.ph:a.ph;o.osc=u>.5?b.osc:a.osc;return o}
function poseAt(tr,T){let k=0;for(let i=0;i<tr.length;i++)if(tr[i][0]<=T)k=i;const cur=tr[k],prev=tr[Math.max(0,k-1)];const d=cur[2]||.3;
  return lerpPose(POSES[prev[1]],POSES[cur[1]],k===0?1:sm(clamp((T-cur[0])/d,0,1)))}

function cstate(ch,T){
  const x=interp(ch.x,T),face=stepv(ch.face,T,1),vis=interp(ch.vis,T,1);
  const spd=Math.abs(interp(ch.x,T+.05)-interp(ch.x,T-.05))/.1,wk=clamp(spd/70,0,1);
  const ps=poseAt(ch.pose,T),jy=interp(ch.jy,T,0),dip=interp(ch.dip,T,0),trem=interp(ch.trem,T,0);
  const tx=trem*Math.sin(T*63),ty=trem*.6*Math.sin(T*71+1);
  const ph=(x*face)/DC,bob=wk*Math.abs(Math.sin(Math.PI*2*ph))*-9,br=Math.sin(T*2.3+ch.seed)*2.5*(1-wk);
  const hipY=GY-182+dip-jy+bob+br+ty,lean=ps.lean+.06*wk,tilt=ps.tilt;
  const hip=P(tx,hipY),sh=P(hip.x+Math.sin(lean)*TORSO,hip.y-Math.cos(lean)*TORSO);
  const l2=lean+tilt,hc=P(sh.x+Math.sin(l2)*(HR+14),sh.y-Math.cos(l2)*(HR+14));
  // legs
  const legs=[0,.5].map((off,i)=>{const p=frac(ph+off);let fx,lift;
    if(p<.5){fx=DC/4-p*DC;lift=0}else{const s=(p-.5)/.5;fx=lerp(-DC/4,DC/4,sm(s));lift=Math.sin(Math.PI*s)*46}
    const rest=i?[-22,0]:[22,0];const tuck=clamp(jy/90,0,1)*38;
    const fxx=lerp(rest[0],fx*.8+(i?-6:6),wk),fl=lerp(0,lift,wk)+jy+tuck;
    const foot=P(fxx+tx,GY-fl);const r=ik(P(hip.x+(i?-5:5),hip.y),foot,T1,T2,1);return{k:r.k,f:r.e,h:P(hip.x+(i?-5:5),hip.y)}});
  // arms
  const sw=Math.sin(Math.PI*2*ph)*60*wk*ps.sw;
  const osc=(h,key)=>{const o=ps.osc&&ps.osc[key];return o?[Math.sin(T*o[2])*o[0],Math.cos(T*o[2]*1.3)*o[1]]:[0,0]};
  const hA0=osc(0,'A'),hB0=osc(0,'B');
  const tA=P(sh.x+ps.hA[0]+hA0[0]+sw*.0,sh.y+ps.hA[1]+hA0[1]),tB=P(sh.x+ps.hB[0]+hB0[0]-sw*.9,sh.y+ps.hB[1]+hB0[1]);
  const tA2=ps.sw>0?P(tA.x+sw*(ps.sw>0.9?.9:.4),tA.y):tA;
  const aA=ik(sh,tA2,A1,A2,-1),aB=ik(sh,tB,A1,A2,-1);
  // phone
  let phone=null;if(ps.ph){const a=ps.ph==='A'?aA:aB;const dx=a.e.x-a.k.x,dy=a.e.y-a.k.y,L=Math.hypot(dx,dy)||1;phone={hand:a.e,dir:P(dx/L,dy/L)}}
  return{x,face,vis,wk,ps,hip,sh,hc,legs,aA,aB,phone,jy,T,seed:ch.seed,sc:interp(ch.sc,T,1),
    w:p=>P(x+face*p.x*SC,GY-(GY-p.y)*SC)}}

function drawChar(ch,T){
  if(COMIC)return drawCharComic(ch,T);
  const s=cstate(ch,T);if(s.vis<=.01)return s;const col=ch.col,f=s.face,a=s.vis;
  G.save();G.translate(s.x,GY);G.scale(f*s.sc*SC,s.sc*SC);G.translate(0,-GY);
  if(s.vis<1){G.translate(0,(1-s.vis)*40)}
  const jit=ch.glitch&&T<ch.glitch[1]&&T>ch.glitch[0]?(hash(Math.floor(T*40))-.5)*26:0;G.translate(jit,0);
  const bk=.5*a,fr=a;
  // back leg + arm
  dotted(col,9,14,bk);poly([s.legs[1].h,s.legs[1].k,s.legs[1].f],false);line(s.legs[1].f,P(s.legs[1].f.x+26,s.legs[1].f.y));
  poly([s.sh,s.aB.k,s.aB.e],false);
  // torso
  const l=Math.atan2(s.sh.x-s.hip.x,s.hip.y-s.sh.y),pp=P(Math.cos(l),Math.sin(l));
  const torso=[P(s.sh.x+pp.x*30,s.sh.y+pp.y*30),P(s.sh.x-pp.x*30,s.sh.y-pp.y*30),P(s.hip.x-pp.x*26,s.hip.y-pp.y*26),P(s.hip.x+pp.x*26,s.hip.y+pp.y*26)];
  dotted(col,9,14,fr);poly(torso,true,{c:col,a:.07*a});
  if(ch.kind==='ramesh'){solid(col,5,.7*a);line(P(s.sh.x-4,s.sh.y+4),P(s.sh.x+6,s.sh.y+34));line(P(s.sh.x+6,s.sh.y+34),P(s.sh.x+16,s.sh.y+4)); // collar
    dotted(col,7,13,.8*a);for(let i=0;i<4;i++)circ(lerp(s.sh.x,s.hip.x,.3+i*.17)+4,lerp(s.sh.y,s.hip.y,.3+i*.17),1.5)} // buttons
  else{solid(col,5,.8*a);line(P(s.sh.x-10,s.sh.y+10),P(s.hip.x+10,s.hip.y-40));line(P(s.sh.x+10,s.sh.y+10),P(s.hip.x-6,s.hip.y-40))}
  // front leg
  dotted(col,9,14,fr);poly([s.legs[0].h,s.legs[0].k,s.legs[0].f],false);line(s.legs[0].f,P(s.legs[0].f.x+26,s.legs[0].f.y));
  // neck + head
  dotted(col,9,14,fr);line(s.sh,P(lerp(s.sh.x,s.hc.x,.5),lerp(s.sh.y,s.hc.y,.5)));
  circ(s.hc.x,s.hc.y,HR,{c:col,a:.06*a});
  head(ch,s,T,a);
  // front arm (over body)
  dotted(col,9,14,fr);poly([s.sh,s.aA.k,s.aA.e],false);
  // hands
  solid(col,5,fr);circ(s.aA.e.x,s.aA.e.y,7,{c:col,a:.5});circ(s.aB.e.x,s.aB.e.y,7,{c:col,a:.5});
  G.restore();
  return s}

function head(ch,s,T,a){const col=ch.col,hc=s.hc,ex=stepv(ch.ex,T,'neutral'),talk=inAny(ch.talk,T);
  const ls=ch.look?interp(ch.look,T,0):0;
  if(ch.kind==='ramesh'){dotted(col,8,12,.9*a);G.beginPath();G.arc(hc.x,hc.y,HR+3,Math.PI*1.12,Math.PI*1.92);G.stroke();solid(col,6,.9*a);line(P(hc.x-26,hc.y-36),P(hc.x-8,hc.y-46)); // hair
    G.beginPath();G.arc(hc.x-HR+8,hc.y-6,9,Math.PI*.5,Math.PI*1.5);G.stroke()}
  else{dotted(col,8,12,.95*a);G.beginPath();G.arc(hc.x-6,hc.y-4,HR+13,Math.PI*.78,Math.PI*1.9);G.stroke();solid(col,6,.7*a);G.beginPath();G.moveTo(hc.x+HR*.5,hc.y-HR-6);G.quadraticCurveTo(hc.x+HR*.9,hc.y-HR*.6,hc.x+HR*.78,hc.y-HR*.2);G.stroke()}
  // eyes
  const bl=frac((T+ch.seed)/3.3)<.04?.15:1,eyeR=ex==='shock'?7.5:5.5,ec=ch.kind==='ramesh'?COL.white:COL.red;
  [[12,-6],[31,-6]].forEach(([ox,oy])=>{solid(ec,4,a);G.beginPath();G.ellipse(hc.x+ox,hc.y+oy,eyeR,eyeR*bl,0,0,7);G.fillStyle=ec;G.globalAlpha=.9*a;G.fill();G.stroke();
    if(ex==='shock'||ch.kind==='ramesh'){G.fillStyle='#000';G.globalAlpha=a;G.beginPath();G.arc(hc.x+ox+2+ls*2,hc.y+oy,eyeR*.42,0,7);G.fill()}});
  // brows
  const bw={neutral:[0,0],worried:[-.5,.5],shock:[0,0],angry:[.55,-.55],evil:[.45,-.45],smile:[0,0],happy:[-.1,.1]}[ex]||[0,0];const by=ex==='shock'?-27:-20;
  solid(ec,5,.9*a);[[12,1],[31,-1]].forEach(([ox,sg],i)=>{const ang=i?bw[1]:bw[0];line(P(hc.x+ox-9,hc.y+by+ang*9*-1),P(hc.x+ox+9,hc.y+by+ang*9))});
  // mouth
  const mx=hc.x+22,my=hc.y+21;solid(ec,5,a);
  if(talk&&ex!=='evil'){const o=.25+.75*Math.abs(Math.sin(T*13+ch.seed*2));G.beginPath();G.ellipse(mx,my,8+o*3,3+o*10,0,0,7);G.fillStyle=ec;G.globalAlpha=.25*a;G.fill();G.globalAlpha=a;G.stroke()}
  else if(ex==='shock'){G.beginPath();G.ellipse(mx,my+2,9,13,0,0,7);G.stroke()}
  else if(ex==='worried'){G.beginPath();G.moveTo(mx-11,my+4);G.quadraticCurveTo(mx,my-6,mx+11,my+4);G.stroke()}
  else if(ex==='angry'){G.beginPath();G.moveTo(mx-11,my+6);G.quadraticCurveTo(mx,my-4,mx+11,my+6);G.stroke();}
  else if(ex==='evil'){const o=talk?Math.abs(Math.sin(T*12))*5:0;G.beginPath();G.moveTo(mx-14,my-2);G.quadraticCurveTo(mx,my+16+o,mx+16,my-4);G.stroke();solid(ec,3,.9*a);for(let i=-1;i<=2;i++)line(P(mx+i*6-1,my+2),P(mx+i*6-1,my+8+o*.4))}
  else if(ex==='smile'||ex==='happy'){G.beginPath();G.moveTo(mx-12,my-3);G.quadraticCurveTo(mx,my+(ex==='happy'?18:11),mx+13,my-3);G.stroke()}
  else{line(P(mx-9,my),P(mx+9,my))}
  if(ch.kind==='ramesh'){solid(col,6,.95*a);G.beginPath();G.moveTo(mx-12,my-9);G.quadraticCurveTo(mx+2,my-14,mx+20,my-8);G.stroke()}} // moustache

function phoneShape(cx,cy,rot,col,T,{ring=0,on=1,sc=1}={}){G.save();G.translate(cx+(ring?Math.sin(T*90)*4*ring:0),cy);G.rotate(rot+(ring?Math.sin(T*70)*.1*ring:0));G.scale(sc,sc);
  dotted(col,7,12,1);rrect(-32,-56,64,112,12,{c:col,a:.14*on});solid(col,4,.9);line(-14,-44,14,-44);circ(0,46,4);
  if(on){G.fillStyle=col;G.globalAlpha=.22*on*(ring?.6+.4*Math.sin(T*30):1);G.fillRect(-24,-34,48,72)}G.restore()}

// ===================== comic characters =====================
function limb(pts,lw,col,a=1){G.lineCap='round';G.lineJoin='round';G.setLineDash([]);G.globalAlpha=a;G.strokeStyle='#111';G.lineWidth=lw+9;G.beginPath();pts.forEach((p,i)=>i?G.lineTo(p.x,p.y):G.moveTo(p.x,p.y));G.stroke();G.strokeStyle=col;G.lineWidth=lw;G.stroke()}
function blob(x,y,r,fill,a=1,lw=6){G.setLineDash([]);G.globalAlpha=a;G.beginPath();G.arc(x,y,r,0,7);G.fillStyle=fill;G.fill();G.strokeStyle='#111';G.lineWidth=lw;G.stroke()}
function ink(w=6,a=1){G.setLineDash([]);G.strokeStyle='#111';G.lineWidth=w;G.lineCap='round';G.lineJoin='round';G.globalAlpha=a}
function drawCharComic(ch,T){
  const s=cstate(ch,T);if(s.vis<=.01)return s;const f=s.face,pl=ch.pal,a=s.vis;
  G.save();G.translate(s.x,GY);G.scale(f*s.sc*SC,s.sc*SC);G.translate(0,-GY);
  if(s.vis<1)G.translate(0,(1-s.vis)*40);
  const jit=ch.glitch&&T<ch.glitch[1]&&T>ch.glitch[0]?(hash(Math.floor(T*40))-.5)*26:0;G.translate(jit,0);G.globalAlpha=a;
  const L0=s.legs[0],L1=s.legs[1];
  // back leg + back arm
  limb([L1.h,L1.k,L1.f],28,pl.pantsD,a);limb([L1.f,P(L1.f.x+30,L1.f.y)],20,pl.shoe,a);
  limb([s.sh,s.aB.k,s.aB.e],24,pl.shirtD,a);blob(s.aB.e.x,s.aB.e.y,12,pl.skin,a);
  // torso
  const l=Math.atan2(s.sh.x-s.hip.x,s.hip.y-s.sh.y),pp=P(Math.cos(l),Math.sin(l));
  const tor=[P(s.sh.x+pp.x*38,s.sh.y+pp.y*38),P(s.sh.x-pp.x*38,s.sh.y-pp.y*38),P(s.hip.x-pp.x*32,s.hip.y-pp.y*32),P(s.hip.x+pp.x*32,s.hip.y+pp.y*32)];
  G.globalAlpha=a;G.beginPath();tor.forEach((p,i)=>i?G.lineTo(p.x,p.y):G.moveTo(p.x,p.y));G.closePath();G.fillStyle=pl.shirt;G.fill();ink(7,a);G.stroke();
  if(ch.kind==='ramesh'){ink(5,a);G.beginPath();G.moveTo(s.sh.x-6,s.sh.y+2);G.lineTo(s.sh.x+8,s.sh.y+36);G.lineTo(s.sh.x+22,s.sh.y+2);G.stroke();
    G.fillStyle=pl.tie;G.beginPath();G.moveTo(s.sh.x+4,s.sh.y+30);G.lineTo(s.sh.x+14,s.sh.y+34);G.lineTo(s.sh.x+16,s.sh.y+88);G.lineTo(s.sh.x+6,s.sh.y+96);G.closePath();G.fill();G.stroke()}
  else{ink(6,a);G.beginPath();G.moveTo(lerp(s.sh.x,s.hip.x,.55)-24,lerp(s.sh.y,s.hip.y,.55));G.lineTo(lerp(s.sh.x,s.hip.x,.55)+24,lerp(s.sh.y,s.hip.y,.55));G.stroke()}
  // front leg
  limb([L0.h,L0.k,L0.f],28,pl.pants,a);limb([L0.f,P(L0.f.x+30,L0.f.y)],20,pl.shoe,a);
  // neck + head
  limb([P(lerp(s.sh.x,s.hc.x,.1),lerp(s.sh.y,s.hc.y,.1)),P(lerp(s.sh.x,s.hc.x,.7),lerp(s.sh.y,s.hc.y,.7))],26,pl.skin,a);
  headComic(ch,s,T,a);if(ch.acc){G.globalAlpha=a;ch.acc(s,T,a)}
  // front arm
  limb([s.sh,s.aA.k,s.aA.e],24,pl.shirt,a);blob(s.aA.e.x,s.aA.e.y,12,pl.skin,a);
  G.restore();return s}
function headComic(ch,s,T,a){const hc=s.hc,pl=ch.pal,ex=stepv(ch.ex,T,'neutral'),talk=inAny(ch.talk,T),hd=ch.hd||(ch.kind==='scammer'?'hood':'ramesh'),sc=hd==='hood';
  const bl=frac((T+ch.seed)/3.3)<.04?.12:1;
  if(hd==='ghost'){G.globalAlpha=a;G.beginPath();G.ellipse(hc.x-2,hc.y-6,HR+16,HR+24,0,0,7);G.fillStyle=pl.hood;G.fill();ink(7,a);G.stroke();
    [[10,-10],[36,-10]].forEach(([dx,dy])=>{G.beginPath();G.ellipse(hc.x+dx,hc.y+dy,13,15*bl,0,0,7);G.fillStyle='#111';G.fill();G.beginPath();G.arc(hc.x+dx+2,hc.y+dy,5,0,7);G.fillStyle='#ff3b3b';G.fill()});
    G.beginPath();if(talk){const o=Math.abs(Math.sin(T*13));G.ellipse(hc.x+23,hc.y+26,10+o*4,6+o*12,0,0,7)}else{G.ellipse(hc.x+23,hc.y+28,12,8,0,0,7)}G.fillStyle='#111';G.fill();return}
  if(hd==='robot'){G.globalAlpha=a;G.beginPath();G.roundRect(hc.x-HR-4,hc.y-HR+6,2*HR+8,2*HR-6,22);G.fillStyle=pl.skin;G.fill();ink(7,a);G.stroke();
    ink(6,a);G.beginPath();G.moveTo(hc.x+4,hc.y-HR+6);G.lineTo(hc.x+4,hc.y-HR-20);G.stroke();blob(hc.x+4,hc.y-HR-26,9,pl.tie||'#e63946',a,5);
    G.beginPath();G.roundRect(hc.x-HR+6,hc.y-HR+18,2*HR-8,HR+6,14);G.fillStyle='#16213a';G.fill();ink(5,a);G.stroke();
    const er=ex==='shock'?15:11;[[-8,-4],[22,-4]].forEach(([dx,dy])=>{G.beginPath();G.roundRect(hc.x+dx+4-er*.5,hc.y+dy-er*bl*.9,er*1.3,er*1.8*bl,5);G.fillStyle=ex==='angry'?'#ff5a5a':'#41e3ff';G.globalAlpha=a;G.fill()});
    ink(5,a);G.strokeStyle='#41e3ff';G.lineWidth=5;if(talk){for(let i=-2;i<=2;i++){const h=4+Math.abs(Math.sin(T*14+i*1.7))*12;G.beginPath();G.moveTo(hc.x+11+i*9,hc.y+HR*.55-h/2);G.lineTo(hc.x+11+i*9,hc.y+HR*.55+h/2);G.stroke()}}else{G.beginPath();G.moveTo(hc.x-2,hc.y+HR*.55);G.lineTo(hc.x+24,hc.y+HR*.55);G.stroke()}
    return}
  if(sc){blob(hc.x-8,hc.y-2,HR+14,pl.hood,a,7)}
  blob(sc?hc.x+8:hc.x,sc?hc.y+4:hc.y,sc?HR-4:HR,pl.skin,a,7);
  if(hd==='ramesh'){G.globalAlpha=a;G.fillStyle=pl.hair;G.beginPath();G.arc(hc.x,hc.y,HR+3,Math.PI*1.04,Math.PI*1.93);G.lineTo(hc.x+14,hc.y-HR+8);G.quadraticCurveTo(hc.x-4,hc.y-HR+22,hc.x-HR+2,hc.y-12);G.closePath();G.fill();ink(5,a);G.stroke()}
  const ox=sc?8:0,oy=sc?4:0,er=ex==='shock'?15:12;
  [[10,-6],[32,-6]].forEach(([dx,dy])=>{const ex_=hc.x+ox+dx,ey=hc.y+oy+dy;G.globalAlpha=a;G.beginPath();G.ellipse(ex_,ey,er,er*1.12*bl,0,0,7);G.fillStyle='#fff';G.fill();ink(4.5,a);G.stroke();
    G.fillStyle=sc?'#e63946':'#111';G.beginPath();G.arc(ex_+3+(ch.look?interp(ch.look,T,0):0)*2,ey,er*.46*(bl>.5?1:0),0,7);G.fill()});
  const bw={neutral:[0,0],worried:[-.6,.6],shock:[0,0],angry:[.7,-.7],evil:[.6,-.6],smile:[0,0],happy:[-.1,.1]}[ex]||[0,0],by=(ex==='shock'?-34:-27)+oy;ink(7,a);
  [[10,0],[32,1]].forEach(([dx,i])=>{const an=bw[i],bx=hc.x+ox+dx;G.beginPath();G.moveTo(bx-12,hc.y+by-an*11);G.lineTo(bx+12,hc.y+by+an*11);G.stroke()});
  const mx=hc.x+ox+22,my=hc.y+oy+26;ink(5.5,a);
  if(talk&&ex!=='evil'){const o=.3+.7*Math.abs(Math.sin(T*13+ch.seed*2));G.beginPath();G.ellipse(mx,my,10+o*3,4+o*11,0,0,7);G.fillStyle='#7a1f2b';G.fill();G.stroke()}
  else if(ex==='shock'){G.beginPath();G.ellipse(mx,my+2,10,15,0,0,7);G.fillStyle='#7a1f2b';G.fill();G.stroke()}
  else if(ex==='worried'){G.beginPath();G.moveTo(mx-13,my+5);G.quadraticCurveTo(mx,my-7,mx+13,my+5);G.stroke()}
  else if(ex==='angry'){G.beginPath();G.moveTo(mx-13,my+7);G.quadraticCurveTo(mx,my-5,mx+13,my+7);G.stroke()}
  else if(ex==='evil'){const o=talk?Math.abs(Math.sin(T*12))*6:0;G.beginPath();G.moveTo(mx-16,my-4);G.quadraticCurveTo(mx,my+20+o,mx+18,my-6);G.closePath();G.fillStyle='#fff';G.fill();G.stroke();ink(3,a);for(let i=-1;i<=2;i++){G.beginPath();G.moveTo(mx+i*7-1,my);G.lineTo(mx+i*7-1,my+8+o*.5);G.stroke()}}
  else if(ex==='smile'||ex==='happy'){G.beginPath();G.moveTo(mx-14,my-4);G.quadraticCurveTo(mx,my+(ex==='happy'?24:14),mx+15,my-4);if(ex==='happy'){G.closePath();G.fillStyle='#7a1f2b';G.fill()}G.stroke()}
  else{G.beginPath();G.moveTo(mx-10,my);G.lineTo(mx+10,my);G.stroke()}
  if(!sc&&!ch.nm){G.globalAlpha=a;G.fillStyle='#111';G.beginPath();G.ellipse(mx+4,my-10,hd==='shop'?27:21,hd==='shop'?9:7,-.08,0,7);G.fill()}
  if(hd==='cap'){G.globalAlpha=a;G.beginPath();G.arc(hc.x,hc.y-2,HR+5,Math.PI*1.02,Math.PI*1.98);G.closePath();G.fillStyle=pl.hat||'#1e3a8a';G.fill();ink(6,a);G.stroke();
    G.beginPath();G.roundRect(hc.x-6,hc.y-HR+6,HR+24,12,6);G.fill();G.stroke();blob(hc.x+8,hc.y-HR-10,7,'#ffd23f',a,3)}
  if(hd==='shop'){G.globalAlpha=a;G.beginPath();G.arc(hc.x,hc.y-4,HR-4,Math.PI*1.12,Math.PI*1.88);G.closePath();G.fillStyle='#fff';G.fill();ink(6,a);G.stroke()}}
