import { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import Codemirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/lib/codemirror.css';

@pureRender
class Editor extends Component {
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
    );
  }
}

export default Editor;
