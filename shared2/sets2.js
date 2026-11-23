// sets2.js — extra backgrounds so the scene matches the story (23 Nov 2026).
// Same flat-comic style as sets.js: wall/sky above GY, floor below, thick #111 outlines.
(function(){
const INK='#111';
function ol(w=8){X.lineWidth=w;X.strokeStyle=INK;X.lineJoin='round';X.lineCap='round'}
function rr(x,y,w,h,r,fill,lw=8){X.beginPath();X.roundRect(x,y,w,h,r);if(fill){X.fillStyle=fill;X.fill()}if(lw){ol(lw);X.stroke()}}
function floor(c1,c2,lines){const g=X.createLinearGradient(0,GY,0,H);g.addColorStop(0,c1);g.addColorStop(1,c2);X.fillStyle=g;X.fillRect(0,GY,W,H-GY);
  X.fillStyle='rgba(0,0,0,.22)';X.fillRect(0,GY,W,10);if(lines){X.strokeStyle='rgba(0,0,0,.12)';X.lineWidth=4;for(let i=-6;i<12;i++){X.beginPath();X.moveTo(540+i*60,GY);X.lineTo(540+i*170,H);X.stroke()}}}
function bulbs(y0,T,col){for(let k=0;k<3;k++){const y=y0+k*90;X.strokeStyle='#222';X.lineWidth=4;X.beginPath();X.moveTo(-20,y);for(let x=0;x<=W+40;x+=60)X.lineTo(x,y+18*Math.sin(x/120));X.stroke();
  for(let x=20;x<W;x+=60){const yy=y+18*Math.sin(x/120)+12,on=(Math.floor(T*4)+x/60+k)%3!==0;X.fillStyle=on?col[(x/60+k)%col.length]:'#444';X.beginPath();X.arc(x,yy,9,0,7);X.fill();
    if(on){X.fillStyle='rgba(255,230,150,.25)';X.beginPath();X.arc(x,yy,22,0,7);X.fill()}}}}
function marigold(x,y,len){for(let i=0;i<len;i++){X.fillStyle=i%2?'#ff9f1c':'#ffd23f';X.beginPath();X.arc(x,y+i*26,14,0,7);X.fill();ol(3);X.stroke()}}

// 1) BARAAT / WEDDING (night, lights, tent, DJ)
function bgBaraat(T){const g=X.createLinearGradient(0,0,0,GY);g.addColorStop(0,'#1b0b3a');g.addColorStop(1,'#4a1450');X.fillStyle=g;X.fillRect(0,0,W,GY);
  // tent stripes
  for(let i=0;i<12;i++){X.fillStyle=i%2?'#c9184a':'#ff8fa3';X.beginPath();X.moveTo(i*95-20,0);X.lineTo(i*95+75,0);X.lineTo(i*95+55,330);X.lineTo(i*95-40,330);X.closePath();X.fill()}
  X.fillStyle='#7a0d2e';for(let x=0;x<W;x+=80){X.beginPath();X.arc(x+40,330,40,0,Math.PI);X.fill()}ol(6);X.beginPath();X.moveTo(0,330);X.lineTo(W,330);X.stroke();
  for(let x=60;x<W;x+=160)marigold(x,345,7);
  bulbs(560,T,['#ffd23f','#ff4d6d','#7cff9b','#4dd8ff']);
  // DJ speakers + light beams
  for(const sx of [30,880]){rr(sx,980,170,330,18,'#1d1d2b');X.fillStyle='#333';for(const cy of [1060,1200]){X.beginPath();X.arc(sx+85,cy,52,0,7);X.fill();ol(6);X.stroke();X.fillStyle='#555';X.beginPath();X.arc(sx+85,cy,20+4*Math.sin(T*20),0,7);X.fill();X.fillStyle='#333'}}
  X.save();X.globalCompositeOperation='lighter';for(let k=0;k<3;k++){const a=Math.sin(T*1.3+k*2)*.5;X.fillStyle=['rgba(255,77,109,.18)','rgba(77,216,255,.16)','rgba(255,210,63,.16)'][k];X.save();X.translate(540+(k-1)*300,0);X.rotate(a);X.beginPath();X.moveTo(0,0);X.lineTo(-150,GY);X.lineTo(150,GY);X.closePath();X.fill();X.restore()}X.restore();
  floor('#8b1e3f','#4a0d22',false);X.fillStyle='#c9184a';X.fillRect(260,GY,560,H-GY);X.fillStyle='#ffd23f';X.fillRect(260,GY,14,H-GY);X.fillRect(806,GY,14,H-GY)}

// 2) ROAD / GALI (day street, shops, auto)
function bgRoad(T){const g=X.createLinearGradient(0,0,0,GY);g.addColorStop(0,'#8fd3ff');g.addColorStop(1,'#d9f1ff');X.fillStyle=g;X.fillRect(0,0,W,GY);
  X.fillStyle='#fff';for(let i=0;i<3;i++){const cx=((T*12+i*400)%1400)-150,cy=150+i*60;X.beginPath();X.arc(cx,cy,46,0,7);X.arc(cx+50,cy-18,56,0,7);X.arc(cx+105,cy,44,0,7);X.fill()}
  const shops=[['#ffb703','चाय'],['#8ecae6','MOBILE'],['#e76f51','किराना'],['#90be6d','मेडिकल']];
  shops.forEach(([c,t],i)=>{const x=i*270-10;rr(x,380,280,760,0,['#f4e1c1','#e9d5b5','#f1d8c9','#e2ead0'][i]);
    rr(x+20,560,240,90,10,c,6);X.font='800 46px "Baloo 2",Arial';X.textAlign='center';X.textBaseline='middle';X.fillStyle='#111';X.fillText(t,x+140,606);
    for(let s=0;s<5;s++){X.fillStyle=s%2?c:'#fff';X.beginPath();X.moveTo(x+20+s*48,660);X.lineTo(x+68+s*48,660);X.lineTo(x+68+s*48,720);X.arc(x+44+s*48,720,24,0,Math.PI);X.closePath();X.fill()}
    rr(x+50,760,180,380,6,'#5c4033',6);rr(x+60,420,70,100,6,'#bde0fe',5);rr(x+150,420,70,100,6,'#bde0fe',5)});
  X.fillStyle='#9a9a9a';X.fillRect(0,1140,W,40);ol(6);X.beginPath();X.moveTo(0,1140);X.lineTo(W,1140);X.stroke();
  // parked auto-rickshaw (right, behind characters' feet line)
  X.save();X.translate(820,1150);rr(0,40,220,150,40,'#1b8a3a');rr(20,0,180,70,30,'#ffd23f');rr(40,70,90,80,10,'#cde7ff',5);X.fillStyle='#222';for(const wx of [40,190]){X.beginPath();X.arc(wx,195,30,0,7);X.fill()}X.restore();
  floor('#6b6b73','#45454c',false);X.fillStyle='#fff';for(let x=-40;x<W;x+=200)X.fillRect(x,1640,110,18)}

// 3) LIFT (steel interior, floor display)
function bgLift(T){X.fillStyle='#b8c0c8';X.fillRect(0,0,W,GY);
  for(let i=0;i<6;i++){const g=X.createLinearGradient(i*180,0,i*180+180,0);g.addColorStop(0,'#cfd6dc');g.addColorStop(.5,'#eef2f5');g.addColorStop(1,'#aeb6be');X.fillStyle=g;X.fillRect(i*180+6,120,168,GY-140);ol(5);X.strokeRect(i*180+6,120,168,GY-140)}
  X.fillStyle='#fff8d6';X.fillRect(0,0,W,110);X.fillStyle='rgba(255,248,214,.25)';X.fillRect(0,110,W,240);ol(6);X.beginPath();X.moveTo(0,110);X.lineTo(W,110);X.stroke();
  const fl=1+Math.floor(T/3)%9;rr(400,330,280,120,16,'#0b0b12');X.font='800 86px "Baloo 2",Arial';X.textAlign='center';X.textBaseline='middle';X.fillStyle='#ff3b3b';X.fillText((Math.floor(T)%2?'▲ ':'  ')+fl,540,396);
  rr(930,520,110,420,14,'#8d99a4',6);for(let r=0;r<6;r++)for(let c=0;c<2;c++){X.fillStyle=(r*2+c+1)===fl?'#ffd23f':'#e5e5e5';X.beginPath();X.arc(965+c*42,570+r*62,16,0,7);X.fill();ol(3);X.stroke()}
  X.fillStyle='#c0c7ce';X.fillRect(0,1150,W,14);floor('#7a7f86','#555a60',true)}

// 4) GYM
function bgGym(T){X.fillStyle='#2b2d42';X.fillRect(0,0,W,GY);X.fillStyle='#3d405b';for(let x=0;x<W;x+=120)X.fillRect(x,0,60,GY);
  rr(140,260,800,560,10,'#9fb7c9',10);X.fillStyle='rgba(255,255,255,.35)';X.beginPath();X.moveTo(220,280);X.lineTo(360,280);X.lineTo(200,800);X.lineTo(160,800);X.closePath();X.fill();
  X.font='400 90px Bangers,Impact,Arial';X.textAlign='center';X.fillStyle='#ffd23f';X.fillText('NO PAIN NO GAIN',540,900);
  rr(40,1000,1000,26,8,'#555',5);for(let i=0;i<8;i++){const x=90+i*125,r=26+i*3;X.fillStyle='#111';X.beginPath();X.arc(x-r,1060,r*.9,0,7);X.arc(x+r,1060,r*.9,0,7);X.fill();X.fillStyle='#888';X.fillRect(x-r,1052,2*r,16)}
  X.fillStyle='#ff4d6d';X.fillRect(0,1150,W,10);floor('#1f1f1f','#0d0d0d',false);X.fillStyle='rgba(255,255,255,.06)';for(let x=0;x<W;x+=90)X.fillRect(x,GY,4,H-GY)}

// 5) TRAIN (coach interior, moving scenery)
function bgTrain(T){X.fillStyle='#4f7c8a';X.fillRect(0,0,W,GY);X.fillStyle='#3e6573';X.fillRect(0,0,W,130);
  for(let i=0;i<3;i++){const x=60+i*340;rr(x,300,280,300,30,null,0);X.save();X.beginPath();X.roundRect(x,300,280,300,30);X.clip();
    const g=X.createLinearGradient(0,300,0,600);g.addColorStop(0,'#aee3ff');g.addColorStop(1,'#d8f5d0');X.fillStyle=g;X.fillRect(x,300,280,300);
    for(let k=0;k<6;k++){const tx=x+((k*170-T*420)%1020+1020)%1020-200;X.fillStyle='#3a7d44';X.beginPath();X.arc(tx,520,50,0,7);X.fill();X.fillStyle='#6b4226';X.fillRect(tx-8,540,16,60)}
    X.fillStyle='#8bc34a';X.fillRect(x,560,280,40);X.restore();rr(x,300,280,300,30,null,12);X.fillStyle='#ddd';X.fillRect(x,440,280,10)}
  X.fillStyle='#2e4a54';X.fillRect(0,140,W,40);for(let x=40;x<W;x+=180){X.strokeStyle='#ccc';X.lineWidth=6;X.beginPath();X.arc(x,215,30,0,Math.PI);X.stroke()}
  rr(-20,780,W+40,70,14,'#1d3c78',6);rr(-20,850,W+40,230,0,'#2a52a0',6);X.fillStyle='#ffd23f';X.font='800 40px "Baloo 2",Arial';X.textAlign='center';X.fillText('42',540,830);
  floor('#6d6875','#3c3843',true)}

// 6) PARK
function bgPark(T){const g=X.createLinearGradient(0,0,0,GY);g.addColorStop(0,'#7ec8ff');g.addColorStop(1,'#e0f4ff');X.fillStyle=g;X.fillRect(0,0,W,GY);
  X.fillStyle='#ffd23f';X.beginPath();X.arc(900,190,80,0,7);X.fill();
  X.fillStyle='#86c06c';X.beginPath();X.moveTo(0,900);X.quadraticCurveTo(300,760,600,880);X.quadraticCurveTo(850,980,W,860);X.lineTo(W,GY);X.lineTo(0,GY);X.closePath();X.fill();
  for(const [tx,s] of [[110,1.1],[420,.8],[980,1.2]]){X.fillStyle='#6b4226';X.fillRect(tx-22*s,900,44*s,420*s);X.fillStyle='#2d6a4f';for(const [dx,dy,r] of [[0,-40,150],[-110,40,110],[110,40,110]]){X.beginPath();X.arc(tx+dx*s,880+dy*s,r*s,0,7);X.fill();ol(6);X.stroke()}}
  X.fillStyle='#8d5524';rr(600,1180,300,30,8,'#a0522d',5);rr(600,1120,300,26,8,'#a0522d',5);X.fillRect(620,1210,20,90);X.fillRect(860,1210,20,90);
  X.fillStyle='#333';X.fillRect(250,700,16,600);rr(220,660,76,60,12,'#fff6b3',5);
  floor('#5aa457','#3b7d3a',false);X.fillStyle='#d4a373';X.fillRect(0,GY+60,W,70)}

Object.assign(SETS,{baraat:bgBaraat,road:bgRoad,lift:bgLift,gym:bgGym,train:bgTrain,park:bgPark});
})();
