// Generic spec-driven story for RKK reels. Needs window.SPEC (spec.js) + window.TLDATA (timeline.js) + sets.js.
// SPEC.lines[i] = {who, text, set?, cast?, pose?{K:pose}, ex?{K:expr}, burst?, card?[title, l1, l2], fx?}
// set / cast carry over from the previous line when omitted.
const SPEC=window.SPEC;
const SERIES={
  flat7: {name:'FLAT NO. 7', sub:'सस्पेंस', col:'#e63946', fill:'#1a0d12', ink:'#ff6b6b', txt:'#ffe9e9', hl:'#ffd23f'},
  ai:    {name:'RAMESH vs AI', sub:'सच का स्कैनर', col:'#0096d6', fill:'#071a2a', ink:'#4dc3ff', txt:'#e6f6ff', hl:'#7cff9b'},
  comedy:{name:'COMEDY', sub:'कॉमेडी', col:'#8a3bff', fill:'#180a38', ink:'#b58bff', txt:'#ece3ff', hl:'#7cff9b'},
  kahani:{name:'RAMESH KI KAHANI', sub:'नई सीरीज़', col:'#ff4d6d', fill:'#220b14', ink:'#ff8fa3', txt:'#ffe9ee', hl:'#ffd23f'},
  dil:   {name:'DIL SE', sub:'दिल की कहानी', col:'#ff8c42', fill:'#24120a', ink:'#ffb07a', txt:'#fff0e3', hl:'#ffd23f'},
};
const SER=SERIES[SPEC.series]||SERIES.comedy;
const META={name:SPEC.badge||SER.name, sub:SPEC.sname||SER.sub, ep:SPEC.ep||'', col:SER.col};
// ---- per-reel look: picked from the reel id, so every reel looks a bit different but re-renders identically
const SEED=(()=>{let h=0;for(const c of String(SPEC.id||'x'))h=(h*31+c.charCodeAt(0))%100003;return h})();
const pick=(arr,salt)=>arr[Math.floor(hash(SEED*7.13+salt*3.7)*arr.length)%arr.length];
const HL=pick(['#ffd23f','#7cff9b','#4dd8ff','#ffd23f','#ff9ecb'],1);
const STY={frame:pick(['none','none','cine'],4),
  grade:pick(['none','warm','cool','none','dusk'],5), trans:pick(['flash','wipe','iris','slide'],6), slots:pick(['std','tight','wide'],7),
  cover:pick(['center','band','sticker'],8), cam:pick(['cinema','cinema','push'],9)};
const THEME={hl:HL};
// v2 rule (17 Nov): captions = small plain text, no box, never over a face; sit in the floor zone
const CAPS={mode:'none',font:'800 60px "Baloo 2",Arial',size:60,rowh:74,maxw:880,txt:'#fff',ink:'#111',hlw:11,hl:HL,hls:null,sh:0,lw:0,pad:40};
CAPY=1705;
const CHPS={fill:SER.fill,ink:SER.ink,sh:'#000',a:SER.txt,b:SER.ink,r:.5};
PS={ink:'#0a0d2a',lw:9};

