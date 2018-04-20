define({
  "builder": {
    "layouts": {
      "tabTitle": "索引標籤式",
      "tabDescr": "使用包含描述性文字可選面板的索引標籤顯示地圖和其他內容。",
      "tabItem": "索引標籤",
      "tabItems": "索引標籤",
      "sideTitle": "側 Accordion",
      "sideDescr": "使用包含描述性文字的可展開控制項顯示地圖和其他內容。",
      "sideItem": "條目",
      "sideItems": "條目",
      "bulletTitle": "項目符號式",
      "bulletDescr": "使用包含描述性文字可選面板的項目符號顯示地圖和其他內容。",
      "bulletItem": "項目符號",
      "bulletItems": "項目符號"
    },
    "common": {
      "lblStatus1": "已發佈",
      "lblStatus3": "隱藏"
    },
    "settingsLayoutOptions": {
      "title": "版面設定選項",
      "lblDescription": "描述",
      "lblLegend": "圖例放置",
      "tooltipLegend": "選擇期望顯示地圖圖例的位置。可在新增或設定地圖時打開地圖圖例。",
      "lblDropdown": "下拉式清單",
      "lblBelowDesc": "在描述下方",
      "lblOnPanel": "做為面板",
      "lblPanelDescAndLegend": "描述和圖例面板",
      "lblPanelDescAndOrLegend": "描述和/或圖例面板",
      "lblPanelDesc": "描述面板",
      "lblPanelLegend": "圖例面板",
      "lblPanelAccordion": "折疊面板",
      "cfgLeft": "左對齊",
      "cfgRight": "右對齊",
      "cfgSmall": "小",
      "cfgMedium": "中",
      "cfgLarge": "大",
      "lblNumbering": "顯示數值",
      "lblReverse": "反向編號",
      "canOverlapMap": "可與地圖位置重疊"
    },
    "settingsMapOptions": {
      "title": "地圖選項",
      "lblOverview": "總覽圖",
      "tooltipOverview": "顯示主地圖的同時顯示一個小總覽圖。",
      "lblLocate": "定位按鈕",
      "tooltipLocate": "可讓您的讀者查看其在地圖上的目前位置。大多數裝置和瀏覽器都支援此功能，但只有當您分享故事作為 HTTPS 連結，並且未嵌入故事時才會出現按鈕。",
      "lblGeocoder": "地址、地點和圖徵尋找工具",
      "tooltipGeocoder": "可讓您的讀者在您的地圖上搜尋地址、地點和/或圖徵。可在「設定」>「Web 地圖」>「應用程式」>「尋找位置」下，於 Web 地圖的項目頁面上配置搜尋選項。",
      "lblSync": "同步地圖位置",
      "tooltipSync": "啟用後，系列中第一個地圖的初始位置將應用到所有地圖，使用者在任何地圖中的導航也將反映在所有地圖中。停用可使各個地圖的位置保持獨立。"
    },
    "settingsThemeOptions": {
      "lblOrgTheme": "組織主題",
      "lblModTheme": "目前主題"
    },
    "initPopup": {
      "title": "歡迎使用"
    },
    "addEditPopup": {
      "lblAdd": "新增",
      "lblEdit": "編輯",
      "disabled": "由於已達到允許的最大 %LBL_LAYOUT% 數，因此停用“新增”。",
      "titleAdd": "新增",
      "titleEdit": "編輯",
      "stepMainStageNextTooltip": "輸入 %LBL_LAYOUT% 標題和內容",
      "titlePlaceholder": "%LBL_LAYOUT% 標題..."
    },
    "textEditor": {
      "placeholder1": "在此新增文字、連結和小圖形。",
      "placeholder2": "如果留空，面板將隱藏起來。",
      "editorActionsTitle": "故事動作",
      "editorActionsHelpDescr": "在敘述中建立連結來協助您述說故事。故事動作可連結至其他部分或變更主舞台。例如，您可以配置動作將地圖移至其他位置、開啟/關閉地圖圖層，或將主舞台媒體變更為不同的圖片、影片、地圖或網頁。",
      "mainStageDisabled": "編輯器最大化時將停用故事動作"
    },
    "organizePopup": {
      "title": "組織",
      "lblHeader": "拖放 %LBL_LAYOUT% 以組織您的故事。",
      "lblColTitle": "標題",
      "lblColStatus": "狀態",
      "btnApplyWarning": "確認刪除 %NB% 個 %LBL_LAYOUT%",
      "deleteTooltip": "刪除",
      "firstSectionExplain": "(無法移動首頁章節)"
    },
    "help": {
      "lblHelp": "說明",
      "lblAdd": "新增",
      "lblSettings": "設定",
      "lblOrga": "組織",
      "lblEdit": "編輯",
      "lblPublish": "分享",
      "lblTips": "提示",
      "lblMore": "是否想瞭解更多資訊?",
      "lblLink": "存取 Esri Story Maps 網站。",
      "content1Div1": "要建立 %TPL_NAME%，請使用“新增”按鈕將各個地圖或其他內容新增到版面設定中。其他內容可包括圖像、影片或者嵌入式網頁或代碼。例如，您可能希望讀者在首次啟動 %TPL_NAME% 時先看到介紹圖像，然後再繼續瀏覽地圖。",
      "content1Div2": "按一下“新增”按鈕時，將出現一個對話方塊，您可在其中選擇並設定想要新增的地圖或其他內容。例如，可指定希望地圖顯示的位置、啟用地圖圖例等等。",
      "content2Div1": "可在“設定”對話方塊中變更 %TPL_NAME% 的外觀。變更版面設定，選擇其他配色方案，選擇地圖圖例的顯示位置等等。",
      "content2Div2": "您還可以使用自己的標誌取代 Esri 標誌，以反映您的品牌。也可以指定當讀者按一下您的標誌時所啟動的網站，以便讀者取得詳細資訊。",
      "content3Div1": "可透過“組織”對話方塊管理您的 %TPL_NAME%。在此對話方塊中，可透過拖放變更系列的順序。",
      "content3Div2": "您也可刪除內容或將其隱藏起來。如果正在準備尚未包含在故事地圖中的新內容，隱藏功能則十分有用。",
      "content4Div1": "發現錯誤或需要變更內容？別擔心。在整個應用程式中查詢編輯圖示，以對內容進行變更。在開發 %TPL_NAME% 時，您可多次使用編輯功能！",
      "content5Div1": "儲存 %TPL_NAME% 時，最初狀態為私有。使用“分享”按鈕將其分享給其他人。您可以將 %TPL_NAME% 公開分享，讓所有人都可對其進行存取。",
      "content5Div2": "根據您的帳戶，您還可以選擇將 %TPL_NAME% 僅分享給組織內的人員，這樣其他人便無法對其進行存取。",
      "content6Div1": "預設情況下，系列中的地圖會同步為顯示相同位置。這意味著，第一個地圖中顯示的位置將自動應用到所有其他地圖，如果讀者在目前查看的地圖上縮放或平移到不同位置，此變更也會應用到其他地圖。",
      "content6Div2": "例如，如果系列顯示城市的不同主題資料，讀者可縮放至鄰近區域，然後只需在索引標籤間切換即可查看不同區域的地圖。",
      "content6Div3": "要停用位置同步，請轉至“設定”對話方塊並取消勾選在“地圖選項”索引標籤中的設定。",
      "content6AltDiv1": "預設情況下，地圖位置是同步的。停用同步即可允許各個地圖顯示不同的位置。",
      "content6AltDiv2": "同步開啟",
      "content6AltDiv3": "同步關閉",
      "content6AltDiv4": "若要停用同步化，請進入 [設定 > 地圖選項] 並取消勾選 \"Synchronize map locations\"。"
    },
    "landing": {
      "lblAdd": "若要調用 %LAYOUT_TITLE% Map Series 需要執行什麼操作?",
      "phAdd": "輸入標題...",
      "lblOR": "或",
      "lblHelp": "進行導覽",
      "quote0": "故事可以帶人們進入全新的天地。",
      "quote1": "若要將構想融入現今的社會，講故事是最有用的方式。",
      "quote2": "我們敘說的故事確實讓這個世界變得美好。若要改變世界，您需要改變您的故事。這個道理適用於個人和機構。",
      "quote3": "故事是聯繫人類與真理之間的最短距離。",
      "quote4": "人們不想要更多資訊。他們最多只專注於資訊。他們需要信念，也就是您在故事中述說的信念、目標及成功之道。",
      "quote5": "我確實相信人們正在尋找真正有意義的故事，亦即更具救贖性、鼓舞人心，及超乎個人領域的故事。",
      "quote6": "如果您想要影響個人或團體，讓他們在日常生活中展現出特殊的價值，請向他們敘說一個吸引人的故事。",
      "quote7": "如果您告訴我，則這是一篇散文。如果您向我展示，則這是一個故事。",
      "quote8": "如果您不瞭解樹木，您可能會在森林中迷路；但如果您不瞭解故事，則您可能在生活中迷失。",
      "quote9": "故事是發揮創意，將生活本身轉化為更強大、更清晰和更有意義的體驗。它們是人類賴以接觸的媒介。",
      "quote10": "敘說發生在您身上、且未曾透露的故事是最有嚴苛的挑戰。",
      "quote11": "也許故事只是一個有靈魂的資料。",
      "quote12": "故事是領導者的武器庫中最有威力的獨特武器。",
      "quote13": "故事的特質使其能夠表達的意義遠遠超出述說的內容。"
    }
  }
});