import { createStore, applyMiddleware, } from 'redux'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

const logger = createLogger()

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)
export default function configureStore(initialState) {
  let store = createStoreWithMiddleware(rootReducer, initialState)
  return store
}
