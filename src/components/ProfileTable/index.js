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
//temp resource data to be deleted
import { tempTableData, } from '../../constants/TempTableData'

export default class ProfileTable extends React.Component {

  static propTypes = {
    fetchData: React.PropTypes.func.isRequired,
    sortBy: React.PropTypes.func.isRequired,
    filterBy: React.PropTypes.func.isRequired,
    profiles: React.PropTypes.array.isRequired,
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
          <TableRow>
            <TableHeaderColumn tooltip="ID" onCellClick={() => console.log("click")}>ID</TableHeaderColumn>
            <TableHeaderColumn tooltip="Following" onClick={() => console.log("click")}>Following</TableHeaderColumn>
            <TableHeaderColumn tooltip="Followers" onClick={() => console.log("click")}>Followers</TableHeaderColumn>
            <TableHeaderColumn tooltip="Updated Date">Updated Date</TableHeaderColumn>
            <TableHeaderColumn tooltip="URL">URL</TableHeaderColumn>
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
