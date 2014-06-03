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
var passport = require('passport');
var flash = require('connect-flash');


/**
 * Configuration
 */
var env = process.env.NODE_ENV || 'development';
GLOBAL.config = require('./lib/config/settings')[env];


/**
 * Logging
 */
require('./lib/config/logging');


/**
 * Database
 */
require('./lib/config/database');


/**
 * Security
 */
require('./lib/config/passport')(passport);


/**
 * Start dispatcher
 */
var dispatcher = require('./lib/dispatcher');
var userStore = require('./lib/store/user');
var storeConstants = require('./lib/constant/store');


/**
 * Express
 */
var app = express();
app.configure(function() {
	app.use(express.static(__dirname));
  app.use(express.cookieParser());
  app.use(express.bodyParser());

  // passport
  app.use(express.session({ secret: 'swedishconnection' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());
});


/**
 * Routes
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

app.get(
  '/auth/google',
  passport.authenticate(
    'google',
    { scope : ['profile', 'email'] }
  )
);

app.get(
  '/auth/google/callback',
  passport.authenticate(
    'google',
    { successRedirect : '/notification', failureRedirect : '/' }
  )
);

app.get(
  '/notification',
  isLoggedIn,
  function(req, res) {
    res.send(req.user.name);
  }
);


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}


/**
 * Server startup
 */
console.log("Listening on port %d", GLOBAL.config.application.port);
app.listen(GLOBAL.config.application.port);
