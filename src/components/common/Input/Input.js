import { PureComponent, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';

class InputWrapper extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    placeholder: '',
  }

  render() {
    return (
      <Input
        className={this.props.className}
        label={this.props.value}
        type={this.props.type}
        onChange={this.props.onChange}
      />
    );
  }
}

export default InputWrapper;
