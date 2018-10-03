define(["lib-build/css!./Builder",
		"lib-build/css!lib-app/font-awesome/css/font-awesome.min",
		"esri/arcgis/Portal",
		"./BuilderPanel",
		"./settings/SettingsPopup",
		"./BuilderHelper",
		"./MyStoriesWrapper",
		"../utils/CommonHelper",
		"../utils/WebMapHelper",
		'./media/image/FileUploadHelper',
		"dojo/_base/lang",
		"dojo/_base/array",
		"dojo/_base/Color",
		"dojo/has",
		"esri/arcgis/utils",
		"esri/IdentityManager",
		"esri/request",
		"dojo/topic",
		"storymaps/common/ui/bannerNotification/BannerNotification",
		"lib-app/history.min"],
	function(
		viewCss,
		fontAwesomeCss,
		esriPortal,
		BuilderPanel,
		SettingsPopup,
		BuilderHelper,
		MyStoriesWrapper,
		CommonHelper,
		WebMapHelper,
		fileUploadHelper,
		lang,
		array,
		Color,
		has,
		arcgisUtils,
		IdentityManager,
		esriRequest,
		topic,
		BannerNotification)
	{
		var _core = null,
			_builderView = null,
			_builderPanel = new BuilderPanel(
				$('#builderPanel'),
				saveAppThenWebmap,
				builderDirectCreationFirstSave,
				builderGalleryCreationFirstSave
			),
			_settingsPopup = null;

		function init(core, builderView)
		{
			_core = core;
			_builderView = builderView;
			_settingsPopup = new SettingsPopup($("#settingsPopup"));

			console.log("common.builder.Builder - init");

			if( ! CommonHelper.getAppID(_core.isProd()) && ! app.isDirectCreation ) {
				console.error("common.builder.Builder - abort builder initialization, no appid supplied");
				return;
			}
			else if ( app.isDirectCreation )
				console.log("common.builder.Builder - Builder start in direct creation mode");
			else if ( app.isGalleryCreation )
				console.log("common.builder.Builder - Builder start in gallery creation mode");

			$("body").addClass("builder-mode");

			// Add the default StoryMaps theme
			//app.cfg.COLOR_SCHEMES.splice(0, 0, app.cfg.COLORS);

			_builderView.init(_settingsPopup);
			_builderPanel.init(_builderView);

			// TODO
			_settingsPopup.init(_builderView);
			_settingsPopup.initLocalization();

			topic.subscribe("BUILDER_INCREMENT_COUNTER", _builderPanel.incrementSaveCounter);
			topic.subscribe("HEADER_EDITED", headerEdited);

			// My Stories
			topic.subscribe("BUILDER-MY-STORIES-CHECK", MyStoriesWrapper.scanStory);

			// Reload / close confirmation if there is unsaved change
			window.onbeforeunload = function (e) {
				e = e || window.event;

				if( ! _builderPanel.hasPendingChange() )
					return;

				if (e)
					e.returnValue = i18n.commonCore.builderPanel.closeWithPendingChange;

				return i18n.commonCore.builderPanel.closeWithPendingChange;
			};

			app.builder.cleanApp = cleanApp;

			// Show https-transition notification when app loads
			topic.subscribe('tpl-ready', function() {
				if (!app.isPortal) {
					var stringsHttps = i18n.commonCore.httpsTransitionMessage;

					new BannerNotification({
						id: "httpsTransitionMessage",
						bannerMsg: stringsHttps.bannerMsg,
						mainMsgHtml: '\
							<h2>' + stringsHttps.s1h1 + '</h2>\
							<p>' + stringsHttps.s1p1 + '</p>\
							<p>' + stringsHttps.s1p2 + '</p>\
							<h2>' + stringsHttps.s2h1 + '</h2>\
							<p>' + stringsHttps.s2p1 + '</p>\
						',
						actions: [
							{
								primary: true,
								string: stringsHttps.action1,
								closeOnAction: true
							},
							{
								string: stringsHttps.action2,
								action: function() {
									window.open('https://storymaps.arcgis.com/en/my-stories/');
								}
							},
							{
								string: stringsHttps.action3,
								action: function() {
									window.open('https://links.esri.com/storymaps/web_security_faq');
								}
							}
						],
						cookie: {
							domain: 'arcgis.com',
							path: '/',
							maxAge: 60 * 60 * 24 * 365
						}
					});
				}
			});
		}

		function appInitComplete()
		{
			var storyTitle = "",
				itemTitle = "";

			if ( app.data.getWebAppData().getTitle() ) {
				storyTitle = app.data.getWebAppData().getTitle().trim();
			}

			if (app.data.getWebAppItem() && app.data.getWebAppItem().title ) {
				itemTitle = app.data.getWebAppItem().title.trim();
			}

			app.builder.titleMatchOnLoad = itemTitle == storyTitle;

			if (app.data.getWebAppData().isBlank()) {
				app.builder.titleMatchOnLoad = true;
			}

			if (app.data.getWebAppData().getAppGeocoders) {
				configureAppGeocoders();
			}

			/* themes */
			var x; // walker
			if ((x = app.portal) && (x = x.portalProperties) && (x = x.sharedTheme)) {
				if (hasOrgTheme(x) && !app.appCfg.noAppThemes) {
					addOrgThemeToConfig(x);
				}
				if (hasOrgLogo(x)) {
					addOrgLogoToConfig(x);
				}
			}

			if(!app.appCfg.noAppThemes)
				addModifiedThemeToConfig();

			var y; // walker
			if (!app.appCfg.noAppThemes && (y = app.data.getWebAppData().getTheme()) && (y = y.colors)) {
				if (y.name && y.name.match(/-org$|-modified$/)) {
					// put these up here for better changing
					var btnBlue = '#418abb',
							textBlue = '#67AAE5',
							textDark = '#404040',
							btnGray = '#939393';

					$('body').addClass('builder-shadows');
					var mediaBlueShadows = CommonHelper.colorsAreSimilar(y.media, textBlue) || CommonHelper.colorsAreSimilar(y.media, btnBlue);
					$('body').toggleClass('media-blues', mediaBlueShadows);
					var mediaDarkShadows = CommonHelper.colorsAreSimilar(y.media, textDark);
					$('body').toggleClass('media-dark', mediaDarkShadows);
					var mediaGrayShadows = CommonHelper.colorsAreSimilar(y.media, btnGray);
					$('body').toggleClass('media-gray', mediaGrayShadows);
					var panelBlueShadows = CommonHelper.colorsAreSimilar(y.panel, btnBlue);
					$('body').toggleClass('panel-blues', panelBlueShadows);
				}
			}

			_builderPanel.updateSharingStatus();
			_builderView.appInitComplete();
		}

		function hasOrgTheme(sharedTheme) {

			var hasValues = false;
			if (sharedTheme.header) {
				hasValues = colorExists(sharedTheme.header.text) || colorExists(sharedTheme.header.background);
			}
			if (!hasValues && sharedTheme.body) {
				hasValues = colorExists(sharedTheme.body.text) || colorExists(sharedTheme.body.background) || colorExists(sharedTheme.body.link);
			}
			if (!hasValues && sharedTheme.button) {
				hasValues = colorExists(sharedTheme.button.text) || colorExists(sharedTheme.button.background);
			}
			return hasValues;
		}

		function hasOrgLogo(sharedTheme) {
			return (sharedTheme.logo && sharedTheme.logo.small);
		}

		function configureAppGeocoders() {
			if (!app.data.getWebAppData().getAppGeocoders()) {
				addAppGeocoders();
			}
		}

		function addAppGeocoders() {
			if (app.portal.helperServices.geocode && app.portal.helperServices.geocode.length) {
				var ajaxArr = [];
				var originalSources = [];
				$.each(app.portal.helperServices.geocode, function (index, geocoder) {
					if (geocoder.url) {
						if(window.location.protocol == "https:"){
							if(geocoder.url.indexOf('https') < 0){
								return;
							}
						}
						ajaxArr.push($.getJSON(geocoder.url + '?f=json'));
						originalSources.push(geocoder);
					}
				});
				$.when.apply($, ajaxArr).done(function() {
					var geocoderResponses = (ajaxArr.length > 1) ? arguments : [arguments];
					var sources = [];
					$.each(geocoderResponses, function(index, xhrResponse) {
						var responseJson = xhrResponse[0];
						var textStatus = xhrResponse[1];
						if (!responseJson || responseJson.error || !responseJson.singleLineAddressField || !textStatus || textStatus !== 'success') {
							return;
						}
						var sourceInfo = originalSources[index];
						sources.push({
							singleLineFieldName: responseJson.singleLineAddressField.name,
							name: responseJson.name || sourceInfo.name,
							placeholder: sourceInfo.placeholder,
							url: sourceInfo.url
						});
					});
					app.data.getWebAppData().setAppGeocoders(sources);
					// save this setting now (since this is happening on startup)
					if (app.data.getWebAppItem().id) {
						if(app.isGalleryCreation && app.appCfg.disableGalleryCreationSaveGeocoders)
							return;
						saveApp(false, function() {});
					}
				});
			}
		}

		function addOrgThemeToConfig(sharedTheme) {
			var webAppData = app.data.getWebAppData();
			var themeWithFallbacks = {
				header: {
					text: colorExists(sharedTheme.header.text) || '#fff',
					background: colorExists(sharedTheme.header.background) || '#333'
				},
				body: {
					text: colorExists(sharedTheme.body.text) || '#333',
					background: colorExists(sharedTheme.body.background) || '#fff',
					link: colorExists(sharedTheme.body.link || sharedTheme.body.text) || '#666'
				},
				button: {
					text: colorExists(sharedTheme.button.text) || '#ccc',
					background: colorExists(sharedTheme.button.background) || '#999'
				}
			};

			var safeBodyLink = themeWithFallbacks.body.link || themeWithFallbacks.body.text;
			var translatedTheme = {
				group: 'org',
				themeMajor: getWhiteOrBlackText(themeWithFallbacks.header.background),
				header: themeWithFallbacks.header.background,
				headerText: themeWithFallbacks.header.text,
				headerTitle: themeWithFallbacks.header.text,
				panel: themeWithFallbacks.body.background,
				text: themeWithFallbacks.body.text,
				textLink: safeBodyLink,
				media: getMediaBackground(themeWithFallbacks),
				mapControls: themeWithFallbacks.body.background,
				softText: themeWithFallbacks.body.text,
				softBtn: themeWithFallbacks.body.text,
				esriLogo: getWhiteOrBlackText(themeWithFallbacks.header.background),
				esriLogoMobile: 'black' // ???
			};
			var setOrgTheme = app.isInitializing && !webAppData.getTheme().colors;
			app.cfg.LAYOUTS.forEach(function(layout) {
				var alreadyHasOrgTheme = layout.themes.some(function(theme) {
					if (theme.name.match(/-org$/)) {
						return true;
					}
					return false;
				});
				if (!alreadyHasOrgTheme) {
					var moreOptions = {
						name: layout.id + '-org'
					};
					if (layout.id === 'tab' || layout.id === 'bullet') {
						lang.mixin(moreOptions, {
							// active tab
							tabActive: themeWithFallbacks.button.background,
							tabTextActive: themeWithFallbacks.button.text,
							// non-active tab
							tab: getColorRGBA(themeWithFallbacks.button.background, 0.75),
							tabText: getColorRGBA(themeWithFallbacks.button.text, 0.6),
							// non-active tab hover
							tabHover: getColorRGBA(themeWithFallbacks.button.background, 0.9),
							tabTextHover: getColorRGBA(themeWithFallbacks.button.text, 0.8)
						});
					} else if (layout.id === 'accordion') {
						lang.mixin(moreOptions, {
							// accordion text (doesn't change for active/non-active)
							// used body.link here instead of button because background is body.background.
							accordionNumber: safeBodyLink,
							accordionTitle: safeBodyLink,
							// arrow color for active section
							accordionArrowActive: safeBodyLink,
							// arrow color for non-active section
							accordionArrow: getColorRGBA(safeBodyLink, 0.6),
							// arrow color for non-active section on hover
							accordionArrowHover: getColorRGBA(safeBodyLink, 0.8)
						});
					}
					layout.themes.push(lang.mixin(moreOptions, translatedTheme));
				}

				// set to org colors if app.isInitializing
				if (setOrgTheme && layout.id === webAppData.getLayout().id) {
					webAppData.setTheme({
						colors: layout.themes[layout.themes.length - 1]
					});
					topic.publish('CORE_UPDATE_UI');
				}
			});

			if (setOrgTheme && !webAppData.getLayout().id) {
				var layout0themes = app.cfg.LAYOUTS[0];
				webAppData.setTheme({
					colors: layout0themes[layout0themes.length - 1]
				});
			}
		}

		function colorExists(color) {
			if (!color || color === 'no-color') {
				return false;
			}
			return color;
		}

		function getColorRGBA(color, opacity) {
			var djColor = new Color(color);
			djColor.a = opacity;
			return djColor.toString(); // returns rgba(...);
		}

		function addOrgLogoToConfig(sharedTheme) {
			app.cfg.HEADER_ORG_LOGO_URL = sharedTheme.logo.small;
			// set app logo to org logo if app.isInitializing
			if (app.isInitializing && !app.data.getWebAppData().getHeader().logoURL) {
				var newHeaderConfig = _core.getHeaderUserCfg();
				var clickthroughLink = sharedTheme.logo.link ? sharedTheme.logo.link.trim() : '';
				lang.mixin(newHeaderConfig, {
					logoURL: sharedTheme.logo.small,
					logoTarget: clickthroughLink
				});
				app.data.getWebAppData().setHeader(newHeaderConfig);
				topic.publish('CORE_UPDATE_UI');
			}
		}

		function addModifiedThemeToConfig() {
			var currentTheme = app.data.getWebAppData().getTheme();
			var currentColors = currentTheme.colors;
			if (!currentColors || !currentColors.name) {
				return;
			}
			var nameArr = currentColors.name.split('-');
			var currentLayout = nameArr[0];

			var commonProps = ['header', 'headerText', 'headerTitle', 'panel', 'text', 'textLink', 'media', 'mapControls', 'softText', 'softBtn'];
			var moreTabProps = ['tab', 'tabActive', 'tabHover', 'tabText', 'tabTextHover', 'tabTextActive'];
			var moreAccordionProps = ['accordionArrow', 'accordionArrowHover', 'accordionArrowActive', 'accordionNumber', 'accordionTitle'];

			var found = app.cfg.LAYOUTS.some(function(layout) {
				if (currentLayout !== layout.id) {
					return false;
				}
				var specificProps;
				if (layout.id === 'tab' || layout.id === 'bullet') {
					specificProps = commonProps.concat(moreTabProps);
				} else if (layout.id === 'accordion') {
					specificProps = commonProps.concat(moreAccordionProps);
				}
				return layout.themes.some(function(colors) {
					return specificProps.every(function(prop) {
						return currentColors[prop] === colors[prop];
					});
				});
			});

			if (found) {
				return;
			}

			app.cfg.LAYOUTS.forEach(function(layout) {
				var newColors = {
					name: layout.id + '-' + nameArr.slice(1).join('-'),
					group: 'modified'
				};
				if (!newColors.name.match(/-modified$/)) {
					newColors.name += '-modified';
				}
				if (currentLayout === layout.id) {
					lang.mixin(currentColors, newColors);
					// get new name to stick in current config
					app.data.getWebAppData().setTheme({
						colors: currentColors
					});
					// otherwise, the app uses the old name of the theme to
					// set the colors.
					topic.publish('CORE_UPDATE_UI');
					layout.themes.push(currentColors);
					return;
				}
				var key;
				if (layout.id === 'tab' || layout.id === 'bullet') {
					for (key in currentColors) {
						if (currentColors.hasOwnProperty(key)) {
							if (moreAccordionProps.indexOf(key) < 0 && key !== 'name' && key !== 'group') {
								newColors[key] = currentColors[key];
							}
						}
					}

					var tabBackground = '#333';
					var tabText = '#eee';
					newColors = lang.mixin({
						// active, selected tab
						tabActive: tabBackground,
						tabTextActive: tabText,
						// non-active tab
						tab: getColorRGBA(tabBackground, 0.75),
						tabText: getColorRGBA(tabText, 0.6),
						// non-active tab hover
						tabHover: getColorRGBA(tabBackground, 0.9),
						tabTextHover: getColorRGBA(tabText, 0.8),
						// group to keep selected.
						group: 'modified'
					}, currentColors, newColors);

				} else if (layout.id === 'accordion') {

					for (key in currentColors) {
						if (currentColors.hasOwnProperty(key)) {
							if (moreAccordionProps.indexOf(key) < 0 && key !== 'name') {
								newColors[key] = currentColors[key];
							}
						}
					}
					newColors = lang.mixin({
						// accordion text (doesn't change for active/non-active)
						// used textLink here instead of button because background is body.background.
						accordionNumber: currentColors.textLink,
						accordionTitle: currentColors.textLink,
						// arrow color for active section
						accordionArrowActive: currentColors.textLink,
						// arrow color for non-active section
						accordionArrow: getColorRGBA(currentColors.textLink, 0.6),
						// arrow color for non-active section on hover
						accordionArrowHover: getColorRGBA(currentColors.textLink, 0.8),
						group: 'modified'
					}, currentColors, newColors);
				}
				layout.themes.push(newColors);
			});
		}

		function getWhiteOrBlackText(bgColor) {
			var yiq = getYIQ(bgColor);
			return (yiq >= 128) ? 'black' : 'white';
		}

		function getMediaBackground(/*sharedTheme*/) {
			// var yiq = getYIQ(sharedTheme.body.background);
			// return (yiq >= 128) ? '#888' : '#eee';
			return '#eee';
		}

		function getYIQ(thisColor) {
			var djColor = new Color(thisColor);
			var rgbArr = djColor.toRgb();
			return (rgbArr[0] * 299 + rgbArr[1] * 587 + rgbArr[2] * 114) / 1000;
		}

		function resize(cfg)
		{
			_builderPanel.resize();
			_builderView.resize(cfg);
		}

		//
		// Header
		//

		function headerEdited(param)
		{
			if ( ! param.src )
				return;

			// Title and subtitle initially comes from the web map
			// They are saved in web app data only if they are edited
			// So if they are never edited in the app, web map edition are reflected in the app
			if( param.src == "title" ) {
				if( param.value == i18n.commonCore.inlineFieldEdit.enterTitle)
					param.value = "";
				if( ! app.data.getWebMap() || param.value != app.data.getWebMap().item.title ) {
					if( param.value != app.data.getWebAppData().getTitle() ) {
						app.data.getWebAppData().setTitle(param.value);
						_builderPanel.incrementSaveCounter();
					}
				}
				else
					app.data.getWebAppData().setTitle("");
			}
			else if ( param.src == "subtitle" ) {
				if( param.value == i18n.commonCore.inlineFieldEdit.enterSubtitle)
					param.value = "";
				if( ! app.data.getWebMap() || param.value != app.data.getWebMap().item.snippet ) {
					if( param.value != app.data.getWebAppData().getSubtitle() ) {
						app.data.getWebAppData().setSubtitle(param.value);
						_builderPanel.incrementSaveCounter();
					}
				}
				else
					app.data.getWebAppData().setSubtitle("");
			}
		}

		//
		// Save
		//

		function saveAppThenWebmap(doNotOverwriteTitle)
		{
			if ( ! app.portal ) {
				console.error("Fatal error - not signed in");
				appSaveFailed("APP");
				return;
			}

			app.portal.signIn().then(
				function(){
					saveApp(doNotOverwriteTitle, function(response){
						if (!response || !response.success) {
							appSaveFailed("APP");
							return;
						}

						// For SL pass thru work flow, we don't want to touch the web map.
						// It is managed by the author outside of the builder
						if(!app.data.getWebAppData().getIsExternalData || !app.data.getWebAppData().getIsExternalData()){
							saveWebmap(function(response2){
								if (!response2 || !response2.success) {
									appSaveFailed("WEBMAP");
									return;
								}

								appSaveSucceeded({ success: true });
							});
						} else if (app.data.getWebAppData().getIsExternalData()) {
							appSaveSucceeded({ success: true });
						}
					});
				},
				function(error) {
					appSaveFailed("APP", error);
				}
			);
		}

		function builderDirectCreationFirstSave(title, subtitle)
		{
			if ( ! app.portal ) {
				console.error("Fatal error - not signed in");
				appSaveFailed("APP");
				return;
			}

			var uid = IdentityManager.findCredential(getPortalURL()).userId;

			// Create the app item
			app.data.setWebAppItem(
				lang.mixin(
					BuilderHelper.getBlankAppJSON(),
					{
						title: title,
						snippet: subtitle,
						uploaded: Date.now(),
						modified: Date.now(),
						owner: uid,
						access: 'private'
					}
				)
			);

			var saveAppCallback = function(response2){
				if (!response2 || !response2.success) {
					appSaveFailed("APP");
					return;
				}

				var baseUrl = document.location.protocol + '//' + document.location.host + document.location.pathname;
				if ( ! baseUrl.match(/index\.html$/) )
					baseUrl += "index.html";

				// Update the app item
				app.data.setWebAppItem(
					lang.mixin(
						app.data.getWebAppItem(),
						{
							id: response2.id,
							item: response2.item,
							url: baseUrl + '?appid=' + response2.id
						}
					)
				);

				// Add some metadata
				if ( app.isDirectCreationOpenData ) {
					app.data.getWebAppItem().tags.push('open-data-favorite');
					app.data.getWebAppItem().properties = {
						content: "story map",
						datasetType: "story map",
						url: baseUrl + '?appid=' + response2.id
					};
				}

				var updateItemUrl = function ()
				{
					// Save the app a second time
					saveApp(false, function(response3){
						if (!response3 || !response3.success) {
							appSaveFailed("APP");
							return;
						}

						console.log('common.builder.Builder - firstSaveForDirectCreation - appid:', response3.id, ' webmap:', /*typeof response != "undefined" ? response.id :*/ null);

						appSaveSucceeded({ success: true });
						app.isDirectCreationFirstSave = false;
						_builderPanel.updateSharingStatus();
						topic.publish("DIRECT_CREATION_SAVE");

						History.replaceState({}, "", "index.html?appid=" + response3.id + "&edit");
					});
				};

				// If need to add to favorites
				// (not stable when done after the second save operation - the second save would not persist all the properties)
				if ( app.isDirectCreationOpenData ) {
					var groupId = app.portal.getPortalUser().favGroupId,
						url = getPortalURL() + "/sharing/rest/content/items/" + response2.id + "/share";

					esriRequest(
						{
							url: url,
							handleAs: 'json',
							content: {
								everyone: false,
								org: false,
								groups: groupId,
								items: response2.id
							}
						},
						{
							usePost: true
						}
					).then(updateItemUrl, updateItemUrl);
				}
				else {
					updateItemUrl();
				}
			};

			app.portal.signIn().then(
				function() {
					if (app.appCfg.webmapStory) {
						var webMapItem = app.data.getWebMap();

						lang.mixin(
							webMapItem.item,
							{
								title: title,
								snippet: subtitle,
								uploaded: Date.now(),
								modified: Date.now(),
								owner: uid,
								access: 'private'
							}
						);

						// TODO : support app that rely on webmap and app that don't
						saveWebmap(function(response){
							if( ! response || ! response.success ) {
								appSaveFailed("WEBMAP");
								return;
							}

							// Save the webmp id in the app definition
							app.data.getWebAppData().setWebmap(response.id);

							// Update the webmap item
							var webMapItem = app.data.getWebMap();
							lang.mixin(
								webMapItem.item,
								{
									id: response.id,
									item: response.item
								}
							);

							protectItems();

							saveApp(false, saveAppCallback);
						});
					}
					else {
						saveApp(false, saveAppCallback);
					}
				},
				function(error) {
					appSaveFailed("APP", error);
				}
			);
		}

		// TODO this is only used in Map Tour (MJ doesn't goes there because of app.appCfg.useWebmapInApp)
		// The flag is never set properly in MJ. Should be more generic, MJ doesn't save a webmap...
		function builderGalleryCreationFirstSave()
		{
			if ( ! app.portal ) {
				console.error("Fatal error - not signed in");
				appSaveFailed("APP");
				return;
			}

			var uid = IdentityManager.findCredential(getPortalURL()).userId;

			// Update the webmap item
			var webMapItem = app.data.getWebMap();
			lang.mixin(
				webMapItem.item,
				{
					title: app.data.getWebMap().item.title ? app.data.getWebMap().item.title : app.data.getWebAppItem().title,
					uploaded: Date.now(),
					modified: Date.now(),
					owner: uid
				}
			);

			// Save the webmap in the same folder than the app
			if( app.data.getWebAppItem().ownerFolder )
				webMapItem.item.ownerFolder = app.data.getWebAppItem().ownerFolder;

			app.portal.signIn().then(
				function(){
					saveWebmap(function(response){
						if( ! response || ! response.success || ! response.id ) {
							appSaveFailed("WEBMAP");
							return;
						}

						// Save the webmp id in the app definition
						app.data.getWebAppData().setWebmap(response.id);

						// Update the webmap item
						var webMapItem = app.data.getWebMap();
						lang.mixin(
							webMapItem.item,
							{
								id: response.id,
								item: response.item
							}
						);

						protectItems();

						// Save the app
						saveApp(false, function(response2){
							if (!response2 || !response2.success) {
								appSaveFailed("APP");
								return;
							}

							var successCallback = function() {
								console.log('common.builder.Builder - builderGalleryCreationFirstSave - appid:', response2.id, ' webmap:', response.id);

								appSaveSucceeded({ success: true });
								app.isGalleryCreation = false;
								_builderPanel.updateSharingStatus();

								History.replaceState({}, "", "index.html?appid=" + response2.id + "&edit");
							};

							// Share the webmap and eventual FS if the app isn't private
							var sharingMode = app.data.getWebAppItem().access;
							if( sharingMode != 'private' ) {
								var targetItems = [app.data.getWebMap().item.id];

								shareItems(targetItems.join(','), sharingMode).then(function(response){
									var success = response
										&& response.results
										&& response.results.length == targetItems.length;

									if (success) {
										$.each(response.results, function(i, result){
											if( ! result.success )
												success = false;
										});

										if ( success )
											successCallback();
										else
											appSaveFailed("WEBMAP");
									}
									else
										appSaveFailed("WEBMAP");
								});
							}
							else
								successCallback();
						});
					});
				},
				function(error) {
					appSaveFailed("APP", error);
				}
			);
		}

		//
		// Web mapping application save
		//

		function saveApp(doNotOverwriteTitle, nextFunction)
		{
			var portalUrl = getPortalURL(),
				appItem = lang.clone(app.data.getWebAppItem()),
				uid = appItem.owner || IdentityManager.findCredential(portalUrl).userId,
				token  = IdentityManager.findCredential(portalUrl).token;

			// Remove properties that don't have to be committed
			delete appItem.avgRating;
			delete appItem.modified;
			delete appItem.numComments;
			delete appItem.numRatings;
			delete appItem.numViews;
			delete appItem.size;

			//
			// Add/edit the typeKeyword property to be able to identify the app and the layout
			//

			if ( ! appItem.typeKeywords )
				appItem.typeKeywords = [];

			// App not created through the builder fromScratch mode don't get those keywords
			appItem.typeKeywords = appItem.typeKeywords.concat(app.cfg.WEBAPP_KEYWORD_APP);

			// Those should only be necessary to be able to convert an appid that wasn't already selfConfigured
			appItem.typeKeywords = appItem.typeKeywords.concat(app.cfg.WEBAPP_KEYWORD_GENERIC);

			// Layout
			var layouts = $.map(app.cfg.LAYOUTS, function(layout){ return "layout-" + layout.id; });
			// Filter previous layout keyword
			appItem.typeKeywords = $.grep(appItem.typeKeywords, function(keyword) {
				return $.inArray(keyword, layouts) == -1;
			});
			// Add actual layout keyword
			appItem.typeKeywords.push("layout-" + app.data.getWebAppData().getLayoutId());

			// Make the typeKeywords array unique
			appItem.typeKeywords = $.grep(appItem.typeKeywords, function(keyword, index) {
				return index == $.inArray(keyword, appItem.typeKeywords);
			});

			// Transform arrays
			appItem.tags = appItem.tags ? appItem.tags.join(',') : '';
			appItem.typeKeywords = appItem.typeKeywords.join(',');

			// App proxies
			appItem.serviceProxyParams = JSON.stringify(appItem.serviceProxyParams);

			// Title
			if ( ! doNotOverwriteTitle ) {
				appItem.title = app.data.getWebAppData().getTitle();
			}

			if ( appItem.properties ) {
				appItem.properties = JSON.stringify(appItem.properties);
			}

			// Edit URL of hosted apps to always include index.html
			if ( appItem.url && appItem.url.match(/apps\/[a-zA-Z]+\/\?appid=/) ) {
				appItem.url = appItem.url.replace('/?appid=', '/index.html?appid=');
			}

			appItem = lang.mixin(appItem, {
				f: "json",
				token: token,
				overwrite: true,
				text: processForSave()
			});

			var url = portalUrl + "/sharing/rest/content/users/" + uid + (appItem.ownerFolder ? ("/" + appItem.ownerFolder) : "");

			// Updating
			if ( appItem.id )
				url += "/items/" + appItem.id + "/update";
			// creating
			else
				url += "/addItem";

			var saveRq = esriRequest(
				{
					url: url,
					handleAs: 'json',
					content: appItem
				},
				{
					usePost: true
				}
			);

			saveRq.then(nextFunction, appSaveFailed);
		}

		function processForSave() {
			var data = app.data.getWebAppData().get();
			// strip token from logo in header
			var logoURL = data && data.values && data.values.settings && data.values.settings.header && data.values.settings.header.logoURL;
			if (logoURL) {
				logoURL = stripTokensFromUrls(logoURL, logoURL);
				data.values.settings.header.logoURL = logoURL;
			}
			var currentUploadedLogo = CommonHelper.isAppResource(logoURL) ? logoURL : $('#uploadLogoInput').val();
			if (currentUploadedLogo) {
				currentUploadedLogo = CommonHelper.possiblyRemoveToken(currentUploadedLogo);
			}
			fileUploadHelper.cleanupLogos(currentUploadedLogo);
			// this is a little hacky
			var simulatorPreview = $('.settings-simulator .imgLogo');
			var currentSrc = simulatorPreview.attr('src');
			if (currentSrc && currentSrc.indexOf(logoURL) < 0) {
				simulatorPreview.attr('src', logoURL);
			}
			// strip tokens from inline images in sections
			var entries = data && data.values && data.values.story && data.values.story.entries;
			if (entries) {
				_.each(entries, function(entry) {
					var jqEntry = $(entry.description);
					_.each(jqEntry.find('img'), function(img) {
						entry.description = stripTokensFromUrls(entry.description, img.src);
					});
				});
			}
			return JSON.stringify(data);
		}

		function stripTokensFromUrls(contentStr, originalUrl) {
			var untokenizedUrl = CommonHelper.possiblyRemoveToken(originalUrl);
			if (originalUrl !== untokenizedUrl) {
				var unprotocoledUntokenizedUrl = untokenizedUrl.replace(/^https?\:\/\//, '//');
				var splitOriginal = originalUrl.replace(/^https?\:\/\//, '//').split('?');
				if (contentStr.match(splitOriginal[0] + '\\?' + splitOriginal[1])) {
					return contentStr.replace(splitOriginal[0] + '?' + splitOriginal[1], unprotocoledUntokenizedUrl);
				}
				return contentStr.replace(decodeURI(splitOriginal[0]) + '?' + splitOriginal[1], unprotocoledUntokenizedUrl);
			}
			return contentStr;
		}

		//
		// Web Map save
		//

		function saveWebmap(nextFunction)
		{
			if( app.isDirectCreationFirstSave || (app.appCfg.useWebmapInApp && app.isGalleryCreation) || app.appCfg.webmapStory) {

				if (_builderView.preWebmapSave) {
					_builderView.preWebmapSave();
				}

				WebMapHelper.saveWebmap(app.data.getWebMap(), app.portal).then(
					function(response){
						if( app.maps[app.data.getWebAppData().getWebmap()] && app.data.getWebAppItem() && app.maps[app.data.getWebAppData().getWebmap()].response.itemInfo.item.owner != app.data.getWebAppItem().owner ){

							// Update the webmap item
							var webMapItem = app.data.getWebMap();
							lang.mixin(
								webMapItem.item,
								{
									id: response.id,
									item: response.item
								}
							);
							app.data.getWebAppData().setWebmap(response.id);
							var portalUrl = getPortalURL(),
								appItem = lang.clone(app.data.getWebAppItem()),
								uid = appItem.owner || IdentityManager.findCredential(portalUrl).userId,
								token  = IdentityManager.findCredential(portalUrl).token;
							appItem = lang.mixin(appItem, {
								f: "json",
								token: token,
								overwrite: true,
								text: JSON.stringify(app.data.getWebAppData().get())
							});

							var url = portalUrl + "/sharing/rest/content/users/" + uid + (appItem.ownerFolder ? ("/" + appItem.ownerFolder) : "");

							// Updating
							url += "/items/" + appItem.id + "/update";


							var saveRq = esriRequest(
								{
									url: url,
									handleAs: 'json',
									content: appItem
								},
								{
									usePost: true
								}
							);

							saveRq.then(nextFunction, appSaveFailed);

						}
						nextFunction(response);
					},
					appSaveFailed
				);
			}
			else
				nextFunction({success: true});
		}

		//
		// Sharing
		//

		function shareAppAndWebmap(sharingMode, callback)
		{
			// Can only be used to add more privilege
			// Looks like sharing to private imply a unshareItems request first
			// => don't use it that code to share private without more test
			if ( sharingMode != "public" && sharingMode != "account" && sharingMode != "org")
				sharingMode = "public";

			// Find items to share - only if they aren't already shared to the proper level
			var targetItems = [];
			if( sharingMode == "account" || sharingMode == "org") {
				if( app.data.getWebMap() && app.data.getWebMap().item.access == "private" && app.data.getWebMap().item.owner == app.portal.getPortalUser().username )
					targetItems.push(app.data.getWebMap().item.id);
				if ( app.data.getWebAppItem().access == "private" )
					targetItems.push(app.data.getWebAppItem().id);
			}
			else {
				if( app.data.getWebMap() && app.data.getWebMap().item.access != "public" && app.data.getWebMap().item.owner == app.portal.getPortalUser().username )
					targetItems.push(app.data.getWebMap().item.id);
				if ( app.data.getWebAppItem().access != "public" )
					targetItems.push(app.data.getWebAppItem().id);
			}

			shareItems(targetItems.join(','), sharingMode).then(function(response){
				var success = response
					&& response.results
					&& response.results.length == targetItems.length;

				if (success) {
					$.each(response.results, function(i, result){
						if( ! result.success )
							success = false;
					});

					if ( app.data.getWebMap() )
						app.data.getWebMap().item.access = sharingMode;
					app.data.getWebAppItem().access = sharingMode;
					_builderPanel.updateSharingStatus();
				}

				callback(success);
			});
		}

		function shareItems(items, sharing)
		{
			var portalUrl = getPortalURL(),
				uid = IdentityManager.findCredential(portalUrl).userId,
				token  = IdentityManager.findCredential(portalUrl).token;

			var params = {
				f: "json",
				token: token,
				items: items,
				groups: '',
				everyone: '',
				org: ''
			};

			if ( sharing == "public" )
				params.everyone = true;
			if ( sharing == "account" || sharing == "org" )
				params.org = true;

			return esriRequest(
				{
					url: portalUrl + "/sharing/rest/content/users/" + uid + "/shareItems",
					handleAs: 'json',
					content: params
				},
				{
					usePost: true
				}
			);
		}

		//TODO handle response (success/fail)
		function protectItems()
		{
			var portalUrl = getPortalURL(),
				uid = IdentityManager.findCredential(portalUrl).userId,
				token  = IdentityManager.findCredential(portalUrl).token,
				itemId = app.data.getWebMap().item.id;

			var params = {
				f: "json",
				token: token,
				groups: '',
				everyone: '',
				org: ''
			};

			return esriRequest(
				{
					url: portalUrl + "/sharing/rest/content/users/" + uid + "/items/" + itemId + "/protect",
					handleAs: 'json',
					content: params
				},
				{
					usePost: true
				}
			);
		}

		//
		// Save callbacks
		//

		function appSaveSucceeded(response)
		{
			if (response && response.success) {
				app.mystories = app.mystories || { };
				app.mystories.isChecking = true;

				app.isWebMapCreation = false;

				_builderPanel.saveSucceeded();
				app.data.updateAfterSave();

				// Initialize My Stories
				if ( app.isGalleryCreation || app.isDirectCreationFirstSave || app.isWebMapFirstSave){
					app.isDirectCreationFirstSave = false;
					app.isGalleryCreation = false;
					app.isWebMapFirstSave = false;
					// Delay a little to be sure the share dialog will be open when the scan will be done
					setTimeout(window.myStoriesInit, 200);
				}
				else {
					MyStoriesWrapper.scanStory();
				}
				_builderPanel.updateSharingStatus();
			}
			else
				appSaveFailed();
		}

		function appSaveFailed(source, error)
		{
			_builderPanel.saveFailed(source, error);
		}

		//
		// Misc
		//

		function getPortalURL()
		{
			return arcgisUtils.arcgisUrl.split('/sharing/')[0];
		}

		function cleanApp()
		{
			if ( ! app.portal ) {
				console.error("Fatal error - not signed in");
				return;
			}

			app.portal.signIn().then(
				function(){
					var portalUrl = getPortalURL(),
						uid = IdentityManager.findCredential(portalUrl).userId,
						token  = IdentityManager.findCredential(portalUrl).token,
						appItem = lang.clone(app.data.getWebAppItem());

					// Remove properties that don't have to be committed
					delete appItem.avgRating;
					delete appItem.modified;
					delete appItem.numComments;
					delete appItem.numRatings;
					delete appItem.numViews;
					delete appItem.size;

					appItem = lang.mixin(appItem, {
						f: "json",
						token: token,
						overwrite: true,
						text: JSON.stringify(app.data.getWebAppData().getBlank())
					});

					var saveRq = esriRequest(
						{
							url: portalUrl + "/sharing/rest/content/users/" + uid + (appItem.ownerFolder ? ("/" + appItem.ownerFolder) : "") + "/addItem",
							handleAs: 'json',
							content: appItem
						},
						{
							usePost: true
						}
					);

					saveRq.then(
						function(){
							console.log("Web Application data cleaned successfully");
						}, function(){
							console.log("Web Application data cleaning has failed");
						}
					);
				},
				function(error) {
					console.error("Web Application data cleaning has failed", error);
				}
			);

			return "Cleaning ...";
		}

		return {
			init: init,
			resize: resize,
			appInitComplete: appInitComplete,
			shareAppAndWebmap: shareAppAndWebmap
		};
	}
);
