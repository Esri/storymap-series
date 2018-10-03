define({
  "builder": {
    "layouts": {
      "tabTitle": "Vahekaartidega",
      "tabDescr": "Saate esitada kaarte ja muud sisu, kasutades vahekaarte ning valikulist paneeli kirjeldava teksti jaoks.",
      "tabItem": "Vahekaart",
      "tabItems": "Vahekaardid",
      "sideTitle": "Külgakordion",
      "sideDescr": "Saate esitada kaarte ja muud sisu, kasutades kirjeldavat teksti sisaldavat pikendatavat juhtelementi.",
      "sideItem": "Sissekanne",
      "sideItems": "Sissekanded",
      "bulletTitle": "Täpploendiga",
      "bulletDescr": "Saate esitada kaarte ja muud sisu, kasutades täpploendit ning valikulist paneeli kirjeldava teksti jaoks.",
      "bulletItem": "Täpp",
      "bulletItems": "Täpid"
    },
    "common": {
      "lblStatus1": "Publitseeritud",
      "lblStatus3": "Peidetud"
    },
    "settingsLayoutOptions": {
      "title": "Paigutuse valikud",
      "lblDescription": "Kirjeldus",
      "lblLegend": "Legendi paigutus",
      "tooltipLegend": "Saate valida, kus soovite kaardilegendi kuvada. Legendi saate mis tahes kaardi lisamisel või konfigureerimisel alati sisse lülitada.",
      "lblDropdown": "Rippmenüü",
      "lblBelowDesc": "Kirjelduse all",
      "lblOnPanel": "Paneelina",
      "lblPanelDescAndLegend": "Kirjelduse- ja legendipaneel",
      "lblPanelDescAndOrLegend": "Kirjelduse- ja/või legendipaneel",
      "lblPanelDesc": "Kirjeldusepaneel",
      "lblPanelLegend": "Legendipaneel",
      "lblPanelAccordion": "Akordionipaneel",
      "cfgLeft": "Vasak",
      "cfgRight": "Parem",
      "cfgSmall": "Väike",
      "cfgMedium": "Keskmine",
      "cfgLarge": "Suur",
      "lblNumbering": "Kuva numbrid",
      "lblReverse": "Numbrite pöördjärjestus",
      "canOverlapMap": "võib kaardi asukohaga kattuda"
    },
    "settingsMapOptions": {
      "title": "Kaardivalikud",
      "lblOverview": "Ülevaatekaart",
      "tooltipOverview": "Kuvage koos peamise kaardiga väike ülevaatekaart.",
      "lblLocate": "Nupp määra asukoht",
      "tooltipLocate": "Kuvab nupu, mis tähistab vaataja asukohta kaardil. Seda funktsiooni toetab enamus seadmeid ja brausereid, aga nuppu kuvatakse ainult siis, kui jagate oma loo HTTPS-lingina ja lugu pole manustatud.",
      "lblGeocoder": "Aadressi-, koha- ja objektileidja",
      "tooltipGeocoder": "Võimaldab lugejatel Teie kaardilt aadresse, kohti ja/või objekte otsida. Otsinguseadeid saab konfigureerida veebikaardi sisuobjekti lehelt, kui avate Seaded > Veebikaart > Rakendus > Otsi asukohti.",
      "lblSync": "Sünkroniseeri kaardi asukohad",
      "tooltipSync": "Kui see funktsioon on lubatud, rakendatakse seeria esimese kaardi algne asukoht kõigile kaartidele ja kasutajate navigeerimist mis tahes kaardil kajastatakse kõigil kaartidel. Kui soovite iga kaardi asukoha jätta sõltumatuks, keelake see funktsioon."
    },
    "settingsThemeOptions": {
      "lblOrgTheme": "Organisatsiooni teema",
      "lblModTheme": "Praegune teema"
    },
    "initPopup": {
      "title": "Tere tulemast"
    },
    "addEditPopup": {
      "lblAdd": "Lisa",
      "lblEdit": "Muuda",
      "disabled": "Lisamine on keelatud, kuna paigutuste %LBL_LAYOUT% suurim lubatud arv on täis.",
      "titleAdd": "Lisa",
      "titleEdit": "Muuda",
      "stepMainStageNextTooltip": "Sisestage paigutuse %LBL_LAYOUT% pealkiri ja sisu",
      "titlePlaceholder": "Paigutuse %LBL_LAYOUT% pealkiri..."
    },
    "textEditor": {
      "placeholder1": "Siia saate lisada teksti, lingid ja väiksemad pildid.",
      "placeholder2": "Kui see jäetakse tühjaks, siis paneel peidetakse.",
      "editorActionsTitle": "Loo toimingud",
      "editorActionsHelpDescr": "Võimaldab luua loo jaoks lingid, mis aitavad lugu rääkida. Loo toiming võib olla link mõnele muule jaotisele või muuta pealava. Näiteks saate konfigureerida toimingu, mis liigutab kaardi teise kohta, lülitab sisse või välja kaardi kihte või muudab pealava meedia muuks pildiks, videoks, kaardiks või veebileheks.",
      "mainStageDisabled": "Kui redaktor on maksimeeritud, on loo toimingud välja lülitatud"
    },
    "organizePopup": {
      "title": "Paiguta",
      "lblHeader": "Loo korraldamiseks lohistage silti %LBL_LAYOUT%.",
      "lblColTitle": "Pealkiri",
      "lblColStatus": "Staatus",
      "btnApplyWarning": "Kinnita %NB% paigutuse %LBL_LAYOUT% kustutamine",
      "deleteTooltip": "Kustuta",
      "firstSectionExplain": "(Kodujaotist ei saa teisaldada)"
    },
    "help": {
      "lblHelp": "Abi",
      "lblAdd": "Lisa",
      "lblSettings": "Seaded",
      "lblOrga": "Paiguta",
      "lblEdit": "Muudatused",
      "lblPublish": "Jaga",
      "lblTips": "Vihjed",
      "lblMore": "Soovite rohkem?",
      "lblLink": "Külastage Esri kaardilugude veebisaiti.",
      "content1Div1": "Malli %TPL_NAME% loomisel saate nupu lisa abil lisada paigutusse kaardid või muu sisu. Muu sisu hulka kuuluvad pildid, videod, manustatud veebilehed või kood. Näiteks võidakse malli %TPL_NAME% esmakordsel käivitamisel kuvada lugejatele tutvustav pilt või video, enne kui nad hakkavad Teie kaarte uurima.",
      "content1Div2": "Kui klõpsate nuppu lisa, kuvatakse dialoog, kus saate valida ja konfigureerida kaardi ja muu lisatava sisu. Näiteks saate määrata asukoha, kus soovite kaardi kuvada, lubada selle legendi jms.",
      "content2Div1": "Dialoogis seaded saate muuta oma malli %TPL_NAME% ilmet. Saate muuta paigutust, valida mõne muu värviskeemi, valida legendi kuvamise koha jne.",
      "content2Div2": "Samuti saate malli %TPL_NAME% päises kuvatava Esri logo asendada oma kaubamärki peegeldava logoga. Samuti saate määrata veebisaidi, mis avaneb, kui lugejad klõpsavad Teie logo, et saada rohkem teavet.",
      "content3Div1": "Dialoogis Korraldamine saate oma malli %TPL_NAME% hallata. Selles dialoogis saate lohistamise teel muuta seeria järjestust.",
      "content3Div2": "Samuti saate sisu kustutada või peita. Peitmisest on abi siis, kui valmistate ette uut sisu, mis pole veel kaardilukku lisamiseks valmis.",
      "content4Div1": "Kas olete leidnud vea või soovite materjali muuta? Ärge muretsege. Rakenduse muutmisikooni kaudu saate sisu igal ajal muuta. Muutmisvõimaluste kasutamist tuleb Teil malli %TPL_NAME% väljatöötamisel kindlasti ohtralt ette!",
      "content5Div1": "%TPL_NAME% salvestatakse algselt privaatsena. Nupu jaga abil saate jagada seda teistega. Malli %TPL_NAME% saate jagada avalikult, nii et igaühel on sellele juurdepääs.",
      "content5Div2": "Olenevalt Teie kontost saate valida ka malli %TPL_NAME% jagamise ainult oma organisatsiooni inimestega, nii et teistel puuduks sellele juurdepääs.",
      "content6Div1": "Vaikimisi sünkroniseeritakse seeriasse kuuluvad kaardid, et neil kuvataks sama asukoht. See tähendab, et kaardil kuvatav asukoht rakendatakse automaatselt kõigile teistele kaartidele ja kui kasutaja suumib või liigub parajasti kuvataval kaardil mõnda teise kohta, rakendatakse ka see teistele kaartidele.",
      "content6Div2": "Kui Teie seerias kuvatakse näiteks linna kohta erinevad temaatilised andmed, saab kasutaja suumida selle naabruses olevat piirkonda ja seejärel lihtsalt vahekaarte vaheldumisi aktiveerida, et kuvada selle piirkonna kaarte.",
      "content6Div3": "Asukoha sünkroniseerimise keelamiseks avage dialoog seaded ja tühjendage vahekaardil kaardi valikud vastav ruut.",
      "content6AltDiv1": "Vaikimisi sünkroniseeritakse kaartide asukohad. Kui sünkroniseerimine on keelatud, saab igal kaardil kuvada erineva asukoha.",
      "content6AltDiv2": "Sünkroniseerimine SEES",
      "content6AltDiv3": "Sünkroniseerimine VÄLJAS",
      "content6AltDiv4": "Sünkroniseerimise keelamiseks avage Seaded > Kaardi valikud ja tühjendage ruut \"Sünkroniseeri kaardi asukohad\"."
    },
    "landing": {
      "lblAdd": "Mis nime soovite kaardiseeriale %LAYOUT_TITLE% panna?",
      "phAdd": "Sisestage pealkiri...",
      "lblOR": "Või",
      "lblHelp": "Tutvuge võimalustega",
      "quote0": "Alati leidub ruumi veel ühele loole, mis viib inimesed rändama.",
      "quote1": "Jutustamine on tõhusaim viis tänapäeval ideede maailma toomiseks.",
      "quote2": "Meie jutustatud lood kujundavad meie maailma. Kui soovite maailma muuta, peate muutma oma lugu. See tõsiasi kehtib nii inimeste kui organisatsioonide jaoks.",
      "quote3": "Lugu on lühim tee inimese ja tõe vahel.",
      "quote4": "Inimesed ei taha uut informatsiooni. Nad on infoga üle küllastatud. Nad vajavad usku – usku Teisse, Teie eesmärkidesse, Teie edusse ja loosse, mida Te jutustate.",
      "quote5": "Ma olen veendunud, et inimesed otsivad lugusid, millel on tähendus; lugusid, mis pakuvad lunastust, on inspireerivad ja üksikisikust suuremad.",
      "quote6": "Kui soovite saavutada seda, et mõni inimene või inimrühm võtaks oma igapäevaelus omaks teatud väärtuse, jutustage neile üks haarav lugu.",
      "quote7": "Kui seda räägite, on see visand. Kui seda näitate, on see lugu.",
      "quote8": "Puid tundmata võib metsa eksida, kuid lugusid teadmata võib elus ära eksida.",
      "quote9": "Lood on elu enese loominguline muundamine veelgi võimsamaks, selgemaks ja tähendusrikkamaks elamuseks. Lood on inimliku kontakti valuuta.",
      "quote10": "Suurimat kripeldust võib tekitada jutustamata lugu.",
      "quote11": "Ehk on lood tegelikult andmed, mille on hing?",
      "quote12": "Lugu on kõige võimsam relv juhi arsenalis.",
      "quote13": "Loo olemuse osaks on see, et välja jääb palju rohkem kui sisse mahub."
    }
  }
});