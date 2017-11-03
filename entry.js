//точка входа для подключения фронтенда как npm модуля 
//чтобы не тащить все дев зависимости 
const env = process.env.NODE_ENV; 
const server = require('./render-server/server.js');

module.exports = function() {
    process.env.NODE_ENV = 'production'; 
    const app =  server.apply(this, arguments); 
    process.env.NODE_ENV = env; 
    return app; 
};