/* =====================================================================
   ILLUSTRAZIONI — libreria di scene SVG in stile "taccuino acquerellato"
   Tutto generato via codice: nessuna immagine esterna, nessuna richiesta
   di rete. Palette e tecnica riprendono quella delle mappe (inchiostro
   seppia + lavaggi d'acquerello + grana della carta).
   ===================================================================== */

let svgUid = 0;
const nextUid = () => ++svgUid;

const PAL = {
  jade:'#3c6e5e', seal:'#b5301c', gold:'#b8891f', indigo:'#35506e',
  ink:'#3a2a1c', inkSoft:'#6b5744', paper:'#f3e9d4', paperCard:'#faf3e2',
  rose:'#c2665a', plum:'#6a4a63', sky:'#7d97ab'
};

function defs(uid){
  return `<defs>
    <filter id="wc${uid}" x="-40%" y="-40%" width="180%" height="180%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="${uid}" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="18"/>
      <feGaussianBlur stdDeviation="1.1"/>
    </filter>
    <filter id="grain${uid}"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n2"/>
      <feColorMatrix in="n2" type="matrix" values="0 0 0 0 0.29  0 0 0 0 0.21  0 0 0 0 0.15  0 0 0 0.05 0"/>
    </filter>
  </defs>`;
}

function panel(w,h,uid){
  return `<rect width="${w}" height="${h}" fill="${PAL.paperCard}"/>
    <rect width="${w}" height="${h}" filter="url(#grain${uid})" opacity="0.45"/>
    <rect x="1" y="1" width="${w-2}" height="${h-2}" fill="none" stroke="${PAL.ink}" stroke-opacity="0.18" stroke-width="2"/>`;
}

