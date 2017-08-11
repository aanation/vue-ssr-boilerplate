const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');

/*Модули конфига */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const vueLoader = require('./webpack/vue.loader'); 
const babel = require('./webpack/babel.js');
const urlLoader = require('./webpack/url.loader');

const OPTIONS = require('./webpack.options').spa; //импортим объект с опциями для классического спа 

module.exports =  merge([
	{
		entry: path.join(OPTIONS.paths.source, 'entry-client.js'), 
		output: {
			path: OPTIONS.paths.build,
			publicPath: OPTIONS.publicPath,
            filename: 'js/[name].[hash].js',
			chunkFilename: 'js/[id].[hash].js'	
		},	
		resolve: {
			extensions: ['.js', '.json'],//импорт без рассширения
			alias: {
				'@': path.join(OPTIONS.paths.source, 'app'), //алис для корня
				'create-api': './create-api-client.js'
			}	
		},			
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template:  path.join(OPTIONS.paths.source, 'index.spa.html')
			})
		],
		performance: {
			hints: false
		}	
	}, 
	vueLoader(), 
	urlLoader(), 
	babel(), 
]); 