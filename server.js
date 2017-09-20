var express     = require( 'express' );
var path        = require ( 'path' );
const myApp     = require ( './myapp' );

const Server = function() {

    var self = this;

    self.setupVariables = function() {

        self.port = process.env.PORT || 8080;
    };

    self.initializeServer = function() {
        
        self.app    = express();

        self.app.set( 'views', __dirname + '/views' ); // optional since express defaults to CWD/views 
        self.app.set( 'view engine', 'ejs' );

        // --------------------------------------------------
        // landing page
        self.app.get( '/', function( req, res ) {

            res.render( 'pages/index', {
                trips: myApp.listOfTrips()
            });
        });
        
        // --------------------------------------------------
        // trip pages
        self.app.get( '/trip/:tripId', function( req, res ) {
            
            res.render( 'pages/trip_page', {
                thetripx: 'hello'
            });
        });
        // --------------------------------------------------
        // about
        self.app.get( '/about', function( req, res ) {
            
            res.render( 'pages/about', {} );
        });
        // --------------------------------------------------
        // Serve public directories
        self.app.use( express.static( path.join( __dirname, 'public' ) ) );
        self.app.use( express.static( path.join( __dirname, 'lib' ) ) );
    };

    self.initialize = function() {

        self.setupVariables();
        self.initializeServer();
    };

    self.start = function() {

        self.app.listen( self.port, function() {

            console.log( 'Node Server started on...', Date( Date.now() ), self.port );
        });
    };
};

var basicServer = new Server();
basicServer.initialize();
basicServer.start();