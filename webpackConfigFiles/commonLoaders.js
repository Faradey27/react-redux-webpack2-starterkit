/* eslint-disable import/no-commonjs*/
/* eslint-disable import/no-nodejs-modules*/
/* eslint-disable fp/no-mutation*/
const path = require('path');

module.exports = [
  {
    test: /\.svg/,
    loader: 'url-loader',
    query: {
      limit: 26000,
      mimetype: 'image/svg+xml',
    },
  },
  {
    test: /\.png/,
    loader: 'url-loader',
    query: {
      limit: 26000,
      mimetype: 'image/png',
    },
  },
  {
    test: /\.(woff|woff2|ttf|eot)/,
    loader: 'url-loader',
    query: {
      limit: 1,
    },
  },
  {
    test: /vendorModules\/.+\.(jsx|js)$/,
    loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window',
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules|bower_components|vendorModules/,
    include: path.resolve('./../'),
  },
  {
    test: /\.js$/,
    loader: 'eslint-loader',
    exclude: /node_modules|bower_components|vendorModules/,
    include: path.resolve('./../'),
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
  },
];
