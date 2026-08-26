/* =====================================================================
   NOTEBOX — il "planner": appunti personali (prenotazioni, esperienze)
   agganciati a un giorno della guida, più le note generali di viaggio.
   Salvataggio automatico su localStorage tramite store.js.
   ===================================================================== */
import { store, debounce } from './store.js';

function flashSaved(flagEl){
  flagEl.textContent = '✓ salvato';
  flagEl.classList.add('show');
  clearTimeout(flagEl.__t);
  flagEl.__t = setTimeout(()=> flagEl.classList.remove('show'), 1400);
}

function buildDayNoteBox(dayKey, dayLabel){
  const note = store.dayNote(dayKey);
  const box = document.createElement('div');
  box.className='notebox';
  box.innerHTML = `
    <div class="notehead">
      <h4>I miei appunti — ${dayLabel}</h4>
      <span class="save-flag mono">✓ salvato</span>
    </div>
    <label>Prenotazioni (hotel, treni, voli, esperienze)</label>
    <textarea data-f="booking" placeholder="Es. Hotel Beijing Courtyard — conferma #4471, check-in 15:00…">${note.booking}</textarea>
    <label>Note ed esperienze</label>
    <textarea data-f="notes" placeholder="Es. Ristorante consigliato dal receptionist, tavolo per due, prenotare la sera prima…">${note.notes}</textarea>
  `;
  const flag = box.querySelector('.save-flag');
  box.querySelectorAll('textarea').forEach(ta=>{
    const save = ()=>{ store.setDayNote(dayKey, ta.dataset.f, ta.value); flashSaved(flag); };
    ta.addEventListener('input', debounce(save, 500));
    ta.addEventListener('blur', save);
  });
  return box;
}

function buildGeneralNoteBox(){
  const box = document.createElement('div');
  box.className='notebox';
  box.innerHTML = `
    <div class="notehead">
      <h4>Note generali di viaggio</h4>
      <span class="save-flag mono">✓ salvato</span>
    </div>
    <label>Voli internazionali, visto, assicurazione, numeri utili…</label>
    <textarea data-f="general" placeholder="Es. Volo AZ xxx Roma–Pechino 14:20, polizza assicurativa n. …">${store.generalNotes()}</textarea>
  `;
  const flag = box.querySelector('.save-flag');
  const ta = box.querySelector('textarea');
  const save = ()=>{ store.setGeneralNotes(ta.value); flashSaved(flag); };
  ta.addEventListener('input', debounce(save, 500));
  ta.addEventListener('blur', save);
  return box;
}

export { buildDayNoteBox, buildGeneralNoteBox };
