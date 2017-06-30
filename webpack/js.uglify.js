const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = () => {
    return {
        plugins: [
            new UglifyJSPlugin({
                sourceMap: true,
                compress: {
                    warnings: false 
                }
            })
        ]
    }
};