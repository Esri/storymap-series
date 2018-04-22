define(["lib-build/css!./EntryInfo",
        "./PopupUtils",
        "../StoryText"
    ], 
	function(
		viewCss,
		PopupUtils,
		StoryText
	){
		return function EntryInfo(container)
		{
			var _entries = null,
				_entryIndex = null,
				_layoutEntryCfg = null;
			
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
				_entryIndex = params.entryIndex;
			};
			
			this.resize = function()
			{
				//
			};
			
			this.showEntryIndex = function(index, layoutEntryCfg)
			{
				_layoutEntryCfg = layoutEntryCfg;
				_entryIndex = index;
				
				// Button present if description or legend
				container.toggle(_layoutEntryCfg.description || _layoutEntryCfg.legend);
				// Hide active open popup
				getActivePopup().hide().addClass("hideContent");
			};
			
			this.onPopupContentToggle = function()
			{
				var $this = $(this),
					btnIndex = $(this).index(),
					popupContainer = getActivePopup();
				
				$this.siblings().removeClass('btn-primary');
				$this.addClass('btn-primary');
				
				popupContainer.find('.content-container')
					.hide()
					.eq(btnIndex).show();
			};
			
			function onInfoBtnClick()
			{
				var popupContainer = getActivePopup(),
					description = _entries[_entryIndex].description;
				
				if ( ! popupContainer.is(":visible") ) {
					popupContainer.find('.description').html(
						StoryText.prepareContentIframe(
							StoryText.prepareEditorContent(description)
						)
					);
					
					StoryText.createMainMediaActionLink(popupContainer);
					// If it's a map can toggle description and legend
					if ( popupContainer.find('.content-toggles') ) {
						var needToggles = _layoutEntryCfg.description && description && _layoutEntryCfg.legend;
						
						popupContainer.toggleClass('noToggle', ! needToggles);
						popupContainer.find('.content-toggles').toggle(needToggles);
						popupContainer.find('.content-toggles .btn').eq(_layoutEntryCfg.description && description ? 0 : 1).click();
					}
				}
				
				PopupUtils.open(popupContainer);
			}
			
			function getActivePopup()
			{
				return $('#mainStagePanel .mainMediaContainer.active .mobileInfo'); 
			}
			
			function init()
			{
				container.click(onInfoBtnClick);
			}
			
			init();
		};
	}
);