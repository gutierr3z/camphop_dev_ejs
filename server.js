var express     = require( 'express' );
var pgp         = require( 'pg-promise' )(/*options*/)
var path        = require ( 'path' );

const myApp     = require ( './myapp' );

// const config = require( './config.json' );

// console.log( 'config=%o', config );

myApp.db = pgp( 'postgres://postgres:oova@localhost:5432/camping' );
// myApp.db = pgp( 'postgres://lipotmujqxlpqp:942c5578a0c0cd60928ae78651b4134f9a74b859a06c3be8934fa2b9ef395c50@ec2-107-22-211-182.compute-1.amazonaws.com:5432/d232e3aq43o7fj' );



const Server = function() {

    var self = this;

    self.setupVariables = function() {

        self.port = process.env.PORT || 8080;
    };

    self.initializeServer = function() {
        
        var self = this;

        self.trips = myApp.listOfTrips();
        self.trip = myApp.individualTrip();

        self.app    = express();

        self.app.set( 'views', __dirname + '/views' ); // optional since express defaults to CWD/views 
        self.app.set( 'view engine', 'ejs' );

        // --------------------------------------------------
        // landing page
        self.app.get( '/', function( req, res ) {

            res.render( 'pages/index', {
                trips: self.trips
            });
        });
        // --------------------------------------------------
        self.app.get( '/trip/:tripId', function( req, res ) {

            console.log( 'three' );
            // var x = self.trip( req.params.tripId );

            res.render( 'pages/trip_page', {
                tripId: req.params.tripId,
                theTrip: myApp.trip
            });
        });
        // --------------------------------------------------
        // Serve public directories
        self.app.use( express.static( path.join( __dirname, 'public' ) ) );
        self.app.use( express.static( path.join( __dirname, 'lib' ) ) );
    };

    self.initialize = function() {

        self.setupVariables();
        
        // Create express server and routes
        self.initializeServer();
    };

    self.start = function() {

        self.app.listen( self.port, function() {
            console.log( '----------------------------------------------------------------------' );
            console.log( 'Node Server started on...', Date( Date.now() ), self.port );
            console.log( '----------------------------------------------------------------------' );
        });
    };
};

var basicServer = new Server();
basicServer.initialize();
basicServer.start();