const MIN_LOGIN_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 6;

const validateLogin = (login) => {
  if (!login) {
    return 'Required';
  }

  return login.length < MIN_LOGIN_LENGTH ? 'Login is too short' : '';
};

const validatePassword = (password) => {
  if (!password) {
    return 'Required';
  }

  return password.length < MIN_PASSWORD_LENGTH ? 'Password is too short' : '';
};

export const loginValidation = (vals) => {
  const values = vals.toJS();

  return {
    login: validateLogin(values.login),
    password: validatePassword(values.password),
  };
};

export const schemaConstructorValidation = (vals) => {
  const values = vals.toJS();

  return {
    name: !values.name ? 'Required' : '',
    namespace: !values.namespace ? 'Required' : '',
  };
};

export const addFieldValidation = (vals) => {
  const values = vals.toJS();

  return {
    fieldName: !values.fieldName ? 'Required' : '',
    fieldType: !values.fieldType ? 'Required' : '',
  };
};
