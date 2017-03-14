import { PureComponent, PropTypes } from 'react';

/* eslint-disable react/no-multi-comp */

export class IconMenuWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    menuRipple: PropTypes.bool,
    position: PropTypes.string,
  }

  static defaultProps = {
    position: 'topLeft',
    menuRipple: true,
  }

  render() {
    return (
      <IconMenu
        icon={this.props.icon}
        menuRipple={this.props.menuRipple}
        position={this.props.position}
      >
        {this.props.children}
      </IconMenu>
    );
  }
}

export class MenuItemWrapper extends PureComponent {
  static propTypes = {
    caption: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    value: PropTypes.bool,
  }

  render() {
    return (
      <MenuItem
        caption={this.props.caption}
        icon={this.props.icon}
        value={this.props.value}
      >
        {this.props.children}
      </MenuItem>
    );
  }
}

export class MenuDividermWrapper extends PureComponent {
  render() {
    return (
      <MenuDivider />
    );
  }
}
