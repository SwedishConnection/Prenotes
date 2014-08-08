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

var tungus = require('tungus');
var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;


// User
// ----
// A user is created only through the passport.js
// when the profile.id does not correspond to an
// User.id.  Every user has a set of groups or
// rolls that drive what can be done in Prenotes
// immediately after signing in.
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
  updated: Date,
  registered: Date,
  group: {
    type: Array
  }
});

mongoose.model('User', User);


// Organization
// ------------
// A daycare is an organization which has
// staff, children and administrators.
var Organization = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  created: Date,
  updated: Date,
  staff: {
    type: Array
  },
  administrator: {
    type: Array
  },
  children: {
    type: Array
  }
});

mongoose.model('Organization', Organization);


// Child
// -----
var Child = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  caretaker: {
    type: Array
  }
});

mongoose.model('Child', Child);


// Setup the database (Tingo)
mongoose.connect(GLOBAL.config.db, function(err) {
  if (err)
    console.log('Tingodb connection failed: %s', err);
});
