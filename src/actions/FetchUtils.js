import fetch from 'isomorphic-fetch'
import * as ActionTypes from '../constants/ActionTypes'

function handleResponse (response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  }
  throw new Error(formatErrorMessage(response))
}

function formatErrorMessage (res) {
  return `[${res.status}]: ${res.statusText} (${res.url})`
}

// Error action that is dispatched on failed fetch requests
function errorAction (error) {
  return {
    type: ACTIONS.SET_ERROR_MESSAGE,
    error: true,
    errorMessage: error.message
  }
}

export default function fetchDispatch (opts) {
  return (dispatch) => {
    dispatch({ type: opts.types.request })

    return fetch(opts.url, { headers: opts.headers || {} })
      .then(handleResponse)
      .then((data) => { // Dispatch the recevied action with type and data
        const obj = opts.onReceived ? opts.onReceived(data) : { data }
        return dispatch(Object.assign({ type: opts.types.receive }, obj))
      }).catch((error) => dispatch(errorAction(error)))
  }
}
