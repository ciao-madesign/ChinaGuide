# 中国路 — Corso e guida di viaggio in Cina

Sito statico, interamente illustrato in stile "taccuino di viaggio", che unisce:

- **Corso di preparazione** — 10 lezioni con quiz su geografia, storia, filosofia, cucina, lingua e usi cinesi.
- **Guida di viaggio** — itinerario dettagliato di 13 giorni, giorno per giorno, con trasporti, biglietti, budget, e per ogni tappa sia una mappa illustrata sia una mappa reale interattiva.
- **Strumenti** — frasario cinese-italiano, checklist pre-partenza interattiva, calcolatore di budget, glossario culturale, riepilogo meteo e contatti utili.
- **Fonti Cina** (`fonticina.html`) — pagina autonoma e separata dal taccuino (layout proprio, niente sidebar, raggiungibile con un tasto di andata/ritorno), stile feed di testate con badge colorati invece di blocchi di testo: le 8 principali testate cinesi, titoli aggiornati automaticamente ogni giorno, una sezione di notizie internazionali sulla Cina, e un podcast quotidiano generato con l'IA. Vedi [sotto](#fonti-cina--notizie-e-podcast) per l'attivazione.

## Tecnologia

Nessun framework, nessun build step: HTML/CSS/JS "vanilla" con ES module. Le uniche dipendenze esterne sono i Google Fonts e [Leaflet](https://leafletjs.com/) (per le mappe reali, con tile OpenStreetMap). Tutte le illustrazioni sono generate via SVG/JS in `js/illustrations.js` — nessuna immagine esterna caricata.

I progressi (lezioni completate, giorni "vissuti", checklist, budget, data di partenza) vengono salvati in `localStorage`, quindi restano solo sul dispositivo/browser usato.

## Struttura

```
index.html              shell del taccuino (corso + guida + strumenti), nav e mount point
fonticina.html           pagina autonoma del portale "Fonti Cina" — layout proprio, non fa parte del router del taccuino
css/style.css            design system "taccuino": carta, inchiostro, acquerelli
css/news.css             design system di "Fonti Cina": data-first, feed a card, chiaro/scuro
js/data-course.js        contenuti delle 10 lezioni + quiz finale
js/data-guide.js         contenuti dei 13 giorni + intro + chiusura
js/data-tools.js         frasario, checklist, glossario, contatti, meteo
js/illustrations.js      libreria di illustrazioni SVG generate via codice
js/maps.js               mappe: schizzo illustrato + mappa reale (Leaflet)
js/store.js              persistenza in localStorage
js/render-*.js           rendering delle varie sezioni del taccuino
js/app.js                router (hash-based) e navigazione del taccuino
js/gate.js               parola d'ordine di accesso (riusata identica da index.html e fonticina.html)
js/data-sources.js       le 8 testate di "Fonti Cina" + giro di lettura quotidiano
js/feed-parser.js        parsing RSS/Atom condiviso tra script Node e browser
js/render-news.js        logica del portale "Fonti Cina" (si avvia da sola dentro fonticina.html)
scripts/fetch-news.mjs   scarica titoli + testo trascritto degli articoli (eseguito dal workflow quotidiano)
scripts/generate-podcast.mjs  genera script podcast + report del giorno + audio (richiede GEMINI_API_KEY)
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

Nella pagina "Fonti Cina" il pulsante **"Aggiorna ora dal browser"** rifà la stessa ricerca live, lato client, tramite un proxy CORS pubblico (`api.allorigins.win`) — comodo per un sito a uso personale, ma non pensato per molti visitatori contemporanei: resta un bonus, il workflow quotidiano è la fonte principale. Ogni richiesta ha un timeout (il proxy pubblico a volte non risponde) così il pulsante non resta mai bloccato.

### Testo degli articoli trascritto

Per le notizie generate dal workflow quotidiano (non per il refresh live dal browser), `scripts/fetch-news.mjs` scarica anche la pagina di ogni articolo e ne estrae euristicamente il testo leggibile (senza dipendenze esterne: toglie script/stili/nav/header/footer, preferisce il contenuto dentro `<article>`, tiene i paragrafi `<p>` abbastanza lunghi da essere testo vero). Il risultato è salvato nel campo `text` di ogni notizia in `data/news-feed.json` e mostrato espandendo la card nella pagina — si legge senza uscire dal sito, con il link all'originale sempre presente come rete di sicurezza.

È un'estrazione euristica, non garantita: siti con contenuto reso via JavaScript o paywall spesso non restituiscono nulla di utile, e in quel caso la card mostra solo "testo non disponibile" più il link. Nota anche che si tratta di ripubblicare contenuti di terzi — accettabile qui perché il sito è privato, protetto da parola d'ordine e a uso personale, non per un sito pubblico.

### Podcast quotidiano e report del giorno (richiedono una chiave API)

Il podcast **non si attiva da solo**: serve una chiave API Gemini, gratuita, da impostare come secret del repository.

1. Crea una chiave su [Google AI Studio](https://aistudio.google.com/apikey) (account Google, nessuna carta di credito richiesta per il piano gratuito).
2. Nel repository GitHub: **Settings → Secrets and variables → Actions → New repository secret**, nome `GEMINI_API_KEY`, incolla la chiave.
3. Lancia manualmente il workflow una prima volta (**Actions → Update news feed (Fonti Cina) → Run workflow**) per generare subito il primo episodio, invece di aspettare il cron del giorno dopo.

La stessa chiamata a Gemini che scrive il copione del podcast (due voci, Marco e Giulia, 2-3 minuti di parlato) produce anche un breve **report testuale** del giorno (5-7 punti), mostrato nella colonna laterale della pagina per un'overview rapida senza dover scorrere tutto il feed. Entrambi vengono da `data/podcast/meta.json` (campi `script` e `report`).

Senza la chiave, `scripts/generate-podcast.mjs` si ferma da solo (lo vedi scritto nei log del workflow) senza bloccare l'aggiornamento dei titoli: il resto del sito funziona comunque, solo senza podcast né report.

**Nota sulla stabilità dell'API**: i nomi dei modelli Gemini cambiano spesso. `TEXT_MODEL` usa l'alias "rolling" `gemini-flash-latest` apposta per non dover rincorrere ogni nuovo punto release a mano (un punto release specifico come `gemini-3.8-flash`, provato durante lo sviluppo, ha dato HTTP 503 "alta domanda" in 4 run reali su 5 — probabile scarsa capacità perché appena uscito). Se un modello smette di funzionare: `node scripts/list-gemini-models.mjs` (con `GEMINI_API_KEY` impostata) interroga l'API vera e stampa i modelli realmente disponibili con quella chiave — fonte affidabile, a differenza di una ricerca web, che su questo ha dato più volte nomi non verificabili o sbagliati. In alternativa, l'errore HTTP nei log del workflow spesso indica già il sostituto. Aggiorna le costanti `TEXT_MODEL`/`TTS_MODEL` in cima a `scripts/generate-podcast.mjs`; la pagina ufficiale (https://ai.google.dev/gemini-api/docs/speech-generation) resta il riferimento per cambi più sostanziali alla forma della richiesta.

