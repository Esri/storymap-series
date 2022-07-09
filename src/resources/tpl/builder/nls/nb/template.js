define({
  "builder": {
    "layouts": {
      "tabTitle": "Fanebasert",
      "tabDescr": "Viser kart og annet innhold ved hjelp av faner med et valgfritt panel med beskrivende tekst.",
      "tabItem": "Fane",
      "tabItems": "Faner",
      "sideTitle": "Trekkspill på siden",
      "sideDescr": "Viser kart og annet innhold ved hjelp av en utvidbar kontroll som inneholder beskrivende tekst.",
      "sideItem": "Oppføring",
      "sideItems": "Oppføringer",
      "bulletTitle": "Punktmerket",
      "bulletDescr": "Viser kart og annet innhold ved hjelp av punkter med et valgfritt panel med beskrivende tekst.",
      "bulletItem": "Punkt",
      "bulletItems": "Punktmerking"
    },
    "common": {
      "lblStatus1": "Publisert",
      "lblStatus3": "Skjult"
    },
    "settingsLayoutOptions": {
      "title": "Oppsettalternativer",
      "lblDescription": "Beskrivelse",
      "lblLegend": "Plassering av tegnforklaring",
      "tooltipLegend": "Velg hvor du vil at tegnforklaringen for kartet skal vises. Du kan aktivere tegnforklaringen for et kart når du legger til eller konfigurerer kartet.",
      "lblDropdown": "Rullegardinliste",
      "lblBelowDesc": "Under beskrivelsen",
      "lblOnPanel": "Som et panel",
      "lblPanelDescAndLegend": "Beskrivelse og tegnforkaringspanel",
      "lblPanelDescAndOrLegend": "Beskrivelse og/eller tegnforklaringspanel",
      "lblPanelDesc": "Beskrivelsespanel",
      "lblPanelLegend": "Tegnforklaringspanel",
      "lblPanelAccordion": "Trekkspillpanel",
      "cfgLeft": "Venstre",
      "cfgRight": "Høyre",
      "cfgSmall": "Liten",
      "cfgMedium": "Middels",
      "cfgLarge": "Stor",
      "lblNumbering": "Vis numre",
      "lblReverse": "Omvendt nummerering",
      "canOverlapMap": "kan overlappe kartlokasjon"
    },
    "settingsMapOptions": {
      "title": "Kartalternativer",
      "lblOverview": "Oversiktskart",
      "tooltipOverview": "Vis et lite oversiktskart sammen med hovedkartet.",
      "lblLocate": "Finn-knapp",
      "tooltipLocate": "La leserne se deres gjeldende lokasjon på kartet. Denne funksjonen støttes på de fleste enheter og nettlesere, men knappen vises bare hvis du deler historien som en HTTPS-kobling, og historien ikke er bygget inn.",
      "lblGeocoder": "Adresse, Sted, og Geoobjektfinner",
      "tooltipGeocoder": "La leserne søke etter adresser, steder og/eller geoobjekter på kartet. Søkevalg kan konfigureres på et webkarts elementside under Innstillinger> Webkart > Applikasjon > Finn lokasjoner.",
      "lblSync": "Synkronisert kartlokasjoner",
      "tooltipSync": "Når dette er aktivert, brukes den opprinnelige lokasjonen i det første kartet i serien på alle kartene. Når brukerne navigerer i et kart, vises dette i alle kartene. Deaktiver alternativet for lokasjonen i hvert kart som skal være uavhengig."
    },
    "settingsThemeOptions": {
      "lblOrgTheme": "Tema for organisasjon",
      "lblModTheme": "Gjeldende tema"
    },
    "initPopup": {
      "title": "Velkommen til"
    },
    "addEditPopup": {
      "lblAdd": "Legg til",
      "lblEdit": "Rediger",
      "disabled": "Legg til er deaktivert fordi det maksimale antallet tillatte %LBL_LAYOUT% er nådd.",
      "titleAdd": "Legg til",
      "titleEdit": "Rediger",
      "stepMainStageNextTooltip": "Skriv inn tittel og innhold for %LBL_LAYOUT%",
      "titlePlaceholder": "%LBL_LAYOUT%-tittel..."
    },
    "textEditor": {
      "placeholder1": "Legg til tekst, koblinger og små grafikkelementer her.",
      "placeholder2": "Hvis denne er tom, skjules panelet.",
      "editorActionsTitle": "Historiehandlinger",
      "editorActionsHelpDescr": "Opprett koblinger i fortellingen som gjør det enklere å fortelle historien. En historiehandling kan koble til en annen seksjon eller endre hovedområdet. Du kan for eksempel konfigurere en handling som flytter kartet til et annet sted, aktiverer/deaktivere kartlag eller endre medium for hovedområdet til et annet bilde, video, kart eller nettside.",
      "mainStageDisabled": "Historiehandlinger deaktiveres når redigeringsverktøyet er maksimert"
    },
    "organizePopup": {
      "title": "Organiser",
      "lblHeader": "Dra og slipp %LBL_LAYOUT% for å organisere historien.",
      "lblColTitle": "Tittel",
      "lblColStatus": "Status",
      "btnApplyWarning": "Bekreft at %NB% %LBL_LAYOUT% skal slettes",
      "deleteTooltip": "Slett",
      "firstSectionExplain": "(Startseksjonen kan ikke flyttes)"
    },
    "help": {
      "lblHelp": "Hjelp",
      "lblAdd": "Legg til",
      "lblSettings": "Innstillinger",
      "lblOrga": "Organiser",
      "lblEdit": "Redigeringer",
      "lblPublish": "Del",
      "lblTips": "Tips",
      "lblMore": "Vil du ha mer?",
      "lblLink": "Gå til Esri-webområdet for historiekart.",
      "content1Div1": "Du oppretter %TPL_NAME% ved å bruke Legg til-knappen til å legge til hvert kart og annet innhold i oppsettet. Annet innhold kan være bilder, videoer eller innebygde websider eller kode. Det kan for eksempel være du vil at brukerne skal se et introduksjonsbilde eller en introduksjonsvideo første gang de starter %TPL_NAME%, før de går videre og utforsker kartene.",
      "content1Div2": "Når du klikker på Legg til-knappen, vises en dialogboks der du kan velge og konfigurere kartet og annet innhold du vil legge til. Du kan for eksempel angi lokasjonen kartet skal vise, aktivere tegnforklaringen for kartet osv.",
      "content2Div1": "I dialogboksen Innstillinger kan du endre utseendet på %TPL_NAME%. Du kan blant annet endre oppsettet, velge et annet fargeoppsett og angi hvor tegnforklaringen for kartet skal vises.",
      "content2Div2": "Du kan også bytte ut Esri-logoen i toppteksten i %TPL_NAME% med din egen logo for ditt varemerke. I tillegg kan du angi hvilken webside som skal åpnes når leserne klikker på logoen din, slik at de kan få mer informasjon.",
      "content3Div1": "I dialogboksen Organiser kan du administrere %TPL_NAME%. I denne dialogboksen kan du endre rekkefølgen på serien ved å dra og slippe.",
      "content3Div2": "Du kan også slette innhold eller skjule det. Muligheten til å skjule innhold er nyttig når du forbereder nytt innhold som ikke er klart til å tas med i fortellingskartet ennå.",
      "content4Div1": "Har du funnet en feil, eller vil du endre noe? Ingen problem. Finn redigeringssymbolet i appen for å gjøre endringer i innholdet ditt. Du kommer til å bruke redigeringsfunksjonene mange ganger mens du lager %TPL_NAME%.",
      "content5Div1": "Når du lagrer din %TPL_NAME%, er den som standard privat. Du kan bruke delingsknappen for å dele den med andre. Du kan dele din %TPL_NAME% offentlig, slik at den er tilgjengelig for alle.",
      "content5Div2": "Avhengig av hvilken konto du har, kan det hende du også har muligheten til å dele din %TPL_NAME% bare med personer i organisasjonen din, slik at andre ikke har tilgang til den.",
      "content6Div1": "Kartene i en serie synkroniseres som standard til å vise samme lokasjon. Det betyr at lokasjonen som vises i det første kartet, automatisk brukes i alle de andre kartene, og hvis en bruker zoomer inn eller panorerer til en annen lokasjon i kartet han eller hun ser på, så brukes denne lokasjonen i de andre kartene også.",
      "content6Div2": "Hvis du for eksempel har en serie som viser forskjellige tematiske data for en by, kan brukerne zoom til sitt nabolag og deretter veksle mellom fanene for å se på kartene for det aktuelle området.",
      "content6Div3": "Hvis du vil deaktivere lokasjonssynkroniseringen, går du til dialogboksen Innstillinger og fjerner avmerkingen for innstillingen i kategorien Kartalternativer.",
      "content6AltDiv1": "Kartlokasjonen synkroniseres som standard. Når synkroniseringen er deaktivert, kan hvert enkelt kart vise ulike lokasjoner.",
      "content6AltDiv2": "Synkronisering PÅ",
      "content6AltDiv3": "Synkronisering AV",
      "content6AltDiv4": "Hvis du vil deaktivere synkronisering, velger du Innstilinger > Kartalternativer og fjerner avmerkingen for Synkroniser kartlokasjoner."
    },
    "landing": {
      "lblAdd": "Hva vil du kalle %LAYOUT_TITLE%-kartserien?",
      "phAdd": "Skriv inn tittelen...",
      "lblOR": "Eller",
      "lblHelp": "Få en omvisning",
      "quote0": "Det er alltid plass til en fortelling som kan forflytte mennesker til et annet sted.",
      "quote1": "Det å fortelle historier er den mest effektive måten å dele ideer med verden på i dag.",
      "quote2": "Fortellingene våre kan bokstavelig talt skape verden. Om du vil forandre verden, må du forandre fortellingen din. Dette gjelder både for enkeltpersoner og institusjoner.",
      "quote3": "Den korteste veien mellom et menneske og sannheten er en fortelling.",
      "quote4": "Folk vil ikke ha mer informasjon. De holder på å drukne i informasjon. De vil ha tillit til deg, målene dine, suksessen din og historien du forteller.",
      "quote5": "Jeg er overbevist om at folk vil ha historier som virkelig betyr noe, historier som er forsonende, inspirerende og større enn individet.",
      "quote6": "Om du vil påvirke en person eller en gruppe slik at de tar til seg en bestemt verdi i dagliglivet, forteller du en overbevisende historie.",
      "quote7": "Hvis du forteller meg noe, blir det bare ord. Hvis du viser meg, blir det en historie.",
      "quote8": "Om du ikke kjenner trærne, kan du gå deg vill i skogen, men om du ikke kjenner historiene, kan du gå deg vill i selve livet.",
      "quote9": "Historier er den kreative omskrivningen av selve livet til en mektigere, tydeligere og mer meningsfylt opplevelse. De er essensen av menneskelig kontakt.",
      "quote10": "Det er ikke noe som er verre enn å brenne inne med en historie.",
      "quote11": "Kanskje er fortellinger informasjon med sjel.",
      "quote12": "Historier er det mest effektive våpenet i en leders arsenal.",
      "quote13": "Det ligger i historienes natur at de utelater langt mer enn de tar med."
    }
  }
});