import { combineReducers, } from 'redux'
import TableReducer from './TableReducer'

const rootReducer = combineReducers({
  table: TableReducer
})

export default rootReducer
