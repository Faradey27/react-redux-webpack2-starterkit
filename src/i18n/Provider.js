import React from 'react';

export default class Provider extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
    i18n: React.PropTypes.object.isRequired,
    setLanguage: React.PropTypes.func,
  };

  static childContextTypes = {
    i18n: React.PropTypes.object,
    setLanguage: React.PropTypes.func,
  };

  getChildContext() {
    return {
      i18n: this.props.i18n,
      setLanguage: this.props.setLanguage,
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
