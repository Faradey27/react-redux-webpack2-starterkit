import { PureComponent, PropTypes } from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';

class CheckboxWrapper extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
  }

  render() {
    return (
      <Checkbox
        checked={this.props.value}
        className={this.props.className}
        label={this.props.label}
        onChange={this.props.onChange}
      />
    );
  }
}

export default CheckboxWrapper;
