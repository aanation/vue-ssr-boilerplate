import {createAPI} from 'create-api'; 

const api = createAPI(); 


//симуляция апи. Сюда можно подключить axios или другой http-клиент и фигачить роуты 
export async function fetchItem (id) {
    try {
        return 'someData'; 
    } catch(err) {
        throw err;
    }
} 