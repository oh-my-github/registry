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
import RingLoader from 'halogen/RingLoader'
import CircularProgress from 'material-ui/lib/circular-progress';
import * as style from './style.js'

export default class ProfileTable extends React.Component {
  static propTypes = {
    fetchData: React.PropTypes.func.isRequired,
    sortBy: React.PropTypes.func.isRequired,
    filterBy: React.PropTypes.func.isRequired,

    profiles: React.PropTypes.array.isRequired,
    sortKey: React.PropTypes.string.isRequired,
    sortDesc: React.PropTypes.string.isRequired,
    filterString: React.PropTypes.string.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
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

  filterData () {
    const {profiles, filterString, } = this.props
    const str = filterString.toLowerCase()
    return str !== ''
      ? profiles.filter( (arr) => arr.user.login.toLowerCase().indexOf(str) > -1 )
      : profiles
  }

  sortData () {
    const {profiles, sortKey, sortDesc, } = this.props
    const multiplier = sortDesc ? -1 : 1
    profiles.sort((a, b) => {
      const aVal = a.user[sortKey] || 0
      const bVal = b.user[sortKey] || 0
      return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0)
    })
    return this
  }

  handleSort(columnKey){
    switch (columnKey) {
      case 1:
        this.props.sortBy('login')
        break
      case 2:
        this.props.sortBy('following')
        break
      case 3:
        this.props.sortBy('followers')
        break
      case 4:
        this.props.sortBy('update_at')
        break
      case 5:
        this.props.sortBy('url')
        break
    }
    this.sortData()
  }

  createSpin(){
    return(
      <TableBody displayRowCheckbox={this.state.displayRowCheckbox}
                 displaySelectAll = {this.state.displaySelectAll}
      >
        <TableRow>
          <TableRowColumn />
          <TableRowColumn />
          <TableRowColumn>
            <RingLoader color={style.loader_color} size={style.loader_size} margin={style.loader_margin} />
          </TableRowColumn>
          <TableRowColumn />
          <TableRowColumn />
        </TableRow>
      </TableBody>
    )
  }

  createTable() {
    const data = this.sortData().filterData()
    return(
      <TableBody displayRowCheckbox={this.state.displayRowCheckbox}
                 displaySelectAll = {this.state.displaySelectAll}
      >
        {data.length === 0 && <TableRowColumn><h4>No matching ID</h4></TableRowColumn>}
        {data.map( (row, index) => (
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
    )
  }

  render() {
    const { isFetching, } = this.props
    const showTableDOM = isFetching? this.createSpin():this.createTable()

    return (
      <Table fixedHeader={this.state.fixedHeader}
             fixedFooter={this.state.fixedFooter}
      >
        <TableHeader adjustForCheckbox={this.state.adjustForCheckbox}
                     displaySelectAll = {this.state.displaySelectAll}
                     displayRowCheckBox={this.state.displayRowCheckbox}
        >
          <TableRow onCellClick={(...clickEvent) => this.handleSort(clickEvent[2])}>
            <TableHeaderColumn key="login" tooltip="User ID">ID</TableHeaderColumn>
            <TableHeaderColumn key="following" tooltip="The following">Following</TableHeaderColumn>
            <TableHeaderColumn key="followers" tooltip="The followers">Followers</TableHeaderColumn>
            <TableHeaderColumn key="update_at" tooltip="Updated Date">Updated Date</TableHeaderColumn>
            <TableHeaderColumn key="url" tooltip="Github URL">URL</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        {showTableDOM}
      </Table>
    )
  }
}
