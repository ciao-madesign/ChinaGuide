/* =====================================================================
   DATI — "Fonti Cina": le 8 testate.
   feedKey fa corrispondere ogni fonte alla chiave in data/news-feed.json
   (generato dal workflow GitHub Actions scripts/fetch-news.mjs).
   ===================================================================== */

export const SOURCES = [
  {feedKey:"xinhua", hz:"新华社", name:"Xinhua", type:"off", topic:"Attualità nazionale",
   desc:"Agenzia di stampa nazionale: politica, economia, società, diplomazia. La fonte di riferimento per la narrativa ufficiale.",
   links:[["中文","https://www.news.cn/","zh"],["EN","https://english.news.cn/","en"]]},
  {feedKey:"peoplesdaily", hz:"人民日报", name:"People's Daily", type:"off", topic:"Politica e governo",
   desc:"Quotidiano del Partito Comunista. Utile per capire priorità politiche, decisioni di governo e orientamento ideologico.",
   links:[["中文","http://www.people.com.cn/","zh"],["EN","http://en.people.cn/","en"]]},
  {feedKey:"cctv", hz:"央视新闻", name:"CCTV News", type:"off", topic:"Notiziari e video",
   desc:"Televisione nazionale: telegiornali, conferenze stampa, dirette. Buona per l'ascolto del mandarino.",
   links:[["中文","https://news.cctv.com/","zh"]]},
  {feedKey:"chinadaily", hz:"中国日报", name:"China Daily", type:"off", topic:"Quotidiano in inglese",
   desc:"Tra i media cinesi più accessibili a un lettore internazionale: politica, economia, tecnologia, cultura.",
   links:[["EN","https://www.chinadaily.com.cn/","en"]]},
  {feedKey:"caixin", hz:"财新", name:"Caixin", type:"com", topic:"Economia e società",
   desc:"Giornalismo economico e d'inchiesta: lavoro, finanza, industria, trasformazioni sociali. Alcuni articoli a pagamento.",
   links:[["中文","https://www.caixin.com/","zh"],["EN","https://www.caixinglobal.com/","en"]]},
  {feedKey:"thepaper", hz:"澎湃新闻", name:"The Paper", type:"com", topic:"Cronaca e attualità",
   desc:"Testata digitale di Shanghai: attualità, società, cultura, cronaca. Un buon ingresso nell'informazione online cinese.",
   links:[["中文","https://www.thepaper.cn/","zh"]]},
  {feedKey:"sixthtone", hz:"第六声", name:"Sixth Tone", type:"com", topic:"Società e cultura",
   desc:"Del Shanghai United Media Group. Storie di persone comuni, istruzione, vita quotidiana.",
   links:[["EN","https://www.sixthtone.com/","en"]]},
  {feedKey:"globaltimes", hz:"环球时报", name:"Global Times", type:"off", topic:"Geopolitica",
   desc:"Relazioni internazionali e rapporti con USA ed Europa, con linea nazionalista dichiarata.",
   links:[["中文","https://www.huanqiu.com/","zh"],["EN","https://www.globaltimes.cn/","en"]]},
];
