import { PropTypes } from 'react';
import Input from './../common/Input';
import Checkbox from './../common/Checkbox';

export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <Input
    errorText={touched && error}
    floatingLabelText={label}
    hintText={label}
    {...input}
    {...custom}
  />
);

renderTextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
};

export const renderCheckboxField = ({ input, label, ...custom }) => (
  <Checkbox
    label={label}
    {...input}
    {...custom}
  />
);

renderCheckboxField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
};
