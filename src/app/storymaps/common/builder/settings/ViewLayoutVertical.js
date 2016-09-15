define(["lib-build/tpl!./ViewLayoutVertical",
        "lib-build/css!./ViewLayoutCommon",
		"lib-build/css!./ViewLayoutVertical",
		"lib-build/tpl!./ViewLayoutVerticalItem",
		"dojo/topic"],
	function (viewTpl, commonCss, viewCss, viewItemTpl, topic) {
		return function ViewLayoutVertical()
		{
			var _this = this,
				_titleContainer = null,
				_contentContainer = null,
				_mode = null;

			this.init = function(titleContainer, contentContainer, mode)
			{
				_titleContainer = titleContainer;
				_contentContainer = contentContainer;
				_mode = mode;

				_contentContainer.append(viewTpl({
					initMode: mode == "init",
					explain: i18n.commonCore.settingsLayout.explain,
					helpExplain: mode == "init" ? i18n.commonCore.settingsLayout.explainInit : null,
					start: i18n.commonCore.common.start
				}));

				_contentContainer.find('.help').tooltip({
					placement: 'right',
					trigger: 'hover'
				});
				_contentContainer.find('.btn-start').click(onClickStart);
			};

			this.present = function(settings)
			{
				var layoutIndex = $.map(app.cfg.LAYOUTS, function(layout){
					return layout.id == settings.id;
				}).indexOf(true);

				selectLayout(layoutIndex > 0 ? layoutIndex : 0);

				_contentContainer.find('.layout').click(onLayoutChange);
			};

			this.show = function()
			{
				setTimeout(function(){
					var selectedLayoutTop = _contentContainer.find('.layout.selected').position().top,
						scroll = _contentContainer.find('.layouts')[0].scrollTop + selectedLayoutTop;
					_contentContainer.find('.layouts').scrollTop(
						scroll > 50 ? scroll : 0
					);
				}, 200);
			};

			this.getTitle = function()
			{
				return _titleContainer;
			};

			this.getView = function()
			{
				return _contentContainer;
			};

			this.save = function()
			{
				return {
					id: this.getSelectedLayout()
				};
			};

			this.getSelectedLayout = function()
			{
				return app.cfg.LAYOUTS[_contentContainer.find('.layout.selected').index()].id;
			};

			function onLayoutChange()
			{
				selectLayout($(this).index());
				if ( _mode != "init" )
					topic.publish("SETTINGS_LAYOUT_CHANGE", _this.getSelectedLayout());
			}

			function selectLayout(index)
			{
				_contentContainer.find('.layout').removeClass("selected");
				_contentContainer.find('.layout').eq(index).addClass("selected");
				_contentContainer.find(".btn-start").removeAttr("disabled");
			}

			function onClickStart()
			{
				topic.publish("SETTINGS_LAYOUT_CHANGE", _this.getSelectedLayout());
			}

			this.initLocalization = function()
			{
				_titleContainer.html(i18n.commonCore.settingsLayout.title);

				$.each(app.cfg.LAYOUTS, function(i, layout){
					_contentContainer.find('.layouts').append(viewItemTpl({
						title: layout.title,
						description: layout.description,
						thumbnail: layout.thumbnail,
						viewExample: i18n.commonCore.settingsLayout.viewExample,
						viewExampleURL: layout.liveApp
					}));
				});
			};
		};
	}
);
