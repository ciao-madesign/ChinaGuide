/* =====================================================================
   DATI — Guida di viaggio "Cina nascosta", 13 giorni
   ===================================================================== */

export const HOME = {
  eyebrow:"Panoramica", title:"Cina nascosta", subtitle:"Panda, villaggi e le montagne di Avatar — itinerario personalizzato di 13 giorni",
  stats:[["13","Giorni"],["6","Regioni"],["1.300–1.900 €","Budget/persona"],["4","Tratte lunghe"]],
  sections:[
    {h:"Come leggere questa guida", p:[
      "\"Prima di partire\" copre tutto ciò che va organizzato da casa: visto, app, salute, budget.",
      "Ogni giorno ha una scheda fissa: tappe, trasporti, biglietti da anticipare, alloggio, sforzo fisico, meteo, cibo, budget, un'illustrazione e due mappe (uno schizzo d'atmosfera e una mappa reale con i punti di quel giorno).",
      "I giorni con un bordo rosso (⚠) sono quelli logisticamente più tirati — segnalati per essere rivalutati, non necessariamente da evitare.",
      "La sezione 'Mappa d'insieme' mostra l'intero percorso in una sola vista, per orientarti rispetto al resto del viaggio in qualsiasi momento."
    ]},
  ]
};

export const intro = {
  key:"intro", eyebrow:"Sezione 0", title:"Prima di partire", subtitle:"Tutto quello che va organizzato da casa",
  sections:[
    {h:"Visto e ingresso", p:[
      "I cittadini italiani con passaporto ordinario NON hanno bisogno del visto per soggiorni fino a 30 giorni per turismo (esenzione unilaterale cinese, confermata fino al 31 dicembre 2026). Basta il passaporto, valido almeno 6 mesi oltre la data di rientro.",
      "Va compilata online la e-Arrival Card entro le 24 ore prima dell'arrivo (procedura digitale che sostituisce il vecchio modulo cartaceo).",
      "Superare i 30 giorni o viaggiare per motivi diversi da turismo/affari/visite richiede un visto vero e proprio, da richiedere al centro visti cinese di Roma o Milano prima della partenza."
    ]},
    {h:"Voli", p:[
      "Valuta voli con arrivo a Pechino e partenza da Shanghai (itinerario 'open jaw'), evita di dover tornare al punto di partenza.",
      "In estate i prezzi sono più alti rispetto a primavera/autunno: conviene prenotare con 3-4 mesi di anticipo."
    ]},
    {h:"App da scaricare prima di partire", p:[
      "VPN affidabile e già configurata (in Cina Google, WhatsApp, Instagram, Maps non funzionano senza): attivala e testala PRIMA di partire.",
      "Alipay o WeChat Pay collegata a carta di credito straniera — indispensabile, il contante è quasi scomparso dai pagamenti quotidiani.",
      "Un traduttore offline con funzione fotocamera (utile per i menu).",
      "Trip.com per prenotare treni interni e voli domestici in inglese.",
      "Google Maps funziona solo con VPN attiva — per questo ogni giorno di questa guida ha anche una mappa reale interattiva che carica comunque, più uno schizzo offline che non dipende da rete o VPN."
    ]},
    {h:"Salute e assicurazione", p:[
      "Nessuna vaccinazione obbligatoria per l'Italia, ma è consigliato essere in regola con le vaccinazioni di routine.",
      "Acqua di rubinetto da evitare: acquista sempre acqua in bottiglia.",
      "Assicurazione viaggio con copertura sanitaria e possibilmente 'attività outdoor/trekking leggero', vista la componente escursionistica di Emeishan e Zhangjiajie."
    ]},
    {h:"Meteo estivo lungo il percorso", p:[
      "Pechino: caldo secco, 28-33°C, possibili temporali brevi.",
      "Chengdu / Leshan / Emeishan: caldo umido, spesso nuvoloso, più fresco e piovoso in quota — porta un k-way leggero.",
      "Zhangjiajie: caldo umido, 28-33°C, nebbia mattutina frequente.",
      "Fenghuang: simile a Zhangjiajie, umido.",
      "Shanghai: caldo umido intenso, 30-34°C — la città più calda del percorso in questo periodo."
    ]},
    {h:"Valuta e budget", p:[
      "Valuta: Yuan/Renminbi (¥). Cambia una piccola somma in aeroporto, per il resto userai quasi solo pagamenti digitali.",
      "Budget indicativo fascia media, a persona, per l'intero viaggio (esclusi voli internazionali): 1.300–1.900 € — dettaglio giorno per giorno più avanti, con calcolatore interattivo negli Strumenti."
    ]},
    {h:"Checklist documenti", p:[
      "Passaporto (validità residua 6+ mesi) + fotocopia digitale salvata offline.",
      "Conferme prenotazioni hotel e treni (salvate anche offline, non solo su email).",
      "Assicurazione viaggio stampata o salvata."
    ]},
  ]
};

