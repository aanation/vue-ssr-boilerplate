import axios from 'axios'; 

export function createAxios(config={}) {
    return axios.create(Object.assign({
        baseURL: `http://localhost:${process.env.BACKEND_PORT || process.env.PORT || 8080}`        
    }, config)); 
}