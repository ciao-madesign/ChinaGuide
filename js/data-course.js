/* =====================================================================
   DATI — Corso di preparazione (10 lezioni + quiz finale)
   ===================================================================== */

export const lessons = [
{
  key:"lesson-1", illustration:"lesson-1",
  title:"Geografia e territorio", eyebrow:"Lezione 01", subtitle:"Un continente travestito da paese",
  sections:[
    {h:"Le dimensioni del problema", p:"La Cina copre circa 9,6 milioni di km² — quasi trenta volte l'Italia — con cinque fusi orari geografici compressi in uno solo (l'ora di Pechino, valida ovunque). Confina con 14 paesi, più di ogni altra nazione al mondo insieme alla Russia."},
    {h:"Le grandi regioni", p:"Il nord (Pechino, pianura del fiume Giallo) è secco, freddo d'inverno, culla della civiltà cinese classica. Il sud (Sichuan, Hunan, Yunnan) è umido, montuoso, ricco di riso e biodiversità. L'ovest (Tibet, Xinjiang) è altopiano e deserto, etnicamente diverso dal resto del paese. L'est costiero (Shanghai, Canton) è il volto industriale e globalizzato della Cina di oggi."},
    {h:"I due fiumi che hanno fatto la storia", p:"Il Fiume Giallo (Huang He) a nord ha dato origine alla civiltà cinese ma con piene devastanti che gli sono valse il nome di 'dolore della Cina'. Il fiume Azzurro (Yangtze), il più lungo dell'Asia, attraversa Sichuan e Hunan — proprio le regioni del tuo itinerario — ed è da sempre l'arteria economica del sud."},
  ],
  callout:"Per il tuo viaggio: Zhangjiajie ed Emeishan si trovano nel sud montuoso e umido — clima diverso da Pechino, con nebbia frequente che può nascondere i panorami.",
  quiz:[
    {q:"Quanti fusi orari geografici attraversa la Cina, pur usando un solo orario ufficiale?",opts:["Uno","Tre","Cinque","Sette"],c:2,e:"La Cina si estende su cinque fusi orari geografici ma adotta un unico orario nazionale, quello di Pechino."},
    {q:"Quale fiume è tradizionalmente associato alla nascita della civiltà cinese?",opts:["Yangtze","Fiume Giallo (Huang He)","Fiume delle Perle","Mekong"],c:1,e:"Il Fiume Giallo, nella pianura del nord, è considerato la culla della civiltà cinese."},
    {q:"Zhangjiajie ed Emeishan, tappe del tuo itinerario, si trovano in quale area geografica?",opts:["Nord arido","Ovest desertico","Sud montuoso e umido","Costa est industriale"],c:2,e:"Entrambe le zone appartengono al sud della Cina, montuoso, umido e ricco di vegetazione."},
    {q:"Con quanti paesi confina la Cina?",opts:["6","10","14","20"],c:2,e:"La Cina confina con 14 stati, un record condiviso con la Russia."},
    {q:"Quale fiume attraversa sia il Sichuan che l'Hunan?",opts:["Fiume Giallo","Yangtze","Mekong","Fiume delle Perle"],c:1,e:"Lo Yangtze (Fiume Azzurro) collega idealmente Chengdu e la regione dello Hunan."},
  ]
},
{
  key:"lesson-2", illustration:"lesson-2",
  title:"Storia antica", eyebrow:"Lezione 02", subtitle:"Dalle origini alla prima unificazione",
  sections:[
    {h:"Le dinastie leggendarie e la Shang", p:"La tradizione colloca le origini della civiltà cinese nella dinastia Xia (semi-leggendaria) e nella dinastia Shang (circa 1600–1046 a.C.), la prima di cui esistano prove archeologiche solide, incluse le celebri iscrizioni oracolari su ossa e gusci di tartaruga — l'antenato della scrittura cinese."},
    {h:"Zhou e i Regni Combattenti", p:"La dinastia Zhou (1046–256 a.C.) introduce il concetto di 'Mandato del Cielo', giustificazione teologica del potere imperiale che accompagnerà ogni dinastia successiva. Il periodo finale, detto dei Regni Combattenti, è un'epoca di guerre tra stati rivali ma anche di straordinaria fioritura filosofica: nascono Confucio, Laozi, Sunzi."},
    {h:"Qin: la prima Cina unita", p:"Nel 221 a.C. Qin Shi Huang unifica per la prima volta i regni cinesi, standardizza scrittura, monete e assi dei carri, e comincia a collegare le fortificazioni difensive che diventeranno la Grande Muraglia. È anche il sovrano del celebre Esercito di Terracotta di Xi'an. La dinastia Han che segue (206 a.C.–220 d.C.) consolida l'impero e dà il nome all'etnia maggioritaria cinese, gli Han."},
  ],
  callout:"Per il tuo viaggio: la Grande Muraglia che visiterai a Juyongguan è in gran parte opera Ming (secoli dopo Qin), ma il progetto nasce proprio con il primo imperatore.",
  quiz:[
    {q:"Quale dinastia è la prima di cui esistono solide prove archeologiche?",opts:["Xia","Shang","Zhou","Qin"],c:1,e:"La dinastia Shang (c. 1600–1046 a.C.) è la prima confermata da reperti archeologici, incluse le iscrizioni oracolari."},
    {q:"Cosa introduce la dinastia Zhou come giustificazione del potere imperiale?",opts:["La burocrazia esaminata","Il Mandato del Cielo","Il buddismo di stato","La legge marziale"],c:1,e:"Il 'Mandato del Cielo' legittima il sovrano finché governa con virtù, e verrà invocato per secoli."},
    {q:"Chi unifica per la prima volta la Cina nel 221 a.C.?",opts:["Confucio","Sunzi","Qin Shi Huang","Liu Bang"],c:2,e:"Qin Shi Huang, primo imperatore, unifica scrittura, moneta e territorio."},
    {q:"A quale periodo risale la nascita del confucianesimo e del taoismo?",opts:["Dinastia Shang","Regni Combattenti (epoca Zhou)","Dinastia Han","Dinastia Tang"],c:1,e:"Confucio, Laozi e Sunzi vivono nel turbolento ma fertile periodo dei Regni Combattenti."},
    {q:"Da quale dinastia prende il nome l'etnia maggioritaria cinese di oggi?",opts:["Qin","Han","Tang","Ming"],c:1,e:"Gli 'Han' sono oggi il gruppo etnico maggioritario in Cina, dal nome della dinastia."},
  ]
},
{
  key:"lesson-3", illustration:"lesson-3",
  title:"Storia imperiale", eyebrow:"Lezione 03", subtitle:"Da Tang a Qing: duemila anni di imperi",
  sections:[
    {h:"L'età dell'oro Tang e Song", p:"La dinastia Tang (618–907) è considerata l'apice culturale della Cina classica: poesia, commercio lungo la Via della Seta, cosmopolitismo. La successiva dinastia Song (960–1279) porta innovazioni tecnologiche straordinarie — stampa a caratteri mobili, bussola, polvere da sparo — e una fioritura urbana ed economica senza precedenti."},
    {h:"Yuan e Ming", p:"Nel 1271 i Mongoli di Kublai Khan fondano la dinastia Yuan, l'unica dinastia straniera prima dei Qing. Nel 1368 i Ming rovesciano i Mongoli e riportano un governo han: sotto i Ming vengono costruiti la Città Proibita e gran parte della Grande Muraglia oggi visitabile, incluso il tratto di Juyongguan."},
    {h:"I Qing e la fine dell'impero", p:"Nel 1644 i Manciù fondano la dinastia Qing, l'ultima dinastia imperiale, che governa fino al 1912. Il XIX secolo porta le Guerre dell'Oppio, l'umiliazione delle potenze straniere e un progressivo indebolimento che culmina nella caduta dell'impero."},
  ],
  callout:"Per il tuo viaggio: la Città Proibita e la Grande Muraglia che vedrai a Pechino sono opere quasi interamente Ming — il periodo che più ha plasmato l'immagine 'imperiale' della città.",
  quiz:[
    {q:"Quale dinastia è considerata l'apice culturale della Cina classica?",opts:["Song","Tang","Yuan","Qing"],c:1,e:"I Tang (618–907) sono il punto più alto di poesia, commercio e prestigio culturale cinese."},
    {q:"Quali invenzioni si diffondono sotto i Song?",opts:["Carta e seta","Stampa a caratteri mobili, bussola, polvere da sparo","Scrittura oracolare","Terracotta"],c:1,e:"I Song portano innovazioni cruciali come stampa mobile, bussola e polvere da sparo."},
    {q:"Chi fonda la dinastia Yuan?",opts:["Qin Shi Huang","Kublai Khan","Zhu Yuanzhang","Kangxi"],c:1,e:"Kublai Khan, nipote di Gengis Khan, fonda gli Yuan nel 1271, unica dinastia mongola in Cina prima dei Qing."},
    {q:"Sotto quale dinastia sono costruiti la Città Proibita e gran parte della Grande Muraglia attuale?",opts:["Tang","Song","Ming","Qing"],c:2,e:"I Ming (1368–1644) edificano la Città Proibita e ricostruiscono la Muraglia con mattoni e pietra."},
    {q:"Quale dinastia, di origine manciù, è l'ultima dell'impero cinese?",opts:["Ming","Yuan","Qing","Song"],c:2,e:"I Qing governano dal 1644 al 1912, quando cade l'impero."},
  ]
},
{
  key:"lesson-4", illustration:"lesson-4",
  title:"Storia moderna", eyebrow:"Lezione 04", subtitle:"Dalla caduta dell'impero alla Repubblica Popolare",
  sections:[
    {h:"La fine dell'impero e la Repubblica", p:"Nel 1911–12 la Rivoluzione Xinhai rovescia i Qing e Sun Yat-sen proclama la Repubblica di Cina. Seguono decenni instabili: signori della guerra, invasione giapponese (1937–45) e guerra civile tra nazionalisti (Kuomintang) e comunisti."},
    {h:"La nascita della Repubblica Popolare", p:"Il 1° ottobre 1949 Mao Zedong proclama la Repubblica Popolare Cinese dopo la vittoria comunista; i nazionalisti si rifugiano a Taiwan, dando origine alla questione ancora oggi irrisolta. Seguono decenni di riforme radicali e traumi collettivi: il Grande Balzo in Avanti (1958–61) e la Rivoluzione Culturale (1966–76)."},
    {h:"Le riforme e l'apertura", p:"Dal 1978 Deng Xiaoping avvia le 'riforme e apertura' che trasformano la Cina in un'economia di mercato guidata dal partito unico, con crescita economica senza precedenti nei decenni successivi e l'urbanizzazione di centinaia di milioni di persone."},
  ],
  callout:"Per il tuo viaggio: Shanghai, ultima tappa dell'itinerario, è il simbolo per eccellenza di questa trasformazione — da porto coloniale a metropoli globale in meno di 40 anni.",
  quiz:[
    {q:"Chi proclama la Repubblica di Cina nel 1912?",opts:["Mao Zedong","Sun Yat-sen","Deng Xiaoping","Chiang Kai-shek"],c:1,e:"Sun Yat-sen guida la rivoluzione che rovescia i Qing e fonda la Repubblica nel 1912."},
    {q:"In che data viene proclamata la Repubblica Popolare Cinese?",opts:["1 ottobre 1949","1 gennaio 1950","10 ottobre 1911","1 maggio 1945"],c:0,e:"Mao Zedong proclama la Repubblica Popolare il 1° ottobre 1949, oggi festa nazionale."},
    {q:"Dove si rifugiano i nazionalisti sconfitti nella guerra civile?",opts:["Hong Kong","Giappone","Taiwan","Singapore"],c:2,e:"Il Kuomintang si ritira a Taiwan, origine della questione ancora oggi aperta."},
    {q:"Chi avvia le riforme economiche del 1978?",opts:["Mao Zedong","Deng Xiaoping","Sun Yat-sen","Xi Jinping"],c:1,e:"Deng Xiaoping lancia 'riforme e apertura', trasformando l'economia cinese."},
    {q:"Quale città rappresenta oggi in modo più evidente la trasformazione economica cinese?",opts:["Pechino","Xi'an","Shanghai","Chengdu"],c:2,e:"Shanghai, con lo skyline di Pudong, è il simbolo della modernizzazione post-1978."},
  ]
},
{
  key:"lesson-5", illustration:"lesson-5",
  title:"Cina contemporanea", eyebrow:"Lezione 05", subtitle:"Politica, economia, società oggi",
  sections:[
    {h:"Il sistema politico", p:"La Cina è una repubblica popolare a partito unico, guidata dal Partito Comunista Cinese (PCC). Il capo dello stato e segretario del partito è, dal 2013, Xi Jinping. Il paese è diviso in 23 province, 5 regioni autonome, 4 municipalità speciali (tra cui Pechino e Shanghai) e le regioni amministrative speciali di Hong Kong e Macao."},
    {h:"Un'economia da superpotenza", p:"La Cina è oggi la seconda economia mondiale per PIL nominale (la prima a parità di potere d'acquisto), leader globale in manifattura, infrastrutture ferroviarie ad alta velocità e tecnologie digitali. Il paese ha vissuto la più grande migrazione urbana della storia: oggi oltre il 65% della popolazione vive in città."},
    {h:"Vita quotidiana e tecnologia", p:"La Cina è una società fortemente digitalizzata: quasi tutti i pagamenti passano da app come Alipay o WeChat Pay, spesso escludendo il contante. Internet è regolato dal cosiddetto 'Great Firewall', che blocca Google, WhatsApp, Instagram e molti altri servizi occidentali — informazione essenziale per organizzare la connettività del viaggio."},
  ],
  callout:"Per il tuo viaggio: senza VPN funzionante, WhatsApp e Google Maps non funzionano in Cina. Vale la pena scaricare e configurare una VPN prima della partenza, non una volta arrivati.",
  quiz:[
    {q:"Che tipo di sistema politico ha la Cina?",opts:["Monarchia costituzionale","Repubblica federale multipartitica","Repubblica popolare a partito unico","Confederazione di stati"],c:2,e:"Il Partito Comunista Cinese detiene il potere esclusivo dal 1949."},
    {q:"Chi guida la Cina dal 2013 come segretario del partito e capo di stato?",opts:["Hu Jintao","Li Keqiang","Xi Jinping","Deng Xiaoping"],c:2,e:"Xi Jinping è alla guida del paese dal 2013."},
    {q:"Quali sono, oltre Pechino e Shanghai, le altre due municipalità speciali cinesi?",opts:["Tianjin e Chongqing","Chengdu e Xi'an","Guangzhou e Shenzhen","Nanchino e Hangzhou"],c:0,e:"Le quattro municipalità dirette sono Pechino, Shanghai, Tianjin e Chongqing."},
    {q:"Cosa blocca il 'Great Firewall' cinese?",opts:["Solo i siti pornografici","Servizi come Google, WhatsApp, Instagram","Solo i siti governativi stranieri","Nessun servizio, è solo un filtro pubblicitario"],c:1,e:"Il Great Firewall impedisce l'accesso a molti servizi occidentali comuni, incluso WhatsApp."},
    {q:"Come si effettuano la maggior parte dei pagamenti quotidiani in Cina?",opts:["Contanti","Assegni","App come Alipay o WeChat Pay","Bonifico bancario"],c:2,e:"I pagamenti digitali tramite app dominano la vita quotidiana cinese, spesso escludendo il contante."},
  ]
},
{
  key:"lesson-6", illustration:"lesson-6",
  title:"Filosofia e religione", eyebrow:"Lezione 06", subtitle:"Confucianesimo, taoismo, buddismo",
  sections:[
    {h:"Confucianesimo: l'ordine sociale", p:"Confucio (551–479 a.C.) elabora un sistema etico basato su gerarchia, rispetto per gli anziani, dovere familiare e virtù del governante. Non è una religione in senso stretto ma un'etica sociale che ha plasmato per millenni famiglia, educazione e amministrazione pubblica cinese."},
    {h:"Taoismo: l'armonia con la natura", p:"Attribuito a Laozi e al testo Dao De Jing, il taoismo predica il 'wu wei' (agire senza forzare), l'armonia con il flusso naturale delle cose e l'equilibrio yin-yang. È alla base di molta iconografia dei templi di montagna, incluso l'Emeishan, sacro sia al buddismo che al taoismo."},
    {h:"Buddismo e sincretismo", p:"Il buddismo arriva dall'India intorno al I secolo d.C. e si fonde progressivamente con le tradizioni locali. Nella pratica quotidiana cinese le tre tradizioni convivono senza esclusività: è normale bruciare incenso in un tempio buddista e consultare principi taoisti nello stesso giorno."},
  ],
  callout:"Per il tuo viaggio: il Monte Emei (Emeishan) è una delle quattro montagne sacre del buddismo cinese, ma ospita anche templi taoisti — un esempio perfetto di questo sincretismo.",
  quiz:[
    {q:"Il confucianesimo è principalmente...",opts:["Una religione monoteista","Un'etica sociale basata su gerarchia e virtù","Un culto della natura","Una filosofia importata dall'India"],c:1,e:"Confucio propone un sistema etico-sociale, non una teologia, incentrato su ordine e virtù."},
    {q:"Quale concetto chiave appartiene al taoismo?",opts:["Mandato del Cielo","Wu wei (agire senza forzare)","Nirvana","Reincarnazione karmica"],c:1,e:"Il 'wu wei' taoista invita a non opporsi al flusso naturale degli eventi."},
    {q:"Da dove arriva il buddismo in Cina?",opts:["Dal Giappone","Dalla Mongolia","Dall'India","Dalla Corea"],c:2,e:"Il buddismo giunge in Cina dall'India, circa nel I secolo d.C., lungo le vie commerciali."},
    {q:"Cosa rappresenta l'Emeishan nel panorama religioso cinese?",opts:["Solo un sito confuciano","Una montagna sacra sia buddista che taoista","Un luogo esclusivamente laico","Un sito islamico"],c:1,e:"L'Emeishan è una delle quattro montagne sacre buddiste, ma ospita anche presenza taoista."},
    {q:"Come convivono generalmente le tre tradizioni religiose in Cina?",opts:["In conflitto costante","In modo sincretico, senza esclusività reciproca","Sono vietate dalla legge","Solo una è praticata per persona"],c:1,e:"Confucianesimo, taoismo e buddismo si mescolano nella pratica quotidiana senza contraddizione percepita."},
  ]
},
{
  key:"lesson-7", illustration:"lesson-7",
  title:"Arte, simboli e festività", eyebrow:"Lezione 07", subtitle:"Il linguaggio visivo della Cina",
  sections:[
    {h:"Colori e simboli", p:"Il rosso rappresenta fortuna e gioia (mai lutto, come in occidente), l'oro ricchezza e potere imperiale. Il drago è simbolo di potere e buon auspicio (non malvagio come nell'iconografia europea), la fenice rappresenta l'armonia femminile. Il numero 8 è fortunato (assonanza con 'prosperità'), il 4 è evitato (assonanza con 'morte')."},
    {h:"Calligrafia e pittura", p:"La calligrafia è considerata la più alta delle arti visive cinesi, non semplice scrittura ma espressione del carattere morale di chi scrive. La pittura tradizionale a inchiostro (shan shui, 'montagne e acque') privilegia lo spazio vuoto e l'essenzialità sul dettaglio realistico — un'estetica che ritroverai nei paesaggi di Zhangjiajie."},
    {h:"Le feste principali", p:"Il Capodanno cinese (gennaio/febbraio, calendario lunare) è la festa più importante, con migrazioni di massa. La Festa di Metà Autunno (settembre/ottobre) celebra la luna piena con le torte lunari. La Festa Nazionale (1° ottobre) commemora la fondazione della Repubblica Popolare con una settimana di vacanza — periodo da evitare per viaggiare, per l'enorme affluenza turistica interna."},
  ],
  callout:"Per il tuo viaggio: se le date si avvicinano alla Festa Nazionale (inizio ottobre) o al Capodanno cinese, aspettati siti affollatissimi e treni difficili da prenotare — verifica il calendario prima di fissare le date.",
  quiz:[
    {q:"Cosa rappresenta il colore rosso nella cultura cinese?",opts:["Lutto e tristezza","Fortuna e gioia","Povertà","Pericolo"],c:1,e:"A differenza dell'occidente, in Cina il rosso è associato a fortuna e celebrazione, non al lutto."},
    {q:"Cosa simboleggia il drago nell'iconografia cinese?",opts:["Il male","Potere e buon auspicio","La morte","La povertà"],c:1,e:"Il drago cinese è una figura positiva, simbolo di potere imperiale e fortuna."},
    {q:"Perché il numero 4 è considerato sfortunato?",opts:["Per motivi storici","Per assonanza con la parola 'morte'","Perché associato al lutto religioso","Non è considerato sfortunato"],c:1,e:"In cinese '4' (si) suona simile a 'morte' (si), da cui la superstizione diffusa."},
    {q:"Quale festa cinese comporta la maggiore migrazione interna di persone al mondo?",opts:["Festa di Metà Autunno","Capodanno cinese","Festa Nazionale","Festa delle Lanterne"],c:1,e:"Il Capodanno cinese genera la più grande migrazione umana annuale del pianeta."},
    {q:"Quale periodo dell'anno conviene evitare per l'enorme affollamento turistico interno?",opts:["La settimana della Festa Nazionale (inizio ottobre)","Metà marzo","Fine novembre","Metà giugno"],c:0,e:"La 'Golden Week' di inizio ottobre porta milioni di turisti cinesi in viaggio simultaneamente."},
  ]
},
{
  key:"lesson-8", illustration:"lesson-8",
  title:"Cucina cinese e cucine regionali", eyebrow:"Lezione 08", subtitle:"Un paese, otto grandi tradizioni culinarie",
  sections:[
    {h:"Non esiste 'la' cucina cinese", p:"La Cina riconosce tradizionalmente otto grandi scuole culinarie regionali, profondamente diverse tra loro per ingredienti, tecniche e sapori. Il tuo itinerario ne attraversa concretamente tre: pechinese, sichuanese e cantonese/orientale (Shanghai)."},
    {h:"Pechino: imperiale e di strada", p:"La cucina di Pechino è nota per la Peking Duck (anatra laccata, servita con crêpe sottili, salsa hoisin e verdure), oltre a un vivace street food negli hutong: jianbing (crêpe salata), spiedini, ravioli jiaozi bolliti o al vapore."},
    {h:"Sichuan e Hunan: il regno del piccante", p:"Chengdu è la capitale del piccante 'numbing' — la combinazione di peperoncino e pepe di Sichuan (huajiao) che intorpidisce la lingua, alla base dell'hot pot piccante. La cucina Hunan, che incontrerai a Fenghuang, è altrettanto piccante ma senza l'effetto intorpidente, più affumicata e agrodolce."},
    {h:"Shanghai: dolce e raffinata", p:"La cucina di Shanghai (benbang cai) predilige sapori più dolci e delicati, con piatti come gli xiaolongbao (ravioli al vapore ripieni di brodo) e il maiale brasato in salsa di soia scura (hongshao rou)."},
  ],
  callout:"Per il tuo viaggio: il livello di piccantezza reale del Sichuan sorprende molti viaggiatori. Se non sei abituato, chiedi 'wei la' (poco piccante) prima di ordinare l'hot pot.",
  quiz:[
    {q:"Quante grandi tradizioni culinarie regionali riconosce tradizionalmente la Cina?",opts:["Tre","Cinque","Otto","Dodici"],c:2,e:"Si parla comunemente di 'otto grandi cucine' regionali cinesi."},
    {q:"Cosa caratterizza il piccante 'numbing' del Sichuan?",opts:["Solo peperoncino","Peperoncino combinato con il pepe di Sichuan (huajiao)","Zenzero e aglio","Salsa di soia scura"],c:1,e:"Il pepe di Sichuan produce l'effetto intorpidente ('ma'), unico a questa cucina."},
    {q:"Quale piatto è tipicamente associato a Pechino?",opts:["Xiaolongbao","Hot pot piccante","Peking Duck","Hongshao rou"],c:2,e:"L'anatra laccata alla pechinese è il piatto simbolo della capitale."},
    {q:"Come si differenzia la cucina Hunan da quella Sichuan?",opts:["Non è affatto piccante","È piccante ma senza l'effetto intorpidente del pepe di Sichuan","Usa solo ingredienti dolci","È identica alla cucina di Shanghai"],c:1,e:"L'Hunan è piccante e affumicata, ma priva dell'huajiao che caratterizza il Sichuan."},
    {q:"Cosa sono gli xiaolongbao, specialità di Shanghai?",opts:["Spiedini di carne","Ravioli al vapore ripieni di brodo","Zuppa di pesce piccante","Pane al vapore dolce"],c:1,e:"Gli xiaolongbao sono ravioli delicati con un ripieno di brodo caldo, tipici di Shanghai."},
  ]
},
{
  key:"lesson-9", illustration:"lesson-9",
  title:"Lingua cinese", eyebrow:"Lezione 09", subtitle:"Pinyin, toni e frasi essenziali",
  sections:[
    {h:"Come funziona il mandarino", p:"Il cinese mandarino non è alfabetico ma logografico: ogni carattere rappresenta un concetto o una sillaba, non un suono scomposto in lettere. Il pinyin è il sistema di romanizzazione ufficiale che traduce la pronuncia in alfabeto latino, ma non sostituisce i caratteri nella scrittura reale."},
    {h:"I quattro toni", p:"Il mandarino è una lingua tonale: la stessa sillaba 'ma' pronunciata con toni diversi può significare 'madre' (tono 1, piatto), 'canapa' (tono 2, ascendente), 'cavallo' (tono 3, discendente-ascendente) o 'rimproverare' (tono 4, discendente). Sbagliare tono può cambiare completamente il significato."},
    {h:"Frasi utili per il viaggio", p:"Nǐ hǎo (你好) — ciao. Xièxie (谢谢) — grazie. Duìbuqǐ (对不起) — scusa. Zhège duōshao qián? (这个多少钱？) — quanto costa? Wǒ bù dǒng (我不懂) — non capisco. Cèsuǒ zài nǎlǐ? (厕所在哪里？) — dov'è il bagno? Trovi il frasario completo nella sezione Strumenti."},
  ],
  callout:"Per il tuo viaggio: al di fuori delle grandi città l'inglese è poco diffuso. Un'app di traduzione con fotocamera (per i menu) e la funzione offline sono più utili di qualsiasi frasario cartaceo.",
  quiz:[
    {q:"Il cinese mandarino è una lingua...",opts:["Alfabetica","Logografica (a caratteri)","Sillabica pura","Ideografica pittografica al 100%"],c:1,e:"Ogni carattere cinese rappresenta un concetto/morfema, non lettere combinate come nell'alfabeto."},
    {q:"Cos'è il pinyin?",opts:["Un dialetto regionale","Il sistema di romanizzazione della pronuncia","Un antico alfabeto cinese","Uno stile calligrafico"],c:1,e:"Il pinyin traspone la pronuncia mandarina in caratteri latini, per facilitare l'apprendimento."},
    {q:"Perché i toni sono fondamentali in mandarino?",opts:["Servono solo per l'enfasi","Cambiano il significato della parola","Sono opzionali nel parlato colloquiale","Esistono solo nella scrittura"],c:1,e:"La stessa sillaba con toni diversi ha significati completamente diversi."},
    {q:"Come si dice 'grazie' in mandarino?",opts:["Nǐ hǎo","Duìbuqǐ","Xièxie","Zàijiàn"],c:2,e:"Xièxie (谢谢) significa 'grazie'."},
    {q:"Cosa conviene avere a disposizione fuori dalle grandi città?",opts:["Un dizionario cartaceo italiano-cinese","Un'app di traduzione con funzione offline e fotocamera","Niente, l'inglese è sempre sufficiente","Solo il pinyin scritto a mano"],c:1,e:"La connettività può mancare e l'inglese è poco diffuso: un'app offline con OCR per i menu è la soluzione più pratica."},
  ]
},
{
  key:"lesson-10", illustration:"lesson-10",
  title:"Usi, costumi ed etichetta", eyebrow:"Lezione 10", subtitle:"Comportarsi da viaggiatore consapevole",
  sections:[
    {h:"A tavola", p:"Le bacchette non vanno mai piantate verticalmente nel riso (ricordano l'incenso funebre). È normale ordinare piatti da condividere al centro del tavolo. Lasciare un po' di cibo nel piatto segnala che si è sazi e soddisfatti; finire tutto può essere letto come 'non mi hanno dato abbastanza'."},
    {h:"Rapporti sociali e 'faccia'", p:"Il concetto di 'mianzi' (faccia, reputazione sociale) è centrale: evitare di far sembrare qualcuno in imbarazzo in pubblico, anche correggendolo, è una forma di rispetto molto apprezzata. Il volume alto nelle conversazioni pubbliche è culturalmente normale, non un segnale di rabbia o maleducazione."},
    {h:"Pratiche utili", p:"Il contante sta scomparendo dai pagamenti quotidiani: conviene attivare Alipay o WeChat Pay con carta straniera prima della partenza. Molti siti turistici richiedono la prenotazione online del biglietto in anticipo (a volte solo tramite app cinesi). Il passaporto va portato sempre con sé: è richiesto per treni, alcuni hotel e siti storici."},
  ],
  callout:"Per il tuo viaggio: prenota Grande Muraglia, Città Proibita e i biglietti dei treni ad alta velocità con largo anticipo — molti siti applicano quote giornaliere di visitatori.",
  quiz:[
    {q:"Perché non si devono piantare le bacchette verticalmente nel riso?",opts:["È scomodo","Ricorda un rito funebre (l'incenso)","Rovina le bacchette","È solo una questione di galateo occidentale"],c:1,e:"Le bacchette verticali nel riso richiamano i bastoncini d'incenso usati nei riti funebri."},
    {q:"Cosa significa il concetto di 'mianzi'?",opts:["Un piatto tipico","La reputazione/dignità sociale, la 'faccia'","Una festività religiosa","Un tipo di tè"],c:1,e:"Il 'mianzi' è il valore sociale/reputazione di una persona, centrale nelle interazioni pubbliche."},
    {q:"Cosa conviene fare per i pagamenti quotidiani in Cina?",opts:["Portare solo contante","Attivare Alipay o WeChat Pay con carta straniera prima della partenza","Usare solo assegni","Cambiare valuta solo in aeroporto"],c:1,e:"I pagamenti digitali dominano; conviene configurare un'app di pagamento prima di partire."},
    {q:"Cosa è consigliabile prenotare con largo anticipo?",opts:["Solo i voli internazionali","Grande Muraglia, Città Proibita, treni ad alta velocità","Solo i ristoranti","Niente, si prenota tutto sul posto"],c:1,e:"Molti siti hanno quote giornaliere e i treni veloci si esauriscono rapidamente."},
    {q:"Cosa segnala lasciare un po' di cibo nel piatto a fine pasto?",opts:["Maleducazione","Che si è sazi e soddisfatti","Che il cibo non piaceva","Niente, non ha significato"],c:1,e:"Finire completamente il piatto può essere letto come segno che non è stato servito abbastanza cibo."},
  ]
},
];

