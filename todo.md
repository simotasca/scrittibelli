# LA FINIAMO???

## POST RILASCIO:

### OR:

- [ ] API sales conditions (solo per listini validi)
- [ ] API per mostrare nella tabella DS anche ordini non confermati
- [ ] filtro vista clienti (effettivi / potenziali)

## RILASCIO:

### CODITAL:

- [ ] valutare tariffe stripe
- [ ] scegliere dicitura "available in" pagina brand
- [ ] iubenda per terms, conditions e policy
- [ ] testi del sito
- [ ] dati brands
- [ ] faq

### OR:

- [ ] verificare funzionamento del flusso di registrazione (dalla form all'approvazione)
  - [ ] registrazione
    - [ ] aggiungere campo vat n.
    - [ ] aggiungere campo state
  - [ ] 1 cliente -> N utenti web
  - [ ] bottone creazione cliente + web (verificare che si crea anche web)
  - [ ] bottone creazione solo utente web (associazione a un cliente)
- [ ] DS: amount complessi (calcolati da sconti)
- [ ] Profilo utente: verificare che si visualizzino tutti i dati utente
- [ ] note per ogni brand per ogni paese
  - [ ] con relative api per mostrarle in area riservata (gli utenti vedono solo le note relative al loro paese)

### NOI:

- [ ] registrazione / login
  - [ ] pw dimenticata (modifica)
  - [ ] notifica codital per ogni registrazione
  - [ ] form registrazione:
    - [ ] campo zip (verificare)
    - [ ] campo state
    - [ ] campo vat n. (chiedere a maurizio)
    - [ ] flag invoicing dicitura
    - [ ] validazione telefonici con prefisso nazionale (2 text fields obbligatori) (tendina per prefissi?)
- [ ] area riservata
  - [ ] header stycky
  - [ ] listini cataloghi ordine alpha
  - [ ] nome utente diventa ragione sociale
  - [ ] cataloghi filtrati come listini
  - [ ] cataloghi anche scaduti 2 mesi
  - [ ] problema loghi: no solo loghi + problema paginazione
  - [ ] titolo bottoni = nome file
  - [ ] colonna supplier -> brand
  - [ ] nomi dei campi \_NetKg -> NetKg, LordKg -> GrosKg
- [ ] DS:
  - [ ] totali
  - [ ] numeri digit
  - [ ] anche lista ordini non confermati
  - [ ] icone dropdown ds
- [ ] form pagamento:
  - [ ] causale obbligatoria
  - [ ] pdf milka per descrizione form pagamento
- [ ] profilo:
  - [ ] verificare che si visualizzino tutti i dati utente
  - [ ] modificare design bottone edit (contact to ammend company information)
- [ ] contatti (precompilare)
- [ ] sales conditions (solo per listini validi)
  - [ ] chiedere a OR
  - [ ] bottone per stampare PDF
- [ ] comunicazioni registrazione: configurare mail invio mail (verificare se configurabile su strapi)
- [ ] note paese in strapi
- [ ] recapcha per le form
- [ ] iubenda per terms, conditions e policy (quando si sveglia codital)
- [ ] roba della registrazione vecchi utenti (messaggio temporaneo di invito a ri-registrarsi)
