import { PureComponent } from 'react';
import AppBar from './../../../../components/common/AppBar';

import Logo from './components/Logo';
import styles from './HeaderBar.less';

class HeaderBar extends PureComponent {
  render() {
    return (
      <AppBar
        className={styles.headerBar}
        leftIcon={<Logo />}
        theme={{
          leftIcon: styles.leftIcon,
          title: styles.title,
          inner: styles.inner,
        }}
        title="React-Redux boilerplate"
      />
    );
  }
}

export default HeaderBar;
