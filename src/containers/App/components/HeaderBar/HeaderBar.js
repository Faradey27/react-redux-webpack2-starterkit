import { PureComponent } from 'react';
import Link from './../../../../components/common/Link';
import AppBar from './../../../../components/common/AppBar';
import Navigation from './../../../../components/common/Navigation';

import Logo from './components/Logo';
import styles from './HeaderBar.less';

class HeaderBar extends PureComponent {
  render() {
    return (
      <AppBar
        className={styles.headerBar}
        leftIcon={<Logo />}
        theme={{
          leftIcon: 'leftIcon',
        }}
        title="React Toolbox"
      >
        <Navigation type="horizontal">
          <Link
            href="http://"
            icon="inbox"
            label="Inboxsfsd"
          />
        </Navigation>
      </AppBar>
    );
  }
}

export default HeaderBar;
