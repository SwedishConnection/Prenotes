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

// Anybody
// -------
// Entrypoint for the non-signed in page (or splash page)
// that has 5 main components.  The header has quick links
// to sections wihtin the main component.  Inside main
// are the sign, about, how-to, contact and footer sections.

var React = require('react');
var Header = require('./Header.jsx');
var Main = require('./Main.jsx');


var SettingsStore = require('../../lib/anybody/store/SettingsStore');


var Body = React.createClass({
  getInitialState: function() {
		return {
			lang : SettingsStore.get(['lang'])
		}
	},

  changeLanguage: function(lang) {
    this.setState({
      lang : lang
    });
  },

  componentWillMount: function() {
    var self = this;

    SettingsStore.addWatch(function (keys, oldState, newState) {
      self.changeLanguage(SettingsStore.get(['lang']));
    });
  },

  render: function() {
    return (
      <div id="body">
        <Header lang={this.state.lang}/>
        <Main lang={this.state.lang}/>
      </div>
    )
  }
});


React.renderComponent(
  <Body/>,
  document.body
);
