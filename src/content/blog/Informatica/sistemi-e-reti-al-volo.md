---
title: Sistemi e reti al volo
description: Lezione introduttiva si protocolli che regolano lo scambio di informazioni su internet
pubDate: 2026/03/27
---
Una **rete** è un gruppo di più computer o apparecchi informatici connessi tra loro.

**Internet** è la grande rete globale decentralizzata che utilizza degli standard comuni per la condivisione di informazioni.

Le tecnologie fisiche con cui i dati sono trasmessi sono solitamente **ethernet** (cablate e preferibili su larga scala) o **wifi** (non cablate).

[ La comunicazione cablata, ovvero il passaggio di serie di bit da una macchina all'altra via ethernet, avviene con quelchel'è collision detection, mentre wifi, siccome è come se l'aria fosse un canale di trasmissione condivisio, usa collision avoidance. Spiegare in breve ]

Come funzionano:
Ogni pc è identificato da un codice chiamato **mac address**.
es: A1:B4:C5:C1:D3:EE (6B o 48b rappresentati in esadecimale).
Ogni codice è teoricamente univoco in tutto il mondo e cablato nell'hardware.

I messaggi ethernet possono essere inviati o in **broadcast** (a tutta la rete, può essere fatto solo su reti locali, chiaramente non sull'intero internet) oppure in **unicast**, conoscendo il mac address del destinatario.

Ma anche i messaggi unicast funzionano solo su piccole reti locali (mando una richiesta ethernet nella rete locale, il router ha uno switch, e inoltra il messaggio solo al mio destinatario dove 1 cavo = 1 mac). CONFERMARE. Su scala globale ciò sarebbe impossibile perchè è impossibile sapere dove instradare le richieste per ogni indirizzo.
Per questo mentre ethernet rimane la base per le comunicazioni tra macchine collegate tra loro fisicamente, a livello di rete si usano gli indirizzi di rete chiamati **IP**
es: 35.143.25.12 (32b o 4B).
Gli indirizzi IP a differenza di mac hanno una struttura gerarchica e quindi sono più facili da gestire su grande scala (esempio: dal prefisso posso sapere in che parte del mondo mandare la richiesta senza sapere esattamente a quale ip specifico).

Come funziona questo procedimento? Come fa una richiesta per viaggiare nella rete globale e raggiungere la macchina con l'ip a cui è destinata?

Abbiamo visto che ethernet funziona con indirizzi mac, quindi prima di tutto serve un metodo per capire quale indirizzo mac è associato all'ip che si vuole raggiungere. Inoltre è necessario, per essere parte di una rete, avere associato un proprio indirizzo ip. 

**Ottenimento indirizzo ip**:
Esistono dei server, ovvero macchine connesse in una rete, chiamati **DHCP**, che servono per questo scopo.

Nota: Una macchina che vuole connettersi alla rete si chiama **client**. In generale un client è un memebro di una rete quando invia una richiesta, mentre un **server** è colui che viene interpellato producento la risposta. Un server può agire da client facendo richieste ad altri server.

Viene seguito il procedimento **DORA**
**Discovery**: Un client fa una chiamata ethernet in broadcast aspettandosi almeno una risposta da un server DHCP.
**Offer**: Queste risposte propongono alla macchina di essere assegnata ad un ip.
**Request**: Il client deve allora fare una richiesta formale al DHCP che ha scelto di utilizzare, proprio perchè potrebbero esistere diversi DHCP in una stessa rete locale (anche se solitamente, in ambito casalingo è il router stesso a fare da DHCP).
**Acknowledge**: Il DHCP manda un ultimo messaggio di conferma, contenente:
- L'**IP** assegnato, univoco localmente (unico solo entro la rete locale). Solitamente gli ip locali sono nel formato 192.168.x.x.
- L'IP del **gateway** o **router**: questo non sempre coincide col server DHCP specialmente in grosse reti locali come reti aziendali. È il riferimento a cui ogni client manda tutte le propre richieste e che gestisce l'instradamente ip su rete globale.
- La **subnet mask**: es. 255.255.255.0 è un codice di 4 byte usato per calcolare se l'ip di un server è parte della stessa rete locale rispetto all'ip assegnato al client. (Il calcolo è semplice ma lo ometto per brevità)
- IP del **server DNS** es. 8.8.8.8 (ip dns di google) è spiegato più avanti.

**Trovare mac associato a un ip:**
Aka: rovare il mac del dispositivo che corrisponde all'ip che si vuole raggiungere per comunicare con esso via ethernet.

Si usa il protocollo **ARP**.
Aka Address Resolution Protocol

Innanzi tutto si applica la subnet mask al proprio ip e a quello destinatario. Se i risultati sono uguali i due pc si trovano nella stessa **LAN** (local area network, rete locale) e questo permette di comunicare con il protocollo ethernet. Se il server si trovasse in un altra sottorete, bisognerebbe indirizzare la propria richiesta verso il router, per instradamento sulla rete globale (vedi dopo).

Ogni pc tiene una **arp cache** (memoria di operazioni precedenti) contenente le associazioni di ip-mac già fatte in passato.
Se non è presente l'ip che si vuole raggiungere viene fatta una richiesta in broadcast (come per trovare il dhcp) ricevendo solo una risposta dalla macchina con l'ip corrispondente la quale indicherà il proprio mac. Da qui in poi i due dispositivi potranno scambiare messaggi ethernet diretti in unicast.

**Routing**
Ovvero come i router collegati tra loro permettono a un client di una LAN di raggiungere un server in una rete lontana.

Innanzi tutto un server per essere raggiungibile all'esterno della propria LAN deve avere assegnato, oltre all'IP locale, un IP univoco su scala globale. (Qui non mi addentro. So solo che vanno comprati e che vanno configurati nel proprio DHCP).

Semplicemente le richieste quando non sono indirizzate alla rete locale vengono indirizzate al router il quale possiede delle **routing tables**, ovvero delle tabelle contenenti vasti range di ip address, suddivisi in base ai prefissi, associati agli ip di altri router a cui è connesso il proprio (raggiungibili via arp).
In questo modo una richiesta viaggia via ethernet di router in router, fino a raggiungere il suo destinatario.

**DNS**
Solitamente gli esseri umani non ragionano per indirizzi IP ma per nomi dominio come www.google.com. Ogni nome dominio è associato univocamente a un indirizzo ip e queste associazioni sono salvate su grandi server chiamati **Domain Name Systems**.
Semplicemente per raggiungere una destinazione conoscendone solo il nome di dominio è necessario passare prima per un server DNS per ottenere l'ip corrispondente.
Come abbiamo visto il server DNS di riferimento è assegnato dal DHCP in fase di assegnazione dell'ip.

**UDP e TCP**
Quanto descritto sopra è sufficiente affinchè un messaggio inviato da una macchina connessa in rete ne raggiunga un altra.
Ora è necessario un protocollo per regolare la comunicazione e lo scambio di messaggi.
In particolare **UDP** (acronimo?) permette di gestire il multiplexing delle applicazioni, ovvero permettere a un client di indicare insieme all'ip del server che vuole raggiungere, un numero di porta (16b o 2B) per indicare con quale processo o servizio interno al server vuole interagire. es. 192.168.13.4:3000

CONVENZIONI PORTE

Un messaggio inviato con UDP, assieme ai dati include:
- Porta di destinazione
- Dimensione dei dati trasmessi (per verificare che siano arrivati tutti)
- Checksum (un numero di controllo per verificare che i dati siano integri)
In UDP si ha invio di messaggi bidirezionale e continuo senza alcuna regola ne controllo.
I messaggi non validi sono semplicemente scartati.

**TCP** (acronimo?) aggiunge funzionalità all'UDP che lo rendono più lento, garantendo però una maggiore sicurezza sulla corretta trasmissione dei dati.
Si basa su un **handshake a tre vie**, ovvero uno scambio di 3 messaggi per stabilire una connessione:
- **SYN**: il client manda un messaggio di **sincronizzazione** per richiedere una connessione
- **SYN-ACK**: IL server risponde per confermare di aver riscontrato (**acknowledge**) la richiesta di **sincronizzazione**
- **ACK**: il client manda un'ultimo riscontro per confermare al server di aver ricevuto il suo riscontro.

Questo processo permette di aprire una connessione. Ciò significa che client e server hanno aperto una cosiddetta **socket**, uno spazio di memoria volatile dedicato, dove tengono traccia dei dati sulla comunicazione in corso.

Inoltre TCP aggiunge ai messaggi anche un numero seriale usato per verificare che i messaggi arrivino in ordine, e implementa un meccanismo per la ritrasmissione dei dati persi o corrotti.

**HTTP**
Definite le metodologie per scambiare messaggi è necessario che i mesaggi siano scritti in un formato comprensibile a entrambi gli interlocutori. Http definisce quel formato e le regole della conversazione (es. Finchè parlo io non parli tu, e viceversa. Oppure io domando te rispondi).

VERSIONI HTTP E MODELLO CHIAMATA RISPOSTA. Https comunicazioni birmdirezionali ecc...

Esempio di una **richiesta** http/1.1:

```
POST /api/path HTTP/1.1
Host: www.ilmioserver.com
Accept: text/html
Accept-Charset: UTF-8
Connection: Keep-Alive
Content-Length: 23

Messaggio per il server

```

La prima riga contiene l'intestazione dove sono scritte in ordine:
1. Il **metodo** della richiesta: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS sono le più note.
**GET** indica che la richiesta non contiene un body.
**POST** è una richiesta che contiene anche un body.
**PUT** è un tipo di post che indica che si vuole caricare un contenuto del server.
**PATCH** indica che si vuole modificare un contenuto del server 
**DELETE** indica che si vuole eliminare hn contenuto del server.
2. Il **percorso** della risorsa che si vuole ottenere
3. La **versione** di http che si vuole utilizzare.
Possono essere totalmente arbitrari, ma questi sono standard universali.

Le righe successive alla riga di intestazione, contengono ciascuna una coppia di chiave-valore, dette **headers**. Questi sono metadati agiuntivi relativi alla  richiesta.
Esempi:
- Content-Length: indica quanto è lungo il messaggio trasmesso
- Content-Type: indica il formato dei dati trasmesso (es: testo, html, css, js, json, jpg ecc)
- Accept: il formato dei dato che ci si aspetta di ottenere
- Date
ecc...

Infine viene inviato il **body** il messaggio vero e proprio che si vuole trasmettere. Il body inizia dopo la prima linea vuota presente dopo gli headers.

Questo messaggio non è trasmesso tutto in una volta, ma viaggia per internet in molti pacchetti tcp che vengono assemblati dal processo che lo riceve e che implementa un algoritmo per parlare con il protocollo http (vedi modulo http di nodejs). Per assicurarsi di ricevere un messaggio per intero questi algoritmi restano in attesa di ricevere pacchetti tcp finchè il messaggio non raggiunge la lunghezza specificata nell'header `Content-Length`.

Esempio **risposta** http/1.1:

```
HTTP/1.1 200 OK
Date: Fri, 22 Feb 2019 10:50:37 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 22208
Connection: keep-alive
Content-language: it
Content-Encoding: gzip
 
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8"/>
<title>Wikipedia, l'enciclopedia libera</title>
</head>
<body>
    Wikipedia
</body>
</html>
```


Il formato di una risposta è identico alla chiamata con una leggera modifica dell'intestazione, che contiene in ordiene:
1. Versione di http.
2. **Status code** della risposta. Indica se la richiesta ha prodotto il risultato desiderato e si dividono in 5 classi
1xx : status
2xx: status di operazione andata a buon fine
3xx: status di rendirizzamento della richiesta
4xx: status di errore dovuto a una richiesta sbagliata
5xx: status di errore per un problema interno al server
3. lo **status**. Un piccolo messaggio che descrive lo status

Esempi noti e molto usati:
200 OK
400 BAD REQUEST
404 NOT FOUND
500 INTERNAL SERVER ERROR
Vedi online elenco completo...

HTTPS!

A questo livello esistono anche alternative ad http, come graphql o grpc, ma tcp/ip resta la base.

**Livello Applicativo** (il lavoro del programmatore)
Di fatto il programmatore solitamente si interfaccia solo ad http.
Quando si sviluppa un server solitamente si definiscono degli endpoint con un metodo e un percorso, ciascuno che esegue del codice specifico per fare ciò che è stato richiesto ed inviare una risposta con il risultato dell'operazione.
.


URL
Ecco quindi come è strutturato un url completo:
https://194.34.23.54:80/path/to/resource
Questo scritto nel browser indica una richiesta:
Utilizzando il protocollo https;
Di tipo GET;
Al server identificato dal'ip 194.34.23.54;
Al processo di quel server associato alla porta 80;
Alla risorsa gestita da quel processo al percorso /path/to/resource