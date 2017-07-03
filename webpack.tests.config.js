const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');
const sass = require('./webpack/sass');
const css = require('./webpack/css');

const baseConfig = require('./webpack.spa.base.config');
delete baseConfig.plugins; 

const webpackConfig = merge([
	baseConfig, 
	{
		devtool: '#inline-source-map',
		resolveLoader: {
			alias: {
				'scss-loader': 'sass-loader'
			}
		}, 
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"testing"' 
			}
		}),
	]	    
	},
  css(),
  sass()
]);

delete webpackConfig.entry;


module.exports = webpackConfig;

