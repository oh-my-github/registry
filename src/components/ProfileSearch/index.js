import React, { PropTypes, } from 'react'
import { Link, IndexLink, } from 'react-router'
//material-ui
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import TextField from 'material-ui/lib/text-field'
import SearchIcon from 'material-ui/lib/svg-icons/action/search'
import IconButton from 'material-ui/lib/icon-button'
import * as style from './style.js'

export default class ProfileSearch extends React.Component {
  static propTypes = {
    filterBy: React.PropTypes.func.isRequired,
    filterString: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
  }

  handleFilterStringChange (event) {
    event.preventDefault()
    this.props.filterBy(event.target.value)
  }

  render() {
    const { filterString, } = this.props
    return (
      <div>
        <IconButton style={style.icon}>
          <SearchIcon />
        </IconButton>
        <TextField hintText="Type User ID" multiLine={false}
                   value={filterString} onChange={this.handleFilterStringChange.bind(this)}
        />
      </div>
    )
  }
}
