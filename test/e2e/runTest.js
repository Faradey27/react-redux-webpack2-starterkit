/* eslint-disable dot-location */
/* eslint-disable import/no-commonjs */
/* eslint-disable strict */
/* eslint-disable fp/no-let */
/* eslint-disable fp/no-mutation */

'use strict';

let url = 'http://localhost:3001';

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
