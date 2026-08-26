/* =====================================================================
   MAPPE — due modalità per ogni giorno:
   1) "Schizzo" — illustrazione stile taccuino, generata da lat/lng, offline
   2) "Mappa reale" — Leaflet + OpenStreetMap, zoomabile, con marker e link
   ===================================================================== */

function haversine(a,b){
  const R=6371, toRad=x=>x*Math.PI/180;
  const dLat=toRad(b.lat-a.lat), dLng=toRad(b.lng-a.lng);
  const s = Math.sin(dLat/2)**2 + Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dLng/2)**2;
  return Math.round(R*2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s)));
}
function mapsUrl(place_id){ return `https://www.google.com/maps/place/?q=place_id:${place_id}`; }
function escapeXml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function seeded(i){ const x = Math.sin(i*12.9898)*43758.5453; return x-Math.floor(x); }

function sketchyPath(coords){
  if(coords.length<2) return '';
  let d = `M ${coords[0].x} ${coords[0].y}`;
  for(let i=1;i<coords.length;i++){
    const a=coords[i-1], b=coords[i];
    const mx=(a.x+b.x)/2, my=(a.y+b.y)/2;
    const wob = (seeded(i*7+3)-0.5)*14;
    const nx = -(b.y-a.y), ny = (b.x-a.x);
    const len = Math.hypot(nx,ny)||1;
    const cx = mx + (nx/len)*wob, cy = my + (ny/len)*wob;
    d += ` Q ${cx} ${cy} ${b.x} ${b.y}`;
  }
  return d;
}

const ICONS = {
  temple: `<path d="M-7,5 L7,5 M-6,5 L-6,1 L6,1 L6,5 M-8,1 L0,-6 L8,1 M0,-6 L0,-9" fill="none"/>`,
  wall: `<path d="M-8,4 L8,4 M-8,4 L-8,0 L-5,0 L-5,-3 L-2,-3 L-2,0 L1,0 L1,-3 L4,-3 L4,0 L8,0 L8,4" fill="none"/>`,
  buddha: `<path d="M0,6 C-6,6 -6,0 -4,-1 C-5,-5 -1,-7 0,-4 C1,-7 5,-5 4,-1 C6,0 6,6 0,6 Z M-2,-2 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0" fill="none"/>`,
  mountain: `<path d="M-8,5 L-3,-4 L0,-1 L3,-6 L8,5 Z" fill="none"/>`,
  panda: `<path d="M0,6 a6,5 0 1,1 0.1,0 Z M-5,-5 a2,2 0 1,1 3,1 M5,-5 a2,2 0 1,0 -3,1 M-2.5,-1 a1.6,1.6 0 1,0 0.1,0 M2.5,-1 a1.6,1.6 0 1,0 -0.1,0" fill="none"/>`,
  waterfall: `<path d="M-6,-7 L6,-7 M-4,-7 L-5,6 M-1,-7 L-1.5,6 M2,-7 L1.5,6 M5,-7 L4.5,6" fill="none"/>`,
  bridge: `<path d="M-8,3 C-8,-4 8,-4 8,3 M-8,3 L8,3 M-5,3 L-5,6 M-1.6,3 L-1.6,6 M1.6,3 L1.6,6 M5,3 L5,6" fill="none"/>`,
  lantern: `<path d="M0,-7 L0,-5 M-4,-5 L4,-5 C5,-5 5,3 4,3 L-4,3 C-5,3 -5,-5 -4,-5 Z M-2,-1 L2,-1 M0,3 L0,6" fill="none"/>`,
  tower: `<path d="M-6,7 L6,7 M-4,7 L-4,-1 L4,-1 L4,7 M-2,-1 L-2,-6 L2,-6 L2,-1 M-1,-6 L-1,-9 L1,-9 L1,-6" fill="none"/>`,
  water: `<path d="M-8,-2 C-6,-4 -2,-4 0,-2 C2,0 6,0 8,-2 M-8,3 C-6,1 -2,1 0,3 C2,5 6,5 8,3" fill="none"/>`,
  garden: `<path d="M0,6 L0,-2 M0,-2 C-4,-2 -4,-6 0,-6 C4,-6 4,-2 0,-2 M-3,2 C-6,2 -6,5 -3,5 M3,2 C6,2 6,5 3,5" fill="none"/>`,
  boat: `<path d="M-7,2 L7,2 L5,6 L-5,6 Z M0,2 L0,-6 M0,-6 L4,-3 L0,-1" fill="none"/>`,
  plane: `<path d="M-8,0 L8,0 M-2,0 L-6,-4 M-2,0 L-6,4 M4,0 L1,-3 M4,0 L1,3" fill="none"/>`,
  pin: `<path d="M0,7 C-5,0 -5,-5 0,-7 C5,-5 5,0 0,7 Z M0,-3 a1.6,1.6 0 1,0 0.1,0" fill="none"/>`,
};
function iconFor(name){
  const n = name.toLowerCase();
  if(/muraglia|wall/.test(n)) return 'wall';
  if(/tempio|temple/.test(n)) return 'temple';
  if(/buddha/.test(n)) return 'buddha';
  if(/monte|mountain|emei|tianmen|tianzi|yuanjiajie|wulingyuan/.test(n)) return 'mountain';
  if(/panda/.test(n)) return 'panda';
  if(/furong|cascata|waterfall/.test(n)) return 'waterfall';
  if(/ponte|bridge|fenghuang/.test(n)) return 'bridge';
  if(/hutong|nanluoguxiang|lantern/.test(n)) return 'lantern';
  if(/tower|bund|shanghai tower|skyline/.test(n)) return 'tower';
  if(/lago|shichahai|fiume|tuojiang/.test(n)) return 'water';
  if(/garden|giardino|yu garden|park/.test(n)) return 'garden';
  if(/zhujiajiao|villaggio d.acqua|boat/.test(n)) return 'boat';
  if(/aeroporto|airport/.test(n)) return 'plane';
  return 'pin';
}

