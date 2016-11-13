import { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import PureRender from 'pure-render-decorator';

import Logo from './Logo';

import styles from './HeaderBar.less';

@PureRender
class HeaderBar extends Component {
  static propTypes = {
    location: PropTypes.object,
  }

  renderIcons() {
    return (
      <div className={styles.menu}>
        <Logo key="logo" />
      </div>
    );
  }

  render() {
    return (
      <div>
        <AppBar
          className={styles.headerBar}
          iconElementLeft={this.renderIcons()}
          iconElementRight={<span />}
          iconStyleLeft={{ margin: 0 }}
          iconStyleRight={{ margin: 0 }}
        />
      </div>
    );
  }
}

export default HeaderBar;
