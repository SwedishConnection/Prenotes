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

// Header
// ------

var React = require('react');


module.exports = React.createClass({

  render: function() {
    return (
      <header id="header" role="banner" className="navbar navbar-default navbar-fixed-top">
        <nav role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#prenotes-navbar-collapse">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand prenotes-brand" href="#">Prenotes</a>
            </div>

            <div className="collapse navbar-collapse navbar-right" id="prenotes-navbar-collapse">
              <ul className="nav navbar-nav">
                <li><a href="/logout">Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
});
