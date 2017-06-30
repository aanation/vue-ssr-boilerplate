const bundle = require('../build/vue-ssr-server-bundle.json');
const express = require('express');
const http = require('http');
const path = require('path');
const renderer = require('vue-server-renderer').createRenderer(bundle, {
  template: require('fs').readFileSync(path.join(__dirname,'../build/index.html'), 'utf-8')
});

const app = express();
app.use('/build', express.static(__dirname + '/build'));

app.get('*', (req, res) => {
  const context = { url: req.url }; 

    renderer.renderToString(context, (err, html) => {
      if (err) {
          console.log(err);
        if (err.code === 404) {
          res.status(404).end('Страница не найдена')
        } else {
          res.status(500).end('Внутренняя ошибка сервера')
        }
      } else {
        res.end(html)
      }
    }); 
});

http.createServer(app).listen(8080);