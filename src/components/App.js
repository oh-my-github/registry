import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.element,
  }

  render() {
    return (
      <div>
        <IndexLink to="/">Home</IndexLink> | <Link to="/About">About</Link>
        <br/>
        {this.props.children}
      </div>
    )
  }
}

