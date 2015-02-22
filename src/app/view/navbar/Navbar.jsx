/** @jsx React.DOM */
'use strict';

var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Navbar = ReactBootstrap.Navbar;
var SampleStore = require('stores/SampleStore');
var SampleActionCreator = require('action_creators/SampleActionCreator');
var bldrImage = require('img/bldr.png');

module.exports = React.createClass({

	componentDidMount: function(){
		SampleStore.updateStream.subscribe(this.onUpdate)
	},
	
	onClick: function () {
		SampleActionCreator.sampleAction({message: "Hello World!"})
	},

	onUpdate: function(){
		alert('update');
	},

	render: function () {
		return (
			<Navbar>
				<div className="navbar-header">
					<a className="navbar-brand navbar-logo" href="#" onClick={this.onClick}>
						<img src={bldrImage} height="40"/>
					</a>
				</div>
			</Navbar>
		)
	},
	displayName: 'Navbar'

});
