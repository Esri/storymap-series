define({
  "builder": {
    "layouts": {
      "tabTitle": "Usporiadaný do kariet",
      "tabDescr": "Prezentujte mapy a iný obsah pomocou kariet s voliteľným panelom pre opisný text.",
      "tabItem": "Karta",
      "tabItems": "Karty",
      "sideTitle": "Bočný skladací panel",
      "sideDescr": "Prezentujte mapy a iný obsah pomocou rozšíriteľného ovládacieho prvku, ktorý obsahuje opisný text.",
      "sideItem": "Údaj",
      "sideItems": "Údaje",
      "bulletTitle": "V odrážkach",
      "bulletDescr": "Prezentujte mapy a iný obsah pomocou odrážok s voliteľným panelom pre opisný text.",
      "bulletItem": "Odrážka",
      "bulletItems": "Odrážky"
    },
    "common": {
      "lblStatus1": "Publikované",
      "lblStatus3": "Skryté"
    },
    "settingsLayoutOptions": {
      "title": "Možnosti rozloženia",
      "lblDescription": "Popis",
      "lblLegend": "Umiestnenie legendy",
      "tooltipLegend": "Vyberte si, kde sa má zobraziť legenda mapy. Legendu môžete zapnúť pre ktorúkoľvek mapu, keď ju pridáte alebo nakonfigurujete.",
      "lblDropdown": "Vysúvacia ponuka",
      "lblBelowDesc": "Pod opis",
      "lblOnPanel": "Ako panel",
      "lblPanelDescAndLegend": "Panel opisu a legenda",
      "lblPanelDescAndOrLegend": "Opis a/alebo panel legendy",
      "lblPanelDesc": "Panel opisu",
      "lblPanelLegend": "Panel s legendou",
      "lblPanelAccordion": "Skladací panel",
      "cfgLeft": "Vľavo",
      "cfgRight": "Vpravo",
      "cfgSmall": "Malé",
      "cfgMedium": "Stredné",
      "cfgLarge": "Veľké",
      "lblNumbering": "Zobraziť čísla",
      "lblReverse": "Číslovanie v obrátenom poradí",
      "canOverlapMap": "Môže prekrývať polohu mapy"
    },
    "settingsMapOptions": {
      "title": "Možnosti mapy",
      "lblOverview": "Prehľadová mapa",
      "tooltipOverview": "Zobraziť malú prehľadovú mapu spolu s hlavnou mapou.",
      "lblLocate": "Tlačidlo Lokalizovať",
      "tooltipLocate": "Umožnite svojim čitateľom zobraziť ich aktuálnu polohu na mape. Táto funkcia je podporovaná na väčšine zariadení a prehliadačoch, ale tlačidlo sa zobrazí, iba ak zdieľate svoj príbeh ako odkaz HTTPS a príbeh nie je vložený.",
      "lblGeocoder": "Adresa, miesto a vyhľadávač prvkov",
      "tooltipGeocoder": "Umožnite svojim čitateľom vyhľadávať na mape adresy, miesta a/alebo prvky. Možnosti vyhľadávania je možné nakonfigurovať na stránke s položkami na webovej mape v časti Nastavenia > Mapa webu > Aplikácia > Nájsť miesta.",
      "lblSync": "Synchronizovať umiestnenia mapy",
      "tooltipSync": "Ak je táto možnosť povolená, počiatočné umiestnenie prvej mapy vo vašej sérii sa použije na všetky mapy a navigácia používateľov v ktorejkoľvek mape sa prejaví vo všetkých mapách. Zakázať, aby každé miesto na mape zostalo nezávislé."
    },
    "settingsThemeOptions": {
      "lblOrgTheme": "Motív organizácie",
      "lblModTheme": "Aktuálny motív"
    },
    "initPopup": {
      "title": "Vitajte v"
    },
    "addEditPopup": {
      "lblAdd": "Pridať",
      "lblEdit": "Editovať",
      "disabled": "Pridanie je zakázané, pretože bol dosiahnutý %LBL_LAYOUT%maximálny povolený počet.",
      "titleAdd": "Pridať",
      "titleEdit": "Editovať",
      "stepMainStageNextTooltip": "Zadajte %LBL_LAYOUT%názov a obsah.",
      "titlePlaceholder": "%LBL_LAYOUT% názov..."
    },
    "textEditor": {
      "placeholder1": "Tu pridajte text, prepojenia a malú grafiku.",
      "placeholder2": "Ak ponecháte pole prázdne, panel sa skryje.",
      "editorActionsTitle": "Akcie príbehu",
      "editorActionsHelpDescr": "Vytvorte vo svojom príbehu odkazy, ktoré pomôžu rozprávať váš príbeh. Akcie príbehu môžu odkazovať na inú časť alebo zmeniť hlavný úsek. Napríklad môžete nakonfigurovať akciu na presunutie mapy na iné miesto, zapnúť/vypnúť vrstvy mapy alebo zmenu média hlavného úseku na iný obrázok, video, mapu alebo webovú stránku.",
      "mainStageDisabled": "Ak je editor maximalizovaný, akcie príbehov sú vypnuté"
    },
    "organizePopup": {
      "title": "Organizovať",
      "lblHeader": "Pre organizáciu príbehu potiahnite a pustite %LBL_LAYOUT%.",
      "lblColTitle": "Názov",
      "lblColStatus": "Stav",
      "btnApplyWarning": "Potvrdiť odstránenie %NB% %LBL_LAYOUT%",
      "deleteTooltip": "Vymazať",
      "firstSectionExplain": "(časť Domov nie je možné posunúť)"
    },
    "help": {
      "lblHelp": "Pomocník",
      "lblAdd": "Pridať",
      "lblSettings": "Nastavenia",
      "lblOrga": "Organizovať",
      "lblEdit": "Úpravy",
      "lblPublish": "Zdieľať",
      "lblTips": "Tipy",
      "lblMore": "Chcete viac?",
      "lblLink": "Navštíviť webovú stránku máp s príbehom Esri.",
      "content1Div1": "Ak chcete vytvoriť svoj%TPL_NAME%, pomocou tlačidla Pridať pridajte každú mapu alebo iný obsah do rozloženia. Ďalší obsah môže zahŕňať obrázky, videá alebo vložené webové stránky alebo kód. Napríklad by ste mohli chcieť, aby vaši čitatelia videli úvodný obrázok alebo video pri ich prvom spustení %TPL_NAME%predtým, ako sa vydajú na preskúmanie vašich máp.",
      "content1Div2": "Po kliknutí na tlačidlo Pridať sa zobrazí dialógové okno, ktoré vám umožní vybrať a nakonfigurovať mapu alebo iný obsah, ktorý chcete pridať. Môžete napríklad určiť miesto, na ktorom sa má mapa zobrazovať, povoliť jej legendu atď.",
      "content2Div1": "V dialógovom okne Nastavenia môžete zmeniť vzhľad svojho %TPL_NAME%. Môžete zmeniť rozloženie, zvoliť inú farebnú schému, zvoliť, kde sa má zobraziť legenda mapy atď.",
      "content2Div2": "Logo Esri v hlavičke vášho %TPL_NAME%môžete tiež nahradiť vlastným logom, ktoré odráža vašu značku. Môžete tiež určiť webovú stránku, ktorá sa spustí, keď čitatelia kliknú na vaše logo, aby mohli získať viac informácií.",
      "content3Div1": "Dialóg Usporiadať umožňuje spravovať vaše %TPL_NAME%. V tomto dialógovom okne môžete zmeniť poradie série presunutím myšou.",
      "content3Div2": "Môžete tiež odstrániť alebo skryť obsah. Skrytie je užitočné, ak pripravujete nový obsah, ktorý ešte nie je pripravený na zahrnutie do vašej mapy s príbehom.",
      "content4Div1": "Našli ste chybu alebo chcete zmeniť svoje dielo? Žiadny problém. Ak chcete vo svojom obsahu vykonať zmeny, vyhľadajte v aplikácii ikonu úpravy. Keď budete vyvíjať svoje %TPL_NAME%, budete môcť používať funkciu editácie opakovane!",
      "content5Div1": "Po uložení je %TPL_NAME% najskôr súkromný. Pre zdieľanie s ostatnými použite možnosť Zdieľať. Môžete verejne zdieľať %TPL_NAME%, aby k nemu mal ktokoľvek prístup.",
      "content5Div2": "V závislosti od účtu máte možnosť zdieľať svoj %TPL_NAME% iba s ľuďmi z vašej organizácie, aby k nemu nemohli pristupovať iní ľudia.",
      "content6Div1": "V predvolenom nastavení sú mapy v rade synchronizované tak, aby zobrazovali rovnaké miesto. To znamená, že miesto zobrazené v prvej mape sa automaticky použije na všetky ostatné mapy a že ak čitateľ priblíži alebo posunie iné miesto na mape, na ktorú sa práve pozerá, bude to platiť aj pre ostatné mapy.",
      "content6Div2": "Napríklad, ak vaša séria zobrazuje rôzne tematické údaje o meste, čitateľ sa môže priblížiť k svojej štvrti a potom jednoducho prepínať medzi kartami a zobraziť mapy pre túto oblasť.",
      "content6Div3": "Ak chcete zakázať synchronizáciu polohy, prejdite do dialógového okna Nastavenia a zrušte označenie tohto nastavenia na karte Možnosti mapy.",
      "content6AltDiv1": "V predvolenom nastavení sú polohy máp synchronizované. Zakázaná synchronizácia umožňuje každej mape zobraziť iné miesto.",
      "content6AltDiv2": "Synchronizácia ZAPNUTÁ",
      "content6AltDiv3": "Synchronizácia VYPNUTÁ",
      "content6AltDiv4": "Ak chcete synchronizáciu zakázať, prejdite na Nastavenia > Možnosti mapy a zrušte označenie možnosti \"Synchronizovať umiestnenia na mape\"."
    },
    "landing": {
      "lblAdd": "Ako chcete pomenovať vaše %LAYOUT_TITLE% série máp?",
      "phAdd": "Zadajte svoj názov...",
      "lblOR": "Alebo",
      "lblHelp": "Urobte si prehliadku",
      "quote0": "Vždy existuje priestor pre príbeh, ktorý môže ľudí preniesť na iné miesto.",
      "quote1": "Rozprávanie príbehov je najúčinnejším spôsobom, ako dnešnému svetu poskytnúť nápady.",
      "quote2": "Príbehy, ktoré rozprávame, doslova tvoria svet. Ak chcete zmeniť svet, musíte zmeniť príbeh. Táto pravda platí tak pre jednotlivcov, ako aj pre inštitúcie.",
      "quote3": "Najkratšou vzdialenosťou medzi ľudskou bytosťou a pravdou je príbeh.",
      "quote4": "Ľudia nechcú viac informácií. Informácie sú na očiach. Chcú vieru - vo vás, vaše ciele, váš úspech, v príbeh, ktorý rozprávate.",
      "quote5": "Skutočne verím, že ľudia hľadajú príbehy, ktoré niečo znamenajú - príbehy, ktoré sú oslobodzujúce, inšpiratívne a väčšie ako jednotlivec sám.",
      "quote6": "Ak chcete ovplyvniť jednotlivca alebo skupinu, aby v ich každodennom živote mal príbeh konkrétnu hodnotu, povedzte im presvedčivý príbeh.",
      "quote7": "Ak mi to poviete, je to esej. Ak mi to ukážete, je to príbeh.",
      "quote8": "Ak nepoznáte stromy, môžete sa stratiť v lese, ale ak nepoznáte príbehy, môžete sa stratiť v živote.",
      "quote9": "Príbehy sú tvorivou premenou života na silnejšiu, jasnejšiu a zmysluplnejšiu skúsenosť. Je to mena ľudského kontaktu.",
      "quote10": "Neexistuje väčšia agónia, ako mať v sebe nevypovedaný príbeh.",
      "quote11": "Príbehy sú možno len údaje s dušou.",
      "quote12": "Príbehy sú najsilnejšou zbraňou v arzenáli lídra.",
      "quote13": "Povaha príbehov je vynechať oveľa viac, ako zahŕňajú."
    }
  }
});