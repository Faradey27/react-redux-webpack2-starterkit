import { Component, PropTypes } from 'react';
import PureRender from 'pure-render-decorator';
import RaisedButton from './../Fields/RaisedButton';

@PureRender
class Button extends Component {
  static propTypes = {
    buttonStyle: PropTypes.object,
    className: PropTypes.string,
    default: PropTypes.bool,
    href: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    style: PropTypes.object,
    type: PropTypes.string,
    onTouchTap: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    default: true,
  }

  static contextTypes = {
    theme: PropTypes.object,
  }

  getThematicStyles = () => ({
    buttonStyle: {
      background: this.context.theme.orange,
      borderRadius: 2,
    },
    container: {
      borderRadius: 2,
      boxShadow: this.context.theme.boxShadow,
      height: 31,
      lineHeight: '31px',
      minWidth: 104,
    },
    label: {
      color: this.context.theme.defayltFontColor,
      fontWeight: this.context.theme.bold,
    },
  })

  renderSecondaryButton(commonProps) {
    const inlineStyles = this.getThematicStyles();

    return (
      <RaisedButton
        {...commonProps}
        buttonStyle={Object.assign({}, inlineStyles.buttonStyle, { background: this.context.theme.mainThemeColor })}
        labelStyle={Object.assign({}, inlineStyles.label, { color: this.context.theme.white })}
        secondary
        style={Object.assign({}, inlineStyles.container, { background: this.context.theme.mainThemeColor })}
      />
    );
  }

  renderDefaultButton(commonProps) {
    const inlineStyles = this.getThematicStyles();

    return (
      <RaisedButton
        {...commonProps}
        buttonStyle={Object.assign({}, inlineStyles.buttonStyle, this.props.buttonStyle)}
        secondary
      />
    );
  }

  renderPrimaryButton(commonProps) {
    const inlineStyles = this.getThematicStyles();

    return (
      <RaisedButton
        {...commonProps}
        buttonStyle={Object.assign({}, inlineStyles.buttonStyle, { background: this.context.theme.red })}
        labelStyle={Object.assign({}, commonProps.labelStyle, { color: this.context.theme.white })}
        secondary
        style={Object.assign({}, inlineStyles.container, { background: this.context.theme.red })}
      />
    );
  }

  render() {
    const inlineStyles = this.getThematicStyles();
    const commonProps = {
      className: this.props.className,
      href: this.props.href,
      label: this.props.label,
      labelStyle: inlineStyles.label,
      style: Object.assign({}, inlineStyles.container, this.props.style),
      type: this.props.type,
      onTouchTap: this.props.onTouchTap,
    };

    if (this.props.primary) {
      return this.renderPrimaryButton(commonProps);
    }

    if (this.props.secondary) {
      return this.renderSecondaryButton(commonProps);
    }

    if (this.props.default) {
      return this.renderDefaultButton(commonProps);
    }

    return null;
  }
}

export default Button;
