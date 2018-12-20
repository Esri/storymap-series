define(["lib-build/tpl!./ViewHome",
		"lib-build/css!./ViewHome",
		"storymaps/common/utils/CommonHelper",
		"dojo/has"],
	function (
		viewTpl,
		viewCss,
		CommonHelper,
		has
	){
		return function ViewHome(container, showView)
		{
			var _params = null;
			container.append(viewTpl({
				disableImageUpload: app.appCfg.disableImageUpload,
				lblUpload: i18n.commonMedia.mediaSelector.lblUpload,
				lblLink: i18n.commonMedia.mediaSelector.lblLink,
				thirdPartyTerms: i18n.commonMedia.mediaSelector.thirdPartyTerms,
				flickrTermsLink: app.cfg.FLICKR_TERMS_LINK || ''
			}));

			init();

			this.present = function(params)
			{
				if(!$.isEmptyObject(params.media))
					_params = params;
				container.find('.imageSelectorHome').toggleClass('two-choices', params.mode == "import");
				container.find('.btn-select-url').toggle(params.mode != "import");
				container.find('.btn-select-upload').toggle((CommonHelper.getItemId() || app.isDirectCreationFirstSave) ? true : false);
				if(app.appCfg.disableImageImportUpload){
					if(params.mode == 'import')
						container.find('.btn-select-upload').toggle(false);
				}
				container.show();
			};

			this.updateParams = function(params)
			{
				_params = params;
			};

			function init()
			{
				container.find('.btn-select-upload').click(function(){ showView('upload'); });
				container.find('.btn-select-flickr').click(function(){ showView("flickr"); });
				container.find('.btn-select-picasa').click(function(){ showView("picasa"); });
				container.find('.btn-select-url').click(function(){
					var params = _params ? _params : {};
					if(app.appCfg.mediaPickerConfigureForceMode != "shortlist")
						params.fromService = false;
					params.mode = 'showURL';
					if(!params.media || !params.media.image) {
						params.media = {
							type: 'image',
							image: {}
						};
					}
					showView("configure", params);
				});

				if (!app.cfg.AUTHORIZED_IMPORT_SOURCE.flickr)
					container.find('.btn-select-flickr').addClass("disabled").unbind('click');
				if (!app.cfg.AUTHORIZED_IMPORT_SOURCE.picasa)
					container.find('.btn-select-picasa').addClass("disabled").unbind('click');
				/*if (!app.cfg.AUTHORIZED_IMPORT_SOURCE.youtube)
					container.find('.btn-select-youtube').addClass("disabled").unbind('click');
				*/

				if (! has("touch") && ! app.cfg.AUTHORIZED_IMPORT_SOURCE.flickr) {
					container.find('.btn-select-flickr').tooltip({
						trigger: 'hover',
						placement: 'top',
						html: true,
						title: i18n.commonCore.common.disabledAdmin,
						container: 'body'
					});
				}

				if (!has("touch") && !app.cfg.AUTHORIZED_IMPORT_SOURCE.picasa) {
					container.find('.btn-select-picasa').tooltip({
						trigger: 'hover',
						placement: 'top',
						html: true,
						title: i18n.commonCore.common.disabledAdmin,
						container: 'body'
					});
				}

				/*
				if (!has("touch") || !app.cfg.AUTHORIZED_IMPORT_SOURCE.youtube) {
					container.find('.btn-select-youtube').tooltip({
						trigger: 'hover',
						placement: 'top',
						html: true,
						content: app.cfg.AUTHORIZED_IMPORT_SOURCE.youtube ? 'YouTube' : i18n.commonMedia.mediaSelector.disabled,
						container: '.popover-import'
					});
				}
				*/
			}
		};
	}
);
