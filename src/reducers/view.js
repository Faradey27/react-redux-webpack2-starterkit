import Immutable from 'immutable';
import uuid from 'uuid';

import { REMOVE_NOTIFICATION } from './../actions/view';

const MAX_NOTIFICATION_NUMBER = 6;

const getNextNotificationMessage = (data) => (Immutable.fromJS({
  message: data.error ? `Something went wrong in ${data.type}` : data.message,
  type: data.error ? 'error' : data.type,
  id: uuid.v4(),
}));

const initialState = Immutable.fromJS({
  notifications: [],
});

export default (state = initialState, action) => {
  if (action.error) {
    const nextNotification = state.get('notifications').unshift(getNextNotificationMessage(action));

    return state.set('notifications',
      nextNotification.size > MAX_NOTIFICATION_NUMBER
        ? nextNotification.setSize(MAX_NOTIFICATION_NUMBER)
        : nextNotification
    );
  } else if (action.notification) {
    const nextNotification = state.get('notifications').unshift(getNextNotificationMessage(action.notification));

    return state.set('notifications',
      nextNotification.size > MAX_NOTIFICATION_NUMBER
        ? nextNotification.setSize(MAX_NOTIFICATION_NUMBER)
        : nextNotification
    );
  }

  switch (action.type) {
    case REMOVE_NOTIFICATION: {
      const notifications = state.get('notifications').filter((notification) => notification.get('id') !== action.id);

      return state.set('notifications', notifications);
    }
    default: {
      return state;
    }
  }
};
