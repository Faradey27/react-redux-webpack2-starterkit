import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import PureRender from 'pure-render-decorator';

import styles from './Logo.less';

@PureRender
class Logo extends Component {
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
          />
        </Link>
      </div>
    );
  }
}

export default Logo;
