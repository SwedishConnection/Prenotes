/**
 * Prenotes: Pre-Notes is shorthand for Pre-school Notifications.
 * The project hopes to support both staff and parents communicate
 * online.  The majority of communication is notifications.
 */

/**
 * Third-party modules
 */
var express = require('express');
var path = require('path');


/**
 * Configuration
 */
var env = process.env.NODE_ENV || 'development';
GLOBAL.config = require('./lib/config/environment')[env];


/**
 * Setup database
 */
require('./lib/config/database');

/**
 * Start dispatcher
 */
var dispatcher = require('./lib/dispatcher');
var userStore = require('./lib/store/user');
var storeConstants = require('./lib/constant/store');


/**
 * Routes
 */
var app = express();
app.configure(function() {
	app.use(express.static(__dirname));
});
app.use(express.bodyParser());


/**
 * Create user
 */
app.post(
  '/create/user',
  function(req, res) {
    dispatcher.dispatch(
      {
        source: 'application',
        action: {
          target: 'user',
          type: storeConstants.CREATE
        },
        user: {
          name: req.body.user.name
        }
      }
    );

    res.end();
  }
);


/**
 * Server startup
 */
console.log("Listening on port %d", process.env.PORT || 4730);
app.listen(process.env.PORT || 4730);
