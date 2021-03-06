module.exports = () => {
    const isProduction = process.env.NODE_ENV === 'production';

    return {
        module: {
            rules: [
                {
                        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                        loader: 'url-loader',
                        options: {
                        limit: 10000,
                        outputPath: 'img/',
                        name: '[name].[ext]'
                    }
                }
            ]
        }        
    }
}