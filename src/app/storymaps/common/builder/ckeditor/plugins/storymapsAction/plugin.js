CKEDITOR.plugins.add('storymapsAction', {
	icons: 'geocode,media,navigate,navigate-vertical,removeAction,previewAction',
	init: function(editor) {

		var elemIfIsAction = function(path) {
			var elem = path.lastElement && path.lastElement.getAscendant( 'a', true ),
				elemIsAction = elem && elem.getName() == 'a' && elem.getAttribute('data-storymaps') && elem.getChildCount();

			if (elemIsAction) {
				return elem;
			}
			return false;

		};

		var getSelectedActionElemAndId = function(path) {
			var elem = elemIfIsAction(path);
			return elem ? {
				elem: elem,
				id: elem.getAttribute('data-storymaps')
			} : null;
		};

		var getSelectedActionFromPath = function(path, textActions) {
			var actionInfo = getSelectedActionElemAndId(path);
			if (!actionInfo || !actionInfo.id) {
				return null;
			}
			var actionId = actionInfo.id;

			if (!actionId || !textActions) {
				return;
			}
			return getSelectedActionFromId(actionId, textActions);
		};

		var getSelectedActionFromId = function(actionId, textActions) {
			var foundAction = null;
			textActions.some(function(action) {
				if (action.id === actionId) {
					foundAction = action;
					return true;
				}
				return false;
			});
			return foundAction;
		};

		var isPreviewableAction = function(path)
		{
			var elem = elemIfIsAction(path);

			if (elem) {
				var actionType = elem.getAttribute('data-storymaps-type');
				if (actionType) {
					return actionType === 'media' || actionType === 'zoom' || actionType === 'navigate';
				}
			}

			return false;
		};

		var getLink = function(path)
		{
			var elem = path.lastElement && path.lastElement.getAscendant('a', true );
			return  elem && elem.getName() == 'a' && elem.getAttribute('href') && elem.getChildCount() ? elem.getAttribute('href') : null;
		};

		var genericExec = function(editor, publishEvent, actionType) {
			var actionInfo = getSelectedActionElemAndId(editor.elementPath());
			var actionId = actionInfo ? actionInfo.id : null;
			var foundAction = getSelectedActionFromId(actionId, editor._textActions);

			require(["dojo/topic"], function(topic) {
				topic.publish(publishEvent, {
					selectedAction: foundAction,
					text: actionInfo ? actionInfo.elem.getHtml() : editor.getSelection().getSelectedText(),
					editor: editor,
					// only for new actions.
					editorCallback: function(cfg){
						genericEditorCallback(editor, actionType, cfg);
					}
				});
			});
		};

		var genericEditorCallback = function(editor, actionType, cfg) {
			var link = editor.document.createElement('a');
			link.setAttribute('data-storymaps', cfg.id);
			link.setAttribute('data-storymaps-type', actionType);
			link.setHtml(cfg.text);
			editor.insertElement(link);
			editor._textActions.push(cfg.newAction);
		};

		/*
		 * Geocode
		 */
		CKEDITOR.geocodeCommand = function(){ };
		CKEDITOR.geocodeCommand.prototype = {
			exec: function(editor) {
				genericExec(editor, 'EDITOR-OPEN-GEOCODE', 'zoom');
			},
			refresh: function(/*editor, path*/) {
				/*
				var elem = path.lastElement && path.lastElement.getAscendant( 'a', true ),
					elemIsLink = elem && elem.getName() == 'a',
					elemIsZoom = elem && elem.getAttribute('data-storymaps-type') == "zoom";

				if (elemIsLink && ! elemIsZoom || this.forceDisabled)
					this.setState(CKEDITOR.TRISTATE_DISABLED);
				else
					this.setState(CKEDITOR.TRISTATE_OFF);
				*/
			},
			contextSensitive: 1,
			startDisabled: 1
		};

		editor.addCommand('geocodeCommand', new CKEDITOR.geocodeCommand());
		editor.ui.addButton( 'Geocode', {
			label: i18n.commonMedia.editorActionGeocode.lblTitle,
			command: 'geocodeCommand',
			toolbar: 'storymaps'
		});

		/*
		 * Change Main Stage media
		 */
		CKEDITOR.mediaCommand = function(){ };
		CKEDITOR.mediaCommand.prototype = {
			exec: function(editor) {
				genericExec(editor, 'EDITOR-OPEN-MEDIA', 'media');
			},
			refresh: function(/*editor, path*/) {
				/*
				var elem = path.lastElement && path.lastElement.getAscendant( 'a', true ),
					elemIsLink = elem && elem.getName() == 'a',
					elemIsMedia = elem && elem.getAttribute('data-storymaps-type') == "media";

				if (elemIsLink && ! elemIsMedia)
					this.setState(CKEDITOR.TRISTATE_DISABLED);
				else
					this.setState(CKEDITOR.TRISTATE_OFF);
				*/
			},
			contextSensitive: 1,
			startDisabled: 1
		};

		editor.addCommand('mediaCommand', new CKEDITOR.mediaCommand());
		editor.ui.addButton('Media', {
			label: i18n.commonMedia.editorActionMedia.lblTitle,
			command: 'mediaCommand',
			toolbar: 'storymaps'
		});

		/*
		 * Navigate
		 */
		CKEDITOR.navigateCommand = function(){ };
		CKEDITOR.navigateCommand.prototype = {
			exec: function(editor) {
				genericExec(editor, 'EDITOR-OPEN-NAVIGATE', 'navigate');
			},
			refresh: function(/*editor, path*/) {
				/*
				var elem = path.lastElement && path.lastElement.getAscendant( 'a', true ),
					elemIsLink = elem && elem.getName() == 'a',
					elemIsMedia = elem && elem.getAttribute('data-storymaps-type') == "media";

				if (elemIsLink && ! elemIsMedia)
					this.setState(CKEDITOR.TRISTATE_DISABLED);
				else
					this.setState(CKEDITOR.TRISTATE_OFF);
				*/
			},
			contextSensitive: 1,
			startDisabled: 1
		};

		editor.addCommand('navigateCommand', new CKEDITOR.navigateCommand());
		var isAccordion = $(editor.element.$).parents('.accordionPanel').length;
		editor.ui.addButton('Navigate', {
			label: i18n.commonMedia.editorActions.navigate,
			command: 'navigateCommand',
			toolbar: 'storymaps',
			icon: isAccordion ? 'navigate-vertical' : 'navigate'
		});

		/*
		 * Remove map action or unlink
		 */

		CKEDITOR.removeCommand = function(){ };
		CKEDITOR.removeCommand.prototype = {
			exec: function(editor) {
				var path = editor.elementPath();
				var foundAction = getSelectedActionFromPath(path, editor._textActions);

				var style = new CKEDITOR.style({ element: 'a', type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1 });
				editor.removeStyle(style);

				if (foundAction) {
					// TODO: consider doing something here to remove the action from the action list
					// however, be careful because a Cmd-Z will put the link back but not the action.
					// so maybe we should clean up actions on app save instead?
					// var idx = editor._textActions.indexOf(foundAction);
					// editor._textActions.splice(idx, 1);
				}


			},
			refresh: function(editor, path) {
				if ( getSelectedActionElemAndId(path) || getLink(path) )
					this.setState(CKEDITOR.TRISTATE_OFF);
				else
					this.setState(CKEDITOR.TRISTATE_DISABLED);
			},
			contextSensitive: 1,
			startDisabled: 1,
			requiredContent: 'a[href]'
		};

		editor.addCommand('removeCommand', new CKEDITOR.removeCommand());
		editor.ui.addButton('RemoveAction', {
			label: i18n.commonMedia.editorActions.remove,
			command: 'removeCommand',
			toolbar: 'storymaps'
		});

		/*
		 * Preview
		 */

		CKEDITOR.previewCommand = function(){ };
		CKEDITOR.previewCommand.prototype = {
			exec: function(editor) {
				var path = editor.elementPath();
				var foundAction = getSelectedActionFromPath(path, editor._textActions);

				if (foundAction) {
					require(["dojo/topic"], function(topic){
						topic.publish("EDITOR-PREVIEW", {
							action: foundAction
						});
					});
				}
				else if ( getLink(path) )
					window.open(getLink(path), '_blank');
			},
			refresh: function(editor, path) {
				if ( isPreviewableAction(path) || getLink(path) )
					this.setState(CKEDITOR.TRISTATE_OFF);
				else
					this.setState(CKEDITOR.TRISTATE_DISABLED);
			},
			contextSensitive: 1,
			startDisabled: 1,
			requiredContent: 'a[href]'
		};

		editor.addCommand('previewCommand', new CKEDITOR.previewCommand());
		editor.ui.addButton('PreviewAction', {
			label: i18n.commonMedia.editorActions.preview,
			command: 'previewCommand',
			toolbar: 'storymapsAction'
		});
	}
});
