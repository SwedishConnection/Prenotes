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

// Sign-in
// -------
// Daycare staff or caretakers sign-in with this component

var React = require('react');
var Polyglot = require('node-polyglot');
var en = require('./i18/signin/en.js');
var sv = require('./i18/signin/sv.js');

var polyglot = new Polyglot();

var SettingsStore = require('../../lib/anybody/store/SettingsStore');


module.exports = React.createClass({
  changeLanguage: function(lang) {
    switch (lang) {
      case 'sv':
        polyglot.extend(sv);
        break;
      default:
        polyglot.extend(en);
    }

    this.forceUpdate();
  },

  componentWillMount: function() {
    var self = this;

    SettingsStore.addWatch(function (keys, oldState, newState) {
      self.changeLanguage(SettingsStore.get(['lang']));
    });
  },

  render: function() {
    return (
      <div className="jumbotron">
        <h2 className="prenotes-signin">{polyglot.t('jumbotron.header')}</h2>
        <p>{polyglot.t('jumbotron.signing')}</p>

        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <a className="btn btn-block btn-social btn-google-plus">
                <i className="fa fa-google-plus"></i> {polyglot.t('signing.google')}
              </a>
              <a className="btn btn-block btn-social btn-facebook">
                <i className="fa fa-facebook"></i> {polyglot.t('signing.facebook')}
              </a>

              <hr/>

              <div className="text-center">
                <a className="btn btn-social-icon btn-dropbox">
                  <i className="fa fa-dropbox"></i>
                </a>
                <a className="btn btn-social-icon btn-reddit">
                  <i className="fa fa-reddit"></i>
                </a>
                <a className="btn btn-social-icon btn-tumblr">
                  <i className="fa fa-tumblr"></i>
                </a>
                <a className="btn btn-social-icon btn-twitter">
                  <i className="fa fa-twitter"></i>
                </a>
                <a className="btn btn-social-icon btn-microsoft">
                  <i className="fa fa-windows"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