export const finalQuiz = [
  {q:"Quale fiume attraversa il Sichuan e collega idealmente Chengdu allo Hunan?",opts:["Fiume Giallo","Yangtze","Mekong","Fiume delle Perle"],c:1,e:"Lo Yangtze collega le regioni del sud attraversate nel tuo itinerario."},
  {q:"Quale dinastia costruisce la Città Proibita e la maggior parte della Grande Muraglia visitabile oggi?",opts:["Tang","Song","Ming","Yuan"],c:2,e:"L'immagine 'imperiale' di Pechino è in gran parte opera dei Ming."},
  {q:"In che anno viene proclamata la Repubblica Popolare Cinese?",opts:["1912","1949","1966","1978"],c:1,e:"Mao Zedong proclama la RPC il 1° ottobre 1949."},
  {q:"Chi avvia le riforme economiche che aprono la Cina al mercato globale?",opts:["Mao Zedong","Sun Yat-sen","Deng Xiaoping","Xi Jinping"],c:2,e:"Deng Xiaoping lancia 'riforme e apertura' dal 1978."},
  {q:"Cosa blocca il 'Great Firewall' cinese, rilevante per la connettività in viaggio?",opts:["Solo i siti bancari","Google, WhatsApp, Instagram e simili","Solo la stampa straniera","Nessun servizio noto"],c:1,e:"Molti servizi occidentali comuni non sono accessibili senza VPN."},
  {q:"Il Monte Emei (Emeishan) è sacro a quali tradizioni religiose?",opts:["Solo confucianesimo","Buddismo e taoismo","Solo islam","Nessuna, è un sito laico"],c:1,e:"L'Emeishan è una delle quattro montagne sacre buddiste, con presenza taoista."},
  {q:"Cosa rappresenta il colore rosso nella cultura cinese, a differenza dell'occidente?",opts:["Lutto","Fortuna e gioia","Pericolo","Povertà"],c:1,e:"In Cina il rosso è il colore della fortuna e della celebrazione."},
  {q:"Quale periodo dell'anno è meglio evitare per l'affollamento turistico interno?",opts:["Metà marzo","La Golden Week di inizio ottobre","Fine novembre","Metà giugno"],c:1,e:"La settimana della Festa Nazionale porta milioni di viaggiatori cinesi in movimento."},
  {q:"Cosa caratterizza il piccante tipico della cucina Sichuan, che incontrerai a Chengdu?",opts:["Solo peperoncino fresco","La combinazione con il pepe di Sichuan (effetto intorpidente)","Zafferano e curcuma","Non è affatto piccante"],c:1,e:"Il pepe di Sichuan (huajiao) dà l'effetto 'ma', unico a questa cucina."},
  {q:"In cosa differisce la cucina Hunan, che troverai a Fenghuang, da quella Sichuan?",opts:["È dolce, non piccante","È piccante ma senza l'effetto intorpidente del pepe di Sichuan","Usa solo pesce crudo","È identica in tutto"],c:1,e:"L'Hunan è piccante e affumicata ma priva dell'huajiao sichuanese."},
  {q:"Il mandarino è una lingua...",opts:["Alfabetica e non tonale","Logografica e tonale","Sillabica priva di toni","Basata su geroglifici egizi"],c:1,e:"Il cinese usa caratteri logografici e i toni cambiano il significato delle parole."},
  {q:"Perché non bisogna piantare le bacchette verticalmente nel riso?",opts:["È solo scomodo","Ricorda l'incenso usato nei riti funebri","Danneggia le bacchette","Nessun motivo particolare"],c:1,e:"È un gesto associato ai riti funebri, da evitare a tavola."},
  {q:"Cosa conviene fare prima della partenza in vista dei pagamenti quotidiani?",opts:["Portare solo euro in contanti","Attivare Alipay o WeChat Pay con carta straniera","Aprire un conto bancario cinese","Nessuna preparazione è necessaria"],c:1,e:"I pagamenti digitali dominano la vita quotidiana; conviene configurarli prima di partire."},
  {q:"Quale evento del 1911-12 pone fine all'impero cinese?",opts:["La Rivoluzione Culturale","La Rivoluzione Xinhai","Le Guerre dell'Oppio","Il Grande Balzo in Avanti"],c:1,e:"La Rivoluzione Xinhai rovescia i Qing e porta alla proclamazione della Repubblica."},
  {q:"Perché conviene prenotare con largo anticipo Grande Muraglia, Città Proibita e treni veloci?",opts:["Sono sempre gratuiti solo online","Applicano quote giornaliere o si esauriscono rapidamente","Sono chiusi senza prenotazione fissa","Non serve, si compra sempre sul posto"],c:1,e:"Molti siti e treni hanno capienza limitata giornaliera, prenotabile in anticipo."},
];
