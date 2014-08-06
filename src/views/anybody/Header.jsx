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
// Section for Bootstrap navigation with a brand for
// Prenotes.  Navigation is fixed in a fuild container.

var React   = require('react');
var $ = require('jquery');
require('bootstrap');

var Dispatcher = require('../../lib/anybody/AnybodyDispatcher');
var Constants = require('../../lib/anybody/AnybodyConstants');

module.exports = React.createClass({

  changeLanguage : function(lang) {
    Dispatcher.dispatch(Constants.Action.CHANGE_LANGUAGE, lang);
  },

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
                <li><a href="#">About</a></li>
                <li><a href="#">How-To</a></li>
                <li><a href="#">Contact</a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">Language <span className="caret"></span></a>
                  <ul className="dropdown-menu" role="menu">
                    <li><a href="#" onClick={this.changeLanguage.bind(this, 'en')}>English</a></li>
                    <li><a href="#" onClick={this.changeLanguage.bind(this, 'sv')}>Swedish</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
});
