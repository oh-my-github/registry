import ActionTypes from '../constants/ActionTypes'

export function listProfileWithItems (data) {
  //const foods = data.report.foods
  //
  //return foods.reduce((arr, food) => {
  //  food.nutrients.forEach((nutrient) => {
  //    nutrient.food = food.name
  //  })
  //  return arr.concat(food.nutrients)
  //}, [])
}

function handleTableActions (state, action) {
  switch (action.type) {
    case ActionTypes.REQUEST_PROFILE_DATA:
      return { isFetching: true }
    case ActionTypes.RECEIVE_PROFILE_DATA:
      return {
        isFetching: false,
        data: listProfileWithItems(action.data) // when you need to modify data
      }
    case ActionTypes.FILTER_PROFILE_DATA:
      return { filterString: action.filterString.toLowerCase() }
    case ActionTypes.SORT_PROFILE_DATA:
      return {
        sortKey: action.sortKey,
        sortDesc: state.sortKey === action.sortKey ? !state.sortDesc : false
      }
    default:
      return state
  }
}

function tableReducer (state = {}, action) {
  return Object.assign({}, state, handleTableActions(state, action))
}

export default tableReducer
