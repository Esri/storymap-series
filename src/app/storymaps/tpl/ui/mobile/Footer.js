define(["lib-build/css!./Footer",
        "lib-build/tpl!./FooterTpl",
        "lib-build/tpl!./FooterEntryTpl",
        "storymaps/common/utils/CommonHelper",
        "dojo/has",
        "dojo/topic",
        "lib-app/swiper/idangerous.swiper",
		"lib-build/css!lib-app/swiper/idangerous.swiper"
    ], 
	function(
		viewCss,
		viewTpl,
		viewEntryTpl,
		CommonHelper,
		has,
		topic,
		Swiper
	){
		return function Footer(container, isInBuilder, navigationCallback)
		{
			var _entries = null,
				_entryIndex = null,
				_swipePane = null;
			
			/*
			 * {
			 *  entries: [],
			 *  entryIndex: 0,
			 *  colors: { }
			 * }
			 */
			this.init = function(params)
			{
				params = params || {};
				
				_entries = params.entries;
				
				render(params.entries, params.appLayout, params.layoutOpt);
				setColors(params.appColors);
			};
			
			this.update = function(params)
			{
				setColors(params.appColors);
			};
			
			this.resize = function()
			{
				_swipePane && _swipePane.resizeFix();
			};
			
			this.showEntryIndex = function(index)
			{
				if ( ! _swipePane )
					return;
				
				if ( ! container.is(':visible') )
					return;
				
				if ( _entryIndex != index ) {
					_swipePane.swipeTo(index);
					updateMouseNavButtons();
				}

				_entryIndex = index;
			};
			
			this.removeMobileInvite = function()
			{
				container.tooltip('destroy');
			};
			
			function render(entries, appLayout, layoutOpt) // TODO
			{
				var entriesHTML = "",
					entriesLength = entries.length;
				
				_entryIndex = null;
				
				$.each(entries, function(i, entry) {
					var title = entry.title,
						lblNext = i18n.viewer.mobileFooter.lblEnd;
					
					if ( i != entriesLength - 1 && entries[i+1].title )
						lblNext = i18n.viewer.mobileFooter.lblNext + ": " + entries[i+1].title;
					// Only one item in the story, don't show anything
					else if ( i === 0 )
						lblNext = "";

					if ( appLayout == "bullet" ) {
						if ( ! layoutOpt.reverse )
							title = (i+1) + (title ? " - " + title : "");
						else
							title = (entriesLength - i) + (title ? " - " + title : "");
					}

					else if ( appLayout == "accordion" ) {
						if ( ! layoutOpt.reverse && layoutOpt.numbering )
							title = (i+1) + (title ? " - " + title : "");
						else if ( layoutOpt.numbering )
							title = (entriesLength - i) + (title ? " - " + title : "");
					}

					entriesHTML += viewEntryTpl({
						title: title || '&nbsp;',
						next: lblNext,
						enableLegend: entry.media.type == "webmap",
						enableInfo: !! entry.description
					});
				});
				
				container.html(viewTpl({
					entriesHTML: entriesHTML
				}));
				
				_swipePane = new Swiper(container.find('.swiper-container')[0], {
					mode: 'horizontal',
					loop: false,
					keyboardControl: false,
					onSlideChangeEnd: function(swiper) {
						if ( _entryIndex != swiper.activeIndex )
							navigationCallback(swiper.activeIndex);
						
						updateMouseNavButtons();
						_swipePane.resizeFix();
					},
					onTouchStart: function() {
						container.tooltip('destroy');
					}
				});
				
				initEvents();
				updateMouseNavButtons();
				
				// If at first init there is no content or only one entry
				if ( entries.length < 2 ) {
					// We don't need the tooltip
					container.tooltip('destroy');
					// If on desktop browser, don't need the navigation
					if ( ! isInBuilder && container.hasClass("hasDesktopBtn") )
						container.removeClass("hasDesktopBtn").addClass("oneEntry");
				}
			}
			
			function setColors(colors)
			{
				container.css({
					color: colors.text,
					backgroundColor: colors.panel
				});
				
				CommonHelper.addCSSRule(
					".footerMobile .tooltip-inner { \
						background-color: " + colors.header  + "; \
						color: " + colors.headerTitle  + "; \
					}\
					.footerMobile .tooltip-arrow { \
						border-top-color: " + colors.header  + " !important; \
					}",
					"MobileFooterTooltip"
				);
			}
			
			function updateMouseNavButtons()
			{
				container.find(".embed-btn-left").toggleClass(
					"disabled", 
					! _swipePane.activeIndex
				);
				container.find(".embed-btn-right").toggleClass(
					"disabled", 
					_swipePane.activeIndex === _swipePane.slides.length - 1
				);
			}
			
			function initEvents()
			{
				// Desktop arrows
				container.find(".embed-btn").click(function(){
					var btnContainer = $(this).parent();
					if ( ! btnContainer.hasClass("disabled") ) {
						if ( btnContainer.hasClass("embed-btn-left") )
							_swipePane.swipePrev();
						else
							_swipePane.swipeNext();
					}
				});
			}
			
			/*
			 * Init
			 */
			
			function init()
			{
				if ( ! $("body").hasClass("hasTouch") )
					container.addClass("hasDesktopBtn");
				else {
					container.tooltip({
						title: '<span class="footerTooltip">'
								+ '<span class="glyphicon glyphicon-resize-horizontal" style="vertical-align: -2px;"></span>'
								+ ' ' + i18n.viewer.mobileFooter.swipeInvite
								+ '</span>',
						html: true,
						trigger: 'manual',
						container: ".footerMobile"
					}).on('shown.bs.tooltip', function () {
						var tooltipId = $(this).attr('aria-describedby');
						$("#" + tooltipId).click(function(){
							container.tooltip('destroy');
						});
					});
					
					topic.subscribe("tpl-ready", function(){
						setTimeout(function(){
							container.tooltip('show');
						}, 3000);
					});
				}
			}
			
			init();
		};
	}
);