const CASTDEF={
  R:{kind:'ramesh',hd:'ramesh',seed:1,pal:{skin:'#f2b48a',shirt:'#ffffff',shirtD:'#e9edf2',pants:'#2f5bd2',pantsD:'#2449ad',shoe:'#7a3b12',hair:'#111',hood:'#222',tie:'#e63946'}},
  B:{kind:'scammer',hd:'robot',seed:7,sc:[[0,.92]],pal:{skin:'#c9d6e8',shirt:'#5b8def',shirtD:'#4a78d6',pants:'#3d4f7a',pantsD:'#2f3e63',shoe:'#222',hair:'#111',hood:'#222',tie:'#e63946'}},
  W:{kind:'ramesh',hd:'ramesh',nm:true,acc:accBindi('#2b1b12'),seed:6,sc:[[0,.95]],pal:{skin:'#e7a87c',shirt:'#d63384',shirtD:'#b02a6e',pants:'#d63384',pantsD:'#b02a6e',shoe:'#7a3b12',hair:'#2b1b12',hood:'#222',tie:'#ffd23f'}},
  A:{kind:'ramesh',hd:'ramesh',nm:true,acc:accBun('#555'),seed:5,pal:{skin:'#d9966a',shirt:'#7b2cbf',shirtD:'#5a189a',pants:'#7b2cbf',pantsD:'#5a189a',shoe:'#6b4a2a',hair:'#555',hood:'#222',tie:'#7b2cbf'}},
  K:{kind:'ramesh',hd:'cap',seed:4,pal:{skin:'#c98b5c',shirt:'#8d7b4a',shirtD:'#72633a',pants:'#5a4e2e',pantsD:'#463c22',shoe:'#222',hair:'#cfcfcf',hood:'#222',tie:'#8d7b4a',hat:'#5a4e2e'}},
  M:{kind:'ramesh',hd:'ramesh',acc:accGlasses(),seed:2,sc:[[0,1.06]],pal:{skin:'#e0a97a',shirt:'#264653',shirtD:'#1d3641',pants:'#222',pantsD:'#111',shoe:'#111',hair:'#555',hood:'#222',tie:'#e63946'}},
  F:{kind:'ramesh',hd:'ramesh',seed:3,pal:{skin:'#c98a5a',shirt:'#2a9d8f',shirtD:'#238579',pants:'#264653',pantsD:'#1d3641',shoe:'#333',hair:'#111',hood:'#222',tie:'#2a9d8f'}},
  D:{kind:'ramesh',hd:'ramesh',nm:true,acc:accBun('#f1f1f1'),seed:5,sc:[[0,.94]],pal:{skin:'#d9966a',shirt:'#f4e9c9',shirtD:'#d8c99b',pants:'#f4e9c9',pantsD:'#d8c99b',shoe:'#6b4a2a',hair:'#f1f1f1',hood:'#222',tie:'#f4e9c9'}},
  U:{kind:'ramesh',hd:'ramesh',acc:accGlasses(),seed:4,sc:[[0,1.1]],pal:{skin:'#e0a97a',shirt:'#9c2f2f',shirtD:'#7e2323',pants:'#4b3b2a',pantsD:'#352a1d',shoe:'#222',hair:'#555',hood:'#222',tie:'#9c2f2f'}},
  C:{kind:'ramesh',hd:'ramesh',nm:true,seed:8,sc:[[0,.62]],pal:{skin:'#e7a87c',shirt:'#ffd166',shirtD:'#e0b44c',pants:'#118ab2',pantsD:'#0d6d8d',shoe:'#333',hair:'#2b1b12',hood:'#222',tie:'#ffd166'}},
};
const POSE_OK=new Set(['idle','ear','shock','point','pointUp','idea','slump','cheer','explain','wave','walkPhone']);
const EX_OK=new Set(['neutral','worried','happy','shock','angry','evil','sad','smile']);
const SLOTS=({std:{1:[430],2:[320,770],3:[210,540,870]},tight:{1:[540],2:[380,710],3:[250,540,830]},wide:{1:[400],2:[270,820],3:[190,540,890]}})[STY.slots];

