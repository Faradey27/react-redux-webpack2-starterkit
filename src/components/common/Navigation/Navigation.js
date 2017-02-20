import { PureComponent, PropTypes } from 'react';
import Navigation from 'react-toolbox/lib/navigation/Navigation';

class NavigationWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    type: PropTypes.string,
  }

  render() {
    return (
      <Navigation type={this.props.type}>
        {this.props.children}
      </Navigation>
    );
  }
}

export default NavigationWrapper;