function paperDefs(uid){
  return `<defs>
    <filter id="grain${uid}"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.29  0 0 0 0 0.21  0 0 0 0 0.15  0 0 0 0.05 0"/>
    </filter>
    <radialGradient id="vig${uid}" cx="50%" cy="45%" r="75%">
      <stop offset="60%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#3a2a18" stop-opacity="0.18"/>
    </radialGradient>
  </defs>`;
}
function paperFrame(w,h,uid){
  return `<rect width="${w}" height="${h}" fill="var(--paper-deep)"/>
    <rect width="${w}" height="${h}" filter="url(#grain${uid})" opacity="0.5"/>
    <rect width="${w}" height="${h}" fill="url(#vig${uid})"/>
    <rect x="10" y="10" width="${w-20}" height="${h-20}" fill="none" stroke="var(--ink-soft)" stroke-width="1.4" opacity="0.55"/>
    <rect x="13.5" y="13.5" width="${w-27}" height="${h-27}" fill="none" stroke="var(--ink-soft)" stroke-width="0.7" opacity="0.35"/>`;
}
function compassRose(x,y,uid){
  return `<g transform="translate(${x},${y})" stroke="var(--ink-soft)" stroke-width="1" fill="none" opacity="0.7">
    <circle r="13"/>
    <path d="M0,-13 L0,13 M-13,0 L13,0"/>
    <path d="M0,-13 L-3,-6 L0,-9 L3,-6 Z" fill="var(--ink-soft)" stroke="none"/>
    <text x="0" y="-16" text-anchor="middle" font-size="9" font-family="Georgia,serif" fill="var(--ink-soft)">N</text>
  </g>`;
}

let mapUid = 0;

