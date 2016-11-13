import Immutable from 'immutable';
import { USER_LOGIN_STARTED, USER_LOGIN_SUCCESS, USER_LOGOUT_STARTED } from './../../actions/users';
import localStorageUtils from './../../utils/localStorageUtils';
import { getAuthenticatedUser } from './../../selectors/users';

const users = (state, action) => {
  switch (action.type) {
    case USER_LOGIN_STARTED: {
      return state.set('authUser', new Immutable.Map());
    }
    case USER_LOGIN_SUCCESS: {
      localStorageUtils.setAuthinticatedUser(getAuthenticatedUser(action.payload));

      return state;
    }
    case USER_LOGOUT_STARTED: {
      localStorageUtils.setAuthinticatedUser({});

      return state.set('authUser', new Immutable.Map());
    }
    default:
      return state;
  }
};

export default users;
