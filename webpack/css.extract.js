const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (paths) => {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include: paths, 
                    use: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader', 
                        use: ['css-loader', 'postcss-loader']
                    })
                },
                {
                    test: /\.scss$/,
                    include: paths, 
                    use: ExtractTextPlugin.extract({
                        publicPath: '../',
                        fallback: 'style-loader', 
                        use: ['css-loader','postcss-loader','sass-loader']
                    })
                }                
            ]
        },
        plugins: [
            new ExtractTextPlugin('css/[name].css')
        ]           
    }
}; 