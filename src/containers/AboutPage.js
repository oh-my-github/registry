import React, { PropTypes, } from 'react'
import { connect, } from 'react-redux'
import { bindActionCreators, } from 'redux'
import actions from '../actions/ProfileAction'
import AvatarCard from '../components/AvatarCard'

class AboutPage extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    tableState: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className="row">
        <div className="col m12 l8 offset-l2">
          <AvatarCard {...this.props.actions} {...this.props.tableState} />
        </div>
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
)(AboutPage)
