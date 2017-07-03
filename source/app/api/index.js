
//симуляция апи. Сюда можно подключить axios или другой http-клиент и фигачить роуты 
export default {
    fetchItem (id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('someData');
            }, 1000);
        });
    } 
}