import React, { PropTypes, } from 'react'
import { Link, IndexLink, } from 'react-router'
import TextField from 'material-ui/lib/text-field'
import SearchIcon from 'material-ui/lib/svg-icons/action/search'
import IconButton from 'material-ui/lib/icon-button'

export default class ProfileSearch extends React.Component {
  static propTypes = {
    filterBy: React.PropTypes.func.isRequired,
    filterString: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
  }

  handleFilterStringChange = (event) => {
    event.preventDefault()
    this.props.filterBy(event.target.value)
  }

  render() {
    const { filterString, } = this.props
    return (
      <div>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <TextField hintText="Type User ID" multiLine={false}
                   value={filterString} onChange={this.handleFilterStringChange.bind(this)}/>
      </div>
    )
  }
}
