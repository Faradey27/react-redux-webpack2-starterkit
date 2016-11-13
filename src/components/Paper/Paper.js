import { Component, PropTypes } from 'react';
import PureRender from 'pure-render-decorator';
import MaterialPaper from 'material-ui/Paper';

import styles from './Paper.less';

@PureRender
class Paper extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    onTouchTap: PropTypes.func,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    return (
      <div
        className={`${styles.paper} ${this.props.className}`}
        onTouchTap={this.props.onTouchTap}
      >
        <MaterialPaper style={this.props.style}>
          {this.props.children}
        </MaterialPaper>
      </div>
    );
  }
}

export default Paper;
