/* =====================================================================
   DATI — Strumenti (frasario, checklist, glossario, contatti)
   ===================================================================== */

export const phrasebook = [
  {cat:"Base", cn:"你好", py:"Nǐ hǎo", it:"Ciao"},
  {cat:"Base", cn:"谢谢", py:"Xièxie", it:"Grazie"},
  {cat:"Base", cn:"不客气", py:"Bú kèqi", it:"Prego"},
  {cat:"Base", cn:"对不起", py:"Duìbuqǐ", it:"Scusa / mi dispiace"},
  {cat:"Base", cn:"再见", py:"Zàijiàn", it:"Arrivederci"},
  {cat:"Base", cn:"是 / 不是", py:"Shì / bú shì", it:"Sì / no"},
  {cat:"Base", cn:"我不懂", py:"Wǒ bù dǒng", it:"Non capisco"},
  {cat:"Base", cn:"你会说英语吗？", py:"Nǐ huì shuō Yīngyǔ ma?", it:"Parli inglese?"},
  {cat:"Ristorante", cn:"这个多少钱？", py:"Zhège duōshao qián?", it:"Quanto costa questo?"},
  {cat:"Ristorante", cn:"菜单", py:"Càidān", it:"Il menù"},
  {cat:"Ristorante", cn:"微辣 / 不辣", py:"Wēi là / bú là", it:"Poco piccante / non piccante"},
  {cat:"Ristorante", cn:"买单", py:"Mǎidān", it:"Il conto, per favore"},
  {cat:"Ristorante", cn:"我吃素", py:"Wǒ chī sù", it:"Sono vegetariano/a"},
  {cat:"Ristorante", cn:"好吃", py:"Hǎochī", it:"Buono, delizioso"},
  {cat:"Trasporti", cn:"厕所在哪里？", py:"Cèsuǒ zài nǎlǐ?", it:"Dov'è il bagno?"},
  {cat:"Trasporti", cn:"火车站", py:"Huǒchēzhàn", it:"Stazione ferroviaria"},
  {cat:"Trasporti", cn:"机场", py:"Jīchǎng", it:"Aeroporto"},
  {cat:"Trasporti", cn:"我要去…", py:"Wǒ yào qù…", it:"Devo andare a…"},
  {cat:"Trasporti", cn:"打车 / 出租车", py:"Dǎchē / chūzūchē", it:"Prendere un taxi / taxi"},
  {cat:"Trasporti", cn:"地铁站", py:"Dìtiě zhàn", it:"Stazione della metro"},
  {cat:"Shopping", cn:"可以刷卡吗？", py:"Kěyǐ shuākǎ ma?", it:"Posso pagare con carta?"},
  {cat:"Shopping", cn:"太贵了", py:"Tài guì le", it:"È troppo caro"},
  {cat:"Shopping", cn:"便宜一点", py:"Piányi yìdiǎn", it:"Un po' più economico"},
  {cat:"Emergenze", cn:"帮我！", py:"Bāng wǒ!", it:"Aiuto!"},
  {cat:"Emergenze", cn:"我生病了", py:"Wǒ shēngbìng le", it:"Sto male"},
  {cat:"Emergenze", cn:"医院", py:"Yīyuàn", it:"Ospedale"},
  {cat:"Emergenze", cn:"警察", py:"Jǐngchá", it:"Polizia"},
  {cat:"Numeri", cn:"一 二 三 四 五", py:"Yī èr sān sì wǔ", it:"1 2 3 4 5"},
  {cat:"Numeri", cn:"六 七 八 九 十", py:"Liù qī bā jiǔ shí", it:"6 7 8 9 10"},
  {cat:"Numeri", cn:"一百 / 一千", py:"Yìbǎi / yìqiān", it:"100 / 1000"},
];

