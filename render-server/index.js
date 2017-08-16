const fs = require('fs');
const path = require('path');
const LRU = require('lru-cache');
const express = require('express');
const compression = require('compression');
const resolve = file => path.resolve(__dirname, file);
const { createBundleRenderer } = require('vue-server-renderer');


const isProd = process.env.NODE_ENV === 'production'; 
const useMicroCache = process.env.MICRO_CACHE !== 'false';
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

const proxy = require('http-proxy-middleware');
const proxyTable = require('../config.js').ssr.proxy; 
const config = require('../config.js'); 


const app = express();

const template = fs.readFileSync(path.join(config.ssr.paths.source, 'index.html'), 'utf-8');

function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    template,
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    runInNewContext: false
  }))
}

let renderer
let readyPromise
if (isProd) {
  const bundle = require(path.join(config.ssr.paths.build, 'vue-ssr-server-bundle.json'));
  const clientManifest = require(path.join(config.ssr.paths.build, 'vue-ssr-client-manifest.json'));
  renderer = createRenderer(bundle, {
    clientManifest
  });
} else {
  readyPromise = require('../ssr.setupdevserver')(app, (bundle, options) => {
    renderer = createRenderer(bundle, options)
  })
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(proxyTable.context, proxy({target: proxyTable.target}));
app.use(compression({ threshold: 0 }));
app.use('/', express.static(config.ssr.paths.build));


const microCache = LRU({
  max: 100,
  maxAge: 1000
})

const isCacheable = req => useMicroCache

function render (req, res) {
  const s = Date.now();

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Server", serverInfo);

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.status(404).end('404 | Page Not Found')
    } else {
      res.status(500).end('500 | Internal Server Error');
      console.error(`error during render : ${req.url}`);
      console.error(err.stack);
    }
  }

  const cacheable = isCacheable(req)
  if (cacheable) {
    const hit = microCache.get(req.url)
    if (hit) {
      if (!isProd) {
        console.log(`cache hit!`)
      }
      return res.end(hit)
    }
  }

  const context = {
    url: req.url
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err);
    }
    res.end(html)
    if (cacheable) {
      microCache.set(req.url, html)
    }
  })
}

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
});
