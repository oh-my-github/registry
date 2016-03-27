import React, { PropTypes, } from 'react'
import { Link, IndexLink, } from 'react-router'

import NavBar from './NavBar'

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.element,
  }

  render() {
    return (
      <div>
        <NavBar />
        <br/>
        {this.props.children}
      </div>
    )
  }
}

