( function( exports ) {

    exports.sql = {
        trips: 'SELECT * FROM tbl_trips AS trips JOIN tbl_campgrounds AS camp ON trips.fld_campground_id::int = camp.id ORDER BY trips.id DESC',
        trip: ''
    };

    
    // HOME
    exports.listOfTrips = function() {

        var self = this;
 
        self.db.any( this.sql.trips, [true] ).then( function( data ) {

            // success;

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

            
        
            // for (var i = 0; i < data.length; i++) {

            //     var trip_number = data[i].fld_trip_number;
            //     var campground_name = data[i].fld_name;
            //     var arrival_date = data[i].fld_arrival_date;
            //     var departure_date = data[i].fld_departure_date;
            //     var site_number = data[i].fld_site_number;
            //     var latitude = data[i].fld_latitude;
            //     var longitude = data[i].fld_longitude;
            //     var search_keywords = data[i].fld_search_keywords;
            //     var memo = data[i].fld_memo;
        
            //     exports.trips[i] = { 
            //         tripNumber: trip_number,
            //         campgroundName: campground_name,
            //         arrivalDate: arrival_date,
            //         departureDate: departure_date,
            //         siteNumber: site_number,
            //         latitude: latitude,
            //         longitude: longitude,
            //         searchKeywords: search_keywords,
            //         memo: memo
            //     };
            // }

            console.log( 'xxx', self.trips );
            

        }).catch( function( error ) {

            console.log( error );
        });

        console.log( 'hello', self.trips );

        return self.trips;
    };
    // /HOME

})( typeof exports === 'undefined' ? this.share = {} : exports );