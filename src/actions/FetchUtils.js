import fetch from 'isomorphic-fetch'
import * as API from './APIUtils'
import ActionTypes from '../constants/ActionTypes'

function handleResponse (response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  }
  throw new Error(formatErrorMessage(response))
}

function formatErrorMessage (res) {
  return `[${res.status}]: ${res.statusText} (${res.url})`
}

function errorAction (error) {
  return {
    type: ActionTypes.SET_ERROR_MESSAGE,
    error: true,
    errorMessage: error.message
  }
}

export default function fetchDispatch (apiProps) {

  return (dispatch) => {
    dispatch({ type: apiProps.types.request })

    API.getJSON(apiProps.url)
      .then(registries => {
        const locations = registries.map(registry => {
          return `http://localhost:3000/${registry.location}`
        })

        API.getJSONs(locations)
          .then(profiles => {

            const receiveAction = Object.assign({}, {
              type: apiProps.types.receive,
              profiles,
            })

            return dispatch(receiveAction)
          })
      })
  }
}
