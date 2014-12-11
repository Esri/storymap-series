define(["lib-build/tpl!./DescriptionAndLegendPanelEntry",
		"lib-build/css!./DescriptionAndLegendPanel",
		"lib-build/css!./Common",
		"../../core/WebApplicationData",
		"../StoryText",
		"storymaps/common/utils/CommonHelper"
	], 
	function(
		viewEntryTpl,
		viewCss,
		commonCss,
		WebApplicationData,
		StoryText,
		CommonHelper
	){		
		return function DescriptionAndLegendPanel(container, isInBuilder)
		{
			var _entries = null,
				_entryIndex = null,
				_layoutOptions = null,
				_inlineEditor = null;
			
			// Load builder dependencies
			if ( isInBuilder ) {
				require(["storymaps/tpl/builder/InlineEditor"], function(InlineEditor){
					_inlineEditor = new InlineEditor();
				});
			}

			this.init = function(entries, entryIndex, layoutOptions, colors, entryLayoutCfg)
			{
				_entries = entries;
				_entryIndex = null;
				
				render();
				this.update(layoutOptions, colors, entryLayoutCfg);
				this.showEntryIndex(entryIndex, false, entryLayoutCfg);
				
				isInBuilder && initBuilder();
			};
			
			this.update = function(layoutOptions, colors, entryLayoutCfg)
			{
				_layoutOptions = layoutOptions;
				setLayout(entryLayoutCfg);
				setColor(colors);
			};
			
			this.resize = function(cfg)
			{
				var parentHeight = cfg ? cfg.height : container.parent().outerHeight();
				container.toggleClass("no-radius", container.outerHeight() >= parentHeight);
			};
			
			this.showEntryIndex = function(index, forceDisplay, entryLayoutCfg)
			{
				//if ( ! container.is(':visible') )
					//return;
				
				if ( _entryIndex != index || forceDisplay ){
					// Unload active frame in viewer
					unloadActiveIframe(container.find('.entry.active'));
					
					// Show potential iframe not loaded yet
					StoryText.loadContentIframe(container.find('.entry').eq(index));
					
					// Description
					container.find('.entry').removeClass('active');
					container.find('.entry').eq(index).addClass('active');
					
					if ( isInBuilder ) {
						if ( ! container.find(".entry.active .cke_editor_descriptionEditor").length )
							_inlineEditor.init(container.find(".entry.active"));
					}
					
					// Legend
					container.find('.legendWrapper').removeClass('active');
					if ( entryLayoutCfg.legend ) {
						var legendId = _entries[index].media[_entries[index].media.type].id;
						container.find('.legendWrapper[data-webmap=' + legendId + ']').addClass('active');
					}
					
					_entryIndex = index;
					
					setLayout(entryLayoutCfg);
					
					container.toggleClass("hasDescription", !! (_layoutOptions.description && entryLayoutCfg.description));
					container.toggleClass("hasLegend", !! entryLayoutCfg.legend);
					
					this.resize();

					// TODO (legend often takes a bit to display)
					setTimeout(function(){ container[0].scrollTop = 0; }, 0);
					setTimeout(function(){ container[0].scrollTop = 0; }, 100);
					setTimeout(function(){ container[0].scrollTop = 0; }, 200);
				}
			};
			
			this.getEntryIndex = function()
			{
				return _entryIndex;
			};

			this.destroy = function()
			{
				container.hide();
				container.find('.descriptions, .legends').hide();
				_entries = null;
				_entryIndex = null;
			};
			
			this.getLegendContainer = function(id)
			{
				return container.find('.legendWrapper[data-webmap=' + id + ']');
			};
			
			/*
			 * Entries rendering
			 */
			
			/* jshint -W069 */
			function render()
			{				
				var contentHTML = "";
				
				$.each(_entries, function(i, entry) {
					contentHTML += viewEntryTpl({
						isInBuilder: app.isInBuilder,
						optHtmlClass: entry["status"] != "PUBLISHED" ? "hidden-entry" : "",
						description: entry["description"] || "",
						editorPlaceholder: app.isInBuilder ? i18n.builder.textEditor.placeholder1 + " " + i18n.builder.textEditor.placeholder2 : ""
					}); 
					
					// Legend
					if ( entry.media.type == "webmap" ) {
						if ( ! container.find('.legendWrapper[data-webmap=' + entry.media.webmap.id + ']').length )
							container.find('.legends').append('<div class="legendWrapper" data-webmap="' + entry.media.webmap.id + '"></div>');
					}
				});
				
				if ( ! app.isInBuilder )
					container.find('.descriptions').html(StoryText.prepareContentIframe(contentHTML));
				else
					container.find('.descriptions').html(contentHTML);
			}
			
			function setLayout(entryLayoutCfg)
			{
				// Panel visibility depend on layout and entry configuration 
				container.toggle(
					! app.isInitializing 
					&& ( entryLayoutCfg.description || entryLayoutCfg.legend )
				);
				
				container.find('.descriptions').toggle(_layoutOptions.description);
				container.css("width", _layoutOptions.panel.sizeVal);
			}
			
			function unloadActiveIframe(container)
			{
				var activeSectionIFrame = container.find('iframe[data-unload=true]');
				if ( activeSectionIFrame.length ) {
					setTimeout(function(){
						activeSectionIFrame.each(function(i, frame){
							var $frame = $(frame);
							$frame.attr('src', '');
						});
					}, 150);
				}
			}
			
			function setColor(colors)
			{
				container.css({
					color: colors.text
				});
				
				container.find('.backdrop').css({
					backgroundColor: colors.panel
				});
				
				CommonHelper.addCSSRule(
					".descLegendPanel::-webkit-scrollbar-thumb { background-color:" + colors.header + "; }"
					+ ".descLegendPanel::-webkit-scrollbar-track { background-color:" + colors.panel + "; }",
					"DescLegendPanelScrollbar"
				);
			}
			
			
			/*
			 * Builder
			 */
			
			function initBuilder()
			{
				//
			}
		};
	}
);