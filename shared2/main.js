const TLraw=window.TLDATA;TL=TLraw;build();
const END=TL.dur;
// ---------- caption chunks
const CHUNKS=[];
TL.lines.forEach((l,li)=>{let cur=[],len=0;l.tokens.forEach((t,k)=>{cur.push({...t,li,k});len+=t.show.length+1;const brk=/[,:;.!?।]$/.test(t.show)||/\.\.\.$/.test(t.show);
  if(len>=16||brk||k===l.tokens.length-1){CHUNKS.push(cur);cur=[];len=0}})});
let CAP={font:'800 78px "Baloo 2",Arial',size:78,fill:'#fff',ink:'#111',lw:10,r:30,sh:12,shc:'#111',txt:'#111',hl:'#e63946',hls:'#111',hlw:14,mode:'box',rot:0,maxw:820,rowh:98,align:'center',hlbg:null,tape:null,pad:90};
if(window.LOOK){Object.assign(CAP,LOOK.cap||{})}
function captions(T){
  let ci=-1;for(let i=0;i<CHUNKS.length;i++){const c=CHUNKS[i],s=c[0].s-.04,e=c[c.length-1].e+.28;if(T>=s&&T<=e)ci=i;}
  if(ci<0)return;const c=CHUNKS[ci],S=CAP;
  X.save();X.font=S.font;X.textBaseline='middle';X.textAlign='left';X.lineJoin='round';
  const sp=Math.max(26,X.measureText(' ').width*1.6),ws=c.map(t=>X.measureText(t.show).width);const total=ws.reduce((a,b)=>a+b,0)+sp*(c.length-1);
  let rows=[c.map((t,i)=>i)];if(total>S.maxw){const half=Math.ceil(c.length/2);rows=[c.slice(0,half).map((t,i)=>i),c.slice(half).map((t,i)=>i+half)]}
  const fa=clamp((T-(c[0].s-.04))/.12,0,1),fo=1-clamp((T-(c[c.length-1].e+.15))/.13,0,1);
  const rw=rows.map(r=>r.reduce((a,i)=>a+ws[i],0)+sp*(r.length-1)),bw=S.mode==='bar'?W+40:Math.max(...rw)+S.pad,bh=rows.length*S.rowh+36,by=CAPY-bh/2,bx=W/2-bw/2;
  const pp=back(fa);X.globalAlpha=fa*fo;X.save();X.translate(W/2,CAPY);X.rotate(S.rot);X.scale(.92+.08*pp,.92+.08*pp);X.translate(-W/2,-CAPY);
  if(S.mode!=='none'){
    if(S.sh){X.fillStyle=S.shc;X.beginPath();X.roundRect(bx+S.sh,by+S.sh,bw,bh,S.r);X.fill()}
    X.fillStyle=S.fill;X.beginPath();X.roundRect(bx,by,bw,bh,S.r);X.fill();if(S.lw){X.lineWidth=S.lw;X.strokeStyle=S.ink;X.stroke()}
    if(S.deco)S.deco(bx,by,bw,bh,T)}
  rows.forEach((r,ri)=>{let x=W/2-rw[ri]/2;const y=CAPY+(ri-(rows.length-1)/2)*S.rowh+4;
    r.forEach(i=>{const t=c[i],act=T>=t.s&&T<t.e+.02;const pop=act?1+.14*back((T-t.s)/.14):1;
      X.save();X.translate(x+ws[i]/2,y);X.scale(pop,pop);X.textAlign='center';
      if(act&&S.hlbg){X.fillStyle=S.hlbg;X.beginPath();X.roundRect(-ws[i]/2-12,-S.size*.56,ws[i]+24,S.size*1.1,14);X.fill()}
      if(S.mode==='none'){X.lineWidth=S.hlw+4;X.strokeStyle=S.ink;X.strokeText(t.show,0,0)}
      if(act){if(S.hls&&!S.hlbg){X.lineWidth=S.hlw;X.strokeStyle=S.hls;X.strokeText(t.show,0,0)}X.fillStyle=S.hl;X.fillText(t.show,0,0)}else{X.fillStyle=S.txt;X.fillText(t.show,0,0)}
      X.restore();x+=ws[i]+sp})});
  X.restore();X.restore();reg('caption',W/2,CAPY,bw,bh)}
