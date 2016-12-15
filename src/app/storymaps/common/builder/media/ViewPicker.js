define(["lib-build/css!./ViewPicker",
		"lib-build/tpl!./ViewPickerItem"],
	function (
		viewCss,
		viewTplItem
	){
		return function ViewPicker(container, showView, onDataChangeCallback)
		{
			var _params = null;

			this.present = function(params)
			{
				if ( ! params.isReturning ) {
					var outHTML = "";

					_params = params;

					$.each(params.data, function(i, media){
						outHTML += viewTplItem({
							id: i,
							title: media.name,
							thumb: media.thumb_url,
							style: (i%2 === 0) ? "clear:both" : ""
						});
					});

					container.html(outHTML);
				}

				container.off('click');
				container.find('.mediaItem').off('click');

				if(params.mode == "import") {
					$('.opt-checkbox-select-all').attr('checked', false);
					$('.opt-select-all-container').show();

					container.find('.mediaItem').addClass('import');

					$('.opt-checkbox-select-all').off('change').change(function() {
						container.find('.mediaItem').toggleClass('selected', $(this).is(":checked"));
						onDataChangeCallback && onDataChangeCallback("import");
					});

					container.find('.mediaItem').on('click', function() {
						$(this).toggleClass('selected');
						onDataChangeCallback && onDataChangeCallback();
					});
				}
				else {
					container.click(function(e){
						var index = $(e.target).parents(".mediaItem").index();
						if ( index != -1 ) {
							showView('configure', {
								mode: _params.mode,
								fromService: true,
								media: _params.data[index]
							});
						}
					});
				}

				container.find('.mediaItem').removeClass('selected');

				container.show();
			};

			this.getData = function()
			{
				var selected = [];

				if (_params && _params.data) {
					$.each(container.find('.mediaItem.selected'), function(i,n) {
						selected.push(_params.data[$(n).data('id')]);
					});
				}

				return selected;
			};

			this.checkError = function()
			{
				return ! container.find('.mediaItem.selected').length;
			};
		};
	}
);
