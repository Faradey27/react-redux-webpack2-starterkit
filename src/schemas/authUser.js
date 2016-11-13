import { Schema } from 'normalizr';

const user = new Schema('authUser', {
  idAttribute: 'email',
});

export default user;
