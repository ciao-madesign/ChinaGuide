# 中国路 — Corso e guida di viaggio in Cina

Sito statico, interamente illustrato in stile "taccuino di viaggio", che unisce:

- **Corso di preparazione** — 10 lezioni con quiz su geografia, storia, filosofia, cucina, lingua e usi cinesi.
- **Guida di viaggio** — itinerario dettagliato di 13 giorni, giorno per giorno, con trasporti, biglietti, budget, e per ogni tappa sia una mappa illustrata sia una mappa reale interattiva.
- **Strumenti** — frasario cinese-italiano, checklist pre-partenza interattiva, calcolatore di budget, glossario culturale, riepilogo meteo e contatti utili.
- **Fonti Cina** — portale separato (stile proprio: data-first, niente emoji, tema chiaro/scuro) con le 8 principali testate cinesi, titoli aggiornati automaticamente ogni giorno, una sezione di notizie internazionali sulla Cina, e un podcast quotidiano generato con l'IA. Vedi [sotto](#fonti-cina--notizie-e-podcast) per l'attivazione.

## Tecnologia

Nessun framework, nessun build step: HTML/CSS/JS "vanilla" con ES module. Le uniche dipendenze esterne sono i Google Fonts e [Leaflet](https://leafletjs.com/) (per le mappe reali, con tile OpenStreetMap). Tutte le illustrazioni sono generate via SVG/JS in `js/illustrations.js` — nessuna immagine esterna caricata.

I progressi (lezioni completate, giorni "vissuti", checklist, budget, data di partenza) vengono salvati in `localStorage`, quindi restano solo sul dispositivo/browser usato.

## Struttura

```
index.html             shell del sito, nav e mount point
css/style.css           design system "taccuino": carta, inchiostro, acquerelli
js/data-course.js       contenuti delle 10 lezioni + quiz finale
js/data-guide.js        contenuti dei 13 giorni + intro + chiusura
js/data-tools.js        frasario, checklist, glossario, contatti, meteo
js/illustrations.js     libreria di illustrazioni SVG generate via codice
js/maps.js              mappe: schizzo illustrato + mappa reale (Leaflet)
js/store.js             persistenza in localStorage
js/render-*.js          rendering delle varie sezioni
js/app.js               router (hash-based) e navigazione
js/data-sources.js      le 8 testate di "Fonti Cina" + giro di lettura quotidiano
js/feed-parser.js        parsing RSS/Atom condiviso tra script Node e browser
js/render-news.js        rendering del portale "Fonti Cina"
scripts/fetch-news.mjs   scarica i titoli (eseguito dal workflow quotidiano)
scripts/generate-podcast.mjs  genera script + audio del podcast quotidiano (richiede GEMINI_API_KEY)
data/news-feed.json      titoli generati — non modificare a mano, lo sovrascrive il workflow
data/podcast/            audio + trascrizione del podcast del giorno
```

## Sviluppo locale

Basta servire la cartella con un qualsiasi server statico, ad esempio:

```
python3 -m http.server 8080
```

poi apri `http://localhost:8080`.

## Deploy

Il workflow `.github/workflows/deploy.yml` pubblica automaticamente il sito su GitHub Pages ad ogni push su `main`. Se non è già attivo, vai su **Settings → Pages** del repository e imposta la sorgente su **GitHub Actions** (operazione da fare una sola volta).

## Fonti Cina — notizie e podcast

Il sito è statico (GitHub Pages non esegue codice server-side), quindi titoli e podcast non vengono scaricati "al volo" dal browser dei visitatori: li genera una volta al giorno il workflow **`.github/workflows/update-news.yml`** (cron alle 05:00 UTC, oppure lanciabile a mano da **Actions → Update news feed (Fonti Cina) → Run workflow**), che scrive `data/news-feed.json` e `data/podcast/` e li pubblica con un commit automatico (che a sua volta fa ripartire il deploy).

### Titoli delle testate

Per ogni testata, lo script prova prima eventuali feed RSS ufficiali noti; molte testate cinesi però non ne pubblicano uno verificabile, quindi come rete di sicurezza usa comunque una ricerca su Google News RSS filtrata per dominio (`site:...`) — non è un'API ufficiale documentata, ma è stabile e non richiede chiavi. Nessuna configurazione richiesta: funziona già appena il workflow gira la prima volta su GitHub (da questo ambiente di sviluppo non è verificabile: la rete è filtrata).

Nella pagina "Fonti Cina" il pulsante **"Aggiorna ora dal browser"** rifà la stessa ricerca live, lato client, tramite un proxy CORS pubblico (`api.allorigins.win`) — comodo per un sito a uso personale, ma non pensato per molti visitatori contemporanei: resta un bonus, il workflow quotidiano è la fonte principale.

### Podcast quotidiano (richiede una chiave API)

Il podcast **non si attiva da solo**: serve una chiave API Gemini, gratuita, da impostare come secret del repository.

1. Crea una chiave su [Google AI Studio](https://aistudio.google.com/apikey) (account Google, nessuna carta di credito richiesta per il piano gratuito).
2. Nel repository GitHub: **Settings → Secrets and variables → Actions → New repository secret**, nome `GEMINI_API_KEY`, incolla la chiave.
3. Lancia manualmente il workflow una prima volta (**Actions → Update news feed (Fonti Cina) → Run workflow**) per generare subito il primo episodio, invece di aspettare il cron del giorno dopo.

Senza la chiave, `scripts/generate-podcast.mjs` si ferma da solo (lo vedi scritto nei log del workflow) senza bloccare l'aggiornamento dei titoli: il resto del sito funziona comunque.

**Nota sulla stabilità dell'API**: la generazione audio nativa di Gemini (`gemini-2.5-flash-preview-tts`) è un'area che cambia in fretta — nomi dei modelli e forma delle richieste possono variare. Se lo script smette di funzionare, la prima cosa da controllare è la [pagina ufficiale](https://ai.google.dev/gemini-api/docs/speech-generation) e aggiornare le costanti `TEXT_MODEL`/`TTS_MODEL` in cima a `scripts/generate-podcast.mjs`.

