define(["lib-build/tpl!./AccordionPanelEntry",
		"lib-build/css!./AccordionPanel",
		"lib-build/css!./Common",
		"../StoryText",
		"storymaps/common/utils/CommonHelper",
		"dojo/topic"
	],
	function(
		viewEntryTpl,
		viewCss,
		commonCss,
		StoryText,
		CommonHelper,
		topic
	){
		return function AccordionPanel(container, isInBuilder, navigationCallback)
		{
			var _this = this,
				_entryIndex = null,
				_inlineEditor = null;

			// Load builder dependencies
			if ( isInBuilder ) {
				require(["storymaps/tpl/builder/InlineEditor"], function(InlineEditor){
					_inlineEditor = new InlineEditor();
				});
			}

			this.init = function(entries, entryIndex, layoutOptions, colors)
			{
				_entryIndex = null;

				setLayout(layoutOptions);
				setColor(colors);

				initEvents();
				isInBuilder && initBuilder();

				render(entries, layoutOptions);

				this.showEntryIndex(entryIndex, false, true);
			};

			this.update = function(layoutOptions, colors)
			{
				setLayout(layoutOptions);
				setColor(colors);
			};

			this.resize = function()
			{
				setAccordionContentHeight();
			};

			this.showEntryIndex = function(index, forceDisplay, noSliding)
			{
				//if ( ! container.is(':visible') )
					//return;

				if ( _entryIndex != index || forceDisplay ){
					// Unload active frame in viewer
					unloadActiveIframe(container.find('.entry.active'));

					// Show potential iframe not loaded yet
					StoryText.loadContentIframe(container.find('.entry').eq(index));

					var oldActiveEntry = container.find(".entry.active"),
						newActiveEntry = container.find(".entry").eq(index);

					oldActiveEntry.removeClass('active');
					if ( ! noSliding )
						oldActiveEntry.find(".accordion-content").slideUp();
					else
						oldActiveEntry.hide();

					newActiveEntry.addClass("active");
					if ( ! noSliding )
						newActiveEntry.find(".accordion-content").slideDown({
							complete: possiblyScrollAfterSlideDown
						});
					else
						newActiveEntry.find(".accordion-content").show({
							complete: possiblyScrollAfterSlideDown
						});

					/*
					if($(this).hasClass("active") && $("#application-window").width() <= 780 && $(this).next().height() > 20){
						$("#side-pane").slideUp();
					}
					*/

					if ( isInBuilder ) {
						// Create the editor if not already created
						if ( ! container.find(".entry.active .cke_editor_descriptionEditor").length )
							_inlineEditor.init(container.find(".entry.active"));
					}


					_entryIndex = index;
				}
			};

			function possiblyScrollAfterSlideDown() {
				var activeEntry = container.find('.entry.active');
				if (!activeEntry.length) {
					return;
				}

				var activeElRect = activeEntry[0].getBoundingClientRect();

				var entryParent = activeEntry.parent();
				var panelTop = entryParent[0].getBoundingClientRect().top;
				var parentScrollTopBase = entryParent.scrollTop() - panelTop;

				var offScreenBottom = activeElRect.bottom > $('body').height() + 5;
				var offScreenTop = (activeElRect.top < panelTop - 5) || (offScreenBottom && activeElRect.height > entryParent.height());
				var newScrollTop = null;

				if (offScreenTop) {
					newScrollTop = parentScrollTopBase + activeElRect.top;
				} else if (offScreenBottom) {
					newScrollTop = parentScrollTopBase + activeElRect.bottom - entryParent.height() + 10;
				}
				if (newScrollTop !== null) {
					entryParent.animate({scrollTop: newScrollTop});
				}
			}

			this.getEntryIndex = function()
			{
				return _entryIndex;
			};

			this.destroy = function()
			{
				container.hide();
			};

			/*
			 * Entries rendering
			 */

			/* jshint -W069 */
			function render(entries, layoutOptions)
			{
				var nbEntries = entries.length,
					contentHTML = "";

				$.each(entries, function(i, entry) {
					var index = layoutOptions.reverse ? nbEntries - i : i + 1;

					contentHTML += viewEntryTpl({
						index: index,
						title: entry["title"],
						description: entry["description"],
						optHtmlClass: entry["status"] != "PUBLISHED" ? "hidden-entry" : "",
						isInBuilder: app.isInBuilder,
						lblMainstageBtn: i18n.viewer.common.focusMainstage,
						editorPlaceholder: app.isInBuilder ? i18n.builder.textEditor.placeholder1 : ""
					});
				});
				if ( ! app.isInBuilder )
					container.find('.content').html(
						StoryText.prepareContentIframe(
							StoryText.prepareEditorContent(contentHTML)
						)
					);
				else
					container.find('.content').html(contentHTML);

				container.find(".accordion-header").click(onEntryClick);

				var accordionHeaders = container.find('.accordion-header-content');

				// Fire a click event when focusing through keyboard and prevent double event when clicking with mouse
				accordionHeaders
					.focus(function(){
						if (!$(this).data("mouseDown"))
							$(this).click();
					})
					.mousedown(function(){
						$(this).data("mouseDown", true);
					})
					.mouseup(function(){
						$(this).removeData("mouseDown");
					});
			}

			function setLayout(layoutOptions)
			{
				container.css("width", layoutOptions.panel.sizeVal);
				container.toggleClass("is-numbered", !! layoutOptions.numbering);
			}

			function setAccordionContentHeight()
			{
				var containerHeight = container.outerHeight(),
					contentHeight = 0;

				container.find(".accordion-header").each(function(){
					contentHeight += $(this).outerHeight() + 1;
				});

				if ( isInBuilder )
					contentHeight += container.find(".builder-content-panel").outerHeight();

				// If not enough space to have the accordion effect
				if ( containerHeight - contentHeight < 120 )
					container.find(".accordion-content")
						.css("height", "")
						.css("max-height", containerHeight / 1.5);
				else
					container.find(".accordion-content")
						.css("height", containerHeight - contentHeight)
						.css("max-height", "");

				if ( isInBuilder ) {
					container.find(".content").css(
						"height",
						container.height() - container.find(".builder-content-panel").outerHeight()
					);
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
					color: colors.text,
					backgroundColor: colors.panel
				});

				CommonHelper.addCSSRule(
					".accordionPanel .accordion-header-arrow { border-left-color: " + colors.accordionArrow  + "; }"
					+ ".accordionPanel .entry.active .accordion-header-arrow { border-left-color: " + colors.accordionArrowActive  + "; }"
					+ ".accordionPanel .entry:not(.active) .accordion-header:hover .accordion-header-arrow { border-left-color: " + colors.accordionArrowHover  + "; }"
					+ ".accordionPanel .entry { border-top: 1px solid " + colors.accordionArrow  + "; }",
					"AccordionColorArrow"
				);

				CommonHelper.addCSSRule(
					".accordionPanel .accordion-header-number { color: " + colors.accordionNumber  + "; }",
					"AccordionColorNumber"
				);

				CommonHelper.addCSSRule(
					".accordionPanel .accordion-header-title { color: " + colors.accordionTitle  + "; }",
					"AccordionColorTitle"
				);

				CommonHelper.addCSSRule(
					".accordionPanel ::-webkit-scrollbar-thumb { background-color:" + colors.header + "; }",
					"AccordionScrollbar"
				);
			}

			/*
			 * Story navigation
			 */

			function onEntryClick(e)
			{
				if ( $(e.target).hasClass("panelEditBtnInner") ) {
					app.builder.openEditPopup({
						entryIndex: _this.getEntryIndex()
					});
				}
				else if ($(this).parents('.entry.active').length) {
					return;
				} else {
					navigationCallback($(this).parents('.entry').index());
				}
			}

			this.focus = function(index) {
				if (index !== undefined) {
					var entryHeader = $('.entry .accordion-header-content').eq(0).focus();
					if (!entryHeader.parents('.entry.active').length) {
						topic.publish('story-navigate-entry', index);
					}
				} else {
					$('.entry.active .accordion-header-content').focus();
				}
			};

			/*
			 * Builder
			 */

			function initBuilder()
			{
				//
			}

			/*
			 * Init events
			 * Performed once at component creation
			 */

			function initEvents()
			{
				//
			}
		};
	}
);