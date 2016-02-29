define(["lib-build/css!./Header",
        "lib-build/tpl!./HeaderMenuTpl",
        "lib-build/tpl!./HeaderMenuEntryTpl",
        "storymaps/common/utils/HeaderHelper",
        "storymaps/common/utils/CommonHelper"
    ], 
	function(
		viewCss,
		menuTpl,
		menuEntryTpl,
		HeaderHelper,
		CommonHelper
	){
		return function Header(container, isInBuilder, navigationCallback)
		{
			/*
			 * {
			 *  title: '',
			 *  subtitle: '',
			 *  headerCfg: { },
			 *  entries: [],
			 *  entryIndex: 0,
			 *  layout: "tab",
			 *  layoutOptions: { },
			 *  colors: { },
			 * }
			 */
			this.init = function(params)
			{
				params = params || {};
				
				container.find('.title').html(params.title);
				
				renderShare(params.headerCfg);
				
				renderMenu(
					params.headerCfg, 
					params.subtitle, 
					params.entries,
					params.entryIndex,
					params.appLayout,
					params.layoutOpt
				);
				
				setColors(params.appColors);
				
				/*
				TODO
				if( isInBuilder )
					topic.subscribe("HEADER_EDITED", headerEdited);
				*/
			};
			
			this.update = function(params)
			{
				setColors(params.appColors);
			};
			
			this.showEntryIndex = function(entryIndex)
			{
				// Delay menu update
				//  so if menu is open, update won't be partially visible while it's closing
				setTimeout(function(){
					container.find('.menu-entry')
					.removeClass('active')
					.eq(entryIndex).addClass('active');
				}, 500);
			};
			
			this.toggleSocialBtnAppSharing = function(disable)
			{
				HeaderHelper.toggleSocialBtnAppSharing(container, disable);
			};
			
			this.enableAutoplay = function()
			{
				container.find('.share-all')
					.addClass("disabled")
					.tooltip({
						title: i18n.viewer.headerFromCommon.tooltipAutoplayDisabled,
						container: 'body',
						placement: 'left'
					});
			};
			
			/*
			 * Share
			 */
			
			function renderShare(headerCfg)
			{
				HeaderHelper.setSocial(
					container, 
					headerCfg
				);
				HeaderHelper.initEvents(container);
			}
			
			/*
			 * Menu
			 */
			
			function onClickMenu()
			{
				container.find('.menu').slideToggle();
			}
			
			function renderMenu(headerCfg, subtitle, entries, entryIndex, appLayout, layoutOpt)
			{
				var menuIndexHTML = "",
					entriesLength = entries.length;
				
				$.each(entries, function(i, entry) {
					var title = entry.title;
					
					if ( appLayout == "bullet" || appLayout == "accordion" ) {
						if ( ! layoutOpt.reverse )
							title = (i+1) + (title ? " - " + title : "");
						else
							title = (entriesLength - i) + (title ? " - " + title : "");
					}
					
					menuIndexHTML += menuEntryTpl({
						title: title || '&nbsp;'
					});
				});
				
				container.find('.menu').html(menuTpl({
					subtitle: subtitle,
					menuIndex: menuIndexHTML
				}));
				
				container.find('.subtitle').toggle(! headerCfg.compactSize);
				
				HeaderHelper.setLink(container, headerCfg);
				HeaderHelper.setLogo(container, headerCfg);
				
				if ( headerCfg.logoURL == "NO_LOGO" || ! headerCfg.logoURL || ! headerCfg.linkText )
					container.find('.menu-header').addClass('centered');
				
				container.find('.menu-entry')
					.click(onMenuIndexClick)
					.eq(entryIndex).addClass('active');
			}
			
			function setColors(colors)
			{
				container.css({
					color: colors.headerTitle,
					backgroundColor: colors.header
				});
				
				container.find('.menu').css({
					color: colors.text,
					backgroundColor: colors.panel
				});
				
				CommonHelper.addCSSRule(
					".headerMobile ::-webkit-scrollbar-thumb { background-color:" + colors.header + "; }",
					"MobileheaderScrollbar"
				);
			}
			
			function onMenuIndexClick()
			{
				if ( $(this).hasClass('active') )
					return;
				
				navigationCallback($(this).index());
				onClickMenu();
			}
			
			function initEvents()
			{
				container.find('.menu-btn').click(onClickMenu);
			}
			
			initEvents();
		};
	}
);