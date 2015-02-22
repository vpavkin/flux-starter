'use strict';

/**
 * Base class for all actions.
 * @param {Object} config An object, containing all the action settings
 * @param {String} config.type The exact action type, one of ActionTypes
 * @see module:ActionTypes
 * @constructor
 */
class Action {

	constructor (config) {
		Object.assign(this, config);
	}

}
module.exports = Action;
