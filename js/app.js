import { store } from './store.js';
import { lessons } from './data-course.js';
import { days, closing } from './data-guide.js';
import * as Home from './render-home.js';
import * as Course from './render-course.js';
import * as Guide from './render-guide.js';
import * as Tools from './render-tools.js';

const mainEl = document.getElementById('main');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay-backdrop');
const hamburger = document.getElementById('hamburger');

const TOOL_KEYS = [
  ['frasario','Frasario'], ['checklist','Checklist'], ['budget','Budget'],
  ['glossario','Glossario'], ['meteo','Meteo'], ['contatti','Contatti utili'],
];

function routeToHash(route){ return '#/' + route.split(':').join('/'); }
function hashToRoute(){
  const h = location.hash.replace(/^#\/?/, '');
  return h ? h.split('/').join(':') : 'home';
}

let currentRoute = 'home';

function navigate(route){
  location.hash = routeToHash(route);
  if(hashToRoute() === currentRoute) renderRoute();
  closeDrawer();
  window.scrollTo(0,0);
}
window.__reRender = ()=> renderRoute();

function navSection(title){
  const div = document.createElement('div'); div.className='navsection'; div.textContent=title;
  return div;
}
function navButton({label, num, active, done, flag}){
  const li = document.createElement('li');
  const btn = document.createElement('button');
  if(active) btn.className='active';
  let html='';
  if(num!=null) html += `<span class="num">${num}</span>`;
  html += `<span class="lbl">${label}</span>`;
  if(flag) html += `<span class="flag">⚠</span>`;
  else if(done!==undefined) html += `<span class="stamp-dot ${done?'done':''}">✓</span>`;
  btn.innerHTML = html;
  li.appendChild(btn);
  return {li, btn};
}

function buildNav(){
  const introList = document.getElementById('navlist-home');
  introList.innerHTML='';
  const {li,btn} = navButton({label:'Home', active: currentRoute==='home'});
  btn.onclick = ()=> navigate('home');
  introList.appendChild(li);

  // corso
  const corsoList = document.getElementById('navlist-corso');
  corsoList.innerHTML='';
  const doneLessons = store.completedLessons();
  lessons.forEach((l,i)=>{
    const {li,btn} = navButton({label:l.title, num:String(i+1).padStart(2,'0'), active: currentRoute===`corso:${i}`, done: doneLessons.has(l.key)});
    btn.onclick = ()=> navigate(`corso:${i}`);
    corsoList.appendChild(li);
  });
  const {li:qli, btn:qbtn} = navButton({label:'Quiz finale', num:'◆', active: currentRoute==='corso:quiz', done: store.finalQuizDone()});
  qbtn.onclick = ()=> navigate('corso:quiz');
  corsoList.appendChild(qli);

  // guida
  const guidaList = document.getElementById('navlist-guida');
  guidaList.innerHTML='';
  const gPanor = navButton({label:'Panoramica', active: currentRoute==='guida'});
  gPanor.btn.onclick = ()=> navigate('guida'); guidaList.appendChild(gPanor.li);
  const gIntro = navButton({label:'Prima di partire', active: currentRoute==='guida:intro'});
  gIntro.btn.onclick = ()=> navigate('guida:intro'); guidaList.appendChild(gIntro.li);
  const visited = store.visitedDays();
  days.forEach((d,i)=>{
    const {li,btn} = navButton({label:d.nav, num:String(d.num).padStart(2,'0'), active: currentRoute===`guida:day:${i}`, flag: !!d.flag, done: visited.has(d.key)});
    btn.onclick = ()=> navigate(`guida:day:${i}`);
    guidaList.appendChild(li);
  });
  closing.forEach((c,i)=>{
    const {li,btn} = navButton({label:c.title, active: currentRoute===`guida:close:${i}`});
    btn.onclick = ()=> navigate(`guida:close:${i}`);
    guidaList.appendChild(li);
  });

  // strumenti
  const toolsList = document.getElementById('navlist-strumenti');
  toolsList.innerHTML='';
  TOOL_KEYS.forEach(([key,label])=>{
    const {li,btn} = navButton({label, active: currentRoute===`strumenti:${key}`});
    btn.onclick = ()=> navigate(`strumenti:${key}`);
    toolsList.appendChild(li);
  });
}
window.__buildNav = buildNav;

function renderRoute(){
  currentRoute = hashToRoute();
  buildNav();
  mainEl.innerHTML='';
  if(currentRoute==='home') return Home.render(mainEl, navigate);
  if(currentRoute.startsWith('corso')) return Course.render(mainEl, currentRoute, navigate);
  if(currentRoute.startsWith('guida')) return Guide.render(mainEl, currentRoute, navigate);
  if(currentRoute.startsWith('strumenti')) return Tools.render(mainEl, currentRoute, navigate);
  Home.render(mainEl, navigate);
}

function openDrawer(){ sidebar.classList.add('open'); overlay.classList.add('open'); }
function closeDrawer(){ sidebar.classList.remove('open'); overlay.classList.remove('open'); }
hamburger.onclick = ()=> sidebar.classList.contains('open') ? closeDrawer() : openDrawer();
overlay.onclick = closeDrawer;

window.addEventListener('hashchange', renderRoute);
renderRoute();
