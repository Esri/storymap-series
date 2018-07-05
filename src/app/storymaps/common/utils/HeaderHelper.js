define([
        "./SocialSharing",
        "../ui/share/ShareDialog",
        "storymaps/common/utils/CommonHelper"
    ],
	function(
		SocialSharing,
		ShareDialog,
		CommonHelper
	){
		var _shareDialog = new ShareDialog($("#shareDialog"));

		function resizeLinkContainer(container)
		{
			if ( container.find(".linkContainer").parent().length ) {
				container.find(".linkContainer").css(
						"width",
						// TODO remove that ugly hack (186 is the width of the responsive view header container)
						(container.find(".logoContainer").position()||{ left: 186 }).left
						- container.find(".linkContainer").parent().position().left
						- container.find(".shareBtns").outerWidth()
						// need a margin if there is a logo
						- ($(".logoContainer").width() > 1 ? 14 : 4)
					);
			}
		}

		return {
			setLogo: function(container, headerCfg, resizeCallback)
			{
				if ( ! headerCfg.logoURL || headerCfg.logoURL == "NO_LOGO" ) {
					container.find('.logoImg').hide();
					resizeLinkContainer(container);
				}
				else {
					var logoLink = container.find('.logoLink');
					if (headerCfg.logoTarget) {
						logoLink.css('cursor', 'pointer')
										.attr('aria-label', i18n.viewer.a11y ? i18n.viewer.a11y.logoLinkAria : '')
										.attr('href', headerCfg.logoTarget);
					} else {
						logoLink.css('cursor', 'default')
										.removeAttr('href');
					}

					resizeLinkContainer(container);

					var logoImg = container.find('.logoImg');

					logoImg[0].onload = function() {
						resizeLinkContainer(container);
						if ( resizeCallback && typeof(resizeCallback) === "function" )
							resizeCallback();
					};
					logoImg[0].onerror = function() {
						resizeLinkContainer(container);
					};

					logoImg.attr("src", CommonHelper.possiblyAddToken(headerCfg.logoURL))
									.attr('alt', i18n.viewer.a11y ? i18n.viewer.a11y.logoAria : '')
									.show();
				}
			},
			setLink: function(container, headerCfg)
			{
				if( headerCfg.linkURL && headerCfg.linkText )
					container.find('.linkContainer').html('<a href="' + headerCfg.linkURL + '" class="link" target="_blank">' + headerCfg.linkText + '</a>');
				else
					container.find('.linkContainer').html(headerCfg.linkText);
			},
			setSocial: function(container, headerCfg)
			{
				var appCfg = app.cfg.HEADER_SOCIAL,
					userCfg = headerCfg.socialBtn,
					enableFacebook = appCfg && appCfg.facebook && (!userCfg || userCfg.facebook),
					enableTwitter = appCfg && appCfg.twitter && (!userCfg || userCfg.twitter),
					enableBitly = appCfg && appCfg.bitly && appCfg.bitly.enable && appCfg.bitly.login
						&& appCfg.bitly.key && (!userCfg || userCfg.bitly);

				container.find(".share_facebook").toggleClass(
					'active',
					enableFacebook
				);

				container.find(".share_twitter").toggleClass(
					'active',
					enableTwitter
				);

				container.find(".share_bitly").toggleClass(
					'active',
					enableBitly
				);

				container.find(".share-all")
					.data('share-facebook', enableFacebook)
					.data('share-twitter', enableTwitter)
					.toggleClass(
						'active',
						enableFacebook || enableTwitter || enableBitly
					);
			},
			toggleSocialBtnAppSharing: function(container, disable)
			{
				// TODO has to reset the correct title here so if user share the app the "Share on xyz" is present
				if ( disable ) {
					container.find(".shareIcon").attr("title", "");
				}

				container.find(".shareIcon")
					.toggleClass("disabled", !! disable)
					.tooltip(disable ? {
						title: i18n.commonCore ? i18n.commonCore.builderPanel.tooltipNotShared : "",
						container: 'body'
					} : 'destroy');
			},
			disableSocialBtnAppSharingAutoplay: function(container, placement)
			{
				container.find(".shareIcon").attr("title", "");

				container.find(".shareIcon")
					.toggleClass("disabled", true)
					.tooltip({
						title: i18n.viewer.headerFromCommon.tooltipAutoplayDisabled,
						container: 'body',
						placement: placement ? placement : 'bottom'
					});
			},
			initEvents: function(container/*, bitlyPlacement*/)
			{
				// force tab order from header to panel even though it would naturally go to mainstage
				if (app.ui && app.ui.accordionPanel) {
					container.off('keydown').on('keydown', function(evt) {
						if (evt.keyCode !== 9 || evt.shiftKey || app.isInBuilder || app.data.getWebAppData().getLayoutId() !== 'accordion') {
							return;
						}
						var focusables = container.find(app.appCfg.focusable).filter(':visible');
						var focusElem = $(':focus');
						var focusIndex = focusables.index(focusElem);
						if (focusIndex === focusables.length - 1) {
							app.ui.accordionPanel.focus(0);
							return false;
						}
					});

				}
				container.find(".share_facebook").off('click').click(function(){
					if ( $(this).hasClass("disabled") )
						return;

					var title = $('<div>' + (app.data.getWebAppData().getTitle()||'') + '</div>').text(),
						subtitle = $('<div>' + (app.data.getWebAppData().getSubtitle()||'') + '</div>').text();

					SocialSharing.shareFacebook(
						title,
						subtitle,
						null,
						$(this).data('url')
					);
				});
				container.find(".share_twitter").off('click').click(function(){
					if ( $(this).hasClass("disabled") )
						return;

					var title = $('<div>' + (app.data.getWebAppData().getTitle()||'') + '</div>').text();

					SocialSharing.shareTwitter(
						title,
						$(this).data('url')
					);
				});
				/*
				container.find(".share_bitly").off('click').click(function(){
					SocialSharing.shareBitly(
						$(this).parent(),
						bitlyPlacement,
						$(this).data('url')
					);
				});
				*/
				container.find(".share_bitly").off('click').click(function(){
					if ( $(this).hasClass("disabled") )
						return;

					var url = $(this).data('url') || document.location.href;

					_shareDialog.present(SocialSharing.cleanURL(url, true));
				});

				container.find(".share-all").off('click').click(function(){
					if ( $(this).hasClass("disabled") )
						return;

					var url = $(this).data('url') || document.location.href;

					_shareDialog.present(
						SocialSharing.cleanURL(url, true),
						{
							facebook: !! $(this).data("share-facebook"),
							twitter: !! $(this).data("share-twitter")
						}
					);
				});

				// Bind keyboard enter to click
				container.find(".shareIcon, .share-all").off('keypress').keypress(function (e) {
					if(e.which == 13) {
						$(this).click();
						return false;
					}
				});

				var headerStrs = i18n.viewer.headerFromCommon;

				container.find('.share_facebook').attr("title", headerStrs.facebookTooltip).attr('aria-label', headerStrs.facebookTooltip);
				container.find('.share_twitter').attr("title", headerStrs.twitterTooltip).attr('aria-label', headerStrs.twitterTooltip);
				container.find('.share_bitly').attr("title", headerStrs.bitlyTooltip).attr('aria-label', headerStrs.bitlyTooltip);

				$(window).resize(function(){
					resizeLinkContainer(container);
				});
			}
		};
	}
);
