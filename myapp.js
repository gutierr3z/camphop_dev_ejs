var pgp = require( 'pg-promise' )(/*options*/)

var MYAPP = ( function() {
    /*
    -------------------------------------------------------------
    */
    // DATABASE
    var db = pgp( 'postgres://postgres:oova@localhost:5432/camping' );
    // db = pgp( 'postgres://postgres:oova@localhost:5433/camping' );
    // db = pgp( 'postgres://lipotmujqxlpqp:942c5578a0c0cd60928ae78651b4134f9a74b859a06c3be8934fa2b9ef395c50@ec2-107-22-211-182.compute-1.amazonaws.com:5432/d232e3aq43o7fj' );
    var trips = [];
    var trip = null;

    var sql = 'SELECT * FROM tbl_trips AS trips JOIN tbl_campgrounds AS camp ON trips.fld_campground_id::int = camp.id ORDER BY trips.id DESC'

    db.any( sql, [true] ).then( function( data ) {

        data.forEach( function( item ) {
            trips.push({
                'id'                : item.id,
                'tripNumber'        : item.fld_trip_number,
                'campgroundName'    : item.fld_name,
                'arrivalDate'       : item.fld_arrival_date,
                'departureDate'     : item.fld_departure_date,
                'siteNumber'        : item.fld_site_number,
                'latitude'          : item.fld_latitude,
                'longitude'         : item.fld_longitude,
                'searchKeywords'    : item.fld_search_keywords,
                'memo'              : item.fld_memo
            });
        });

    }).catch( function( error ) {

        console.log( error );
    });
    /*
    -------------------------------------------------------------
    */
    function _listOfTrips() {

        return trips;
    };
    /*
    -------------------------------------------------------------
    */
    function _individualTrip( num ) {

        trips.forEach( function( item ) {
            if( item.tripNumber == num ) {
                trip = item;
            }
            
            
        });
        console.log( 'tripxx:', trip );
        return trip;
    };
    /*
    -------------------------------------------------------------
    */
    return {
        listOfTrips: _listOfTrips,
        individualTrip: _individualTrip
    };
    /*
    -------------------------------------------------------------
    */
})();
module.exports = MYAPP;

// ( function( exports ) {
// })( typeof exports === 'undefined' ? this.share = {} : exports );
// })( exports );
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