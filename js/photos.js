/* =====================================================================
   PHOTOS — foto reali caricate in /img, abbinate a lezioni e giorni.
   Dove non c'è una foto reale pertinente, resta l'illustrazione SVG.
   type: 'photo' (ritaglio evocativo) | 'map' (mappa leggibile, contain)
         | 'infographic' (grafico alto, larghezza contenuta)
   ===================================================================== */

export const PHOTOS = {
  'day-2': {src:'img/Temple_of_Heaven_20160323_01.jpg', credit:'Tempio del Cielo, Pechino', type:'photo'},
  'day-3': {src:'img/muro-pietra-lago-montagne-verdi.webp', credit:'La Grande Muraglia tra i monti', type:'photo'},
  'day-5': {src:'img/vette-rocciose-pini-nebbia-nuvole.webp', credit:'Vette nella nebbia, area del Monte Emei', type:'photo'},
  'day-6': {src:'img/panda-gigante-roccia-recinto.webp', credit:'Panda gigante, Chengdu', type:'photo'},
  'day-7': {src:'img/strada-tortuosa-montagne-tornanti.webp', credit:'La strada delle 99 curve, Tianmen Mountain', type:'photo'},
  'day-8': {src:'img/paesaggio-formazioni-rocciose-pilastro-vegetazione.webp', credit:'I pilastri di arenaria di Zhangjiajie', type:'photo'},
  'day-9': {src:'img/furongzhen-hunan-china.avif', credit:'Furong, il villaggio sulla cascata', type:'photo'},
  'day-10': {src:'img/cappelli-conici-barche-fiume-villaggio-pagoda.webp', credit:'Fenghuang, lungo il fiume Tuojiang', type:'photo'},
  'day-11': {src:'img/shanghai-immagini.webp', credit:'Skyline di Pudong, Shanghai', type:'photo'},
  'day-12': {src:'img/pagoda-cinese-lago-barche-citta.webp', credit:'Padiglioni e lago, Shanghai', type:'photo'},
  'lesson-1': {src:'img/china_physical_map.gif', credit:'Mappa fisica della Cina', type:'map'},
  'lesson-1b': {src:'img/china-map.jpg', credit:'La Cina e i paesi confinanti', type:'map'},
  'lesson-2b': {src:'img/china-timeline.jpg', credit:'Storia della Cina, dalle dinastie alla Repubblica Popolare', type:'infographic'},
  'lesson-5': {src:'img/chengdu.png', credit:'Chengdu, skyline contemporaneo', type:'photo'},
  'gallery-wall': {src:'img/muro-pietra-lago-montagne-verdi.webp', credit:'Grande Muraglia', type:'photo'},
  'gallery-panda': {src:'img/panda-gigante-roccia-recinto.webp', credit:'Panda gigante', type:'photo'},
};

/* seconda foto per alcuni giorni, mostrata dopo la mappa */
export const PHOTOS_EXTRA = {
  'day-8': {src:'img/barche-lago-montagne-nebbiose.webp', credit:'Baofeng Lake, nel cuore del parco di Zhangjiajie'},
  'day-10': {src:'img/palafitte-pagoda-illuminate-fiume-notte.webp', credit:'Fenghuang al tramonto, lungo il Tuojiang'},
};

export const OVERVIEW_MAP_PHOTO = {src:'img/china-province-map-700.jpg', credit:'Mappa amministrativa delle province cinesi', type:'map'};
