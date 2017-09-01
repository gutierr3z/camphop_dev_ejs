( function( exports ) {

    exports.sql = {
        trips: 'SELECT * FROM tbl_trips AS trips JOIN tbl_campgrounds AS camp ON trips.fld_campground_id::int = camp.id ORDER BY trips.id DESC',
        trip: 'SELECT * FROM tbl_trips WHERE fld_trip_number = '
    };

    exports.trips = [];
    exports.trip;
    
    // HOME
    exports.listOfTrips = function() {

        var self = this;

        // self.trips = [];
 
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

        }).catch( function( error ) {

            console.log( error );
        });

        return self.trips;
    };
    // /HOME

    exports.individualTrip = function( itemx ) {

        var self = this;
        // self.trip;

        return function( itemx ) {

            console.log( 'two' );
            var xxx;
            
            self.db.any( "SELECT * FROM tbl_trips WHERE fld_trip_number = '" + itemx +  "'", [true] ).then( function( data ) {
                // data.forEach( function( item ) {
                    xxx = {
                        id                  : data.id,
                        campId              : data.fld_campground_id,
                        tripNum             : data.fld_trip_number,
                        arrivalDate         : data.fld_arrival_date,
                        departureDate       : data.fld_departure_date,
                        siteNum             : data.fld_site_number,
                        lat                 : data.fld_latitude,
                        long                : data.fld_longitude,
                        keywords            : data.fld_search_keywords,
                        memo                : data.fld_memo
                    };
                // });
            }).catch( function( error ) {

                console.log( error );
            });
            

            return xxx;

        };
    };

    // return exports;

})( typeof exports === 'undefined' ? this.share = {} : exports );