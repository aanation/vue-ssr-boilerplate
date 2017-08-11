module.exports = () => {
    return {
        module: {
            rules: [
            {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            }
            ]
        }        
    }
}