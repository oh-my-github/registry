import { createStore, } from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  let store
  if (window.devToolsExtension) {
    store = window.devToolsExtension()(createStore)(rootReducer, initialState)
  } else {
    store = createStore(rootReducer, initialState)
  }

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