/* Ogni punto: {name, lat, lng, place_id, notes?} — place_id genera il link Google Maps */
export const days = [
{key:"g1", num:1, illustration:"day-1", city:"PECHINO", nav:"Pechino — arrivo", title:"Arrivo e primo contatto", subtitle:"Nessun programma pesante dopo il volo",
 flag:null,
 attivita:[
   {title:"Check-in e primo contatto con la città", time:"Arrivo", desc:"Dopo un volo lungo, il primo impatto con Pechino è meglio viverlo senza fretta: sistemazione in hotel, una doccia, e il tempo di realizzare che sei davvero in Cina. Zona Dongcheng, comoda per orientarsi a piedi già dal primo pomeriggio."},
   {title:"Passeggiata nei hutong di Dongcheng", time:"Pomeriggio", desc:"'Hutong' viene da una parola di origine mongola che significa 'pozzo': i primi vicoli risalgono alla dinastia Yuan (XIII secolo), quando Pechino venne pianificata attorno a una rete di stradine strette che collegavano i cortili quadrangolari (siheyuan) dove viveva la popolazione. Oggi sono l'anima più autentica della città vecchia: muri di mattoni grigi, porte laccate di rosso, biciclette appoggiate ai muri, gabbie di uccellini appese fuori dalle finestre e anziani che giocano a carte per strada. Un buon modo per abituare lo sguardo prima dei grandi monumenti dei prossimi giorni."},
   {title:"Primo street food", time:"Pomeriggio/sera", desc:"Il jianbing è la colazione-spuntino di strada per eccellenza a Pechino: una crêpe sottile di farina di grano e fagioli, cotta su una piastra rotonde, farcita con uovo, salsa hoisin, coriandolo e una cialda croccante (baocui) che le dà la caratteristica consistenza. Vederlo preparare al volo da un venditore ambulante è già parte dell'esperienza."},
   {title:"Cena in un ristorante di quartiere", time:"Sera", desc:"Meglio evitare le trappole per turisti vicino ai siti più noti: un ristorante di quartiere lontano dalle zone centrali, magari senza menù in inglese, è il modo più diretto per assaggiare la cucina pechinese di tutti i giorni — jiaozi (ravioli), verdure saltate, zuppe semplici — allo stesso prezzo pagato dai locali."},
   {title:"Passeggiata serale a Nanluoguxiang", time:"Sera", desc:"Uno degli hutong meglio conservati della città, su un asse nord-sud tracciato già 800 anni fa in epoca Yuan. Oggi convivono l'architettura originale — cortili, porte decorate, vicoli laterali — con boutique, caffè e piccoli locali serali, senza aver perso la struttura urbanistica storica. Di sera si anima di luci calde ed è un buon primo assaggio della Pechino che vive dopo il tramonto."},
 ],
 trasporti:"Solo spostamenti brevi a piedi o in metro/taxi in città. Nessuna prenotazione anticipata necessaria.",
 biglietti:"Nessuno.",
 alloggio:"Zona hutong (Dongcheng) — comoda per muoversi a piedi nei primi due giorni.",
 sforzo:"Basso — giornata di adattamento dopo il volo.",
 meteo:"Caldo secco, 28-33°C. Porta acqua e cappello se cammini nel primo pomeriggio.",
 cibo:"Jianbing (crêpe salata di strada) per uno spuntino, cena in un ristorante di quartiere lontano dalle zone turistiche.",
 budget:75,
 budgetLabel:"≈ 75-90 € (hotel, pasti, trasporti locali)",
 foto:"Vicoli grigi degli hutong, biciclette, lanterne rosse alle porte, vita di quartiere.",
 points:[
   {name:"Hutong (Dongcheng)", lat:39.92982, lng:116.40302, place_id:"ChIJJ7C8ISdT8DURDitt8gx6sxE", notes:"Sistemazione e primo giro"},
   {name:"Nanluoguxiang", lat:39.9334746, lng:116.4133492, place_id:"ChIJEQgydS5T8DUReCNPaxLywEo", notes:"Passeggiata serale, street food"}
 ]},

{key:"g2", num:2, illustration:"day-2", city:"PECHINO", nav:"Pechino — Tempio del Cielo", title:"Cina imperiale e vita quotidiana", subtitle:"Tempio del Cielo, hutong, niente musei",
 flag:null,
 attivita:[
   {title:"Tempio del Cielo", time:"Mattina", desc:"Costruito nel 1420 sotto l'imperatore Yongle — lo stesso che avviò la Città Proibita — è il luogo dove per cinque secoli gli imperatori Ming e Qing venivano a officiare i riti in onore del Cielo e a pregare per un buon raccolto, in un giorno preciso dell'anno scandito dal calendario agricolo. Il cuore del complesso, patrimonio UNESCO, è la Sala della Preghiera per il Buon Raccolto: una struttura circolare di 38 metri interamente in legno, costruita senza un solo chiodo, con un tetto a tre livelli di tegole blu-cobalto (il colore del cielo). Tutto il complesso gioca sul simbolismo cerchio-cielo/quadrato-terra tipico della cosmologia cinese. Il grande parco circostante è oggi anche il posto migliore per vedere Pechino svegliarsi: pensionati che fanno tai chi, ballano o cantano l'opera, ben prima che arrivino i turisti."},
   {title:"Hutong e laghi Shichahai", time:"Pomeriggio", desc:"Shichahai è in realtà un sistema di tre laghi collegati, area di svago fin dall'epoca imperiale: sulle sue rive sorgeva la residenza del Principe Gong, il più grande giardino privato Qing mai costruito. Oggi i vialetti alberati di salici, i risciò che offrono giri turistici e i localini affacciati sull'acqua ne fanno una pausa rilassata rispetto al ritmo dei grandi siti monumentali."},
   {title:"Sera: street food o Peking Duck", time:"Sera", desc:"L'anatra alla pechinese nasce come piatto di corte già in epoca Ming, perfezionata nei secoli nella tecnica di laccatura della pelle e cottura in forno aperto. Il ristorante Quanjude, fondato nel 1864, ne ha reso celebre lo stile ancora oggi imitato: pelle croccante affettata al tavolo, servita con crêpe sottilissime, salsa hoisin, cipollotto e cetriolo, da assemblare a piacere in un piccolo involtino."},
 ],
 trasporti:"Metro (linea 5 per il Tempio del Cielo) o taxi/app di ride-hailing.",
 biglietti:"Tempio del Cielo: biglietto acquistabile in loco o online, consigliato prenotare online il giorno prima nei mesi di punta.",
 alloggio:"Stessa zona del Giorno 1.",
 sforzo:"Medio — molto cammino, ma pianeggiante.",
 meteo:"Caldo secco. Il Tempio del Cielo offre poca ombra: meglio andarci presto al mattino.",
 cibo:"Peking Duck la sera — prenota il ristorante con un giorno di anticipo se punti a un locale rinomato.",
 budget:80,
 budgetLabel:"≈ 80-95 € (ingressi, pasti, trasporti)",
 foto:"La Sala della Preghiera per il Buon Raccolto (tetto blu circolare), il grande parco pieno di pechinesi che fanno tai chi al mattino.",
 points:[
   {name:"Tempio del Cielo", lat:39.8821803, lng:116.4066056, place_id:"ChIJ65H_GWBN8DURag4RO0UVLDc", notes:"Mattina"},
   {name:"Shichahai", lat:39.942003, lng:116.382562, place_id:"ChIJKXc8XgVT8DURRVawHKkC6E4", notes:"Pomeriggio/sera"}
 ]},

{key:"g3", num:3, illustration:"day-3", city:"PECHINO → MURAGLIA → TRENO NOTTURNO", nav:"Pechino → Muraglia", title:"Il giorno più intenso di Pechino", subtitle:"Città Proibita, Grande Muraglia, treno per Chengdu",
 flag:"Giornata senza margine: Città Proibita + Tiananmen + trasferimento + Grande Muraglia + rientro + treno notturno. Rischio di arrivare al treno esausti.",
 attivita:[
   {title:"Piazza Tiananmen", time:"Mattina", desc:"La piazza pubblica più grande del mondo (44 ettari), affacciata sull'ingresso principale della Città Proibita. Qui il 1° ottobre 1949 Mao Zedong proclamò la nascita della Repubblica Popolare Cinese, e la piazza resta tuttora il palcoscenico simbolico del potere politico: il Monumento agli Eroi del Popolo, il Mausoleo di Mao e il Grande Museo Nazionale la delimitano sui lati."},
   {title:"Città Proibita", time:"Mattina", desc:"Per 500 anni, dal 1420 al 1912, è stata il centro del potere imperiale e un luogo letteralmente proibito ai comuni cittadini — da qui il nome. Costruita in appena 14 anni sotto l'imperatore Yongle, ha ospitato 24 imperatori tra dinastia Ming e Qing in quasi mille edifici disposti lungo un asse nord-sud perfettamente simmetrico. Ogni dettaglio ha un significato: il giallo delle tegole era riservato all'imperatore, i numeri dispari (come le nove file di borchie sui portoni) rappresentano lo yang imperiale. Vale la pena soffermarsi sulla Porta del Meridiano, ingresso monumentale, e sulla Sala dell'Armonia Suprema, il trono più importante dell'impero, prima di perdersi nei cortili laterali meno affollati."},
   {title:"Grande Muraglia — Juyongguan", time:"Pomeriggio", desc:"La Muraglia nasce in epoca Qin (III secolo a.C.) come collegamento di fortificazioni preesistenti, ma il tratto oggi visibile — inclusa Juyongguan — è quasi interamente opera Ming, ricostruito in mattoni e pietra a partire dal XIV secolo. Juyongguan era uno dei 'Tre Grandi Passi' che proteggevano l'accesso diretto a Pechino attraverso le montagne, ed è oggi meno affollato di Badaling o Mutianyu pur offrendo torri di guardia spettacolari e tratti ripidi che si arrampicano sui crinali."},
   {title:"Treno notturno per Chengdu", time:"Sera", desc:"Chiudere una giornata così densa dormendo mentre il treno attraversa la Cina centrale è un'esperienza in sé: cuccette strette ma funzionali, il dondolio dei binari, e al risveglio un paesaggio completamente diverso da quello lasciato a Pechino."},
 ],
 trasporti:"Città Proibita/Tiananmen a piedi o metro. Juyongguan: circa 1h-1h15 di auto/bus. Treno notturno per Chengdu: verificare orario esatto (in genere 10-13h su alta velocità, ma alcuni convenzionali arrivano a 20h+) — si apre 15 giorni prima della partenza.",
 biglietti:"Città Proibita: quota giornaliera, PRENOTARE ONLINE con giorni di anticipo. Grande Muraglia Juyongguan: meglio online. Treno notturno: prenotare appena disponibile.",
 alloggio:"Nessuno — si dorme in treno.",
 sforzo:"Alto — molto cammino nella Città Proibita più le scalinate della Muraglia.",
 meteo:"Poca ombra sia in Città Proibita che sulla Muraglia — parti presto.",
 cibo:"Pranzo veloce vicino alla Città Proibita, cena leggera prima del treno.",
 budget:185,
 budgetLabel:"≈ 170-200 € (ingressi + treno notturno con cuccetta)",
 foto:"Il Meridian Gate della Città Proibita, i cortili di tegole gialle, la Muraglia che si arrampica sui crinali di Juyongguan.",
 points:[
   {name:"Piazza Tiananmen", lat:39.9054895, lng:116.3976317, place_id:"ChIJ2XRD3Jh2YzYRE1lUrcku6io"},
   {name:"Città Proibita", lat:39.9168038, lng:116.3971621, place_id:"ChIJPdQVRelS8DURnwfTTb3idAY"},
   {name:"Grande Muraglia — Juyongguan", lat:40.287636, lng:116.075906, place_id:"ChIJE6x8PG7t8DURAWZX0T456Pk"},
   {name:"Pechino Ovest (treno per Chengdu)", lat:39.893588, lng:116.321239, place_id:"ChIJY6j_ywlO8DURK4CVJCwnxqk"}
 ]},

{key:"g4", num:4, illustration:"day-4", city:"CHENGDU / LESHAN / EMEISHAN", nav:"Leshan → Emeishan", title:"Buddha gigante e montagna sacra", subtitle:"Storia + paesaggio + religione nello stesso giorno",
 flag:"Dopo una notte in treno, subito Leshan + trasferimento a Emeishan: nessun vero momento di recupero.",
 attivita:[
   {title:"Arrivo a Chengdu", time:"Mattina", desc:"Sceso dal treno notturno, il tempo di un caffè o di uno spuntino prima di rimettersi in viaggio verso Leshan: Chengdu la esplorerai con calma nei prossimi giorni."},
   {title:"Grande Buddha di Leshan", time:"Giorno", desc:"Scolpito direttamente nella parete di roccia tra il 713 e l'803 d.C., in pieno periodo Tang, su iniziativa del monaco buddista Haitong, che voleva placare le pericolose correnti nel punto in cui si incontrano tre fiumi. La leggenda vuole che i detriti di roccia caduti durante la scultura abbiano davvero modificato la corrente, rendendo il tratto più sicuro per la navigazione. Con i suoi 71 metri è il Buddha di pietra più alto del mondo, patrimonio UNESCO: lo si può ammirare da una barca sul fiume per coglierne le proporzioni intere, oppure scendere lungo la scalinata scavata nella roccia che costeggia la statua, per un colpo d'occhio ravvicinato su orecchie e piedi enormi."},
   {title:"Trasferimento a Emeishan", time:"Pomeriggio", desc:"L'Emeishan è una delle Quattro Montagne Sacre del buddismo cinese, associata al bodhisattva Puxian (Samantabhadra). Arrivare in giornata alla base della montagna, nella zona di Baoguo, permette di iniziare la salita con calma il mattino successivo."},
 ],
 trasporti:"Chengdu → Leshan: bus o treno regionale, circa 1h15-1h30. Leshan → Emeishan: bus, circa 1h.",
 biglietti:"Grande Buddha di Leshan: nei weekend estivi le code possono superare 1-2h — valuta l'opzione barca.",
 alloggio:"Zona base dell'Emeishan (Baoguo).",
 sforzo:"Medio-alto, soprattutto se stanchi dal treno.",
 meteo:"Più fresco e spesso piovoso salendo verso l'Emeishan — porta una giacca leggera antipioggia.",
 cibo:"Prima vera cucina Sichuan della zona, meno piccante rispetto a Chengdu città.",
 budget:110,
 budgetLabel:"≈ 100-120 € (ingressi Leshan + area Emeishan + hotel + pasti)",
 foto:"Il Buddha di 71 metri visto dal fiume, la scala a chiocciola intagliata lungo il suo fianco, i primi templi nebbiosi dell'Emeishan.",
 points:[
   {name:"Grande Buddha di Leshan", lat:29.5441309, lng:103.7715369, place_id:"ChIJU3qsm2FO7zYRPkQca_RClhI"},
   {name:"Monte Emei (Emeishan)", lat:29.516007, lng:103.334737, place_id:"ChIJWzR0Peji5TYRTM4lOgRY_hI"}
 ]},

{key:"g5", num:5, illustration:"day-5", city:"EMEISHAN → CHENGDU", nav:"Emeishan → Chengdu", title:"Montagna, non lista della spesa", subtitle:"Priorità a atmosfera, non a 'vedere tutto'",
 flag:null,
 attivita:[
   {title:"Mattina sull'Emeishan", time:"Mattina", desc:"Con i suoi 3.099 metri della vetta dorata (Jinding), l'Emeishan fu sede del primo tempio buddista mai costruito in Cina, il Wannian Si, fondato già nel I secolo d.C. La montagna è oggi patrimonio UNESCO sia naturale che culturale, per la sua straordinaria biodiversità e la ricchezza di templi lungo i sentieri. Alla vetta si trova una statua dorata di 48 metri di Puxian su un elefante a quattro zanne, spesso avvolta in un mare di nuvole che rende l'atmosfera quasi sospesa. Lungo i sentieri più bassi non è raro incrociare macachi tibetani, ormai abituati alla presenza umana (attenzione a cibo e borse aperte)."},
   {title:"Rientro a Chengdu", time:"Pomeriggio", desc:"Discesa verso la pianura del Sichuan: il paesaggio cambia in fretta, dalle foreste di bambù in quota al traffico e ai grattacieli della metropoli."},
   {title:"Sera libera con cena Sichuan", time:"Sera", desc:"Prima vera occasione per godersi Chengdu senza fretta: una cena a base di cucina Sichuan autentica, meno turistica di quella assaggiata il giorno prima verso Emeishan, per prepararsi al giorno dei panda."},
 ],
 trasporti:"Bus navetta + eventuale funivia sull'Emeishan. Emeishan → Chengdu: bus o treno regionale, circa 2h.",
 biglietti:"Ingresso area Emeishan + eventuale funivia, acquistabili in loco.",
 alloggio:"Chengdu centro.",
 sforzo:"Medio — gestibile con pause, ma caldo umido e possibili scalinate.",
 meteo:"In quota può piovere anche se a Chengdu è sereno.",
 cibo:"Vera esperienza gastronomica Sichuan a Chengdu la sera.",
 budget:95,
 budgetLabel:"≈ 90-100 € (trasporti, ingressi residui, hotel, cena)",
 foto:"Scimmie selvatiche lungo i sentieri, templi buddisti nella foresta di bambù, vedute sulla pianura del Sichuan tra le nuvole.",
 points:[
   {name:"Monte Emei (Emeishan)", lat:29.516007, lng:103.334737, place_id:"ChIJWzR0Peji5TYRTM4lOgRY_hI", notes:"Mattina"},
   {name:"Chengdu centro (Tianfu Square)", lat:30.657423, lng:104.065844, place_id:"ChIJy1edVzvF7zYRaOqiGTkmb6I", notes:"Rientro"}
 ]},

{key:"g6", num:6, illustration:"day-6", city:"CHENGDU", nav:"Chengdu — panda", title:"Giornata rilassata: panda, tè, hot pot", subtitle:"Il giorno più 'morbido' del viaggio",
 flag:null,
 attivita:[
   {title:"Base dei Panda Giganti", time:"Mattina", desc:"Fondata nel 1987 con appena 6 panda salvati in natura, la Chengdu Research Base è oggi uno dei centri di ricerca e riproduzione più importanti al mondo per questa specie — un contributo diretto al fatto che, dal 2016, il panda gigante non sia più classificato 'in pericolo' ma 'vulnerabile'. Conviene arrivare all'apertura: nelle prime ore del mattino i panda sono più attivi (dopo si addormentano tra il bambù per il caldo). Oltre ai giganti bianco e nero, la base ospita anche i panda rossi, meno noti ma altrettanto amati da chi li scopre per la prima volta."},
   {title:"Quartieri tradizionali e tea house", time:"Pomeriggio", desc:"Chengdu ha una delle culture della tea house più radicate di tutta la Cina: locali con sedie di bambù dove per il prezzo di una tazza di tè ci si può fermare per ore, tradizione che un tempo includeva perfino artigiani itineranti specializzati nella pulizia delle orecchie. Il People's Park, con il suo storico Heming Teahouse affacciato su un laghetto, è il posto giusto per viverla, insieme all'angolo del parco informalmente dedicato agli annunci matrimoniali dei genitori in cerca di un partner per i figli."},
   {title:"Jinli Ancient Street", time:"Sera", desc:"Strada commerciale ricostruita in stile Qing, adiacente al tempio dedicato a Zhuge Liang, il celebre stratega del Regno di Shu Han durante l'epoca dei Tre Regni (III secolo d.C.) — periodo storico di cui Chengdu fu capitale. Oggi è piena di bancarelle di street food, artigianato e teahouse, buona base per la cena hot pot serale nei dintorni."},
   {title:"Sichuan hot pot", time:"Sera", desc:"Il rito conviviale per eccellenza del Sichuan: un pentolone bollente al centro del tavolo, spesso diviso 'yin yang' tra brodo piccante con pepe di Sichuan e brodo semplice, in cui immergere carne, verdure e tofu a piacere. Un'esperienza tanto quanto un pasto — da vivere in compagnia, con calma."},
 ],
 trasporti:"Panda base: metro + navetta, o taxi diretto (circa 40 min dal centro).",
 biglietti:"Panda base: biglietto online consigliato, arrivare all'apertura.",
 alloggio:"Stessa zona del Giorno 5.",
 sforzo:"Basso — giornata pensata per recuperare energie.",
 meteo:"Caldo umido: la mattina presto è il momento più fresco.",
 cibo:"Sichuan hot pot la sera — chiedi 'wei la' (poco piccante) se necessario.",
 budget:98,
 budgetLabel:"≈ 90-105 € (ingresso panda, hotel, hot pot, tea house)",
 foto:"Cuccioli di panda nella nebbia mattutina, foglie di tè che si aprono in una teiera di vetro, il fumo rosso dell'hot pot.",
 points:[
   {name:"Base dei Panda Giganti", lat:30.732969, lng:104.14581, place_id:"ChIJ8VuaD-DQ7zYRd5EYh3BjzdM", notes:"Arrivare all'apertura"},
   {name:"People's Park", lat:30.657132, lng:104.057246, place_id:"ChIJlZD4VSHF7zYRv59cxjF5vPY"},
   {name:"Jinli Ancient Street", lat:30.644859, lng:104.049974, place_id:"ChIJIT0ZCOPE7zYR30Zs5J35lxY", notes:"Hot pot serale nei dintorni"}
 ]},

{key:"g7", num:7, illustration:"day-7", city:"CHENGDU → ZHANGJIAJIE", nav:"Chengdu → Zhangjiajie", title:"Trasferimento e Tianmen Mountain", subtitle:"Giornata già densa di per sé",
 flag:"Treno lungo (4-6h, spesso con cambio a Chongqing) seguito subito da Tianmen Mountain: possibile arrivo già stanco per un'attrazione impegnativa.",
 attivita:[
   {title:"Treno verso Zhangjiajie", time:"Mattina", desc:"Il collegamento attraversa parte dell'entroterra montuoso della Cina centrale: un buon momento per riposare dopo i giorni intensi di Chengdu, prima di una delle attrazioni più spettacolari dell'intero viaggio."},
   {title:"Tianmen Mountain", time:"Pomeriggio", desc:"Un'unica montagna, quattro esperienze diverse. Ci si sale con la funivia più lunga del mondo (7.455 metri), che offre già di per sé vedute mozzafiato sulla celebre 'strada delle 99 curve' che si arrampica a tornanti verso la cima (il numero 99 non è casuale: nella cultura cinese richiama la longevità e la perfezione). In vetta si apre la Tianmen Cave, un arco naturale alto oltre 130 metri formatosi per il crollo della montagna — da cui il nome 'Portale del Paradiso', reso celebre anche da gare internazionali di wingsuit flying che vi si tengono. Per raggiungerlo a piedi si affrontano 999 gradini, numero simbolico nel buddismo e taoismo cinese. Chi non soffre di vertigini può poi camminare sul Glass Skywalk, una passerella di vetro sospesa sul vuoto lungo il fianco della montagna."},
   {title:"Sera tranquilla", time:"Sera", desc:"Dopo un pomeriggio così intenso, una cena leggera e riposo: da domani inizia il vero cuore naturalistico del viaggio."},
 ],
 trasporti:"Treno alta velocità Chengdu → Zhangjiajie: pochi diretti (4-6h); più frequente il cambio a Chongqing (circa 4h30-5h totali). Prenotare appena si apre la vendita.",
 biglietti:"Tianmen Mountain: biglietto combinato funivia + parco, meglio online — quota giornaliera limitata in alta stagione.",
 alloggio:"Zona Zhangjiajie centro/Tianmen.",
 sforzo:"Alto — 999 gradini e Skywalk non adatto a chi soffre di vertigini.",
 meteo:"Possibile nebbia che riduce la visibilità dallo Skywalk.",
 cibo:"Cucina Hunan locale, più affumicata e meno 'intorpidente' del Sichuan.",
 budget:170,
 budgetLabel:"≈ 160-180 € (treno + Tianmen + hotel + pasti)",
 foto:"Il 'Portale del Paradiso' visibile dalla funivia, lo Skywalk di vetro sospeso sul vuoto, le 999 gradinate scavate nella roccia.",
 points:[
   {name:"Zhangjiajie centro", lat:29.117744, lng:110.479285, place_id:"ChIJz1oKfcqvmzYRqLDwxmNewsE"},
   {name:"Tianmen Mountain", lat:29.046809, lng:110.482084, place_id:"ChIJz7mBDfmwmzYRWPIk9Fgr6AU", notes:"Pomeriggio"}
 ]},

{key:"g8", num:8, illustration:"day-8", city:"ZHANGJIAJIE NATIONAL FOREST PARK", nav:"Zhangjiajie — parco", title:"Il grande giorno naturalistico", subtitle:"Priorità assoluta al paesaggio",
 flag:"Caldo umido + molto cammino/scalinate: giornata fisicamente impegnativa.",
 attivita:[
   {title:"Wulingyuan", time:"Ingresso", desc:"Il cuore del parco nazionale di Zhangjiajie, il primo parco forestale nazionale della Cina (istituito nel 1982) e patrimonio naturale UNESCO dal 1992. Le sue oltre 3.000 guglie di arenaria, alte fino a 200 metri e ricoperte di vegetazione, sono un paesaggio unico al mondo, spesso avvolto da nebbie che le fanno sembrare sospese nel vuoto."},
   {title:"Yuanjiajie", time:"Giorno", desc:"È qui che si trova il pilastro roccioso diventato celebre come ispirazione per le 'Montagne Fluttuanti di Allelujah' del film Avatar — nel 2010 uno dei picchi è stato ufficialmente rinominato in omaggio al film dopo la visita del regista James Cameron nel 2008. Da non perdere anche il 'Primo Ponte sotto il Cielo', un arco di roccia naturale che collega due picchi a oltre 350 metri di altezza."},
   {title:"Tianzi Mountain", time:"Giorno", desc:"Il nome, 'Montagna del Figlio del Cielo', ricorda Xiang Dagun, capo di una rivolta contadina di epoca Ming che si autoproclamò appunto 'Tianzi'. Le sue vette — tra cui le celebri 'Guglie del Pennello Imperiale', che ricordano pennelli da calligrafia piantati nella roccia — offrono alcuni dei panorami più fotografati di tutto il parco, spettacolari soprattutto all'alba o al tramonto."},
   {title:"Bailong Elevator", time:"Giorno", desc:"Costruito nel 2002 e scavato direttamente nella parete di un canyon, con i suoi 326 metri è l'ascensore panoramico esterno più alto del mondo: un'opera ingegneristica che all'epoca sollevò polemiche ambientali, ma che oggi è diventata essa stessa un'attrazione, capace di portare in pochi secondi dalla base alle vette del parco."},
 ],
 trasporti:"Bus navetta interni al parco (inclusi nel biglietto), più eventuale funivia/ascensore Bailong.",
 biglietti:"Ingresso parco valido più giorni consecutivi (utile se piove il primo giorno); Bailong Elevator a parte.",
 alloggio:"Zona Wulingyuan, ai margini del parco.",
 sforzo:"Alto — molte scalinate, caldo umido, giornata lunga a piedi.",
 meteo:"Nebbia mattutina frequente: le viste migliori spesso arrivano tardo mattino/primo pomeriggio.",
 cibo:"Punti ristoro semplici dentro il parco; cena più curata al rientro a Wulingyuan.",
 budget:102,
 budgetLabel:"≈ 95-110 € (ingresso parco, ascensore, hotel, pasti)",
 foto:"I celebri pilastri di arenaria che hanno ispirato i paesaggi di Avatar, avvolti da nebbia; il Bailong Elevator, il più alto ascensore panoramico esterno al mondo.",
 points:[
   {name:"Wulingyuan (ingresso)", lat:29.335749, lng:110.481305, place_id:"ChIJUyM0FVwGmzYRBZfSzn_jkI8"},
   {name:"Bailong Elevator", lat:29.3458, lng:110.47254, place_id:"ChIJo_bz4ssImzYRjLCYrvAyJ_4"},
   {name:"Yuanjiajie", lat:29.239503, lng:110.543465, place_id:"ChIJjaalRsCnmzYRMospYYi0Uao"},
   {name:"Tianzi Mountain", lat:29.379323, lng:110.463655, place_id:"ChIJwbGc8zAEmzYR-lSxqBcxNog"}
 ]},

{key:"g9", num:9, illustration:"day-9", city:"ZHANGJIAJIE → FURONG → FENGHUANG", nav:"Furong → Fenghuang", title:"Il trasferimento diventa parte del viaggio", subtitle:"Villaggio sulla cascata, poi la città antica",
 flag:"Doppio trasferimento in un solo giorno: verificare per tempo la durata reale delle tratte.",
 attivita:[
   {title:"Furong, il villaggio sulla cascata", time:"Mattina", desc:"Oltre 2.000 anni di storia per questo villaggio il cui nome originale, Wangcun, fu sostituito da 'Furong' ('loto') dopo che nel 1986 vi fu girato il celebre film cinese 'Hibiscus Town'. La sua particolarità è unica: le case in stile diaojiaolou, costruite su palafitte di legno, si affacciano su una cascata che scorre letteralmente sotto e attraverso l'abitato, visibile anche dai ponti che collegano le diverse parti del villaggio."},
   {title:"Passeggiata e pranzo veloce", time:"Mattina", desc:"Il villaggio si visita in poche ore: vicoli acciottolati, botteghe di artigianato locale e punti panoramici sulla cascata da cui scattare le foto più iconiche della tappa."},
   {title:"Trasferimento a Fenghuang", time:"Pomeriggio", desc:"Si arriva in una delle città antiche meglio conservate della Cina meridionale, sul fiume Tuo, abitata storicamente da minoranze Miao e Tujia e città natale dello scrittore Shen Congwen, tra i più importanti della letteratura cinese del '900. Il primo scorcio serale, con le prime luci che si accendono sul fiume, è già un assaggio di ciò che vedrai nei prossimi due giorni."},
 ],
 trasporti:"Zhangjiajie → Furong: circa 2-2h30 in auto/bus privato. Furong → Fenghuang: circa 1h30-2h. Consigliato un driver/transfer privato.",
 biglietti:"Ingresso al villaggio di Furong, acquistabile in loco.",
 alloggio:"Fenghuang, idealmente con vista sul fiume Tuojiang.",
 sforzo:"Basso fisicamente, ma giornata lunga per gli spostamenti.",
 meteo:"Caldo umido; le passeggiate a Furong sono brevi ma senza molta ombra.",
 cibo:"Assaggi rapidi a Furong, cena più tranquilla a Fenghuang la sera.",
 budget:100,
 budgetLabel:"≈ 90-110 € (transfer privato, ingresso Furong, hotel, pasti)",
 foto:"La cascata che attraversa letteralmente il villaggio di Furong, case di legno sospese sull'acqua, il primo scorcio serale di Fenghuang.",
 points:[
   {name:"Furong (villaggio sulla cascata)", lat:28.76734, lng:109.97484, place_id:"ChIJ1YIBs6kYmjYR36NFDuO176c"},
   {name:"Fenghuang", lat:27.952017, lng:109.600609, place_id:"ChIJ7cC3COkqmDYRkDzEFdr7F_4"}
 ]},

{key:"g10", num:10, illustration:"day-10", city:"FENGHUANG", nav:"Fenghuang", title:"La città che non va riempita artificialmente", subtitle:"Fenghuang storica e il tramonto sul fiume",
 flag:null,
 attivita:[
   {title:"Fenghuang storica", time:"Mattina", desc:"'Fenghuang' significa 'fenice', e la città che porta questo nome conserva ancora le mura difensive costruite in epoca Qing, quando era un avamposto militare ai confini dell'impero verso i territori Miao. Il monumento più fotografato è l'Hong Qiao, un ponte coperto a due piani che attraversa il fiume Tuojiang, oggi trasformato in una piccola galleria di negozi e punti panoramici. Vale la pena perdersi tra i vicoli acciottolati paralleli al fiume, tra le case in legno costruite su palafitte che si specchiano nell'acqua."},
   {title:"Pomeriggio libero", time:"Pomeriggio", desc:"Un raro momento del viaggio senza programma fisso: bene usarlo per rallentare davvero, magari con un tè in un locale affacciato sul fiume o una passeggiata senza meta tra i vicoli meno battuti."},
   {title:"Fenghuang al tramonto", time:"Sera", desc:"Il momento migliore della giornata: quando il sole cala, le case sulle palafitte e i ponti coperti si accendono di luci calde e lanterne rosse, riflesse nell'acqua del Tuojiang. È probabilmente lo scorcio più suggestivo di tutto il viaggio, e merita di essere vissuto con calma, magari da uno dei ponti o da un bar con terrazza sul fiume."},
 ],
 trasporti:"Tutto a piedi, la città vecchia è compatta.",
 biglietti:"Alcuni siti richiedono un biglietto cumulativo — verificare in loco o online.",
 alloggio:"Stessa guesthouse del Giorno 9, idealmente con vista fiume.",
 sforzo:"Basso — giornata pensata per rallentare.",
 meteo:"Caldo umido di giorno, serate più gradevoli lungo il fiume.",
 cibo:"Cena locale con vista sul Tuojiang.",
 budget:78,
 budgetLabel:"≈ 70-85 € (eventuali ingressi, hotel, pasti)",
 foto:"Le case di legno su palafitte lungo il fiume Tuojiang illuminate al tramonto, i ponti coperti, i riflessi delle lanterne rosse.",
 points:[
   {name:"Fenghuang Bridge", lat:27.952017, lng:109.600609, place_id:"ChIJ7cC3COkqmDYRkDzEFdr7F_4", notes:"Di giorno"},
   {name:"Fenghuang, lungofiume Tuojiang", lat:27.9484299, lng:109.59832, place_id:"ChIJU7AqpP99lzYRxiv3b5fuAOs", notes:"Al tramonto"}
 ]},

{key:"g11", num:11, illustration:"day-11", city:"FENGHUANG → SHANGHAI", nav:"Fenghuang → Shanghai", title:"Il trasferimento più lungo del viaggio", subtitle:"Probabile volo, non treno diretto",
 flag:"Non esiste un collegamento diretto comodo Fenghuang-Shanghai: servirà quasi certamente un volo (da Tongren-Fenghuang o Zhangjiajie) oppure un lungo treno con cambio a Changsha. Prenotare questa tratta per prima.",
 attivita:[
   {title:"Trasferimento a Shanghai", time:"Giorno", desc:"La tratta più lunga e logisticamente complessa del viaggio: quasi certamente un volo interno, da vivere come una parentesi di puro trasferimento tra due mondi completamente diversi — dalla Cina rurale e montuosa dell'Hunan alla metropoli più internazionale del paese."},
   {title:"Il Bund", time:"Sera", desc:"Shanghai diventò porto aperto al commercio internazionale nel 1843, dopo la Prima Guerra dell'Oppio, e il Bund — la storica passeggiata lungo il fiume Huangpu — ne è la testimonianza architettonica più evidente: oltre 50 edifici in stile neoclassico, art déco e neorinascimentale costruiti tra Otto e Novecento da banche e società commerciali straniere, tanto da essere definito un vero e proprio 'museo di architettura mondiale'. Sulla riva opposta, il contrasto è totale: lo skyline di Pudong, sviluppato quasi dal nulla a partire dagli anni '90, con la Oriental Pearl Tower (1994), la Jin Mao Tower, lo Shanghai World Financial Center (soprannominato 'l'apribottiglie' per la sua forma) e la Shanghai Tower, secondo edificio più alto del mondo."},
   {title:"Passeggiata serale e cena", time:"Sera", desc:"Prima cena a Shanghai, con sapori più delicati e meno piccanti rispetto a Sichuan e Hunan: un buon modo per iniziare ad abituare il palato alla cucina orientale prima degli ultimi giorni di viaggio."},
 ],
 trasporti:"Volo da Tongren-Fenghuang o Zhangjiajie a Shanghai (1.5-3h di volo + tempi aeroporto), oppure treno con cambio a Changsha (7h+ totali).",
 biglietti:"Volo interno da prenotare non appena le date sono confermate.",
 alloggio:"Zona Bund o Jing'an.",
 sforzo:"Basso fisicamente, ma giornata logisticamente pesante.",
 meteo:"Shanghai è la città più calda e umida del percorso: prevedi afa forte anche di sera.",
 cibo:"Prima cena a Shanghai, sapori più delicati rispetto a Sichuan e Hunan.",
 budget:230,
 budgetLabel:"≈ 200-260 € (volo interno + hotel + pasti)",
 foto:"Lo skyline di Pudong che si accende al calare del sole, visto dal lungofiume del Bund.",
 points:[
   {name:"The Bund", lat:31.2402611, lng:121.490577, place_id:"ChIJYUiHi1dwsjURZK_REO37Vk0", notes:"Arrivo con volo interno, poi prima serata"}
 ]},

{key:"g12", num:12, illustration:"day-12", city:"SHANGHAI", nav:"Shanghai — Yuyuan", title:"Antica e futuristica insieme", subtitle:"Yuyuan, Zhujiajiao, crociera sull'Huangpu",
 flag:null,
 attivita:[
   {title:"Yuyuan Garden", time:"Mattina", desc:"Fatto costruire nel 1559, in epoca Ming, dall'alto funzionario Pan Yunduan come dono per i genitori, è un classico esempio di giardino della zona dello Jiangnan: rocce artificiali che imitano montagne in miniatura, stagni con carpe koi, padiglioni collegati da corridoi a zig-zag pensati per rallentare il passo e cambiare prospettiva a ogni angolo. Accanto sorge il bazar di Yuyuan, con la celebre Sala da Tè Huxinting al centro di un laghetto, che secondo la tradizione ispirò il motivo decorativo 'willow pattern' diffuso poi in tutto il mondo sulle ceramiche in stile cinese."},
   {title:"Zhujiajiao, villaggio d'acqua", time:"Pomeriggio", desc:"Chiamato la 'Venezia di Shanghai', questo villaggio ha circa 1.700 anni di storia e conserva ancora oggi una rete di canali attraversati da ponti in pietra, il più celebre dei quali è il Fangsheng Bridge, a cinque arcate, risalente all'epoca Ming. Un giro in barca a remi lungo i canali, tra case tradizionali e piccoli mercati, è il modo migliore per viverlo."},
   {title:"Huangpu River Cruise", time:"Sera", desc:"La chiusura perfetta per il viaggio: una crociera serale sul fiume Huangpu che scorre proprio tra le due anime della città, il Bund storico da un lato e lo skyline futuristico di Pudong dall'altro, entrambi illuminati. Un'ultima cena speciale per festeggiare la fine di un itinerario lunghissimo."},
 ],
 trasporti:"Old City/Yuyuan: metro o a piedi dal Bund. Zhujiajiao: circa 1h in metro/bus dal centro (linea 17 + navetta).",
 biglietti:"Yuyuan Garden: in loco. Huangpu River Cruise: consigliato online, soprattutto per gli orari serali.",
 alloggio:"Stessa zona del Giorno 11.",
 sforzo:"Medio — giornata piena ma senza scalinate impegnative.",
 meteo:"Caldo umido intenso: pianifica Zhujiajiao nelle ore più fresche.",
 cibo:"Xiaolongbao a Yuyuan, cena finale più curata la sera.",
 budget:120,
 budgetLabel:"≈ 110-130 € (ingressi, crociera, hotel, pasti)",
 foto:"Il giardino Yuyuan con padiglioni e stagni di carpe koi, i canali e i ponti ad arco di Zhujiajiao, lo skyline di Pudong dal fiume.",
 points:[
   {name:"Yu Garden", lat:31.2272355, lng:121.4920939, place_id:"ChIJidPZMUGHrTUR29eIuHbpoIQ"},
   {name:"Zhujiajiao, villaggio d'acqua", lat:31.1143702, lng:121.053999, place_id:"ChIJrWDlybX5sjURIN1UyXg53qM"},
   {name:"Shanghai Tower / skyline Pudong", lat:31.233518, lng:121.505618, place_id:"ChIJcT52JmpwsjURKKp8uyIQKjU", notes:"Sera, crociera Huangpu"}
 ]},

{key:"g13", num:13, illustration:"day-13", city:"SHANGHAI", nav:"Shanghai — partenza", title:"Partenza", subtitle:"Ultima colazione, ultima passeggiata",
 flag:null,
 attivita:[
   {title:"Colazione con calma", time:"Mattina", desc:"Ultimo risveglio in Cina: il tempo di metabolizzare tredici giorni densissimi prima del rientro, magari sfogliando le foto del viaggio davanti a un'ultima colazione locale."},
   {title:"Ultima passeggiata", time:"Mattina", desc:"Se l'orario del volo lo consente, un'ultima camminata senza meta per congedarsi dalla città — o per tornare in un posto che si è amato particolarmente nei giorni precedenti."},
   {title:"Trasferimento in aeroporto", time:"Giorno", desc:"Il Maglev di Shanghai, inaugurato nel 2004, è stato il primo treno a levitazione magnetica al mondo in servizio commerciale: copre gli oltre 30 km fino all'aeroporto di Pudong in circa 8 minuti, toccando punte di 300 km/h — un ultimo piccolo brivido tecnologico prima di lasciare la Cina."},
 ],
 trasporti:"Maglev o metro per l'aeroporto di Pudong (il Maglev copre la tratta in circa 8 minuti a 300 km/h).",
 biglietti:"Nessuno oltre al volo di rientro.",
 alloggio:"Check-out mattutino.",
 sforzo:"Nullo.",
 meteo:"—",
 cibo:"Ultima colazione secondo l'orario del volo.",
 budget:25,
 budgetLabel:"≈ 20-30 € (transfer aeroporto, colazione)",
 foto:"—",
 points:[
   {name:"Aeroporto di Shanghai Pudong", lat:31.1443439, lng:121.808273, place_id:"ChIJwVCVdt6PrTURXzUsyXET5Mk"}
 ]},
];

export const closing = [
  {key:"overview-map", eyebrow:"Riferimento", title:"Mappa d'insieme", subtitle:"L'intero percorso in una sola vista",
   isOverviewMap:true, sections:[]},
  {key:"checklist", eyebrow:"Riferimento", title:"Checklist pre-partenza", subtitle:"Ora interattiva — la trovi anche negli Strumenti",
   sections:[
    {h:"Documenti", p:["Passaporto con 6+ mesi di validità residua","E-Arrival Card compilata (entro 24h dall'arrivo)","Assicurazione viaggio salvata offline","Prenotazioni hotel/treni/volo interno salvate offline"]},
    {h:"App e pagamenti", p:["VPN installata e testata","Alipay/WeChat Pay collegata a carta straniera","Traduttore offline con fotocamera","Mappe offline scaricate"]},
    {h:"Da valigia", p:["K-way leggero (per Emeishan e possibili piogge estive)","Scarpe da cammino comode (Città Proibita, Zhangjiajie, 999 gradini)","Powerbank (prese cinesi tipo A/I, verifica adattatore)","Contante di riserva in yuan per piccole spese"]},
   ]},
];
