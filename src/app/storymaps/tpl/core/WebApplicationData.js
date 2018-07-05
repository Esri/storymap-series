define(["dojo/_base/lang",
	"storymaps/common/utils/CommonHelper"],
	function(lang, CommonHelper)
	{
		/**
		 * WebApplicationData
		 * @class WebApplicationData
		 *
		 * R/W of the Web mapping Application data
		 */

		var _originalData = {};
		var _data = {
			values: {}
		};

		return {
			set: function(data)
			{
				_originalData = lang.clone(data);

				if( ! data || ! data.values )
					return;

				var shouldSanitize = app.data.getWebAppItem().created > app.cfg.HTML_SANITIZER_DATE;
				_data = shouldSanitize ? app.sanitizer.sanitize(data) : data;
			},
			get: function()
			{
				var data = lang.clone(_data);

				data.values.template = data.values.template || {};
				data.values.template = {
					name: data.values.template.name || app.cfg.TPL_NAME,
					createdWith: data.values.template.createdWith || app.version,
					editedWith: app.version
				};

				return data;
			},
			getOriginalData: function()
			{
				return _originalData;
			},
			isBlank: function()
			{
				return Object.keys(_data.values).length <= 1 || app.data.getStoryEntries().length === 0;
			},
			getBlank: function()
			{
				return {
					values: {
						webmap: _originalData.values.webmap
					}
				};
			},
			// The eventual webmap the template has been created with (Start from a webmap in AGOL Map Viewer)
			getSourceWebmap: function()
			{
				return _originalData && _originalData.values ? _originalData.values.webmap : null;
			},
			cleanWebAppAfterInitialization: function()
			{
				var hasDoneCleaning = false;
				var datas = [_originalData, _data];
				for(var i=0; i < datas.length; i++) {
					var data = datas[i];
					if (data && data.values) {
						if (data.values.order) {
							delete data.values.order;
							hasDoneCleaning = true;
						}
						if (data.values.firstRecordAsIntro) {
							delete data.values.firstRecordAsIntro;
							hasDoneCleaning = true;
						}

						if (data.values.fieldsOverride){
							delete data.values.fieldsOverride;
							hasDoneCleaning = true;
						}

						if (data.values.sourceLayer){
							delete data.values.sourceLayer;
							hasDoneCleaning = true;
						}
					}
				}
				return hasDoneCleaning;
			},
			restoreOriginalData: function()
			{
				this.set(_originalData);
			},
			updateAfterSave: function()
			{
				_originalData = lang.clone(_data);
			},

			/*
			 * Versioning
			 */

			// Last saved template version
			getTemplateVersion: function()
			{
				return _data.values.template ? _data.values.template.editedWith : null;
			},
			// First saved template version
			getTemplateCreation: function()
			{
				return _data.values.template ? _data.values.template.creaedWith : null;
			},

			/*
			 * Warning when item and story title differ
			 */
			getDoNotWarnTitle: function()
			{
				return _data.values.doNotWarnTitle || false;
			},

			setDoNotWarnTitle: function(value)
			{
				_data.values.doNotWarnTitle = value;
			},

			/*
			 * Webmap id
			 */
			getWebmap: function()
			{
				return _data.values.webmap;
			},
			setWebmap: function(webmap)
			{
				_data.values.webmap = webmap;
			},

			/*
			 * Header
			 */
			getTitle: function()
			{
				// If it's the first entry - reuse the title as app title
				// TODO shoudn't be done here
				//if ( app.isDirectCreationFirstSave && this.getStoryEntries().length > 0 )
					//this.setTitle($("<div>" + this.getStoryEntries()[0].title + "</div>").text());

				return _data.values.title || "";
			},
			setTitle: function(title)
			{
				_data.values.title = title;
			},
			getSubtitle: function()
			{
				return _data.values.subtitle;
			},
			setSubtitle: function(subtitle)
			{
				_data.values.subtitle = subtitle;
			},

			/*
			 * Settings
			 */

			getSettings: function()
			{
				return _data.values.settings || {};
			},

			/*
			 * Layout
			 */
			getLayout: function()
			{
				return this.getSettings().layout || {};
			},
			setLayout: function(layout)
			{
				_data.values.settings = _data.values.settings || {};
				_data.values.settings.layout = layout;
			},
			getLayoutId: function()
			{
				return this.getLayout().id || app.cfg.LAYOUTS[0].id;
			},
			// The static configuration of the layout
			getLayoutProperties: function(layoutId)
			{
				var layout = layoutId || this.getLayoutId(),
					layoutCfg = $.grep(app.cfg.LAYOUTS, function(l){ return l.id == layout; });

				return layoutCfg && layoutCfg.length ? layoutCfg[0] : null;
			},


			/*
			 * Layout options
			 */
			getLayoutOptions: function()
			{
				var layoutOptions = lang.clone(this.getSettings().layoutOptions) || {};

				layoutOptions.panel = this.getPanelCfg();
				if ( layoutOptions.description === undefined ) {
					if ( this.getLayoutId() == "tab" || this.getLayoutId() == "bullet" )
						layoutOptions.description = true;
				}

				if ( this.getLayoutId() == "accordion" ) {
					if ( layoutOptions.numbering === undefined )
						layoutOptions.numbering = true;
				}

				// Bullet default to panel placement and don't anymore have dropdown option
				if ( this.getLayoutId() == "bullet" )
					layoutOptions.legend = "panel";
				else if ( this.getLayoutId() == "accordion" )
					layoutOptions.legend = "dropdown";

				return layoutOptions;
			},
			setLayoutOptions: function(layoutOptions)
			{
				_data.values.settings = _data.values.settings || {};
				_data.values.settings.layoutOptions = layoutOptions;
			},
			setDefaultLayoutOptions: function()
			{
				if ( this.getLayoutId() == "tab" ) {
					this.setLayoutOptions({
						description: true,
						legend: "panel",
						panel: {
							position: "left",
							size: "medium"
						},
						panelMapOverlap: false
					});
				}
				else if ( this.getLayoutId() == "accordion" ) {
					this.setLayoutOptions({
						description: true,
						legend: "dropdown",
						panel: {
							position: "left",
							size: "medium"
						},
						numbering: true,
						reverse: false
					});
				}
				if ( this.getLayoutId() == "bullet" ) {
					this.setLayoutOptions({
						description: true,
						legend: "panel",
						panel: {
							position: "left",
							size: "medium"
						},
						reverse: false,
						panelMapOverlap: false
					});
				}
			},
			getLocateBtn: function()
			{
				return this.getMapOptions().locateBtn && this.getMapOptions().locateBtn.enable;
				//return this.getLayoutOptions().locateBtn || false;
			},
			getPanelCfg: function()
			{
				var cfg = {},
					rawCfg = ((this.getSettings().layoutOptions || {}).panel) || {},
					layoutProp = this.getLayoutProperties();

				if ( ! layoutProp )
					return null;

				if ( layoutProp.sizes ) {
					cfg.sizeLbl = rawCfg.size || 'medium';
					cfg.sizeVal = layoutProp.sizes[cfg.sizeLbl];
				}

				if ( layoutProp.positions )
					cfg.position = rawCfg.position || layoutProp.positions[0];

				return cfg;
			},
			getLegendPlacement: function()
			{
				return this.getLayoutOptions().legend;
			},
			getPanelMapOverlap: function()
			{
				return this.getLayoutOptions().panelMapOverlap;
			},

			/*
			 * Theme
			 */
			getTheme: function()
			{
				return this.getSettings().theme || {};
			},
			setTheme: function(theme)
			{
				_data.values.settings = _data.values.settings || {};
				_data.values.settings.theme = theme;
			},
			getColors: function()
			{
				var cfgColors = this.getTheme().colors;

				// If colors are defined, check if that theme is present in the config file
				// If present reuse the values from config, else use the values from the item
				// This allow an user to override his theme from the config file as well as administrator update
				if ( cfgColors && cfgColors.name ) {
					var matchedTheme = $.grep(this.getLayoutProperties().themes, function(theme) {
						return theme.name == cfgColors.name;
					});

					if ( matchedTheme && matchedTheme.length )
						return matchedTheme[0];
					else
						return cfgColors;
				}
				else
					return this.getLayoutProperties().themes[0];
			},

			/*
			 * Header
			 */
			getHeader: function()
			{
				return this.getSettings().header || {};
			},
			setHeader: function(header)
			{
				_data.values.settings = _data.values.settings || {};
				_data.values.settings.header = header;
			},
			getHeaderLinkText: function()
			{
				return this.getHeader().linkText === undefined ? app.cfg.HEADER_LINK_TEXT : this.getHeader().linkText;
			},
			getHeaderLinkURL: function()
			{
				return this.getHeader().linkURL === undefined ? app.cfg.HEADER_LINK_URL : this.getHeader().linkURL;
			},
			getLogoURL: function(useMobileLogo)
			{
				var logoURL = ! this.getHeader().logoURL ? app.cfg.HEADER_LOGO_URL : this.getHeader().logoURL;

				if ( logoURL == app.cfg.HEADER_LOGO_URL && this.getColors() ) {
					if ( useMobileLogo ) {
						if ( this.getColors().esriLogoMobile == "white" )
							logoURL = "resources/tpl/viewer/icons/esri-logo-white.png";
					}
					else if ( this.getColors().esriLogo == "white" )
						logoURL = "resources/tpl/viewer/icons/esri-logo-white.png";
				}

				return CommonHelper.possiblyRemoveToken(logoURL);
			},
			getLogoTarget: function()
			{
				return ! this.getHeader().logoURL || this.getHeader().logoURL == app.cfg.HEADER_LOGO_URL
					? app.cfg.HEADER_LOGO_TARGET
					: this.getHeader().logoTarget;
			},
			getSocial: function()
			{
				return this.getHeader().social;
			},
			getHeaderCompactSize: function()
			{
				return this.getHeader().compactSize;
			},

			/*
			 * organizational geocoders
			 */
			getAppGeocoders: function() {
				return this.getSettings().appGeocoders;
			},
			setAppGeocoders: function(geocoders) {
				_data.values.settings = _data.values.settings || {};
				_data.values.settings.appGeocoders = geocoders;
			},

			/*
			 * Map Series
			 */
			getStory: function()
			{
				return _data.values.story || {};
			},
			getStoryEntries: function()
			{
				var story = this.getStory();
				/*
				var arr = [];
				for(var i=0;i<12;i++)
					arr.push(story.entries[0]);
				return arr;
				*/
				return story.entries || [];
			},
			getStoryStorage: function()
			{
				return this.getStory().storage || "WEBAPP";
			},
			setStoryEntries: function(entries)
			{
				_data.values.story = _data.values.story || {};
				_data.values.story.storage = "WEBAPP";
				_data.values.story.entries = entries;
			},

			/*
			 * Map options
			 */
			getMapOptions: function()
			{
				var mapOptions = lang.clone(this.getSettings().mapOptions) || {};

				if ( mapOptions.mapsSync === undefined )
					mapOptions.mapsSync = true;

				return mapOptions;
			},
			getGeocoder: function()
			{
				return !! (this.getMapOptions().geocoder && this.getMapOptions().geocoder.enable);
			},
			setMapOptions: function(mapOptions)
			{
				_data.values.settings = _data.values.settings || {};
				_data.values.settings.mapOptions = mapOptions;
			}

			/*
			 * TODO
			 */
			/*
			setSeriesExtent: function(extent)
			{
				_data.values.settings.mapOptions = _data.values.settings.mapOptions || {};
				_data.values.settings.mapOptions.seriesExtent = extent;
			}
			*/
		};
	}
);