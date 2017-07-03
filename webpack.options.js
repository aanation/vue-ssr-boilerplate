const path = require('path');

module.exports = {
    spa: {
        devserverPort: 8080, 
        publicPath: "/",        
        paths: {
            source: path.join(__dirname, 'source'),
            build: path.join(__dirname, 'build')	
        }        
    },
    ssr: {
        publicPath: "/",        
        paths: {
            source: path.join(__dirname, 'source'),
            build: path.join(__dirname, 'build')	
        }        
    }    
};