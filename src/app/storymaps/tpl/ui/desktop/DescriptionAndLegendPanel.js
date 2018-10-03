define(["lib-build/tpl!./DescriptionAndLegendPanelEntry",
		"lib-build/css!./DescriptionAndLegendPanel",
		"lib-build/css!./Common",
		"../../core/WebApplicationData",
		"../StoryText",
		"storymaps/common/utils/CommonHelper",
		"dojo/topic"
	],
	function(
		viewEntryTpl,
		viewCss,
		commonCss,
		WebApplicationData,
		StoryText,
		CommonHelper,
		topic
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

				render.bind(this)();
				this.update(layoutOptions, colors, entryLayoutCfg);
				this.showEntryIndex(entryIndex, false, entryLayoutCfg);

				container.on('keydown', function(e) {
					if( e.keyCode === 9 ) {
						var focusElem = $(':focus');

						if ( focusElem ) {
							var allFocusables = container.find('.entry.active').find(app.appCfg.focusable).filter(':visible'); // add :visible in case some of the .btn-fullscreens are inexplicably hidden
							var focusElemIndex = allFocusables.index(focusElem);
							if ((focusElemIndex === 0 && e.shiftKey) || (focusElemIndex === allFocusables.length - 1 && !e.shiftKey)) {
								topic.publish("story-tab-navigation", {
									from: "panel",
									direction: e.shiftKey ? "backward" : "forward"
								});
								return false;
							}
						}
					}
				});

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
					container.toggleClass("hasLegend", !! (entryLayoutCfg.legend && _layoutOptions.legend == "panel"));

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

			this.getOrCreateLegendContainer = function(id)
			{
				var legendWrapper = container.find('.legendWrapper[data-webmap=' + id + ']');
				if (!legendWrapper.length) {
					legendWrapper = $('<div class="legendWrapper" data-webmap="' + id + '"></div>');
					container.find('.legends').append(legendWrapper);
				}
				return legendWrapper;
			};

			this.focus = function()
			{
				// either focus the panel or send focus back to the tab/bullet for this section
				if (container.hasClass('hasDescription')) {
					container.find('.entry.active .entry-inner .focus-mainstage').eq(0).focus();
				} else {
					$('li.entry.active button.entryLbl').focus();
				}
			};

			/*
			 * Entries rendering
			 */

			/* jshint -W069 */
			function render()
			{
				var contentHTML = "";
				// combat the .hide on the destroy function above. useful when
				// changing layouts in builder
				container.find('.legends').show();
				var self = this;

				$.each(_entries, function(i, entry) {
					contentHTML += viewEntryTpl({
						isInBuilder: app.isInBuilder,
						optHtmlClass: entry["status"] != "PUBLISHED" ? "hidden-entry" : "",
						description: entry["description"] || "",
						lblMainstageBtn: i18n.viewer.common.focusMainstage,
						editorPlaceholder: app.isInBuilder ? i18n.builder.textEditor.placeholder1 + " " + i18n.builder.textEditor.placeholder2 : ""
					});

					// Legend
					if ( entry.media.type == "webmap" ) {
						self.getOrCreateLegendContainer(entry.media.webmap.id);
					}
				});

				if ( ! app.isInBuilder )
					container.find('.descriptions').html(
						StoryText.prepareContentIframe(
							StoryText.prepareEditorContent(contentHTML)
						)
					);
				else
					container.find('.descriptions').html(contentHTML);
			}

			function setLayout(entryLayoutCfg)
			{
				// Panel visibility depend on layout and entry configuration
				var panelIsVisible = ! app.isInitializing  && (entryLayoutCfg.description || (entryLayoutCfg.legend && _layoutOptions.legend == "panel"));
				container.toggle(panelIsVisible);

				container.find('.descriptions').toggle(_layoutOptions.description);
				container.css("width", _layoutOptions.panel.sizeVal);

				container.removeClass("bullet-embed");
				if ( $("body").hasClass("layout-bullet") ) {
					var currentEntry = app.data.getCurrentEntry();
					if ( currentEntry && currentEntry.media && (currentEntry.media.type == "video" || currentEntry.media.type == "webpage") ) {
						container.addClass("bullet-embed");
					}
				}
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