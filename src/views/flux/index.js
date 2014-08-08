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

var Dispatcher = require('../../lib/flux/Dispatcher');
var copyProperties = require('react/lib/copyProperties');
var SettingsStore = require('./SettingsStore');
var UserStore = require('./UserStore');
var Constants = require('./Constants');


function Flux () {};


var dispatcher = copyProperties(new Dispatcher(), {});
SettingsStore.mount(dispatcher);
UserStore.mount(dispatcher);


Flux.prototype.Dispatcher = dispatcher;
Flux.prototype.SettingsStore = SettingsStore;
Flux.prototype.UserStore = UserStore;
Flux.prototype.Constants = Constants;



var flux = module.exports = exports = new Flux;
