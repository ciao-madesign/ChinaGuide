#!/usr/bin/env node
/* =====================================================================
   generate-podcast.mjs — crea lo script e l'audio del podcast quotidiano
   di "Fonti Cina" a partire da data/news-feed.json, usando l'API Gemini
   (un'unica chiave: stesso GEMINI_API_KEY per testo e voce).

   ATTENZIONE SUGLI ENDPOINT: la generazione audio nativa di Gemini è
   un'area in evoluzione rapida — nomi dei modelli e forma esatta della
   richiesta possono cambiare. Se lo script smette di funzionare,
   controlla prima la pagina ufficiale:
   https://ai.google.dev/gemini-api/docs/speech-generation
   e aggiorna le costanti TEXT_MODEL / TTS_MODEL qui sotto.

   Se GEMINI_API_KEY non è impostata (secret non ancora configurato),
   lo script si ferma da solo senza errore: il resto del sito continua
   a funzionare, semplicemente senza podcast del giorno.
   ===================================================================== */
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { SOURCES } from '../js/data-sources.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FEED_PATH = join(__dirname, '..', 'data', 'news-feed.json');
const OUT_DIR = join(__dirname, '..', 'data', 'podcast');
const WAV_PATH = join(OUT_DIR, 'latest.wav');
const META_PATH = join(OUT_DIR, 'meta.json');

const API_KEY = process.env.GEMINI_API_KEY;
const TEXT_MODEL = 'gemini-2.5-flash';
const TTS_MODEL = 'gemini-2.5-flash-preview-tts';
const VOICES = { Marco: 'Puck', Giulia: 'Kore' };
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

function buildDigest(feed){
  const lines = [];
  for(const src of SOURCES){
    const entry = feed.sources?.[src.feedKey];
    if(entry?.status === 'ok' && entry.items.length){
      lines.push(`${src.name} (${src.type === 'off' ? 'ufficiale' : 'commerciale'}): ` +
        entry.items.slice(0, 3).map(it => it.title).join(' | '));
    }
  }
  if(feed.international?.status === 'ok' && feed.international.items.length){
    lines.push('Stampa internazionale sulla Cina: ' +
      feed.international.items.slice(0, 5).map(it => `${it.title}${it.source ? ' ('+it.source+')' : ''}`).join(' | '));
  }
  return lines.join('\n');
}

async function callGemini(model, body){
  const res = await fetch(`${API_BASE}/${model}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': API_KEY },
    body: JSON.stringify(body),
  });
  if(!res.ok){
    const text = await res.text().catch(() => '');
    throw new Error(`Gemini ${model} HTTP ${res.status}: ${text.slice(0, 300)}`);
  }
  return res.json();
}

async function writeScript(digest){
  const prompt = `Sei l'autore di un podcast quotidiano in italiano su "Fonti Cina", che riassume e contestualizza le notizie del giorno sulla Cina per un pubblico italiano colto ma non specialista.
Scrivi un copione a due voci, Marco e Giulia, che dialogano in modo naturale e scorrevole (non leggono un elenco): commentano, si fanno domande, aggiungono un minimo di contesto storico o culturale quando è utile. Tono informativo, equilibrato, senza sensazionalismo. Durata-bersaglio: circa 2 minuti di parlato (massimo 350 parole totali).
Usa SOLO questo formato, una battuta per riga, senza intestazioni, didascalie o markdown:
Marco: ...
Giulia: ...

Ecco i titoli di oggi, fonte per fonte:
${digest}`;

  const json = await callGemini(TEXT_MODEL, { contents: [{ parts: [{ text: prompt }] }] });
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if(!text) throw new Error('Risposta testo vuota da Gemini');
  return text.trim();
}

function pcmToWav(pcmBuffer, sampleRate, numChannels = 1, bitsPerSample = 16){
  const byteRate = sampleRate * numChannels * bitsPerSample / 8;
  const blockAlign = numChannels * bitsPerSample / 8;
  const dataSize = pcmBuffer.length;
  const buf = Buffer.alloc(44 + dataSize);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + dataSize, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(numChannels, 22); buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(byteRate, 28); buf.writeUInt16LE(blockAlign, 32); buf.writeUInt16LE(bitsPerSample, 34);
  buf.write('data', 36); buf.writeUInt32LE(dataSize, 40);
  pcmBuffer.copy(buf, 44);
  return buf;
}

async function synthesizeAudio(script){
  const body = {
    contents: [{ parts: [{ text: script }] }],
    generationConfig: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        multiSpeakerVoiceConfig: {
          speakerVoiceConfigs: Object.entries(VOICES).map(([speaker, voiceName]) => ({
            speaker,
            voiceConfig: { prebuiltVoiceConfig: { voiceName } },
          })),
        },
      },
    },
  };
  const json = await callGemini(TTS_MODEL, body);
  const part = json.candidates?.[0]?.content?.parts?.[0];
  const inline = part?.inlineData;
  if(!inline?.data) throw new Error('Nessun audio nella risposta Gemini TTS');
  const rateMatch = /rate=(\d+)/.exec(inline.mimeType || '');
  const sampleRate = rateMatch ? parseInt(rateMatch[1], 10) : 24000;
  const pcm = Buffer.from(inline.data, 'base64');
  return pcmToWav(pcm, sampleRate);
}

async function main(){
  if(!API_KEY){
    console.log('GEMINI_API_KEY non impostata: salto la generazione del podcast (nessun errore).');
    return;
  }

  let feed;
  try{
    feed = JSON.parse(await readFile(FEED_PATH, 'utf8'));
  }catch(e){
    console.log('data/news-feed.json non trovato o non leggibile: salto il podcast.');
    return;
  }

  const digest = buildDigest(feed);
  if(!digest){
    console.log('Nessun titolo disponibile nel feed: salto il podcast di oggi.');
    return;
  }

  try{
    console.log('Genero lo script del podcast con Gemini...');
    const script = await writeScript(digest);
    console.log('Script pronto, genero l\'audio...');
    const wav = await synthesizeAudio(script);

    await mkdir(OUT_DIR, { recursive: true });
    await writeFile(WAV_PATH, wav);
    await writeFile(META_PATH, JSON.stringify({
      date: new Date().toISOString(),
      script,
    }, null, 2) + '\n', 'utf8');
    console.log(`Podcast scritto in ${WAV_PATH} (${(wav.length/1024/1024).toFixed(2)} MB).`);
  }catch(err){
    console.log(`Generazione podcast non riuscita, nessun blocco del workflow: ${err.message}`);
  }
}

main().catch(err => {
  console.error('Errore imprevisto nello script podcast:', err);
  // non facciamo fallire il workflow per questo: il resto del sito non dipende dal podcast
  process.exit(0);
});
