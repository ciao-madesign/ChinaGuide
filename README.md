# 中国路 — Corso e guida di viaggio in Cina

Sito statico, interamente illustrato in stile "taccuino di viaggio", che unisce:

- **Corso di preparazione** — 10 lezioni con quiz su geografia, storia, filosofia, cucina, lingua e usi cinesi.
- **Guida di viaggio** — itinerario dettagliato di 13 giorni, giorno per giorno, con trasporti, biglietti, budget, e per ogni tappa sia una mappa illustrata sia una mappa reale interattiva.
- **Strumenti** — frasario cinese-italiano, checklist pre-partenza interattiva, calcolatore di budget, glossario culturale, riepilogo meteo e contatti utili.

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
```

## Sviluppo locale

Basta servire la cartella con un qualsiasi server statico, ad esempio:

```
python3 -m http.server 8080
```

poi apri `http://localhost:8080`.

## Deploy

Il workflow `.github/workflows/deploy.yml` pubblica automaticamente il sito su GitHub Pages ad ogni push su `main`. Se non è già attivo, vai su **Settings → Pages** del repository e imposta la sorgente su **GitHub Actions** (operazione da fare una sola volta).
