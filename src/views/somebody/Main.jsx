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
var React   = require('react');


module.exports = React.createClass({

  componentWillMount: function() {
  },

  render: function() {
    var jumbotron;

    if (!this.props.user.group || this.props.user.group.length == 0) {
      jumbotron = <p>No group</p>
    }

    return (
      <main role="main">
        {jumbotron}
      </main>
    )
  }
});
