import { createApp } from './app/app.js';
import { preloadData } from './app/store';

let preload = typeof preloadData === "function" ? preloadData : () => { return Promise.resolve() }; 

export default (context) => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp(); 
        
        router.push(context.url);
        router.onReady(() => {
            //выполнение экшенов предзагрузки глобального состояния приложения
            preload(store)
                .then(() => {
                    const matchedComponents = router.getMatchedComponents();
                    //получаем все компоненты заматченные по этому роуту
                    if (matchedComponents.length === 0) {
                        return reject({ code: 404 });
                    }

                    //вызываем их функции asyncData для асинхронного получения данных
                    return Promise.all(matchedComponents.map(Component => {
                        //до выполнения асинк дата регистрируем стор 
                        if (Component.storeRegister) {
                            Component.storeRegister({store});
                        }
                        if (Component.asyncData) {
                            return Component.asyncData({
                                store, route: router.currentRoute
                            });
                        }
                    }));
                })
                .then(() => {
                    //после того как все ассинхронные данные получены, присоединяем чертово хранилище к
                    //контексту для вставки его инлайн в отрендерненную сервером страничку
                    context.state = store.state; 
                    resolve(app);
                })
                .catch(reject); 
        }, reject);
    });
}

