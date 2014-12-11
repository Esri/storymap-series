define(["lib-build/tpl!./Geocoder",
        "lib-build/css!./Geocoder",
        "esri/dijit/Geocoder",
        "../../utils/CommonHelper",
        "dojo/_base/lang"],
	function (viewTpl, viewCss, GeocoderDijit, CommonHelper, lang) {
		return function Geocoder(map, isInBuilder, isEnabled) 
		{
			var _this = this,
				_geocoder = null;
			
			this.toggle = function(isEnabled)
			{
				var container = $(map.container).find(".geocoderBtn");
				
				if ( ! _geocoder ) { 
					_geocoder = new GeocoderDijit(
						lang.mixin(
							{
								map: map
							}, 
							CommonHelper.createGeocoderOptions()
						),
						container.find('.geocoderContainer')[0]
					);
					
					container.find('.esriGeocoderContainer input, .esriGeocoderSearch').attr("tabindex", "-1");
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