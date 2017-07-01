module.exports = () => {

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

    return {
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        extractCSS: isProduction,
                        loaders: {
                            'scss': 'vue-style-loader!css-loader!sass-loader',
                            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                        }
                    }
                }
            ]
        },      
		resolve: {
			extensions: ['.vue'],
			alias: {
				'vue$': 'vue/dist/vue.esm.js'
			}
		},	
	    devtool: '#eval-source-map'              
    }
}; 