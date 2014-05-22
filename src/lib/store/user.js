var merge = require('react/lib/merge');
var dispatcher = require('../dispatcher');
var storeConstants = require('../constant/store');
var EventEmitter = require('events').EventEmitter;
var mongoose = require('mongoose');

/**
 * constants
 */
var CHANGE_EVENT = 'change';


/**
 * User model
 */
var User = mongoose.model('User');


/**
 * private functions
 */
function createUser(name) {
  console.log("Create user %s", name);

  User.create(
    {
      name: name,
      created: Date.now(),
      updated: Date.now()
    },
    function (err) {
      if (err)
        console.log("User create failed: %s", err);
    }
  );
}


/**
 * Store
 */
var UserStore = merge(EventEmitter.prototype, {

  addListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emit: function() {
    this.emit(CHANGE_EVENT);
  },

  dispatcherIndex: dispatcher.register(function(payload) {
    if (payload.action.target != 'user')
      return true;

    switch(payload.action.type) {
      case storeConstants.CREATE:
        console.log(payload);
        createUser(payload.user.name);
        break;

      case storeConstants.UPDATE:
        break;

      case storeConstants.DELETE:
        break;
    }

    return true; // no errors, neccary for promise in dispatcher
  })
});


module.exports = UserStore;
