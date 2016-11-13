/* eslint-disable */

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./webpackConfigFiles/webpack.config.prod');
} else {
  module.exports = require('./webpackConfigFiles/webpack.config.dev');
}
