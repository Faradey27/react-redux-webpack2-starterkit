import { Component, PropTypes } from 'react';
import PureRender from 'pure-render-decorator';
import { UNDEFINED_VALUE } from './../../constants/Constants';

import styles from './Message.less';

const inlineStyles = {
  error: {
    backgroundColor: 'rgb(255, 64, 129)',
  },
};

@PureRender
export default class Message extends Component {

  static MESSAGE_TYPES = ['info', 'ok', 'warning', 'error'];

  static defaultProps = {
    messageType: 'info',
  };

  static propTypes = {
    children: PropTypes.node,
    dismissed: PropTypes.bool,
    message: PropTypes.string,
    messageType: PropTypes.string,
    onDismiss: PropTypes.func,
  };

  state = {
    dismissed: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== this.props.message || nextProps.messageType !== this.props.messageType) {
      this.setState({ dismissed: false });
    }
  }

  handleDismiss = () => {
    this.setState({ dismissed: true });
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  }

  handleMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  renderIcon(messageType) {
    switch (messageType) {
      case 'error':
        return <span />;
      case 'warning':
        return <span />;
      case 'info':
        return <span />;
      case 'ok':
        return <span />;
      default:
        return null;
    }
  }

  render() {
    const { message, messageType } = this.props;

    if (this.props.dismissed || this.props.dismissed === UNDEFINED_VALUE && this.state.dismissed) {
      return null;
    }

    return (
      <div
        className={`${styles.message} ${messageType}`}
        style={inlineStyles[messageType]}
      >
        {this.renderIcon(messageType)}
        <div className={`message-content ${styles.msgWrap}`}>
          <span onMouseUp={this.handleMouseUp}>{message}</span>
        </div>
        {this.props.children}
        <div className={styles.close}>
          <span
            className={styles.dismissBtn}
            onClick={this.handleDismiss}
          />
        </div>
      </div>
    );
  }
}