function renderMiniMap(dayPoints, w=720, h=320){
  mapUid++; const uid=mapUid;
  const pad=56;
  const lats=dayPoints.map(p=>p.lat), lngs=dayPoints.map(p=>p.lng);
  let minLat=Math.min(...lats), maxLat=Math.max(...lats), minLng=Math.min(...lngs), maxLng=Math.max(...lngs);
  const minSpanLat=0.045, minSpanLng=0.06;
  if(maxLat-minLat<minSpanLat){ const c=(maxLat+minLat)/2; minLat=c-minSpanLat/2; maxLat=c+minSpanLat/2; }
  if(maxLng-minLng<minSpanLng){ const c=(maxLng+minLng)/2; minLng=c-minSpanLng/2; maxLng=c+minSpanLng/2; }
  const project = (lat,lng) => ({
    x: pad + (lng-minLng)/(maxLng-minLng)*(w-2*pad),
    y: pad + (maxLat-lat)/(maxLat-minLat)*(h-2*pad)
  });
  const coords = dayPoints.map(p=>project(p.lat,p.lng));

  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
  svg += paperDefs(uid) + paperFrame(w,h,uid);
  svg += compassRose(w-42, 44, uid);

  if(coords.length>1){
    svg += `<path d="${sketchyPath(coords)}" fill="none" stroke="var(--seal)" stroke-width="2" stroke-linecap="round" stroke-dasharray="1,9"/>`;
    for(let i=0;i<dayPoints.length-1;i++){
      const dist = haversine(dayPoints[i], dayPoints[i+1]);
      const mx=(coords[i].x+coords[i+1].x)/2, my=(coords[i].y+coords[i+1].y)/2;
      svg += `<text x="${mx}" y="${my-10}" font-size="16" fill="var(--ink-soft)" text-anchor="middle" font-family="Caveat,cursive">≈ ${dist} km</text>`;
    }
  }

  dayPoints.forEach((p,i)=>{
    const {x,y} = coords[i];
    const above = i%2===0;
    const ly = above ? y-24 : y+34;
    svg += `<g transform="translate(${x},${y})" stroke="var(--ink)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${ICONS[iconFor(p.name)]}</g>`;
    svg += `<circle cx="${x}" cy="${y}" r="2.2" fill="var(--seal)"/>`;
    svg += `<text x="${x}" y="${ly}" font-size="19" fill="var(--ink)" text-anchor="middle" font-family="Caveat,cursive" font-weight="600">${escapeXml(p.name)}</text>`;
  });
  svg += `</svg>`;
  return svg;
}

function renderOverviewMap(allPoints, w=780, h=560){
  mapUid++; const uid=mapUid;
  const pad=50;
  const lats=allPoints.map(p=>p.lat), lngs=allPoints.map(p=>p.lng);
  const padDeg=0.7;
  const minLat=Math.min(...lats)-padDeg, maxLat=Math.max(...lats)+padDeg;
  const minLng=Math.min(...lngs)-padDeg, maxLng=Math.max(...lngs)+padDeg;
  const project = (lat,lng) => ({
    x: pad + (lng-minLng)/(maxLng-minLng)*(w-2*pad),
    y: pad + (maxLat-lat)/(maxLat-minLat)*(h-2*pad)
  });
  const coords = allPoints.map(p=>project(p.lat,p.lng));

  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
  svg += paperDefs(uid) + paperFrame(w,h,uid);
  svg += compassRose(w-46, 46, uid);
  svg += `<path d="${sketchyPath(coords)}" fill="none" stroke="var(--seal)" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="1,8" opacity="0.9"/>`;

  const legend = [];
  allPoints.forEach((p,i)=>{
    const {x,y} = coords[i];
    const isFirstOfDay = i===0 || allPoints[i-1].day !== p.day;
    if(isFirstOfDay){
      svg += `<circle cx="${x}" cy="${y}" r="10" fill="var(--paper-deep)" stroke="var(--ink)" stroke-width="1.3"/>`;
      svg += `<text x="${x}" y="${y+4.5}" font-size="11" fill="var(--ink)" text-anchor="middle" font-family="Georgia,serif" font-weight="700">${p.day}</text>`;
      legend.push(p);
    } else {
      svg += `<circle cx="${x}" cy="${y}" r="2" fill="var(--ink-soft)"/>`;
    }
  });
  svg += `</svg>`;
  return {svg, legend};
}

/* ---------- Leaflet: mappa reale (libreria caricata staticamente in index.html) ---------- */
function divIcon(color){
  return window.L.divIcon({
    className:'',
    html:`<div style="width:16px;height:16px;border-radius:50% 50% 50% 0;background:${color};border:2px solid #faf3e2;box-shadow:0 1px 4px rgba(0,0,0,.4);transform:rotate(-45deg);"></div>`,
    iconSize:[16,16], iconAnchor:[8,16], popupAnchor:[0,-16]
  });
}
function renderLeafletMap(container, points){
  if(!window.L){
    container.innerHTML = '<p style="padding:24px;color:var(--ink-faint);font-size:13px;">Mappa reale non disponibile senza connessione. Usa lo schizzo qui sopra.</p>';
    return;
  }
  container.innerHTML='';
  const map = window.L.map(container, {scrollWheelZoom:false});
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom:18, attribution:'&copy; OpenStreetMap contributors'
  }).addTo(map);
  const latlngs = points.map(p=>[p.lat,p.lng]);
  if(points.length>1){
    window.L.polyline(latlngs, {color:'#b5301c', weight:2.5, dashArray:'2,10', opacity:.8}).addTo(map);
  }
  points.forEach(p=>{
    window.L.marker([p.lat,p.lng], {icon:divIcon(p.day?'#35506e':'#b5301c')})
      .addTo(map)
      .bindPopup(`<b>${escapeXml(p.name)}</b>${p.notes?'<br>'+escapeXml(p.notes):''}<br><a href="${mapsUrl(p.place_id)}" target="_blank" rel="noopener">Apri in Google Maps ↗</a>`);
  });
  const bounds = window.L.latLngBounds(latlngs);
  map.fitBounds(bounds, {padding:[36,36]});
  setTimeout(()=>map.invalidateSize(), 60);
  return map;
}