function wash(cx,cy,rx,ry,color,uid,opacity=0.4,rot=0){
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${color}" opacity="${opacity}" filter="url(#wc${uid})" transform="rotate(${rot} ${cx} ${cy})"/>`;
}
function ink(d, color=PAL.ink, w=2.4, extra=''){
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
}
function inkFill(d, color=PAL.ink, opacity=1){
  return `<path d="${d}" fill="${color}" fill-opacity="${opacity}" stroke="none"/>`;
}
function sun(cx,cy,r,color,uid){
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="0.55" filter="url(#wc${uid})"/>`;
}
function cloudMotif(x,y,s=1,color=PAL.gold){
  return `<g transform="translate(${x},${y}) scale(${s})" opacity="0.75">
    ${ink(`M-18,4 C-22,-6 -8,-8 -4,-2 C0,-10 14,-8 12,0 C20,-1 20,8 12,7 L-16,7 C-24,7 -24,1 -18,4 Z`, color, 1.8)}
  </g>`;
}
function lantern(x,y,s=1,color=PAL.seal){
  return `<g transform="translate(${x},${y}) scale(${s})">
    <line x1="0" y1="-14" x2="0" y2="-9" stroke="${PAL.inkSoft}" stroke-width="1"/>
    <ellipse cx="0" cy="0" rx="7" ry="9" fill="${color}" opacity="0.85"/>
    ${ink('M-7,0 L7,0 M-5,-6 C-2,-3 2,-3 5,-6 M-5,6 C-2,3 2,3 5,6', PAL.ink, 1)}
    <line x1="0" y1="9" x2="0" y2="14" stroke="${PAL.gold}" stroke-width="1"/>
  </g>`;
}
function bamboo(x,y,s=1,color=PAL.jade){
  return `<g transform="translate(${x},${y}) scale(${s})" opacity="0.8">
    <line x1="0" y1="0" x2="0" y2="-34" stroke="${color}" stroke-width="2.2"/>
    <line x1="-1.5" y1="-9" x2="1.5" y2="-9" stroke="${color}" stroke-width="2"/>
    <line x1="-1.5" y1="-20" x2="1.5" y2="-20" stroke="${color}" stroke-width="2"/>
    ${ink('M0,-30 C8,-34 14,-30 16,-24', color, 1.6)}
    ${ink('M0,-22 C-8,-26 -13,-22 -15,-17', color, 1.6)}
  </g>`;
}
function waterLines(w,y,uid){
  let s='';
  for(let i=0;i<5;i++){ s+= ink(`M${10+i*3},${y+i*6} C ${w*0.3},${y+i*6-4} ${w*0.7},${y+i*6+4} ${w-10-i*3},${y+i*6}`, PAL.sky, 1, 'opacity="0.4"'); }
  return s;
}
function mistBand(x,y,w,h,uid,opacity=0.5){
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${PAL.paperCard}" opacity="${opacity}" filter="url(#wc${uid})"/>`;
}
function seedRand(i){ const x=Math.sin(i*12.9898+4.1)*43758.5453; return x-Math.floor(x); }

/* ---------- TEMPLATE 1: montagne (geografia, religione, Emei, Zhangjiajie, Tianmen, Buddha) ---------- */
function mountainScene({uid, accent='none', tone=PAL.jade, w=480, h=320, label}){
  let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
  s += defs(uid) + panel(w,h,uid);
  s += sun(w*0.78, h*0.24, 46, PAL.gold, uid);
  // three receding ranges
  const ranges = [
    {y:h*0.62, amp:38, color:tone, op:0.30},
    {y:h*0.72, amp:50, color:tone, op:0.5},
    {y:h*0.84, amp:60, color:PAL.ink, op:0.85},
  ];
  ranges.forEach((r,ri)=>{
    let d = `M0,${h}`;
    const n=7;
    for(let i=0;i<=n;i++){
      const x = i/n*w;
      const peak = r.y - r.amp*(0.5+0.5*Math.sin(i*1.7+ri*3));
      d += ` L${x},${peak}`;
    }
    d += ` L${w},${h} Z`;
    if(ri<2) s += `<path d="${d}" fill="${r.color}" opacity="${r.op}" filter="url(#wc${uid})"/>`;
    else s += inkFill(d, r.color, 0.92);
  });
  if(accent==='pillars'){
    for(let i=0;i<6;i++){
      const x = 60+i*68+seedRand(i)*20, ht=90+seedRand(i+9)*70, y0=h*0.86;
      s += inkFill(`M${x-6},${y0} L${x-9+seedRand(i+2)*6},${y0-ht} Q${x},${y0-ht-14} ${x+9-seedRand(i+3)*6},${y0-ht} L${x+6},${y0} Z`, PAL.ink, 0.9);
      s += `<rect x="${x-6}" y="${y0-ht*0.4}" width="12" height="${ht*0.4}" fill="${tone}" opacity="0.25"/>`;
    }
    s += mistBand(0,h*0.66,w,h*0.14,uid,0.55);
  }
  if(accent==='temple'){
    const tx=w*0.5, ty=h*0.58;
    s += inkFill(`M${tx-46},${ty+26} L${tx-30},${ty-6} L${tx-14},${ty+2} L${tx},${ty-26} L${tx+14},${ty+2} L${tx+30},${ty-6} L${tx+46},${ty+26} Z`, PAL.seal, 0.85);
    s += ink(`M${tx-6},${ty-26} L${tx-6},${ty+26} M${tx+6},${ty-26} L${tx+6},${ty+26}`, PAL.gold, 1.4);
  }
  if(accent==='buddha'){
    const bx=w*0.5, by=h*0.66;
    s += inkFill(`M${bx},${by-58} C${bx-24},${by-58} ${bx-30},${by-24} ${bx-22},${by-6} C${bx-30},${by-2} ${bx-30},${by+22} ${bx-14},${by+22} L${bx+14},${by+22} C${bx+30},${by+22} ${bx+30},${by-2} ${bx+22},${by-6} C${bx+30},${by-24} ${bx+24},${by-58} ${bx},${by-58} Z`, PAL.gold, 0.85);
    s += `<circle cx="${bx}" cy="${by-42}" r="6" fill="${PAL.paperCard}"/>`;
  }
  if(accent==='gate-arch'){
    const gx=w*0.5, gy=h*0.7;
    s += inkFill(`M${gx-70},${h} L${gx-70},${gy} Q${gx},${gy-70} ${gx+70},${gy} L${gx+70},${h} L${gx+46},${h} L${gx+46},${gy+6} Q${gx},${gy-44} ${gx-46},${gy+6} L${gx-46},${h} Z`, PAL.ink, 0.9);
  }
  if(accent==='waterfall'){
    const fx=w*0.5;
    for(let i=0;i<4;i++){ s+= ink(`M${fx-14+i*9},${h*0.34} L${fx-16+i*9+seedRand(i)*6},${h*0.86}`, PAL.sky, 3, 'opacity="0.55"'); }
    s += mistBand(fx-40,h*0.8,80,h*0.14,uid,0.6);
  }
  s += cloudMotif(w*0.16, h*0.18, 1.4, PAL.gold);
  s += mistBand(0,h*0.56,w,h*0.06,uid,0.35);
  if(label) s += `<text x="${w/2}" y="${h-14}" text-anchor="middle" font-family="Caveat,cursive" font-size="22" fill="${PAL.ink}" opacity="0.75">${label}</text>`;
  s += `</svg>`;
  return s;
}

/* ---------- TEMPLATE 2: skyline (Shanghai, storia moderna/contemporanea) ---------- */
function citySkylineScene({uid, landmark='tower', dusk=true, w=480, h=320, label}){
  let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
  s += defs(uid) + panel(w,h,uid);
  s += `<rect x="0" y="0" width="${w}" height="${h*0.6}" fill="${dusk?PAL.rose:PAL.sky}" opacity="0.28" filter="url(#wc${uid})"/>`;
  s += sun(w*0.24, h*0.28, 40, dusk?PAL.seal:PAL.gold, uid);
  const baseY = h*0.66;
  const n=9;
  let bx=20;
  for(let i=0;i<n;i++){
    const bw = 20+seedRand(i)*22;
    const bh = 40+seedRand(i+5)*(h*0.34);
    s += inkFill(`M${bx},${baseY} L${bx},${baseY-bh} L${bx+bw},${baseY-bh} L${bx+bw},${baseY} Z`, PAL.ink, 0.75+seedRand(i+2)*0.15);
    if(seedRand(i+3)>0.5) s += `<line x1="${bx+4}" y1="${baseY-bh+8}" x2="${bx+bw-4}" y2="${baseY-bh+8}" stroke="${PAL.gold}" stroke-width="1" opacity="0.4"/>`;
    bx += bw+10;
    if(bx>w-30) break;
  }
  if(landmark==='orientalpearl'){
    const tx=w*0.62;
    s += ink(`M${tx},${baseY} L${tx},${baseY-150}`, PAL.ink, 3);
    s += `<circle cx="${tx}" cy="${baseY-110}" r="14" fill="${PAL.seal}" opacity="0.85"/>`;
    s += `<circle cx="${tx}" cy="${baseY-155}" r="8" fill="${PAL.seal}" opacity="0.85"/>`;
  }
  if(landmark==='bund'){
    s += ink(`M${w*0.5-30},${baseY-70} L${w*0.5-30},${baseY-10} L${w*0.5+6},${baseY-30} L${w*0.5+30},${baseY-10} L${w*0.5+30},${baseY-90}`, PAL.gold, 2.4);
  }
  if(landmark==='gate'){
    const gx=w*0.5;
    s += inkFill(`M${gx-40},${baseY} L${gx-40},${baseY-40} L${gx},${baseY-64} L${gx+40},${baseY-40} L${gx+40},${baseY} Z`, PAL.seal, 0.85);
  }
  s += waterLines(w, baseY+10, uid);
  s += mistBand(0,baseY-4,w,18,uid,0.4);
  if(label) s += `<text x="${w/2}" y="${h-14}" text-anchor="middle" font-family="Caveat,cursive" font-size="22" fill="${PAL.paperCard}" opacity="0.9">${label}</text>`;
  s += `</svg>`;
  return s;
}

/* ---------- TEMPLATE 3: cortile imperiale (Città Proibita, Tempio Cielo, hutong) ---------- */
function courtyardScene({uid, roof='pagoda', tone=PAL.seal, w=480, h=320, label}){
  let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
  s += defs(uid) + panel(w,h,uid);
  s += wash(w*0.5,h*0.3,180,90,PAL.gold,uid,0.18);
  const baseY=h*0.72, cx=w/2;
  if(roof==='round'){
    s += inkFill(`M${cx-90},${baseY} L${cx-90},${baseY-18} L${cx+90},${baseY-18} L${cx+90},${baseY} Z`, tone, 0.85);
    s += inkFill(`M${cx-100},${baseY-18} Q${cx},${baseY-70} ${cx+100},${baseY-18} Z`, PAL.indigo, 0.85);
    s += inkFill(`M${cx-70},${baseY-40} Q${cx},${baseY-90} ${cx+70},${baseY-40} Z`, PAL.indigo, 0.9);
    s += inkFill(`M${cx-40},${baseY-70} Q${cx},${baseY-108} ${cx+40},${baseY-70} Z`, PAL.gold, 0.9);
    s += `<line x1="${cx}" y1="${baseY-108}" x2="${cx}" y2="${baseY-124}" stroke="${PAL.ink}" stroke-width="2"/>`;
  } else if(roof==='hutong'){
    for(let i=0;i<4;i++){
      const x=40+i*105;
      s += inkFill(`M${x},${baseY} L${x},${baseY-38} L${x+80},${baseY-38} L${x+80},${baseY} Z`, PAL.ink, 0.2+i*0.05);
      s += inkFill(`M${x-8},${baseY-38} L${x+40},${baseY-58} L${x+88},${baseY-38} Z`, tone, 0.8);
    }
    s += lantern(cx-60,baseY-70,1.1,PAL.seal) + lantern(cx+50,baseY-64,0.9,PAL.seal);
  } else {
    s += inkFill(`M${cx-110},${baseY} L${cx-100},${baseY-30} L${cx+100},${baseY-30} L${cx+110},${baseY} Z`, tone, 0.85);
    s += inkFill(`M${cx-124},${baseY-30} L${cx-70},${baseY-64} L${cx+70},${baseY-64} L${cx+124},${baseY-30} Z`, PAL.ink, 0.88);
    for(let i=0;i<3;i++){ s += `<line x1="${cx-60+i*60}" y1="${baseY-30}" x2="${cx-60+i*60}" y2="${baseY}" stroke="${PAL.gold}" stroke-width="3" opacity="0.6"/>`; }
  }
  // wall/base foreground
  s += inkFill(`M0,${baseY} L${w},${baseY} L${w},${baseY+8} L0,${baseY+8} Z`, PAL.ink, 0.5);
  s += cloudMotif(w*0.82, h*0.16, 1.1, PAL.gold);
  if(label) s += `<text x="${w/2}" y="${h-14}" text-anchor="middle" font-family="Caveat,cursive" font-size="22" fill="${PAL.ink}" opacity="0.75">${label}</text>`;
  s += `</svg>`;
  return s;
}

/* ---------- TEMPLATE 4: villaggio d'acqua (Furong, Fenghuang, Zhujiajiao, Yu Garden) ---------- */
function waterVillageScene({uid, variant='riverhouses', tone=PAL.jade, w=480, h=320, label}){
  let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
  s += defs(uid) + panel(w,h,uid);
  s += wash(w*0.3,h*0.26,140,70,tone,uid,0.2);
  const baseY = h*0.7;
  if(variant==='waterfall'){
    for(let i=0;i<5;i++){ s+= ink(`M${w*0.42+i*7},${h*0.18} L${w*0.4+i*7+seedRand(i)*8},${baseY}`, PAL.sky, 2.6, 'opacity="0.55"'); }
    s += mistBand(w*0.32,baseY-10,w*0.3,26,uid,0.6);
  }
  // stilt houses along the water
  for(let i=0;i<5;i++){
    const x = 26+i*90+seedRand(i+1)*10;
    s += inkFill(`M${x},${baseY} L${x},${baseY-30} L${x+56},${baseY-30} L${x+56},${baseY} Z`, PAL.ink, 0.3+seedRand(i)*0.3);
    s += inkFill(`M${x-8},${baseY-30} L${x+28},${baseY-48} L${x+64},${baseY-30} Z`, PAL.seal, 0.7);
    s += ink(`M${x+4},${baseY} L${x+4},${baseY+16} M${x+50},${baseY} L${x+50},${baseY+16}`, PAL.inkSoft, 2, 'opacity="0.5"');
  }
  if(variant==='garden-bridge'){
    s += ink(`M${w*0.2},${baseY+14} C ${w*0.4},${baseY-30} ${w*0.6},${baseY-30} ${w*0.8},${baseY+14}`, PAL.gold, 3);
  }
  s += waterLines(w, baseY+20, uid);
  s += `<rect x="0" y="${baseY+14}" width="${w}" height="${h-baseY-14}" fill="${PAL.sky}" opacity="0.22" filter="url(#wc${uid})"/>`;
  s += bamboo(w*0.9, baseY+8, 1.3, tone);
  if(label) s += `<text x="${w/2}" y="${h-14}" text-anchor="middle" font-family="Caveat,cursive" font-size="22" fill="${PAL.ink}" opacity="0.75">${label}</text>`;
  s += `</svg>`;
  return s;
}

/* ---------- TEMPLATE 5: ritratto centrale (panda, terracotta, cibo, calligrafia, tè, aereo) ---------- */
const PORTRAIT_ICONS = {
  panda: (c)=>`<ellipse cx="0" cy="8" rx="34" ry="28" fill="${PAL.paperCard}" stroke="${c}" stroke-width="2.4"/>
    <circle cx="-24" cy="-16" r="10" fill="${c}"/><circle cx="24" cy="-16" r="10" fill="${c}"/>
    <ellipse cx="-13" cy="4" rx="8" ry="10" fill="${c}"/><ellipse cx="13" cy="4" rx="8" ry="10" fill="${c}"/>
    <circle cx="-13" cy="4" r="3" fill="${PAL.ink}"/><circle cx="13" cy="4" r="3" fill="${PAL.ink}"/>
    <ellipse cx="0" cy="16" rx="5" ry="3.4" fill="${PAL.ink}"/>`,
  terracotta: (c)=>`<path d="M-16,32 L-16,-6 Q-16,-30 0,-30 Q16,-30 16,-6 L16,32 Z" fill="${PAL.paperCard}" stroke="${c}" stroke-width="2.4"/>
    <rect x="-16" y="-4" width="32" height="8" fill="${c}" opacity="0.5"/>
    <circle cx="0" cy="-18" r="10" fill="none" stroke="${c}" stroke-width="2"/>
    <line x1="-16" y1="14" x2="16" y2="14" stroke="${c}" stroke-width="1.6" opacity="0.6"/>`,
  hotpot: (c)=>`<ellipse cx="0" cy="18" rx="30" ry="10" fill="${c}" opacity="0.85"/>
    <path d="M-26,18 Q-26,-6 0,-6 Q26,-6 26,18" fill="none" stroke="${PAL.ink}" stroke-width="2.4"/>
    <line x1="-30" y1="0" x2="-40" y2="-6" stroke="${PAL.ink}" stroke-width="2.4"/><line x1="30" y1="0" x2="40" y2="-6" stroke="${PAL.ink}" stroke-width="2.4"/>
    <path d="M-10,-8 C-14,-20 -4,-22 -6,-30" stroke="${PAL.inkSoft}" stroke-width="1.6" fill="none" opacity="0.6"/>
    <path d="M8,-8 C4,-22 14,-22 10,-32" stroke="${PAL.inkSoft}" stroke-width="1.6" fill="none" opacity="0.6"/>`,
  calligraphy: (c)=>`<rect x="-30" y="-30" width="60" height="60" fill="${PAL.paperCard}" stroke="${c}" stroke-width="2"/>
    <path d="M-14,-16 C6,-20 10,-2 -6,2 C-16,4 4,10 12,20" fill="none" stroke="${PAL.ink}" stroke-width="4" stroke-linecap="round"/>
    <path d="M18,-22 L18,22" stroke="${c}" stroke-width="2" opacity="0.5"/>`,
  teapot: (c)=>`<path d="M-24,10 Q-24,-10 0,-10 Q24,-10 24,10 Q24,20 0,20 Q-24,20 -24,10 Z" fill="${PAL.paperCard}" stroke="${c}" stroke-width="2.4"/>
    <path d="M-24,4 Q-38,0 -34,-10" fill="none" stroke="${c}" stroke-width="2.4"/>
    <path d="M24,2 Q34,-4 30,-16" fill="none" stroke="${PAL.ink}" stroke-width="2.4"/>
    <ellipse cx="0" cy="-10" rx="8" ry="4" fill="${c}" opacity="0.7"/>`,
  plane: (c)=>`<path d="M-34,0 L34,0 M-8,0 L-24,-16 M-8,0 L-24,16 M16,0 L4,-12 M16,0 L4,12" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  buddhahead:(c)=>`<circle cx="0" cy="0" r="30" fill="${PAL.paperCard}" stroke="${c}" stroke-width="2.4"/>
    <path d="M-14,4 Q0,16 14,4" fill="none" stroke="${PAL.ink}" stroke-width="2.4"/>
    <circle cx="-9" cy="-6" r="2" fill="${PAL.ink}"/><circle cx="9" cy="-6" r="2" fill="${PAL.ink}"/>
    <circle cx="0" cy="-16" r="3" fill="${c}"/>`,
};
function portraitScene({uid, icon='panda', tone=PAL.jade, w=480, h=320, label}){
  let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
  s += defs(uid) + panel(w,h,uid);
  s += wash(w/2, h*0.44, 140, 120, tone, uid, 0.3);
  s += `<g transform="translate(${w/2},${h*0.44}) scale(2.1)">${(PORTRAIT_ICONS[icon]||PORTRAIT_ICONS.panda)(tone)}</g>`;
  s += cloudMotif(w*0.14, h*0.16, 1, PAL.gold);
  s += cloudMotif(w*0.86, h*0.82, 0.9, tone);
  if(label) s += `<text x="${w/2}" y="${h-14}" text-anchor="middle" font-family="Caveat,cursive" font-size="22" fill="${PAL.ink}" opacity="0.75">${label}</text>`;
  s += `</svg>`;
  return s;
}

/* ---------- TEMPLATE 6: festivo (lanterne, arte, simboli) ---------- */
function festiveScene({uid, tone=PAL.seal, w=480, h=320, label}){
  let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
  s += defs(uid) + panel(w,h,uid);
  s += wash(w*0.5,h*0.5,200,120,PAL.gold,uid,0.16);
  for(let i=0;i<6;i++){
    const x = 40+i*72, y = 60+ (i%2)*30 + seedRand(i)*10;
    s += lantern(x,y, 1.1+seedRand(i+3)*0.4, i%2===0?tone:PAL.gold);
  }
  s += cloudMotif(w*0.5, h*0.86, 1.6, PAL.jade);
  if(label) s += `<text x="${w/2}" y="${h-14}" text-anchor="middle" font-family="Caveat,cursive" font-size="22" fill="${PAL.ink}" opacity="0.75">${label}</text>`;
  s += `</svg>`;
  return s;
}

/* ---------- HERO (home) ---------- */
function heroScene(){
  const uid = nextUid();
  const w=960, h=420;
  let s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
  s += defs(uid) + panel(w,h,uid);
  s += `<rect width="${w}" height="${h*0.7}" fill="${PAL.rose}" opacity="0.22" filter="url(#wc${uid})"/>`;
  s += sun(w*0.5, h*0.3, 70, PAL.gold, uid);
  // wall snaking across mountains
  const baseY = h*0.66;
  let d=`M0,${h}`;
  for(let i=0;i<=10;i++){ d += ` L${i/10*w},${baseY-30*Math.sin(i*1.3)-40}`; }
  d += ` L${w},${h} Z`;
  s += `<path d="${d}" fill="${PAL.ink}" opacity="0.85"/>`;
  let wallD = `M20,${baseY-10}`;
  for(let i=1;i<=14;i++){ wallD += ` L${i*w/14},${baseY-40-30*Math.sin(i*1.3)}`; }
  s += ink(wallD, PAL.gold, 3, 'opacity="0.85"');
  for(let i=0;i<14;i+=2){ const x=i*w/14+w/28; s += `<rect x="${x-6}" y="${baseY-70-30*Math.sin(i*1.3)}" width="12" height="14" fill="${PAL.gold}" opacity="0.8"/>`; }
  s += mistBand(0,baseY-16,w,26,uid,0.4);
  s += waterLines(w, h*0.9, uid);
  s += cloudMotif(w*0.1,h*0.14,2,PAL.gold);
  s += cloudMotif(w*0.9,h*0.2,1.6,PAL.jade);
  s += `<text x="${w/2}" y="${h*0.5}" text-anchor="middle" font-family="Ma Shan Zheng,serif" font-size="120" fill="${PAL.paperCard}" opacity="0.92">中国</text>`;
  s += `</svg>`;
  return s;
}

/* ---------- REGISTRY ---------- */
const cfgFor = {
  // corso
  'lesson-1':()=>mountainScene({uid:nextUid(), accent:'none', tone:PAL.jade, label:'长江 · 黄河'}),
  'lesson-2':()=>portraitScene({uid:nextUid(), icon:'terracotta', tone:PAL.gold, label:'兵马俑'}),
  'lesson-3':()=>courtyardScene({uid:nextUid(), roof:'pagoda', tone:PAL.seal, label:'紫禁城'}),
  'lesson-4':()=>citySkylineScene({uid:nextUid(), landmark:'gate', dusk:false, label:'1912—1978'}),
  'lesson-5':()=>citySkylineScene({uid:nextUid(), landmark:'orientalpearl', dusk:true, label:'上海'}),
  'lesson-6':()=>mountainScene({uid:nextUid(), accent:'temple', tone:PAL.indigo, label:'道 · 佛'}),
  'lesson-7':()=>festiveScene({uid:nextUid(), tone:PAL.seal, label:'福'}),
  'lesson-8':()=>portraitScene({uid:nextUid(), icon:'hotpot', tone:PAL.seal, label:'火锅'}),
  'lesson-9':()=>portraitScene({uid:nextUid(), icon:'calligraphy', tone:PAL.ink, label:'书法'}),
  'lesson-10':()=>portraitScene({uid:nextUid(), icon:'teapot', tone:PAL.jade, label:'茶'}),
  // guida — 13 giorni
  'day-1':()=>courtyardScene({uid:nextUid(), roof:'hutong', tone:PAL.seal, label:'胡同'}),
  'day-2':()=>courtyardScene({uid:nextUid(), roof:'round', tone:PAL.indigo, label:'天坛'}),
  'day-3':()=>courtyardScene({uid:nextUid(), roof:'pagoda', tone:PAL.seal, label:'故宫 · 长城'}),
  'day-4':()=>mountainScene({uid:nextUid(), accent:'buddha', tone:PAL.jade, label:'乐山大佛'}),
  'day-5':()=>mountainScene({uid:nextUid(), accent:'temple', tone:PAL.jade, label:'峨眉山'}),
  'day-6':()=>portraitScene({uid:nextUid(), icon:'panda', tone:PAL.jade, label:'熊猫'}),
  'day-7':()=>mountainScene({uid:nextUid(), accent:'gate-arch', tone:PAL.indigo, label:'天门山'}),
  'day-8':()=>mountainScene({uid:nextUid(), accent:'pillars', tone:PAL.jade, label:'张家界'}),
  'day-9':()=>waterVillageScene({uid:nextUid(), variant:'waterfall', tone:PAL.jade, label:'芙蓉镇'}),
  'day-10':()=>waterVillageScene({uid:nextUid(), variant:'riverhouses', tone:PAL.rose, label:'凤凰古城'}),
  'day-11':()=>citySkylineScene({uid:nextUid(), landmark:'bund', dusk:true, label:'外滩'}),
  'day-12':()=>waterVillageScene({uid:nextUid(), variant:'garden-bridge', tone:PAL.jade, label:'豫园 · 朱家角'}),
  'day-13':()=>portraitScene({uid:nextUid(), icon:'plane', tone:PAL.indigo, label:'再见, 中国'}),
  // home extra gallery
  'gallery-wall':()=>mountainScene({uid:nextUid(), accent:'pillars', tone:PAL.gold, label:'长城'}),
  'gallery-panda':()=>portraitScene({uid:nextUid(), icon:'panda', tone:PAL.jade, label:'成都'}),
  'gallery-lanterns':()=>festiveScene({uid:nextUid(), tone:PAL.seal, label:'灯笼'}),
};

const ILLUSTRATIONS = {};
function getIllustration(key){
  if(ILLUSTRATIONS[key]) return ILLUSTRATIONS[key];
  const fn = cfgFor[key];
  const svg = fn ? fn() : portraitScene({uid:nextUid(), icon:'buddhahead', tone:PAL.ink, label:key});
  ILLUSTRATIONS[key]=svg;
  return svg;
}
function heroIllustration(){ return heroScene(); }

export { getIllustration, heroIllustration, cloudMotif, lantern, bamboo, nextUid, defs as svgDefs, panel as svgPanel, PAL };