// ---------- background
function bg(T){
  if(window.LOOK&&LOOK.bg)return LOOK.bg(T);
  X.fillStyle=THEME.sky;X.fillRect(0,0,W,H);
  X.save();X.translate(540,820);X.rotate(T*.035);X.fillStyle=THEME.ray;for(let i=0;i<24;i++){const a0=i/24*6.2832,a1=a0+6.2832/48;X.beginPath();X.moveTo(0,0);X.lineTo(Math.cos(a0)*2000,Math.sin(a0)*2000);X.lineTo(Math.cos(a1)*2000,Math.sin(a1)*2000);X.closePath();X.fill()}X.restore();
  if(THEME.deco)THEME.deco(T);
  X.fillStyle=THEME.dot;for(let r=0;r<22;r++){const y=1390-r*34,rad=Math.max(0,13-r*.62);if(rad<=.5)break;for(let c=-1;c<30;c++){const x=c*40+(r%2?20:0);X.beginPath();X.arc(x,y,rad,0,7);X.fill()}}
  X.fillStyle=THEME.floor;X.fillRect(0,1406,W,H-1406);X.fillStyle=THEME.floorD;for(let i=0;i<8;i++){X.beginPath();X.moveTo(i*210-80,1406);X.lineTo(i*210-30,1406);X.lineTo(i*340-460,H);X.lineTo(i*340-520,H);X.closePath();X.fill()}}
// ---------- channel chip (first 4.8s) + watermark
let CHP={fill:'#fff',ink:'#111',sh:'#111',a:'#111',b:null,r:.5};
if(window.LOOK){Object.assign(CHP,LOOK.chip||{})}
function logo(x,y,r){X.save();X.translate(x,y);X.beginPath();X.arc(0,0,r,0,7);X.fillStyle=META.col;X.fill();X.lineWidth=r*.18;X.strokeStyle='#111';X.stroke();X.font=`800 ${r*1.15}px "Baloo 2",Arial`;X.textAlign='center';X.textBaseline='middle';X.fillStyle='#fff';X.fillText('R',0,r*.05);X.restore()}
function chip(T){
  const T1=4.6,sh=sm(clamp((T-T1)/.5,0,1));
  const x=lerp(540,250,sh),y=lerp(196,252,sh),s=lerp(1,.56,sh);
  const a=back(u01(T,.15,.4));if(a<=.01)return;
  X.save();X.translate(x,y);X.scale(s*a,s*a);
  const w=760,h=sh<.5?150:120;
  if(CHP.sh){X.fillStyle=CHP.sh;X.beginPath();X.roundRect(-w/2+10,-h/2+10,w,h,h*CHP.r);X.fill()}X.fillStyle=CHP.fill;X.beginPath();X.roundRect(-w/2,-h/2,w,h,h*CHP.r);X.fill();X.lineWidth=9;X.strokeStyle=CHP.ink;X.stroke();
  logo(-w/2+78,0,48);
  X.textAlign='left';X.textBaseline='middle';X.fillStyle=CHP.a;{const CH_='RAMESH KI KAHANIYA';let f=62;X.font=`400 ${f}px Bangers,Impact,Arial`;const cw=X.measureText(CH_).width,av=w-190;if(cw>av){f=Math.floor(f*av/cw);X.font=`400 ${f}px Bangers,Impact,Arial`}X.fillText(CH_,-w/2+148,-14)}
  const st=META.name+'  ·  '+(sh<1?META.ep:META.sub);let fs=34;X.font=`800 ${fs}px "Baloo 2",Arial`;const mw=X.measureText(st).width,avail=w-190;if(mw>avail){fs=Math.floor(fs*avail/mw);X.font=`800 ${fs}px "Baloo 2",Arial`}X.fillStyle=CHP.b||META.col;X.fillText(st,-w/2+150,32);
  X.restore();reg('chip',x,y,w*s,h*s)}
