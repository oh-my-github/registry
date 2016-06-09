import React, { PropTypes, } from 'react'
import { Link, IndexLink, } from 'react-router'
import Table from 'material-ui/lib/table/table'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableHeader from 'material-ui/lib/table/table-header'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableBody from 'material-ui/lib/table/table-body'
import Avatar from 'material-ui/lib/avatar'
import ListItem from 'material-ui/lib/lists/list-item'
import RingLoader from 'halogen/RingLoader'
import moment from 'moment'
import * as style from './style.js'

export default class ProfileTable extends React.Component {
  static propTypes = {
    // function
    fetchData: React.PropTypes.func.isRequired,
    sortBy: React.PropTypes.func.isRequired,
    filterBy: React.PropTypes.func.isRequired,
    // variable
    profiles: React.PropTypes.array.isRequired,
    sortKey: React.PropTypes.string.isRequired,
    sortDesc: React.PropTypes.string.isRequired,
    filterString: React.PropTypes.string.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
  }

  static getUserProfileUrl = (userLogin) => {
    return `https://${userLogin}.github.io/oh-my-github`
  }

  constructor(props) {
    super(props)
    this.state = {
      // to determine state of Material UI
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

  filterData = () => {
    const {profiles, filterString, } = this.props
    const str = filterString.toLowerCase()
    return str !== ''
      ? profiles.filter( (arr) => arr.user.login.toLowerCase().indexOf(str) > -1 )
      : profiles
  }

  sortData = () => {
    const {profiles, sortKey, sortDesc, } = this.props
    const multiplier = sortDesc ? -1 : 1
    profiles.sort((a, b) => {
      const aVal = a.user[sortKey] || 0
      const bVal = b.user[sortKey] || 0
      return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0)
    })
    return this
  }

  handleSort = (columnKey) => {
    let columnName = ['login', 'following', 'followers', 'updated_at', 'url', ]
    this.props.sortBy(columnName[columnKey-1])
    this.sortData()
  }

  createSpin() {
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
        {data.map((row, index) => {
          const userProfileURL = ProfileTable.getUserProfileUrl(row.user.login)

          return (
            <TableRow key={index}>
              <TableRowColumn>
                <a href={`https://github.com/${row.user.login}`} target="_blank">
                  <ListItem disabled={this.listItem} leftAvatar={<Avatar src={row.user.avatar_url}/>}>
                    {row.user.login}
                  </ListItem>
                </a>
              </TableRowColumn>
              <TableRowColumn style={{width: '80px', }}>{row.user.following}</TableRowColumn>
              <TableRowColumn style={{width: '80px', }}>{row.user.followers}</TableRowColumn>
              <TableRowColumn style={{width: '150px', }}>{moment(row.user.updated_at).fromNow()}</TableRowColumn>
              <TableRowColumn><a href={userProfileURL} target="_blank">{userProfileURL}</a></TableRowColumn>
            </TableRow>
          )
        })}

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
            <TableHeaderColumn key="following" tooltip="The following" style={{width: '80px', }}>Following</TableHeaderColumn>
            <TableHeaderColumn key="followers" tooltip="The followers" style={{width: '80px', }}>Followers</TableHeaderColumn>
            <TableHeaderColumn key="updated_at" tooltip="Updated Date" style={{width: '150px', }}>Updated Date</TableHeaderColumn>
            <TableHeaderColumn key="url" tooltip="oh-my-github URL">oh-my-github URL</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        {showTableDOM}
      </Table>
    )
  }
}
