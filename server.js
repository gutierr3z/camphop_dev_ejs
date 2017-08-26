var express     = require( 'express' );
var path        = require ( 'path' );
var myApp       = require ( './myapp' );

var Server = function() {

    var self = this;

    self.setupVariables = function() {
        self.port = process.env.PORT || 8080;
    };

    self.initializeServer = function() {

        self.app = express();

        self.app.set( 'views', __dirname + '/views' ); // optinal since express defaults to CWD/views 
        self.app.set( 'view engine', 'ejs' );

        // landing page
        self.app.get( '/', function( req, res ) {
            // myApp.home();
            res.render( 'pages/index', {
                test: myApp.home()
            });
        });

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
            console.log( 'Node Server started on...', Date( Date.now() ), self.port );
        });
    };
};

var basicServer = new Server();
basicServer.initialize();
basicServer.start();