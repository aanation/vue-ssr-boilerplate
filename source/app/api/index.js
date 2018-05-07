import axiosLib from 'axios'; 

const axios = axiosLib.create({
    baseURL: BACKEND_BASE_URL // предоставляется приложению извне на этапе сборки        
}); 


// симуляция апи
export async function fetchItem (id) {
    try {
        return 'someData'; 
    } catch(err) {
        throw err;
    }
} 