import { Component, PropTypes } from 'react';
import PureRender from 'pure-render-decorator';

import styles from './FontIcon.less';

@PureRender
class FontIcon extends Component {
  static propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    type: PropTypes.string.isRequired,
    onTouchTap: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    color: '',
  }

  render() {
    return (
      <div
        className={`${styles.fontIcon} ${this.props.className}`}
        onTouchTap={this.props.onTouchTap}
      >
        <i
          className={`material-icons ${this.props.type}`}
          style={{ color: this.props.color }}
        >
          {this.props.type}
        </i>
      </div>
    );
  }
}

export default FontIcon;
