import React, { PropTypes, } from 'react'
import { Link, IndexLink, } from 'react-router'

import FlatButton from 'material-ui/lib/flat-button'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator'
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title'

import {white,} from 'material-ui/lib/styles/colors'
import IconButton from 'material-ui/lib/icon-button'
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import SearchIcon from 'material-ui/lib/svg-icons/action/search'
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import LeftNav from 'material-ui/lib/left-nav'
import FontIcon from 'material-ui/lib/font-icon'
import ActionHome from 'material-ui/lib/svg-icons/action/home'
import * as style from './style.js'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }
  handleToggle = () => this.setState({
    open: !this.state.open,
  })
  handleClose = () => this.setState({
    open: false,
  })

  render() {
    return (
      <Toolbar style={style.navbar}>
        <ToolbarGroup firstChild>
          <FontIcon className="fa fa-github" style={style.rightIcon} hoverColor={white} />
          <FlatButton disabled label={<Link to="/registry" style={style.text}>Registry</Link>}
                      style={style.linkButton} />
          <FlatButton disabled label={<Link to="/about" style={style.text}>About</Link>}
                      style={style.linkButton} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
