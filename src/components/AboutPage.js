import React, { Component, PropTypes, } from 'react'
import { Link, } from 'react-router'

export default class AboutPage extends Component {

  render() {
    return (
      <div>
        <h2>About</h2>
        <p>
          This example app is part of the <a href="https://github.com/coryhouse/react-slingshot">React-Slingshot
          starter kit</a>.
        </p>
        <p>
          <Link to="/badlink">Click this bad link</Link> to see the 404 page.
        </p>
      </div>
    )
  }
}

