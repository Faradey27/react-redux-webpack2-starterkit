import { PureComponent, PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import styles from './Spinner.css';

class Spinner extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.number,
  }

  render() {
    return (
      <div className={`${styles.spinner} ${this.props.className}`}>
        <CircularProgress
          className={styles.spinner}
          size={this.props.size}
        />
      </div>
    );
  }
}

export default Spinner;
