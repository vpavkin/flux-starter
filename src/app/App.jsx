/** @jsx React.DOM */
'use strict';
var React = require('react');
var Navbar = require('./view/navbar/Navbar');
var MainArea = require('./view/MainArea');
var Footer = require('./view/Footer');

module.exports = React.createClass({

	render: function () {
		return (
			<div>
				<Navbar projectName="Flux App"/>
				<MainArea />
				<Footer />
			</div>
		);
	},
	displayName: 'App'
});
