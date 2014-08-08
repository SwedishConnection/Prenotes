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

(function() {
    "use strict";

    require('array.from');
    var Promise = require('es6-promise').Promise;

    var Dispatcher = function() {
        this.callbacks = [];
    };

    Dispatcher.prototype = {
        // Filters by action returning a new array of callbacks.
        // Map does not mutate.
        getCallbacks: function(action) {
            return this.callbacks.filter(function(defn) {
                return defn.action === action;
            }).map(function(defn) {
                return defn.callback;
            });
        },

        // Dispatches the action and accepts additional
        // arguments that are applied to the callbacks.
        // Promise.all puts the results of each callback
        // into an array.
        dispatch: function(action /*, ...args */) {
            var args = Array.from(arguments).slice(1);

            return Promise.all(
                this.getCallbacks(action).map(function(callback) {
                    return callback.apply(callback, args);
                })
            );
        },

        // Registers the action, callback as a pair into
        // an array of callbacks.  Returns the index.
        register: function(action, callback) {
            this.callbacks.push({
                action: action,
                callback: callback
            });

            return this.callbacks.length - 1;
        },

        // Splices the callbacks returning an array of removed
        // callback or nothing if no elements are removed.
        // Careful here since an index larger than the array
        // will be the array length and negatives begin that
        // many from the end of the array.
        unregister: function(index) {
          return this.callbacks.splice(index, 1);
        }
    };

    module.exports = Dispatcher;
}).call(this);
