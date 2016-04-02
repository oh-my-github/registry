import React, { PropTypes, } from 'react'
import { connect, } from 'react-redux'
import { bindActionCreators, } from 'redux'
import * as actions from '../actions'
import ProfileTable from '../components/ProfileTable'

class ProfilePage extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    appState: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <h4>Profile Page</h4>
        <ProfileTable />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    appState: state.table,
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
