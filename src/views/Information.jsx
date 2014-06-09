/** @jsx React.DOM */

var React   = require('react');

module.exports = React.createClass({

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2>Notifications</h2>
            <p></p>
          </div>
          <div className="col-md-4">
            <h2>Easy</h2>
            <p></p>
          </div>
          <div className="col-md-4">
            <h2>Safe</h2>
            <p></p>
          </div>
        </div>

        <footer>
			    <p>&copy; Swedish Connection 2014</p>
		    </footer>
      </div>
    )
  }
});
