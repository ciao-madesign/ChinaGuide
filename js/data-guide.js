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
 tappe:["Sistemazione in hotel","Passeggiata negli hutong","Primo street food","Cena cinese in un locale non turistico","Passeggiata serale"],
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
 tappe:["Mattina: Tempio del Cielo + passeggiata nei quartieri circostanti","Pomeriggio: hutong, eventualmente laghi Shichahai","Sera: street food o Peking Duck"],
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
 tappe:["Mattina: Città Proibita + Piazza Tiananmen","Pomeriggio: trasferimento a Juyongguan + Grande Muraglia","Sera: rientro in città, cena veloce, treno notturno per Chengdu"],
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
 tappe:["Arrivo a Chengdu in mattinata","Trasferimento a Leshan (Grande Buddha)","Trasferimento a Emeishan, pernottamento in zona"],
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
 tappe:["Mattina sull'Emeishan: templi, foresta, panorami","Rientro a Chengdu nel pomeriggio","Sera libera con cena Sichuan"],
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
 tappe:["Mattina: Chengdu Research Base of Giant Panda Breeding","Pomeriggio: quartieri tradizionali, tea house, People's Park","Sera: Sichuan hot pot"],
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
 tappe:["Mattina: treno verso Zhangjiajie","Pomeriggio: Tianmen Mountain (funivia, Skywalk, Tianmen Cave, 999 Steps)","Sera tranquilla"],
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
 tappe:["Wulingyuan (ingresso)","Yuanjiajie","Tianzi Mountain","Bailong Elevator"],
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
 tappe:["Mattina: trasferimento a Furong (villaggio sulla cascata)","Passeggiata, foto, pranzo veloce","Pomeriggio: trasferimento a Fenghuang, arrivo in giornata"],
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
 tappe:["Mattina: Fenghuang storica, ponti coperti, case sul Tuojiang, vicoli","Pomeriggio libero","Sera: Fenghuang al tramonto — fiume, case tradizionali, lanterne"],
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
 tappe:["Trasferimento a Shanghai (probabile volo)","Arrivo e prima immersione: Bund, skyline di Pudong","Passeggiata serale e cena"],
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
 tappe:["Mattina: Shanghai Old City, Yuyuan Garden, strade tradizionali","Pomeriggio: Zhujiajiao, villaggio d'acqua","Sera: Huangpu River Cruise, cena finale"],
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
 tappe:["Colazione con calma","Ultima passeggiata, se l'orario del volo lo consente","Trasferimento in aeroporto"],
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
