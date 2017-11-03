const path = require('path'); 

module.exports = ({source}) => {

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';


    function createLoaders() {
        let loaders =  isProduction ? 
            {
                scss: ExtractTextPlugin.extract({
                    use: ['css-loader','resolve-url-loader','postcss-loader','sass-loader', {
                        loader: 'sass-resources-loader',
                        options: {
                          resources: path.join(source, 'app/variables.scss')
                        }
                    }],
                    fallback: 'vue-style-loader'
                }),
                sass: ExtractTextPlugin.extract({
                    use: 'css-loader!resolve-url-loader!postcss-loader!sass-loader?indentedSyntax',
                    fallback: 'vue-style-loader'
                })
            } : 
            {
                'scss': ['vue-style-loader','css-loader','resolve-url-loader','postcss-loader','sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                        resources: path.join(source, 'app/variables.scss')
                        }
                    }
                ],
                'sass': 'vue-style-loader!css-loader!resolve-url-loader!postcss-loader!sass-loader?indentedSyntax'
            };
        return loaders;
    }

    return {
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        preserveWhitespace: false,
                        extractCSS: isProduction,
                        loaders: createLoaders()
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