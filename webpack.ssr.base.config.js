const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');

/*Модули конфига */
const vueLoader = require('./webpack/vue.loader'); 
const babel = require('./webpack/babel.js');
const urlLoader = require('./webpack/url.loader');
const OPTIONS = require('./webpack.options').ssr;
const UglifyJsPlugin = require('./webpack/js.uglify');
const extractCSS = require('./webpack/css.extract');

const commonConfig = merge([
    {
        output: {
            path: OPTIONS.paths.build,
            publicPath: OPTIONS.paths.publicPath,
            filename: 'js/[name].[chunkhash].js',
			chunkFilename: 'js/[id].[chunkhash].js'			
        },
		resolve: {
			extensions: ['.js', '.json'],//импорт без рассширения
			alias: {
				'@': path.join(OPTIONS.paths.source, 'app'), //алис для корня
			}	
		}		
    }, 
    vueLoader(), 
	urlLoader(OPTIONS.paths), 
	babel()
]);

module.exports = () => {

	let env = process.env.NODE_ENV || "development";

	if (env === 'production') {
		return merge([
			commonConfig, UglifyJsPlugin(), extractCSS(),
			{
				devtool: false
			}
		]);
	} 

	if (env === "development") {
		return merge([
			commonConfig,
			{
				  devtool: '#cheap-module-eval-source-map',
					plugins: [
						new webpack.DefinePlugin({
							'process.env': {
								NODE_ENV: '"devlopment"'
							}
						}),
						new FriendlyErrorsPlugin()
					],				  

			},
			sass(), 
			css()
		]);
	}
};
