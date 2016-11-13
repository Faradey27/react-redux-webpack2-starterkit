import { PropTypes, Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import HeaderBar from './../components/HeaderBar';
import Snackbar from './../components/Snackbar';
import styles from './App.less';

import themes from './../uiTheme/themes';

const activeTheme = themes.DARK_THEME;

const theme = () => getMuiTheme({
  palette: {
    primary1Color: activeTheme.mainThemeColor,
  },
});

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
  }

  static childContextTypes = {
    theme: PropTypes.object,
  }

  getChildContext() {
    return {
      theme: activeTheme,
    };
  }

  getThematicStyles = () => ({
    app: {
      backgroundColor: activeTheme.mainBackgroundColor,
    },
  })

  render() {
    const inlineStyles = this.getThematicStyles();

    return (
      <div
        className={styles.app}
        style={inlineStyles.app}
      >
        <MuiThemeProvider muiTheme={theme()}>
          <div>
            <HeaderBar location={this.props.location} />
            <Snackbar />
            <div className={`${styles.routerContainer} scroll-container`}>
              {this.props.children}
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
