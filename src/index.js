/* eslint-disable import/no-deprecated */
/* eslint-disable import/imports-first */
/* eslint-disable global-require */

import 'jquery';
import './../vendorModules/flot/jquery.flot.min.js';

import Immutable from 'immutable';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import Root from './containers/Root';
import configureStore from './store/configureStore';
import localStorageUtils from './utils/localStorageUtils';

import './assets/normalize.less';
import './assets/media.less';
import './assets/typography.less';
import './styles.less';

const authUser = localStorageUtils.getAuthinticatedUser();

const initialState = authUser
  ? Immutable.fromJS({
    entities: {
      authUser: {
        [authUser.login]: authUser,
      },
    },
  })
  : new Immutable.Map();

const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toJS();
  },
});

/*
  we require next line to support onTouchTap event
  which will solve a lot of "click" problems for mobile devices
*/
injectTapEventPlugin();

render(
  <AppContainer>
    <Root
      history={history}
      store={store}
    />
  </AppContainer>,
  document.getElementById('content')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextApp = require('./containers/Root').default;

    render(
      <AppContainer>
        <NextApp
          history={history}
          store={store}
        />
      </AppContainer>,
      document.getElementById('content')
    );
  });
}
