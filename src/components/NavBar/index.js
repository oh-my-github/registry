import React, { PropTypes, } from 'react'
import { Link, IndexLink, } from 'react-router'
import FlatButton from 'material-ui/lib/flat-button'
import AppBar from 'material-ui/lib/app-bar'
import { white, } from 'material-ui/lib/styles/colors'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import * as style from './style.js'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  renderElementLeft() {
    return (
      <IconButton touch tooltipPosition="bottom-right"
                  linkButton href="http://github.com/oh-my-github/registry" target="_blank">
        <FontIcon className="fa fa-github" style={style.rightIcon} hoverColor={white} />
      </IconButton>
    )
  }

  render() {
    const leftElement = this.renderElementLeft()
    return (
      <AppBar style={style.navbar} iconElementLeft={leftElement}>
        <FlatButton disabled
                    label={<Link to="/registry" style={style.text}>Registry</Link>}
                    style={style.linkButton} />
        <FlatButton disabled
                    label={<Link to="/about" style={style.text}>About</Link>}
                    style={style.linkButton} />
      </AppBar>
    )
  }
}
