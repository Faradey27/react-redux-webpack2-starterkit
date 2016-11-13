/* eslint-disable complexity */
/* eslint-disable callback-return */
/* eslint-disable fp/no-let */
/* eslint-disable fp/no-mutation */

import isPlainObject from 'lodash/isPlainObject';
import { ApiError, RequestError } from 'redux-api-middleware/lib/errors' ;
import { normalizeTypeDescriptors } from 'redux-api-middleware/lib/util';

import CALL_MOCK_API from './CALL_MOCK_API';
const SUCCESS_DELAY = 1000;

const defaultResponse = {
  ok: true,
};

const isMockRSAA = (action) => isPlainObject(action) && action.hasOwnProperty(CALL_MOCK_API);

const validateMockRSAA = (action) => {
  const validationErrors = [];

  for (const key in action) {
    if (key !== [CALL_MOCK_API]) {
      validationErrors.push(`Invalid root key: ${key}`);
    }
  }

  const callAPI = action[CALL_MOCK_API];

  if (!isPlainObject(callAPI)) {
    validationErrors.push('[CALL_MOCK_API] property must be a plain JavaScript object');
  }

  const { mockResponse } = callAPI;

  if (typeof mockResponse === 'undefined') {
    validationErrors.push('[CALL_MOCK_API] must have a mockResponse property');
  } else if (isPlainObject(mockResponse)) {
    if (mockResponse.ok !== false && typeof mockResponse.responseJSON === 'undefined') {
      validationErrors.push(
          '[CALL_MOCK_API] must have a mockResponse.responseJSON if mockResponse.ok is true or undefined');
    }
  } else if (typeof mockResponse !== 'function') {
    validationErrors.push(
        'mockResponse must be a plain js object or a function that resolves to one');
  }

  return validationErrors;
};

/**
 * A Redux middleware that processes RSAA actions.
 *
 * @type {ReduxMiddleware}
 * @access public
 */
export default function mockApiMiddleware({ dispatch, getState }) {
  return (next) => (async) (action) => {
    // Do not process actions without a [CALL_API] property
    if (!isMockRSAA(action)) {
      return next(action);
    }

    // Try to dispatch an error request FSA for invalid RSAAs
    const validationErrors = validateMockRSAA(action);

    if (validationErrors.length) {
      throw validationErrors;
    }

    // Parse the validated RSAA action
    const callAPI = action[CALL_MOCK_API];
    let { endpoint, headers } = callAPI;
    const { bailout, types } = callAPI;
    const [requestType, successType, failureType] = normalizeTypeDescriptors(types);

    // Should we bail out?
    try {
      if ((typeof bailout === 'boolean' && bailout) ||
          (typeof bailout === 'function' && bailout(getState()))) {
        return null;
      }
    } catch (err) {
      return next({
        ...requestType,
        payload: new RequestError('[CALL_API].bailout function failed'),
        error: true,
      });
    }

    // Process [CALL_API].endpoint function
    if (typeof endpoint === 'function') {
      try {
        endpoint = endpoint(getState());
      } catch (err) {
        return next({
          ...requestType,
          payload: new RequestError('[CALL_API].endpoint function failed'),
          error: true,
        });
      }
    }

    // Process [CALL_API].headers function
    if (typeof headers === 'function') {
      try {
        headers = headers(getState());
      } catch (err) {
        return next({
          ...requestType,
          payload: new RequestError('[CALL_API].headers function failed'),
          error: true,
        });
      }
    }

    // We can now dispatch the request FSA
    dispatch(requestType);

    // get fake response
    let res = {};

    if (typeof callAPI.mockResponse === 'function') {
      res = { ...defaultResponse, ...callAPI.mockResponse(action) };
    } else {
      res = { ...defaultResponse, ...callAPI.mockResponse };
    }

    // Process the server response
    if (res.ok) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const nextAction = next({ ...successType, payload: typeof successType.payload === 'function'
            ? successType.payload(
                action,
                getState(),
              {
                ...res,
                json: () => ({ then: (callback) => callback(res.responseJSON) }),
                headers: {
                  get: () => 'json',
                },
              }
              )
            : res.responseJSON,
          });

          resolve(nextAction);
        }, SUCCESS_DELAY);
      });
    }

    return next({
      ...failureType,
      payload: new ApiError(res.status, res.statusText, res.responseJSON),
      error: true,
    });
  };
}
