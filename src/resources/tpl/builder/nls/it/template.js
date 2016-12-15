define({
  "builder": {
    "layouts": {
      "tabTitle": "Schede",
      "tabDescr": "Visualizza le mappe e gli altri contenuti utilizzando le schede con un riquadro facoltativo per il testo descrittivo.",
      "tabItem": "Scheda",
      "tabItems": "Schede",
      "sideTitle": "Controllo a soffietto laterale",
      "sideDescr": "Visualizza le mappe e gli altri contenuti utilizzando un controllo espandibile contenente il testo descrittivo.",
      "sideItem": "Voce",
      "sideItems": "Voci",
      "bulletTitle": "Con punti elenco",
      "bulletDescr": "Visualizza le mappe e gli altri contenuti utilizzando punti elenco con un riquadro facoltativo per il testo descrittivo.",
      "bulletItem": "Punto elenco",
      "bulletItems": "Punti elenco"
    },
    "common": {
      "lblStatus1": "Pubblicato",
      "lblStatus3": "Nascosto"
    },
    "settingsLayoutOptions": {
      "title": "Opzioni di layout",
      "lblDescription": "Descrizione",
      "lblLegend": "Posizionamento legenda",
      "tooltipLegend": "Scegliere la posizione in cui si desidera visualizzare la legenda della mappa. È possibile attivare la legenda per qualsiasi mappa durante la relativa procedura di aggiunta o configurazione.",
      "lblDropdown": "Elenco a discesa",
      "lblBelowDesc": "Sotto la descrizione",
      "lblOnPanel": "Come pannello",
      "lblPanelDescAndLegend": "Pannello descrizione e legenda",
      "lblPanelDescAndOrLegend": "Pannello descrizione e/o legenda",
      "lblPanelDesc": "Pannello descrizione",
      "lblPanelLegend": "Pannello legenda",
      "lblPanelAccordion": "Pannello a soffietto",
      "cfgLeft": "A sinistra",
      "cfgRight": "A destra",
      "cfgSmall": "Piccolo",
      "cfgMedium": "Medio",
      "cfgLarge": "Grande",
      "lblNumbering": "Numeri visualizzati",
      "lblReverse": "Numerazione inversa",
      "canOverlapMap": "può sovrapporsi alla posizione mappa"
    },
    "settingsMapOptions": {
      "title": "Opzioni mappa",
      "lblOverview": "Mappa d'insieme",
      "tooltipOverview": "Consente di visualizzare una piccola mappa d'insieme assieme alla mappa principale.",
      "lblLocate": "Pulsante Trova",
      "tooltipLocate": "Visualizza un pulsante che indica la posizione dell'osservatore sulla mappa. Questa feature è supportata nella maggior parte dei dispositivi e browser, ma il pulsante viene visualizzato solo se si condivide la storia come un collegamento HTTPS e la storia non è incorporata.",
      "lblGeocoder": "Ricerca indirizzo o località",
      "tooltipGeocoder": "Consente agli osservatori di cercare indirizzi e località sulle mappe.",
      "lblSync": "Sincronizza località mappa",
      "tooltipSync": "Se questa opzione è abilitata, la località iniziale della prima mappa nella serie verrà applicata a tutte le altre mappe e il tipo di navigazione utilizzato dagli utenti in una mappa qualsiasi si rifletterà su tutte le mappe. Per conservare l'indipendenza delle località di ogni mappa, disabilitare questa opzione."
    },
    "initPopup": {
      "title": "Benvenuti a"
    },
    "addEditPopup": {
      "lblAdd": "Aggiungi",
      "lblEdit": "Modifica",
      "disabled": "L'aggiunta è disabilitata perché è stato raggiunto il numero massimo consentito per %LBL_LAYOUT%.",
      "titleAdd": "Aggiungi",
      "titleEdit": "Modifica",
      "stepMainStageNextTooltip": "Immettere il titolo e il contenuto per %LBL_LAYOUT%",
      "titlePlaceholder": "Titolo di %LBL_LAYOUT%..."
    },
    "textEditor": {
      "placeholder1": "Aggiungere qui testo, collegamenti ed elementi grafici di piccole dimensioni.",
      "placeholder2": "Se viene lasciato vuoto, il pannello verrà nascosto."
    },
    "organizePopup": {
      "title": "Organizza",
      "lblHeader": "Trascinare e rilasciare %LBL_LAYOUT% per organizzare la storia.",
      "lblColTitle": "Titolo",
      "lblColStatus": "Stato",
      "btnApplyWarning": "Conferma eliminazione %NB% %LBL_LAYOUT%",
      "deleteTooltip": "Elimina",
      "firstSectionExplain": "(La prima sezione non può essere spostata)"
    },
    "help": {
      "lblHelp": "Guida",
      "lblAdd": "Aggiungi",
      "lblSettings": "Impostazioni",
      "lblOrga": "Organizza",
      "lblEdit": "Modifiche",
      "lblPublish": "Condividi",
      "lblTips": "Suggerimenti",
      "lblMore": "Ulteriori informazioni?",
      "lblLink": "Visitare il sito Web delle story map Esri.",
      "content1Div1": "Per creare %TPL_NAME%, utilizzare il pulsante Aggiungi per aggiungere ogni mappa e altri contenuti al layout. Gli altri contenuti possono includere immagini, video oppure pagine Web o codice incorporati. Ad esempio, è possibile impostare la visualizzazione di un'immagine o un video introduttivo quando i lettori avviano %TPL_NAME% per la prima volta, prima che inizino ad esplorare le mappe.",
      "content1Div2": "Quando si fa clic sul pulsante Aggiungi, viene visualizzata una finestra di dialogo che consente di scegliere la mappa e i contenuti che si desidera aggiungere. Ad esempio, è possibile specificare la posizione in cui visualizzare la mappa, abilitare la relativa legenda e così via.",
      "content2Div1": "Nella finestra di dialogo Impostazioni è possibile modificare l'aspetto di %TPL_NAME%. È infatti possibile modificare il layout, scegliere uno schema di colori diverso, scegliere se visualizzare la legenda della mappa e così via.",
      "content2Div2": "È anche possibile sostituire il logo Esri di %TPL_NAME% con un logo personalizzato in base al marchio, nonché specificare il sito Web che verrà aperto quando i lettori fanno clic su tale logo per visualizzare ulteriori informazioni",
      "content3Div1": "La finestra di dialogo Organizza consente di gestire %TPL_NAME%. In questa finestra di dialogo è possibile modificare l'ordine della serie mediante il trascinamento e il rilascio della selezione.",
      "content3Div2": "È inoltre possibile eliminare il contenuto o nasconderlo. La disattivazione della visualizzazione del contenuto risulta utile se si sta preparando nuovo contenuto che non è ancora pronto per l'inclusione nella story map.",
      "content4Div1": "Se è stato rilevato un errore o si desidera modificare il materiale, è sufficiente individuare l'icona di modifica nell'applicazione per apportare modifiche al contenuto. Durante la fase di sviluppo di %TPL_NAME%, è possibile utilizzare le funzioni di modifica ogni volta che è necessario.",
      "content5Div1": "Quando viene salvato, %TPL_NAME% inizialmente è privato. Utilizzare il pulsante Condividi per condividerlo con altri utenti. È possibile condividere %TPL_NAME% pubblicamente in modo che tutti gli utenti possano accedervi.",
      "content5Div2": "A seconda dell'account, è anche possibile condividere %TPL_NAME% con gli utenti all'interno della propria organizzazione in modo che gli altri utenti non possano accedervi.",
      "content6Div1": "Per impostazione predefinita, le mappe incluse in una serie sono sincronizzate in modo da visualizzare la stessa località. Ciò significa che la località visualizzata nella prima mappa sarà automaticamente applicata a tutte le altre mappe e che se un lettore applica lo zoom o esegue il pan su una località diversa sulla mappa attiva, tali modifiche verranno applicate anche a tutte le altre mappe.",
      "content6Div2": "Ad esempio, se nella serie attiva sono visualizzati dati tematici diversi per una città, un lettore potrà applicare lo zoom alla propria vicinanza e quindi limitarsi a scorrere le varie schede per visualizzare le mappe per tale area.",
      "content6Div3": "Per disabilitare la sincronizzazione delle località, passare alla finestra di dialogo Impostazioni, quindi selezionare l'impostazione corrispondente nella scheda Opzioni mappa.",
      "content6AltDiv1": "Per impostazione predefinita, le località delle mappe sono sincronizzate. Se si disabilita la sincronizzazione, ogni mappa potrà visualizzare località diverse.",
      "content6AltDiv2": "Sincronizzazione abilitata",
      "content6AltDiv3": "Sincronizzazione disabilitata",
      "content6AltDiv4": "Per disabilitare la sincronizzazione, scegliere Impostazioni > Opzioni mappa, quindi deselezionare \"Sincronizza località mappa\"."
    },
    "landing": {
      "lblAdd": "Come si desidera chiamare la serie di mappe %LAYOUT_TITLE%?",
      "phAdd": "Immettere il titolo...",
      "lblOR": "O",
      "lblHelp": "Tour"
    }
  }
});