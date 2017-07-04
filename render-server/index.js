const express = require('express');
const http = require('http');
const path = require('path');

const template = require('fs').readFileSync(path.join(__dirname, '../source/index.html'), 'utf-8');
const serverBundle = require('../build/vue-ssr-server-bundle.json');
const clientManifest = require('../build/vue-ssr-client-manifest.json');

const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
	runInNewContext: false,
	template,
	clientManifest
});

const app = express();

app.use('/', express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
	const context = { url: req.url }; 

	renderer.renderToString(context, (err, html) => {
		if (err) {
			return res.end('err'); 
		}
		res.end(html);
	});
});

const PORT = process.env.PORT || 8080;

http.createServer(app).listen(PORT);