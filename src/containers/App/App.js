import { PropTypes, PureComponent } from 'react';
import HeaderBar from './components/HeaderBar';
import styles from './App.css';

class App extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
  }

  render() {
    return (
      <div>
        <HeaderBar location={this.props.location} />
        <div className={`${styles.routerContainer} scroll-container`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
