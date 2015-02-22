'use strict';
var React = require('react');

var App = require('./app/App');

require('bootstrap-webpack');
require('./scss/styles.scss');

React.render(React.createFactory(App)(), document.body);
