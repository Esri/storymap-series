define(["lib-build/tpl!./Geocoder",
        "lib-build/css!./Geocoder",
        "../../utils/CommonHelper"],
	function (viewTpl, viewCss, CommonHelper) {
		return function Geocoder(map, isInBuilder, isEnabled) 
		{
			var _this = this,
				_geocoder = null;
			
			this.toggle = function(isEnabled)
			{
				var container = $(map.container).find(".geocoderBtn");
				
				if ( ! _geocoder ) { 
					CommonHelper.createGeocoder({
						map: map, 
						domNode: container.find(".geocoderContainer")[0],
						enableButtonMode: true
					}).then(function(geocoder) {
						_geocoder = geocoder;
						container.find('.esriGeocoderContainer input, .esriGeocoderSearch').attr("tabindex", "-1");
					});
				}
				
				$(map.container).toggleClass("has-geocoder", isEnabled);
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
				_this.toggle(isEnabled);
			}
			
			init();
		};
	}
);