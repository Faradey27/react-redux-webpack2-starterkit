import { Component, PropTypes } from 'react';
import PureRender from 'pure-render-decorator';
import MaterialCheckbox from 'material-ui/Checkbox';

@PureRender
class Checkbox extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    placeholder: '',
  }

  static contextTypes = {
    theme: PropTypes.object,
  }

  getThematicStyles = () => ({
    icon: {
      width: 26,
      height: 26,
    },
    label: {
      fontSize: 16,
      color: this.context.theme.white,
    },
  })

  render() {
    const { theme } = this.context;
    const inlineStyles = this.getThematicStyles();
    const activeStyle = this.props.value
      ? { color: theme.orange, fill: theme.orange }
      : { color: theme.placeholderColor, fill: theme.placeholderColor };

    const {
      value,
      label,
      onChange,
      ...rest
    } = this.props;

    delete rest.meta; //eslint-disable-line

    return (
      <div>
        <MaterialCheckbox
          checked={Boolean(value)}
          iconStyle={Object.assign({}, inlineStyles.icon, activeStyle)}
          inputStyle={inlineStyles.checkbox}
          label={label}
          labelStyle={inlineStyles.label}
          {...rest}
          onCheck={onChange}
        />
      </div>
    );
  }
}

export default Checkbox;
