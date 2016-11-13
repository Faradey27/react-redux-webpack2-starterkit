import { createSelector } from 'reselect';
import Immutable from 'immutable';

const getNotificationsList = (state) => state.getIn(['view', 'notifications']);

export const getNotifications = createSelector(
  [getNotificationsList],
  (notifications) => notifications || new Immutable.List()
);

export const getViewState = (state, viewId) => state.getIn(['dataView', viewId]) || new Immutable.Map();
