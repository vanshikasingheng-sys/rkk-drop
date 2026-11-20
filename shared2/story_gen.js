// Generic spec-driven story for RKK reels. Needs window.SPEC (spec.js) + window.TLDATA (timeline.js) + sets.js.
// SPEC.lines[i] = {who, text, set?, cast?, pose?{K:pose}, ex?{K:expr}, burst?, card?[title, l1, l2], fx?}
// set / cast carry over from the previous line when omitted.
const SPEC=window.SPEC;
const SERIES={
  flat7: {name:'FLAT NO. 7', sub:'सस्पेंस', col:'#e63946', fill:'#1a0d12', ink:'#ff6b6b', txt:'#ffe9e9', hl:'#ffd23f'},
  ai:    {name:'RAMESH vs AI', sub:'सच का स्कैनर', col:'#0096d6', fill:'#071a2a', ink:'#4dc3ff', txt:'#e6f6ff', hl:'#7cff9b'},
  comedy:{name:'COMEDY', sub:'कॉमेडी', col:'#8a3bff', fill:'#180a38', ink:'#b58bff', txt:'#ece3ff', hl:'#7cff9b'},
};
const SER=SERIES[SPEC.series]||SERIES.comedy;
const META={name:SER.name, sub:SER.sub, ep:SPEC.ep||'', col:SER.col};
const THEME={hl:SER.hl};
const CAPS={fill:SER.fill,ink:SER.ink,lw:6,sh:10,shc:'#000',txt:SER.txt,hl:SER.hl,hls:SER.fill,r:26};
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
const SLOTS={1:[430],2:[320,770],3:[210,540,870]};
let SCENES=[];   // [{t0,t1,set}]
function setAt(T){let s=SCENES.length?SCENES[0].set:'home';for(const c of SCENES){if(c.t0<=T)s=c.set;else break}return s}

function build(){
  const N=SPEC.lines.length, ls=i=>LS(i), le=i=>LE(i);
  let set='home', cast=['R'];
  const tracks={};
  for(const k of Object.keys(CASTDEF)) tracks[k]={x:[],face:[],vis:[[0,0]],pose:[[0,'idle']],ex:[[0,'neutral']],talk:[],jy:[]};
  const onstage={};
  SCENES=[];
  for(let i=0;i<N;i++){
    const ln=SPEC.lines[i], t=i?ls(i):0, t1=le(i);
    if(ln.set&&SETS[ln.set]) set=ln.set;
    if(!SCENES.length||SCENES[SCENES.length-1].set!==set) SCENES.push({t0:t,set});
    if(Array.isArray(ln.cast)&&ln.cast.length) cast=ln.cast.filter(k=>CASTDEF[k]).slice(0,3);
    if(CASTDEF[ln.who]&&!cast.includes(ln.who)){cast=cast.concat([ln.who]);if(cast.length>3)cast=cast.filter(k=>k===ln.who||k==='R').concat(cast.filter(k=>k!==ln.who&&k!=='R')).slice(0,3)}
    const slots=SLOTS[cast.length]||SLOTS[1];
    // visibility in/out
    for(const k of Object.keys(CASTDEF)){
      const want=cast.includes(k), tr=tracks[k];
      if(want&&!onstage[k]){tr.vis.push([Math.max(0,t-.01),0],[t+.3,1]);onstage[k]=1}
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
  for(const k of Object.keys(CASTDEF)){
    const tr=tracks[k]; if(!tr.x.length) continue;
    CH[k]={...CASTDEF[k],x:tr.x,face:tr.face,vis:tr.vis,pose:tr.pose,ex:tr.ex,talk:tr.talk,jy:tr.jy,dip:[]};
  }
}
const DARKSETS=new Set(['door','hall','room','kitchen','store','gaming','bedroom']);
window.LOOK={bg(T){const k=setAt(T),f=SETS[k]||SETS.home;const r=f(T);
    if(SPEC.series==='flat7'&&!DARKSETS.has(k)){X.save();X.globalCompositeOperation='multiply';X.fillStyle='#3a4580';X.fillRect(0,0,W,H);X.restore();
      const g=X.createRadialGradient(540,700,80,540,800,1100);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,10,.55)');X.fillStyle=g;X.fillRect(0,0,W,H)}
    return r},cap:CAPS,chip:CHPS,
  frame(T){X.strokeStyle='#0a0d2a';X.lineWidth=26;X.strokeRect(0,0,W,H);X.strokeStyle=SER.ink;X.lineWidth=5;X.strokeRect(24,24,W-48,H-48)},
  over(T){}};
function world(T){
  const order=Object.keys(CH);
  for(const k of order){const s=drawChar(CH[k],T); if(k==='R'&&s&&s.vis>.3)reg('charR',s.x,(s.w(s.hc).y+GY)/2-60,230,GY-s.w(s.hc).y+120)}
  const N=SPEC.lines.length;
  for(let i=0;i<N;i++){
    const ln=SPEC.lines[i], t0=i?LS(i):0, t1=LE(i);
    if(ln.burst) burst(i%2?380:700, 560, 115, ln.burst, i%2?'#ffd23f':'#7cff9b', T, t0+.3, Math.min(2.2,t1-t0));
    if(ln.card&&ln.card.length) card('c'+i,T,t0,t1,680,300,()=>{panel(680,300,'#fff');
      stext(ln.card[0]||'',0,-92,50,SER.col); if(ln.card[1])stext(ln.card[1],0,-14,48,'#0a0d2a'); if(ln.card[2])stext(ln.card[2],0,62,40,'#444')},{y:430});
    if(ln.fx==='phone'&&T>=t0&&T<=t1){const c=CH[ln.who]||CH.R;const s=cstate(c,T);if(s.vis>.3){const h=s.w?s.w(s.hc):{x:s.x,y:900};phoneShape(h.x+150,h.y+40,.2,'#111',T,{ring:1,on:1,sc:1.1})}}
  }
}
