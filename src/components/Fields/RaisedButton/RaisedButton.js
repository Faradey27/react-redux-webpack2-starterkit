import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import PureRender from 'pure-render-decorator';
import MaterialRaisedButton from 'material-ui/RaisedButton';

import Spinner from './../../Spinner';

const SPINNER_SIZE = 25;

@PureRender
class RaisedButton extends Component {
  static propTypes = {
    buttonStyle: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    label: PropTypes.string.isRequired,
    labelStyle: PropTypes.object,
    secondary: PropTypes.bool,
    spinButton: PropTypes.bool,
    style: PropTypes.object,
    type: PropTypes.string,
    onTouchTap: PropTypes.func,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const { href } = this.props;
    const makeHrefButton = href ? { containerElement: <Link to={href} /> } : {};

    return (
      <div>
        <MaterialRaisedButton
          buttonStyle={this.props.buttonStyle}
          className={this.props.className}
          {...makeHrefButton}
          disabled={this.props.disabled}
          label={this.props.spinButton ? <Spinner size={SPINNER_SIZE} /> : this.props.label}
          labelStyle={this.props.labelStyle}
          secondary={this.props.secondary}
          style={this.props.style}
          type={this.props.type}
          onTouchTap={this.props.onTouchTap}
        />
      </div>
    );
  }
}

export default RaisedButton;
