import { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRender from 'pure-render-decorator';
import { reduxForm, Field } from 'redux-form/immutable';
import { debounce } from 'lodash/function';
import FontIcon from './../../FontIcon';
import { renderTextField } from './../renders';

import styles from './Search.less';

const DEBOUNCE_DELAY = 400;

@PureRender
class Search extends Component {
  static propTypes = {
    className: PropTypes.string,
    handleSubmit: PropTypes.func, // from redux-form
    placeholder: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired,
    submitOnChange: PropTypes.bool,
    onTouchTap: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    placeholder: 'Search',
  }

  constructor(props) {
    super(props);

    this.handleChange = debounce(this.handleChange, DEBOUNCE_DELAY);
  }

  setRefForSearchInput = (node) => {
    this.searchInputNode = node;
  }

  handleSearchInputFocus = () => {
    const fieldNode = ReactDOM.findDOMNode(this.searchInputNode);
    const inputNode = fieldNode.querySelector('input');

    inputNode.focus();
  }

  submit = (form) => this.props.submit(form)

  handleChange = () => this.props.submitOnChange && this.props.handleSubmit(this.submit)()

  render() {
    const { handleSubmit, placeholder, onTouchTap } = this.props;

    return (
      <form
        className={`${styles.search} ${this.props.className}`}
        onChange={this.handleChange}
        onSubmit={handleSubmit(this.submit)}
        onTouchTap={onTouchTap}
      >
        <div className={styles.searchField}>
          <Field
            component={renderTextField}
            name="search"
            placeholder={placeholder}
            ref={this.setRefForSearchInput}
            style={styles.field}
          />
          <FontIcon
            className={styles.fontIcon}
            type="search"
            onTouchTap={this.handleSearchInputFocus}
          />
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'MainSearch',
})(Search);
