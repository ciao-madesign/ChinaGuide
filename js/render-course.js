import { lessons, finalQuiz } from './data-course.js';
import { sealStampSvg } from './illustrations.js';
import { illustrationCard } from './postcard.js';
import { store } from './store.js';

function el(tag, cls, html){ const e=document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; }

function watermark(char){
  const d = document.createElement('div');
  d.className='cn-watermark';
  d.textContent = char;
  return d;
}
function eyebrowRow(text, stampChar){
  const row = document.createElement('div');
  row.className='eyebrow-row';
  row.innerHTML = `${sealStampSvg(stampChar)}<p class="eyebrow">${text}</p>`;
  return row;
}

function renderQuizBlock(questions, headTitle, onSubmit){
  const wrap = document.createElement('div');
  wrap.className = 'quiz-block';

  const head = document.createElement('div');
  head.className = 'quiz-head';
  head.innerHTML = `<h3>${headTitle}</h3><span class="score" id="score-label"></span>`;
  wrap.appendChild(head);

  questions.forEach((qq,qi)=>{
    const card = document.createElement('div');
    card.className='q-card';
    card.innerHTML = `<p class="q-text">${qi+1}. ${qq.q}</p>`;
    const optsWrap = document.createElement('div');
    qq.opts.forEach((opt,oi)=>{
      const label = document.createElement('label');
      label.className='opt';
      label.innerHTML = `<input type="radio" name="q${qi}" value="${oi}"> <span>${opt}</span>`;
      optsWrap.appendChild(label);
    });
    card.appendChild(optsWrap);
    const explain = document.createElement('div');
    explain.className='explain';
    explain.textContent = qq.e;
    card.appendChild(explain);
    wrap.appendChild(card);
  });

  const actions = document.createElement('div');
  actions.className='quiz-actions';
  const submitBtn = document.createElement('button');
  submitBtn.className='primary';
  submitBtn.textContent='Verifica risposte';
  const retryBtn = document.createElement('button');
  retryBtn.className='ghost';
  retryBtn.textContent='Riprova';
  retryBtn.style.display='none';
  actions.appendChild(submitBtn);
  actions.appendChild(retryBtn);
  wrap.appendChild(actions);

  const banner = document.createElement('div');
  banner.className='result-banner';
  wrap.appendChild(banner);

  submitBtn.onclick = ()=>{
    let correct = 0;
    const cards = wrap.querySelectorAll('.q-card');
    let allAnswered = true;
    cards.forEach((card,qi)=>{
      const selected = card.querySelector('input:checked');
      if(!selected){ allAnswered=false; return; }
      const val = parseInt(selected.value);
      const opts = card.querySelectorAll('.opt');
      opts.forEach((o,oi)=>{
        o.querySelector('input').disabled = true;
        if(oi===questions[qi].c) o.classList.add('correct');
        else if(oi===val) o.classList.add('wrong');
      });
      card.querySelector('.explain').classList.add('show');
      if(val===questions[qi].c) correct++;
    });
    if(!allAnswered){
      banner.textContent = 'Rispondi a tutte le domande prima di verificare.';
      banner.className = 'result-banner show fail';
      return;
    }
    const pct = Math.round(correct/questions.length*100);
    banner.textContent = `Punteggio: ${correct}/${questions.length} (${pct}%)`;
    banner.className = 'result-banner show ' + (pct>=60?'pass':'fail');
    submitBtn.style.display='none';
    retryBtn.style.display='inline';
    if(onSubmit) onSubmit(correct, questions.length);
  };

  retryBtn.onclick = ()=>{ if(window.__reRender) window.__reRender(); };

  return wrap;
}

