import { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router';

import logo from './img/logo.png';

import styles from './Logo.less';

class Logo extends PureComponent {
  static contextTypes = {
    i18n: PropTypes.object,
  }

  render() {
    const { l } = this.context.i18n;

    return (
      <div>
        <Link to="/">
          <img
            alt={l('Logo')}
            className={styles.logo}
            src={logo}
          />
        </Link>
      </div>
    );
  }
}

export default Logo;
