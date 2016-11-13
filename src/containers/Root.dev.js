import { Component } from 'react';

import DevTools from './DevTools';
import RootBase from './Root.prod';

class Root extends Component {
  render() {
    return (
      <RootBase {...this.props}>
        <DevTools />
      </RootBase>
    );
  }
}

export default Root;
