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

// Store
// -----
(function() {

  var util = require('util');
  var mori = require('mori');
  var copyProperties = require('react/lib/copyProperties');
  require('array.from');

  var Store = function() {
    var self = this;

    this._getDispatcher = function() {
      if (!this.dispatcher) {
        throw new Error("Dispatcher property not defined.");
      }
      else {
        return this.dispatcher;
      }
    };

    this._resetState = function () {
      this.state = mori.js_to_clj(this.getInitialState());
      this.states = mori.vector(this.state);
    };

    this._notify = function(keys, oldState, newState) {
      this.watchers.forEach(function (w) {
        w(keys, oldState, newState);
      });
    };

    this._updateState = function (newState) {
      this.state = newState;
      this.states = mori.conj(this.states, newState);
    };

    this._registerAction = function(action, handler) {
      var dispatcher = this._getDispatcher();

      dispatcher.register(action, handler.bind(this));
    };

    this._configureActions = function () {
      this._actionMap = {};

      if (this.actions) {
        this.actions.forEach(function (action) {
          if (!action[0]) {
            throw new Error("Action name must be provided");
          }

          if (action.length < 2 || (typeof action[action.length-1] !== "function")) {
            throw new Error("Action handler must be provided");
          }

          self._registerAction(action[0], action[1]);
        });
      }
    };
  };


  // Mounts the store to a dispatcher instance
  Store.prototype.mount = function(dispatcher) {
    this.dispatcher = dispatcher;
    this.watchers = [];

    this._resetState();
    this._configureActions();
  };

  // Initial state meant to be overriden
  Store.prototype.getInitialState = function () {
    return {};
  };

  // Mori style get
  Store.prototype.get = function (keys) {
    if (typeof keys === 'string') {
      return mori.get(this.state, keys);
    }

    return mori.get_in(this.state, keys);
  };

  // Get JS rather than Mori
  Store.prototype.getAsJS = function (keys) {
    return mori.clj_to_js(this.get(keys));
  };

  // Mori style set that captures the old state,
  // notifing changes to watchers
  Store.prototype.set = function (keys, value) {
    var newState, oldState;

    var arrKeys = Array.from(keys);
    if (typeof value === 'function') {
      oldState = this.state;
      newState = mori.update_in(this.state, arrKeys, value);
    }
    else {
      oldState = this.state;
      newState = mori.assoc_in(this.state, arrKeys, value);
    }

    this._updateState(newState);
    this._notify(keys, oldState, newState);
  };

  // Same as set but moves JS arrays to Mori vectors
  // and JS objects to Mori maps
  Store.prototype.setFromJS = function (keys, value) {
    this.set(keys, mori.js_to_clj(value));
  };

  // Add a callback for state changes
  Store.prototype.addWatch = function (watcher) {
    this.watchers.push(watcher);
  };

  // Remove a callback for state changes
  Store.prototype.removeWatch = function (watcher) {
    this.watchers = this.watchers.filter(function (w) {
      return w !== watcher;
    });
  };

  // Undo the state to previous
  Store.prototype.undo = function () {
    var oldState =  this.state;

    if (mori.count(this.states) > 1) {
      this.states = mori.pop(this.states);
      this.state = mori.peek(this.states);
    }

    this._notify('*', oldState, this.state);
  };

  // Extend store
  Store.extend = function(config) {
    return copyProperties(new Store(), config);
  };


  module.exports = Store;
}).call(this);
