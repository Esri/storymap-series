define(["lib-build/css!./Desktop",
		"../../utils/HeaderHelper",
		"../../builder/InlineFieldEdit",
		"../../utils/CommonHelper",
		"dojo/has",
		"dojo/topic"],
	function(
		viewCss,
		HeaderHelper,
		InlineFieldEdit,
		CommonHelper,
		has,
		topic
	){
		return function Desktop(container, isInBuilder)
		{
			var _this = this;

			this.init = function(hide, title, subtitle, headerCfg, colors, displaySwitchBuilderButton, defaultToCompact)
			{
				setColor(colors);

				if (hide) {
					container.addClass('hideDesktop');
					return;
				}

				// Desktop builder
				if( isInBuilder ) {
					container.addClass('isBuilder');
					title =  "<div class='text_edit_label'>" + (title || i18n.commonCore.inlineFieldEdit.enterTitle) + "</div>";
					title += "<div class='text_edit_icon' title='" + i18n.commonCore.header.title.replace("%TPL_NAME%", app.cfg.TPL_NAME) + "'></div>";
					title += "<textarea rows='1' class='text_edit_input form-control' type='text' spellcheck='true'></textarea>";

					subtitle =  "<span class='text_edit_label'>" + (subtitle || i18n.commonCore.inlineFieldEdit.enterSubtitle) + "</span>";
					subtitle += "<div class='text_edit_icon' title='" + i18n.commonCore.header.subtitle.replace("%TPL_NAME%", app.cfg.TPL_NAME) + "'></div>";
					subtitle += "<textarea rows='3' class='text_edit_input form-control' type='text' spellcheck='true'></textarea>";
				}

				container.find('.title').html(title);
				container.find('.subtitle').html(subtitle);

				// Desktop builder
				if( isInBuilder )
					new InlineFieldEdit(container, editFieldsEnterEvent, editFieldsExitEvent);

				if( ! isInBuilder && ! subtitle ) {
					var isCompact = headerCfg.compactSize === undefined ? defaultToCompact : headerCfg.compactSize;
					if ( ! isCompact ) {
						container.find('.title').css({
							paddingTop: 30,
							height: 90
						});
						container.find('.subtitle').css("height", 32).attr("tabindex", "-1");
					}
				}

				if ( displaySwitchBuilderButton ) {
					var switchBuilderBtn = container.find(".switchBuilder")
						.html('<span class="glyphicon glyphicon-cog"></span>' + i18n.viewer.headerFromCommon.builderButton + '<span aria-hidden="true" class="switch-builder-close">×</span>')
						.click(CommonHelper.switchToBuilder)
						.show();

					var switchBg = switchBuilderBtn.css('background-color');
					if (!app.appCfg.noAppThemes) {
						var appColors = app.data.getWebAppData().getColors();
						if (switchBg && appColors && appColors.header && CommonHelper.colorsAreSimilar(switchBg, appColors.header, true)) {
							switchBuilderBtn.css('box-shadow', '0 0 2px 1px white');
						}
					}


					if ( has("ff") || has("ie") || has("trident") == 7) {
						switchBuilderBtn.find('.switch-builder-close').hide();
					}
					else {
						switchBuilderBtn.find('.switch-builder-close').click(function(){
							switchBuilderBtn.hide();
							$(window).resize();
							return false;
						});
					}
				}

				var urlParams = CommonHelper.getUrlParams();
				var isPreview = (urlParams.preview === 'true' || urlParams.preview === '');
				var isAutoplay = (urlParams.autoplay === 'true' || urlParams.autoplay === '');
				if ( ! app.isInBuilder && app.userCanEdit && has("ie") != 9 && !isPreview && !isAutoplay ) {
					container.find('.error-status').addClass('enabled');
					topic.subscribe("MYSTORIES_SCAN", updateErrorStatus);
					updateErrorStatus("start");
				}

				setHeader(headerCfg, defaultToCompact);
			};

			this.resize = function(widthViewport)
			{
				if ( ! widthViewport )
					widthViewport = $(document).width();

				var rightAreaWidth = Math.max(container.find(".logoImg").outerWidth() + 50, container.find(".rightArea").outerWidth() + 20);
				container.find(".textArea").width(widthViewport - rightAreaWidth - 15);
			};

			this.update = function(headerCfg, colors, defaultToCompact)
			{
				setColor(colors);
				setHeader(headerCfg, defaultToCompact);
			};

			this.getTitle = function()
			{
				if ( isInBuilder )
					return container.find('.title .text_edit_label').html();
				else
					return container.find('.title').html();
			};

			this.getSubtitle = function()
			{
				if ( isInBuilder )
					return container.find('.subtitle .text_edit_label').html();
				else
					return container.find('.subtitle').html();
			};

			this.setTitleAndSubtitle = function(title, subtitle)
			{
				var defaultTitleText = isInBuilder ? i18n.commonCore.inlineFieldEdit.enterTitle : '';
				var defaultSubtitleText = isInBuilder ? i18n.commonCore.inlineFieldEdit.enterSubtitle : '';

				container.find('.title' + (isInBuilder ? ' .text_edit_label' : '')).html(title || defaultTitleText);
				container.find('.subtitle' + (isInBuilder ? ' .text_edit_label' : '')).html(subtitle || defaultSubtitleText);
			};

			this.toggleSocialBtnAppSharing = function(disable)
			{
				HeaderHelper.toggleSocialBtnAppSharing(container, disable);
			};

			/*
			 * 508 tab navigation
			 */

			this.focus = function(p)
			{
				if ( ! p || p.area == "social" ) {
					$("#headerDesktop .shareIcon").attr("tabindex", "0");

					if ( $("#headerDesktop .linkContainer a").length )
						$("#headerDesktop .linkContainer a").attr("tabindex", "0")[0].focus();
					else if ( $("#headerDesktop .linkContainer").length )
						$("#headerDesktop .linkContainer").attr("tabindex", "0")[0].focus();
					else if ( $("#headerDesktop .shareIcon:visible").length )
						$("#headerDesktop .shareIcon")[0].focus();
					else
						focusTitleOrSubtitle();
				}
				else {
					focusTitleOrSubtitle();
				}
			};

			this.enableAutoplay = function()
			{
				HeaderHelper.disableSocialBtnAppSharingAutoplay(container);
			};

			function focusTitleOrSubtitle()
			{
				if ( $("#headerDesktop .subtitle:visible").length )
					$("#headerDesktop .subtitle")[0].focus();
				else
					$("#headerDesktop .title")[0].focus();
			}

			/*
			 * Styling
			 */

			function setColor(colors)
			{
				if (!app.appCfg.noAppThemes) {
					container.css("background-color", colors.header);
					container.find(".textArea").css("color", colors.headerTitle);
					container.find(".rightArea").css("color", colors.headerText);
					var subtitle = container.find('.subtitle');
					if (colors.name.match(/-org$|-modified$/)) {
						subtitle.css({color: colors.headerTitle, opacity: 0.8});
					} else {
						subtitle.css({color: colors.headerText});
					}
				}
			}

			function setHeader(headerCfg, defaultToCompact)
			{
				var isCompact = headerCfg.compactSize === undefined ? defaultToCompact : headerCfg.compactSize;

				HeaderHelper.setLogo(container, headerCfg, _this.resize);
				HeaderHelper.setLink(container, headerCfg);
				HeaderHelper.setSocial(container, headerCfg);
				HeaderHelper.initEvents(container, "bottom");

				container.toggleClass('compact', isCompact);

				// Prevent logo and social links to be properly aligned
				if ( isCompact ) {
					container.find(".rightArea").hide();
					setTimeout(function(){
						container.find(".rightArea").show();
					}, 0);
				}
			}

			/*
			 * My Stories
			 */

			function removeErrorStatus()
			{
				container.find('.check-story').hide();
				if ( ! container.find('.check-story').is(":visible") && ! container.find('.share-story').is(":visible") ) {
					container.find('.error-status').removeClass("enabled");
				}
				_this.resize();
				return false;
			}

			function removeErrorStatus2()
			{
				container.find('.share-story').hide();
				if ( ! container.find('.check-story').is(":visible") && ! container.find('.share-story').is(":visible") ) {
					container.find('.error-status').removeClass("enabled");
				}
				_this.resize();
				return false;
			}

			function updateErrorStatus(status)
			{
				var checkBtn = container.find('.check-story'),
					closeBtn = $('<span aria-hidden="true" class="check-story-close">×</span>'),
					closeBtn2 = $('<span aria-hidden="true" class="check-story-close">×</span>');

				checkBtn.off('click').removeClass("forceEvent").show();

				closeBtn.click(removeErrorStatus);
				closeBtn2.click(removeErrorStatus2);

				if ( status == "start" ) {
					checkBtn
						.html('<span class="small-loader"></span>' +  i18n.viewer.headerFromCommon.checking)
						.append(closeBtn)
						.css("cursor", "default");
				}
				else if ( status == "error" ) {
					checkBtn
						.html(i18n.viewer.headerFromCommon.fix)
						.append(closeBtn)
						.css("cursor", "pointer")
						.click(CommonHelper.switchToBuilder)
						.removeClass('btn-warning')
						.addClass('btn-danger');
				}
				else {
					checkBtn
						.html(i18n.viewer.headerFromCommon.noerrors)
						.append(closeBtn)
						.removeClass('btn-warning')
						.addClass('btn-success');
				}

				// IE and FF has trouble with the close button being inside a button
				if ( (has("ff") || has("ie") || has("trident") == 7) && status != "error" ) {
					checkBtn
						.click(removeErrorStatus)
						.addClass("forceEvent");
				}

				//
				// Sharing
				//

				var shareBtn = container.find(".share-story")
					.html(i18n.viewer.headerFromCommon.notshared)
					.append(closeBtn2)
					.toggle(app.data.getWebAppItem().access == "private" || app.data.getWebAppItem().access == "shared");

				var shareBg = shareBtn.css('background-color');
				if (!app.appCfg.noAppThemes) {
					var colors = app.data.getWebAppData().getColors();
					if (shareBg && colors && colors.header && CommonHelper.colorsAreSimilar(shareBg, colors.header, true)) {
						shareBtn.css('box-shadow', '0 0 2px 1px white');
					}
				}
				_this.resize();
			}

			/*
			 * Builder
			 */

			function editFieldsEnterEvent()
			{
				//
			}

			function editFieldsExitEvent(src, value)
			{
				setTimeout(function(){
					topic.publish("HEADER_EDITED", {
						src: $(src).attr("class").split(' ')[0],
						value: value
					});
					// TODO only if the value has changed
					$(src).removeClass("error");
				}, has("ios") || has("ie") >= 10 ? 700 : 0);

				app.builder.hideSaveConfirmation();
			}

			this.setTitleError = function()
			{
				container.find(".title").addClass("error");
			};

			this.initLocalization = function()
			{

			};
		};
	}
);
