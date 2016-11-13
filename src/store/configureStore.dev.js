import { applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { basicMiddleware, middlewaresToApply } from './commonMiddlewares';

import DevTools from '../containers/DevTools';
import rootSaga from '../sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState) {
  const store = createStore(
    ...basicMiddleware,
    preloadedState,
    compose(
      applyMiddleware(...middlewaresToApply, sagaMiddleware, createLogger()),
      DevTools.instrument()
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
