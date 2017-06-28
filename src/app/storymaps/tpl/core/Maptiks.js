define(["dojo/topic"],
  function(topic){
    if (window.location.pathname.endsWith("demo.html")) {
      var demo = true;
      var Lmap = L.map("maptiks-map");
    }
    topic.subscribe("story-loaded-map", function () {
      require(["maptiks"], function (mapWrapper) {
        var container = app.map.container; // the current map div
        var maptiksMapOptions = {
          extent: app.map.extent,
          maptiks_trackcode: "c311cf16-ad79-42b1-97f9-f433be6c8b00",
          maptiks_id: "test:" + app.data.getCurrentEntry().title // from Builder Maptiks settings, ID:tabname
        };
        
        if (!app.map.maptiks) {
          mapWrapper(container, maptiksMapOptions, app.map);
        }
        
        if (demo) {
          var esriExtent = app.map.geographicExtent;
          var leafletExtent = L.latLngBounds([L.latLng(esriExtent.ymin, esriExtent.xmin),L.latLng(esriExtent.ymax, esriExtent.xmax)]);

          Lmap.fitBounds(leafletExtent);

          L.esri.basemapLayer("Gray").addTo(Lmap);

          app.map.maptiks.off("maptiks:track");
          app.map.maptiks.on("maptiks:track", function (e) {
            console.log(e); // prints maptiks parameters
            var position = e.hasOwnProperty("position") ? [e.position[1], e.position[0]] : [e.map_center[1], e.map_center[0]];

            var marker = L.marker(position).addTo(Lmap);
            var contentString = '<div id="content">'+
              "<h1>" + e.action + "</h1><br>" +
              "<pre>" + JSON.stringify(e, null, 2) + "</pre>" + "</div>";
            marker.bindPopup(contentString).openPopup();
          });
        }
      });
    });
  }
);