/* =====================================================================
   FONTI CINA — portale testate cinesi, sezione separata del sito.
   Stile proprio (data-first, niente emoji, sigillo come unico accento,
   chiaro/scuro) scoperto nella classe .fonti-cina, non nel resto del sito.
   ===================================================================== */
import { SOURCES, DAILY_LOOP } from './data-sources.js';
import { parseFeed, filterByRecency, sortByDateDesc, buildSourceCandidates, internationalQueryUrl } from './feed-parser.js';

const THEME_KEY = 'cn-guide:fonticina-theme';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const RECENCY_DAYS = 5;

let feedCache = null;
let feedPromise = null;
let liveFeed = null; // sovrascrive feedCache quando l'utente preme "Aggiorna ora"

function loadFeed(){
  if(feedPromise) return feedPromise;
  feedPromise = fetch('data/news-feed.json', {cache:'no-store'})
    .then(r => { if(!r.ok) throw new Error('not found'); return r.json(); })
    .then(json => { feedCache = json; return json; })
    .catch(() => { feedCache = null; return null; });
  return feedPromise;
}

function formatDate(iso){
  if(!iso) return '';
  try{
    return new Date(iso).toLocaleString('it-IT', {day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'});
  }catch(e){ return iso; }
}
function formatItemDate(iso){
  if(!iso) return '';
  try{
    const d = new Date(iso);
    if(isNaN(d.getTime())) return '';
    return d.toLocaleDateString('it-IT', {day:'2-digit', month:'short'});
  }catch(e){ return ''; }
}

const state = { type:'all', lang:'all' };
try{
  const s = JSON.parse(localStorage.getItem('cn-guide:fonticina-filtri') || 'null');
  if(s){ state.type = s.type || 'all'; state.lang = s.lang || 'all'; }
}catch(e){}

function el(tag, cls, html){ const e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; }

function headlinesOrFallback(entry, max=5){
  if(entry && entry.status==='ok' && entry.items.length){
    return `<ul class="headlines">${entry.items.slice(0,max).map(it =>
      `<li><a href="${it.link}" target="_blank" rel="noopener">${it.title}</a>${it.pubDate?`<span class="hdate">${formatItemDate(it.pubDate)}</span>`:''}</li>`
    ).join('')}</ul>`;
  }
  return `<p class="no-feed">Nessun titolo disponibile al momento — apri il sito per gli ultimi aggiornamenti.</p>`;
}

function sourceRow(s, feed){
  const li = document.createElement('li');
  li.className = 'src';
  const entry = feed && feed.sources ? feed.sources[s.feedKey] : null;
  const visibleLinks = s.links.filter(l => state.lang==='all' || l[2]===state.lang);

  li.innerHTML = `
    <div class="hz" lang="zh">${s.hz}</div>
    <div class="name"><b>${s.name}</b><span class="tag ${s.type}">${s.type==='off'?'Ufficiale':'Commerciale'}</span><span class="tag">· ${s.topic}</span></div>
    <p class="desc">${s.desc}</p>
    ${headlinesOrFallback(entry)}
    <div class="links">${visibleLinks.map(l => `<a href="${l[1]}" target="_blank" rel="noopener">${l[0]} ↗</a>`).join('')}</div>
  `;
  return li;
}

function renderList(container, feed){
  const rows = SOURCES.filter(s =>
    (state.type==='all' || s.type===state.type) &&
    (state.lang==='all' || s.links.some(l => l[2]===state.lang))
  );
  container.querySelector('#fc-count').textContent = `${rows.length} / ${SOURCES.length} testate`;
  const list = container.querySelector('#fc-list');
  list.innerHTML = '';
  if(!rows.length){
    list.innerHTML = `<li class="empty">Nessuna testata con questi filtri.</li>`;
    return;
  }
  rows.forEach(s => list.appendChild(sourceRow(s, feed)));
}

function renderIntl(container, feed){
  const box = container.querySelector('#fc-intl');
  const entry = feed && feed.international ? feed.international : null;
  if(entry && entry.status==='ok' && entry.items.length){
    box.innerHTML = `<ul class="headlines intl">${entry.items.map(it => `<li>
        <a href="${it.link}" target="_blank" rel="noopener">${it.title}</a>
        <span class="hdate">${it.source ? it.source + ' · ' : ''}${formatItemDate(it.pubDate)}</span>
      </li>`).join('')}</ul>`;
  } else {
    box.innerHTML = `<p class="no-feed">Nessun titolo internazionale disponibile al momento.</p>`;
  }
}

function loadPodcast(){
  return fetch('data/podcast/meta.json', {cache:'no-store'})
    .then(r => { if(!r.ok) throw new Error('not found'); return r.json(); })
    .catch(() => null);
}

function renderPodcast(container, meta){
  const box = container.querySelector('#fc-podcast');
  if(!meta){
    box.innerHTML = `<p class="no-feed">Podcast non ancora attivo — richiede una chiave API Gemini configurata nel repository (vedi README).</p>`;
    return;
  }
  const lines = (meta.script || '').split('\n').filter(Boolean);
  box.innerHTML = `
    <p class="updated">Episodio del ${formatDate(meta.date)}</p>
    <audio controls preload="none" src="data/podcast/latest.mp3?v=${encodeURIComponent(meta.date)}"></audio>
    <details class="transcript">
      <summary>Trascrizione</summary>
      <div class="script">${lines.map(l => `<p>${l}</p>`).join('')}</div>
    </details>
  `;
}

/* "Aggiorna ora": stesso meccanismo di ricerca Google News usato dal
   workflow quotidiano, eseguito però live dal browser tramite un proxy
   CORS pubblico (accettabile: il sito ha un solo utente). Non viene
   salvato da nessuna parte — vale solo per la sessione corrente. */
async function fetchLive(url){
  const res = await fetch(CORS_PROXY + encodeURIComponent(url), {cache:'no-store'});
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();
  const items = sortByDateDesc(filterByRecency(parseFeed(xml, 20), RECENCY_DAYS));
  if(!items.length) throw new Error('nessun item');
  return items;
}

async function refreshLive(wrap, statusEl){
  statusEl.textContent = 'Aggiornamento in corso dal browser…';
  const live = { generatedAt: new Date().toISOString(), sources: {}, international: { status:'unavailable', items:[] } };
  let ok = 0;

  await Promise.all(SOURCES.map(async s => {
    const candidates = buildSourceCandidates(s, [], RECENCY_DAYS);
    for(const url of candidates){
      try{
        const items = await fetchLive(url);
        live.sources[s.feedKey] = { status:'ok', feedUrl:url, items: items.slice(0,8) };
        ok++;
        return;
      }catch(e){ /* prova il candidato successivo */ }
    }
    live.sources[s.feedKey] = (feedCache && feedCache.sources && feedCache.sources[s.feedKey]) || { status:'unavailable', items:[] };
  }));

  try{
    const items = await fetchLive(internationalQueryUrl(SOURCES, RECENCY_DAYS));
    live.international = { status:'ok', items: items.slice(0,14) };
  }catch(e){
    live.international = (feedCache && feedCache.international) || { status:'unavailable', items:[] };
  }

  liveFeed = live;
  statusEl.textContent = `Aggiornato ora dal browser · ${formatDate(live.generatedAt)} · ${ok}/${SOURCES.length} fonti live`;
  renderList(wrap, live);
  renderIntl(wrap, live);
}

function render(mainEl){
  mainEl.innerHTML = '';
  const savedTheme = (()=>{ try{ return localStorage.getItem(THEME_KEY); }catch(e){ return null; } })();

  const wrap = document.createElement('div');
  wrap.className = 'fonti-cina';
  if(savedTheme) wrap.setAttribute('data-theme', savedTheme);

  wrap.innerHTML = `
    <div class="wrap">
      <header>
        <div class="seal" aria-hidden="true">中国</div>
        <div class="htext">
          <h1>Fonti Cina</h1>
          <p class="sub">Testate cinesi da seguire direttamente, in cinese e in inglese.</p>
        </div>
        <button class="theme-toggle" id="fc-theme" type="button">Tema: <span id="fc-theme-label">auto</span></button>
      </header>

      <div class="updated-row">
        <p class="updated" id="fc-updated">Caricamento feed…</p>
        <button class="refresh-btn" id="fc-refresh" type="button">↻ Aggiorna ora dal browser</button>
      </div>

      <section aria-labelledby="fc-h-podcast">
        <h2 id="fc-h-podcast">Podcast del giorno</h2>
        <div id="fc-podcast"><p class="no-feed">Caricamento…</p></div>
      </section>

      <section aria-labelledby="fc-h-daily">
        <h2 id="fc-h-daily">Giro di lettura quotidiano</h2>
        <ol class="daily">
          ${DAILY_LOOP.map(d => `<li><b>${d.name}</b><small>${d.note}</small></li>`).join('')}
        </ol>
      </section>

      <section aria-label="Tutte le testate">
        <div class="filters">
          <div class="group" role="group" aria-label="Tipo">
            <span>Tipo</span>
            <button class="chip" data-f="type" data-v="all">Tutte</button>
            <button class="chip" data-f="type" data-v="off">Ufficiali</button>
            <button class="chip" data-f="type" data-v="com">Commerciali</button>
          </div>
          <div class="group" role="group" aria-label="Lingua">
            <span>Lingua</span>
            <button class="chip" data-f="lang" data-v="all">Tutte</button>
            <button class="chip" data-f="lang" data-v="zh">中文</button>
            <button class="chip" data-f="lang" data-v="en">EN</button>
          </div>
          <div class="count" id="fc-count"></div>
        </div>
        <ul class="list" id="fc-list" style="margin-top:14px"></ul>
      </section>

      <section aria-labelledby="fc-h-intl">
        <h2 id="fc-h-intl">Notizie internazionali sulla Cina</h2>
        <p class="sub2">Testate non cinesi che scrivono di Cina — per bilanciare il punto di vista delle fonti domestiche qui sopra.</p>
        <div id="fc-intl"></div>
      </section>

      <p class="note">I media ufficiali sono controllati dallo Stato; anche le testate commerciali operano dentro il sistema censorio cinese. Leggerle insieme aiuta a distinguere la linea del governo, la vita quotidiana e le trasformazioni economiche. I titoli automatici si aggiornano una volta al giorno; "Aggiorna ora" rifà la stessa ricerca live, solo per questa sessione.</p>
    </div>
  `;
  mainEl.appendChild(wrap);

  function syncChips(){
    wrap.querySelectorAll('button.chip').forEach(b => b.setAttribute('aria-pressed', state[b.dataset.f]===b.dataset.v));
  }
  syncChips();

  wrap.querySelectorAll('button.chip').forEach(b => b.addEventListener('click', () => {
    state[b.dataset.f] = b.dataset.v;
    try{ localStorage.setItem('cn-guide:fonticina-filtri', JSON.stringify(state)); }catch(e){}
    syncChips();
    renderList(wrap, liveFeed || feedCache);
  }));

  const themeBtn = wrap.querySelector('#fc-theme');
  const themeLabel = wrap.querySelector('#fc-theme-label');
  themeLabel.textContent = savedTheme || 'auto';
  themeBtn.addEventListener('click', () => {
    const order = [null, 'light', 'dark'];
    const current = wrap.getAttribute('data-theme');
    const next = order[(order.indexOf(current) + 1) % order.length];
    if(next){ wrap.setAttribute('data-theme', next); } else { wrap.removeAttribute('data-theme'); }
    themeLabel.textContent = next || 'auto';
    try{ next ? localStorage.setItem(THEME_KEY, next) : localStorage.removeItem(THEME_KEY); }catch(e){}
  });

  const refreshBtn = wrap.querySelector('#fc-refresh');
  const updatedEl = wrap.querySelector('#fc-updated');
  refreshBtn.addEventListener('click', async () => {
    refreshBtn.disabled = true;
    refreshBtn.textContent = '↻ Aggiornamento…';
    try{
      await refreshLive(wrap, updatedEl);
    }catch(e){
      updatedEl.textContent = 'Aggiornamento live non riuscito — provo più tardi, i titoli di oggi restano visibili.';
    }
    refreshBtn.disabled = false;
    refreshBtn.textContent = '↻ Aggiorna ora dal browser';
  });

  renderList(wrap, null);
  renderIntl(wrap, null);
  loadPodcast().then(meta => renderPodcast(wrap, meta));

  loadFeed().then(feed => {
    if(feed && feed.generatedAt){
      const okCount = Object.values(feed.sources || {}).filter(s => s.status==='ok').length;
      updatedEl.textContent = `Titoli aggiornati automaticamente · ultimo controllo ${formatDate(feed.generatedAt)} · ${okCount}/${SOURCES.length} fonti con feed attivo`;
    } else {
      updatedEl.textContent = 'Titoli automatici non ancora disponibili — prova "Aggiorna ora" o apri le fonti direttamente.';
    }
    renderList(wrap, feed);
    renderIntl(wrap, feed);
  });
}

export { render };
