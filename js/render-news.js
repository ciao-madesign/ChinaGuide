/* =====================================================================
   FONTI CINA — portale di notizie, pagina autonoma (fonticina.html),
   separata dal taccuino di viaggio. Stile proprio (data-first, feed di
   testate con badge/thumbnail invece di blocchi di testo densi, sigillo
   come unico accento, chiaro/scuro). Questo modulo gira da solo: non è
   montato dal router del taccuino, lavora sugli elementi già presenti
   in fonticina.html.
   ===================================================================== */
import { SOURCES } from './data-sources.js';
import { parseFeed, filterByRecency, sortByDateDesc, buildSourceCandidates, internationalQueryUrl, cleanTitle, isMeaningfulTitle } from './feed-parser.js';

const THEME_KEY = 'cn-guide:fonticina-theme';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const RECENCY_DAYS = 5;
const MAX_PER_SOURCE = 6;

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
  try{ return new Date(iso).toLocaleString('it-IT', {day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'}); }
  catch(e){ return iso; }
}
function formatItemDate(iso){
  if(!iso) return '';
  try{
    const d = new Date(iso);
    if(isNaN(d.getTime())) return '';
    return d.toLocaleDateString('it-IT', {day:'2-digit', month:'short'});
  }catch(e){ return ''; }
}

const state = { scope:'all', type:'all', lang:'all' };
try{
  const s = JSON.parse(localStorage.getItem('cn-guide:fonticina-filtri') || 'null');
  if(s){ state.scope = s.scope || 'all'; state.type = s.type || 'all'; state.lang = s.lang || 'all'; }
}catch(e){}

function esc(s){ return String(s==null?'':s).replace(/"/g,'&quot;'); }

function badge(ch, cls){ return `<span class="fc-badge ${cls}" lang="zh">${ch}</span>`; }

/** Una "card" del feed: badge colorato per testata (o internazionale),
    titolo cliccabile, riga meta con fonte/tipo/data. Niente descrizioni
    lunghe qui: quelle restano nel cassetto "Le 8 testate" in fondo. */
function card(it, s){
  const isIntl = !s;
  const cls = isIntl ? 'intl' : s.type;
  const ch = isIntl ? (it.source ? it.source.slice(0,1).toUpperCase() : '外') : s.hz.slice(0,1);
  const sourceLabel = isIntl ? (it.source || 'Stampa internazionale') : s.name;
  const tagLabel = isIntl ? 'Internazionale' : (s.type==='off' ? 'Ufficiale' : 'Commerciale');
  return `
    <li class="fc-card">
      ${badge(ch, cls)}
      <div class="fc-card-body">
        <a class="fc-headline" href="${it.link}" target="_blank" rel="noopener">${it.title}</a>
        <div class="fc-meta">
          <span class="fc-source">${esc(sourceLabel)}</span>
          <span class="fc-tag ${cls}">${tagLabel}</span>
          ${it.pubDate ? `<span class="fc-date">${formatItemDate(it.pubDate)}</span>` : ''}
        </div>
      </div>
    </li>`;
}

function sortFlat(flat){
  return [...flat].sort((a,b)=>{
    const ta = a.it.pubDate ? Date.parse(a.it.pubDate) : NaN;
    const tb = b.it.pubDate ? Date.parse(b.it.pubDate) : NaN;
    if(isNaN(ta) && isNaN(tb)) return 0;
    if(isNaN(ta)) return 1;
    if(isNaN(tb)) return -1;
    return tb - ta;
  });
}

function matchingSources(){
  if(state.scope==='intl') return [];
  return SOURCES.filter(s =>
    (state.type==='all' || s.type===state.type) &&
    (state.lang==='all' || s.links.some(l => l[2]===state.lang))
  );
}

/** Notizie in primo piano: testate cinesi e stampa internazionale
    mescolate in un unico flusso cronologico, non raggruppate per
    testata — questa è la pagina, le testate sono solo il filtro. */
/* I titoli puliti dai suffissi "- Nome Fonte" già nello script che
   genera data/news-feed.json, ma lo rifacciamo anche qui: copre i dati
   già pubblicati prima di questa pulizia e il refresh live dal browser. */
function cleanItem(it, hints){
  const title = cleanTitle(it.title, [...hints, it.source]);
  return isMeaningfulTitle(title) ? { ...it, title } : null;
}

function buildFlatFeed(feed){
  const flat = [];
  if(state.scope !== 'intl'){
    matchingSources().forEach(s => {
      const entry = feed && feed.sources ? feed.sources[s.feedKey] : null;
      if(entry && entry.status==='ok' && entry.items.length){
        entry.items.slice(0, MAX_PER_SOURCE).forEach(it => {
          const cleaned = cleanItem(it, [s.name, s.hz]);
          if(cleaned) flat.push({it: cleaned, s});
        });
      }
    });
  }
  if(state.scope !== 'cn'){
    const intl = feed && feed.international && feed.international.status==='ok' ? feed.international.items : [];
    intl.forEach(it => {
      const cleaned = cleanItem(it, []);
      if(cleaned) flat.push({it: cleaned, s:null});
    });
  }
  return sortFlat(flat);
}

function renderFeed(feed){
  const flat = buildFlatFeed(feed);
  const scopeNote = state.scope==='cn' ? `${matchingSources().length}/${SOURCES.length} testate` : state.scope==='intl' ? 'internazionali' : `${matchingSources().length}/${SOURCES.length} testate + internazionali`;
  document.getElementById('fc-count').textContent = `${flat.length} titoli · ${scopeNote}`;
  const list = document.getElementById('fc-feed');
  list.innerHTML = flat.length
    ? flat.map(({it,s}) => card(it,s)).join('')
    : `<li class="fc-empty">Nessun titolo con questi filtri al momento — prova "Tutte" o "Aggiorna ora dal browser".</li>`;
}

function renderDirectory(){
  const rows = matchingSources();
  const box = document.getElementById('fc-directory');
  box.innerHTML = rows.length ? rows.map(s => `
    <div class="fc-dir-row">
      ${badge(s.hz.slice(0,1), s.type)}
      <div class="fc-dir-info">
        <b title="${esc(s.desc)}">${s.name}</b>
        <span class="fc-tag ${s.type}">${s.type==='off'?'Ufficiale':'Commerciale'}</span>
        <span class="fc-dir-topic">${s.topic}</span>
      </div>
      <div class="fc-dir-links">${s.links.map(l => `<a href="${l[1]}" target="_blank" rel="noopener">${l[0]} ↗</a>`).join('')}</div>
    </div>`).join('') : `<p class="no-feed">Nessuna testata con questi filtri (scegli "Testate cinesi" o "Tutte" in Ambito).</p>`;
}

function loadPodcast(){
  return fetch('data/podcast/meta.json', {cache:'no-store'})
    .then(r => { if(!r.ok) throw new Error('not found'); return r.json(); })
    .catch(() => null);
}

function renderPodcast(meta){
  const box = document.getElementById('fc-podcast');
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
   salvato da nessuna parte — vale solo per la sessione corrente.
   Il proxy pubblico può restare appeso senza mai rispondere: ogni
   richiesta ha quindi un timeout, altrimenti il pulsante "Aggiorna
   ora" resterebbe bloccato per sempre in attesa. */
const FETCH_TIMEOUT_MS = 9000;
const REFRESH_TIMEOUT_MS = 25000;

function fetchWithTimeout(url, opts = {}, timeoutMs = FETCH_TIMEOUT_MS){
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  return fetch(url, { ...opts, signal: ctrl.signal }).finally(() => clearTimeout(t));
}

async function fetchLive(url, hints = []){
  let res;
  try{
    res = await fetchWithTimeout(CORS_PROXY + encodeURIComponent(url), { cache:'no-store' });
  }catch(e){
    throw new Error(e.name === 'AbortError' ? 'timeout' : e.message);
  }
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();
  let items = sortByDateDesc(filterByRecency(parseFeed(xml, 24), RECENCY_DAYS));
  items = items.map(it => cleanItem(it, hints)).filter(Boolean);
  if(!items.length) throw new Error('nessun item');
  return items;
}

function withTimeout(promise, ms, message){
  let timer;
  const timeout = new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(message)), ms); });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

async function refreshLiveInner(statusEl){
  statusEl.textContent = 'Aggiornamento in corso dal browser…';
  const live = { generatedAt: new Date().toISOString(), sources: {}, international: { status:'unavailable', items:[] } };
  let ok = 0;

  await Promise.all(SOURCES.map(async s => {
    const candidates = buildSourceCandidates(s, [], RECENCY_DAYS);
    for(const url of candidates){
      try{
        const items = await fetchLive(url, [s.name, s.hz]);
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
  renderFeed(live);
}

function refreshLive(statusEl){
  return withTimeout(refreshLiveInner(statusEl), REFRESH_TIMEOUT_MS, 'timeout complessivo');
}

function init(){
  const savedTheme = (()=>{ try{ return localStorage.getItem(THEME_KEY); }catch(e){ return null; } })();
  if(savedTheme) document.body.setAttribute('data-theme', savedTheme);

  renderDirectory();

  function syncChips(){
    document.querySelectorAll('button.chip').forEach(b => b.setAttribute('aria-pressed', state[b.dataset.f]===b.dataset.v));
  }
  syncChips();

  document.querySelectorAll('button.chip').forEach(b => b.addEventListener('click', () => {
    state[b.dataset.f] = b.dataset.v;
    try{ localStorage.setItem('cn-guide:fonticina-filtri', JSON.stringify(state)); }catch(e){}
    syncChips();
    renderFeed(liveFeed || feedCache);
    renderDirectory();
  }));

  const themeBtn = document.getElementById('fc-theme');
  const themeLabel = document.getElementById('fc-theme-label');
  themeLabel.textContent = savedTheme || 'auto';
  themeBtn.addEventListener('click', () => {
    const order = [null, 'light', 'dark'];
    const current = document.body.getAttribute('data-theme');
    const next = order[(order.indexOf(current) + 1) % order.length];
    if(next){ document.body.setAttribute('data-theme', next); } else { document.body.removeAttribute('data-theme'); }
    themeLabel.textContent = next || 'auto';
    try{ next ? localStorage.setItem(THEME_KEY, next) : localStorage.removeItem(THEME_KEY); }catch(e){}
  });

  const refreshBtn = document.getElementById('fc-refresh');
  const updatedEl = document.getElementById('fc-updated');
  refreshBtn.addEventListener('click', async () => {
    refreshBtn.disabled = true;
    refreshBtn.textContent = '↻ Aggiornamento…';
    try{ await refreshLive(updatedEl); }
    catch(e){ updatedEl.textContent = 'Aggiornamento live non riuscito — provo più tardi, i titoli di oggi restano visibili.'; }
    refreshBtn.disabled = false;
    refreshBtn.textContent = '↻ Aggiorna ora dal browser';
  });

  renderFeed(null);
  loadPodcast().then(renderPodcast);

  loadFeed().then(feed => {
    if(feed && feed.generatedAt){
      const okCount = Object.values(feed.sources || {}).filter(s => s.status==='ok').length;
      updatedEl.textContent = `Titoli aggiornati automaticamente · ultimo controllo ${formatDate(feed.generatedAt)} · ${okCount}/${SOURCES.length} fonti con feed attivo`;
    } else {
      updatedEl.textContent = 'Titoli automatici non ancora disponibili — prova "Aggiorna ora" o apri le fonti direttamente.';
    }
    renderFeed(feed);
  });
}

init();
