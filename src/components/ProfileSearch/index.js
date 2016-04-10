import React, { PropTypes, } from 'react'
import { Link, IndexLink, } from 'react-router'
import Time from 'react-time'
//material-ui
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import TextField from 'material-ui/lib/text-field';
import SearchIcon from 'material-ui/lib/svg-icons/action/search'
import IconButton from 'material-ui/lib/icon-button'
import * as style from './style.js'

//temp resource data to be deleted
import { tempTableData } from '../../constants/TempTableData'


export default class ProfileSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <IconButton
          style={style.icon}
        >
          <SearchIcon />
        </IconButton>
        <TextField
          hintText="Type user"
          multiLine={false}
        />
      </div>
    );
  }
}
