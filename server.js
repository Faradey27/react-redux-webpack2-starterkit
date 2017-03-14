/* eslint-disable import/no-commonjs */
/* eslint-disable global-require */
/* eslint-disable import/no-nodejs-modules */
/* eslint-disable import/no-extraneous-dependencies */

const PORT = 3002;
const NOT_FOUND = -1;

const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const express = require('express');
const app = express();

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler, { noInfo: true }));

app.use((req, res) => {
  if (req.url.indexOf('config/config') !== NOT_FOUND) {
    return res.sendFile(path.join(__dirname, '/src/config/config.js'));
  }

  return res.sendFile(path.join(__dirname, '/src/index.dev.html'));
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', PORT);
  }
});
