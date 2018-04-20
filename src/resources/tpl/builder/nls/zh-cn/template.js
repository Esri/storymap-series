define({
  "builder": {
    "layouts": {
      "tabTitle": "选项卡式",
      "tabDescr": "使用包含描述性文本可选面板的选项卡显示地图和其他内容。",
      "tabItem": "选项卡",
      "tabItems": "选项卡",
      "sideTitle": "侧折叠式",
      "sideDescr": "使用包含描述性文本的可展开控件显示地图和其他内容。",
      "sideItem": "条目",
      "sideItems": "条目",
      "bulletTitle": "项目符号式",
      "bulletDescr": "使用包含描述性文本可选面板的项目符号显示地图和其他内容。",
      "bulletItem": "项目符号",
      "bulletItems": "项目符号"
    },
    "common": {
      "lblStatus1": "已发布",
      "lblStatus3": "隐藏"
    },
    "settingsLayoutOptions": {
      "title": "布局选项",
      "lblDescription": "描述",
      "lblLegend": "图例放置",
      "tooltipLegend": "选择期望显示地图图例的位置。可在添加或配置地图时打开地图图例。",
      "lblDropdown": "下拉菜单",
      "lblBelowDesc": "在描述下方",
      "lblOnPanel": "作为面板",
      "lblPanelDescAndLegend": "描述和图例面板",
      "lblPanelDescAndOrLegend": "描述和/或图例面板",
      "lblPanelDesc": "描述面板",
      "lblPanelLegend": "图例面板",
      "lblPanelAccordion": "折叠面板",
      "cfgLeft": "左",
      "cfgRight": "右",
      "cfgSmall": "小",
      "cfgMedium": "中",
      "cfgLarge": "大",
      "lblNumbering": "显示数值",
      "lblReverse": "反向编号",
      "canOverlapMap": "可与地图位置重叠"
    },
    "settingsMapOptions": {
      "title": "地图选项",
      "lblOverview": "总览图",
      "tooltipOverview": "显示主地图的同时显示一个小总览图。",
      "lblLocate": "定位按钮",
      "tooltipLocate": "允许读者在地图中查看其当前位置。大多数设备和浏览器均支持此功能，但只有在将故事共享为 HTTPS 链接且未嵌入故事时才显示该按钮。",
      "lblGeocoder": "地址、地点和要素查找器",
      "tooltipGeocoder": "允许读者在地图上搜索地址、地点和/或要素。可在 Web 地图项目页面的设置 > Web 地图 > 应用程序 > 查找位置下对搜索选项进行配置。",
      "lblSync": "同步地图位置",
      "tooltipSync": "启用后，系列中第一个地图的初始位置将应用到所有地图，用户在任何地图中的导航也将反映在所有地图中。禁用可使各个地图的位置保持独立。"
    },
    "settingsThemeOptions": {
      "lblOrgTheme": "组织主题",
      "lblModTheme": "当前主题"
    },
    "initPopup": {
      "title": "欢迎使用"
    },
    "addEditPopup": {
      "lblAdd": "添加",
      "lblEdit": "编辑",
      "disabled": "由于已达到允许的最大 %LBL_LAYOUT% 数，因此禁用“添加”。",
      "titleAdd": "添加",
      "titleEdit": "编辑",
      "stepMainStageNextTooltip": "输入 %LBL_LAYOUT% 标题和内容",
      "titlePlaceholder": "%LBL_LAYOUT% 标题..."
    },
    "textEditor": {
      "placeholder1": "在此添加文本、链接和小图形。",
      "placeholder2": "如果留空，面板将隐藏起来。",
      "editorActionsTitle": "故事操作",
      "editorActionsHelpDescr": "在叙述中创建链接，帮助您讲述故事。故事操作可链接到另一章节或更改主要部分。例如，您可以配置操作将地图移动到另一位置、切换地图图层的打开/关闭状态，或将主要部分媒体更改为其他图片、视频、地图或 web 页面。",
      "mainStageDisabled": "最大化编辑器时禁用故事操作"
    },
    "organizePopup": {
      "title": "组织",
      "lblHeader": "拖放 %LBL_LAYOUT% 以对故事进行组织。",
      "lblColTitle": "标题",
      "lblColStatus": "状态",
      "btnApplyWarning": "确认删除 %NB% 个 %LBL_LAYOUT%",
      "deleteTooltip": "删除",
      "firstSectionExplain": "(无法移动主目录节)"
    },
    "help": {
      "lblHelp": "帮助",
      "lblAdd": "添加",
      "lblSettings": "设置",
      "lblOrga": "组织",
      "lblEdit": "编辑",
      "lblPublish": "共享",
      "lblTips": "提示",
      "lblMore": "是否想了解更多信息?",
      "lblLink": "访问 Esri Story Maps 网站。",
      "content1Div1": "要创建 %TPL_NAME%，请使用“添加”按钮将各个地图或其他内容添加到布局中。其他内容可包括图像、视频或者嵌入式网页或代码。例如，您可能希望读者在首次启动 %TPL_NAME% 时先看到介绍图像，然后再继续浏览地图。",
      "content1Div2": "单击“添加”按钮时，将出现一个对话框，您可在其中选择并配置想要添加的地图或其他内容。例如，可指定希望地图显示的位置、启用地图图例等等。",
      "content2Div1": "可在“设置”对话框中更改 %TPL_NAME% 的外观。更改布局，选择其他配色方案，选择地图图例的显示位置等等。",
      "content2Div2": "您还可以使用自己的徽标来替换 %TPL_NAME% 标题中的 Esri 徽标以反映您的品牌。您还可以指定当读者单击您的徽标时将启动的网站，以便读者获取详细信息。",
      "content3Div1": "可通过“组织”对话框管理您的 %TPL_NAME%。在此对话框中，可通过拖放更改系列的顺序。",
      "content3Div2": "您也可删除内容或将其隐藏起来。如果正在准备尚未包含在故事地图中的新内容，隐藏功能则十分有用。",
      "content4Div1": "发现错误或需要更改内容？别担心。在整个应用程序中查找编辑图标，以对内容进行更改。如开发 %TPL_NAME% 时那样您可多次使用编辑功能！",
      "content5Div1": "保存 %TPL_NAME% 时，最初状态为私有。使用“共享”按钮将其共享给其他人。您可以将 %TPL_NAME% 公开共享，这样所有人都可对其进行访问。",
      "content5Div2": "根据您的帐户，您还可以选择将 %TPL_NAME% 仅共享给组织内的人员，这样其他人便无法对其进行访问。",
      "content6Div1": "默认情况下，系列中的地图会同步为显示相同位置。这意味着，第一个地图中显示的位置将自动应用到所有其他地图，如果读者在当前查看的地图上缩放或平移到不同位置，此更改也会应用到其他地图。",
      "content6Div2": "例如，如果系列显示城市的不同专题数据，读者可缩放至邻近区域，然后只需在选项卡间切换即可查看不同区域的地图。",
      "content6Div3": "要禁用位置同步，请转至“设置”对话框并在“地图选项”选项卡中取消选中相应设置。",
      "content6AltDiv1": "默认情况下，地图位置是同步的。禁用同步即可允许各个地图显示不同的位置。",
      "content6AltDiv2": "同步开启",
      "content6AltDiv3": "同步关闭",
      "content6AltDiv4": "要禁用同步，请转至“设置”>“地图选项”并取消选中“同步地图位置”。"
    },
    "landing": {
      "lblAdd": "若要调用 %LAYOUT_TITLE% Map Series 需要执行什么操作?",
      "phAdd": "输入标题...",
      "lblOR": "或",
      "lblHelp": "浏览",
      "quote0": "故事总是可以带人进入一个不同寻常的世界。",
      "quote1": "讲故事是目前向世界传递想法的最有效方式。",
      "quote2": "实际上，我们通过讲故事来创造世界。如果您想改变世界，您只需改变您的故事。这个道理既适用于个人，也适用于机构。",
      "quote3": "故事是维系人类与真理之间的最短距离。",
      "quote4": "人们不需要更多信息。他们一直忙于处理各种信息。他们需要信念，即您在故事中叙述的对您自身、您的目标以及成功的信念。",
      "quote5": "我确信，人们努力寻求真正有意义的故事，具有救赎性、鼓舞人心且超越人类自身的故事。",
      "quote6": "如果您想对某一个人或团体产生影响，使其在日常生活中拥有特殊价值，请为他们讲述一个引人入胜的故事。",
      "quote7": "如果您向我叙述，那么这是一篇论文。如果您向我展示，那么这便是一个故事。",
      "quote8": "如果您不识树木，则可迷失于森林中；但如果您不了解故事，则会在生活中迷失自我。",
      "quote9": "故事通过具有创造性的创作将生活本身转化为更强有力、更为明确且更有意义的体验。故事是连通人类的桥梁。",
      "quote10": "如果人类不能讲述自己内心的故事，那么他所要承受的痛苦可想而知。",
      "quote11": "也许故事只是有灵魂的数据。",
      "quote12": "故事是领导者的武器库中最强有力的武器。",
      "quote13": "故事的本质使其能够承载远远超越其本身的意义。"
    }
  }
});