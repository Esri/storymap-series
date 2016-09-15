define(["./WebApplicationData",
		"storymaps/common/utils/CommonHelper",
		"dojo/topic",
		"esri/arcgis/utils"],
	function(
		WebApplicationData, 
		CommonHelper,
		topic,
		arcgisUtils
	){
		return function Data()
		{
			// Web map item and item data
			var _webmapItem = null;
			// Web app item
			var _appItem = null;
			// A cache for webmap title and sharing in builder mode for Add/Edit dialog
			var _webmapsTitleAndSharingCache = {};
			// App proxies
			var _appProxies = null;
	
			/*
			 * Template common get/set
			 */

			this.getWebMap = function()
			{
				return _webmapItem;
			};
	
			this.setWebMap = function(webmapItem)
			{
				_webmapItem = webmapItem;
			};
	
			this.getWebAppItem = function()
			{
				return _appItem || {};
			};
	
			this.setWebAppItem = function(appItem)
			{
				_appItem = appItem;
			};
			
			this.getWebAppData = function()
			{
				return WebApplicationData;
			};
			
			this.updateAfterSave = function()
			{
				WebApplicationData.updateAfterSave();
			};
			
			this.userIsAppOwner = function()
			{
				var portalUser = app.portal ? app.portal.getPortalUser() : null;
				
				return  (portalUser && portalUser.username == this.getWebAppItem().owner)
						|| (CommonHelper.getPortalUser() != null && CommonHelper.getPortalUser() == this.getWebAppItem().owner)
						// Admin privilege
						|| (portalUser && portalUser.privileges && $.inArray("portal:admin:updateItems", portalUser.privileges) > -1 )
						|| this.getWebAppItem().itemControl == "admin"
						// Group with shared ownership
						|| this.getWebAppItem().itemControl == "update";
			};
			
			this.checkUserItemPrivileges = function()
			{
				var portalUser = app.portal ? app.portal.getPortalUser() : null;
				
				return (portalUser && ! portalUser.orgId && ! portalUser.privileges)
						|| (portalUser && portalUser.privileges && $.inArray("portal:user:createItem", portalUser.privileges) > -1);
			};
	
			this.isOrga = function()
			{
				if ( ! app.portal || ! app.portal.getPortalUser() )
					return false;
				
				return !! app.portal.getPortalUser().orgId;
			};
			
			this.getAppProxies = function()
			{
				return _appProxies;
			};
			
			this.setAppProxies = function(appProxies)
			{
				_appProxies = appProxies;
			};

			/*
			 * Map Series
			 */
			
			var _storyStorage = null,
				_currentStoryIndex = null;
			
			/*
			 * Storage type
			 */
			
			this.getStoryStorage = function()
			{
				return _storyStorage;
			};
			
			this.setStoryStorage = function(storyStorage)
			{
				_storyStorage = storyStorage;
			};
			
			/*
			 * Data read
			 */
			
			/**
			 * Get story entries
			 * Entries are ordered but not filtered by status
			 */
			this.getStory = function()
			{
				if ( _storyStorage == "WEBAPP" )
					return WebApplicationData.getStory() || {};
				return {};
			};

			/**
			 * Get story entries:
			 *  - in user defined order
			 *  - in builder: get all entries
			 *  - in viewer: get only published section with a past publication date 
			 */
			this.getStoryEntries = function()
			{
				var allEntries = [],
					filteredEntries = [];
				
				if ( _storyStorage == "WEBAPP" )
					allEntries = WebApplicationData.getStoryEntries();
				
				// Apply maximum number of entries limitation
				allEntries = allEntries.slice(0, app.cfg.MAX_NB_ENTRIES);
				
				if ( app.isInBuilder )
					return allEntries || [];
				
				// Filter by status
				$.each(allEntries || [], function(i, entry){
					if ( entry.status == "PUBLISHED" )
						filteredEntries.push(entry);
				});
				
				return filteredEntries;
			};
			
			this.getStoryLength = function()
			{
				return this.getStoryEntries().length;
			};

			this.getStoryByIndex = function(index)
			{
				return this.getStoryEntries()[index];
			};
			
			this.getCurrentSection = function()
			{
				return this.getStoryByIndex(_currentStoryIndex);
			};
			
			/*
			 * Index
			 */
			
			this.getCurrentSectionIndex = function()
			{
				return _currentStoryIndex;
			};
			
			this.setCurrentSectionIndex = function(storyIndex)
			{
				_currentStoryIndex = storyIndex;
			};
			
			/*
			 * Add
			 */
			
			this.addStorySection = function(section)
			{
				
				WebApplicationData.setStoryEntries(this.getStoryEntries().concat(section));
				this.setCurrentSectionIndex(this.getStoryLength() - 1);
			};
			
			/*
			 * Edit
			 */
			
			this.editSection = function(sectionIndex, updatedSection)
			{
				var entries = this.getStoryEntries();
				entries[sectionIndex] = updatedSection;
				WebApplicationData.setStoryEntries(entries);
			};
			
			/*
			 * Organize
			 */
			
			this.organizeStory = function(entries, newSectionIndex)
			{
				WebApplicationData.setStoryEntries(entries);
				
				if ( newSectionIndex == -1 )
					newSectionIndex = 0;
				
				this.setCurrentSectionIndex(newSectionIndex);
			};
			
			/*
			 * Utils
			 */
			
			/*
			 * Get an array of webmaps id used in the series
			 */
			this.getWebmaps = function()
			{
				// Main Stage webmaps
				var webmaps = $.map(this.getStoryEntries(), function(section){
					return section.media && section.media.type == "webmap" && section.media.webmap ? section.media.webmap.id : null;
				});
				// Make the array unique
				webmaps = $.grep(webmaps, function(webmap, index) {
					if ( ! webmap || webmap.length != 32 )
						return false;
					return index == $.inArray(webmap, webmaps);
				});

				return webmaps;
			};
			
			/*
			 * Get extented infos about webmaps used in the series
			 *  [
			 *    {
			 *      id: 'XYZ',
			 *      title: ''			// Webmap title (grabbed from the item)
			 *      sharing: '',		// Webmap sharing (grabbed from the item)
			 *      entries: [1,2,3],	// Entries index the webmap is used in (computed on request)
			 *    },
			 *    ...
			 *  ]
			 *  
			 *  Properties grabbed from the item on first request may not be present on the first method call
			 *  If the value is null, the value will be emitted through 
			 *  topic.subsribe("LOADED_WEBMAP_INFOS", {
			 *    id: '',
			 *    title: '',
			 *    sharing: ''
			 *	});
			 */
			this.getWebmapsInfo = function()
			{
				var webmapsInfoArray = [],
					webmapsInfoHash  = {};
				
				var store = function(id, type, value)
				{
					if ( webmapsInfoHash[id] ) {
						if ( webmapsInfoHash[id][type].indexOf(value) == -1 )
							webmapsInfoHash[id][type].push(value);
					}
					else {
						webmapsInfoHash[id] = {
							entries: [],
							actions:  []
						};
						webmapsInfoHash[id][type].push(value);
					}
				};
				
				$.each(this.getStoryEntries(), function(i, section){
					if ( section.media && section.media.type == "webmap" && section.media.webmap )
						store(section.media.webmap.id, "entries", i+1);
					
					if ( section.contentActions ) {
						$.each(section.contentActions, function(j, action){
							if ( action.type == "media" && action.media.webmap )
								store(action.media.webmap.id, "actions", i+1);
						});
					}
				});
				
				// Also add the eventual webmap the application have been published with
				//  when starting from a webmap in AGOL Map Viewer
				var sourceWebmap = WebApplicationData.getSourceWebmap();
				if ( sourceWebmap && ! webmapsInfoHash[sourceWebmap] ) {
					webmapsInfoHash[sourceWebmap] = {};
				}
				
				$.each(Object.keys(webmapsInfoHash), function(i, webmap){
					var webmapCache = _webmapsTitleAndSharingCache[webmap];
					
					if ( ! webmapCache ) {
						// If webmap already loaded through standard map loading
						if ( app.maps[webmap] ) {
							_webmapsTitleAndSharingCache[webmap] = {
								title:   app.maps[webmap].response.itemInfo.item.title,
								sharing: app.maps[webmap].response.itemInfo.item.access.toUpperCase()
							};
							webmapsInfoArray.push({
								id: webmap,
								title: app.maps[webmap].response.itemInfo.item.title,
								sharing: app.maps[webmap].response.itemInfo.item.access.toUpperCase(),
								entries: webmapsInfoHash[webmap].entries
							});
							return;
						}
						else
							requestWebmapInfos(webmap);
					}
					
					webmapsInfoArray.push({
						id: webmap,
						title: webmapCache ? webmapCache.title : null,
						sharing: webmapCache ? webmapCache.sharing : null,
						entries: webmapsInfoHash[webmap].entries
					});
				});
				
				return webmapsInfoArray;
			};
			
			this.getWebmapTitle = function(id)
			{
				return _webmapsTitleAndSharingCache[id] ? _webmapsTitleAndSharingCache[id].title : '';
			};
			
			this.getWebmapSharing = function(id)
			{
				return _webmapsTitleAndSharingCache[id] ? _webmapsTitleAndSharingCache[id].sharing : '';
			};
			
			function requestWebmapInfos(webmap)
			{
				arcgisUtils.getItem(webmap).then(function(response){
					_webmapsTitleAndSharingCache[webmap] = {
						title:   response.item.title,
						sharing: response.item.access.toUpperCase()
					};
					
					topic.publish("LOADED_WEBMAP_INFOS", {
						id: webmap,
						title: response.item.title,
						sharing: response.item.access.toUpperCase()
					});
				});
			}
			
			// TODO those three functions should be refactored
			this.getImages = function()
			{
				// Story Main Stage images
				var images = $.map(this.getStoryEntries(), function(section){
					return section.media && section.media.type == "image" && section.media.image ? section.media.image.url : null;
				});
				
				// Make the array unique
				images = $.grep(images, function(image, index) {
					return index == $.inArray(image, images);
				});

				return images;
			};
			
			// TODO those three functions should be refactored
			this.getEmbeds = function()
			{
				// Story Main Stage embeds
				var embeds = $.map(this.getStoryEntries(), function(section){
					if ( ! section || ! section.media || (section.media.type != "video" && section.media.type != "webpage") || ! section.media[section.media.type] )
						return null;
					
					return section.media[section.media.type];
				});
				
				// Make the array unique
				embeds = $.grep(embeds, function(embed, index) {
					return index == $.inArray(embed, embeds);
				});

				return embeds;
			};
			
			this.getCurrentLayoutStaticConfig = function()
			{
				return this.getLayoutStaticConfig(WebApplicationData.getLayoutId());
			};
			
			this.getLayoutStaticConfig = function(layoutId)
			{
				var layoutCfg = $.grep(app.cfg.LAYOUTS, function(l){ return l.id == layoutId; });
				
				if ( ! layoutCfg || ! layoutCfg.length )
					return null;
				
				return layoutCfg[0];
			};
			
			this.debug = function()
			{
				console.table && console.table(app.data.getStoryEntries());
				
				$.each(app.data.getStoryEntries(), function(i, section){
					console.log("%c%s", "font-weight: bold; font-size: 18px;", '[' + i + '-' + section.title + "]");
					console.log("%c%s", "font-weight: bold; font-size: 16px;", "> MEDIA");
					console.log(JSON.stringify(section.media, null, '\t'));
					console.log("%c%s", "font-weight: bold; font-size: 16px;", "> ACTIONS");
					console.log(JSON.stringify(section.contentActions, null, '\t'));
				});
			};
			
			// TODO have to replace getCurrentSection
			this.getCurrentEntryIndex = function()
			{
				return _currentStoryIndex;
			};
			
			this.getCurrentEntry = function()
			{
				return this.getStoryByIndex(_currentStoryIndex);
			};
		};
	}
);