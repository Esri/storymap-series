define({
  "builder": {
    "layouts": {
      "tabTitle": "タブ付き",
      "tabDescr": "説明テキストのオプション パネルを備えたタブを使用して、マップや他のコンテンツを提示します。",
      "tabItem": "タブ",
      "tabItems": "タブ",
      "sideTitle": "サイド アコーディオン",
      "sideDescr": "説明テキストを含む展開可能なコントロールを使用して、マップや他のコンテンツを提示します。",
      "sideItem": "エントリ",
      "sideItems": "エントリ",
      "bulletTitle": "箇条書き",
      "bulletDescr": "説明テキストのオプション パネルを備えた箇条書きを使用して、マップや他のコンテンツを提示します。",
      "bulletItem": "箇条書き",
      "bulletItems": "箇条書き"
    },
    "common": {
      "lblStatus1": "公開済み",
      "lblStatus3": "非表示"
    },
    "settingsLayoutOptions": {
      "title": "レイアウト オプション",
      "lblDescription": "説明",
      "lblLegend": "凡例の配置",
      "tooltipLegend": "マップの凡例を表示する位置を選択します。マップを追加または構成するとき、凡例を有効にできます。",
      "lblDropdown": "ドロップダウン",
      "lblBelowDesc": "説明の下",
      "lblOnPanel": "パネルとして",
      "lblPanelDescAndLegend": "説明および凡例パネル",
      "lblPanelDescAndOrLegend": "説明および/または凡例パネル",
      "lblPanelDesc": "説明パネル",
      "lblPanelLegend": "凡例パネル",
      "lblPanelAccordion": "アコーディオン パネル",
      "cfgLeft": "左",
      "cfgRight": "右",
      "cfgSmall": "小",
      "cfgMedium": "中",
      "cfgLarge": "大",
      "lblNumbering": "番号の表示",
      "lblReverse": "番号付けの反転",
      "canOverlapMap": "マップ位置をオーバーラップできます"
    },
    "settingsMapOptions": {
      "title": "マップ オプション",
      "lblOverview": "概観図",
      "tooltipOverview": "メインのマップと一緒に小さいオーバービュー マップを表示します。",
      "lblLocate": "ボタンの検索",
      "tooltipLocate": "ユーザーがマップ上に現在地を表示できるようにします。この機能は、ほとんどのデバイスおよびブラウザーでサポートされていますが、このボタンは、ストーリーを HTTPS リンクとして共有し、そのストーリーが埋め込まれていない場合にのみ表示されます。",
      "lblGeocoder": "住所、場所、フィーチャの検索",
      "tooltipGeocoder": "ユーザーがマップ上の住所、場所、フィーチャを検索できるようにします。検索オプションは、Web マップのアイテム ページで、[設定] → [Web Map 設定] → [アプリケーション設定] → [位置の検索] から構成できます。",
      "lblSync": "マップ位置の同期",
      "tooltipSync": "有効にすると、シリーズ内で最初のマップの初期位置がすべてのマップに適用され、ユーザによるマップ内のナビゲーションがすべてのマップに反映されます。それぞれのマップの位置を独立させるには、無効にします。"
    },
    "settingsThemeOptions": {
      "lblOrgTheme": "組織のテーマ",
      "lblModTheme": "現在のテーマ"
    },
    "initPopup": {
      "title": "ようこそ"
    },
    "addEditPopup": {
      "lblAdd": "追加",
      "lblEdit": "編集",
      "disabled": "%LBL_LAYOUT% の最大許容数に達しているため、追加は無効化されています。",
      "titleAdd": "追加",
      "titleEdit": "編集",
      "stepMainStageNextTooltip": "%LBL_LAYOUT% のタイトルとコンテンツを入力",
      "titlePlaceholder": "%LBL_LAYOUT% タイトル..."
    },
    "textEditor": {
      "placeholder1": "テキスト、リンク、小さなグラフィックスをここに追加します。",
      "placeholder2": "空白のままにすると、パネルは非表示になります。"
    },
    "organizePopup": {
      "title": "整理",
      "lblHeader": "%LBL_LAYOUT% をドラッグ アンド ドロップして、ストーリーを整理します。",
      "lblColTitle": "タイトル",
      "lblColStatus": "ステータス",
      "btnApplyWarning": "%NB% %LBL_LAYOUT% の削除を確認",
      "deleteTooltip": "削除",
      "firstSectionExplain": "(ホーム セクションを移動できません)"
    },
    "help": {
      "lblHelp": "ヘルプ",
      "lblAdd": "追加",
      "lblSettings": "設定",
      "lblOrga": "整理",
      "lblEdit": "編集",
      "lblPublish": "共有",
      "lblTips": "ヒント",
      "lblMore": "詳細",
      "lblLink": "Esri ストーリー マップ Web サイトに移動します。",
      "content1Div1": "%TPL_NAME% を作成するには、[追加] ボタンを使用して各マップや他のコンテンツをレイアウトに追加します。その他のコンテンツには、画像、ビデオまたは埋め込まれた Web ページまたはコードを含めることができます。たとえば、ユーザが最初に %TPL_NAME% を起動したときに、マップの探索を開始する前に、概要の画像やビデオを表示することができます。",
      "content1Div2": "[追加] ボタンをクリックすると、ダイアログが表示され、追加するマップや他のコンテンツを選択および構成できます。たとえば、表示するマップの位置を指定したり、凡例を有効化したりできます。",
      "content2Div1": "この設定ダイアログで %TPL_NAME% の外観を変更できます。レイアウトの変更、他の配色の選択、マップの凡例を表示する位置の選択などを行います。",
      "content2Div2": "また、%TPL_NAME% のヘッダー内の Esri ロゴを独自のロゴに差し替えて、ブランドを表示することもできます。また、ユーザがロゴをクリックしたときに開く Web サイトを指定して、詳細を表示されるようにすることもできます。",
      "content3Div1": "[整理] ダイアログを使用すると、%TPL_NAME% を管理できます。このダイアログでは、ドラッグ アンド ドロップでシリーズの順序を変更できます。",
      "content3Div2": "また、コンテンツを削除したり、非表示にしたりすることもできます。ストーリー マップにまだ含めない新しいコンテンツを準備している場合、非表示は便利です。",
      "content4Div1": "間違いを見つけた場合やマテリアルを変更したい場合でも簡単に編集できます。コンテンツを変更するには、アプリケーションに表示されている編集アイコンを使用します。%TPL_NAME% の開発では、編集機能を多く使用します。",
      "content5Div1": "%TPL_NAME% を保存した時点ではプライベートです。他のユーザと共有するには、[共有] ボタンを使用します。すべてのユーザが %TPL_NAME% にアクセスできるようにパブリックに共有することができます。",
      "content5Div2": "使用するアカウントによっては、他のユーザがアクセスできないように組織内のユーザのみと %TPL_NAME% を共有することもできます。",
      "content6Div1": "デフォルトでは、シリーズ内のマップは同じ場所を表示するように同期されます。つまり、最初のマップに表示されている場所が他のすべてのマップに自動的に適用され、ユーザが現在表示しているマップ内で別の場所にズームまたは移動すると、この操作が他のマップにも適用されます。",
      "content6Div2": "たとえば、都市のさまざまな主題データをシリーズで表示する場合、ユーザは近郊にズームしてからタブを切り替えるだけで、そのエリアのマップを表示できます。",
      "content6Div3": "場所の同期機能を無効化するには、[設定] ダイアログに移動して、[マップ オプション] タブで該当する設定をオフにします。",
      "content6AltDiv1": "デフォルトでは、マップ位置は同期されます。同期機能を無効にすると、各マップに異なる場所を表示できます。",
      "content6AltDiv2": "同期オン",
      "content6AltDiv3": "同期オフ",
      "content6AltDiv4": "同期機能を無効化するには、[設定] → [マップ オプション] の順に移動して、[マップ位置の同期] をオフにします。"
    },
    "landing": {
      "lblAdd": "%LAYOUT_TITLE% のマップ シリーズの名前",
      "phAdd": "タイトルの入力...",
      "lblOR": "または",
      "lblHelp": "ツアーの開始"
    }
  }
});