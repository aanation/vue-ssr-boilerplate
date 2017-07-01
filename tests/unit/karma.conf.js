const webpackConfig = require('../../webpack.tests.config');

module.exports = function (config) {
	config.set({
		browsers: ['Chrome', 'Chrome_without_security'],
		customLaunchers: {
			Chrome_without_security: {
				base: 'Chrome',
				flags: ['--disable-web-security']
			}
		},    
		frameworks: ['mocha', 'sinon-chai'],
		reporters: ['spec', 'coverage'],
		files: ['./index.js'],
		preprocessors: {
			'./index.js': ['webpack', 'sourcemap']
		},
		webpack: webpackConfig,
		webpackMiddleware: {
			noInfo: true
		},
		coverageReporter: {
			dir: './coverage',
			reporters: [
				{ type: 'lcov', subdir: '.' },
				{ type: 'text-summary' }
			]
		}
	})
}
