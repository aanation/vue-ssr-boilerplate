const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');

const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin'); 
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const baseConfig = require('./webpack.ssr.base.config'); 

const OPTIONS = require('./webpack.options').ssr;

module.exports =  merge([
	baseConfig(), 
	{
		entry: OPTIONS.paths.serverEntry,
        resolve: {
            alias: {
                'create-api': './create-api-server.js'
            }
        },  		
		target: 'node',
		devtool: 'source-map',
		output: {
   			libraryTarget: 'commonjs2'
		},
		externals: nodeExternals({
		//можнл добавить больше типов файлов, например сырые *.vue файлы
		//нужно также указывать белый список зависимостей изменяющих `global` (напр полифиллы)
			whitelist: /\.css$/
  		}),
		plugins: [
			new VueSSRServerPlugin(),
			new FriendlyErrorsPlugin()
		]		  
	}
]); 