import { Route, IndexRedirect } from 'react-router';

import App from './containers/App';
import AppsPage from './containers/pages/AppsPage';
import AuthenticationPage from './containers/pages/AuthenticationPage';
import { userIsAuthenticated } from './utils/authWrappers.js';

export default (
  <Route
    component={App}
    path="/"
  >
    <IndexRedirect to="/apps" />
    <Route
      component={userIsAuthenticated(AppsPage)}
      path="/apps"
    />
    <Route
      component={AuthenticationPage}
      path="/login"
    />
  </Route>
);
