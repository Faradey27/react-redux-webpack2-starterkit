Concepts
================

- [Redux forms](https://github.com/erikras/redux-form) for forms
- [Sagas](https://github.com/yelouafi/redux-saga) for complex actions
- [Redux-api-middleware](https://github.com/agraboso/redux-api-middleware) for requests
- [Js plumb](https://jsplumbtoolkit.com/docs.html) for diagrams
- [Dygraphs](http://dygraphs.com/) for charts
- [Each component should be wrapped with pure-render-decorator](https://github.com/felixgirault/pure-render-decorator)
- [All styles - css-modules](https://github.com/css-modules/css-modules)
- [Immutable state](https://facebook.github.io/immutable-js/) - all things should be immutable
- [React dnd](https://github.com/gaearon/react-dnd) for drag and drop
- [Nightwatchjs](http://nightwatchjs.org/) - for e2e tests
- [Mocha+enzyme](https://github.com/airbnb/enzyme) - for unit tests
- No self-merge(only after review)

Components can be divided into 2 categories: [smart components and dumb components.](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.3a65w0s3o)

### Dumb Components
 - Presentational only.
 - Not connected to redux state. Parent passes in state as props. Doesn't dispatch actions.
 - Propagate user actions through callbacks.
 - Small. Easy to test. If it gets too big, consider splitting it up.

##### DumbComponent.js
```
import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { DropdownMenu, MenuItem } from 'react-bootstrap';

@pureRender
export default DumbComponent extends Component {

  static propTypes = { // 2
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    onAction: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  navigate(e) {
    this.context.router.push(e.target.href); // 3
  }

  render() {
    const {name, href} = this.props;
    return (
      <div styles={styles.base}>
        <Link to={href}>{name}</Link> // 4
        <DropdownButton title="More"> // 5
          <MenuItem onClick={this.navigate} href='/edit'>Edit</MenuItem>
        </DropdownButton>
      </div>
    )
  }
}

const styles = {
    base: {
        color: '#F00'
    }
}

// Not connected to redux state
```

### Notes on DumbComponent.js

#### 1) Styles

Import styles from separate less file with css-modules

#### 2) PropTypes
All props must be defined in static propTypes.

Use static propTypes.

#### 3) Routing

If you can't use a Link (see 4) use this.context.router to change location.

#### 4) Links

Use react-router Links to navigate. If all a button does is navigate, it should be a Link. You can still style it as a
button, but it should be implemented as Link. This is simpler, and it allows people to see where they are going, and to
command+click it to open a new tab.

#### 5) Menus

Use react-bootstrap for dropdown menus. For more complex popovers, use react-overlay.

### Unit Tests

##### DumbComponent-spec.js
```
import { shallow } from 'enzyme'; // 1

describe('DumbComponent', () => {

  let commonProps;
  let context;
  beforeEach(() => {
    commonProps = {
      name: 'name',
      href: '/name',
      onAction: sinon.spy() // 2
    };
    context = {router: {push: sinon.spy()}}; // 3
  });

  it('should render', () => {
    const wrapper = shallow(<DumbComponent {...commonProps}/>, {context: context});
    expect(wrapper.text()).to.eql(commonProps.name);
    expect(wrapper.find('Link').props().href).to.equal(commonProps.href);
  });

  it('should navigate to "/edit" when edit is clicked', () => {
    const wrapper = shallow(<RawButton {...commonProps}/>, {context: context});
    wrapper.find('MenuItem').simulate('click');
    expect(context.router.push.calledWith('/edit')).to.be.true;
  });
});
```

### Notes on DumbComponent-spec.js

Dumb components should be easy to test.

 1. Shallow render components using enzyme.
 2. Use `sinon.spy()` to test callbacks.
 3. Pass a mock `router` in `context` if needed

### Smart Components

- Contains dumb components
- Connected to redux store. Can dispatch actions.
  - No state in the component. Use redux store for state.
- More complicated to test, so put more rendering in dumb components.


##### SmartComponent.js

```
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { someAction } from 'someActions';
import DumbComponent from './DumbComponent';

@pureRender
export SmartComponent extends Component { // 1

  static propTypes = {
    model: PropTypes.string.isRequired, // 2
    someAction: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onAction = this.onAction.bind(this);
  }

  onAction(name) {
    someAction(name); // 3
  }

  render() {
    const {name} = this.props;
    return <DumbComponent name={model.name} onAction={this.onAction}/>; // 4
  }
}

export default connect((state) => { // 5
  return {model: state.smartModel};
}, {someAction})(SmartComponent);
```

### Notes on SmartComponent.js

 1. Export (not default) the unconnected component for unit testing.
 2. Get entire model, not just properties.
 3. Dispatches redux actions
 4. Render dumb components or nested smart components.
 5. export default the connected component.


##### SmartComponent-spec.js

```
import { shallow } from 'enzyme';
import { SmartComponent } from '../SmartComponent'; // 1

describe('SmartComponent', () => {

  let commonProps;
  beforeEach(() => {
    commonProps = {
      model: {name: 'name', href: '/name'},
      someAction: sinon.spy() // 2
    };
  });

  it('should render', () => {
    const wrapper = shallow(<SmartComponent {...commonProps}/>);

    expect(wrapper.find('DumpComponent')).to.have.length(1);
    expect(wrapper.find('DumpComponent').first().props().name).to.equal(commonProps.name);
  });

  it('should dispatch someAction when onAction is called', () => {
    const wrapper = shallow(<SmartComponent {...commonProps}/>);
    wrapper.instance().onAction('name');

    expect(commonProps.someAction.calledWith('name')).to.be.true;
  });
});
```

### Notes on SmartComponent-spec.js

 1. Test the unconnected component.
 2. Stub actions with sinon.spy().
 
