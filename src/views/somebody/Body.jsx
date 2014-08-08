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

// Somebody
// --------
var React = require('react');
var Header = require('./Header.jsx');
var Main = require('./Main.jsx');

var flux = require('flux');


var Body = React.createClass({
  getInitialState: function() {

    $.ajax(
      {
        url : '/user',
        async : false,
        dataType : 'json',
        success : function (data) {
          flux.UserStore.setFromJS(['user'], data);
        }
      }
    );

    return {
      user : flux.UserStore.getAsJS(['user'])
    }
  },

  changeUser : function(keys, oldState, newState) {
    this.setState({
      user : flux.UserStore.get(['user'])
    });
  },

  componentWillMount: function() {
    flux.UserStore.addWatch(this.changeUser);
  },

  componentWillUnmount: function() {
    flux.UserStore.removeWatch(this.changeUser);
  },

  render: function() {
    return (
      <div id="body">
        <Header user={this.state.user}/>
        <Main user={this.state.user}/>
      </div>
    )
  }
});


React.renderComponent(
  <Body/>,
  document.body
);
