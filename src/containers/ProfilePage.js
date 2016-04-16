import React, { PropTypes, } from 'react'
import { connect, } from 'react-redux'
import { bindActionCreators, } from 'redux'
import actions from '../actions/ProfileAction'
import ProfileTable from '../components/ProfileTable'
import ProfileSearch from '../components/ProfileSearch'

class ProfilePage extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    tableState: PropTypes.object.isRequired,
  }

  render() {
    //console.log(this.props.tableState)
    return (
      <div>
        <ProfileSearch />
        <ProfileTable {...this.props.actions} {...this.props.tableState.profiles} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tableState: state.table,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage)
