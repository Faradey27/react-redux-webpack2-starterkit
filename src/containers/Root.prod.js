import { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import i18n from '../i18n';
import routes from '../routes';

import ru from './../../lang/ru.json';
import en from './../../lang/en.json';

const localeData = {
  en,
  ru,
};

const DEFAULT_LOCALE = 'en';

class Root extends Component {
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.object,
    store: PropTypes.object.isRequired,
  }

  getLocation() {
    return this.props.store.getState().getIn(['routing', 'locationBeforeTransitions']).toJS();
  }

  setLanguage(lang) {
    const location = this.getLocation();

    if (localeData[lang]) {
      this.props.history.push({ ...location, query: Object.assign({}, location.query, { lang }) });
      window.location.reload();
    }
  }

  render() {
    const { store, history } = this.props;
    const lang = localeData[this.getLocation().query.lang]
      ? this.getLocation().query.lang || DEFAULT_LOCALE
      : DEFAULT_LOCALE;
    const i18nTools = new i18n.Tools({ localeData: localeData[lang], locale: lang });

    return (
      <Provider store={store}>
        <div className="projectname-root-wrapper">
          <i18n.Provider
            i18n={i18nTools}
            setLanguage={this.setLanguage}
          >
            <Router
              history={history}
              routes={routes}
            />
          </i18n.Provider>
          {this.props.children}
        </div>
      </Provider>
    );
  }
}

export default Root;
