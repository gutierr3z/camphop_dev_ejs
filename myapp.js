( function( exports ) {

    exports.sql = {
        trips: 'SELECT * FROM tbl_trips AS trips JOIN tbl_campgrounds AS camp ON trips.fld_campground_id::int = camp.id ORDER BY trips.id DESC',
        trip: 'SELECT * FROM tbl_trips WHERE fld_trip_number = '
    };

    exports.trips = [];
    exports.trip;

    exports.xxx = {};
    
    // HOME
    exports.listOfTrips = function() {

        var self = this;
 
        self.db.any( self.sql.trips, [true] ).then( function( data ) {

            data.forEach( function( item ) {
                self.trips.push({
                    'id'                : item.id,
                    'tripNumber'        : item.fld_trip_number,
                    'campgroundName'   : item.fld_name,
                    'arrivalDate'      : item.fld_arrival_date,
                    'departureDate'    : item.fld_departure_date,
                    'siteNumber'       : item.fld_site_number,
                    'latitude'          : item.fld_latitude,
                    'longitude'         : item.fld_longitude,
                    'searchKeywords'   : item.fld_search_keywords,
                    'memo'              : item.fld_memo
                });
            });

        }).catch( function( error ) {

            console.log( error );
        });

        return self.trips;
    };
    // /HOME

    //exports.db = exports.db.any( `SELECT * FROM tbl_trips WHERE fld_trip_number = '${ itemx }'`, [true] ).then( function( data ) {

    // }).catch( function( error ) {
        
    //                 console.log( error );
    //             });

    exports.individualTrip = function( x ) {

        var self = this;

        self.obj = {};


        this.trips.forEach( function( item ) {
            if( item.tripNumber == x ) {
                self.obj = item;
            }
        });
                




        return self.obj;
            

        



        // return function( itemx ) {
            
        //     self.db.any( `SELECT * FROM tbl_trips WHERE fld_trip_number = '${ itemx }'`, [true] ).then( function( data ) {

        //             self.xxx={
        //                 'id'                  : data[0].id,
        //                 'campId'              : data[0].fld_campground_id,
        //                 'tripNum'             : data[0].fld_trip_number,
        //                 'arrivalDate'         : data[0].fld_arrival_date,
        //                 'departureDate'       : data[0].fld_departure_date,
        //                 'siteNum'             : data[0].fld_site_number,
        //                 'lat'                 : data[0].fld_latitude,
        //                 'long'                : data[0].fld_longitude,
        //                 'keywords'            : data[0].fld_search_keywords,
        //                 'memo'                : data[0].fld_memo
        //             };

        //     }).catch( function( error ) {

        //         console.log( error );
        //     });
            
        //     console.log( 'hey:', self.xxx.fld_trip_number );
        //     return self.xxx;

        // };
    };


})( typeof exports === 'undefined' ? this.share = {} : exports );