import ActionTypes from '../constants/ActionTypes'

const INITIAL_STATE = {
  isFetching: false,
  profiles: [],
  sortKey: 'followers',
  sortDesc: true,
  filterString: '',
}

function tableActions (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_PROFILE_DATA:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case ActionTypes.RECEIVE_PROFILE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        profiles: action.profiles,
      })
    case ActionTypes.FILTER_PROFILE_DATA:
      return Object.assign({}, state, {
         filterString: action.filterString,
        })
    case ActionTypes.SORT_PROFILE_DATA:
      return Object.assign({}, state, {
        sortKey: action.sortKey,
        sortDesc: state.sortKey === action.sortKey ? !state.sortDesc : false,
      })
    default:
      return state
  }
}

export default tableActions
