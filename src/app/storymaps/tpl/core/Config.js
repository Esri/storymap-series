define([],
	function(){
		// Header default configuration
		var HEADER_LOGO_URL = "resources/tpl/viewer/icons/esri-logo.png",
			HEADER_LOGO_TARGET = "https://www.esri.com",
			HEADER_LINK_URL = "https://storymaps.arcgis.com";

		app.appCfg = {
			supportWebmapPreviewAGOL: false,
			webmapStory: false,
			createWebmap: false,
			useWebmapInApp: false,
			useStandardHeader: true,
			useAppTitleAsPageTitle: true,
			headerCompactOpt: true,
			headerCompactByDefault: true,
			/*
			 * Webmap selector
			 */
			// Control if the location cfg can be inherited from the first map of the app
			mapsSyncAppOption: true,
			mapsUseTermSection: false,
			// Control if when resizing the browser, the map refresh has to be immediate
			mapsImmediateResize: true,
			mapCommandLargerTouch: false,
			/*
			 * Media Picker
			 */
			mediaPickerDisableVideo: false,
			mediaPickerDisableWebPage: false,
			mediaPickerSkipConfigure: false,
			mediaPickerConfigureForceMode: null,

			// all focusable elements (figured better to put this in a central location than
			// reproduce it every time)
			focusable: 'a[href], area[href], input:not([disabled]), select:not([disabled]), ' +
									'textarea:not([disabled]), button:not([disabled]), iframe, object, ' +
									'embed, [tabindex="0"], [contenteditable]'
		};

		app.appCfg.getLayoutThumbnail = function(params)
		{
			params = params || {};

			var layout = params.layout || currentLayoutCfg.id,
				currentLayoutCfg = app.data.getLayoutStaticConfig(layout),
				theme = params.theme || currentLayoutCfg.themes[0],
				options = params.options || {
					panel: {
						position: currentLayoutCfg.positions[0],
						size: 'medium'
					}
				},
				selected = params.selected || false,
				contentLabel = params.contentLabel || false,
				thumbHTML = "",
				blockTpl = "",
				block1HTML = "",
				block2HTML = "",
				headerHeight = 15;

			if ( layout == "bullet" )
				headerHeight = 18;
			else if ( layout == "tab" )
				headerHeight = 21;

			thumbHTML += '<div class="layout-thumbnail' + /*" layout-" + layout + " size-" + options.panel.size + " pos-" + options.panel.position +*/ (selected ? ' selected' : '') + '" data-colors=\'' + JSON.stringify(theme) + '\'>';
			thumbHTML += '<div class="layout-selected"></div>';

			//
			// Header
			//

			thumbHTML += '<div class="layout-header" style="height: $size$%; background-color:$color$; $styleOpt$"><span class="thumb-content $contentClass$" style="$contentStyle$">$content$</span></div>';

			thumbHTML = thumbHTML
				.replace('$size$', headerHeight)
				.replace('$color$', theme.header)
				.replace('$styleOpt$', '');

			if ( layout != "accordion" ) {
				var containerClass = "header-tabs",
					entryClass = "header-tab",
					entries = "";

				if ( layout == "bullet" ) {
					containerClass = "header-bullets";
					entryClass = "header-bullet";
				}

				for (var i = 1; i <= 3; i++) {
					var colors = "background-color: " + theme.tab + "; color:" + theme.tabText + ";";

					if ( i == 1 )
						colors = "background-color: " + theme.tabActive + "; color:" + theme.tabTextActive + ";";

					entries += '<span class="' + entryClass + '" style="' + colors + '">';
					if ( layout == "tab" )
						entries += 'Tab ' + i;
					else {
						if ( options.reverse )
							entries += 3 - i + 1;
						else
							entries += i;
					}

					entries += '</span>';
				}

				thumbHTML = thumbHTML
					.replace('$contentClass$', containerClass)
					.replace('$content$', entries);
			}

			//
			// Panel and main stage
			//

			blockTpl = '<div class="layout-block" style="width: $size$%; height: $height$%; background-color:$color$; $styleOpt$"><span class="thumb-content $contentClass$" style="$contentStyle$">$content$</span></div>';

			var sizeDiv1 = 0,
				sizeDiv2 = 0,
				height = 100 - headerHeight - 1,
				styleOpt = "",
				styleOptPanel = "",
				styleOptMedia = "";

			if ( layout == "accordion" ) {
				if ( options.panel.size == 'small' ) {
					sizeDiv1 = 23;
					sizeDiv2 = 71;
				}
				else if ( options.panel.size == 'large' ) {
					sizeDiv1 = 43;
					sizeDiv2 = 51;
				}
				else {
					sizeDiv1 = 28;
					sizeDiv2 = 66;
				}

				styleOpt = "float: left;";

				if ( options.panel.position == 'left' )
					styleOptPanel += "margin-left: 3%;";
				else
					styleOptMedia += "margin-left: 3%;";

			}
			else {
				sizeDiv2 = 94;
				styleOptPanel = "position: absolute; top: calc(" + headerHeight + "% + 4px); z-index:1; height: 35% !important; opacity: 0.8;";
				styleOptMedia += "margin-left: 3%;";

				if ( options.panel ) {
					if ( options.panel.position == 'left' )
						styleOptPanel += "left: 3%";
					else
						styleOptPanel += "right: 3%";

					if ( options.panel.size == 'small' )
						sizeDiv1 = 23;
					else if ( options.panel.size == 'large' )
						sizeDiv1 = 43;
					else
						sizeDiv1 = 28;
				}
			}

			block1HTML = blockTpl
				.replace('$size$', sizeDiv1)
				.replace('$height$', height)
				.replace('$color$', theme.panel)
				.replace('$styleOpt$', styleOpt + styleOptPanel);

			block2HTML = blockTpl
				.replace('$size$', sizeDiv2)
				.replace('$height$', height)
				.replace('$color$', theme.media)
				.replace('$styleOpt$', styleOpt + styleOptMedia);

			if ( contentLabel && layout == "accordion" ) {
				block1HTML = block1HTML
					.replace('$contentClass$', 'panel-lbl rotate')
					.replace('$contentStyle$', 'color: ' + theme.text)
					.replace('$content$', currentLayoutCfg.title);
			}

			if ( options.panel ) {
				if ( options.panel.position == 'left' )
					thumbHTML += block1HTML + block2HTML;
				else
					thumbHTML += block2HTML + block1HTML;
			}
			else
				thumbHTML += block2HTML;

			thumbHTML = thumbHTML.replace(/\$contentStyle\$/g, '')
							.replace(/\$contentClass\$/g, '')
							.replace(/\$content\$/g, '');

			if (!contentLabel) {
				if (theme && theme.name && theme.name.match) {
					var themeLabel;
					if (theme.name.match(/-org$|-modified$/)) {
						if (theme.name.match(/-modified$/)) {
							themeLabel = i18n.builder.settingsThemeOptions.lblModTheme;
						} else {
							themeLabel = i18n.builder.settingsThemeOptions.lblOrgTheme;
						}
						thumbHTML += '<div class="theme-label">' + themeLabel + '</div>';
					}
				}
			}

			thumbHTML += '</div>';

			return thumbHTML;
		};

		return {
			checkConfigFileIsOK: function()
			{
				app.cfg.HEADER_LOGO_URL = HEADER_LOGO_URL;
				app.cfg.HEADER_LOGO_TARGET = HEADER_LOGO_TARGET;
				app.cfg.HEADER_LINK_TEXT = i18n.viewer.headerFromCommon.storymapsText;
				app.cfg.HEADER_LINK_URL = HEADER_LINK_URL;

				return app.cfg
					&& app.cfg.HEADER_LOGO_URL !== undefined
					&& app.cfg.HEADER_LOGO_TARGET !== undefined
					&& app.cfg.HEADER_LINK_TEXT !== undefined
					&& app.cfg.HEADER_LINK_URL !== undefined
					&& app.cfg.HEADER_SOCIAL

					&& app.cfg.MAX_NB_ENTRIES

					&& app.cfg.TIMEOUT_VIEWER_LOAD
					&& app.cfg.TIMEOUT_VIEWER_REQUEST
					&& app.cfg.TIMEOUT_BUILDER_REQUEST

					&& app.cfg.LAYOUTS && app.cfg.LAYOUTS.length

					&& app.cfg.HELP_URL
					&& app.cfg.HELP_URL_PORTAL

					&& app.cfg.TPL_NAME
					&& app.cfg.TPL_ID
					&& app.cfg.WEBAPP_TAG
					&& app.cfg.WEBAPP_KEYWORD_GENERIC
					&& app.cfg.WEBAPP_KEYWORD_APP

					&& app.cfg.AUTHORIZED_IMPORT_SOURCE
					&& app.cfg.FLICKR_API_KEY
					&& app.cfg.YOUTUBE_DISABLE_ON_PORTAL !== undefined
					&& app.cfg.YOUTUBE_API_KEY

					&& app.cfg.CORS_SERVER
					&& app.cfg.DEFAULT_SHARING_URL
					&& app.cfg.DEFAULT_PROXY_URL

					&& app.cfg.BING_MAPS_KEY !== undefined
					&& app.cfg.HELPER_SERVICES !== undefined
					&& app.cfg.HELPER_SERVICES.geometry !== undefined
					&& app.cfg.HELPER_SERVICES.geocode !== undefined;
			}
		};
	}
);
