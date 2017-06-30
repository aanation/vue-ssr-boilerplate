module.exports = () => {
    return {
        module: {
            rules: [
                {
                    test: /\.pug$/,  
                    loader: 'pug-loader',
                    options: {
                        pretty: true 
                    }              
                }
            ]
        }        
    }
};