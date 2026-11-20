const SETS={};
(function(){const __w={};const tw=()=>1e9,twe=()=>1e9,LS=()=>1e9,LE=()=>1e9,tk=()=>1e9,tke=()=>1e9,fol=()=>1e9;
// Kaali Raat Part 1 — landscape 1920x1080, long-form
const META={name:'KAALI RAAT',sub:'हॉरर कॉमेडी',ep:'पार्ट 1 · घर में कौन है?',col:'#5b6cff'};
OUTC='#05071a';PS={ink:'#05071a',lw:9};
const SPKS=['VRVR','RRR','RARARAR','RARVRARA','RURURUR','ARAVRR','ARAVN'].join('');
const SCOL={R:'#ffb84d',A:'#41e3ff',V:'#ff4d6d',U:'#7cff9b',N:'#ffffff'};
const SNAME={R:'रमेश',A:'AI रोबोट',V:'अनजान आवाज़',U:'अंकल (फ़ोन पर)',N:''};
__w.SPKC=li=>SCOL[SPKS[li]]||'#fff';
const SCL=[0,4,7,14,22,29];            // first line of each scene
const a=i=>1e9, b=i=>1e9;
const sS=k=>k===0?0:a(SCL[k])-.85;      // scene switch time
const sceneAt=T=>{let k=0;for(let i=1;i<SCL.length;i++)if(T>=sS(i))k=i;return k};
const talkOf=ch=>{const o=[];for(let i=0;i<40;i++)if(SPKS[i]===ch)o.push([a(i)-.02,b(i)+.05]);return o};
const FL=ch=>SPKS[ch];
const EV=()=>({});
function build(){
  const s1=sS(1),s2=sS(2),s3=sS(3),s4=sS(4),s5=sS(5),END_=TL.dur;
  const R={kind:'ramesh',hd:'ramesh',seed:1,pal:{skin:'#f2b48a',shirt:'#ffffff',shirtD:'#e9edf2',pants:'#2f5bd2',pantsD:'#2449ad',shoe:'#7a3b12',hair:'#111',hood:'#222',tie:'#e63946'}};
  CH.R={...R,
    x:[[0,1080],[a(0)+.35,1080],[a(0)+.8,1170,'out'],[a(2)+.1,1170],[a(2)+.6,1290,'out'],
       [s1,820],[a(6),820],[b(6)+.5,820],[s2-.9,1500],[s2,1760],[a(7)-.4,1760],[a(7)+.9,1080],
       [s3,1080],[a(14),1080],[b(16)+.5,1080],[b(16)+.95,940,'out'],[s4,980],[a(23)-.2,980],
       [s5,860],[a(31),860],[b(32)+.1,860],[b(32)+.7,720,'out'],[a(33)+.4,720],[a(33)+1.4,1060],[a(34)+1.2,1060]],
    face:[[0,-1],[s1,1],[b(6)+.3,1],[s2,-1],[a(7),-1],[b(12)+.3,1],[a(13)-.15,-1],[s3,1],[s4,-1],[a(24),1],[s5,1]],
    pose:[[0,'idle'],[a(0)+.35,'shock',.12],[a(1)+.1,'ear',.3],[a(2)+.2,'shock',.12],[a(3)-.1,'shrug',.25],[b(3)+.3,'idle',.3],
      [s1,'slump'],[a(4)+.3,'slump',.1],[a(5)-.1,'shock',.12],[a(5)+1.2,'fist',.2],[a(6)-.1,'shock',.12],[b(6)+.3,'walkPhone',.3],
      [s2,'idle'],[a(7)-.1,'wave',.25],[a(9)-.1,'explain',.3],[a(11)-.1,'shock',.12],[b(12)+.3,'pointUp',.3],[a(13)-.1,'fist',.2],
      [s3,'idle'],[a(14)-.1,'point',.3],[a(16)-.1,'shock',.12],[b(17)+.1,'worried'==='x'?'idle':'shock',.12],[a(18)-.1,'earRub',.3],[a(20)-.1,'shock',.12],[a(21),'idle',.3],
      [s4,'ear'],[a(22)-.1,'ear',.2],[a(24)-.1,'earBeck',.3],[a(26)-.1,'earRub',.3],[a(28)-.1,'shock',.12],
      [s5,'idle'],[a(30)-.1,'shrug',.25],[a(32)+.1,'shock',.12],[a(33)-.1,'shock',.12],[b(33)+.4,'idle',.3],[a(34)-.2,'idea',.3],[a(36)-.1,'point',.3],[a(38)-.1,'shock',.12]],
    ex:[[0,'worried'],[a(3),'shock'],[b(3)+.3,'neutral'],[s1,'neutral'],[a(4),'neutral'],[a(5),'angry'],[a(6),'shock'],
      [s2,'worried'],[a(8),'neutral'],[a(11),'worried'],[a(13),'angry'],[s3,'neutral'],[a(16),'shock'],[a(18),'worried'],[a(21),'neutral'],
      [s4,'worried'],[a(25),'shock'],[a(28),'shock'],
      [s5,'worried'],[a(32),'shock'],[a(34),'shock'],[a(36),'worried']],
    talk:talkOf('R'),
    trem:[[0,0],[a(0)+.3,3],[a(0)+1.5,0],[a(2)+.2,3],[a(3),0],[a(6),3],[a(7)-.2,0],[a(12)+.3,4],[b(12)+.9,0],[b(16)+.4,3],[a(17)-.15,0],[a(32),3],[a(34)+.6,0]],
    jy:[[a(0)+.35,0],[a(0)+.5,50,'out'],[a(0)+.85,0],[a(2)+.2,0],[a(2)+.4,50,'out'],[a(2)+.75,0],[a(5)-.1,0],[a(5)+.1,40,'out'],[a(5)+.4,0],[a(11),0],[a(11)+.15,60,'out'],[a(11)+.5,0],
      [b(16)+.4,0],[b(16)+.6,70,'out'],[b(16)+1.0,0],[a(32)+.1,0],[a(32)+.3,60,'out'],[a(32)+.7,0]],dip:[]};
  CH.B={kind:'scammer',hd:'robot',seed:7,sc:[[0,.9]],pal:{skin:'#c9d6e8',shirt:'#5b8def',shirtD:'#4a78d6',pants:'#3d4f7a',pantsD:'#2f3e63',shoe:'#222',hair:'#111',hood:'#222',tie:'#e63946'},
    x:[[0,-400],[s2-.01,-400],[s2,520],[s3,610],[s4,610],[s5,480]],face:[[0,1]],
    vis:[[0,0],[s2-.01,0],[s2,1],[s4-.01,1],[s4,0],[s5-.01,0],[s5,1]],
    pose:[[0,'idle'],[s2,'slump'],[a(7)+1.0,'slump',.1],[a(8)-.2,'idle',.35],[a(10)-.1,'explain',.3],[a(12)-.1,'point',.3],[b(12)+.5,'idle',.3],[a(13),'shock',.12],
      [s3,'idle'],[a(15)-.1,'explain',.3],[a(19)-.1,'shrug',.3],[a(21)-.1,'explain',.3],[s5,'idle'],[a(29)-.1,'explain',.3],[a(31)-.1,'shrug',.3],[a(32),'shock',.12],[a(35)-.1,'point',.3],[a(37)-.1,'explain',.3]],
    ex:[[0,'neutral'],[a(13),'shock'],[a(14),'neutral'],[a(32),'shock'],[a(35),'neutral']],talk:talkOf('A'),trem:[],jy:[],dip:[]};
  // ---- SFX ----
  const S=sfx;
  S(a(0)-.05,'sting',.8);S(a(0)+.3,'heart',.7);S(a(2),'creak',.5);S(a(3)+.2,'pop',.7);
  S(b(3)+.4,'thud',1);S(b(3)+.45,'sting',.8);                         // kitchen door slams
  S(s1+.3,'tick',.5);S(a(5)-.15,'buzz',.9);S(a(6)-.25,'thud',.9);S(a(6)-.2,'sting',.5);
  S(a(8)-.3,'ding',.7);S(a(8)-.25,'success',.5);S(a(12)+.6,'sting',.7);S(b(12)+.6,'pop',.8);S(a(13),'boing',.8);
  S(b(16)+.45,'knock',1);S(b(16)+.9,'knock',1);S(b(16)+1.35,'knock',1);S(b(16)+.45,'sting',.6);
  S(a(23)-.4,'ring',.7);S(b(27)+.35,'buzz',.7);S(b(27)+.5,'thud',.8);
  S(a(29)-.2,'tick',.4);S(a(32)-.6,'creak',1);S(b(32)+.3,'whoosh',.8);S(a(34)-.6,'pop',.6);
  S(a(36)-.2,'ding',.6);S(a(38)-.4,'sting',.9);S(b(38)+.35,'thud',1.2);S(b(38)+.4,'sting',1);S(b(38)+1.0,'sad',.6);
}
// ============ helpers ============
function plank(y0,c1,c2){X.fillStyle=c1;X.fillRect(0,y0,W,H-y0);X.strokeStyle=c2;X.lineWidth=3;for(let i=0;i<14;i++){X.beginPath();X.moveTo(i*150-30,y0);X.lineTo(i*210-250,H);X.stroke()}}
function wall(c1,c2,y1=GY){const g=X.createLinearGradient(0,0,0,y1);g.addColorStop(0,c1);g.addColorStop(1,c2);X.fillStyle=g;X.fillRect(0,0,W,y1);
  X.fillStyle='rgba(0,0,0,.25)';X.fillRect(0,y1-24,W,24)}
function windowB(x,y,w,h,T,moon=true){X.fillStyle='#0b1130';X.fillRect(x,y,w,h);const g=X.createLinearGradient(x,y,x,y+h);g.addColorStop(0,'#1a2a6e');g.addColorStop(1,'#0e1648');X.fillStyle=g;X.fillRect(x+6,y+6,w-12,h-12);
  if(moon){X.fillStyle='#fff6c8';X.beginPath();X.arc(x+w*.68,y+h*.32,h*.12,0,7);X.fill();X.fillStyle='rgba(255,246,200,.12)';X.beginPath();X.arc(x+w*.68,y+h*.32,h*.22,0,7);X.fill()}
  X.fillStyle='#fff';for(let i=0;i<7;i++){X.globalAlpha=.4+.4*Math.sin(T*2+i);X.fillRect(x+12+hash(i)*(w-30),y+12+hash(i+4)*(h*.5),3,3)}X.globalAlpha=1;
  X.strokeStyle='#2a1d12';X.lineWidth=12;X.strokeRect(x,y,w,h);X.lineWidth=7;X.beginPath();X.moveTo(x+w/2,y);X.lineTo(x+w/2,y+h);X.moveTo(x,y+h/2);X.lineTo(x+w,y+h/2);X.stroke();
  X.fillStyle='rgba(120,150,255,.07)';X.beginPath();X.moveTo(x+10,y+h);X.lineTo(x+w-10,y+h);X.lineTo(x+w+260,GY+80);X.lineTo(x-200,GY+80);X.closePath();X.fill()}
function sofa(x,y,w){X.fillStyle='#5a2a3a';X.strokeStyle='#05071a';X.lineWidth=8;X.beginPath();X.roundRect(x-w/2,y-170,w,130,26);X.fill();X.stroke();
  X.fillStyle='#7a3a50';X.beginPath();X.roundRect(x-w/2-30,y-110,w+60,120,24);X.fill();X.stroke();X.fillStyle='#8c4660';X.beginPath();X.roundRect(x-w/2+20,y-100,w-40,70,18);X.fill();X.stroke();
  X.fillStyle='#4a2030';X.fillRect(x-w/2-10,y+10,16,26);X.fillRect(x+w/2-6,y+10,16,26)}
function tvSet(x,y,T,on,flick){X.fillStyle='#14182e';X.strokeStyle='#05071a';X.lineWidth=8;X.beginPath();X.roundRect(x-190,y-250,380,240,16);X.fill();X.stroke();
  X.fillStyle='#2a2f52';X.fillRect(x-30,y-12,60,24);X.fillRect(x-90,y+8,180,12);
  if(on){const g=X.createLinearGradient(x-170,y-230,x+170,y-30);g.addColorStop(0,'#5aa0ff');g.addColorStop(1,'#b46bff');X.fillStyle=g;X.globalAlpha=flick?.5+.5*Math.sin(T*70):1;X.fillRect(x-172,y-232,344,204);X.globalAlpha=1;
    X.fillStyle='rgba(255,255,255,.5)';X.fillRect(x-130,y-190+((T*40)%120),260,6);X.fillStyle='rgba(120,160,255,.10)';X.beginPath();X.moveTo(x-180,y-20);X.lineTo(x+180,y-20);X.lineTo(x+560,GY+90);X.lineTo(x-560,GY+90);X.closePath();X.fill()}
  else{X.fillStyle='#070a1c';X.fillRect(x-172,y-232,344,204);X.fillStyle='rgba(255,255,255,.05)';X.fillRect(x-160,y-224,100,12)}}
function lamp(x,y,on){X.strokeStyle='#05071a';X.lineWidth=7;X.fillStyle='#caa64a';X.beginPath();X.moveTo(x,y);X.lineTo(x,y-240);X.stroke();X.beginPath();X.moveTo(x-50,y-230);X.lineTo(x+50,y-230);X.lineTo(x+32,y-310);X.lineTo(x-32,y-310);X.closePath();X.fillStyle=on?'#ffe9a0':'#5a5238';X.fill();X.stroke();
  if(on){X.fillStyle='rgba(255,230,150,.10)';X.beginPath();X.moveTo(x-40,y-228);X.lineTo(x+40,y-228);X.lineTo(x+240,GY+80);X.lineTo(x-240,GY+80);X.closePath();X.fill()}}
function shelf(x,y,w){X.fillStyle='#4a2f1a';X.strokeStyle='#05071a';X.lineWidth=6;X.fillRect(x,y,w,16);X.strokeRect(x,y,w,16);X.fillStyle='#e63946';X.fillRect(x+24,y-60,30,60);X.fillStyle='#3a86ff';X.fillRect(x+60,y-76,26,76);X.fillStyle='#ffd23f';X.fillRect(x+92,y-50,36,50);}
function frame(x,y,w,h){X.fillStyle='#3a2a1a';X.fillRect(x,y,w,h);X.fillStyle='#223';X.fillRect(x+10,y+10,w-20,h-20);X.fillStyle='#34406a';X.beginPath();X.arc(x+w/2,y+h*.45,h*.18,0,7);X.fill();X.fillRect(x+w/2-h*.2,y+h*.62,h*.4,h*.22)}
// ============ backgrounds ============
function bgKitchen(T){wall('#14204f','#1a2b66');plank(GY,'#2a1d16','#1a120d');
  // counter
  X.fillStyle='#3b2f4a';X.fillRect(1280,GY-260,640,260);X.fillStyle='#6b5a86';X.fillRect(1280,GY-280,640,24);
  X.strokeStyle='#05071a';X.lineWidth=7;X.strokeRect(1280,GY-280,640,280);for(const cx of [1440,1600,1760]){X.beginPath();X.moveTo(cx,GY-250);X.lineTo(cx,GY);X.stroke()}
  X.fillStyle='#aab6c8';X.beginPath();X.roundRect(1380,GY-360,130,80,16);X.fill();X.stroke();X.beginPath();X.arc(1445,GY-360,10,0,7);X.fill(); // kettle
  X.strokeStyle='rgba(255,255,255,.4)';X.lineWidth=5;for(let i=0;i<3;i++){const p=frac(T*.5+i*.33);X.beginPath();X.moveTo(1420+i*24,GY-375-p*70);X.quadraticCurveTo(1430+i*24,GY-410-p*70,1420+i*24,GY-440-p*70);X.globalAlpha=1-p;X.stroke();X.globalAlpha=1}
  windowB(260,170,360,330,T);
  // shelves
  shelf(760,330,260);shelf(1090,300,200);
  // dark doorway (left) where the voice comes from
  X.fillStyle='#02030c';X.fillRect(40,GY-640,230,640);X.strokeStyle='#4a2f1a';X.lineWidth=14;X.strokeRect(40,GY-640,230,640)}
function bgLiving(T,dim,flick,tvOn){wall('#18204c','#1f2a5c');plank(GY,'#2b2018','#1a120d');
  windowB(1380,190,330,300,T);tvSet(380,GY-250,T,tvOn,flick);sofa(950,GY+20,620);lamp(1270,GY-30,!dim);frame(720,240,170,200);frame(960,210,120,170);
  X.fillStyle='#6b3d28';X.beginPath();X.roundRect(560,GY-70,300,60,10);X.fill();}
function bgRoom(T){wall('#16204a','#1c2860');plank(GY,'#2a1e16','#1a120d');
  windowB(1050,170,320,300,T);X.fillStyle='#4a2f1a';X.fillRect(150,GY-250,380,24);X.fillRect(170,GY-226,26,226);X.fillRect(484,GY-226,26,226);X.strokeStyle='#05071a';X.lineWidth=6;X.strokeRect(150,GY-250,380,24);
  // wall socket + hook
  X.fillStyle='#d8dcee';X.fillRect(120,GY-470,34,50);
  frame(640,230,170,200);
  // coat on hook (right)
  const cx=1640;X.strokeStyle='#05071a';X.lineWidth=8;X.fillStyle='#4a2f1a';X.fillRect(cx-60,300,120,16);X.strokeRect(cx-60,300,120,16);
  X.fillStyle='#3a3f5c';X.beginPath();X.moveTo(cx-26,316);X.quadraticCurveTo(cx-120,340,cx-110,520);X.lineTo(cx-100,GY-170);X.lineTo(cx+100,GY-170);X.lineTo(cx+110,520);X.quadraticCurveTo(cx+120,340,cx+26,316);X.closePath();X.fill();X.stroke();
  X.fillStyle='#2c3050';X.fillRect(cx-8,360,16,GY-540);X.fillStyle='#ffd23f';for(let i=0;i<3;i++){X.beginPath();X.arc(cx-30,420+i*100,9,0,7);X.fill()}}
function bgStore(T){wall('#101535','#161c44');plank(GY,'#241a14','#150f0b');
  // cobwebs
  X.strokeStyle='rgba(255,255,255,.25)';X.lineWidth=2;for(const [ox,oy,s] of [[0,0,1],[W,0,-1]]){for(let i=0;i<6;i++){X.beginPath();X.moveTo(ox,oy);X.lineTo(ox+s*(60+i*55),oy+330-i*30);X.stroke()}for(let r=1;r<5;r++){X.beginPath();X.moveTo(ox+s*r*70,oy);X.quadraticCurveTo(ox+s*r*50,oy+r*50,ox,oy+r*72);X.stroke()}}
  // boxes
  const bx=(x,y,w,h,c)=>{X.fillStyle=c;X.strokeStyle='#05071a';X.lineWidth=7;X.fillRect(x,y,w,h);X.strokeRect(x,y,w,h);X.beginPath();X.moveTo(x,y+h*.35);X.lineTo(x+w,y+h*.35);X.stroke()};
  bx(120,GY-200,200,200,'#6a4a2a');bx(180,GY-330,150,130,'#7a5a34');bx(1760,GY-170,150,170,'#6a4a2a')}
function doorBig(T,open,dust){const x=1560,s=2.25;G.save();G.translate(x,GY);G.scale(s,s);G.restore();
  // frame + door slab drawn on base canvas
  X.save();X.translate(x,GY);X.strokeStyle='#05071a';X.lineWidth=10;X.fillStyle='#02030c';X.fillRect(-215,-620,430,620);
  const e=-200+400*Math.cos(open*1.2);X.fillStyle='#6b4423';X.beginPath();X.moveTo(-200,-600);X.lineTo(e,-600+open*60);X.lineTo(e,-open*60);X.lineTo(-200,0);X.closePath();X.fill();X.stroke();
  if(open<.1){X.strokeStyle='rgba(0,0,0,.35)';X.lineWidth=5;for(const yy of [-460,-300,-140]){X.beginPath();X.moveTo(-170,yy);X.lineTo(170,yy);X.stroke()}X.fillStyle='#ffd23f';X.beginPath();X.arc(150,-280,14,0,7);X.fill();X.stroke();
    X.fillStyle='rgba(255,255,255,.08)';for(let i=0;i<30;i++){X.fillRect(-190+hash(i)*380,-590+hash(i+9)*560,3+hash(i+3)*8,2)}}
  else{X.fillStyle='rgba(255,40,70,'+(.25+.15*Math.sin(T*8))+')';X.fillRect(e,-600+open*60,(200-e>0?Math.abs(200-e):0)*.0+Math.min(40,430*open*.15),560)}
  X.strokeStyle='#4a2f1a';X.lineWidth=18;X.strokeRect(-215,-620,430,620);X.restore()}
function bgDoorHall(T,open,lightsOn){wall('#0c1030','#10163a');plank(GY,'#1d150f','#120c08');doorBig(T,open,1);
  // door glow slit
  if(open>.02){X.fillStyle='rgba(255,60,90,.12)';X.beginPath();X.moveTo(1500,GY);X.lineTo(1620,GY);X.lineTo(1500,GY+170);X.lineTo(1100,GY+170);X.closePath();X.fill()}}
function bgNow(T){const k=sceneAt(T);const e=sceneTimes();
  if(k===0)bgKitchen(T);
  else if(k===1){const lt=T-sS(1);const fl=(T>a(5)-.4&&T<a(5)+.6)||(T>a(6)-.5&&T<a(6)+.2);bgLiving(T,false,fl,!(T>a(5)-.1));}
  else if(k===2)bgRoom(T);
  else if(k===3)bgStore(T),doorBig(T,0,1);
  else if(k===4)bgLiving(T,true,false,false);
  else bgDoorHall(T,clamp((T-(a(32)-.4))/.8,0,.35),false)}
function sceneTimes(){return 0}
// ============ overlays ============
function dark(T){const k=sceneAt(T);let al=.30;if(k===5)al=.62;if(k===3)al=.4;
  const g=X.createRadialGradient(W/2,H*.55,200,W/2,H*.55,1250);g.addColorStop(0,'rgba(2,4,20,0)');g.addColorStop(1,'rgba(2,4,20,'+(al+.35)+')');X.fillStyle=g;X.fillRect(0,0,W,H);
  X.fillStyle='rgba(10,20,70,'+(al*.35)+')';X.fillRect(0,0,W,H);
  // lights flicker in drawing room
  if(k===1&&((T>a(5)-.4&&T<a(5)+.8)||(T>a(6)-.5&&T<a(6)+.25))){X.fillStyle='rgba(0,0,10,'+(.45+.4*Math.sin(T*40))+')';X.fillRect(0,0,W,H)}
  // scene 6: spotlight from robot's eyes only
  if(k===5){const B=CH.B,sb=cstate(B,T);const hx=sb.w(sb.hc);X.save();X.globalCompositeOperation='screen';const g2=X.createRadialGradient(hx.x+30,hx.y,10,hx.x+30,hx.y,330);g2.addColorStop(0,'rgba(65,227,255,.28)');g2.addColorStop(1,'rgba(65,227,255,0)');X.fillStyle=g2;X.fillRect(0,0,W,H);X.restore()}
  // film grain
  X.save();X.globalAlpha=.06;X.fillStyle='#fff';const f=Math.floor(T*24);for(let i=0;i<220;i++)X.fillRect(hash(i+f*7.3)*W,hash(i*3+f*1.7)*H,2,2);X.restore();
  // scene fade
  let fa=0;for(let i=1;i<SCL.length;i++){const t=sS(i);fa=Math.max(fa,1-clamp(Math.abs(T-t)/.45,0,1))}
  // end black
  const te=b(38)+.5;if(T>te)fa=Math.max(fa,clamp((T-te)/.5,0,1));
  if(fa>0){X.fillStyle='rgba(0,0,6,'+fa+')';X.fillRect(0,0,W,H)}}
__w.LOOK={bg:bgNow,over:dark,
  cap:{mode:'box',fill:'rgba(8,12,40,.86)',ink:'#8fd3ff',lw:5,sh:0,shc:'#000',txt:'#e8f4ff',hl:'#ffb84d',hls:'#05071a',hlw:14,font:'800 62px "Baloo 2",Arial',size:62,maxw:1500,rowh:78,pad:70,r:26},
  chip:{fill:'#10143a',ink:'#8fd3ff',sh:null,a:'#e8f4ff',b:'#8fd3ff',r:.5},
  frame(T){endCard(T);X.strokeStyle='#05071a';X.lineWidth=26;X.strokeRect(0,0,W,H);X.strokeStyle='rgba(143,211,255,.55)';X.lineWidth=4;X.strokeRect(26,26,W-52,H-52)}};
// speaker tag + location tag, drawn after world
const LOC=['रसोई · रात 12:00','ड्राइंग रूम','रमेश का कमरा','पुराना स्टोर रूम','ड्राइंग रूम · फ़ोन कॉल','बंद कमरे के सामने'];
__w.afterWorld=T=>{
  let li=-1;for(let i=0;i<40;i++){if(T>=a(i)-.1&&T<=b(i)+.5)li=i}
  if(li>=0&&SPKS[li]!=='N'&&T<b(38)+.2){const c=SPKS[li],nm=SNAME[c];X.save();X.font='800 38px "Baloo 2",Arial';const w=X.measureText(nm).width+64;const x=W/2,y=CAPY-82;
    X.fillStyle=SCOL[c];X.beginPath();X.roundRect(x-w/2,y-26,w,52,26);X.fill();X.lineWidth=5;X.strokeStyle='#05071a';X.stroke();X.fillStyle='#05071a';X.textAlign='center';X.textBaseline='middle';X.fillText(nm,x,y+3);X.restore()}
  {const k=sceneAt(T),t0=k===0?5.0:sS(k)+.8;if(T>t0&&T<t0+2.6){const al=clamp(Math.min(T-t0,t0+2.6-T)/.35,0,1);X.save();X.globalAlpha=al;X.font='800 34px "Baloo 2",Arial';const w=X.measureText(LOC[k]).width+56;X.fillStyle='rgba(8,12,40,.88)';X.beginPath();X.roundRect(W-w-70,64,w,54,27);X.fill();X.lineWidth=4;X.strokeStyle='#8fd3ff';X.stroke();X.fillStyle='#e8f4ff';X.textAlign='center';X.textBaseline='middle';X.fillText(LOC[k],W-w/2-70,93);X.restore()}}
};
// ============ world ============
function eyes(x,y,s,T,a_=1){G.save();G.translate(x,y);G.scale(s,s);G.globalAlpha=a_;for(const dx of [-34,34]){G.beginPath();G.ellipse(dx,0,22,15+3*Math.sin(T*3),0,0,7);G.fillStyle='#ff3b3b';G.fill();solid('#05071a',5,a_);G.stroke();G.beginPath();G.arc(dx+3,0,6,0,7);G.fillStyle='#111';G.fill()}
  G.restore()}
function uncleFace(x,y,s,talk,T){G.save();G.translate(x,y);G.scale(s,s);
  G.beginPath();G.arc(0,0,60,0,7);G.fillStyle='#e6a577';G.fill();solid('#05071a',7,1);G.stroke();
  G.fillStyle='#f4f4f4';G.beginPath();G.arc(-54,-6,18,0,7);G.fill();G.stroke();G.beginPath();G.arc(54,-6,18,0,7);G.fill();G.stroke();
  G.beginPath();G.arc(0,-26,56,Math.PI*1.1,Math.PI*1.9);G.strokeStyle='#05071a';G.lineWidth=7;G.stroke();
  G.lineWidth=6;for(const dx of [-24,24]){G.beginPath();G.arc(dx,-6,20,0,7);G.stroke();G.fillStyle='#fff';G.fill();G.beginPath();G.arc(dx,-6,6,0,7);G.fillStyle='#111';G.fill()}
  G.beginPath();G.moveTo(-4,-6);G.lineTo(4,-6);G.stroke();
  G.fillStyle='#f4f4f4';G.beginPath();G.ellipse(0,22,34,11,0,0,7);G.fill();G.stroke();
  G.beginPath();if(talk){const o=Math.abs(Math.sin(T*12));G.ellipse(0,40,12,5+o*8,0,0,7);G.fillStyle='#7a1f2b';G.fill()}else{G.moveTo(-12,40);G.lineTo(12,40)}G.stroke();G.restore()}
function kidFace(x,y,s){G.save();G.translate(x,y);G.scale(s,s);G.beginPath();G.arc(0,0,40,0,7);G.fillStyle='#f2b48a';G.fill();solid('#05071a',6,1);G.stroke();G.beginPath();G.arc(0,-6,41,Math.PI*1.05,Math.PI*1.95);G.fillStyle='#111';G.fill();G.stroke();
  for(const dx of [-14,14]){G.beginPath();G.arc(dx,2,6,0,7);G.fillStyle='#111';G.fill()}G.beginPath();G.arc(0,18,12,.2,Math.PI-.2);G.stroke();G.restore()}
function photoCard(w,h,T,scan,match){G.save();G.rotate(-.04);G.beginPath();G.roundRect(-w/2,-h/2,w,h,14);G.fillStyle='#e8dcc0';G.fill();solid('#05071a',9,1);G.stroke();
  G.fillStyle='#8aa4c8';G.fillRect(-w/2+30,-h/2+30,w-60,h-100);G.fillStyle='#6b9a5a';G.fillRect(-w/2+30,h/2-150,w-60,80);
  // small Ramesh (kid) + tall man
  G.save();G.translate(-120,60);G.fillStyle='#e63946';G.beginPath();G.roundRect(-34,40,68,110,14);G.fill();solid('#05071a',7,1);G.stroke();kidFace(0,0,1.2);G.restore();
  G.save();G.translate(110,20);G.fillStyle='#3a3f5c';G.beginPath();G.roundRect(-52,80,104,170,18);G.fill();solid('#05071a',7,1);G.stroke();uncleFace(0,0,1.05,false,T);G.restore();
  stext('1998 · बचपन',0,h/2-42,34,'#3a2a1a',{weight:700});
  if(scan>0){G.save();G.beginPath();G.roundRect(-w/2,-h/2,w,h,14);G.clip();const sy=-h/2+((T*260)%h);G.fillStyle='rgba(65,227,255,.35)';G.fillRect(-w/2,sy,w,26);G.restore()}
  if(match>0){G.globalAlpha=match;G.save();G.translate(110,20);solid('#41e3ff',9,1);G.beginPath();G.arc(0,0,110,0,7);G.stroke();G.restore();
    G.save();G.translate(110,-190);G.beginPath();G.roundRect(-160,-34,320,68,20);G.fillStyle='#05071a';G.fill();solid('#41e3ff',5,1);G.stroke();stext('MATCH 99% · अंकल',0,2,34,'#41e3ff');G.restore();G.globalAlpha=1}
  G.restore()}
function world(T){
  G.setTransform(1,0,0,1,0,0);G.clearRect(0,0,W,H);G.globalAlpha=1;
  const k=sceneAt(T);
  // ---------- scene 1: kitchen ----------
  if(k===0){
    const ea=clamp((T-(a(0)-.3))/.35,0,1)*(T>b(3)+.1?0:1);if(ea>0){const big=T>a(2)-.1?1.25:1;eyes(155,GY-390,big*1.3,T,ea);G.save();G.globalAlpha=.9;
      if(T>a(0)+.1&&T<b(0)+.6)btext('?',155,GY-520,90,'#fff',{ink:'#05071a'});G.restore()}
    if(T>a(2)-.1&&T<b(3)+.4){const al=back(clamp((T-a(2)+.1)/.3,0,1));G.save();G.translate(160,GY-690);G.scale(al,al);iCup(0,0,1.6,T);G.restore()}
    { // kitchen door slams shut over the dark doorway
      const ds=outq(clamp((T-(b(3)+.15))/.16,0,1));if(ds>0){G.save();G.fillStyle='#8b5a2b';solid('#05071a',9,1);G.beginPath();G.roundRect(40,GY-640,230*ds,640,6);G.fill();G.stroke();G.restore()}}
    const r0=drawChar(CH.R,T);if(r0.vis>.3)reg('R',r0.x,GY-250,230,500);
    burst(1480,320,170,'धड़ाम!','#e63946',T,b(3)+.15,1.3,-.1);
  }
  // ---------- scene 2: living room ----------
  if(k===1){
    const r=drawChar(CH.R,T);if(r.vis>.3)reg('R',r.x,GY-250,230,500);
    if(T>a(4)+.4&&T<a(4)+2.5){const al=back(clamp((T-a(4)-.4)/.3,0,1));G.save();G.translate(r.x+240,GY-330);G.scale(al,al);iCup(0,0,1.2,T);G.restore()}
    burst(520,330,150,'ठप्प!','#8fd3ff',T,a(5)-.15,1.1,-.1,'#05071a');
    burst(1500,520,170,'छन्न!','#e63946',T,a(6)-.3,1.2,.1);
  }
  // ---------- scene 3: robot ----------
  if(k===2){
    const rb=drawChar(CH.B,T);const r=drawChar(CH.R,T);
    reg('R',r.x,GY-250,230,500);reg('B',rb.x,GY-250,230,500);
    // charging cable + battery
    if(T<a(8)-.1){const hb=rb.w(P(rb.hip.x-40,rb.hip.y-60));solid('#05071a',10,1);G.beginPath();G.moveTo(137,GY-440);G.bezierCurveTo(120,GY-200,hb.x-120,GY-120,hb.x,hb.y);G.stroke();solid('#ffd23f',5,1);G.stroke();
      G.save();G.translate(rb.x,GY-640);G.scale(1,1);G.beginPath();G.roundRect(-44,-24,88,48,10);G.fillStyle='#fff';G.fill();solid('#05071a',7,1);G.stroke();G.fillStyle=Math.sin(T*6)>0?'#2ecc71':'#9bd8ae';G.fillRect(-36,-16,50*frac(T*.6)+10,32);G.restore()}
    burst(rb.x,GY-760,120,'ON!','#41e3ff',T,a(8)-.25,1,-.1,'#05071a');
    // coat pointer
    if(T>a(12)&&T<b(12)+1.6){const pa=Math.abs(Math.sin(T*8));G.save();G.translate(1640,300);solid('#ff4d6d',9,1);G.beginPath();G.arc(0,200,160+pa*8,0,7);G.stroke();G.restore()}
    burst(1350,300,130,'सिर्फ़ कोट!','#ffd23f',T,b(12)+.7,1.5,.05,'#05071a');
  }
  // ---------- scene 4: store room ----------
  if(k===3){
    const rb=drawChar(CH.B,T);const r=drawChar(CH.R,T);reg('R',r.x,GY-250,230,500);reg('B',rb.x,GY-250,230,500);
    const kn=b(16)+.45;for(const [i,o] of [[0,0],[1,.45],[2,.95]]){burst(1160+i*60,300+i*40,150+i*10,'ठक!','#ff4d6d',T,kn+o,.5,-.1+i*.08)}
    if(T>a(17)-.1&&T<a(17)+2.4)for(let i=0;i<2;i++){eyes(1560,GY-330,1.2,T,.0)}
    // dust particles
    G.save();G.globalAlpha=.5;G.fillStyle='#fff';for(let i=0;i<24;i++){G.fillRect(((hash(i)*W+T*14*(1+hash(i+2)))%W),((hash(i+7)*GY+T*8)%GY),3,3)}G.restore();
    if(T>a(15)&&T<b(15)+.6){const al=clamp(Math.min(T-a(15),b(15)+.6-T)/.3,0,1);G.save();G.globalAlpha=al;G.translate(1100,200);panel(480,150,'#e8f4ff');stext('पिछली बार खुला:',0,-32,34,'#05071a');stext('11 साल पहले',0,28,52,'#e63946');G.restore();reg('rec',1100,200,480,150)}
  }
  // ---------- scene 5: call ----------
  if(k===4){
    const r=drawChar(CH.R,T);reg('R',r.x,GY-250,230,500);
    const on=T>a(23)-.5&&T<b(27)+.6;
    if(on){const al=back(clamp((T-a(23)+.5)/.35,0,1));G.save();G.translate(1500,330);G.scale(al,al);panel(620,380,'#eaf6ff');
      const uT=SPKS.slice(0,0);const talking=[23,25,27].some(i=>T>=a(i)&&T<=b(i));
      uncleFace(-120,10,2.0,talking,T);stext('अंकल',150,-80,56,'#05071a');stext(T<a(23)?'📞 रिंग...':(T>b(27)+.1?'कॉल कटी':'कॉल चालू'),150,-20,34,T>b(27)+.1?'#e63946':'#1fb85a');
      if(talking){for(let i=0;i<5;i++){const h=14+Math.abs(Math.sin(T*14+i*1.7))*40;G.fillStyle='#41e3ff';G.fillRect(70+i*32,70-h/2,18,h)}}
      if(T>b(27)+.1){solid('#e63946',16,1);G.beginPath();G.moveTo(90,50);G.lineTo(210,110);G.moveTo(210,50);G.lineTo(90,110);G.stroke()}
      G.restore();reg('call',1500,330,620,380)}
    burst(1100,250,160,'क्या?!','#ffd23f',T,a(28)-.2,1.2,-.08,'#05071a');
  }
  // ---------- scene 6/7: before the door ----------
  if(k===5){
    const rb=drawChar(CH.B,T);const r=drawChar(CH.R,T);reg('R',r.x,GY-250,230,500);reg('B',rb.x,GY-250,230,500);
    // thermometer
    if(T>a(29)&&T<b(31)){const al=back(clamp((T-a(29))/.3,0,1));G.save();G.translate(1080,300);G.scale(al,al);panel(360,200,'#0e1648');const tv=Math.round(lerp(24,-6,clamp((T-a(29))/2.5,0,1)));stext('तापमान',0,-56,34,'#8fd3ff');stext(tv+'°C',0,16,84,tv<10?'#41e3ff':'#fff');G.restore();reg('temp',1080,300,360,200)}
    // door open + eyes in slit
    if(T>a(32)-.3){const o=clamp((T-(a(32)-.4))/.8,0,.35);const al=clamp((T-a(32)+.3)/.5,0,1);eyes(1572,GY-300,1.1,T,al*(T>b(38)+.2?0:1))}
    // photo sliding out
    if(T>b(32)+.6){const u=outq(clamp((T-b(32)-.6)/.9,0,1));const px=lerp(1440,1060,u);if(T<a(34)+.9){G.save();G.translate(px,GY+60);G.rotate(-.1);G.scale(.9,.55);G.beginPath();G.roundRect(-70,-50,140,100,6);G.fillStyle='#e8dcc0';G.fill();solid('#05071a',6,1);G.stroke();G.restore()}}
    // photo close-up
    const t0=a(34)+.9,t1=b(38)+.2;
    if(T>t0&&T<t1){const al=back(clamp((T-t0)/.4,0,1))*(1-clamp((T-(t1-.3))/.3,0,1));G.save();G.translate(1470,300);G.scale(al*.62,al*.62);
      photoCard(640,520,T,T>a(35)-.1&&T<a(36)?1:0,T>a(37)-.1?clamp((T-a(37)+.1)/.4,0,1):0);G.restore();reg('photo',1470,300,400,330)}
    burst(520,250,120,'!!','#ff4d6d',T,a(32)+.05,.9,.1);
  }
}

function xt(txt,x,y,size,col,al){X.save();X.globalAlpha=al;X.font=`800 ${size}px "Baloo 2",Arial`;X.textAlign='center';X.textBaseline='middle';X.lineJoin='round';X.lineWidth=size*.16;X.strokeStyle='#05071a';X.strokeText(txt,x,y);X.fillStyle=col;X.fillText(txt,x,y);X.restore()}
function endCard(T){const te=b(38)+.5;if(T<te)return;
  xt('आखिर अंकल का राज़ क्या है?',W/2,H/2-90,84,'#fff',clamp((T-te-.3)/.6,0,1));
  xt('जारी रहेगा... पार्ट 2',W/2,H/2+30,104,'#ffb84d',clamp((T-te-.6)/.6,0,1))}

;Object.assign(SETS,{kitchen:(typeof bgKitchen==='function'?bgKitchen:null),hall:(typeof bgLiving==='function'?bgLiving:null),room:(typeof bgRoom==='function'?bgRoom:null),store:(typeof bgStore==='function'?bgStore:null),door:(typeof bgDoorHall==='function'?bgDoorHall:null)});})();
(function(){const __w={};const tw=()=>1e9,twe=()=>1e9,LS=()=>1e9,LE=()=>1e9,tk=()=>1e9,tke=()=>1e9,fol=()=>1e9;
// Ramesh vs AI EP5 — बॉस का AI वीडियो (portrait, single narrator)
const META={name:'RAMESH vs AI',sub:'एआई कॉमेडी',ep:'EP 5 · बॉस का AI वीडियो',col:'#00b8d4'};
OUTC='#111';PS={ink:'#111',lw:8};
const NL=11;
const a=i=>1e9, b=i=>1e9;
const EV=()=>({hero:a(7)+2.4});
const CAB=()=>a(7)-.35;              // cut to boss cabin
CAPY=1590;
__w.SPKC=li=>'#ffb84d';
function build(){
  const pR={skin:'#f2b48a',shirt:'#ffffff',shirtD:'#e2e8f0',pants:'#2f5bd2',pantsD:'#2449ad',shoe:'#7a3b12',hair:'#111',hood:'#222',tie:'#e63946'};
  const C=CAB();
  CH.R={kind:'ramesh',hd:'ramesh',seed:1,pal:pR,
    x:[[0,330],[C-.01,330],[C,330],[C+.5,330]],face:[[0,1]],
    pose:[[0,'idle'],[a(1)+.3,'phoneLook',.35],[a(2)+.2,'cheer',.3],[b(2),'phoneLook',.35],[a(3)+.6,'point',.25],[b(3)+.2,'idle',.4],[a(4),'phoneLook',.3],[tw(4,'पाँच'),'shock',.15],[a(5),'phoneLook',.3],[tw(5,'अभी'),'shock',.15],[a(6),'slump',.4],
      [C,'idle',.3],[a(7)+1.0,'shock',.15],[tw(7,'हीरोइन'),'shrug',.3],[a(8),'cheer',.3],[b(8)+.3,'idle',.4],[a(9),'explain',.3],[a(9)+2.4,'pointUp',.3],[a(10),'wave',.3]],
    ex:[[0,'neutral'],[a(1),'smile'],[a(2),'happy'],[a(3),'smile'],[tw(4,'पाँच'),'worried'],[tw(5,'अभी'),'shock'],[a(6),'worried'],[C,'worried'],[tw(7,'हीरोइन'),'shock'],[a(8),'happy'],[a(9),'smile'],[a(10),'happy']],
    talk:[],jy:[[a(8)-.05,0],[a(8)+.2,55,'out'],[a(8)+.55,0]],dip:[]};
  CH.P={kind:'x',hd:'cap',seed:4,sc:[[0,.94]],pal:{skin:'#c98b5c',shirt:'#ffb703',shirtD:'#e09a00',pants:'#3a3a3a',pantsD:'#2a2a2a',shoe:'#222',hair:'#111',hood:'#222',hat:'#e63946'},
    x:[[0,800]],vis:[[0,1],[C-.01,1],[C,0]],face:[[0,-1]],
    pose:[[0,'phoneLook'],[a(4),'cheer',.25],[tw(4,'पाँच'),'shock',.15],[a(6),'shrug',.3]],
    ex:[[0,'smile'],[a(4),'happy'],[tw(4,'पाँच'),'shock'],[a(6),'worried']],talk:[],jy:[[a(4)+.2,0],[a(4)+.4,35,'out'],[a(4)+.7,0]],dip:[]};
  CH.B={kind:'x',hd:'shop',seed:9,sc:[[0,1.02]],acc:accGlasses(),pal:{skin:'#e0a070',shirt:'#2f3b52',shirtD:'#232c3e',pants:'#2f3b52',pantsD:'#232c3e',shoe:'#111',hair:'#555',hood:'#222',tie:'#e63946'},
    x:[[0,820]],vis:[[0,0],[C-.01,0],[C,1]],face:[[0,-1]],
    pose:[[0,'hips'],[a(7)+.6,'point',.3],[tw(7,'हीरोइन'),'explain',.3],[tw(7,'सालगिरह'),'cheer',.3],[b(7),'idle',.4],[a(9),'hips',.3],[a(10),'wave',.3]],
    ex:[[0,'angry'],[a(7)+.8,'smile'],[tw(7,'हीरोइन'),'happy'],[a(9),'smile']],
    talk:[[tw(7,'हीरोइन')-.05,b(7)+.05]],jy:[],dip:[]};
  const S=sfx;
  S(.05,'ping',.7);S(.35,'ping',.6);S(.65,'ping',.5);S(a(1)+.4,'whoosh',.6);S(a(2)-.1,'success',.6);S(a(2)+.4,'ding',.4);
  S(a(3)+.6,'whoosh',.7);S(a(3)+.9,'pop',.6);for(let k=0;k<8;k++)S(a(4)+.3+k*.13,'pop2',.6);S(tw(4,'पाँच')-.1,'tick',.6);
  S(tw(4,'टाइपिंग')-.1,'tick',.5);S(a(5)-.2,'ping',.8);S(tw(5,'अभी'),'sting',.9);S(a(6),'heart',.8);S(a(6)+.5,'heart',.8);S(tw(6,'गया'),'buzz',.5);S(tw(6,'नौकरी'),'thud',.8);
  S(C+.05,'whoosh',.8);S(a(7)+1.0,'thud',.6);S(tw(7,'हीरोइन'),'boing',.7);S(tw(7,'सालगिरह'),'ding',.6);S(a(8),'success',.7);S(a(9)+.1,'pop',.5);S(a(10),'pop',.6);
}
// ===================== camera =====================
function camAt(T){let z=1,cx=W/2,cy=H/2;const k=[[0,1,540,960],[a(5)-.2,1.0,540,960],[tw(5,'अभी')-.1,1.12,330,980],[a(6)+.2,1.16,330,1000],[CAB(),1.0,540,960],[tw(7,'हीरोइन')-.2,1.1,760,960],[a(8),1.0,540,960]];
  let i=0;for(let j=0;j<k.length;j++)if(k[j][0]<=T)i=j;const p=k[Math.max(0,i-1)],t=k[i];const u=i===0?1:sm(clamp((T-t[0])/.7,0,1));
  z=lerp(p[1],t[1],u);cx=lerp(p[2],t[2],u);cy=lerp(p[3],t[3],u);z*=1+.01*Math.sin(T*.25);const hw=W/2/z,hh=H/2/z;cx=clamp(cx,hw,W-hw);cy=clamp(cy,hh,H-hh);return{z,cx,cy}}
function applyCam(ctx,T){const c=camAt(T);ctx.setTransform(c.z,0,0,c.z,W/2-c.z*c.cx,H/2-c.z*c.cy)}
// ===================== backgrounds =====================
function desk(x,w,col){const y=GY-150;X.fillStyle=col||'#8b5a2b';X.strokeStyle='#111';X.lineWidth=6;X.beginPath();X.roundRect(x-w/2,y,w,26,6);X.fill();X.stroke();X.fillRect(x-w/2+14,y+26,18,124);X.strokeRect(x-w/2+14,y+26,18,124);X.fillRect(x+w/2-32,y+26,18,124);X.strokeRect(x+w/2-32,y+26,18,124)}
function monitor(x,y,glow){X.fillStyle='#1d2433';X.strokeStyle='#111';X.lineWidth=6;X.beginPath();X.roundRect(x-80,y-110,160,100,10);X.fill();X.stroke();X.fillStyle=glow||'#3b82f6';X.fillRect(x-70,y-100,140,80);X.fillStyle='#444';X.fillRect(x-10,y-10,20,20);X.fillRect(x-40,y+8,80,8)}
function bgOffice(T){
  X.fillStyle='#e8eef5';X.fillRect(0,0,W,GY);
  // big window with city
  X.fillStyle='#9fd3ff';X.fillRect(120,240,840,420);X.fillStyle='#7fb8e6';for(let i=0;i<9;i++){const h=120+hash(i)*220;X.fillRect(140+i*92,660-h,70,h)}X.fillStyle='rgba(255,255,255,.6)';for(let i=0;i<9;i++)for(let j=0;j<5;j++)if(hash(i*7+j)>.4)X.fillRect(152+i*92,660-60-j*40,14,18);
  X.strokeStyle='#5b6b7d';X.lineWidth=14;X.strokeRect(120,240,840,420);X.lineWidth=8;X.beginPath();X.moveTo(540,240);X.lineTo(540,660);X.stroke();
  // wall clock + plant
  X.fillStyle='#fff';X.strokeStyle='#111';X.lineWidth=6;X.beginPath();X.arc(960,760,46,0,7);X.fill();X.stroke();X.beginPath();X.moveTo(960,760);X.lineTo(960,730);X.moveTo(960,760);X.lineTo(980,770);X.stroke();
  X.fillStyle='#2f6b3a';for(let i=0;i<6;i++){X.save();X.translate(70,GY-120);X.rotate(-.8+i*.32);X.beginPath();X.ellipse(0,-60,14,60,0,0,7);X.fill();X.restore()}X.fillStyle='#b5651d';X.fillRect(42,GY-120,56,120);
  X.fillStyle='#cfd8e3';X.fillRect(0,GY-200,W,12);
  desk(330,360);monitor(250,GY-150,T>a(1)&&T<a(4)?'#a855f7':'#3b82f6');desk(800,320);monitor(860,GY-150);
  const g=X.createLinearGradient(0,GY,0,H);g.addColorStop(0,'#b0a08a');g.addColorStop(1,'#8a7a66');X.fillStyle=g;X.fillRect(0,GY,W,H-GY);X.fillStyle='rgba(0,0,0,.2)';X.fillRect(0,GY,W,8);
  if(T>tw(5,'अभी')&&T<CAB()){X.fillStyle=`rgba(230,57,70,${.10+.05*Math.sin(T*9)})`;X.fillRect(0,0,W,GY)}}
function bgCabin(T){
  X.fillStyle='#3d4a63';X.fillRect(0,0,W,GY);X.fillStyle='#34405a';for(let x=0;x<W;x+=120)X.fillRect(x,0,60,GY-200);
  // shelf + certificates
  X.fillStyle='#8b5a2b';X.fillRect(140,420,300,20);X.fillRect(640,420,300,20);for(let i=0;i<5;i++){X.fillStyle=['#e63946','#ffd23f','#41e3ff','#7cff9b','#ff8fd8'][i];X.fillRect(160+i*50,350,36,70)}
  X.fillStyle='#f6e7c8';X.strokeStyle='#d4af37';X.lineWidth=10;X.fillRect(680,280,110,90);X.strokeRect(680,280,110,90);X.fillRect(820,290,100,80);X.strokeRect(820,290,100,80);
  // nameplate + big desk
  X.fillStyle='#5c3a24';X.strokeStyle='#111';X.lineWidth=7;X.beginPath();X.roundRect(560,GY-230,480,40,8);X.fill();X.stroke();X.fillRect(580,GY-190,440,190);X.strokeRect(580,GY-190,440,190);
  X.fillStyle='#d4af37';X.beginPath();X.roundRect(720,GY-150,160,46,6);X.fill();X.stroke();X.fillStyle='#111';X.font='800 30px "Baloo 2",Arial';X.textAlign='center';X.textBaseline='middle';X.fillText('BOSS',800,GY-126);
  // laptop on desk turned towards Ramesh
  const tu=sm(clamp((T-(a(7)+.6))/.5,0,1));X.save();X.translate(650,GY-232);X.scale(lerp(-1,1,tu),1);X.fillStyle='#c9ced6';X.beginPath();X.roundRect(-70,-110,140,100,8);X.fill();X.stroke();
  if(tu>.5){X.fillStyle='#ffd1dc';X.fillRect(-60,-100,120,80);X.fillStyle='#e63946';X.font='800 20px "Baloo 2",Arial';X.fillText('हीरो बॉस',0,-60)}X.restore();
  const g=X.createLinearGradient(0,GY,0,H);g.addColorStop(0,'#6b4a3a');g.addColorStop(1,'#4a3226');X.fillStyle=g;X.fillRect(0,GY,W,H-GY);X.fillStyle='rgba(0,0,0,.25)';X.fillRect(0,GY,W,8)}
function bgNow(T){X.fillStyle='#111';X.fillRect(0,0,W,H);X.save();applyCam(X,T);if(T<CAB())bgOffice(T);else bgCabin(T);X.restore();X.setTransform(1,0,0,1,0,0)}
// ===================== screen cards =====================
function xt(txt,x,y,size,col,al=1,o={}){X.save();X.globalAlpha=al;X.font=`800 ${size}px "Baloo 2",Arial`;X.textAlign=o.align||'center';X.textBaseline='middle';X.lineJoin='round';if(o.stroke!==false){X.lineWidth=size*.16;X.strokeStyle='#111';X.strokeText(txt,x,y)}X.fillStyle=col;X.fillText(txt,x,y);X.restore()}
function win(T,t0,t1){return T>t0&&T<t1?Math.min(u01(T,t0,.25),1-u01(T,t1-.3,.3)):0}
function boxC(cx,cy,w,h,k,al,fill='#fff',r=30){X.save();X.globalAlpha=al;X.translate(cx,cy);X.scale(k,k);X.fillStyle='rgba(0,0,0,.3)';X.beginPath();X.roundRect(-w/2+12,-h/2+14,w,h,r);X.fill();X.fillStyle=fill;X.beginPath();X.roundRect(-w/2,-h/2,w,h,r);X.fill();X.lineWidth=8;X.strokeStyle='#111';X.stroke();X.restore()}
function bossFace(x,y,s,happy){X.save();X.translate(x,y);X.scale(s,s);X.strokeStyle='#111';X.lineWidth=6;X.fillStyle='#e0a070';X.beginPath();X.arc(0,0,60,0,7);X.fill();X.stroke();
  X.fillStyle='#555';X.beginPath();X.arc(0,-8,62,Math.PI*1.1,Math.PI*1.9);X.fill();X.lineWidth=5;for(const dx of [-22,22]){X.beginPath();X.arc(dx,-4,17,0,7);X.fillStyle='#fff';X.fill();X.stroke();X.fillStyle='#111';X.beginPath();X.arc(dx+2,-4,5,0,7);X.fill()}
  X.fillStyle='#333';X.beginPath();X.ellipse(0,20,26,8,0,0,7);X.fill();X.beginPath();if(happy){X.arc(0,30,16,.2,Math.PI-.2);X.stroke()}else{X.moveTo(-12,36);X.lineTo(12,36);X.stroke()}X.restore()}
function heroPoster(cx,cy,k,al,T){// cartoon filmy poster of the boss
  boxC(cx,cy,560,720,k,al,'#2a1036',24);X.save();X.globalAlpha=al;X.translate(cx,cy);X.scale(k,k);
  const g=X.createRadialGradient(0,-60,40,0,-60,420);g.addColorStop(0,'#ff8fd8');g.addColorStop(1,'#3a0f4a');X.fillStyle=g;X.beginPath();X.roundRect(-262,-342,524,684,18);X.fill();
  for(let i=0;i<14;i++){const u=frac(T*.5+i/14);X.fillStyle='rgba(255,255,255,'+(.8*(1-u))+')';X.beginPath();X.arc(-240+hash(i)*480,300-u*600,4+hash(i+3)*5,0,7);X.fill()}
  // flying hair
  X.strokeStyle='#555';X.lineWidth=10;X.lineCap='round';for(let i=0;i<6;i++){X.beginPath();X.moveTo(-40+i*14,-150);X.quadraticCurveTo(-90+i*10+Math.sin(T*8+i)*20,-210,-150+i*8+Math.sin(T*8+i)*30,-190);X.stroke()}
  bossFace(0,-110,1.5,true);
  X.fillStyle='#ffffff';X.strokeStyle='#111';X.lineWidth=6;X.beginPath();X.roundRect(-110,-10,220,170,30);X.fill();X.stroke();X.fillStyle='#e63946';X.beginPath();X.moveTo(-14,-10);X.lineTo(14,-10);X.lineTo(8,90);X.lineTo(-8,90);X.closePath();X.fill();
  // hearts + notes
  for(let i=0;i<5;i++){const u=frac(T*.7+i/5);X.save();X.globalAlpha=al*(1-u);X.translate(-200+i*100,150-u*260);X.fillStyle='#ff4d6d';X.beginPath();X.moveTo(0,10);X.bezierCurveTo(-26,-12,-12,-30,0,-14);X.bezierCurveTo(12,-30,26,-12,0,10);X.fill();X.restore()}
  X.restore();
  xt('हीरो बॉस',cx,cy+(250)*k,78*k,'#ffd23f',al);xt('AI फ़िल्मी एडिट',cx,cy-(300)*k,40*k,'#fff',al)}
function chatCard(cx,cy,k,al,T,stage){// office group chat
  boxC(cx,cy,620,760,k,al,'#efe6dd',36);X.save();X.globalAlpha=al;X.translate(cx,cy);X.scale(k,k);
  X.fillStyle='#075e54';X.beginPath();X.roundRect(-310,-380,620,100,[36,36,0,0]);X.fill();X.fillStyle='#fff';X.textAlign='left';X.textBaseline='middle';X.font='800 34px "Baloo 2",Arial';X.fillText('ऑफिस टीम',-220,-345);X.font='600 22px "Baloo 2",Arial';
  const typing=stage>=2&&stage<3;X.fillText(typing?'बॉस टाइपिंग कर रहे हैं...':'बॉस, रमेश, पप्पू, +38',-220,-308);
  X.fillStyle='#cfe9e2';X.beginPath();X.arc(-262,-330,30,0,7);X.fill();X.fillStyle='#075e54';X.font='800 30px "Baloo 2",Arial';X.textAlign='center';X.fillText('O',-262,-328);
  // ramesh video bubble (right)
  if(stage>=0){X.fillStyle='#dcf8c6';X.beginPath();X.roundRect(-40,-250,320,300,18);X.fill();X.fillStyle='#2a1036';X.beginPath();X.roundRect(-26,-236,292,220,12);X.fill();bossFace(120,-150,.7,true);X.fillStyle='#ffd23f';X.font='800 26px "Baloo 2",Arial';X.fillText('हीरो बॉस',120,-50);
    X.fillStyle='#111';X.font='700 24px "Baloo 2",Arial';X.textAlign='right';X.fillText('हाहा... देखो',260,20)}
  // smiley reactions
  if(stage>=1){const n=Math.min(100,Math.floor(100*u01(T,a(4)+.2,1.2)));X.fillStyle='#fff';X.beginPath();X.roundRect(-40,40,200,50,25);X.fill();X.lineWidth=3;X.strokeStyle='#bbb';X.stroke();
    X.fillStyle='#ffd23f';X.beginPath();X.arc(-12,65,16,0,7);X.fill();X.fillStyle='#111';X.beginPath();X.arc(-17,61,2.5,0,7);X.arc(-7,61,2.5,0,7);X.fill();X.beginPath();X.arc(-12,67,8,.1,Math.PI-.1);X.lineWidth=3;X.stroke();
    X.font='800 26px "Baloo 2",Arial';X.textAlign='left';X.fillText(n+'',12,66)}
  // boss message (left)
  if(stage>=3){const u=back(u01(T,a(5)-.1,.35));X.save();X.translate(-290,120);X.scale(u,u);X.fillStyle='#fff';X.beginPath();X.roundRect(0,0,520,170,18);X.fill();X.lineWidth=4;X.strokeStyle='#e63946';X.stroke();
    X.fillStyle='#e63946';X.font='800 26px "Baloo 2",Arial';X.textAlign='left';X.fillText('बॉस',22,32);X.fillStyle='#111';X.font='800 38px "Baloo 2",Arial';X.fillText('रमेश, मेरे केबिन में आओ।',22,86);X.fillStyle='#e63946';X.fillText('अभी।',22,136);X.restore()}
  if(typing){X.fillStyle='#fff';X.beginPath();X.roundRect(-290,140,150,60,30);X.fill();for(let i=0;i<3;i++){X.fillStyle='#8696a0';X.beginPath();X.arc(-250+i*34,170+Math.sin(T*10+i)*6,9,0,7);X.fill()}}
  X.restore()}
function cards(T){
  // L0 hook: office group buzzing
  let al=win(T,0,b(0)+.4);if(al){const sh=Math.sin(T*40)*4*(1-u01(T,.0,1.2));chatCard(540+sh,720,back(u01(T,0,.4)),al,T,0);xt('ऑफिस में भूचाल!',540,1260,66,'#ff4d6d',al)}
  // L1-L2 hero poster
  al=win(T,a(1)+.6,b(2)+.4);if(al)heroPoster(540,700,back(u01(T,a(1)+.6,.45)),al,T);
  // L3-L5 group chat with reactions, typing, message
  const c0=a(3)+.3,c1=b(5)+.6;al=win(T,c0,c1);if(al){const st=T>a(5)-.1?3:T>tw(4,'टाइपिंग')-.3?2:T>a(4)?1:0;chatCard(540,700,back(u01(T,c0,.4)),al,T,st)}
  // L6 panic cards
  if(T>a(6)+.2&&T<CAB()){const al2=win(T,a(6)+.2,CAB()+.2);
    const it=[['अप्रेज़ल',tw(6,'अप्रेज़ल')],['नौकरी',tw(6,'नौकरी')]];it.forEach(([s,t],i)=>{if(T<t-.05)return;const u=back(u01(T,t-.05,.3));const x=320+i*440,y=520;X.save();X.globalAlpha=al2;X.translate(x,y);X.scale(u,u);X.rotate(i?.06:-.06);X.fillStyle='#fff';X.beginPath();X.roundRect(-190,-70,380,140,20);X.fill();X.lineWidth=7;X.strokeStyle='#111';X.stroke();X.restore();
      xt(s,x,y-2,56*u,'#111',al2,{stroke:false});X.save();X.globalAlpha=al2;X.strokeStyle='#e63946';X.lineWidth=14;X.lineCap='round';X.beginPath();X.moveTo(x-150*u,y-40*u);X.lineTo(x+150*u,y+40*u);X.stroke();X.restore()})}
  // location tag for cabin
  al=win(T,CAB(),CAB()+2.4);if(al){X.save();X.globalAlpha=al;X.font='700 30px "Baloo 2",Arial';const s='बॉस का केबिन',w=X.measureText(s).width+44;X.fillStyle='rgba(17,17,17,.82)';X.beginPath();X.roundRect(W-w-40,330,w,52,26);X.fill();X.fillStyle='#fff';X.textAlign='center';X.textBaseline='middle';X.fillText(s,W-w/2-40,357);X.restore()}
  // L7 twist: anniversary card
  al=win(T,tw(7,'सालगिरह')-.1,b(7)+.8);if(al){const k=back(u01(T,tw(7,'सालगिरह')-.1,.4));boxC(540,560,640,260,k,al,'#fff4f6');xt('कल सालगिरह है!',540,520,60*k,'#e63946',al,{stroke:false});xt('पत्नी के साथ भी एक बनाओ',540,600,44*k,'#111',al,{stroke:false})}
  // L9 lesson card
  const l0=a(9)+.1,l1=b(9)+.6;al=win(T,l0,l1);if(al){const k=back(u01(T,l0,.45));boxC(540,580,860,380,k,al,'#ffffff');X.save();X.globalAlpha=al;X.translate(540,580);X.scale(k,k);X.fillStyle='#00b8d4';X.beginPath();X.roundRect(-430,-190,860,96,[30,30,0,0]);X.fill();X.lineWidth=8;X.strokeStyle='#111';X.stroke();X.restore();
    xt('सीख',540,580-142*k,52*k,'#fff',al);xt('किसी का AI वीडियो',540,600-30*k,54*k,'#111',al,{stroke:false});xt('बिना पूछे शेयर मत करो',540,600+50*k,54*k,'#e63946',al,{stroke:false});xt('हर बॉस इतना कूल नहीं होता',540,600+120*k,38*k,'#555',al,{stroke:false})}
  // L10 question
  al=win(T,a(10)-.1,TL.dur);if(al){const k=back(u01(T,a(10)-.1,.4));boxC(540,560,820,220,k,al,'#ffd23f');xt('आपके बॉस होते तो क्या करते?',540,540,52*k,'#111',al,{stroke:false});xt('कमेंट करो · फ़ॉलो करो',540,610,40*k,'#111',al,{stroke:false})}
}
function world(T){
  G.setTransform(1,0,0,1,0,0);G.clearRect(0,0,W,H);G.globalAlpha=1;applyCam(G,T);
  const sR=drawChar(CH.R,T),sP=drawChar(CH.P,T),sB=drawChar(CH.B,T);
  if(T<CAB()&&T>a(1))heldPhone(sR,'#a855f7',T);if(T<CAB())heldPhone(sP,'#25d366',T);
  if(T>a(6)&&T<CAB()){for(let i=0;i<3;i++){const u=frac(T*1.4+i/3);G.save();G.globalAlpha=1-u;G.fillStyle='#41b8ff';G.beginPath();G.ellipse(sR.x+40+i*16,GY-500+u*90,8,13,0,0,7);G.fill();G.restore()}}
  burst(800,560,100,'हाहाहा!','#ffd23f',T,a(4)+.2,1.2,.08,'#111');
  burst(330,560,110,'धक-धक!','#ff4d6d',T,a(6),1.2,-.1);
  burst(760,520,110,'हीरोइन?!','#ff8fd8',T,tw(7,'हीरोइन')-.05,1.3,.08,'#111');
  burst(330,560,110,'बच गया!','#7cff9b',T,a(8),1.3,-.08,'#111');
  [sR,sP,sB].forEach((s,i)=>{if(s.vis>.3)reg('c'+i,s.x,GY-260,200,520)});
}
__w.LOOK={bg:bgNow,
  cap:{mode:'box',fill:'rgba(12,14,24,.86)',ink:'rgba(255,255,255,.35)',lw:3,sh:0,shc:'#000',txt:'#f1f5ff',hl:'#ffb84d',hls:null,hlw:0,font:'700 50px "Baloo 2",Arial',size:50,maxw:900,rowh:62,pad:56,r:20},
  chip:{fill:'#fff',ink:'#111',sh:'#111',a:'#111',b:'#00b8d4',r:.5},
  frame(T){X.setTransform(1,0,0,1,0,0);cards(T);X.strokeStyle='#111';X.lineWidth=20;X.strokeRect(0,0,W,H)}};

;Object.assign(SETS,{office:(typeof bgOffice==='function'?bgOffice:null),cabin:(typeof bgCabin==='function'?bgCabin:null)});})();
(function(){const __w={};const tw=()=>1e9,twe=()=>1e9,LS=()=>1e9,LE=()=>1e9,tk=()=>1e9,tke=()=>1e9,fol=()=>1e9;
// Full On Comedy — सिक लीव और स्टेडियम (portrait, single narrator)
const META={name:'FULL ON COMEDY',sub:'ऑफिस कॉमेडी',ep:'बुखार वाली छुट्टी',col:'#ff7a00'};
OUTC='#111';PS={ink:'#111',lw:8};
const a=i=>1e9, b=i=>1e9;
const EV=()=>({hero:a(7)+1.5});
const STAD=()=>a(1)+1.2;    // cut to stadium
CAPY=1590;__w.SPKC=li=>'#ffb84d';
function build(){
  const pR={skin:'#f2b48a',shirt:'#1e63d6',shirtD:'#174fa8',pants:'#2b2b2b',pantsD:'#1d1d1d',shoe:'#7a3b12',hair:'#111',hood:'#222',tie:'#ff9933'};
  const S0=STAD();
  CH.R={kind:'ramesh',hd:'ramesh',seed:1,pal:pR,x:[[0,420],[S0,420],[S0+.01,380]],face:[[0,1],[a(7),-1],[a(8)+1.2,1]],
    pose:[[0,'phoneLook'],[a(0)+.4,'ear',.3],[b(0),'phoneLook',.3],[S0,'cheer',.3],[a(2),'wave',.25],[a(2)+1.2,'cheer',.25],[a(2)+2.4,'wave',.25],[a(3),'cheer',.25],[tw(3,'कैमरा'),'shock',.15],[tw(3,'बड़ी'),'cheer',.25],[a(4),'phoneLook',.3],[a(5),'shock',.15],[a(6),'phoneLook',.3],[a(7),'shock',.15],[a(8),'shrug',.3],[a(9),'cheer',.25],[a(10),'wave',.3]],
    ex:[[0,'worried'],[S0,'happy'],[tw(3,'कैमरा'),'shock'],[tw(3,'बड़ी'),'happy'],[a(4),'neutral'],[a(4)+1,'shock'],[a(5),'worried'],[a(6),'worried'],[a(7),'shock'],[a(8),'smile'],[a(9),'happy']],
    talk:[],jy:[[a(2),0],[a(2)+.25,50,'out'],[a(2)+.55,0],[a(2)+1.3,0],[a(2)+1.55,50,'out'],[a(2)+1.85,0],[a(9),0],[a(9)+.25,60,'out'],[a(9)+.6,0],[a(9)+.9,0],[a(9)+1.15,60,'out'],[a(9)+1.5,0]],dip:[]};
  CH.B={kind:'x',hd:'shop',seed:9,sc:[[0,1.0]],acc:accGlasses(),pal:{skin:'#e0a070',shirt:'#1e63d6',shirtD:'#174fa8',pants:'#2f3b52',pantsD:'#232c3e',shoe:'#111',hair:'#555',hood:'#222',tie:'#ff9933'},
    x:[[0,1400],[a(7)-.6,1400],[a(7)+.4,800]],vis:[[0,0],[a(7)-.65,0],[a(7)-.6,1]],face:[[0,-1]],
    pose:[[0,'cheer'],[a(7)+.4,'wave',.25],[a(7)+1.6,'cheer',.25],[a(8),'pointUp',.3],[a(9),'cheer',.25],[a(10),'wave',.3]],
    ex:[[0,'happy'],[a(8),'smile'],[a(9),'happy']],talk:[],jy:[[a(9)+.1,0],[a(9)+.35,55,'out'],[a(9)+.7,0]],dip:[]};
  const S=sfx;
  S(.05,'ping',.6);S(a(0)+1.6,'pop',.4);S(S0-.2,'whoosh',.9);S(S0+.1,'success',.6);
  S(a(2)+.3,'ding',.5);S(a(2)+1.6,'ding',.5);S(tw(3,'कैमरा')-.1,'sting',.8);S(tw(3,'बड़ी'),'pop',.6);S(tw(3,'टीवी'),'pop',.6);S(tw(3,'पूरे'),'pop',.6);
  S(a(4),'ring',.6);S(a(4)+1.6,'ping',.8);S(a(5),'thud',.8);S(a(6),'ping',.8);S(a(7)-.1,'whoosh',.7);S(a(7)+1.2,'boing',.7);S(a(8),'pop',.5);
  S(a(9),'success',.8);S(a(9)+.4,'boing',.4);S(a(10),'pop',.6);
}
function camAt(T){const k=[[0,1,540,960],[STAD(),1,540,960],[tw(3,'कैमरा')-.2,1.12,420,1000],[a(4),1,540,960],[a(5),1.1,400,1000],[a(6)+.5,1,540,960],[a(7)+.6,1.06,620,980],[a(9),1,540,960]];
  let i=0;for(let j=0;j<k.length;j++)if(k[j][0]<=T)i=j;const p=k[Math.max(0,i-1)],t=k[i];const u=i===0?1:sm(clamp((T-t[0])/.6,0,1));
  let z=lerp(p[1],t[1],u),cx=lerp(p[2],t[2],u),cy=lerp(p[3],t[3],u);z*=1+.01*Math.sin(T*.25);const hw=W/2/z,hh=H/2/z;cx=clamp(cx,hw,W-hw);cy=clamp(cy,hh,H-hh);return{z,cx,cy}}
function applyCam(ctx,T){const c=camAt(T);ctx.setTransform(c.z,0,0,c.z,W/2-c.z*c.cx,H/2-c.z*c.cy)}
// ---------- backgrounds
function bgHome(T){X.fillStyle='#ffe9c7';X.fillRect(0,0,W,GY);X.fillStyle='#f5d7a8';for(let x=0;x<W;x+=90)X.fillRect(x,0,45,GY-200);
  // bed with blanket
  X.fillStyle='#8b5a2b';X.strokeStyle='#111';X.lineWidth=7;X.beginPath();X.roundRect(560,GY-330,460,200,16);X.fill();X.stroke();X.fillStyle='#fff';X.beginPath();X.roundRect(580,GY-300,140,60,20);X.fill();X.stroke();
  X.fillStyle='#4cc9f0';X.beginPath();X.roundRect(560,GY-250,460,120,20);X.fill();X.stroke();X.fillRect(570,GY-130,30,130);X.fillRect(980,GY-130,30,130);
  // TV showing cricket
  X.fillStyle='#111';X.beginPath();X.roundRect(110,300,360,220,14);X.fill();X.fillStyle='#2e8b3a';X.fillRect(126,316,328,188);X.fillStyle='#fff';X.font='800 30px "Baloo 2",Arial';X.textAlign='center';X.textBaseline='middle';X.fillText('IND vs PAK',290,350);X.fillText('आज रात 7 बजे',290,470);
  const g=X.createLinearGradient(0,GY,0,H);g.addColorStop(0,'#c9a27a');g.addColorStop(1,'#9c7a58');X.fillStyle=g;X.fillRect(0,GY,W,H-GY)}
function crowd(y,rows,T,col){for(let r=0;r<rows;r++)for(let i=0;i<20;i++){const x=i*58+(r%2?29:0)-10,yy=y+r*46,h=hash(i*13+r*7);const jump=Math.max(0,Math.sin(T*6+h*9))*10;
  X.fillStyle=['#ff9933','#ffffff','#138808','#1e63d6','#ffd23f'][Math.floor(h*5)];X.beginPath();X.arc(x,yy-jump,16,0,7);X.fill();X.fillStyle=col;X.fillRect(x-18,yy+12-jump,36,30)}}
function bigScreen(T){const x=540,y=330,w=640,h=380;X.fillStyle='#111';X.beginPath();X.roundRect(x-w/2-14,y-h/2-14,w+28,h+28,14);X.fill();X.fillRect(x-20,y+h/2,40,90);
  const on=T>tw(3,'कैमरा')-.1&&T<a(4)+.4;
  if(!on){X.fillStyle='#0b3d1a';X.fillRect(x-w/2,y-h/2,w,h);X.fillStyle='#fff';X.font='800 54px "Baloo 2",Arial';X.textAlign='center';X.textBaseline='middle';X.fillText('IND  248/4',x,y-50);X.fillStyle='#ffd23f';X.font='800 40px "Baloo 2",Arial';X.fillText('PAK  251 · आख़िरी ओवर',x,y+30);return}
  X.save();X.beginPath();X.rect(x-w/2,y-h/2,w,h);X.clip();X.fillStyle='#16224a';X.fillRect(x-w/2,y-h/2,w,h);
  // mini Ramesh face cam
  X.translate(x,y+40);X.scale(2.2,2.2);X.fillStyle='#1e63d6';X.beginPath();X.roundRect(-50,40,100,90,20);X.fill();X.fillStyle='#f2b48a';X.beginPath();X.arc(0,0,48,0,7);X.fill();X.strokeStyle='#111';X.lineWidth=3;X.stroke();
  X.fillStyle='#111';X.beginPath();X.arc(0,-6,49,Math.PI*1.05,Math.PI*1.95);X.fill();
  [['#ff9933',-34],['#fff',-26],['#138808',-18]].forEach(([c,dx])=>{X.fillStyle=c;X.fillRect(dx,10,7,22);X.fillRect(-dx-7,10,7,22)});
  X.fillStyle='#fff';for(const dx of [-16,16]){X.beginPath();X.arc(dx,-4,10,0,7);X.fill();X.stroke()}X.fillStyle='#111';for(const dx of [-16,16]){X.beginPath();X.arc(dx,-4,4,0,7);X.fill()}
  X.fillStyle='#7a1f2b';X.beginPath();X.ellipse(0,24,12,8+Math.abs(Math.sin(T*10))*5,0,0,7);X.fill();X.restore();
  X.fillStyle='#e63946';X.beginPath();X.roundRect(x-w/2+20,y-h/2+20,130,48,10);X.fill();X.fillStyle='#fff';X.font='800 32px "Baloo 2",Arial';X.textAlign='center';X.textBaseline='middle';X.fillText('● LIVE',x-w/2+85,y-h/2+45);
  X.fillStyle='rgba(0,0,0,.6)';X.fillRect(x-w/2,y+h/2-60,w,60);X.fillStyle='#ffd23f';X.font='800 34px "Baloo 2",Arial';X.fillText('FAN CAM · सुपर फ़ैन!',x,y+h/2-30)}
function bgStadium(T){const g=X.createLinearGradient(0,0,0,GY);g.addColorStop(0,'#0a1238');g.addColorStop(1,'#1d2f6e');X.fillStyle=g;X.fillRect(0,0,W,GY);
  for(const fx of [80,1000]){X.fillStyle='#ccc';X.fillRect(fx-6,60,12,260);X.fillStyle='#fffbe0';X.beginPath();X.roundRect(fx-60,40,120,50,8);X.fill();X.fillStyle='rgba(255,250,200,.10)';X.beginPath();X.moveTo(fx-60,90);X.lineTo(fx+60,90);X.lineTo(540+(fx-540)*.2,GY);X.lineTo(540+(fx-540)*.6,GY);X.closePath();X.fill()}
  bigScreen(T);
  X.fillStyle='#24356e';X.fillRect(0,800,W,GY-800);crowd(840,6,T,'#30407a');
  X.fillStyle='#3f5a8a';X.fillRect(0,GY-90,W,90);X.fillStyle='#ff9933';X.fillRect(0,GY-90,W,10);
  const fg=X.createLinearGradient(0,GY,0,H);fg.addColorStop(0,'#3d7a3a');fg.addColorStop(1,'#2a5a28');X.fillStyle=fg;X.fillRect(0,GY,W,H-GY);
  // fireworks after win
  if(T>a(9)){for(let k=0;k<4;k++){const t0=a(9)+k*.6,u=(T-t0)%2.4/1.2;if(T<t0||u>1)continue;const cx=180+k*240,cy=200+(k%2)*120;for(let i=0;i<14;i++){const an=i/14*6.283;X.fillStyle=['#ff9933','#fff','#138808','#ffd23f'][i%4];X.globalAlpha=1-u;X.beginPath();X.arc(cx+Math.cos(an)*u*140,cy+Math.sin(an)*u*140,7,0,7);X.fill()}X.globalAlpha=1}}}
function bgNow(T){X.fillStyle='#111';X.fillRect(0,0,W,H);X.save();applyCam(X,T);if(T<STAD())bgHome(T);else bgStadium(T);X.restore();X.setTransform(1,0,0,1,0,0);
  const fl=1-clamp(Math.abs(T-STAD())/.35,0,1);if(fl>0){X.fillStyle=`rgba(255,255,255,${fl})`;X.fillRect(0,0,W,H)}}
// ---------- screen cards
function xt(txt,x,y,size,col,al=1,o={}){X.save();X.globalAlpha=al;X.font=`800 ${size}px "Baloo 2",Arial`;X.textAlign=o.align||'center';X.textBaseline='middle';X.lineJoin='round';if(o.stroke!==false){X.lineWidth=size*.16;X.strokeStyle='#111';X.strokeText(txt,x,y)}X.fillStyle=col;X.fillText(txt,x,y);X.restore()}
function win(T,t0,t1){return T>t0&&T<t1?Math.min(u01(T,t0,.25),1-u01(T,t1-.3,.3)):0}
function boxC(cx,cy,w,h,k,al,fill='#fff',r=30){X.save();X.globalAlpha=al;X.translate(cx,cy);X.scale(k,k);X.fillStyle='rgba(0,0,0,.3)';X.beginPath();X.roundRect(-w/2+12,-h/2+14,w,h,r);X.fill();X.fillStyle=fill;X.beginPath();X.roundRect(-w/2,-h/2,w,h,r);X.fill();X.lineWidth=8;X.strokeStyle='#111';X.stroke();X.restore()}
function msgCard(T,t0,t1,from,lines,col){const al=win(T,t0,t1);if(!al)return;const k=back(u01(T,t0,.4));const h=150+lines.length*64;boxC(540,620,800,h,k,al,'#fff');
  X.save();X.globalAlpha=al;X.translate(540,620);X.scale(k,k);X.fillStyle=col;X.beginPath();X.roundRect(-400,-h/2,800,70,[30,30,0,0]);X.fill();X.lineWidth=8;X.strokeStyle='#111';X.stroke();
  X.fillStyle='#fff';X.font='800 36px "Baloo 2",Arial';X.textAlign='left';X.textBaseline='middle';X.fillText(from,-370,-h/2+36);
  X.fillStyle='#111';X.font='800 46px "Baloo 2",Arial';lines.forEach((l,i)=>X.fillText(l,-370,-h/2+120+i*64));X.restore()}
function cards(T){
  msgCard(T,a(0)+.2,STAD()-.1,'रमेश ➜ बॉस',['सर, तेज़ बुखार है,','आज नहीं आ पाऊँगा।'],'#075e54');
  let al=win(T,STAD()+.2,a(2)+.6);if(al){const k=back(u01(T,STAD()+.2,.4));boxC(540,620,760,170,k,al,'#ff9933');xt('इंडिया vs पाकिस्तान',540,610,64*k,'#fff',al)}
  msgCard(T,a(4)+1.5,a(5)+.3,'बॉस',['बुखार में डांस तो','बढ़िया कर लेते हो।'],'#e63946');
  msgCard(T,a(6)+.6,a(7)+.5,'बॉस',['पीछे मुड़कर देखो।'],'#e63946');
  al=win(T,a(8)+.1,b(8)+.6);if(al){const k=back(u01(T,a(8)+.1,.4));boxC(540,560,820,200,k,al,'#ffd23f');xt('कल ऑफिस में',540,520,52*k,'#111',al,{stroke:false});xt('किसी को मत बताना!',540,590,52*k,'#111',al,{stroke:false})}
  al=win(T,a(9),b(9)+.4);if(al){const k=back(u01(T,a(9),.4));boxC(540,560,700,170,k,al,'#138808');xt('इंडिया जीता!',540,550,76*k,'#fff',al)}
  al=win(T,a(10)-.1,TL.dur);if(al){const k=back(u01(T,a(10)-.1,.4));boxC(540,560,860,220,k,al,'#ffffff');xt('मैच के लिए छुट्टी ली है कभी?',540,540,50*k,'#111',al,{stroke:false});xt('सच-सच कमेंट करो · फ़ॉलो करो',540,610,38*k,'#e63946',al,{stroke:false})}
}
function flag(s,T){if(!s||s.vis<.5)return;const h=s.w(s.aA.e);G.save();G.translate(h.x,h.y);G.rotate(-.3+Math.sin(T*6)*.15);solid('#111',6,1);G.beginPath();G.moveTo(0,0);G.lineTo(0,-150);G.stroke();
  const wv=i=>Math.sin(T*8+i)*8;[['#ff9933',-150],['#ffffff',-118],['#138808',-86]].forEach(([c,y],i)=>{G.fillStyle=c;G.beginPath();G.moveTo(0,y);G.lineTo(110,y+wv(i));G.lineTo(110,y+32+wv(i));G.lineTo(0,y+32);G.closePath();G.fill();G.stroke()});G.restore()}
function world(T){G.setTransform(1,0,0,1,0,0);G.clearRect(0,0,W,H);G.globalAlpha=1;applyCam(G,T);
  const sR=drawChar(CH.R,T),sB=drawChar(CH.B,T);
  if(T<STAD()||(T>a(4)&&T<a(7))||(T>a(6)-.2&&T<a(7)))heldPhone(sR,'#25d366',T);
  if(T>STAD()&&!(T>a(4)&&T<a(7)))flag(sR,T);if(T>a(7)-.6)flag(sB,T);
  if(T<STAD()){burst(260,620,90,'खाँसी!','#8fd3ff',T,a(0)+1.6,1.0,-.1,'#111')}
  burst(820,620,100,'चौका!','#ffd23f',T,a(2)+.3,1.0,.1,'#111');burst(260,600,100,'4!','#ff9933',T,a(2)+1.6,1.0,-.1,'#111');
  burst(820,560,100,'LIVE!','#e63946',T,tw(3,'कैमरा'),1.2,.08);burst(300,560,110,'104° बुखार!','#ff4d6d',T,a(5),1.5,-.08);
  burst(820,520,110,'बॉस?!','#ffd23f',T,a(7)+1.0,1.4,.08,'#111');
  [sR,sB].forEach((s,i)=>{if(s.vis>.3)reg('c'+i,s.x,GY-260,200,520)})}
__w.LOOK={bg:bgNow,
  cap:{mode:'box',fill:'rgba(12,14,24,.86)',ink:'rgba(255,255,255,.35)',lw:3,sh:0,shc:'#000',txt:'#f1f5ff',hl:'#ffb84d',hls:null,hlw:0,font:'700 50px "Baloo 2",Arial',size:50,maxw:900,rowh:62,pad:56,r:20},
  chip:{fill:'#fff',ink:'#111',sh:'#111',a:'#111',b:'#ff7a00',r:.5},
  frame(T){X.setTransform(1,0,0,1,0,0);cards(T);X.strokeStyle='#111';X.lineWidth=20;X.strokeRect(0,0,W,H)}};

;Object.assign(SETS,{home:(typeof bgHome==='function'?bgHome:null),stadium:(typeof bgStadium==='function'?bgStadium:null)});})();
(function(){const __w={};const tw=()=>1e9,twe=()=>1e9,LS=()=>1e9,LE=()=>1e9,tk=()=>1e9,tke=()=>1e9,fol=()=>1e9;
// Ramesh vs AI EP4 — सोसाइटी में शेर! (portrait 1080x1920, multi-speaker)
const META={name:'RAMESH vs AI',sub:'एआई कॉमेडी',ep:'EP 4 · सोसाइटी में शेर!',col:'#00b8d4'};
OUTC='#111';PS={ink:'#111',lw:8};
const SPK='NSNURPRUPRPSPRRSN'.split('');
const SCOL={R:'#ffb84d',P:'#7cff9b',S:'#ff8fd8',U:'#8fd3ff',N:'#ffffff'};
const SNAME={R:'रमेश',P:'पप्पू',S:'शर्मा आंटी',U:'अंकल'};
__w.SPKC=li=>SCOL[SPK[li]]||'#fff';
const NL=SPK.length;
const a=i=>1e9, b=i=>1e9;
const talkOf=c=>{const o=[];for(let i=0;i<NL;i++)if(SPK[i]===c)o.push([a(i)-.03,b(i)+.04]);return o};
const EV=()=>({hero:a(10)+1.2});
const FRX=600;               // fridge x
const IN=()=>a(4)+1.15;      // Ramesh inside fridge
const OUT=()=>a(9)+.25;      // Ramesh steps out
CAPY=1590;
function build(){
  const pR={skin:'#f2b48a',shirt:'#ffffff',shirtD:'#e2e8f0',pants:'#2f5bd2',pantsD:'#2449ad',shoe:'#7a3b12',hair:'#111',hood:'#222',tie:'#e63946'};
  CH.R={kind:'ramesh',hd:'ramesh',seed:1,pal:pR,
    x:[[0,-300],[a(4)-.3,-300],[a(4)+.9,FRX-40],[IN(),FRX],[OUT()-.01,FRX],[OUT(),FRX+20],[OUT()+.6,560,'out'],[a(13)-.5,560],[a(13)+.2,540]],
    vis:[[0,0],[a(4)-.31,0],[a(4)-.3,1],[IN()-.15,1],[IN(),0],[OUT()-.01,0],[OUT()+.15,1]],
    face:[[0,1],[OUT(),-1],[a(10),-1],[a(13),-1],[a(14),1],[a(15),-1]],
    pose:[[0,'idle'],[a(4)-.3,'shock',.15],[OUT(),'idea',.25],[b(9),'idle',.4],[a(10)+.5,'shock',.15],[b(10)+.2,'idle',.4],[a(13),'explain',.3],[a(14),'pointUp',.3],[a(14)+1.3,'point',.3],[b(14),'idle',.4],[a(15)+.6,'shock',.15],[a(16),'slump',.4]],
    ex:[[0,'shock'],[OUT(),'smile'],[a(10)+.5,'shock'],[a(12),'happy'],[a(13),'smile'],[a(15)+.6,'shock'],[a(16),'worried']],
    talk:talkOf('R').filter(([s])=>s>OUT()-.1),jy:[[a(12)+1.6,0],[a(12)+1.8,40,'out'],[a(12)+2.1,0]],dip:[]};
  CH.P={kind:'x',hd:'cap',seed:4,sc:[[0,.96]],pal:{skin:'#c98b5c',shirt:'#ffb703',shirtD:'#e09a00',pants:'#3a3a3a',pantsD:'#2a2a2a',shoe:'#222',hair:'#111',hood:'#222',hat:'#e63946'},
    x:[[0,-300],[a(5)-1.2,-300],[a(5)-.1,330],[a(13),330],[a(13)+.5,310]],vis:[[0,0],[a(5)-1.25,0],[a(5)-1.2,1]],
    face:[[0,1],[a(12),1],[a(13),1]],
    pose:[[0,'idle'],[a(5),'point',.3],[b(5),'shrug',.3],[b(6),'idle',.3],[a(8)-.2,'phoneLook',.35],[a(10),'point',.3],[b(10),'phoneLook',.3],[a(12),'explain',.3],[b(12),'idle',.4],[a(15)+.6,'shock',.15],[a(16),'shrug',.3]],
    ex:[[0,'happy'],[a(6),'happy'],[a(8),'neutral'],[a(8)+1.6,'shock'],[a(10),'smile'],[a(12),'happy'],[a(15)+.6,'shock'],[a(16),'smile']],
    talk:talkOf('P'),jy:[[a(6)+1.2,0],[a(6)+1.35,30,'out'],[a(6)+1.6,0],[a(6)+1.75,30,'out'],[a(6)+2,0]],dip:[]};
  CH.S={kind:'x',hd:'ramesh',nm:true,seed:6,sc:[[0,.92]],acc:accBindi('#3b2a20'),pal:{skin:'#e7a87c',shirt:'#d63384',shirtD:'#b02a6e',pants:'#d63384',pantsD:'#b02a6e',shoe:'#7a3b12',hair:'#3b2a20',hood:'#222',tie:'#ffd23f'},
    x:[[0,-300],[a(1)-1.0,-300],[a(1)+.2,150],[a(11),150],[a(11)+.4,170]],vis:[[0,0],[a(1)-1.05,0],[a(1)-1.0,1]],
    face:[[0,1]],
    pose:[[0,'idle'],[a(1),'phoneLook',.3],[a(1)+1.4,'shock',.15],[b(1)+.2,'phoneLook',.35],[a(3),'shock',.15],[b(3)+.6,'idle',.4],[a(11),'shock',.15],[b(11),'idle',.4],[a(12)+1.2,'cheer',.3],[b(12)+.2,'idle',.4],[a(15),'phoneLook',.3],[a(15)+1.4,'cheer',.25],[b(15)+.2,'phoneLook',.3]],
    ex:[[0,'shock'],[a(2),'smile'],[a(3),'shock'],[a(11),'shock'],[a(12)+1.2,'happy'],[a(15),'smile'],[a(16),'happy']],
    talk:talkOf('S'),jy:[[a(11)-.05,0],[a(11)+.15,35,'out'],[a(11)+.45,0]],dip:[]};
  CH.U={kind:'x',hd:'shop',seed:9,sc:[[0,.98]],acc:accGlasses(),pal:{skin:'#e0a070',shirt:'#f4f1e8',shirtD:'#dcd6c6',pants:'#7a6a55',pantsD:'#5e5140',shoe:'#3a2414',hair:'#ececec',hood:'#222',tie:'#8b5a2b'},
    x:[[0,1400],[a(3)-1.1,1400],[a(3)-.1,880],[a(13),880],[a(13)+.4,900]],vis:[[0,0],[a(3)-1.15,0],[a(3)-1.1,1]],
    face:[[0,-1]],
    pose:[[0,'idle'],[a(3),'fist',.2],[b(3),'idle',.3],[a(7)-.2,'ear',.35],[b(7)+.4,'idle',.4],[a(10)+.6,'shock',.15],[b(10)+.4,'idle',.4],[a(12)+1.2,'shrug',.3],[a(15)+.6,'shock',.15],[a(16),'hips',.3]],
    ex:[[0,'angry'],[b(3),'worried'],[a(7),'angry'],[a(10)+.6,'shock'],[a(12)+1.2,'worried'],[a(15)+.6,'shock'],[a(16),'angry']],
    talk:talkOf('U'),jy:[],dip:[]};
  const S=sfx;
  S(.05,'sting',.8);S(.3,'ring',.5);S(a(1)-.9,'pop',.5);S(a(1)+1.4,'sting',.5);
  for(let k=0;k<10;k++)S(a(2)+.6+k*.16,'tick',.6);S(b(2)-.1,'ding',.6);
  S(a(3)+.2,'buzz',.5);S(a(3)+.6,'thud',1);S(a(3)+.9,'thud',.9);S(a(3)+1.2,'thud',.8);
  S(a(4)-.3,'whoosh',.7);S(IN()-.1,'thud',.8);S(IN(),'boing',.6);S(a(6)+1.4,'laugh',.6);
  S(a(7)+.2,'ring',.4);S(a(8)+.2,'whoosh',.6);S(a(8)+1.7,'sting',.6);S(OUT(),'pop',.7);
  S(tw(10,'पाँच'),'pop',.8);S(tw(10,'पूँछ'),'pop',.8);S(tw(10,'परछाईं'),'pop',.8);S(a(11),'sting',.5);
  S(tw(12,'बिल्ली')-.2,'whoosh',.7);S(tw(12,'बिल्ली'),'boing',.7);S(a(12)+1.6,'laugh',.5);
  S(tw(14,'अजीब'),'ding',.5);S(tw(14,'न्यूज़'),'ding',.5);S(tw(14,'फिर'),'success',.6);
  for(let k=0;k<8;k++)S(a(15)+1.4+k*.12,'tick',.5);S(b(15),'buzz',.4);S(a(16)+.2,'boing',.5);
}
// ===================== camera (gentle, speaker-led) =====================
const SX=c=>({R:CH.R,P:CH.P,S:CH.S,U:CH.U}[c]);
let CAMK=null;
function camKeys(){if(CAMK)return CAMK;const k=[];
  for(let i=0;i<NL;i++){const c=SPK[i];let z=1,cx=W/2,cy=H/2;
    if(c!=='N'){const ch=SX(c);const vis=ch.vis?interp(ch.vis,a(i)+.2,1):1;if(vis>.5){z=1.07;cx=interp(ch.x,a(i)+.3);cy=GY-420}else if(c==='R'){z=1.08;cx=FRX;cy=GY-420}}
    k.push([a(i)-.35,z,cx,cy])}
  CAMK=k;return k}
function camAt(T){const k=camKeys();let i=-1;for(let j=0;j<k.length;j++)if(k[j][0]<=T)i=j;
  const tgt=i<0?[0,1,W/2,H/2]:k[i],prev=i<1?[0,1,W/2,H/2]:k[i-1];const u=i<0?1:sm(clamp((T-tgt[0])/1.0,0,1));
  let z=lerp(prev[1],tgt[1],u),cx=lerp(prev[2],tgt[2],u),cy=lerp(prev[3],tgt[3],u);z*=1+.01*Math.sin(T*.25);
  const hw=W/2/z,hh=H/2/z;cx=clamp(cx,hw,W-hw);cy=clamp(cy,hh,H-hh);return{z,cx,cy}}
function applyCam(ctx,T){const c=camAt(T);ctx.setTransform(c.z,0,0,c.z,W/2-c.z*c.cx,H/2-c.z*c.cy)}
// ===================== background: society corridor =====================
function doorS(x,num,shut){const w=200,h=430,y=GY;X.fillStyle='#2b1a10';X.fillRect(x-w/2,y-h,w,h);
  const op=1-shut;const dw=w*(1-op*.75);X.fillStyle='#9a5b2e';X.strokeStyle='#111';X.lineWidth=6;X.beginPath();X.rect(x-w/2,y-h,dw,h);X.fill();X.stroke();
  if(dw>80){X.strokeStyle='rgba(0,0,0,.28)';X.lineWidth=4;X.strokeRect(x-w/2+20,y-h+26,dw-40,160);X.strokeRect(x-w/2+20,y-h+210,dw-40,190);X.fillStyle='#ffd23f';X.beginPath();X.arc(x-w/2+dw-24,y-h*.47,9,0,7);X.fill()}
  X.strokeStyle='#5a3a24';X.lineWidth=14;X.strokeRect(x-w/2-4,y-h-4,w+8,h+4);
  X.fillStyle='#fff7e0';X.beginPath();X.roundRect(x-34,y-h-62,68,40,8);X.fill();X.lineWidth=4;X.strokeStyle='#111';X.stroke();X.fillStyle='#111';X.font='800 26px "Baloo 2",Arial';X.textAlign='center';X.textBaseline='middle';X.fillText(num,x,y-h-41)}
function fridge(T){const x=FRX,w=230,h=540,y=GY;
  // body
  X.fillStyle='#dfe8ef';X.strokeStyle='#111';X.lineWidth=7;X.beginPath();X.roundRect(x-w/2,y-h,w,h,18);X.fill();X.stroke();
  X.beginPath();X.moveTo(x-w/2,y-h*.68);X.lineTo(x+w/2,y-h*.68);X.stroke();
  X.fillStyle='#9aa7b3';X.fillRect(x+w/2-34,y-h+50,10,80);X.fillRect(x+w/2-34,y-h*.6,10,110);
  // door open while Ramesh jumps in, ajar while he talks inside
  let op=0;const t0=a(4)+.6,t1=IN()+.25;if(T>t0&&T<t1)op=Math.sin(clamp((T-t0)/(t1-t0),0,1)*Math.PI)*.9;
  const peek=(T>a(6)-.25&&T<b(6)+.35)||(T>a(9)-.25&&T<OUT());if(peek)op=Math.max(op,.32);
  if(op>0){const dw=w*op;X.fillStyle='#d9f3ff';X.fillRect(x-w/2+8,y-h*.68+8,w-16,h*.68-16);
    if(peek){const fx=x-w/2+38,fy=y-h*.42;X.fillStyle='#f2b48a';X.beginPath();X.arc(fx,fy,34,0,7);X.fill();X.lineWidth=5;X.strokeStyle='#111';X.stroke();
      X.fillStyle='#111';X.beginPath();X.arc(fx,fy-4,35,Math.PI*1.05,Math.PI*1.95);X.fill();
      X.fillStyle='#fff';for(const dx of [-10,12]){X.beginPath();X.ellipse(fx+dx,fy+2,8,9,0,0,7);X.fill();X.stroke()}X.fillStyle='#111';for(const dx of [-8,14]){X.beginPath();X.arc(fx+dx,fy+3,3.5,0,7);X.fill()}
      const tk=inAny(talkOf('R'),T);X.fillStyle='#7a1f2b';X.beginPath();X.ellipse(fx+2,fy+20,7,tk?3+Math.abs(Math.sin(T*13))*6:2,0,0,7);X.fill();
      // frost on hair
      X.fillStyle='rgba(255,255,255,.85)';for(let i=0;i<5;i++){X.beginPath();X.arc(fx-24+i*12,fy-30+Math.sin(i)*3,4,0,7);X.fill()}}
    X.fillStyle='#eef4f8';X.strokeStyle='#111';X.lineWidth=7;X.beginPath();X.rect(x-w/2-dw*.2,y-h*.68,-dw,h*.68);X.fill();X.stroke();
    // cold mist
    X.fillStyle='rgba(220,245,255,.45)';for(let i=0;i<6;i++){const mx=x-w/2+20+hash(i)*60+Math.sin(T*2+i)*12,my=y-h*.3+i*28;X.beginPath();X.arc(mx-(T*30%40),my,22+i*3,0,7);X.fill()}}
  else{X.strokeStyle='#111';X.lineWidth=7;X.beginPath();X.roundRect(x-w/2,y-h*.68,w,h*.68,0);X.stroke()}
  // magnets
  X.fillStyle='#ff6b6b';X.beginPath();X.arc(x-40,y-h+90,12,0,7);X.fill();X.fillStyle='#ffd23f';X.fillRect(x+10,y-h+120,30,20)}
function bgWorld(T){
  X.fillStyle='#f6e7c8';X.fillRect(0,0,W,GY);
  X.fillStyle='#ecd6ae';for(let y=60;y<GY-200;y+=120)for(let x=(y/120%2)*70;x<W;x+=140){X.beginPath();X.arc(x,y,10,0,7);X.fill()}
  X.fillStyle='#c98b5c';X.fillRect(0,GY-150,W,150);X.fillStyle='#b37848';X.fillRect(0,GY-162,W,14);
  // notice board
  X.fillStyle='#2f6b3a';X.beginPath();X.roundRect(380,330,320,190,14);X.fill();X.lineWidth=10;X.strokeStyle='#8b5a2b';X.stroke();
  X.fillStyle='#fff';X.font='800 40px "Baloo 2",Arial';X.textAlign='center';X.textBaseline='middle';X.fillText('सोसाइटी सूचना',540,378);
  X.fillStyle='#fff7a8';X.fillRect(410,410,120,90);X.fillStyle='#ffd1dc';X.fillRect(550,415,120,80);X.fillStyle='#333';X.font='700 22px "Baloo 2",Arial';X.fillText('पानी 6 बजे',470,455);X.fillText('मीटिंग',610,455);
  // tube light
  X.fillStyle='#fffde8';X.beginPath();X.roundRect(420,220,240,22,11);X.fill();X.lineWidth=4;X.strokeStyle='#111';X.stroke();
  const shut=T>a(3)+.5?1:0;
  doorS(140,'101',T>a(3)+.55?1:0);doorS(940,'103',T>a(3)+.85?1:0);
  fridge(T);
  // floor
  const g=X.createLinearGradient(0,GY,0,H);g.addColorStop(0,'#b9c3cc');g.addColorStop(1,'#8e9aa6');X.fillStyle=g;X.fillRect(0,GY,W,H-GY);
  X.strokeStyle='rgba(0,0,0,.15)';X.lineWidth=3;for(let i=-4;i<10;i++){X.beginPath();X.moveTo(W/2+i*140,GY);X.lineTo(W/2+i*300,H);X.stroke()}
  X.fillStyle='rgba(0,0,0,.25)';X.fillRect(0,GY,W,8);
  // red alert wash while panic
  if(T>a(1)+1.3&&T<b(7)){const p=.10+.06*Math.sin(T*8);X.fillStyle=`rgba(230,57,70,${p})`;X.fillRect(0,0,W,GY)}}
function bgNow(T){X.fillStyle='#111';X.fillRect(0,0,W,H);X.save();applyCam(X,T);bgWorld(T);X.restore();X.setTransform(1,0,0,1,0,0)}
// ===================== the fake lion (drawn on X) =====================
function lionX(x,y,s,T,o={}){X.save();X.translate(x,y);X.scale(s,s);X.lineJoin='round';
  const gl=o.glitch?Math.floor(T*12)%9===0:false;if(gl)X.translate((hash(Math.floor(T*30))-.5)*14,0);
  const ink=()=>{X.strokeStyle='#111';X.lineWidth=7};
  // tail through wall
  ink();X.lineWidth=12;X.beginPath();X.moveTo(-150,-20);X.quadraticCurveTo(-240,-80,-300,-40);X.stroke();X.strokeStyle='#e0a040';X.lineWidth=6;X.stroke();
  if(o.wall){X.fillStyle='#8c6a4a';X.fillRect(-285,-200,40,260);X.strokeStyle='#111';X.lineWidth=5;X.strokeRect(-285,-200,40,260);
    X.strokeStyle='#111';X.lineWidth=12;X.beginPath();X.moveTo(-245,-55);X.quadraticCurveTo(-300,-40,-330,-90);X.stroke();X.strokeStyle='#e0a040';X.lineWidth=6;X.stroke();X.fillStyle='#7a3b12';X.beginPath();X.arc(-332,-94,14,0,7);X.fill()}
  // legs (5!)
  const legx=[-110,-60,10,60,110];legx.forEach((lx,i)=>{const sw=Math.sin(T*6+i*1.3)*6;X.fillStyle='#e8a33c';ink();X.beginPath();X.roundRect(lx-17+sw,10,34,95,14);X.fill();X.stroke();X.fillStyle='#d8902a';X.beginPath();X.ellipse(lx+sw,108,22,12,0,0,7);X.fill();X.stroke()});
  // body
  X.fillStyle='#f0b04a';ink();X.beginPath();X.ellipse(0,0,170,85,0,0,7);X.fill();X.stroke();
  // mane
  X.save();X.translate(150,-70);const n=16;X.beginPath();for(let i=0;i<=n*2;i++){const r=i%2?78:104,an=i/(n*2)*6.283+T*.4;X.lineTo(Math.cos(an)*r,Math.sin(an)*r)}X.closePath();X.fillStyle='#b5651d';X.fill();ink();X.stroke();
  // face
  X.fillStyle='#f6c15c';X.beginPath();X.arc(0,0,66,0,7);X.fill();X.stroke();
  X.fillStyle='#111';for(const dx of [-22,22]){X.beginPath();X.arc(dx,-12,8,0,7);X.fill()}
  X.fillStyle='#7a3b12';X.beginPath();X.moveTo(-14,12);X.lineTo(14,12);X.lineTo(0,28);X.closePath();X.fill();
  X.lineWidth=5;X.beginPath();X.moveTo(0,28);X.lineTo(0,38);X.moveTo(-20,44);X.quadraticCurveTo(0,30,20,44);X.stroke();
  if(o.roar){X.fillStyle='#7a1f2b';X.beginPath();X.ellipse(0,48,22,14+Math.abs(Math.sin(T*9))*8,0,0,7);X.fill();X.stroke()}
  X.restore();
  // AI shimmer pixels
  if(o.glitch){X.globalAlpha=.6;for(let i=0;i<10;i++){const px=(hash(i+Math.floor(T*8))-.5)*360,py=(hash(i*3+Math.floor(T*8))-.5)*200;X.fillStyle=['#41e3ff','#ff4d6d','#7cff9b'][i%3];X.fillRect(px,py,14,6)}X.globalAlpha=1}
  X.restore()}
function catX(x,y,s,T){X.save();X.translate(x,y);X.scale(s,s);X.strokeStyle='#111';X.lineWidth=7;X.lineJoin='round';
  X.fillStyle='#f5f0e6';X.beginPath();X.moveTo(-60,10);X.quadraticCurveTo(-130,-10+Math.sin(T*5)*10,-110,-70);X.lineWidth=16;X.stroke();X.strokeStyle='#f5f0e6';X.lineWidth=8;X.stroke();
  X.strokeStyle='#111';X.lineWidth=7;X.beginPath();X.ellipse(0,20,90,60,0,0,7);X.fill();X.stroke();
  X.fillStyle='#ff9f43';X.beginPath();X.ellipse(-20,10,30,22,0,0,7);X.fill();
  X.fillStyle='#f5f0e6';X.beginPath();X.arc(80,-40,56,0,7);X.fill();X.stroke();
  for(const dx of [-30,30]){X.beginPath();X.moveTo(80+dx*.9,-80);X.lineTo(80+dx*1.2,-120);X.lineTo(80+dx*.2,-92);X.closePath();X.fill();X.stroke()}
  X.fillStyle='#ffe34d';for(const dx of [-18,18]){X.beginPath();X.ellipse(80+dx,-44,10,13,0,0,7);X.fill();X.lineWidth=4;X.stroke()}X.fillStyle='#111';for(const dx of [-18,18]){X.beginPath();X.ellipse(80+dx,-44,3,10,0,0,7);X.fill()}
  X.fillStyle='#ff7aa2';X.beginPath();X.moveTo(74,-24);X.lineTo(86,-24);X.lineTo(80,-16);X.closePath();X.fill();
  X.strokeStyle='#111';X.lineWidth=3;for(const sgn of [-1,1])for(const dy of [-4,6]){X.beginPath();X.moveTo(80+sgn*14,-18+dy*.3);X.lineTo(80+sgn*58,-22+dy);X.stroke()}
  X.restore()}
// ===================== screen-space cards =====================
function xt(txt,x,y,size,col,al=1,o={}){X.save();X.globalAlpha=al;X.font=`800 ${size}px "Baloo 2",Arial`;X.textAlign=o.align||'center';X.textBaseline='middle';X.lineJoin='round';if(o.stroke!==false){X.lineWidth=size*.16;X.strokeStyle='#111';X.strokeText(txt,x,y)}X.fillStyle=col;X.fillText(txt,x,y);X.restore()}
function phoneFrame(cx,cy,w,h,k,al,draw){X.save();X.globalAlpha=al;X.translate(cx,cy);X.scale(k,k);
  X.fillStyle='rgba(0,0,0,.35)';X.beginPath();X.roundRect(-w/2+14,-h/2+16,w,h,48);X.fill();
  X.fillStyle='#14161c';X.beginPath();X.roundRect(-w/2,-h/2,w,h,48);X.fill();X.lineWidth=8;X.strokeStyle='#111';X.stroke();
  X.save();X.beginPath();X.roundRect(-w/2+18,-h/2+18,w-36,h-36,32);X.clip();draw(-w/2+18,-h/2+18,w-36,h-36);X.restore();
  X.fillStyle='#14161c';X.beginPath();X.roundRect(-50,-h/2+12,100,22,11);X.fill();X.restore()}
function waChat(x,y,w,h,T,o={}){// WhatsApp-like group chat with the fake video
  X.fillStyle='#efe6dd';X.fillRect(x,y,w,h);X.fillStyle='#075e54';X.fillRect(x,y,w,96);
  X.fillStyle='#cfe9e2';X.beginPath();X.arc(x+60,y+50,28,0,7);X.fill();X.fillStyle='#075e54';X.font='800 30px "Baloo 2",Arial';X.textAlign='center';X.textBaseline='middle';X.fillText('स',x+60,y+52);
  X.fillStyle='#fff';X.textAlign='left';X.font='800 32px "Baloo 2",Arial';X.fillText('सोसाइटी परिवार',x+104,y+38);X.font='600 22px "Baloo 2",Arial';X.fillText('शर्मा आंटी, अंकल, +245',x+104,y+70);
  // bubble
  const bx=x+22,by=y+124,bw=w-70,bh=h-190;X.fillStyle='#fff';X.beginPath();X.roundRect(bx,by,bw,bh,20);X.fill();
  X.fillStyle='#8696a0';X.font='italic 600 22px "Baloo 2",Arial';X.fillText('↪↪ कई बार फ़ॉरवर्ड किया गया',bx+20,by+30);
  // video area
  const vx=bx+16,vy=by+52,vw=bw-32,vh=bh*.58;X.save();X.beginPath();X.roundRect(vx,vy,vw,vh,14);X.clip();
  X.fillStyle='#6f7f6a';X.fillRect(vx,vy,vw,vh);X.fillStyle='#55654f';X.fillRect(vx,vy+vh*.62,vw,vh*.38);
  X.fillStyle='rgba(255,255,255,.18)';X.fillRect(vx+vw*.62,vy+20,vw*.3,vh*.5);
  const lu=o.morph||0;
  if(lu<1)X.globalAlpha=1-lu,lionX(vx+vw*.5,vy+vh*.62,o.ls||.62,T,{glitch:true,roar:o.roar,wall:o.wall}),X.globalAlpha=1;
  if(lu>0){X.globalAlpha=lu;catX(vx+vw*.48,vy+vh*.72,.9,T);X.globalAlpha=1}
  X.fillStyle='rgba(0,0,0,.45)';X.beginPath();X.roundRect(vx+12,vy+vh-46,120,34,10);X.fill();X.fillStyle='#fff';X.font='700 22px "Baloo 2",Arial';X.fillText('▶  0:07',vx+26,vy+vh-28);
  if(o.rec){X.fillStyle='#e63946';X.beginPath();X.arc(vx+vw-36,vy+30,10,0,7);X.fill()}
  X.restore();
  X.fillStyle='#111';X.font='800 30px "Baloo 2",Arial';X.fillText('सोसाइटी में शेर घुस आया!!',bx+20,vy+vh+42);
  X.fillStyle='#e63946';X.fillText('जल्दी फ़ॉरवर्ड करो!!!',bx+20,vy+vh+84);
  X.fillStyle='#8696a0';X.font='600 20px "Baloo 2",Arial';X.textAlign='right';X.fillText('12:01 ✓✓',bx+bw-16,by+bh-18);
  return{vx,vy,vw,vh}}
function circleNote(x,y,r,txt,al,T,tx,ty){if(al<=0)return;X.save();X.globalAlpha=al;X.strokeStyle='#e63946';X.lineWidth=9;X.setLineDash([]);X.beginPath();X.ellipse(x,y,r*1.15,r,-.1,0,7*al);X.stroke();
  X.lineWidth=6;X.beginPath();X.moveTo(x+(tx>x?r:-r)*.9,y-r*.3);X.lineTo(tx,ty+20);X.stroke();X.restore();
  X.save();X.globalAlpha=al;X.font='800 36px "Baloo 2",Arial';const w=X.measureText(txt).width+36;X.fillStyle='#e63946';X.beginPath();X.roundRect(tx-w/2,ty-26,w,52,14);X.fill();X.lineWidth=5;X.strokeStyle='#111';X.stroke();X.fillStyle='#fff';X.textAlign='center';X.textBaseline='middle';X.fillText(txt,tx,ty+2);X.restore()}
function cards(T){
  // ---- hook + aunty forwarding (L0..L2)
  const t0=0,t1=b(2)+.5;
  if(T<t1){const al=Math.min(u01(T,t0,.25),1-u01(T,t1-.35,.35));const k=back(u01(T,.0,.45))*(1-.25*sm(u01(T,a(1)-.3,.6)));
    const cy=lerp(820,700,sm(u01(T,a(1)-.3,.6)));
    phoneFrame(540,cy,640,1000,k,al,(x,y,w,h)=>waChat(x,y,w,h,T,{rec:true,roar:Math.sin(T*2)>0}));
    if(T<a(1)){const p=al*(Math.sin(T*10)>0?1:.5);xt('अलर्ट! अलर्ट!',540,1385,64,'#ff4d6d',p)}
    if(T>a(2)-.1){const n=Math.min(47,Math.floor(1+46*u01(T,a(2)+.5,1.6)));const k2=back(u01(T,a(2),.3));
      X.save();X.translate(540,1270);X.scale(k2,k2);X.fillStyle='#25d366';X.beginPath();X.roundRect(-250,-56,500,112,56);X.fill();X.lineWidth=7;X.strokeStyle='#111';X.stroke();X.restore();
      xt(`फ़ॉरवर्ड ➜ ${n} ग्रुप`,540,1272,54*k2,'#fff',al);
      for(let i=0;i<6;i++){const u=frac(T*.9+i/6);X.save();X.globalAlpha=al*(1-u);X.translate(540+(i-2.5)*120,1180-u*520);X.rotate(-.5+i*.2);X.fillStyle='#25d366';X.beginPath();X.moveTo(-26,-12);X.lineTo(12,-12);X.lineTo(12,-26);X.lineTo(36,0);X.lineTo(12,26);X.lineTo(12,12);X.lineTo(-26,12);X.closePath();X.fill();X.lineWidth=4;X.strokeStyle='#111';X.stroke();X.restore()}}}
  // ---- location tag
  if(T>a(3)-.2&&T<a(3)+2.6){const al=Math.min(u01(T,a(3)-.2,.3),1-u01(T,a(3)+2.2,.4));X.save();X.globalAlpha=al;X.font='700 30px "Baloo 2",Arial';const s='गुलमोहर सोसाइटी · रात 12 बजे',w=X.measureText(s).width+44;X.fillStyle='rgba(17,17,17,.82)';X.beginPath();X.roundRect(W-w-40,330,w,52,26);X.fill();X.fillStyle='#fff';X.textAlign='center';X.textBaseline='middle';X.fillText(s,W-w/2-40,357);X.restore()}
  // panic bursts
  // ---- zoom investigation (L8..L12)
  const z0=a(8)+.9,z1=b(12)+.8;
  if(T>z0&&T<z1){const al=Math.min(u01(T,z0,.3),1-u01(T,z1-.4,.4));const k=back(u01(T,z0,.5));
    const zoom=1+.9*sm(u01(T,a(8)+1.2,.9));const morph=sm(u01(T,tw(12,'बिल्ली')-.1,.8));
    phoneFrame(540,700,700,860,k,al,(x,y,w,h)=>{X.fillStyle='#000';X.fillRect(x,y,w,h);
      X.save();X.translate(x+w/2,y+h*.48);X.scale(zoom,zoom);X.translate(-(x+w/2),-(y+h*.48));
      X.fillStyle='#6f7f6a';X.fillRect(x,y,w,h);X.fillStyle='#55654f';X.fillRect(x,y+h*.6,w,h*.4);
      X.fillStyle='rgba(255,255,255,.15)';X.fillRect(x+w*.66,y+40,w*.28,h*.4);
      if(morph<1){X.globalAlpha=al*(1-morph);lionX(x+w*.52,y+h*.6,.62,T,{glitch:true,wall:true});X.globalAlpha=al}
      if(morph>0){X.globalAlpha=al*morph;catX(x+w*.5,y+h*.66,.95,T);X.globalAlpha=al}
      X.restore();
      // zoom HUD
      X.strokeStyle='rgba(255,255,255,.8)';X.lineWidth=4;const m=30;for(const [cx,cy,sx,sy] of [[x+m,y+m,1,1],[x+w-m,y+m,-1,1],[x+m,y+h-m,1,-1],[x+w-m,y+h-m,-1,-1]]){X.beginPath();X.moveTo(cx,cy+sy*40);X.lineTo(cx,cy);X.lineTo(cx+sx*40,cy);X.stroke()}
      X.fillStyle='#fff';X.font='800 30px "Baloo 2",Arial';X.textAlign='left';X.textBaseline='middle';X.fillText('ज़ूम '+(zoom*2).toFixed(1)+'x',x+50,y+60)});
    // annotations (screen space, while lion visible)
    const la=al*(1-morph);
    if(T>tw(10,'पाँच')-.05)circleNote(540+(.52*620-310)*1+0,700+(.6*824-412)+85*1.4,150,'5 पैर!',la*u01(T,tw(10,'पाँच')-.05,.25),T,300,1130);
    if(T>tw(10,'पूँछ')-.05)circleNote(540+(.52*620-310)-260,700+(.6*824-412)-60,90,'दीवार के आर-पार',la*u01(T,tw(10,'पूँछ')-.05,.25),T,290,330);
    if(T>tw(10,'परछाईं')-.05){const al2=la*u01(T,tw(10,'परछाईं')-.05,.25);circleNote(640,1010,90,'परछाईं ग़ायब',al2,T,800,1130)}
    if(morph>.3){const al3=al*u01(T,tw(12,'बिल्ली')+.2,.3);X.save();X.globalAlpha=al3;X.translate(820,360);X.rotate(.12);X.fillStyle='#ffd23f';X.beginPath();X.roundRect(-150,-46,300,92,16);X.fill();X.lineWidth=7;X.strokeStyle='#111';X.stroke();X.restore();xt('AI एडिट!',820,362,48,'#111',al3,{stroke:false})}}
  // ---- checklist (L13..L14)
  const c0=a(13)+.2,c1=b(14)+1.0;
  if(T>c0&&T<c1){const al=Math.min(u01(T,c0,.3),1-u01(T,c1-.4,.4));const k=back(u01(T,c0,.5));
    X.save();X.globalAlpha=al;X.translate(540,620);X.scale(k,k);X.fillStyle='#fff';X.beginPath();X.roundRect(-430,-260,860,520,36);X.fill();X.lineWidth=9;X.strokeStyle='#111';X.stroke();
    X.fillStyle='#00b8d4';X.beginPath();X.roundRect(-430,-260,860,110,[36,36,0,0]);X.fill();X.stroke();X.restore();
    xt('फ़ॉरवर्ड से पहले 3 चेक',540,420*k+620*(1-k)+0,52,'#fff',al);
    const items=[['अजीब डिटेल्स देखो',tw(14,'अजीब')],['न्यूज़ चेक करो',tw(14,'न्यूज़')],['फिर फ़ॉरवर्ड करो',tw(14,'फिर')]];
    items.forEach(([s,t],i)=>{if(T<t-.1)return;const u=back(u01(T,t-.1,.3));const y=560+i*120;X.save();X.globalAlpha=al;X.translate(220,y);X.scale(u,u);X.fillStyle='#1fb85a';X.beginPath();X.arc(0,0,38,0,7);X.fill();X.lineWidth=6;X.strokeStyle='#111';X.stroke();X.strokeStyle='#fff';X.lineWidth=9;X.beginPath();X.moveTo(-16,0);X.lineTo(-4,14);X.lineTo(18,-14);X.stroke();X.restore();
      xt(`${i+1}. ${s}`,290,y,50,'#111',al*u01(T,t-.1,.2),{align:'left',stroke:false})})}
  // ---- aunty forwards the fact-check (L15)
  const f0=a(15)+1.2,f1=b(16)+.6;
  if(T>f0&&T<f1){const al=Math.min(u01(T,f0,.25),1-u01(T,f1-.3,.3));const n=Math.min(47,Math.floor(1+46*u01(T,f0+.2,1.2)));const k2=back(u01(T,f0,.35));
    X.save();X.globalAlpha=al;X.translate(540,560);X.scale(k2,k2);X.fillStyle='#fff';X.beginPath();X.roundRect(-380,-120,760,240,30);X.fill();X.lineWidth=8;X.strokeStyle='#111';X.stroke();X.restore();
    xt('फ़ैक्ट-चेक: शेर नकली है!',540,515,46,'#1fb85a',al,{stroke:false});
    X.save();X.globalAlpha=al;X.translate(540,605);X.fillStyle='#25d366';X.beginPath();X.roundRect(-230,-36,460,72,36);X.fill();X.lineWidth=5;X.strokeStyle='#111';X.stroke();X.restore();
    xt(`फ़ॉरवर्ड ➜ ${n} ग्रुप`,540,607,40,'#fff',al)}
}
// ===================== tags + end =====================
function nameTag(T){let li=-1;for(let i=0;i<NL;i++)if(T>=a(i)-.1&&T<=b(i)+.4)li=i;if(li<0)return;const c=SPK[li];if(c==='N')return;
  X.save();X.setTransform(1,0,0,1,0,0);X.font='700 28px "Baloo 2",Arial';const nm=SNAME[c],w=X.measureText(nm).width+32,x=W/2,y=CAPY-102;
  X.fillStyle=SCOL[c];X.beginPath();X.roundRect(x-w/2,y-18,w,36,18);X.fill();X.lineWidth=3;X.strokeStyle='#111';X.stroke();X.fillStyle='#111';X.textAlign='center';X.textBaseline='middle';X.fillText(nm,x,y+2);X.restore()}
function endCard(T){X.setTransform(1,0,0,1,0,0);cards(T);nameTag(T);
  const te=b(16)+.5;if(T<te)return;const al=u01(T,te,.4);X.fillStyle=`rgba(10,20,40,${.75*al})`;X.fillRect(0,0,W,H);
  xt('शेर नकली, सीख असली!',540,760,70,'#ffd23f',al);
  xt('फ़ॉरवर्ड से पहले चेक करो',540,870,56,'#fff',u01(T,te+.3,.4));
  xt('फ़ॉलो करो · Ramesh Ki Kahaniya',540,990,44,'#7cff9b',u01(T,te+.6,.4))}
// ===================== world =====================
function world(T){
  G.setTransform(1,0,0,1,0,0);G.clearRect(0,0,W,H);G.globalAlpha=1;applyCam(G,T);
  // real cat walks in at the reveal
  if(T>tw(12,'बिल्ली')+.6){const u=outq(u01(T,tw(12,'बिल्ली')+.6,1.4));iCat(lerp(1200,330,u),GY-40,.8,T,'#f5f0e6')}
  const sS=drawChar(CH.S,T),sP=drawChar(CH.P,T),sU=drawChar(CH.U,T),sR=drawChar(CH.R,T);
  if((T>a(1)-.8&&T<b(3))||T>a(15)-.2)heldPhone(sS,'#25d366',T);
  if(T>a(8)-.4&&T<b(12)+.2)heldPhone(sP,'#41e3ff',T);
  if(T>a(7)-.3&&T<b(7)+.4)heldPhone(sU,'#ffd23f',T);
  // panic bursts
  burst(170,560,110,'धड़ाम!','#ff4d6d',T,a(3)+.55,1.0,-.1);burst(930,560,110,'धड़ाम!','#ff4d6d',T,a(3)+.85,1.0,.1);
  burst(FRX,780,100,'घुस गया!','#41e3ff',T,IN()-.05,1.1,-.08,'#111');
  burst(820,620,110,'ठंडा शेर?!','#ffd23f',T,a(6)+1.2,1.3,.08,'#111');
  burst(260,700,110,'म्याऊँ!','#ff8fd8',T,tw(12,'बिल्ली')+1.8,1.3,-.1,'#111');
  [sS,sP,sU,sR].forEach((s,i)=>{if(s.vis>.3)reg('c'+i,s.x,GY-260,200,520)});
}
__w.LOOK={bg:bgNow,
  cap:{mode:'box',fill:'rgba(12,14,24,.86)',ink:'rgba(255,255,255,.35)',lw:3,sh:0,shc:'#000',txt:'#f1f5ff',hl:'#ffb84d',hls:null,hlw:0,font:'700 50px "Baloo 2",Arial',size:50,maxw:900,rowh:62,pad:56,r:20},
  chip:{fill:'#fff',ink:'#111',sh:'#111',a:'#111',b:'#00b8d4',r:.5},
  frame(T){endCard(T);X.strokeStyle='#111';X.lineWidth=20;X.strokeRect(0,0,W,H)}};

;Object.assign(SETS,{society:(typeof bgWorld==='function'?bgWorld:null)});})();
(function(){const __w={};const tw=()=>1e9,twe=()=>1e9,LS=()=>1e9,LE=()=>1e9,tk=()=>1e9,tke=()=>1e9,fol=()=>1e9;
const META={name:'GAMING',sub:'कॉमेडी',ep:'GTA 6 Special',col:'#8a3bff'};
const THEME={hl:'#7cff9b'};
const CAPS={fill:'#180a38',ink:'#b58bff',lw:6,sh:10,shc:'#000',txt:'#ece3ff',hl:'#7cff9b',hls:'#180a38',r:26};
const CHPS={fill:'#180a38',ink:'#b58bff',sh:'#000',a:'#ece3ff',b:'#b58bff',r:.5};
const __PS={ink:'#0a0d2a',lw:9};

let T_LIVING=16;   // set in build() from timeline: gaming starts at line 5
const PAL={skin:'#f2b48a',shirt:'#ffffff',shirtD:'#e9edf2',pants:'#2f5bd2',pantsD:'#2449ad',shoe:'#7a3b12',hair:'#111',hood:'#222',tie:'#e63946'};
let TV1=28, LIVE0=16, LIVE1=27, PH0=18, PH1=22, MG0=20, MG1=26;
function build(){
  const L=i=>LS(i), E=i=>LE(i);
  T_LIVING=L(5)-.15; TV1=E(7); LIVE0=L(5)+.3; LIVE1=E(7)-.2; PH0=L(6); PH1=L(7)+1.5; MG0=L(7)-.1; MG1=E(7);
  CH.R={kind:'ramesh',hd:'ramesh',seed:1,pal:PAL,
    x:[[0,420],[L(5),400],[TL.dur,400]],
    face:[[0,1]],
    pose:[[0,'idle'],[L(1),'ear',.3],[L(3),'cheer',.25],[L(3)+1.6,'idle',.3],[L(4),'idea',.3],
          [L(5),'cheer',.3],[L(6),'idle',.3],[L(7),'shock',.18],[L(7)+2.5,'slump',.3],[L(8),'slump',.4]],
    ex:[[0,'worried'],[L(1),'neutral'],[L(2),'worried'],[L(3),'happy'],[L(6),'happy'],[L(7),'shock'],[L(8),'sad']],
    talk:[[L(2),E(2)],[L(4),E(5)]],
    trem:[[L(7),0],[L(7)+.1,3],[L(7)+1.8,0]],
    jy:[[L(3),0],[L(3)+.3,46,'out'],[L(3)+.7,0],[L(5),0],[L(5)+.3,42,'out'],[L(5)+.7,0]],dip:[]};
}

/* ---------- backgrounds ---------- */
function bgBedroom(T){
  const g=X.createLinearGradient(0,0,0,1400);g.addColorStop(0,'#2a3566');g.addColorStop(1,'#46568f');X.fillStyle=g;X.fillRect(0,0,W,H);
  X.fillStyle='#0d1740';X.fillRect(760,470,260,300);
  const sg=X.createRadialGradient(890,600,10,890,600,150);sg.addColorStop(0,'rgba(255,240,180,.95)');sg.addColorStop(1,'rgba(255,240,180,0)');X.fillStyle=sg;X.fillRect(700,440,360,360);
  X.fillStyle='#ffe59a';X.beginPath();X.arc(890,600,46,0,7);X.fill();
  X.strokeStyle='#cdd6f5';X.lineWidth=9;X.strokeRect(760,470,260,300);X.beginPath();X.moveTo(890,470);X.lineTo(890,770);X.moveTo(760,620);X.lineTo(1020,620);X.stroke();
  X.fillStyle='#1b2450';X.fillRect(0,1406,W,H-1406);
  X.strokeStyle='rgba(205,214,245,.12)';X.lineWidth=4;for(let i=-6;i<12;i++){X.beginPath();X.moveTo(540+i*60,1406);X.lineTo(540+i*260,H);X.stroke()}
  X.fillStyle='#3a4681';X.strokeStyle='#0a0d2a';X.lineWidth=9;X.beginPath();X.roundRect(120,1120,560,300,26);X.fill();X.stroke();
  X.fillStyle='#5566a8';X.beginPath();X.roundRect(140,1150,520,180,20);X.fill();
  X.fillStyle='#e9edf2';X.beginPath();X.roundRect(150,1140,180,120,18);X.fill();X.stroke();
  X.fillStyle='#fff';X.beginPath();X.arc(300,560,54,0,7);X.fill();X.lineWidth=7;X.strokeStyle='#0a0d2a';X.stroke();
  X.lineWidth=6;X.beginPath();X.moveTo(300,560);X.lineTo(300,524);X.moveTo(300,560);X.lineTo(330,560);X.stroke();
}
function bgLiving(T){
  const g=X.createLinearGradient(0,0,0,1400);g.addColorStop(0,'#1a1038');g.addColorStop(1,'#3a1d6e');X.fillStyle=g;X.fillRect(0,0,W,H);
  const rg=X.createRadialGradient(760,560,40,760,560,620);rg.addColorStop(0,'rgba(138,59,255,.4)');rg.addColorStop(1,'rgba(138,59,255,0)');X.fillStyle=rg;X.fillRect(0,0,W,H);
  X.strokeStyle='rgba(181,139,255,.10)';X.lineWidth=4;for(let x=0;x<=W;x+=96){X.beginPath();X.moveTo(x,720);X.lineTo(x,1406);X.stroke()}for(let y=720;y<=1406;y+=96){X.beginPath();X.moveTo(0,y);X.lineTo(W,y);X.stroke()}
  X.fillStyle='#120a2a';X.fillRect(0,1406,W,H-1406);X.strokeStyle='rgba(181,139,255,.14)';X.lineWidth=4;for(let i=-6;i<12;i++){X.beginPath();X.moveTo(540+i*60,1406);X.lineTo(540+i*260,H);X.stroke()}
  const on=T>=T_LIVING&&T<=TV1;
  X.fillStyle='#241433';X.fillRect(620,1010,420,110);
  const sx=640,sy=660,sw=440,sh=320;
  X.fillStyle='#0d0d14';X.strokeStyle='#000';X.lineWidth=12;X.beginPath();X.roundRect(sx-10,sy-10,sw+20,sh+20,16);X.fill();X.stroke();
  if(on){
    const gg=X.createLinearGradient(sx,sy,sx,sy+sh);gg.addColorStop(0,'#2a0b4a');gg.addColorStop(.5,'#6e1b6b');gg.addColorStop(1,'#ff6a3d');X.fillStyle=gg;X.beginPath();X.roundRect(sx,sy,sw,sh,8);X.fill();
    X.fillStyle='#140024';for(let i=0;i<7;i++){const bw=30+((i*53)%40),bh=46+((i*37)%90);X.fillRect(sx+12+i*60,sy+sh-66-bh,bw,bh)}
    X.fillStyle='#1a1a22';X.fillRect(sx,sy+sh-66,sw,66);
    X.fillStyle='#fff';X.font='700 28px "Baloo 2",Arial';X.textAlign='left';X.fillText('GTA VI',sx+14,sy+32);
    X.fillStyle='#2eff8f';X.textAlign='right';X.fillText('$ 45,200',sx+sw-14,sy+32);
    X.fillStyle='#ffd23f';X.fillText('★★★☆☆',sx+sw-14,sy+66);
    X.fillStyle='#2e7d32';X.beginPath();X.arc(sx+42,sy+sh-40,26,0,7);X.fill();X.strokeStyle='#fff';X.lineWidth=3;X.stroke();
    if(T>=LIVE0&&T<=LIVE1){X.fillStyle='#e60000';X.beginPath();X.roundRect(sx+sw-150,sy-52,150,40,20);X.fill();X.fillStyle='#fff';X.textAlign='center';X.font='700 24px "Baloo 2",Arial';X.fillText('● LIVE',sx+sw-75,sy-24+4)}
  } else {X.fillStyle='#141420';X.beginPath();X.roundRect(sx,sy,sw,sh,8);X.fill()}
}
__w.LOOK={bg(T){ return T<T_LIVING?bgBedroom(T):bgLiving(T) },cap:CAPS,chip:CHPS,
  frame(T){X.strokeStyle='#0a0d2a';X.lineWidth=26;X.strokeRect(0,0,W,H);X.strokeStyle='#b58bff';X.lineWidth=5;X.strokeRect(24,24,W-48,H-48)},
  over(T){}};

/* ---------- world ---------- */
function world(T){
  const sR=drawChar(CH.R,T);
  if(sR&&sR.vis>.3)reg('charR',sR.x,(sR.w(sR.hc).y+GY)/2-60,230,GY-sR.w(sR.hc).y+120);
  // GTA burst when excited (GTA 6 aa gaya)
  burst(690,560,120,'GTA 6!','#7cff9b',T,LS(3)+.8,1.4);
  burst(700,600,110,'पकड़ा गया?','#ff5a5a',T,.6,2.6);
  // manager ringing phone + caught card
  if(T>=PH0&&T<=PH1){const ph=sR?sR.w(sR.hc):{x:600,y:900};phoneShape(ph.x+150,ph.y+40,.2,'#111',T,{ring:1,on:1,sc:1.1})}
  card('mgr',T,MG0,MG1,660,310,()=>{panel(660,310,'#fff');
    stext('📱 MANAGER',0,-100,54,'#e63946');
    stext('"बीमार हो कर GTA',0,-22,54,'#0a0d2a');
    stext('live stream? 😏"',0,48,54,'#0a0d2a');
    stext('— मैं भी followers में हूँ!',0,112,38,'#555')},{y:430});
}

;Object.assign(SETS,{bedroom:(typeof bgBedroom==='function'?bgBedroom:null),gaming:(typeof bgLiving==='function'?bgLiving:null)});})();