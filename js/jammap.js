  var mMap;
  var mSelectedCountrylayer;

  function init() {
      // Create the map with no initial style specified.
      // It therefore has default styling.
      mMap = new google.maps.Map(document.getElementById('map'), {
          center: {
              lat: 52.507,
              lng: 13.412
          },
          zoom: 5,
          maxZoom: 7,
          minZoom: 3,
          mapTypeControl: false
      });

      mMap.setOptions({
          styles: styles['night']
      });

      mMap.addListener('click', function(e) {
          processMapClick(e.latLng);
      });
  }

  function processMapClick(latLng) {
      if (!latLng) return;

      mMap.panTo(latLng);

      var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          latLng.lat() + "," + latLng.lng() + "&sensor=false";

      console.log(url);


      $.get(url, function(data) {

          var selectedCountry = getCountryFromReverseGeocodingJson(data.results[0]);
          console.log(selectedCountry);

          configureSelectedCountryLayer(selectedCountry.short_name);

          configurePlayingNow(selectedCountry);
      });
  }

  function configureSelectedCountryLayer(country_ISO_2DIGIT) {
      if (!country_ISO_2DIGIT) return;

      if (mSelectedCountrylayer) {
          mSelectedCountrylayer.setMap(null);
      }
      mSelectedCountrylayer = new google.maps.FusionTablesLayer({
          query: {
              select: 'geometry',
              from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk',
              where: "ISO_2DIGIT IN ('" + country_ISO_2DIGIT + "')"
          },
          styles: [{
              polygonOptions: {
                  fillColor: "#800080"
              }
          }],
          map: mMap,
          suppressInfoWindows: true
      });
  }

  function getCountryFromReverseGeocodingJson(json) {
      if (!json) return;

      var selectedCountry;
      $.each(json, function(k1, v1) {
          if (k1 == "address_components") {
              for (var i = 0; i < v1.length; i++) {
                  for (k2 in v1[i]) {
                      if (k2 == "types") {
                          var types = v1[i][k2];
                          if (types[0] == "country") {
                              selectedCountry = v1[i];
                          }
                      }
                  }
              }
          }
      });
      console.log("selectedCountry = " + selectedCountry);
      return selectedCountry;
  }

  function configurePlayingNow(selectedCountry) {
      if (!selectedCountry) return;

      $("#playing_now").text(">> " + selectedCountry.long_name);
  }

  var styles = {
      default: null,
      night: [{
          "elementType": "geometry",
          "stylers": [{
              "color": "#212121"
          }]
      }, {
          "elementType": "labels.icon",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "elementType": "labels.text.fill",
          "stylers": [{
              "color": "#757575"
          }]
      }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
              "color": "#212121"
          }]
      }, {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [{
              "color": "#757575"
          }]
      }, {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [{
              "color": "#9e9e9e"
          }]
      }, {
          "featureType": "administrative.land_parcel",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "administrative.locality",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [{
              "color": "#bdbdbd"
          }]
      }, {
          "featureType": "administrative.neighborhood",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "administrative.province",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "poi",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
              "color": "#757575"
          }]
      }, {
          "featureType": "poi.attraction",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "poi.business",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{
              "color": "#181818"
          }]
      }, {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
              "color": "#616161"
          }]
      }, {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [{
              "color": "#1b1b1b"
          }]
      }, {
          "featureType": "road",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [{
              "color": "#2c2c2c"
          }]
      }, {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{
              "color": "#8a8a8a"
          }]
      }, {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [{
              "color": "#373737"
          }]
      }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
              "color": "#3c3c3c"
          }]
      }, {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [{
              "color": "#4e4e4e"
          }]
      }, {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [{
              "color": "#616161"
          }]
      }, {
          "featureType": "transit",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [{
              "color": "#757575"
          }]
      }, {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
              "color": "#000000"
          }]
      }, {
          "featureType": "water",
          "elementType": "labels.text",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
              "color": "#3d3d3d"
          }]
      }]
  };
