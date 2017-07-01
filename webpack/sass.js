module.exports = (paths) => {
    const isProduction = process.env.NODE_ENV === 'production';

    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: paths, 
                    use: [
                        'style-loader',
                        'css-loader', 
                        'sass-loader'
                    ]
                }
            ]
        }
    };
};