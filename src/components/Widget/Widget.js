import { PureComponent, PropTypes } from 'react';

import styles from './Widget.css';

class Widget extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div className={styles.widget}>
        {this.props.children}
      </div>
    );
  }
}

export default Widget;
