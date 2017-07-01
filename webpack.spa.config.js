const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');

/* Модули конфига*/
const devServer = require('./webpack/devserver'); 
const UglifyJsPlugin = require('./webpack/js.uglify');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const OPTIONS = require('./webpack.options').spa; //импортим объект с опциями для классического спа 

const baseConfig = require('./webpack.spa.base');

module.exports = () => {

	let env = process.env.NODE_ENV || "development";

	if (env === 'production') {
		return merge([
			baseConfig, UglifyJsPlugin(), extractCSS(),
			{
				devtool: '#source-map',
				plugins: [
					new webpack.DefinePlugin({
						'process.env': {
							NODE_ENV: '"production"'
						}
					}),		
					new OptimizeCSSPlugin({
						cssProcessorOptions: {
							safe: true
						}
					}),	
					new HtmlWebpackPlugin({
						filename: 'index.html',
						template:  path.join(OPTIONS.paths.source, 'index.html'),
						inject: true,
						minify: {
							removeComments: true,
							collapseWhitespace: true,
							removeAttributeQuotes: true
						},
						chunksSortMode: 'dependency'
					}),		
					new webpack.optimize.CommonsChunkPlugin({
						name: 'vendor',
						minChunks: function (module, count) {
							return (
							module.resource &&
							/\.js$/.test(module.resource) &&
							module.resource.indexOf(
								path.join(__dirname, '../node_modules')
							) === 0
							)
						}
					}),	
					new webpack.optimize.CommonsChunkPlugin({
						name: 'manifest',
						chunks: ['vendor']
					}),																			
					new webpack.LoaderOptionsPlugin({
						minimize: true
					}),
					new CopyWebpackPlugin([
						{
							from: path.join(__dirname, 'static'),
							to: OPTIONS.paths.build,
							ignore: ['.*']
						}
					])												
				]					
			}
		]);
	} 

	if (env === "development") {
		return merge([
			baseConfig,
			{
				  devtool: '#cheap-module-eval-source-map',
					plugins: [
						new webpack.DefinePlugin({
							'process.env': {
								NODE_ENV: '"production"'
							}
						}),
						new webpack.HotModuleReplacementPlugin(),
						new webpack.NoEmitOnErrorsPlugin(),
						new FriendlyErrorsPlugin()
					],				  

			},
			devServer(OPTIONS.devserverPort),
			sass(), 
			css()
		]);
	}
};

