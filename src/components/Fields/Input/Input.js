import { Component, PropTypes } from 'react';
import PureRender from 'pure-render-decorator';
import TextField from 'material-ui/TextField';

@PureRender
class Input extends Component {
  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    style: PropTypes.object,
    onTouchTap: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    placeholder: '',
  }

  static contextTypes = {
    theme: PropTypes.object,
  }

  getThematicStyles = () => ({
    underlineStyle: {
      borderColor: this.context.theme.placeholderColor,
    },
    underlineFocusStyle: {
      borderColor: this.context.theme.orange,
      borderWidth: 2,
    },
    floatingLabelStyle: {
      color: this.context.theme.white,
    },
    floatingLabelFocusStyle: {
      color: this.context.theme.orange,
    },
    inputStyle: {
      color: this.context.theme.white,
      fontSize: 14,
      minWidth: 235,
    },
    hintStyle: {
      color: this.context.theme.hintColor,
      fontSize: 14,
    },
    style: {
      minWidth: 235,
    },
  })

  render() {
    const inlineStyle = this.getThematicStyles();
    const {
      className,
      placeholder,
      onTouchTap,
      style,
      ...rest
    } = this.props;

    delete rest.meta; //eslint-disable-line


    return (
      <div>
        <TextField
          className={className}
          floatingLabelFocusStyle={inlineStyle.floatingLabelFocusStyle}
          floatingLabelStyle={inlineStyle.floatingLabelStyle}
          hintStyle={inlineStyle.hintStyle}
          inputStyle={inlineStyle.inputStyle}
          placeholder={placeholder}
          style={Object.assign({}, inlineStyle.style, style)}
          underlineFocusStyle={inlineStyle.underlineFocusStyle}
          underlineStyle={inlineStyle.underlineStyle}
          onTouchTap={onTouchTap}
          {...rest}
        />
      </div>
    );
  }
}

export default Input;