const fxOf=ln=>Array.isArray(ln.fx)?ln.fx:(ln.fx?[ln.fx]:[]);
function lineAt(T){const N=SPEC.lines.length;let i=0;for(let k=0;k<N;k++){if((k?LS(k):0)<=T)i=k;else break}return i}
let COVER_T=1.35;
function focusX(k,T){const c=CH[k];if(!c)return 540;const st=cstate(c,T);return st&&st.vis>.3?st.x:540}
function camFor(T){const i=lineAt(T),ln=SPEC.lines[i],t0=i?LS(i):0,t1=Math.max(t0+.5,LE(i)),u=clamp((T-t0)/(t1-t0),0,1);
  const f=fxOf(ln);let z=1+.045*sm(u),cx=540,cy=1050,sx=0,sy=0;
  if(T<COVER_T){return {z:1.12,cx:540,cy:1250,sx:0,sy:0}}
  if(STY.cam==='cinema'){const newScene=SCENES.some(c=>c.t0>0&&Math.abs(c.t0-t0)<.05);
    const hasCard=!!(ln.show||ln.card);let shot=newScene||i===0?'wide':pick(['wide','med','med','close'],20+i);
    if(hasCard&&shot==='close')shot='med';
    const fx=CASTDEF[ln.who]?clamp(540+(focusX(ln.who,T)-540)*.6,430,650):540;
    if(shot==='med'){z=1.13+.03*sm(u);cx=fx;cy=1000}else if(shot==='close'){z=1.3+.03*sm(u);cx=fx;cy=880}}
  const punch=f.includes('zoom')||((ln.ex||{}).R==='shock')||(ln.ex&&Object.values(ln.ex).includes('shock'));
  if(punch)z+= .09*back(clamp((T-t0)/.35,0,1))*(1-.4*u);
  if(f.includes('shake')||punch){const k=clamp(1-(T-t0)/.6,0,1);sx=(hash(Math.floor(T*30))-.5)*22*k;sy=(hash(Math.floor(T*30)+7)-.5)*16*k}
  if(i%2)cx=560;else cx=520;
  return {z,cx,cy,sx,sy}}
function applyCam(T){const c=camFor(T);X.setTransform(c.z,0,0,c.z,c.cx-c.cx*c.z+c.sx,c.cy-c.cy*c.z+c.sy)}
function winFx(T,mode){const x=770,y=430,w=230,h=270;X.save();
  const g=X.createRadialGradient(x+w/2,y+h/2,20,x+w/2,y+h/2,320);g.addColorStop(0,'rgba(255,214,120,.55)');g.addColorStop(1,'rgba(255,214,120,0)');X.fillStyle=g;X.fillRect(x-200,y-200,w+400,h+400);
  X.fillStyle='#ffd77a';X.fillRect(x,y,w,h);X.strokeStyle='#2a1c10';X.lineWidth=12;X.strokeRect(x,y,w,h);X.beginPath();X.moveTo(x+w/2,y);X.lineTo(x+w/2,y+h);X.moveTo(x,y+h/2);X.lineTo(x+w,y+h/2);X.stroke();
  X.fillStyle='#e63946';X.font='800 44px "Baloo 2",Arial';X.textAlign='center';X.fillText('7',x+w/2,y-24);
  if(mode==='shadow'){const px=x-60+((T*170)%(w+160));X.fillStyle='rgba(20,10,20,.88)';X.beginPath();X.ellipse(px,y+92,34,40,0,0,7);X.fill();X.beginPath();X.roundRect(px-42,y+130,84,150,30);X.fill()}
  X.restore()}

const SET_ALIAS={corridor:'society',gallery:'society',galiyara:'society',building:'society',flat:'door',darwaza:'door',living:'hall',drawing:'hall',ghar:'home',house:'home',kamra:'room',bed:'bedroom',rasoi:'kitchen',boss:'cabin',tv:'gaming',game:'gaming',match:'stadium',ground:'stadium',wedding:'hall',shaadi:'hall',gym:'hall'};
function normSet(v){if(!v)return null;v=String(v).toLowerCase().trim();if(SETS[v])return v;for(const w of v.split(/[^a-z]+/)){if(SETS[w])return w;if(SET_ALIAS[w])return SET_ALIAS[w]}return null}
let SCENES=[];   // [{t0,t1,set}]
function setAt(T){let s=SCENES.length?SCENES[0].set:'home';for(const c of SCENES){if(c.t0<=T)s=c.set;else break}return s}

