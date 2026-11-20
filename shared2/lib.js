// ===================== icons =====================
function iBank(x,y,s,col,a=1){G.save();G.translate(x,y);G.scale(s,s);dotted(col,7,12,a);poly([P(-62,-26),P(0,-72),P(62,-26)],true,{c:col,a:.1});
  for(const cx of [-42,-14,14,42])line(cx,-16,cx,32);rrect(-68,40,136,16,6);circ(0,-38,8);G.restore()}
function iCard(x,y,s,col,a=1,rot=0){G.save();G.translate(x,y);G.rotate(rot);G.scale(s,s);dotted(col,7,12,a);rrect(-72,-46,144,92,14,{c:col,a:.1});solid(col,6,a);line(-72,-20,72,-20);solid(col,4,a);rrect(-54,6,30,22,5);line(0,14,50,14);line(0,28,32,28);G.restore()}
function iLock(x,y,s,col,a=1){G.save();G.translate(x,y);G.scale(s,s);dotted(col,7,12,a);rrect(-34,-8,68,56,10,{c:col,a:.14});G.beginPath();G.arc(0,-8,22,Math.PI,Math.PI*2);G.stroke();solid(col,6,a);circ(0,20,5);G.restore()}
function iNo(x,y,r,col,a=1,lw=11){G.save();solid(col,lw,a);G.beginPath();G.arc(x,y,r,0,7);G.stroke();line(x-r*.7,y-r*.7,x+r*.7,y+r*.7);G.restore()}
function iBulb(x,y,s,T,col=COL.gold){G.save();G.translate(x,y);G.scale(s,s);dotted(col,8,12,1);circ(0,-10,34,{c:col,a:.22});solid(col,6,1);line(-14,32,14,32);line(-11,42,11,42);line(-5,52,5,52);
  G.beginPath();G.moveTo(-10,14);G.lineTo(-6,-6);G.lineTo(0,6);G.lineTo(6,-6);G.lineTo(10,14);G.stroke();
  for(let i=0;i<8;i++){const an=-Math.PI/2+(i-3.5)*.5,r1=50,r2=64+6*Math.sin(T*18+i);line(Math.cos(an)*r1,-10+Math.sin(an)*r1,Math.cos(an)*r2,-10+Math.sin(an)*r2)}G.restore()}
function iCoin(x,y,r,col,rot=0,sq=1){G.save();G.translate(x,y);G.rotate(rot);G.scale(1,sq);dotted(col,6,10,1);circ(0,0,r,{c:col,a:.2});circ(0,0,r*.72);G.restore();gtext('₹',x,y+2,r*1.05,col,{a:.95})}
function iWing(x,y,s,T,dir=1){G.save();G.translate(x,y);G.scale(dir*s,s);const f=Math.sin(T*26)*.5;solid(COL.gold2,5,.9);G.beginPath();G.moveTo(0,0);G.quadraticCurveTo(-26,-30-f*40,-48,-14-f*50);G.quadraticCurveTo(-26,-14,0,0);G.stroke();G.restore()}
function iCalm(x,y,s,col,a=1){G.save();G.translate(x,y);G.scale(s,s);dotted(col,7,12,a);circ(0,0,50,{c:col,a:.1});solid(col,6,a);G.beginPath();G.arc(-18,-8,9,0,Math.PI);G.stroke();G.beginPath();G.arc(18,-8,9,0,Math.PI);G.stroke();G.beginPath();G.moveTo(-16,16);G.quadraticCurveTo(0,32,16,16);G.stroke();G.restore()}
function iPlane(x,y,s,col,a=1,rot=0){G.save();G.translate(x,y);G.rotate(rot);G.scale(s,s);dotted(col,7,12,a);poly([P(-62,-6),P(66,-44),P(34,44),P(2,10)],true,{c:col,a:.12});solid(col,5,a);line(2,10,66,-44);line(2,10,-6,40);G.restore()}
function iHeart(x,y,s,col,a=1){G.save();G.translate(x,y);G.scale(s,s);solid(col,7,a);G.beginPath();G.moveTo(0,28);G.bezierCurveTo(-60,-8,-30,-50,0,-22);G.bezierCurveTo(30,-50,60,-8,0,28);G.fillStyle=col;G.globalAlpha=a*.25;G.fill();G.globalAlpha=a;G.stroke();G.restore()}
function iHead(x,y,s,col,a=1){G.save();G.translate(x,y);G.scale(s,s);dotted(col,7,12,a);circ(0,0,36);circ(0,48,4);G.restore()}
function bubble(x,y,w,h,tx,ty,col,a=1){G.globalAlpha=a;G.beginPath();G.roundRect(x-w/2,y-h/2,w,h,32);G.fillStyle='#fff';G.fill();solid('#111',8,a);G.stroke();
  G.beginPath();G.moveTo(x-24,y+h/2-3);G.lineTo(tx,ty);G.lineTo(x+26,y+h/2-3);G.closePath();G.fillStyle='#fff';G.fill();solid('#111',8,a);G.stroke();G.beginPath();G.moveTo(x-20,y+h/2);G.lineTo(x+22,y+h/2);G.strokeStyle='#fff';G.lineWidth=12;G.stroke()}
