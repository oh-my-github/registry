import React, { PropTypes, } from 'react'
import { Link, IndexLink, } from 'react-router'
import Time from 'react-time'
//material-ui
import Table from 'material-ui/lib/table/table'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableHeader from 'material-ui/lib/table/table-header'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableBody from 'material-ui/lib/table/table-body'
import Avatar from 'material-ui/lib/avatar'
import TextField from 'material-ui/lib/text-field'
import ListItem from 'material-ui/lib/lists/list-item'
import TableHeaderTypes from '../../constants/TableHeaderTypes'

export default class ProfileTable extends React.Component {
  static propTypes = {
    fetchData: React.PropTypes.func.isRequired,
    sortBy: React.PropTypes.func.isRequired,
    filterBy: React.PropTypes.func.isRequired,

    profiles: React.PropTypes.array.isRequired,
    sortKey: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      displayRowCheckbox: false,
      adjustForCheckbox: false,
      displaySelectAll: false,
      listItem: true,
    }
  }

  componentWillMount() {
    this.props.fetchData()
    this.sortData()
  }

  sortData () {
    const {profiles, sortKey, sortDesc,} = this.props
    const multiplier = sortDesc ? -1 : 1
    profiles.sort((a, b) => {
      const aVal = a.user[sortKey] || 0
      const bVal = b.user[sortKey] || 0
      return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0)
    })
    return this
  }


  render() {

    //const { profiles, } = this.props
    //
    //const tableDOM = (profiles.length === 0) createSpin() : createTable
    //
    //return (
    //<div>{tableDOM}</div>
    //)

    return (
      <Table
        fixedHeader={this.state.fixedHeader}
        fixedFooter={this.state.fixedFooter}
      >
        <TableHeader
          adjustForCheckbox={this.state.adjustForCheckbox}
          displaySelectAll = {this.state.displaySelectAll}
          displayRowCheckBox={this.state.displayRowCheckbox}
        >
          <TableRow onCellClick={(...clickEvent)=> console.log(clickEvent[2])}>
            <TableHeaderColumn key="login" tooltip="User ID">ID</TableHeaderColumn>
            <TableHeaderColumn key="following" tooltip="The following">Following</TableHeaderColumn>
            <TableHeaderColumn key="followers" tooltip="The followers">Followers</TableHeaderColumn>
            <TableHeaderColumn key="update_at" tooltip="Updated Date">Updated Date</TableHeaderColumn>
            <TableHeaderColumn key="url" tooltip="Github URL">URL</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={this.state.displayRowCheckbox}
          displaySelectAll = {this.state.displaySelectAll}
        >
          {this.props.profiles.map( (row, index) => (
            <TableRow key={index}>
              <TableRowColumn>
                <ListItem disabled={this.listItem} leftAvatar={<Avatar src={row.user.avatar_url}/>}>
                  {row.user.login}
                </ListItem>
              </TableRowColumn>
              <TableRowColumn>{row.user.following}</TableRowColumn>
              <TableRowColumn>{row.user.followers}</TableRowColumn>
              <TableRowColumn><Time value ={row.user.updated_at} format="YYYY/MM/DD HH:mm:ss"/></TableRowColumn>
              <TableRowColumn><a href={row.user.url}>{row.user.url}</a></TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}
