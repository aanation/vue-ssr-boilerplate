import axios from 'axios'; 

export function createAxios(config={}) {
    return axios.create(config);
}