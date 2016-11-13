import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import pureRender from 'pure-render-decorator';

import { APPS_VIEW_STATE } from './../../../constants/ViewStates';
import { loadEntities } from './../../../actions/entity';
import { getFilteredApps } from './../../../selectors/apps';

import Editor from './../../../components/Editor';
import Chart from './../../../components/Charts/Chart';

@pureRender
class AppsPage extends Component {
  static propTypes = {
    apps: PropTypes.instanceOf(Immutable.List),
    loadEntities: PropTypes.func,
  }

  static contextTypes = {
    i18n: PropTypes.object,
  }

  componentWillMount() {
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
        <Chart />
        <Editor />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  apps: getFilteredApps(state),
});

export default connect(mapStateToProps, { loadEntities })(AppsPage);
