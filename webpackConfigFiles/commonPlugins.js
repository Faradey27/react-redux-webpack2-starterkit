/* eslint-disable import/no-commonjs*/
/* eslint-disable import/no-nodejs-modules*/
/* eslint-disable fp/no-mutation*/
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = [
  new webpack.ProvidePlugin({
    React: 'react',
  }),
  new webpack.ProvidePlugin({
    jQuery: 'jquery',
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    title: 'React redux boilerplate',
    favicon: './favicon.ico',
    inject: 'body',
  }),
  new webpack.LoaderOptionsPlugin({
    test: /\.less$/,
    options: {
      postcss: [
        autoprefixer({
          browsers: [
            'last 3 version',
            'ie >= 10',
          ],
        }),
      ],
    },
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];