export const checklist = [
  {group:"Documenti", items:[
    "Passaporto con 6+ mesi di validità residua",
    "E-Arrival Card compilata (entro 24h dall'arrivo)",
    "Assicurazione viaggio salvata offline",
    "Prenotazioni hotel / treni / volo interno salvate offline",
    "Fotocopia digitale del passaporto (email a te stesso + salvata offline)",
  ]},
  {group:"App e pagamenti", items:[
    "VPN installata, configurata e testata prima della partenza",
    "Alipay o WeChat Pay collegata a carta straniera",
    "Traduttore offline con funzione fotocamera",
    "Trip.com installata per treni e voli interni",
    "Mappe offline della zona scaricate",
  ]},
  {group:"Valigia", items:[
    "K-way leggero / giacca antipioggia",
    "Scarpe da cammino comode e già rodate",
    "Powerbank + adattatore per prese cinesi (tipo A/I)",
    "Contante di riserva in yuan per piccole spese",
    "Kit farmaci base + eventuali medicine personali",
  ]},
  {group:"Ultima settimana", items:[
    "Biglietti Grande Muraglia e Città Proibita prenotati online",
    "Treni ad alta velocità principali prenotati",
    "Verifica calendario: niente Festa Nazionale o Capodanno cinese nelle date",
    "Cambiata una piccola somma in yuan in aeroporto/banca",
    "Condivisa l'itinerario con qualcuno a casa",
  ]},
];

export const glossary = [
  {term:"Mianzi 面子", def:"La 'faccia', la reputazione sociale. Evitare di mettere in imbarazzo qualcuno in pubblico è un segno di rispetto fondamentale."},
  {term:"Guanxi 关系", def:"Rete di relazioni e favori reciproci, alla base dei rapporti sociali e di lavoro in Cina."},
  {term:"Wu wei 无为", def:"Concetto taoista dell'agire senza forzare, lasciandosi guidare dal flusso naturale degli eventi."},
  {term:"Fengshui 风水", def:"Arte tradizionale di armonizzare persone e ambiente circostante, ancora molto sentita nell'architettura e negli affari."},
  {term:"Hutong 胡同", def:"Antichi vicoli e quartieri residenziali di Pechino, spesso costruiti attorno a cortili (siheyuan)."},
  {term:"Putonghua 普通话", def:"Il 'linguaggio comune', ovvero il mandarino standard insegnato nelle scuole e usato nei media."},
  {term:"Hukou 户口", def:"Sistema di registrazione della residenza che lega diritti e servizi al luogo di nascita/residenza ufficiale."},
  {term:"Baijiu 白酒", def:"Distillato tradizionale cinese ad alta gradazione, onnipresente nei brindisi formali."},
  {term:"Shan shui 山水", def:"'Montagne e acque': lo stile di pittura a inchiostro che privilegia il vuoto e l'essenza sul dettaglio realistico."},
  {term:"Gaotie 高铁", def:"La rete ferroviaria ad alta velocità cinese, capillare e puntualissima — il modo migliore per spostarsi tra le città."},
  {term:"Hongbao 红包", def:"Busta rossa con denaro, tradizionalmente regalata per Capodanno o occasioni fortunate."},
  {term:"Xiaolongbao 小笼包", def:"Ravioli al vapore ripieni di brodo caldo, specialità di Shanghai."},
];

export const contacts = [
  {label:"Emergenza generale", value:"110 polizia · 120 ambulanza · 119 vigili del fuoco"},
  {label:"Ambasciata d'Italia — Pechino", value:"+86 10 8532 7600"},
  {label:"Consolato d'Italia — Shanghai", value:"+86 21 5407 5807"},
  {label:"Numero unico di emergenza per stranieri (alcune città)", value:"12308 (Ministero Affari Esteri cinese)"},
  {label:"App essenziali", value:"VPN, Alipay/WeChat Pay, traduttore offline, Trip.com"},
];

export const weatherSummary = [
  {city:"Pechino", desc:"Caldo secco, 28–33°C, possibili temporali brevi.", days:"Giorni 1–3"},
  {city:"Chengdu · Leshan · Emeishan", desc:"Caldo umido, spesso nuvoloso; più fresco e piovoso in quota.", days:"Giorni 4–7"},
  {city:"Zhangjiajie", desc:"Caldo umido, 28–33°C, nebbia mattutina frequente.", days:"Giorni 7–8"},
  {city:"Fenghuang", desc:"Simile a Zhangjiajie, umido.", days:"Giorni 9–10"},
  {city:"Shanghai", desc:"Caldo umido intenso, 30–34°C — la tappa più calda del viaggio.", days:"Giorni 11–13"},
];
