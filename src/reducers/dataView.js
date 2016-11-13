import Immutable from 'immutable';

const isSuccessAction = (action) => !action.error && (action.payload || action.meta.success);

const isStartAction = (action) => !action.error && !action.payload;

const getErrorMessage = (action) => {
  const { payload } = action;

  if (payload) {
    if (payload.response && payload.response.errorMessage) {
      return payload.response.errorMessage;
    }
    if (payload.statusText) {
      return `${payload.status} - ${payload.statusText}`;
    }
  }

  return 'Unknown error';
};

const invalidateViewIds = (state, action) => {
  const viewIds = action.meta && action.meta.invalidateViewIds;

  if (!viewIds || isStartAction(action)) {
    return state;
  }

  return state.mergeDeep(viewIds.reduce(
    (previous, current) => previous.set(current, new Immutable.Map({ invalidated: true })),
    new Immutable.Map())
  );
};

const updateLoadingViewId = (state, action) => {
  const { viewId } = action.meta;

  if (!viewId) {
    return state;
  }

  if (isStartAction(action)) {
    return state.mergeIn([viewId], { isInProgress: true, isFailed: false, invalidated: false });
  }

  if (isSuccessAction(action)) {
    return state.mergeIn([viewId], {
      isInProgress: false,
      isFailed: false,
    });
  }

  return state.mergeIn([viewId], {
    isInProgress: false,
    isFailed: true,
    message: getErrorMessage(action),
  });
};

export default function view(state = new Immutable.Map(), action) {
  if (!action.meta) {
    return state;
  }

  return updateLoadingViewId(
    invalidateViewIds(state, action),
    action
  );
}
