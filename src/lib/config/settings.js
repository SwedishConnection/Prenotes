module.exports = {
  development: {
    db: 'tingodb://C:/temp/tingodb',

    logging: {
      filename: 'C:/temp/winston.log'
    },

    application: {
      name: 'Prenotes (development)'
    },

    'authentication' : {
      'google' : {
        'id' : '',
        'secret' : '',
        'callback' : ''
      }
    }
  }
}
