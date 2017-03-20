define(["lib-build/tpl!./Geocoder",
        "lib-build/css!./Geocoder",
        "../../utils/CommonHelper"],
	function (viewTpl, viewCss, CommonHelper) {
		return function Geocoder(map, isInBuilder, isEnabled, webmapSettings)
		{
			var _this = this,
				_geocoder = null,
				geocoderDeferred;

			this.toggle = function(isEnabled)
			{
				// better checking for whether or not geocoder is enabled
				if (!app.isInBuilder) {
					var data = app.data.getWebAppData();
					if (data.getMapOptions && (!data.getMapOptions().geocoder || !data.getMapOptions().geocoder.enable)) {
						return;
					}
					if (data.getGeneralOptions && !data.getGeneralOptions().geocoder) {
						return;
					}
				}

				var container = $(map.container).find(".geocoderBtn");
				if (!_geocoder && (!geocoderDeferred || geocoderDeferred.isRejected())) {
					createGeocoder(isEnabled);
				}

				$(map.container).toggleClass('has-geocoder', isEnabled);
				container.toggle(isEnabled);
			};

			/*
			function destroy()
			{
				if ( _geocoder )
					_geocoder.destroy();
				_geocoder = null;
			}
			*/

			function init()
			{
				$(map.container).find('.esriSimpleSlider').last().after(viewTpl({ }));
				createGeocoder();
				_this.toggle(isEnabled);
			}

			function createGeocoder() {
				var container = $(map.container).find('.geocoderBtn');
				geocoderDeferred = CommonHelper.createGeocoder({
					map: map,
					domNode: container.find('.geocoderContainer')[0],
					enableButtonMode: true,
					searchOptions: webmapSettings
				}).then(function(geocoder) {
					_geocoder = geocoder;
					container.find('.esriGeocoderContainer input, .esriGeocoderSearch').attr('tabindex', '-1');
				});

			}

			init();
		};
	}
);
