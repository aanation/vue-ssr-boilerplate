const path = require('path');
require('dotenv').config({
    path: path.resolve('./app.env')
});

const env = {
    'BACKEND_URL': JSON.stringify(process.env.BACKEND_URL)
}; 

module.exports = {
    spa: {
        devserverPort: 8080, 
        publicPath: "/",        
        paths: {
            source: path.join(__dirname, 'source'),
            build: path.join(__dirname, 'dist-spa')	
        },
        proxy: {
            context: process.env.PROXY_CONTEXT, 
            target: process.env.BACKEND_URL,
            secure: false 
        },
        env        
    },
    
    ssr: {
        proxy: {
            context: process.env.PROXY_CONTEXT, 
            target: process.env.BACKEND_URL
        },        
        publicPath: "/",        
        paths: {
            source: path.join(__dirname, 'source'),
            build: path.join(__dirname, 'dist'),
            serverEntry: path.join(__dirname, 'source/entry-server.js'),
            clientEntry: path.join(__dirname, 'source/entry-client.js'),
        },
        env 
    }    
};