window.OOVA = window.OOVA || {};
window.OOVA.geoLocation = ( function( $ ) {
	/*
    -------------------------------------------------------------
    PRIVATE PROPERTIES
    -------------------------------------------------------------
    */

	var map = null,
		listLIs = '',
		listData = null,

		listUL = '.oo-list ul',
		listLink = '.oo-list ul li a',

		campDate = '.oo-camp-date',
		campSite = '.oo-camp-site',
		campLat = '.oo-camp-lat',
		campLong = '.oo-camp-long',
		header = '.oo-brand',
		
		tackContent = '',

		visitedLinkColor = '#999999',
        currentLinkColor = '#ff9900';
        
	/*
    -------------------------------------------------------------
    PRIVATE METHODS
    -------------------------------------------------------------
    */
	function _showMap( lati, long ) {
		
		// get latitude and longitude for the map's focus
		var googleLatAndLong = new google.maps.LatLng( lati, long );
		
		// map options
		var mapOptions = {
			zoom: 14,
			center: new google.maps.LatLng((lati - .0040),long),
			disableDefaultUI: true,
			zoomControl: false,
			// mapTypeId: google.maps.MapTypeId.HYBRID
			mapTypeId: google.maps.MapTypeId.TERRAIN
		};

		// create new map instance and passit to a DOM element, and options above
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
    }
    
	/*
    -------------------------------------------------------------
    */
    
	function _addMarker( map, latlong, content ) {
		
		// create an instance of a marker image
		var pinShadow = new google.maps.MarkerImage(
		    "../images/marker.png",
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
	/*
    -------------------------------------------------------------
    */
	function _updateUIElements( data, key ) {

    	// $( campDate ).html( data[ key ].date || 'N/A' );
		// $( campSite ).html( data[ key ].siteNum || 'N/A' );
		// $( campLat ).html( data[ key ].lat );
		// $( campLong ).html( data[ key ].long );
		// $( header ).html( data[ key ].parkName );
    }
	/*
    -------------------------------------------------------------
    */
	function _initialBuildOfList( data ) {

		// initialize listData for other functions to use
		// listData = data;

		// loop through items in JSON
		// for( var key in data ) {
			
			// populate list of LIs
			// listLIs += "<li><a href='#' data-id='" + data[ key ].id + "'>" + data[ key ].parkName + "</a></li>";

			// populate other UI elements
			// _updateUIElements( data, key );
		// }

		// get last item's values form JSON list
		// tackContent = _tackBubbleMessage( data[ data.length-1 ].parkName, data[ data.length-1 ].siteNum );

		// populate UL with the LIs
		// $( listUL ).html( listLIs );

		// assign last item in list a color
		// _currentLinkColor( $( listUL + " li a[data-id=" + data[ data.length-1 ].id + "]" ), currentLinkColor );
		
		// render the map with the last item in list from JSON
        // _showMap( data[ data.length-1 ].lat, data[ data.length-1 ].long );
        _showMap( '40.872302', '-74.808693' );
        
		
	}
	/*
    -------------------------------------------------------------
    */
	function _tackBubbleMessage( parkName, siteNum ) {

		// return "<span>" + parkName + "</span><br>Site: " + ( siteNum || 'N/A' );
	}
	/*
    -------------------------------------------------------------
    */
	function _changeUIPerClick( id ) {
		
		// loop through items in JSON
		for( var key in listData ) {
			
			// compare attribute's data-id value with id from JSON
			if( parseInt( id ) == parseInt( listData[ key ].id ) ) {

				// populate other UI elements with clicked on item's data from JSON
				// _updateUIElements( listData, key );

				// get clicked on item's values form JSON list
				// tackContent = _tackBubbleMessage( listData[ key ].parkName, listData[ key ].siteNum );
				
				// render the map with clicked on item from JSON
				// _showMap( listData[ key ].lat, listData[ key ].long );
			}		
		}
	}
	/*
    -------------------------------------------------------------
    */
	function _visitedLinkColors( link, visitedColor, currentColor ) {

		// loop through all a tags and assign a color
		// $( listLink ).each( function() {

			// for all links that were visited ( have style attribute )
			// if( $( this ).attr( 'style' ) ) {

				// retain visited color 
				// $( this ).css( 'color', visitedColor );
			// }
		// });

		// pass the current clicked on link 
		// _currentLinkColor( link, currentColor );
	}
	/*
    -------------------------------------------------------------
    */
    function _currentLinkColor( link, color ) {

    	// change color of current link
    	// link.css( 'color', color );
    }
    /*
    -------------------------------------------------------------
    */
	function _init( lati, long ) {
        console.log( 'three' );
        
        _showMap( lati, long );

		// grab item values from JSON file
		// $.getJSON( "./dataCampingTrips.json", function( data ) {
			
			// once JSON data is taken, build the list
			// _initialBuildOfList( data );	

			// click event on every link created from JSON items
			// $( listLink ).on( 'click', function( e ) {

				// e.preventDefault();

				// once a link clicked, give it a color
				// _visitedLinkColors( $( this ), visitedLinkColor, currentLinkColor );

				// update UI with values from item clicked
				// _changeUIPerClick( $( this ).attr( 'data-id' ) );
			// });
		// });
    }
    
	/*
    -------------------------------------------------------------
    PUBLIC INTERFACE
    -------------------------------------------------------------
    */
    return {
        init: _init
    };
    /*
    -------------------------------------------------------------
    */
})( jQuery );

$( document ).ready( function() {
    window.OOVA.geoLocation.init( lati, long );
});
