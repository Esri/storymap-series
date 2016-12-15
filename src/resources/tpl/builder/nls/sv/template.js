define({
  "builder": {
    "layouts": {
      "tabTitle": "Med flikar",
      "tabDescr": "Presentera kartor och annat innehåll med hjälp av flikar och en valfri panel för beskrivande text.",
      "tabItem": "Flik",
      "tabItems": "Flikar",
      "sideTitle": "Sidodragspel",
      "sideDescr": "Presentera kartor och annat innehåll med en expanderbar kontroll som innehåller en beskrivande text.",
      "sideItem": "Post",
      "sideItems": "Poster",
      "bulletTitle": "Punktlista",
      "bulletDescr": "Presentera kartor och annat innehåll med punktlistor och en valfri panel för beskrivande text.",
      "bulletItem": "Punkt",
      "bulletItems": "Punkter"
    },
    "common": {
      "lblStatus1": "Publicerad",
      "lblStatus3": "Dold"
    },
    "settingsLayoutOptions": {
      "title": "Layoutalternativ",
      "lblDescription": "Beskrivning",
      "lblLegend": "Placering av teckenförklaring",
      "tooltipLegend": "Välj var du vill att kartans teckenförklaring ska visas. Du kan aktivera teckenförklaringen för alla kartor när du lägger till eller konfigurerar den.",
      "lblDropdown": "Listmeny",
      "lblBelowDesc": "Under beskrivningen",
      "lblOnPanel": "Som en panel",
      "lblPanelDescAndLegend": "Panel för beskrivningar och teckenförklaringar",
      "lblPanelDescAndOrLegend": "Panel för beskrivningar och/eller teckenförklaringar",
      "lblPanelDesc": "Panelen Beskrivning",
      "lblPanelLegend": "Panelen Teckenförklaring",
      "lblPanelAccordion": "Dragspelspanel",
      "cfgLeft": "Vänster",
      "cfgRight": "Höger",
      "cfgSmall": "Liten",
      "cfgMedium": "Medium",
      "cfgLarge": "Stor",
      "lblNumbering": "Visa siffror",
      "lblReverse": "Omvänd numrering",
      "canOverlapMap": "kan överlappa kartplatsen"
    },
    "settingsMapOptions": {
      "title": "Kartalternativ",
      "lblOverview": "Översiktskarta",
      "tooltipOverview": "Visa en liten översiktskarta tillsammans med huvudkartan.",
      "lblLocate": "Sökknapp",
      "tooltipLocate": "Visa en knapp som visar vyns plats på kartan. Den här funktionen stöds på de flesta enheter och webbläsare, men knappen visas endast om du delar din berättelse som en HTTPS-länk och berättelsen inte är inbäddad.",
      "lblGeocoder": "Adress- eller platssökning",
      "tooltipGeocoder": "Gör att användarna kan söka efter adresser och platser på kartan.",
      "lblSync": "Synkronisera platser på kartan",
      "tooltipSync": "Vid aktivering tillämpas ursprungsplatsen för den första kartan i din serie på alla kartor, och användarnas navigering i en karta reflekteras i alla kartor. Inaktivera alternativet om du vill att varje kartas plats ska vara oberoende."
    },
    "initPopup": {
      "title": "Välkommen till"
    },
    "addEditPopup": {
      "lblAdd": "Lägg till",
      "lblEdit": "Redigera",
      "disabled": "Lägg till är inaktiverat eftersom det maximala antalet tillåtna %LBL_LAYOUT% har uppnåtts.",
      "titleAdd": "Lägg till",
      "titleEdit": "Redigera",
      "stepMainStageNextTooltip": "Ange titel och innehåll för %LBL_LAYOUT%",
      "titlePlaceholder": "Titel för %LBL_LAYOUT%..."
    },
    "textEditor": {
      "placeholder1": "Lägg till texter, länkar och små bilder här.",
      "placeholder2": "Om du låter panelen vara vara tom blir den dold."
    },
    "organizePopup": {
      "title": "Organisera",
      "lblHeader": "Organisera berättelsen genom att dra och släppa %LBL_LAYOUT%.",
      "lblColTitle": "Titel",
      "lblColStatus": "Status",
      "btnApplyWarning": "Bekräfta borttagning av %NB% %LBL_LAYOUT%",
      "deleteTooltip": "Ta bort",
      "firstSectionExplain": "(Startasvsnittet går inte att flytta)"
    },
    "help": {
      "lblHelp": "Hjälp",
      "lblAdd": "Lägg till",
      "lblSettings": "Inställningar",
      "lblOrga": "Organisera",
      "lblEdit": "Ändringar",
      "lblPublish": "Dela",
      "lblTips": "Tips",
      "lblMore": "Vill du ha mer?",
      "lblLink": "Besök webbplatsen för Esris berättelsekartor.",
      "content1Div1": "När du ska skapa din %TPL_NAME% använder du knappen Lägg till och lägger till varje karta eller annat innehåll i layouten. Sådant innehåll kan utgöras av bilder, videoklipp eller inbäddade kartsidor eller kod. Du kanske till exempel vill att dina läsare ska få se en introduktionsbild eller en introduktionsvideo när de startar din %TPL_NAME% för första gången, innan de går vidare och utforskar dina övriga mappar.",
      "content1Div2": "När du klickar på knappen Lägg till visas en dialogruta där du kan välja och konfigurera kartan eller något annat innehåll som du vill lägga till. Du kan till exempel ange vilken plats kartan ska visa, aktivera dess teckenförklaring osv.",
      "content2Div1": "I dialogrutan Inställningar kan du ändra utseende för din %TPL_NAME%. Du kan ändra layout, välja ett annat färgschema, välja var teckenförklaringen ska visas osv.",
      "content2Div2": "Du kan även byta ut Esri-logotypen mot din egen logotyp i rubriken för din %TPL_NAME% för att visa ditt varumärke. Du kan också ange vilken webbplats som ska öppnas när läsarna klickar på logotypen så att de kan få mer information.",
      "content3Div1": "I dialogrutan Organisera kan du hantera dina %TPL_NAME%. Du kan bland annat ändra ordning i serierna genom att dra och släppa.",
      "content3Div2": "Du kan också ta bort innehåll eller dölja det. Att dölja innehållet kan vara praktiskt om du arbetar med nytt innehåll som inte är klart att ta med i din berättelsekarta än.",
      "content4Div1": "Har du hittat ett fel eller vill du ändra ditt material? Inga problem. Titta efter redigeringsikonen i appen om du vill göra ändringar i innehållet. Du kommer att använda redigeringsfunktionerna många gånger medan du utvecklar din %TPL_NAME%!",
      "content5Div1": "När du sparar din %TPL_NAME% är den privat i början. Använd knappen Dela om du vill dela den med andra. Du kan dela din %TPL_NAME% offentligt så alla kan komma åt den.",
      "content5Div2": "Beroende på konto kanske du också kan dela din %TPL_NAME% enbart med personer inom din organisation så att andra inte kommer åt den.",
      "content6Div1": "Som standard synkroniseras kartorna i en serie så att de visar samma plats. Detta innebär att den plats som visas i den första kartan automatiskt visas i alla övriga kartor, och om en läsare zoomar in eller panorerar till en annan plats i den karta de tittar på, används även den i alla övriga kartor.",
      "content6Div2": "Om din serie till exempel visar olika tematiska data för en stad, kan läsaren zooma in till sina egna kvarter och sedan enkelt växla mellan flikarna för att se kartorna för det området.",
      "content6Div3": "Om du vill inaktivera platssynkronisering går du till dialogrutan Inställningar och avmarkerar den inställningen på fliken Kartalternativ.",
      "content6AltDiv1": "Som standard synkroniseras platserna på kartan. Om du inaktiverar synkronisering kan varje karta visa olika platser.",
      "content6AltDiv2": "Synkronisering PÅ",
      "content6AltDiv3": "Synkronisering AV",
      "content6AltDiv4": "Om du vill inaktivera synkronisering, går du till Inställningar > Kartalternativ och avmarkerar \"Synkronisera platser på kartan\"."
    },
    "landing": {
      "lblAdd": "Vad vill du kalla din kartserie %LAYOUT_TITLE%?",
      "phAdd": "Ange en titel ...",
      "lblOR": "Or",
      "lblHelp": "Ta en rundtur"
    }
  }
});