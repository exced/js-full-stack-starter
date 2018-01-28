import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'

export default class TextEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.initialValue
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.initialValue !== this.state.value) {
      this.setState({ value: nextProps.initialValue })
    }
  }


  render() {
    return (
      <Input
        onFocus={e => e.target.select()}
        onBlur={e => {
          e.target.blur()
          this.props.onChange(e.target.value)
        }}
        onPressEnter={e => {
          e.target.blur()
          this.props.onChange(e.target.value)
        }}
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
        placeholder={this.props.placeholder}
      />
    )
  }
}

TextEdit.propTypes = {
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
}

TextEdit.defaultProps = {
  initialValue: '',
  onChange: () => { },
  placeholder: ''
}