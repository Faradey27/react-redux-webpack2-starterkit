import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { basicMiddleware, middlewaresToApply } from './commonMiddlewares';
import rootSaga from '../sagas/sagas';
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState) {
  const store = createStore(
    ...basicMiddleware,
    preloadedState,
    applyMiddleware(...middlewaresToApply, sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
