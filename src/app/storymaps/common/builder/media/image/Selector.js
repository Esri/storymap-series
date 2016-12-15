define(["lib-build/tpl!./Selector",
		"lib-build/css!./Selector",
		"./ViewHome",
		"./ViewUpload",
		"./ViewFlickr",
		"./ViewPicasa",
		"../ViewPicker",
		"../ViewConfigure"],
	function (
		viewTpl,
		viewCss,
		ViewHome,
		ImageSelectorUpload,
		ImageSelectorFlickr,
		ImageSelectorPicasa,
		ViewPicker,
		ViewConfigure
	){
		return function Selector(container, params, onDataChangeCallback, backButton)
		{
			container.append(viewTpl({
				lblStep1: i18n.commonMedia.imageSelector.lblStep1,
				lblStep2: i18n.commonMedia.imageSelector.lblStep2,
				lblStep3: i18n.commonMedia.imageSelector.lblStep3
			}));

			var _selectedView = null,
				_selectedViewParams = null,
				_previousViews = null,
				_mediaView = null,
				_hasPreviouslyImported = false,
				_mode = null,
				_views = {
					home: new ViewHome(
						container.find('.viewHomeContainer'),
						showView
					),
					upload: new ImageSelectorUpload(
						container.find('.viewUploadContainer'),
						showView
					),
					flickr: new ImageSelectorFlickr(
						container.find('.viewFlickrContainer'),
						showView
					),
					picasa: new ImageSelectorPicasa(
						container.find('.viewPicasaContainer'),
						showView
					),
					picker: new ViewPicker(
						container.find('.mediaSelectorPickerContainer'),
						showView,
						onDataChangeCallback
					),
					configure: new ViewConfigure(
						container.find('.mediaSelectorConfigureContainer'),
						params.configure,
						showView
					)
				};

			init();

			this.present = function(cfg)
			{
				_previousViews = [];
				_selectedView = null;
				_selectedViewParams = null;
				_mode = cfg.mode;
				_views.home.updateParams({});

				if ( cfg.mode == "edit" && cfg.media && cfg.media.type == "image" ) {
					showView('configure', {
						mode: cfg.mode,
						media: cfg.media
					});
				}
				else if (cfg.keepLastDataSource && _hasPreviouslyImported && _mediaView != null) {
					cfg.isReturning = true;
					showView(_mediaView, cfg);
				}
				else
					showView('home', cfg);
			};

			this.checkError = function(saveBtn)
			{
				var hasError = false;

				if ( _selectedView == 'configure' ) {
					if(_selectedViewParams.fromService && app.appCfg.mediaPickerSkipConfigure) {
						hasError = false;
					}
					else {
						hasError = _views[_selectedView].checkError(saveBtn);
					}
				}
				else if ( _mode == "import" ) {
					hasError = _views[_selectedView].checkError(saveBtn);
				}
				else
					hasError = true;

				container.toggleClass('error', hasError);

				_hasPreviouslyImported = ! hasError;

				return hasError;
			};

			this.getData = function()
			{
				if ( _selectedView == 'configure' ) {
					if(_selectedViewParams.fromService && app.appCfg.mediaPickerSkipConfigure) {
						_selectedViewParams.media.url = _selectedViewParams.media.pic_url;
						return _selectedViewParams.media;
					}
					else {
						return _views[_selectedView].getData();
					}
				}
				else if ( _selectedView == 'picker' && _mode == "import" ) {
					return _views[_selectedView].getData();
				}

				return null;
			};

			this.activate = function()
			{
				backButton.toggle(_selectedView != 'home');
				if ( _selectedView != 'home' ) {
					backButton.off('click').click(function(){
						var previousView = _previousViews.pop() || { name: 'home' };
						showView(previousView.name || 'home', previousView.params, true);
					});
				}
			};

			this.deactivate = function()
			{
				backButton.hide().off('click');
			};

			function showView(view, params, isReturning)
			{
				if ( ! _views[view] )
					return;

				params = params || {};
				params.mode = params.mode || _mode;
				_mode = params.mode;

				if ( view == 'home' )
					_hasPreviouslyImported = false;
				else if ( view != 'configure' )
					_mediaView = view;

				if ( ! isReturning )
					_previousViews.push({
						name: _selectedView,
						params: _selectedViewParams
					});

				_selectedView = view;
				_selectedViewParams = params;

				backButton.toggle(_selectedView != 'home');

				if ( view != 'home' ) {
					_views.home.updateParams(params);
					backButton.off('click').click(function(){
						var previousView = _previousViews.pop() || { name: 'home' };
						showView(previousView.name || 'home', previousView.params, true);
					});
				}

				container.find('.selectorView').hide();
				if(! _selectedViewParams || ! _selectedViewParams.fromService || ! app.appCfg.mediaPickerSkipConfigure || _selectedViewParams.mode == 'showURL') {
					_views[view].present(params);
				}

				// Enable add button for Shortlist when adding by URL
				if (app.appCfg.mediaPickerConfigureForceMode == "shortlist") {
					if(view == 'picker' && _mode == "import") {
						$('.opt-select-all-container').show();
					}
					else {
						$('.opt-select-all-container').hide();
					}
					container.parents('.modal-content').find('.modal-footer .btnSubmit')
						.toggle(view == 'configure' || _mode == "import");
				}

				onDataChangeCallback && onDataChangeCallback(_mode);
			}

			function init()
			{
				//
			}
		};
	}
);
