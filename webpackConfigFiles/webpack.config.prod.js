/* eslint-disable import/no-commonjs*/
/* eslint-disable import/no-nodejs-modules*/
/* eslint-disable quote-props*/
/* eslint-disable fp/no-mutation*/

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const commonPlugins = require('./commonPlugins');
const commonLoaders = require('./commonLoaders');

const cssmodulesScope = '?modules&importLoaders=1&localIdentName=[name]__[hash:base64:5]';

module.exports = {
  devtool: 'hidden-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'bundle.[hash].js',
  },
  plugins: [
    ...commonPlugins,
    new webpack.optimize.DedupePlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new ExtractTextPlugin({
      filename: 'style.[contentHash].css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      '__DEVTOOLS__': false,
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  module: {
    loaders: [
      ...commonLoaders,
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader',
        }),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: `css-loader${cssmodulesScope}!postcss-loader!less-loader`,
        }),
      },
    ],
  },
};
