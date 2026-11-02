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
import { parseFeed, filterByRecency, sortByDateDesc, buildSourceCandidates, internationalQueryUrl } from '../js/feed-parser.js';
import { SOURCES } from '../js/data-sources.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, '..', 'data', 'news-feed.json');
const MAX_ITEMS = 8;
const MAX_INTL_ITEMS = 14;
const RECENCY_DAYS = 5;
const TIMEOUT_MS = 15000;
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

async function fetchWithTimeout(url){
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try{
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': UA, 'Accept': 'application/rss+xml, application/xml, text/xml, */*' },
    });
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchFromCandidates(key, candidates, maxItems){
  for(const url of candidates){
    try{
      const xml = await fetchWithTimeout(url);
      let items = parseFeed(xml, maxItems * 2);
      items = sortByDateDesc(filterByRecency(items, RECENCY_DAYS)).slice(0, maxItems);
      if(items.length > 0){
        console.log(`[ok] ${key} <- ${url} (${items.length} titoli)`);
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
    result.sources[src.feedKey] = await fetchFromCandidates(src.feedKey, candidates, MAX_ITEMS);
  }

  // Notizie internazionali sulla Cina: testate non cinesi, stesso meccanismo
  // di ricerca Google News, escludendo i domini delle 8 testate cinesi.
  const intlUrl = internationalQueryUrl(SOURCES, RECENCY_DAYS);
  result.international = await fetchFromCandidates('international', [intlUrl], MAX_INTL_ITEMS);

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify(result, null, 2) + '\n', 'utf8');
  const okCount = Object.values(result.sources).filter(s => s.status === 'ok').length;
  console.log(`\nScritto ${OUT_PATH} — ${okCount}/${SOURCES.length} testate con titoli, internazionali: ${result.international.status}.`);
}

main().catch(err => {
  console.error('Errore imprevisto nello script:', err);
  process.exit(1);
});
