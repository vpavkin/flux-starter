'use strict';
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var expect = require('chai').expect;
var Navbar = require('navbar/Navbar');

describe('Navbar', function () {

	var nav;

	beforeEach(function () {
		nav = TestUtils.renderIntoDocument(
			React.createFactory(Navbar)({
				projectName: 'TEST NAME'
			}));
	});

	afterEach(function (done) {
		React.unmountComponentAtNode(document.body);
		document.body.innerHTML = '';
		setTimeout(done);
	});

	describe('Navbar', function () {
		it('is a Navbar', function () {
			expect(true).to.be.true();
		});
	});
});
