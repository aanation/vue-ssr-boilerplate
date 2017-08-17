# SSR VueJS 42px Template
## Использование

**npm run dev** - запускает dev-server с серверным рендерингом

**npm run build** - билдит серверный бандл и клиентский манифест для серверного рендеринга

**npm run build-server** - билдит серверный бандл для SSR

**npm run build-client** - билдит клиентское приложение, формирует манифест SSR 

**npm run render-server** - запускает продакшн рендер-сервер на базе express. 

**npm run dev-spa** - запускает dev-server с традиционным SPA (без SSR)

**npm run build-spa** - билдит традиционное spa (без SSR)

**npm run tests** - запуск юнит-тестов Karms + mocha 

## Конфиг (в процессе разработки)

Основной конфиг фронтенда находится в /config.js. 
Там можно (и нужно) настроить сервер и порт на который будут проксироваться запросы к api (сервер с апи). Там же настраивается каталог в который будет билдится собранный фронтенд. 
Конфиг в достаточной степени очевиден. 

## Подключение на продакшене 

Точка входа в приложение экспортирует express-инстанс рендер-сервера. 
Это позволяет подключить фронтенд как npm-зависимость.

1) в package.json подключить репозиторий с фронтендом: 
```json
{
    "frontend": "git+ssh://FRONTEND_REPOSITORY",
}
```

где FRONTEND_REPOSITORY - репозиторий с фронтендом. 

2) подключить инстанс рендер-сервера там где его планируется использовать:
```javascript
const renderServer = require('vue-ssr-frontend');
const app = renderServer({
    useProxy: true
});

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost: ${port}`)
});
```
при включенной опции useProxy рендер-сервер будет проксировать все запросы к /api на localhost:3000. 
Можно также передать свой сервер и порт для проксирования:

```javascript
const renderServer = require('vue-ssr-frontend'');
const app = renderServer({
    useProxy: true,
    proxyTarget: 'http://localhost:5656'
});
```

или переложить проксирование на внешний front-сервер: 
```javascript
const renderServer = require('vue-ssr-frontend'');
const app = renderServer({
    useProxy: false //рендер-сервер не проксирует запросы к апи
});
```





