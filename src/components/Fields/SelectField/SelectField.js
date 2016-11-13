import { Component, PropTypes } from 'react';
import PureRender from 'pure-render-decorator';
import SelectFieldMaterial from 'material-ui/SelectField';

@PureRender
class SelectField extends Component {
  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
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

    return (
      <div>
        <SelectFieldMaterial
          className={this.props.className}
          floatingLabelFocusStyle={inlineStyle.floatingLabelFocusStyle}
          floatingLabelStyle={inlineStyle.floatingLabelStyle}
          hintStyle={inlineStyle.hintStyle}
          inputStyle={inlineStyle.inputStyle}
          labelStyle={inlineStyle.labelStyle}
          placeholder={this.props.placeholder}
          underlineFocusStyle={inlineStyle.underlineFocusStyle}
          underlineStyle={inlineStyle.underlineStyle}
          onTouchTap={this.props.onTouchTap}
          {...this.props}
        />
      </div>
    );
  }
}

export default SelectField;
