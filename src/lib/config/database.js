var tungus = require('tungus');
var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var User = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
