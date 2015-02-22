'use strict';
var Dispatcher = require('dispatcher/AppDispatcher');
var Action = require('../actions/Action');
var ActionTypes = require('ActionTypes');

module.exports = {

	sampleAction(action) {
		Dispatcher.dispatch(new Action({
			type: ActionTypes.SAMPLE_ACTION,
			message: action.message
		}));
	}
};
