define(["lib-build/css!./ViewConfigure",
		"lib-build/tpl!./ViewConfigure",
		"../../utils/CommonHelper",
		"dojo/_base/lang",
		"dojo/Deferred"
	],
	function (
		viewCss,
		viewTpl,
		CommonHelper,
		lang,
		Deferred
	){
		return function ViewConfigure(container, cfg)
		{
			var displayMode = ["center", "fill", "fit", "stretch", "custom"];
			//maxImgDim = [300, 500];

			var _media = null,
				_mediaType = null,
				_params = null;

			if (app.appCfg.mediaPickerConfigureForceMode) {
				cfg.mode = app.appCfg.mediaPickerConfigureForceMode;
			}

			var strs = lang.mixin({
				mode: cfg.mode,
				phWidth: i18n.commonCore.common.width,
				phHeight: i18n.commonCore.common.height,
				embedProtocolInfo: location.protocol == 'https:' ? i18n.commonMedia.mediaConfigure.embedProtocolWarning1 : i18n.commonMedia.mediaConfigure.embedProtocolWarning2
			}, i18n.commonMedia.mediaConfigure);

			if (app.appCfg.mediaPickerConfigureForceMode === 'shortlist') {
				lang.mixin(strs, {
					lblURLHelp: i18n.builder.detailPanelBuilder.imageSizeHelperUpdated,
					lblThumbURLHelp: i18n.builder.detailPanelBuilder.thumbnailHelp || 'The recommended thumbnail size & shape is 280 x 210 pixels (4:3 width:height ratio). Larger thumbnails can slow performance. 4:3 aspect ratio thumbnails fit into their tiles without being cropped.',
					lblThumbURL: i18n.builder.detailPanelBuilder.thumbnailLink
				});
			}

			container.append(viewTpl(strs));

			initEvents();

			this.present = function(params)
			{
				var media = params.media,
					imgCfg = null;
				this.imageSizes = null;

				if(params.media && app.appCfg.mediaPickerConfigureForceMode === "shortlist"){
					if(params.media.image){
						if(params.media.pic_url && (params.media.pic_url.indexOf('flickr') || params.media.pic_url.indexOf('googleusercontent')))
							params.fromService = true;
						if(params.media.image && params.media.image.url && (params.media.image.url.indexOf('flickr') || params.media.image.url.indexOf('googleusercontent')))
							params.fromService = true;
						if(params.media.thumb_url && (params.media.thumb_url.indexOf('flickr') || params.media.thumb_url.indexOf('googleusercontent')))
							params.fromService = true;
					}
				}

				// Convert the generic structure of service connector
				if ( params.fromService ) {
					if ( params.media.is_video )
						media = {
							type: 'video',
							video: {
								title: params.media.name,
								titleDisplay: 'caption',
								url: params.media.pic_url
							}
						};
					else {
						this.imageSizes = params.media.sizes;
						media = {
							type: 'image',
							image: {
								title: params.media.description || params.media.name,
								titleDisplay: 'caption',
								url: params.media.pic_url || (this.imageSizes ? this.imageSizes[0].url : params.media.picUrl) || params.media.image.url,
								sizes: params.media.sizes,
								thumb_url: params.media.thumb_url ? params.media.thumb_url : ''
							}
						};
					}
				}

				// Get image cfg in edit mode
				if ( media && media.type == 'image' && media.image ) {
					imgCfg = {
						width:  params.fromService ? null : media[media.type].width,
						height: params.fromService ? null : media[media.type].height
					};
					media.image.activateFullScreen = params.media.activateFullScreen;
				}

				_mediaType = media ? media.type : 'image';
				_media = media;
				_params = params;

				// URL
				var url = media ? media[media.type].url : '';
				if(url && app.appCfg.mediaPickerConfigureForceMode != "shortlist" && params.mode == "showURL" && !params.media.resourcesUrl && !params.media.pic_url){
					url = '';
					_params.fromService = false;
				}

				if(url && app.appCfg.mediaPickerConfigureForceMode == "shortlist" && url.indexOf(("sharing/rest/content/items/") > -1))
					url = CommonHelper.possiblyAddToken(url);

				container.find('.mediaURL')
					.val(url)
					.keyup(function(){
						if(_params.fromService && media && media.type && (media[media.type].url != container.find('.mediaURL').val()))
							_params.fromService = false;

						if (app.appCfg.mediaPickerConfigureForceMode == "shortlist"){
							if(container.find('.mediaThumbURL').val().length){
								container.parent().parent().parent().parent().parent().parent().parent().find('.modal-footer').find('.btnSubmit').attr("disabled",false);
							}
						}
						container.find('.mediaURLError').fadeOut();
					})
					.on('paste', function(){
						if(_params.fromService && media && media.type && (media[media.type].url != container.find('.mediaURL').val()))
							_params.fromService = false;

						if (app.appCfg.mediaPickerConfigureForceMode == "shortlist"){
							if(container.find('.mediaThumbURL').val().length){
								container.parent().parent().parent().parent().parent().parent().parent().find('.modal-footer').find('.btnSubmit').attr("disabled",false);
							}
						}
						container.find('.mediaURLError').fadeOut();
					})
					.parent().toggle(
							(params.fromService === false || (app.appCfg.mediaPickerConfigureForceMode == "shortlist" && params.mode == "showURL")) && _mediaType == "image" && _mediaType == "image"
					);
				container.find('.mediaURLError').hide();

				// Thumbnail URL
				var thumbUrl = media ? media[media.type].thumb_url : '';
				if(thumbUrl && app.appCfg.mediaPickerConfigureForceMode == "shortlist" && thumbUrl.indexOf(("sharing/rest/content/items/") > -1))
					thumbUrl = CommonHelper.possiblyAddToken(thumbUrl);
				container.find('.mediaThumbURL')
					.val(thumbUrl)
					.keyup(function(){
						if(_params.fromService && media && media.type && (media[media.type].thumb_url != container.find('.mediaThumbURL').val()))
							_params.fromService = false;
						if (app.appCfg.mediaPickerConfigureForceMode == "shortlist"){
							if(container.find('.mediaURL').val().length){
								container.parent().parent().parent().parent().parent().parent().parent().find('.modal-footer').find('.btnSubmit').attr("disabled",false);
							}
						}
						container.find('.mediaThumbURLError').fadeOut();
					})
					.on('paste', function(){
						if(_params.fromService && media && media.type && (media[media.type].thumb_url != container.find('.mediaThumbURL').val()))
							_params.fromService = false;
						if (app.appCfg.mediaPickerConfigureForceMode == "shortlist"){
							if(container.find('.mediaURL').val().length){
								container.parent().parent().parent().parent().parent().parent().parent().find('.modal-footer').find('.btnSubmit').attr("disabled",false);
							}
						}
						container.find('.mediaThumbURLError').fadeOut();
					});

				// Frame trick
				var isFrame = _mediaType == 'webpage' && media[media.type].frameTag;
				if ( isFrame )
					container.find('.mediaURL').val(media[media.type].frameTag);

				//
				// Mode Main Stage
				//

				container.find('.position-image').toggle(_mediaType == 'image');
				container.find('.position-video').toggle(_mediaType == 'video' || _mediaType == 'webpage');
				container.find(".media-configure-position").removeClass("selected");

				var display = _mediaType == 'image' ? displayMode[1] : displayMode[3],
					width = null,
					height = null;

				if ( params.media && params.media.type ) {
					var displayTmp = params.media[params.media.type].display;
					width = params.media[params.media.type].width;
					height = params.media[params.media.type].height;

					if ( $.inArray(displayTmp, displayMode) != -1 )
						display = displayTmp;
				}

				var displayContainer = _mediaType == 'image' ? '.position-image' : '.position-video';
				if ( cfg.mode == "inlineText" && (_mediaType == 'video' || _mediaType == 'webpage') ) {
					displayContainer = ".inline-video";
					if ( ! width && ! height )
						display = "fit";
				}

				// Make sure that width 100% isn't displayed for fit video & webpage
				if ( _mediaType == 'video' || _mediaType == 'webpage' ) {
					if ( display == "fit" ) {
						width = "";
						height = "";
					}
				}

				container.find(displayContainer)
					.find(".media-configure-position[data-val=" + display + "]")
					.addClass("selected").click();

				container.find('.posCustomW').val(width || '');
				container.find('.posCustomH').val(height || '');

				//
				// Mode Inline
				//

				container.find('.inline-image').toggle(_mediaType == 'image');
				container.find('.inline-video').toggle(_mediaType == 'video' || _mediaType == 'webpage');

				container.find('.mediaTitle').val(media ? media[media.type].title : '');
				container.find('[value="opt-maximize"]').prop('checked', media ? media[media.type].activateFullScreen : false);

				container.find('textarea.alt-text').val(media ? media[media.type].altText : '');

				// Image information (inline)
				/*
				if ( imgCfg )
					fillImageInformation(media[media.type].url, imgCfg);
				*/

				// Web Page Unload strategy
				container.find(".mediaUnloadStrategy").toggle(_mediaType == 'webpage');
				container.find(".navigateOutUnload").prop('checked', ! params.media || ! params.media[params.media.type] || params.media[params.media.type].unload === undefined || params.media[params.media.type].unload);

				if (_mediaType == 'webpage') {
					var builderIsHTTPS = location.protocol == 'https:';
					var embedIsHTTPS;

					if (media[media.type].url) {
						embedIsHTTPS = media[media.type].url.match(/https:\/\//);
					}
					else {
						embedIsHTTPS = $(media[media.type].frameTag).attr('src').match(/https:\/\//);
					}

					container.find(".embedProtocol").find('label').toggleClass('disabled', builderIsHTTPS);
					container.find(".embedProtocolSecure").prop('checked', embedIsHTTPS);
				}

				container.find(".embedProtocol").toggle(_mediaType == 'webpage');

				container.show();
				container.find('.mediaURL').focus();
			};

			this.checkError = function(saveBtn)
			{
				var error = false;

				container.find('.mediaURLError, .mediaThumbURLError').fadeOut();

				if ( _params.fromService === false && _mediaType == "image" ) {
					var resultDeferred = new Deferred();

					var saveBtnLbl = saveBtn.html();
					saveBtn.html(i18n.commonMedia.mediaConfigure.lblURLCheck);

					var img = null;

					if (app.appCfg.mediaPickerConfigureForceMode == "shortlist") {
						var imgUrl = CommonHelper.prependURLHTTP(container.find('.mediaURL').val().trim());
						var thumbUrl = CommonHelper.prependURLHTTP(container.find('.mediaThumbURL').val().trim());

						img = new Image();
						img.src =  imgUrl;

						img.onload = function() {
							var img2 = new Image();
							img2.src = thumbUrl;

							img2.onload = function() {
								saveBtn.html(saveBtnLbl);
								resultDeferred.resolve(false);
							};

							img2.onerror = function(){
								if (thumbUrl) {
									container.find('.mediaThumbURLError').fadeIn();
								}

								saveBtn.html(saveBtnLbl);
								resultDeferred.resolve(true);
							};
						};

						img.onerror = function(){
							container.find('.mediaURLError').fadeIn();

							var img2 = new Image();
							img2.src =  thumbUrl;

							img2.onload = function() {
								saveBtn.html(saveBtnLbl);
								resultDeferred.resolve(true);
							};

							img2.onerror = function(){
								container.find('.mediaThumbURLError').fadeIn();

								saveBtn.html(saveBtnLbl);
								resultDeferred.resolve(true);
							};
						};
					}
					else {
						img = new Image();
						img.src =  CommonHelper.prependURLHTTP(container.find('.mediaURL').val().trim());

						img.onload = function(){
							saveBtn.html(saveBtnLbl);
							resultDeferred.resolve(false);
						};

						img.onerror = function(){
							container.find('.mediaURLError').fadeIn();
							saveBtn.html(saveBtnLbl);
							resultDeferred.resolve(true);
						};
					}

					return resultDeferred;
				}

				return error;
			};

			this.getData = function()
			{
				var display = container.find('.media-configure-position.selected').data('val'),
					altText = container.find('textarea.alt-text').val() || '',
					data = {
						url: container.find('.mediaURL').val().trim(),
						type: _mediaType,
						altText: altText.replace(/[<>'']/g, '')
					};

					if (this.imageSizes) {
						lang.mixin(data, {sizes: this.imageSizes});
					}

				if ( cfg.mode == "inlineText" ) {
					if ( _mediaType == "image" ) {
						lang.mixin(data, {
							title: container.find('.mediaTitle').val(),
							//titleDisplay: container.find('input[name="mediaTitleDisplay"]:checked').val(),
							width: container.find('.imgActualWidth').val(),
							height: container.find('.imgActualHeight').val(),
							type: _mediaType,
							activateFullScreen: container.find('[value="opt-maximize"]').prop('checked')
						});
					}
					else {
						lang.mixin(data, {
							display: display
						});

						if ( display == "custom" ) {
							lang.mixin(data, {
								width: container.find('.inline-video .posCustomW').val(),
								height: container.find('.inline-video .posCustomH').val()
							});
						}
					}
				}
				else if ( app.appCfg.mediaPickerConfigureForceMode == "shortlist" ) {
					lang.mixin(data, {
						thumb_url: container.find('.mediaThumbURL').val()
					});
				}
				else {
					lang.mixin(data, {
						display: display
					});

					if ( display == "custom" ) {
						lang.mixin(data, {
							width: container.find('.position-video .posCustomW').val(),
							height: container.find('.position-video .posCustomH').val()
						});
					}
				}

				if ( _mediaType == "webpage" )
					data.unload = container.find(".navigateOutUnload").prop('checked');

				if ( _mediaType == "webpage" && _media.webpage.frameTag ) {
					var frameTag = data.url;
					var node = $(frameTag);

					if (container.find(".embedProtocolSecure").prop('checked')) {
						node.attr('src', CommonHelper.convertURLHTTPS(node.attr('src')));
					}
					else {
						node.attr('src', CommonHelper.convertURLHTTP(node.attr('src')));
					}

					data.frameTag = node.prop('outerHTML').replace(/ xmlns="[^"]*"/, '');
					data.url = '';
					data.ts = new Date().getTime();
				}
				else if ( _mediaType == "webpage" ) {
					if (container.find(".embedProtocolSecure").prop('checked')) {
						data.url = CommonHelper.convertURLHTTPS(data.url);
					}
					else {
						data.url = CommonHelper.convertURLHTTP(data.url);
					}
				}
				else {
					data.url = CommonHelper.prependURLHTTP(data.url);

					if (data.thumb_url) {
						data.thumb_url = CommonHelper.prependURLHTTP(data.thumb_url);
					}
				}
				return data;
			};

			/*
			function fillImageInformation(url, cfg)
			{
				var imageDim = getImageDimension(url),
					newImageDim = [];

				container.find(".imgNatWidth").html(imageDim[0]);
				container.find(".imgNatHeight").html(imageDim[1]);
				container.find(".imgNatRatio").html(round(imageDim[0] / imageDim[1], 2));

				// Edit
				if ( cfg.width && cfg.height )
					newImageDim = [cfg.width, cfg.height];
				// Add
				else {
					if ( imageDim[0] > maxImgDim[0] ) {
						newImageDim[0] = maxImgDim[0];
						newImageDim[1] = newImageDim[0] / (imageDim[0] / imageDim[1]);
					}

					if ( imageDim[1] > maxImgDim[1] ) {
						newImageDim[1] = maxImgDim[1];
						newImageDim[0] = newImageDim[1] * (imageDim[0] / imageDim[1]);
					}
				}

				container.find(".imgActualWidth").val(round(newImageDim[0], 0));
				container.find(".imgActualHeight").val(round(newImageDim[1], 0));
				container.find(".imgActualRatio").html(round(newImageDim[0] / newImageDim[1], 2));

				container.find(".btn-lockratio").addClass("locked");
			}

			function ratioIsLocked()
			{
				return container.find(".btn-lockratio").hasClass("locked");
			}
			*/

			function initEvents()
			{
				/*
				container.find("input[name=mediaTitleDisplay]").change(function(){
					if ( $(this).val() != "none" )
						container.find('.mediaTitle').removeAttr("disabled");
					else
						container.find('.mediaTitle').attr("disabled", "disabled");
				});
				*/

				/*
				container.find(".btn-reset").click(function(){
					container.find(".imgActualWidth").val(container.find(".imgNatWidth").html());
					container.find(".imgActualHeight").val(container.find(".imgNatHeight").html());
					container.find(".imgActualRatio").html(container.find(".imgNatRatio").html());
				});

				container.find(".btn-lockratio").click(function(){
					$(this).toggleClass('locked');
				});

				container.find(".imgActualWidth").change(function(){
					if ( ratioIsLocked() )
						container.find(".imgActualHeight").val(round(parseInt($(this).val(), 10) / parseFloat(container.find(".imgNatRatio").html()), 0));

					updateActualRatio();
				});

				container.find(".imgActualHeight").change(function(){
					if ( ratioIsLocked() )
						container.find(".imgActualWidth").val(round(parseInt($(this).val(), 10) * parseFloat(container.find(".imgNatRatio").html()), 0));

					updateActualRatio();
				});
				*/

				container.find('.help').tooltip({
					trigger: 'hover',
					container: container.parents('.modal')[0]
				});

				container.find(".imageDetailsLbl").click(function(){
					container.find(".imageDetailsContainer").toggleClass('expanded');
				});

				// Position
				container.find(".media-configure-position").off('click').click(function(){
					var val = $(this).data('val');

					container.find(".media-configure-position").removeClass("selected");
					$(this).addClass("selected");

					container.find('.media-configure-position[data-val="custom"]').find(".position-params").toggleClass("disabled", val != "custom");
				});

				container.find('.dimHelp').tooltip('destroy').tooltip({
					title: i18n.commonMedia.mediaConfigure.tooltipDimension,
					html: true,
					trigger: 'hover',
					container: container
				});

				container.find('.dimHelp2').tooltip('destroy').tooltip({
					title: i18n.commonMedia.mediaConfigure.tooltipDimension2,
					html: true,
					trigger: 'hover',
					container: container
				});

				container.find('.maximizeHelp, .unloadHelp, .configureHelp').tooltip({
					html: true,
					trigger: 'hover',
					container: container,
					placement: app.appCfg.mediaPickerConfigureForceMode == "shortlist" ? 'bottom' : 'top'
				});
			}

			/*
			function updateActualRatio()
			{
				container.find(".imgActualRatio").html(round(
					parseInt(container.find(".imgActualWidth").val(), 10) / parseInt(container.find(".imgActualHeight").val(), 10),
					2)
				);
			}

			function getImageDimension(url)
			{
				var img = new Image();
				img.src = url;
				return [img.width, img.height];
			}

			function round(number, precision)
			{
				return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision);
			}
			*/
		};
	}
);
