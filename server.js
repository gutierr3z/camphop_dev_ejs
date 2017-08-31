var express     = require( 'express' );
var pgp         = require( 'pg-promise' )(/*options*/)
var path        = require ( 'path' );

const myApp     = require ( './myapp' );

// const config = require( './config.json' );

// console.log( 'config=%o', config );

var local = pgp( 'postgres://postgres:oova@localhost:5433/camping' );
var hero = pgp( 'postgres://lipotmujqxlpqp:942c5578a0c0cd60928ae78651b4134f9a74b859a06c3be8934fa2b9ef395c50@ec2-107-22-211-182.compute-1.amazonaws.com:5432/d232e3aq43o7fj' );

myApp.db = local;



const Server = function() {

    this.setupVariables = function() {

        this.port = process.env.PORT || 8080;
    };

    this.initializeServer = function() {

        var trips = myApp.listOfTrips();
        this.app    = express();

        this.app.set( 'views', __dirname + '/views' ); // optional since express defaults to CWD/views 
        this.app.set( 'view engine', 'ejs' );

        // landing page
        this.app.get( '/', function( req, res ) {

            res.render( 'pages/index', {
                trips: trips,
                test: 'hello'
            });
        });

        this.app.get( '/trip/:tripId', function( req, res ) {

            res.render( 'pages/trip_page', {
                tripId: req.params.sectionId
            });
        });

        // Serve public directories
        this.app.use( express.static( path.join( __dirname, 'public' ) ) );
        this.app.use( express.static( path.join( __dirname, 'lib' ) ) );
    };

    this.initialize = function() {

        this.setupVariables();
        
        // Create express server and routes
        this.initializeServer();
    };

    this.start = function() {

        this.app.listen( this.port, function() {

            console.log( 'Node Server started on...', Date( Date.now() ), this.port );
        });
    };
};

var basicServer = new Server();
basicServer.initialize();
basicServer.start();