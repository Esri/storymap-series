define({
  "viewer": {
    "common": {
      "close": "Zapri",
      "focusMainstage": "Medijem pošlji fokus tipkovnice",
      "expandImage": "Razširi sliko"
    },
    "a11y": {
      "skipToContent": "Preskoči na vsebino",
      "headerAria": "Glava zgodbe",
      "panelAria": "Vsebina zgodbe",
      "mainStageAria": "Medij vnosa trenutne zgodbe",
      "logoLinkAria": "Povezava logotipa",
      "toTop": "Pojdi na prvi vnos",
      "focusContent": "Vrni se na vsebino",
      "navAria": "Vnosi zgodbe",
      "toEntryAria": "Pojdi na vnos %ENTRY_NUMBER%: %ENTRY_TITLE%",
      "entryAria": "Vnos %ENTRY_NUMBER%: %ENTRY_TITLE%",
      "loadingAria": "Nalaganje vsebine zgodbe",
      "skipBelowContent": "Preskoči pod to vsebino",
      "skipBelowVideo": "Preskoči pod ta video",
      "skipAboveContent": "Preskoči nad to vsebino",
      "skipAboveVideo": "Preskoči nad ta video",
      "moreEntries": "Več vnosov"
    },
    "loading": {
      "long": "Zgodba se inicializira",
      "long2": "Hvala, da čakate",
      "failButton": "Ponovno naloži zgodbo"
    },
    "signin": {
      "title": "Obvezno je preverjanje pristnosti",
      "explainViewer": "Za dostop do zgodbe se prijavite z računom na %PORTAL_LINK%.",
      "explainBuilder": "Za konfiguracijo zgodbe se prijavite z računom na %PORTAL_LINK%."
    },
    "errors": {
      "boxTitle": "Prišlo je do napake",
      "invalidConfig": "Neveljavna konfiguracija",
      "invalidConfigNoApp": "Identifikator aplikacije za spletno kartiranje ni naveden v index.html.",
      "invalidConfigNoAppDev": "Identifikator aplikacije za spletno kartiranje je naveden v parametrih URL (?appid=). V razvijalskem načinu je prezrta konfiguracija za appid v index.html.",
      "unspecifiedConfigOwner": "Pooblaščeni lastnik ni bil konfiguriran.",
      "invalidConfigOwner": "Lastnik zgodbe ni pooblaščen.",
      "createMap": "Karte ni mogoče ustvariti",
      "invalidApp": "%TPL_NAME% ne obstaja ali do nje ni mogoče dostopiti.",
      "appLoadingFail": "Nekaj ni v redu, %TPL_NAME% se ni pravilno naložila.",
      "notConfiguredDesktop": "Zgodba še ni konfigurirana.",
      "notConfiguredMobile": "Graditelj %TPL_NAME% ni podprt pri tej velikosti prikaza. Če je mogoče, ponovno nastavite svoj brskalnik za dostop do graditelja ali izdelajte svojo zgodbo na napravi z večjim zaslonom.",
      "notConfiguredMobile2": "Obrnite svojo napravo v ležeči položaj, če želite uporabiti graditelja %TPL_NAME%.",
      "notAuthorized": "Niste pooblaščeni za dostop do te zgodbe",
      "notAuthorizedBuilder": "Niste pooblaščeni za uporabo graditelja %TPL_NAME%.",
      "noBuilderIE": "Graditelj ni podprt v Internet Explorerju pred različico %VERSION%. %UPGRADE%",
      "noViewerIE": "Ta zgodba ni podprta v Internet Explorerju pred različico %VERSION%. %UPGRADE%",
      "noViewerIE2": "To zgodbo si želite ogledati s staro, nepodprto različico brskalnika. Morda nekatere funkcionalnosti ne bodo delovale ali pa bo prišlo do drugih nepričakovanih težav. Predlagamo, da ga nadgradite na Internet Explorer 11 ali uporabite drug brskalnik, recimo Chrome.",
      "noViewerIE3": "Konec leta 2017 se ta zgodba v tem brskalniku ne bo več naložila. Takrat boste za ogled te zgodbe morali uporabiti podprti brskalnik.",
      "upgradeBrowser": "<a href='http://browsehappy.com/' target='_blank'>Nadgradite svoj brskalnik</a>.",
      "mapLoadingFail": "Nekaj ni v redu, karta se ni pravilno naložila.",
      "signOut": "Odjava",
      "attention": "Pozor!"
    },
    "mainStage": {
      "back": "Nazaj",
      "errorDeleted": "Ta povezava ni dejavna (razdelek je bil izbrisan)",
      "errorNotPublished": "Ta povezava ni dejavna (razdelek ni objavljen)"
    },
    "panel": {
      "collapse": "Strni ploščo",
      "expand": "Razširi ploščo"
    },
    "mobileInfo": {
      "legend": "Legenda",
      "description": "Opis",
      "lblLegendMobileError": "Oprostite, legenda ni na voljo. Ponovno naložite zgodbo.",
      "lblLegendMobileErrorExplain": "Legenda ni na voljo, ko je naprava obrnjena vodoravno, ko je zgodba naložena."
    },
    "mobileFooter": {
      "swipeInvite": "Podrsajte za navigacijo zgodbe",
      "lblNext": "Naprej",
      "lblEnd": "Prišli ste do konca zgodbe"
    },
    "headerFromCommon": {
      "storymapsText": "Karta z zgodbo",
      "builderButton": "Uredi",
      "facebookTooltip": "Deli na Facebooku",
      "twitterTooltip": "Deli na Twitterju",
      "bitlyTooltip": "Pridobi kratko povezavo",
      "templateTitle": "Nastavi ime predloge",
      "templateSubtitle": "Nastavi podnaslov predloge",
      "share": "Deli",
      "checking": "Preverjanje vsebine vaše zgodbe",
      "fix": "Popravi napake v vaši zgodbi",
      "noerrors": "Napake niso zaznane",
      "tooltipAutoplayDisabled": "Ni na voljo v načinu samodejnega predvajanja",
      "notshared": "Zgodba ni deljena"
    },
    "mapFromCommon": {
      "overview": "Pregledna karta",
      "legend": "Legenda",
      "home": "Povečaj na začetni obseg"
    },
    "shareFromCommon": {
      "copy": "Kopiraj",
      "copied": "Kopirano",
      "open": "Odpri",
      "embed": "Vdelaj v spletno stran",
      "embedExplain": "Uporabi naslednjo kodo HTML za vdelavo zgodbe v spletno stran.",
      "size": "Velikost (širina/višina):",
      "autoplayLabel": "Način samodejnega predvajanja",
      "autoplayExplain1": "Način samodejnega predvajanja bo vašo zgodbo prikazoval v rednih intervalih. To je idealno za kiosk ali javno prikazovan zaslon, vendar vedite, da bo zgodbe v drugih situacijah morda težje brati. Ta funkcionalnost ni podprta na majhnih zaslonih.",
      "autoplayExplain2": "Ko je ta način dejaven, so prikazani ukazi za predvajanje/začasno ustavitev zgodbe in prilagoditev hitrosti navigacije.",
      "linksupdated": "Povezave so posodobljene!"
    },
    "locatorFromCommon": {
      "error": "Lokacija ni na voljo"
    }
  }
});