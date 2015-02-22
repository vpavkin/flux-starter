'use strict';
var rx = require('rx');
var Dispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('ActionTypes');

class SampleStore {
	constructor () {
		this.updateStream = new rx.Subject();
		this._register();
	}

	_register () {
		Dispatcher.register(ActionTypes.SAMPLE_ACTION,
			this.onSampleAction, this);
	}

	update (action) {
		this.updateStream.onNext(action);
	}

	onSampleAction (action) {
		this.update(action);
	}
}

module.exports = SampleStore;
