
var lati = theTrip.latitude;
var long = theTrip.longitude;
var map = null;
var tackContent = '';

var googleLatAndLong = new google.maps.LatLng( theTrip.latitude, theTrip.longitude );

var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng((lati - .0040),long),
    disableDefaultUI: true,
    zoomControl: false,
    // mapTypeId: google.maps.MapTypeId.HYBRID
    mapTypeId: google.maps.MapTypeId.TERRAIN
};

map = new google.maps.Map( document.getElementById( 'oo-map' ), mapOptions );

// styles array for the map
var mapStyles = [
    {
        stylers: [
            { 
                hue: "#000c01" 
            },
            { 
                saturation: -70 
            }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            { 
                lightness: 100 
            },
            { 
                visibility: "simplified" 
            }
        ]
    },
    {
        featureType: "road",
        elementType: "labels",
        stylers: [
            { 
                visibility: "off" 
            }
        ]
    }
];

// create instance of StyleMapType passing the styles array
var styledMap = new google.maps.StyledMapType( mapStyles, {} );

// associate the styled map with the MapTypeId and set it to display.
map.mapTypes.set( 'map_style', styledMap );
map.setMapTypeId( 'map_style' );
map.setOptions(
  {
      styles: mapStyles
  }
);

// add marker to the map
_addMarker( map, googleLatAndLong, tackContent );

function _addMarker( map, latlong, content ) {
    
    // create an instance of a marker image
    var pinShadow = new google.maps.MarkerImage(
        "images/marker.png",
        null,
        null,
        /* Offset x axis 33% of overall size, Offset y axis 100% of overall size */
        null, 
        new google.maps.Size(37, 46)
    );

    // options for the marker
    var markerOptions = {
        position: latlong,
        map: map,
        clickable: true,
        icon: pinShadow // image created 
    };
    
    // create a marker with options above
    var marker = new google.maps.Marker( markerOptions );
    
    // options for the popup bubble from marker
    var infoWindowOptions = {
        content: content,
        position: latlong
    };
    
    // create instance of bubble
    var infoWindow = new google.maps.InfoWindow( infoWindowOptions );
    
    // listen for click event to open bubble popup 
    google.maps.event.addListener( marker, 'click', function() {

        infoWindow.open( map );
    });
}