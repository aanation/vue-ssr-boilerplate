import { createApp } from './app/app.js';

const { app, router, store } = createApp();
import { preloadData } from './app/store';
import Logger from './app/logger';
const logger = new Logger(); 

let preload = typeof preloadData === "function" ? preloadData : () => { return Promise.resolve() }; 

function beforeResolve(to, from, next) {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
 
    // мы заботимся только об отсутствующих ранее компонентах,
    // поэтому мы сравниваем два списка, пока не найдём отличия
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
 
    if (!activated.length) {
      return next()
    }
 
    // здесь мы должны вызвать индикатор загрузки, если используем его
 
    Promise.all(activated.map(c => {
      if (c.storeRegister) {
          c.storeRegister({store}); 
      }
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(() => {
 
      // останавливаем индикатор загрузки
 
      next()
    }).catch(next);
};


if (window.__INITIAL_STATE__) {

    router.onReady(() => {
        const matchedComponents = router.getMatchedComponents();
        matchedComponents.forEach(Component => {
            if (Component.storeRegister) {
                Component.storeRegister({store}); 
            }
            store.replaceState(window.__INITIAL_STATE__);
        }); 
        router.beforeResolve(beforeResolve);
        app.$mount('#app')
    });
} else {
    //когда используется классическое спа осуществляем предзагрузку данных на клиенте
    router.onReady(() => {
        //добавляем хуку beforeResolve для вызова асинкДата при загрузке обычного спа
        router.beforeResolve(beforeResolve);
        preload(store)
            .then(() => {
                //после предварительной загрузки данных вызываем функцию асинк дата заматченного компонента 
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
                app.$mount('#app');
            }) 
            .catch(err => {
                logger.error(err); 
            });
    });
}

