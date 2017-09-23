var pgp = require( 'pg-promise' )(/*options*/)

var MYAPP = ( function() {

    var trips = [];
    var trip = null;

    /*
    -------------------------------------------------------------
    */
    // DATABASE
    var db = pgp( 'postgres://postgres:oova@localhost:5432/camping' );
    // db = pgp( 'postgres://postgres:oova@localhost:5433/camping' );
    // db = pgp( 'postgres://lipotmujqxlpqp:942c5578a0c0cd60928ae78651b4134f9a74b859a06c3be8934fa2b9ef395c50@ec2-107-22-211-182.compute-1.amazonaws.com:5432/d232e3aq43o7fj' );
    
    // var db = pgp( 'postgres://luxowkmubxfllq:a3922fea02593861c9e5553a829395036cf35058c5b41726828d86b089c9da1c@ec2-23-23-111-171.compute-1.amazonaws.com:5432/d59ku4cv3n09c9' );


    var sql = 'SELECT * FROM tbl_trips JOIN tbl_campgrounds ON fld_trip_camp_id::int = fld_camp_id ORDER BY fld_trip_id DESC'
    // var sql = 'SELECT * FROM tbl_trips LEFT JOIN tbl_campgrounds ON tbl_campgrounds.id = tbl_trips.fld_campground_id::int';
    // var sql = 'SELECT id AS fld_trip_id, * FROM tbl_trips JOIN tbl_campgrounds ON tbl_trips.fld_campground_id::int = tbl_campgrounds.id ORDER BY tbl_trips.id DESC';
    // var sql = 'SELECT * FROM tbl_campgrounds';

    db.any( sql, [true] ).then( function( data ) {
        console.log( 'data:', data );
        data.forEach( function( item ) {

            trips.push({
                'id'                : item.fld_trip_id,
                'campgroundId'      : item.fld_trip_camp_id,
                'tripNumber'        : item.fld_trip_index,
                'arrivalDate'       : item.fld_trip_arrival_date,
                'departureDate'     : item.fld_trip_departure_date,
                'siteNumber'        : item.fld_trip_site_number,
                'latitude'          : item.fld_trip_latitude,
                'longitude'         : item.fld_trip_longitude,
                'searchKeywords'    : item.fld_trip_search_keywords,
                'memo'              : item.fld_trip_memo,

                'campgroundName'    : item.fld_camp_name,
                'campgroundAddress' : item.fld_camp_address,
                'campgroundPhone'   : item.fld_camp_phone
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

            if( item.id == num ) {

                trip = item;
            }
        });





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