import { Component, PropTypes } from 'react';
import PureRender from 'pure-render-decorator';
import MaterialSnackbarPure from 'material-ui/Snackbar';

@PureRender
class MaterialSnackbar extends Component {
  static propTypes = {
    action: PropTypes.string,
    autoHideDuration: PropTypes.number,
    className: PropTypes.string,
    id: PropTypes.string,
    message: PropTypes.string,
    onActionTouchTap: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
  }

  handleRequestClose = (type) => {
    if (type !== 'clickaway') {
      this.props.onRequestClose(this.props.id);
    }
  }
  handleActionTouchTap = () => this.props.onActionTouchTap(this.props.id)

  render() {
    return (
      <MaterialSnackbarPure
        action={this.props.action}
        autoHideDuration={this.props.autoHideDuration}
        className={this.props.className}
        message={this.props.message}
        open
        onActionTouchTap={this.handleActionTouchTap}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}

export default MaterialSnackbar;
