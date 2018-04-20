define(["lib-build/tpl!./Media",
		"lib-build/css!./Media",
		"lib-build/css!../../Common",
		"storymaps/common/builder/media/MediaSelector",
		"storymaps/tpl/core/Helper",
		"esri/geometry/Extent",
		"dojo/topic",
		"dojo/Deferred"],
	function (
		viewTpl,
		viewCss,
		commonCss,
		MediaSelector,
		Helper,
		Extent,
		topic,
		Deferred
	){
		return function Media(container)
		{
			container.append(viewTpl({
				lblTitle: i18n.commonMedia.editorActionMedia.lblTitle,
				btnOk: i18n.commonCore.common.apply,
				btnCancel: i18n.commonCore.common.cancel,
				btnBack: i18n.commonCore.common.back
			}));

			var _cfg = null,
				_dialogDeferred = null,
				_viewMediaSelector = new MediaSelector(
					container.find('.viewMediaSelectorContainer'),
					{
						onOpenConfigure: onOpenConfigure,
						onCloseConfigure: onCloseConfigure
					},
					true,
					updateSubmitButton,
					container.find('.btn-back')
				);

			initEvents();

			this.present = function(cfg, contentHeight)
			{
				_cfg = cfg;
				_dialogDeferred = new Deferred();

				_viewMediaSelector.present({
					mode: cfg.mode,
					webmaps: cfg.webmaps,
					media: cfg.media,
					disableMapExtras: true,
					fromAction: true
				}, function(){});

				container.find(".modal-content").css("min-height", contentHeight);

				container.modal({keyboard: true});
				return _dialogDeferred;
			};

			function onOpenConfigure()
			{
				container.modal('toggle');
				// TOGGLE-ADD-EDIT works for MJ because the panel text is
				// being edited in the addEdit popup. But it isn't showing here.
				// topic.publish("TOGGLE-ADD-EDIT");
			}

			function onCloseConfigure()
			{
				container.modal('toggle');
				// TOGGLE-ADD-EDIT works for MJ because the panel text is
				// being edited in the addEdit popup. But it isn't showing here.
				// topic.publish("TOGGLE-ADD-EDIT");
			}

			function updateSubmitButton()
			{
				var data = _viewMediaSelector.getData();
				container.find(".btnSubmit").attr(
					"disabled",
					! (data.media && data.media.type && data.media[data.media.type])
				);
			}

			function onClickSubmit()
			{
				var hasError = _viewMediaSelector.checkError(container.find(".btnSubmit"));

				var postErrorCheck = function()
				{
					var media = _viewMediaSelector.getData().media;
					//if (media && media.type === 'webmap' && media.webmap.extent) {
					//	var originalExtent = new Extent(media.webmap.extent);
					//	var correctedExtent = Helper.getLayoutExtent(originalExtent, true, false);
					//	media.webmap.extent = correctedExtent.toJson();
					//}
					_dialogDeferred.resolve({
						id: _cfg.mode == "add" ? "MJ-ACTION-" + Date.now() : null,
						text: _cfg.text,
						media: media
					});
					container.modal('toggle');
				};

				if ( hasError instanceof Deferred ) {
					hasError.then(function(hasError){
						if ( ! hasError )
							postErrorCheck();
					});
				}
				else if ( ! hasError )
					postErrorCheck();
			}

			function onClickCancel() {
				topic.publish('story-navigate-entry', app.data.getCurrentSectionIndex());
			}

			function initEvents()
			{
				container.find(".btnSubmit").click(onClickSubmit);
				container.find(".btnCancel").click(onClickCancel);

				container.on('shown.bs.modal', function(){
					_viewMediaSelector.postDisplay();
				});
			}

			this.initLocalization = function()
			{
				//
			};
		};
	}
);
