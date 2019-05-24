function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 50.7187722, lng: 7.1494367},
    zoom: 17,
    mapTypeId: 'roadmap'
  });

  // Suchleiste erstellen und mit UI element verbinden
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var plz = document.getElementById('plz-input');
  var searchBar = new google.maps.places.SearchBox(plz);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(plz);


  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  map.addListener('bounds_changed', function() {
    searchBar.setBounds(map.getBounds());
  });


  var markers = [];
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

  var markersplz = [];
  searchBar.addListener('places_changed', function() {
    var placesplz = searchBar.getPlaces(); 


    if (places.length == 0) {
      return;
    }

  // Alte Markierungen löschen
  markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

  markersplz.forEach(function(marker) {
      marker.setMap(null);
    });
    markersplz = []; 

    // Für jeden Ort, icon, Name und Standort
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        return;
      }

    var boundsplz = new google.maps.LatLngBounds();
    placesplz.forEach(function(place) {
      if (!place.geometry) {
        return;
      }

      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Neue Markierung für jeden neuen Ort
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

       markersplz.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      })); 

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
      if (place.geometry.viewport) {
        boundsplz.union(place.geometry.viewport);
      } else {
        boundsplz.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    map.fitBounds(boundsplz);
     });
});
}