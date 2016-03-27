import React, { PropTypes, } from 'react'
import { connect, } from 'react-redux'
import { bindActionCreators, } from 'redux'
import * as actions from '../actions/Action'

class SearchPage extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    appState: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <h2>Search Page</h2>
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
)(SearchPage)
