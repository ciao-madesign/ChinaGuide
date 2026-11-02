#!/usr/bin/env node
/* =====================================================================
   fetch-news.mjs — scarica i titoli per "Fonti Cina" e scrive
   data/news-feed.json. Pensato per girare in una GitHub Action
   schedulata (solo Node nativo, nessuna dipendenza da installare).

   Per ogni testata: prova prima eventuali feed RSS/Atom ufficiali noti,
   poi usa comunque come rete di sicurezza una ricerca su Google News RSS
   limitata al suo dominio (site:) — utile perché molte testate cinesi
   non pubblicano un RSS proprio verificabile, ma Google le indicizza
   comunque. Stessa logica, con query più ampia e domini esclusi, per
   la sezione "Notizie internazionali sulla Cina" (testate non cinesi
   che parlano di Cina).

   Ogni fonte è indipendente: se fallisce tutto per una testata, resta
   "unavailable" senza bloccare le altre.
   ===================================================================== */
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { parseFeed, filterByRecency, sortByDateDesc, buildSourceCandidates, internationalQueryUrl, cleanTitle, isMeaningfulTitle, decodeEntities } from '../js/feed-parser.js';
import { SOURCES } from '../js/data-sources.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, '..', 'data', 'news-feed.json');
const MAX_ITEMS = 8;
const MAX_INTL_ITEMS = 14;
const RECENCY_DAYS = 5;
const TIMEOUT_MS = 15000;
const ARTICLE_TIMEOUT_MS = 12000;
const ARTICLE_CONCURRENCY = 6;
const ARTICLE_MAX_CHARS = 3200;
const UA = 'Mozilla/5.0 (compatible; FontiCinaBot/1.0; +https://github.com/ciao-madesign/ChinaGuide)';

/* Candidati di feed ufficiale noti/plausibili (possono non funzionare:
   in tal caso la ricerca Google News su quel dominio fa comunque da
   rete di sicurezza). Chiave = feedKey in js/data-sources.js. */
const OFFICIAL_CANDIDATES = {
  chinadaily: [
    'https://www.chinadaily.com.cn/rss/china_rss.xml',
    'https://www.chinadaily.com.cn/rss/world_rss.xml',
  ],
  caixin: ['https://www.caixinglobal.com/rss/china.xml'],
  sixthtone: ['https://www.sixthtone.com/rss', 'https://www.sixthtone.com/feed'],
  globaltimes: ['https://www.globaltimes.cn/rss/china.xml'],
};

