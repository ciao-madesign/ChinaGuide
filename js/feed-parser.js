/* =====================================================================
   feed-parser.js — parsing RSS 2.0 / Atom condiviso tra lo script
   Node (scripts/fetch-news.mjs) e il browser (render-news.js). Nessuna
   dipendenza esterna: solo stringhe e regex, compatibile ovunque.
   ===================================================================== */

export function decodeEntities(s){
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/<[^>]+>/g, '')
    .trim();
}

export function tag(block, name){
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? decodeEntities(m[1]) : '';
}

export function atomLink(block){
  const m = block.match(/<link[^>]*href="([^"]+)"[^>]*\/?>/i);
  return m ? m[1] : tag(block, 'link');
}

/** Estrae {title, link, pubDate, source?} da un feed RSS 2.0 o Atom. */
export function parseFeed(xml, maxItems = 10){
  const items = [];
  const rssItems = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  rssItems.forEach(block => {
    const title = tag(block, 'title');
    const link = tag(block, 'link') || atomLink(block);
    const pubDate = tag(block, 'pubDate') || tag(block, 'dc:date') || tag(block, 'published');
    const source = tag(block, 'source');
    if(title && link) items.push({ title, link: link.trim(), pubDate: pubDate || null, source: source || null });
  });
  if(items.length === 0){
    const entries = xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
    entries.forEach(block => {
      const title = tag(block, 'title');
      const link = atomLink(block);
      const pubDate = tag(block, 'published') || tag(block, 'updated');
      if(title && link) items.push({ title, link: link.trim(), pubDate: pubDate || null, source: null });
    });
  }
  return items.slice(0, maxItems);
}

/** Tiene solo gli item pubblicati negli ultimi `days` giorni; chi non ha
    una data valida viene mantenuto (meglio mostrarlo che scartarlo). */
export function filterByRecency(items, days = 4){
  const cutoff = Date.now() - days * 86400000;
  return items.filter(it => {
    if(!it.pubDate) return true;
    const t = Date.parse(it.pubDate);
    return isNaN(t) ? true : t >= cutoff;
  });
}

export function sortByDateDesc(items){
  return [...items].sort((a, b) => {
    const ta = a.pubDate ? Date.parse(a.pubDate) : 0;
    const tb = b.pubDate ? Date.parse(b.pubDate) : 0;
    return (isNaN(tb)?0:tb) - (isNaN(ta)?0:ta);
  });
}

/** URL di ricerca Google News RSS per una query, es. `site:dominio.it "Nome"`.
    Non è un'API ufficiale documentata, ma è un endpoint stabile e molto
    usato per aggregare notizie senza bisogno di chiavi API: fa da
    "semi-crawler" di riserva per le testate senza feed RSS proprio. */
export function googleNewsSearchUrl(query, { days = 4, lang = 'en-US', country = 'US' } = {}){
  const q = encodeURIComponent(`${query} when:${days}d`);
  return `https://news.google.com/rss/search?q=${q}&hl=${lang}&gl=${country}&ceid=${country}:${lang.split('-')[0]}`;
}

/** Pulisce un titolo dai suffissi ridondanti "- Nome Fonte" che Google
    News aggiunge ai risultati (anche ripetuti: "Titolo - X - Y"),
    provando più varianti del nome (inglese, cinese, source del feed). */
export function cleanTitle(title, hints = []){
  let t = (title || '').trim();
  const names = hints.filter(Boolean).map(h => String(h).trim()).filter(Boolean);
  let changed = true;
  while(changed){
    changed = false;
    for(const h of names){
      const suffix = `- ${h}`;
      if(t.length > suffix.length && t.toLowerCase().endsWith(suffix.toLowerCase())){
        t = t.slice(0, t.length - suffix.length).trim();
        changed = true;
      }
    }
  }
  return t;
}

/** Scarta titoli "spazzatura": dopo aver tolto il nome della fonte,
    quel che resta è troppo corto per essere un titolo vero — capita
    con la ricerca Google News, che a volte restituisce solo il nome
    del sito invece di una notizia. */
export function isMeaningfulTitle(title){
  return (title || '').replace(/[\s\-–—·|:：]/g, '').length >= 6;
}

export function domainOf(url){
  try{ return new URL(url).hostname.replace(/^www\.|^en\.|^m\./, ''); }catch(e){ return null; }
}

/** Candidati di feed per una fonte di js/data-sources.js: eventuali RSS
    ufficiali noti + ricerca Google News sul suo dominio come rete di
    sicurezza. Condiviso tra script Node e browser (pulsante "Aggiorna ora"). */
export function buildSourceCandidates(src, officialCandidates = [], days = 5){
  const domains = [...new Set(src.links.map(l => domainOf(l[1])).filter(Boolean))];
  const googleFallbacks = domains.map(d => googleNewsSearchUrl(`site:${d}`, { days }));
  return [...officialCandidates, ...googleFallbacks];
}

/** Query Google News per le notizie internazionali sulla Cina, esclusi
    i domini delle testate cinesi già coperte nella sezione principale. */
export function internationalQueryUrl(sources, days = 5){
  const domains = [...new Set(sources.flatMap(s => s.links.map(l => domainOf(l[1]))).filter(Boolean))];
  const exclusions = domains.map(d => `-site:${d}`).join(' ');
  return googleNewsSearchUrl(`China ${exclusions}`, { days });
}
