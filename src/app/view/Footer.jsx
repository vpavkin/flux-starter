/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({

	render: function () {
		return (
			<footer className="footer">
				<div className="container">
					<p className="text-muted">
						Flux App 2015
					</p>
				</div>
			</footer>
		)
	},
	displayName: 'Footer'

});
