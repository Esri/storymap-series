define(["./WebApplicationData",
        "esri/geometry/Extent"
    ], 
	function(WebApplicationData, Extent){
		return {
			/*
			 * Manipulate the map extent to not overlap the floating panel
			 *  when reverse = true  -> give the map extent and get the the extent that don't overlap the panel
			 *  when reverse = false -> give the extent you want to not overlap and will return the extent to set on the map
			 * 
			 */
			getLayoutExtent: function(extent, reverse, debug)
			{
				var isPanelLeft = $("body").hasClass("layout-tab-left") || $("body").hasClass("layout-bullet-left"),
					isPanelRight = $("body").hasClass("layout-tab-right") || $("body").hasClass("layout-bullet-right");
				
				console.log("tpl.core.Helper - getLayoutExtent", reverse, isPanelLeft, isPanelRight, WebApplicationData.getPanelMapOverlap());
				
				if ( ! extent )
					return extent;
				
				if ( ! isPanelLeft && ! isPanelRight )
					return extent;
				
				if ( WebApplicationData.getPanelMapOverlap() )
					return extent;
				
				var extentResX = 0,
					offsetXLeft = 0,
					offsetXRight = 0;
				
				if ( isPanelLeft )
					offsetXLeft = $("#descLegendPanel").outerWidth();
				else if ( isPanelRight )
					offsetXRight = $("#descLegendPanel").outerWidth();
				
				if ( reverse )
					extentResX = extent.getWidth() / $("body").width();
				else
					extentResX = extent.getWidth() / ($("body").width() - offsetXLeft - offsetXRight);
				
				var extentOffsetLeft = extentResX * offsetXLeft,
					extentOffsetRight = extentResX * offsetXRight;
					
				if ( reverse ) {
					extentOffsetLeft *= -1;
					extentOffsetRight *= -1;
				}
				
				var newExtent = new Extent({
					xmin: extent.xmin - extentOffsetLeft,
					ymin: extent.ymin,
					xmax: extent.xmax + extentOffsetRight,
					ymax: extent.ymax,
					spatialReference: extent.spatialReference
				});

				if ( debug && !app.isProduction && app.map) {
					var testLayer = new esri.layers.GraphicsLayer();
					testLayer.add(new esri.Graphic(extent, new esri.symbol.SimpleFillSymbol().setColor(new esri.Color([255,0,0,0.5]))));
					testLayer.add(new esri.Graphic(newExtent, new esri.symbol.SimpleFillSymbol()));
					app.map.addLayer(testLayer);
				}

				/*
				var lods = app.map._params.lods;
				var level = Helper.getFirstLevelWhereExtentFit(newExtent, app.map);
				if( level != -1 ) {
					var newCenter = new Point(
						extent.getCenter().x + (app.map.width / 2 - (offsetXRight / 2)) * lods[level].resolution,
						extent.getCenter().y,
						extent.spatialReference
					);
					return app.map.centerAndZoom(newCenter, level);
				}
				*/
				
				return newExtent;
			}
		};
	}
);