import { HOME, intro, days, closing } from './data-guide.js';
import { getIllustration } from './illustrations.js';
import { buildMapBlock } from './maps.js';
import { store } from './store.js';

function el(tag, cls, html){ const e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; }

const ALL_POINTS = days.flatMap(d => d.points.map(p => ({...p, day:d.num})));

function renderSections(sections){
  const wrap = document.createElement('div');
  wrap.className='section';
  sections.forEach(s=>{
    if(s.h){ const h3=document.createElement('h3'); h3.textContent=s.h; wrap.appendChild(h3); }
    s.p.forEach(txt=>{ const p=document.createElement('p'); p.textContent=txt; wrap.appendChild(p); });
  });
  return wrap;
}

function illustrationCard(key, caption){
  const card = document.createElement('div');
  card.className = 'postcard';
  card.innerHTML = `<div class="washi"></div>${getIllustration(key)}<div class="cap">${caption}</div>`;
  return card;
}

function footerNav(kind, idx, navigate){
  const wrap = document.createElement('div');
  wrap.className='footer-nav';
  const prev = document.createElement('button');
  const next = document.createElement('button');
  if(kind==='intro'){
    prev.textContent='← Panoramica'; prev.onclick=()=>navigate('guida');
    next.textContent='Giorno 1 →'; next.onclick=()=>navigate('guida:day:0');
  } else if(kind==='day'){
    prev.textContent = idx===0 ? '← Prima di partire' : '← Giorno precedente';
    prev.onclick = ()=> navigate(idx===0 ? 'guida:intro' : `guida:day:${idx-1}`);
    if(idx===days.length-1){
      next.textContent="Mappa d'insieme →";
      next.onclick = ()=> navigate('guida:close:0');
    } else {
      next.textContent='Giorno successivo →';
      next.onclick = ()=> navigate(`guida:day:${idx+1}`);
    }
  } else {
    prev.textContent = idx===0 ? '← Ultimo giorno' : '← Indietro';
    prev.onclick = ()=> navigate(idx===0 ? `guida:day:${days.length-1}` : `guida:close:${idx-1}`);
    if(idx===closing.length-1){ next.textContent='—'; next.disabled=true; }
    else { next.textContent='Avanti →'; next.onclick = ()=> navigate(`guida:close:${idx+1}`); }
  }
  wrap.appendChild(prev); wrap.appendChild(next);
  return wrap;
}

function renderHome(mainEl, navigate){
  const hero = document.createElement('div'); hero.className='hero';
  hero.appendChild(el('p','eyebrow',HOME.eyebrow));
  const h1=document.createElement('h1'); h1.className='heroTitle display'; h1.textContent=HOME.title; hero.appendChild(h1);
  hero.appendChild(el('p','heroSub',HOME.subtitle));
  const stats=document.createElement('div'); stats.className='herostats';
  HOME.stats.forEach(([n,l])=>{
    const c=document.createElement('div'); c.className='herostat';
    c.innerHTML=`<div class="n">${n}</div><div class="l">${l}</div>`;
    stats.appendChild(c);
  });
  hero.appendChild(stats);
  hero.appendChild(renderSections(HOME.sections));
  mainEl.appendChild(hero);

  const btn = document.createElement('button');
  btn.className='primary';
  btn.textContent='Inizia da "Prima di partire" →';
  btn.onclick = ()=> navigate('guida:intro');
  mainEl.appendChild(btn);
}

function renderIntro(mainEl, navigate){
  mainEl.appendChild(el('p','eyebrow',intro.eyebrow));
  mainEl.appendChild(el('h2','title display',intro.title));
  mainEl.appendChild(el('p','subtitle',intro.subtitle));
  mainEl.appendChild(renderSections(intro.sections));
  mainEl.appendChild(footerNav('intro', 0, navigate));
}