function build(){COVER_T=null;
  const N=SPEC.lines.length, ls=i=>LS(i), le=i=>LE(i);
  let set='home', cast=['R'];
  const tracks={};
  for(const k of Object.keys(CASTDEF)) tracks[k]={x:[],face:[],vis:[[0,0]],pose:[[0,'idle']],ex:[[0,'neutral']],talk:[],jy:[]};
  const onstage={};
  SCENES=[];
  for(let i=0;i<N;i++){
    const ln=SPEC.lines[i], t=i?ls(i):0, t1=le(i);
    const sk=normSet(ln.set); if(sk) set=sk;
    if(!SCENES.length||SCENES[SCENES.length-1].set!==set) SCENES.push({t0:t,set});
    if(Array.isArray(ln.cast)&&ln.cast.length) cast=ln.cast.filter(k=>CASTDEF[k]).slice(0,3);
    if(CASTDEF[ln.who]&&!cast.includes(ln.who)){cast=cast.concat([ln.who]);if(cast.length>3)cast=cast.filter(k=>k===ln.who||k==='R').concat(cast.filter(k=>k!==ln.who&&k!=='R')).slice(0,3)}
    const slots=SLOTS[cast.length]||SLOTS[1];
    // visibility in/out
    for(const k of Object.keys(CASTDEF)){
      const want=cast.includes(k), tr=tracks[k];
      if(want&&!onstage[k]){if(i===0)tr.vis=[[0,1]];else tr.vis.push([Math.max(0,t-.01),0],[t+.3,1]);onstage[k]=1}
      if(!want&&onstage[k]){tr.vis.push([t-.01,1],[t+.25,0]);onstage[k]=0}
    }
    cast.forEach((k,j)=>{const tr=tracks[k];const x=slots[j];
      if(!tr.x.length||tr.x[tr.x.length-1][1]!==x) tr.x.push([t,x]);
      tr.face.push([t, cast.length===1?1:(j<cast.length/2?1:-1)]);
      let p=(ln.pose&&ln.pose[k])||(ln.who===k?'explain':'idle'); if(!POSE_OK.has(p)) p='idle';
      tr.pose.push([t,p,.3]);
      let e=(ln.ex&&ln.ex[k])||null; if(e&&EX_OK.has(e)) tr.ex.push([t,e]);
      if(p==='cheer'||p==='shock') tr.jy.push([t,0],[t+.25,p==='cheer'?40:22,'out'],[t+.6,0]);
    });
    if(CASTDEF[ln.who]) tracks[ln.who].talk.push([t+.05,t1]);
  }
  COVER_T=clamp(LE(0)+.15,2.0,4.5);
  for(const k of Object.keys(CASTDEF)){
    const tr=tracks[k]; if(!tr.x.length) continue;
    CH[k]={...CASTDEF[k],x:tr.x,face:tr.face,vis:tr.vis,pose:tr.pose,ex:tr.ex,talk:tr.talk,jy:tr.jy,dip:[]};
  }
}
var LOOK_EXTRA;
const DARKSETS=new Set(['door','hall','room','kitchen','store','gaming','bedroom']);
window.LOOK={bg(T){applyCam(T);const k=setAt(T),f=SETS[k]||SETS.home;const r=f(T);
    if(SPEC.series==='flat7'&&!DARKSETS.has(k)){X.save();X.globalCompositeOperation='multiply';X.fillStyle='#3a4580';X.fillRect(0,0,W,H);X.restore();
      const g=X.createRadialGradient(540,700,80,540,800,1100);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,10,.55)');X.fillStyle=g;X.fillRect(0,0,W,H)}
    {const fx=fxOf(SPEC.lines[lineAt(T)]);if(fx.includes('shadow'))winFx(T,'shadow');else if(fx.includes('light'))winFx(T,'light');}
    return r},cap:CAPS,chip:CHPS,
  frame(T){X.setTransform(1,0,0,1,0,0);
    if(STY.frame==='cine'){const g=X.createRadialGradient(540,900,520,540,960,1200);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.32)');X.fillStyle=g;X.fillRect(0,0,W,H)}},
  over(T){X.setTransform(1,0,0,1,0,0);const i=lineAt(T),ln=SPEC.lines[i],t0=i?LS(i):0,f=fxOf(ln);
    if(STY.grade!=='none'){X.save();X.globalCompositeOperation='soft-light';X.fillStyle=STY.grade==='warm'?'rgba(255,150,60,.35)':STY.grade==='cool'?'rgba(60,140,255,.32)':'rgba(255,90,140,.3)';X.fillRect(0,0,W,H);X.restore()}
    for(const c of SCENES){if(c.t0<=0)continue;const d=T-c.t0;if(d<-.2||d>.35)continue;const u=clamp((d+.2)/.55,0,1);
      if(STY.trans==='flash'){const a=clamp(1-Math.abs(d)/.18,0,1);X.fillStyle='rgba(255,255,255,'+(.8*a)+')';X.fillRect(0,0,W,H)}
      else if(STY.trans==='wipe'){const x=lerp(-W*1.2,W*1.2,sm(u));X.fillStyle=SER.col;X.fillRect(x,0,W*.9,H);X.fillStyle='#111';X.fillRect(x+W*.9,0,24,H)}
      else if(STY.trans==='iris'){const r=Math.abs(u-.5)*2*1250;X.save();X.beginPath();X.rect(0,0,W,H);X.arc(540,900,Math.max(1,r),0,7,true);X.fillStyle='#000';X.fill('evenodd');X.restore()}
      else {const k=Math.sin(u*Math.PI);for(let b=0;b<5;b++){X.fillStyle=b%2?'#111':SER.col;X.fillRect(0,b*H/5,W*k*(1-.12*b),H/5)}}}
    if(f.includes('dark')){const g=X.createRadialGradient(540,900,120,540,900,900);g.addColorStop(0,'rgba(0,0,0,.15)');g.addColorStop(1,'rgba(0,0,0,.8)');X.fillStyle=g;X.fillRect(0,0,W,H)}
    if(f.includes('flash')){const a=clamp(1-(T-t0)/.35,0,1);if(a>0){X.fillStyle='rgba(255,255,255,'+(.85*a)+')';X.fillRect(0,0,W,H)}}}};
function coverText(){let t=String(SPEC.hook||SPEC.thumb||(SPEC.lines[0]&&SPEC.lines[0].text)||SPEC.title||'').replace(/#\S+/g,'').trim();
  const em=(t.match(/\p{Extended_Pictographic}/u)||[''])[0];t=t.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu,'').trim();
  const segs=t.split('|').map(x=>x.trim()).filter(x=>x&&!/^part\s*\d+/i.test(x));let txt=segs.length>1?segs[segs.length-1]:(segs[0]||'');
  return {txt,em:em||'😱'}}
function wrapWords(txt,font,maxw){X.font=font;const ws=txt.split(/\s+/);const out=[];let cur='';for(const w of ws){const t=cur?cur+' '+w:w;if(X.measureText(t).width>maxw&&cur){out.push(cur);cur=w}else cur=t}if(cur)out.push(cur);return out}
function drawCover(T){const a=T<COVER_T-.3?1:clamp((COVER_T-T)/.3,0,1);if(a<=0)return;const {txt,em}=coverText();
  X.save();X.setTransform(1,0,0,1,0,0);X.globalAlpha=a;
  const g=X.createLinearGradient(0,0,0,900);g.addColorStop(0,'rgba(0,0,0,.62)');g.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=g;X.fillRect(0,0,W,900);
  const tag=(META.name+(META.ep?'  •  '+META.ep.toUpperCase():'')).toUpperCase();let fs=50;X.font=`400 ${fs}px Bangers,Impact,Arial`;let tw_=X.measureText(tag).width;if(tw_>820){fs=Math.floor(fs*820/tw_);X.font=`400 ${fs}px Bangers,Impact,Arial`;tw_=X.measureText(tag).width}
  X.fillStyle=SER.col;X.beginPath();X.roundRect(540-tw_/2-30,118,tw_+60,78,39);X.fill();X.fillStyle='#fff';X.textAlign='center';X.textBaseline='middle';X.fillText(tag,540,160);
  let size=104;let font=`800 ${size}px "Baloo 2",Arial`;let L=wrapWords(txt,font,920);while(L.length>3&&size>64){size-=8;font=`800 ${size}px "Baloo 2",Arial`;L=wrapWords(txt,font,920)}
  const rh=size*1.14,top=STY.cover==='band'?250:280;X.font=font;X.lineJoin='round';
  L.forEach((l,k)=>{const y=top+rh/2+k*rh;const pop=1+.06*back(clamp((T-.08*k)/.25,0,1))-.06;X.save();X.translate(540,y);X.scale(pop,pop);
    X.lineWidth=20;X.strokeStyle='#111';X.strokeText(l,0,0);X.fillStyle=k===L.length-1?HL:'#fff';X.fillText(l,0,0);X.restore()});
  X.font='96px "Noto Color Emoji","Apple Color Emoji",sans-serif';X.fillText(em,960,160);
  X.restore()}
function chip2(T){const t0=COVER_T,t1=t0+2.2,t2=t1+5;if(T<t0-.05||T>t2+.4)return;
  const a=clamp((T-t0)/.3,0,1)*(1-clamp((T-t2)/.4,0,1)),sh=sm(clamp((T-t1)/.5,0,1)),sc=lerp(1,.62,sh),x=lerp(540,70,sh),y=lerp(140,92,sh);
  X.save();X.setTransform(1,0,0,1,0,0);X.globalAlpha=a;X.translate(x,y);X.scale(sc,sc);
  X.font='400 66px Bangers,Impact,Arial';const nm='RAMESH KI KAHANIYA',nw=X.measureText(nm).width,tot=96+18+nw,ox=sh<.5?-tot/2*(1-sh*2):0;X.translate(ox,0);
  X.beginPath();X.arc(48,0,48,0,7);X.fillStyle='#1fb85a';X.fill();X.lineWidth=7;X.strokeStyle='#111';X.stroke();
  X.font='800 58px "Baloo 2",Arial';X.textAlign='center';X.textBaseline='middle';X.fillStyle='#fff';X.fillText('R',48,4);
  X.font='400 66px Bangers,Impact,Arial';X.textAlign='left';X.lineJoin='round';X.lineWidth=12;X.strokeStyle='#111';X.strokeText(nm,114,4);X.fillStyle='#ffd23f';X.fillText(nm,114,4);
  X.restore()}
LOOK_EXTRA={coverOn:T=>T<COVER_T-.05,top:T=>drawCover(T),chip2:T=>chip2(T)};
function world(T){
  const order=Object.keys(CH);
  for(const k of order){const s=drawChar(CH[k],T); if(k==='R'&&s&&s.vis>.3)reg('charR',s.x,(s.w(s.hc).y+GY)/2-60,230,GY-s.w(s.hc).y+120)}
  const N=SPEC.lines.length;
  for(let i=0;i<N;i++){
    const ln=SPEC.lines[i], t0=i?LS(i):0, t1=LE(i);
    if(ln.burst) burst(i%2?380:700, 560, 115, ln.burst, i%2?'#ffd23f':'#7cff9b', T, t0+.3, Math.min(2.2,t1-t0));
    if(T<COVER_T-.1)continue;
    const sh=ln.show&&(typeof ln.show==='string'?{icon:ln.show}:ln.show);
    if(sh&&!(ln.card&&ln.card.length)) card('s'+i,T,t0+.1,t1,560,390,()=>{panel(560,390,'#fff',40);
      G.save();G.font='170px "Noto Color Emoji","Apple Color Emoji",sans-serif';G.textAlign='center';G.textBaseline='middle';G.fillText(sh.icon||'❓',0,sh.text?-40:0);G.restore();
      if(sh.text)stext(sh.text,0,150,sh.text.length>16?40:50,'#0a0d2a')},{y:530});
    if(ln.card&&ln.card.length) card('c'+i,T,t0,t1,680,300,()=>{panel(680,300,'#fff');
      stext(ln.card[0]||'',0,-92,50,SER.col); if(ln.card[1])stext(ln.card[1],0,-14,48,'#0a0d2a'); if(ln.card[2])stext(ln.card[2],0,62,40,'#444')},{y:500});
    if(fxOf(ln).includes('phone')&&T>=t0&&T<=t1){const c=CH[ln.who]||CH.R;const s=cstate(c,T);if(s.vis>.3){const h=s.w?s.w(s.hc):{x:s.x,y:900};phoneShape(h.x+150,h.y+40,.2,'#111',T,{ring:1,on:1,sc:1.1})}}
  }
}
Object.assign(window.LOOK,LOOK_EXTRA);
