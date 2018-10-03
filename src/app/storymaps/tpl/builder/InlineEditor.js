define(["lib-build/css!./InlineEditor",
		"lib-build/tpl!./addedit/ViewActionsBtn",
		"storymaps/common/builder/ckeditor/plugins/storymapsInlineMedia/dialog/Media",
		"storymaps/common/builder/ckeditor/plugins/storymapsAction/dialog/Media",
		"storymaps/common/builder/ckeditor/plugins/storymapsAction/dialog/Geocode",
		"storymaps/common/builder/ckeditor/plugins/storymapsAction/dialog/Navigate",
		"../ui/StoryText",
		"dojo/_base/lang",
		"dojo/topic"
	],
	function(
		viewCss,
		actionsBtnTpl,
		EditorDialogInlineMedia,
		EditorDialogMedia,
		EditorDialogGeocode,
		EditorDialogNavigate,
		StoryText,
		lang,
		topic
	){
		var _editorDialogInlineMedia = null,
			_editorDialogMedia = null,
			_editorDialogGeocode = null,
			_editorDialogNavigate = null,
			_isInit = false,
			_ckHandles = {
				instanceCreated: null,
				instanceReady: null,
				dialogDefinition: null
			},
			defaultOptions = {
				extraPlugins: 'storymapsInlineMedia,autogrow,storymapsAction',
				resize_enabled: false,
				toolbar: [
					{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'RemoveFormat' ] },
					{ name: 'colors', items: [ 'TextColor' ] },
					{ name: 'styles', items: [ 'FontSize' ] },
					{ name: 'insert', groups: [ 'storymapsInlineMedia' ], items: [ 'InlineMedia' ] },
					{ name: 'links', items: [ 'Link', 'Unlink' ] },
					{ name: 'document', groups: [ 'mode', 'document', 'doctools', 'tools'], items: [ 'Source', 'Maximize' ] },
					{ name: 'paragraph', groups: [ 'list', 'align' ], items: [ 'NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
					{ name: 'storymapsAction', groups: [ 'storymapsAction' ], items: [ 'Media', 'Geocode', 'Navigate', 'PreviewAction', 'RemoveAction' ] }
				],

				removePlugins: 'liststyle,tableresize,tabletools,contextmenu',
				disableNativeSpellChecker: false,

				/*
				 * Content filtering
				 */

				// extraAllowedContent is in addition to things you can add with the UI (ex: blockquote, strike, underline).
				//
        // the *(*) in extraAllowedContent means any element can have any class and *[*] means any element can have any attribute.
        // otherwise, elements with classes or attributes _get stripped out entirely_
        // including all inserted media (images, webpages, etc). source tag added back in for <audio><source src="..."></source></audio> syntax
        // The separate sanitizer has its own whitelist of attributes, found in MainView.js
        extraAllowedContent: 'h1 h2 h3 h4 h5 h6 sub sup table tr th td caption div span img figure figcaption style audio source iframe' +
                             '; *(*); *[*]; a[data-*]',
				disallowedContent: 'script; *[on*]',
				// Elements to be removed when executing the "remove " format" command
				removeFormatTags:
					// Default
					'b,big,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var'
					+ ',h1,h2,h3,h4,h5,h6',
				// Copy/paste magic
				pasteFromWordRemoveFontStyles: false,
				pasteFromWordRemoveStyles: false,

				uiColor: '#FCFCFC',

				contentsCss: app.isProduction ? 'resources/lib/ckeditor/editor.css' : 'app/storymaps/common/builder/ckeditor/editor.css',

				autoGrow_onStartup: true,
				linkShowAdvancedTab: false,
				linkShowTargetTab: false
			};

		return function InlineEditor()
		{
			if ( ! _editorDialogInlineMedia ) {
				_editorDialogMedia = new EditorDialogMedia($("#addEditPopupDialogMedia")),
				_editorDialogGeocode = new EditorDialogGeocode($("#addEditPopupDialogGeocode")),
				_editorDialogNavigate = new EditorDialogNavigate($("#addEditPopupDialogNavigate")),
				_editorDialogInlineMedia = new EditorDialogInlineMedia($("#editorDialogInlineMedia"));
			}

			this.init = function(container, options)
			{
				/* TODO: mutualize editor config with MJ but keep flexible
				 * Should rely on the regular config.js ?
				 * how to mix the two different config style?
				 */
				options = options || defaultOptions;

				if (_ckHandles.instanceCreated) {
					_ckHandles.instanceCreated.removeListener();
				}
				_ckHandles.instanceCreated = CKEDITOR.on('instanceCreated', lang.partial(onCKEditorInstanceCreated, container));

				if (_ckHandles.instanceReady) {
					_ckHandles.instanceReady.removeListener();
				}
				_ckHandles.instanceReady = CKEDITOR.on('instanceReady', lang.partial(onCKEditorInstanceReady, container));

				// Set target="_blank" for links
				if (_ckHandles.dialogDefinition) {
					_ckHandles.dialogDefinition.removeListener();
				}
				_ckHandles.dialogDefinition = CKEDITOR.on('dialogDefinition', onCKEditorDialogDefinition);

				CKEDITOR.replaceAll(lang.partial(replaceAllCb, container, options));
			};

			function onCKEditorInstanceCreated(container, evt) {
				var editor = evt.editor;
				// because of a bug in this version of ckeditor, we can't destroy
				// and re-instantiate the editors.

				// take this out of the callback so it works with fullscreen editing
				var editorElement = $(editor.element.$);
				var sectionIndex = editorElement.parents('.entry').index();


				var sectionData = app.data.getStoryByIndex(sectionIndex);
				if (sectionData && sectionData.contentActions) {
					editor._textActions = sectionData.contentActions;
				} else {
					editor._textActions = [];
				}

				// this doesn't seem to work like jquery where you can list multiple events
				// on the same line so list 'em separately.
				editor.on('blur', lang.partial(onEditorBlurOrChange, editor, sectionIndex));
				editor.on('change', lang.partial(onEditorBlurOrChange, editor, sectionIndex));

				// Disable double click edit on links
				editor.on('doubleclick', lang.partial(onEditorDoubleClick, editor));

				editor.on('contentDom', lang.partial(onEditorContentDom, container, editor, sectionIndex));

				editor.on('selectionChange', lang.partial(onEditorSelectionChange, editor));

				editor.on('maximize', lang.partial(onEditorMaximize, container, editor));

				// On paste, check if the  content include Main Stage Actions
				//  and duplicate them so they are configurable
				editor.on('paste', lang.partial(onEditorPaste, editor));

				editor.on('mode', lang.partial(onEditorModeChange, editor));
			}

			function onEditorPaste(editor, evt) {
				try {
					var textNode = $(evt.data.dataValue),
						textNodeSingle = textNode.is('a[data-storymaps]'),
						textNodeMulti = textNode.find('a[data-storymaps]');

					if (textNodeSingle) {
						textNodeMulti = [textNode];
					}
					if (textNodeMulti.length) {
						$.each(textNodeMulti, function(i, action){
							var $action = $(action);
							var newActionId = duplicateAction($action.data('storymaps'), editor._textActions);
							if (newActionId) {
								$action.attr('data-storymaps', newActionId);
							}
							else {
								$action.removeAttr('data-storymaps');
								$action.removeAttr('data-storymaps-type');
								$action.replaceWith($action.html());
							}
						});
						evt.data.dataValue = $.fn.append.apply($('<div>'), textNode).html();
					}
				} catch (err) {
					// Could not access copied text probably because it's raw text
				}

			}

			function duplicateAction(id, contentActions)
			{
				// Create an id slightly more complex than usual as user may be copy/pasting multiple ID
				//  at the same time, we can't rely on Date.now to be unique
				var newId = "MJ-ACTION-" + Date.now() + '-' + Math.floor((Math.random() * 99999) + 1);

				var action = $.grep(contentActions, function(action){
					return action.id == id;
				});

				if (action && action.length) {
					var newAction = lang.clone(action[0]);
					newAction.id = newId;
					contentActions.push(newAction);
					return newId;
				}
				else {
					return null;
				}
			}

			function onEditorBlurOrChange(editor, sectionIndex/*, evt*/) {
				var text = editor.getData();

				// That special character that can be copy/pasted from word would break the story after it his saved on Portal and reloaded
				text = text.replace(new RegExp(String.fromCharCode(8232), 'g')," ");

				topic.publish("BUILDER-UPDATE-ENTRY-DESCRIPTION", {
					index: sectionIndex,
					value: text,
					actions: editor._textActions
				});
			}

			function onEditorDoubleClick(editor, evt) {
				var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

				if ( element.is('a') ) {
					evt.data.dialog = (element.getAttribute('name') && (!element.getAttribute('href') || !element.getChildCount())) ? 'anchor' : 'link';
					editor.getSelection().selectElement( element );
					return false;
				}

			}

			// Update Main Stage Actions button status on mouse UP
			// This is the only way to have an event when the highlighted text change
			// Buttons are enabled when cursor is on a correct action link or when some text is selected
			function onEditorContentDom(container, editor, sectionIndex) {
				var editable =  editor.editable();

				editable.attachListener(editable, 'mouseenter', lang.partial(updateMainStageCommand, editor));
				editable.attachListener(editable, 'mousedown', lang.partial(updateMainStageCommand, editor));
				editable.attachListener(editable, 'mouseup', lang.partial(updateMainStageCommand, editor));
				editable.attachListener(editable, 'mouseleave', lang.partial(updateMainStageCommand, editor));
				editable.attachListener(editable, 'keyup', function(){
					$(".cke_wysiwyg_frame").contents().find('body').removeClass("error-no-content");
					updateMainStageCommand(editor);
				});

				// disable geocode action if mainstage content isn't a map
				var sectionData = app.data.getStoryByIndex(sectionIndex);
				if (!sectionData.media || sectionData.media.type !== 'webmap') {
					var geocodeCommand = editor.getCommand('geocodeCommand');
					if (geocodeCommand) {
						geocodeCommand.forceDisabled = true;
					}
				}

				//Touch device -- TODO
				//$("#cke_1_contents > iframe")[0].contentDocument.addEventListener("selectionchange", function(){
				//	$(".cke_wysiwyg_frame").contents().find('body').removeClass("error-no-content");
				//	updateMainStageCommand(editor);
				//}, false);

				//Resize the Iframe with fit positioning to have the final aspect ratio
				//Same ratio than in StoryText
				//Timeout needed all the time but first time editor is open, wait popup ready?
				setTimeout(function(){
					var editorFrame = container.find(".cke_wysiwyg_frame"),
						editorFrameContent = null;

					if ( ! editorFrame.length )
						return;

					try {
						editorFrameContent = editorFrame.contents().find('body');
					}
					catch(e) {
						return;
					}

					if ( ! editorFrameContent.length )
						return;

					editorFrameContent.find(".iframe-container.fit img").css(
						"height",
						container.find(".cke_wysiwyg_frame").width() * 9 / 16
					);

					editorFrameContent.find(".iframe-container").off('click').click(function(){
						var $this = $(this);
						topic.publish("EDITOR-EDIT-INLINE-MEDIA", $this[0]);
					});

					editorFrameContent.find(".image-container > span.cke_widget_wrapper, .cke_widget_element > span.cke_image_resizer_wrapper").off('click').click(function(e){
						var $this = $(this),
							xpos = e.offsetX === undefined ? e.pageX - $this.offset().left : e.offsetX,
							ypos = e.offsetY === undefined ? e.pageY - $this.offset().top  : e.offsetY;

						if (xpos > $(this).width() - 20 && ypos < 20 )
							topic.publish("EDITOR-EDIT-INLINE-MEDIA", $this[0]);
					});
				}, 500);
			}

			function updateMainStageCommand(editor/*, evt*/) {
				var selectedText = editor.getSelection() ? editor.getSelection().getSelectedText() : null,
					path = editor.elementPath(),
					elem = path && path.lastElement && path.lastElement.getAscendant( 'a', true ),
					actionType = elem && elem.getAttribute('data-storymaps-type'),
					elemIsLink = elem && elem.getName() === 'a',
					elemIsZoom = actionType === "zoom",
					elemIsMedia = actionType === "media",
					elemIsNavigate = actionType === "navigate",
					isLinkOrNotSelected = (elemIsLink || !selectedText);

				// Media
				var mediaCommand = editor.getCommand('mediaCommand');
				if (!elemIsMedia && isLinkOrNotSelected) {
					mediaCommand.setState(CKEDITOR.TRISTATE_DISABLED);
				}
				else {
					mediaCommand.setState(CKEDITOR.TRISTATE_OFF);
				}

				// Geocode
				var geocodeCommand = editor.getCommand('geocodeCommand');
				if ((!elemIsZoom && isLinkOrNotSelected) || geocodeCommand.forceDisabled) {
					geocodeCommand.setState(CKEDITOR.TRISTATE_DISABLED);
				}
				else {
					geocodeCommand.setState(CKEDITOR.TRISTATE_OFF);
				}

				// Navigate
				var navigateCommand = editor.getCommand('navigateCommand');
				if (!elemIsNavigate && isLinkOrNotSelected) {
					navigateCommand.setState(CKEDITOR.TRISTATE_DISABLED);
				}
				else {
					navigateCommand.setState(CKEDITOR.TRISTATE_OFF);
				}
			}

			function onEditorSelectionChange(editor, evt) {
				if (editor.readOnly) {
					return;
				}

				var command = editor.getCommand('link'),
					lastEl = evt.data.path.lastElement,
					element = lastEl && lastEl.getAscendant('a', true),
					elementIsAction = element && element.getName() === 'a' && element.getAttribute('data-storymaps') && element.getChildCount();

				command.setState(elementIsAction ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF);
			}

			function onEditorMaximize(container, editor, evt) {
				var isMaximizing = evt.data == 1;
				var btnTitle = isMaximizing ? i18n.builder.textEditor.mainStageDisabled : '';

				var mediaBtn = container.find('.cke_button__media_icon');
				mediaBtn.parents('.cke_toolbar').attr('title', btnTitle);
				mediaBtn.parents('.cke_toolgroup').css({
					opacity: isMaximizing ? 0.2 : 1,
					'pointer-events': isMaximizing ? 'none' : 'initial'
				});
				// these guys are ancestors of the editor div and get display: none when it goes full screen
				// which is problematic and makes the editor not show up. so toggle display: block/'' when maximizing/minimizing.
				$('#descLegendPanel').css({
					display: isMaximizing ? 'block' : ''
				});
				$('#accordionPanel').css({
					display: isMaximizing ? 'block' : ''
				});

				setEditorColors(editor, true);
				editor.config.extraPlugins = 'storymapsInlineMedia,storymapsAction,widget,lineutils,tableresize,confighelper';
			}

			function onEditorModeChange(editor) {
				var isMaximized = false;
				var maxCommand = editor.getCommand('maximize');
				if (maxCommand && maxCommand.state) {
					isMaximized = (maxCommand.state === 1);
				}
				setEditorColors(editor, isMaximized);
			}

			function onCKEditorInstanceReady(container, evt) {
				var editor = evt.editor;

				// html editor and full screen
				container.find(".cke_button__source_label").hide();
				container.find(".cke_button__maximize").parents("cke_toolbar").css("float", "right");

				// fontawesome for preview action so we can change its color later
				$('.cke_button__previewaction').addClass('fa fa-eye');

				//
				// Main Stage actions toolbar
				//

				if (!container.find('.mainstagetooltip').length) {
					container.find(".cke_button__media_icon").parents(".cke_toolgroup")
						.addClass('storyActionsGroup')
						.prepend(actionsBtnTpl(i18n.builder.textEditor));

					container.find('.mainstagetooltip').tooltip({
						html: true,
						trigger: 'hover',
						container: $('#mainStagePanel'),
						template: '<div class="tooltip storyaction"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
						placement: 'bottom'
					});
				}

				// Disable link by default
				editor.getCommand('link').setState(CKEDITOR.TRISTATE_DISABLED);

				editor.filter.addTransformations([
					[
						// Add target="_blank" to link that don't have it or that is set to different value
						{
							element: 'a',
							left: function(el) {
								return el.attributes.target != "_blank";
							},
							right: function(el) {
								// If link isn't a Main Stage action
								if ( ! el.attributes['data-storymaps'] )
									el.attributes.target = "_blank";
							}
						}
					]
				]);

				// setEditorColors(editor);

				/*
				// TODO create huge issue with inline media editing in the same session
				// Force autogrow and panel layout rules
				setTimeout(function(){
					editor.fire('contentDom');
					topic.publish("CORE_RESIZE");
				}, 50);
				*/
			}

			function onCKEditorDialogDefinition(evt) {
				var dialogName = evt.data.name,
					dialogDefinition = evt.data.definition;

				if ( dialogName == 'link' ) {
					var infoTab = dialogDefinition.getContents('info'),
						targetTab = dialogDefinition.getContents('target'),
						targetField = targetTab.get('linkTargetType');

					targetField['default'] = '_blank';
					infoTab.get('linkType').style = 'display: none';
					// Hide the protocol dropdown (unline in MJ shift doesn't works...)
					infoTab.get('urlOptions').children[0].children[0].style = 'display: none';
					infoTab.get('urlOptions').children[0].widths = ["0%", "100%"];
					//infoTab.get('urlOptions').children[0].children.shift();

					// Prevent the dialog from stripping the protocol and forcing to https
					var url = infoTab.get('url');
					url.onKeyUp = function(){};
					url.setup = function(data) {
						this.allowOnChange = false;
						if (data.url) {
							var value = '';
							if (data.url.protocol) {
								value += data.url.protocol;
							}
							if (data.url.url) {
								value += data.url.url;
							}
							this.setValue(value);
						}
						this.allowOnChange = true;
					};
					url.commit = function(data) {
						var url = this.getValue();
						if ( ! url.match(/^http:\/\/|https:\/\/|ftp:|mailto:|\/\//) ) {
							url = 'http://' + url;
						}

						data.url = { protocol: '', url: url };
					};
				}

				// Open inline media cfg on image double click
				if ( dialogName == 'image2' ) {
					dialogDefinition.dialog.show = function(){
						topic.publish("EDITOR-EDIT-INLINE-MEDIA", {});
					};
				}
			}

			function replaceAllCb(container, options, textarea, config) {
				/*
				 * Filter on textarea that are a child of the container
				 */
				var parentContainerFound = false;

				// idk why something simpler doesn't work, but it doesn't seem to.
				// $(textarea.closest(container).length
				$(textarea).parents().each(function() {
					if ($.inArray(this, container) != -1) {
						parentContainerFound = true;
						return false;
					}
				});
				if ( ! parentContainerFound ) {
					return false;
				}

				/*
				 * Override the editor config
				 */
				$.each(Object.keys(options), function(i, optKey){
					config[optKey] = options[optKey];
				});
			}

			function setEditorColors(editor, isMaximized) {
				var colors = app.data.getWebAppData().getColors();
				var editable = editor.editable();
				var bgColor = 'transparent';

				if (colors) {
					if (colors.text) {
						editable.setStyle('color', colors.text);
					}
					if (colors.panel && isMaximized) {
						bgColor = colors.panel;
					}
				}
				editable.setStyle('background-color', bgColor);

				// add styles that will apply to the editor iframe, based on theme colors
				var editableHead = $(editable.$).siblings('head');
				editableHead.find('#link-style, #caption-style').remove();
				if (colors && colors.textLink) {
					editableHead.append('<style id="link-style"> a { color: ' + colors.textLink + '; } </style>');
				}

				var styleTagContents = app.data.getContentStyles();
				editableHead.find('#content-styles').remove();
				$('head').find('#content-styles').remove();
				if (styleTagContents && styleTagContents.length) {
					editableHead.append('<style id="content-styles">' + styleTagContents + '</style>');
					$('head').append('<style id="content-styles">' + styleTagContents + '</style>');
				}
				if (colors && colors.themeMajor && colors.themeMajor.match(/black/)) {
					editableHead.append('<style id="caption-style"> figure figcaption { color: #aaa; } </style>');
				}

			}

			function initEvents()
			{
				if ( _isInit )
					return;

				if (!app.isProduction) {
					CKEDITOR.plugins.addExternal('storymapsAction', '../../app/storymaps/common/builder/ckeditor/plugins/storymapsAction/');
					CKEDITOR.plugins.addExternal('storymapsInlineMedia', '../../app/storymaps/common/builder/ckeditor/plugins/storymapsInlineMedia/');
				}

				topic.subscribe("EDITOR-OPEN-INLINE-MEDIA", onInlineMediaOpen);
				topic.subscribe("EDITOR-PREVIEW", function(params) {
					StoryText.performAction(params.action);
				});

				topic.subscribe("EDITOR-OPEN-GEOCODE", onGeocodeActionOpen);
				topic.subscribe("EDITOR-OPEN-NAVIGATE", onNavigateActionOpen);
				topic.subscribe("EDITOR-OPEN-MEDIA", onMediaActionOpen);

				_isInit = true;
			}

			function onGeocodeActionOpen(params) {
				$('.mediaBackContainer').hide();
				var zoomParam = null;
				if (params.selectedAction && params.selectedAction.type === 'zoom') {
					zoomParam = params.selectedAction.zoom;
				}

				_editorDialogGeocode.present({
					mode: params.selectedAction ? 'edit' : 'add',
					text: params.text,
					edit: {
						zoom: zoomParam
					}
				}).then(function(cfg) {
					// Add
					if (!params.selectedAction) {
						cfg.newAction = {
							id: cfg.id,
							type: 'zoom',
							zoom: cfg.zoom
						};
						params.editorCallback(cfg);
					}
					// Edit
					else {
						params.selectedAction.zoom = cfg.zoom;
					}
					topic.publish('story-entry-reset-map-extent');
					topic.publish('BUILDER_INCREMENT_COUNTER', 1);
				});

			}

			function onNavigateActionOpen(params) {
				$('.mediaBackContainer').hide();
				var navParam = null;
				if (params.selectedAction && params.selectedAction.type === 'navigate') {
					navParam = params.selectedAction.index;
				}
				var selectedAction = params.selectedAction;

				_editorDialogNavigate.present(
					{
						mode: params.selectedAction ? "edit" : "add",
						text: params.text,
						edit: {
							index: navParam
						}
					},
					// TODO: -- really?
					$("#addEditPopup .modal-content").height() - 56
				).then(function(cfg){
					// Add
					if (!selectedAction) {
						cfg.newAction = {
							id: cfg.id,
							type: 'navigate',
							index: cfg.index
						};
						params.editorCallback(cfg);
					}
					// Edit
					else {
						params.selectedAction.index = cfg.index;
						delete params.selectedAction.hiddenSection;
					}
					topic.publish('story-entry-reset-map-extent');
					topic.publish('BUILDER_INCREMENT_COUNTER', 1);
				});
			}

			function onMediaActionOpen(params) {
				$('.mediaBackContainer').hide();
				var selectedAction = params.selectedAction,
					currentSection = app.data.getCurrentSection(),
					currentSectionIsMap = currentSection && currentSection.media && currentSection.media.type == 'webmap',
					mediaParam = null;

				// Edit
				if ( selectedAction )
					mediaParam = selectedAction.type == "media" ? selectedAction.media : null;
				// Add
				else
					mediaParam = currentSectionIsMap ? currentSection.media : null;

				_editorDialogMedia.present(
					{
						mode: selectedAction ? "edit" : "add",
						text: params.text,
						webmaps: app.data.getWebmapsInfo(),
						media: mediaParam
						// TODO: what's this?
						// disableMapExtras: _selectedMediaType == 'webmap'
					},
					// TODO: really?
					$("#addEditPopup .modal-content").height() - 56
				).then(function(cfg){
					// Add
					if (!selectedAction) {
						cfg.newAction = {
							id: cfg.id,
							type: 'media',
							media: cfg.media
						};

						// here's what's happening here: in editorCallback below, a link is being
						// inserted, which triggers `change` to fire. that's all well and good, but then
						// triggering `story-update-entry` with the editor focused blurs the editor,
						// which then chokes on `editor.getData()` in the `onEditorBlurOrChange` callback.
						// i think because of the timing of rebuilding a section, maybe the dom element
						// of the editor disappears? didn't look like it in the UI on breakpoints, but idk.
						// I tried using the `blur` event instead of `setTimeout`, but it didn't always
						// work correctly.
						//
						// Also, use params.editor because sometimes (unpredictably) it's different than
						// CKEDITOR.instances.descriptionEditor.
						var handle = params.editor.on('change', function() {
							params.editor.removeListener('change', handle);
							params.editor.editable().$.blur();
							setTimeout(function() {
								topic.publish('story-update-entry', {index: app.data.getCurrentSectionIndex()});
							}, 500);
						});

						params.editorCallback(cfg);
					}
					// Edit
					else {
						params.selectedAction.media = cfg.media;
						topic.publish('story-update-entry', {index: app.data.getCurrentSectionIndex()});
					}
					topic.publish('story-entry-reset-map-extent');
					topic.publish('BUILDER_INCREMENT_COUNTER', 1);
					//initTextAction();
				});

				// TODO -- what's this?
				// temporaryCopyImageServiceUserName();
			}

			function onInlineMediaOpen(params) {
				$('.mediaBackContainer').hide();
				_editorDialogInlineMedia.present(
					{
						mode: params.selectedMedia ? "edit" : "add",
						edit: {
							media: params.selectedMedia
						}
					},
					290 /* TODO handle null? */
				).then(function(cfg){
					params.editorCallback(cfg);
					// couldn't figure out how to not do a settimeout here. :\
					setTimeout(function() {
						setEditorColors(params.editor);
					}, 500);
				});
			}

			initEvents();
		};
	}
);