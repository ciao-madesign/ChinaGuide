#!/usr/bin/env node
/* =====================================================================
   list-gemini-models.mjs — utility diagnostica, non fa parte della
   pipeline quotidiana. Elenca i modelli Gemini realmente disponibili
   con la chiave configurata (fonte autorevole: l'API stessa, non
   ricerche web che possono riportare nomi di modelli inventati o
   deprecati). Utile quando generate-podcast.mjs smette di funzionare
   e serve capire quale TEXT_MODEL/TTS_MODEL usare.

   Uso: GEMINI_API_KEY=... node scripts/list-gemini-models.mjs
   ===================================================================== */
const API_KEY = process.env.GEMINI_API_KEY;
if(!API_KEY){
  console.error('GEMINI_API_KEY non impostata.');
  process.exit(1);
}

const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
if(!res.ok){
  console.error(`HTTP ${res.status}: ${await res.text()}`);
  process.exit(1);
}
const { models = [] } = await res.json();

console.log(`${models.length} modelli totali.\n`);
console.log('--- Modelli con generateContent (testo) ---');
models
  .filter(m => (m.supportedGenerationMethods || []).includes('generateContent'))
  .forEach(m => console.log(`${m.name.replace('models/', '')}  —  ${m.displayName || ''}`));

console.log('\n--- Modelli con "tts" o "speech" nel nome ---');
models
  .filter(m => /tts|speech/i.test(m.name))
  .forEach(m => console.log(`${m.name.replace('models/', '')}  —  ${m.displayName || ''}  —  metodi: ${(m.supportedGenerationMethods || []).join(', ')}`));
