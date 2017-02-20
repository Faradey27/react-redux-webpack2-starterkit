/* eslint-disable func-style*/

import { takeEvery } from 'redux-saga/effects';

function *handleSomething() {
  console.info('HANDLERRR');
  yield null;
}

export function *entitie() {
  yield [
    takeEvery('someactiontype', handleSomething),
  ];
}

export default entitie;
