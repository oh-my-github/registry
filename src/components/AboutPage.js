import React, { Component, PropTypes, } from 'react'
import { Link, } from 'react-router'

export default class AboutPage extends Component {

  render() {
    return (
      <div>
        <h2>AboutPage</h2>
        <p>
          <Link to="/badlink">Click this bad link</Link> to see the 404 page.
        </p>
      </div>
    )
  }
}

