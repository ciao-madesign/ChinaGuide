import { phrasebook, checklist, glossary, contacts, weatherSummary } from './data-tools.js';
import { days } from './data-guide.js';
import { store } from './store.js';

function el(tag, cls, html){ const e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; }

const TOOLS = [
  {key:'frasario', label:'Frasario'},
  {key:'checklist', label:'Checklist'},
  {key:'budget', label:'Budget'},
  {key:'glossario', label:'Glossario'},
  {key:'meteo', label:'Meteo'},
  {key:'contatti', label:'Contatti utili'},
];

function speak(text){
  try{
    if(!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    window.speechSynthesis.speak(u);
  }catch(e){/* speech non disponibile */}
}

function renderFrasario(mainEl){
  const cats = ['Tutte', ...new Set(phrasebook.map(p=>p.cat))];
  let activeCat = 'Tutte';
  let query = '';

  const search = document.createElement('input');
  search.className='phrase-search';
  search.type='search';
  search.placeholder='Cerca in italiano o pinyin… (es. "grazie", "conto")';
  mainEl.appendChild(search);

  const catsWrap = document.createElement('div');
  catsWrap.className='phrase-cats';
  mainEl.appendChild(catsWrap);

  const grid = document.createElement('div');
  grid.className='phrase-grid';
  mainEl.appendChild(grid);

  function draw(){
    catsWrap.innerHTML='';
    cats.forEach(c=>{
      const b = document.createElement('button');
      b.textContent=c; if(c===activeCat) b.classList.add('active');
      b.onclick=()=>{ activeCat=c; draw(); };
      catsWrap.appendChild(b);
    });
    grid.innerHTML='';
    const q = query.trim().toLowerCase();
    phrasebook
      .filter(p=> activeCat==='Tutte' || p.cat===activeCat)
      .filter(p=> !q || p.it.toLowerCase().includes(q) || p.py.toLowerCase().includes(q))
      .forEach(p=>{
        const card = document.createElement('div');
        card.className='phrase-card';
        card.innerHTML = `<button class="speak" title="Ascolta">🔊</button>
          <div class="cn">${p.cn}</div>
          <div class="py mono">${p.py}</div>
          <div class="it">${p.it}</div>`;
        card.querySelector('.speak').onclick = ()=> speak(p.cn);
        grid.appendChild(card);
      });
    if(!grid.children.length){
      grid.innerHTML = `<p style="color:var(--ink-faint);">Nessuna frase trovata.</p>`;
    }
  }
  search.oninput = (e)=>{ query=e.target.value; draw(); };
  draw();
}

function renderChecklist(mainEl){
  const state = store.checklistState();
  const allIds = [];
  checklist.forEach(sec=> sec.items.forEach((t,i)=> allIds.push('tools:'+sec.group+':'+i)));

  const bar = document.createElement('div');
  bar.className='progressbar';
  const fill = document.createElement('div');
  bar.appendChild(fill);
  mainEl.appendChild(bar);
  const progressLbl = document.createElement('p');
  progressLbl.className='mono';
  progressLbl.style.cssText='font-size:12px;color:var(--ink-soft);margin:-14px 0 22px;';
  mainEl.appendChild(progressLbl);

  function updateProgress(){
    const st = store.checklistState();
    const done = allIds.filter(id=>st[id]).length;
    fill.style.width = Math.round(done/allIds.length*100)+'%';
    progressLbl.textContent = `${done} / ${allIds.length} completati`;
  }

  checklist.forEach(sec=>{
    const group = document.createElement('div');
    group.className='checklist-group';
    group.innerHTML = `<h4>${sec.group}</h4>`;
    sec.items.forEach((t,i)=>{
      const id = 'tools:'+sec.group+':'+i;
      const label = document.createElement('label');
      label.className='check-item' + (state[id]?' checked':'');
      label.innerHTML = `<input type="checkbox" ${state[id]?'checked':''}> <span>${t}</span>`;
      label.querySelector('input').onchange=(e)=>{
        store.setChecklistItem(id, e.target.checked);
        label.classList.toggle('checked', e.target.checked);
        updateProgress();
      };
      group.appendChild(label);
    });
    mainEl.appendChild(group);
  });
  updateProgress();
}

function renderBudget(mainEl){
  const settings = store.budgetSettings();
  const total13 = days.reduce((s,d)=>s+d.budget,0);

  const controls = document.createElement('div');
  controls.className='budget-controls';
  controls.innerHTML = `
    <label>Persone: <input type="number" min="1" max="8" id="bg-persons" value="${settings.persons}"></label>
    <label>Margine sicurezza: <span id="bg-cont-val">${settings.contingency}%</span></label>
    <input type="range" id="bg-cont" min="0" max="30" value="${settings.contingency}">
  `;
  mainEl.appendChild(controls);

  const ledger = document.createElement('div');
  ledger.className='budget-ledger';
  mainEl.appendChild(ledger);

  const totalBox = document.createElement('div');
  totalBox.className='budget-total';
  mainEl.appendChild(totalBox);

  const note = document.createElement('p');
  note.style.cssText='font-size:13px;color:var(--ink-faint);margin-top:10px;';
  note.textContent = 'Stima basata sui budget indicativi giorno-per-giorno della guida (fascia media, esclusi voli internazionali). Regola persone e margine per una previsione più realistica.';
  mainEl.appendChild(note);

  function draw(){
    const s = store.budgetSettings();
    ledger.innerHTML='';
    days.forEach(d=>{
      const row = document.createElement('div');
      row.className='budget-row';
      row.innerHTML = `<span class="lbl">Giorno ${d.num} — ${d.city}</span><span class="val">${d.budget} €</span>`;
      ledger.appendChild(row);
    });
    const base = total13 * s.persons;
    const withMargin = Math.round(base * (1 + s.contingency/100));
    totalBox.innerHTML = `<span>Totale stimato (${s.persons} ${s.persons===1?'persona':'persone'}, +${s.contingency}%)</span><span>${withMargin.toLocaleString('it-IT')} €</span>`;
  }
  controls.querySelector('#bg-persons').oninput = (e)=>{
    const s = store.budgetSettings(); s.persons = Math.max(1, parseInt(e.target.value)||1);
    store.setBudgetSettings(s); draw();
  };
  controls.querySelector('#bg-cont').oninput = (e)=>{
    const s = store.budgetSettings(); s.contingency = parseInt(e.target.value);
    controls.querySelector('#bg-cont-val').textContent = s.contingency+'%';
    store.setBudgetSettings(s); draw();
  };
  draw();
}

function renderGlossario(mainEl){
  const grid = document.createElement('div');
  grid.className='glossary-grid';
  glossary.forEach(g=>{
    const c = document.createElement('div');
    c.className='gloss-card';
    c.innerHTML = `<div class="term">${g.term}</div><div class="def">${g.def}</div>`;
    grid.appendChild(c);
  });
  mainEl.appendChild(grid);
}

function renderMeteo(mainEl){
  const table = document.createElement('table');
  table.className='simpletable';
  table.innerHTML = `<tr><th>Tappa</th><th>Meteo tipico (estate)</th><th>Giorni itinerario</th></tr>` +
    weatherSummary.map(w=>`<tr><td>${w.city}</td><td>${w.desc}</td><td>${w.days}</td></tr>`).join('');
  mainEl.appendChild(table);
  const note = document.createElement('div');
  note.className='callout';
  note.innerHTML = `<span class="lbl">Consiglio</span>Porta sempre un K-way leggero: le zone di montagna (Emeishan, Zhangjiajie, Tianmen) possono avere pioggia improvvisa anche quando in pianura è sereno.`;
  mainEl.appendChild(note);
}

function renderContatti(mainEl){
  const ledger = document.createElement('div');
  ledger.className='budget-ledger';
  contacts.forEach(c=>{
    const row = document.createElement('div');
    row.className='budget-row';
    row.innerHTML = `<span class="lbl">${c.label}</span><span class="val" style="text-align:right;max-width:60%;">${c.value}</span>`;
    ledger.appendChild(row);
  });
  mainEl.appendChild(ledger);
}

const RENDERERS = {
  frasario: renderFrasario, checklist: renderChecklist, budget: renderBudget,
  glossario: renderGlossario, meteo: renderMeteo, contatti: renderContatti,
};
const TITLES = {
  frasario:['Frasario essenziale','Le frasi che userai davvero, divise per contesto — tocca 🔊 per sentirne la pronuncia (se il browser lo supporta).'],
  checklist:['Checklist pre-partenza','Tutto ciò che va fatto e messo in valigia — le spunte restano salvate su questo dispositivo.'],
  budget:['Calcolatore di budget','Somma automatica dei budget giornalieri della guida, regolabile per persone e margine di sicurezza.'],
  glossario:['Glossario culturale','I concetti chiave per capire meglio ciò che vedrai e vivrai.'],
  meteo:['Meteo e stagioni','Cosa aspettarti, tappa per tappa, lungo il percorso.'],
  contatti:['Contatti utili','Numeri ed emergenze da salvare offline prima di partire.'],
};

function render(mainEl, route, navigate){
  mainEl.innerHTML='';
  const key = (route.split(':')[1]) || 'frasario';
  mainEl.appendChild(el('p','eyebrow','Strumenti'));
  const [title, subtitle] = TITLES[key] || TITLES.frasario;
  mainEl.appendChild(el('h2','title display',title));
  mainEl.appendChild(el('p','subtitle',subtitle));

  const tabs = document.createElement('div');
  tabs.className='tool-tabs';
  TOOLS.forEach(t=>{
    const b = document.createElement('button');
    b.textContent=t.label;
    if(t.key===key) b.classList.add('active');
    b.onclick = ()=> navigate('strumenti:'+t.key);
    tabs.appendChild(b);
  });
  mainEl.appendChild(tabs);

  (RENDERERS[key]||renderFrasario)(mainEl);
}

export { render };
