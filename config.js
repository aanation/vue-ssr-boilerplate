const path = require('path');

module.exports = {
    spa: {
        devserverPort: 8080, 
        publicPath: "/",        
        paths: {
            source: path.join(__dirname, 'source'),
            build: path.join(__dirname, 'dist-spa')	
        },
        proxy: {
            context: '/api', 
            target: 'http://localhost:3000',
            secure: false 
        }             
    },
    
    ssr: {
        proxy: {
            context: '/api', 
            target: 'http://localhost:3000'
        },        
        publicPath: "/",        
        paths: {
            source: path.join(__dirname, 'source'),
            build: path.join(__dirname, 'dist'),
            serverEntry: path.join(__dirname, 'source/enrty-server.js'),
            clientEntry: path.join(__dirname, 'source/entry-client.js'),
        }        
    }    
};