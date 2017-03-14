import { PureComponent, PropTypes } from 'react';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';

class AppBarWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    leftIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    theme: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  }

  render() {
    return (
      <AppBar
        className={this.props.className}
        leftIcon={this.props.leftIcon}
        theme={this.props.theme}
        title={this.props.title}
      >
        {this.props.children}
      </AppBar>
    );
  }
}

export default AppBarWrapper;
