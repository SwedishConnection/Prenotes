/**
 * This is template that the developer/installer
 * should copy to the root of the project and
 * modify with the correct environment settings.
 * Grunt pulls copies the "private" copy into
 * the build.  Stuff like authentication shouldn't
 * be publically saved off on Git.
 */
module.exports = {
  development: {
    db: 'tingodb://C:/temp/tingodb',

    logging: {
      filename: 'C:/temp/winston.log',
      level : 'debug'
    },

    application: {
      name: 'Prenotes (development)',
      port: 4730
    },

    'authentication' : {
      'google' : {
        'id' : '',
        'secret' : '',
        'callback' : 'http://localhost:4730/auth/google/callback'
      }
    }
  }
}
