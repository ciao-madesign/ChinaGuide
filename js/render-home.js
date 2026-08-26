import { heroIllustration, getIllustration } from './illustrations.js';
import { store } from './store.js';
import { lessons } from './data-course.js';
import { days } from './data-guide.js';

function el(tag, cls, html){ const e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; }

function daysUntil(dateStr){
  if(!dateStr) return null;
  const target = new Date(dateStr+'T00:00:00');
  const now = new Date(); now.setHours(0,0,0,0);
  return Math.round((target-now)/86400000);
}

function renderCountdown(mainEl){
  const box = document.createElement('div');
  box.className='countdown-box';
  const dep = store.departureDate();
  const n = daysUntil(dep);
  box.innerHTML = `
    <div>
      <div class="num">${n===null ? '—' : (n>=0? n : 0)}</div>
      <div class="lbl">${n===null ? 'Imposta la data di partenza' : (n>0 ? 'giorni alla partenza' : (n===0? 'si parte oggi!' : 'buon viaggio, ormai partito'))}</div>
    </div>
    <div style="margin-left:auto;display:flex;align-items:center;gap:8px;">
      <label class="mono" style="font-size:11px;color:var(--ink-soft);">Data partenza</label>
      <input type="date" id="dep-date" value="${dep||''}">
    </div>
  `;
  box.querySelector('#dep-date').onchange = (e)=>{
    store.setDepartureDate(e.target.value);
    if(window.__reRender) window.__reRender();
  };
  mainEl.appendChild(box);
}

function render(mainEl, navigate){
  mainEl.innerHTML='';

  const heroWrap = document.createElement('div');
  heroWrap.className='hero-photo-wrap';
  heroWrap.innerHTML = `<div class="hero-photo">${heroIllustration()}</div><span class="credit">illustrazione originale · stile taccuino</span>`;
  mainEl.appendChild(heroWrap);

  mainEl.appendChild(el('div','eyebrow','中国路 — La tua preparazione al viaggio'));
  const h1 = document.createElement('h1');
  h1.className='heroTitle display';
  h1.innerHTML = `<span class="heroTitleCn brush">中国</span>Corso &amp; guida di viaggio`;
  mainEl.appendChild(h1);
  mainEl.appendChild(el('p','heroSub','Tutto in un unico taccuino: un corso per capire la Cina prima di partire, una guida giorno-per-giorno per il tuo itinerario di 13 giorni, e gli strumenti pratici per arrivare preparati — frasario, checklist, budget e mappe.'));

  const stats = document.createElement('div');
  stats.className='herostats';
  const completedLessons = store.completedLessons().size;
  const visitedDays = store.visitedDays().size;
  [[String(lessons.length),'Lezioni'],[String(days.length),'Giorni di viaggio'],[`${completedLessons}/${lessons.length}`,'Lezioni fatte'],[`${visitedDays}/${days.length}`,'Giorni vissuti']]
    .forEach(([n,l])=>{
      const c=document.createElement('div'); c.className='herostat';
      c.innerHTML=`<div class="n">${n}</div><div class="l">${l}</div>`;
      stats.appendChild(c);
    });
  mainEl.appendChild(stats);

  renderCountdown(mainEl);

  const hub = document.createElement('div');
  hub.className='hubgrid';
  const cards = [
    {ico:'📖', title:'Corso di preparazione', desc:'10 lezioni con quiz su storia, filosofia, lingua, cibo e usi cinesi.', go:'Inizia il corso →', route:'corso'},
    {ico:'🧭', title:'Guida di viaggio', desc:'13 giorni, tappa per tappa: trasporti, biglietti, budget, mappe reali e schizzi illustrati.', go:'Apri la guida →', route:'guida'},
    {ico:'🎒', title:'Strumenti', desc:'Frasario, checklist interattiva, calcolatore di budget, glossario e contatti utili.', go:'Vai agli strumenti →', route:'strumenti:frasario'},
  ];
  cards.forEach(c=>{
    const b = document.createElement('button');
    b.className='hubcard';
    b.innerHTML = `<div class="ico">${c.ico}</div><h4>${c.title}</h4><p>${c.desc}</p><span class="go">${c.go}</span>`;
    b.onclick = ()=> navigate(c.route);
    hub.appendChild(b);
  });
  mainEl.appendChild(hub);

  mainEl.appendChild(el('h3',null,'Un assaggio del viaggio'));
  const gallery = document.createElement('div');
  gallery.className='gallery';
  [['gallery-wall','La Grande Muraglia'],['gallery-panda','I panda di Chengdu'],['gallery-lanterns','Lanterne e festività']].forEach(([key,cap])=>{
    const card = document.createElement('div');
    card.className='postcard';
    card.innerHTML = `<div class="washi"></div>${getIllustration(key)}<div class="cap">${cap}</div>`;
    gallery.appendChild(card);
  });
  mainEl.appendChild(gallery);

  const divider = document.createElement('div');
  divider.className='divider-brush';
  mainEl.appendChild(divider);

  const closing = document.createElement('p');
  closing.className='hand';
  closing.style.cssText='font-size:20px;color:var(--ink-soft);text-align:center;margin:0 0 20px;';
  closing.textContent='"Un viaggio di mille miglia inizia con un singolo passo." — Laozi';
  mainEl.appendChild(closing);
}

export { render };
