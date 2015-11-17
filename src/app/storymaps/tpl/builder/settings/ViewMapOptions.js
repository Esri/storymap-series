define(["lib-build/tpl!./ViewMapOptions",
		"lib-build/css!./ViewMapOptions"
	],
	function (
		viewTpl
	){
		return function ViewMapOptions() 
		{			
			var _titleContainer = null,
				_contentContainer = null,
				_settings = null;
			
			this.init = function(titleContainer, contentContainer)
			{
				_titleContainer = titleContainer;
				_contentContainer = contentContainer;
				
				_contentContainer.append(viewTpl({
					hello: i18n.builder.settingsMapOptions.hello,
					lblOverview: i18n.builder.settingsMapOptions.lblOverview,
					tooltipOverview: i18n.builder.settingsMapOptions.tooltipOverview,
					lblLocate: i18n.builder.settingsMapOptions.lblLocate,
					tooltipLocate: i18n.builder.settingsMapOptions.tooltipLocate,
					lblGeocoder: i18n.builder.settingsMapOptions.lblGeocoder,
					tooltipGeocoder: i18n.builder.settingsMapOptions.tooltipGeocoder,
					lblSync: i18n.builder.settingsMapOptions.lblSync,
					tooltipSync: i18n.builder.settingsMapOptions.tooltipSync
				}));
				
				_contentContainer.find('.help').tooltip({
					trigger: 'hover'
				});
			};
			
			this.present = function(settings) 
			{	
				_contentContainer.find(".opt-checkbox-overview").prop("checked", settings.overview && settings.overview.enable);
				_contentContainer.find(".opt-checkbox-locateBtn").prop("checked", settings.locateBtn && settings.locateBtn.enable);
				_contentContainer.find(".opt-checkbox-geocoder").prop("checked", settings.geocoder && settings.geocoder.enable);
				
				_contentContainer.find(".opt-checkbox-sync").prop("checked", settings.mapsSync);
				
				_settings = settings;
			};
			
			this.show = function()
			{
				//
			};
			
			this.save = function()
			{			
				return {
					overview: {
						enable: _contentContainer.find(".opt-checkbox-overview").prop("checked"),
						openByDefault: !! (_settings && _settings.overview ? _settings.overview.openByDefault : true)
					},
					locateBtn: {
						enable: _contentContainer.find(".opt-checkbox-locateBtn").prop("checked")
					},
					geocoder: {
						enable: _contentContainer.find(".opt-checkbox-geocoder").prop("checked")
					},
					mapsSync: _contentContainer.find(".opt-checkbox-sync").prop("checked")
				};
			};
			
			this.initLocalization = function()
			{
				_titleContainer.html(i18n.builder.settingsMapOptions.title);
			};
		};
	}
);