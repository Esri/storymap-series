define(["lib-build/tpl!./NavBar",
        "lib-build/css!./NavBar",
        "lib-build/tpl!./NavBarEntry",
        "lib-build/tpl!./NavBarEntryMore",
        "storymaps/common/utils/CommonHelper",
        'dojo/_base/Color',
        "dojo/topic",
        "dojo/has"
	],
	function(
		viewTpl,
		viewCss,
		viewEntryTpl,
		viewEntryMoreTpl,
		CommonHelper,
		Color,
		topic,
		has
	){
		return function NavBarTab(container, isInBuilder, navigationCallback)
		{
			var _this = this,
				_entries = null,
				_entryIndex = null;

			container.html(viewTpl({}));

			this.init = function(entries, entryIndex, layout, layoutOptions, colors)
			{
				_entries = entries;
				_entryIndex = null;

				render(layout, layoutOptions, colors);
				this.showEntryIndex(entryIndex);

				initEvents();
				isInBuilder && initBuilder();
			};

			this.update = function(layout, layoutOptions, colors)
			{
				render(layout, layoutOptions, colors);
				this.showEntryIndex(_entryIndex);
			};

			this.resize = function()
			{
				container.find(".nav-tabs > li").addClass("visible");
				container.find(".nav-tabs .dropdown").removeClass("visible");
				container.find(".nav-tabs .dropdown-menu li").removeClass("visible");

				var widthCounter = 0,
					index = 0,
					displayMoreButton = false,
					entries = container.find(".nav-tabs > li:not(.dropdown)"),
					moreButtonSize = container.find("li.dropdown").outerWidth(),
					// Width - builder - marginof navBar - magic
					availableWidthForTabs = container.width() - container.find('.builder-content-panel:visible').outerWidth() - 30 - 4;

				entries.each(function() {
					index++;
					widthCounter += $(this).outerWidth();

					// If adding the button would overflow
					//  or if adding the button and the more button would overflow and there is more entries to come
					if (widthCounter > availableWidthForTabs
							|| (widthCounter + moreButtonSize > availableWidthForTabs && index < entries.length) )
					{
						displayMoreButton = true;
						$(this).removeClass("visible");
						container.find(".nav-tabs .dropdown-menu li").eq($(this).index()).addClass("visible");
					}
				});

				var activeEntry = container.find(".nav-tabs > .entry.active"),
					activeEntryDropdown = container.find(".nav-tabs .dropdown-menu li.active");

				// The active entry is not visible -> the active entry is now in the dropdown list
				if ( activeEntry.length && ! activeEntry.hasClass("visible") ) {
					activeEntry.removeClass("active");
					container.find(".nav-tabs .dropdown-menu li").eq(activeEntry.index()).addClass("active");
					container.find(".nav-tabs > .dropdown").addClass("active");
				}
				// The active entry in the dropdown is not visible -> the active entry is now visible in the main list
				else if ( activeEntryDropdown.length && ! activeEntryDropdown.hasClass("visible") ) {
					activeEntryDropdown.removeClass("active");
					container.find(".nav-tabs > .entry").eq(activeEntryDropdown.index()).addClass("active");
					container.find(".nav-tabs > .dropdown").removeClass("active");
				}

				if ( displayMoreButton )
					container.find(".nav-tabs .dropdown").addClass("visible");
			};

			this.showEntryIndex = function(index)
			{
				var nbEntryVisible = container.find('.nav-tabs > .entry.visible').length;

				container.find('li').removeClass('active');

				// The entry is visible
				if ( index < nbEntryVisible ) {
					container.find('.entry').eq(index).addClass('active');

					if ( ! app.isLoading ) {
						container.find('.entry').eq(index).find('.entryLbl').focus();
						// Close the dropdown if open
						if ( container.find('.dropdown').hasClass("open") )
							container.find('.dropdown-toggle').click();
					}
				}
				// The entry is in the more list
				else {
					container.find('.dropdown').addClass('active');
					container.find('.dropdown .entry').eq(index).addClass('active');

					if ( ! app.isLoading ) {
						// Open the dropdown if not open
						if ( ! container.find('.dropdown').hasClass("open") )
							container.find('.dropdown-toggle').click();

						// Focus on the dropdown entry
						container.find('.dropdown .entry').eq(index).focus();
					}
				}

				_entryIndex = index;
			};

			this.getEntryIndex = function()
			{
				return _entryIndex;
			};

			this.destroy = function()
			{
				container.hide();
			};

			function render(layout, layoutOptions, colors)
			{
				_entries = _entries || [];

				setLayout(layout, layoutOptions);
				setColor(colors);

				var nbEntries = _entries.length,
					entriesHTML = "";

				$.each(_entries, function(i, entry) {
					var value = entry.title;

					if ( layout == "bullet" )
						value = layoutOptions.reverse ? nbEntries - i : i + 1;

					// Can happen when switching from bullet where title isn't mandatory
					if ( ! value )
						value = isInBuilder ? ('<span style="color: red;">' + i18n.commonCore.inlineFieldEdit.editMe + '</span>') : '&nbsp;';

					// Add the entry title has hidden element for accessibility
					if ( layout == "bullet" ) {
						value += '<div style="height:0; width: 0; overflow: hidden;"><div>;</div><div>' + entry.title + '</div></div>';
					}

					entriesHTML += viewEntryTpl({
						value: value,
						tooltip: layout == "bullet" ? entry.title : "",
						optHtmlClass: entry.status != "PUBLISHED" ? "hidden-entry" : ""
					});
				});

				container.find('.nav-tabs').html(
					entriesHTML
					+ viewEntryMoreTpl({ entries: entriesHTML })
				);

				// On touch device for some reason enabling the tooltip sometimes make touching one bullet go to the following
				if ( layout == "bullet" && ! has("touch") ) {
					container.find('.nav-tabs > .entry').tooltip({
						placement: 'top',
						trigger: 'hover'
					});
					container.find('.dropdown-menu > .entry').tooltip({
						placement: 'left',
						container: '.nav-bar',
						trigger: 'hover'
					});
				}

				container.find('.entry').click(onTitleClick);

				// Tab navigation
				container.find('.entryLbl').on('keydown', function(e) {
					if( e.keyCode === 9 ) {
						topic.publish("story-tab-navigation", {
							from: "nav",
							direction: e.shiftKey ? "backward" : "forward"
						});
						return false;
					}
				});

				// Fire a click event when focusing through keyboard and prevent double event when clicking with mouse
				container.find('.entryLbl').eq(0)
					.focus(function(){
						if (!$(this).data("mouseDown") && ! $(this).parent('.entry').hasClass("active")){
							$(this).parent('.entry').click();
						}
					})
					.mousedown(function(){
						$(this).data("mouseDown", true);
					})
					.mouseup(function(){
						$(this).removeData("mouseDown");
					});

				_this.resize();
			}

			function setLayout(layout/*, layoutOptions*/)
			{
				container.find('.nav-bar')
					.toggleClass("isTab", layout == "tab")
					.toggleClass("isBullet", layout == "bullet");
			}

			function setColor(colors)
			{
				container.css('background-color', colors.header);

				// Background
				CommonHelper.addCSSRule(
					".nav-bar .nav > .entry .entryLbl, \
					.nav-bar .dropdown-toggle { \
						color: " + colors.tabText  + "; \
						background-color: " + colors.tab  + " !important; \
					}",
					"NavBarTab"
				);

				// Active entry
				CommonHelper.addCSSRule(
					".nav-bar .entry.active > .entryLbl, \
					.nav-bar .dropdown.active .dropdown-toggle { \
						color: " + colors.tabTextActive  + "; \
						background-color: " + colors.tabActive  + " !important; \
					}",
					"NavBarActive"
				);

				// Hover
				CommonHelper.addCSSRule(
					".nav-bar .dropdown:not(.active):hover .dropdown-toggle, \
					.nav-bar li:not(.active) .entryLbl:hover { \
						color: " + colors.tabTextHover  + "; \
						background-color: " + colors.tabHover  + " !important; \
					}",
					"NavBarHover"
				);

				// More list
				if (colors.name && colors.name.match(/-org$|-modified$/)) {
					var moreTransparentTabBg = new Color(colors.tab);
					moreTransparentTabBg.a = 0.55;

					CommonHelper.addCSSRule(
						".nav-bar .dropdown-menu, \
						.nav-bar .dropdown-menu .entryLbl { \
							color: " + colors.tabText  + " !important; \
							background-color: " + moreTransparentTabBg.toString()  + " !important; \
						}",
						"NavBarMore"
					);

					moreTransparentTabBg.a = 0.75;
					CommonHelper.addCSSRule(
						".nav-bar .dropdown-menu li:not(.active) .entryLbl:hover { \
							background-color: " + moreTransparentTabBg.toString()  + " !important; \
						}",
						"NavBarEvenMore"
					);
				} else {
					CommonHelper.addCSSRule(
						".nav-bar .dropdown-menu, \
						.nav-bar .dropdown-menu .entryLbl { \
							color: " + colors.tabText  + " !important; \
							background-color: " + colors.header  + " !important; \
						}",
						"NavBarMore"
					);
					CommonHelper.addCSSRule(
						"",
						"NavBarEvenMore"
					);
				}

				// Bullet tooltip
				CommonHelper.addCSSRule(
					".nav-bar .nav-tabs > .tooltip .tooltip-arrow, \
					.nav-bar .builder-content-panel .tooltip-arrow { \
						border-top-color: " + colors.tabActive  + "; \
					} \
					.nav-bar > .tooltip .tooltip-arrow { \
						border-left-color: " + colors.tabActive  + "; \
					} \
					.nav-bar .tooltip-inner { \
						background-color: " + colors.tabActive  + "; \
						color: " + colors.tabTextActive  + "; \
					}",
					"BulletTooltip"
				);
			}

			/*
			 * Story navigation
			 */

			function onTitleClick()
			{
				var index = $(this).index();
				navigationCallback(index);
			}


			/*
			 * Builder
			 */

			function initBuilder()
			{
				container.find('.builder-content-panel').css('display', 'inline-block');

				container.find('.builder-edit')
					.off('click')
					.click(onClickEdit)
					.find(".builder-lbl").html(i18n.builder.addEditPopup.lblEdit);
			}

			function onClickEdit()
			{
				app.builder.openEditPopup({
					entryIndex: _this.getEntryIndex()
				});
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