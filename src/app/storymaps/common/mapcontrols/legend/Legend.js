define(["lib-build/tpl!./Legend",
        "lib-build/css!./Legend",
        "lib-build/css!../Common",
        "storymaps/common/utils/CommonHelper",
        "esri/dijit/Legend",
        "esri/arcgis/utils",
        "dojo/topic"
    ],
	function (viewTpl, viewCss, commonCss, CommonHelper, LegendDijit, arcgisUtils, topic) {
		return function Legend(response, isInBuilder, placementSettings)
		{
			var _this = this,
				_legend = null,
				_settings = null,
				_container = placementSettings.container;

			var tplStrings = {
				isInBuilder: isInBuilder,
				title: i18n.viewer.mapFromCommon.legend
			};

			if ( isInBuilder ) {
				tplStrings.settings = i18n.commonMapControls.common.settings;
				tplStrings.openDefault = i18n.commonMapControls.common.openDefault;
			}

			_container.html(viewTpl(tplStrings));

			this.toggle = function(activate)
			{
				_container.toggle(!!activate);

				if ( activate && ! _legend )
					display();
				else if ( ! activate )
					destroy();
			};

			this.toggleExpanded = function(expanded)
			{
				_container.find('.legendContainer').toggleClass("collapsed", ! expanded);
			};

			this.setColors = function(appColors)
			{
				_container.find(".legendContainer").css({
					// TODO need to remap color before passign them to components...
					backgroundColor: appColors.mapControls,
					color: appColors.text
				});

				_container.find(".titleBtn").css("color", appColors.softText);
				_container.find(".settingsGear, .collapseBtn").css("color", appColors.softBtn);

				CommonHelper.addCSSRule(
					".mainMediaContainer .legendContainer ::-webkit-scrollbar-thumb { background-color:" + appColors.header + "; }",
					"MapControlLegendDropdownScrollbar"
				);
			};

			this.updatePlacementSettings = function(newSettings)
			{
				// Toggle inline mode
				_container.find(".legendContainer").toggleClass("isInlined", newSettings.mode == "panel");

				// Update the _container
				if ( newSettings.container[0] != _container[0] ) {
					newSettings.container.html(_container.find('.legendContainer'));
					_container = newSettings.container;
				}
			};

			function display()
			{
				_container.find('.legendDijitContainer').html('<div class="legendDijit"></div>');
				_legend = new LegendDijit({
					map: response.map,
					layerInfos: arcgisUtils.getLegendLayers(response)
				}, _container.find('.legendDijit')[0]);
				_legend.startup();
				topic.publish('story-created-legend', response.itemInfo.item.id);
			}

			function destroy()
			{
				if ( _legend )
					_legend.destroy();
				_legend = null;
			}

			function toggleMinimizedState()
			{
				_container.find('.legendContainer').toggleClass("collapsed");
				_container.find('.settingsOverlay').hide();
			}

			function init()
			{
				_container.find(".titleBtn").click(toggleMinimizedState);
				_container.find(".settingsGear").click(function() {
					if ( ! _container.find(".settingsOverlay").is(":visible") ) {
						_container.mouseleave(function(){
							_container.find(".settingsOverlay").toggle();
							_container.off('mouseleave');
							_container.find(".content").removeClass("settingsOpen");
						});
					}
					else
						_container.off('mouseleave');

					_container.find(".settingsOverlay").toggle();
					_container.find(".content").toggleClass("settingsOpen");
				});

				_container.find('.expandStartup').change(onSettingsChange);

				_this.updatePlacementSettings(placementSettings);
			}

			//
			// Builder
			//

			this.setSettings = function(settings)
			{
				_settings = settings;
				_container.find('.expandStartup').prop('checked', _settings.openByDefault);
			};

			function onSettingsChange()
			{
				_settings.openByDefault = _container.find('.expandStartup').prop('checked');
				topic.publish("BUILDER_INCREMENT_COUNTER", 1);
			}

			init();
		};
	}
);
