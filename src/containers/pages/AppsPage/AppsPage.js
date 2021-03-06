import { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import { APPS_VIEW_STATE } from './../../../constants/ViewStates';
import { loadEntities } from './../../../actions/entity';
import { getFilteredApps } from './../../../selectors/apps';

import Widget from './../../../components/Widget';
import Editor from './../../../components/Editor';
import Chart from './../../../components/Charts/Chart';

class AppsPage extends PureComponent {
  static propTypes = {
    apps: PropTypes.instanceOf(Immutable.List),
    loadEntities: PropTypes.func,
  }

  static contextTypes = {
    i18n: PropTypes.object,
  }

  componentDidMount() {
    this.props.loadEntities({ href: '/apps', type: APPS_VIEW_STATE });
  }

  renderApps() {
    return this.props.apps.map((app) => <div key={app.get('name')}>{app.get('name')}</div>);
  }

  render() {
    const { l } = this.context.i18n;

    return (
      <div>
        {l('Apps page')}
        {this.renderApps()}
        <Widget>
          <Chart />
        </Widget>
        <Widget>
          <Editor />
        </Widget>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  apps: getFilteredApps(state),
});

export default connect(mapStateToProps, { loadEntities })(AppsPage);
