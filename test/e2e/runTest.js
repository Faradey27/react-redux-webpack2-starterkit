/* eslint-disable dot-location */
/* eslint-disable import/no-commonjs */
/* eslint-disable strict */

'use strict';

let url = '';

module.exports = {
  before(browser) {
    url = browser.launch_url;
  },
  'Example run'(browser) {
    browser
      .url(url)
      .end();
  },
};
