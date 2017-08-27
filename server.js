var express     = require( 'express' );
var pgp         = require( 'pg-promise' )(/*options*/)
var path        = require ( 'path' );

// var db = pgp( 'postgres://postgres:oova@localhost:5432/camping' );

var myApp       = require ( './myapp' );

myApp.db = pgp( 'postgres://postgres:oova@localhost:5432/camping' );
// myApp.pgp = pgp;



var Server = function() {

    this.setupVariables = function() {
        this.port = process.env.PORT || 8080;
    };

    this.initializeServer = function() {

        this.app    = express();

        this.app.set( 'views', __dirname + '/views' ); // optional since express defaults to CWD/views 
        this.app.set( 'view engine', 'ejs' );

        // landing page
        this.app.get( '/', function( req, res ) {
            console.log( 'len', myApp.home().length );
            res.render( 'pages/index', {
                trips: myApp.home(),
                test: 'hello'
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