import * as ActionTypes from '../constants/ActionTypes'

const INITIAL_STATE = {
}

export default function TableReducer(state = INITIAL_STATE, action = null) {
  const { type, } = action
	switch (type) {
    case ActionTypes.ACTION01:
      return state
  }

  return state
}
