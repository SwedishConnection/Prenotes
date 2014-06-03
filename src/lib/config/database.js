var tungus = require('tungus');
var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var User = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: String,
  authentication: {
    origin: String,
    token: String
  },
  created: Date,
  updated: Date
});

mongoose.model('User', User);


/**
 * Setup database (tingodb)
 */
mongoose.connect(GLOBAL.config.db, function(err) {
  if (err)
    console.log('Tingodb connection failed: %s', err);
});
