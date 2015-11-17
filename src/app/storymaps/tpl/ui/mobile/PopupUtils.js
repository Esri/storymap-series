define(["storymaps/common/utils/CommonHelper",
        "../StoryText"
    ], 
	function(
		CommonHelper,
		StoryText
	){
		function slideToggle(container)
		{
			if ( ! container )
				return;
				
			if ( container.is(":visible") ) {
				container.toggleClass("hideContent").slideToggle();
				unloadActiveIframe(container);
			}
			else {
				hideSiblings(container);
				container.slideToggle(400, function(){
					container.toggleClass("hideContent");
				});
				// Show potential iframe not loaded yet
				StoryText.loadContentIframe(container);
			}
		}
		
		function close(container)
		{
			container.addClass("hideContent").slideUp();
			unloadActiveIframe(container);
			
			$.each(container.find('.content-container'), function(i, container){
				container.scrollTop = 0;
			});
		}
		
		function hideSiblings(container)
		{
			container.siblings(".mobilePopup").hide().addClass("hideContent");
			// TODO make the footer tooltip goes under the popup and keep it 
			app.ui.mobileFooter.removeMobileInvite();
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
		
		return {
			/*
			 * Manage close button click
			 */
			onPopupClick: function(e)
			{
				var $this = $(this),
					popupTopRightX = $this.offset().left + $this.outerWidth(),
					popupTopRightY = $this.offset().top;
			
				if (e.clientX > popupTopRightX - 14 && e.clientY > popupTopRightY - 14) {
					close($this);
				}
			},
			open: function(container)
			{
				if ( ! container )
					return;
				
				var contentContainer = container.find('.content-container');
				if ( ! contentContainer.length ) {
					contentContainer = container.children();
				}
				
				if ( ! container.is(":visible") ) {
					hideSiblings(container);
					container.slideDown(400, function(){
						container.removeClass("hideContent");
					});
					// Show potential iframe not loaded yet
					StoryText.loadContentIframe(container);
					
					// Reset scroll on description and legend
					setTimeout(function(){
						contentContainer[0].scrollTop = 0;
					}, 410);
				}
				else {
					contentContainer[0].scrollTop = 0;
				}
			},
			slideToggle: slideToggle,
			close: close,
			setColors: function(colors)
			{
				$('.mobilePopup').css({
					color: colors.text,
					backgroundColor: colors.panel
				});
				
				CommonHelper.addCSSRule(
					".mobilePopup ::-webkit-scrollbar-thumb { background-color:" + colors.header + "; }",
					"MobilePopupScrollbar"
				);
				
				/*
				var toggleBg = colors.tab || colors.accordionArrow,
					toggleBgActive = colors.tabActive || colors.accordionArrowActive,
					toggleBgHover = colors.tabHover || colors.accordionArrowHover,
					toggleColor = colors.tabText || colors.accordionTitle;
				
				CommonHelper.addCSSRule(
					".mobilePopup .content-toggles .btn { \
						background-color: " + toggleBg  + "; \
						color: " + toggleColor  + "; \
					}\
					.mobilePopup .content-toggles .btn-primary { \
						background-color: " + toggleBgActive  + " !important; \
						color: " + toggleColor  + "!important; \
					}\
					.mobilePopup .content-toggles .btn:not(.btn-primary):hover { \
						background-color: " + toggleBgHover  + "; \
						color: " + toggleColor  + "; \
					}",
					"MobilePopupToggles"
				);
				*/
			}
		};
	}
);