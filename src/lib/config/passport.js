/**
 * User schema
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');

/**
 * Strategies
 */
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


/**
 * Logger
 */
var logger = require('winston');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    logger.debug("Serialized user [name: %s]", user.name);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne(
      { 'id' : id },

      function(err, user) {
        logger.debug("Deserialized user [name: %s]", user.name);
        done(err, user);
      }
    );
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID : GLOBAL.config.authentication.google.id,
        clientSecret : GLOBAL.config.authentication.google.secret,
        callbackURL : GLOBAL.config.authentication.google.callback
      },

      function(token, refreshToken, profile, done) {

        process.nextTick(function() {
          User.findOne(
            { 'id' : profile.id },

            function(err, user) {
              if (err)
                return done(err);

              if (user) {
                logger.debug("Passing Google, user [name: %s] exists", user.name);
                return done(null, user);
              }
              else {
                User.create(
                  {
                    id: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    authentication: {
                      token: token,
                      origin: 'Google'
                    },
                    created: Date.now(),
                    updated: Date.now()
                  },

                  function (err, somebody) {
                    if (err)
                      console.log("User create failed: %s", err);

                    logger.info("Created user [name: %s]", somebody.name);
                    return done(null, somebody);
                  }
                );
              }

            }
          );
        });
      }
    )
  );
};

