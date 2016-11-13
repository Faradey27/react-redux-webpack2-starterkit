import { PropTypes } from 'react';
import Input from './../Fields/Input';
import Checkbox from './../Fields/Checkbox';
import SelectField from './../Fields/SelectField';

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

export const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <SelectField
    errorText={touched && error}
    floatingLabelText={label}
    {...input}
    children={children}
    {...custom}
    onChange={(event, index, value) => input.onChange(value)} // eslint-disable-line
  />
);

renderSelectField.propTypes = {
  children: PropTypes.node,
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
};
