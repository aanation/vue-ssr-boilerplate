const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');

/* Модули конфига*/
const vueLoader = require('./webpack/vue.loader'); 
const babel = require('./webpack/babel.js');
const images = require('./webpack/images');
const devServer = require('./webpack/devserver'); 
const UglifyJsPlugin = require('./webpack/js.uglify');
const sass = require('./webpack/sass'); 
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const OPTIONS = {
	devserverPort: 8080, 
	paths: {
		source: path.join(__dirname, 'source'),
		build: path.join(__dirname, 'build')		
	}
}

const commonConfig = merge([
	{
		entry: path.join(OPTIONS.paths.source, 'main.js'), 
		output: {
			path: OPTIONS.paths.build,
			publicPath: '/',
			filename: 'js/[name].js'
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template:  path.join(OPTIONS.paths.source, 'index.html')
			})
		],
		performance: {
			hints: false
		}	
	}, vueLoader(), babel(), images()
]); 

module.exports = () => {

	let env = process.env.NODE_ENV || "development";

	if (env === 'production') {
		return merge([
			commonConfig, UglifyJsPlugin(), extractCSS(),
			{
				devtool: '#source-map',
				plugins: [
					new webpack.DefinePlugin({
						'process.env': {
							NODE_ENV: '"production"'
						}
					}),					
					new webpack.LoaderOptionsPlugin({
						minimize: true
					})								
				]					
			}
		]);
	} 

	if (env === "development") {
		return merge([
			commonConfig,
			devServer(OPTIONS.devserverPort),
			sass(), 
			css()
		]);
	}
};

