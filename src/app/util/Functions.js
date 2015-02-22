'use strict';
var R = require('ramda');

var callFn = R.curry(function (fnname, param, caller) {
	return caller[fnname](param);
});

var propOneOf = R.curry(function (prop, list, object) {
	return R.contains(R.prop(prop, object), list);
});

/**
 * @returns {Array}
 */
var pickPathValues = R.curry(function (pathList, object) {
	return R.map(function (path) {
		return R.path(path, object);
	}, pathList);
});

var pickPath = R.curry(function (names, pathList, object) {
	return R.zipObj(names, pickPathValues(pathList, object));
});

var hasType = R.propEq('type');
var mixinType = R.assoc('type');

var keyOf = R.curry(function (inObj, value) {
	return R.find(
		R.compose(R.eq(value), R.propOf(inObj)),
		R.keysIn(inObj));
});

var firstKey = R.compose(R.head, R.keys);

var lastChar = R.curry(function (str) {
	return str.slice(-1);
});

var strHead = R.curry(function (str) {
	return str.slice(0, str.length - 1);
});

var strTail = R.curry(function (str) {
	return str.slice(1);
});

var substrUntil = R.curry(function (limiter, str) {
	if (str.indexOf(limiter) > -1) {
		return str.substr(0, str.indexOf(limiter));
	}
	return str;
});

var strTest = R.curry(function (regex, str) {
	return regex.test(str);
});

var isDefined = R.curry(function (val) {
	return (typeof val !== 'undefined');
});

/**
 * @function mapObjToArray
 * maps object values to an array
 * @param {Function} fn mapper
 * @param {Object} obj object to map
 */
var mapObjToArray = R.pipe(R.mapObj, R.values);

var moveInArray = function (list, from, to) {
	var arr = list.concat();
	arr.splice(to, 0, arr.splice(from, 1)[0]);
	return arr;
};

var Functions = {
	actionType: hasType,
	callFn: callFn,
	eventType: hasType,
	firstKey: firstKey,
	isDefined: isDefined,
	keyOf: keyOf,
	lastChar: lastChar,
	mapObjToArray: mapObjToArray,
	mixinType: mixinType,
	moveInArray: moveInArray,
	pickPath: pickPath,
	pickPathValues: pickPathValues,
	propOneOf: propOneOf,
	strHead: strHead,
	strTail: strTail,
	strTest: strTest,
	substrUntil: substrUntil
};

R.installTo(Functions);

module.exports = Functions;