// ---------- world driver
let COVER=null;
function coverTitle(){const S=CAP,L=COVER.lines;X.save();let fs=Math.round(S.size*1.3);X.font=S.font.replace(/\d+px/,fs+'px');X.textBaseline='middle';X.textAlign='center';X.lineJoin='round';
  let mw=Math.max(...L.map(l=>X.measureText(l).width));const maxw=900;if(mw>maxw){fs=Math.floor(fs*maxw/mw);X.font=S.font.replace(/\d+px/,fs+'px');mw=Math.max(...L.map(l=>X.measureText(l).width))}
  const rh=fs*1.18,bh=L.length*rh+60,bw=S.mode==='bar'?W+40:mw+110,cy=COVER.y||1530,by=cy-bh/2,bx=W/2-bw/2;
  X.translate(W/2,cy);X.rotate(S.rot||0);X.translate(-W/2,-cy);
  if(S.mode!=='none'){if(S.sh){X.fillStyle=S.shc;X.beginPath();X.roundRect(bx+S.sh*1.3,by+S.sh*1.3,bw,bh,S.r);X.fill()}X.fillStyle=S.fill;X.beginPath();X.roundRect(bx,by,bw,bh,S.r);X.fill();if(S.lw){X.lineWidth=S.lw+2;X.strokeStyle=S.ink;X.stroke()}if(S.deco)S.deco(bx,by,bw,bh,0)}
  L.forEach((l,i)=>{const y=cy+(i-(L.length-1)/2)*rh+4;const col=i===0?S.txt:(S.cvc||S.hlbg||S.hl);if(S.mode==='none'){X.lineWidth=S.hlw+10;X.strokeStyle=S.ink;X.strokeText(l,W/2,y)}X.fillStyle=col;X.fillText(l,W/2,y)});X.restore()}
function drawReel(T){
  RECTS.length=0;
  X.setTransform(1,0,0,1,0,0);X.globalAlpha=1;X.globalCompositeOperation='source-over';
  bg(T);
  G.setTransform(1,0,0,1,0,0);G.clearRect(0,0,W,H);G.globalAlpha=1;
  world(T);compose();
  if(window.afterWorld)afterWorld(T);
  if(window.LOOK&&LOOK.over)LOOK.over(T);
  if(COVER){X.save();X.translate(0,COVER.chipDy==null?150:COVER.chipDy);chip(.9);X.restore();coverTitle()}else{chip(T);captions(T)}
  if(window.LOOK&&LOOK.frame)LOOK.frame(T);else{X.strokeStyle='#111';X.lineWidth=26;X.strokeRect(0,0,W,H)}
  const fo=clamp((T-(END-.5))/.45,0,1);if(fo>0){X.globalAlpha=fo;X.fillStyle='#111';X.fillRect(0,0,W,H);X.globalAlpha=1}
}
// ---------- QA: overlap check
function qa(T){drawReel(T);const out=[];const R=RECTS;
  for(let i=0;i<R.length;i++)for(let j=i+1;j<R.length;j++){const a=R[i],b=R[j];const ox=Math.min(a.x1,b.x1)-Math.max(a.x0,b.x0),oy=Math.min(a.y1,b.y1)-Math.max(a.y0,b.y0);if(ox>6&&oy>6)out.push(a.id+' x '+b.id+` (${Math.round(ox)}x${Math.round(oy)})`)}
  return out}
window.setCover=c=>{COVER=c;window.NOCARD=true};window.drawReel=drawReel;window.qa=qa;window.REEL={END};window.getSFX=()=>SFX;
