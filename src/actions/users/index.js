// import { CALL_API } from 'redux-api-middleware'; TODO should replace CALL_MOCK_API
import { CALL_MOCK_API } from './../../mockApi';
import { USER } from './../../constants/MappersTypes';
import { API_URL } from './../../constants/Api';
import { LOGIN_VIEW_STATE } from './../../constants/ViewStates';

import schemaUtils from './../../utils/schemaUtils';
import authUserSchema from './../../schemas/authUser';

export const USER_LOGIN_STARTED = 'USER_LOGIN_STARTED';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

const fetchUserLogin = ({ login, password }) => {
  const meta = { viewId: LOGIN_VIEW_STATE, mapperType: USER };

  return {
    [CALL_MOCK_API]: {
      types: [
        { type: USER_LOGIN_STARTED, meta },
        schemaUtils.getSuccessActionTypeWithSchema({ type: USER_LOGIN_SUCCESS, schema: authUserSchema, meta }),
        { type: USER_LOGIN_FAILURE, meta },
      ],
      method: 'POST',
      body: JSON.stringify({
        login,
        password,
      }),
      mockResponse: {
        responseJSON: {
          login,
          password,
          roles: ['ADMIN'],
        },
      },
      endpoint: `${API_URL}/login`,
    },
  };
};

export const loginUser = ({ login, password }) => (dispatch) => dispatch(fetchUserLogin({ login, password }));

export const USER_LOGOUT_STARTED = 'USER_LOGOUT_STARTED';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';

const fetchUserLogout = () => ({
  [CALL_MOCK_API]: {
    types: [USER_LOGOUT_STARTED, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAILURE],
    method: 'POST',
    mockResponse: { responseJSON: {} },
    endpoint: `${API_URL}/logout`,
  },
});

export const logoutUser = () => (dispatch) => dispatch(fetchUserLogout());