function spark(x,y,t,col,n=10,R=90){for(let i=0;i<n;i++){const an=i/n*6.283+hash(i)*.5,r=R*outq(t)*(.5+hash(i+3)*.7);solid(col,6*(1-t),1-t);line(x+Math.cos(an)*r*.6,y+Math.sin(an)*r*.6,x+Math.cos(an)*r,y+Math.sin(an)*r)}}
function sweat(s,T,col){const hc=s.hc;for(let i=0;i<3;i++){const p=frac(T*1.1+i*.33),x=-38+i*8,y=-34+p*70;const w=s.w(P(hc.x+x,hc.y+y));
  solid(COL.cyan,5,Math.sin(p*Math.PI));G.beginPath();G.moveTo(w.x,w.y-10);G.quadraticCurveTo(w.x+8,w.y+4,w.x,w.y+8);G.quadraticCurveTo(w.x-8,w.y+4,w.x,w.y-10);G.stroke()}}
function steam(s,T){for(let i=0;i<5;i++){const p=frac(T*.9+i*.2),w=s.w(P(s.hc.x-10+(i-2)*22,s.hc.y-70-p*120));solid(COL.red,5,Math.sin(p*Math.PI)*.9);circ(w.x,w.y,8+p*16)}}
function arcs(x,y,T,col,dir=1){for(let i=0;i<3;i++){const p=frac(T*1.6+i*.33);solid(col,5,(1-p)*.9);G.beginPath();G.arc(x,y,30+p*70,-.9+(dir<0?Math.PI:0),.9+(dir<0?Math.PI:0));G.stroke()}}


// ===================== lib: layout, cards, helpers =====================
let TL=null,CH={},SFX=[],RECTS=[];
const LS=i=>TL.lines[i].start,LE=i=>TL.lines[i].end,tk=(i,k)=>TL.lines[i].tokens[k].s,tke=(i,k)=>TL.lines[i].tokens[k].e;
const nf=s=>s.normalize('NFC');const tw=(i,s,n=0)=>{s=nf(s);const ts=TL.lines[i].tokens;let c=0;for(let k=0;k<ts.length;k++)if(nf(ts[k].show).includes(s)){if(c++===n)return ts[k].s}throw new Error('tw '+i+' '+s)};
const twe=(i,s,n=0)=>{s=nf(s);const ts=TL.lines[i].tokens;let c=0;for(let k=0;k<ts.length;k++)if(nf(ts[k].show).includes(s)){if(c++===n)return ts[k].e}throw new Error('twe '+i+' '+s)};
const u01=(T,t0,d)=>clamp((T-t0)/d,0,1);
const sfx=(t,type,g=1)=>SFX.push([+t.toFixed(3),type,g]);
let TOPY=430, CAPY=1560;const LX=300, RX=790;let PS={ink:'#111',lw:9};
// register a rectangle for overlap QA
function reg(id,x,y,w,h){RECTS.push({id,x0:x-w/2,y0:y-h/2,x1:x+w/2,y1:y+h/2})}
// one pop-in card in the top zone. fn draws centred at (0,0)
function card(id,T,t0,t1,w,h,fn,o={}){if(window.NOCARD||T<t0||T>t1)return false;const cx=o.x==null?540:o.x,cy=o.y==null?TOPY:o.y;
  const a=back(u01(T,t0,.35))*(1-clamp((T-(t1-.25))/.25,0,1));if(a<=.01)return false;
  G.save();G.translate(cx,cy);G.scale(a,a);G.globalAlpha=1;fn(a);G.restore();reg(id,cx,cy,w*a,h*a);return true}
