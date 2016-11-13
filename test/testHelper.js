/* eslint-disable fp/no-mutation */
import 'babel-polyfill';
import React from 'react';
import { jsdom } from 'jsdom';

import chai, { assert, expect } from 'chai';
import chaiString from 'chai-string';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

chai.use(chaiAsPromised);

chai.use(chaiString);

global.assert = assert;
global.expect = expect;
global.sinon = sinon;
global.React = React;

require.extensions['.scss'] = () => {};
require.extensions['.less'] = () => {};
require.extensions['.css'] = () => {};
require.extensions['.svg'] = () => {};
require.extensions['.png'] = () => {};
require.extensions['.jpg'] = () => {};

const exposedProperties = ['navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
