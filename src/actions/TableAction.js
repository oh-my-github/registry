import ActionTypes from '../constants/ActionTypes'

function filterBy (filterString) {
  return {
    type: ActionTypes.FILTER_PROFILE_DATA,
    filterString
  }
}

function sortBy (sortKey) {
  return {
    type: ActionTypes.SORT_PROFILE_DATA,
    sortKey
  }
}

export default { filterBy, sortBy }
