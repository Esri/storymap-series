define(["lib-build/css!./InlineEditor",
        "storymaps/common/builder/ckeditor/plugins/storymapsInlineMedia/dialog/Media",
		"dojo/topic"
	], 
	function(
		viewCss,
		EditorDialogInlineMedia,
		topic
	){		
		var _editorDialogInlineMedia = null,
			_isInit = false;
	
		return function InlineEditor()
		{
			if ( ! _editorDialogInlineMedia )
				_editorDialogInlineMedia = new EditorDialogInlineMedia($("#editorDialogInlineMedia"));
			
			this.init = function(container, options)
			{
				/* TODO: mutualize editor config with MJ but keep flexible
				 * Should rely on the regular config.js ?
				 * how to mix the two different config style?
				 */
				
				options = options || {
					extraPlugins: 'storymapsInlineMedia,autogrow',
					resize_enabled: false,
					toolbar: [
						{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'RemoveFormat' ] },
						{ name: 'colors', items: [ 'TextColor' ] },
						{ name: 'styles', items: [ 'FontSize' ] },
						{ name: 'insert', groups: [ 'storymapsInlineMedia' ], items: [ 'InlineMedia' ] },
						{ name: 'links', items: [ 'Link', 'Unlink' ] },
						{ name: 'paragraph', groups: [ 'list', 'align' ], items: [ 'NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] }
					],
					uiColor: '#FCFCFC',
					contentsCss: app.isProduction ? 'resources/lib/ckeditor/editor.css' : 'app/storymaps/common/builder/ckeditor/editor.css',
					autoGrow_onStartup: true,
					linkShowAdvancedTab: false,
					linkShowTargetTab: false,
					
					/*
					 * Content filtering
					 */
					
					extraAllowedContent: 'h1 h2 h3 h4 h5 h6 sub sup table tr th td caption div span img figure figcaption iframe; *(*); *[*]; a[data-*]',
					// Elements to be removed when executing the "remove " format" command
					removeFormatTags: 
						// Default
						'b,big,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var' 
						+ ',h1,h2,h3,h4,h5,h6',
					// Copy/paste magic
					pasteFromWordRemoveFontStyles: false,
					pasteFromWordRemoveStyles: false,
					
					/*
					 * Spell checker
					 */
					removePlugins: 'liststyle,tableresize,tabletools,contextmenu',
					disableNativeSpellChecker: false
				};
				
				CKEDITOR.on('instanceCreated', function(event) {
					var editor = event.editor;
					
					// TODO make a clean callback
					var tmpCallback = function(){
						var editorContainer = $(editor.container.$).parents('.entry');
						var text = editor.getData();
						
						// That special character that can be copy/pasted from word would break the story after it his saved on Portal and reloaded  
						text = text.replace(new RegExp(String.fromCharCode(8232), 'g')," ");
						
						topic.publish("BUILDER-UPDATE-ENTRY-DESCRIPTION", {
							index: editorContainer.index(),
							value: text
						});
					};
					
					editor.on('blur', tmpCallback);
					editor.on('change', tmpCallback);
					
					// Disable double click edit on links
					editor.on('doubleclick', function(evt) {
						var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;
						
						if ( element.is('a') ) {
							evt.data.dialog = (element.getAttribute('name') && (!element.getAttribute('href') || !element.getChildCount())) ? 'anchor' : 'link';
							editor.getSelection().selectElement( element );
							return false;
						}
					});
					
					// Update Main Stage Actions button status on mouse UP
					// This is the only way to have an event when the highlighted text change
					// Buttons are enabled when cursor is on a correct action link or when some text is selected
					editor.on('contentDom', function() {
						// Resize the Iframe with fit positioning to have the final aspect ratio 
						// Same ratio than in StoryText
						// Timeout needed all the time but first time editor is open, wait popup ready?
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
					});
					
					editor.on('selectionChange', function(evt) {
						if ( editor.readOnly )
							return;
						
						var command = editor.getCommand('link'),
							element = evt.data.path.lastElement && evt.data.path.lastElement.getAscendant( 'a', true ),
							elementIsAction = element && element.getName() == 'a' && element.getAttribute('data-storymaps') && element.getChildCount();
						
						command.setState(elementIsAction ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF);
					});
				});
				
				CKEDITOR.on('instanceReady', function(event) {
					var editor = event.editor;
					
					// Inline media
					// TODO css?
					container.find('.cke_button__inlinemedia, .cke_button__inlinemedia .cke_button_icon').css("width", 27);
					container.find('.cke_button__inlinemedia .cke_button_icon').css("background-size", 27);
					
					// Disable link by default
					event.editor.getCommand('link').setState(CKEDITOR.TRISTATE_DISABLED);
					
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
					
					/*
					// TODO create huge issue with inline media editing in the same session
					// Force autogrow and panel layout rules
					setTimeout(function(){
						editor.fire('contentDom');
						topic.publish("CORE_RESIZE");
					}, 50);
					*/
				});
				
				// Set target="_blank" for links
				CKEDITOR.on('dialogDefinition', function(ev) {
					var dialogName = ev.data.name,
						dialogDefinition = ev.data.definition;
					
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
				});
				
				CKEDITOR.replaceAll(function(textarea, config) {
					/*
					 * Filter on textarea that are a child of the container
					 */
					var parentContainerFound = false;
					
					$(textarea).parents().each(function() {
						if ($.inArray(this, container) != -1) {
							parentContainerFound = true;
							return false;
						}
					});
					
					if ( ! parentContainerFound ) 
						return false;
					
					/*
					 * Override the editor config
					 */
					$.each(Object.keys(options), function(i, optKey){
						config[optKey] = options[optKey];
					});
				});
			};
			
			function initEvents()
			{
				if ( _isInit )
					return;
					
				if (!app.isProduction) {
					CKEDITOR.plugins.addExternal(
						'storymapsInlineMedia', 
						'../../app/storymaps/common/builder/ckeditor/plugins/storymapsInlineMedia/'
					);
				}
				
				topic.subscribe("EDITOR-OPEN-INLINE-MEDIA", function(params){
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
					});
				});
				
				_isInit = true;
			}
			
			initEvents();
		};
	}
);