module.exports = () => {
    const isProduction = process.env.NODE_ENV === 'production';

    return {
        module: {
            rules: [
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    exclude: /node_modules/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/', 
                        name: '[name].[ext]'
                    }
                }
            ]
        }        
    }
}