import ActionTypes from '../constants/ActionTypes'
import { combineReducers, } from 'redux'
import TableReducer from './TableReducer'

// Updates error message to notify about the failed fetches.
function errorMessage (state = {}, action) {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.errorMessage
  }

  return state
}

const rootReducer = combineReducers({
  table: TableReducer,
  errorMessage,
})

export default rootReducer
