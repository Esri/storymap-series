define(["lib-build/tpl!./Popup",
    "lib-build/css!./Popup",
    "storymaps/common/builder/media/MediaSelector",
    "storymaps/common/utils/CommonHelper",
    "../../core/WebApplicationData",
    "../../core/Helper",
    "esri/geometry/Extent",
    "dojo/Deferred",
    "dojo/topic",
    "dojo/has"
  ],
  function (
    viewTpl,
    viewCss,
    MediaSelector,
    CommonHelper,
    WebApplicationData,
    Helper,
    Extent,
    Deferred,
    topic,
    has
  ){
    return function Popup(container)
    {
      container.append(viewTpl({
        btnCancel: i18n.commonCore.common.cancel,
        btnBack: i18n.commonCore.common.back
      }));

      var _popupDeferred = null,
        _cfg = null,
        _visitedViews = null,
        _btnSubmit = container.find(".btnSubmit"),
        _viewMainStage = new MediaSelector(
          container.find('.viewMediaSelectorContainer'),
          {
            onOpenConfigure: toggle,
            onCloseConfigure: toggle
          },
          false,
          onViewMainStageDataChange,
          container.find('.btn-back')
        ),
        _isTemporaryHide = null;

      initEvents();

      this.present = function(cfg)
      {
        _popupDeferred = new Deferred();
        _cfg = cfg;
        _visitedViews = [];

        _isTemporaryHide = false;
        app.isAddEditInProgress = true;

        // Title / submit
        if ( cfg.mode == "add" ) {
          container.find('.modal-logo').removeClass("edit");
          container.find('.modal-title').html(
            i18n.builder.addEditPopup.titleAdd
            + " "
            + app.data.getWebAppData().getLayoutProperties().itemLbl
          );
          _btnSubmit.html(i18n.commonCore.common.add);
        }
        else {
          container.find('.modal-logo').addClass("edit");
          container.find('.modal-title').html(
            i18n.builder.addEditPopup.titleEdit
            + " "
            + app.data.getWebAppData().getLayoutProperties().itemLbl
          );
          _btnSubmit.html(i18n.commonCore.common.save);
        }

        container.find(".title").attr(
          "placeholder",
          i18n.builder.addEditPopup.titlePlaceholder.replace('%LBL_LAYOUT%', app.data.getWebAppData().getLayoutProperties().itemLbl)
        );

        // TODO
        container.toggleClass("isAdding", cfg.mode == "add");
        container.toggleClass("isEditing", cfg.mode != "add");

        // Submit
        updateSubmitButton();

        // Title
        container.find('.titleContainer')
          .removeClass('has-feedback has-error')
          .find('.title').val(cfg.mode == "edit" ? cfg.entry.title : "");

        var showLocationControl = false;

        // If the option is enabled in the settings
        if ( WebApplicationData.getMapOptions().mapsSync === false )
          showLocationControl = true;
        // If it's the first webmap in the project
        else if( cfg.webmaps.length === 0 )
          showLocationControl = true;
        // There is webmap, get the index of the first entry that use a Map
        else {
          // Find first entry the map is used
          var firstMapEntryIndex = Number.MAX_VALUE;
          $.each(cfg.webmaps, function(i, webmap){
            var idx = Math.min.apply(null, webmap.entries);
            firstMapEntryIndex = Math.min(firstMapEntryIndex, idx);
          });

          // cfg.webmap[x].entries start at index 1 unlike cfg.entryIndex
          if ( firstMapEntryIndex === Number.MAX_VALUE || cfg.entryIndex < firstMapEntryIndex )
            showLocationControl = true;
        }

        _viewMainStage.present(
          {
            mode: cfg.mode,
            webmaps: cfg.webmaps,
            media: cfg.entry ? cfg.entry.media : null,
            options: {
              // if the app has an sync option or if they are always NOT sync
              mapsSyncAppOption: app.appCfg.mapsSyncAppOption,
              // Is that entry is sync
              showLocationControl: showLocationControl,
              hideOverview: true
            }
          }
        );

        container.modal({keyboard: true});
        return _popupDeferred;
      };

      this.close = function()
      {
        container.modal('hide');
        _popupDeferred.reject();
      };

      this.getAddEditEntryTitle = function()
      {
        return container.find('.title').val().replace(/<\/?script>/g,'');
      };

      function initEvents()
      {
        container.find('.title').bind('input propertychange', updateSubmitButton);

        container.find('.btnCancel').click(function () {
          container.modal('hide');
          _popupDeferred.reject();
        });

        container.on('shown.bs.modal', function () {
          postDisplay();
          _viewMainStage.postDisplay();
        });

        container.on('hide.bs.modal', function () {
          if ( ! _isTemporaryHide ) {
            app.isAddEditInProgress = false;
            // Need to be done here as can't catch keyboard ESC event
            try {
              _popupDeferred.reject();
            } catch(e){ }

            container.removeClass("temporaryHide");
          }
          else
            _isTemporaryHide = false;
        });

        _btnSubmit.click(onClickSubmit);

        topic.subscribe("TOGGLE-ADD-EDIT", toggle);
      }

      function postDisplay()
      {
        if ( _cfg.layout != "bullet" ) {
          // To prevent the keyboard from flashing if exiting the field without edits
          // TODO in ADD mode open the keyboard by default?
          if ( ! has("ios") )
            container.find('.title').focus();
        }

        updateSubmitButton();
      }

      function toggle()
      {
        if ( container.hasClass("in") ){
          _isTemporaryHide = true;
          container.addClass("temporaryHide");
        }
        else {
          container.removeClass("temporaryHide");
        }

        container.modal('toggle');
      }

      function onViewMainStageDataChange(e)
      {
        // If user just picked a new webmap of the project
        if ( e && e.newMedia && e.newMedia.type == "webmap" ) {
          // If no title hasn't been entered
          if ( ! container.find('.title').val() )
          container.find('.title').val(e.newMedia.webmap.title);
        }
        updateSubmitButton();
      }

      function onClickSubmit()
      {
        var errorInStep = [],
          entryTitle = container.find('.title').val().replace(/<\/?script>/g,''),
          viewMediaData = _viewMainStage.getData();

        var postErrorCheck = function() {
          if ( ! entryTitle && _cfg.layout != "bullet" )
            container.find('.titleContainer').addClass('has-feedback has-error');
          else if ( ! errorInStep.length ){
            var contentActions = _cfg.mode === 'edit' && _cfg.entry.contentActions ? _cfg.entry.contentActions : [];
            // there used to be some calculations here to correct the extent.
            // we're now doing this in the webmapselector for more consistency (hopefully)

            _popupDeferred.resolve({
              title: entryTitle,
              contentActions: contentActions,
              creaDate: Date.now(),
              status: 'PUBLISHED',
              media: viewMediaData.media,
              description: _cfg.mode == "add" ? "" : _cfg.entry.description
            });
            container.modal('hide');
          }
        };

        var mainStageError = _viewMainStage.checkError(_btnSubmit);

        if ( mainStageError instanceof Deferred ) {
          mainStageError.then(function(hasError){
            if ( hasError )
              errorInStep.push(0);
            postErrorCheck();
          });
          return;
        }
        else if ( mainStageError )
          errorInStep.push(0);

        postErrorCheck();
      }

      function updateSubmitButton()
      {
        var entryTitle = container.find('.title').val().replace(/<\/?script>/g,''),
          viewMediaData = _viewMainStage.getData(),
          disableButton = true;

        if ( (entryTitle || _cfg.layout == "bullet")
            && viewMediaData.media && viewMediaData.media.type && viewMediaData.media[viewMediaData.media.type] )
          disableButton = false;

        if ( _cfg.mode == "edit" )
          _btnSubmit.html(i18n.commonCore.common.save);
        else
          _btnSubmit.html(i18n.commonCore.common.add);

        _btnSubmit.toggleClass("disabled", !! disableButton);
        if ( disableButton ) {
          var tooltip = i18n.builder.addEditPopup.stepMainStageNextTooltip;

          container.find('.btnSubmitWrapper')
            .tooltip('destroy')
            .tooltip({
              container: '.btnSubmitTooltipContainer',
              title: tooltip.replace('%LBL_LAYOUT%', app.data.getWebAppData().getLayoutProperties().itemLbl.toLowerCase())
            }
          );
        }
        else
          container.find('.btnSubmitWrapper').tooltip('destroy');
      }

      this.initLocalization = function()
      {
        //
      };
    };
  }
);