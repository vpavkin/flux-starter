var path = require('path');
var webpack = require('webpack');
var assign = require('object-assign');

// jshint -W071
module.exports = function (grunt) {
	'use strict';

	var JS_FILES = ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'];
	var pkg = grunt.file.readJSON('package.json');
	var WEBPACK_CONFIG = {
		entry: {
			main: path.join(__dirname, 'src', 'index.js'),
			vendor: Object.keys(pkg.dependencies).filter(function (m) {
				return m !== 'babel-runtime';
			})
		},
		resolve: {
			extensions: ['', '.js', '.jsx'],
			modulesDirectories: [
				'web_modules',
				'./node_modules',
				'.',
				'./src/app',
				'./src/app/view'
			]
		},
		module: {
			loaders: [
				{test: /\.css$/, loader: 'style!css'},
				{test: /\.scss$/, loader: 'style!css!sass'},
				{
					test: /\.jsx$/,
					loader: 'jsx-loader'
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader?experimental&optional=runtime'
				},
				{test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},
				{
					test: /\.woff$/,
					loader: 'url-loader?limit=10000&minetype=application/font-woff'
				},
				{
					test: /\.woff2$/,
					loader: 'url-loader?limit=10000&minetype=application/font-woff'
				},
				{test: /\.ttf$/, loader: 'file-loader'},
				{test: /\.eot$/, loader: 'file-loader'},
				{test: /\.svg$/, loader: 'file-loader'},
				{
					test: /\.(jpe?g|png|gif|svg)$/i,
					loaders: ['image?bypassOnDebug&optimizationLevel=7&interlaced=false']
				}
			]
		}, plugins: [
			new webpack.ProvidePlugin({
				jQuery: 'jquery',
				React: 'react'
			}),
			new webpack.optimize.CommonsChunkPlugin(
				'vendor', 'vendor.js')
		]
	};

	var WEBPACK_SINGLE_CHUNK = assign({}, WEBPACK_CONFIG, {
		plugins: [
			new webpack.ProvidePlugin({
				jQuery: 'jquery',
				React: 'react'
			})]
	});

	grunt.initConfig({
		clean: {
			production: ['build'],
			dev: ['debug']
		},
		copy: {
			production: {
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: [
							'index.html'
						],
						dest: 'build/'
					}
				]
			},
			development: {
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: [
							'index.html'
						],
						dest: 'debug/'
					}
				]
			}
		},
		watch: {
			js: {
				files: JS_FILES,
				tasks: ['jshint', 'jscs']
			},
			scsslint: {
				files: ['src/scss/*.*'],
				tasks: ['scsslint']
			},
			livereload: {
				files: ['src/**/*.*'],
				options: {
					livereload: true
				}
			}
		},
		scsslint: {
			styles: [
				'src/scss/*.scss'
			],
			options: {
				config: '.scss-lint.yml',
				colorizeOutput: true
			}
		},
		jshint: {
			files: JS_FILES,
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			}
		},
		jscs: {
			files: JS_FILES,
			options: {
				config: '.jscsrc',
				esnext: true
			}
		},
		cacheBust: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 16,
				rename: false
			},
			production: {
				files: [{
					src: ['build/index.html']
				}]
			},
			dev: {
				files: [{
					src: ['debug/index.html']
				}]
			}
		},
		karma: {
			source: {
				configFile: 'karma.conf.js',
				webpack: assign({}, WEBPACK_SINGLE_CHUNK,
					{devtool: 'inline-source-map'})
			},
			unit: {
				configFile: 'karma.conf.js',
				webpack: WEBPACK_SINGLE_CHUNK
			},
			once: {
				configFile: 'karma.conf.js',
				webpack: WEBPACK_SINGLE_CHUNK,
				singleRun: true,
				browserNoActivityTimeout: 100000,
				browsers: ['Chrome']
			}
		},
		webpack: {
			options: WEBPACK_CONFIG,

			dev: {
				output: {
					path: './debug/',
					filename: 'bundle.js'
				},
				devtool: 'source-map',
				plugins: [
					new webpack.optimize.DedupePlugin()
				]
			},

			production: {
				output: {
					path: './build/',
					filename: 'bundle.js'
				},
				devtool: null,
				plugins: [
					new webpack.optimize.UglifyJsPlugin(),
					new webpack.optimize.DedupePlugin()
				]
			}

		},
		'webpack-dev-server': {
			options: {
				webpack: WEBPACK_CONFIG,
				keepAlive: true,
				contentBase: './debug'
			},

			dev: {
				webpack: {
					output: {
						path: './debug/',
						filename: 'bundle.js'
					},
					devtool: 'source-map',
					plugins: [
						new webpack.optimize.DedupePlugin()
					]
				}
			}
		}
	})
	;

	// Load the plugin that provides the 'uglify' task.
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-scss-lint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-cache-bust');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-webpack');

	grunt.registerTask('precommit', ['jshint', 'jscs']);
	grunt.registerTask('dev', [
		'clean:dev',
		'copy',
		'webpack:dev',
		'cacheBust'
	]);
	grunt.registerTask('dev-server', [
		'clean:dev',
		'copy',
		'webpack-dev-server'
	]);
	grunt.registerTask('default', [
		'clean:production',
		'copy',
		'webpack:production',
		'cacheBust:production'
	]);
};
