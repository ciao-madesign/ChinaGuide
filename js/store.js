/* =====================================================================
   STORE — piccolo wrapper su localStorage per far "ricordare" il sito:
   lezioni completate, giorni vissuti, checklist, budget, partenza.
   ===================================================================== */

const NS = "cn-guide:";

function getJSON(key, fallback){
  try{
    const raw = localStorage.getItem(NS+key);
    return raw ? JSON.parse(raw) : fallback;
  }catch(e){ return fallback; }
}
function setJSON(key, value){
  try{ localStorage.setItem(NS+key, JSON.stringify(value)); }catch(e){ /* storage non disponibile */ }
}

export const store = {
  completedLessons: ()=> new Set(getJSON('completedLessons', [])),
  markLessonDone(key){
    const s = this.completedLessons(); s.add(key); setJSON('completedLessons', [...s]);
  },
  finalQuizDone: ()=> getJSON('finalQuizDone', false),
  markFinalQuizDone(){ setJSON('finalQuizDone', true); },

  visitedDays: ()=> new Set(getJSON('visitedDays', [])),
  toggleDayVisited(key){
    const s = this.visitedDays();
    if(s.has(key)) s.delete(key); else s.add(key);
    setJSON('visitedDays', [...s]);
    return s.has(key);
  },

  checklistState: ()=> getJSON('checklist', {}),
  setChecklistItem(id, checked){
    const st = this.checklistState(); st[id]=checked; setJSON('checklist', st);
  },

  budgetSettings: ()=> getJSON('budgetSettings', {persons:1, contingency:12}),
  setBudgetSettings(v){ setJSON('budgetSettings', v); },

  departureDate: ()=> getJSON('departureDate', null),
  setDepartureDate(v){ setJSON('departureDate', v); },

  dayNote(key){ return getJSON('note:'+key, {booking:'', notes:''}); },
  setDayNote(key, field, value){
    const n = this.dayNote(key); n[field]=value; setJSON('note:'+key, n);
  },
  generalNotes: ()=> getJSON('generalNotes', ''),
  setGeneralNotes(v){ setJSON('generalNotes', v); },
};

export function debounce(fn, ms){
  let t;
  return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), ms); };
}
