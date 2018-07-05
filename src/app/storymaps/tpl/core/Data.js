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
					if ( entry.status == "PUBLISHED" ) {
						filteredEntries.push(entry);
					}
				});

				return filteredEntries;
			};

			this.cleanEntriesMarkup = function()
			{
				$.each(this.getStoryEntries(), function(i, entry) {
					this.cleanEntryMarkup(entry);
				}.bind(this));
			};

			this.cleanEntryMarkup = function(entry) {
				var markup = entry.description;
				if (!markup) {
					return;
				}
				var cleanMarkup = $('<div>' + markup + '</div>');

				cleanMarkup.find('img').each(function(i, imgDiv) {
					var $imgDiv = $(imgDiv);
					$imgDiv.attr('src', CommonHelper.possiblyAddToken($imgDiv.attr('src')));
				});
				entry.description = cleanMarkup.html();
				entry.contentActions = entry.contentActions || [];
			};

			this.cleanEntriesActions = function() {
				var storyEntries = this.getStoryEntries();
				$.each(storyEntries, function(i, entry) {
					this.cleanEntryActions(entry);
				}.bind(this));
			};

			this.cleanEntryActions = function(entry) {
				if (!entry.contentActions || !entry.contentActions.length){
					return;
				}
				var jqLinks = $(entry.description).find('a[data-storymaps]');
				var linkActionIds = _.map(jqLinks, function(link) {
					return $(link).data('storymaps');
				});

				entry.contentActions = _.filter(entry.contentActions, function(action) {
					return _.contains(linkActionIds, action.id);
				});

			};

			this.getStoryLength = function()
			{
				return this.getStoryEntries().length;
			};

			this.getStoryByIndex = function(index)
			{
				return this.getStoryEntries()[index];
			};

			/*  this adjusts the index of entry navigation where people can request
				* a specific entry. the ONLY case that is currently using this
				* function is for story action entry navigation. In Journal, url params
				* also use this, but there are too many visible numbers in Series (bullets,
				* accordion) so we decided it would look funny here to have the url
				* say "entry=3" but the active bullet to obviously be #2.
				*/
			this.getAdjustedIndex = function(index) {
				// but in BUILDER, all entries are visible, so ignore this call.
				if (app.isInBuilder || _storyStorage !== "WEBAPP") {
					return index;
				}
				var adjustedIndex = index;
				var allEntries = WebApplicationData.getStoryEntries().slice(0, app.cfg.MAX_NB_ENTRIES);
				// do this until we get to the current index.
				_.every(allEntries || [], function(entry, i){
					if (i > index) {
						return false;
					}
					// note that Journal has the ability to _schedule_ a section for publishing
					// in the future. In Series, the section is either published or hidden.
					if (entry.status !== "PUBLISHED") {
						adjustedIndex--;
					}
					return true;
				});
				return adjustedIndex;
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

			function getMediasByType(mediaType, ctx) {
				var mediaTypeCompare = mediaType === 'embed' ? /webpage|video/ : mediaType;

				// Main Stage media
				var mediasArr = $.map(ctx.getStoryEntries(), function(entry) {
					if (!entry || !entry.media || !entry.media.type) {
						return null;
					}
					var thisMediaType = entry.media.type;
					return thisMediaType.match(mediaTypeCompare) && entry.media[thisMediaType] ? entry.media[thisMediaType] : null;
				});

				// Story Action media
				$.each(ctx.getStoryEntries(), function(i, entry) {
					if (entry.contentActions) {
						$.each(entry.contentActions, function(j, action) {
							if (action.type === 'media') {
								var thisMediaType = action.media.type;
								if (thisMediaType.match(mediaTypeCompare) && action.media[thisMediaType]) {
									mediasArr.push(action.media[thisMediaType]);
								}
							}
						});
					}
				});

				// Make the array unique
				mediasArr = $.grep(mediasArr, function(media, index) {
					if (mediaType === 'webmap' || mediaType === 'image') {
						var idProp = mediaType === 'image' ? 'url' : 'id';
						var found = _.some(mediasArr, function(m) {
							return media[idProp] === m[idProp] && media.altText === m.altText;
						});
						return found;
					}
					return index === $.inArray(media, mediasArr);
				});
				return mediasArr;
			}

			function getMediaIdsByType(mediaType) {

				var idProp = mediaType === 'image' ? 'url' : 'id';

				// Main Stage media
				var mediaIdsArr = $.map(this.getStoryEntries(), function(entry) {
					return entry && entry.media && entry.media.type === mediaType && entry.media[mediaType] ? entry.media[mediaType][idProp] : null;
				});

				// Story Action media
				$.each(this.getStoryEntries(), function(i, entry) {
					if (entry.contentActions) {
						$.each(entry.contentActions, function(j, action) {
							if (action.type === 'media' && action.media[mediaType]) {
								mediaIdsArr.push(action.media[mediaType][idProp]);
							}
						});
					}
				});

				// Make the array unique
				mediaIdsArr = $.grep(mediaIdsArr, function(media, index) {
					if (mediaType === 'webmap') {
						if (!media || media.length != 32) {
							return false;
						}
					}
					return index == $.inArray(media, mediaIdsArr);
				});

				return mediaIdsArr;
			}

			/*
			 * Get an array of webmaps id used in the series
			 */
			this.getWebmaps = function() {
				return getMediaIdsByType('webmap');
			};

			this.getWebmapObjects = function() {
				return getMediasByType('webmap', this);
			};

			this.getFirstWebmapInfo = function() {
				var sections = this.getStoryEntries();
				var firstWebmapInfo = null;
				_.some(sections, function(section, i) {
					if (section.media && section.media.webmap) {
						firstWebmapInfo = {
							webmap: section.media.webmap,
							index: i
						};
						return true;
					}
				});
				return firstWebmapInfo;
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

				$.each(this.getStoryEntries(), function(i, entry){
					if ( entry.media && entry.media.type == "webmap" && entry.media.webmap )
						store(entry.media.webmap.id, "entries", i+1);

					if ( entry.contentActions ) {
						$.each(entry.contentActions, function(j, action){
							if ( action.type == "media" && action.media.webmap )
								store(action.media.webmap.id, "actions", i+1);
						});
					}
				});

				// Also add the eventual webmap the application have been published with
				//  when starting from a webmap in AGOL Map Viewer
				// (but only if we're in builder! otherwise, a private webmap could ruin a public app. -als)
				if (app.isInBuilder) {
					var sourceWebmap = WebApplicationData.getSourceWebmap();
					if ( sourceWebmap && ! webmapsInfoHash[sourceWebmap] ) {
						webmapsInfoHash[sourceWebmap] = {};
					}
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

			this.getImages = function() {
				return this.getMediaIdsByType('image');
			};

			this.getImageObjects = function() {
				return getMediasByType('image', this);
			};

			this.getAllImageUrls = function() {
				return _.map(this.getImages().concat(this.getSidebarImages().concat([WebApplicationData.getLogoURL()])), this.getNonProtocolNonDoubleSlashUrl);
			};

			this.getSidebarImages = function() {
				var entries = this.getStoryEntries();
				var imgUrls = [];
				_.each(entries, function(section) {
					var jqSection = $(section.description);
					_.each(jqSection.find('img'), function(img) {
						imgUrls.push(CommonHelper.possiblyRemoveToken(img.src));
					});
				});
				return imgUrls;
			};

			this.getNonProtocolNonDoubleSlashUrl = function(url) {
				return url.replace(/http[s]?\:\/\//, '').replace('//', '/');
			};

			// TODO those three functions should be refactored
			this.getEmbeds = function() {
				return getMediasByType('embed', this);
			};

			this.getContentActions = function()
			{
				var actions = [];
				$.each(this.getStoryEntries(), function(i, entry){
					if (entry.contentActions) {
						$.each(entry.contentActions, function(j, action){
							actions.push(action);
						});
					}
				});
				return actions;
			};

			this.getContentStyles = function() {
				var entries = this.getStoryEntries();
				var contentStyles = [];
				_.each(entries, function(section) {
					var jqSection = $(section.description);
					_.each(jqSection.find('style'), function(styleTag) {
						contentStyles.push(styleTag.textContent);
					});
					_.each(jqSection.filter('style'), function(styleTag) {
						contentStyles.push(styleTag.textContent);
					});
				});
				return contentStyles.join(' ');
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