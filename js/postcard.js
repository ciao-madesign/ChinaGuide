/* =====================================================================
   POSTCARD — card "taccuino" condivisa: mostra la foto reale se
   disponibile per una chiave (lezione/giorno), altrimenti l'illustrazione
   SVG generata. Gestisce anche mappe e infografiche di riferimento.
   ===================================================================== */
import { getIllustration } from './illustrations.js';
import { PHOTOS, PHOTOS_EXTRA } from './photos.js';

function frame(innerHtml, extraClass=''){
  const card = document.createElement('div');
  card.className = 'postcard' + (extraClass ? ' '+extraClass : '');
  card.innerHTML = `<div class="washi"></div>${innerHtml}`;
  return card;
}

function photoImg(photo, alt){
  return `<a href="${photo.src}" target="_blank" rel="noopener"><img src="${photo.src}" alt="${alt}" loading="lazy"></a>`;
}

/* card principale per una chiave lezione/giorno: foto reale se esiste, sennò SVG */
function illustrationCard(key, caption){
  const photo = PHOTOS[key];
  if(photo && photo.type==='map'){
    const card = frame(`${photoImg(photo, caption)}<div class="cap">${caption}</div><div class="credit">${photo.credit} · tocca per ingrandire</div>`, 'mapcard');
    return card;
  }
  if(photo && photo.type==='infographic'){
    const card = frame(`${photoImg(photo, caption)}<div class="cap">${caption}</div><div class="credit">${photo.credit} · tocca per ingrandire</div>`, 'infographic');
    return card;
  }
  if(photo){
    const card = frame(`${photoImg(photo, caption)}<div class="cap">${caption}</div><div class="credit">${photo.credit}</div>`);
    return card;
  }
  return frame(`${getIllustration(key)}<div class="cap">${caption}</div>`);
}

/* seconda foto opzionale per un giorno (PHOTOS_EXTRA), o null se non c'è */
function extraPhotoCard(dayIllustrationKey, caption){
  const photo = PHOTOS_EXTRA[dayIllustrationKey];
  if(!photo) return null;
  return frame(`${photoImg(photo, caption)}<div class="cap">${caption}</div><div class="credit">${photo.credit}</div>`);
}

/* card per una foto/mappa passata direttamente (non legata a una chiave lezione/giorno) */
function standaloneCard(photo, caption){
  const cls = photo.type==='map' ? 'mapcard' : (photo.type==='infographic' ? 'infographic' : '');
  return frame(`${photoImg(photo, caption)}<div class="cap">${caption}</div><div class="credit">${photo.credit} · tocca per ingrandire</div>`, cls);
}

export { illustrationCard, extraPhotoCard, standaloneCard };
