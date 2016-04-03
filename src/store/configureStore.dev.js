import { createStore, applyMiddleware, } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
const logger = createLogger()

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)
export default function configureStore(initialState) {
  let store = createStoreWithMiddleware(rootReducer, initialState)
  //if (window.devToolsExtension) {
  //  store = window.devToolsExtension()(createStore)(rootReducer, initialState)
  //} else {
  //  store = createStore(rootReducer, initialState)
  //}

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
