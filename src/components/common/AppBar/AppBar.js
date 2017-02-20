import { PureComponent, PropTypes } from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';

class AppBarWrapper extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    leftIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  }

  render() {
    return (
      <AppBar
        className={this.props.className}
        leftIcon={this.props.leftIcon}
        title={this.props.title}
      />
    );
  }
}

export default AppBarWrapper;
