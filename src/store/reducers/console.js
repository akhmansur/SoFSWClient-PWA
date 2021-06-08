import {ADD_LOG} from '../actions/actionTypes';

const initialState = {
  log: []
}

export default function consoleReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_LOG:
      return {
        log: [...state.log, action.log]
      }
    default:
      return state
  }
}
