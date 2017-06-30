module.exports = (port) => {
    return {
        devServer: {
            stats: 'errors-only',
            port, 
            historyApiFallback: true,
            noInfo: true            
        }   
    }
} 



