/* eslint-disable new-cap */
import { replace } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';

import { getAuthenticatedUser } from './../selectors/users';
import userUtils from './userUtils';

export const userIsAuthenticated = UserAuthWrapper({
  authSelector: getAuthenticatedUser,
  predicate: userUtils.isAuthenticated,
  redirectAction: replace,
  wrapperDisplayName: 'UserIsAuthenticated',
});