/* ---------- Blocco mappa completo (tabs Schizzo / Mappa reale) ---------- */
function buildMapBlock(points, label, isOverview, allPointsForOverview){
  const wrap = document.createElement('div');

  const tabs = document.createElement('div');
  tabs.className='maptabs';
  const tabSketch = document.createElement('button'); tabSketch.textContent='✎ Schizzo'; tabSketch.className='active';
  const tabReal = document.createElement('button'); tabReal.textContent='🗺 Mappa reale';
  tabs.appendChild(tabSketch); tabs.appendChild(tabReal);
  wrap.appendChild(tabs);

  const block = document.createElement('div');
  block.className='mapblock';
  const head = document.createElement('div');
  head.className='maphead';
  head.innerHTML = `<h3>${label}</h3><span id="maptag-${mapUid+1}">Taccuino · offline</span>`;
  block.appendChild(head);

  const paperwrap = document.createElement('div');
  paperwrap.className='paperwrap';
  let legend=null;
  if(isOverview){
    const r = renderOverviewMap(allPointsForOverview);
    paperwrap.innerHTML = r.svg; legend = r.legend;
  } else {
    paperwrap.innerHTML = renderMiniMap(points);
  }
  block.appendChild(paperwrap);

  const leafletHost = document.createElement('div');
  leafletHost.className='paperwrap';
  leafletHost.style.display='none';
  const leafletInner = document.createElement('div');
  leafletInner.className='leafletwrap';
  leafletHost.appendChild(leafletInner);
  block.appendChild(leafletHost);

  let leafletBuilt = false;
  tabSketch.onclick = ()=>{
    tabSketch.classList.add('active'); tabReal.classList.remove('active');
    paperwrap.style.display=''; leafletHost.style.display='none';
    head.querySelector('span').textContent = 'Taccuino · offline';
  };
  tabReal.onclick = ()=>{
    tabReal.classList.add('active'); tabSketch.classList.remove('active');
    paperwrap.style.display='none'; leafletHost.style.display='';
    head.querySelector('span').textContent = 'OpenStreetMap · live';
    if(!leafletBuilt){
      leafletBuilt = true;
      const pts = isOverview ? allPointsForOverview : points;
      renderLeafletMap(leafletInner, pts);
    }
  };

  if(isOverview && legend){
    const lg = document.createElement('div');
    lg.className='maplinks';
    legend.forEach(p=>{
      const a = document.createElement('a');
      a.href = mapsUrl(p.place_id); a.target='_blank'; a.rel='noopener';
      a.innerHTML = `<span class="mono" style="color:var(--seal)">${p.day}</span> ${p.name}`;
      lg.appendChild(a);
    });
    block.appendChild(lg);
  } else if(points){
    const links = document.createElement('div');
    links.className='maplinks';
    points.forEach(p=>{
      const a = document.createElement('a');
      a.href = mapsUrl(p.place_id); a.target='_blank'; a.rel='noopener';
      a.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>${p.name}`;
      links.appendChild(a);
    });
    block.appendChild(links);
  }

  const note = document.createElement('div');
  note.className='mapnote';
  note.textContent = isOverview
    ? 'Schizzo del percorso completo, non in scala geografica precisa — passa a "Mappa reale" per una vista geografica accurata e zoomabile.'
    : 'Illustrazione in scala locale al giorno. Passa a "Mappa reale" per zoomare, orientarti con le strade vere e aprire i singoli punti.';
  block.appendChild(note);

  wrap.appendChild(block);
  return wrap;
}

export { buildMapBlock, haversine, mapsUrl };
