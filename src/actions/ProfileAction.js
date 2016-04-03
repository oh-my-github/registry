import ActionTypes from '../constants/ActionTypes'
import fetchDispatch from './FetchUtils'

const apiProps = {
  url: ActionTypes.GET_PROFILES_LIST_URL,
  types: {
    request: ActionTypes.REQUEST_PROFILE_DATA,
    receive: ActionTypes.RECEIVE_PROFILE_DATA,
  },
}

function shouldFetchData ({table}) {
  return (!table.data || !table.isFetching)
}

function fetchData () {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      return dispatch(fetchDispatch(apiProps))
    }
  }
}

function filterBy (filterString) {
  return {
    type: ActionTypes.FILTER_PROFILE_DATA,
    filterString,
  }
}

function sortBy (sortKey) {
  return {
    type: ActionTypes.SORT_PROFILE_DATA,
    sortKey,
  }
}

export default { fetchData, filterBy, sortBy }

