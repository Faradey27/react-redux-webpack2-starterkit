import { createSelector } from 'reselect';
import Immutable from 'immutable';

const getAuthenticatedUserData = (state) => state.getIn(['entities', 'authUser']).toList().first();

export const getAuthenticatedUser = createSelector(
  [getAuthenticatedUserData],
  (app) => app || new Immutable.Map()
);