// panel: white rounded card with ink border
function panel(w,h,fill='#fff',r=34){G.beginPath();G.roundRect(-w/2,-h/2,w,h,r);G.fillStyle=fill;G.fill();solid(PS.ink,PS.lw,1);G.stroke()}
// speech bubble above character state s (head pos in world); fn draws content centred
function speech(id,T,t0,t1,s,w,h,fn,o={}){if(window.NOCARD||T<t0||T>t1||!s)return false;const hp=s.w(s.hc);const dx=o.dx||0,by=o.by==null?hp.y-235-h/2:o.by;
  const bx=clamp(hp.x+dx,w/2+40,W-w/2-40);
  const a=back(u01(T,t0,.3))*(1-clamp((T-(t1-.2))/.2,0,1));if(a<=.01)return false;
  G.save();G.translate(bx,by);G.scale(a,a);
  G.beginPath();G.roundRect(-w/2,-h/2,w,h,32);G.fillStyle=o.fill||'#fff';G.fill();solid('#111',8,1);G.stroke();
  const tx=clamp(hp.x-bx,-w/2+50,w/2-50);G.beginPath();G.moveTo(tx-26,h/2-3);G.lineTo(hp.x-bx+(o.tx||0),hp.y-by-HR*1.3);G.lineTo(tx+26,h/2-3);G.closePath();G.fillStyle=o.fill||'#fff';G.fill();solid('#111',8,1);G.stroke();
  G.beginPath();G.moveTo(tx-22,h/2-5);G.lineTo(tx+22,h/2-5);G.strokeStyle=o.fill||'#fff';G.lineWidth=12;G.stroke();
  fn(a);G.restore();reg(id,bx,by,w*a,h*a);return true}
function burst(x,y,r,txt,col,T,t0,dur,rot=-.12,tc='#fff'){if(T<t0||T>t0+dur)return;const u=(T-t0)/dur,k=back(Math.min(u*5,1))*(1-clamp((u-.8)/.2,0,1)),n=13;G.save();G.translate(x,y);G.rotate(rot+Math.sin(T*18)*.03);G.scale(k,k);
  const pts=[];for(let i=0;i<n*2;i++){const an=i/(n*2)*6.2832,rr=i%2?r*.68:r;pts.push(P(Math.cos(an)*rr,Math.sin(an)*rr))}
  solid('#111',7,1);poly(pts,true,{c:col,a:1});G.font=`400 ${r*.62}px Bangers,Impact,Arial`;G.textAlign='center';G.textBaseline='middle';G.setLineDash([]);G.globalAlpha=1;G.lineJoin='round';G.lineWidth=10;G.strokeStyle='#111';G.strokeText(txt,0,4);G.fillStyle=tc;G.fillText(txt,0,4);G.restore();reg('burst:'+txt,x,y,r*1.5*k,r*1.5*k)}
