import { PureComponent, PropTypes } from 'react';
import Link from 'react-toolbox/lib/link/Link';

class LinkWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  }

  render() {
    return (
      <Link>
        {this.props.children}
      </Link>
    );
  }
}

export default LinkWrapper;
