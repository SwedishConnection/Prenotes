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

// Anybody Dispatcher
// ------------------
// Dispatcher singleton for the anybody side of Prenotes.
var Dispatcher = require('../flux/dispatcher');

// React's copyProperties mutates the object (even
// enum properties) whereas React's merge makes a copy.
var copyProperties = require('react/lib/copyProperties');


// Calls the constructor of the dispatcher first then
// applies properties.
var AnybodyDispatcher = copyProperties(new Dispatcher(), {
});

module.exports = AnybodyDispatcher;