function renderDay(mainEl, idx, navigate){
  const d = days[idx];
  mainEl.appendChild(el('p','eyebrow',`Giorno ${d.num}`));
  mainEl.appendChild(el('h2','title display',d.city));
  mainEl.appendChild(el('p','subtitle',d.title + ' — ' + d.subtitle));

  if(d.flag){
    const fb = document.createElement('div');
    fb.className='flagbanner';
    fb.innerHTML = `<b>⚠ Da valutare:</b> ${d.flag}`;
    mainEl.appendChild(fb);
  }

  mainEl.appendChild(illustrationCard(d.illustration, `${d.city} — giorno ${d.num}`));

  const grid = document.createElement('div');
  grid.className='infogrid';
  [['Trasporti', d.trasporti],['Biglietti da anticipare', d.biglietti],['Alloggio', d.alloggio],
   ['Sforzo fisico', d.sforzo],['Meteo', d.meteo],['Cibo', d.cibo]].forEach(([k,v])=>{
    const c = document.createElement('div'); c.className='infocell';
    c.innerHTML = `<p class="k">${k}</p><p class="v">${v}</p>`;
    grid.appendChild(c);
  });
  mainEl.appendChild(grid);

  const h3tappe = document.createElement('h3'); h3tappe.textContent='Tappe della giornata';
  h3tappe.style.cssText='color:var(--seal-dim);font-size:18px;margin:0 0 10px;';
  mainEl.appendChild(h3tappe);
  const ul = document.createElement('ul'); ul.className='section';
  d.tappe.forEach(t=>{ const li=document.createElement('li'); li.textContent=t; ul.appendChild(li); });
  mainEl.appendChild(ul);

  const budgetEl = document.createElement('div');
  budgetEl.className='budgetbox';
  budgetEl.textContent = 'Budget indicativo: ' + d.budgetLabel;
  mainEl.appendChild(budgetEl);

  mainEl.appendChild(buildMapBlock(d.points, `Mappa del giorno ${d.num}`, false));

  if(d.foto && d.foto!=='—'){
    const pn = document.createElement('div');
    pn.className='callout';
    pn.innerHTML = `<span class="lbl">Cosa vedrai</span>${d.foto}`;
    mainEl.appendChild(pn);
  }

  const visited = store.visitedDays().has(d.key);
  const stampBtn = document.createElement('button');
  stampBtn.className = visited ? 'primary' : 'ghost';
  stampBtn.textContent = visited ? '✓ Giorno vissuto — timbrato nel passaporto' : '🖋 Segna questo giorno come vissuto';
  stampBtn.style.marginTop='10px';
  stampBtn.onclick = ()=>{ store.toggleDayVisited(d.key); if(window.__buildNav) window.__buildNav(); if(window.__reRender) window.__reRender(); };
  mainEl.appendChild(stampBtn);

  mainEl.appendChild(footerNav('day', idx, navigate));
}

function renderClosing(mainEl, idx, navigate){
  const c = closing[idx];
  mainEl.appendChild(el('p','eyebrow',c.eyebrow));
  mainEl.appendChild(el('h2','title display',c.title));
  mainEl.appendChild(el('p','subtitle',c.subtitle));

  if(c.isOverviewMap){
    mainEl.appendChild(buildMapBlock(null, 'Percorso completo — 13 giorni', true, ALL_POINTS));
  }
  if(c.key==='checklist'){
    const state = store.checklistState();
    c.sections.forEach(sec=>{
      const group = document.createElement('div');
      group.className='checklist-group';
      group.innerHTML = `<h4>${sec.h}</h4>`;
      sec.p.forEach((txt,i)=>{
        const id = 'guida:'+sec.h+':'+i;
        const label = document.createElement('label');
        label.className = 'check-item' + (state[id]?' checked':'');
        label.innerHTML = `<input type="checkbox" ${state[id]?'checked':''}> <span>${txt}</span>`;
        label.querySelector('input').onchange = (e)=>{
          store.setChecklistItem(id, e.target.checked);
          label.classList.toggle('checked', e.target.checked);
        };
        group.appendChild(label);
      });
      mainEl.appendChild(group);
    });
    const link = document.createElement('p');
    link.innerHTML = `<a href="#/strumenti/checklist" style="color:var(--seal-dim);">→ Vai alla checklist completa negli Strumenti, con barra di avanzamento</a>`;
    mainEl.appendChild(link);
  } else {
    mainEl.appendChild(renderSections(c.sections));
  }

  mainEl.appendChild(footerNav('close', idx, navigate));
}

function render(mainEl, route, navigate){
  mainEl.innerHTML='';
  if(route==='guida') return renderHome(mainEl, navigate);
  if(route==='guida:intro') return renderIntro(mainEl, navigate);
  const dayMatch = route.match(/^guida:day:(\d+)$/);
  if(dayMatch) return renderDay(mainEl, parseInt(dayMatch[1]), navigate);
  const closeMatch = route.match(/^guida:close:(\d+)$/);
  if(closeMatch) return renderClosing(mainEl, parseInt(closeMatch[1]), navigate);
  renderHome(mainEl, navigate);
}

export { render, days, closing, ALL_POINTS };
