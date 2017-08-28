( function( exports ) {

    exports.trips = [];
    exports.name = 'juan';
    exports.sql = 'SELECT * FROM tbl_trips AS trips JOIN tbl_campgrounds AS camp ON trips.fld_campground_id::int = camp.id';

    // HOME
    exports.listOfTrips = function() {

        this.db.any( this.sql, [true] ).then( function( data ) {

            // success;
        
            for (var i = 0; i < data.length; i++) {

                var trip_number = data[i].fld_trip_number;
                var campground_name = data[i].fld_name;
                var arrival_date = data[i].fld_arrival_date;
                var departure_date = data[i].fld_departure_date;
                var site_number = data[i].fld_site_number;
                var latitude = data[i].fld_latitude;
                var longitude = data[i].fld_longitude;
                var search_keywords = data[i].fld_search_keywords;
                var memo = data[i].fld_memo;
        
                exports.trips[i] = { 
                    tripNumber: trip_number,
                    campgroundName: campground_name,
                    arrivalDate: arrival_date,
                    departureDate: departure_date,
                    siteNumber: site_number,
                    latitude: latitude,
                    longitude: longitude,
                    searchKeywords: search_keywords,
                    memo: memo
                };
            }

        }).catch( function( error ) {

            console.log( error );
        });

        return exports.trips;
    };
    // /HOME

})( typeof exports === 'undefined' ? this.share = {} : exports );