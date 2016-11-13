import { Component, PropTypes } from 'react';
import PureRender from 'pure-render-decorator';
import CircularProgress from 'material-ui/CircularProgress';

import styles from './Spinner.less';

@PureRender
class Spinner extends Component {
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
