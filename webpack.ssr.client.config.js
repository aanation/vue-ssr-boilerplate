const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/* Модули конфига*/
const baseConfig = require('./webpack.ssr.base.config');
const OPTIONS = require('./config.js').ssr;

const config = merge([
    baseConfig(), 
    {
        entry: OPTIONS.paths.clientEntry, 
        resolve: {
            alias: {
                'create-api': './create-api-client.js'
            }
        },        
        plugins: [
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
                chunks: ['vendor'],
                minChunks: Infinity
            }),
            new VueSSRClientPlugin(),
            new CopyWebpackPlugin([
                {
                    from: path.join(__dirname, 'static'),
                    to: path.join(OPTIONS.paths.build, 'static'),
                    ignore: ['.*']
                }
            ])                  
        ]        
    }
]);

module.exports = config;