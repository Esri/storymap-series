define({
  "builder": {
    "layouts": {
      "tabTitle": "Se záložkami",
      "tabDescr": "Prezentujte mapy a další obsah pomocí záložek a volitelného panelu s popisným textem.",
      "tabItem": "Záložka",
      "tabItems": "Záložky",
      "sideTitle": "Postranní rozbalovací panel",
      "sideDescr": "Prezentujte mapy a další obsah pomocí rozbalovacího ovládacího prvku, který zahrnuje popisný text.",
      "sideItem": "Záznam",
      "sideItems": "Záznamy",
      "bulletTitle": "S odrážkami",
      "bulletDescr": "Prezentujte mapy a další obsah pomocí odrážek a volitelného panelu s popisným textem.",
      "bulletItem": "Odrážka",
      "bulletItems": "Odrážky"
    },
    "common": {
      "lblStatus1": "Publikováno",
      "lblStatus3": "Skryto"
    },
    "settingsLayoutOptions": {
      "title": "Možnosti rozvržení",
      "lblDescription": "Popis",
      "lblLegend": "Umístění legendy",
      "tooltipLegend": "Zvolte, kde se má legenda mapy zobrazovat. Při přidání nebo konfiguraci mapy můžete zvolit, zda chcete, aby se u ní zobrazovala legenda.",
      "lblDropdown": "Rozbalovací seznam",
      "lblBelowDesc": "Pod popisem",
      "lblOnPanel": "Jako panel",
      "lblPanelDescAndLegend": "Panel popisu a legendy",
      "lblPanelDescAndOrLegend": "Panel popisu a/nebo panel legendy",
      "lblPanelDesc": "Panel popisu",
      "lblPanelLegend": "Panel legendy",
      "lblPanelAccordion": "Rozbalovací panel",
      "cfgLeft": "Vlevo",
      "cfgRight": "Vpravo",
      "cfgSmall": "Malá",
      "cfgMedium": "Střední",
      "cfgLarge": "Velká",
      "lblNumbering": "Zobrazovat čísla",
      "lblReverse": "Obrátit číslování",
      "canOverlapMap": "může překrývat umístění mapy"
    },
    "settingsMapOptions": {
      "title": "Možnosti mapy",
      "lblOverview": "Mapa přehledu",
      "tooltipOverview": "Zobrazí spolu s hlavní mapou malou přehledovou mapu.",
      "lblLocate": "Tlačítko Lokalizovat",
      "tooltipLocate": "Umožněte svým čtenářům vidět jejich aktuální polohu na mapě. Tuto funkci sice podporuje většina zařízení a prohlížečů, ale tlačítko se zobrazí jen tehdy, pokud příběh sdílíte v podobě odkazu HTTPS a příběh není vložený.",
      "lblGeocoder": "Vyhledávač adres, míst a prvků",
      "tooltipGeocoder": "Umožněte svým uživatelům vyhledávat v mapě adresy, místa nebo prvky. Možnosti vyhledávání lze konfigurovat na stránce položky webové mapy v části Nastavení > Webová mapa > Aplikace > Vyhledat lokality.",
      "lblSync": "Synchronizovat umístění mapy",
      "tooltipSync": "Po aktivaci této možnosti se počáteční umístění první mapy v sérii použije i u všech ostatních map. Veškerá navigace ve kterékoliv z těchto map se projeví v ostatních mapách. Chcete-li, aby bylo umístění všech map nezávislé, tuto možnost deaktivujte."
    },
    "settingsThemeOptions": {
      "lblOrgTheme": "Motiv organizace",
      "lblModTheme": "Aktuální motiv"
    },
    "initPopup": {
      "title": "Vítejte v"
    },
    "addEditPopup": {
      "lblAdd": "Přidat",
      "lblEdit": "Upravit",
      "disabled": "Funkce Přidat je vypnuta, protože bylo dosaženo maximálního počtu povolených %LBL_LAYOUT%.",
      "titleAdd": "Přidat",
      "titleEdit": "Upravit",
      "stepMainStageNextTooltip": "Zadejte název a obsah %LBL_LAYOUT%",
      "titlePlaceholder": "Název %LBL_LAYOUT%…"
    },
    "textEditor": {
      "placeholder1": "Sem přidejte text, odkazy a malé obrázky.",
      "placeholder2": "Pokud pole nevyplníte, panel bude skrytý.",
      "editorActionsTitle": "Akce příběhu",
      "editorActionsHelpDescr": "Vytvářejte ve svém příběhu odkazy, které vám pomohou ho vyprávět. Akce příběhu mohou odkazovat na jiné sekce nebo měnit hlavní sekci. Můžete například nakonfigurovat akci, aby přesunula mapu na jiné umístění, zapnula nebo vypnula vrstvy mapy nebo změnila média v hlavní části na jiné obrázky, videa, mapy nebo webové stránky.",
      "mainStageDisabled": "Akce příběhu jsou vypnuty, pokud je editor maximalizován."
    },
    "organizePopup": {
      "title": "Organizovat",
      "lblHeader": "Zorganizujte svůj příběh kliknutím a přetažením %LBL_LAYOUT%.",
      "lblColTitle": "Název",
      "lblColStatus": "Stav",
      "btnApplyWarning": "Potvrďte odstranění %NB% %LBL_LAYOUT%",
      "deleteTooltip": "Odstranit",
      "firstSectionExplain": "(Domovskou část nelze přemístit.)"
    },
    "help": {
      "lblHelp": "Nápověda",
      "lblAdd": "Přidat",
      "lblSettings": "Nastavení",
      "lblOrga": "Organizovat",
      "lblEdit": "Úpravy",
      "lblPublish": "Sdílení",
      "lblTips": "Tipy",
      "lblMore": "Chcete více?",
      "lblLink": "Navštivte web Esri věnovaný mapám s příběhem.",
      "content1Div1": "Chcete-li vytvořit šablonu %TPL_NAME%, klikněte na tlačítko Přidat a přidejte do mapy výkresy a další obsah. Další obsah může zahrnovat obrázky, video, vložené stránky a kód. Můžete například nastavit, aby vaši čtenáři viděli po prvním spuštění %TPL_NAME% úvodní obrázek nebo video.",
      "content1Div2": "Po kliknutí na tlačítko Přidat se zobrazí dialogové okno umožňující zvolit a nastavit mapu nebo další obsah, který chcete přidat. Můžete například určit oblast, kterou bude mapa zobrazovat, povolit legendu a další.",
      "content2Div1": "V dialogovém okně Nastavení můžete měnit vzhled %TPL_NAME%. Můžete měnit rozvržení, barevné schéma, polohu legendy mapy a další.",
      "content2Div2": "Můžete také nahradit logo Esri v záhlaví %TPL_NAME% logem své vlastní značky. Dále můžete určit webové stránky s dalšími informacemi, na které bude čtenář přesměrován po kliknutí na logo.",
      "content3Div1": "Dialogové okno Organizovat umožňuje spravovat %TPL_NAME%. Můžete v něm přetahováním měnit pořadí sérií.",
      "content3Div2": "Můžete také odstraňovat a skrývat obsah. Skrytí obsahu je užitečné v případě, že připravujete nový obsah, který zatím není připraven pro použití v mapě s příběhem.",
      "content4Div1": "Našli jste chybu nebo chcete změnit svůj materiál? Žádný problém. Hledejte v aplikaci ikonu úprav, která vám umožní změnit obsah. Funkce úprav použijete při vytváření %TPL_NAME% mnohokrát!",
      "content5Div1": "Šablona %TPL_NAME% se poprvé uloží v soukromém režimu. Chcete-li ji sdílet s ostatními, použijte tlačítko Sdílení. Šablonu %TPL_NAME% můžete sdílet s veřejností.",
      "content5Div2": "V závislosti na vašem účtu můžete mít k dispozici možnost sdílet šablonu %TPL_NAME% pouze se členy vaší organizace.",
      "content6Div1": "Ve výchozím nastavení jsou mapy v sériích synchronizovány tak, aby zobrazovaly stejnou oblast. To znamená, že oblast zobrazovaná první mapou bude automaticky použita i ve všech ostatních mapách. Pokud uživatel oddálí zobrazení nebo jej posune na jinou oblast v mapě, projeví se to i v ostatních mapách.",
      "content6Div2": "Pokud například vaše série zobrazuje různá tématická data města, může se uživatel přiblížit na požadovanou čtvrť a poté přepínáním mezi kartami zobrazovat mapy zvolené oblasti.",
      "content6Div3": "Chcete-li zakázat synchronizaci polohy, přejděte do dialogového okna Nastavení a v kartě Možnosti mapy zrušte označení příslušného nastavení.",
      "content6AltDiv1": "Polohy map budou ve výchozím nastavení synchronizovány. Po zakázání synchronizace bude možné zobrazovat ve všech mapách různé oblasti.",
      "content6AltDiv2": "Synchronizace zapnuta",
      "content6AltDiv3": "Synchronizace vypnuta",
      "content6AltDiv4": "Chcete-li zakázat synchronizaci, přejděte do nabídky Nastavení > Možnosti mapy a zrušte označení možnosti \"Synchronizovat umístění mapy\"."
    },
    "landing": {
      "lblAdd": "Jak chcete pojmenovat svou sérii map %LAYOUT_TITLE%?",
      "phAdd": "Zadejte nadpis…",
      "lblOR": "Nebo",
      "lblHelp": "Prohlídka",
      "quote0": "Vždy se najde místo pro příběh, který dokáže lidem rozšířit obzory.",
      "quote1": "Příběhy jsou nejmocnějším způsobem, jakým lze v dnešní době vypustit do světa nápady.",
      "quote2": "Příběhy, které vyprávíme, dávají světu jeho podobu. Pokud chcete změnit svět, musíte změnit svůj příběh. To platí jak pro jednotlivce, tak instituce.",
      "quote3": "Nejkratší spojnicí mezi lidskou bytostí a pravdou je příběh.",
      "quote4": "Lidé nechtějí vědět víc, protože se topí v přemíře informací. Lidé vám chtějí věřit: vašim cílům, vašemu úspěchu a příběhu, který vyprávíte.",
      "quote5": "Upřímně mám za to, že lidé vyhledávají příběhy, které jsou něčím důležité: příběhy o vykoupení, příběhy podněcující inspiraci a příběhy, které mají hlubší dopad.",
      "quote6": "Chcete-li ovlivnit jednotlivce nebo skupinu lidí, aby přijali určitou hodnotu a žili podle ní každý den, povězte jim příběh.",
      "quote7": "Komunikujete-li slovy, stává se z vyprávění esej. Když dáte lidem možnost vnímat děj očima, vytváříte skutečný příběh.",
      "quote8": "Když neznáte stromy, můžete se snadno ztratit v lese, ale když neznáte příběhy, můžete se ztratit v životě.",
      "quote9": "Příběhy jsou kreativním převodem samotného života do silnějších, jasnějších a smysluplnějších zážitků. Jsou oběživem kontaktu s ostatními lidmi.",
      "quote10": "Není většího utrpení pro člověka, než když si v sobě nese nevyprávěný příběh.",
      "quote11": "Možná že příběhy jsou jen data obdařená duší.",
      "quote12": "Příběhy jsou tou nejmocnější zbraní v arzenálu každé vůdčí osobnosti.",
      "quote13": "Příběhy ze své povahy zamlčují víc, než se snaží sdělit."
    }
  }
});