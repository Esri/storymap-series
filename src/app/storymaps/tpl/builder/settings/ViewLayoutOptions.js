define(["lib-build/tpl!./ViewLayoutOptions",
		"lib-build/css!./ViewLayoutOptions",
		"dojo/topic", 
		"../../core/WebApplicationData"
	],
	function (
		viewTpl,
		viewCss,
		topic, 
		WebApplicationData
	){
		return function ViewLayoutOptions() 
		{			
			var _this = this,
				_titleContainer = null,
				_contentContainer = null,
				_layout = null,
				_theme = null;
			
			this.init = function(titleContainer, contentContainer)
			{
				_titleContainer = titleContainer;
				_contentContainer = contentContainer;
				
				_contentContainer.append(viewTpl({
					// Description
					lblDescription: i18n.builder.settingsLayoutOptions.lblDescription,
					// Legend
					lblLegend: i18n.builder.settingsLayoutOptions.lblLegend,
					tooltipLegend: i18n.builder.settingsLayoutOptions.tooltipLegend,
					lblDropdown: i18n.builder.settingsLayoutOptions.lblDropdown,
					// Panel
					cfgLeft: i18n.builder.settingsLayoutOptions.cfgLeft,
					cfgRight: i18n.builder.settingsLayoutOptions.cfgRight,
					cfgSmall: i18n.builder.settingsLayoutOptions.cfgSmall,
					cfgMedium: i18n.builder.settingsLayoutOptions.cfgMedium,
					cfgLarge: i18n.builder.settingsLayoutOptions.cfgLarge,
					// Extras
					lblNumbering: i18n.builder.settingsLayoutOptions.lblNumbering,
					lblReverse: i18n.builder.settingsLayoutOptions.lblReverse
				}));
				
				initEvents();
			};
			
			this.present = function(settings) 
			{	
				_layout = WebApplicationData.getLayoutId();
				_theme = WebApplicationData.getTheme();
				
				settings = settings || {};
				
				// Legend for Accordion
				_contentContainer.find('.opt-checkbox-legend').prop('checked', settings.legend == "dropdown");
				
				// Legend/description for Tab/Bullet
				_contentContainer.find('.opt-checkbox-description').prop('checked', settings.description === true);
				var targetOption = ["panel", "dropdown"].indexOf(settings.legend);
				_contentContainer.find('input[name=optionsLegend]').eq(targetOption > 0 ? targetOption : 0).click();
				
				// Panel
				var targetPosition = settings.panel ? settings.panel.position : "left",
					targetSize = settings.panel ? settings.panel.sizeLbl : "medium";
				_contentContainer.find('.btn-position .btn[data-value="' + targetPosition + '"]').click();
				_contentContainer.find('.btn-size .btn[data-value="' + targetSize + '"]').click();
				
				// Numbering
				_contentContainer.find('.opt-checkbox-numbering').prop('checked', settings.numbering === undefined || settings.numbering === true);
				
				// Reverse
				_contentContainer.find('.opt-checkbox-reverse').prop('checked', settings.reverse === true);
				
				// Panel/Map overlap
				_contentContainer.find('.opt-checkbox-overlap').prop('checked', settings.panelMapOverlap === true);
				
				updateUI();
			};
			
			this.show = function()
			{
				//
			};
			
			this.save = function()
			{			
				var data = {};
				
				// Description 
				if ( isVisible(_contentContainer.find('.opt-description-container')) )
					data.description = _contentContainer.find('.opt-checkbox-description').prop('checked');
				else
					data.description = true;
				
				// Legend
				if ( isVisible(_contentContainer.find('.opt-legend-container')) )
					data.legend = _contentContainer.find("input[name=optionsLegend]:checked").val();
				else {
					if ( _layout == "accordion" )
						data.legend = "dropdown";
					else
						data.legend = "panel";
				}
				
				// Panel
				if ( ! _contentContainer.find('.opt-panel-container').hasClass("disabled") ) {
					data.panel = {
						position: _contentContainer.find('.btn-position .btn-primary').data('value'),
						size: _contentContainer.find('.btn-size .btn-primary').data('value')
					};
				}
				
				// Numbering
				if ( isVisible(_contentContainer.find('.opt-numbering-container')) )
					data.numbering = _contentContainer.find('.opt-checkbox-numbering').prop('checked');
				
				// Reverse
				if ( isVisible(_contentContainer.find('.opt-reverse-container')) )
					data.reverse = _contentContainer.find('.opt-checkbox-reverse').prop('checked');
				
				// Panel/Map overlap
				var panelMapOverlapContainer = _contentContainer.find('.opt-panel-map-overlap-container');
				if ( isVisible(panelMapOverlapContainer) )
					data.panelMapOverlap = ! panelMapOverlapContainer.hasClass("disabled") 
						&& _contentContainer.find('.opt-checkbox-overlap').prop('checked');
				
				return data;
			};
			
			function updateUI()
			{
				if ( ! _layout || ! _theme )
					return;
				
				var layoutIsAccordion = _layout == "accordion",
					layoutIsTab = _layout == "tab",
					layoutIsBullet = _layout == "bullet",
					descriptionIsCheched = _contentContainer.find('.opt-checkbox-description').prop('checked'),
					legendAsPanel = _contentContainer.find("input[name=optionsLegend]:checked").val() == "panel";
				
				_contentContainer.find(".settings-layoutoptions").attr("data-layout", _layout);
				
				// Description
				_contentContainer.find('.opt-description-container').toggle(! layoutIsAccordion);
				
				// Legend
				_contentContainer.find('.opt-legend-container').toggle(layoutIsTab);
				
				// Legend naming of first option
				_contentContainer.find("input[name=optionsLegend]").eq(0).siblings().html(
					descriptionIsCheched
						? i18n.builder.settingsLayoutOptions.lblBelowDesc
						: i18n.builder.settingsLayoutOptions.lblOnPanel
				);
				
				// Panel
				var hasNoPanel = ! layoutIsAccordion 
						&& ! _contentContainer.find('.opt-checkbox-description').prop('checked')
						&& _contentContainer.find("input[name=optionsLegend]:checked").val() != "panel";
				
				_contentContainer.find('.opt-panel-container').toggleClass("disabled", hasNoPanel);
				// Panel lbl
				var targetPanelLbl = i18n.builder.settingsLayoutOptions.lblPanelAccordion;
				if ( _layout != "accordion" ) {
					if ( descriptionIsCheched && legendAsPanel )
						targetPanelLbl = i18n.builder.settingsLayoutOptions.lblPanelDescAndLegend;
					else if ( descriptionIsCheched )
						targetPanelLbl = i18n.builder.settingsLayoutOptions.lblPanelDesc;
					else if ( legendAsPanel )
						targetPanelLbl = i18n.builder.settingsLayoutOptions.lblPanelLegend;
					else
						targetPanelLbl = i18n.builder.settingsLayoutOptions.lblPanelDescAndOrLegend;
				}
				_contentContainer.find('.opt-panel-container-lbl').html(targetPanelLbl);
				
				// Extras
				_contentContainer.find('.opt-extras-container').toggle(layoutIsAccordion || layoutIsBullet);
				_contentContainer.find('.opt-numbering-container').toggle(layoutIsAccordion);
				_contentContainer.find('.opt-reverse-container').toggle(layoutIsAccordion || layoutIsBullet);
				_contentContainer.find('.opt-reverse-container').toggleClass(
					"disabled", 
					_layout == "accordion" && ! _contentContainer.find('.opt-checkbox-numbering').is(":checked")
				);
				
				// Panel/Map overlap
				_contentContainer.find('.opt-panel-map-overlap-container')
					.toggle(layoutIsTab || layoutIsBullet)
					.toggleClass("disabled", hasNoPanel);
				
				_contentContainer.find('.lbl-checkbox-overlap').html(targetPanelLbl + " " + i18n.builder.settingsLayoutOptions.canOverlapMap);
				
				// Preview
				_contentContainer.find(".preview").html(app.appCfg.getLayoutThumbnail({ 
					layout: _layout,
					options: _this.save(),
					theme: _theme.colors,
					contentLabel: true
				}));
			}
			
			function onPanelToggleChange()
			{
				$(this).siblings().removeClass('btn-primary');
				$(this).addClass('btn-primary');
				updateUIAndPublish();
			}
			
			function updateUIAndPublish()
			{
				updateUI();
				topic.publish("SETTINGS_LAYOUT_OPTIONS_CHANGE", { layoutCfg: _this.save() });
			}
			
			function isVisible(container)
			{
				// Can't use is(":visible") has the tab may not be active when saving!
				return container.css("display") == "block";
			}
			
			function initEvents()
			{
				/*
				 * Listen to layout change to update the options
				 */
				topic.subscribe("SETTINGS_LAYOUT_CHANGE", function(layout){
					// As the default legend placement of accordion is as dropdown
					//  and the default for tab and bullet is panel
					if ( _layout == "accordion" && layout != "accordion" )
						_contentContainer.find('input[name=optionsLegend]').eq(0).click();
					
					_layout = layout;
					updateUI();
				});
				
				/*
				 * Listen to theme change to update the preview
				 */
				topic.subscribe("SETTINGS_THEME_CHANGE", function(theme){
					_theme = theme;
					updateUI();
				});
				
				// Description checkbox
				_contentContainer.find(".opt-checkbox-description").change(updateUIAndPublish);
				
				// Legend options
				_contentContainer.find("input[name=optionsLegend]").change(updateUIAndPublish);
				
				/*
				 * Panel toggles
				 */
				_contentContainer.find('.btn-position .btn').click(onPanelToggleChange);
				_contentContainer.find('.btn-size .btn').click(onPanelToggleChange);
				
				// Accordion numbering
				_contentContainer.find('.opt-checkbox-numbering').click(updateUIAndPublish);
				
				// Bullet reverse numbering
				_contentContainer.find('.opt-checkbox-reverse').click(updateUIAndPublish);
				
				// Help tooltips
				_contentContainer.find('.help').tooltip({
					trigger: 'hover'
				});
				
				_contentContainer.find('.debug').click(function(){
					console.log(_this.save());
				});
			}
			
			this.initLocalization = function()
			{
				_titleContainer.html(i18n.builder.settingsLayoutOptions.title);
			};
		};
	}
);