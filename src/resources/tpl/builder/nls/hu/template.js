define({
  "builder": {
    "layouts": {
      "tabTitle": "Többlapos",
      "tabDescr": "A térképek és az egyéb tartalmak megjelenítése lapok használatával és választható panellel, amely a leírás szövegét tartalmazza.",
      "tabItem": "Fül",
      "tabItems": "Fülek",
      "sideTitle": "Kibontható oldalsó panel",
      "sideDescr": "A térképek és az egyéb tartalmak megjelenítése kibontható vezérlő használatával, amely a leírás szövegét tartalmazza.",
      "sideItem": "Bejegyzés",
      "sideItems": "Bejegyzések",
      "bulletTitle": "Felsorolásjeles",
      "bulletDescr": "A térképek és az egyéb tartalmak megjelenítése felsorolásjelek használatával és választható panellel, amely a leírás szövegét tartalmazza.",
      "bulletItem": "Felsorolásjel",
      "bulletItems": "Felsorolásjelek"
    },
    "common": {
      "lblStatus1": "Közzétéve",
      "lblStatus3": "Rejtett"
    },
    "settingsLayoutOptions": {
      "title": "Térkép elrendezési beállításai",
      "lblDescription": "Leírás",
      "lblLegend": "Jelmagyarázat elhelyezése",
      "tooltipLegend": "Adja meg, hogy hol szeretné megjeleníteni a jelmagyarázatot. A jelmagyarázatot bármelyik térkép esetében bekapcsolhatja, amikor felveszi vagy konfigurálja azt.",
      "lblDropdown": "Lenyíló",
      "lblBelowDesc": "A leírás alatt",
      "lblOnPanel": "Panelként",
      "lblPanelDescAndLegend": "Leírás és jelmagyarázat panelje",
      "lblPanelDescAndOrLegend": "Leírás és/vagy jelmagyarázat panelje",
      "lblPanelDesc": "Leírás panelje",
      "lblPanelLegend": "Jelmagyarázat panelje",
      "lblPanelAccordion": "Kibontható oldalsó panel",
      "cfgLeft": "Bal",
      "cfgRight": "Jobb",
      "cfgSmall": "Kicsi",
      "cfgMedium": "Közepes",
      "cfgLarge": "Nagy",
      "lblNumbering": "Számok megjelenítése",
      "lblReverse": "Fordított számozás",
      "canOverlapMap": "átfedheti a térkép helyét"
    },
    "settingsMapOptions": {
      "title": "Térképbeállítások",
      "lblOverview": "Átnézeti térkép",
      "tooltipOverview": "Kisméretű átnézeti térkép megjelenítése a főtérképpel együtt.",
      "lblLocate": "Megkeresés gomb",
      "tooltipLocate": "Segítségével az olvasók megtekinthetik az aktuális helyüket a térképen. Ez a vektoros elem támogatott a legtöbb eszközön és böngészőben, de a gomb csak akkor jelenik meg, ha a történetét HTTPS-hivatkozásként osztja meg, és a történet nem beágyazott.",
      "lblGeocoder": "Címek, helyek és vektoros elemek keresője",
      "tooltipGeocoder": "Lehetővé teszi az olvasóknak címek, helyek és/vagy vektoros elemek keresését a térképen. A keresési beállítások a webtérkép elemoldalán adhatók meg a Beállítások > Webtérkép > Alkalmazás > Helyek keresése parancs választásával.",
      "lblSync": "Térképek helyének szinkronizálása",
      "tooltipSync": "Amikor engedélyezve van, a sorozat első térképén megadott hely az összes térképen alkalmazva lesz, és a felhasználók navigálása minden térképen megjelenik. Tiltsa le mindegyik térképi helynél, ha független működést szeretne."
    },
    "settingsThemeOptions": {
      "lblOrgTheme": "Szervezeti téma",
      "lblModTheme": "Aktuális téma"
    },
    "initPopup": {
      "title": "Üdvözöli a(z)"
    },
    "addEditPopup": {
      "lblAdd": "Hozzáadás",
      "lblEdit": "Szerkesztés",
      "disabled": "A hozzáadás le van tiltva, mivel elérte a(z) %LBL_LAYOUT% engedélyezett maximális számát.",
      "titleAdd": "Hozzáadás",
      "titleEdit": "Szerkesztés",
      "stepMainStageNextTooltip": "Adja meg a(z) %LBL_LAYOUT% címét és tartalmát",
      "titlePlaceholder": "%LBL_LAYOUT% címe..."
    },
    "textEditor": {
      "placeholder1": "Itt adhatja hozzá a szövegeket, a hivatkozásokat és a kisméretű képeket.",
      "placeholder2": "Ha üresen hagyja, a panel rejtett lesz.",
      "editorActionsTitle": "Történet műveletei",
      "editorActionsHelpDescr": "Hozzon létre a történet elmondását segítő hivatkozásokat a történetben. A történet művelete összekapcsolható egy másik szekcióval, vagy módosítja a fő szakaszt.  Beállíthat például egy műveletet, amely másik helyre mozgatja a térképet, amely be-/kikapcsolja a térkép rétegeit, vagy amely másik képet, videót, térképet vagy weboldalt jelenít meg a fő szakasz médiatartalma helyett.",
      "mainStageDisabled": "A történet műveletei ki vannak kapcsolva, amikor a szerkesztő maximális méretűre van állítva"
    },
    "organizePopup": {
      "title": "Rendezés",
      "lblHeader": "A(z) %LBL_LAYOUT% húzásával rendezheti a történetét.",
      "lblColTitle": "Cím",
      "lblColStatus": "Státusz",
      "btnApplyWarning": "Erősítse meg a(z) %NB% %LBL_LAYOUT% törlését",
      "deleteTooltip": "Törlés",
      "firstSectionExplain": "(A kezdő szekció nem helyezhető át.)"
    },
    "help": {
      "lblHelp": "Súgó",
      "lblAdd": "Hozzáadás",
      "lblSettings": "Beállítások",
      "lblOrga": "Rendezés",
      "lblEdit": "Módosítások",
      "lblPublish": "Megosztás",
      "lblTips": "Tippek",
      "lblMore": "Többet szeretne?",
      "lblLink": "Keresse fel az Esri Story Maps webhelyet.",
      "content1Div1": "A(z) %TPL_NAME% létrehozásához a Hozzáadás gombra kattintva vegye fel a térképeket és az egyéb tartalmakat a térképi kimenetbe. Az egyéb tartalmak lehetnek képek, videók, beágyazott weboldalak vagy kódok. Megjeleníthet például egy bevezető képet vagy videót a(z) %TPL_NAME% elindításakor, és az olvasók ennek megtekintése után léphetnek tovább a térképekre.",
      "content1Div2": "Amikor a Hozzáadás gombra kattint, megjelenik egy párbeszédpanel, amelyen kiválaszthatja és beállíthatja a felvenni kívánt térképet és egyéb tartalmat. Megadhatja például a térképen megjeleníteni kívánt helyet, bekapcsolhatja a jelmagyarázatot stb.",
      "content2Div1": "A Beállítások párbeszédpanelen változtathatja meg a(z) %TPL_NAME% megjelenését. Megváltoztathatja a térképi kimenetet, választhat másik színsémát, megadhatja, hogy hol jelenjen meg a térkép jelmagyarázata stb.",
      "content2Div2": "A(z) %TPL_NAME% fejlécében megjelenített Esri-logót lecserélheti a sajátjára, amely az Ön márkáját jelzi. Megadhatja azt a webhelyet is, amely akkor jelenik meg, amikor az olvasók a logóra kattintanak, hogy részletesebb tájékoztatást kapjanak.",
      "content3Div1": "A Rendezés párbeszédpanel lehetőséget kínál a(z) %TPL_NAME% kezelésére. Ezen a párbeszédpanelen húzással változtathatja meg a sorozat sorrendjét.",
      "content3Div2": "Ezenkívül törölheti vagy elrejtheti a tartalmakat. Az elrejtés akkor hasznos, ha új tartalmat készít, amely még nem áll készen arra, hogy megjelenítse a story mapben.",
      "content4Div1": "Hibát talált, vagy meg szeretné változtatni az anyagát? Ne aggódjon. Keresse meg a Szerkesztés ikont az alkalmazásban, amelynek segítségével módosíthatja a tartalmat. Ezeket a szerkesztési funkciókat sokszor fogja használni a(z) %TPL_NAME% elkészítése során!",
      "content5Div1": "A(z) %TPL_NAME% első mentésekor nem lesz nyilvános. A Megosztás gombbal oszthatja meg másokkal. A(z) %TPL_NAME% megosztható nyilvánosan, hogy bárki elérhesse.",
      "content5Div2": "A fiókjától függően választhatja a(z) %TPL_NAME% megosztását csak a szervezetéhez tartozó személyekkel, hogy mások ne férhessenek hozzá.",
      "content6Div1": "Alapértelmezés szerint a sorozatban található térképek szinkronizálva vannak, hogy ugyanazt a helyet jelenítsék meg. Ez azt jelenti, hogy az első térképen megjelenített hely automatikusan be lesz állítva az összes többi térképen is, és ha az olvasó más helyre nagyít/kicsinyít, vagy más helyre lép az aktuálisan megjelenített térképen, akkor az a hely lesz beállítva a többi térképen is.",
      "content6Div2": "Ha például a sorozata egy város különböző tematikus adatait jeleníti meg, akkor az olvasó felnagyíthatja a saját környékét, majd a lapok között váltva megtekintheti az adott terület térképét.",
      "content6Div3": "A helyszinkronizálás kikapcsolásához jelenítse meg a Beállítások párbeszédpanelt, és a Térképbeállítások fülön törölje a szinkronizálási beállítás jelölését.",
      "content6AltDiv1": "Alapértelmezés szerint a hely szinkronizálva van a térképeken. A szinkronizálás kikapcsolásával mindegyik térképen más hely jeleníthető meg.",
      "content6AltDiv2": "Szinkronizálás BE",
      "content6AltDiv3": "Szinkronizálás KI",
      "content6AltDiv4": "A szinkronizálás kikapcsolásához válassza a Beállítások > Térképbeállítások lehetőséget, és törölje a „Térképek helyének szinkronizálása” jelölőnégyzet jelölését."
    },
    "landing": {
      "lblAdd": "Milyen nevet szeretne adni a(z) %LAYOUT_TITLE% térképsorozatnak?",
      "phAdd": "Adja meg a címet...",
      "lblOR": "Vagy",
      "lblHelp": "Vegyen részt egy túrán",
      "quote0": "Mindig fontosak azok a történetek, amelyek egy másik helyre repítik az embereket.",
      "quote1": "A történetmesélés a leghatékonyabb módja annak, hogy a világ elé tárjuk a gondolatainkat.",
      "quote2": "A történetek, amelyeket elmesélünk, hatással vannak a világra. Ha meg akarjuk változtatni a világot, meg kell változtatni a történetet, amelyet mesélünk. Ez a megállapítás az egyénekre és az intézményekre egyaránt érvényes.",
      "quote3": "Egy ember és az igazság közötti legrövidebb út egy történet.",
      "quote4": "Az emberek nem akarnak még több információt. Már így is túl sok információ éri őket nap mint nap. Információk helyett hitet, célokat és sikert akarnak látni a történetben, amelyet elmesélnek nekik.",
      "quote5": "Őszintén hiszek abban, hogy az emberek olyan történeteket keresnek, amelyek valóban jelentenek valamit, amelyek katartikusak és inspirálók, és túlmutatnak az egyénen.",
      "quote6": "Ha el akarja érni, hogy egy egyén vagy egy csoport a mindennapjaiban egy bizonyos érték szerint viselkedjen, mondjon el nekik egy megkapó történetet.",
      "quote7": "Ha elmondja, akkor az egy esszé. Ha megmutatja, akkor az egy történet.",
      "quote8": "Aki nem ismeri a fákat, eltévedhet az erdőben, de aki nem ismeri a történeteket, az az életben tévedhet el.",
      "quote9": "A történetekben kreatív módon átalakítjuk az életet valami erőteljesebb, világosabb és jelentőségteljesebb tapasztalattá. A történetek az emberi kapcsolatok váltópénzei.",
      "quote10": "Nincs nagyobb szenvedés, mint elmondatlanul hordozni magunkban egy történetet.",
      "quote11": "Lehet, hogy a történetek valójában csak lélekkel átitatott adatok.",
      "quote12": "Egy vezető eszköztárában a történetek a leghatásosabb fegyverek.",
      "quote13": "A történetek természete olyan, hogy több mindent hallgatnak el, mint amennyit elmondanak."
    }
  }
});