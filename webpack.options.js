const path = require('path');

module.exports = {
    spa: {
        devserverPort: 8080, 
        publicPath: "/",        
        paths: {
            source: path.join(__dirname, 'source'),
            build: path.join(__dirname, 'spa')	
        }        
    },
    ssr: {
        publicPath: "/",        
        paths: {
            source: path.join(__dirname, 'source'),
            build: path.join(__dirname, 'build'),
            serverEntry: path.join(__dirname, 'source/enrty-server.js'),
            clientEntry: path.join(__dirname, 'source/entry-client.js'),
        }        
    }    
};