async function fetchWithTimeout(url, { timeoutMs = TIMEOUT_MS, accept = 'application/rss+xml, application/xml, text/xml, */*', method = 'GET', body = null, extraHeaders = {} } = {}){
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try{
    const res = await fetch(url, {
      method,
      body,
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': UA, 'Accept': accept, ...extraHeaders },
    });
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

/* ---------------------------------------------------------------------
   I link nei risultati Google News (https://news.google.com/rss/articles/…)
   non portano direttamente all'articolo: sono una pagina-ponte di Google
   che poi reindirizza via JavaScript. Per arrivare all'URL vero serve
   chiamare un endpoint interno di Google (non documentato, tecnica nota
   e usata da diversi progetti open-source — stesso livello di "non
   ufficiale ma stabile" già accettato per la ricerca Google News stessa).
   Se Google cambia questo meccanismo, la funzione torna semplicemente
   null: fetchArticleText si ferma lì, senza bloccare nulla.
   --------------------------------------------------------------------- */
const GN_BATCHEXECUTE = 'https://news.google.com/_/DotsSplashUi/data/batchexecute';

function googleNewsArticleId(url){
  const m = url.match(/\/articles\/([^/?]+)/);
  return m ? m[1] : null;
}

const gnStats = { total: 0, noId: 0, noSgTs: 0, batchFailed: 0, noUrlInResponse: 0, resolved: 0 };

async function resolveGoogleNewsUrl(gnUrl){
  gnStats.total++;
  const urlId = googleNewsArticleId(gnUrl);
  if(!urlId){ gnStats.noId++; return null; }
  try{
    const html = await fetchWithTimeout(gnUrl, { timeoutMs: ARTICLE_TIMEOUT_MS, accept: 'text/html' });
    const sg = html.match(/data-n-a-sg="([^"]+)"/)?.[1];
    const ts = html.match(/data-n-a-ts="([^"]+)"/)?.[1];
    const artId = html.match(/data-n-a-id="([^"]+)"/)?.[1] || urlId;
    if(!sg || !ts){ gnStats.noSgTs++; return null; }

    const innerPayload = JSON.stringify([
      'garturlreq',
      [['X','X',['X','X'],null,null,1,1,'US:en',null,1,null,null,null,null,null,0,1],
       'X','X',1,[1,1,1],1,1,null,0,0,null,0],
      artId, ts, sg,
    ]);
    const fReq = JSON.stringify([[['Fbv4je', innerPayload, null, 'generic']]]);

    let raw;
    try{
      raw = await fetchWithTimeout(GN_BATCHEXECUTE, {
        timeoutMs: ARTICLE_TIMEOUT_MS,
        accept: '*/*',
        method: 'POST',
        body: `f.req=${encodeURIComponent(fReq)}`,
        extraHeaders: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      });
    }catch(e){ gnStats.batchFailed++; return null; }

    const m = raw.match(/garturlres\\?",\\?"(https?:\/\/[^"\\]+)/);
    if(!m){ gnStats.noUrlInResponse++; return null; }
    gnStats.resolved++;
    return m[1].replace(/\\\//g, '/');
  }catch(e){
    return null;
  }
}

/** Esegue fn su ogni elemento con al più `limit` chiamate in corso
    contemporaneamente — niente dipendenze esterne, un piccolo pool di
    worker che pescano dalla stessa coda. */
async function mapLimit(items, limit, fn){
  const results = new Array(items.length);
  let next = 0;
  async function worker(){
    while(next < items.length){
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

/** Estrazione euristica del testo leggibile di un articolo, senza
    dipendenze: toglie gli script/stili/boilerplate, preferisce il
    contenuto dentro <article> se c'è, e tiene solo i paragrafi <p>
    abbastanza lunghi da essere testo vero (non didascalie o nav).
    Nessuna garanzia di qualità: molti siti (JS-rendered, paywall)
    restituiscono poco o niente, e va bene così — resta solo il link. */
function extractReadableText(html){
  let s = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<(header|footer|nav|aside|form|iframe|svg|figure)[\s\S]*?<\/\1>/gi, ' ');

  const articleMatch = s.match(/<article[\s\S]*?<\/article>/i);
  const scope = articleMatch ? articleMatch[0] : s;

  const paraBlocks = scope.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
  const paragraphs = paraBlocks
    .map(p => decodeEntities(p))
    .map(t => t.trim())
    .filter(t => t.length > 40 && !/^(cookie|subscribe|sign up|advertisement)/i.test(t));

  if(paragraphs.length < 2) return null;

  const out = [];
  let total = 0;
  for(const p of paragraphs){
    if(total + p.length > ARTICLE_MAX_CHARS){
      if(out.length === 0) out.push(p.slice(0, ARTICLE_MAX_CHARS));
      out.push('[continua sulla fonte originale]');
      break;
    }
    out.push(p);
    total += p.length;
  }
  return out;
}

async function fetchArticleText(url){
  try{
    let target = url;
    if(/^https?:\/\/news\.google\.com\//.test(url)){
      target = await resolveGoogleNewsUrl(url);
      if(!target) return null;
    }
    const html = await fetchWithTimeout(target, { timeoutMs: ARTICLE_TIMEOUT_MS, accept: 'text/html,application/xhtml+xml' });
    return extractReadableText(html);
  }catch(e){
    return null;
  }
}

/** Trascrive il testo di ogni notizia che terremo nel feed (non dei
    candidati scartati), con un numero limitato di richieste in
    parallelo per non intasare i siti sorgente. */
async function attachArticleText(items){
  return mapLimit(items, ARTICLE_CONCURRENCY, async (it) => ({ ...it, text: await fetchArticleText(it.link) }));
}

async function fetchFromCandidates(key, candidates, maxItems, hints = []){
  for(const url of candidates){
    try{
      const xml = await fetchWithTimeout(url);
      let items = parseFeed(xml, maxItems * 3);
      items = sortByDateDesc(filterByRecency(items, RECENCY_DAYS));
      items = items
        .map(it => ({ ...it, title: cleanTitle(it.title, [...hints, it.source]) }))
        .filter(it => isMeaningfulTitle(it.title))
        .slice(0, maxItems);
      if(items.length > 0){
        items = await attachArticleText(items);
        const withText = items.filter(it => it.text).length;
        console.log(`[ok] ${key} <- ${url} (${items.length} titoli, ${withText} con testo estratto)`);
        return { status: 'ok', feedUrl: url, items };
      }
      console.log(`[vuoto] ${key} <- ${url} (0 item utili dopo il filtro)`);
    }catch(err){
      console.log(`[fallito] ${key} <- ${url}: ${err.message}`);
    }
  }
  return { status: 'unavailable', feedUrl: null, items: [] };
}

async function main(){
  const result = { generatedAt: new Date().toISOString(), sources: {}, international: { status: 'unavailable', items: [] } };

  for(const src of SOURCES){
    const candidates = buildSourceCandidates(src, OFFICIAL_CANDIDATES[src.feedKey] || [], RECENCY_DAYS);
    result.sources[src.feedKey] = await fetchFromCandidates(src.feedKey, candidates, MAX_ITEMS, [src.name, src.hz]);
  }

  // Notizie internazionali sulla Cina: testate non cinesi, stesso meccanismo
  // di ricerca Google News, escludendo i domini delle 8 testate cinesi.
  const intlUrl = internationalQueryUrl(SOURCES, RECENCY_DAYS);
  result.international = await fetchFromCandidates('international', [intlUrl], MAX_INTL_ITEMS);

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(result, null, 2) + '\n', 'utf8');
  const okCount = Object.values(result.sources).filter(s => s.status === 'ok').length;
  console.log(`\nScritto ${OUT_PATH} — ${okCount}/${SOURCES.length} testate con titoli, internazionali: ${result.international.status}.`);
  if(gnStats.total > 0){
    console.log(`Resolver redirect Google News: ${gnStats.resolved}/${gnStats.total} risolti ` +
      `(${gnStats.noId} senza id, ${gnStats.noSgTs} senza firma/timestamp sulla pagina, ${gnStats.batchFailed} chiamata batchexecute fallita, ${gnStats.noUrlInResponse} url non trovato nella risposta).`);
  }
}

main().catch(err => {
  console.error('Errore imprevisto nello script:', err);
  process.exit(1);
});
