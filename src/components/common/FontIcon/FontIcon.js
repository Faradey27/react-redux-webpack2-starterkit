import { PureComponent, PropTypes } from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';

class FontIconWrapper extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    placeholder: '',
  }

  render() {
    return (
      <FontIcon
        className={this.props.className}
        value={this.props.value}
      />
    );
  }
}

export default FontIconWrapper;
