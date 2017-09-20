// ( function( exports ) {
var MYAPP = ( function() {

    var myObj = {};

    var pgp = require( 'pg-promise' )(/*options*/)
    var db = pgp( 'postgres://postgres:oova@localhost:5432/camping' );
    // db = pgp( 'postgres://postgres:oova@localhost:5433/camping' );
    // db = pgp( 'postgres://lipotmujqxlpqp:942c5578a0c0cd60928ae78651b4134f9a74b859a06c3be8934fa2b9ef395c50@ec2-107-22-211-182.compute-1.amazonaws.com:5432/d232e3aq43o7fj' );

    sql = {
        trips: 'SELECT * FROM tbl_trips AS trips JOIN tbl_campgrounds AS camp ON trips.fld_campground_id::int = camp.id ORDER BY trips.id DESC',
        trip: 'SELECT * FROM tbl_trips WHERE fld_trip_number = '
    };

    myObj.trips = [];
    myObj.trip;
    
    // HOME
    myObj.listOfTrips = function() {

        var self = this;
 
        // self.db.any( self.sql.trips, [true] ).then( function( data ) {
        db.any( sql.trips, [true] ).then( function( data ) {

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

    myObj.individualTrip = function( x ) {

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


    return myObj;

// })( typeof exports === 'undefined' ? this.share = {} : exports );
// })( exports );
})();

module.exports = MYAPP;

/*
same as saying, as the signature, an expression:

if( ( typeof exports ) === 'undefined' ) {
    // you are in the browser, pass into func an empty object
    return window.share = {};
} else {
    // you are in node, pass in exports object
    return exports;
}
*/