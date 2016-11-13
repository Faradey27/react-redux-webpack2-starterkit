import { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import PureRender from 'pure-render-decorator';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { getNotifications } from './../../selectors/view';
import { removeNotification } from './../../actions/view';
import MaterialSnackbar from './MaterialSnackbar';

import { SNACKBAR_MESSAGE_AUTO_HIDE_DELAY } from './../../constants/Delays';

import styles from './Snackbar.less';

@PureRender
class Snackbar extends Component {
  static propTypes = {
    notifications: PropTypes.instanceOf(Immutable.List),
    removeNotification: PropTypes.func.isRequired,
  }

  static contextTypes = {
    i18n: PropTypes.object,
  }

  handleRequestClose = (id) => this.props.removeNotification(id)

  render() {
    const { l } = this.context.i18n;

    return (
      <div className={styles.snackBar}>
        <ReactCSSTransitionGroup
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          transitionName="snackbar"
        >
          {
            this.props.notifications.map((notification) => (
              <MaterialSnackbar
                action={l('Hide')}
                autoHideDuration={SNACKBAR_MESSAGE_AUTO_HIDE_DELAY}
                className={styles.snack}
                id={notification.get('id')}
                key={notification.get('id')}
                message={notification.get('message')}
                open
                onActionTouchTap={this.handleRequestClose}
                onRequestClose={this.handleRequestClose}
              />
            ))
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: getNotifications(state),
});

export default connect(mapStateToProps, { removeNotification })(Snackbar);
