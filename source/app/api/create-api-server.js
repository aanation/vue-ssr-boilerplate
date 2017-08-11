import axios from 'axios'; 

export function createAPI(config={}) {
    return axios.create(Object.assign({
        baseURL: `http://localhost:${process.env.PORT || 8080}`        
    }, config)); 
}