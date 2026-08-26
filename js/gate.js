/* =====================================================================
   GATE — parola d'ordine per l'accesso al sito.
   Non è un vero login: tutto gira lato client, senza backend. Serve solo
   a tenere fuori i visitatori casuali, non è una misura di sicurezza
   reale (chiunque guardi il codice sorgente con impegno può aggirarla).
   La password non è salvata in chiaro: viene confrontata via hash SHA-256.
   ===================================================================== */

const PASSWORD_HASH = 'e074eace39f5963718f39075892e855f0ffd34704f9805d3faa37c2403d80386';

async function sha256(text){
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,'0')).join('');
}

const gate = document.getElementById('gate');
if(gate){
  const form = document.getElementById('gate-form');
  const input = document.getElementById('gate-pw');
  const error = document.getElementById('gate-error');

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    let hash;
    try{
      hash = await sha256(input.value.trim().toLowerCase());
    }catch(err){
      error.textContent = 'Questo browser non supporta il controllo — prova con uno più recente.';
      error.classList.add('show');
      return;
    }
    if(hash === PASSWORD_HASH){
      try{ localStorage.setItem('cn-guide:unlocked','true'); }catch(e){}
      gate.classList.add('unlocking');
      setTimeout(()=>{ gate.style.display='none'; }, 380);
    } else {
      error.classList.add('show');
      gate.querySelector('.gate-card').classList.remove('shake');
      void gate.offsetWidth;
      gate.querySelector('.gate-card').classList.add('shake');
      input.value='';
      input.focus();
    }
  });
}
