define({
  "viewer": {
    "common": {
      "close": "关闭",
      "focusMainstage": "向介质发送键盘焦点",
      "expandImage": "展开图像"
    },
    "a11y": {
      "skipToContent": "跳转至内容",
      "headerAria": "故事标题",
      "panelAria": "故事内容",
      "mainStageAria": "当前故事条目媒体",
      "logoLinkAria": "徽标链接",
      "toTop": "转到第一个条目",
      "focusContent": "返回到内容",
      "navAria": "故事条目",
      "toEntryAria": "转到条目 %ENTRY_NUMBER%: %ENTRY_TITLE%",
      "entryAria": "条目 %ENTRY_NUMBER%: %ENTRY_TITLE%",
      "loadingAria": "故事内容正在加载中",
      "skipBelowContent": "跳过下方此内容",
      "skipBelowVideo": "跳过下方此视频",
      "skipAboveContent": "跳过上方此内容",
      "skipAboveVideo": "跳过上方此视频",
      "moreEntries": "更多条目"
    },
    "loading": {
      "long": "故事正在初始化",
      "long2": "谢谢等候",
      "failButton": "重新加载故事"
    },
    "signin": {
      "title": "需要进行身份验证",
      "explainViewer": "请登录在 %PORTAL_LINK% 上的账户，以便访问此故事。",
      "explainBuilder": "请登录在 %PORTAL_LINK% 上的账户，以便配置此故事。"
    },
    "errors": {
      "boxTitle": "发生错误",
      "invalidConfig": "配置无效",
      "invalidConfigNoApp": "未在 index.html 中指定 Web 制图应用程序标识符。",
      "invalidConfigNoAppDev": "未在 URL 参数(?appid=)中指定 Web 制图应用程序标识符。在开发模式下，将忽略 index.html 中的 appid 配置。",
      "unspecifiedConfigOwner": "尚未配置授权的所有者。",
      "invalidConfigOwner": "未授权故事所有者。",
      "createMap": "无法创建地图",
      "invalidApp": "%TPL_NAME% 不存在或不可访问。",
      "appLoadingFail": "发生了一些错误， %TPL_NAME% 未正确加载。",
      "notConfiguredDesktop": "尚未配置此故事。",
      "notConfiguredMobile": "此显示器大小不支持 %TPL_NAME% 构建器。如果可能，请调整您的浏览器尺寸以访问构建器或用更大的屏幕在设备上构建您的故事。",
      "notConfiguredMobile2": "请将您的设备旋转至横向来使用 %TPL_NAME% 构建器。",
      "notAuthorized": "您无权访问此故事",
      "notAuthorizedBuilder": "您无权使用 %TPL_NAME% 构建器。",
      "noBuilderIE": "低于版本 %VERSION% 的 Internet Explorer 不支持构建器。%UPGRADE%",
      "noViewerIE": "低于版本 %VERSION%. %UPGRADE% 的 Internet Explorer 不支持此故事。",
      "noViewerIE2": "您尝试查看故事所使用的浏览器版本过旧，不受支持。某些要素可能无法正常运行或出现非预期问题。我们建议您将浏览器更新至 Internet Explorer 11 或使用 Chrome 等其他浏览器。",
      "noViewerIE3": "2017 年底，将无法在此浏览器中加载此故事。届时，您必须使用受支持的浏览器查看此故事。",
      "upgradeBrowser": "<a href='http://browsehappy.com/' target='_blank'>请更新您的浏览器</a>。",
      "mapLoadingFail": "发生了一些错误，地图未正确加载。",
      "signOut": "登出",
      "attention": "注意!"
    },
    "mainStage": {
      "back": "返回",
      "errorDeleted": "此链接为非活动链接(章节已被删除)",
      "errorNotPublished": "此链接为非活动链接(章节未发布)"
    },
    "panel": {
      "collapse": "折叠面板",
      "expand": "展开面板"
    },
    "mobileInfo": {
      "legend": "图例",
      "description": "描述",
      "lblLegendMobileError": "抱歉，图例不可用。请重新加载故事。",
      "lblLegendMobileErrorExplain": "如果设备在加载故事后旋转到纵向模式，则图例不可用。"
    },
    "mobileFooter": {
      "swipeInvite": "滑动浏览故事",
      "lblNext": "下一页",
      "lblEnd": "您已到达故事末尾"
    },
    "headerFromCommon": {
      "storymapsText": "故事地图",
      "builderButton": "编辑",
      "facebookTooltip": "共享至 Facebook",
      "twitterTooltip": "共享至 Twitter",
      "bitlyTooltip": "获取短链接",
      "templateTitle": "设置模板标题",
      "templateSubtitle": "设置模板子标题",
      "share": "共享",
      "checking": "正在检查您的故事内容",
      "fix": "修复在您故事中的问题",
      "noerrors": "未检测到问题",
      "tooltipAutoplayDisabled": "这不适用于自动播放模式",
      "notshared": "故事未共享"
    },
    "mapFromCommon": {
      "overview": "鹰眼图",
      "legend": "图例",
      "home": "缩放主页"
    },
    "shareFromCommon": {
      "copy": "复制",
      "copied": "已复制",
      "open": "打开",
      "embed": "嵌入到网页",
      "embedExplain": "使用以下 HTML 代码将故事嵌入到 Web 页面中。",
      "size": "大小(宽度/高度):",
      "autoplayLabel": "自动播放模式",
      "autoplayExplain1": "自动播放模式将定期持续播放您的故事。该模式是广告亭或公共显示屏的理想选择，但请注意，在其他情景下会使故事难以阅读。小型显示器不支持该功能。",
      "autoplayExplain2": "激活此模式时，可使用控件播放/暂停故事和调整导航速度。",
      "linksupdated": "链接已更新!"
    },
    "locatorFromCommon": {
      "error": "位置不可用"
    }
  }
});