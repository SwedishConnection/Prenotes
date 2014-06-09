/** @jsx React.DOM */

var React   = require('react');

module.exports = React.createClass({

  render: function() {
    return (
      <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#"><em>Prenotes</em></a>
          </div>
        </div>
      </div>
    )
  }
});
