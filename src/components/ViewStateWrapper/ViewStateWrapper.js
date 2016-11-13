import { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import PureRender from 'pure-render-decorator';

import Spinner from './../Spinner';
import Message from './../Message';

import styles from './ViewStateWrapper.less';

@PureRender
export default class ViewStateWrapper extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    showMessage: PropTypes.bool,
    spinnerClassName: PropTypes.string,
    viewState: PropTypes.instanceOf(Immutable.Map),
    visibleChildren: PropTypes.bool,
  };

  static defaultProps = {
    showMessage: true,
    className: '',
    visibleChildren: true,
  };

  render() {
    const { viewState, children, showMessage, className, visibleChildren } = this.props;

    if (viewState.get('isInProgress') && visibleChildren) {
      return (
        <div className={`${styles.viewStateWrapper} ${className}`}>
          <Spinner className={this.props.spinnerClassName} />
          <div style={{ opacity: 0.6, pointerEvents: 'none' }}>
            {children}
          </div>
        </div>
      );
    }

    if (viewState.get('isInProgress')) {
      return <Spinner className={this.props.spinnerClassName} />;
    }

    if (viewState.get('isFailed') && showMessage) {
      return (
        <Message
          children={this.renderRefreshIcon()}
          message={viewState.get('message')}
          messageType="error"
        />
      );
    }

    return (
      <div className={`${styles.viewStateWrapper} ${className}`}>
        {children}
      </div>
    );
  }
}
