/** @jsx React.DOM */

var React   = require('react');
var Header = require('./Header.jsx');
var Davenport = require('./Davenport.jsx');
var Information = require('./Information.jsx');
var $ = require('jquery');

React.renderComponent(
  <div>
    <Header/>
    <Davenport/>
    <Information/>
  </div>,
  document.body
);