function btext(txt,x,y,size,col='#fff',o={}){G.save();G.translate(x,y);G.rotate(o.rot||0);G.scale(o.sc||1,o.sc||1);G.globalAlpha=o.a==null?1:o.a;G.font=`${o.weight||800} ${size}px "Baloo 2",Arial`;G.textAlign='center';G.textBaseline='middle';G.lineJoin='round';G.setLineDash([]);
  G.lineWidth=o.lw==null?size*.16:o.lw;G.strokeStyle=o.ink||PS.ink;if(G.lineWidth>0)G.strokeText(txt,0,0);G.fillStyle=col;G.fillText(txt,0,0);G.restore()}
function stext(txt,x,y,size,col='#111',o={}){G.save();G.translate(x,y);G.globalAlpha=o.a==null?1:o.a;G.font=`${o.weight||800} ${size}px "Baloo 2",Arial`;G.textAlign=o.align||'center';G.textBaseline='middle';G.fillStyle=col;G.fillText(txt,0,0);G.restore()}
// ---- extra icons
function iWifi(x,y,s,col,a=1){G.save();G.translate(x,y);G.scale(s,s);solid(col,12,a);for(const r of [26,52,78]){G.beginPath();G.arc(0,0,r,-Math.PI*.82,-Math.PI*.18);G.stroke()}G.beginPath();G.arc(0,4,8,0,7);G.fillStyle=col;G.fill();G.restore()}
function iCheck(x,y,s,col,a=1){G.save();G.translate(x,y);G.scale(s,s);solid('#111',30,a);G.beginPath();G.moveTo(-34,2);G.lineTo(-10,28);G.lineTo(38,-30);G.stroke();solid(col,20,a);G.stroke();G.restore()}
function iCross(x,y,s,col,a=1){G.save();G.translate(x,y);G.scale(s,s);G.beginPath();G.moveTo(-30,-30);G.lineTo(30,30);G.moveTo(30,-30);G.lineTo(-30,30);solid('#111',30,a);G.stroke();solid(col,20,a);G.stroke();G.restore()}
function iClock(x,y,s,T,hh=2,mm=0){G.save();G.translate(x,y);G.scale(s,s);circ(0,0,70,{c:'#fff',a:1});solid('#111',7,1);circ(0,0,70);for(let i=0;i<12;i++){const an=i/12*6.2832;line(Math.cos(an)*58,Math.sin(an)*58,Math.cos(an)*66,Math.sin(an)*66)}
  const ha=((hh%12)+mm/60)/12*6.2832-1.5708,ma=mm/60*6.2832-1.5708;solid('#111',9,1);line(0,0,Math.cos(ha)*34,Math.sin(ha)*34);solid('#e63946',6,1);line(0,0,Math.cos(ma)*52,Math.sin(ma)*52);G.restore()}
function iCam(x,y,s,col,T){G.save();G.translate(x,y);G.scale(s,s);solid('#111',8,1);rrect(-70,-46,100,92,16,{c:col,a:1});poly([P(36,-14),P(80,-40),P(80,40),P(36,14)],true,{c:col,a:1});if(Math.sin(T*6)>0)circ(-46,-22,7,{c:'#e63946',a:0});G.fillStyle='#e63946';G.beginPath();G.arc(-46,-22,7,0,7);G.fill();G.restore()}
function iMagnify(x,y,s,col){G.save();G.translate(x,y);G.scale(s,s);solid('#111',9,1);circ(-8,-8,40,{c:'#bfe9ff',a:0});G.fillStyle='#d8f3ff';G.beginPath();G.arc(-8,-8,40,0,7);G.fill();G.stroke();G.beginPath();G.moveTo(22,22);G.lineTo(58,58);solid('#111',20,1);G.stroke();solid(col,12,1);G.stroke();G.restore()}
function iCalc(x,y,s,txt,col='#16a34a'){G.save();G.translate(x,y);G.scale(s,s);solid('#111',9,1);rrect(-70,-92,140,184,22,{c:'#cfd8e6',a:0});G.fillStyle='#dfe7f2';G.beginPath();G.roundRect(-70,-92,140,184,22);G.fill();G.stroke();G.fillStyle='#16213a';G.beginPath();G.roundRect(-54,-76,108,40,8);G.fill();stext(txt,48,-56,26,'#41ff9a',{align:'right'});
  for(let r=0;r<3;r++)for(let c=0;c<3;c++){G.fillStyle=(r===2&&c===2)?col:'#fff';G.beginPath();G.roundRect(-52+c*38,-22+r*36,30,28,6);G.fill();solid('#111',4,1);G.stroke()}G.restore()}
