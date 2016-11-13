import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import PureRender from 'pure-render-decorator';
import MaterialFlatButtton from 'material-ui/FlatButton';

@PureRender
class FlatButton extends Component {
  static propTypes = {
    href: PropTypes.string,
    label: PropTypes.string.isRequired,
    style: PropTypes.object,
    type: PropTypes.string,
    onTouchTap: PropTypes.func,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const { href } = this.props;

    return (
      <MaterialFlatButtton
        containerElement={href ? <Link to={href} /> : <div />}
        label={this.props.label}
        style={this.props.style}
        type={this.props.type}
        {...this.props}
        onTouchTap={this.props.onTouchTap}
      />
    );
  }
}

export default FlatButton;
