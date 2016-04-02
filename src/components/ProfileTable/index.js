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
import { tempTableData } from '../../constants/TempTableData'

export default class ProfileTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      displayRowCheckbox: false,
      adjustForCheckbox: false,
      displaySelectAll: false,
      height: '300px',
    };
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  render() {
    return (
      <Table
        height={this.state.height}
        fixedHeader={this.state.fixedHeader}
        fixedFooter={this.state.fixedFooter}
      >
        <TableHeader
          adjustForCheckbox={this.state.adjustForCheckbox}
          displaySelectAll = {this.state.displaySelectAll}
          displayRowCheckBox={this.state.displayRowCheckbox}
        >
          <TableRow>
            <TableHeaderColumn tooltip="ID">ID</TableHeaderColumn>
            <TableHeaderColumn tooltip="Following">Following</TableHeaderColumn>
            <TableHeaderColumn tooltip="Followers">Followers</TableHeaderColumn>
            <TableHeaderColumn tooltip="Updated Date">Updated Date</TableHeaderColumn>
            <TableHeaderColumn tooltip="URL">URL</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={this.state.displayRowCheckbox}
          displaySelectAll = {this.state.displaySelectAll}
        >
          {tempTableData.map( (row, index) => (
            <TableRow key={index}>
              <TableRowColumn>
                <ListItem disabled={true} leftAvatar={ <Avatar src={row.avatar_url} /> }>
                  {row.login}
                </ListItem>
              </TableRowColumn>
              <TableRowColumn>{row.following}</TableRowColumn>
              <TableRowColumn>{row.followers}</TableRowColumn>
              <TableRowColumn><Time value ={row.updated_at} format="YYYY/MM/DD HH:mm:ss"></Time></TableRowColumn>
              <TableRowColumn><a href={row.url}>{row.url}</a></TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
