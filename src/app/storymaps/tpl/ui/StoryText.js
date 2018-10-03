define(["dojo/topic",
		"dojo/_base/lang",
		"esri/layers/GraphicsLayer",
		"esri/graphic",
		"esri/geometry/Extent",
		"esri/geometry/Point",
		"esri/geometry/ScreenPoint",
		"esri/symbols/PictureMarkerSymbol",
		"storymaps/tpl/core/WebApplicationData",
		"storymaps/common/utils/CommonHelper",
		"storymaps/tpl/core/Helper",
		"lib-app/colorbox/jquery.colorbox",
		"lib-build/css!lib-app/colorbox/colorbox"
    ],
	function(
		topic,
		lang,
		GraphicsLayer,
		Graphic,
		Extent,
		Point,
		ScreenPoint,
		PictureMarkerSymbol,
		WebApplicationData,
		CommonHelper,
		Helper
	){
		var _fullScreenMediaIsOpening = false;

		/*
		 * Prepare all content that come from the rich text editor for display
		 * (entry content)
		 */
		function prepareEditorContent(str)
		{
			// Replace &nbsp; by a space space is not the only character of a tag
			//  i.e. <p>&nbsp;<p> or <p class="foo">&nbsp;</p> is not changed but all others &nbsp; are replaced by a space
			var str2 = str.replace(/(?!>)(&nbsp;)(?!<\/)/g, ' ');

			// Add tabindex to not empty elements
			str2 = $(str2);
			str2.find('.description > *').each(function(i, elem){
				var $elem = $(elem);
				if (($elem).attr('tabindex')) {
					// remove tabindex from paragraphs (they're stored in the story json)
					var tagName = $elem.prop('tagName');
					if (tagName === 'P' || tagName === 'FIGURE') {
						$elem.removeAttr('tabindex');
					} else {
						// todo: what other things currently have tabindex?
					}
				}
				// make story actions tabbable by adding a href="#" property
				$elem.find('a[data-storymaps]:not([href])').prop('href', '#');
			});

			return str2;
		}

		/*
		 * Prepare story text content for display
		 * All panels have to call that function
		 */

		function prepareContentIframe(contentStr)
		{
			var content = $(contentStr);

			content.find("iframe").each(function(i, frame){
				var $frame = $(frame),
					dataUnload = $frame.attr('data-unload'),
					a11yStrs = i18n.viewer.a11y,
					btnStr1 = a11yStrs.skipBelowContent,
					btnStr2 = a11yStrs.skipAboveContent;
				if ($frame.attr('src').match(/vimeo\.com\/|youtube.com\//)) {
					btnStr1 = a11yStrs.skipBelowVideo;
					btnStr2 = a11yStrs.skipAboveVideo;
				}

				var skipFrame = $('<button>', {
					'class': 'visible-on-focus skip-iframe',
					'text': btnStr1
				});

				var skipBack = $('<button>', {
					'class': 'visible-on-focus skip-back',
					'text': btnStr2
				});

				skipFrame.on('click', function() {
					skipBack.focus();
				});

				skipBack.on('click', function() {
					skipFrame.focus();
				});

				$frame.before(skipFrame);
				$frame.after(skipBack);

				// Don't use .data('src') on purpose (stored memory not persisted when added DOM later)
				$frame
					.attr("data-src", $frame.attr('src'))
					.attr("data-unload", dataUnload === undefined || dataUnload == "true")
					.removeAttr('src');
			});

			return content;
		}

		/*
		 * Load Iframe with source hidden above
		 */

		function loadContentIframe(container)
		{
			container.find("iframe").each(function(i, node){
				var frame = $(node);
				// Set the iframe only if not already set (i.e. don't reload)
				if ( ! frame.attr('src') )
					frame.attr("src", frame.data('src'));
			});
		}

		/*
		 * Style section content after it has been inserted in the dom
		 */

		function styleSectionPanelContent()
		{
			/* TODO floating panel width is approximate has padding is in % */

			resizeSectionIframe($(".descLegendPanel .textEditorContent"), $(".descLegendPanel").width() - 40);
			resizeSectionIframe($(".accordionPanel .textEditorContent"), $(".accordionPanel").width() - 34);
			// TODO mobile view video size not adjusted
			//resizeSectionIframe($(".mobilePopup .textEditorContent"), $(".mainMediaContainer").width() - 80);
		}

		/*
		 * Add an height to iframe that don't have one (fit)
		 */
		function resizeSectionIframe(container, contentInnerWidth)
		{
			// Same ratio present in ViewText
			container.find(".iframe-container.fit iframe").attr("height", contentInnerWidth * 9 / 16);
		}

		/*
		 * Create Section panel actions link
		 */

		function createMainMediaActionLink(optionalContainer)
		{
			$.each(app.data.getContentActions(), function(i, action) {
				var selectorStr = 'a[data-storymaps=' + action.id + ']';
				var link = optionalContainer ? $(optionalContainer).find(selectorStr) : $(selectorStr),
					validAction = link.length > 0;

				if (action.type == 'navigate' && (action.index == -1 || action.hiddenSection)) {
					validAction = false;

					// In builder and viewer if owner - style the navigate link that point to invalid section differently
					// In viewer when not owner, just disable the link
					var errorClass = app.userCanEdit ? 'navigate-error' : 'navigate-error-silent';
					link.addClass(errorClass);

					if (app.userCanEdit) {
						var label = i18n.viewer.mainStage.errorDeleted;

						if (action.hiddenSection && action.index != -1) {
							label = i18n.viewer.mainStage.errorNotPublished;
						}

						link.tooltip({
							trigger: 'hover',
							placement: 'top',
							container: 'body',
							title: label
						});
					}
				}

				if (validAction) {
					$("a[data-storymaps=" + action.id + "]").off('click').click(function(evt){
						var fromKeyboard = !(evt.screenX || evt.screenY);
						performAction(action, link, fromKeyboard);
					});
				}
			});
			$("#mainStagePanel").find(".backLbl").html(i18n.viewer.mainStage.back);
		}

		/*
		 * Full screen
		 */

		function mediaFullScreen(e)
		{
			var target = $(e.target),
				imgNode = target.is("img") ? target : target.siblings('img');

			_fullScreenMediaIsOpening = true;

			$.colorbox({
				href: imgNode.attr('src'),
				photo: true,
				title: imgNode.parents('figure').find('figcaption').html() || imgNode.attr('title'),
				scalePhotos: true,
				maxWidth: '90%',
				maxHeight: '90%',
				// restore focus to where we came from (otherwise, focus is completely lost,
				// and the user has to start over again). this will affect non-keyboard nav, and
				// put the default focus ring around the fullscreen button on the image for all users
				onClosed: function() {
					imgNode.siblings('.btn-fullscreen').focus();
					$('body').off('keydown');
				},
				onComplete: function() {
					// trap focus in modal if you try to tab away from the close button
					var closeBtn = $('#cboxClose');
					$('body').on('keydown', function(evt) {
						if (evt.keyCode === 9 && evt.target === closeBtn[0] && !evt.shiftKey) {
							evt.preventDefault();
							evt.stopImmediatePropagation();
						}
					});
				}
			});

			setTimeout(function(){
				_fullScreenMediaIsOpening = false;
			}, 800);
		}

		function createMediaFullScreenButton() // TODO: container? common method with actionLink?
		{
			$(".textEditorContent img").each(function(i, node){
				var hasWidth = !! $(node).attr('width'),
					floatRight = $(node).css('float') == "right";

				$(node).parent()
					.css('position', 'relative')
					.addClass(hasWidth ? "has-width" : "no-width")
					.addClass(floatRight ? "float-right" : "");
				$(node)
					.wrap("<div class='image-wrapper'></div>");
				if (($(node).parents('#mobileView').length)) {
					$(node).parents('.image-container').removeClass('activate-fullscreen');
				} else {
					$(node).after($('<button class="btn-fullscreen" title="' + i18n.viewer.common.expandImage + '"></button>').click(mediaFullScreen))
					.click(mediaFullScreen);
				}
			});

			$(document)
				.unbind('cbox_complete', onMediaFullScreenClick)
				.bind('cbox_complete', onMediaFullScreenClick);
		}

		function onMediaFullScreenClick()
		{
			$('#cboxLoadedContent img').click(function(){
				// Workaround for click delay on touch device
				if( _fullScreenMediaIsOpening )
					return;
				$.colorbox.close();
			});
		}

		function createMainStageFocusButton() {

			$('.descriptions .focus-mainstage').add('.accordion-content .focus-mainstage').on('click', function(evt) {
				var index = $(this).parents('.entry').index();
				if (index !== app.data.getCurrentSectionIndex()) {
					app.ui.mainStage.updateMainMediaWithStoryMainMedia(index);
				}
				app.ui.mainStage.focusActiveMainstage(evt.target);
			});
		}

		/*
		 * Panel action link
		 */

		function performAction(action, link, fromKeyboard)
		{
			var currentMedia = app.data.getCurrentSection() && app.data.getCurrentSection().media;

			var backBtnWasVisible = $('.backButton').is(':visible');

			$('.mediaBackContainer').hide();

			var locLayer = app.map && app.map.getLayer("MJActionsLocate");
			if (locLayer) {
				app.map.removeLayer(locLayer);
			}

			if ( action.type == "navigate" ) {
				if (action.index !== undefined) {
					var adjustedIndex = app.data.getAdjustedIndex(action.index);
					topic.publish('story-navigate-entry', adjustedIndex);
					if (fromKeyboard) {
						topic.publish('story-focus-entry', adjustedIndex);
					}
				}
			}
			else if ( action.type == "zoom" ) {
				handleZoomAction(action.zoom, currentMedia, backBtnWasVisible, link);
			}
			else if ( action.type == "media" ) {
				handleMediaAction(action.media, currentMedia, backBtnWasVisible, link);
			}
		}

		function handleMediaAction(mediaAction, currentMedia, backBtnWasVisible, link) {
			var currentMediaIsWebmap = currentMedia && currentMedia.type == "webmap",
				currentExtent = currentMediaIsWebmap ? new Extent(app.map.extent.toJson()) : null,
				currentWebmapId = currentMediaIsWebmap ? currentMedia.webmap.id : null,

				actionIsWebmap = mediaAction.type == "webmap",
				actionWebmap = actionIsWebmap && mediaAction.webmap,
				actionChangeWebmap = currentWebmapId && actionIsWebmap && currentWebmapId != actionWebmap.id,
				actionChangeExtent = !!(actionIsWebmap && actionWebmap.extent),
				actionChangeLayers = !! (actionIsWebmap && actionWebmap.layers);

				topic.publish("story-perform-action-media", mediaAction);
				var currentWebmap = actionIsWebmap ? app.maps[mediaAction.webmap.id] : null;
				if (actionIsWebmap && !currentWebmap) {
					var handle = topic.subscribe('story-loaded-map', function() {
						handle.remove();
						currentWebmap = app.maps[mediaAction.webmap.id];
						if (actionChangeExtent && currentWebmap.mapCommand) {
							app.maps[mediaAction.webmap.id].mapCommand.currentHomeExtent = new Extent(mediaAction.webmap.extent);
						}

						setTimeout(function() {
							app.ui.mainStage.focusActiveMainstage(link, true);
						}, 500);
					});
				} else {
					if (actionChangeExtent && currentWebmap.mapCommand) {
						app.maps[mediaAction.webmap.id].mapCommand.currentHomeExtent = new Extent(mediaAction.webmap.extent);
					}
					app.ui.mainStage.focusActiveMainstage(link, true);
				}

				if (!backBtnWasVisible) {
					$('.backButton').off('click').click(lang.partial(
						backBtnCb,
						currentMedia,
						currentExtent,
						link
					));
				}

				var isRealExtentChange = false;
				var isSync = app.appCfg.mapsSyncAppOption && WebApplicationData.getMapOptions().mapsSync;
				if (actionChangeExtent || isSync) {
					if (currentMediaIsWebmap && !actionChangeWebmap && currentWebmapId) {
						var actionExtent = app.map._params.extent;
						if (actionWebmap.extent) {
							actionExtent = new Extent(actionWebmap.extent);
						}
						else if (isSync) {
							var webmapItemInfo = app.maps && actionWebmap.id && app.maps[actionWebmap.id] && app.maps[actionWebmap.id].response ? app.maps[actionWebmap.id].response.itemInfo.item : null;
							if (webmapItemInfo) {
								actionExtent = CommonHelper.getWebMapExtentFromItem(webmapItemInfo, true);
							}
						}
						var actionExtentAdjustedForPanel = Helper.getLayoutExtent(actionExtent);
						var actionExtentAdjustedForScreen = app.map._fixExtent(actionExtentAdjustedForPanel).extent;
						isRealExtentChange = !CommonHelper.extentsAreCloseEnough(app.map.extent, actionExtentAdjustedForScreen, app.map, 30);
					}
					else {
						isRealExtentChange = true;
					}
				}

				if (!actionWebmap || !actionWebmap.popup) {
					showMobilePanel();
				}

				if (actionIsWebmap) {
					if (currentMediaIsWebmap) {
						maybeShowLegend(actionWebmap, currentMedia.webmap.legend);
						switchToMobileDesc();
					}
				}
				else {
					maybeShowLegend();
				}

				if (actionChangeWebmap || !actionIsWebmap || !currentMediaIsWebmap || isRealExtentChange || actionChangeLayers || backBtnWasVisible) {
					showBackBtn();
				}
		}

		function maybeShowLegend(webmapInfo, legendInfo) {
			$('#descLegendPanel .legendWrapper').removeClass('active');
			var showLegend = (legendInfo && legendInfo.enable) || (!legendInfo && webmapInfo && webmapInfo.legend && webmapInfo.legend.enable);
			if (showLegend) {
				var legendSelector = '.legendWrapper[data-webmap=' + webmapInfo.id + ']';
				var targetLegend = $(legendSelector).addClass('active');
				if (!targetLegend.length) {
					var handle = topic.subscribe('story-created-legend', function(legendId) {
						if (legendId === webmapInfo.id) {
							$(legendSelector).addClass('active');
							handle.remove();
							switchToMobileDesc();
						}
					});
					setTimeout(function() {
						handle.remove();
					}, 2000);
				}
			}
			switchToMobileDesc();
		}

		function showMobilePanel() {
			if ($('body').hasClass('mobile-view') && $('#mobileInfoBtn:visible').length) {
				// show the mobile panel
				$('#mobileInfoBtn').click();
			}
		}

		function switchToMobileDesc() {
			if ($('body').hasClass('mobile-view')) {
				// yes, this seems hacky, but it's how EntryInfo does it...
				// take out of execution loop so it actually happens.
				setTimeout(function() {
					$('.mainMediaContainer.active .mobilePopup.mobileInfo').find('.content-toggles .btn').eq(0).click();
				}, 1);
			}
		}

		function showBackBtn() {
			var backBtnAdjust = $(".mediaBackContainer .backButton").outerWidth() / 2;
			$('.mediaBackContainer').show().css('margin', '-' + backBtnAdjust + ', 0');
		}

		function backBtnCb(sectionMedia, previousExtent, link) {
			topic.publish('story-navigate-entry', app.data.getCurrentEntryIndex());
			if (sectionMedia && sectionMedia.webmap && app.map) {
				app.map.infoWindow.hide();
				if (previousExtent) {
					app.map.setExtent(previousExtent);
				}
				// app.ui.mainStage.updateMapLayers(sectionMedia);
				var locateLayer = app.map.getLayer('MJActionsLocate');
				if (locateLayer) {
					app.map.removeLayer(locateLayer);
				}

				maybeShowLegend(sectionMedia.webmap);
			}
			$('.mediaBackContainer').hide();
			app.ui.mainStage.exitMainstage(null, link);
			showMobilePanel();
			switchToMobileDesc();

			//	// Was on a webmap and action is the same webmap
			//	// Manually restore the state
			//	if ( actionIsSameWebmap ) {
			//		var currentMap = app.maps[currentWebmapId];
			//		var currentSectionDefineExtent = !! (currentMediaIsWebmap ? currentMedia.webmap.extent : null),
			//			resetExtent = currentSectionDefineExtent ? new Extent(currentMedia.webmap.extent) : currentMap.response.map._params.extent;

			//		app.map.setExtent(currentExtent || resetExtent).then(function(){
			//			app.map.infoWindow.reposition();
			//		});
			//		currentMap.mapCommand.currentHomeExtent = resetExtent;

			//		if ( actionChangePopup )
			//			app.map.infoWindow.hide();
			//		// A popup was displayed: the action would have cleared it => restore it (or continue to show the actual)
			//		//else if ( popupDisplayed )
			//			//app.map.infoWindow.show(app.map.infoWindow.features);

			//		// If action define layers: reset to the section default
			//		if ( actionChangeLayers ) {
			//			var mapDefault = currentMap.response.itemInfo.itemData.operationalLayers,
			//				sectionDefault = currentMedia.webmap.layers || [];

			//			// Loop through webmap layers and set the visibility
			//			// The visibility is set to the section definition when defined or to the webmap initial visibility
			//			$.each(mapDefault, function(i, layer){
			//				var layerObject = layer.layerObject || (layer.featureCollection ? layer.featureCollection.layers[0].layerObject : null),
			//					override = $(sectionDefault).filter(function(i, l){ return l.id == layerObject.id; });
			//				layerObject.setVisibility(override.length ? override[0].visibility : layer.visibility);
			//			});
			//		}
			//	}
			//	// Was on a webmap and action is not a webmap or different webmap
			//	// Show back the webmap
			//	else if ( currentMediaIsWebmap ) {
			//		topic.publish("ADDEDIT_SHOW_WEBMAP", currentWebmapId);
			//	}
			//	else
			//		topic.publish("story-perform-action-media", app.data.getCurrentSection().media);

		}

		function handleZoomAction(zoomAction, currentMedia, backBtnWasVisible, link) {
			var currentMediaIsWebmap = currentMedia && currentMedia.type == "webmap",
				currentExtent = currentMediaIsWebmap ? new Extent(app.map.extent.toJson()) : null;

			if (!currentMediaIsWebmap) {
				return;
			}

			app.ui.mainStage.updateMainMediaWithStoryMainMedia(app.data.getCurrentEntryIndex(), false);
			var pointLayer = findOrCreateLocateLayer(zoomAction);
			var zoomPoint = new Point(zoomAction.center);
			if (zoomAction.mapMarker) {
				var pms = new PictureMarkerSymbol(app.cfg.SECTION_ACTION_ZOOM_MAP_MARKER, 32, 32);
				pointLayer.add(new Graphic(zoomPoint, pms));
			}

			var zoomLevel = (app.map.getLevel() != zoomAction.level) ? zoomAction.level : null;
			var preflightAdjustedCenter = adjustZoomCenterPreflight(zoomAction);
			if (preflightAdjustedCenter) {
				app.map.centerAndZoom(preflightAdjustedCenter, zoomLevel);
			} else {
				app.map.centerAndZoom(zoomAction.center, zoomLevel).then(lang.partial(adjustZoomCenterPost, zoomPoint));
			}
			showBackBtn();

			if (!backBtnWasVisible) {
				$('.backButton').off('click').click(lang.partial(
					backBtnCb,
					currentMedia,
					currentExtent,
					link
				));
			}
			switchToMobileDesc();
		}

		// Add a marker layer, if configured
		function findOrCreateLocateLayer() {
			var pointLayer = app.map.getLayer("MJActionsLocate");

			if (!pointLayer) {
				pointLayer = new GraphicsLayer({
					id: "MJActionsLocate"
				});
				app.map.addLayer(pointLayer);
			}

			return pointLayer;
		}

		function adjustZoomCenterPreflight(zoomAction) {
			// don't adjust the center now, don't adjust it later
			if (!shouldAdjustMapCenter()) {
				return zoomAction.center;
			}

			var mapTileInfo = app.map.__tileInfo;
			var targetLOD = mapTileInfo && mapTileInfo._levelToLOD && mapTileInfo._levelToLOD[zoomAction.level];

			// couldn't find the right LODs for the zoomAction's set level/center
			// return false here so we can try again after centerAndZoom
			if (!targetLOD || !targetLOD.resolution) {
				return false;
			}

			// panel adjustment tells us how many screen pixels to move to take the panel into consideration
			// center adjustment translates the screen pixels to map units.
			var panelAdjustment = getCenterWidthAdjustment();
			var centerAdjustment = panelAdjustment * targetLOD.resolution;

			return {
				x: zoomAction.center.x + centerAdjustment,
				y: zoomAction.center.y,
				spatialReference: zoomAction.center.spatialReference
			};

		}

		function adjustZoomCenterPost(originalCenter) {
			if (!shouldAdjustMapCenter()) {
				return;
			}

			var graphicToScreen = app.map.toScreen(originalCenter);

			var widthAdjustment = getCenterWidthAdjustment();

			var adjustedScreenPoint = new ScreenPoint(graphicToScreen.x + widthAdjustment, graphicToScreen.y);
			var adjustedMapPoint = app.map.toMap(adjustedScreenPoint);

			app.map.centerAt(adjustedMapPoint);
		}

		function shouldAdjustMapCenter() {
			// the panel is allowed to overlap the map. don't adjust the center.
			if (WebApplicationData.getPanelMapOverlap()) {
				return false;
			}
			var isPanelLeft = $('body').hasClass('layout-tab-left') || $('body').hasClass('layout-bullet-left'),
				isPanelRight = $('body').hasClass('layout-tab-right') || $('body').hasClass('layout-bullet-right');

			if (!isPanelLeft && !isPanelRight) {
				return false;
			}

			return true;

		}

		// only use this function when you know you need to adjust the center (call shouldAdjustMapCenter first).
		function getCenterWidthAdjustment() {
			var isPanelLeft = $('body').hasClass('layout-tab-left') || $('body').hasClass('layout-bullet-left');

			var widthAdjustment = $('#descLegendPanel').width() / 2;
			var direction = isPanelLeft ? -1 : 1;

			return widthAdjustment * direction;

		}

		return {
			prepareEditorContent: prepareEditorContent,
			createMainMediaActionLink: createMainMediaActionLink,
			createMediaFullScreenButton: createMediaFullScreenButton,
			createMainStageFocusButton: createMainStageFocusButton,
			performAction: performAction,
			styleSectionPanelContent: styleSectionPanelContent,
			prepareContentIframe: prepareContentIframe,
			loadContentIframe: loadContentIframe
		};
	}
);