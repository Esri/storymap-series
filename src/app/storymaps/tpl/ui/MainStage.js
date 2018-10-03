define(["lib-build/tpl!./MainMediaContainerMap",
		"lib-build/tpl!./MainMediaContainerImage",
		"lib-build/tpl!./MainMediaContainerEmbed",
		"lib-build/css!./MainStage",
		"../core/WebApplicationData",
		"../core/Helper",
		"./mobile/PopupUtils",
		"storymaps/common/utils/CommonHelper",
		"dojo/has",
		"esri/arcgis/utils",
		"esri/renderers/UniqueValueRenderer",
		"esri/geometry/Point",
		"esri/geometry/Extent",
		"esri/config",
		"esri/geometry/webMercatorUtils",
		"esri/symbols/SimpleMarkerSymbol",
		//"esri/dijit/PopupMobile",
		"esri/tasks/query",
		"esri/tasks/QueryTask",
		"dojo/topic",
		"dojo/on",
		"dojo/aspect",
		"dojo/_base/lang",
		"dijit/layout/ContentPane"
	],
	function(
		mainMediaContainerMapTpl,
		mainMediaContainerImageTpl,
		mainMediaContainerEmbedTpl,
		viewCss,
		WebApplicationData,
		Helper,
		MobilePopupUtils,
		CommonHelper,
		has,
		arcgisUtils,
		UniqueValueRenderer,
		Point,
		Extent,
		esriConfig,
		webMercatorUtils,
		SimpleMarkerSymbol,
		//PopupMobile,
		Query,
		QueryTask,
		topic,
		on,
		aspect,
		lang,
		ContentPane
	){
		return function MainStage(container, isInBuilder, mainView)
		{
			var _this = this;

			//
			// Media containers
			//

			function addTemporaryMainMediaContainer(webmap)
			{
				$("#mainStagePanel .medias").append(mainMediaContainerMapTpl({
					webmapid: webmap,
					isTemporary: true,
					lblDescription: i18n.viewer.mobileInfo.description,
					lblLegend: i18n.viewer.mobileInfo.legend,
					lblLegendMobileError: i18n.viewer.mobileInfo.lblLegendMobileError,
					lblLegendMobileErrorExplain: i18n.viewer.mobileInfo.lblLegendMobileErrorExplain,
					altText: '',
					focusToPanel: i18n.viewer.a11y.focusContent
				}));
			}

			this.updateMainMediaContainers = function()
			{
				var webmaps = app.data.getWebmapObjects(),
					images = app.data.getImageObjects(),
					embeds = app.data.getEmbeds();

				//
				// Map
				//

				// Add new container
				$.each(webmaps, function(i, webmap){
					var mapContainer = $('.mapContainer[data-webmapid="' + webmap.id + '"]');
					if ( ! mapContainer.length )
						$("#mainStagePanel .medias").append(mainMediaContainerMapTpl({
							webmapid: webmap.id,
							altText: webmap.altText || '',
							isTemporary: false,
							focusToPanel: i18n.viewer.a11y.focusContent,
							lblDescription: i18n.viewer.mobileInfo.description,
							lblLegend: i18n.viewer.mobileInfo.legend,
							lblLegendMobileError: i18n.viewer.mobileInfo.lblLegendMobileError,
							lblLegendMobileErrorExplain: i18n.viewer.mobileInfo.lblLegendMobileErrorExplain
						}));
				});

				// Remove unused containers and cleanup maps array
				$('.mapContainer').each(function() {
					var webmapId = $(this).data('webmapid');
					var found = _.some(webmaps, function(wm) {
						return webmapId === wm.id;
					});
					if (!found) {
						$(this).parent().remove();
						if (app.maps[webmapId]) {
							app.maps[webmapId].response.map.destroy();
							delete app.maps[webmapId];
						}
					}
				});

				//
				// Image
				//

				// Add new container
				$.each(images, function(i, img){
					var imageContainer = $('.imgContainer[data-src="' + img.url + '"]');
					if ( ! imageContainer.length )
						$("#mainStagePanel .medias").append(
							mainMediaContainerImageTpl({
								url: img.url,
								altText: img.altText,
								focusToPanel: i18n.viewer.a11y.focusContent
							})
						);
				});

				// Remove unused containers
				$('.imgContainer').each(function() {
					var src = $(this).data('src');
					var found = _.some(images, function(img) {
						return src === img.url;
					});
					if (!found) {
						$(this).parent().remove();
					}
				});

				//
				// Embed (video and webpage)
				//

				// Add new container
				$.each(embeds, function(i, embedInfo) {
					var embedUrl = embedInfo.url,
						embedhash = "";

					if ( embedUrl.lastIndexOf('#') > 0 ) {
						embedUrl = embedUrl.substring(0, embedUrl.lastIndexOf('#'));
						embedhash = embedInfo.url.substring(embedInfo.url.lastIndexOf('#') + 1);
						embedInfo.hash = embedhash;
					}

					// Encode the URL when possible
					try {
						embedUrl = btoa(embedUrl);
					} catch ( e ) { }

					var embedContainer = $('.embedContainer[data-src="' + embedUrl + '"]');
					if ( ! embedContainer.length ) {
						embedContainer = $('.embedContainer[data-ts="' + embedInfo.ts + '"]');
					}

					if ( ! embedContainer.length ) {
						//
						// Frametag are added straight to the dom without any container
						//  a class and a data attribute are added below
						// Ideally there should be a container so that it's possible to do more funny stuff like adding
						//  multiple iframe but these makes it difficult to center the frame(s)
						//

						$("#mainStagePanel .medias").append(
							mainMediaContainerEmbedTpl({
								url: embedUrl,
								frameTag: embedInfo.frameTag,
								altText: embedInfo.altText || '',
								focusToPanel: i18n.viewer.a11y.focusContent,
								// Introduced in V1.1
								unload: !!(embedInfo.unload === undefined || embedInfo.unload)
						}));

						// If it's a frame tag
						if ( !! embedInfo.frameTag ) {
							// Find the Iframe
							var frameTag = $("#mainStagePanel .medias .mainMediaContainer").last().find('iframe').first();

							// Transform the src attribute into a data-src and Add the timestamp
							frameTag.addClass('embedContainer')
								.attr('data-src', frameTag.attr('src'))
								.removeAttr('src')
								.attr('data-ts', embedInfo.ts)
								// Introduced in V1.1
								.attr('data-unload', !!(embedInfo.unload === undefined || embedInfo.unload));
						}
					}
				});

				// Remove unused containers
				$('.embedContainer').each(function() {
					var embedSRC = $(this).data('ts');

					if ( ! embedSRC ) {
						embedSRC = $(this).data('src');
						if ( ! embedSRC.match('//') ) {
							embedSRC = atob(embedSRC);
						}
					}

					var embedInUse = $.grep(embeds, function(embed){
						var embedUrl = embed.url;

						if ( embedUrl.lastIndexOf('#') > 0 )
							embedUrl = embedUrl.substring(0, embedUrl.lastIndexOf('#'));

						return embedSRC == embedUrl || embedSRC == embed.ts;
					}).length > 0;

					if ( ! embedInUse ) {
						$(this).parent().remove();
					}
				});

				container.find('.mainMediaContainer').on('focus.generic', function() {
					onMainstageFocus();
				});

				container.find('.return-to-content').on('click', function() {
					somehowLeaveMainstage();
				});

				setMapControlsColor();


				// Mobile popups
				$('.mainMediaContainer').find('.mobilePopup').off('click').click(MobilePopupUtils.onPopupClick);
			};

			//
			// Management of Main Stage: all media
			//

			this.beforeMainMediaUpdate = function(index)
			{
				var section = app.data.getStoryByIndex(index);
				if ( section && section.media && section.media.type == 'webmap' ) {
					var webmapId = section.media.webmap.id;
					if (app.maps[webmapId]) {
						var map = app.maps[webmapId].response.map;
						var locLayer = map.getLayer("MJActionsLocate");
						if (locLayer) {
							map.removeLayer(locLayer);
						}
					}

				}
			};

			this.updateMainMediaWithStoryMainMedia = function(index, animateTransition)
			{
				var section = app.data.getStoryByIndex(index);
				if ( section && section.media )
					updateMainMedia(section.media, section, index, animateTransition);

				topic.publish("story-load-entry", index);
			};

			this.updateMainMediaWithStoryAction = function(media)
			{
				updateMainMedia(media, app.data.getCurrentSection(), null, false, true);
			};

			function updateMainMedia(media, section, index, animateTransition, fromAction)
			{
				// Refresh any iframe that would be the current Main Stage Media
				// If it's a video player this will stop current video playback
				var activeFrame = $(".mainMediaContainer.active > iframe[data-unload=true]");
				if ( activeFrame.length ) {
					activeFrame.attr('src', '');
				}

				// Fade out active container
				if ( animateTransition ) {
					var activeContainer = $(".mainMediaContainer.active");
					activeContainer.fadeOut(function(){
						// Make sure display is set to inherit so the map can still be resized
						activeContainer.css("display", "");
					});
				}

				// Stop loading Indicator if running
				// From now only the Map has a loading indicator
				stopMainStageLoadingIndicator();

				if ( media.type == "webmap" )
					updateMainMediaMaps(media.webmap.id, section, index, media, false, animateTransition, fromAction);
				else if ( media.type == "image" )
					updateMainMediaPicture(media.image, animateTransition);
				else if ( media.type == "video" )
					updateMainMediaEmbed(media.video.url, media.video, animateTransition);
				else if ( media.type == "webpage" ) {
					var embedUrl = media.webpage.url;

					if ( embedUrl.lastIndexOf('#') > 0 )
						embedUrl = embedUrl.substring(0, embedUrl.lastIndexOf('#'));

					updateMainMediaEmbed(embedUrl || media.webpage.ts, media.webpage, animateTransition);
				}
			}

			function startMainStageLoadingIndicator()
			{
				$('#mainStageLoadingIndicator').fadeIn();
			}

			function stopMainStageLoadingIndicator()
			{
				$('#mainStageLoadingIndicator').fadeOut();
			}

			//
			// Layout
			//

			this.updateMainStageWithLayoutSettings = function()
			{
				var appLayout = WebApplicationData.getLayoutId(),
					appColors = app.data.getWebAppData().getColors(),
					panelCfg = WebApplicationData.getPanelCfg(),
					panelIsLeft = panelCfg.position == "left",
					bodyWidth = $("body").width(),
					panelWidth = 0,
					panelPos = null,
					mapArea = null,
					isMobile = $("body").hasClass("mobile-view");

				// Resize embed that are have display fit
				styleMainStageEmbed();

				container.css("background-color", appColors.media);

				setMapControlsColor();

				if ( appLayout == "tab" || appLayout == "bullet" ) {
					panelWidth = $("#descLegendPanel:visible").width() || 0;
					panelPos = $("#descLegendPanel:visible").position() || {};
					mapArea = panelIsLeft ? bodyWidth - (panelPos.left + panelWidth) : panelPos.left;

					// Attribution
					var mapOverviewPos = $(".mainMediaContainer.active .overviewContainer:visible").css("right"),
						overviewWidth = 191;
					if ( appLayout == "tab" || appLayout == "bullet" ) {
						if ( ! panelWidth ) {
							$(".mainMediaContainer.active .esriControlsBR").css({
								left: "",
								right: ""
							});
						}
						else if ( panelIsLeft ) {
							$(".mainMediaContainer.active .esriControlsBR").css({
								left: "",
								right: mapOverviewPos ? overviewWidth + 10 : ""
							});
						}
						else {
							$(".mainMediaContainer.active .esriControlsBR").css({
								left: mapOverviewPos ? overviewWidth + 10 : "",
								right: "initial"
							});

							// TODO fix this it blink
							$(".mainMediaContainer.active .esriAttribution").css("float", "inherit");
							setTimeout(function(){
								$(".mainMediaContainer.active .esriAttribution").css("float", "");
							}, 0);
						}
					}

					// Map configuration, loading indicator and error
					$(".mapConfigOverlay.position, .mapConfigOverlay.popup, #mainStageLoadingIndicator, .mainStageErrorContainer").css(
						"left",
						panelIsLeft ? ((panelWidth + bodyWidth) / 2) : ((bodyWidth - panelWidth) / 2)
					);

					if (isMobile) {
						$("#mainStageLoadingIndicator, .mainStageErrorContainer").css("left", "50%");
					}

					//
					// Center some components on the Main Stage space at the left or right of the panel
					//

					var paddingDir = panelIsLeft ?  "padding-left" : "padding-right",
						posDir = panelIsLeft ? "left" : "right",
						val = panelPos.left;

					if ( panelIsLeft ) {
						val += panelWidth;
					}
					else {
						val = bodyWidth - panelPos.left;
					}

					// Help, builder landing&quotes
					$(".centerAlignOnFloat")
						.css({ paddingRight: 0, paddingLeft: 0 })
						.css(paddingDir, val);

					var backBtnAdjust = val + mapArea / 2;
					if (isMobile) {
						backBtnAdjust = (bodyWidth - $('.mediaBackContainer').width()) / 2 || '40%';
					}
					// Back button
					$(".mediaBackContainer")
						.css({ left: 'inherit', right: 'inherit' })
						.css(posDir, backBtnAdjust);

					// Help goes over the floating panel when screen too small
					if ( bodyWidth <= 1067 )
						$("#builderHelp").css(paddingDir, 0);

					// Main Stage Images that are centered
					$(".mainMediaContainer .imgContainer.center")
						.css({ left: 0, right: 0 })
						.css(posDir, val);

					// Main Stage video&embed that are centered
					$(".mainMediaContainer .embedContainer.center")
						.css({ left: 0, right: 0 })
						.css(posDir, val);

					// Main Stage video&embed that are custom
					$(".mainMediaContainer .embedContainer.custom")
						.css({ left: 0, right: 0 })
						.css(posDir, val);

					// Autoplay
					if ( ! panelWidth ) {
						$("#autoplay").css({ left: '50%', right: 'inherit' });
					}
					else {
						var panelHeight = $("#descLegendPanel:visible").height();
						var mapHeight = $("#contentPanel").height();

						if ( panelHeight <= mapHeight /2 ) {
							$("#autoplay").css({ left: '50%', right: 'inherit' });
						}
						else {
							$("#autoplay")
								.css({ left: 'inherit', right: 'inherit' })
								.css(posDir, val + mapArea / 2);
						}
					}
				}
				// Accordion Side Panel
				else {
					// Attribution
					$(".mainMediaContainer.active .esriControlsBR").css({
						left: "",
						right: ""
					});

					// Map configuration, loading indicator and error
					$(".mapConfigOverlay.position, .mapConfigOverlay.popup, #mainStageLoadingIndicator, .mainStageErrorContainer").css("left", "50%");

					// Reset centering that may have been done if user has changed layouts
					$(".centerAlignOnFloat").css({ paddingRight: 0, paddingLeft: 0 });
					$(".mediaBackContainer").css({ left: '50%', right: 'inherit' });
					$(".mainMediaContainer .imgContainer.center").css({ left: 0, right: 0 });
					$(".mainMediaContainer .embedContainer.center").css({ left: 0, right: 0 });
					$(".mainMediaContainer .embedContainer.custom").css({ left: 0, right: 0 });
					$("#autoplay").css({ left: '50%', right: 'inherit' });
				}
			};

			//
			// Management of Main Stage: map
			//

			this.preloadAllMaps = function(noMapLimit)
			{
				var entries = app.data.getStoryEntries(),
					firstEntry = entries[0],
					entriesButFirst = entries.slice(1),
					// TODO temporarily this limit the number of preloaded maps to 4
					nbMapsPreloaded = 0;

				if ( ! firstEntry )
					return;

				// If the first entry is a map
				if (firstEntry.media && firstEntry.media.type == "webmap" ) {
					// Preload all other map
					$.each(entriesButFirst, function(i, entry){
						if ( entry.media && entry.media.type == "webmap" && (noMapLimit || nbMapsPreloaded < 4) ) {
							updateMainMediaMaps(
								entry.media.webmap.id,
								entry,
								i + 1,
								entry.media,
								true,
								false
							);

							nbMapsPreloaded++;
						}
					});
				}
				// Otherwise find the first map, load it and when loaded load others
				else {
					var firstMapIndex = -1;
					$.each(entriesButFirst, function(i, entry){
						if ( firstMapIndex != -1 )
							return;

						if ( entry.media && entry.media.type == "webmap" ) {
							firstMapIndex = i + 1;

							app.firstMapIsPreloaded = true;

							updateMainMediaMaps(
								entry.media.webmap.id,
								entry,
								firstMapIndex,
								entry.media,
								true,
								false
							);

							var handle = topic.subscribe("story-loaded-map", function(){
								handle.remove();

								$.each(entriesButFirst.slice(firstMapIndex), function(i, entry) {
									if ( entry.media && entry.media.type == "webmap" && (noMapLimit || nbMapsPreloaded < 4) ) {
										updateMainMediaMaps(
											entry.media.webmap.id,
											entry,
											i + firstMapIndex + 1,
											entry.media,
											true,
											false
										);
										nbMapsPreloaded++;
									}
								});
							});
						}
					});
				}
			};

			// TODO params of this and updateMainMediaMapsStep2 should be cleaned up

			function updateMainMediaMaps(newWebmapId, section, index, media, isPreloading, animateTransition, fromAction) {
				console.log("tpl.core.MainStage - updateMainMediaMaps:", newWebmapId, index, isPreloading);

				var mapContainer = $('.mapContainer[data-webmapid="' + newWebmapId + '"]');
				if ( ! isPreloading ) {
					$('.mainMediaContainer').removeClass("active has-error");
					mapContainer.parent().addClass("active");
				}

				mapContainer.parent().toggleClass("animate", !! animateTransition);

				if ( newWebmapId ) {
					var isAlreadyMap = mapContainer.hasClass('map');
					var isStillLoading = mapContainer.hasClass('isLoading');

					// The map has already been loaded and is ready
					if ( isAlreadyMap && ! isPreloading && ! isStillLoading ) {
						updateLoadedMap(newWebmapId, section, index, media, isPreloading, fromAction, mapContainer);
					}
					// The map has already been loaded but is not ready (preloading but not ready)
					else if ( isAlreadyMap && ! isPreloading && isStillLoading ) {
						updateLoadingMap(newWebmapId);
					}
					// Need to load the map
					else if ( ! isAlreadyMap && ! isStillLoading ){
						if ( ! isPreloading ) {
							startMainStageLoadingIndicator();
						}

						mapContainer.addClass('isLoading');

						// Get the extent to be used to load the webmap
						var extent = media && media.webmap ? media.webmap.extent : null;
						if ( extent ) {
							try {
								extent = mainView.getLayoutExtent(new Extent(extent), false);
							} catch (e) {
								extent = null;
							}
						}

						mainView.loadWebmap(newWebmapId, mapContainer[0], extent).then(
							lang.partial(mapLoadCallback, newWebmapId, section, index, media, isPreloading, fromAction, mapContainer),
							lang.partial(mapLoadErrback, newWebmapId, section, index, media, isPreloading, fromAction, mapContainer)
						);

						// Publish an early loaded after two second in case the map is slow to load
						setTimeout(function(){
							topic.publish("story-section-map-timeout");
						}, 2000);
					}
				}
			}

			// The map has already been loaded and is ready
			function updateLoadedMap(newWebmapId, section, index, media, isPreloading, fromAction, mapContainer) {
				var extentBeforeUpdate = app.map ? app.map.extent : null;

				app.map = app.maps[newWebmapId].response.map;
				app.mapItem = app.maps[newWebmapId].response.itemInfo;
				app.mapConfig = app.maps[newWebmapId];

				updateMainMediaMapsStep2(
					app.map,
					mapContainer,
					section,
					extentBeforeUpdate,
					index,
					media,
					false,
					isPreloading,
					fromAction
				);
			}

			// The map has already been loaded but is not ready (preloading but not ready)
			function updateLoadingMap(newWebmapId) {
				startMainStageLoadingIndicator();
				var handle = topic.subscribe("story-loaded-map", function(p){
					if ( p.id == newWebmapId ) {
						app.map = app.maps[newWebmapId].response.map;
						app.mapItem = app.maps[newWebmapId].response.itemInfo;
						app.mapConfig = app.maps[newWebmapId];

						setTimeout(function(){
							stopMainStageLoadingIndicator();
						}, 50);

						handle.remove();
					}
				});
			}

			function mapLoadCallback(newWebmapId, section, index, media, isPreloading, fromAction, mapContainer, response) {
				var extentBeforeUpdate = app.map ? app.map.extent : null;

				mapContainer.removeClass('isLoading');

				app.maps[newWebmapId] = mainView.getMapConfig(response, mapContainer);
				if ( ! isPreloading ) {
					app.map = response.map;
					app.mapItem = app.maps[newWebmapId].response.itemInfo;
					app.mapConfig = app.maps[newWebmapId];
				}

				// Popup
				if ( response.map.infoWindow ) {
					$(response.map.infoWindow.domNode).addClass("light");
					response.map.infoWindow.markerSymbol = new SimpleMarkerSymbol().setSize(0);
				}

				updateMainMediaMapsStep2(
					response.map,
					mapContainer,
					section,
					extentBeforeUpdate,
					index,
					media,
					true,
					isPreloading,
					fromAction
				);

				//
				// Register events for the builder
				//  because we need to know for Map Configuration what is the intended extent
				//  before the zoom when there is lods (the resulting extent will always be different)
				//
				if ( isInBuilder ) {
					dealWithMapInBuilder(response, newWebmapId);
				}

				if ( ! isPreloading ) {
					setTimeout(function(){
						stopMainStageLoadingIndicator();
					}, 50);
				}

				// Maps extent sync
				response.map.on("extent-change", lang.partial(onExtentChange, response, newWebmapId, mapContainer));

				// Mobile Maps info popup content toggle between description and legend
				mapContainer.siblings('.mobileInfo').find('.content-toggles .btn').click(app.ui.mobileEntryInfo.onPopupContentToggle);

				// Mobile infoWindow
				var mobileIWContainer = mapContainer.siblings('.mobileInfoWindow').find('.dijitContainer')[0];
				var mobileInfoWindow = new ContentPane({}, mobileIWContainer);
				mobileInfoWindow.startup();

				response.map.infoWindow.on("set-features", lang.partial(onSetFeatures, response, mapContainer, mobileInfoWindow));

				/*
				response.map.infoWindow.on("selection-change", function(e, f){
					setPopupPosition(response.map, response.map.infoWindow);
				});
				*/

				aspect.after(response.map.infoWindow, "show", function() {
					setPopupPosition(response.map, response.map.infoWindow);
				});

				if ( ! app.lastMapExtent )
					app.lastMapExtent = response.map.extent;

				mapContainer.parent().removeClass("has-error");
			}

			function dealWithMapInBuilder(response, newWebmapId) {
				// *********************************************
				// TODO this has to be made safe for preloading
				// *********************************************

				// can't use update-end as it's not correct value for setExtent when lods
				app.ignoreNextEvent = false;
				aspect.before(response.map, "setExtent", function(extent) {
					console.log("Set extent:", newWebmapId);
					if ( ! app.ignoreNextEvent ) {
						app.lastExtentSet = Helper.getLayoutExtent(extent, true, false);
						// A pan or zoom will also be triggered
						app.ignoreNextEvent = true;
					}
				});

				var handle = response.map.on("update-end", function(){
					handle.remove();
					app.lastExtentSet = Helper.getLayoutExtent(response.map.extent, true, false);
					// store the initial extent in a new property
					// TODO is that necessary? to not mess with browser resize and init map extent?
					//response.map._params.extent = response.map.extent;
					response.map.mapJournalInitExtent = response.map.extent;
					app.ignoreNextEvent = true;
				});

				response.map.on("zoom-end", onPanOrZoomEnd);
				response.map.on("pan-end", onPanOrZoomEnd);
			}

			function onPanOrZoomEnd(evt) {
				if ( ! app.ignoreNextEvent ) {
					app.lastExtentSet = Helper.getLayoutExtent(evt.extent, true, false);
				}
				else {
					app.ignoreNextEvent = false;
				}
			}

			function onExtentChange(response, newWebmapId, mapContainer) {
				if ( isMapSync() ) {
					/*
					if ( this.ignoreNextUpdateEnd ) {
						this.ignoreNextUpdateEnd = false;
					}
					else {
						$.each(Object.keys(app.maps), function(i, webmapId){
							if ( newWebmapId != webmapId ) {
								// TODO != proj
								app.maps[webmapId].response.map.ignoreNextUpdateEnd = true;
								app.maps[webmapId].response.map.setExtent(response.map.extent);
							}
						});
						app.lastMapExtent = response.map.extent;
					}
					*/

					if ( mapContainer.parent().hasClass('active') ) {
						$.each(Object.keys(app.maps), function(i, webmapId){
							if ( newWebmapId != webmapId ) {
								mainView.setMapExtent(
									mainView.getLayoutExtent(response.map.extent, true),
									app.maps[webmapId].response.map
								);
							}
						});
						app.lastMapExtent = response.map.extent;
					}
				}

				setTimeout(function(){
					setPopupPosition(response.map, response.map.infoWindow);
				}, 100);
			}

			function onSetFeatures(response, mapContainer, mobileInfoWindow) {
				var isOnMobileView = $("body").hasClass("mobile-view");
				if ( isOnMobileView ) {
					var feature = response.map.infoWindow.getSelectedFeature();
					mobileInfoWindow.set("content", feature ? feature.getContent() : "");
					MobilePopupUtils.open(mapContainer.siblings('.mobileInfoWindow'));
				}
				response.map.infoWindow.set("popupWindow", ! isOnMobileView);
			}

			function mapLoadErrback(newWebmapId, section, index, media, isPreloading, fromAction, mapContainer) {
				if ( ! isPreloading )
					stopMainStageLoadingIndicator();

				mapContainer.removeClass('isLoading');
				mapContainer.parent().addClass("has-error");
				mapContainer.parent().find('.error').html(i18n.viewer.errors.mapLoadingFail);

				topic.publish("story-loaded-map", {
					id: newWebmapId,
					index: index
				});
				topic.publish("ADDEDIT_LOAD_WEBMAP_FAIL");

			}

			function updateMainMediaMapsStep2(map, mapContainer, section, oldExtent, index, media, firstLoad, isPreloading, fromAction)
			{
				_this.updateMainStageWithLayoutSettings();
				setMapControlsColor();
				var mainStage = mapContainer.parent();
				if (mainStage[0] === document.activeElement) {
					onMapMainstageFocus();
				}
				else {
					mainStage.off('focus.map').on('focus.map', onMapMainstageFocus);
				}

				/* alt text needs to change dynamically because we reuse map containers */
				var altText = media && media.webmap ? media.webmap.altText : null;
				if (altText && mainStage) {
					mainStage.attr('aria-label', altText);
				}

				try {
					map.resize();
					map.reposition();
				} catch(e) { }

				// This is a story section. Update all the things.
				// popup configuration called along with mapExtent updates.
				if ( section || media ) {
					_this.updateMapLayers(media);
					updateMapExtent(map, index, media, firstLoad, isPreloading, fromAction);
					updateMapControls(media, section, index);
				}
				else
					topic.publish("ADDEDIT_WEBMAP_DONE");
			}

			this.updateMapLayers = function(media) {
				//  - Array of {id:'', visible:''} for the overrided layers (compared to the webmap initial state)
				//  - Only overrided layers are present there to allow the webmap to evolve outside of the app
				//     - If default visibility of layers are changed outside of the app, all view that didn't override the value will see the change
				//     - if the webmap evolve the array may reference deleted layers. That's cleaned anytime user open the Configure map View and Save
				var isWebmap = media && media.webmap,
					layerCfg = isWebmap ? media.webmap.layers : null,
					mapDefault = isWebmap ? app.maps[media.webmap.id].response.itemInfo.itemData.operationalLayers : [];

				// Loop through webmap layers and set the visibility
				// The visibility is set to the section definition when defined or to the webmap initial visibility
				$.each(mapDefault, lang.partial(maybeUpdateLayerVisibility, layerCfg));

			};

			function maybeUpdateLayerVisibility(layerCfg, i, layerInfo) {
				var override;
				var layerObj = layerInfo.layerObject;
				var layerFC = layerInfo.featureCollection;
				var newVisibility;

				if ( layerObj) {
					override = $(layerCfg).filter(function(i, l){ return l.id == layerObj.id; });
					newVisibility = override.length ? override[0].visibility : layerInfo.visibility;

					if ( layerObj.loaded && layerObj.visible !== newVisibility) {
							layerObj.setVisibility(newVisibility);
					}
					else {
						layerObj.on("load", function() {
							layerObj.setVisibility(newVisibility);
						});
					}
				}
				else if ( layerFC && layerFC.layers ) {
					$.each(layerFC.layers, function(i, fcLayer){
						var lyrObj = fcLayer.layerObject;
						override = $(layerCfg).filter(function(i, l){
							// Because the configuration store the map layerObject id like "mapNotes_914_0" instead of "mapNotes_914"
							// Should change that and keep V1.0 compatibility
							return l.id.split('_').slice(0,-1).join('_') == lyrObj.id.split('_').slice(0,-1).join('_');
						});
						newVisibility = override.length ? override[0].visibility : fcLayer.visibility;
						if (lyrObj.visible !== newVisibility) {
							// need to take this out of the execution loop. Not really sure why, but setting visibility
							// to true here wasn't working correctly. The <g> element of the layer still had `display: none;`
							// after regular setVisibility. Tried events or map/layer refresh, and nothing else seemed to work.
							setTimeout(function() {
								lyrObj.setVisibility(newVisibility);
							}, 100);
						}
					});
				}
			}

			function updateMapExtent(map, index, media, firstLoad, isPreloading, fromAction) {
				//
				// Extent
				//

				// If the entry has an extent defined
				var extent = media && media.webmap ? media.webmap.extent : null;
				if ( extent ) {
					try {
						extent = new Extent(extent);
					} catch (e){
						//
					}
				}

				// set up some vars to use below in a various if/else if blocks
				var mapsSynced = isMapSync();
				var webmapId = media.webmap && media.webmap.id;
				var webmapItemInfo = app.maps && webmapId && app.maps[webmapId] && app.maps[webmapId].response ? app.maps[webmapId].response.itemInfo.item : null;
				var firstMapInfo = app.data.getFirstWebmapInfo();

				// Preloading the first map of the series is preloaded (the first entry is not a map)
				if ( app.firstMapIsPreloaded && ! app.lastMapExtent ) {
					extent = Helper.getLayoutExtent(extent || map._params.extent, true);
				}
				// Preloading a map after the first map of the Series has been loaded (or preloaded)
				//  and maps are synced
				else if ( isPreloading && firstLoad && mapsSynced && app.lastMapExtent ) {
					if (firstMapInfo && firstMapInfo.webmap && firstMapInfo.webmap.extent && firstMapInfo.index > 0) {
						var firstMap = app.maps[firstMapInfo.webmap.id] ? app.maps[firstMapInfo.webmap.id].response.map : null;
						// skip all the fancy calculations and just set the next extents to the first map's starting extent.
						if (firstMap && firstMap.extent) {
							map.setExtent(firstMap.extent).then(function() {
								applyPopupConfiguration(map, media.webmap.popup, index);
								publishMapLoadedEvent(media, index);
							});
							return;
						}
					}
					extent = Helper.getLayoutExtent(app.lastMapExtent, true);
				}
				// Navigating to an already loaded section and map is synced
				else if ( ! firstLoad && mapsSynced && !fromAction) {
					extent = null;
				}
				// Navigating to an already loaded section, not synced that use default location
				else if ( ! extent && (!mapsSynced || fromAction)) {
					if (webmapItemInfo) {
						extent = CommonHelper.getWebMapExtentFromItem(webmapItemInfo, true);
					} else {
						extent = Helper.getLayoutExtent(map._params.extent, true);
						extent = Helper.getLayoutExtent(extent, false);
					}
				}
				else if ( ! extent && mapsSynced && app.lastMapExtent ) {
					extent = Helper.getLayoutExtent(app.lastMapExtent, true);
				}
				else if ( ! extent ) {
					extent = Helper.getLayoutExtent(map._params.extent, true);
					if ( firstLoad ) {
						extent = Helper.getLayoutExtent(extent, false);
					}
				}

				if ( extent ) {
					mainView.setMapExtent(extent, map).then(function(){
						applyPopupConfiguration(map, media.webmap.popup, index);
						publishMapLoadedEvent(media, index);
					});
				}
				else {
					publishMapLoadedEvent(media, index);
					applyPopupConfiguration(map, media.webmap.popup, index);
				}
			}

			function publishMapLoadedEvent(media, index) {
				topic.publish("story-loaded-map", {
					id: media.webmap.id,
					index: index
				});
			}

			function updateMapControls(media, section, index) {
				//
				// Map Controls
				//

				var overviewSettings = media.webmap.overview || {},
					legendSettings = media.webmap.legend || {},
					globalMapSettings = WebApplicationData.getSettings().mapOptions,
					thisMap = app.maps[media.webmap.id];

				// If the app use some global Map settings
				if ( globalMapSettings ) {
					if ( globalMapSettings.overview && globalMapSettings.overview )
						overviewSettings = globalMapSettings.overview;
				}

				// If it's a Main Stage Action, look to use the section Main Stage media
				//  configuration IF it's a webmap
				if ( index === null && section.media && section.media.webmap  ) {
					overviewSettings = section.media.webmap.overview || {},
					legendSettings = section.media.webmap.legend || {};
				}

				if ( overviewSettings.enable !== undefined ) {
					var thisOverview = thisMap.overview;
					thisOverview.toggle(overviewSettings.enable, WebApplicationData.getColors());
					thisOverview.toggleExpanded(overviewSettings.openByDefault);
					thisOverview.setSettings(overviewSettings);
				}

				if ( legendSettings.enable !== undefined ) {
					var thisLegend = thisMap.legend;
					thisLegend.toggle(legendSettings.enable);
					thisLegend.toggleExpanded(legendSettings.openByDefault);
					thisLegend.setSettings(legendSettings);
				}
			}

			function isMapSync(/*index*/)
			{
				// If app and user config have SYNC enabled
				return ( app.appCfg.mapsSyncAppOption && WebApplicationData.getMapOptions().mapsSync );
				//if ( app.appCfg.mapsSyncAppOption && WebApplicationData.getMapOptions().mapsSync ) {
				//	// Find the first Map entry of the app
				//	var firstMapEntryIndex = Number.MAX_VALUE;
				//	var sections = WebApplicationData.getStoryEntries();
				//	_.some(sections, function(section, idx) {
				//		if (section.media && section.media.webmap) {
				//			firstMapEntryIndex = idx;
				//			return true;
				//		}
				//		return false;
				//	});

				//	// webmap.entries index start at 1
				//	return index > firstMapEntryIndex;
				//}

				//return false;
			}

			function applyPopupConfiguration(map, popupCfg, index)
			{
				// When an action is performed the popup will be closed
				// But features aren't cleared so it can be restored
				if ( map.infoWindow )
					map.infoWindow.hide();

				if ( popupCfg ) {
					var layer = map.getLayer(popupCfg.layerId),
						// TODO some MapService layer seems to require this
						// need to investigate more to make sure there is no other way
						// also if the popup contains multiple features, only the first feature will be displayed
						serviceId = popupCfg.layerId ? popupCfg.layerId.split('_').slice(0, -1).join('_') : '',
						layer2 = map.getLayer(serviceId);

					map.infoWindow.clearFeatures();

					if ( layer ) {
						if (layer.updating) {
							var eventListener = layer.on('update-end', function() {
								eventListener.remove();
								applyPopupConfigurationStep2(map, popupCfg, index);
							});
						} else {
							applyPopupConfigurationStep2(map, popupCfg, index);
						}
					}
					// TODO
					else if ( layer2 ) {
						var layerIdx = popupCfg.layerId.split('_').slice(-1).join('_'),
							layerUrl = layer2.url + '/' + layerIdx;

						var testUrl = lang.getObject('infoTemplates.' + layerIdx + '.layerUrl', false, layer2);
						layerUrl = testUrl || layerUrl;

						// NOTE! step2Alt needs a map argument! Unlike Journal!
						applyPopupConfigurationStep2Alt(map, popupCfg, index, serviceId, layerIdx, layerUrl);
					}
					// On FS the layer will be null until loaded...
					else
						var handle = app.map.on("update-end", function(){
							applyPopupConfiguration(map, popupCfg, index);
							handle.remove();
						});
				}
			}

			function applyPopupConfigurationStep2(map, popupCfg, index)
			{
				var query = new Query(),
					layer = map.getLayer(popupCfg.layerId);

				if ( ! layer )
					return;

				query.objectIds = [popupCfg.fieldValue];

				// Feature Service
				if (!layer._collection) {
					query.returnGeometry = true;
					query.outFields = ["*"]; // popupCfg.fieldName ?
					query.outSpatialReference = map.spatialReference;
				}

				// TODO: Image Services
				if ( ! layer.queryFeatures ) {
					return;
				}

				layer.queryFeatures(query).then(function(featureSet) {
					applyPopupConfigurationStep3(map, popupCfg, featureSet.features, index);
				});
			}

			// TODO
			function applyPopupConfigurationStep2Alt(map, popupCfg, index, serviceId, layerIdx, layerUrl)
			{
				var queryTask = new QueryTask(layerUrl),
					query = new Query(),
					layer = map.getLayer(serviceId);

				if ( ! layer )
					return;

				query.objectIds = [popupCfg.fieldValue];
				query.returnGeometry = true;
				query.outFields = ["*"]; // popupCfg.fieldName ?
				query.outSpatialReference = map.spatialReference;

				queryTask.execute(query, function(featureSet) {
					applyPopupConfigurationStep3(map, popupCfg, featureSet.features, index, serviceId, layerIdx);
				});
			}

			function applyPopupConfigurationStep3(map, popupCfg, features, index, serviceId, layerIdx)
			{
				if ( !map || ! popupCfg || ! features || ! features.length )
					return;

				var geom = features[0].geometry,
					center = null;

				if ( popupCfg.anchorPoint )
					center = new Point(popupCfg.anchorPoint);
				else
					center = geom.getExtent() ? geom.getExtent().getCenter() : geom;

				// TODO
				if ( serviceId ) {
					features[0].infoTemplate = map.getLayer(serviceId).infoTemplates[layerIdx].infoTemplate;
					map.infoWindow.setContent(features[0].getContent());
				}
				else {
					map.infoWindow.setFeatures(features);
				}

				if (map.updating || map.__panning) {
					var handle = map.on('update-end', function() {
						handle.remove();
						map.infoWindow.show(center);
					});
				}
				else {
					map.infoWindow.show(center);
				}
				// Center the map is the geometry isn't visible
				if ( ! map.extent.contains(center) && !isMapSync(index)) {
					map.centerAt(center);
					//// Show back btn only if it's a Main Stage action
					//if ( index === null ) {
					//	$('.mediaBackContainer')
					//		.show()
					//		.css("marginLeft", - $(".mediaBackContainer .backButton").outerWidth() / 2)
					//		.css("marginRight", - $(".mediaBackContainer .backButton").outerWidth() / 2);
					// }
				}
			}

			/*
			 * Replace the map popup when popup is displayed and map extent change
			 */
			function setPopupPosition(map, popup)
			{
				if (! map || ! popup || (! popup.getSelectedFeature() && !popup.deferreds) || ! popup.location) {
					return;
				}

				var mapContainer = $(map.container),
					width = mapContainer.width(),
					height = mapContainer.height(),
					pos = map.toScreen(map.infoWindow.location),
					visibleControls = mapContainer.find('.esriSimpleSlider:visible, .geocoderBtn:visible'),
					posControls = visibleControls.last().position() || { left: 0 },
					posPanel = $(".descLegendPanel:visible").position(),
					popupWidth = 270 + /* arrow pointer size */ 30;

				// App class that hide popup temporarily
				$('.esriPopup').removeClass('app-hidden');

				// If the tab/bullet panel is right anchored -> map visible with stop where panels begin
				if ( posPanel && posPanel.left )
					width = posPanel.left;

				// If only the +/home/- control
				if ( visibleControls.length == 1 )
					posControls.top += 60;

				// 3x3 grid of the map that anchor popup to maximize it's visibility
				if ( (pos.x < popupWidth + posControls.left) && pos.y < height / 3 )
					popup.set('anchor','bottom-right');
				else if ( (pos.x < (width - popupWidth)) && pos.y < height / 3 )
					popup.set('anchor','bottom');
				else if ( (pos.x >= (width - popupWidth)) && pos.y < height / 3 )
					popup.set('anchor','bottom-left');
				else if ( (pos.x < (width - popupWidth)) && pos.y < height * 2/3 )
					popup.set('anchor','right');
				else if ( (pos.x >= (width - popupWidth)) && pos.y < height * 2/3 )
					popup.set('anchor','left');
				else if ( (pos.x < popupWidth + posControls.left) && pos.y >= height * 2/3 )
					popup.set('anchor','top-right');
				else if ( (pos.x < (width - popupWidth)) && pos.y >= height * 2/3 )
					popup.set('anchor','top');
				else
					popup.set('anchor','top-left');

				// If under map controls
				if ( pos.x < posControls.left + 30 && pos.y < posControls.top + 30 )
					$('.esriPopup').addClass('app-hidden');

				// If there is a tab/bullet panel
				if ( posPanel ) {
					if ( pos.y < $(".descLegendPanel:visible").height() + 20 ) {
						// Left anchored
						if ( posPanel.left === 0 ) {
							if ( pos.x < $(".descLegendPanel:visible").width() )
								$('.esriPopup').addClass('app-hidden');
						}
						else {
							if ( pos.x > posPanel.left )
								$('.esriPopup').addClass('app-hidden');
						}
					}
				}

				// If geom not visible
				if (mapContainer.parent().hasClass('active') && (pos.x <= 0 || pos.y <= 10 || pos.x >= width || pos.y >= height )) {
					$('.esriPopup').addClass('app-hidden');
				}
			}

			function setMapControlsColor()
			{
				if ( app.mapConfig ) {
					var appColors = app.data.getWebAppData().getColors();
					app.mapConfig.overview.setColors(appColors);
					app.mapConfig.legend.setColors(appColors);
				}
			}

			// Builder events

			this.showWebmapById = function(webmapId)
			{
				updateMainMediaMaps(webmapId, null, null, null);
			};

			this.reloadCurrentWebmap = function()
			{
				var currentEntry = app.data.getCurrentEntry();

				if ( currentEntry && currentEntry.media && currentEntry.media.webmap ) {
					var webmapId = currentEntry.media.webmap.id,
						mapContainer = $('.mapContainer[data-webmapid="' + webmapId + '"]');

					mapContainer.parent().remove();
					if ( app.maps[webmapId] ) {
						app.maps[webmapId].response.map.destroy();
						delete app.maps[webmapId];
					}

					$("#mainStagePanel .medias").append(mainMediaContainerMapTpl({
						webmapid: webmapId,
						isTemporary: false,
						altText: currentEntry.media.webmap.altText || '',
						focusToPanel: i18n.viewer.a11y.focusContent,
						lblDescription: i18n.viewer.mobileInfo.description,
						lblLegend: i18n.viewer.mobileInfo.legend,
						lblLegendMobileError: i18n.viewer.mobileInfo.lblLegendMobileError,
						lblLegendMobileErrorExplain: i18n.viewer.mobileInfo.lblLegendMobileErrorExplain
					}));

					topic.publish("story-navigate-entry", app.data.getCurrentEntryIndex());
				}
			};

			this.loadTmpWebmap = function(webmapId)
			{
				if ( ! $('.mapContainer[data-webmapid="' + webmapId + '"]').length )
					addTemporaryMainMediaContainer(webmapId);

				updateMainMediaMaps(webmapId, null, null, null);
			};

			//
			// Management of Main Stage: picture
			//

			function updateMainMediaPicture(image, animateTransition)
			{
				$('.mainMediaContainer').removeClass('active');

				var pictureContainer = $('.imgContainer[data-src="' + image.url + '"]');

				if ( pictureContainer.length ) {
					// If image hasn't been loaded, display loading indicator
					if ( pictureContainer.css('background-image') == 'none' ) {
						startMainStageLoadingIndicator();
					}

					var sizedUrl = image.url;
					if (image.sizes) {
						var sorted = _.sortBy(image.sizes, 'width').reverse();
						sizedUrl = sorted[0].url;
						if (sorted.length > 1) {
							var compareWidth = image.display && image.display === 'fit' ? $('#mainStagePanel').width() : $('body').width();
							_.some(sorted, function(fileObj) {
								if (fileObj.width && fileObj.width < compareWidth) {
									return true;
								}
								sizedUrl = fileObj.url;
								return false;
							});
						}
					}
					var tokenizedUrl = CommonHelper.possiblyAddToken(sizedUrl);

					pictureContainer.parent()
						.addClass('active')
						.attr('aria-label', image.altText || '')
						.toggleClass("animate", !! animateTransition);

					// Load a hidden image in JS
					var tmpImg = new Image();
					tmpImg.src = tokenizedUrl;
					tmpImg.onload = function() {
						// Display the image through CSS background, thanks to browser cache no reload is needed
						pictureContainer
							.removeClass("center fit fill stretch")
							.addClass(image.display)
							.css({
								left: 0,
								right: 0
							})
							.css('background-image', 'url("' + tokenizedUrl + '")');

						_this.updateMainStageWithLayoutSettings();

						// If the section is still active, stop the loading indicator
						//  after a little delay to accomodate heavy image that takes a while to display
						if ( pictureContainer.parent().hasClass('active') ) {
							setTimeout(stopMainStageLoadingIndicator(), 100);
						}
					};
				}
			}

			//
			// Management of Main Stage: embed (video and webpage)
			//

			function updateMainMediaEmbed(rawUrl, cfg, animateTransition)
			{
				var url = rawUrl;
				try {
					url = btoa(rawUrl);
				} catch ( e ) { }

				$('.mainMediaContainer').removeClass('active');

				// URL can be an URL or the timestamp in case of an iframe tag
				var embedContainer = $('.embedContainer[data-src="' + url + '"]');

				// Not found, must be an iframe tag
				if ( ! embedContainer.length ) {
					embedContainer = $('.embedContainer[data-ts="' + rawUrl + '"]');

					// The correct URL is in data-src
					try {
						url = btoa(embedContainer.data('src'));
					} catch ( e ) {
						url = embedContainer.data('src');
					}
				}

				if ( embedContainer.length ) {
					embedContainer
						.removeClass("center fit fill stretch")
						.addClass(cfg.display)
						.attr("data-unload", cfg.hash === undefined && (cfg.unload === undefined || cfg.unload))
						.css({
							left: 0,
							right: 0
						});

					// Check if the URL is encoded
					if ( ! url.match('//') ) {
						url = atob(url);
					}

					if ( cfg.hash ) {
						url = url + '#' + cfg.hash;
						embedContainer.attr('src', url);
					}

					// TODO this fail if no src attr is set on the iframe (srcdoc)
					//  as a workaround <iframe srcdoc="http://" src="about:blank></iframe>
					if ( ! embedContainer.attr('src') ){
						// Loading indicator
						embedContainer.off('load').load(stopMainStageLoadingIndicator);
						startMainStageLoadingIndicator();

						// vimeo changed their player in fall 2017 to make it more... compact? idk.
						// in any case, it screws up expected styling for "fill" layout on mainstage
						// so we're adding a url param transparent=0 to revert to the old styling
						if (url.match('//player.vimeo.com/video') && !url.match('transparent=0')) {
							if (url.match(/\?/)) {
								url = url + '&transparent=0';
							} else {
								url = url + '?transparent=0';
							}
						}

						// TODO youtube recommand an origin param "&origin=" + encodeURIComponent(document.location.origin)
						// https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player
						embedContainer.attr('src', url);
					}

					var width = cfg.width || '560',
						height = cfg.height || '315';

					// Done trough CSS and JS on resize
					if ( cfg.display == "fit" ) {
						width = "";
						height = "";
					}

					if ( width ) {
						if ( ! width.match(/[0-9]+%/) )
							width = width + 'px';
						embedContainer.attr('width', width);
					}
					if ( height ) {
						if ( ! height.match(/[0-9]+%/) )
							height = height + 'px';
						embedContainer.attr('height', height);
					}

					embedContainer.parent()
						.addClass('active')
						.toggleClass("animate", !! animateTransition)
						.attr('aria-label', cfg.altText || '');
					_this.updateMainStageWithLayoutSettings();
				}
			}

			function styleMainStageEmbed()
			{
				$(".mainMediaContainer.active iframe.embedContainer.fit").attr(
					"height",
					$("#mainStagePanel").width() * 9 / 16
				);
			}

			/* mainstage focus management */
			this.focusActiveMainstage = function(originator, fromAction) {
				this.returnTo = originator;
				var activeMainstage = container.find('.mainMediaContainer.active');
				activeMainstage.off('focus.generic');
				setTimeout(function() {
					activeMainstage.focus(); // detach focus listener so it doesn't get triggered twice
					onMainstageFocus(activeMainstage, fromAction);
				}, 300);
			};

			function onMainstageFocus(mainstage, fromAction) {
				mainstage = mainstage || container.find('.mainMediaContainer.active');
				var escButton = mainstage.find('.return-to-content');
				var focusableJqs = mainstage.find(app.appCfg.focusable).filter(':visible').filter(':not(.return-to-content)');
				var focusableEls = mainstage.get().concat(focusableJqs.get()).concat(escButton.get());
				if (fromAction) {
					$('.mediaBackContainer .backButton').off('keydown')
						.on('keydown', function(e) {
							backBtnKeydown(e, focusableEls);
						});
				}
				mainstage.off('keydown').on('keydown', function(e) {
					mainstageKeydown.bind(this)(e, focusableEls);
				});

			}

			function mainstageKeydown(e, focusableEls) {
				// on tab, cycle through focusable elements.
				// at this point, focusableEls should, at minimum,
				// include the mainstage and esc buttons.
				if (e.keyCode === 9) {
					var lastTab = focusableEls[focusableEls.length - 1];
					var firstTab = focusableEls[0];
					var backBtn = $('.mediaBackContainer .backButton:visible')[0];
					var nextTarget;
					if (e.target === lastTab && !e.shiftKey) {
						// on last tabbable element, tab forward to either back btn or first tabbable.
						nextTarget = backBtn || firstTab;
					} else if (e.target === firstTab && e.shiftKey) {
						// on first tabbable element, tab backwards to either back btn or last tabbable.
						nextTarget = backBtn || lastTab;
					}
					if (nextTarget) {
						e.preventDefault();
						$(nextTarget).focus();
					}
					return;
				}

				// on esc, exit mainstage
				if (e.keyCode === 27) {
					somehowLeaveMainstage($(this));
				}
			}

			function somehowLeaveMainstage(mainstage) {
				mainstage = mainstage || container.find('.mainMediaContainer.active');
				var backBtn = $('.mediaBackContainer .backButton');
				if (backBtn && backBtn.length && backBtn.is(':visible')) {
					triggerBackBtn(backBtn);
				} else {
					_this.exitMainstage(mainstage);
				}

			}

			this.exitMainstage = function(mainstage, triggerFromContent) {
				triggerFromContent = triggerFromContent || this.returnTo;
				onMapMainstageBlur();
				attachGenericFocus(mainstage || container.find('.mainMediaContainer.active'));
				if (triggerFromContent && triggerFromContent.length!== 0) {
					$(triggerFromContent).focus();
				} else {
					app.ui.descLegendPanel.focus();
					app.ui.accordionPanel.focus();
				}
				this.returnTo = null;
			};

			function attachGenericFocus(mainstage) {
				mainstage.off('focus.generic')
					.on('focus.generic', function() {
						onMainstageFocus(mainstage);
					});
			}

			function triggerBackBtn(backBtn) {
				attachGenericFocus(container.find('.mainMediaContainer.active'));
				this.returnTo = null;
				backBtn.trigger('click');
				backBtn.off('keydown');
			}

			function backBtnKeydown(e) {
				// don't need to deal with <enter> or <space> here.
				// that's taken care of automatically. just need to handle <esc> and tabbing.
				if (e.keyCode === 9) {
					e.preventDefault();
					if (e.shiftKey) {
						container.find('.return-to-content').focus();
					} else {
						container.find('.mainMediaContainer.active').focus();
					}
				} else if (e.keyCode === 27) {
					triggerBackBtn($(e.target));
				}
			}

			function onMapMainstageFocus() {
				var thisMap = app.map;
				thisMap.enableKeyboardNavigation();
				var mouseEvents = lang.getObject('navigationManager.mouseEvents', false, thisMap);
				if (mouseEvents) {
					mouseEvents._onMouseEnterHandler(new window.Event('mouseenter'));
				}
			}

			// it's possible there will be a lot of these stacked on different mainstages,
			// but there shouldn't be a harm in multiple calls here. worse is no calls, given
			// the order of the mainstage-exit broadcast.
			function onMapMainstageBlur() {
				if( WebApplicationData.getLayoutId() == "float" ) {
					app.ui.floatingPanel.enableSwiperKeybordEvent();
				}

				var thisMap = app.map;
				if (!thisMap) {
					return;
				}
				var mouseEvents = lang.getObject('navigationManager.mouseEvents', false, thisMap);

				thisMap.disableKeyboardNavigation();
				if (mouseEvents) {
					mouseEvents._onMouseLeaveHandler(new window.Event('mouseleave'));
				}
			}


		};
	}
);
