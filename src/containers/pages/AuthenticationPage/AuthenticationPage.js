import { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import pureRender from 'pure-render-decorator';
import urlParse from 'url-parse';
import { replace } from 'react-router-redux';

import { getAuthenticatedUser } from './../../../selectors/users';
import userUtils from './../../../utils/userUtils';

import LoginForm from './../../../components/Forms/LoginForm';

@pureRender
class AuthenticationPage extends Component {
  static propTypes = {
    replace: PropTypes.func,
    user: PropTypes.instanceOf(Immutable.Map),
  }

  static redirectIfAuthenticated({ user, replaceUrl }) {
    if (userUtils.isAuthenticated(user)) {
      const url = '/';

      if (typeof window !== 'undefined') {
        const query = urlParse(window.location.href, true).query;

        return replaceUrl(query.redirect || url);
      }

      return replaceUrl(url);
    }

    return null;
  }

  constructor(props) {
    super(props);
    AuthenticationPage.redirectIfAuthenticated({ user: props.user, replaceUrl: props.replace });
  }

  componentWillReceiveProps(nextProps) {
    AuthenticationPage.redirectIfAuthenticated({ user: nextProps.user, replaceUrl: nextProps.replace });
  }

  render() {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: getAuthenticatedUser(state),
});

export default connect(mapStateToProps, { replace })(AuthenticationPage);