function renderLesson(mainEl, idx, navigate){
  const l = lessons[idx];
  mainEl.appendChild(watermark(String(idx+1).padStart(2,'0')));
  mainEl.appendChild(eyebrowRow(l.eyebrow, String(idx+1)));
  mainEl.appendChild(el('h2','title display',l.title));
  mainEl.appendChild(el('p','subtitle',l.subtitle));

  mainEl.appendChild(illustrationCard(l.illustration, l.subtitle));

  const sectionEl = document.createElement('div');
  sectionEl.className='section';
  l.sections.forEach((s,si)=>{
    const h3=document.createElement('h3'); h3.textContent=s.h;
    const p=document.createElement('p'); p.textContent=s.p;
    sectionEl.appendChild(h3); sectionEl.appendChild(p);
    if(si===2 && l.illustration2){
      sectionEl.appendChild(illustrationCard(l.illustration2, s.h));
    }
  });
  mainEl.appendChild(sectionEl);

  if(l.trivia){
    const trivia = document.createElement('div');
    trivia.className='callout trivia';
    trivia.innerHTML = `<span class="lbl">✦ Curiosità</span>${l.trivia}`;
    mainEl.appendChild(trivia);
  }

  if(l.callout){
    const callout = document.createElement('div');
    callout.className='callout';
    callout.innerHTML = `<span class="lbl">Per il tuo viaggio</span>${l.callout}`;
    mainEl.appendChild(callout);
  }

  mainEl.appendChild(el('div','divider-brush'));

  const quizEl = renderQuizBlock(l.quiz, `Verifica — ${l.title}`, ()=>{
    store.markLessonDone(l.key);
    if(window.__buildNav) window.__buildNav();
  });
  mainEl.appendChild(quizEl);

  const footNav = document.createElement('div');
  footNav.className='footer-nav';
  const prevBtn = document.createElement('button');
  prevBtn.textContent = '← Lezione precedente';
  prevBtn.disabled = idx===0;
  prevBtn.onclick = ()=>{ navigate(idx===0?'corso':`corso:${idx-1}`); };
  const nextBtn = document.createElement('button');
  nextBtn.textContent = idx===lessons.length-1 ? 'Vai al quiz finale →' : 'Lezione successiva →';
  nextBtn.onclick = ()=>{ navigate(idx===lessons.length-1 ? 'corso:quiz' : `corso:${idx+1}`); };
  footNav.appendChild(prevBtn); footNav.appendChild(nextBtn);
  mainEl.appendChild(footNav);
}

function renderFinalQuiz(mainEl){
  mainEl.appendChild(watermark('終'));
  mainEl.appendChild(eyebrowRow('Verifica finale', '終'));
  mainEl.appendChild(el('h2','title display','Quiz conclusivo'));
  mainEl.appendChild(el('p','subtitle',`${finalQuiz.length} domande su tutte le lezioni — pensato per verificare se sei pronto a partire.`));

  const done = store.completedLessons().size;
  const note = document.createElement('p');
  note.className='mono';
  note.style.cssText='font-size:12px;color:var(--ink-faint);margin-bottom:22px;';
  note.textContent = `Lezioni completate: ${done}/${lessons.length}`;
  mainEl.appendChild(note);

  const quizEl = renderQuizBlock(finalQuiz, 'Domande finali', ()=>{
    store.markFinalQuizDone();
    if(window.__buildNav) window.__buildNav();
  });
  mainEl.appendChild(quizEl);
}

function renderCourseIndex(mainEl, navigate){
  mainEl.appendChild(watermark('課'));
  mainEl.appendChild(eyebrowRow('Corso di preparazione', '課'));
  mainEl.appendChild(el('h2','title display','10 lezioni per capire la Cina'));
  mainEl.appendChild(el('p','subtitle','Storia, filosofia, lingua, cibo e usi — tutto quello che rende un viaggio in Cina più ricco di senso.'));

  const grid = document.createElement('div');
  grid.className='gallery compact';
  lessons.forEach(l=> grid.appendChild(illustrationCard(l.illustration, l.title)));
  mainEl.appendChild(grid);

  const list = document.createElement('div');
  list.className='section';
  const ul = document.createElement('ul');
  lessons.forEach((l,i)=>{
    const li = document.createElement('li');
    const done = store.completedLessons().has(l.key);
    li.innerHTML = `<a href="#/corso/${i}" style="text-decoration:none;color:var(--seal-dim);font-weight:600;">${l.eyebrow} — ${l.title}</a> ${done?'<span style="color:var(--jade);">✓ completata</span>':''}`;
    ul.appendChild(li);
  });
  list.appendChild(ul);
  mainEl.appendChild(list);

  const btn = document.createElement('button');
  btn.className='primary';
  btn.textContent='Comincia dalla Lezione 1 →';
  btn.onclick = ()=> navigate('corso:0');
  mainEl.appendChild(btn);
}

function render(mainEl, route, navigate){
  mainEl.innerHTML='';
  if(route==='corso') return renderCourseIndex(mainEl, navigate);
  if(route==='corso:quiz') return renderFinalQuiz(mainEl);
  const idx = parseInt(route.split(':')[1]);
  if(!isNaN(idx) && lessons[idx]) return renderLesson(mainEl, idx, navigate);
  renderCourseIndex(mainEl, navigate);
}

export { render, lessons };
