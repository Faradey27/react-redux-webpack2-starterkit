import { PureComponent, PropTypes } from 'react';
import { Button } from 'react-toolbox/lib/button/Button';

class ButtonWrapper extends PureComponent {
  static propTypes = {
    accent: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onTouchTap: PropTypes.func,
  }

  render() {
    return (
      <Button
        accent={this.props.accent}
        className={this.props.className || ''}
        disabled={this.props.disabled}
        icon={this.props.icon}
        label={this.props.label}
        onMouseUp={this.props.onTouchTap}
      />
    );
  }
}

export default ButtonWrapper;
