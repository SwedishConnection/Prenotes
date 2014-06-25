/**
   Copyright 2014 Swedish Connection
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
   limitations under the License.
*/

// Express
// --------
// This file is the Express entrypoint.
//
var express = require('express');
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');


// Global configuration
// --------------------
// [Global objects](http://nodejs.org/api/globals.html) let us pass
// an environment specific configuration into all modules.
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
	app.use(express.static(path.join(__dirname, '../client')));
  app.use(express.cookieParser());
  app.use(express.bodyParser());

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
