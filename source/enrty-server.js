import { createApp } from './app/app.js';


export default (context) => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp(); 
        router.push(context.url);
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            //получаем все компоненты заматченные по этому роуту
            if (matchedComponents.length === 0) {
                return reject({ code: 404 });
            }
            //вызываем их функции asyncData для асинхронного получения данных
            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store, route: router.currentRoute
                    });
                }
            })).then(() => {
                //после того как все ассинхронные данные получены, присоединяем чертово хранилище к
                //контексту для вставки его инлайн в отрендерненную сервером страничку
                context.state = store.state; 
                resolve(app);
            }).catch(reject);
        }, reject);
    });
}