function iTag(x,y,s,txt,col='#e63946'){G.save();G.translate(x,y);G.scale(s,s);solid('#111',9,1);poly([P(-120,0),P(-80,-52),P(120,-52),P(120,52),P(-80,52)],true,{c:col,a:0});G.fillStyle=col;G.beginPath();G.moveTo(-120,0);G.lineTo(-80,-52);G.lineTo(120,-52);G.lineTo(120,52);G.lineTo(-80,52);G.closePath();G.fill();G.stroke();G.fillStyle='#fff';G.beginPath();G.arc(-72,0,10,0,7);G.fill();G.stroke();btext(txt,22,2,56,'#fff');G.restore()}
function iMoon(x,y,r,a=1){G.save();G.translate(x,y);solid('#111',7,a);G.beginPath();G.arc(0,0,r,0,7);G.fillStyle='#fff6c8';G.globalAlpha=a;G.fill();G.stroke();G.fillStyle='#f1e29b';for(const [cx,cy,rr] of [[-r*.3,-r*.2,r*.2],[r*.3,r*.25,r*.16],[r*.1,-r*.5,r*.1]]){G.beginPath();G.arc(cx,cy,rr,0,7);G.fill()}G.restore()}
function iDoor(x,y,s,open,T){G.save();G.translate(x,y);G.scale(s,s);solid('#111',9,1);G.fillStyle='#1d1233';G.beginPath();G.roundRect(-90,-260,180,260,10);G.fill();G.stroke();
  const e=-90+180*Math.cos(open*1.35),p=open*22;G.fillStyle='#8b5a2b';G.beginPath();G.moveTo(-90,-260);G.lineTo(e,-260+p);G.lineTo(e,-p);G.lineTo(-90,0);G.closePath();G.fill();solid('#111',9,1);G.stroke();
  solid('#111',6,1);G.beginPath();G.moveTo(lerp(-90,e,.2),-200+p*.3);G.lineTo(lerp(-90,e,.8),-200+p*.3);G.moveTo(lerp(-90,e,.2),-70-p*.3);G.lineTo(lerp(-90,e,.8),-70-p*.3);G.stroke();
  G.beginPath();G.arc(lerp(-90,e,.85),-125,7,0,7);G.fillStyle='#ffd23f';G.fill();G.stroke();G.restore()}
function iLaptop(x,y,s,col){G.save();G.translate(x,y);G.scale(s,s);solid('#111',8,1);G.fillStyle='#dfe7f2';G.beginPath();G.roundRect(-90,-120,180,120,10);G.fill();G.stroke();G.fillStyle='#16213a';G.beginPath();G.roundRect(-76,-108,152,96,6);G.fill();G.fillStyle=col;G.beginPath();G.roundRect(-30,-70,60,16,4);G.fill();G.beginPath();G.roundRect(-110,0,220,16,8);G.fillStyle='#aab6c8';G.fill();G.stroke();G.restore()}
const ease=(T,a,b,y0,y1)=>lerp(y0,y1,sm(clamp((T-a)/(b-a),0,1)));
function heldPhone(s,col,T,o={}){if(!s.phone)return null;const h=s.phone.hand,d=s.phone.dir;const c=s.w(P(h.x+d.x*44,h.y+d.y*44));const dw=P(d.x*s.face,d.y);const rot=Math.atan2(dw.x,-dw.y);phoneShape(c.x,c.y,rot,col,T,{sc:.82,...o});return c}
