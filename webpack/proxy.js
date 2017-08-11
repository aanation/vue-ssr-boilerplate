module.exports = ({context, target, secure}) => {
    let proxy = {
        proxy: {}
    }; 
    proxy.proxy[context] = {
        target, secure
    };
    return proxy; 
}; 