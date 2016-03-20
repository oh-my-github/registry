import React, { Component, PropTypes, } from 'react'

export default class FuelSavingsTextInput extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  handleChange(e) {
    this.props.onChange(this.props.name, e.target.value)
  }

  render() {

    return (
      <input className="small"
             type="text"
             placeholder={this.props.placeholder}
             value={this.props.value}
             onChange={this.handleChange.bind(this)} />
    )
  }
}
