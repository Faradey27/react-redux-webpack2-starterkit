import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import PureRender from 'pure-render-decorator';
import { reduxForm, Field } from 'redux-form/immutable';
import { renderTextField } from './../renders';
import RaisedButton from './../../Fields/RaisedButton';

import { loginValidation } from './../../../utils/forms/validation';
import { getViewState } from './../../../selectors/view';
import { LOGIN_VIEW_STATE } from './../../../constants/ViewStates';

import { loginUser } from './../../../actions/users';

import styles from './LoginForm.less';

@PureRender
class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func, // from redux-form
    loginUser: PropTypes.func,
    viewState: PropTypes.instanceOf(Immutable.Map),
  }

  static contextTypes = {
    i18n: PropTypes.object,
  }

  submit = (form) => {
    this.props.loginUser({ login: form.get('login'), password: form.get('password') });
  }

  render() {
    const { l } = this.context.i18n;

    return (
      <form
        className={styles.loginForm}
        onSubmit={this.props.handleSubmit(this.submit)}
      >
        <div className={styles.searchField}>
          <Field
            component={renderTextField}
            name="login"
            placeholder={l('Login')}
            style={styles.field}
          />
          <Field
            component={renderTextField}
            name="password"
            placeholder={l('Password')}
            style={styles.field}
            type="password"
          />
          <RaisedButton
            label="Login"
            spinButton={this.props.viewState && this.props.viewState.get('isInProgress')}
            type="submit"
          />
        </div>
      </form>
    );
  }
}

const LoginFormWrapped = reduxForm({
  form: 'LoginForm',
  validate: loginValidation,
})(LoginForm);

const mapStateToProps = (state) => ({
  viewState: getViewState(state, LOGIN_VIEW_STATE),
});

export default connect(mapStateToProps, { loginUser })(LoginFormWrapped);
