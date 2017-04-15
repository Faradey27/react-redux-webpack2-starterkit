import { PureComponent, PropTypes } from 'react';
import Codemirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/lib/codemirror.css';

import styles from './Editor.css';

class Editor extends PureComponent {
  static propTypes = {
    autoCloseBrackets: PropTypes.bool,
    gutters: PropTypes.array,
    lineNumbers: PropTypes.bool,
    lint: PropTypes.bool,
    matchBrackets: PropTypes.bool,
    mode: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    autoCloseBrackets: true,
    value: '',
    matchBrackets: true,
    lineNumbers: false,
    lint: true,
    mode: 'application/json',
    gutters: [],
  }

  setEditorInstance = (node) => { this.editor = node && node.codeMirror; }
  getEditorInstance = () => this.editor

  handleChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    return (
      <div className={styles.editor}>
        <Codemirror
          options={{
            mode: this.props.mode,
            gutters: this.props.gutters,
            matchBrackets: this.props.matchBrackets,
            autoCloseBrackets: this.props.autoCloseBrackets,
            lineNumbers: this.props.lineNumbers,
            lint: this.props.lint,
            viewportMargin: Infinity,
          }}
          ref={this.setEditorInstance}
          value={this.props.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Editor;
