( function( exports ) {

    exports.sql = {
        trips: 'SELECT * FROM tbl_trips AS trips JOIN tbl_campgrounds AS camp ON trips.fld_campground_id::int = camp.id ORDER BY trips.id DESC',
        trip: 'SELECT * FROM tbl_trips WHERE fld_trip_number = '
    };

    
    // HOME
    exports.listOfTrips = function() {

        var self = this;

        self.trips = [];
 
        self.db.any( self.sql.trips, [true] ).then( function( data ) {

            data.forEach( function( item ) {
                self.trips.push({
                    'trip_nuber'        : item.fld_trip_number,
                    'campground_name'   : item.fld_name,
                    'arrival_date'      : item.fld_arrival_date,
                    'departure_date'    : item.fld_departure_date,
                    'site_number'       : item.fld_site_number,
                    'latitude'          : item.fld_latitude,
                    'longitude'         : item.fld_longitude,
                    'search_keywords'   : item.fld_search_keywords,
                    'memo'              : item.fld_memo
                });
            });

            // console.log( 'inside', self.trips.length );

        }).catch( function( error ) {

            console.log( error );
        });

        return self.trips;
    };
    // /HOME

    exports.individualTrip = function( item ) {

        var self = this;

        self.trip = {};

        self.db.any( "SELECT * FROM tbl_trips WHERE fld_trip_number = '" + item +  "'", [true] ).then( function( data ) {

            console.log( 'totally', data[0].fld_memo );

            // data.forEach( function( item ) {
                self.trip = {
                    id                  : data[0].id,
                    campId              : data[0].fld_campground_id,
                    tripNum             : data[0].fld_trip_number,
                    arrivalDate         : data[0].fld_arrival_date,
                    departureDate       : data[0].fld_departure_date,
                    siteNum             : data[0].fld_site_number,
                    lat                 : data[0].fld_latitude,
                    long                : data[0].fld_longitude,
                    keywords            : data[0].fld_search_keywords,
                    memo                : data[0].fld_memo
                }
            // }

        }).catch( function( error ) {

            console.log( error );
        });

        return self.trip
    }


})( typeof exports === 'undefined' ? this.share = {} : exports );