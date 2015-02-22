// Karma configuration
// Generated on Fri Jan 23 2015 16:08:53 GMT+0300 (AST)

module.exports = function (config) {
	'use strict';

	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha'],

		// list of files / patterns to load in the browser
		files: [
			'test/runner.js'
		],

		plugins: [
			'karma-webpack',
			'karma-mocha',
			'karma-chrome-launcher',
			'karma-phantomjs-launcher',
			'karma-sourcemap-loader',
			'karma-nested-reporter'
		],
		preprocessors: {
			// add webpack as preprocessor
			'test/runner.js': ['webpack', 'sourcemap']
		},
		// list of files to exclude
		exclude: [],

		// webpack config is set from grunt

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['nested'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome'],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,
		webpackServer: {
			progress: false,
			stats: false
		}
	});
};
