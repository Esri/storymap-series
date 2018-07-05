define({
  "builder": {
    "layouts": {
      "tabTitle": "Amb pestanyes",
      "tabDescr": "Presenteu mapes i altres continguts mitjançant pestanyes amb una subfinestra opcional per al text descriptiu.",
      "tabItem": "Pestanya",
      "tabItems": "Pestanyes",
      "sideTitle": "Subfinestra lateral extensible",
      "sideDescr": "Presenteu mapes i altres continguts mitjançant un control ampliable que inclogui text descriptiu.",
      "sideItem": "Entrada",
      "sideItems": "Entrades",
      "bulletTitle": "Amb vinyetes",
      "bulletDescr": "Presenteu mapes i altres continguts mitjançant vinyetes amb una subfinestra opcional per al text descriptiu.",
      "bulletItem": "Vinyeta",
      "bulletItems": "Vinyetes"
    },
    "common": {
      "lblStatus1": "Publicat",
      "lblStatus3": "Amagat"
    },
    "settingsLayoutOptions": {
      "title": "Opcions de disseny",
      "lblDescription": "Descripció",
      "lblLegend": "Ubicació de la llegenda",
      "tooltipLegend": "Trieu on voleu que es mostri la llegenda del mapa. La podeu activar en qualsevol mapa quan l'afegiu o la configureu.",
      "lblDropdown": "Llista desplegable",
      "lblBelowDesc": "A sota de la descripció",
      "lblOnPanel": "Com a subfinestra",
      "lblPanelDescAndLegend": "Descripció i subfinestra de la llegenda",
      "lblPanelDescAndOrLegend": "Descripció i/o subfinestra de la llegenda",
      "lblPanelDesc": "Subfinestra de la descripció",
      "lblPanelLegend": "Subfinestra Llegenda",
      "lblPanelAccordion": "Subfinestra extensible",
      "cfgLeft": "Esquerra",
      "cfgRight": "Dreta",
      "cfgSmall": "Petita",
      "cfgMedium": "Mitjana",
      "cfgLarge": "Gran",
      "lblNumbering": "Números de visualització",
      "lblReverse": "Numeració inversa",
      "canOverlapMap": "es pot superposar a la ubicació del mapa"
    },
    "settingsMapOptions": {
      "title": "Opcions del mapa",
      "lblOverview": "Mapa de visualització general",
      "tooltipOverview": "Mostreu un mapa de visualització general petit juntament amb el mapa principal.",
      "lblLocate": "Botó Localitza",
      "tooltipLocate": "Permeteu que els vostres lectors puguin veure la seva ubicació actual al mapa. Aquesta característica és compatible amb la majoria de dispositius i navegadors, però el botó només apareix si compartiu la història com a enllaç HTTPS i la història no s'ha incrustat.",
      "lblGeocoder": "Cercador d'adreces, llocs i entitats",
      "tooltipGeocoder": "Permeteu que els vostres lectors cerquin adreces, llocs i entitats al mapa. Les opcions de cerca es poden configurar a la pàgina de l'element del mapa web a Configuració > Mapa web > Aplicació > Cerca ubicacions.",
      "lblSync": "Sincronitza les ubicacions del mapa",
      "tooltipSync": "Quan s'habiliti, la ubicació inicial del primer mapa de la vostra sèrie s'aplicarà a tots els mapes i la navegació dels usuaris en qualsevol mapa es veurà reflectida en tots els mapes. Deshabiliteu aquesta opció per a cada ubicació del mapa per mantenir-les independents."
    },
    "settingsThemeOptions": {
      "lblOrgTheme": "Tema de l'organització",
      "lblModTheme": "Tema actual"
    },
    "initPopup": {
      "title": "Us donem la benvinguda"
    },
    "addEditPopup": {
      "lblAdd": "Afegeix",
      "lblEdit": "Edita",
      "disabled": "L'opció Afegeix està deshabilitada perquè s'ha arribat al nombre màxim de %LBL_LAYOUT% permès.",
      "titleAdd": "Afegeix",
      "titleEdit": "Edita",
      "stepMainStageNextTooltip": "Introduïu el títol i el contingut de %LBL_LAYOUT%",
      "titlePlaceholder": "Títol de %LBL_LAYOUT%..."
    },
    "textEditor": {
      "placeholder1": "Afegiu text, enllaços i gràfics petits aquí.",
      "placeholder2": "Si es deixa en blanc, s'amagarà la subfinestra.",
      "editorActionsTitle": "Story Actions",
      "editorActionsHelpDescr": "Creeu enllaços a la vostra narració perquè us sigui més fàcil explicar la història. Una Story Action pot enllaçar a una altra secció o canviar l'escenari principal. Per exemple, podeu configurar una acció per moure el mapa a una altra ubicació, activar o desactivar les capes del mapa, o bé canviar el contingut multimèdia de l'escenari principal a un vídeo, imatge, mapa o pàgina web diferent.",
      "mainStageDisabled": "Les Story Actions es deshabiliten quan es maximitza l'editor"
    },
    "organizePopup": {
      "title": "Organitza",
      "lblHeader": "Arrossegueu i deixeu anar %LBL_LAYOUT% per organitzar la vostra història.",
      "lblColTitle": "Títol",
      "lblColStatus": "Estat",
      "btnApplyWarning": "Confirma la supressió de %NB% %LBL_LAYOUT%",
      "deleteTooltip": "Suprimeix",
      "firstSectionExplain": "(la secció principal no es pot moure)"
    },
    "help": {
      "lblHelp": "Ajuda",
      "lblAdd": "Afegeix",
      "lblSettings": "Configuració",
      "lblOrga": "Organitza",
      "lblEdit": "Edicions",
      "lblPublish": "Comparteix",
      "lblTips": "Suggeriments",
      "lblMore": "Voleu més informació?",
      "lblLink": "Visiteu el lloc web de l'Esri Story Maps.",
      "content1Div1": "Per crear %TPL_NAME%, feu servir el botó Afegeix per afegir cada mapa o altres continguts al disseny. Aquests continguts poden incloure imatges, vídeos o pàgines web i codi integrats. Per exemple, és possible que vulgueu que els lectors vegin una imatge o un vídeo d'introducció quan iniciïn per primera vegada %TPL_NAME% abans de passar a explorar els vostres mapes.",
      "content1Div2": "Quan feu clic al botó Afegeix, apareixerà un quadre de diàleg que us permetrà triar i configurar el mapa o altres continguts que vulgueu afegir. Per exemple, podeu especificar la ubicació que voleu que es mostri al mapa, habilitar-ne la llegenda, etc.",
      "content2Div1": "Al quadre de diàleg Configuració podeu canviar l'aspecte de %TPL_NAME%. Podeu canviar-ne el disseny, triar un esquema de colors diferent, seleccionar on es mostrarà la llegenda del mapa, etc.",
      "content2Div2": "També podeu substituir el logotip d'Esri a la capçalera de %TPL_NAME% amb un logotip propi que reflecteixi la vostra marca. A més, podeu especificar quina pàgina web s'obrirà si els lectors fan clic al vostre logotip perquè puguin obtenir més informació.",
      "content3Div1": "El quadre de diàleg Organitza us permet administrar %TPL_NAME%. Hi podeu canviar l'ordre de les sèries si arrossegueu i deixeu anar.",
      "content3Div2": "També podeu suprimir contingut o amagar-lo. L'opció d'amagar és útil si esteu preparant contingut nou que encara no està llest per incloure a l'story map.",
      "content4Div1": "Heu trobat alguna errada o voleu canviar el vostre material? No us preocupeu. Cerqueu la icona d'edició a l'aplicació per canviar el contingut. Fareu servir moltes vegades les funcions d'edició mentre desenvolupeu %TPL_NAME%.",
      "content5Div1": "Quan deseu %TPL_NAME%, no es compartirà amb ningú. Feu servir el botó Comparteix per compartir-ho amb altres usuaris. Podeu compartir %TPL_NAME% públicament perquè qualsevol hi pugui accedir.",
      "content5Div2": "En funció del vostre compte, és possible que tingueu l'opció de compartir %TPL_NAME% només amb persones de la vostra organització perquè altres no hi puguin accedir.",
      "content6Div1": "Per defecte, els mapes d'una sèrie se sincronitzen per mostrar la mateixa ubicació. Això significa que la ubicació que es mostri al primer mapa s'aplicarà automàticament a la resta de mapes i que, si un lector aplica el zoom o la panoràmica a una altra ubicació del mapa que està veient en aquell moment, s'aplicarà també als altres mapes.",
      "content6Div2": "Per exemple, si la vostra sèrie mostra diverses dades temàtiques per a una ciutat, un lector pot aplicar el zoom al seu barri i després alternar entre les pestanyes per veure els mapes d'aquella àrea.",
      "content6Div3": "Per deshabilitar la sincronització de la ubicació, aneu al quadre de diàleg Configuració i desactiveu aquesta opció a la pestanya Opcions del mapa.",
      "content6AltDiv1": "Per defecte, les ubicacions dels mapes se sincronitzen. Si deshabiliteu la sincronització, permetreu que cada mapa mostri una ubicació diferent.",
      "content6AltDiv2": "Sincronització activada",
      "content6AltDiv3": "Sincronització desactivada",
      "content6AltDiv4": "Per deshabilitar la sincronització, aneu a Configuració, Opcions del mapa i desactiveu l'opció \"Sincronitza les ubicacions del mapa\"."
    },
    "landing": {
      "lblAdd": "Quin nom li voleu donar al Map Series %LAYOUT_TITLE%?",
      "phAdd": "Introduïu el títol...",
      "lblOR": "O bé,",
      "lblHelp": "Vegeu una introducció",
      "quote0": "Sempre hi ha lloc per a una història que pot transportar la gent a un altre lloc.",
      "quote1": "Avui dia, la narració d'històries és la manera més eficaç d'aportar idees al món.",
      "quote2": "Les històries que expliquem defineixen el món literalment. Si voleu canviar el món, heu d'explicar la vostra història. Aquesta veritat s'aplica tant a individuals com a institucions.",
      "quote3": "La distància més curta entre un ésser humà i la veritat és una història.",
      "quote4": "La gent no vol més informació. Està saturada d'informació. Volen creure... creure en vós, en els vostres objectius, el vostre èxit i la història que expliqueu.",
      "quote5": "Crec realment que la gent cerca històries que vulguin dir alguna cosa, que siguin alliberadores, estimulants i vagin més enllà d'una perspectiva individual.",
      "quote6": "Si voleu influir en un individu o un grup perquè adoptin un valor concret en les seves vides diàries, expliqueu-los una història captivadora.",
      "quote7": "Si m'ho expliqueu, és una redacció. Si m'ho ensenyeu, és una història.",
      "quote8": "Si no coneixeu els arbres, us podeu perdre pel bosc, però si no coneixeu les històries, us podeu perdre per la vida.",
      "quote9": "Les històries són la conversió creativa de la vida pròpiament en una experiència més intensa, transparent i significativa. Són la moneda del contacte humà.",
      "quote10": "No hi ha agonia més gran que portar una història sense explicar a dins.",
      "quote11": "Potser les històries són només dades amb ànima.",
      "quote12": "Les històries són l'arma més poderosa de l'arsenal d'un líder.",
      "quote13": "És natural que les històries deixin més contingut fora del que inclouen."
    }
  }
});