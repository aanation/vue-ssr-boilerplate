const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');

/* Модули конфига*/
const vueLoader = require('./webpack/vue.loader'); 
const babel = require('./webpack/babel.js');
const images = require('./webpack/images');
const UglifyJsPlugin = require('./webpack/js.uglify');
const extractCSS = require('./webpack/css.extract');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const nodeExternals = require('webpack-node-externals');

const OPTIONS = {
	paths: {
		source: path.join(__dirname, 'source'),
		build: path.join(__dirname, 'build')		
	}
}

const commonConfig = merge([
	{
		target: 'node', 
		entry: {
			'server': path.join(OPTIONS.paths.source, 'enrty-server.js')
		},
		output: {
			path: OPTIONS.paths.build,
			publicPath: '/build',
			libraryTarget: 'commonjs2',
			filename: 'js/[name].js'
		},
		performance: {
			hints: false
		}	
	}, vueLoader(), babel(), images()
]); 

module.exports = () => {
	return merge([
		commonConfig, UglifyJsPlugin(), extractCSS(),
		{
			devtool: '#source-map',
			externals: nodeExternals({
				whitelist: /\.css$/
			}),			
			plugins: [
				new webpack.DefinePlugin({
					'process.env': {
						NODE_ENV: '"production"',
						'process.env.VUE_ENV': '"server"'						
					}
				}),	
				new VueSSRServerPlugin(),				
				new webpack.LoaderOptionsPlugin({
					minimize: true
				})								
			]					
		}
	]);
};

