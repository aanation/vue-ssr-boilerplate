const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');

const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin'); 
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const baseConfig = require('./webpack.ssr.base.config'); 

const OPTIONS = require('./config.js').ssr;

module.exports =  merge([
	baseConfig(), 
	{
		entry: OPTIONS.paths.serverEntry,
        resolve: {
            alias: {
                'create-axios': './create-axios-server.js'
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
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
				'process.env.VUE_ENV': '"server"'
			}),
			new VueSSRServerPlugin(),
			new FriendlyErrorsPlugin()
		]		  
	}
]); 