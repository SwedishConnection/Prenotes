/** @jsx React.DOM */

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

// Main
// ------
// Simple container for the sign-in, about, how-to
// and contact sections plus the footer

var React   = require('react');
var Signin = require('./Signin.jsx');
var About = require('./About.jsx');
var Howto = require('./Howto.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({

  render: function() {
    return (
      <main role="main">
        <Signin/>
        <div className="container">
          <About/>
          <hr className="big-divider"/>
          <Howto/>
          <hr className="big-divider"/>
          <Footer/>
        </div>
      </main>
    )
  }
});
